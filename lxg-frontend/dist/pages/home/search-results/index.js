"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/search-results/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search-results/index!./src/pages/home/search-results/index.tsx":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search-results/index!./src/pages/home/search-results/index.tsx ***!
  \********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_product_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/product/products */ "./src/data/product/products.ts");
/* harmony import */ var _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/home/search-results.module.scss */ "./src/styles/home/search-results.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");









var SearchResultsPage = function SearchResultsPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    keyword = _useState2[0],
    setKeyword = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    searchResults = _useState4[0],
    setSearchResults = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState5, 2),
    inputValue = _useState6[0],
    setInputValue = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('default'),
    _useState8 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState7, 2),
    sortType = _useState8[0],
    setSortType = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState9, 2),
    showFilter = _useState0[0],
    setShowFilter = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      minPrice: '',
      maxPrice: '',
      brands: [],
      colorCategories: []
    }),
    _useState10 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState1, 2),
    filter = _useState10[0],
    setFilter = _useState10[1];
  var brands = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var brandSet = new Set();
    _data_product_products__WEBPACK_IMPORTED_MODULE_2__.products.forEach(function (p) {
      return brandSet.add(p.brandName);
    });
    return Array.from(brandSet);
  }, []);
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
  var performSearch = function performSearch(searchKeyword) {
    if (!searchKeyword.trim()) {
      setSearchResults([]);
      return;
    }
    var results = (0,_data_product_products__WEBPACK_IMPORTED_MODULE_2__.searchProducts)(searchKeyword);
    if (filter.minPrice) {
      results = results.filter(function (p) {
        return p.price >= Number(filter.minPrice);
      });
    }
    if (filter.maxPrice) {
      results = results.filter(function (p) {
        return p.price <= Number(filter.maxPrice);
      });
    }
    if (filter.brands.length > 0) {
      results = results.filter(function (p) {
        return filter.brands.includes(p.brandName);
      });
    }
    switch (sortType) {
      case 'sales':
        results.sort(function (a, b) {
          return b.sales - a.sales;
        });
        break;
      case 'price-asc':
        results.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case 'price-desc':
        results.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      default:
        break;
    }
    setSearchResults(results);
  };
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
      return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, prev), {}, {
        brands: prev.brands.includes(brand) ? prev.brands.filter(function (b) {
          return b !== brand;
        }) : [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(prev.brands), [brand])
      });
    });
  };
  var toggleColor = function toggleColor(color) {
    setFilter(function (prev) {
      return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, prev), {}, {
        colorCategories: prev.colorCategories.includes(color) ? prev.colorCategories.filter(function (c) {
          return c !== color;
        }) : [].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_7__["default"])(prev.colorCategories), [color])
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].resultsPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].backBtn,
        onClick: goBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].backIcon,
          children: "\u2039"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchInputWrap,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchInput,
          value: inputValue,
          onInput: handleInput,
          placeholder: "\u641C\u7D22\u5546\u54C1",
          confirmType: "search",
          onConfirm: handleSearch
        }), inputValue && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].clearBtn,
          onClick: handleClear,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].clearIcon,
            children: "\xD7"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchBtn,
        onClick: handleSearch,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].searchBtnText,
          children: "\u641C\u7D22"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sortBar,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
        scrollX: true,
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sortScroll,
        showScrollbar: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sortItems,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sortItem, " ").concat(sortType === 'default' ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
            onClick: function onClick() {
              return setSortType('default');
            },
            children: "\u7EFC\u5408"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sortItem, " ").concat(sortType === 'sales' ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
            onClick: function onClick() {
              return setSortType('sales');
            },
            children: "\u9500\u91CF"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sortItem, " ").concat(sortType === 'price-asc' || sortType === 'price-desc' ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
            onClick: function onClick() {
              return setSortType(sortType === 'price-asc' ? 'price-desc' : 'price-asc');
            },
            children: ["\u4EF7\u683C ", sortType === 'price-asc' ? '↑' : sortType === 'price-desc' ? '↓' : '']
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].sortItem, " ").concat(showFilter ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
            onClick: function onClick() {
              return setShowFilter(!showFilter);
            },
            children: "\u7B5B\u9009"
          })]
        })
      })
    }), showFilter && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterPanel,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterTitle,
          children: "\u7B5B\u9009\u6761\u4EF6"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterReset,
          onClick: resetFilter,
          children: "\u91CD\u7F6E"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
        scrollY: true,
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterScroll,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterSection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterSectionTitle,
            children: "\u4EF7\u683C\u533A\u95F4"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceRange,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceInput,
              placeholder: "\u6700\u4F4E\u4EF7",
              type: "number",
              value: filter.minPrice,
              onInput: function onInput(e) {
                return setFilter(function (prev) {
                  return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, prev), {}, {
                    minPrice: e.detail.value
                  });
                });
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceSeparator,
              children: "~"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceInput,
              placeholder: "\u6700\u9AD8\u4EF7",
              type: "number",
              value: filter.maxPrice,
              onInput: function onInput(e) {
                return setFilter(function (prev) {
                  return (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_6__["default"])({}, prev), {}, {
                    maxPrice: e.detail.value
                  });
                });
              }
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterSection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterSectionTitle,
            children: "\u54C1\u724C"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterOptions,
            children: brands.map(function (brand) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterOption, " ").concat(filter.brands.includes(brand) ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selected : ''),
                onClick: function onClick() {
                  return toggleBrand(brand);
                },
                children: brand
              }, brand);
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterSection,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterSectionTitle,
            children: "\u989C\u8272\u5206\u7C7B"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterOptions,
            children: colorCategories.map(function (color) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                className: "".concat(_styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterOption, " ").concat(filter.colorCategories.includes(color) ? _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selected : ''),
                onClick: function onClick() {
                  return toggleColor(color);
                },
                children: color
              }, color);
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterFooter,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].filterApply,
          onClick: applyFilter,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            children: "\u786E\u5B9A"
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
      scrollY: true,
      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].scrollView,
      children: [searchResults.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].resultsContainer,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].resultsHeader,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].resultsCount,
            children: ["\u641C\u7D22 \"", keyword, "\" \u627E\u5230 ", searchResults.length, " \u4EF6\u5546\u54C1"]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productList,
          children: searchResults.map(function (product) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productCard,
              onClick: function onClick() {
                return goToProductDetail(product.id);
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Image, {
                src: product.images[0],
                className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productImage,
                mode: "aspectFill",
                lazyLoad: true
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productInfo,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productName,
                  children: product.name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productTags,
                  children: product.tags.slice(0, 2).map(function (tag) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                      className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].tag,
                      children: tag
                    }, tag);
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productPrice,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                    className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].currentPrice,
                    children: product.price
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                    className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].originalPrice,
                    children: product.originalPrice
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
                  className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].salesInfo,
                  children: ["\u5DF2\u552E ", product.sales > 10000 ? "".concat((product.sales / 10000).toFixed(1), "\u4E07") : product.sales, " \u4EF6"]
                })]
              })]
            }, product.id);
          })
        })]
      }) : keyword ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
          children: "\u672A\u627E\u5230\u76F8\u5173\u5546\u54C1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyHint,
          children: "\u8BD5\u8BD5\u5176\u4ED6\u5173\u952E\u8BCD\u5427"
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].emptyText,
          children: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_home_search_results_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bottomSpace
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
/* harmony default export */ __webpack_exports__["default"] = ({"resultsPage":"search-results-module__resultsPage___z92jW","searchHeader":"search-results-module__searchHeader___vxtMT","backBtn":"search-results-module__backBtn___J0jI0","backIcon":"search-results-module__backIcon___BebkT","searchInputWrap":"search-results-module__searchInputWrap___G5Ayl","searchIcon":"search-results-module__searchIcon___Ixi5l","searchInput":"search-results-module__searchInput___YoSMt","clearBtn":"search-results-module__clearBtn___P2_3p","clearIcon":"search-results-module__clearIcon___kcRR8","searchBtn":"search-results-module__searchBtn____cW6j","searchBtnText":"search-results-module__searchBtnText___vWZUe","sortBar":"search-results-module__sortBar___XD7MT","sortScroll":"search-results-module__sortScroll___hSbKA","sortItems":"search-results-module__sortItems___COe0d","sortItem":"search-results-module__sortItem___jdTSS","active":"search-results-module__active___ORMZs","filterPanel":"search-results-module__filterPanel___ReLyT","filterHeader":"search-results-module__filterHeader___eB_N6","filterTitle":"search-results-module__filterTitle___jl2Nr","filterReset":"search-results-module__filterReset___scuHq","filterScroll":"search-results-module__filterScroll___VPEzG","filterSection":"search-results-module__filterSection___Z1pYy","filterSectionTitle":"search-results-module__filterSectionTitle___qc_CZ","priceRange":"search-results-module__priceRange___NS60a","priceInput":"search-results-module__priceInput___oiekQ","priceSeparator":"search-results-module__priceSeparator___oxdQ1","filterOptions":"search-results-module__filterOptions___myFcx","filterOption":"search-results-module__filterOption___QdpZS","selected":"search-results-module__selected___QVHhv","filterFooter":"search-results-module__filterFooter___q3xzi","filterApply":"search-results-module__filterApply___PzKgH","scrollView":"search-results-module__scrollView___qpM5u","resultsContainer":"search-results-module__resultsContainer___nvMha","resultsHeader":"search-results-module__resultsHeader___f7Npa","resultsCount":"search-results-module__resultsCount___cfxDG","productList":"search-results-module__productList___ftyTf","productCard":"search-results-module__productCard___IQE_c","productImage":"search-results-module__productImage___XXx_5","productInfo":"search-results-module__productInfo___ZlBcM","productName":"search-results-module__productName___Euy8S","productTags":"search-results-module__productTags___zuaAY","tag":"search-results-module__tag___DEpw6","productPrice":"search-results-module__productPrice___joTSZ","currentPrice":"search-results-module__currentPrice___az1Bg","originalPrice":"search-results-module__originalPrice___JnrSi","salesInfo":"search-results-module__salesInfo___Ka8U5","emptyState":"search-results-module__emptyState___xYfce","emptyIcon":"search-results-module__emptyIcon___Yrntm","emptyText":"search-results-module__emptyText___i1mm0","emptyHint":"search-results-module__emptyHint___mD7Df","bottomSpace":"search-results-module__bottomSpace___U5IGY"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/search-results/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map