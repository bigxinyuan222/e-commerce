// ============================================
// 客服会话 Store（Zustand）
// 统一管理：会话列表、当前会话、消息历史、未读数
// ============================================

import { create } from 'zustand';
import Taro from '@tarojs/taro';
import { apiGet, apiPost, apiPut } from '@/api/common';
import { chatApi } from '@/api/message';
import chatWS, { WSInboundMessage, WSConnectionStatus } from '@/utils/chatWS';

// ---------- 类型定义 ----------
export type ChatSender = 'user' | 'service' | 'system';
export type ChatMessageType = 'text' | 'image' | 'order' | 'product' | 'system';
export type ChatMessageStatus = 'sending' | 'sent' | 'failed' | 'read';
export type ConversationStatus = 'ongoing' | 'closed';

export interface ChatMessage {
  id: string;
  conversationId: string;
  type: ChatMessageType;
  content: string;
  sender: ChatSender;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  createTime: string;
  timestamp?: number;
  status: ChatMessageStatus;
  // 富媒体扩展
  extra?: {
    orderId?: string;
    productId?: string;
    productName?: string;
    productImage?: string;
    imageUrl?: string;
  };
}

export interface ChatConversation {
  id: string;
  title: string;
  name?: string;
  avatar?: string;
  avatarUrl?: string;
  lastMessage?: string;
  content?: string;
  lastTime?: string;
  time?: string;
  unreadCount: number;
  status: ConversationStatus;
  serviceName?: string;
  serviceAvatar?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface ChatStoreState {
  // 连接
  wsStatus: WSConnectionStatus;
  wsConnected: boolean;

  // 列表
  conversations: ChatConversation[];
  conversationsLoading: boolean;
  conversationsLoaded: boolean;

  // 当前会话
  currentConversationId: string | null;
  currentConversation: ChatConversation | null;

  // 消息
  messagesMap: Record<string, ChatMessage[]>;   // conversationId -> messages
  messagesLoadingMap: Record<string, boolean>;  // conversationId -> loading
  messagesLoadedMap: Record<string, boolean>;   // conversationId -> loaded
  messageCursorMap: Record<string, number>;     // conversationId -> 分页游标

  // 订阅清理函数
  _wsUnsubscribers: Array<() => void>;
  _subscribed: boolean;
}

interface ChatStoreActions {
  // ---------- 连接生命周期 ----------
  init: () => void;
  dispose: () => void;
  connectWS: () => void;
  disconnectWS: () => void;

  // ---------- 会话列表 ----------
  fetchConversations: (forceRefresh?: boolean) => Promise<ChatConversation[]>;
  createConversation: (payload?: Record<string, any>) => Promise<ChatConversation | null>;
  markConversationRead: (conversationId: string) => Promise<void>;
  transferToHuman: (conversationId: string) => Promise<boolean>;
  getConversation: (id: string) => ChatConversation | undefined;

  // ---------- 当前会话 ----------
  setCurrentConversation: (id: string | null) => Promise<void>;
  enterConversation: (id: string) => Promise<void>;
  leaveConversation: () => void;

  // ---------- 消息 ----------
  fetchMessages: (conversationId: string, forceRefresh?: boolean) => Promise<ChatMessage[]>;
  sendMessage: (
    conversationId: string,
    payload: {
      type: ChatMessageType;
      content: string;
      extra?: ChatMessage['extra'];
    }
  ) => Promise<ChatMessage | null>;
  addMessage: (msg: ChatMessage) => void;
  updateMessage: (conversationId: string, msgId: string, patch: Partial<ChatMessage>) => void;
  getMessages: (conversationId: string) => ChatMessage[];

  // ---------- 未读数 ----------
  getTotalUnread: () => number;
  clearAllUnread: () => void;

