// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

const WS_BACKEND_HOST = 'ws://192.168.10.7:8089';
export const WS_BASE_URL = process.env.TARO_ENV === 'h5'
  ? (typeof window !== 'undefined'
      ? (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + '/api/v1/chat/ws'
      : '/api/v1/chat/ws')
  : `${WS_BACKEND_HOST}/api/v1/chat/ws`;

// 客服会话相关 API（位于 /chat 命名空间下）
export const chatApi = {
  // 发起客服会话 POST
  createConversation: `${API_BASE_URL}/chat/conversations`,
  // 获取会话列表 GET
  conversations: `${API_BASE_URL}/chat/conversations`,
  // 获取会话消息历史 GET
  messages: `${API_BASE_URL}/chat/conversations/:id/messages`,
  // 发送消息 POST（也走 WebSocket，HTTP 作为兜底）
  sendMessage: `${API_BASE_URL}/chat/conversations/:id/messages`,
  // 标记会话已读（用户） POST
  readConversation: `${API_BASE_URL}/chat/conversations/:id/read`,
};

// 通知消息相关 API（保留原有路径）
export const notificationApi = {
  list: `${API_BASE_URL}/notifications`,
  unreadCount: `${API_BASE_URL}/notifications/unread-count`,
  read: `${API_BASE_URL}/notifications/:id/read`,
  readAll: `${API_BASE_URL}/notifications/read-all`,
};

// 兼容旧引用（旧页面仍使用 serviceApi，指向 chat 命名空间）
export const serviceApi = chatApi;