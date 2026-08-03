"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/category/store-detail/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/store-detail/index!./src/pages/category/store-detail/index.tsx":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/store-detail/index!./src/pages/category/store-detail/index.tsx ***!
  \************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
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
/* harmony import */ var _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/styles/category/store-detail.module.scss */ "./src/styles/category/store-detail.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");















var StoreDetailPage = function StoreDetailPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_6__.useAppContext)(),
    currentStore = _useAppContext.currentStore,
    setCurrentStore = _useAppContext.setCurrentStore;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    store = _useState2[0],
    setStore = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var loadStoreDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee() {
    var _Taro$getCurrentInsta;
    var params, storeId, res, raw, d, normalized, msg, _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          params = (_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params;
          storeId = params === null || params === void 0 ? void 0 : params.id;
          if (storeId) {
            _context.n = 1;
            break;
          }
          setError('缺少门店ID');
          setLoading(false);
          return _context.a(2);
        case 1:
          _context.p = 1;
          setLoading(true);
          setError('');
          _context.n = 2;
          return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.categoryApi.storeDetail, {}, {
            id: storeId
          });
        case 2:
          res = _context.v;
          // 兼容后端多种返回结构：直接对象 / { data: {...} } / { data: { store: {...} } }
          raw = null;
          if (res && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_12__["default"])(res) === 'object') {
            if (res.id || res.ID || res.storeId) {
              raw = res;
            } else if (res.data) {
              d = res.data;
              if (d.id || d.ID || d.storeId) {
                raw = d;
              } else if (d.store) {
                raw = d.store;
              } else if (d.info) {
                raw = d.info;
              }
            }
          }
          if (raw) {
            _context.n = 3;
            break;
          }
          setError('未找到门店信息');
          setLoading(false);
          return _context.a(2);
        case 3:
          normalized = (0,_data_common_stores__WEBPACK_IMPORTED_MODULE_4__.normalizeStore)(raw);
          setStore(normalized);
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error('Failed to load store detail:', _t);
          msg = (_t === null || _t === void 0 ? void 0 : _t.message) || '加载门店详情失败';
          setError(msg);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: msg,
            icon: 'none'
          });
        case 5:
          _context.p = 5;
          setLoading(false);
          return _context.f(5);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[1, 4, 5, 6]]);
  })), []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadStoreDetail();
  }, [loadStoreDetail]);
  var handleCallStore = function handleCallStore() {
    if (!(store !== null && store !== void 0 && store.phone)) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '暂无联系电话',
        icon: 'none'
      });
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().makePhoneCall({
      phoneNumber: store.phone
    });
  };
  var handleOpenMap = function handleOpenMap() {
    if (!store || !store.lat || !store.lng) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '暂无位置信息',
        icon: 'none'
      });
      return;
    }
    // 使用微信内置地图查看位置
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().openLocation({
      latitude: store.lat,
      longitude: store.lng,
      name: store.name,
      address: store.address,
      scale: 18
    }).catch(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '打开地图失败',
        icon: 'none'
      });
    });
  };
  var handleCopyAddress = function handleCopyAddress() {
    if (!(store !== null && store !== void 0 && store.address)) return;
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setClipboardData({
      data: store.address
    }).then(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '地址已复制',
        icon: 'success'
      });
    });
  };
  var handleSelectStore = function handleSelectStore() {
    if (!store) return;
    setCurrentStore(store);
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: "\u5DF2\u9009\u62E9".concat(store.name),
      icon: 'success'
    });
    setTimeout(function () {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
    }, 1500);
  };

  // 加载中
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeDetailPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loading,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].loadingText,
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }

  // 加载失败
  if (error || !store) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeDetailPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyText,
          children: "\u52A0\u8F7D\u5931\u8D25"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].emptyDesc,
          children: error || '未找到门店信息'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].retryBtn,
          onClick: loadStoreDetail,
          children: "\u91CD\u65B0\u52A0\u8F7D"
        })]
      })
    });
  }
  var isSelected = (currentStore === null || currentStore === void 0 ? void 0 : currentStore.id) === store.id;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.ScrollView, {
    scrollY: true,
    className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeDetailPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].header,
      children: [store.image && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_14__["default"])({
        src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.getImageUrl)(store.image),
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeImage,
        mode: "aspectFill"
      }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].headerInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeName,
          children: store.name
        }), store.status && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].storeStatus,
          children: "\u8425\u4E1A\u4E2D"
        }), store.service && store.service.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].serviceTags,
          children: store.service.map(function (tag, idx) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].serviceTag,
              children: tag
            }, idx);
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].section,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].sectionTitle,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].sectionTitleText,
          children: "\u57FA\u7840\u4FE1\u606F"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoCard,
        children: [store.address && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoItem,
          onClick: handleCopyAddress,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoLabel,
            children: "\u5730\u5740"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoValue,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoText,
              children: store.address
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoAction,
              children: "\u590D\u5236"
            })]
          })]
        }), store.phone && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoItem,
          onClick: handleCallStore,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoLabel,
            children: "\u7535\u8BDD"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoValue,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoText,
              children: store.phone
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoAction,
              children: "\u62E8\u6253"
            })]
          })]
        }), store.hours && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoItem,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoLabel,
            children: "\u8425\u4E1A\u65F6\u95F4"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoValue,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoText,
              children: store.hours
            })
          })]
        }), store.distance > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoItem,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoLabel,
            children: "\u8DDD\u79BB"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoValue,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
              className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].infoText,
              children: store.distance < 1 ? "".concat((store.distance * 1000).toFixed(0), "\u7C73") : "".concat(store.distance.toFixed(1), "\u516C\u91CC")
            })
          })]
        })]
      })]
    }), store.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].section,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].sectionTitle,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].sectionTitleText,
          children: "\u95E8\u5E97\u7B80\u4ECB"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].descCard,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].descText,
          children: store.description
        })
      })]
    }), store.lat && store.lng && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].section,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].mapCard,
        onClick: handleOpenMap,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
          className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].mapPlaceholder,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].mapIcon,
            children: "\uD83D\uDDFA\uFE0F"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.Text, {
            className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].mapText,
            children: "\u70B9\u51FB\u67E5\u770B\u5730\u56FE\u4F4D\u7F6E"
          })]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
      className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].footer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].callBtn,
        onClick: handleCallStore,
        children: "\u7535\u8BDD\u54A8\u8BE2"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_13__.View, {
        className: "".concat(_styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].selectBtn, " ").concat(isSelected ? _styles_category_store_detail_module_scss__WEBPACK_IMPORTED_MODULE_7__["default"].selectBtnDisabled : ''),
        onClick: handleSelectStore,
        children: isSelected ? '已选择门店' : '选择此门店'
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (StoreDetailPage);

