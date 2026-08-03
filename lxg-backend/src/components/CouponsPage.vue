<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface Coupon { id: string | number; name?: string; type?: number | string; coupon_type?: number | string; status?: number | string; value?: number | string; face_value?: number | string; threshold?: number | string; threshold_amount?: number | string; totalQuantity?: number; receivedQuantity?: number; usedQuantity?: number; startDate?: string; endDate?: string; start_time?: string; end_time?: string; scope?: unknown }
interface Props { token?: string }
const props = defineProps<Props>()
const coupons = ref<Coupon[]>([])
const loading = ref(false)
const error = ref('')
const keyword = ref('')
const couponType = ref('')
const status = ref('')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const detail = ref<Coupon & { scope?: unknown } | null>(null)
const detailLoading = ref(false)
const detailError = ref('')
const createOpen = ref(false)
const createLoading = ref(false)
const createError = ref('')
const editOpen = ref(false)
const editLoading = ref(false)
const editError = ref('')
const editId = ref<Coupon['id'] | null>(null)
const editForm = ref({ name: '', couponType: 1, type: 1, faceValue: 0, thresholdAmount: 0, startTime: '', endTime: '', totalCount: 1, perPersonLimit: 1, scope: [] as Array<{ scopeType: number; targetId: number }> })
const form = ref({ name: '', couponType: 2, type: 1, faceValue: 0, thresholdAmount: 0, startTime: '', endTime: '', totalCount: 500, perPersonLimit: 1, scope: [] as unknown[] })
const expiredCount = computed(() => coupons.value.filter(isExpired).length)
const activeCount = computed(() => coupons.value.filter(item => Number(item.status) === 1 && !isExpired(item)).length)
const issuedCount = computed(() => coupons.value.reduce((sum, item) => sum + Number(item.receivedQuantity || 0), 0))
const usedCount = computed(() => coupons.value.reduce((sum, item) => sum + Number(item.usedQuantity || 0), 0))
const unusedCount = computed(() => Math.max(issuedCount.value - usedCount.value, 0))
const usageRate = computed(() => issuedCount.value ? Math.round(usedCount.value / issuedCount.value * 100) : 0)
const discountCount = computed(() => coupons.value.filter(item => Number(item.type) === 1).length)
const voucherCount = computed(() => coupons.value.filter(item => Number(item.type) === 2).length)
const visibleCount = computed(() => Math.max(coupons.value.length, 1))
const discountRate = computed(() => Math.round(discountCount.value / visibleCount.value * 100))
const voucherRate = computed(() => Math.round(voucherCount.value / visibleCount.value * 100))

