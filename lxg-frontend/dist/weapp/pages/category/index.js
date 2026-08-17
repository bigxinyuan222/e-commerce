"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/category/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/index!./src/pages/category/index.tsx":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/index!./src/pages/category/index.tsx ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _utils_categoryIcons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/categoryIcons */ "./src/utils/categoryIcons.ts");
/* harmony import */ var _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/styles/category/category.module.scss */ "./src/styles/category/category.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");














function normalizeCategory(item) {
  var _ref, _ref2, _ref3, _ref4, _item$id, _ref5, _ref6, _ref7, _item$name, _ref8, _ref9, _ref0, _item$icon;
  if (!item) return null;
  return {
    id: (_ref = (_ref2 = (_ref3 = (_ref4 = (_item$id = item.id) !== null && _item$id !== void 0 ? _item$id : item.ID) !== null && _ref4 !== void 0 ? _ref4 : item.categoryId) !== null && _ref3 !== void 0 ? _ref3 : item.CategoryId) !== null && _ref2 !== void 0 ? _ref2 : item.Id) !== null && _ref !== void 0 ? _ref : '',
    name: (_ref5 = (_ref6 = (_ref7 = (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : item.Name) !== null && _ref7 !== void 0 ? _ref7 : item.categoryName) !== null && _ref6 !== void 0 ? _ref6 : item.CategoryName) !== null && _ref5 !== void 0 ? _ref5 : '',
    icon: (_ref8 = (_ref9 = (_ref0 = (_item$icon = item.icon) !== null && _item$icon !== void 0 ? _item$icon : item.Icon) !== null && _ref0 !== void 0 ? _ref0 : item.image) !== null && _ref9 !== void 0 ? _ref9 : item.Image) !== null && _ref8 !== void 0 ? _ref8 : '',
    children: (item.children || item.child || item.subCategories || item.subs || item.list || item.items || []).map(normalizeCategory)
  };
}
function normalizeProduct(item) {
  var _ref1, _ref10, _ref11, _item$id2, _ref12, _ref13, _ref14, _item$name2, _ref15, _ref16, _ref17, _item$price, _ref18, _ref19, _ref20, _item$originalPrice, _ref21, _ref22, _item$images, _ref23, _ref24, _ref25, _item$image, _ref26, _ref27, _ref28, _item$sales;
  if (!item) return null;
  return {
    id: (_ref1 = (_ref10 = (_ref11 = (_item$id2 = item.id) !== null && _item$id2 !== void 0 ? _item$id2 : item.ID) !== null && _ref11 !== void 0 ? _ref11 : item.productId) !== null && _ref10 !== void 0 ? _ref10 : item.ProductId) !== null && _ref1 !== void 0 ? _ref1 : '',
    name: (_ref12 = (_ref13 = (_ref14 = (_item$name2 = item.name) !== null && _item$name2 !== void 0 ? _item$name2 : item.Name) !== null && _ref14 !== void 0 ? _ref14 : item.productName) !== null && _ref13 !== void 0 ? _ref13 : item.ProductName) !== null && _ref12 !== void 0 ? _ref12 : '',
    price: (_ref15 = (_ref16 = (_ref17 = (_item$price = item.price) !== null && _item$price !== void 0 ? _item$price : item.Price) !== null && _ref17 !== void 0 ? _ref17 : item.salePrice) !== null && _ref16 !== void 0 ? _ref16 : item.SalePrice) !== null && _ref15 !== void 0 ? _ref15 : 0,
    originalPrice: (_ref18 = (_ref19 = (_ref20 = (_item$originalPrice = item.originalPrice) !== null && _item$originalPrice !== void 0 ? _item$originalPrice : item.OriginalPrice) !== null && _ref20 !== void 0 ? _ref20 : item.marketPrice) !== null && _ref19 !== void 0 ? _ref19 : item.MarketPrice) !== null && _ref18 !== void 0 ? _ref18 : 0,
    images: (_ref21 = (_ref22 = (_item$images = item.images) !== null && _item$images !== void 0 ? _item$images : item.Images) !== null && _ref22 !== void 0 ? _ref22 : item.imageList) !== null && _ref21 !== void 0 ? _ref21 : [],
    image: (_ref23 = (_ref24 = (_ref25 = (_item$image = item.image) !== null && _item$image !== void 0 ? _item$image : item.Image) !== null && _ref25 !== void 0 ? _ref25 : item.cover) !== null && _ref24 !== void 0 ? _ref24 : item.Cover) !== null && _ref23 !== void 0 ? _ref23 : '',
    sales: (_ref26 = (_ref27 = (_ref28 = (_item$sales = item.sales) !== null && _item$sales !== void 0 ? _item$sales : item.Sales) !== null && _ref28 !== void 0 ? _ref28 : item.soldCount) !== null && _ref27 !== void 0 ? _ref27 : item.SoldCount) !== null && _ref26 !== void 0 ? _ref26 : 0
  };
}
var SubCategoryItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref29) {
  var subCategory = _ref29.subCategory,
    _onClick = _ref29.onClick;
  var iconSrc = (0,_utils_categoryIcons__WEBPACK_IMPORTED_MODULE_5__.getCategoryIcon)(subCategory.name, subCategory.icon);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].subCategoryItem,
    onClick: function onClick() {
      return _onClick(subCategory.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].subCategoryIcon,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_9__["default"])({
        src: iconSrc.startsWith('data:') || iconSrc.includes('.svg') ? iconSrc : (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(iconSrc),
        mode: "aspectFill"
      }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.lazyImgProps)()))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].subCategoryName,
      children: subCategory.name
    })]
  }, subCategory.id);
});
var RecommendProduct = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref30) {
  var _product$images;
  var product = _ref30.product,
    _onClick2 = _ref30.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].recommendProduct,
    onClick: function onClick() {
      return _onClick2(product.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_9__["default"])({
      src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(((_product$images = product.images) === null || _product$images === void 0 ? void 0 : _product$images[0]) || product.image),
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].productImage,
      mode: "aspectFill"
    }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].productName,
        children: product.name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].productPrice,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].priceSymbol,
          children: "\xA5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].price,
          children: product.price
        })]
      })]
    })]
  }, product.id);
});
var CategoryPage = function CategoryPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState, 2),
    categories = _useState2[0],
    setCategories = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState3, 2),
    activeCategory = _useState4[0],
    setActiveCategory = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState5, 2),
    subCategories = _useState6[0],
    setSubCategories = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState7, 2),
    categoryProducts = _useState8[0],
    setCategoryProducts = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState1, 2),
    loadingMore = _useState10[0],
    setLoadingMore = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState11, 2),
    hasMore = _useState12[0],
    setHasMore = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState14 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_10__["default"])(_useState13, 2),
    page = _useState14[0],
    setPage = _useState14[1];
  var activeSubCatIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)('');
  var initialCategoryIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)('');
  var goToProductDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId)
    });
  }, []);
  var loadCategoryTree = /*#__PURE__*/function () {
    var _ref31 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee(targetCategoryId) {
      var res, _res$data, _res$data2, rawData, normalized, targetIndex, idx, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.categoryApi.categoryTree);
          case 1:
            res = _context.v;
            if (res !== null && res !== void 0 && res.data) {
              rawData = Array.isArray(res.data) ? res.data : ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.list) || ((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.data) || [];
              normalized = rawData.map(normalizeCategory).filter(Boolean);
              setCategories(normalized);
              if (normalized.length > 0) {
                targetIndex = 0;
                if (targetCategoryId) {
                  idx = normalized.findIndex(function (c) {
                    return c.id === targetCategoryId;
                  });
                  if (idx !== -1) {
                    targetIndex = idx;
                  }
                }
                setActiveCategory(targetIndex);
                loadSubCategories(normalized[targetIndex].id);
              }
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Failed to load category tree:', _t);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '加载分类失败',
              icon: 'none'
            });
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadCategoryTree(_x) {
      return _ref31.apply(this, arguments);
    };
  }();
  var loadSubCategories = /*#__PURE__*/function () {
    var _ref32 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee2(categoryId) {
      var res, _res$data3, _res$data4, rawData, normalized, _t2;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (categoryId) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.categoryApi.categoryOne, {
              id: categoryId
            });
          case 2:
            res = _context2.v;
            if (res !== null && res !== void 0 && res.data) {
              rawData = Array.isArray(res.data) ? res.data : ((_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.list) || ((_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.data) || [];
              normalized = rawData.map(normalizeCategory).filter(Boolean);
              setSubCategories(normalized);
              if (normalized.length > 0) {
                loadProducts(normalized[0].id);
              } else {
                setCategoryProducts([]);
                setHasMore(false);
              }
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            console.error('Failed to load sub categories:', _t2);
            setSubCategories([]);
            setCategoryProducts([]);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function loadSubCategories(_x2) {
      return _ref32.apply(this, arguments);
    };
  }();
  var loadProducts = /*#__PURE__*/function () {
    var _ref33 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().m(function _callee3(subCategoryId) {
      var reset,
        currentPage,
        res,
        _res$data5,
        _res$data6,
        _ref34,
        _ref35,
        _res$data$total,
        _res$data7,
        _res$data8,
        rawData,
        normalized,
        finalProducts,
        total,
        loadedCount,
        _args3 = arguments,
        _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            reset = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : true;
            if (subCategoryId) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            activeSubCatIdRef.current = subCategoryId;
            if (reset) {
              setPage(1);
              setCategoryProducts([]);
              setHasMore(true);
            }
            _context3.p = 2;
            setLoadingMore(!reset);
            currentPage = reset ? 1 : page;
            _context3.n = 3;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.categoryApi.categorySecond, {
              id: subCategoryId,
              page: currentPage,
              size: 10
            });
          case 3:
            res = _context3.v;
            if (res !== null && res !== void 0 && res.data) {
              rawData = Array.isArray(res.data) ? res.data : ((_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : _res$data5.list) || ((_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.data) || [];
              normalized = rawData.map(normalizeProduct).filter(Boolean);
              finalProducts = (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.normalizeProductListImages)(normalized);
              if (reset) {
                setCategoryProducts(finalProducts);
              } else {
                setCategoryProducts(function (prev) {
                  return [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(prev), (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_13__["default"])(finalProducts));
                });
              }
              total = (_ref34 = (_ref35 = (_res$data$total = (_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : _res$data7.total) !== null && _res$data$total !== void 0 ? _res$data$total : res.total) !== null && _ref35 !== void 0 ? _ref35 : (_res$data8 = res.data) === null || _res$data8 === void 0 ? void 0 : _res$data8.Total) !== null && _ref34 !== void 0 ? _ref34 : 0;
              loadedCount = reset ? finalProducts.length : categoryProducts.length + finalProducts.length;
              setHasMore(finalProducts.length >= 10 && loadedCount < total);
              setPage(currentPage + 1);
            }
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            console.error('Failed to load products:', _t3);
            if (reset) {
              setCategoryProducts([]);
            }
          case 5:
            _context3.p = 5;
            setLoadingMore(false);
            return _context3.f(5);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 4, 5, 6]]);
    }));
    return function loadProducts(_x3) {
      return _ref33.apply(this, arguments);
    };
  }();
  var handleCategoryClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (index) {
    setActiveCategory(index);
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().removeStorageSync('targetCategoryId');
    initialCategoryIdRef.current = '';
    if (categories[index]) {
      setCategoryProducts([]);
      loadSubCategories(categories[index].id);
    }
  }, [categories]);
  var handleSubCategoryClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (subCategoryId) {
    loadProducts(subCategoryId, true);
  }, []);
  var loadMore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (loadingMore || !hasMore) return;
    var currentCat = categories[activeCategory];
    if (currentCat && subCategories.length > 0) {
      var _subCategories$;
      loadProducts((_subCategories$ = subCategories[0]) === null || _subCategories$ === void 0 ? void 0 : _subCategories$.id, false);
    }
  }, [loadingMore, hasMore, categories, activeCategory, subCategories, page]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var targetCategoryId = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('targetCategoryId') || '';
    initialCategoryIdRef.current = targetCategoryId;
    loadCategoryTree(targetCategoryId);
  }, []);
  (0,_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__.useDidShow)(function () {
    var targetCategoryId = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync('targetCategoryId') || '';
    if (targetCategoryId && targetCategoryId !== initialCategoryIdRef.current) {
      initialCategoryIdRef.current = targetCategoryId;
      loadCategoryTree(targetCategoryId);
    }
  });
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].categoryPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].categoryPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
      scrollY: true,
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].categoryNav,
      children: categories.map(function (category, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "".concat(_styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].categoryItem, " ").concat(index === activeCategory ? _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].active : ''),
          onClick: function onClick() {
            return handleCategoryClick(index);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            children: category.name
          })
        }, category.id);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
      scrollY: true,
      className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].subCategoryContent,
      onScrollToLower: loadMore,
      children: [subCategories.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].subCategoryGrid,
        children: subCategories.map(function (subCategory) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(SubCategoryItem, {
            subCategory: subCategory,
            onClick: handleSubCategoryClick
          }, subCategory.id);
        })
      }), categoryProducts.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].hotTag,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].hotTitle,
            children: "\u70ED\u9500\u63A8\u8350"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].recommendSection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_category_category_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].recommendGrid,
            children: categoryProducts.map(function (product) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(RecommendProduct, {
                product: product,
                onClick: goToProductDetail
              }, product.id);
            })
          }), loadingMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            style: {
              textAlign: 'center',
              padding: '20rpx'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              children: "\u52A0\u8F7D\u4E2D..."
            })
          }), !hasMore && categoryProducts.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            style: {
              textAlign: 'center',
              padding: '20rpx'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              children: "\u5DF2\u7ECF\u5230\u5E95\u4E86"
            })
          })]
        })]
      }), categoryProducts.length === 0 && subCategories.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        style: {
          padding: '100rpx',
          textAlign: 'center',
          color: '#999'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          children: "\u6682\u65E0\u5546\u54C1"
        })
      }), categoryProducts.length === 0 && subCategories.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        style: {
          padding: '100rpx',
          textAlign: 'center',
          color: '#999'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          children: "\u8BF7\u9009\u62E9\u4E8C\u7EA7\u5206\u7C7B\u67E5\u770B\u5546\u54C1"
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
/* harmony default export */ __webpack_exports__["default"] = ({"categoryPage":"category-module__categoryPage___qID3A","categoryNav":"category-module__categoryNav___LCvxr","categoryItem":"category-module__categoryItem___NZiBR","active":"category-module__active___Zn1kp","subCategoryContent":"category-module__subCategoryContent___uhGfl","subCategoryTitle":"category-module__subCategoryTitle___oXEJ7","subCategoryGrid":"category-module__subCategoryGrid___KsiMm","subCategoryItem":"category-module__subCategoryItem___QJxRm","subCategoryIcon":"category-module__subCategoryIcon___I_3js","subCategoryName":"category-module__subCategoryName___L8D9J","brandSection":"category-module__brandSection____f9Hw","brandTitle":"category-module__brandTitle___hSRDG","brandGrid":"category-module__brandGrid___bA4__","brandItem":"category-module__brandItem___lfDqO","brandLogo":"category-module__brandLogo___AdMrE","brandName":"category-module__brandName___jHC3T","recommendSection":"category-module__recommendSection___MuV05","recommendTitle":"category-module__recommendTitle___jKPTc","recommendGrid":"category-module__recommendGrid___kCh2F","recommendProduct":"category-module__recommendProduct___PynfS","productImage":"category-module__productImage___WZupy","productInfo":"category-module__productInfo___ok_WS","productName":"category-module__productName___FWjZl","productPrice":"category-module__productPrice___u63EH","priceSymbol":"category-module__priceSymbol___rBvmW","price":"category-module__price___YuWOz","originalPrice":"category-module__originalPrice___TnTQy","hotTag":"category-module__hotTag___JmKvE","hotTitle":"category-module__hotTitle___YNJ2W"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/category/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map