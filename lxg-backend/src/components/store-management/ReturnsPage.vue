<!--
  文件名称：ReturnsPage.vue
  所属模块：门店管理模块（store-management）
  功能说明：退货退款页面，展示退款申请列表，支持关键词搜索/状态筛选、退款统计卡片、退款原因分布、
           查看退款详情（含凭证图片）、审核通过/拒绝、退款原因配置管理（增删改查+自定义颜色）、
           以及今日/本周/本月的退款统计（退款率、审核通过率）。
  接口说明：API 基础路径 /api/v1/admin/refunds（退款列表/详情/审核）和 /api/v1/admin/refund-reasons（原因配置）
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

type Id = number | string
// 退款申请数据结构
interface Refund {
  id: Id
  refundNo: string
  orderId: Id | ''
  orderNo: string
  productName: string
  amount: number
  userId: Id | ''
  userName: string
  phone: string
  storeId: Id | ''
  storeName: string
  reasonId: Id | ''
  reason: string
  reasonType: string
  description: string
  images: string[]
  status: number
  createdAt: string
  updatedAt: string
  adminId: Id | ''
  auditRemark: string
  auditedAt: string
  refundPaymentId: Id | null
  refundedAt: string | null
  spec: unknown
  price: number
}
// 退款原因配置结构
interface RefundReason { id: Id; content: string; sort: number; status: number; color: string }
// 退款周期统计结构（退款笔数/退款率/审核通过率）
interface RefundPeriodStats { refundCount: number; refundRate: number; approvalRate: number }

const props = defineProps<{ token?: string; storeId?: Id | null }>()
const refunds = ref<Refund[]>([])              // 退款申请列表
const reasons = ref<RefundReason[]>([])        // 退款原因配置列表
const loading = ref(false)                     // 列表加载状态
const reasonLoading = ref(false)               // 原因列表加载状态
const error = ref('')                          // 列表加载错误信息
const reasonError = ref('')                    // 原因列表加载错误信息
const keyword = ref('')                        // 搜索关键词（退款单号/订单号/用户）
const status = ref<number | ''>('')            // 选中的状态筛选值
const page = ref(1)                            // 当前页码
const pageSize = 20                            // 每页条数
const total = ref(0)                           // 退款总条数
// 退款统计（待审核/已通过/已拒绝/退款金额）
const refundStats = reactive({ pending: 0, approved: 0, rejected: 0, amount: 0 })
// 运营统计（平均处理时长/今日处理数/周月退款金额/退款率/通过率）
const operationStats = reactive({ averageHours: null as number | null, processedToday: 0, weeklyAmount: 0, monthlyAmount: 0, refundRate: null as number | null, approvalRate: null as number | null })
// 周期统计（今日/本周/本月的退款笔数、退款率、审核通过率）
const periodStats = reactive<Record<'today' | 'week' | 'month', RefundPeriodStats>>({
  today: { refundCount: 0, refundRate: 0, approvalRate: 0 },
  week: { refundCount: 0, refundRate: 0, approvalRate: 0 },
  month: { refundCount: 0, refundRate: 0, approvalRate: 0 },
})
const statsLoading = ref(false)                // 统计加载状态
const statsError = ref('')                     // 统计加载错误信息
const detail = ref<Refund | null>(null)        // 详情弹窗中的退款数据
const detailLoading = ref(false)               // 详情加载状态
const reasonModal = ref<'list' | 'add' | 'edit' | null>(null) // 原因配置弹窗模式（列表/新增/编辑）
const editingReasonId = ref<Id | null>(null)   // 当前编辑的原因ID
const reasonSaving = ref(false)                // 原因保存中状态
const reasonForm = reactive({ content: '', sort: 1, status: 1, color: '#64748b' }) // 原因编辑表单
const colorStorageKey = 'lexiangou_refund_reason_colors' // localStorage 存储原因颜色的键名

// 计算总页数
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
// 启用状态的退款原因列表
const activeReasons = computed(() => reasons.value.filter(item => item.status === 1))
// 退款原因分布统计（按原因名称计数，取前5，用于侧边栏展示）
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
// 状态筛选下拉选项（0=待审核 1=已通过 2=已拒绝 3=已完成）
const statusOptions = [
  { value: '', label: '全部状态' }, { value: 0, label: '待审核' },
  { value: 1, label: '已通过' }, { value: 2, label: '已拒绝' }, { value: 3, label: '已完成' },
]
// 周期统计标签
const statPeriods: Array<{ key: 'today' | 'week' | 'month'; label: string }> = [
  { key: 'today', label: '今日' }, { key: 'week', label: '本周' }, { key: 'month', label: '本月' },
]

