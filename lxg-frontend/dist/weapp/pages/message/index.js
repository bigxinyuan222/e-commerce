"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/message/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/index!./src/pages/message/index.tsx":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/index!./src/pages/message/index.tsx ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/message */ "./src/api/message/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _store_useChatStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/store/useChatStore */ "./src/store/useChatStore.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils */ "./src/pages/message/utils.ts");
/* harmony import */ var _store_useNotificationStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/store/useNotificationStore */ "./src/store/useNotificationStore.ts");
/* harmony import */ var _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/styles/message/message.module.scss */ "./src/styles/message/message.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");

















var MessagePage = function MessagePage() {
  var _latestService$id, _latestService$unread;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    conversations = _useState2[0],
    setConversations = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];

  // 通知 store
  var unreadCount = (0,_store_useNotificationStore__WEBPACK_IMPORTED_MODULE_6__["default"])(function (s) {
    return s.unreadCount;
  });
  var notifications = (0,_store_useNotificationStore__WEBPACK_IMPORTED_MODULE_6__["default"])(function (s) {
    return s.notifications;
  });
  var fetchUnreadCount = (0,_store_useNotificationStore__WEBPACK_IMPORTED_MODULE_6__["default"])(function (s) {
    return s.fetchUnreadCount;
  });
  var fetchNotifications = (0,_store_useNotificationStore__WEBPACK_IMPORTED_MODULE_6__["default"])(function (s) {
    return s.fetchNotifications;
  });
  var markRead = (0,_store_useNotificationStore__WEBPACK_IMPORTED_MODULE_6__["default"])(function (s) {
    return s.markRead;
  });
  var markAllRead = (0,_store_useNotificationStore__WEBPACK_IMPORTED_MODULE_6__["default"])(function (s) {
    return s.markAllRead;
  });

  // 客服会话 store
  var createConversation = (0,_store_useChatStore__WEBPACK_IMPORTED_MODULE_5__["default"])(function (s) {
    return s.createConversation;
  });

  // 拉取客服会话列表
  var fetchConversations = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee() {
    var _JSON$stringify, res, data, convData, result, _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if ((0,_api_common__WEBPACK_IMPORTED_MODULE_2__.getAuthToken)()) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          _context.p = 1;
          _context.n = 2;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_message__WEBPACK_IMPORTED_MODULE_3__.serviceApi.conversations);
        case 2:
          res = _context.v;
          data = res === null || res === void 0 ? void 0 : res.data;
          if (data) {
            _context.n = 3;
            break;
          }
          return _context.a(2);
        case 3:
          convData = Array.isArray(data) ? data : (data === null || data === void 0 ? void 0 : data.list) || [];
          console.log('[消息页] 会话列表原始数据:', (_JSON$stringify = JSON.stringify(convData)) === null || _JSON$stringify === void 0 ? void 0 : _JSON$stringify.slice(0, 500));
          result = convData.map(function (conv) {
            var _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _conv$id, _ref9, _ref0, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _conv$unreadCount, _ref16, _ref17, _ref18, _conv$title, _ref19, _ref20, _ref21, _conv$lastMessage, _ref22, _ref23, _ref24, _conv$avatar, _ref25, _ref26, _ref27, _ref28, _conv$lastTime;
            var convId = String((_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_conv$id = conv.id) !== null && _conv$id !== void 0 ? _conv$id : conv.ID) !== null && _ref8 !== void 0 ? _ref8 : conv.Id) !== null && _ref7 !== void 0 ? _ref7 : conv.conversationId) !== null && _ref6 !== void 0 ? _ref6 : conv.ConversationId) !== null && _ref5 !== void 0 ? _ref5 : conv.conv_id) !== null && _ref4 !== void 0 ? _ref4 : conv.sessionId) !== null && _ref3 !== void 0 ? _ref3 : conv.SessionId) !== null && _ref2 !== void 0 ? _ref2 : "conv-".concat(Math.random().toString(36).slice(2, 10)));
            var unreadCount = Number((_ref9 = (_ref0 = (_ref1 = (_ref10 = (_ref11 = (_ref12 = (_ref13 = (_ref14 = (_ref15 = (_conv$unreadCount = conv.unreadCount) !== null && _conv$unreadCount !== void 0 ? _conv$unreadCount : conv.UnreadCount) !== null && _ref15 !== void 0 ? _ref15 : conv.userUnread) !== null && _ref14 !== void 0 ? _ref14 : conv.UserUnread) !== null && _ref13 !== void 0 ? _ref13 : conv.user_unread) !== null && _ref12 !== void 0 ? _ref12 : conv.user_unread_count) !== null && _ref11 !== void 0 ? _ref11 : conv.unread_count) !== null && _ref10 !== void 0 ? _ref10 : conv.Unread_Count) !== null && _ref1 !== void 0 ? _ref1 : conv.unread) !== null && _ref0 !== void 0 ? _ref0 : conv.Unread) !== null && _ref9 !== void 0 ? _ref9 : 0);
            return {
              id: convId,
              type: 'session',
              title: (_ref16 = (_ref17 = (_ref18 = (_conv$title = conv.title) !== null && _conv$title !== void 0 ? _conv$title : conv.Title) !== null && _ref18 !== void 0 ? _ref18 : conv.name) !== null && _ref17 !== void 0 ? _ref17 : conv.Name) !== null && _ref16 !== void 0 ? _ref16 : '客服',
              content: (_ref19 = (_ref20 = (_ref21 = (_conv$lastMessage = conv.lastMessage) !== null && _conv$lastMessage !== void 0 ? _conv$lastMessage : conv.LastMessage) !== null && _ref21 !== void 0 ? _ref21 : conv.content) !== null && _ref20 !== void 0 ? _ref20 : conv.Content) !== null && _ref19 !== void 0 ? _ref19 : '',
              avatar: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)((_ref22 = (_ref23 = (_ref24 = (_conv$avatar = conv.avatar) !== null && _conv$avatar !== void 0 ? _conv$avatar : conv.Avatar) !== null && _ref24 !== void 0 ? _ref24 : conv.avatarUrl) !== null && _ref23 !== void 0 ? _ref23 : conv.AvatarUrl) !== null && _ref22 !== void 0 ? _ref22 : ''),
              time: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.formatMessageTime)((_ref25 = (_ref26 = (_ref27 = (_ref28 = (_conv$lastTime = conv.lastTime) !== null && _conv$lastTime !== void 0 ? _conv$lastTime : conv.LastTime) !== null && _ref28 !== void 0 ? _ref28 : conv.time) !== null && _ref27 !== void 0 ? _ref27 : conv.UpdatedAt) !== null && _ref26 !== void 0 ? _ref26 : conv.updatedAt) !== null && _ref25 !== void 0 ? _ref25 : ''),
              unreadCount: unreadCount,
              tag: conv.tag,
              isOfficial: false
            };
          });
          console.log('[消息页] 会话列表解析后:', result.map(function (c) {
            return {
              id: c.id,
              title: c.title,
              unreadCount: c.unreadCount
            };
          }));
          setConversations(result);
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error('加载会话列表失败:', _t);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[1, 4]]);
  })), []);

  // 页面加载时拉取数据
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidShow)(function () {
    if (!(0,_api_common__WEBPACK_IMPORTED_MODULE_2__.getAuthToken)()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([fetchConversations(), fetchNotifications(true), fetchUnreadCount()]).finally(function () {
      return setLoading(false);
    });
  });

  // 全部已读
  var handleClearUnread = function handleClearUnread() {
    markAllRead();
  };

  // 标记单条通知已读
  var handleMarkRead = /*#__PURE__*/function () {
    var _ref29 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee2(message) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!(message.type !== 'official' || message.unreadCount <= 0)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.n = 2;
            return markRead(message.id);
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function handleMarkRead(_x) {
      return _ref29.apply(this, arguments);
    };
  }();
  var handleMessageClick = /*#__PURE__*/function () {
    var _ref30 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee3(message) {
      var _message$id, convId;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(message.type === 'official')) {
              _context3.n = 2;
              break;
            }
            _context3.n = 1;
            return handleMarkRead(message);
          case 1:
            if (message.title.includes('推送') || message.title.includes('优惠')) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
                url: '/pages/user/coupons/index'
              });
            } else {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: message.content || '已查看',
                icon: 'none'
              });
            }
            return _context3.a(2);
          case 2:
            if (!(message.type === 'session' || message.title.includes('客服'))) {
              _context3.n = 3;
              break;
            }
            if (message.id === 'fixed-customer-service') {
              // 固定置顶客服入口：不传 id，由客服页自动创建/复用会话
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
                url: '/pages/message/customer-service/index'
              });
            } else {
              convId = (_message$id = message.id) !== null && _message$id !== void 0 ? _message$id : '';
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
                url: "/pages/message/customer-service/index?id=".concat(encodeURIComponent(convId))
              });
            }
            return _context3.a(2);
          case 3:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '功能开发中',
              icon: 'none'
            });
          case 4:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handleMessageClick(_x2) {
      return _ref30.apply(this, arguments);
    };
  }();

  // 合并会话 + 通知列表
  var notifMessages = notifications.map(function (n) {
    return {
      id: n.id,
      type: 'official',
      title: n.title,
      content: n.content,
      avatar: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(n.avatar || n.icon || ''),
      time: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.formatMessageTime)(n.time || n.createdAt || ''),
      unreadCount: n.isRead ? 0 : 1,
      tag: n.tag || '官方',
      isOfficial: true
    };
  });

  // 固定置顶的客服入口：每个账号消息列表最顶部都固定显示一条客服会话
  // 只取最新一条客服会话的最新内容与未读数（避免聚合多个会话造成混淆）
  var serviceConvs = conversations.filter(function (c) {
    return (c.title || '').includes('客服');
  });
  var otherConvs = conversations.filter(function (c) {
    return !(c.title || '').includes('客服');
  });
  // 按时间倒序取最新一条
  var latestService = serviceConvs.sort(function (a, b) {
    return new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime();
  })[0];
  var fixedCustomerService = {
    id: (_latestService$id = latestService === null || latestService === void 0 ? void 0 : latestService.id) !== null && _latestService$id !== void 0 ? _latestService$id : 'fixed-customer-service',
    type: 'session',
    title: '乐享购官方客服',
    content: (latestService === null || latestService === void 0 ? void 0 : latestService.content) || '您好，请问有什么可以帮您？',
    avatar: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)((latestService === null || latestService === void 0 ? void 0 : latestService.avatar) || ''),
    time: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.formatMessageTime)((latestService === null || latestService === void 0 ? void 0 : latestService.time) || ''),
    unreadCount: (_latestService$unread = latestService === null || latestService === void 0 ? void 0 : latestService.unreadCount) !== null && _latestService$unread !== void 0 ? _latestService$unread : 0,
    tag: '客服',
    isOfficial: false
  };
  var allMessages = [fixedCustomerService].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(otherConvs), (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(notifMessages));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
    className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messagePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
      className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].headerLeft,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].headerTitle,
          children: "\u6D88\u606F"
        }), unreadCount > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].unreadTotalBadge,
          children: unreadCount > 99 ? '99+' : unreadCount
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].headerActions,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
          className: "".concat(_styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].clearBtn, " ").concat(unreadCount === 0 ? _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].clearBtnDisabled : ''),
          onClick: handleClearUnread,
          children: "\u5168\u90E8\u5DF2\u8BFB"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].moreBtn,
          children: "\xB7\xB7\xB7"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.ScrollView, {
      scrollY: true,
      className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messageList,
      children: allMessages.length === 0 && !loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
        className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyIcon,
          children: "\uD83D\uDCED"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyText,
          children: "\u6682\u65E0\u6D88\u606F"
        })]
      }) : allMessages.map(function (message) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
          className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messageItem,
          onClick: function onClick() {
            return handleMessageClick(message);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].avatarWrap,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_15__["default"])({
              src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(message.avatar),
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].avatar,
              mode: "aspectFill"
            }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.lazyImgProps)())), message.unreadCount > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].unreadBadge,
              children: message.unreadCount
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
            className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messageBody,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.View, {
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messageHeader,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messageTitle,
                children: message.title
              }), message.tag && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
                className: "".concat(_styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].tag, " ").concat(message.isOfficial ? _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].officialTag : ''),
                children: message.tag
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
              className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messageText,
              children: message.content && message.content.length > 7 ? message.content.slice(0, 7) + '...' : message.content
            })]
          }), message.time && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_14__.Text, {
            className: _styles_message_message_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].messageTime,
            children: message.time
          })]
        }, "".concat(message.type, "-").concat(message.id));
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (MessagePage);

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

