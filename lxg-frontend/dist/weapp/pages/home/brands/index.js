"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/brands/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brands/index!./src/pages/home/brands/index.tsx":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/brands/index!./src/pages/home/brands/index.tsx ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/home/brands.module.scss */ "./src/styles/home/brands.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");












/**
 * 规范化品牌数据
 * 兼容后端 snake_case / PascalCase / camelCase 字段
 * 兼容 id/brandId/code/brandCode 作为 ID
 * 兼容 children/child/subBrands/subs 作为子品牌
 * 兼容 productsCount/count/num/productNum/product_num/total 作为商品数
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

  // 子品牌递归处理
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
 * 扁平化品牌树，提取所有叶子节点和父节点为一维数组
 * 用于「全部品牌」展示
 */
function flattenBrands(tree) {
  var result = [];
  var _walk = function walk(nodes) {
    if (!Array.isArray(nodes)) return;
    nodes.forEach(function (node) {
      if (!node) return;
      result.push(node);
      if (node.children && node.children.length > 0) {
        _walk(node.children);
      }
    });
  };
  _walk(tree);
  return result;
}
var BrandsPage = function BrandsPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('hot'),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState3, 2),
    searchKeyword = _useState4[0],
    setSearchKeyword = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState5, 2),
    brandTree = _useState6[0],
    setBrandTree = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];

  // 加载品牌树
  var loadBrandTree = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee2() {
    var res, _res$data, _res$data2, rawData, normalized, counts, countMap, withCounts, _t2;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          setLoading(true);
          _context2.p = 1;
          _context2.n = 2;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.brandApi.brandTree);
        case 2:
          res = _context2.v;
          if (!(res !== null && res !== void 0 && res.data)) {
            _context2.n = 4;
            break;
          }
          rawData = Array.isArray(res.data) ? res.data : ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.list) || ((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.data) || [];
          normalized = rawData.map(normalizeBrand).filter(Boolean); // 品牌树接口不返回 productsCount，通过商品接口并行获取每个品牌的商品数
          _context2.n = 3;
          return Promise.all(normalized.map(/*#__PURE__*/function () {
            var _ref32 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee(brand) {
              var _ref33, _ref34, _r$data$total, _r$data, _r$data2, r, total, _t;
              return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
                while (1) switch (_context.p = _context.n) {
                  case 0:
                    _context.p = 0;
                    _context.n = 1;
                    return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.brandApi.brandProducts, {
                      id: brand.id,
                      page: 1,
                      size: 1
                    });
                  case 1:
                    r = _context.v;
                    total = (_ref33 = (_ref34 = (_r$data$total = r === null || r === void 0 || (_r$data = r.data) === null || _r$data === void 0 ? void 0 : _r$data.total) !== null && _r$data$total !== void 0 ? _r$data$total : r === null || r === void 0 ? void 0 : r.total) !== null && _ref34 !== void 0 ? _ref34 : r === null || r === void 0 || (_r$data2 = r.data) === null || _r$data2 === void 0 ? void 0 : _r$data2.Total) !== null && _ref33 !== void 0 ? _ref33 : 0;
                    return _context.a(2, {
                      id: brand.id,
                      count: total
                    });
                  case 2:
                    _context.p = 2;
                    _t = _context.v;
                    return _context.a(2, {
                      id: brand.id,
                      count: 0
                    });
                }
              }, _callee, null, [[0, 2]]);
            }));
            return function (_x) {
              return _ref32.apply(this, arguments);
            };
          }()));
        case 3:
          counts = _context2.v;
          countMap = new Map(counts.map(function (c) {
            return [c.id, c.count];
          }));
          withCounts = normalized.map(function (b) {
            return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, b), {}, {
              productsCount: countMap.get(b.id) || b.productsCount || 0
            });
          });
          setBrandTree(withCounts);
        case 4:
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t2 = _context2.v;
          console.error('Failed to load brand tree:', _t2);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '加载品牌失败',
            icon: 'none'
          });
        case 6:
          _context2.p = 6;
          setLoading(false);
          return _context2.f(6);
        case 7:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 5, 6, 7]]);
  })), []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadBrandTree();
  }, [loadBrandTree]);

  // 扁平化所有品牌用于展示和搜索
  var allBrands = flattenBrands(brandTree);

  // 当前展示的品牌列表
  var displayBrands;
  if (searchKeyword) {
    var lowerKw = searchKeyword.toLowerCase();
    displayBrands = allBrands.filter(function (brand) {
      return (brand.name || '').toLowerCase().indexOf(lowerKw) > -1 || (brand.description || '').toLowerCase().indexOf(lowerKw) > -1;
    });
  } else {
    displayBrands = activeTab === 'hot' ? allBrands.filter(function (b) {
      return b.isHot;
    }) : allBrands;
  }
  // 热门标签为空时回退到全部
  if (!searchKeyword && activeTab === 'hot' && displayBrands.length === 0 && allBrands.length > 0) {
    displayBrands = allBrands;
  }
  var goToBrandDetail = function goToBrandDetail(brandId) {
    if (!brandId) return;
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/home/brand-detail/index?id=' + brandId
    });
  };
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
    className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchBar,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchInputWrap,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchInput,
          placeholder: "\u641C\u7D22\u54C1\u724C",
          value: searchKeyword,
          onInput: function onInput(e) {
            return setSearchKeyword(e.detail.value);
          }
        }), searchKeyword && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].clearIcon,
          onClick: function onClick() {
            setSearchKeyword('');
          },
          children: "\u2715"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tabs,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
        className: activeTab === 'hot' ? _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tab + ' ' + _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tab,
        onClick: function onClick() {
          setActiveTab('hot');
        },
        children: "\u70ED\u95E8\u54C1\u724C"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
        className: activeTab === 'all' ? _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tab + ' ' + _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tab,
        onClick: function onClick() {
          setActiveTab('all');
        },
        children: "\u5168\u90E8\u54C1\u724C"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.ScrollView, {
      scrollY: true,
      className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandList,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandGrid,
        children: displayBrands.map(function (brand) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandItem,
            onClick: function onClick() {
              goToBrandDetail(brand.id);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandIconWrap,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, {
                src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getBrandIcon)(brand),
                className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandIconImg,
                mode: "aspectFit"
              }), brand.isHot && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hotTag,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].hotTagText,
                  children: "HOT"
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandName,
                children: brand.name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandProductCount,
                children: [brand.productsCount, "\u6B3E\u5546\u54C1"]
              })]
            })]
          }, brand.id);
        })
      }), displayBrands.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          className: _styles_home_brands_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
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
/* harmony default export */ __webpack_exports__["default"] = ({"brandsPage":"brands-module__brandsPage___GZcuu","searchBar":"brands-module__searchBar___TP6NF","searchInputWrap":"brands-module__searchInputWrap___mNUy2","searchIcon":"brands-module__searchIcon___SDLQQ","searchInput":"brands-module__searchInput___wlu35","clearIcon":"brands-module__clearIcon___xNqfm","tabs":"brands-module__tabs___TlF5G","tab":"brands-module__tab___RB0Ag","active":"brands-module__active___EdDqd","brandList":"brands-module__brandList___jiJ59","brandGrid":"brands-module__brandGrid___Bq_Cv","brandItem":"brands-module__brandItem___hjj6o","brandIconWrap":"brands-module__brandIconWrap___W3OTz","brandIconImg":"brands-module__brandIconImg___BoFcx","brandIconSvg":"brands-module__brandIconSvg___WagBb","hotTag":"brands-module__hotTag___Kpk51","hotTagText":"brands-module__hotTagText___tiEWM","brandInfo":"brands-module__brandInfo___StwEx","brandName":"brands-module__brandName___O7GWI","brandProductCount":"brands-module__brandProductCount___LoA3T","emptyState":"brands-module__emptyState___hiRvd","emptyIcon":"brands-module__emptyIcon___z5KPm","emptyText":"brands-module__emptyText___oVsCL"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/brands/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map