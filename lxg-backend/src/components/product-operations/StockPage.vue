<!--
  文件：StockPage.vue
  所属模块：商品运营模块 - 库存管理
  功能说明：库存管理页面，提供库存概览、低库存预警、SKU库存查询和出入库记录管理。
  关键功能：
    1. 库存概览（总库存、今日入库/出库、预警数量）
    2. 低库存预警列表（分页展示低于阈值的SKU）
    3. 按SKU查询库存（支持关键词搜索）
    4. 出入库记录查询（支持按SKU和日期筛选）
    5. 手动调整库存（支持采购入库、销售出库、损耗、盘盈、盘亏等类型）
  API基础路径：/api/admin/v1
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

/** 库存SKU数据结构 */
interface StockSku { skuId: number | null; skuCode: string; name: string; spec: string; stock: number; threshold: number; status: 'warning' | 'normal' }
/** 出入库日志数据结构 */
interface StockLog { id: string | number; skuCode: string; name: string; spec: string; type: number; quantity: number; beforeStock: number; afterStock: number; orderId: string; operator: string; reason: string; createdAt: string }

/** 组件Props，接收认证token */
const props = defineProps<{ token?: string }>()
/** 库存概览统计数据 */
const summary = reactive({ totalStock: 0, todayInbound: 0, todayOutbound: 0, warningCount: 0 })
const warnings = ref<StockSku[]>([])           // 低库存预警SKU列表
const warningPage = ref(1)                     // 预警列表当前页码
const warningPageSize = 5                       // 预警列表每页条数
const inventory = ref<StockSku[]>([])          // 库存查询列表
const logs = ref<StockLog[]>([])               // 出入库记录列表
const inventoryLoading = ref(false)            // 库存列表加载状态
const logLoading = ref(false)                  // 日志列表加载状态
const dashboardError = ref('')                 // 概览错误信息
const inventoryError = ref('')                 // 库存列表错误信息
const logError = ref('')                       // 日志列表错误信息
const inventoryKeywordInput = ref('')          // 库存搜索输入框值
const inventoryKeyword = ref('')               // 库存搜索实际查询值
const inventoryPage = ref(1)                   // 库存列表当前页码
const inventorySize = 10                        // 库存列表每页条数
const warningFetchPageSize = 20                 // 拉取全部预警时的每页条数
const inventoryTotal = ref(0)                  // 库存列表总数
const logKeywordInput = ref('')                // 日志搜索输入框值
const logKeyword = ref('')                     // 日志搜索实际查询值
const logDate = ref('')                        // 日志日期筛选
const logPage = ref(1)                         // 日志列表当前页码
const logSize = 6                               // 日志列表每页条数
const logTotal = ref(0)                        // 日志列表总数
const selectedSku = ref<StockSku | null>(null) // 当前选中调整库存的SKU
const adjustType = ref(2)                      // 库存调整类型（默认采购入库）
const adjustQuantity = ref(10)                 // 调整数量
const adjustReason = ref('')                   // 调整原因
const submitting = ref(false)                  // 调整提交中状态

/** 计算属性：库存列表总页数 */
const inventoryPages = computed(() => Math.max(1, Math.ceil(inventoryTotal.value / inventorySize)))
/** 计算属性：预警列表总页数 */
const warningPages = computed(() => Math.max(1, Math.ceil(warnings.value.length / warningPageSize)))
/** 计算属性：当前页显示的预警SKU列表 */
const visibleWarnings = computed(() => warnings.value.slice((warningPage.value - 1) * warningPageSize, warningPage.value * warningPageSize))
/** 计算属性：日志列表总页数 */
const logPages = computed(() => Math.max(1, Math.ceil(logTotal.value / logSize)))
/** 计算属性：按日期筛选后的日志列表 */
const filteredLogs = computed(() => !logDate.value ? logs.value : logs.value.filter(log => log.createdAt.includes(logDate.value)))
/** 库存调整类型选项配置 */
const adjustmentTypes = [
  { value: 2, name: '采购入库', desc: '类型 2 · 增加', positive: true },
  { value: 1, name: '销售出库', desc: '类型 1 · 减少', positive: false },
  { value: 3, name: '损耗', desc: '类型 3 · 减少', positive: false },
  { value: 4, name: '盘盈', desc: '类型 4 · 增加', positive: true },
  { value: 5, name: '盘亏', desc: '类型 5 · 减少', positive: false },
]

