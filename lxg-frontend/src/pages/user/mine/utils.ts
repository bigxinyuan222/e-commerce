// ============================================
// 我的页面 - 工具函数
// ============================================

import { UserInfo } from './types';

// 格式化用户昵称
export function formatNickname(nickname: string): string {
  if (!nickname) return '乐享购用户';
  return nickname;
}

// 格式化注册日期
export function formatRegisterDate(date: string): string {
  if (!date) return '';
  return `注册于 ${date}`;
}

// 格式化订单数量显示
export function formatOrderCount(count: number): string {
  if (count === 0) return '';
  return count > 99 ? '99+' : `${count}`;
}

// 获取用户头像URL
export function getUserAvatarUrl(userInfo: UserInfo | null): string {
  if (!userInfo || !userInfo.avatar) {
    return 'https://picsum.photos/id/64/100/100';
  }
  return userInfo.avatar;
}

// 检查用户信息是否完整
export function isUserInfoComplete(userInfo: UserInfo): boolean {
  return !!(userInfo.nickname && userInfo.avatar && userInfo.gender && userInfo.birthday);
}

// 获取用户等级描述
export function getUserLevel(userInfo: UserInfo): string {
  // 根据注册时间计算用户等级
  if (!userInfo.registerDate) return '新用户';
  
  const registerDate = new Date(userInfo.registerDate);
  const now = new Date();
  const months = (now.getFullYear() - registerDate.getFullYear()) * 12 + 
                 (now.getMonth() - registerDate.getMonth());
  
  if (months >= 24) return '资深会员';
  if (months >= 12) return '老会员';
  if (months >= 6) return '活跃会员';
  return '新会员';
}