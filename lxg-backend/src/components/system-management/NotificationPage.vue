<!--
  @file NotificationPage.vue
  @description 系统通知管理页面组件
  @module 系统管理模块
  @key-features 通知发送（立即/定时、全部/指定用户）、通知记录查看与筛选、通知模板管理（增删改查）、通知详情查看
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

/** ID类型，可能为数字或字符串 */
type Id = string | number
/** 标签页类型：send（发送通知）/ record（通知记录）/ template（通知模板管理） */
type Tab = 'send' | 'record' | 'template'
/** 弹窗类型：preview（预览）/ detail（详情）/ data（数据）/ null（关闭） */
type Modal = { kind: 'preview' } | { kind: 'detail'; item: NotificationItem } | { kind: 'data'; item: NotificationItem } | null

/** 通知记录数据结构 */
interface NotificationItem {
  id: Id
  title: string
  content: string
  type: 'order' | 'activity' | 'system'
  scope: string
  totalCount: number
  deliveredCount: number
  sendCount: number
  readCount: number
  readRate: number
  status: 'sent' | 'sending' | 'cancelled'
  time: string
}

/** 通知模板数据结构 */
interface TemplateItem {
  id: Id
  name: string
  type: 'order' | 'activity' | 'system'
  category: string
  title: string
  content: string
  trigger: string
}

/** 用户数据结构（用于指定接收用户搜索） */
interface UserItem { id: Id; username: string; phone: string }

const props = defineProps<{ token?: string }>()

// ===== 响应式状态 =====
const tab = ref<Tab>('send')                        // 当前激活标签页
const notifications = ref<NotificationItem[]>([])  // 通知记录列表
const templates = ref<TemplateItem[]>([])           // 通知模板列表
const selectedTemplateId = ref<Id | ''>('')         // 当前选中的模板ID
const loadingRecords = ref(false)                   // 通知记录加载中
const loadingTemplates = ref(false)                 // 模板列表加载中
const templateTypeFilter = ref(0)                   // 模板类型筛选（0=全部）
const templatePage = ref(1)                         // 模板列表当前页码
const templatePageSize = 20                         // 模板每页条数
const templateTotal = ref(0)                        // 模板总数
const submitting = ref(false)                      // 通知发送提交中
const searchingUsers = ref(false)                   // 用户搜索中
const userDirectory = ref<UserItem[]>([])           // 全量用户目录（懒加载缓存）
const usersLoaded = ref(false)                     // 用户目录是否已加载
const userDirectoryError = ref('')                  // 用户目录加载错误
const searchResults = ref<UserItem[]>([])            // 用户搜索结果
const selectedUsers = ref<UserItem[]>([])            // 已选择的接收用户
const userKeyword = ref('')                         // 用户搜索关键词
const recordKeyword = ref('')                       // 通知记录搜索关键词
const typeFilter = ref('all')                       // 通知类型筛选
const statusFilter = ref('all')                     // 通知状态筛选
const page = ref(1)                                // 通知记录当前页码
const pageSize = 20                                // 通知记录每页条数
const total = ref(0)                               // 通知记录总数
const modal = ref<Modal>(null)                      // 弹窗状态
const detailLoading = ref(false)                   // 通知详情加载中
const detailLoadedId = ref<Id | null>(null)         // 已加载详情的通知ID

// 通知编辑表单：类型、标题、内容、接收范围、发送方式、定时时间
const form = reactive({ type: 1, title: '', content: '', targetScope: 1, sendType: 1, sendTime: '' })
// 模板编辑表单
const templateForm = reactive({ id: '' as Id | '', name: '', type: 1, category: '自定义', title: '', content: '', trigger: '手动触发' })
// 模板表单初始值快照（用于重置）
const templateInitial = ref({ ...templateForm })

/** 构建带认证信息的请求头，可选设置JSON Content-Type */
function headers(json = false) {
  const value = new Headers()
  if (json) value.set('Content-Type', 'application/json')
  if (props.token) value.set('Authorization', `Bearer ${props.token}`)
  return value
}

/** 统一请求封装，处理响应码和错误，返回data字段 */
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

/** 从接口返回数据中提取列表，兼容多种字段名 */
function listFrom(value: any): any[] { return Array.isArray(value) ? value : value?.list ?? value?.items ?? value?.records ?? value?.users ?? value?.data ?? [] }

/** 显示Toast通知消息 */
function notify(text: string, type: 'success' | 'error' = 'success') { ;(window as any).showToast?.(text, type) }

/** 将通知类型字段归一化为标准type（order/activity/system） */
function typeKey(value: unknown): NotificationItem['type'] {
  if (value === 1 || value === '1' || value === 'order') return 'order'
  if (value === 2 || value === '2' || value === 'activity') return 'activity'
  return 'system'
}

