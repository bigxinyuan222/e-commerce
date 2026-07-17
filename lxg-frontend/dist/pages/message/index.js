"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/message/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/index!./src/pages/message/index.tsx":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/index!./src/pages/message/index.tsx ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_common_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/common/messages */ "./src/data/common/messages.ts");
/* harmony import */ var _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/message/message.module.scss */ "./src/styles/message/message.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");






var MessagePage = function MessagePage() {
  // 只保留店铺和乐享购两种类型的消息
  var filteredMessages = _data_common_messages__WEBPACK_IMPORTED_MODULE_2__.messages.filter(function (msg) {
    return msg.type === 'session' || msg.type === 'official';
  });
  var handleClearUnread = function handleClearUnread() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '已清除未读',
      icon: 'success'
    });
  };
  var handleMessageClick = function handleMessageClick(message) {
    if (message.isOfficial || message.title.includes('客服')) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: '/pages/customer-service/index'
      });
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messagePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTitle,
        children: "\u6D88\u606F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerActions,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].clearBtn,
          onClick: handleClearUnread,
          children: "\u6E05\u9664\u672A\u8BFB"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].moreBtn,
          children: "\xB7\xB7\xB7"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.ScrollView, {
      scrollY: true,
      className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messageList,
      children: filteredMessages.map(function (message) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messageItem,
          onClick: function onClick() {
            return handleMessageClick(message);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
            className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarWrap,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Image, {
              src: message.avatar,
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatar,
              mode: "aspectFill"
            }), message.unreadCount > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].unreadBadge,
              children: message.unreadCount
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
            className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messageContent,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messageHeader,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
                className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messageTitle,
                children: message.title
              }), message.tag && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
                className: "".concat(_styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tag, " ").concat(message.isOfficial ? _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].officialTag : ''),
                children: message.tag
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messageText,
              children: message.content
            })]
          }), message.time && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].messageTime,
            children: message.time
          })]
        }, message.id);
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (MessagePage);

/***/ }),

/***/ "./src/data/common/messages.ts":
/*!*************************************!*\
  !*** ./src/data/common/messages.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   messages: function() { return /* binding */ messages; }
/* harmony export */ });
/* unused harmony exports getMessagesByType, getUnreadCount */
var messages = [{
  id: 'msg-001',
  type: 'official',
  title: '乐享购推送',
  content: '您有新的优惠券可以领取，快来看看吧',
  avatar: 'https://picsum.photos/id/1/100/100',
  time: '',
  unreadCount: 1,
  tag: '官方',
  isOfficial: true
}, {
  id: 'msg-002',
  type: 'session',
  title: '乐享购自营官方客服',
  content: '[专属礼遇] 购物车心意券已到账，送您...',
  avatar: 'https://picsum.photos/id/2/100/100',
  time: '',
  unreadCount: 1,
  tag: '推荐',
  isOfficial: true
}];
var getMessagesByType = function getMessagesByType(type) {
  if (!type || type === 'all') {
    return messages;
  }
  return messages.filter(function (msg) {
    return msg.type === type;
  });
};
var getUnreadCount = function getUnreadCount() {
  return messages.reduce(function (acc, msg) {
    return acc + msg.unreadCount;
  }, 0);
};

/***/ }),

/***/ "./src/pages/message/index.tsx":
/*!*************************************!*\
  !*** ./src/pages/message/index.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/index!./src/pages/message/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/message/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_message_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/message/message.module.scss":
/*!************************************************!*\
  !*** ./src/styles/message/message.module.scss ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"messagePage":"message-module__messagePage___rj_FN","header":"message-module__header___NaTZT","headerTitle":"message-module__headerTitle___FzHu_","headerActions":"message-module__headerActions___ZHec1","clearBtn":"message-module__clearBtn___bFrFH","moreBtn":"message-module__moreBtn___RXgdb","typeTabs":"message-module__typeTabs___IpZvg","typeItem":"message-module__typeItem___gT5CF","typeIconWrap":"message-module__typeIconWrap___dxDul","typeIcon":"message-module__typeIcon___L5obz","typeBadge":"message-module__typeBadge___uKorL","typeLabel":"message-module__typeLabel___AJwf7","categoryTabs":"message-module__categoryTabs___D8WQI","categoryTab":"message-module__categoryTab___qSP5o","active":"message-module__active___fVEy2","deliveryTag":"message-module__deliveryTag___bA0mw","messageList":"message-module__messageList___nWcsx","messageItem":"message-module__messageItem___Ad4j2","avatarWrap":"message-module__avatarWrap___BW3jx","avatar":"message-module__avatar___skI30","unreadBadge":"message-module__unreadBadge___xk9Qx","messageContent":"message-module__messageContent___tmTG6","messageHeader":"message-module__messageHeader___I5nVF","messageTitle":"message-module__messageTitle___Vyn8v","tag":"message-module__tag___fP4E9","officialTag":"message-module__officialTag___g5gsb","messageText":"message-module__messageText___oMaP9","messageTime":"message-module__messageTime___zRapd","recommendSection":"message-module__recommendSection___HOT5J","recommendHeader":"message-module__recommendHeader___VuTSI","recommendTitle":"message-module__recommendTitle___v_1wi","recommendMore":"message-module__recommendMore___xRwC0","recommendList":"message-module__recommendList___ZbAJT","recommendItem":"message-module__recommendItem___AMrMB","recommendImage":"message-module__recommendImage___iYWGP","recommendPrice":"message-module__recommendPrice___WRPhz"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors"], function() { return __webpack_exec__("./src/pages/message/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map