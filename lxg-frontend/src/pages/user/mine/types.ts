// ============================================
// 我的页面 - 类型定义
// ============================================

// 用户信息类型
export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  accountName: string;
  gender: string;
  birthday: string;
  registerDate: string;
  email: string;
  isLoggedIn: boolean;
}

// 订单统计类型
export interface OrderStats {
  pendingPayment: number;
  pendingPickup: number;
  completed: number;
  refunding: number;
}

// 优惠券统计类型
export interface CouponStats {
  available: number;
  used: number;
  expired: number;
}

// 页面状态类型
export interface PageState {
  userInfo: UserInfo | null;
  orderStats: OrderStats;
  couponStats: CouponStats;
  loading: boolean;
}