"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/brand-detail/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brand-detail/index!./src/pages/home/brand-detail/index.tsx":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brand-detail/index!./src/pages/home/brand-detail/index.tsx ***!
  \****************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/home/brand-detail.module.scss */ "./src/styles/home/brand-detail.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");














var PAGE_SIZE = 10;

/**
 * 规范化品牌数据（与 brands 列表页保持一致）
 */
function normalizeBrand(item) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _item$id, _ref8, _ref9, _ref0, _item$name, _ref1, _ref10, _ref11, _ref12, _ref13, _item$logo, _ref14, _ref15, _ref16, _ref17, _ref18, _item$description, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _item$productsCount, _ref28, _ref29, _ref30, _item$isHot;
  if (!item) return null;
  var id = (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_item$id = item.id) !== null && _item$id !== void 0 ? _item$id : item.ID) !== null && _ref7 !== void 0 ? _ref7 : item.brandId) !== null && _ref6 !== void 0 ? _ref6 : item.BrandId) !== null && _ref5 !== void 0 ? _ref5 : item.code) !== null && _ref4 !== void 0 ? _ref4 : item.Code) !== null && _ref3 !== void 0 ? _ref3 : item.brandCode) !== null && _ref2 !== void 0 ? _ref2 : item.BrandCode) !== null && _ref !== void 0 ? _ref : '';
  var name = (_ref8 = (_ref9 = (_ref0 = (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : item.Name) !== null && _ref0 !== void 0 ? _ref0 : item.brandName) !== null && _ref9 !== void 0 ? _ref9 : item.BrandName) !== null && _ref8 !== void 0 ? _ref8 : '';
  var logo = (_ref1 = (_ref10 = (_ref11 = (_ref12 = (_ref13 = (_item$logo = item.logo) !== null && _item$logo !== void 0 ? _item$logo : item.Logo) !== null && _ref13 !== void 0 ? _ref13 : item.icon) !== null && _ref12 !== void 0 ? _ref12 : item.Icon) !== null && _ref11 !== void 0 ? _ref11 : item.image) !== null && _ref10 !== void 0 ? _ref10 : item.Image) !== null && _ref1 !== void 0 ? _ref1 : '';
  var description = (_ref14 = (_ref15 = (_ref16 = (_ref17 = (_ref18 = (_item$description = item.description) !== null && _item$description !== void 0 ? _item$description : item.Description) !== null && _ref18 !== void 0 ? _ref18 : item.desc) !== null && _ref17 !== void 0 ? _ref17 : item.Desc) !== null && _ref16 !== void 0 ? _ref16 : item.intro) !== null && _ref15 !== void 0 ? _ref15 : item.Intro) !== null && _ref14 !== void 0 ? _ref14 : '';
  var productsCount = (_ref19 = (_ref20 = (_ref21 = (_ref22 = (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_ref27 = (_item$productsCount = item.productsCount) !== null && _item$productsCount !== void 0 ? _item$productsCount : item.ProductsCount) !== null && _ref27 !== void 0 ? _ref27 : item.count) !== null && _ref26 !== void 0 ? _ref26 : item.Count) !== null && _ref25 !== void 0 ? _ref25 : item.num) !== null && _ref24 !== void 0 ? _ref24 : item.Num) !== null && _ref23 !== void 0 ? _ref23 : item.productNum) !== null && _ref22 !== void 0 ? _ref22 : item.product_num) !== null && _ref21 !== void 0 ? _ref21 : item.total) !== null && _ref20 !== void 0 ? _ref20 : item.Total) !== null && _ref19 !== void 0 ? _ref19 : 0;
  var isHot = (_ref28 = (_ref29 = (_ref30 = (_item$isHot = item.isHot) !== null && _item$isHot !== void 0 ? _item$isHot : item.IsHot) !== null && _ref30 !== void 0 ? _ref30 : item.hot) !== null && _ref29 !== void 0 ? _ref29 : item.Hot) !== null && _ref28 !== void 0 ? _ref28 : false;
  var rawChildren = item.children || item.child || item.subBrands || item.subs || item.list || item.items || [];
  var children = rawChildren.map(normalizeBrand).filter(Boolean);
  return {
    id: String(id),
    name: name,
    logo: logo,
    description: description,
    productsCount: Number(productsCount) || 0,
    isHot: !!isHot,
    children: children
  };
}

