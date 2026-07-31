import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet, apiPost } from '@/api/common';
import { serviceApi, notificationApi } from '@/api/message';
import { getImageUrl, lazyImgProps } from '@/utils/image';
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [conversationRes, notificationRes] = await Promise.all([
          apiGet(serviceApi.conversations).catch(() => null),
          apiGet(notificationApi.list).catch(() => null),
        ]);

        const result: Message[] = [];

        if (conversationRes?.data) {
          const convData = Array.isArray(conversationRes.data)
            ? conversationRes.data
            : conversationRes.data?.list || [];

          convData.forEach((conv: any) => {
            result.push({
              id: conv.id,
              type: 'session',
              title: conv.title || conv.name || '客服',
              content: conv.lastMessage || conv.content || '',
              avatar: getImageUrl(conv.avatar || conv.avatarUrl || ''),
              time: conv.lastTime || conv.time || '',
              unreadCount: conv.unreadCount || 0,
              tag: conv.tag,
              isOfficial: false,
            });
          });
        }

        if (notificationRes?.data) {
          const notifData = Array.isArray(notificationRes.data)
            ? notificationRes.data
            : notificationRes.data?.list || [];

          notifData.forEach((notif: any) => {
            result.push({
              id: notif.id,
              type: 'official',
              title: notif.title || '通知',
              content: notif.content || notif.message || '',
              avatar: getImageUrl(notif.avatar || notif.icon || ''),
              time: notif.time || notif.createdAt || '',
              unreadCount: notif.unreadCount || 0,
              tag: notif.tag || '官方',
              isOfficial: true,
            });
          });
        }

        setMessages(result);
      } catch (error) {
        console.error('加载消息失败:', error);
        Taro.showToast({ title: '加载失败', icon: 'none' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleClearUnread = async () => {
    try {
      await apiPost(notificationApi.readAll);
      setMessages(prev => prev.map(msg => ({ ...msg, unreadCount: 0 })));
      Taro.showToast({ title: '已清除未读', icon: 'success' });
    } catch (error) {
      console.error('清除未读失败:', error);
      Taro.showToast({ title: '清除失败', icon: 'none' });
    }
  };

  const handleMessageClick = (message: Message) => {
    if (message.title.includes('客服') || message.type === 'session') {
      const convId = message.id;
      Taro.navigateTo({ url: `/pages/message/customer-service/index?id=${convId}` });
    } else if (message.title.includes('推送') || message.type === 'official') {
      Taro.navigateTo({ url: '/pages/user/coupons/index' });
    } else {
      Taro.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.type === 'session' || msg.type === 'official'
  );

  return (
    <View className={styles.messagePage}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>消息</Text>
        <View className={styles.headerActions}>
          <Text className={styles.clearBtn} onClick={handleClearUnread}>清除未读</Text>
          <Text className={styles.moreBtn}>···</Text>
        </View>
      </View>

      <ScrollView scrollY className={styles.messageList}>
        {filteredMessages.map((message) => (
          <View
            key={message.id}
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
            <View className={styles.messageContent}>
              <View className={styles.messageHeader}>
                <Text className={styles.messageTitle}>{message.title}</Text>
                {message.tag && (
                  <Text className={`${styles.tag} ${message.isOfficial ? styles.officialTag : ''}`}>
                    {message.tag}
                  </Text>
                )}
              </View>
              <Text className={styles.messageText}>{message.content}</Text>
            </View>
            {message.time && (
              <Text className={styles.messageTime}>{message.time}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MessagePage;