/** 构建请求头，携带 JWT Token，可选设置 JSON Content-Type */
function authHeaders(json = false) {
  const headers = new Headers()
  if (json) headers.set('Content-Type', 'application/json')
  if (props.token) headers.set('Authorization', `Bearer ${props.token}`)
  return headers
}

/** 统一请求封装，自动解析 code/data 结构并抛出业务错误 */
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

/** 轻量级提示（通过全局 showToast 方法） */
function notify(message: string, type: 'success' | 'error' = 'success') {
  const toast = (window as unknown as { showToast?: (text: string, kind: string) => void }).showToast
  toast?.(message, type)
}

/** 将后端退款行数据归一化为前端 Refund 结构（兼容蛇形/驼峰命名） */
function normalizeRefund(row: any): Refund {
  return {
    id: row.refund_id ?? row.refundId ?? row.ID ?? row.id,
    refundNo: String(row.refund_no ?? row.refundNo ?? row.ID ?? row.id ?? '-'),
    orderId: row.order_id ?? row.orderId ?? '',
    orderNo: String(row.order_no ?? row.orderNo ?? row.order_id ?? row.orderId ?? '-'),
    productName: String(row.productNames ?? row.product_names ?? row.product_name ?? row.productName ?? row.goods_name ?? '-'),
    amount: Number(row.totalAmount ?? row.total_amount ?? row.refund_amount ?? row.refundAmount ?? row.amount) || 0,
    userId: row.user_id ?? row.userId ?? '',
    userName: String(row.userNickname ?? row.user_nickname ?? row.user_name ?? row.userName ?? '-'), phone: String(row.phone ?? row.userPhone ?? '-'),
    storeId: row.store_id ?? row.storeId ?? '', storeName: String(row.store_name ?? row.storeName ?? '-'),
    reasonId: row.refund_reason_id ?? row.refundReasonId ?? '',
    reason: String(row.refundReason ?? row.refund_reason ?? row.reason ?? '-'), reasonType: String(row.reason_type ?? row.reasonType ?? 'other'),
    description: String(row.description ?? ''), images: Array.isArray(row.images) ? row.images.filter((item: unknown) => typeof item === 'string') : [],
    status: Number(row.status ?? 0), createdAt: String(row.createdAt ?? row.created_at ?? row.CreatedAt ?? '-'),
    updatedAt: String(row.updatedAt ?? row.updated_at ?? row.UpdatedAt ?? '-'),
    adminId: row.admin_id ?? row.adminId ?? '', auditRemark: String(row.audit_remark ?? row.auditRemark ?? ''),
    auditedAt: String(row.audited_at ?? row.auditedAt ?? ''), refundPaymentId: row.refund_payment_id ?? row.refundPaymentId ?? null,
    refundedAt: row.refunded_at ?? row.refundedAt ?? null,
    spec: row.spec_values ?? row.spec ?? '', price: Number(row.price ?? 0),
  }
}

/** 从接口返回数据和列表中更新退款统计（待审核/已通过/已拒绝/退款金额/运营指标） */
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

/** 金额格式化为人民币（保留2位小数） */
function formatCurrency(value: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 2 }).format(value)
}

/** 格式化比率（支持小数和百分比，统一输出 x%） */
function formatRate(value: number | null) {
  if (value === null || !Number.isFinite(Number(value))) return '--'
  const normalized = Number(value) <= 1 ? Number(value) * 100 : Number(value)
  return `${normalized.toFixed(normalized % 1 ? 1 : 0)}%`
}

/** 从 localStorage 读取退款原因颜色配置 */
function readColors(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(colorStorageKey) || '{}') } catch { return {} }
}
/** 保存退款原因颜色到 localStorage（同时存 ID 和名称键） */
function saveColor(id: Id | null | undefined, name: string, color: string) {
  const colors = readColors()
  if (id !== null && id !== undefined && id !== '') colors[`id:${id}`] = color
  if (name) colors[`name:${name}`] = color
  localStorage.setItem(colorStorageKey, JSON.stringify(colors))
}
/** 从 localStorage 删除指定退款原因的颜色配置 */
function removeColor(id: Id, name: string) {
  const colors = readColors(); delete colors[`id:${id}`]; delete colors[`name:${name}`]
  localStorage.setItem(colorStorageKey, JSON.stringify(colors))
}

