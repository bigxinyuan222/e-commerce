import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Input, ScrollView, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

interface ChatMessage {
  id: string;
  content: string;
  isMe: boolean;
  time: string;
}

const CustomerServicePage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '您好！欢迎来到乐享购官方客服，请问有什么可以帮助您的？',
      isMe: false,
      time: '10:00'
    },
    {
      id: '2',
      content: '我想咨询一下商品退换货政策',
      isMe: true,
      time: '10:01'
    },
    {
      id: '3',
      content: '您好！我们支持7天无理由退换货，商品需保持原样，不影响二次销售。如有质量问题，我们承担运费；非质量问题，运费需由您承担。',
      isMe: false,
      time: '10:02'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollViewRef = React.createRef<ScrollView>();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      Taro.pageScrollTo({ scrollTop: 99999, duration: 100 });
    }, 100);
  }, []);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isMe: true,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const replyMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: '感谢您的咨询，我们会尽快处理您的问题！',
        isMe: false,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  }, [inputValue]);

  const handleInputChange = useCallback((e: any) => {
    setInputValue(e.detail.value);
  }, []);

  return (
    <View className={styles.customerServicePage}>
      <View className={styles.header}>
        <Text className={styles.backBtn} onClick={() => Taro.navigateBack()}>←</Text>
        <Text className={styles.headerTitle}>乐享购自营官方客服</Text>
        <View className={styles.headerRight}></View>
      </View>

      <ScrollView 
        scrollY 
        className={styles.chatContainer}
        scrollWithAnimation
      >
        {messages.map((msg) => (
          <View key={msg.id} className={`${styles.messageWrap} ${msg.isMe ? styles.me : styles.other}`}>
            {!msg.isMe && (
              <Image 
                src="https://picsum.photos/id/2/100/100" 
                className={styles.avatar} 
                mode="aspectFill" 
              />
            )}
            <View className={styles.messageContent}>
              <Text className={styles.messageText}>{msg.content}</Text>
              <Text className={styles.messageTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className={styles.inputBar}>
        <Input
          className={styles.input}
          placeholder="请输入您的问题..."
          value={inputValue}
          onInput={handleInputChange}
          onConfirm={handleSend}
        />
        <Text className={styles.sendBtn} onClick={handleSend}>发送</Text>
      </View>
    </View>
  );
};

export default CustomerServicePage;