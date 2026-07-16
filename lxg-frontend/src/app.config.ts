export default defineAppConfig({
  pages: [
    // TabBar页面
    'pages/home/index',
    'pages/category/index',
    'pages/message/index',
    'pages/cart/index',
    'pages/user/mine/index',
    // 首页模块（商品相关）
    'pages/home/detail/index',
    'pages/home/evaluations/index',
    'pages/home/search/index',
    'pages/home/search-results/index',
    'pages/home/seckill/index',
    'pages/home/brands/index',
    'pages/home/brand-detail/index',
    // 购物车模块
    'pages/cart/checkout/index',
    // 订单模块（购物车下单后）
    'pages/cart/order/list/index',
    'pages/cart/order/detail/index',
    'pages/cart/order/refund/index',
    'pages/cart/order/review/index',
    'pages/cart/order/return/index',
    // 用户模块
    'pages/user/login/index',
    'pages/user/profile/index',
    'pages/user/personal-info/index',
    'pages/user/account-name/index',
    'pages/user/coupons/index',
    // 消息模块（客服）
    'pages/message/customer-service/index',
    // 分类模块（门店）
    'pages/category/stores/index',
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