"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/checkout/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/checkout/index!./src/pages/cart/checkout/index.tsx":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/checkout/index!./src/pages/cart/checkout/index.tsx ***!
  \********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regeneratorValues_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorValues.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorValues.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/user */ "./src/api/user/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/styles/cart/checkout.module.scss */ "./src/styles/cart/checkout.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");
















var CheckoutPage = function CheckoutPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    cartItems = _useAppContext.cartItems,
    getCartTotal = _useAppContext.getCartTotal,
    currentStore = _useAppContext.currentStore,
    setCartItems = _useAppContext.setCartItems,
    userInfo = _useAppContext.userInfo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('wechat'),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    paymentMethod = _useState2[0],
    setPaymentMethod = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    coupons = _useState4[0],
    setCoupons = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState5, 2),
    selectedCouponId = _useState6[0],
    setSelectedCouponId = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState7, 2),
    address = _useState8[0],
    setAddress = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState9, 2),
    remark = _useState0[0],
    setRemark = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState1, 2),
    buyNowItem = _useState10[0],
    setBuyNowItem = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState11, 2),
    loadingData = _useState12[0],
    setLoadingData = _useState12[1];
  var handleSwitchStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/category/stores/index'
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var _ref = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance().router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {},
      buyNow = _ref.buyNow;
    var parsedBuyNowItem = null;
    if (buyNow) {
      try {
        parsedBuyNowItem = JSON.parse(decodeURIComponent(buyNow));
        setBuyNowItem(parsedBuyNowItem);
      } catch (e) {
        console.error('Failed to parse buyNow data:', e);
      }
    }
    var loadInitialData = /*#__PURE__*/function () {
      var _ref2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee() {
        var _yield$Promise$all, _yield$Promise$all2, couponRes, addressRes, _couponRes$data, couponList, currentItems, currentGoodsAmount, availableCouponsList, _t;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              setLoadingData(true);
              _context.p = 1;
              _context.n = 2;
              return Promise.all([(0,_api_user__WEBPACK_IMPORTED_MODULE_4__.fetchMyCoupons)().catch(function () {
                return null;
              }), (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.fetchDefaultAddress)().catch(function (err) {
                if ((err === null || err === void 0 ? void 0 : err.statusCode) === 404) {
                  console.info('[checkout] 默认地址接口暂未实现，跳过');
                }
                return null;
              })]);
            case 2:
              _yield$Promise$all = _context.v;
              _yield$Promise$all2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_yield$Promise$all, 2);
              couponRes = _yield$Promise$all2[0];
              addressRes = _yield$Promise$all2[1];
              if (couponRes !== null && couponRes !== void 0 && couponRes.data) {
                couponList = Array.isArray(couponRes.data) ? couponRes.data : ((_couponRes$data = couponRes.data) === null || _couponRes$data === void 0 ? void 0 : _couponRes$data.list) || []; // 根据当前结算商品金额过滤可用且满足门槛的优惠券
                currentItems = parsedBuyNowItem ? [(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, parsedBuyNowItem), {}, {
                  id: "buyNow-".concat(parsedBuyNowItem.productId),
                  selected: true
                })] : cartItems.filter(function (item) {
                  return item.selected;
                });
                currentGoodsAmount = currentItems.reduce(function (sum, item) {
                  return sum + item.price * item.quantity;
                }, 0);
                availableCouponsList = couponList.filter(function (c) {
                  return c.status === 'available' && c.minAmount <= currentGoodsAmount;
                });
                setCoupons(availableCouponsList);
                if (availableCouponsList.length > 0) {
                  setSelectedCouponId(availableCouponsList[0].id);
                }
              }
              if (addressRes !== null && addressRes !== void 0 && addressRes.data) {
                setAddress(addressRes.data);
              }
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error('Failed to load checkout data:', _t);
            case 4:
              _context.p = 4;
              setLoadingData(false);
              return _context.f(4);
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[1, 3, 4, 5]]);
      }));
      return function loadInitialData() {
        return _ref2.apply(this, arguments);
      };
    }();
    loadInitialData();
  }, []);

  // 获取结算商品列表
  var getCheckoutItems = function getCheckoutItems() {
    if (buyNowItem) {
      return [(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, buyNowItem), {}, {
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
  var selectedCoupon = coupons.find(function (c) {
    return c.id === selectedCouponId;
  }) || null;
  var hasSpecialItem = selectedItems.some(function (item) {
    return item.isSeckill;
  });
  var goodsAmount = Number(selectedItems.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0).toFixed(2));
  var freightAmount = 0;
  var couponAmount = hasSpecialItem ? 0 : selectedCoupon ? selectedCoupon.value : 0;
  // 优惠券金额不能超过商品金额，防止应付总额为负
  if (couponAmount > goodsAmount) {
    couponAmount = goodsAmount;
  }
  var finalAmount = Number(Math.max(0, goodsAmount + freightAmount - couponAmount).toFixed(2));
  var handleSubmitOrder = /*#__PURE__*/function () {
    var _ref3 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee3() {
      var currentSelectedItems, isBuyNow, realCartIds, _iterator, _step, _loop, latestCartRes, invalidItems, _iterator2, _step2, _loop2, storeId, userCouponId, submitData, res, remainingItems, errorMsg, _t3, _t4, _t5;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (!loadingData) {
              _context5.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '数据加载中，请稍候',
              icon: 'none'
            });
            return _context5.a(2);
          case 1:
            if (userInfo.isLoggedIn) {
              _context5.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
              title: '请先登录',
              content: '提交订单需要登录账号',
              confirmText: '去登录',
              success: function success(res) {
                if (res.confirm) {
                  _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
                    url: '/pages/user/login/index'
                  });
                }
              }
            });
            return _context5.a(2);
          case 2:
            // 步骤2: 前端校验 - 空列表拦截
            currentSelectedItems = getCheckoutItems();
            if (!(currentSelectedItems.length === 0)) {
              _context5.n = 3;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请选择要结算的商品',
              icon: 'none'
            });
            return _context5.a(2);
          case 3:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '提交中...'
            });
            _context5.p = 4;
            // 步骤3: 区分购物车结算和立即购买场景
            isBuyNow = currentSelectedItems.some(function (item) {
              var _item$id;
              return (_item$id = item.id) === null || _item$id === void 0 ? void 0 : _item$id.toString().startsWith('buyNow-');
            });
            realCartIds = [];
            if (!isBuyNow) {
              _context5.n = 13;
              break;
            }
            // buyNow 场景：先添加到购物车，再获取真实后端ID
            _iterator = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__["default"])(currentSelectedItems);
            _context5.p = 5;
            _loop = /*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _loop() {
              var _item$id2;
              var item, _ref4, _ref5, _ref6, _ref7, _ref8, _addRes$data$id, _addRes$data, _addRes$data2, _addRes$data3, addRes, directCartId, isAddSuccess, listRes, _ref9, _item$productId, localSkuId, localProductId, matchedItem, fallbackSku, fallbackPid, finalMatch;
              return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    item = _step.value;
                    if (!((_item$id2 = item.id) !== null && _item$id2 !== void 0 && _item$id2.toString().startsWith('buyNow-'))) {
                      _context2.n = 5;
                      break;
                    }
                    _context2.n = 1;
                    return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.addToCartAPI)({
                      productId: item.productId,
                      skuId: item.skuId || item.productId,
                      quantity: item.quantity
                    });
                  case 1:
                    addRes = _context2.v;
                    console.log('[checkout] buyNow addToCart 响应:', JSON.stringify(addRes, null, 2));

                    // 优先：直接从 addToCart 响应中提取 cartId（后端可能返回新创建的 ID）
                    directCartId = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_addRes$data$id = addRes === null || addRes === void 0 || (_addRes$data = addRes.data) === null || _addRes$data === void 0 ? void 0 : _addRes$data.id) !== null && _addRes$data$id !== void 0 ? _addRes$data$id : addRes === null || addRes === void 0 || (_addRes$data2 = addRes.data) === null || _addRes$data2 === void 0 ? void 0 : _addRes$data2.cartId) !== null && _ref8 !== void 0 ? _ref8 : addRes === null || addRes === void 0 || (_addRes$data3 = addRes.data) === null || _addRes$data3 === void 0 ? void 0 : _addRes$data3.cart_id) !== null && _ref7 !== void 0 ? _ref7 : addRes === null || addRes === void 0 ? void 0 : addRes.id) !== null && _ref6 !== void 0 ? _ref6 : addRes === null || addRes === void 0 ? void 0 : addRes.cartId) !== null && _ref5 !== void 0 ? _ref5 : addRes === null || addRes === void 0 ? void 0 : addRes.cart_id) !== null && _ref4 !== void 0 ? _ref4 : '';
                    if (!directCartId) {
                      _context2.n = 2;
                      break;
                    }
                    realCartIds.push(Number(directCartId));
                    console.log('[checkout] buyNow 直接从响应获取 cartId:', directCartId);
                    return _context2.a(2, 1);
                  case 2:
                    // 降级：从购物车列表中匹配
                    // 放宽成功判断：HTTP 2xx 或 code 为 200/0/null 均视为成功
                    isAddSuccess = (addRes === null || addRes === void 0 ? void 0 : addRes.code) === 200 || (addRes === null || addRes === void 0 ? void 0 : addRes.code) === 0 || (addRes === null || addRes === void 0 ? void 0 : addRes.message) === 'created' || (addRes === null || addRes === void 0 ? void 0 : addRes.message) === 'success' || (addRes === null || addRes === void 0 ? void 0 : addRes.data) != null;
                    if (!isAddSuccess) {
                      _context2.n = 4;
                      break;
                    }
                    _context2.n = 3;
                    return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.fetchCartList)();
                  case 3:
                    listRes = _context2.v;
                    if (listRes !== null && listRes !== void 0 && listRes.data && Array.isArray(listRes.data)) {
                      localSkuId = ((_ref9 = item.skuId || item.productId) === null || _ref9 === void 0 ? void 0 : _ref9.toString()) || '';
                      localProductId = ((_item$productId = item.productId) === null || _item$productId === void 0 ? void 0 : _item$productId.toString()) || '';
                      matchedItem = listRes.data.find(function (cartItem) {
                        var _cartItem$productId, _cartItem$skuId;
                        return ((_cartItem$productId = cartItem.productId) === null || _cartItem$productId === void 0 ? void 0 : _cartItem$productId.toString()) === localProductId && (((_cartItem$skuId = cartItem.skuId) === null || _cartItem$skuId === void 0 ? void 0 : _cartItem$skuId.toString()) || '') === localSkuId;
                      }); // 降级匹配1：只用 skuId 匹配
                      fallbackSku = !matchedItem && localSkuId ? listRes.data.find(function (cartItem) {
                        var _cartItem$skuId2;
                        return (((_cartItem$skuId2 = cartItem.skuId) === null || _cartItem$skuId2 === void 0 ? void 0 : _cartItem$skuId2.toString()) || '') === localSkuId;
                      }) : null; // 降级匹配2：只用 productId 匹配（skuId 为空）
                      fallbackPid = !matchedItem && !fallbackSku && localProductId && !localSkuId ? listRes.data.find(function (cartItem) {
                        var _cartItem$productId2, _cartItem$skuId3;
                        return ((_cartItem$productId2 = cartItem.productId) === null || _cartItem$productId2 === void 0 ? void 0 : _cartItem$productId2.toString()) === localProductId && !((_cartItem$skuId3 = cartItem.skuId) !== null && _cartItem$skuId3 !== void 0 && _cartItem$skuId3.toString() || '');
                      }) : null;
                      finalMatch = matchedItem || fallbackSku || fallbackPid;
                      if (finalMatch) {
                        realCartIds.push(Number(finalMatch.id));
                        console.log('[checkout] buyNow 从列表匹配到 cartId:', finalMatch.id);
                      } else {
                        console.warn('[checkout] buyNow 匹配失败:', {
                          localProductId: item.productId,
                          localSkuId: item.skuId,
                          backendItems: listRes.data.map(function (c) {
                            return {
                              id: c.id,
                              productId: c.productId,
                              skuId: c.skuId
                            };
                          })
                        });
                      }
                    }
                    _context2.n = 5;
                    break;
                  case 4:
                    console.error('[checkout] buyNow addToCart 失败:', addRes);
                    throw new Error((addRes === null || addRes === void 0 ? void 0 : addRes.message) || '加入购物车失败');
                  case 5:
                    return _context2.a(2);
                }
              }, _loop);
            });
            _iterator.s();
          case 6:
            if ((_step = _iterator.n()).done) {
              _context5.n = 9;
              break;
            }
            return _context5.d((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regeneratorValues_js__WEBPACK_IMPORTED_MODULE_13__["default"])(_loop()), 7);
          case 7:
            if (!_context5.v) {
              _context5.n = 8;
              break;
            }
            return _context5.a(3, 8);
          case 8:
            _context5.n = 6;
            break;
          case 9:
            _context5.n = 11;
            break;
          case 10:
            _context5.p = 10;
            _t3 = _context5.v;
            _iterator.e(_t3);
          case 11:
            _context5.p = 11;
            _iterator.f();
            return _context5.f(11);
          case 12:
            _context5.n = 24;
            break;
          case 13:
            _context5.n = 14;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.fetchCartList)();
          case 14:
            latestCartRes = _context5.v;
            // 临时调试：打印前后端购物车数据
            console.log('[checkout] 本地选中商品:', JSON.stringify(currentSelectedItems.map(function (i) {
              return {
                id: i.id,
                productId: i.productId,
                skuId: i.skuId,
                productName: i.productName
              };
            }), null, 2));
            console.log('[checkout] 后端购物车(已转换):', JSON.stringify(latestCartRes.data.map(function (i) {
              return {
                id: i.id,
                productId: i.productId,
                skuId: i.skuId,
                productName: i.productName
              };
            }), null, 2));
            if (!(!(latestCartRes !== null && latestCartRes !== void 0 && latestCartRes.data) || !Array.isArray(latestCartRes.data) || latestCartRes.data.length === 0)) {
              _context5.n = 15;
              break;
            }
            // 后端购物车为空，说明商品已被删除/失效
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
              title: '购物车已更新',
              content: '您的购物车可能已被其他设备修改，请刷新后重试',
              showCancel: false,
              success: function success() {
                setCartItems([]);
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
              }
            });
            return _context5.a(2);
          case 15:
            // 用 productId + skuId 匹配真实后端购物车 ID
            // 后端可能没有 productId 字段，所以用 skuId 作为主匹配键
            invalidItems = [];
            _iterator2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_12__["default"])(currentSelectedItems);
            _context5.p = 16;
            _loop2 = /*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _loop2() {
              var _item$skuId, _item$productId2;
              var item, localSkuId, localProductId, matchedBackendItem;
              return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    item = _step2.value;
                    localSkuId = ((_item$skuId = item.skuId) === null || _item$skuId === void 0 ? void 0 : _item$skuId.toString()) || '';
                    localProductId = ((_item$productId2 = item.productId) === null || _item$productId2 === void 0 ? void 0 : _item$productId2.toString()) || ''; // 优先：productId + skuId 双匹配
                    matchedBackendItem = latestCartRes.data.find(function (cartItem) {
                      var _cartItem$productId3, _cartItem$skuId4;
                      var bpId = ((_cartItem$productId3 = cartItem.productId) === null || _cartItem$productId3 === void 0 ? void 0 : _cartItem$productId3.toString()) || '';
                      var bsId = ((_cartItem$skuId4 = cartItem.skuId) === null || _cartItem$skuId4 === void 0 ? void 0 : _cartItem$skuId4.toString()) || '';
                      return bpId && bpId === localProductId && bsId === localSkuId;
                    }); // 降级1：只用 skuId 匹配（后端可能没有 productId）
                    if (!matchedBackendItem && localSkuId) {
                      matchedBackendItem = latestCartRes.data.find(function (cartItem) {
                        var _cartItem$skuId5;
                        return (((_cartItem$skuId5 = cartItem.skuId) === null || _cartItem$skuId5 === void 0 ? void 0 : _cartItem$skuId5.toString()) || '') === localSkuId;
                      });
                    }
                    // 降级2：只用 productId 匹配（skuId 为空的情况）
                    if (!matchedBackendItem && localProductId && !localSkuId) {
                      matchedBackendItem = latestCartRes.data.find(function (cartItem) {
                        var _cartItem$productId4;
                        return (((_cartItem$productId4 = cartItem.productId) === null || _cartItem$productId4 === void 0 ? void 0 : _cartItem$productId4.toString()) || '') === localProductId;
                      });
                    }
                    if (matchedBackendItem && matchedBackendItem.id) {
                      realCartIds.push(Number(matchedBackendItem.id));
                    } else {
                      // 本地购物车项在后端不存在，说明已失效
                      invalidItems.push("".concat(item.productName || item.productId));
                      console.warn('[checkout] 匹配失败详情:', JSON.stringify({
                        localProductId: item.productId,
                        localSkuId: item.skuId,
                        backendItems: latestCartRes.data.map(function (c) {
                          return {
                            id: c.id,
                            productId: c.productId,
                            skuId: c.skuId
                          };
                        })
                      }, null, 2));
                    }
                  case 1:
                    return _context3.a(2);
                }
              }, _loop2);
            });
            _iterator2.s();
          case 17:
            if ((_step2 = _iterator2.n()).done) {
              _context5.n = 19;
              break;
            }
            return _context5.d((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regeneratorValues_js__WEBPACK_IMPORTED_MODULE_13__["default"])(_loop2()), 18);
          case 18:
            _context5.n = 17;
            break;
          case 19:
            _context5.n = 21;
            break;
          case 20:
            _context5.p = 20;
            _t4 = _context5.v;
            _iterator2.e(_t4);
          case 21:
            _context5.p = 21;
            _iterator2.f();
            return _context5.f(21);
          case 22:
            // 汇总打印一次警告，避免批量失效时刷屏
            if (invalidItems.length > 0) {
              console.warn("[checkout] \u68C0\u6D4B\u5230 ".concat(invalidItems.length, " \u4E2A\u5931\u6548\u5546\u54C1:"), invalidItems.join('、'));
            }

            // 如果有匹配不到的商品，提示用户
            if (!(realCartIds.length === 0)) {
              _context5.n = 23;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
              title: '商品已失效',
              content: '部分商品可能已下架或库存不足，已为您刷新购物车',
              showCancel: false,
              success: function success() {
                // 用最新的后端数据更新本地购物车
                setCartItems(latestCartRes.data.map(function (item) {
                  return {
                    id: item.id,
                    productId: item.productId,
                    productName: item.productName,
                    skuId: item.skuId,
                    skuName: item.skuName,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    selected: true,
                    stock: item.stock
                  };
                }));
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
              }
            });
            return _context5.a(2);
          case 23:
            if (invalidItems.length > 0) {
              // 部分商品失效，提示用户后继续提交有效商品
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: "".concat(invalidItems.length, " \u4EF6\u5546\u54C1\u5DF2\u5931\u6548\uFF0C\u5DF2\u81EA\u52A8\u79FB\u51FA"),
                icon: 'none',
                duration: 2000
              });
            }
          case 24:
            if (!(realCartIds.length === 0)) {
              _context5.n = 25;
              break;
            }
            throw new Error('购物车项不能为空');
          case 25:
            // 步骤5: 提交订单
            storeId = (currentStore === null || currentStore === void 0 ? void 0 : currentStore.id) || 0;
            userCouponId = selectedCouponId || null;
            submitData = {
              cartIds: realCartIds,
              storeId: Number(storeId),
              userCouponId: userCouponId ? Number(userCouponId) : null,
              remark: remark
            };
            console.log('[SubmitOrder] Payload:', JSON.stringify(submitData));
            console.log('[SubmitOrder] realCartIds 详情:', realCartIds.map(function (id) {
              return {
                id: id,
                type: (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_14__["default"])(id),
                isFinite: Number.isFinite(id)
              };
            }));
            _context5.n = 26;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.submitOrder)(submitData);
          case 26:
            res = _context5.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            if (res !== null && res !== void 0 && res.data) {
              // 清理已结算的购物车项
              if (!isBuyNow) {
                remainingItems = cartItems.filter(function (item) {
                  return !realCartIds.includes(Number(item.id));
                });
                setCartItems(remainingItems);
                (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.batchDeleteCartItem)(realCartIds).catch(function () {
                  return null;
                });
              }

              // 步骤6: 提交成功跳转
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
                title: '订单提交成功',
                content: "\u8BA2\u5355\u53F7\uFF1A".concat(res.data.orderNo || res.data.orderId || '', "\n\u8BF7\u524D\u5F80\u8BA2\u5355\u9875\u9762\u652F\u4ED8"),
                showCancel: false,
                success: function success() {
                  _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
                    url: '/pages/cart/order/list/index?status=pending_payment'
                  });
                }
              });
            }
            _context5.n = 28;
            break;
          case 27:
            _context5.p = 27;
            _t5 = _context5.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            console.error('Submit order failed:', _t5);

            // 步骤7: 异常兜底 - 检测购物车项失效错误
            errorMsg = (_t5 === null || _t5 === void 0 ? void 0 : _t5.message) || '';
            if (errorMsg.includes('未找到匹配的购物车项') || errorMsg.includes('购物车项不能为空')) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
                title: '商品已失效',
                content: '部分商品可能已下架或库存不足，购物车已为您刷新',
                showCancel: false,
                success: function () {
                  var _success = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee2() {
                    var refreshed, _t2;
                    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context4) {
                      while (1) switch (_context4.p = _context4.n) {
                        case 0:
                          _context4.p = 0;
                          _context4.n = 1;
                          return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.fetchCartList)();
                        case 1:
                          refreshed = _context4.v;
                          if (refreshed !== null && refreshed !== void 0 && refreshed.data && Array.isArray(refreshed.data)) {
                            setCartItems(refreshed.data.map(function (item) {
                              return {
                                id: item.id,
                                productId: item.productId,
                                productName: item.productName,
                                skuId: item.skuId,
                                skuName: item.skuName,
                                price: item.price,
                                quantity: item.quantity,
                                image: item.image,
                                selected: true,
                                stock: item.stock
                              };
                            }));
                          } else {
                            setCartItems([]);
                          }
                          _context4.n = 3;
                          break;
                        case 2:
                          _context4.p = 2;
                          _t2 = _context4.v;
                          setCartItems([]);
                        case 3:
                          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
                        case 4:
                          return _context4.a(2);
                      }
                    }, _callee2, null, [[0, 2]]);
                  }));
                  function success() {
                    return _success.apply(this, arguments);
                  }
                  return success;
                }()
              });
            } else {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: errorMsg || '提交失败，请重试',
                icon: 'none'
              });
            }
          case 28:
            return _context5.a(2);
        }
      }, _callee3, null, [[16, 20, 21, 22], [5, 10, 11, 12], [4, 27]]);
    }));
    return function handleSubmitOrder() {
      return _ref3.apply(this, arguments);
    };
  }();

  // 选择优惠券
  var selectCoupon = function selectCoupon() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/user/coupons/index?selectable=true'
    });
  };
  if (selectedItems.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].checkoutPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          style: {
            fontSize: '32rpx',
            color: '#999'
          },
          children: "\u8D2D\u7269\u8F66\u4E3A\u7A7A"
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
    className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].checkoutPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].sectionHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].sectionTitle,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].icon,
            children: "\uD83C\uDFEA"
          }), "\u81EA\u63D0\u95E8\u5E97"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].changeBtn,
          onClick: handleSwitchStore,
          children: "\u5207\u6362\u95E8\u5E97"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeAvatar,
          children: "\uD83C\uDFEA"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeDetails,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeName,
            children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.name) || '深圳南山科技园店'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeAddress,
            children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.address) || '广东省深圳市南山区科技园南区A2栋1楼'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeHours,
            children: ["\u8425\u4E1A\u65F6\u95F4: ", (currentStore === null || currentStore === void 0 ? void 0 : currentStore.hours) || '09:00-22:00']
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].storeArrow,
          children: "\u203A"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].sectionHeader,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].sectionTitle,
          children: "\u5546\u54C1\u6E05\u5355"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsList,
        children: selectedItems.map(function (item) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
              src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.getImageUrl)(item.image),
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsImage,
              mode: "aspectFill"
            }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
                className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsName,
                children: item.productName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
                className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsSpecs,
                children: item.skuName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
                className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsBottom,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
                  className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsPrice,
                  children: ["\xA5", item.price]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
                  className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsQuantity,
                  children: ["\xD7", item.quantity]
                })]
              })]
            })]
          }, item.id);
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].couponSection,
      onClick: !hasSpecialItem ? selectCoupon : undefined,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].couponRow,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].couponLabel,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].icon,
            children: "\uD83C\uDFAB"
          }), "\u4F18\u60E0\u5238"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].couponInfo,
          children: hasSpecialItem ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].couponValue,
              style: {
                color: '#ff6b6b'
              },
              children: "\u79D2\u6740\u5546\u54C1\u4E0D\u652F\u6301"
            })
          }) : selectedCoupon ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].couponValue,
              children: ["-\xA5", selectedCoupon.value]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].arrow,
              children: "\u203A"
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].couponValue,
              style: {
                color: '#999'
              },
              children: "\u6682\u65E0\u53EF\u7528"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].arrow,
              children: "\u203A"
            })]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].sectionTitle,
        children: "\u652F\u4ED8\u65B9\u5F0F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentList,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentItem,
          onClick: function onClick() {
            return setPaymentMethod('wechat');
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentIcon,
            children: "\uD83D\uDCB3"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentInfo,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentName,
              children: "\u5FAE\u4FE1\u652F\u4ED8"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentDesc,
              children: "\u63A8\u8350"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
            className: "".concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio, " ").concat(paymentMethod === 'wechat' ? _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].selected : '')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentItem,
          onClick: function onClick() {
            return setPaymentMethod('alipay');
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentIcon,
            children: "\uD83D\uDCB0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
            className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentInfo,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentName,
              children: "\u652F\u4ED8\u5B9D"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
              className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentDesc,
              children: "\u652F\u4ED8\u4F18\u60E0"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
            className: "".concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].paymentRadio, " ").concat(paymentMethod === 'alipay' ? _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].selected : '')
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkHeader,
        children: "\u8BA2\u5355\u5907\u6CE8"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Input, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkInput,
        type: "text",
        placeholder: "\u9009\u586B\uFF0C\u53EF\u5907\u6CE8\u60A8\u7684\u7279\u6B8A\u9700\u6C42",
        value: remark,
        onInput: function onInput(e) {
          return setRemark(e.detail.value);
        }
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountRow,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountLabel,
          children: "\u5546\u54C1\u91D1\u989D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountValue,
          children: ["\xA5", goodsAmount.toFixed(2)]
        })]
      }), couponAmount > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountRow,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountLabel,
          children: "\u4F18\u60E0\u5238"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountValue,
          children: ["-\xA5", couponAmount.toFixed(2)]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: "".concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountRow, " ").concat(_styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].highlight),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountLabel,
          children: "\u5E94\u4ED8\u603B\u989D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountValue,
          children: ["\xA5", finalAmount.toFixed(2)]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
      className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].totalAmount,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountLabel,
          children: "\u5408\u8BA1:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.Text, {
          className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountValue,
          children: ["\xA5", finalAmount.toFixed(2)]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_15__.View, {
        className: _styles_cart_checkout_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].submitBtn,
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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/regeneratorValues.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/regeneratorValues.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _regeneratorValues; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e) + " is not iterable");
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/checkout/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map