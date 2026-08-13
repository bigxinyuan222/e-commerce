"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/index!./src/pages/cart/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/index!./src/pages/cart/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/cart */ "./src/api/cart/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/cart/cart.module.scss */ "./src/styles/cart/cart.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");












// 购物车商品项组件

var CartItemComponent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var _item$seckillPrice;
  var item = _ref.item,
    isEditing = _ref.isEditing,
    onSelect = _ref.onSelect,
    onDecrease = _ref.onDecrease,
    onIncrease = _ref.onIncrease,
    onDelete = _ref.onDelete,
    onProductClick = _ref.onProductClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].cartItem,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectBtn, " ").concat(item.selected ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selected : ''),
      onClick: function onClick() {
        return onSelect(item.id);
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])({
      src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(item.image),
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].itemImage,
      mode: "aspectFill"
    }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.lazyImgProps)()), {}, {
      onClick: function onClick() {
        return onProductClick(item.productId);
      }
    })), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].itemInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].itemName,
        children: item.productName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].itemSpecs,
        children: item.skuName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].itemBottom,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].priceWrap,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].itemPrice,
            children: ["\xA5", (_item$seckillPrice = item.seckillPrice) !== null && _item$seckillPrice !== void 0 ? _item$seckillPrice : item.price]
          }), item.isSeckill && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillTag,
            children: "\u79D2\u6740\u4EF7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityControl,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityBtn, " ").concat(item.quantity <= 1 ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
            onClick: function onClick() {
              return onDecrease(item.id, item.quantity);
            },
            children: "-"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityNum,
            children: item.quantity
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].quantityBtn,
            onClick: function onClick() {
              return onIncrease(item.id, item.quantity, item.stock);
            },
            children: "+"
          })]
        })]
      })]
    }), isEditing && item.id && item.id !== '0' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].deleteBtn,
      onClick: function onClick() {
        return onDelete(item.id);
      },
      children: "\xD7"
    })]
  }, item.id);
});
var CartPage = function CartPage() {
  var _useAppContext = (0,_store_AppContext__WEBPACK_IMPORTED_MODULE_2__.useAppContext)(),
    cartItems = _useAppContext.cartItems,
    setCartItems = _useAppContext.setCartItems,
    removeFromCart = _useAppContext.removeFromCart,
    updateCartQuantity = _useAppContext.updateCartQuantity,
    toggleCartItem = _useAppContext.toggleCartItem,
    selectAllCartItems = _useAppContext.selectAllCartItems,
    getCartTotal = _useAppContext.getCartTotal;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState, 2),
    isEditing = _useState2[0],
    setIsEditing = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var loadCart = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee() {
    var res, list, normalized, mergedMap, _t;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          setLoading(true);
          _context.n = 1;
          return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.fetchCartList)();
        case 1:
          res = _context.v;
          if (res !== null && res !== void 0 && res.data) {
            list = Array.isArray(res.data) ? res.data : [];
            normalized = list.map(function (item) {
              var _transformed$selected;
              var transformed = (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.transformCartItem)(item);
              return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])({}, transformed), {}, {
                selected: (_transformed$selected = transformed.selected) !== null && _transformed$selected !== void 0 ? _transformed$selected : true,
                image: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.getImageUrl)(transformed.image)
              });
            }); // 打印购物车图片调试信息，便于排查同商品图片不一致问题
            console.log('[购物车] 加载记录:', normalized.map(function (it) {
              return {
                id: it.id,
                productId: it.productId,
                skuId: it.skuId,
                productName: it.productName,
                imageRaw: it.image,
                imageValid: (0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.isValidImageUrl)(it.image)
              };
            }));

            // 合并相同 productId + skuId 的记录，优先保留有效图片
            mergedMap = new Map();
            normalized.forEach(function (item) {
              var key = "".concat(item.productId, "-").concat(item.skuId);
              var existing = mergedMap.get(key);
              if (!existing) {
                mergedMap.set(key, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_8__["default"])({}, item));
              } else {
                existing.quantity += item.quantity;
                existing.selected = existing.selected || item.selected;
                if ((0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.isValidImageUrl)(item.image) && !(0,_utils_image__WEBPACK_IMPORTED_MODULE_4__.isValidImageUrl)(existing.image)) {
                  existing.image = item.image;
                }
              }
            });
            setCartItems(Array.from(mergedMap.values()));
          }
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          console.error('加载购物车失败:', _t);
        case 3:
          _context.p = 3;
          setLoading(false);
          return _context.f(3);
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2, 3, 4]]);
  })), [setCartItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadCart();
  }, [loadCart]);
  var cartTotal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return getCartTotal();
  }, [getCartTotal, cartItems]);
  var totalAmount = cartTotal.totalAmount,
    selectedCount = cartTotal.selectedCount;
  var allSelected = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return cartItems.length > 0 && cartItems.every(function (item) {
      return item.selected;
    });
  }, [cartItems]);
  var goCheckout = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (selectedCount === 0) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/cart/checkout/index'
    });
  }, [selectedCount]);
  var handleDelete = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    if (!id || id === '0') {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '商品信息异常，请刷新购物车',
        icon: 'none'
      });
      return;
    }
    // 前端本地临时 ID（未同步到后端），直接本地删除即可
    if (String(id).startsWith('cart-')) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
        title: '确认删除',
        content: '确定要删除该商品吗？',
        success: function success(res) {
          if (res.confirm) {
            removeFromCart(id);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '已删除',
              icon: 'success'
            });
          }
        }
      });
      return;
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showModal({
      title: '确认删除',
      content: '确定要删除该商品吗？',
      success: function () {
        var _success = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee2(res) {
          var _t2;
          return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!res.confirm) {
                  _context2.n = 4;
                  break;
                }
                _context2.p = 1;
                _context2.n = 2;
                return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.deleteCartItem)(id);
              case 2:
                removeFromCart(id);
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: '已删除',
                  icon: 'success'
                });
                _context2.n = 4;
                break;
              case 3:
                _context2.p = 3;
                _t2 = _context2.v;
                console.error('[购物车删除] 失败，id:', id, 'error:', _t2);
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
                  title: (_t2 === null || _t2 === void 0 ? void 0 : _t2.message) || '删除失败',
                  icon: 'none'
                });
              case 4:
                return _context2.a(2);
            }
          }, _callee2, null, [[1, 3]]);
        }));
        function success(_x) {
          return _success.apply(this, arguments);
        }
        return success;
      }()
    });
  }, [removeFromCart]);
  var isTempCartId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    return String(id).startsWith('cart-');
  }, []);
  var decreaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref3 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee3(id, quantity) {
      var newQuantity, _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (!(quantity <= 1)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            newQuantity = quantity - 1;
            if (!isTempCartId(id)) {
              _context3.n = 2;
              break;
            }
            updateCartQuantity(id, newQuantity);
            return _context3.a(2);
          case 2:
            _context3.p = 2;
            _context3.n = 3;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.updateCartItem)(id, {
              quantity: newQuantity
            });
          case 3:
            updateCartQuantity(id, newQuantity);
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            console.error('[购物车减数量] 失败，id:', id, 'error:', _t3);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: (_t3 === null || _t3 === void 0 ? void 0 : _t3.message) || '更新失败',
              icon: 'none'
            });
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 4]]);
    }));
    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }(), [updateCartQuantity, isTempCartId]);
  var increaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_10__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().m(function _callee4(id, quantity, stock) {
      var newQuantity, _t4;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_11__["default"])().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (!(quantity >= stock)) {
              _context4.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '库存不足',
              icon: 'none'
            });
            return _context4.a(2);
          case 1:
            newQuantity = quantity + 1;
            if (!isTempCartId(id)) {
              _context4.n = 2;
              break;
            }
            updateCartQuantity(id, newQuantity);
            return _context4.a(2);
          case 2:
            _context4.p = 2;
            _context4.n = 3;
            return (0,_api_cart__WEBPACK_IMPORTED_MODULE_3__.updateCartItem)(id, {
              quantity: newQuantity
            });
          case 3:
            updateCartQuantity(id, newQuantity);
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t4 = _context4.v;
            console.error('[购物车加数量] 失败，id:', id, 'error:', _t4);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: (_t4 === null || _t4 === void 0 ? void 0 : _t4.message) || '更新失败',
              icon: 'none'
            });
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 4]]);
    }));
    return function (_x4, _x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }(), [updateCartQuantity, isTempCartId]);
  var handleSelectAll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    selectAllCartItems(!allSelected);
  }, [selectAllCartItems, allSelected]);
  var handleProductClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId)
    });
  }, []);
  var handleToggleItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    toggleCartItem(id);
  }, [toggleCartItem]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].cartPage,
    children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyState,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
        children: "\u52A0\u8F7D\u4E2D..."
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].cartHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].cartTitle,
          children: "\u8D2D\u7269\u8F66"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].editBtn,
          onClick: function onClick() {
            return setIsEditing(!isEditing);
          },
          children: isEditing ? '完成' : '编辑'
        })]
      }), cartItems.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyState,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].emptyText,
          children: "\u8D2D\u7269\u8F66\u662F\u7A7A\u7684"
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.ScrollView, {
          scrollY: true,
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].cartList,
          enhanced: true,
          showScrollbar: false,
          children: cartItems.map(function (item) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(CartItemComponent, {
              item: item,
              isEditing: isEditing,
              onSelect: handleToggleItem,
              onDecrease: decreaseQuantity,
              onIncrease: increaseQuantity,
              onDelete: handleDelete,
              onProductClick: handleProductClick
            }, item.id);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].bottomBar,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectAll,
            onClick: handleSelectAll,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectAllBtn, " ").concat(allSelected ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selected : '')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].selectAllText,
              children: "\u5168\u9009"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].totalInfo,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].totalAmount,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountLabel,
                children: "\u5408\u8BA1:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].amountValue,
                children: ["\xA5", totalAmount]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].checkoutBtn, " ").concat(selectedCount === 0 ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].disabled : ''),
              onClick: goCheckout,
              children: ["\u7ED3\u7B97(", selectedCount, ")"]
            })]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(CartPage));

