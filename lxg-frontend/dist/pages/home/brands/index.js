"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/brands/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brands/index!./src/pages/home/brands/index.tsx":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brands/index!./src/pages/home/brands/index.tsx ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_product_brands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/product/brands */ "./src/data/product/brands.ts");
/* harmony import */ var _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/home/brands.module.scss */ "./src/styles/home/brands.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







var BrandsPage = function BrandsPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('hot'),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    searchKeyword = _useState4[0],
    setSearchKeyword = _useState4[1];
  var displayBrands;
  if (searchKeyword) {
    displayBrands = _data_product_brands__WEBPACK_IMPORTED_MODULE_2__.brands.filter(function (brand) {
      return brand.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || brand.description.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1;
    });
  } else {
    displayBrands = activeTab === 'hot' ? (0,_data_product_brands__WEBPACK_IMPORTED_MODULE_2__.getHotBrands)() : _data_product_brands__WEBPACK_IMPORTED_MODULE_2__.brands;
  }
  var goToBrandDetail = function goToBrandDetail(brandId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/home/brand-detail/index?id=' + brandId
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandsPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchBar,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchInputWrap,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
          type: "text",
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchInput,
          placeholder: "\u641C\u7D22\u54C1\u724C",
          value: searchKeyword,
          onChange: function onChange(e) {
            setSearchKeyword(e.target.value);
          }
        }), searchKeyword && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].clearIcon,
          onClick: function onClick() {
            setSearchKeyword('');
          },
          children: "\u2715"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tabs,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: activeTab === 'hot' ? _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab + ' ' + _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab,
        onClick: function onClick() {
          setActiveTab('hot');
        },
        children: "\u70ED\u95E8\u54C1\u724C"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: activeTab === 'all' ? _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab + ' ' + _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tab,
        onClick: function onClick() {
          setActiveTab('all');
        },
        children: "\u5168\u90E8\u54C1\u724C"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandList,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandGrid,
        children: displayBrands.map(function (brand) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandItem,
            onClick: function onClick() {
              goToBrandDetail(brand.id);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandLogoWrap,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
                src: brand.logo,
                className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandLogo,
                mode: "aspectFill"
              }), brand.isHot && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].hotTag,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                  className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].hotTagText,
                  children: "HOT"
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandName,
              children: brand.name
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].brandProductCount,
              children: [brand.productsCount, "\u6B3E\u5546\u54C1"]
            })]
          }, brand.id);
        })
      }), displayBrands.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
          children: "\u672A\u627E\u5230\u76F8\u5173\u54C1\u724C"
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (BrandsPage);

/***/ }),

/***/ "./src/pages/home/brands/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/home/brands/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brands_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brands/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brands/index!./src/pages/home/brands/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brands_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/brands/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brands_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brands_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brands_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brands_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/brands.module.scss":
/*!********************************************!*\
  !*** ./src/styles/home/brands.module.scss ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"brandsPage":"brands-module__brandsPage___GZcuu","searchBar":"brands-module__searchBar___TP6NF","searchInputWrap":"brands-module__searchInputWrap___mNUy2","searchIcon":"brands-module__searchIcon___SDLQQ","searchInput":"brands-module__searchInput___wlu35","clearIcon":"brands-module__clearIcon___xNqfm","tabs":"brands-module__tabs___TlF5G","tab":"brands-module__tab___RB0Ag","active":"brands-module__active___EdDqd","brandList":"brands-module__brandList___jiJ59","brandGrid":"brands-module__brandGrid___Bq_Cv","brandItem":"brands-module__brandItem___hjj6o","brandLogoWrap":"brands-module__brandLogoWrap___SGtbY","brandLogo":"brands-module__brandLogo___vTKzA","hotTag":"brands-module__hotTag___Kpk51","hotTagText":"brands-module__hotTagText___tiEWM","brandName":"brands-module__brandName___O7GWI","brandProductCount":"brands-module__brandProductCount___LoA3T","emptyState":"brands-module__emptyState___hiRvd","emptyIcon":"brands-module__emptyIcon___z5KPm","emptyText":"brands-module__emptyText___oVsCL"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/brands/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map