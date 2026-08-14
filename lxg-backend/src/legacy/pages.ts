/**
 * @description 遗留页面配置模块 - 菜单定义、角色权限与遗留页面渲染
 * @module legacy/pages
 * @keyFeatures
 *   - 定义所有后台页面的菜单项（id/label/icon/group）
 *   - 基于角色的菜单访问控制
 *   - 遗留页面的渲染与加载（通过 window 全局函数桥接旧版脚本）
 *   - 统一的 AdminUser 用户信息类型定义
 */

/** 页面ID联合类型，涵盖所有后台页面标识 */
export type PageId =
  | 'stats' | 'goods' | 'stock' | 'reviews' | 'coupons' | 'marketing'
  | 'orders' | 'service' | 'stores' | 'returns' | 'users' | 'admin'
  | 'homepage' | 'notification' | 'payment' | 'settings' | 'store_manage' | 'store_orders'

/** 菜单项配置 */
export interface MenuItem {
  id: PageId             // 页面标识
  label: string          // 菜单显示名称
  icon: string           // 菜单图标（FontAwesome 类名）
  group: string          // 菜单分组名称，用于侧边栏分区
  protected?: boolean    // 是否为受保护页面（仅特定角色可见）
  exclusive?: boolean    // 是否为独占页面（仅门店角色可见，超级管理员不可见）
}

/** 管理员用户信息（前端统一的标准化结构） */
export interface AdminUser {
  id?: number
  username?: string
  name: string                    // 管理员姓名
  role: string                    // 角色标识（super_admin/goods_op/order_cs/store_staff 等）
  roleName?: string               // 角色显示名称
  phone?: string
  status?: string | number        // 账号状态
  storeId: string | null          // 所属门店ID
  storeName: string | null        // 所属门店名称
  token: string                   // JWT Token
}

/**
 * 全量菜单配置列表
 * 按 group 分为：商品运营、订单客服、门店管理、系统管理
 */
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

/**
 * 角色到可见页面的映射表
 * - super_admin/admin：可访问所有非独占（exclusive）页面
 * - 其他角色：只能访问各自职责范围内的页面
 */
const roleMenus: Record<string, PageId[]> = {
  super_admin: menus.filter(({ exclusive }) => !exclusive).map(({ id }) => id),
  admin: menus.filter(({ exclusive }) => !exclusive).map(({ id }) => id),
  user: ['stats', 'orders', 'service'],
  goods_op: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing'],
  order_cs: ['orders', 'service'],
  store_staff: ['store_manage', 'store_orders', 'returns'],
}

/** 遗留页面渲染工厂函数名映射（通过 window 全局函数渲染旧版页面HTML） */
const pageFactories: Partial<Record<PageId, string>> = {}

/** 遗留页面加载器函数名映射（页面首次挂载时需执行的初始化脚本） */
const pageLoaders: Partial<Record<PageId, string[]>> = {}

/** 遗留页面 HTML 缓存，避免重复渲染并在渲染失败时提供回退 */
const legacyPageCache = new Map<PageId, string>()

/**
 * 根据角色获取可见的菜单项列表
 * @param role 角色标识
 * @returns 该角色可见的 MenuItem 数组
 */
export function allowedMenus(role: string): MenuItem[] {
  const allowed = roleMenus[role] || roleMenus.super_admin
  return menus.filter(({ id }) => allowed.includes(id))
}

/**
 * 渲染遗留页面 HTML
 * @param id 页面ID
 * @returns 页面 HTML 字符串，渲染失败时返回缓存的 HTML 或错误提示
 */
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
    // 渲染失败时回退到上次缓存的 HTML
    return legacyPageCache.get(id) || '<div class="page-error"><p>页面加载失败</p></div>'
  }
}

/**
 * 加载遗留页面的初始化脚本
 * @param id 页面ID
 * 执行该页面关联的所有加载器函数（通过 window 全局函数调用）
 */
export async function loadLegacyPage(id: PageId): Promise<void> {
  await Promise.allSettled((pageLoaders[id] || []).map(async (name) => {
    const loader = window[name]
    if (typeof loader === 'function') await (loader as () => unknown)()
  }))
}
