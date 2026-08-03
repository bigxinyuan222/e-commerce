"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/detail/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/detail/index!./src/pages/home/detail/index.tsx":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/detail/index!./src/pages/home/detail/index.tsx ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* harmony import */ var _api_seckill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/api/seckill */ "./src/api/seckill/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/styles/home/detail.module.scss */ "./src/styles/home/detail.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");

















var EvaluationItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var evaluation = _ref.evaluation,
    onLike = _ref.onLike,
    onComment = _ref.onComment;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateItem,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
        src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.getImageUrl)(evaluation.userAvatar),
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].userAvatar,
        mode: "aspectFill"
      }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].userInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].userName,
          children: evaluation.userName
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateTime,
          children: evaluation.createdAt || evaluation.createTime
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateContent,
      children: evaluation.content
    }), evaluation.images && evaluation.images.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateImages,
      children: evaluation.images.map(function (img, idx) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
          src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.getImageUrl)(img),
          mode: "aspectFill"
        }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.lazyImgProps)()), idx);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateActions,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionItem, " ").concat(evaluation.isLike ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].liked : ''),
        onClick: function onClick() {
          return onLike(evaluation.id);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionIcon,
          children: evaluation.isLike ? '❤️' : '👍'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionText,
          children: evaluation.likeCount
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionItem,
        onClick: function onClick() {
          return onComment(evaluation);
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionIcon,
          children: "\uD83D\uDCAC"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionText,
          children: "\u8BC4\u8BBA"
        })]
      })]
    })]
  }, evaluation.id);
});
var SkuOptionGroup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var specName = _ref2.specName,
    product = _ref2.product,
    specSelections = _ref2.specSelections,
    availableValues = _ref2.availableValues,
    onSelect = _ref2.onSelect;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].optionGroup,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].optionLabel,
      children: specName
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].optionValues,
      children: Array.from(new Set(product.skus.map(function (sku) {
        return sku.specs[specName];
      }))).map(function (specValue) {
        var isAvailable = availableValues.includes(specValue);
        var isSelected = specSelections[specName] === specValue;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].optionValue, " ").concat(isSelected ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].active : '', " ").concat(!isAvailable ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].disabled : ''),
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
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState, 2),
    product = _useState2[0],
    setProduct = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState3, 2),
    currentImage = _useState4[0],
    setCurrentImage = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState5, 2),
    selectedSku = _useState6[0],
    setSelectedSku = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState7, 2),
    quantity = _useState8[0],
    setQuantity = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState9, 2),
    showSkuModal = _useState0[0],
    setShowSkuModal = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('cart'),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState1, 2),
    skuModalType = _useState10[0],
    setSkuModalType = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState11, 2),
    specSelections = _useState12[0],
    setSpecSelections = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState13, 2),
    evaluations = _useState14[0],
    setEvaluations = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState16 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState15, 2),
    evalStats = _useState16[0],
    setEvalStats = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState18 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState17, 2),
    aiSummary = _useState18[0],
    setAiSummary = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState20 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState19, 2),
    isSeckill = _useState20[0],
    setIsSeckill = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState22 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState21, 2),
    seckillCountdown = _useState22[0],
    setSeckillCountdown = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState24 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState23, 2),
    loading = _useState24[0],
    setLoading = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState26 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState25, 2),
    productId = _useState26[0],
    setProductId = _useState26[1];
  // 秒杀活动信息
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState28 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState27, 2),
    seckillActivityId = _useState28[0],
    setSeckillActivityId = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState30 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState29, 2),
    seckillInfo = _useState30[0],
    setSeckillInfo = _useState30[1];
  var _useState31 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState32 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState31, 2),
    purchasing = _useState32[0],
    setPurchasing = _useState32[1];
  var onBannerChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    setCurrentImage(e.detail.current);
  }, []);
  var getAvailableSpecValues = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (specName) {
    if (!product) return [];
    var availableValues = [];
    product.skus.forEach(function (sku) {
      var otherSpecsMatch = Object.entries(specSelections).every(function (_ref3) {
        var _ref4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        if (key === specName) return true;
        return sku.specs[key] === value;
      });
      if (otherSpecsMatch) {
        availableValues.push(sku.specs[specName]);
      }
    });
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(new Set(availableValues));
  }, [product, specSelections]);
  var selectSpec = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (specName, specValue) {
    // 构建新选择：设置当前规格，保留其他兼容的规格
    var newSelections = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_14__["default"])({}, specName, specValue);
    Object.entries(specSelections).forEach(function (_ref5) {
      var _ref6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];
      if (key === specName) return;
      // 检查该规格值与新选择是否至少有一个匹配的 SKU
      var hasAnyMatch = product === null || product === void 0 ? void 0 : product.skus.some(function (sku) {
        return sku.specs[key] === value && sku.specs[specName] === specValue;
      });
      if (hasAnyMatch) {
        newSelections[key] = value;
      }
    });

    // 查找是否有完全匹配的 SKU
    var matchedSku = product === null || product === void 0 ? void 0 : product.skus.find(function (sku) {
      return Object.entries(newSelections).every(function (_ref7) {
        var _ref8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_ref7, 2),
          key = _ref8[0],
          value = _ref8[1];
        return sku.specs[key] === value;
      });
    });
    setSpecSelections(newSelections);
    setSelectedSku(matchedSku || null);
  }, [product, specSelections]);
  var decreaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);
  var increaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!selectedSku) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请先选择规格',
        icon: 'none'
      });
      return;
    }
    if (quantity < selectedSku.stock) {
      setQuantity(quantity + 1);
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '库存不足',
        icon: 'none'
      });
    }
  }, [selectedSku, quantity]);
  var handleAddToCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee() {
    var _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (product) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          if (selectedSku) {
            _context.n = 2;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '请选择完整规格',
            icon: 'none'
          });
          return _context.a(2);
        case 2:
          _context.p = 2;
          _context.n = 3;
          return (0,_api_cart__WEBPACK_IMPORTED_MODULE_5__.addToCartAPI)({
            productId: product.id,
            skuId: selectedSku.id,
            quantity: quantity
          });
        case 3:
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error('添加到购物车API失败:', _t);
        case 5:
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
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4]]);
  })), [addToCart, product, selectedSku, quantity, isSeckill]);

  // 秒杀购买流程：创建秒杀订单 -> 轮询购买结果
  var handleSeckillPurchase = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee2() {
    var _purchaseRes$data, _purchaseRes$data2, _purchaseRes$data3, _result$status, purchaseRes, purchaseId, _purchaseRes$data4, _purchaseRes$data5, _status, statusText, _purchaseRes$data6, result, status, _t2;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (product) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          if (!purchasing) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2);
        case 2:
          setPurchasing(true);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
            title: '抢购中...',
            mask: true
          });
          _context2.p = 3;
          _context2.n = 4;
          return (0,_api_seckill__WEBPACK_IMPORTED_MODULE_6__.createSeckillPurchase)({
            activityId: seckillActivityId,
            productId: product.id,
            skuId: selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.id,
            quantity: quantity
          });
        case 4:
          purchaseRes = _context2.v;
          purchaseId = (purchaseRes === null || purchaseRes === void 0 || (_purchaseRes$data = purchaseRes.data) === null || _purchaseRes$data === void 0 ? void 0 : _purchaseRes$data.purchaseId) || (purchaseRes === null || purchaseRes === void 0 || (_purchaseRes$data2 = purchaseRes.data) === null || _purchaseRes$data2 === void 0 ? void 0 : _purchaseRes$data2.id) || (purchaseRes === null || purchaseRes === void 0 || (_purchaseRes$data3 = purchaseRes.data) === null || _purchaseRes$data3 === void 0 ? void 0 : _purchaseRes$data3.orderId) || '';
          if (purchaseId) {
            _context2.n = 5;
            break;
          }
          // 未返回 purchaseId：后端可能为同步处理，直接展示返回结果
          _status = purchaseRes === null || purchaseRes === void 0 || (_purchaseRes$data4 = purchaseRes.data) === null || _purchaseRes$data4 === void 0 ? void 0 : _purchaseRes$data4.status;
          statusText = purchaseRes === null || purchaseRes === void 0 || (_purchaseRes$data5 = purchaseRes.data) === null || _purchaseRes$data5 === void 0 ? void 0 : _purchaseRes$data5.statusText;
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
          if (_status === 'success' || _status === 'succeeded' || _status === 'paid') {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '抢购成功',
              icon: 'success'
            });
          } else {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: statusText || (purchaseRes === null || purchaseRes === void 0 || (_purchaseRes$data6 = purchaseRes.data) === null || _purchaseRes$data6 === void 0 ? void 0 : _purchaseRes$data6.message) || '抢购结果未知',
              icon: 'none'
            });
          }
          return _context2.a(2);
        case 5:
          _context2.n = 6;
          return (0,_api_seckill__WEBPACK_IMPORTED_MODULE_6__.pollSeckillPurchaseResult)(purchaseId, {
            interval: 1500,
            timeout: 15000
          });
        case 6:
          result = _context2.v;
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
          status = String((_result$status = result.status) !== null && _result$status !== void 0 ? _result$status : '');
          if (status === 'success' || status === 'succeeded' || status === 'paid') {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
              title: '抢购成功',
              content: "\u8BA2\u5355\u53F7\uFF1A".concat(result.orderId || purchaseId),
              showCancel: true,
              confirmText: '去支付',
              cancelText: '继续逛',
              success: function success(res) {
                if (res.confirm && result.orderId) {
                  _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
                    url: "/pages/cart/order/detail/index?id=".concat(result.orderId)
                  });
                }
              }
            });
          } else if (status === 'out_of_stock' || status === 'out-of-stock' || status === 'sold_out') {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '手慢了，商品已售罄',
              icon: 'none'
            });
          } else {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: result.statusText || result.message || '抢购失败',
              icon: 'none'
            });
          }
          _context2.n = 8;
          break;
        case 7:
          _context2.p = 7;
          _t2 = _context2.v;
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
          console.error('Seckill purchase failed:', _t2);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: (_t2 === null || _t2 === void 0 ? void 0 : _t2.message) || '抢购失败，请重试',
            icon: 'none'
          });
        case 8:
          _context2.p = 8;
          setPurchasing(false);
          return _context2.f(8);
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[3, 7, 8, 9]]);
  })), [product, selectedSku, quantity, seckillActivityId, purchasing]);
  var handleBuyNow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!product) return;
    if (!selectedSku) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请选择完整规格',
        icon: 'none'
      });
      return;
    }
    setShowSkuModal(false);
    // 秒杀商品走秒杀购买流程
    if (isSeckill) {
      handleSeckillPurchase();
      return;
    }
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
  }, [product, selectedSku, quantity, isSeckill, handleSeckillPurchase]);
  var openSkuModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (type) {
    setSkuModalType(type);
    setShowSkuModal(true);
  }, []);
  var goHome = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/home/index'
    });
  }, []);
  var goToCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/cart/index'
    });
  }, []);
  var goToEvaluations = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/evaluations/index?id=".concat(product === null || product === void 0 ? void 0 : product.id)
    });
  }, [product]);
  var callStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (currentStore) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().makePhoneCall({
        phoneNumber: currentStore.phone
      });
    }
  }, [currentStore]);
  var handleSwitchStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/category/stores/index'
    });
  }, []);
  var goToCustomerService = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/message/index'
    });
  }, []);
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
  var handleEvaluationLike = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref1 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee3(evalId) {
      var _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return (0,_api_home__WEBPACK_IMPORTED_MODULE_4__.likeReview)(evalId);
          case 1:
            setEvaluations(function (prev) {
              return prev.map(function (evalItem) {
                if (evalItem.id === evalId) {
                  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, evalItem), {}, {
                    isLike: !evalItem.isLike,
                    likeCount: evalItem.isLike ? evalItem.likeCount - 1 : evalItem.likeCount + 1
                  });
                }
                return evalItem;
              });
            });
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t3 = _context3.v;
            console.error('Failed to like review:', _t3);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return function (_x) {
      return _ref1.apply(this, arguments);
    };
  }(), []);
  var _useState33 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState34 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState33, 2),
    showCommentModal = _useState34[0],
    setShowCommentModal = _useState34[1];
  var _useState35 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState36 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState35, 2),
    currentEvaluation = _useState36[0],
    setCurrentEvaluation = _useState36[1];
  var _useState37 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState38 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_useState37, 2),
    commentInput = _useState38[0],
    setCommentInput = _useState38[1];
  var openCommentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee4(evaluation) {
      var res, replies, _t4;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            setCurrentEvaluation((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, evaluation), {}, {
              comments: [],
              loadingReplies: true
            }));
            setShowCommentModal(true);
            // 加载该评价的回复列表
            _context4.p = 1;
            _context4.n = 2;
            return (0,_api_home__WEBPACK_IMPORTED_MODULE_4__.fetchReviewReplies)({
              reviewId: evaluation.id,
              page: 1,
              size: 50
            });
          case 2:
            res = _context4.v;
            replies = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : [];
            setCurrentEvaluation(function (prev) {
              return prev ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, prev), {}, {
                comments: replies,
                loadingReplies: false
              }) : prev;
            });
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t4 = _context4.v;
            console.error('Failed to load review replies:', _t4);
            setCurrentEvaluation(function (prev) {
              return prev ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, prev), {}, {
                comments: [],
                loadingReplies: false
              }) : prev;
            });
          case 4:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 3]]);
    }));
    return function (_x2) {
      return _ref10.apply(this, arguments);
    };
  }(), []);
  var closeCommentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  }, []);
  var sendComment = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee5() {
    var newComment, _t5;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          if (commentInput.trim()) {
            _context5.n = 1;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '请输入评论内容',
            icon: 'none'
          });
          return _context5.a(2);
        case 1:
          if (currentEvaluation !== null && currentEvaluation !== void 0 && currentEvaluation.id) {
            _context5.n = 2;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '评价信息异常',
            icon: 'none'
          });
          return _context5.a(2);
        case 2:
          _context5.p = 2;
          _context5.n = 3;
          return (0,_api_home__WEBPACK_IMPORTED_MODULE_4__.replyToReview)({
            reviewId: currentEvaluation.id,
            content: commentInput.trim()
          });
        case 3:
          newComment = {
            id: "comment-".concat(Date.now()),
            reviewId: currentEvaluation.id,
            userId: 'user-current',
            userName: '我',
            userAvatar: '',
            content: commentInput.trim(),
            createTime: new Date().toLocaleString(),
            likeCount: 0,
            isLike: false
          };
          setCurrentEvaluation(function (prev) {
            return prev ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, prev), {}, {
              comments: [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(prev.comments || []), [newComment])
            }) : prev;
          });
          setCommentInput('');
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '评论成功',
            icon: 'success'
          });
          _context5.n = 5;
          break;
        case 4:
          _context5.p = 4;
          _t5 = _context5.v;
          console.error('Failed to send comment:', _t5);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '评论失败',
            icon: 'none'
          });
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[2, 4]]);
  })), [commentInput, currentEvaluation]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var _ref12 = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance().router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {},
      id = _ref12.id,
      seckill = _ref12.seckill,
      activityId = _ref12.activityId;
    var isSeckillPage = seckill === '1';
    setIsSeckill(isSeckillPage);
    if (activityId) setSeckillActivityId(activityId);
    if (!id) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '商品不存在',
        icon: 'none'
      });
      setTimeout(function () {
        return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
      }, 1000);
      return;
    }
    setProductId(id);
    var loadProduct = /*#__PURE__*/function () {
      var _ref13 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_15__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().m(function _callee6() {
        var _aiRes$data$strengths, _aiRes$data$weaknesse, requestList, _yield$Promise$all, _yield$Promise$all2, productRes, reviewRes, statsRes, aiRes, seckillRes, productData, firstSpecKey, initialSelections, reviewList, data, _t6;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_16__["default"])().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              setLoading(true);
              _context6.p = 1;
              // 并行加载：商品详情、评价列表、评价统计、AI评价摘要
              requestList = [(0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_4__.productApi.detail, {
                id: id
              }).catch(function (err) {
                console.error('[商品详情] 加载失败:', (err === null || err === void 0 ? void 0 : err.message) || err);
                return null;
              }),
              // 商品评论列表 GET /api/v1/review/list
              (0,_api_home__WEBPACK_IMPORTED_MODULE_4__.fetchReviewList)({
                productId: id,
                page: 1,
                size: 2
              }).catch(function (err) {
                console.error('[商品评价] 加载失败:', (err === null || err === void 0 ? void 0 : err.message) || err);
                return null;
              }),
              // 评价统计 GET /api/v1/review/state
              (0,_api_home__WEBPACK_IMPORTED_MODULE_4__.fetchReviewStats)(id).catch(function (err) {
                console.error('[评价统计] 加载失败:', (err === null || err === void 0 ? void 0 : err.message) || err);
                return null;
              }),
              // AI评价摘要 GET /api/v1/review/ai
              (0,_api_home__WEBPACK_IMPORTED_MODULE_4__.fetchReviewAiSummary)(id).catch(function (err) {
                console.error('[AI评价摘要] 加载失败:', (err === null || err === void 0 ? void 0 : err.message) || err);
                return null;
              })]; // 秒杀商品：额外获取指定商品秒杀活动信息
              if (isSeckillPage) {
                requestList.push((0,_api_seckill__WEBPACK_IMPORTED_MODULE_6__.fetchProductSeckillActivity)({
                  productId: id,
                  activityId: activityId || undefined
                }).catch(function () {
                  return null;
                }));
              }
              _context6.n = 2;
              return Promise.all(requestList);
            case 2:
              _yield$Promise$all = _context6.v;
              _yield$Promise$all2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(_yield$Promise$all, 5);
              productRes = _yield$Promise$all2[0];
              reviewRes = _yield$Promise$all2[1];
              statsRes = _yield$Promise$all2[2];
              aiRes = _yield$Promise$all2[3];
              seckillRes = _yield$Promise$all2[4];
              if (productRes !== null && productRes !== void 0 && productRes.data) {
                productData = (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.normalizeProductImages)(productRes.data);
                setProduct(productData);
                if (productData.skus && productData.skus.length > 0) {
                  // 只预填第一个规格维度，其他维度留空
                  // 避免全预填导致的规格联动锁定问题
                  firstSpecKey = productData.skus[0].specs ? Object.keys(productData.skus[0].specs)[0] : '';
                  initialSelections = {};
                  if (firstSpecKey) {
                    initialSelections[firstSpecKey] = productData.skus[0].specs[firstSpecKey];
                  }
                  setSpecSelections(initialSelections);

                  // 如果只有一个规格维度，直接匹配完整 SKU
                  if (Object.keys(initialSelections).length === Object.keys(productData.skus[0].specs || {}).length) {
                    setSelectedSku(productData.skus[0]);
                  } else {
                    setSelectedSku(null);
                  }
                }
              }

              // 解析评价列表（fetchReviewList 已做规范化）
              if (reviewRes !== null && reviewRes !== void 0 && reviewRes.data && Array.isArray(reviewRes.data)) {
                reviewList = reviewRes.data;
                if (reviewList.length > 0) {
                  console.log('[商品评价] 加载成功，共', reviewList.length, '条评价');
                  setEvaluations(reviewList.slice(0, 2));
                } else {
                  console.warn('[商品评价] 接口返回但数据为空');
                }
              }

              // 解析评价统计（fetchReviewStats 已做规范化）
              if (statsRes !== null && statsRes !== void 0 && statsRes.data) {
                console.log('[评价统计] 加载成功:', statsRes.data);
                setEvalStats(statsRes.data);
              }

              // 解析 AI 评价摘要（fetchReviewAiSummary 已做规范化）
              if (aiRes !== null && aiRes !== void 0 && aiRes.data && (aiRes.data.overall || (_aiRes$data$strengths = aiRes.data.strengths) !== null && _aiRes$data$strengths !== void 0 && _aiRes$data$strengths.length || (_aiRes$data$weaknesse = aiRes.data.weaknesses) !== null && _aiRes$data$weaknesse !== void 0 && _aiRes$data$weaknesse.length)) {
                console.log('[AI评价摘要] 加载成功:', aiRes.data);
                setAiSummary(aiRes.data);
              }

              // 处理秒杀活动信息
              if (seckillRes !== null && seckillRes !== void 0 && seckillRes.data) {
                data = seckillRes.data; // fetchProductSeckillActivity 可能返回活动对象（含 products）或单个商品活动
                if (data.products || data.endTime) {
                  setSeckillInfo(data);
                  if (data.id) setSeckillActivityId(String(data.id));
                } else if (data.seckillPrice !== undefined) {
                  setSeckillInfo(data);
                }
              }
              _context6.n = 4;
              break;
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              console.error('Failed to load product:', _t6);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '加载失败',
                icon: 'none'
              });
            case 4:
              _context6.p = 4;
              setLoading(false);
              return _context6.f(4);
            case 5:
              return _context6.a(2);
          }
        }, _callee6, null, [[1, 3, 4, 5]]);
      }));
      return function loadProduct() {
        return _ref13.apply(this, arguments);
      };
    }();
    loadProduct();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isSeckill) return;
    var updateCountdown = function updateCountdown() {
      // 优先使用秒杀活动返回的 endTime，兜底默认 12 小时后
      var endTimeStr = (seckillInfo === null || seckillInfo === void 0 ? void 0 : seckillInfo.endTime) || (seckillInfo === null || seckillInfo === void 0 ? void 0 : seckillInfo.end_time) || new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      var now = new Date().getTime();
      var endTime = new Date(String(endTimeStr).replace(/-/g, '/')).getTime();
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
  }, [isSeckill, seckillInfo]);
  if (loading || !product) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productDetailPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        style: {
          padding: '100rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productDetailPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.ScrollView, {
      scrollY: true,
      style: {
        height: 'calc(100vh - 120rpx)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].bannerWrap,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].shareBtn,
          onClick: handleShare,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].shareIcon,
            children: "\u2197"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productBanner,
          children: [product.images && product.images.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Swiper, {
            autoplay: product.images.length > 1,
            interval: 3000,
            circular: product.images.length > 1,
            onChange: onBannerChange,
            children: product.images.map(function (image, index) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.SwiperItem, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
                  src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.getImageUrl)(image),
                  mode: "aspectFill"
                }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.lazyImgProps)()))
              }, index);
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, {
            src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.getImageUrl)(''),
            mode: "aspectFill",
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productBannerFallback
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].bannerIndicator,
            children: [currentImage + 1, "/", product.images.length || 1]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].priceSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].priceRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].currentPrice,
            children: (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.price) || product.price
          }), product.originalPrice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].originalPrice,
            children: product.originalPrice
          }), isSeckill && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillBadge,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillBadgeText,
              children: "\u9650\u65F6\u79D2\u6740"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillBadgeTime,
              children: seckillCountdown
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].salesRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].salesValue,
            children: product.sales > 10000 ? "".concat((product.sales / 10000).toFixed(1), "\u4E07") : product.sales
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].salesLabel,
            children: "\u5DF2\u552E"
          })]
        }), product.tags && product.tags.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].activityTags,
          children: product.tags.map(function (tag) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].tag,
              children: tag
            }, tag);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].infoSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productName,
          children: product.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productTags,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].tag,
            children: product.brandName
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].tag,
            children: product.categoryName
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].sectionTitle,
            children: "\u95E8\u5E97\u81EA\u63D0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].switchStoreBtn,
            onClick: handleSwitchStore,
            children: "\u5207\u6362\u95E8\u5E97 >"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeInfo,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeAvatar,
            children: "\uD83C\uDFEA"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeDetails,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeName,
              children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.name) || '深圳南山科技园店'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeAddress,
              children: (currentStore === null || currentStore === void 0 ? void 0 : currentStore.address) || '广东省深圳市南山区科技园南区A2栋1楼'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeHours,
              children: ["\u8425\u4E1A\u65F6\u95F4: ", (currentStore === null || currentStore === void 0 ? void 0 : currentStore.hours) || '09:00-22:00']
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].storeAction,
            onClick: callStore,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].phoneIcon,
              children: "\uD83D\uDCDE"
            }), "\u62E8\u6253\u7535\u8BDD"]
          })]
        })]
      }), evaluations.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].sectionHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].sectionTitle,
            children: "\u5546\u54C1\u8BC4\u4EF7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].viewAll,
            onClick: goToEvaluations,
            children: "\u67E5\u770B\u5168\u90E8"
          })]
        }), aiSummary && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiSummarySection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiSummaryHeader,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiIcon,
              children: "\uD83E\uDD16"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiSummaryTitle,
              children: "AI\u8BC4\u4EF7\u603B\u7ED3"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiScore,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].scoreValue,
                children: [Math.round((aiSummary.averageRating || 0) * 20), "%"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].scoreLabel,
                children: "\u7EFC\u5408\u8BC4\u5206"
              })]
            })]
          }), aiSummary.overall && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiOverall,
            children: aiSummary.overall
          }), aiSummary.strengths && aiSummary.strengths.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiStrengths,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiLabel,
              children: "\uD83D\uDC4D \u597D\u8BC4\u4EAE\u70B9"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiTags,
              children: aiSummary.strengths.map(function (tag, idx) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiTag,
                  children: tag
                }, idx);
              })
            })]
          }), aiSummary.weaknesses && aiSummary.weaknesses.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiWeaknesses,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiLabel,
              children: "\uD83D\uDC4E \u5F85\u6539\u8FDB"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiTags,
              children: aiSummary.weaknesses.map(function (tag, idx) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].aiTag, " ").concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].weakTag),
                  children: tag
                }, idx);
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].evaluateList,
          children: evaluations.map(function (evaluation) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(EvaluationItem, {
              evaluation: evaluation,
              onLike: handleEvaluationLike,
              onComment: openCommentModal
            }, evaluation.id);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].detailSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].sectionTitle,
          children: "\u5546\u54C1\u8BE6\u60C5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].detailContent,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            children: product.description
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        style: {
          height: '40rpx'
        }
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionIcons,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionItem,
          onClick: goHome,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].icon,
            children: "\uD83C\uDFE0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            children: "\u9996\u9875"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionItem,
          onClick: goToCustomerService,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].icon,
            children: "\uD83D\uDCAC"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            children: "\u5BA2\u670D"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionItem,
          onClick: goToCart,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].icon,
            children: "\uD83D\uDED2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            children: "\u8D2D\u7269\u8F66"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].actionButtons,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].addCartBtn,
          onClick: function onClick() {
            return openSkuModal('cart');
          },
          children: "\u52A0\u5165\u8D2D\u7269\u8F66"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].buyNowBtn, " ").concat(purchasing ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].disabled : ''),
          onClick: function onClick() {
            return !purchasing && openSkuModal('buy');
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].buyBtnText,
            children: purchasing ? '抢购中...' : isSeckill ? '立即抢购' : '立即购买'
          }), isSeckill && seckillCountdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].btnCountdown,
            children: seckillCountdown
          })]
        })]
      })]
    }), showSkuModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].skuModal,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].modalMask,
        onClick: function onClick() {
          return setShowSkuModal(false);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].modalContent,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].modalHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
            src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.getImageUrl)((selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.image) || product.images[0]),
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].selectedImage,
            mode: "aspectFill"
          }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].selectedInfo,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].selectedPrice,
              children: (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.price) || product.price
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].selectedStock,
              children: ["\u5E93\u5B58: ", (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.stock) || 0, " \u4EF6"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].selectedName,
              children: (selectedSku === null || selectedSku === void 0 ? void 0 : selectedSku.name) || '请选择规格'
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].closeBtn,
            onClick: function onClick() {
              return setShowSkuModal(false);
            },
            children: "\xD7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].modalBody,
          children: [product.skus[0] && product.skus[0].specs && Object.keys(product.skus[0].specs).map(function (specName) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(SkuOptionGroup, {
              specName: specName,
              product: product,
              specSelections: specSelections,
              availableValues: getAvailableSpecValues(specName),
              onSelect: selectSpec
            }, specName);
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].quantityRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].quantityLabel,
              children: "\u8D2D\u4E70\u6570\u91CF"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].quantityControl,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
                className: "".concat(_styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].quantityBtn, " ").concat(quantity <= 1 ? _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].disabled : ''),
                onClick: decreaseQuantity,
                children: "-"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].quantityNum,
                children: quantity
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].quantityBtn,
                onClick: increaseQuantity,
                children: "+"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].modalFooter,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].confirmBtn,
            onClick: skuModalType === 'cart' ? handleAddToCart : handleBuyNow,
            children: ["\u786E\u5B9A", skuModalType === 'cart' ? '加入购物车' : '立即购买']
          })
        })]
      })]
    }), showCommentModal && currentEvaluation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentModal,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].modalMask,
        onClick: closeCommentModal
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentModalContent,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentModalHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentModalTitle,
            children: "\u5168\u90E8\u8BA8\u8BBA"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentModalClose,
            onClick: closeCommentModal,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              children: "\xD7"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.ScrollView, {
          scrollY: true,
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentModalBody,
          children: !currentEvaluation.comments || currentEvaluation.comments.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].emptyComment,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              children: "\u6682\u65E0\u8BC4\u8BBA\uFF0C\u5FEB\u6765\u53D1\u8868\u7B2C\u4E00\u6761\u8BC4\u8BBA\u5427~"
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentList,
            children: currentEvaluation.comments.map(function (comment) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
                className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentItem,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
                  src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.getImageUrl)(comment.userAvatar),
                  className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentAvatar,
                  mode: "aspectFill"
                }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_7__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
                  className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentContent,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
                    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentHeader,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentUserName,
                      children: comment.userName
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                      className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentTime,
                      children: comment.createdAt || comment.createTime
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                    className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentText,
                    children: comment.content
                  })]
                })]
              }, comment.id);
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentModalFooter,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Input, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentInput,
            placeholder: "\u8BF4\u8BF4\u4F60\u7684\u60F3\u6CD5~",
            value: commentInput,
            onInput: function onInput(e) {
              return setCommentInput(e.detail.value);
            },
            onConfirm: sendComment
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_detail_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].commentSendBtn,
            onClick: sendComment,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
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
/* harmony default export */ __webpack_exports__["default"] = ({"productDetailPage":"detail-module__productDetailPage___JE7Vw","bannerWrap":"detail-module__bannerWrap___APuBB","shareBtn":"detail-module__shareBtn___Y0bcl","shareIcon":"detail-module__shareIcon___s3BFn","productBanner":"detail-module__productBanner___hNVW7","productBannerFallback":"detail-module__productBannerFallback___XJhvi","bannerIndicator":"detail-module__bannerIndicator___Ei2vt","priceSection":"detail-module__priceSection___Be4KP","priceRow":"detail-module__priceRow___xvrqd","seckillBadge":"detail-module__seckillBadge___Xkv9C","seckillBadgeText":"detail-module__seckillBadgeText___Iy7j0","seckillBadgeTime":"detail-module__seckillBadgeTime___NAxbE","currentPrice":"detail-module__currentPrice___tAvrm","originalPrice":"detail-module__originalPrice___ztI4F","discount":"detail-module__discount___Desjh","seckillCountdown":"detail-module__seckillCountdown___H9iwb","countdownLabel":"detail-module__countdownLabel___NYlhh","countdownValue":"detail-module__countdownValue___TkGKR","salesRow":"detail-module__salesRow___EDnH4","salesValue":"detail-module__salesValue___JY3eY","salesLabel":"detail-module__salesLabel___WJsCo","activityTags":"detail-module__activityTags___PCl43","tag":"detail-module__tag___pvR5t","couponTags":"detail-module__couponTags___R8Pjk","couponTag":"detail-module__couponTag___JeYe7","couponTagValue":"detail-module__couponTagValue___rRNjo","couponTagDesc":"detail-module__couponTagDesc___sxdU5","couponTagBtn":"detail-module__couponTagBtn___n4Sj6","infoSection":"detail-module__infoSection___PQ1vb","productName":"detail-module__productName___Bqs4W","productTags":"detail-module__productTags___gUFNg","baseInfo":"detail-module__baseInfo___CkQ8V","infoItem":"detail-module__infoItem___UWk9M","infoValue":"detail-module__infoValue___BDvRH","infoLabel":"detail-module__infoLabel___sodaS","promotionSection":"detail-module__promotionSection___tJ5fp","sectionTitle":"detail-module__sectionTitle___XIEQf","promotionItem":"detail-module__promotionItem____zEyT","promotionTag":"detail-module__promotionTag___nwwfP","promotionText":"detail-module__promotionText___hHxFn","skuSection":"detail-module__skuSection___GW7ap","selectedSku":"detail-module__selectedSku___uUoZO","skuImage":"detail-module__skuImage___DCwvF","skuInfo":"detail-module__skuInfo___AUToH","skuPrice":"detail-module__skuPrice___GHtPx","skuStock":"detail-module__skuStock___L6XZ9","skuName":"detail-module__skuName___pn0Sh","selectBtn":"detail-module__selectBtn___LPrRQ","skuOptions":"detail-module__skuOptions___Nln4x","skuOptionGroup":"detail-module__skuOptionGroup___qJD_x","optionLabel":"detail-module__optionLabel___JgYyq","optionValues":"detail-module__optionValues___cdoeZ","optionValue":"detail-module__optionValue___jJJir","active":"detail-module__active___Tcmk5","disabled":"detail-module__disabled___My2Th","aiSummarySection":"detail-module__aiSummarySection___h4YJ1","aiSummaryHeader":"detail-module__aiSummaryHeader___Y1ZvU","aiIcon":"detail-module__aiIcon___sTvqn","aiSummaryTitle":"detail-module__aiSummaryTitle___RmTP1","aiScore":"detail-module__aiScore____PBTZ","scoreValue":"detail-module__scoreValue___ZmW65","scoreLabel":"detail-module__scoreLabel___A8qoz","aiOverall":"detail-module__aiOverall___esGgu","aiStrengths":"detail-module__aiStrengths___EUs3u","aiWeaknesses":"detail-module__aiWeaknesses___Na0Ec","aiLabel":"detail-module__aiLabel___EsU5V","aiTags":"detail-module__aiTags___kZDGD","aiTag":"detail-module__aiTag___OEMsx","weakTag":"detail-module__weakTag___AMI6B","evaluateSection":"detail-module__evaluateSection___ZILhm","sectionHeader":"detail-module__sectionHeader___ELsy4","viewAll":"detail-module__viewAll___eVj4c","evaluateStats":"detail-module__evaluateStats___sSJCQ","score":"detail-module__score___olUNm","evaluateTags":"detail-module__evaluateTags___miZPi","evaluateList":"detail-module__evaluateList___fYRCR","evaluateItem":"detail-module__evaluateItem___B8oxy","evaluateHeader":"detail-module__evaluateHeader___yF8Hy","userAvatar":"detail-module__userAvatar___oEpcl","userInfo":"detail-module__userInfo___ukEmj","userName":"detail-module__userName___EeGbN","evaluateTime":"detail-module__evaluateTime___O9InG","rating":"detail-module__rating___JE1YE","evaluateContent":"detail-module__evaluateContent___Ubxy8","evaluateImages":"detail-module__evaluateImages___nRU7i","evaluateActions":"detail-module__evaluateActions___Vdr0j","actionItem":"detail-module__actionItem___GnVMK","liked":"detail-module__liked___KNu_R","actionIcon":"detail-module__actionIcon___WZ5GA","actionText":"detail-module__actionText___p7Ek6","commentModal":"detail-module__commentModal___8c8D3","modalMask":"detail-module__modalMask___Iezj8","commentModalContent":"detail-module__commentModalContent___PXjvt","commentModalHeader":"detail-module__commentModalHeader___PehIP","commentModalTitle":"detail-module__commentModalTitle___W0UEH","commentModalClose":"detail-module__commentModalClose___g_jiN","commentModalBody":"detail-module__commentModalBody___lwIW3","emptyComment":"detail-module__emptyComment___RMMg3","commentList":"detail-module__commentList___J2Agm","commentItem":"detail-module__commentItem___RFANE","commentAvatar":"detail-module__commentAvatar___C5H9r","commentContent":"detail-module__commentContent___BF34s","commentHeader":"detail-module__commentHeader___ciGUG","commentUserName":"detail-module__commentUserName___q5zER","commentTime":"detail-module__commentTime___UWap0","commentText":"detail-module__commentText___UjETJ","commentLike":"detail-module__commentLike___N3H5q","commentLikeCount":"detail-module__commentLikeCount___jvfwG","commentModalFooter":"detail-module__commentModalFooter___Ko2SM","commentInput":"detail-module__commentInput____amTj","commentSendBtn":"detail-module__commentSendBtn___x6X_4","detailSection":"detail-module__detailSection___ViyAI","detailContent":"detail-module__detailContent___XzYrq","storeSection":"detail-module__storeSection___SGP5F","storeHeader":"detail-module__storeHeader___hDqhU","switchStoreBtn":"detail-module__switchStoreBtn___Ntg9S","storeInfo":"detail-module__storeInfo___zp9Ah","storeAvatar":"detail-module__storeAvatar___A25x5","storeDetails":"detail-module__storeDetails___ZW0Av","storeName":"detail-module__storeName___c71J4","storeAddress":"detail-module__storeAddress___cqMUY","storeHours":"detail-module__storeHours___L2pXr","storeAction":"detail-module__storeAction___acibm","phoneIcon":"detail-module__phoneIcon___ZjX22","bottomBar":"detail-module__bottomBar___sf9nD","actionIcons":"detail-module__actionIcons___qk2ZK","icon":"detail-module__icon___zEFp1","actionButtons":"detail-module__actionButtons___l5Noj","addCartBtn":"detail-module__addCartBtn___bNq9w","buyNowBtn":"detail-module__buyNowBtn____mEjm","buyBtnText":"detail-module__buyBtnText___fxjct","btnCountdown":"detail-module__btnCountdown___GUQ8w","skuModal":"detail-module__skuModal___EeV1v","modalContent":"detail-module__modalContent___Mwt32","modalHeader":"detail-module__modalHeader___BjBzo","selectedImage":"detail-module__selectedImage___NG19G","selectedInfo":"detail-module__selectedInfo___c5awI","selectedPrice":"detail-module__selectedPrice___StJe4","selectedStock":"detail-module__selectedStock___syp8V","selectedName":"detail-module__selectedName___tiPfT","closeBtn":"detail-module__closeBtn___BoAm0","modalBody":"detail-module__modalBody___fzeHv","optionGroup":"detail-module__optionGroup___Rcw2H","quantityRow":"detail-module__quantityRow____EsXu","quantityLabel":"detail-module__quantityLabel___dWodf","quantityControl":"detail-module__quantityControl___GFvJ3","quantityBtn":"detail-module__quantityBtn___nVTHw","quantityNum":"detail-module__quantityNum___LohOs","modalFooter":"detail-module__modalFooter___NAM7d","confirmBtn":"detail-module__confirmBtn___JxvgD"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/detail/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map