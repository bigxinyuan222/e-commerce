"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/category/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/index!./src/pages/category/index.tsx":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/index!./src/pages/category/index.tsx ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_common_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/common/home */ "./src/data/common/home.ts");
/* harmony import */ var _data_product_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/product/products */ "./src/data/product/products.ts");
/* harmony import */ var _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/category/category.module.scss */ "./src/styles/category/category.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");








// 子分类项组件

var SubCategoryItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var subCategory = _ref.subCategory,
    _onClick = _ref.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].subCategoryItem,
    onClick: function onClick() {
      return _onClick(subCategory.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].subCategoryIcon,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
        src: subCategory.icon,
        mode: "aspectFill",
        lazyLoad: true
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].subCategoryName,
      children: subCategory.name
    })]
  }, subCategory.id);
});

// 推荐商品组件
var RecommendProduct = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var product = _ref2.product,
    _onClick2 = _ref2.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].recommendProduct,
    onClick: function onClick() {
      return _onClick2(product.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
      src: product.images[0],
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productImage,
      mode: "aspectFill",
      lazyLoad: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productName,
        children: product.name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productPrice,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].price,
          children: product.price
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].originalPrice,
          children: product.originalPrice
        })]
      })]
    })]
  }, product.id);
});
var CategoryPage = function CategoryPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState, 2),
    activeCategory = _useState2[0],
    setActiveCategory = _useState2[1];

  // 使用 useCallback 缓存事件处理函数
  var goToProductDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId)
    });
  }, []);

  // 使用 useCallback 缓存分类点击处理
  var handleCategoryClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (index) {
    setActiveCategory(index);
  }, []);

  // 使用 useCallback 缓存子分类点击处理
  var handleSubCategoryClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (subCategoryId) {
    var categoryIndex = _data_common_home__WEBPACK_IMPORTED_MODULE_2__.categories.findIndex(function (c) {
      var _c$children;
      return (_c$children = c.children) === null || _c$children === void 0 ? void 0 : _c$children.some(function (sc) {
        return sc.id === subCategoryId;
      });
    });
    if (categoryIndex !== -1) {
      setActiveCategory(categoryIndex);
    }
  }, []);

  // 使用 useMemo 缓存当前分类
  var currentCategory = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return _data_common_home__WEBPACK_IMPORTED_MODULE_2__.categories[activeCategory];
  }, [activeCategory]);

  // 使用 useMemo 缓存当前分类的商品
  var categoryProducts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return _data_product_products__WEBPACK_IMPORTED_MODULE_3__.products.filter(function (p) {
      return p.categoryId === (currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.id);
    }).slice(0, 4);
  }, [currentCategory]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = (_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params;
    if (params !== null && params !== void 0 && params.id) {
      var categoryIndex = _data_common_home__WEBPACK_IMPORTED_MODULE_2__.categories.findIndex(function (c) {
        return c.id === params.id;
      });
      if (categoryIndex !== -1 && categoryIndex !== activeCategory) {
        setActiveCategory(categoryIndex);
      }
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].categoryPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].categoryNav,
      children: _data_common_home__WEBPACK_IMPORTED_MODULE_2__.categories.map(function (category, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: "".concat(_styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].categoryItem, " ").concat(index === activeCategory ? _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
          onClick: function onClick() {
            return handleCategoryClick(index);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            children: category.name
          })
        }, category.id);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].subCategoryContent,
      children: [(currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.children) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].subCategoryGrid,
        children: currentCategory.children.map(function (subCategory) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SubCategoryItem, {
            subCategory: subCategory,
            onClick: handleSubCategoryClick
          }, subCategory.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].hotTag,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].hotTitle,
          children: "\u70ED\u9500\u63A8\u8350"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].recommendSection,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].recommendGrid,
          children: categoryProducts.map(function (product) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(RecommendProduct, {
              product: product,
              onClick: goToProductDetail
            }, product.id);
          })
        })
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(CategoryPage));

/***/ }),

/***/ "./src/pages/category/index.tsx":
/*!**************************************!*\
  !*** ./src/pages/category/index.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/index!./src/pages/category/index.tsx");


var config = {"navigationBarTitleText":"分类","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/category/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/category/category.module.scss":
/*!**************************************************!*\
  !*** ./src/styles/category/category.module.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"categoryPage":"category-module__categoryPage___qID3A","categoryNav":"category-module__categoryNav___LCvxr","categoryItem":"category-module__categoryItem___NZiBR","active":"category-module__active___Zn1kp","subCategoryContent":"category-module__subCategoryContent___uhGfl","subCategoryTitle":"category-module__subCategoryTitle___oXEJ7","subCategoryGrid":"category-module__subCategoryGrid___KsiMm","subCategoryItem":"category-module__subCategoryItem___QJxRm","subCategoryIcon":"category-module__subCategoryIcon___I_3js","subCategoryName":"category-module__subCategoryName___L8D9J","brandSection":"category-module__brandSection____f9Hw","brandTitle":"category-module__brandTitle___hSRDG","brandGrid":"category-module__brandGrid___bA4__","brandItem":"category-module__brandItem___lfDqO","brandLogo":"category-module__brandLogo___AdMrE","brandName":"category-module__brandName___jHC3T","recommendSection":"category-module__recommendSection___MuV05","recommendTitle":"category-module__recommendTitle___jKPTc","recommendGrid":"category-module__recommendGrid___kCh2F","recommendProduct":"category-module__recommendProduct___PynfS","productImage":"category-module__productImage___WZupy","productInfo":"category-module__productInfo___ok_WS","productName":"category-module__productName___FWjZl","productPrice":"category-module__productPrice___u63EH","price":"category-module__price___YuWOz","originalPrice":"category-module__originalPrice___TnTQy","hotTag":"category-module__hotTag___JmKvE","hotTitle":"category-module__hotTitle___YNJ2W"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/category/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map