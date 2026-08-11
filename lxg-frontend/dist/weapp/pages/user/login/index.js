"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/login/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/login/index!./src/pages/user/login/index.tsx":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/login/index!./src/pages/user/login/index.tsx ***!
  \**************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/user */ "./src/api/user/index.ts");
/* harmony import */ var _api_user_normalize__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/api/user/normalize */ "./src/api/user/normalize.ts");
/* harmony import */ var _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/user/login.module.scss */ "./src/styles/user/login.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["window"];












/**
 * 将微信登录相关的后端错误映射为更易理解的提示
 * 主要用于区分"后端配置错误"与"用户操作错误"，方便排查
 */

function mapWechatError(err) {
  var msg = (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.msg) || '';
  var statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
  // 后端 500 内部错误（panic / 未捕获异常）
  if (statusCode === 500) {
    console.error('[微信登录] 后端 500 内部错误，请后端查看服务日志定位 panic 原因', err);
    return '登录服务异常，请稍后重试或联系客服';
  }
  // 后端调用微信接口时缺失 AppSecret
  if (msg.includes('41004') || /appsecret\s*missing/i.test(msg)) {
    console.error('[微信登录] 后端配置错误：缺失 AppSecret (41004)，请后端检查 WECHAT_APPSECRET 环境变量');
    return '微信登录服务配置异常，请联系客服';
  }
  // AppSecret 值错误
  if (msg.includes('40125') || /invalid\s*appsecret/i.test(msg)) {
    console.error('[微信登录] 后端配置错误：AppSecret 值无效 (40125)，请后端校验密钥');
    return '微信登录服务配置异常，请联系客服';
  }
  // code 无效或已过期
  if (msg.includes('40029') || /invalid\s*code/i.test(msg)) {
    return '微信授权已过期，请重试';
  }
  // code 已被使用
  if (msg.includes('40163') || /code\s*been\s*used/i.test(msg)) {
    return '登录请求重复，请重试';
  }
  // 缺少 code 参数
  if (msg.includes('41008') || /missing\s*code/i.test(msg)) {
    return '微信授权失败，请重试';
  }
  // 临时 token 过期
  if (/token\s*is\s*expired/i.test(msg) || /token\s*expired/i.test(msg) || msg.includes('token解析失败')) {
    return '登录超时，请重新登录';
  }
  // 兜底：如果是 HTTP 错误且后端未返回可读消息，显示通用提示
  if (statusCode && statusCode >= 500) {
    return '登录服务异常，请稍后重试';
  }
  return msg || '微信登录失败';
}
var LoginPage = function LoginPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    setUserInfo = _useAppContext.setUserInfo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState, 2),
    isRegister = _useState2[0],
    setIsRegister = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('account'),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState3, 2),
    loginMethod = _useState4[0],
    setLoginMethod = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState5, 2),
    isForgotPassword = _useState6[0],
    setIsForgotPassword = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState7, 2),
    phone = _useState8[0],
    setPhone = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState9, 2),
    password = _useState0[0],
    setPassword = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState1, 2),
    confirmPassword = _useState10[0],
    setConfirmPassword = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState11, 2),
    code = _useState12[0],
    setCode = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState14 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState13, 2),
    countdown = _useState14[0],
    setCountdown = _useState14[1];
  var countdownRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // 微信登录相关状态
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState15, 2),
    isWechatLogin = _useState16[0],
    setIsWechatLogin = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState18 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState17, 2),
    showPhoneAuthModal = _useState18[0],
    setShowPhoneAuthModal = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState20 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState19, 2),
    wechatTempToken = _useState20[0],
    setWechatTempToken = _useState20[1];
  // 防抖：避免快速重复点击导致同一 code 被多次发送
  var wechatLoginLockRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  // 记录临时 token 获取时间，用于判断是否过期（临时 token 有效期 1 分钟）
  var wechatTempTokenTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);

  // H5 宽屏隐藏微信登录：屏幕宽度大于 768px 视为非移动端，不显示微信登录
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState22 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState21, 2),
    showWechatLogin = _useState22[0],
    setShowWechatLogin = _useState22[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var checkScreenWidth = function checkScreenWidth() {
      // #ifdef H5
      var width = window.innerWidth;
      setShowWechatLogin(width <= 768);
      // #endif
      // #ifdef WEAPP
      setShowWechatLogin(true);
      // #endif
    };
    checkScreenWidth();
    // #ifdef H5
    window.addEventListener('resize', checkScreenWidth);
    return function () {
      return window.removeEventListener('resize', checkScreenWidth);
    };
    // #endif
  }, []);

  // 微信登录后设置密码相关状态
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState24 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState23, 2),
    showSetPasswordModal = _useState24[0],
    setShowSetPasswordModal = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState26 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState25, 2),
    newPassword = _useState26[0],
    setNewPassword = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState28 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState27, 2),
    confirmNewPassword = _useState28[0],
    setConfirmNewPassword = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState30 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState29, 2),
    isSettingPassword = _useState30[0],
    setIsSettingPassword = _useState30[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);
  var getCurrentDate = function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
  };

  // 登录/注册成功后跳转：有上一页则返回，否则跳到首页（避免直接进入登录页时 navigateBack 失败）
  var goBackOrHome = function goBackOrHome() {
    var pages = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentPages();
    if (pages.length > 1) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
        url: '/pages/home/index'
      });
    }
  };
  var saveUserSession = function saveUserSession(result) {
    var _ref, _result$data, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref0, _ref1, _ref10, _ref11, _ref12, _payload$token, _payload$user, _payload$user2, _payload$user3, _payload$user4, _payload$user5, _payload$user6, _payload$data, _payload$data2, _ref13, _ref14, _ref15, _payload$user_login, _payload$data3;
    var payload = (_ref = (_result$data = result === null || result === void 0 ? void 0 : result.data) !== null && _result$data !== void 0 ? _result$data : result) !== null && _ref !== void 0 ? _ref : {};
    console.log('[微信登录] saveUserSession 原始响应:', JSON.stringify(result));
    console.log('[微信登录] saveUserSession payload:', JSON.stringify(payload));
    // 注意：不包含 tempToken —— 临时 token 不能作为登录态保存
    // 兼容 token 在顶层或嵌套在 user 对象中的多种返回结构
    var token = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_ref9 = (_ref0 = (_ref1 = (_ref10 = (_ref11 = (_ref12 = (_payload$token = payload.token) !== null && _payload$token !== void 0 ? _payload$token : payload.Token) !== null && _ref12 !== void 0 ? _ref12 : payload.accessToken) !== null && _ref11 !== void 0 ? _ref11 : payload.access_token) !== null && _ref10 !== void 0 ? _ref10 : payload.userToken) !== null && _ref1 !== void 0 ? _ref1 : payload.user_token) !== null && _ref0 !== void 0 ? _ref0 : (_payload$user = payload.user) === null || _payload$user === void 0 ? void 0 : _payload$user.token) !== null && _ref9 !== void 0 ? _ref9 : (_payload$user2 = payload.user) === null || _payload$user2 === void 0 ? void 0 : _payload$user2.Token) !== null && _ref8 !== void 0 ? _ref8 : (_payload$user3 = payload.user) === null || _payload$user3 === void 0 ? void 0 : _payload$user3.accessToken) !== null && _ref7 !== void 0 ? _ref7 : (_payload$user4 = payload.user) === null || _payload$user4 === void 0 ? void 0 : _payload$user4.access_token) !== null && _ref6 !== void 0 ? _ref6 : (_payload$user5 = payload.user) === null || _payload$user5 === void 0 ? void 0 : _payload$user5.userToken) !== null && _ref5 !== void 0 ? _ref5 : (_payload$user6 = payload.user) === null || _payload$user6 === void 0 ? void 0 : _payload$user6.user_token) !== null && _ref4 !== void 0 ? _ref4 : (_payload$data = payload.data) === null || _payload$data === void 0 ? void 0 : _payload$data.token) !== null && _ref3 !== void 0 ? _ref3 : (_payload$data2 = payload.data) === null || _payload$data2 === void 0 ? void 0 : _payload$data2.Token) !== null && _ref2 !== void 0 ? _ref2 : '';
    var user = (_ref13 = (_ref14 = (_ref15 = (_payload$user_login = payload.user_login) !== null && _payload$user_login !== void 0 ? _payload$user_login : payload.user) !== null && _ref15 !== void 0 ? _ref15 : payload.userInfo) !== null && _ref14 !== void 0 ? _ref14 : (_payload$data3 = payload.data) === null || _payload$data3 === void 0 ? void 0 : _payload$data3.user) !== null && _ref13 !== void 0 ? _ref13 : payload;
    console.log('[微信登录] 提取的 token:', token ? "".concat(token.substring(0, 10), "...\uFF08\u957F\u5EA6:").concat(token.length, "\uFF09") : '空');
    console.log('[微信登录] 提取的 user:', user ? JSON.stringify(user).substring(0, 100) : '空');
    if (!token) {
      console.error('[微信登录] 登录响应中未找到有效 token，完整响应:', JSON.stringify(result));
      throw new Error('登录失败：未获取到用户凭证');
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('lxg_user', JSON.stringify({
      token: token,
      user: user
    }));
    var loggedInUser = {
      id: String(user.id || user.userId || ''),
      nickname: user.nickname || user.phone || phone,
      avatar: user.avatar || '',
      phone: user.phone || phone,
      accountName: user.accountName || user.phone || phone,
      gender: user.gender || '保密',
      birthday: user.birthday || '请填写您的生日',
      registerDate: user.registerDate || user.created_at || getCurrentDate(),
      email: user.email || '',
      isLoggedIn: true
    };
    setUserInfo(loggedInUser);
    return loggedInUser;
  };
  var startCountdown = function startCountdown() {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setCountdown(60);
    var timer = 60;
    countdownRef.current = setInterval(function () {
      timer--;
      setCountdown(timer);
      if (timer <= 0 && countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    }, 1000);
  };
  var sendCode = /*#__PURE__*/function () {
    var _ref16 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee() {
      var scene,
        _args = arguments,
        _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            scene = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'register';
            if (!(!phone || phone.length !== 11)) {
              _context.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            });
            return _context.a(2);
          case 1:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '发送中...'
            });
            _context.p = 2;
            if (!(scene === 'reset')) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.resetPasswordSendCode, {
              phone: phone
            }, {}, {}, false, false);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.n = 5;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.registerSendCode, {
              phone: phone
            }, {}, {}, true);
          case 5:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            startCountdown();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '验证码已发送',
              icon: 'success'
            });
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: _t.message || '验证码发送失败',
              icon: 'none'
            });
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[2, 6]]);
    }));
    return function sendCode() {
      return _ref16.apply(this, arguments);
    };
  }();
  var doLogin = /*#__PURE__*/function () {
    var _ref17 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee2() {
      var result, loggedInUser, profileRes, normalized, _t2, _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(!phone || phone.length !== 11)) {
              _context2.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            });
            return _context2.a(2);
          case 1:
            if (!(!password || password.length < 6)) {
              _context2.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '密码至少6位',
              icon: 'none'
            });
            return _context2.a(2);
          case 2:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '登录中...'
            });
            _context2.p = 3;
            _context2.n = 4;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.login, {
              phone: phone,
              password: password
            }, {}, {}, true);
          case 4:
            result = _context2.v;
            loggedInUser = saveUserSession(result); // 登录成功后获取完整用户信息
            _context2.p = 5;
            _context2.n = 6;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiGet)(_api_user__WEBPACK_IMPORTED_MODULE_4__.userApi.profile);
          case 6:
            profileRes = _context2.v;
            normalized = (0,_api_user_normalize__WEBPACK_IMPORTED_MODULE_10__.normalizeUserProfile)(profileRes);
            setUserInfo({
              id: normalized.id || loggedInUser.id,
              nickname: normalized.nickname || loggedInUser.nickname,
              avatar: normalized.avatar || loggedInUser.avatar,
              phone: normalized.phone || loggedInUser.phone,
              accountName: normalized.accountName || loggedInUser.accountName,
              gender: normalized.gender || loggedInUser.gender,
              birthday: normalized.birthday || loggedInUser.birthday,
              registerDate: normalized.registerDate || loggedInUser.registerDate,
              email: normalized.email || loggedInUser.email,
              isLoggedIn: true
            });
            _context2.n = 8;
            break;
          case 7:
            _context2.p = 7;
            _t2 = _context2.v;
            console.error('获取用户信息失败，使用登录返回信息:', _t2);
          case 8:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '登录成功',
              icon: 'success'
            });
            setTimeout(function () {
              goBackOrHome();
            }, 1500);
            _context2.n = 10;
            break;
          case 9:
            _context2.p = 9;
            _t3 = _context2.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: _t3.message || '登录失败',
              icon: 'none'
            });
          case 10:
            return _context2.a(2);
        }
      }, _callee2, null, [[5, 7], [3, 9]]);
    }));
    return function doLogin() {
      return _ref17.apply(this, arguments);
    };
  }();
  var doRegister = /*#__PURE__*/function () {
    var _ref18 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee3() {
      var result, _t4;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!(!phone || phone.length !== 11)) {
              _context3.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            });
            return _context3.a(2);
          case 1:
            if (!(!code || code.length !== 6)) {
              _context3.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请输入6位验证码',
              icon: 'none'
            });
            return _context3.a(2);
          case 2:
            if (!(!password || password.length < 6)) {
              _context3.n = 3;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '密码至少6位',
              icon: 'none'
            });
            return _context3.a(2);
          case 3:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '注册中...'
            });
            _context3.p = 4;
            _context3.n = 5;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.register, {
              phone: phone,
              code: code,
              password: password
            }, {}, {}, true);
          case 5:
            result = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            saveUserSession(result);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '注册成功',
              icon: 'success'
            });
            setTimeout(function () {
              goBackOrHome();
            }, 1500);
            _context3.n = 7;
            break;
          case 6:
            _context3.p = 6;
            _t4 = _context3.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: _t4.message || '注册失败',
              icon: 'none'
            });
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[4, 6]]);
    }));
    return function doRegister() {
      return _ref18.apply(this, arguments);
    };
  }();
  var handleAccountLogin = function handleAccountLogin() {
    if (isRegister) {
      doRegister();
    } else {
      doLogin();
    }
  };
  var handlePhoneLogin = function handlePhoneLogin() {
    if (isRegister) {
      doRegister();
    } else {
      doLogin();
    }
  };
  var handleForgotPassword = /*#__PURE__*/function () {
    var _ref19 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee4() {
      var _t5;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (!(!phone || phone.length !== 11)) {
              _context4.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            });
            return _context4.a(2);
          case 1:
            if (!(!code || code.length !== 6)) {
              _context4.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请输入6位验证码',
              icon: 'none'
            });
            return _context4.a(2);
          case 2:
            if (!(!password || password.length < 6)) {
              _context4.n = 3;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '密码至少6位',
              icon: 'none'
            });
            return _context4.a(2);
          case 3:
            if (!(password !== confirmPassword)) {
              _context4.n = 4;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '两次密码输入不一致',
              icon: 'none'
            });
            return _context4.a(2);
          case 4:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '重置密码中...'
            });
            _context4.p = 5;
            _context4.n = 6;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.resetPassword, {
              phone: phone,
              code: code,
              password: password
            }, {}, {}, false, false);
          case 6:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '密码重置成功',
              icon: 'success'
            });
            setTimeout(function () {
              setIsForgotPassword(false);
              setPhone('');
              setCode('');
              setPassword('');
              setConfirmPassword('');
            }, 1500);
            _context4.n = 8;
            break;
          case 7:
            _context4.p = 7;
            _t5 = _context4.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: _t5.message || '重置密码失败',
              icon: 'none'
            });
          case 8:
            return _context4.a(2);
        }
      }, _callee4, null, [[5, 7]]);
    }));
    return function handleForgotPassword() {
      return _ref19.apply(this, arguments);
    };
  }();

  // 微信登录
  var handleWechatLogin = /*#__PURE__*/function () {
    var _ref20 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee6() {
      var fetchWechatCode, callWeixinLogin, isRetryableWechatError, _code, freshCode, _t6, _t7, _t8;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (!(wechatLoginLockRef.current || isWechatLogin)) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            wechatLoginLockRef.current = true;
            setIsWechatLogin(true);

            // 清除可能残留的旧 token，避免污染本次登录
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().removeStorageSync('lxg_user');
            _context6.p = 2;
            // #ifdef WEAPP
            // 弹性模式：封装 Taro.login 为 Promise，便于重试时重新获取 code
            fetchWechatCode = function fetchWechatCode() {
              return new Promise(function (resolve, reject) {
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().login({
                  success: function success(res) {
                    return res.code ? resolve(res.code) : reject(new Error('获取微信授权失败'));
                  },
                  fail: function fail() {
                    return reject(new Error('微信登录失败'));
                  }
                });
              });
            }; // 核心登录逻辑：传入 code，调用后端接口并处理结果
            callWeixinLogin = /*#__PURE__*/function () {
              var _ref21 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee5(code) {
                var _ref22, _result$data2, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _payload$needPhone, _ref36, _ref37, _ref38, _payload$token2;
                var result, payload, needPhone, rawToken, token, tokenParts;
                return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context5) {
                  while (1) switch (_context5.n) {
                    case 0:
                      _context5.n = 1;
                      return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.wechatLogin, {
                        code: code
                      }, {}, {}, false);
                    case 1:
                      result = _context5.v;
                      // 步骤3：解析返回的 token 和布尔值
                      payload = (_ref22 = (_result$data2 = result === null || result === void 0 ? void 0 : result.data) !== null && _result$data2 !== void 0 ? _result$data2 : result) !== null && _ref22 !== void 0 ? _ref22 : {};
                      needPhone = (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_ref27 = (_ref28 = (_ref29 = (_ref30 = (_ref31 = (_ref32 = (_ref33 = (_ref34 = (_ref35 = (_payload$needPhone = payload.needPhone) !== null && _payload$needPhone !== void 0 ? _payload$needPhone : payload.need_phone) !== null && _ref35 !== void 0 ? _ref35 : payload.NeedPhone) !== null && _ref34 !== void 0 ? _ref34 : payload.isNewUser) !== null && _ref33 !== void 0 ? _ref33 : payload.is_new_user) !== null && _ref32 !== void 0 ? _ref32 : payload.IsNewUser) !== null && _ref31 !== void 0 ? _ref31 : payload.bindPhone) !== null && _ref30 !== void 0 ? _ref30 : payload.bind_phone) !== null && _ref29 !== void 0 ? _ref29 : payload.BindPhone) !== null && _ref28 !== void 0 ? _ref28 : payload.needBindPhone) !== null && _ref27 !== void 0 ? _ref27 : payload.need_bind_phone) !== null && _ref26 !== void 0 ? _ref26 : payload.isRegister) !== null && _ref25 !== void 0 ? _ref25 : payload.is_register) !== null && _ref24 !== void 0 ? _ref24 : payload.IsRegister) !== null && _ref23 !== void 0 ? _ref23 : false; // 提取 token 并 trim，防止首尾空白/BOM 导致后端解析失败
                      rawToken = (_ref36 = (_ref37 = (_ref38 = (_payload$token2 = payload.token) !== null && _payload$token2 !== void 0 ? _payload$token2 : payload.Token) !== null && _ref38 !== void 0 ? _ref38 : payload.tempToken) !== null && _ref37 !== void 0 ? _ref37 : payload.temp_token) !== null && _ref36 !== void 0 ? _ref36 : '';
                      token = typeof rawToken === 'string' ? rawToken.trim() : ''; // 诊断日志：分析 weixinlogin 返回的 token 结构，帮助后端定位 weixinphone 解析失败问题
                      tokenParts = token ? token.split('.') : [];
                      console.log('[微信登录] weixinlogin 返回:', {
                        needPhone: needPhone,
                        hasToken: !!token,
                        tokenLength: token.length,
                        tokenPrefix: token ? token.substring(0, 20) : '',
                        tokenSuffix: token ? token.substring(Math.max(0, token.length - 20)) : '',
                        // JWT 由 3 段用 . 分隔的 base64 组成；若分段数≠3 说明不是标准 JWT
                        isJwtFormat: tokenParts.length === 3,
                        tokenPartsCount: tokenParts.length,
                        payloadFields: Object.keys(payload),
                        rawPayload: JSON.stringify(payload).substring(0, 300)
                      });
                      if (needPhone && token) {
                        // 步骤4：布尔值为 true，token 是专用于第二个接口的临时 token（1分钟有效期）
                        setWechatTempToken(token);
                        wechatTempTokenTimeRef.current = Date.now();
                        setShowPhoneAuthModal(true);
                      } else {
                        // 步骤5：布尔值为 false，token 是正常的 240 小时用户 token
                        saveUserSession(result);
                        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                          title: '登录成功',
                          icon: 'success'
                        });
                        setTimeout(function () {
                          goBackOrHome();
                        }, 1500);
                      }
                    case 2:
                      return _context5.a(2);
                  }
                }, _callee5);
              }));
              return function callWeixinLogin(_x) {
                return _ref21.apply(this, arguments);
              };
            }(); // 判断是否为可重试的瞬时错误（40029 invalid code 等）
            isRetryableWechatError = function isRetryableWechatError(err) {
              var msg = (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.msg) || '';
              return msg.includes('40029') || /invalid\s*code/i.test(msg) || msg.includes('40163') || /code\s*been\s*used/i.test(msg);
            };
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '微信登录中...'
            });
            _context6.p = 3;
            _context6.n = 4;
            return fetchWechatCode();
          case 4:
            _code = _context6.v;
            console.log("[\u5FAE\u4FE1\u767B\u5F55] code \u83B7\u53D6\u6210\u529F\uFF0C\u524D\u7F00: ".concat(_code.substring(0, 8), "...\uFF0C\u957F\u5EA6: ").concat(_code.length));

            // 步骤2：调用微信登录接口
            _context6.p = 5;
            _context6.n = 6;
            return callWeixinLogin(_code);
          case 6:
            _context6.n = 11;
            break;
          case 7:
            _context6.p = 7;
            _t6 = _context6.v;
            if (!isRetryableWechatError(_t6)) {
              _context6.n = 10;
              break;
            }
            console.warn('[微信登录] 首次请求失败（瞬时错误），重新获取 code 并重试:', _t6.message);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '重新登录中...'
            });
            _context6.n = 8;
            return fetchWechatCode();
          case 8:
            freshCode = _context6.v;
            console.log("[\u5FAE\u4FE1\u767B\u5F55] \u91CD\u8BD5 code \u83B7\u53D6\u6210\u529F\uFF0C\u524D\u7F00: ".concat(freshCode.substring(0, 8), "..."));
            _context6.n = 9;
            return callWeixinLogin(freshCode);
          case 9:
            _context6.n = 11;
            break;
          case 10:
            throw _t6;
          case 11:
            _context6.n = 13;
            break;
          case 12:
            _context6.p = 12;
            _t7 = _context6.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: mapWechatError(_t7),
              icon: 'none'
            });
          case 13:
            _context6.p = 13;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            setIsWechatLogin(false);
            wechatLoginLockRef.current = false;
            return _context6.f(13);
          case 14:
            // #endif

            // #ifdef H5
            // H5 端无法调用 Taro.login 获取微信 code，提示用户在微信小程序中打开
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请在微信小程序中打开',
              icon: 'none'
            });
            setIsWechatLogin(false);
            wechatLoginLockRef.current = false;
            // #endif
            _context6.n = 16;
            break;
          case 15:
            _context6.p = 15;
            _t8 = _context6.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: mapWechatError(_t8),
              icon: 'none'
            });
            setIsWechatLogin(false);
            wechatLoginLockRef.current = false;
          case 16:
            return _context6.a(2);
        }
      }, _callee6, null, [[5, 7], [3, 12, 13, 14], [2, 15]]);
    }));
    return function handleWechatLogin() {
      return _ref20.apply(this, arguments);
    };
  }();

  // 获取微信手机号
  // 步骤4（续）：用户点击「获取手机号」按钮后，微信返回一个与登录 code 不同的 phone code
  // 然后调用第二个接口 weixinphone，传递参数：code, token
  var handleGetPhoneNumber = /*#__PURE__*/function () {
    var _ref39 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee8(e) {
      var phoneCode, refreshTempToken, currentToken, tokenAge, result, savedToken, errMsg, freshToken, retryResult, retryToken, _t9, _t0;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (!(e.detail.errMsg && e.detail.errMsg.indexOf('ok') === -1)) {
              _context8.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '已取消手机号授权',
              icon: 'none'
            });
            return _context8.a(2);
          case 1:
            phoneCode = e.detail.code;
            if (phoneCode) {
              _context8.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '获取手机号授权码失败',
              icon: 'none'
            });
            return _context8.a(2);
          case 2:
            if (wechatTempToken) {
              _context8.n = 3;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '登录态异常，请重新登录',
              icon: 'none'
            });
            setShowPhoneAuthModal(false);
            return _context8.a(2);
          case 3:
            // 刷新临时 token：重新获取 loginCode 并调用 weixinlogin
            // 用于 token 过期或快过期时自动刷新，避免用户重新操作
            refreshTempToken = /*#__PURE__*/function () {
              var _ref40 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee7() {
                var _ref41, _loginResult$data, _ref42, _ref43, _ref44, _loginPayload$token;
                var newCode, loginResult, loginPayload, rawNewToken, newToken;
                return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context7) {
                  while (1) switch (_context7.n) {
                    case 0:
                      console.log('[微信登录] 临时 token 过期，自动刷新中...');
                      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
                        title: '刷新登录态...'
                      });
                      _context7.n = 1;
                      return new Promise(function (resolve, reject) {
                        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().login({
                          success: function success(res) {
                            return res.code ? resolve(res.code) : reject(new Error('获取微信授权失败'));
                          },
                          fail: function fail() {
                            return reject(new Error('微信登录失败'));
                          }
                        });
                      });
                    case 1:
                      newCode = _context7.v;
                      _context7.n = 2;
                      return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.wechatLogin, {
                        code: newCode
                      }, {}, {}, false);
                    case 2:
                      loginResult = _context7.v;
                      loginPayload = (_ref41 = (_loginResult$data = loginResult === null || loginResult === void 0 ? void 0 : loginResult.data) !== null && _loginResult$data !== void 0 ? _loginResult$data : loginResult) !== null && _ref41 !== void 0 ? _ref41 : {};
                      rawNewToken = (_ref42 = (_ref43 = (_ref44 = (_loginPayload$token = loginPayload.token) !== null && _loginPayload$token !== void 0 ? _loginPayload$token : loginPayload.Token) !== null && _ref44 !== void 0 ? _ref44 : loginPayload.tempToken) !== null && _ref43 !== void 0 ? _ref43 : loginPayload.temp_token) !== null && _ref42 !== void 0 ? _ref42 : '';
                      newToken = typeof rawNewToken === 'string' ? rawNewToken.trim() : '';
                      if (newToken) {
                        _context7.n = 3;
                        break;
                      }
                      throw new Error('刷新登录态失败');
                    case 3:
                      setWechatTempToken(newToken);
                      wechatTempTokenTimeRef.current = Date.now();
                      console.log('[微信登录] 临时 token 刷新成功，长度:', newToken.length);
                      return _context7.a(2, newToken);
                  }
                }, _callee7);
              }));
              return function refreshTempToken() {
                return _ref40.apply(this, arguments);
              };
            }(); // 检查临时 token 是否快过期（超过 40 秒就刷新，确保 weixinphone 调用时 token 仍有效）
            currentToken = wechatTempToken;
            tokenAge = Date.now() - wechatTempTokenTimeRef.current;
            _context8.p = 4;
            if (!(tokenAge > 40000)) {
              _context8.n = 6;
              break;
            }
            console.warn("[\u5FAE\u4FE1\u767B\u5F55] \u4E34\u65F6 token \u5E74\u9F84 ".concat(Math.floor(tokenAge / 1000), "\u79D2\uFF0C\u81EA\u52A8\u5237\u65B0"));
            _context8.n = 5;
            return refreshTempToken();
          case 5:
            currentToken = _context8.v;
            _context8.n = 7;
            break;
          case 6:
            console.log("[\u5FAE\u4FE1\u767B\u5F55] \u4E34\u65F6 token \u5E74\u9F84: ".concat(Math.floor(tokenAge / 1000), "\u79D2\uFF0C\u6709\u6548"));
          case 7:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '登录中...'
            });
            // 调用第二个接口：获取微信手机号，传递 code 和 token
            // 后端 weixinphone 接口需要 Authorization 头认证（临时 token）
            // 同时请求体也传 token，满足后端双重校验需求
            console.log('[微信登录] 调用 weixinphone，参数:', {
              phoneCodePrefix: phoneCode.substring(0, 8) + '...',
              phoneCodeLength: phoneCode.length,
              tokenPrefix: currentToken.substring(0, 15) + '...',
              tokenLength: currentToken.length,
              authHeader: "Bearer ".concat(currentToken.substring(0, 15), "...")
            });
            _context8.n = 8;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.wechatPhone, {
              code: phoneCode,
              token: currentToken
            }, {}, {}, false, false, {
              'Authorization': "Bearer ".concat(currentToken)
            });
          case 8:
            result = _context8.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();

            // 步骤6：获取登录成功响应
            saveUserSession(result);

            // 校验是否成功提取到用户 token
            savedToken = JSON.parse(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('lxg_user') || '{}').token;
            if (savedToken) {
              _context8.n = 9;
              break;
            }
            console.error('[微信登录] weixinphone 响应中未找到用户 token，响应结构:', JSON.stringify(result));
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '登录异常，请重试',
              icon: 'none'
            });
            return _context8.a(2);
          case 9:
            // 登录成功后：关闭手机号弹窗，弹出设置密码弹窗
            // 微信新用户无密码，需要设置密码以便后续账号密码登录
            setShowPhoneAuthModal(false);
            setWechatTempToken('');
            setShowSetPasswordModal(true);
            _context8.n = 17;
            break;
          case 10:
            _context8.p = 10;
            _t9 = _context8.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            // 如果是 token 过期/解析失败，尝试刷新 token 并重试一次（phoneCode 仍有效）
            errMsg = (_t9 === null || _t9 === void 0 ? void 0 : _t9.message) || (_t9 === null || _t9 === void 0 ? void 0 : _t9.msg) || '';
            if (!(/token\s*(is\s*)?expired/i.test(errMsg) || errMsg.includes('token解析失败') || errMsg.includes('缺少认证信息'))) {
              _context8.n = 16;
              break;
            }
            console.warn('[微信登录] weixinphone 调用失败（token 问题），尝试刷新 token 并重试:', errMsg);
            _context8.p = 11;
            _context8.n = 12;
            return refreshTempToken();
          case 12:
            freshToken = _context8.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '登录中...'
            });
            _context8.n = 13;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.wechatPhone, {
              code: phoneCode,
              token: freshToken
            }, {}, {}, false, false, {
              'Authorization': "Bearer ".concat(freshToken)
            });
          case 13:
            retryResult = _context8.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            saveUserSession(retryResult);
            retryToken = JSON.parse(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('lxg_user') || '{}').token;
            if (retryToken) {
              _context8.n = 14;
              break;
            }
            console.error('[微信登录] 重试后仍未找到用户 token，响应结构:', JSON.stringify(retryResult));
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '登录异常，请重试',
              icon: 'none'
            });
            return _context8.a(2);
          case 14:
            // 重试成功：同样弹出设置密码弹窗
            setShowPhoneAuthModal(false);
            setWechatTempToken('');
            setShowSetPasswordModal(true);
            return _context8.a(2);
          case 15:
            _context8.p = 15;
            _t0 = _context8.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            console.error('[微信登录] 刷新 token 重试失败:', _t0);
            setWechatTempToken('');
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: mapWechatError(_t0),
              icon: 'none'
            });
            return _context8.a(2);
          case 16:
            setWechatTempToken('');
            // 步骤6：获取登录失败响应
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: mapWechatError(_t9),
              icon: 'none'
            });
          case 17:
            return _context8.a(2);
        }
      }, _callee8, null, [[11, 15], [4, 10]]);
    }));
    return function handleGetPhoneNumber(_x2) {
      return _ref39.apply(this, arguments);
    };
  }();

  // 微信登录后设置密码
  // 调用 POST /api/v1/auth/setpassword，需用户已登录（带正式 token）
  var handleSetPassword = /*#__PURE__*/function () {
    var _ref45 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee9() {
      var _t1;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            if (!isSettingPassword) {
              _context9.n = 1;
              break;
            }
            return _context9.a(2);
          case 1:
            if (!(!newPassword || newPassword.length < 6)) {
              _context9.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '密码至少6位',
              icon: 'none'
            });
            return _context9.a(2);
          case 2:
            if (!(newPassword !== confirmNewPassword)) {
              _context9.n = 3;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '两次密码输入不一致',
              icon: 'none'
            });
            return _context9.a(2);
          case 3:
            setIsSettingPassword(true);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '设置中...'
            });
            _context9.p = 4;
            _context9.n = 5;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.setPassword, {
              password: newPassword
            }, {}, {}, false);
          case 5:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            setShowSetPasswordModal(false);
            setNewPassword('');
            setConfirmNewPassword('');
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '密码设置成功',
              icon: 'success'
            });
            setTimeout(function () {
              goBackOrHome();
            }, 1500);
            _context9.n = 7;
            break;
          case 6:
            _context9.p = 6;
            _t1 = _context9.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            console.error('[微信登录] 设置密码失败:', _t1);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: (_t1 === null || _t1 === void 0 ? void 0 : _t1.message) || '设置密码失败',
              icon: 'none'
            });
          case 7:
            _context9.p = 7;
            setIsSettingPassword(false);
            return _context9.f(7);
          case 8:
            return _context9.a(2);
        }
      }, _callee9, null, [[4, 6, 7, 8]]);
    }));
    return function handleSetPassword() {
      return _ref45.apply(this, arguments);
    };
  }();

  // 跳过设置密码，直接返回上一页
  var skipSetPassword = function skipSetPassword() {
    setShowSetPasswordModal(false);
    setNewPassword('');
    setConfirmNewPassword('');
    goBackOrHome();
  };
  var toggleRegisterMode = function toggleRegisterMode() {
    setIsRegister(!isRegister);
    setPassword('');
    setConfirmPassword('');
    setCode('');
  };
  var switchToPhoneLogin = function switchToPhoneLogin() {
    setLoginMethod('phone');
    setPassword('');
    setConfirmPassword('');
  };
  var switchToAccountLogin = function switchToAccountLogin() {
    setLoginMethod('account');
    setCode('');
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
    className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loginPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].logoSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].logo,
        children: "\uD83D\uDED2"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].appName,
        children: "\u4E50\u4EAB\u8D2D"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loginForm,
      children: isForgotPassword ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].formTitle,
          children: "\u5FD8\u8BB0\u5BC6\u7801"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u624B\u673A\u53F7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDCF1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              type: "number",
              maxlength: 11,
              placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
              value: phone,
              onInput: function onInput(e) {
                return setPhone(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u9A8C\u8BC1\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDD10"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              type: "number",
              maxlength: 6,
              placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
              value: code,
              onInput: function onInput(e) {
                return setCode(e.detail.value);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].codeBtn, " ").concat(countdown > 0 ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
              onClick: countdown === 0 ? function () {
                return sendCode('reset');
              } : undefined,
              children: countdown > 0 ? "".concat(countdown, "s") : '获取验证码'
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u65B0\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              password: true,
              placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
              value: password,
              onInput: function onInput(e) {
                return setPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u786E\u8BA4\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              password: true,
              placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
              value: confirmPassword,
              onInput: function onInput(e) {
                return setConfirmPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loginBtn,
          onClick: handleForgotPassword,
          children: "\u91CD\u7F6E\u5BC6\u7801"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleMode,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleLink,
            onClick: function onClick() {
              setIsForgotPassword(false);
              setPhone('');
              setCode('');
              setPassword('');
              setConfirmPassword('');
            },
            children: "\u8FD4\u56DE\u767B\u5F55"
          })
        })]
      }) : loginMethod === 'account' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].formTitle,
          children: isRegister ? '手机号注册' : '手机号登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u624B\u673A\u53F7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDCF1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              type: "number",
              maxlength: 11,
              placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
              value: phone,
              onInput: function onInput(e) {
                return setPhone(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: isRegister ? '验证码' : '密码'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: isRegister ? '🔐' : '🔑'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              type: isRegister ? 'number' : 'text',
              password: !isRegister,
              maxlength: isRegister ? 6 : undefined,
              placeholder: isRegister ? '请输入验证码' : '请输入密码（至少6位）',
              value: isRegister ? code : password,
              onInput: function onInput(e) {
                return isRegister ? setCode(e.detail.value) : setPassword(e.detail.value);
              }
            }), isRegister && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].codeBtn, " ").concat(countdown > 0 ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
              onClick: countdown === 0 ? function () {
                return sendCode('register');
              } : undefined,
              children: countdown > 0 ? "".concat(countdown, "s") : '获取验证码'
            })]
          })]
        }), isRegister && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              password: true,
              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
              value: password,
              onInput: function onInput(e) {
                return setPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loginBtn,
          onClick: handleAccountLogin,
          children: isRegister ? '注册' : '登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleMode,
          children: isRegister ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleText,
              children: "\u5DF2\u6709\u8D26\u53F7\uFF1F"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u767B\u5F55"
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleLink,
              onClick: function onClick() {
                setIsForgotPassword(true);
                setPassword('');
              },
              children: "\u5FD8\u8BB0\u5BC6\u7801"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].divider,
              children: "|"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u6CE8\u518C"
            })]
          })
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].formTitle,
          children: isRegister ? '手机号注册' : '手机号登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u624B\u673A\u53F7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDCF1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              type: "number",
              maxlength: 11,
              placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
              value: phone,
              onInput: function onInput(e) {
                return setPhone(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: isRegister ? '验证码' : '密码'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: isRegister ? '🔐' : '🔑'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              type: isRegister ? 'number' : 'text',
              password: !isRegister,
              maxlength: isRegister ? 6 : undefined,
              placeholder: isRegister ? '请输入验证码' : '请输入密码（至少6位）',
              value: isRegister ? code : password,
              onInput: function onInput(e) {
                return isRegister ? setCode(e.detail.value) : setPassword(e.detail.value);
              }
            }), isRegister && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].codeBtn, " ").concat(countdown > 0 ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
              onClick: countdown === 0 ? function () {
                return sendCode('register');
              } : undefined,
              children: countdown > 0 ? "".concat(countdown, "s") : '获取验证码'
            })]
          })]
        }), isRegister && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputLabel,
            children: "\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].inputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].input,
              password: true,
              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
              value: password,
              onInput: function onInput(e) {
                return setPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loginBtn,
          onClick: handlePhoneLogin,
          children: isRegister ? '注册' : '登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleMode,
          children: isRegister ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleText,
              children: "\u5DF2\u6709\u8D26\u53F7\uFF1F"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u767B\u5F55"
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleLink,
              onClick: function onClick() {
                setIsForgotPassword(true);
                setPassword('');
              },
              children: "\u5FD8\u8BB0\u5BC6\u7801"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].divider,
              children: "|"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u6CE8\u518C"
            })]
          })
        })]
      })
    }), !isRegister && !isForgotPassword && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].thirdPartyLogin,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].divider,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].dividerLine
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].dividerText,
          children: "\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].dividerLine
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loginMethods,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodItem,
          onClick: switchToAccountLogin,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodIcon,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].iconText,
              children: "\uD83D\uDC64"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodLabel,
            children: "\u8D26\u53F7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodItem,
          onClick: switchToPhoneLogin,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodIcon,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].iconText,
              children: "\uD83D\uDCF1"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodLabel,
            children: "\u624B\u673A"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodItem, " ").concat(isWechatLogin ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabledMethod : '', " ").concat(showWechatLogin ? '' : _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodItemHidden),
          onClick: isWechatLogin ? undefined : handleWechatLogin,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodIcon,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].iconText,
              children: "\uD83D\uDCAC"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodLabel,
            children: "\u5FAE\u4FE1"
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].agreement,
      children: [isRegister ? '注册即表示同意' : '登录即表示同意', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].link,
        children: "\u300A\u7528\u6237\u534F\u8BAE\u300B"
      }), "\u548C", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].link,
        children: "\u300A\u9690\u79C1\u653F\u7B56\u300B"
      })]
    }), showPhoneAuthModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalOverlay,
      onClick: function onClick() {
        return setShowPhoneAuthModal(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalContent,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalTitle,
          children: "\u7ED1\u5B9A\u624B\u673A\u53F7"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalDesc,
          children: "\u5FAE\u4FE1\u767B\u5F55\u9700\u8981\u7ED1\u5B9A\u624B\u673A\u53F7\uFF0C\u8BF7\u5C3D\u5FEB\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u5B8C\u6210\u6388\u6743\uFF081\u5206\u949F\u5185\u6709\u6548\uFF09"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Button, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalBtn,
          openType: "getPhoneNumber",
          onGetPhoneNumber: handleGetPhoneNumber,
          children: "\u83B7\u53D6\u624B\u673A\u53F7"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalBtn,
          onClick: function onClick() {
            // H5 端模拟获取手机号
            handleGetPhoneNumber({
              detail: {
                code: 'test_h5_phone_code',
                errMsg: 'getPhoneNumber:ok'
              }
            });
          },
          children: "\u83B7\u53D6\u624B\u673A\u53F7"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalCancel,
          onClick: function onClick() {
            setShowPhoneAuthModal(false);
            setWechatTempToken('');
            wechatTempTokenTimeRef.current = 0;
          },
          children: "\u53D6\u6D88"
        })]
      })
    }), showSetPasswordModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalOverlay,
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalContent,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalTitle,
          children: "\u8BBE\u7F6E\u767B\u5F55\u5BC6\u7801"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalDesc,
          children: "\u5FAE\u4FE1\u767B\u5F55\u6210\u529F\uFF0C\u8BF7\u4E3A\u8D26\u53F7\u8BBE\u7F6E\u767B\u5F55\u5BC6\u7801\uFF0C\u4EE5\u4FBF\u540E\u7EED\u4F7F\u7528\u8D26\u53F7\u5BC6\u7801\u767B\u5F55"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputLabel,
            children: "\u65B0\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInput,
              password: true,
              placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
              value: newPassword,
              onInput: function onInput(e) {
                return setNewPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputLabel,
            children: "\u786E\u8BA4\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalInput,
              password: true,
              placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
              value: confirmNewPassword,
              onInput: function onInput(e) {
                return setConfirmNewPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalLoginBtn, " ").concat(isSettingPassword ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
          onClick: isSettingPassword ? undefined : handleSetPassword,
          children: isSettingPassword ? '设置中...' : '确认设置'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalCancel,
          onClick: skipSetPassword,
          children: "\u8DF3\u8FC7"
        })]
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (LoginPage);

