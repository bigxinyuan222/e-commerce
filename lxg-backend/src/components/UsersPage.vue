<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Id = number | string
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

const props = defineProps<{ token?: string }>()
const users = ref<UserRow[]>([])
const loading = ref(false)
const error = ref('')
const keywordInput = ref('')
const keyword = ref('')
const status = ref<'all' | UserRow['status']>('all')
const page = ref(1)
const pageSize = 10
const total = ref(0)
const detail = ref<UserRow | null>(null)
const pendingToggle = ref<UserRow | null>(null)
const toggling = ref(false)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const filteredUsers = computed(() => users.value.filter((user) => {
  const matchesStatus = status.value === 'all' || user.status === status.value
  const search = keyword.value.toLowerCase()
  return matchesStatus && (!search || user.name.toLowerCase().includes(search) || user.phone.toLowerCase().includes(search))
}))
const activeCount = computed(() => users.value.filter(user => user.status === 'active').length)
const frozenCount = computed(() => users.value.filter(user => user.status === 'frozen').length)
const totalOrders = computed(() => users.value.reduce((sum, user) => sum + user.totalOrders, 0))
const totalAmount = computed(() => users.value.reduce((sum, user) => sum + user.totalAmount, 0))

function authHeaders() {
  const headers = new Headers()
  if (props.token) headers.set('Authorization', `Bearer ${props.token}`)
  return headers
}

async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

function normalizeStatus(row: any): UserRow['status'] {
  const raw = row.status ?? row.enabled ?? row.is_enabled ?? row.is_enable ?? row.user_status ?? row.account_status ?? row.state
  const text = String(raw ?? '').toLowerCase()
  if (['active', 'enabled', '正常', '启用', '激活', 'true'].includes(text) || Number(raw) === 1) return 'active'
  if (['deleted', '注销', '已注销', 'cancel', 'cancelled'].includes(text) || Number(raw) === 3) return 'deleted'
  if (['frozen', 'disabled', '禁用', '冻结', '停用', '已冻结', '已禁用', '锁定', 'locked', 'inactive', 'false'].includes(text) || Number(raw) === 0 || Number(raw) === 2) return 'frozen'
  return raw === undefined || raw === null || raw === '' ? 'active' : 'frozen'
}

function formatDate(value: unknown): string {
  if (!value) return '-'
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
}

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

function notify(message: string, type: 'success' | 'error' = 'success') {
  const toast = (window as unknown as { showToast?: (text: string, kind: string) => void }).showToast
  toast?.(message, type)
}

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

function searchUsers() {
  keyword.value = keywordInput.value.trim()
}

async function changePage(next: number) {
  if (next < 1 || next > totalPages.value || next === page.value || loading.value) return
  page.value = next
  await loadUsers()
}

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
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '操作失败，请重试', 'error')
  } finally {
    toggling.value = false
  }
}

function genderText(value: string) {
  const text = value.toLowerCase()
  if (text === '0' || text === 'male' || text === '男') return '男'
  if (text === '1' || text === 'female' || text === '女') return '女'
  if (text === '2' || text === 'secret' || text === 'private' || text === '保密') return '保密'
  return '保密'
}

function statusText(value: UserRow['status']) {
  return value === 'active' ? '启用' : value === 'frozen' ? '禁用' : '已注销'
}

onMounted(loadUsers)
</script>

