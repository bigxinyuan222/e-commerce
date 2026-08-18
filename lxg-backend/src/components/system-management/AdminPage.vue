<!--
  @file AdminPage.vue
  @description 管理员管理页面组件
  @module 系统管理模块
  @key-features 管理员列表展示、搜索筛选、新增/编辑管理员、启用/停用、修改密码、删除、角色权限说明
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

/** ID类型，可能为数字或字符串 */
type Id = string | number

/** 管理员数据行结构定义 */
interface AdminRow {
  id: Id
  username: string
  name: string
  phone: string
  roleId: Id | ''
  roleName: string
  storeId: Id | ''
  storeName: string
  status: number
  createdAt: string
}

/** 选项行结构（角色/门店等下拉选项） */
interface OptionRow { id: Id; name: string }

/** 角色权限描述结构 */
interface RoleDescription { name: string; scope: string; permissions: string[] }

/** 角色权限说明数据（运营管理员、客服管理员、门店管理员） */
const roleDescriptions: RoleDescription[] = [
  {
    name: '运营管理员',
    scope: '商品上下架、库存调整、评价审核、活动配置',
    permissions: ['数据统计', '商品管理', '库存管理', '评价管理', '优惠券管理', '营销活动'],
  },
  {
    name: '客服管理员',
    scope: '处理订单、回复用户咨询',
    permissions: ['订单管理', '退货退款', '客服消息'],
  },
  {
    name: '门店管理员',
    scope: '查看本店订单、处理本店退货、核销自提、编辑本店信息',
    permissions: ['门店管理'],
  },
]

const props = defineProps<{ token?: string }>()

// ===== 响应式状态 =====
const rows = ref<AdminRow[]>([])               // 管理员列表数据
const stores = ref<OptionRow[]>([])            // 门店选项列表
const roles = ref<OptionRow[]>([])              // 角色选项列表
const loading = ref(false)                     // 加载状态
const error = ref('')                           // 错误信息
const keyword = ref('')                        // 搜索关键词
const roleFilter = ref('')                     // 角色筛选值
const statusFilter = ref('')                   // 状态筛选值
const editing = ref<AdminRow | null>(null)     // 当前编辑的管理员（null表示未编辑）
const saving = ref(false)                      // 保存中状态
const form = reactive({ username: '', password: '', name: '', phone: '', roleId: '', storeId: '' }) // 编辑表单数据
const passwordAdmin = ref<AdminRow | null>(null) // 当前修改密码的管理员
const passwordForm = reactive({ password: '', confirmPassword: '' }) // 修改密码表单
const resettingPassword = ref(false)           // 密码重置中状态

