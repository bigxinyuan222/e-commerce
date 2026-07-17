"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/data/common/coupons.ts":
/*!************************************!*\
  !*** ./src/data/common/coupons.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   availableCoupons: function() { return /* binding */ availableCoupons; },
/* harmony export */   myCoupons: function() { return /* binding */ myCoupons; }
/* harmony export */ });
/* unused harmony export getMyAvailableCoupons */
// 优惠券数据

// 我的优惠券
var myCoupons = [{
  id: 'my-coupon-001',
  name: '新人专享券',
  type: 'cash',
  value: 20,
  minAmount: 100,
  scope: 'all',
  scopeText: '全场通用',
  startTime: '2024-01-01',
  endTime: '2024-12-31',
  totalCount: 1,
  remainCount: 1,
  status: 'available'
}, {
  id: 'my-coupon-002',
  name: '手机专享券',
  type: 'cash',
  value: 50,
  minAmount: 500,
  scope: 'category',
  scopeText: '仅限手机品类',
  startTime: '2024-01-01',
  endTime: '2024-06-30',
  totalCount: 1,
  remainCount: 1,
  status: 'available'
}];

// 可领取优惠券
var availableCoupons = [{
  id: 'coupon-001',
  name: '新人专享券',
  type: 'cash',
  value: 20,
  minAmount: 100,
  scope: 'all',
  scopeText: '全场通用',
  startTime: '2024-06-01',
  endTime: '2024-06-30',
  totalCount: 10000,
  remainCount: 5678,
  status: 'available'
}, {
  id: 'coupon-002',
  name: '数码品类满300减50',
  type: 'cash',
  value: 50,
  minAmount: 300,
  scope: 'category',
  scopeText: '仅限数码品类',
  categoryId: 'digital',
  startTime: '2024-06-01',
  endTime: '2024-06-30',
  totalCount: 5000,
  remainCount: 2345,
  status: 'available'
}, {
  id: 'coupon-003',
  name: '美妆护肤满200减30',
  type: 'cash',
  value: 30,
  minAmount: 200,
  scope: 'category',
  scopeText: '仅限美妆护肤',
  categoryId: 'beauty',
  startTime: '2024-06-01',
  endTime: '2024-06-30',
  totalCount: 3000,
  remainCount: 1234,
  status: 'available'
}, {
  id: 'coupon-004',
  name: '服饰鞋包满199减25',
  type: 'cash',
  value: 25,
  minAmount: 199,
  scope: 'category',
  scopeText: '仅限服饰鞋包',
  categoryId: 'clothing',
  startTime: '2024-06-01',
  endTime: '2024-06-30',
  totalCount: 4000,
  remainCount: 3120,
  status: 'available'
}, {
  id: 'coupon-005',
  name: '优惠12无门槛',
  type: 'cash',
  value: 12,
  minAmount: 0,
  scope: 'product',
  scopeText: '仅限此商品',
  productId: 'product-1',
  startTime: '2024-06-01',
  endTime: '2024-12-31',
  totalCount: 1000,
  remainCount: 456,
  status: 'available'
}, {
  id: 'coupon-005b',
  name: '优惠8无门槛',
  type: 'cash',
  value: 8,
  minAmount: 0,
  scope: 'product',
  scopeText: '仅限此商品',
  productId: 'product-1',
  startTime: '2024-06-01',
  endTime: '2024-12-31',
  totalCount: 1000,
  remainCount: 321,
  status: 'available'
}, {
  id: 'coupon-006',
  name: '优惠15无门槛',
  type: 'cash',
  value: 15,
  minAmount: 0,
  scope: 'product',
  scopeText: '仅限此商品',
  productId: 'product-2',
  startTime: '2024-06-01',
  endTime: '2024-12-31',
  totalCount: 2000,
  remainCount: 890,
  status: 'available'
}, {
  id: 'coupon-006b',
  name: '优惠5无门槛',
  type: 'cash',
  value: 5,
  minAmount: 0,
  scope: 'product',
  scopeText: '仅限此商品',
  productId: 'product-2',
  startTime: '2024-06-01',
  endTime: '2024-12-31',
  totalCount: 2000,
  remainCount: 654,
  status: 'available'
}, {
  id: 'coupon-007',
  name: '优惠10无门槛',
  type: 'cash',
  value: 10,
  minAmount: 0,
  scope: 'product',
  scopeText: '仅限此商品',
  productId: 'product-3',
  startTime: '2024-06-01',
  endTime: '2024-12-31',
  totalCount: 1500,
  remainCount: 678,
  status: 'available'
}, {
  id: 'coupon-007b',
  name: '优惠6无门槛',
  type: 'cash',
  value: 6,
  minAmount: 0,
  scope: 'product',
  scopeText: '仅限此商品',
  productId: 'product-3',
  startTime: '2024-06-01',
  endTime: '2024-12-31',
  totalCount: 1500,
  remainCount: 234,
  status: 'available'
}, {
  id: 'coupon-008',
  name: '家居用品满100减15',
  type: 'cash',
  value: 15,
  minAmount: 100,
  scope: 'category',
  scopeText: '仅限家居用品',
  categoryId: 'home',
  startTime: '2024-06-01',
  endTime: '2024-06-30',
  totalCount: 5000,
  remainCount: 4321,
  status: 'available'
}];

// 获取我的可用优惠券
var getMyAvailableCoupons = function getMyAvailableCoupons() {
  return myCoupons.filter(function (c) {
    return c.status === 'available';
  });
};

/***/ }),

/***/ "./src/data/common/home.ts":
/*!*********************************!*\
  !*** ./src/data/common/home.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   banners: function() { return /* binding */ banners; },
/* harmony export */   categories: function() { return /* binding */ categories; },
/* harmony export */   hotSearchKeywords: function() { return /* binding */ hotSearchKeywords; },
/* harmony export */   seckillActivity: function() { return /* binding */ seckillActivity; },
/* harmony export */   seckillProducts: function() { return /* binding */ seckillProducts; }
/* harmony export */ });
/* unused harmony export searchProducts */
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");


// ============================================
// 轮播图数据
// ============================================

var banners = [{
  id: '1',
  image: 'https://picsum.photos/id/292/750/400',
  type: 'seckill',
  targetId: 'seckill-1'
}, {
  id: '2',
  image: 'https://picsum.photos/id/326/750/400',
  type: 'product',
  targetId: 'product-2'
}, {
  id: '3',
  image: 'https://picsum.photos/id/431/750/400',
  type: 'product',
  targetId: 'product-1'
}, {
  id: '4',
  image: 'https://picsum.photos/id/580/750/400',
  type: 'category',
  targetId: 'category-1'
}, {
  id: '5',
  image: 'https://picsum.photos/id/625/750/400',
  type: 'url',
  url: '/pages/seckill/index'
}];

// 分类数据
var categories = [{
  id: '1',
  name: '手机数码',
  icon: 'https://picsum.photos/id/1/100/100',
  children: [{
    id: '1-1',
    name: '手机',
    icon: ''
  }, {
    id: '1-2',
    name: '平板',
    icon: ''
  }, {
    id: '1-3',
    name: '耳机',
    icon: ''
  }, {
    id: '1-4',
    name: '充电宝',
    icon: ''
  }]
}, {
  id: '2',
  name: '电脑办公',
  icon: 'https://picsum.photos/id/2/100/100',
  children: [{
    id: '2-1',
    name: '笔记本',
    icon: ''
  }, {
    id: '2-2',
    name: '台式机',
    icon: ''
  }, {
    id: '2-3',
    name: '打印机',
    icon: ''
  }, {
    id: '2-4',
    name: '键鼠',
    icon: ''
  }]
}, {
  id: '3',
  name: '服饰鞋包',
  icon: 'https://picsum.photos/id/103/100/100',
  children: [{
    id: '3-1',
    name: '男装',
    icon: ''
  }, {
    id: '3-2',
    name: '女装',
    icon: ''
  }, {
    id: '3-3',
    name: '鞋',
    icon: ''
  }, {
    id: '3-4',
    name: '箱包',
    icon: ''
  }]
}, {
  id: '4',
  name: '家用电器',
  icon: 'https://picsum.photos/id/225/100/100',
  children: [{
    id: '4-1',
    name: '冰箱',
    icon: ''
  }, {
    id: '4-2',
    name: '洗衣机',
    icon: ''
  }, {
    id: '4-3',
    name: '空调',
    icon: ''
  }, {
    id: '4-4',
    name: '厨房电器',
    icon: ''
  }]
}, {
  id: '5',
  name: '食品生鲜',
  icon: 'https://picsum.photos/id/312/100/100',
  children: [{
    id: '5-1',
    name: '水果',
    icon: ''
  }, {
    id: '5-2',
    name: '肉类',
    icon: ''
  }, {
    id: '5-3',
    name: '零食',
    icon: ''
  }, {
    id: '5-4',
    name: '饮料',
    icon: ''
  }]
}, {
  id: '6',
  name: '美妆护肤',
  icon: 'https://picsum.photos/id/250/100/100',
  children: [{
    id: '6-1',
    name: '护肤',
    icon: ''
  }, {
    id: '6-2',
    name: '彩妆',
    icon: ''
  }, {
    id: '6-3',
    name: '香水',
    icon: ''
  }, {
    id: '6-4',
    name: '个护',
    icon: ''
  }]
}, {
  id: '7',
  name: '母婴用品',
  icon: 'https://picsum.photos/id/64/100/100',
  children: [{
    id: '7-1',
    name: '奶粉',
    icon: ''
  }, {
    id: '7-2',
    name: '纸尿裤',
    icon: ''
  }, {
    id: '7-3',
    name: '童装',
    icon: ''
  }, {
    id: '7-4',
    name: '玩具',
    icon: ''
  }]
}, {
  id: '8',
  name: '家居家纺',
  icon: 'https://picsum.photos/id/582/100/100',
  children: [{
    id: '8-1',
    name: '家具',
    icon: ''
  }, {
    id: '8-2',
    name: '家纺',
    icon: ''
  }, {
    id: '8-3',
    name: '厨具',
    icon: ''
  }, {
    id: '8-4',
    name: '收纳',
    icon: ''
  }]
}];

