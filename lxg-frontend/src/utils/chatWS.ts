// ============================================
// 客服 WebSocket 管理服务
// 遵循 Persistent Connection Systems 设计规范：
//   - 首条消息鉴权（兼容 URL token + 消息体 token 两种后端协议）
//   - 心跳 + 空闲超时
//   - 指数退避+抖动 重连
//   - 发送队列 + 缓冲区上限
//   - 消息序列号 gap 检测
// ============================================

import Taro from '@tarojs/taro';
import { WS_BASE_URL, WS_DIRECT_URL } from '@/api/message';
import { getAuthToken } from '@/api/common';

// -------------- 常量配置 --------------
const HEARTBEAT_INTERVAL = 30000;     // 心跳间隔 30s
const HEARTBEAT_IDLE_TIMEOUT = 90000; // 空闲超时 90s（3 次 ping 未收到 pong）
const MAX_RECONNECT_DELAY = 30000;    // 最大重连间隔 30s
const BASE_RECONNECT_DELAY = 1000;    // 初始重连间隔 1s
const RECONNECT_JITTER = 0.2;         // 抖动 ±20%（避免惊群）
const MAX_RECONNECT_ATTEMPTS = 10;    // 最大重连次数（超限需手动触发）
const SEND_QUEUE_LIMIT = 200;         // 发送队列上限（未连接时暂存）
const MSG_BUFFER_LIMIT = 1000;        // 入站消息缓冲上限（慢消费者保护）
const SEQUENCE_GAP_THRESHOLD = 1;     // 序列号 gap 阈值

