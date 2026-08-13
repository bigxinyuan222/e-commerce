<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { allowedMenus, loadLegacyPage, renderLegacyPage, type AdminUser, type PageId } from './legacy/pages'
import { fetchCurrentAdmin, loginAdmin } from './services/auth'
import LoginForm from './components/LoginForm.vue'
import CouponsPage from './components/product-operations/CouponsPage.vue'
import ProductsPage from './components/product-operations/ProductsPage.vue'
import ReturnsPage from './components/store-management/ReturnsPage.vue'
import OrdersPage from './components/order-service/OrdersPage.vue'
import UsersPage from './components/system-management/UsersPage.vue'
import StockPage from './components/product-operations/StockPage.vue'
import ServicePage from './components/order-service/ServicePage.vue'
import NotificationPage from './components/system-management/NotificationPage.vue'
import StoresPage from './components/store-management/StoresPage.vue'
import StoreManagePage from './components/store-management/StoreManagePage.vue'
import StoreOrdersPage from './components/order-service/StoreOrdersPage.vue'
import AdminPage from './components/system-management/AdminPage.vue'
import PaymentPage from './components/system-management/PaymentPage.vue'
import SettingsPage from './components/system-management/SettingsPage.vue'
import MarketingPage from './components/product-operations/MarketingPage.vue'
import ReviewsPage from './components/product-operations/ReviewsPage.vue'
import StatisticsPage from './components/product-operations/StatisticsPage.vue'
import HomepagePage from './components/system-management/HomepagePage.vue'

interface LegacyBridge {
  setUser: (user: AdminUser) => void
}

const storageKey = 'lexiangou_admin_user'
const stored = localStorage.getItem(storageKey)
const user = ref<AdminUser | null>(stored ? JSON.parse(stored) as AdminUser : null)
const activePage = ref<PageId>('stats')
const loggingIn = ref(false)
const adminMenuOpen = ref(false)
const profileOpen = ref(false)
const profileLoading = ref(false)
const todoOpen = ref(false)
const theme = ref(localStorage.getItem('lxg_theme') || 'light')
const loadedPages = new Set<PageId>()
const pageRevision = ref(0)

const visibleMenus = computed(() => allowedMenus(user.value?.role || 'super_admin'))
const groupedMenus = computed(() => {
  const groups = new Map<string, typeof visibleMenus.value>()
  visibleMenus.value.forEach((menu) => groups.set(menu.group, [...(groups.get(menu.group) || []), menu]))
  return groups
})
const activeMenu = computed(() => visibleMenus.value.find(({ id }) => id === activePage.value) || visibleMenus.value[0])

function getBridge(): LegacyBridge {
  return (window as unknown as { legacyBridge: LegacyBridge }).legacyBridge
}

function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'
  toast.innerHTML = `<i class="fas fa-${icon}"></i><span></span>`
  const label = toast.querySelector('span')
  if (label) label.textContent = message
  document.body.appendChild(toast)
  requestAnimationFrame(() => toast.classList.add('fade-in'))
  window.setTimeout(() => {
    toast.classList.remove('fade-in')
    window.setTimeout(() => toast.remove(), 300)
  }, 3000)
}

window.showToast = showToast

