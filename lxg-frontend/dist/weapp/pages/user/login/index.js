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
    showSetPasswordModal = _useState18[0],
    setShowSetPasswordModal = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState20 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState19, 2),
    wechatTempToken = _useState20[0],
    setWechatTempToken = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState22 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState21, 2),
    wechatSetPassword = _useState22[0],
    setWechatSetPassword = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState24 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState23, 2),
    wechatConfirmPassword = _useState24[0],
    setWechatConfirmPassword = _useState24[1];
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
  var saveUserSession = function saveUserSession(result) {
    var _ref, _result$data, _ref2, _ref3, _payload$token, _ref4, _ref5, _payload$user_login;
    var payload = (_ref = (_result$data = result === null || result === void 0 ? void 0 : result.data) !== null && _result$data !== void 0 ? _result$data : result) !== null && _ref !== void 0 ? _ref : {};
    var token = (_ref2 = (_ref3 = (_payload$token = payload.token) !== null && _payload$token !== void 0 ? _payload$token : payload.accessToken) !== null && _ref3 !== void 0 ? _ref3 : payload.tempToken) !== null && _ref2 !== void 0 ? _ref2 : '';
    var user = (_ref4 = (_ref5 = (_payload$user_login = payload.user_login) !== null && _payload$user_login !== void 0 ? _payload$user_login : payload.user) !== null && _ref5 !== void 0 ? _ref5 : payload.userInfo) !== null && _ref4 !== void 0 ? _ref4 : payload;
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
    var _ref6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee() {
      var _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
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
            _context.n = 3;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.registerSendCode, {
              phone: phone
            }, {}, {}, true);
          case 3:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            startCountdown();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '验证码已发送',
              icon: 'success'
            });
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: _t.message || '验证码发送失败',
              icon: 'none'
            });
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4]]);
    }));
    return function sendCode() {
      return _ref6.apply(this, arguments);
    };
  }();
  var doLogin = /*#__PURE__*/function () {
    var _ref7 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee2() {
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
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
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
      return _ref7.apply(this, arguments);
    };
  }();
  var doRegister = /*#__PURE__*/function () {
    var _ref8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee3() {
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
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
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
      return _ref8.apply(this, arguments);
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
  var handleForgotPassword = function handleForgotPassword() {
    if (!phone || phone.length !== 11) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    if (!code || code.length !== 6) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入6位验证码',
        icon: 'none'
      });
      return;
    }
    if (!password || password.length < 6) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '密码至少6位',
        icon: 'none'
      });
      return;
    }
    if (password !== confirmPassword) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      });
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
      title: '重置密码中...'
    });
    setTimeout(function () {
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
    }, 1500);
  };

  // 微信登录
  var handleWechatLogin = /*#__PURE__*/function () {
    var _ref9 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee5() {
      var result, _error$response3, _error$response4, errCode, tempToken, _t6, _t7;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            setIsWechatLogin(true);
            _context5.p = 1;
            // #ifdef WEAPP
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().login({
              success: function () {
                var _success = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee4(res) {
                  var result, _error$response, _error$response2, errCode, tempToken, _t5;
                  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context4) {
                    while (1) switch (_context4.p = _context4.n) {
                      case 0:
                        if (!res.code) {
                          _context4.n = 5;
                          break;
                        }
                        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
                          title: '微信登录中...'
                        });
                        _context4.p = 1;
                        _context4.n = 2;
                        return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.wechatLogin, {
                          code: res.code
                        }, {}, {}, true);
                      case 2:
                        result = _context4.v;
                        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
                        handleWechatLoginResult(result);
                        _context4.n = 4;
                        break;
                      case 3:
                        _context4.p = 3;
                        _t5 = _context4.v;
                        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
                        // 如果返回需要设置密码的错误码
                        errCode = _t5 === null || _t5 === void 0 ? void 0 : _t5.code;
                        tempToken = (_t5 === null || _t5 === void 0 || (_error$response = _t5.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.tempToken) || (_t5 === null || _t5 === void 0 || (_error$response2 = _t5.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.token) || '';
                        if (tempToken && (errCode === 403 || errCode === 422 || errCode === 400)) {
                          setWechatTempToken(tempToken);
                          setShowSetPasswordModal(true);
                          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                            title: '请设置登录密码',
                            icon: 'none'
                          });
                        } else {
                          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                            title: _t5.message || '微信登录失败',
                            icon: 'none'
                          });
                        }
                      case 4:
                        _context4.n = 6;
                        break;
                      case 5:
                        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                          title: '获取微信授权失败',
                          icon: 'none'
                        });
                        setIsWechatLogin(false);
                      case 6:
                        return _context4.a(2);
                    }
                  }, _callee4, null, [[1, 3]]);
                }));
                function success(_x) {
                  return _success.apply(this, arguments);
                }
                return success;
              }(),
              fail: function fail() {
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: '微信登录失败',
                  icon: 'none'
                });
                setIsWechatLogin(false);
              }
            });
            // #endif

            // #ifdef H5
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '微信登录中...'
            });
            // H5端模拟微信登录，实际需要跳转到微信授权页面
            // 这里先调用后端接口进行测试
            _context5.p = 2;
            _context5.n = 3;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.wechatLogin, {
              openid: 'test_h5_openid'
            }, {}, {}, true);
          case 3:
            result = _context5.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            handleWechatLoginResult(result);
            _context5.n = 5;
            break;
          case 4:
            _context5.p = 4;
            _t6 = _context5.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            errCode = _t6 === null || _t6 === void 0 ? void 0 : _t6.code;
            tempToken = (_t6 === null || _t6 === void 0 || (_error$response3 = _t6.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.tempToken) || (_t6 === null || _t6 === void 0 || (_error$response4 = _t6.response) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.data) === null || _error$response4 === void 0 ? void 0 : _error$response4.token) || '';
            if (tempToken && (errCode === 403 || errCode === 422 || errCode === 400)) {
              setWechatTempToken(tempToken);
              setShowSetPasswordModal(true);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '请设置登录密码',
                icon: 'none'
              });
            } else {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: _t6.message || '微信登录失败',
                icon: 'none'
              });
            }
          case 5:
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t7 = _context5.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: _t7.message || '微信登录失败',
              icon: 'none'
            });
          case 7:
            _context5.p = 7;
            setIsWechatLogin(false);
            return _context5.f(7);
          case 8:
            return _context5.a(2);
        }
      }, _callee5, null, [[2, 4], [1, 6, 7, 8]]);
    }));
    return function handleWechatLogin() {
      return _ref9.apply(this, arguments);
    };
  }();
  var handleWechatLoginResult = function handleWechatLoginResult(result) {
    var _ref0, _result$data2;
    var payload = (_ref0 = (_result$data2 = result === null || result === void 0 ? void 0 : result.data) !== null && _result$data2 !== void 0 ? _result$data2 : result) !== null && _ref0 !== void 0 ? _ref0 : {};
    var needSetPassword = payload.needSetPassword || payload.need_set_password || false;
    var tempToken = payload.tempToken || payload.temp_token || '';
    if (needSetPassword && tempToken) {
      setWechatTempToken(tempToken);
      setShowSetPasswordModal(true);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请设置登录密码',
        icon: 'none'
      });
    } else {
      saveUserSession(result);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '登录成功',
        icon: 'success'
      });
      setTimeout(function () {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
      }, 1500);
    }
  };

  // 设置密码
  var handleSetPassword = /*#__PURE__*/function () {
    var _ref1 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee6() {
      var _ref10, _result$data3, _ref11, _payload$token2, _ref12, _ref13, _payload$user_login2, result, payload, token, user, loggedInUser, _t8;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (!(!wechatSetPassword || wechatSetPassword.length < 6)) {
              _context6.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '密码至少6位',
              icon: 'none'
            });
            return _context6.a(2);
          case 1:
            if (!(wechatSetPassword !== wechatConfirmPassword)) {
              _context6.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '两次密码输入不一致',
              icon: 'none'
            });
            return _context6.a(2);
          case 2:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: '设置密码中...'
            });
            _context6.p = 3;
            _context6.n = 4;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.apiPost)(_api_user__WEBPACK_IMPORTED_MODULE_4__.authApi.setPassword, {
              tempToken: wechatTempToken,
              password: wechatSetPassword
            }, {}, {}, true);
          case 4:
            result = _context6.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();

            // 设置密码成功后自动登录
            payload = (_ref10 = (_result$data3 = result === null || result === void 0 ? void 0 : result.data) !== null && _result$data3 !== void 0 ? _result$data3 : result) !== null && _ref10 !== void 0 ? _ref10 : {};
            token = (_ref11 = (_payload$token2 = payload.token) !== null && _payload$token2 !== void 0 ? _payload$token2 : payload.accessToken) !== null && _ref11 !== void 0 ? _ref11 : wechatTempToken;
            user = (_ref12 = (_ref13 = (_payload$user_login2 = payload.user_login) !== null && _payload$user_login2 !== void 0 ? _payload$user_login2 : payload.user) !== null && _ref13 !== void 0 ? _ref13 : payload.userInfo) !== null && _ref12 !== void 0 ? _ref12 : payload;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('lxg_user', JSON.stringify({
              token: token,
              user: user
            }));
            loggedInUser = {
              id: String(user.id || user.userId || ''),
              nickname: user.nickname || user.phone || '',
              avatar: user.avatar || '',
              phone: user.phone || '',
              accountName: user.accountName || user.phone || '',
              gender: user.gender || '保密',
              birthday: user.birthday || '请填写您的生日',
              registerDate: user.registerDate || user.created_at || getCurrentDate(),
              email: user.email || '',
              isLoggedIn: true
            };
            setUserInfo(loggedInUser);
            setShowSetPasswordModal(false);
            setWechatSetPassword('');
            setWechatConfirmPassword('');
            setWechatTempToken('');
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '设置成功',
              icon: 'success'
            });
            setTimeout(function () {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
            }, 1500);
            _context6.n = 6;
            break;
          case 5:
            _context6.p = 5;
            _t8 = _context6.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: _t8.message || '设置密码失败',
              icon: 'none'
            });
          case 6:
            return _context6.a(2);
        }
      }, _callee6, null, [[3, 5]]);
    }));
    return function handleSetPassword() {
      return _ref1.apply(this, arguments);
    };
  }();
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
              onClick: countdown === 0 ? sendCode : undefined,
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
              onClick: countdown === 0 ? sendCode : undefined,
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
              onClick: countdown === 0 ? sendCode : undefined,
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
          className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].methodItem, " ").concat(isWechatLogin ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabledMethod : ''),
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
    }), showSetPasswordModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalOverlay,
      onClick: function onClick() {
        return setShowSetPasswordModal(false);
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
          children: "\u5FAE\u4FE1\u767B\u5F55\u6210\u529F\uFF0C\u8BF7\u8BBE\u7F6E\u60A8\u7684\u767B\u5F55\u5BC6\u7801"
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
              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
              value: wechatSetPassword,
              onInput: function onInput(e) {
                return setWechatSetPassword(e.detail.value);
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
              placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
              value: wechatConfirmPassword,
              onInput: function onInput(e) {
                return setWechatConfirmPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalBtn,
          onClick: handleSetPassword,
          children: "\u786E\u8BA4\u8BBE\u7F6E"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].modalCancel,
          onClick: function onClick() {
            setShowSetPasswordModal(false);
            setWechatTempToken('');
            setWechatSetPassword('');
            setWechatConfirmPassword('');
          },
          children: "\u53D6\u6D88"
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
/* harmony default export */ __webpack_exports__["default"] = ({"loginPage":"login-module__loginPage___W8U9L","logoSection":"login-module__logoSection___e8abO","logo":"login-module__logo___a_MDx","appName":"login-module__appName___gvWUx","loginForm":"login-module__loginForm___w1s3V","formTitle":"login-module__formTitle___SKvMr","inputGroup":"login-module__inputGroup___qr5C1","inputLabel":"login-module__inputLabel___djooA","inputRow":"login-module__inputRow___oXV5b","inputIcon":"login-module__inputIcon___GYfF3","input":"login-module__input___AQnaE","codeBtn":"login-module__codeBtn___qCXEL","disabled":"login-module__disabled___GafuM","loginBtn":"login-module__loginBtn____edwc","toggleMode":"login-module__toggleMode___aiaIS","toggleText":"login-module__toggleText___XulHI","toggleLink":"login-module__toggleLink___Zf98u","divider":"login-module__divider___XnKxP","wechatLoginBox":"login-module__wechatLoginBox___idU_t","wechatHint":"login-module__wechatHint___t_Dcj","forgotPassword":"login-module__forgotPassword___RnDw3","thirdPartyLogin":"login-module__thirdPartyLogin___XPTj7","dividerLine":"login-module__dividerLine___KYilS","dividerText":"login-module__dividerText___efV7f","loginMethods":"login-module__loginMethods___iYYZZ","methodItem":"login-module__methodItem___apctX","methodIcon":"login-module__methodIcon___bI8Dg","iconText":"login-module__iconText___NzYM4","methodLabel":"login-module__methodLabel___XdswD","agreement":"login-module__agreement___Notpt","link":"login-module__link___pEsbr","disabledMethod":"login-module__disabledMethod___XBJzz","modalOverlay":"login-module__modalOverlay___DyXvo","modalContent":"login-module__modalContent___UNKsS","modalTitle":"login-module__modalTitle___kxTFu","modalDesc":"login-module__modalDesc___aD57W","modalBtn":"login-module__modalBtn___b1VZN","modalCancel":"login-module__modalCancel___9yXvW"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/login/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map