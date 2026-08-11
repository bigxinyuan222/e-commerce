"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/category/stores/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./src/pages/category/stores/index.tsx":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./src/pages/category/stores/index.tsx ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _data_common_stores__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/data/common/stores */ "./src/data/common/stores.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/styles/category/stores.module.scss */ "./src/styles/category/stores.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");















var StoresPage = function StoresPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_6__.useAppContext)(),
    currentStore = _useAppContext.currentStore,
    setCurrentStore = _useAppContext.setCurrentStore;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    storeList = _useState2[0],
    setStoreList = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState5, 2),
    loadingMore = _useState6[0],
    setLoadingMore = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState7, 2),
    hasMore = _useState8[0],
    setHasMore = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState9, 2),
    page = _useState0[0],
    setPage = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState1, 2),
    error = _useState10[0],
    setError = _useState10[1];

  // 加载门店列表
  var loadStores = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee() {
    var reset,
      currentPage,
      _data,
      res,
      newStores,
      totalCount,
      currentLen,
      msg,
      _args = arguments,
      _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          reset = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
          currentPage = reset ? 1 : page;
          if (!reset) {
            _context.n = 1;
            break;
          }
          setPage(1);
          setHasMore(true);
          setError('');
          _context.n = 3;
          break;
        case 1:
          if (!(loadingMore || !hasMore)) {
            _context.n = 2;
            break;
          }
          return _context.a(2);
        case 2:
          setLoadingMore(true);
        case 3:
          _context.p = 3;
          _context.n = 4;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.categoryApi.stores, {
            page: currentPage,
            size: 20
          });
        case 4:
          res = _context.v;
          newStores = (0,_data_common_stores__WEBPACK_IMPORTED_MODULE_4__.normalizeStoreList)(res);
          totalCount = (res === null || res === void 0 || (_data = res.data) === null || _data === void 0 ? void 0 : _data.total) || (res === null || res === void 0 ? void 0 : res.total) || newStores.length;
          if (reset) {
            setStoreList(newStores);
          } else {
            setStoreList(function (prev) {
              return [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(prev), (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_12__["default"])(newStores));
            });
          }

          // 判断是否还有更多
          currentLen = reset ? newStores.length : storeList.length + newStores.length;
          setHasMore(newStores.length >= 20 && currentLen < totalCount);
          if (!reset && newStores.length > 0) {
            setPage(currentPage + 1);
          }
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error('Failed to load stores:', _t);
          msg = (_t === null || _t === void 0 ? void 0 : _t.message) || '加载门店失败';
          setError(msg);
          if (reset) {
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: msg,
              icon: 'none'
            });
          }
        case 6:
          _context.p = 6;
          setLoading(false);
          setLoadingMore(false);
          return _context.f(6);
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[3, 5, 6, 7]]);
  })), [page, loadingMore, hasMore, storeList.length]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadStores(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 下拉刷新
  var handlePullDownRefresh = /*#__PURE__*/function () {
    var _ref2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee2() {
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return loadStores(true);
          case 1:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().stopPullDownRefresh();
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function handlePullDownRefresh() {
      return _ref2.apply(this, arguments);
    };
  }();

  // 触底加载更多
  var onReachBottom = function onReachBottom() {
    if (hasMore && !loadingMore && !loading) {
      loadStores(false);
    }
  };

  // Taro 生命周期钩子必须在组件顶层调用，不能放在 useEffect 内
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().useReachBottom(function () {
    onReachBottom();
  });
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().usePullDownRefresh(function () {
    handlePullDownRefresh();
  });
  var handleCallStore = function handleCallStore(phone) {
    if (!phone) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '暂无联系电话',
        icon: 'none'
      });
      return;
    }
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
  var handleViewDetail = function handleViewDetail(store) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/category/store-detail/index?id=".concat(store.id)
    });
  };

  // 加载中
  if (loading && storeList.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storesPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loading,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loadingText,
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }

  // 加载失败且无数据
  if (error && storeList.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storesPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyText,
          children: "\u52A0\u8F7D\u5931\u8D25"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyDesc,
          children: error
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].retryBtn,
          onClick: function onClick() {
            return loadStores(true);
          },
          children: "\u91CD\u65B0\u52A0\u8F7D"
        })]
      })
    });
  }

  // 空数据
  if (storeList.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storesPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyText,
          children: "\u6682\u65E0\u95E8\u5E97"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyDesc,
          children: "\u9644\u8FD1\u6682\u65E0\u95E8\u5E97\u4FE1\u606F"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].retryBtn,
          onClick: function onClick() {
            return loadStores(true);
          },
          children: "\u5237\u65B0"
        })]
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
    className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storesPage,
    children: [storeList.map(function (store) {
      var isSelected = (currentStore === null || currentStore === void 0 ? void 0 : currentStore.id) === store.id;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: "".concat(_styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeCard, " ").concat(isSelected ? _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].selected : ''),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeTitle,
            children: [store.image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_14__["default"])({
              src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.getImageUrl)(store.image),
              className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeImage,
              mode: "aspectFill"
            }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.lazyImgProps)())) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeName,
              children: store.name
            })]
          }), isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].selectedTag,
            children: "\u2713 \u5DF2\u9009\u62E9"
          })]
        }), store.address && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeAddress,
          children: ["\uD83D\uDCCD ", store.address]
        }), store.phone && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storePhone,
          onClick: function onClick() {
            return handleCallStore(store.phone);
          },
          children: ["\uD83D\uDCDE ", store.phone]
        }), store.hours && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeHours,
          children: ["\u8425\u4E1A\u65F6\u95F4: ", store.hours]
        }), store.service && store.service.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].serviceTags,
          children: store.service.map(function (tag, idx) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].serviceTag,
              children: tag
            }, idx);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].btnRow,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].detailBtn,
            onClick: function onClick() {
              return handleViewDetail(store);
            },
            children: "\u67E5\u770B\u8BE6\u60C5"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: "".concat(_styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].selectBtn, " ").concat(isSelected ? _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].selectBtnDisabled : ''),
            onClick: function onClick() {
              return handleSelectStore(store);
            },
            children: isSelected ? '已选择' : '选择此门店'
          })]
        })]
      }, store.id);
    }), loadingMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loadMore,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
        className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loadMoreText,
        children: "\u52A0\u8F7D\u4E2D..."
      })
    }), !hasMore && storeList.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loadMore,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
        className: _styles_category_stores_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loadMoreText,
        children: "\u6CA1\u6709\u66F4\u591A\u95E8\u5E97\u4E86"
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (StoresPage);

