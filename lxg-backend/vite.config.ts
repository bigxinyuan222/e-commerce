import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: process.env.LXG_API_TARGET || 'http://192.168.10.7:8089',
        changeOrigin: true,
        configure(proxy) {
          proxy.on('proxyReq', (proxyRequest) => {
            // Match the legacy proxy: the backend rejects browser-origin headers.
            proxyRequest.removeHeader('origin')
            proxyRequest.removeHeader('referer')
          })
        },
      },
    },
  },
  preview: { port: 8081 },
})
