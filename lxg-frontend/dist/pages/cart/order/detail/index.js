"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/detail/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/detail/index!./src/pages/cart/order/detail/index.tsx":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/detail/index!./src/pages/cart/order/detail/index.tsx ***!
  \****************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_order_orders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/order/orders */ "./src/data/order/orders.ts");
/* harmony import */ var _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/cart/order-detail.module.scss */ "./src/styles/cart/order-detail.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







var OrderDetailPage = function OrderDetailPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    order = _useState2[0],
    setOrder = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
    if (params.id) {
      var orderData = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrderById)(params.id);
      if (orderData) {
        setOrder(orderData);
      } else {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '订单不存在',
          icon: 'none'
        });
      }
    }
    setLoading(false);
  }, []);
  var goToProductDetail = function goToProductDetail(productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId)
    });
  };
  var callStore = function callStore() {
    var _order$store;
    if (order !== null && order !== void 0 && (_order$store = order.store) !== null && _order$store !== void 0 && _order$store.phone) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().makePhoneCall({
        phoneNumber: order.store.phone
      });
    }
  };
  var handlePay = function handlePay() {
    if (order !== null && order !== void 0 && order.id) {
      (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.payOrder)(order.id);
      var updatedOrder = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrderById)(order.id);
      if (updatedOrder) {
        setOrder(updatedOrder);
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '支付成功',
          icon: 'success'
        });
      }
    }
  };
  var handleConfirmPickup = function handleConfirmPickup() {
    if (order !== null && order !== void 0 && order.id) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
        title: '确认自提',
        content: '确定已收到商品吗？',
        success: function success(res) {
          if (res.confirm) {
            (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.confirmPickup)(order.id);
            var updatedOrder = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrderById)(order.id);
            if (updatedOrder) {
              setOrder(updatedOrder);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '已确认收货',
                icon: 'success'
              });
            }
          }
        }
      });
    }
  };
  var handleConfirmDelivery = function handleConfirmDelivery() {
    if (order !== null && order !== void 0 && order.id) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
        title: '确认发货',
        content: '确定要发货吗？发货后订单将变为待自提状态。',
        success: function success(res) {
          if (res.confirm) {
            (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.confirmDelivery)(order.id);
            var updatedOrder = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrderById)(order.id);
            if (updatedOrder) {
              setOrder(updatedOrder);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '已确认发货',
                icon: 'success'
              });
            }
          }
        }
      });
    }
  };
  var handleCancel = function handleCancel() {
    if (order !== null && order !== void 0 && order.id) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
        title: '确认取消',
        content: '确定要取消该订单吗？',
        success: function success(res) {
          if (res.confirm) {
            (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.cancelOrder)(order.id);
            var updatedOrder = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrderById)(order.id);
            if (updatedOrder) {
              setOrder(updatedOrder);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '订单已取消',
                icon: 'success'
              });
            }
          }
        }
      });
    }
  };
  var handleRefund = function handleRefund() {
    if (order !== null && order !== void 0 && order.id) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/order/refund/index?id=".concat(order.id)
      });
    }
  };
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderDetailPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  if (!order) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderDetailPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          style: {
            fontSize: '32rpx',
            color: '#999'
          },
          children: "\u8BA2\u5355\u4E0D\u5B58\u5728"
        })
      })
    });
  }
  var isPendingPayment = order.status === 'pending_payment';
  var isPendingDelivery = order.status === 'pending_delivery';
  var isPendingPickup = order.status === 'pending_pickup';
  var isCompleted = order.status === 'completed';
  var isCancelled = order.status === 'cancelled';
  var isRefunding = order.status === 'refunding';
  var isRefundRejected = order.status === 'refund_rejected';
  var isRefunded = order.status === 'refunded';
  var getStatusIcon = function getStatusIcon() {
    if (isPendingPayment) return '⏳';
    if (isPendingDelivery) return '🚚';
    if (isPendingPickup) return '📦';
    if (isCompleted) return '✅';
    if (isCancelled) return '❌';
    if (isRefunding) return '🔄';
    if (isRefundRejected) return '❌';
    if (isRefunded) return '💰';
    return '📄';
  };
  var getStatusBgColor = function getStatusBgColor() {
    if (isPendingPayment) return '#e2231a';
    if (isPendingDelivery) return '#1890ff';
    if (isPendingPickup) return '#ff6600';
    if (isCompleted) return '#52c41a';
    if (isCancelled) return '#999';
    if (isRefunding) return '#faad14';
    if (isRefundRejected) return '#ff4d4f';
    if (isRefunded) return '#52c41a';
    return '#1890ff';
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderDetailPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      style: {
        height: 'calc(100vh - 120rpx)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].statusSection,
        style: {
          backgroundColor: getStatusBgColor()
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].statusIcon,
          children: getStatusIcon()
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].statusText,
          children: order.statusText
        })]
      }), order.store && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeInfo,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeName,
            children: ["\uD83C\uDFEA ", order.store.name]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeAddress,
            children: order.store.address
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeHours,
            children: ["\u8425\u4E1A\u65F6\u95F4: ", order.store.businessHours || order.store.hours]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeAction,
          onClick: callStore,
          children: "\uD83D\uDCDE"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsSection,
        children: (order.items || []).map(function (item) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsItem,
            onClick: function onClick() {
              return goToProductDetail(item.productId);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
              src: item.image,
              className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsImage,
              mode: "aspectFill"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsName,
                children: item.productName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsSpecs,
                children: item.skuName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsBottom,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                  className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsPrice,
                  children: ["\xA5", item.price]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                  className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsQuantity,
                  children: ["\xD7", item.quantity]
                })]
              })]
            })]
          }, item.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].orderInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoTitle,
          children: "\u8BA2\u5355\u4FE1\u606F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoLabel,
            children: "\u8BA2\u5355\u7F16\u53F7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoValue,
            children: order.orderNo
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoLabel,
            children: "\u4E0B\u5355\u65F6\u95F4"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoValue,
            children: order.createTime
          })]
        }), !isPendingPayment && order.payTime && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoLabel,
            children: "\u652F\u4ED8\u65F6\u95F4"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoValue,
            children: order.payTime
          })]
        }), isCancelled && order.cancelTime && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoLabel,
            children: "\u53D6\u6D88\u65F6\u95F4"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoValue,
            children: order.cancelTime
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountLabel,
            children: "\u5546\u54C1\u91D1\u989D"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountValue,
            children: ["\xA5", order.totalAmount]
          })]
        }), order.couponAmount > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountLabel,
            children: "\u4F18\u60E0\u5238"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountValue,
            children: ["-\xA5", order.couponAmount]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: "".concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountRow, " ").concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].highlight),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountLabel,
            children: "\u5E94\u4ED8\u603B\u989D"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountValue,
            children: ["\xA5", order.payAmount]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn,
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
            url: '/pages/message/index'
          });
        },
        children: "\u8054\u7CFB\u5BA2\u670D"
      }), isPendingPayment && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn,
          onClick: handleCancel,
          children: "\u53D6\u6D88\u8BA2\u5355"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: "".concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn, " ").concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].primary),
          onClick: handlePay,
          children: "\u7ACB\u5373\u652F\u4ED8"
        })]
      }), isPendingDelivery && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn,
          onClick: handleCancel,
          children: "\u53D6\u6D88\u8BA2\u5355"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: "".concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn, " ").concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].primary),
          onClick: handleConfirmDelivery,
          children: "\u786E\u8BA4\u53D1\u8D27"
        })]
      }), isPendingPickup && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn,
          onClick: handleRefund,
          children: "\u7533\u8BF7\u9000\u6B3E"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: "".concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn, " ").concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].primary),
          onClick: handleConfirmPickup,
          children: "\u786E\u8BA4\u53D6\u8D27"
        })]
      }), isCompleted && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn, " ").concat(_styles_cart_order_detail_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].primary),
        onClick: handleRefund,
        children: "\u7533\u8BF7\u9000\u6B3E"
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (OrderDetailPage);

