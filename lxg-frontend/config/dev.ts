import type { UserConfigExport } from '@tarojs/cli';

/**
 * 开发服务器 WebSocket 代理说明（403 握手拒连排查修复）：
 *
 * http-proxy-middleware v2 的事件模型：
 *   - onProxyReq(proxyReq)       → HTTP 请求转发前触发（proxyReq = 发到后端的 ClientRequest）
 *   - onProxyReqWs(proxyReq,...) → WebSocket upgrade 转发前触发（同上，可剥离 Origin/Referer）
 *
 * 浏览器 WebSocket 握手**强制**附带 Origin 头。若后端 Origin 中间件拒绝带 Origin 的请求，
 * 必须在代理转发前剥离 Origin/Referer，否则后端直接 403。
 *
 * 注意：早期误用的 `onUpgrade` 在 v2 中不存在；正确钩子是 `onProxyReqWs`。
 */

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {
    devServer: {
      open: false,
      port: 10090,
      proxy: {
        '/api': {
          target: 'http://192.168.10.7:8089',
          changeOrigin: true,
          secure: false,
          ws: true,
          // HTTP 请求转发前剥离浏览器添加的 Origin/Referer
          onProxyReq(proxyReq) {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          },
          // WebSocket upgrade 请求转发前剥离浏览器强制附带的 Origin/Referer
          // http-proxy-middleware v2 正确钩子：onProxyReqWs（而非 onUpgrade）
          onProxyReqWs(proxyReq) {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          },
        },
      },
    },
  },
} satisfies UserConfigExport<'webpack5'>;
