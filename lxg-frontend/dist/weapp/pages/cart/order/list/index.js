"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/list/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./src/pages/cart/order/list/index.tsx":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./src/pages/cart/order/list/index.tsx ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _utils_wechatPay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/wechatPay */ "./src/utils/wechatPay.ts");
/* harmony import */ var _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/cart/order-list.module.scss */ "./src/styles/cart/order-list.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");













// 后端订单状态码：0=待支付 2=待发货 3=待自提 4=已完成 5=已取消

var statusCodeMap = {
  0: 'pending_payment',
  2: 'pending_delivery',
  3: 'pending_pickup',
  4: 'completed',
  5: 'cancelled'
};
var statusCodeReverseMap = {
  'pending_payment': 0,
  'pending_delivery': 2,
  'pending_pickup': 3,
  'completed': 4,
  'cancelled': 5
};
var statusMap = {
  'pending_payment': '待支付',
  'pending_delivery': '待发货',
  'paid': '已支付',
  'pending_pickup': '待自提',
  'completed': '已完成',
  'pending_review': '待评价',
  'reviewed': '已评价',
  'cancelled': '已取消',
  'refunding': '退款中',
  'refund_rejected': '商家已拒绝',
  'refunded': '已退款'
};
var statusColorMap = {
  'pending_payment': '#e2231a',
  'pending_delivery': '#1890ff',
  'paid': '#1890ff',
  'pending_pickup': '#ff6600',
  'completed': '#52c41a',
  'pending_review': '#ff6b35',
  'reviewed': '#52c41a',
  'cancelled': '#999',
  'refunding': '#faad14',
  'refund_rejected': '#ff4d4f',
  'refunded': '#52c41a'
};
function pickFirstValid() {
  for (var _len = arguments.length, candidates = new Array(_len), _key = 0; _key < _len; _key++) {
    candidates[_key] = arguments[_key];
  }
  for (var _i = 0, _candidates = candidates; _i < _candidates.length; _i++) {
    var value = _candidates[_i];
    if (value !== undefined && value !== null && value !== '' && value !== 0 && value !== '0') {
      return String(value);
    }
  }
  return '';
}
function transformOrderItem(item) {
  // 处理 specValues：后端返回对象 {"颜色":"红色"}
  var skuName = item.skuName || item.SkuName || '';
  if (!skuName && item.specValues && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_7__["default"])(item.specValues) === 'object') {
    skuName = Object.values(item.specValues).join('/') || '';
  }

  // 处理 image：后端可能返回 JSON 字符串 '["url"]'
  var image = item.image || item.Image || '';
  if (typeof image === 'string' && image.startsWith('[')) {
    try {
      var parsed = JSON.parse(image);
      if (Array.isArray(parsed) && parsed.length > 0) {
        image = parsed[0].replace(/^`|`$/g, '');
      }
    } catch (_unused) {/* ignore */}
  }
  return {
    id: pickFirstValid(item.id, item.ID, item.productId, item.ProductID),
    productId: pickFirstValid(item.productId, item.ProductID),
    productName: item.productName || item.ProductName || '',
    skuId: pickFirstValid(item.skuId, item.SkuID),
    skuName: skuName,
    price: item.price != null ? item.price : item.Price || 0,
    quantity: item.quantity != null ? item.quantity : item.Quantity || 0,
    image: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(image)
  };
}