// 秒杀活动 - 动态生成未来的结束时间（当前时间 + 12小时）
var now = new Date();
var endTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
var endTimeStr = endTime.toISOString().replace('T', ' ').slice(0, 19);
var seckillActivity = {
  id: 'seckill-1',
  name: '限时秒杀',
  startTime: now.toISOString().replace('T', ' ').slice(0, 19),
  endTime: endTimeStr,
  status: 'active',
  products: [{
    id: 'sk-1',
    productId: 'product-1',
    productName: 'iPhone 15 Pro Max 256GB',
    image: 'https://picsum.photos/id/1/300/300',
    originalPrice: 9999,
    seckillPrice: 7999,
    stock: 50,
    soldCount: 23,
    limitCount: 1
  }, {
    id: 'sk-2',
    productId: 'product-2',
    productName: '华为 Mate 60 Pro',
    image: 'https://picsum.photos/id/2/300/300',
    originalPrice: 6999,
    seckillPrice: 5499,
    stock: 100,
    soldCount: 67,
    limitCount: 2
  }, {
    id: 'sk-3',
    productId: 'product-3',
    productName: 'AirPods Pro 2代',
    image: 'https://picsum.photos/id/3/300/300',
    originalPrice: 1899,
    seckillPrice: 1399,
    stock: 200,
    soldCount: 156,
    limitCount: 3
  }, {
    id: 'sk-4',
    productId: 'product-4',
    productName: '小米手环 8 Pro',
    image: 'https://picsum.photos/id/8/300/300',
    originalPrice: 399,
    seckillPrice: 299,
    stock: 500,
    soldCount: 234,
    limitCount: 5
  }]
};

// 热门搜索关键词
var hotSearchKeywords = ['iPhone 15', '华为手机', '蓝牙耳机', '笔记本电脑', '智能手表', '充电宝', '空调', '洗衣机'];

// 搜索商品
var searchProducts = function searchProducts(keyword) {
  var allProducts = [{
    id: 'product-1',
    name: 'iPhone 15 Pro Max 256GB 钛金属设计',
    price: 9999,
    images: ['https://picsum.photos/id/1/750/750']
  }, {
    id: 'product-2',
    name: '华为 Mate 60 Pro 12GB+512GB',
    price: 6999,
    images: ['https://picsum.photos/id/2/750/750']
  }, {
    id: 'product-3',
    name: 'AirPods Pro (第二代)',
    price: 1899,
    images: ['https://picsum.photos/id/3/750/750']
  }, {
    id: 'product-4',
    name: '小米手环8 Pro',
    price: 399,
    images: ['https://picsum.photos/id/8/750/750']
  }];
  return allProducts.filter(function (product) {
    return product.name.toLowerCase().includes(keyword.toLowerCase());
  });
};

// 秒杀商品列表（用于秒杀页面）
var seckillProducts = [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(seckillActivity.products.map(function (p) {
  return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, p), {}, {
    id: p.productId,
    soldPercent: Math.round(p.soldCount / p.stock * 100),
    tags: ['限时秒杀'],
    category: '数码'
  });
})), [{
  id: 'product-5',
  productId: 'product-5',
  productName: '抽纸纸巾5层加厚420张',
  image: 'https://picsum.photos/id/24/300/300',
  originalPrice: 2.9,
  seckillPrice: 1.5,
  stock: 1000,
  soldCount: 390,
  soldPercent: 39,
  tags: ['限时秒杀', '7天价保'],
  category: '生活用品'
}, {
  id: 'product-6',
  productId: 'product-6',
  productName: '一次性保鲜膜100只',
  image: 'https://picsum.photos/id/28/300/300',
  originalPrice: 3,
  seckillPrice: 2.48,
  soldCount: 440,
  soldPercent: 44,
  tags: ['限时秒杀'],
  category: '生活用品'
}, {
  id: 'product-7',
  productId: 'product-7',
  productName: '金纺薰衣草柔顺剂400g',
  image: 'https://picsum.photos/id/42/300/300',
  originalPrice: 2.5,
  seckillPrice: 2.1,
  soldCount: 400,
  soldPercent: 40,
  tags: ['限时秒杀'],
  category: '洗护'
}, {
  id: 'product-8',
  productId: 'product-8',
  productName: '壁挂抽取式保鲜膜套',
  image: 'https://picsum.photos/id/48/300/300',
  originalPrice: 5.9,
  seckillPrice: 4.48,
  soldCount: 470,
  soldPercent: 47,
  tags: ['限时秒杀'],
  category: '生活用品'
}, {
  id: 'product-9',
  productId: 'product-9',
  productName: '厨邦蒸鱼豉油420ml',
  image: 'https://picsum.photos/id/292/300/300',
  originalPrice: 8.9,
  seckillPrice: 6.9,
  soldCount: 350,
  soldPercent: 35,
  tags: ['限时秒杀'],
  category: '食品'
}, {
  id: 'product-10',
  productId: 'product-10',
  productName: '云南白药牙膏180g',
  image: 'https://picsum.photos/id/225/300/300',
  originalPrice: 29.9,
  seckillPrice: 19.9,
  soldCount: 620,
  soldPercent: 62,
  tags: ['限时秒杀'],
  category: '个护'
}, {
  id: 'product-11',
  productId: 'product-11',
  productName: '维达湿巾10片装',
  image: 'https://picsum.photos/id/312/300/300',
  originalPrice: 5.9,
  seckillPrice: 3.9,
  soldCount: 580,
  soldPercent: 58,
  tags: ['限时秒杀'],
  category: '生活用品'
}, {
  id: 'product-12',
  productId: 'product-12',
  productName: '可口可乐330ml*6罐',
  image: 'https://picsum.photos/id/431/300/300',
  originalPrice: 12.9,
  seckillPrice: 9.9,
  soldCount: 710,
  soldPercent: 71,
  tags: ['限时秒杀'],
  category: '饮料'
}]);

/***/ }),

/***/ "./src/data/order/orders.ts":
/*!**********************************!*\
  !*** ./src/data/order/orders.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyRefund: function() { return /* binding */ applyRefund; },
/* harmony export */   cancelOrder: function() { return /* binding */ cancelOrder; },
/* harmony export */   confirmDelivery: function() { return /* binding */ confirmDelivery; },
/* harmony export */   confirmPickup: function() { return /* binding */ confirmPickup; },
/* harmony export */   createOrder: function() { return /* binding */ createOrder; },
/* harmony export */   getOrderById: function() { return /* binding */ getOrderById; },
/* harmony export */   getOrdersByStatus: function() { return /* binding */ getOrdersByStatus; },
/* harmony export */   payOrder: function() { return /* binding */ payOrder; },
/* harmony export */   updateOrderStatus: function() { return /* binding */ updateOrderStatus; },
/* harmony export */   updateRefundStatus: function() { return /* binding */ updateRefundStatus; }
/* harmony export */ });
/* unused harmony export orders */
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");

// ============================================
// 订单数据
// ============================================

// 默认订单数据
var defaultOrders = [{
  id: 'order-1',
  orderNo: 'LXG2024011500001',
  status: 'pending_pickup',
  statusText: '待自提',
  createTime: '2024-01-15 10:30:00',
  totalAmount: 10198,
  freightAmount: 0,
  couponAmount: 0,
  payAmount: 10198,
  items: [{
    id: 'item-1',
    productId: 'product-1',
    productName: 'iPhone 15 Pro Max 256GB 钛金属设计',
    skuId: 'sku-1-1',
    skuName: '钛金属原色 256GB',
    price: 9999,
    quantity: 1,
    image: 'https://picsum.photos/id/1/200/200'
  }, {
    id: 'item-2',
    productId: 'product-3',
    productName: 'AirPods Pro (第二代)',
    skuId: 'sku-3-1',
    skuName: '配MagSafe充电盒',
    price: 1899,
    quantity: 1,
    image: 'https://picsum.photos/id/3/200/200'
  }],
  address: {
    name: '张三',
    phone: '13812345678',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区A1栋501室'
  },
  store: {
    name: '深圳南山科技园店',
    phone: '0755-12345678',
    address: '广东省深圳市南山区科技园南区A2栋1楼',
    businessHours: '09:00-22:00'
  },
  paymentMethod: 'wechat',
  payTime: '2024-01-15 10:35:00'
}, {
  id: 'order-2',
  orderNo: 'LXG2024011400002',
  status: 'pending_payment',
  statusText: '待支付',
  createTime: '2024-01-14 15:20:00',
  totalAmount: 6999,
  freightAmount: 0,
  couponAmount: 100,
  payAmount: 6899,
  items: [{
    id: 'item-3',
    productId: 'product-2',
    productName: '华为 Mate 60 Pro 12GB+512GB',
    skuId: 'sku-2-1',
    skuName: '雅川青 12GB+512GB',
    price: 6999,
    quantity: 1,
    image: 'https://picsum.photos/id/2/200/200'
  }],
  address: {
    name: '张三',
    phone: '13812345678',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区A1栋501室'
  },
  paymentMethod: 'alipay'
}, {
  id: 'order-3',
  orderNo: 'LXG2024011300003',
  status: 'completed',
  statusText: '已完成',
  createTime: '2024-01-13 09:00:00',
  totalAmount: 399,
  freightAmount: 0,
  couponAmount: 0,
  payAmount: 399,
  items: [{
    id: 'item-4',
    productId: 'product-4',
    productName: '小米手环8 Pro 曜石黑',
    skuId: 'sku-4-1',
    skuName: '曜石黑',
    price: 399,
    quantity: 1,
    image: 'https://picsum.photos/id/8/200/200'
  }],
  address: {
    name: '张三',
    phone: '13812345678',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区A1栋501室'
  },
  store: {
    name: '深圳南山科技园店',
    phone: '0755-12345678',
    address: '广东省深圳市南山区科技园南区A2栋1楼',
    businessHours: '09:00-22:00'
  },
  paymentMethod: 'wechat',
  payTime: '2024-01-13 09:05:00',
  deliverTime: '2024-01-14 10:00:00',
  completeTime: '2024-01-15 18:30:00'
}, {
  id: 'order-4',
  orderNo: 'LXG2024011200004',
  status: 'cancelled',
  statusText: '已取消',
  createTime: '2024-01-12 11:30:00',
  totalAmount: 1899,
  freightAmount: 0,
  couponAmount: 0,
  payAmount: 1899,
  items: [{
    id: 'item-5',
    productId: 'product-3',
    productName: 'AirPods Pro (第二代)',
    skuId: 'sku-3-1',
    skuName: '配MagSafe充电盒',
    price: 1899,
    quantity: 1,
    image: 'https://picsum.photos/id/3/200/200'
  }],
  address: {
    name: '张三',
    phone: '13812345678',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区A1栋501室'
  },
  paymentMethod: 'wechat',
  cancelTime: '2024-01-12 12:00:00',
  cancelReason: '用户主动取消'
}];
var ordersCache = null;

