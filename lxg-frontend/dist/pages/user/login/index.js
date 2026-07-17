"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/login/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/login/index!./src/pages/user/login/index.tsx":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/login/index!./src/pages/user/login/index.tsx ***!
  \**************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _data_user_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/user/user */ "./src/data/user/user.ts");
/* harmony import */ var _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/user/login.module.scss */ "./src/styles/user/login.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");









var LoginPage = function LoginPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    setUserInfo = _useAppContext.setUserInfo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    isRegister = _useState2[0],
    setIsRegister = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('account'),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    loginMethod = _useState4[0],
    setLoginMethod = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState5, 2),
    isForgotPassword = _useState6[0],
    setIsForgotPassword = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState7, 2),
    username = _useState8[0],
    setUsername = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState0 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState9, 2),
    password = _useState0[0],
    setPassword = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState1, 2),
    confirmPassword = _useState10[0],
    setConfirmPassword = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState12 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState11, 2),
    phone = _useState12[0],
    setPhone = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState14 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState13, 2),
    code = _useState14[0],
    setCode = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState16 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState15, 2),
    countdown = _useState16[0],
    setCountdown = _useState16[1];
  var getCurrentDate = function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
  };
  var sendCode = function sendCode() {
    if (!phone || phone.length !== 11) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    setCountdown(60);
    var timer = 60;
    var interval = setInterval(function () {
      timer--;
      setCountdown(timer);
      if (timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '验证码已发送',
      icon: 'success'
    });
  };
  var handleAccountLogin = function handleAccountLogin() {
    if (isRegister) {
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
    } else {
      if (!username || username.length < 3) {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '账号至少3个字符',
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
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
      title: isRegister ? '注册中...' : '登录中...'
    });
    setTimeout(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
      var loggedInUser = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo), {}, {
        id: "user-".concat(Date.now()),
        phone: isRegister ? phone : _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo.phone,
        accountName: isRegister ? phone : username,
        isLoggedIn: true,
        registerDate: isRegister ? getCurrentDate() : _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo.registerDate
      });
      setUserInfo(loggedInUser);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('userInfo', loggedInUser);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: isRegister ? '注册成功' : '登录成功',
        icon: 'success'
      });
      setTimeout(function () {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
      }, 1500);
    }, 1500);
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
  var handlePhoneLogin = function handlePhoneLogin() {
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
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
      title: isRegister ? '注册中...' : '登录中...'
    });
    setTimeout(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
      var loggedInUser = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo), {}, {
        id: "user-".concat(Date.now()),
        phone: phone,
        accountName: isRegister ? "user_".concat(Date.now()) : _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo.accountName || '',
        isLoggedIn: true,
        registerDate: isRegister ? getCurrentDate() : _data_user_user__WEBPACK_IMPORTED_MODULE_3__.userInfo.registerDate
      });
      setUserInfo(loggedInUser);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('userInfo', loggedInUser);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: isRegister ? '注册成功' : '登录成功',
        icon: 'success'
      });
      setTimeout(function () {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
      }, 1500);
    }, 1500);
  };
  var toggleRegisterMode = function toggleRegisterMode() {
    setIsRegister(!isRegister);
    setPassword('');
    setConfirmPassword('');
    setCode('');
  };
  var switchToPhoneLogin = function switchToPhoneLogin() {
    setLoginMethod('phone');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };
  var switchToAccountLogin = function switchToAccountLogin() {
    setLoginMethod('account');
    setPhone('');
    setCode('');
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loginPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].logoSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].logo,
        children: "\uD83D\uDED2"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].appName,
        children: "\u4E50\u4EAB\u8D2D"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loginForm,
      children: isForgotPassword ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].formTitle,
          children: "\u5FD8\u8BB0\u5BC6\u7801"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: "\u624B\u673A\u53F7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: "\uD83D\uDCF1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              type: "number",
              maxlength: 11,
              placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
              value: phone,
              onInput: function onInput(e) {
                return setPhone(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: "\u9A8C\u8BC1\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: "\uD83D\uDD10"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              type: "number",
              maxlength: 6,
              placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
              value: code,
              onInput: function onInput(e) {
                return setCode(e.detail.value);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].codeBtn, " ").concat(countdown > 0 ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].disabled : ''),
              onClick: countdown === 0 ? sendCode : undefined,
              children: countdown > 0 ? "".concat(countdown, "s") : '获取验证码'
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: "\u65B0\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              password: true,
              placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
              value: password,
              onInput: function onInput(e) {
                return setPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: "\u786E\u8BA4\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              password: true,
              placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
              value: confirmPassword,
              onInput: function onInput(e) {
                return setConfirmPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loginBtn,
          onClick: handleForgotPassword,
          children: "\u91CD\u7F6E\u5BC6\u7801"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleMode,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleLink,
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
      }) : loginMethod === 'account' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].formTitle,
          children: isRegister ? '手机号注册' : '账号登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: isRegister ? '手机号' : '账号'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: isRegister ? '📱' : '👤'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              type: isRegister ? 'number' : 'text',
              maxlength: isRegister ? 11 : undefined,
              placeholder: isRegister ? '请输入手机号' : '请输入账号',
              value: isRegister ? phone : username,
              onInput: function onInput(e) {
                return isRegister ? setPhone(e.detail.value) : setUsername(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: isRegister ? '验证码' : '密码'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: isRegister ? '🔐' : '🔑'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              type: isRegister ? 'number' : 'text',
              password: !isRegister,
              maxlength: isRegister ? 6 : undefined,
              placeholder: isRegister ? '请输入验证码' : '请输入密码（至少6位）',
              value: isRegister ? code : password,
              onInput: function onInput(e) {
                return isRegister ? setCode(e.detail.value) : setPassword(e.detail.value);
              }
            }), isRegister && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].codeBtn, " ").concat(countdown > 0 ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].disabled : ''),
              onClick: countdown === 0 ? sendCode : undefined,
              children: countdown > 0 ? "".concat(countdown, "s") : '获取验证码'
            })]
          })]
        }), isRegister && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: "\u5BC6\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: "\uD83D\uDD11"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              password: true,
              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF08\u81F3\u5C116\u4F4D\uFF09",
              value: password,
              onInput: function onInput(e) {
                return setPassword(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loginBtn,
          onClick: handleAccountLogin,
          children: isRegister ? '注册' : '登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleMode,
          children: isRegister ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleText,
              children: "\u5DF2\u6709\u8D26\u53F7\uFF1F"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u767B\u5F55"
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleLink,
              onClick: function onClick() {
                setIsForgotPassword(true);
                setUsername('');
                setPassword('');
              },
              children: "\u5FD8\u8BB0\u5BC6\u7801"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].divider,
              children: "|"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u6CE8\u518C"
            })]
          })
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].formTitle,
          children: isRegister ? '手机号注册' : '手机号登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: "\u624B\u673A\u53F7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: "\uD83D\uDCF1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              type: "number",
              maxlength: 11,
              placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
              value: phone,
              onInput: function onInput(e) {
                return setPhone(e.detail.value);
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputLabel,
            children: "\u9A8C\u8BC1\u7801"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputRow,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].inputIcon,
              children: "\uD83D\uDD10"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
              type: "number",
              maxlength: 6,
              placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
              value: code,
              onInput: function onInput(e) {
                return setCode(e.detail.value);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: "".concat(_styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].codeBtn, " ").concat(countdown > 0 ? _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].disabled : ''),
              onClick: countdown === 0 ? sendCode : undefined,
              children: countdown > 0 ? "".concat(countdown, "s") : '获取验证码'
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loginBtn,
          onClick: handlePhoneLogin,
          children: isRegister ? '注册' : '登录'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleMode,
          children: isRegister ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleText,
              children: "\u5DF2\u6709\u8D26\u53F7\uFF1F"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u767B\u5F55"
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleLink,
              onClick: function onClick() {
                setIsForgotPassword(true);
                setPhone('');
                setCode('');
              },
              children: "\u5FD8\u8BB0\u5BC6\u7801"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].divider,
              children: "|"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].toggleLink,
              onClick: toggleRegisterMode,
              children: "\u7ACB\u5373\u6CE8\u518C"
            })]
          })
        })]
      })
    }), !isRegister && !isForgotPassword && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].thirdPartyLogin,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].divider,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].dividerLine
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].dividerText,
          children: "\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].dividerLine
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loginMethods,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].methodItem,
          onClick: switchToAccountLogin,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].methodIcon,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].iconText,
              children: "\uD83D\uDC64"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].methodLabel,
            children: "\u8D26\u53F7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].methodItem,
          onClick: switchToPhoneLogin,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].methodIcon,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].iconText,
              children: "\uD83D\uDCF1"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].methodLabel,
            children: "\u624B\u673A"
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].agreement,
      children: [isRegister ? '注册即表示同意' : '登录即表示同意', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].link,
        children: "\u300A\u7528\u6237\u534F\u8BAE\u300B"
      }), "\u548C", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_user_login_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].link,
        children: "\u300A\u9690\u79C1\u653F\u7B56\u300B"
      })]
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
/* harmony default export */ __webpack_exports__["default"] = ({"loginPage":"login-module__loginPage___W8U9L","logoSection":"login-module__logoSection___e8abO","logo":"login-module__logo___a_MDx","appName":"login-module__appName___gvWUx","loginForm":"login-module__loginForm___w1s3V","formTitle":"login-module__formTitle___SKvMr","inputGroup":"login-module__inputGroup___qr5C1","inputLabel":"login-module__inputLabel___djooA","inputRow":"login-module__inputRow___oXV5b","inputIcon":"login-module__inputIcon___GYfF3","input":"login-module__input___AQnaE","codeBtn":"login-module__codeBtn___qCXEL","disabled":"login-module__disabled___GafuM","loginBtn":"login-module__loginBtn____edwc","toggleMode":"login-module__toggleMode___aiaIS","toggleText":"login-module__toggleText___XulHI","toggleLink":"login-module__toggleLink___Zf98u","divider":"login-module__divider___XnKxP","wechatLoginBox":"login-module__wechatLoginBox___idU_t","wechatHint":"login-module__wechatHint___t_Dcj","forgotPassword":"login-module__forgotPassword___RnDw3","thirdPartyLogin":"login-module__thirdPartyLogin___XPTj7","dividerLine":"login-module__dividerLine___KYilS","dividerText":"login-module__dividerText___efV7f","loginMethods":"login-module__loginMethods___iYYZZ","methodItem":"login-module__methodItem___apctX","methodIcon":"login-module__methodIcon___bI8Dg","iconText":"login-module__iconText___NzYM4","methodLabel":"login-module__methodLabel___XdswD","agreement":"login-module__agreement___Notpt","link":"login-module__link___pEsbr"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/login/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map