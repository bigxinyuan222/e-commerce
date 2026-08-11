// ============================================
// 通知 Store（Zustand）
// 统一管理：通知列表、未读数、已读操作
// ============================================

import { create } from 'zustand';
import Taro from '@tarojs/taro';
import { apiGet, apiPut, getAuthToken } from '@/api/common';
import { notificationApi } from '@/api/message';

// ---------- 类型定义 ----------
export type NotificationType = 'system' | 'order' | 'promotion' | 'activity' | 'other';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  avatar?: string;
  icon?: string;
  time?: string;
  createdAt?: string;
  isRead: boolean;
  tag?: string;
  [key: string]: any;
}

interface NotificationStoreState {
  // 列表
  notifications: Notification[];
  loading: boolean;
  loaded: boolean;

  // 未读数
  unreadCount: number;
}

interface NotificationStoreActions {
  // 获取未读数
  fetchUnreadCount: () => Promise<number>;

  // 获取通知列表
  fetchNotifications: (forceRefresh?: boolean) => Promise<Notification[]>;

  // 标记单条已读
  markRead: (id: string) => Promise<void>;

  // 全部已读
  markAllRead: () => Promise<void>;

  // 重置
  reset: () => void;
}

export type NotificationStore = NotificationStoreState & NotificationStoreActions;

// ---------- 工具函数 ----------
function normalizeNotification(raw: any): Notification {
  const id = String(
    raw.id ?? raw.ID ?? raw.Id ?? raw.notificationId ?? raw.NotificationId ?? ''
  );
  const isRead = raw.isRead ?? raw.IsRead ?? raw.is_read ?? raw.read ?? raw.Read ?? false;
  const rawType = String(raw.type ?? raw.Type ?? raw.category ?? raw.Category ?? 'other');

  return {
    ...(raw || {}),
    id,
    type: (['system', 'order', 'promotion', 'activity'].includes(rawType) ? rawType : 'other') as NotificationType,
    title: raw.title ?? raw.Title ?? raw.name ?? raw.Name ?? '通知',
    content: raw.content ?? raw.Content ?? raw.message ?? raw.Message ?? raw.body ?? '',
    avatar: raw.avatar ?? raw.Avatar ?? raw.icon ?? raw.Icon ?? '',
    icon: raw.icon ?? raw.Icon ?? raw.avatar ?? raw.Avatar ?? '',
    time: raw.time ?? raw.Time ?? raw.createdAt ?? raw.CreatedAt ?? raw.created_at ?? '',
    createdAt: raw.createdAt ?? raw.CreatedAt ?? raw.created_at ?? raw.time ?? '',
    isRead: !!isRead,
    tag: raw.tag ?? raw.Tag ?? undefined,
  };
}

// tabBar 中"消息"页签的索引（首页0/分类1/消息2/购物车3/我的4）
const MESSAGE_TAB_INDEX = 2;

function updateTabBadge(count: number) {
  try {
    if (count > 0) {
      Taro.setTabBarBadge({
        index: MESSAGE_TAB_INDEX,
        text: count > 99 ? '99+' : String(count),
      });
    } else {
      Taro.removeTabBarBadge({ index: MESSAGE_TAB_INDEX });
    }
  } catch (err) {
    console.warn('[NotificationStore] 设置 tabBar 角标失败:', err);
  }
}

// ---------- Store 创建 ----------
export const useNotificationStore = create<NotificationStore>((set, get) => ({
  // ============ state ============
  notifications: [],
  loading: false,
  loaded: false,
  unreadCount: 0,

  // ============ actions ============

  async fetchUnreadCount() {
    if (!getAuthToken()) return 0;
    try {
      const res = await apiGet(notificationApi.unreadCount);
      const data = res?.data ?? res?.result ?? res;
      let count = 0;
      if (typeof data === 'number') count = data;
      else if (typeof data === 'string') count = parseInt(data, 10) || 0;
      else if (data && typeof data === 'object') {
        count = data.count ?? data.unreadCount ?? data.total ?? 0;
      }
      count = Math.max(0, Number(count) || 0);
      set({ unreadCount: count });
      updateTabBadge(count);
      return count;
    } catch (err: any) {
      console.error('[NotificationStore] fetchUnreadCount 失败:', err);
      return get().unreadCount;
    }
  },

  async fetchNotifications(forceRefresh = false) {
    if (!getAuthToken()) return [];
    const state = get();
    if (!forceRefresh && state.loaded && !state.loading) {
      return state.notifications;
    }
    set({ loading: true });
    try {
      const res = await apiGet(notificationApi.list);
      const data = res?.data ?? res?.result ?? res ?? [];
      const rawList = Array.isArray(data) ? data : data?.list ?? data?.records ?? [];
      const list = rawList.map(normalizeNotification);
      // 按时间倒序
      list.sort((a, b) => {
        const at = new Date(a.createdAt || a.time || 0).getTime();
        const bt = new Date(b.createdAt || b.time || 0).getTime();
        return bt - at;
      });
      set({ notifications: list, loaded: true });
      // 计算本地未读数（作为 unread-count 接口的补充）
      const localUnread = list.filter((n) => !n.isRead).length;
      if (localUnread > 0 && get().unreadCount === 0) {
        set({ unreadCount: localUnread });
        updateTabBadge(localUnread);
      }
      return list;
    } catch (err: any) {
      console.error('[NotificationStore] fetchNotifications 失败:', err);
      Taro.showToast({ title: err.message || '加载通知失败', icon: 'none' });
      return state.notifications;
    } finally {
      set({ loading: false });
    }
  },

  async markRead(id: string) {
    if (!id || id === 'undefined' || id === 'null') return;
    const state = get();
    const target = state.notifications.find((n) => n.id === id);
    if (!target || target.isRead) return;

    // 乐观更新
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, s.unreadCount - 1),
    }));
    const newCount = get().unreadCount;
    updateTabBadge(newCount);

    try {
      await apiPut(notificationApi.read, {}, { id });
      // 成功后重新拉取未读总数，保证与服务端一致
      await get().fetchUnreadCount();
    } catch (err: any) {
      console.error('[NotificationStore] markRead 失败:', err);
      // 回滚乐观更新
      set((s) => ({
        notifications: s.notifications.map((n) =>
          n.id === id ? { ...n, isRead: false } : n
        ),
        unreadCount: s.unreadCount + 1,
      }));
      updateTabBadge(get().unreadCount);
    }
  },

  async markAllRead() {
    const state = get();
    if (state.unreadCount === 0) {
      Taro.showToast({ title: '暂无未读通知', icon: 'none' });
      return;
    }

    // 乐观更新
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
    updateTabBadge(0);

    try {
      await apiPut(notificationApi.readAll);
      Taro.showToast({ title: '已全部已读', icon: 'success' });
    } catch (err: any) {
      console.error('[NotificationStore] markAllRead 失败:', err);
      Taro.showToast({ title: err.message || '操作失败', icon: 'none' });
      // 回滚：重新拉取
      await get().fetchNotifications(true);
      await get().fetchUnreadCount();
    }
  },

  reset() {
    set({
      notifications: [],
      loading: false,
      loaded: false,
      unreadCount: 0,
    });
    updateTabBadge(0);
  },
}));

export default useNotificationStore;
