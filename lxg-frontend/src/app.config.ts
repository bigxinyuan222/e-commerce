export default defineAppConfig({
  pages: [
    // TabBar页面
    'pages/home/index',
    'pages/category/index',
    'pages/message/index',
    'pages/cart/index',
    'pages/user/mine/index',
    // 商品模块
    'pages/product/detail/index',
    'pages/product/evaluations/index',
    'pages/product/search/index',
    'pages/product/search-results/index',
    'pages/product/seckill/index',
    'pages/product/brands/index',
    'pages/product/brand-detail/index',
    // 购物车模块
    'pages/cart/checkout/index',
    // 订单模块
    'pages/order/list/index',
    'pages/order/detail/index',
    'pages/order/refund/index',
    'pages/order/review/index',
    'pages/order/return/index',
    // 用户模块
    'pages/user/login/index',
    'pages/user/profile/index',
    'pages/user/personal-info/index',
    'pages/user/account-name/index',
    'pages/user/coupons/index',
    // 客服模块
    'pages/customer-service/index',
    // 门店模块
    'pages/store/stores/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '乐享购',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f5f6f7'
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#e2231a',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/category/index',
        text: '分类'
      },
      {
        pagePath: 'pages/message/index',
        text: '消息'
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车'
      },
      {
        pagePath: 'pages/user/mine/index',
        text: '我的'
      }
    ]
  }
})