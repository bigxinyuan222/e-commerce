<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface Coupon { id: string | number; name?: string; type?: number | string; coupon_type?: number | string; status?: number | string; value?: number | string; face_value?: number | string; threshold?: number | string; threshold_amount?: number | string; totalQuantity?: number; receivedQuantity?: number; usedQuantity?: number; startDate?: string; endDate?: string; start_time?: string; end_time?: string }
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

const headers = () => props.token ? { Authorization: `Bearer ${props.token}` } : {}
async function request(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { ...options, headers: { ...headers(), ...(options.body ? { 'Content-Type': 'application/json' } : {}) }, credentials: 'include' })
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
function scopeTypeLabel(value: unknown) {
  if (Number(value) === 1) return '指定商品'
  if (Number(value) === 2) return '指定分类'
  if (Number(value) === 0) return '全场通用'
  return `未知范围(${String(value ?? '-')})`
}
function scopeText(scope: unknown) {
  if (!Array.isArray(scope) || !scope.length) return '全场通用'
  return scope.map((item: any) => {
    const label = scopeTypeLabel(item.scope_type)
    return item.target_name ? `${label}：${item.target_name}` : label
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
    coupons.value = rows.map(normalize)
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
    <button type="button" class="btn btn-primary coupon-create-button" @click="openCreate"><i class="fas fa-plus"></i> 新增优惠券</button>
    <div class="coupon-toolbar"><div><h1>优惠券管理</h1><p>管理优惠券及发放状态</p></div><div class="coupon-filters"><input v-model="keyword" placeholder="搜索券名称" @keyup.enter="search" /><select v-model="couponType" @change="search"><option value="">全部类型</option><option value="1">满减券</option><option value="2">抵扣券</option></select><select v-model="status" @change="search"><option value="">全部状态</option><option value="0">禁用</option><option value="1">启用</option></select><button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 查询</button></div></div>
    <div v-if="error" class="coupon-error">{{ error }} <button class="btn btn-sm btn-outline" @click="loadCoupons">重试</button></div>
    <div class="card coupon-card"><div class="card-body no-pad"><div v-if="loading" class="coupon-loading">正在加载优惠券...</div><table v-else><thead><tr><th>编号</th><th>券名称</th><th>类型</th><th>面值</th><th>使用门槛</th><th>发放/领取/使用</th><th>状态</th><th>有效期</th></tr></thead><tbody><tr v-for="coupon in coupons" :key="coupon.id" @click="loadDetail(coupon.id)"><td>{{ coupon.id }}</td><td>{{ coupon.name || '-' }}</td><td><span class="tag primary">{{ typeLabel(coupon.type) }}</span></td><td>¥{{ coupon.value ?? 0 }}</td><td>¥{{ coupon.threshold ?? 0 }}</td><td>{{ coupon.totalQuantity ?? 0 }} / {{ coupon.receivedQuantity ?? 0 }} / {{ coupon.usedQuantity ?? 0 }}</td><td><span class="status-badge" :class="coupon.status === 1 || coupon.status === '1' ? 'green' : 'gray'"><span class="dot"></span>{{ statusLabel(coupon.status) }}</span></td><td>{{ coupon.endDate || '-' }}</td></tr><tr v-if="!coupons.length"><td colspan="8" class="coupon-empty">暂无优惠券数据</td></tr></tbody></table></div><div class="coupon-pagination"><span>共 {{ total }} 条</span><button class="btn btn-sm btn-outline" :disabled="page <= 1" @click="page--">上一页</button><span>第 {{ page }} 页</span><button class="btn btn-sm btn-outline" :disabled="page * pageSize >= total" @click="page++">下一页</button></div></div>
    <div v-if="detail || detailLoading || detailError" class="modal-overlay" @click.self="detail = null"><div class="modal-content coupon-detail-modal"><div class="modal-header"><h3>优惠券详情</h3><button class="icon-btn" @click="detail = null"><i class="fas fa-times"></i></button></div><div v-if="detailLoading" class="coupon-loading">正在加载优惠券详情...</div><div v-else-if="detailError" class="coupon-error">{{ detailError }}</div><div v-else-if="detail" class="coupon-detail-grid"><div><span>ID</span><strong>{{ detail.id }}</strong></div><div><span>名称</span><strong>{{ detail.name }}</strong></div><div><span>类型</span><strong>{{ typeLabel(detail.type) }}</strong></div><div><span>面值</span><strong>{{ detail.value }}</strong></div><div><span>门槛</span><strong>{{ detail.threshold }}</strong></div><div><span>状态</span><strong>{{ statusLabel(detail.status) }}</strong></div><div class="coupon-detail-scope"><span>适用范围</span><pre>{{ JSON.stringify(detail.scope ?? [], null, 2) }}</pre></div></div></div></div>
  </div>
    <div v-if="createOpen" class="modal-overlay" @click.self="closeCreate"><div class="modal-content coupon-create-modal"><div class="modal-header"><h3>新增优惠券</h3><button class="icon-btn" @click="closeCreate"><i class="fas fa-times"></i></button></div><form class="coupon-create-form" @submit.prevent="createCoupon"><label>名称<input v-model="form.name" required maxlength="100" /></label><label>优惠券类型<select v-model.number="form.couponType"><option :value="1">满减券</option><option :value="2">抵扣券</option></select></label><label>适用类型<select v-model.number="form.type"><option :value="1">指定商品</option><option :value="2">指定分类</option></select></label><label>面值<input v-model.number="form.faceValue" type="number" min="0" step="0.01" required /></label><label>使用门槛<input v-model.number="form.thresholdAmount" type="number" min="0" step="0.01" required /></label><label>开始时间<input v-model="form.startTime" type="datetime-local" required /></label><label>结束时间<input v-model="form.endTime" type="datetime-local" required /></label><label>发放总量<input v-model.number="form.totalCount" type="number" min="1" required /></label><label>每人限领<input v-model.number="form.perPersonLimit" type="number" min="1" required /></label><div v-if="createError" class="coupon-error">{{ createError }}</div><div class="modal-actions"><button type="button" class="btn btn-outline" @click="closeCreate">取消</button><button type="submit" class="btn btn-primary" :disabled="createLoading">{{ createLoading ? '提交中...' : '创建优惠券' }}</button></div></form></div></div>
    <div v-if="detail" class="coupon-scope-text">适用范围：{{ scopeText(detail.scope) }}</div>
    <div v-if="detail" class="coupon-detail-actions"><button type="button" class="btn btn-outline" @click="openEdit"><i class="fas fa-edit"></i> 编辑</button><button type="button" class="btn" :class="Number(detail.status) === 1 ? 'btn-danger' : 'btn-primary'" @click="toggleCoupon"><i class="fas fa-power-off"></i> {{ Number(detail.status) === 1 ? '禁用' : '启用' }}</button></div>
    <div v-if="editOpen" class="modal-overlay" @click.self="editOpen = false"><div class="modal-content coupon-create-modal"><div class="modal-header"><h3>更新优惠券</h3><button class="icon-btn" @click="editOpen = false"><i class="fas fa-times"></i></button></div><form class="coupon-create-form" @submit.prevent="updateCoupon"><label>名称<input v-model="editForm.name" required /></label><label>优惠券类型<select v-model.number="editForm.couponType"><option :value="1">满减券</option><option :value="2">抵扣券</option></select></label><label>适用类型<select v-model.number="editForm.type"><option :value="1">指定商品</option><option :value="2">指定分类</option></select></label><label>面值<input v-model.number="editForm.faceValue" type="number" min="0" step="0.01" required /></label><label>使用门槛<input v-model.number="editForm.thresholdAmount" type="number" min="0" step="0.01" required /></label><label>开始时间<input v-model="editForm.startTime" type="datetime-local" required /></label><label>结束时间<input v-model="editForm.endTime" type="datetime-local" required /></label><label>发放总量<input v-model.number="editForm.totalCount" type="number" min="1" required /></label><label>每人限领<input v-model.number="editForm.perPersonLimit" type="number" min="1" required /></label><div v-if="editError" class="coupon-error">{{ editError }}</div><div class="modal-actions"><button type="button" class="btn btn-outline" @click="editOpen = false">取消</button><button type="submit" class="btn btn-primary" :disabled="editLoading">{{ editLoading ? '保存中...' : '保存修改' }}</button></div></form></div></div>
</template>
