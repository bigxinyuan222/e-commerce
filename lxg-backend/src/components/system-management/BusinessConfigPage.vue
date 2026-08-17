<!--
  @file BusinessConfigPage.vue
  @description 商业配置页面组件（订单超时配置 / 库存预警配置）
  @module 系统管理模块
  @key-features 根据kind属性展示不同配置表单（订单/库存）、加载配置、校验、保存
  @props kind - 配置类型：order（订单配置）/ stock（库存配置）
  @emits saved - 保存成功后触发
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

/** 配置类型：order（订单配置）/ stock（库存配置） */
type ConfigKind = 'order' | 'stock'

/** 系统配置数据结构 */
interface SystemConfig { configKey: string; configValue: string; description: string }

const props = defineProps<{ token?: string; kind: ConfigKind }>()
const emit = defineEmits<{ saved: [] }>()

// ===== 响应式状态 =====
const loading = ref(false)                    // 加载状态
const saving = ref(false)                    // 保存中状态
const loadError = ref('')                    // 加载错误信息
const availableKeys = ref(new Set<string>()) // 接口返回的可用配置key集合

// 订单配置表单：自动取消时间、自动完成天数、售后有效期
const orderForm = reactive({ autoCancelMinutes: 30, autoCompleteDays: 15, afterSaleDays: 7 })
// 库存配置表单：预警阈值、是否启用预警
const stockForm = reactive({ warningThreshold: 10, warningEnabled: true })

/** 卡片标题（根据kind动态显示） */
const title = computed(() => props.kind === 'order' ? '订单超时配置' : '库存预警配置')
/** 卡片图标（根据kind动态显示） */
const icon = computed(() => props.kind === 'order' ? 'fas fa-clock' : 'fas fa-exclamation-triangle')

/** 配置项定义：每种kind对应的配置key、表单字段名和描述 */
const definitions = {
  order: [
    { key: 'order_auto_cancel_minutes', field: 'autoCancelMinutes', description: '待支付订单自动取消时间（分钟）' },
    { key: 'order_auto_complete_days', field: 'autoCompleteDays', description: '确认收货自动完成时间（天）' },
    { key: 'order_after_sale_days', field: 'afterSaleDays', description: '售后申请有效期（天）' },
  ],
  stock: [
    { key: 'inventory_warning_value', field: 'warningThreshold', description: '库存预警阈值' },
    { key: 'inventory_warning_enabled', field: 'warningEnabled', description: '是否启用库存预警通知' },
  ],
} as const

/** 构建带认证信息的请求头，可选设置JSON Content-Type */
function headers(json = false) {
  const result = new Headers()
  if (props.token) result.set('Authorization', `Bearer ${props.token}`)
  if (json) result.set('Content-Type', 'application/json')
  return result
}

/** 统一请求封装，处理响应码和错误 */
async function request(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && ![0, 200].includes(payload.code))) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

/** 从接口返回数据中提取列表，兼容多种字段名 */
function listFrom(data: any): any[] {
  if (Array.isArray(data)) return data
  return data?.list ?? data?.items ?? data?.records ?? data?.configs ?? []
}

/** 显示Toast通知消息 */
function notify(message: string, type: 'success' | 'error' = 'success') {
  window.showToast?.(message, type)
}

/** 将后端返回的原始配置数据映射为标准SystemConfig结构 */
function normalizedConfigs(data: any): SystemConfig[] {
  return listFrom(data).map((row: any) => ({
    configKey: String(row.configKey ?? row.config_key ?? ''),
    configValue: String(row.configValue ?? row.config_value ?? ''),
    description: String(row.description ?? ''),
  }))
}

/**
 * 加载系统配置
 * @api GET /api/v1/admin/system/configs - 获取所有系统配置
 * @description 根据kind类型填充对应表单，仅取相关配置项
 */
async function loadConfigs() {
  loading.value = true
  loadError.value = ''
  try {
    const data = await request('/api/v1/admin/system/configs', { headers: headers() })
    const configs = normalizedConfigs(data)
    availableKeys.value = new Set(configs.map(config => config.configKey))
    const byKey = new Map(configs.map(config => [config.configKey, config.configValue]))
    if (props.kind === 'order') {
      orderForm.autoCancelMinutes = Number(byKey.get('order_auto_cancel_minutes') ?? 30)
      orderForm.autoCompleteDays = Number(byKey.get('order_auto_complete_days') ?? 15)
      orderForm.afterSaleDays = Number(byKey.get('order_after_sale_days') ?? 7)
    } else {
      stockForm.warningThreshold = Number(byKey.get('inventory_warning_value') ?? 10)
      stockForm.warningEnabled = !['0', 'false', 'off'].includes(String(byKey.get('inventory_warning_enabled') ?? '1').toLowerCase())
    }
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : '配置加载失败'
  } finally {
    loading.value = false
  }
}

/** 表单校验：订单配置需正整数，库存阈值需非负整数 */
function validate() {
  if (props.kind === 'order') {
    if (![orderForm.autoCancelMinutes, orderForm.autoCompleteDays, orderForm.afterSaleDays].every(value => Number.isInteger(value) && value > 0)) {
      throw new Error('订单超时配置必须为大于 0 的整数')
    }
  } else if (!Number.isInteger(stockForm.warningThreshold) || stockForm.warningThreshold < 0) {
    throw new Error('库存预警阈值必须为不小于 0 的整数')
  }
}

