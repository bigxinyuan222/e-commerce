<!--
  文件：CouponsPage.vue
  所属模块：商品运营模块 - 优惠券管理
  功能说明：优惠券管理页面，提供优惠券的创建、编辑、启停、详情查看等功能。
  关键功能：
    1. 优惠券列表查询（支持按名称、类型、状态筛选）
    2. 优惠券统计概览（总数、发放中、已过期、使用率、类型分布）
    3. 新建优惠券（满减券/抵扣券，支持指定商品/分类范围）
    4. 编辑优惠券（修改名称、面值、门槛、有效期等）
    5. 优惠券启停管理
    6. 优惠券详情查看
  API基础路径：/api/admin/v1
-->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

/** 优惠券数据结构（兼容后端多种字段命名） */
interface Coupon { id: string | number; name?: string; couponType?: number | string; type?: number | string; status?: number | string; value?: number | string; threshold?: number | string; totalQuantity?: number; receivedQuantity?: number; perPersonLimit?: number; usedQuantity?: number; startDate?: string; endDate?: string; scope?: unknown }
/** 组件Props */
interface Props { token?: string }
const props = defineProps<Props>()
const coupons = ref<Coupon[]>([])        // 优惠券列表
const loading = ref(false)               // 列表加载状态
const error = ref('')                    // 列表错误信息
const keyword = ref('')                  // 搜索关键词
const couponType = ref('')               // 优惠券类型筛选
const status = ref('')                   // 状态筛选
const page = ref(1)                      // 当前页码
const pageSize = ref(10)                 // 每页条数
const total = ref(0)                     // 优惠券总数
/** 计算属性：当前页显示的优惠券列表（前端分页） */
const pageCoupons = computed(() => coupons.value.slice(0, pageSize.value))
const detail = ref<Coupon & { scope?: unknown } | null>(null) // 优惠券详情数据
const detailLoading = ref(false)         // 详情加载状态
const detailError = ref('')              // 详情错误信息
const createOpen = ref(false)            // 新建弹窗是否打开
const createLoading = ref(false)         // 新建提交中状态
const createError = ref('')              // 新建错误信息
const editOpen = ref(false)              // 编辑弹窗是否打开
const editLoading = ref(false)           // 编辑提交中状态
const editError = ref('')                // 编辑错误信息
const editId = ref<Coupon['id'] | null>(null) // 正在编辑的优惠券ID
const editForm = ref({ name: '', couponType: 1, type: 1, faceValue: 0, thresholdAmount: 0, startTime: '', endTime: '', totalCount: 1, perPersonLimit: 1, scope: [] as Array<{ scopeType: number; targetId: number }> }) // 编辑表单
const form = ref({ name: '', couponType: 2, type: 1, faceValue: 0, thresholdAmount: 0, startTime: '', endTime: '', totalCount: 500, perPersonLimit: 1, scope: [] as unknown[] }) // 新建表单
/** 计算属性：已过期的优惠券数量 */
const expiredCount = computed(() => coupons.value.filter(isExpired).length)
/** 计算属性：发放中的优惠券数量（启用且未过期） */
const activeCount = computed(() => coupons.value.filter(item => Number(item.status) === 1 && !isExpired(item)).length)
/** 计算属性：累计领取数量 */
const issuedCount = computed(() => coupons.value.reduce((sum, item) => sum + Number(item.receivedQuantity || 0), 0))
/** 计算属性：累计使用数量 */
const usedCount = computed(() => coupons.value.reduce((sum, item) => sum + Number(item.usedQuantity || 0), 0))
/** 计算属性：使用率（已使用/已领取） */
const usageRate = computed(() => issuedCount.value ? Math.round(usedCount.value / issuedCount.value * 100) : 0)
/** 计算属性：满减券数量 */
const discountCount = computed(() => coupons.value.filter(item => Number(item.couponType) === 1).length)
/** 计算属性：抵扣券数量 */
const voucherCount = computed(() => coupons.value.filter(item => Number(item.couponType) === 2).length)
/** 计算属性：优惠券总数（用于百分比计算，最少为1） */
const visibleCount = computed(() => Math.max(coupons.value.length, 1))
/** 计算属性：满减券占比 */
const discountRate = computed(() => Math.round(discountCount.value / visibleCount.value * 100))
/** 计算属性：抵扣券占比 */
const voucherRate = computed(() => Math.round(voucherCount.value / visibleCount.value * 100))

