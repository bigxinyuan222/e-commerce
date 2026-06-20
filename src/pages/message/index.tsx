import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { messages, getUnreadCount } from '@/data/messages';
import styles from './index.module.scss';

type TabType = 'all' | 'shopping' | 'delivery';

const MessagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [unreadCount] = useState(getUnreadCount());

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'shopping', label: '购物' },
    { key: 'delivery', label: '秒送' }
  ] as const;

  const messageTypes = [
    { type: 'session', label: '会话', icon: '💬', count: 2 },
    { type: 'logistics', label: '物流', icon: '🚚', count: 5 },
    { type: 'reminder', label: '提醒', icon: '🔔', count: 1 },
    { type: 'coupon', label: '优惠', icon: '🎟️', count: 1 },
    { type: 'interactive', label: '互动', icon: '💫', count: 0 }
  ];

  const filteredMessages = activeTab === 'all' 
    ? messages 
    : messages.filter(msg => 
        activeTab === 'shopping' 
          ? msg.type === 'session' || msg.type === 'coupon'
          : msg.type === 'logistics'
      );

  const handleClearUnread = () => {
    Taro.showToast({
      title: '已清除未读',
      icon: 'success'
    });
  };

  const handleMessageClick = (message: typeof messages[0]) => {
    if (message.isOfficial || message.title.includes('客服')) {
      Taro.navigateTo({ url: '/pages/customer-service/index' });
    } else {
      Taro.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  };

  return (
    <View className={styles.messagePage}>
      {/* 顶部栏 */}
      <View className={styles.header}>
        <Text className={styles.headerTitle}>消息</Text>
        <View className={styles.headerActions}>
          <Text className={styles.clearBtn} onClick={handleClearUnread}>清除未读</Text>
          <Text className={styles.moreBtn}>···</Text>
        </View>
      </View>

      {/* 消息类型快捷入口 */}
      <ScrollView scrollX className={styles.typeTabs}>
        {messageTypes.map((item) => (
          <View key={item.type} className={styles.typeItem}>
            <View className={styles.typeIconWrap}>
              <Text className={styles.typeIcon}>{item.icon}</Text>
              {item.count > 0 && (
                <View className={styles.typeBadge}>{item.count}</View>
              )}
            </View>
            <Text className={styles.typeLabel}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 分类标签 */}
      <View className={styles.categoryTabs}>
        {tabs.map((tab) => (
          <Text 
            key={tab.key}
            className={`${styles.categoryTab} ${activeTab === tab.key ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.key === 'delivery' && <Text className={styles.deliveryTag}>外卖</Text>}
          </Text>
        ))}
      </View>

      {/* 消息列表 */}
      <ScrollView scrollY className={styles.messageList}>
        {filteredMessages.map((message) => (
          <View 
            key={message.id} 
            className={styles.messageItem}
            onClick={() => handleMessageClick(message)}
          >
            <View className={styles.avatarWrap}>
              <Image 
                src={message.avatar} 
                className={styles.avatar} 
                mode="aspectFill" 
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

      {/* 推荐商品 */}
      <View className={styles.recommendSection}>
        <View className={styles.recommendHeader}>
          <Text className={styles.recommendTitle}>推荐</Text>
          <Text className={styles.recommendMore}>更多 ›</Text>
        </View>
        <ScrollView scrollX className={styles.recommendList}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} className={styles.recommendItem}>
              <Image 
                src={`https://picsum.photos/id/${20 + item}/300/300`} 
                className={styles.recommendImage} 
                mode="aspectFill" 
              />
              <Text className={styles.recommendPrice}>¥{Math.floor(Math.random() * 500) + 100}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MessagePage;