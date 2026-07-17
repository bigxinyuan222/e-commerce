"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/checkout/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/checkout/index!./src/pages/cart/checkout/index.tsx":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/checkout/index!./src/pages/cart/checkout/index.tsx ***!
  \********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _data_common_coupons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/common/coupons */ "./src/data/common/coupons.ts");
/* harmony import */ var _data_order_orders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/data/order/orders */ "./src/data/order/orders.ts");
/* harmony import */ var _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/cart/checkout.module.scss */ "./src/styles/cart/checkout.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");










var CheckoutPage = function CheckoutPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    cartItems = _useAppContext.cartItems,
    getCartTotal = _useAppContext.getCartTotal,
    currentStore = _useAppContext.currentStore,
    setCartItems = _useAppContext.setCartItems;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('wechat'),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState, 2),
    paymentMethod = _useState2[0],
    setPaymentMethod = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_data_common_coupons__WEBPACK_IMPORTED_MODULE_3__.myCoupons[0]),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState3, 1),
    selectedCoupon = _useState4[0];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState5, 2),
    remark = _useState6[0],
    setRemark = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState7, 2),
    buyNowItem = _useState8[0],
    setBuyNowItem = _useState8[1];
  var handleSwitchStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/category/stores/index'
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var _ref = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance().router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {},
      buyNow = _ref.buyNow;
    if (buyNow) {
      try {
        var item = JSON.parse(decodeURIComponent(buyNow));
        setBuyNowItem(item);
      } catch (e) {
        console.error('Failed to parse buyNow data:', e);
      }
    }
  }, []);

  // 获取结算商品列表
  var getCheckoutItems = function getCheckoutItems() {
    if (buyNowItem) {
      return [(0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])({}, buyNowItem), {}, {
        id: "buyNow-".concat(buyNowItem.productId),
        isSeckill: buyNowItem.isSeckill
      })];
    }
    return cartItems.filter(function (item) {
      return item.selected;
    });
  };
  var selectedItems = getCheckoutItems();
  getCartTotal();

  // 检测是否包含秒杀商品（不支持优惠券）
  var hasSpecialItem = selectedItems.some(function (item) {
    return item.isSeckill;
  });

  // 计算订单金额（秒杀商品不支持优惠券）
  var goodsAmount = selectedItems.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);
  var freightAmount = 0;
  var couponAmount = hasSpecialItem ? 0 : selectedCoupon ? selectedCoupon.value : 0;
  var finalAmount = goodsAmount + freightAmount - couponAmount;

  // 提交订单
  var handleSubmitOrder = function handleSubmitOrder() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
      title: '提交中...'
    });
    setTimeout(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();

      // 构建订单商品项
      var orderItems = selectedItems.map(function (item, index) {
        return {
          id: "item-".concat(Date.now(), "-").concat(index),
          productId: item.productId,
          productName: item.productName,
          skuId: "sku-".concat(item.productId, "-").concat(index),
          skuName: item.skuName,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        };
      });

      // 构建门店信息
      var storeInfo = currentStore ? {
        name: currentStore.name,
        phone: currentStore.phone,
        address: currentStore.address,
        businessHours: currentStore.hours
      } : undefined;

      // 创建待支付订单
      (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_4__.createOrder)({
        items: orderItems,
        totalAmount: goodsAmount,
        freightAmount: 0,
        couponAmount: couponAmount,
        payAmount: finalAmount,
        store: storeInfo,
        paymentMethod: paymentMethod === 'wechat' ? 'wechat' : 'alipay'
      });

      // 如果是购物车模式，删除已购买的商品
      if (!buyNowItem) {
        var selectedIds = selectedItems.map(function (item) {
          return item.id;
        });
        var remainingItems = cartItems.filter(function (item) {
          return !selectedIds.includes(item.id);
        });
        setCartItems(remainingItems);
      }
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
        title: '订单提交成功',
        content: '订单已提交，请前往订单页面支付',
        showCancel: false,
        success: function success() {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
            url: '/pages/order/list/index?status=pending_payment'
          });
        }
      });
    }, 1500);
  };

  // 选择优惠券
  var selectCoupon = function selectCoupon() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/user/coupons/index?selectable=true'
    });
  };
  if (selectedItems.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].checkoutPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          style: {
            fontSize: '32rpx',
            color: '#999'
          },
          children: "\u8D2D\u7269\u8F66\u4E3A\u7A7A"
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].checkoutPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionTitle,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].icon,
            children: "\uD83C\uDFEA"
          }), "\u81EA\u63D0\u95E8\u5E97"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].changeBtn,
          onClick: handleSwitchStore,
          children: "\u5207\u6362\u95E8\u5E97"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeAvatar,
          children: "\uD83C\uDFEA"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeDetails,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeName,
            children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.name) || '深圳南山科技园店'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeAddress,
            children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.address) || '广东省深圳市南山区科技园南区A2栋1楼'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeHours,
            children: ["\u8425\u4E1A\u65F6\u95F4: ", (currentStore === null || currentStore === void 0 ? void 0 : currentStore.hours) || '09:00-22:00']
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeArrow,
          children: "\u203A"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionHeader,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionTitle,
          children: "\u5546\u54C1\u6E05\u5355"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsList,
        children: selectedItems.map(function (item) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Image, {
              src: item.image,
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsImage,
              mode: "aspectFill"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsName,
                children: item.productName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsSpecs,
                children: item.skuName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
                className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsBottom,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                  className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsPrice,
                  children: ["\xA5", item.price]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                  className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].goodsQuantity,
                  children: ["\xD7", item.quantity]
                })]
              })]
            })]
          }, item.id);
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponSection,
      onClick: !hasSpecialItem ? selectCoupon : undefined,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponRow,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponLabel,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].icon,
            children: "\uD83C\uDFAB"
          }), "\u4F18\u60E0\u5238"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponInfo,
          children: hasSpecialItem ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponValue,
              style: {
                color: '#ff6b6b'
              },
              children: "\u79D2\u6740\u5546\u54C1\u4E0D\u652F\u6301"
            })
          }) : selectedCoupon ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponValue,
              children: ["-\xA5", selectedCoupon.value]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].arrow,
              children: "\u203A"
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponValue,
              style: {
                color: '#999'
              },
              children: "\u6682\u65E0\u53EF\u7528"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].arrow,
              children: "\u203A"
            })]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionTitle,
        children: "\u652F\u4ED8\u65B9\u5F0F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentList,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentItem,
          onClick: function onClick() {
            return setPaymentMethod('wechat');
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentIcon,
            children: "\uD83D\uDCB3"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentInfo,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentName,
              children: "\u5FAE\u4FE1\u652F\u4ED8"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentDesc,
              children: "\u63A8\u8350"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: "".concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentRadio, " ").concat(paymentMethod === 'wechat' ? _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selected : '')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentItem,
          onClick: function onClick() {
            return setPaymentMethod('alipay');
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentIcon,
            children: "\uD83D\uDCB0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentInfo,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentName,
              children: "\u652F\u4ED8\u5B9D"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentDesc,
              children: "\u652F\u4ED8\u4F18\u60E0"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: "".concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].paymentRadio, " ").concat(paymentMethod === 'alipay' ? _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selected : '')
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].remarkSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].remarkHeader,
        children: "\u8BA2\u5355\u5907\u6CE8"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Input, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].remarkInput,
        type: "text",
        placeholder: "\u9009\u586B\uFF0C\u53EF\u5907\u6CE8\u60A8\u7684\u7279\u6B8A\u9700\u6C42",
        value: remark,
        onInput: function onInput(e) {
          return setRemark(e.detail.value);
        }
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountRow,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountLabel,
          children: "\u5546\u54C1\u91D1\u989D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountValue,
          children: ["\xA5", goodsAmount]
        })]
      }), couponAmount > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountRow,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountLabel,
          children: "\u4F18\u60E0\u5238"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountValue,
          children: ["-\xA5", couponAmount]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: "".concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountRow, " ").concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].highlight),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountLabel,
          children: "\u5E94\u4ED8\u603B\u989D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountValue,
          children: ["\xA5", finalAmount]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].totalAmount,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountLabel,
          children: "\u5408\u8BA1:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountValue,
          children: ["\xA5", finalAmount]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].submitBtn,
        onClick: handleSubmitOrder,
        children: "\u63D0\u4EA4\u8BA2\u5355"
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (CheckoutPage);

