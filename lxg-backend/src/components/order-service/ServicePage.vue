<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

type Id = number | string
interface Message { id: Id; from: 'me' | 'other'; content: string; time: string; isAI: boolean; isImage: boolean; senderName: string; senderRole: string }
interface Chat { id: Id; userName: string; phone: string; avatar: string; status: 'pending' | 'ai_active' | 'active' | 'closed'; lastMessage: string; lastTime: string; unread: number; messages: Message[]; agentName: string; agentRole: string }

const props = defineProps<{ token?: string; agentName?: string; agentRole?: string }>()
const chats = ref<Chat[]>([])
const selectedId = ref<Id | ''>('')
const pendingCount = ref(0)
const total = ref(0)
const page = ref(1)
const pageSize = 20
const status = ref<'all' | Chat['status'] | 'serving'>('all')
const keyword = ref('')
const messageInput = ref('')
const imageInput = ref<HTMLInputElement | null>(null)
const imageUploading = ref(false)
const loading = ref(false)
const error = ref('')
const socketState = ref<'connecting' | 'connected' | 'disconnected'>('disconnected')
const closeTarget = ref<Chat | null>(null)
const messageBox = ref<HTMLElement | null>(null)
let socket: WebSocket | null = null
let reconnectTimer = 0
let reconnectAttempts = 0
let stopped = false

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const selected = computed(() => chats.value.find(chat => String(chat.id) === String(selectedId.value)) ?? null)
const filtered = computed(() => chats.value.filter(chat => {
  const search = keyword.value.trim().toLowerCase()
  const matchesStatus = status.value === 'all' || (status.value === 'serving' ? (chat.status === 'ai_active' || chat.status === 'active') : chat.status === status.value)
  const matchesKeyword = !search || chat.userName.toLowerCase().includes(search) || chat.phone.includes(search) || chat.lastMessage.toLowerCase().includes(search)
  return matchesStatus && matchesKeyword
}))
const aiActiveCount = computed(() => chats.value.filter(chat => chat.status === 'ai_active').length)
const activeCount = computed(() => chats.value.filter(chat => chat.status === 'active').length)
const closedCount = computed(() => chats.value.filter(chat => chat.status === 'closed').length)