// 从本地存储获取订单数据，没有则使用默认数据
function getOrders() {
  if (ordersCache) {
    return ordersCache;
  }
  try {
    var stored = localStorage.getItem('orders');
    if (stored) {
      ordersCache = JSON.parse(stored);
      var needSave = ordersCache.some(function (order) {
        return order.orderNo.startsWith('JD');
      });
      if (needSave) {
        ordersCache = ordersCache.map(function (order) {
          return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, order), {}, {
            orderNo: order.orderNo.startsWith('JD') ? order.orderNo.replace('JD', 'LXG') : order.orderNo
          });
        });
        saveOrders(ordersCache);
      }
      return ordersCache;
    }
  } catch (e) {
    console.error('Failed to load orders from localStorage:', e);
  }
  ordersCache = [].concat(defaultOrders);
  saveOrders(ordersCache);
  return ordersCache;
}

// 保存订单数据到本地存储
function saveOrders(orders) {
  ordersCache = orders;
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to localStorage:', e);
  }
}

// 订单数据（从本地存储加载）
var orders = getOrders();

// 根据状态获取订单
function getOrdersByStatus(status) {
  var currentOrders = getOrders();
  if (!status || status === 'all') {
    return currentOrders;
  }
  if (status === 'refunding') {
    return currentOrders.filter(function (order) {
      return order.status === 'refunding' || order.status === 'refund_rejected' || order.status === 'refunded';
    });
  }
  if (status === 'pending_review') {
    return currentOrders.filter(function (order) {
      return order.status === 'completed' || order.status === 'pending_review';
    });
  }
  if (status === 'reviewed') {
    return currentOrders.filter(function (order) {
      return order.status === 'reviewed' || order.status === 'cancelled';
    });
  }
  return currentOrders.filter(function (order) {
    return order.status === status;
  });
}

// 根据ID获取订单
function getOrderById(id) {
  var currentOrders = getOrders();
  return currentOrders.find(function (order) {
    return order.id === id;
  });
}

// 取消订单
function cancelOrder(orderId, reason) {
  var currentOrders = getOrders();
  var orderIndex = currentOrders.findIndex(function (order) {
    return order.id === orderId;
  });
  if (orderIndex === -1) {
    return false;
  }
  currentOrders[orderIndex] = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentOrders[orderIndex]), {}, {
    status: 'cancelled',
    statusText: '已取消',
    cancelTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    cancelReason: reason || '用户主动取消'
  });
  saveOrders(currentOrders);
  return true;
}

// 支付订单
function payOrder(orderId) {
  var currentOrders = getOrders();
  var orderIndex = currentOrders.findIndex(function (order) {
    return order.id === orderId;
  });
  if (orderIndex === -1) {
    return false;
  }
  currentOrders[orderIndex] = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentOrders[orderIndex]), {}, {
    status: 'pending_delivery',
    statusText: '待发货',
    payTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });
  saveOrders(currentOrders);
  return true;
}

// 确认发货
function confirmDelivery(orderId) {
  var currentOrders = getOrders();
  var orderIndex = currentOrders.findIndex(function (order) {
    return order.id === orderId;
  });
  if (orderIndex === -1) {
    return false;
  }
  currentOrders[orderIndex] = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentOrders[orderIndex]), {}, {
    status: 'pending_pickup',
    statusText: '待自提',
    deliverTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });
  saveOrders(currentOrders);
  return true;
}

// 确认自提
function confirmPickup(orderId) {
  var currentOrders = getOrders();
  var orderIndex = currentOrders.findIndex(function (order) {
    return order.id === orderId;
  });
  if (orderIndex === -1) {
    return false;
  }
  currentOrders[orderIndex] = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentOrders[orderIndex]), {}, {
    status: 'completed',
    statusText: '已完成',
    completeTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });
  saveOrders(currentOrders);
  return true;
}

// 申请退款
function applyRefund(orderId, reason) {
  var currentOrders = getOrders();
  var orderIndex = currentOrders.findIndex(function (order) {
    return order.id === orderId;
  });
  if (orderIndex === -1) {
    return false;
  }
  currentOrders[orderIndex] = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentOrders[orderIndex]), {}, {
    status: 'refunding',
    statusText: '退款中',
    refundReason: reason,
    refundApplyTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  });
  saveOrders(currentOrders);
  return true;
}

// 更新订单状态
function updateOrderStatus(orderId, status) {
  var currentOrders = getOrders();
  var orderIndex = currentOrders.findIndex(function (order) {
    return order.id === orderId;
  });
  if (orderIndex === -1) {
    return false;
  }
  var statusTextMap = {
    'pending_payment': '待支付',
    'pending_delivery': '待发货',
    'paid': '已支付',
    'pending_pickup': '待自提',
    'completed': '已完成',
    'pending_review': '评价',
    'reviewed': '已取消',
    'cancelled': '已取消',
    'refunding': '退款中'
  };
  currentOrders[orderIndex] = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentOrders[orderIndex]), {}, {
    status: status,
    statusText: statusTextMap[status] || status
  });
  saveOrders(currentOrders);
  return true;
}

// 更新退款状态
function updateRefundStatus(orderId, status) {
  var currentOrders = getOrders();
  var orderIndex = currentOrders.findIndex(function (order) {
    return order.id === orderId;
  });
  if (orderIndex === -1) {
    return false;
  }
  var statusTextMap = {
    'refunding': '退款中',
    'refund_rejected': '商家已拒绝',
    'refunded': '已退款'
  };
  currentOrders[orderIndex] = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentOrders[orderIndex]), {}, {
    status: status,
    statusText: statusTextMap[status] || status
  });
  saveOrders(currentOrders);
  return true;
}

// 创建订单
function createOrder(orderData) {
  var currentOrders = getOrders();
  var now = new Date();
  var orderId = "order-".concat(Date.now());
  var orderNo = "LXG".concat(now.getFullYear()).concat(String(now.getMonth() + 1).padStart(2, '0')).concat(String(now.getDate()).padStart(2, '0')).concat(String(currentOrders.length + 1).padStart(5, '0'));
  var status = orderData.status || 'pending_payment';
  var statusTextMap = {
    'pending_payment': '待支付',
    'pending_delivery': '待发货',
    'paid': '已支付',
    'pending_pickup': '待自提',
    'completed': '已完成',
    'pending_review': '评价',
    'reviewed': '已取消',
    'cancelled': '已取消',
    'refunding': '退款中'
  };
  var newOrder = {
    id: orderId,
    orderNo: orderNo,
    status: status,
    statusText: statusTextMap[status] || status,
    createTime: now.toISOString().replace('T', ' ').substring(0, 19),
    totalAmount: orderData.totalAmount,
    freightAmount: orderData.freightAmount,
    couponAmount: orderData.couponAmount,
    payAmount: orderData.payAmount,
    items: orderData.items,
    address: {
      name: '张三',
      phone: '13812345678',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南区A1栋501室'
    },
    store: orderData.store,
    paymentMethod: orderData.paymentMethod
  };
  currentOrders.unshift(newOrder);
  saveOrders(currentOrders);
  return newOrder;
}

/***/ }),

/***/ "./src/data/product/brands.ts":
/*!************************************!*\
  !*** ./src/data/product/brands.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   brands: function() { return /* binding */ brands; },
/* harmony export */   getBrandById: function() { return /* binding */ getBrandById; },
/* harmony export */   getHotBrands: function() { return /* binding */ getHotBrands; }
/* harmony export */ });
/* unused harmony exports getBrandsByCategory, searchBrands */
var brands = [{
  id: 'brand-apple',
  name: 'Apple',
  logo: 'https://picsum.photos/id/10/200/200',
  description: '苹果公司',
  categoryIds: ['1'],
  productsCount: 3,
  isHot: true
}, {
  id: 'brand-huawei',
  name: '华为',
  logo: 'https://picsum.photos/id/11/200/200',
  description: '华为技术有限公司',
  categoryIds: ['1', '2'],
  productsCount: 2,
  isHot: true
}, {
  id: 'brand-samsung',
  name: 'Samsung',
  logo: 'https://picsum.photos/id/12/200/200',
  description: '三星电子',
  categoryIds: ['1', '2'],
  productsCount: 2,
  isHot: true
}, {
  id: 'brand-nike',
  name: 'Nike',
  logo: 'https://picsum.photos/id/13/200/200',
  description: '耐克',
  categoryIds: ['3'],
  productsCount: 2
}, {
  id: 'brand-adidas',
  name: 'Adidas',
  logo: 'https://picsum.photos/id/14/200/200',
  description: '阿迪达斯',
  categoryIds: ['3'],
  productsCount: 1
}, {
  id: 'brand-sk2',
  name: 'SK-II',
  logo: 'https://picsum.photos/id/15/200/200',
  description: 'SK-II',
  categoryIds: ['4'],
  productsCount: 2,
  isHot: true
}, {
  id: 'brand-olay',
  name: 'Olay',
  logo: 'https://picsum.photos/id/16/200/200',
  description: '玉兰油',
  categoryIds: ['4'],
  productsCount: 1
}, {
  id: 'brand-midea',
  name: '美的',
  logo: 'https://picsum.photos/id/17/200/200',
  description: '美的集团',
  categoryIds: ['2'],
  productsCount: 2
}, {
  id: 'brand-haier',
  name: '海尔',
  logo: 'https://picsum.photos/id/18/200/200',
  description: '海尔集团',
  categoryIds: ['2'],
  productsCount: 1
}, {
  id: 'brand-anchor',
  name: '安佳',
  logo: 'https://picsum.photos/id/19/200/200',
  description: '安佳',
  categoryIds: ['5'],
  productsCount: 2
}, {
  id: 'brand-abbott',
  name: '雅培',
  logo: 'https://picsum.photos/id/20/200/200',
  description: '雅培',
  categoryIds: ['6'],
  productsCount: 2,
  isHot: true
}, {
  id: 'brand-pampers',
  name: '帮宝适',
  logo: 'https://picsum.photos/id/21/200/200',
  description: '帮宝适',
  categoryIds: ['6'],
  productsCount: 2
}, {
  id: 'brand-huawei-home',
  name: '华为智选',
  logo: 'https://picsum.photos/id/22/200/200',
  description: '华为智选',
  categoryIds: ['7'],
  productsCount: 2
}, {
  id: 'brand-lovo',
  name: 'LOVO乐蜗',
  logo: 'https://picsum.photos/id/23/200/200',
  description: 'LOVO乐蜗',
  categoryIds: ['7'],
  productsCount: 2
}, {
  id: 'brand-dyson',
  name: '戴森',
  logo: 'https://picsum.photos/id/24/200/200',
  description: '戴森',
  categoryIds: ['2', '7'],
  productsCount: 2,
  isHot: true
}, {
  id: 'brand-lego',
  name: '乐高',
  logo: 'https://picsum.photos/id/25/200/200',
  description: '乐高',
  categoryIds: ['6'],
  productsCount: 1
}];
function getHotBrands() {
  var result = [];
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].isHot) {
      result.push(brands[i]);
    }
  }
  return result;
}
function getBrandsByCategory(categoryId) {
  var result = [];
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].categoryIds.indexOf(categoryId) > -1) {
      result.push(brands[i]);
    }
  }
  return result;
}
function getBrandById(id) {
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].id === id) {
      return brands[i];
    }
  }
  return undefined;
}
function searchBrands(keyword) {
  var lowerKeyword = keyword.toLowerCase();
  var result = [];
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].name.toLowerCase().indexOf(lowerKeyword) > -1 || brands[i].description.toLowerCase().indexOf(lowerKeyword) > -1) {
      result.push(brands[i]);
    }
  }
  return result;
}

