import type { UserConfigExport } from '@tarojs/cli';
export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
  h5: {
    devServer: {
      open: false,
      port: 10086,
      proxy: {
        '/api': {
          target: 'http://192.168.10.7:8089',
          changeOrigin: true,
          secure: false,
          onProxyReq(proxyReq) {
            proxyReq.setHeader('origin', 'http://192.168.10.7:8089');
            proxyReq.setHeader('referer', 'http://192.168.10.7:8089/');
          },
        },
      },
    },
  },
} satisfies UserConfigExport<'webpack5'>;