/***/ }),

/***/ "./src/pages/category/stores/index.tsx":
/*!*********************************************!*\
  !*** ./src/pages/category/stores/index.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_stores_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/stores/index!./src/pages/category/stores/index.tsx");


var config = {"navigationBarTitleText":"门店列表","enablePullDownRefresh":true};



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
/* harmony default export */ __webpack_exports__["default"] = ({"storesPage":"stores-module__storesPage___OxB78","loading":"stores-module__loading___GdOmS","loadingText":"stores-module__loadingText___iyIC8","emptyState":"stores-module__emptyState___nIVZ6","emptyText":"stores-module__emptyText___UGZy5","emptyDesc":"stores-module__emptyDesc___sdRtK","retryBtn":"stores-module__retryBtn___FtNru","storeCard":"stores-module__storeCard___ogKQh","selected":"stores-module__selected___ssvqz","storeHeader":"stores-module__storeHeader___DpwMb","storeTitle":"stores-module__storeTitle___i_a5h","storeImage":"stores-module__storeImage___Oavs7","storeName":"stores-module__storeName___juPvq","selectedTag":"stores-module__selectedTag___n2xZg","storeAddress":"stores-module__storeAddress___cFupC","storePhone":"stores-module__storePhone___MAGiB","storeHours":"stores-module__storeHours____Ii5J","serviceTags":"stores-module__serviceTags___iPD1m","serviceTag":"stores-module__serviceTag___G4TLN","btnRow":"stores-module__btnRow___OX7CE","detailBtn":"stores-module__detailBtn___Lujdk","selectBtn":"stores-module__selectBtn___FlWvI","selectBtnDisabled":"stores-module__selectBtnDisabled___tHD9r","loadMore":"stores-module__loadMore___SlJ3S","loadMoreText":"stores-module__loadMoreText___D4SKH"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/category/stores/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map