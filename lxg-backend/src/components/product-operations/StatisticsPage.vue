<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Id = string | number
interface Props { token?: string; role?: string; storeId?: Id | null; userName?: string }
interface OrderItem { name: string; quantity: number; amount: number }
interface Order { status: string; paid: number; createdAt: string; storeId: Id | ''; storeName: string; items: OrderItem[] }
interface Ranking { name: string; count: number; amount: number }
const props = defineProps<Props>()
const loading = ref(false)
const lastUpdated = ref('')
const range = ref<7 | 30>(7)
const orders = ref<Order[]>([])
const refunds = ref<any[]>([])
const users = ref<any[]>([])
const reviews = ref<any[]>([])
const products = ref<any[]>([])
const warningCount = ref(0)
const sourceErrors = ref<string[]>([])
let timer: number | undefined

function headers() { const h = new Headers(); if (props.token) h.set('Authorization', `Bearer ${props.token}`); return h }
async function requestJson(url: string) {
  const response = await fetch(url, { credentials: 'include', headers: headers() })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`)
  return payload?.data ?? payload
}
function listFrom(data: any, keys: string[] = []) { if (Array.isArray(data)) return data; for (const key of [...keys, 'list', 'items', 'records', 'users', 'products']) if (Array.isArray(data?.[key])) return data[key]; return [] }
async function requestAll(path: string, sizeKey: 'size' | 'pageSize', extra: Record<string, string> = {}) {
  const pageSize = 100
  const result: any[] = []
  for (let page = 1; page <= 1000; page++) {
    const params = new URLSearchParams({ ...extra, page: String(page), [sizeKey]: String(pageSize) })
    const data = await requestJson(`${path}?${params}`)
    const rows = listFrom(data)
    result.push(...rows)
    const total = Number(data?.total ?? data?.total_count ?? data?.count)
    if (!rows.length || rows.length < pageSize || (Number.isFinite(total) && total >= 0 && result.length >= total)) break
  }
  return result
}
function orderStatus(value: unknown) {
  if (typeof value === 'string' && Number.isNaN(Number(value))) return value
  return ({ 0: 'pending_payment', 1: 'grouping', 2: 'pending_delivery', 3: 'pending_pickup', 4: 'completed', 5: 'cancelled' } as Record<number, string>)[Number(value)] || 'unknown'
}
function normalizeOrder(row: any): Order {
  return {
    status: orderStatus(row.status), paid: Number(row.pay_amount ?? row.payAmount ?? 0) || 0,
    createdAt: String(row.created_at ?? row.createdAt ?? row.CreatedAt ?? row.create_time ?? ''),
    storeId: row.store?.id ?? row.store_id ?? row.storeId ?? '', storeName: String(row.store?.name ?? row.store_name ?? row.storeName ?? '未知门店'),
    items: listFrom(row.items ?? row.order_items ?? row.orderItems).map((item: any) => {
      const quantity = Number(item.quantity ?? item.count) || 1
      const unitPrice = Number(item.price ?? item.pay_amount ?? item.payAmount ?? item.product_price) || 0
      return { name: String(item.goodsName ?? item.productName ?? item.product_name ?? item.name ?? '未知商品'), quantity, amount: unitPrice * quantity }
    }),
  }
}
function localKey(value: Date | string) { const date = value instanceof Date ? value : new Date(value); if (Number.isNaN(date.getTime())) return ''; return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` }
const scopedOrders = computed(() => props.storeId ? orders.value.filter(item => String(item.storeId) === String(props.storeId)) : orders.value)
const revenueOrders = computed(() => scopedOrders.value.filter(item => !['pending_payment', 'cancelled', 'unknown'].includes(item.status)))
const todayKey = computed(() => localKey(new Date()))
const todayOrders = computed(() => scopedOrders.value.filter(item => localKey(item.createdAt) === todayKey.value))
const todayRevenue = computed(() => todayOrders.value.filter(item => !['pending_payment', 'cancelled', 'unknown'].includes(item.status)).reduce((sum, item) => sum + item.paid, 0))
const totalRevenue = computed(() => revenueOrders.value.reduce((sum, item) => sum + item.paid, 0))
const newUsers = computed(() => users.value.filter(item => localKey(item.CreatedAt ?? item.createdAt ?? item.created_at ?? item.registerTime) === todayKey.value).length)
const pendingReviews = computed(() => reviews.value.filter(item => Number(item.status) === 0 || ['pending', '待审核'].includes(String(item.status))).length)
const refundCompleted = computed(() => refunds.value.filter(item => Number(item.status) === 3 || ['completed', '已完成'].includes(String(item.status))).length)
const statusRows = computed(() => [
  ['待付款', 'pending_payment', '#f59e0b'], ['拼团中', 'grouping', '#fb923c'], ['待发货', 'pending_delivery', '#4f6ef7'],
  ['待自提', 'pending_pickup', '#22c55e'], ['已完成', 'completed', '#64748b'], ['已取消', 'cancelled', '#cbd5e1'],
].map(([label, status, color]) => { const count = scopedOrders.value.filter(item => item.status === status).length; return { label, status, color, count, percent: scopedOrders.value.length ? count / scopedOrders.value.length * 100 : 0 } }))
const chart = computed(() => {
  const values = Array.from({ length: range.value }, (_, offset) => { const date = new Date(); date.setDate(date.getDate() - (range.value - 1 - offset)); const key = localKey(date); const amount = revenueOrders.value.filter(item => localKey(item.createdAt) === key).reduce((sum, item) => sum + item.paid, 0); return { key, label: range.value === 7 ? ['日', '一', '二', '三', '四', '五', '六'][date.getDay()] : `${date.getMonth() + 1}/${date.getDate()}`, amount } })
  const max = Math.max(...values.map(item => item.amount), 1)
  return values.map(item => ({ ...item, height: item.amount ? Math.max(10, item.amount / max * 160) : 4 }))
})
const goodsRanking = computed<Ranking[]>(() => {
  const map = new Map<string, Ranking>(); revenueOrders.value.forEach(order => order.items.forEach(item => { const current = map.get(item.name) ?? { name: item.name, count: 0, amount: 0 }; current.count += item.quantity; current.amount += item.amount; map.set(item.name, current) }))
  return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 10)
})
const storeRanking = computed<Ranking[]>(() => {
  const map = new Map<string, Ranking>(); revenueOrders.value.forEach(order => { const current = map.get(order.storeName) ?? { name: order.storeName, count: 0, amount: 0 }; current.count++; current.amount += order.paid; map.set(order.storeName, current) })
  return [...map.values()].sort((a, b) => b.amount - a.amount).slice(0, 6)
})
const cards = computed(() => [
  { label: '订单量', value: scopedOrders.value.length.toLocaleString(), sub: `今日 ${todayOrders.value.length}`, icon: 'fa-shopping-cart', color: '#4f6ef7' },
  { label: '销售额', value: `¥${(totalRevenue.value / 10000).toFixed(1)}万`, sub: `今日 ${money(todayRevenue.value)}`, icon: 'fa-yen-sign', color: '#22c55e' },
  { label: '客单价', value: money(revenueOrders.value.length ? totalRevenue.value / revenueOrders.value.length : 0), sub: '已支付订单', icon: 'fa-user-tag', color: '#f59e0b' },
  { label: '商品总数', value: products.value.length.toLocaleString(), sub: '实时商品列表', icon: 'fa-box', color: '#8b5cf6' },
  { label: '新增用户', value: newUsers.value.toLocaleString(), sub: '今日注册', icon: 'fa-user-plus', color: '#ec4899' },
  { label: '库存预警', value: warningCount.value.toLocaleString(), sub: '低于阈值', icon: 'fa-exclamation-triangle', color: '#ef4444' },
  { label: '待审核评价', value: pendingReviews.value.toLocaleString(), sub: '需处理', icon: 'fa-star', color: '#f59e0b' },
  { label: '退款完成', value: refundCompleted.value.toLocaleString(), sub: '退款列表筛选', icon: 'fa-check-circle', color: '#22c55e' },
])
function money(value: number) { return value >= 10000 ? `¥${(value / 10000).toFixed(1)}万` : `¥${Math.round(value).toLocaleString()}` }
async function source(name: string, task: () => Promise<void>) { try { await task() } catch (cause) { sourceErrors.value.push(`${name}：${cause instanceof Error ? cause.message : '加载失败'}`) } }
async function loadData() {
  if (loading.value) return; loading.value = true; sourceErrors.value = []
  await Promise.all([
    source('订单', async () => { orders.value = (await requestAll('/api/v1/admin/orders', 'pageSize')).map(normalizeOrder) }),
    source('退款', async () => { refunds.value = await requestAll('/api/v1/admin/refunds', 'pageSize') }),
    source('用户', async () => { users.value = await requestAll('/api/v1/get/users', 'size') }),
    source('商品', async () => { products.value = await requestAll('/api/v1/admin/product/list', 'size') }),
    source('评价', async () => { reviews.value = await requestAll('/api/v1/admin/review/list', 'size', { keyword: '', review_type: '', status: '', start_date: '', end_date: '' }) }),
    source('库存', async () => { const data = await requestJson('/api/v1/admin/home'); warningCount.value = Number(data?.warning_sku_count) || listFrom(data?.warning_sku_list).length }),
  ])
  lastUpdated.value = new Date().toLocaleTimeString('zh-CN', { hour12: false }); loading.value = false
}
onMounted(() => { void loadData(); timer = window.setInterval(loadData, 60_000) })
onBeforeUnmount(() => { if (timer) window.clearInterval(timer) })
</script>

