"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/account-name/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/account-name/index!./src/pages/user/account-name/index.tsx":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/account-name/index!./src/pages/user/account-name/index.tsx ***!
  \****************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/user/account-name.module.scss */ "./src/styles/user/account-name.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");








var AccountNamePage = function AccountNamePage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    userInfo = _useAppContext.userInfo,
    setUserInfo = _useAppContext.setUserInfo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((userInfo === null || userInfo === void 0 ? void 0 : userInfo.accountName) || ''),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    accountName = _useState2[0],
    setAccountName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 1),
    canModify = _useState4[0];
  var handleBack = function handleBack() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
  };
  var handleConfirm = function handleConfirm() {
    if (!accountName || accountName.length < 6) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '账号名至少6位',
        icon: 'none'
      });
      return;
    }
    if (/[\s@#$%^&*()+=|{}':;',.<>/?~]/.test(accountName)) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '账号名不能包含特殊字符',
        icon: 'none'
      });
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认更改',
      content: '账号名一年仅允许更改一次，确定要更改吗？',
      success: function success(res) {
        if (res.confirm) {
          var updatedUser = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, userInfo), {}, {
            accountName: accountName
          });
          setUserInfo(updatedUser);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('userInfo', updatedUser);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '修改成功',
            icon: 'success'
          });
          setTimeout(function () {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
          }, 1500);
        }
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].accountNamePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].backBtn,
        onClick: handleBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].backIcon,
          children: "\u2039"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTitle,
        children: "\u8BA4\u8BC1"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerRight
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].content,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoBox,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].label,
          children: "\u8D26\u53F7\u540D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].inputRow,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Input, {
            className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].input,
            type: "text",
            placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7\u540D",
            value: accountName,
            onInput: function onInput(e) {
              return setAccountName(e.detail.value);
            },
            disabled: !canModify
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tip,
          children: "\u8D26\u53F7\u540D\u662F\u8D26\u53F7\u7684\u552F\u4E00\u51ED\u8BC1\uFF0C\u4E00\u5E74\u4EC5\u5141\u8BB8\u66F4\u6539\u4E00\u6B21"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].confirmBtn,
        onClick: handleConfirm,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_account_name_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].btnText,
          children: "\u786E\u8BA4\u66F4\u6539"
        })
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (AccountNamePage);

/***/ }),

/***/ "./src/pages/user/account-name/index.tsx":
/*!***********************************************!*\
  !*** ./src/pages/user/account-name/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_account_name_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/account-name/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/account-name/index!./src/pages/user/account-name/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_account_name_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/user/account-name/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_account_name_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_account_name_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_account_name_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_account_name_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/user/account-name.module.scss":
/*!**************************************************!*\
  !*** ./src/styles/user/account-name.module.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"accountNamePage":"account-name-module__accountNamePage___x8WJk","header":"account-name-module__header___OdViI","backBtn":"account-name-module__backBtn___O4KK7","backIcon":"account-name-module__backIcon___qTRVX","headerTitle":"account-name-module__headerTitle___tKf3c","headerRight":"account-name-module__headerRight___zgQe9","content":"account-name-module__content___CKbBQ","infoBox":"account-name-module__infoBox___iBTG0","label":"account-name-module__label___UATwJ","inputRow":"account-name-module__inputRow___pp5p7","input":"account-name-module__input___Soozn","tip":"account-name-module__tip___tbQUH","confirmBtn":"account-name-module__confirmBtn___Ef_IM","btnText":"account-name-module__btnText___OK91z"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/account-name/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map