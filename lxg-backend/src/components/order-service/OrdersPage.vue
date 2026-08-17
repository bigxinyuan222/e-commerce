<!--
  文件名称：OrdersPage.vue
  所属模块：订单服务模块（order-service）
  功能说明：订单管理页面，展示全平台订单列表，支持按关键词/状态/门店筛选、
           分页浏览、订单统计卡片、查看订单详情、以及取消/发货/确认收货等操作。
  接口说明：API 基础路径 /api/v1/admin/orders（含 stats 统计接口）
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

type Id = number | string
// 订单状态联合类型：待支付/拼团中/待发货/待自提/已完成/待评价/已评价/已取消/未知
type OrderStatus = 'pending_payment' | 'grouping' | 'pending_delivery' | 'pending_pickup' | 'completed' | 'pending_review' | 'reviewed' | 'cancelled' | 'unknown'
// 订单商品项结构
interface OrderItem { name: string; spec: string; price: number; quantity: number; image: string }
// 订单数据结构
interface Order {
  id: Id; orderNo: string; userName: string; phone: string; storeId: Id | ''; storeName: string
  totalAmount: number; discountAmount: number; payAmount: number; status: OrderStatus; orderType: string
  createdAt: string; paidAt: string; shippedAt: string; confirmedAt: string; remark: string; items: OrderItem[]
}

const props = defineProps<{ token?: string; storeId?: Id | null; role?: string }>()
// 订单客服（order_cs）不能发货
const canShip = computed(() => props.role !== 'order_cs')
const orders = ref<Order[]>([])           // 当前页订单列表
const loading = ref(false)                // 列表加载状态
const error = ref('')                     // 列表加载错误信息
const keyword = ref('')                   // 搜索关键词（订单号/手机号）
const status = ref<number | ''>('')       // 选中的状态筛选值
const storeId = ref<Id | ''>(props.storeId ?? '') // 选中的门店筛选值
const page = ref(1)                       // 当前页码
const pageSize = 20                       // 每页条数
const total = ref(0)                      // 订单总条数
const detail = ref<Order | null>(null)    // 详情弹窗中的订单数据
const detailLoading = ref(false)          // 详情加载状态
const actionLoading = ref<Id | null>(null) // 当前操作中的订单ID（防重复点击）
// 各状态订单数量统计
const stats = reactive({ pending_payment: 0, grouping: 0, pending_delivery: 0, pending_pickup: 0, completed: 0, pending_review: 0, cancelled: 0, total: 0 })