/***/ "./src/pages/message/utils.ts":
/*!************************************!*\
  !*** ./src/pages/message/utils.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatMessageTime: function() { return /* binding */ formatMessageTime; }
/* harmony export */ });
/* unused harmony exports formatMessageType, getMessageTypeIcon, truncateMessageContent, hasUnreadMessages, countUnreadMessages, formatUnreadCount */
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/time */ "./src/utils/time.ts");
// ============================================
// 消息列表页 - 工具函数
// ============================================



// 格式化消息时间（统一使用全局日期时间格式）
function formatMessageTime(time) {
  return (0,_utils_time__WEBPACK_IMPORTED_MODULE_0__.formatDateTime)(time);
}

// 格式化消息类型
function formatMessageType(type) {
  return type === 'store' ? '店铺消息' : '系统消息';
}

// 获取消息类型图标
function getMessageTypeIcon(type) {
  return type === 'store' ? '🏪' : '🔔';
}

// 截断消息内容
function truncateMessageContent(content) {
  var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
}

// 检查是否有未读消息
function hasUnreadMessages(messages) {
  return messages.some(function (m) {
    return !m.isRead;
  });
}

// 计算未读消息数量
function countUnreadMessages(messages) {
  return messages.filter(function (m) {
    return !m.isRead;
  }).length;
}