/** 将通知类型转换为数字编码（1=订单/2=活动/3=系统） */
function typeNumber(value: NotificationItem['type']) { return value === 'order' ? 1 : value === 'activity' ? 2 : 3 }

/** 将通知类型转换为中文显示文本 */
function typeText(value: NotificationItem['type']) { return { order: '订单通知', activity: '活动通知', system: '系统维护' }[value] }

/** 将通知状态转换为中文显示文本 */
function statusText(value: NotificationItem['status']) { return { sent: '已送达', sending: '发送中', cancelled: '已撤销' }[value] }

/** 手机号脱敏处理（中间4位替换为*） */
function maskPhone(value: string) { return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }

/**
 * 将后端原始通知数据映射为标准NotificationItem结构
 * @param row - 后端原始通知数据
 * @returns 标准化的通知数据对象
 */
function notificationView(row: any): NotificationItem {
  row = {
    ...row,
    target_scope: row.target_scope ?? row.targetScope,
    total_count: row.total_count ?? row.receiverCount ?? row.receiver_count,
    delivered_count: row.delivered_count ?? row.deliveredCount ?? row.receiverCount ?? row.receiver_count,
    created_at: row.created_at ?? row.CreatedAt ?? row.createdAt,
  }
  return {
    id: row.ID ?? row.id,
    title: String(row.title ?? ''), content: String(row.content ?? ''), type: typeKey(row.type),
    scope: String(row.scope ?? row.target_scope_text ?? (Number(row.target_scope) === 2 ? '指定用户' : '全部用户')),
    totalCount: Number(row.total_count ?? row.totalCount ?? row.target_count) || 0,
    deliveredCount: Number(row.delivered_count ?? row.deliveredCount) || 0,
    sendCount: Number(row.send_count ?? row.sendCount ?? row.SendCount) || 0,
    readCount: Number(row.read_count ?? row.readCount ?? row.ReadCount) || 0,
    readRate: Number(row.read_rate ?? row.readRate ?? row.ReadRate) || 0,
    status: row.status === 2 || row.status === 'sending' ? 'sending' : row.status === 3 || row.status === 'cancelled' ? 'cancelled' : 'sent',
    time: String(row.created_at ?? row.createdAt ?? row.time ?? ''),
  }
}

/** 将后端原始模板数据映射为标准TemplateItem结构 */
function templateView(row: any): TemplateItem {
  return {
    id: row.ID ?? row.id, name: String(row.name ?? ''), type: typeKey(row.type), category: String(row.category ?? '自定义'),
    title: String(row.title_template ?? row.titleTemplate ?? row.title ?? ''), content: String(row.content_template ?? row.contentTemplate ?? row.content ?? ''),
    trigger: String(row.trigger ?? '手动触发'),
  }
}

// ===== 计算属性 =====
/** 根据关键词、类型、状态过滤后的通知记录列表 */
const filteredRecords = computed(() => notifications.value.filter(item => {
  const keyword = recordKeyword.value.trim().toLowerCase()
  return (typeFilter.value === 'all' || item.type === typeFilter.value)
    && (statusFilter.value === 'all' || item.status === statusFilter.value)
    && (!keyword || item.title.toLowerCase().includes(keyword) || String(item.id).toLowerCase().includes(keyword))
}))

/** 通知记录总页数 */
const totalPages = computed(() => Math.max(1, Math.ceil((total.value || filteredRecords.value.length) / pageSize)))

/** 当前页的通知记录 */
const pageRecords = computed(() => total.value > notifications.value.length ? filteredRecords.value : filteredRecords.value.slice((page.value - 1) * pageSize, page.value * pageSize))

/** 当前页通知统计（数量、接收人数、送达人数、送达率） */
const recordStats = computed(() => {
  const records = pageRecords.value
  const recipients = records.reduce((sum, item) => sum + item.totalCount, 0)
  const delivered = records.reduce((sum, item) => sum + item.deliveredCount, 0)
  return {
    count: records.length,
    recipients,
    delivered,
    deliveryRate: recipients ? (delivered / recipients * 100).toFixed(1) : '0.0',
  }
})

/** 当前选中的模板对象 */
const selectedTemplate = computed(() => templates.value.find(item => String(item.id) === String(selectedTemplateId.value)))

/**
 * 监听弹窗变化：打开详情弹窗时自动加载通知详情数据
 * @api GET /api/v1/admin/notifications/{id} - 获取通知详情
 */
watch(modal, async (next) => {
  if (!next || next.kind !== 'detail') {
    detailLoadedId.value = null
    return
  }
  if (String(detailLoadedId.value) === String(next.item.id) || detailLoading.value) return
  const requestedId = next.item.id
  detailLoading.value = true
  try {
    const data = await requestJson(`/api/v1/admin/notifications/${encodeURIComponent(String(requestedId))}`, { headers: headers() })
    detailLoadedId.value = requestedId
    if (modal.value?.kind === 'detail' && String(modal.value.item.id) === String(requestedId)) {
      modal.value = { kind: 'detail', item: notificationView(data) }
    }
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : '通知详情加载失败', 'error')
  } finally {
    detailLoading.value = false
  }
})

