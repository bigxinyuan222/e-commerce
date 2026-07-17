"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/user/personal-info/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/personal-info/index!./src/pages/user/personal-info/index.tsx":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/personal-info/index!./src/pages/user/personal-info/index.tsx ***!
  \******************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/user/personal-info.module.scss */ "./src/styles/user/personal-info.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");
/* provided dependency */ var window = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/index.js")["window"];








var PersonalInfoPage = function PersonalInfoPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    userInfo = _useAppContext.userInfo,
    setUserInfo = _useAppContext.setUserInfo;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      avatar: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.avatar) || 'https://picsum.photos/id/64/200/200',
      accountName: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.accountName) || 'xgqfpKztPcYe',
      nickname: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.nickname) || '乐享购用户',
      gender: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.gender) || '保密',
      birthday: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.birthday) || '请填写您的生日',
      registerDate: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.registerDate) || '2023-08-15'
    }),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];

  // 切换账号
  var handleSwitchAccount = function handleSwitchAccount() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '切换账号',
      content: '确定要切换到其他账号吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: function success(res) {
        if (res.confirm) {
          // 清除用户信息
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().removeStorageSync('userInfo');
          setUserInfo({
            id: '',
            avatar: '',
            nickname: '',
            phone: '',
            gender: '',
            birthday: '',
            registerDate: '',
            accountName: '',
            email: '',
            isLoggedIn: false
          });
          // 跳转到登录页面
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
            url: '/pages/user/login/index'
          });
        }
      }
    });
  };

  // 退出登录
  var handleLogout = function handleLogout() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: function success(res) {
        if (res.confirm) {
          // 清除用户信息
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().removeStorageSync('userInfo');
          setUserInfo({
            id: '',
            avatar: '',
            nickname: '',
            phone: '',
            gender: '',
            birthday: '',
            registerDate: '',
            accountName: '',
            email: '',
            isLoggedIn: false
          });
          // 返回首页
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
            url: '/pages/home/index'
          });
        }
      }
    });
  };

  // 日期选择器相关状态
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    showDatePicker = _useState4[0],
    setShowDatePicker = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date().getFullYear()),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState5, 2),
    selectedYear = _useState6[0],
    setSelectedYear = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date().getMonth() + 1),
    _useState8 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState7, 2),
    selectedMonth = _useState8[0],
    setSelectedMonth = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date().getDate()),
    _useState0 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState9, 2),
    selectedDay = _useState0[0],
    setSelectedDay = _useState0[1];

  // 头像选择弹窗状态
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState1, 2),
    showAvatarPicker = _useState10[0],
    setShowAvatarPicker = _useState10[1];

  // 昵称修改弹窗状态
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState11, 2),
    showNicknameModal = _useState12[0],
    setShowNicknameModal = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState14 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState13, 2),
    nicknameInput = _useState14[0],
    setNicknameInput = _useState14[1];

  // 性别选择弹窗状态
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState15, 2),
    showGenderPicker = _useState16[0],
    setShowGenderPicker = _useState16[1];

  // 生成年份列表（1900-2100）
  var generateYears = function generateYears() {
    var years = [];
    for (var i = 1900; i <= 2100; i++) {
      years.push(i);
    }
    return years;
  };

  // 生成月份列表
  var generateMonths = function generateMonths() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  };

  // 生成日期列表
  var generateDays = function generateDays() {
    var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    var days = [];
    for (var i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  // 处理日期选择确认
  var handleDateConfirm = function handleDateConfirm() {
    var birthdayStr = "".concat(selectedYear, "\u5E74").concat(String(selectedMonth).padStart(2, '0'), "\u6708").concat(String(selectedDay).padStart(2, '0'), "\u65E5");
    setFormData((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, formData), {}, {
      birthday: birthdayStr
    }));
    setUserInfo((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, userInfo), {}, {
      birthday: birthdayStr
    }));
    setShowDatePicker(false);
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '修改成功',
      icon: 'success'
    });
  };
  var handleItemClick = function handleItemClick(title) {
    switch (title) {
      case '头像':
        setShowAvatarPicker(true);
        break;
      case '账号/手机号':
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
          url: '/pages/user/account-name/index'
        });
        break;
      case '昵称':
        setNicknameInput(formData.nickname);
        setShowNicknameModal(true);
        break;
      case '性别':
        setShowGenderPicker(true);
        break;
      case '出生日期':
        if (formData.birthday !== '请填写您的生日') {
          var match = formData.birthday.match(/(\d+)年(\d+)月(\d+)日/);
          if (match) {
            setSelectedYear(parseInt(match[1]));
            setSelectedMonth(parseInt(match[2]));
            setSelectedDay(parseInt(match[3]));
          }
        }
        setShowDatePicker(true);
        break;
      default:
        break;
    }
  };
  var handleBack = function handleBack() {
    // 使用原生方式返回，兼容H5环境
    if (window.history.length > 1) {
      window.history.back();
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
        url: '/pages/mine/index'
      });
    }
  };

  // 监听年份或月份变化，确保日期有效
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  }, [selectedYear, selectedMonth]);
  var years = generateYears();
  var months = generateMonths();
  var days = generateDays();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].personalInfoPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].backBtn,
        onClick: handleBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].backIcon,
          children: "\u2039"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerTitle,
        children: "\u4E2A\u4EBA\u4FE1\u606F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].headerRight
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].content,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoItem,
        onClick: function onClick() {
          return handleItemClick('头像');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemLabel,
          children: "\u5934\u50CF"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
            src: formData.avatar,
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatar,
            mode: "aspectFill"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemArrow,
            children: "\u203A"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoItem,
        onClick: function onClick() {
          return handleItemClick('账号/手机号');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemLabel,
          children: "\u8D26\u53F7/\u624B\u673A\u53F7"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemValue,
            children: formData.accountName
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemArrow,
            children: "\u203A"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoItem,
        onClick: function onClick() {
          return handleItemClick('昵称');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemLabel,
          children: "\u6635\u79F0"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemValue,
            children: formData.nickname
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemArrow,
            children: "\u203A"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoItem,
        onClick: function onClick() {
          return handleItemClick('性别');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemLabel,
          children: "\u6027\u522B"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemValue,
            children: formData.gender
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemArrow,
            children: "\u203A"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoItem,
        onClick: function onClick() {
          return handleItemClick('出生日期');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemLabel,
          children: "\u51FA\u751F\u65E5\u671F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemValue,
            children: formData.birthday
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemArrow,
            children: "\u203A"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].infoItem,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemLabel,
          children: "\u6CE8\u518C\u65E5\u671F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemValue,
          children: formData.registerDate
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].accountSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].accountBtn,
        onClick: handleSwitchAccount,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].accountBtnText,
          children: "\u5207\u6362\u8D26\u53F7"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].accountBtn + ' ' + _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].accountBtnLogout,
        onClick: handleLogout,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].accountBtnText,
          children: "\u9000\u51FA\u767B\u5F55"
        })
      })]
    }), showDatePicker && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].datePickerOverlay,
      onClick: function onClick() {
        return setShowDatePicker(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].datePickerContent,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].datePickerHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].datePickerCancel,
            onClick: function onClick() {
              return setShowDatePicker(false);
            },
            children: "\u53D6\u6D88"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].datePickerConfirm,
            onClick: handleDateConfirm,
            children: "\u786E\u5B9A"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].datePickerWheels,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheel,
            children: years.map(function (year) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: "".concat(_styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheelItem, " ").concat(selectedYear === year ? _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheelItemActive : ''),
                onClick: function onClick() {
                  return setSelectedYear(year);
                },
                children: [year, "\u5E74"]
              }, year);
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheel,
            children: months.map(function (month) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: "".concat(_styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheelItem, " ").concat(selectedMonth === month ? _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheelItemActive : ''),
                onClick: function onClick() {
                  return setSelectedMonth(month);
                },
                children: [String(month).padStart(2, '0'), "\u6708"]
              }, month);
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheel,
            children: days.map(function (day) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: "".concat(_styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheelItem, " ").concat(selectedDay === day ? _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].wheelItemActive : ''),
                onClick: function onClick() {
                  return setSelectedDay(day);
                },
                children: [String(day).padStart(2, '0'), "\u65E5"]
              }, day);
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].datePickerLine
        })]
      })
    }), showAvatarPicker && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerOverlay,
      onClick: function onClick() {
        return setShowAvatarPicker(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerContent,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerTitle,
            children: "\u9009\u62E9\u56FE\u7247"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerClose,
            onClick: function onClick() {
              return setShowAvatarPicker(false);
            },
            children: "\xD7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerBody,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerOption,
            onClick: function onClick() {
              setShowAvatarPicker(false);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '从相册选择',
                icon: 'none'
              });
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerOptionText,
              children: "\u4ECE\u76F8\u518C\u9009\u62E9"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerDivider
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerOption,
            onClick: function onClick() {
              setShowAvatarPicker(false);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '拍照功能',
                icon: 'none'
              });
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerOptionText,
              children: "\u62CD\u7167"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerCancel,
          onClick: function onClick() {
            return setShowAvatarPicker(false);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].avatarPickerCancelText,
            children: "\u53D6\u6D88"
          })
        })]
      })
    }), showNicknameModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalOverlay,
      onClick: function onClick() {
        return setShowNicknameModal(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalContent,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalHeader,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalTitle,
            children: "\u4FEE\u6539\u6635\u79F0"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalBody,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
            type: "text",
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameInput,
            value: nicknameInput,
            onChange: function onChange(e) {
              return setNicknameInput(e.target.value);
            },
            placeholder: "\u8BF7\u8F93\u5165\u65B0\u6635\u79F0",
            maxLength: 20
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalFooter,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalBtn,
            onClick: function onClick() {
              return setShowNicknameModal(false);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalBtnText,
              children: "\u53D6\u6D88"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalBtn,
            onClick: function onClick() {
              if (nicknameInput.trim()) {
                setFormData((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, formData), {}, {
                  nickname: nicknameInput.trim()
                }));
                setUserInfo((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, userInfo), {}, {
                  nickname: nicknameInput.trim()
                }));
                setShowNicknameModal(false);
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: '修改成功',
                  icon: 'success'
                });
              } else {
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: '请输入昵称',
                  icon: 'none'
                });
              }
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalBtnText + ' ' + _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].nicknameModalBtnConfirm,
              children: "\u786E\u5B9A"
            })
          })]
        })]
      })
    }), showGenderPicker && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerOverlay,
      onClick: function onClick() {
        return setShowGenderPicker(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerContent,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerTitle,
            children: "\u9009\u62E9\u6027\u522B"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerClose,
            onClick: function onClick() {
              return setShowGenderPicker(false);
            },
            children: "\xD7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerBody,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerOption,
            onClick: function onClick() {
              setFormData((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, formData), {}, {
                gender: '男'
              }));
              setUserInfo((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, userInfo), {}, {
                gender: '男'
              }));
              setShowGenderPicker(false);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerOptionText,
              children: "\u7537"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerDivider
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerOption,
            onClick: function onClick() {
              setFormData((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, formData), {}, {
                gender: '女'
              }));
              setUserInfo((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, userInfo), {}, {
                gender: '女'
              }));
              setShowGenderPicker(false);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerOptionText,
              children: "\u5973"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerDivider
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerOption,
            onClick: function onClick() {
              setFormData((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, formData), {}, {
                gender: '保密'
              }));
              setUserInfo((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, userInfo), {}, {
                gender: '保密'
              }));
              setShowGenderPicker(false);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_user_personal_info_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].genderPickerOptionText,
              children: "\u4FDD\u5BC6"
            })
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (PersonalInfoPage);