/** 加载退款申请列表（API: GET /api/v1/admin/refunds），同步更新统计 */
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

/** 加载退款周期统计（API: GET /api/v1/admin/refunds/stats），含今日/本周/本月数据 */
async function loadPeriodStats() {
  statsLoading.value = true; statsError.value = ''
  try {
    const data = await requestJson('/api/v1/admin/refunds/stats', { headers: authHeaders() })
    for (const key of ['today', 'week', 'month'] as const) {
      const value = data?.[key] ?? {}
      periodStats[key] = {
        refundCount: Number(value.refundCount ?? value.refund_count) || 0,
        refundRate: Number(value.refundRate ?? value.refund_rate) || 0,
        approvalRate: Number(value.approvalRate ?? value.approval_rate) || 0,
      }
    }
  } catch (cause) { statsError.value = cause instanceof Error ? cause.message : '退款统计加载失败' }
  finally { statsLoading.value = false }
}

/** 加载退款原因配置列表（API: GET /api/v1/admin/refund-reasons），读取本地颜色配置 */
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

/** 点击搜索：重置页码后加载列表 */
async function search() { page.value = 1; await loadRefunds() }
/** 状态筛选变更：重置页码后加载列表 */
async function changeStatus() { page.value = 1; await loadRefunds() }
/** 翻页：校验边界后加载列表 */
async function changePage(next: number) { if (next < 1 || next > totalPages.value || next === page.value) return; page.value = next; await loadRefunds() }

/** 打开退款详情弹窗（API: GET /api/v1/admin/refunds/:id），合并列表与详情数据 */
async function openDetail(item: Refund) {
  detailLoading.value = true
  try {
    const data = await requestJson(`/api/v1/admin/refunds/${item.id}`, { headers: authHeaders() })
    const row = data?.refund ?? data?.detail ?? data
    const normalized = normalizeRefund(row ?? {})
    detail.value = {
      ...item,
      ...normalized,
      id: normalized.id ?? item.id,
      refundNo: normalized.refundNo !== '-' ? normalized.refundNo : item.refundNo,
      orderId: normalized.orderId || item.orderId,
      orderNo: normalized.orderNo !== '-' ? normalized.orderNo : item.orderNo,
      productName: normalized.productName !== '-' ? normalized.productName : item.productName,
      userId: normalized.userId || item.userId,
      userName: normalized.userName !== '-' ? normalized.userName : item.userName,
      phone: normalized.phone !== '-' ? normalized.phone : item.phone,
      storeId: normalized.storeId || item.storeId,
      storeName: normalized.storeName !== '-' ? normalized.storeName : item.storeName,
      reasonId: normalized.reasonId || item.reasonId,
      reason: normalized.reason !== '-' ? normalized.reason : item.reason,
      description: normalized.description || item.description,
      images: normalized.images.length ? normalized.images : item.images,
    }
  }
  catch (cause) { notify(cause instanceof Error ? cause.message : '退款详情加载失败', 'error') }
  finally { detailLoading.value = false }
}

/** 审核退款申请（API: PUT /api/v1/admin/refunds/:id/audit），通过需备注"同意退款"，拒绝需输入原因 */
async function audit(item: Refund, approved: boolean) {
  const remark = approved ? '同意退款' : window.prompt('请输入拒绝原因：')
  if (!remark) return
  try {
    await requestJson(`/api/v1/admin/refunds/${item.id}/audit`, { method: 'PUT', headers: authHeaders(true), body: JSON.stringify({ approved, remark }) })
    notify(approved ? '审核通过' : '审核已拒绝'); detail.value = null; await loadRefunds()
  } catch (cause) { notify(cause instanceof Error ? cause.message : '审核失败', 'error') }
}

/** 打开退款原因列表弹窗 */
function openReasonList() { reasonModal.value = 'list' }
/** 打开新增退款原因弹窗：重置表单为默认值 */
function openAddReason() { editingReasonId.value = null; Object.assign(reasonForm, { content: '', sort: reasons.value.length + 1, status: 1, color: '#64748b' }); reasonModal.value = 'add' }
/** 打开编辑退款原因弹窗：填充当前原因数据到表单 */
function openEditReason(item: RefundReason) { editingReasonId.value = item.id; Object.assign(reasonForm, item); reasonModal.value = 'edit' }

/** 保存退款原因（新增 API: POST /api/v1/admin/refund-reasons，编辑 API: PUT /api/v1/admin/refund-reasons/:id） */
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