// 退款记录专用的状态文本映射（覆盖退款自身状态 + 兼容后端可能返回的订单状态）
var refundStatusTextMap = {
  'pending': '待处理',
  'processing': '处理中',
  'approved': '已同意',
  'rejected': '已拒绝',
  'refunding': '退款中',
  'refund_rejected': '商家已拒绝',
  'refunded': '已退款',
  'cancelled': '已取消',
  'completed': '已完成',
  // 后端可能复用订单状态码，统一映射为退款语义
  'pending_payment': '待处理',
  'pending_delivery': '处理中',
  'pending_pickup': '处理中',
  'paid': '处理中'
};
function transformRefund(refund) {
  var items = (refund.items || []).map(function (item) {
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])({}, transformOrderItem(item)), {}, {
      image: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(item.image || item.Image || '')
    });
  });
  var status = refund.status || 'pending';
  var statusText = refundStatusTextMap[status] || refund.statusText || '待处理';
  return {
    id: refund.id || '',
    orderId: refund.orderId || '',
    orderNo: refund.refundNo || refund.orderNo || '',
    status: status,
    statusText: statusText,
    createTime: refund.applyTime || '',
    payAmount: refund.amount || refund.payAmount || 0,
    totalAmount: refund.amount || 0,
    items: items,
    isRefundRecord: true
  };
}
function transformOrder(order) {
  var _order$status, _ref, _order$totalAmount, _ref2, _order$freightAmount, _ref3, _ref4, _order$couponAmount, _ref5, _order$payAmount, _ref6, _ref7, _ref8, _ref9, _order$isReviewed;
  var rawStatus = (_order$status = order.status) !== null && _order$status !== void 0 ? _order$status : order.Status;
  var isNumericStatus = typeof rawStatus === 'number';
  var status = isNumericStatus ? statusCodeMap[rawStatus] || 'unknown' : rawStatus || 'unknown';
  var items = (order.items || order.Items || []).map(transformOrderItem);

  // store 可能是嵌套对象
  var rawStore = order.store || order.Store;
  var store = rawStore ? {
    name: rawStore.name || rawStore.Name || '',
    address: rawStore.address || rawStore.Address || '',
    phone: rawStore.phone || rawStore.Phone || '',
    businessHours: rawStore.businessHours || rawStore.BusinessHours || rawStore.hours || ''
  } : undefined;
  return {
    id: pickFirstValid(order.id, order.ID, order.orderId, order.order_id, order.OrderId, order.OrderID),
    orderNo: pickFirstValid(order.orderNo, order.order_no, order.OrderNo, order.OrderNO),
    status: status,
    statusText: order.statusText || order.StatusText || statusMap[status] || '',
    createTime: order.createTime || order.CreateTime || order.CreatedAt || '',
    totalAmount: (_ref = (_order$totalAmount = order.totalAmount) !== null && _order$totalAmount !== void 0 ? _order$totalAmount : order.TotalAmount) !== null && _ref !== void 0 ? _ref : 0,
    freightAmount: (_ref2 = (_order$freightAmount = order.freightAmount) !== null && _order$freightAmount !== void 0 ? _order$freightAmount : order.FreightAmount) !== null && _ref2 !== void 0 ? _ref2 : 0,
    couponAmount: (_ref3 = (_ref4 = (_order$couponAmount = order.couponAmount) !== null && _order$couponAmount !== void 0 ? _order$couponAmount : order.CouponAmount) !== null && _ref4 !== void 0 ? _ref4 : order.discountAmount) !== null && _ref3 !== void 0 ? _ref3 : 0,
    payAmount: (_ref5 = (_order$payAmount = order.payAmount) !== null && _order$payAmount !== void 0 ? _order$payAmount : order.PayAmount) !== null && _ref5 !== void 0 ? _ref5 : 0,
    items: items,
    store: store,
    address: order.address || order.Address || {},
    paymentMethod: order.paymentMethod || order.PaymentMethod || '',
    payTime: order.payTime || order.PayTime || order.paidAt || order.PaidAt || '',
    deliverTime: order.deliverTime || order.DeliverTime || order.shippedAt || order.ShippedAt || '',
    completeTime: order.completeTime || order.CompleteTime || order.confirmedAt || order.ConfirmedAt || '',
    cancelTime: order.cancelTime || order.CancelTime || order.cancelledAt || order.CancelledAt || '',
    cancelReason: order.cancelReason || order.CancelReason || '',
    isReviewed: (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_order$isReviewed = order.isReviewed) !== null && _order$isReviewed !== void 0 ? _order$isReviewed : order.is_reviewed) !== null && _ref9 !== void 0 ? _ref9 : order.IsReviewed) !== null && _ref8 !== void 0 ? _ref8 : order.reviewed) !== null && _ref7 !== void 0 ? _ref7 : order.Reviewed) !== null && _ref6 !== void 0 ? _ref6 : false
  };
}
var OrderProductItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref0) {
  var product = _ref0.product,
    onClick = _ref0.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderProduct,
    onClick: onClick,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])({
      src: product.image,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productImage,
      mode: "aspectFill"
    }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productName,
        children: product.productName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productSpecs,
        children: product.skuName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productBottom,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productPrice,
          children: ["\xA5", product.price]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productQuantity,
          children: ["x", product.quantity]
        })]
      })]
    })]
  });
});
var OrderActionButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref1) {
  var text = _ref1.text,
    type = _ref1.type,
    onClick = _ref1.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionBtn, " ").concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"][type]),
    onClick: onClick,
    children: text
  });
});
var OrderCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref10) {
  var order = _ref10.order,
    onDetail = _ref10.onDetail,
    onCancel = _ref10.onCancel,
    onPay = _ref10.onPay,
    onConfirmPickup = _ref10.onConfirmPickup,
    onRefund = _ref10.onRefund,
    onReview = _ref10.onReview;
  var isRefundOrder = !!order.isRefundRecord;
  // 退款记录不显示订单操作按钮（取消、支付、确认发货/自提、评价等）
  var canCancel = !isRefundOrder && (order.status === 'pending_payment' || order.status === 'pending_delivery' || order.status === 'pending_pickup');
  var canPay = !isRefundOrder && order.status === 'pending_payment';
  var canConfirmPickup = !isRefundOrder && order.status === 'pending_pickup';
  var canRefund = !isRefundOrder && (order.status === 'completed' || order.status === 'pending_review');
  var canReview = !isRefundOrder && (order.status === 'completed' || order.status === 'pending_review');
  var refundStatusMap = {
    'pending': '待处理',
    'processing': '处理中',
    'approved': '已同意',
    'rejected': '已拒绝',
    'refunding': '退款中',
    'refund_rejected': '商家已拒绝',
    'refunded': '已退款',
    'cancelled': '已取消',
    'completed': '已完成',
    'pending_payment': '待处理'
  };
  var refundStatusColorMap = {
    'pending': '#faad14',
    'processing': '#1890ff',
    'approved': '#52c41a',
    'rejected': '#ff4d4f',
    'refunding': '#faad14',
    'refund_rejected': '#ff4d4f',
    'refunded': '#52c41a',
    'cancelled': '#999',
    'completed': '#52c41a',
    'pending_payment': '#faad14'
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderCard,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderId,
        children: [isRefundOrder ? '退货编号' : '订单编号', ": ", order.orderNo]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderStatus,
        style: {
          color: isRefundOrder ? refundStatusColorMap[order.status] : statusColorMap[order.status] || '#999'
        },
        children: isRefundOrder ? refundStatusMap[order.status] || order.statusText : statusMap[order.status] || order.statusText
      })]
    }), order.store && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeName,
        children: order.store.name || '无门店信息'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeAddress,
        children: order.store.address || ''
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderProducts,
      children: (order.items || []).map(function (product, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OrderProductItem, {
          product: product,
          onClick: function onClick() {
            return order.isRefundRecord ? undefined : onDetail(order.id);
          }
        }, "".concat(order.id, "-").concat(product.productId, "-").concat(index));
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderFooter,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderTotal,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].totalLabel,
          children: "\u5408\u8BA1:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].totalValue,
          children: ["\xA5", order.payAmount]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderActions,
        children: [canCancel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OrderActionButton, {
          text: "\u53D6\u6D88\u8BA2\u5355",
          type: "danger",
          onClick: function onClick() {
            return onCancel(order.id);
          }
        }), canPay && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OrderActionButton, {
          text: "\u7ACB\u5373\u652F\u4ED8",
          type: "primary",
          onClick: function onClick() {
            return onPay(order.id);
          }
        }), canConfirmPickup && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OrderActionButton, {
          text: "\u786E\u8BA4\u81EA\u63D0",
          type: "primary",
          onClick: function onClick() {
            return onConfirmPickup(order.id);
          }
        }), canRefund && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OrderActionButton, {
          text: "\u7533\u8BF7\u9000\u6B3E",
          type: "secondary",
          onClick: function onClick() {
            return onRefund(order.id);
          }
        }), canReview && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OrderActionButton, {
          text: order.isReviewed ? '已评价' : '待评价',
          type: order.isReviewed ? 'secondary' : 'primary',
          onClick: function onClick() {
            return onReview(order.id);
          }
        })]
      })]
    })]
  });
});
var EmptyOrder = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref11) {
  var onGoShopping = _ref11.onGoShopping;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyOrder,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyIcon,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        children: "\uD83D\uDCE6"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
      children: "\u6682\u65E0\u8BA2\u5355"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goShoppingBtn,
      onClick: onGoShopping,
      children: "\u53BB\u8D2D\u7269"
    })]
  });
});
var OrderListPage = function OrderListPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      var _Taro$getCurrentInsta;
      // 初始 tab 直接从 URL/路由参数读取，避免先以 'all' 加载再切换造成竞态
      var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
      var status = params.status;
      if (false) { var searchParams; }
      return status || 'all';
    }),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState3, 2),
    orders = _useState4[0],
    setOrders = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  // 记录最新请求的 tab，用于丢弃过期响应
  var latestStatusRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(activeTab);
  var tabs = [{
    key: 'all',
    label: '全部'
  }, {
    key: 'pending_payment',
    label: '待支付'
  }, {
    key: 'pending_delivery',
    label: '待发货'
  }, {
    key: 'pending_pickup',
    label: '待自提'
  }, {
    key: 'completed',
    label: '已完成'
  }, {
    key: 'pending_review',
    label: '评价'
  }, {
    key: 'cancelled',
    label: '已取消'
  }];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    latestStatusRef.current = activeTab;
  }, [activeTab]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta2;
    var params = ((_Taro$getCurrentInsta2 = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta2 === void 0 || (_Taro$getCurrentInsta2 = _Taro$getCurrentInsta2.router) === null || _Taro$getCurrentInsta2 === void 0 ? void 0 : _Taro$getCurrentInsta2.params) || {};
    var status = params.status;
    if (false) { var searchParams; }
    if (status && status !== activeTab) {
      setActiveTab(status);
    }
  }, []);

  // 退款有效状态白名单：只有这些状态的记录才允许出现在退款/售后列表
  var validRefundStatuses = ['pending', 'processing', 'approved', 'rejected', 'refunding', 'refund_rejected', 'refunded', 'cancelled', 'completed'];
  // 退款相关状态：这些状态的订单不应出现在普通订单列表中
  var refundRelatedStatuses = ['refunding', 'refund_rejected', 'refunded', 'pending', 'processing', 'approved', 'rejected'];
  var loadOrders = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee(status) {
      var _res, _list, refundRecords, params, statusCode, res, list, transformed, ordersNeedCheckReview, reviewResults, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setLoading(true);
            _context.p = 1;
            if (!(status === 'refunding')) {
              _context.n = 4;
              break;
            }
            _context.n = 2;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchRefundList)({
              page: 1,
              size: 50
            });
          case 2:
            _res = _context.v;
            if (!(status !== latestStatusRef.current)) {
              _context.n = 3;
              break;
            }
            return _context.a(2);
          case 3:
            _list = Array.isArray(_res === null || _res === void 0 ? void 0 : _res.data) ? _res.data : []; // 过滤掉非退款状态的记录，确保退款/售后里只有真正的退款商品
            refundRecords = _list.map(transformRefund).filter(function (r) {
              return validRefundStatuses.includes(r.status);
            });
            setOrders(refundRecords);
            return _context.a(2);
          case 4:
            params = {
              page: 1,
              size: 50
            };
            if (status && status !== 'all' && status !== 'pending_review' && status !== 'reviewed') {
              statusCode = statusCodeReverseMap[status];
              if (statusCode !== undefined) {
                params.status = statusCode;
              }
            }
            _context.n = 5;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchOrderList)(params);
          case 5:
            res = _context.v;
            if (!(status !== latestStatusRef.current)) {
              _context.n = 6;
              break;
            }
            return _context.a(2);
          case 6:
            list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : []; // 过滤掉退款相关状态的订单，确保普通订单列表不混入退款订单
            transformed = list.map(transformOrder).filter(function (o) {
              return !refundRelatedStatuses.includes(o.status);
            }); // 后端未返回 isReviewed 时，兜底查询已完成/待评价订单的评价记录
            ordersNeedCheckReview = transformed.filter(function (o) {
              return (o.status === 'completed' || o.status === 'pending_review') && !o.isReviewed;
            });
            if (!(ordersNeedCheckReview.length > 0)) {
              _context.n = 8;
              break;
            }
            _context.n = 7;
            return Promise.allSettled(ordersNeedCheckReview.map(function (o) {
              return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchOrderReviews)(o.id);
            }));
          case 7:
            reviewResults = _context.v;
            reviewResults.forEach(function (result, index) {
              var _result$value;
              if (result.status === 'fulfilled' && ((_result$value = result.value) === null || _result$value === void 0 || (_result$value = _result$value.data) === null || _result$value === void 0 ? void 0 : _result$value.length) > 0) {
                var orderId = ordersNeedCheckReview[index].id;
                var orderIndex = transformed.findIndex(function (o) {
                  return o.id === orderId;
                });
                if (orderIndex >= 0) {
                  transformed[orderIndex].isReviewed = true;
                }
              }
            });
          case 8:
            if (status === 'pending_review') {
              setOrders(transformed.filter(function (o) {
                return o.status === 'completed' || o.status === 'pending_review';
              }));
            } else if (status === 'cancelled') {
              setOrders(transformed.filter(function (o) {
                return o.status === 'cancelled';
              }));
            } else if (status && status !== 'all') {
              // 前端二次过滤，确保只显示对应状态的订单
              setOrders(transformed.filter(function (o) {
                return o.status === status;
              }));
            } else {
              setOrders(transformed);
            }
            _context.n = 11;
            break;
          case 9:
            _context.p = 9;
            _t = _context.v;
            if (!(status !== latestStatusRef.current)) {
              _context.n = 10;
              break;
            }
            return _context.a(2);
          case 10:
            console.error('加载订单列表失败:', _t);
            setOrders([]);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '加载失败',
              icon: 'none'
            });
          case 11:
            _context.p = 11;
            if (status === latestStatusRef.current) {
              setLoading(false);
            }
            return _context.f(11);
          case 12:
            return _context.a(2);
        }
      }, _callee, null, [[1, 9, 11, 12]]);
    }));
    return function (_x) {
      return _ref12.apply(this, arguments);
    };
  }(), []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadOrders(activeTab);
  }, [activeTab, loadOrders]);

  // 监听评价成功事件，自动刷新订单列表
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var handler = function handler() {
      loadOrders(activeTab);
    };
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().eventCenter.on('orderReviewSuccess', handler);
    return function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().eventCenter.off('orderReviewSuccess', handler);
    };
  }, [loadOrders, activeTab]);
  var handleTabChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (status) {
    setActiveTab(status);
  }, []);
  var goShopping = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/home/index'
    });
  }, []);
  var goToOrderDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/cart/order/detail/index?id=".concat(orderId)
    });
  }, []);
  var handleCancelOrder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认取消',
      content: '确定要取消该订单吗？',
      success: function () {
        var _success = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee2(res) {
          var _t2;
          return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!res.confirm) {
                  _context2.n = 4;
                  break;
                }
                _context2.p = 1;
                _context2.n = 2;
                return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.cancelOrder)(orderId);
              case 2:
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: '订单已取消',
                  icon: 'success'
                });
                loadOrders(activeTab);
                _context2.n = 4;
                break;
              case 3:
                _context2.p = 3;
                _t2 = _context2.v;
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: (_t2 === null || _t2 === void 0 ? void 0 : _t2.message) || '取消失败',
                  icon: 'none'
                });
              case 4:
                return _context2.a(2);
            }
          }, _callee2, null, [[1, 3]]);
        }));
        function success(_x2) {
          return _success.apply(this, arguments);
        }
        return success;
      }()
    });
  }, [loadOrders, activeTab]);
  var handlePayOrder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref13 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee3(orderId) {
      var payRes, payStatus, errMsg, _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (orderId) {
              _context3.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '订单ID异常，请刷新页面',
              icon: 'none'
            });
            return _context3.a(2);
          case 1:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '发起支付...',
              mask: true
            });
            _context3.p = 2;
            _context3.n = 3;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.payOrder)(orderId, {
              paymentMethod: 'wechat'
            });
          case 3:
            payRes = _context3.v;
            // 2. 拉起微信支付（小程序 requestPayment / H5 JSAPI 或 H5 支付）
            //    支付成功后内部会轮询确认支付状态
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '请确认支付...',
              mask: true
            });
            _context3.n = 4;
            return (0,_utils_wechatPay__WEBPACK_IMPORTED_MODULE_4__.executeWechatPayment)(payRes, orderId);
          case 4:
            payStatus = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            if (payStatus !== null && payStatus !== void 0 && payStatus.isPaid) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '支付成功',
                icon: 'success'
              });
            } else {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: (payStatus === null || payStatus === void 0 ? void 0 : payStatus.message) || '支付状态确认中，请稍后查看',
                icon: 'none'
              });
            }
            loadOrders(activeTab);
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            errMsg = (_t3 === null || _t3 === void 0 ? void 0 : _t3.message) || '';
            if (errMsg.includes('取消支付')) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '已取消支付',
                icon: 'none'
              });
            } else {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: errMsg || '支付失败',
                icon: 'none'
              });
            }
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 5]]);
    }));
    return function (_x3) {
      return _ref13.apply(this, arguments);
    };
  }(), [loadOrders, activeTab]);
  var handleConfirmPickup = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认自提',
      content: '确定已收到商品吗？',
      success: function () {
        var _success2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee4(res) {
          var _t4;
          return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context4) {
            while (1) switch (_context4.p = _context4.n) {
              case 0:
                if (!res.confirm) {
                  _context4.n = 4;
                  break;
                }
                _context4.p = 1;
                _context4.n = 2;
                return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.confirmOrder)(orderId);
              case 2:
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: '已确认收货',
                  icon: 'success'
                });
                loadOrders(activeTab);
                _context4.n = 4;
                break;
              case 3:
                _context4.p = 3;
                _t4 = _context4.v;
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: (_t4 === null || _t4 === void 0 ? void 0 : _t4.message) || '操作失败',
                  icon: 'none'
                });
              case 4:
                return _context4.a(2);
            }
          }, _callee4, null, [[1, 3]]);
        }));
        function success(_x4) {
          return _success2.apply(this, arguments);
        }
        return success;
      }()
    });
  }, [loadOrders, activeTab]);
  var handleApplyRefund = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/cart/order/refund/index?id=".concat(orderId)
    });
  }, []);
  var handleReviewOrder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/cart/order/review/index?id=".concat(orderId)
    });
  }, []);
  var activeTabIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return tabs.findIndex(function (tab) {
      return tab.key === activeTab;
    });
  }, [activeTab, tabs]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderListPage,
    children: [activeTab !== 'refunding' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.ScrollView, {
      scrollX: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tabBar,
      showScrollbar: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tabList,
        children: tabs.map(function (tab, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tabItem, " ").concat(activeTabIndex === index ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : ''),
            onClick: function onClick() {
              return handleTabChange(tab.key);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tabText,
              children: tab.label
            }), activeTabIndex === index && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tabIndicator
            })]
          }, tab.key);
        })
      })
    }), activeTab === 'refunding' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].refundHeader,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].refundTitle,
        children: "\u9000\u6B3E/\u552E\u540E"
      })
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        children: "\u52A0\u8F7D\u4E2D..."
      })
    }) : orders.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.ScrollView, {
      scrollY: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].orderList,
      enhanced: true,
      showScrollbar: false,
      children: orders.map(function (order, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OrderCard, {
          order: order,
          onDetail: goToOrderDetail,
          onCancel: handleCancelOrder,
          onPay: handlePayOrder,
          onConfirmPickup: handleConfirmPickup,
          onRefund: handleApplyRefund,
          onReview: handleReviewOrder
        }, order.id || "order-".concat(index));
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(EmptyOrder, {
      onGoShopping: goShopping
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(OrderListPage));

/***/ }),