/** 根据关键词、角色、状态过滤后的管理员列表 */
const filtered = computed(() => {
  const search = keyword.value.trim().toLowerCase()
  return rows.value.filter(row => {
    const matchesSearch = !search || `${row.username}${row.name}${row.phone}`.toLowerCase().includes(search)
    const matchesRole = !roleFilter.value || String(row.roleId) === roleFilter.value
    const matchesStatus = !statusFilter.value || String(row.status) === statusFilter.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

/** 启用状态管理员数量 */
const activeCount = computed(() => rows.value.filter(row => row.status === 1).length)

/** 停用状态管理员数量 */
const inactiveCount = computed(() => rows.value.length - activeCount.value)

/** 可分配的角色列表（排除超级管理员） */
const assignableRoles = computed(() => roles.value.filter(role =>
  String(role.id) !== '1' && !['超级管理员', 'super_admin'].includes(role.name.trim().toLowerCase())
))

/** 门店管理员数量（角色ID为4或角色名包含"门店"） */
const storeAdminCount = computed(() => rows.value.filter(row =>
  String(row.roleId) === '4' || row.roleName.includes('门店')
).length)

/**
 * 构建带认证信息的请求头
 * @param json - 是否设置Content-Type为application/json
 * @returns Headers对象
 */
function authHeaders(json = false) {
  const headers = new Headers()
  if (props.token) headers.set('Authorization', `Bearer ${props.token}`)
  if (json) headers.set('Content-Type', 'application/json')
  return headers
}

/**
 * 统一请求封装，处理响应码和错误
 * @param url - 请求地址
 * @param options - fetch请求选项
 * @returns 接口data字段或完整payload
 */
async function request(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && ![0, 200].includes(payload.code))) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

/**
 * 从接口返回数据中提取列表，兼容多种字段名
 * @param data - 接口返回数据
 * @param keys - 候选列表字段名数组
 * @returns 提取到的数组，未找到时返回空数组
 */
function extractList(data: any, keys: string[]) {
  if (Array.isArray(data)) return data
  for (const key of keys) if (Array.isArray(data?.[key])) return data[key]
  if (Array.isArray(data?.data)) return data.data
  return []
}

/**
 * 将后端返回的原始管理员数据映射为标准AdminRow结构
 * @param row - 后端原始管理员数据
 * @returns 标准化的管理员数据对象
 */
function normalize(row: any): AdminRow {
  const role = row.role && typeof row.role === 'object' ? row.role : null
  const store = row.store && typeof row.store === 'object' ? row.store : null
  const rawStatus = row.status ?? row.enabled ?? row.is_enabled
  return {
    id: row.ID ?? row.id,
    username: String(row.username ?? row.userName ?? ''),
    name: String(row.name ?? row.realName ?? row.real_name ?? ''),
    phone: String(row.phone ?? row.mobile ?? ''),
    roleId: role?.ID ?? role?.id ?? row.roleId ?? row.role_id ?? (typeof row.role !== 'object' ? row.role : ''),
    roleName: String(role?.name ?? row.roleName ?? row.role_name ?? ''),
    storeId: store?.ID ?? store?.id ?? row.storeId ?? row.store_id ?? '',
    storeName: String(store?.name ?? row.storeName ?? row.store_name ?? ''),
    status: ['active', 'enabled', true, 1, '1'].includes(rawStatus) ? 1 : 0,
    createdAt: String(row.CreatedAt ?? row.createdAt ?? row.created_at ?? row.createTime ?? '-'),
  }
}

/**
 * 从管理员列表中推导出角色选项列表（去重）
 * @param admins - 管理员列表
 * @returns 去重后的角色选项数组
 */
function deriveRoles(admins: AdminRow[]) {
  const map = new Map<string, OptionRow>()
  admins.forEach(admin => {
    if (admin.roleId !== '' && admin.roleName) map.set(String(admin.roleId), { id: admin.roleId, name: admin.roleName })
  })
  return [...map.values()]
}

/**
 * 显示Toast通知消息
 * @param message - 提示文本
 * @param type - 提示类型（默认success）
 */
function notify(message: string, type = 'success') {
  ;(window as unknown as { showToast?: (text: string, kind: string) => void }).showToast?.(message, type)
}

/**
 * 加载管理员列表和门店列表
 * @api GET /api/v1/admin/list - 获取管理员列表
 * @api GET /api/v1/admin/stores - 获取门店选项列表
 */
async function loadAdmins() {
  loading.value = true
  error.value = ''
  try {
    const data = await request('/api/v1/admin/list?page=1&size=100', { headers: authHeaders() })
    rows.value = extractList(data, ['list', 'admins', 'items', 'records']).map(normalize)
    roles.value = deriveRoles(rows.value)
  } catch (cause) {
    rows.value = []
    error.value = cause instanceof Error ? cause.message : '管理员列表加载失败'
    loading.value = false
    return
  }

  try {
    const storeData = await request('/api/v1/admin/stores', { headers: authHeaders() })
    stores.value = extractList(storeData, ['list', 'stores', 'items']).map((item: any) => ({
      id: item.ID ?? item.id,
      name: String(item.name ?? ''),
    }))
  } catch {
    stores.value = []
  }
  loading.value = false
}

/**
 * 打开编辑弹窗（新增或编辑管理员）
 * @param row - 传入管理员行则编辑，不传则新增
 */
function openEditor(row?: AdminRow) {
  editing.value = row ?? {
    id: '', username: '', name: '', phone: '', roleId: '', roleName: '',
    storeId: '', storeName: '', status: 1, createdAt: '',
  }
  Object.assign(form, row ? {
    username: row.username, password: '', name: row.name, phone: row.phone,
    roleId: String(row.roleId), storeId: String(row.storeId),
  } : { username: '', password: '', name: '', phone: '', roleId: '', storeId: '' })
}

/**
 * 保存管理员（新增或更新）
 * @api POST /api/v1/create/admin - 新增管理员
 * @api PUT /api/v1/admins/{id} - 更新管理员
 * @description 校验必填字段后提交，新增时需填写密码
 */
async function save() {
  if (!form.username.trim() || !form.name.trim() || !form.phone.trim() || !form.roleId) {
    notify('请完整填写用户名、姓名、手机号和角色', 'error')
    return
  }
  if (!editing.value?.id && !form.password) {
    notify('新增管理员必须填写密码', 'error')
    return
  }
  saving.value = true
  try {
    const id = editing.value?.id
    const body: Record<string, unknown> = {
      username: form.username.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      role_id: Number(form.roleId) || form.roleId,
      store_id: form.storeId ? Number(form.storeId) || form.storeId : null,
    }
    if (!id) body.password = form.password
    await request(id ? `/api/v1/admins/${id}` : '/api/v1/create/admin', {
      method: id ? 'PUT' : 'POST',
      headers: authHeaders(true),
      body: JSON.stringify(body),
    })
    editing.value = null
    notify('管理员保存成功')
    await loadAdmins()
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '保存失败', 'error')
  } finally {
    saving.value = false
  }
}

/**
 * 切换管理员启用/停用状态
 * @api POST /api/v1/enable/admin - 启用/停用管理员
 * @param row - 目标管理员行
 */
async function toggle(row: AdminRow) {
  try {
    await request(`/api/v1/enable/admin?id=${row.id}`, { method: 'POST', headers: authHeaders() })
    notify('管理员状态已更新')
    await loadAdmins()
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '操作失败', 'error')
  }
}

/**
 * 打开修改密码弹窗
 * @param row - 目标管理员行
 */
function openPasswordEditor(row: AdminRow) {
  passwordAdmin.value = row
  passwordForm.password = ''
  passwordForm.confirmPassword = ''
}

/**
 * 重置管理员密码
 * @api POST /api/v1/reset/admin/password - 重置管理员密码
 * @description 校验密码长度和一致性后提交
 */
async function resetAdminPassword() {
  if (!passwordAdmin.value || resettingPassword.value) return
  if (passwordForm.password.length < 6) return notify('新密码至少需要 6 位', 'error')
  if (passwordForm.password !== passwordForm.confirmPassword) return notify('两次输入的密码不一致', 'error')
  resettingPassword.value = true
  try {
    await request('/api/v1/reset/admin/password', {
      method: 'POST', headers: authHeaders(true),
      body: JSON.stringify({ id: Number(passwordAdmin.value.id), password: passwordForm.password }),
    })
    passwordAdmin.value = null
    notify('管理员密码修改成功')
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '管理员密码修改失败', 'error')
  } finally {
    resettingPassword.value = false
  }
}

