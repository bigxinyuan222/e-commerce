"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/detail/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/detail/index!./src/pages/home/detail/index.tsx":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/detail/index!./src/pages/home/detail/index.tsx ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _data_product_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/product/products */ "./src/data/product/products.ts");
/* harmony import */ var _data_product_evaluations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/data/product/evaluations */ "./src/data/product/evaluations.ts");
/* harmony import */ var _data_common_coupons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/data/common/coupons */ "./src/data/common/coupons.ts");
/* harmony import */ var _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/home/detail.module.scss */ "./src/styles/home/detail.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");













var EvaluationItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var evaluation = _ref.evaluation,
    onLike = _ref.onLike,
    onComment = _ref.onComment;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateItem,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
        src: evaluation.userAvatar,
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].userAvatar,
        mode: "aspectFill",
        lazyLoad: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].userInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].userName,
          children: evaluation.userName
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateTime,
          children: evaluation.createTime
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateContent,
      children: evaluation.content
    }), evaluation.images.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateImages,
      children: evaluation.images.map(function (img, idx) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
          src: img,
          mode: "aspectFill",
          lazyLoad: true
        }, idx);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateActions,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionItem, " ").concat(evaluation.isLike ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].liked : ''),
        onClick: function onClick() {
          return onLike(evaluation.id);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionIcon,
          children: evaluation.isLike ? '❤️' : '👍'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionText,
          children: evaluation.likeCount
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionItem,
        onClick: function onClick() {
          return onComment(evaluation);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionIcon,
          children: "\uD83D\uDCAC"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionText,
          children: "\u8BC4\u8BBA"
        })]
      })]
    })]
  }, evaluation.id);
});

