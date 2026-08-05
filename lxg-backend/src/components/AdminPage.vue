<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

type Id = string | number
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
  lastLogin: string
}
interface OptionRow { id: Id; name: string }
interface RoleDescription { name: string; scope: string; permissions: string[] }

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
const rows = ref<AdminRow[]>([])
const stores = ref<OptionRow[]>([])
const roles = ref<OptionRow[]>([])
const loading = ref(false)
const error = ref('')
const keyword = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const editing = ref<AdminRow | null>(null)
const saving = ref(false)
const form = reactive({ username: '', password: '', name: '', phone: '', roleId: '', storeId: '' })

const filtered = computed(() => {
  const search = keyword.value.trim().toLowerCase()
  return rows.value.filter(row => {
    const matchesSearch = !search || `${row.username}${row.name}${row.phone}`.toLowerCase().includes(search)
    const matchesRole = !roleFilter.value || String(row.roleId) === roleFilter.value
    const matchesStatus = !statusFilter.value || String(row.status) === statusFilter.value
    return matchesSearch && matchesRole && matchesStatus
  })
})
const activeCount = computed(() => rows.value.filter(row => row.status === 1).length)
const inactiveCount = computed(() => rows.value.length - activeCount.value)
const assignableRoles = computed(() => roles.value.filter(role =>
  String(role.id) !== '1' && !['超级管理员', 'super_admin'].includes(role.name.trim().toLowerCase())
))
const storeAdminCount = computed(() => rows.value.filter(row =>
  String(row.roleId) === '4' || row.roleName.includes('门店')
).length)

function authHeaders(json = false) {
  const headers = new Headers()
  if (props.token) headers.set('Authorization', `Bearer ${props.token}`)
  if (json) headers.set('Content-Type', 'application/json')
  return headers
}

async function request(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && ![0, 200].includes(payload.code))) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

function extractList(data: any, keys: string[]) {
  if (Array.isArray(data)) return data
  for (const key of keys) if (Array.isArray(data?.[key])) return data[key]
  if (Array.isArray(data?.data)) return data.data
  return []
}

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
    lastLogin: String(row.lastLogin ?? row.last_login ?? '-'),
  }
}

function deriveRoles(admins: AdminRow[]) {
  const map = new Map<string, OptionRow>()
  admins.forEach(admin => {
    if (admin.roleId !== '' && admin.roleName) map.set(String(admin.roleId), { id: admin.roleId, name: admin.roleName })
  })
  return [...map.values()]
}

function notify(message: string, type = 'success') {
  ;(window as unknown as { showToast?: (text: string, kind: string) => void }).showToast?.(message, type)
}

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

function openEditor(row?: AdminRow) {
  editing.value = row ?? {
    id: '', username: '', name: '', phone: '', roleId: '', roleName: '',
    storeId: '', storeName: '', status: 1, createdAt: '', lastLogin: '',
  }
  Object.assign(form, row ? {
    username: row.username, password: '', name: row.name, phone: row.phone,
    roleId: String(row.roleId), storeId: String(row.storeId),
  } : { username: '', password: '', name: '', phone: '', roleId: '', storeId: '' })
}

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
    if (form.password) body.password = form.password
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

async function toggle(row: AdminRow) {
  try {
    await request(`/api/v1/enable/admin?id=${row.id}`, { method: 'POST', headers: authHeaders() })
    notify('管理员状态已更新')
    await loadAdmins()
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '操作失败', 'error')
  }
}

async function remove(row: AdminRow) {
  if (!confirm(`确定删除管理员“${row.name || row.username}”吗？`)) return
  try {
    await request(`/api/v1/delete/admin?id=${row.id}`, { method: 'DELETE', headers: authHeaders() })
    notify('管理员已删除')
    await loadAdmins()
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '删除失败', 'error')
  }
}

onMounted(loadAdmins)
</script>

