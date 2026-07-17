"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/coupons/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/coupons/index!./src/pages/user/coupons/index.tsx":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/coupons/index!./src/pages/user/coupons/index.tsx ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_common_coupons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/common/coupons */ "./src/data/common/coupons.ts");
/* harmony import */ var _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/user/coupons.module.scss */ "./src/styles/user/coupons.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







var MyCouponsPage = function MyCouponsPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('available'),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    currentTab = _useState2[0],
    setCurrentTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_data_common_coupons__WEBPACK_IMPORTED_MODULE_2__.myCoupons),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 1),
    coupons = _useState4[0];
  var availableCoupons = coupons.filter(function (c) {
    return c.status === 'available';
  });
  var usedCoupons = coupons.filter(function (c) {
    return c.status === 'used';
  });
  var expiredCoupons = coupons.filter(function (c) {
    return c.status === 'expired';
  });
  var currentCoupons = currentTab === 'available' ? availableCoupons : currentTab === 'used' ? usedCoupons : expiredCoupons;
  var getStatusColor = function getStatusColor(status) {
    switch (status) {
      case 'available':
        return _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].available;
      case 'used':
        return _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].used;
      case 'expired':
        return _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].expired;
      default:
        return '';
    }
  };
  var formatDate = function formatDate(dateStr) {
    return dateStr;
  };
  var handleUseCoupon = function handleUseCoupon(coupon) {
    if (coupon.scope === 'product' && coupon.productId) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/home/detail/index?id=".concat(coupon.productId)
      });
    } else if (coupon.scope === 'category' && coupon.categoryId) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/home/search-results/index?keyword=".concat(coupon.scopeText)
      });
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: '/pages/home/index'
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].myCouponsPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabs,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab, " ").concat(currentTab === 'available' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
        onClick: function onClick() {
          return setCurrentTab('available');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: ["\u53EF\u7528(", availableCoupons.length, ")"]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab, " ").concat(currentTab === 'used' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
        onClick: function onClick() {
          return setCurrentTab('used');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: ["\u5DF2\u4F7F\u7528(", usedCoupons.length, ")"]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab, " ").concat(currentTab === 'expired' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
        onClick: function onClick() {
          return setCurrentTab('expired');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: ["\u5DF2\u8FC7\u671F(", expiredCoupons.length, ")"]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponList,
      children: currentCoupons.length > 0 ? currentCoupons.map(function (coupon) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponCard, " ").concat(getStatusColor(coupon.status)),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponContent,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponLeft,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponValue,
                children: coupon.type === 'cash' ? "\xA5".concat(coupon.value) : "".concat(coupon.value, "\u6298")
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponCondition,
                children: coupon.minAmount > 0 ? "\u6EE1".concat(coupon.minAmount, "\u53EF\u7528") : '无门槛'
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponRight,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponName,
                children: coupon.name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponScope,
                children: coupon.scopeText
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponTime,
                children: [formatDate(coupon.startTime), " - ", formatDate(coupon.endTime)]
              })]
            }), coupon.status === 'available' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponUseBtn,
              onClick: function onClick() {
                return handleUseCoupon(coupon);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                children: "\u53BB\u4F7F\u7528"
              })
            })]
          })
        }, coupon.id);
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
          children: "\u6682\u65E0\u4F18\u60E0\u5238"
        })
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (MyCouponsPage);

/***/ }),

/***/ "./src/pages/user/coupons/index.tsx":
/*!******************************************!*\
  !*** ./src/pages/user/coupons/index.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_coupons_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/coupons/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/coupons/index!./src/pages/user/coupons/index.tsx");


var config = {"navigationBarTitleText":"我的优惠券","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_coupons_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/user/coupons/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_coupons_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_coupons_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_coupons_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_coupons_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/user/coupons.module.scss":
/*!*********************************************!*\
  !*** ./src/styles/user/coupons.module.scss ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"myCouponsPage":"coupons-module__myCouponsPage___PQdbb","tabs":"coupons-module__tabs___J8R1b","tab":"coupons-module__tab___BfXX4","active":"coupons-module__active___JPDze","couponList":"coupons-module__couponList___yhG_R","couponCard":"coupons-module__couponCard___Q_n1g","used":"coupons-module__used___GVYzp","expired":"coupons-module__expired___euRAB","couponContent":"coupons-module__couponContent___IPCMh","couponLeft":"coupons-module__couponLeft___zehtU","couponValue":"coupons-module__couponValue___JGLdD","couponCondition":"coupons-module__couponCondition___hpY5X","couponRight":"coupons-module__couponRight___XzB5n","couponName":"coupons-module__couponName___T4DtI","couponScope":"coupons-module__couponScope___ktD7c","couponTime":"coupons-module__couponTime___Zfpzb","couponUseBtn":"coupons-module__couponUseBtn___GHbaL","emptyState":"coupons-module__emptyState___An8Pr","emptyText":"coupons-module__emptyText___cb3PL"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/coupons/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map