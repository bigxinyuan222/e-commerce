<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

type Id = string | number
type Tab = 'send' | 'record' | 'template'
type Modal = { kind: 'preview' } | { kind: 'detail'; item: NotificationItem } | { kind: 'data'; item: NotificationItem } | null

interface NotificationItem {
  id: Id
  title: string
  content: string
  type: 'order' | 'activity' | 'system'
  scope: string
  totalCount: number
  deliveredCount: number
  status: 'sent' | 'sending' | 'cancelled'
  time: string
}

interface TemplateItem {
  id: Id
  name: string
  type: 'order' | 'activity' | 'system'
  category: string
  title: string
  content: string
  trigger: string
}

interface UserItem { id: Id; username: string; phone: string }

const props = defineProps<{ token?: string }>()
const tab = ref<Tab>('send')
const notifications = ref<NotificationItem[]>([])
const templates = ref<TemplateItem[]>([])
const selectedTemplateId = ref<Id | ''>('')
const loadingRecords = ref(false)
const loadingTemplates = ref(false)
const templateTypeFilter = ref(0)
const templatePage = ref(1)
const templatePageSize = 20
const templateTotal = ref(0)
const submitting = ref(false)
const searchingUsers = ref(false)
const userDirectory = ref<UserItem[]>([])
const usersLoaded = ref(false)
const userDirectoryError = ref('')
const searchResults = ref<UserItem[]>([])
const selectedUsers = ref<UserItem[]>([])
const userKeyword = ref('')
const recordKeyword = ref('')
const typeFilter = ref('all')
const statusFilter = ref('all')
const page = ref(1)
const pageSize = 20
const total = ref(0)
const modal = ref<Modal>(null)
const detailLoading = ref(false)
const detailLoadedId = ref<Id | null>(null)

const form = reactive({ type: 1, title: '', content: '', targetScope: 1, sendType: 1, sendTime: '' })
const templateForm = reactive({ id: '' as Id | '', name: '', type: 1, category: '自定义', title: '', content: '', trigger: '手动触发' })

function headers(json = false) {
  const value = new Headers()
  if (json) value.set('Content-Type', 'application/json')
  if (props.token) value.set('Authorization', `Bearer ${props.token}`)
  return value
}

async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

function listFrom(value: any): any[] { return Array.isArray(value) ? value : value?.list ?? value?.items ?? value?.records ?? value?.users ?? value?.data ?? [] }
function notify(text: string, type: 'success' | 'error' = 'success') { ;(window as any).showToast?.(text, type) }
function typeKey(value: unknown): NotificationItem['type'] {
  if (value === 1 || value === '1' || value === 'order') return 'order'
  if (value === 2 || value === '2' || value === 'activity') return 'activity'
  return 'system'
}
function typeNumber(value: NotificationItem['type']) { return value === 'order' ? 1 : value === 'activity' ? 2 : 3 }
function typeText(value: NotificationItem['type']) { return { order: '订单通知', activity: '活动通知', system: '系统维护' }[value] }
function statusText(value: NotificationItem['status']) { return { sent: '已送达', sending: '发送中', cancelled: '已撤销' }[value] }
function maskPhone(value: string) { return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }

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
    status: row.status === 2 || row.status === 'sending' ? 'sending' : row.status === 3 || row.status === 'cancelled' ? 'cancelled' : 'sent',
    time: String(row.created_at ?? row.createdAt ?? row.time ?? ''),
  }
}

function templateView(row: any): TemplateItem {
  return {
    id: row.ID ?? row.id, name: String(row.name ?? ''), type: typeKey(row.type), category: String(row.category ?? '自定义'),
    title: String(row.title_template ?? row.titleTemplate ?? row.title ?? ''), content: String(row.content_template ?? row.contentTemplate ?? row.content ?? ''),
    trigger: String(row.trigger ?? '手动触发'),
  }
}