/***/ "./src/pages/cart/order/list/index.tsx":
/*!*********************************************!*\
  !*** ./src/pages/cart/order/list/index.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./src/pages/cart/order/list/index.tsx");


var config = {"navigationBarTitleText":"我的订单","enablePullDownRefresh":true};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/cart/order/list/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/cart/order-list.module.scss":
/*!************************************************!*\
  !*** ./src/styles/cart/order-list.module.scss ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"orderListPage":"order-list-module__orderListPage___NtfNi","tabBar":"order-list-module__tabBar___fgXNt","tabList":"order-list-module__tabList___M5ifq","tabItem":"order-list-module__tabItem___khtpq","tabText":"order-list-module__tabText___C2GiO","active":"order-list-module__active___XdTkM","tabIndicator":"order-list-module__tabIndicator___JQF3Q","orderList":"order-list-module__orderList___nmADa","orderCard":"order-list-module__orderCard___iToai","orderHeader":"order-list-module__orderHeader___sTeSn","orderId":"order-list-module__orderId___G1AlW","orderStatus":"order-list-module__orderStatus___hgp5E","storeInfo":"order-list-module__storeInfo___wWJ09","storeName":"order-list-module__storeName___lPQd_","storeAddress":"order-list-module__storeAddress___yfeEj","orderProducts":"order-list-module__orderProducts___sqxMT","orderProduct":"order-list-module__orderProduct___yZC9v","productImage":"order-list-module__productImage___bmf15","productInfo":"order-list-module__productInfo___n9Qjf","productName":"order-list-module__productName___T88Yy","productSpecs":"order-list-module__productSpecs___yaimj","productBottom":"order-list-module__productBottom___tzq6n","productPrice":"order-list-module__productPrice___yyiRX","productQuantity":"order-list-module__productQuantity___etwRG","orderFooter":"order-list-module__orderFooter___jDeh4","orderTotal":"order-list-module__orderTotal___ceNEl","totalLabel":"order-list-module__totalLabel___FTLHR","totalValue":"order-list-module__totalValue___BIc9O","orderActions":"order-list-module__orderActions___ieeGq","actionBtn":"order-list-module__actionBtn___WcUov","primary":"order-list-module__primary___SIXAn","secondary":"order-list-module__secondary___EkHH4","danger":"order-list-module__danger___AymX_","emptyOrder":"order-list-module__emptyOrder___dYhUd","emptyIcon":"order-list-module__emptyIcon___mar7D","emptyText":"order-list-module__emptyText___vPbX6","goShoppingBtn":"order-list-module__goShoppingBtn___Vuxgu","loading":"order-list-module__loading___NhZ5x","refundHeader":"order-list-module__refundHeader___aFemB","refundTitle":"order-list-module__refundTitle____pLln","refundStatusActions":"order-list-module__refundStatusActions___E96du","refundStatusBtn":"order-list-module__refundStatusBtn___fu_mj"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/order/list/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map