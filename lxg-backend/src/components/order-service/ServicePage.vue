<!--
  文件名称：ServicePage.vue
  所属模块：订单服务模块（order-service）
  功能说明：客服消息页面，提供在线客服会话管理，包含会话列表、实时消息收发（WebSocket）、
           图片上传发送、会话接入/关闭、AI接待与人工接待切换等功能。
  接口说明：REST API 基础路径 /api/v1/admin/chat，WebSocket 连接 /api/v1/admin/chat/ws
-->
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

type Id = number | string
// 聊天消息结构
interface Message { id: Id; from: 'me' | 'other'; content: string; time: string; isAI: boolean; isImage: boolean; senderName: string; senderRole: string }
// 会话结构
interface Chat { id: Id; userName: string; phone: string; avatar: string; status: 'pending' | 'ai_active' | 'active' | 'closed'; lastMessage: string; lastTime: string; unread: number; messages: Message[]; agentName: string; agentRole: string }

const props = defineProps<{ token?: string; agentName?: string; agentRole?: string }>()
const chats = ref<Chat[]>([])                    // 会话列表
const selectedId = ref<Id | ''>('')              // 当前选中的会话ID
const pendingCount = ref(0)                      // 待接入会话数
const total = ref(0)                             // 会话总数
const page = ref(1)                              // 当前页码
const pageSize = 20                              // 每页条数
const status = ref<'all' | Chat['status'] | 'serving'>('all') // 会话状态筛选
const keyword = ref('')                          // 搜索关键词
const messageInput = ref('')                     // 消息输入框内容
const imageInput = ref<HTMLInputElement | null>(null) // 图片文件输入框引用
const imageUploading = ref(false)                // 图片上传中状态
const loading = ref(false)                       // 列表加载状态
const error = ref('')                            // 列表加载错误信息
const socketState = ref<'connecting' | 'connected' | 'disconnected'>('disconnected') // WebSocket连接状态
const closeTarget = ref<Chat | null>(null)       // 待关闭会话确认弹窗目标
const messageBox = ref<HTMLElement | null>(null) // 消息列表容器引用（用于自动滚动到底部）
let socket: WebSocket | null = null               // WebSocket实例
let reconnectTimer = 0                           // 重连定时器ID
let reconnectAttempts = 0                        // 重连尝试次数
let stopped = false                              // 组件是否已卸载（停止重连标志）

// 计算总页数
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
// 当前选中的会话对象
const selected = computed(() => chats.value.find(chat => String(chat.id) === String(selectedId.value)) ?? null)
// 本地筛选后的会话列表（按状态+关键词过滤）
const filtered = computed(() => chats.value.filter(chat => {
  const search = keyword.value.trim().toLowerCase()
  const matchesStatus = status.value === 'all' || (status.value === 'serving' ? (chat.status === 'ai_active' || chat.status === 'active') : chat.status === status.value)
  const matchesKeyword = !search || chat.userName.toLowerCase().includes(search) || chat.phone.includes(search) || chat.lastMessage.toLowerCase().includes(search)
  return matchesStatus && matchesKeyword
}))
// AI接待中会话数
const aiActiveCount = computed(() => chats.value.filter(chat => chat.status === 'ai_active').length)
// 人工接待中会话数
const activeCount = computed(() => chats.value.filter(chat => chat.status === 'active').length)
// 已关闭会话数
const closedCount = computed(() => chats.value.filter(chat => chat.status === 'closed').length)