async function request(url: string, options: RequestInit = {}) {
  const requestHeaders = new Headers(options.headers)
  if (props.token) requestHeaders.set('Authorization', `Bearer ${props.token}`)
  if (options.body) requestHeaders.set('Content-Type', 'application/json')
  const response = await fetch(url, { ...options, headers: requestHeaders, credentials: 'include' })
  const payload = await response.json().catch(() => null)
  if (!response.ok) throw new Error(payload?.message || `Request failed (${response.status})`)
  if (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200) throw new Error(payload.message || `Request failed (${payload.code})`)
  return payload?.data ?? payload
}
function openCreate() { createError.value = ''; createOpen.value = true }
function closeCreate() { if (!createLoading.value) createOpen.value = false }
function toApiDateTime(value: string) {
  if (!value) return ''
  const withSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) ? `${value}:00` : value
  return /(?:Z|[+-]\d{2}:\d{2})$/.test(withSeconds) ? withSeconds : `${withSeconds}+08:00`
}
async function createCoupon() {
  createLoading.value = true; createError.value = ''
  try {
    const startTime = toApiDateTime(form.value.startTime)
    const endTime = toApiDateTime(form.value.endTime)
    if (new Date(endTime).getTime() <= new Date(startTime).getTime()) throw new Error('结束时间必须晚于开始时间')
    await request('/api/v1/admin/coupons', { method: 'POST', body: JSON.stringify({ name: form.value.name.trim(), couponType: Number(form.value.couponType), type: Number(form.value.type), faceValue: Number(form.value.faceValue), thresholdAmount: Number(form.value.thresholdAmount), startTime, endTime, totalCount: Number(form.value.totalCount), perPersonLimit: Number(form.value.perPersonLimit), scope: form.value.scope }) })
    ;(window as any).showToast?.('优惠券创建成功', 'success')
    createOpen.value = false; page.value = 1; await loadCoupons()
  } catch (err) { createError.value = err instanceof Error ? err.message : 'Failed to create coupon' }
  finally { createLoading.value = false }
}
function openEdit() {
  if (!detail.value) return
  const item: any = detail.value
  editId.value = item.id
  editError.value = ''
  editForm.value = {
    name: String(item.name || ''), couponType: Number(item.coupon_type ?? item.type ?? 1), type: Number(item.type ?? 1),
    faceValue: Number(item.face_value ?? item.value ?? 0), thresholdAmount: Number(item.threshold_amount ?? item.threshold ?? 0),
    startTime: String(item.start_time ?? item.startDate ?? '').replace(' ', 'T').slice(0, 16), endTime: String(item.end_time ?? item.endDate ?? '').replace(' ', 'T').slice(0, 16),
    totalCount: Number(item.total_count ?? item.totalQuantity ?? 1), perPersonLimit: Number(item.per_person_limit ?? 1),
    scope: Array.isArray(item.scope) ? item.scope.map((scope: any) => ({ scopeType: Number(scope.scope_type ?? scope.scopeType), targetId: Number(scope.target_id ?? scope.targetId) })) : [],
  }
  detail.value = null
  editOpen.value = true
}
async function updateCoupon() {
  if (editId.value === null) return
  editLoading.value = true; editError.value = ''
  try {
    const value = editForm.value
    const startTime = toApiDateTime(value.startTime); const endTime = toApiDateTime(value.endTime)
    if (new Date(endTime).getTime() <= new Date(startTime).getTime()) throw new Error('结束时间必须晚于开始时间')
    await request(`/api/v1/admin/coupons/${encodeURIComponent(String(editId.value))}`, { method: 'PUT', body: JSON.stringify({ ...value, startTime, endTime }) })
    ;(window as any).showToast?.('优惠券更新成功', 'success')
    editOpen.value = false; detail.value = null; await loadCoupons()
  } catch (err) { editError.value = err instanceof Error ? err.message : '优惠券更新失败' }
  finally { editLoading.value = false }
}
async function toggleCoupon() {
  if (!detail.value) return
  try {
    await request(`/api/v1/admin/coupons/${encodeURIComponent(String(detail.value.id))}/toggle`, { method: 'PUT' })
    ;(window as any).showToast?.(Number(detail.value.status) === 1 ? '优惠券已禁用' : '优惠券已启用', 'success')
    detail.value = null; await loadCoupons()
  } catch (err) { ;(window as any).showToast?.(err instanceof Error ? err.message : '状态更新失败', 'error') }
}
function normalize(row: Record<string, unknown>): Coupon {
  return {
    ...row,
    id: (row.id ?? row.ID ?? '-') as string | number,
    name: String(row.name ?? ''),
    type: (row.type ?? row.coupon_type) as Coupon['type'],
    value: (row.value ?? row.face_value) as Coupon['value'],
    threshold: (row.threshold ?? row.threshold_amount) as Coupon['threshold'],
    totalQuantity: Number(row.totalQuantity ?? row.total_count ?? 0),
    receivedQuantity: Number(row.receivedQuantity ?? row.claimed_count ?? row.received_count ?? 0),
    usedQuantity: Number(row.usedQuantity ?? row.used_count ?? 0),
    status: row.status,
    startDate: String(row.startDate ?? row.start_time ?? row.startTime ?? ''),
    endDate: formatEndTime(String(row.endDate ?? row.end_time ?? row.endTime ?? '')),
  } as Coupon
}
function formatEndTime(value: string) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}:\d{2})/)
  return match ? `${match[1]} ${match[2]}` : value
}
function dateOnly(value: string | undefined) { return value ? value.slice(0, 10) : '-' }
function isExpired(item: Coupon) { return Boolean(item.endDate && new Date(item.endDate).getTime() < Date.now()) }
function periodText(item: Coupon) { return `${dateOnly(item.startDate)} ~ ${dateOnly(item.endDate)}` }
function discountText(item: Coupon) {
  return Number(item.type) === 1 ? `满${Number(item.threshold || 0)}减${Number(item.value || 0)}` : `¥${Number(item.value || 0)}`
}
function rangeText(item: Coupon) {
  const value: any = item as any
  const scopes = Array.isArray(value.scope) ? value.scope : []
  if (scopes.length) return scopeText(scopes)
  return scopeTypeLabel(value.scope_type ?? value.scopeType ?? value.apply_type ?? value.applyType ?? 0)
}
function scopeTypeLabel(value: unknown) {
  if (Number(value) === 1) return '指定商品'
  if (Number(value) === 2) return '指定分类'
  if (Number(value) === 0) return '全场通用'
  return `未知范围(${String(value ?? '-')})`
}
function scopeText(scope: unknown) {
  if (!Array.isArray(scope) || !scope.length) return '全场通用'
  return scope.map((item: any) => {
    const label = scopeTypeLabel(item.scope_type ?? item.scopeType ?? item.apply_type ?? item.applyType)
    const targetName = item.target_name ?? item.targetName ?? item.name
    return targetName ? `${label}：${targetName}` : label
  }).join('、')
}
async function loadCoupons() {
  loading.value = true; error.value = ''
  const params = new URLSearchParams({ page: String(page.value), page_size: String(pageSize.value) })
  if (keyword.value.trim()) params.set('keyword', keyword.value.trim())
  if (couponType.value) params.set('coupon_type', couponType.value)
  if (status.value) params.set('status', status.value)
  try {
    const data = await request(`/api/v1/admin/coupons?${params}`)
    const rows = Array.isArray(data) ? data : (data?.list || data?.items || data?.data || [])
    const normalizedRows: Coupon[] = rows.map((row: Record<string, unknown>) => normalize(row))
    const detailResults = await Promise.allSettled(normalizedRows.map((item: Coupon) =>
      request(`/api/v1/admin/coupons/${encodeURIComponent(String(item.id))}`),
    ))
    coupons.value = normalizedRows.map((item: Coupon, index: number) => {
      const result = detailResults[index]
      if (result.status !== 'fulfilled') return item
      return { ...item, scope: Array.isArray(result.value?.scope) ? result.value.scope : [] }
    })
    total.value = Number(data?.total ?? data?.total_count ?? coupons.value.length)
  } catch (err) { error.value = err instanceof Error ? err.message : 'Failed to load coupons' }
  finally { loading.value = false }
}
async function loadDetail(id: Coupon['id']) {
  detailLoading.value = true; detailError.value = ''; detail.value = null
  try {
    const raw = await request(`/api/v1/admin/coupons/${encodeURIComponent(String(id))}`) as Record<string, unknown>
    const normalized = normalize(raw) as Coupon & { scope?: unknown }
    normalized.scope = Array.isArray(raw.scope) ? raw.scope.map((item: any) => ({ ...item, scope_type_text: scopeTypeLabel(item.scope_type) })) : []
    detail.value = normalized
  }
  catch (err) { detailError.value = err instanceof Error ? err.message : 'Failed to load coupon detail' }
  finally { detailLoading.value = false }
}
function typeLabel(type: Coupon['type']) { return type === 1 || type === '1' ? '满减券' : type === 2 || type === '2' ? '抵扣券' : String(type || '-') }
function statusLabel(value: Coupon['status']) { return value === 1 || value === '1' ? '启用' : value === 0 || value === '0' ? '禁用' : String(value || '-') }
async function toggleCouponItem(item: Coupon) { detail.value = item; await toggleCoupon() }
async function editCouponItem(item: Coupon) { await loadDetail(item.id); if (detail.value) openEdit() }
function search() { page.value = 1; void loadCoupons() }
watch([page, pageSize], () => void loadCoupons())
onMounted(() => {
  ;(window as any).openCouponCreate = openCreate
  void loadCoupons()
})
onUnmounted(() => {
  delete (window as any).openCouponCreate
})
</script>

