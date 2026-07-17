"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/refund/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund/index!./src/pages/cart/order/refund/index.tsx":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund/index!./src/pages/cart/order/refund/index.tsx ***!
  \****************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_order_orders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/order/orders */ "./src/data/order/orders.ts");
/* harmony import */ var _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/cart/order-refund.module.scss */ "./src/styles/cart/order-refund.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");








var RefundApplyPage = function RefundApplyPage() {
  var _reasons$find2;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState, 2),
    order = _useState2[0],
    setOrder = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState3, 2),
    selectedReason = _useState4[0],
    setSelectedReason = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState5, 2),
    refundAmount = _useState6[0],
    setRefundAmount = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState7, 2),
    remark = _useState8[0],
    setRemark = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState9, 2),
    isSubmitting = _useState0[0],
    setIsSubmitting = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_useState1, 2),
    images = _useState10[0],
    setImages = _useState10[1];
  var reasons = [{
    value: 'quality',
    label: '商品质量问题'
  }, {
    value: 'wrong_order',
    label: '拍错/多拍'
  }, {
    value: 'no_want',
    label: '不想要了'
  }, {
    value: 'other',
    label: '其他'
  }];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
    var orderId = params.id || params.orderId;
    if (orderId) {
      var foundOrder = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.getOrderById)(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        setRefundAmount(foundOrder.payAmount.toString());
      } else {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '订单不存在',
          icon: 'none'
        });
        setTimeout(function () {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
        }, 1500);
      }
    }
  }, []);
  var handleSubmit = function handleSubmit() {
    var _reasons$find;
    if (!selectedReason) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请选择退款原因',
        icon: 'none'
      });
      return;
    }
    var amount = parseFloat(refundAmount);
    if (!amount || amount <= 0) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请输入正确的退款金额',
        icon: 'none'
      });
      return;
    }
    if (amount > order.payAmount) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '退款金额不能超过订单金额',
        icon: 'none'
      });
      return;
    }
    setIsSubmitting(true);
    var reasonLabel = ((_reasons$find = reasons.find(function (r) {
      return r.value === selectedReason;
    })) === null || _reasons$find === void 0 ? void 0 : _reasons$find.label) || selectedReason;
    setTimeout(function () {
      var success = (0,_data_order_orders__WEBPACK_IMPORTED_MODULE_2__.applyRefund)(order.id, reasonLabel);
      setIsSubmitting(false);
      if (success) {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '退款申请已提交',
          icon: 'success'
        });
        setTimeout(function () {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
        }, 1500);
      } else {
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
          title: '提交失败',
          icon: 'none'
        });
      }
    }, 1000);
  };
  var handleReasonSelect = function handleReasonSelect() {
    var reasonLabels = reasons.map(function (r) {
      return r.label;
    });
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showActionSheet({
      itemList: reasonLabels,
      success: function success(res) {
        setSelectedReason(reasons[res.tapIndex].value);
      }
    });
  };
  var handleImageSelect = function handleImageSelect() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showActionSheet({
      itemList: ['拍照', '选照片'],
      success: function success(res) {
        if (res.tapIndex === 0) {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().chooseImage({
            count: 9 - images.length,
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success: function success(result) {
              setImages([].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(images), (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(result.tempFilePaths)));
            }
          });
        } else if (res.tapIndex === 1) {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().chooseImage({
            count: 9 - images.length,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function success(result) {
              setImages([].concat((0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(images), (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(result.tempFilePaths)));
            }
          });
        }
      }
    });
  };
  var handleRemoveImage = function handleRemoveImage(index) {
    var newImages = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(images);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  var maxRemarkLength = 170;
  if (!order) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].loading,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  var selectedReasonLabel = ((_reasons$find2 = reasons.find(function (r) {
    return r.value === selectedReason;
  })) === null || _reasons$find2 === void 0 ? void 0 : _reasons$find2.label) || '点击选择申请原因';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].refundPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.ScrollView, {
      scrollY: true,
      style: {
        height: 'calc(100vh - 120rpx)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsSection,
        children: order.items.map(function (item) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
              src: item.image,
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsImage,
              mode: "aspectFill"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsName,
                children: item.productName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].goodsSpecs,
                children: ["\xD7", item.quantity, "\uFF0C", item.skuName]
              })]
            })]
          }, item.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formItem,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formLabel,
            children: "\u7533\u8BF7\u7C7B\u578B"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formRight,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formValue,
              children: "\u6211\u8981\u9000\u8D27\u9000\u6B3E"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formArrow,
              children: "\u203A"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formItem,
          onClick: handleReasonSelect,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formLabel,
            children: "\u7533\u8BF7\u539F\u56E0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formRight,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: "".concat(_styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formValue, " ").concat(selectedReason ? '' : _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].placeholder),
              children: selectedReasonLabel
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formArrow,
              children: "\u203A"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formItem,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formLabel,
            children: "\u7533\u8BF7\u91D1\u989D"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].formRight,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountValue,
              children: ["\xA5", parseFloat(refundAmount).toFixed(2)]
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkLabel,
            children: "\u7533\u8BF7\u8BF4\u660E"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkCount,
            children: ["\u60A8\u8FD8\u53EF\u4EE5\u8F93\u5165", maxRemarkLength - remark.length, "\u5B57"]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkInputWrapper,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("textarea", {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkInput,
            value: remark,
            onChange: function onChange(e) {
              if (e.target.value.length <= maxRemarkLength) {
                setRemark(e.target.value);
              }
            },
            placeholder: "\u8BF7\u60A8\u8BE6\u7EC6\u586B\u5199\u7533\u8BF7\u8BF4\u660E",
            maxLength: maxRemarkLength
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkImageUpload,
            onClick: handleImageSelect,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkImageIcon,
              children: "\uD83D\uDCF7"
            })
          })]
        }), images.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkImageList,
          children: images.map(function (image, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkImageItem,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
                src: image,
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkImagePreview,
                mode: "aspectFill"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].remarkImageRemove,
                onClick: function onClick() {
                  return handleRemoveImage(index);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  children: "\xD7"
                })
              })]
            }, index);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bottomSpace
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bottomBar,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: "".concat(_styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].submitBtn, " ").concat(isSubmitting ? _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].submitBtnDisabled : ''),
        onClick: handleSubmit,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].submitText,
          children: isSubmitting ? '提交中...' : '提交退款申请'
        })
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (RefundApplyPage);

