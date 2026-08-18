<!--
  @description 主应用组件 - 电商后台管理系统根组件
  @module App
  @keyFeatures
    - 用户认证状态管理（登录/登出/会话恢复）
    - 基于角色的侧边栏菜单动态渲染
    - 页面路由与懒加载（Vue 组件 + 遗留页面兼容）
    - 主题切换（明/暗）
    - 个人信息弹窗
-->
<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { allowedMenus, loadLegacyPage, renderLegacyPage, type AdminUser, type PageId } from './legacy/pages'
import { fetchCurrentAdmin, loginAdmin } from './services/auth'
import LoginForm from './components/LoginForm.vue'
// 商品运营模块页面组件
import CouponsPage from './components/product-operations/CouponsPage.vue'
import ProductsPage from './components/product-operations/ProductsPage.vue'
import ReturnsPage from './components/store-management/ReturnsPage.vue'
import OrdersPage from './components/order-service/OrdersPage.vue'
import UsersPage from './components/system-management/UsersPage.vue'
import StockPage from './components/product-operations/StockPage.vue'
import ServicePage from './components/order-service/ServicePage.vue'
import NotificationPage from './components/system-management/NotificationPage.vue'
// 门店管理模块页面组件
import StoresPage from './components/store-management/StoresPage.vue'
import StoreManagePage from './components/store-management/StoreManagePage.vue'
import StoreOrdersPage from './components/order-service/StoreOrdersPage.vue'
// 系统管理模块页面组件
import AdminPage from './components/system-management/AdminPage.vue'
import PaymentPage from './components/system-management/PaymentPage.vue'
import SettingsPage from './components/system-management/SettingsPage.vue'
import MarketingPage from './components/product-operations/MarketingPage.vue'
import ReviewsPage from './components/product-operations/ReviewsPage.vue'
import StatisticsPage from './components/product-operations/StatisticsPage.vue'
import HomepagePage from './components/system-management/HomepagePage.vue'

/** 遗留页面桥接接口，用于与旧版全局脚本通信 */
interface LegacyBridge {
  setUser: (user: AdminUser) => void
}

// localStorage 存储键名，用于持久化当前登录管理员信息
const storageKey = 'lexiangou_admin_user'
// 从 localStorage 恢复上次登录的用户信息，实现会话保持
const stored = localStorage.getItem(storageKey)
const user = ref<AdminUser | null>(stored ? JSON.parse(stored) as AdminUser : null)
const activePage = ref<PageId>('stats')          // 当前激活的页面ID
const loggingIn = ref(false)                      // 登录请求进行中标志
const adminMenuOpen = ref(false)                  // 右上角管理员下拉菜单展开状态
const profileOpen = ref(false)                    // 个人信息弹窗展开状态
const profileLoading = ref(false)                 // 个人信息加载中标志
const todoOpen = ref(false)                       // 待办事项下拉展开状态
const theme = ref(localStorage.getItem('lxg_theme') || 'light')  // 当前主题（light/dark）
const loadedPages = new Set<PageId>()             // 已加载过的页面集合，用于避免重复加载
const pageRevision = ref(0)                       // 页面修订版本号，用于强制刷新统计页等动态内容

/** 根据当前用户角色过滤出可见的菜单项 */
const visibleMenus = computed(() => allowedMenus(user.value?.role || 'super_admin'))

/** 将菜单按 group 字段分组，用于侧边栏分区展示 */
const groupedMenus = computed(() => {
  const groups = new Map<string, typeof visibleMenus.value>()
  visibleMenus.value.forEach((menu) => groups.set(menu.group, [...(groups.get(menu.group) || []), menu]))
  return groups
})

/** 当前激活页面对应的菜单项，用于面包屑标题显示 */
const activeMenu = computed(() => visibleMenus.value.find(({ id }) => id === activePage.value) || visibleMenus.value[0])

/**
 * 获取遗留页面桥接对象
 * 该对象挂载在 window 上，用于将用户信息同步给旧版全局脚本
 */
function getBridge(): LegacyBridge {
  return (window as unknown as { legacyBridge: LegacyBridge }).legacyBridge
}

/**
 * 全局 Toast 提示
 * @param message 提示文本
 * @param type 提示类型：success / error / info
 * 通过动态创建 DOM 元素实现，3秒后自动消失
 */
