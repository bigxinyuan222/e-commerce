// ============================================
// 消息列表页 - 数据获取
// ============================================

import { Message } from './types';

// 从全局数据导入
import { messages, getUnreadCount } from '@/data/common/messages';

// 获取消息列表
export function getMessages(): Message[] {
  return messages as unknown as Message[];
}

// 获取未读消息数量
export function getUnreadMessageCount(): number {
  return getUnreadCount();
}

// 标记消息为已读
export function markMessageAsRead(messageId: string): void {
  const storedMessages = localStorage.getItem('messages');
  if (storedMessages) {
    const msgs = JSON.parse(storedMessages) as Message[];
    const msg = msgs.find(m => m.id === messageId);
    if (msg) {
      msg.isRead = true;
      localStorage.setItem('messages', JSON.stringify(msgs));
    }
  }
}

// 标记所有消息为已读
export function markAllMessagesAsRead(): void {
  const storedMessages = localStorage.getItem('messages');
  if (storedMessages) {
    const msgs = JSON.parse(storedMessages) as Message[];
    msgs.forEach(m => m.isRead = true);
    localStorage.setItem('messages', JSON.stringify(msgs));
  }
}

// 删除消息
export function deleteMessage(messageId: string): void {
  const storedMessages = localStorage.getItem('messages');
  if (storedMessages) {
    const msgs = JSON.parse(storedMessages) as Message[];
    const newMsgs = msgs.filter(m => m.id !== messageId);
    localStorage.setItem('messages', JSON.stringify(newMsgs));
  }
}

// 按类型筛选消息
export function filterMessagesByType(type: 'session' | 'official'): Message[] {
  return messages.filter(m => m.type === type) as unknown as Message[];
}