/***/ }),

/***/ "./src/pages/user/personal-info/index.tsx":
/*!************************************************!*\
  !*** ./src/pages/user/personal-info/index.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_personal_info_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/personal-info/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/user/personal-info/index!./src/pages/user/personal-info/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_personal_info_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/user/personal-info/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_personal_info_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_personal_info_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_personal_info_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_user_personal_info_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/user/personal-info.module.scss":
/*!***************************************************!*\
  !*** ./src/styles/user/personal-info.module.scss ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"personalInfoPage":"personal-info-module__personalInfoPage___Kuud5","header":"personal-info-module__header___CbEb9","backBtn":"personal-info-module__backBtn___BxAWe","backIcon":"personal-info-module__backIcon___P43by","headerTitle":"personal-info-module__headerTitle___ElnDy","headerRight":"personal-info-module__headerRight___hwd2V","content":"personal-info-module__content___luZZA","infoItem":"personal-info-module__infoItem___HD8zg","itemLabel":"personal-info-module__itemLabel___h4w4y","itemContent":"personal-info-module__itemContent___DzxsQ","itemValue":"personal-info-module__itemValue___tgOy7","itemArrow":"personal-info-module__itemArrow___SnRIY","avatar":"personal-info-module__avatar___pWYNk","datePickerOverlay":"personal-info-module__datePickerOverlay___ki8Iq","datePickerContent":"personal-info-module__datePickerContent___BThPl","datePickerHeader":"personal-info-module__datePickerHeader___Fqz8R","datePickerCancel":"personal-info-module__datePickerCancel___gxxZp","datePickerConfirm":"personal-info-module__datePickerConfirm___nmgqA","datePickerWheels":"personal-info-module__datePickerWheels___URMLQ","wheel":"personal-info-module__wheel___NygGZ","wheelItem":"personal-info-module__wheelItem___mDmUn","wheelItemActive":"personal-info-module__wheelItemActive___Zdmx6","datePickerLine":"personal-info-module__datePickerLine___bTzcJ","avatarPickerOverlay":"personal-info-module__avatarPickerOverlay___iwYFn","avatarPickerContent":"personal-info-module__avatarPickerContent___ZkyS3","avatarPickerHeader":"personal-info-module__avatarPickerHeader___kYtpL","avatarPickerTitle":"personal-info-module__avatarPickerTitle___P6Fxs","avatarPickerClose":"personal-info-module__avatarPickerClose___Q9qm6","avatarPickerBody":"personal-info-module__avatarPickerBody___t7yJJ","avatarPickerOption":"personal-info-module__avatarPickerOption___hx4GW","avatarPickerOptionText":"personal-info-module__avatarPickerOptionText___SzaN2","avatarPickerDivider":"personal-info-module__avatarPickerDivider___fE35v","avatarPickerCancel":"personal-info-module__avatarPickerCancel___zuxHl","avatarPickerCancelText":"personal-info-module__avatarPickerCancelText___wbBBm","nicknameModalOverlay":"personal-info-module__nicknameModalOverlay___LGaay","nicknameModalContent":"personal-info-module__nicknameModalContent___QCx87","nicknameModalHeader":"personal-info-module__nicknameModalHeader___hu9ON","nicknameModalTitle":"personal-info-module__nicknameModalTitle____ZmxH","nicknameModalBody":"personal-info-module__nicknameModalBody___o6GWZ","nicknameInput":"personal-info-module__nicknameInput___gzLHs","nicknameModalFooter":"personal-info-module__nicknameModalFooter___OQ8HE","nicknameModalBtn":"personal-info-module__nicknameModalBtn___NNxpp","nicknameModalBtnText":"personal-info-module__nicknameModalBtnText___hHxrz","nicknameModalBtnConfirm":"personal-info-module__nicknameModalBtnConfirm___ga23J","genderPickerOverlay":"personal-info-module__genderPickerOverlay___VSW9a","genderPickerContent":"personal-info-module__genderPickerContent___PCIxL","genderPickerHeader":"personal-info-module__genderPickerHeader___KZtgT","genderPickerTitle":"personal-info-module__genderPickerTitle___RefVx","genderPickerClose":"personal-info-module__genderPickerClose___mDTYP","genderPickerBody":"personal-info-module__genderPickerBody___R8hly","genderPickerOption":"personal-info-module__genderPickerOption___ui25w","genderPickerOptionText":"personal-info-module__genderPickerOptionText___x0aFy","genderPickerDivider":"personal-info-module__genderPickerDivider___WVuHZ","accountSection":"personal-info-module__accountSection___Zf1CB","accountBtn":"personal-info-module__accountBtn___J2cFs","accountBtnLogout":"personal-info-module__accountBtnLogout___LXOIj","accountBtnText":"personal-info-module__accountBtnText___dfyQv"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/user/personal-info/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map