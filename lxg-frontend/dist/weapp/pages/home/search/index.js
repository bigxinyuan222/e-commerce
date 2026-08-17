"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/search/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search/index!./src/pages/home/search/index.tsx":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search/index!./src/pages/home/search/index.tsx ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/home/search.module.scss */ "./src/styles/home/search.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");










// 热搜关键词：后续可接入 /homepage/hot-keywords 等接口

var hotSearchKeywords = [];
var SearchPage = function SearchPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    searchSuggestions = _useState4[0],
    setSearchSuggestions = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState5, 2),
    showSuggestions = _useState6[0],
    setShowSuggestions = _useState6[1];
  var searchTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // 输入联想建议：调用搜索接口前 10 条结果的商品名称
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    var trimmed = searchValue.trim();
    if (!trimmed) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    searchTimerRef.current = setTimeout(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee() {
      var _res$data, res, list, suggestions, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.productApi.search, {
              key_word: trimmed,
              page: 1,
              size: 10
            });
          case 1:
            res = _context.v;
            list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : (res === null || res === void 0 || (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.list) || [];
            suggestions = list.map(function (p) {
              return p.name || p.Name || p.productName || p.ProductName || '';
            }).filter(Boolean).slice(0, 10);
            setSearchSuggestions(suggestions);
            setShowSuggestions(true);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('搜索建议失败:', _t);
            setSearchSuggestions([]);
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    })), 300);
    return function () {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, [searchValue]);
  var handleSearch = function handleSearch() {
    if (!searchValue.trim()) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入关键词',
        icon: 'none'
      });
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/search-results/index?keyword=".concat(encodeURIComponent(searchValue))
    });
  };
  var handleClear = function handleClear() {
    setSearchValue('');
    setSearchSuggestions([]);
    setShowSuggestions(false);
  };
  var handleKeywordSearch = function handleKeywordSearch(keyword) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/search-results/index?keyword=".concat(encodeURIComponent(keyword))
    });
  };
  var handleSuggestionClick = function handleSuggestionClick(suggestion) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/search-results/index?keyword=".concat(encodeURIComponent(suggestion))
    });
  };
  var goBack = function goBack() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
    className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].searchPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].searchBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].backBtn,
        onClick: goBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].backIcon,
          children: "\u2039"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].searchInput,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].searchIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Input, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].input,
          type: "text",
          placeholder: "\u641C\u7D22\u5546\u54C1",
          value: searchValue,
          onInput: function onInput(e) {
            return setSearchValue(e.detail.value);
          },
          onConfirm: handleSearch,
          focus: true
        }), searchValue && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].clearBtn,
          onClick: handleClear,
          children: "\xD7"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
        className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].searchBtn,
        onClick: handleSearch,
        children: "\u641C\u7D22"
      })]
    }), showSuggestions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionsList,
      children: searchSuggestions.length > 0 ? searchSuggestions.map(function (suggestion, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionItem,
          onClick: function onClick() {
            return handleSuggestionClick(suggestion);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionIcon,
            children: "\uD83D\uDD0D"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionText,
            children: suggestion
          })]
        }, index);
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].noSuggestions,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionIcon,
          children: "\uD83D\uDD0D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].suggestionText,
          children: "\u6682\u65E0\u76F8\u5173\u641C\u7D22\u5EFA\u8BAE"
        })]
      })
    }), !showSuggestions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
      className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].searchContent,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].section,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sectionHeader,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sectionTitle,
            children: "\u70ED\u95E8\u641C\u7D22"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].hotKeywords,
          children: hotSearchKeywords.map(function (keyword, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
              className: "".concat(_styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].keywordItem, " ").concat(index < 3 ? _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].topKeyword : ''),
              onClick: function onClick() {
                return handleKeywordSearch(keyword);
              },
              children: keyword
            }, index);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
        className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].section,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sectionHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].sectionTitle,
            children: "\u641C\u7D22\u5386\u53F2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.Text, {
            className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].clearHistory,
            children: "\u6E05\u7A7A"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_9__.View, {
          className: _styles_home_search_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].historyList
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (SearchPage);

/***/ }),

/***/ "./src/pages/home/search/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/home/search/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/search/index!./src/pages/home/search/index.tsx");


var config = {"navigationBarTitleText":"搜索","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/search/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_search_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/search.module.scss":
/*!********************************************!*\
  !*** ./src/styles/home/search.module.scss ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"searchPage":"search-module__searchPage___NNNal","searchBar":"search-module__searchBar___DvxmO","backBtn":"search-module__backBtn___CimVX","backIcon":"search-module__backIcon___UT28H","searchInput":"search-module__searchInput___Mp7xi","searchIcon":"search-module__searchIcon___Vi8Dj","input":"search-module__input___jjZ2t","clearBtn":"search-module__clearBtn___f8Jbb","searchBtn":"search-module__searchBtn___GII3k","suggestionsList":"search-module__suggestionsList___gipaH","suggestionItem":"search-module__suggestionItem___z2_O9","suggestionIcon":"search-module__suggestionIcon___kVJgX","suggestionText":"search-module__suggestionText___u1tMN","noSuggestions":"search-module__noSuggestions___jnrfG","searchContent":"search-module__searchContent___LvSTp","section":"search-module__section___Ztkb5","sectionHeader":"search-module__sectionHeader___psMeT","sectionTitle":"search-module__sectionTitle___UwA9k","clearHistory":"search-module__clearHistory___OEfbi","hotKeywords":"search-module__hotKeywords___ZT550","keywordItem":"search-module__keywordItem___LGZog","topKeyword":"search-module__topKeyword___fUumI","historyList":"search-module__historyList___jJbdf","historyItem":"search-module__historyItem___ijkME","resultsList":"search-module__resultsList___Wy2WT","resultItem":"search-module__resultItem___RNlUS","resultImage":"search-module__resultImage___sR3og","resultInfo":"search-module__resultInfo___rrrDF","resultName":"search-module__resultName___JVaJ5","resultPrice":"search-module__resultPrice___ys5Cc","noResults":"search-module__noResults___xr3uF"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/search/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map