/**
 * 加载通知记录列表
 * @api GET /api/v1/admin/notifications - 分页获取通知记录，支持类型筛选
 */
async function loadNotifications() {
  loadingRecords.value = true
  try {
    const params = new URLSearchParams({ page: String(page.value), page_size: String(pageSize) })
    if (typeFilter.value !== 'all') params.set('type', String(typeNumber(typeFilter.value as NotificationItem['type'])))
    const data = await requestJson(`/api/v1/admin/notifications?${params}`, { headers: headers() })
    notifications.value = listFrom(data).map(notificationView)
    total.value = Number(data?.total ?? data?.total_count ?? data?.count) || notifications.value.length
  } catch (cause) { notifications.value = []; total.value = 0; notify(cause instanceof Error ? cause.message : '通知记录加载失败', 'error') }
  finally { loadingRecords.value = false }
}

/**
 * 加载通知模板列表
 * @api GET /api/v1/admin/notification-templates - 分页获取通知模板，支持类型筛选
 * @description 加载后自动选中第一个模板
 */
async function loadTemplates() {
  loadingTemplates.value = true
  try {
    const params = new URLSearchParams({ page: String(templatePage.value), page_size: String(templatePageSize) })
    if (templateTypeFilter.value) params.set('type', String(templateTypeFilter.value))
    const data = await requestJson(`/api/v1/admin/notification-templates?${params}`, { headers: headers() })
    templates.value = listFrom(data).map(templateView)
    templateTotal.value = Number(data?.total ?? data?.total_count ?? data?.count) || templates.value.length
    if (!templates.value.some(item => String(item.id) === String(selectedTemplateId.value))) selectTemplate(templates.value[0] ?? null)
  } catch (cause) { templates.value = []; templateTotal.value = 0; notify(cause instanceof Error ? cause.message : '通知模板加载失败', 'error') }
  finally { loadingTemplates.value = false }
}

/**
 * 加载全量用户目录（懒加载，分页拉取并去重）
 * @api GET /api/v1/get/users - 分页获取用户列表
 * @description 最多拉取200页用户，用于指定接收用户搜索
 */
async function loadUserDirectory() {
  if (usersLoaded.value) return
  searchingUsers.value = true
  userDirectoryError.value = ''
  try {
    const pageSize = 10
    const firstPage = await requestJson(`/api/v1/get/users?page=1&size=${pageSize}`, { headers: headers() })
    const totalUsers = Number(firstPage?.total ?? firstPage?.total_count ?? firstPage?.count) || listFrom(firstPage).length
    const pageCount = Math.min(200, Math.max(1, Math.ceil(totalUsers / pageSize)))
    const remainingPages = await Promise.all(Array.from({ length: pageCount - 1 }, (_, index) =>
      requestJson(`/api/v1/get/users?page=${index + 2}&size=${pageSize}`, { headers: headers() })
    ))
    const rows = [firstPage, ...remainingPages].flatMap(listFrom)
    const mapped = rows.map(row => ({
      id: row.ID ?? row.id ?? row.user_id ?? row.userId,
      username: String(row.UserName ?? row.userName ?? row.username ?? row.Name ?? row.name ?? row.Nickname ?? row.nickname ?? row.RealName ?? row.realName ?? ''),
      phone: String(row.Phone ?? row.phone ?? row.Mobile ?? row.mobile ?? ''),
    })).filter(item => item.id !== undefined && (item.phone || item.username))
    userDirectory.value = [...new Map(mapped.map(item => [String(item.id), item])).values()]
    usersLoaded.value = true
  } catch (cause) {
    userDirectory.value = []
    userDirectoryError.value = cause instanceof Error ? cause.message : '用户列表加载失败'
  } finally { searchingUsers.value = false }
}

/**
 * 搜索用户（从已加载的用户目录中过滤）
 * @param autoSelectExact - 是否自动选择精确匹配的用户
 * @description 输入11位手机号时自动选中匹配用户
 */
async function searchUsers(autoSelectExact = false) {
  const keyword = userKeyword.value.trim()
  if (!keyword) { searchResults.value = []; return }
  await loadUserDirectory()
  const normalized = keyword.toLowerCase()
  searchResults.value = userDirectory.value.filter(item => item.phone.includes(keyword) || item.username.toLowerCase().includes(normalized)).slice(0, 20)
  const exact = searchResults.value.filter(item => item.phone === keyword || item.username.toLowerCase() === normalized)
  if ((autoSelectExact || /^\d{11}$/.test(keyword)) && exact.length === 1 && !selectedUsers.value.some(item => String(item.id) === String(exact[0].id))) selectedUsers.value.push(exact[0])
}

