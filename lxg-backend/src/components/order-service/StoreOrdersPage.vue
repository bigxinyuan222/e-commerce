<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Id = number | string
type OrderStatus = 'pending_payment' | 'grouping' | 'pending_ship' | 'pending_pickup' | 'completed' | 'cancelled' | 'unknown'
interface OrderItem { name: string; spec: string; price: number; quantity: number; image: string }
interface Order {
  id: Id; orderNo: string; userName: string; phone: string; storeName: string
  totalAmount: number; discountAmount: number; payAmount: number; status: OrderStatus; orderType: string
  createdAt: string; paidAt: string; shippedAt: string; confirmedAt: string; remark: string; items: OrderItem[]
}

const props = defineProps<{ token?: string }>()

const orders = ref<Order[]>([])
const loading = ref(false)
const error = ref('')
const keyword = ref('')
const status = ref<number | ''>('')
const page = ref(1)
const pageSize = 20
const total = ref(0)
const detail = ref<Order | null>(null)
const detailLoading = ref(false)
const actionLoading = ref<Id | null>(null)
const statusCounts = ref<Record<number, number>>({ 0: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))

const statusOptions = [
  { value: '', label: '全部状态' },
  { value: 0, label: '待支付' },
  { value: 2, label: '待发货' },
  { value: 3, label: '待自提' },
  { value: 4, label: '已完成' },
  { value: 5, label: '已取消' },
]

const statCards = computed(() => [
  { code: 0, label: '待支付', icon: 'fa-clock', color: 'amber', value: statusCounts.value[0] ?? 0 },
  { code: 2, label: '待发货', icon: 'fa-box', color: 'blue', value: statusCounts.value[2] ?? 0 },
  { code: 3, label: '待自提', icon: 'fa-store', color: 'violet', value: statusCounts.value[3] ?? 0 },
  { code: 4, label: '已完成', icon: 'fa-check-circle', color: 'green', value: statusCounts.value[4] ?? 0 },
  { code: 5, label: '已取消', icon: 'fa-ban', color: 'gray', value: statusCounts.value[5] ?? 0 },
])