function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'
  toast.innerHTML = `<i class="fas fa-${icon}"></i><span></span>`
  const label = toast.querySelector('span')
  if (label) label.textContent = message
  document.body.appendChild(toast)
  requestAnimationFrame(() => toast.classList.add('fade-in'))
  // 3秒后开始淡出，淡出动画300ms后移除元素
  window.setTimeout(() => {
    toast.classList.remove('fade-in')
    window.setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// 将 showToast 挂载到 window，供全局脚本和子组件调用
window.showToast = showToast

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * 登录成功后持久化用户信息并加载默认页面
 */
async function login(username: string, password: string) {
  loggingIn.value = true
  try {
    const nextUser = await loginAdmin(username, password)
    // 持久化用户信息到 localStorage，实现会话保持
    localStorage.setItem(storageKey, JSON.stringify(nextUser))
    // 同步用户信息到遗留页面桥接
    getBridge().setUser(nextUser)
    user.value = nextUser
    // 登录后默认跳转到该角色可见的第一个页面
    activePage.value = allowedMenus(nextUser.role)[0]?.id || 'stats'
    document.body.classList.add('show-main')
    await mountPage(activePage.value)
  } catch (error) {
    console.error('Login failed', error)
    showToast(error instanceof Error ? error.message : '登录失败，请检查账号或密码', 'error')
  } finally {
    loggingIn.value = false
  }
}

/** 用户登出，清除本地存储的用户信息并回到登录页 */
function logout() {
  localStorage.removeItem(storageKey)
  user.value = null
  document.body.classList.remove('show-main')
}

/** 角色ID到中文标签的映射表，用于个人信息弹窗展示 */
const roleLabels: Record<string, string> = {
  super_admin: '超级管理员',
  admin: '超级管理员',
  goods_op: '商品运营',
  order_cs: '订单客服',
  store_staff: '门店管理员',
  user: '普通用户',
}

/**
 * 将用户状态值转换为中文标签
 * @param status 用户状态（数字或字符串），兼容多种后端返回格式
 * @returns '正常' 或 '已停用'
 */
function statusLabel(status: AdminUser['status']) {
  if (status === undefined || status === null || status === '') return '正常'
  return status === 1 || status === '1' || status === 'active' || status === 'enabled' ? '正常' : '已停用'
}

/**
 * 打开个人信息弹窗
 * 从服务端获取最新的管理员信息并更新本地状态
 */
async function showProfile() {
  adminMenuOpen.value = false
  profileLoading.value = true
  profileOpen.value = true
  try {
    // 调用认证服务获取当前管理员最新信息
    const current = await fetchCurrentAdmin(user.value!.token)
    user.value = current
    localStorage.setItem(storageKey, JSON.stringify(current))
    getBridge().setUser(current)
  } catch (error) {
    profileOpen.value = false
    showToast(error instanceof Error ? error.message : '获取个人信息失败', 'error')
  } finally {
    profileLoading.value = false
  }
}

/** 切换明暗主题，并持久化到 localStorage */
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('lxg_theme', theme.value)
  document.documentElement.dataset.theme = theme.value
}

/**
 * 切换页面
 * @param id 目标页面ID，需在当前角色可见菜单范围内
 */
function switchPage(id: PageId) {
  // 权限校验：不在可见菜单中的页面不允许访问
  if (!visibleMenus.value.some((menu) => menu.id === id)) return
  activePage.value = id
  // 重置内容区滚动位置
  const content = document.querySelector('.content')
  if (content) content.scrollTop = 0
  void mountPage(id)
}

// 将 switchPage 挂载到 window，供遗留页面脚本调用
window.switchPage = (id: string) => switchPage(id as PageId)
// 提供给遗留页面刷新统计视图的全局回调
window.refreshStatsView = () => {
  if (activePage.value === 'stats') pageRevision.value += 1
}

/**
 * 挂载页面（首次加载时执行遗留页面的初始化逻辑）
 * @param id 页面ID，已加载过的页面会跳过
 */
async function mountPage(id: PageId) {
  if (loadedPages.has(id)) return
  await nextTick()
  await loadLegacyPage(id)
  loadedPages.add(id)
  // 统计页每次挂载时递增版本号，触发组件重新渲染获取最新数据
  if (id === 'stats') pageRevision.value += 1
}

/**
 * 组件挂载时的初始化逻辑
 * - 应用已保存的主题
 * - 若已登录则刷新管理员信息并加载默认页面
 */
onMounted(async () => {
  document.documentElement.dataset.theme = theme.value
  if (user.value) {
    try {
      // 刷新管理员信息，确保本地缓存与服务端同步
      const current = await fetchCurrentAdmin(user.value.token)
      user.value = current
      localStorage.setItem(storageKey, JSON.stringify(current))
    } catch (error) {
      console.warn('Failed to refresh current admin info', error)
    }
    getBridge().setUser(user.value)
    document.body.classList.add('show-main')
    // 确保当前激活页面在用户可见菜单范围内
    const first = visibleMenus.value[0]
    if (first && !visibleMenus.value.some(({ id }) => id === activePage.value)) activePage.value = first.id
    void mountPage(activePage.value)
  }
})
</script>

<!-- ============ 模板部分 ============ -->
<template>
  <!-- 未登录时显示登录表单 -->
  <LoginForm v-if="!user" :loading="loggingIn" @submit="login" />

  <!-- 已登录时显示主界面 -->
  <div v-if="user" id="mainContainer">
    <!-- 侧边栏：品牌Logo + 按分组展示的导航菜单 -->
    <aside class="sidebar">
      <div class="sidebar-brand"><div class="brand-icon"><i class="fas fa-store"></i></div><div class="brand-text">乐享<span>购</span></div></div>
      <nav id="sidebarNav" class="sidebar-nav">
        <!-- 遍历分组菜单，每个分组显示一个标签 + 若干菜单按钮 -->
        <template v-for="[group, items] in groupedMenus" :key="group">
          <div class="menu-label">{{ group }}</div>
          <button v-for="menu in items" :key="menu.id" type="button" class="menu-item" :class="{ active: activePage === menu.id }" :data-id="menu.id" @click="switchPage(menu.id)">
            <i :class="menu.icon"></i><span>{{ menu.label }}</span>
          </button>
        </template>
      </nav>
    </aside>
    <!-- 主内容区：顶部导航栏 + 页面内容 -->
    <div class="main-wrapper">
      <!-- 顶部导航栏：面包屑 + 主题切换 + 待办事项 + 管理员信息 -->
      <header class="header">
        <div class="header-left"><div class="breadcrumb">首页 / <span id="pageTitle">{{ activeMenu?.label }}</span></div></div>
        <div class="header-right">
          <!-- 主题切换按钮 -->
          <button class="icon-btn" type="button" title="切换主题" @click="toggleTheme"><i :class="theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'"></i></button>
          <!-- 待办事项按钮及下拉面板 -->
          <button id="todoBtn" class="icon-btn" type="button" title="待办事项" @click="todoOpen = !todoOpen"><i class="fas fa-bars"></i><span id="todoDot" class="dot"></span></button>
          <div v-show="todoOpen" id="todoDropdown" class="todo-dropdown"><div class="dropdown-header"><span class="dropdown-title"><i class="fas fa-tasks"></i> 待办事项</span><span class="dropdown-count">0</span></div><div class="dropdown-body"><div style="text-align:center;padding:30px;color:#94a3b8"><i class="fas fa-check-circle" style="font-size:32px;margin-bottom:8px"></i><div style="font-size:13px">暂无待办事项</div></div></div></div>
          <!-- 管理员头像及下拉菜单（个人信息 / 退出登录） -->
          <button id="adminProfile" type="button" class="admin-profile" @click="adminMenuOpen = !adminMenuOpen"><div class="avatar">{{ user.name.charAt(0) }}</div><div class="info"><div id="adminName" class="name">{{ user.name }}</div><div id="adminRole" class="role">{{ user.role }}</div></div><i class="fas fa-chevron-down" style="font-size:12px;color:#94a3b8"></i></button>
          <div v-show="adminMenuOpen" id="adminDropdown" class="admin-dropdown"><button type="button" class="dropdown-item" @click="showProfile"><i class="fas fa-user-circle"></i><span>个人信息</span></button><div class="dropdown-divider"></div><button type="button" class="dropdown-item" @click="logout"><i class="fas fa-sign-out-alt"></i><span>退出登录</span></button></div>
        </div>
      </header>
      <!-- 页面内容区：根据 activePage 动态渲染对应的 Vue 组件或遗留页面 -->
      <main id="contentArea" class="content">
        <section :id="`panel-${activePage}`" :key="`${activePage}-${pageRevision}`" class="page-panel active">
          <!-- 各业务页面的条件渲染，根据角色权限展示不同页面 -->
          <CouponsPage v-if="activePage === 'coupons'" :token="user?.token" />
          <StatisticsPage v-else-if="activePage === 'stats'" :token="user?.token" :role="user?.role" :store-id="user?.storeId" :user-name="user?.name" />
          <ProductsPage v-else-if="activePage === 'goods'" :token="user?.token" />
          <ReturnsPage v-else-if="activePage === 'returns'" :token="user?.token" :store-id="user?.storeId" />
          <OrdersPage v-else-if="activePage === 'orders'" :token="user?.token" :store-id="user?.storeId" :role="user?.role" />
          <UsersPage v-else-if="activePage === 'users'" :token="user?.token" />
          <StockPage v-else-if="activePage === 'stock'" :token="user?.token" />
          <ServicePage v-else-if="activePage === 'service'" :token="user?.token" :agent-name="user?.name" :agent-role="user?.roleName || user?.role" />
          <NotificationPage v-else-if="activePage === 'notification'" :token="user?.token" />
          <StoresPage v-else-if="activePage === 'stores'" :token="user?.token" />
          <StoreManagePage v-else-if="activePage === 'store_manage'" :token="user?.token" />
          <StoreOrdersPage v-else-if="activePage === 'store_orders'" :token="user?.token" />
          <AdminPage v-else-if="activePage === 'admin'" :token="user?.token" />
          <PaymentPage v-else-if="activePage === 'payment'" :token="user?.token" />
          <SettingsPage v-else-if="activePage === 'settings'" :token="user?.token" />
          <HomepagePage v-else-if="activePage === 'homepage'" :token="user?.token" />
          <MarketingPage v-else-if="activePage === 'marketing'" :token="user?.token" />
          <ReviewsPage v-else-if="activePage === 'reviews'" :token="user?.token" />
          <!-- 未匹配 Vue 组件时回退到遗留页面渲染 -->
          <div v-else v-html="renderLegacyPage(activePage)"></div>
        </section>
      </main>
    </div>
    <!-- 个人信息弹窗：展示管理员详细资料 -->
    <div v-if="profileOpen" class="profile-modal-overlay" @click.self="profileOpen = false">
      <section class="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title">
        <!-- 弹窗头部：标题 + 关闭按钮 -->
        <header class="profile-modal-header">
          <h2 id="profile-title">个人信息</h2>
          <button type="button" class="profile-modal-close" title="关闭" aria-label="关闭" @click="profileOpen = false"><i class="fas fa-times"></i></button>
        </header>
        <!-- 加载中状态 -->
        <div v-if="profileLoading" class="profile-loading"><i class="fas fa-spinner fa-spin"></i><span>正在获取个人信息...</span></div>
        <!-- 个人信息详情：头像摘要 + 账号/姓名/角色/手机号/状态/门店 -->
        <div v-else class="profile-modal-body">
          <div class="profile-summary"><div class="profile-avatar">{{ user.name.charAt(0) }}</div><div><strong>{{ user.name }}</strong><span>{{ user.roleName || roleLabels[user.role] || user.role }}</span></div></div>
          <dl class="profile-details">
            <div><dt>登录账号</dt><dd>{{ user.username || '-' }}</dd></div>
            <div><dt>姓名</dt><dd>{{ user.name }}</dd></div>
            <div><dt>角色</dt><dd>{{ user.roleName || roleLabels[user.role] || user.role }}</dd></div>
            <div><dt>手机号</dt><dd>{{ user.phone || '未设置' }}</dd></div>
            <div><dt>账号状态</dt><dd><span class="profile-status" :class="{ disabled: statusLabel(user.status) !== '正常' }">{{ statusLabel(user.status) }}</span></dd></div>
            <div><dt>所属门店</dt><dd>{{ user.storeName || '无' }}</dd></div>
          </dl>
        </div>
      </section>
    </div>
  </div>
</template>