// -------------- 类型定义 --------------
export type WSMessageType =
  | 'ping'
  | 'pong'
  | 'auth'              // 鉴权消息
  | 'auth_ack'          // 鉴权确认
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
  private _authSent = false;       // 是否已发送鉴权消息
  private _authTimer: ReturnType<typeof setTimeout> | null = null;
  private _useDirectFallback = false;  // 是否使用直连后端 fallback
  private _fallbackTried = false;      // 是否已尝试过 fallback（只尝试一次）

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
    // 用户手动触发时重置 fallback 状态，优先尝试代理连接
    if (this._fallbackTried) {
      this._useDirectFallback = false;
      this._fallbackTried = false;
      this._reconnectAttempts = 0;
    }
    this._doConnect();
  }

  /**
   * 主动关闭（不自动重连）
   */
  disconnect(): void {
    this._manualClose = true;
    this._shouldReconnect = false;
    this._clearReconnectTimer();
    this._clearAuthTimer();
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

    if (this._status === 'open' && this._authSent) {
      return this._doSend(envelope);
    }

    // 未连接或未完成鉴权 → 入队
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

  private _connectTimeoutTimer: ReturnType<typeof setTimeout> | null = null;

  private _doConnect(): void {
    // 如果已有连接正在进行中，不重复连接
    if (this._status === 'connecting') {
      console.debug('[ChatWS] 已有连接正在进行中，跳过');
      return;
    }
    
    this._setStatus('connecting');
    this._clearHeartbeat();
    this._authSent = false;

    const token = getAuthToken();

    // 构建 URL：URL 查询参数携带 token（解决后端握手阶段鉴权问题）
    let baseUrl: string;
    if (this._isH5) {
      if (this._useDirectFallback) {
        baseUrl = WS_DIRECT_URL;
        console.log('[ChatWS] H5 连接（直连后端 fallback）:', baseUrl);
      } else {
        baseUrl = WS_BASE_URL;
        console.log('[ChatWS] H5 连接（走代理）:', baseUrl);
      }
    } else {
      baseUrl = WS_BASE_URL;
      console.log('[ChatWS] 小程序连接（直连）:', baseUrl);
    }

    // 在 URL 上拼接 token 查询参数
    const url = token
      ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`
      : baseUrl;

    if (!token) {
      console.warn('[ChatWS] 无 token，后端可能拒绝握手');
    }

    try {
      // 销毁旧实例，防止残留连接
      if (this._ws) {
        try {
          if (this._isH5) {
            (this._ws as WebSocket).onopen = null;
            (this._ws as WebSocket).onmessage = null;
            (this._ws as WebSocket).onerror = null;
            (this._ws as WebSocket).onclose = null;
            if ((this._ws as WebSocket).readyState === WebSocket.OPEN || (this._ws as WebSocket).readyState === WebSocket.CONNECTING) {
              (this._ws as WebSocket).close(4001, 'Reconnecting');
            }
          }
        } catch {}
        this._ws = null;
      }

      // 连接超时保护：5秒内未连接成功则视为超时
      if (this._connectTimeoutTimer) clearTimeout(this._connectTimeoutTimer);
      this._connectTimeoutTimer = setTimeout(() => {
        if (this._status === 'connecting') {
          console.warn('[ChatWS] 连接超时（5秒），强制关闭并重连');
          if (this._ws) {
            // SocketTask 已存在，走正常关闭流程（会触发 onClose → 重连）
            this._doClose(4000, 'Connection timeout');
          } else {
            // Promise 尚未 resolve，无 SocketTask 可关闭，直接重连
            this._setStatus('closed');
            this._tryFallbackOrReconnect();
          }
        }
      }, 5000) as any;

      if (this._isH5 && typeof WebSocket !== 'undefined') {
        this._ws = new WebSocket(url);
        this._bindH5Events(this._ws as WebSocket, token);
      } else {
        // Taro 4.x: connectSocket 返回 Promise<SocketTask>，需通过 .then() 获取 SocketTask 实例
        this._ws = null; // 标记为 null，等待 Promise resolve
        Taro.connectSocket({
          url,
          protocols: [],
          complete: () => {},
        })
          .then((task: Taro.SocketTask) => {
            // Promise resolve 时检查是否已被取消（用户 disconnect 或超时关闭）
            if (this._status !== 'connecting') {
              console.log('[ChatWS] SocketTask 已 resolve 但连接状态已变更:', this._status, '，关闭残留 task');
              try {
                task.close({ code: 4001, reason: 'Cancelled', complete: () => {} });
              } catch {}
              return;
            }
            this._ws = task;
            this._bindMiniEvents(task, token);
          })
          .catch((err: any) => {
            console.error('[ChatWS] connectSocket Promise rejected:', err);
            if (this._status === 'connecting') {
              this._setStatus('closed');
              this._tryFallbackOrReconnect();
            }
          });
      }
    } catch (err) {
      console.error('[ChatWS] 创建连接异常:', err);
      this._setStatus('closed');
      this._tryFallbackOrReconnect();
    }
  }

  private _bindH5Events(ws: WebSocket, token: string): void {
    ws.onopen = () => this._onOpen(token);
    ws.onmessage = (ev: MessageEvent) => this._onMessage(ev.data);
    ws.onerror = (ev: Event) => {
      const wsAny = ws as any;
      console.error('[ChatWS] H5 WebSocket error:', {
        event: ev,
        readyState: wsAny.readyState,
        url: wsAny.url,
        // 诊断信息
        diagnostic: this._diagnoseError(wsAny, token),
      });
      // 握手失败后立即发送一次诊断探测（带/不带 Origin 的 HTTP 对比），
      // 帮助定位是否为后端 Origin 中间件 403 拒握手
      this._probeOriginPolicy(wsAny.url);
    };
    ws.onclose = (ev: CloseEvent) => {
      console.log(`[ChatWS] H5 关闭 code=${ev.code} reason=${ev.reason} wasClean=${ev.wasClean}`);
      this._onClose();
    };
  }

  private _bindMiniEvents(task: Taro.SocketTask, token: string): void {
    task.onOpen(() => this._onOpen(token));
    task.onMessage((res) => this._onMessage((res as any).data ?? res));
    task.onError((err) => console.error('[ChatWS] 小程序 WebSocket error:', err));
    task.onClose((res) => {
      console.log(`[ChatWS] 小程序 WebSocket 关闭 code=${res?.code} reason=${res?.reason}`);
      this._onClose();
    });
  }

  private _onOpen(token: string): void {
    console.log('[ChatWS] WebSocket 握手成功（URL token 鉴权通过）');
    // 清除连接超时定时器
    if (this._connectTimeoutTimer) {
      clearTimeout(this._connectTimeoutTimer);
      this._connectTimeoutTimer = null;
    }
    this._setStatus('open');
    this._reconnectAttempts = 0;

    // URL 已携带 token，握手成功即视为鉴权通过
    // 直接设置 _authSent = true，不发 auth 消息（避免后端不认 auth 类型而断开连接）
    this._authSent = true;
    this._startHeartbeat();
    this._flushSendQueue();
    console.log('[ChatWS] 鉴权通过（URL token），开始心跳并 flush 发送队列');
  }

  /**
   * 发送鉴权消息（首条消息方式）
   * 部分后端 WebSocket 不支持 URL query token，需在 open 后立即发送鉴权消息
   */
  private _sendAuthMessage(token: string): void {
    if (!this._ws || this._status !== 'open') return;

    const authMsg: WSOutboundMessage = {
      type: 'auth',
      data: { token },
    };

    try {
      const payload = JSON.stringify(authMsg);
      if (this._isH5) {
        (this._ws as WebSocket).send(payload);
      } else {
        (this._ws as Taro.SocketTask).send({
          data: payload,
          complete: () => {},
        });
      }
      this._authSent = true;
      console.log('[ChatWS] 鉴权消息已发送');

      // 鉴权超时保护：5 秒内未收到 auth_ack 则视为鉴权失败
      this._clearAuthTimer();
      this._authTimer = setTimeout(() => {
        if (!this._authSent && this._status === 'open') {
          console.warn('[ChatWS] 鉴权超时，关闭连接');
          this._doClose(4001, 'Auth timeout');
        }
      }, 5000) as any;

      // 启动心跳并 flush 发送队列
      this._startHeartbeat();
      this._flushSendQueue();
    } catch (err) {
      console.error('[ChatWS] 鉴权消息发送失败:', err);
      this._authSent = false;
      // 鉴权失败仍尝试继续连接
      this._startHeartbeat();
      this._flushSendQueue();
    }
  }

  private _clearAuthTimer(): void {
    if (this._authTimer) {
      clearTimeout(this._authTimer as any);
      this._authTimer = null;
    }
  }

  private _onClose(): void {
    // 清除连接超时定时器
    if (this._connectTimeoutTimer) {
      clearTimeout(this._connectTimeoutTimer);
      this._connectTimeoutTimer = null;
    }
    this._clearHeartbeat();
    this._clearAuthTimer();
    this._authSent = false;
    this._setStatus('closed');
    this._ws = null;
    if (this._shouldReconnect && !this._manualClose) {
      this._tryFallbackOrReconnect();
    }
  }

  /**
   * 尝试 fallback 到直连后端（仅 H5 环境的第一次失败），否则走常规重连
   */
  private _tryFallbackOrReconnect(): void {
    if (this._isH5 && !this._useDirectFallback && !this._fallbackTried) {
      // 第一次失败：尝试直连后端 fallback
      this._fallbackTried = true;
      this._useDirectFallback = true;
      console.warn('[ChatWS] 代理连接失败，尝试直连后端 fallback...');
      this._reconnectAttempts = 0;  // 重置重连计数
      this._scheduleReconnect(500);  // 快速重连
    } else {
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
    if (!this._ws || this._status !== 'open' || !this._authSent) {
      console.warn('[ChatWS] _doSend 拒绝: ws=', !!this._ws, 'status=', this._status, 'authSent=', this._authSent);
      return false;
    }
    try {
      const payload = JSON.stringify(msg);
      console.log('[ChatWS] _doSend 发送:', payload);
      if (this._isH5) {
        (this._ws as WebSocket).send(payload);
      } else {
        (this._ws as Taro.SocketTask).send({
          data: payload,
          fail: (err: any) => console.error('[ChatWS] 小程序 send 失败:', err),
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
    while (this._sendQueue.length > 0 && this._status === 'open' && this._authSent) {
      const msg = this._sendQueue.shift()!;
      if (!this._doSend(msg)) {
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

    // 鉴权确认
    if (parsed.type === 'auth_ack') {
      this._authSent = true;
      this._clearAuthTimer();
      console.log('[ChatWS] 鉴权成功', parsed.data);
      return;
    }

    // 心跳响应
    if (parsed.type === 'pong') {
      this._resetIdleTimer();
      return;
    }
    if (parsed.type === 'ping') {
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

    // 重置空闲计时
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
      if (this._status === 'open' && this._authSent) {
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

  private _scheduleReconnect(initialDelay?: number): void {
    this._clearReconnectTimer();
    if (!this._shouldReconnect) return;

    // 超过最大重连次数则停止，等待用户手动触发
    if (this._reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.warn(`[ChatWS] 已达最大重连次数 (${MAX_RECONNECT_ATTEMPTS})，停止自动重连，请手动触发`);
      this._setStatus('closed');
      return;
    }

    this._reconnectAttempts += 1;

    // 支持外部指定初始延迟（用于 fallback 快速重连）
    if (initialDelay !== undefined && this._reconnectAttempts === 1) {
      console.log(`[ChatWS] 🔄 fallback 重连，${initialDelay}ms 后...`);
      this._reconnectTimer = setTimeout(() => {
        if (this._shouldReconnect) this._doConnect();
      }, initialDelay);
      return;
    }

    const baseDelay = Math.min(
      BASE_RECONNECT_DELAY * Math.pow(2, this._reconnectAttempts - 1),
      MAX_RECONNECT_DELAY
    );
    const jitter = baseDelay * RECONNECT_JITTER * (Math.random() * 2 - 1);
    const delay = Math.round(baseDelay + jitter);

    console.log(`[ChatWS] 🔄 计划第 ${this._reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS} 次重连，${delay}ms 后...`);
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

  // ============== 内部：诊断工具 ==============

  private _diagnoseError(ws: any, token: string): string {
    const parts: string[] = [];
    parts.push(`readyState=${ws.readyState}`);
    parts.push(`url=${ws.url || 'N/A'}`);

    if (!ws.url) {
      parts.push('⚠️ WebSocket 未设置 URL');
    } else if (ws.url.startsWith('ws://localhost') || ws.url.startsWith('ws://127.0.0.1')) {
      parts.push('⚠️ 直连 localhost/127.0.0.1，若后端不在本机将无法连接');
    }

    if (!token) {
      parts.push('⚠️ 无 token，可能因未登录被后端拒绝');
    }

    parts.push(`代理配置: config/dev.ts 中 /api 代理 ws:true + onProxyReqWs 已剥离 Origin/Referer`);
    parts.push(`若直连后端: 后端 Origin 中间件必须放行 WebSocket 握手，否则浏览器强制 Origin → 403`);
    parts.push(`握手鉴权: 首条消息 {type:"auth",data:{token}} 方案已启用`);

    return parts.join(' | ');
  }

  /**
   * 主动探测后端 Origin 策略（WS 握手失败时触发一次，辅助诊断）
   * 带 Origin 与不带 Origin 的 HTTP GET 对比：
   *   - 403 (带) + 200 (不带)  → Origin 中间件黑名单拒绝，需后端放行 WebSocket 握手
   *   - 200 (带) + 200 (不带)  → Origin 校验正常，排查 WS 路由/Upgrade 处理
   */
  private _probeOriginPolicy(target: string): void {
    if (!target) return;
    const path = target.replace(/^wss?:\/\//, '').replace(/^[^/]+/, '') || '/';
    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const run = (withOrigin: boolean, tag: string) => {
      const headers: Record<string, string> = {};
      if (withOrigin) headers['Origin'] = baseOrigin;
      fetch(path, { method: 'GET', headers, mode: 'no-cors', cache: 'no-store' })
        .then(() => console.info(`[ChatWS] probe ${tag} OK (mode=no-cors)`))
        .catch((err) => console.info(`[ChatWS] probe ${tag} err:`, err));
    };
    console.groupCollapsed('[ChatWS] Origin 策略探测');
    console.info('目标路径:', path);
    run(true, 'with-Origin');
    run(false, 'no-Origin');
    console.groupEnd();
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