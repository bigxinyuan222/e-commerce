<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

type Id = number | string
interface Refund {
  id: Id
  refundNo: string
  orderNo: string
  productName: string
  amount: number
  userName: string
  phone: string
  storeId: Id | ''
  storeName: string
  reason: string
  reasonType: string
  status: number
  createdAt: string
  spec: unknown
  price: number
}
interface RefundReason { id: Id; content: string; sort: number; status: number; color: string }

const props = defineProps<{ token?: string; storeId?: Id | null }>()
const refunds = ref<Refund[]>([])
const reasons = ref<RefundReason[]>([])
const loading = ref(false)
const reasonLoading = ref(false)
const error = ref('')
const reasonError = ref('')
const keyword = ref('')
const status = ref<number | ''>('')
const page = ref(1)
const pageSize = 20
const total = ref(0)
const refundStats = reactive({ pending: 0, approved: 0, rejected: 0, amount: 0 })
const operationStats = reactive({ averageHours: null as number | null, processedToday: 0, weeklyAmount: 0, monthlyAmount: 0, refundRate: null as number | null, approvalRate: null as number | null })
const detail = ref<Refund | null>(null)
const detailLoading = ref(false)
const reasonModal = ref<'list' | 'add' | 'edit' | null>(null)
const editingReasonId = ref<Id | null>(null)
const reasonSaving = ref(false)
const reasonForm = reactive({ content: '', sort: 1, status: 1, color: '#64748b' })
const colorStorageKey = 'lexiangou_refund_reason_colors'

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const activeReasons = computed(() => reasons.value.filter(item => item.status === 1))
const reasonDistribution = computed(() => {
  const counts = new Map<string, number>()
  refunds.value.forEach(item => counts.set(item.reason || '其他原因', (counts.get(item.reason || '其他原因') || 0) + 1))
  const count = refunds.value.length || 1
  return [...counts.entries()].map(([name, value], index) => {
    const configured = reasons.value.find(item => item.content === name)
    const palette = ['#ef4444', '#f59e0b', '#8b5cf6', '#2563eb', '#16a34a']
    return { name, value, percentage: Math.round(value / count * 100), color: configured?.color || palette[index % palette.length] }
  }).sort((a, b) => b.value - a.value).slice(0, 5)
})
const statusOptions = [
  { value: '', label: '全部状态' }, { value: 0, label: '待审核' },
  { value: 1, label: '已通过' }, { value: 2, label: '已拒绝' }, { value: 3, label: '已完成' },
]

function authHeaders(json = false) {
  const headers = new Headers()
  if (json) headers.set('Content-Type', 'application/json')
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

function notify(message: string, type: 'success' | 'error' = 'success') {
  const toast = (window as unknown as { showToast?: (text: string, kind: string) => void }).showToast
  toast?.(message, type)
}

function normalizeRefund(row: any): Refund {
  return {
    id: row.refund_id ?? row.refundId ?? row.ID ?? row.id,
    refundNo: String(row.refund_no ?? row.refundNo ?? row.id ?? '-'),
    orderNo: String(row.order_no ?? row.orderNo ?? row.order_id ?? row.orderId ?? '-'),
    productName: String(row.product_name ?? row.productName ?? row.goods_name ?? '-'),
    amount: Number(row.refund_amount ?? row.refundAmount ?? row.amount) || 0,
    userName: String(row.user_name ?? row.userName ?? '-'), phone: String(row.phone ?? '-'),
    storeId: row.store_id ?? row.storeId ?? '', storeName: String(row.store_name ?? row.storeName ?? '-'),
    reason: String(row.reason ?? row.refund_reason ?? '-'), reasonType: String(row.reason_type ?? row.reasonType ?? 'other'),
    status: Number(row.status ?? 0), createdAt: String(row.created_at ?? row.createdAt ?? '-'),
    spec: row.spec_values ?? row.spec ?? '', price: Number(row.price ?? 0),
  }
}

function updateRefundStats(data: any, list: Refund[]) {
  const stats = data?.stats ?? data?.statistics ?? data?.summary
  refundStats.pending = Number(stats?.pending ?? stats?.pending_count ?? stats?.pendingCount ?? list.filter(item => item.status === 0).length)
  refundStats.approved = Number(stats?.approved ?? stats?.approved_count ?? stats?.approvedCount ?? list.filter(item => item.status === 1).length)
  refundStats.rejected = Number(stats?.rejected ?? stats?.rejected_count ?? stats?.rejectedCount ?? list.filter(item => item.status === 2).length)
  refundStats.amount = Number(stats?.refund_amount ?? stats?.refundAmount ?? stats?.total_amount ?? stats?.totalAmount ?? list.reduce((sum, item) => sum + item.amount, 0))
  operationStats.averageHours = stats?.average_processing_hours ?? stats?.averageProcessingHours ?? stats?.avg_processing_hours ?? null
  operationStats.processedToday = Number(stats?.processed_today ?? stats?.processedToday ?? list.filter(item => item.status !== 0).length)
  operationStats.weeklyAmount = Number(stats?.weekly_refund_amount ?? stats?.weeklyRefundAmount ?? refundStats.amount)
  operationStats.monthlyAmount = Number(stats?.monthly_refund_amount ?? stats?.monthlyRefundAmount ?? refundStats.amount)
  operationStats.refundRate = stats?.refund_rate ?? stats?.refundRate ?? null
  const decided = refundStats.approved + refundStats.rejected
  operationStats.approvalRate = stats?.approval_rate ?? stats?.approvalRate ?? (decided ? Math.round(refundStats.approved / decided * 100) : null)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 2 }).format(value)
}

