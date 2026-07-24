<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { allowedMenus, loadLegacyPage, renderLegacyPage, type AdminUser, type PageId } from './legacy/pages'
import { loginAdmin } from './services/auth'
import LoginForm from './components/LoginForm.vue'
import CouponsPage from './components/CouponsPage.vue'

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
  <div v-if="false" id="loginContainer">
    <div class="login-page">
      <div class="login-left">
        <div class="login-logo-area">
          <div class="login-logo">
            <div class="login-logo-icon"><i class="fas fa-shopping-bag"></i></div>
            <div class="login-brand"><h2>乐享购</h2><p>智慧零售 · 乐享生活</p></div>
          </div>
        </div>
        <div class="login-features">
          <h1>一站式零售管理解决方案</h1>
          <p>支持多门店管理、智能库存预警、客服协同，助力零售业务高效运营。</p>
          <div class="login-feature-grid">
            <div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-chart-pie"></i></div><div class="login-feature-title">数据可视化</div><div class="login-feature-desc">实时业务数据报表</div></div>
            <div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-headset"></i></div><div class="login-feature-title">客服协同</div><div class="login-feature-desc">集中处理客户消息</div></div>
            <div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-shield-alt"></i></div><div class="login-feature-title">多级权限</div><div class="login-feature-desc">精细的角色权限管理</div></div>
            <div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-mobile-alt"></i></div><div class="login-feature-title">多端适配</div><div class="login-feature-desc">支持 PC 与移动端管理</div></div>
          </div>
        </div>
      </div>
      <div class="login-right">
        <div class="login-form-card">
          <div class="login-form-header"><div class="login-form-icon"><i class="fas fa-shopping-bag"></i></div><h2>欢迎登录</h2><p>请输入您的管理员账号</p></div>
          <form id="loginForm" @submit.prevent="login">
            <div class="login-form-group"><label for="username">账号</label><div class="login-form-input-wrap"><i class="fas fa-user"></i><input id="username" v-model="username" class="login-form-input" autocomplete="username" placeholder="请输入管理员账号" required /></div></div>
            <div class="login-form-group"><label for="password">密码</label><div class="login-form-input-wrap"><i class="fas fa-lock"></i><input id="password" v-model="password" type="password" class="login-form-input" autocomplete="current-password" placeholder="请输入密码" required /></div></div>
            <button type="submit" class="login-form-btn" :disabled="loggingIn"><span><i :class="loggingIn ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'"></i> {{ loggingIn ? '登录中...' : '登录' }}</span></button>
          </form>
        </div>
      </div>
    </div>
  </div>

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
        <section v-for="menu in visibleMenus" :id="`panel-${menu.id}`" :key="menu.id" class="page-panel" :class="{ active: activePage === menu.id }">
          <CouponsPage v-if="menu.id === 'coupons'" :token="user?.token" />
          <div v-else v-html="renderLegacyPage(menu.id)"></div>
        </section>
      </main>
    </div>
  </div>
</template>