/** 切换用户选中状态（添加/移除） */
function toggleUser(user: UserItem) {
  const index = selectedUsers.value.findIndex(item => String(item.id) === String(user.id))
  if (index >= 0) selectedUsers.value.splice(index, 1); else selectedUsers.value.push(user)
}

/** 定时发送时设置默认时间（当前时间+5分钟） */
function setScheduledDefault() {
  if (form.sendType !== 2 || form.sendTime) return
  const next = new Date(Date.now() + 5 * 60_000); next.setMinutes(next.getMinutes() - next.getTimezoneOffset())
  form.sendTime = next.toISOString().slice(0, 16)
}

/** 表单校验：标题、内容、指定用户、定时时间 */
function validateForm() {
  if (!form.title.trim()) throw new Error('请输入通知标题')
  if (!form.content.trim()) throw new Error('请输入通知内容')
  if (form.targetScope === 2 && !selectedUsers.value.length) throw new Error('请选择接收通知的用户')
  if (form.sendType === 2 && !form.sendTime) throw new Error('请选择定时发送时间')
}

/**
 * 发送通知
 * @api POST /api/v1/admin/notifications - 发送通知
 * @description 校验表单后提交，指定用户模式时自动尝试根据手机号匹配用户
 */
async function sendNotification() {
  try {
    if (form.targetScope === 2 && !selectedUsers.value.length && userKeyword.value.trim()) await searchUsers(true)
    if (form.targetScope === 2 && !selectedUsers.value.length && /^\d{11}$/.test(userKeyword.value.trim())) {
      if (!userDirectory.value.length) throw new Error(userDirectoryError.value || '用户目录为空，无法根据手机号选择接收用户')
      throw new Error(`未在用户列表中找到手机号 ${userKeyword.value.trim()} 对应的用户`)
    }
    validateForm(); submitting.value = true
    await requestJson('/api/v1/admin/notifications', { method: 'POST', headers: headers(true), body: JSON.stringify({
      title: form.title.trim(), content: form.content.trim(), type: form.type, targetScope: form.targetScope,
      targetIds: form.targetScope === 2 ? selectedUsers.value.map(item => Number(item.id) || item.id) : [], sendType: form.sendType,
      ...(form.sendType === 2 ? { sendTime: form.sendTime } : {}),
    }) })
    modal.value = null; notify('通知发送成功'); await loadNotifications()
  } catch (cause) { notify(cause instanceof Error ? cause.message : '通知发送失败', 'error') }
  finally { submitting.value = false }
}

/** 保存通知草稿到localStorage */
function saveDraft() {
  try { validateForm(); localStorage.setItem('lxg_notification_draft', JSON.stringify({ ...form, selectedUsers: selectedUsers.value })); notify('通知草稿已保存') }
  catch (cause) { notify(cause instanceof Error ? cause.message : '草稿保存失败', 'error') }
}

/**
 * 选中通知模板，填充模板编辑表单
 * @param item - 模板对象，传null表示新建
 */
function selectTemplate(item: TemplateItem | null) {
  selectedTemplateId.value = item?.id ?? ''
  const initial = item ? { id: item.id, name: item.name, type: typeNumber(item.type), category: item.category, title: item.title, content: item.content, trigger: item.trigger } : { id: '' as Id | '', name: '', type: 1, category: '自定义', title: '', content: '', trigger: '手动触发' }
  Object.assign(templateForm, initial)
  templateInitial.value = { ...initial }
}

/** 使用当前模板填充发送表单，并切换到发送标签页 */
function useTemplate() { const item = selectedTemplate.value; if (!item) return; form.type = typeNumber(item.type); form.title = item.title; form.content = item.content; tab.value = 'send' }

/** 复制当前模板为新建（清空ID，名称加"- 副本"后缀） */
function copyTemplate() { templateForm.id = ''; templateForm.name = `${templateForm.name} - 副本`; selectedTemplateId.value = ''; templateInitial.value = { ...templateForm } }

/** 重置模板表单为初始值 */
function resetTemplateForm() { Object.assign(templateForm, templateInitial.value) }

/**
 * 保存通知模板（新增或更新）
 * @api POST /api/v1/admin/notification-templates - 新增模板
 * @api PUT /api/v1/admin/notification-templates/{id} - 更新模板
 */
