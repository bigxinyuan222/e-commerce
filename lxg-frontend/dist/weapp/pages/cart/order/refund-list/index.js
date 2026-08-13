"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/refund-list/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund-list/index!./src/pages/cart/order/refund-list/index.tsx":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund-list/index!./src/pages/cart/order/refund-list/index.tsx ***!
  \**************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/cart/order-list.module.scss */ "./src/styles/cart/order-list.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");












var refundStatusTextMap = {
  'pending': '待审核',
  'approved': '已通过',
  'rejected': '已拒绝',
  'completed': '已完成'
};
var refundStatusColorMap = {
  'pending': '#faad14',
  'approved': '#52c41a',
  'rejected': '#ff4d4f',
  'completed': '#52c41a'
};
function pickFirstValid() {
  for (var _len = arguments.length, candidates = new Array(_len), _key = 0; _key < _len; _key++) {
    candidates[_key] = arguments[_key];
  }
  for (var _i = 0, _candidates = candidates; _i < _candidates.length; _i++) {
    var value = _candidates[_i];
    if (value !== undefined && value !== null && value !== '' && value !== 0 && value !== '0') {
      return String(value);
    }
  }
  return '';
}
function transformOrderItem(item) {
  var skuName = item.skuName || item.SkuName || '';
  if (!skuName && item.specValues && (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_6__["default"])(item.specValues) === 'object') {
    skuName = Object.values(item.specValues).join('/') || '';
  }
  var image = item.image || item.Image || '';
  if (typeof image === 'string' && image.startsWith('[')) {
    try {
      var parsed = JSON.parse(image);
      if (Array.isArray(parsed) && parsed.length > 0) {
        image = parsed[0].replace(/^`|`$/g, '');
      }
    } catch (_unused) {/* ignore */}
  }
  return {
    id: pickFirstValid(item.id, item.ID, item.productId, item.ProductID),
    productId: pickFirstValid(item.productId, item.ProductID),
    productName: item.productName || item.ProductName || '',
    skuId: pickFirstValid(item.skuId, item.SkuID),
    skuName: skuName,
    price: item.price != null ? item.price : item.Price || 0,
    quantity: item.quantity != null ? item.quantity : item.Quantity || 0,
    image: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(image)
  };
}
function transformRefund(refund) {
  var items = (refund.items || []).map(function (item) {
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({}, transformOrderItem(item)), {}, {
      image: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(item.image || item.Image || '')
    });
  });
  var status = refund.status || 'pending';
  return {
    id: refund.id || '',
    orderId: refund.orderId || '',
    orderNo: refund.refundNo || refund.orderNo || '',
    status: status,
    statusText: refundStatusTextMap[status] || refund.statusText || '待处理',
    createTime: refund.applyTime || '',
    payAmount: refund.amount || refund.payAmount || 0,
    totalAmount: refund.amount || 0,
    items: items
  };
}
var RefundProductItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var product = _ref.product;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderProduct,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
      src: product.image,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productImage,
      mode: "aspectFill"
    }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productName,
        children: product.productName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productSpecs,
        children: product.skuName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productBottom,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productPrice,
          children: ["\xA5", product.price]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].productQuantity,
          children: ["x", product.quantity]
        })]
      })]
    })]
  });
});
var RefundCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var record = _ref2.record;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderCard,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderId,
        children: ["\u9000\u8D27\u7F16\u53F7: ", record.orderNo]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderStatus,
        style: {
          color: refundStatusColorMap[record.status] || '#999'
        },
        children: record.statusText
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderProducts,
      children: (record.items || []).map(function (product, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(RefundProductItem, {
          product: product
        }, "".concat(record.id, "-").concat(product.productId, "-").concat(index));
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderFooter,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderTotal,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].totalLabel,
          children: "\u5408\u8BA1:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].totalValue,
          children: ["\xA5", record.payAmount]
        })]
      })
    })]
  });
});
var tabs = [{
  key: 'all',
  label: '全部'
}, {
  key: 'pending',
  label: '待审核'
}, {
  key: 'approved',
  label: '已通过'
}, {
  key: 'rejected',
  label: '已拒绝'
}, {
  key: 'completed',
  label: '已完成'
}];
var validRefundStatuses = ['pending', 'approved', 'rejected', 'completed'];
var RefundListPage = function RefundListPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all'),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    records = _useState4[0],
    setRecords = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var loadRecords = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee() {
    var res, list, refundRecords, _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          setLoading(true);
          _context.p = 1;
          _context.n = 2;
          return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchRefundList)({
            page: 1,
            size: 100
          });
        case 2:
          res = _context.v;
          list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : [];
          refundRecords = list.map(transformRefund).filter(function (r) {
            return validRefundStatuses.includes(r.status);
          });
          setRecords(refundRecords);
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error('加载退款/售后列表失败:', _t);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: (_t === null || _t === void 0 ? void 0 : _t.message) || '加载失败',
            icon: 'none'
          });
          setRecords([]);
        case 4:
          _context.p = 4;
          setLoading(false);
          return _context.f(4);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3, 4, 5]]);
  })), []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadRecords();
  }, [loadRecords]);
  var filteredRecords = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (activeTab === 'all') return records;
    return records.filter(function (r) {
      return r.status === activeTab;
    });
  }, [records, activeTab]);
  var activeTabIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return tabs.findIndex(function (tab) {
      return tab.key === activeTab;
    });
  }, [activeTab]);
  var goShopping = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/home/index'
    });
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderListPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundHeader,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].refundTitle,
        children: "\u9000\u6B3E/\u552E\u540E"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
      scrollX: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabBar,
      showScrollbar: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabList,
        children: tabs.map(function (tab, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: "".concat(_styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabItem, " ").concat(activeTabIndex === index ? _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
            onClick: function onClick() {
              return setActiveTab(tab.key);
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabText,
              children: tab.label
            }), activeTabIndex === index && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].tabIndicator
            })]
          }, tab.key);
        })
      })
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].loading,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        children: "\u52A0\u8F7D\u4E2D..."
      })
    }) : filteredRecords.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
      scrollY: true,
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].orderList,
      enhanced: true,
      showScrollbar: false,
      children: filteredRecords.map(function (record, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(RefundCard, {
          record: record
        }, record.id || "refund-".concat(index));
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyOrder,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyIcon,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          children: "\uD83D\uDCE6"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyText,
        children: "\u6682\u65E0\u9000\u6B3E/\u552E\u540E\u8BB0\u5F55"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: _styles_cart_order_list_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].goShoppingBtn,
        onClick: goShopping,
        children: "\u53BB\u8D2D\u7269"
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(RefundListPage));

/***/ }),

/***/ "./src/pages/cart/order/refund-list/index.tsx":
/*!****************************************************!*\
  !*** ./src/pages/cart/order/refund-list/index.tsx ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund-list/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund-list/index!./src/pages/cart/order/refund-list/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/cart/order/refund-list/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_list_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/order/refund-list/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map