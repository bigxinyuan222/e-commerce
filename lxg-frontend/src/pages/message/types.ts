// ============================================
// 消息列表页 - 类型定义
// ============================================

// 消息类型
export type MessageType = 'store' | 'system';

// 消息类型
export interface Message {
  id: string;
  type: MessageType;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  sender?: string;
}

// 页面状态类型
export interface PageState {
  messages: Message[];
  unreadCount: number;
  loading: boolean;
}