/**
 * 发送HTTP请求并解析JSON响应
 * @param url - 请求URL
 * @param options - fetch配置选项
 * @returns 解析后的响应数据
 */
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
/** 打开新建优惠券弹窗 */
function openCreate() { createError.value = ''; createOpen.value = true }
/** 关闭新建弹窗（提交中时禁止关闭） */
function closeCreate() { if (!createLoading.value) createOpen.value = false }
/** 将本地时间格式化为API所需的带时区ISO格式（+08:00） */
function toApiDateTime(value: string) {
  if (!value) return ''
  const withSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) ? `${value}:00` : value
  return /(?:Z|[+-]\d{2}:\d{2})$/.test(withSeconds) ? withSeconds : `${withSeconds}+08:00`
}
/**
 * 创建优惠券
 * API: POST /api/v1/admin/coupons
 */
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
/** 打开编辑弹窗，从详情数据填充编辑表单 */
function openEdit() {
  if (!detail.value) return
  const item: any = detail.value
  editId.value = item.id
  editError.value = ''
  editForm.value = {
    name: String(item.name || ''), couponType: Number(item.couponType ?? item.coupon_type ?? 1), type: Number(item.type ?? 1),
    faceValue: Number(item.faceValue ?? item.face_value ?? item.value ?? 0), thresholdAmount: Number(item.thresholdAmount ?? item.threshold_amount ?? item.threshold ?? 0),
    startTime: String(item.startTime ?? item.start_time ?? item.startDate ?? '').replace(' ', 'T').slice(0, 16), endTime: String(item.endTime ?? item.end_time ?? item.endDate ?? '').replace(' ', 'T').slice(0, 16),
    totalCount: Number(item.totalCount ?? item.total_count ?? item.totalQuantity ?? 1), perPersonLimit: Number(item.perPersonLimit ?? item.per_person_limit ?? 1),
    scope: Array.isArray(item.scope) ? item.scope.map((scope: any) => ({ scopeType: Number(scope.scope_type ?? scope.scopeType), targetId: Number(scope.target_id ?? scope.targetId) })) : [],
  }
  detail.value = null
  editOpen.value = true
}
/**
 * 更新优惠券
 * API: PUT /api/v1/admin/coupons/{id}
 */
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
/**
 * 切换优惠券启用/禁用状态
 * API: PUT /api/v1/admin/coupons/{id}/toggle
 */
