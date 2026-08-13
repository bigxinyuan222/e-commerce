import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { View, Text, Input, ScrollView, Image } from '@tarojs/components';
import Taro, { useDidShow, useDidHide, useRouter } from '@tarojs/taro';
import useChatStore, { ChatMessage } from '@/store/useChatStore';
import chatWS from '@/utils/chatWS';
import { getImageUrl } from '@/utils/image';
import { formatTime } from '@/utils/time';
import styles from '@/styles/message/customer-service.module.scss';

const DEFAULT_AVATAR = '';
const USER_DEFAULT_AVATAR = '';

const CustomerServicePage: React.FC = () => {
  const router = useRouter();
  const queryId = router?.params?.id ? decodeURIComponent(router.params.id) : null;

  const [inputValue, setInputValue] = useState('');
  const [initReady, setInitReady] = useState(false);
  const scrollRef = useRef<any>(null);
  const autoScrollRef = useRef(true);

  const {
    init,
    connectWS,
    disconnectWS,
    conversations,
    currentConversationId,
    currentConversation,
    messagesMap,
    messagesLoadingMap,
    wsStatus,
    wsConnected,
    fetchConversations,
    fetchMessages,
    sendMessage,
    enterConversation,
    leaveConversation,
    createConversation,
    markConversationRead,
  } = useChatStore();

  const conversationId = currentConversationId ?? queryId;
  const messages: ChatMessage[] = conversationId ? (messagesMap[conversationId] ?? []) : [];
  const messagesLoading = conversationId ? !!messagesLoadingMap[conversationId] : false;

  useEffect(() => {
    init();
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidShow(() => {
    connectWS();
    if (conversationId) {
      markConversationRead(conversationId).catch(() => {});
      fetchMessages(conversationId, false).catch(() => {});
    }
    scrollToBottom();
  });

  useDidHide(() => {
    // 保持后台 WS 连接
  });

  const bootstrap = async () => {
    try {
      if (!conversations.length) await fetchConversations(true);

      let cid = queryId;

      if (!cid) {
        const conv = await createConversation({ title: '乐享购官方客服' });
        cid = conv?.id ?? null;
      }

      if (cid) {
        await enterConversation(cid);
        await fetchMessages(cid, true);
      }
    } catch (e) {
      console.error('[客服页] bootstrap 失败:', e);
    } finally {
      setInitReady(true);
      setTimeout(scrollToBottom, 100);
    }
  };

  const scrollToBottom = useCallback(() => {
    if (!autoScrollRef.current) return;
    try {
      Taro.createSelectorQuery()
        .select(`.${styles.chatContainer}`)
        .boundingClientRect((rect: any) => {
          if (rect) {
            Taro.pageScrollTo({ scrollTop: rect.height + 9999, duration: 150 });
          }
        })
        .exec();
    } catch (e) {
      Taro.pageScrollTo({ scrollTop: 99999, duration: 150 });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) setTimeout(scrollToBottom, 50);
  }, [messages.length, scrollToBottom]);

  const onScroll = (e: any) => {
    // TODO: 根据实际 scrollTop/clientHeight/scrollHeight 计算
  };

  const handleSend = useCallback(async () => {
    if (!conversationId) {
      Taro.showToast({ title: '会话未就绪，请稍候', icon: 'none' });
      return;
    }
    const content = inputValue.trim();
    if (!content) return;

    setInputValue('');
    autoScrollRef.current = true;

    if (!wsConnected) {
      Taro.showToast({ title: '正在连接...', icon: 'none' });
      connectWS();
    }

    const result = await sendMessage(conversationId, { type: 'text', content });
    void result;
    scrollToBottom();
  }, [conversationId, inputValue, sendMessage, wsConnected, connectWS, scrollToBottom]);

  const handleInputChange = useCallback((e: any) => {
    setInputValue(e.detail.value ?? e.target?.value ?? '');
  }, []);

  const handleReconnect = useCallback(() => {
    // 非 closed/idle 状态时忽略点击（避免给 Taro 事件处理器传 undefined 导致 removeEventListener 崩溃）
    if (wsStatus !== 'closed' && wsStatus !== 'idle') return;
    chatWS.resetReconnect();
    connectWS();
    Taro.showToast({ title: '正在重新连接...', icon: 'none' });
  }, [connectWS, wsStatus]);

  const conversationTitle = useMemo(() => {
    return currentConversation?.title
      ?? currentConversation?.name
      ?? '乐享购自营官方客服';
  }, [currentConversation]);

  const statusText = useMemo(() => {
    switch (wsStatus) {
      case 'idle': return '点击连接';
      case 'connecting': return '🔗 连接中...';
      case 'open': return '✓ 在线';
      case 'closing': return '断开中...';
      case 'closed': return '⚠ 已离线';
      default: return '';
    }
  }, [wsStatus]);

  const statusColor = useMemo(() => {
    switch (wsStatus) {
      case 'open': return '#52c41a';
      case 'connecting': return '#faad14';
      case 'closed': return '#999';
      default: return '#999';
    }
  }, [wsStatus]);

  // 固定置顶的客服欢迎消息（每个会话消息列表最顶部都固定显示一条客服消息）
  const renderWelcomeMessage = () => {
    const avatar = currentConversation?.serviceAvatar
      ?? currentConversation?.avatar
      ?? DEFAULT_AVATAR;
    return (
      <View className={`${styles.messageWrap} ${styles.other}`}>
        <Image
          src={getImageUrl(avatar)}
          className={styles.avatar}
          mode="aspectFill"
        />
        <View className={styles.messageContent}>
          <Text className={styles.messageText}>
            您好，我是 {conversationTitle}，请问有什么可以帮您？
          </Text>
        </View>
      </View>
    );
  };

  const renderMessage = (msg: ChatMessage) => {
    const isMe = msg.sender === 'user';
    const avatar = isMe
      ? USER_DEFAULT_AVATAR
      : (currentConversation?.serviceAvatar ?? currentConversation?.avatar ?? DEFAULT_AVATAR);

    const statusBadge = isMe ? (
      <Text className={styles.messageStatus}>
        {msg.status === 'sending' && '发送中...'}
        {msg.status === 'failed' && <Text style={{ color: '#ef4444' }}>发送失败</Text>}
        {msg.status === 'read' && '已读'}
        {msg.status === 'sent' && '已送达'}
      </Text>
    ) : null;

    return (
      <View
        key={msg.id}
        className={`${styles.messageWrap} ${isMe ? styles.me : styles.other}`}
      >
        {!isMe && (
          <Image
            src={getImageUrl(avatar)}
            className={styles.avatar}
            mode="aspectFill"
          />
        )}
        <View className={styles.messageContent}>
          <Text className={styles.messageText}>{msg.content}</Text>
          <View className={styles.messageMeta}>
            <Text className={styles.messageTime}>{formatTime(msg.createTime)}</Text>
            {statusBadge}
          </View>
        </View>
        {isMe && (
          <Image
            src={getImageUrl(avatar)}
            className={styles.avatar}
            mode="aspectFill"
          />
        )}
      </View>
    );
  };

  return (
    <View className={styles.customerServicePage}>
      {/* 顶部 Header */}
      <View className={styles.header}>
        <Text className={styles.backBtn} onClick={() => {
          leaveConversation();
          Taro.navigateBack();
        }}>←</Text>
        <View className={styles.headerCenter}>
          <Text className={styles.headerTitle}>{conversationTitle}</Text>
          <View className={styles.headerStatusRow}>
            <Text
              className={`${styles.headerStatus} ws-${wsStatus}`}
              style={{ color: statusColor }}
              onClick={handleReconnect}
            >
              {statusText}
              {(wsStatus === 'closed' || wsStatus === 'idle') && (
                <Text className={styles.reconnectHint}>（点击重连）</Text>
              )}
            </Text>
          </View>
        </View>
        <View className={styles.headerRight}></View>
      </View>

      {/* 聊天区 */}
      <ScrollView
        scrollY
        className={styles.chatContainer}
        scrollWithAnimation
        ref={scrollRef}
        onScroll={onScroll}
      >
        <View className={styles.dateDivider}>
          <Text className={styles.dateText}>今天</Text>
        </View>

        {!initReady || messagesLoading ? (
          <View className={styles.loadingState}>
            <Text className={styles.loadingText}>加载消息中...</Text>
          </View>
        ) : (
          <>
            {/* 每个会话消息列表最顶部固定显示客服欢迎消息 */}
            {renderWelcomeMessage()}
            {messages.map(renderMessage)}
          </>
        )}
      </ScrollView>

      {/* 底部输入栏 */}
      <View className={styles.inputBar}>
        <Input
          className={styles.input}
          placeholder="请输入您的问题..."
          value={inputValue}
          onInput={handleInputChange}
          onConfirm={handleSend}
          confirmType="send"
          adjustPosition
        />
        <Text
          className={`${styles.sendBtn} ${!inputValue.trim() ? styles.disabled : ''}`}
          onClick={handleSend}
        >
          发送
        </Text>
      </View>
    </View>
  );
};

export default CustomerServicePage;
