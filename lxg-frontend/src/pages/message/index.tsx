import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { messages } from '@/data/common/messages';
import styles from '@/styles/message/message.module.scss';

const MessagePage: React.FC = () => {
  

  // 只保留店铺和乐享购两种类型的消息
  const filteredMessages = messages.filter(msg => 
    msg.type === 'session' || msg.type === 'official'
  );

  const handleClearUnread = () => {
    Taro.showToast({
      title: '已清除未读',
      icon: 'success'
    });
  };

  const handleMessageClick = (message: typeof messages[0]) => {
    if (message.title.includes('客服')) {
      Taro.navigateTo({ url: '/pages/message/customer-service/index' });
    } else if (message.title.includes('推送')) {
      Taro.navigateTo({ url: '/pages/user/coupons/index' });
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
    </View>
  );
};

export default MessagePage;