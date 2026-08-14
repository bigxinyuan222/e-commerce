<!--
  @description 登录表单组件 - 管理后台登录页面
  @module components/LoginForm
  @keyFeatures
    - 左侧品牌展示区（Logo + 功能介绍卡片）
    - 右侧登录表单（账号 + 密码）
    - 通过 emit 将登录凭证传递给父组件
-->
<script setup lang="ts">
import { ref } from 'vue'

// 接收父组件传入的加载状态，用于禁用按钮和显示加载动画
defineProps<{ loading?: boolean }>()

// 定义 submit 事件，携带用户名和密码
const emit = defineEmits<{ submit: [username: string, password: string] }>()

const username = ref('')   // 用户名输入值
const password = ref('')   // 密码输入值

/** 提交表单，trim 用户名后触发 submit 事件 */
const submit = () => emit('submit', username.value.trim(), password.value)
</script>

<!-- ============ 模板部分 ============ -->
<template>
  <div class="login-page">
    <!-- 左侧品牌展示区 -->
    <div class="login-left">
      <!-- 品牌Logo区域 -->
      <div class="login-logo-area">
        <div class="login-logo">
          <div class="login-logo-icon"><i class="fas fa-shopping-bag"></i></div>
          <div class="login-brand">
            <h2>乐享购</h2>
            <p>智慧零售 · 乐享生活</p>
          </div>
        </div>
      </div>
      <!-- 功能介绍区域：标题 + 描述 + 功能卡片网格 -->
      <div class="login-features">
        <h1>一站式零售管理解决方案</h1>
        <p>支持多门店管理、智能库存预警、客服协同，助力零售业务高效运营。</p>
        <div class="login-feature-grid">
          <div class="login-feature-card">
            <div class="login-feature-icon"><i class="fas fa-chart-pie"></i></div>
            <div class="login-feature-title">数据可视化</div>
            <div class="login-feature-desc">实时业务数据报表</div>
          </div>
          <div class="login-feature-card">
            <div class="login-feature-icon"><i class="fas fa-headset"></i></div>
            <div class="login-feature-title">客服协同</div>
            <div class="login-feature-desc">集中处理客户消息</div>
          </div>
          <div class="login-feature-card">
            <div class="login-feature-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="login-feature-title">多级权限</div>
            <div class="login-feature-desc">精细的角色权限管理</div>
          </div>
          <div class="login-feature-card">
            <div class="login-feature-icon"><i class="fas fa-mobile-alt"></i></div>
            <div class="login-feature-title">多端适配</div>
            <div class="login-feature-desc">支持 PC 与移动端管理</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧登录表单区域 -->
    <div class="login-right">
      <div class="login-form-card">
        <!-- 表单头部：图标 + 标题 + 提示 -->
        <div class="login-form-header">
          <div class="login-form-icon"><i class="fas fa-shopping-bag"></i></div>
          <h2>欢迎登录</h2>
          <p>请输入您的管理员账号</p>
        </div>
        <!-- 登录表单：账号 + 密码 + 提交按钮 -->
        <form id="loginForm" @submit.prevent="submit">
          <!-- 账号输入组 -->
          <div class="login-form-group">
            <label for="username">账号</label>
            <div class="login-form-input-wrap">
              <i class="fas fa-user"></i>
              <input id="username" v-model="username" class="login-form-input" autocomplete="username" placeholder="请输入管理员账号" required />
            </div>
          </div>
          <!-- 密码输入组 -->
          <div class="login-form-group">
            <label for="password">密码</label>
            <div class="login-form-input-wrap">
              <i class="fas fa-lock"></i>
              <input id="password" v-model="password" type="password" class="login-form-input" autocomplete="current-password" placeholder="请输入密码" required />
            </div>
          </div>
          <!-- 提交按钮：loading 状态下显示旋转图标并禁用 -->
          <button type="submit" class="login-form-btn" :disabled="loading">
            <span><i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'"></i> {{ loading ? '登录中...' : '登录' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
