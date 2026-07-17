"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/list/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./src/pages/cart/order/list/index.tsx":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/list/index!./src/pages/cart/order/list/index.tsx ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_order_orders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/order/orders */ "./src/data/order/orders.ts");
/* harmony import */ var _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/cart/order-list.module.scss */ "./src/styles/cart/order-list.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







// 订单状态映射

var statusMap = {
  'pending_payment': '待支付',
  'pending_delivery': '待发货',
  'paid': '已支付',
  'pending_pickup': '待自提',
  'completed': '已完成',
  'pending_review': '待评价',
  'reviewed': '已评价',
  'cancelled': '已取消',
  'refunding': '退款中'
};

// 订单状态颜色映射
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

// 订单商品项组件
var OrderProductItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var product = _ref.product,
    onClick = _ref.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderProduct,
    onClick: onClick,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Image, {
      src: product.image,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productImage,
      mode: "aspectFill",
      lazyLoad: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productName,
        children: product.productName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productSpecs,
        children: product.skuName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productBottom,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productPrice,
          children: product.price
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productQuantity,
          children: ["x", product.quantity]
        })]
      })]
    })]
  });
});

// 订单操作按钮组件
var OrderActionButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var text = _ref2.text,
    type = _ref2.type,
    onClick = _ref2.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn, " ").concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"][type]),
    onClick: onClick,
    children: text
  });
});

// 订单卡片组件
var OrderCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref3) {
  var _order$store, _order$store2;
  var order = _ref3.order,
    onDetail = _ref3.onDetail,
    onCancel = _ref3.onCancel,
    onPay = _ref3.onPay,
    onConfirmDelivery = _ref3.onConfirmDelivery,
    onConfirmPickup = _ref3.onConfirmPickup,
    onRefund = _ref3.onRefund,
    onReview = _ref3.onReview,
    onRefundStatusChange = _ref3.onRefundStatusChange;
  // 判断订单是否可取消
  var canCancel = order.status === 'pending_payment';
  // 判断订单是否可支付
  var canPay = order.status === 'pending_payment';
  // 判断订单是否可确认发货
  var canConfirmDelivery = order.status === 'pending_delivery';
  // 判断订单是否可确认自提
  var canConfirmPickup = order.status === 'pending_pickup';
  // 判断订单是否可退款（待发货、待自提和已完成都可退款）
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderCard,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderId,
        children: [isRefundOrder ? '退货编号' : '订单编号', ": ", order.orderNo]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderStatus,
        style: {
          color: isRefundOrder ? refundStatusColorMap[order.status] : statusColorMap[order.status] || '#999'
        },
        children: isRefundOrder ? refundStatusMap[order.status] || order.statusText : statusMap[order.status] || order.statusText
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeName,
        children: ((_order$store = order.store) === null || _order$store === void 0 ? void 0 : _order$store.name) || '无门店信息'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeAddress,
        children: ((_order$store2 = order.store) === null || _order$store2 === void 0 ? void 0 : _order$store2.address) || ''
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderProducts,
      children: (order.items || []).map(function (product, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderProductItem, {
          product: product,
          onClick: function onClick() {
            return onDetail(order.id);
          }
        }, "".concat(order.id, "-").concat(product.productId, "-").concat(index));
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderFooter,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderTotal,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].totalLabel,
          children: "\u5408\u8BA1:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].totalValue,
          children: ["\xA5", order.payAmount]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderActions,
        children: [canCancel && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderActionButton, {
          text: "\u53D6\u6D88\u8BA2\u5355",
          type: "danger",
          onClick: function onClick() {
            return onCancel(order.id);
          }
        }), canPay && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderActionButton, {
          text: "\u7ACB\u5373\u652F\u4ED8",
          type: "primary",
          onClick: function onClick() {
            return onPay(order.id);
          }
        }), canConfirmDelivery && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderActionButton, {
          text: "\u786E\u8BA4\u53D1\u8D27",
          type: "primary",
          onClick: function onClick() {
            return onConfirmDelivery(order.id);
          }
        }), canConfirmPickup && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderActionButton, {
          text: "\u786E\u8BA4\u81EA\u63D0",
          type: "primary",
          onClick: function onClick() {
            return onConfirmPickup(order.id);
          }
        }), canRefund && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderActionButton, {
          text: "\u7533\u8BF7\u9000\u6B3E",
          type: "secondary",
          onClick: function onClick() {
            return onRefund(order.id);
          }
        }), canReview && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderActionButton, {
          text: "\u8BC4\u4EF7\u6652\u5355",
          type: "primary",
          onClick: function onClick() {
            return onReview(order.id);
          }
        })]
      })]
    }), isRefundOrder && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundStatusActions,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundStatusBtn, " ").concat(order.status === 'refunding' ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
        onClick: function onClick() {
          return onRefundStatusChange(order.id, 'refunding');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          children: "\u9000\u6B3E\u4E2D"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundStatusBtn, " ").concat(order.status === 'refund_rejected' ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
        onClick: function onClick() {
          return onRefundStatusChange(order.id, 'refund_rejected');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          children: "\u5546\u5BB6\u5DF2\u62D2\u7EDD"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundStatusBtn, " ").concat(order.status === 'refunded' ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
        onClick: function onClick() {
          return onRefundStatusChange(order.id, 'refunded');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          children: "\u5DF2\u9000\u6B3E"
        })
      })]
    })]
  }, order.id);
});

