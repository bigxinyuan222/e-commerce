// ============================================
// 客服 WebSocket 管理服务
// 遵循 Persistent Connection Systems 设计规范：
//   - 心跳 + 空闲超时
//   - 指数退避+抖动 重连
//   - 发送队列 + 缓冲区上限
//   - 消息序列号 gap 检测
// ============================================

import Taro from '@tarojs/taro';
import { WS_BASE_URL } from '@/api/message';
import { getAuthToken } from '@/api/common';

// -------------- 常量配置 --------------
const HEARTBEAT_INTERVAL = 30000;     // 心跳间隔 30s
const HEARTBEAT_IDLE_TIMEOUT = 90000; // 空闲超时 90s（3 次 ping 未收到 pong）
const MAX_RECONNECT_DELAY = 30000;    // 最大重连间隔 30s
const BASE_RECONNECT_DELAY = 1000;    // 初始重连间隔 1s
const RECONNECT_JITTER = 0.2;         // 抖动 ±20%（避免惊群）
const SEND_QUEUE_LIMIT = 200;         // 发送队列上限（未连接时暂存）
const MSG_BUFFER_LIMIT = 1000;        // 入站消息缓冲上限（慢消费者保护）
const SEQUENCE_GAP_THRESHOLD = 1;     // 序列号 gap 阈值

// -------------- 类型定义 --------------
export type WSMessageType =
  | 'ping'
  | 'pong'
  | 'message/new'        // 新消息推送
  | 'message/read'       // 消息已读通知
  | 'conversation/update' // 会话更新
  | 'conversation/read'   // 会话标记已读
  | 'error'
  | 'system';

export interface WSInboundMessage<T = any> {
  type: WSMessageType;
  data?: T;
  seq?: number;            // 服务端递增序列号
  timestamp?: number;      // 服务端时间戳 ms
}

export interface WSOutboundMessage<T = any> {
  type: WSMessageType | 'message/send';
  data?: T;
  id?: string;             // 客户端消息 ID（用于 ACK）
}

export type WSConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'open'
  | 'closing'
  | 'closed';

type ListenerFn = (msg: WSInboundMessage) => void;
type StatusListenerFn = (status: WSConnectionStatus) => void;

// -------------- WebSocket 管理器（单例）--------------
class ChatWebSocketManager {
  private static _instance: ChatWebSocketManager | null = null;

  private _ws: WebSocket | Taro.SocketTask | null = null;
  private _status: WSConnectionStatus = 'idle';
  private _listeners: Set<ListenerFn> = new Set();
  private _statusListeners: Set<StatusListenerFn> = new Set();

  private _heartbeatTimer: ReturnType<typeof setTimeout> | null = null;
  private _idleTimer: ReturnType<typeof setTimeout> | null = null;
  private _reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private _reconnectAttempts = 0;
  private _shouldReconnect = true;
  private _manualClose = false;

  private _sendQueue: WSOutboundMessage[] = [];
  private _lastServerSeq: number | null = null;
  private _msgBuffer: WSInboundMessage[] = [];

  // 跨平台环境判断
  private get _isH5(): boolean {
    return process.env.TARO_ENV === 'h5';
  }

  static getInstance(): ChatWebSocketManager {
    if (!ChatWebSocketManager._instance) {
      ChatWebSocketManager._instance = new ChatWebSocketManager();
    }
    return ChatWebSocketManager._instance;
  }

  private constructor() {}

  // ============== 公共 API ==============

  get status(): WSConnectionStatus {
    return this._status;
  }

  /**
   * 建立连接（幂等）
   */
  connect(): void {
    if (this._status === 'open' || this._status === 'connecting') {
      console.debug('[ChatWS] 已有连接/正在连接，跳过');
      return;
    }
    this._manualClose = false;
    this._shouldReconnect = true;
    this._doConnect();
  }

  /**
   * 主动关闭（不自动重连）
   */
  disconnect(): void {
    this._manualClose = true;
    this._shouldReconnect = false;
    this._clearReconnectTimer();
    this._doClose(1000, 'Client closing');
  }