<template>
  <div class="coupon-page">
    <div class="coupon-toolbar"><div class="coupon-filters"><input v-model="keyword" placeholder="优惠券名称" @keyup.enter="search" /><select v-model="status" @change="search"><option value="">全部状态</option><option value="0">禁用</option><option value="1">启用</option></select><select v-model="couponType" @change="search"><option value="">全部类型</option><option value="1">满减券</option><option value="2">抵扣券</option></select><button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 搜索</button></div><button type="button" class="btn btn-primary coupon-create-button" @click="openCreate"><i class="fas fa-plus"></i> 新建优惠券</button></div>
    <div v-if="error" class="coupon-error">{{ error }} <button class="btn btn-sm btn-outline" @click="loadCoupons">重试</button></div>
    <div class="coupon-stat-grid"><div class="coupon-stat-card"><span><i class="fas fa-ticket-alt"></i> 总优惠券</span><strong>{{ total }}</strong></div><div class="coupon-stat-card is-active"><span><i class="fas fa-check-circle"></i> 发放中</span><strong>{{ activeCount }}</strong></div><div class="coupon-stat-card is-expired"><span><i class="fas fa-clock"></i> 已过期</span><strong>{{ expiredCount }}</strong></div><div class="coupon-stat-card is-rate"><span><i class="fas fa-percent"></i> 使用率</span><strong>{{ usageRate }}%</strong></div></div>
    <div class="coupon-dashboard">
      <div class="card coupon-card"><div class="coupon-section-title"><span><i class="fas fa-ticket-alt"></i> 优惠券列表</span></div><div class="card-body no-pad"><div v-if="loading" class="coupon-loading">正在加载优惠券...</div><div v-else class="coupon-table-wrap"><table><thead><tr><th>名称</th><th>类型</th><th>优惠</th><th>门槛</th><th>有效期</th><th>适用范围</th><th>发放数量</th><th>已使用</th><th>状态</th><th>操作</th></tr></thead><tbody><tr v-for="coupon in coupons" :key="coupon.id" @click="loadDetail(coupon.id)"><td class="coupon-name-cell">{{ coupon.name || '-' }}</td><td><span class="coupon-type-tag" :class="Number(coupon.type) === 2 ? 'is-voucher' : 'is-discount'">{{ typeLabel(coupon.type) }}</span></td><td class="coupon-benefit">{{ discountText(coupon) }}</td><td>{{ Number(coupon.threshold || 0) ? `¥${coupon.threshold}` : '无门槛' }}</td><td>{{ periodText(coupon) }}</td><td><span class="coupon-scope-tag">{{ rangeText(coupon) }}</span></td><td>{{ coupon.receivedQuantity ?? 0 }}/{{ coupon.totalQuantity ?? 0 }}</td><td>{{ coupon.usedQuantity ?? 0 }}</td><td><span v-if="isExpired(coupon)" class="status-badge gray"><span class="dot"></span>已过期</span><span v-else class="status-badge" :class="Number(coupon.status) === 1 ? 'green' : 'gray'"><span class="dot"></span>{{ statusLabel(coupon.status) }}</span></td><td><div class="coupon-row-actions"><button v-if="Number(coupon.status) === 0 && !isExpired(coupon)" class="btn btn-xs btn-outline" @click.stop="editCouponItem(coupon)"><i class="fas fa-edit"></i> 编辑</button><button class="btn btn-xs" :class="Number(coupon.status) === 1 ? 'btn-danger' : 'btn-primary'" @click.stop="toggleCouponItem(coupon)"><i :class="Number(coupon.status) === 1 ? 'fas fa-times' : 'fas fa-play'"></i> {{ Number(coupon.status) === 1 ? '停用' : '启用' }}</button></div></td></tr><tr v-if="!coupons.length"><td colspan="10" class="coupon-empty">暂无优惠券数据</td></tr></tbody></table></div></div><div class="coupon-pagination"><span>共 {{ total }} 条</span><button class="btn btn-sm btn-outline" :disabled="page <= 1" @click="page--">上一页</button><span>第 {{ page }} 页</span><button class="btn btn-sm btn-outline" :disabled="page * pageSize >= total" @click="page++">下一页</button></div></div>
      <aside class="coupon-insights"><div class="card coupon-insight-card"><div class="coupon-section-title"><span><i class="fas fa-chart-bar"></i> 优惠券类型分布</span></div><div class="coupon-insight-body"><div class="coupon-progress-label"><span><i class="fas fa-percent"></i> 满减券</span><strong>{{ discountRate }}%</strong></div><div class="coupon-progress"><span :style="{ width: `${discountRate}%` }"></span></div><div class="coupon-progress-label voucher"><span><i class="fas fa-ticket-alt"></i> 抵扣券</span><strong>{{ voucherRate }}%</strong></div><div class="coupon-progress voucher"><span :style="{ width: `${voucherRate}%` }"></span></div></div></div><div class="card coupon-insight-card"><div class="coupon-section-title"><span><i class="fas fa-info-circle"></i> 发放统计</span></div><div class="coupon-issue-stats"><div><span>已发放总量</span><strong>{{ issuedCount }}</strong></div><div><span>已使用数量</span><strong class="green">{{ usedCount }}</strong></div><div><span>未使用数量</span><strong>{{ unusedCount }}</strong></div></div></div></aside>
    </div>
    <div v-if="detail || detailLoading || detailError" class="modal-overlay" @click.self="detail = null"><div class="modal-content coupon-detail-modal"><div class="modal-header"><h3>优惠券详情</h3><button class="icon-btn" @click="detail = null"><i class="fas fa-times"></i></button></div><div v-if="detailLoading" class="coupon-loading">正在加载优惠券详情...</div><div v-else-if="detailError" class="coupon-error">{{ detailError }}</div><div v-else-if="detail" class="coupon-detail-grid"><div><span>ID</span><strong>{{ detail.id }}</strong></div><div><span>名称</span><strong>{{ detail.name }}</strong></div><div><span>类型</span><strong>{{ typeLabel(detail.type) }}</strong></div><div><span>面值</span><strong>{{ detail.value }}</strong></div><div><span>门槛</span><strong>{{ detail.threshold }}</strong></div><div><span>状态</span><strong>{{ statusLabel(detail.status) }}</strong></div></div></div></div>
  </div>
    <div v-if="createOpen" class="modal-overlay" @click.self="closeCreate"><div class="modal-content coupon-create-modal"><div class="modal-header"><h3>新增优惠券</h3><button class="icon-btn" @click="closeCreate"><i class="fas fa-times"></i></button></div><form class="coupon-create-form" @submit.prevent="createCoupon"><label>名称<input v-model="form.name" required maxlength="100" /></label><label>优惠券类型<select v-model.number="form.couponType"><option :value="1">满减券</option><option :value="2">抵扣券</option></select></label><label>适用类型<select v-model.number="form.type"><option :value="1">指定商品</option><option :value="2">指定分类</option></select></label><label>面值<input v-model.number="form.faceValue" type="number" min="0" step="0.01" required /></label><label>使用门槛<input v-model.number="form.thresholdAmount" type="number" min="0" step="0.01" required /></label><label>开始时间<input v-model="form.startTime" type="datetime-local" required /></label><label>结束时间<input v-model="form.endTime" type="datetime-local" required /></label><label>发放总量<input v-model.number="form.totalCount" type="number" min="1" required /></label><label>每人限领<input v-model.number="form.perPersonLimit" type="number" min="1" required /></label><div v-if="createError" class="coupon-error">{{ createError }}</div><div class="modal-actions"><button type="button" class="btn btn-outline" @click="closeCreate">取消</button><button type="submit" class="btn btn-primary" :disabled="createLoading">{{ createLoading ? '提交中...' : '创建优惠券' }}</button></div></form></div></div>
    <div v-if="detail" class="coupon-scope-text">适用范围：{{ scopeText(detail.scope) }}</div>
    <div v-if="detail" class="coupon-detail-actions"><button type="button" class="btn btn-outline" @click="openEdit"><i class="fas fa-edit"></i> 编辑</button><button type="button" class="btn" :class="Number(detail.status) === 1 ? 'btn-danger' : 'btn-primary'" @click="toggleCoupon"><i class="fas fa-power-off"></i> {{ Number(detail.status) === 1 ? '禁用' : '启用' }}</button></div>
    <div v-if="editOpen" class="modal-overlay" @click.self="editOpen = false"><div class="modal-content coupon-create-modal"><div class="modal-header"><h3>更新优惠券</h3><button class="icon-btn" @click="editOpen = false"><i class="fas fa-times"></i></button></div><form class="coupon-create-form" @submit.prevent="updateCoupon"><label>名称<input v-model="editForm.name" required /></label><label>优惠券类型<select v-model.number="editForm.couponType"><option :value="1">满减券</option><option :value="2">抵扣券</option></select></label><label>适用类型<select v-model.number="editForm.type"><option :value="1">指定商品</option><option :value="2">指定分类</option></select></label><label>面值<input v-model.number="editForm.faceValue" type="number" min="0" step="0.01" required /></label><label>使用门槛<input v-model.number="editForm.thresholdAmount" type="number" min="0" step="0.01" required /></label><label>开始时间<input v-model="editForm.startTime" type="datetime-local" required /></label><label>结束时间<input v-model="editForm.endTime" type="datetime-local" required /></label><label>发放总量<input v-model.number="editForm.totalCount" type="number" min="1" required /></label><label>每人限领<input v-model.number="editForm.perPersonLimit" type="number" min="1" required /></label><div v-if="editError" class="coupon-error">{{ editError }}</div><div class="modal-actions"><button type="button" class="btn btn-outline" @click="editOpen = false">取消</button><button type="submit" class="btn btn-primary" :disabled="editLoading">{{ editLoading ? '保存中...' : '保存修改' }}</button></div></form></div></div>
</template>
