// ============================================
// 客服消息数据
// ============================================

export interface ChatMessage {
  id: string;
  type: 'text' | 'image' | 'order' | 'product';
  content: string;
  sender: 'user' | 'service';
  createTime: string;
  status: 'sending' | 'sent' | 'read';
  extra?: {
    orderId?: string;
    productId?: string;
    productName?: string;
    productImage?: string;
  };
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  status: 'ongoing' | 'closed';
  messages: ChatMessage[];
}

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    title: '订单咨询',
    lastMessage: '感谢您的咨询，如有其他问题随时联系我们~',
    lastTime: '2024-01-15 14:30:00',
    unreadCount: 1,
    status: 'ongoing',
    messages: [
      {
        id: 'msg-1',
        type: 'text',
        content: '你好，我想咨询一下订单什么时候能发货？',
        sender: 'user',
        createTime: '2024-01-15 14:20:00',
        status: 'read'
      },
      {
        id: 'msg-2',
        type: 'text',
        content: '您好！您的订单已支付成功，我们将在24小时内发货，预计2-3个工作日送达。请注意查收~',
        sender: 'service',
        createTime: '2024-01-15 14:25:00',
        status: 'read'
      },
      {
        id: 'msg-3',
        type: 'text',
        content: '好的，谢谢！那我可以修改收货地址吗？',
        sender: 'user',
        createTime: '2024-01-15 14:28:00',
        status: 'read'
      },
      {
        id: 'msg-4',
        type: 'text',
        content: '感谢您的咨询，如有其他问题随时联系我们~',
        sender: 'service',
        createTime: '2024-01-15 14:30:00',
        status: 'read'
      }
    ]
  },
  {
    id: 'conv-2',
    title: '退货退款',
    lastMessage: '您的退货申请已提交，请将商品送回门店',
    lastTime: '2024-01-14 16:20:00',
    unreadCount: 0,
    status: 'closed',
    messages: [
      {
        id: 'msg-5',
        type: 'text',
        content: '商品收到后发现有质量问题，如何申请退货？',
        sender: 'user',
        createTime: '2024-01-14 16:00:00',
        status: 'read'
      },
      {
        id: 'msg-6',
        type: 'text',
        content: '抱歉给您带来不好的体验。请进入"我的订单"找到该订单，点击"申请退货"填写退货原因即可。',
        sender: 'service',
        createTime: '2024-01-14 16:10:00',
        status: 'read'
      },
      {
        id: 'msg-7',
        type: 'text',
        content: '好的，我已经提交了申请。',
        sender: 'user',
        createTime: '2024-01-14 16:15:00',
        status: 'read'
      },
      {
        id: 'msg-8',
        type: 'text',
        content: '您的退货申请已提交，请将商品送回门店',
        sender: 'service',
        createTime: '2024-01-14 16:20:00',
        status: 'read'
      }
    ]
  }
];

// 获取会话列表
export function getConversations(): Conversation[] {
  return conversations;
}

// 获取未读消息数
export function getTotalUnreadCount(): number {
  return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
}

// 根据ID获取会话
export function getConversationById(id: string): Conversation | undefined {
  return conversations.find(conv => conv.id === id);
}

// 发送消息
export function sendMessage(conversationId: string, message: Omit<ChatMessage, 'id' | 'createTime' | 'status'>): ChatMessage {
  const now = new Date();
  const newMessage: ChatMessage = {
    ...message,
    id: `msg-${Date.now()}`,
    createTime: now.toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
    status: 'sent'
  };
  
  const conversation = getConversationById(conversationId);
  if (conversation) {
    conversation.messages.push(newMessage);
    conversation.lastMessage = message.content;
    conversation.lastTime = newMessage.createTime;
  }
  
  return newMessage;
}