function formatRate(value: number | null) {
  if (value === null || !Number.isFinite(Number(value))) return '--'
  const normalized = Number(value) <= 1 ? Number(value) * 100 : Number(value)
  return `${normalized.toFixed(normalized % 1 ? 1 : 0)}%`
}

function readColors(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(colorStorageKey) || '{}') } catch { return {} }
}
function saveColor(id: Id | null | undefined, name: string, color: string) {
  const colors = readColors()
  if (id !== null && id !== undefined && id !== '') colors[`id:${id}`] = color
  if (name) colors[`name:${name}`] = color
  localStorage.setItem(colorStorageKey, JSON.stringify(colors))
}
function removeColor(id: Id, name: string) {
  const colors = readColors(); delete colors[`id:${id}`]; delete colors[`name:${name}`]
  localStorage.setItem(colorStorageKey, JSON.stringify(colors))
}

async function loadRefunds() {
  loading.value = true; error.value = ''
  const params = new URLSearchParams({ page: String(page.value), pageSize: String(pageSize), keyword: keyword.value.trim(), status: status.value === '' ? '' : String(status.value), store_id: props.storeId ? String(props.storeId) : '' })
  try {
    const data = await requestJson(`/api/v1/admin/refunds?${params}`, { headers: authHeaders() })
    const list = Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? []
    refunds.value = list.map(normalizeRefund)
    ;(window as unknown as { legacyRefundSnapshot: Refund[] }).legacyRefundSnapshot = refunds.value
    total.value = Number(data?.total ?? data?.total_count ?? list.length)
    updateRefundStats(data, refunds.value)
  } catch (cause) { error.value = cause instanceof Error ? cause.message : '退款列表加载失败'; refunds.value = []; total.value = 0; updateRefundStats(null, []) }
  finally { loading.value = false }
}

async function loadReasons() {
  reasonLoading.value = true; reasonError.value = ''
  try {
    const data = await requestJson('/api/v1/admin/refund-reasons', { headers: authHeaders() })
    const list = Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? []
    const colors = readColors()
    reasons.value = list.map((row: any) => {
      const id = row.ID ?? row.id; const content = String(row.content ?? row.name ?? row.reason ?? '')
      return { id, content, sort: Number(row.sort ?? 0), status: row.status === 1 || row.status === '1' || row.enabled === true ? 1 : 0, color: colors[`id:${id}`] || colors[`name:${content}`] || row.color || '#64748b' }
    }).sort((a: RefundReason, b: RefundReason) => a.sort - b.sort)
  } catch (cause) { reasonError.value = cause instanceof Error ? cause.message : '退款原因加载失败'; reasons.value = [] }
  finally { reasonLoading.value = false }
}

async function search() { page.value = 1; await loadRefunds() }
async function changeStatus() { page.value = 1; await loadRefunds() }
async function changePage(next: number) { if (next < 1 || next > totalPages.value || next === page.value) return; page.value = next; await loadRefunds() }

async function openDetail(item: Refund) {
  detailLoading.value = true
  try { detail.value = normalizeRefund(await requestJson(`/api/v1/admin/refunds/${item.id}`, { headers: authHeaders() })) }
  catch (cause) { notify(cause instanceof Error ? cause.message : '退款详情加载失败', 'error') }
  finally { detailLoading.value = false }
}

