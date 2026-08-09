export type PageId =
  | 'stats' | 'goods' | 'stock' | 'reviews' | 'coupons' | 'marketing'
  | 'orders' | 'service' | 'stores' | 'returns' | 'users' | 'admin'
  | 'homepage' | 'notification' | 'payment' | 'settings' | 'store_manage' | 'store_orders'

export interface MenuItem {
  id: PageId
  label: string
  icon: string
  group: string
  protected?: boolean
  exclusive?: boolean
}

export interface AdminUser {
  id?: number
  username?: string
  name: string
  role: string
  roleName?: string
  phone?: string
  status?: string | number
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
  { id: 'store_manage', label: '专属门店管理', icon: 'fas fa-store', group: '门店管理', exclusive: true },
  { id: 'store_orders', label: '门店订单管理', icon: 'fas fa-shopping-bag', group: '门店管理', exclusive: true },
  { id: 'returns', label: '退货退款', icon: 'fas fa-undo-alt', group: '门店管理' },
  { id: 'users', label: '用户管理', icon: 'fas fa-users', group: '系统管理' },
  { id: 'admin', label: '管理员管理', icon: 'fas fa-user-shield', group: '系统管理', protected: true },
  { id: 'homepage', label: '首页管理', icon: 'fas fa-home', group: '系统管理' },
  { id: 'notification', label: '系统通知', icon: 'fas fa-bullhorn', group: '系统管理' },
  { id: 'payment', label: '支付管理', icon: 'fas fa-credit-card', group: '系统管理' },
  { id: 'settings', label: '系统设置', icon: 'fas fa-cog', group: '系统管理' },
]

const roleMenus: Record<string, PageId[]> = {
  super_admin: menus.filter(({ exclusive }) => !exclusive).map(({ id }) => id),
  admin: menus.filter(({ exclusive }) => !exclusive).map(({ id }) => id),
  user: ['stats', 'orders', 'service'],
  goods_op: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing'],
  order_cs: ['orders', 'service'],
  store_staff: ['store_manage', 'store_orders', 'returns'],
}

const pageFactories: Partial<Record<PageId, string>> = {
  stats: 'statsPage',
  homepage: 'homepagePage',
}

const pageLoaders: Partial<Record<PageId, string[]>> = {
  homepage: ['loadBanners', 'loadRecommendations', 'loadHomepageGoods'],
}

const legacyPageCache = new Map<PageId, string>()

function listFrom(data: any): any[] {
  if (Array.isArray(data)) return data
  return data?.list ?? data?.items ?? data?.records ?? data?.users ?? []
}

function orderStatus(value: unknown): string {
  if (typeof value === 'string' && Number.isNaN(Number(value))) return value
  return ({ 0: 'pending_payment', 1: 'grouping', 2: 'pending_delivery', 3: 'pending_pickup', 4: 'completed', 5: 'cancelled' } as Record<number, string>)[Number(value)] || 'unknown'
}

async function loadStatsData(): Promise<void> {
  let currentUser: AdminUser | undefined
  try {
    currentUser = JSON.parse(localStorage.getItem('lexiangou_admin_user') || 'null') as AdminUser | undefined
  } catch {
    currentUser = undefined
  }
  const headers = new Headers()
  if (currentUser?.token) headers.set('Authorization', `Bearer ${currentUser.token}`)

  async function get(url: string) {
    const response = await fetch(url, { credentials: 'include', headers })
    const payload = await response.json().catch(() => null)
    if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
      const error = new Error(payload?.message || `Stats request failed (${response.status})`) as Error & { status?: number }
      error.status = response.status
      throw error
    }
    return payload?.data ?? payload
  }

  const [orders, refunds, users, inventory] = await Promise.allSettled([
    get('/api/v1/admin/orders?page=1&pageSize=100'),
    get('/api/v1/admin/refunds?page=1&pageSize=100'),
    get('/api/v1/get/users?page=1&size=100'),
    get('/api/v1/admin/home'),
  ])

  const orderError = orders.status === 'rejected' ? orders.reason as { status?: number } : null
  const orderData = orders.status === 'fulfilled' ? orders.value : null
  const orderList = Array.isArray(orderData) ? orderData : orderData?.list ?? orderData?.items ?? orderData?.records ?? []
  // 商品运营没有订单明细权限，部分后端版本会以空列表和 200 响应代替 403。
  window.statsAccessDenied = orderError?.status === 401 || orderError?.status === 403 ||
    (currentUser?.role === 'goods_op' && orderList.length === 0)

  if (orders.status === 'fulfilled') {
    window.legacyOrderSnapshot = listFrom(orders.value).map(row => ({
      ...row,
      id: row.ID ?? row.id,
      status: orderStatus(row.status),
      storeId: row.store?.id ?? row.store_id ?? row.storeId ?? '',
      storeName: row.store?.name ?? row.store_name ?? row.storeName ?? '',
      totalAmount: Number(row.total_amount ?? row.totalAmount ?? row.amount) || 0,
      payAmount: Number(row.pay_amount ?? row.payAmount ?? 0) || 0,
      createdAt: row.created_at ?? row.createdAt ?? row.CreatedAt ?? '',
      items: row.items ?? row.order_items ?? row.orderItems ?? [],
    }))
  }
  if (refunds.status === 'fulfilled') {
    window.legacyRefundSnapshot = listFrom(refunds.value).map(row => ({
      ...row,
      status: Number(row.status) === 0 ? 'pending' : row.status,
      storeId: row.store?.id ?? row.store_id ?? row.storeId ?? '',
    }))
  }
  if (users.status === 'fulfilled') {
    window.statsUsersSnapshot = listFrom(users.value).map(row => ({
      ...row,
      registerTime: row.CreatedAt ?? row.createdAt ?? row.created_at ?? '',
    }))
  }
  if (inventory.status === 'fulfilled') {
    const warnings = Array.isArray(inventory.value?.warning_sku_list) ? inventory.value.warning_sku_list : []
    window.statsStockSnapshot = warnings.map((row: any) => ({
      ...row,
      stock: Number(row.stock) || 0,
      threshold: Number(row.warning_value ?? row.warningValue ?? row.threshold) || 0,
    }))
  }

}

export function allowedMenus(role: string): MenuItem[] {
  const allowed = roleMenus[role] || roleMenus.super_admin
  return menus.filter(({ id }) => allowed.includes(id))
}

export function renderLegacyPage(id: PageId): string {
  const factoryName = pageFactories[id]
  const factory = factoryName ? window[factoryName] : undefined
  if (typeof factory !== 'function') return '<div class="page-error"><p>页面加载失败</p></div>'
  try {
    const html = (factory as () => string)()
    legacyPageCache.set(id, html)
    return html
  } catch (error) {
    console.error(`Unable to render ${id}`, error)
    return legacyPageCache.get(id) || '<div class="page-error"><p>页面加载失败</p></div>'
  }
}

export async function loadLegacyPage(id: PageId): Promise<void> {
  if (id === 'stats') await loadStatsData()
  await Promise.allSettled((pageLoaders[id] || []).map(async (name) => {
    const loader = window[name]
    if (typeof loader === 'function') await (loader as () => unknown)()
  }))
}