<template>
  <div class="flex-between mb-4">
    <div class="search-bar">
      <input v-model="keywordInput" id="userSearchInput" placeholder="昵称 / 手机号" @keyup.enter="searchUsers" />
      <select v-model="status">
        <option value="all">全部状态</option><option value="active">正常</option><option value="frozen">已冻结</option>
      </select>
      <button class="btn btn-primary" type="button" @click="searchUsers"><i class="fas fa-search"></i> 搜索</button>
    </div>
  </div>

  <div class="system-stats-row">
    <div class="stat-card"><div class="label"><i class="fas fa-users"></i> 总用户数</div><div class="value">{{ total }}</div></div>
    <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 正常用户</div><div class="value green">{{ activeCount }}</div></div>
    <div class="stat-card"><div class="label"><i class="fas fa-lock"></i> 已冻结</div><div class="value yellow">{{ frozenCount }}</div></div>
  </div>

  <div class="system-layout-main users-layout">
    <div class="card users-table-card">
      <div class="card-header"><span class="card-title"><i class="fas fa-users"></i> 用户列表</span><span class="system-text-muted">共 {{ total }} 位用户 · 累计订单 {{ totalOrders }} 笔 · 累计消费 ¥{{ totalAmount.toFixed(2) }}</span></div>
      <div class="card-body no-pad">
        <div v-if="error" class="stock-list-error"><i class="fas fa-exclamation-circle"></i> {{ error }}</div>
        <div class="table-wrap users-table-wrap"><table class="users-table">
          <thead><tr><th>用户</th><th>手机号</th><th>性别</th><th>注册时间</th><th>最近登录</th><th>订单数</th><th>消费金额</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            <tr v-if="loading"><td colspan="9"><div class="stock-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载用户...</div></td></tr>
            <tr v-else-if="filteredUsers.length === 0"><td colspan="9"><div class="stock-table-state"><i class="fas fa-inbox"></i> 暂无用户数据</div></td></tr>
            <tr v-for="user in filteredUsers" v-else :key="user.id">
              <td><div class="flex-center"><span class="system-user-avatar-sm">{{ user.name.charAt(0) || '用' }}</span> {{ user.name }}</div></td>
              <td>{{ user.phone }}</td><td>{{ genderText(user.gender) }}</td><td>{{ user.registerTime }}</td><td>{{ user.lastLogin }}</td><td>{{ user.totalOrders }}</td>
              <td><span class="system-amount">¥{{ user.totalAmount.toFixed(2) }}</span></td>
              <td><span class="status-badge" :class="user.status === 'active' ? 'green' : user.status === 'frozen' ? 'yellow' : 'gray'"><span class="dot"></span> {{ statusText(user.status) }}</span></td>
              <td><button class="btn btn-sm btn-outline" type="button" @click="detail = user"><i class="fas fa-eye"></i> 详情</button> <button class="btn btn-sm" :class="user.status === 'active' ? 'btn-danger' : 'btn-success'" type="button" @click="pendingToggle = user"><i class="fas" :class="user.status === 'active' ? 'fa-lock' : 'fa-unlock'"></i> {{ user.status === 'active' ? '冻结' : '解冻' }}</button></td>
            </tr>
          </tbody>
        </table></div>
        <div class="stock-pagination"><span>第 {{ page }} / {{ totalPages }} 页，共 {{ total }} 位用户</span><div class="stock-pagination-actions"><button class="btn btn-sm btn-outline" type="button" :disabled="page <= 1 || loading" @click="changePage(page - 1)"><i class="fas fa-chevron-left"></i> 上一页</button><button class="btn btn-sm btn-outline" type="button" :disabled="page >= totalPages || loading" @click="changePage(page + 1)">下一页 <i class="fas fa-chevron-right"></i></button></div></div>
      </div>
    </div>

    <div class="system-card-stack">
      <div class="card"><div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 用户统计</span></div><div class="card-body"><div class="system-stats-info"><div class="system-stats-info-row"><span>本周新增用户</span><span class="value">128</span></div><div class="system-stats-info-row"><span>本月新增用户</span><span class="value">456</span></div></div></div></div>
    </div>
  </div>

  <template v-if="detail">
    <div class="modal-overlay" @click="detail = null"></div><div class="modal-content wide"><div class="modal-header"><h3><i class="fas fa-user"></i> 用户详情 · {{ detail.name }}</h3><button class="modal-close" @click="detail = null"><i class="fas fa-times"></i></button></div><div class="modal-body scrollable"><div class="system-user-detail-header"><div class="system-user-detail-avatar">{{ detail.name.charAt(0) || '用' }}</div><div class="system-user-detail-info"><div class="name">{{ detail.name }}</div><div class="phone">{{ detail.phone }}</div><div class="meta"><span class="gender">{{ genderText(detail.gender) }}</span> <span class="status-badge" :class="detail.status === 'active' ? 'green' : 'yellow'"><span class="dot"></span> {{ statusText(detail.status) }}</span></div></div></div><div class="system-user-detail-grid"><div class="system-user-detail-card"><div class="label">用户ID</div><div class="value">{{ detail.id }}</div></div><div class="system-user-detail-card"><div class="label">注册时间</div><div class="value">{{ detail.registerTime }}</div></div><div class="system-user-detail-card"><div class="label">最后登录</div><div class="value">{{ detail.lastLogin }}</div></div><div class="system-user-detail-card"><div class="label">账户状态</div><div class="value">{{ statusText(detail.status) }}</div></div></div></div><div class="modal-footer"><button class="btn" :class="detail.status === 'active' ? 'btn-danger' : 'btn-success'" @click="pendingToggle = detail"><i class="fas" :class="detail.status === 'active' ? 'fa-lock' : 'fa-unlock'"></i> {{ detail.status === 'active' ? '冻结账号' : '解冻账号' }}</button><button class="btn btn-outline" @click="detail = null">关闭</button></div></div>
  </template>
  <template v-if="pendingToggle">
    <div class="modal-overlay" @click="pendingToggle = null"></div><div class="modal-content"><div class="modal-header"><h3><i class="fas fa-exclamation-circle"></i> 确认操作</h3><button class="modal-close" @click="pendingToggle = null"><i class="fas fa-times"></i></button></div><div class="modal-body"><p>确定要{{ pendingToggle.status === 'active' ? '禁用' : '启用' }}用户 {{ pendingToggle.name }} 吗？</p></div><div class="modal-footer"><button class="btn btn-outline" @click="pendingToggle = null">取消</button><button class="btn btn-primary" :disabled="toggling" @click="toggleUser"><i class="fas" :class="toggling ? 'fa-spinner fa-spin' : 'fa-check'"></i> 确认</button></div></div>
  </template>
</template>

<style scoped>
.users-layout {
  grid-template-columns: minmax(0, 3fr) minmax(300px, 1fr);
  align-items: start;
}
.users-table-card { min-width: 0; }
.users-table { min-width: 1080px; }
.users-table th,
.users-table td { padding: 12px 10px; vertical-align: middle; }
.users-table th:first-child { min-width: 150px; }
.users-table th:nth-child(2) { min-width: 112px; }
.users-table th:nth-child(4),
.users-table th:nth-child(5) { min-width: 142px; }
.users-table th:last-child { min-width: 142px; }
.users-table td:first-child > div { justify-content: flex-start; gap: 8px; white-space: nowrap; }
.users-table td:first-child .system-user-avatar-sm { flex: 0 0 28px; }
.users-table td:nth-child(4),
.users-table td:nth-child(5) { white-space: nowrap; color: #475569; }
.users-table td:nth-child(8) .status-badge { white-space: nowrap; }
.users-table td:last-child { white-space: nowrap; }
.users-table td:last-child .btn { min-width: 64px; justify-content: center; margin-right: 4px; }

@media (max-width: 1280px) {
  .users-layout { grid-template-columns: minmax(0, 1fr); }
  .system-card-stack { display: grid; grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 760px) {
  .system-stats-row,
  .system-card-stack { grid-template-columns: minmax(0, 1fr); }
}
</style>
