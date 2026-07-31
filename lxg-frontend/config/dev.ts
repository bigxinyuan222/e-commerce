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
      port: 10090,
      proxy: {
        '/api': {
          target: 'http://192.168.10.7:8089',
          changeOrigin: true,
          secure: false,
          onProxyReq(proxyReq, req, res) {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          },
        },
      },
    },
  },
} satisfies UserConfigExport<'webpack5'>;