<template>
  <div class="statistics-page">
    <header class="statistics-heading">
      <div>
        <h1>数据统计</h1>
        <p>{{ new Date().toLocaleDateString('zh-CN', { year:'numeric', month:'long', day:'numeric', weekday:'long' }) }} · 欢迎回来，{{ userName || '管理员' }}</p>
      </div>
      <div class="refresh-box">
        <span v-if="lastUpdated">更新于 {{ lastUpdated }}</span>
        <button class="btn btn-sm btn-outline" :disabled="loading" @click="loadData"><i class="fas" :class="loading ? 'fa-spinner fa-spin' : 'fa-sync-alt'"></i> {{ loading ? '刷新中' : '立即刷新' }}</button>
      </div>
    </header>
    <div v-if="sourceErrors.length" class="source-warning">
      <i class="fas fa-exclamation-circle"></i>
      <span>部分数据源暂不可用：{{ sourceErrors.join('；') }}</span>
    </div>
    <div class="statistics-cards stats-grid">
      <div v-for="card in cards" :key="card.label" class="stat-card">
        <div class="label"><i class="fas" :class="card.icon" :style="{ color: card.color }"></i> {{ card.label }}</div>
        <div class="value">{{ card.value }}</div>
        <div class="sub">{{ card.sub }}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-chart-bar"></i> 交易概览 · 近{{ range }}日趋势</span>
        <div class="range-actions">
          <button class="btn btn-sm" :class="range===7?'btn-primary':'btn-outline'" @click="range=7">近7天</button>
          <button class="btn btn-sm" :class="range===30?'btn-primary':'btn-outline'" @click="range=30">近30天</button>
        </div>
      </div>
      <div class="card-body">
        <div class="sales-chart">
          <div v-for="item in chart" :key="item.key" class="bar-group" :title="`${item.key} ${money(item.amount)}`">
            <div class="bar-value">{{ item.amount ? money(item.amount) : '-' }}</div>
            <div class="bar" :style="{height:`${item.height}px`}"></div>
            <div class="bar-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="statistics-layout">
      <div class="card goods-ranking">
        <div class="card-header"><span class="card-title"><i class="fas fa-crown"></i> 商品排行 · 销量 TOP10</span></div>
        <div class="card-body no-pad">
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>商品</th>
                  <th>销量</th>
                  <th>销售额</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!goodsRanking.length"><td colspan="4" class="empty">暂无商品销售数据</td></tr>
                <tr v-for="(item,index) in goodsRanking" v-else :key="item.name">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.count.toLocaleString() }}</td>
                  <td>{{ money(item.amount) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="statistics-side">
        <div class="card">
          <div class="card-header"><span class="card-title"><i class="fas fa-store"></i> 门店销售排行</span></div>
          <div class="card-body ranking-list">
            <div v-if="!storeRanking.length" class="empty">暂无门店销售数据</div>
            <div v-for="(item,index) in storeRanking" v-else :key="item.name" class="ranking-item">
              <span class="rank-index">{{ index+1 }}</span>
              <div>
                <strong>{{ item.name }}</strong>
                <small>{{ item.count }} 单</small>
              </div>
              <b>{{ money(item.amount) }}</b>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title"><i class="fas fa-chart-pie"></i> 订单状态分布</span></div>
          <div class="card-body status-list">
            <div v-for="item in statusRows" :key="item.status">
              <div>
                <span>{{ item.label }}</span>
                <b>{{ item.count }}</b>
              </div>
              <div class="status-track"><span :style="{width:`${item.percent}%`,background:item.color}"></span></div>
            </div>
            <footer>
              <span>总订单量</span>
              <b>{{ scopedOrders.length }}</b>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics-page{display:flex;flex-direction:column;gap:16px;min-width:0}.statistics-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}.statistics-heading h1{margin:0 0 4px;font-size:24px;color:#1e293b}.statistics-heading p{margin:0;color:#64748b;font-size:14px}.refresh-box{display:flex;align-items:center;gap:10px;color:#94a3b8;font-size:12px}.source-warning{display:flex;gap:8px;padding:10px 12px;border:1px solid #fde68a;border-radius:8px;background:#fffbeb;color:#92400e;font-size:13px}.statistics-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.range-actions{display:flex;gap:8px}.sales-chart{height:220px;display:flex;align-items:flex-end;gap:8px;overflow-x:auto;padding:20px 4px 0}.bar-group{height:190px;min-width:24px;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end}.bar{width:min(30px,75%);min-height:4px;border-radius:5px 5px 0 0;background:linear-gradient(180deg,#667eea,#4f6ef7)}.bar-value{font-size:10px;color:#64748b;white-space:nowrap;margin-bottom:4px}.bar-label{font-size:11px;color:#94a3b8;margin-top:6px}.statistics-layout{display:grid;grid-template-columns:minmax(0,2fr) minmax(280px,1fr);gap:16px;align-items:start}.statistics-side{display:flex;flex-direction:column;gap:16px}.ranking-list,.status-list{display:flex;flex-direction:column;gap:10px}.ranking-item{display:grid;grid-template-columns:28px 1fr auto;align-items:center;gap:9px}.rank-index{display:grid;place-items:center;width:26px;height:26px;border-radius:6px;background:#4f6ef7;color:#fff;font-size:12px;font-weight:700}.ranking-item div{display:flex;flex-direction:column;min-width:0}.ranking-item strong{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ranking-item small{color:#94a3b8}.ranking-item b{font-size:13px;color:#4f6ef7}.status-list>div>div:first-child,.status-list footer{display:flex;justify-content:space-between;font-size:13px}.status-track{height:10px;margin-top:4px;background:#e2e8f0;border-radius:6px;overflow:hidden}.status-track span{display:block;height:100%;border-radius:6px}.status-list footer{padding-top:12px;border-top:1px solid #e2e8f0}.status-list footer b{font-size:18px}.empty{text-align:center;padding:24px;color:#94a3b8}[data-theme='dark'] .statistics-heading h1{color:#e5e7eb}[data-theme='dark'] .statistics-heading p{color:#94a3b8}[data-theme='dark'] .source-warning{background:#422006;border-color:#854d0e;color:#fde68a}[data-theme='dark'] .status-track{background:#334155}@media(max-width:1200px){.statistics-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:900px){.statistics-layout{grid-template-columns:1fr}}@media(max-width:600px){.statistics-heading{align-items:flex-start;flex-direction:column}.statistics-cards{grid-template-columns:1fr}.refresh-box{width:100%;justify-content:space-between}}
</style>