async function saveTemplate() {
  if (!templateForm.name.trim() || !templateForm.title.trim() || !templateForm.content.trim()) { notify('请完整填写模板名称、标题和内容', 'error'); return }
  const editing = templateForm.id !== ''; const url = editing ? `/api/v1/admin/notification-templates/${templateForm.id}` : '/api/v1/admin/notification-templates'
  try {
    await requestJson(url, { method: editing ? 'PUT' : 'POST', headers: headers(true), body: JSON.stringify({
      name: templateForm.name.trim(), type: templateForm.type, titleTemplate: templateForm.title.trim(), contentTemplate: templateForm.content.trim()
    }) })
    notify(editing ? '模板已更新' : '模板已创建'); await loadTemplates()
  } catch (cause) { notify(cause instanceof Error ? cause.message : '模板保存失败', 'error') }
}

/**
 * 删除通知模板（二次确认后执行）
 * @api DELETE /api/v1/admin/notification-templates/{id} - 删除模板
 */
async function deleteTemplate() {
  if (!templateForm.id || !window.confirm('确定删除此通知模板吗？')) return
  try { await requestJson(`/api/v1/admin/notification-templates/${encodeURIComponent(String(templateForm.id))}`, { method: 'DELETE', headers: headers() }); notify('模板已删除'); await loadTemplates() }
  catch (cause) { notify(cause instanceof Error ? cause.message : '模板删除失败', 'error') }
}

/**
 * 删除通知记录（二次确认后执行）
 * @api DELETE /api/v1/admin/notifications/{id} - 删除通知
 */
async function deleteNotification(item: NotificationItem) {
  if (!window.confirm(`确定删除通知“${item.title}”吗？`)) return
  try { await requestJson(`/api/v1/admin/notifications/${encodeURIComponent(String(item.id))}`, { method: 'DELETE', headers: headers() }); notify('通知已删除'); await loadNotifications() }
  catch (cause) { notify(cause instanceof Error ? cause.message : '通知删除失败', 'error') }
}

/** 切换标签页，自动加载对应数据 */
async function switchTab(next: Tab) { tab.value = next; if (next === 'record') await loadNotifications(); if (next === 'template') await loadTemplates() }

/** 翻页操作 */
async function changePage(next: number) { if (next < 1 || next > totalPages.value) return; page.value = next; await loadNotifications() }

// ===== 生命周期：组件挂载时恢复草稿并加载通知记录和模板 =====
onMounted(async () => {
  const draft = localStorage.getItem('lxg_notification_draft')
  if (draft) { try { const value = JSON.parse(draft); Object.assign(form, value); selectedUsers.value = value.selectedUsers ?? [] } catch { /* ignore invalid draft */ } }
  await Promise.all([loadNotifications(), loadTemplates()])
})
</script>

