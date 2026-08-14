<!--
  文件名称：StoreManagePage.vue
  所属模块：门店管理模块（store-management）
  功能说明：门店管理页面，展示当前登录账号绑定门店的详细信息、运营统计数据（今日/累计订单与销售额）、
           订单状态分布饼图（可点击查看对应状态订单列表）、以及编辑门店信息功能。
  接口说明：API 基础路径 /api/v1/admin/stores/my-store（含 orders 子路径）
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

// 门店基本信息结构
interface StoreInfo {
  id: string | number
  name: string
  address: string
  phone: string
  businessHours: string
  status: number
}

// 门店运营统计结构
interface StoreStats {
  todayOrders: number       // 今日订单数
  todaySales: number        // 今日销售额
  pendingShip: number      // 待发货数
  pendingPickup: number     // 待自提数
  pendingRefund: number     // 待退款数
  totalOrders: number       // 总订单数
  totalSales: number        // 总销售额
  distribution: Record<string, number> // 订单状态分布
}

const props = defineProps<{ token?: string }>()

const store = ref<StoreInfo | null>(null)   // 门店基本信息
const stats = ref<StoreStats | null>(null)   // 门店运营统计
const loading = ref(true)                     // 页面加载状态
const error = ref('')                        // 加载错误信息
const editing = ref(false)                    // 编辑弹窗是否打开
const saving = ref(false)                     // 保存中状态
const form = reactive({ name: '', address: '', phone: '', businessHours: '' }) // 门店编辑表单

/** 构建请求头，携带 JWT Token，可选设置 JSON Content-Type */
function headers(json = false) {
  const h = new Headers()
  if (props.token) h.set('Authorization', `Bearer ${props.token}`)
  if (json) h.set('Content-Type', 'application/json')
  return h
}

/** 统一请求封装，自动解析 code/data 结构并抛出业务错误 */
async function request(url: string, options: RequestInit = {}) {
  const r = await fetch(url, { credentials: 'include', ...options })
  const p = await r.json().catch(() => null)
  if (!r.ok || (p?.code !== undefined && ![0, 200].includes(p.code))) throw new Error(p?.message || `请求失败 (${r.status})`)
  return p?.data ?? p
}

/** 将后端门店行数据归一化为前端 StoreInfo 结构（兼容蛇形/驼峰命名） */
function normalizeStore(x: any): StoreInfo {
  return {
    id: x.ID ?? x.id,
    name: String(x.name ?? ''),
    address: String(x.address ?? ''),
    phone: String(x.phone ?? ''),
    businessHours: String(x.businessHours ?? x.business_hours ?? ''),
    status: Number(x.status ?? 1),
  }
}

/** 将后端统计数据归一化为前端 StoreStats 结构（兼容蛇形/驼峰命名，处理分布数据） */
function normalizeStats(data: any): StoreStats {
  const d = data ?? {}
  const rawDist = d.order_status_distribution ?? d.orderStatusDistribution ?? {}
  const distribution: Record<string, number> = {}
  for (const k of Object.keys(rawDist)) {
    const v = rawDist[k]
    distribution[k] = typeof v === 'number' ? v : Number(v ?? 0)
  }
  return {
    todayOrders: Number(d.today_orders ?? d.todayOrders ?? 0),
    todaySales: Number(d.today_sales ?? d.todaySales ?? 0),
    pendingShip: Number(d.pending_ship ?? d.pendingShip ?? 0),
    pendingPickup: Number(d.pending_pickup ?? d.pendingPickup ?? 0),
    pendingRefund: Number(d.pending_refund ?? d.pendingRefund ?? 0),
    totalOrders: Number(d.total_orders ?? d.totalOrders ?? 0),
    totalSales: Number(d.total_sales ?? d.totalSales ?? 0),
    distribution,
  }
}

// 状态键 → 中文标签映射（用于饼图图例与订单详情弹窗标题）
const STATUS_LABEL_MAP: Record<string, string> = {
  pending_payment: '待支付',
  grouping: '待配货',
  pending_delivery: '待发货',
  pending_ship: '待发货',
  pending_pickup: '待自提',
  pending_refund: '待退款',
  completed: '已完成',
  cancelled: '已取消',
  refunding: '退款中',
  rejected: '已拒绝',
  pending: '待处理',
  processing: '处理中',
  shipped: '已发货',
}

