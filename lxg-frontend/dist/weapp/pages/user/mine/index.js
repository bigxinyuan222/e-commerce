"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/mine/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/mine/index!./src/pages/user/mine/index.tsx":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/mine/index!./src/pages/user/mine/index.tsx ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _data_user_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/user/user */ "./src/data/user/user.ts");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/api/user */ "./src/api/user/index.ts");
/* harmony import */ var _api_user_normalize__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/api/user/normalize */ "./src/api/user/normalize.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/styles/user/mine.module.scss */ "./src/styles/user/mine.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");















// 订单状态项组件

var OrderStatusItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var icon = _ref.icon,
    label = _ref.label,
    onClick = _ref.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].orderStatusItem,
    onClick: onClick,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].statusIcon,
      children: icon
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
      className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].statusLabel,
      children: label
    })]
  });
});

// 功能列表项组件
var FunctionItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var icon = _ref2.icon,
    name = _ref2.name,
    desc = _ref2.desc,
    onClick = _ref2.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].functionItem,
    onClick: onClick,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
      className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].functionIcon,
      children: icon
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].functionInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].functionName,
        children: name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].functionDesc,
        children: desc
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
      className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].functionArrow,
      children: "\u203A"
    })]
  });
});
var MinePage = function MinePage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    userInfo = _useAppContext.userInfo,
    setUserInfo = _useAppContext.setUserInfo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState, 2),
    isLoggedIn = _useState2[0],
    setIsLoggedIn = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState3, 2),
    profile = _useState4[0],
    setProfile = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var checkLogin = function checkLogin() {
      var savedUserInfo = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('userInfo');
      if (savedUserInfo && savedUserInfo.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, [userInfo]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isLoggedIn) {
      setProfile(null);
      return;
    }
    var cancelled = false;
    var loadProfile = /*#__PURE__*/function () {
      var _ref3 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee() {
        var res, normalized, _t;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_4__.apiGet)(_api_user__WEBPACK_IMPORTED_MODULE_5__.userApi.profile);
            case 1:
              res = _context.v;
              if (!cancelled) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              normalized = (0,_api_user_normalize__WEBPACK_IMPORTED_MODULE_13__.normalizeUserProfile)(res);
              setProfile(normalized);
              // 同步到全局状态
              setUserInfo({
                id: normalized.id || userInfo.id,
                nickname: normalized.nickname || userInfo.nickname,
                avatar: normalized.avatar || userInfo.avatar,
                phone: normalized.phone || userInfo.phone,
                accountName: normalized.accountName || userInfo.accountName,
                gender: normalized.gender || userInfo.gender,
                birthday: normalized.birthday || userInfo.birthday,
                registerDate: normalized.registerDate || userInfo.registerDate,
                email: normalized.email || userInfo.email,
                isLoggedIn: true
              });
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error('加载用户信息失败:', _t);
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 3]]);
      }));
      return function loadProfile() {
        return _ref3.apply(this, arguments);
      };
    }();
    loadProfile();
    return function () {
      cancelled = true;
    };
  }, [isLoggedIn]);

  // 使用 useCallback 缓存事件处理函数
  var goToLogin = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/user/login/index'
    });
  }, []);
  var goToProfile = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/user/profile/index'
    });
  }, [isLoggedIn, goToLogin]);
  var goToOrderList = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (status) {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/cart/order/list/index?status=".concat(status || 'all')
    });
  }, [isLoggedIn, goToLogin]);
  var goToMyCoupons = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/user/coupons/index'
    });
  }, [isLoggedIn, goToLogin]);
  var goToStores = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/category/stores/index'
    });
  }, []);
  var goToPersonalInfo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/user/personal-info/index'
    });
  }, [isLoggedIn, goToLogin]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].minePage,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.ScrollView, {
      scrollY: true,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].userInfoSection,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].userInfoCard,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].avatar,
            onClick: goToProfile,
            children: isLoggedIn && (profile !== null && profile !== void 0 && profile.avatar || userInfo.avatar) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_14__["default"])({
              src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.getImageUrl)((profile === null || profile === void 0 ? void 0 : profile.avatar) || userInfo.avatar),
              mode: "aspectFill"
            }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.lazyImgProps)())) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
              className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].avatarPlaceholder,
              children: "\uD83D\uDC64"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
            className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].userDetails,
            children: isLoggedIn ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].nickname,
                children: (profile === null || profile === void 0 ? void 0 : profile.nickname) || userInfo.nickname || _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo.nickname
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].userPhone,
                children: (profile === null || profile === void 0 ? void 0 : profile.phone) || userInfo.phone || _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo.phone
              })]
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].nickname,
                onClick: goToLogin,
                children: "\u70B9\u51FB\u767B\u5F55"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
                className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].userPhone,
                children: "\u767B\u5F55\u540E\u4EAB\u53D7\u66F4\u591A\u6743\u76CA"
              })]
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].orderSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].sectionHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].sectionTitle,
            children: "\u6211\u7684\u8BA2\u5355"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].viewAll,
            onClick: function onClick() {
              return goToOrderList();
            },
            children: "\u67E5\u770B\u5168\u90E8"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].orderStatusList,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(OrderStatusItem, {
            icon: "\uD83D\uDCB0",
            label: "\u5F85\u652F\u4ED8",
            onClick: function onClick() {
              return goToOrderList('pending_payment');
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(OrderStatusItem, {
            icon: "\uD83D\uDE9A",
            label: "\u5F85\u53D1\u8D27",
            onClick: function onClick() {
              return goToOrderList('pending_delivery');
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(OrderStatusItem, {
            icon: "\uD83D\uDCE6",
            label: "\u5F85\u81EA\u63D0",
            onClick: function onClick() {
              return goToOrderList('pending_pickup');
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(OrderStatusItem, {
            icon: "\u2705",
            label: "\u5DF2\u5B8C\u6210",
            onClick: function onClick() {
              return goToOrderList('completed');
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(OrderStatusItem, {
            icon: "\uD83D\uDCB3",
            label: "\u9000\u6B3E/\u552E\u540E",
            onClick: function onClick() {
              return goToOrderList('refunding');
            }
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].functionSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(FunctionItem, {
          icon: "\uD83D\uDCB0",
          name: "\u6211\u7684\u4F18\u60E0\u5238",
          desc: "\u67E5\u770B\u5DF2\u9886\u53D6\u7684\u4F18\u60E0\u5238",
          onClick: goToMyCoupons
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(FunctionItem, {
          icon: "\uD83C\uDFEA",
          name: "\u95E8\u5E97\u81EA\u63D0",
          desc: "\u67E5\u770B\u9644\u8FD1\u95E8\u5E97",
          onClick: goToStores
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(FunctionItem, {
          icon: "\u2699\uFE0F",
          name: "\u8BBE\u7F6E",
          desc: "\u7F16\u8F91\u4E2A\u4EBA\u4FE1\u606F",
          onClick: goToPersonalInfo
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_user_mine_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].bottomSpace
      })]
    })
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(MinePage));

/***/ }),

/***/ "./src/data/user/user.ts":
/*!*******************************!*\
  !*** ./src/data/user/user.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   userInfo: function() { return /* binding */ userInfo; }
/* harmony export */ });
/* unused harmony exports addresses, getDefaultAddress, getAddressById, formatAddress */
// ============================================
// 用户与地址数据
// ============================================

var userInfo = {
  id: 'user-1',
  nickname: '乐享购用户',
  avatar: 'https://picsum.photos/id/64/200/200',
  phone: '138****8888',
  accountName: '乐享购用户',
  registerDate: '2024-01-15',
  gender: '保密',
  birthday: '请填写您的生日',
  email: '',
  isLoggedIn: true
};
var addresses = [{
  id: 'addr-1',
  name: '张三',
  phone: '13812345678',
  province: '广东省',
  city: '深圳市',
  district: '南山区',
  detail: '科技园南区A1栋501室',
  isDefault: true
}, {
  id: 'addr-2',
  name: '李四',
  phone: '13987654321',
  province: '广东省',
  city: '广州市',
  district: '天河区',
  detail: '珠江新城花城大道88号',
  isDefault: false
}, {
  id: 'addr-3',
  name: '王五',
  phone: '13765432109',
  province: '北京市',
  city: '北京市',
  district: '朝阳区',
  detail: '建国路89号国贸中心',
  isDefault: false
}];

// 收货地址相关类型

// 获取默认地址
function getDefaultAddress() {
  return addresses.find(function (addr) {
    return addr.isDefault;
  });
}

// 根据ID获取地址
function getAddressById(id) {
  return addresses.find(function (addr) {
    return addr.id === id;
  });
}

// 格式化地址为字符串
function formatAddress(address) {
  return "".concat(address.province).concat(address.city).concat(address.district).concat(address.detail);
}

/***/ }),

/***/ "./src/pages/user/mine/index.tsx":
/*!***************************************!*\
  !*** ./src/pages/user/mine/index.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/mine/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/mine/index!./src/pages/user/mine/index.tsx");


var config = {"navigationBarTitleText":"我的","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/user/mine/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_mine_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/user/mine.module.scss":
/*!******************************************!*\
  !*** ./src/styles/user/mine.module.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"minePage":"mine-module__minePage___Ujmqz","userInfoSection":"mine-module__userInfoSection___kw1D2","userInfoCard":"mine-module__userInfoCard___U1Dci","avatar":"mine-module__avatar___G90xx","avatarPlaceholder":"mine-module__avatarPlaceholder___W8ml5","userDetails":"mine-module__userDetails___S2Tvy","nickname":"mine-module__nickname___lf3w5","userPhone":"mine-module__userPhone___adJVL","editBtn":"mine-module__editBtn___j1qdz","orderSection":"mine-module__orderSection___dq13L","sectionHeader":"mine-module__sectionHeader___aWtkQ","sectionTitle":"mine-module__sectionTitle___pTryz","viewAll":"mine-module__viewAll___axIL4","orderStatusList":"mine-module__orderStatusList___TWq5i","orderStatusItem":"mine-module__orderStatusItem___tojzj","statusIcon":"mine-module__statusIcon___I0Ai2","badge":"mine-module__badge___PydEf","statusLabel":"mine-module__statusLabel___bV7Ba","functionSection":"mine-module__functionSection___QffFa","functionItem":"mine-module__functionItem___TaGe6","functionIcon":"mine-module__functionIcon___dC1lE","functionInfo":"mine-module__functionInfo___FjN1h","functionName":"mine-module__functionName___OLZz4","functionDesc":"mine-module__functionDesc___i_MYt","functionArrow":"mine-module__functionArrow___RGxf_","bottomSpace":"mine-module__bottomSpace___LlPWU"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/mine/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map