/***/ }),

/***/ "./src/pages/cart/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/cart/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/index!./src/pages/cart/index.tsx");


var config = {"navigationBarTitleText":"购物车","enablePullDownRefresh":false};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/cart/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_cart_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/cart/cart.module.scss":
/*!******************************************!*\
  !*** ./src/styles/cart/cart.module.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"cartPage":"cart-module__cartPage___HCzng","cartHeader":"cart-module__cartHeader___EYOr2","cartTitle":"cart-module__cartTitle___TQcME","editBtn":"cart-module__editBtn___ChmU1","cartList":"cart-module__cartList___w3Bkc","cartItem":"cart-module__cartItem___AzeY6","selectBtn":"cart-module__selectBtn___xdaIx","selected":"cart-module__selected___PzsYd","itemImage":"cart-module__itemImage___aF26H","itemInfo":"cart-module__itemInfo___JaMSl","itemName":"cart-module__itemName___c_R4z","itemSpecs":"cart-module__itemSpecs___G52rq","itemBottom":"cart-module__itemBottom___RWn0r","priceWrap":"cart-module__priceWrap___qI9RQ","itemPrice":"cart-module__itemPrice___jTYwD","seckillTag":"cart-module__seckillTag___SgMHC","quantityControl":"cart-module__quantityControl___alEVY","quantityBtn":"cart-module__quantityBtn___Dp7fD","disabled":"cart-module__disabled___kKV3T","quantityNum":"cart-module__quantityNum___tmkHu","deleteBtn":"cart-module__deleteBtn___g4rZ1","emptyCart":"cart-module__emptyCart___hDWKt","emptyIcon":"cart-module__emptyIcon___zyUnM","emptyText":"cart-module__emptyText___GpwRM","goShoppingBtn":"cart-module__goShoppingBtn___NQIci","emptyState":"cart-module__emptyState___P6XgL","bottomBar":"cart-module__bottomBar___Np90G","selectAll":"cart-module__selectAll___JjrJT","selectAllBtn":"cart-module__selectAllBtn___QsAVy","selectAllText":"cart-module__selectAllText___nVuis","totalInfo":"cart-module__totalInfo___oIboZ","totalAmount":"cart-module__totalAmount___guuCo","amountLabel":"cart-module__amountLabel___Ejc36","amountValue":"cart-module__amountValue___NIIcm","checkoutBtn":"cart-module__checkoutBtn____bGI7"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map