/***/ }),

/***/ "./src/data/product/evaluations.ts":
/*!*****************************************!*\
  !*** ./src/data/product/evaluations.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAiSummary: function() { return /* binding */ getAiSummary; },
/* harmony export */   getEvaluationStats: function() { return /* binding */ getEvaluationStats; },
/* harmony export */   getEvaluationsByProduct: function() { return /* binding */ getEvaluationsByProduct; }
/* harmony export */ });
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");

var generateDefaultEvaluations = function generateDefaultEvaluations(productId) {
  var avatars = ['https://picsum.photos/id/237/100/100', 'https://picsum.photos/id/1/100/100', 'https://picsum.photos/id/2/100/100', 'https://picsum.photos/id/3/100/100'];
  var contents = ['商品收到了，非常满意！质量很好，物流也快，推荐购买！', '买过好几次了，品质一直很稳定，值得信赖。', '性价比很高，比实体店便宜很多，质量一样好。', '包装精美，送人很有面子。', '使用体验很好，超出预期！', '客服态度很好，有问必答。', '发货速度快，第二天就到了。', '质量很好，和描述的一样。'];
  return [{
    id: "eval-".concat(productId, "-1"),
    productId: productId,
    userId: 'user-default-1',
    userName: '张***',
    userAvatar: avatars[0],
    rating: 5,
    content: contents[Math.floor(Math.random() * contents.length)],
    images: [],
    isAnonymity: false,
    createTime: '2024-01-15 10:30:00',
    status: 'show',
    likeCount: Math.floor(Math.random() * 100) + 10,
    isLike: false,
    specs: '默认规格',
    comments: [{
      id: "comment-".concat(productId, "-1-1"),
      evaluationId: "eval-".concat(productId, "-1"),
      userId: 'user-default-4',
      userName: '8***5',
      userAvatar: 'https://picsum.photos/id/4/100/100',
      content: '轮子是自己配的吗?',
      createTime: '2024-01-15 11:20:00',
      likeCount: 3,
      isLike: false
    }]
  }, {
    id: "eval-".concat(productId, "-2"),
    productId: productId,
    userId: 'user-default-2',
    userName: '李***',
    userAvatar: avatars[1],
    rating: 5,
    content: contents[Math.floor(Math.random() * contents.length)],
    images: [],
    isAnonymity: false,
    createTime: '2024-01-14 15:20:00',
    status: 'show',
    likeCount: Math.floor(Math.random() * 80) + 5,
    isLike: false,
    specs: '默认规格',
    comments: []
  }, {
    id: "eval-".concat(productId, "-3"),
    productId: productId,
    userId: 'user-default-3',
    userName: '王***',
    userAvatar: avatars[2],
    rating: 4,
    content: '整体不错，就是物流稍慢了一点。',
    images: [],
    isAnonymity: false,
    createTime: '2024-01-13 09:15:00',
    status: 'show',
    likeCount: Math.floor(Math.random() * 50) + 3,
    isLike: false,
    specs: '默认规格',
    comments: []
  }];
};
var getEvaluationsByProduct = function getEvaluationsByProduct(productId) {
  var evaluations = {
    'product-1': [{
      id: 'eval-001',
      productId: 'product-1',
      userId: 'user-001',
      userName: '张***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '手机收到了，非常满意！屏幕显示清晰，运行流畅，拍照效果也很棒。物流很快，第二天就到了，好评！',
      images: ['https://picsum.photos/id/1/400/400', 'https://picsum.photos/id/2/400/400'],
      isAnonymity: false,
      createTime: '2024-01-15 10:30:00',
      status: 'show',
      likeCount: 128,
      isLike: false,
      specs: '颜色: 钛金属原色; 版本: 256GB',
      comments: [{
        id: 'comment-001-1',
        evaluationId: 'eval-001',
        userId: 'user-005',
        userName: '8***5',
        userAvatar: 'https://picsum.photos/id/4/100/100',
        content: '轮子是自己配的吗?',
        createTime: '2024-01-15 11:20:00',
        likeCount: 3,
        isLike: false
      }]
    }, {
      id: 'eval-002',
      productId: 'product-1',
      userId: 'user-002',
      userName: '李***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '性价比很高，推荐购买！',
      images: [],
      isAnonymity: false,
      createTime: '2024-01-14 15:20:00',
      status: 'show',
      likeCount: 56,
      isLike: false,
      specs: '颜色: 钛金属蓝; 版本: 512GB',
      comments: []
    }, {
      id: 'eval-003',
      productId: 'product-1',
      userId: 'user-003',
      userName: '王***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '入手这款手机之后，真的彻底被圈粉了！首先夸夸它的屏幕，显示效果非常细腻，色彩鲜艳。性能也很强劲，玩游戏非常流畅。拍照效果也很棒，特别是夜景模式，拍出来的照片很清晰。强烈推荐！',
      images: ['https://picsum.photos/id/3/400/400', 'https://picsum.photos/id/4/400/400', 'https://picsum.photos/id/6/400/400'],
      isAnonymity: false,
      createTime: '2024-01-13 09:15:00',
      status: 'show',
      likeCount: 234,
      isLike: false,
      specs: '颜色: 钛金属原色; 版本: 512GB',
      comments: []
    }, {
      id: 'eval-004',
      productId: 'product-1',
      userId: 'user-004',
      userName: '赵***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 4,
      content: '手机整体不错，就是价格有点贵。',
      images: [],
      isAnonymity: false,
      createTime: '2024-01-12 14:45:00',
      status: 'show',
      likeCount: 12,
      isLike: false,
      specs: '颜色: 钛金属蓝; 版本: 256GB',
      comments: []
    }],
    'product-2': [{
      id: 'eval-005',
      productId: 'product-2',
      userId: 'user-005',
      userName: '陈***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '支持国产！华为手机越来越好了，系统流畅，拍照效果很棒。',
      images: ['https://picsum.photos/id/6/400/400'],
      isAnonymity: false,
      createTime: '2024-01-11 11:30:00',
      status: 'show',
      likeCount: 89,
      isLike: false,
      specs: '颜色: 雅川青; 内存: 12GB+512GB',
      comments: []
    }],
    'product-6': [{
      id: 'eval-006',
      productId: 'product-6',
      userId: 'user-006',
      userName: '刘***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '神仙水名不虚传，用了一个月皮肤明显变好了，细腻有光泽。',
      images: ['https://picsum.photos/id/220/400/400'],
      isAnonymity: false,
      createTime: '2024-01-10 16:20:00',
      status: 'show',
      likeCount: 156,
      isLike: false,
      specs: '容量: 230ml',
      comments: []
    }, {
      id: 'eval-007',
      productId: 'product-6',
      userId: 'user-007',
      userName: '孙***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '一直在用这款神仙水，效果真的很好，皮肤越来越稳定了。',
      images: ['https://picsum.photos/id/221/400/400', 'https://picsum.photos/id/222/400/400'],
      isAnonymity: false,
      createTime: '2024-01-09 14:30:00',
      status: 'show',
      likeCount: 89,
      isLike: false,
      specs: '容量: 230ml',
      comments: []
    }, {
      id: 'eval-008',
      productId: 'product-6',
      userId: 'user-008',
      userName: '周***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '价格虽然贵了点，但是一分钱一分货，用了之后皮肤状态改善很多。',
      images: [],
      isAnonymity: false,
      createTime: '2024-01-08 11:15:00',
      status: 'show',
      likeCount: 67,
      isLike: false,
      specs: '容量: 230ml',
      comments: []
    }, {
      id: 'eval-009',
      productId: 'product-6',
      userId: 'user-009',
      userName: '吴***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 4,
      content: '效果还可以，就是瓶口设计不太好，容易倒多了。',
      images: [],
      isAnonymity: false,
      createTime: '2024-01-07 16:45:00',
      status: 'show',
      likeCount: 34,
      isLike: false,
      specs: '容量: 230ml',
      comments: []
    }, {
      id: 'eval-010',
      productId: 'product-6',
      userId: 'user-010',
      userName: '郑***',
      userAvatar: 'https://picsum.photos/id/237/100/100',
      rating: 5,
      content: '回购无数瓶了，真的离不开它！',
      images: ['https://picsum.photos/id/223/400/400'],
      isAnonymity: false,
      createTime: '2024-01-06 09:20:00',
      status: 'show',
      likeCount: 123,
      isLike: false,
      specs: '容量: 230ml',
      comments: []
    }]
  };
  return evaluations[productId] || generateDefaultEvaluations(productId);
};

// 获取评价统计
var getEvaluationStats = function getEvaluationStats(productId) {
  var evaluations = getEvaluationsByProduct(productId);
  if (evaluations.length === 0) {
    return {
      total: 0,
      averageRating: 5.0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    };
  }
  var total = evaluations.length;
  var sum = evaluations.reduce(function (acc, e) {
    return acc + e.rating;
  }, 0);
  var averageRating = Number((sum / total).toFixed(1));
  var distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };
  evaluations.forEach(function (e) {
    distribution[e.rating]++;
  });
  return {
    total: total,
    averageRating: averageRating,
    distribution: distribution
  };
};