<template>
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

  <div class="system-stat-grid">
    <div class="system-stat-card"><div class="label"><i class="fas fa-user-shield"></i> 总管理员</div><div class="value">{{ rows.length }}</div></div>
    <div class="system-stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已启用</div><div class="value green">{{ activeCount }}</div></div>
    <div class="system-stat-card"><div class="label"><i class="fas fa-lock"></i> 已停用</div><div class="value yellow">{{ inactiveCount }}</div></div>
    <div class="system-stat-card"><div class="label"><i class="fas fa-store-alt"></i> 门店管理员</div><div class="value orange">{{ storeAdminCount }}</div></div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-user-shield"></i> 管理员列表</span>
      <span class="system-text-muted">共 {{ filtered.length }} 位管理员</span>
    </div>
    <div class="card-body no-pad">
      <div v-if="error" class="admin-message error"><i class="fas fa-exclamation-circle"></i> {{ error }} <button class="btn btn-sm btn-outline" @click="loadAdmins">重新加载</button></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>管理员</th><th>手机号</th><th>角色</th><th>所属门店</th><th>创建时间</th><th>最近登录</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-if="loading"><td colspan="8"><div class="admin-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载管理员...</div></td></tr>
            <tr v-else-if="!filtered.length"><td colspan="8"><div class="admin-table-state"><i class="fas fa-inbox"></i> 暂无管理员数据</div></td></tr>
            <tr v-for="row in filtered" v-else :key="row.id">
              <td><div class="admin-identity"><span class="system-user-avatar-sm">{{ (row.name || row.username).charAt(0) }}</span><span><b>{{ row.name || '-' }}</b><small>{{ row.username }}</small></span></div></td>
              <td>{{ row.phone || '-' }}</td>
              <td><span class="system-tag primary">{{ row.roleName || row.roleId || '-' }}</span></td>
              <td>{{ row.storeName || '-' }}</td>
              <td>{{ row.createdAt }}</td>
              <td>{{ row.lastLogin }}</td>
              <td><span class="status-badge" :class="row.status === 1 ? 'green' : 'gray'"><span class="dot"></span>{{ row.status === 1 ? '启用' : '停用' }}</span></td>
              <td class="admin-actions"><button class="btn btn-sm btn-outline" @click="openEditor(row)"><i class="fas fa-edit"></i> 编辑</button><button class="btn btn-sm" :class="row.status === 1 ? 'btn-danger' : 'btn-success'" @click="toggle(row)">{{ row.status === 1 ? '停用' : '启用' }}</button><button class="btn btn-sm btn-danger" @click="remove(row)"><i class="fas fa-trash"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

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

  <template v-if="editing">
    <div class="modal-overlay" @click="editing = null"></div>
    <div class="modal-content admin-modal">
      <div class="modal-header"><h3><i class="fas fa-user-shield"></i> {{ editing.id ? '编辑管理员' : '新增管理员' }}</h3><button class="modal-close" @click="editing = null"><i class="fas fa-times"></i></button></div>
      <div class="modal-body">
        <div class="admin-form-grid">
          <label><span>用户名 <b>*</b></span><input v-model="form.username" class="system-form-input"></label>
          <label><span>真实姓名 <b>*</b></span><input v-model="form.name" class="system-form-input"></label>
          <label><span>手机号 <b>*</b></span><input v-model="form.phone" class="system-form-input"></label>
          <label><span>密码 {{ editing.id ? '' : '*' }}</span><input v-model="form.password" type="password" class="system-form-input" :placeholder="editing.id ? '不修改请留空' : '请输入登录密码'"></label>
          <label><span>角色 <b>*</b></span><select v-model="form.roleId" class="system-form-select"><option value="">请选择角色</option><option v-for="role in assignableRoles" :key="role.id" :value="String(role.id)">{{ role.name }}</option></select></label>
          <label><span>所属门店</span><select v-model="form.storeId" class="system-form-select"><option value="">无</option><option v-for="store in stores" :key="store.id" :value="String(store.id)">{{ store.name }}</option></select></label>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-outline" @click="editing = null">取消</button><button class="btn btn-primary" :disabled="saving" @click="save"><i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i> 保存</button></div>
    </div>
  </template>
</template>

<style scoped>
.admin-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}.admin-message{display:flex;align-items:center;gap:8px;padding:12px 16px;font-size:13px}.admin-message.error{color:#dc2626;background:#fef2f2}.admin-message.warning{color:#92400e;background:#fffbeb}.admin-table-state{padding:34px;text-align:center;color:#94a3b8}.admin-identity{display:flex;align-items:center;gap:10px;min-width:150px}.admin-identity span:last-child{display:flex;flex-direction:column;gap:3px}.admin-identity small{color:#94a3b8}.admin-actions{white-space:nowrap}.admin-actions .btn{margin-right:5px}.admin-modal{width:min(680px,calc(100vw - 32px))}.admin-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.admin-form-grid label{display:flex;flex-direction:column;gap:7px;font-size:13px;font-weight:600;color:#334155}.admin-form-grid b{color:#ef4444}.role-management{margin-top:16px}.role-description-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.role-description-card{min-height:136px;padding:18px;border:1px solid #e2e8f0;border-radius:6px;background:#fff}.role-description-card.primary{background:#f8faff;border-color:#dbe4ff}.role-description-card h3{margin:0 0 10px;font-size:16px;color:#0f172a}.role-description-card.primary h3{color:#4f6ef7}.role-description-card p{margin:0 0 12px;font-size:13px;line-height:1.6;color:#64748b}.role-description-card p span{color:#475569}.role-permissions{display:flex;flex-wrap:wrap;gap:6px}.role-permission-tag{display:inline-flex;align-items:center;min-height:24px;padding:3px 9px;border-radius:4px;background:#f1f5f9;color:#64748b;font-size:12px}.role-description-card.primary .role-permission-tag{background:#eef2ff;color:#4f6ef7}[data-theme="dark"] .role-description-card{background:#0f172a;border-color:#334155}[data-theme="dark"] .role-description-card.primary{background:rgba(79,110,247,.08);border-color:#4f6ef7}[data-theme="dark"] .role-description-card h3{color:#f8fafc}@media(max-width:760px){.admin-toolbar{align-items:stretch;flex-direction:column}.admin-toolbar>.btn{align-self:flex-start}.search-bar{display:grid;grid-template-columns:1fr}.admin-form-grid,.role-description-grid{grid-template-columns:1fr}.admin-actions{white-space:normal}}
</style>