/***/ }),

/***/ "./src/pages/category/store-detail/index.tsx":
/*!***************************************************!*\
  !*** ./src/pages/category/store-detail/index.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_store_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/store-detail/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/category/store-detail/index!./src/pages/category/store-detail/index.tsx");


var config = {"navigationBarTitleText":"门店详情","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_store_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/category/store-detail/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_store_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_store_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_store_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_category_store_detail_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/category/store-detail.module.scss":
/*!******************************************************!*\
  !*** ./src/styles/category/store-detail.module.scss ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"storeDetailPage":"store-detail-module__storeDetailPage___kASW0","loading":"store-detail-module__loading___wofQf","loadingText":"store-detail-module__loadingText___hn_MW","emptyState":"store-detail-module__emptyState___FafWP","emptyText":"store-detail-module__emptyText___DPwOS","emptyDesc":"store-detail-module__emptyDesc___OejCD","retryBtn":"store-detail-module__retryBtn___xxtzT","header":"store-detail-module__header___T2cC0","storeImage":"store-detail-module__storeImage___8mDyY","headerInfo":"store-detail-module__headerInfo___dOWL3","storeName":"store-detail-module__storeName___tCMjA","storeStatus":"store-detail-module__storeStatus___walxu","serviceTags":"store-detail-module__serviceTags___G4gwU","serviceTag":"store-detail-module__serviceTag___VEkfE","section":"store-detail-module__section___HBAXv","sectionTitle":"store-detail-module__sectionTitle___nEkBY","sectionTitleText":"store-detail-module__sectionTitleText___XEA3a","infoCard":"store-detail-module__infoCard___hHHdo","infoItem":"store-detail-module__infoItem___cyxdV","infoLabel":"store-detail-module__infoLabel___pLqWx","infoValue":"store-detail-module__infoValue___XKOXV","infoText":"store-detail-module__infoText___AgmOl","infoAction":"store-detail-module__infoAction___JKkv8","descCard":"store-detail-module__descCard___GSBKO","descText":"store-detail-module__descText___gIoXG","mapCard":"store-detail-module__mapCard___eWWwg","mapPlaceholder":"store-detail-module__mapPlaceholder___aTIh5","mapIcon":"store-detail-module__mapIcon___A6AWN","mapText":"store-detail-module__mapText___JGspw","footer":"store-detail-module__footer___lUkoS","callBtn":"store-detail-module__callBtn___LsYoy","selectBtn":"store-detail-module__selectBtn___JItey","selectBtnDisabled":"store-detail-module__selectBtnDisabled___aARp0"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/category/store-detail/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map