<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

type ConfigKind = 'order' | 'stock'
interface SystemConfig { configKey: string; configValue: string; description: string }

const props = defineProps<{ token?: string; kind: ConfigKind }>()
const emit = defineEmits<{ saved: [] }>()
const loading = ref(false)
const saving = ref(false)
const loadError = ref('')
const availableKeys = ref(new Set<string>())
const orderForm = reactive({ autoCancelMinutes: 30, autoCompleteDays: 15, afterSaleDays: 7 })
const stockForm = reactive({ warningThreshold: 10, warningEnabled: true })

const title = computed(() => props.kind === 'order' ? '订单超时配置' : '库存预警配置')
const icon = computed(() => props.kind === 'order' ? 'fas fa-clock' : 'fas fa-exclamation-triangle')

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
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

function listFrom(data: any): any[] {
  if (Array.isArray(data)) return data
  return data?.list ?? data?.items ?? data?.records ?? data?.configs ?? []
}

function notify(message: string, type: 'success' | 'error' = 'success') {
  window.showToast?.(message, type)
}

function normalizedConfigs(data: any): SystemConfig[] {
  return listFrom(data).map((row: any) => ({
    configKey: String(row.configKey ?? row.config_key ?? ''),
    configValue: String(row.configValue ?? row.config_value ?? ''),
    description: String(row.description ?? ''),
  }))
}

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

function validate() {
  if (props.kind === 'order') {
    if (![orderForm.autoCancelMinutes, orderForm.autoCompleteDays, orderForm.afterSaleDays].every(value => Number.isInteger(value) && value > 0)) {
      throw new Error('订单超时配置必须为大于 0 的整数')
    }
  } else if (!Number.isInteger(stockForm.warningThreshold) || stockForm.warningThreshold < 0) {
    throw new Error('库存预警阈值必须为不小于 0 的整数')
  }
}

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

onMounted(loadConfigs)
</script>

<template>
  <div class="card business-config-card">
    <div class="card-header">
      <span class="card-title"><i :class="icon"></i> {{ title }}</span>
      <button class="btn btn-sm btn-primary" :disabled="loading || saving || !payloadConfigs().length" @click="save"><i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i> {{ saving ? '保存中' : '保存' }}</button>
    </div>
    <div v-if="loadError" class="business-config-error">
      <i class="fas fa-exclamation-circle"></i> {{ loadError }}
      <button class="btn btn-sm btn-outline" @click="loadConfigs">重试</button>
    </div>
    <div class="card-body">
      <div v-if="loading" class="business-config-state"><i class="fas fa-spinner fa-spin"></i> 配置加载中...</div>
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
.business-config-card{max-width:920px}.business-config-grid{display:grid;grid-template-columns:repeat(2,minmax(240px,1fr));gap:22px 36px}.business-config-grid label{display:flex;flex-direction:column;gap:9px;color:#64748b;font-size:13px}.number-control{display:flex;align-items:center;gap:10px;color:#334155;font-size:15px}.number-control input{width:110px;padding:8px 10px;border:1px solid #dbe3ee;border-radius:6px;font:inherit}.toggle-control{grid-column:1/-1;flex-direction:row!important;align-items:center}.business-config-error{padding:10px 16px;color:#b91c1c;background:#fef2f2}.business-config-state{padding:28px;text-align:center;color:#94a3b8}@media(max-width:720px){.business-config-grid{grid-template-columns:1fr}.business-config-card{max-width:none}}
</style>