async function audit(item: Refund, approved: boolean) {
  const remark = approved ? '同意退款' : window.prompt('请输入拒绝原因：')
  if (!remark) return
  try {
    await requestJson(`/api/v1/admin/refunds/${item.id}/audit`, { method: 'PUT', headers: authHeaders(true), body: JSON.stringify({ approved, remark }) })
    notify(approved ? '审核通过' : '审核已拒绝'); detail.value = null; await loadRefunds()
  } catch (cause) { notify(cause instanceof Error ? cause.message : '审核失败', 'error') }
}

function openReasonList() { reasonModal.value = 'list' }
function openAddReason() { editingReasonId.value = null; Object.assign(reasonForm, { content: '', sort: reasons.value.length + 1, status: 1, color: '#64748b' }); reasonModal.value = 'add' }
function openEditReason(item: RefundReason) { editingReasonId.value = item.id; Object.assign(reasonForm, item); reasonModal.value = 'edit' }

async function saveReason() {
  if (!reasonForm.content.trim()) return notify('请输入原因名称', 'error')
  reasonSaving.value = true
  try {
    if (reasonModal.value === 'add') {
      const created = await requestJson('/api/v1/admin/refund-reasons', { method: 'POST', headers: authHeaders(true), body: JSON.stringify({ content: reasonForm.content.trim(), sort: reasonForm.sort }) })
      saveColor(created?.ID ?? created?.id, reasonForm.content.trim(), reasonForm.color)
    } else {
      const original = reasons.value.find(item => item.id === editingReasonId.value)
      await requestJson(`/api/v1/admin/refund-reasons/${editingReasonId.value}`, { method: 'PUT', headers: authHeaders(true), body: JSON.stringify({ content: reasonForm.content.trim(), sort: reasonForm.sort, status: reasonForm.status }) })
      if (original && original.content !== reasonForm.content.trim()) removeColor(original.id, original.content)
      saveColor(editingReasonId.value, reasonForm.content.trim(), reasonForm.color)
    }
    await loadReasons(); reasonModal.value = 'list'; notify(editingReasonId.value === null ? '添加成功' : '修改成功')
  } catch (cause) { notify(cause instanceof Error ? cause.message : '保存失败', 'error') }
  finally { reasonSaving.value = false }
}

async function deleteReason(item: RefundReason) {
  if (!window.confirm(`确定删除退款原因“${item.content}”吗？`)) return
  try { await requestJson(`/api/v1/admin/refund-reasons/${item.id}`, { method: 'DELETE', headers: authHeaders() }); removeColor(item.id, item.content); await loadReasons(); notify('删除成功') }
  catch (cause) { notify(cause instanceof Error ? cause.message : '删除失败', 'error') }
}

function statusLabel(value: number) { return ['待审核', '已通过', '已拒绝', '已完成'][value] || '未知' }
function statusClass(value: number) { return ['pending', 'approved', 'rejected', 'done'][value] || '' }
function formatSpec(value: unknown) { return typeof value === 'object' && value ? Object.entries(value as object).map(([key, val]) => `${key}: ${val}`).join(' / ') : String(value || '-') }

onMounted(() => { void Promise.all([loadRefunds(), loadReasons()]) })
</script>

