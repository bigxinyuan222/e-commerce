"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/message/customer-service/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/customer-service/index!./src/pages/message/customer-service/index.tsx":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/message/customer-service/index!./src/pages/message/customer-service/index.tsx ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_useChatStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/useChatStore */ "./src/store/useChatStore.ts");
/* harmony import */ var _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/chatWS */ "./src/utils/chatWS.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/utils/time */ "./src/utils/time.ts");
/* harmony import */ var _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/message/customer-service.module.scss */ "./src/styles/message/customer-service.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");












var DEFAULT_AVATAR = '';
var USER_DEFAULT_AVATAR = '';
var CustomerServicePage = function CustomerServicePage() {
  var _router$params, _messagesMap$conversa;
  var router = (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  var queryId = router !== null && router !== void 0 && (_router$params = router.params) !== null && _router$params !== void 0 && _router$params.id ? decodeURIComponent(router.params.id) : null;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState3, 2),
    initReady = _useState4[0],
    setInitReady = _useState4[1];
  var autoScrollRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  var _useChatStore = (0,_store_useChatStore__WEBPACK_IMPORTED_MODULE_2__["default"])(),
    init = _useChatStore.init,
    connectWS = _useChatStore.connectWS,
    disconnectWS = _useChatStore.disconnectWS,
    conversations = _useChatStore.conversations,
    currentConversationId = _useChatStore.currentConversationId,
    currentConversation = _useChatStore.currentConversation,
    messagesMap = _useChatStore.messagesMap,
    messagesLoadingMap = _useChatStore.messagesLoadingMap,
    wsStatus = _useChatStore.wsStatus,
    wsConnected = _useChatStore.wsConnected,
    fetchConversations = _useChatStore.fetchConversations,
    fetchMessages = _useChatStore.fetchMessages,
    sendMessage = _useChatStore.sendMessage,
    enterConversation = _useChatStore.enterConversation,
    leaveConversation = _useChatStore.leaveConversation,
    createConversation = _useChatStore.createConversation,
    markConversationRead = _useChatStore.markConversationRead,
    transferToHuman = _useChatStore.transferToHuman;
  var conversationId = currentConversationId !== null && currentConversationId !== void 0 ? currentConversationId : queryId;
  var messages = conversationId ? (_messagesMap$conversa = messagesMap[conversationId]) !== null && _messagesMap$conversa !== void 0 ? _messagesMap$conversa : [] : [];
  var messagesLoading = conversationId ? !!messagesLoadingMap[conversationId] : false;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    init();
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidShow)(function () {
    connectWS();
    if (conversationId) {
      markConversationRead(conversationId).catch(function () {});
      fetchMessages(conversationId, false).catch(function () {});
    }
    scrollToBottom();
  });
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidHide)(function () {
    // 保持后台 WS 连接
  });
  var bootstrap = /*#__PURE__*/function () {
    var _ref = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee() {
      var cid, _conv$id, conv, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            if (conversations.length) {
              _context.n = 1;
              break;
            }
            _context.n = 1;
            return fetchConversations(true);
          case 1:
            cid = queryId;
            if (cid) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return createConversation({
              title: '乐享购官方客服'
            });
          case 2:
            conv = _context.v;
            cid = (_conv$id = conv === null || conv === void 0 ? void 0 : conv.id) !== null && _conv$id !== void 0 ? _conv$id : null;
          case 3:
            if (!cid) {
              _context.n = 5;
              break;
            }
            _context.n = 4;
            return enterConversation(cid);
          case 4:
            _context.n = 5;
            return fetchMessages(cid, true);
          case 5:
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            console.error('[客服页] bootstrap 失败:', _t);
          case 7:
            _context.p = 7;
            setInitReady(true);
            setTimeout(scrollToBottom, 100);
            return _context.f(7);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[0, 6, 7, 8]]);
    }));
    return function bootstrap() {
      return _ref.apply(this, arguments);
    };
  }();
  var scrollToBottom = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!autoScrollRef.current) return;
    try {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().createSelectorQuery().select(".".concat(_styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].chatContainer)).boundingClientRect(function (rect) {
        if (rect) {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().pageScrollTo({
            scrollTop: rect.height + 9999,
            duration: 150
          });
        }
      }).exec();
    } catch (e) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().pageScrollTo({
        scrollTop: 99999,
        duration: 150
      });
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (messages.length > 0) setTimeout(scrollToBottom, 50);
  }, [messages.length, scrollToBottom]);
  var handleSend = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee2() {
    var content, result;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (conversationId) {
            _context2.n = 1;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '会话未就绪，请稍候',
            icon: 'none'
          });
          return _context2.a(2);
        case 1:
          content = inputValue.trim();
          if (content) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2);
        case 2:
          setInputValue('');
          autoScrollRef.current = true;
          if (!wsConnected) {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '正在连接...',
              icon: 'none'
            });
            connectWS();
          }
          _context2.n = 3;
          return sendMessage(conversationId, {
            type: 'text',
            content: content
          });
        case 3:
          result = _context2.v;
          void result;
          scrollToBottom();
        case 4:
          return _context2.a(2);
      }
    }, _callee2);
  })), [conversationId, inputValue, sendMessage, wsConnected, connectWS, scrollToBottom]);
  var handleInputChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    var _ref3, _e$detail$value, _e$target;
    setInputValue((_ref3 = (_e$detail$value = e.detail.value) !== null && _e$detail$value !== void 0 ? _e$detail$value : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value) !== null && _ref3 !== void 0 ? _ref3 : '');
  }, []);
  var handleHumanService = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee3() {
    var ok;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (conversationId) {
            _context3.n = 1;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '会话未就绪，请稍候',
            icon: 'none'
          });
          return _context3.a(2);
        case 1:
          if (!wsConnected) {
            connectWS();
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
            title: '正在转接...',
            mask: true
          });
          _context3.n = 2;
          return transferToHuman(conversationId);
        case 2:
          ok = _context3.v;
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
          if (ok) {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '已为您转接人工客服',
              icon: 'none'
            });
            scrollToBottom();
          }
        case 3:
          return _context3.a(2);
      }
    }, _callee3);
  })), [conversationId, transferToHuman, wsConnected, connectWS, scrollToBottom]);
  var handleReconnect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    // 非 closed/idle 状态时忽略点击（避免给 Taro 事件处理器传 undefined 导致 removeEventListener 崩溃）
    if (wsStatus !== 'closed' && wsStatus !== 'idle') return;
    _utils_chatWS__WEBPACK_IMPORTED_MODULE_3__["default"].resetReconnect();
    connectWS();
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '正在重新连接...',
      icon: 'none'
    });
  }, [connectWS, wsStatus]);
  var conversationTitle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _ref5, _currentConversation$;
    return (_ref5 = (_currentConversation$ = currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.title) !== null && _currentConversation$ !== void 0 ? _currentConversation$ : currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.name) !== null && _ref5 !== void 0 ? _ref5 : '乐享购自营官方客服';
  }, [currentConversation]);
  var statusText = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    switch (wsStatus) {
      case 'idle':
        return '点击连接';
      case 'connecting':
        return '🔗 连接中...';
      case 'open':
        return '✓ 在线';
      case 'closing':
        return '断开中...';
      case 'closed':
        return '⚠ 已离线';
      default:
        return '';
    }
  }, [wsStatus]);
  var statusColor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    switch (wsStatus) {
      case 'open':
        return '#52c41a';
      case 'connecting':
        return '#faad14';
      case 'closed':
        return '#999';
      default:
        return '#999';
    }
  }, [wsStatus]);

  // 固定置顶的客服欢迎消息（每个会话消息列表最顶部都固定显示一条客服消息）
  var renderWelcomeMessage = function renderWelcomeMessage() {
    var _ref6, _currentConversation$2;
    var avatar = (_ref6 = (_currentConversation$2 = currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.serviceAvatar) !== null && _currentConversation$2 !== void 0 ? _currentConversation$2 : currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.avatar) !== null && _ref6 !== void 0 ? _ref6 : DEFAULT_AVATAR;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "".concat(_styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageWrap, " ").concat(_styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].other),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, {
        src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(avatar),
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].avatar,
        mode: "aspectFill"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageContent,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageText,
          children: ["\u60A8\u597D\uFF0C\u6211\u662F ", conversationTitle, "\uFF0C\u8BF7\u95EE\u6709\u4EC0\u4E48\u53EF\u4EE5\u5E2E\u60A8\uFF1F"]
        })
      })]
    });
  };
  var renderMessage = function renderMessage(msg) {
    var _ref7, _currentConversation$3;
    var isMe = msg.sender === 'user';
    var avatar = isMe ? USER_DEFAULT_AVATAR : (_ref7 = (_currentConversation$3 = currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.serviceAvatar) !== null && _currentConversation$3 !== void 0 ? _currentConversation$3 : currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.avatar) !== null && _ref7 !== void 0 ? _ref7 : DEFAULT_AVATAR;
    var statusBadge = isMe ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
      className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageStatus,
      children: [msg.status === 'sending' && '发送中...', msg.status === 'failed' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        style: {
          color: '#ef4444'
        },
        children: "\u53D1\u9001\u5931\u8D25"
      }), msg.status === 'read' && '已读', msg.status === 'sent' && '已送达']
    }) : null;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: "".concat(_styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageWrap, " ").concat(isMe ? _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].me : _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].other),
      children: [!isMe && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, {
        src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(avatar),
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].avatar,
        mode: "aspectFill"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageContent,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageText,
          children: msg.content
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageMeta,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].messageTime,
            children: (0,_utils_time__WEBPACK_IMPORTED_MODULE_11__.formatTime)(msg.createTime)
          }), statusBadge]
        })]
      }), isMe && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, {
        src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(avatar),
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].avatar,
        mode: "aspectFill"
      })]
    }, msg.id);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].customerServicePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].backBtn,
        onClick: function onClick() {
          leaveConversation();
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
        },
        children: "\u2190"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].headerCenter,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].headerTitle,
          children: conversationTitle
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].headerStatusRow,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: "".concat(_styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].headerStatus, " ws-").concat(wsStatus),
            style: {
              color: statusColor
            },
            onClick: handleReconnect,
            children: [statusText, (wsStatus === 'closed' || wsStatus === 'idle') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].reconnectHint,
              children: "\uFF08\u70B9\u51FB\u91CD\u8FDE\uFF09"
            })]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].headerRight
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.ScrollView, {
      scrollY: true,
      className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].chatContainer,
      scrollWithAnimation: true,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].dateDivider,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].dateText,
          children: "\u4ECA\u5929"
        })
      }), !initReady || messagesLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loadingState,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loadingText,
          children: "\u52A0\u8F7D\u6D88\u606F\u4E2D..."
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        children: [renderWelcomeMessage(), messages.map(renderMessage)]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quickActions,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].humanBtn,
          onClick: handleHumanService,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].humanIcon,
            children: "\u5BA2\u670D"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].humanText,
            children: "\u8F6C\u4EBA\u5DE5"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputBar,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Input, {
          className: _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
          placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u95EE\u9898...",
          value: inputValue,
          onInput: handleInputChange,
          onConfirm: handleSend,
          confirmType: "send",
          adjustPosition: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: "".concat(_styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sendBtn, " ").concat(!inputValue.trim() ? _styles_message_customer_service_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
          onClick: handleSend,
          children: "\u53D1\u9001"
        })]
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
/* harmony default export */ __webpack_exports__["default"] = ({"customerServicePage":"customer-service-module__customerServicePage___WLxlh","header":"customer-service-module__header___eGe6d","backBtn":"customer-service-module__backBtn___FKjGs","headerCenter":"customer-service-module__headerCenter___TMUue","headerTitle":"customer-service-module__headerTitle___VE2hJ","headerStatus":"customer-service-module__headerStatus____NUqJ","ws-open":"customer-service-module__ws-open___XBGUH","ws-connecting":"customer-service-module__ws-connecting___Asl6B","ws-closed":"customer-service-module__ws-closed___ZEIKM","ws-closing":"customer-service-module__ws-closing___jHB48","ws-idle":"customer-service-module__ws-idle___Ro_2U","headerStatusRow":"customer-service-module__headerStatusRow___B9Rz3","reconnectHint":"customer-service-module__reconnectHint___j8LBL","headerRight":"customer-service-module__headerRight___MixIO","chatContainer":"customer-service-module__chatContainer___v7zRZ","dateDivider":"customer-service-module__dateDivider___ttRin","dateText":"customer-service-module__dateText___hpcWv","loadingState":"customer-service-module__loadingState___dV_Og","emptyChat":"customer-service-module__emptyChat___UKgYw","loadingText":"customer-service-module__loadingText___Ff3DK","emptyChatIcon":"customer-service-module__emptyChatIcon___QuPlh","emptyChatText":"customer-service-module__emptyChatText___r1YXb","messageWrap":"customer-service-module__messageWrap___NCZxG","me":"customer-service-module__me___tHJON","other":"customer-service-module__other___J4vM5","avatar":"customer-service-module__avatar___RZN7I","messageContent":"customer-service-module__messageContent___YRMKD","messageText":"customer-service-module__messageText___UeVdU","messageMeta":"customer-service-module__messageMeta___DN_Rw","messageTime":"customer-service-module__messageTime___jlGim","messageStatus":"customer-service-module__messageStatus___EQJsP","bottomBar":"customer-service-module__bottomBar___za6qt","quickActions":"customer-service-module__quickActions___SJW78","humanBtn":"customer-service-module__humanBtn___Cfq7V","humanIcon":"customer-service-module__humanIcon___DsU_w","humanText":"customer-service-module__humanText___JeO4x","inputBar":"customer-service-module__inputBar___YmCAr","input":"customer-service-module__input___EHDrg","sendBtn":"customer-service-module__sendBtn___op9TU","disabled":"customer-service-module__disabled___JAsob"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/message/customer-service/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map