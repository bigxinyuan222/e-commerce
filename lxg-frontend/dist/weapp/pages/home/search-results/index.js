"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/search-results/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search-results/index!./src/pages/home/search-results/index.tsx":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search-results/index!./src/pages/home/search-results/index.tsx ***!
  \********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/home/search-results.module.scss */ "./src/styles/home/search-results.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");













var SearchResultsPage = function SearchResultsPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState, 2),
    keyword = _useState2[0],
    setKeyword = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState3, 2),
    searchResults = _useState4[0],
    setSearchResults = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState5, 2),
    inputValue = _useState6[0],
    setInputValue = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('default'),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState7, 2),
    sortType = _useState8[0],
    setSortType = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState9, 2),
    showFilter = _useState0[0],
    setShowFilter = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      minPrice: '',
      maxPrice: '',
      brands: [],
      colorCategories: []
    }),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_useState1, 2),
    filter = _useState10[0],
    setFilter = _useState10[1];
  var brands = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var brandSet = new Set();
    searchResults.forEach(function (p) {
      if (p.brandName) brandSet.add(p.brandName);
    });
    return Array.from(brandSet);
  }, [searchResults]);
  var colorCategories = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var colors = ['黑色', '白色', '银色', '金色', '蓝色', '红色', '绿色', '紫色'];
    return colors;
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
    if (params.keyword) {
      var decodedKeyword = decodeURIComponent(params.keyword);
      setKeyword(decodedKeyword);
      setInputValue(decodedKeyword);
      performSearch(decodedKeyword);
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (keyword) {
      performSearch(keyword);
    }
  }, [sortType, filter]);
  var performSearch = /*#__PURE__*/function () {
    var _ref = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().m(function _callee(searchKeyword) {
      var params, res, _res$data, productData, _t, _t2;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (searchKeyword.trim()) {
              _context.n = 1;
              break;
            }
            setSearchResults([]);
            return _context.a(2);
          case 1:
            _context.p = 1;
            params = {
              key_word: searchKeyword.trim(),
              page: 1,
              size: 20
            };
            if (filter.minPrice) params.minPrice = Number(filter.minPrice);
            if (filter.maxPrice) params.maxPrice = Number(filter.maxPrice);
            if (filter.brands.length > 0) params.brands = filter.brands.join(',');
            _t = sortType;
            _context.n = _t === 'sales' ? 2 : _t === 'price-asc' ? 3 : _t === 'price-desc' ? 4 : 5;
            break;
          case 2:
            params.sort = 'sales';
            return _context.a(3, 6);
          case 3:
            params.sort = 'price';
            params.order = 'asc';
            return _context.a(3, 6);
          case 4:
            params.sort = 'price';
            params.order = 'desc';
            return _context.a(3, 6);
          case 5:
            return _context.a(3, 6);
          case 6:
            _context.n = 7;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.productApi.search, params);
          case 7:
            res = _context.v;
            if (res !== null && res !== void 0 && res.data) {
              productData = Array.isArray(res.data) ? res.data : ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.list) || [];
              setSearchResults((0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.normalizeProductListImages)(productData));
            } else {
              setSearchResults([]);
            }
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t2 = _context.v;
            console.error('搜索商品失败:', _t2);
            setSearchResults([]);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[1, 8]]);
    }));
    return function performSearch(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleSearch = function handleSearch() {
    if (!inputValue.trim()) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }
    setKeyword(inputValue);
    performSearch(inputValue);
  };
  var handleInput = function handleInput(e) {
    setInputValue(e.detail.value);
  };
  var handleClear = function handleClear() {
    setInputValue('');
    setSearchResults([]);
  };
  var goToProductDetail = function goToProductDetail(productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId)
    });
  };
  var goBack = function goBack() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
  };
  var toggleBrand = function toggleBrand(brand) {
    setFilter(function (prev) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
        brands: prev.brands.includes(brand) ? prev.brands.filter(function (b) {
          return b !== brand;
        }) : [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(prev.brands), [brand])
      });
    });
  };
  var toggleColor = function toggleColor(color) {
    setFilter(function (prev) {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
        colorCategories: prev.colorCategories.includes(color) ? prev.colorCategories.filter(function (c) {
          return c !== color;
        }) : [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(prev.colorCategories), [color])
      });
    });
  };
  var resetFilter = function resetFilter() {
    setFilter({
      minPrice: '',
      maxPrice: '',
      brands: [],
      colorCategories: []
    });
  };
  var applyFilter = function applyFilter() {
    setShowFilter(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
    className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].resultsPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].backBtn,
        onClick: goBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].backIcon,
          children: "\u2039"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchInputWrap,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Input, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchInput,
          value: inputValue,
          onInput: handleInput,
          placeholder: "\u641C\u7D22\u5546\u54C1",
          confirmType: "search",
          onConfirm: handleSearch
        }), inputValue && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].clearBtn,
          onClick: handleClear,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].clearIcon,
            children: "\xD7"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchBtn,
        onClick: handleSearch,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchBtnText,
          children: "\u641C\u7D22"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sortBar,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.ScrollView, {
        scrollX: true,
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sortScroll,
        showScrollbar: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sortItems,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sortItem, " ").concat(sortType === 'default' ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : ''),
            onClick: function onClick() {
              return setSortType('default');
            },
            children: "\u7EFC\u5408"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sortItem, " ").concat(sortType === 'sales' ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : ''),
            onClick: function onClick() {
              return setSortType('sales');
            },
            children: "\u9500\u91CF"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sortItem, " ").concat(sortType === 'price-asc' || sortType === 'price-desc' ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : ''),
            onClick: function onClick() {
              return setSortType(sortType === 'price-asc' ? 'price-desc' : 'price-asc');
            },
            children: ["\u4EF7\u683C ", sortType === 'price-asc' ? '↑' : sortType === 'price-desc' ? '↓' : '']
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].sortItem, " ").concat(showFilter ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].active : ''),
            onClick: function onClick() {
              return setShowFilter(!showFilter);
            },
            children: "\u7B5B\u9009"
          })]
        })
      })
    }), showFilter && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterPanel,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterTitle,
          children: "\u7B5B\u9009\u6761\u4EF6"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterReset,
          onClick: resetFilter,
          children: "\u91CD\u7F6E"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.ScrollView, {
        scrollY: true,
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterScroll,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterSection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterSectionTitle,
            children: "\u4EF7\u683C\u533A\u95F4"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceRange,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Input, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceInput,
              placeholder: "\u6700\u4F4E\u4EF7",
              type: "number",
              value: filter.minPrice,
              onInput: function onInput(e) {
                return setFilter(function (prev) {
                  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
                    minPrice: e.detail.value
                  });
                });
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceSeparator,
              children: "~"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Input, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceInput,
              placeholder: "\u6700\u9AD8\u4EF7",
              type: "number",
              value: filter.maxPrice,
              onInput: function onInput(e) {
                return setFilter(function (prev) {
                  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
                    maxPrice: e.detail.value
                  });
                });
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterSection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterSectionTitle,
            children: "\u54C1\u724C"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterOptions,
            children: brands.map(function (brand) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterOption, " ").concat(filter.brands.includes(brand) ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selected : ''),
                onClick: function onClick() {
                  return toggleBrand(brand);
                },
                children: brand
              }, brand);
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterSection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterSectionTitle,
            children: "\u989C\u8272\u5206\u7C7B"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterOptions,
            children: colorCategories.map(function (color) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterOption, " ").concat(filter.colorCategories.includes(color) ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selected : ''),
                onClick: function onClick() {
                  return toggleColor(color);
                },
                children: color
              }, color);
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterFooter,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].filterApply,
          onClick: applyFilter,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            children: "\u786E\u5B9A"
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.ScrollView, {
      scrollY: true,
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].scrollView,
      children: [searchResults.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].resultsContainer,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].resultsHeader,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].resultsCount,
            children: ["\u641C\u7D22 \"", keyword, "\" \u627E\u5230 ", searchResults.length, " \u4EF6\u5546\u54C1"]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productList,
          children: searchResults.map(function (product) {
            var _product$images;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productCard,
              onClick: function onClick() {
                return goToProductDetail(product.id);
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({
                src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(((_product$images = product.images) === null || _product$images === void 0 ? void 0 : _product$images[0]) || product.image),
                className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productImage,
                mode: "aspectFill"
              }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productInfo,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productName,
                  children: product.name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productTags,
                  children: (product.tags || []).slice(0, 2).map(function (tag) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tag,
                      children: tag
                    }, tag);
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productPrice,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                    className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceSymbol,
                    children: "\xA5"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                    className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].currentPrice,
                    children: product.price
                  }), product.originalPrice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                    className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].originalPrice,
                    children: ["\xA5", product.originalPrice]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].salesInfo,
                  children: ["\u5DF2\u552E ", product.sales > 10000 ? "".concat((product.sales / 10000).toFixed(1), "\u4E07") : product.sales || 0, " \u4EF6"]
                })]
              })]
            }, product.id);
          })
        })]
      }) : keyword ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
          children: "\u672A\u627E\u5230\u76F8\u5173\u5546\u54C1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyHint,
          children: "\u8BD5\u8BD5\u5176\u4ED6\u5173\u952E\u8BCD\u5427"
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
          children: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].bottomSpace
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (SearchResultsPage);

