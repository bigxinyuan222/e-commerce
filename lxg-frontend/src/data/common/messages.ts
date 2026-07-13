export interface Message {
  id: string;
  type: 'session' | 'official';
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
    type: 'official',
    title: '乐享购推送',
    content: '您有新的优惠券可以领取，快来看看吧',
    avatar: 'https://picsum.photos/id/1/100/100',
    time: '',
    unreadCount: 1,
    tag: '官方',
    isOfficial: true
  },
  {
    id: 'msg-002',
    type: 'session',
    title: '乐享购自营官方客服',
    content: '[专属礼遇] 购物车心意券已到账，送您...',
    avatar: 'https://picsum.photos/id/2/100/100',
    time: '',
    unreadCount: 1,
    tag: '推荐',
    isOfficial: true
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