  // ---------- 重置 ----------
  reset: () => void;
}

export type ChatStore = ChatStoreState & ChatStoreActions;

// ---------- 工具函数 ----------
function formatTime(ts?: number | string): string {
  if (!ts) return '';
  const d = typeof ts === 'number' ? new Date(ts) : new Date(ts);
  if (isNaN(d.getTime())) return String(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function normalizeConversation(raw: any): ChatConversation {
  return {
    ...(raw || {}),
    id: String(raw.id ?? raw.ID ?? raw.Id ?? raw.conversationId ?? raw.ConversationId ?? raw.conv_id ?? ''),
    title: raw.title ?? raw.Title ?? raw.name ?? raw.Name ?? '乐享购官方客服',
    unreadCount: Number(raw.unreadCount ?? raw.UnreadCount ?? raw.unread_count ?? 0),
    status: (raw.status === 'closed' || raw.Status === 0 || raw.Status === 'closed') ? 'closed' : 'ongoing',
    lastMessage: raw.lastMessage ?? raw.LastMessage ?? raw.content ?? raw.Content ?? raw.last_message ?? '',
    lastTime: raw.lastTime ?? raw.LastTime ?? raw.time ?? raw.UpdatedAt ?? raw.updatedAt ?? raw.createdAt ?? raw.CreatedAt ?? '',
  };
}

// ---------- 当前用户信息获取 ----------
// 兼容小程序与 H5 的 Base64 解码（JWT payload 解析用）
function base64Decode(input: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let i = 0;
  while (i < input.length) {
    const enc1 = chars.indexOf(input.charAt(i++));
    const enc2 = chars.indexOf(input.charAt(i++));
    const enc3 = chars.indexOf(input.charAt(i++));
    const enc4 = chars.indexOf(input.charAt(i++));
    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;
    output += String.fromCharCode(chr1);
    if (enc3 !== 64) output += String.fromCharCode(chr2);
    if (enc4 !== 64) output += String.fromCharCode(chr3);
  }
  // 将 Latin-1 字节序列转换为 UTF-8 字符串
  try {
    return decodeURIComponent(
      output
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return output;
  }
}

// 优先读取 userInfo（登录后保存的完整用户信息，包含 id），然后读取 lxg_user，兼容多种 ID 字段名
function _getCurrentUserId(): string | null {
  try {
    let raw: any = null;
    let source = '';

    // 1. 优先读取 userInfo（登录后保存的完整用户信息，包含 id）
    try {
      const userInfo = Taro.getStorageSync('userInfo');
      console.log('[ChatStore] _getCurrentUserId: userInfo 原始值:', typeof userInfo, JSON.stringify(userInfo)?.slice(0, 200));
      if (userInfo) {
        raw = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
        source = 'userInfo';
      }
    } catch (e) {
      console.error('[ChatStore] _getCurrentUserId: 读取 userInfo 失败:', e);
    }

    // 2. 回退读取 lxg_user（部分场景下 userInfo 不存在）
    if (!raw) {
      try {
        const lxgUser = Taro.getStorageSync('lxg_user');
        console.log('[ChatStore] _getCurrentUserId: lxg_user 原始值:', typeof lxgUser, JSON.stringify(lxgUser)?.slice(0, 200));
        if (lxgUser) {
          const parsed = typeof lxgUser === 'string' ? JSON.parse(lxgUser) : lxgUser;
          // lxg_user 结构: { token, user }，但 user 里可能没有 id
          raw = parsed?.user ?? parsed ?? null;
          source = 'lxg_user';
          console.log('[ChatStore] _getCurrentUserId: lxg_user 解析后 user:', JSON.stringify(parsed?.user)?.slice(0, 200));
        }
      } catch (e) {
        console.error('[ChatStore] _getCurrentUserId: 读取 lxg_user 失败:', e);
      }
    }

    // 3. H5 环境再尝试 localStorage
    if (!raw && typeof localStorage !== 'undefined') {
      try {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          raw = JSON.parse(userInfo);
          source = 'localStorage.userInfo';
        }
        if (!raw) {
          const lxgUser = localStorage.getItem('lxg_user');
          if (lxgUser) {
            const parsed = JSON.parse(lxgUser);
            raw = parsed?.user ?? parsed ?? null;
            source = 'localStorage.lxg_user';
          }
        }
      } catch {}
    }

    if (raw) {
      const id =
        raw.id ??
        raw.ID ??
        raw.Id ??
        raw.userId ??
        raw.UserId ??
        raw.user_id ??
        raw.User_id ??
        raw.uid ??
        raw.Uid ??
        raw.userID ??
        raw.sub ??
        raw.openid ??
        raw.OpenId ??
        raw.open_id ??
        '';
      console.log('[ChatStore] _getCurrentUserId: 提取结果', { source, id, rawKeys: Object.keys(raw) });
      if (id !== undefined && id !== null && id !== '') {
        return String(id);
      }
    }

    // 兜底：从 JWT token 中解析用户 ID（user_id / sub / id）
    try {
      const lxgUserRaw = Taro.getStorageSync('lxg_user');
      if (lxgUserRaw) {
        const lxgUser = typeof lxgUserRaw === 'string' ? JSON.parse(lxgUserRaw) : lxgUserRaw;
        const token = lxgUser?.token ?? lxgUser?.Token ?? lxgUser?.user?.token ?? '';
        if (token) {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            const payloadJson = base64Decode(payloadBase64);
            const payload = JSON.parse(payloadJson);
            const tokenId =
              payload.user_id ?? payload.userId ??
              payload.sub ?? payload.id ?? payload.ID ?? '';
            if (tokenId !== undefined && tokenId !== null && tokenId !== '') {
              console.log('[ChatStore] _getCurrentUserId: 从 token 提取到用户 ID', tokenId);
              return String(tokenId);
            }
          }
        }
      }
    } catch (e) {
      console.error('[ChatStore] _getCurrentUserId: 从 token 解析用户 ID 失败:', e);
    }

    console.warn('[ChatStore] _getCurrentUserId: 未找到任何用户信息');
  } catch (err) {
    console.error('[ChatStore] _getCurrentUserId 失败:', err);
  }
  return null;
}

// 客服/服务端发送者的识别关键词
const SERVICE_SENDER_KEYWORDS = ['service', 'agent', 'admin', 'cs', 'customer_service', 'customer-service', 'customerService', 'staff', 'operator', 'kefu', '客服', '客服小乐', '小乐', 'ai客服', 'robot', 'bot', 'assistant', 'support'];
const SERVICE_NAME_KEYWORDS = ['客服', '小乐', 'AI客服', '客服小乐', '乐享购', '官方客服'];
// 用户发送者的识别关键词（用于反向排除）
const USER_SENDER_KEYWORDS = ['user', 'customer', 'client', 'buyer', 'member', 'visitor', 'guest', '用户', '客户'];

function _isServiceSender(raw: any): boolean {
  const currentUserId = _getCurrentUserId();

  // ===== 策略1：基于用户ID比较（最可靠）=====
  // 检查消息的发送者ID是否与当前用户ID匹配 → 匹配则是用户
  if (currentUserId) {
    const msgSenderId = String(
      raw.senderId ?? raw.SenderId ?? raw.sender_id ?? raw.userId ?? raw.user_id ?? raw.UserId ?? raw.createdBy ?? raw.created_by ?? raw.CreatedBy ?? ''
    ).trim();
    if (msgSenderId && msgSenderId === currentUserId) {
      console.log('[ChatStore] _isServiceSender: 通过用户ID匹配为用户消息', { msgSenderId, currentUserId });
      return false;
    }
    // 如果消息有 senderId 但不匹配当前用户 → 可能是客服
    if (msgSenderId && msgSenderId !== currentUserId) {
      console.log('[ChatStore] _isServiceSender: senderId 不匹配当前用户，判定为客服消息', { msgSenderId, currentUserId });
      return true;
    }
  }

  // ===== 策略2：检查 sender 字段关键词 =====
  const senderRaw = String(raw.sender ?? raw.Sender ?? raw.senderType ?? raw.role ?? raw.sender_role ?? '').toLowerCase().trim();

  // 先检查是否明确为用户关键词
  if (senderRaw && USER_SENDER_KEYWORDS.some(kw => senderRaw === kw || senderRaw.includes(kw))) {
    return false;
  }

  // 再检查是否明确为客服关键词
  if (senderRaw && SERVICE_SENDER_KEYWORDS.some(kw => senderRaw === kw || senderRaw.includes(kw))) {
    return true;
  }

  // sender 字段为纯数字枚举：常见 0=用户, 1=客服, 2=系统/管理员
  if (senderRaw !== '' && /^\d+$/.test(senderRaw)) {
    const numSender = Number(senderRaw);
    if (numSender === 0) return false;        // 用户
    if (numSender === 1 || numSender === 2 || numSender === 3 || numSender === 9) return true; // 客服/系统
  }

  // ===== 策略3：检查 senderName 名称关键词 =====
  const nameRaw = String(raw.senderName ?? raw.SenderName ?? raw.sender_name ?? raw.name ?? '').toLowerCase().trim();
  if (nameRaw) {
    if (SERVICE_NAME_KEYWORDS.some(kw => nameRaw.includes(kw.toLowerCase()))) {
      return true;
    }
    if (USER_SENDER_KEYWORDS.some(kw => nameRaw.includes(kw))) {
      return false;
    }
  }

  // ===== 策略4：检查头像 URL 关键词 =====
  const avatarRaw = String(raw.senderAvatar ?? raw.SenderAvatar ?? raw.sender_avatar ?? raw.avatar ?? '').toLowerCase();
  if (avatarRaw && SERVICE_SENDER_KEYWORDS.some(kw => avatarRaw.includes(kw))) {
    return true;
  }

  // ===== 策略5：检查 userType / UserType 数值枚举 =====
  // 后端可能用 0=用户, 1=客服 等数字枚举
  const userType = raw.userType ?? raw.UserType ?? raw.user_type ?? raw.sender_type;
  if (userType !== undefined && userType !== null) {
    const numType = Number(userType);
    if (!isNaN(numType)) {
      // 常见枚举：0=用户, 1=客服/管理员
      if (numType === 0 || numType === 2) return false; // 用户
      if (numType === 1 || numType === 3 || numType === 9) return true; // 客服
    }
  }

  // 无法确定时，默认当作用户（user），并打印警告
  console.warn('[ChatStore] _isServiceSender: 无法确定 sender 类型，默认当作 user', {
    senderRaw,
    nameRaw,
    userType,
    rawKeys: Object.keys(raw || {}),
    raw,
  });
  return false;
}

function normalizeMessage(raw: any, conversationId?: string): ChatMessage {
  const isServiceSender = _isServiceSender(raw);
  const sender: ChatSender = isServiceSender ? 'service' : 'user';

  const ts = raw.timestamp ?? raw.Timestamp ?? raw.createTime ?? raw.CreateTime ?? raw.created_at ?? raw.createdAt ?? Date.now();

  return {
    id: String(raw.id ?? raw.ID ?? raw.Id ?? raw.messageId ?? raw.MessageId ?? raw.msg_id ?? `m-${Math.random().toString(36).slice(2, 10)}`),
    conversationId: conversationId || String(raw.conversationId ?? raw.ConversationId ?? raw.conv_id ?? ''),
    type: (['text', 'image', 'order', 'product', 'system'].includes(raw.type ?? raw.Type) ? (raw.type ?? raw.Type) : 'text') as ChatMessageType,
    content: String(raw.content ?? raw.Content ?? raw.message ?? raw.text ?? ''),
    sender,
    senderId: raw.senderId ?? raw.SenderId ?? raw.sender_id ?? raw.userId ?? raw.user_id,
    senderName: raw.senderName ?? raw.SenderName ?? raw.sender_name,
    senderAvatar: raw.senderAvatar ?? raw.SenderAvatar ?? raw.sender_avatar ?? raw.avatar,
    createTime: typeof ts === 'number' ? formatTime(ts) : String(ts),
    timestamp: typeof ts === 'number' ? ts : new Date(ts).getTime(),
    status: (['sending', 'sent', 'failed', 'read'].includes(raw.status ?? raw.Status) ? (raw.status ?? raw.Status) : 'sent') as ChatMessageStatus,
    extra: raw.extra ?? raw.payload ?? undefined,
  };
}

// ---------- Store 创建 ----------
export const useChatStore = create<ChatStore>((set, get) => ({
  // ============ state ============
  wsStatus: 'idle' as WSConnectionStatus,
  wsConnected: false,

  conversations: [],
  conversationsLoading: false,
  conversationsLoaded: false,

  currentConversationId: null,
  currentConversation: null,

  messagesMap: {},
  messagesLoadingMap: {},
  messagesLoadedMap: {},
  messageCursorMap: {},

  _wsUnsubscribers: [],
  _subscribed: false,

  // ============ actions ============

  /**
   * 初始化：绑定 WS 订阅，但不自动连接（由页面触发）
   */
  init: () => {
    const state = get();
    if (state._subscribed) return;

    const unsub1 = chatWS.onMessage((msg) => _handleWSMessage(msg));
    const unsub2 = chatWS.onStatusChange((s) => {
      set({ wsStatus: s, wsConnected: s === 'open' });
      // 连接成功时可刷新一次列表
      if (s === 'open') {
        get().fetchConversations(true).catch(() => {});
      }
    });
    set({ _wsUnsubscribers: [unsub1, unsub2], _subscribed: true });
  },

  dispose: () => {
    const state = get();
    state._wsUnsubscribers.forEach((fn) => fn());
    chatWS.disconnect();
    set({ _wsUnsubscribers: [], _subscribed: false, wsStatus: 'idle', wsConnected: false });
  },

  connectWS: () => chatWS.connect(),
  disconnectWS: () => chatWS.disconnect(),

  // =============== 会话列表 ===============
  async fetchConversations(forceRefresh = false) {
    const state = get();
    if (!forceRefresh && state.conversationsLoaded && !state.conversationsLoading) {
      return state.conversations;
    }
    set({ conversationsLoading: true });
    try {
      const res = await apiGet(chatApi.conversations);
      const data = res?.data ?? res?.result ?? res ?? [];
      const list = (Array.isArray(data) ? data : data?.list ?? []).map(normalizeConversation);
      // 按更新时间倒序
      list.sort((a, b) => {
        const at = new Date(a.lastTime || a.updatedAt || 0).getTime();
        const bt = new Date(b.lastTime || b.updatedAt || 0).getTime();
        return bt - at;
      });
      // 如果当前有会话，同步更新 currentConversation
      const curId = state.currentConversationId;
      const curConv = curId ? list.find((c) => c.id === curId) ?? null : null;
      set({
        conversations: list,
        conversationsLoaded: true,
        currentConversation: curConv ?? state.currentConversation,
      });
      return list;
    } catch (err: any) {
      console.error('[ChatStore] fetchConversations 失败:', err);
      Taro.showToast({ title: err.message || '加载会话失败', icon: 'none' });
      return state.conversations;
    } finally {
      set({ conversationsLoading: false });
    }
  },

  async createConversation(payload = {}) {
    try {
      // 后端使用 ShouldBindJSON 绑定，必须用 JSON 格式提交
      const res = await apiPost(chatApi.createConversation, payload, {}, {}, false);
      const data = res?.data ?? res;
      const conv = normalizeConversation(data);
      if (!conv.id) {
        console.warn('[ChatStore] createConversation 返回无 ID:', data);
        return null;
      }
      // 插入列表头部
      set((s) => {
        const exists = s.conversations.some((c) => c.id === conv.id);
        return {
          conversations: exists
            ? s.conversations.map((c) => (c.id === conv.id ? { ...c, ...conv } : c))
            : [conv, ...s.conversations],
        };
      });
      return conv;
    } catch (err: any) {
      console.error('[ChatStore] createConversation 失败:', err);
      Taro.showToast({ title: err.message || '发起会话失败', icon: 'none' });
      return null;
    }
  },

  async markConversationRead(conversationId: string) {
    if (!conversationId) {
      console.warn('[ChatStore] markConversationRead: conversationId 为空，跳过');
      return;
    }
    try {
      console.log('[ChatStore] markConversationRead 开始, id:', conversationId);
      // 后端"标记已读"接口为 PUT 方法，路径 /chat/conversations/:id/read
      const res = await apiPut(chatApi.readConversation, {}, { id: conversationId });
      console.log('[ChatStore] markConversationRead 成功, 后端返回:', res);
      // 乐观更新本地
      set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === conversationId ? { ...c, unreadCount: 0 } : c
        ),
        currentConversation:
          s.currentConversation?.id === conversationId
            ? { ...s.currentConversation, unreadCount: 0 }
            : s.currentConversation,
      }));
    } catch (err: any) {
      console.error('[ChatStore] markConversationRead 失败:', err);
    }
  },