function headers(json = false) { const h = new Headers(); if (json) h.set('Content-Type', 'application/json'); if (props.token) h.set('Authorization', `Bearer ${props.token}`); return h }
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options }); const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`)
  return payload?.data ?? payload
}
function listFrom(data: any) { return Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? [] }
function roleText(value: unknown) { const key = String(value ?? ''); return ({ super_admin: '超级管理员', admin: '管理员', order_cs: '订单客服', service: '客服', staff: '客服人员', agent: '客服人员' } as Record<string, string>)[key] || key || '客服人员' }
function messageView(row: any, userNickname = ''): Message {
  const sender = String(row.from ?? row.senderType ?? row.sender_type ?? '').toLowerCase(); const ai = Number(row.sender_type ?? row.senderType) === 3 || sender === 'ai' || Number(row.reply_source ?? row.replySource) === 1 || row.isAI === true
  const staff = Number(row.sender_type ?? row.senderType) === 2 || ['admin', 'service', 'staff', 'agent'].includes(sender)
  const senderName = String(row.sender_name ?? row.senderName ?? row.admin_name ?? row.adminName ?? row.staff_name ?? row.staffName ?? (staff ? props.agentName : userNickname) ?? '')
  const senderRole = ai ? 'AI助手' : staff ? roleText(row.sender_role ?? row.senderRole ?? row.admin_role ?? row.adminRole ?? row.role ?? props.agentRole) : '用户'
  const messageType = Number(row.messageType ?? row.message_type ?? row.type)
  return { id: row.id ?? row.message_id ?? `m-${Date.now()}`, from: staff || ai ? 'me' : 'other', content: String(row.content ?? ''), time: String(row.created_at ?? row.createdAt ?? row.time ?? ''), isAI: ai, isImage: messageType === 2, senderName: ai ? 'AI助手' : senderName, senderRole }
}
function normalizeChatStatus(value: unknown): Chat['status'] {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (normalized === '0' || normalized === 'pending' || normalized === 'waiting') return 'pending'
  if (normalized === '1' || normalized === 'ai_active' || normalized === 'ai') return 'ai_active'
  if (normalized === '2' || normalized === 'active' || normalized === 'serving') return 'active'
  if (normalized === '3' || normalized === 'closed') return 'closed'
  return 'closed'
}
function chatView(row: any): Chat {
  const name = String(row.userNickname ?? row.user_nickname ?? row.user_name ?? row.userName ?? row.user?.nickname ?? row.user?.name ?? '用户')
  const chatStatus = normalizeChatStatus(row.status)
  const agentName = String(row.agent_name ?? row.agentName ?? row.admin_name ?? row.adminName ?? row.staff_name ?? row.staffName ?? row.agent?.name ?? row.admin?.name ?? (chatStatus === 'active' ? props.agentName : '') ?? '')
  const agentRole = agentName ? roleText(row.agent_role ?? row.agentRole ?? row.admin_role ?? row.adminRole ?? row.staff_role ?? row.staffRole ?? row.agent?.role ?? row.admin?.role ?? props.agentRole) : ''
  return { id: row.conversation_id ?? row.conversationId ?? row.ID ?? row.id, userName: name, phone: String(row.phone ?? row.user?.phone ?? ''), avatar: name.charAt(0) || '用', status: chatStatus, lastMessage: String(row.last_message ?? row.lastMessage ?? ''), lastTime: String(row.updated_at ?? row.updatedAt ?? row.last_time ?? ''), unread: Number(row.unread_count ?? row.unreadCount) || 0, messages: [], agentName, agentRole }
}
function notify(text: string, type: 'success' | 'error' = 'success') { ;(window as any).showToast?.(text, type) }
async function scrollBottom() { await nextTick(); if (messageBox.value) messageBox.value.scrollTop = messageBox.value.scrollHeight }

async function loadPending() { try { const data = await requestJson('/api/v1/admin/chat/conversations/pending-count', { headers: headers() }); pendingCount.value = Number(data?.count) || 0 } catch { pendingCount.value = 0 } }
async function loadMessages(id: Id) {
  const chat = chats.value.find(item => String(item.id) === String(id)); if (!chat) return
  try { const data = await requestJson(`/api/v1/admin/chat/conversations/${id}/messages?page=1&pageSize=20`, { headers: headers() }); chat.messages = listFrom(data).map((row: any) => messageView(row, chat.userName)).reverse(); await scrollBottom() }
  catch (cause) { notify(cause instanceof Error ? cause.message : '历史消息加载失败', 'error') }
}
async function loadChats() {
  loading.value = true; error.value = ''
  try {
    const params = new URLSearchParams({ page: String(page.value), pageSize: String(pageSize) })
    const data = await requestJson(`/api/v1/admin/chat/conversations?${params}`, { headers: headers() }); const previous = new Map(chats.value.map(chat => [String(chat.id), chat.messages])); chats.value = listFrom(data).map(chatView); chats.value.forEach(chat => { chat.messages = previous.get(String(chat.id)) ?? [] })
    total.value = Number(data?.total ?? data?.total_count ?? data?.count) || chats.value.length
    if (!chats.value.some(chat => String(chat.id) === String(selectedId.value))) selectedId.value = chats.value[0]?.id ?? ''
    if (selectedId.value) await loadMessages(selectedId.value)
  } catch (cause) { chats.value = []; total.value = 0; error.value = cause instanceof Error ? cause.message : '会话列表加载失败' }
  finally { loading.value = false }
}
async function selectChat(chat: Chat) { selectedId.value = chat.id; chat.unread = 0; await loadMessages(chat.id) }
async function changeFilter() { page.value = 1; selectedId.value = ''; await loadChats() }
async function changePage(next: number) { if (next < 1 || next > totalPages.value || next === page.value) return; page.value = next; selectedId.value = ''; await loadChats() }

function socketUrl() { const protocol = location.protocol === 'https:' ? 'wss' : 'ws'; const base = `${protocol}://${location.host}/api/v1/admin/chat/ws`; return props.token ? `${base}?token=${encodeURIComponent(props.token)}` : base }
function connectSocket() {
  if (stopped || socket?.readyState === WebSocket.OPEN || socket?.readyState === WebSocket.CONNECTING) return
  socketState.value = 'connecting'; socket = new WebSocket(socketUrl())
  socket.onopen = () => { socketState.value = 'connected'; reconnectAttempts = 0 }
  socket.onmessage = async event => { try { const payload = JSON.parse(String(event.data)); if (payload?.type !== 'chat') return; const data = payload.data || {}; const chat = chats.value.find(item => String(item.id) === String(data.conversationId ?? data.conversation_id)); if (!chat || !data.content) return; if (!chat.messages.some(item => String(item.id) === String(data.id))) chat.messages.push(messageView(data, chat.userName)); chat.lastMessage = data.content; if (String(chat.id) === String(selectedId.value)) await scrollBottom(); else chat.unread++ } catch { /* ignore malformed frames */ } }
  socket.onerror = () => { socketState.value = 'disconnected' }
  socket.onclose = () => { socket = null; socketState.value = 'disconnected'; if (!stopped) { const delay = Math.min(30000, 1000 * 2 ** reconnectAttempts++); reconnectTimer = window.setTimeout(connectSocket, delay) } }
}
async function accept(chat: Chat) { try { await requestJson(`/api/v1/admin/chat/conversations/${chat.id}/accept`, { method: 'PUT', headers: headers(true), body: '{}' }); chat.status = 'active'; chat.agentName = props.agentName || '当前客服'; chat.agentRole = roleText(props.agentRole); pendingCount.value = Math.max(0, pendingCount.value - 1); notify('已接入会话') } catch (cause) { notify(cause instanceof Error ? cause.message : '接入失败', 'error') } }
async function closeChat() { if (!closeTarget.value) return; const chat = closeTarget.value; try { await requestJson(`/api/v1/admin/chat/conversations/${chat.id}/close`, { method: 'PUT', headers: headers(true), body: '{}' }); chat.status = 'closed'; closeTarget.value = null; notify('会话已关闭') } catch (cause) { notify(cause instanceof Error ? cause.message : '关闭失败', 'error') } }
async function sendMessage() {
  const chat = selected.value; const content = messageInput.value.trim(); if (!chat || !content) return
  try { if (chat.status === 'pending' || chat.status === 'ai_active') await accept(chat); if (!socket || socket.readyState !== WebSocket.OPEN) { connectSocket(); throw new Error('客服实时连接未建立，请等待连接成功后再发送') }
    socket.send(JSON.stringify({ type: 'chat', data: { conversationId: Number(chat.id) || chat.id, content, messageType: 1 } })); chat.messages.push({ id: `local-${Date.now()}`, from: 'me', content, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }), isAI: false, isImage: false, senderName: props.agentName || '当前客服', senderRole: roleText(props.agentRole) }); chat.lastMessage = content; messageInput.value = ''; await scrollBottom()
  } catch (cause) { notify(cause instanceof Error ? cause.message : '发送失败', 'error') }
}
function chooseImage() { if (!imageUploading.value) imageInput.value?.click() }
async function uploadImage(event: Event) {
  const input = event.target as HTMLInputElement; const file = input.files?.[0]; input.value = ''; if (!file) return
  if (!file.type.startsWith('image/')) return notify('请选择图片文件', 'error')
  const chat = selected.value; if (!chat) return notify('请先选择会话', 'error')
  imageUploading.value = true
  try {
    const form = new FormData(); form.append('file', file)
    const data = await requestJson('/api/v1/user/upload', { method: 'POST', headers: headers(), body: form })
    const imageUrl = typeof data === 'string' ? data : data?.url ?? data?.imageUrl ?? data?.image_url
    if (!imageUrl) throw new Error('上传成功但未返回图片地址')
    if (chat.status === 'pending' || chat.status === 'ai_active') await accept(chat)
    if (!socket || socket.readyState !== WebSocket.OPEN) { connectSocket(); throw new Error('图片已上传，但客服实时连接未建立，请稍后重试') }
    const content = String(imageUrl)
    socket.send(JSON.stringify({ type: 'chat', data: { conversationId: Number(chat.id) || chat.id, content, messageType: 2 } }))
    chat.messages.push({ id: `local-image-${Date.now()}`, from: 'me', content, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }), isAI: false, isImage: true, senderName: props.agentName || '当前客服', senderRole: roleText(props.agentRole) })
    chat.lastMessage = '[图片]'; await scrollBottom(); notify('图片发送成功')
  } catch (cause) { notify(cause instanceof Error ? cause.message : '图片上传失败', 'error') }
  finally { imageUploading.value = false }
}
function badge(status: Chat['status']) {
  if (status === 'pending') return ['yellow', '待接入']
  if (status === 'ai_active') return ['blue', 'AI接待中']
  if (status === 'active') return ['green', '人工接待中']
  return ['gray', '已关闭']
}