/**
 * 在品牌树中递归查找指定品牌
 */
function findBrandInTree(tree, brandId) {
  if (!Array.isArray(tree) || !brandId) return null;
  var _iterator = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_7__["default"])(tree),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      if (!node) continue;
      if (node.id === brandId) return node;
      if (node.children && node.children.length > 0) {
        var found = findBrandInTree(node.children, brandId);
        if (found) return found;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
}

/**
 * 规范化商品数据（兼容多字段命名）
 */
function normalizeProduct(item) {
  var _ref31, _ref32, _ref33, _item$id2, _ref34, _ref35, _ref36, _item$name2, _ref37, _ref38, _ref39, _item$price, _ref40, _ref41, _ref42, _item$originalPrice, _ref43, _ref44, _item$images, _ref45, _ref46, _ref47, _item$image, _ref48, _ref49, _ref50, _item$sales;
  if (!item) return null;
  return {
    id: (_ref31 = (_ref32 = (_ref33 = (_item$id2 = item.id) !== null && _item$id2 !== void 0 ? _item$id2 : item.ID) !== null && _ref33 !== void 0 ? _ref33 : item.productId) !== null && _ref32 !== void 0 ? _ref32 : item.ProductId) !== null && _ref31 !== void 0 ? _ref31 : '',
    name: (_ref34 = (_ref35 = (_ref36 = (_item$name2 = item.name) !== null && _item$name2 !== void 0 ? _item$name2 : item.Name) !== null && _ref36 !== void 0 ? _ref36 : item.productName) !== null && _ref35 !== void 0 ? _ref35 : item.ProductName) !== null && _ref34 !== void 0 ? _ref34 : '',
    price: (_ref37 = (_ref38 = (_ref39 = (_item$price = item.price) !== null && _item$price !== void 0 ? _item$price : item.Price) !== null && _ref39 !== void 0 ? _ref39 : item.salePrice) !== null && _ref38 !== void 0 ? _ref38 : item.SalePrice) !== null && _ref37 !== void 0 ? _ref37 : 0,
    originalPrice: (_ref40 = (_ref41 = (_ref42 = (_item$originalPrice = item.originalPrice) !== null && _item$originalPrice !== void 0 ? _item$originalPrice : item.OriginalPrice) !== null && _ref42 !== void 0 ? _ref42 : item.marketPrice) !== null && _ref41 !== void 0 ? _ref41 : item.MarketPrice) !== null && _ref40 !== void 0 ? _ref40 : 0,
    images: (_ref43 = (_ref44 = (_item$images = item.images) !== null && _item$images !== void 0 ? _item$images : item.Images) !== null && _ref44 !== void 0 ? _ref44 : item.imageList) !== null && _ref43 !== void 0 ? _ref43 : [],
    image: (_ref45 = (_ref46 = (_ref47 = (_item$image = item.image) !== null && _item$image !== void 0 ? _item$image : item.Image) !== null && _ref47 !== void 0 ? _ref47 : item.cover) !== null && _ref46 !== void 0 ? _ref46 : item.Cover) !== null && _ref45 !== void 0 ? _ref45 : '',
    sales: (_ref48 = (_ref49 = (_ref50 = (_item$sales = item.sales) !== null && _item$sales !== void 0 ? _item$sales : item.Sales) !== null && _ref50 !== void 0 ? _ref50 : item.soldCount) !== null && _ref49 !== void 0 ? _ref49 : item.SoldCount) !== null && _ref48 !== void 0 ? _ref48 : 0
  };
}
var BrandDetailPage = function BrandDetailPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    brand = _useState2[0],
    setBrand = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    brandProducts = _useState4[0],
    setBrandProducts = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState7, 2),
    loadingMore = _useState8[0],
    setLoadingMore = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState9, 2),
    hasMore = _useState0[0],
    setHasMore = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState1, 2),
    page = _useState10[0],
    setPage = _useState10[1];
  var brandIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)('');
  var goToProductDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    if (!productId) return;
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/home/detail/index?id=' + productId
    });
  }, []);

  // 获取品牌信息（通过品牌树查找）
  var loadBrandInfo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref51 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee(brandId) {
      var res, _res$data, _res$data2, rawData, normalized, found, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.brandApi.brandTree);
          case 1:
            res = _context.v;
            if (res !== null && res !== void 0 && res.data) {
              rawData = Array.isArray(res.data) ? res.data : ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.list) || ((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.data) || [];
              normalized = rawData.map(normalizeBrand).filter(Boolean);
              found = findBrandInTree(normalized, brandId);
              setBrand(found || {
                id: brandId,
                name: '品牌详情',
                logo: '',
                description: '',
                productsCount: 0,
                isHot: false,
                children: []
              });
            } else {
              setBrand({
                id: brandId,
                name: '品牌详情',
                logo: '',
                description: '',
                productsCount: 0,
                isHot: false,
                children: []
              });
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Failed to load brand info:', _t);
            setBrand({
              id: brandId,
              name: '品牌详情',
              logo: '',
              description: '',
              productsCount: 0,
              isHot: false,
              children: []
            });
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function (_x) {
      return _ref51.apply(this, arguments);
    };
  }(), []);

  // 分页加载品牌商品
  var loadProducts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref52 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee2(brandId) {
      var reset,
        currentPage,
        res,
        _res$data3,
        _res$data4,
        _ref53,
        _ref54,
        _res$data$total,
        _res$data5,
        _res$data6,
        rawData,
        normalized,
        finalProducts,
        total,
        loadedCount,
        _args2 = arguments,
        _t2;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            reset = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
            if (brandId) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            brandIdRef.current = brandId;
            if (reset) {
              setPage(1);
              setBrandProducts([]);
              setHasMore(true);
            }
            _context2.p = 2;
            setLoadingMore(!reset);
            // 后端验证小写 id 参数（虽报错提示 "Id是必填项"），与 category 接口规则一致
            currentPage = reset ? 1 : page;
            _context2.n = 3;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.brandApi.brandProducts, {
              id: brandId,
              page: currentPage,
              size: PAGE_SIZE
            });
          case 3:
            res = _context2.v;
            if (res !== null && res !== void 0 && res.data) {
              rawData = Array.isArray(res.data) ? res.data : ((_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.list) || ((_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.data) || [];
              normalized = rawData.map(normalizeProduct).filter(Boolean);
              finalProducts = (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.normalizeProductListImages)(normalized);
              if (reset) {
                setBrandProducts(finalProducts);
              } else {
                setBrandProducts(function (prev) {
                  return [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(prev), (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(finalProducts));
                });
              }
              total = (_ref53 = (_ref54 = (_res$data$total = (_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : _res$data5.total) !== null && _res$data$total !== void 0 ? _res$data$total : res.total) !== null && _ref54 !== void 0 ? _ref54 : (_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.Total) !== null && _ref53 !== void 0 ? _ref53 : 0;
              loadedCount = reset ? finalProducts.length : brandProducts.length + finalProducts.length;
              setHasMore(finalProducts.length >= PAGE_SIZE && (total === 0 || loadedCount < total));
              setPage(currentPage + 1);

              // 用商品接口的 total 回填品牌商品数（品牌树接口不返回 productsCount）
              if (reset && total > 0) {
                setBrand(function (prev) {
                  if (!prev) return prev;
                  if (prev.productsCount > 0) return prev;
                  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__["default"])({}, prev), {}, {
                    productsCount: total
                  });
                });
              }
            }
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error('Failed to load brand products:', _t2);
            if (reset) {
              setBrandProducts([]);
            }
          case 5:
            _context2.p = 5;
            setLoadingMore(false);
            setLoading(false);
            return _context2.f(5);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 4, 5, 6]]);
    }));
    return function (_x2) {
      return _ref52.apply(this, arguments);
    };
  }(), [page, brandProducts.length]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = (_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params;
    var brandId = (params === null || params === void 0 ? void 0 : params.id) || '';
    if (brandId) {
      setLoading(true);
      loadBrandInfo(brandId);
      loadProducts(brandId, true);
    } else {
      setLoading(false);
    }
  }, []);
  var loadMore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (loadingMore || !hasMore) return;
    if (brandIdRef.current) {
      loadProducts(brandIdRef.current, false);
    }
  }, [loadingMore, hasMore, loadProducts]);
  if (loading && !brand) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loadingText,
        children: "\u52A0\u8F7D\u4E2D..."
      })
    });
  }
  if (!brand) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].loadingText,
        children: "\u54C1\u724C\u4E0D\u5B58\u5728"
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.ScrollView, {
    scrollY: true,
    className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandDetailPage,
    onScrollToLower: loadMore,
    lowerThreshold: 100,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandIconWrap,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Image, {
          src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getBrandIcon)(brand),
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandIconImg,
          mode: "aspectFit"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandName,
          children: brand.name
        }), brand.description ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandDesc,
          children: brand.description
        }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandStats,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].statItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].statNum,
              children: brand.productsCount
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].statLabel,
              children: "\u6B3E\u5546\u54C1"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].statDivider
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].statItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].statNum,
              children: "10\u4E07+"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].statLabel,
              children: "\u7C89\u4E1D"
            })]
          })]
        })]
      }), brand.isHot && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hotBadge,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hotBadgeText,
          children: "\u70ED\u95E8\u54C1\u724C"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productSection,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionTitle,
          children: "\u54C1\u724C\u5546\u54C1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sectionMore,
          children: loadingMore ? '加载中...' : hasMore ? '查看全部 ›' : '没有更多了'
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productGrid,
        children: brandProducts.map(function (product) {
          var _product$images;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productItem,
            onClick: function onClick() {
              return goToProductDetail(product.id);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_12__["default"])({
              src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(((_product$images = product.images) === null || _product$images === void 0 ? void 0 : _product$images[0]) || product.image),
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productImage,
              mode: "aspectFill"
            }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
              className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
                className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productName,
                children: product.name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
                className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productPriceWrap,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
                  className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceSymbol,
                  children: "\xA5"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
                  className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productPrice,
                  children: product.price
                }), product.originalPrice > product.price && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
                  className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productOriginalPrice,
                  children: ["\xA5", product.originalPrice]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
                className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productSales,
                children: ["\u5DF2\u552E ", product.sales]
              })]
            })]
          }, product.id);
        })
      }), brandProducts.length === 0 && !loadingMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyProducts,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
          children: "\u6682\u65E0\u5546\u54C1"
        })
      }), loadingMore && brandProducts.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyProducts,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_home_brand_detail_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
          children: "\u52A0\u8F7D\u4E2D..."
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
/* harmony default export */ __webpack_exports__["default"] = ({"brandDetailPage":"brand-detail-module__brandDetailPage___c9jGI","brandHeader":"brand-detail-module__brandHeader___RbRvJ","brandIconWrap":"brand-detail-module__brandIconWrap___gpZl4","brandIconImg":"brand-detail-module__brandIconImg___eQuoe","brandIconSvg":"brand-detail-module__brandIconSvg___UhjPc","brandInfo":"brand-detail-module__brandInfo___tCYUr","brandName":"brand-detail-module__brandName___uY5SG","brandDesc":"brand-detail-module__brandDesc___NC7ma","brandStats":"brand-detail-module__brandStats____lkjE","statItem":"brand-detail-module__statItem___jshVf","statNum":"brand-detail-module__statNum___kyHzl","statLabel":"brand-detail-module__statLabel___w4T7T","statDivider":"brand-detail-module__statDivider___c8haC","hotBadge":"brand-detail-module__hotBadge___mms7R","hotBadgeText":"brand-detail-module__hotBadgeText___iDe0Z","productSection":"brand-detail-module__productSection___YWioX","sectionHeader":"brand-detail-module__sectionHeader___Vxvab","sectionTitle":"brand-detail-module__sectionTitle___HbXyp","sectionMore":"brand-detail-module__sectionMore___dObsC","productGrid":"brand-detail-module__productGrid___Qwwiw","productItem":"brand-detail-module__productItem___K9c40","productImage":"brand-detail-module__productImage___FUCZz","productInfo":"brand-detail-module__productInfo___cU77j","productName":"brand-detail-module__productName___txAB5","productPriceWrap":"brand-detail-module__productPriceWrap___SfKgE","priceSymbol":"brand-detail-module__priceSymbol___xaZ68","productPrice":"brand-detail-module__productPrice___wAJmo","productOriginalPrice":"brand-detail-module__productOriginalPrice___IUJoz","productSales":"brand-detail-module__productSales___vBlVx","emptyProducts":"brand-detail-module__emptyProducts___AOSSx","emptyText":"brand-detail-module__emptyText___BqeqQ","loading":"brand-detail-module__loading___Gp3wa","loadingText":"brand-detail-module__loadingText___iEy4u"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/brand-detail/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map