<template>
  <div class="returns-page">
    <div class="return-toolbar">
      <div class="search-bar"><input id="returnSearchInput" v-model="keyword" placeholder="退款单号 / 订单号 / 用户" @keyup.enter="search" /><select v-model="status" @change="changeStatus"><option v-for="option in statusOptions" :key="String(option.value)" :value="option.value">{{ option.label }}</option></select><button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 查询</button></div>
      <button class="btn btn-outline" @click="openReasonList"><i class="fas fa-sliders-h"></i> 退款原因配置</button>
    </div>
    <div v-if="error" class="return-alert">{{ error }}</div>
    <section class="return-stats" aria-label="退款统计">
      <div class="return-stat pending"><div class="return-stat-label"><i class="fas fa-clock"></i><span>待审核</span></div><strong>{{ refundStats.pending }}</strong></div>
      <div class="return-stat approved"><div class="return-stat-label"><i class="fas fa-check-circle"></i><span>已通过</span></div><strong>{{ refundStats.approved }}</strong></div>
      <div class="return-stat rejected"><div class="return-stat-label"><i class="fas fa-times-circle"></i><span>已拒绝</span></div><strong>{{ refundStats.rejected }}</strong></div>
      <div class="return-stat amount-stat"><div class="return-stat-label"><i class="fas fa-yen-sign"></i><span>退款金额</span></div><strong>{{ formatCurrency(refundStats.amount) }}</strong></div>
    </section>
    <div class="returns-grid">
      <section class="card return-list-card"><div class="card-header"><span class="card-title"><i class="fas fa-undo"></i> 退款申请列表</span><span class="text-muted">共 {{ total }} 笔</span></div><div class="card-body no-pad"><div class="table-wrap"><table><thead><tr><th>退款单号</th><th>关联订单</th><th>商品</th><th>用户</th><th>退款金额</th><th>原因</th><th>门店</th><th>状态</th><th>申请时间</th><th>操作</th></tr></thead><tbody><tr v-if="loading"><td colspan="10" class="return-state"><i class="fas fa-spinner fa-spin"></i> 正在加载...</td></tr><tr v-else-if="!refunds.length"><td colspan="10" class="return-state">暂无退款申请</td></tr><tr v-for="item in refunds" v-else :key="item.id"><td>{{ item.refundNo }}</td><td>{{ item.orderNo }}</td><td>{{ item.productName }}</td><td>{{ item.userName }}<small>{{ item.phone }}</small></td><td class="amount">¥{{ item.amount.toFixed(2) }}</td><td><span class="reason-pill">{{ item.reason }}</span></td><td>{{ item.storeName }}</td><td><span class="status-pill" :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span></td><td>{{ item.createdAt }}</td><td class="actions"><button class="btn btn-sm btn-outline" @click="openDetail(item)"><i class="fas fa-eye"></i> 详情</button><button v-if="item.status === 0" class="btn btn-sm btn-success" @click="audit(item, true)">通过</button><button v-if="item.status === 0" class="btn btn-sm btn-danger" @click="audit(item, false)">拒绝</button></td></tr></tbody></table></div></div><div v-if="totalPages > 1" class="card-footer return-pagination"><button class="icon-btn" :disabled="page === 1" @click="changePage(page - 1)"><i class="fas fa-angle-left"></i></button><span>{{ page }} / {{ totalPages }}</span><button class="icon-btn" :disabled="page === totalPages" @click="changePage(page + 1)"><i class="fas fa-angle-right"></i></button></div></section>
      <aside class="returns-sidebar">
        <section class="card sidebar-card"><div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 退款原因分布</span></div><div class="card-body distribution-list"><div v-if="!reasonDistribution.length" class="sidebar-empty">暂无分布数据</div><div v-for="item in reasonDistribution" v-else :key="item.name" class="distribution-item"><div class="distribution-meta"><span>{{ item.name }}</span><strong>{{ item.percentage }}%</strong></div><div class="distribution-track"><i :style="{ width: `${item.percentage}%`, background: item.color }"></i></div></div></div></section>
        <section class="card sidebar-card"><div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 处理时效</span></div><div class="card-body"><span class="metric-label">平均处理时间</span><strong class="time-value">{{ operationStats.averageHours === null ? '--' : `${operationStats.averageHours}小时` }}</strong><div class="process-note success"><i class="fas fa-check-circle"></i> 今日已处理 {{ operationStats.processedToday }} 笔退款申请</div><div class="process-note warning"><i class="fas fa-clock"></i> 有 {{ refundStats.pending }} 笔申请待审核</div></div></section>
        <section class="card sidebar-card"><div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 退款统计</span></div><div class="card-body financial-list"><div><span>本周退款金额</span><strong>{{ formatCurrency(operationStats.weeklyAmount) }}</strong></div><div><span>本月退款金额</span><strong>{{ formatCurrency(operationStats.monthlyAmount) }}</strong></div><div><span>退款率</span><strong class="rate">{{ formatRate(operationStats.refundRate) }}</strong></div><div><span>审核通过率</span><strong class="approval">{{ formatRate(operationStats.approvalRate) }}</strong></div></div></section>
        <section class="card reason-summary"><div class="card-header"><span class="card-title">退款原因配置</span></div><div class="card-body"><div class="reason-count"><strong>{{ activeReasons.length }} 个</strong><span>当前可用原因</span></div><div v-if="reasonError" class="return-alert">{{ reasonError }}</div><div class="reason-chips"><span v-for="item in activeReasons" :key="item.id" :style="{ color: item.color, borderColor: item.color }">{{ item.content }}</span></div><button class="btn btn-outline full" @click="openReasonList">管理原因</button></div></section>
      </aside>
    </div>

    <div v-if="detailLoading" class="modal-overlay"><div class="modal-content medium return-state"><i class="fas fa-spinner fa-spin"></i> 正在加载详情...</div></div>
    <div v-if="detail" class="modal-overlay" @click.self="detail = null"><div class="modal-content large"><div class="modal-header"><h3>退款详情</h3><button class="modal-close" @click="detail = null"><i class="fas fa-times"></i></button></div><div class="modal-body"><div class="detail-grid"><div><span>退款单号</span><strong>{{ detail.refundNo }}</strong></div><div><span>关联订单</span><strong>{{ detail.orderNo }}</strong></div><div><span>商品</span><strong>{{ detail.productName }}</strong></div><div><span>规格</span><strong>{{ formatSpec(detail.spec) }}</strong></div><div><span>用户</span><strong>{{ detail.userName }} / {{ detail.phone }}</strong></div><div><span>门店</span><strong>{{ detail.storeName }}</strong></div><div><span>退款原因</span><strong>{{ detail.reason }}</strong></div><div><span>退款金额</span><strong class="amount">¥{{ detail.amount.toFixed(2) }}</strong></div></div></div><div class="modal-footer"><button v-if="detail.status === 0" class="btn btn-success" @click="audit(detail, true)">审核通过</button><button v-if="detail.status === 0" class="btn btn-danger" @click="audit(detail, false)">拒绝申请</button><button class="btn btn-outline" @click="detail = null">关闭</button></div></div></div>

    <div v-if="reasonModal" class="modal-overlay" @click.self="reasonModal = null"><div class="modal-content" :class="reasonModal === 'list' ? 'large' : 'medium'"><div class="modal-header"><h3>{{ reasonModal === 'list' ? '退款原因配置' : reasonModal === 'add' ? '新增退款原因' : '编辑退款原因' }}</h3><button class="modal-close" @click="reasonModal = null"><i class="fas fa-times"></i></button></div><template v-if="reasonModal === 'list'"><div class="modal-body"><div class="reason-modal-toolbar"><span>当前可用 {{ activeReasons.length }} 个退款原因</span><button class="btn btn-primary btn-sm" @click="openAddReason"><i class="fas fa-plus"></i> 新增原因</button></div><div class="table-wrap"><table><thead><tr><th>排序</th><th>原因名称</th><th>显示颜色</th><th>状态</th><th>操作</th></tr></thead><tbody><tr v-if="reasonLoading"><td colspan="5" class="return-state">正在加载...</td></tr><tr v-for="item in reasons" v-else :key="item.id"><td>{{ item.sort }}</td><td>{{ item.content }}</td><td><span class="color-cell"><i :style="{ background: item.color }"></i>{{ item.color.toUpperCase() }}</span></td><td>{{ item.status === 1 ? '启用' : '禁用' }}</td><td class="actions"><button class="btn btn-sm btn-outline" @click="openEditReason(item)">编辑</button><button class="btn btn-sm btn-danger" @click="deleteReason(item)">删除</button></td></tr></tbody></table></div></div></template><form v-else @submit.prevent="saveReason"><div class="modal-body reason-form"><label>原因名称<input v-model.trim="reasonForm.content" required maxlength="100" /></label><label>排序<input v-model.number="reasonForm.sort" type="number" min="1" required /></label><label>显示颜色<div class="color-picker"><input v-model="reasonForm.color" type="color" /><i :style="{ background: reasonForm.color }"></i><span>{{ reasonForm.color.toUpperCase() }}</span></div></label><label v-if="reasonModal === 'edit'">状态<select v-model.number="reasonForm.status"><option :value="1">启用</option><option :value="0">禁用</option></select></label></div><div class="modal-footer"><button type="button" class="btn btn-outline" @click="reasonModal = 'list'">取消</button><button class="btn btn-primary" :disabled="reasonSaving">{{ reasonSaving ? '保存中...' : '保存' }}</button></div></form></div></div>
  </div>
