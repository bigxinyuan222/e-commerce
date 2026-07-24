<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ loading?: boolean }>()
const emit = defineEmits<{ submit: [username: string, password: string] }>()
const username = ref('')
const password = ref('')
const submit = () => emit('submit', username.value.trim(), password.value)
</script>
<template>
  <div class="login-page">
    <div class="login-left"><div class="login-logo-area"><div class="login-logo"><div class="login-logo-icon"><i class="fas fa-shopping-bag"></i></div><div class="login-brand"><h2>乐享购</h2><p>智慧零售 · 乐享生活</p></div></div></div><div class="login-features"><h1>一站式零售管理解决方案</h1><p>支持多门店管理、智能库存预警、客服协同，助力零售业务高效运营。</p><div class="login-feature-grid"><div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-chart-pie"></i></div><div class="login-feature-title">数据可视化</div><div class="login-feature-desc">实时业务数据报表</div></div><div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-headset"></i></div><div class="login-feature-title">客服协同</div><div class="login-feature-desc">集中处理客户消息</div></div><div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-shield-alt"></i></div><div class="login-feature-title">多级权限</div><div class="login-feature-desc">精细的角色权限管理</div></div><div class="login-feature-card"><div class="login-feature-icon"><i class="fas fa-mobile-alt"></i></div><div class="login-feature-title">多端适配</div><div class="login-feature-desc">支持 PC 与移动端管理</div></div></div></div></div>
    <div class="login-right"><div class="login-form-card"><div class="login-form-header"><div class="login-form-icon"><i class="fas fa-shopping-bag"></i></div><h2>欢迎登录</h2><p>请输入您的管理员账号</p></div><form id="loginForm" @submit.prevent="submit"><div class="login-form-group"><label for="username">账号</label><div class="login-form-input-wrap"><i class="fas fa-user"></i><input id="username" v-model="username" class="login-form-input" autocomplete="username" placeholder="请输入管理员账号" required /></div></div><div class="login-form-group"><label for="password">密码</label><div class="login-form-input-wrap"><i class="fas fa-lock"></i><input id="password" v-model="password" type="password" class="login-form-input" autocomplete="current-password" placeholder="请输入密码" required /></div></div><button type="submit" class="login-form-btn" :disabled="loading"><span><i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'"></i> {{ loading ? '登录中...' : '登录' }}</span></button></form></div></div>
  </div>
</template>