  /**
   * 转人工客服
   * 后端接口: PUT /chat/conversations/:id/transfer-human
   * 成功返回 true，失败返回 false
   */
  async transferToHuman(conversationId: string) {
    if (!conversationId) return false;
    try {
      const res = await apiPut(chatApi.transferHuman, {}, { id: conversationId });
      console.log('[ChatStore] transferToHuman 成功:', res);
      // 刷新会话列表，获取最新的客服分配信息
      get().fetchConversations(true).catch(() => {});
      // 刷新当前会话消息，可能后端会推送一条系统消息（如"已为您转接人工客服"）
      get().fetchMessages(conversationId, true).catch(() => {});
      return true;
    } catch (err: any) {
      console.error('[ChatStore] transferToHuman 失败:', err);
      Taro.showToast({ title: err?.message || '转人工失败', icon: 'none' });
      return false;
    }
  },

  getConversation(id: string) {
    return get().conversations.find((c) => c.id === id);
  },

  // =============== 当前会话 ===============
  async setCurrentConversation(id: string | null) {
    set({ currentConversationId: id });
    if (id) {
      const conv = get().conversations.find((c) => c.id === id) ?? null;
      set({ currentConversation: conv });
      // 尝试预加载消息
      await get().fetchMessages(id, false);
    } else {
      set({ currentConversation: null });
    }
  },

