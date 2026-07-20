// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

export const serviceApi = {
    conversation: `${API_BASE_URL}/conversations`,
    conversations: `${API_BASE_URL}/conversations`,
    messages: `${API_BASE_URL}/conversations/:id/messages`,
    sendMessage: `${API_BASE_URL}/conversations/:id/messages`
};

export const notificationApi = {
    list: `${API_BASE_URL}/notifications`,
    unreadCount: `${API_BASE_URL}/notifications/unread-count`,
    read: `${API_BASE_URL}/notifications/:id/read`,
    readAll: `${API_BASE_URL}/notifications/read-all`
};