</template>

<style scoped>
.returns-page{display:flex;flex-direction:column;gap:14px}.return-toolbar,.reason-modal-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px}.search-bar{display:flex;gap:8px;flex-wrap:wrap}.search-bar input{width:260px}.return-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.return-stat{min-height:90px;padding:16px 18px;border:1px solid #e2e8f0;border-radius:7px;background:#fff;box-shadow:0 1px 2px rgba(15,23,42,.04);display:flex;flex-direction:column;justify-content:space-between}.return-stat-label{display:flex;align-items:center;gap:7px;color:#64748b;font-size:13px}.return-stat strong{font-size:22px;line-height:1;color:#334155}.return-stat.pending .return-stat-label i,.return-stat.pending strong{color:#d97706}.return-stat.approved .return-stat-label i,.return-stat.approved strong{color:#2563eb}.return-stat.rejected .return-stat-label i,.return-stat.rejected strong{color:#dc2626}.return-stat.amount-stat .return-stat-label i,.return-stat.amount-stat strong{color:#7c3aed}.returns-grid{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:12px}.return-list-card{min-width:0}.text-muted{font-size:13px;color:#64748b}.return-alert{padding:10px 12px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#b91c1c;font-size:13px}.return-state{text-align:center!important;padding:40px 12px!important;color:#64748b}.amount{font-weight:700;color:#dc2626}.status-pill,.reason-pill{display:inline-block;padding:3px 8px;border-radius:4px;font-size:12px;white-space:nowrap}.reason-pill{background:#f1f5f9;color:#475569}.status-pill.pending{background:#fef3c7;color:#92400e}.status-pill.approved{background:#dbeafe;color:#1d4ed8}.status-pill.rejected{background:#fee2e2;color:#b91c1c}.status-pill.done{background:#dcfce7;color:#15803d}.actions{display:flex;gap:5px;white-space:nowrap}td small{display:block;color:#94a3b8;margin-top:2px}.return-pagination{display:flex;justify-content:center;align-items:center;gap:10px}.reason-count{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.reason-count span{font-size:12px;color:#64748b}.reason-chips{display:flex;flex-wrap:wrap;gap:6px;min-height:80px}.reason-chips span{height:fit-content;padding:4px 8px;border:1px solid;border-radius:4px;font-size:12px}.full{width:100%;margin-top:12px}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.detail-grid>div{padding:12px;background:#f8fafc;border-radius:6px}.detail-grid span{display:block;color:#64748b;font-size:12px;margin-bottom:4px}.color-cell,.color-picker{display:flex;align-items:center;gap:8px}.color-cell i,.color-picker i{display:block;width:24px;height:24px;border-radius:4px}.reason-form{display:grid;gap:14px}.reason-form label{display:grid;gap:6px;font-size:13px;color:#475569}.color-picker input{width:56px;height:40px;padding:3px}.color-picker span{font-family:monospace}@media(max-width:1100px){.return-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.returns-grid{grid-template-columns:1fr}.reason-summary{display:none}}@media(max-width:700px){.return-toolbar{align-items:stretch;flex-direction:column}.search-bar>*{width:100%!important}.return-stats{grid-template-columns:1fr 1fr}.return-stat{min-height:82px;padding:14px}.return-stat strong{font-size:19px}.detail-grid{grid-template-columns:1fr}}
</style>
<style scoped>
.returns-grid{grid-template-columns:minmax(0,1fr) 300px;align-items:start}.returns-sidebar{display:flex;flex-direction:column;gap:12px}.sidebar-card{overflow:hidden}.sidebar-card .card-header{min-height:48px}.distribution-list{display:flex;flex-direction:column;gap:13px}.distribution-item{display:flex;flex-direction:column;gap:6px}.distribution-meta{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#334155}.distribution-meta strong{font-size:12px}.distribution-track{height:6px;border-radius:3px;background:#e2e8f0;overflow:hidden}.distribution-track i{display:block;height:100%;min-width:3px;border-radius:3px}.sidebar-empty{padding:18px 0;text-align:center;color:#94a3b8;font-size:13px}.metric-label{display:block;color:#64748b;font-size:12px;margin-bottom:8px}.time-value{display:block;color:#4f6ef7;font-size:27px;margin-bottom:16px}.process-note{padding:10px 12px;border-radius:6px;font-size:12px}.process-note+.process-note{margin-top:9px}.process-note.success{color:#15803d;background:#ecfdf3}.process-note.warning{color:#c2410c;background:#fff7e6}.financial-list{display:flex;flex-direction:column;gap:11px}.financial-list>div{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#334155}.financial-list strong{color:#ef4444}.financial-list strong.rate{color:#f59e0b}.financial-list strong.approval{color:#16a34a}
@media(max-width:1100px){.returns-sidebar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}.reason-summary{display:block;grid-column:1/-1}.sidebar-card{min-width:0}}
@media(max-width:760px){.returns-sidebar{grid-template-columns:1fr}.reason-summary{grid-column:auto}}
</style>