// 空订单组件
var EmptyOrder = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref4) {
  var onGoShopping = _ref4.onGoShopping;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyOrder,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyIcon,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        children: "\uD83D\uDCE6"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
      children: "\u6682\u65E0\u8BA2\u5355"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goShoppingBtn,
      onClick: onGoShopping,
      children: "\u53BB\u8D2D\u7269"
    })]
  });
});
var OrderListPage = function OrderListPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all'),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    currentStatus = _useState2[0],
    setCurrentStatus = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    orderList = _useState4[0],
    setOrderList = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState5, 2),
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

  // 初始化时读取URL参数
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
    if (params.status) {
      setCurrentStatus(params.status);
    }
  }, []);

  // 加载订单列表
  var loadOrders = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setLoading(true);
    setTimeout(function () {
      var filteredOrders = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrdersByStatus)(currentStatus);
      setOrderList(filteredOrders);
      setLoading(false);
    }, 100);
  }, [currentStatus]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadOrders();
  }, [loadOrders]);

  // 使用 useCallback 缓存事件处理函数
  var handleTabChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (status) {
    setCurrentStatus(status);
  }, []);
  var goShopping = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/home/index'
    });
  }, []);
  var goToOrderDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/order/detail/index?id=".concat(orderId)
    });
  }, []);
  var handleCancelOrder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认取消',
      content: '确定要取消该订单吗？',
      success: function success(res) {
        if (res.confirm) {
          (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.cancelOrder)(orderId);
          loadOrders();
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '订单已取消',
            icon: 'success'
          });
        }
      }
    });
  }, [loadOrders]);
  var handlePayOrder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.payOrder)(orderId);
    loadOrders();
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '支付成功',
      icon: 'success'
    });
  }, [loadOrders]);
  var handleConfirmDelivery = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认发货',
      content: '确定已发货吗？发货后订单将变为待自提状态',
      success: function success(res) {
        if (res.confirm) {
          (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.confirmDelivery)(orderId);
          loadOrders();
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '已确认发货',
            icon: 'success'
          });
        }
      }
    });
  }, [loadOrders]);
  var handleConfirmPickup = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认自提',
      content: '确定已收到商品吗？',
      success: function success(res) {
        if (res.confirm) {
          (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.confirmPickup)(orderId);
          loadOrders();
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '已确认收货',
            icon: 'success'
          });
        }
      }
    });
  }, [loadOrders]);
  var handleApplyRefund = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/order/refund/index?id=".concat(orderId)
    });
  }, []);
  var handleReviewOrder = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/order/review/index?id=".concat(orderId)
    });
  }, []);
  var handleRefundStatusChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (orderId, status) {
    (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.updateRefundStatus)(orderId, status);
    loadOrders();
    var statusTextMap = {
      'refunding': '退款中',
      'refund_rejected': '商家已拒绝',
      'refunded': '已退款'
    };
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: "\u72B6\u6001\u5DF2\u66F4\u65B0\u4E3A".concat(statusTextMap[status]),
      icon: 'success'
    });
  }, [loadOrders]);

  // 使用 useMemo 缓存当前选中的标签索引
  var activeTabIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return tabs.findIndex(function (tab) {
      return tab.key === currentStatus;
    });
  }, [currentStatus, tabs]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderListPage,
    children: [currentStatus !== 'refunding' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.ScrollView, {
      scrollX: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabBar,
      showScrollbar: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabList,
        children: tabs.map(function (tab, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
            className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabItem, " ").concat(activeTabIndex === index ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
            onClick: function onClick() {
              return handleTabChange(tab.key);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabText,
              children: tab.label
            }), activeTabIndex === index && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabIndicator
            })]
          }, tab.key);
        })
      })
    }), currentStatus === 'refunding' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundHeader,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundTitle,
        children: "\u9000\u6B3E/\u552E\u540E"
      })
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].loading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        children: "\u52A0\u8F7D\u4E2D..."
      })
    }) : orderList.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.ScrollView, {
      scrollY: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderList,
      enhanced: true,
      showScrollbar: false,
      children: orderList.map(function (order) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OrderCard, {
          order: order,
          onDetail: goToOrderDetail,
          onCancel: handleCancelOrder,
          onPay: handlePayOrder,
          onConfirmDelivery: handleConfirmDelivery,
          onConfirmPickup: handleConfirmPickup,
          onRefund: handleApplyRefund,
          onReview: handleReviewOrder,
          onRefundStatusChange: handleRefundStatusChange
        }, order.id);
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(EmptyOrder, {
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