<template>
  <!-- 标签页切换：发送通知 / 通知记录 / 通知模板管理 -->
  <div class="notification-tabs">
    <button class="system-notif-tab" :class="{ active: tab === 'send' }" @click="switchTab('send')"><i class="fas fa-paper-plane"></i>发送通知</button>
    <button class="system-notif-tab" :class="{ active: tab === 'record' }" @click="switchTab('record')"><i class="fas fa-history"></i>通知记录</button>
    <button class="system-notif-tab" :class="{ active: tab === 'template' }" @click="switchTab('template')"><i class="fas fa-file-alt"></i>通知模板管理</button>
  </div>

  <!-- 发送通知标签页 -->
  <div v-if="tab === 'send'" class="notification-compose">
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-edit"></i> 编辑通知</span>
      </div>
      <div class="card-body">
        <div class="form-section">
          <div class="field-label">通知类型</div>
          <div class="radio-row">
            <label><input v-model="form.type" :value="1" type="radio">订单通知</label>
            <label><input v-model="form.type" :value="2" type="radio">活动通知</label>
            <label><input v-model="form.type" :value="3" type="radio">系统维护</label>
          </div>
        </div>
        <div class="form-section">
          <div class="field-label">通知标题</div>
          <input v-model="form.title" class="form-control" placeholder="请输入通知标题">
        </div>
        <div class="form-section">
          <div class="field-label">通知内容</div>
          <textarea v-model="form.content" class="form-control" rows="6" placeholder="请输入通知内容"></textarea>
        </div>
        <div class="form-section">
          <div class="field-label">接收范围</div>
          <div class="radio-row">
            <label><input v-model="form.targetScope" :value="1" type="radio">全部用户</label>
            <label><input v-model="form.targetScope" :value="2" type="radio">指定用户</label>
          </div>
          <div v-if="form.targetScope === 2" class="specified-users">
            <div class="search-row">
              <input v-model="userKeyword" class="form-control" placeholder="搜索用户（用户名/手机号）" @keydown.enter.prevent="searchUsers(false)">
              <button class="btn btn-sm btn-primary" :disabled="searchingUsers" @click="searchUsers(false)"><i class="fas fa-search"></i> 搜索</button>
            </div>
            <div v-if="searchResults.length" class="user-results">
              <button v-for="item in searchResults" :key="item.id" class="system-user-search-result" @click="toggleUser(item)">
                <span><strong>{{ item.username }}</strong><small>{{ maskPhone(item.phone) }}</small></span>
                <i class="fas" :class="selectedUsers.some(user => String(user.id) === String(item.id)) ? 'fa-check-circle selected' : 'fa-circle'"></i>
              </button>
            </div>
            <div v-if="userDirectoryError" class="inline-error">
              <i class="fas fa-exclamation-circle"></i>{{ userDirectoryError }}。当前账号无法读取用户列表，因此不能将手机号转换为用户ID。
            </div>
            <div class="selected-users">
              <span v-if="!selectedUsers.length" class="system-tag muted">输入完整手机号可自动选择，或从搜索结果中选择</span>
              <button v-for="item in selectedUsers" :key="item.id" class="system-tag primary" @click="toggleUser(item)">{{ item.username }} ({{ maskPhone(item.phone) }}) <i class="fas fa-times"></i></button>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div class="field-label">发送方式</div>
          <div class="radio-row">
            <label><input v-model="form.sendType" :value="1" type="radio">立即发送</label>
            <label><input v-model="form.sendType" :value="2" type="radio" @change="setScheduledDefault">定时发送</label>
          </div>
          <input v-if="form.sendType === 2" v-model="form.sendTime" class="form-control schedule-input" type="datetime-local">
        </div>
        <div class="action-row">
          <button class="btn btn-primary" :disabled="submitting" @click="sendNotification"><i :class="submitting ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i> 发送通知</button>
          <button class="btn btn-outline" @click="saveDraft"><i class="fas fa-save"></i> 保存草稿</button>
          <button class="btn btn-outline" @click="modal = { kind: 'preview' }"><i class="fas fa-eye"></i> 预览</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 通知记录标签页 -->
  <div v-else-if="tab === 'record'" class="record-page">
    <!-- 通知记录统计卡片 -->
    <div class="record-stats">
      <div class="record-stat-card">
        <span class="record-stat-icon blue"><i class="fas fa-bell"></i></span>
        <div><small>当前页通知</small><strong>{{ recordStats.count.toLocaleString() }}</strong></div>
      </div>
      <div class="record-stat-card">
        <span class="record-stat-icon primary"><i class="fas fa-users"></i></span>
        <div><small>接收人数</small><strong>{{ recordStats.recipients.toLocaleString() }}</strong></div>
      </div>
      <div class="record-stat-card">
        <span class="record-stat-icon green"><i class="fas fa-check-circle"></i></span>
        <div><small>送达人数</small><strong>{{ recordStats.delivered.toLocaleString() }}</strong></div>
      </div>
      <div class="record-stat-card">
        <span class="record-stat-icon yellow"><i class="fas fa-chart-line"></i></span>
        <div><small>送达率</small><strong>{{ recordStats.deliveryRate }}%</strong></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-list"></i> 通知记录</span>
        <div class="search-bar">
          <input v-model="recordKeyword" placeholder="搜索标题">
          <select v-model="typeFilter" @change="page=1;loadNotifications()">
            <option value="all">全部类型</option>
            <option value="order">订单通知</option>
            <option value="activity">活动通知</option>
            <option value="system">系统维护</option>
          </select>
          <select v-model="statusFilter">
            <option value="all">全部状态</option>
            <option value="sent">已送达</option>
            <option value="sending">发送中</option>
            <option value="cancelled">已撤销</option>
          </select>
          <button class="btn btn-primary" @click="loadNotifications"><i class="fas fa-search"></i> 搜索</button>
        </div>
      </div>
      <div class="card-body no-pad">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>通知ID</th>
                <th>标题</th>
                <th>类型</th>
                <th>接收范围</th>
                <th>接收人数</th>
                <th>送达人数</th>
                <th>送达状态</th>
                <th>发送时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loadingRecords">
                <td colspan="9" class="table-state"><i class="fas fa-spinner fa-spin"></i></td>
              </tr>
              <tr v-else-if="!pageRecords.length">
                <td colspan="9" class="table-state">暂无通知记录</td>
              </tr>
              <tr v-for="item in pageRecords" v-else :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td><span class="system-tag" :class="item.type === 'order' ? 'blue' : item.type === 'activity' ? 'primary' : 'yellow'">{{ typeText(item.type) }}</span></td>
                <td>{{ item.scope }}</td>
                <td>{{ item.totalCount.toLocaleString() }}</td>
                <td>{{ item.deliveredCount.toLocaleString() }}</td>
                <td><span class="status-badge" :class="item.status === 'sent' ? 'green' : item.status === 'sending' ? 'blue' : 'gray'"><span class="dot"></span>{{ statusText(item.status) }}</span></td>
                <td>{{ item.time }}</td>
                <td>
                  <button class="btn btn-sm btn-outline" @click="modal={kind:'detail',item}">详情</button>
                  <button class="icon-btn danger" title="删除通知" @click="deleteNotification(item)"><i class="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="totalPages > 1" class="card-footer pagination">
        <button class="icon-btn" :disabled="page <= 1" @click="changePage(page-1)"><i class="fas fa-angle-left"></i></button>
        <span>共 {{ total }} 条记录，第 {{ page }}/{{ totalPages }} 页</span>
        <button class="icon-btn" :disabled="page >= totalPages" @click="changePage(page+1)"><i class="fas fa-angle-right"></i></button>
      </div>
    </div>
  </div>

  <!-- 通知模板管理标签页 -->
  <div v-else class="template-layout">
    <div class="card template-list">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-file-alt"></i> 模板列表 <small>共 {{ templateTotal }} 条</small></span>
        <div class="template-tools">
          <select v-model="templateTypeFilter" class="form-control" @change="templatePage=1;loadTemplates()">
            <option :value="0">全部类型</option>
            <option :value="1">订单通知</option>
            <option :value="2">活动通知</option>
            <option :value="3">系统维护</option>
          </select>
          <button class="btn btn-sm btn-primary" @click="selectTemplate(null)"><i class="fas fa-plus"></i> 新建</button>
        </div>
      </div>
      <div class="card-body no-pad">
        <div v-if="loadingTemplates" class="table-state"><i class="fas fa-spinner fa-spin"></i></div>
        <div v-else-if="!templates.length" class="table-state">暂无通知模板</div>
        <button v-for="item in templates" v-else :key="item.id" class="template-item" :class="{active:String(selectedTemplateId)===String(item.id)}" @click="selectTemplate(item)">
          <span><strong>{{ item.name }}</strong><small>{{ item.category }} · {{ typeText(item.type) }}</small></span>
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-edit"></i> {{ templateForm.id ? '编辑模板' : '新建模板' }}</span>
        <div class="action-row">
          <button v-if="templateForm.id" type="button" class="btn btn-sm btn-outline" @click="useTemplate"><i class="fas fa-paper-plane"></i> 使用</button>
          <button v-if="templateForm.id" type="button" class="btn btn-sm btn-outline" @click="copyTemplate"><i class="fas fa-copy"></i> 复制</button>
        </div>
      </div>
      <div class="card-body">
        <div class="form-section">
          <div class="field-label">模板名称</div>
          <input v-model="templateForm.name" class="form-control">
        </div>
        <div class="form-section">
          <div class="field-label">通知类型</div>
          <select v-model="templateForm.type" class="form-control">
            <option :value="1">订单通知</option>
            <option :value="2">活动通知</option>
            <option :value="3">系统维护</option>
          </select>
        </div>
        <div class="form-section">
          <div class="field-label">标题模板</div>
          <input v-model="templateForm.title" class="form-control">
        </div>
        <div class="form-section">
          <div class="field-label">内容模板</div>
          <textarea v-model="templateForm.content" class="form-control" rows="7"></textarea>
        </div>
        <div class="action-row">
          <button type="button" class="btn btn-primary" @click="saveTemplate"><i class="fas fa-save"></i> 保存模板</button>
          <button type="button" class="btn btn-outline" @click="resetTemplateForm"><i class="fas fa-undo"></i> 重置</button>
          <button v-if="templateForm.id" type="button" class="btn btn-danger" @click="deleteTemplate"><i class="fas fa-trash-alt"></i> 删除</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 通知预览/详情/数据弹窗 -->
  <template v-if="modal">
    <div class="modal-overlay" @click="modal=null"></div>
    <div class="modal-content notification-modal">
      <div class="modal-header">
        <h3><i :class="modal.kind === 'preview' ? 'fas fa-eye' : modal.kind === 'data' ? 'fas fa-chart-bar' : 'fas fa-file-alt'"></i> {{ modal.kind === 'preview' ? '预览通知' : modal.kind === 'data' ? '通知数据' : '通知详情' }}</h3>
        <button class="modal-close" @click="modal=null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <template v-if="modal.kind === 'preview'">
          <h4>{{ form.title || '暂无标题' }}</h4>
          <p>{{ form.content || '暂无内容' }}</p>
        </template>
        <template v-else>
          <div class="detail-grid">
            <div><small>通知ID</small><strong>{{ modal.item.id }}</strong></div>
            <div><small>发送时间</small><strong>{{ modal.item.time }}</strong></div>
            <div><small>类型</small><strong>{{ typeText(modal.item.type) }}</strong></div>
            <div><small>状态</small><strong>{{ statusText(modal.item.status) }}</strong></div>
            <div><small>接收人数</small><strong>{{ modal.item.totalCount.toLocaleString() }}</strong></div>
            <div><small>送达人数</small><strong>{{ modal.item.deliveredCount.toLocaleString() }}</strong></div>
            <div><small>发送人数</small><strong>{{ modal.item.sendCount.toLocaleString() }}</strong></div>
            <div><small>已读人数</small><strong>{{ modal.item.readCount.toLocaleString() }}</strong></div>
            <div><small>已读率</small><strong>{{ modal.item.readRate }}%</strong></div>
          </div>
          <h4>{{ modal.item.title }}</h4>
          <p v-if="modal.kind === 'detail'">{{ modal.item.content || '暂无内容' }}</p>
        </template>
      </div>
      <div class="modal-footer">
        <button v-if="modal.kind === 'preview'" class="btn btn-primary" :disabled="submitting" @click="sendNotification"><i class="fas fa-paper-plane"></i> 发送</button>
        <button class="btn btn-outline" @click="modal=null">关闭</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
