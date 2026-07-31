<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { allowedMenus, loadLegacyPage, renderLegacyPage, type AdminUser, type PageId } from './legacy/pages'
import { loginAdmin } from './services/auth'
import LoginForm from './components/LoginForm.vue'
import CouponsPage from './components/CouponsPage.vue'
import ProductsPage from './components/ProductsPage.vue'
import ReturnsPage from './components/ReturnsPage.vue'
import OrdersPage from './components/OrdersPage.vue'
import UsersPage from './components/UsersPage.vue'
import StockPage from './components/StockPage.vue'
import ServicePage from './components/ServicePage.vue'
import NotificationPage from './components/NotificationPage.vue'
import StoresPage from './components/StoresPage.vue'
import AdminPage from './components/AdminPage.vue'
import PaymentPage from './components/PaymentPage.vue'

interface LegacyBridge {
  setUser: (user: AdminUser) => void
}

const storageKey = 'lexiangou_admin_user'
const stored = localStorage.getItem(storageKey)
const user = ref<AdminUser | null>(stored ? JSON.parse(stored) as AdminUser : null)
const activePage = ref<PageId>('stats')
const loggingIn = ref(false)
const adminMenuOpen = ref(false)
const todoOpen = ref(false)
const theme = ref(localStorage.getItem('lxg_theme') || 'light')
const loadedPages = new Set<PageId>()

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

async function mountPage(id: PageId) {
  if (loadedPages.has(id)) return
  await nextTick()
  await loadLegacyPage(id)
  loadedPages.add(id)
}

onMounted(() => {
  document.documentElement.dataset.theme = theme.value
  if (user.value) {
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
          <div v-show="adminMenuOpen" id="adminDropdown" class="admin-dropdown"><button type="button" class="dropdown-item" @click="switchPage('admin'); adminMenuOpen = false"><i class="fas fa-user-circle"></i><span>个人信息</span></button><div class="dropdown-divider"></div><button type="button" class="dropdown-item" @click="logout"><i class="fas fa-sign-out-alt"></i><span>退出登录</span></button></div>
        </div>
      </header>
      <main id="contentArea" class="content">
        <section :id="`panel-${activePage}`" :key="activePage" class="page-panel active">
          <CouponsPage v-if="activePage === 'coupons'" :token="user?.token" />
          <ProductsPage v-else-if="activePage === 'goods'" :token="user?.token" />
          <ReturnsPage v-else-if="activePage === 'returns'" :token="user?.token" :store-id="user?.storeId" />
          <OrdersPage v-else-if="activePage === 'orders'" :token="user?.token" :store-id="user?.storeId" />
          <UsersPage v-else-if="activePage === 'users'" :token="user?.token" />
          <StockPage v-else-if="activePage === 'stock'" :token="user?.token" />
          <ServicePage v-else-if="activePage === 'service'" :token="user?.token" />
          <NotificationPage v-else-if="activePage === 'notification'" :token="user?.token" />
          <StoresPage v-else-if="activePage === 'stores'" :token="user?.token" />
          <AdminPage v-else-if="activePage === 'admin'" :token="user?.token" />
          <PaymentPage v-else-if="activePage === 'payment'" :token="user?.token" />
          <div v-else v-html="renderLegacyPage(activePage)"></div>
        </section>
      </main>
    </div>
  </div>
</template>