/***/ }),

/***/ "./src/pages/home/search-results/index.tsx":
/*!*************************************************!*\
  !*** ./src/pages/home/search-results/index.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_results_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search-results/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search-results/index!./src/pages/home/search-results/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_results_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/search-results/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_results_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_results_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_results_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_results_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/search-results.module.scss":
/*!****************************************************!*\
  !*** ./src/styles/home/search-results.module.scss ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"resultsPage":"search-results-module__resultsPage___z92jW","searchHeader":"search-results-module__searchHeader___vxtMT","backBtn":"search-results-module__backBtn___J0jI0","backIcon":"search-results-module__backIcon___BebkT","searchInputWrap":"search-results-module__searchInputWrap___G5Ayl","searchIcon":"search-results-module__searchIcon___Ixi5l","searchInput":"search-results-module__searchInput___YoSMt","clearBtn":"search-results-module__clearBtn___P2_3p","clearIcon":"search-results-module__clearIcon___kcRR8","searchBtn":"search-results-module__searchBtn____cW6j","searchBtnText":"search-results-module__searchBtnText___vWZUe","sortBar":"search-results-module__sortBar___XD7MT","sortScroll":"search-results-module__sortScroll___hSbKA","sortItems":"search-results-module__sortItems___COe0d","sortItem":"search-results-module__sortItem___jdTSS","active":"search-results-module__active___ORMZs","filterPanel":"search-results-module__filterPanel___ReLyT","filterHeader":"search-results-module__filterHeader___eB_N6","filterTitle":"search-results-module__filterTitle___jl2Nr","filterReset":"search-results-module__filterReset___scuHq","filterScroll":"search-results-module__filterScroll___VPEzG","filterSection":"search-results-module__filterSection___Z1pYy","filterSectionTitle":"search-results-module__filterSectionTitle___qc_CZ","priceRange":"search-results-module__priceRange___NS60a","priceInput":"search-results-module__priceInput___oiekQ","priceSeparator":"search-results-module__priceSeparator___oxdQ1","filterOptions":"search-results-module__filterOptions___myFcx","filterOption":"search-results-module__filterOption___QdpZS","selected":"search-results-module__selected___QVHhv","filterFooter":"search-results-module__filterFooter___q3xzi","filterApply":"search-results-module__filterApply___PzKgH","scrollView":"search-results-module__scrollView___qpM5u","resultsContainer":"search-results-module__resultsContainer___nvMha","resultsHeader":"search-results-module__resultsHeader___f7Npa","resultsCount":"search-results-module__resultsCount___cfxDG","productList":"search-results-module__productList___ftyTf","productCard":"search-results-module__productCard___IQE_c","productImage":"search-results-module__productImage___XXx_5","productInfo":"search-results-module__productInfo___ZlBcM","productName":"search-results-module__productName___Euy8S","productTags":"search-results-module__productTags___zuaAY","tag":"search-results-module__tag___DEpw6","productPrice":"search-results-module__productPrice___joTSZ","priceSymbol":"search-results-module__priceSymbol___niJd0","currentPrice":"search-results-module__currentPrice___az1Bg","originalPrice":"search-results-module__originalPrice___JnrSi","salesInfo":"search-results-module__salesInfo___Ka8U5","emptyState":"search-results-module__emptyState___xYfce","emptyIcon":"search-results-module__emptyIcon___Yrntm","emptyText":"search-results-module__emptyText___i1mm0","emptyHint":"search-results-module__emptyHint___mD7Df","bottomSpace":"search-results-module__bottomSpace___U5IGY"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/search-results/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map