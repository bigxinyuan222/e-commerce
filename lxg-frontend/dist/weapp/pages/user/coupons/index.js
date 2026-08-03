"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/coupons/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/coupons/index!./src/pages/user/coupons/index.tsx":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/coupons/index!./src/pages/user/coupons/index.tsx ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/user */ "./src/api/user/index.ts");
/* harmony import */ var _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/user/coupons.module.scss */ "./src/styles/user/coupons.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");









var MyCouponsPage = function MyCouponsPage() {
  var _Taro$getCurrentInsta;
  var _ref = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance().router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {},
    modeParam = _ref.mode,
    selectable = _ref.selectable;
  var initialMode = modeParam === 'available' ? 'available' : 'mine';
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialMode),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    mode = _useState2[0],
    setMode = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('available'),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    currentTab = _useState4[0],
    setCurrentTab = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState5, 2),
    coupons = _useState6[0],
    setCoupons = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState7, 2),
    availableCoupons = _useState8[0],
    setAvailableCoupons = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState1, 2),
    claimingId = _useState10[0],
    setClaimingId = _useState10[1];

  // 加载我的优惠券列表
  var loadMyCoupons = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee() {
    var res, list, _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          setLoading(true);
          _context.p = 1;
          _context.n = 2;
          return (0,_api_user__WEBPACK_IMPORTED_MODULE_2__.fetchMyCoupons)();
        case 2:
          res = _context.v;
          list = (res === null || res === void 0 ? void 0 : res.data) || [];
          setCoupons(list);
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error('加载我的优惠券失败:', _t);
          setCoupons([]);
        case 4:
          _context.p = 4;
          setLoading(false);
          return _context.f(4);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3, 4, 5]]);
  })), []);

  // 加载可领取优惠券列表
  var loadAvailableCoupons = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee2() {
    var res, list, _t2;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          setLoading(true);
          _context2.p = 1;
          _context2.n = 2;
          return (0,_api_user__WEBPACK_IMPORTED_MODULE_2__.fetchAvailableCoupons)();
        case 2:
          res = _context2.v;
          list = (res === null || res === void 0 ? void 0 : res.data) || [];
          setAvailableCoupons(list);
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          console.error('加载可领取优惠券失败:', _t2);
          setAvailableCoupons([]);
        case 4:
          _context2.p = 4;
          setLoading(false);
          return _context2.f(4);
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3, 4, 5]]);
  })), []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (mode === 'mine') {
      loadMyCoupons();
    } else {
      loadAvailableCoupons();
    }
  }, [mode, loadMyCoupons, loadAvailableCoupons]);

  // 领取优惠券
  var handleClaim = /*#__PURE__*/function () {
    var _ref4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().m(function _callee3(coupon) {
      var _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!(!coupon.id || claimingId)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            setClaimingId(coupon.id);
            _context3.p = 2;
            _context3.n = 3;
            return (0,_api_user__WEBPACK_IMPORTED_MODULE_2__.claimCoupon)(coupon.id);
          case 3:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '领取成功',
              icon: 'success'
            });
            // 领取后刷新可领取列表
            _context3.n = 4;
            return loadAvailableCoupons();
          case 4:
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: (_t3 === null || _t3 === void 0 ? void 0 : _t3.message) || '领取失败',
              icon: 'none'
            });
          case 6:
            _context3.p = 6;
            setClaimingId(null);
            return _context3.f(6);
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 5, 6, 7]]);
    }));
    return function handleClaim(_x) {
      return _ref4.apply(this, arguments);
    };
  }();
  var availableList = coupons.filter(function (c) {
    return c.status === 'available';
  });
  var usedList = coupons.filter(function (c) {
    return c.status === 'used';
  });
  var expiredList = coupons.filter(function (c) {
    return c.status === 'expired';
  });
  var currentList = currentTab === 'available' ? availableList : currentTab === 'used' ? usedList : expiredList;
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
    if (!dateStr) return '';
    return dateStr.length > 10 ? dateStr.substring(0, 10) : dateStr;
  };
  var handleUseCoupon = function handleUseCoupon(coupon) {
    if (coupon.scope === 'product' && coupon.productId) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/home/detail/index?id=".concat(coupon.productId)
      });
    } else if (coupon.scope === 'category' && coupon.categoryId) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/home/search-results/index?keyword=".concat(encodeURIComponent(coupon.scopeText))
      });
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: '/pages/home/index'
      });
    }
  };
  var switchMode = function switchMode(m) {
    if (m === mode) return;
    setMode(m);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].myCouponsPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].modeTabs,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].modeTab, " ").concat(mode === 'mine' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].modeActive : ''),
        onClick: function onClick() {
          return switchMode('mine');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          children: "\u6211\u7684\u4F18\u60E0\u5238"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].modeTab, " ").concat(mode === 'available' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].modeActive : ''),
        onClick: function onClick() {
          return switchMode('available');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          children: "\u9886\u5238\u4E2D\u5FC3"
        })
      })]
    }), mode === 'mine' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabs,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab, " ").concat(currentTab === 'available' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
          onClick: function onClick() {
            return setCurrentTab('available');
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            children: ["\u53EF\u7528(", availableList.length, ")"]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab, " ").concat(currentTab === 'used' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
          onClick: function onClick() {
            return setCurrentTab('used');
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            children: ["\u5DF2\u4F7F\u7528(", usedList.length, ")"]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab, " ").concat(currentTab === 'expired' ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
          onClick: function onClick() {
            return setCurrentTab('expired');
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            children: ["\u5DF2\u8FC7\u671F(", expiredList.length, ")"]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
        scrollY: true,
        className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponList,
        children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
            children: "\u52A0\u8F7D\u4E2D..."
          })
        }) : currentList.length > 0 ? currentList.map(function (coupon, idx) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponCard, " ").concat(getStatusColor(coupon.status)),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponContent,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponLeft,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponValue,
                  children: coupon.type === 'cash' ? "\xA5".concat(coupon.value) : "".concat(coupon.value, "\u6298")
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponCondition,
                  children: coupon.minAmount > 0 ? "\u6EE1".concat(coupon.minAmount, "\u53EF\u7528") : '无门槛'
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponRight,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponName,
                  children: coupon.name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponScope,
                  children: coupon.scopeText
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponTime,
                  children: [formatDate(coupon.startTime), " - ", formatDate(coupon.endTime)]
                })]
              }), coupon.status === 'available' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponUseBtn,
                onClick: function onClick() {
                  return handleUseCoupon(coupon);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  children: selectable ? '选择' : '去使用'
                })
              })]
            })
          }, coupon.id || "mine-".concat(idx));
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
            children: "\u6682\u65E0\u4F18\u60E0\u5238"
          })
        })
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
      scrollY: true,
      className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponList,
      children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
          children: "\u52A0\u8F7D\u4E2D..."
        })
      }) : availableCoupons.length > 0 ? availableCoupons.map(function (coupon, idx) {
        var claimed = coupons.some(function (c) {
          return c.id === coupon.id;
        });
        var soldOut = coupon.totalCount > 0 && coupon.remainCount <= 0;
        var disabled = claimed || soldOut || claimingId === coupon.id;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponCard, " ").concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].available),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponContent,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponLeft,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponValue,
                children: coupon.type === 'cash' ? "\xA5".concat(coupon.value) : "".concat(coupon.value, "\u6298")
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponCondition,
                children: coupon.minAmount > 0 ? "\u6EE1".concat(coupon.minAmount, "\u53EF\u7528") : '无门槛'
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponRight,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponName,
                children: coupon.name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponScope,
                children: coupon.scopeText
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponTime,
                children: [formatDate(coupon.startTime), " - ", formatDate(coupon.endTime)]
              }), coupon.totalCount > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponCount,
                children: ["\u5269\u4F59 ", coupon.remainCount, "/", coupon.totalCount]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: "".concat(_styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponUseBtn, " ").concat(disabled ? _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].couponBtnDisabled : ''),
              onClick: function onClick() {
                if (!disabled) handleClaim(coupon);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                children: claimingId === coupon.id ? '领取中' : claimed ? '已领取' : soldOut ? '已抢光' : '立即领取'
              })
            })]
          })
        }, coupon.id || "avail-".concat(idx));
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
          children: "\u6682\u65E0\u53EF\u9886\u53D6\u7684\u4F18\u60E0\u5238"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_coupons_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refreshBtn,
          onClick: loadAvailableCoupons,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            children: "\u70B9\u51FB\u5237\u65B0"
          })
        })]
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
/* harmony default export */ __webpack_exports__["default"] = ({"myCouponsPage":"coupons-module__myCouponsPage___PQdbb","modeTabs":"coupons-module__modeTabs___QguXe","modeTab":"coupons-module__modeTab___X4KbY","modeActive":"coupons-module__modeActive___N4aO5","tabs":"coupons-module__tabs___J8R1b","tab":"coupons-module__tab___BfXX4","active":"coupons-module__active___JPDze","couponList":"coupons-module__couponList___yhG_R","couponCard":"coupons-module__couponCard___Q_n1g","used":"coupons-module__used___GVYzp","expired":"coupons-module__expired___euRAB","couponContent":"coupons-module__couponContent___IPCMh","couponLeft":"coupons-module__couponLeft___zehtU","couponValue":"coupons-module__couponValue___JGLdD","couponCondition":"coupons-module__couponCondition___hpY5X","couponRight":"coupons-module__couponRight___XzB5n","couponName":"coupons-module__couponName___T4DtI","couponScope":"coupons-module__couponScope___ktD7c","couponTime":"coupons-module__couponTime___Zfpzb","couponUseBtn":"coupons-module__couponUseBtn___GHbaL","couponBtnDisabled":"coupons-module__couponBtnDisabled___ueaVG","couponCount":"coupons-module__couponCount___zDMrZ","emptyState":"coupons-module__emptyState___An8Pr","emptyText":"coupons-module__emptyText___cb3PL","refreshBtn":"coupons-module__refreshBtn___nxjE3"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/coupons/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map