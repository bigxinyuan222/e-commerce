// ============================================
// 我的页面 - 数据获取
// ============================================

import { UserInfo, OrderStats, CouponStats } from './types';

// 从全局数据导入
import { userInfo as defaultUserInfo } from '@/data/user/user';
import { getOrdersByStatus } from '@/data/order/orders';
import { myCoupons } from '@/data/common/coupons';

// 获取用户信息
export function getUserInfo(): UserInfo | null {
  // 从localStorage获取登录状态
  const storedUserInfo = localStorage.getItem('userInfo');
  if (storedUserInfo) {
    return JSON.parse(storedUserInfo) as UserInfo;
  }
  return defaultUserInfo as UserInfo;
}

// 获取订单统计
export function getOrderStats(): OrderStats {
  const pendingPayment = getOrdersByStatus('pending_payment').length;
  const pendingPickup = getOrdersByStatus('pending_pickup').length;
  const completed = getOrdersByStatus('completed').length;
  const refunding = getOrdersByStatus('refunding').length;
  
  return {
    pendingPayment,
    pendingPickup,
    completed,
    refunding,
  };
}

// 获取优惠券统计
export function getCouponStats(): CouponStats {
  const available = myCoupons.filter(c => c.status === 'available').length;
  const used = myCoupons.filter(c => c.status === 'used').length;
  const expired = myCoupons.filter(c => c.status === 'expired').length;
  
  return {
    available,
    used,
    expired,
  };
}

// 检查是否登录
export function checkIsLoggedIn(): boolean {
  const userInfo = getUserInfo();
  return userInfo ? userInfo.isLoggedIn : false;
}