/***/ }),

/***/ "./src/pages/cart/order/refund/index.tsx":
/*!***********************************************!*\
  !*** ./src/pages/cart/order/refund/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund/index!./src/pages/cart/order/refund/index.tsx");


var config = {"navigationBarTitleText":"申请退款","navigationBarBackgroundColor":"#ffffff","navigationBarTextStyle":"black","backgroundColor":"#f5f5f5"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/cart/order/refund/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_order_refund_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/cart/order-refund.module.scss":
/*!**************************************************!*\
  !*** ./src/styles/cart/order-refund.module.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"refundPage":"order-refund-module__refundPage___MO_TP","loading":"order-refund-module__loading____B5Tx","banner":"order-refund-module__banner___P6zVS","bannerText":"order-refund-module__bannerText___KbcYF","bannerArrow":"order-refund-module__bannerArrow___wW0BI","goodsSection":"order-refund-module__goodsSection___f4dvn","goodsItem":"order-refund-module__goodsItem___QDj81","goodsImage":"order-refund-module__goodsImage___XJtbQ","goodsInfo":"order-refund-module__goodsInfo___UbjHp","goodsName":"order-refund-module__goodsName___HTH_K","goodsSpecs":"order-refund-module__goodsSpecs___LpmY5","formSection":"order-refund-module__formSection___dQaMy","formItem":"order-refund-module__formItem___kuMKR","formLabel":"order-refund-module__formLabel___k4otD","formRight":"order-refund-module__formRight___XCYKY","formValue":"order-refund-module__formValue___cS2J4","placeholder":"order-refund-module__placeholder___Pgg8S","formArrow":"order-refund-module__formArrow___Fe2SN","amountValue":"order-refund-module__amountValue___mLq5W","tipSection":"order-refund-module__tipSection___ISwjX","tipTitle":"order-refund-module__tipTitle___bgnhy","tipContent":"order-refund-module__tipContent___z2Ee6","tipBullet":"order-refund-module__tipBullet___lOSZR","tipText":"order-refund-module__tipText___FhQrM","noteSection":"order-refund-module__noteSection___RbZqH","noteText":"order-refund-module__noteText___EVqHM","noteLink":"order-refund-module__noteLink___CFa6Z","freightSection":"order-refund-module__freightSection___rB2tN","freightTitle":"order-refund-module__freightTitle___fY1Um","freightText":"order-refund-module__freightText___X2OtP","freightIcon":"order-refund-module__freightIcon___mdbQB","remarkSection":"order-refund-module__remarkSection___hR6pj","remarkHeader":"order-refund-module__remarkHeader___nVD03","remarkLabel":"order-refund-module__remarkLabel___BsiXK","remarkCount":"order-refund-module__remarkCount___hyHtI","remarkInputWrapper":"order-refund-module__remarkInputWrapper___J3LbK","remarkInput":"order-refund-module__remarkInput___l5vHF","remarkImageUpload":"order-refund-module__remarkImageUpload___bmBBt","remarkImageIcon":"order-refund-module__remarkImageIcon___ilq06","remarkImageList":"order-refund-module__remarkImageList___PaFtW","remarkImageItem":"order-refund-module__remarkImageItem___oGUU_","remarkImagePreview":"order-refund-module__remarkImagePreview___f3pjq","remarkImageRemove":"order-refund-module__remarkImageRemove___jJXnM","bottomSpace":"order-refund-module__bottomSpace___zVYmD","bottomBar":"order-refund-module__bottomBar___WByiT","submitBtn":"order-refund-module__submitBtn___w4MyO","submitText":"order-refund-module__submitText___IVnLY","submitBtnDisabled":"order-refund-module__submitBtnDisabled___oJe9h"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/order/refund/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map