/**
 * 删除管理员（二次确认后执行）
 * @api POST /api/v1/delete/admin - 删除管理员
 * @param row - 目标管理员行
 */
async function remove(row: AdminRow) {
  if (!confirm(`确定删除管理员"${row.name || row.username}"吗？`)) return
  try {
    await request(`/api/v1/delete/admin?id=${encodeURIComponent(String(row.id))}`, { method: 'POST', headers: authHeaders() })
    notify('管理员已删除')
    await loadAdmins()
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '删除失败', 'error')
  }
}

// ===== 生命周期：组件挂载时加载管理员列表 =====
onMounted(loadAdmins)
</script>

<template>
  <!-- 工具栏：搜索筛选 + 新增管理员按钮 -->
  <div class="admin-toolbar">
    <div class="search-bar">
      <input v-model="keyword" id="adminSearchInput" placeholder="用户名 / 手机号 / 姓名">
      <select v-model="roleFilter">
        <option value="">全部角色</option>
        <option v-for="role in roles" :key="role.id" :value="String(role.id)">{{ role.name }}</option>
      </select>
      <select v-model="statusFilter">
        <option value="">全部状态</option>
        <option value="1">启用</option>
        <option value="0">停用</option>
      </select>
      <button class="btn btn-primary" type="button"><i class="fas fa-search"></i> 搜索</button>
    </div>
    <button class="btn btn-primary" type="button" @click="openEditor()"><i class="fas fa-plus"></i> 新增管理员</button>
  </div>

  <!-- 统计卡片栏：总管理员、已启用、已停用、门店管理员 -->
  <div class="system-stat-grid">
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-user-shield"></i> 总管理员</div>
      <div class="value">{{ rows.length }}</div>
    </div>
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-check-circle"></i> 已启用</div>
      <div class="value green">{{ activeCount }}</div>
    </div>
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-lock"></i> 已停用</div>
      <div class="value yellow">{{ inactiveCount }}</div>
    </div>
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-store-alt"></i> 门店管理员</div>
      <div class="value orange">{{ storeAdminCount }}</div>
    </div>
  </div>

  <!-- 管理员列表卡片 -->
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-user-shield"></i> 管理员列表</span>
      <span class="system-text-muted">共 {{ filtered.length }} 位管理员</span>
    </div>
    <div class="card-body no-pad">
      <!-- 错误提示 -->
      <div v-if="error" class="admin-message error">
        <i class="fas fa-exclamation-circle"></i> {{ error }}
        <button class="btn btn-sm btn-outline" @click="loadAdmins">重新加载</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>管理员</th>
              <th>手机号</th>
              <th>角色</th>
              <th>所属门店</th>
              <th>创建时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7"><div class="admin-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载管理员...</div></td>
            </tr>
            <tr v-else-if="!filtered.length">
              <td colspan="7"><div class="admin-table-state"><i class="fas fa-inbox"></i> 暂无管理员数据</div></td>
            </tr>
            <tr v-for="row in filtered" v-else :key="row.id">
              <td>
                <div class="admin-identity">
                  <span class="system-user-avatar-sm">{{ (row.name || row.username).charAt(0) }}</span>
                  <span><b>{{ row.name || '-' }}</b><small>{{ row.username }}</small></span>
                </div>
              </td>
              <td>{{ row.phone || '-' }}</td>
              <td><span class="system-tag primary">{{ row.roleName || row.roleId || '-' }}</span></td>
              <td>{{ row.storeName || '-' }}</td>
              <td>{{ row.createdAt }}</td>
              <td><span class="status-badge" :class="row.status === 1 ? 'green' : 'gray'"><span class="dot"></span>{{ row.status === 1 ? '启用' : '停用' }}</span></td>
              <td class="admin-actions">
                <button class="btn btn-sm btn-outline" @click="openEditor(row)"><i class="fas fa-edit"></i> 编辑</button>
                <button class="btn btn-sm btn-outline" @click="openPasswordEditor(row)"><i class="fas fa-key"></i> 修改密码</button>
                <button class="btn btn-sm" :class="row.status === 1 ? 'btn-danger' : 'btn-success'" @click="toggle(row)">{{ row.status === 1 ? '停用' : '启用' }}</button>
                <button class="btn btn-sm btn-danger" @click="remove(row)"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 角色权限管理说明卡片 -->
  <div class="card role-management">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-lock"></i> 角色权限管理</span>
    </div>
    <div class="card-body">
      <div class="role-description-grid">
        <article v-for="role in roleDescriptions" :key="role.name" class="role-description-card">
          <h3>{{ role.name }}</h3>
          <p><span>权限范围：</span>{{ role.scope }}</p>
          <div class="role-permissions">
            <span v-for="permission in role.permissions" :key="permission" class="role-permission-tag">{{ permission }}</span>
          </div>
        </article>
      </div>
    </div>
  </div>

  <!-- 新增/编辑管理员弹窗 -->
  <template v-if="editing">
    <div class="modal-overlay" @click="editing = null"></div>
    <div class="modal-content admin-modal">
      <div class="modal-header">
        <h3><i class="fas fa-user-shield"></i> {{ editing.id ? '编辑管理员' : '新增管理员' }}</h3>
        <button class="modal-close" @click="editing = null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="admin-form-grid">
          <label>
            <span>用户名 <b>*</b></span>
            <input v-model="form.username" class="system-form-input">
          </label>
          <label>
            <span>真实姓名 <b>*</b></span>
            <input v-model="form.name" class="system-form-input">
          </label>
          <label>
            <span>手机号 <b>*</b></span>
            <input v-model="form.phone" class="system-form-input">
          </label>
          <label v-if="!editing.id">
            <span>密码 *</span>
            <input v-model="form.password" type="password" class="system-form-input" placeholder="请输入登录密码">
          </label>
          <label>
            <span>角色 <b>*</b></span>
            <select v-model="form.roleId" class="system-form-select">
              <option value="">请选择角色</option>
              <option v-for="role in assignableRoles" :key="role.id" :value="String(role.id)">{{ role.name }}</option>
            </select>
          </label>
          <label>
            <span>所属门店</span>
            <select v-model="form.storeId" class="system-form-select">
              <option value="">无</option>
              <option v-for="store in stores" :key="store.id" :value="String(store.id)">{{ store.name }}</option>
            </select>
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="editing = null">取消</button>
        <button class="btn btn-primary" :disabled="saving" @click="save"><i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i> 保存</button>
      </div>
    </div>
  </template>

  <!-- 修改管理员密码弹窗 -->
  <template v-if="passwordAdmin">
    <div class="modal-overlay" @click="!resettingPassword && (passwordAdmin = null)"></div>
    <div class="modal-content password-modal">
      <div class="modal-header">
        <h3><i class="fas fa-key"></i> 修改管理员密码</h3>
        <button class="modal-close" :disabled="resettingPassword" @click="passwordAdmin = null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body password-form">
        <div class="password-target">
          <span class="system-user-avatar-sm">{{ (passwordAdmin.name || passwordAdmin.username).charAt(0) }}</span>
          <div><strong>{{ passwordAdmin.name || passwordAdmin.username }}</strong><small>{{ passwordAdmin.username }}</small></div>
        </div>
        <label>
          <span>新密码</span>
          <input v-model="passwordForm.password" type="password" class="system-form-input" autocomplete="new-password" placeholder="至少输入 6 位" @keydown.enter="resetAdminPassword">
        </label>
        <label>
          <span>确认新密码</span>
          <input v-model="passwordForm.confirmPassword" type="password" class="system-form-input" autocomplete="new-password" placeholder="请再次输入新密码" @keydown.enter="resetAdminPassword">
        </label>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" :disabled="resettingPassword" @click="passwordAdmin = null">取消</button>
        <button class="btn btn-primary" :disabled="resettingPassword" @click="resetAdminPassword"><i class="fas" :class="resettingPassword ? 'fa-spinner fa-spin' : 'fa-save'"></i> {{ resettingPassword ? '提交中...' : '确认修改' }}</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