// 格式化未读数量显示
function formatUnreadCount(count) {
  if (count === 0) return '';
  return count > 99 ? '99+' : "".concat(count);
}

/***/ }),

/***/ "./src/store/useNotificationStore.ts":
/*!*******************************************!*\
  !*** ./src/store/useNotificationStore.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony export useNotificationStore */
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/message */ "./src/api/message/index.ts");




// ============================================
// 通知 Store（Zustand）
// 统一管理：通知列表、未读数、已读操作
// ============================================






// ---------- 类型定义 ----------

// ---------- 工具函数 ----------
function normalizeNotification(raw) {
  var _ref, _ref2, _ref3, _ref4, _raw$id, _ref5, _ref6, _ref7, _ref8, _raw$isRead, _ref9, _ref0, _ref1, _raw$type, _ref10, _ref11, _ref12, _raw$title, _ref13, _ref14, _ref15, _ref16, _raw$content, _ref17, _ref18, _ref19, _raw$avatar, _ref20, _ref21, _ref22, _raw$icon, _ref23, _ref24, _ref25, _ref26, _raw$time, _ref27, _ref28, _ref29, _raw$createdAt, _ref30, _raw$tag;
  var id = String((_ref = (_ref2 = (_ref3 = (_ref4 = (_raw$id = raw.id) !== null && _raw$id !== void 0 ? _raw$id : raw.ID) !== null && _ref4 !== void 0 ? _ref4 : raw.Id) !== null && _ref3 !== void 0 ? _ref3 : raw.notificationId) !== null && _ref2 !== void 0 ? _ref2 : raw.NotificationId) !== null && _ref !== void 0 ? _ref : '');
  var isRead = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_raw$isRead = raw.isRead) !== null && _raw$isRead !== void 0 ? _raw$isRead : raw.IsRead) !== null && _ref8 !== void 0 ? _ref8 : raw.is_read) !== null && _ref7 !== void 0 ? _ref7 : raw.read) !== null && _ref6 !== void 0 ? _ref6 : raw.Read) !== null && _ref5 !== void 0 ? _ref5 : false;
  var rawType = String((_ref9 = (_ref0 = (_ref1 = (_raw$type = raw.type) !== null && _raw$type !== void 0 ? _raw$type : raw.Type) !== null && _ref1 !== void 0 ? _ref1 : raw.category) !== null && _ref0 !== void 0 ? _ref0 : raw.Category) !== null && _ref9 !== void 0 ? _ref9 : 'other');
  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, raw || {}), {}, {
    id: id,
    type: ['system', 'order', 'promotion', 'activity'].includes(rawType) ? rawType : 'other',
    title: (_ref10 = (_ref11 = (_ref12 = (_raw$title = raw.title) !== null && _raw$title !== void 0 ? _raw$title : raw.Title) !== null && _ref12 !== void 0 ? _ref12 : raw.name) !== null && _ref11 !== void 0 ? _ref11 : raw.Name) !== null && _ref10 !== void 0 ? _ref10 : '通知',
    content: (_ref13 = (_ref14 = (_ref15 = (_ref16 = (_raw$content = raw.content) !== null && _raw$content !== void 0 ? _raw$content : raw.Content) !== null && _ref16 !== void 0 ? _ref16 : raw.message) !== null && _ref15 !== void 0 ? _ref15 : raw.Message) !== null && _ref14 !== void 0 ? _ref14 : raw.body) !== null && _ref13 !== void 0 ? _ref13 : '',
    avatar: (_ref17 = (_ref18 = (_ref19 = (_raw$avatar = raw.avatar) !== null && _raw$avatar !== void 0 ? _raw$avatar : raw.Avatar) !== null && _ref19 !== void 0 ? _ref19 : raw.icon) !== null && _ref18 !== void 0 ? _ref18 : raw.Icon) !== null && _ref17 !== void 0 ? _ref17 : '',
    icon: (_ref20 = (_ref21 = (_ref22 = (_raw$icon = raw.icon) !== null && _raw$icon !== void 0 ? _raw$icon : raw.Icon) !== null && _ref22 !== void 0 ? _ref22 : raw.avatar) !== null && _ref21 !== void 0 ? _ref21 : raw.Avatar) !== null && _ref20 !== void 0 ? _ref20 : '',
    time: (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_raw$time = raw.time) !== null && _raw$time !== void 0 ? _raw$time : raw.Time) !== null && _ref26 !== void 0 ? _ref26 : raw.createdAt) !== null && _ref25 !== void 0 ? _ref25 : raw.CreatedAt) !== null && _ref24 !== void 0 ? _ref24 : raw.created_at) !== null && _ref23 !== void 0 ? _ref23 : '',
    createdAt: (_ref27 = (_ref28 = (_ref29 = (_raw$createdAt = raw.createdAt) !== null && _raw$createdAt !== void 0 ? _raw$createdAt : raw.CreatedAt) !== null && _ref29 !== void 0 ? _ref29 : raw.created_at) !== null && _ref28 !== void 0 ? _ref28 : raw.time) !== null && _ref27 !== void 0 ? _ref27 : '',
    isRead: !!isRead,
    tag: (_ref30 = (_raw$tag = raw.tag) !== null && _raw$tag !== void 0 ? _raw$tag : raw.Tag) !== null && _ref30 !== void 0 ? _ref30 : undefined
  });
}

