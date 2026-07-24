export type PageId =
  | 'stats' | 'goods' | 'stock' | 'reviews' | 'coupons' | 'marketing'
  | 'orders' | 'service' | 'stores' | 'returns' | 'users' | 'admin'
  | 'homepage' | 'notification' | 'payment' | 'settings'

export interface MenuItem {
  id: PageId
  label: string
  icon: string
  group: string
  protected?: boolean
}

export interface AdminUser {
  name: string
  role: string
  storeId: string | null
  storeName: string | null
  token: string
}

export const menus: MenuItem[] = [
  { id: 'stats', label: '数据统计', icon: 'fas fa-chart-pie', group: '商品运营' },
  { id: 'goods', label: '商品管理', icon: 'fas fa-box', group: '商品运营' },
  { id: 'stock', label: '库存管理', icon: 'fas fa-warehouse', group: '商品运营' },
  { id: 'reviews', label: '评价管理', icon: 'fas fa-star', group: '商品运营' },
  { id: 'coupons', label: '优惠券管理', icon: 'fas fa-ticket-alt', group: '商品运营' },
  { id: 'marketing', label: '营销活动', icon: 'fas fa-bullhorn', group: '商品运营' },
  { id: 'orders', label: '订单管理', icon: 'fas fa-shopping-bag', group: '订单客服' },
  { id: 'service', label: '客服消息', icon: 'fas fa-headset', group: '订单客服' },
  { id: 'stores', label: '门店总览', icon: 'fas fa-store-alt', group: '门店管理', protected: true },
  { id: 'returns', label: '退货退款', icon: 'fas fa-undo-alt', group: '门店管理' },
  { id: 'users', label: '用户管理', icon: 'fas fa-users', group: '系统管理' },
  { id: 'admin', label: '管理员管理', icon: 'fas fa-user-shield', group: '系统管理', protected: true },
  { id: 'homepage', label: '首页管理', icon: 'fas fa-home', group: '系统管理' },
  { id: 'notification', label: '系统通知', icon: 'fas fa-bullhorn', group: '系统管理' },
  { id: 'payment', label: '支付管理', icon: 'fas fa-credit-card', group: '系统管理' },
  { id: 'settings', label: '系统设置', icon: 'fas fa-cog', group: '系统管理' },
]

const roleMenus: Record<string, PageId[]> = {
  super_admin: menus.map(({ id }) => id),
  admin: menus.map(({ id }) => id),
  user: ['stats', 'orders', 'service'],
  goods_op: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing'],
  order_cs: ['orders', 'service'],
  store_staff: ['stores', 'returns'],
}

const pageFactories: Record<PageId, string> = {
  stats: 'statsPage', goods: 'goodsPage', stock: 'stockPage', reviews: 'reviewsPage',
  coupons: 'couponsPage', marketing: 'marketingPage', orders: 'ordersPage',
  service: 'servicePage', stores: 'storesPage', returns: 'returnsPage', users: 'usersPage',
  admin: 'adminPage', homepage: 'homepagePage', notification: 'notificationPage',
  payment: 'paymentPage', settings: 'settingsPage',
}

const pageLoaders: Partial<Record<PageId, string[]>> = {
  goods: ['loadGoods', 'loadCategories', 'loadBrands', 'loadSpecs'],
  stock: ['loadStock'], reviews: ['loadReviews', 'loadSummaries'],
  marketing: ['loadSeckill'], orders: ['loadOrders'], service: ['loadChats'],
  stores: ['loadStores'], returns: ['loadReturns', 'loadReturnReasons'], users: ['loadUsers'],
  admin: ['loadAdmins', 'loadAdminStores'],
  homepage: ['loadBanners', 'loadRecommendations', 'loadHomepageGoods'],
  notification: ['loadNotifications', 'loadTemplates'], payment: ['loadPayments', 'loadRefunds'],
  settings: ['loadLogs'],
}

export function allowedMenus(role: string): MenuItem[] {
  const allowed = roleMenus[role] || roleMenus.super_admin
  return menus.filter(({ id }) => allowed.includes(id))
}

export function renderLegacyPage(id: PageId): string {
  const factory = window[pageFactories[id]]
  if (typeof factory !== 'function') return '<div class="page-error"><p>页面加载失败</p></div>'
  try {
    return (factory as () => string)()
  } catch (error) {
    console.error(`Unable to render ${id}`, error)
    return '<div class="page-error"><p>页面加载失败</p></div>'
  }
}

export async function loadLegacyPage(id: PageId): Promise<void> {
  await Promise.allSettled((pageLoaders[id] || []).map(async (name) => {
    const loader = window[name]
    if (typeof loader === 'function') await (loader as () => unknown)()
  }))
}
