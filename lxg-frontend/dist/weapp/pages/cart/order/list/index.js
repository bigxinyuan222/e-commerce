"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/list/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./src/pages/cart/order/list/index.tsx":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./src/pages/cart/order/list/index.tsx ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/cart/order-list.module.scss */ "./src/styles/cart/order-list.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");











var statusCodeMap = {
  0: 'pending_payment',
  1: 'pending_delivery',
  2: 'pending_pickup',
  3: 'completed',
  4: 'cancelled',
  5: 'refunding',
  6: 'refund_rejected',
  7: 'refunded'
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
function transformOrderItem(item) {
  return {
    id: item.id || item.ID || '',
    productId: item.productId || item.ProductID || '',
    productName: item.productName || item.ProductName || '',
    skuId: item.skuId || item.SkuID || '',
    skuName: item.skuName || item.SkuName || '',
    price: item.price != null ? item.price : item.Price || 0,
    quantity: item.quantity != null ? item.quantity : item.Quantity || 0,
    image: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(item.image || item.Image || '')
  };
}
function transformOrder(order) {
  var _order$status, _order$store, _order$Store, _order$store2, _order$Store2, _ref, _order$totalAmount, _ref2, _order$freightAmount, _ref3, _order$couponAmount, _ref4, _order$payAmount;
  var rawStatus = (_order$status = order.status) !== null && _order$status !== void 0 ? _order$status : order.Status;
  var isNumericStatus = typeof rawStatus === 'number';
  var status = isNumericStatus ? statusCodeMap[rawStatus] || 'unknown' : rawStatus || 'unknown';
  var items = (order.items || order.Items || []).map(transformOrderItem);
  var store = order.store || order.Store ? {
    name: ((_order$store = order.store) === null || _order$store === void 0 ? void 0 : _order$store.name) || ((_order$Store = order.Store) === null || _order$Store === void 0 ? void 0 : _order$Store.Name) || '',
    address: ((_order$store2 = order.store) === null || _order$store2 === void 0 ? void 0 : _order$store2.address) || ((_order$Store2 = order.Store) === null || _order$Store2 === void 0 ? void 0 : _order$Store2.Address) || ''
  } : undefined;
  return {
    id: order.id || order.ID || order.orderNo || order.OrderNo || '',
    orderNo: order.orderNo || order.OrderNo || '',
    status: status,
    statusText: order.statusText || order.StatusText || statusMap[status] || '',
    createTime: order.createTime || order.CreateTime || '',
    totalAmount: (_ref = (_order$totalAmount = order.totalAmount) !== null && _order$totalAmount !== void 0 ? _order$totalAmount : order.TotalAmount) !== null && _ref !== void 0 ? _ref : 0,
    freightAmount: (_ref2 = (_order$freightAmount = order.freightAmount) !== null && _order$freightAmount !== void 0 ? _order$freightAmount : order.FreightAmount) !== null && _ref2 !== void 0 ? _ref2 : 0,
    couponAmount: (_ref3 = (_order$couponAmount = order.couponAmount) !== null && _order$couponAmount !== void 0 ? _order$couponAmount : order.CouponAmount) !== null && _ref3 !== void 0 ? _ref3 : 0,
    payAmount: (_ref4 = (_order$payAmount = order.payAmount) !== null && _order$payAmount !== void 0 ? _order$payAmount : order.PayAmount) !== null && _ref4 !== void 0 ? _ref4 : 0,
    items: items,
    store: store,
    address: order.address || order.Address || {},
    paymentMethod: order.paymentMethod || order.PaymentMethod || '',
    payTime: order.payTime || order.PayTime || '',
    deliverTime: order.deliverTime || order.DeliverTime || '',
    completeTime: order.completeTime || order.CompleteTime || '',
    cancelTime: order.cancelTime || order.CancelTime || '',
    cancelReason: order.cancelReason || order.CancelReason || ''
  };
}
var OrderProductItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref5) {
  var product = _ref5.product,
    onClick = _ref5.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderProduct,
    onClick: onClick,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
      src: product.image,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productImage,
      mode: "aspectFill"
    }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productName,
        children: product.productName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productSpecs,
        children: product.skuName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productBottom,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productPrice,
          children: product.price
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productQuantity,
          children: ["x", product.quantity]
        })]
      })]
    })]
  });
});
var OrderActionButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref6) {
  var text = _ref6.text,
    type = _ref6.type,
    onClick = _ref6.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].actionBtn, " ").concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"][type]),
    onClick: onClick,
    children: text
  });
});
var OrderCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref7) {
  var order = _ref7.order,
    onDetail = _ref7.onDetail,
    onCancel = _ref7.onCancel,
    onPay = _ref7.onPay,
    onConfirmDelivery = _ref7.onConfirmDelivery,
    onConfirmPickup = _ref7.onConfirmPickup,
    onRefund = _ref7.onRefund,
    onReview = _ref7.onReview,
    onRefundStatusChange = _ref7.onRefundStatusChange;
  var canCancel = order.status === 'pending_payment';
  var canPay = order.status === 'pending_payment';
  var canConfirmDelivery = order.status === 'pending_delivery';
  var canConfirmPickup = order.status === 'pending_pickup';
  var canRefund = order.status === 'pending_delivery' || order.status === 'pending_pickup' || order.status === 'completed' || order.status === 'pending_review';
  var canReview = order.status === 'completed' || order.status === 'pending_review';
  var isRefundOrder = order.status === 'refunding' || order.status === 'refund_rejected' || order.status === 'refunded';
  var refundStatusMap = {
    'refunding': '退款中',
    'refund_rejected': '商家已拒绝',
    'refunded': '已退款'
  };
  var refundStatusColorMap = {
    'refunding': '#faad14',
    'refund_rejected': '#ff4d4f',
    'refunded': '#52c41a'
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderCard,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderId,
        children: [isRefundOrder ? '退货编号' : '订单编号', ": ", order.orderNo]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderStatus,
        style: {
          color: isRefundOrder ? refundStatusColorMap[order.status] : statusColorMap[order.status] || '#999'
        },
        children: isRefundOrder ? refundStatusMap[order.status] || order.statusText : statusMap[order.status] || order.statusText
      })]
    }), order.store && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeName,
        children: order.store.name || '无门店信息'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeAddress,
        children: order.store.address || ''
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderProducts,
      children: (order.items || []).map(function (product, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderProductItem, {
          product: product,
          onClick: function onClick() {
            return onDetail(order.id);
          }
        }, "".concat(order.id, "-").concat(product.productId, "-").concat(index));
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderFooter,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderTotal,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].totalLabel,
          children: "\u5408\u8BA1:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].totalValue,
          children: ["\xA5", order.payAmount]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderActions,
        children: [canCancel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderActionButton, {
          text: "\u53D6\u6D88\u8BA2\u5355",
          type: "danger",
          onClick: function onClick() {
            return onCancel(order.id);
          }
        }), canPay && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderActionButton, {
          text: "\u7ACB\u5373\u652F\u4ED8",
          type: "primary",
          onClick: function onClick() {
            return onPay(order.id);
          }
        }), canConfirmDelivery && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderActionButton, {
          text: "\u786E\u8BA4\u53D1\u8D27",
          type: "primary",
          onClick: function onClick() {
            return onConfirmDelivery(order.id);
          }
        }), canConfirmPickup && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderActionButton, {
          text: "\u786E\u8BA4\u81EA\u63D0",
          type: "primary",
          onClick: function onClick() {
            return onConfirmPickup(order.id);
          }
        }), canRefund && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderActionButton, {
          text: "\u7533\u8BF7\u9000\u6B3E",
          type: "secondary",
          onClick: function onClick() {
            return onRefund(order.id);
          }
        }), canReview && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderActionButton, {
          text: "\u8BC4\u4EF7\u6652\u5355",
          type: "primary",
          onClick: function onClick() {
            return onReview(order.id);
          }
        })]
      })]
    }), isRefundOrder && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundStatusActions,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundStatusBtn, " ").concat(order.status === 'refunding' ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
        onClick: function onClick() {
          return onRefundStatusChange(order.id, 'refunding');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: "\u9000\u6B3E\u4E2D"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundStatusBtn, " ").concat(order.status === 'refund_rejected' ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
        onClick: function onClick() {
          return onRefundStatusChange(order.id, 'refund_rejected');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: "\u5546\u5BB6\u5DF2\u62D2\u7EDD"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundStatusBtn, " ").concat(order.status === 'refunded' ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
        onClick: function onClick() {
          return onRefundStatusChange(order.id, 'refunded');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: "\u5DF2\u9000\u6B3E"
        })
      })]
    })]
  });
});
var EmptyOrder = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref8) {
  var onGoShopping = _ref8.onGoShopping;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyOrder,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyIcon,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        children: "\uD83D\uDCE6"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyText,
      children: "\u6682\u65E0\u8BA2\u5355"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].goShoppingBtn,
      onClick: onGoShopping,
      children: "\u53BB\u8D2D\u7269"
    })]
  });
});
var OrderListPage = function OrderListPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all'),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    orders = _useState4[0],
    setOrders = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
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
    key: 'reviewed',
    label: '已取消'
  }];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
    if (params.status) {
      setActiveTab(params.status);
    }
  }, []);
  var loadOrders = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref9 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee(status) {
      var params, res, list, transformed, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setLoading(true);
            _context.p = 1;
            params = {
              page: 1,
              size: 50
            };
            if (status && status !== 'all' && status !== 'refunding' && status !== 'pending_review' && status !== 'reviewed') {
              params.status = status;
            }
            _context.n = 2;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchOrderList)(params);
          case 2:
            res = _context.v;
            list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : [];
            transformed = list.map(transformOrder);
            if (status === 'refunding') {
              setOrders(transformed.filter(function (o) {
                return ['refunding', 'refund_rejected', 'refunded'].includes(o.status);
              }));
            } else if (status === 'pending_review') {
              setOrders(transformed.filter(function (o) {
                return o.status === 'completed' || o.status === 'pending_review';
              }));
            } else if (status === 'reviewed') {
              setOrders(transformed.filter(function (o) {
                return o.status === 'reviewed' || o.status === 'cancelled';
              }));
            } else {
              setOrders(transformed);
            }
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error('加载订单列表失败:', _t);
            setOrders([]);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '加载失败',
              icon: 'none'
            });
          case 4:
            _context.p = 4;
            setLoading(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function (_x) {
      return _ref9.apply(this, arguments);
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
        var _success = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee2(res) {
          var _t2;
          return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context2) {
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
    var _ref0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee3(orderId) {
      var orderInfo, _ref1, _payData$orderNo, _ref10, _ref11, _payData$transactionI, _ref12, _payData$amount, payRes, payData, orderNo, transactionId, amount, statusRes, payStatus, _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            orderInfo = orders.find(function (o) {
              return o.id === orderId;
            });
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '支付处理中...',
              mask: true
            });
            _context3.p = 1;
            _context3.n = 2;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.payOrder)(orderId, {
              paymentMethod: 'wechat'
            });
          case 2:
            payRes = _context3.v;
            payData = (payRes === null || payRes === void 0 ? void 0 : payRes.data) || payRes;
            orderNo = (_ref1 = (_payData$orderNo = payData === null || payData === void 0 ? void 0 : payData.orderNo) !== null && _payData$orderNo !== void 0 ? _payData$orderNo : orderInfo === null || orderInfo === void 0 ? void 0 : orderInfo.orderNo) !== null && _ref1 !== void 0 ? _ref1 : '';
            transactionId = (_ref10 = (_ref11 = (_payData$transactionI = payData === null || payData === void 0 ? void 0 : payData.transactionId) !== null && _payData$transactionI !== void 0 ? _payData$transactionI : payData === null || payData === void 0 ? void 0 : payData.prepayId) !== null && _ref11 !== void 0 ? _ref11 : payData === null || payData === void 0 ? void 0 : payData.prepay_id) !== null && _ref10 !== void 0 ? _ref10 : '';
            amount = (_ref12 = (_payData$amount = payData === null || payData === void 0 ? void 0 : payData.amount) !== null && _payData$amount !== void 0 ? _payData$amount : orderInfo === null || orderInfo === void 0 ? void 0 : orderInfo.payAmount) !== null && _ref12 !== void 0 ? _ref12 : 0; // 2. 支付回调（模拟微信异步通知）
            _context3.n = 3;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.paymentCallback)({
              orderId: orderId,
              orderNo: orderNo,
              transactionId: transactionId,
              paymentMethod: 'wechat',
              amount: amount
            });
          case 3:
            _context3.n = 4;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchOrderPaymentStatus)(orderId);
          case 4:
            statusRes = _context3.v;
            payStatus = statusRes === null || statusRes === void 0 ? void 0 : statusRes.data;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            if (payStatus !== null && payStatus !== void 0 && payStatus.isPaid) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '支付成功',
                icon: 'success'
              });
            } else {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: (payStatus === null || payStatus === void 0 ? void 0 : payStatus.message) || '支付状态未确认，请稍后查看',
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
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: (_t3 === null || _t3 === void 0 ? void 0 : _t3.message) || '支付失败',
              icon: 'none'
            });
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 5]]);
    }));
    return function (_x3) {
      return _ref0.apply(this, arguments);
    };
  }(), [loadOrders, activeTab, orders]);
  var handleConfirmDelivery = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认发货',
      content: '确定已发货吗？发货后订单将变为待自提状态',
      success: function () {
        var _success2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee4(res) {
          var _t4;
          return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context4) {
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
                  title: '已确认发货',
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
  var handleConfirmPickup = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认自提',
      content: '确定已收到商品吗？',
      success: function () {
        var _success3 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee5(res) {
          var _t5;
          return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                if (!res.confirm) {
                  _context5.n = 4;
                  break;
                }
                _context5.p = 1;
                _context5.n = 2;
                return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.confirmOrder)(orderId);
              case 2:
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: '已确认收货',
                  icon: 'success'
                });
                loadOrders(activeTab);
                _context5.n = 4;
                break;
              case 3:
                _context5.p = 3;
                _t5 = _context5.v;
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: (_t5 === null || _t5 === void 0 ? void 0 : _t5.message) || '操作失败',
                  icon: 'none'
                });
              case 4:
                return _context5.a(2);
            }
          }, _callee5, null, [[1, 3]]);
        }));
        function success(_x5) {
          return _success3.apply(this, arguments);
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
  var handleRefundStatusChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (_orderId, status) {
    var statusTextMap = {
      'refunding': '退款中',
      'refund_rejected': '商家已拒绝',
      'refunded': '已退款'
    };
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: "\u72B6\u6001\u5DF2\u66F4\u65B0\u4E3A".concat(statusTextMap[status]),
      icon: 'success'
    });
    loadOrders(activeTab);
  }, [loadOrders, activeTab]);
  var activeTabIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return tabs.findIndex(function (tab) {
      return tab.key === activeTab;
    });
  }, [activeTab, tabs]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderListPage,
    children: [activeTab !== 'refunding' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollX: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabBar,
      showScrollbar: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabList,
        children: tabs.map(function (tab, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabItem, " ").concat(activeTabIndex === index ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
            onClick: function onClick() {
              return handleTabChange(tab.key);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabText,
              children: tab.label
            }), activeTabIndex === index && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabIndicator
            })]
          }, tab.key);
        })
      })
    }), activeTab === 'refunding' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundHeader,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundTitle,
        children: "\u9000\u6B3E/\u552E\u540E"
      })
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        children: "\u52A0\u8F7D\u4E2D..."
      })
    }) : orders.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderList,
      enhanced: true,
      showScrollbar: false,
      children: orders.map(function (order, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(OrderCard, {
          order: order,
          onDetail: goToOrderDetail,
          onCancel: handleCancelOrder,
          onPay: handlePayOrder,
          onConfirmDelivery: handleConfirmDelivery,
          onConfirmPickup: handleConfirmPickup,
          onRefund: handleApplyRefund,
          onReview: handleReviewOrder,
          onRefundStatusChange: handleRefundStatusChange
        }, order.id || "order-".concat(index));
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(EmptyOrder, {
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