// tabBar 中"消息"页签的索引（首页0/分类1/消息2/购物车3/我的4）
var MESSAGE_TAB_INDEX = 2;
function updateTabBadge(count) {
  try {
    if (count > 0) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().setTabBarBadge({
        index: MESSAGE_TAB_INDEX,
        text: count > 99 ? '99+' : String(count)
      });
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().removeTabBarBadge({
        index: MESSAGE_TAB_INDEX
      });
    }
  } catch (err) {
    console.warn('[NotificationStore] 设置 tabBar 角标失败:', err);
  }
}

// ---------- Store 创建 ----------
var useNotificationStore = (0,zustand__WEBPACK_IMPORTED_MODULE_4__.create)(function (set, get) {
  return {
    // ============ state ============
    notifications: [],
    loading: false,
    loaded: false,
    unreadCount: 0,
    // ============ actions ============
    fetchUnreadCount: function fetchUnreadCount() {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().m(function _callee() {
        var _ref31, _res$data, res, data, count, _ref32, _ref33, _data$count, _t;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if ((0,_api_common__WEBPACK_IMPORTED_MODULE_1__.getAuthToken)()) {
                _context.n = 1;
                break;
              }
              return _context.a(2, 0);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiGet)(_api_message__WEBPACK_IMPORTED_MODULE_2__.notificationApi.unreadCount);
            case 2:
              res = _context.v;
              data = (_ref31 = (_res$data = res === null || res === void 0 ? void 0 : res.data) !== null && _res$data !== void 0 ? _res$data : res === null || res === void 0 ? void 0 : res.result) !== null && _ref31 !== void 0 ? _ref31 : res;
              count = 0;
              if (typeof data === 'number') count = data;else if (typeof data === 'string') count = parseInt(data, 10) || 0;else if (data && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_7__["default"])(data) === 'object') {
                count = (_ref32 = (_ref33 = (_data$count = data.count) !== null && _data$count !== void 0 ? _data$count : data.unreadCount) !== null && _ref33 !== void 0 ? _ref33 : data.total) !== null && _ref32 !== void 0 ? _ref32 : 0;
              }
              count = Math.max(0, Number(count) || 0);
              set({
                unreadCount: count
              });
              updateTabBadge(count);
              return _context.a(2, count);
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error('[NotificationStore] fetchUnreadCount 失败:', _t);
              return _context.a(2, get().unreadCount);
          }
        }, _callee, null, [[1, 3]]);
      }))();
    },
    fetchNotifications: function fetchNotifications() {
      var _arguments = arguments;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().m(function _callee2() {
        var forceRefresh, state, _ref34, _ref35, _res$data2, _ref36, _data$list, res, data, rawList, list, localUnread, _t2;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              forceRefresh = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
              if ((0,_api_common__WEBPACK_IMPORTED_MODULE_1__.getAuthToken)()) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, []);
            case 1:
              state = get();
              if (!(!forceRefresh && state.loaded && !state.loading)) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, state.notifications);
            case 2:
              set({
                loading: true
              });
              _context2.p = 3;
              _context2.n = 4;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiGet)(_api_message__WEBPACK_IMPORTED_MODULE_2__.notificationApi.list);
            case 4:
              res = _context2.v;
              data = (_ref34 = (_ref35 = (_res$data2 = res === null || res === void 0 ? void 0 : res.data) !== null && _res$data2 !== void 0 ? _res$data2 : res === null || res === void 0 ? void 0 : res.result) !== null && _ref35 !== void 0 ? _ref35 : res) !== null && _ref34 !== void 0 ? _ref34 : [];
              rawList = Array.isArray(data) ? data : (_ref36 = (_data$list = data === null || data === void 0 ? void 0 : data.list) !== null && _data$list !== void 0 ? _data$list : data === null || data === void 0 ? void 0 : data.records) !== null && _ref36 !== void 0 ? _ref36 : [];
              list = rawList.map(normalizeNotification); // 按时间倒序
              list.sort(function (a, b) {
                var at = new Date(a.createdAt || a.time || 0).getTime();
                var bt = new Date(b.createdAt || b.time || 0).getTime();
                return bt - at;
              });
              set({
                notifications: list,
                loaded: true
              });
              // 计算本地未读数（作为 unread-count 接口的补充）
              localUnread = list.filter(function (n) {
                return !n.isRead;
              }).length;
              if (localUnread > 0 && get().unreadCount === 0) {
                set({
                  unreadCount: localUnread
                });
                updateTabBadge(localUnread);
              }
              return _context2.a(2, list);
            case 5:
              _context2.p = 5;
              _t2 = _context2.v;
              console.error('[NotificationStore] fetchNotifications 失败:', _t2);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
                title: _t2.message || '加载通知失败',
                icon: 'none'
              });
              return _context2.a(2, state.notifications);
            case 6:
              _context2.p = 6;
              set({
                loading: false
              });
              return _context2.f(6);
            case 7:
              return _context2.a(2);
          }
        }, _callee2, null, [[3, 5, 6, 7]]);
      }))();
    },
    markRead: function markRead(id) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().m(function _callee3() {
        var state, target, newCount, _t3;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (!(!id || id === 'undefined' || id === 'null')) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              state = get();
              target = state.notifications.find(function (n) {
                return n.id === id;
              });
              if (!(!target || target.isRead)) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2);
            case 2:
              // 乐观更新
              set(function (s) {
                return {
                  notifications: s.notifications.map(function (n) {
                    return n.id === id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, n), {}, {
                      isRead: true
                    }) : n;
                  }),
                  unreadCount: Math.max(0, s.unreadCount - 1)
                };
              });
              newCount = get().unreadCount;
              updateTabBadge(newCount);
              _context3.p = 3;
              _context3.n = 4;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiPut)(_api_message__WEBPACK_IMPORTED_MODULE_2__.notificationApi.read, {}, {
                id: id
              });
            case 4:
              _context3.n = 5;
              return get().fetchUnreadCount();
            case 5:
              _context3.n = 7;
              break;
            case 6:
              _context3.p = 6;
              _t3 = _context3.v;
              console.error('[NotificationStore] markRead 失败:', _t3);
              // 回滚乐观更新
              set(function (s) {
                return {
                  notifications: s.notifications.map(function (n) {
                    return n.id === id ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, n), {}, {
                      isRead: false
                    }) : n;
                  }),
                  unreadCount: s.unreadCount + 1
                };
              });
              updateTabBadge(get().unreadCount);
            case 7:
              return _context3.a(2);
          }
        }, _callee3, null, [[3, 6]]);
      }))();
    },
    markAllRead: function markAllRead() {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_5__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().m(function _callee4() {
        var state, _t4;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_6__["default"])().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              state = get();
              if (!(state.unreadCount === 0)) {
                _context4.n = 1;
                break;
              }
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
                title: '暂无未读通知',
                icon: 'none'
              });
              return _context4.a(2);
            case 1:
              // 乐观更新
              set(function (s) {
                return {
                  notifications: s.notifications.map(function (n) {
                    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, n), {}, {
                      isRead: true
                    });
                  }),
                  unreadCount: 0
                };
              });
              updateTabBadge(0);
              _context4.p = 2;
              _context4.n = 3;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_1__.apiPut)(_api_message__WEBPACK_IMPORTED_MODULE_2__.notificationApi.readAll);
            case 3:
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
                title: '已全部已读',
                icon: 'success'
              });
              _context4.n = 6;
              break;
            case 4:
              _context4.p = 4;
              _t4 = _context4.v;
              console.error('[NotificationStore] markAllRead 失败:', _t4);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_0___default().showToast({
                title: _t4.message || '操作失败',
                icon: 'none'
              });
              // 回滚：重新拉取
              _context4.n = 5;
              return get().fetchNotifications(true);
            case 5:
              _context4.n = 6;
              return get().fetchUnreadCount();
            case 6:
              return _context4.a(2);
          }
        }, _callee4, null, [[2, 4]]);
      }))();
    },
    reset: function reset() {
      set({
        notifications: [],
        loading: false,
        loaded: false,
        unreadCount: 0
      });
      updateTabBadge(0);
    }
  };
});
/* harmony default export */ __webpack_exports__["default"] = (useNotificationStore);