// 计算总页数
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
// 从已加载订单中提取门店选项（去重）
const storeOptions = computed(() => {
  const values = new Map<string, string>()
  orders.value.forEach(item => { if (item.storeId !== '') values.set(String(item.storeId), item.storeName) })
  return [...values.entries()].map(([id, name]) => ({ id, name }))
})
// 状态筛选下拉选项（value 对应接口数字状态码）
const statusOptions = [
  { value: '', label: '全部状态' }, { value: 0, label: '待支付' }, { value: 1, label: '拼团中' }, { value: 2, label: '待发货' },
  { value: 3, label: '待自提' }, { value: 4, label: '已完成' }, { value: 5, label: '已取消' },
]
// 统计卡片配置（用于顶部统计区域渲染）
const statCards = computed(() => [
  { key: 'pending_payment', label: '待支付', icon: 'fa-clock', color: 'amber', value: stats.pending_payment },
  { key: 'grouping', label: '拼团中', icon: 'fa-users', color: 'orange', value: stats.grouping },
  { key: 'pending_delivery', label: '待发货', icon: 'fa-box', color: 'blue', value: stats.pending_delivery },
  { key: 'pending_pickup', label: '待自提', icon: 'fa-store', color: 'violet', value: stats.pending_pickup },
  { key: 'completed', label: '已完成', icon: 'fa-check-circle', color: 'green', value: stats.completed },
  { key: 'pending_review', label: '待评价', icon: 'fa-star', color: 'orange', value: stats.pending_review },
  { key: 'cancelled', label: '已取消', icon: 'fa-ban', color: 'gray', value: stats.cancelled },
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
/** 将接口返回的状态值（数字或字符串）统一归一化为 OrderStatus 枚举 */
function normalizeStatus(value: unknown): OrderStatus {
  if (typeof value === 'string' && Number.isNaN(Number(value))) return value as OrderStatus
  return (({ 0: 'pending_payment', 1: 'grouping', 2: 'pending_delivery', 3: 'pending_pickup', 4: 'completed', 5: 'cancelled' } as Record<number, OrderStatus>)[Number(value)] || 'unknown') as OrderStatus
}
/** 将后端订单行数据归一化为前端 Order 结构（兼容蛇形/驼峰命名） */
function normalizeOrder(row: any): Order {
  return {
    id: row.ID ?? row.id, orderNo: String(row.order_no ?? row.orderNo ?? row.ID ?? row.id ?? '-'),
    userName: String(row.user?.nickname ?? row.user_name ?? row.userName ?? '-'), phone: String(row.user?.phone ?? row.phone ?? '-'),
    storeId: row.store?.id ?? row.store_id ?? row.storeId ?? '', storeName: String(row.store?.name ?? row.store_name ?? row.storeName ?? '-'),
    totalAmount: Number(row.total_amount ?? row.totalAmount ?? row.amount) || 0, discountAmount: Number(row.discount_amount ?? row.discountAmount) || 0,
    payAmount: Number(row.pay_amount ?? row.payAmount ?? 0) || 0, status: normalizeStatus(row.status),
    orderType: String(row.order_type ?? row.orderType ?? row.type ?? 'normal'), createdAt: formatDate(row.created_at ?? row.createdAt ?? row.CreatedAt),
    paidAt: formatDate(row.paid_at ?? row.paidAt ?? row.payTime), shippedAt: formatDate(row.shipped_at ?? row.shippedAt ?? row.deliveryTime),
    confirmedAt: formatDate(row.confirmed_at ?? row.confirmedAt ?? row.pickupTime), remark: String(row.remark ?? ''),
    items: (row.items ?? row.order_items ?? row.orderItems ?? []).map((item: any) => ({ name: String(item.product_name ?? item.productName ?? item.name ?? '-'), spec: formatSpec(item.spec_values ?? item.specValues ?? item.spec), price: Number(item.price) || 0, quantity: Number(item.quantity) || 1, image: String(item.image ?? '') })),
  }
}

/** 加载订单状态统计（API: GET /api/v1/admin/orders/stats） */
async function loadStats() {
  const params = new URLSearchParams()
  if (props.storeId) params.set('store_id', String(props.storeId))
  try {
    const data = await requestJson(`/api/v1/admin/orders/stats${params.size ? `?${params}` : ''}`, { headers: authHeaders() })
    Object.keys(stats).forEach(key => { stats[key as keyof typeof stats] = Number(data?.[key] ?? 0) })
  } catch { /* 统计接口失败时使用下方列表兜底 */ }
}
/** 当统计接口未返回数据时，从当前列表本地计算各状态数量作为兜底 */
function applyStatsFallback() {
  if (Object.values(stats).some(Boolean)) return
  stats.pending_payment = orders.value.filter(item => item.status === 'pending_payment').length
  stats.grouping = orders.value.filter(item => item.status === 'grouping').length
  stats.pending_delivery = orders.value.filter(item => item.status === 'pending_delivery').length
  stats.pending_pickup = orders.value.filter(item => item.status === 'pending_pickup').length
  stats.completed = orders.value.filter(item => item.status === 'completed').length
  stats.pending_review = orders.value.filter(item => item.status === 'pending_review').length
  stats.cancelled = orders.value.filter(item => item.status === 'cancelled').length
  stats.total = total.value
}
/** 加载订单列表（API: GET /api/v1/admin/orders） */
async function loadOrders() {
  loading.value = true; error.value = ''
  const params = new URLSearchParams({ page: String(page.value), pageSize: String(pageSize), keyword: keyword.value.trim(), status: status.value === '' ? '' : String(status.value), store_id: props.storeId ? String(props.storeId) : String(storeId.value) })
  try {
    const data = await requestJson(`/api/v1/admin/orders?${params}`, { headers: authHeaders() })
    const list = Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? []
    orders.value = list.map(normalizeOrder); total.value = Number(data?.total ?? data?.total_count ?? list.length)
    // 将快照存入 window，供旧版兼容逻辑使用
    ;(window as unknown as { legacyOrderSnapshot: Order[] }).legacyOrderSnapshot = orders.value
    await loadStats(); applyStatsFallback()
  } catch (cause) { orders.value = []; total.value = 0; error.value = cause instanceof Error ? cause.message : '订单列表加载失败' }
  finally { loading.value = false }
}
/** 点击搜索按钮：重置页码后加载列表 */
async function search() { page.value = 1; await loadOrders() }
/** 筛选条件变更：重置页码后加载列表 */
async function changeFilter() { page.value = 1; await loadOrders() }
/** 翻页：校验边界后加载列表 */
async function changePage(next: number) { if (next < 1 || next > totalPages.value || next === page.value) return; page.value = next; await loadOrders() }
/** 打开订单详情弹窗（API: GET /api/v1/admin/orders/:id） */
async function openDetail(item: Order) {
  detailLoading.value = true
  try { detail.value = normalizeOrder(await requestJson(`/api/v1/admin/orders/${item.id}`, { headers: authHeaders() })) }
  catch (cause) { notify(cause instanceof Error ? cause.message : '订单详情加载失败', 'error') }
  finally { detailLoading.value = false }
}
/** 执行订单操作：取消/发货/确认收货（API: PUT /api/v1/admin/orders/:id/:action） */
async function performAction(item: Order, action: 'cancel' | 'ship' | 'confirm') {
  const labels = { cancel: '取消', ship: '发货', confirm: '确认收货' }
  if (!window.confirm(`确定${labels[action]}订单 ${item.orderNo} 吗？`)) return
  actionLoading.value = item.id
  try { await requestJson(`/api/v1/admin/orders/${item.id}/${action}`, { method: 'PUT', headers: authHeaders(true), body: '{}' }); notify(`${labels[action]}成功`); detail.value = null; await loadOrders() }
  catch (cause) { notify(cause instanceof Error ? cause.message : `${labels[action]}失败`, 'error') }
  finally { actionLoading.value = null }
}
/** 订单状态码 → 中文标签映射 */
function statusLabel(value: OrderStatus) { return ({ pending_payment: '待支付', grouping: '拼团中', pending_delivery: '待发货', pending_pickup: '待自提', completed: '已完成', pending_review: '待评价', reviewed: '已评价', cancelled: '已取消', unknown: '未知状态' } as Record<OrderStatus, string>)[value] }
/** 金额格式化为人民币 */
function money(value: number) { return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value) }

// 组件挂载时加载订单列表
onMounted(() => void loadOrders())
</script>

<template>
  <div class="orders-page">
    <!-- 搜索工具栏：关键词搜索 + 状态/门店筛选 -->
    <div class="order-toolbar">
      <div class="search-bar">
        <input id="orderSearchInput" v-model="keyword" placeholder="订单号 / 用户手机号" @keyup.enter="search" />
        <select v-model="status" @change="changeFilter">
          <option v-for="option in statusOptions" :key="String(option.value)" :value="option.value">{{ option.label }}</option>
        </select>
        <select v-if="!props.storeId" v-model="storeId" @change="changeFilter">
          <option value="">全部门店</option>
          <option v-for="store in storeOptions" :key="store.id" :value="store.id">{{ store.name }}</option>
        </select>
        <button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 搜索</button>
      </div>
      <span class="order-total">共 {{ total }} 笔订单</span>
    </div>
    <!-- 订单状态统计卡片区：点击卡片可快速按状态筛选 -->
    <section class="order-stats">
      <button v-for="card in statCards" :key="card.key" type="button" class="order-stat" :class="card.color" @click="status = statusOptions.find(option => option.label === card.label)?.value as number; changeFilter()">
        <span><i class="fas" :class="card.icon"></i>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </button>
    </section>
    <!-- 错误提示 -->
    <div v-if="error" class="order-alert">{{ error }}</div>
    <!-- 订单列表卡片 -->
    <section class="card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-list"></i> 订单列表</span>
      </div>
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
                <th>门店</th>
                <th>类型</th>
                <th>状态</th>
                <th>下单时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <!-- 加载中状态 -->
              <tr v-if="loading">
                <td colspan="9" class="order-state"><i class="fas fa-spinner fa-spin"></i> 正在加载...</td>
              </tr>
              <!-- 空数据状态 -->
              <tr v-else-if="!orders.length">
                <td colspan="9" class="order-state">暂无订单</td>
              </tr>
              <!-- 订单数据行 -->
              <tr v-for="item in orders" v-else :key="item.id">
                <td>{{ item.orderNo }}</td>
                <td>{{ item.userName }}<small>{{ item.phone }}</small></td>
                <td>{{ item.items.map(row => row.name).join('、') || '-' }}</td>
                <td class="amount">{{ money(item.payAmount) }}</td>
                <td>{{ item.storeName }}</td>
                <td><span class="type-pill" :class="{ seckill: item.orderType === 'seckill' }">{{ item.orderType === 'seckill' ? '秒杀' : '普通' }}</span></td>
                <td><span class="status-pill" :class="item.status">{{ statusLabel(item.status) }}</span></td>
                <td>{{ item.createdAt }}</td>
                <!-- 操作按钮区：根据状态条件性显示 -->
                <td class="actions">
                  <button class="btn btn-sm btn-outline" @click="openDetail(item)"><i class="fas fa-eye"></i> 详情</button>
                  <button v-if="item.status === 'pending_payment'" class="btn btn-sm btn-danger" :disabled="actionLoading === item.id" @click="performAction(item, 'cancel')">取消</button>
                  <button v-if="item.status === 'pending_delivery' && canShip" class="btn btn-sm btn-success" :disabled="actionLoading === item.id" @click="performAction(item, 'ship')">发货</button>
                  <button v-if="item.status === 'pending_pickup'" class="btn btn-sm btn-success" :disabled="actionLoading === item.id" @click="performAction(item, 'confirm')">确认收货</button>
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
    <!-- 订单状态流程示意 -->
    <section class="card order-flow">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-route"></i> 订单状态流转</span>
      </div>
      <div class="card-body">
        <div v-for="(step,index) in ['提交订单','完成支付','门店发货','到店自提','完成评价']" :key="step" class="flow-step">
          <i>{{ index + 1 }}</i>
          <span>{{ step }}</span>
        </div>
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
          <button v-if="detail.status === 'pending_payment'" class="btn btn-danger" @click="performAction(detail, 'cancel')">取消订单</button>
          <button v-if="detail.status === 'pending_delivery' && canShip" class="btn btn-success" @click="performAction(detail, 'ship')">确认发货</button>
          <button v-if="detail.status === 'pending_pickup'" class="btn btn-success" @click="performAction(detail, 'confirm')">确认收货</button>
          <button class="btn btn-outline" @click="detail = null">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 订单管理页面整体布局：纵向排列各区块 */
.orders-page{display:flex;flex-direction:column;gap:14px} /* 工具栏：搜索与统计信息左右分布 */
.order-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px} /* 搜索栏：弹性换行 */
.search-bar{display:flex;gap:8px;flex-wrap:wrap} /* 搜索输入框宽度 */
.search-bar input{width:240px} /* 订单总数文本 */
.order-total{font-size:13px;color:#64748b} /* 统计卡片区：7列网格布局 */
.order-stats{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px} /* 单个统计卡片样式 */
.order-stat{min-height:86px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:7px;background:#fff;text-align:left;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer} /* 卡片标签样式 */
.order-stat span{display:flex;align-items:center;gap:7px;color:#64748b;font-size:12px} /* 卡片数值字号 */
.order-stat strong{font-size:21px} /* 各主题色：amber蓝紫绿橙灰 */
.order-stat.amber strong,.order-stat.amber i{color:#d97706}.order-stat.blue strong,.order-stat.blue i{color:#2563eb}.order-stat.violet strong,.order-stat.violet i{color:#7c3aed}.order-stat.green strong,.order-stat.green i{color:#16a34a}.order-stat.orange strong,.order-stat.orange i{color:#ea580c}.order-stat.gray strong,.order-stat.gray i{color:#64748b} /* 错误提示框 */
.order-alert{padding:10px 12px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#b91c1c} /* 表格空状态/加载态居中 */
.order-state{text-align:center!important;padding:42px 12px!important;color:#64748b} /* 金额列样式 */
.amount{font-weight:700;color:#dc2626} /* 标签胶囊：订单类型与状态 */
.type-pill,.status-pill{display:inline-block;padding:3px 8px;border-radius:4px;font-size:12px;white-space:nowrap} /* 秒杀类型标签 */
.type-pill{background:#f1f5f9;color:#475569}.type-pill.seckill{background:#fee2e2;color:#dc2626} /* 各状态标签配色 */
.status-pill.pending_payment{background:#fef3c7;color:#92400e}.status-pill.grouping{background:#ffedd5;color:#c2410c}.status-pill.pending_delivery,.status-pill.pending_pickup{background:#dbeafe;color:#1d4ed8}.status-pill.completed{background:#dcfce7;color:#15803d}.status-pill.pending_review{background:#ffedd5;color:#c2410c}.status-pill.reviewed,.status-pill.cancelled,.status-pill.unknown{background:#f1f5f9;color:#64748b} /* 操作列按钮排列 */
.actions{display:flex;gap:5px;white-space:nowrap} /* 表格次要文字（手机号等） */
td small,.detail-item small{display:block;color:#94a3b8;margin-top:3px} /* 分页栏 */
.order-pagination{display:flex;align-items:center;justify-content:center;gap:10px} /* 订单流程图：5列等分 */
.order-flow .card-body{display:grid;grid-template-columns:repeat(5,1fr);gap:8px} /* 流程步骤项 */
.flow-step{text-align:center;position:relative} /* 流程步骤序号圆圈 */
.flow-step i{display:flex;width:36px;height:36px;margin:0 auto 7px;align-items:center;justify-content:center;border-radius:50%;background:#eef2ff;color:#4f46e5;font-style:normal} /* 流程步骤文字 */
.flow-step span{font-size:12px;color:#64748b} /* 详情弹窗：基本信息网格 */
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px} /* 信息项背景 */
.detail-grid>div{padding:12px;background:#f8fafc;border-radius:6px} /* 信息项标签 */
.detail-grid span{display:block;font-size:12px;color:#64748b;margin-bottom:4px} /* 详情弹窗内容区 */
.order-detail{display:flex;flex-direction:column;gap:18px;max-height:65vh;overflow:auto} /* 详情小标题 */
.order-detail h4{font-size:14px;margin:0 0 9px} /* 详情商品项、金额行、时间行 */
.detail-item,.amount-box>div,.timeline>div{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-bottom:1px solid #f1f5f9} /* 金额汇总区背景 */
.amount-box{padding:4px 12px;background:#f8fafc;border-radius:6px} /* 实付金额行 */
.amount-box .paid{border-bottom:0} /* 实付金额强调色 */
.amount-box .paid strong{color:#4f46e5} /* 时间节点数值样式 */
.timeline strong{font-size:12px;color:#64748b} /* 响应式：中等屏幕统计卡片3列 */
@media(max-width:1150px){.order-stats{grid-template-columns:repeat(3,1fr)}} /* 响应式：小屏幕工具栏纵向排列 */
@media(max-width:720px){.order-toolbar{align-items:stretch;flex-direction:column}.search-bar>*{width:100%!important}.order-stats{grid-template-columns:repeat(2,1fr)}.detail-grid{grid-template-columns:1fr}}
</style>
