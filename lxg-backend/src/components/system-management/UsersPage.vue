<!--
  @file UsersPage.vue
  @description 用户管理页面组件
  @module 系统管理模块
  @key-features 用户列表展示、搜索筛选、状态统计、用户详情查看、启用/冻结操作
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

/** 用户ID类型，可能为数字或字符串 */
type Id = number | string

/** 用户数据行结构定义 */
interface UserRow {
  id: Id
  name: string
  phone: string
  gender: string
  status: 'active' | 'frozen' | 'deleted'
  registerTime: string
  lastLogin: string
  totalOrders: number
  totalAmount: number
  reviewCount: number
  couponCount: number
}

/** 用户统计数据结构（本日/本月新增） */
interface UserStats {
  newDay: number
  newMonth: number
}

const props = defineProps<{ token?: string }>()

// ===== 响应式状态 =====
const users = ref<UserRow[]>([])                    // 用户列表数据
const loading = ref(false)                          // 加载状态
const error = ref('')                               // 错误信息
const keywordInput = ref('')                        // 搜索输入框绑定值
const keyword = ref('')                             // 实际生效的搜索关键词
const status = ref<'all' | UserRow['status']>('all')// 状态筛选值
const page = ref(1)                                 // 当前页码
const pageSize = 10                                  // 每页条数
const total = ref(0)                                // 用户总数
const detail = ref<UserRow | null>(null)             // 当前查看详情的用户
const pendingToggle = ref<UserRow | null>(null)      // 待确认启用/冻结的用户
const toggling = ref(false)                         // 启用/冻结操作进行中
const stats = ref<UserStats>({ newDay: 0, newMonth: 0 }) // 用户新增统计

// ===== 计算属性 =====
/** 总页数，至少为1 */
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

/** 根据状态和关键词过滤后的用户列表 */
const filteredUsers = computed(() => users.value.filter((user) => {
  const matchesStatus = status.value === 'all' || user.status === status.value
  const search = keyword.value.toLowerCase()
  return matchesStatus && (!search || user.name.toLowerCase().includes(search) || user.phone.toLowerCase().includes(search))
}))

/** 正常（启用）状态用户数量 */
const activeCount = computed(() => users.value.filter(user => user.status === 'active').length)

/** 冻结状态用户数量 */
const frozenCount = computed(() => users.value.filter(user => user.status === 'frozen').length)

/** 所有用户累计订单总数 */
const totalOrders = computed(() => users.value.reduce((sum, user) => sum + user.totalOrders, 0))

/** 所有用户累计消费总金额 */
const totalAmount = computed(() => users.value.reduce((sum, user) => sum + user.totalAmount, 0))

/**
 * 构建带认证信息的请求头
 * @returns Headers对象，包含Authorization Bearer令牌（如果存在）
 */
function authHeaders() {
  const headers = new Headers()
  if (props.token) headers.set('Authorization', `Bearer ${props.token}`)
  return headers
}

/**
 * 统一请求封装，自动处理响应码和错误
 * @param url - 请求地址
 * @param options - fetch请求选项
 * @returns 接口返回的data字段或完整payload
 * @throws 请求失败时抛出Error
 */
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

/**
 * 将后端返回的各种状态字段统一归一化为三种标准状态
 * @param row - 后端原始用户数据
 * @returns 标准化的状态值：active（正常）/ frozen（冻结）/ deleted（注销）
 */
function normalizeStatus(row: any): UserRow['status'] {
  const raw = row.status ?? row.enabled ?? row.is_enabled ?? row.is_enable ?? row.user_status ?? row.account_status ?? row.state
  const text = String(raw ?? '').toLowerCase()
  if (['active', 'enabled', '正常', '启用', '激活', 'true'].includes(text) || Number(raw) === 1) return 'active'
  if (['deleted', '注销', '已注销', 'cancel', 'cancelled'].includes(text) || Number(raw) === 3) return 'deleted'
  if (['frozen', 'disabled', '禁用', '冻结', '停用', '已冻结', '已禁用', '锁定', 'locked', 'inactive', 'false'].includes(text) || Number(raw) === 0 || Number(raw) === 2) return 'frozen'
  return raw === undefined || raw === null || raw === '' ? 'active' : 'frozen'
}

