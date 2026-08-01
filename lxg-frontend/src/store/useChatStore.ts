// ============================================
// 客服会话 Store（Zustand）
// 统一管理：会话列表、当前会话、消息历史、未读数
// ============================================

import { create } from 'zustand';
import Taro from '@tarojs/taro';
import { apiGet, apiPost } from '@/api/common';
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

function normalizeMessage(raw: any, conversationId?: string): ChatMessage {
  const senderRaw: string = String(raw.sender ?? raw.Sender ?? raw.senderType ?? raw.role ?? '');
  const sender: ChatSender = senderRaw === 'service' || senderRaw === 'agent' || senderRaw === 'admin'
    ? 'service'
    : senderRaw === 'system'
      ? 'system'
      : 'user';

  const ts = raw.timestamp ?? raw.Timestamp ?? raw.createTime ?? raw.CreateTime ?? raw.created_at ?? raw.createdAt ?? Date.now();

  return {
    id: String(raw.id ?? raw.ID ?? raw.Id ?? raw.messageId ?? raw.MessageId ?? raw.msg_id ?? `m-${Math.random().toString(36).slice(2, 10)}`),
    conversationId: conversationId || String(raw.conversationId ?? raw.ConversationId ?? raw.conv_id ?? ''),
    type: (['text', 'image', 'order', 'product', 'system'].includes(raw.type ?? raw.Type) ? (raw.type ?? raw.Type) : 'text') as ChatMessageType,
    content: String(raw.content ?? raw.Content ?? raw.message ?? raw.text ?? ''),
    sender,
    senderId: raw.senderId ?? raw.SenderId ?? raw.sender_id,
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
      // 项目约定：所有 POST 请求必须使用 form-urlencoded 格式
      const res = await apiPost(chatApi.createConversation, payload, {}, {}, true);
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
    if (!conversationId) return;
    try {
      // 项目约定：所有 POST 请求必须使用 form-urlencoded 格式
      await apiPost(chatApi.readConversation, {}, { id: conversationId }, {}, true);
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
    try {
      const res = await apiGet(chatApi.messages, {}, { id: conversationId });
      const data = res?.data ?? res?.result ?? res ?? [];
      const rawList = Array.isArray(data) ? data : data?.list ?? data?.records ?? [];
      const list: ChatMessage[] = rawList
        .map((raw) => normalizeMessage(raw, conversationId))
        .sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));

      set((s) => ({
        messagesMap: { ...s.messagesMap, [key]: list },
        messagesLoadedMap: { ...s.messagesLoadedMap, [key]: true },
      }));
      return list;
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

    // 2. 确保 WS 已连接（若未连接，chatWS.send 会自动入队，连接后 flush）
    if (!get().wsConnected) {
      chatWS.connect();
    }

    // 3. 通过 WebSocket 发送消息（chatWS 内部有发送队列，未连接时会暂存）
    const wsPayload = {
      type: 'message/send' as const,
      data: {
        conversationId,
        type: payload.type,
        content: payload.content,
        extra: payload.extra,
      },
      id: tempId,
    };

    chatWS.send(wsPayload);

    // 4. 等待最多 8 秒确认：通过 WS 推送的新消息视为 ACK；超时则乐观设为 sent
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
            get().updateMessage(conversationId, tempId, { status: 'sent' });
          }
          resolve(cur ?? null);
        }
      }, 8000);

      // 监听 WS 入站消息，捕捉后端回推的同内容消息或 ACK
      unsubListener = chatWS.onMessage((inbound) => {
        if (resolved) return;
        const { type, data } = inbound;

        // 后端广播了新的 user 消息
        if (type === 'message/new' && data) {
          const inConvId = String(data.conversationId ?? data.conv_id ?? '');
          const inSender = String(data.sender ?? data.Sender ?? data.senderType ?? data.role ?? '');
          const isUserSender = inSender !== 'service' && inSender !== 'agent' && inSender !== 'admin' && inSender !== 'system';
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
    case 'message/new': {
      if (!data) return;
      const conversationId = String(data.conversationId ?? data.conv_id ?? store.currentConversationId ?? '');
      const chatMsg = normalizeMessage(data, conversationId);
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