/** 删除退款原因（API: DELETE /api/v1/admin/refund-reasons/:id），同时清理本地颜色配置 */
async function deleteReason(item: RefundReason) {
  if (!window.confirm(`确定删除退款原因“${item.content}”吗？`)) return
  try { await requestJson(`/api/v1/admin/refund-reasons/${item.id}`, { method: 'DELETE', headers: authHeaders() }); removeColor(item.id, item.content); await loadReasons(); notify('删除成功') }
  catch (cause) { notify(cause instanceof Error ? cause.message : '删除失败', 'error') }
}

/** 退款状态码 → 中文标签映射 */
function statusLabel(value: number) { return ['待审核', '已通过', '已拒绝', '已完成'][value] || '未知' }
/** 退款状态码 → CSS类名映射 */
function statusClass(value: number) { return ['pending', 'approved', 'rejected', 'done'][value] || '' }
/** 格式化商品规格：对象拆解为 "key: value / ..." 字符串 */
function formatSpec(value: unknown) { return typeof value === 'object' && value ? Object.entries(value as object).map(([key, val]) => `${key}: ${val}`).join(' / ') : String(value || '-') }

// 组件挂载时并行加载退款列表、原因配置和周期统计
onMounted(() => { void Promise.all([loadRefunds(), loadReasons(), loadPeriodStats()]) })
</script>