/***/ }),

/***/ "./src/pages/user/login/index.tsx":
/*!****************************************!*\
  !*** ./src/pages/user/login/index.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/login/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/login/index!./src/pages/user/login/index.tsx");


var config = {"navigationBarTitleText":"登录","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/user/login/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/user/login.module.scss":
/*!*******************************************!*\
  !*** ./src/styles/user/login.module.scss ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"loginPage":"login-module__loginPage___W8U9L","logoSection":"login-module__logoSection___e8abO","logo":"login-module__logo___a_MDx","appName":"login-module__appName___gvWUx","loginForm":"login-module__loginForm___w1s3V","formTitle":"login-module__formTitle___SKvMr","inputGroup":"login-module__inputGroup___qr5C1","inputLabel":"login-module__inputLabel___djooA","inputRow":"login-module__inputRow___oXV5b","inputIcon":"login-module__inputIcon___GYfF3","input":"login-module__input___AQnaE","codeBtn":"login-module__codeBtn___qCXEL","disabled":"login-module__disabled___GafuM","loginBtn":"login-module__loginBtn____edwc","toggleMode":"login-module__toggleMode___aiaIS","toggleText":"login-module__toggleText___XulHI","toggleLink":"login-module__toggleLink___Zf98u","divider":"login-module__divider___XnKxP","wechatLoginBox":"login-module__wechatLoginBox___idU_t","wechatHint":"login-module__wechatHint___t_Dcj","forgotPassword":"login-module__forgotPassword___RnDw3","thirdPartyLogin":"login-module__thirdPartyLogin___XPTj7","dividerLine":"login-module__dividerLine___KYilS","dividerText":"login-module__dividerText___efV7f","loginMethods":"login-module__loginMethods___iYYZZ","methodItem":"login-module__methodItem___apctX","methodIcon":"login-module__methodIcon___bI8Dg","iconText":"login-module__iconText___NzYM4","methodLabel":"login-module__methodLabel___XdswD","methodItemHidden":"login-module__methodItemHidden___xwA39","agreement":"login-module__agreement___Notpt","link":"login-module__link___pEsbr","disabledMethod":"login-module__disabledMethod___XBJzz","modalOverlay":"login-module__modalOverlay___DyXvo","modalContent":"login-module__modalContent___UNKsS","modalTitle":"login-module__modalTitle___kxTFu","modalDesc":"login-module__modalDesc___aD57W","modalBtn":"login-module__modalBtn___b1VZN","modalCancel":"login-module__modalCancel___9yXvW","modalInputGroup":"login-module__modalInputGroup___XLoZi","modalInputLabel":"login-module__modalInputLabel___ENLZ4","modalInputRow":"login-module__modalInputRow___Rwu15","modalInputIcon":"login-module__modalInputIcon___k5FpG","modalInput":"login-module__modalInput___jGd1N","modalLoginBtn":"login-module__modalLoginBtn___hSeXb"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/login/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map