// 饼图状态键 → 订单接口数字状态码（0=待支付 2=待发货 3=待自提 4=已完成 5=已取消）
const STATUS_CODE_MAP: Record<string, number> = {
  pending_payment: 0,
  pending_ship: 2,
  pending_pickup: 3,
  completed: 4,
  cancelled: 5,
}

// 数字状态码 → 饼图状态键（用于订单归一化后的展示）
const CODE_STATUS_MAP: Record<number, string> = {
  0: 'pending_payment',
  1: 'grouping',
  2: 'pending_ship',
  3: 'pending_pickup',
  4: 'completed',
  5: 'cancelled',
}

const STATUS_ORDER = ['pending_payment', 'grouping', 'pending_delivery', 'pending_ship', 'pending_pickup', 'pending_refund', 'completed', 'cancelled', 'refunding', 'rejected', 'pending', 'processing', 'shipped']

/** 状态键 → 中文标签 */
function statusLabel(key: string) {
  return STATUS_LABEL_MAP[key] ?? key
}

// 饼图各扇区颜色调色板
const PIE_COLORS = ['#4f6ef7', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1', '#14b8a6']

// 饼图总订单数：优先使用接口权威总数，避免分布求和与总数不一致
const pieTotal = computed(() => {
  if (!stats.value) return 0
  // 优先用接口的权威总数 total_orders，避免 distribution 求和与总数不一致
  if (stats.value.totalOrders > 0) return stats.value.totalOrders
  return Object.values(stats.value.distribution).reduce((a, b) => a + b, 0)
})

// 饼图扇区数据：计算每个状态的弧度路径，单状态绘制整圆
const pieSlices = computed(() => {
  if (!stats.value || pieTotal.value === 0) return []
  const entries = statusEntries.value.filter(([, v]) => v > 0)
  if (entries.length === 0) return []

  const cx = 100, cy = 100, r = 80
  let startAngle = -Math.PI / 2
  const slices: { key: string; label: string; value: number; percent: number; color: string; d: string }[] = []

  // If only one slice, draw a full circle
  if (entries.length === 1) {
    const [key, value] = entries[0]
    slices.push({
      key,
      label: statusLabel(key),
      value,
      percent: 100,
      color: colorOf(key),
      d: `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`,
    })
    return slices
  }

  entries.forEach(([key, value]) => {
    const angle = (value / pieTotal.value) * Math.PI * 2
    const endAngle = startAngle + angle
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const largeArc = angle > Math.PI ? 1 : 0
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`

    slices.push({
      key,
      label: statusLabel(key),
      value,
      percent: Math.round((value / pieTotal.value) * 1000) / 10,
      color: colorOf(key),
      d,
    })
    startAngle = endAngle
  })
  return slices
})

// 全部状态（含 0 值）按 STATUS_ORDER 排序，用于图例与颜色一致分配
const statusEntries = computed<[string, number][]>(() => {
  if (!stats.value) return []
  const entries = Object.entries(stats.value.distribution)
  entries.sort(([a], [b]) => {
    const ia = STATUS_ORDER.indexOf(a)
    const ib = STATUS_ORDER.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
  return entries
})

// 按 statusEntries 的顺序固定分配颜色，保证扇区与图例颜色一致
/** 按状态键查找对应的饼图颜色 */
function colorOf(key: string): string {
  const idx = statusEntries.value.findIndex(([k]) => k === key)
  return idx >= 0 ? PIE_COLORS[idx % PIE_COLORS.length] : '#94a3b8'
}

// 饼图图例数据（含颜色、数值、百分比）
const pieLegendEntries = computed(() => {
  if (!stats.value) return []
  return statusEntries.value.map(([key, value]) => ({
    key,
    label: statusLabel(key),
    value,
    percent: pieTotal.value > 0 ? Math.round((value / pieTotal.value) * 1000) / 10 : 0,
    color: colorOf(key),
  }))
})

/** 轻量级提示（通过全局 showToast 方法） */
function toast(text: string, type = 'success') {
  ;(window as unknown as { showToast?: (text: string, kind: string) => void }).showToast?.(text, type)
}

// ---- 订单详情弹窗 ----
// 订单行结构（用于弹窗中展示）
interface OrderRow {
  id: string | number
  orderNo: string
  userName: string
  phone: string
  payAmount: number
  status: string
  createdAt: string
  items: string
}

const ORDERS_PAGE_SIZE = 10                     // 订单弹窗每页条数
// 订单详情弹窗响应式状态
const ordersModal = reactive({
  open: false,
  statusKey: '',
  loading: false,
  error: '',
  list: [] as OrderRow[],
  total: 0,
  page: 1,
})

// 订单弹窗总页数
const ordersTotalPages = computed(() => Math.max(1, Math.ceil(ordersModal.total / ORDERS_PAGE_SIZE)))

/** 格式化日期时间，非法值返回 "-" */
function formatDate(value: unknown) {
  if (!value) return '-'
  const d = new Date(String(value))
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString('zh-CN', { hour12: false })
}

/** 将后端订单行数据归一化为弹窗展示结构 */
function normalizeOrder(row: any): OrderRow {
  const code = Number(row.status)
  const items = (row.items ?? row.order_items ?? row.orderItems ?? []) as any[]
  return {
    id: row.ID ?? row.id,
    orderNo: String(row.order_no ?? row.orderNo ?? row.ID ?? row.id ?? '-'),
    userName: String(row.user?.nickname ?? row.user_name ?? row.userName ?? '-'),
    phone: String(row.user?.phone ?? row.phone ?? '-'),
    payAmount: Number(row.pay_amount ?? row.payAmount ?? row.amount) || 0,
    status: CODE_STATUS_MAP[code] ?? String(row.status),
    createdAt: formatDate(row.created_at ?? row.createdAt ?? row.CreatedAt),
    items: items.map((it: any) => it.product_name ?? it.productName ?? it.name ?? '-').join('、') || '-',
  }
}

/** 金额格式化为人民币 */
function money(value: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value)
}

/** 加载指定状态的门店订单列表（API: GET /api/v1/admin/stores/my-store/orders?status=:code） */
async function loadOrders() {
  const code = STATUS_CODE_MAP[ordersModal.statusKey]
  if (code === undefined) return
  ordersModal.loading = true
  ordersModal.error = ''
  try {
    const params = new URLSearchParams({ status: String(code), page: String(ordersModal.page), pageSize: String(ORDERS_PAGE_SIZE) })
    const data = await request(`/api/v1/admin/stores/my-store/orders?${params}`, { headers: headers() })
    const list = Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? []
    ordersModal.list = list.map(normalizeOrder)
    ordersModal.total = Number(data?.total ?? data?.total_count ?? list.length)
  } catch (e) {
    ordersModal.list = []
    ordersModal.total = 0
    ordersModal.error = e instanceof Error ? e.message : '订单加载失败'
  } finally {
    ordersModal.loading = false
  }
}

/** 打开订单详情弹窗：设置状态键、重置页码、加载数据 */
function openOrdersModal(statusKey: string) {
  if (STATUS_CODE_MAP[statusKey] === undefined) return
  ordersModal.statusKey = statusKey
  ordersModal.page = 1
  ordersModal.open = true
  void loadOrders()
}

/** 关闭订单详情弹窗 */
function closeOrdersModal() {
  ordersModal.open = false
}

/** 订单弹窗翻页：校验边界后加载列表 */
async function changeOrdersPage(next: number) {
  if (next < 1 || next > ordersTotalPages.value || next === ordersModal.page) return
  ordersModal.page = next
  await loadOrders()
}

/** 加载门店信息和运营统计（API: GET /api/v1/admin/stores/my-store） */
async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = await request('/api/v1/admin/stores/my-store', { headers: headers() })
    const row = data?.store ?? data
    if (!row || typeof row !== 'object' || !(row.ID ?? row.id)) throw new Error('未找到当前账号绑定的门店')
    store.value = normalizeStore(row)
    stats.value = normalizeStats(data)
  } catch (e) {
    store.value = null
    stats.value = null
    error.value = e instanceof Error ? e.message : '门店信息加载失败'
  } finally {
    loading.value = false
  }
}

/** 打开编辑弹窗：将门店当前信息填充到表单 */
function openEdit() {
  if (!store.value) return
  Object.assign(form, {
    name: store.value.name,
    address: store.value.address,
    phone: store.value.phone,
    businessHours: store.value.businessHours,
  })
  editing.value = true
}

/** 保存门店信息（API: PUT /api/v1/admin/stores/:id），保存后重新加载 */
async function save() {
  if (!store.value || saving.value) return
  if (!form.name.trim() || !form.address.trim()) return toast('请填写门店名称和地址', 'error')
  saving.value = true
  try {
    await request(`/api/v1/admin/stores/${store.value.id}`, {
      method: 'PUT',
      headers: headers(true),
      body: JSON.stringify(form),
    })
    editing.value = false
    toast('门店信息保存成功')
    await load()
  } catch (e) {
    toast(e instanceof Error ? e.message : '保存失败', 'error')
  } finally {
    saving.value = false
  }
}

// 组件挂载时加载门店信息
onMounted(load)
</script>

<template>
  <!-- 加载中状态 -->
  <div v-if="loading" class="card">
    <div class="card-body">
      <div class="store-manage-state"><i class="fas fa-spinner fa-spin"></i><span>正在加载门店信息...</span></div>
    </div>
  </div>
  <!-- 加载错误状态 -->
  <div v-else-if="error" class="card">
    <div class="card-body">
      <div class="store-manage-state"><i class="fas fa-exclamation-circle"></i><span>{{ error }}</span></div>
    </div>
  </div>
  <!-- 门店信息正常展示 -->
  <template v-else-if="store">
    <!-- 门店头部：名称、ID、状态、刷新按钮 -->
    <div class="store-manage-header">
      <div class="store-manage-title">
        <i class="fas fa-store"></i>
        <div>
          <h2>{{ store.name || '我的门店' }}</h2>
          <span>门店ID：{{ store.id }}</span>
        </div>
      </div>
      <div class="store-manage-actions">
        <span class="status-badge" :class="store.status === 1 ? 'green' : 'red'"><span class="dot"></span>{{ store.status === 1 ? '营业中' : '已停用' }}</span>
        <button class="btn btn-sm btn-outline" @click="load"><i class="fas fa-sync"></i> 刷新</button>
      </div>
    </div>

    <!-- 今日运营统计卡片 -->
    <template v-if="stats">
      <div class="system-stats-row">
        <div class="stat-card stat-card-primary">
          <div class="label"><i class="fas fa-calendar-day"></i> 今日订单</div>
          <div class="value">{{ stats.todayOrders }}</div>
        </div>
        <div class="stat-card stat-card-success">
          <div class="label"><i class="fas fa-yen-sign"></i> 今日销售额</div>
          <div class="value store-manage-text-value">¥{{ stats.todaySales.toLocaleString() }}</div>
        </div>
        <div class="stat-card stat-card-warning">
          <div class="label"><i class="fas fa-truck"></i> 待发货</div>
          <div class="value">{{ stats.pendingShip }}</div>
        </div>
        <div class="stat-card stat-card-info">
          <div class="label"><i class="fas fa-box"></i> 待自提</div>
          <div class="value">{{ stats.pendingPickup }}</div>
        </div>
        <div class="stat-card stat-card-danger">
          <div class="label"><i class="fas fa-undo"></i> 待退款</div>
          <div class="value">{{ stats.pendingRefund }}</div>
        </div>
      </div>

      <!-- 累计运营统计卡片 -->
      <div class="system-stats-row">
        <div class="stat-card">
          <div class="label"><i class="fas fa-list-alt"></i> 总订单数</div>
          <div class="value">{{ stats.totalOrders }}</div>
        </div>
        <div class="stat-card">
          <div class="label"><i class="fas fa-coins"></i> 总销售额</div>
          <div class="value store-manage-text-value">¥{{ stats.totalSales.toLocaleString() }}</div>
        </div>
      </div>

      <!-- 订单状态分布饼图卡片 -->
      <div class="card">
        <div class="card-header">
          <span class="card-title"><i class="fas fa-chart-pie"></i> 订单状态分布</span>
          <span class="pie-hint">点击状态查看订单详情</span>
        </div>
        <div class="card-body">
          <!-- 饼图无数据提示 -->
          <div v-if="pieTotal === 0" class="store-manage-state">
            <span>暂无订单数据</span>
          </div>
          <!-- 饼图与图例 -->
          <div v-else class="pie-chart-container">
            <div class="pie-chart-wrapper">
              <svg viewBox="0 0 200 200" class="pie-svg">
                <g>
                  <path
                    v-for="slice in pieSlices"
                    :key="slice.key"
                    :d="slice.d"
                    :fill="slice.color"
                    stroke="#fff"
                    stroke-width="1"
                    class="pie-slice pie-clickable"
                    @click="openOrdersModal(slice.key)"
                  />
                </g>
                <circle cx="100" cy="100" r="35" fill="#fff" />
                <text x="100" y="95" text-anchor="middle" class="pie-center-value">{{ pieTotal }}</text>
                <text x="100" y="115" text-anchor="middle" class="pie-center-label">订单总数</text>
              </svg>
            </div>
            <div class="pie-legend">
              <div
                v-for="entry in pieLegendEntries"
                :key="entry.key"
                class="pie-legend-item pie-clickable"
                :class="{ 'is-zero': entry.value === 0 }"
                @click="openOrdersModal(entry.key)"
              >
                <span class="pie-legend-color" :style="{ backgroundColor: entry.color }"></span>
                <span class="pie-legend-label">{{ entry.label }}</span>
                <span class="pie-legend-value">{{ entry.value }}</span>
                <span class="pie-legend-percent">({{ entry.percent }}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 门店详细信息卡片 -->
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-info-circle"></i> 门店详细信息</span>
        <button class="btn btn-sm btn-primary" @click="openEdit"><i class="fas fa-edit"></i> 编辑信息</button>
      </div>
      <div class="card-body">
        <div class="store-info-grid">
          <div class="store-info-item"><span class="info-label">门店名称</span><span class="info-value">{{ store.name || '-' }}</span></div>
          <div class="store-info-item"><span class="info-label">联系电话</span><span class="info-value">{{ store.phone || '-' }}</span></div>
          <div class="store-info-item"><span class="info-label">门店地址</span><span class="info-value">{{ store.address || '-' }}</span></div>
          <div class="store-info-item"><span class="info-label">营业时间</span><span class="info-value">{{ store.businessHours || '-' }}</span></div>
        </div>
      </div>
    </div>

    <!-- 编辑门店信息弹窗 -->
    <template v-if="editing">
      <div class="modal-overlay" @click="editing = false"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3><i class="fas fa-edit"></i> 编辑门店信息</h3>
          <button class="modal-close" @click="editing = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div class="system-form-grid">
            <label>门店名称<input v-model="form.name" class="system-form-input"></label>
            <label>联系电话<input v-model="form.phone" class="system-form-input"></label>
            <label>门店地址<input v-model="form.address" class="system-form-input"></label>
            <label>营业时间<input v-model="form.businessHours" class="system-form-input" placeholder="09:00-21:00"></label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="editing = false">取消</button>
          <button class="btn btn-primary" :disabled="saving" @click="save"><i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i> 保存</button>
        </div>
      </div>
    </template>

    <!-- 订单详情弹窗 -->
    <template v-if="ordersModal.open">
      <div class="modal-overlay" @click="closeOrdersModal"></div>
      <div class="modal-content modal-content-large">
        <div class="modal-header">
          <h3><i class="fas fa-shopping-bag"></i> {{ statusLabel(ordersModal.statusKey) }}订单详情</h3>
          <button class="modal-close" @click="closeOrdersModal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div v-if="ordersModal.loading" class="store-manage-state">
            <i class="fas fa-spinner fa-spin"></i><span>正在加载订单...</span>
          </div>
          <div v-else-if="ordersModal.error" class="store-manage-state">
            <i class="fas fa-exclamation-circle"></i><span>{{ ordersModal.error }}</span>
          </div>
          <div v-else-if="ordersModal.list.length === 0" class="store-manage-state">
            <i class="fas fa-inbox"></i><span>该状态暂无订单</span>
          </div>
          <div v-else class="orders-table-wrap">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>商品</th>
                  <th>用户</th>
                  <th>金额</th>
                  <th>下单时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ordersModal.list" :key="item.id">
                  <td class="orders-col-no">{{ item.orderNo }}</td>
                  <td class="orders-col-items">{{ item.items }}</td>
                  <td class="orders-col-user">{{ item.userName }}<small>{{ item.phone }}</small></td>
                  <td class="orders-col-amount">{{ money(item.payAmount) }}</td>
                  <td class="orders-col-time">{{ item.createdAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <span v-if="ordersModal.total > 0" class="orders-total-text">共 {{ ordersModal.total }} 笔订单</span>
          <template v-if="ordersTotalPages > 1">
            <button class="icon-btn" :disabled="ordersModal.page === 1 || ordersModal.loading" @click="changeOrdersPage(ordersModal.page - 1)"><i class="fas fa-angle-left"></i></button>
            <span class="orders-page-text">{{ ordersModal.page }} / {{ ordersTotalPages }}</span>
            <button class="icon-btn" :disabled="ordersModal.page === ordersTotalPages || ordersModal.loading" @click="changeOrdersPage(ordersModal.page + 1)"><i class="fas fa-angle-right"></i></button>
          </template>
          <button class="btn btn-outline" @click="closeOrdersModal">关闭</button>
        </div>
      </div>
    </template>
  </template>
</template>

<style scoped>
/* 门店头部区域 */
.store-manage-header{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px;padding:18px 20px;border:1px solid #e2e8f0;border-radius:8px;background:#fff} /* 门店标题（图标+名称+ID） */
.store-manage-title{display:flex;align-items:center;gap:14px;min-width:0} /* 标题图标 */
.store-manage-title>i{font-size:26px;color:#4f6ef7} /* 门店名称 */
.store-manage-title h2{margin:0;font-size:18px;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} /* 门店ID */
.store-manage-title span{font-size:12px;color:#94a3b8} /* 右侧操作区 */
.store-manage-actions{display:flex;align-items:center;gap:10px;flex-shrink:0} /* 状态占位/加载中提示 */
.store-manage-state{display:flex;flex-direction:column;align-items:center;gap:8px;padding:34px;text-align:center;color:#94a3b8} /* 状态图标 */
.store-manage-state i{font-size:28px} /* 文本数值字号 */
.store-manage-text-value{font-size:16px} /* 门店信息网格：2列布局 */
.store-info-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px} /* 信息项 */
.store-info-item{display:flex;flex-direction:column;gap:6px} /* 信息标签 */
.info-label{font-size:12px;color:#94a3b8} /* 信息值 */
.info-value{font-size:15px;color:#0f172a;font-weight:500}

/* 统计卡片渐变主题色 */
.stat-card-primary{border-left:4px solid #4f6ef7;background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)}
.stat-card-success{border-left:4px solid #10b981;background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%)}
.stat-card-warning{border-left:4px solid #f59e0b;background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%)}
.stat-card-info{border-left:4px solid #06b6d4;background:linear-gradient(135deg,#ecfeff 0%,#cffafe 100%)}
.stat-card-danger{border-left:4px solid #ef4444;background:linear-gradient(135deg,#fef2f2 0%,#fee2e2 100%)}

/* 饼图区域 */
.pie-chart-container{display:flex;gap:32px;align-items:center;flex-wrap:wrap} /* 饼图SVG容器 */
.pie-chart-wrapper{flex:0 0 auto;width:200px} /* 饼图SVG */
.pie-svg{width:100%;height:auto} /* 扇区悬停过渡 */
.pie-slice{transition:opacity 0.2s ease}.pie-slice:hover{opacity:0.8} /* 中心数值 */
.pie-center-value{font-size:22px;font-weight:700;fill:#0f172a} /* 中心标签 */
.pie-center-label{font-size:11px;fill:#64748b} /* 图例区 */
.pie-legend{flex:1;min-width:200px;display:flex;flex-direction:column;gap:8px} /* 图例项 */
.pie-legend-item{display:flex;align-items:center;gap:8px;font-size:13px} /* 图例色块 */
.pie-legend-color{width:12px;height:12px;border-radius:3px;flex-shrink:0} /* 图例标签 */
.pie-legend-label{color:#475569;flex:1} /* 图例数值 */
.pie-legend-value{color:#0f172a;font-weight:600} /* 图例百分比 */
.pie-legend-percent{color:#94a3b8;font-size:12px;margin-left:4px} /* 零值图例半透明 */
.pie-legend-item.is-zero{opacity:0.55}.pie-legend-item.is-zero .pie-legend-color{opacity:0.5} /* 提示文字 */
.pie-hint{font-size:12px;color:#94a3b8} /* 可点击样式 */
.pie-clickable{cursor:pointer}.pie-slice.pie-clickable:hover{opacity:0.8}.pie-legend-item.pie-clickable:hover{background:#f8fafc;border-radius:4px}[data-theme="dark"] .pie-legend-item.pie-clickable:hover{background:#1e293b}

/* 订单详情弹窗 */
.modal-content-large{max-width:760px;width:92vw} /* 弹窗表格滚动 */
.orders-table-wrap{overflow:auto;max-height:55vh} /* 订单表格 */
.orders-table{width:100%;border-collapse:collapse;font-size:13px} /* 表头粘性定位 */
.orders-table th{position:sticky;top:0;background:#f1f5f9;color:#475569;font-weight:600;text-align:left;padding:10px 12px;white-space:nowrap} /* 表格单元格 */
.orders-table td{padding:10px 12px;border-bottom:1px solid #f1f5f9;color:#0f172a;vertical-align:top} /* 行悬停高亮 */
.orders-table tbody tr:hover{background:#f8fafc} /* 订单号列 */
.orders-col-no{font-family:monospace;white-space:nowrap} /* 商品列 */
.orders-col-items{max-width:220px;color:#475569} /* 用户列 */
.orders-col-user small{display:block;color:#94a3b8;margin-top:2px} /* 金额列 */
.orders-col-amount{font-weight:700;color:#dc2626;white-space:nowrap} /* 时间列 */
.orders-col-time{white-space:nowrap;color:#64748b} /* 总数文本 */
.orders-total-text{font-size:13px;color:#64748b;margin-right:auto} /* 页码文本 */
.orders-page-text{font-size:13px;color:#64748b} /* 暗色主题：表格表头 */
[data-theme="dark"] .orders-table th{background:#1e293b;color:#cbd5e1} /* 暗色主题：表格单元格 */
[data-theme="dark"] .orders-table td{border-color:#334155;color:#f1f5f9} /* 暗色主题：行悬停 */
[data-theme="dark"] .orders-table tbody tr:hover{background:#1e293b} /* 暗色主题：商品列 */
[data-theme="dark"] .orders-col-items{color:#cbd5e1} /* 暗色主题：时间列 */
[data-theme="dark"] .orders-col-time{color:#94a3b8}

/* 暗色主题适配 */
[data-theme="dark"] .store-manage-header{background:#0f172a;border-color:#334155}[data-theme="dark"] .store-manage-title h2{color:#f8fafc}[data-theme="dark"] .info-value{color:#f8fafc}
[data-theme="dark"] .stat-card-primary{background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%)}
[data-theme="dark"] .stat-card-success{background:linear-gradient(135deg,#065f46 0%,#047857 100%)}
[data-theme="dark"] .stat-card-warning{background:linear-gradient(135deg,#78350f 0%,#92400e 100%)}
[data-theme="dark"] .stat-card-info{background:linear-gradient(135deg,#155e75 0%,#0e7490 100%)}
[data-theme="dark"] .stat-card-danger{background:linear-gradient(135deg,#7f1d1d 0%,#991b1b 100%)}
[data-theme="dark"] .pie-center-value{fill:#f1f5f9}
[data-theme="dark"] .pie-center-label{fill:#94a3b8}
[data-theme="dark"] .pie-legend-label{color:#cbd5e1}
[data-theme="dark"] .pie-legend-value{color:#f1f5f9}
[data-theme="dark"] .pie-slice:hover{opacity:0.9}

/* 响应式：小屏幕布局调整 */
@media(max-width:760px){.store-manage-header{flex-direction:column;align-items:flex-start}.store-info-grid{grid-template-columns:1fr}.pie-chart-container{flex-direction:column;align-items:center}.pie-chart-wrapper{width:180px}}
</style>
