"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/category/stores/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./src/pages/category/stores/index.tsx":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./src/pages/category/stores/index.tsx ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _data_common_stores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/common/stores */ "./src/data/common/stores.ts");
/* harmony import */ var _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/category/stores.module.scss */ "./src/styles/category/stores.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







var StoresPage = function StoresPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    currentStore = _useAppContext.currentStore,
    setCurrentStore = _useAppContext.setCurrentStore;
  var handleCallStore = function handleCallStore(phone) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().makePhoneCall({
      phoneNumber: phone
    });
  };
  var handleSelectStore = function handleSelectStore(store) {
    setCurrentStore(store);
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: "\u5DF2\u9009\u62E9".concat(store.name),
      icon: 'success'
    });
    setTimeout(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
    }, 1500);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storesPage,
    children: _data_common_stores__WEBPACK_IMPORTED_MODULE_3__.stores.map(function (store) {
      var isSelected = (currentStore === null || currentStore === void 0 ? void 0 : currentStore.id) === store.id;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeCard, " ").concat(isSelected ? _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].selected : ''),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeName,
            children: store.name
          }), isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].selectedTag,
            children: "\u2713 \u5DF2\u9009\u62E9"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeAddress,
          children: store.address
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storePhone,
          onClick: function onClick() {
            return handleCallStore(store.phone);
          },
          children: ["\uD83D\uDCDE ", store.phone]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].storeHours,
          children: ["\u8425\u4E1A\u65F6\u95F4: ", store.hours]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].selectBtn,
          onClick: function onClick() {
            return handleSelectStore(store);
          },
          children: isSelected ? '已选择' : '选择此门店'
        })]
      }, store.id);
    })
  });
};
/* harmony default export */ __webpack_exports__["default"] = (StoresPage);

/***/ }),

/***/ "./src/data/common/stores.ts":
/*!***********************************!*\
  !*** ./src/data/common/stores.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stores: function() { return /* binding */ stores; }
/* harmony export */ });
/* unused harmony exports getStoreById, getNearbyStores */
// 门店数据

// 所有门店
var stores = [{
  id: 'store-1',
  name: '深圳南山科技园店',
  address: '广东省深圳市南山区科技园南区A2栋1楼',
  phone: '0755-12345678',
  hours: '09:00-22:00',
  distance: 1.2,
  lat: 22.5431,
  lng: 113.9472,
  service: ['自提', '售后', '维修'],
  image: ''
}, {
  id: 'store-2',
  name: '深圳福田CBD店',
  address: '广东省深圳市福田区华强北街道100号',
  phone: '0755-87654321',
  hours: '10:00-21:00',
  distance: 3.5,
  lat: 22.5412,
  lng: 114.0565,
  service: ['自提', '体验'],
  image: ''
}, {
  id: 'store-3',
  name: '深圳龙华店',
  address: '广东省深圳市龙华区龙华街道88号',
  phone: '0755-23456789',
  hours: '09:30-21:30',
  distance: 8.2,
  lat: 22.6529,
  lng: 114.0575,
  service: ['自提', '售后'],
  image: ''
}];

// 根据ID获取门店
var getStoreById = function getStoreById(id) {
  return stores.find(function (store) {
    return store.id === id;
  });
};

// 获取最近的门店
var getNearbyStores = function getNearbyStores(lat, lng) {
  if (!lat || !lng) {
    return stores;
  }
  return stores.sort(function (a, b) {
    var distA = Math.sqrt(Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2));
    var distB = Math.sqrt(Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2));
    return distA - distB;
  });
};

/***/ }),

/***/ "./src/pages/category/stores/index.tsx":
/*!*********************************************!*\
  !*** ./src/pages/category/stores/index.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_stores_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./src/pages/category/stores/index.tsx");


var config = {"navigationBarTitleText":"门店列表","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_stores_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/category/stores/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_stores_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_stores_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_stores_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_stores_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/category/stores.module.scss":
/*!************************************************!*\
  !*** ./src/styles/category/stores.module.scss ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"storesPage":"stores-module__storesPage___OxB78","storeCard":"stores-module__storeCard___ogKQh","selected":"stores-module__selected___ssvqz","storeHeader":"stores-module__storeHeader___DpwMb","storeName":"stores-module__storeName___juPvq","selectedTag":"stores-module__selectedTag___n2xZg","storeAddress":"stores-module__storeAddress___cFupC","storePhone":"stores-module__storePhone___MAGiB","storeHours":"stores-module__storeHours____Ii5J","selectBtn":"stores-module__selectBtn___FlWvI"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/category/stores/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map