  async enterConversation(id: string) {
    await get().setCurrentConversation(id);
    // 进入会话即标记已读
    await get().markConversationRead(id);
    // 确保 WS 连接
    if (!get().wsConnected) chatWS.connect();
  },

  leaveConversation() {
    get().setCurrentConversation(null);
  },

  // =============== 消息 ===============
  async fetchMessages(conversationId: string, forceRefresh = false) {
    if (!conversationId) return [];
    const state = get();
    const key = conversationId;
    if (!forceRefresh && state.messagesLoadedMap[key] && !state.messagesLoadingMap[key]) {
      return state.messagesMap[key] ?? [];
    }
    set((s) => ({
      messagesLoadingMap: { ...s.messagesLoadingMap, [key]: true },
    }));

    // 后端无 HTTP 消息历史接口，通过 WebSocket 请求历史消息
    try {
      if (!get().wsConnected) {
        console.log('[ChatStore] fetchMessages: WS 未连接，先建立连接');
        chatWS.connect();
      }

      // 通过 WS 请求历史消息
      const historyResult = await new Promise<ChatMessage[]>((resolve) => {
        let resolved = false;
        let unsubListener: (() => void) | null = null;

        const cleanup = () => {
          if (unsubListener) { unsubListener(); unsubListener = null; }
        };

        const timeoutId = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            cleanup();
            console.log('[ChatStore] fetchMessages: WS 历史消息请求超时，返回已有消息');
            resolve(state.messagesMap[key] ?? []);
          }
        }, 3000);

        // 监听后端回推的历史消息
        unsubListener = chatWS.onMessage((inbound) => {
          if (resolved) return;
          const { type, data } = inbound;
          if (type === 'messages/history' || String(type) === 'message/history' || String(type) === 'history') {
            resolved = true;
            clearTimeout(timeoutId);
            cleanup();
            const rawList = Array.isArray(data) ? data : data?.list ?? data?.records ?? data?.messages ?? [];
            const list: ChatMessage[] = rawList
              .map((raw: any) => normalizeMessage(raw, conversationId))
              .sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
            set((s) => ({
              messagesMap: { ...s.messagesMap, [key]: list },
              messagesLoadedMap: { ...s.messagesLoadedMap, [key]: true },
            }));
            resolve(list);
          }
        });

        // 发送历史消息请求（conversationId 统一为字符串格式）
        const convIdStr = String(conversationId);
        chatWS.send({
          type: 'messages/history',
          data: {
            conversationId: convIdStr,
            conversation_id: convIdStr,
            conv_id: convIdStr,
          },
          id: `history-${Date.now()}`,
        });
      });

      return historyResult;
    } catch (err: any) {
      console.error('[ChatStore] fetchMessages 失败:', err);
      return state.messagesMap[key] ?? [];
    } finally {
      set((s) => ({
        messagesLoadingMap: { ...s.messagesLoadingMap, [key]: false },
      }));
    }
  },

  async sendMessage(conversationId, payload) {
    if (!conversationId || !payload.content?.trim()) return null;

    // 1. 构造本地乐观消息（sending 状态）
    const tempId = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const optimisticMsg: ChatMessage = {
      id: tempId,
      conversationId,
      type: payload.type,
      content: payload.content,
      sender: 'user',
      createTime: formatTime(Date.now()),
      timestamp: Date.now(),
      status: 'sending',
      extra: payload.extra,
    };

    get().addMessage(optimisticMsg);

    // 2. 确保 WS 已连接（后端仅支持通过 WebSocket 发送消息并持久化，无 HTTP POST 接口）
    if (!get().wsConnected) {
      console.log('[ChatStore] sendMessage: WS 未连接，正在建立连接...');
      chatWS.connect();
    }

    // 3. 通过 WebSocket 发送消息（后端 WS 处理器负责持久化到数据库 + 广播）
    //    后端要求格式: { type: "chat", data: { conversationId: <string>, senderId: <string>, content: <string>, messageType: <number> } }
    //    注意：conversationId 和 senderId 必须是字符串格式（带引号），不能是数字，也不能是空字符串
    const currentUserId = _getCurrentUserId();
    const convIdStr = String(conversationId).trim();
    const senderIdStr = String(currentUserId ?? '').trim();

    if (!convIdStr || !senderIdStr) {
      console.error('[ChatStore] sendMessage: conversationId 或 senderId 为空，拒绝发送', {
        conversationId,
        convIdStr,
        currentUserId,
        senderIdStr,
      });
      Taro.showToast({ title: '会话信息不完整，请重新登录后重试', icon: 'none' });
      get().updateMessage(conversationId, tempId, { status: 'failed' });
      return null;
    }

    // 消息类型映射：1=文本消息 2=图片消息 3=订单消息 4=商品消息 0=系统消息
    const messageTypeMap: Record<ChatMessageType, number> = {
      text: 1,
      image: 2,
      order: 3,
      product: 4,
      system: 0,
    };
    const wsMsg = {
      type: 'chat' as const,
      data: {
        conversationId: convIdStr,
        senderId: senderIdStr,
        content: payload.content,
        messageType: messageTypeMap[payload.type] ?? 1,
      },
      id: tempId,
    };
    console.log('[ChatStore] sendMessage: 通过 WebSocket 发送', {
      wsStatus: get().wsStatus,
      wsConnected: get().wsConnected,
      msg: wsMsg,
    });
    const sent = chatWS.send(wsMsg);
    if (!sent) {
      console.warn('[ChatStore] sendMessage: WS 未就绪，消息已入队，将在连接后自动 flush');
    }

    // 4. 等待后端通过 WS 回推 message/new 确认（后端持久化后会广播该消息）
    //    超时 3s 后乐观标记为 sent（后端无 HTTP 消息接口，WS 是唯一通道）
    return new Promise((resolve) => {
      let resolved = false;
      let unsubListener: (() => void) | null = null;

      const cleanup = () => {
        if (unsubListener) {
          unsubListener();
          unsubListener = null;
        }
      };

      const timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          cleanup();
          const cur = get().getMessages(conversationId).find((m) => m.id === tempId);
          if (cur && cur.status === 'sending') {
            // 超时仍未收到回推，乐观标记为 sent（消息已在 WS 发送队列中）
            get().updateMessage(conversationId, tempId, { status: 'sent' });
            console.warn('[ChatStore] sendMessage: 等待 WS 回推超时，乐观标记为 sent');
          }
          resolve(cur ?? null);
        }
      }, 3000);

      // 监听 WS 入站消息，捕捉后端回推的同内容消息（确认持久化成功）
      unsubListener = chatWS.onMessage((inbound) => {
        if (resolved) return;
        const { type, data } = inbound;

        // 后端广播了新消息（type 可能是 "chat" 或 "message/new"，都视为新消息）
        if ((type === 'chat' || type === 'message/new') && data) {
          const inConvId = String(data.conversationId ?? data.conv_id ?? data.ConversationId ?? '');
          const isUserSender = !_isServiceSender(data);
          const inContent = String(data.content ?? data.Content ?? data.message ?? data.text ?? '');
          if (inConvId === conversationId && isUserSender && inContent === optimisticMsg.content) {
            // 回推消息 ID 与临时 ID 不同：用服务端消息替换本地乐观消息
            const serverMsgId = String(data.id ?? data.ID ?? data.Id ?? data.messageId ?? data.MessageId ?? data.msg_id ?? '');
            if (serverMsgId && serverMsgId !== tempId) {
              set((s) => ({
                messagesMap: {
                  ...s.messagesMap,
                  [conversationId]: (s.messagesMap[conversationId] ?? []).filter((m) => m.id !== tempId),
                },
              }));
            }
            resolved = true;
            clearTimeout(timeoutId);
            cleanup();
            const normalized = normalizeMessage(data, conversationId);
            // 若未被替换，则只更新状态
            const existing = get().getMessages(conversationId).find((m) => m.id === tempId);
            if (existing) {
              get().updateMessage(conversationId, tempId, { status: 'sent' });
              resolve(existing);
            } else {
              resolve(normalized);
            }
          }
        }
      });
    }) as Promise<ChatMessage | null>;
  },

  addMessage(msg: ChatMessage) {
    const key = msg.conversationId;
    set((s) => {
      const prev = s.messagesMap[key] ?? [];
      // 去重（按 id）
      if (prev.some((m) => m.id === msg.id)) {
        return {};
      }
      const list = [...prev, msg].sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
      return {
        messagesMap: { ...s.messagesMap, [key]: list },
      };
    });
    // 更新会话 lastMessage / lastTime / 未读
    const curConvId = get().currentConversationId;
    const isInCurrentView = curConvId === key;
    set((s) => ({
      conversations: s.conversations.map((c) => {
        if (c.id !== key) return c;
        return {
          ...c,
          lastMessage: msg.content,
          lastTime: msg.createTime,
          unreadCount: isInCurrentView ? 0 : (msg.sender !== 'user' ? c.unreadCount + 1 : c.unreadCount),
        };
      }),
    }));
  },

  updateMessage(conversationId, msgId, patch) {
    set((s) => {
      const list = s.messagesMap[conversationId] ?? [];
      return {
        messagesMap: {
          ...s.messagesMap,
          [conversationId]: list.map((m) => (m.id === msgId ? { ...m, ...patch } : m)),
        },
      };
    });
  },

  // _sendViaHttp 已移除：后端未注册 POST /chat/conversations/:id/messages 路由（返回 404）
  // 消息发送仅通过 WebSocket（type: 'message/send'），由后端 WS 处理器负责持久化 + 广播

  getMessages(conversationId) {
    return get().messagesMap[conversationId] ?? [];
  },

  // =============== 未读 ===============
  getTotalUnread() {
    return get().conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
  },

  clearAllUnread() {
    set((s) => ({
      conversations: s.conversations.map((c) => ({ ...c, unreadCount: 0 })),
      currentConversation: s.currentConversation
        ? { ...s.currentConversation, unreadCount: 0 }
        : null,
    }));
  },

  // =============== 重置 ===============
  reset() {
    chatWS.disconnect();
    const unsubs = get()._wsUnsubscribers;
    unsubs.forEach((fn) => fn());
    set({
      wsStatus: 'idle',
      wsConnected: false,
      conversations: [],
      conversationsLoading: false,
      conversationsLoaded: false,
      currentConversationId: null,
      currentConversation: null,
      messagesMap: {},
      messagesLoadingMap: {},
      messagesLoadedMap: {},
      messageCursorMap: {},
      _wsUnsubscribers: [],
      _subscribed: false,
    });
  },
}));

