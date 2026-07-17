"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/seckill/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/seckill/index!./src/pages/home/seckill/index.tsx":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/seckill/index!./src/pages/home/seckill/index.tsx ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_common_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/common/home */ "./src/data/common/home.ts");
/* harmony import */ var _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/home/seckill.module.scss */ "./src/styles/home/seckill.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







var SeckillPage = function SeckillPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      hours: 0,
      minutes: 0,
      seconds: 0
    }),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    setTimeLeft = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('推荐'),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    activeCategory = _useState4[0],
    setActiveCategory = _useState4[1];
  var categories = ['推荐', '品质家电', '数码', '酒水', '学生专享', '电脑办公'];
  var getBeijingTime = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var now = new Date();
    var utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 8 * 60 * 60 * 1000);
  }, []);
  var updateCountdown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var now = getBeijingTime().getTime();
    var endTime = new Date('2026-07-31 23:59:59').getTime();
    var diff = endTime - now;
    if (diff <= 0) {
      setTimeLeft({
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      return;
    }
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(diff % (1000 * 60) / 1000);
    setTimeLeft({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }, [getBeijingTime]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    updateCountdown();
    var timer = setInterval(updateCountdown, 1000);
    return function () {
      return clearInterval(timer);
    };
  }, [updateCountdown]);
  var goToProductDetail = function goToProductDetail(productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId, "&seckill=1")
    });
  };
  var filteredProducts = activeCategory === '推荐' ? _data_common_home__WEBPACK_IMPORTED_MODULE_2__.seckillProducts : _data_common_home__WEBPACK_IMPORTED_MODULE_2__.seckillProducts.filter(function (p) {
    return p.category === activeCategory;
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].seckillPage,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].scrollView,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerBanner,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bannerLeft,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bannerTitle,
            children: "\u9650\u65F6\u79D2\u6740"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bannerSubtitle,
            children: "\u5168\u573A\u7279\u60E0 \u9650\u65F6\u62A2\u8D2D"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].categoryBar,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
          scrollX: true,
          className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].categoryScroll,
          showScrollbar: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].categoryList,
            children: categories.map(function (category) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: "".concat(_styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].categoryItem, " ").concat(activeCategory === category ? _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].activeCategory : ''),
                onClick: function onClick() {
                  return setActiveCategory(category);
                },
                children: category
              }, category);
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productList,
        children: filteredProducts.map(function (product) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productCard,
            onClick: function onClick() {
              return goToProductDetail(product.productId);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
              src: product.image,
              className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productImage,
              mode: "aspectFill"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productName,
                children: product.productName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productTags,
                children: product.tags.map(function (tag, idx) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productTag,
                    children: tag
                  }, idx);
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceRow,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].seckillPrice,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceSymbol,
                    children: "\xA5"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceNum,
                    children: product.seckillPrice
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].originalPrice,
                  children: ["\xA5", product.originalPrice]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].progressArea,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].progressBar,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].progressFill,
                    style: {
                      width: "".concat(product.soldPercent, "%")
                    }
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].progressText,
                  children: ["\u5DF2\u62A2", product.soldPercent, "%"]
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].seckillBtn,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                children: "\u62A2"
              })
            })]
          }, product.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bottomSpace
      })]
    })
  });
};
/* harmony default export */ __webpack_exports__["default"] = (SeckillPage);

/***/ }),

/***/ "./src/pages/home/seckill/index.tsx":
/*!******************************************!*\
  !*** ./src/pages/home/seckill/index.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_seckill_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/seckill/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/seckill/index!./src/pages/home/seckill/index.tsx");


var config = {"navigationBarTitleText":"限时秒杀","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_seckill_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/seckill/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_seckill_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_seckill_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_seckill_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_seckill_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/seckill.module.scss":
/*!*********************************************!*\
  !*** ./src/styles/home/seckill.module.scss ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"seckillPage":"seckill-module__seckillPage___NLkkN","scrollView":"seckill-module__scrollView___PI5EJ","headerBanner":"seckill-module__headerBanner___zM9Ew","bannerLeft":"seckill-module__bannerLeft___e7ruZ","bannerTitle":"seckill-module__bannerTitle___kJXxS","bannerSubtitle":"seckill-module__bannerSubtitle___kT0lD","bannerRight":"seckill-module__bannerRight___WTGdr","countdownLabel":"seckill-module__countdownLabel___IUuKY","countdown":"seckill-module__countdown___eRKUS","countdownItem":"seckill-module__countdownItem___pEiZX","countdownSeparator":"seckill-module__countdownSeparator___T1Qzb","categoryBar":"seckill-module__categoryBar___VKu8S","categoryScroll":"seckill-module__categoryScroll___j_LgN","categoryList":"seckill-module__categoryList___WMk2R","categoryItem":"seckill-module__categoryItem___ckv3e","activeCategory":"seckill-module__activeCategory___a1Gnz","productList":"seckill-module__productList___cK0kl","productCard":"seckill-module__productCard___sNwC7","productImage":"seckill-module__productImage___YlOv0","productInfo":"seckill-module__productInfo___sAGLV","productName":"seckill-module__productName___z_1Kq","productTags":"seckill-module__productTags___r4HFH","productTag":"seckill-module__productTag___RimJy","priceRow":"seckill-module__priceRow___hA0v0","seckillPrice":"seckill-module__seckillPrice___qrudU","priceSymbol":"seckill-module__priceSymbol___ZEc15","priceNum":"seckill-module__priceNum___gT_2l","originalPrice":"seckill-module__originalPrice___Sy71y","progressArea":"seckill-module__progressArea___AcCMM","progressBar":"seckill-module__progressBar___ZJrdn","progressFill":"seckill-module__progressFill___qkoxv","progressText":"seckill-module__progressText___nkei_","seckillBtn":"seckill-module__seckillBtn___Lfz2z","bottomSpace":"seckill-module__bottomSpace____4gZb"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/seckill/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map