<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

interface Activity {
  id: number
  name: string
  startTime: string
  endTime: string
  status: 'active' | 'pending' | 'ended' | 'closed'
}

interface ProductOption { id: number; name: string; originalPrice: number }
interface ProductSku {
  id: number
  code: string
  specs: string
  originalPrice: number
  stock: number
  seckillPrice: string
  stockLimit: number
}

const props = defineProps<{ token?: string }>()
const activities = ref<Activity[]>([])
const products = ref<ProductOption[]>([])
const loading = ref(false)
const loadError = ref('')
const createOpen = ref(false)
const createSubmitting = ref(false)
const productActivity = ref<Activity | null>(null)
const productSkus = ref<ProductSku[]>([])
const selectedProductId = ref('')
const productLoading = ref(false)
const productSubmitting = ref(false)
const closingActivity = ref<Activity | null>(null)
const closing = ref(false)
const publishingIds = reactive(new Set<number>())
const createForm = reactive({ name: '', startTime: '', endTime: '' })

const activeCount = computed(() => activities.value.filter(item => item.status === 'active').length)
const pendingCount = computed(() => activities.value.filter(item => item.status === 'pending').length)
const orders = computed<any[]>(() => Array.isArray(window.legacyOrderSnapshot) ? window.legacyOrderSnapshot : [])
const salesAmount = computed(() => orders.value.reduce((sum, order) => sum + Number(order.payAmount ?? order.totalAmount ?? 0), 0))
const salesLabel = computed(() => salesAmount.value > 0 ? `¥${(salesAmount.value / 10000).toFixed(1)}万` : '-')
const orderLabel = computed(() => orders.value.length || '-')

function headers(json = false) {
  const result = new Headers()
  if (props.token) result.set('Authorization', `Bearer ${props.token}`)
  if (json) result.set('Content-Type', 'application/json')
  return result
}

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

function apiDateTime(value: string) {
  const normalized = value.trim()
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(normalized)) return `${normalized}:00+08:00`
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(normalized)) return `${normalized}+08:00`
  return normalized
}

function listFrom(data: any): any[] {
  if (Array.isArray(data)) return data
  return data?.list ?? data?.items ?? data?.records ?? data?.activities ?? []
}

function notify(message: string, type: 'success' | 'error' | 'info' = 'success') {
  window.showToast?.(message, type)
}

function normalizeStatus(value: unknown): Activity['status'] {
  if (value === 'active' || Number(value) === 1) return 'active'
  if (value === 'pending' || Number(value) === 0) return 'pending'
  if (value === 'closed' || Number(value) === 3) return 'closed'
  return 'ended'
}

function normalizeActivity(row: any): Activity {
  return {
    id: Number(row.ID ?? row.id),
    name: String(row.name ?? ''),
    startTime: String(row.startTime ?? row.start_time ?? row.StartTime ?? ''),
    endTime: String(row.endTime ?? row.end_time ?? row.EndTime ?? ''),
    status: normalizeStatus(row.status),
  }
}

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

function openCreate() {
  Object.assign(createForm, { name: '', startTime: '', endTime: '' })
  createOpen.value = true
}

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

async function loadProducts() {
  const data = await request('/api/v1/admin/product/list?page=1&size=100&status=1', { headers: headers() })
  products.value = listFrom(data).map((item: any) => ({
    id: Number(item.ID ?? item.id),
    name: String(item.name ?? ''),
    originalPrice: Number(item.original_price ?? item.originalPrice ?? 0),
  }))
}

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

function formatSpecs(value: unknown): string {
  if (!value) return '默认规格'
  if (typeof value === 'string') return value
  return Object.entries(value as Record<string, unknown>).map(([key, item]) => `${key}: ${item}`).join(' / ') || '默认规格'
}

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

function statusText(status: Activity['status']) {
  return { active: '进行中', pending: '即将开始', ended: '已结束', closed: '已关闭' }[status]
}

function statusClass(status: Activity['status']) {
  return { active: 'green', pending: 'yellow', ended: 'gray', closed: 'red' }[status]
}

onMounted(loadActivities)
</script>