// AI评价总结
var getAiSummary = function getAiSummary(productId) {
  var evaluations = getEvaluationsByProduct(productId);
  var total = evaluations.length;
  var sum = evaluations.reduce(function (acc, e) {
    return acc + e.rating;
  }, 0);
  var averageRating = Number((sum / total).toFixed(1));
  var positiveWords = ['好', '棒', '满意', '流畅', '清晰', '推荐', '喜欢', '性价比', '稳定', '快', '细腻', '光泽', '好用', '信赖', '精美', '超出预期'];
  var negativeWords = ['贵', '差', '一般', '不太好', '问题', '慢', '容易', '倒多', '稍慢'];
  var allContent = evaluations.map(function (e) {
    return e.content;
  }).join(' ');
  var positiveCount = positiveWords.reduce(function (acc, word) {
    var _allContent$match;
    var regex = new RegExp(word, 'gi');
    return acc + (((_allContent$match = allContent.match(regex)) === null || _allContent$match === void 0 ? void 0 : _allContent$match.length) || 0);
  }, 0);
  var negativeCount = negativeWords.reduce(function (acc, word) {
    var _allContent$match2;
    var regex = new RegExp(word, 'gi');
    return acc + (((_allContent$match2 = allContent.match(regex)) === null || _allContent$match2 === void 0 ? void 0 : _allContent$match2.length) || 0);
  }, 0);
  var productSummaries = {
    'product-1': {
      overall: '整体评价优秀，用户满意度高。手机性能强劲，拍照效果出色，屏幕显示细腻。',
      strengths: ['屏幕显示清晰细腻', '运行流畅', '拍照效果出色', '物流速度快', '性价比高'],
      weaknesses: ['价格偏贵'],
      tags: ['性能强', '拍照好', '屏幕棒']
    },
    'product-2': {
      overall: '用户评价良好，支持国产，系统流畅，拍照效果受到好评。',
      strengths: ['系统流畅', '拍照效果棒', '支持国产'],
      weaknesses: [],
      tags: ['国货之光', '系统稳']
    },
    'product-6': {
      overall: '用户评价非常好，产品效果明显，回购率高。虽然价格稍贵，但一分钱一分货。',
      strengths: ['效果明显', '皮肤细腻有光泽', '皮肤稳定', '回购率高'],
      weaknesses: ['价格偏贵', '瓶口设计不太好'],
      tags: ['效果好', '回购多']
    }
  };
  var defaultSummary = {
    overall: "\u7EFC\u5408".concat(total, "\u6761\u8BC4\u4EF7\uFF0C\u7528\u6237\u6574\u4F53\u8BC4\u4EF7").concat(averageRating >= 4.5 ? '非常好' : averageRating >= 4 ? '良好' : averageRating >= 3 ? '一般' : '较差', "\uFF0C\u5E73\u5747\u8BC4\u5206").concat(averageRating, "\u5206\u3002"),
    strengths: positiveCount > 0 ? ['用户反馈正面评价较多', '质量可靠', '物流速度快'] : [],
    weaknesses: negativeCount > 0 ? ['存在一些负面反馈'] : [],
    tags: ['质量好', '口碑佳']
  };
  return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    averageRating: averageRating,
    totalCount: total
  }, productSummaries[productId] || defaultSummary);
};

/***/ }),

/***/ "./src/data/product/products.ts":
/*!**************************************!*\
  !*** ./src/data/product/products.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProductById: function() { return /* binding */ getProductById; },
/* harmony export */   getProductsByRecommendType: function() { return /* binding */ getProductsByRecommendType; },
/* harmony export */   getRecommendedProducts: function() { return /* binding */ getRecommendedProducts; },
/* harmony export */   products: function() { return /* binding */ products; },
/* harmony export */   searchProducts: function() { return /* binding */ searchProducts; }
/* harmony export */ });
/* unused harmony export getProductsByCategory */
// ============================================
// 商品数据
// ============================================