/** 构建请求头，携带 JWT Token，可选设置 JSON Content-Type */
function headers(json = false) { const h = new Headers(); if (json) h.set('Content-Type', 'application/json'); if (props.token) h.set('Authorization', `Bearer ${props.token}`); return h }
/** 统一请求封装，自动解析 code/data 结构并抛出业务错误 */
async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options }); const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`)
  return payload?.data ?? payload
}
/** 从接口返回数据中提取列表数组（兼容多种字段名） */
function listFrom(data: any) { return Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? [] }
/** 角色英文键 → 中文显示文本 */
function roleText(value: unknown) { const key = String(value ?? ''); return ({ super_admin: '超级管理员', admin: '管理员', order_cs: '订单客服', service: '客服', staff: '客服人员', agent: '客服人员' } as Record<string, string>)[key] || key || '客服人员' }
/** 将后端消息行数据归一化为前端 Message 结构（兼容蛇形/驼峰，判断AI/客服/用户发送方） */
function messageView(row: any, userNickname = ''): Message {
  const sender = String(row.from ?? row.senderType ?? row.sender_type ?? '').toLowerCase(); const ai = Number(row.sender_type ?? row.senderType) === 3 || sender === 'ai' || Number(row.reply_source ?? row.replySource) === 1 || row.isAI === true
  const staff = Number(row.sender_type ?? row.senderType) === 2 || ['admin', 'service', 'staff', 'agent'].includes(sender)
  const senderName = String(row.sender_name ?? row.senderName ?? row.admin_name ?? row.adminName ?? row.staff_name ?? row.staffName ?? (staff ? props.agentName : userNickname) ?? '')
  const senderRole = ai ? 'AI助手' : staff ? roleText(row.sender_role ?? row.senderRole ?? row.admin_role ?? row.adminRole ?? row.role ?? props.agentRole) : '用户'
  const messageType = Number(row.messageType ?? row.message_type ?? row.type)
  return { id: row.id ?? row.message_id ?? `m-${Date.now()}`, from: staff || ai ? 'me' : 'other', content: String(row.content ?? ''), time: String(row.created_at ?? row.createdAt ?? row.time ?? ''), isAI: ai, isImage: messageType === 2, senderName: ai ? 'AI助手' : senderName, senderRole }
}
/** 将后端会话状态值归一化为前端 Chat['status'] 枚举（0=待接入 1=AI接待 2=人工接待 3=已关闭） */
function normalizeChatStatus(value: unknown): Chat['status'] {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (normalized === '0' || normalized === 'pending' || normalized === 'waiting') return 'pending'
  if (normalized === '1' || normalized === 'ai_active' || normalized === 'ai') return 'ai_active'
  if (normalized === '2' || normalized === 'active' || normalized === 'serving') return 'active'
  if (normalized === '3' || normalized === 'closed') return 'closed'
  return 'closed'
}
/** 将后端会话行数据归一化为前端 Chat 结构 */
function chatView(row: any): Chat {
  const name = String(row.userNickname ?? row.user_nickname ?? row.user_name ?? row.userName ?? row.user?.nickname ?? row.user?.name ?? '用户')
  const chatStatus = normalizeChatStatus(row.status)
  const agentName = String(row.agent_name ?? row.agentName ?? row.admin_name ?? row.adminName ?? row.staff_name ?? row.staffName ?? row.agent?.name ?? row.admin?.name ?? (chatStatus === 'active' ? props.agentName : '') ?? '')
  const agentRole = agentName ? roleText(row.agent_role ?? row.agentRole ?? row.admin_role ?? row.adminRole ?? row.staff_role ?? row.staffRole ?? row.agent?.role ?? row.admin?.role ?? props.agentRole) : ''
  return { id: row.conversation_id ?? row.conversationId ?? row.ID ?? row.id, userName: name, phone: String(row.phone ?? row.user?.phone ?? ''), avatar: name.charAt(0) || '用', status: chatStatus, lastMessage: String(row.last_message ?? row.lastMessage ?? ''), lastTime: String(row.updated_at ?? row.updatedAt ?? row.last_time ?? ''), unread: Number(row.unread_count ?? row.unreadCount) || 0, messages: [], agentName, agentRole }
}
/** 轻量级提示（通过全局 showToast 方法） */
function notify(text: string, type: 'success' | 'error' = 'success') { ;(window as any).showToast?.(text, type) }
/** 等待DOM更新后滚动消息列表到底部 */
async function scrollBottom() { await nextTick(); if (messageBox.value) messageBox.value.scrollTop = messageBox.value.scrollHeight }

/** 加载待接入会话数量（API: GET /api/v1/admin/chat/conversations/pending-count） */
async function loadPending() { try { const data = await requestJson('/api/v1/admin/chat/conversations/pending-count', { headers: headers() }); pendingCount.value = Number(data?.count) || 0 } catch { pendingCount.value = 0 } }
/** 加载指定会话的历史消息（API: GET /api/v1/admin/chat/conversations/:id/messages） */
async function loadMessages(id: Id) {
  const chat = chats.value.find(item => String(item.id) === String(id)); if (!chat) return
  try { const data = await requestJson(`/api/v1/admin/chat/conversations/${id}/messages?page=1&pageSize=20`, { headers: headers() }); chat.messages = listFrom(data).map((row: any) => messageView(row, chat.userName)).reverse(); await scrollBottom() }
  catch (cause) { notify(cause instanceof Error ? cause.message : '历史消息加载失败', 'error') }
}
/** 加载会话列表（API: GET /api/v1/admin/chat/conversations），刷新列表时保留已加载的消息 */
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
/** 选中会话并加载其历史消息，清除未读数 */
async function selectChat(chat: Chat) { selectedId.value = chat.id; chat.unread = 0; await loadMessages(chat.id) }
/** 筛选条件变更：重置页码后重新加载 */
async function changeFilter() { page.value = 1; selectedId.value = ''; await loadChats() }
/** 翻页：校验边界后重新加载 */
async function changePage(next: number) { if (next < 1 || next > totalPages.value || next === page.value) return; page.value = next; selectedId.value = ''; await loadChats() }

/** 构建WebSocket连接URL（根据页面协议选择 ws/wss，携带token查询参数） */
function socketUrl() { const protocol = location.protocol === 'https:' ? 'wss' : 'ws'; const base = `${protocol}://${location.host}/api/v1/admin/chat/ws`; return props.token ? `${base}?token=${encodeURIComponent(props.token)}` : base }
/** 建立WebSocket连接，监听消息/错误/关闭事件，断线自动指数退避重连 */
function connectSocket() {
  if (stopped || socket?.readyState === WebSocket.OPEN || socket?.readyState === WebSocket.CONNECTING) return
  socketState.value = 'connecting'; socket = new WebSocket(socketUrl())
  socket.onopen = () => { socketState.value = 'connected'; reconnectAttempts = 0 }
  socket.onmessage = async event => { try { const payload = JSON.parse(String(event.data)); if (payload?.type !== 'chat') return; const data = payload.data || {}; const chat = chats.value.find(item => String(item.id) === String(data.conversationId ?? data.conversation_id)); if (!chat || !data.content) return; if (!chat.messages.some(item => String(item.id) === String(data.id))) chat.messages.push(messageView(data, chat.userName)); chat.lastMessage = data.content; if (String(chat.id) === String(selectedId.value)) await scrollBottom(); else chat.unread++ } catch { /* 忽略格式异常的消息帧 */ } }
  socket.onerror = () => { socketState.value = 'disconnected' }
  socket.onclose = () => { socket = null; socketState.value = 'disconnected'; if (!stopped) { const delay = Math.min(30000, 1000 * 2 ** reconnectAttempts++); reconnectTimer = window.setTimeout(connectSocket, delay) } }
}
/** 接入会话（API: PUT /api/v1/admin/chat/conversations/:id/accept），将状态切换为人工接待 */
async function accept(chat: Chat) { try { await requestJson(`/api/v1/admin/chat/conversations/${chat.id}/accept`, { method: 'PUT', headers: headers(true), body: '{}' }); chat.status = 'active'; chat.agentName = props.agentName || '当前客服'; chat.agentRole = roleText(props.agentRole); pendingCount.value = Math.max(0, pendingCount.value - 1); notify('已接入会话') } catch (cause) { notify(cause instanceof Error ? cause.message : '接入失败', 'error') } }
/** 关闭会话（API: PUT /api/v1/admin/chat/conversations/:id/close） */
async function closeChat() { if (!closeTarget.value) return; const chat = closeTarget.value; try { await requestJson(`/api/v1/admin/chat/conversations/${chat.id}/close`, { method: 'PUT', headers: headers(true), body: '{}' }); chat.status = 'closed'; closeTarget.value = null; notify('会话已关闭') } catch (cause) { notify(cause instanceof Error ? cause.message : '关闭失败', 'error') } }
/** 发送文本消息：若会话待接入则先自动接入，通过WebSocket发送并本地追加消息 */
async function sendMessage() {
  const chat = selected.value; const content = messageInput.value.trim(); if (!chat || !content) return
  try { if (chat.status === 'pending' || chat.status === 'ai_active') await accept(chat); if (!socket || socket.readyState !== WebSocket.OPEN) { connectSocket(); throw new Error('客服实时连接未建立，请等待连接成功后再发送') }
    socket.send(JSON.stringify({ type: 'chat', data: { conversationId: Number(chat.id) || chat.id, content, messageType: 1 } })); chat.messages.push({ id: `local-${Date.now()}`, from: 'me', content, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }), isAI: false, isImage: false, senderName: props.agentName || '当前客服', senderRole: roleText(props.agentRole) }); chat.lastMessage = content; messageInput.value = ''; await scrollBottom()
  } catch (cause) { notify(cause instanceof Error ? cause.message : '发送失败', 'error') }
}
/** 触发图片选择器 */
function chooseImage() { if (!imageUploading.value) imageInput.value?.click() }
/** 上传图片并发送：先上传到服务器获取URL，再通过WebSocket发送图片消息 */
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
/** 会话状态 → [颜色类名, 中文标签] 映射，用于会话列表与详情中的状态徽章 */
function badge(status: Chat['status']) {
  if (status === 'pending') return ['yellow', '待接入']
  if (status === 'ai_active') return ['blue', 'AI接待中']
  if (status === 'active') return ['green', '人工接待中']
  return ['gray', '已关闭']
}