/***/ }),

/***/ "./src/styles/message/message.module.scss":
/*!************************************************!*\
  !*** ./src/styles/message/message.module.scss ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"messagePage":"message-module__messagePage___rj_FN","header":"message-module__header___NaTZT","headerLeft":"message-module__headerLeft___Rl1Ya","headerTitle":"message-module__headerTitle___FzHu_","unreadTotalBadge":"message-module__unreadTotalBadge___PGu4u","headerActions":"message-module__headerActions___ZHec1","clearBtn":"message-module__clearBtn___bFrFH","clearBtnDisabled":"message-module__clearBtnDisabled___WkVZv","moreBtn":"message-module__moreBtn___RXgdb","typeTabs":"message-module__typeTabs___IpZvg","typeItem":"message-module__typeItem___gT5CF","typeIconWrap":"message-module__typeIconWrap___dxDul","typeIcon":"message-module__typeIcon___L5obz","typeBadge":"message-module__typeBadge___uKorL","typeLabel":"message-module__typeLabel___AJwf7","categoryTabs":"message-module__categoryTabs___D8WQI","categoryTab":"message-module__categoryTab___qSP5o","active":"message-module__active___fVEy2","deliveryTag":"message-module__deliveryTag___bA0mw","statusBar":"message-module__statusBar___bsmj8","statusText":"message-module__statusText___i7viw","quickEntry":"message-module__quickEntry___Mpm0b","quickEntryAvatar":"message-module__quickEntryAvatar___e9qau","quickEntryImg":"message-module__quickEntryImg___y73hF","quickEntryContent":"message-module__quickEntryContent___bCCNQ","quickEntryTitle":"message-module__quickEntryTitle___p3gUz","quickEntryDesc":"message-module__quickEntryDesc___SO115","quickEntryArrow":"message-module__quickEntryArrow___Rk9cx","emptyState":"message-module__emptyState___DKxxE","emptyIcon":"message-module__emptyIcon___GzDx9","emptyText":"message-module__emptyText___SAG1K","emptyHint":"message-module__emptyHint___SNpJO","messageList":"message-module__messageList___nWcsx","messageItem":"message-module__messageItem___Ad4j2","avatarWrap":"message-module__avatarWrap___BW3jx","avatar":"message-module__avatar___skI30","unreadBadge":"message-module__unreadBadge___xk9Qx","messageBody":"message-module__messageBody___oaMpb","messageHeader":"message-module__messageHeader___I5nVF","messageTitle":"message-module__messageTitle___Vyn8v","tag":"message-module__tag___fP4E9","officialTag":"message-module__officialTag___g5gsb","messageText":"message-module__messageText___oMaP9","messageTime":"message-module__messageTime___zRapd","recommendSection":"message-module__recommendSection___HOT5J","recommendHeader":"message-module__recommendHeader___VuTSI","recommendTitle":"message-module__recommendTitle___v_1wi","recommendMore":"message-module__recommendMore___xRwC0","recommendList":"message-module__recommendList___ZbAJT","recommendItem":"message-module__recommendItem___AMrMB","recommendImage":"message-module__recommendImage___iYWGP","recommendPrice":"message-module__recommendPrice___WRPhz"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/message/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map