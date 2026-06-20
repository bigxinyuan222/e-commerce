export interface Message {
  id: string;
  type: 'session' | 'logistics' | 'reminder' | 'coupon' | 'interactive';
  title: string;
  content: string;
  avatar: string;
  time: string;
  unreadCount: number;
  tag?: string;
  isOfficial?: boolean;
}

export const messages: Message[] = [
  {
    id: 'msg-001',
    type: 'session',
    title: '商城自营官方客服',
    content: '[专属礼遇] 购物车心意券已到账，送您...',
    avatar: 'https://picsum.photos/id/1/100/100',
    time: '',
    unreadCount: 1,
    tag: '推荐',
    isOfficial: true
  },
  {
    id: 'msg-002',
    type: 'logistics',
    title: '骑手-张庆文',
    content: '[图片]',
    avatar: 'https://picsum.photos/id/2/100/100',
    time: '12:41',
    unreadCount: 2
  },
  {
    id: 'msg-003',
    type: 'interactive',
    title: '智能助手',
    content: '您的商品推荐报告已出',
    avatar: 'https://picsum.photos/id/3/100/100',
    time: '',
    unreadCount: 0,
    tag: '官方',
    isOfficial: true
  },
  {
    id: 'msg-004',
    type: 'session',
    title: '商城客服',
    content: '商城客服很高兴为您服务',
    avatar: 'https://picsum.photos/id/4/100/100',
    time: '',
    unreadCount: 0,
    tag: '官方',
    isOfficial: true
  },
  {
    id: 'msg-005',
    type: 'logistics',
    title: '骑手-王卫朋',
    content: '已送达，请确认收货',
    avatar: 'https://picsum.photos/id/5/100/100',
    time: '星期四',
    unreadCount: 0
  },
  {
    id: 'msg-006',
    type: 'coupon',
    title: '优惠券到期提醒',
    content: '您有3张优惠券即将到期',
    avatar: 'https://picsum.photos/id/6/100/100',
    time: '昨天',
    unreadCount: 1
  },
  {
    id: 'msg-007',
    type: 'reminder',
    title: '订单发货通知',
    content: '您的订单已发货，预计明天送达',
    avatar: 'https://picsum.photos/id/7/100/100',
    time: '昨天',
    unreadCount: 0
  },
  {
    id: 'msg-008',
    type: 'session',
    title: '深圳南山科技园店',
    content: '感谢您的光临，期待下次再见',
    avatar: 'https://picsum.photos/id/8/100/100',
    time: '3天前',
    unreadCount: 0
  }
];

export const getMessagesByType = (type?: string): Message[] => {
  if (!type || type === 'all') {
    return messages;
  }
  return messages.filter(msg => msg.type === type);
};

export const getUnreadCount = (): number => {
  return messages.reduce((acc, msg) => acc + msg.unreadCount, 0);
};