"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/review/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/review/index!./src/pages/cart/order/review/index.tsx":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/review/index!./src/pages/cart/order/review/index.tsx ***!
  \****************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_order_orders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/order/orders */ "./src/data/order/orders.ts");
/* harmony import */ var _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/cart/order-review.module.scss */ "./src/styles/cart/order-review.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







var OrderReviewPage = function OrderReviewPage() {
  var _order$store;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    order = _useState2[0],
    setOrder = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('good'),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState5, 2),
    rating = _useState6[0],
    setRating = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState7, 2),
    reviewContent = _useState8[0],
    setReviewContent = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState0 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState9, 1),
    images = _useState0[0];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
    if (params.id) {
      var orderData = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrderById)(params.id);
      if (orderData) {
        setOrder(orderData);
      } else {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '订单不存在',
          icon: 'none'
        });
      }
    }
    setLoading(false);
  }, []);
  var handleRatingClick = function handleRatingClick(type) {
    setRating(type);
  };
  var handleReviewSubmit = function handleReviewSubmit() {
    if (reviewContent.length === 0) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入评价内容',
        icon: 'none'
      });
      return;
    }
    if (order !== null && order !== void 0 && order.id) {
      (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.updateOrderStatus)(order.id, 'reviewed');
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '评价成功',
        icon: 'success'
      });
      setTimeout(function () {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
      }, 1500);
    }
  };
  var handleBuyAgain = function handleBuyAgain() {
    var _order$items;
    if (order !== null && order !== void 0 && (_order$items = order.items) !== null && _order$items !== void 0 && (_order$items = _order$items[0]) !== null && _order$items !== void 0 && _order$items.productId) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/home/detail/index?id=".concat(order.items[0].productId)
      });
    }
  };
  var handleRefund = function handleRefund() {
    if (order !== null && order !== void 0 && order.id) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/order/refund/index?id=".concat(order.id)
      });
    }
  };
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].reviewPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  if (!order) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].reviewPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          style: {
            fontSize: '32rpx',
            color: '#999'
          },
          children: "\u8BA2\u5355\u4E0D\u5B58\u5728"
        })
      })
    });
  }
  var ratingLabel = rating === 'good' ? '好评' : '差评';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
    className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].reviewPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBar,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navContent,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navBack,
          onClick: function onClick() {
            return _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
          },
          children: "\u2039"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].navTitle,
          children: "\u8BC4\u4EF7\u6652\u5355"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          style: {
            width: '60rpx'
          }
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.ScrollView, {
      scrollY: true,
      className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].scrollView,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeInfo,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeName,
            children: ["\uD83C\uDFEA ", ((_order$store = order.store) === null || _order$store === void 0 ? void 0 : _order$store.name) || '官方自营']
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeStatus,
            children: "\u5B8C\u6210"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeTags,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeTag,
            children: "\u652F\u63017\u5929\u65E0\u7406\u7531\u9000\u8D27"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
            className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].storeTag,
            children: "7\u5929\u4EF7\u4FDD"
          })]
        })]
      }), (order.items || []).map(function (item) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productSection,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
              src: item.image,
              className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productImage,
              mode: "aspectFill"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
              className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productName,
                children: item.productName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productSpec,
                children: item.skuName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
                className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productBottom,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                  className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productPrice,
                  children: ["\xA5", item.price]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
                  className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].productQuantity,
                  children: ["\xD7", item.quantity]
                })]
              })]
            })]
          })
        }, item.id);
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingLabel,
          children: "\u5546\u54C1\u8BC4\u4EF7"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingButtons,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: "".concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingBtn, " ").concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodBtn, " ").concat(rating === 'good' ? _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
            onClick: function onClick() {
              return handleRatingClick('good');
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingEmoji,
              children: "\uD83D\uDE0A"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingText,
              children: "\u597D\u8BC4"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: "".concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingBtn, " ").concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].badBtn, " ").concat(rating === 'bad' ? _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].active : ''),
            onClick: function onClick() {
              return handleRatingClick('bad');
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingEmoji,
              children: "\uD83D\uDE22"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingText,
              children: "\u5DEE\u8BC4"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].ratingDesc,
          children: ratingLabel
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].contentSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].contentLabel,
          children: "\u8BC4\u4EF7\u5185\u5BB9"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("textarea", {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].contentInput,
          value: reviewContent,
          onChange: function onChange(e) {
            return setReviewContent(e.target.value);
          },
          placeholder: "\u8BF7\u8F93\u5165\u60A8\u5BF9\u5546\u54C1\u7684\u8BC4\u4EF7...",
          maxLength: 500
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].contentHint,
          children: [reviewContent.length, "/500"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].imageSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].imageLabel,
          children: "\u6652\u5355\u56FE\u7247\uFF08\u53EF\u9009\uFF09"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
          className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].imageGrid,
          children: [images.map(function (img, idx) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Image, {
              src: img,
              className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].imageItem,
              mode: "aspectFill"
            }, idx);
          }), images.length < 6 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
            className: "".concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].imageItem, " ").concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].imageUpload),
            onClick: function onClick() {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '图片上传功能开发中',
                icon: 'none'
              });
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.Text, {
              children: "+"
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
      className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn,
        onClick: handleBuyAgain,
        children: "\u518D\u6B21\u8D2D\u4E70"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: _styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn,
        onClick: handleRefund,
        children: "\u9000\u6B3E/\u552E\u540E"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_6__.View, {
        className: "".concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtn, " ").concat(_styles_cart_order_review_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].actionBtnPrimary),
        onClick: handleReviewSubmit,
        children: "\u8BC4\u4EF7\u6652\u5355"
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (OrderReviewPage);

