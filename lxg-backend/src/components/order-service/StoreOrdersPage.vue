<!--
  文件名称：StoreOrdersPage.vue
  所属模块：订单服务模块（order-service）
  功能说明：门店订单页面，展示当前登录账号绑定门店的订单列表，支持关键词搜索、状态筛选、
           状态统计卡片、查看订单详情、以及发货/核销（确认自提）操作。
  接口说明：API 基础路径 /api/v1/admin/stores/my-store（含 orders 子路径和订单详情接口）
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Id = number | string
// 订单状态联合类型：待支付/拼团中/待发货/待自提/已完成/已取消/未知
type OrderStatus = 'pending_payment' | 'grouping' | 'pending_ship' | 'pending_pickup' | 'completed' | 'cancelled' | 'unknown'
// 订单商品项结构
interface OrderItem { name: string; spec: string; price: number; quantity: number; image: string }
// 订单数据结构
interface Order {
  id: Id; orderNo: string; userName: string; phone: string; storeName: string
  totalAmount: number; discountAmount: number; payAmount: number; status: OrderStatus; orderType: string
  createdAt: string; paidAt: string; shippedAt: string; confirmedAt: string; remark: string; items: OrderItem[]
}

const props = defineProps<{ token?: string }>()

const orders = ref<Order[]>([])            // 当前页订单列表
const loading = ref(false)                // 列表加载状态
const error = ref('')                     // 列表加载错误信息
const keyword = ref('')                   // 搜索关键词（订单号/手机号）
const status = ref<number | ''>('')       // 选中的状态筛选值
const page = ref(1)                       // 当前页码
const pageSize = 20                       // 每页条数
const total = ref(0)                      // 订单总条数
const detail = ref<Order | null>(null)    // 详情弹窗中的订单数据
const detailLoading = ref(false)          // 详情加载状态
const actionLoading = ref<Id | null>(null) // 当前操作中的订单ID（防重复点击）
// 各状态订单数量统计（key为接口数字状态码）
const statusCounts = ref<Record<number, number>>({ 0: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

// 计算总页数
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

// 状态筛选下拉选项
const statusOptions = [
  { value: '', label: '全部状态' },
  { value: 0, label: '待支付' },
  { value: 2, label: '待发货' },
  { value: 3, label: '待自提' },
  { value: 4, label: '已完成' },
  { value: 5, label: '已取消' },
]

// 统计卡片配置（code对应接口数字状态码，点击可快速筛选）
const statCards = computed(() => [
  { code: 0, label: '待支付', icon: 'fa-clock', color: 'amber', value: statusCounts.value[0] ?? 0 },
  { code: 2, label: '待发货', icon: 'fa-box', color: 'blue', value: statusCounts.value[2] ?? 0 },
  { code: 3, label: '待自提', icon: 'fa-store', color: 'violet', value: statusCounts.value[3] ?? 0 },
  { code: 4, label: '已完成', icon: 'fa-check-circle', color: 'green', value: statusCounts.value[4] ?? 0 },
  { code: 5, label: '已取消', icon: 'fa-ban', color: 'gray', value: statusCounts.value[5] ?? 0 },
])

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
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`)
  return payload?.data ?? payload
}
/** 轻量级提示（通过全局 showToast 方法） */
function notify(message: string, type: 'success' | 'error' = 'success') {
  ;(window as unknown as { showToast?: (text: string, kind: string) => void }).showToast?.(message, type)
}
/** 格式化商品规格：对象拆解为 "key: value / ..." 字符串 */
function formatSpec(value: unknown) {
  if (!value) return ''
  if (typeof value === 'object') return Object.entries(value as object).map(([key, val]) => `${key}: ${val}`).join(' / ')
  return String(value)
}
/** 格式化日期时间，非法值返回 "-" */
function formatDate(value: unknown) {
  if (!value) return '-'
  const date = new Date(String(value)); return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('zh-CN', { hour12: false })
}
// 数字状态码 → 状态键（门店订单接口：0=待支付 2=待发货 3=待自提 4=已完成 5=已取消）
function normalizeStatus(value: unknown): OrderStatus {
  if (typeof value === 'string' && Number.isNaN(Number(value))) return value as OrderStatus
  return (({ 0: 'pending_payment', 1: 'grouping', 2: 'pending_ship', 3: 'pending_pickup', 4: 'completed', 5: 'cancelled' } as Record<number, OrderStatus>)[Number(value)] || 'unknown') as OrderStatus
}
/** 将后端订单行数据归一化为前端 Order 结构（兼容蛇形/驼峰命名） */
function normalizeOrder(row: any): Order {
  return {
    id: row.ID ?? row.id, orderNo: String(row.order_no ?? row.orderNo ?? row.ID ?? row.id ?? '-'),
    userName: String(row.user?.nickname ?? row.user_name ?? row.userName ?? '-'), phone: String(row.user?.phone ?? row.phone ?? '-'),
    storeName: String(row.store?.name ?? row.store_name ?? row.storeName ?? '-'),
    totalAmount: Number(row.total_amount ?? row.totalAmount ?? row.amount) || 0, discountAmount: Number(row.discount_amount ?? row.discountAmount) || 0,
    payAmount: Number(row.pay_amount ?? row.payAmount ?? 0) || 0, status: normalizeStatus(row.status),
    orderType: String(row.order_type ?? row.orderType ?? row.type ?? 'normal'), createdAt: formatDate(row.created_at ?? row.createdAt ?? row.CreatedAt),
    paidAt: formatDate(row.paid_at ?? row.paidAt ?? row.payTime), shippedAt: formatDate(row.shipped_at ?? row.shippedAt ?? row.deliveryTime),
    confirmedAt: formatDate(row.confirmed_at ?? row.confirmedAt ?? row.pickupTime), remark: String(row.remark ?? ''),
    items: (row.items ?? row.order_items ?? row.orderItems ?? []).map((item: any) => ({ name: String(item.product_name ?? item.productName ?? item.name ?? '-'), spec: formatSpec(item.spec_values ?? item.specValues ?? item.spec), price: Number(item.price) || 0, quantity: Number(item.quantity) || 1, image: String(item.image ?? '') })),
  }
}
/** 订单状态码 → 中文标签映射 */
function statusLabel(value: OrderStatus) {
  return ({ pending_payment: '待支付', grouping: '拼团中', pending_ship: '待发货', pending_pickup: '待自提', completed: '已完成', cancelled: '已取消', unknown: '未知状态' } as Record<OrderStatus, string>)[value]
}
/** 金额格式化为人民币 */
function money(value: number) { return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value) }

// 拉取门店订单状态分布，用于统计卡数量
/** 加载门店订单状态分布（API: GET /api/v1/admin/stores/my-store），用于统计卡数量 */
async function loadStatusCounts() {
  try {
    const data = await requestJson('/api/v1/admin/stores/my-store', { headers: authHeaders() })
    const dist = data?.order_status_distribution ?? data?.orderStatusDistribution ?? {}
    // 状态键名到数字码的映射
    const map: Record<string, number> = { pending_payment: 0, pending_ship: 2, pending_pickup: 3, completed: 4, cancelled: 5 }
    const counts: Record<number, number> = { 0: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const [key, code] of Object.entries(map)) {
      counts[code] = Number(dist[key] ?? 0) || 0
    }
    statusCounts.value = counts
  } catch { /* 统计非关键，忽略 */ }
}

/** 加载门店订单列表（API: GET /api/v1/admin/stores/my-store/orders） */
async function loadOrders() {
  loading.value = true; error.value = ''
  const params = new URLSearchParams({ page: String(page.value), pageSize: String(pageSize), keyword: keyword.value.trim(), status: status.value === '' ? '' : String(status.value) })
  try {
    const data = await requestJson(`/api/v1/admin/stores/my-store/orders?${params}`, { headers: authHeaders() })
    const list = Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? []
    orders.value = list.map(normalizeOrder); total.value = Number(data?.total ?? data?.total_count ?? list.length)
  } catch (cause) { orders.value = []; total.value = 0; error.value = cause instanceof Error ? cause.message : '订单列表加载失败' }
  finally { loading.value = false }
}
/** 点击搜索按钮：重置页码后加载列表 */
async function search() { page.value = 1; await loadOrders() }
/** 筛选条件变更：重置页码后加载列表 */
async function changeFilter() { page.value = 1; await loadOrders() }
/** 点击统计卡片按状态筛选：设置状态码后重置页码加载列表 */
async function filterByStatus(code: number) { status.value = code; page.value = 1; await loadOrders() }
/** 翻页：校验边界后加载列表 */
async function changePage(next: number) { if (next < 1 || next > totalPages.value || next === page.value) return; page.value = next; await loadOrders() }
/** 打开订单详情弹窗（API: GET /api/v1/admin/orders/:id） */
async function openDetail(item: Order) {
  detailLoading.value = true
  try { detail.value = normalizeOrder(await requestJson(`/api/v1/admin/orders/${item.id}`, { headers: authHeaders() })) }
  catch (cause) { notify(cause instanceof Error ? cause.message : '订单详情加载失败', 'error') }
  finally { detailLoading.value = false }
}
/** 执行订单操作：发货/核销（API: PUT /api/v1/admin/orders/:id/:action），操作后刷新列表和统计 */
async function performAction(item: Order, action: 'ship' | 'confirm') {
  const labels = { ship: '发货', confirm: '核销' }
  if (!window.confirm(`确定${labels[action]}订单 ${item.orderNo} 吗？`)) return
  actionLoading.value = item.id
  try { await requestJson(`/api/v1/admin/orders/${item.id}/${action}`, { method: 'PUT', headers: authHeaders(true), body: '{}' }); notify(`${labels[action]}成功`); detail.value = null; await Promise.all([loadOrders(), loadStatusCounts()]) }
  catch (cause) { notify(cause instanceof Error ? cause.message : `${labels[action]}失败`, 'error') }
  finally { actionLoading.value = null }
}

// 组件挂载时加载状态统计和订单列表
onMounted(() => { void loadStatusCounts(); void loadOrders() })
</script>

<template>
  <div class="store-orders-page">
    <!-- 搜索工具栏：关键词搜索 + 状态筛选 -->
    <div class="order-toolbar">
      <div class="search-bar">
        <input v-model="keyword" placeholder="订单号 / 用户手机号" @keyup.enter="search" />
        <select v-model="status" @change="changeFilter">
          <option v-for="option in statusOptions" :key="String(option.value)" :value="option.value">{{ option.label }}</option>
        </select>
        <button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 搜索</button>
      </div>
      <span class="order-total">共 {{ total }} 笔订单</span>
    </div>

    <!-- 订单状态统计卡片区：点击卡片可快速按状态筛选 -->
    <section class="order-stats">
      <button v-for="card in statCards" :key="card.code" type="button" class="order-stat" :class="card.color" @click="filterByStatus(card.code)">
        <span><i class="fas" :class="card.icon"></i>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </button>
    </section>

    <!-- 错误提示 -->
    <div v-if="error" class="order-alert">{{ error }}</div>

    <!-- 本店订单列表卡片 -->
    <section class="card">
      <div class="card-header"><span class="card-title"><i class="fas fa-list"></i> 本店订单</span></div>
      <div class="card-body no-pad">
        <div class="table-wrap">
          <table>
            <!-- 表头 -->
            <thead>
              <tr>
                <th>订单号</th>
                <th>用户</th>
                <th>商品</th>
                <th>金额</th>
                <th>状态</th>
                <th>下单时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <!-- 加载中状态 -->
              <tr v-if="loading">
                <td colspan="7" class="order-state"><i class="fas fa-spinner fa-spin"></i> 正在加载...</td>
              </tr>
              <!-- 空数据状态 -->
              <tr v-else-if="!orders.length">
                <td colspan="7" class="order-state">暂无订单</td>
              </tr>
              <!-- 订单数据行 -->
              <tr v-for="item in orders" v-else :key="item.id">
                <td>{{ item.orderNo }}</td>
                <td>{{ item.userName }}<small>{{ item.phone }}</small></td>
                <td>{{ item.items.map(row => row.name).join('、') || '-' }}</td>
                <td class="amount">{{ money(item.payAmount) }}</td>
                <td><span class="status-pill" :class="item.status">{{ statusLabel(item.status) }}</span></td>
                <td>{{ item.createdAt }}</td>
                <!-- 操作按钮区：根据状态条件性显示 -->
                <td class="actions">
                  <button class="btn btn-sm btn-outline" @click="openDetail(item)"><i class="fas fa-eye"></i> 详情</button>
                  <button v-if="item.status === 'pending_ship'" class="btn btn-sm btn-success" :disabled="actionLoading === item.id" @click="performAction(item, 'ship')">发货</button>
                  <button v-if="item.status === 'pending_pickup'" class="btn btn-sm btn-success" :disabled="actionLoading === item.id" @click="performAction(item, 'confirm')">核销</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 分页 -->
      <div v-if="totalPages > 1" class="card-footer order-pagination">
        <button class="icon-btn" :disabled="page === 1" @click="changePage(page - 1)"><i class="fas fa-angle-left"></i></button>
        <span>{{ page }} / {{ totalPages }}</span>
        <button class="icon-btn" :disabled="page === totalPages" @click="changePage(page + 1)"><i class="fas fa-angle-right"></i></button>
      </div>
    </section>

    <!-- 订单详情加载中遮罩 -->
    <div v-if="detailLoading" class="modal-overlay">
      <div class="modal-content medium order-state"><i class="fas fa-spinner fa-spin"></i> 正在加载详情...</div>
    </div>
    <!-- 订单详情弹窗 -->
    <div v-if="detail" class="modal-overlay" @click.self="detail = null">
      <div class="modal-content large">
        <div class="modal-header">
          <h3><i class="fas fa-shopping-bag"></i> 订单详情</h3>
          <button class="modal-close" @click="detail = null"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body order-detail">
          <!-- 基本信息 -->
          <div class="detail-grid">
            <div><span>订单号</span><strong>{{ detail.orderNo }}</strong></div>
            <div><span>状态</span><strong>{{ statusLabel(detail.status) }}</strong></div>
            <div><span>用户</span><strong>{{ detail.userName }} · {{ detail.phone }}</strong></div>
            <div><span>门店</span><strong>{{ detail.storeName }}</strong></div>
          </div>
          <!-- 商品明细 -->
          <section>
            <h4>商品明细</h4>
            <div v-for="row in detail.items" :key="`${row.name}-${row.spec}`" class="detail-item">
              <div><strong>{{ row.name }}</strong><small>{{ row.spec }} × {{ row.quantity }}</small></div>
              <strong>{{ money(row.price * row.quantity) }}</strong>
            </div>
          </section>
          <!-- 金额汇总 -->
          <section class="amount-box">
            <div><span>商品总价</span><span>{{ money(detail.totalAmount) }}</span></div>
            <div><span>优惠</span><span>-{{ money(detail.discountAmount || detail.totalAmount - detail.payAmount) }}</span></div>
            <div class="paid"><span>实付金额</span><strong>{{ money(detail.payAmount) }}</strong></div>
          </section>
          <!-- 时间节点 -->
          <section>
            <h4>时间节点</h4>
            <div class="timeline">
              <div><span>下单时间</span><strong>{{ detail.createdAt }}</strong></div>
              <div v-if="detail.paidAt !== '-'"><span>支付时间</span><strong>{{ detail.paidAt }}</strong></div>
              <div v-if="detail.shippedAt !== '-'"><span>发货时间</span><strong>{{ detail.shippedAt }}</strong></div>
              <div v-if="detail.confirmedAt !== '-'"><span>自提时间</span><strong>{{ detail.confirmedAt }}</strong></div>
            </div>
          </section>
        </div>
        <!-- 弹窗底部操作按钮 -->
        <div class="modal-footer">
          <button v-if="detail.status === 'pending_ship'" class="btn btn-success" @click="performAction(detail, 'ship')">确认发货</button>
          <button v-if="detail.status === 'pending_pickup'" class="btn btn-success" @click="performAction(detail, 'confirm')">核销自提</button>
          <button class="btn btn-outline" @click="detail = null">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 门店订单页面整体布局：纵向排列各区块 */
.store-orders-page{display:flex;flex-direction:column;gap:14px}
/* 工具栏：搜索与统计信息左右分布 */
.order-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px}
/* 搜索栏：弹性换行 */
.search-bar{display:flex;gap:8px;flex-wrap:wrap}
/* 搜索输入框宽度 */
.search-bar input{width:240px}
/* 订单总数文本 */
.order-total{font-size:13px;color:#64748b}
/* 统计卡片区：5列网格布局 */
.order-stats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
/* 单个统计卡片样式 */
.order-stat{min-height:86px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:7px;background:#fff;text-align:left;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer}
/* 卡片标签样式 */
.order-stat span{display:flex;align-items:center;gap:7px;color:#64748b;font-size:12px}
/* 卡片数值字号 */
.order-stat strong{font-size:21px}
/* 各主题色：amber蓝紫绿灰 */
.order-stat.amber strong,.order-stat.amber i{color:#d97706}
.order-stat.blue strong,.order-stat.blue i{color:#2563eb}
.order-stat.violet strong,.order-stat.violet i{color:#7c3aed}
.order-stat.green strong,.order-stat.green i{color:#16a34a}
.order-stat.gray strong,.order-stat.gray i{color:#64748b}
/* 错误提示框 */
.order-alert{padding:10px 12px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#b91c1c}
/* 表格空状态/加载态居中 */
.order-state{text-align:center!important;padding:42px 12px!important;color:#64748b}
/* 金额列样式 */
.amount{font-weight:700;color:#dc2626}
/* 状态标签胶囊 */
.status-pill{display:inline-block;padding:3px 8px;border-radius:4px;font-size:12px;white-space:nowrap}
/* 各状态标签配色 */
.status-pill.pending_payment{background:#fef3c7;color:#92400e}
.status-pill.grouping{background:#ffedd5;color:#c2410c}
.status-pill.pending_ship,.status-pill.pending_pickup{background:#dbeafe;color:#1d4ed8}
.status-pill.completed{background:#dcfce7;color:#15803d}
.status-pill.cancelled,.status-pill.unknown{background:#f1f5f9;color:#64748b}
/* 操作列按钮排列 */
.actions{display:flex;gap:5px;white-space:nowrap}
/* 表格次要文字（手机号等） */
td small,.detail-item small{display:block;color:#94a3b8;margin-top:3px}
/* 分页栏 */
.order-pagination{display:flex;align-items:center;justify-content:center;gap:10px}
/* 详情弹窗：基本信息网格 */
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
/* 信息项背景 */
.detail-grid>div{padding:12px;background:#f8fafc;border-radius:6px}
/* 信息项标签 */
.detail-grid span{display:block;font-size:12px;color:#64748b;margin-bottom:4px}
/* 详情弹窗内容区 */
.order-detail{display:flex;flex-direction:column;gap:18px;max-height:65vh;overflow:auto}
/* 详情小标题 */
.order-detail h4{font-size:14px;margin:0 0 9px}
/* 详情商品项、金额行、时间行 */
.detail-item,.amount-box>div,.timeline>div{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #f1f5f9}
/* 金额汇总区背景 */
.amount-box{padding:4px 12px;background:#f8fafc;border-radius:6px}
/* 实付金额行 */
.amount-box .paid{border-bottom:0}
/* 实付金额强调色 */
.amount-box .paid strong{color:#4f6ef7}
/* 时间节点数值样式 */
.timeline strong{font-size:12px;color:#64748b}
/* 响应式：中等屏幕统计卡片3列 */
@media(max-width:1150px){.order-stats{grid-template-columns:repeat(3,1fr)}}
/* 响应式：小屏幕工具栏纵向排列 */
@media(max-width:720px){.order-toolbar{align-items:stretch;flex-direction:column}.search-bar>*{width:100%!important}.order-stats{grid-template-columns:repeat(2,1fr)}.detail-grid{grid-template-columns:1fr}}
</style>