/**
 * 格式化日期时间
 * @param value - 原始日期值
 * @returns 格式化后的中文日期字符串（如：2024/01/01 12:00），无效时返回原值或'-'
 */
function formatDate(value: unknown): string {
  if (!value) return '-'
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
}

/**
 * 将后端返回的原始用户数据映射为标准UserRow结构
 * @param row - 后端原始用户数据
 * @returns 标准化的用户数据对象
 */
function normalizeUser(row: any): UserRow {
  const name = String(row.userName ?? row.username ?? row.name ?? row.nickname ?? '')
  return {
    id: row.ID ?? row.id,
    name,
    phone: String(row.phone ?? row.mobile ?? ''),
    gender: String(row.gender ?? ''),
    status: normalizeStatus(row),
    registerTime: formatDate(row.CreatedAt ?? row.createdAt ?? row.created_at),
    lastLogin: formatDate(row.lastLogin ?? row.last_login ?? row.lastLoginAt ?? row.last_login_at),
    totalOrders: Number(row.order_count ?? row.orderCount ?? row.totalOrders ?? row.total_orders) || 0,
    totalAmount: Number(row.consumption_amount ?? row.consumptionAmount ?? row.totalAmount ?? row.total_amount) || 0,
    reviewCount: Number(row.reviewCount ?? row.review_count) || 0,
    couponCount: Number(row.couponCount ?? row.coupon_count) || 0,
  }
}

/**
 * 显示Toast通知消息
 * @param message - 提示文本
 * @param type - 提示类型：success（成功）/ error（错误）
 */
function notify(message: string, type: 'success' | 'error' = 'success') {
  const toast = (window as unknown as { showToast?: (text: string, kind: string) => void }).showToast
  toast?.(message, type)
}

/**
 * 将后端返回的新增用户统计数据映射为标准UserStats结构
 * @param data - 后端原始统计数据
 * @returns 标准化的统计数据对象（本日新增/本月新增）
 */
function normalizeStats(data: any): UserStats {
  const row = data && typeof data === 'object' ? data : {}
  const num = (value: unknown) => Number(value) || 0
  return {
    newDay: num(row.day_sum_people ?? row.day_sum ?? row.day_new ?? row.today_new ?? row.new_day),
    newMonth: num(row.month_sum_people ?? row.month_sum ?? row.month_new ?? row.new_month),
  }
}

/**
 * 加载用户新增统计数据
 * @api GET /api/v1/new/user/quantity - 获取本日/本月新增用户数量
 */
async function loadUserStats() {
  try {
    const data = await requestJson('/api/v1/new/user/quantity', { headers: authHeaders() })
    stats.value = normalizeStats(data)
  } catch {
    // 统计接口失败时不影响用户列表展示
  }
}

/**
 * 加载用户列表
 * @api GET /api/v1/get/users - 分页获取用户列表
 * @description 根据当前页码和每页条数请求用户数据，处理列表映射和总数
 */
async function loadUsers() {
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams({ page: String(page.value), size: String(pageSize) })
    const data = await requestJson(`/api/v1/get/users?${params}`, { headers: authHeaders() })
    const list = Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? data?.users ?? []
    users.value = list.map(normalizeUser)
    total.value = Number(data?.total ?? data?.total_count ?? data?.count) || list.length
    page.value = Number(data?.page ?? data?.current_page) || page.value
  } catch (cause) {
    users.value = []
    total.value = 0
    error.value = cause instanceof Error ? cause.message : '用户列表加载失败'
  } finally {
    loading.value = false
  }
}

