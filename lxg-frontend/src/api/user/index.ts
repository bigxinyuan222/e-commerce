// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
// 小程序端不受 CORS 限制，直接使用完整后端地址
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

export const authApi = {
    register: `${API_BASE_URL}/auth/register`,// 注册接口
    registerSendCode: `${API_BASE_URL}/auth/registerofsendcode`,// 发送验证码
    login: `${API_BASE_URL}/auth/login`,// 登录接口
    wechatLogin: `${API_BASE_URL}/auth/wechat-login`,
    setPassword: `${API_BASE_URL}/auth/set-password`
};

export const userApi = {
    profile: `${API_BASE_URL}/user/profile`
};

export const couponApi = {
    available: `${API_BASE_URL}/coupons/available`,
    mine: `${API_BASE_URL}/coupons/mine`,
    claim: `${API_BASE_URL}/coupons/:id/claim`
};