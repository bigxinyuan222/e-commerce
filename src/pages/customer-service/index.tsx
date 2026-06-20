import React, { useState } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

interface Message {
  id: number;
  type: 'user' | 'service';
  content: string;
  time: string;
}

const CustomerServicePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'service', content: '您好，请问有什么可以帮您？', time: '10:00' }
  ]);

  const quickQuestions = [
    '如何修改收货地址？',
    '订单如何取消？',
    '如何申请退款？',
    '如何联系门店？',
    '优惠券如何使用？'
  ];

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // 模拟客服回复
    setTimeout(() => {
      const replyMessage: Message = {
        id: Date.now() + 1,
        type: 'service',
        content: '感谢您的咨询，我们正在为您查询，请稍候...',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const callService = () => {
    Taro.makePhoneCall({ phoneNumber: '400-123-4567' });
  };

  return (
    <View className={styles.customerServicePage}>
      <ScrollView scrollY className={styles.messageList}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            className={`${styles.messageItem} ${msg.type === 'user' ? styles.userMsg : styles.serviceMsg}`}
          >
            {msg.type === 'service' && (
              <View className={styles.serviceAvatar}>客服</View>
            )}
            <View className={styles.messageContent}>
              <Text className={styles.messageText}>{msg.content}</Text>
              <Text className={styles.messageTime}>{msg.time}</Text>
            </View>
            {msg.type === 'user' && (
              <View className={styles.userAvatar}>我</View>
            )}
          </View>
        ))}
      </ScrollView>

      <View className={styles.quickQuestions}>
        <Text className={styles.quickTitle}>常见问题</Text>
        <ScrollView scrollX className={styles.quickList}>
          {quickQuestions.map((question, index) => (
            <View 
              key={index}
              className={styles.quickItem}
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.inputArea}>
        <Input 
          className={styles.input}
          type="text"
          placeholder="请输入您的问题"
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
          onConfirm={sendMessage}
        />
        <View className={styles.sendBtn} onClick={sendMessage}>发送</View>
        <View className={styles.callBtn} onClick={callService}>📞</View>
      </View>
    </View>
  );
};

export default CustomerServicePage;
