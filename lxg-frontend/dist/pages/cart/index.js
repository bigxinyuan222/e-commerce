"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/cart/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/index!./src/pages/cart/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/cart/index!./src/pages/cart/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/AppContext */ "./src/store/AppContext.tsx");
/* harmony import */ var _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/cart/cart.module.scss */ "./src/styles/cart/cart.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");







// 购物车商品项组件

var CartItemComponent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var item = _ref.item,
    isEditing = _ref.isEditing,
    onSelect = _ref.onSelect,
    onDecrease = _ref.onDecrease,
    onIncrease = _ref.onIncrease,
    onDelete = _ref.onDelete,
    onProductClick = _ref.onProductClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].cartItem,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selectBtn, " ").concat(item.selected ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selected : ''),
      onClick: function onClick() {
        return onSelect(item.id);
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Image, {
      src: item.image,
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemImage,
      mode: "aspectFill",
      lazyLoad: true,
      onClick: function onClick() {
        return onProductClick(item.productId);
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemName,
        children: item.productName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemSpecs,
        children: item.skuName
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemBottom,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].priceWrap,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].itemPrice,
            children: item.price
          }), item.isSeckill && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].seckillTag,
            children: "\u79D2\u6740\u4EF7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].quantityControl,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
            className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].quantityBtn, " ").concat(item.quantity <= 1 ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].disabled : ''),
            onClick: function onClick() {
              return onDecrease(item.id, item.quantity);
            },
            children: "-"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].quantityNum,
            children: item.quantity
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].quantityBtn,
            onClick: function onClick() {
              return onIncrease(item.id, item.quantity, item.stock);
            },
            children: "+"
          })]
        })]
      })]
    }), isEditing && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].deleteBtn,
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
    removeFromCart = _useAppContext.removeFromCart,
    updateCartQuantity = _useAppContext.updateCartQuantity,
    toggleCartItem = _useAppContext.toggleCartItem,
    selectAllCartItems = _useAppContext.selectAllCartItems,
    getCartTotal = _useAppContext.getCartTotal;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    isEditing = _useState2[0],
    setIsEditing = _useState2[1];

  // 使用 useMemo 缓存计算结果
  var cartTotal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return getCartTotal();
  }, [getCartTotal]);
  var totalAmount = cartTotal.totalAmount,
    selectedCount = cartTotal.selectedCount;

  // 使用 useMemo 缓存全选状态
  var allSelected = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return cartItems.length > 0 && cartItems.every(function (item) {
      return item.selected;
    });
  }, [cartItems]);

  // 使用 useCallback 缓存事件处理函数
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
  }, [removeFromCart]);
  var decreaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id, quantity) {
    if (quantity > 1) {
      updateCartQuantity(id, quantity - 1);
    }
  }, [updateCartQuantity]);
  var increaseQuantity = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id, quantity, stock) {
    if (quantity < stock) {
      updateCartQuantity(id, quantity + 1);
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '库存不足',
        icon: 'none'
      });
    }
  }, [updateCartQuantity]);
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
    className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].cartPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].cartHeader,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].cartTitle,
        children: "\u8D2D\u7269\u8F66"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].editBtn,
        onClick: function onClick() {
          return setIsEditing(!isEditing);
        },
        children: isEditing ? '完成' : '编辑'
      })]
    }), cartItems.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.ScrollView, {
      scrollY: true,
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].cartList,
      enhanced: true,
      showScrollbar: false,
      children: cartItems.map(function (item) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(CartItemComponent, {
          item: item,
          isEditing: isEditing,
          onSelect: handleToggleItem,
          onDecrease: decreaseQuantity,
          onIncrease: increaseQuantity,
          onDelete: handleDelete,
          onProductClick: handleProductClick
        }, item.id);
      })
    }), cartItems.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
      className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].bottomBar,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selectAll,
        onClick: handleSelectAll,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selectAllBtn, " ").concat(allSelected ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selected : '')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].selectAllText,
          children: "\u5168\u9009"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
        className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].totalInfo,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].totalAmount,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountLabel,
            children: "\u5408\u8BA1:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.Text, {
            className: _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].amountValue,
            children: totalAmount
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__.View, {
          className: "".concat(_styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].checkoutBtn, " ").concat(selectedCount === 0 ? _styles_cart_cart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].disabled : ''),
          onClick: goCheckout,
          children: ["\u7ED3\u7B97(", selectedCount, ")"]
        })]
      })]
    })]
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
/* harmony default export */ __webpack_exports__["default"] = ({"cartPage":"cart-module__cartPage___HCzng","cartHeader":"cart-module__cartHeader___EYOr2","cartTitle":"cart-module__cartTitle___TQcME","editBtn":"cart-module__editBtn___ChmU1","cartList":"cart-module__cartList___w3Bkc","cartItem":"cart-module__cartItem___AzeY6","selectBtn":"cart-module__selectBtn___xdaIx","selected":"cart-module__selected___PzsYd","itemImage":"cart-module__itemImage___aF26H","itemInfo":"cart-module__itemInfo___JaMSl","itemName":"cart-module__itemName___c_R4z","itemSpecs":"cart-module__itemSpecs___G52rq","itemBottom":"cart-module__itemBottom___RWn0r","priceWrap":"cart-module__priceWrap___qI9RQ","itemPrice":"cart-module__itemPrice___jTYwD","seckillTag":"cart-module__seckillTag___SgMHC","quantityControl":"cart-module__quantityControl___alEVY","quantityBtn":"cart-module__quantityBtn___Dp7fD","disabled":"cart-module__disabled___kKV3T","quantityNum":"cart-module__quantityNum___tmkHu","deleteBtn":"cart-module__deleteBtn___g4rZ1","emptyCart":"cart-module__emptyCart___hDWKt","emptyIcon":"cart-module__emptyIcon___zyUnM","emptyText":"cart-module__emptyText___GpwRM","goShoppingBtn":"cart-module__goShoppingBtn___NQIci","bottomBar":"cart-module__bottomBar___Np90G","selectAll":"cart-module__selectAll___JjrJT","selectAllBtn":"cart-module__selectAllBtn___QsAVy","selectAllText":"cart-module__selectAllText___nVuis","totalInfo":"cart-module__totalInfo___oIboZ","totalAmount":"cart-module__totalAmount___guuCo","amountLabel":"cart-module__amountLabel___Ejc36","amountValue":"cart-module__amountValue___NIIcm","checkoutBtn":"cart-module__checkoutBtn____bGI7"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/cart/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map