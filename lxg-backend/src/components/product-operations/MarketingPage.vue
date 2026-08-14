<!--
  文件：MarketingPage.vue
  所属模块：商品运营模块 - 营销活动
  功能说明：秒杀活动管理页面，提供秒杀活动的创建、发布、关闭及商品管理功能。
  关键功能：
    1. 秒杀活动统计概览（进行中数量、未开始数量、销售额、订单数）
    2. 秒杀活动列表管理（创建、发布、关闭/取消）
    3. 添加秒杀商品（选择商品后配置各SKU的秒杀价和库存限制）
    4. 活动状态管理（未开始/正在进行/已结束/管理员关闭/超时）
  API基础路径：/api/admin/v1
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

/** 秒杀活动数据结构 */
interface Activity {
  id: number
  name: string
  startTime: string
  endTime: string
  publishedAt: string
  status: 'active' | 'pending' | 'ended' | 'closed' | 'timeout'
}

/** 商品选项结构（用于选择秒杀商品） */
interface ProductOption { id: number; name: string; originalPrice: number }
/** 秒杀商品SKU结构 */
interface ProductSku {
  id: number
  code: string
  specs: string
  originalPrice: number
  stock: number
  seckillPrice: string
  stockLimit: number
}

/** 组件Props，接收认证token */
const props = defineProps<{ token?: string }>()
const activities = ref<Activity[]>([])           // 秒杀活动列表
const products = ref<ProductOption[]>([])        // 可选商品列表
const loading = ref(false)                       // 活动列表加载状态
const loadError = ref('')                        // 活动列表错误信息
const statsLoading = ref(false)                  // 统计数据加载状态
const statsError = ref('')                       // 统计数据错误信息
const activitySalesAmount = ref(0)               // 活动总销售额
const activityOrderCount = ref(0)                // 活动总订单数
const createOpen = ref(false)                    // 新建活动弹窗是否打开
const createSubmitting = ref(false)              // 新建活动提交中状态
const productActivity = ref<Activity | null>(null) // 当前添加商品的活动
const productSkus = ref<ProductSku[]>([])        // 所选商品的SKU列表
const selectedProductId = ref('')                // 选中的商品ID
const productLoading = ref(false)                // SKU加载状态
const productSubmitting = ref(false)             // 添加商品提交中状态
const closingActivity = ref<Activity | null>(null) // 正在关闭的活动
const closing = ref(false)                       // 关闭操作进行中状态
const publishingIds = reactive(new Set<number>()) // 正在发布中的活动ID集合
const createForm = reactive({ name: '', startTime: '', endTime: '' }) // 新建活动表单

/** 计算属性：正在进行的活动数量 */
const activeCount = computed(() => activities.value.filter(item => item.status === 'active').length)
/** 计算属性：未开始的活动数量 */
const pendingCount = computed(() => activities.value.filter(item => item.status === 'pending').length)
/** 计算属性：活动销售额格式化显示 */
const salesLabel = computed(() => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 2 }).format(activitySalesAmount.value))
/** 计算属性：活动订单数格式化显示 */
const orderLabel = computed(() => activityOrderCount.value.toLocaleString('zh-CN'))

/** 构建请求头，支持JSON内容和Bearer Token认证 */
function headers(json = false) {
  const result = new Headers()
  if (props.token) result.set('Authorization', `Bearer ${props.token}`)
  if (json) result.set('Content-Type', 'application/json')
  return result
}

/**
 * 发送HTTP请求并解析JSON响应
 * @param url - 请求URL
 * @param options - fetch配置选项
 * @returns 解析后的响应数据
 */
async function request(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && ![0, 200].includes(payload.code))) {
    const detail = payload?.data?.message ?? payload?.data?.detail ?? payload?.detail
    const error = new Error(detail ? `${payload?.message || '请求失败'}：${detail}` : payload?.message || `请求失败 (${response.status})`)
    ;(error as Error & { status?: number }).status = response.status
    throw error
  }
  return payload?.data ?? payload
}

/** 将本地时间格式化为API所需的带时区ISO格式（+08:00） */
function apiDateTime(value: string) {
  const normalized = value.trim()
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(normalized)) return `${normalized}:00+08:00`
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(normalized)) return `${normalized}+08:00`
  return normalized
}

/** 从API响应中提取列表数据，兼容多种返回格式 */
function listFrom(data: any): any[] {
  if (Array.isArray(data)) return data
  return data?.list ?? data?.items ?? data?.records ?? data?.activities ?? []
}

/** 显示Toast通知消息 */
function notify(message: string, type: 'success' | 'error' | 'info' = 'success') {
  window.showToast?.(message, type)
}