const filteredRecords = computed(() => notifications.value.filter(item => {
  const keyword = recordKeyword.value.trim().toLowerCase()
  return (typeFilter.value === 'all' || item.type === typeFilter.value)
    && (statusFilter.value === 'all' || item.status === statusFilter.value)
    && (!keyword || item.title.toLowerCase().includes(keyword) || String(item.id).toLowerCase().includes(keyword))
}))
const totalPages = computed(() => Math.max(1, Math.ceil((total.value || filteredRecords.value.length) / pageSize)))
const pageRecords = computed(() => total.value > notifications.value.length ? filteredRecords.value : filteredRecords.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const selectedTemplate = computed(() => templates.value.find(item => String(item.id) === String(selectedTemplateId.value)))

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

async function searchUsers(autoSelectExact = false) {
  const keyword = userKeyword.value.trim()
  if (!keyword) { searchResults.value = []; return }
  await loadUserDirectory()
  const normalized = keyword.toLowerCase()
  searchResults.value = userDirectory.value.filter(item => item.phone.includes(keyword) || item.username.toLowerCase().includes(normalized)).slice(0, 20)
  const exact = searchResults.value.filter(item => item.phone === keyword || item.username.toLowerCase() === normalized)
  if ((autoSelectExact || /^\d{11}$/.test(keyword)) && exact.length === 1 && !selectedUsers.value.some(item => String(item.id) === String(exact[0].id))) selectedUsers.value.push(exact[0])
}

function toggleUser(user: UserItem) {
  const index = selectedUsers.value.findIndex(item => String(item.id) === String(user.id))
  if (index >= 0) selectedUsers.value.splice(index, 1); else selectedUsers.value.push(user)
}

function setScheduledDefault() {
  if (form.sendType !== 2 || form.sendTime) return
  const next = new Date(Date.now() + 5 * 60_000); next.setMinutes(next.getMinutes() - next.getTimezoneOffset())
  form.sendTime = next.toISOString().slice(0, 16)
}

function validateForm() {
  if (!form.title.trim()) throw new Error('请输入通知标题')
  if (!form.content.trim()) throw new Error('请输入通知内容')
  if (form.targetScope === 2 && !selectedUsers.value.length) throw new Error('请选择接收通知的用户')
  if (form.sendType === 2 && !form.sendTime) throw new Error('请选择定时发送时间')
}

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

function saveDraft() {
  try { validateForm(); localStorage.setItem('lxg_notification_draft', JSON.stringify({ ...form, selectedUsers: selectedUsers.value })); notify('通知草稿已保存') }
  catch (cause) { notify(cause instanceof Error ? cause.message : '草稿保存失败', 'error') }
}

function selectTemplate(item: TemplateItem | null) {
  selectedTemplateId.value = item?.id ?? ''
  Object.assign(templateForm, item ? { id: item.id, name: item.name, type: typeNumber(item.type), category: item.category, title: item.title, content: item.content, trigger: item.trigger } : { id: '', name: '', type: 1, category: '自定义', title: '', content: '', trigger: '手动触发' })
}
function useTemplate() { const item = selectedTemplate.value; if (!item) return; form.type = typeNumber(item.type); form.title = item.title; form.content = item.content; tab.value = 'send' }
function copyTemplate() { templateForm.id = ''; templateForm.name = `${templateForm.name} - 副本`; selectedTemplateId.value = '' }
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
async function deleteTemplate() {
  if (!templateForm.id || !window.confirm('确定删除此通知模板吗？')) return
  try { await requestJson(`/api/v1/admin/notification-templates/${encodeURIComponent(String(templateForm.id))}`, { method: 'DELETE', headers: headers() }); notify('模板已删除'); await loadTemplates() }
  catch (cause) { notify(cause instanceof Error ? cause.message : '模板删除失败', 'error') }
}
async function deleteNotification(item: NotificationItem) {
  if (!window.confirm(`确定删除通知“${item.title}”吗？`)) return
  try { await requestJson(`/api/v1/admin/notifications/${encodeURIComponent(String(item.id))}`, { method: 'DELETE', headers: headers() }); notify('通知已删除'); await loadNotifications() }
  catch (cause) { notify(cause instanceof Error ? cause.message : '通知删除失败', 'error') }
}
async function switchTab(next: Tab) { tab.value = next; if (next === 'record') await loadNotifications(); if (next === 'template') await loadTemplates() }
async function changePage(next: number) { if (next < 1 || next > totalPages.value) return; page.value = next; await loadNotifications() }

onMounted(async () => {
  const draft = localStorage.getItem('lxg_notification_draft')
  if (draft) { try { const value = JSON.parse(draft); Object.assign(form, value); selectedUsers.value = value.selectedUsers ?? [] } catch { /* ignore invalid draft */ } }
  await Promise.all([loadNotifications(), loadTemplates()])
})
</script>

<template>
  <div class="notification-tabs">
    <button class="system-notif-tab" :class="{ active: tab === 'send' }" @click="switchTab('send')"><i class="fas fa-paper-plane"></i>发送通知</button>
    <button class="system-notif-tab" :class="{ active: tab === 'record' }" @click="switchTab('record')"><i class="fas fa-history"></i>通知记录</button>
    <button class="system-notif-tab" :class="{ active: tab === 'template' }" @click="switchTab('template')"><i class="fas fa-file-alt"></i>通知模板管理</button>
  </div>

  <div v-if="tab === 'send'" class="notification-compose">
    <div class="card"><div class="card-header"><span class="card-title"><i class="fas fa-edit"></i> 编辑通知</span></div><div class="card-body">
      <div class="form-section"><div class="field-label">通知类型</div><div class="radio-row"><label><input v-model="form.type" :value="1" type="radio">订单通知</label><label><input v-model="form.type" :value="2" type="radio">活动通知</label><label><input v-model="form.type" :value="3" type="radio">系统维护</label></div></div>
      <div class="form-section"><div class="field-label">通知标题</div><input v-model="form.title" class="form-control" placeholder="请输入通知标题"></div>
      <div class="form-section"><div class="field-label">通知内容</div><textarea v-model="form.content" class="form-control" rows="6" placeholder="请输入通知内容"></textarea></div>
      <div class="form-section"><div class="field-label">接收范围</div><div class="radio-row"><label><input v-model="form.targetScope" :value="1" type="radio">全部用户</label><label><input v-model="form.targetScope" :value="2" type="radio">指定用户</label></div>
        <div v-if="form.targetScope === 2" class="specified-users"><div class="search-row"><input v-model="userKeyword" class="form-control" placeholder="搜索用户（用户名/手机号）" @keydown.enter.prevent="searchUsers(false)"><button class="btn btn-sm btn-primary" :disabled="searchingUsers" @click="searchUsers(false)"><i class="fas fa-search"></i> 搜索</button></div>
          <div v-if="searchResults.length" class="user-results"><button v-for="item in searchResults" :key="item.id" class="system-user-search-result" @click="toggleUser(item)"><span><strong>{{ item.username }}</strong><small>{{ maskPhone(item.phone) }}</small></span><i class="fas" :class="selectedUsers.some(user => String(user.id) === String(item.id)) ? 'fa-check-circle selected' : 'fa-circle'"></i></button></div>
          <div v-if="userDirectoryError" class="inline-error"><i class="fas fa-exclamation-circle"></i>{{ userDirectoryError }}。当前账号无法读取用户列表，因此不能将手机号转换为用户ID。</div><div class="selected-users"><span v-if="!selectedUsers.length" class="system-tag muted">输入完整手机号可自动选择，或从搜索结果中选择</span><button v-for="item in selectedUsers" :key="item.id" class="system-tag primary" @click="toggleUser(item)">{{ item.username }} ({{ maskPhone(item.phone) }}) <i class="fas fa-times"></i></button></div>
        </div>
      </div>
      <div class="form-section"><div class="field-label">发送方式</div><div class="radio-row"><label><input v-model="form.sendType" :value="1" type="radio">立即发送</label><label><input v-model="form.sendType" :value="2" type="radio" @change="setScheduledDefault">定时发送</label></div><input v-if="form.sendType === 2" v-model="form.sendTime" class="form-control schedule-input" type="datetime-local"></div>
      <div class="action-row"><button class="btn btn-primary" :disabled="submitting" @click="sendNotification"><i :class="submitting ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i> 发送通知</button><button class="btn btn-outline" @click="saveDraft"><i class="fas fa-save"></i> 保存草稿</button><button class="btn btn-outline" @click="modal = { kind: 'preview' }"><i class="fas fa-eye"></i> 预览</button></div>
    </div></div>
    <div class="card stats-card"><div class="card-header"><span class="card-title"><i class="fas fa-chart-pie"></i> 今日发送统计</span></div><div class="card-body"><div class="stat-line"><span>今日发送量</span><strong class="blue">28</strong></div><div class="stat-line"><span>送达人数</span><strong class="green">12,580</strong></div><div class="stat-line"><span>送达率</span><strong class="green">99.2%</strong></div><div class="stat-line"><span>点击量</span><strong class="orange">3,420</strong></div></div></div>
  </div>

  <div v-else-if="tab === 'record'" class="card"><div class="card-header"><span class="card-title"><i class="fas fa-list"></i> 通知记录</span><div class="search-bar"><input v-model="recordKeyword" placeholder="搜索标题"><select v-model="typeFilter" @change="page=1;loadNotifications()"><option value="all">全部类型</option><option value="order">订单通知</option><option value="activity">活动通知</option><option value="system">系统维护</option></select><select v-model="statusFilter"><option value="all">全部状态</option><option value="sent">已送达</option><option value="sending">发送中</option><option value="cancelled">已撤销</option></select><button class="btn btn-primary" @click="loadNotifications"><i class="fas fa-search"></i> 搜索</button></div></div>
    <div class="card-body no-pad"><div class="table-wrap"><table><thead><tr><th>通知ID</th><th>标题</th><th>类型</th><th>接收范围</th><th>接收人数</th><th>送达人数</th><th>送达状态</th><th>发送时间</th><th>操作</th></tr></thead><tbody><tr v-if="loadingRecords"><td colspan="9" class="table-state"><i class="fas fa-spinner fa-spin"></i></td></tr><tr v-else-if="!pageRecords.length"><td colspan="9" class="table-state">暂无通知记录</td></tr><tr v-for="item in pageRecords" v-else :key="item.id"><td>{{ item.id }}</td><td>{{ item.title }}</td><td><span class="system-tag" :class="item.type === 'order' ? 'blue' : item.type === 'activity' ? 'primary' : 'yellow'">{{ typeText(item.type) }}</span></td><td>{{ item.scope }}</td><td>{{ item.totalCount.toLocaleString() }}</td><td>{{ item.deliveredCount.toLocaleString() }}</td><td><span class="status-badge" :class="item.status === 'sent' ? 'green' : item.status === 'sending' ? 'blue' : 'gray'"><span class="dot"></span>{{ statusText(item.status) }}</span></td><td>{{ item.time }}</td><td><button class="btn btn-sm btn-outline" @click="modal={kind:'detail',item}">详情</button><button class="icon-btn danger" title="删除通知" @click="deleteNotification(item)"><i class="fas fa-trash-alt"></i></button></td></tr></tbody></table></div></div>
    <div v-if="totalPages > 1" class="card-footer pagination"><button class="icon-btn" :disabled="page <= 1" @click="changePage(page-1)"><i class="fas fa-angle-left"></i></button><span>共 {{ total }} 条记录，第 {{ page }}/{{ totalPages }} 页</span><button class="icon-btn" :disabled="page >= totalPages" @click="changePage(page+1)"><i class="fas fa-angle-right"></i></button></div>
  </div>

  <div v-else class="template-layout"><div class="card template-list"><div class="card-header"><span class="card-title"><i class="fas fa-file-alt"></i> 模板列表 <small>共 {{ templateTotal }} 条</small></span><div class="template-tools"><select v-model="templateTypeFilter" class="form-control" @change="templatePage=1;loadTemplates()"><option :value="0">全部类型</option><option :value="1">订单通知</option><option :value="2">活动通知</option><option :value="3">系统维护</option></select><button class="btn btn-sm btn-primary" @click="selectTemplate(null)"><i class="fas fa-plus"></i> 新建</button></div></div><div class="card-body no-pad"><div v-if="loadingTemplates" class="table-state"><i class="fas fa-spinner fa-spin"></i></div><div v-else-if="!templates.length" class="table-state">暂无通知模板</div><button v-for="item in templates" v-else :key="item.id" class="template-item" :class="{active:String(selectedTemplateId)===String(item.id)}" @click="selectTemplate(item)"><span><strong>{{ item.name }}</strong><small>{{ item.category }} · {{ typeText(item.type) }}</small></span><i class="fas fa-chevron-right"></i></button></div></div>
    <div class="card"><div class="card-header"><span class="card-title"><i class="fas fa-edit"></i> {{ templateForm.id ? '编辑模板' : '新建模板' }}</span><div class="action-row"><button v-if="templateForm.id" class="btn btn-sm btn-outline" @click="useTemplate"><i class="fas fa-paper-plane"></i> 使用</button><button v-if="templateForm.id" class="btn btn-sm btn-outline" @click="copyTemplate"><i class="fas fa-copy"></i> 复制</button></div></div><div class="card-body"><div class="form-section"><div class="field-label">模板名称</div><input v-model="templateForm.name" class="form-control"></div><div class="form-section"><div class="field-label">通知类型</div><select v-model="templateForm.type" class="form-control"><option :value="1">订单通知</option><option :value="2">活动通知</option><option :value="3">系统维护</option></select></div><div class="form-section"><div class="field-label">标题模板</div><input v-model="templateForm.title" class="form-control"></div><div class="form-section"><div class="field-label">内容模板</div><textarea v-model="templateForm.content" class="form-control" rows="7"></textarea></div><div class="action-row"><button class="btn btn-primary" @click="saveTemplate"><i class="fas fa-save"></i> 保存模板</button><button class="btn btn-outline" @click="selectTemplate(selectedTemplate ?? null)"><i class="fas fa-undo"></i> 重置</button><button v-if="templateForm.id" class="btn btn-danger" @click="deleteTemplate"><i class="fas fa-trash-alt"></i> 删除</button></div></div></div>
  </div>

  <template v-if="modal"><div class="modal-overlay" @click="modal=null"></div><div class="modal-content notification-modal"><div class="modal-header"><h3><i :class="modal.kind === 'preview' ? 'fas fa-eye' : modal.kind === 'data' ? 'fas fa-chart-bar' : 'fas fa-file-alt'"></i> {{ modal.kind === 'preview' ? '预览通知' : modal.kind === 'data' ? '通知数据' : '通知详情' }}</h3><button class="modal-close" @click="modal=null"><i class="fas fa-times"></i></button></div><div class="modal-body"><template v-if="modal.kind === 'preview'"><h4>{{ form.title || '暂无标题' }}</h4><p>{{ form.content || '暂无内容' }}</p></template><template v-else><div class="detail-grid"><div><small>通知ID</small><strong>{{ modal.item.id }}</strong></div><div><small>发送时间</small><strong>{{ modal.item.time }}</strong></div><div><small>类型</small><strong>{{ typeText(modal.item.type) }}</strong></div><div><small>状态</small><strong>{{ statusText(modal.item.status) }}</strong></div><div><small>接收人数</small><strong>{{ modal.item.totalCount.toLocaleString() }}</strong></div><div><small>送达人数</small><strong>{{ modal.item.deliveredCount.toLocaleString() }}</strong></div></div><h4>{{ modal.item.title }}</h4><p v-if="modal.kind === 'detail'">{{ modal.item.content || '暂无内容' }}</p></template></div><div class="modal-footer"><button v-if="modal.kind === 'preview'" class="btn btn-primary" :disabled="submitting" @click="sendNotification"><i class="fas fa-paper-plane"></i> 发送</button><button class="btn btn-outline" @click="modal=null">关闭</button></div></div></template>
</template>

<style scoped>
.notification-tabs{margin-bottom:16px;border-bottom:1px solid #e2e8f0;display:flex}
.system-notif-tab{background:none;border:0}.notification-compose{display:grid;grid-template-columns:minmax(0,2fr) minmax(240px,1fr);gap:12px}.form-section{margin-bottom:16px}.field-label{font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px}.form-control{width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font:inherit;font-size:13px;outline:none;background:#fff;color:#1e293b}.form-control:focus{border-color:#4f6ef7}.radio-row,.action-row,.search-row,.template-tools{display:flex;align-items:center;gap:10px}.template-tools .form-control{width:112px;padding:6px 8px}.card-title small{font-weight:400;color:#94a3b8}.radio-row label{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer}.radio-row input{accent-color:#4f6ef7}.specified-users{margin-top:10px}.search-row .form-control{flex:1}.inline-error{margin:10px 0;padding:9px 11px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#dc2626;font-size:12px}.inline-error i{margin-right:6px}.user-results{max-height:200px;overflow:auto;border:1px solid #e2e8f0;border-radius:6px;margin:10px 0}.system-user-search-result{width:100%;border:0;background:#fff;text-align:left}.system-user-search-result span,.template-item span{display:flex;flex-direction:column;gap:3px}.system-user-search-result small,.template-item small{color:#94a3b8}.system-user-search-result .selected{color:#4f6ef7}.selected-users{display:flex;flex-wrap:wrap;gap:8px}.selected-users button{border:0;cursor:pointer}.muted{color:#94a3b8}.schedule-input{width:max-content;margin-top:8px}.stats-card{align-self:start}.stat-line{display:flex;justify-content:space-between;font-size:13px;margin-bottom:12px}.blue{color:#4f6ef7}.green{color:#22c55e}.orange{color:#f59e0b}.table-state{text-align:center;padding:32px;color:#94a3b8}.pagination{display:flex;align-items:center;justify-content:center;gap:12px}.danger{color:#ef4444}.template-layout{display:grid;grid-template-columns:minmax(240px,1fr) minmax(0,2fr);gap:12px}.template-list{align-self:start}.template-item{width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px;border:0;border-bottom:1px solid #f1f4f9;background:#fff;text-align:left;cursor:pointer}.template-item:hover,.template-item.active{background:#eef1ff;color:#4f6ef7}.notification-modal{width:min(550px,calc(100vw - 32px))}.notification-modal h4{font-size:16px;margin:0 0 8px}.notification-modal p{color:#64748b;line-height:1.6;white-space:pre-wrap}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}.detail-grid div{display:flex;flex-direction:column;gap:4px}.detail-grid small{color:#94a3b8}.detail-grid strong{font-size:13px}@media(max-width:900px){.notification-compose,.template-layout{grid-template-columns:1fr}.card-header{align-items:flex-start;gap:10px;flex-direction:column}.search-bar{width:100%;flex-wrap:wrap}.search-bar input,.search-bar select{flex:1;min-width:130px}}[data-theme='dark'] .form-control,[data-theme='dark'] .system-user-search-result,[data-theme='dark'] .template-item{background:#111827;color:#e5e7eb;border-color:#334155}[data-theme='dark'] .field-label{color:#e5e7eb}
</style>
