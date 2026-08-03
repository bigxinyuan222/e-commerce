"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/order/refund/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund/index!./src/pages/cart/order/refund/index.tsx":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/order/refund/index!./src/pages/cart/order/refund/index.tsx ***!
  \****************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/user */ "./src/api/user/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/styles/cart/order-refund.module.scss */ "./src/styles/cart/order-refund.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");














var RefundApplyPage = function RefundApplyPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    order = _useState2[0],
    setOrder = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    reasons = _useState4[0],
    setReasons = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState5, 2),
    selectedReasonId = _useState6[0],
    setSelectedReasonId = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState7, 2),
    selectedReasonText = _useState8[0],
    setSelectedReasonText = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState9, 2),
    refundAmount = _useState0[0],
    setRefundAmount = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState1, 2),
    remark = _useState10[0],
    setRemark = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState11, 2),
    isSubmitting = _useState12[0],
    setIsSubmitting = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState14 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState13, 2),
    loading = _useState14[0],
    setLoading = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState16 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState15, 2),
    images = _useState16[0],
    setImages = _useState16[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    var params = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.params) || {};
    var orderId = params.id || params.orderId;
    if (orderId) {
      loadPageData(orderId);
    } else {
      setLoading(false);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '订单ID不存在',
        icon: 'none'
      });
    }
  }, []);
  var loadPageData = /*#__PURE__*/function () {
    var _ref = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee(orderId) {
      var _yield$Promise$all, _yield$Promise$all2, orderRes, reasonsRes, _ref2, _orderRes$data$payAmo, reasonList, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setLoading(true);
            _context.p = 1;
            _context.n = 2;
            return Promise.all([(0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchOrderDetail)(orderId), (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.fetchRefundReasons)({
              enabled: true
            })]);
          case 2:
            _yield$Promise$all = _context.v;
            _yield$Promise$all2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_yield$Promise$all, 2);
            orderRes = _yield$Promise$all2[0];
            reasonsRes = _yield$Promise$all2[1];
            if (orderRes !== null && orderRes !== void 0 && orderRes.data) {
              setOrder(orderRes.data);
              setRefundAmount(String((_ref2 = (_orderRes$data$payAmo = orderRes.data.payAmount) !== null && _orderRes$data$payAmo !== void 0 ? _orderRes$data$payAmo : orderRes.data.totalAmount) !== null && _ref2 !== void 0 ? _ref2 : ''));
            } else {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                title: '订单不存在',
                icon: 'none'
              });
            }
            if (Array.isArray(reasonsRes === null || reasonsRes === void 0 ? void 0 : reasonsRes.data) && reasonsRes.data.length > 0) {
              reasonList = reasonsRes.data.map(function (r) {
                var _ref3, _ref4, _r$id, _ref5, _ref6, _r$name;
                return {
                  id: String((_ref3 = (_ref4 = (_r$id = r.id) !== null && _r$id !== void 0 ? _r$id : r.code) !== null && _ref4 !== void 0 ? _ref4 : r.name) !== null && _ref3 !== void 0 ? _ref3 : ''),
                  name: (_ref5 = (_ref6 = (_r$name = r.name) !== null && _r$name !== void 0 ? _r$name : r.label) !== null && _ref6 !== void 0 ? _ref6 : r.title) !== null && _ref5 !== void 0 ? _ref5 : ''
                };
              }).filter(function (r) {
                return r.name;
              });
              setReasons(reasonList);
            } else {
              setReasons([{
                id: 'quality',
                name: '商品质量问题'
              }, {
                id: 'wrong_order',
                name: '拍错/多拍'
              }, {
                id: 'no_want',
                name: '不想要了'
              }, {
                id: 'other',
                name: '其他'
              }]);
            }
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error('加载页面数据失败:', _t);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: (_t === null || _t === void 0 ? void 0 : _t.message) || '加载失败',
              icon: 'none'
            });
            setReasons([{
              id: 'quality',
              name: '商品质量问题'
            }, {
              id: 'wrong_order',
              name: '拍错/多拍'
            }, {
              id: 'no_want',
              name: '不想要了'
            }, {
              id: 'other',
              name: '其他'
            }]);
          case 4:
            _context.p = 4;
            setLoading(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function loadPageData(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref7 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().m(function _callee2() {
      var amount, _reasons$find, uploadedImages, i, url, reasonText, _t2;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(!selectedReasonId && !selectedReasonText)) {
              _context2.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请选择退款原因',
              icon: 'none'
            });
            return _context2.a(2);
          case 1:
            amount = parseFloat(refundAmount);
            if (!(!amount || amount <= 0)) {
              _context2.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '请输入正确的退款金额',
              icon: 'none'
            });
            return _context2.a(2);
          case 2:
            if (!(order !== null && order !== void 0 && order.payAmount && amount > order.payAmount)) {
              _context2.n = 3;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '退款金额不能超过订单金额',
              icon: 'none'
            });
            return _context2.a(2);
          case 3:
            setIsSubmitting(true);
            _context2.p = 4;
            // 先将本地临时图片上传到服务器，拿到URL列表
            uploadedImages = [];
            if (!(images.length > 0)) {
              _context2.n = 9;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: "\u4E0A\u4F20\u56FE\u7247 0/".concat(images.length),
              mask: true
            });
            uploadedImages = [];
            i = 0;
          case 5:
            if (!(i < images.length)) {
              _context2.n = 8;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showLoading({
              title: "\u4E0A\u4F20\u56FE\u7247 ".concat(i + 1, "/").concat(images.length),
              mask: true
            });
            _context2.n = 6;
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_3__.uploadImage)(_api_user__WEBPACK_IMPORTED_MODULE_4__.userApi.upload, images[i], 'file', {
              type: 'refund'
            });
          case 6:
            url = _context2.v;
            uploadedImages.push(url);
          case 7:
            i++;
            _context2.n = 5;
            break;
          case 8:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
          case 9:
            reasonText = selectedReasonText || ((_reasons$find = reasons.find(function (r) {
              return r.id === selectedReasonId;
            })) === null || _reasons$find === void 0 ? void 0 : _reasons$find.name) || '';
            _context2.n = 10;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_2__.applyRefund)({
              orderId: order.id,
              type: 'return_refund',
              reasonId: selectedReasonId,
              reason: reasonText,
              amount: amount,
              description: remark,
              images: uploadedImages
            });
          case 10:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '退款申请已提交',
              icon: 'success'
            });
            setTimeout(function () {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateBack();
            }, 1500);
            _context2.n = 12;
            break;
          case 11:
            _context2.p = 11;
            _t2 = _context2.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().hideLoading();
            console.error('提交退款申请失败:', _t2);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: (_t2 === null || _t2 === void 0 ? void 0 : _t2.message) || '提交失败',
              icon: 'none'
            });
          case 12:
            _context2.p = 12;
            setIsSubmitting(false);
            return _context2.f(12);
          case 13:
            return _context2.a(2);
        }
      }, _callee2, null, [[4, 11, 12, 13]]);
    }));
    return function handleSubmit() {
      return _ref7.apply(this, arguments);
    };
  }();
  var handleReasonSelect = function handleReasonSelect() {
    var reasonLabels = reasons.map(function (r) {
      return r.name;
    });
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showActionSheet({
      itemList: reasonLabels,
      success: function success(res) {
        var selected = reasons[res.tapIndex];
        if (selected) {
          setSelectedReasonId(selected.id);
          setSelectedReasonText(selected.name);
        }
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
              setImages([].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(images), (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(result.tempFilePaths)));
            }
          });
        } else if (res.tapIndex === 1) {
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().chooseImage({
            count: 9 - images.length,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function success(result) {
              setImages([].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(images), (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(result.tempFilePaths)));
            }
          });
        }
      }
    });
  };
  var handleRemoveImage = function handleRemoveImage(index) {
    var newImages = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_11__["default"])(images);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  var maxRemarkLength = 170;
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].refundPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].loading,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  if (!order) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].refundPage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].loading,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          children: "\u8BA2\u5355\u4E0D\u5B58\u5728"
        })
      })
    });
  }
  var displayReason = selectedReasonText || '点击选择申请原因';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
    className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].refundPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.ScrollView, {
      scrollY: true,
      style: {
        height: 'calc(100vh - 120rpx)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsSection,
        children: (order.items || []).map(function (item) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_13__["default"])({
              src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.getImageUrl)(item.image),
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsImage,
              mode: "aspectFill"
            }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_5__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsName,
                children: item.productName
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].goodsSpecs,
                children: ["\xD7", item.quantity, "\uFF0C", item.skuName]
              })]
            })]
          }, item.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formItem,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formLabel,
            children: "\u7533\u8BF7\u7C7B\u578B"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formRight,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formValue,
              children: "\u6211\u8981\u9000\u8D27\u9000\u6B3E"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formArrow,
              children: "\u203A"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formItem,
          onClick: handleReasonSelect,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formLabel,
            children: "\u7533\u8BF7\u539F\u56E0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formRight,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: "".concat(_styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formValue, " ").concat(selectedReasonId || selectedReasonText ? '' : _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].placeholder),
              children: displayReason
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formArrow,
              children: "\u203A"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formItem,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formLabel,
            children: "\u7533\u8BF7\u91D1\u989D"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].formRight,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].amountValue,
              children: ["\xA5", parseFloat(refundAmount || '0').toFixed(2)]
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkLabel,
            children: "\u7533\u8BF7\u8BF4\u660E"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkCount,
            children: ["\u60A8\u8FD8\u53EF\u4EE5\u8F93\u5165", maxRemarkLength - remark.length, "\u5B57"]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkInputWrapper,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Textarea, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkInput,
            value: remark,
            onInput: function onInput(e) {
              if (e.detail.value.length <= maxRemarkLength) {
                setRemark(e.detail.value);
              }
            },
            placeholder: "\u8BF7\u60A8\u8BE6\u7EC6\u586B\u5199\u7533\u8BF7\u8BF4\u660E",
            maxlength: maxRemarkLength
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
            className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkImageUpload,
            onClick: handleImageSelect,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkImageIcon,
              children: "\uD83D\uDCF7"
            })
          })]
        }), images.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkImageList,
          children: images.map(function (image, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
              className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkImageItem,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Image, {
                src: image,
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkImagePreview,
                mode: "aspectFill"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
                className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].remarkImageRemove,
                onClick: function onClick() {
                  return handleRemoveImage(index);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
                  children: "\xD7"
                })
              })]
            }, index);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].bottomSpace
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
      className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].bottomBar,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.View, {
        className: "".concat(_styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].submitBtn, " ").concat(isSubmitting ? _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].submitBtnDisabled : ''),
        onClick: handleSubmit,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_12__.Text, {
          className: _styles_cart_order_refund_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].submitText,
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