/** 将后端返回的活动状态值标准化为前端统一的状态枚举 */
function normalizeStatus(value: unknown): Activity['status'] {
  if (value === 'active' || Number(value) === 1) return 'active'
  if (value === 'pending' || Number(value) === 0) return 'pending'
  if (value === 'closed' || Number(value) === 3) return 'closed'
  if (value === 'timeout' || Number(value) === 4) return 'timeout'
  return 'ended'
}

/** 将API返回的活动数据标准化为前端统一格式 */
function normalizeActivity(row: any): Activity {
  return {
    id: Number(row.ID ?? row.id),
    name: String(row.name ?? ''),
    startTime: String(row.startTime ?? row.start_time ?? row.StartTime ?? ''),
    endTime: String(row.endTime ?? row.end_time ?? row.EndTime ?? ''),
    publishedAt: String(row.publishedAt ?? row.published_at ?? row.PublishedAt ?? ''),
    status: normalizeStatus(row.status),
  }
}

/**
 * 加载秒杀活动列表
 * API: GET /api/v1/admin/seckill/activities
 */
async function loadActivities() {
  loading.value = true
  loadError.value = ''
  try {
    const data = await request('/api/v1/admin/seckill/activities?page=1&size=10', { headers: headers() })
    activities.value = listFrom(data).map(normalizeActivity)
  } catch (error) {
    activities.value = []
    loadError.value = error instanceof Error ? error.message : '活动列表加载失败'
  } finally {
    loading.value = false
  }
}

/**
 * 加载活动统计数据（总销售额、总订单数）
 * API: GET /api/v1/admin/seckill/activities/home
 * 兼容后端多种字段命名格式
 */
async function loadActivityStats() {
  statsLoading.value = true
  statsError.value = ''
  try {
    const data = await request('/api/v1/admin/seckill/activities/home', { headers: headers() })
    const source = data?.stats ?? data?.statistics ?? data?.summary ?? data ?? {}
    activitySalesAmount.value = Number(
      source.activitySalesAmount ?? source.activity_sales_amount ?? source.salesAmount ?? source.sales_amount
      ?? source.totalSales ?? source.total_sales ?? source.totalSalesAmount ?? source.total_sales_amount
      ?? source.seckillSalesAmount ?? source.seckill_sales_amount ?? source.activitySales ?? source.activity_sales
      ?? source.totalAmount ?? source.total_amount ?? source.revenue ?? 0,
    ) || 0
    activityOrderCount.value = Number(
      source.activityOrderCount ?? source.activity_order_count ?? source.orderCount ?? source.order_count
      ?? source.totalOrders ?? source.total_orders ?? source.totalOrderCount ?? source.total_order_count
      ?? source.seckillOrderCount ?? source.seckill_order_count ?? source.activityOrders ?? source.activity_orders ?? 0,
    ) || 0
  } catch (error) {
    activitySalesAmount.value = 0
    activityOrderCount.value = 0
    statsError.value = error instanceof Error ? error.message : '活动统计加载失败'
  } finally {
    statsLoading.value = false
  }
}

/** 打开新建活动弹窗并重置表单 */
function openCreate() {
  Object.assign(createForm, { name: '', startTime: '', endTime: '' })
  createOpen.value = true
}

/**
 * 创建秒杀活动
 * API: POST /api/v1/admin/seckill/activities
 */
async function createActivity() {
  if (!createForm.name.trim()) return notify('请输入活动名称', 'error')
  if (!createForm.startTime || !createForm.endTime) return notify('请选择活动时间', 'error')
  if (createForm.startTime >= createForm.endTime) return notify('结束时间必须晚于开始时间', 'error')
  createSubmitting.value = true
  try {
    await request('/api/v1/admin/seckill/activities', {
      method: 'POST', headers: headers(true), body: JSON.stringify({
        name: createForm.name.trim(),
        start_time: apiDateTime(createForm.startTime),
        end_time: apiDateTime(createForm.endTime),
      }),
    })
    createOpen.value = false
    notify('秒杀活动创建成功！')
    await loadActivities()
  } catch (error) {
    notify(error instanceof Error ? error.message : '创建活动失败', 'error')
  } finally {
    createSubmitting.value = false
  }
}

/**
 * 加载可选商品列表
 * API: GET /api/v1/admin/product/list（仅上架商品）
 */