function authHeaders(json = false) {
  const headers = new Headers()
  if (json) headers.set('Content-Type', 'application/json')
  if (props.token) headers.set('Authorization', `Bearer ${props.token}`)
  return headers
}
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`)
  return payload?.data ?? payload
}
function notify(message: string, type: 'success' | 'error' = 'success') {
  ;(window as unknown as { showToast?: (text: string, kind: string) => void }).showToast?.(message, type)
}
function formatSpec(value: unknown) {
  if (!value) return ''
  if (typeof value === 'object') return Object.entries(value as object).map(([key, val]) => `${key}: ${val}`).join(' / ')
  return String(value)
}
function formatDate(value: unknown) {
  if (!value) return '-'
  const date = new Date(String(value)); return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('zh-CN', { hour12: false })
}
// 数字状态码 → 状态键（门店订单接口：0=待支付 2=待发货 3=待自提 4=已完成 5=已取消）
function normalizeStatus(value: unknown): OrderStatus {
  if (typeof value === 'string' && Number.isNaN(Number(value))) return value as OrderStatus
  return (({ 0: 'pending_payment', 1: 'grouping', 2: 'pending_ship', 3: 'pending_pickup', 4: 'completed', 5: 'cancelled' } as Record<number, OrderStatus>)[Number(value)] || 'unknown') as OrderStatus
}
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
function statusLabel(value: OrderStatus) {
  return ({ pending_payment: '待支付', grouping: '拼团中', pending_ship: '待发货', pending_pickup: '待自提', completed: '已完成', cancelled: '已取消', unknown: '未知状态' } as Record<OrderStatus, string>)[value]
}
function money(value: number) { return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value) }

// 拉取门店订单状态分布，用于统计卡数量
async function loadStatusCounts() {
  try {
    const data = await requestJson('/api/v1/admin/stores/my-store', { headers: authHeaders() })
    const dist = data?.order_status_distribution ?? data?.orderStatusDistribution ?? {}
    const map: Record<string, number> = { pending_payment: 0, pending_ship: 2, pending_pickup: 3, completed: 4, cancelled: 5 }
    const counts: Record<number, number> = { 0: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const [key, code] of Object.entries(map)) {
      counts[code] = Number(dist[key] ?? 0) || 0
    }
    statusCounts.value = counts
  } catch { /* 统计非关键，忽略 */ }
}

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
async function search() { page.value = 1; await loadOrders() }
async function changeFilter() { page.value = 1; await loadOrders() }
async function filterByStatus(code: number) { status.value = code; page.value = 1; await loadOrders() }
async function changePage(next: number) { if (next < 1 || next > totalPages.value || next === page.value) return; page.value = next; await loadOrders() }
async function openDetail(item: Order) {
  detailLoading.value = true
  try { detail.value = normalizeOrder(await requestJson(`/api/v1/admin/orders/${item.id}`, { headers: authHeaders() })) }
  catch (cause) { notify(cause instanceof Error ? cause.message : '订单详情加载失败', 'error') }
  finally { detailLoading.value = false }
}
async function performAction(item: Order, action: 'ship' | 'confirm') {
  const labels = { ship: '发货', confirm: '核销' }
  if (!window.confirm(`确定${labels[action]}订单 ${item.orderNo} 吗？`)) return
  actionLoading.value = item.id
  try { await requestJson(`/api/v1/admin/orders/${item.id}/${action}`, { method: 'PUT', headers: authHeaders(true), body: '{}' }); notify(`${labels[action]}成功`); detail.value = null; await Promise.all([loadOrders(), loadStatusCounts()]) }
  catch (cause) { notify(cause instanceof Error ? cause.message : `${labels[action]}失败`, 'error') }
  finally { actionLoading.value = null }
}

onMounted(() => { void loadStatusCounts(); void loadOrders() })
</script>

<template>
  <div class="store-orders-page">
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

    <section class="order-stats">
      <button v-for="card in statCards" :key="card.code" type="button" class="order-stat" :class="card.color" @click="filterByStatus(card.code)">
        <span><i class="fas" :class="card.icon"></i>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </button>
    </section>

    <div v-if="error" class="order-alert">{{ error }}</div>

    <section class="card">
      <div class="card-header"><span class="card-title"><i class="fas fa-list"></i> 本店订单</span></div>
      <div class="card-body no-pad">
        <div class="table-wrap">
          <table>
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
              <tr v-if="loading">
                <td colspan="7" class="order-state"><i class="fas fa-spinner fa-spin"></i> 正在加载...</td>
              </tr>
              <tr v-else-if="!orders.length">
                <td colspan="7" class="order-state">暂无订单</td>
              </tr>
              <tr v-for="item in orders" v-else :key="item.id">
                <td>{{ item.orderNo }}</td>
                <td>{{ item.userName }}<small>{{ item.phone }}</small></td>
                <td>{{ item.items.map(row => row.name).join('、') || '-' }}</td>
                <td class="amount">{{ money(item.payAmount) }}</td>
                <td><span class="status-pill" :class="item.status">{{ statusLabel(item.status) }}</span></td>
                <td>{{ item.createdAt }}</td>
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
      <div v-if="totalPages > 1" class="card-footer order-pagination">
        <button class="icon-btn" :disabled="page === 1" @click="changePage(page - 1)"><i class="fas fa-angle-left"></i></button>
        <span>{{ page }} / {{ totalPages }}</span>
        <button class="icon-btn" :disabled="page === totalPages" @click="changePage(page + 1)"><i class="fas fa-angle-right"></i></button>
      </div>
    </section>

    <div v-if="detailLoading" class="modal-overlay">
      <div class="modal-content medium order-state"><i class="fas fa-spinner fa-spin"></i> 正在加载详情...</div>
    </div>
    <div v-if="detail" class="modal-overlay" @click.self="detail = null">
      <div class="modal-content large">
        <div class="modal-header">
          <h3><i class="fas fa-shopping-bag"></i> 订单详情</h3>
          <button class="modal-close" @click="detail = null"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body order-detail">
          <div class="detail-grid">
            <div><span>订单号</span><strong>{{ detail.orderNo }}</strong></div>
            <div><span>状态</span><strong>{{ statusLabel(detail.status) }}</strong></div>
            <div><span>用户</span><strong>{{ detail.userName }} · {{ detail.phone }}</strong></div>
            <div><span>门店</span><strong>{{ detail.storeName }}</strong></div>
          </div>
          <section>
            <h4>商品明细</h4>
            <div v-for="row in detail.items" :key="`${row.name}-${row.spec}`" class="detail-item">
              <div><strong>{{ row.name }}</strong><small>{{ row.spec }} × {{ row.quantity }}</small></div>
              <strong>{{ money(row.price * row.quantity) }}</strong>
            </div>
          </section>
          <section class="amount-box">
            <div><span>商品总价</span><span>{{ money(detail.totalAmount) }}</span></div>
            <div><span>优惠</span><span>-{{ money(detail.discountAmount || detail.totalAmount - detail.payAmount) }}</span></div>
            <div class="paid"><span>实付金额</span><strong>{{ money(detail.payAmount) }}</strong></div>
          </section>
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
.store-orders-page{display:flex;flex-direction:column;gap:14px}
.order-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px}
.search-bar{display:flex;gap:8px;flex-wrap:wrap}
.search-bar input{width:240px}
.order-total{font-size:13px;color:#64748b}
.order-stats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.order-stat{min-height:86px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:7px;background:#fff;text-align:left;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer}
.order-stat span{display:flex;align-items:center;gap:7px;color:#64748b;font-size:12px}
.order-stat strong{font-size:21px}
.order-stat.amber strong,.order-stat.amber i{color:#d97706}
.order-stat.blue strong,.order-stat.blue i{color:#2563eb}
.order-stat.violet strong,.order-stat.violet i{color:#7c3aed}
.order-stat.green strong,.order-stat.green i{color:#16a34a}
.order-stat.gray strong,.order-stat.gray i{color:#64748b}
.order-alert{padding:10px 12px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#b91c1c}
.order-state{text-align:center!important;padding:42px 12px!important;color:#64748b}
.amount{font-weight:700;color:#dc2626}
.status-pill{display:inline-block;padding:3px 8px;border-radius:4px;font-size:12px;white-space:nowrap}
.status-pill.pending_payment{background:#fef3c7;color:#92400e}
.status-pill.grouping{background:#ffedd5;color:#c2410c}
.status-pill.pending_ship,.status-pill.pending_pickup{background:#dbeafe;color:#1d4ed8}
.status-pill.completed{background:#dcfce7;color:#15803d}
.status-pill.cancelled,.status-pill.unknown{background:#f1f5f9;color:#64748b}
.actions{display:flex;gap:5px;white-space:nowrap}
td small,.detail-item small{display:block;color:#94a3b8;margin-top:3px}
.order-pagination{display:flex;align-items:center;justify-content:center;gap:10px}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.detail-grid>div{padding:12px;background:#f8fafc;border-radius:6px}
.detail-grid span{display:block;font-size:12px;color:#64748b;margin-bottom:4px}
.order-detail{display:flex;flex-direction:column;gap:18px;max-height:65vh;overflow:auto}
.order-detail h4{font-size:14px;margin:0 0 9px}
.detail-item,.amount-box>div,.timeline>div{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #f1f5f9}
.amount-box{padding:4px 12px;background:#f8fafc;border-radius:6px}
.amount-box .paid{border-bottom:0}
.amount-box .paid strong{color:#4f6ef7}
.timeline strong{font-size:12px;color:#64748b}
@media(max-width:1150px){.order-stats{grid-template-columns:repeat(3,1fr)}}
@media(max-width:720px){.order-toolbar{align-items:stretch;flex-direction:column}.search-bar>*{width:100%!important}.order-stats{grid-template-columns:repeat(2,1fr)}.detail-grid{grid-template-columns:1fr}}
</style>
