export default defineAppConfig({
  pages: [
    // TabBar页面
    'pages/home/index',
    'pages/category/index',
    'pages/message/index',
    'pages/cart/index',
    'pages/mine/index',
    // 商品相关
    'pages/product-detail/index',
    'pages/product-evaluations/index',
    'pages/search/index',
    'pages/seckill/index',
    'pages/group-buy/index',
    'pages/group-buy-detail/index',
    // 购物车与结算
    'pages/checkout/index',
    // 订单相关
    'pages/order-list/index',
    'pages/order-detail/index',
    'pages/refund-apply/index',
    'pages/return-apply/index',
    // 用户相关
    'pages/login/index',
    'pages/profile/index',
    'pages/favorites/index',
    // 优惠券
    'pages/coupon-center/index',
    'pages/my-coupons/index',
    // 门店
    'pages/stores/index',
    // 客服
    'pages/customer-service/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '商城',
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
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