var products = [{
  id: 'product-1',
  name: 'iPhone 15 Pro Max 256GB 钛金属设计',
  price: 9999,
  originalPrice: 9999,
  images: ['https://picsum.photos/id/1/750/750', 'https://picsum.photos/id/2/750/750', 'https://picsum.photos/id/3/750/750', 'https://picsum.photos/id/4/750/750'],
  description: 'iPhone 15 Pro Max 采用钛金属设计，配备A17 Pro芯片，性能大幅提升。6.7英寸超视网膜XDR显示屏，支持ProMotion自适应刷新率。4800万像素主摄，支持5倍光学变焦。全新操作按钮，支持自定义功能。',
  categoryId: '1',
  categoryName: '手机数码',
  subCategoryId: '1-1',
  subCategoryName: '手机',
  brandId: 'brand-apple',
  brandName: 'Apple',
  sales: 15680,
  stock: 289,
  skus: [{
    id: 'sku-1-1',
    name: '钛金属原色 256GB',
    price: 9999,
    stock: 100,
    image: 'https://picsum.photos/id/1/300/300',
    specs: {
      '颜色': '钛金属原色',
      '容量': '256GB'
    }
  }, {
    id: 'sku-1-2',
    name: '钛金属原色 512GB',
    price: 11999,
    stock: 80,
    image: 'https://picsum.photos/id/1/300/300',
    specs: {
      '颜色': '钛金属原色',
      '容量': '512GB'
    }
  }, {
    id: 'sku-1-3',
    name: '钛金属蓝 256GB',
    price: 9999,
    stock: 60,
    image: 'https://picsum.photos/id/2/300/300',
    specs: {
      '颜色': '钛金属蓝',
      '容量': '256GB'
    }
  }, {
    id: 'sku-1-4',
    name: '钛金属蓝 512GB',
    price: 11999,
    stock: 49,
    image: 'https://picsum.photos/id/2/300/300',
    specs: {
      '颜色': '钛金属蓝',
      '容量': '512GB'
    }
  }],
  evaluateCount: 23456,
  evaluateScore: 4.9,
  tags: ['正品保证', '急速发货']
}, {
  id: 'product-2',
  name: '华为 Mate 60 Pro 12GB+512GB 雅川青',
  price: 6999,
  originalPrice: 6999,
  images: ['https://picsum.photos/id/2/750/750', 'https://picsum.photos/id/6/750/750', 'https://picsum.photos/id/8/750/750', 'https://picsum.photos/id/9/750/750'],
  description: '华为Mate 60 Pro采用Mate系列经典设计语言，搭载麒麟9000S芯片，支持卫星通话。第二代昆仑玻璃，10倍耐摔抗跌。XMAGE全焦段超清影像，超光变主摄。5000mAh大电池，支持88W超级快充。',
  categoryId: '1',
  categoryName: '手机数码',
  subCategoryId: '1-1',
  subCategoryName: '手机',
  brandId: 'brand-huawei',
  brandName: '华为',
  sales: 12890,
  stock: 456,
  skus: [{
    id: 'sku-2-1',
    name: '雅川青 12GB+512GB',
    price: 6999,
    stock: 150,
    image: 'https://picsum.photos/id/2/300/300',
    specs: {
      '颜色': '雅川青',
      '内存': '12GB+512GB'
    }
  }, {
    id: 'sku-2-2',
    name: '白沙银 12GB+512GB',
    price: 6999,
    stock: 120,
    image: 'https://picsum.photos/id/6/300/300',
    specs: {
      '颜色': '白沙银',
      '内存': '12GB+512GB'
    }
  }, {
    id: 'sku-2-3',
    name: '南糯紫 12GB+512GB',
    price: 6999,
    stock: 100,
    image: 'https://picsum.photos/id/8/300/300',
    specs: {
      '颜色': '南糯紫',
      '内存': '12GB+512GB'
    }
  }, {
    id: 'sku-2-4',
    name: '雅丹黑 12GB+512GB',
    price: 6999,
    stock: 86,
    image: 'https://picsum.photos/id/9/300/300',
    specs: {
      '颜色': '雅丹黑',
      '内存': '12GB+512GB'
    }
  }],
  evaluateCount: 18923,
  evaluateScore: 4.8,
  tags: ['国产旗舰', '卫星通话']
}, {
  id: 'product-3',
  name: 'AirPods Pro (第二代) 配MagSafe充电盒',
  price: 1899,
  originalPrice: 1999,
  images: ['https://picsum.photos/id/3/750/750', 'https://picsum.photos/id/160/750/750', 'https://picsum.photos/id/201/750/750', 'https://picsum.photos/id/119/750/750'],
  description: 'AirPods Pro全新升级，搭载Apple H2芯片，带来更沉浸的空间音频体验。自适应降噪功能大幅提升，通透模式更自然。MagSafe充电盒支持精确查找功能，续航可达30小时。',
  categoryId: '1',
  categoryName: '手机数码',
  subCategoryId: '1-3',
  subCategoryName: '耳机',
  brandId: 'brand-apple',
  brandName: 'Apple',
  sales: 34567,
  stock: 892,
  skus: [{
    id: 'sku-3-1',
    name: '配MagSafe充电盒',
    price: 1899,
    stock: 892,
    image: 'https://picsum.photos/id/3/300/300',
    specs: {
      '充电盒': 'MagSafe'
    }
  }],
  evaluateCount: 45678,
  evaluateScore: 4.9,
  tags: ['主动降噪', '空间音频']
}, {
  id: 'product-4',
  name: '小米手环8 Pro 曜石黑',
  price: 399,
  originalPrice: 399,
  images: ['https://picsum.photos/id/8/750/750', 'https://picsum.photos/id/119/750/750', 'https://picsum.photos/id/160/750/750', 'https://picsum.photos/id/201/750/750'],
  description: '小米手环8 Pro配备1.74英寸AMOLED大屏，显示面积提升73%。支持150+运动模式，配备独立GPS。全新健康引擎，全天候心率、血氧、睡眠监测。续航长达14天，磁吸充电。',
  categoryId: '1',
  categoryName: '手机数码',
  subCategoryId: '1-3',
  subCategoryName: '耳机',
  brandId: 'brand-xiaomi',
  brandName: '小米',
  sales: 8901,
  stock: 1234,
  skus: [{
    id: 'sku-4-1',
    name: '曜石黑',
    price: 399,
    stock: 800,
    image: 'https://picsum.photos/id/8/300/300',
    specs: {
      '颜色': '曜石黑'
    }
  }, {
    id: 'sku-4-2',
    name: '银河灰',
    price: 399,
    stock: 434,
    image: 'https://picsum.photos/id/119/300/300',
    specs: {
      '颜色': '银河灰'
    }
  }],
  evaluateCount: 12345,
  evaluateScore: 4.7,
  tags: ['大屏手环', '长续航']
}, {
  id: 'product-5',
  name: '戴森吹风机 HD15 紫红色',
  price: 2999,
  originalPrice: 3299,
  images: ['https://picsum.photos/id/119/750/750', 'https://picsum.photos/id/220/750/750', 'https://picsum.photos/id/225/750/750', 'https://picsum.photos/id/230/750/750'],
  description: '戴森Supersonic吹风机 HD15，第九代数码马达，转速可达110000转/分。智能温控技术，每秒40余次监测风温，保护头发自然光泽。多种风嘴配件，满足不同造型需求。',
  categoryId: '6',
  categoryName: '美妆护肤',
  subCategoryId: '6-4',
  subCategoryName: '个护',
  brandId: 'brand-dyson',
  brandName: '戴森',
  sales: 4567,
  stock: 234,
  skus: [{
    id: 'sku-5-1',
    name: '紫红色',
    price: 2999,
    stock: 234,
    image: 'https://picsum.photos/id/119/300/300',
    specs: {
      '颜色': '紫红色'
    }
  }],
  evaluateCount: 7890,
  evaluateScore: 4.9,
  tags: ['顶级品质', '快速干发']
}, {
  id: 'product-6',
  name: 'SK-II神仙水精华液 230ml',
  price: 1540,
  originalPrice: 1790,
  images: ['https://picsum.photos/id/220/750/750', 'https://picsum.photos/id/225/750/750', 'https://picsum.photos/id/230/750/750', 'https://picsum.photos/id/250/750/750'],
  description: 'SK-II护肤精华露，蕴含超过90%PITERA™成分。改善肌肤自然生理机能，令肌肤晶莹剔透。适合各种肤质，每天早晚使用，打造透亮肌肤。',
  categoryId: '6',
  categoryName: '美妆护肤',
  brandId: 'brand-skii',
  brandName: 'SK-II',
  sales: 7890,
  stock: 567,
  skus: [{
    id: 'sku-6-1',
    name: '230ml',
    price: 1540,
    stock: 567,
    image: 'https://picsum.photos/id/220/300/300',
    specs: {
      '容量': '230ml'
    }
  }],
  evaluateCount: 12345,
  evaluateScore: 4.8,
  tags: ['明星单品', '护肤精华']
}, {
  id: 'product-7',
  name: '飞利浦电动牙刷 HX9911/57',
  price: 1299,
  originalPrice: 1599,
  images: ['https://picsum.photos/id/225/750/750', 'https://picsum.photos/id/230/750/750', 'https://picsum.photos/id/250/750/750', 'https://picsum.photos/id/580/750/750'],
  description: '飞利浦Sonicare 9900系列电动牙刷，Glow Pro高级系列。SenseIQ智能感应技术，实时感知刷牙力度。APP个性化指导，帮助改善口腔健康。续航长达14天。',
  categoryId: '6',
  categoryName: '美妆护肤',
  brandId: 'brand-philips',
  brandName: '飞利浦',
  sales: 3456,
  stock: 345,
  skus: [{
    id: 'sku-7-1',
    name: '静谧银',
    price: 1299,
    stock: 345,
    image: 'https://picsum.photos/id/225/300/300',
    specs: {
      '颜色': '静谧银'
    }
  }],
  evaluateCount: 5678,
  evaluateScore: 4.7,
  tags: ['智能感应', 'APP控制']
}, {
  id: 'product-8',
  name: 'MacBook Pro 14英寸 M3 Pro芯片',
  price: 16999,
  originalPrice: 16999,
  images: ['https://picsum.photos/id/3/750/750', 'https://picsum.photos/id/6/750/750', 'https://picsum.photos/id/8/750/750', 'https://picsum.photos/id/9/750/750'],
  description: 'MacBook Pro 14英寸搭载M3 Pro芯片，18GB统一内存。Liquid视网膜XDR显示屏，1000尼特持续亮度。续航长达17小时，配备MagSafe 3充电端口。三个雷雳4端口，满足各种连接需求。',
  categoryId: '2',
  categoryName: '电脑办公',
  brandId: 'brand-apple',
  brandName: 'Apple',
  sales: 5678,
  stock: 123,
  skus: [{
    id: 'sku-8-1',
    name: '深空黑 18GB+512GB',
    price: 16999,
    stock: 80,
    image: 'https://picsum.photos/id/3/300/300',
    specs: {
      '颜色': '深空黑',
      '内存': '18GB+512GB'
    }
  }, {
    id: 'sku-8-2',
    name: '银色 18GB+512GB',
    price: 16999,
    stock: 43,
    image: 'https://picsum.photos/id/6/300/300',
    specs: {
      '颜色': '银色',
      '内存': '18GB+512GB'
    }
  }],
  evaluateCount: 8901,
  evaluateScore: 4.9,
  tags: ['M3 Pro', 'Liquid XDR']
}, {
  id: 'product-9',
  name: '戴森V15 Detect无绳吸尘器',
  price: 5499,
  originalPrice: 5999,
  images: ['https://picsum.photos/id/230/750/750', 'https://picsum.photos/id/580/750/750', 'https://picsum.photos/id/582/750/750', 'https://picsum.photos/id/598/750/750'],
  description: '戴森V15 Detect Complete智能无绳吸尘器。激光探测技术，让微尘无所遁形。LCD实时显示屏，智能显示灰尘数据。60分钟超长续航，全新防缠绕螺旋形吸头。',
  categoryId: '4',
  categoryName: '家用电器',
  brandId: 'brand-dyson',
  brandName: '戴森',
  sales: 2345,
  stock: 189,
  skus: [{
    id: 'sku-9-1',
    name: '镍蓝色',
    price: 5499,
    stock: 189,
    image: 'https://picsum.photos/id/230/300/300',
    specs: {
      '颜色': '镍蓝色'
    }
  }],
  evaluateCount: 3456,
  evaluateScore: 4.8,
  tags: ['激光探测', '智能显示']
}, {
  id: 'product-10',
  name: '海尔冰箱 变频风冷无霜对开门',
  price: 3999,
  originalPrice: 4599,
  images: ['https://picsum.photos/id/582/750/750', 'https://picsum.photos/id/598/750/750', 'https://picsum.photos/id/787/750/750', 'https://picsum.photos/id/1082/750/750'],
  description: '海尔BCD-535WGHSSEDS9对开门冰箱，535升大容量。变频压缩机，节能静音。风冷无霜技术，食材更新鲜。干湿分储设计，果蔬干货分区存放。',
  categoryId: '4',
  categoryName: '家用电器',
  brandId: 'brand-haier',
  brandName: '海尔',
  sales: 4567,
  stock: 234,
  skus: [{
    id: 'sku-10-1',
    name: '星蕴银',
    price: 3999,
    stock: 234,
    image: 'https://picsum.photos/id/582/300/300',
    specs: {
      '颜色': '星蕴银'
    }
  }],
  evaluateCount: 6789,
  evaluateScore: 4.7,
  tags: ['大容量', '变频节能']
}, {
  id: 'product-11',
  name: 'Nike Air Force 1 男子休闲板鞋',
  price: 799,
  originalPrice: 899,
  images: ['https://picsum.photos/id/100/750/750', 'https://picsum.photos/id/101/750/750', 'https://picsum.photos/id/102/750/750', 'https://picsum.photos/id/103/750/750'],
  description: 'Nike Air Force 1经典款休闲板鞋，采用优质皮革打造。内置Air气垫，提供出色缓震效果。简约百搭设计，适合日常穿搭。',
  categoryId: '3',
  categoryName: '服饰鞋包',
  brandId: 'brand-nike',
  brandName: 'Nike',
  sales: 12345,
  stock: 567,
  skus: [{
    id: 'sku-11-1',
    name: '白色 42码',
    price: 799,
    stock: 150,
    image: 'https://picsum.photos/id/100/300/300',
    specs: {
      '颜色': '白色',
      '尺码': '42'
    }
  }, {
    id: 'sku-11-2',
    name: '黑色 43码',
    price: 799,
    stock: 180,
    image: 'https://picsum.photos/id/101/300/300',
    specs: {
      '颜色': '黑色',
      '尺码': '43'
    }
  }, {
    id: 'sku-11-3',
    name: '白色 44码',
    price: 799,
    stock: 120,
    image: 'https://picsum.photos/id/100/300/300',
    specs: {
      '颜色': '白色',
      '尺码': '44'
    }
  }, {
    id: 'sku-11-4',
    name: '黑色 42码',
    price: 799,
    stock: 117,
    image: 'https://picsum.photos/id/101/300/300',
    specs: {
      '颜色': '黑色',
      '尺码': '42'
    }
  }],
  evaluateCount: 8901,
  evaluateScore: 4.7,
  tags: ['经典款', '百搭']
}, {
  id: 'product-12',
  name: 'adidas 女子运动休闲外套',
  price: 499,
  originalPrice: 599,
  images: ['https://picsum.photos/id/104/750/750', 'https://picsum.photos/id/105/750/750', 'https://picsum.photos/id/106/750/750', 'https://picsum.photos/id/107/750/750'],
  description: 'adidas女子运动休闲外套，轻盈透气面料。修身剪裁设计，展现女性曲线。经典三条纹设计，时尚百搭。适合运动休闲穿着。',
  categoryId: '3',
  categoryName: '服饰鞋包',
  brandId: 'brand-adidas',
  brandName: 'adidas',
  sales: 6789,
  stock: 345,
  skus: [{
    id: 'sku-12-1',
    name: '黑色 S码',
    price: 499,
    stock: 120,
    image: 'https://picsum.photos/id/104/300/300',
    specs: {
      '颜色': '黑色',
      '尺码': 'S'
    }
  }, {
    id: 'sku-12-2',
    name: '白色 M码',
    price: 499,
    stock: 110,
    image: 'https://picsum.photos/id/105/300/300',
    specs: {
      '颜色': '白色',
      '尺码': 'M'
    }
  }, {
    id: 'sku-12-3',
    name: '粉色 L码',
    price: 499,
    stock: 115,
    image: 'https://picsum.photos/id/106/300/300',
    specs: {
      '颜色': '粉色',
      '尺码': 'L'
    }
  }],
  evaluateCount: 4567,
  evaluateScore: 4.6,
  tags: ['运动休闲', '修身']
}, {
  id: 'product-13',
  name: '新秀丽 双肩背包 商务电脑包',
  price: 599,
  originalPrice: 799,
  images: ['https://picsum.photos/id/108/750/750', 'https://picsum.photos/id/109/750/750', 'https://picsum.photos/id/110/750/750', 'https://picsum.photos/id/111/750/750'],
  description: 'Samsonite新秀丽商务双肩背包，15.6英寸电脑隔层。多口袋设计，收纳方便。舒适透气背带，减轻肩部压力。适合商务出差使用。',
  categoryId: '3',
  categoryName: '服饰鞋包',
  brandId: 'brand-samsonite',
  brandName: '新秀丽',
  sales: 3456,
  stock: 234,
  skus: [{
    id: 'sku-13-1',
    name: '黑色',
    price: 599,
    stock: 234,
    image: 'https://picsum.photos/id/108/300/300',
    specs: {
      '颜色': '黑色'
    }
  }],
  evaluateCount: 2345,
  evaluateScore: 4.8,
  tags: ['商务', '大容量']
}, {
  id: 'product-14',
  name: '进口智利车厘子 2斤装',
  price: 128,
  originalPrice: 168,
  images: ['https://picsum.photos/id/292/750/750', 'https://picsum.photos/id/302/750/750', 'https://picsum.photos/id/312/750/750', 'https://picsum.photos/id/324/750/750'],
  description: '精选智利进口车厘子，JJ级大果，果径28mm以上。果肉饱满，口感脆甜。冷链运输，新鲜直达。送礼自用皆宜。',
  categoryId: '5',
  categoryName: '食品生鲜',
  brandId: 'brand-fresh',
  brandName: '生鲜优选',
  sales: 8901,
  stock: 456,
  skus: [{
    id: 'sku-14-1',
    name: '2斤装',
    price: 128,
    stock: 456,
    image: 'https://picsum.photos/id/292/300/300',
    specs: {
      '规格': '2斤装'
    }
  }],
  evaluateCount: 5678,
  evaluateScore: 4.9,
  tags: ['进口', '新鲜直达']
}, {
  id: 'product-15',
  name: '澳洲谷饲原切牛排套餐 1kg',
  price: 199,
  originalPrice: 269,
  images: ['https://picsum.photos/id/429/750/750', 'https://picsum.photos/id/431/750/750', 'https://picsum.photos/id/458/750/750', 'https://picsum.photos/id/488/750/750'],
  description: '澳洲进口谷饲牛肉，原切西冷牛排，纹理清晰。肉质鲜嫩多汁，煎烤皆宜。1kg家庭装，包含4-5片牛排。',
  categoryId: '5',
  categoryName: '食品生鲜',
  brandId: 'brand-meat',
  brandName: '肉管家',
  sales: 5678,
  stock: 234,
  skus: [{
    id: 'sku-15-1',
    name: '1kg装',
    price: 199,
    stock: 234,
    image: 'https://picsum.photos/id/429/300/300',
    specs: {
      '规格': '1kg装'
    }
  }],
  evaluateCount: 3456,
  evaluateScore: 4.8,
  tags: ['原切', '谷饲']
}, {
  id: 'product-16',
  name: '三只松鼠坚果大礼包 1.5kg',
  price: 89,
  originalPrice: 119,
  images: ['https://picsum.photos/id/326/750/750', 'https://picsum.photos/id/342/750/750', 'https://picsum.photos/id/365/750/750', 'https://picsum.photos/id/380/750/750'],
  description: '三只松鼠坚果礼盒，精选6种坚果，1.5kg大容量。每日坚果，营养健康。独立小包装，方便分享。',
  categoryId: '5',
  categoryName: '食品生鲜',
  brandId: 'brand-squirrel',
  brandName: '三只松鼠',
  sales: 15678,
  stock: 890,
  skus: [{
    id: 'sku-16-1',
    name: '1.5kg礼盒装',
    price: 89,
    stock: 890,
    image: 'https://picsum.photos/id/326/300/300',
    specs: {
      '规格': '1.5kg礼盒装'
    }
  }],
  evaluateCount: 9876,
  evaluateScore: 4.7,
  tags: ['坚果礼盒', '送礼佳品']
}, {
  id: 'product-17',
  name: '帮宝适婴儿纸尿裤 XL码 60片',
  price: 109,
  originalPrice: 149,
  images: ['https://picsum.photos/id/64/750/750', 'https://picsum.photos/id/65/750/750', 'https://picsum.photos/id/66/750/750', 'https://picsum.photos/id/67/750/750'],
  description: '帮宝适超薄干爽纸尿裤，XL码适合12-17kg宝宝。3层锁水系统，整夜干爽。柔软亲肤材质，呵护宝宝娇嫩肌肤。',
  categoryId: '7',
  categoryName: '母婴用品',
  brandId: 'brand-pampers',
  brandName: '帮宝适',
  sales: 23456,
  stock: 1234,
  skus: [{
    id: 'sku-17-1',
    name: 'XL码 60片',
    price: 109,
    stock: 400,
    image: 'https://picsum.photos/id/64/300/300',
    specs: {
      '尺码': 'XL码',
      '数量': '60片'
    }
  }, {
    id: 'sku-17-2',
    name: 'L码 72片',
    price: 99,
    stock: 420,
    image: 'https://picsum.photos/id/65/300/300',
    specs: {
      '尺码': 'L码',
      '数量': '72片'
    }
  }, {
    id: 'sku-17-3',
    name: 'M码 80片',
    price: 89,
    stock: 414,
    image: 'https://picsum.photos/id/66/300/300',
    specs: {
      '尺码': 'M码',
      '数量': '80片'
    }
  }],
  evaluateCount: 15678,
  evaluateScore: 4.8,
  tags: ['婴儿用品', '超薄干爽']
}, {
  id: 'product-18',
  name: '美赞臣蓝臻婴幼儿奶粉 3段 900g',
  price: 349,
  originalPrice: 399,
  images: ['https://picsum.photos/id/68/750/750', 'https://picsum.photos/id/69/750/750', 'https://picsum.photos/id/70/750/750', 'https://picsum.photos/id/71/750/750'],
  description: '美赞臣蓝臻3段奶粉，适合12-36个月宝宝。含乳铁蛋白，增强抵抗力。DHA+ARA，促进大脑发育。原装进口品质保证。',
  categoryId: '7',
  categoryName: '母婴用品',
  brandId: 'brand-meadjohnson',
  brandName: '美赞臣',
  sales: 8901,
  stock: 567,
  skus: [{
    id: 'sku-18-1',
    name: '3段 900g',
    price: 349,
    stock: 567,
    image: 'https://picsum.photos/id/68/300/300',
    specs: {
      '段数': '3段',
      '容量': '900g'
    }
  }],
  evaluateCount: 6789,
  evaluateScore: 4.9,
  tags: ['进口奶粉', '乳铁蛋白']
}, {
  id: 'product-19',
  name: '乐高积木城市系列 儿童拼装玩具',
  price: 199,
  originalPrice: 249,
  images: ['https://picsum.photos/id/72/750/750', 'https://picsum.photos/id/73/750/750', 'https://picsum.photos/id/74/750/750', 'https://picsum.photos/id/75/750/750'],
  description: 'LEGO乐高城市系列拼装玩具，适合6-12岁儿童。培养动手能力和想象力。安全环保材质，拼插稳固不易脱落。',
  categoryId: '7',
  categoryName: '母婴用品',
  brandId: 'brand-lego',
  brandName: '乐高',
  sales: 4567,
  stock: 345,
  skus: [{
    id: 'sku-19-1',
    name: '城市警察局',
    price: 199,
    stock: 345,
    image: 'https://picsum.photos/id/72/300/300',
    specs: {
      '款式': '城市警察局'
    }
  }],
  evaluateCount: 2345,
  evaluateScore: 4.8,
  tags: ['益智玩具', '动手能力']
}, {
  id: 'product-20',
  name: '水星家纺 纯棉四件套 简约风格',
  price: 399,
  originalPrice: 599,
  images: ['https://picsum.photos/id/582/750/750', 'https://picsum.photos/id/584/750/750', 'https://picsum.photos/id/586/750/750', 'https://picsum.photos/id/588/750/750'],
  description: '水星家纺纯棉四件套，100%全棉面料，柔软亲肤。简约北欧风格，百搭各种装修。AB面设计，四季可用。',
  categoryId: '8',
  categoryName: '家居家纺',
  brandId: 'brand-mercury',
  brandName: '水星家纺',
  sales: 6789,
  stock: 456,
  skus: [{
    id: 'sku-20-1',
    name: '1.5m床 灰色',
    price: 399,
    stock: 150,
    image: 'https://picsum.photos/id/582/300/300',
    specs: {
      '尺寸': '1.5m床',
      '颜色': '灰色'
    }
  }, {
    id: 'sku-20-2',
    name: '1.8m床 蓝色',
    price: 449,
    stock: 160,
    image: 'https://picsum.photos/id/584/300/300',
    specs: {
      '尺寸': '1.8m床',
      '颜色': '蓝色'
    }
  }, {
    id: 'sku-20-3',
    name: '1.5m床 米色',
    price: 399,
    stock: 146,
    image: 'https://picsum.photos/id/586/300/300',
    specs: {
      '尺寸': '1.5m床',
      '颜色': '米色'
    }
  }],
  evaluateCount: 4567,
  evaluateScore: 4.7,
  tags: ['纯棉', '简约']
}, {
  id: 'product-21',
  name: '苏泊尔不粘锅套装 炒锅+汤锅',
  price: 299,
  originalPrice: 459,
  images: ['https://picsum.photos/id/598/750/750', 'https://picsum.photos/id/600/750/750', 'https://picsum.photos/id/602/750/750', 'https://picsum.photos/id/604/750/750'],
  description: '苏泊尔不粘锅套装，32cm炒锅+22cm汤锅。不粘涂层，少油健康。加厚锅底，均匀导热。适合家用烹饪。',
  categoryId: '8',
  categoryName: '家居家纺',
  brandId: 'brand-supor',
  brandName: '苏泊尔',
  sales: 5678,
  stock: 345,
  skus: [{
    id: 'sku-21-1',
    name: '炒锅+汤锅套装',
    price: 299,
    stock: 345,
    image: 'https://picsum.photos/id/598/300/300',
    specs: {
      '规格': '32cm炒锅+22cm汤锅'
    }
  }],
  evaluateCount: 3456,
  evaluateScore: 4.6,
  tags: ['不粘锅', '套装']
}, {
  id: 'product-22',
  name: '宜家书架 简约落地置物架',
  price: 199,
  originalPrice: 299,
  images: ['https://picsum.photos/id/787/750/750', 'https://picsum.photos/id/789/750/750', 'https://picsum.photos/id/791/750/750', 'https://picsum.photos/id/793/750/750'],
  description: '宜家简约书架，多层置物设计。优质板材，稳固耐用。简约白色设计，百搭各种家居风格。适合书房客厅使用。',
  categoryId: '8',
  categoryName: '家居家纺',
  brandId: 'brand-ikea',
  brandName: '宜家',
  sales: 4567,
  stock: 234,
  skus: [{
    id: 'sku-22-1',
    name: '白色 五层',
    price: 199,
    stock: 234,
    image: 'https://picsum.photos/id/787/300/300',
    specs: {
      '颜色': '白色',
      '层数': '五层'
    }
  }],
  evaluateCount: 2345,
  evaluateScore: 4.5,
  tags: ['简约', '收纳']
}];