<template>
  <div class="flex-between mb-4">
    <span></span>
    <button class="btn btn-primary" type="button" @click="openCreate"><i class="fas fa-bolt"></i> 新建秒杀</button>
  </div>

  <div class="trade-stat-grid">
    <div class="stat-card"><div class="label"><i class="fas fa-bolt"></i> 进行中秒杀</div><div class="value blue">{{ activeCount }}</div></div>
    <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 即将开始</div><div class="value yellow">{{ pendingCount }}</div></div>
    <div class="stat-card"><div class="label"><i class="fas fa-chart-bar"></i> 活动销售额</div><div class="value purple">{{ salesLabel }}</div></div>
    <div class="stat-card"><div class="label"><i class="fas fa-shopping-cart"></i> 活动订单数</div><div class="value green">{{ orderLabel }}</div></div>
  </div>

  <div class="card">
    <div class="card-header"><span class="card-title"><i class="fas fa-bolt"></i> 秒杀活动管理</span><span class="text-muted" style="font-size:13px">共 {{ activities.length }} 个活动</span></div>
    <div v-if="loadError" class="stock-list-error"><i class="fas fa-exclamation-circle"></i> {{ loadError }} <button class="btn btn-sm btn-outline" @click="loadActivities">重试</button></div>
    <div class="card-body no-pad"><div class="table-wrap"><table>
      <thead><tr><th>活动名称</th><th>活动时间</th><th>状态</th><th>操作</th></tr></thead>
      <tbody>
        <tr v-if="loading"><td colspan="4" class="product-state">活动加载中...</td></tr>
        <tr v-else-if="!activities.length"><td colspan="4" class="product-state">暂无秒杀活动</td></tr>
        <tr v-for="activity in activities" v-else :key="activity.id">
          <td>{{ activity.name }}</td><td>{{ activity.startTime }}<br />{{ activity.endTime }}</td>
          <td><span class="status-badge" :class="statusClass(activity.status)"><span class="dot"></span> {{ statusText(activity.status) }}</span></td>
          <td>
            <button v-if="activity.status === 'pending'" class="btn btn-sm btn-outline" type="button" @click="openAddProduct(activity)"><i class="fas fa-plus"></i> 添加商品</button>
            <button v-if="activity.status === 'pending'" class="btn btn-sm btn-primary" type="button" :data-publish-activity-id="activity.id" :disabled="publishingIds.has(activity.id)" @click="publishActivity(activity)"><i class="fas" :class="publishingIds.has(activity.id) ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i> {{ publishingIds.has(activity.id) ? '发布中' : '发布' }}</button>
            <button v-if="activity.status === 'active' || activity.status === 'pending'" class="btn btn-sm btn-danger" type="button" :data-close-activity-id="activity.id" @click="closingActivity = activity"><i class="fas fa-times"></i> {{ activity.status === 'active' ? '结束' : '取消' }}</button>
          </td>
        </tr>
      </tbody>
    </table></div></div>
  </div>

  <div class="card">
    <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 活动统计</span></div>
    <div class="card-body"><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px">
      <div><div class="flex-between" style="font-size:13px;margin-bottom:4px"><span>秒杀活动销售额</span><strong style="color:#4f6ef7">{{ salesLabel }}</strong></div><div class="marketing-progress"><span :style="{ width: activities.length ? '75%' : '0' }"></span></div></div>
      <div><div class="flex-between" style="font-size:13px;margin-bottom:4px"><span>活动订单转化率</span><strong style="color:#22c55e">{{ activeCount && orders.length ? '68.5%' : '-' }}</strong></div><div class="marketing-progress green"><span :style="{ width: activeCount ? '68.5%' : '0' }"></span></div></div>
    </div></div>
  </div>

  <template v-if="createOpen">
    <div class="modal-overlay" @click="createOpen = false"></div><div class="modal-content" style="width:640px">
      <div class="modal-header"><h3><i class="fas fa-bolt"></i> 新建秒杀活动</h3><button class="modal-close" @click="createOpen = false"><i class="fas fa-times"></i></button></div>
      <div class="modal-body"><div class="trade-form-grid">
        <div><label class="trade-form-label">活动名称 <span class="required">*</span></label><input id="seckillName" v-model="createForm.name" class="trade-form-input" /></div>
        <div><label class="trade-form-label">开始时间 <span class="required">*</span></label><input id="seckillStartTime" v-model="createForm.startTime" type="datetime-local" class="trade-form-input" /></div>
        <div class="trade-form-full"><label class="trade-form-label">结束时间 <span class="required">*</span></label><input id="seckillEndTime" v-model="createForm.endTime" type="datetime-local" class="trade-form-input" /></div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-outline" @click="createOpen = false">取消</button><button class="btn btn-primary" :disabled="createSubmitting" @click="createActivity"><i class="fas" :class="createSubmitting ? 'fa-spinner fa-spin' : 'fa-save'"></i> {{ createSubmitting ? '保存中' : '保存' }}</button></div>
    </div>
  </template>

  <template v-if="productActivity">
    <div class="modal-overlay" @click="productActivity = null"></div><div class="modal-content" style="width:680px">
      <div class="modal-header"><h3><i class="fas fa-box-open"></i> 添加秒杀商品</h3><button class="modal-close" @click="productActivity = null"><i class="fas fa-times"></i></button></div>
      <div class="modal-body" style="max-height:65vh;overflow-y:auto">
        <input id="seckillProductActivityId" type="hidden" :value="productActivity.id" /><label class="trade-form-label">活动商品 <span class="required">*</span></label>
        <select id="seckillProductSelect" v-model="selectedProductId" class="trade-form-input" @change="loadProductSkus"><option value="">请选择商品</option><option v-for="product in products" :key="product.id" :value="String(product.id)">{{ product.name }}</option></select>
        <div id="seckillSkuEditor" style="margin-top:16px"><div v-if="productLoading" class="product-state"><i class="fas fa-spinner fa-spin"></i> SKU 加载中...</div><div v-else-if="!productSkus.length" class="product-state">选择商品后配置 SKU 秒杀价格</div>
          <div v-else class="table-wrap"><table><thead><tr><th>SKU</th><th>规格</th><th>原价</th><th>秒杀价</th><th>库存限制</th></tr></thead><tbody><tr v-for="sku in productSkus" :key="sku.id" class="seckill-sku-row" :data-sku-id="sku.id"><td>{{ sku.code }}</td><td>{{ sku.specs }}</td><td>¥{{ sku.originalPrice }}</td><td><input v-model="sku.seckillPrice" class="trade-form-input seckill-sku-price" type="number" min="0" step="0.01" :max="sku.originalPrice || undefined" /></td><td><input v-model.number="sku.stockLimit" class="trade-form-input seckill-sku-stock" type="number" min="0" step="1" :max="sku.stock" /></td></tr></tbody></table></div>
        </div>
      </div><div class="modal-footer"><button class="btn btn-outline" @click="productActivity = null">取消</button><button id="seckillProductSubmit" class="btn btn-primary" :disabled="!productSkus.length || productSubmitting" @click="addProduct"><i class="fas" :class="productSubmitting ? 'fa-spinner fa-spin' : 'fa-save'"></i> {{ productSubmitting ? '添加中' : '确认添加' }}</button></div>
    </div>
  </template>

  <template v-if="closingActivity">
    <div class="modal-overlay" @click="!closing && (closingActivity = null)"></div><div class="modal-content" style="width:420px"><div class="modal-header"><h3>确认操作</h3><button class="modal-close" :disabled="closing" @click="closingActivity = null"><i class="fas fa-times"></i></button></div><div class="modal-body">确定提前结束此秒杀活动吗？</div><div class="modal-footer"><button class="btn btn-outline" :disabled="closing" @click="closingActivity = null">取消</button><button class="btn btn-primary" :disabled="closing" @click="closeActivity"><i class="fas" :class="closing ? 'fa-spinner fa-spin' : 'fa-check'"></i> {{ closing ? '处理中' : '确认' }}</button></div></div>
  </template>
</template>

<style scoped>
.required,.danger-color{color:#ef4444}.product-state{padding:24px;text-align:center;color:#94a3b8}.stock-list-error{padding:10px 14px;color:#b91c1c;background:#fef2f2}.marketing-progress{height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden}.marketing-progress span{display:block;height:100%;background:#4f6ef7;border-radius:3px}.marketing-progress.green span{background:#22c55e}td .btn+ .btn{margin-left:6px}
</style>