/* 通知记录页统计卡片样式 */
.record-page{display:flex;flex-direction:column;gap:12px}.record-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.record-stat-card{display:flex;align-items:center;gap:12px;padding:18px;background:#fff;border:1px solid #e2e8f0;border-radius:8px}.record-stat-card div{display:flex;flex-direction:column;gap:4px}.record-stat-card small{color:#64748b;font-size:12px}.record-stat-card strong{color:#1e293b;font-size:22px}.record-stat-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:#f1f5f9;font-size:18px}

/* 标签页、表单、用户搜索、模板列表、弹窗样式 */
.notification-tabs{margin-bottom:16px;border-bottom:1px solid #e2e8f0;display:flex}
.system-notif-tab{background:none;border:0}.notification-compose{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}.form-section{margin-bottom:16px}.field-label{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px}.form-control{width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font:inherit;font-size:13px;outline:none;background:#fff;color:#1e293b}.form-control:focus{border-color:#4f6ef7}.radio-row,.action-row,.search-row,.template-tools{display:flex;align-items:center;gap:10px}.template-tools .form-control{width:112px;padding:6px 8px}.card-title small{font-weight:400;color:#94a3b8}.radio-row label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}.radio-row input{accent-color:#4f6ef7}.specified-users{margin-top:10px}.search-row .form-control{flex:1}.inline-error{margin:10px 0;padding:9px 11px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#dc2626;font-size:12px}.inline-error i{margin-right:6px}.user-results{max-height:200px;overflow:auto;border:1px solid #e2e8f0;border-radius:6px;margin:10px 0}.system-user-search-result{width:100%;border:0;background:#fff;text-align:left}.system-user-search-result span,.template-item span{display:flex;flex-direction:column;gap:3px}.system-user-search-result small,.template-item small{color:#94a3b8}.system-user-search-result .selected{color:#4f6ef7}.selected-users{display:flex;flex-wrap:wrap;gap:8px}.selected-users button{border:0;cursor:pointer}.muted{color:#94a3b8}.schedule-input{width:max-content;margin-top:8px}.blue{color:#4f6ef7}.green{color:#22c55e}.table-state{text-align:center;padding:32px;color:#94a3b8}.pagination{display:flex;align-items:center;justify-content:center;gap:12px}.danger{color:#ef4444}.template-layout{display:grid;grid-template-columns:minmax(240px,1fr) minmax(0,2fr);gap:12px}.template-list{align-self:start}.template-item{width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px;border:0;border-bottom:1px solid #f1f4f9;background:#fff;text-align:left;cursor:pointer}.template-item:hover,.template-item.active{background:#eef1ff;color:#4f6ef7}.notification-modal{width:min(550px,calc(100vw - 32px))}.notification-modal h4{font-size:16px;margin:0 0 8px}.notification-modal p{color:#64748b;line-height:1.6;white-space:pre-wrap}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}.detail-grid div{display:flex;flex-direction:column;gap:4px}.detail-grid small{color:#94a3b8}.detail-grid strong{font-size:13px}

/* 响应式布局 + 暗色主题适配 */
@media(max-width:900px){.notification-compose,.template-layout{grid-template-columns:1fr}.card-header{align-items:flex-start;gap:10px;flex-direction:column}.search-bar{width:100%;flex-wrap:wrap}.search-bar input,.search-bar select{flex:1;min-width:130px}}[data-theme='dark'] .form-control,[data-theme='dark'] .system-user-search-result,[data-theme='dark'] .template-item{background:#111827;color:#e5e7eb;border-color:#334155}[data-theme='dark'] .field-label{color:#e5e7eb}
/* 统计卡片响应式 + 暗色主题 */
@media(max-width:900px){.record-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.record-stats{grid-template-columns:1fr}}[data-theme='dark'] .record-stat-card{background:#111827;border-color:#334155}[data-theme='dark'] .record-stat-card strong{color:#e5e7eb}[data-theme='dark'] .record-stat-card small{color:#94a3b8}[data-theme='dark'] .record-stat-icon{background:#1e293b}
</style>