// 组件挂载：加载待接入数和会话列表，建立WebSocket连接
onMounted(async () => { await Promise.all([loadPending(), loadChats()]); connectSocket() })
// 组件卸载：停止重连，清除定时器，关闭WebSocket
onUnmounted(() => { stopped = true; clearTimeout(reconnectTimer); socket?.close(); socket = null })
</script>

<template>
  <!-- 搜索工具栏：关键词搜索 + 状态筛选 + WebSocket连接状态 -->
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
    <!-- WebSocket实时连接状态指示器 -->
    <span class="status-badge" :class="socketState === 'connected' ? 'green' : socketState === 'connecting' ? 'yellow' : 'red'"><span class="dot"></span> {{ socketState === 'connected' ? '实时连接' : socketState === 'connecting' ? '连接中' : '连接断开' }}</span>
  </div>
  <!-- 客服统计卡片区 -->
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
  <!-- 错误提示 -->
  <div v-if="error" class="stock-list-error">{{ error }}</div>
  <!-- 会话区域：左侧会话列表 + 右侧聊天窗口 -->
  <div class="card" style="flex:1">
    <div class="card-body no-pad system-chat-layout">
      <!-- 左侧会话列表面板 -->
      <div class="system-chat-sidebar">
        <div class="system-chat-sidebar-header">
          <span class="title"><i class="fas fa-comments"></i> 会话列表</span>
          <span class="count">共 {{ total }} 条</span>
        </div>
        <div class="system-chat-sidebar-body">
          <!-- 加载中 -->
          <div v-if="loading" class="stock-table-state"><i class="fas fa-spinner fa-spin"></i></div>
          <!-- 会话列表项 -->
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
        <!-- 会话列表分页 -->
        <div v-if="totalPages > 1" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-top:1px solid #e2e8f0">
          <button class="icon-btn" :disabled="page<=1" @click="changePage(page-1)"><i class="fas fa-angle-left"></i></button>
          <span>{{ page }} / {{ totalPages }}</span>
          <button class="icon-btn" :disabled="page>=totalPages" @click="changePage(page+1)"><i class="fas fa-angle-right"></i></button>
        </div>
      </div>
    <!-- 右侧聊天主区域 -->
    <div class="system-chat-main">
      <!-- 选中会话时显示聊天界面 -->
      <template v-if="selected">
        <!-- 聊天头部：用户信息 + 接入/关闭按钮 -->
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
        <!-- 消息列表区域 -->
        <div ref="messageBox" class="system-chat-messages">
          <!-- 消息气泡 -->
          <div v-for="message in selected.messages" :key="message.id" class="system-chat-message" :class="message.from">
            <div class="system-chat-message-bubble">
              <!-- 发送者身份标识 -->
              <div class="message-identity"><i :class="message.isAI ? 'fas fa-robot' : message.from === 'me' ? 'fas fa-headset' : 'fas fa-user'"></i> <span>{{ message.isAI ? message.senderRole : message.senderName ? `${message.senderName} · ${message.senderRole}` : message.senderRole }}</span></div>
              <!-- 图片消息 -->
              <a v-if="message.isImage" :href="message.content" target="_blank" rel="noopener noreferrer"><img class="chat-message-image" :src="message.content" alt="聊天图片" /></a>
              <!-- 文本消息 -->
              <div v-else class="message-content">{{ message.content }}</div>
              <!-- 消息时间 -->
              <div class="system-chat-message-time">{{ message.time }}</div>
            </div>
          </div>
        </div>
        <!-- 消息输入区域：图片上传 + 文本输入 + 发送 -->
        <div class="system-chat-input-area">
          <input ref="imageInput" type="file" accept="image/*" hidden @change="uploadImage" />
          <button class="btn btn-outline btn-sm" :disabled="imageUploading" title="上传并发送图片" @click="chooseImage"><i :class="imageUploading ? 'fas fa-spinner fa-spin' : 'fas fa-image'"></i></button>
          <input v-model="messageInput" id="chatInput" class="system-chat-input" placeholder="输入消息，按回车发送……" @keydown.enter.prevent="sendMessage" />
          <button class="btn btn-primary" @click="sendMessage"><i class="fas fa-paper-plane"></i></button>
        </div>
      </template>
      <!-- 未选中会话时的空状态提示 -->
      <div v-else class="system-chat-empty">
        <div><i class="fas fa-comments"></i></div>
        <div class="system-chat-empty-text">请选择一个会话开始聊天</div>
      </div>
    </div>
  </div></div>
  <!-- 关闭会话确认弹窗 -->
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
/* 客服身份标识样式 */
.agent-identity{display:flex;align-items:center;gap:5px;margin-top:3px;color:#4f6ef7;font-size:12px;font-weight:600} /* 消息发送者身份栏 */
.message-identity{display:flex;align-items:center;gap:5px;margin-bottom:5px;padding-bottom:4px;border-bottom:1px solid rgb(148 163 184 / 22%);font-size:11px;font-weight:600;opacity:.82} /* 对方消息身份颜色 */
.system-chat-message.other .message-identity{color:#64748b} /* 己方消息身份颜色 */
.system-chat-message.me .message-identity{color:inherit} /* 聊天图片样式 */
.chat-message-image{display:block;max-width:240px;max-height:240px;border-radius:8px;object-fit:contain} /* 暗色主题适配 */
[data-theme='dark'] .agent-identity{color:#93c5fd}
</style>