// 获取商品详情
function getProductById(id) {
  return products.find(function (p) {
    return p.id === id;
  });
}

// 根据分类获取商品
function getProductsByCategory(categoryId) {
  return products.filter(function (p) {
    return p.categoryId === categoryId;
  });
}

// 搜索商品
function searchProducts(keyword) {
  var lowerKeyword = keyword.toLowerCase();
  return products.filter(function (p) {
    return p.name.toLowerCase().includes(lowerKeyword) || p.description.toLowerCase().includes(lowerKeyword) || p.brandName.toLowerCase().includes(lowerKeyword);
  });
}

// 推荐商品
function getRecommendedProducts() {
  return products.slice(0, 6);
}

// 根据推荐类型获取商品
function getProductsByRecommendType(type) {
  switch (type) {
    case 'new':
      return products.filter(function (p) {
        return p.tags.includes('新品') || p.sales < 5000;
      }).slice(0, 6);
    case 'special':
      return products.filter(function (p) {
        return p.originalPrice > p.price && (p.originalPrice - p.price) / p.originalPrice > 0.15;
      }).slice(0, 6);
    case 'digital':
      return products.filter(function (p) {
        return p.categoryId === '1';
      }).slice(0, 6);
    case 'fashion':
      return products.filter(function (p) {
        return p.categoryId === '3';
      }).slice(0, 6);
    default:
      return products.slice(0, 6);
  }
}

