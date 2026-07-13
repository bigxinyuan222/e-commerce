// ============================================
// 消息列表页 - 工具函数
// ============================================

import { Message, MessageType } from './types';

// 格式化消息时间
export function formatMessageTime(time: string): string {
  if (!time) return '';
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // 一天内显示"今天 HH:mm"
  if (diff < 24 * 60 * 60 * 1000) {
    return `今天 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  
  // 一周内显示"周几 HH:mm"
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${weekdays[date.getDay()]} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  
  // 其他显示"YYYY-MM-DD"
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// 格式化消息类型
export function formatMessageType(type: MessageType): string {
  return type === 'store' ? '店铺消息' : '系统消息';
}

// 获取消息类型图标
export function getMessageTypeIcon(type: MessageType): string {
  return type === 'store' ? '🏪' : '🔔';
}

// 截断消息内容
export function truncateMessageContent(content: string, maxLength: number = 50): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
}

// 检查是否有未读消息
export function hasUnreadMessages(messages: Message[]): boolean {
  return messages.some(m => !m.isRead);
}

// 计算未读消息数量
export function countUnreadMessages(messages: Message[]): number {
  return messages.filter(m => !m.isRead).length;
}

// 格式化未读数量显示
export function formatUnreadCount(count: number): string {
  if (count === 0) return '';
  return count > 99 ? '99+' : `${count}`;
}