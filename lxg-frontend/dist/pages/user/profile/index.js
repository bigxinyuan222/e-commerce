"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/profile/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/profile/index!./src/pages/user/profile/index.tsx":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/profile/index!./src/pages/user/profile/index.tsx ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/user/profile.module.scss */ "./src/styles/user/profile.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");








var ProfilePage = function ProfilePage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    userInfo = _useAppContext.userInfo,
    setUserInfo = _useAppContext.setUserInfo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    notificationEnabled = _useState2[0],
    setNotificationEnabled = _useState2[1];
  var handleMenuItemClick = function handleMenuItemClick(title) {
    switch (title) {
      case '个人信息':
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
          url: '/pages/personal-info/index'
        });
        break;
      case '消息通知':
        setNotificationEnabled(!notificationEnabled);
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: notificationEnabled ? '已关闭消息通知' : '已开启消息通知',
          icon: 'none'
        });
        break;
      case '隐私设置':
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '隐私设置',
          icon: 'none'
        });
        break;
      case '帮助与反馈':
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '帮助与反馈',
          icon: 'none'
        });
        break;
      case '关于我们':
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
          title: '关于乐享购',
          content: '乐享购 v1.0.0\n\n致力于为用户提供优质的购物体验',
          showCancel: false
        });
        break;
      default:
        break;
    }
  };
  var logout = function logout() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: function success(res) {
        if (res.confirm) {
          setUserInfo((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, userInfo), {}, {
            isLoggedIn: false
          }));
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().removeStorageSync('userInfo');
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].profilePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].profileHeader,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
          src: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.avatar) || 'https://picsum.photos/id/64/200/200',
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatar,
          mode: "aspectFill"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nickname,
          children: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.nickname) || '乐享购用户'
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuSectionTitle,
        children: "\u8D26\u6237\u4E0E\u5B89\u5168"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuItem,
        onClick: function onClick() {
          return handleMenuItemClick('个人信息');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuIcon,
          children: "\uD83D\uDC64"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuTitle,
          children: "\u4E2A\u4EBA\u4FE1\u606F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuArrow,
          children: "\u203A"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuSectionTitle,
        children: "\u8BBE\u7F6E"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuItem,
        onClick: function onClick() {
          return handleMenuItemClick('消息通知');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuIcon,
          children: "\uD83D\uDD14"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuTitle,
          children: "\u6D88\u606F\u901A\u77E5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Switch, {
          color: "#e2231a",
          checked: notificationEnabled,
          onClick: function onClick() {
            return setNotificationEnabled(!notificationEnabled);
          }
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuItem,
        onClick: function onClick() {
          return handleMenuItemClick('隐私设置');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuIcon,
          children: "\uD83D\uDD12"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuTitle,
          children: "\u9690\u79C1\u8BBE\u7F6E"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuArrow,
          children: "\u203A"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuItem,
        onClick: function onClick() {
          return handleMenuItemClick('帮助与反馈');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuIcon,
          children: "\u2753"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuTitle,
          children: "\u5E2E\u52A9\u4E0E\u53CD\u9988"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuArrow,
          children: "\u203A"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuItem,
        onClick: function onClick() {
          return handleMenuItemClick('关于我们');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuIcon,
          children: "\uD83D\uDCCB"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuTitle,
          children: "\u5173\u4E8E\u6211\u4EEC"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].menuArrow,
          children: "\u203A"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_profile_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].logoutBtn,
      onClick: logout,
      children: "\u9000\u51FA\u767B\u5F55"
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (ProfilePage);

/***/ }),

/***/ "./src/pages/user/profile/index.tsx":
/*!******************************************!*\
  !*** ./src/pages/user/profile/index.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/profile/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/profile/index!./src/pages/user/profile/index.tsx");


var config = {"navigationBarTitleText":"个人信息","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/user/profile/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_profile_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/user/profile.module.scss":
/*!*********************************************!*\
  !*** ./src/styles/user/profile.module.scss ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"profilePage":"profile-module__profilePage___dJDqr","profileHeader":"profile-module__profileHeader___nBI5W","avatarSection":"profile-module__avatarSection___GjOlG","avatar":"profile-module__avatar___Pms0r","nickname":"profile-module__nickname___QC10n","menuSection":"profile-module__menuSection___R3z0H","menuSectionTitle":"profile-module__menuSectionTitle___DEtcE","menuItem":"profile-module__menuItem___GAOmM","menuIcon":"profile-module__menuIcon___MQdVd","menuTitle":"profile-module__menuTitle___vpBMK","menuValue":"profile-module__menuValue___b7wxo","menuArrow":"profile-module__menuArrow___CClR6","logoutBtn":"profile-module__logoutBtn___aFSAp"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/profile/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map