/***/ }),

/***/ "./src/data/user/user.ts":
/*!*******************************!*\
  !*** ./src/data/user/user.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   userInfo: function() { return /* binding */ userInfo; }
/* harmony export */ });
/* unused harmony exports addresses, getDefaultAddress, getAddressById, formatAddress */
// ============================================
// 用户与地址数据
// ============================================

var userInfo = {
  id: 'user-1',
  nickname: '乐享购用户',
  avatar: 'https://picsum.photos/id/64/200/200',
  phone: '138****8888',
  accountName: '乐享购用户',
  registerDate: '2024-01-15',
  gender: '保密',
  birthday: '请填写您的生日',
  email: '',
  isLoggedIn: true
};
var addresses = [{
  id: 'addr-1',
  name: '张三',
  phone: '13812345678',
  province: '广东省',
  city: '深圳市',
  district: '南山区',
  detail: '科技园南区A1栋501室',
  isDefault: true
}, {
  id: 'addr-2',
  name: '李四',
  phone: '13987654321',
  province: '广东省',
  city: '广州市',
  district: '天河区',
  detail: '珠江新城花城大道88号',
  isDefault: false
}, {
  id: 'addr-3',
  name: '王五',
  phone: '13765432109',
  province: '北京市',
  city: '北京市',
  district: '朝阳区',
  detail: '建国路89号国贸中心',
  isDefault: false
}];

// 收货地址相关类型

// 获取默认地址
function getDefaultAddress() {
  return addresses.find(function (addr) {
    return addr.isDefault;
  });
}

// 根据ID获取地址
function getAddressById(id) {
  return addresses.find(function (addr) {
    return addr.id === id;
  });
}

// 格式化地址为字符串
function formatAddress(address) {
  return "".concat(address.province).concat(address.city).concat(address.district).concat(address.detail);
}

/***/ }),

/***/ "./src/store/AppContext.tsx":
/*!**********************************!*\
  !*** ./src/store/AppContext.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppProvider: function() { return /* binding */ AppProvider; },
/* harmony export */   useAppContext: function() { return /* binding */ useAppContext; }
/* harmony export */ });
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");



// ============================================
// 全局状态管理（使用React Context）
// ============================================




// 用户信息类型

// 购物车项类型

// 初始化用户信息
var defaultUserInfo = {
  id: '',
  nickname: '',
  avatar: '',
  phone: '',
  accountName: '',
  gender: '保密',
  birthday: '请填写您的生日',
  registerDate: '',
  email: '',
  isLoggedIn: false
};

// 初始化购物车
var defaultCart = [];

// 创建Context

var AppContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);

// Provider组件
var AppProvider = function AppProvider(_ref) {
  var children = _ref.children;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultUserInfo),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState, 2),
    userInfo = _useState2[0],
    setUserInfoState = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultCart),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState3, 2),
    cartItems = _useState4[0],
    setCartItemsState = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState5, 2),
    currentStore = _useState6[0],
    setCurrentStoreState = _useState6[1];

  // 从本地存储加载数据
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    try {
      var savedUserInfo = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('userInfo');
      if (savedUserInfo) {
        setUserInfoState(savedUserInfo);
      }
      var savedCart = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('cartItems');
      if (savedCart) {
        setCartItemsState(savedCart);
      }
      var savedStore = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('currentStore');
      if (savedStore) {
        setCurrentStoreState(savedStore);
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    }
  }, []);

  // 保存用户信息到本地存储
  var setUserInfo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (user) {
    setUserInfoState(user);
    try {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('userInfo', user);
    } catch (error) {
      console.error('Failed to save userInfo:', error);
    }
  }, []);

  // 保存购物车到本地存储
  var setCartItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (items) {
    setCartItemsState(items);
    try {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('cartItems', items);
    } catch (error) {
      console.error('Failed to save cartItems:', error);
    }
  }, []);

  // 添加到购物车
  var addToCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (item) {
    setCartItemsState(function (prevItems) {
      var existingItem = prevItems.find(function (cartItem) {
        return cartItem.productId === item.productId && cartItem.skuId === item.skuId;
      });
      var updatedItems;
      if (existingItem) {
        // 如果已存在，增加数量
        updatedItems = prevItems.map(function (cartItem) {
          return cartItem.id === existingItem.id ? (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, cartItem), {}, {
            quantity: cartItem.quantity + item.quantity
          }) : cartItem;
        });
      } else {
        // 如果不存在，添加新项
        var newItem = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
          id: "cart-".concat(Date.now()),
          selected: true
        });
        updatedItems = [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(prevItems), [newItem]);
      }

      // 保存到本地存储
      try {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  }, []);

  // 从购物车移除
  var removeFromCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    setCartItemsState(function (prevItems) {
      var updatedItems = prevItems.filter(function (item) {
        return item.id !== id;
      });
      try {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, []);

  // 更新购物车数量
  var updateCartQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItemsState(function (prevItems) {
      var updatedItems = prevItems.map(function (item) {
        return item.id === id ? (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
          quantity: quantity
        }) : item;
      });
      try {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, [removeFromCart]);

  // 切换购物车项选中状态
  var toggleCartItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    setCartItemsState(function (prevItems) {
      var updatedItems = prevItems.map(function (item) {
        return item.id === id ? (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
          selected: !item.selected
        }) : item;
      });
      try {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, []);

  // 全选/取消全选
  var selectAllCartItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (selected) {
    setCartItemsState(function (prevItems) {
      var updatedItems = prevItems.map(function (item) {
        return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
          selected: selected
        });
      });
      try {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, []);

  // 清空购物车
  var clearCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setCartItemsState([]);
    try {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('cartItems', []);
    } catch (error) {
      console.error('Failed to clear cartItems:', error);
    }
  }, []);

  // 使用 useMemo 缓存购物车总计计算结果
  var cartTotal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var selectedItems = cartItems.filter(function (item) {
      return item.selected;
    });
    var totalAmount = selectedItems.reduce(function (sum, item) {
      return sum + item.price * item.quantity;
    }, 0);
    var totalCount = cartItems.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
    var selectedCount = selectedItems.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
    return {
      totalAmount: totalAmount,
      totalCount: totalCount,
      selectedCount: selectedCount
    };
  }, [cartItems]);

  // 使用 useCallback 缓存 getCartTotal 函数
  var getCartTotal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return cartTotal;
  }, [cartTotal]);

  // 设置当前门店
  var setCurrentStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (store) {
    setCurrentStoreState(store);
    try {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('currentStore', store);
    } catch (error) {
      console.error('Failed to save currentStore:', error);
    }
  }, []);

  // 使用 useMemo 缓存 context value，避免每次渲染都创建新对象
  var contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return {
      userInfo: userInfo,
      setUserInfo: setUserInfo,
      cartItems: cartItems,
      setCartItems: setCartItems,
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      updateCartQuantity: updateCartQuantity,
      toggleCartItem: toggleCartItem,
      selectAllCartItems: selectAllCartItems,
      clearCart: clearCart,
      getCartTotal: getCartTotal,
      currentStore: currentStore,
      setCurrentStore: setCurrentStore
    };
  }, [userInfo, setUserInfo, cartItems, setCartItems, addToCart, removeFromCart, updateCartQuantity, toggleCartItem, selectAllCartItems, clearCart, getCartTotal, currentStore, setCurrentStore]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(AppContext.Provider, {
    value: contextValue,
    children: children
  });
};

// 使用Context的Hook
var useAppContext = function useAppContext() {
  var context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (AppContext);

/***/ })

}]);
//# sourceMappingURL=common.js.map