/***/ }),

/***/ "./src/pages/cart/order/review/index.tsx":
/*!***********************************************!*\
  !*** ./src/pages/cart/order/review/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_review_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/review/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/review/index!./src/pages/cart/order/review/index.tsx");


var config = {"navigationBarTitleText":"评价晒单","navigationStyle":"custom"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_review_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/cart/order/review/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_review_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_review_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_review_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_review_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/cart/order-review.module.scss":
/*!**************************************************!*\
  !*** ./src/styles/cart/order-review.module.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"reviewPage":"order-review-module__reviewPage___yzuQL","navBar":"order-review-module__navBar___cHV0y","navContent":"order-review-module__navContent___Gc5Le","navBack":"order-review-module__navBack___J6U29","navTitle":"order-review-module__navTitle___zvrWi","scrollView":"order-review-module__scrollView___Vq94t","storeSection":"order-review-module__storeSection___XvgSO","storeInfo":"order-review-module__storeInfo___AD4md","storeName":"order-review-module__storeName___EOpNa","storeStatus":"order-review-module__storeStatus___HPxVV","storeTags":"order-review-module__storeTags___mpO8I","storeTag":"order-review-module__storeTag___cIS4s","productSection":"order-review-module__productSection___Ljget","productItem":"order-review-module__productItem___llx3F","productImage":"order-review-module__productImage___WUetP","productInfo":"order-review-module__productInfo___gTzHU","productName":"order-review-module__productName___agnXK","productSpec":"order-review-module__productSpec___SgPER","productBottom":"order-review-module__productBottom___UsWjl","productPrice":"order-review-module__productPrice___O9zUn","productQuantity":"order-review-module__productQuantity___vREGt","ratingSection":"order-review-module__ratingSection___hiG4v","ratingLabel":"order-review-module__ratingLabel___ubHfN","ratingButtons":"order-review-module__ratingButtons___GbyWd","ratingBtn":"order-review-module__ratingBtn___mkPkf","ratingEmoji":"order-review-module__ratingEmoji___CwJRQ","ratingText":"order-review-module__ratingText___pz3K2","goodBtn":"order-review-module__goodBtn___pOBmI","active":"order-review-module__active___a58GV","badBtn":"order-review-module__badBtn___gp3ar","ratingDesc":"order-review-module__ratingDesc___wISff","contentSection":"order-review-module__contentSection___VmooS","contentLabel":"order-review-module__contentLabel___CjOkj","contentInput":"order-review-module__contentInput___FbNhv","contentHint":"order-review-module__contentHint___EtbPT","imageSection":"order-review-module__imageSection___BpbiV","imageLabel":"order-review-module__imageLabel___dZjuZ","imageGrid":"order-review-module__imageGrid___AaYgI","imageItem":"order-review-module__imageItem___Kj2gr","imageUpload":"order-review-module__imageUpload___eFoBh","bottomBar":"order-review-module__bottomBar___BznZK","actionBtn":"order-review-module__actionBtn___bJkIp","actionBtnPrimary":"order-review-module__actionBtnPrimary___Ip0vi","actionBtnSecondary":"order-review-module__actionBtnSecondary___Iu94l"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/order/review/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map