/* 修改密码弹窗样式 */
.password-modal{width:min(460px,calc(100vw - 32px))}.password-form{display:flex;flex-direction:column;gap:16px}.password-form label{display:flex;flex-direction:column;gap:7px;color:#334155;font-size:13px;font-weight:600}.password-target{display:flex;align-items:center;gap:10px;padding:12px;border-radius:7px;background:#f8fafc}.password-target>div{display:flex;flex-direction:column;gap:3px}.password-target small{color:#94a3b8}[data-theme="dark"] .password-target{background:#111827}[data-theme="dark"] .password-form label{color:#e5e7eb}

/* 工具栏、表格、编辑弹窗、角色权限卡片样式 */
.admin-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}.admin-message{display:flex;align-items:center;gap:8px;padding:12px 16px;font-size:13px}.admin-message.error{color:#dc2626;background:#fef2f2}.admin-message.warning{color:#92400e;background:#fffbeb}.admin-table-state{padding:34px;text-align:center;color:#94a3b8}.admin-identity{display:flex;align-items:center;gap:10px;min-width:150px}.admin-identity span:last-child{display:flex;flex-direction:column;gap:3px}.admin-identity small{color:#94a3b8}.admin-actions{white-space:nowrap}.admin-actions .btn{margin-right:5px}.admin-modal{width:min(680px,calc(100vw - 32px))}.admin-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.admin-form-grid label{display:flex;flex-direction:column;gap:7px;font-size:13px;font-weight:600;color:#334155}.admin-form-grid b{color:#ef4444}.role-management{margin-top:16px}.role-description-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.role-description-card{min-height:136px;padding:18px;border:1px solid #e2e8f0;border-radius:6px;background:#fff}.role-description-card.primary{background:#f8faff;border-color:#dbe4ff}.role-description-card h3{margin:0 0 10px;font-size:16px;color:#0f172a}.role-description-card.primary h3{color:#4f6ef7}.role-description-card p{margin:0 0 12px;font-size:13px;line-height:1.6;color:#64748b}.role-description-card p span{color:#475569}.role-permissions{display:flex;flex-wrap:wrap;gap:6px}.role-permission-tag{display:inline-flex;align-items:center;min-height:24px;padding:3px 9px;border-radius:4px;background:#f1f5f9;color:#64748b;font-size:12px}.role-description-card.primary .role-permission-tag{background:#eef2ff;color:#4f6ef7}[data-theme="dark"] .role-description-card{background:#0f172a;border-color:#334155}[data-theme="dark"] .role-description-card.primary{background:rgba(79,110,247,.08);border-color:#4f6ef7}[data-theme="dark"] .role-description-card h3{color:#f8fafc}

/* 响应式：760px以下改为单列布局 */
@media(max-width:760px){.admin-toolbar{align-items:stretch;flex-direction:column}.admin-toolbar>.btn{align-self:flex-start}.search-bar{display:grid;grid-template-columns:1fr}.admin-form-grid,.role-description-grid{grid-template-columns:1fr}.admin-actions{white-space:normal}}
</style>