/**
 * 执行用户搜索，将输入框值赋给生效关键词
 */
function searchUsers() {
  keyword.value = keywordInput.value.trim()
}

/**
 * 翻页操作
 * @param next - 目标页码
 * @description 越界或重复页码时忽略，否则更新页码并重新加载列表
 */
async function changePage(next: number) {
  if (next < 1 || next > totalPages.value || next === page.value || loading.value) return
  page.value = next
  await loadUsers()
}

/**
 * 启用/冻结用户
 * @api POST /api/v1/enable/user - 切换用户启用状态
 * @description 根据用户当前状态执行启用或冻结操作，成功后刷新列表和统计
 */
async function toggleUser() {
  if (!pendingToggle.value || toggling.value) return
  toggling.value = true
  const user = pendingToggle.value
  try {
    const params = new URLSearchParams({ id: String(user.id) })
    await requestJson(`/api/v1/enable/user?${params}`, { method: 'POST', headers: authHeaders() })
    notify(`用户 ${user.name} 已${user.status === 'active' ? '禁用' : '启用'}`)
    pendingToggle.value = null
    detail.value = null
    await loadUsers()
    void loadUserStats()
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '操作失败，请重试', 'error')
  } finally {
    toggling.value = false
  }
}

/**
 * 将性别字段转换为中文显示
 * @param value - 原始性别值（0/male/1/female/2/secret等）
 * @returns 中文性别文本：男/女/保密
 */
function genderText(value: string) {
  const text = value.toLowerCase()
  if (text === '0' || text === 'male' || text === '男') return '男'
  if (text === '1' || text === 'female' || text === '女') return '女'
  if (text === '2' || text === 'secret' || text === 'private' || text === '保密') return '保密'
  return '保密'
}

/**
 * 将状态值转换为中文显示
 * @param value - 标准化状态值
 * @returns 中文状态文本：启用/禁用/已注销
 */
function statusText(value: UserRow['status']) {
  return value === 'active' ? '启用' : value === 'frozen' ? '禁用' : '已注销'
}

// ===== 生命周期：组件挂载时加载用户列表和统计数据 =====
onMounted(() => {
  void loadUsers()
  void loadUserStats()
})
</script>

