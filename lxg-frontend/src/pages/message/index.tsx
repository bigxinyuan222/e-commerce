import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { serviceApi } from '@/api/message';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import { getAuthToken } from '@/api/common';
import useChatStore from '@/store/useChatStore';
import { formatMessageTime } from './utils';
import useNotificationStore from '@/store/useNotificationStore';
import styles from '@/styles/message/message.module.scss';

interface Message {
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

const MessagePage: React.FC = () => {
  const [conversations, setConversations] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // 通知 store
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const notifications = useNotificationStore((s) => s.notifications);
  const fetchUnreadCount = useNotificationStore((s) => s.fetchUnreadCount);
  const fetchNotifications = useNotificationStore((s) => s.fetchNotifications);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);

  // 客服会话 store
  const createConversation = useChatStore((s) => s.createConversation);

  // 拉取客服会话列表
  const fetchConversations = useCallback(async () => {
    if (!getAuthToken()) return;
    try {
      const res = await apiGet(serviceApi.conversations);
      const data = res?.data;
      if (!data) return;
      const convData = Array.isArray(data) ? data : data?.list || [];
      console.log('[消息页] 会话列表原始数据:', JSON.stringify(convData)?.slice(0, 500));
      const result: Message[] = convData.map((conv: any) => {
        const convId = String(
          conv.id ?? conv.ID ?? conv.Id
          ?? conv.conversationId ?? conv.ConversationId
          ?? conv.conv_id ?? conv.sessionId ?? conv.SessionId
          ?? `conv-${Math.random().toString(36).slice(2, 10)}`
        );
        const unreadCount = Number(
          conv.unreadCount ?? conv.UnreadCount
          ?? conv.userUnread ?? conv.UserUnread
          ?? conv.user_unread ?? conv.user_unread_count
          ?? conv.unread_count ?? conv.Unread_Count
          ?? conv.unread ?? conv.Unread
          ?? 0
        );
        return {
          id: convId,
          type: 'session' as const,
          title: conv.title ?? conv.Title ?? conv.name ?? conv.Name ?? '客服',
          content: conv.lastMessage ?? conv.LastMessage ?? conv.content ?? conv.Content ?? '',
          avatar: getImageUrl(conv.avatar ?? conv.Avatar ?? conv.avatarUrl ?? conv.AvatarUrl ?? ''),
          time: formatMessageTime(conv.lastTime ?? conv.LastTime ?? conv.time ?? conv.UpdatedAt ?? conv.updatedAt ?? ''),
          unreadCount,
          tag: conv.tag,
          isOfficial: false,
        };
      });
      console.log('[消息页] 会话列表解析后:', result.map(c => ({ id: c.id, title: c.title, unreadCount: c.unreadCount })));
      setConversations(result);
    } catch (error) {
      console.error('加载会话列表失败:', error);
    }
  }, []);

  // 页面加载时拉取数据
  useDidShow(() => {
    if (!getAuthToken()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      fetchConversations(),
      fetchNotifications(true),
      fetchUnreadCount(),
    ]).finally(() => setLoading(false));
  });

  // 全部已读
  const handleClearUnread = () => {
    markAllRead();
  };

  // 标记单条通知已读
  const handleMarkRead = async (message: Message) => {
    if (message.type !== 'official' || message.unreadCount <= 0) return;
    await markRead(message.id);
  };

  const handleMessageClick = async (message: Message) => {
    // 官方通知：先标记单条已读
    if (message.type === 'official') {
      await handleMarkRead(message);
      if (message.title.includes('推送') || message.title.includes('优惠')) {
        Taro.navigateTo({ url: '/pages/user/coupons/index' });
      } else {
        Taro.showToast({ title: message.content || '已查看', icon: 'none' });
      }
      return;
    }

    // 客服会话
    if (message.type === 'session' || message.title.includes('客服')) {
      if (message.id === 'fixed-customer-service') {
        // 固定置顶客服入口：不传 id，由客服页自动创建/复用会话
        Taro.navigateTo({ url: '/pages/message/customer-service/index' });
      } else {
        const convId = message.id ?? '';
        Taro.navigateTo({ url: `/pages/message/customer-service/index?id=${encodeURIComponent(convId)}` });
      }
      return;
    }

    Taro.showToast({ title: '功能开发中', icon: 'none' });
  };

  // 合并会话 + 通知列表
  const notifMessages: Message[] = notifications.map((n) => ({
    id: n.id,
    type: 'official' as const,
    title: n.title,
    content: n.content,
    avatar: getImageUrl(n.avatar || n.icon || ''),
    time: formatMessageTime(n.time || n.createdAt || ''),
    unreadCount: n.isRead ? 0 : 1,
    tag: n.tag || '官方',
    isOfficial: true,
  }));

  // 固定置顶的客服入口：每个账号消息列表最顶部都固定显示一条客服会话
  // 只取最新一条客服会话的最新内容与未读数（避免聚合多个会话造成混淆）
  const serviceConvs = conversations.filter((c) => (c.title || '').includes('客服'));
  const otherConvs = conversations.filter((c) => !(c.title || '').includes('客服'));
  // 按时间倒序取最新一条
  const latestService = serviceConvs.sort(
    (a, b) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime()
  )[0];

  const fixedCustomerService: Message = {
    id: latestService?.id ?? 'fixed-customer-service',
    type: 'session',
    title: '乐享购官方客服',
    content: latestService?.content || '您好，请问有什么可以帮您？',
    avatar: getImageUrl(latestService?.avatar || ''),
    time: formatMessageTime(latestService?.time || ''),
    unreadCount: latestService?.unreadCount ?? 0,
    tag: '客服',
    isOfficial: false,
  };

  const allMessages = [fixedCustomerService, ...otherConvs, ...notifMessages];

  return (
    <View className={styles.messagePage}>
      <View className={styles.header}>
        <View className={styles.headerLeft}>
          <Text className={styles.headerTitle}>消息</Text>
          {unreadCount > 0 && (
            <View className={styles.unreadTotalBadge}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </View>
          )}
        </View>
        <View className={styles.headerActions}>
          <Text
            className={`${styles.clearBtn} ${unreadCount === 0 ? styles.clearBtnDisabled : ''}`}
            onClick={handleClearUnread}
          >
            全部已读
          </Text>
        </View>
      </View>

      <ScrollView scrollY className={styles.messageList}>
        {allMessages.length === 0 && !loading ? (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>📭</Text>
            <Text className={styles.emptyText}>暂无消息</Text>
          </View>
        ) : (
          allMessages.map((message) => (
            <View
              key={`${message.type}-${message.id}`}
              className={styles.messageItem}
              onClick={() => handleMessageClick(message)}
            >
              <View className={styles.avatarWrap}>
                <Image
                  src={getImageUrl(message.avatar)}
                  className={styles.avatar}
                  mode="aspectFill"
                  {...lazyImgProps()}
                />
                {message.unreadCount > 0 && (
                  <View className={styles.unreadBadge}>{message.unreadCount}</View>
                )}
              </View>
              <View className={styles.messageBody}>
                <View className={styles.messageHeader}>
                  <Text className={styles.messageTitle}>{message.title}</Text>
                  {message.tag && (
                    <Text className={`${styles.tag} ${message.isOfficial ? styles.officialTag : ''}`}>
                      {message.tag}
                    </Text>
                  )}
                </View>
                <Text className={styles.messageText}>
                  {message.content && message.content.length > 7 ? message.content.slice(0, 7) + '...' : message.content}
                </Text>
              </View>
              {message.time && (
                <Text className={styles.messageTime}>{message.time}</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MessagePage;