  /**
   * 发送消息（若未连接则入队，连接后 flush）
   */
  send(msg: WSOutboundMessage): boolean {
    const envelope: WSOutboundMessage = {
      ...msg,
      id: msg.id ?? `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };

    if (this._status === 'open') {
      return this._doSend(envelope);
    }

    // 入队
    if (this._sendQueue.length >= SEND_QUEUE_LIMIT) {
      console.warn('[ChatWS] 发送队列已满，丢弃最早消息');
      this._sendQueue.shift();
    }
    this._sendQueue.push(envelope);
    console.debug('[ChatWS] 消息入队，队列长度=', this._sendQueue.length);

    // 尝试主动建立连接
    if (this._status === 'idle' || this._status === 'closed') {
      this.connect();
    }
    return false;
  }

  /**
   * 订阅入站消息
   */
  onMessage(listener: ListenerFn): () => void {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  /**
   * 订阅连接状态
   */
  onStatusChange(listener: StatusListenerFn): () => void {
    this._statusListeners.add(listener);
    return () => this._statusListeners.delete(listener);
  }

  /**
   * 重置重连计数（用户手动触发重连时调用）
   */
  resetReconnect(): void {
    this._reconnectAttempts = 0;
  }

  // ============== 内部：连接 ==============

  private _doConnect(): void {
    this._setStatus('connecting');
    this._clearHeartbeat();

    const token = getAuthToken();
    // 通过 query 参数携带 token（WebSocket 握手无法自定义 Header）
    const sep = WS_BASE_URL.includes('?') ? '&' : '?';
    const url = token
      ? `${WS_BASE_URL}${sep}token=${encodeURIComponent(token)}`
      : WS_BASE_URL;

    console.log('[ChatWS] 开始连接:', url.replace(/token=[^&]+/, 'token=***'));

    try {
      if (this._isH5 && typeof WebSocket !== 'undefined') {
        // H5 环境：原生 WebSocket
        this._ws = new WebSocket(url);
        this._bindH5Events(this._ws as WebSocket);
      } else {
        // 小程序环境：Taro.connectSocket
        this._ws = Taro.connectSocket({
          url,
          protocols: [],
          complete: () => {},
        }) as any as Taro.SocketTask;
        this._bindMiniEvents(this._ws as Taro.SocketTask);
      }
    } catch (err) {
      console.error('[ChatWS] 创建连接异常:', err);
      this._setStatus('closed');
      this._scheduleReconnect();
    }
  }

  private _bindH5Events(ws: WebSocket): void {
    ws.onopen = () => this._onOpen();
    ws.onmessage = (ev: MessageEvent) => this._onMessage(ev.data);
    ws.onerror = (ev: Event) => {
      console.error('[ChatWS] H5 WebSocket error:', ev);
    };
    ws.onclose = (ev: CloseEvent) => {
      console.log(`[ChatWS] H5 关闭 code=${ev.code} reason=${ev.reason}`);
      this._onClose();
    };
  }

  private _bindMiniEvents(task: Taro.SocketTask): void {
    task.onOpen(() => this._onOpen());
    task.onMessage((res) => this._onMessage((res as any).data ?? res));
    task.onError((err) => console.error('[ChatWS] 小程序 WebSocket error:', err));
    task.onClose(() => {
      console.log('[ChatWS] 小程序 WebSocket 关闭');
      this._onClose();
    });
  }

  private _onOpen(): void {
    console.log('[ChatWS] 连接已建立');
    this._setStatus('open');
    this._reconnectAttempts = 0;
    this._startHeartbeat();
    this._flushSendQueue();
  }

  private _onClose(): void {
    this._clearHeartbeat();
    this._setStatus(this._status === 'closing' ? 'closed' : 'closed');
    this._ws = null;
    if (this._shouldReconnect && !this._manualClose) {
      this._scheduleReconnect();
    }
  }

  private _doClose(code: number, reason: string): void {
    if (!this._ws) {
      this._setStatus('closed');
      return;
    }
    if (this._status === 'closed' || this._status === 'closing') return;
    this._setStatus('closing');
    try {
      if (this._isH5) {
        (this._ws as WebSocket).close(code, reason);
      } else {
        (this._ws as Taro.SocketTask).close({
          code,
          reason,
          complete: () => {},
        });
      }
    } catch (err) {
      console.warn('[ChatWS] 关闭异常:', err);
    }
  }

  // ============== 内部：发送 ==============

  private _doSend(msg: WSOutboundMessage): boolean {
    if (!this._ws || this._status !== 'open') return false;
    try {
      const payload = JSON.stringify(msg);
      if (this._isH5) {
        (this._ws as WebSocket).send(payload);
      } else {
        (this._ws as Taro.SocketTask).send({
          data: payload,
          complete: () => {},
        });
      }
      return true;
    } catch (err) {
      console.error('[ChatWS] 发送失败，重新入队:', err);
      if (this._sendQueue.length < SEND_QUEUE_LIMIT) {
        this._sendQueue.unshift(msg);
      }
      return false;
    }
  }

  private _flushSendQueue(): void {
    if (this._sendQueue.length === 0) return;
    console.debug(`[ChatWS] Flush 发送队列: ${this._sendQueue.length} 条`);
    // 按顺序逐个发送
    while (this._sendQueue.length > 0 && this._status === 'open') {
      const msg = this._sendQueue.shift()!;
      if (!this._doSend(msg)) {
        // 失败则放回队首，下次再试
        this._sendQueue.unshift(msg);
        break;
      }
    }
  }

  // ============== 内部：入站消息处理 ==============

  private _onMessage(raw: any): void {
    let parsed: WSInboundMessage;
    try {
      parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (err) {
      console.warn('[ChatWS] 非 JSON 消息，忽略:', raw);
      return;
    }

    // 心跳响应
    if (parsed.type === 'pong') {
      this._resetIdleTimer();
      return;
    }
    if (parsed.type === 'ping') {
      // 服务端 ping → 回 pong
      this.send({ type: 'pong' });
      return;
    }

    // 序列号 gap 检测
    if (typeof parsed.seq === 'number' && this._lastServerSeq !== null) {
      const gap = parsed.seq - this._lastServerSeq - 1;
      if (gap >= SEQUENCE_GAP_THRESHOLD) {
        console.warn(`[ChatWS] ⚠️ 检测到消息 gap! last=${this._lastServerSeq}, cur=${parsed.seq}, gap=${gap}`);
      }
    }
    if (typeof parsed.seq === 'number') {
      this._lastServerSeq = parsed.seq;
    }

    // 缓冲区（慢消费者保护）
    this._msgBuffer.push(parsed);
    if (this._msgBuffer.length > MSG_BUFFER_LIMIT) {
      const dropped = this._msgBuffer.length - MSG_BUFFER_LIMIT;
      console.warn(`[ChatWS] 🧯 入站缓冲溢出，丢弃 ${dropped} 条旧消息`);
      this._msgBuffer.splice(0, dropped);
    }

    // 重置空闲计时（有任何有效消息说明连接正常）
    this._resetIdleTimer();

    // 广播给监听者
    this._listeners.forEach((fn) => {
      try { fn(parsed); } catch (e) { console.error('[ChatWS] listener error:', e); }
    });
  }

  // ============== 内部：心跳 & 空闲 ==============

  private _startHeartbeat(): void {
    this._clearHeartbeat();
    this._heartbeatTimer = setInterval(() => {
      if (this._status === 'open') {
        this.send({ type: 'ping' });
      }
    }, HEARTBEAT_INTERVAL) as any;
    this._resetIdleTimer();
  }

  private _clearHeartbeat(): void {
    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer as any);
      this._heartbeatTimer = null;
    }
    if (this._idleTimer) {
      clearTimeout(this._idleTimer);
      this._idleTimer = null;
    }
  }

  private _resetIdleTimer(): void {
    if (this._idleTimer) clearTimeout(this._idleTimer);
    this._idleTimer = setTimeout(() => {
      console.warn('[ChatWS] 心跳超时，关闭连接并重连');
      this._doClose(4000, 'Idle timeout');
    }, HEARTBEAT_IDLE_TIMEOUT);
  }

  // ============== 内部：重连（指数退避 + 抖动）==============

  private _scheduleReconnect(): void {
    this._clearReconnectTimer();
    if (!this._shouldReconnect) return;

    this._reconnectAttempts += 1;
    const baseDelay = Math.min(
      BASE_RECONNECT_DELAY * Math.pow(2, this._reconnectAttempts - 1),
      MAX_RECONNECT_DELAY
    );
    const jitter = baseDelay * RECONNECT_JITTER * (Math.random() * 2 - 1);
    const delay = Math.round(baseDelay + jitter);

    console.log(`[ChatWS] 🔄 计划第 ${this._reconnectAttempts} 次重连，${delay}ms 后...`);
    this._reconnectTimer = setTimeout(() => {
      if (this._shouldReconnect) this._doConnect();
    }, delay);
  }

  private _clearReconnectTimer(): void {
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }
  }

  // ============== 内部：状态广播 ==============

  private _setStatus(s: WSConnectionStatus): void {
    if (this._status === s) return;
    this._status = s;
    console.debug(`[ChatWS] 状态变化 → ${s}`);
    this._statusListeners.forEach((fn) => {
      try { fn(s); } catch (e) { console.error('[ChatWS] status listener error:', e); }
    });
  }
}

export const chatWS = ChatWebSocketManager.getInstance();
export default chatWS;