<template>
  <!-- 搜索栏：关键词搜索 + 状态筛选 -->
  <div class="flex-between mb-4">
    <div class="search-bar">
      <input v-model="keywordInput" id="userSearchInput" placeholder="昵称 / 手机号" @keyup.enter="searchUsers" />
      <select v-model="status">
        <option value="all">全部状态</option>
        <option value="active">正常</option>
        <option value="frozen">已冻结</option>
      </select>
      <button class="btn btn-primary" type="button" @click="searchUsers"><i class="fas fa-search"></i> 搜索</button>
    </div>
  </div>

  <!-- 统计卡片栏：总用户数、正常、冻结、本日新增、本月新增 -->
  <div class="system-stats-row">
    <div class="stat-card">
      <div class="label"><i class="fas fa-users"></i> 总用户数</div>
      <div class="value">{{ total }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-check-circle"></i> 正常用户</div>
      <div class="value green">{{ activeCount }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-lock"></i> 已冻结</div>
      <div class="value yellow">{{ frozenCount }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-calendar-day"></i> 本日新增</div>
      <div class="value blue">{{ stats.newDay }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-calendar-alt"></i> 本月新增</div>
      <div class="value purple">{{ stats.newMonth }}</div>
    </div>
  </div>

  <!-- 主布局区域：左侧用户列表 + 右侧统计面板 -->
  <div class="system-layout-main users-layout">
    <div class="card users-table-card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-users"></i> 用户列表</span>
        <span class="system-text-muted">共 {{ total }} 位用户 · 累计订单 {{ totalOrders }} 笔 · 累计消费 ¥{{ totalAmount.toFixed(2) }}</span>
      </div>
      <div class="card-body no-pad">
        <!-- 错误提示 -->
        <div v-if="error" class="stock-list-error"><i class="fas fa-exclamation-circle"></i> {{ error }}</div>
        <!-- 用户数据表格 -->
        <div class="table-wrap users-table-wrap">
          <table class="users-table">
            <thead>
              <tr>
                <th>用户</th>
                <th>手机号</th>
                <th>性别</th>
                <th>注册时间</th>
                <th>最近登录</th>
                <th>订单数</th>
                <th>消费金额</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="9"><div class="stock-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载用户...</div></td>
              </tr>
              <tr v-else-if="filteredUsers.length === 0">
                <td colspan="9"><div class="stock-table-state"><i class="fas fa-inbox"></i> 暂无用户数据</div></td>
              </tr>
              <tr v-for="user in filteredUsers" v-else :key="user.id">
                <td>
                  <div class="flex-center">
                    <span class="system-user-avatar-sm">{{ user.name.charAt(0) || '用' }}</span>
                    {{ user.name }}
                  </div>
                </td>
                <td>{{ user.phone }}</td>
                <td>{{ genderText(user.gender) }}</td>
                <td>{{ user.registerTime }}</td>
                <td>{{ user.lastLogin }}</td>
                <td>{{ user.totalOrders }}</td>
                <td><span class="system-amount">¥{{ user.totalAmount.toFixed(2) }}</span></td>
                <td><span class="status-badge" :class="user.status === 'active' ? 'green' : user.status === 'frozen' ? 'yellow' : 'gray'"><span class="dot"></span> {{ statusText(user.status) }}</span></td>
                <td>
                  <button class="btn btn-sm btn-outline" type="button" @click="detail = user"><i class="fas fa-eye"></i> 详情</button>
                  <button class="btn btn-sm" :class="user.status === 'active' ? 'btn-danger' : 'btn-success'" type="button" @click="pendingToggle = user"><i class="fas" :class="user.status === 'active' ? 'fa-lock' : 'fa-unlock'"></i> {{ user.status === 'active' ? '冻结' : '解冻' }}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分页控件 -->
        <div class="stock-pagination">
          <span>第 {{ page }} / {{ totalPages }} 页，共 {{ total }} 位用户</span>
          <div class="stock-pagination-actions">
            <button class="btn btn-sm btn-outline" type="button" :disabled="page <= 1 || loading" @click="changePage(page - 1)"><i class="fas fa-chevron-left"></i> 上一页</button>
            <button class="btn btn-sm btn-outline" type="button" :disabled="page >= totalPages || loading" @click="changePage(page + 1)">下一页 <i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧统计面板 -->
    <div class="system-card-stack">
      <div class="card">
        <div class="card-header">
          <span class="card-title"><i class="fas fa-chart-line"></i> 用户统计</span>
        </div>
        <div class="card-body">
          <div class="system-stats-info">
            <div class="system-stats-info-row">
              <span><i class="fas fa-calendar-day"></i> 本日新增用户</span>
              <span class="value blue">{{ stats.newDay }}</span>
            </div>
            <div class="system-stats-info-row">
              <span><i class="fas fa-calendar-alt"></i> 本月新增用户</span>
              <span class="value purple">{{ stats.newMonth }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 用户详情弹窗 -->
  <template v-if="detail">
    <div class="modal-overlay" @click="detail = null"></div>
    <div class="modal-content wide">
      <div class="modal-header">
        <h3><i class="fas fa-user"></i> 用户详情 · {{ detail.name }}</h3>
        <button class="modal-close" @click="detail = null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body scrollable">
        <div class="system-user-detail-header">
          <div class="system-user-detail-avatar">{{ detail.name.charAt(0) || '用' }}</div>
          <div class="system-user-detail-info">
            <div class="name">{{ detail.name }}</div>
            <div class="phone">{{ detail.phone }}</div>
            <div class="meta">
              <span class="gender">{{ genderText(detail.gender) }}</span>
              <span class="status-badge" :class="detail.status === 'active' ? 'green' : 'yellow'"><span class="dot"></span> {{ statusText(detail.status) }}</span>
            </div>
          </div>
        </div>
        <div class="system-user-detail-grid">
          <div class="system-user-detail-card">
            <div class="label">用户ID</div>
            <div class="value">{{ detail.id }}</div>
          </div>
          <div class="system-user-detail-card">
            <div class="label">注册时间</div>
            <div class="value">{{ detail.registerTime }}</div>
          </div>
          <div class="system-user-detail-card">
            <div class="label">最后登录</div>
            <div class="value">{{ detail.lastLogin }}</div>
          </div>
          <div class="system-user-detail-card">
            <div class="label">账户状态</div>
            <div class="value">{{ statusText(detail.status) }}</div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn" :class="detail.status === 'active' ? 'btn-danger' : 'btn-success'" @click="pendingToggle = detail"><i class="fas" :class="detail.status === 'active' ? 'fa-lock' : 'fa-unlock'"></i> {{ detail.status === 'active' ? '冻结账号' : '解冻账号' }}</button>
        <button class="btn btn-outline" @click="detail = null">关闭</button>
      </div>
    </div>
  </template>
  <!-- 启用/冻结确认弹窗 -->
  <template v-if="pendingToggle">
    <div class="modal-overlay" @click="pendingToggle = null"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3><i class="fas fa-exclamation-circle"></i> 确认操作</h3>
        <button class="modal-close" @click="pendingToggle = null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <p>确定要{{ pendingToggle.status === 'active' ? '禁用' : '启用' }}用户 {{ pendingToggle.name }} 吗？</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="pendingToggle = null">取消</button>
        <button class="btn btn-primary" :disabled="toggling" @click="toggleUser"><i class="fas" :class="toggling ? 'fa-spinner fa-spin' : 'fa-check'"></i> 确认</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
/* 用户页面布局：左侧表格占3份，右侧统计占1份 */
.users-layout {
  grid-template-columns: minmax(0, 3fr) minmax(300px, 1fr);
  align-items: start;
}
.users-table-card { min-width: 0; }

/* 用户表格样式：固定最小宽度，防止列挤压 */
.users-table { min-width: 1080px; }
.users-table th,
.users-table td { padding: 12px 10px; vertical-align: middle; }
/* 各列最小宽度设置，保证内容不被截断 */
.users-table th:first-child { min-width: 150px; }
.users-table th:nth-child(2) { min-width: 112px; }
.users-table th:nth-child(4),
.users-table th:nth-child(5) { min-width: 142px; }
.users-table th:last-child { min-width: 142px; }
.users-table td:first-child > div { justify-content: flex-start; gap: 8px; white-space: nowrap; }
.users-table td:first-child .system-user-avatar-sm { flex: 0 0 28px; }
/* 日期列样式：不换行，灰色文字 */
.users-table td:nth-child(4),
.users-table td:nth-child(5) { white-space: nowrap; color: #475569; }
.users-table td:nth-child(8) .status-badge { white-space: nowrap; }
/* 操作列样式：按钮不换行，固定最小宽度 */
.users-table td:last-child { white-space: nowrap; }
.users-table td:last-child .btn { min-width: 64px; justify-content: center; margin-right: 4px; }

/* 响应式：1280px以下改为单列布局 */
@media (max-width: 1280px) {
  .users-layout { grid-template-columns: minmax(0, 1fr); }
  .system-card-stack { display: grid; grid-template-columns: minmax(0, 1fr); }
}

/* 响应式：760px以下统计卡片和右侧面板改为单列 */
@media (max-width: 760px) {
  .system-stats-row,
  .system-card-stack { grid-template-columns: minmax(0, 1fr); }
}
</style>