async function login(username: string, password: string) {
  loggingIn.value = true
  try {
    const nextUser = await loginAdmin(username, password)
    localStorage.setItem(storageKey, JSON.stringify(nextUser))
    getBridge().setUser(nextUser)
    user.value = nextUser
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

function logout() {
  localStorage.removeItem(storageKey)
  user.value = null
  document.body.classList.remove('show-main')
}

const roleLabels: Record<string, string> = {
  super_admin: '超级管理员',
  admin: '超级管理员',
  goods_op: '商品运营',
  order_cs: '订单客服',
  store_staff: '门店管理员',
  user: '普通用户',
}

function statusLabel(status: AdminUser['status']) {
  if (status === undefined || status === null || status === '') return '正常'
  return status === 1 || status === '1' || status === 'active' || status === 'enabled' ? '正常' : '已停用'
}

async function showProfile() {
  adminMenuOpen.value = false
  profileLoading.value = true
  profileOpen.value = true
  try {
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

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('lxg_theme', theme.value)
  document.documentElement.dataset.theme = theme.value
}

function switchPage(id: PageId) {
  if (!visibleMenus.value.some((menu) => menu.id === id)) return
  activePage.value = id
  const content = document.querySelector('.content')
  if (content) content.scrollTop = 0
  void mountPage(id)
}

window.switchPage = (id: string) => switchPage(id as PageId)
window.refreshStatsView = () => {
  if (activePage.value === 'stats') pageRevision.value += 1
}

async function mountPage(id: PageId) {
  if (loadedPages.has(id)) return
  await nextTick()
  await loadLegacyPage(id)
  loadedPages.add(id)
  if (id === 'stats') pageRevision.value += 1
}

onMounted(async () => {
  document.documentElement.dataset.theme = theme.value
  if (user.value) {
    try {
      const current = await fetchCurrentAdmin(user.value.token)
      user.value = current
      localStorage.setItem(storageKey, JSON.stringify(current))
    } catch (error) {
      console.warn('Failed to refresh current admin info', error)
    }
    getBridge().setUser(user.value)
    document.body.classList.add('show-main')
    const first = visibleMenus.value[0]
    if (first && !visibleMenus.value.some(({ id }) => id === activePage.value)) activePage.value = first.id
    void mountPage(activePage.value)
  }
})
</script>

<template>
  <LoginForm v-if="!user" :loading="loggingIn" @submit="login" />

  <div v-if="user" id="mainContainer">
    <aside class="sidebar">
      <div class="sidebar-brand"><div class="brand-icon"><i class="fas fa-store"></i></div><div class="brand-text">乐享<span>购</span></div></div>
      <nav id="sidebarNav" class="sidebar-nav">
        <template v-for="[group, items] in groupedMenus" :key="group">
          <div class="menu-label">{{ group }}</div>
          <button v-for="menu in items" :key="menu.id" type="button" class="menu-item" :class="{ active: activePage === menu.id }" :data-id="menu.id" @click="switchPage(menu.id)">
            <i :class="menu.icon"></i><span>{{ menu.label }}</span>
          </button>
        </template>
      </nav>
    </aside>
    <div class="main-wrapper">
      <header class="header">
        <div class="header-left"><div class="breadcrumb">首页 / <span id="pageTitle">{{ activeMenu?.label }}</span></div></div>
        <div class="header-right">
          <button class="icon-btn" type="button" title="切换主题" @click="toggleTheme"><i :class="theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'"></i></button>
          <button id="todoBtn" class="icon-btn" type="button" title="待办事项" @click="todoOpen = !todoOpen"><i class="fas fa-bars"></i><span id="todoDot" class="dot"></span></button>
          <div v-show="todoOpen" id="todoDropdown" class="todo-dropdown"><div class="dropdown-header"><span class="dropdown-title"><i class="fas fa-tasks"></i> 待办事项</span><span class="dropdown-count">0</span></div><div class="dropdown-body"><div style="text-align:center;padding:30px;color:#94a3b8"><i class="fas fa-check-circle" style="font-size:32px;margin-bottom:8px"></i><div style="font-size:13px">暂无待办事项</div></div></div></div>
          <button id="adminProfile" type="button" class="admin-profile" @click="adminMenuOpen = !adminMenuOpen"><div class="avatar">{{ user.name.charAt(0) }}</div><div class="info"><div id="adminName" class="name">{{ user.name }}</div><div id="adminRole" class="role">{{ user.role }}</div></div><i class="fas fa-chevron-down" style="font-size:12px;color:#94a3b8"></i></button>
          <div v-show="adminMenuOpen" id="adminDropdown" class="admin-dropdown"><button type="button" class="dropdown-item" @click="showProfile"><i class="fas fa-user-circle"></i><span>个人信息</span></button><div class="dropdown-divider"></div><button type="button" class="dropdown-item" @click="logout"><i class="fas fa-sign-out-alt"></i><span>退出登录</span></button></div>
        </div>
      </header>
      <main id="contentArea" class="content">
        <section :id="`panel-${activePage}`" :key="`${activePage}-${pageRevision}`" class="page-panel active">
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
          <div v-else v-html="renderLegacyPage(activePage)"></div>
        </section>
      </main>
    </div>
    <div v-if="profileOpen" class="profile-modal-overlay" @click.self="profileOpen = false">
      <section class="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title">
        <header class="profile-modal-header">
          <h2 id="profile-title">个人信息</h2>
          <button type="button" class="profile-modal-close" title="关闭" aria-label="关闭" @click="profileOpen = false"><i class="fas fa-times"></i></button>
        </header>
        <div v-if="profileLoading" class="profile-loading"><i class="fas fa-spinner fa-spin"></i><span>正在获取个人信息...</span></div>
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
