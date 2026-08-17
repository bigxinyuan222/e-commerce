"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/seckill/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/seckill/index!./src/pages/home/seckill/index.tsx":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/seckill/index!./src/pages/home/seckill/index.tsx ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_seckill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/seckill */ "./src/api/seckill/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/home/seckill.module.scss */ "./src/styles/home/seckill.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");












// 兜底：当接口未返回数据时，返回空活动框架
function buildFallbackActivities() {
  var now = new Date();
  var endTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  var fmt = function fmt(d) {
    return d.toISOString().replace('T', ' ').slice(0, 19);
  };
  return [{
    id: 'seckill-fallback',
    name: '限时秒杀',
    startTime: fmt(now),
    endTime: fmt(endTime),
    status: 'active',
    products: []
  }];
}
var SeckillPage = function SeckillPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    activities = _useState2[0],
    setActivities = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    activeActivityIndex = _useState4[0],
    setActiveActivityIndex = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState5, 2),
    timeLeft = _useState6[0],
    setTimeLeft = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var timerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // 加载指定活动的商品
  var loadActivityProducts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee(activityId) {
      var res, products, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return (0,_api_seckill__WEBPACK_IMPORTED_MODULE_2__.fetchProductSeckillActivity)({
              activityId: activityId
            });
          case 1:
            res = _context.v;
            if (res !== null && res !== void 0 && res.data && Array.isArray(res.data) && res.data.length > 0) {
              products = res.data;
              setActivities(function (prev) {
                var next = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(prev);
                var idx = next.findIndex(function (a) {
                  return String(a.id) === String(activityId);
                });
                if (idx >= 0) {
                  next[idx] = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, next[idx]), {}, {
                    products: products
                  });
                }
                return next;
              });
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Failed to load activity products:', _t);
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), []);

  // 加载秒杀活动列表
  var loadActivities = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee2() {
    var res, list, _t2;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          setLoading(true);
          _context2.p = 1;
          _context2.n = 2;
          return (0,_api_seckill__WEBPACK_IMPORTED_MODULE_2__.fetchSeckillActivities)({
            status: 'active'
          });
        case 2:
          res = _context2.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : [];
          if (list.length > 0) {
            setActivities(list);
            // 为所有活动并行加载商品数据
            list.forEach(function (activity) {
              if (activity.id) {
                loadActivityProducts(String(activity.id));
              }
            });
          } else {
            // 接口返回空，使用兜底数据
            setActivities(buildFallbackActivities());
          }
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          console.error('Failed to load seckill activities:', _t2);
          // 接口异常，使用兜底数据，保证页面可用
          setActivities(buildFallbackActivities());
        case 4:
          _context2.p = 4;
          setLoading(false);
          return _context2.f(4);
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3, 4, 5]]);
  })), [loadActivityProducts]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadActivities();
  }, [loadActivities]);

  // 当前活动
  var currentActivity = activities[activeActivityIndex] || activities[0];

  // 健壮解析各种时间格式（ISO 8601、YYYY-MM-DD HH:mm:ss、时间戳等）
  var parseTime = function parseTime(timeStr) {
    if (timeStr === undefined || timeStr === null || timeStr === '') return NaN;
    if (typeof timeStr === 'number') return timeStr;
    var t = new Date(timeStr).getTime();
    if (!isNaN(t)) return t;
    var str = String(timeStr);
    t = new Date(str.replace(/-/g, '/')).getTime();
    if (!isNaN(t)) return t;
    t = new Date(str.replace(/\//g, '-')).getTime();
    if (!isNaN(t)) return t;
    // 尝试解析纯数字时间戳（秒级转毫秒级）
    var numeric = Number(str);
    if (!isNaN(numeric) && str.trim() !== '') {
      return numeric < 1e12 ? numeric * 1000 : numeric;
    }
    return t;
  };

  // 倒计时：基于当前活动 endTime
  var updateCountdown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!(currentActivity !== null && currentActivity !== void 0 && currentActivity.endTime)) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      return;
    }
    var now = new Date().getTime();
    var endTime = parseTime(currentActivity.endTime);
    var diff = endTime - now;
    if (diff <= 0) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(diff % (1000 * 60) / 1000);
    setTimeLeft({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }, [currentActivity]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!currentActivity) return;
    updateCountdown();
    timerRef.current = setInterval(updateCountdown, 1000);
    return function () {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [updateCountdown, currentActivity]);

  // 页面隐藏时立即清除定时器，避免微信框架内部页面帧已销毁导致 __subPageFrameEndTime__ 报错
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidHide)(function () {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  });
  var goToProductDetail = function goToProductDetail(product) {
    var productId = product.productId || product.id;
    var activityId = (currentActivity === null || currentActivity === void 0 ? void 0 : currentActivity.id) || '';
    // 把列表页已确认的秒杀价、原价、结束时间传给详情页，避免详情页再请求时价格不一致
    var queryParts = ["id=".concat(encodeURIComponent(String(productId))), 'seckill=1', "activityId=".concat(encodeURIComponent(String(activityId)))];
    if (product.seckillPrice !== undefined && product.seckillPrice !== null) {
      queryParts.push("seckillPrice=".concat(encodeURIComponent(String(product.seckillPrice))));
    }
    if (product.originalPrice !== undefined && product.originalPrice !== null) {
      queryParts.push("originalPrice=".concat(encodeURIComponent(String(product.originalPrice))));
    }
    if (product.seckillSkuPriceId !== undefined && product.seckillSkuPriceId !== null && product.seckillSkuPriceId !== '') {
      queryParts.push("seckillSkuPriceId=".concat(encodeURIComponent(String(product.seckillSkuPriceId))));
    }
    if (currentActivity !== null && currentActivity !== void 0 && currentActivity.endTime) {
      queryParts.push("activityEndTime=".concat(encodeURIComponent(String(currentActivity.endTime))));
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?".concat(queryParts.join('&'))
    });
  };

  // 倒计时展示文本
  var countdownText = function () {
    var days = timeLeft.days,
      hours = timeLeft.hours,
      minutes = timeLeft.minutes,
      seconds = timeLeft.seconds;
    if (days > 0) {
      return "\u8DDD\u7ED3\u675F ".concat(days, "\u5929 ").concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
    }
    return "\u8DDD\u7ED3\u675F ".concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
  }();
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].seckillPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        style: {
          padding: '100rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].seckillPage,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.ScrollView, {
      scrollY: true,
      className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].scrollView,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].headerBanner,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].bannerLeft,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].bannerTitle,
            children: "\u9650\u65F6\u79D2\u6740"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].bannerSubtitle,
            children: (currentActivity === null || currentActivity === void 0 ? void 0 : currentActivity.name) || '全场特惠 限时抢购'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].bannerSubtitle,
            children: countdownText
          })]
        })
      }), activities.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].categoryBar,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.ScrollView, {
          scrollX: true,
          className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].categoryScroll,
          showScrollbar: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].categoryList,
            children: activities.map(function (activity, idx) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                className: "".concat(_styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].categoryItem, " ").concat(activeActivityIndex === idx ? _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].activeCategory : ''),
                onClick: function onClick() {
                  return setActiveActivityIndex(idx);
                },
                children: activity.name
              }, activity.id || idx);
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productList,
        children: ((currentActivity === null || currentActivity === void 0 ? void 0 : currentActivity.products) || []).map(function (product, idx) {
          var _product$soldPercent;
          var soldPercent = (_product$soldPercent = product.soldPercent) !== null && _product$soldPercent !== void 0 ? _product$soldPercent : 0;
          var productId = product.productId || product.id;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productCard,
            onClick: function onClick() {
              return goToProductDetail(product);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({
              src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(product.image),
              className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productImage,
              mode: "aspectFill"
            }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productName,
                children: product.productName || product.name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productTags,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productTag,
                  children: "\u9650\u65F6\u79D2\u6740"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].priceRow,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].seckillPrice,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].priceSymbol,
                    children: "\xA5"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].priceNum,
                    children: product.seckillPrice
                  })]
                }), product.originalPrice > 0 && product.originalPrice !== product.seckillPrice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].originalPrice,
                  children: ["\xA5", product.originalPrice]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].progressArea,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].progressBar,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                    className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].progressFill,
                    style: {
                      width: "".concat(soldPercent, "%")
                    }
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].progressText,
                  children: ["\u5DF2\u62A2", soldPercent, "%"]
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].seckillBtn,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                children: "\u62A2"
              })
            })]
          }, product.id || productId || idx);
        })
      }), (!(currentActivity !== null && currentActivity !== void 0 && currentActivity.products) || currentActivity.products.length === 0) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        style: {
          padding: '80rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          children: "\u6682\u65E0\u79D2\u6740\u5546\u54C1"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_seckill_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].bottomSpace
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