async function toggleCoupon() {
  if (!detail.value) return
  try {
    await request(`/api/v1/admin/coupons/${encodeURIComponent(String(detail.value.id))}/toggle`, { method: 'PUT' })
    ;(window as any).showToast?.(Number(detail.value.status) === 1 ? '优惠券已禁用' : '优惠券已启用', 'success')
    detail.value = null; await loadCoupons()
  } catch (err) { ;(window as any).showToast?.(err instanceof Error ? err.message : '状态更新失败', 'error') }
}
/** 将API返回的优惠券数据标准化为前端统一格式（兼容多种字段命名） */
function normalize(row: Record<string, unknown>): Coupon {
  return {
    ...row,
    id: (row.id ?? row.ID ?? '-') as string | number,
    name: String(row.name ?? ''),
    couponType: (row.couponType ?? row.coupon_type) as Coupon['couponType'],
    type: row.type as Coupon['type'],
    value: (row.faceValue ?? row.face_value ?? row.value) as Coupon['value'],
    threshold: (row.thresholdAmount ?? row.threshold_amount ?? row.threshold) as Coupon['threshold'],
    totalQuantity: Number(row.totalCount ?? row.total_count ?? row.totalQuantity ?? 0),
    receivedQuantity: Number(row.claimedCount ?? row.claimed_count ?? row.receivedQuantity ?? row.received_count ?? 0),
    perPersonLimit: Number(row.perPersonLimit ?? row.per_person_limit ?? 0),
    usedQuantity: Number(row.usedQuantity ?? row.used_count ?? 0),
    status: row.status,
    startDate: String(row.startDate ?? row.start_time ?? row.startTime ?? ''),
    endDate: formatEndTime(String(row.endDate ?? row.end_time ?? row.endTime ?? '')),
  } as Coupon
}
/** 格式化结束时间字符串（统一为 YYYY-MM-DD HH:mm:ss 格式） */
function formatEndTime(value: string) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}:\d{2})/)
  return match ? `${match[1]} ${match[2]}` : value
}
/** 提取日期部分（YYYY-MM-DD） */
function dateOnly(value: string | undefined) { return value ? value.slice(0, 10) : '-' }
/** 判断优惠券是否已过期 */
function isExpired(item: Coupon) { return Boolean(item.endDate && new Date(item.endDate).getTime() < Date.now()) }
/** 格式化优惠券有效期文本 */
function periodText(item: Coupon) { return `${dateOnly(item.startDate)} ~ ${dateOnly(item.endDate)}` }
/** 根据优惠券类型格式化优惠描述（满减或抵扣） */
function discountText(item: Coupon) {
  return Number(item.couponType) === 1 ? `满${Number(item.threshold || 0)}减${Number(item.value || 0)}` : `¥${Number(item.value || 0)}`
}
/** 格式化优惠券适用范围文本 */
function rangeText(item: Coupon) {
  const value: any = item as any
  const scopes = Array.isArray(value.scope) ? value.scope : []
  if (scopes.length) return scopeText(scopes)
  return scopeTypeLabel(value.scope_type ?? value.scopeType ?? value.apply_type ?? value.applyType ?? 0)
}
/** 根据范围类型值返回中文描述（全场通用/指定商品/指定分类） */
function scopeTypeLabel(value: unknown) {
  if (Number(value) === 1) return '指定商品'
  if (Number(value) === 2) return '指定分类'
  if (Number(value) === 0) return '全场通用'
  return `未知范围(${String(value ?? '-')})`
}
/** 将适用范围数组格式化为可读文本 */
function scopeText(scope: unknown) {
  if (!Array.isArray(scope) || !scope.length) return '全场通用'
  return scope.map((item: any) => {
    const label = scopeTypeLabel(item.scope_type ?? item.scopeType ?? item.apply_type ?? item.applyType)
    const targetName = item.target_name ?? item.targetName ?? item.name
    return targetName ? `${label}：${targetName}` : label
  }).join('、')
}
/**
 * 加载优惠券列表
 * API: GET /api/v1/admin/coupons
 * 获取列表后并行请求每个优惠券的详情以获取适用范围信息
 */
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
/**
 * 加载优惠券详情
 * API: GET /api/v1/admin/coupons/{id}
 * @param id - 优惠券ID
 */
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
/** 根据优惠券类型返回中文标签 */
function typeLabel(type: Coupon['couponType']) { return type === 1 || type === '1' ? '满减券' : type === 2 || type === '2' ? '抵扣券' : String(type || '-') }
/** 根据状态值返回中文标签 */
function statusLabel(value: Coupon['status']) { return value === 1 || value === '1' ? '启用' : value === 0 || value === '0' ? '禁用' : String(value || '-') }
/** 列表中切换优惠券状态 */
async function toggleCouponItem(item: Coupon) { detail.value = item; await toggleCoupon() }
/** 列表中编辑优惠券（先加载详情再打开编辑弹窗） */
async function editCouponItem(item: Coupon) { await loadDetail(item.id); if (detail.value) openEdit() }
/** 执行搜索：重置页码并重新加载列表 */
function search() { page.value = 1; void loadCoupons() }
/** 监听页码和每页条数变化，自动重新加载列表 */
watch([page, pageSize], () => void loadCoupons())
/** 组件挂载：注册全局创建优惠券入口并加载列表 */
onMounted(() => {
  ;(window as any).openCouponCreate = openCreate
  void loadCoupons()
})
/** 组件卸载：清理全局创建优惠券入口 */
onUnmounted(() => {
  delete (window as any).openCouponCreate
})
</script>