// SKU选项组件
var SkuOptionGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var specName = _ref2.specName,
    product = _ref2.product,
    specSelections = _ref2.specSelections,
    availableValues = _ref2.availableValues,
    onSelect = _ref2.onSelect;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].optionGroup,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].optionLabel,
      children: specName
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].optionValues,
      children: Array.from(new Set(product.skus.map(function (sku) {
        return sku.specs[specName];
      }))).map(function (specValue) {
        var isAvailable = availableValues.includes(specValue);
        var isSelected = specSelections[specName] === specValue;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].optionValue, " ").concat(isSelected ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : '', " ").concat(!isAvailable ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
          onClick: function onClick() {
            return isAvailable && onSelect(specName, specValue);
          },
          children: specValue
        }, specValue);
      })
    })]
  }, specName);
});
var ProductDetailPage = function ProductDetailPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    addToCart = _useAppContext.addToCart,
    currentStore = _useAppContext.currentStore;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    product = _useState2[0],
    setProduct = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    currentImage = _useState4[0],
    setCurrentImage = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState5, 2),
    selectedSku = _useState6[0],
    setSelectedSku = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState8 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState7, 2),
    quantity = _useState8[0],
    setQuantity = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState9, 2),
    showSkuModal = _useState0[0],
    setShowSkuModal = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('cart'),
    _useState10 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState1, 2),
    skuModalType = _useState10[0],
    setSkuModalType = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState12 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState11, 2),
    specSelections = _useState12[0],
    setSpecSelections = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState13, 2),
    evaluations = _useState14[0],
    setEvaluations = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState16 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState15, 2),
    setEvalStats = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState18 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState17, 2),
    aiSummary = _useState18[0],
    setAiSummary = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState20 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState19, 2),
    isSeckill = _useState20[0],
    setIsSeckill = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState22 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState21, 2),
    seckillCountdown = _useState22[0],
    setSeckillCountdown = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState24 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState23, 2),
    showCommentModal = _useState24[0],
    setShowCommentModal = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState26 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState25, 2),
    currentEvaluation = _useState26[0],
    setCurrentEvaluation = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState28 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState27, 2),
    commentInput = _useState28[0],
    setCommentInput = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState30 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState29, 2),
    productCoupons = _useState30[0],
    setProductCoupons = _useState30[1];

  // 使用 useMemo 缓存折扣计算

  // 使用 useCallback 缓存事件处理函数
  var onBannerChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    setCurrentImage(e.detail.current);
  }, []);

  // 获取可选的规格值
  var getAvailableSpecValues = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (specName) {
    if (!product) return [];
    var availableValues = [];
    product.skus.forEach(function (sku) {
      var otherSpecsMatch = Object.entries(specSelections).every(function (_ref3) {
        var _ref4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        if (key === specName) return true;
        return sku.specs[key] === value;
      });
      if (otherSpecsMatch) {
        availableValues.push(sku.specs[specName]);
      }
    });
    return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(new Set(availableValues));
  }, [product, specSelections]);

  // 选择规格
  var selectSpec = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (specName, specValue) {
    var newSelections = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, specSelections), {}, (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, specName, specValue));
    setSpecSelections(newSelections);
    var matchedSku = product === null || product === void 0 ? void 0 : product.skus.find(function (sku) {
      return Object.entries(newSelections).every(function (_ref5) {
        var _ref6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];
        return sku.specs[key] === value;
      });
    });
    if (matchedSku) {
      setSelectedSku(matchedSku);
    }
  }, [product, specSelections]);

  // 减少数量
  var decreaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  // 增加数量
  var increaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (selectedSku && quantity < selectedSku.stock) {
      setQuantity(quantity + 1);
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '库存不足',
        icon: 'none'
      });
    }
  }, [selectedSku, quantity]);

  // 添加到购物车
  var handleAddToCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!product || !selectedSku) return;
    addToCart({
      productId: product.id,
      productName: product.name,
      skuId: selectedSku.id,
      skuName: selectedSku.name,
      price: selectedSku.price,
      quantity: quantity,
      image: selectedSku.image || product.images[0],
      stock: selectedSku.stock,
      isSeckill: isSeckill
    });
    setShowSkuModal(false);
  }, [addToCart, product, selectedSku, quantity, isSeckill]);

  // 立即购买
  var handleBuyNow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!product || !selectedSku) return;
    setShowSkuModal(false);
    setTimeout(function () {
      var buyNowData = JSON.stringify({
        productId: product.id,
        productName: product.name,
        skuId: selectedSku.id,
        skuName: selectedSku.name,
        price: selectedSku.price,
        quantity: quantity,
        image: selectedSku.image || product.images[0],
        stock: selectedSku.stock,
        isSeckill: isSeckill
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/cart/checkout/index?buyNow=".concat(encodeURIComponent(buyNowData))
      });
    }, 300);
  }, [product, selectedSku, quantity, isSeckill]);

  // 打开SKU弹窗
  var openSkuModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (type) {
    setSkuModalType(type);
    setShowSkuModal(true);
  }, []);

  // 返回首页
  var goHome = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/home/index'
    });
  }, []);

  // 跳转到购物车
  var goToCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/cart/index'
    });
  }, []);

  // 跳转到评价页面
  var goToEvaluations = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/evaluations/index?id=".concat(product === null || product === void 0 ? void 0 : product.id)
    });
  }, [product]);

  // 拨打电话
  var callStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (currentStore) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().makePhoneCall({
        phoneNumber: currentStore.phone
      });
    }
  }, [currentStore]);

  // 切换门店
  var handleSwitchStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/category/stores/index'
    });
  }, []);

  // 跳转到客服页面
  var goToCustomerService = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/message/index'
    });
  }, []);

  // 分享商品
  var handleShare = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    try {
      var shareLink = "https://lexiangou.com/product/".concat(product === null || product === void 0 ? void 0 : product.id);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setClipboardData({
        data: shareLink,
        success: function success() {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '链接已复制',
            icon: 'success'
          });
        },
        fail: function fail() {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '复制失败',
            icon: 'none'
          });
        }
      });
    } catch (error) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '复制失败',
        icon: 'none'
      });
    }
  }, [product]);

  // 评价点赞
  var handleEvaluationLike = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (evalId) {
    setEvaluations(function (prev) {
      return prev.map(function (evalItem) {
        if (evalItem.id === evalId) {
          return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, evalItem), {}, {
            isLike: !evalItem.isLike,
            likeCount: evalItem.isLike ? evalItem.likeCount - 1 : evalItem.likeCount + 1
          });
        }
        return evalItem;
      });
    });
  }, []);

  // 打开评论弹窗
  var openCommentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (evaluation) {
    setCurrentEvaluation(evaluation);
    setShowCommentModal(true);
  }, []);

  // 关闭评论弹窗
  var closeCommentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  }, []);

  // 发送评论
  var sendComment = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!commentInput.trim()) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }
    var newComment = {
      id: "comment-".concat(Date.now()),
      evaluationId: currentEvaluation.id,
      userId: 'user-current',
      userName: '我',
      userAvatar: 'https://picsum.photos/id/99/100/100',
      content: commentInput.trim(),
      createTime: new Date().toLocaleString(),
      likeCount: 0,
      isLike: false
    };
    setEvaluations(function (prev) {
      return prev.map(function (evalItem) {
        if (evalItem.id === currentEvaluation.id) {
          return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, evalItem), {}, {
            comments: [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(evalItem.comments), [newComment])
          });
        }
        return evalItem;
      });
    });
    setCurrentEvaluation(function (prev) {
      return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
        comments: [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(prev.comments), [newComment])
      });
    });
    setCommentInput('');
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '评论成功',
      icon: 'success'
    });
  }, [commentInput, currentEvaluation]);

  // 评论点赞
  var handleCommentLike = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (commentId) {
    setEvaluations(function (prev) {
      return prev.map(function (evalItem) {
        if (evalItem.id === currentEvaluation.id) {
          return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, evalItem), {}, {
            comments: evalItem.comments.map(function (comment) {
              if (comment.id === commentId) {
                return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, comment), {}, {
                  isLike: !comment.isLike,
                  likeCount: comment.isLike ? comment.likeCount - 1 : comment.likeCount + 1
                });
              }
              return comment;
            })
          });
        }
        return evalItem;
      });
    });
    setCurrentEvaluation(function (prev) {
      return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
        comments: prev.comments.map(function (comment) {
          if (comment.id === commentId) {
            return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, comment), {}, {
              isLike: !comment.isLike,
              likeCount: comment.isLike ? comment.likeCount - 1 : comment.likeCount + 1
            });
          }
          return comment;
        })
      });
    });
  }, [currentEvaluation]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var _ref7 = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance().router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {},
      id = _ref7.id,
      seckill = _ref7.seckill;
    setIsSeckill(seckill === '1');
    if (id) {
      var productData = (0,_data_product_products__WEBPACK_IMPORTED_MODULE_3__.getProductById)(id);
      if (productData) {
        setProduct(productData);
        setSelectedSku(productData.skus[0]);
        var initialSelections = {};
        Object.keys(productData.skus[0].specs).forEach(function (key) {
          initialSelections[key] = productData.skus[0].specs[key];
        });
        setSpecSelections(initialSelections);
        var evalList = (0,_data_product_evaluations__WEBPACK_IMPORTED_MODULE_12__.getEvaluationsByProduct)(id);
        setEvaluations(evalList.slice(0, 2));
        var stats = (0,_data_product_evaluations__WEBPACK_IMPORTED_MODULE_12__.getEvaluationStats)(id);
        setEvalStats(stats);
        var summary = (0,_data_product_evaluations__WEBPACK_IMPORTED_MODULE_12__.getAiSummary)(id);
        setAiSummary(summary);
        var coupons = _data_common_coupons__WEBPACK_IMPORTED_MODULE_4__.availableCoupons.filter(function (c) {
          return c.scope === 'product' && c.productId === id;
        });
        setProductCoupons(coupons.slice(0, 2));
      }
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isSeckill) return;
    var updateCountdown = function updateCountdown() {
      var now = new Date().getTime();
      var endTime = new Date('2026-07-31 23:59:59').getTime();
      var diff = endTime - now;
      if (diff <= 0) {
        setSeckillCountdown('已结束');
        return;
      }
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(diff % (1000 * 60) / 1000);
      if (days > 0) {
        setSeckillCountdown("".concat(days, "\u5929").concat(hours, "\u65F6").concat(minutes, "\u5206"));
      } else {
        setSeckillCountdown("".concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0')));
      }
    };
    updateCountdown();
    var timer = setInterval(updateCountdown, 1000);
    return function () {
      return clearInterval(timer);
    };
  }, [isSeckill]);
  if (!product) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productDetailPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        style: {
          padding: '100rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productDetailPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.ScrollView, {
      scrollY: true,
      style: {
        height: 'calc(100vh - 120rpx)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productBanner,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Swiper, {
          autoplay: true,
          interval: 3000,
          circular: true,
          onChange: onBannerChange,
          children: product.images.map(function (image, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.SwiperItem, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
                src: image,
                mode: "aspectFill",
                lazyLoad: true
              })
            }, index);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].bannerIndicator,
          children: [currentImage + 1, "/", product.images.length]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].currentPrice,
            children: (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.price) || product.price
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].originalPrice,
            children: product.originalPrice
          }), isSeckill && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillBadge,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillBadgeText,
              children: "\u9650\u65F6\u79D2\u6740"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillBadgeTime,
              children: seckillCountdown
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].salesRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].salesValue,
            children: product.sales > 10000 ? "".concat((product.sales / 10000).toFixed(1), "\u4E07") : product.sales
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].salesLabel,
            children: "\u5DF2\u552E"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].activityTags,
          children: product.tags.map(function (tag) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tag,
              children: tag
            }, tag);
          })
        }), !isSeckill && productCoupons.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponTags,
          children: productCoupons.map(function (coupon) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponTag,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponTagValue,
                children: ["\xA5", coupon.value]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponTagDesc,
                children: ["\u4F18\u60E0", coupon.value, "\u65E0\u95E8\u69DB"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].couponTagBtn,
                children: "\u9886"
              })]
            }, coupon.id);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].infoSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productName,
          children: product.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productTags,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tag,
            children: product.brandName
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tag,
            children: product.categoryName
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionTitle,
            children: "\u95E8\u5E97\u81EA\u63D0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].switchStoreBtn,
            onClick: handleSwitchStore,
            children: "\u5207\u6362\u95E8\u5E97 >"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeInfo,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeAvatar,
            children: "\uD83C\uDFEA"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeDetails,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeName,
              children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.name) || '深圳南山科技园店'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeAddress,
              children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.address) || '广东省深圳市南山区科技园南区A2栋1楼'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeHours,
              children: ["\u8425\u4E1A\u65F6\u95F4: ", (currentStore === null || currentStore === void 0 ? void 0 : currentStore.hours) || '09:00-22:00']
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].storeAction,
            onClick: callStore,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].phoneIcon,
              children: "\uD83D\uDCDE"
            }), "\u62E8\u6253\u7535\u8BDD"]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          style: {
            textAlign: 'center',
            marginTop: '20rpx'
          },
          onClick: handleSwitchStore,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            style: {
              color: '#e2231a',
              fontSize: '24rpx'
            },
            children: "\u67E5\u770B\u66F4\u591A\u95E8\u5E97 >"
          })
        })]
      }), evaluations.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionTitle,
            children: "\u5546\u54C1\u8BC4\u4EF7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].viewAll,
            onClick: goToEvaluations,
            children: "\u67E5\u770B\u5168\u90E8"
          })]
        }), aiSummary && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiSummarySection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiSummaryHeader,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiIcon,
              children: "\uD83E\uDD16"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiSummaryTitle,
              children: "AI\u8BC4\u4EF7\u603B\u7ED3"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiScore,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].scoreValue,
                children: [Math.round(aiSummary.averageRating * 20), "%"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].scoreLabel,
                children: "\u7EFC\u5408\u8BC4\u5206"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiOverall,
            children: aiSummary.overall
          }), aiSummary.strengths.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiStrengths,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiLabel,
              children: "\uD83D\uDC4D \u597D\u8BC4\u4EAE\u70B9"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiTags,
              children: aiSummary.strengths.map(function (tag, idx) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiTag,
                  children: tag
                }, idx);
              })
            })]
          }), aiSummary.weaknesses.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiWeaknesses,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiLabel,
              children: "\uD83D\uDC4E \u5F85\u6539\u8FDB"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiTags,
              children: aiSummary.weaknesses.map(function (tag, idx) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].aiTag, " ").concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].weakTag),
                  children: tag
                }, idx);
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].evaluateList,
          children: evaluations.map(function (evaluation) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(EvaluationItem, {
              evaluation: evaluation,
              onLike: handleEvaluationLike,
              onComment: openCommentModal
            }, evaluation.id);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].detailSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionTitle,
          children: "\u5546\u54C1\u8BE6\u60C5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].detailContent,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            children: product.description
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        style: {
          height: '40rpx'
        }
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionIcons,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionItem,
          onClick: goHome,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].icon,
            children: "\uD83C\uDFE0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            children: "\u9996\u9875"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionItem,
          onClick: handleShare,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].icon,
            children: "\uD83D\uDCE4"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            children: "\u5206\u4EAB"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionItem,
          onClick: goToCustomerService,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].icon,
            children: "\uD83D\uDCAC"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            children: "\u5BA2\u670D"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionItem,
          onClick: goToCart,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].icon,
            children: "\uD83D\uDED2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            children: "\u8D2D\u7269\u8F66"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].actionButtons,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].addCartBtn,
          onClick: function onClick() {
            return openSkuModal('cart');
          },
          children: "\u52A0\u5165\u8D2D\u7269\u8F66"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].buyNowBtn,
          onClick: function onClick() {
            return openSkuModal('buy');
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].buyBtnText,
            children: "\u7ACB\u5373\u8D2D\u4E70"
          }), isSeckill && seckillCountdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].btnCountdown,
            children: seckillCountdown
          })]
        })]
      })]
    }), showSkuModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].skuModal,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalMask,
        onClick: function onClick() {
          return setShowSkuModal(false);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalContent,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
            src: (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.image) || product.images[0],
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectedImage,
            mode: "aspectFill",
            lazyLoad: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectedInfo,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectedPrice,
              children: (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.price) || product.price
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectedStock,
              children: ["\u5E93\u5B58: ", (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.stock) || 0, " \u4EF6"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectedName,
              children: (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.name) || '请选择规格'
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].closeBtn,
            onClick: function onClick() {
              return setShowSkuModal(false);
            },
            children: "\xD7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalBody,
          children: [product.skus[0] && Object.keys(product.skus[0].specs).map(function (specName) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(SkuOptionGroup, {
              specName: specName,
              product: product,
              specSelections: specSelections,
              availableValues: getAvailableSpecValues(specName),
              onSelect: selectSpec
            }, specName);
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityLabel,
              children: "\u8D2D\u4E70\u6570\u91CF"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityControl,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityBtn, " ").concat(quantity <= 1 ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
                onClick: decreaseQuantity,
                children: "-"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityNum,
                children: quantity
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityBtn,
                onClick: increaseQuantity,
                children: "+"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalFooter,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].confirmBtn,
            onClick: skuModalType === 'cart' ? handleAddToCart : handleBuyNow,
            children: ["\u786E\u5B9A", skuModalType === 'cart' ? '加入购物车' : '立即购买']
          })
        })]
      })]
    }), showCommentModal && currentEvaluation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentModal,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalMask,
        onClick: closeCommentModal
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentModalContent,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentModalHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentModalTitle,
            children: "\u5168\u90E8\u8BA8\u8BBA"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentModalClose,
            onClick: closeCommentModal,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              children: "\xD7"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.ScrollView, {
          scrollY: true,
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentModalBody,
          children: currentEvaluation.comments.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyComment,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              children: "\u6682\u65E0\u8BC4\u8BBA\uFF0C\u5FEB\u6765\u53D1\u8868\u7B2C\u4E00\u6761\u8BC4\u8BBA\u5427~"
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentList,
            children: currentEvaluation.comments.map(function (comment) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentItem,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
                  src: comment.userAvatar,
                  className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentAvatar,
                  mode: "aspectFill"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                  className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentContent,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentHeader,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentUserName,
                      children: comment.userName
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentTime,
                      children: comment.createTime
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentText,
                    children: comment.content
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                  className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentLike, " ").concat(comment.isLike ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].liked : ''),
                  onClick: function onClick() {
                    return handleCommentLike(comment.id);
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                    children: comment.isLike ? '❤️' : '👍'
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentLikeCount,
                    children: comment.likeCount
                  })]
                })]
              }, comment.id);
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentModalFooter,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Input, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentInput,
            placeholder: "\u8BF4\u8BF4\u4F60\u7684\u60F3\u6CD5~",
            value: commentInput,
            onInput: function onInput(e) {
              return setCommentInput(e.detail.value);
            },
            onConfirm: sendComment
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].commentSendBtn,
            onClick: sendComment,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              children: "\u63D0\u95EE"
            })
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(ProductDetailPage));

