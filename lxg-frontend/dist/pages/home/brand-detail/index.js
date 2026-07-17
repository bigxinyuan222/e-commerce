"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/brand-detail/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brand-detail/index!./src/pages/home/brand-detail/index.tsx":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brand-detail/index!./src/pages/home/brand-detail/index.tsx ***!
  \****************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_product_brands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/product/brands */ "./src/data/product/brands.ts");
/* harmony import */ var _data_product_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/product/products */ "./src/data/product/products.ts");
/* harmony import */ var _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/home/brand-detail.module.scss */ "./src/styles/home/brand-detail.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");








var BrandDetailPage = function BrandDetailPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    brand = _useState2[0],
    setBrand = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    brandProducts = _useState4[0],
    setBrandProducts = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = (_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params;
    if (params !== null && params !== void 0 && params.id) {
      var foundBrand = (0,_data_product_brands__WEBPACK_IMPORTED_MODULE_2__.getBrandById)(params.id);
      setBrand(foundBrand || null);
      var filteredProducts = _data_product_products__WEBPACK_IMPORTED_MODULE_3__.products.filter(function (p) {
        return p.brandId === params.id;
      });
      setBrandProducts(filteredProducts);
    }
  }, []);
  var goToProductDetail = function goToProductDetail(productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/home/detail/index?id=' + productId
    });
  };
  if (!brand) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loadingText,
        children: "\u52A0\u8F7D\u4E2D..."
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.ScrollView, {
    scrollY: true,
    className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].brandDetailPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].brandHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
        src: brand.logo,
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].brandLogo,
        mode: "aspectFill"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].brandInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].brandName,
          children: brand.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].brandDesc,
          children: brand.description
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].brandStats,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].statItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].statNum,
              children: brand.productsCount
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].statLabel,
              children: "\u6B3E\u5546\u54C1"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].statDivider
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].statItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].statNum,
              children: "10\u4E07+"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].statLabel,
              children: "\u7C89\u4E1D"
            })]
          })]
        })]
      }), brand.isHot && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].hotBadge,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].hotBadgeText,
          children: "\u70ED\u95E8\u54C1\u724C"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sectionHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sectionTitle,
          children: "\u54C1\u724C\u5546\u54C1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sectionMore,
          children: "\u67E5\u770B\u5168\u90E8 \u203A"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productGrid,
        children: brandProducts.map(function (product) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productItem,
            onClick: function onClick() {
              return goToProductDetail(product.id);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
              src: product.images[0],
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productImage,
              mode: "aspectFill"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productName,
                children: product.name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productPriceWrap,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productPrice,
                  children: ["\xA5", product.price]
                }), product.originalPrice > product.price && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productOriginalPrice,
                  children: ["\xA5", product.originalPrice]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productSales,
                children: ["\u5DF2\u552E ", product.sales]
              })]
            })]
          }, product.id);
        })
      }), brandProducts.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyProducts,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyText,
          children: "\u6682\u65E0\u5546\u54C1"
        })
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (BrandDetailPage);

/***/ }),

/***/ "./src/pages/home/brand-detail/index.tsx":
/*!***********************************************!*\
  !*** ./src/pages/home/brand-detail/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brand_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brand-detail/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brand-detail/index!./src/pages/home/brand-detail/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brand_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/brand-detail/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brand_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brand_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brand_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_brand_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/brand-detail.module.scss":
/*!**************************************************!*\
  !*** ./src/styles/home/brand-detail.module.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"brandDetailPage":"brand-detail-module__brandDetailPage___c9jGI","brandHeader":"brand-detail-module__brandHeader___RbRvJ","brandLogo":"brand-detail-module__brandLogo___dO7Ha","brandInfo":"brand-detail-module__brandInfo___tCYUr","brandName":"brand-detail-module__brandName___uY5SG","brandDesc":"brand-detail-module__brandDesc___NC7ma","brandStats":"brand-detail-module__brandStats____lkjE","statItem":"brand-detail-module__statItem___jshVf","statNum":"brand-detail-module__statNum___kyHzl","statLabel":"brand-detail-module__statLabel___w4T7T","statDivider":"brand-detail-module__statDivider___c8haC","hotBadge":"brand-detail-module__hotBadge___mms7R","hotBadgeText":"brand-detail-module__hotBadgeText___iDe0Z","productSection":"brand-detail-module__productSection___YWioX","sectionHeader":"brand-detail-module__sectionHeader___Vxvab","sectionTitle":"brand-detail-module__sectionTitle___HbXyp","sectionMore":"brand-detail-module__sectionMore___dObsC","productGrid":"brand-detail-module__productGrid___Qwwiw","productItem":"brand-detail-module__productItem___K9c40","productImage":"brand-detail-module__productImage___FUCZz","productInfo":"brand-detail-module__productInfo___cU77j","productName":"brand-detail-module__productName___txAB5","productPriceWrap":"brand-detail-module__productPriceWrap___SfKgE","productPrice":"brand-detail-module__productPrice___wAJmo","productOriginalPrice":"brand-detail-module__productOriginalPrice___IUJoz","productSales":"brand-detail-module__productSales___vBlVx","emptyProducts":"brand-detail-module__emptyProducts___AOSSx","emptyText":"brand-detail-module__emptyText___BqeqQ","loading":"brand-detail-module__loading___Gp3wa","loadingText":"brand-detail-module__loadingText___iEy4u"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/brand-detail/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map