<template>
  <div class="returns-page">
    <!-- 搜索工具栏：关键词搜索 + 状态筛选 + 退款原因配置入口 -->
    <div class="return-toolbar">
      <div class="search-bar">
        <input id="returnSearchInput" v-model="keyword" placeholder="退款单号 / 订单号 / 用户" @keyup.enter="search" />
        <select v-model="status" @change="changeStatus">
          <option v-for="option in statusOptions" :key="String(option.value)" :value="option.value">{{ option.label }}
        </option>
      </select>
        <button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 查询</button>
      </div>
      <button class="btn btn-outline" @click="openReasonList"><i class="fas fa-sliders-h"></i> 退款原因配置</button>
    </div>
    <!-- 错误提示 -->
    <div v-if="error" class="return-alert">{{ error }}</div>
    <!-- 退款统计卡片区 -->
    <section class="return-stats" aria-label="退款统计">
      <div class="return-stat pending">
        <div class="return-stat-label"><i class="fas fa-clock"></i><span>待审核</span></div>
        <strong>{{ refundStats.pending }}</strong>
      </div>
      <div class="return-stat approved">
        <div class="return-stat-label"><i class="fas fa-check-circle"></i><span>已通过</span></div>
        <strong>{{ refundStats.approved }}</strong>
      </div>
      <div class="return-stat rejected">
        <div class="return-stat-label"><i class="fas fa-times-circle"></i><span>已拒绝</span></div>
        <strong>{{ refundStats.rejected }}</strong>
      </div>
      <div class="return-stat amount-stat">
        <div class="return-stat-label"><i class="fas fa-yen-sign"></i><span>退款金额</span></div>
        <strong>{{ formatCurrency(refundStats.amount) }}</strong>
      </div>
    </section>
    <!-- 主体区域：左侧退款列表 + 右侧侧边栏（统计+原因） -->
    <div class="returns-grid">
      <!-- 退款申请列表卡片 -->
      <section class="card return-list-card">
        <div class="card-header">
          <span class="card-title"><i class="fas fa-undo"></i> 退款申请列表</span>
          <span class="text-muted">共 {{ total }} 笔</span>
        </div>
        <div class="card-body no-pad">
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>退款单号</th>
                  <th>关联订单</th>
                  <th>商品</th>
                  <th>用户</th>
                  <th>退款金额</th>
                  <th>原因</th>
                  <th>门店</th>
                  <th>状态</th>
                  <th>申请时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
              <!-- 加载中 -->
              <tr v-if="loading">
                <td colspan="10" class="return-state"><i class="fas fa-spinner fa-spin"></i> 正在加载...</td>
              </tr>
              <!-- 空数据 -->
              <tr v-else-if="!refunds.length">
                <td colspan="10" class="return-state">暂无退款申请</td>
              </tr>
              <!-- 退款数据行 -->
              <tr v-for="item in refunds" v-else :key="item.id">
                  <td>{{ item.refundNo }}</td>
                  <td>{{ item.orderNo }}</td>
                  <td>{{ item.productName }}</td>
                  <td>{{ item.userName }}<small>{{ item.phone }}</small></td>
                  <td class="amount">¥{{ item.amount.toFixed(2) }}</td>
                  <td><span class="reason-pill">{{ item.reason }}</span></td>
                  <td>{{ item.storeName }}</td>
                  <td><span class="status-pill" :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span></td>
                  <td>{{ item.createdAt }}</td>
                  <td class="actions">
                    <!-- 详情按钮 -->
                    <button class="btn btn-sm btn-outline" @click="openDetail(item)"><i class="fas fa-eye"></i> 详情</button>
                    <!-- 待审核状态显示通过/拒绝按钮 -->
                    <button v-if="item.status === 0" class="btn btn-sm btn-success" @click="audit(item, true)">通过</button>
                    <button v-if="item.status === 0" class="btn btn-sm btn-danger" @click="audit(item, false)">拒绝</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="totalPages > 1" class="card-footer return-pagination">
          <button class="icon-btn" :disabled="page === 1" @click="changePage(page - 1)"><i class="fas fa-angle-left"></i></button>
          <span>{{ page }} / {{ totalPages }}</span>
          <button class="icon-btn" :disabled="page === totalPages" @click="changePage(page + 1)"><i class="fas fa-angle-right"></i></button>
        </div>
      </section>
      <aside class="returns-sidebar">
        <section class="card sidebar-card refund-period-card">
          <div class="card-header">
            <span class="card-title"><i class="fas fa-chart-line"></i> 退款统计</span>
            <button class="icon-btn" title="刷新统计" :disabled="statsLoading" @click="loadPeriodStats"><i class="fas fa-sync-alt" :class="{ 'fa-spin': statsLoading }"></i></button>
          </div>
          <div class="card-body">
            <div v-if="statsError" class="return-alert">{{ statsError }}</div>
            <div class="period-stat-list">
              <div v-for="item in statPeriods" :key="item.key" class="period-stat">
                <h4>{{ item.label }}</h4>
                <div><span>退款笔数</span><strong>{{ periodStats[item.key].refundCount }} 笔</strong></div>
                <div><span>退款率</span><strong class="rate">{{ formatRate(periodStats[item.key].refundRate) }}</strong></div>
                <div><span>审核通过率</span><strong class="approval">{{ formatRate(periodStats[item.key].approvalRate) }}</strong></div>
              </div>
            </div>
          </div>
        </section>
        <section class="card reason-summary">
          <div class="card-header">
            <span class="card-title">退款原因配置</span>
          </div>
          <div class="card-body">
            <div class="reason-count"><strong>{{ activeReasons.length }} 个</strong><span>当前可用原因</span></div>
            <div v-if="reasonError" class="return-alert">{{ reasonError }}</div>
            <div class="reason-chips"><span v-for="item in activeReasons" :key="item.id" :style="{ color: item.color, borderColor: item.color }">{{ item.content }}</span></div>
            <button class="btn btn-outline full" @click="openReasonList">管理原因</button>
          </div>
        </section>
      </aside>
    </div>

    <div v-if="detailLoading" class="modal-overlay">
      <div class="modal-content medium return-state"><i class="fas fa-spinner fa-spin"></i> 正在加载详情...</div>
    </div>
    <div v-if="detail" class="modal-overlay" @click.self="detail = null">
      <div class="modal-content large refund-detail-modal">
        <div class="modal-header">
          <h3>退款详情</h3>
          <button class="modal-close" @click="detail = null"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="detail-grid">
            <div><span>退款申请ID</span><strong>{{ detail.id }}</strong></div>
            <div><span>退款单号</span><strong>{{ detail.refundNo }}</strong></div>
            <div><span>订单ID</span><strong>{{ detail.orderId || '-' }}</strong></div>
            <div><span>订单号</span><strong>{{ detail.orderNo }}</strong></div>
            <div class="detail-wide"><span>订单商品</span><strong>{{ detail.productName }}</strong></div>
            <div><span>用户ID</span><strong>{{ detail.userId || '-' }}</strong></div>
            <div><span>用户昵称</span><strong>{{ detail.userName }}</strong></div>
            <div><span>处理门店ID</span><strong>{{ detail.storeId || '-' }}</strong></div>
            <div><span>处理门店</span><strong>{{ detail.storeName }}</strong></div>
            <div><span>退货原因ID</span><strong>{{ detail.reasonId || '-' }}</strong></div>
            <div><span>退款原因</span><strong>{{ detail.reason }}</strong></div>
            <div><span>退款金额</span><strong class="amount">{{ formatCurrency(detail.amount) }}</strong></div>
            <div><span>当前状态</span><strong><span class="status-pill" :class="statusClass(detail.status)">{{ statusLabel(detail.status) }}</span></strong></div>
            <div class="detail-wide"><span>退货说明</span><strong class="detail-description">{{ detail.description || '无退货说明' }}</strong></div>
            <div><span>审核管理员ID</span><strong>{{ detail.adminId || '未审核' }}</strong></div>
            <div><span>审核时间</span><strong>{{ detail.auditedAt || '未审核' }}</strong></div>
            <div class="detail-wide"><span>审核备注</span><strong>{{ detail.auditRemark || '无审核备注' }}</strong></div>
            <div><span>退款支付ID</span><strong>{{ detail.refundPaymentId ?? '未产生' }}</strong></div>
            <div><span>退款到账时间</span><strong>{{ detail.refundedAt || '未到账' }}</strong></div>
            <div><span>申请时间</span><strong>{{ detail.createdAt }}</strong></div>
            <div><span>更新时间</span><strong>{{ detail.updatedAt }}</strong></div>
            <div class="detail-wide">
              <span>凭证图片</span>
              <div v-if="detail.images.length" class="refund-images"><a v-for="(image,index) in detail.images" :key="image" :href="image" target="_blank" rel="noopener noreferrer"><img :src="image" :alt="`退款凭证 ${index + 1}`"></a></div>
              <strong v-else>无凭证图片</strong>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="detail.status === 0" class="btn btn-success" @click="audit(detail, true)">审核通过</button>
          <button v-if="detail.status === 0" class="btn btn-danger" @click="audit(detail, false)">拒绝申请</button>
          <button class="btn btn-outline" @click="detail = null">关闭</button>
        </div>
      </div>
    </div>

    <div v-if="reasonModal" class="modal-overlay" @click.self="reasonModal = null">
      <div class="modal-content" :class="reasonModal === 'list' ? 'large' : 'medium'">
        <div class="modal-header">
          <h3>{{ reasonModal === 'list' ? '退款原因配置' : reasonModal === 'add' ? '新增退款原因' : '编辑退款原因' }}</h3>
          <button class="modal-close" @click="reasonModal = null"><i class="fas fa-times"></i></button>
        </div>
        <template v-if="reasonModal === 'list'">
          <div class="modal-body">
            <div class="reason-modal-toolbar">
              <span>当前可用 {{ activeReasons.length }} 个退款原因</span>
              <button class="btn btn-primary btn-sm" @click="openAddReason"><i class="fas fa-plus"></i> 新增原因</button>
            </div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>排序</th>
                    <th>原因名称</th>
                    <th>显示颜色</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="reasonLoading">
                    <td colspan="5" class="return-state">正在加载...</td>
                  </tr>
                  <tr v-for="item in reasons" v-else :key="item.id">
                    <td>{{ item.sort }}</td>
                    <td>{{ item.content }}</td>
                    <td><span class="color-cell"><i :style="{ background: item.color }"></i>{{ item.color.toUpperCase() }}</span></td>
                    <td>{{ item.status === 1 ? '启用' : '禁用' }}</td>
                    <td class="actions">
                      <button class="btn btn-sm btn-outline" @click="openEditReason(item)">编辑</button>
                      <button class="btn btn-sm btn-danger" @click="deleteReason(item)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
        <form v-else @submit.prevent="saveReason">
          <div class="modal-body reason-form">
            <label>原因名称<input v-model.trim="reasonForm.content" required maxlength="100" /></label>
            <label>排序<input v-model.number="reasonForm.sort" type="number" min="1" required /></label>
            <label>显示颜色<div class="color-picker"><input v-model="reasonForm.color" type="color" /><i :style="{ background: reasonForm.color }"></i><span>{{ reasonForm.color.toUpperCase() }}</span></div></label>
            <label v-if="reasonModal === 'edit'">状态<select v-model.number="reasonForm.status"><option :value="1">启用</option><option :value="0">禁用</option></select></label>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="reasonModal = 'list'">取消</button>
            <button class="btn btn-primary" :disabled="reasonSaving">{{ reasonSaving ? '保存中...' : '保存' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<!--
  样式区块说明：
  1. 基础布局：页面纵向排列、工具栏左右分布、搜索栏弹性换行
  2. 统计卡片区：4列网格，各状态用不同主题色区分（黄/蓝/红/紫）
  3. 主体网格：左侧退款列表 + 右侧260px侧边栏
  4. 表格与状态标签：退款金额红色、状态标签胶囊配色（待审核黄/已通过蓝/已拒绝红/已完成绿）
  5. 分页栏：居中排列上一页/下一页按钮
  6. 侧边栏组件：原因数量统计、原因芯片列表、管理按钮
  7. 退款详情弹窗：2列网格布局、凭证图片缩略图样式
  8. 退款原因表单：网格布局、颜色选择器样式
  9. 响应式：中屏统计卡片2列+隐藏侧边栏，小屏工具栏纵向排列
-->
<style scoped>
/* 页面整体布局：纵向排列各区块 */
.returns-page{display:flex;flex-direction:column;gap:14px}
/* 工具栏与原因弹窗工具栏：左右分布 */
.return-toolbar,.reason-modal-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px}
/* 搜索栏：弹性换行 */
.search-bar{display:flex;gap:8px;flex-wrap:wrap}
/* 搜索输入框宽度 */
.search-bar input{width:260px}
/* 统计卡片区：4列网格布局 */
.return-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
/* 单个统计卡片样式 */
.return-stat{min-height:90px;padding:16px 18px;border:1px solid #e2e8f0;border-radius:7px;background:#fff;box-shadow:0 1px 2px rgba(15,23,42,.04);display:flex;flex-direction:column;justify-content:space-between}
/* 卡片标签样式 */
.return-stat-label{display:flex;align-items:center;gap:7px;color:#64748b;font-size:13px}
/* 卡片数值字号 */
.return-stat strong{font-size:22px;line-height:1;color:#334155}
/* 各状态主题色：待审核黄、已通过蓝、已拒绝红、退款金额紫 */
.return-stat.pending .return-stat-label i,.return-stat.pending strong{color:#d97706}
.return-stat.approved .return-stat-label i,.return-stat.approved strong{color:#2563eb}
.return-stat.rejected .return-stat-label i,.return-stat.rejected strong{color:#dc2626}
.return-stat.amount-stat .return-stat-label i,.return-stat.amount-stat strong{color:#7c3aed}
/* 主体区域网格：左侧列表 + 右侧侧边栏 */
.returns-grid{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:12px}
/* 列表卡片最小宽度 */
.return-list-card{min-width:0}
/* 次要文本 */
.text-muted{font-size:13px;color:#64748b}
/* 错误提示框 */
.return-alert{padding:10px 12px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#b91c1c;font-size:13px}
/* 表格空状态/加载态居中 */
.return-state{text-align:center!important;padding:40px 12px!important;color:#64748b}
/* 金额列样式 */
.amount{font-weight:700;color:#dc2626}
/* 状态标签与原因标签胶囊 */
.status-pill,.reason-pill{display:inline-block;padding:3px 8px;border-radius:4px;font-size:12px;white-space:nowrap}
/* 原因标签配色 */
.reason-pill{background:#f1f5f9;color:#475569}
/* 各状态标签配色：待审核黄、已通过蓝、已拒绝红、已完成绿 */
.status-pill.pending{background:#fef3c7;color:#92400e}
.status-pill.approved{background:#dbeafe;color:#1d4ed8}
.status-pill.rejected{background:#fee2e2;color:#b91c1c}
.status-pill.done{background:#dcfce7;color:#15803d}
/* 操作列按钮排列 */
.actions{display:flex;gap:5px;white-space:nowrap}
/* 表格次要文字（手机号等） */
td small{display:block;color:#94a3b8;margin-top:2px}
/* 分页栏 */
.return-pagination{display:flex;justify-content:center;align-items:center;gap:10px}
/* 原因数量统计区 */
.reason-count{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.reason-count span{font-size:12px;color:#64748b}
/* 原因芯片列表 */
.reason-chips{display:flex;flex-wrap:wrap;gap:6px;min-height:80px}
.reason-chips span{height:fit-content;padding:4px 8px;border:1px solid;border-radius:4px;font-size:12px}
/* 全宽按钮 */
.full{width:100%;margin-top:12px}
/* 退款详情弹窗：2列网格 */
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
/* 信息项背景 */
.detail-grid>div{padding:12px;background:#f8fafc;border-radius:6px}
/* 信息项标签 */
.detail-grid span{display:block;color:#64748b;font-size:12px;margin-bottom:4px}
/* 颜色选择器与颜色展示单元格 */
.color-cell,.color-picker{display:flex;align-items:center;gap:8px}
.color-cell i,.color-picker i{display:block;width:24px;height:24px;border-radius:4px}
/* 原因编辑表单 */
.reason-form{display:grid;gap:14px}
.reason-form label{display:grid;gap:6px;font-size:13px;color:#475569}
/* 颜色输入框 */
.color-picker input{width:56px;height:40px;padding:3px}
.color-picker span{font-family:monospace}
/* 响应式：中屏统计卡片2列+隐藏侧边栏 */
@media(max-width:1100px){.return-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.returns-grid{grid-template-columns:1fr}.reason-summary{display:none}}
/* 响应式：小屏工具栏纵向排列 */
@media(max-width:700px){.return-toolbar{align-items:stretch;flex-direction:column}.search-bar>*{width:100%!important}.return-stats{grid-template-columns:1fr 1fr}.return-stat{min-height:82px;padding:14px}.return-stat strong{font-size:19px}.detail-grid{grid-template-columns:1fr}}
</style>
<style scoped>
/* 侧边栏网格调整：列宽300px，顶部对齐 */
.returns-grid{grid-template-columns:minmax(0,1fr) 300px;align-items:start}
/* 侧边栏：纵向排列卡片 */
.returns-sidebar{display:flex;flex-direction:column;gap:12px}
/* 侧边栏卡片溢出处理 */
.sidebar-card{overflow:hidden}
.sidebar-card .card-header{min-height:48px}
/* 原因分布列表（已弃用，保留兼容） */
.distribution-list{display:flex;flex-direction:column;gap:13px}
.distribution-item{display:flex;flex-direction:column;gap:6px}
.distribution-meta{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#334155}
.distribution-meta strong{font-size:12px}
.distribution-track{height:6px;border-radius:3px;background:#e2e8f0;overflow:hidden}
.distribution-track i{display:block;height:100%;min-width:3px;border-radius:3px}
.sidebar-empty{padding:18px 0;text-align:center;color:#94a3b8;font-size:13px}
/* 运营统计指标（平均处理时长等） */
.metric-label{display:block;color:#64748b;font-size:12px;margin-bottom:8px}
.time-value{display:block;color:#4f6ef7;font-size:27px;margin-bottom:16px}
.process-note{padding:10px 12px;border-radius:6px;font-size:12px}
.process-note+.process-note{margin-top:9px}
.process-note.success{color:#15803d;background:#ecfdf3}
.process-note.warning{color:#c2410c;background:#fff7e6}
/* 财务统计列表（周/月退款金额、退款率、通过率） */
.financial-list{display:flex;flex-direction:column;gap:11px}
.financial-list>div{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#334155}
.financial-list strong{color:#ef4444}
.financial-list strong.rate{color:#f59e0b}
.financial-list strong.approval{color:#16a34a}
/* 响应式：中屏侧边栏3列布局 */
@media(max-width:1100px){.returns-sidebar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}.reason-summary{display:block;grid-column:1/-1}.sidebar-card{min-width:0}}
/* 响应式：小屏侧边栏单列 */
@media(max-width:760px){.returns-sidebar{grid-template-columns:1fr}.reason-summary{grid-column:auto}}
/* 周期统计卡片列表（今日/本周/本月） */
.period-stat-list{display:flex;flex-direction:column;gap:12px}
.period-stat{padding:12px;border:1px solid #e2e8f0;border-radius:7px;background:#f8fafc}
.period-stat h4{margin:0 0 9px;color:#334155;font-size:14px}
.period-stat>div{display:flex;justify-content:space-between;align-items:center;padding:4px 0;color:#64748b;font-size:12px}
.period-stat strong{color:#334155}
.period-stat strong.rate{color:#f59e0b}
.period-stat strong.approval{color:#16a34a}
/* 暗色主题：周期统计卡片 */
[data-theme='dark'] .period-stat{background:#111827;border-color:#334155}
[data-theme='dark'] .period-stat h4,[data-theme='dark'] .period-stat strong{color:#e5e7eb}
/* 退款详情弹窗宽度 */
.refund-detail-modal{width:min(860px,calc(100vw - 32px))}
/* 详情跨列项 */
.detail-wide{grid-column:1/-1}
/* 退货说明文本换行 */
.detail-description{white-space:pre-wrap;line-height:1.6}
/* 凭证图片网格 */
.refund-images{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.refund-images a{border-radius:6px;overflow:hidden}
.refund-images img{display:block;width:96px;height:96px;object-fit:cover;border:1px solid #e2e8f0;border-radius:6px;transition:transform .2s}
.refund-images img:hover{transform:scale(1.04)}
/* 商品名称列溢出省略 */
.product-names{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
</style>
