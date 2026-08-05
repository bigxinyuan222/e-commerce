<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

type Id = number | string
interface Message { id: Id; from: 'me' | 'other'; content: string; time: string; isAI: boolean }
interface Chat { id: Id; userName: string; phone: string; avatar: string; status: 'pending' | 'active' | 'closed'; lastMessage: string; lastTime: string; unread: number; messages: Message[] }

const props = defineProps<{ token?: string }>()
const chats = ref<Chat[]>([])
const selectedId = ref<Id | ''>('')
const pendingCount = ref(0)
const total = ref(0)
const page = ref(1)
const pageSize = 20
const status = ref<'all' | Chat['status']>('all')
const keyword = ref('')
const messageInput = ref('')
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
  return (!search || chat.userName.toLowerCase().includes(search) || chat.phone.includes(search) || chat.lastMessage.toLowerCase().includes(search))
}))
const activeCount = computed(() => chats.value.filter(chat => chat.status === 'active').length)
const closedCount = computed(() => chats.value.filter(chat => chat.status === 'closed').length)

function headers(json = false) { const h = new Headers(); if (json) h.set('Content-Type', 'application/json'); if (props.token) h.set('Authorization', `Bearer ${props.token}`); return h }
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options }); const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`)
  return payload?.data ?? payload
}
function listFrom(data: any) { return Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? [] }
function messageView(row: any): Message {
  const sender = String(row.from ?? row.senderType ?? row.sender_type ?? '').toLowerCase(); const ai = Number(row.sender_type ?? row.senderType) === 3 || sender === 'ai' || Number(row.reply_source ?? row.replySource) === 1 || row.isAI === true
  const staff = Number(row.sender_type ?? row.senderType) === 2 || ['admin', 'service', 'staff', 'agent'].includes(sender)
  return { id: row.id ?? row.message_id ?? `m-${Date.now()}`, from: staff || ai ? 'me' : 'other', content: String(row.content ?? ''), time: String(row.created_at ?? row.createdAt ?? row.time ?? ''), isAI: ai }
}
function chatView(row: any): Chat {
  const name = String(row.user_name ?? row.userName ?? row.user?.nickname ?? row.user?.name ?? '')
  return { id: row.conversation_id ?? row.conversationId ?? row.ID ?? row.id, userName: name, phone: String(row.phone ?? row.user?.phone ?? ''), avatar: name.charAt(0) || '用', status: Number(row.status) === 0 ? 'pending' : Number(row.status) === 1 ? 'active' : 'closed', lastMessage: String(row.last_message ?? row.lastMessage ?? ''), lastTime: String(row.updated_at ?? row.updatedAt ?? row.last_time ?? ''), unread: Number(row.unread_count ?? row.unreadCount) || 0, messages: [] }
}
function notify(text: string, type: 'success' | 'error' = 'success') { ;(window as any).showToast?.(text, type) }
async function scrollBottom() { await nextTick(); if (messageBox.value) messageBox.value.scrollTop = messageBox.value.scrollHeight }

async function loadPending() { try { const data = await requestJson('/api/v1/admin/chat/conversations/pending-count', { headers: headers() }); pendingCount.value = Number(data?.count) || 0 } catch { pendingCount.value = 0 } }
async function loadMessages(id: Id) {
  const chat = chats.value.find(item => String(item.id) === String(id)); if (!chat) return
  try { const data = await requestJson(`/api/v1/admin/chat/conversations/${id}/messages?page=1&pageSize=20`, { headers: headers() }); chat.messages = listFrom(data).map(messageView).reverse(); await scrollBottom() }
  catch (cause) { notify(cause instanceof Error ? cause.message : '历史消息加载失败', 'error') }
}
async function loadChats() {
  loading.value = true; error.value = ''
  try {
    const value = status.value === 'all' ? '' : String({ pending: 0, active: 1, closed: 2 }[status.value]); const params = new URLSearchParams({ page: String(page.value), pageSize: String(pageSize), status: value })
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
  socket.onmessage = async event => { try { const payload = JSON.parse(String(event.data)); if (payload?.type !== 'chat') return; const data = payload.data || {}; const chat = chats.value.find(item => String(item.id) === String(data.conversationId ?? data.conversation_id)); if (!chat || !data.content) return; if (!chat.messages.some(item => String(item.id) === String(data.id))) chat.messages.push(messageView(data)); chat.lastMessage = data.content; if (String(chat.id) === String(selectedId.value)) await scrollBottom(); else chat.unread++ } catch { /* ignore malformed frames */ } }
  socket.onerror = () => { socketState.value = 'disconnected' }
  socket.onclose = () => { socket = null; socketState.value = 'disconnected'; if (!stopped) { const delay = Math.min(30000, 1000 * 2 ** reconnectAttempts++); reconnectTimer = window.setTimeout(connectSocket, delay) } }
}
async function accept(chat: Chat) { try { await requestJson(`/api/v1/admin/chat/conversations/${chat.id}/accept`, { method: 'PUT', headers: headers(true), body: '{}' }); chat.status = 'active'; pendingCount.value = Math.max(0, pendingCount.value - 1); notify('已接入会话') } catch (cause) { notify(cause instanceof Error ? cause.message : '接入失败', 'error') } }
async function closeChat() { if (!closeTarget.value) return; const chat = closeTarget.value; try { await requestJson(`/api/v1/admin/chat/conversations/${chat.id}/close`, { method: 'PUT', headers: headers(true), body: '{}' }); chat.status = 'closed'; closeTarget.value = null; notify('会话已关闭') } catch (cause) { notify(cause instanceof Error ? cause.message : '关闭失败', 'error') } }
async function sendMessage() {
  const chat = selected.value; const content = messageInput.value.trim(); if (!chat || !content) return
  try { if (chat.status === 'pending') await accept(chat); if (!socket || socket.readyState !== WebSocket.OPEN) { connectSocket(); throw new Error('客服实时连接未建立，请等待连接成功后再发送') }
    socket.send(JSON.stringify({ type: 'chat', data: { conversationId: Number(chat.id) || chat.id, content, messageType: 1 } })); chat.messages.push({ id: `local-${Date.now()}`, from: 'me', content, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }), isAI: false }); chat.lastMessage = content; messageInput.value = ''; await scrollBottom()
  } catch (cause) { notify(cause instanceof Error ? cause.message : '发送失败', 'error') }
}
function badge(status: Chat['status']) { return status === 'pending' ? ['yellow', '待接入'] : status === 'active' ? ['green', '服务中'] : ['gray', '已关闭'] }

onMounted(async () => { await Promise.all([loadPending(), loadChats()]); connectSocket() })
onUnmounted(() => { stopped = true; clearTimeout(reconnectTimer); socket?.close(); socket = null })
</script>

<template>
  <div class="flex-between mb-4"><div class="search-bar"><input v-model="keyword" id="chatSearchInput" placeholder="用户 / 手机号 / 消息" /><select v-model="status" @change="changeFilter"><option value="all">全部状态</option><option value="pending">待接入</option><option value="active">服务中</option><option value="closed">已关闭</option></select><button class="btn btn-primary"><i class="fas fa-search"></i> 搜索</button></div><span class="status-badge" :class="socketState === 'connected' ? 'green' : socketState === 'connecting' ? 'yellow' : 'red'"><span class="dot"></span> {{ socketState === 'connected' ? '实时连接' : socketState === 'connecting' ? '连接中' : '连接断开' }}</span></div>
  <div class="system-stat-grid"><div class="system-stat-card"><div class="label"><i class="fas fa-clock"></i> 待接入</div><div class="value yellow">{{ pendingCount }}</div></div><div class="system-stat-card"><div class="label"><i class="fas fa-headset"></i> 服务中</div><div class="value green">{{ activeCount }}</div></div><div class="system-stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已关闭</div><div class="value">{{ closedCount }}</div></div></div>
  <div v-if="error" class="stock-list-error">{{ error }}</div>
  <div class="card" style="flex:1"><div class="card-body no-pad system-chat-layout"><div class="system-chat-sidebar"><div class="system-chat-sidebar-header"><span class="title"><i class="fas fa-comments"></i> 会话列表</span><span class="count">共 {{ total }} 条</span></div><div class="system-chat-sidebar-body"><div v-if="loading" class="stock-table-state"><i class="fas fa-spinner fa-spin"></i></div><div v-for="chat in filtered" v-else :key="chat.id" class="system-chat-item" :class="{active:String(selectedId)===String(chat.id)}" @click="selectChat(chat)"><div class="system-chat-item-header"><div class="system-chat-item-avatar">{{ chat.avatar }}</div><div class="system-chat-item-info"><div class="name">{{ chat.userName }}</div><div class="phone">{{ chat.phone }}</div></div><div v-if="chat.unread" class="system-chat-item-unread">{{ chat.unread }}</div></div><div class="system-chat-item-footer"><div class="message">{{ chat.lastMessage }}</div><span class="time">{{ chat.lastTime }}</span></div><div style="margin-top:4px"><span class="status-badge" :class="badge(chat.status)[0]" style="font-size:11px"><span class="dot"></span> {{ badge(chat.status)[1] }}</span></div></div></div><div v-if="totalPages > 1" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-top:1px solid #e2e8f0"><button class="icon-btn" :disabled="page<=1" @click="changePage(page-1)"><i class="fas fa-angle-left"></i></button><span>{{ page }} / {{ totalPages }}</span><button class="icon-btn" :disabled="page>=totalPages" @click="changePage(page+1)"><i class="fas fa-angle-right"></i></button></div></div>
    <div class="system-chat-main"><template v-if="selected"><div class="system-chat-main-header"><div class="system-chat-main-header-info"><div class="system-chat-main-header-avatar">{{ selected.avatar }}</div><div class="system-chat-main-header-details"><div class="name">{{ selected.userName }}</div><div class="info">{{ selected.phone }} · {{ badge(selected.status)[1] }}</div></div></div><div class="system-chat-main-header-actions"><button v-if="selected.status==='pending'" class="btn btn-sm btn-primary" @click="accept(selected)"><i class="fas fa-phone"></i> 接入</button><button v-if="selected.status==='active'" class="btn btn-sm btn-danger" @click="closeTarget=selected"><i class="fas fa-times"></i> 关闭</button></div></div><div ref="messageBox" class="system-chat-messages"><div v-for="message in selected.messages" :key="message.id" class="system-chat-message" :class="message.from"><div class="system-chat-message-bubble"><div>{{ message.content }}</div><div class="system-chat-message-time">{{ message.time }} <span v-if="message.isAI" class="system-chat-message-ai">AI助手</span></div></div></div></div><div class="system-chat-input-area"><button class="btn btn-outline btn-sm"><i class="fas fa-image"></i></button><input v-model="messageInput" id="chatInput" class="system-chat-input" placeholder="输入消息，按回车发送……" @keydown.enter.prevent="sendMessage" /><button class="btn btn-primary" @click="sendMessage"><i class="fas fa-paper-plane"></i></button></div></template><div v-else class="system-chat-empty"><div><i class="fas fa-comments"></i></div><div class="system-chat-empty-text">请选择一个会话开始聊天</div></div></div>
  </div></div>
  <template v-if="closeTarget"><div class="modal-overlay" @click="closeTarget=null"></div><div class="modal-content"><div class="modal-header"><h3>确认操作</h3></div><div class="modal-body"><p>确定关闭此会话吗？</p></div><div class="modal-footer"><button class="btn btn-outline" @click="closeTarget=null">取消</button><button class="btn btn-primary" @click="closeChat">确认</button></div></div></template>
</template>