// ============ 内部：WS 消息分发 ============
function _handleWSMessage(msg: WSInboundMessage) {
  const store = useChatStore.getState();
  const { type, data } = msg;

  switch (type) {
    case 'chat':
    case 'message/new': {
      if (!data) return;
      const conversationId = String(data.conversationId ?? data.conv_id ?? data.ConversationId ?? store.currentConversationId ?? '');

      // 调试日志：打印 WS 推送的消息结构
      console.log('[ChatStore] WS 收到消息(type=' + type + ') 原始数据:', {
        dataKeys: Object.keys(data || {}),
        sender: data.sender ?? data.Sender ?? data.senderType ?? data.role ?? data.sender_role ?? data.userType ?? '(无)',
        senderName: data.senderName ?? data.SenderName ?? data.sender_name ?? data.name ?? '(无)',
        raw: JSON.stringify(data).slice(0, 300),
      });

      const chatMsg = normalizeMessage(data, conversationId);
      console.log('[ChatStore] WS 收到消息 标准化后:', { id: chatMsg.id, sender: chatMsg.sender, content: chatMsg.content?.slice(0, 30) });
      store.addMessage(chatMsg);
      // 如果不在当前会话 → 刷新未读（addMessage 内部已处理）
      break;
    }
    case 'message/read': {
      // 对方已读 → 更新消息状态
      const conversationId = String(data?.conversationId ?? store.currentConversationId ?? '');
      const msgIds: string[] = Array.isArray(data?.messageIds)
        ? data.messageIds.map(String)
        : data?.messageId
          ? [String(data.messageId)]
          : [];
      if (conversationId && msgIds.length) {
        msgIds.forEach((mid) => store.updateMessage(conversationId, mid, { status: 'read' }));
      } else if (conversationId) {
        // 全量标记该会话的 user 消息为 read
        const msgs = store.getMessages(conversationId);
        msgs.forEach((m) => {
          if (m.sender === 'user') store.updateMessage(conversationId, m.id, { status: 'read' });
        });
      }
      break;
    }
    case 'conversation/update': {
      if (data) {
        const conv = normalizeConversation(data);
        useChatStore.setState((s) => ({
          conversations: s.conversations.some((c) => c.id === conv.id)
            ? s.conversations.map((c) => (c.id === conv.id ? { ...c, ...conv } : c))
            : [conv, ...s.conversations],
          currentConversation:
            s.currentConversation?.id === conv.id
              ? { ...s.currentConversation, ...conv }
              : s.currentConversation,
        }));
      }
      break;
    }
    case 'conversation/read': {
      const convId = String(data?.conversationId ?? data?.id ?? '');
      if (convId) store.markConversationRead(convId).catch(() => {});
      break;
    }
    case 'system':
    case 'error': {
      console.log(`[ChatStore] WS ${type}:`, data);
      break;
    }
    default:
      console.debug('[ChatStore] 未处理 WS 消息类型:', type, data);
  }
}

export default useChatStore;