async function loadProducts() {
  const data = await request('/api/v1/admin/product/list?page=1&size=100&status=1', { headers: headers() })
  products.value = listFrom(data).map((item: any) => ({
    id: Number(item.ID ?? item.id),
    name: String(item.name ?? ''),
    originalPrice: Number(item.original_price ?? item.originalPrice ?? 0),
  }))
}

/**
 * 打开添加秒杀商品弹窗
 * @param activity - 要添加商品的活动对象
 */
async function openAddProduct(activity: Activity) {
  productActivity.value = activity
  selectedProductId.value = ''
  productSkus.value = []
  try {
    await loadProducts()
  } catch (error) {
    productActivity.value = null
    notify(error instanceof Error ? error.message : '商品列表加载失败', 'error')
  }
}

/** 将规格对象格式化为可读字符串 */
function formatSpecs(value: unknown): string {
  if (!value) return '默认规格'
  if (typeof value === 'string') return value
  return Object.entries(value as Record<string, unknown>).map(([key, item]) => `${key}: ${item}`).join(' / ') || '默认规格'
}

/**
 * 加载所选商品的SKU列表
 * API: GET /api/v1/admin/product/detail?id={id}
 */
async function loadProductSkus() {
  productSkus.value = []
  if (!selectedProductId.value) return
  productLoading.value = true
  try {
    const data = await request(`/api/v1/admin/product/detail?id=${encodeURIComponent(selectedProductId.value)}`, { headers: headers() })
    const rows = data?.skus ?? data?.product?.skus ?? []
    productSkus.value = (Array.isArray(rows) ? rows : []).map((sku: any) => {
      const stock = Math.max(0, Number(sku.stock ?? sku.stock_limit ?? 0))
      return {
        id: Number(sku.id ?? sku.ID ?? sku.sku_id ?? sku.skuId),
        code: String(sku.sku_code ?? sku.skuCode ?? sku.id ?? ''),
        specs: formatSpecs(sku.spec_values ?? sku.specValues),
        originalPrice: Number(sku.price ?? sku.original_price ?? sku.originalPrice ?? 0),
        stock,
        seckillPrice: '',
        stockLimit: stock,
      }
    })
  } catch (error) {
    notify(error instanceof Error ? error.message : 'SKU 加载失败', 'error')
  } finally {
    productLoading.value = false
  }
}

/**
 * 添加秒杀商品到活动
 * API: POST /api/v1/admin/seckill/activities/products
 * 提交各SKU的秒杀价格和库存限制
 */
async function addProduct() {
  if (!productActivity.value || !selectedProductId.value || !productSkus.value.length) return notify('请选择包含 SKU 的商品', 'error')
  if (productSkus.value.some(sku => sku.seckillPrice === '' || !Number.isFinite(Number(sku.seckillPrice)) || Number(sku.seckillPrice) < 0 || !Number.isInteger(Number(sku.stockLimit)) || Number(sku.stockLimit) < 0)) {
    return notify('请完整填写有效的秒杀价和库存限制', 'error')
  }
  productSubmitting.value = true
  try {
    await request('/api/v1/admin/seckill/activities/products', {
      method: 'POST', headers: headers(true), body: JSON.stringify({
        activity_id: productActivity.value.id,
        product_id: Number(selectedProductId.value),
        skus: productSkus.value.map(sku => ({
          sku_id: sku.id,
          seckill_price: Number(sku.seckillPrice),
          stock_limit: Number(sku.stockLimit),
        })),
      }),
    })
    productActivity.value = null
    notify('秒杀商品添加成功！')
    await loadActivities()
  } catch (error) {
    notify(error instanceof Error ? error.message : '添加商品失败', 'error')
  } finally {
    productSubmitting.value = false
  }
}

/**
 * 发布秒杀活动
 * API: POST /api/v1/admin/seckill/activities/publish
 * @param activity - 要发布的活动对象
 */
async function publishActivity(activity: Activity) {
  if (publishingIds.has(activity.id)) return
  publishingIds.add(activity.id)
  try {
    await request('/api/v1/admin/seckill/activities/publish', {
      method: 'POST', headers: headers(true), body: JSON.stringify({ activity_id: activity.id }),
    })
    notify('秒杀活动发布成功！')
    await loadActivities()
  } catch (error) {
    notify(error instanceof Error ? error.message : '发布活动失败', 'error')
  } finally {
    publishingIds.delete(activity.id)
  }
}

/**
 * 关闭/取消秒杀活动
 * API: POST /api/v1/admin/seckill/activities/close
 */
