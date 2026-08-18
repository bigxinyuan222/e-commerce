/**
 * @description 应用入口文件 - 电商后台管理系统启动入口
 * @module main
 * @keyFeatures
 *   - 创建 Vue 应用实例
 *   - 挂载到 DOM 的 #app 节点
 */
import { createApp } from 'vue'
import App from './App.vue'

// 创建 Vue 应用实例并挂载到 index.html 中的 #app 元素
createApp(App).mount('#app')