/***/ }),

/***/ "./src/pages/cart/checkout/index.tsx":
/*!*******************************************!*\
  !*** ./src/pages/cart/checkout/index.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_checkout_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/checkout/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/checkout/index!./src/pages/cart/checkout/index.tsx");


var config = {"navigationBarTitleText":"确认订单","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_checkout_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/cart/checkout/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_checkout_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_checkout_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_checkout_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_checkout_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/cart/checkout.module.scss":
/*!**********************************************!*\
  !*** ./src/styles/cart/checkout.module.scss ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"checkoutPage":"checkout-module__checkoutPage___uRvMC","storeSection":"checkout-module__storeSection___ihX1Z","sectionHeader":"checkout-module__sectionHeader___jdHMJ","sectionTitle":"checkout-module__sectionTitle___aKgnG","icon":"checkout-module__icon___Z1_P7","changeBtn":"checkout-module__changeBtn___gGXJB","storeInfo":"checkout-module__storeInfo___4Om8W","storeAvatar":"checkout-module__storeAvatar___icPk0","storeDetails":"checkout-module__storeDetails___HcFSo","storeName":"checkout-module__storeName___F66Gv","storeAddress":"checkout-module__storeAddress___VPFNf","storeHours":"checkout-module__storeHours___PjpFc","storeArrow":"checkout-module__storeArrow___gey9h","goodsSection":"checkout-module__goodsSection___r5vYV","goodsList":"checkout-module__goodsList___pVPZE","goodsItem":"checkout-module__goodsItem___ijiru","goodsImage":"checkout-module__goodsImage___gdsbg","goodsInfo":"checkout-module__goodsInfo___p_NoB","goodsName":"checkout-module__goodsName___Ly1Op","goodsSpecs":"checkout-module__goodsSpecs___bF3Ai","goodsBottom":"checkout-module__goodsBottom___IWvsb","goodsPrice":"checkout-module__goodsPrice___eh_rV","goodsQuantity":"checkout-module__goodsQuantity___gPQdI","couponSection":"checkout-module__couponSection___CTLCq","couponRow":"checkout-module__couponRow___JLKpL","couponLabel":"checkout-module__couponLabel___dFX3j","couponInfo":"checkout-module__couponInfo___HGViG","couponValue":"checkout-module__couponValue___yPC_j","arrow":"checkout-module__arrow___Lua3I","paymentSection":"checkout-module__paymentSection___LnERF","paymentList":"checkout-module__paymentList___jjrHI","paymentItem":"checkout-module__paymentItem___inSz4","paymentIcon":"checkout-module__paymentIcon___s5uRz","paymentInfo":"checkout-module__paymentInfo___JDH80","paymentName":"checkout-module__paymentName___L9rHh","paymentDesc":"checkout-module__paymentDesc___WF8Of","paymentRadio":"checkout-module__paymentRadio___LAFMv","selected":"checkout-module__selected___S9Vp1","remarkSection":"checkout-module__remarkSection___mny43","remarkHeader":"checkout-module__remarkHeader___XAZDo","remarkInput":"checkout-module__remarkInput___Ys2zi","amountSection":"checkout-module__amountSection___QThEi","amountRow":"checkout-module__amountRow___CSEeK","amountLabel":"checkout-module__amountLabel___OHIOr","amountValue":"checkout-module__amountValue___MXZnF","highlight":"checkout-module__highlight___Wr5Wn","bottomBar":"checkout-module__bottomBar___hbaCV","totalAmount":"checkout-module__totalAmount___olSfK","submitBtn":"checkout-module__submitBtn___gquHX"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/checkout/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map