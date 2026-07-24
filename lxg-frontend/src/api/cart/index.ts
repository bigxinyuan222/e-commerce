// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

export const cartApi = {
    list: `${API_BASE_URL}/cart`,
    add: `${API_BASE_URL}/cart`,
    update: `${API_BASE_URL}/cart/:id`,
    delete: `${API_BASE_URL}/cart/:id`,
    batchDelete: `${API_BASE_URL}/cart/batch-delete`
};

export const orderApi = {
    submit: `${API_BASE_URL}/orders`,
    list: `${API_BASE_URL}/orders`,
    detail: `${API_BASE_URL}/orders/:id`,
    cancel: `${API_BASE_URL}/orders/:id/cancel`,
    confirm: `${API_BASE_URL}/orders/:id/confirm`
};

export const refundApi = {
    reasonList: `${API_BASE_URL}/refund-reasons`,
    apply: `${API_BASE_URL}/refunds`,
    detail: `${API_BASE_URL}/refunds/:id`
};