/***/ }),

/***/ "./src/pages/home/detail/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/home/detail/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/detail/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/detail/index!./src/pages/home/detail/index.tsx");


var config = {"navigationBarTitleText":"商品详情","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/detail/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/detail.module.scss":
/*!********************************************!*\
  !*** ./src/styles/home/detail.module.scss ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"productDetailPage":"detail-module__productDetailPage___JE7Vw","productBanner":"detail-module__productBanner___hNVW7","bannerIndicator":"detail-module__bannerIndicator___Ei2vt","priceSection":"detail-module__priceSection___Be4KP","priceRow":"detail-module__priceRow___xvrqd","seckillBadge":"detail-module__seckillBadge___Xkv9C","seckillBadgeText":"detail-module__seckillBadgeText___Iy7j0","seckillBadgeTime":"detail-module__seckillBadgeTime___NAxbE","currentPrice":"detail-module__currentPrice___tAvrm","originalPrice":"detail-module__originalPrice___ztI4F","discount":"detail-module__discount___Desjh","seckillCountdown":"detail-module__seckillCountdown___H9iwb","countdownLabel":"detail-module__countdownLabel___NYlhh","countdownValue":"detail-module__countdownValue___TkGKR","salesRow":"detail-module__salesRow___EDnH4","salesValue":"detail-module__salesValue___JY3eY","salesLabel":"detail-module__salesLabel___WJsCo","activityTags":"detail-module__activityTags___PCl43","tag":"detail-module__tag___pvR5t","couponTags":"detail-module__couponTags___R8Pjk","couponTag":"detail-module__couponTag___JeYe7","couponTagValue":"detail-module__couponTagValue___rRNjo","couponTagDesc":"detail-module__couponTagDesc___sxdU5","couponTagBtn":"detail-module__couponTagBtn___n4Sj6","infoSection":"detail-module__infoSection___PQ1vb","productName":"detail-module__productName___Bqs4W","productTags":"detail-module__productTags___gUFNg","baseInfo":"detail-module__baseInfo___CkQ8V","infoItem":"detail-module__infoItem___UWk9M","infoValue":"detail-module__infoValue___BDvRH","infoLabel":"detail-module__infoLabel___sodaS","promotionSection":"detail-module__promotionSection___tJ5fp","sectionTitle":"detail-module__sectionTitle___XIEQf","promotionItem":"detail-module__promotionItem____zEyT","promotionTag":"detail-module__promotionTag___nwwfP","promotionText":"detail-module__promotionText___hHxFn","skuSection":"detail-module__skuSection___GW7ap","selectedSku":"detail-module__selectedSku___uUoZO","skuImage":"detail-module__skuImage___DCwvF","skuInfo":"detail-module__skuInfo___AUToH","skuPrice":"detail-module__skuPrice___GHtPx","skuStock":"detail-module__skuStock___L6XZ9","skuName":"detail-module__skuName___pn0Sh","selectBtn":"detail-module__selectBtn___LPrRQ","skuOptions":"detail-module__skuOptions___Nln4x","skuOptionGroup":"detail-module__skuOptionGroup___qJD_x","optionLabel":"detail-module__optionLabel___JgYyq","optionValues":"detail-module__optionValues___cdoeZ","optionValue":"detail-module__optionValue___jJJir","active":"detail-module__active___Tcmk5","disabled":"detail-module__disabled___My2Th","aiSummarySection":"detail-module__aiSummarySection___h4YJ1","aiSummaryHeader":"detail-module__aiSummaryHeader___Y1ZvU","aiIcon":"detail-module__aiIcon___sTvqn","aiSummaryTitle":"detail-module__aiSummaryTitle___RmTP1","aiScore":"detail-module__aiScore____PBTZ","scoreValue":"detail-module__scoreValue___ZmW65","scoreLabel":"detail-module__scoreLabel___A8qoz","aiOverall":"detail-module__aiOverall___esGgu","aiStrengths":"detail-module__aiStrengths___EUs3u","aiWeaknesses":"detail-module__aiWeaknesses___Na0Ec","aiLabel":"detail-module__aiLabel___EsU5V","aiTags":"detail-module__aiTags___kZDGD","aiTag":"detail-module__aiTag___OEMsx","weakTag":"detail-module__weakTag___AMI6B","evaluateSection":"detail-module__evaluateSection___ZILhm","sectionHeader":"detail-module__sectionHeader___ELsy4","viewAll":"detail-module__viewAll___eVj4c","evaluateStats":"detail-module__evaluateStats___sSJCQ","score":"detail-module__score___olUNm","evaluateTags":"detail-module__evaluateTags___miZPi","evaluateList":"detail-module__evaluateList___fYRCR","evaluateItem":"detail-module__evaluateItem___B8oxy","evaluateHeader":"detail-module__evaluateHeader___yF8Hy","userAvatar":"detail-module__userAvatar___oEpcl","userInfo":"detail-module__userInfo___ukEmj","userName":"detail-module__userName___EeGbN","evaluateTime":"detail-module__evaluateTime___O9InG","rating":"detail-module__rating___JE1YE","evaluateContent":"detail-module__evaluateContent___Ubxy8","evaluateImages":"detail-module__evaluateImages___nRU7i","evaluateActions":"detail-module__evaluateActions___Vdr0j","actionItem":"detail-module__actionItem___GnVMK","liked":"detail-module__liked___KNu_R","actionIcon":"detail-module__actionIcon___WZ5GA","actionText":"detail-module__actionText___p7Ek6","commentModal":"detail-module__commentModal___8c8D3","modalMask":"detail-module__modalMask___Iezj8","commentModalContent":"detail-module__commentModalContent___PXjvt","commentModalHeader":"detail-module__commentModalHeader___PehIP","commentModalTitle":"detail-module__commentModalTitle___W0UEH","commentModalClose":"detail-module__commentModalClose___g_jiN","commentModalBody":"detail-module__commentModalBody___lwIW3","emptyComment":"detail-module__emptyComment___RMMg3","commentList":"detail-module__commentList___J2Agm","commentItem":"detail-module__commentItem___RFANE","commentAvatar":"detail-module__commentAvatar___C5H9r","commentContent":"detail-module__commentContent___BF34s","commentHeader":"detail-module__commentHeader___ciGUG","commentUserName":"detail-module__commentUserName___q5zER","commentTime":"detail-module__commentTime___UWap0","commentText":"detail-module__commentText___UjETJ","commentLike":"detail-module__commentLike___N3H5q","commentLikeCount":"detail-module__commentLikeCount___jvfwG","commentModalFooter":"detail-module__commentModalFooter___Ko2SM","commentInput":"detail-module__commentInput____amTj","commentSendBtn":"detail-module__commentSendBtn___x6X_4","detailSection":"detail-module__detailSection___ViyAI","detailContent":"detail-module__detailContent___XzYrq","storeSection":"detail-module__storeSection___SGP5F","storeHeader":"detail-module__storeHeader___hDqhU","switchStoreBtn":"detail-module__switchStoreBtn___Ntg9S","storeInfo":"detail-module__storeInfo___zp9Ah","storeAvatar":"detail-module__storeAvatar___A25x5","storeDetails":"detail-module__storeDetails___ZW0Av","storeName":"detail-module__storeName___c71J4","storeAddress":"detail-module__storeAddress___cqMUY","storeHours":"detail-module__storeHours___L2pXr","storeAction":"detail-module__storeAction___acibm","phoneIcon":"detail-module__phoneIcon___ZjX22","bottomBar":"detail-module__bottomBar___sf9nD","actionIcons":"detail-module__actionIcons___qk2ZK","icon":"detail-module__icon___zEFp1","actionButtons":"detail-module__actionButtons___l5Noj","addCartBtn":"detail-module__addCartBtn___bNq9w","buyNowBtn":"detail-module__buyNowBtn____mEjm","buyBtnText":"detail-module__buyBtnText___fxjct","btnCountdown":"detail-module__btnCountdown___GUQ8w","skuModal":"detail-module__skuModal___EeV1v","modalContent":"detail-module__modalContent___Mwt32","modalHeader":"detail-module__modalHeader___BjBzo","selectedImage":"detail-module__selectedImage___NG19G","selectedInfo":"detail-module__selectedInfo___c5awI","selectedPrice":"detail-module__selectedPrice___StJe4","selectedStock":"detail-module__selectedStock___syp8V","selectedName":"detail-module__selectedName___tiPfT","closeBtn":"detail-module__closeBtn___BoAm0","modalBody":"detail-module__modalBody___fzeHv","optionGroup":"detail-module__optionGroup___Rcw2H","quantityRow":"detail-module__quantityRow____EsXu","quantityLabel":"detail-module__quantityLabel___dWodf","quantityControl":"detail-module__quantityControl___GFvJ3","quantityBtn":"detail-module__quantityBtn___nVTHw","quantityNum":"detail-module__quantityNum___LohOs","modalFooter":"detail-module__modalFooter___NAM7d","confirmBtn":"detail-module__confirmBtn___JxvgD"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/detail/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map