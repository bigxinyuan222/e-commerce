// ============================================
// 消息列表页 - 工具函数
// ============================================

import { Message, MessageType } from './types';
import { formatDateTime } from '@/utils/time';

// 格式化消息时间（统一使用全局日期时间格式）
export function formatMessageTime(time: string): string {
  return formatDateTime(time);
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