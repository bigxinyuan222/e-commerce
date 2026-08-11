// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

// WebSocket 后端直连地址（用于 fallback 或非 H5 环境）
const WS_BACKEND_HOST = 'ws://192.168.10.7:8089';

/**
 * WebSocket 基础 URL 构造：
 * - H5 开发环境：使用相对路径（通过 devServer proxy ws:true 转发）
 * - H5 生产环境：默认使用当前 host + /api/v1/chat/ws（由部署层 nginx 代理）
 *   若代理不通，chatWS 会自动 fallback 到直连后端 WS_DIRECT_URL
 * - 小程序环境：直连后端 WS 地址
 */
export const WS_BASE_URL = (() => {
  if (process.env.TARO_ENV === 'h5') {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      return `${protocol}${window.location.host}/api/v1/chat/ws`;
    }
    return '/api/v1/chat/ws';
  }

  // 小程序：直连后端
  return `${WS_BACKEND_HOST}/api/v1/chat/ws`;
})();

/**
 * WebSocket 直连后端地址（fallback 用）
 * 当代理方式连接失败时，chatWS 会自动切换到此地址
 */
export const WS_DIRECT_URL = `${WS_BACKEND_HOST}/api/v1/chat/ws`;

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