onMounted(async () => { await Promise.all([loadPending(), loadChats()]); connectSocket() })
onUnmounted(() => { stopped = true; clearTimeout(reconnectTimer); socket?.close(); socket = null })
</script>

<template>
  <div class="flex-between mb-4">
    <div class="search-bar">
      <input v-model="keyword" id="chatSearchInput" placeholder="用户 / 手机号 / 消息" />
      <select v-model="status" @change="changeFilter">
        <option value="all">全部状态</option>
        <option value="pending">待接入</option>
        <option value="ai_active">AI接待中</option>
        <option value="serving">人工接待中</option>
        <option value="closed">已关闭</option>
      </select>
      <button class="btn btn-primary"><i class="fas fa-search"></i> 搜索</button>
    </div>
    <span class="status-badge" :class="socketState === 'connected' ? 'green' : socketState === 'connecting' ? 'yellow' : 'red'"><span class="dot"></span> {{ socketState === 'connected' ? '实时连接' : socketState === 'connecting' ? '连接中' : '连接断开' }}</span>
  </div>
  <div class="system-stat-grid">
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-clock"></i> 待接入</div>
      <div class="value yellow">{{ pendingCount }}</div>
    </div>
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-robot"></i> AI接待中</div>
      <div class="value blue">{{ aiActiveCount }}</div>
    </div>
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-headset"></i> 人工接待中</div>
      <div class="value green">{{ activeCount }}</div>
    </div>
    <div class="system-stat-card">
      <div class="label"><i class="fas fa-check-circle"></i> 已关闭</div>
      <div class="value">{{ closedCount }}</div>
    </div>
  </div>
  <div v-if="error" class="stock-list-error">{{ error }}</div>
  <div class="card" style="flex:1">
    <div class="card-body no-pad system-chat-layout">
      <div class="system-chat-sidebar">
        <div class="system-chat-sidebar-header">
          <span class="title"><i class="fas fa-comments"></i> 会话列表</span>
          <span class="count">共 {{ total }} 条</span>
        </div>
        <div class="system-chat-sidebar-body">
          <div v-if="loading" class="stock-table-state"><i class="fas fa-spinner fa-spin"></i></div>
          <div v-for="chat in filtered" v-else :key="chat.id" class="system-chat-item" :class="{active:String(selectedId)===String(chat.id)}" @click="selectChat(chat)">
            <div class="system-chat-item-header">
              <div class="system-chat-item-avatar">{{ chat.avatar }}</div>
              <div class="system-chat-item-info">
                <div class="name">{{ chat.userName }}</div>
                <div class="phone">{{ chat.phone }}</div>
              </div>
              <div v-if="chat.unread" class="system-chat-item-unread">{{ chat.unread }}</div>
            </div>
            <div class="system-chat-item-footer">
              <div class="message">{{ chat.lastMessage }}</div>
              <span class="time">{{ chat.lastTime }}</span>
            </div>
            <div style="margin-top:4px"><span class="status-badge" :class="badge(chat.status)[0]" style="font-size:11px"><span class="dot"></span> {{ badge(chat.status)[1] }}</span></div>
          </div>
        </div>
        <div v-if="totalPages > 1" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-top:1px solid #e2e8f0">
          <button class="icon-btn" :disabled="page<=1" @click="changePage(page-1)"><i class="fas fa-angle-left"></i></button>
          <span>{{ page }} / {{ totalPages }}</span>
          <button class="icon-btn" :disabled="page>=totalPages" @click="changePage(page+1)"><i class="fas fa-angle-right"></i></button>
        </div>
      </div>
    <div class="system-chat-main">
      <template v-if="selected">
        <div class="system-chat-main-header">
          <div class="system-chat-main-header-info">
            <div class="system-chat-main-header-avatar">{{ selected.avatar }}</div>
            <div class="system-chat-main-header-details">
              <div class="name">{{ selected.userName }}</div>
              <div class="info">{{ selected.phone }} · {{ badge(selected.status)[1] }}</div>
              <div class="agent-identity"><i class="fas fa-headset"></i> {{ selected.agentName ? `接待客服：${selected.agentName}（${selected.agentRole}）` : '接待客服：暂未接入' }}</div>
            </div>
          </div>
          <div class="system-chat-main-header-actions">
            <button v-if="selected.status==='pending' || selected.status==='ai_active'" class="btn btn-sm btn-primary" @click="accept(selected)"><i class="fas fa-phone"></i> 接入</button>
            <button v-if="selected.status==='active' || selected.status==='ai_active'" class="btn btn-sm btn-danger" @click="closeTarget=selected"><i class="fas fa-times"></i> 关闭</button>
          </div>
        </div>
        <div ref="messageBox" class="system-chat-messages">
          <div v-for="message in selected.messages" :key="message.id" class="system-chat-message" :class="message.from">
            <div class="system-chat-message-bubble">
              <div class="message-identity"><i :class="message.isAI ? 'fas fa-robot' : message.from === 'me' ? 'fas fa-headset' : 'fas fa-user'"></i> <span>{{ message.isAI ? message.senderRole : message.senderName ? `${message.senderName} · ${message.senderRole}` : message.senderRole }}</span></div>
              <a v-if="message.isImage" :href="message.content" target="_blank" rel="noopener noreferrer"><img class="chat-message-image" :src="message.content" alt="聊天图片" /></a>
              <div v-else class="message-content">{{ message.content }}</div>
              <div class="system-chat-message-time">{{ message.time }}</div>
            </div>
          </div>
        </div>
        <div class="system-chat-input-area">
          <input ref="imageInput" type="file" accept="image/*" hidden @change="uploadImage" />
          <button class="btn btn-outline btn-sm" :disabled="imageUploading" title="上传并发送图片" @click="chooseImage"><i :class="imageUploading ? 'fas fa-spinner fa-spin' : 'fas fa-image'"></i></button>
          <input v-model="messageInput" id="chatInput" class="system-chat-input" placeholder="输入消息，按回车发送……" @keydown.enter.prevent="sendMessage" />
          <button class="btn btn-primary" @click="sendMessage"><i class="fas fa-paper-plane"></i></button>
        </div>
      </template>
      <div v-else class="system-chat-empty">
        <div><i class="fas fa-comments"></i></div>
        <div class="system-chat-empty-text">请选择一个会话开始聊天</div>
      </div>
    </div>
  </div></div>
  <template v-if="closeTarget">
    <div class="modal-overlay" @click="closeTarget=null"></div>
    <div class="modal-content">
      <div class="modal-header"><h3>确认操作</h3></div>
      <div class="modal-body"><p>确定关闭此会话吗？</p></div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="closeTarget=null">取消</button>
        <button class="btn btn-primary" @click="closeChat">确认</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
.agent-identity{display:flex;align-items:center;gap:5px;margin-top:3px;color:#4f6ef7;font-size:12px;font-weight:600}.message-identity{display:flex;align-items:center;gap:5px;margin-bottom:5px;padding-bottom:4px;border-bottom:1px solid rgb(148 163 184 / 22%);font-size:11px;font-weight:600;opacity:.82}.system-chat-message.other .message-identity{color:#64748b}.system-chat-message.me .message-identity{color:inherit}.chat-message-image{display:block;max-width:240px;max-height:240px;border-radius:8px;object-fit:contain}[data-theme='dark'] .agent-identity{color:#93c5fd}
</style>