/***/ }),

/***/ "./src/pages/cart/order/detail/index.tsx":
/*!***********************************************!*\
  !*** ./src/pages/cart/order/detail/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/detail/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/detail/index!./src/pages/cart/order/detail/index.tsx");


var config = {"navigationBarTitleText":"订单详情","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/cart/order/detail/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/cart/order-detail.module.scss":
/*!**************************************************!*\
  !*** ./src/styles/cart/order-detail.module.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"orderDetailPage":"order-detail-module__orderDetailPage___R_SPp","statusSection":"order-detail-module__statusSection___Dk04V","statusIcon":"order-detail-module__statusIcon___Xnxve","statusText":"order-detail-module__statusText___B39zP","storeSection":"order-detail-module__storeSection___gK9ZV","storeInfo":"order-detail-module__storeInfo___YV6TP","storeName":"order-detail-module__storeName___l7iJ_","storeAddress":"order-detail-module__storeAddress___fwHyG","storeHours":"order-detail-module__storeHours___WPZjN","storeAction":"order-detail-module__storeAction___LWHkF","goodsSection":"order-detail-module__goodsSection___D25Gu","goodsItem":"order-detail-module__goodsItem___GhG0L","goodsImage":"order-detail-module__goodsImage___FYhbi","goodsInfo":"order-detail-module__goodsInfo___BFBmh","goodsName":"order-detail-module__goodsName___mPad2","goodsSpecs":"order-detail-module__goodsSpecs___N27ba","goodsBottom":"order-detail-module__goodsBottom___surYx","goodsPrice":"order-detail-module__goodsPrice___BTQGP","goodsQuantity":"order-detail-module__goodsQuantity___obCUT","orderInfo":"order-detail-module__orderInfo___TIqmz","infoTitle":"order-detail-module__infoTitle___CLF8u","infoRow":"order-detail-module__infoRow___pr1kJ","infoLabel":"order-detail-module__infoLabel___XUhne","infoValue":"order-detail-module__infoValue___O471h","amountSection":"order-detail-module__amountSection___gKD0T","amountRow":"order-detail-module__amountRow___g7YsH","amountLabel":"order-detail-module__amountLabel____J9_K","amountValue":"order-detail-module__amountValue___Y8uPD","highlight":"order-detail-module__highlight___JICUM","groupProgressSection":"order-detail-module__groupProgressSection___xeEa6","groupHeader":"order-detail-module__groupHeader___hXy8y","groupTitle":"order-detail-module__groupTitle___IjLEC","groupSubtitle":"order-detail-module__groupSubtitle___FfAcR","groupSteps":"order-detail-module__groupSteps___22sXR","groupStep":"order-detail-module__groupStep___iGCAE","active":"order-detail-module__active___HIceE","stepIcon":"order-detail-module__stepIcon___DdVlg","stepText":"order-detail-module__stepText___ZjBxW","groupMembers":"order-detail-module__groupMembers___K4hN7","memberAvatarWrap":"order-detail-module__memberAvatarWrap___Vv6_u","memberAvatar":"order-detail-module__memberAvatar___yYg8i","memberAvatarEmpty":"order-detail-module__memberAvatarEmpty___W21Za","leaderBadge":"order-detail-module__leaderBadge___g_b4O","groupTip":"order-detail-module__groupTip___kasdD","tipText":"order-detail-module__tipText___IRxBk","tipHighlight":"order-detail-module__tipHighlight___GE29e","groupCountdown":"order-detail-module__groupCountdown___Z_i5U","countdownLabel":"order-detail-module__countdownLabel___o7MkS","countdownNumbers":"order-detail-module__countdownNumbers___y1m11","countdownNumber":"order-detail-module__countdownNumber___rURlJ","countdownSeparator":"order-detail-module__countdownSeparator___Nt8cL","groupAction":"order-detail-module__groupAction___A5LgZ","inviteBtn":"order-detail-module__inviteBtn___yJGET","inviteText":"order-detail-module__inviteText___uCNCG","bottomBar":"order-detail-module__bottomBar___jbcEd","actionBtn":"order-detail-module__actionBtn___S73bb","primary":"order-detail-module__primary___DUGyy"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/order/detail/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map