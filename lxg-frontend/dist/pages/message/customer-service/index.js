"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/message/customer-service/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/customer-service/index!./src/pages/message/customer-service/index.tsx":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/customer-service/index!./src/pages/message/customer-service/index.tsx ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/styles/message/customer-service.module.scss */ "./src/styles/message/customer-service.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







var CustomerServicePage = function CustomerServicePage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      id: '1',
      content: '您好！欢迎来到乐享购官方客服，请问有什么可以帮助您的？',
      isMe: false,
      time: '10:00'
    }, {
      id: '2',
      content: '我想咨询一下商品退换货政策',
      isMe: true,
      time: '10:01'
    }, {
      id: '3',
      content: '您好！我们支持7天无理由退换货，商品需保持原样，不影响二次销售。如有质量问题，我们承担运费；非质量问题，运费需由您承担。',
      isMe: false,
      time: '10:02'
    }]),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_useState3, 2),
    inputValue = _useState4[0],
    setInputValue = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    scrollToBottom();
  }, [messages]);
  var scrollToBottom = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setTimeout(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().pageScrollTo({
        scrollTop: 99999,
        duration: 100
      });
    }, 100);
  }, []);
  var handleSend = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!inputValue.trim()) return;
    var newMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isMe: true,
      time: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages(function (prev) {
      return [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(prev), [newMessage]);
    });
    setInputValue('');
    setTimeout(function () {
      var replyMessage = {
        id: (Date.now() + 1).toString(),
        content: '感谢您的咨询，我们会尽快处理您的问题！',
        isMe: false,
        time: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(function (prev) {
        return [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(prev), [replyMessage]);
      });
    }, 1000);
  }, [inputValue]);
  var handleInputChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    setInputValue(e.detail.value);
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].customerServicePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].backBtn,
        onClick: function onClick() {
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
        },
        children: "\u2190"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].headerTitle,
        children: "\u4E50\u4EAB\u8D2D\u81EA\u8425\u5B98\u65B9\u5BA2\u670D"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].headerRight
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].chatContainer,
      scrollWithAnimation: true,
      children: messages.map(function (msg) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: "".concat(_styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].messageWrap, " ").concat(msg.isMe ? _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].me : _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].other),
          children: [!msg.isMe && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
            src: "https://picsum.photos/id/2/100/100",
            className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].avatar,
            mode: "aspectFill"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].messageContent,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].messageText,
              children: msg.content
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].messageTime,
              children: msg.time
            })]
          })]
        }, msg.id);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].inputBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Input, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].input,
        placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u95EE\u9898...",
        value: inputValue,
        onInput: handleInputChange,
        onConfirm: handleSend
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].sendBtn,
        onClick: handleSend,
        children: "\u53D1\u9001"
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (CustomerServicePage);

/***/ }),

/***/ "./src/pages/message/customer-service/index.tsx":
/*!******************************************************!*\
  !*** ./src/pages/message/customer-service/index.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_customer_service_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/customer-service/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/customer-service/index!./src/pages/message/customer-service/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_customer_service_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/message/customer-service/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_customer_service_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_customer_service_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_customer_service_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_customer_service_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/message/customer-service.module.scss":
/*!*********************************************************!*\
  !*** ./src/styles/message/customer-service.module.scss ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"customerServicePage":"customer-service-module__customerServicePage___WLxlh","header":"customer-service-module__header___eGe6d","backBtn":"customer-service-module__backBtn___FKjGs","headerTitle":"customer-service-module__headerTitle___VE2hJ","headerRight":"customer-service-module__headerRight___MixIO","chatContainer":"customer-service-module__chatContainer___v7zRZ","messageWrap":"customer-service-module__messageWrap___NCZxG","me":"customer-service-module__me___tHJON","other":"customer-service-module__other___J4vM5","avatar":"customer-service-module__avatar___RZN7I","messageContent":"customer-service-module__messageContent___YRMKD","messageText":"customer-service-module__messageText___UeVdU","messageTime":"customer-service-module__messageTime___jlGim","inputBar":"customer-service-module__inputBar___YmCAr","input":"customer-service-module__input___EHDrg","sendBtn":"customer-service-module__sendBtn___op9TU"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors"], function() { return __webpack_exec__("./src/pages/message/customer-service/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map