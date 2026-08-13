"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/api/cart/index.ts":
/*!*******************************!*\
  !*** ./src/api/cart/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCartAPI: function() { return /* binding */ addToCartAPI; },
/* harmony export */   applyRefund: function() { return /* binding */ applyRefund; },
/* harmony export */   batchDeleteCartItem: function() { return /* binding */ batchDeleteCartItem; },
/* harmony export */   cancelOrder: function() { return /* binding */ cancelOrder; },
/* harmony export */   confirmOrder: function() { return /* binding */ confirmOrder; },
/* harmony export */   deleteCartItem: function() { return /* binding */ deleteCartItem; },
/* harmony export */   fetchCartList: function() { return /* binding */ fetchCartList; },
/* harmony export */   fetchDefaultAddress: function() { return /* binding */ fetchDefaultAddress; },
/* harmony export */   fetchOrderDetail: function() { return /* binding */ fetchOrderDetail; },
/* harmony export */   fetchOrderList: function() { return /* binding */ fetchOrderList; },
/* harmony export */   fetchOrderPaymentStatus: function() { return /* binding */ fetchOrderPaymentStatus; },
/* harmony export */   fetchOrderReviews: function() { return /* binding */ fetchOrderReviews; },
/* harmony export */   fetchRefundList: function() { return /* binding */ fetchRefundList; },
/* harmony export */   fetchRefundReasons: function() { return /* binding */ fetchRefundReasons; },
/* harmony export */   payOrder: function() { return /* binding */ payOrder; },
/* harmony export */   submitOrder: function() { return /* binding */ submitOrder; },
/* harmony export */   submitOrderReview: function() { return /* binding */ submitOrderReview; },
/* harmony export */   transformCartItem: function() { return /* binding */ transformCartItem; },
/* harmony export */   updateCartItem: function() { return /* binding */ updateCartItem; }
/* harmony export */ });
/* unused harmony exports cartApi, orderApi, paymentApi, refundApi, addressApi, transformOrderItem, paymentCallback, normalizePaymentStatus, confirmPickupOrder, refundOrder, normalizeReview, normalizeRefundReason, normalizeRefund, fetchRefundDetail, normalizeAddress, fetchAddressList */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");




// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
// 小程序端不受 CORS 限制，直接使用完整后端地址

var BACKEND_HOST = 'http://192.168.10.7:8089';
var API_BASE_URL =  false ? 0 : "".concat(BACKEND_HOST, "/api/v1");

// ==================== URL 常量 ====================
var cartApi = {
  list: "".concat(API_BASE_URL, "/cart"),
  add: "".concat(API_BASE_URL, "/cart"),
  update: "".concat(API_BASE_URL, "/cart/:id"),
  delete: "".concat(API_BASE_URL, "/cart/:id"),
  batchDelete: "".concat(API_BASE_URL, "/cart/batch-delete")
};
var orderApi = {
  submit: "".concat(API_BASE_URL, "/orders"),
  list: "".concat(API_BASE_URL, "/orders"),
  detail: "".concat(API_BASE_URL, "/orders/:id"),
  cancel: "".concat(API_BASE_URL, "/orders/:id/cancel"),
  pay: "".concat(API_BASE_URL, "/orders/:id/pay"),
  paymentStatus: "".concat(API_BASE_URL, "/orders/:id/payment"),
  confirm: "".concat(API_BASE_URL, "/orders/:id/confirm"),
  confirmPickup: "".concat(API_BASE_URL, "/orders/:id/pickup"),
  refund: "".concat(API_BASE_URL, "/orders/:id/refund"),
  review: "".concat(API_BASE_URL, "/orders/:id/review"),
  reviewList: "".concat(API_BASE_URL, "/orders/:id/reviews")
};
var paymentApi = {
  callback: "".concat(API_BASE_URL, "/payment/callback")
};
var refundApi = {
  reasonList: "".concat(API_BASE_URL, "/refund-reasons"),
  list: "".concat(API_BASE_URL, "/refunds"),
  apply: "".concat(API_BASE_URL, "/refunds"),
  detail: "".concat(API_BASE_URL, "/refunds/:id")
};
var addressApi = {
  list: "".concat(API_BASE_URL, "/address"),
  default: "".concat(API_BASE_URL, "/address/default"),
  detail: "".concat(API_BASE_URL, "/address/:id"),
  create: "".concat(API_BASE_URL, "/address"),
  update: "".concat(API_BASE_URL, "/address/:id"),
  delete: "".concat(API_BASE_URL, "/address/:id")
};

// ==================== 数据转换 ====================

/**
 * 转换购物车项：兼容后端可能返回的 snake_case / PascalCase / camelCase 字段名
 */
function isEmptyValue(value) {
  return value === undefined || value === null || value === '' || value === 0 || value === '0';
}
function normalizeEmptyId(value) {
  if (isEmptyValue(value)) return '';
  return String(value);
}
function pickFirstValidId() {
  for (var _len = arguments.length, candidates = new Array(_len), _key = 0; _key < _len; _key++) {
    candidates[_key] = arguments[_key];
  }
  for (var _i = 0, _candidates = candidates; _i < _candidates.length; _i++) {
    var value = _candidates[_i];
    if (!isEmptyValue(value)) {
      return String(value);
    }
  }
  return '';
}

/**
 * 兜底提取商品信息：兼容后端把商品字段平铺在退款记录上，或嵌套在 product/sku/goods/orderItem 等结构里
 */
function extractFallbackProduct(raw) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _raw$product, _ref0, _ref1, _ref10, _raw$sku, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _raw$productName, _ref26, _ref27, _ref28, _ref29, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _raw$skuName, _ref36, _ref37, _ref38, _ref39, _ref40, _ref41, _ref42, _ref43, _ref44, _ref45, _raw$productImage, _ref50, _ref51, _ref52, _ref53, _ref54, _ref55, _ref56, _ref57, _ref58, _ref59, _raw$price, _ref60, _ref61, _ref62, _ref63, _ref64, _ref65, _ref66, _raw$quantity;
  if (!raw || (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(raw) !== 'object') return null;
  var product = (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_raw$product = raw.product) !== null && _raw$product !== void 0 ? _raw$product : raw.Product) !== null && _ref9 !== void 0 ? _ref9 : raw.goods) !== null && _ref8 !== void 0 ? _ref8 : raw.Goods) !== null && _ref7 !== void 0 ? _ref7 : raw.item) !== null && _ref6 !== void 0 ? _ref6 : raw.Item) !== null && _ref5 !== void 0 ? _ref5 : raw.orderItem) !== null && _ref4 !== void 0 ? _ref4 : raw.OrderItem) !== null && _ref3 !== void 0 ? _ref3 : raw.refundItem) !== null && _ref2 !== void 0 ? _ref2 : raw.RefundItem) !== null && _ref !== void 0 ? _ref : {};
  var sku = (_ref0 = (_ref1 = (_ref10 = (_raw$sku = raw.sku) !== null && _raw$sku !== void 0 ? _raw$sku : raw.Sku) !== null && _ref10 !== void 0 ? _ref10 : product.sku) !== null && _ref1 !== void 0 ? _ref1 : product.Sku) !== null && _ref0 !== void 0 ? _ref0 : {};
  var productName = (_ref11 = (_ref12 = (_ref13 = (_ref14 = (_ref15 = (_ref16 = (_ref17 = (_ref18 = (_ref19 = (_ref20 = (_ref21 = (_ref22 = (_ref23 = (_ref24 = (_ref25 = (_raw$productName = raw.productName) !== null && _raw$productName !== void 0 ? _raw$productName : raw.product_name) !== null && _ref25 !== void 0 ? _ref25 : raw.ProductName) !== null && _ref24 !== void 0 ? _ref24 : raw.name) !== null && _ref23 !== void 0 ? _ref23 : raw.Name) !== null && _ref22 !== void 0 ? _ref22 : raw.title) !== null && _ref21 !== void 0 ? _ref21 : raw.Title) !== null && _ref20 !== void 0 ? _ref20 : raw.goodsName) !== null && _ref19 !== void 0 ? _ref19 : raw.goods_name) !== null && _ref18 !== void 0 ? _ref18 : raw.GoodsName) !== null && _ref17 !== void 0 ? _ref17 : product.name) !== null && _ref16 !== void 0 ? _ref16 : product.Name) !== null && _ref15 !== void 0 ? _ref15 : product.productName) !== null && _ref14 !== void 0 ? _ref14 : product.title) !== null && _ref13 !== void 0 ? _ref13 : product.Title) !== null && _ref12 !== void 0 ? _ref12 : product.goodsName) !== null && _ref11 !== void 0 ? _ref11 : '';
  var skuName = (_ref26 = (_ref27 = (_ref28 = (_ref29 = (_ref30 = (_ref31 = (_ref32 = (_ref33 = (_ref34 = (_ref35 = (_raw$skuName = raw.skuName) !== null && _raw$skuName !== void 0 ? _raw$skuName : raw.sku_name) !== null && _ref35 !== void 0 ? _ref35 : raw.SkuName) !== null && _ref34 !== void 0 ? _ref34 : raw.specName) !== null && _ref33 !== void 0 ? _ref33 : raw.spec_name) !== null && _ref32 !== void 0 ? _ref32 : raw.SpecName) !== null && _ref31 !== void 0 ? _ref31 : raw.specs) !== null && _ref30 !== void 0 ? _ref30 : sku.name) !== null && _ref29 !== void 0 ? _ref29 : sku.skuName) !== null && _ref28 !== void 0 ? _ref28 : sku.specName) !== null && _ref27 !== void 0 ? _ref27 : sku.specs) !== null && _ref26 !== void 0 ? _ref26 : '';
  if (!skuName && (raw.specValues || sku.specValues)) {
    var sv = raw.specValues || sku.specValues;
    if ((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(sv) === 'object') {
      skuName = Object.values(sv).join('/') || '';
    }
  }
  var image = (_ref36 = (_ref37 = (_ref38 = (_ref39 = (_ref40 = (_ref41 = (_ref42 = (_ref43 = (_ref44 = (_ref45 = (_raw$productImage = raw.productImage) !== null && _raw$productImage !== void 0 ? _raw$productImage : raw.product_image) !== null && _ref45 !== void 0 ? _ref45 : raw.ProductImage) !== null && _ref44 !== void 0 ? _ref44 : raw.image) !== null && _ref43 !== void 0 ? _ref43 : raw.Image) !== null && _ref42 !== void 0 ? _ref42 : raw.pic) !== null && _ref41 !== void 0 ? _ref41 : raw.Pic) !== null && _ref40 !== void 0 ? _ref40 : product.image) !== null && _ref39 !== void 0 ? _ref39 : product.Image) !== null && _ref38 !== void 0 ? _ref38 : product.pic) !== null && _ref37 !== void 0 ? _ref37 : product.Pic) !== null && _ref36 !== void 0 ? _ref36 : '';
  if (!image) {
    var _ref46, _ref47, _ref48, _ref49, _product$images;
    var arr = (_ref46 = (_ref47 = (_ref48 = (_ref49 = (_product$images = product.images) !== null && _product$images !== void 0 ? _product$images : product.Images) !== null && _ref49 !== void 0 ? _ref49 : product.imageList) !== null && _ref48 !== void 0 ? _ref48 : product.ImageList) !== null && _ref47 !== void 0 ? _ref47 : sku.images) !== null && _ref46 !== void 0 ? _ref46 : sku.Images;
    if (Array.isArray(arr) && arr.length > 0) {
      image = arr[0];
    }
  }
  if (typeof image === 'string') {
    if (image.startsWith('[')) {
      try {
        var parsed = JSON.parse(image);
        if (Array.isArray(parsed) && parsed.length > 0) {
          image = String(parsed[0]).replace(/^`|`$/g, '');
        }
      } catch (_unused) {/* ignore */}
    } else {
      image = image.replace(/^`|`$/g, '');
    }
  }
  var price = Number((_ref50 = (_ref51 = (_ref52 = (_ref53 = (_ref54 = (_ref55 = (_ref56 = (_ref57 = (_ref58 = (_ref59 = (_raw$price = raw.price) !== null && _raw$price !== void 0 ? _raw$price : raw.Price) !== null && _ref59 !== void 0 ? _ref59 : raw.refundPrice) !== null && _ref58 !== void 0 ? _ref58 : raw.refund_price) !== null && _ref57 !== void 0 ? _ref57 : raw.RefundPrice) !== null && _ref56 !== void 0 ? _ref56 : raw.amount) !== null && _ref55 !== void 0 ? _ref55 : raw.Amount) !== null && _ref54 !== void 0 ? _ref54 : sku.price) !== null && _ref53 !== void 0 ? _ref53 : sku.Price) !== null && _ref52 !== void 0 ? _ref52 : product.price) !== null && _ref51 !== void 0 ? _ref51 : product.Price) !== null && _ref50 !== void 0 ? _ref50 : 0);
  var quantity = Number((_ref60 = (_ref61 = (_ref62 = (_ref63 = (_ref64 = (_ref65 = (_ref66 = (_raw$quantity = raw.quantity) !== null && _raw$quantity !== void 0 ? _raw$quantity : raw.Quantity) !== null && _ref66 !== void 0 ? _ref66 : raw.count) !== null && _ref65 !== void 0 ? _ref65 : raw.Count) !== null && _ref64 !== void 0 ? _ref64 : raw.num) !== null && _ref63 !== void 0 ? _ref63 : raw.Num) !== null && _ref62 !== void 0 ? _ref62 : sku.quantity) !== null && _ref61 !== void 0 ? _ref61 : product.quantity) !== null && _ref60 !== void 0 ? _ref60 : 1);
  if (!productName && !image) return null;
  return {
    productName: productName,
    skuName: skuName,
    image: image,
    price: price,
    quantity: quantity
  };
}
function transformCartItem(raw) {
  var _ref67, _ref68, _ref69, _raw$sku2, _ref70, _ref71, _ref72, _ref73, _ref74, _ref75, _ref76, _ref77, _ref78, _raw$product2, _ref79, _ref80, _ref81, _ref82, _ref83, _ref84, _ref85, _ref86, _ref87, _ref88, _raw$skuName2, _rawSku$product, _rawSku$product2, _rawSku$product3, _rawSku$product4, _rawSku$product5, _rawSku$product6, _product$images2, _product$Images, _ref89, _ref90, _ref91, _ref92, _ref93, _ref94, _ref95, _ref96, _ref97, _ref98, _raw$productName2, _ref99, _ref100, _ref101, _ref102, _ref103, _ref104, _ref105, _ref106, _ref107, _ref108, _ref109, _ref110, _ref111, _ref112, _raw$price2, _rawSku$product7, _rawSku$product8, _ref113, _ref114, _ref115, _raw$quantity2, _ref116, _ref117, _ref118, _ref119, _ref120, _ref121, _raw$stock, _ref122, _raw$selected, _ref123, _ref124, _ref125, _ref126, _raw$isSeckill, _ref127, _ref128, _ref129, _ref130, _ref131, _raw$seckillPrice, _ref132, _ref133, _ref134, _ref135, _ref136, _raw$originalPrice, _ref137, _ref138, _ref139, _ref140, _raw$storeId, _ref141, _ref142, _ref143, _ref144, _raw$storeName, _ref145, _raw$checked, _ref146, _ref147, _ref148, _ref149, _ref150, _raw$skuCode, _ref151, _ref152, _ref153, _ref154, _raw$productCode, _ref155, _ref156, _ref157, _raw$createTime, _ref158, _ref159, _ref160, _raw$updateTime;
  var id = pickFirstValidId(raw.id, raw.Id, raw.ID, raw.cartId, raw.cart_id, raw.CartId, raw.Cart_id, raw.cartItemId, raw.cart_item_id, raw.CartItemId, raw.CartItemID, raw.cartItemID, raw.cid, raw.Cid, raw.CID, raw.itemId, raw.item_id, raw.ItemId, raw.ItemID, raw.shoppingCartId, raw.shopping_cart_id, raw.ShoppingCartId, raw.shoppingCartItemId, raw.shopping_cart_item_id, raw.ShoppingCartItemId);
  if (!id) {
    console.warn('[transformCartItem] 无法提取有效购物车ID，原始数据:', JSON.stringify(raw));
  }

  // 兼容后端返回的嵌套商品/SKU结构：
  // 1. { product: {...}, sku: {...}, quantity: 1 }
  // 2. { sku: { product: {...}, ... }, quantity: 1 }
  var rawSku = (_ref67 = (_ref68 = (_ref69 = (_raw$sku2 = raw.sku) !== null && _raw$sku2 !== void 0 ? _raw$sku2 : raw.Sku) !== null && _ref69 !== void 0 ? _ref69 : raw.skuInfo) !== null && _ref68 !== void 0 ? _ref68 : raw.SkuInfo) !== null && _ref67 !== void 0 ? _ref67 : {};
  var product = (_ref70 = (_ref71 = (_ref72 = (_ref73 = (_ref74 = (_ref75 = (_ref76 = (_ref77 = (_ref78 = (_raw$product2 = raw.product) !== null && _raw$product2 !== void 0 ? _raw$product2 : raw.Product) !== null && _ref78 !== void 0 ? _ref78 : raw.goods) !== null && _ref77 !== void 0 ? _ref77 : raw.Goods) !== null && _ref76 !== void 0 ? _ref76 : raw.item) !== null && _ref75 !== void 0 ? _ref75 : raw.Item) !== null && _ref74 !== void 0 ? _ref74 : rawSku.product) !== null && _ref73 !== void 0 ? _ref73 : rawSku.Product) !== null && _ref72 !== void 0 ? _ref72 : rawSku.goods) !== null && _ref71 !== void 0 ? _ref71 : rawSku.Goods) !== null && _ref70 !== void 0 ? _ref70 : {};

  // 处理 specValues：后端返回对象 {"颜色":"红色"}，需要转为字符串
  var skuName = (_ref79 = (_ref80 = (_ref81 = (_ref82 = (_ref83 = (_ref84 = (_ref85 = (_ref86 = (_ref87 = (_ref88 = (_raw$skuName2 = raw.skuName) !== null && _raw$skuName2 !== void 0 ? _raw$skuName2 : raw.sku_name) !== null && _ref88 !== void 0 ? _ref88 : raw.SkuName) !== null && _ref87 !== void 0 ? _ref87 : raw.specName) !== null && _ref86 !== void 0 ? _ref86 : rawSku.name) !== null && _ref85 !== void 0 ? _ref85 : rawSku.skuName) !== null && _ref84 !== void 0 ? _ref84 : rawSku.sku_name) !== null && _ref83 !== void 0 ? _ref83 : rawSku.SkuName) !== null && _ref82 !== void 0 ? _ref82 : rawSku.specName) !== null && _ref81 !== void 0 ? _ref81 : rawSku.title) !== null && _ref80 !== void 0 ? _ref80 : rawSku.Title) !== null && _ref79 !== void 0 ? _ref79 : '';
  if (!skuName && raw.specValues && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(raw.specValues) === 'object') {
    skuName = Object.values(raw.specValues).join('/') || '';
  }
  if (!skuName && rawSku.specValues && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rawSku.specValues) === 'object') {
    skuName = Object.values(rawSku.specValues).join('/') || '';
  }
  if (!skuName && rawSku.specs && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rawSku.specs) === 'object') {
    skuName = Object.values(rawSku.specs).join('/') || '';
  }
  if (!skuName && product.specs && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(product.specs) === 'object') {
    skuName = Object.values(product.specs).join('/') || '';
  }

  // 处理 image：后端可能返回 JSON 字符串 '["url"]' 或普通字符串，URL 前后可能带反引号
  var imageCandidates = [raw.image, raw.imageUrl, raw.image_url, raw.Image, raw.pic, raw.mainImage, raw.main_image, raw.MainImage, raw.cover, raw.Cover, raw.thumbnail, raw.Thumbnail, raw.productImage, raw.product_image, raw.ProductImage, rawSku.image, rawSku.Image, rawSku.pic, rawSku.skuImage, rawSku.SkuImage, rawSku.mainImage, rawSku.main_image, rawSku.MainImage, rawSku.cover, rawSku.Cover, rawSku.thumbnail, rawSku.Thumbnail, (_rawSku$product = rawSku.product) === null || _rawSku$product === void 0 || (_rawSku$product = _rawSku$product.images) === null || _rawSku$product === void 0 ? void 0 : _rawSku$product[0], (_rawSku$product2 = rawSku.product) === null || _rawSku$product2 === void 0 || (_rawSku$product2 = _rawSku$product2.Images) === null || _rawSku$product2 === void 0 ? void 0 : _rawSku$product2[0], (_rawSku$product3 = rawSku.product) === null || _rawSku$product3 === void 0 ? void 0 : _rawSku$product3.mainImage, (_rawSku$product4 = rawSku.product) === null || _rawSku$product4 === void 0 ? void 0 : _rawSku$product4.MainImage, (_rawSku$product5 = rawSku.product) === null || _rawSku$product5 === void 0 ? void 0 : _rawSku$product5.image, (_rawSku$product6 = rawSku.product) === null || _rawSku$product6 === void 0 ? void 0 : _rawSku$product6.Image, product.image, product.Image, product.pic, (_product$images2 = product.images) === null || _product$images2 === void 0 ? void 0 : _product$images2[0], (_product$Images = product.Images) === null || _product$Images === void 0 ? void 0 : _product$Images[0], product.mainImage, product.MainImage, product.main_image, product.imageUrl, product.image_url, product.ImageUrl, product.cover, product.Cover, product.thumbnail, product.Thumbnail];
  var image = '';
  for (var _i2 = 0, _imageCandidates = imageCandidates; _i2 < _imageCandidates.length; _i2++) {
    var candidate = _imageCandidates[_i2];
    if (candidate !== undefined && candidate !== null && candidate !== '') {
      image = candidate;
      break;
    }
  }
  if (typeof image === 'string') {
    if (image.startsWith('[')) {
      try {
        var parsed = JSON.parse(image);
        if (Array.isArray(parsed) && parsed.length > 0) {
          image = String(parsed[0]).replace(/^`|`$/g, '');
        }
      } catch (_unused2) {/* ignore */}
    } else {
      image = image.replace(/^`|`$/g, '');
    }
  }
  var productName = (_ref89 = (_ref90 = (_ref91 = (_ref92 = (_ref93 = (_ref94 = (_ref95 = (_ref96 = (_ref97 = (_ref98 = (_raw$productName2 = raw.productName) !== null && _raw$productName2 !== void 0 ? _raw$productName2 : raw.product_name) !== null && _ref98 !== void 0 ? _ref98 : raw.ProductName) !== null && _ref97 !== void 0 ? _ref97 : raw.name) !== null && _ref96 !== void 0 ? _ref96 : raw.title) !== null && _ref95 !== void 0 ? _ref95 : product.name) !== null && _ref94 !== void 0 ? _ref94 : product.Name) !== null && _ref93 !== void 0 ? _ref93 : product.title) !== null && _ref92 !== void 0 ? _ref92 : product.Title) !== null && _ref91 !== void 0 ? _ref91 : product.productName) !== null && _ref90 !== void 0 ? _ref90 : product.product_name) !== null && _ref89 !== void 0 ? _ref89 : '';
  var price = Number((_ref99 = (_ref100 = (_ref101 = (_ref102 = (_ref103 = (_ref104 = (_ref105 = (_ref106 = (_ref107 = (_ref108 = (_ref109 = (_ref110 = (_ref111 = (_ref112 = (_raw$price2 = raw.price) !== null && _raw$price2 !== void 0 ? _raw$price2 : raw.Price) !== null && _ref112 !== void 0 ? _ref112 : raw.salePrice) !== null && _ref111 !== void 0 ? _ref111 : raw.sale_price) !== null && _ref110 !== void 0 ? _ref110 : raw.discountPrice) !== null && _ref109 !== void 0 ? _ref109 : raw.amount) !== null && _ref108 !== void 0 ? _ref108 : rawSku.price) !== null && _ref107 !== void 0 ? _ref107 : rawSku.Price) !== null && _ref106 !== void 0 ? _ref106 : rawSku.salePrice) !== null && _ref105 !== void 0 ? _ref105 : rawSku.sale_price) !== null && _ref104 !== void 0 ? _ref104 : rawSku.discountPrice) !== null && _ref103 !== void 0 ? _ref103 : product.price) !== null && _ref102 !== void 0 ? _ref102 : product.Price) !== null && _ref101 !== void 0 ? _ref101 : product.salePrice) !== null && _ref100 !== void 0 ? _ref100 : product.sale_price) !== null && _ref99 !== void 0 ? _ref99 : 0);

  // 当转换后关键信息仍缺失时打印完整原始数据，便于排查后端字段问题
  if (!productName || !price || !image) {
    console.warn('[transformCartItem] 商品关键信息缺失，原始数据:', JSON.stringify(raw));
  }
  return {
    id: id,
    productId: pickFirstValidId(raw.productId, raw.product_id, raw.ProductId, raw.pid, raw.productID, product.id, product.Id, product.ID, rawSku.productId, (_rawSku$product7 = rawSku.product) === null || _rawSku$product7 === void 0 ? void 0 : _rawSku$product7.id, (_rawSku$product8 = rawSku.product) === null || _rawSku$product8 === void 0 ? void 0 : _rawSku$product8.ID),
    productName: productName,
    skuId: pickFirstValidId(raw.skuId, raw.sku_id, raw.SkuId, raw.skuID, rawSku.id, rawSku.Id, rawSku.ID),
    skuName: skuName,
    price: price,
    quantity: Number((_ref113 = (_ref114 = (_ref115 = (_raw$quantity2 = raw.quantity) !== null && _raw$quantity2 !== void 0 ? _raw$quantity2 : raw.Quantity) !== null && _ref115 !== void 0 ? _ref115 : raw.count) !== null && _ref114 !== void 0 ? _ref114 : raw.num) !== null && _ref113 !== void 0 ? _ref113 : 1),
    stock: Number((_ref116 = (_ref117 = (_ref118 = (_ref119 = (_ref120 = (_ref121 = (_raw$stock = raw.stock) !== null && _raw$stock !== void 0 ? _raw$stock : raw.Stock) !== null && _ref121 !== void 0 ? _ref121 : raw.maxQuantity) !== null && _ref120 !== void 0 ? _ref120 : rawSku.stock) !== null && _ref119 !== void 0 ? _ref119 : rawSku.Stock) !== null && _ref118 !== void 0 ? _ref118 : product.stock) !== null && _ref117 !== void 0 ? _ref117 : product.Stock) !== null && _ref116 !== void 0 ? _ref116 : 999),
    image: image,
    selected: (_ref122 = (_raw$selected = raw.selected) !== null && _raw$selected !== void 0 ? _raw$selected : raw.Selected) !== null && _ref122 !== void 0 ? _ref122 : true,
    isSeckill: (_ref123 = (_ref124 = (_ref125 = (_ref126 = (_raw$isSeckill = raw.isSeckill) !== null && _raw$isSeckill !== void 0 ? _raw$isSeckill : raw.is_seckill) !== null && _ref126 !== void 0 ? _ref126 : raw.IsSeckill) !== null && _ref125 !== void 0 ? _ref125 : product.isSeckill) !== null && _ref124 !== void 0 ? _ref124 : product.is_seckill) !== null && _ref123 !== void 0 ? _ref123 : false,
    seckillPrice: (_ref127 = (_ref128 = (_ref129 = (_ref130 = (_ref131 = (_raw$seckillPrice = raw.seckillPrice) !== null && _raw$seckillPrice !== void 0 ? _raw$seckillPrice : raw.seckill_price) !== null && _ref131 !== void 0 ? _ref131 : raw.SeckillPrice) !== null && _ref130 !== void 0 ? _ref130 : rawSku.seckillPrice) !== null && _ref129 !== void 0 ? _ref129 : rawSku.seckill_price) !== null && _ref128 !== void 0 ? _ref128 : product.seckillPrice) !== null && _ref127 !== void 0 ? _ref127 : null,
    originalPrice: (_ref132 = (_ref133 = (_ref134 = (_ref135 = (_ref136 = (_raw$originalPrice = raw.originalPrice) !== null && _raw$originalPrice !== void 0 ? _raw$originalPrice : raw.original_price) !== null && _ref136 !== void 0 ? _ref136 : raw.OriginalPrice) !== null && _ref135 !== void 0 ? _ref135 : raw.marketPrice) !== null && _ref134 !== void 0 ? _ref134 : rawSku.originalPrice) !== null && _ref133 !== void 0 ? _ref133 : product.originalPrice) !== null && _ref132 !== void 0 ? _ref132 : null,
    storeId: (_ref137 = (_ref138 = (_ref139 = (_ref140 = (_raw$storeId = raw.storeId) !== null && _raw$storeId !== void 0 ? _raw$storeId : raw.store_id) !== null && _ref140 !== void 0 ? _ref140 : raw.StoreId) !== null && _ref139 !== void 0 ? _ref139 : product.storeId) !== null && _ref138 !== void 0 ? _ref138 : product.store_id) !== null && _ref137 !== void 0 ? _ref137 : null,
    storeName: (_ref141 = (_ref142 = (_ref143 = (_ref144 = (_raw$storeName = raw.storeName) !== null && _raw$storeName !== void 0 ? _raw$storeName : raw.store_name) !== null && _ref144 !== void 0 ? _ref144 : raw.StoreName) !== null && _ref143 !== void 0 ? _ref143 : product.storeName) !== null && _ref142 !== void 0 ? _ref142 : product.store_name) !== null && _ref141 !== void 0 ? _ref141 : '',
    checked: (_ref145 = (_raw$checked = raw.checked) !== null && _raw$checked !== void 0 ? _raw$checked : raw.Checked) !== null && _ref145 !== void 0 ? _ref145 : null,
    skuCode: (_ref146 = (_ref147 = (_ref148 = (_ref149 = (_ref150 = (_raw$skuCode = raw.skuCode) !== null && _raw$skuCode !== void 0 ? _raw$skuCode : raw.sku_code) !== null && _ref150 !== void 0 ? _ref150 : raw.SkuCode) !== null && _ref149 !== void 0 ? _ref149 : rawSku.skuCode) !== null && _ref148 !== void 0 ? _ref148 : rawSku.sku_code) !== null && _ref147 !== void 0 ? _ref147 : rawSku.SkuCode) !== null && _ref146 !== void 0 ? _ref146 : '',
    productCode: (_ref151 = (_ref152 = (_ref153 = (_ref154 = (_raw$productCode = raw.productCode) !== null && _raw$productCode !== void 0 ? _raw$productCode : raw.product_code) !== null && _ref154 !== void 0 ? _ref154 : raw.ProductCode) !== null && _ref153 !== void 0 ? _ref153 : product.productCode) !== null && _ref152 !== void 0 ? _ref152 : product.product_code) !== null && _ref151 !== void 0 ? _ref151 : '',
    createTime: (_ref155 = (_ref156 = (_ref157 = (_raw$createTime = raw.createTime) !== null && _raw$createTime !== void 0 ? _raw$createTime : raw.create_time) !== null && _ref157 !== void 0 ? _ref157 : raw.CreateTime) !== null && _ref156 !== void 0 ? _ref156 : raw.CreatedAt) !== null && _ref155 !== void 0 ? _ref155 : '',
    updateTime: (_ref158 = (_ref159 = (_ref160 = (_raw$updateTime = raw.updateTime) !== null && _raw$updateTime !== void 0 ? _raw$updateTime : raw.update_time) !== null && _ref160 !== void 0 ? _ref160 : raw.UpdateTime) !== null && _ref159 !== void 0 ? _ref159 : raw.UpdatedAt) !== null && _ref158 !== void 0 ? _ref158 : ''
  };
}

/**
 * 转换订单列表项
 */
// 后端订单状态码：0=待支付 2=待发货 3=待自提 4=已完成 5=已取消
var orderStatusCodeMap = {
  0: 'pending_payment',
  2: 'pending_delivery',
  3: 'pending_pickup',
  4: 'completed',
  5: 'cancelled'
};
function transformOrderItem(raw) {
  var _ref161, _ref162, _raw$status, _orderStatusCodeMap$r, _ref163, _ref164, _raw$totalAmount, _ref165, _ref166, _raw$payAmount, _ref167, _ref168, _raw$freightAmount, _ref169, _ref170, _ref171, _ref172, _raw$couponAmount, _ref173, _ref174, _raw$itemCount, _ref175, _ref176, _ref177, _ref178, _raw$createdAt, _ref179, _ref180, _ref181, _ref182, _raw$payAt, _ref183, _raw$address, _ref184, _ref185, _ref186, _raw$storeName2, _raw$store, _ref187, _raw$store2, _ref188, _raw$remark, _ref189, _ref190, _ref191, _ref192, _raw$isReviewed;
  var rawStatus = (_ref161 = (_ref162 = (_raw$status = raw.status) !== null && _raw$status !== void 0 ? _raw$status : raw.Status) !== null && _ref162 !== void 0 ? _ref162 : raw.orderStatus) !== null && _ref161 !== void 0 ? _ref161 : '';
  var status = typeof rawStatus === 'number' ? (_orderStatusCodeMap$r = orderStatusCodeMap[rawStatus]) !== null && _orderStatusCodeMap$r !== void 0 ? _orderStatusCodeMap$r : String(rawStatus) : rawStatus;
  return {
    id: pickFirstValidId(raw.id, raw.Id, raw.ID, raw.orderId, raw.order_id),
    orderNo: pickFirstValidId(raw.orderNo, raw.order_no, raw.OrderNo, raw.OrderNO),
    status: status,
    totalAmount: Number((_ref163 = (_ref164 = (_raw$totalAmount = raw.totalAmount) !== null && _raw$totalAmount !== void 0 ? _raw$totalAmount : raw.total_amount) !== null && _ref164 !== void 0 ? _ref164 : raw.TotalAmount) !== null && _ref163 !== void 0 ? _ref163 : 0),
    payAmount: Number((_ref165 = (_ref166 = (_raw$payAmount = raw.payAmount) !== null && _raw$payAmount !== void 0 ? _raw$payAmount : raw.pay_amount) !== null && _ref166 !== void 0 ? _ref166 : raw.PayAmount) !== null && _ref165 !== void 0 ? _ref165 : 0),
    freightAmount: Number((_ref167 = (_ref168 = (_raw$freightAmount = raw.freightAmount) !== null && _raw$freightAmount !== void 0 ? _raw$freightAmount : raw.freight_amount) !== null && _ref168 !== void 0 ? _ref168 : raw.FreightAmount) !== null && _ref167 !== void 0 ? _ref167 : 0),
    couponAmount: Number((_ref169 = (_ref170 = (_ref171 = (_ref172 = (_raw$couponAmount = raw.couponAmount) !== null && _raw$couponAmount !== void 0 ? _raw$couponAmount : raw.coupon_amount) !== null && _ref172 !== void 0 ? _ref172 : raw.CouponAmount) !== null && _ref171 !== void 0 ? _ref171 : raw.discountAmount) !== null && _ref170 !== void 0 ? _ref170 : raw.discount_amount) !== null && _ref169 !== void 0 ? _ref169 : 0),
    itemCount: Number((_ref173 = (_ref174 = (_raw$itemCount = raw.itemCount) !== null && _raw$itemCount !== void 0 ? _raw$itemCount : raw.item_count) !== null && _ref174 !== void 0 ? _ref174 : raw.ItemCount) !== null && _ref173 !== void 0 ? _ref173 : Array.isArray(raw.items) ? raw.items.length : 0),
    createdAt: (_ref175 = (_ref176 = (_ref177 = (_ref178 = (_raw$createdAt = raw.createdAt) !== null && _raw$createdAt !== void 0 ? _raw$createdAt : raw.created_at) !== null && _ref178 !== void 0 ? _ref178 : raw.createTime) !== null && _ref177 !== void 0 ? _ref177 : raw.CreateTime) !== null && _ref176 !== void 0 ? _ref176 : raw.CreatedAt) !== null && _ref175 !== void 0 ? _ref175 : '',
    payAt: (_ref179 = (_ref180 = (_ref181 = (_ref182 = (_raw$payAt = raw.payAt) !== null && _raw$payAt !== void 0 ? _raw$payAt : raw.pay_at) !== null && _ref182 !== void 0 ? _ref182 : raw.PayAt) !== null && _ref181 !== void 0 ? _ref181 : raw.paidAt) !== null && _ref180 !== void 0 ? _ref180 : raw.PaidAt) !== null && _ref179 !== void 0 ? _ref179 : '',
    items: Array.isArray(raw.items) ? raw.items.map(transformCartItem) : [],
    address: (_ref183 = (_raw$address = raw.address) !== null && _raw$address !== void 0 ? _raw$address : raw.Address) !== null && _ref183 !== void 0 ? _ref183 : null,
    storeName: (_ref184 = (_ref185 = (_ref186 = (_raw$storeName2 = raw.storeName) !== null && _raw$storeName2 !== void 0 ? _raw$storeName2 : raw.store_name) !== null && _ref186 !== void 0 ? _ref186 : raw.StoreName) !== null && _ref185 !== void 0 ? _ref185 : (_raw$store = raw.store) === null || _raw$store === void 0 ? void 0 : _raw$store.name) !== null && _ref184 !== void 0 ? _ref184 : '',
    store: (_ref187 = (_raw$store2 = raw.store) !== null && _raw$store2 !== void 0 ? _raw$store2 : raw.Store) !== null && _ref187 !== void 0 ? _ref187 : null,
    remark: (_ref188 = (_raw$remark = raw.remark) !== null && _raw$remark !== void 0 ? _raw$remark : raw.Remark) !== null && _ref188 !== void 0 ? _ref188 : '',
    isReviewed: (_ref189 = (_ref190 = (_ref191 = (_ref192 = (_raw$isReviewed = raw.isReviewed) !== null && _raw$isReviewed !== void 0 ? _raw$isReviewed : raw.is_reviewed) !== null && _ref192 !== void 0 ? _ref192 : raw.IsReviewed) !== null && _ref191 !== void 0 ? _ref191 : raw.reviewed) !== null && _ref190 !== void 0 ? _ref190 : raw.Reviewed) !== null && _ref189 !== void 0 ? _ref189 : false
  };
}

// ==================== 购物车 API 方法 ====================

/**
 * 获取购物车列表
 * GET /api/v1/cart
 */
function fetchCartList() {
  return _fetchCartList.apply(this, arguments);
}

/**
 * 添加商品到购物车
 * POST /api/v1/cart
 */
function _fetchCartList() {
  _fetchCartList = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee() {
    var _ref452, _res$data$list, _res$data, _res$data2;
    var params,
      res,
      list,
      _args = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          _context.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(cartApi.list, params);
        case 1:
          res = _context.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (_ref452 = (_res$data$list = res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.list) !== null && _res$data$list !== void 0 ? _res$data$list : res === null || res === void 0 || (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.items) !== null && _ref452 !== void 0 ? _ref452 : []; // 临时调试
          if (list.length > 0) {
            console.log('[fetchCartList] 后端原始第一条:', JSON.stringify(list[0], null, 2));
          }
          return _context.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: list.map(transformCartItem)
          }));
      }
    }, _callee);
  }));
  return _fetchCartList.apply(this, arguments);
}
function addToCartAPI(_x) {
  return _addToCartAPI.apply(this, arguments);
}

/**
 * 修改购物车项数量
 * PUT /api/v1/cart/{id}
 */
function _addToCartAPI() {
  _addToCartAPI = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee2(payload) {
    var body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          body = {
            productId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.productId),
            skuId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.skuId),
            quantity: payload.quantity
          };
          if (payload.storeId !== undefined && payload.storeId !== null) body.storeId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.storeId);
          if (payload.remark) body.remark = payload.remark;
          _context2.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(cartApi.add, body, {}, {}, false);
        case 1:
          res = _context2.v;
          return _context2.a(2, res);
      }
    }, _callee2);
  }));
  return _addToCartAPI.apply(this, arguments);
}
function updateCartItem(_x2, _x3) {
  return _updateCartItem.apply(this, arguments);
}

/**
 * 删除单个购物车项
 * DELETE /api/v1/cart/{id}
 */
function _updateCartItem() {
  _updateCartItem = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee3(id, payload) {
    var numericId, body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          numericId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(id);
          if (numericId) {
            _context3.n = 1;
            break;
          }
          console.error('[updateCartItem] 无效的购物车ID:', id, '类型:', (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(id));
          throw new Error('无效的购物车ID');
        case 1:
          body = {};
          if (payload.quantity !== undefined) body.quantity = payload.quantity;
          if (payload.selected !== undefined) body.selected = payload.selected;
          _context3.n = 2;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPut)(cartApi.update, body, {
            id: numericId
          });
        case 2:
          res = _context3.v;
          return _context3.a(2, res);
      }
    }, _callee3);
  }));
  return _updateCartItem.apply(this, arguments);
}
function deleteCartItem(_x4) {
  return _deleteCartItem.apply(this, arguments);
}

/**
 * 批量删除购物车项
 * POST /api/v1/cart/batch-delete
 */
function _deleteCartItem() {
  _deleteCartItem = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee4(id) {
    var numericId, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          numericId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(id);
          if (numericId) {
            _context4.n = 1;
            break;
          }
          console.error('[deleteCartItem] 无效的购物车ID:', id, '类型:', (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(id));
          throw new Error('无效的购物车ID');
        case 1:
          _context4.n = 2;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiDelete)(cartApi.delete, {}, {
            id: numericId
          });
        case 2:
          res = _context4.v;
          return _context4.a(2, res);
      }
    }, _callee4);
  }));
  return _deleteCartItem.apply(this, arguments);
}
function batchDeleteCartItem(_x5) {
  return _batchDeleteCartItem.apply(this, arguments);
}

// ==================== 订单 API 方法 ====================

/**
 * 提交订单
 * POST /api/v1/orders
 * 后端契约: { cartIds: uint64[], storeId: uint64, userCouponId: uint64|null, remark: string }
 */
function _batchDeleteCartItem() {
  _batchDeleteCartItem = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee5(ids) {
    var numericIds, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          numericIds = ids.map(_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId).filter(Boolean);
          if (!(numericIds.length === 0)) {
            _context5.n = 1;
            break;
          }
          throw new Error('无效的购物车ID');
        case 1:
          _context5.n = 2;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(cartApi.batchDelete, {
            ids: numericIds
          }, {}, {}, false);
        case 2:
          res = _context5.v;
          return _context5.a(2, res);
      }
    }, _callee5);
  }));
  return _batchDeleteCartItem.apply(this, arguments);
}
function submitOrder(_x6) {
  return _submitOrder.apply(this, arguments);
}

/**
 * 获取订单列表
 * GET /api/v1/orders
 */
function _submitOrder() {
  _submitOrder = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee6(payload) {
    var requestBody, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          // 根据后端 Go 结构体构建请求
          // cartIds: 购物车ID列表（从购物车结算时传递）
          // storeId: 自提门店ID
          // userCouponId: 用户优惠券ID（可选）
          // remark: 订单备注
          requestBody = {}; // 处理购物车 ID 列表
          if (Array.isArray(payload.cartIds)) {
            requestBody.cartIds = payload.cartIds.map(function (id) {
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(id);
            });
          } else if (Array.isArray(payload.items)) {
            // 如果传递的是商品列表而非购物车 ID，从中提取 ID
            requestBody.cartIds = payload.items.filter(function (item) {
              return item.id;
            }).map(function (item) {
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(item.id);
            });
          } else {
            requestBody.cartIds = [];
          }

          // 处理门店 ID
          requestBody.storeId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.storeId);

          // 处理优惠券 ID（可选）
          if (payload.userCouponId !== undefined && payload.userCouponId !== null && payload.userCouponId !== 0) {
            requestBody.userCouponId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.userCouponId);
          } else {
            requestBody.userCouponId = null;
          }

          // 处理备注
          requestBody.remark = payload.remark || '';
          console.log('[SubmitOrder API] Sending payload:', JSON.stringify(requestBody));
          _context6.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(orderApi.submit, requestBody, {}, {}, false);
        case 1:
          res = _context6.v;
          return _context6.a(2, res);
      }
    }, _callee6);
  }));
  return _submitOrder.apply(this, arguments);
}
function fetchOrderList() {
  return _fetchOrderList.apply(this, arguments);
}

/**
 * 获取订单详情
 * GET /api/v1/orders/{id}
 */
function _fetchOrderList() {
  _fetchOrderList = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee7() {
    var _ref453, _res$data$list2, _res$data3, _res$data4;
    var params,
      res,
      list,
      _args7 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
          _context7.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(orderApi.list, params);
        case 1:
          res = _context7.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (_ref453 = (_res$data$list2 = res === null || res === void 0 || (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.list) !== null && _res$data$list2 !== void 0 ? _res$data$list2 : res === null || res === void 0 || (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.items) !== null && _ref453 !== void 0 ? _ref453 : [];
          return _context7.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: list.map(transformOrderItem)
          }));
      }
    }, _callee7);
  }));
  return _fetchOrderList.apply(this, arguments);
}
function fetchOrderDetail(_x7) {
  return _fetchOrderDetail.apply(this, arguments);
}

/**
 * 取消订单
 * PUT /api/v1/orders/{id}/cancel
 */
function _fetchOrderDetail() {
  _fetchOrderDetail = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee8(id) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(orderApi.detail, {}, {
            id: id
          });
        case 1:
          res = _context8.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context8.n = 2;
            break;
          }
          return _context8.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: transformOrderItem(res.data)
          }));
        case 2:
          return _context8.a(2, res);
      }
    }, _callee8);
  }));
  return _fetchOrderDetail.apply(this, arguments);
}
function cancelOrder(_x8) {
  return _cancelOrder.apply(this, arguments);
}

/**
 * 发起支付
 * POST /api/v1/orders/{id}/pay
 * payload 支持：paymentMethod(wechat/alipay) 等参数
 */
function _cancelOrder() {
  _cancelOrder = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee9(id) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPut)(orderApi.cancel, {}, {
            id: id
          });
        case 1:
          res = _context9.v;
          return _context9.a(2, res);
      }
    }, _callee9);
  }));
  return _cancelOrder.apply(this, arguments);
}
function payOrder(_x9, _x0) {
  return _payOrder.apply(this, arguments);
}

/**
 * 支付回调（模拟微信异步通知）
 * POST /api/v1/payment/callback
 * payload 支持：orderId、orderNo、transactionId、paymentMethod、amount 等
 */
function _payOrder() {
  _payOrder = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee0(id, payload) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(orderApi.pay, payload || {}, {
            id: id
          }, {}, false);
        case 1:
          res = _context0.v;
          return _context0.a(2, res);
      }
    }, _callee0);
  }));
  return _payOrder.apply(this, arguments);
}
function paymentCallback(_x1) {
  return _paymentCallback.apply(this, arguments);
}

/**
 * 规范化订单支付状态：兼容 snake_case / PascalCase / camelCase 字段名
 */
function _paymentCallback() {
  _paymentCallback = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee1(payload) {
    var body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          body = {
            orderId: payload.orderId
          };
          if (payload.orderNo !== undefined) body.orderNo = payload.orderNo;
          if (payload.transactionId !== undefined) body.transactionId = payload.transactionId;
          if (payload.paymentMethod !== undefined) body.paymentMethod = payload.paymentMethod;
          if (payload.amount !== undefined) body.amount = payload.amount;
          _context1.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(paymentApi.callback, body, {}, {}, false);
        case 1:
          res = _context1.v;
          return _context1.a(2, res);
      }
    }, _callee1);
  }));
  return _paymentCallback.apply(this, arguments);
}
function normalizePaymentStatus(raw) {
  var _ref193, _ref194, _ref195, _ref196, _raw$status2, _ref197, _ref198, _ref199, _raw$orderId, _ref200, _ref201, _raw$orderNo, _ref202, _ref203, _ref204, _ref205, _raw$paymentMethod, _ref206, _ref207, _ref208, _raw$transactionId, _ref209, _ref210, _ref211, _ref212, _raw$amount, _ref213, _ref214, _ref215, _ref216, _ref217, _raw$paidAt, _ref218, _ref219, _raw$message;
  var status = (_ref193 = (_ref194 = (_ref195 = (_ref196 = (_raw$status2 = raw.status) !== null && _raw$status2 !== void 0 ? _raw$status2 : raw.Status) !== null && _ref196 !== void 0 ? _ref196 : raw.payStatus) !== null && _ref195 !== void 0 ? _ref195 : raw.pay_status) !== null && _ref194 !== void 0 ? _ref194 : raw.paymentStatus) !== null && _ref193 !== void 0 ? _ref193 : '';
  var isPaid = status === 'paid' || status === 'success' || status === 'SUCCESS' || status === 1 || status === '1' || raw.isPaid === true || raw.IsPaid === true || raw.is_paid === true;
  return {
    orderId: (_ref197 = (_ref198 = (_ref199 = (_raw$orderId = raw.orderId) !== null && _raw$orderId !== void 0 ? _raw$orderId : raw.order_id) !== null && _ref199 !== void 0 ? _ref199 : raw.OrderId) !== null && _ref198 !== void 0 ? _ref198 : raw.OrderID) !== null && _ref197 !== void 0 ? _ref197 : '',
    orderNo: (_ref200 = (_ref201 = (_raw$orderNo = raw.orderNo) !== null && _raw$orderNo !== void 0 ? _raw$orderNo : raw.order_no) !== null && _ref201 !== void 0 ? _ref201 : raw.OrderNo) !== null && _ref200 !== void 0 ? _ref200 : '',
    status: status,
    isPaid: isPaid,
    paymentMethod: (_ref202 = (_ref203 = (_ref204 = (_ref205 = (_raw$paymentMethod = raw.paymentMethod) !== null && _raw$paymentMethod !== void 0 ? _raw$paymentMethod : raw.payment_method) !== null && _ref205 !== void 0 ? _ref205 : raw.PaymentMethod) !== null && _ref204 !== void 0 ? _ref204 : raw.payType) !== null && _ref203 !== void 0 ? _ref203 : raw.pay_type) !== null && _ref202 !== void 0 ? _ref202 : '',
    transactionId: (_ref206 = (_ref207 = (_ref208 = (_raw$transactionId = raw.transactionId) !== null && _raw$transactionId !== void 0 ? _raw$transactionId : raw.transaction_id) !== null && _ref208 !== void 0 ? _ref208 : raw.TransactionId) !== null && _ref207 !== void 0 ? _ref207 : raw.TransactionID) !== null && _ref206 !== void 0 ? _ref206 : '',
    amount: Number((_ref209 = (_ref210 = (_ref211 = (_ref212 = (_raw$amount = raw.amount) !== null && _raw$amount !== void 0 ? _raw$amount : raw.Amount) !== null && _ref212 !== void 0 ? _ref212 : raw.payAmount) !== null && _ref211 !== void 0 ? _ref211 : raw.pay_amount) !== null && _ref210 !== void 0 ? _ref210 : raw.PayAmount) !== null && _ref209 !== void 0 ? _ref209 : 0),
    paidAt: (_ref213 = (_ref214 = (_ref215 = (_ref216 = (_ref217 = (_raw$paidAt = raw.paidAt) !== null && _raw$paidAt !== void 0 ? _raw$paidAt : raw.paid_at) !== null && _ref217 !== void 0 ? _ref217 : raw.PaidAt) !== null && _ref216 !== void 0 ? _ref216 : raw.payTime) !== null && _ref215 !== void 0 ? _ref215 : raw.pay_time) !== null && _ref214 !== void 0 ? _ref214 : raw.PayTime) !== null && _ref213 !== void 0 ? _ref213 : '',
    message: (_ref218 = (_ref219 = (_raw$message = raw.message) !== null && _raw$message !== void 0 ? _raw$message : raw.Message) !== null && _ref219 !== void 0 ? _ref219 : raw.msg) !== null && _ref218 !== void 0 ? _ref218 : ''
  };
}

/**
 * 查询订单支付状态
 * GET /api/v1/orders/{id}/payment
 */
function fetchOrderPaymentStatus(_x10) {
  return _fetchOrderPaymentStatus.apply(this, arguments);
}

/**
 * 确认取货/确认收货（待自提→已完成）
 * PUT /api/v1/orders/{id}/confirm
 */
function _fetchOrderPaymentStatus() {
  _fetchOrderPaymentStatus = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee10(id) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          _context10.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(orderApi.paymentStatus, {}, {
            id: id
          });
        case 1:
          res = _context10.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context10.n = 2;
            break;
          }
          return _context10.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: normalizePaymentStatus(res.data)
          }));
        case 2:
          return _context10.a(2, res);
      }
    }, _callee10);
  }));
  return _fetchOrderPaymentStatus.apply(this, arguments);
}
function confirmOrder(_x11) {
  return _confirmOrder.apply(this, arguments);
}

/**
 * 确认发货/备货完成（待发货→待自提）
 * POST /api/v1/orders/{id}/pickup
 */
function _confirmOrder() {
  _confirmOrder = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee11(id) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          _context11.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPut)(orderApi.confirm, {}, {
            id: id
          });
        case 1:
          res = _context11.v;
          return _context11.a(2, res);
      }
    }, _callee11);
  }));
  return _confirmOrder.apply(this, arguments);
}
function confirmPickupOrder(_x12) {
  return _confirmPickupOrder.apply(this, arguments);
}

/**
 * 申请退款
 * POST /api/v1/orders/{id}/refund
 */
function _confirmPickupOrder() {
  _confirmPickupOrder = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee12(id) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context12) {
      while (1) switch (_context12.n) {
        case 0:
          _context12.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(orderApi.confirmPickup, {}, {
            id: id
          }, {}, false);
        case 1:
          res = _context12.v;
          return _context12.a(2, res);
      }
    }, _callee12);
  }));
  return _confirmPickupOrder.apply(this, arguments);
}
function refundOrder(_x13, _x14) {
  return _refundOrder.apply(this, arguments);
}

// ==================== 订单评价 API ====================

/**
 * 评价数据规范化：兼容 snake_case / PascalCase / camelCase
 */
function _refundOrder() {
  _refundOrder = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee13(id, payload) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          _context13.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(orderApi.refund, payload || {}, {
            id: id
          }, {}, false);
        case 1:
          res = _context13.v;
          return _context13.a(2, res);
      }
    }, _callee13);
  }));
  return _refundOrder.apply(this, arguments);
}
function normalizeReview(raw) {
  var _ref220, _ref221, _ref222, _ref223, _raw$id, _ref224, _ref225, _ref226, _raw$orderId2, _ref227, _ref228, _ref229, _raw$productId, _ref230, _ref231, _ref232, _raw$productName3, _ref233, _ref234, _ref235, _raw$skuId, _ref236, _ref237, _ref238, _raw$skuName3, _ref239, _ref240, _ref241, _raw$rating, _ref242, _ref243, _raw$ratingType, _ref244, _ref245, _ref246, _ref247, _ref248, _raw$content, _ref249, _ref250, _ref251, _raw$anonymous, _ref252, _ref253, _ref254, _raw$createdAt2, _ref255, _ref256, _raw$userId, _ref257, _ref258, _ref259, _ref260, _raw$userName, _ref261, _ref262, _ref263, _ref264, _raw$userAvatar, _ref265, _ref266, _ref267, _raw$reply, _ref268, _ref269, _raw$replyAt;
  return {
    id: (_ref220 = (_ref221 = (_ref222 = (_ref223 = (_raw$id = raw.id) !== null && _raw$id !== void 0 ? _raw$id : raw.Id) !== null && _ref223 !== void 0 ? _ref223 : raw.reviewId) !== null && _ref222 !== void 0 ? _ref222 : raw.review_id) !== null && _ref221 !== void 0 ? _ref221 : raw.ID) !== null && _ref220 !== void 0 ? _ref220 : '',
    orderId: (_ref224 = (_ref225 = (_ref226 = (_raw$orderId2 = raw.orderId) !== null && _raw$orderId2 !== void 0 ? _raw$orderId2 : raw.order_id) !== null && _ref226 !== void 0 ? _ref226 : raw.OrderId) !== null && _ref225 !== void 0 ? _ref225 : raw.OrderID) !== null && _ref224 !== void 0 ? _ref224 : '',
    productId: (_ref227 = (_ref228 = (_ref229 = (_raw$productId = raw.productId) !== null && _raw$productId !== void 0 ? _raw$productId : raw.product_id) !== null && _ref229 !== void 0 ? _ref229 : raw.ProductId) !== null && _ref228 !== void 0 ? _ref228 : raw.ProductID) !== null && _ref227 !== void 0 ? _ref227 : '',
    productName: (_ref230 = (_ref231 = (_ref232 = (_raw$productName3 = raw.productName) !== null && _raw$productName3 !== void 0 ? _raw$productName3 : raw.product_name) !== null && _ref232 !== void 0 ? _ref232 : raw.ProductName) !== null && _ref231 !== void 0 ? _ref231 : raw.name) !== null && _ref230 !== void 0 ? _ref230 : '',
    skuId: (_ref233 = (_ref234 = (_ref235 = (_raw$skuId = raw.skuId) !== null && _raw$skuId !== void 0 ? _raw$skuId : raw.sku_id) !== null && _ref235 !== void 0 ? _ref235 : raw.SkuId) !== null && _ref234 !== void 0 ? _ref234 : raw.SkuID) !== null && _ref233 !== void 0 ? _ref233 : '',
    skuName: (_ref236 = (_ref237 = (_ref238 = (_raw$skuName3 = raw.skuName) !== null && _raw$skuName3 !== void 0 ? _raw$skuName3 : raw.sku_name) !== null && _ref238 !== void 0 ? _ref238 : raw.SkuName) !== null && _ref237 !== void 0 ? _ref237 : raw.specName) !== null && _ref236 !== void 0 ? _ref236 : '',
    rating: Number((_ref239 = (_ref240 = (_ref241 = (_raw$rating = raw.rating) !== null && _raw$rating !== void 0 ? _raw$rating : raw.Rating) !== null && _ref241 !== void 0 ? _ref241 : raw.score) !== null && _ref240 !== void 0 ? _ref240 : raw.Score) !== null && _ref239 !== void 0 ? _ref239 : 5),
    ratingType: (_ref242 = (_ref243 = (_raw$ratingType = raw.ratingType) !== null && _raw$ratingType !== void 0 ? _raw$ratingType : raw.rating_type) !== null && _ref243 !== void 0 ? _ref243 : raw.RatingType) !== null && _ref242 !== void 0 ? _ref242 : raw.rating >= 4 ? 'good' : raw.rating <= 2 ? 'bad' : 'neutral',
    content: (_ref244 = (_ref245 = (_ref246 = (_ref247 = (_ref248 = (_raw$content = raw.content) !== null && _raw$content !== void 0 ? _raw$content : raw.Content) !== null && _ref248 !== void 0 ? _ref248 : raw.reviewContent) !== null && _ref247 !== void 0 ? _ref247 : raw.review_content) !== null && _ref246 !== void 0 ? _ref246 : raw.comment) !== null && _ref245 !== void 0 ? _ref245 : raw.Comment) !== null && _ref244 !== void 0 ? _ref244 : '',
    images: Array.isArray(raw.images) ? raw.images : Array.isArray(raw.Images) ? raw.Images : Array.isArray(raw.pics) ? raw.pics : Array.isArray(raw.imageList) ? raw.imageList : [],
    anonymous: (_ref249 = (_ref250 = (_ref251 = (_raw$anonymous = raw.anonymous) !== null && _raw$anonymous !== void 0 ? _raw$anonymous : raw.Anonymous) !== null && _ref251 !== void 0 ? _ref251 : raw.isAnonymous) !== null && _ref250 !== void 0 ? _ref250 : raw.is_anonymous) !== null && _ref249 !== void 0 ? _ref249 : false,
    createdAt: (_ref252 = (_ref253 = (_ref254 = (_raw$createdAt2 = raw.createdAt) !== null && _raw$createdAt2 !== void 0 ? _raw$createdAt2 : raw.created_at) !== null && _ref254 !== void 0 ? _ref254 : raw.CreateTime) !== null && _ref253 !== void 0 ? _ref253 : raw.createTime) !== null && _ref252 !== void 0 ? _ref252 : '',
    userId: (_ref255 = (_ref256 = (_raw$userId = raw.userId) !== null && _raw$userId !== void 0 ? _raw$userId : raw.user_id) !== null && _ref256 !== void 0 ? _ref256 : raw.UserId) !== null && _ref255 !== void 0 ? _ref255 : '',
    userName: (_ref257 = (_ref258 = (_ref259 = (_ref260 = (_raw$userName = raw.userName) !== null && _raw$userName !== void 0 ? _raw$userName : raw.user_name) !== null && _ref260 !== void 0 ? _ref260 : raw.UserName) !== null && _ref259 !== void 0 ? _ref259 : raw.nickname) !== null && _ref258 !== void 0 ? _ref258 : raw.NickName) !== null && _ref257 !== void 0 ? _ref257 : '',
    userAvatar: (_ref261 = (_ref262 = (_ref263 = (_ref264 = (_raw$userAvatar = raw.userAvatar) !== null && _raw$userAvatar !== void 0 ? _raw$userAvatar : raw.user_avatar) !== null && _ref264 !== void 0 ? _ref264 : raw.UserAvatar) !== null && _ref263 !== void 0 ? _ref263 : raw.avatar) !== null && _ref262 !== void 0 ? _ref262 : raw.Avatar) !== null && _ref261 !== void 0 ? _ref261 : '',
    reply: (_ref265 = (_ref266 = (_ref267 = (_raw$reply = raw.reply) !== null && _raw$reply !== void 0 ? _raw$reply : raw.Reply) !== null && _ref267 !== void 0 ? _ref267 : raw.replyContent) !== null && _ref266 !== void 0 ? _ref266 : raw.reply_content) !== null && _ref265 !== void 0 ? _ref265 : '',
    replyAt: (_ref268 = (_ref269 = (_raw$replyAt = raw.replyAt) !== null && _raw$replyAt !== void 0 ? _raw$replyAt : raw.reply_at) !== null && _ref269 !== void 0 ? _ref269 : raw.ReplyAt) !== null && _ref268 !== void 0 ? _ref268 : ''
  };
}

/**
 * 提交订单评价
 * POST /api/v1/orders/{id}/review
 * payload 支持：rating(1-5)、content(评价内容)、images(图片URL数组)、anonymous(是否匿名)、items(多商品评价)
 */
function submitOrderReview(_x15, _x16) {
  return _submitOrderReview.apply(this, arguments);
}

/**
 * 获取订单评价列表
 * GET /api/v1/orders/{id}/reviews
 * 注意：该接口在后端未实现时返回 404，此处静默处理为空评价列表，
 *      避免订单列表页兜底查询评价时在控制台刷屏报错。
 */
function _submitOrderReview() {
  _submitOrderReview = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee14(id, payload) {
    var body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          body = {};
          if (payload.rating !== undefined) body.rating = payload.rating;
          if (payload.ratingType !== undefined) body.ratingType = payload.ratingType;
          if (payload.content !== undefined) body.content = payload.content;
          if (Array.isArray(payload.images)) body.images = payload.images;
          if (payload.anonymous !== undefined) body.anonymous = payload.anonymous;
          if (Array.isArray(payload.items)) {
            body.items = payload.items.map(function (item) {
              return {
                productId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(item.productId),
                skuId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(item.skuId),
                rating: item.rating,
                content: item.content,
                images: Array.isArray(item.images) ? item.images : []
              };
            });
          }
          _context14.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(orderApi.review, body, {
            id: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(id)
          }, {}, false);
        case 1:
          res = _context14.v;
          return _context14.a(2, res);
      }
    }, _callee14);
  }));
  return _submitOrderReview.apply(this, arguments);
}
function fetchOrderReviews(_x17) {
  return _fetchOrderReviews.apply(this, arguments);
}

// ==================== 退款 API ====================

/**
 * 退货原因数据规范化：兼容 snake_case / PascalCase / camelCase
 */
function _fetchOrderReviews() {
  _fetchOrderReviews = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee15(id) {
    var _ref454, _res$data$list3, _res$data5, _res$data6, res, list, _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          _context15.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(orderApi.reviewList, {}, {
            id: id
          }, true);
        case 1:
          res = _context15.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (_ref454 = (_res$data$list3 = res === null || res === void 0 || (_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : _res$data5.list) !== null && _res$data$list3 !== void 0 ? _res$data$list3 : res === null || res === void 0 || (_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.items) !== null && _ref454 !== void 0 ? _ref454 : [];
          return _context15.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: list.map(normalizeReview)
          }));
        case 2:
          _context15.p = 2;
          _t = _context15.v;
          return _context15.a(2, {
            code: 200,
            data: []
          });
      }
    }, _callee15, null, [[0, 2]]);
  }));
  return _fetchOrderReviews.apply(this, arguments);
}
function normalizeRefundReason(raw) {
  var _ref270, _ref271, _ref272, _ref273, _ref274, _raw$id2, _ref275, _ref276, _ref277, _ref278, _ref279, _ref280, _ref281, _ref282, _ref283, _raw$name, _ref284, _ref285, _ref286, _ref287, _ref288, _raw$sort, _ref289, _ref290, _ref291, _ref292, _ref293, _raw$enabled, _ref294, _ref295, _ref296, _ref297, _ref298, _raw$description;
  return {
    id: (_ref270 = (_ref271 = (_ref272 = (_ref273 = (_ref274 = (_raw$id2 = raw.id) !== null && _raw$id2 !== void 0 ? _raw$id2 : raw.Id) !== null && _ref274 !== void 0 ? _ref274 : raw.reasonId) !== null && _ref273 !== void 0 ? _ref273 : raw.reason_id) !== null && _ref272 !== void 0 ? _ref272 : raw.ID) !== null && _ref271 !== void 0 ? _ref271 : raw.code) !== null && _ref270 !== void 0 ? _ref270 : '',
    name: (_ref275 = (_ref276 = (_ref277 = (_ref278 = (_ref279 = (_ref280 = (_ref281 = (_ref282 = (_ref283 = (_raw$name = raw.name) !== null && _raw$name !== void 0 ? _raw$name : raw.Name) !== null && _ref283 !== void 0 ? _ref283 : raw.reasonName) !== null && _ref282 !== void 0 ? _ref282 : raw.reason_name) !== null && _ref281 !== void 0 ? _ref281 : raw.title) !== null && _ref280 !== void 0 ? _ref280 : raw.Title) !== null && _ref279 !== void 0 ? _ref279 : raw.label) !== null && _ref278 !== void 0 ? _ref278 : raw.Label) !== null && _ref277 !== void 0 ? _ref277 : raw.content) !== null && _ref276 !== void 0 ? _ref276 : raw.Content) !== null && _ref275 !== void 0 ? _ref275 : '',
    sort: Number((_ref284 = (_ref285 = (_ref286 = (_ref287 = (_ref288 = (_raw$sort = raw.sort) !== null && _raw$sort !== void 0 ? _raw$sort : raw.Sort) !== null && _ref288 !== void 0 ? _ref288 : raw.order) !== null && _ref287 !== void 0 ? _ref287 : raw.Order) !== null && _ref286 !== void 0 ? _ref286 : raw.seq) !== null && _ref285 !== void 0 ? _ref285 : raw.Seq) !== null && _ref284 !== void 0 ? _ref284 : 0),
    enabled: (_ref289 = (_ref290 = (_ref291 = (_ref292 = (_ref293 = (_raw$enabled = raw.enabled) !== null && _raw$enabled !== void 0 ? _raw$enabled : raw.Enabled) !== null && _ref293 !== void 0 ? _ref293 : raw.status) !== null && _ref292 !== void 0 ? _ref292 : raw.Status) !== null && _ref291 !== void 0 ? _ref291 : raw.active) !== null && _ref290 !== void 0 ? _ref290 : raw.Active) !== null && _ref289 !== void 0 ? _ref289 : true,
    description: (_ref294 = (_ref295 = (_ref296 = (_ref297 = (_ref298 = (_raw$description = raw.description) !== null && _raw$description !== void 0 ? _raw$description : raw.Description) !== null && _ref298 !== void 0 ? _ref298 : raw.desc) !== null && _ref297 !== void 0 ? _ref297 : raw.Desc) !== null && _ref296 !== void 0 ? _ref296 : raw.remark) !== null && _ref295 !== void 0 ? _ref295 : raw.Remark) !== null && _ref294 !== void 0 ? _ref294 : ''
  };
}

/**
 * 退款数据规范化：兼容 snake_case / PascalCase / camelCase
 */
function normalizeRefund(raw) {
  var _ref299, _ref300, _raw$status3, _ref301, _ref302, _ref303, _ref304, _raw$type, _ref305, _ref306, _ref307, _ref308, _raw$id3, _ref309, _ref310, _ref311, _ref312, _ref313, _ref314, _ref315, _raw$refundNo, _ref316, _ref317, _ref318, _ref319, _ref320, _ref321, _raw$orderId3, _ref322, _ref323, _ref324, _raw$orderNo2, _ref325, _ref326, _ref327, _raw$userId2, _ref328, _ref329, _ref330, _typeTextMap, _ref331, _ref332, _ref333, _ref334, _raw$statusText, _ref335, _ref336, _ref337, _raw$reason, _ref338, _ref339, _ref340, _raw$reasonId, _ref341, _ref342, _ref343, _ref344, _ref345, _ref346, _raw$amount2, _ref347, _ref348, _ref349, _ref350, _ref351, _raw$payAmount2, _ref352, _ref353, _raw$freightAmount2, _ref354, _ref355, _raw$couponAmount2, _ref356, _ref357, _ref358, _ref359, _ref360, _raw$quantity3, _ref361, _ref362, _ref363, _ref364, _ref365, _raw$description2, _ref366, _ref367, _ref368, _ref369, _ref370, _ref371, _ref372, _ref373, _raw$applyTime, _ref374, _ref375, _ref376, _ref377, _ref378, _raw$auditTime, _ref379, _ref380, _ref381, _ref382, _ref383, _raw$auditRemark, _ref384, _ref385, _ref386, _ref387, _ref388, _raw$refundTime, _ref389, _ref390, _ref391, _ref392, _ref393, _ref394, _ref395, _ref396, _raw$trackingNo, _ref397, _ref398, _ref399, _ref400, _ref401, _ref402, _ref403, _ref404, _raw$trackingCompany, _ref405, _ref406, _ref407, _ref408, _raw$receiverName, _ref409, _ref410, _ref411, _ref412, _ref413, _ref414, _raw$receiverPhone, _ref415, _ref416, _ref417, _ref418, _raw$receiverAddress;
  var rawStatus = (_ref299 = (_ref300 = (_raw$status3 = raw.status) !== null && _raw$status3 !== void 0 ? _raw$status3 : raw.Status) !== null && _ref300 !== void 0 ? _ref300 : raw.refundStatus) !== null && _ref299 !== void 0 ? _ref299 : raw.refund_status;
  var statusTextMap = {
    'pending': '待审核',
    'approved': '已通过',
    'rejected': '已拒绝',
    'completed': '已完成'
  };
  var typeTextMap = {
    'refund_only': '仅退款',
    'return_refund': '退货退款',
    'only_refund': '仅退款',
    'return_and_refund': '退货退款'
  };
  var status = rawStatus;
  var statusCode = null;
  if (typeof rawStatus === 'number') {
    statusCode = rawStatus;
    var numericMap = {
      0: 'pending',
      1: 'approved',
      2: 'rejected',
      3: 'completed'
    };
    status = numericMap[rawStatus] || 'pending';
  }
  var rawType = (_ref301 = (_ref302 = (_ref303 = (_ref304 = (_raw$type = raw.type) !== null && _raw$type !== void 0 ? _raw$type : raw.Type) !== null && _ref304 !== void 0 ? _ref304 : raw.refundType) !== null && _ref303 !== void 0 ? _ref303 : raw.refund_type) !== null && _ref302 !== void 0 ? _ref302 : raw.applyType) !== null && _ref301 !== void 0 ? _ref301 : raw.apply_type;
  var type = rawType;
  if (typeof rawType === 'number') {
    var typeNumericMap = {
      1: 'refund_only',
      2: 'return_refund'
    };
    type = typeNumericMap[rawType] || 'refund_only';
  }
  var itemKeys = ['items', 'Items', 'refundItems', 'RefundItems', 'goodsList', 'GoodsList', 'orderItems', 'OrderItems', 'products', 'Products', 'goods', 'Goods', 'list', 'List', 'records', 'Records', 'data', 'Data'];
  var rawItems = itemKeys.map(function (k) {
    return raw[k];
  }).find(Array.isArray) || [];
  var items = rawItems.map(transformCartItem).map(function (item, index) {
    // 如果 transformCartItem 没有解析出商品关键信息，尝试从原始元素兜底提取
    if ((item.productName || item.image) && item.quantity) return item;
    var fallback = extractFallbackProduct(rawItems[index]);
    return fallback ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
      id: item.id || ''
    }, fallback) : item;
  });

  // 兜底：后端未返回商品项时，从退款记录自身的商品字段构建一条商品信息
  if (!items || items.length === 0) {
    var fallback = extractFallbackProduct(raw);
    if (fallback) {
      items = [fallback];
    }
  }
  return {
    id: (_ref305 = (_ref306 = (_ref307 = (_ref308 = (_raw$id3 = raw.id) !== null && _raw$id3 !== void 0 ? _raw$id3 : raw.Id) !== null && _ref308 !== void 0 ? _ref308 : raw.refundId) !== null && _ref307 !== void 0 ? _ref307 : raw.refund_id) !== null && _ref306 !== void 0 ? _ref306 : raw.ID) !== null && _ref305 !== void 0 ? _ref305 : '',
    refundNo: (_ref309 = (_ref310 = (_ref311 = (_ref312 = (_ref313 = (_ref314 = (_ref315 = (_raw$refundNo = raw.refundNo) !== null && _raw$refundNo !== void 0 ? _raw$refundNo : raw.refund_no) !== null && _ref315 !== void 0 ? _ref315 : raw.RefundNo) !== null && _ref314 !== void 0 ? _ref314 : raw.RefundNO) !== null && _ref313 !== void 0 ? _ref313 : raw.sn) !== null && _ref312 !== void 0 ? _ref312 : raw.SN) !== null && _ref311 !== void 0 ? _ref311 : raw.code) !== null && _ref310 !== void 0 ? _ref310 : raw.Code) !== null && _ref309 !== void 0 ? _ref309 : '',
    orderId: (_ref316 = (_ref317 = (_ref318 = (_ref319 = (_ref320 = (_ref321 = (_raw$orderId3 = raw.orderId) !== null && _raw$orderId3 !== void 0 ? _raw$orderId3 : raw.order_id) !== null && _ref321 !== void 0 ? _ref321 : raw.OrderId) !== null && _ref320 !== void 0 ? _ref320 : raw.OrderID) !== null && _ref319 !== void 0 ? _ref319 : raw.orderNo) !== null && _ref318 !== void 0 ? _ref318 : raw.order_no) !== null && _ref317 !== void 0 ? _ref317 : raw.OrderNo) !== null && _ref316 !== void 0 ? _ref316 : '',
    orderNo: (_ref322 = (_ref323 = (_ref324 = (_raw$orderNo2 = raw.orderNo) !== null && _raw$orderNo2 !== void 0 ? _raw$orderNo2 : raw.order_no) !== null && _ref324 !== void 0 ? _ref324 : raw.OrderNo) !== null && _ref323 !== void 0 ? _ref323 : raw.OrderNO) !== null && _ref322 !== void 0 ? _ref322 : '',
    userId: (_ref325 = (_ref326 = (_ref327 = (_raw$userId2 = raw.userId) !== null && _raw$userId2 !== void 0 ? _raw$userId2 : raw.user_id) !== null && _ref327 !== void 0 ? _ref327 : raw.UserId) !== null && _ref326 !== void 0 ? _ref326 : raw.UserID) !== null && _ref325 !== void 0 ? _ref325 : '',
    type: type,
    typeText: (_ref328 = (_ref329 = (_ref330 = (_typeTextMap = typeTextMap[type]) !== null && _typeTextMap !== void 0 ? _typeTextMap : raw.typeText) !== null && _ref330 !== void 0 ? _ref330 : raw.type_text) !== null && _ref329 !== void 0 ? _ref329 : raw.TypeText) !== null && _ref328 !== void 0 ? _ref328 : type === 'return_refund' ? '退货退款' : '仅退款',
    status: status,
    statusCode: statusCode,
    statusText: (_ref331 = (_ref332 = (_ref333 = (_ref334 = (_raw$statusText = raw.statusText) !== null && _raw$statusText !== void 0 ? _raw$statusText : raw.status_text) !== null && _ref334 !== void 0 ? _ref334 : raw.StatusText) !== null && _ref333 !== void 0 ? _ref333 : statusTextMap[status]) !== null && _ref332 !== void 0 ? _ref332 : status) !== null && _ref331 !== void 0 ? _ref331 : '',
    reason: (_ref335 = (_ref336 = (_ref337 = (_raw$reason = raw.reason) !== null && _raw$reason !== void 0 ? _raw$reason : raw.Reason) !== null && _ref337 !== void 0 ? _ref337 : raw.refundReason) !== null && _ref336 !== void 0 ? _ref336 : raw.refund_reason) !== null && _ref335 !== void 0 ? _ref335 : '',
    reasonId: (_ref338 = (_ref339 = (_ref340 = (_raw$reasonId = raw.reasonId) !== null && _raw$reasonId !== void 0 ? _raw$reasonId : raw.reason_id) !== null && _ref340 !== void 0 ? _ref340 : raw.ReasonId) !== null && _ref339 !== void 0 ? _ref339 : raw.ReasonID) !== null && _ref338 !== void 0 ? _ref338 : '',
    amount: Number((_ref341 = (_ref342 = (_ref343 = (_ref344 = (_ref345 = (_ref346 = (_raw$amount2 = raw.amount) !== null && _raw$amount2 !== void 0 ? _raw$amount2 : raw.Amount) !== null && _ref346 !== void 0 ? _ref346 : raw.refundAmount) !== null && _ref345 !== void 0 ? _ref345 : raw.refund_amount) !== null && _ref344 !== void 0 ? _ref344 : raw.totalAmount) !== null && _ref343 !== void 0 ? _ref343 : raw.total_amount) !== null && _ref342 !== void 0 ? _ref342 : raw.TotalAmount) !== null && _ref341 !== void 0 ? _ref341 : 0),
    payAmount: Number((_ref347 = (_ref348 = (_ref349 = (_ref350 = (_ref351 = (_raw$payAmount2 = raw.payAmount) !== null && _raw$payAmount2 !== void 0 ? _raw$payAmount2 : raw.pay_amount) !== null && _ref351 !== void 0 ? _ref351 : raw.PayAmount) !== null && _ref350 !== void 0 ? _ref350 : raw.orderAmount) !== null && _ref349 !== void 0 ? _ref349 : raw.order_amount) !== null && _ref348 !== void 0 ? _ref348 : raw.OrderAmount) !== null && _ref347 !== void 0 ? _ref347 : 0),
    freightAmount: Number((_ref352 = (_ref353 = (_raw$freightAmount2 = raw.freightAmount) !== null && _raw$freightAmount2 !== void 0 ? _raw$freightAmount2 : raw.freight_amount) !== null && _ref353 !== void 0 ? _ref353 : raw.FreightAmount) !== null && _ref352 !== void 0 ? _ref352 : 0),
    couponAmount: Number((_ref354 = (_ref355 = (_raw$couponAmount2 = raw.couponAmount) !== null && _raw$couponAmount2 !== void 0 ? _raw$couponAmount2 : raw.coupon_amount) !== null && _ref355 !== void 0 ? _ref355 : raw.CouponAmount) !== null && _ref354 !== void 0 ? _ref354 : 0),
    quantity: Number((_ref356 = (_ref357 = (_ref358 = (_ref359 = (_ref360 = (_raw$quantity3 = raw.quantity) !== null && _raw$quantity3 !== void 0 ? _raw$quantity3 : raw.Quantity) !== null && _ref360 !== void 0 ? _ref360 : raw.count) !== null && _ref359 !== void 0 ? _ref359 : raw.Count) !== null && _ref358 !== void 0 ? _ref358 : raw.num) !== null && _ref357 !== void 0 ? _ref357 : raw.Num) !== null && _ref356 !== void 0 ? _ref356 : 0),
    description: (_ref361 = (_ref362 = (_ref363 = (_ref364 = (_ref365 = (_raw$description2 = raw.description) !== null && _raw$description2 !== void 0 ? _raw$description2 : raw.Description) !== null && _ref365 !== void 0 ? _ref365 : raw.remark) !== null && _ref364 !== void 0 ? _ref364 : raw.Remark) !== null && _ref363 !== void 0 ? _ref363 : raw.desc) !== null && _ref362 !== void 0 ? _ref362 : raw.Desc) !== null && _ref361 !== void 0 ? _ref361 : '',
    images: Array.isArray(raw.images) ? raw.images : Array.isArray(raw.Images) ? raw.Images : Array.isArray(raw.pics) ? raw.pics : Array.isArray(raw.vouchers) ? raw.vouchers : Array.isArray(raw.imageList) ? raw.imageList : [],
    items: items,
    applyTime: (_ref366 = (_ref367 = (_ref368 = (_ref369 = (_ref370 = (_ref371 = (_ref372 = (_ref373 = (_raw$applyTime = raw.applyTime) !== null && _raw$applyTime !== void 0 ? _raw$applyTime : raw.apply_time) !== null && _ref373 !== void 0 ? _ref373 : raw.ApplyTime) !== null && _ref372 !== void 0 ? _ref372 : raw.createTime) !== null && _ref371 !== void 0 ? _ref371 : raw.create_time) !== null && _ref370 !== void 0 ? _ref370 : raw.CreateTime) !== null && _ref369 !== void 0 ? _ref369 : raw.createdAt) !== null && _ref368 !== void 0 ? _ref368 : raw.created_at) !== null && _ref367 !== void 0 ? _ref367 : raw.CreatedAt) !== null && _ref366 !== void 0 ? _ref366 : '',
    auditTime: (_ref374 = (_ref375 = (_ref376 = (_ref377 = (_ref378 = (_raw$auditTime = raw.auditTime) !== null && _raw$auditTime !== void 0 ? _raw$auditTime : raw.audit_time) !== null && _ref378 !== void 0 ? _ref378 : raw.AuditTime) !== null && _ref377 !== void 0 ? _ref377 : raw.reviewTime) !== null && _ref376 !== void 0 ? _ref376 : raw.review_time) !== null && _ref375 !== void 0 ? _ref375 : raw.ReviewTime) !== null && _ref374 !== void 0 ? _ref374 : '',
    auditRemark: (_ref379 = (_ref380 = (_ref381 = (_ref382 = (_ref383 = (_raw$auditRemark = raw.auditRemark) !== null && _raw$auditRemark !== void 0 ? _raw$auditRemark : raw.audit_remark) !== null && _ref383 !== void 0 ? _ref383 : raw.AuditRemark) !== null && _ref382 !== void 0 ? _ref382 : raw.rejectReason) !== null && _ref381 !== void 0 ? _ref381 : raw.reject_reason) !== null && _ref380 !== void 0 ? _ref380 : raw.RejectReason) !== null && _ref379 !== void 0 ? _ref379 : '',
    refundTime: (_ref384 = (_ref385 = (_ref386 = (_ref387 = (_ref388 = (_raw$refundTime = raw.refundTime) !== null && _raw$refundTime !== void 0 ? _raw$refundTime : raw.refund_time) !== null && _ref388 !== void 0 ? _ref388 : raw.RefundTime) !== null && _ref387 !== void 0 ? _ref387 : raw.completeTime) !== null && _ref386 !== void 0 ? _ref386 : raw.complete_time) !== null && _ref385 !== void 0 ? _ref385 : raw.CompleteTime) !== null && _ref384 !== void 0 ? _ref384 : '',
    trackingNo: (_ref389 = (_ref390 = (_ref391 = (_ref392 = (_ref393 = (_ref394 = (_ref395 = (_ref396 = (_raw$trackingNo = raw.trackingNo) !== null && _raw$trackingNo !== void 0 ? _raw$trackingNo : raw.tracking_no) !== null && _ref396 !== void 0 ? _ref396 : raw.TrackingNo) !== null && _ref395 !== void 0 ? _ref395 : raw.expressNo) !== null && _ref394 !== void 0 ? _ref394 : raw.express_no) !== null && _ref393 !== void 0 ? _ref393 : raw.ExpressNo) !== null && _ref392 !== void 0 ? _ref392 : raw.logisticsNo) !== null && _ref391 !== void 0 ? _ref391 : raw.logistics_no) !== null && _ref390 !== void 0 ? _ref390 : raw.LogisticsNo) !== null && _ref389 !== void 0 ? _ref389 : '',
    trackingCompany: (_ref397 = (_ref398 = (_ref399 = (_ref400 = (_ref401 = (_ref402 = (_ref403 = (_ref404 = (_raw$trackingCompany = raw.trackingCompany) !== null && _raw$trackingCompany !== void 0 ? _raw$trackingCompany : raw.tracking_company) !== null && _ref404 !== void 0 ? _ref404 : raw.TrackingCompany) !== null && _ref403 !== void 0 ? _ref403 : raw.expressCompany) !== null && _ref402 !== void 0 ? _ref402 : raw.express_company) !== null && _ref401 !== void 0 ? _ref401 : raw.ExpressCompany) !== null && _ref400 !== void 0 ? _ref400 : raw.logisticsCompany) !== null && _ref399 !== void 0 ? _ref399 : raw.logistics_company) !== null && _ref398 !== void 0 ? _ref398 : raw.LogisticsCompany) !== null && _ref397 !== void 0 ? _ref397 : '',
    receiverName: (_ref405 = (_ref406 = (_ref407 = (_ref408 = (_raw$receiverName = raw.receiverName) !== null && _raw$receiverName !== void 0 ? _raw$receiverName : raw.receiver_name) !== null && _ref408 !== void 0 ? _ref408 : raw.ReceiverName) !== null && _ref407 !== void 0 ? _ref407 : raw.consignee) !== null && _ref406 !== void 0 ? _ref406 : raw.Consignee) !== null && _ref405 !== void 0 ? _ref405 : '',
    receiverPhone: (_ref409 = (_ref410 = (_ref411 = (_ref412 = (_ref413 = (_ref414 = (_raw$receiverPhone = raw.receiverPhone) !== null && _raw$receiverPhone !== void 0 ? _raw$receiverPhone : raw.receiver_phone) !== null && _ref414 !== void 0 ? _ref414 : raw.ReceiverPhone) !== null && _ref413 !== void 0 ? _ref413 : raw.mobile) !== null && _ref412 !== void 0 ? _ref412 : raw.Mobile) !== null && _ref411 !== void 0 ? _ref411 : raw.phone) !== null && _ref410 !== void 0 ? _ref410 : raw.Phone) !== null && _ref409 !== void 0 ? _ref409 : '',
    receiverAddress: (_ref415 = (_ref416 = (_ref417 = (_ref418 = (_raw$receiverAddress = raw.receiverAddress) !== null && _raw$receiverAddress !== void 0 ? _raw$receiverAddress : raw.receiver_address) !== null && _ref418 !== void 0 ? _ref418 : raw.ReceiverAddress) !== null && _ref417 !== void 0 ? _ref417 : raw.address) !== null && _ref416 !== void 0 ? _ref416 : raw.Address) !== null && _ref415 !== void 0 ? _ref415 : ''
  };
}

/**
 * 获取退货原因模版列表
 * GET /api/v1/refund-reasons
 */
function fetchRefundReasons() {
  return _fetchRefundReasons.apply(this, arguments);
}

/**
 * 获取退款列表
 * GET /api/v1/refunds
 */
function _fetchRefundReasons() {
  _fetchRefundReasons = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee16() {
    var _ref455, _ref456, _res$data$list4, _res$data7, _res$data8, _res$data9;
    var params,
      query,
      res,
      list,
      _args16 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          params = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : {};
          query = {};
          if (params.page !== undefined) query.page = params.page;
          if (params.size !== undefined) query.size = params.size;
          if (params.enabled !== undefined) query.enabled = params.enabled;
          _context16.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(refundApi.reasonList, query);
        case 1:
          res = _context16.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (_ref455 = (_ref456 = (_res$data$list4 = res === null || res === void 0 || (_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : _res$data7.list) !== null && _res$data$list4 !== void 0 ? _res$data$list4 : res === null || res === void 0 || (_res$data8 = res.data) === null || _res$data8 === void 0 ? void 0 : _res$data8.items) !== null && _ref456 !== void 0 ? _ref456 : res === null || res === void 0 || (_res$data9 = res.data) === null || _res$data9 === void 0 ? void 0 : _res$data9.records) !== null && _ref455 !== void 0 ? _ref455 : [];
          return _context16.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: list.map(normalizeRefundReason)
          }));
      }
    }, _callee16);
  }));
  return _fetchRefundReasons.apply(this, arguments);
}
function fetchRefundList() {
  return _fetchRefundList.apply(this, arguments);
}

/**
 * 申请退款
 * POST /api/v1/refunds
 * payload 支持：
 *   - orderId: 订单ID (必填)
 *   - type: 退款类型 refund_only/return_refund 或 1/2 (必填)
 *   - reasonId: 退款原因ID
 *   - reason: 退款原因说明
 *   - amount: 退款金额 (必填)
 *   - description: 退款说明
 *   - images: 凭证图片URL数组
 *   - items: 退款商品项 [{productId, skuId, quantity, price}]
 *   - trackingNo: 退货物流单号
 *   - trackingCompany: 退货物流公司
 */
function _fetchRefundList() {
  _fetchRefundList = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee17() {
    var _ref457, _ref458, _res$data$list5, _res$data0, _res$data1, _res$data10;
    var params,
      query,
      res,
      list,
      _args17 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          params = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : {};
          query = {};
          if (params.status !== undefined) query.status = params.status;
          if (params.type !== undefined) query.type = params.type;
          if (params.orderId !== undefined) query.orderId = params.orderId;
          if (params.page !== undefined) query.page = params.page;
          if (params.size !== undefined) query.size = params.size;
          _context17.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(refundApi.list, query);
        case 1:
          res = _context17.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (_ref457 = (_ref458 = (_res$data$list5 = res === null || res === void 0 || (_res$data0 = res.data) === null || _res$data0 === void 0 ? void 0 : _res$data0.list) !== null && _res$data$list5 !== void 0 ? _res$data$list5 : res === null || res === void 0 || (_res$data1 = res.data) === null || _res$data1 === void 0 ? void 0 : _res$data1.items) !== null && _ref458 !== void 0 ? _ref458 : res === null || res === void 0 || (_res$data10 = res.data) === null || _res$data10 === void 0 ? void 0 : _res$data10.records) !== null && _ref457 !== void 0 ? _ref457 : [];
          return _context17.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: list.map(normalizeRefund)
          }));
      }
    }, _callee17);
  }));
  return _fetchRefundList.apply(this, arguments);
}
function applyRefund(_x18) {
  return _applyRefund.apply(this, arguments);
}

/**
 * 获取退款详情
 * GET /api/v1/refunds/{id}
 */
function _applyRefund() {
  _applyRefund = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee18(payload) {
    var body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context18) {
      while (1) switch (_context18.n) {
        case 0:
          body = {
            // 后端 Go 结构体要求：orderId uint64（必填）
            orderId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.orderId)
          }; // 退款原因ID：后端字段名为 refundReasonId（uint64，必填）
          if (payload.reasonId !== undefined && payload.reasonId !== null) {
            body.refundReasonId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.reasonId);
          }
          if (payload.description !== undefined) body.description = payload.description;
          if (Array.isArray(payload.images)) body.images = payload.images;
          _context18.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(refundApi.apply, body, {}, {}, false);
        case 1:
          res = _context18.v;
          return _context18.a(2, res);
      }
    }, _callee18);
  }));
  return _applyRefund.apply(this, arguments);
}
function fetchRefundDetail(_x19) {
  return _fetchRefundDetail.apply(this, arguments);
}

// ==================== 收货地址 ====================

/**
 * 规范化收货地址字段（兼容 snake_case / PascalCase / camelCase）
 */
function _fetchRefundDetail() {
  _fetchRefundDetail = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee19(id) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context19) {
      while (1) switch (_context19.n) {
        case 0:
          _context19.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(refundApi.detail, {}, {
            id: id
          });
        case 1:
          res = _context19.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context19.n = 2;
            break;
          }
          return _context19.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: normalizeRefund(res.data)
          }));
        case 2:
          return _context19.a(2, res);
      }
    }, _callee19);
  }));
  return _fetchRefundDetail.apply(this, arguments);
}
function normalizeAddress(raw) {
  var _ref419, _ref420, _ref421, _raw$id4, _ref422, _ref423, _ref424, _ref425, _ref426, _raw$consignee, _ref427, _ref428, _ref429, _ref430, _ref431, _raw$phone, _ref432, _ref433, _ref434, _raw$province, _ref435, _ref436, _ref437, _raw$city, _ref438, _ref439, _ref440, _ref441, _ref442, _raw$district, _ref443, _ref444, _ref445, _ref446, _ref447, _raw$detail, _ref448, _ref449, _ref450, _ref451, _raw$isDefault;
  if (!raw || (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(raw) !== 'object') return {};
  return {
    id: (_ref419 = (_ref420 = (_ref421 = (_raw$id4 = raw.id) !== null && _raw$id4 !== void 0 ? _raw$id4 : raw.ID) !== null && _ref421 !== void 0 ? _ref421 : raw.addressId) !== null && _ref420 !== void 0 ? _ref420 : raw.address_id) !== null && _ref419 !== void 0 ? _ref419 : '',
    consignee: (_ref422 = (_ref423 = (_ref424 = (_ref425 = (_ref426 = (_raw$consignee = raw.consignee) !== null && _raw$consignee !== void 0 ? _raw$consignee : raw.Consignee) !== null && _ref426 !== void 0 ? _ref426 : raw.name) !== null && _ref425 !== void 0 ? _ref425 : raw.receiver) !== null && _ref424 !== void 0 ? _ref424 : raw.receiverName) !== null && _ref423 !== void 0 ? _ref423 : raw.receiver_name) !== null && _ref422 !== void 0 ? _ref422 : '',
    phone: (_ref427 = (_ref428 = (_ref429 = (_ref430 = (_ref431 = (_raw$phone = raw.phone) !== null && _raw$phone !== void 0 ? _raw$phone : raw.Phone) !== null && _ref431 !== void 0 ? _ref431 : raw.mobile) !== null && _ref430 !== void 0 ? _ref430 : raw.tel) !== null && _ref429 !== void 0 ? _ref429 : raw.phoneNumber) !== null && _ref428 !== void 0 ? _ref428 : raw.phone_number) !== null && _ref427 !== void 0 ? _ref427 : '',
    province: (_ref432 = (_ref433 = (_ref434 = (_raw$province = raw.province) !== null && _raw$province !== void 0 ? _raw$province : raw.Province) !== null && _ref434 !== void 0 ? _ref434 : raw.provinceName) !== null && _ref433 !== void 0 ? _ref433 : raw.province_name) !== null && _ref432 !== void 0 ? _ref432 : '',
    city: (_ref435 = (_ref436 = (_ref437 = (_raw$city = raw.city) !== null && _raw$city !== void 0 ? _raw$city : raw.City) !== null && _ref437 !== void 0 ? _ref437 : raw.cityName) !== null && _ref436 !== void 0 ? _ref436 : raw.city_name) !== null && _ref435 !== void 0 ? _ref435 : '',
    district: (_ref438 = (_ref439 = (_ref440 = (_ref441 = (_ref442 = (_raw$district = raw.district) !== null && _raw$district !== void 0 ? _raw$district : raw.District) !== null && _ref442 !== void 0 ? _ref442 : raw.area) !== null && _ref441 !== void 0 ? _ref441 : raw.Area) !== null && _ref440 !== void 0 ? _ref440 : raw.districtName) !== null && _ref439 !== void 0 ? _ref439 : raw.district_name) !== null && _ref438 !== void 0 ? _ref438 : '',
    detail: (_ref443 = (_ref444 = (_ref445 = (_ref446 = (_ref447 = (_raw$detail = raw.detail) !== null && _raw$detail !== void 0 ? _raw$detail : raw.Detail) !== null && _ref447 !== void 0 ? _ref447 : raw.address) !== null && _ref446 !== void 0 ? _ref446 : raw.Address) !== null && _ref445 !== void 0 ? _ref445 : raw.addressDetail) !== null && _ref444 !== void 0 ? _ref444 : raw.address_detail) !== null && _ref443 !== void 0 ? _ref443 : '',
    isDefault: (_ref448 = (_ref449 = (_ref450 = (_ref451 = (_raw$isDefault = raw.isDefault) !== null && _raw$isDefault !== void 0 ? _raw$isDefault : raw.is_default) !== null && _ref451 !== void 0 ? _ref451 : raw.IsDefault) !== null && _ref450 !== void 0 ? _ref450 : raw.default) !== null && _ref449 !== void 0 ? _ref449 : raw.Default) !== null && _ref448 !== void 0 ? _ref448 : false
  };
}

/**
 * 获取默认收货地址
 */
function fetchDefaultAddress() {
  return _fetchDefaultAddress.apply(this, arguments);
}

/**
 * 获取收货地址列表
 */
function _fetchDefaultAddress() {
  _fetchDefaultAddress = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee20() {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context20) {
      while (1) switch (_context20.n) {
        case 0:
          _context20.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(addressApi.default);
        case 1:
          res = _context20.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context20.n = 2;
            break;
          }
          return _context20.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: normalizeAddress(res.data)
          }));
        case 2:
          return _context20.a(2, res);
      }
    }, _callee20);
  }));
  return _fetchDefaultAddress.apply(this, arguments);
}
function fetchAddressList() {
  return _fetchAddressList.apply(this, arguments);
}
function _fetchAddressList() {
  _fetchAddressList = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().m(function _callee21() {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])().w(function (_context21) {
      while (1) switch (_context21.n) {
        case 0:
          _context21.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(addressApi.list);
        case 1:
          res = _context21.v;
          if (!(res !== null && res !== void 0 && res.data && Array.isArray(res.data))) {
            _context21.n = 2;
            break;
          }
          return _context21.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: res.data.map(normalizeAddress)
          }));
        case 2:
          return _context21.a(2, res);
      }
    }, _callee21);
  }));
  return _fetchAddressList.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/common/index.ts":
/*!*********************************!*\
  !*** ./src/api/common/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiDelete: function() { return /* binding */ apiDelete; },
/* harmony export */   apiGet: function() { return /* binding */ apiGet; },
/* harmony export */   apiPost: function() { return /* binding */ apiPost; },
/* harmony export */   apiPut: function() { return /* binding */ apiPut; },
/* harmony export */   getAuthToken: function() { return /* binding */ getAuthToken; },
/* harmony export */   toNumericId: function() { return /* binding */ toNumericId; },
/* harmony export */   uploadImage: function() { return /* binding */ uploadImage; }
/* harmony export */ });
/* unused harmony export normalizeNumericFields */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var URLSearchParams = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["URLSearchParams"];







/**
 * 将 ID 字段统一转换为数字类型
 * 后端 Go 通常使用 uint64，要求 JSON 中的 ID 必须是数字而非字符串
 */
function toNumericId(value) {
  if (value === undefined || value === null || value === '') return 0;
  var num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

/**
 * 批量转换 body 中指定字段为数字类型
 */
function normalizeNumericFields(body, fields) {
  var result = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, body);
  var _iterator = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fields),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var field = _step.value;
      if (field in result && result[field] !== undefined && result[field] !== null) {
        result[field] = toNumericId(result[field]);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}
function getAuthToken() {
  try {
    var _ref, _ref2, _parsed$token;
    var stored = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getStorageSync('lxg_user');
    if (!stored) return '';
    var parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
    return (_ref = (_ref2 = (_parsed$token = parsed === null || parsed === void 0 ? void 0 : parsed.token) !== null && _parsed$token !== void 0 ? _parsed$token : parsed === null || parsed === void 0 ? void 0 : parsed.Token) !== null && _ref2 !== void 0 ? _ref2 : parsed === null || parsed === void 0 ? void 0 : parsed.accessToken) !== null && _ref !== void 0 ? _ref : '';
  } catch (error) {
    console.error('[getAuthToken] 读取登录态失败:', error);
    return '';
  }
}
function replaceUrlParams(url, params) {
  var result = url;
  Object.keys(params).forEach(function (key) {
    result = result.replace(":".concat(key), String(params[key]));
  });
  return result;
}

// 将 HTTP 状态码转换为用户友好的提示（不暴露 URL、技术细节）
function friendlyHttpError(statusCode) {
  switch (statusCode) {
    case 400:
      return '请求参数有误';
    case 401:
      return '登录已失效，请重新登录';
    case 403:
      return '暂无权限执行此操作';
    case 404:
      return '接口暂未实现或已移除';
    case 405:
      return '请求方式不支持';
    case 408:
      return '请求超时，请稍后重试';
    case 409:
      return '操作冲突，请刷新后重试';
    case 413:
      return '提交数据过大';
    case 429:
      return '操作过于频繁，请稍后再试';
    case 500:
      return '服务异常，请稍后重试';
    case 501:
      return '服务暂未实现';
    case 502:
      return '服务网关异常';
    case 503:
      return '服务暂时不可用，请稍后重试';
    case 504:
      return '网关超时，请稍后重试';
    default:
      return statusCode >= 500 ? '服务异常，请稍后重试' : '请求失败，请稍后重试';
  }
}

// 美化网络层错误（Taro.request 抛出的 request:fail xxx）
function friendlyNetworkError(message, url) {
  if (!message) return '网络异常，请稍后重试';
  var lower = message.toLowerCase();
  if (lower.includes('timeout') || lower.includes('请求超时')) return '请求超时，请检查网络后重试';
  if (lower.includes('abort')) return '请求已取消';
  if (lower.includes('invalid url') || lower.includes('600009')) return '请求地址异常';
  if (lower.includes('not in domain list') || lower.includes('url not in domain')) return '请在后台配置合法域名';
  if (lower.includes('network') || lower.includes('网络')) return '网络异常，请检查网络连接';
  if (lower.includes('fail')) return '网络请求失败，请稍后重试';
  return message;
}

// 判断是否为认证相关错误
function isAuthError(message, statusCode, code) {
  // 排除"解析失败"类错误：token解析失败是 token 格式/解析问题，不是认证失效
  // 误判会导致清除登录态、弹窗跳转登录页，干扰微信登录等需要临时 token 的流程
  if (message && /解析失败|parse\s*fail/i.test(message)) return false;
  var authErrorKeywords = ['缺少认证信息', '未登录', '登录已失效', 'token expired', 'token is expired', 'token过期', 'token失效', 'token无效', '未授权', 'unauthorized', 'Unauthorized', '请先登录', '认证失败'];
  if (statusCode === 401 || statusCode === 403) return true;
  if (code === 401 || code === 403) return true;
  return authErrorKeywords.some(function (keyword) {
    return message.includes(keyword);
  });
}

// 登录弹窗全局去重标志，避免同一页面多个接口并发时重复弹窗
var isLoginModalShowing = false;

// 处理认证错误
function handleAuthError(message) {
  var _currentPages;
  // 如果当前已有登录弹窗显示中，直接忽略，避免重复弹窗
  if (isLoginModalShowing) return;

  // 检查当前是否有 token（区分"从未登录"和"登录失效"）
  var hasToken = !!getAuthToken();
  if (hasToken) {
    // 有 token 但认证失败 = token 过期，清理登录态
    try {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeStorageSync('lxg_user');
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeStorageSync('userInfo');
    } catch (_unused) {/* ignore */}
  }

  // 提示用户并跳转登录页（如果当前不在登录页）
  var currentPages = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getCurrentPages();
  var currentRoute = ((_currentPages = currentPages[currentPages.length - 1]) === null || _currentPages === void 0 ? void 0 : _currentPages.route) || '';
  var isLoginPage = currentRoute.includes('/pages/user/login/index') || currentRoute === 'pages/user/login/index';
  if (isLoginPage) {
    // 已在登录页，不跳转，避免循环或白屏
    return;
  }
  isLoginModalShowing = true;
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showModal({
    title: hasToken ? '登录已失效' : '请先登录',
    content: hasToken ? message || '请重新登录' : '此操作需要登录账号',
    showCancel: false,
    confirmText: '去登录',
    success: function success() {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
        url: '/pages/user/login/index'
      });
    },
    complete: function complete() {
      isLoginModalShowing = false;
    }
  });
}
function apiRequest(_x) {
  return _apiRequest.apply(this, arguments);
}
function _apiRequest() {
  _apiRequest = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee(url) {
    var options,
      defaultHeaders,
      token,
      response,
      _response$data,
      _response$data2,
      backendMsg,
      errMsg,
      err,
      respData,
      _backendMsg,
      _err,
      rawErrMsg,
      errno,
      _args = arguments,
      _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          defaultHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };
          token = getAuthToken();
          if (token) {
            defaultHeaders['Authorization'] = "Bearer ".concat(token);
          }
          _context.p = 1;
          console.log('[API Request]', {
            url: url,
            method: options.method || 'GET',
            data: options.data,
            headers: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, defaultHeaders), options.headers || {})
          });
          _context.n = 2;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().request({
            url: url,
            method: options.method || 'GET',
            data: options.data,
            header: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, defaultHeaders), options.headers || {}),
            timeout: 10000
          });
        case 2:
          response = _context.v;
          console.log('[API Response]', {
            url: url,
            statusCode: response.statusCode,
            data: response.data
          });
          if (!(response.statusCode === 401)) {
            _context.n = 3;
            break;
          }
          handleAuthError('登录已失效，请重新登录');
          throw new Error('登录已失效，请重新登录');
        case 3:
          if (!(response.statusCode < 200 || response.statusCode >= 300)) {
            _context.n = 4;
            break;
          }
          // 读取后端返回的 message 字段，方便定位错误
          backendMsg = ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message) || ((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.msg); // 控制台输出完整调试信息（含 URL、状态码、响应内容）
          // silent=true 时（如订单评价兜底查询、商品 AI 评价摘要等可选数据）不打印，避免未实现接口刷屏
          if (!options.silent) {
            console.error('[API Error]', {
              url: url,
              statusCode: response.statusCode,
              data: response.data
            });
          }
          // 抛给用户的错误信息：优先用后端 message，否则用友好提示（不暴露 URL 等技术细节）
          errMsg = backendMsg || friendlyHttpError(response.statusCode);
          err = new Error(errMsg);
          err.statusCode = response.statusCode;
          err.response = response.data;
          err.rawUrl = url;

          // 如果是认证相关错误，处理登录失效
          // 注意：silent=true 时（如商品详情页静默拉取 AI 评价摘要）不弹窗跳转登录页，
          // 否则未登录用户浏览商品时会被 AI 接口的 401 弹窗打断
          if (isAuthError(err.message, response.statusCode) && !options.silent) {
            handleAuthError(err.message);
          }
          throw err;
        case 4:
          // 部分接口 HTTP 200 但业务 code 不为 200（如注册时手机号已存在）
          respData = response.data;
          if (!(respData && typeof respData.code === 'number' && respData.code !== 200)) {
            _context.n = 5;
            break;
          }
          _backendMsg = respData.message || respData.msg || '请求失败';
          _err = new Error(_backendMsg);
          _err.code = respData.code;
          _err.response = respData;

          // 如果是认证相关错误，处理登录失效
          // silent=true 时（如商品 AI 评价摘要等可选数据）不弹窗跳转登录页
          if (isAuthError(_err.message, undefined, respData.code) && !options.silent) {
            handleAuthError(_err.message);
          }
          throw _err;
        case 5:
          return _context.a(2, response.data);
        case 6:
          _context.p = 6;
          _t = _context.v;
          // 处理 Taro.request 本身抛出的错误（如网络错误、CORS 错误等）
          rawErrMsg = (_t === null || _t === void 0 ? void 0 : _t.errMsg) || (_t === null || _t === void 0 ? void 0 : _t.message) || String(_t);
          errno = _t === null || _t === void 0 ? void 0 : _t.errno;
          if (!options.silent) {
            console.error('[API Network Error]', {
              url: url,
              rawErrMsg: rawErrMsg,
              errno: errno,
              error: _t
            });
          }
          if (_t instanceof Error) {
            // 如果错误消息包含认证相关关键词，也处理登录失效
            // silent=true 时不弹窗（与上面业务/HTTP 错误处理保持一致）
            if (isAuthError(_t.message) && !options.silent) {
              handleAuthError(_t.message);
            }
            // 美化网络层错误信息（如 request:fail timeout、request:fail invalid url 等）
            _t.message = friendlyNetworkError(_t.message, url);
          }
          throw _t;
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[1, 6]]);
  }));
  return _apiRequest.apply(this, arguments);
}
function apiGet(_x2) {
  return _apiGet.apply(this, arguments);
}
function _apiGet() {
  _apiGet = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee2(url) {
    var params,
      pathParams,
      silent,
      err,
      resolvedUrl,
      searchParams,
      fullUrl,
      _args2 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          pathParams = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          silent = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : false;
          if (url) {
            _context2.n = 1;
            break;
          }
          err = new Error("[apiGet] \u8BF7\u6C42\u5730\u5740\u7F3A\u5931\uFF0C\u8BF7\u68C0\u67E5\u8C03\u7528\u65B9\u662F\u5426\u4F20\u5165\u4E86\u672A\u5B9A\u4E49\u7684 API URL");
          console.error(err);
          console.error('[apiGet] 调用栈:', new Error().stack);
          throw err;
        case 1:
          resolvedUrl = replaceUrlParams(url, pathParams);
          searchParams = new URLSearchParams(params);
          fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');
          return _context2.a(2, apiRequest(fullUrl, {
            method: 'GET',
            silent: silent
          }));
      }
    }, _callee2);
  }));
  return _apiGet.apply(this, arguments);
}
function apiPost(_x3) {
  return _apiPost.apply(this, arguments);
}
function _apiPost() {
  _apiPost = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee3(url) {
    var data,
      pathParams,
      queryParams,
      useFormUrlEncoded,
      silent,
      customHeaders,
      err,
      resolvedUrl,
      stringQueryParams,
      searchParams,
      fullUrl,
      headers,
      requestData,
      _args3 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          data = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          pathParams = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          queryParams = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
          useFormUrlEncoded = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : true;
          silent = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : false;
          customHeaders = _args3.length > 6 && _args3[6] !== undefined ? _args3[6] : {};
          if (url) {
            _context3.n = 1;
            break;
          }
          err = new Error("[apiPost] \u8BF7\u6C42\u5730\u5740\u7F3A\u5931\uFF0C\u8BF7\u68C0\u67E5\u8C03\u7528\u65B9\u662F\u5426\u4F20\u5165\u4E86\u672A\u5B9A\u4E49\u7684 API URL");
          console.error(err);
          console.error('[apiPost] 调用栈:', new Error().stack);
          throw err;
        case 1:
          resolvedUrl = replaceUrlParams(url, pathParams); // URLSearchParams 构造函数要求值为 string，将 number 转换为 string
          stringQueryParams = {};
          Object.keys(queryParams).forEach(function (key) {
            stringQueryParams[key] = String(queryParams[key]);
          });
          searchParams = new URLSearchParams(stringQueryParams);
          fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');
          headers = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_1__["default"])({}, customHeaders);
          requestData = data;
          if (useFormUrlEncoded) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            requestData = new URLSearchParams(data).toString();
          } else {
            headers['Content-Type'] = 'application/json';
            // 直接传对象，让 Taro.request 根据 Content-Type 自动序列化
            // 手动 JSON.stringify 在小程序端可能被 Taro 二次处理导致格式异常
            requestData = data;
          }
          return _context3.a(2, apiRequest(fullUrl, {
            method: 'POST',
            data: requestData,
            headers: headers,
            silent: silent
          }));
      }
    }, _callee3);
  }));
  return _apiPost.apply(this, arguments);
}
function apiPut(_x4) {
  return _apiPut.apply(this, arguments);
}
function _apiPut() {
  _apiPut = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee4(url) {
    var data,
      pathParams,
      err,
      resolvedUrl,
      _args4 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          data = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          pathParams = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          if (url) {
            _context4.n = 1;
            break;
          }
          err = new Error("[apiPut] \u8BF7\u6C42\u5730\u5740\u7F3A\u5931\uFF0C\u8BF7\u68C0\u67E5\u8C03\u7528\u65B9\u662F\u5426\u4F20\u5165\u4E86\u672A\u5B9A\u4E49\u7684 API URL");
          console.error(err);
          throw err;
        case 1:
          resolvedUrl = replaceUrlParams(url, pathParams);
          return _context4.a(2, apiRequest(resolvedUrl, {
            method: 'PUT',
            data: data
          }));
      }
    }, _callee4);
  }));
  return _apiPut.apply(this, arguments);
}
function apiDelete(_x5) {
  return _apiDelete.apply(this, arguments);
}

// ==================== 文件上传 ====================

/**
 * 从上传接口响应中提取图片URL，兼容多种字段命名
 */
function _apiDelete() {
  _apiDelete = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee5(url) {
    var data,
      pathParams,
      err,
      resolvedUrl,
      _args5 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          data = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          pathParams = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if (url) {
            _context5.n = 1;
            break;
          }
          err = new Error("[apiDelete] \u8BF7\u6C42\u5730\u5740\u7F3A\u5931\uFF0C\u8BF7\u68C0\u67E5\u8C03\u7528\u65B9\u662F\u5426\u4F20\u5165\u4E86\u672A\u5B9A\u4E49\u7684 API URL");
          console.error(err);
          throw err;
        case 1:
          resolvedUrl = replaceUrlParams(url, pathParams);
          return _context5.a(2, apiRequest(resolvedUrl, {
            method: 'DELETE',
            data: data
          }));
      }
    }, _callee5);
  }));
  return _apiDelete.apply(this, arguments);
}
function extractUploadUrl(respData) {
  var _ref3, _respData$data;
  if (!respData) return '';
  // 兼容 { data: {...} } / { data: "url" } / 顶层直接含 url 等多种结构
  var container = (_ref3 = (_respData$data = respData.data) !== null && _respData$data !== void 0 ? _respData$data : respData.result) !== null && _ref3 !== void 0 ? _ref3 : respData;
  if (typeof container === 'string') return container;
  if (!container || (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_5__["default"])(container) !== 'object') return '';
  var candidates = [container.url, container.URL, container.Url, container.imageUrl, container.image_url, container.ImageUrl, container.avatarUrl, container.avatar_url, container.AvatarUrl, container.filePath, container.file_url, container.FileUrl, container.fileUrl, container.path, container.Path, container.link, container.Link, container.src, container.Src];
  for (var _i = 0, _candidates = candidates; _i < _candidates.length; _i++) {
    var v = _candidates[_i];
    if (typeof v === 'string' && v) return v;
  }
  // 兜底：递归查找第一个以 http 开头的字符串值
  for (var _i2 = 0, _Object$keys = Object.keys(container); _i2 < _Object$keys.length; _i2++) {
    var k = _Object$keys[_i2];
    var _v = container[k];
    if (typeof _v === 'string' && /^https?:\/\//i.test(_v)) return _v;
  }
  return '';
}

/**
 * 上传前对图片进行压缩处理
 * 小程序端：先用 getFileInfo 获取大小，超过阈值则调用 compressImage 压缩
 * H5 端：chooseImage 已通过 sizeType:['compressed'] 处理，此处跳过
 *
 * @param filePath 原始临时文件路径
 * @param maxSize  触发压缩的大小阈值（字节），默认 2MB
 * @returns 压缩后的文件路径（无需压缩时返回原路径）
 */
function compressIfNeeded(_x6) {
  return _compressIfNeeded.apply(this, arguments);
}
/**
 * 从文件路径中提取扩展名，兜底返回 .jpg
 */
function _compressIfNeeded() {
  _compressIfNeeded = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee6(filePath) {
    var maxSize,
      _info$size,
      info,
      fileSize,
      compressed,
      _args6 = arguments,
      _t2;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          maxSize = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1024 * 1024;
          if (true) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2, filePath);
        case 1:
          _context6.p = 1;
          _context6.n = 2;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getFileInfo({
            filePath: filePath
          });
        case 2:
          info = _context6.v;
          fileSize = (_info$size = info === null || info === void 0 ? void 0 : info.size) !== null && _info$size !== void 0 ? _info$size : 0;
          console.log('[Upload] 原始文件大小:', fileSize, 'bytes');
          if (!(fileSize <= maxSize)) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, filePath);
        case 3:
          _context6.n = 4;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().compressImage({
            src: filePath,
            quality: 50
          });
        case 4:
          compressed = _context6.v;
          console.log('[Upload] 压缩后路径:', compressed.tempFilePath);
          return _context6.a(2, compressed.tempFilePath);
        case 5:
          _context6.p = 5;
          _t2 = _context6.v;
          console.warn('[Upload] 获取文件信息或压缩失败，使用原文件:', _t2);
          return _context6.a(2, filePath);
      }
    }, _callee6, null, [[1, 5]]);
  }));
  return _compressIfNeeded.apply(this, arguments);
}
function getFileExtension(filePath) {
  var match = filePath.match(/\.(\w+)(?:\?|$)/);
  var ext = match ? match[1].toLowerCase() : '';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext)) {
    return ext === 'jpeg' ? '.jpg' : ".".concat(ext);
  }
  // 压缩后的临时文件通常没有扩展名，compressImage 输出为 JPEG
  return '.jpg';
}

/**
 * 确保文件路径有图片扩展名
 * 微信小程序 chooseImage/compressImage 返回的临时文件路径可能无扩展名（如 wxfile://tmp_xxx），
 * 后端从文件名提取扩展名校验格式时会报"图片格式或大小不正确"。
 * 通过 FileSystemManager.copyFile 复制到带扩展名的路径解决。
 */
function ensureFileExtension(_x7) {
  return _ensureFileExtension.apply(this, arguments);
}
/**
 * 上传图片
 * 使用 Taro.uploadFile（multipart/form-data），Taro.request 不支持文件流
 * 上传前会自动检查文件大小，超过 2MB 时压缩以避免后端"图片格式或大小不正确"错误
 *
 * @param url      上传接口地址，通常传 userApi.upload
 * @param filePath chooseImage 返回的临时文件路径
 * @param name     后端接收文件的表单字段名，默认 "file"
 * @param formData 额外的表单字段
 * @returns 上传后的图片URL字符串；失败抛出 Error
 */
function _ensureFileExtension() {
  _ensureFileExtension = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee7(filePath) {
    var _env, ext, userDataPath, newPath, fs, _t3;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          if (!/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filePath)) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, filePath);
        case 1:
          _context7.p = 1;
          ext = getFileExtension(filePath);
          userDataPath = (_env = (_tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().env)) === null || _env === void 0 ? void 0 : _env.USER_DATA_PATH;
          if (userDataPath) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, filePath);
        case 2:
          newPath = "".concat(userDataPath, "/upload_").concat(Date.now()).concat(ext);
          fs = _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().getFileSystemManager();
          _context7.n = 3;
          return new Promise(function (resolve, reject) {
            fs.copyFile({
              srcPath: filePath,
              destPath: newPath,
              success: function success() {
                return resolve();
              },
              fail: reject
            });
          });
        case 3:
          console.log('[Upload] 文件已复制到带扩展名的路径:', newPath);
          return _context7.a(2, newPath);
        case 4:
          _context7.p = 4;
          _t3 = _context7.v;
          console.warn('[Upload] 复制文件失败，使用原路径:', _t3);
          return _context7.a(2, filePath);
      }
    }, _callee7, null, [[1, 4]]);
  }));
  return _ensureFileExtension.apply(this, arguments);
}
function uploadImage(_x8, _x9) {
  return _uploadImage.apply(this, arguments);
}
function _uploadImage() {
  _uploadImage = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee8(url, filePath) {
    var _ref4, _ref5, _respData$code, _respData, _respData2, _respData3, _respData4;
    var name,
      formData,
      token,
      header,
      uploadPath,
      fileName,
      res,
      backendMsg,
      parsed,
      respData,
      bizCode,
      imgUrl,
      _args8 = arguments,
      _t4;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          name = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 'file';
          formData = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
          token = getAuthToken();
          header = {};
          if (token) header['Authorization'] = "Bearer ".concat(token);

          // 上传前压缩，避免文件过大被后端拒绝
          _context8.n = 1;
          return compressIfNeeded(filePath);
        case 1:
          uploadPath = _context8.v;
          _context8.n = 2;
          return ensureFileExtension(uploadPath);
        case 2:
          uploadPath = _context8.v;
          // 显式指定 fileName，确保后端能从 Content-Disposition 中识别文件扩展名
          // 微信小程序临时文件路径常无扩展名（如 wxfile://tmp_xxx），导致后端校验格式失败
          fileName = "upload".concat(getFileExtension(filePath));
          console.log('[Upload Request]', {
            url: url,
            filePath: uploadPath,
            fileName: fileName,
            name: name,
            formData: formData
          });
          _context8.n = 3;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().uploadFile({
            url: url,
            filePath: uploadPath,
            name: name,
            fileName: fileName,
            formData: formData,
            header: header,
            timeout: 30000
          });
        case 3:
          res = _context8.v;
          console.log('[Upload Response]', {
            statusCode: res.statusCode,
            data: res.data
          });
          if (!(res.statusCode === 401)) {
            _context8.n = 4;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeStorageSync('lxg_user');
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().navigateTo({
            url: '/pages/user/login/index'
          });
          throw new Error('登录已失效，请重新登录');
        case 4:
          if (!(res.statusCode !== 200)) {
            _context8.n = 5;
            break;
          }
          backendMsg = '';
          try {
            parsed = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            backendMsg = (parsed === null || parsed === void 0 ? void 0 : parsed.message) || (parsed === null || parsed === void 0 ? void 0 : parsed.msg) || '';
          } catch (_unused2) {/* ignore */}
          throw new Error(backendMsg || "\u4E0A\u4F20\u5931\u8D25\uFF0CHTTP\u72B6\u6001: ".concat(res.statusCode));
        case 5:
          _context8.p = 5;
          respData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          _context8.n = 8;
          break;
        case 6:
          _context8.p = 6;
          _t4 = _context8.v;
          if (!(typeof res.data === 'string' && /^https?:\/\//i.test(res.data.trim()))) {
            _context8.n = 7;
            break;
          }
          return _context8.a(2, res.data.trim());
        case 7:
          throw new Error('上传响应格式无法识别');
        case 8:
          // 业务 code 校验（兼容 code/Code/errcode/errno 等字段名）
          bizCode = (_ref4 = (_ref5 = (_respData$code = (_respData = respData) === null || _respData === void 0 ? void 0 : _respData.code) !== null && _respData$code !== void 0 ? _respData$code : (_respData2 = respData) === null || _respData2 === void 0 ? void 0 : _respData2.Code) !== null && _ref5 !== void 0 ? _ref5 : (_respData3 = respData) === null || _respData3 === void 0 ? void 0 : _respData3.errcode) !== null && _ref4 !== void 0 ? _ref4 : (_respData4 = respData) === null || _respData4 === void 0 ? void 0 : _respData4.errno;
          if (!(typeof bizCode === 'number' && bizCode !== 200 && bizCode !== 0)) {
            _context8.n = 9;
            break;
          }
          console.error('[Upload] 后端业务错误，完整响应:', respData);
          throw new Error(respData.message || respData.msg || respData.Message || respData.errMsg || '上传失败');
        case 9:
          imgUrl = extractUploadUrl(respData);
          if (imgUrl) {
            _context8.n = 10;
            break;
          }
          console.warn('[Upload] 未能从响应中提取到图片URL，原始响应:', respData);
          throw new Error('上传成功但未获取到图片地址');
        case 10:
          return _context8.a(2, imgUrl);
      }
    }, _callee8, null, [[5, 6]]);
  }));
  return _uploadImage.apply(this, arguments);
}


/***/ }),

/***/ "./src/api/home/index.ts":
/*!*******************************!*\
  !*** ./src/api/home/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   brandApi: function() { return /* binding */ brandApi; },
/* harmony export */   categoryApi: function() { return /* binding */ categoryApi; },
/* harmony export */   fetchReviewAiSummary: function() { return /* binding */ fetchReviewAiSummary; },
/* harmony export */   fetchReviewList: function() { return /* binding */ fetchReviewList; },
/* harmony export */   fetchReviewReplies: function() { return /* binding */ fetchReviewReplies; },
/* harmony export */   fetchReviewStats: function() { return /* binding */ fetchReviewStats; },
/* harmony export */   homeApi: function() { return /* binding */ homeApi; },
/* harmony export */   likeReview: function() { return /* binding */ likeReview; },
/* harmony export */   productApi: function() { return /* binding */ productApi; },
/* harmony export */   replyToReview: function() { return /* binding */ replyToReview; }
/* harmony export */ });
/* unused harmony exports reviewApi, normalizeProductReview, normalizeReviewReply, normalizeReviewStats */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");



// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
var BACKEND_HOST = 'http://192.168.10.7:8089';
var API_BASE_URL =  false ? 0 : "".concat(BACKEND_HOST, "/api/v1");

var homeApi = {
  banners: "".concat(API_BASE_URL, "/homepage/banners"),
  // 获取所有推荐位商品 GET /api/v1/product/recommend
  // 返回结构:{ code, message, data: [{ id, name, status, products: [完整商品] }] }
  recommend: "".concat(API_BASE_URL, "/product/recommend"),
  seckillActivities: "".concat(API_BASE_URL, "/home/seckill-activities"),
  activities: "".concat(API_BASE_URL, "/seckill/activities"),
  activityProducts: "".concat(API_BASE_URL, "/seckill/activities/:id/products"),
  productDetail: "".concat(API_BASE_URL, "/seckill/activities/:id/products/:product_id")
};
var categoryApi = {
  list: "".concat(API_BASE_URL, "/categories"),
  products: "".concat(API_BASE_URL, "/categories/:id/products"),
  stores: "".concat(API_BASE_URL, "/stores"),
  storeDetail: "".concat(API_BASE_URL, "/stores/:id"),
  categoryTree: "".concat(API_BASE_URL, "/get/categorytree"),
  categoryOne: "".concat(API_BASE_URL, "/get/category/one"),
  categorySecond: "".concat(API_BASE_URL, "/get/category/second")
};
var brandApi = {
  list: "".concat(API_BASE_URL, "/brands"),
  products: "".concat(API_BASE_URL, "/brands/:id/products"),
  // 获取品牌树
  brandTree: "".concat(API_BASE_URL, "/get/brandtree"),
  // 获取指定品牌下的商品（分页）
  brandProducts: "".concat(API_BASE_URL, "/get/brand/product")
};
var productApi = {
  detail: "".concat(API_BASE_URL, "/product/detail"),
  search: "".concat(API_BASE_URL, "/product/search")
};
var reviewApi = {
  // 商品评论列表 GET /api/v1/review/list
  list: "".concat(API_BASE_URL, "/review/list"),
  // 获取商品评价统计 GET /api/v1/review/state
  stats: "".concat(API_BASE_URL, "/review/state"),
  // 获取商品AI评价摘要 GET /api/v1/review/ai
  ai: "".concat(API_BASE_URL, "/review/ai"),
  // 回复别人的评论 POST /api/v1/review/reply
  reply: "".concat(API_BASE_URL, "/review/reply"),
  // 获取指定评价的回复评价列表 GET /api/v1/review/reply/list
  replyList: "".concat(API_BASE_URL, "/review/reply/list"),
  // 点赞/取消点赞一个评价 POST /api/v1/review/like
  like: "".concat(API_BASE_URL, "/review/like"),
  // 旧字段保留兼容（商品详情页历史引用），指向新的 list
  summary: "".concat(API_BASE_URL, "/review/ai")
};

// ==================== 评价数据规范化 ====================

/**
 * 规范化商品评价数据：兼容 snake_case / PascalCase / camelCase
 */
function normalizeProductReview(raw) {
  var _ref, _ref2, _ref3, _ref4, _raw$id, _ref5, _ref6, _ref7, _raw$productId, _ref8, _ref9, _ref0, _raw$productName, _ref1, _ref10, _raw$skuId, _ref11, _ref12, _ref13, _ref14, _raw$skuName, _ref15, _ref16, _ref17, _raw$rating, _ref18, _ref19, _raw$ratingType, _ref20, _raw$rating2, _ref21, _raw$rating3, _ref22, _ref23, _ref24, _ref25, _ref26, _raw$content, _ref27, _ref28, _ref29, _ref30, _raw$anonymous, _ref31, _ref32, _ref33, _ref34, _raw$createdAt, _ref35, _ref36, _ref37, _raw$userId, _ref38, _ref39, _ref40, _ref41, _ref42, _raw$userName, _ref43, _ref44, _ref45, _ref46, _ref47, _ref48, _raw$userAvatar, _ref49, _ref50, _ref51, _ref52, _raw$specs, _ref53, _ref54, _ref55, _ref56, _ref57, _raw$likeCount, _ref58, _ref59, _ref60, _ref61, _raw$isLike, _ref62, _ref63, _ref64, _ref65, _raw$replyCount, _ref66, _raw$status;
  return {
    id: (_ref = (_ref2 = (_ref3 = (_ref4 = (_raw$id = raw.id) !== null && _raw$id !== void 0 ? _raw$id : raw.Id) !== null && _ref4 !== void 0 ? _ref4 : raw.reviewId) !== null && _ref3 !== void 0 ? _ref3 : raw.review_id) !== null && _ref2 !== void 0 ? _ref2 : raw.ID) !== null && _ref !== void 0 ? _ref : '',
    productId: (_ref5 = (_ref6 = (_ref7 = (_raw$productId = raw.productId) !== null && _raw$productId !== void 0 ? _raw$productId : raw.product_id) !== null && _ref7 !== void 0 ? _ref7 : raw.ProductId) !== null && _ref6 !== void 0 ? _ref6 : raw.ProductID) !== null && _ref5 !== void 0 ? _ref5 : '',
    productName: (_ref8 = (_ref9 = (_ref0 = (_raw$productName = raw.productName) !== null && _raw$productName !== void 0 ? _raw$productName : raw.product_name) !== null && _ref0 !== void 0 ? _ref0 : raw.ProductName) !== null && _ref9 !== void 0 ? _ref9 : raw.name) !== null && _ref8 !== void 0 ? _ref8 : '',
    skuId: (_ref1 = (_ref10 = (_raw$skuId = raw.skuId) !== null && _raw$skuId !== void 0 ? _raw$skuId : raw.sku_id) !== null && _ref10 !== void 0 ? _ref10 : raw.SkuId) !== null && _ref1 !== void 0 ? _ref1 : '',
    skuName: (_ref11 = (_ref12 = (_ref13 = (_ref14 = (_raw$skuName = raw.skuName) !== null && _raw$skuName !== void 0 ? _raw$skuName : raw.sku_name) !== null && _ref14 !== void 0 ? _ref14 : raw.SkuName) !== null && _ref13 !== void 0 ? _ref13 : raw.specs) !== null && _ref12 !== void 0 ? _ref12 : raw.spec) !== null && _ref11 !== void 0 ? _ref11 : '',
    rating: Number((_ref15 = (_ref16 = (_ref17 = (_raw$rating = raw.rating) !== null && _raw$rating !== void 0 ? _raw$rating : raw.Rating) !== null && _ref17 !== void 0 ? _ref17 : raw.score) !== null && _ref16 !== void 0 ? _ref16 : raw.Score) !== null && _ref15 !== void 0 ? _ref15 : 5),
    ratingType: (_ref18 = (_ref19 = (_raw$ratingType = raw.ratingType) !== null && _raw$ratingType !== void 0 ? _raw$ratingType : raw.rating_type) !== null && _ref19 !== void 0 ? _ref19 : raw.RatingType) !== null && _ref18 !== void 0 ? _ref18 : Number((_ref20 = (_raw$rating2 = raw.rating) !== null && _raw$rating2 !== void 0 ? _raw$rating2 : raw.Rating) !== null && _ref20 !== void 0 ? _ref20 : 5) >= 4 ? 'good' : Number((_ref21 = (_raw$rating3 = raw.rating) !== null && _raw$rating3 !== void 0 ? _raw$rating3 : raw.Rating) !== null && _ref21 !== void 0 ? _ref21 : 5) <= 2 ? 'bad' : 'neutral',
    content: (_ref22 = (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_raw$content = raw.content) !== null && _raw$content !== void 0 ? _raw$content : raw.Content) !== null && _ref26 !== void 0 ? _ref26 : raw.reviewContent) !== null && _ref25 !== void 0 ? _ref25 : raw.review_content) !== null && _ref24 !== void 0 ? _ref24 : raw.comment) !== null && _ref23 !== void 0 ? _ref23 : raw.Comment) !== null && _ref22 !== void 0 ? _ref22 : '',
    images: Array.isArray(raw.images) ? raw.images : Array.isArray(raw.Images) ? raw.Images : Array.isArray(raw.pics) ? raw.pics : Array.isArray(raw.imageList) ? raw.imageList : [],
    anonymous: (_ref27 = (_ref28 = (_ref29 = (_ref30 = (_raw$anonymous = raw.anonymous) !== null && _raw$anonymous !== void 0 ? _raw$anonymous : raw.Anonymous) !== null && _ref30 !== void 0 ? _ref30 : raw.isAnonymous) !== null && _ref29 !== void 0 ? _ref29 : raw.is_anonymous) !== null && _ref28 !== void 0 ? _ref28 : raw.isAnonymity) !== null && _ref27 !== void 0 ? _ref27 : false,
    createdAt: (_ref31 = (_ref32 = (_ref33 = (_ref34 = (_raw$createdAt = raw.createdAt) !== null && _raw$createdAt !== void 0 ? _raw$createdAt : raw.created_at) !== null && _ref34 !== void 0 ? _ref34 : raw.CreateTime) !== null && _ref33 !== void 0 ? _ref33 : raw.createTime) !== null && _ref32 !== void 0 ? _ref32 : raw.CreateAt) !== null && _ref31 !== void 0 ? _ref31 : '',
    userId: (_ref35 = (_ref36 = (_ref37 = (_raw$userId = raw.userId) !== null && _raw$userId !== void 0 ? _raw$userId : raw.user_id) !== null && _ref37 !== void 0 ? _ref37 : raw.UserId) !== null && _ref36 !== void 0 ? _ref36 : raw.userID) !== null && _ref35 !== void 0 ? _ref35 : '',
    userName: (_ref38 = (_ref39 = (_ref40 = (_ref41 = (_ref42 = (_raw$userName = raw.userName) !== null && _raw$userName !== void 0 ? _raw$userName : raw.user_name) !== null && _ref42 !== void 0 ? _ref42 : raw.UserName) !== null && _ref41 !== void 0 ? _ref41 : raw.nickname) !== null && _ref40 !== void 0 ? _ref40 : raw.NickName) !== null && _ref39 !== void 0 ? _ref39 : raw.nickName) !== null && _ref38 !== void 0 ? _ref38 : '',
    userAvatar: (_ref43 = (_ref44 = (_ref45 = (_ref46 = (_ref47 = (_ref48 = (_raw$userAvatar = raw.userAvatar) !== null && _raw$userAvatar !== void 0 ? _raw$userAvatar : raw.user_avatar) !== null && _ref48 !== void 0 ? _ref48 : raw.UserAvatar) !== null && _ref47 !== void 0 ? _ref47 : raw.avatar) !== null && _ref46 !== void 0 ? _ref46 : raw.Avatar) !== null && _ref45 !== void 0 ? _ref45 : raw.headImg) !== null && _ref44 !== void 0 ? _ref44 : raw.head_img) !== null && _ref43 !== void 0 ? _ref43 : '',
    specs: (_ref49 = (_ref50 = (_ref51 = (_ref52 = (_raw$specs = raw.specs) !== null && _raw$specs !== void 0 ? _raw$specs : raw.spec) !== null && _ref52 !== void 0 ? _ref52 : raw.skuName) !== null && _ref51 !== void 0 ? _ref51 : raw.sku_name) !== null && _ref50 !== void 0 ? _ref50 : raw.SkuName) !== null && _ref49 !== void 0 ? _ref49 : '',
    likeCount: Number((_ref53 = (_ref54 = (_ref55 = (_ref56 = (_ref57 = (_raw$likeCount = raw.likeCount) !== null && _raw$likeCount !== void 0 ? _raw$likeCount : raw.like_count) !== null && _ref57 !== void 0 ? _ref57 : raw.LikeCount) !== null && _ref56 !== void 0 ? _ref56 : raw.likes) !== null && _ref55 !== void 0 ? _ref55 : raw.Likes) !== null && _ref54 !== void 0 ? _ref54 : raw.likesCount) !== null && _ref53 !== void 0 ? _ref53 : 0),
    isLike: (_ref58 = (_ref59 = (_ref60 = (_ref61 = (_raw$isLike = raw.isLike) !== null && _raw$isLike !== void 0 ? _raw$isLike : raw.is_like) !== null && _ref61 !== void 0 ? _ref61 : raw.IsLike) !== null && _ref60 !== void 0 ? _ref60 : raw.liked) !== null && _ref59 !== void 0 ? _ref59 : raw.Liked) !== null && _ref58 !== void 0 ? _ref58 : false,
    replyCount: Number((_ref62 = (_ref63 = (_ref64 = (_ref65 = (_raw$replyCount = raw.replyCount) !== null && _raw$replyCount !== void 0 ? _raw$replyCount : raw.reply_count) !== null && _ref65 !== void 0 ? _ref65 : raw.ReplyCount) !== null && _ref64 !== void 0 ? _ref64 : raw.commentCount) !== null && _ref63 !== void 0 ? _ref63 : raw.comment_count) !== null && _ref62 !== void 0 ? _ref62 : 0),
    status: (_ref66 = (_raw$status = raw.status) !== null && _raw$status !== void 0 ? _raw$status : raw.Status) !== null && _ref66 !== void 0 ? _ref66 : 'show'
  };
}

/**
 * 规范化评价回复数据：兼容 snake_case / PascalCase / camelCase
 */
function normalizeReviewReply(raw) {
  var _ref67, _ref68, _ref69, _ref70, _ref71, _ref72, _raw$id2, _ref73, _ref74, _ref75, _ref76, _raw$reviewId, _ref77, _ref78, _ref79, _ref80, _raw$parentId, _ref81, _ref82, _ref83, _raw$userId2, _ref84, _ref85, _ref86, _ref87, _ref88, _raw$userName2, _ref89, _ref90, _ref91, _ref92, _raw$userAvatar2, _ref93, _ref94, _ref95, _ref96, _ref97, _raw$content2, _ref98, _ref99, _raw$likeCount2, _ref100, _ref101, _raw$isLike2, _ref102, _ref103, _ref104, _ref105, _ref106, _raw$createdAt2;
  return {
    id: (_ref67 = (_ref68 = (_ref69 = (_ref70 = (_ref71 = (_ref72 = (_raw$id2 = raw.id) !== null && _raw$id2 !== void 0 ? _raw$id2 : raw.Id) !== null && _ref72 !== void 0 ? _ref72 : raw.replyId) !== null && _ref71 !== void 0 ? _ref71 : raw.reply_id) !== null && _ref70 !== void 0 ? _ref70 : raw.commentId) !== null && _ref69 !== void 0 ? _ref69 : raw.comment_id) !== null && _ref68 !== void 0 ? _ref68 : raw.ID) !== null && _ref67 !== void 0 ? _ref67 : '',
    reviewId: (_ref73 = (_ref74 = (_ref75 = (_ref76 = (_raw$reviewId = raw.reviewId) !== null && _raw$reviewId !== void 0 ? _raw$reviewId : raw.review_id) !== null && _ref76 !== void 0 ? _ref76 : raw.ReviewId) !== null && _ref75 !== void 0 ? _ref75 : raw.evaluationId) !== null && _ref74 !== void 0 ? _ref74 : raw.evaluation_id) !== null && _ref73 !== void 0 ? _ref73 : '',
    parentId: (_ref77 = (_ref78 = (_ref79 = (_ref80 = (_raw$parentId = raw.parentId) !== null && _raw$parentId !== void 0 ? _raw$parentId : raw.parent_id) !== null && _ref80 !== void 0 ? _ref80 : raw.ParentId) !== null && _ref79 !== void 0 ? _ref79 : raw.pid) !== null && _ref78 !== void 0 ? _ref78 : raw.Pid) !== null && _ref77 !== void 0 ? _ref77 : '',
    userId: (_ref81 = (_ref82 = (_ref83 = (_raw$userId2 = raw.userId) !== null && _raw$userId2 !== void 0 ? _raw$userId2 : raw.user_id) !== null && _ref83 !== void 0 ? _ref83 : raw.UserId) !== null && _ref82 !== void 0 ? _ref82 : raw.userID) !== null && _ref81 !== void 0 ? _ref81 : '',
    userName: (_ref84 = (_ref85 = (_ref86 = (_ref87 = (_ref88 = (_raw$userName2 = raw.userName) !== null && _raw$userName2 !== void 0 ? _raw$userName2 : raw.user_name) !== null && _ref88 !== void 0 ? _ref88 : raw.UserName) !== null && _ref87 !== void 0 ? _ref87 : raw.nickname) !== null && _ref86 !== void 0 ? _ref86 : raw.NickName) !== null && _ref85 !== void 0 ? _ref85 : raw.nickName) !== null && _ref84 !== void 0 ? _ref84 : '',
    userAvatar: (_ref89 = (_ref90 = (_ref91 = (_ref92 = (_raw$userAvatar2 = raw.userAvatar) !== null && _raw$userAvatar2 !== void 0 ? _raw$userAvatar2 : raw.user_avatar) !== null && _ref92 !== void 0 ? _ref92 : raw.UserAvatar) !== null && _ref91 !== void 0 ? _ref91 : raw.avatar) !== null && _ref90 !== void 0 ? _ref90 : raw.Avatar) !== null && _ref89 !== void 0 ? _ref89 : '',
    content: (_ref93 = (_ref94 = (_ref95 = (_ref96 = (_ref97 = (_raw$content2 = raw.content) !== null && _raw$content2 !== void 0 ? _raw$content2 : raw.Content) !== null && _ref97 !== void 0 ? _ref97 : raw.replyContent) !== null && _ref96 !== void 0 ? _ref96 : raw.reply_content) !== null && _ref95 !== void 0 ? _ref95 : raw.comment) !== null && _ref94 !== void 0 ? _ref94 : raw.Comment) !== null && _ref93 !== void 0 ? _ref93 : '',
    likeCount: Number((_ref98 = (_ref99 = (_raw$likeCount2 = raw.likeCount) !== null && _raw$likeCount2 !== void 0 ? _raw$likeCount2 : raw.like_count) !== null && _ref99 !== void 0 ? _ref99 : raw.LikeCount) !== null && _ref98 !== void 0 ? _ref98 : 0),
    isLike: (_ref100 = (_ref101 = (_raw$isLike2 = raw.isLike) !== null && _raw$isLike2 !== void 0 ? _raw$isLike2 : raw.is_like) !== null && _ref101 !== void 0 ? _ref101 : raw.IsLike) !== null && _ref100 !== void 0 ? _ref100 : false,
    createdAt: (_ref102 = (_ref103 = (_ref104 = (_ref105 = (_ref106 = (_raw$createdAt2 = raw.createdAt) !== null && _raw$createdAt2 !== void 0 ? _raw$createdAt2 : raw.created_at) !== null && _ref106 !== void 0 ? _ref106 : raw.CreateTime) !== null && _ref105 !== void 0 ? _ref105 : raw.createTime) !== null && _ref104 !== void 0 ? _ref104 : raw.replyTime) !== null && _ref103 !== void 0 ? _ref103 : raw.reply_time) !== null && _ref102 !== void 0 ? _ref102 : ''
  };
}

/**
 * 规范化评价统计数据：兼容 snake_case / PascalCase / camelCase
 */
function normalizeReviewStats(raw) {
  var _ref107, _raw$data, _ref108, _ref109, _ref110, _ref111, _data$total, _ref112, _ref113, _ref114, _ref115, _data$goodCount, _ref116, _ref117, _ref118, _ref119, _data$neutralCount, _ref120, _ref121, _ref122, _ref123, _data$badCount, _ref124, _ref125, _ref126, _ref127, _data$imageCount, _ref128, _ref129, _ref130, _ref131, _ref132, _data$averageRating, _ref133, _ref134, _data$goodRate, _ref135, _data$distribution;
  var data = (_ref107 = (_raw$data = raw === null || raw === void 0 ? void 0 : raw.data) !== null && _raw$data !== void 0 ? _raw$data : raw === null || raw === void 0 ? void 0 : raw.result) !== null && _ref107 !== void 0 ? _ref107 : raw;
  var total = Number((_ref108 = (_ref109 = (_ref110 = (_ref111 = (_data$total = data === null || data === void 0 ? void 0 : data.total) !== null && _data$total !== void 0 ? _data$total : data === null || data === void 0 ? void 0 : data.Total) !== null && _ref111 !== void 0 ? _ref111 : data === null || data === void 0 ? void 0 : data.totalCount) !== null && _ref110 !== void 0 ? _ref110 : data === null || data === void 0 ? void 0 : data.total_count) !== null && _ref109 !== void 0 ? _ref109 : data === null || data === void 0 ? void 0 : data.count) !== null && _ref108 !== void 0 ? _ref108 : 0);
  var goodCount = Number((_ref112 = (_ref113 = (_ref114 = (_ref115 = (_data$goodCount = data === null || data === void 0 ? void 0 : data.goodCount) !== null && _data$goodCount !== void 0 ? _data$goodCount : data === null || data === void 0 ? void 0 : data.good_count) !== null && _ref115 !== void 0 ? _ref115 : data === null || data === void 0 ? void 0 : data.GoodCount) !== null && _ref114 !== void 0 ? _ref114 : data === null || data === void 0 ? void 0 : data.positive) !== null && _ref113 !== void 0 ? _ref113 : data === null || data === void 0 ? void 0 : data.Positive) !== null && _ref112 !== void 0 ? _ref112 : 0);
  var neutralCount = Number((_ref116 = (_ref117 = (_ref118 = (_ref119 = (_data$neutralCount = data === null || data === void 0 ? void 0 : data.neutralCount) !== null && _data$neutralCount !== void 0 ? _data$neutralCount : data === null || data === void 0 ? void 0 : data.neutral_count) !== null && _ref119 !== void 0 ? _ref119 : data === null || data === void 0 ? void 0 : data.NeutralCount) !== null && _ref118 !== void 0 ? _ref118 : data === null || data === void 0 ? void 0 : data.middle) !== null && _ref117 !== void 0 ? _ref117 : data === null || data === void 0 ? void 0 : data.Middle) !== null && _ref116 !== void 0 ? _ref116 : 0);
  var badCount = Number((_ref120 = (_ref121 = (_ref122 = (_ref123 = (_data$badCount = data === null || data === void 0 ? void 0 : data.badCount) !== null && _data$badCount !== void 0 ? _data$badCount : data === null || data === void 0 ? void 0 : data.bad_count) !== null && _ref123 !== void 0 ? _ref123 : data === null || data === void 0 ? void 0 : data.BadCount) !== null && _ref122 !== void 0 ? _ref122 : data === null || data === void 0 ? void 0 : data.negative) !== null && _ref121 !== void 0 ? _ref121 : data === null || data === void 0 ? void 0 : data.Negative) !== null && _ref120 !== void 0 ? _ref120 : 0);
  var imageCount = Number((_ref124 = (_ref125 = (_ref126 = (_ref127 = (_data$imageCount = data === null || data === void 0 ? void 0 : data.imageCount) !== null && _data$imageCount !== void 0 ? _data$imageCount : data === null || data === void 0 ? void 0 : data.image_count) !== null && _ref127 !== void 0 ? _ref127 : data === null || data === void 0 ? void 0 : data.ImageCount) !== null && _ref126 !== void 0 ? _ref126 : data === null || data === void 0 ? void 0 : data.hasImage) !== null && _ref125 !== void 0 ? _ref125 : data === null || data === void 0 ? void 0 : data.has_image) !== null && _ref124 !== void 0 ? _ref124 : 0);
  var averageRating = Number((_ref128 = (_ref129 = (_ref130 = (_ref131 = (_ref132 = (_data$averageRating = data === null || data === void 0 ? void 0 : data.averageRating) !== null && _data$averageRating !== void 0 ? _data$averageRating : data === null || data === void 0 ? void 0 : data.average_rating) !== null && _ref132 !== void 0 ? _ref132 : data === null || data === void 0 ? void 0 : data.AverageRating) !== null && _ref131 !== void 0 ? _ref131 : data === null || data === void 0 ? void 0 : data.avgScore) !== null && _ref130 !== void 0 ? _ref130 : data === null || data === void 0 ? void 0 : data.avg_score) !== null && _ref129 !== void 0 ? _ref129 : data === null || data === void 0 ? void 0 : data.score) !== null && _ref128 !== void 0 ? _ref128 : 0);
  var goodRate = (_ref133 = (_ref134 = (_data$goodRate = data === null || data === void 0 ? void 0 : data.goodRate) !== null && _data$goodRate !== void 0 ? _data$goodRate : data === null || data === void 0 ? void 0 : data.good_rate) !== null && _ref134 !== void 0 ? _ref134 : data === null || data === void 0 ? void 0 : data.GoodRate) !== null && _ref133 !== void 0 ? _ref133 : total > 0 ? Math.round(goodCount / total * 100) : 100;

  // 评分分布
  var distribution = (_ref135 = (_data$distribution = data === null || data === void 0 ? void 0 : data.distribution) !== null && _data$distribution !== void 0 ? _data$distribution : data === null || data === void 0 ? void 0 : data.Distribution) !== null && _ref135 !== void 0 ? _ref135 : {};
  var dist = {};
  [5, 4, 3, 2, 1].forEach(function (star) {
    var _ref136, _ref137, _distribution$star;
    dist[star] = Number((_ref136 = (_ref137 = (_distribution$star = distribution[star]) !== null && _distribution$star !== void 0 ? _distribution$star : distribution[String(star)]) !== null && _ref137 !== void 0 ? _ref137 : distribution["star".concat(star)]) !== null && _ref136 !== void 0 ? _ref136 : 0);
  });
  return {
    total: total,
    goodCount: goodCount,
    neutralCount: neutralCount,
    badCount: badCount,
    imageCount: imageCount,
    averageRating: averageRating,
    goodRate: goodRate,
    distribution: dist
  };
}

// ==================== 评价 API 方法 ====================

/**
 * 获取商品评论列表
 * GET /api/v1/review/list
 */
function fetchReviewList() {
  return _fetchReviewList.apply(this, arguments);
}

/**
 * 获取商品评价统计
 * GET /api/v1/review/state
 */
function _fetchReviewList() {
  _fetchReviewList = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee() {
    var _ref138, _ref139, _ref140, _res$data$list, _res$data, _res$data2, _res$data3, _res$data4;
    var params,
      query,
      res,
      list,
      _args = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          query = {};
          if (params.productId !== undefined && params.productId !== null && params.productId !== '') {
            // 后端要求参数名为 id（与 product/detail 接口一致）
            query.id = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(params.productId);
          }
          if (params.page !== undefined) query.page = params.page;
          if (params.size !== undefined) query.size = params.size;
          if (params.type !== undefined) query.type = params.type;
          if (params.ratingType !== undefined) query.ratingType = params.ratingType;
          _context.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(reviewApi.list, query, {}, false);
        case 1:
          res = _context.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (_ref138 = (_ref139 = (_ref140 = (_res$data$list = res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.list) !== null && _res$data$list !== void 0 ? _res$data$list : res === null || res === void 0 || (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.items) !== null && _ref140 !== void 0 ? _ref140 : res === null || res === void 0 || (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.records) !== null && _ref139 !== void 0 ? _ref139 : res === null || res === void 0 || (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.reviews) !== null && _ref138 !== void 0 ? _ref138 : [];
          return _context.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, res), {}, {
            data: list.map(normalizeProductReview)
          }));
      }
    }, _callee);
  }));
  return _fetchReviewList.apply(this, arguments);
}
function fetchReviewStats(_x) {
  return _fetchReviewStats.apply(this, arguments);
}

/**
 * 获取商品AI评价摘要
 * GET /api/v1/review/ai
 * 注意：此接口需要登录认证。使用 silent=true，未登录或 token 失效时
 * 不弹登录窗跳转，避免打断用户浏览商品；调用方自行 catch 错误即可。
 */
function _fetchReviewStats() {
  _fetchReviewStats = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee2(productId) {
    var query, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          // 后端要求参数名为 id（与 product/detail 接口一致）
          query = {
            id: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(productId)
          };
          _context2.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(reviewApi.stats, query, {}, false);
        case 1:
          res = _context2.v;
          return _context2.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, res), {}, {
            data: normalizeReviewStats(res)
          }));
      }
    }, _callee2);
  }));
  return _fetchReviewStats.apply(this, arguments);
}
function fetchReviewAiSummary(_x2) {
  return _fetchReviewAiSummary.apply(this, arguments);
}

/**
 * 回复别人的评论
 * POST /api/v1/review/reply
 */
function _fetchReviewAiSummary() {
  _fetchReviewAiSummary = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee3(productId) {
    var _res$data5, _ref141, _ref142, _ref143, _data$content, _ref144, _ref145, _ref146, _ref147, _data$averageRating2, _ref148, _ref149, _ref150, _ref151, _data$totalCount;
    var query, res, data, content, normalized;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          // 后端要求参数名为 id（与 product/detail 接口一致）
          query = {
            id: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(productId)
          };
          _context3.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(reviewApi.ai, query, {}, true);
        case 1:
          res = _context3.v;
          // 后端返回结构：{ code, message, data: { product_id, content } }
          // content 即 AI 总评文本
          data = (_res$data5 = res === null || res === void 0 ? void 0 : res.data) !== null && _res$data5 !== void 0 ? _res$data5 : res;
          content = String((_ref141 = (_ref142 = (_ref143 = (_data$content = data === null || data === void 0 ? void 0 : data.content) !== null && _data$content !== void 0 ? _data$content : data === null || data === void 0 ? void 0 : data.Content) !== null && _ref143 !== void 0 ? _ref143 : data === null || data === void 0 ? void 0 : data.overall) !== null && _ref142 !== void 0 ? _ref142 : data === null || data === void 0 ? void 0 : data.summary) !== null && _ref141 !== void 0 ? _ref141 : '').trim();
          normalized = {
            averageRating: Number((_ref144 = (_ref145 = (_ref146 = (_ref147 = (_data$averageRating2 = data === null || data === void 0 ? void 0 : data.averageRating) !== null && _data$averageRating2 !== void 0 ? _data$averageRating2 : data === null || data === void 0 ? void 0 : data.average_rating) !== null && _ref147 !== void 0 ? _ref147 : data === null || data === void 0 ? void 0 : data.AverageRating) !== null && _ref146 !== void 0 ? _ref146 : data === null || data === void 0 ? void 0 : data.rating) !== null && _ref145 !== void 0 ? _ref145 : data === null || data === void 0 ? void 0 : data.score) !== null && _ref144 !== void 0 ? _ref144 : 0),
            totalCount: Number((_ref148 = (_ref149 = (_ref150 = (_ref151 = (_data$totalCount = data === null || data === void 0 ? void 0 : data.totalCount) !== null && _data$totalCount !== void 0 ? _data$totalCount : data === null || data === void 0 ? void 0 : data.total_count) !== null && _ref151 !== void 0 ? _ref151 : data === null || data === void 0 ? void 0 : data.TotalCount) !== null && _ref150 !== void 0 ? _ref150 : data === null || data === void 0 ? void 0 : data.total) !== null && _ref149 !== void 0 ? _ref149 : data === null || data === void 0 ? void 0 : data.reviewCount) !== null && _ref148 !== void 0 ? _ref148 : 0),
            overall: content,
            strengths: Array.isArray(data === null || data === void 0 ? void 0 : data.strengths) ? data.strengths : Array.isArray(data === null || data === void 0 ? void 0 : data.Strengths) ? data.Strengths : Array.isArray(data === null || data === void 0 ? void 0 : data.pros) ? data.pros : Array.isArray(data === null || data === void 0 ? void 0 : data.positives) ? data.positives : Array.isArray(data === null || data === void 0 ? void 0 : data.positive_points) ? data.positive_points : [],
            weaknesses: Array.isArray(data === null || data === void 0 ? void 0 : data.weaknesses) ? data.weaknesses : Array.isArray(data === null || data === void 0 ? void 0 : data.Weaknesses) ? data.Weaknesses : Array.isArray(data === null || data === void 0 ? void 0 : data.cons) ? data.cons : Array.isArray(data === null || data === void 0 ? void 0 : data.negatives) ? data.negatives : Array.isArray(data === null || data === void 0 ? void 0 : data.negative_points) ? data.negative_points : [],
            tags: Array.isArray(data === null || data === void 0 ? void 0 : data.tags) ? data.tags : Array.isArray(data === null || data === void 0 ? void 0 : data.Tags) ? data.Tags : Array.isArray(data === null || data === void 0 ? void 0 : data.keywords) ? data.keywords : []
          };
          if (!content) {
            console.warn('[AI评价摘要] 后端返回 content 为空，可能该商品尚未生成 AI 摘要，productId:', productId);
          }
          return _context3.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, res), {}, {
            data: normalized
          }));
      }
    }, _callee3);
  }));
  return _fetchReviewAiSummary.apply(this, arguments);
}
function replyToReview(_x3) {
  return _replyToReview.apply(this, arguments);
}

/**
 * 获取指定评价的回复评价列表
 * GET /api/v1/review/reply/list
 */
function _replyToReview() {
  _replyToReview = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee4(payload) {
    var body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          body = {
            // 后端要求参数名为 id（与其他评价接口一致）
            id: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.reviewId),
            content: payload.content
          };
          if (payload.parentId !== undefined && payload.parentId !== null && payload.parentId !== '') {
            body.parentId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.parentId);
          }
          _context4.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(reviewApi.reply, body, {}, {}, false);
        case 1:
          res = _context4.v;
          return _context4.a(2, res);
      }
    }, _callee4);
  }));
  return _replyToReview.apply(this, arguments);
}
function fetchReviewReplies() {
  return _fetchReviewReplies.apply(this, arguments);
}

/**
 * 点赞/取消点赞一个评价
 * POST /api/v1/review/like
 * 后端要求参数名为 review_id（snake_case），且必须使用 JSON 格式
 */
function _fetchReviewReplies() {
  _fetchReviewReplies = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee5() {
    var _ref152, _ref153, _ref154, _res$data$list2, _res$data6, _res$data7, _res$data8, _res$data9;
    var params,
      query,
      res,
      list,
      _args5 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
          // 后端要求参数名为 id（与其他评价接口一致）
          query = {
            id: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(params.reviewId)
          };
          if (params.page !== undefined) query.page = params.page;
          if (params.size !== undefined) query.size = params.size;
          _context5.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(reviewApi.replyList, query, {}, false);
        case 1:
          res = _context5.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (_ref152 = (_ref153 = (_ref154 = (_res$data$list2 = res === null || res === void 0 || (_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.list) !== null && _res$data$list2 !== void 0 ? _res$data$list2 : res === null || res === void 0 || (_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : _res$data7.items) !== null && _ref154 !== void 0 ? _ref154 : res === null || res === void 0 || (_res$data8 = res.data) === null || _res$data8 === void 0 ? void 0 : _res$data8.records) !== null && _ref153 !== void 0 ? _ref153 : res === null || res === void 0 || (_res$data9 = res.data) === null || _res$data9 === void 0 ? void 0 : _res$data9.replies) !== null && _ref152 !== void 0 ? _ref152 : [];
          return _context5.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, res), {}, {
            data: list.map(normalizeReviewReply)
          }));
      }
    }, _callee5);
  }));
  return _fetchReviewReplies.apply(this, arguments);
}
function likeReview(_x4) {
  return _likeReview.apply(this, arguments);
}
function _likeReview() {
  _likeReview = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee6(reviewId) {
    var body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          body = {
            review_id: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(reviewId)
          }; // use JSON format (useFormUrlEncoded = false)
          _context6.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(reviewApi.like, body, {}, {}, false, false);
        case 1:
          res = _context6.v;
          return _context6.a(2, res);
      }
    }, _callee6);
  }));
  return _likeReview.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/message/index.ts":
/*!**********************************!*\
  !*** ./src/api/message/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WS_BASE_URL: function() { return /* binding */ WS_BASE_URL; },
/* harmony export */   WS_DIRECT_URL: function() { return /* binding */ WS_DIRECT_URL; },
/* harmony export */   chatApi: function() { return /* binding */ chatApi; },
/* harmony export */   notificationApi: function() { return /* binding */ notificationApi; },
/* harmony export */   serviceApi: function() { return /* binding */ serviceApi; }
/* harmony export */ });
// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
var BACKEND_HOST = 'http://192.168.10.7:8089';
var API_BASE_URL =  false ? 0 : "".concat(BACKEND_HOST, "/api/v1");

// WebSocket 后端直连地址（用于 fallback 或非 H5 环境）
var WS_BACKEND_HOST = 'ws://192.168.10.7:8089';

/**
 * WebSocket 基础 URL 构造：
 * - H5 开发环境：使用相对路径（通过 devServer proxy ws:true 转发）
 * - H5 生产环境：默认使用当前 host + /api/v1/chat/ws（由部署层 nginx 代理）
 *   若代理不通，chatWS 会自动 fallback 到直连后端 WS_DIRECT_URL
 * - 小程序环境：直连后端 WS 地址
 */
var WS_BASE_URL = function () {
  if (false) { var protocol; }

  // 小程序：直连后端
  return "".concat(WS_BACKEND_HOST, "/api/v1/chat/ws");
}();

/**
 * WebSocket 直连后端地址（fallback 用）
 * 当代理方式连接失败时，chatWS 会自动切换到此地址
 */
var WS_DIRECT_URL = "".concat(WS_BACKEND_HOST, "/api/v1/chat/ws");

// 客服会话相关 API（位于 /chat 命名空间下）
var chatApi = {
  // 发起客服会话 POST
  createConversation: "".concat(API_BASE_URL, "/chat/conversations"),
  // 获取会话列表 GET
  conversations: "".concat(API_BASE_URL, "/chat/conversations"),
  // 获取会话消息历史 GET
  messages: "".concat(API_BASE_URL, "/chat/conversations/:id/messages"),
  // 发送消息 POST（也走 WebSocket，HTTP 作为兜底）
  sendMessage: "".concat(API_BASE_URL, "/chat/conversations/:id/messages"),
  // 标记会话已读（用户） POST
  readConversation: "".concat(API_BASE_URL, "/chat/conversations/:id/read")
};

// 通知消息相关 API（保留原有路径）
var notificationApi = {
  list: "".concat(API_BASE_URL, "/notifications"),
  unreadCount: "".concat(API_BASE_URL, "/notifications/unread-count"),
  read: "".concat(API_BASE_URL, "/notifications/:id/read"),
  readAll: "".concat(API_BASE_URL, "/notifications/read-all")
};

// 兼容旧引用（旧页面仍使用 serviceApi，指向 chat 命名空间）
var serviceApi = chatApi;

/***/ }),

/***/ "./src/api/seckill/index.ts":
/*!**********************************!*\
  !*** ./src/api/seckill/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSeckillPurchase: function() { return /* binding */ createSeckillPurchase; },
/* harmony export */   fetchProductSeckillActivity: function() { return /* binding */ fetchProductSeckillActivity; },
/* harmony export */   fetchSeckillActivities: function() { return /* binding */ fetchSeckillActivities; },
/* harmony export */   pollSeckillPurchaseResult: function() { return /* binding */ pollSeckillPurchaseResult; }
/* harmony export */ });
/* unused harmony exports seckillApi, normalizeSeckillProduct, normalizeSeckillActivity, normalizeSeckillPurchase, fetchSeckillPurchaseResult */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");




// ============================================
// 秒杀模块 API
// 端点：
//   GET  /api/v1/seckill/activities            活动列表
//   GET  /api/v1/seckill/activities/products     指定商品活动
//   POST /api/v1/seckill/purchases              购买秒杀商品
//   GET  /api/v1/seckill/purchases              获取购买秒杀商品的结果
// ============================================



// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
// 小程序端不受 CORS 限制，直接使用完整后端地址
var BACKEND_HOST = 'http://192.168.10.7:8089';
var API_BASE_URL =  false ? 0 : "".concat(BACKEND_HOST, "/api/v1");

// ==================== URL 常量 ====================
var seckillApi = {
  // 秒杀活动列表 GET
  activities: "".concat(API_BASE_URL, "/seckill/activities"),
  // 指定商品活动 GET（query: productId / activityId）
  activityProducts: "".concat(API_BASE_URL, "/seckill/activities/products"),
  // 购买秒杀商品 POST / 获取购买结果 GET（共用同一路径）
  purchases: "".concat(API_BASE_URL, "/seckill/purchases")
};

// ==================== 数据转换 ====================

/**
 * 秒杀商品数据规范化：兼容 snake_case / PascalCase / camelCase 字段名
 */
function normalizeSeckillProduct(raw) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _raw$image, _ref7, _ref8, _ref9, _ref0, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _raw$originalPrice, _ref15, _ref16, _firstSku$original_pr, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _raw$seckillPrice, _ref29, _ref30, _firstSku$seckill_pri, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _ref40, _ref41, _ref42, _raw$stock, _ref43, _ref44, _firstSku$remaining_s, _ref45, _ref46, _ref47, _ref48, _ref49, _ref50, _ref51, _raw$soldCount, _ref52, _ref53, _raw$soldPercent, _ref54, _ref55, _ref56, _ref57, _ref58, _raw$id, _ref59, _ref60, _ref61, _ref62, _ref63, _ref64, _raw$productId, _ref65, _ref66, _ref67, _ref68, _ref69, _ref70, _raw$productName, _ref71, _ref72, _ref73, _ref74, _ref75, _raw$limitCount, _ref76, _ref77, _ref78, _raw$skuId, _ref79, _ref80, _firstSku$sku_id, _ref81, _ref82, _ref83, _ref84, _raw$seckillSkuPriceI, _ref85, _ref86, _firstSku$seckill_sku, _ref87, _ref88, _ref89, _raw$activityId;
  // 处理图片：兼容单个 image 字段和 images 数组
  var image = (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_raw$image = raw.image) !== null && _raw$image !== void 0 ? _raw$image : raw.Image) !== null && _ref6 !== void 0 ? _ref6 : raw.imageUrl) !== null && _ref5 !== void 0 ? _ref5 : raw.image_url) !== null && _ref4 !== void 0 ? _ref4 : raw.ImageUrl) !== null && _ref3 !== void 0 ? _ref3 : raw.pic) !== null && _ref2 !== void 0 ? _ref2 : raw.Pic) !== null && _ref !== void 0 ? _ref : '';
  if (!image && Array.isArray(raw.images) && raw.images.length > 0) {
    image = raw.images[0];
  }
  if (!image && Array.isArray(raw.Images) && raw.Images.length > 0) {
    image = raw.Images[0];
  }

  // 兼容 SKU 数组结构：从 skus[0] 读取价格和库存
  var firstSku = Array.isArray(raw.skus) && raw.skus.length > 0 ? raw.skus[0] : null;

  // 兼容更多价格字段
  var originalPrice = Number((_ref7 = (_ref8 = (_ref9 = (_ref0 = (_ref1 = (_ref10 = (_ref11 = (_ref12 = (_ref13 = (_ref14 = (_raw$originalPrice = raw.originalPrice) !== null && _raw$originalPrice !== void 0 ? _raw$originalPrice : raw.original_price) !== null && _ref14 !== void 0 ? _ref14 : raw.OriginalPrice) !== null && _ref13 !== void 0 ? _ref13 : raw.marketPrice) !== null && _ref12 !== void 0 ? _ref12 : raw.market_price) !== null && _ref11 !== void 0 ? _ref11 : raw.MarketPrice) !== null && _ref10 !== void 0 ? _ref10 : raw.original_price_cents) !== null && _ref1 !== void 0 ? _ref1 : raw.price_original) !== null && _ref0 !== void 0 ? _ref0 : raw.minPrice) !== null && _ref9 !== void 0 ? _ref9 : raw.min_price) !== null && _ref8 !== void 0 ? _ref8 : raw.MinPrice) !== null && _ref7 !== void 0 ? _ref7 : firstSku ? (_ref15 = (_ref16 = (_firstSku$original_pr = firstSku.original_price) !== null && _firstSku$original_pr !== void 0 ? _firstSku$original_pr : firstSku.originalPrice) !== null && _ref16 !== void 0 ? _ref16 : firstSku.price) !== null && _ref15 !== void 0 ? _ref15 : 0 : 0);
  var seckillPrice = Number((_ref17 = (_ref18 = (_ref19 = (_ref20 = (_ref21 = (_ref22 = (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_ref27 = (_ref28 = (_raw$seckillPrice = raw.seckillPrice) !== null && _raw$seckillPrice !== void 0 ? _raw$seckillPrice : raw.seckill_price) !== null && _ref28 !== void 0 ? _ref28 : raw.SeckillPrice) !== null && _ref27 !== void 0 ? _ref27 : raw.price) !== null && _ref26 !== void 0 ? _ref26 : raw.Price) !== null && _ref25 !== void 0 ? _ref25 : raw.salePrice) !== null && _ref24 !== void 0 ? _ref24 : raw.sale_price) !== null && _ref23 !== void 0 ? _ref23 : raw.seckill_price_cents) !== null && _ref22 !== void 0 ? _ref22 : raw.price_seckill) !== null && _ref21 !== void 0 ? _ref21 : raw.currentPrice) !== null && _ref20 !== void 0 ? _ref20 : raw.current_price) !== null && _ref19 !== void 0 ? _ref19 : raw.discountPrice) !== null && _ref18 !== void 0 ? _ref18 : raw.discount_price) !== null && _ref17 !== void 0 ? _ref17 : firstSku ? (_ref29 = (_ref30 = (_firstSku$seckill_pri = firstSku.seckill_price) !== null && _firstSku$seckill_pri !== void 0 ? _firstSku$seckill_pri : firstSku.seckillPrice) !== null && _ref30 !== void 0 ? _ref30 : firstSku.price) !== null && _ref29 !== void 0 ? _ref29 : 0 : 0);
  var stock = Number((_ref31 = (_ref32 = (_ref33 = (_ref34 = (_ref35 = (_ref36 = (_ref37 = (_ref38 = (_ref39 = (_ref40 = (_ref41 = (_ref42 = (_raw$stock = raw.stock) !== null && _raw$stock !== void 0 ? _raw$stock : raw.Stock) !== null && _ref42 !== void 0 ? _ref42 : raw.totalStock) !== null && _ref41 !== void 0 ? _ref41 : raw.total_stock) !== null && _ref40 !== void 0 ? _ref40 : raw.TotalStock) !== null && _ref39 !== void 0 ? _ref39 : raw.inventory) !== null && _ref38 !== void 0 ? _ref38 : raw.inventory) !== null && _ref37 !== void 0 ? _ref37 : raw.Inventory) !== null && _ref36 !== void 0 ? _ref36 : raw.availableStock) !== null && _ref35 !== void 0 ? _ref35 : raw.available_stock) !== null && _ref34 !== void 0 ? _ref34 : raw.remainingStock) !== null && _ref33 !== void 0 ? _ref33 : raw.remaining_stock) !== null && _ref32 !== void 0 ? _ref32 : raw.RemainingStock) !== null && _ref31 !== void 0 ? _ref31 : firstSku ? (_ref43 = (_ref44 = (_firstSku$remaining_s = firstSku.remaining_stock) !== null && _firstSku$remaining_s !== void 0 ? _firstSku$remaining_s : firstSku.stock) !== null && _ref44 !== void 0 ? _ref44 : firstSku.remainingStock) !== null && _ref43 !== void 0 ? _ref43 : 0 : 0);
  var soldCount = Number((_ref45 = (_ref46 = (_ref47 = (_ref48 = (_ref49 = (_ref50 = (_ref51 = (_raw$soldCount = raw.soldCount) !== null && _raw$soldCount !== void 0 ? _raw$soldCount : raw.sold_count) !== null && _ref51 !== void 0 ? _ref51 : raw.SoldCount) !== null && _ref50 !== void 0 ? _ref50 : raw.sold) !== null && _ref49 !== void 0 ? _ref49 : raw.Sold) !== null && _ref48 !== void 0 ? _ref48 : raw.sales) !== null && _ref47 !== void 0 ? _ref47 : raw.salesVolume) !== null && _ref46 !== void 0 ? _ref46 : raw.sales_volume) !== null && _ref45 !== void 0 ? _ref45 : 0);

  // 已售百分比（后端没返回时本地计算）
  var soldPercent = (_ref52 = (_ref53 = (_raw$soldPercent = raw.soldPercent) !== null && _raw$soldPercent !== void 0 ? _raw$soldPercent : raw.sold_percent) !== null && _ref53 !== void 0 ? _ref53 : raw.SoldPercent) !== null && _ref52 !== void 0 ? _ref52 : stock > 0 ? Math.round(soldCount / (stock + soldCount) * 100) : 0;
  return {
    id: (_ref54 = (_ref55 = (_ref56 = (_ref57 = (_ref58 = (_raw$id = raw.id) !== null && _raw$id !== void 0 ? _raw$id : raw.Id) !== null && _ref58 !== void 0 ? _ref58 : raw.ID) !== null && _ref57 !== void 0 ? _ref57 : raw.productId) !== null && _ref56 !== void 0 ? _ref56 : raw.product_id) !== null && _ref55 !== void 0 ? _ref55 : raw.ProductId) !== null && _ref54 !== void 0 ? _ref54 : '',
    productId: (_ref59 = (_ref60 = (_ref61 = (_ref62 = (_ref63 = (_ref64 = (_raw$productId = raw.productId) !== null && _raw$productId !== void 0 ? _raw$productId : raw.product_id) !== null && _ref64 !== void 0 ? _ref64 : raw.ProductId) !== null && _ref63 !== void 0 ? _ref63 : raw.ProductID) !== null && _ref62 !== void 0 ? _ref62 : raw.pid) !== null && _ref61 !== void 0 ? _ref61 : raw.Pid) !== null && _ref60 !== void 0 ? _ref60 : raw.id) !== null && _ref59 !== void 0 ? _ref59 : '',
    productName: (_ref65 = (_ref66 = (_ref67 = (_ref68 = (_ref69 = (_ref70 = (_raw$productName = raw.productName) !== null && _raw$productName !== void 0 ? _raw$productName : raw.product_name) !== null && _ref70 !== void 0 ? _ref70 : raw.ProductName) !== null && _ref69 !== void 0 ? _ref69 : raw.name) !== null && _ref68 !== void 0 ? _ref68 : raw.Name) !== null && _ref67 !== void 0 ? _ref67 : raw.title) !== null && _ref66 !== void 0 ? _ref66 : raw.Title) !== null && _ref65 !== void 0 ? _ref65 : '',
    image: image,
    originalPrice: originalPrice,
    seckillPrice: seckillPrice,
    stock: stock,
    soldCount: soldCount,
    soldPercent: soldPercent,
    limitCount: Number((_ref71 = (_ref72 = (_ref73 = (_ref74 = (_ref75 = (_raw$limitCount = raw.limitCount) !== null && _raw$limitCount !== void 0 ? _raw$limitCount : raw.limit_count) !== null && _ref75 !== void 0 ? _ref75 : raw.LimitCount) !== null && _ref74 !== void 0 ? _ref74 : raw.buyLimit) !== null && _ref73 !== void 0 ? _ref73 : raw.buy_limit) !== null && _ref72 !== void 0 ? _ref72 : raw.BuyLimit) !== null && _ref71 !== void 0 ? _ref71 : 1),
    skuId: (_ref76 = (_ref77 = (_ref78 = (_raw$skuId = raw.skuId) !== null && _raw$skuId !== void 0 ? _raw$skuId : raw.sku_id) !== null && _ref78 !== void 0 ? _ref78 : raw.SkuId) !== null && _ref77 !== void 0 ? _ref77 : raw.skuID) !== null && _ref76 !== void 0 ? _ref76 : firstSku ? (_ref79 = (_ref80 = (_firstSku$sku_id = firstSku.sku_id) !== null && _firstSku$sku_id !== void 0 ? _firstSku$sku_id : firstSku.skuId) !== null && _ref80 !== void 0 ? _ref80 : firstSku.id) !== null && _ref79 !== void 0 ? _ref79 : '' : '',
    seckillSkuPriceId: (_ref81 = (_ref82 = (_ref83 = (_ref84 = (_raw$seckillSkuPriceI = raw.seckillSkuPriceId) !== null && _raw$seckillSkuPriceI !== void 0 ? _raw$seckillSkuPriceI : raw.seckill_sku_price_id) !== null && _ref84 !== void 0 ? _ref84 : raw.SeckillSKUPriceID) !== null && _ref83 !== void 0 ? _ref83 : raw.SeckillSkuPriceId) !== null && _ref82 !== void 0 ? _ref82 : raw.seckillSkuPriceID) !== null && _ref81 !== void 0 ? _ref81 : firstSku ? (_ref85 = (_ref86 = (_firstSku$seckill_sku = firstSku.seckill_sku_price_id) !== null && _firstSku$seckill_sku !== void 0 ? _firstSku$seckill_sku : firstSku.seckillSkuPriceId) !== null && _ref86 !== void 0 ? _ref86 : firstSku.SeckillSKUPriceID) !== null && _ref85 !== void 0 ? _ref85 : '' : '',
    activityId: (_ref87 = (_ref88 = (_ref89 = (_raw$activityId = raw.activityId) !== null && _raw$activityId !== void 0 ? _raw$activityId : raw.activity_id) !== null && _ref89 !== void 0 ? _ref89 : raw.ActivityId) !== null && _ref88 !== void 0 ? _ref88 : raw.ActivityID) !== null && _ref87 !== void 0 ? _ref87 : '',
    // 附加原始数据，供页面需要时使用
    raw: raw
  };
}

/**
 * 秒杀活动数据规范化：兼容 snake_case / PascalCase / camelCase 字段名
 */
function normalizeSeckillActivity(raw) {
  var _ref90, _ref91, _ref92, _ref93, _ref94, _ref95, _raw$id2, _ref96, _ref97, _ref98, _ref99, _ref100, _ref101, _raw$name, _ref102, _ref103, _ref104, _raw$status, _ref105, _ref106, _ref107, _ref108, _raw$startTime, _ref109, _ref110, _ref111, _ref112, _raw$endTime;
  var products = Array.isArray(raw.products) ? raw.products : Array.isArray(raw.Products) ? raw.Products : Array.isArray(raw.items) ? raw.items : Array.isArray(raw.productList) ? raw.productList : [];
  return {
    id: (_ref90 = (_ref91 = (_ref92 = (_ref93 = (_ref94 = (_ref95 = (_raw$id2 = raw.id) !== null && _raw$id2 !== void 0 ? _raw$id2 : raw.Id) !== null && _ref95 !== void 0 ? _ref95 : raw.ID) !== null && _ref94 !== void 0 ? _ref94 : raw.activityId) !== null && _ref93 !== void 0 ? _ref93 : raw.activity_id) !== null && _ref92 !== void 0 ? _ref92 : raw.ActivityId) !== null && _ref91 !== void 0 ? _ref91 : raw.ActivityID) !== null && _ref90 !== void 0 ? _ref90 : '',
    name: (_ref96 = (_ref97 = (_ref98 = (_ref99 = (_ref100 = (_ref101 = (_raw$name = raw.name) !== null && _raw$name !== void 0 ? _raw$name : raw.Name) !== null && _ref101 !== void 0 ? _ref101 : raw.title) !== null && _ref100 !== void 0 ? _ref100 : raw.Title) !== null && _ref99 !== void 0 ? _ref99 : raw.activityName) !== null && _ref98 !== void 0 ? _ref98 : raw.activity_name) !== null && _ref97 !== void 0 ? _ref97 : raw.ActivityName) !== null && _ref96 !== void 0 ? _ref96 : '限时秒杀',
    status: (_ref102 = (_ref103 = (_ref104 = (_raw$status = raw.status) !== null && _raw$status !== void 0 ? _raw$status : raw.Status) !== null && _ref104 !== void 0 ? _ref104 : raw.activityStatus) !== null && _ref103 !== void 0 ? _ref103 : raw.activity_status) !== null && _ref102 !== void 0 ? _ref102 : 'active',
    startTime: (_ref105 = (_ref106 = (_ref107 = (_ref108 = (_raw$startTime = raw.startTime) !== null && _raw$startTime !== void 0 ? _raw$startTime : raw.start_time) !== null && _ref108 !== void 0 ? _ref108 : raw.StartTime) !== null && _ref107 !== void 0 ? _ref107 : raw.beginTime) !== null && _ref106 !== void 0 ? _ref106 : raw.begin_time) !== null && _ref105 !== void 0 ? _ref105 : '',
    endTime: (_ref109 = (_ref110 = (_ref111 = (_ref112 = (_raw$endTime = raw.endTime) !== null && _raw$endTime !== void 0 ? _raw$endTime : raw.end_time) !== null && _ref112 !== void 0 ? _ref112 : raw.EndTime) !== null && _ref111 !== void 0 ? _ref111 : raw.finishTime) !== null && _ref110 !== void 0 ? _ref110 : raw.finish_time) !== null && _ref109 !== void 0 ? _ref109 : '',
    products: products.map(normalizeSeckillProduct)
  };
}

/**
 * 秒杀购买结果数据规范化：兼容 snake_case / PascalCase / camelCase 字段名
 */
function normalizeSeckillPurchase(raw) {
  var _ref113, _ref114, _ref115, _ref116, _raw$status2, _ref117, _ref118, _ref119, _ref120, _ref121, _ref122, _ref123, _raw$id3, _ref124, _ref125, _ref126, _ref127, _raw$purchaseId, _ref128, _ref129, _ref130, _ref131, _ref132, _ref133, _raw$orderId, _ref134, _ref135, _ref136, _raw$activityId2, _ref137, _ref138, _ref139, _raw$productId2, _ref140, _ref141, _raw$skuId2, _ref142, _ref143, _ref144, _ref145, _raw$quantity, _ref146, _ref147, _ref148, _ref149, _raw$seckillPrice2, _ref150, _ref151, _ref152, _ref153, _ref154, _ref155, _raw$totalAmount, _ref156, _ref157, _ref158, _ref159, _raw$statusText, _ref160, _ref161, _ref162, _ref163, _ref164, _raw$message, _ref165, _ref166, _ref167, _ref168, _ref169, _raw$createdAt, _ref170, _ref171, _ref172, _ref173, _ref174, _raw$paidAt;
  var rawStatus = (_ref113 = (_ref114 = (_ref115 = (_ref116 = (_raw$status2 = raw.status) !== null && _raw$status2 !== void 0 ? _raw$status2 : raw.Status) !== null && _ref116 !== void 0 ? _ref116 : raw.purchaseStatus) !== null && _ref115 !== void 0 ? _ref115 : raw.purchase_status) !== null && _ref114 !== void 0 ? _ref114 : raw.result) !== null && _ref113 !== void 0 ? _ref113 : raw.Result;
  var status = rawStatus;
  var statusCode = null;
  if (typeof rawStatus === 'number') {
    var _numericMap$rawStatus;
    statusCode = rawStatus;
    // 0:处理中 1:成功 2:失败 3:已取消
    var numericMap = {
      0: 'processing',
      1: 'success',
      2: 'failed',
      3: 'cancelled'
    };
    status = (_numericMap$rawStatus = numericMap[rawStatus]) !== null && _numericMap$rawStatus !== void 0 ? _numericMap$rawStatus : 'processing';
  }
  var statusTextMap = {
    'processing': '处理中',
    'pending': '处理中',
    'success': '成功',
    'succeeded': '成功',
    'paid': '成功',
    'failed': '失败',
    'cancelled': '已取消',
    'canceled': '已取消',
    'out_of_stock': '售罄',
    'out-of-stock': '售罄',
    'sold_out': '售罄'
  };
  return {
    id: (_ref117 = (_ref118 = (_ref119 = (_ref120 = (_ref121 = (_ref122 = (_ref123 = (_raw$id3 = raw.id) !== null && _raw$id3 !== void 0 ? _raw$id3 : raw.Id) !== null && _ref123 !== void 0 ? _ref123 : raw.ID) !== null && _ref122 !== void 0 ? _ref122 : raw.purchaseId) !== null && _ref121 !== void 0 ? _ref121 : raw.purchase_id) !== null && _ref120 !== void 0 ? _ref120 : raw.PurchaseId) !== null && _ref119 !== void 0 ? _ref119 : raw.orderId) !== null && _ref118 !== void 0 ? _ref118 : raw.order_id) !== null && _ref117 !== void 0 ? _ref117 : '',
    purchaseId: (_ref124 = (_ref125 = (_ref126 = (_ref127 = (_raw$purchaseId = raw.purchaseId) !== null && _raw$purchaseId !== void 0 ? _raw$purchaseId : raw.purchase_id) !== null && _ref127 !== void 0 ? _ref127 : raw.PurchaseId) !== null && _ref126 !== void 0 ? _ref126 : raw.id) !== null && _ref125 !== void 0 ? _ref125 : raw.Id) !== null && _ref124 !== void 0 ? _ref124 : '',
    orderId: (_ref128 = (_ref129 = (_ref130 = (_ref131 = (_ref132 = (_ref133 = (_raw$orderId = raw.orderId) !== null && _raw$orderId !== void 0 ? _raw$orderId : raw.order_id) !== null && _ref133 !== void 0 ? _ref133 : raw.OrderId) !== null && _ref132 !== void 0 ? _ref132 : raw.OrderID) !== null && _ref131 !== void 0 ? _ref131 : raw.orderNo) !== null && _ref130 !== void 0 ? _ref130 : raw.order_no) !== null && _ref129 !== void 0 ? _ref129 : raw.OrderNo) !== null && _ref128 !== void 0 ? _ref128 : '',
    activityId: (_ref134 = (_ref135 = (_ref136 = (_raw$activityId2 = raw.activityId) !== null && _raw$activityId2 !== void 0 ? _raw$activityId2 : raw.activity_id) !== null && _ref136 !== void 0 ? _ref136 : raw.ActivityId) !== null && _ref135 !== void 0 ? _ref135 : raw.ActivityID) !== null && _ref134 !== void 0 ? _ref134 : '',
    productId: (_ref137 = (_ref138 = (_ref139 = (_raw$productId2 = raw.productId) !== null && _raw$productId2 !== void 0 ? _raw$productId2 : raw.product_id) !== null && _ref139 !== void 0 ? _ref139 : raw.ProductId) !== null && _ref138 !== void 0 ? _ref138 : raw.ProductID) !== null && _ref137 !== void 0 ? _ref137 : '',
    skuId: (_ref140 = (_ref141 = (_raw$skuId2 = raw.skuId) !== null && _raw$skuId2 !== void 0 ? _raw$skuId2 : raw.sku_id) !== null && _ref141 !== void 0 ? _ref141 : raw.SkuId) !== null && _ref140 !== void 0 ? _ref140 : '',
    quantity: Number((_ref142 = (_ref143 = (_ref144 = (_ref145 = (_raw$quantity = raw.quantity) !== null && _raw$quantity !== void 0 ? _raw$quantity : raw.Quantity) !== null && _ref145 !== void 0 ? _ref145 : raw.count) !== null && _ref144 !== void 0 ? _ref144 : raw.Count) !== null && _ref143 !== void 0 ? _ref143 : raw.num) !== null && _ref142 !== void 0 ? _ref142 : 1),
    seckillPrice: Number((_ref146 = (_ref147 = (_ref148 = (_ref149 = (_raw$seckillPrice2 = raw.seckillPrice) !== null && _raw$seckillPrice2 !== void 0 ? _raw$seckillPrice2 : raw.seckill_price) !== null && _ref149 !== void 0 ? _ref149 : raw.SeckillPrice) !== null && _ref148 !== void 0 ? _ref148 : raw.price) !== null && _ref147 !== void 0 ? _ref147 : raw.Price) !== null && _ref146 !== void 0 ? _ref146 : 0),
    totalAmount: Number((_ref150 = (_ref151 = (_ref152 = (_ref153 = (_ref154 = (_ref155 = (_raw$totalAmount = raw.totalAmount) !== null && _raw$totalAmount !== void 0 ? _raw$totalAmount : raw.total_amount) !== null && _ref155 !== void 0 ? _ref155 : raw.TotalAmount) !== null && _ref154 !== void 0 ? _ref154 : raw.amount) !== null && _ref153 !== void 0 ? _ref153 : raw.Amount) !== null && _ref152 !== void 0 ? _ref152 : raw.payAmount) !== null && _ref151 !== void 0 ? _ref151 : raw.pay_amount) !== null && _ref150 !== void 0 ? _ref150 : 0),
    status: status,
    statusCode: statusCode,
    statusText: (_ref156 = (_ref157 = (_ref158 = (_ref159 = (_raw$statusText = raw.statusText) !== null && _raw$statusText !== void 0 ? _raw$statusText : raw.status_text) !== null && _ref159 !== void 0 ? _ref159 : raw.StatusText) !== null && _ref158 !== void 0 ? _ref158 : statusTextMap[status]) !== null && _ref157 !== void 0 ? _ref157 : status) !== null && _ref156 !== void 0 ? _ref156 : '',
    message: (_ref160 = (_ref161 = (_ref162 = (_ref163 = (_ref164 = (_raw$message = raw.message) !== null && _raw$message !== void 0 ? _raw$message : raw.Message) !== null && _ref164 !== void 0 ? _ref164 : raw.msg) !== null && _ref163 !== void 0 ? _ref163 : raw.Msg) !== null && _ref162 !== void 0 ? _ref162 : raw.remark) !== null && _ref161 !== void 0 ? _ref161 : raw.Remark) !== null && _ref160 !== void 0 ? _ref160 : '',
    createdAt: (_ref165 = (_ref166 = (_ref167 = (_ref168 = (_ref169 = (_raw$createdAt = raw.createdAt) !== null && _raw$createdAt !== void 0 ? _raw$createdAt : raw.created_at) !== null && _ref169 !== void 0 ? _ref169 : raw.CreatedAt) !== null && _ref168 !== void 0 ? _ref168 : raw.createTime) !== null && _ref167 !== void 0 ? _ref167 : raw.create_time) !== null && _ref166 !== void 0 ? _ref166 : raw.CreateTime) !== null && _ref165 !== void 0 ? _ref165 : '',
    paidAt: (_ref170 = (_ref171 = (_ref172 = (_ref173 = (_ref174 = (_raw$paidAt = raw.paidAt) !== null && _raw$paidAt !== void 0 ? _raw$paidAt : raw.paid_at) !== null && _ref174 !== void 0 ? _ref174 : raw.PaidAt) !== null && _ref173 !== void 0 ? _ref173 : raw.payTime) !== null && _ref172 !== void 0 ? _ref172 : raw.pay_time) !== null && _ref171 !== void 0 ? _ref171 : raw.PayTime) !== null && _ref170 !== void 0 ? _ref170 : ''
  };
}

// ==================== API 方法 ====================

/**
 * 获取秒杀活动列表
 * GET /api/v1/seckill/activities
 * @param params 可选：status / page / size（page/size 默认 1/20）
 */
function fetchSeckillActivities() {
  return _fetchSeckillActivities.apply(this, arguments);
}

/**
 * 获取指定商品的秒杀活动
 * GET /api/v1/seckill/activities/products
 * @param params productId 商品ID（可选），activityId 活动ID（可选）
 * 至少需要一个参数
 */
function _fetchSeckillActivities() {
  _fetchSeckillActivities = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee() {
    var _params$page, _params$size;
    var params,
      query,
      res,
      list,
      _ref175,
      _ref176,
      _ref177,
      _res$data$list,
      _args = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          query = {
            page: (_params$page = params.page) !== null && _params$page !== void 0 ? _params$page : 1,
            size: (_params$size = params.size) !== null && _params$size !== void 0 ? _params$size : 20
          };
          if (params.status !== undefined) query.status = params.status;
          _context.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(seckillApi.activities, query);
        case 1:
          res = _context.v;
          // 兼容返回结构：可能是单个活动对象、活动数组、或 {list/records}
          list = [];
          if (Array.isArray(res === null || res === void 0 ? void 0 : res.data)) {
            list = res.data;
          } else if (res !== null && res !== void 0 && res.data && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_3__["default"])(res.data) === 'object') {
            // 单个活动对象（含 products）
            if (res.data.products || res.data.Products || res.data.items) {
              list = [res.data];
            } else {
              list = (_ref175 = (_ref176 = (_ref177 = (_res$data$list = res.data.list) !== null && _res$data$list !== void 0 ? _res$data$list : res.data.items) !== null && _ref177 !== void 0 ? _ref177 : res.data.records) !== null && _ref176 !== void 0 ? _ref176 : res.data.activities) !== null && _ref175 !== void 0 ? _ref175 : [];
              if (!Array.isArray(list)) list = [];
            }
          }
          return _context.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: list.map(normalizeSeckillActivity)
          }));
      }
    }, _callee);
  }));
  return _fetchSeckillActivities.apply(this, arguments);
}
function fetchProductSeckillActivity(_x) {
  return _fetchProductSeckillActivity.apply(this, arguments);
}

/**
 * 购买秒杀商品
 * POST /api/v1/seckill/purchases
 * 后端 Go 结构体 JSON tag 为 camelCase（错误消息用 PascalCase 字段名）：
 *   activityId(required) / productId(required) / seckillSkuPriceId(required) / storeId(required)
 *   skuId / quantity / addressId / paymentMethod
 * 所有数字字段为 uint64，binding:"required" 拒绝零值 0，需用 JSON 提交保留数字类型
 */
function _fetchProductSeckillActivity() {
  _fetchProductSeckillActivity = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee2(params) {
    var query, res, data;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          query = {}; // 兼容 camelCase 和 snake_case 参数名
          if (params.productId !== undefined && params.productId !== '' && params.productId !== null) {
            query.productId = params.productId;
            query.product_id = params.productId;
          }
          if (params.activityId !== undefined && params.activityId !== '' && params.activityId !== null) {
            query.activityId = params.activityId;
            query.activity_id = params.activityId;
          }
          _context2.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(seckillApi.activityProducts, query);
        case 1:
          res = _context2.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context2.n = 4;
            break;
          }
          // 返回可能是单个商品活动对象或数组
          data = res.data;
          if (!Array.isArray(data)) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: data.map(normalizeSeckillProduct)
          }));
        case 2:
          if (!(data.products || data.Products)) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: normalizeSeckillActivity(data)
          }));
        case 3:
          return _context2.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: normalizeSeckillProduct(data)
          }));
        case 4:
          return _context2.a(2, res);
      }
    }, _callee2);
  }));
  return _fetchProductSeckillActivity.apply(this, arguments);
}
function createSeckillPurchase(_x2) {
  return _createSeckillPurchase.apply(this, arguments);
}

/**
 * 获取秒杀购买结果
 * GET /api/v1/seckill/purchases
 * @param params id / purchaseId / orderId 任一即可
 */
function _createSeckillPurchase() {
  _createSeckillPurchase = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee3(payload) {
    var body, res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          body = {
            activityId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.activityId),
            productId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.productId),
            seckillSkuPriceId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.seckillSkuPriceId),
            storeId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.storeId),
            skuId: (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.skuId),
            quantity: payload.quantity
          };
          if (payload.addressId !== undefined) body.addressId = (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.toNumericId)(payload.addressId);
          if (payload.paymentMethod !== undefined) body.paymentMethod = payload.paymentMethod;
          console.log('[秒杀购买] 请求体:', JSON.stringify(body));
          _context3.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(seckillApi.purchases, body, {}, {}, false);
        case 1:
          res = _context3.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: normalizeSeckillPurchase(res.data)
          }));
        case 2:
          return _context3.a(2, res);
      }
    }, _callee3);
  }));
  return _createSeckillPurchase.apply(this, arguments);
}
function fetchSeckillPurchaseResult(_x3) {
  return _fetchSeckillPurchaseResult.apply(this, arguments);
}

/**
 * 轮询获取秒杀购买结果（秒杀通常为异步扣减库存）
 * @param purchaseId 购买记录ID
 * @param options.interval 轮询间隔(ms)，默认 1500
 * @param options.timeout  超时时间(ms)，默认 15000
 * @returns 最终购买结果（status 为 success/failed 等终态时返回）
 */
function _fetchSeckillPurchaseResult() {
  _fetchSeckillPurchaseResult = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee4(params) {
    var query, res, data;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          query = {};
          if (params.id !== undefined) query.id = params.id;
          if (params.purchaseId !== undefined) query.purchaseId = params.purchaseId;
          if (params.orderId !== undefined) query.orderId = params.orderId;
          _context4.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(seckillApi.purchases, query);
        case 1:
          res = _context4.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context4.n = 3;
            break;
          }
          data = res.data;
          if (!Array.isArray(data)) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: data.map(normalizeSeckillPurchase)
          }));
        case 2:
          return _context4.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, res), {}, {
            data: normalizeSeckillPurchase(data)
          }));
        case 3:
          return _context4.a(2, res);
      }
    }, _callee4);
  }));
  return _fetchSeckillPurchaseResult.apply(this, arguments);
}
function pollSeckillPurchaseResult(_x4) {
  return _pollSeckillPurchaseResult.apply(this, arguments);
}
function _pollSeckillPurchaseResult() {
  _pollSeckillPurchaseResult = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee6(purchaseId) {
    var _options$interval, _options$timeout;
    var options,
      interval,
      timeout,
      startTime,
      _args6 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          interval = (_options$interval = options.interval) !== null && _options$interval !== void 0 ? _options$interval : 1500;
          timeout = (_options$timeout = options.timeout) !== null && _options$timeout !== void 0 ? _options$timeout : 15000;
          startTime = Date.now();
          return _context6.a(2, new Promise(function (resolve, reject) {
            var _poll = /*#__PURE__*/function () {
              var _ref178 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().m(function _callee5() {
                var _res$data, _result$status, res, result, status, isTerminal, _t;
                return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])().w(function (_context5) {
                  while (1) switch (_context5.p = _context5.n) {
                    case 0:
                      if (!(Date.now() - startTime > timeout)) {
                        _context5.n = 1;
                        break;
                      }
                      reject(new Error('秒杀结果查询超时，请稍后在订单中查看'));
                      return _context5.a(2);
                    case 1:
                      _context5.p = 1;
                      _context5.n = 2;
                      return fetchSeckillPurchaseResult({
                        purchaseId: purchaseId
                      });
                    case 2:
                      res = _context5.v;
                      result = (_res$data = res === null || res === void 0 ? void 0 : res.data) !== null && _res$data !== void 0 ? _res$data : {};
                      status = String((_result$status = result.status) !== null && _result$status !== void 0 ? _result$status : ''); // 终态：成功 / 失败 / 取消 / 售罄
                      isTerminal = ['success', 'succeeded', 'paid', 'failed', 'cancelled', 'canceled', 'out_of_stock', 'out-of-stock', 'sold_out'].includes(status);
                      if (isTerminal) {
                        resolve(result);
                      } else {
                        setTimeout(_poll, interval);
                      }
                      _context5.n = 4;
                      break;
                    case 3:
                      _context5.p = 3;
                      _t = _context5.v;
                      reject(_t);
                    case 4:
                      return _context5.a(2);
                  }
                }, _callee5, null, [[1, 3]]);
              }));
              return function poll() {
                return _ref178.apply(this, arguments);
              };
            }();
            _poll();
          }));
      }
    }, _callee6);
  }));
  return _pollSeckillPurchaseResult.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/user/index.ts":
/*!*******************************!*\
  !*** ./src/api/user/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authApi: function() { return /* binding */ authApi; },
/* harmony export */   claimCoupon: function() { return /* binding */ claimCoupon; },
/* harmony export */   fetchAvailableCoupons: function() { return /* binding */ fetchAvailableCoupons; },
/* harmony export */   fetchMyCoupons: function() { return /* binding */ fetchMyCoupons; },
/* harmony export */   userApi: function() { return /* binding */ userApi; }
/* harmony export */ });
/* unused harmony exports couponApi, normalizeCoupon */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");




// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
// 小程序端不受 CORS 限制，直接使用完整后端地址

var BACKEND_HOST = 'http://192.168.10.7:8089';
var API_BASE_URL =  false ? 0 : "".concat(BACKEND_HOST, "/api/v1");
var authApi = {
  register: "".concat(API_BASE_URL, "/auth/register"),
  // 注册接口
  registerSendCode: "".concat(API_BASE_URL, "/auth/registerofsendcode"),
  // 发送验证码
  login: "".concat(API_BASE_URL, "/auth/login"),
  // 登录接口
  wechatLogin: "".concat(API_BASE_URL, "/auth/weixinlogin"),
  // 微信登录接口
  wechatPhone: "".concat(API_BASE_URL, "/auth/weixinphone"),
  // 获取微信手机号接口
  setPassword: "".concat(API_BASE_URL, "/auth/setpassword"),
  // 设置密码（微信登录绑定手机号后）
  // 重置密码 1：发送验证码 POST /api/v1/auth/resetpassword/sendcode，JSON { phone }
  resetPasswordSendCode: "".concat(API_BASE_URL, "/auth/resetpassword/sendcode"),
  // 重置密码 2：校验验证码并设置新密码 POST /api/v1/auth/resetpassword/reset，JSON { phone, code, password }
  resetPassword: "".concat(API_BASE_URL, "/auth/resetpassword/reset")
};
var userApi = {
  profile: "".concat(API_BASE_URL, "/user/profile"),
  // GET 获取用户信息 / POST 修改用户信息
  updateProfile: "".concat(API_BASE_URL, "/user/profile"),
  // POST 修改用户信息（显式别名）
  upload: "".concat(API_BASE_URL, "/user/upload") // POST 上传图片（multipart/form-data）
};
var couponApi = {
  available: "".concat(API_BASE_URL, "/coupons/available"),
  // GET 可领取优惠券列表
  mine: "".concat(API_BASE_URL, "/coupons/mine"),
  // GET 我的优惠券列表
  claim: "".concat(API_BASE_URL, "/coupons/:id/claim") // POST 领取优惠券
};

// ==================== 优惠券数据规范化 ====================

/**
 * 安全的数值转换：处理后端可能返回的字符串、null、带单位等情况
 */
function toNumber(val) {
  if (val === null || val === undefined || val === '') return 0;
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    // 移除可能的货币符号、逗号、空格等
    var cleaned = val.replace(/[^\d.\-]/g, '');
    var num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

/**
 * 规范化优惠券数据：兼容 snake_case / PascalCase / camelCase 字段名
 * 兼容字段：
 *  - id: id / ID / couponId / coupon_id / CouponId
 *  - name: name / Name / couponName / coupon_name / CouponName / title / Title
 *  - type: type / Type / couponType / coupon_type / CouponType (cash|discount|满减|折扣)
 *  - value: value / Value / amount / Amount / denomination / faceValue / face_value
 *  - minAmount: minAmount / min_amount / MinAmount / minConsume / min_consume / threshold
 *  - scope: scope / Scope / useScope / use_scope / applicableScope
 *  - scopeText: scopeText / scope_text / ScopeText / applicableText / description / desc
 *  - categoryId: categoryId / category_id / CategoryId
 *  - productId: productId / product_id / ProductId
 *  - startTime: startTime / start_time / StartTime / beginTime / begin_time / validFrom
 *  - endTime: endTime / end_time / EndTime / expireTime / expire_time / validUntil
 *  - totalCount: totalCount / total_count / TotalCount / total / Total / totalNum
 *  - remainCount: remainCount / remain_count / RemainCount / remaining / left / leftCount
 *  - status: status / Status / state / State / couponStatus (available|used|expired|unclaimed)
 */
function normalizeCoupon(raw) {
  var _ref, _ref2, _ref3, _ref4, _data$type, _ref5, _ref6, _ref7, _ref8, _data$status, _ref9, _ref0, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _data$value, _ref40, _ref41, _ref42, _ref43, _ref44, _ref45, _ref46, _ref47, _ref48, _ref49, _ref50, _ref51, _ref52, _ref53, _ref54, _ref55, _ref56, _ref57, _ref58, _ref59, _ref60, _data$minAmount, _ref61, _ref62, _ref63, _ref64, _ref65, _ref66, _ref67, _ref68, _ref69, _ref70, _ref71, _ref72, _ref73, _ref74, _ref75, _ref76, _ref77, _ref78, _data$name, _ref79, _ref80, _ref81, _ref82, _ref83, _ref84, _ref85, _ref86, _ref87, _ref88, _ref89, _ref90, _ref91, _ref92, _ref93, _ref94, _ref95, _ref96, _ref97, _ref98, _ref99, _ref100, _data$scopeText, _ref101, _ref102, _ref103, _ref104, _ref105, _ref106, _ref107, _ref108, _ref109, _ref110, _ref111, _ref112, _data$startTime, _ref113, _ref114, _ref115, _ref116, _ref117, _ref118, _ref119, _ref120, _ref121, _ref122, _ref123, _ref124, _data$endTime, _ref125, _ref126, _ref127, _ref128, _ref129, _ref130, _ref131, _data$scope, _ref132, _ref133, _ref134, _ref135, _ref136, _ref137, _ref138, _ref139, _ref140, _ref141, _data$totalCount, _ref142, _ref143, _ref144, _ref145, _ref146, _ref147, _ref148, _ref149, _ref150, _data$remainCount, _ref151, _ref152, _ref153, _ref154, _ref155, _data$id, _ref156, _ref157, _ref158, _data$categoryId, _ref159, _ref160, _ref161, _data$productId;
  if (!raw || (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(raw) !== 'object') return {};

  // 如果数据被嵌套在 coupon/data/info/item 等字段中，先展开
  var data = raw;
  var nestedKeys = ['coupon', 'couponInfo', 'coupon_info', 'data', 'info', 'item', 'detail'];
  for (var _i = 0, _nestedKeys = nestedKeys; _i < _nestedKeys.length; _i++) {
    var k = _nestedKeys[_i];
    if (raw[k] && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(raw[k]) === 'object' && !Array.isArray(raw[k])) {
      // coupon 类嵌套对象即使只有1个字段也合并（后端常将门槛字段嵌套在 coupon 内）
      // 其他通用嵌套键要求至少2个字段以避免误合并
      var isCouponKey = k === 'coupon' || k === 'couponInfo' || k === 'coupon_info';
      var minKeys = isCouponKey ? 1 : 2;
      if (Object.keys(raw[k]).length >= minKeys) {
        data = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, raw), raw[k]);
        break;
      }
    }
  }

  // 类型字段标准化：兼容中文与英文
  var rawType = (_ref = (_ref2 = (_ref3 = (_ref4 = (_data$type = data.type) !== null && _data$type !== void 0 ? _data$type : data.Type) !== null && _ref4 !== void 0 ? _ref4 : data.couponType) !== null && _ref3 !== void 0 ? _ref3 : data.coupon_type) !== null && _ref2 !== void 0 ? _ref2 : data.CouponType) !== null && _ref !== void 0 ? _ref : 'cash';
  var normalizedType = 'cash';
  if (typeof rawType === 'string') {
    if (rawType === 'discount' || rawType === '折扣' || rawType === 'discountRate') {
      normalizedType = 'discount';
    } else {
      normalizedType = 'cash';
    }
  }

  // 状态字段标准化：兼容中英文与多种命名
  var rawStatus = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_data$status = data.status) !== null && _data$status !== void 0 ? _data$status : data.Status) !== null && _ref8 !== void 0 ? _ref8 : data.state) !== null && _ref7 !== void 0 ? _ref7 : data.State) !== null && _ref6 !== void 0 ? _ref6 : data.couponStatus) !== null && _ref5 !== void 0 ? _ref5 : 'available';
  var normalizedStatus = 'available';
  if (typeof rawStatus === 'string') {
    var s = rawStatus.toLowerCase();
    if (s === 'expired' || s === '已过期' || s === '2') {
      normalizedStatus = 'expired';
    } else if (s === 'used' || s === '已使用' || s === '1') {
      normalizedStatus = 'used';
    } else if (s === 'unclaimed' || s === '未领取' || s === 'not_claimed' || s === '3') {
      normalizedStatus = 'unclaimed';
    } else {
      normalizedStatus = 'available';
    }
  } else if (typeof rawStatus === 'number') {
    // 后端可能返回数字状态：0=可用 1=已使用 2=已过期 3=未领取
    normalizedStatus = rawStatus === 1 ? 'used' : rawStatus === 2 ? 'expired' : rawStatus === 3 ? 'unclaimed' : 'available';
  }

  // 优惠券面额：兼容各种后端命名
  var couponValue = (_ref9 = (_ref0 = (_ref1 = (_ref10 = (_ref11 = (_ref12 = (_ref13 = (_ref14 = (_ref15 = (_ref16 = (_ref17 = (_ref18 = (_ref19 = (_ref20 = (_ref21 = (_ref22 = (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_ref27 = (_ref28 = (_ref29 = (_ref30 = (_ref31 = (_ref32 = (_ref33 = (_ref34 = (_ref35 = (_ref36 = (_ref37 = (_ref38 = (_ref39 = (_data$value = data.value) !== null && _data$value !== void 0 ? _data$value : data.Value) !== null && _ref39 !== void 0 ? _ref39 : data.couponValue) !== null && _ref38 !== void 0 ? _ref38 : data.coupon_value) !== null && _ref37 !== void 0 ? _ref37 : data.amount) !== null && _ref36 !== void 0 ? _ref36 : data.Amount) !== null && _ref35 !== void 0 ? _ref35 : data.reduceAmount) !== null && _ref34 !== void 0 ? _ref34 : data.reduce_amount) !== null && _ref33 !== void 0 ? _ref33 : data.discountAmount) !== null && _ref32 !== void 0 ? _ref32 : data.discount_amount) !== null && _ref31 !== void 0 ? _ref31 : data.discountValue) !== null && _ref30 !== void 0 ? _ref30 : data.discount_value) !== null && _ref29 !== void 0 ? _ref29 : data.parValue) !== null && _ref28 !== void 0 ? _ref28 : data.par_value) !== null && _ref27 !== void 0 ? _ref27 : data.offAmount) !== null && _ref26 !== void 0 ? _ref26 : data.off_amount) !== null && _ref25 !== void 0 ? _ref25 : data.minusAmount) !== null && _ref24 !== void 0 ? _ref24 : data.minus_amount) !== null && _ref23 !== void 0 ? _ref23 : data.denomination) !== null && _ref22 !== void 0 ? _ref22 : data.faceValue) !== null && _ref21 !== void 0 ? _ref21 : data.face_value) !== null && _ref20 !== void 0 ? _ref20 : data.price) !== null && _ref19 !== void 0 ? _ref19 : data.Price) !== null && _ref18 !== void 0 ? _ref18 : data.reducedAmount) !== null && _ref17 !== void 0 ? _ref17 : data.reduced_amount) !== null && _ref16 !== void 0 ? _ref16 : data.cashAmount) !== null && _ref15 !== void 0 ? _ref15 : data.cash_amount) !== null && _ref14 !== void 0 ? _ref14 : data.couponAmount) !== null && _ref13 !== void 0 ? _ref13 : data.coupon_amount) !== null && _ref12 !== void 0 ? _ref12 : data.promotionAmount) !== null && _ref11 !== void 0 ? _ref11 : data.promotion_amount) !== null && _ref10 !== void 0 ? _ref10 : data.discountRate) !== null && _ref1 !== void 0 ? _ref1 : data.discount_rate) !== null && _ref0 !== void 0 ? _ref0 : data.discount) !== null && _ref9 !== void 0 ? _ref9 : 0;

  // 使用门槛金额
  var couponMinAmount = (_ref40 = (_ref41 = (_ref42 = (_ref43 = (_ref44 = (_ref45 = (_ref46 = (_ref47 = (_ref48 = (_ref49 = (_ref50 = (_ref51 = (_ref52 = (_ref53 = (_ref54 = (_ref55 = (_ref56 = (_ref57 = (_ref58 = (_ref59 = (_ref60 = (_data$minAmount = data.minAmount) !== null && _data$minAmount !== void 0 ? _data$minAmount : data.min_amount) !== null && _ref60 !== void 0 ? _ref60 : data.MinAmount) !== null && _ref59 !== void 0 ? _ref59 : data.conditionAmount) !== null && _ref58 !== void 0 ? _ref58 : data.condition_amount) !== null && _ref57 !== void 0 ? _ref57 : data.minOrderAmount) !== null && _ref56 !== void 0 ? _ref56 : data.min_order_amount) !== null && _ref55 !== void 0 ? _ref55 : data.thresholdAmount) !== null && _ref54 !== void 0 ? _ref54 : data.threshold_amount) !== null && _ref53 !== void 0 ? _ref53 : data.consumeAmount) !== null && _ref52 !== void 0 ? _ref52 : data.consume_amount) !== null && _ref51 !== void 0 ? _ref51 : data.minConsume) !== null && _ref50 !== void 0 ? _ref50 : data.min_consume) !== null && _ref49 !== void 0 ? _ref49 : data.threshold) !== null && _ref48 !== void 0 ? _ref48 : data.fullAmount) !== null && _ref47 !== void 0 ? _ref47 : data.full_amount) !== null && _ref46 !== void 0 ? _ref46 : data.needAmount) !== null && _ref45 !== void 0 ? _ref45 : data.need_amount) !== null && _ref44 !== void 0 ? _ref44 : data.consumeThreshold) !== null && _ref43 !== void 0 ? _ref43 : data.consume_threshold) !== null && _ref42 !== void 0 ? _ref42 : data.orderMinAmount) !== null && _ref41 !== void 0 ? _ref41 : data.order_min_amount) !== null && _ref40 !== void 0 ? _ref40 : 0;

  // 优惠券名称
  var couponName = (_ref61 = (_ref62 = (_ref63 = (_ref64 = (_ref65 = (_ref66 = (_ref67 = (_ref68 = (_ref69 = (_ref70 = (_ref71 = (_ref72 = (_ref73 = (_ref74 = (_ref75 = (_ref76 = (_ref77 = (_ref78 = (_data$name = data.name) !== null && _data$name !== void 0 ? _data$name : data.Name) !== null && _ref78 !== void 0 ? _ref78 : data.couponName) !== null && _ref77 !== void 0 ? _ref77 : data.coupon_name) !== null && _ref76 !== void 0 ? _ref76 : data.CouponName) !== null && _ref75 !== void 0 ? _ref75 : data.couponTitle) !== null && _ref74 !== void 0 ? _ref74 : data.coupon_title) !== null && _ref73 !== void 0 ? _ref73 : data.title) !== null && _ref72 !== void 0 ? _ref72 : data.Title) !== null && _ref71 !== void 0 ? _ref71 : data.subject) !== null && _ref70 !== void 0 ? _ref70 : data.Subject) !== null && _ref69 !== void 0 ? _ref69 : data.couponTitle) !== null && _ref68 !== void 0 ? _ref68 : data.coupon_title) !== null && _ref67 !== void 0 ? _ref67 : data.promotionName) !== null && _ref66 !== void 0 ? _ref66 : data.promotion_name) !== null && _ref65 !== void 0 ? _ref65 : data.activityName) !== null && _ref64 !== void 0 ? _ref64 : data.activity_name) !== null && _ref63 !== void 0 ? _ref63 : data.couponDesc) !== null && _ref62 !== void 0 ? _ref62 : data.coupon_desc) !== null && _ref61 !== void 0 ? _ref61 : '';

  // 适用范围文字描述
  var couponScopeText = (_ref79 = (_ref80 = (_ref81 = (_ref82 = (_ref83 = (_ref84 = (_ref85 = (_ref86 = (_ref87 = (_ref88 = (_ref89 = (_ref90 = (_ref91 = (_ref92 = (_ref93 = (_ref94 = (_ref95 = (_ref96 = (_ref97 = (_ref98 = (_ref99 = (_ref100 = (_data$scopeText = data.scopeText) !== null && _data$scopeText !== void 0 ? _data$scopeText : data.scope_text) !== null && _ref100 !== void 0 ? _ref100 : data.ScopeText) !== null && _ref99 !== void 0 ? _ref99 : data.applicableText) !== null && _ref98 !== void 0 ? _ref98 : data.applicable_text) !== null && _ref97 !== void 0 ? _ref97 : data.description) !== null && _ref96 !== void 0 ? _ref96 : data.desc) !== null && _ref95 !== void 0 ? _ref95 : data.Description) !== null && _ref94 !== void 0 ? _ref94 : data.Desc) !== null && _ref93 !== void 0 ? _ref93 : data.useDesc) !== null && _ref92 !== void 0 ? _ref92 : data.use_desc) !== null && _ref91 !== void 0 ? _ref91 : data.conditionDesc) !== null && _ref90 !== void 0 ? _ref90 : data.condition_desc) !== null && _ref89 !== void 0 ? _ref89 : data.scopeDesc) !== null && _ref88 !== void 0 ? _ref88 : data.scope_desc) !== null && _ref87 !== void 0 ? _ref87 : data.useRange) !== null && _ref86 !== void 0 ? _ref86 : data.use_range) !== null && _ref85 !== void 0 ? _ref85 : data.applicableRange) !== null && _ref84 !== void 0 ? _ref84 : data.applicable_range) !== null && _ref83 !== void 0 ? _ref83 : data.rangeDesc) !== null && _ref82 !== void 0 ? _ref82 : data.range_desc) !== null && _ref81 !== void 0 ? _ref81 : data.useNotice) !== null && _ref80 !== void 0 ? _ref80 : data.use_notice) !== null && _ref79 !== void 0 ? _ref79 : '全场通用';

  // 开始时间
  var couponStartTime = (_ref101 = (_ref102 = (_ref103 = (_ref104 = (_ref105 = (_ref106 = (_ref107 = (_ref108 = (_ref109 = (_ref110 = (_ref111 = (_ref112 = (_data$startTime = data.startTime) !== null && _data$startTime !== void 0 ? _data$startTime : data.start_time) !== null && _ref112 !== void 0 ? _ref112 : data.StartTime) !== null && _ref111 !== void 0 ? _ref111 : data.beginTime) !== null && _ref110 !== void 0 ? _ref110 : data.begin_time) !== null && _ref109 !== void 0 ? _ref109 : data.validFrom) !== null && _ref108 !== void 0 ? _ref108 : data.valid_from) !== null && _ref107 !== void 0 ? _ref107 : data.startDate) !== null && _ref106 !== void 0 ? _ref106 : data.start_date) !== null && _ref105 !== void 0 ? _ref105 : data.validStart) !== null && _ref104 !== void 0 ? _ref104 : data.valid_start) !== null && _ref103 !== void 0 ? _ref103 : data.beginDate) !== null && _ref102 !== void 0 ? _ref102 : data.begin_date) !== null && _ref101 !== void 0 ? _ref101 : '';

  // 结束时间
  var couponEndTime = (_ref113 = (_ref114 = (_ref115 = (_ref116 = (_ref117 = (_ref118 = (_ref119 = (_ref120 = (_ref121 = (_ref122 = (_ref123 = (_ref124 = (_data$endTime = data.endTime) !== null && _data$endTime !== void 0 ? _data$endTime : data.end_time) !== null && _ref124 !== void 0 ? _ref124 : data.EndTime) !== null && _ref123 !== void 0 ? _ref123 : data.expireTime) !== null && _ref122 !== void 0 ? _ref122 : data.expire_time) !== null && _ref121 !== void 0 ? _ref121 : data.validUntil) !== null && _ref120 !== void 0 ? _ref120 : data.valid_until) !== null && _ref119 !== void 0 ? _ref119 : data.endDate) !== null && _ref118 !== void 0 ? _ref118 : data.end_date) !== null && _ref117 !== void 0 ? _ref117 : data.validEnd) !== null && _ref116 !== void 0 ? _ref116 : data.valid_end) !== null && _ref115 !== void 0 ? _ref115 : data.finishDate) !== null && _ref114 !== void 0 ? _ref114 : data.finish_date) !== null && _ref113 !== void 0 ? _ref113 : '';

  // 适用范围类型
  var couponScope = (_ref125 = (_ref126 = (_ref127 = (_ref128 = (_ref129 = (_ref130 = (_ref131 = (_data$scope = data.scope) !== null && _data$scope !== void 0 ? _data$scope : data.Scope) !== null && _ref131 !== void 0 ? _ref131 : data.useScope) !== null && _ref130 !== void 0 ? _ref130 : data.use_scope) !== null && _ref129 !== void 0 ? _ref129 : data.applicableScope) !== null && _ref128 !== void 0 ? _ref128 : data.applicable_scope) !== null && _ref127 !== void 0 ? _ref127 : data.range) !== null && _ref126 !== void 0 ? _ref126 : data.Range) !== null && _ref125 !== void 0 ? _ref125 : 'all';

  // 库存/总数
  var couponTotalCount = (_ref132 = (_ref133 = (_ref134 = (_ref135 = (_ref136 = (_ref137 = (_ref138 = (_ref139 = (_ref140 = (_ref141 = (_data$totalCount = data.totalCount) !== null && _data$totalCount !== void 0 ? _data$totalCount : data.total_count) !== null && _ref141 !== void 0 ? _ref141 : data.TotalCount) !== null && _ref140 !== void 0 ? _ref140 : data.total) !== null && _ref139 !== void 0 ? _ref139 : data.Total) !== null && _ref138 !== void 0 ? _ref138 : data.totalNum) !== null && _ref137 !== void 0 ? _ref137 : data.total_num) !== null && _ref136 !== void 0 ? _ref136 : data.count) !== null && _ref135 !== void 0 ? _ref135 : data.Count) !== null && _ref134 !== void 0 ? _ref134 : data.stock) !== null && _ref133 !== void 0 ? _ref133 : data.Stock) !== null && _ref132 !== void 0 ? _ref132 : 0;

  // 剩余数量
  var couponRemainCount = (_ref142 = (_ref143 = (_ref144 = (_ref145 = (_ref146 = (_ref147 = (_ref148 = (_ref149 = (_ref150 = (_data$remainCount = data.remainCount) !== null && _data$remainCount !== void 0 ? _data$remainCount : data.remain_count) !== null && _ref150 !== void 0 ? _ref150 : data.RemainCount) !== null && _ref149 !== void 0 ? _ref149 : data.remaining) !== null && _ref148 !== void 0 ? _ref148 : data.Remaining) !== null && _ref147 !== void 0 ? _ref147 : data.left) !== null && _ref146 !== void 0 ? _ref146 : data.leftCount) !== null && _ref145 !== void 0 ? _ref145 : data.left_count) !== null && _ref144 !== void 0 ? _ref144 : data.stockLeft) !== null && _ref143 !== void 0 ? _ref143 : data.stock_left) !== null && _ref142 !== void 0 ? _ref142 : 0;
  var result = {
    id: (_ref151 = (_ref152 = (_ref153 = (_ref154 = (_ref155 = (_data$id = data.id) !== null && _data$id !== void 0 ? _data$id : data.Id) !== null && _ref155 !== void 0 ? _ref155 : data.couponId) !== null && _ref154 !== void 0 ? _ref154 : data.coupon_id) !== null && _ref153 !== void 0 ? _ref153 : data.CouponId) !== null && _ref152 !== void 0 ? _ref152 : data.ID) !== null && _ref151 !== void 0 ? _ref151 : '',
    name: couponName,
    type: normalizedType,
    value: toNumber(couponValue),
    minAmount: toNumber(couponMinAmount),
    scope: couponScope,
    scopeText: couponScopeText,
    categoryId: (_ref156 = (_ref157 = (_ref158 = (_data$categoryId = data.categoryId) !== null && _data$categoryId !== void 0 ? _data$categoryId : data.category_id) !== null && _ref158 !== void 0 ? _ref158 : data.CategoryId) !== null && _ref157 !== void 0 ? _ref157 : data.categoryCode) !== null && _ref156 !== void 0 ? _ref156 : null,
    productId: (_ref159 = (_ref160 = (_ref161 = (_data$productId = data.productId) !== null && _data$productId !== void 0 ? _data$productId : data.product_id) !== null && _ref161 !== void 0 ? _ref161 : data.ProductId) !== null && _ref160 !== void 0 ? _ref160 : data.productCode) !== null && _ref159 !== void 0 ? _ref159 : null,
    startTime: couponStartTime,
    endTime: couponEndTime,
    totalCount: toNumber(couponTotalCount),
    remainCount: toNumber(couponRemainCount),
    status: normalizedStatus,
    _raw: data
  };

  // 调试日志：方便排查后端字段名
  if (true) {
    var missingFields = [];
    if (!result.value) missingFields.push("value(rawValue=".concat(couponValue, ")"));
    // 0 是合法值（无门槛券），用 toNumber 统一比较以兼容字符串 "0.00"
    if (!result.minAmount && toNumber(couponMinAmount) !== 0) missingFields.push("minAmount(raw=".concat(couponMinAmount, ")"));
    if (!result.name) missingFields.push('name');
    if (missingFields.length > 0) {
      console.warn('[normalizeCoupon] 字段可能未正确匹配:', missingFields.join(', '), '原始数据:', data);
    }
  }
  return result;
}

// ==================== 优惠券 API 方法 ====================

/**
 * 从后端响应中提取优惠券列表，兼容多种数据结构
 */
function extractCouponList(res) {
  var _res$data, _d$data, _d$data2, _d$data3, _d$list, _d$items;
  if (!res) return [];
  var d = (_res$data = res.data) !== null && _res$data !== void 0 ? _res$data : res;

  // 可能的列表路径
  var candidates = [d,
  // res.data 直接是数组
  d.list,
  // res.data.list
  d.items,
  // res.data.items
  d.coupons,
  // res.data.coupons
  d.data, // res.data.data
  (_d$data = d.data) === null || _d$data === void 0 ? void 0 : _d$data.list, // res.data.data.list
  (_d$data2 = d.data) === null || _d$data2 === void 0 ? void 0 : _d$data2.items, // res.data.data.items
  (_d$data3 = d.data) === null || _d$data3 === void 0 ? void 0 : _d$data3.coupons,
  // res.data.data.coupons
  d.result,
  // res.data.result
  d.records,
  // res.data.records
  d.rows, // res.data.rows
  (_d$list = d.list) === null || _d$list === void 0 ? void 0 : _d$list.data, // res.data.list.data (分页嵌套)
  (_d$items = d.items) === null || _d$items === void 0 ? void 0 : _d$items.data // res.data.items.data
  ];
  for (var _i2 = 0, _candidates = candidates; _i2 < _candidates.length; _i2++) {
    var c = _candidates[_i2];
    if (Array.isArray(c) && c.length > 0) {
      return c;
    }
  }

  // 兜底：遍历 d 的所有值，找到第一个数组
  if (d && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(d) === 'object') {
    for (var _i3 = 0, _Object$keys = Object.keys(d); _i3 < _Object$keys.length; _i3++) {
      var key = _Object$keys[_i3];
      if (Array.isArray(d[key]) && d[key].length > 0) {
        return d[key];
      }
    }
  }
  console.warn('[coupon] 未能提取到优惠券列表，原始响应:', res);
  return [];
}

/**
 * 获取可领取优惠券列表
 * GET /api/v1/coupons/available
 */
function fetchAvailableCoupons() {
  return _fetchAvailableCoupons.apply(this, arguments);
}

/**
 * 获取我的优惠券列表
 * GET /api/v1/coupons/mine
 * @param params.status 可选状态过滤：available|used|expired
 */
function _fetchAvailableCoupons() {
  _fetchAvailableCoupons = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee() {
    var params,
      res,
      list,
      _args = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          _context.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(couponApi.available, params);
        case 1:
          res = _context.v;
          list = extractCouponList(res);
          return _context.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, res), {}, {
            data: list.map(normalizeCoupon)
          }));
      }
    }, _callee);
  }));
  return _fetchAvailableCoupons.apply(this, arguments);
}
function fetchMyCoupons() {
  return _fetchMyCoupons.apply(this, arguments);
}

/**
 * 领取优惠券
 * POST /api/v1/coupons/{id}/claim
 */
function _fetchMyCoupons() {
  _fetchMyCoupons = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee2() {
    var params,
      res,
      list,
      _args2 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          _context2.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiGet)(couponApi.mine, params);
        case 1:
          res = _context2.v;
          list = extractCouponList(res);
          return _context2.a(2, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, res), {}, {
            data: list.map(normalizeCoupon)
          }));
      }
    }, _callee2);
  }));
  return _fetchMyCoupons.apply(this, arguments);
}
function claimCoupon(_x) {
  return _claimCoupon.apply(this, arguments);
}
function _claimCoupon() {
  _claimCoupon = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee3(id) {
    var res;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_0__.apiPost)(couponApi.claim, {}, {
            id: id
          });
        case 1:
          res = _context3.v;
          return _context3.a(2, res);
      }
    }, _callee3);
  }));
  return _claimCoupon.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/user/normalize.ts":
/*!***********************************!*\
  !*** ./src/api/user/normalize.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeUserProfile: function() { return /* binding */ normalizeUserProfile; }
/* harmony export */ });
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");


// ============================================
// 用户信息字段规范化
// 兼容后端可能返回的 snake_case / PascalCase / camelCase 字段
// ============================================

/**
 * 从原始后端响应中提取字符串值，兼容多种字段命名风格
 */
function pickStr(obj, keys) {
  var _iterator = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"])(keys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var k = _step.value;
      var v = obj[k];
      if (v !== undefined && v !== null && v !== '') return String(v);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return '';
}

/**
 * 规范化用户信息接口返回数据
 * 兼容 id/ID/userId/UserId, nickname/NickName/nick_name 等字段
 */
function normalizeUserProfile(raw) {
  var _raw$data;
  if (!raw || (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(raw) !== 'object') {
    return {
      id: '',
      nickname: '',
      avatar: '',
      phone: '',
      accountName: '',
      gender: '保密',
      birthday: '请填写您的生日',
      registerDate: '',
      email: ''
    };
  }

  // 后端返回可能包裹在 data 字段内
  var data = (_raw$data = raw.data) !== null && _raw$data !== void 0 ? _raw$data : raw;
  return {
    id: pickStr(data, ['id', 'ID', 'userId', 'UserId', 'user_id', 'uid', 'Uid']),
    nickname: pickStr(data, ['nickname', 'NickName', 'nick_name', 'name', 'Name', 'userName', 'UserName', 'user_name']),
    avatar: pickStr(data, ['avatar', 'Avatar', 'avatarUrl', 'AvatarUrl', 'avatar_url', 'headImg', 'head_img', 'HeadImg']),
    phone: pickStr(data, ['phone', 'Phone', 'mobile', 'Mobile', 'phoneNum', 'phone_num', 'PhoneNumber', 'phoneNumber']),
    accountName: pickStr(data, ['accountName', 'AccountName', 'account_name', 'account', 'Account', 'loginName', 'login_name']),
    gender: pickStr(data, ['gender', 'Gender', 'sex', 'Sex']) || '保密',
    birthday: pickStr(data, ['birthday', 'Birthday', 'birth', 'Birth', 'birthDate', 'birth_date']) || '请填写您的生日',
    registerDate: pickStr(data, ['registerDate', 'RegisterDate', 'register_date', 'created_at', 'createdAt', 'CreatedAt', 'createTime', 'create_time']),
    email: pickStr(data, ['email', 'Email', 'eMail', 'mail', 'Mail'])
  };
}

/***/ }),

/***/ "./src/data/common/stores.ts":
/*!***********************************!*\
  !*** ./src/data/common/stores.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeStore: function() { return /* binding */ normalizeStore; },
/* harmony export */   normalizeStoreList: function() { return /* binding */ normalizeStoreList; }
/* harmony export */ });
/* unused harmony exports stores, getStoreById, getNearbyStores */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

// 门店数据

// 兼容后端多种字段命名（snake_case / camelCase / PascalCase）
// 将后端返回的原始门店对象统一转换为前端 Store 结构
function normalizeStore(raw) {
  if (!raw || (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(raw) !== 'object') {
    return null;
  }
  var pickStr = function pickStr() {
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }
    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      var k = _keys[_i];
      var v = raw[k];
      if (v !== undefined && v !== null && v !== '') return String(v);
    }
    return '';
  };
  var pickNum = function pickNum() {
    for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      keys[_key2] = arguments[_key2];
    }
    for (var _i2 = 0, _keys2 = keys; _i2 < _keys2.length; _i2++) {
      var k = _keys2[_i2];
      var v = raw[k];
      if (v !== undefined && v !== null && v !== '') {
        var n = Number(v);
        if (!isNaN(n)) return n;
      }
    }
    return 0;
  };
  var pickArr = function pickArr() {
    for (var _len3 = arguments.length, keys = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      keys[_key3] = arguments[_key3];
    }
    for (var _i3 = 0, _keys3 = keys; _i3 < _keys3.length; _i3++) {
      var k = _keys3[_i3];
      var v = raw[k];
      if (Array.isArray(v)) return v.map(function (x) {
        return String(x);
      });
      if (typeof v === 'string' && v) {
        // 兼容后端以逗号分隔的字符串
        return v.split(/[,，|]/).map(function (s) {
          return s.trim();
        }).filter(Boolean);
      }
    }
    return [];
  };
  var id = pickStr('id', 'ID', 'storeId', 'store_id', 'shopId', 'shop_id');
  var name = pickStr('name', 'Name', 'storeName', 'store_name', 'shopName', 'shop_name', 'title');
  var address = pickStr('address', 'Address', 'storeAddress', 'store_address', 'addr', 'location');
  var phone = pickStr('phone', 'Phone', 'tel', 'telephone', 'mobile', 'contactPhone', 'contact_phone', 'contact');
  var hours = pickStr('hours', 'Hours', 'businessHours', 'business_hours', 'openHours', 'open_hours', 'workTime', 'work_time', '营业时间');
  var image = pickStr('image', 'Image', 'logo', 'avatar', 'cover', 'coverImage', 'cover_image', 'pic', 'picture', 'img');
  var description = pickStr('description', 'desc', 'intro', 'remark', 'Description', 'Description', 'introduction');
  var status = pickStr('status', 'Status', 'storeStatus', 'store_status', 'state');
  var distance = pickNum('distance', 'Distance', 'dist');
  var lat = pickNum('lat', 'latitude', 'Latitude', 'Lat');
  var lng = pickNum('lng', 'lon', 'lng', 'longitude', 'Longitude', 'Lng', 'Lon');
  var service = pickArr('service', 'services', 'Service', 'Services', 'serviceList', 'service_list', 'tags', 'features', 'supportServices');
  return {
    id: id || "store-".concat(Date.now()),
    name: name || '未知门店',
    address: address,
    phone: phone,
    hours: hours,
    distance: distance,
    lat: lat,
    lng: lng,
    service: service,
    image: image,
    description: description,
    businessHours: hours,
    status: status
  };
}

// 批量归一化门店列表，兼容后端返回的多种包裹结构
function normalizeStoreList(res) {
  if (!res) return [];
  var list = [];
  if (Array.isArray(res)) {
    list = res;
  } else if (Array.isArray(res.data)) {
    list = res.data;
  } else if (res.data && Array.isArray(res.data.list)) {
    list = res.data.list;
  } else if (res.data && Array.isArray(res.data.items)) {
    list = res.data.items;
  } else if (res.data && Array.isArray(res.data.stores)) {
    list = res.data.stores;
  } else if (Array.isArray(res.list)) {
    list = res.list;
  } else if (Array.isArray(res.items)) {
    list = res.items;
  } else if (Array.isArray(res.stores)) {
    list = res.stores;
  }
  return list.map(normalizeStore).filter(Boolean);
}

// 所有门店
var stores = [{
  id: 'store-1',
  name: '深圳南山科技园店',
  address: '广东省深圳市南山区科技园南区A2栋1楼',
  phone: '0755-12345678',
  hours: '09:00-22:00',
  distance: 1.2,
  lat: 22.5431,
  lng: 113.9472,
  service: ['自提', '售后', '维修'],
  image: ''
}, {
  id: 'store-2',
  name: '深圳福田CBD店',
  address: '广东省深圳市福田区华强北街道100号',
  phone: '0755-87654321',
  hours: '10:00-21:00',
  distance: 3.5,
  lat: 22.5412,
  lng: 114.0565,
  service: ['自提', '体验'],
  image: ''
}, {
  id: 'store-3',
  name: '深圳龙华店',
  address: '广东省深圳市龙华区龙华街道88号',
  phone: '0755-23456789',
  hours: '09:30-21:30',
  distance: 8.2,
  lat: 22.6529,
  lng: 114.0575,
  service: ['自提', '售后'],
  image: ''
}];

// 根据ID获取门店
var getStoreById = function getStoreById(id) {
  return stores.find(function (store) {
    return store.id === id;
  });
};

// 获取最近的门店
var getNearbyStores = function getNearbyStores(lat, lng) {
  if (!lat || !lng) {
    return stores;
  }
  return stores.sort(function (a, b) {
    var distA = Math.sqrt(Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2));
    var distB = Math.sqrt(Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2));
    return distA - distB;
  });
};

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
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
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
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState, 2),
    userInfo = _useState2[0],
    setUserInfoState = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultCart),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState3, 2),
    cartItems = _useState4[0],
    setCartItemsState = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState5, 2),
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
          return cartItem.id === existingItem.id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, cartItem), {}, {
            quantity: cartItem.quantity + item.quantity
          }) : cartItem;
        });
      } else {
        // 如果不存在，添加新项
        var newItem = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
          id: "cart-".concat(Date.now()),
          selected: true
        });
        updatedItems = [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(prevItems), [newItem]);
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
        return item.id === id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
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
        return item.id === id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
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
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, item), {}, {
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

/***/ }),

/***/ "./src/store/useChatStore.ts":
/*!***********************************!*\
  !*** ./src/store/useChatStore.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony export useChatStore */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/message */ "./src/api/message/index.ts");
/* harmony import */ var _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/chatWS */ "./src/utils/chatWS.ts");





// ============================================
// 客服会话 Store（Zustand）
// 统一管理：会话列表、当前会话、消息历史、未读数
// ============================================







// ---------- 类型定义 ----------

// ---------- 工具函数 ----------
function formatTime(ts) {
  if (!ts) return '';
  var d = typeof ts === 'number' ? new Date(ts) : new Date(ts);
  if (isNaN(d.getTime())) return String(ts);
  var pad = function pad(n) {
    return String(n).padStart(2, '0');
  };
  return "".concat(pad(d.getHours()), ":").concat(pad(d.getMinutes()));
}
function normalizeConversation(raw) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _raw$id, _ref6, _ref7, _ref8, _raw$title, _ref9, _ref0, _raw$unreadCount, _ref1, _ref10, _ref11, _ref12, _raw$lastMessage, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _raw$lastTime;
  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, raw || {}), {}, {
    id: String((_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_raw$id = raw.id) !== null && _raw$id !== void 0 ? _raw$id : raw.ID) !== null && _ref5 !== void 0 ? _ref5 : raw.Id) !== null && _ref4 !== void 0 ? _ref4 : raw.conversationId) !== null && _ref3 !== void 0 ? _ref3 : raw.ConversationId) !== null && _ref2 !== void 0 ? _ref2 : raw.conv_id) !== null && _ref !== void 0 ? _ref : ''),
    title: (_ref6 = (_ref7 = (_ref8 = (_raw$title = raw.title) !== null && _raw$title !== void 0 ? _raw$title : raw.Title) !== null && _ref8 !== void 0 ? _ref8 : raw.name) !== null && _ref7 !== void 0 ? _ref7 : raw.Name) !== null && _ref6 !== void 0 ? _ref6 : '乐享购官方客服',
    unreadCount: Number((_ref9 = (_ref0 = (_raw$unreadCount = raw.unreadCount) !== null && _raw$unreadCount !== void 0 ? _raw$unreadCount : raw.UnreadCount) !== null && _ref0 !== void 0 ? _ref0 : raw.unread_count) !== null && _ref9 !== void 0 ? _ref9 : 0),
    status: raw.status === 'closed' || raw.Status === 0 || raw.Status === 'closed' ? 'closed' : 'ongoing',
    lastMessage: (_ref1 = (_ref10 = (_ref11 = (_ref12 = (_raw$lastMessage = raw.lastMessage) !== null && _raw$lastMessage !== void 0 ? _raw$lastMessage : raw.LastMessage) !== null && _ref12 !== void 0 ? _ref12 : raw.content) !== null && _ref11 !== void 0 ? _ref11 : raw.Content) !== null && _ref10 !== void 0 ? _ref10 : raw.last_message) !== null && _ref1 !== void 0 ? _ref1 : '',
    lastTime: (_ref13 = (_ref14 = (_ref15 = (_ref16 = (_ref17 = (_ref18 = (_raw$lastTime = raw.lastTime) !== null && _raw$lastTime !== void 0 ? _raw$lastTime : raw.LastTime) !== null && _ref18 !== void 0 ? _ref18 : raw.time) !== null && _ref17 !== void 0 ? _ref17 : raw.UpdatedAt) !== null && _ref16 !== void 0 ? _ref16 : raw.updatedAt) !== null && _ref15 !== void 0 ? _ref15 : raw.createdAt) !== null && _ref14 !== void 0 ? _ref14 : raw.CreatedAt) !== null && _ref13 !== void 0 ? _ref13 : ''
  });
}

// ---------- 当前用户信息获取 ----------
function _getCurrentUserId() {
  try {
    var userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      var _ref19, _ref20, _ref21, _info$id;
      var info = JSON.parse(userInfoStr);
      return String((_ref19 = (_ref20 = (_ref21 = (_info$id = info.id) !== null && _info$id !== void 0 ? _info$id : info.userId) !== null && _ref21 !== void 0 ? _ref21 : info.user_id) !== null && _ref20 !== void 0 ? _ref20 : info.ID) !== null && _ref19 !== void 0 ? _ref19 : '');
    }
  } catch (_unused) {}
  return null;
}

// 客服/服务端发送者的识别关键词
var SERVICE_SENDER_KEYWORDS = ['service', 'agent', 'admin', 'cs', 'customer_service', 'customer-service', 'customerService', 'staff', 'operator', 'kefu', '客服', '客服小乐', '小乐', 'ai客服', 'robot', 'bot', 'assistant', 'support'];
var SERVICE_NAME_KEYWORDS = ['客服', '小乐', 'AI客服', '客服小乐', '乐享购', '官方客服'];
// 用户发送者的识别关键词（用于反向排除）
var USER_SENDER_KEYWORDS = ['user', 'customer', 'client', 'buyer', 'member', 'visitor', 'guest', '用户', '客户'];
function _isServiceSender(raw) {
  var _ref30, _ref31, _ref32, _ref33, _raw$sender, _ref34, _ref35, _ref36, _raw$senderName, _ref37, _ref38, _ref39, _raw$senderAvatar, _ref40, _ref41, _raw$userType;
  var currentUserId = _getCurrentUserId();

  // ===== 策略1：基于用户ID比较（最可靠）=====
  // 检查消息的发送者ID是否与当前用户ID匹配 → 匹配则是用户
  if (currentUserId) {
    var _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _raw$senderId;
    var msgSenderId = String((_ref22 = (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_ref27 = (_ref28 = (_ref29 = (_raw$senderId = raw.senderId) !== null && _raw$senderId !== void 0 ? _raw$senderId : raw.SenderId) !== null && _ref29 !== void 0 ? _ref29 : raw.sender_id) !== null && _ref28 !== void 0 ? _ref28 : raw.userId) !== null && _ref27 !== void 0 ? _ref27 : raw.user_id) !== null && _ref26 !== void 0 ? _ref26 : raw.UserId) !== null && _ref25 !== void 0 ? _ref25 : raw.createdBy) !== null && _ref24 !== void 0 ? _ref24 : raw.created_by) !== null && _ref23 !== void 0 ? _ref23 : raw.CreatedBy) !== null && _ref22 !== void 0 ? _ref22 : '').trim();
    if (msgSenderId && msgSenderId === currentUserId) {
      console.log('[ChatStore] _isServiceSender: 通过用户ID匹配为用户消息', {
        msgSenderId: msgSenderId,
        currentUserId: currentUserId
      });
      return false;
    }
    // 如果消息有 senderId 但不匹配当前用户 → 可能是客服
    if (msgSenderId && msgSenderId !== currentUserId) {
      console.log('[ChatStore] _isServiceSender: senderId 不匹配当前用户，判定为客服消息', {
        msgSenderId: msgSenderId,
        currentUserId: currentUserId
      });
      return true;
    }
  }

  // ===== 策略2：检查 sender 字段关键词 =====
  var senderRaw = String((_ref30 = (_ref31 = (_ref32 = (_ref33 = (_raw$sender = raw.sender) !== null && _raw$sender !== void 0 ? _raw$sender : raw.Sender) !== null && _ref33 !== void 0 ? _ref33 : raw.senderType) !== null && _ref32 !== void 0 ? _ref32 : raw.role) !== null && _ref31 !== void 0 ? _ref31 : raw.sender_role) !== null && _ref30 !== void 0 ? _ref30 : '').toLowerCase().trim();

  // 先检查是否明确为用户关键词
  if (senderRaw && USER_SENDER_KEYWORDS.some(function (kw) {
    return senderRaw === kw || senderRaw.includes(kw);
  })) {
    return false;
  }

  // 再检查是否明确为客服关键词
  if (senderRaw && SERVICE_SENDER_KEYWORDS.some(function (kw) {
    return senderRaw === kw || senderRaw.includes(kw);
  })) {
    return true;
  }

  // sender 字段为纯数字枚举：常见 0=用户, 1=客服, 2=系统/管理员
  if (senderRaw !== '' && /^\d+$/.test(senderRaw)) {
    var numSender = Number(senderRaw);
    if (numSender === 0) return false; // 用户
    if (numSender === 1 || numSender === 2 || numSender === 3 || numSender === 9) return true; // 客服/系统
  }

  // ===== 策略3：检查 senderName 名称关键词 =====
  var nameRaw = String((_ref34 = (_ref35 = (_ref36 = (_raw$senderName = raw.senderName) !== null && _raw$senderName !== void 0 ? _raw$senderName : raw.SenderName) !== null && _ref36 !== void 0 ? _ref36 : raw.sender_name) !== null && _ref35 !== void 0 ? _ref35 : raw.name) !== null && _ref34 !== void 0 ? _ref34 : '').toLowerCase().trim();
  if (nameRaw) {
    if (SERVICE_NAME_KEYWORDS.some(function (kw) {
      return nameRaw.includes(kw.toLowerCase());
    })) {
      return true;
    }
    if (USER_SENDER_KEYWORDS.some(function (kw) {
      return nameRaw.includes(kw);
    })) {
      return false;
    }
  }

  // ===== 策略4：检查头像 URL 关键词 =====
  var avatarRaw = String((_ref37 = (_ref38 = (_ref39 = (_raw$senderAvatar = raw.senderAvatar) !== null && _raw$senderAvatar !== void 0 ? _raw$senderAvatar : raw.SenderAvatar) !== null && _ref39 !== void 0 ? _ref39 : raw.sender_avatar) !== null && _ref38 !== void 0 ? _ref38 : raw.avatar) !== null && _ref37 !== void 0 ? _ref37 : '').toLowerCase();
  if (avatarRaw && SERVICE_SENDER_KEYWORDS.some(function (kw) {
    return avatarRaw.includes(kw);
  })) {
    return true;
  }

  // ===== 策略5：检查 userType / UserType 数值枚举 =====
  // 后端可能用 0=用户, 1=客服 等数字枚举
  var userType = (_ref40 = (_ref41 = (_raw$userType = raw.userType) !== null && _raw$userType !== void 0 ? _raw$userType : raw.UserType) !== null && _ref41 !== void 0 ? _ref41 : raw.user_type) !== null && _ref40 !== void 0 ? _ref40 : raw.sender_type;
  if (userType !== undefined && userType !== null) {
    var numType = Number(userType);
    if (!isNaN(numType)) {
      // 常见枚举：0=用户, 1=客服/管理员
      if (numType === 0 || numType === 2) return false; // 用户
      if (numType === 1 || numType === 3 || numType === 9) return true; // 客服
    }
  }

  // 无法确定时，默认当作用户（user），并打印警告
  console.warn('[ChatStore] _isServiceSender: 无法确定 sender 类型，默认当作 user', {
    senderRaw: senderRaw,
    nameRaw: nameRaw,
    userType: userType,
    rawKeys: Object.keys(raw || {}),
    raw: raw
  });
  return false;
}
function normalizeMessage(raw, conversationId) {
  var _ref42, _ref43, _ref44, _ref45, _ref46, _raw$timestamp, _ref47, _ref48, _ref49, _ref50, _ref51, _raw$id2, _ref52, _ref53, _raw$conversationId, _raw$type, _raw$type2, _ref54, _ref55, _ref56, _raw$content, _ref57, _ref58, _ref59, _raw$senderId2, _ref60, _raw$senderName2, _ref61, _ref62, _raw$senderAvatar2, _raw$status, _raw$status2, _ref63, _raw$extra;
  var isServiceSender = _isServiceSender(raw);
  var sender = isServiceSender ? 'service' : 'user';
  var ts = (_ref42 = (_ref43 = (_ref44 = (_ref45 = (_ref46 = (_raw$timestamp = raw.timestamp) !== null && _raw$timestamp !== void 0 ? _raw$timestamp : raw.Timestamp) !== null && _ref46 !== void 0 ? _ref46 : raw.createTime) !== null && _ref45 !== void 0 ? _ref45 : raw.CreateTime) !== null && _ref44 !== void 0 ? _ref44 : raw.created_at) !== null && _ref43 !== void 0 ? _ref43 : raw.createdAt) !== null && _ref42 !== void 0 ? _ref42 : Date.now();
  return {
    id: String((_ref47 = (_ref48 = (_ref49 = (_ref50 = (_ref51 = (_raw$id2 = raw.id) !== null && _raw$id2 !== void 0 ? _raw$id2 : raw.ID) !== null && _ref51 !== void 0 ? _ref51 : raw.Id) !== null && _ref50 !== void 0 ? _ref50 : raw.messageId) !== null && _ref49 !== void 0 ? _ref49 : raw.MessageId) !== null && _ref48 !== void 0 ? _ref48 : raw.msg_id) !== null && _ref47 !== void 0 ? _ref47 : "m-".concat(Math.random().toString(36).slice(2, 10))),
    conversationId: conversationId || String((_ref52 = (_ref53 = (_raw$conversationId = raw.conversationId) !== null && _raw$conversationId !== void 0 ? _raw$conversationId : raw.ConversationId) !== null && _ref53 !== void 0 ? _ref53 : raw.conv_id) !== null && _ref52 !== void 0 ? _ref52 : ''),
    type: ['text', 'image', 'order', 'product', 'system'].includes((_raw$type = raw.type) !== null && _raw$type !== void 0 ? _raw$type : raw.Type) ? (_raw$type2 = raw.type) !== null && _raw$type2 !== void 0 ? _raw$type2 : raw.Type : 'text',
    content: String((_ref54 = (_ref55 = (_ref56 = (_raw$content = raw.content) !== null && _raw$content !== void 0 ? _raw$content : raw.Content) !== null && _ref56 !== void 0 ? _ref56 : raw.message) !== null && _ref55 !== void 0 ? _ref55 : raw.text) !== null && _ref54 !== void 0 ? _ref54 : ''),
    sender: sender,
    senderId: (_ref57 = (_ref58 = (_ref59 = (_raw$senderId2 = raw.senderId) !== null && _raw$senderId2 !== void 0 ? _raw$senderId2 : raw.SenderId) !== null && _ref59 !== void 0 ? _ref59 : raw.sender_id) !== null && _ref58 !== void 0 ? _ref58 : raw.userId) !== null && _ref57 !== void 0 ? _ref57 : raw.user_id,
    senderName: (_ref60 = (_raw$senderName2 = raw.senderName) !== null && _raw$senderName2 !== void 0 ? _raw$senderName2 : raw.SenderName) !== null && _ref60 !== void 0 ? _ref60 : raw.sender_name,
    senderAvatar: (_ref61 = (_ref62 = (_raw$senderAvatar2 = raw.senderAvatar) !== null && _raw$senderAvatar2 !== void 0 ? _raw$senderAvatar2 : raw.SenderAvatar) !== null && _ref62 !== void 0 ? _ref62 : raw.sender_avatar) !== null && _ref61 !== void 0 ? _ref61 : raw.avatar,
    createTime: typeof ts === 'number' ? formatTime(ts) : String(ts),
    timestamp: typeof ts === 'number' ? ts : new Date(ts).getTime(),
    status: ['sending', 'sent', 'failed', 'read'].includes((_raw$status = raw.status) !== null && _raw$status !== void 0 ? _raw$status : raw.Status) ? (_raw$status2 = raw.status) !== null && _raw$status2 !== void 0 ? _raw$status2 : raw.Status : 'sent',
    extra: (_ref63 = (_raw$extra = raw.extra) !== null && _raw$extra !== void 0 ? _raw$extra : raw.payload) !== null && _ref63 !== void 0 ? _ref63 : undefined
  };
}

// ---------- Store 创建 ----------
var useChatStore = (0,zustand__WEBPACK_IMPORTED_MODULE_5__.create)(function (set, get) {
  return {
    // ============ state ============
    wsStatus: 'idle',
    wsConnected: false,
    conversations: [],
    conversationsLoading: false,
    conversationsLoaded: false,
    currentConversationId: null,
    currentConversation: null,
    messagesMap: {},
    messagesLoadingMap: {},
    messagesLoadedMap: {},
    messageCursorMap: {},
    _wsUnsubscribers: [],
    _subscribed: false,
    // ============ actions ============

    /**
     * 初始化：绑定 WS 订阅，但不自动连接（由页面触发）
     */
    init: function init() {
      var state = get();
      if (state._subscribed) return;
      var unsub1 = _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].onMessage(function (msg) {
        return _handleWSMessage(msg);
      });
      var unsub2 = _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].onStatusChange(function (s) {
        set({
          wsStatus: s,
          wsConnected: s === 'open'
        });
        // 连接成功时可刷新一次列表
        if (s === 'open') {
          get().fetchConversations(true).catch(function () {});
        }
      });
      set({
        _wsUnsubscribers: [unsub1, unsub2],
        _subscribed: true
      });
    },
    dispose: function dispose() {
      var state = get();
      state._wsUnsubscribers.forEach(function (fn) {
        return fn();
      });
      _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].disconnect();
      set({
        _wsUnsubscribers: [],
        _subscribed: false,
        wsStatus: 'idle',
        wsConnected: false
      });
    },
    connectWS: function connectWS() {
      return _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].connect();
    },
    disconnectWS: function disconnectWS() {
      return _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].disconnect();
    },
    // =============== 会话列表 ===============
    fetchConversations: function fetchConversations() {
      var _arguments = arguments;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee() {
        var forceRefresh, state, _ref64, _ref65, _res$data, _data$list, _list$find, res, data, list, curId, curConv, _t;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              forceRefresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
              state = get();
              if (!(!forceRefresh && state.conversationsLoaded && !state.conversationsLoading)) {
                _context.n = 1;
                break;
              }
              return _context.a(2, state.conversations);
            case 1:
              set({
                conversationsLoading: true
              });
              _context.p = 2;
              _context.n = 3;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiGet)(_api_message__WEBPACK_IMPORTED_MODULE_2__.chatApi.conversations);
            case 3:
              res = _context.v;
              data = (_ref64 = (_ref65 = (_res$data = res === null || res === void 0 ? void 0 : res.data) !== null && _res$data !== void 0 ? _res$data : res === null || res === void 0 ? void 0 : res.result) !== null && _ref65 !== void 0 ? _ref65 : res) !== null && _ref64 !== void 0 ? _ref64 : [];
              list = (Array.isArray(data) ? data : (_data$list = data === null || data === void 0 ? void 0 : data.list) !== null && _data$list !== void 0 ? _data$list : []).map(normalizeConversation); // 按更新时间倒序
              list.sort(function (a, b) {
                var at = new Date(a.lastTime || a.updatedAt || 0).getTime();
                var bt = new Date(b.lastTime || b.updatedAt || 0).getTime();
                return bt - at;
              });
              // 如果当前有会话，同步更新 currentConversation
              curId = state.currentConversationId;
              curConv = curId ? (_list$find = list.find(function (c) {
                return c.id === curId;
              })) !== null && _list$find !== void 0 ? _list$find : null : null;
              set({
                conversations: list,
                conversationsLoaded: true,
                currentConversation: curConv !== null && curConv !== void 0 ? curConv : state.currentConversation
              });
              return _context.a(2, list);
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error('[ChatStore] fetchConversations 失败:', _t);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
                title: _t.message || '加载会话失败',
                icon: 'none'
              });
              return _context.a(2, state.conversations);
            case 5:
              _context.p = 5;
              set({
                conversationsLoading: false
              });
              return _context.f(5);
            case 6:
              return _context.a(2);
          }
        }, _callee, null, [[2, 4, 5, 6]]);
      }))();
    },
    createConversation: function createConversation() {
      var _arguments2 = arguments;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee2() {
        var payload, _res$data2, res, data, conv, _t2;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              payload = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};
              _context2.p = 1;
              _context2.n = 2;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiPost)(_api_message__WEBPACK_IMPORTED_MODULE_2__.chatApi.createConversation, payload, {}, {}, true);
            case 2:
              res = _context2.v;
              data = (_res$data2 = res === null || res === void 0 ? void 0 : res.data) !== null && _res$data2 !== void 0 ? _res$data2 : res;
              conv = normalizeConversation(data);
              if (conv.id) {
                _context2.n = 3;
                break;
              }
              console.warn('[ChatStore] createConversation 返回无 ID:', data);
              return _context2.a(2, null);
            case 3:
              // 插入列表头部
              set(function (s) {
                var exists = s.conversations.some(function (c) {
                  return c.id === conv.id;
                });
                return {
                  conversations: exists ? s.conversations.map(function (c) {
                    return c.id === conv.id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, c), conv) : c;
                  }) : [conv].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(s.conversations))
                };
              });
              return _context2.a(2, conv);
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              console.error('[ChatStore] createConversation 失败:', _t2);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
                title: _t2.message || '发起会话失败',
                icon: 'none'
              });
              return _context2.a(2, null);
          }
        }, _callee2, null, [[1, 4]]);
      }))();
    },
    markConversationRead: function markConversationRead(conversationId) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee3() {
        var _t3;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (conversationId) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiPut)(_api_message__WEBPACK_IMPORTED_MODULE_2__.chatApi.readConversation, {}, {
                id: conversationId
              });
            case 2:
              // 乐观更新本地
              set(function (s) {
                var _s$currentConversatio;
                return {
                  conversations: s.conversations.map(function (c) {
                    return c.id === conversationId ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, c), {}, {
                      unreadCount: 0
                    }) : c;
                  }),
                  currentConversation: ((_s$currentConversatio = s.currentConversation) === null || _s$currentConversatio === void 0 ? void 0 : _s$currentConversatio.id) === conversationId ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.currentConversation), {}, {
                    unreadCount: 0
                  }) : s.currentConversation
                };
              });
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              console.error('[ChatStore] markConversationRead 失败:', _t3);
            case 4:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 3]]);
      }))();
    },
    getConversation: function getConversation(id) {
      return get().conversations.find(function (c) {
        return c.id === id;
      });
    },
    // =============== 当前会话 ===============
    setCurrentConversation: function setCurrentConversation(id) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee4() {
        var _get$conversations$fi, conv;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              set({
                currentConversationId: id
              });
              if (!id) {
                _context4.n = 2;
                break;
              }
              conv = (_get$conversations$fi = get().conversations.find(function (c) {
                return c.id === id;
              })) !== null && _get$conversations$fi !== void 0 ? _get$conversations$fi : null;
              set({
                currentConversation: conv
              });
              // 尝试预加载消息
              _context4.n = 1;
              return get().fetchMessages(id, false);
            case 1:
              _context4.n = 3;
              break;
            case 2:
              set({
                currentConversation: null
              });
            case 3:
              return _context4.a(2);
          }
        }, _callee4);
      }))();
    },
    enterConversation: function enterConversation(id) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee5() {
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return get().setCurrentConversation(id);
            case 1:
              _context5.n = 2;
              return get().markConversationRead(id);
            case 2:
              // 确保 WS 连接
              if (!get().wsConnected) _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].connect();
            case 3:
              return _context5.a(2);
          }
        }, _callee5);
      }))();
    },
    leaveConversation: function leaveConversation() {
      get().setCurrentConversation(null);
    },
    // =============== 消息 ===============
    fetchMessages: function fetchMessages(conversationId) {
      var _arguments3 = arguments;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee6() {
        var forceRefresh, state, key, _state$messagesMap$ke, _ref66, _ref67, _res$data3, _ref68, _data$list2, res, data, rawList, list, _state$messagesMap$ke2, _t4;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              forceRefresh = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : false;
              if (conversationId) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2, []);
            case 1:
              state = get();
              key = conversationId;
              if (!(!forceRefresh && state.messagesLoadedMap[key] && !state.messagesLoadingMap[key])) {
                _context6.n = 2;
                break;
              }
              return _context6.a(2, (_state$messagesMap$ke = state.messagesMap[key]) !== null && _state$messagesMap$ke !== void 0 ? _state$messagesMap$ke : []);
            case 2:
              set(function (s) {
                return {
                  messagesLoadingMap: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.messagesLoadingMap), {}, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__["default"])({}, key, true))
                };
              });
              _context6.p = 3;
              _context6.n = 4;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiGet)(_api_message__WEBPACK_IMPORTED_MODULE_2__.chatApi.messages, {}, {
                id: conversationId
              });
            case 4:
              res = _context6.v;
              data = (_ref66 = (_ref67 = (_res$data3 = res === null || res === void 0 ? void 0 : res.data) !== null && _res$data3 !== void 0 ? _res$data3 : res === null || res === void 0 ? void 0 : res.result) !== null && _ref67 !== void 0 ? _ref67 : res) !== null && _ref66 !== void 0 ? _ref66 : [];
              rawList = Array.isArray(data) ? data : (_ref68 = (_data$list2 = data === null || data === void 0 ? void 0 : data.list) !== null && _data$list2 !== void 0 ? _data$list2 : data === null || data === void 0 ? void 0 : data.records) !== null && _ref68 !== void 0 ? _ref68 : []; // 调试日志：打印后端返回的原始消息结构
              console.log('[ChatStore] fetchMessages 原始数据:', {
                conversationId: conversationId,
                count: rawList.length,
                firstRaw: rawList[0] ? JSON.stringify(rawList[0], null, 2) : null,
                allSenderFields: rawList.map(function (m) {
                  var _ref69, _ref70, _ref71, _ref72, _ref73, _ref74, _m$sender, _ref75, _ref76, _ref77, _m$senderName;
                  return {
                    sender: (_ref69 = (_ref70 = (_ref71 = (_ref72 = (_ref73 = (_ref74 = (_m$sender = m.sender) !== null && _m$sender !== void 0 ? _m$sender : m.Sender) !== null && _ref74 !== void 0 ? _ref74 : m.senderType) !== null && _ref73 !== void 0 ? _ref73 : m.role) !== null && _ref72 !== void 0 ? _ref72 : m.sender_role) !== null && _ref71 !== void 0 ? _ref71 : m.userType) !== null && _ref70 !== void 0 ? _ref70 : m.UserType) !== null && _ref69 !== void 0 ? _ref69 : '(无)',
                    senderName: (_ref75 = (_ref76 = (_ref77 = (_m$senderName = m.senderName) !== null && _m$senderName !== void 0 ? _m$senderName : m.SenderName) !== null && _ref77 !== void 0 ? _ref77 : m.sender_name) !== null && _ref76 !== void 0 ? _ref76 : m.name) !== null && _ref75 !== void 0 ? _ref75 : '(无)',
                    keys: Object.keys(m || {})
                  };
                })
              });
              list = rawList.map(function (raw) {
                return normalizeMessage(raw, conversationId);
              }).sort(function (a, b) {
                var _a$timestamp, _b$timestamp;
                return ((_a$timestamp = a.timestamp) !== null && _a$timestamp !== void 0 ? _a$timestamp : 0) - ((_b$timestamp = b.timestamp) !== null && _b$timestamp !== void 0 ? _b$timestamp : 0);
              });
              console.log('[ChatStore] fetchMessages 标准化后:', list.map(function (m) {
                var _m$content;
                return {
                  id: m.id,
                  sender: m.sender,
                  content: (_m$content = m.content) === null || _m$content === void 0 ? void 0 : _m$content.slice(0, 20)
                };
              }));
              set(function (s) {
                return {
                  messagesMap: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.messagesMap), {}, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__["default"])({}, key, list)),
                  messagesLoadedMap: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.messagesLoadedMap), {}, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__["default"])({}, key, true))
                };
              });
              return _context6.a(2, list);
            case 5:
              _context6.p = 5;
              _t4 = _context6.v;
              console.error('[ChatStore] fetchMessages 失败:', _t4);
              return _context6.a(2, (_state$messagesMap$ke2 = state.messagesMap[key]) !== null && _state$messagesMap$ke2 !== void 0 ? _state$messagesMap$ke2 : []);
            case 6:
              _context6.p = 6;
              set(function (s) {
                return {
                  messagesLoadingMap: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.messagesLoadingMap), {}, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__["default"])({}, key, false))
                };
              });
              return _context6.f(6);
            case 7:
              return _context6.a(2);
          }
        }, _callee6, null, [[3, 5, 6, 7]]);
      }))();
    },
    sendMessage: function sendMessage(conversationId, payload) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee7() {
        var _payload$content;
        var tempId, optimisticMsg, wsPayload;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!(!conversationId || !((_payload$content = payload.content) !== null && _payload$content !== void 0 && _payload$content.trim()))) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2, null);
            case 1:
              // 1. 构造本地乐观消息（sending 状态）
              tempId = "tmp-".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 8));
              optimisticMsg = {
                id: tempId,
                conversationId: conversationId,
                type: payload.type,
                content: payload.content,
                sender: 'user',
                createTime: formatTime(Date.now()),
                timestamp: Date.now(),
                status: 'sending',
                extra: payload.extra
              };
              get().addMessage(optimisticMsg);

              // 2. 确保 WS 已连接（若未连接，chatWS.send 会自动入队，连接后 flush）
              if (!get().wsConnected) {
                _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].connect();
              }

              // 3. 如果 WebSocket 未连接，同时通过 HTTP API 发送作为兜底
              if (!get().wsConnected) {
                get()._sendViaHttp(conversationId, payload, tempId);
              }

              // 4. 通过 WebSocket 发送消息（chatWS 内部有发送队列，未连接时会暂存）
              wsPayload = {
                type: 'message/send',
                data: {
                  conversationId: conversationId,
                  type: payload.type,
                  content: payload.content,
                  extra: payload.extra
                },
                id: tempId
              };
              _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].send(wsPayload);

              // 5. 等待最多 8 秒确认：通过 WS 推送的新消息视为 ACK；超时则乐观设为 sent
              return _context7.a(2, new Promise(function (resolve) {
                var resolved = false;
                var unsubListener = null;
                var cleanup = function cleanup() {
                  if (unsubListener) {
                    unsubListener();
                    unsubListener = null;
                  }
                };
                var timeoutId = setTimeout(function () {
                  if (!resolved) {
                    resolved = true;
                    cleanup();
                    var cur = get().getMessages(conversationId).find(function (m) {
                      return m.id === tempId;
                    });
                    if (cur && cur.status === 'sending') {
                      get().updateMessage(conversationId, tempId, {
                        status: 'sent'
                      });
                    }
                    resolve(cur !== null && cur !== void 0 ? cur : null);
                  }
                }, 8000);

                // 监听 WS 入站消息，捕捉后端回推的同内容消息或 ACK
                unsubListener = _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].onMessage(function (inbound) {
                  if (resolved) return;
                  var type = inbound.type,
                    data = inbound.data;

                  // 后端广播了新的 user 消息
                  if (type === 'message/new' && data) {
                    var _ref78, _data$conversationId, _ref79, _ref80, _ref81, _data$content;
                    var inConvId = String((_ref78 = (_data$conversationId = data.conversationId) !== null && _data$conversationId !== void 0 ? _data$conversationId : data.conv_id) !== null && _ref78 !== void 0 ? _ref78 : '');
                    var isUserSender = !_isServiceSender(data);
                    var inContent = String((_ref79 = (_ref80 = (_ref81 = (_data$content = data.content) !== null && _data$content !== void 0 ? _data$content : data.Content) !== null && _ref81 !== void 0 ? _ref81 : data.message) !== null && _ref80 !== void 0 ? _ref80 : data.text) !== null && _ref79 !== void 0 ? _ref79 : '');
                    if (inConvId === conversationId && isUserSender && inContent === optimisticMsg.content) {
                      var _ref82, _ref83, _ref84, _ref85, _ref86, _data$id;
                      // 回推消息 ID 与临时 ID 不同：用服务端消息替换本地乐观消息
                      var serverMsgId = String((_ref82 = (_ref83 = (_ref84 = (_ref85 = (_ref86 = (_data$id = data.id) !== null && _data$id !== void 0 ? _data$id : data.ID) !== null && _ref86 !== void 0 ? _ref86 : data.Id) !== null && _ref85 !== void 0 ? _ref85 : data.messageId) !== null && _ref84 !== void 0 ? _ref84 : data.MessageId) !== null && _ref83 !== void 0 ? _ref83 : data.msg_id) !== null && _ref82 !== void 0 ? _ref82 : '');
                      if (serverMsgId && serverMsgId !== tempId) {
                        set(function (s) {
                          var _s$messagesMap$conver;
                          return {
                            messagesMap: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.messagesMap), {}, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__["default"])({}, conversationId, ((_s$messagesMap$conver = s.messagesMap[conversationId]) !== null && _s$messagesMap$conver !== void 0 ? _s$messagesMap$conver : []).filter(function (m) {
                              return m.id !== tempId;
                            })))
                          };
                        });
                      }
                      resolved = true;
                      clearTimeout(timeoutId);
                      cleanup();
                      var normalized = normalizeMessage(data, conversationId);
                      // 若未被替换，则只更新状态
                      var existing = get().getMessages(conversationId).find(function (m) {
                        return m.id === tempId;
                      });
                      if (existing) {
                        get().updateMessage(conversationId, tempId, {
                          status: 'sent'
                        });
                        resolve(existing);
                      } else {
                        resolve(normalized);
                      }
                    }
                  }
                });
              }));
          }
        }, _callee7);
      }))();
    },
    addMessage: function addMessage(msg) {
      var key = msg.conversationId;
      set(function (s) {
        var _s$messagesMap$key;
        var prev = (_s$messagesMap$key = s.messagesMap[key]) !== null && _s$messagesMap$key !== void 0 ? _s$messagesMap$key : [];
        // 去重（按 id）
        if (prev.some(function (m) {
          return m.id === msg.id;
        })) {
          return {};
        }
        var list = [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(prev), [msg]).sort(function (a, b) {
          var _a$timestamp2, _b$timestamp2;
          return ((_a$timestamp2 = a.timestamp) !== null && _a$timestamp2 !== void 0 ? _a$timestamp2 : 0) - ((_b$timestamp2 = b.timestamp) !== null && _b$timestamp2 !== void 0 ? _b$timestamp2 : 0);
        });
        return {
          messagesMap: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.messagesMap), {}, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__["default"])({}, key, list))
        };
      });
      // 更新会话 lastMessage / lastTime / 未读
      var curConvId = get().currentConversationId;
      var isInCurrentView = curConvId === key;
      set(function (s) {
        return {
          conversations: s.conversations.map(function (c) {
            if (c.id !== key) return c;
            return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, c), {}, {
              lastMessage: msg.content,
              lastTime: msg.createTime,
              unreadCount: isInCurrentView ? 0 : msg.sender !== 'user' ? c.unreadCount + 1 : c.unreadCount
            });
          })
        };
      });
    },
    updateMessage: function updateMessage(conversationId, msgId, patch) {
      set(function (s) {
        var _s$messagesMap$conver2;
        var list = (_s$messagesMap$conver2 = s.messagesMap[conversationId]) !== null && _s$messagesMap$conver2 !== void 0 ? _s$messagesMap$conver2 : [];
        return {
          messagesMap: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.messagesMap), {}, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_9__["default"])({}, conversationId, list.map(function (m) {
            return m.id === msgId ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, m), patch) : m;
          })))
        };
      });
    },
    /**
     * 通过 HTTP API 发送消息（作为 WebSocket 的兜底方案）
     */
    _sendViaHttp: function _sendViaHttp(conversationId, payload, tempId) {
      console.log('[ChatStore] _sendViaHttp: 通过 HTTP 发送消息兜底');
      (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiPost)(_api_message__WEBPACK_IMPORTED_MODULE_2__.chatApi.sendMessage, {
        type: payload.type,
        content: payload.content
      }, {
        id: conversationId
      }, {}, true).then(function (res) {
        console.log('[ChatStore] _sendViaHttp: HTTP 发送成功', res);
        // 更新消息状态为 sent
        get().updateMessage(conversationId, tempId, {
          status: 'sent'
        });
        // 刷新消息列表
        get().fetchMessages(conversationId, true).catch(function () {});
      }).catch(function (err) {
        console.error('[ChatStore] _sendViaHttp: HTTP 发送失败', err);
        get().updateMessage(conversationId, tempId, {
          status: 'failed'
        });
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
          title: '消息发送失败',
          icon: 'none'
        });
      });
    },
    getMessages: function getMessages(conversationId) {
      var _get$messagesMap$conv;
      return (_get$messagesMap$conv = get().messagesMap[conversationId]) !== null && _get$messagesMap$conv !== void 0 ? _get$messagesMap$conv : [];
    },
    // =============== 未读 ===============
    getTotalUnread: function getTotalUnread() {
      return get().conversations.reduce(function (sum, c) {
        return sum + (c.unreadCount || 0);
      }, 0);
    },
    clearAllUnread: function clearAllUnread() {
      set(function (s) {
        return {
          conversations: s.conversations.map(function (c) {
            return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, c), {}, {
              unreadCount: 0
            });
          }),
          currentConversation: s.currentConversation ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.currentConversation), {}, {
            unreadCount: 0
          }) : null
        };
      });
    },
    // =============== 重置 ===============
    reset: function reset() {
      _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].disconnect();
      var unsubs = get()._wsUnsubscribers;
      unsubs.forEach(function (fn) {
        return fn();
      });
      set({
        wsStatus: 'idle',
        wsConnected: false,
        conversations: [],
        conversationsLoading: false,
        conversationsLoaded: false,
        currentConversationId: null,
        currentConversation: null,
        messagesMap: {},
        messagesLoadingMap: {},
        messagesLoadedMap: {},
        messageCursorMap: {},
        _wsUnsubscribers: [],
        _subscribed: false
      });
    }
  };
});

// ============ 内部：WS 消息分发 ============
function _handleWSMessage(msg) {
  var store = useChatStore.getState();
  var type = msg.type,
    data = msg.data;
  switch (type) {
    case 'message/new':
      {
        var _ref87, _ref88, _data$conversationId2, _ref89, _ref90, _ref91, _ref92, _ref93, _data$sender, _ref94, _ref95, _ref96, _data$senderName, _chatMsg$content;
        if (!data) return;
        var conversationId = String((_ref87 = (_ref88 = (_data$conversationId2 = data.conversationId) !== null && _data$conversationId2 !== void 0 ? _data$conversationId2 : data.conv_id) !== null && _ref88 !== void 0 ? _ref88 : store.currentConversationId) !== null && _ref87 !== void 0 ? _ref87 : '');

        // 调试日志：打印 WS 推送的消息结构
        console.log('[ChatStore] WS message/new 原始数据:', {
          dataKeys: Object.keys(data || {}),
          sender: (_ref89 = (_ref90 = (_ref91 = (_ref92 = (_ref93 = (_data$sender = data.sender) !== null && _data$sender !== void 0 ? _data$sender : data.Sender) !== null && _ref93 !== void 0 ? _ref93 : data.senderType) !== null && _ref92 !== void 0 ? _ref92 : data.role) !== null && _ref91 !== void 0 ? _ref91 : data.sender_role) !== null && _ref90 !== void 0 ? _ref90 : data.userType) !== null && _ref89 !== void 0 ? _ref89 : '(无)',
          senderName: (_ref94 = (_ref95 = (_ref96 = (_data$senderName = data.senderName) !== null && _data$senderName !== void 0 ? _data$senderName : data.SenderName) !== null && _ref96 !== void 0 ? _ref96 : data.sender_name) !== null && _ref95 !== void 0 ? _ref95 : data.name) !== null && _ref94 !== void 0 ? _ref94 : '(无)',
          raw: JSON.stringify(data).slice(0, 300)
        });
        var chatMsg = normalizeMessage(data, conversationId);
        console.log('[ChatStore] WS message/new 标准化后:', {
          id: chatMsg.id,
          sender: chatMsg.sender,
          content: (_chatMsg$content = chatMsg.content) === null || _chatMsg$content === void 0 ? void 0 : _chatMsg$content.slice(0, 30)
        });
        store.addMessage(chatMsg);
        // 如果不在当前会话 → 刷新未读（addMessage 内部已处理）
        break;
      }
    case 'message/read':
      {
        var _ref97, _data$conversationId3;
        // 对方已读 → 更新消息状态
        var _conversationId = String((_ref97 = (_data$conversationId3 = data === null || data === void 0 ? void 0 : data.conversationId) !== null && _data$conversationId3 !== void 0 ? _data$conversationId3 : store.currentConversationId) !== null && _ref97 !== void 0 ? _ref97 : '');
        var msgIds = Array.isArray(data === null || data === void 0 ? void 0 : data.messageIds) ? data.messageIds.map(String) : data !== null && data !== void 0 && data.messageId ? [String(data.messageId)] : [];
        if (_conversationId && msgIds.length) {
          msgIds.forEach(function (mid) {
            return store.updateMessage(_conversationId, mid, {
              status: 'read'
            });
          });
        } else if (_conversationId) {
          // 全量标记该会话的 user 消息为 read
          var msgs = store.getMessages(_conversationId);
          msgs.forEach(function (m) {
            if (m.sender === 'user') store.updateMessage(_conversationId, m.id, {
              status: 'read'
            });
          });
        }
        break;
      }
    case 'conversation/update':
      {
        if (data) {
          var conv = normalizeConversation(data);
          useChatStore.setState(function (s) {
            var _s$currentConversatio2;
            return {
              conversations: s.conversations.some(function (c) {
                return c.id === conv.id;
              }) ? s.conversations.map(function (c) {
                return c.id === conv.id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, c), conv) : c;
              }) : [conv].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(s.conversations)),
              currentConversation: ((_s$currentConversatio2 = s.currentConversation) === null || _s$currentConversatio2 === void 0 ? void 0 : _s$currentConversatio2.id) === conv.id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_4__["default"])({}, s.currentConversation), conv) : s.currentConversation
            };
          });
        }
        break;
      }
    case 'conversation/read':
      {
        var _ref98, _data$conversationId4;
        var convId = String((_ref98 = (_data$conversationId4 = data === null || data === void 0 ? void 0 : data.conversationId) !== null && _data$conversationId4 !== void 0 ? _data$conversationId4 : data === null || data === void 0 ? void 0 : data.id) !== null && _ref98 !== void 0 ? _ref98 : '');
        if (convId) store.markConversationRead(convId).catch(function () {});
        break;
      }
    case 'system':
    case 'error':
      {
        console.log("[ChatStore] WS ".concat(type, ":"), data);
        break;
      }
    default:
      console.debug('[ChatStore] 未处理 WS 消息类型:', type, data);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (useChatStore);

/***/ }),

/***/ "./src/utils/categoryIcons.ts":
/*!************************************!*\
  !*** ./src/utils/categoryIcons.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCategoryIcon: function() { return /* binding */ getCategoryIcon; }
/* harmony export */ });
/* harmony import */ var _icons_category_coffee_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/icons/category/coffee.svg */ "./src/icons/category/coffee.svg");
/* harmony import */ var _icons_category_phone_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/icons/category/phone.svg */ "./src/icons/category/phone.svg");
/* harmony import */ var _icons_category_smartphone_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/icons/category/smartphone.svg */ "./src/icons/category/smartphone.svg");
/* harmony import */ var _icons_category_accessory_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/icons/category/accessory.svg */ "./src/icons/category/accessory.svg");
/* harmony import */ var _icons_category_runningshoe_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/icons/category/runningshoe.svg */ "./src/icons/category/runningshoe.svg");
/* harmony import */ var _icons_category_nutsnack_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/icons/category/nutsnack.svg */ "./src/icons/category/nutsnack.svg");
/* harmony import */ var _icons_category_sneaker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/icons/category/sneaker.svg */ "./src/icons/category/sneaker.svg");
/* harmony import */ var _icons_category_food_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/icons/category/food.svg */ "./src/icons/category/food.svg");








var categoryIconMap = [{
  keywords: ['奶茶', '咖啡', '茶', 'coffee', 'drink'],
  icon: _icons_category_coffee_svg__WEBPACK_IMPORTED_MODULE_0__
}, {
  keywords: ['智能手机', 'smartphone'],
  icon: _icons_category_smartphone_svg__WEBPACK_IMPORTED_MODULE_2__
}, {
  keywords: ['手机配件', '配件', 'accessory'],
  icon: _icons_category_accessory_svg__WEBPACK_IMPORTED_MODULE_3__
}, {
  keywords: ['手机', '数码', '电子', 'phone', 'digital', 'mobile'],
  icon: _icons_category_phone_svg__WEBPACK_IMPORTED_MODULE_1__
}, {
  keywords: ['跑步鞋', '跑鞋', 'runningshoe', 'running'],
  icon: _icons_category_runningshoe_svg__WEBPACK_IMPORTED_MODULE_4__
}, {
  keywords: ['坚果', '零食', 'nut', 'snack', 'nutsnack'],
  icon: _icons_category_nutsnack_svg__WEBPACK_IMPORTED_MODULE_5__
}, {
  keywords: ['运动', '鞋', '服', 'sport', 'sneaker', 'shoe', '跑步'],
  icon: _icons_category_sneaker_svg__WEBPACK_IMPORTED_MODULE_6__
}, {
  keywords: ['食品', '生鲜', '超市', 'food', 'fresh', 'grocery'],
  icon: _icons_category_food_svg__WEBPACK_IMPORTED_MODULE_7__
}];
function getCategoryIcon(categoryName, fallbackIcon) {
  if (!categoryName) return fallbackIcon || '';
  var nameLower = categoryName.toLowerCase();
  var matched = categoryIconMap.find(function (item) {
    return item.keywords.some(function (kw) {
      return nameLower.includes(kw.toLowerCase());
    });
  });
  return matched ? matched.icon : fallbackIcon || _icons_category_phone_svg__WEBPACK_IMPORTED_MODULE_1__;
}

/***/ }),

/***/ "./src/utils/chatWS.ts":
/*!*****************************!*\
  !*** ./src/utils/chatWS.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony export chatWS */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/message */ "./src/api/message/index.ts");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["window"];




var _ChatWebSocketManager;
// ============================================
// 客服 WebSocket 管理服务
// 遵循 Persistent Connection Systems 设计规范：
//   - 首条消息鉴权（兼容 URL token + 消息体 token 两种后端协议）
//   - 心跳 + 空闲超时
//   - 指数退避+抖动 重连
//   - 发送队列 + 缓冲区上限
//   - 消息序列号 gap 检测
// ============================================





// -------------- 常量配置 --------------
var HEARTBEAT_INTERVAL = 30000; // 心跳间隔 30s
var HEARTBEAT_IDLE_TIMEOUT = 90000; // 空闲超时 90s（3 次 ping 未收到 pong）
var MAX_RECONNECT_DELAY = 30000; // 最大重连间隔 30s
var BASE_RECONNECT_DELAY = 1000; // 初始重连间隔 1s
var RECONNECT_JITTER = 0.2; // 抖动 ±20%（避免惊群）
var MAX_RECONNECT_ATTEMPTS = 10; // 最大重连次数（超限需手动触发）
var SEND_QUEUE_LIMIT = 200; // 发送队列上限（未连接时暂存）
var MSG_BUFFER_LIMIT = 1000; // 入站消息缓冲上限（慢消费者保护）
var SEQUENCE_GAP_THRESHOLD = 1; // 序列号 gap 阈值

// -------------- 类型定义 --------------
// -------------- WebSocket 管理器（单例）--------------
var ChatWebSocketManager = /*#__PURE__*/function () {
  function ChatWebSocketManager() {
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this, ChatWebSocketManager);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_ws", null);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_status", 'idle');
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_listeners", new Set());
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_statusListeners", new Set());
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_heartbeatTimer", null);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_idleTimer", null);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_reconnectTimer", null);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_reconnectAttempts", 0);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_shouldReconnect", true);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_manualClose", false);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_authSent", false);
    // 是否已发送鉴权消息
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_authTimer", null);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_useDirectFallback", false);
    // 是否使用直连后端 fallback
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_fallbackTried", false);
    // 是否已尝试过 fallback（只尝试一次）
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_sendQueue", []);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_lastServerSeq", null);
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_msgBuffer", []);
    // ============== 内部：连接 ==============
    (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "_connectTimeoutTimer", null);
  }

  // ============== 公共 API ==============
  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(ChatWebSocketManager, [{
    key: "_isH5",
    get:
    // 跨平台环境判断
    function get() {
      return "weapp" === 'h5';
    }
  }, {
    key: "status",
    get: function get() {
      return this._status;
    }

    /**
     * 建立连接（幂等）
     */
  }, {
    key: "connect",
    value: function connect() {
      if (this._status === 'open' || this._status === 'connecting') {
        console.debug('[ChatWS] 已有连接/正在连接，跳过');
        return;
      }
      this._manualClose = false;
      this._shouldReconnect = true;
      // 用户手动触发时重置 fallback 状态，优先尝试代理连接
      if (this._fallbackTried) {
        this._useDirectFallback = false;
        this._fallbackTried = false;
        this._reconnectAttempts = 0;
      }
      this._doConnect();
    }

    /**
     * 主动关闭（不自动重连）
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._manualClose = true;
      this._shouldReconnect = false;
      this._clearReconnectTimer();
      this._clearAuthTimer();
      this._doClose(1000, 'Client closing');
    }

    /**
     * 发送消息（若未连接则入队，连接后 flush）
     */
  }, {
    key: "send",
    value: function send(msg) {
      var _msg$id;
      var envelope = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, msg), {}, {
        id: (_msg$id = msg.id) !== null && _msg$id !== void 0 ? _msg$id : "c-".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 8))
      });
      if (this._status === 'open' && this._authSent) {
        return this._doSend(envelope);
      }

      // 未连接或未完成鉴权 → 入队
      if (this._sendQueue.length >= SEND_QUEUE_LIMIT) {
        console.warn('[ChatWS] 发送队列已满，丢弃最早消息');
        this._sendQueue.shift();
      }
      this._sendQueue.push(envelope);
      console.debug('[ChatWS] 消息入队，队列长度=', this._sendQueue.length);

      // 尝试主动建立连接
      if (this._status === 'idle' || this._status === 'closed') {
        this.connect();
      }
      return false;
    }

    /**
     * 订阅入站消息
     */
  }, {
    key: "onMessage",
    value: function onMessage(listener) {
      var _this = this;
      this._listeners.add(listener);
      return function () {
        return _this._listeners.delete(listener);
      };
    }

    /**
     * 订阅连接状态
     */
  }, {
    key: "onStatusChange",
    value: function onStatusChange(listener) {
      var _this2 = this;
      this._statusListeners.add(listener);
      return function () {
        return _this2._statusListeners.delete(listener);
      };
    }

    /**
     * 重置重连计数（用户手动触发重连时调用）
     */
  }, {
    key: "resetReconnect",
    value: function resetReconnect() {
      this._reconnectAttempts = 0;
    }
  }, {
    key: "_doConnect",
    value: function _doConnect() {
      var _this3 = this;
      // 如果已有连接正在进行中，不重复连接
      if (this._status === 'connecting') {
        console.debug('[ChatWS] 已有连接正在进行中，跳过');
        return;
      }
      this._setStatus('connecting');
      this._clearHeartbeat();
      this._authSent = false;
      var token = (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.getAuthToken)();

      // 构建 URL：URL 查询参数携带 token（解决后端握手阶段鉴权问题）
      var baseUrl;
      if (this._isH5) {
        if (this._useDirectFallback) {
          baseUrl = _api_message__WEBPACK_IMPORTED_MODULE_1__.WS_DIRECT_URL;
          console.log('[ChatWS] H5 连接（直连后端 fallback）:', baseUrl);
        } else {
          baseUrl = _api_message__WEBPACK_IMPORTED_MODULE_1__.WS_BASE_URL;
          console.log('[ChatWS] H5 连接（走代理）:', baseUrl);
        }
      } else {
        baseUrl = _api_message__WEBPACK_IMPORTED_MODULE_1__.WS_BASE_URL;
        console.log('[ChatWS] 小程序连接（直连）:', baseUrl);
      }

      // 在 URL 上拼接 token 查询参数
      var url = token ? "".concat(baseUrl).concat(baseUrl.includes('?') ? '&' : '?', "token=").concat(encodeURIComponent(token)) : baseUrl;
      if (!token) {
        console.warn('[ChatWS] 无 token，后端可能拒绝握手');
      }
      try {
        // 销毁旧实例，防止残留连接
        if (this._ws) {
          try {
            if (this._isH5) {
              this._ws.onopen = null;
              this._ws.onmessage = null;
              this._ws.onerror = null;
              this._ws.onclose = null;
              if (this._ws.readyState === WebSocket.OPEN || this._ws.readyState === WebSocket.CONNECTING) {
                this._ws.close(4001, 'Reconnecting');
              }
            }
          } catch (_unused) {}
          this._ws = null;
        }

        // 连接超时保护：5秒内未连接成功则视为超时
        if (this._connectTimeoutTimer) clearTimeout(this._connectTimeoutTimer);
        this._connectTimeoutTimer = setTimeout(function () {
          if (_this3._status === 'connecting') {
            console.warn('[ChatWS] 连接超时（5秒），强制关闭并重连');
            if (_this3._ws) {
              // SocketTask 已存在，走正常关闭流程（会触发 onClose → 重连）
              _this3._doClose(4000, 'Connection timeout');
            } else {
              // Promise 尚未 resolve，无 SocketTask 可关闭，直接重连
              _this3._setStatus('closed');
              _this3._tryFallbackOrReconnect();
            }
          }
        }, 5000);
        if (this._isH5 && typeof WebSocket !== 'undefined') {
          this._ws = new WebSocket(url);
          this._bindH5Events(this._ws, token);
        } else {
          // Taro 4.x: connectSocket 返回 Promise<SocketTask>，需通过 .then() 获取 SocketTask 实例
          this._ws = null; // 标记为 null，等待 Promise resolve
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().connectSocket({
            url: url,
            protocols: [],
            complete: function complete() {}
          }).then(function (task) {
            // Promise resolve 时检查是否已被取消（用户 disconnect 或超时关闭）
            if (_this3._status !== 'connecting') {
              console.log('[ChatWS] SocketTask 已 resolve 但连接状态已变更:', _this3._status, '，关闭残留 task');
              try {
                task.close({
                  code: 4001,
                  reason: 'Cancelled',
                  complete: function complete() {}
                });
              } catch (_unused2) {}
              return;
            }
            _this3._ws = task;
            _this3._bindMiniEvents(task, token);
          }).catch(function (err) {
            console.error('[ChatWS] connectSocket Promise rejected:', err);
            if (_this3._status === 'connecting') {
              _this3._setStatus('closed');
              _this3._tryFallbackOrReconnect();
            }
          });
        }
      } catch (err) {
        console.error('[ChatWS] 创建连接异常:', err);
        this._setStatus('closed');
        this._tryFallbackOrReconnect();
      }
    }
  }, {
    key: "_bindH5Events",
    value: function _bindH5Events(ws, token) {
      var _this4 = this;
      ws.onopen = function () {
        return _this4._onOpen(token);
      };
      ws.onmessage = function (ev) {
        return _this4._onMessage(ev.data);
      };
      ws.onerror = function (ev) {
        var wsAny = ws;
        console.error('[ChatWS] H5 WebSocket error:', {
          event: ev,
          readyState: wsAny.readyState,
          url: wsAny.url,
          // 诊断信息
          diagnostic: _this4._diagnoseError(wsAny, token)
        });
        // 握手失败后立即发送一次诊断探测（带/不带 Origin 的 HTTP 对比），
        // 帮助定位是否为后端 Origin 中间件 403 拒握手
        _this4._probeOriginPolicy(wsAny.url);
      };
      ws.onclose = function (ev) {
        console.log("[ChatWS] H5 \u5173\u95ED code=".concat(ev.code, " reason=").concat(ev.reason, " wasClean=").concat(ev.wasClean));
        _this4._onClose();
      };
    }
  }, {
    key: "_bindMiniEvents",
    value: function _bindMiniEvents(task, token) {
      var _this5 = this;
      task.onOpen(function () {
        return _this5._onOpen(token);
      });
      task.onMessage(function (res) {
        var _data;
        return _this5._onMessage((_data = res.data) !== null && _data !== void 0 ? _data : res);
      });
      task.onError(function (err) {
        return console.error('[ChatWS] 小程序 WebSocket error:', err);
      });
      task.onClose(function (res) {
        console.log("[ChatWS] \u5C0F\u7A0B\u5E8F WebSocket \u5173\u95ED code=".concat(res === null || res === void 0 ? void 0 : res.code, " reason=").concat(res === null || res === void 0 ? void 0 : res.reason));
        _this5._onClose();
      });
    }
  }, {
    key: "_onOpen",
    value: function _onOpen(token) {
      console.log('[ChatWS] WebSocket 握手成功（URL token 鉴权通过）');
      // 清除连接超时定时器
      if (this._connectTimeoutTimer) {
        clearTimeout(this._connectTimeoutTimer);
        this._connectTimeoutTimer = null;
      }
      this._setStatus('open');
      this._reconnectAttempts = 0;

      // URL 已携带 token，握手成功即视为鉴权通过
      // 同时发送首条 auth 消息作为兼容（部分后端可能需要双重鉴权）
      if (token) {
        this._sendAuthMessage(token);
      } else {
        console.warn('[ChatWS] 无 token，以匿名身份连接');
        this._authSent = true;
        this._startHeartbeat();
        this._flushSendQueue();
      }
    }

    /**
     * 发送鉴权消息（首条消息方式）
     * 部分后端 WebSocket 不支持 URL query token，需在 open 后立即发送鉴权消息
     */
  }, {
    key: "_sendAuthMessage",
    value: function _sendAuthMessage(token) {
      var _this6 = this;
      if (!this._ws || this._status !== 'open') return;
      var authMsg = {
        type: 'auth',
        data: {
          token: token
        }
      };
      try {
        var payload = JSON.stringify(authMsg);
        if (this._isH5) {
          this._ws.send(payload);
        } else {
          this._ws.send({
            data: payload,
            complete: function complete() {}
          });
        }
        this._authSent = true;
        console.log('[ChatWS] 鉴权消息已发送');

        // 鉴权超时保护：5 秒内未收到 auth_ack 则视为鉴权失败
        this._clearAuthTimer();
        this._authTimer = setTimeout(function () {
          if (!_this6._authSent && _this6._status === 'open') {
            console.warn('[ChatWS] 鉴权超时，关闭连接');
            _this6._doClose(4001, 'Auth timeout');
          }
        }, 5000);

        // 启动心跳并 flush 发送队列
        this._startHeartbeat();
        this._flushSendQueue();
      } catch (err) {
        console.error('[ChatWS] 鉴权消息发送失败:', err);
        this._authSent = false;
        // 鉴权失败仍尝试继续连接
        this._startHeartbeat();
        this._flushSendQueue();
      }
    }
  }, {
    key: "_clearAuthTimer",
    value: function _clearAuthTimer() {
      if (this._authTimer) {
        clearTimeout(this._authTimer);
        this._authTimer = null;
      }
    }
  }, {
    key: "_onClose",
    value: function _onClose() {
      // 清除连接超时定时器
      if (this._connectTimeoutTimer) {
        clearTimeout(this._connectTimeoutTimer);
        this._connectTimeoutTimer = null;
      }
      this._clearHeartbeat();
      this._clearAuthTimer();
      this._authSent = false;
      this._setStatus('closed');
      this._ws = null;
      if (this._shouldReconnect && !this._manualClose) {
        this._tryFallbackOrReconnect();
      }
    }

    /**
     * 尝试 fallback 到直连后端（仅 H5 环境的第一次失败），否则走常规重连
     */
  }, {
    key: "_tryFallbackOrReconnect",
    value: function _tryFallbackOrReconnect() {
      if (this._isH5 && !this._useDirectFallback && !this._fallbackTried) {
        // 第一次失败：尝试直连后端 fallback
        this._fallbackTried = true;
        this._useDirectFallback = true;
        console.warn('[ChatWS] 代理连接失败，尝试直连后端 fallback...');
        this._reconnectAttempts = 0; // 重置重连计数
        this._scheduleReconnect(500); // 快速重连
      } else {
        this._scheduleReconnect();
      }
    }
  }, {
    key: "_doClose",
    value: function _doClose(code, reason) {
      if (!this._ws) {
        this._setStatus('closed');
        return;
      }
      if (this._status === 'closed' || this._status === 'closing') return;
      this._setStatus('closing');
      try {
        if (this._isH5) {
          this._ws.close(code, reason);
        } else {
          this._ws.close({
            code: code,
            reason: reason,
            complete: function complete() {}
          });
        }
      } catch (err) {
        console.warn('[ChatWS] 关闭异常:', err);
      }
    }

    // ============== 内部：发送 ==============
  }, {
    key: "_doSend",
    value: function _doSend(msg) {
      if (!this._ws || this._status !== 'open' || !this._authSent) return false;
      try {
        var payload = JSON.stringify(msg);
        if (this._isH5) {
          this._ws.send(payload);
        } else {
          this._ws.send({
            data: payload,
            complete: function complete() {}
          });
        }
        return true;
      } catch (err) {
        console.error('[ChatWS] 发送失败，重新入队:', err);
        if (this._sendQueue.length < SEND_QUEUE_LIMIT) {
          this._sendQueue.unshift(msg);
        }
        return false;
      }
    }
  }, {
    key: "_flushSendQueue",
    value: function _flushSendQueue() {
      if (this._sendQueue.length === 0) return;
      console.debug("[ChatWS] Flush \u53D1\u9001\u961F\u5217: ".concat(this._sendQueue.length, " \u6761"));
      while (this._sendQueue.length > 0 && this._status === 'open' && this._authSent) {
        var _msg = this._sendQueue.shift();
        if (!this._doSend(_msg)) {
          this._sendQueue.unshift(_msg);
          break;
        }
      }
    }

    // ============== 内部：入站消息处理 ==============
  }, {
    key: "_onMessage",
    value: function _onMessage(raw) {
      var parsed;
      try {
        parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      } catch (err) {
        console.warn('[ChatWS] 非 JSON 消息，忽略:', raw);
        return;
      }

      // 鉴权确认
      if (parsed.type === 'auth_ack') {
        this._authSent = true;
        this._clearAuthTimer();
        console.log('[ChatWS] 鉴权成功', parsed.data);
        return;
      }

      // 心跳响应
      if (parsed.type === 'pong') {
        this._resetIdleTimer();
        return;
      }
      if (parsed.type === 'ping') {
        this.send({
          type: 'pong'
        });
        return;
      }

      // 序列号 gap 检测
      if (typeof parsed.seq === 'number' && this._lastServerSeq !== null) {
        var gap = parsed.seq - this._lastServerSeq - 1;
        if (gap >= SEQUENCE_GAP_THRESHOLD) {
          console.warn("[ChatWS] \u26A0\uFE0F \u68C0\u6D4B\u5230\u6D88\u606F gap! last=".concat(this._lastServerSeq, ", cur=").concat(parsed.seq, ", gap=").concat(gap));
        }
      }
      if (typeof parsed.seq === 'number') {
        this._lastServerSeq = parsed.seq;
      }

      // 缓冲区（慢消费者保护）
      this._msgBuffer.push(parsed);
      if (this._msgBuffer.length > MSG_BUFFER_LIMIT) {
        var dropped = this._msgBuffer.length - MSG_BUFFER_LIMIT;
        console.warn("[ChatWS] \uD83E\uDDEF \u5165\u7AD9\u7F13\u51B2\u6EA2\u51FA\uFF0C\u4E22\u5F03 ".concat(dropped, " \u6761\u65E7\u6D88\u606F"));
        this._msgBuffer.splice(0, dropped);
      }

      // 重置空闲计时
      this._resetIdleTimer();

      // 广播给监听者
      this._listeners.forEach(function (fn) {
        try {
          fn(parsed);
        } catch (e) {
          console.error('[ChatWS] listener error:', e);
        }
      });
    }

    // ============== 内部：心跳 & 空闲 ==============
  }, {
    key: "_startHeartbeat",
    value: function _startHeartbeat() {
      var _this7 = this;
      this._clearHeartbeat();
      this._heartbeatTimer = setInterval(function () {
        if (_this7._status === 'open' && _this7._authSent) {
          _this7.send({
            type: 'ping'
          });
        }
      }, HEARTBEAT_INTERVAL);
      this._resetIdleTimer();
    }
  }, {
    key: "_clearHeartbeat",
    value: function _clearHeartbeat() {
      if (this._heartbeatTimer) {
        clearInterval(this._heartbeatTimer);
        this._heartbeatTimer = null;
      }
      if (this._idleTimer) {
        clearTimeout(this._idleTimer);
        this._idleTimer = null;
      }
    }
  }, {
    key: "_resetIdleTimer",
    value: function _resetIdleTimer() {
      var _this8 = this;
      if (this._idleTimer) clearTimeout(this._idleTimer);
      this._idleTimer = setTimeout(function () {
        console.warn('[ChatWS] 心跳超时，关闭连接并重连');
        _this8._doClose(4000, 'Idle timeout');
      }, HEARTBEAT_IDLE_TIMEOUT);
    }

    // ============== 内部：重连（指数退避 + 抖动）==============
  }, {
    key: "_scheduleReconnect",
    value: function _scheduleReconnect(initialDelay) {
      var _this9 = this;
      this._clearReconnectTimer();
      if (!this._shouldReconnect) return;

      // 超过最大重连次数则停止，等待用户手动触发
      if (this._reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.warn("[ChatWS] \u5DF2\u8FBE\u6700\u5927\u91CD\u8FDE\u6B21\u6570 (".concat(MAX_RECONNECT_ATTEMPTS, ")\uFF0C\u505C\u6B62\u81EA\u52A8\u91CD\u8FDE\uFF0C\u8BF7\u624B\u52A8\u89E6\u53D1"));
        this._setStatus('closed');
        return;
      }
      this._reconnectAttempts += 1;

      // 支持外部指定初始延迟（用于 fallback 快速重连）
      if (initialDelay !== undefined && this._reconnectAttempts === 1) {
        console.log("[ChatWS] \uD83D\uDD04 fallback \u91CD\u8FDE\uFF0C".concat(initialDelay, "ms \u540E..."));
        this._reconnectTimer = setTimeout(function () {
          if (_this9._shouldReconnect) _this9._doConnect();
        }, initialDelay);
        return;
      }
      var baseDelay = Math.min(BASE_RECONNECT_DELAY * Math.pow(2, this._reconnectAttempts - 1), MAX_RECONNECT_DELAY);
      var jitter = baseDelay * RECONNECT_JITTER * (Math.random() * 2 - 1);
      var delay = Math.round(baseDelay + jitter);
      console.log("[ChatWS] \uD83D\uDD04 \u8BA1\u5212\u7B2C ".concat(this._reconnectAttempts, "/").concat(MAX_RECONNECT_ATTEMPTS, " \u6B21\u91CD\u8FDE\uFF0C").concat(delay, "ms \u540E..."));
      this._reconnectTimer = setTimeout(function () {
        if (_this9._shouldReconnect) _this9._doConnect();
      }, delay);
    }
  }, {
    key: "_clearReconnectTimer",
    value: function _clearReconnectTimer() {
      if (this._reconnectTimer) {
        clearTimeout(this._reconnectTimer);
        this._reconnectTimer = null;
      }
    }

    // ============== 内部：诊断工具 ==============
  }, {
    key: "_diagnoseError",
    value: function _diagnoseError(ws, token) {
      var parts = [];
      parts.push("readyState=".concat(ws.readyState));
      parts.push("url=".concat(ws.url || 'N/A'));
      if (!ws.url) {
        parts.push('⚠️ WebSocket 未设置 URL');
      } else if (ws.url.startsWith('ws://localhost') || ws.url.startsWith('ws://127.0.0.1')) {
        parts.push('⚠️ 直连 localhost/127.0.0.1，若后端不在本机将无法连接');
      }
      if (!token) {
        parts.push('⚠️ 无 token，可能因未登录被后端拒绝');
      }
      parts.push("\u4EE3\u7406\u914D\u7F6E: config/dev.ts \u4E2D /api \u4EE3\u7406 ws:true + onProxyReqWs \u5DF2\u5265\u79BB Origin/Referer");
      parts.push("\u82E5\u76F4\u8FDE\u540E\u7AEF: \u540E\u7AEF Origin \u4E2D\u95F4\u4EF6\u5FC5\u987B\u653E\u884C WebSocket \u63E1\u624B\uFF0C\u5426\u5219\u6D4F\u89C8\u5668\u5F3A\u5236 Origin \u2192 403");
      parts.push("\u63E1\u624B\u9274\u6743: \u9996\u6761\u6D88\u606F {type:\"auth\",data:{token}} \u65B9\u6848\u5DF2\u542F\u7528");
      return parts.join(' | ');
    }

    /**
     * 主动探测后端 Origin 策略（WS 握手失败时触发一次，辅助诊断）
     * 带 Origin 与不带 Origin 的 HTTP GET 对比：
     *   - 403 (带) + 200 (不带)  → Origin 中间件黑名单拒绝，需后端放行 WebSocket 握手
     *   - 200 (带) + 200 (不带)  → Origin 校验正常，排查 WS 路由/Upgrade 处理
     */
  }, {
    key: "_probeOriginPolicy",
    value: function _probeOriginPolicy(target) {
      if (!target) return;
      var path = target.replace(/^wss?:\/\//, '').replace(/^[^/]+/, '') || '/';
      var baseOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      var run = function run(withOrigin, tag) {
        var headers = {};
        if (withOrigin) headers['Origin'] = baseOrigin;
        fetch(path, {
          method: 'GET',
          headers: headers,
          mode: 'no-cors',
          cache: 'no-store'
        }).then(function () {
          return console.info("[ChatWS] probe ".concat(tag, " OK (mode=no-cors)"));
        }).catch(function (err) {
          return console.info("[ChatWS] probe ".concat(tag, " err:"), err);
        });
      };
      console.groupCollapsed('[ChatWS] Origin 策略探测');
      console.info('目标路径:', path);
      run(true, 'with-Origin');
      run(false, 'no-Origin');
      console.groupEnd();
    }

    // ============== 内部：状态广播 ==============
  }, {
    key: "_setStatus",
    value: function _setStatus(s) {
      if (this._status === s) return;
      this._status = s;
      console.debug("[ChatWS] \u72B6\u6001\u53D8\u5316 \u2192 ".concat(s));
      this._statusListeners.forEach(function (fn) {
        try {
          fn(s);
        } catch (e) {
          console.error('[ChatWS] status listener error:', e);
        }
      });
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!ChatWebSocketManager._instance) {
        ChatWebSocketManager._instance = new ChatWebSocketManager();
      }
      return ChatWebSocketManager._instance;
    }
  }]);
}();
_ChatWebSocketManager = ChatWebSocketManager;
(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_4__["default"])(ChatWebSocketManager, "_instance", null);
var chatWS = ChatWebSocketManager.getInstance();
/* harmony default export */ __webpack_exports__["default"] = (chatWS);

/***/ }),

/***/ "./src/utils/image.ts":
/*!****************************!*\
  !*** ./src/utils/image.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBrandIcon: function() { return /* binding */ getBrandIcon; },
/* harmony export */   getImageUrl: function() { return /* binding */ getImageUrl; },
/* harmony export */   isValidImageUrl: function() { return /* binding */ isValidImageUrl; },
/* harmony export */   lazyImgProps: function() { return /* binding */ lazyImgProps; },
/* harmony export */   normalizeProductImages: function() { return /* binding */ normalizeProductImages; },
/* harmony export */   normalizeProductListImages: function() { return /* binding */ normalizeProductListImages; }
/* harmony export */ });
/* unused harmony exports getImageUrls, isValidBrandLogo */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* provided dependency */ var URL = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["URL"];



/**
 * 图片URL处理工具
 * 处理后端返回的图片URL，过滤掉无效的占位符域名
 */

// 默认占位图
var DEFAULT_PLACEHOLDER = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?placeholder';

// 需要过滤的占位符域名（精确匹配主机名）
// 注意：后端使用 img.example.com 作为图片服务器，不可过滤
var PLACEHOLDER_DOMAINS = ['placeholder.com', 'test.com', 'demo.com', 'example.com', 'example.cn', 'xxx.com', 'xxx.cn', 'xxx.yyy', 'xxx', 'yyy', 'demo.example.com', 'test.example.com'];

/**
 * 从 URL 中提取主机名
 */
function extractHostname(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch (_unused) {
    return '';
  }
}

/**
 * 检查URL是否是有效的图片URL
 */
function isValidImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:')) return true;
  if (url.startsWith('/')) return true;

  // 精确匹配主机名，避免 img.example.com 被 example.com 误过滤
  var hostname = extractHostname(url);
  if (!hostname) return true; // 无法解析的 URL 默认放行
  return !PLACEHOLDER_DOMAINS.some(function (domain) {
    return hostname === domain || hostname.endsWith('.' + domain);
  });
}

/**
 * 获取有效的图片URL，过滤占位符
 */
function getImageUrl(url) {
  if (!url) return DEFAULT_PLACEHOLDER;
  if (isValidImageUrl(url)) return url;
  return DEFAULT_PLACEHOLDER;
}

/**
 * 批量处理图片URL数组
 */
function getImageUrls(urls) {
  if (!urls || !Array.isArray(urls)) return [];
  return urls.map(function (url) {
    return getImageUrl(url);
  });
}

/**
 * 规范化单个 SKU 数据
 * 兼容 snake_case、camelCase、PascalCase 字段命名
 */
function normalizeSku(sku) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _sku$specs, _ref7, _ref8, _ref9, _ref0, _sku$id, _ref1, _ref10, _ref11, _sku$price, _ref12, _ref13, _ref14, _ref15, _ref16, _sku$stock, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _sku$name;
  if (!sku) return sku;
  var result = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, sku);

  // 规格字段兼容：spec_values / SpecValues / specValue / specs / Specs / spec
  var specs = (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_sku$specs = sku.specs) !== null && _sku$specs !== void 0 ? _sku$specs : sku.spec_values) !== null && _ref6 !== void 0 ? _ref6 : sku.SpecValues) !== null && _ref5 !== void 0 ? _ref5 : sku.specValue) !== null && _ref4 !== void 0 ? _ref4 : sku.SpecValue) !== null && _ref3 !== void 0 ? _ref3 : sku.Specs) !== null && _ref2 !== void 0 ? _ref2 : sku.spec) !== null && _ref !== void 0 ? _ref : {};
  result.specs = specs;

  // ID 兼容：id / ID / skuId / SkuId / sku_id
  result.id = String((_ref7 = (_ref8 = (_ref9 = (_ref0 = (_sku$id = sku.id) !== null && _sku$id !== void 0 ? _sku$id : sku.ID) !== null && _ref0 !== void 0 ? _ref0 : sku.skuId) !== null && _ref9 !== void 0 ? _ref9 : sku.SkuId) !== null && _ref8 !== void 0 ? _ref8 : sku.sku_id) !== null && _ref7 !== void 0 ? _ref7 : '');

  // 价格兼容：price / Price / skuPrice / SkuPrice
  result.price = Number((_ref1 = (_ref10 = (_ref11 = (_sku$price = sku.price) !== null && _sku$price !== void 0 ? _sku$price : sku.Price) !== null && _ref11 !== void 0 ? _ref11 : sku.skuPrice) !== null && _ref10 !== void 0 ? _ref10 : sku.SkuPrice) !== null && _ref1 !== void 0 ? _ref1 : 0);

  // 库存兼容：stock / Stock / skuStock / SkuStock / inventory / Inventory
  result.stock = Number((_ref12 = (_ref13 = (_ref14 = (_ref15 = (_ref16 = (_sku$stock = sku.stock) !== null && _sku$stock !== void 0 ? _sku$stock : sku.Stock) !== null && _ref16 !== void 0 ? _ref16 : sku.skuStock) !== null && _ref15 !== void 0 ? _ref15 : sku.SkuStock) !== null && _ref14 !== void 0 ? _ref14 : sku.inventory) !== null && _ref13 !== void 0 ? _ref13 : sku.Inventory) !== null && _ref12 !== void 0 ? _ref12 : 0);

  // 图片兼容：image / Image / skuImage / SkuImage / sku_image
  result.image = sku.image ? getImageUrl(sku.image) : sku.Image ? getImageUrl(sku.Image) : sku.skuImage ? getImageUrl(sku.skuImage) : sku.SkuImage ? getImageUrl(sku.SkuImage) : sku.sku_image ? getImageUrl(sku.sku_image) : '';

  // SKU 名称兼容：name / Name / skuName / SkuName / sku_name / title / Title
  var name = (_ref17 = (_ref18 = (_ref19 = (_ref20 = (_ref21 = (_ref22 = (_sku$name = sku.name) !== null && _sku$name !== void 0 ? _sku$name : sku.Name) !== null && _ref22 !== void 0 ? _ref22 : sku.skuName) !== null && _ref21 !== void 0 ? _ref21 : sku.SkuName) !== null && _ref20 !== void 0 ? _ref20 : sku.sku_name) !== null && _ref19 !== void 0 ? _ref19 : sku.title) !== null && _ref18 !== void 0 ? _ref18 : sku.Title) !== null && _ref17 !== void 0 ? _ref17 : '';
  // 如果没有 name，从规格值拼接（格式：颜色 值 存储容量 值）
  if (!name && result.specs && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result.specs) === 'object') {
    name = Object.entries(result.specs).map(function (_ref23) {
      var _ref24 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref23, 2),
        v = _ref24[1];
      return v;
    }).filter(Boolean).join(' ');
  }
  // 再兜底用 skuCode
  if (!name) {
    var _ref25, _ref26, _sku$skuCode;
    name = (_ref25 = (_ref26 = (_sku$skuCode = sku.skuCode) !== null && _sku$skuCode !== void 0 ? _sku$skuCode : sku.SkuCode) !== null && _ref26 !== void 0 ? _ref26 : sku.sku_code) !== null && _ref25 !== void 0 ? _ref25 : '';
  }
  result.name = name;
  return result;
}

/**
 * 规范化商品图片数据
 * 处理后端返回的商品图片，确保所有图片都是有效的URL
 * 同时规范化 SKU 字段（spec_values → specs，补全 name 等）
 * 以及品牌、分类、价格、库存等字段命名兼容
 */
function normalizeProductImages(product) {
  var _ref27, _ref28, _ref29, _ref30, _ref31, _normalized$brandId, _normalized$brand, _normalized$brand2, _ref32, _ref33, _ref34, _ref35, _normalized$brandName, _normalized$brand3, _normalized$brand4, _ref36, _ref37, _ref38, _ref39, _ref40, _normalized$categoryI, _normalized$category, _normalized$category2, _ref41, _ref42, _ref43, _ref44, _normalized$categoryN, _normalized$category3, _normalized$category4, _ref45, _ref46, _ref47, _ref48, _normalized$price, _ref56, _ref57, _ref58, _ref59, _ref60, _ref61, _normalized$stock, _ref62, _ref63, _ref64, _ref65, _ref66, _ref67, _normalized$sales, _ref68, _ref69, _ref70, _ref71, _normalized$skus, _ref72, _ref73, _ref74, _ref75, _ref76, _ref77, _ref78, _ref79, _ref80, _ref81, _ref82, _ref83, _ref84, _ref85, _ref86, _ref87, _ref88, _ref89, _ref90, _ref91, _ref92, _ref93, _ref94, _ref95, _normalized$descripti;
  if (!product) return product;
  var normalized = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, product);

  // ====== 图片字段处理 ======
  // 处理images数组
  if (normalized.images && Array.isArray(normalized.images)) {
    normalized.images = normalized.images.map(function (url) {
      return getImageUrl(url);
    });
  }
  // 兼容 Images / imageList / ImageList / images_list
  else if (normalized.Images && Array.isArray(normalized.Images)) {
    normalized.images = normalized.Images.map(function (url) {
      return getImageUrl(url);
    });
  } else if (normalized.imageList && Array.isArray(normalized.imageList)) {
    normalized.images = normalized.imageList.map(function (url) {
      return getImageUrl(url);
    });
  } else if (normalized.ImageList && Array.isArray(normalized.ImageList)) {
    normalized.images = normalized.ImageList.map(function (url) {
      return getImageUrl(url);
    });
  } else if (normalized.images_list && Array.isArray(normalized.images_list)) {
    normalized.images = normalized.images_list.map(function (url) {
      return getImageUrl(url);
    });
  }

  // 处理单图字段
  if (normalized.image) {
    normalized.image = getImageUrl(normalized.image);
  } else if (normalized.Image) {
    normalized.image = getImageUrl(normalized.Image);
  }

  // ====== 品牌字段处理 ======
  // brandId：brand_id / BrandId / brand.ID / brand.id / brandId
  normalized.brandId = String((_ref27 = (_ref28 = (_ref29 = (_ref30 = (_ref31 = (_normalized$brandId = normalized.brandId) !== null && _normalized$brandId !== void 0 ? _normalized$brandId : normalized.BrandId) !== null && _ref31 !== void 0 ? _ref31 : normalized.brand_id) !== null && _ref30 !== void 0 ? _ref30 : normalized.brand_id) !== null && _ref29 !== void 0 ? _ref29 : (_normalized$brand = normalized.brand) === null || _normalized$brand === void 0 ? void 0 : _normalized$brand.ID) !== null && _ref28 !== void 0 ? _ref28 : (_normalized$brand2 = normalized.brand) === null || _normalized$brand2 === void 0 ? void 0 : _normalized$brand2.id) !== null && _ref27 !== void 0 ? _ref27 : '');
  // brandName：brand_name / BrandName / brand.name / brand.Name / brandName
  normalized.brandName = (_ref32 = (_ref33 = (_ref34 = (_ref35 = (_normalized$brandName = normalized.brandName) !== null && _normalized$brandName !== void 0 ? _normalized$brandName : normalized.BrandName) !== null && _ref35 !== void 0 ? _ref35 : normalized.brand_name) !== null && _ref34 !== void 0 ? _ref34 : (_normalized$brand3 = normalized.brand) === null || _normalized$brand3 === void 0 ? void 0 : _normalized$brand3.name) !== null && _ref33 !== void 0 ? _ref33 : (_normalized$brand4 = normalized.brand) === null || _normalized$brand4 === void 0 ? void 0 : _normalized$brand4.Name) !== null && _ref32 !== void 0 ? _ref32 : '';

  // ====== 分类字段处理 ======
  // categoryId：category_id / CategoryId / category.ID / category.id / categoryId
  normalized.categoryId = String((_ref36 = (_ref37 = (_ref38 = (_ref39 = (_ref40 = (_normalized$categoryI = normalized.categoryId) !== null && _normalized$categoryI !== void 0 ? _normalized$categoryI : normalized.CategoryId) !== null && _ref40 !== void 0 ? _ref40 : normalized.category_id) !== null && _ref39 !== void 0 ? _ref39 : normalized.category_id) !== null && _ref38 !== void 0 ? _ref38 : (_normalized$category = normalized.category) === null || _normalized$category === void 0 ? void 0 : _normalized$category.ID) !== null && _ref37 !== void 0 ? _ref37 : (_normalized$category2 = normalized.category) === null || _normalized$category2 === void 0 ? void 0 : _normalized$category2.id) !== null && _ref36 !== void 0 ? _ref36 : '');
  // categoryName：category_name / CategoryName / category.name / category.Name / categoryName
  normalized.categoryName = (_ref41 = (_ref42 = (_ref43 = (_ref44 = (_normalized$categoryN = normalized.categoryName) !== null && _normalized$categoryN !== void 0 ? _normalized$categoryN : normalized.CategoryName) !== null && _ref44 !== void 0 ? _ref44 : normalized.category_name) !== null && _ref43 !== void 0 ? _ref43 : (_normalized$category3 = normalized.category) === null || _normalized$category3 === void 0 ? void 0 : _normalized$category3.name) !== null && _ref42 !== void 0 ? _ref42 : (_normalized$category4 = normalized.category) === null || _normalized$category4 === void 0 ? void 0 : _normalized$category4.Name) !== null && _ref41 !== void 0 ? _ref41 : '';

  // ====== 价格字段处理 ======
  normalized.price = Number((_ref45 = (_ref46 = (_ref47 = (_ref48 = (_normalized$price = normalized.price) !== null && _normalized$price !== void 0 ? _normalized$price : normalized.Price) !== null && _ref48 !== void 0 ? _ref48 : normalized.salePrice) !== null && _ref47 !== void 0 ? _ref47 : normalized.SalePrice) !== null && _ref46 !== void 0 ? _ref46 : normalized.sale_price) !== null && _ref45 !== void 0 ? _ref45 : 0);
  // originalPrice：original_price / OriginalPrice / marketPrice / MarketPrice / market_price
  if (normalized.originalPrice === undefined || normalized.originalPrice === null) {
    var _ref49, _ref50, _ref51, _ref52, _ref53, _ref54, _ref55, _normalized$originalP;
    normalized.originalPrice = Number((_ref49 = (_ref50 = (_ref51 = (_ref52 = (_ref53 = (_ref54 = (_ref55 = (_normalized$originalP = normalized.originalPrice) !== null && _normalized$originalP !== void 0 ? _normalized$originalP : normalized.OriginalPrice) !== null && _ref55 !== void 0 ? _ref55 : normalized.original_price) !== null && _ref54 !== void 0 ? _ref54 : normalized.original_price) !== null && _ref53 !== void 0 ? _ref53 : normalized.marketPrice) !== null && _ref52 !== void 0 ? _ref52 : normalized.MarketPrice) !== null && _ref51 !== void 0 ? _ref51 : normalized.market_price) !== null && _ref50 !== void 0 ? _ref50 : normalized.price) !== null && _ref49 !== void 0 ? _ref49 : 0);
  }

  // ====== 库存 & 销量 ======
  normalized.stock = Number((_ref56 = (_ref57 = (_ref58 = (_ref59 = (_ref60 = (_ref61 = (_normalized$stock = normalized.stock) !== null && _normalized$stock !== void 0 ? _normalized$stock : normalized.Stock) !== null && _ref61 !== void 0 ? _ref61 : normalized.totalStock) !== null && _ref60 !== void 0 ? _ref60 : normalized.TotalStock) !== null && _ref59 !== void 0 ? _ref59 : normalized.total_stock) !== null && _ref58 !== void 0 ? _ref58 : normalized.inventory) !== null && _ref57 !== void 0 ? _ref57 : normalized.Inventory) !== null && _ref56 !== void 0 ? _ref56 : 0);
  normalized.sales = Number((_ref62 = (_ref63 = (_ref64 = (_ref65 = (_ref66 = (_ref67 = (_normalized$sales = normalized.sales) !== null && _normalized$sales !== void 0 ? _normalized$sales : normalized.Sales) !== null && _ref67 !== void 0 ? _ref67 : normalized.soldCount) !== null && _ref66 !== void 0 ? _ref66 : normalized.SoldCount) !== null && _ref65 !== void 0 ? _ref65 : normalized.sold_count) !== null && _ref64 !== void 0 ? _ref64 : normalized.sold) !== null && _ref63 !== void 0 ? _ref63 : normalized.Sold) !== null && _ref62 !== void 0 ? _ref62 : 0);

  // ====== SKU 处理 ======
  var skuList = (_ref68 = (_ref69 = (_ref70 = (_ref71 = (_normalized$skus = normalized.skus) !== null && _normalized$skus !== void 0 ? _normalized$skus : normalized.Skus) !== null && _ref71 !== void 0 ? _ref71 : normalized.SKUs) !== null && _ref70 !== void 0 ? _ref70 : normalized.skuList) !== null && _ref69 !== void 0 ? _ref69 : normalized.SkuList) !== null && _ref68 !== void 0 ? _ref68 : normalized.sku_list;
  if (skuList && Array.isArray(skuList)) {
    normalized.skus = skuList.map(function (sku) {
      return normalizeSku(sku);
    });
  }
  // 确保即使后端没返回 skus，也有一个空数组避免渲染报错
  if (!normalized.skus || !Array.isArray(normalized.skus)) {
    normalized.skus = [];
  }

  // ====== 商品详情描述字段处理 ======
  // 兼容后端多种详情字段命名（HTML 富文本）
  normalized.description = (_ref72 = (_ref73 = (_ref74 = (_ref75 = (_ref76 = (_ref77 = (_ref78 = (_ref79 = (_ref80 = (_ref81 = (_ref82 = (_ref83 = (_ref84 = (_ref85 = (_ref86 = (_ref87 = (_ref88 = (_ref89 = (_ref90 = (_ref91 = (_ref92 = (_ref93 = (_ref94 = (_ref95 = (_normalized$descripti = normalized.description) !== null && _normalized$descripti !== void 0 ? _normalized$descripti : normalized.Description) !== null && _ref95 !== void 0 ? _ref95 : normalized.detail) !== null && _ref94 !== void 0 ? _ref94 : normalized.Detail) !== null && _ref93 !== void 0 ? _ref93 : normalized.details) !== null && _ref92 !== void 0 ? _ref92 : normalized.Details) !== null && _ref91 !== void 0 ? _ref91 : normalized.content) !== null && _ref90 !== void 0 ? _ref90 : normalized.Content) !== null && _ref89 !== void 0 ? _ref89 : normalized.introduce) !== null && _ref88 !== void 0 ? _ref88 : normalized.Introduce) !== null && _ref87 !== void 0 ? _ref87 : normalized.introduction) !== null && _ref86 !== void 0 ? _ref86 : normalized.Introduction) !== null && _ref85 !== void 0 ? _ref85 : normalized.productDescription) !== null && _ref84 !== void 0 ? _ref84 : normalized.ProductDescription) !== null && _ref83 !== void 0 ? _ref83 : normalized.product_description) !== null && _ref82 !== void 0 ? _ref82 : normalized.product_desc) !== null && _ref81 !== void 0 ? _ref81 : normalized.desc) !== null && _ref80 !== void 0 ? _ref80 : normalized.Desc) !== null && _ref79 !== void 0 ? _ref79 : normalized.body) !== null && _ref78 !== void 0 ? _ref78 : normalized.Body) !== null && _ref77 !== void 0 ? _ref77 : normalized.richText) !== null && _ref76 !== void 0 ? _ref76 : normalized.RichText) !== null && _ref75 !== void 0 ? _ref75 : normalized.rich_text) !== null && _ref74 !== void 0 ? _ref74 : normalized.html) !== null && _ref73 !== void 0 ? _ref73 : normalized.Html) !== null && _ref72 !== void 0 ? _ref72 : '';
  return normalized;
}

/**
 * 批量规范化商品列表的图片
 */
function normalizeProductListImages(products) {
  if (!products || !Array.isArray(products)) return [];
  return products.map(function (product) {
    return normalizeProductImages(product);
  });
}

/**
 * 根据平台返回不同的图片懒加载属性
 * H5端使用原生loading='lazy'，小程序端使用lazyLoad
 */
function lazyImgProps() {
  if (false) {}
  return {
    lazyLoad: true
  };
}

/**
 * 品牌ID → 本地SVG图标映射
 * 后端返回的 img.example.com 域名无法解析，因此用本地图标替代
 */
var BRAND_ICON_MAP = {
  '30': 'huawei',
  '31': 'xiaomi',
  '32': 'apple',
  '33': 'nike',
  '34': 'squirrel',
  '35': 'rice'
};

/**
 * 品牌名 → 本地SVG图标映射（兜底）
 */
var BRAND_NAME_ICON_MAP = {
  '华为': 'huawei',
  '小米': 'xiaomi',
  '苹果': 'apple',
  'nike': 'nike',
  'Nike': 'nike',
  'NIKE': 'nike',
  '三只松鼠': 'squirrel',
  '大米': 'rice'
};

// 动态引入品牌 SVG
var BRAND_SVG_MODULES = {
  huawei: __webpack_require__(/*! @/icons/brands/huawei.svg */ "./src/icons/brands/huawei.svg"),
  xiaomi: __webpack_require__(/*! @/icons/brands/xiaomi.svg */ "./src/icons/brands/xiaomi.svg"),
  apple: __webpack_require__(/*! @/icons/brands/apple.svg */ "./src/icons/brands/apple.svg"),
  nike: __webpack_require__(/*! @/icons/brands/nike.svg */ "./src/icons/brands/nike.svg"),
  squirrel: __webpack_require__(/*! @/icons/brands/squirrel.svg */ "./src/icons/brands/squirrel.svg"),
  rice: __webpack_require__(/*! @/icons/brands/rice.svg */ "./src/icons/brands/rice.svg")
};

/**
 * 检查品牌 logo 是否为有效的网络图片（非 example.com 占位符）
 */
function isValidBrandLogo(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:')) return true;
  var hostname = extractHostname(url);
  if (!hostname) return false;
  // 过滤掉 example.com 系列占位域名
  var isPlaceholder = hostname === 'example.com' || hostname.endsWith('.example.com') || hostname === 'example.cn' || hostname.endsWith('.example.cn') || hostname === 'placeholder.com' || hostname.endsWith('.placeholder.com') || hostname === 'xxx.com' || hostname.endsWith('.xxx.com') || hostname === 'xxx.cn' || hostname.endsWith('.xxx.cn') || hostname === 'xxx.yyy' || hostname.endsWith('.xxx.yyy') || hostname === 'test.com' || hostname.endsWith('.test.com') || hostname === 'demo.com' || hostname.endsWith('.demo.com');
  return !isPlaceholder;
}

/**
 * 根据品牌数据获取品牌图标
 * 优先使用 API 返回的有效 logo，其次使用本地 SVG 映射，最后用默认品牌图标
 */
function getBrandIcon(brand) {
  if (!brand) return BRAND_SVG_MODULES.huawei;
  var logo = brand.logo || brand.image;
  if (isValidBrandLogo(logo)) {
    return logo;
  }
  var id = brand.id !== undefined ? String(brand.id) : '';
  var name = brand.name || '';

  // 优先 ID 匹配
  var iconKeyById = id ? BRAND_ICON_MAP[id] : null;
  if (iconKeyById && BRAND_SVG_MODULES[iconKeyById]) {
    return BRAND_SVG_MODULES[iconKeyById];
  }

  // 兜底名称匹配
  var iconKeyByName = name ? BRAND_NAME_ICON_MAP[name] : null;
  if (iconKeyByName && BRAND_SVG_MODULES[iconKeyByName]) {
    return BRAND_SVG_MODULES[iconKeyByName];
  }

  // 最终兜底：默认商店图标
  return __webpack_require__(/*! @/icons/brand-store.svg */ "./src/icons/brand-store.svg");
}

/***/ }),

/***/ "./src/utils/time.ts":
/*!***************************!*\
  !*** ./src/utils/time.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDateTime: function() { return /* binding */ formatDateTime; },
/* harmony export */   formatTime: function() { return /* binding */ formatTime; }
/* harmony export */ });
// 统一时间格式化工具

/**
 * 格式化日期时间：xxxx年xx月xx日 xx时xx分
 * 今年以内省略年份：xx月xx日 xx时xx分
 */
function formatDateTime(time) {
  if (!time) return '';
  var date = new Date(time);
  if (isNaN(date.getTime())) return String(time);
  var now = new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  if (year === now.getFullYear()) {
    return "".concat(month, "\u6708").concat(day, "\u65E5 ").concat(hours, "\u65F6").concat(minutes, "\u5206");
  }
  return "".concat(year, "\u5E74").concat(month, "\u6708").concat(day, "\u65E5 ").concat(hours, "\u65F6").concat(minutes, "\u5206");
}

/**
 * 格式化时间：xx时xx分
 */
function formatTime(time) {
  if (!time) return '';
  var date = new Date(time);
  if (isNaN(date.getTime())) return String(time);
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  return "".concat(hours, "\u65F6").concat(minutes, "\u5206");
}

/***/ }),

/***/ "./src/utils/wechatPay.ts":
/*!********************************!*\
  !*** ./src/utils/wechatPay.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeWechatPayment: function() { return /* binding */ executeWechatPayment; }
/* harmony export */ });
/* unused harmony exports normalizePayParams, requestWechatPayment, pollPaymentStatus */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* provided dependency */ var navigator = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["navigator"];
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["window"];
/* provided dependency */ var document = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["document"];






/**
 * 微信支付工具模块
 *
 * 支持两端：
 *  - 小程序（WEAPP）：调用 Taro.requestPayment 拉起微信支付（JSAPI）
 *  - H5：
 *    - 微信内置浏览器：通过 WeixinJSBridge.invoke('getBrandWCPayRequest') 拉起支付
 *    - 普通浏览器：通过 mweb_url 跳转微信 H5 支付
 *
 * 后端 POST /api/v1/orders/:id/pay 返回的支付参数（标准微信 JSAPI 6 字段）：
 *   { timeStamp, nonceStr, package, signType, paySign, [prepayId] }
 * H5 支付可能额外返回：{ mwebUrl }
 */

// 微信支付参数（后端返回）

// 从后端 payOrder 响应中规范化支付参数（兼容多种字段命名）
function normalizePayParams(raw) {
  var _raw$data, _ref, _ref2, _ref3, _data$timeStamp, _ref4, _ref5, _ref6, _data$nonceStr, _ref7, _ref8, _ref9, _data$package, _ref0, _ref1, _data$signType, _ref10, _ref11, _ref12, _data$paySign, _ref13, _ref14, _ref15, _ref16, _data$mwebUrl, _ref17, _ref18, _data$prepayId, _ref19, _ref20, _data$orderNo, _ref21, _data$amount, _ref22, _data$transactionId;
  if (!raw || (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_2__["default"])(raw) !== 'object') return null;
  var data = (_raw$data = raw.data) !== null && _raw$data !== void 0 ? _raw$data : raw;

  // 兼容 PascalCase / snake_case / camelCase
  var timeStamp = (_ref = (_ref2 = (_ref3 = (_data$timeStamp = data.timeStamp) !== null && _data$timeStamp !== void 0 ? _data$timeStamp : data.time_stamp) !== null && _ref3 !== void 0 ? _ref3 : data.TimeStamp) !== null && _ref2 !== void 0 ? _ref2 : data.timestamp) !== null && _ref !== void 0 ? _ref : '';
  var nonceStr = (_ref4 = (_ref5 = (_ref6 = (_data$nonceStr = data.nonceStr) !== null && _data$nonceStr !== void 0 ? _data$nonceStr : data.nonce_str) !== null && _ref6 !== void 0 ? _ref6 : data.NonceStr) !== null && _ref5 !== void 0 ? _ref5 : data.noncestr) !== null && _ref4 !== void 0 ? _ref4 : '';
  var pkg = (_ref7 = (_ref8 = (_ref9 = (_data$package = data.package) !== null && _data$package !== void 0 ? _data$package : data.Package) !== null && _ref9 !== void 0 ? _ref9 : data.packageStr) !== null && _ref8 !== void 0 ? _ref8 : data.package_str) !== null && _ref7 !== void 0 ? _ref7 : '';
  var signType = (_ref0 = (_ref1 = (_data$signType = data.signType) !== null && _data$signType !== void 0 ? _data$signType : data.sign_type) !== null && _ref1 !== void 0 ? _ref1 : data.SignType) !== null && _ref0 !== void 0 ? _ref0 : 'MD5';
  var paySign = (_ref10 = (_ref11 = (_ref12 = (_data$paySign = data.paySign) !== null && _data$paySign !== void 0 ? _data$paySign : data.pay_sign) !== null && _ref12 !== void 0 ? _ref12 : data.PaySign) !== null && _ref11 !== void 0 ? _ref11 : data.signature) !== null && _ref10 !== void 0 ? _ref10 : '';

  // H5 支付跳转链接
  var mwebUrl = (_ref13 = (_ref14 = (_ref15 = (_ref16 = (_data$mwebUrl = data.mwebUrl) !== null && _data$mwebUrl !== void 0 ? _data$mwebUrl : data.mweb_url) !== null && _ref16 !== void 0 ? _ref16 : data.MwebUrl) !== null && _ref15 !== void 0 ? _ref15 : data.h5_url) !== null && _ref14 !== void 0 ? _ref14 : data.h5Url) !== null && _ref13 !== void 0 ? _ref13 : '';
  var params = {
    timeStamp: String(timeStamp),
    nonceStr: String(nonceStr),
    package: String(pkg),
    signType: String(signType),
    paySign: String(paySign),
    mwebUrl: mwebUrl ? String(mwebUrl) : undefined,
    prepayId: (_ref17 = (_ref18 = (_data$prepayId = data.prepayId) !== null && _data$prepayId !== void 0 ? _data$prepayId : data.prepay_id) !== null && _ref18 !== void 0 ? _ref18 : data.PrepayId) !== null && _ref17 !== void 0 ? _ref17 : '',
    orderNo: (_ref19 = (_ref20 = (_data$orderNo = data.orderNo) !== null && _data$orderNo !== void 0 ? _data$orderNo : data.order_no) !== null && _ref20 !== void 0 ? _ref20 : data.OrderNo) !== null && _ref19 !== void 0 ? _ref19 : '',
    amount: Number((_ref21 = (_data$amount = data.amount) !== null && _data$amount !== void 0 ? _data$amount : data.Amount) !== null && _ref21 !== void 0 ? _ref21 : 0),
    transactionId: (_ref22 = (_data$transactionId = data.transactionId) !== null && _data$transactionId !== void 0 ? _data$transactionId : data.transaction_id) !== null && _ref22 !== void 0 ? _ref22 : ''
  };

  // 至少要有 JSAPI 支付的核心 5 字段，或 H5 的 mwebUrl
  var hasJsapiFields = params.timeStamp && params.nonceStr && params.package && params.paySign;
  if (!hasJsapiFields && !params.mwebUrl) {
    console.error('[微信支付] 后端返回的支付参数不完整:', data);
    return null;
  }
  return params;
}

// 判断当前 H5 是否运行在微信浏览器中
function isInWechatBrowser() {
  if (true) return false;
  var ua = typeof navigator !== 'undefined' && navigator.userAgent || '';
  return /micromessenger/i.test(ua);
}

/**
 * 小程序端：调用 Taro.requestPayment 拉起微信支付
 */
function requestPaymentInWeapp(params) {
  return new Promise(function (resolve, reject) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: function success() {
        return resolve();
      },
      fail: function fail(err) {
        // 用户取消支付：errMsg = "requestPayment:fail user cancel"
        var errMsg = (err === null || err === void 0 ? void 0 : err.errMsg) || (err === null || err === void 0 ? void 0 : err.message) || '';
        if (/user\s*cancel/i.test(errMsg) || errMsg.includes('cancel')) {
          reject(new Error('取消支付'));
        } else {
          console.error('[微信支付] requestPayment 失败:', err);
          reject(new Error(errMsg || '微信支付失败'));
        }
      }
    });
  });
}

/**
 * H5 微信浏览器内：通过 WeixinJSBridge 拉起 JSAPI 支付
 */
function requestPaymentInWeixinH5(params) {
  return new Promise(function (resolve, reject) {
    if (typeof window.WeixinJSBridge === 'undefined') {
      reject(new Error('微信支付环境未就绪，请在微信中打开'));
      return;
    }
    var onBridgeReady = function onBridgeReady() {
      window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
        timeStamp: params.timeStamp,
        nonceStr: params.nonceStr,
        package: params.package,
        signType: params.signType,
        paySign: params.paySign
      }, function (res) {
        var errMsg = (res === null || res === void 0 ? void 0 : res.err_msg) || '';
        if (errMsg.includes('get_brand_wcpay_request:ok')) {
          resolve();
        } else if (errMsg.includes('cancel')) {
          reject(new Error('取消支付'));
        } else {
          console.error('[微信支付] H5 JSAPI 支付失败:', res);
          reject(new Error('微信支付失败'));
        }
      });
    };
    if (window.WeixinJSBridge) {
      onBridgeReady();
    } else {
      // 监听 WeixinJSBridgeReady 事件
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      // 超时保护
      setTimeout(function () {
        return reject(new Error('微信支付环境初始化超时'));
      }, 5000);
    }
  });
}

/**
 * H5 普通浏览器：跳转微信 H5 支付（mweb_url）
 * 支付完成后微信会跳回 redirect_url
 */
function requestPaymentInNormalH5(params) {
  if (!params.mwebUrl) {
    return Promise.reject(new Error('当前环境不支持微信支付，请在微信中打开'));
  }
  // 拼接 redirect_url（支付完成后跳回当前页）
  var redirectUrl = encodeURIComponent(window.location.href);
  var finalUrl = params.mwebUrl + (params.mwebUrl.includes('?') ? '&' : '?') + "redirect_url=".concat(redirectUrl);
  // 跳转到微信支付页
  window.location.href = finalUrl;
  // 跳转后此 Promise 不会 resolve，支付结果由页面再次加载时的轮询确认
  return new Promise(function () {/* 永不 resolve，页面会跳转 */});
}

/**
 * 发起微信支付（自动适配环境）
 *
 * @param params 从后端获取的支付参数
 * @returns Promise，resolve 表示支付成功，reject 表示取消或失败
 */
function requestWechatPayment(_x) {
  return _requestWechatPayment.apply(this, arguments);
}

/**
 * 轮询订单支付状态
 *
 * 微信支付回调有延迟，支付成功后立即查询可能状态未更新，
 * 因此需要轮询几次确认最终状态。
 *
 * @param orderId 订单ID
 * @param options.maxAttempts 最大轮询次数，默认 5 次
 * @param options.interval 轮询间隔毫秒，默认 1500ms
 * @returns 规范化后的支付状态，isPaid 为 true 表示支付成功
 */
function _requestWechatPayment() {
  _requestWechatPayment = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee(params) {
    var env;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          env = "weapp";
          if (!(env === 'weapp' || env === 'alipay' || env === 'tt' || env === 'qq' || env === 'swan')) {
            _context.n = 1;
            break;
          }
          return _context.a(2, requestPaymentInWeapp(params));
        case 1:
          if (!(env === 'h5')) {
            _context.n = 3;
            break;
          }
          if (!isInWechatBrowser()) {
            _context.n = 2;
            break;
          }
          return _context.a(2, requestPaymentInWeixinH5(params));
        case 2:
          return _context.a(2, requestPaymentInNormalH5(params));
        case 3:
          throw new Error('当前环境暂不支持微信支付');
        case 4:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _requestWechatPayment.apply(this, arguments);
}
function pollPaymentStatus(_x2) {
  return _pollPaymentStatus.apply(this, arguments);
}

/**
 * 完整的微信支付流程封装
 *
 * 流程：
 * 1. 调用 payOrder 获取支付参数
 * 2. 拉起微信支付（requestPayment）
 * 3. 支付成功后轮询确认支付状态
 *
 * @param payRes payOrder 的返回值（已 await）
 * @param orderId 订单ID（用于轮询）
 * @param options 轮询选项
 * @returns 支付状态，isPaid 为 true 表示支付成功
 */
function _pollPaymentStatus() {
  _pollPaymentStatus = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee2(orderId) {
    var _options$maxAttempts, _options$interval;
    var options,
      maxAttempts,
      interval,
      lastStatus,
      attempt,
      _lastStatus,
      res,
      _args2 = arguments,
      _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          maxAttempts = (_options$maxAttempts = options.maxAttempts) !== null && _options$maxAttempts !== void 0 ? _options$maxAttempts : 5;
          interval = (_options$interval = options.interval) !== null && _options$interval !== void 0 ? _options$interval : 1500;
          lastStatus = null;
          attempt = 1;
        case 1:
          if (!(attempt <= maxAttempts)) {
            _context2.n = 8;
            break;
          }
          _context2.p = 2;
          _context2.n = 3;
          return (0,_api_cart__WEBPACK_IMPORTED_MODULE_1__.fetchOrderPaymentStatus)(orderId);
        case 3:
          res = _context2.v;
          lastStatus = res === null || res === void 0 ? void 0 : res.data;
          if (!((_lastStatus = lastStatus) !== null && _lastStatus !== void 0 && _lastStatus.isPaid)) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, lastStatus);
        case 4:
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t = _context2.v;
          console.warn("[\u5FAE\u4FE1\u652F\u4ED8] \u7B2C ".concat(attempt, " \u6B21\u67E5\u8BE2\u652F\u4ED8\u72B6\u6001\u5931\u8D25:"), _t);
        case 6:
          if (!(attempt < maxAttempts)) {
            _context2.n = 7;
            break;
          }
          _context2.n = 7;
          return new Promise(function (resolve) {
            return setTimeout(resolve, interval);
          });
        case 7:
          attempt++;
          _context2.n = 1;
          break;
        case 8:
          // 轮询结束仍未确认，返回最后一次状态
          console.warn("[\u5FAE\u4FE1\u652F\u4ED8] \u8F6E\u8BE2 ".concat(maxAttempts, " \u6B21\u540E\u4ECD\u672A\u786E\u8BA4\u652F\u4ED8\u6210\u529F\uFF0C\u6700\u540E\u72B6\u6001:"), lastStatus);
          return _context2.a(2, lastStatus);
      }
    }, _callee2, null, [[2, 5]]);
  }));
  return _pollPaymentStatus.apply(this, arguments);
}
function executeWechatPayment(_x3, _x4) {
  return _executeWechatPayment.apply(this, arguments);
}
function _executeWechatPayment() {
  _executeWechatPayment = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().m(function _callee3(payRes, orderId) {
    var options,
      payParams,
      status,
      _args3 = arguments;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_4__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          // 1. 规范化支付参数
          payParams = normalizePayParams(payRes);
          if (payParams) {
            _context3.n = 1;
            break;
          }
          throw new Error('获取支付参数失败，请重试');
        case 1:
          console.log('[微信支付] 支付参数:', {
            hasTimeStamp: !!payParams.timeStamp,
            hasNonceStr: !!payParams.nonceStr,
            hasPackage: !!payParams.package,
            signType: payParams.signType,
            hasPaySign: !!payParams.paySign,
            hasMwebUrl: !!payParams.mwebUrl
          });

          // 2. 拉起微信支付
          _context3.n = 2;
          return requestWechatPayment(payParams);
        case 2:
          _context3.n = 3;
          return pollPaymentStatus(orderId, options);
        case 3:
          status = _context3.v;
          return _context3.a(2, status);
      }
    }, _callee3);
  }));
  return _executeWechatPayment.apply(this, arguments);
}

/***/ }),

/***/ "./src/styles/cart/order-list.module.scss":
/*!************************************************!*\
  !*** ./src/styles/cart/order-list.module.scss ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"orderListPage":"order-list-module__orderListPage___NtfNi","tabBar":"order-list-module__tabBar___fgXNt","tabList":"order-list-module__tabList___M5ifq","tabItem":"order-list-module__tabItem___khtpq","tabText":"order-list-module__tabText___C2GiO","active":"order-list-module__active___XdTkM","tabIndicator":"order-list-module__tabIndicator___JQF3Q","orderList":"order-list-module__orderList___nmADa","orderCard":"order-list-module__orderCard___iToai","orderHeader":"order-list-module__orderHeader___sTeSn","orderId":"order-list-module__orderId___G1AlW","orderStatus":"order-list-module__orderStatus___hgp5E","storeInfo":"order-list-module__storeInfo___wWJ09","storeName":"order-list-module__storeName___lPQd_","storeAddress":"order-list-module__storeAddress___yfeEj","orderProducts":"order-list-module__orderProducts___sqxMT","orderProduct":"order-list-module__orderProduct___yZC9v","productImage":"order-list-module__productImage___bmf15","productInfo":"order-list-module__productInfo___n9Qjf","productName":"order-list-module__productName___T88Yy","productSpecs":"order-list-module__productSpecs___yaimj","productBottom":"order-list-module__productBottom___tzq6n","productPrice":"order-list-module__productPrice___yyiRX","productQuantity":"order-list-module__productQuantity___etwRG","orderFooter":"order-list-module__orderFooter___jDeh4","orderTotal":"order-list-module__orderTotal___ceNEl","totalLabel":"order-list-module__totalLabel___FTLHR","totalValue":"order-list-module__totalValue___BIc9O","orderActions":"order-list-module__orderActions___ieeGq","actionBtn":"order-list-module__actionBtn___WcUov","primary":"order-list-module__primary___SIXAn","secondary":"order-list-module__secondary___EkHH4","danger":"order-list-module__danger___AymX_","emptyOrder":"order-list-module__emptyOrder___dYhUd","emptyIcon":"order-list-module__emptyIcon___mar7D","emptyText":"order-list-module__emptyText___vPbX6","goShoppingBtn":"order-list-module__goShoppingBtn___Vuxgu","loading":"order-list-module__loading___NhZ5x","refundHeader":"order-list-module__refundHeader___aFemB","refundTitle":"order-list-module__refundTitle____pLln","refundStatusActions":"order-list-module__refundStatusActions___E96du","refundStatusBtn":"order-list-module__refundStatusBtn___fu_mj"});

/***/ }),

/***/ "./src/icons/brand-store.svg":
/*!***********************************!*\
  !*** ./src/icons/brand-store.svg ***!
  \***********************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiAyTDMgNnYxNGEyIDIgMCAwMDIgMmgxNGEyIDIgMCAwMDItMlY2bC0zLTR6Ii8+PGxpbmUgeDE9IjMiIHkxPSI2IiB4Mj0iMjEiIHkyPSI2Ii8+PHBhdGggZD0iTTE2IDEwYTQgNCAwIDAxLTggMCIvPjwvc3ZnPg==";

/***/ }),

/***/ "./src/icons/brands/apple.svg":
/*!************************************!*\
  !*** ./src/icons/brands/apple.svg ***!
  \************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MTIsIDUxMikgc2NhbGUoMC43OCkgdHJhbnNsYXRlKC01MTEuOTg2NywgLTUxMikiPjxwYXRoIGQ9Ik03OTEuNDg4IDU0NC4wOTVjLTEuMjgtMTI5LjY5NSAxMDUuNzYtMTkxLjg3MSAxMTAuNTI4LTE5NC45NzUtNjAuMTYtODguMDMyLTE1My44NTYtMTAwLjA2NC0xODcuMjMyLTEwMS40NzItNzkuNzQ0LTguMDY0LTE1NS41ODQgNDYuOTQ0LTE5Ni4wNjQgNDYuOTQ0LTQwLjM1MiAwLTEwMi44MTYtNDUuNzYtMTY4Ljk2LTQ0LjU0NC04Ni45MTIgMS4yOC0xNjcuMDcyIDUwLjUyOC0yMTEuODA4IDEyOC4zODQtOTAuMzA0IDE1Ni43MDMtMjMuMTM2IDM4OC44MzEgNjQuODk2IDUxNS45MzUgNDMuMDA4IDYyLjIwOCA5NC4zMDQgMTMyLjA2NCAxNjEuNjMyIDEyOS41NjggNjQuODMyLTIuNTkyIDg5LjM3Ni00MS45NTIgMTY3Ljc0NC00MS45NTJzMTAwLjQxNiA0MS45NTIgMTY5LjA1NiA0MC42NzJjNjkuNzYtMS4zMTIgMTEzLjk4NC02My4zOTIgMTU2LjcwNC0xMjUuNzkyIDQ5LjM3Ni03Mi4xNiA2OS43MjgtMTQyLjA0OCA3MC45MTItMTQ1LjYzMi0xLjUzNi0wLjcwNC0xMzYuMDY0LTUyLjIyNC0xMzcuNDA4LTIwNy4xMzZ6TTY2Mi41NiAxNjMuNTJDNjk4LjMwNCAxMjAuMTYgNzIyLjQzMiA2MCA3MTUuODQgMGMtNTEuNDg4IDIuMTEyLTExMy44ODggMzQuMzA0LTE1MC44MTYgNzcuNTM2LTMzLjE1MiAzOC4zNjgtNjIuMTQ0IDk5LjYxNi01NC4zNjggMTU4LjQzMiA1Ny40NzIgNC40OCAxMTYuMTI4LTI5LjIxNiAxNTEuOTA0LTcyLjQ0OHoiIGZpbGw9IiMwMDAiLz48L2c+PC9zdmc+Cg==";

/***/ }),

/***/ "./src/icons/brands/huawei.svg":
/*!*************************************!*\
  !*** ./src/icons/brands/huawei.svg ***!
  \*************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB0PSIxNzg1NDg5NDgzNjAwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY5MTEiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUxMiwgNTEyKSBzY2FsZSgwLjc5MjIpIHRyYW5zbGF0ZSgtNTEzLjE2NDEsIC00NjkuOTI1KSI+PHBhdGggZD0iTTQxMi4wOCA3NTMuODdRMjk3IDg1NS4wNiAyMjAuMTQgODU1LjEzdC0xMTcuMjctOTUuMDdsMzA5LjIxLTYuMjR6IG0yMDIuMTYgMGwzMDkuMjEgNi4xOVE4ODMgODU1LjEzIDgwNi4xOCA4NTUuMTNUNjE0LjI0IDc1My44MnpNMTUuOTEgNDg5LjFxMTc4IDk1IDIyOC40OSAxMjUuMzR0MTcxLjg5IDEwOC44OHEtMTkzLjEgMTItMjUyLjc1IDAuMzJjLTQ1LjQ5LTguODktODAuOS0yOC4yOS0xMTEuMjItNTguNjZRLTguMjIgNjA0LjQ0IDE1LjkxIDQ4OS4xeiBtOTk0LjUgMFExMDM0LjU2IDYwNC40MSA5NzQgNjY1Yy0zMC4zMSAzMC4zNy02NS43MiA0OS43Ny0xMTEuMjIgNTguNjZxLTU5LjY0IDExLjctMjUyLjctMC4zMiAxMjEuMjctNzguNTUgMTcxLjg1LTEwOC44OHQyMjguNDgtMTI1LjM2ek0xNjEuNDggMjI4LjI3cTkzLjA4IDEyMy4zNiAxMjcuNDEgMTc1Ljk0dDE1NSAyODMuMzhRMjA1Ljg4IDU4MC41NSAxMTMgNDc1Yy00NC40OS01MC41NC00NC40OS0xMzMuNDYgNi0yMDQuMjNxMTEtMTUuNCA0Mi40Ny00Mi40N3ogbTcwMy4zMSAwcTMxLjUxIDI3LjEgNDIuNDcgNDIuNDdjNTAuNTQgNzAuNzcgNTAuNTQgMTUzLjY1IDYuMDYgMjA0LjI2cS05Mi44OCAxMDUuNi0zMzEgMjEyLjYyIDEyMC42Ni0yMzAuOCAxNTUtMjgzLjQzdDEyNy40Ny0xNzUuOTJ6TTQ0MC42IDg0LjcycTQ2LjUxIDEzNy41MiA1Mi41NiAxOTQuMVQ0ODMuMDcgNjU5UTI4MC44MSAzNjcuODMgMjgwLjgxIDIzNi4zOVQ0NDAuNiA4NC43MnogbTE0NS4yMSAwUTc0NS41NSAxMDUgNzQ1LjU1IDIzNi4zOVQ1NDMuMzQgNjU5cS0xNi4xNy0zMjMuNTUtMTAuMDktMzgwLjE2dDUyLjU2LTE5NC4xeiIgZmlsbD0iI0ZFMDAwMCIgcC1pZD0iNjkxMiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMC4xNjZmM2E4MWVWQlRhaSIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4=";

/***/ }),

/***/ "./src/icons/brands/nike.svg":
/*!***********************************!*\
  !*** ./src/icons/brands/nike.svg ***!
  \***********************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MTIsIDUxMikgc2NhbGUoMC44NzM4KSB0cmFuc2xhdGUoLTUxMS42NjY5LCAtNTIzLjMwNjYpIj48cGF0aCBkPSJNMTY4LjI5NDQgMzcwLjM0NjY2N2MtMjEuMDM5Nzg3IDkxLjAyMzM2LTIxLjAzOTc4NyAxNDUuNjM2NjkzIDAgMTYzLjg0IDMxLjU2MzA5MyAyNy4zMDY2NjcgNzkuMzQ5NzYgMjAuNDggMTUyLjU3NiAwIDQ4LjgxNDA4LTEzLjY1MzMzMyAyNjQuNzY1NDQtNzEuMTA5OTczIDY0Ny44NTA2NjctMTcyLjM3MzMzNC00MTcuMTA5MzMzIDE4NS40NTY2NC02NTEuODM0MDI3IDI4Ni43Mi03MDQuMTcwNjY3IDMwMy43ODY2NjctNzguNTA2NjY3IDI1LjYtMTMzLjk4Njk4NyAyNS42LTE3NS42MjYyNCAwLTQxLjY0MjY2Ny0yNS42LTQ0LjM3MzMzMy0xMDIuNC0xMy42NTMzMzMtMTYwLjQyNjY2NyAyMC40OC0zOC42ODMzMDcgNTEuNDg2NzItODMuNjI2NjY3IDkzLjAyMzU3My0xMzQuODI2NjY2eiIgZmlsbD0iIzAwMCIvPjwvZz48L3N2Zz4K";

/***/ }),

/***/ "./src/icons/brands/rice.svg":
/*!***********************************!*\
  !*** ./src/icons/brands/rice.svg ***!
  \***********************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiBmaWxsPSJub25lIj4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NCwgNjQpIHNjYWxlKDAuODMyKSB0cmFuc2xhdGUoLTY0LCAtNjQpIj4KICA8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI2MCIgc3Ryb2tlPSIjRThEOEIwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNmZmYiLz4KICA8cGF0aCBkPSJNNjQgMzIgTDcwIDU2IEw5NiA1MCBMNzYgNjYgTDk2IDc4IEw3MCA3NCBMNjQgOTYgTDU4IDc0IEwzMiA3OCBMNTIgNjYgTDMyIDUwIEw1OCA1NiBaIiBzdHJva2U9IiNENEEwMTciIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0iI0ZGRDcwMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDxlbGxpcHNlIGN4PSI2NCIgY3k9IjY0IiByeD0iMTQiIHJ5PSIxNCIgc3Ryb2tlPSIjRjVGNURDIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0iI0ZGRkFDRCIvPgogIDxjaXJjbGUgY3g9IjU4IiBjeT0iNjAiIHI9IjEuNSIgZmlsbD0iIzhCNDUxMyIvPgogIDxjaXJjbGUgY3g9IjcwIiBjeT0iNjAiIHI9IjEuNSIgZmlsbD0iIzhCNDUxMyIvPgogIDxwYXRoIGQ9Ik01OCA2OCBMNjQgNzIgTDcwIDY4IiBzdHJva2U9IiM4QjQ1MTMiIHN0cm9rZS13aWR0aD0iMS4yIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8L2c+Cjwvc3ZnPg==";

/***/ }),

/***/ "./src/icons/brands/squirrel.svg":
/*!***************************************!*\
  !*** ./src/icons/brands/squirrel.svg ***!
  \***************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzEwIDEwMjQiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NTUsIDUxMikgc2NhbGUoMC43OCkgdHJhbnNsYXRlKC04NTQuODIzNywgLTUxMikiPjxwYXRoIGQ9Ik0wIDg2NC4yNjgxNWwyLjY5NTg5NiAxLjM0Nzk0OWE4MjIuMDIzNjgyIDgyMi4wMjM2ODIgMCAwIDAgMzIxLjQ4NTYyMiA2Mi42Nzk1ODZBODA1Ljg0ODMwNSA4MDUuODQ4MzA1IDAgMCAwIDc0MS4zNzE0NTQgODIyLjcwNjQxN2M3LjE4OTA1NyA1LjM5MTc5MiAxNC4zNzgxMTMgMTAuNzgzNTg1IDIyLjQ2NTgwMSAxNS43MjYwNjJsLTU4LjE4NjQyNiAxODEuOTcyOTkzLTEuMTIzMjkgMy41OTQ1MjhoNDg3Ljk1NzIxMnYtMi42OTU4OTZhODMuNTcyNzgyIDgzLjU3Mjc4MiAwIDAgMC0yLjQ3MTIzOS0xOS43Njk5MDZoMjEzLjIwMDQ1OHYtMi42OTU4OTZhODMuMTIzNDY2IDgzLjEyMzQ2NiAwIDAgMC04My4xMjM0NjYtODMuMTIzNDY2aC0xNDkuODQ2ODk3bDkuODg0OTUzLTE3Ljc0Nzk4M2ExODkuMTYyMDUgMTg5LjE2MjA1IDAgMCAwIDExNC4zNTA5My0xNjYuMjQ2OTMyIDg5Ljg2MzIwNyA4OS44NjMyMDcgMCAwIDAgNS4zOTE3OTItNy40MTM3MTVsNzguMTgwOTktMTIxLjk4OTMwMyA2Ny4zOTc0MDUtOS4yMTA5NzggNTAuMDk4NzM4IDExLjY4MjIxNyA2My44MDI4NzYtMjYuNTA5NjQ2di00Ny4xNzgxODRsOC4zMTIzNDctMS4xMjMyOSA0OS44NzQwNzkgMTEuNDU3NTU5IDY0LjAyNzUzNS0yNi4yODQ5ODh2LTEwMi42Njg3MTNsLTY0LjcwMTUwOS0xMy4yNTQ4MjMtNzUuNzA5NzUxIDMxLjAwMjgwNi00OC45NzU0NDgtNi4yOTA0MjUgNDkuNDI0NzY0LTc3LjA1NzY5OWg0MC4yMTM3ODVsNTAuNzcyNzEyLTYyLjQ1NDkyOSAxOS4wOTU5MzEgMzAuMTA0MTc0IDQyLjQ2MDM2NS04Ljk4NjMyVjIxMi45ODQ1NjFMMTcwOS42NDc1MDQgMTc5LjczNTE3NVYxMjEuMzI0MDlsLTEzNS45MTgxLTYxLjEwNjk4LTIwLjY2ODUzNy0yMi40NjU4MDJhMTIyLjIxMzk2MSAxMjIuMjEzOTYxIDAgMCAwLTYwLjY1NzY2NS0zMi4zNTA3NTRBMzI1LjMwNDgwOCAzMjUuMzA0ODA4IDAgMCAwIDE0MzMuMDkzNDg2IDAuMDA4NzYyYTMwNy4zMzIxNjYgMzA3LjMzMjE2NiAwIDAgMC05NS4yNTQ5OTkgMTQuMzc4MTEzbC0yMi40NjU4MDItOS4yMTA5NzloLTQ2LjcyODg2N3YyLjQ3MTIzOEExODkuODM2MDI0IDE4OS44MzYwMjQgMCAwIDAgMTI2Ny4wNzEyMTIgNDQuOTQwMzY1bC0xMjkuODUyMzMzIDQ0LjkzMTYwMy0yMjcuODAzMjI5IDM1Ljk0NTI4M2EzODYuNjM2NDQ2IDM4Ni42MzY0NDYgMCAwIDAtMjE4LjU5MjI1IDExNi4xNDgxOTQgMzkxLjU3ODkyMiAzOTEuNTc4OTIyIDAgMCAwLTUwLjk5NzM3IDQ2OS4zMTA1OTYgOTk3LjQ4MTU5MiA5OTcuNDgxNTkyIDAgMCAwLTE5MC41MDk5OTctMTguNjQ2NjE1Yy0xNjEuMDc5Nzk4IDAtMzEwLjcwMjAzNyA0MS41NjE3MzMtNDIxLjIzMzc4MSAxMTcuMjcxNDg0eiIgZmlsbD0iIzlBNkE0NCIvPjwvZz48L3N2Zz4K";

/***/ }),

/***/ "./src/icons/brands/xiaomi.svg":
/*!*************************************!*\
  !*** ./src/icons/brands/xiaomi.svg ***!
  \*************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUxMiwgNTEyKSBzY2FsZSgwLjg5ODYpIHRyYW5zbGF0ZSgtNTEwLjAyOTIsIC01MTEuODMwMikiPjxwYXRoIGQ9Ik03MDYuOTc1NjQ3IDc5NC4zOTE1NzlWMzg5LjQyMjI0NGMwLTkyLjAxNDY3LTc0LjU3MDM2OS0xNjYuNjE4ODA4LTE2Ni41NzQ4MDctMTY2LjYxODgwOUg3Mi4xNDkyMjdjLTMuNjEwMjI0IDAtNi41MzU4NTcgMi45MDkyNi02LjUzNTg1NyA2LjQ4MjY0NXY1NjUuMTAxNDA1YzAgMy41NzMzODUgMi45MjQ2MDkgNi40NjkzNDIgNi41MzU4NTcgNi40NjkzNDJoMTI1LjA3NDYyM2MzLjYxMTI0OCAwIDYuNTMxNzYzLTIuOTExMzA2IDYuNTMxNzY0LTYuNTA1MTU3VjM1MC44MTM5MjRjMC0zLjYwMTAxNSAyLjkyNDYwOS02LjUyMjU1NCA2LjUzNTg1Ni02LjUyMjU1NGgyNjguOTYyNzMyYzUwLjUwNzMyNCAwIDkxLjQ2NjE3OCA0MC45Mzk0MTEgOTEuNDY2MTc4IDkxLjQ1Mjg3NXYzNTguNTk0MTIyYzAgMy41OTc5NDUgMi45MjA1MTYgNi41MDIwODggNi41MTMzNDQgNi41MDIwODdINzAwLjQ2NzQxOWMzLjU4NDY0MiAwIDYuNTEzMzQ0LTIuOTAyMDk2IDYuNTEzMzQ0LTYuNDY5MzQybC0wLjAwNTExNiAwLjAyMDQ2N3ogbS0yNTIuNTc2NTMtMC4wNDQwMDNhNi40OTI4NzggNi40OTI4NzggMCAwIDEtNi41MDkyNSA2LjUwOTI1MUgzMjIuODQ0OTE5Yy0zLjYxMTI0OCAwLTYuNTM1ODU3LTIuOTExMzA2LTYuNTM1ODU3LTYuNTA5MjUxVjQ1NC40Njc2NzljMC0zLjU5Nzk0NSAyLjkyNDYwOS02LjUxODQ2IDYuNTM1ODU3LTYuNTE4NDYxaDEyNS4wNDQ5NDhhNi41MDMxMTEgNi41MDMxMTEgMCAwIDEgNi41MDkyNSA2LjUxODQ2MVY3OTQuMzY0OTczdi0wLjAxNzM5N201MDAuMDQ1NzM3IDBjMCAzLjYwMTAxNS0yLjkyODcwMiA2LjUwOTI1MS02LjUzODkyNiA2LjUwOTI1MUg4MjIuODg5NjMzYy0zLjYyMDQ1NyAwLTYuNTY0NTA5LTIuOTExMzA2LTYuNTY0NTA5LTYuNTA5MjUxVjIyOS4zNDY0NTVjMC0zLjYxNDMxNyAyLjk0NDA1Mi02LjUzMTc2MyA2LjU2NDUwOS02LjUzMTc2M2gxMjUuMDE2Mjk1YTYuNTI4Njk0IDYuNTI4Njk0IDAgMCAxIDYuNTM4OTI2IDYuNTMxNzYzdjU2NS4wMDExMjEiIGZpbGw9IiMyNzI1MzYiLz48L2c+PC9zdmc+Cg==";

/***/ }),

/***/ "./src/icons/category/accessory.svg":
/*!******************************************!*\
  !*** ./src/icons/category/accessory.svg ***!
  \******************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik01MTIgMEMyMjkuMjM2MzY0IDAgMCAyMjkuMjM2MzY0IDAgNTEyczIyOS4yMzYzNjQgNTEyIDUxMiA1MTIgNTEyLTIyOS4yMzYzNjQgNTEyLTUxMlM3OTQuNzYzNjM2IDAgNTEyIDB6TTU1OC41NDU0NTUgOTc1LjA4MDcyNyA1NTguNTQ1NDU1IDc5MS4yNzI3MjdsNDYuNTQ1NDU1IDBjNTEuMzg2MTgyIDAgOTMuMDkwOTA5LTQxLjcwNDcyNyA5My4wOTA5MDktOTMuMDkwOTA5TDY5OC4xODE4MTggMzcyLjM2MzYzNmwtOTMuMDkwOTA5IDBMNjA1LjA5MDkwOSAyMzIuNzI3MjczIDQxOC45MDkwOTEgMjMyLjcyNzI3M2wwIDEzOS42MzYzNjRMMzI1LjgxODE4MiAzNzIuMzYzNjM2bDAgMzI1LjgxODE4MmMwIDUxLjM4NjE4MiA0MS43MDQ3MjcgOTMuMDkwOTA5IDkzLjA5MDkwOSA5My4wOTA5MDlsNDYuNTQ1NDU1IDAgMCAxODMuODA4QzIzMC4yNjAzNjQgOTUxLjcxNDkwOSA0Ni41NDU0NTUgNzUzLjM4NDcyNyA0Ni41NDU0NTUgNTEyIDQ2LjU0NTQ1NSAyNTQuOTI5NDU1IDI1NC45NzYgNDYuNTQ1NDU1IDUxMiA0Ni41NDU0NTVzNDY1LjQ1NDU0NSAyMDguMzg0IDQ2NS40NTQ1NDUgNDY1LjQ1NDU0NUM5NzcuNDU0NTQ1IDc1My4zODQ3MjcgNzkzLjczOTYzNiA5NTEuNzE0OTA5IDU1OC41NDU0NTUgOTc1LjA4MDcyN3oiIGZpbGw9IiM0QTcyQTgiLz48L3N2Zz4K";

/***/ }),

/***/ "./src/icons/category/coffee.svg":
/*!***************************************!*\
  !*** ./src/icons/category/coffee.svg ***!
  \***************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTggOGgxYTQgNCAwIDAxMCA4aC0xIi8+PHBhdGggZD0iTTIgOGgxNnY5YTQgNCAwIDAxLTQgNEg2YTQgNCAwIDAxLTQtNFY4eiIvPjxsaW5lIHgxPSI2IiB5MT0iMSIgeDI9IjYiIHkyPSI0Ii8+PGxpbmUgeDE9IjEwIiB5MT0iMSIgeDI9IjEwIiB5Mj0iNCIvPjxsaW5lIHgxPSIxNCIgeTE9IjEiIHgyPSIxNCIgeTI9IjQiLz48L3N2Zz4=";

/***/ }),

/***/ "./src/icons/category/food.svg":
/*!*************************************!*\
  !*** ./src/icons/category/food.svg ***!
  \*************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSI5IiBjeT0iMjEiIHI9IjEiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIxIiByPSIxIi8+PHBhdGggZD0iTTEgMWg0bDIuNjggMTMuMzlhMiAyIDAgMDAyIDEuNjFoOS43MmEyIDIgMCAwMDItMS42MUwyMyA2SDYiLz48L3N2Zz4=";

/***/ }),

/***/ "./src/icons/category/nutsnack.svg":
/*!*****************************************!*\
  !*** ./src/icons/category/nutsnack.svg ***!
  \*****************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik01MTIgOTYwYzIwMC4zMiAwIDM2Mi42ODgtMTM2LjE5MiAzNjIuNjg4LTM0MC40OCAwLTIzMi45Ni0xNjUuNjMyLTU1NS41Mi0yODYuMzM2LTU1NS41Mi0xMTkuMTY4IDAtMTc1LjE2OCAzOTIuOTYtMTg5LjU2OCA0OTQuMDgtMTAuMjQgNzIuMDY0LTM1LjkwNCA4Mi4zNjgtNDkuNTM2IDY1LjcyOC03Ny42MzItOTQuNTI4IDQyLjExMi00OTkuMiA0OS4yMTYtNTIyLjg4bDAuNjQtMi4yNGMyLjU2LTEwLjMwNC00LjI4OC0yOS42MzItMjcuNDU2LTE4LjA0OGE1MS40NTYgNTEuNDU2IDAgMCAwLTE1LjQ4OCAxMy4zMTJDMjA3LjU1MiAyNzAuNzIgMTQ5LjMxMiA0NDIuOTQ0IDE0OS4zMTIgNjE5LjUyIDE0OS4zMTIgODA3LjU1MiAzMTEuNzQ0IDk2MCA1MTIgOTYweiIgZmlsbD0iIzZCNDQyMyIvPjwvc3ZnPgo=";

/***/ }),

/***/ "./src/icons/category/phone.svg":
/*!**************************************!*\
  !*** ./src/icons/category/phone.svg ***!
  \**************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSI1IiB5PSIyIiB3aWR0aD0iMTQiIGhlaWdodD0iMjAiIHJ4PSIyIiByeT0iMiIvPjxsaW5lIHgxPSIxMiIgeTE9IjE4IiB4Mj0iMTIuMDEiIHkyPSIxOCIvPjwvc3ZnPg==";

/***/ }),

/***/ "./src/icons/category/runningshoe.svg":
/*!********************************************!*\
  !*** ./src/icons/category/runningshoe.svg ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icons/category/runningshoe.svg";

/***/ }),

/***/ "./src/icons/category/smartphone.svg":
/*!*******************************************!*\
  !*** ./src/icons/category/smartphone.svg ***!
  \*******************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik04MjAuNDA5NDQ5IDc5Ny4yMjgzNDZxMCAyNS4xOTY4NS0xMC4wNzg3NCA0Ni44NjYxNDJ0LTI3LjcxNjUzNSAzOC4yOTkyMTMtNDEuMzIyODM1IDI2LjIwNDcyNC01MC44OTc2MzggOS41NzQ4MDNsLTM1Ny43OTUyNzYgMHEtMjcuMjEyNTk4IDAtNTAuODk3NjM4LTkuNTc0ODAzdC00MS4zMjI4MzUtMjYuMjA0NzI0LTI3LjcxNjUzNS0zOC4yOTkyMTMtMTAuMDc4NzQtNDYuODY2MTQybDAtNjc1LjI3NTU5MXEwLTI1LjE5Njg1IDEwLjA3ODc0LTQ3LjM3MDA3OXQyNy43MTY1MzUtMzguODAzMTUgNDEuMzIyODM1LTI2LjIwNDcyNCA1MC44OTc2MzgtOS41NzQ4MDNsMzU3Ljc5NTI3NiAwcTI3LjIxMjU5OCAwIDUwLjg5NzYzOCA5LjU3NDgwM3Q0MS4zMjI4MzUgMjYuMjA0NzI0IDI3LjcxNjUzNSAzOC44MDMxNSAxMC4wNzg3NCA0Ny4zNzAwNzlsMCA2NzUuMjc1NTkxek03MzguNzcxNjU0IDE3MC4zMzA3MDlsLTQ1NS41NTkwNTUgMCAwIDU3Ny41MTE4MTEgNDU1LjU1OTA1NSAwIDAtNTc3LjUxMTgxMXpNNTEwLjk5MjEyNiA3NzYuMDYyOTkycS0yMS4xNjUzNTQgMC0zNi43ODc0MDIgMTUuMTE4MTF0LTE1LjYyMjA0NyAzNy4yOTEzMzlxMCAyMS4xNjUzNTQgMTUuNjIyMDQ3IDM2Ljc4NzQwMnQzNi43ODc0MDIgMTUuNjIyMDQ3cTIyLjE3MzIyOCAwIDM3LjI5MTMzOS0xNS42MjIwNDd0MTUuMTE4MTEtMzYuNzg3NDAycTAtMjIuMTczMjI4LTE1LjExODExLTM3LjI5MTMzOXQtMzcuMjkxMzM5LTE1LjExODExek01OTEuNjIyMDQ3IDg0LjY2MTQxN3EwLTguMDYyOTkyLTUuMDM5MzctMTIuNTk4NDI1dC0xMS4wODY2MTQtNC41MzU0MzNsLTEyOCAwcS01LjAzOTM3IDAtMTAuNTgyNjc3IDQuNTM1NDMzdC01LjU0MzMwNyAxMi41OTg0MjUgNS4wMzkzNyAxMi41OTg0MjUgMTEuMDg2NjE0IDQuNTM1NDMzbDEyOCAwcTYuMDQ3MjQ0IDAgMTEuMDg2NjE0LTQuNTM1NDMzdDUuMDM5MzctMTIuNTk4NDI1eiIgZmlsbD0iIzRBNzJBOCIvPjwvc3ZnPgo=";

/***/ }),

/***/ "./src/icons/category/sneaker.svg":
/*!****************************************!*\
  !*** ./src/icons/category/sneaker.svg ***!
  \****************************************/
/***/ (function(module) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMiAxN2gyMGEwIDAgMCAxMCAwIDB2MmEwIDAgMCAwMSAwIDBIMmEwIDAgMCAwMSAwIDB2LTJ6IiBzdHlsZT0ic3Ryb2tlLXdpZHRoOjEuNSIvPjxwYXRoIGQ9Ik0yIDE3bDEuNS02aDNsMi01aDZsNCA1aDR2NkgyeiIvPjxwYXRoIGQ9Ik04IDEybDItMyIvPjxwYXRoIGQ9Ik0xMSAxMmwxLjUtMyIvPjwvc3ZnPg==";

/***/ })

}]);
//# sourceMappingURL=common.js.map