<template>
  <div class="coupon-page">
    <!-- 搜索工具栏：关键词 + 状态筛选 + 类型筛选 + 新建按钮 -->
    <div class="coupon-toolbar">
      <div class="coupon-filters">
        <input v-model="keyword" placeholder="优惠券名称" @keyup.enter="search" />
        <select v-model="status" @change="search">
          <option value="">全部状态</option>
          <option value="0">禁用</option>
          <option value="1">启用</option>
        </select>
        <select v-model="couponType" @change="search">
          <option value="">全部类型</option>
          <option value="1">满减券</option>
          <option value="2">抵扣券</option>
        </select>
        <button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 搜索</button>
      </div>
      <button type="button" class="btn btn-primary coupon-create-button" @click="openCreate"><i class="fas fa-plus"></i> 新建优惠券</button>
    </div>
    <!-- 错误提示栏 -->
    <div v-if="error" class="coupon-error">
      {{ error }}
      <button class="btn btn-sm btn-outline" @click="loadCoupons">重试</button>
    </div>
    <!-- 优惠券统计卡片 -->
    <div class="coupon-stat-grid">
      <div class="coupon-stat-card">
        <span><i class="fas fa-ticket-alt"></i> 总优惠券</span>
        <strong>{{ total }}</strong>
      </div>
      <div class="coupon-stat-card is-active">
        <span><i class="fas fa-check-circle"></i> 发放中</span>
        <strong>{{ activeCount }}</strong>
      </div>
      <div class="coupon-stat-card is-expired">
        <span><i class="fas fa-clock"></i> 已过期</span>
        <strong>{{ expiredCount }}</strong>
      </div>
      <div class="coupon-stat-card is-rate">
        <span><i class="fas fa-percent"></i> 使用率</span>
        <strong>{{ usageRate }}%</strong>
      </div>
    </div>
    <!-- 优惠券列表 + 类型分布面板 -->
    <div class="coupon-dashboard">
      <!-- 优惠券列表表格 -->
      <div class="card coupon-card">
        <div class="coupon-section-title"><span><i class="fas fa-ticket-alt"></i> 优惠券列表</span></div>
        <div class="card-body no-pad">
          <div v-if="loading" class="coupon-loading">正在加载优惠券...</div>
          <div v-else class="coupon-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>名称</th>
                  <th>类型</th>
                  <th>优惠</th>
                  <th>门槛</th>
                  <th>有效期</th>
                  <th>适用范围</th>
                  <th>领取数量</th>
                  <th>每人限领</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="coupon in pageCoupons" :key="coupon.id" @click="loadDetail(coupon.id)">
                  <td class="coupon-name-cell">{{ coupon.name || '-' }}</td>
                  <td><span class="coupon-type-tag" :class="Number(coupon.couponType) === 2 ? 'is-voucher' : 'is-discount'">{{ typeLabel(coupon.couponType) }}</span></td>
                  <td class="coupon-benefit">{{ discountText(coupon) }}</td>
                  <td>{{ Number(coupon.threshold || 0) ? `¥${coupon.threshold}` : '无门槛' }}</td>
                  <td>{{ periodText(coupon) }}</td>
                  <td><span class="coupon-scope-tag">{{ rangeText(coupon) }}</span></td>
                  <td>{{ coupon.receivedQuantity ?? 0 }}/{{ coupon.totalQuantity ?? 0 }}</td>
                  <td>{{ coupon.perPersonLimit ?? 0 }} 张</td>
                  <td>
                    <span v-if="isExpired(coupon)" class="status-badge gray"><span class="dot"></span>已过期</span>
                    <span v-else class="status-badge" :class="Number(coupon.status) === 1 ? 'green' : 'gray'"><span class="dot"></span>{{ statusLabel(coupon.status) }}</span>
                  </td>
                  <td>
                    <div class="coupon-row-actions">
                      <button v-if="Number(coupon.status) === 0 && !isExpired(coupon)" class="btn btn-xs btn-outline" @click.stop="editCouponItem(coupon)"><i class="fas fa-edit"></i> 编辑</button>
                      <button class="btn btn-xs" :class="Number(coupon.status) === 1 ? 'btn-danger' : 'btn-primary'" @click.stop="toggleCouponItem(coupon)"><i :class="Number(coupon.status) === 1 ? 'fas fa-times' : 'fas fa-play'"></i> {{ Number(coupon.status) === 1 ? '停用' : '启用' }}</button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!pageCoupons.length"><td colspan="10" class="coupon-empty">暂无优惠券数据</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="coupon-pagination">
          <span>共 {{ total }} 条，每页 10 条</span>
          <button class="btn btn-sm btn-outline" :disabled="page <= 1" @click="page--">上一页</button>
          <span>第 {{ page }} 页</span>
          <button class="btn btn-sm btn-outline" :disabled="page * pageSize >= total" @click="page++">下一页</button>
        </div>
      </div>
      <!-- 优惠券类型分布面板 -->
      <aside class="coupon-insights">
        <div class="card coupon-insight-card">
          <div class="coupon-section-title"><span><i class="fas fa-chart-bar"></i> 优惠券类型分布</span></div>
          <div class="coupon-insight-body">
            <div class="coupon-progress-label">
              <span><i class="fas fa-percent"></i> 满减券</span>
              <strong>{{ discountRate }}%</strong>
            </div>
            <div class="coupon-progress"><span :style="{ width: `${discountRate}%` }"></span></div>
            <div class="coupon-progress-label voucher">
              <span><i class="fas fa-ticket-alt"></i> 抵扣券</span>
              <strong>{{ voucherRate }}%</strong>
            </div>
            <div class="coupon-progress voucher"><span :style="{ width: `${voucherRate}%` }"></span></div>
          </div>
        </div>
      </aside>
    </div>
    <!-- 优惠券详情弹窗 -->
    <div v-if="detail || detailLoading || detailError" class="modal-overlay" @click.self="detail = null">
      <div class="modal-content coupon-detail-modal">
        <div class="modal-header">
          <h3>优惠券详情</h3>
          <button class="icon-btn" @click="detail = null"><i class="fas fa-times"></i></button>
        </div>
        <div v-if="detailLoading" class="coupon-loading">正在加载优惠券详情...</div>
        <div v-else-if="detailError" class="coupon-error">{{ detailError }}</div>
        <div v-else-if="detail" class="coupon-detail-grid">
          <div><span>ID</span><strong>{{ detail.id }}</strong></div>
          <div><span>名称</span><strong>{{ detail.name }}</strong></div>
          <div><span>类型</span><strong>{{ typeLabel(detail.couponType) }}</strong></div>
          <div><span>适用范围</span><strong>{{ rangeText(detail) }}</strong></div>
          <div><span>面值</span><strong>¥{{ detail.value ?? 0 }}</strong></div>
          <div><span>门槛</span><strong>{{ Number(detail.threshold || 0) ? `¥${detail.threshold}` : '无门槛' }}</strong></div>
          <div><span>领取数量</span><strong>{{ detail.receivedQuantity ?? 0 }}/{{ detail.totalQuantity ?? 0 }}</strong></div>
          <div><span>每人限领</span><strong>{{ detail.perPersonLimit ?? 0 }} 张</strong></div>
          <div><span>有效期</span><strong>{{ periodText(detail) }}</strong></div>
          <div><span>状态</span><strong>{{ statusLabel(detail.status) }}</strong></div>
        </div>
      </div>
    </div>
  </div>
    <!-- 新建优惠券弹窗 -->
    <div v-if="createOpen" class="modal-overlay" @click.self="closeCreate">
      <div class="modal-content coupon-create-modal">
        <div class="modal-header">
          <h3>新增优惠券</h3>
          <button class="icon-btn" @click="closeCreate"><i class="fas fa-times"></i></button>
        </div>
        <form class="coupon-create-form" @submit.prevent="createCoupon">
          <label>名称<input v-model="form.name" required maxlength="100" /></label>
          <label>优惠券类型
            <select v-model.number="form.couponType">
              <option :value="1">满减券</option>
              <option :value="2">抵扣券</option>
            </select>
          </label>
          <label>适用类型
            <select v-model.number="form.type">
              <option :value="1">指定商品</option>
              <option :value="2">指定分类</option>
            </select>
          </label>
          <label>面值<input v-model.number="form.faceValue" type="number" min="0" step="0.01" required /></label>
          <label>使用门槛<input v-model.number="form.thresholdAmount" type="number" min="0" step="0.01" required /></label>
          <label>开始时间<input v-model="form.startTime" type="datetime-local" required /></label>
          <label>结束时间<input v-model="form.endTime" type="datetime-local" required /></label>
          <label>发放总量<input v-model.number="form.totalCount" type="number" min="1" required /></label>
          <label>每人限领<input v-model.number="form.perPersonLimit" type="number" min="1" required /></label>
          <div v-if="createError" class="coupon-error">{{ createError }}</div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="closeCreate">取消</button>
            <button type="submit" class="btn btn-primary" :disabled="createLoading">{{ createLoading ? '提交中...' : '创建优惠券' }}</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="detail" class="coupon-scope-text">适用范围：{{ scopeText(detail.scope) }}</div>
    <!-- 详情操作按钮（编辑/启停） -->
    <div v-if="detail" class="coupon-detail-actions">
      <button type="button" class="btn btn-outline" @click="openEdit"><i class="fas fa-edit"></i> 编辑</button>
      <button type="button" class="btn" :class="Number(detail.status) === 1 ? 'btn-danger' : 'btn-primary'" @click="toggleCoupon"><i class="fas fa-power-off"></i> {{ Number(detail.status) === 1 ? '禁用' : '启用' }}</button>
    </div>
    <!-- 编辑优惠券弹窗 -->
    <div v-if="editOpen" class="modal-overlay" @click.self="editOpen = false">
      <div class="modal-content coupon-create-modal">
        <div class="modal-header">
          <h3>更新优惠券</h3>
          <button class="icon-btn" @click="editOpen = false"><i class="fas fa-times"></i></button>
        </div>
        <form class="coupon-create-form" @submit.prevent="updateCoupon">
          <label>名称<input v-model="editForm.name" required /></label>
          <label>优惠券类型
            <select v-model.number="editForm.couponType">
              <option :value="1">满减券</option>
              <option :value="2">抵扣券</option>
            </select>
          </label>
          <label>适用类型
            <select v-model.number="editForm.type">
              <option :value="1">指定商品</option>
              <option :value="2">指定分类</option>
            </select>
          </label>
          <label>面值<input v-model.number="editForm.faceValue" type="number" min="0" step="0.01" required /></label>
          <label>使用门槛<input v-model.number="editForm.thresholdAmount" type="number" min="0" step="0.01" required /></label>
          <label>开始时间<input v-model="editForm.startTime" type="datetime-local" required /></label>
          <label>结束时间<input v-model="editForm.endTime" type="datetime-local" required /></label>
          <label>发放总量<input v-model.number="editForm.totalCount" type="number" min="1" required /></label>
          <label>每人限领<input v-model.number="editForm.perPersonLimit" type="number" min="1" required /></label>
          <div v-if="editError" class="coupon-error">{{ editError }}</div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="editOpen = false">取消</button>
            <button type="submit" class="btn btn-primary" :disabled="editLoading">{{ editLoading ? '保存中...' : '保存修改' }}</button>
          </div>
        </form>
      </div>
    </div>
</template>