/** 构建保存请求的配置payload，仅包含接口已返回的配置项 */
function payloadConfigs(): SystemConfig[] {
  if (props.kind === 'order') return definitions.order.filter(item => availableKeys.value.has(item.key)).map(item => ({
    configKey: item.key,
    configValue: String(orderForm[item.field]),
    description: item.description,
  }))
  return definitions.stock.filter(item => availableKeys.value.has(item.key)).map(item => ({
    configKey: item.key,
    configValue: item.field === 'warningEnabled' ? (stockForm.warningEnabled ? '1' : '0') : String(stockForm.warningThreshold),
    description: item.description,
  }))
}

/**
 * 保存配置
 * @api PUT /api/v1/admin/system/configs - 批量更新配置
 * @description 校验后提交，成功后重新加载配置并触发saved事件
 */
async function save() {
  try {
    validate()
    if (!payloadConfigs().length) throw new Error('接口未返回该页面对应的配置项')
    saving.value = true
    await request('/api/v1/admin/system/configs', {
      method: 'PUT', headers: headers(true), body: JSON.stringify({ configs: payloadConfigs() }),
    })
    notify(`${title.value}保存成功`)
    await loadConfigs()
    emit('saved')
  } catch (error) {
    notify(error instanceof Error ? error.message : '保存失败', 'error')
  } finally {
    saving.value = false
  }
}

// ===== 生命周期：组件挂载时加载配置 =====
onMounted(loadConfigs)
</script>

<template>
  <!-- 商业配置卡片 -->
  <div class="card business-config-card">
    <div class="card-header">
      <span class="card-title"><i :class="icon"></i> {{ title }}</span>
      <button class="btn btn-sm btn-primary" :disabled="loading || saving || !payloadConfigs().length" @click="save"><i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i> {{ saving ? '保存中' : '保存' }}</button>
    </div>
    <!-- 错误提示 -->
    <div v-if="loadError" class="business-config-error">
      <i class="fas fa-exclamation-circle"></i> {{ loadError }}
      <button class="btn btn-sm btn-outline" @click="loadConfigs">重试</button>
    </div>
    <!-- 配置表单区域 -->
    <div class="card-body">
      <div v-if="loading" class="business-config-state"><i class="fas fa-spinner fa-spin"></i> 配置加载中...</div>
      <!-- 订单配置表单 -->
      <div v-else-if="kind === 'order' && payloadConfigs().length" class="business-config-grid">
        <label v-if="availableKeys.has('order_auto_cancel_minutes')">
          <span>待支付订单自动取消时间</span>
          <span class="number-control"><input v-model.number="orderForm.autoCancelMinutes" type="number" min="1" step="1" /> 分钟</span>
        </label>
        <label v-if="availableKeys.has('order_auto_complete_days')">
          <span>确认收货自动完成时间</span>
          <span class="number-control"><input v-model.number="orderForm.autoCompleteDays" type="number" min="1" step="1" /> 天</span>
        </label>
        <label v-if="availableKeys.has('order_after_sale_days')">
          <span>售后申请有效期</span>
          <span class="number-control"><input v-model.number="orderForm.afterSaleDays" type="number" min="1" step="1" /> 天</span>
        </label>
      </div>
      <!-- 库存配置表单 -->
      <div v-else-if="kind === 'stock' && payloadConfigs().length" class="business-config-grid">
        <label v-if="availableKeys.has('inventory_warning_value')">
          <span>库存预警阈值</span>
          <span class="number-control"><input v-model.number="stockForm.warningThreshold" type="number" min="0" step="1" /> 件</span>
        </label>
        <label v-if="availableKeys.has('inventory_warning_enabled')" class="toggle-control">
          <input v-model="stockForm.warningEnabled" type="checkbox" />
          <span>启用库存预警通知</span>
        </label>
      </div>
      <div v-else class="business-config-state">接口未返回对应配置项</div>
    </div>
  </div>
</template>

<style scoped>
/* 商业配置卡片基础样式 */
.business-config-card{max-width:920px}
/* 配置表单网格布局 */
.business-config-grid{display:grid;grid-template-columns:repeat(2,minmax(240px,1fr));gap:22px 36px}.business-config-grid label{display:flex;flex-direction:column;gap:9px;color:#64748b;font-size:13px}
/* 数字输入控件样式 */
.number-control{display:flex;align-items:center;gap:10px;color:#334155;font-size:15px}.number-control input{width:110px;padding:8px 10px;border:1px solid #dbe3ee;border-radius:6px;font:inherit}
/* 开关控件样式（跨整行） */
.toggle-control{grid-column:1/-1;flex-direction:row!important;align-items:center}
/* 错误提示和加载状态样式 */
.business-config-error{padding:10px 16px;color:#b91c1c;background:#fef2f2}.business-config-state{padding:28px;text-align:center;color:#94a3b8}
/* 响应式：720px以下改为单列 */
@media(max-width:720px){.business-config-grid{grid-template-columns:1fr}.business-config-card{max-width:none}}
</style>