async function closeActivity() {
  if (!closingActivity.value || closing.value) return
  closing.value = true
  try {
    await request('/api/v1/admin/seckill/activities/close', {
      method: 'POST', headers: headers(true), body: JSON.stringify({ activity_id: closingActivity.value.id }),
    })
    closingActivity.value = null
    notify('秒杀活动已关闭')
    await loadActivities()
  } catch (error) {
    notify(error instanceof Error ? error.message : '关闭活动失败', 'error')
  } finally {
    closing.value = false
  }
}

/** 根据活动状态返回中文描述 */
function statusText(status: Activity['status']) {
  return { active: '正在进行', pending: '未开始', ended: '已结束', closed: '管理员关闭', timeout: '超时' }[status]
}

/** 根据活动状态返回对应的颜色类名 */
function statusClass(status: Activity['status']) {
  return { active: 'green', pending: 'yellow', ended: 'gray', closed: 'red', timeout: 'red' }[status]
}

/** 组件挂载：并行加载活动列表和统计数据 */
onMounted(() => Promise.all([loadActivities(), loadActivityStats()]))
</script>

<template>
  <!-- 顶部操作栏：新建秒杀按钮 -->
  <div class="flex-between mb-4">
    <span></span>
    <button class="btn btn-primary" type="button" @click="openCreate"><i class="fas fa-bolt"></i> 新建秒杀</button>
  </div>

  <!-- 活动统计概览卡片 -->
  <div class="trade-stat-grid">
    <div class="stat-card">
      <div class="label"><i class="fas fa-bolt"></i> 正在进行秒杀</div>
      <div class="value blue">{{ activeCount }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-clock"></i> 未开始</div>
      <div class="value yellow">{{ pendingCount }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-chart-bar"></i> 活动销售额</div>
      <div class="value purple">
        <i v-if="statsLoading" class="fas fa-spinner fa-spin"></i>
        <template v-else>{{ salesLabel }}</template>
      </div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-shopping-cart"></i> 活动订单数</div>
      <div class="value green">
        <i v-if="statsLoading" class="fas fa-spinner fa-spin"></i>
        <template v-else>{{ orderLabel }}</template>
      </div>
    </div>
  </div>
  <!-- 统计数据加载错误提示 -->
  <div v-if="statsError" class="stock-list-error marketing-stats-error">
    <i class="fas fa-exclamation-circle"></i>
    {{ statsError }}
    <button class="btn btn-sm btn-outline" @click="loadActivityStats">重试</button>
  </div>

  <!-- 秒杀活动列表卡片 -->
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-bolt"></i> 秒杀活动管理</span>
      <span class="text-muted" style="font-size:13px">共 {{ activities.length }} 个活动</span>
    </div>
    <div v-if="loadError" class="stock-list-error">
      <i class="fas fa-exclamation-circle"></i>
      {{ loadError }}
      <button class="btn btn-sm btn-outline" @click="loadActivities">重试</button>
    </div>
    <div class="card-body no-pad">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>活动名称</th>
              <th>活动时间</th>
              <th>发布时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading"><td colspan="5" class="product-state">活动加载中...</td></tr>
            <tr v-else-if="!activities.length"><td colspan="5" class="product-state">暂无秒杀活动</td></tr>
            <tr v-for="activity in activities" v-else :key="activity.id">
              <td>{{ activity.name }}</td>
              <td>{{ activity.startTime }}<br />{{ activity.endTime }}</td>
              <td>{{ activity.publishedAt || '未发布' }}</td>
              <td><span class="status-badge" :class="statusClass(activity.status)"><span class="dot"></span> {{ statusText(activity.status) }}</span></td>
          <td>
            <button v-if="activity.status === 'pending'" class="btn btn-sm btn-outline" type="button" @click="openAddProduct(activity)"><i class="fas fa-plus"></i> 添加商品</button>
            <button v-if="activity.status === 'pending'" class="btn btn-sm btn-primary" type="button" :data-publish-activity-id="activity.id" :disabled="publishingIds.has(activity.id)" @click="publishActivity(activity)"><i class="fas" :class="publishingIds.has(activity.id) ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i> {{ publishingIds.has(activity.id) ? '发布中' : '发布' }}</button>
            <button v-if="activity.status === 'active' || activity.status === 'pending'" class="btn btn-sm btn-danger" type="button" :data-close-activity-id="activity.id" @click="closingActivity = activity"><i class="fas fa-times"></i> {{ activity.status === 'active' ? '结束' : '取消' }}</button>
          </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 新建秒杀活动弹窗 -->
  <template v-if="createOpen">
    <div class="modal-overlay" @click="createOpen = false"></div>
    <div class="modal-content" style="width:640px">
      <div class="modal-header">
        <h3><i class="fas fa-bolt"></i> 新建秒杀活动</h3>
        <button class="modal-close" @click="createOpen = false"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <div class="trade-form-grid">
          <div>
            <label class="trade-form-label">活动名称 <span class="required">*</span></label>
            <input id="seckillName" v-model="createForm.name" class="trade-form-input" />
          </div>
          <div>
            <label class="trade-form-label">开始时间 <span class="required">*</span></label>
            <input id="seckillStartTime" v-model="createForm.startTime" type="datetime-local" class="trade-form-input" />
          </div>
          <div class="trade-form-full">
            <label class="trade-form-label">结束时间 <span class="required">*</span></label>
            <input id="seckillEndTime" v-model="createForm.endTime" type="datetime-local" class="trade-form-input" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="createOpen = false">取消</button>
        <button class="btn btn-primary" :disabled="createSubmitting" @click="createActivity"><i class="fas" :class="createSubmitting ? 'fa-spinner fa-spin' : 'fa-save'"></i> {{ createSubmitting ? '保存中' : '保存' }}</button>
      </div>
    </div>
  </template>

  <!-- 添加秒杀商品弹窗 -->
  <template v-if="productActivity">
    <div class="modal-overlay" @click="productActivity = null"></div>
    <div class="modal-content" style="width:680px">
      <div class="modal-header">
        <h3><i class="fas fa-box-open"></i> 添加秒杀商品</h3>
        <button class="modal-close" @click="productActivity = null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body" style="max-height:65vh;overflow-y:auto">
        <input id="seckillProductActivityId" type="hidden" :value="productActivity.id" />
        <label class="trade-form-label">活动商品 <span class="required">*</span></label>
        <select id="seckillProductSelect" v-model="selectedProductId" class="trade-form-input" @change="loadProductSkus">
          <option value="">请选择商品</option>
          <option v-for="product in products" :key="product.id" :value="String(product.id)">{{ product.name }}</option>
        </select>
        <div id="seckillSkuEditor" style="margin-top:16px">
          <div v-if="productLoading" class="product-state"><i class="fas fa-spinner fa-spin"></i> SKU 加载中...</div>
          <div v-else-if="!productSkus.length" class="product-state">选择商品后配置 SKU 秒杀价格</div>
          <div v-else class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>规格</th>
                  <th>原价</th>
                  <th>秒杀价</th>
                  <th>库存限制</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sku in productSkus" :key="sku.id" class="seckill-sku-row" :data-sku-id="sku.id">
                  <td>{{ sku.code }}</td>
                  <td>{{ sku.specs }}</td>
                  <td>¥{{ sku.originalPrice }}</td>
                  <td><input v-model="sku.seckillPrice" class="trade-form-input seckill-sku-price" type="number" min="0" step="0.01" :max="sku.originalPrice || undefined" /></td>
                  <td><input v-model.number="sku.stockLimit" class="trade-form-input seckill-sku-stock" type="number" min="0" step="1" :max="sku.stock" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="productActivity = null">取消</button>
        <button id="seckillProductSubmit" class="btn btn-primary" :disabled="!productSkus.length || productSubmitting" @click="addProduct"><i class="fas" :class="productSubmitting ? 'fa-spinner fa-spin' : 'fa-save'"></i> {{ productSubmitting ? '添加中' : '确认添加' }}</button>
      </div>
    </div>
  </template>

  <!-- 关闭活动确认弹窗 -->
  <template v-if="closingActivity">
    <div class="modal-overlay" @click="!closing && (closingActivity = null)"></div>
    <div class="modal-content" style="width:420px">
      <div class="modal-header">
        <h3>确认操作</h3>
        <button class="modal-close" :disabled="closing" @click="closingActivity = null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">确定提前结束此秒杀活动吗？</div>
      <div class="modal-footer">
        <button class="btn btn-outline" :disabled="closing" @click="closingActivity = null">取消</button>
        <button class="btn btn-primary" :disabled="closing" @click="closeActivity"><i class="fas" :class="closing ? 'fa-spinner fa-spin' : 'fa-check'"></i> {{ closing ? '处理中' : '确认' }}</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
/* 必填项标记和危险色 */
.required,.danger-color{color:#ef4444}
/* 加载/空状态样式 */
.product-state{padding:24px;text-align:center;color:#94a3b8}
/* 错误提示样式 */
.stock-list-error{padding:10px 14px;color:#b91c1c;background:#fef2f2}
/* 统计错误区域样式 */
.marketing-stats-error{margin-bottom:12px;border-radius:6px}
/* 表格操作按钮间距 */
td .btn+ .btn{margin-left:6px}
</style>