/** 构建请求头，支持JSON内容和Bearer Token认证 */
function headers(json = false) {
  const value = new Headers()
  if (json) value.set('Content-Type', 'application/json')
  if (props.token) value.set('Authorization', `Bearer ${props.token}`)
  return value
}

/**
 * 发送HTTP请求并解析JSON响应
 * @param url - 请求URL
 * @param options - fetch配置选项
 * @returns 解析后的响应数据
 */
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`)
  return payload?.data ?? payload
}

/** 将规格对象格式化为可读字符串 */
function formatSpec(value: unknown) {
  if (!value || typeof value !== 'object') return '-'
  const entries = Object.entries(value as Record<string, unknown>).filter(([, item]) => item !== null && item !== undefined && item !== '')
  return entries.length ? entries.map(([key, item]) => `${key}: ${item}`).join(' / ') : '-'
}

/** 将API返回的SKU数据标准化为前端统一格式 */
function normalizeSku(row: any): StockSku {
  const stock = Number(row.stock ?? row.current_stock) || 0
  const threshold = Number(row.warning_value ?? row.warningValue ?? row.threshold) || 0
  return {
    skuId: Number(row.sku_id ?? row.skuId ?? row.SKU_ID ?? row.sku?.id ?? row.ID ?? row.id) || null,
    skuCode: String(row.sku_code ?? row.skuCode ?? row.sku?.sku_code ?? '').trim(),
    name: String(row.product_name ?? row.productName ?? row.goods_name ?? row.goodsName ?? ''),
    spec: formatSpec(row.spec_values ?? row.specValues), stock, threshold,
    status: String(row.status ?? '').includes('预警') || stock <= threshold ? 'warning' : 'normal',
  }
}

/** 将API返回的出入库日志数据标准化为前端统一格式 */
function normalizeLog(row: any): StockLog {
  return {
    id: row.ID ?? row.id, skuCode: String(row.sku_code ?? row.skuCode ?? row.sku_id ?? ''),
    name: String(row.product_name ?? row.productName ?? row.sku_name ?? ''), spec: formatSpec(row.spec_values ?? row.specValues),
    type: Number(row.type) || 0, quantity: Number(row.quantity) || 0,
    beforeStock: Number(row.before_stock ?? row.beforeStock) || 0, afterStock: Number(row.after_stock ?? row.afterStock) || 0,
    orderId: String(row.order_id ?? row.orderId ?? '-'), operator: String(row.operator_name ?? row.operatorName ?? row.operator ?? '-'),
    reason: String(row.reason ?? '-'), createdAt: String(row.created_at ?? row.CreatedAt ?? row.createdAt ?? '-'),
  }
}

/** 从API响应中提取列表数据，兼容多种返回格式 */
function listFrom(data: any, extra = ''): any[] {
  if (Array.isArray(data)) return data
  return data?.list ?? data?.items ?? data?.records ?? (extra ? data?.[extra] : null) ?? []
}

/**
 * 加载库存概览数据
 * API: GET /api/v1/admin/home
 * 获取总库存、今日入库/出库、预警SKU列表等概览信息
 */
async function loadDashboard() {
  dashboardError.value = ''
  try {
    const data = await requestJson('/api/v1/admin/home', { headers: headers() })
    const list = Array.isArray(data?.warning_sku_list) ? data.warning_sku_list : []
    const dashboardWarnings = list.map(normalizeSku)
    warnings.value = dashboardWarnings
    summary.totalStock = Number(data?.total_stock) || 0; summary.todayInbound = Number(data?.today_inbound) || 0
    summary.todayOutbound = Number(data?.today_outbound) || 0; summary.warningCount = Number(data?.warning_sku_count) || list.length
    try {
      const allWarnings = await loadAllWarnings()
      if (allWarnings.length >= summary.warningCount) warnings.value = allWarnings
      summary.warningCount = Math.max(summary.warningCount, warnings.value.length)
      warningPage.value = Math.min(warningPage.value, warningPages.value)
    } catch (cause) {
      console.warn('Unable to load every low-stock inventory page', cause)
    }
  } catch (cause) { dashboardError.value = cause instanceof Error ? cause.message : '库存概览加载失败' }
}

/**
 * 加载全部低库存预警SKU
 * API: GET /api/v1/admin/search/inventory
 * 通过分页循环获取全部库存数据后筛选出预警SKU
 * @returns 去重后的预警SKU列表
 */
async function loadAllWarnings(): Promise<StockSku[]> {
  const firstParams = new URLSearchParams({ page: '1', size: String(warningFetchPageSize), keyword: '' })
  const first = await requestJson(`/api/v1/admin/search/inventory?${firstParams}`, { headers: headers() })
  const total = Number(first?.total ?? first?.total_count ?? first?.count) || listFrom(first, 'inventory_list').length
  const pageCount = Math.max(1, Math.ceil(total / warningFetchPageSize))
  const rest = await Promise.all(Array.from({ length: pageCount - 1 }, (_, index) => {
    const params = new URLSearchParams({ page: String(index + 2), size: String(warningFetchPageSize), keyword: '' })
    return requestJson(`/api/v1/admin/search/inventory?${params}`, { headers: headers() })
  }))
  const rows = [first, ...rest].flatMap(data => listFrom(data, 'inventory_list')).map(normalizeSku)
  const unique = new Map<string, StockSku>()
  rows.filter(item => item.status === 'warning' || item.stock <= item.threshold).forEach(item => {
    const key = item.skuId ? `id:${item.skuId}` : `code:${item.skuCode}`
    unique.set(key, item)
  })
  return [...unique.values()]
}

/**
 * 加载库存列表
 * API: GET /api/v1/admin/search/inventory
 * 支持分页和关键词搜索
 */
async function loadInventory() {
  inventoryLoading.value = true; inventoryError.value = ''
  try {
    const params = new URLSearchParams({ page: String(inventoryPage.value), size: String(inventorySize), keyword: inventoryKeyword.value })
    const data = await requestJson(`/api/v1/admin/search/inventory?${params}`, { headers: headers() })
    const list = listFrom(data, 'inventory_list'); inventory.value = list.map(normalizeSku)
    inventoryTotal.value = Number(data?.total ?? data?.total_count ?? data?.count) || list.length
    inventoryPage.value = Number(data?.page ?? data?.current_page) || inventoryPage.value
  } catch (cause) { inventory.value = []; inventoryTotal.value = 0; inventoryError.value = cause instanceof Error ? cause.message : '库存列表加载失败' }
  finally { inventoryLoading.value = false }
}

/**
 * 加载出入库记录
 * API: GET /api/v1/admin/log/inventory
 * 支持分页和关键词搜索
 */
async function loadLogs() {
  logLoading.value = true; logError.value = ''
  try {
    const params = new URLSearchParams({ page: String(logPage.value), size: String(logSize), keyword: logKeyword.value })
    const data = await requestJson(`/api/v1/admin/log/inventory?${params}`, { headers: headers() })
    const list = listFrom(data, 'logs'); logs.value = list.map(normalizeLog)
    logTotal.value = Number(data?.total ?? data?.total_count ?? data?.count) || list.length
    logPage.value = Number(data?.page ?? data?.current_page) || logPage.value
  } catch (cause) { logs.value = []; logTotal.value = 0; logError.value = cause instanceof Error ? cause.message : '库存日志加载失败' }
  finally { logLoading.value = false }
}

/** 搜索库存：同步关键词并重置页码 */
async function searchInventory() { inventoryKeyword.value = inventoryKeywordInput.value.trim(); inventoryPage.value = 1; await loadInventory() }
/** 搜索日志：同步关键词并重置页码 */
async function searchLogs() { logKeyword.value = logKeywordInput.value.trim(); logPage.value = 1; await loadLogs() }
/** 切换库存列表页码 */
async function changeInventoryPage(next: number) { if (next < 1 || next > inventoryPages.value || next === inventoryPage.value) return; inventoryPage.value = next; await loadInventory() }
/** 切换预警列表页码（纯前端分页） */
function changeWarningPage(next: number) { if (next < 1 || next > warningPages.value || next === warningPage.value) return; warningPage.value = next }
/** 切换日志列表页码 */
async function changeLogPage(next: number) { if (next < 1 || next > logPages.value || next === logPage.value) return; logPage.value = next; await loadLogs() }

/**
 * 打开库存调整弹窗
 * 确保选中的SKU有有效的skuId，如果没有则通过API重新查询
 * @param sku - 要调整库存的SKU对象
 */
async function openAdjust(sku: StockSku) {
  let resolved = inventory.value.find(item => item.skuCode.toLowerCase() === sku.skuCode.toLowerCase() && item.skuId) ?? null
  if (!resolved) {
    try {
      const params = new URLSearchParams({ page: '1', size: '10', keyword: sku.skuCode })
      const data = await requestJson(`/api/v1/admin/search/inventory?${params}`, { headers: headers() })
      resolved = listFrom(data, 'inventory_list').map(normalizeSku).find(item => item.skuCode.toLowerCase() === sku.skuCode.toLowerCase()) ?? null
    } catch (cause) { notify(cause instanceof Error ? cause.message : 'SKU 信息加载失败', 'error'); return }
  }
  if (!resolved?.skuId) { notify('未找到该商品对应的有效 SKU', 'error'); return }
  selectedSku.value = resolved; adjustType.value = 2; adjustQuantity.value = 10; adjustReason.value = ''
}

/**
 * 提交库存调整
 * API: POST /api/v1/admin/update/inventory
 * 根据调整类型自动计算增减方向（出库类为负数，入库类为正数）
 */
async function submitAdjust() {
  if (!selectedSku.value?.skuId || submitting.value) return
  const quantity = Math.abs(Number(adjustQuantity.value) || 0)
  if (!quantity) { notify('调整数量必须大于0', 'error'); return }
  if (!adjustReason.value.trim()) { notify('请填写调整原因', 'error'); return }
  const actual = [1, 3, 5].includes(adjustType.value) ? -quantity : quantity
  if (selectedSku.value.stock + actual < 0) { notify('调整后库存不能为负数', 'error'); return }
  submitting.value = true
  try {
    await requestJson('/api/v1/admin/update/inventory', { method: 'POST', headers: headers(true), body: JSON.stringify({ sku_id: selectedSku.value.skuId, type: adjustType.value, quantity: actual, reason: adjustReason.value.trim() }) })
    selectedSku.value = null; notify('库存调整成功，数据已刷新'); await Promise.all([loadDashboard(), loadInventory(), loadLogs()])
  } catch (cause) { notify(cause instanceof Error ? cause.message : '库存调整失败', 'error') }
  finally { submitting.value = false }
}

/** 显示Toast通知消息 */
function notify(message: string, type: 'success' | 'error' = 'success') {
  ;(window as unknown as { showToast?: (text: string, kind: string) => void }).showToast?.(message, type)
}
/** 根据出入库类型返回中文描述 */
function typeText(type: number) { return ({ 1: '销售出库', 2: '采购入库', 3: '损耗', 4: '盘盈', 5: '盘亏' } as Record<number, string>)[type] || '调整' }
/** 根据出入库类型返回对应的颜色类名 */
function typeClass(type: number) { return ({ 1: 'yellow', 2: 'green', 3: 'red', 4: 'green', 5: 'red' } as Record<number, string>)[type] || 'blue' }

/** 组件挂载：并行加载概览、库存列表和出入库记录 */
onMounted(() => Promise.all([loadDashboard(), loadInventory(), loadLogs()]))
</script>

<template>
  <!-- 库存概览统计卡片 -->
  <div class="flex-between mb-4"><div class="stock-page-header"><span class="stock-warehouse-label">总仓</span></div></div>
  <div class="stats-grid stats-row-4">
    <div class="stat-card">
      <div class="label"><i class="fas fa-boxes"></i> 当前总库存</div>
      <div class="value">{{ summary.totalStock.toLocaleString() }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-exclamation-triangle"></i> 低于阈值预警</div>
      <div class="value" style="color:#ef4444">{{ summary.warningCount }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-arrow-down"></i> 今日入库</div>
      <div class="value">{{ summary.todayInbound.toLocaleString() }}</div>
    </div>
    <div class="stat-card">
      <div class="label"><i class="fas fa-arrow-up"></i> 今日出库</div>
      <div class="value">{{ summary.todayOutbound.toLocaleString() }}</div>
    </div>
  </div>
  <div v-if="dashboardError" class="stock-dashboard-error"><i class="fas fa-exclamation-circle"></i> {{ dashboardError }}</div>

  <!-- 低库存预警卡片 -->
  <div class="card warning-card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-exclamation-triangle"></i> 低库存预警</span>
      <span class="status-badge red"><span class="dot"></span> 低于预警阈值</span>
    </div>
    <div class="card-body">
      <template v-if="warnings.length">
        <div class="grid-auto-fill">
          <div v-for="sku in visibleWarnings" :key="sku.skuCode" class="warning-item">
            <div class="item-header">{{ sku.skuCode }} · {{ sku.name }}</div>
            <div class="item-spec">规格: {{ sku.spec }}</div>
            <div class="item-stats"><span>当前库存</span><span class="stat-value">{{ sku.stock }}件</span></div>
            <div class="item-stats"><span>预警阈值</span><span class="stat-threshold">{{ sku.threshold }}件</span></div>
            <button class="btn btn-sm btn-primary warning-replenish-btn" @click="openAdjust(sku)"><i class="fas fa-plus"></i> 补货</button>
          </div>
        </div>
        <div v-if="warningPages > 1" class="stock-pagination warning-pagination">
          <span>共 {{ warnings.length }} 个预警，第 {{ warningPage }} / {{ warningPages }} 页</span>
          <div class="stock-pagination-actions">
            <button class="btn btn-sm btn-outline" :disabled="warningPage <= 1" @click="changeWarningPage(warningPage - 1)"><i class="fas fa-chevron-left"></i> 上一页</button>
            <button class="btn btn-sm btn-outline" :disabled="warningPage >= warningPages" @click="changeWarningPage(warningPage + 1)">下一页 <i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </template>
      <div v-else class="stock-warning-empty">
        <i class="fas fa-check-circle"></i>
        <span>暂无低库存预警</span>
      </div>
    </div>
  </div>

  <!-- 库存查询列表卡片 -->
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-list"></i> 库存查询 · 按 SKU</span>
      <div style="display:flex;align-items:center;gap:8px">
        <input v-model="inventoryKeywordInput" id="stockSearchInput" class="form-inline-input stock-search-input" placeholder="输入 SKU 或商品名称" @keyup.enter="searchInventory" />
        <button class="btn btn-sm btn-primary" @click="searchInventory"><i class="fas fa-search"></i> 查询</button>
        <span class="stock-list-total">共 {{ inventoryTotal }} 条</span>
      </div>
    </div>
    <div class="card-body no-pad">
      <div v-if="inventoryError" class="stock-list-error"><i class="fas fa-exclamation-circle"></i> {{ inventoryError }}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>商品</th>
              <th>规格</th>
              <th>当前库存</th>
              <th>预警阈值</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="inventoryLoading"><td colspan="7"><div class="stock-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载库存...</div></td></tr>
            <tr v-else-if="!inventory.length"><td colspan="7"><div class="stock-table-state"><i class="fas fa-inbox"></i> 暂无库存数据</div></td></tr>
            <tr v-for="sku in inventory" v-else :key="sku.skuCode">
              <td>{{ sku.skuCode }}</td>
              <td>{{ sku.name }}</td>
              <td>{{ sku.spec }}</td>
              <td>{{ sku.stock }}</td>
              <td>{{ sku.threshold }}</td>
              <td><span class="status-badge" :class="sku.status === 'warning' ? 'red' : 'green'"><span class="dot"></span> {{ sku.status === 'warning' ? '预警' : '正常' }}</span></td>
              <td><button class="btn btn-sm btn-outline" @click="openAdjust(sku)">调整</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="stock-pagination">
        <span>第 {{ inventoryPage }} / {{ inventoryPages }} 页</span>
        <div class="stock-pagination-actions">
          <button class="btn btn-sm btn-outline" :disabled="inventoryPage <= 1 || inventoryLoading" @click="changeInventoryPage(inventoryPage - 1)"><i class="fas fa-chevron-left"></i> 上一页</button>
          <button class="btn btn-sm btn-outline" :disabled="inventoryPage >= inventoryPages || inventoryLoading" @click="changeInventoryPage(inventoryPage + 1)">下一页 <i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>

  <!-- 出入库记录卡片 -->
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-history"></i> 出入库记录</span>
      <div style="display:flex;align-items:center;gap:8px">
        <input v-model="logKeywordInput" id="stockLogSkuInput" class="form-inline-input" style="width:120px" placeholder="按 SKU 筛选" @keyup.enter="searchLogs" />
        <input v-model="logDate" type="date" class="form-inline-input" style="width:auto" />
        <button class="btn btn-sm btn-primary" @click="searchLogs"><i class="fas fa-search"></i> 筛选</button>
        <button class="btn btn-sm btn-outline" @click="logKeywordInput='';logKeyword='';logDate='';logPage=1;loadLogs()">重置</button>
      </div>
    </div>
    <div class="card-body no-pad">
      <div v-if="logError" class="stock-list-error"><i class="fas fa-exclamation-circle"></i> {{ logError }}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>SKU / 商品</th>
              <th>类型</th>
              <th>变动数量</th>
              <th>变动前库存</th>
              <th>变动后库存</th>
              <th>原因</th>
              <th>关联订单</th>
              <th>操作人</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="logLoading"><td colspan="9"><div class="stock-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载出入库记录...</div></td></tr>
            <tr v-else-if="!filteredLogs.length"><td colspan="9"><div class="stock-table-state"><i class="fas fa-inbox"></i> 暂无出入库记录</div></td></tr>
            <tr v-for="log in filteredLogs" v-else :key="log.id">
              <td>{{ log.createdAt }}</td>
              <td>
                <div>{{ log.skuCode }} · {{ log.name }}</div>
                <div class="stock-log-spec">{{ log.spec }}</div>
              </td>
              <td><span class="status-badge" :class="typeClass(log.type)"><span class="dot"></span> {{ typeText(log.type) }}</span></td>
              <td :style="{fontWeight:600,color:log.quantity>0?'#22c55e':'#ef4444'}">{{ log.quantity > 0 ? '+' : '' }}{{ log.quantity }}</td>
              <td>{{ log.beforeStock }}</td>
              <td>{{ log.afterStock }}</td>
              <td>{{ log.reason }}</td>
              <td>{{ log.orderId }}</td>
              <td>{{ log.operator }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="stock-pagination">
        <span>第 {{ logPage }} / {{ logPages }} 页，共 {{ logTotal }} 条</span>
        <div class="stock-pagination-actions">
          <button class="btn btn-sm btn-outline" :disabled="logPage <= 1 || logLoading" @click="changeLogPage(logPage - 1)"><i class="fas fa-chevron-left"></i> 上一页</button>
          <button class="btn btn-sm btn-outline" :disabled="logPage >= logPages || logLoading" @click="changeLogPage(logPage + 1)">下一页 <i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>

  <!-- 手动调整库存弹窗 -->
  <template v-if="selectedSku">
    <div class="modal-overlay" @click="selectedSku=null"></div>
    <div class="modal-content modal-width-sm">
      <div class="modal-header">
        <h3><i class="fas fa-edit"></i> 手动调整库存</h3>
        <button class="modal-close" @click="selectedSku=null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <label class="form-label">调整类型</label>
        <div class="type-radio-group stock-type-grid">
          <label v-for="item in adjustmentTypes" :key="item.value" class="type-radio-option" :class="{selected:adjustType===item.value}" @click="adjustType=item.value">
            <input v-model="adjustType" type="radio" name="stockType" :value="item.value" />
            <div class="option-title" :class="item.positive?'success-color':'warn-color'">{{ item.name }}</div>
            <div class="option-desc">{{ item.desc }}</div>
          </label>
        </div>
        <div style="margin:16px 0">
          <label class="form-label">调整商品</label>
          <div class="selected-sku-info stock-selected-sku" style="display:block">
            <div class="sku-name">{{ selectedSku.name }} - {{ selectedSku.spec }}</div>
            <div class="sku-code">{{ selectedSku.skuCode }}</div>
            <div id="selectedSkuStock" class="sku-stock">SKU ID: {{ selectedSku.skuId }} · 当前库存: {{ selectedSku.stock }}件</div>
          </div>
        </div>
        <label class="form-label">调整数量</label>
        <div class="quantity-adjust-group">
          <button class="btn btn-outline btn-sm" @click="adjustQuantity=Math.max(1,adjustQuantity-10)"><i class="fas fa-minus"></i></button>
          <button class="btn btn-outline btn-sm" @click="adjustQuantity=Math.max(1,adjustQuantity-1)"><i class="fas fa-minus"></i></button>
          <input v-model.number="adjustQuantity" id="stockQuantity" type="number" class="quantity-input" />
          <button class="btn btn-outline btn-sm" @click="adjustQuantity++"><i class="fas fa-plus"></i></button>
          <button class="btn btn-outline btn-sm" @click="adjustQuantity+=10"><i class="fas fa-plus"></i></button>
        </div>
        <div class="quantity-hint">填写正整数，系统会根据调整类型自动设置增减方向</div>
        <div style="margin-top:16px">
          <label class="form-label">调整原因</label>
          <textarea v-model="adjustReason" id="stockReason" rows="2" class="form-textarea" placeholder="请填写调整原因..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="selectedSku=null">取消</button>
        <button id="stockAdjustSubmit" class="btn btn-primary" :disabled="submitting" @click="submitAdjust"><i class="fas" :class="submitting?'fa-spinner fa-spin':'fa-save'"></i> {{ submitting ? '提交中' : '确认调整' }}</button>
      </div>
    </div>
  </template>
</template>
