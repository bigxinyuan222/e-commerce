"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/common */ "./src/api/common/index.ts");
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _api_seckill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/seckill */ "./src/api/seckill/index.ts");
/* harmony import */ var _data_common_home__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/data/common/home */ "./src/data/common/home.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _utils_categoryIcons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/categoryIcons */ "./src/utils/categoryIcons.ts");
/* harmony import */ var _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/styles/home/home.module.scss */ "./src/styles/home/home.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");
















var ProductCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var _product$images, _product$tags;
  var product = _ref.product,
    _onClick = _ref.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productCard,
    onClick: function onClick() {
      return _onClick(product.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
      src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.getImageUrl)(((_product$images = product.images) === null || _product$images === void 0 ? void 0 : _product$images[0]) || product.image),
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productImage,
      mode: "aspectFill"
    }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productName,
        children: product.name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productTags,
        children: (_product$tags = product.tags) === null || _product$tags === void 0 ? void 0 : _product$tags.slice(0, 1).map(function (tag) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].tag,
            children: tag
          }, tag);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productPrice,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].priceSymbol,
          children: "\xA5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].currentPrice,
          children: product.price
        }), product.originalPrice > 0 && product.originalPrice !== product.price && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].originalPrice,
          children: product.originalPrice
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].salesInfo,
        children: ["\u5DF2\u552E ", product.sales || 0, " \u4EF6"]
      })]
    })]
  });
});
var BrandCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var brand = _ref2.brand,
    _onClick2 = _ref2.onClick;
  var iconSrc = (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.getBrandIcon)(brand);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandItem,
    onClick: function onClick() {
      return _onClick2(brand.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandIconWrap,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, {
        src: iconSrc,
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandIconImg,
        mode: "aspectFit"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandName,
      children: brand.name
    })]
  }, brand.id);
});
var SeckillProductCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref3) {
  var _product$images2;
  var product = _ref3.product,
    _onClick3 = _ref3.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillProduct,
    onClick: function onClick() {
      return _onClick3(product.productId || product.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
      src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.getImageUrl)(product.image || ((_product$images2 = product.images) === null || _product$images2 === void 0 ? void 0 : _product$images2[0])),
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productImage,
      mode: "aspectFill"
    }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillPriceArea,
      children: [(product.seckillPrice || product.price) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillPrice,
        children: product.seckillPrice || product.price
      }), product.originalPrice > 0 && product.originalPrice !== (product.seckillPrice || product.price) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].originalPrice,
        children: product.originalPrice
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillBtn,
      children: "\u62A2"
    })]
  });
});
var CategoryNavItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref4) {
  var category = _ref4.category,
    _onClick4 = _ref4.onClick;
  var iconSrc = (0,_utils_categoryIcons__WEBPACK_IMPORTED_MODULE_7__.getCategoryIcon)(category.name, category.icon);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].categoryItem,
    onClick: function onClick() {
      return _onClick4(category.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].categoryIcon,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, {
        src: iconSrc,
        mode: "aspectFit",
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].categoryIconImg
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].categoryName,
      children: category.name
    })]
  });
});
var recommendTabs = [{
  key: 'recommend',
  label: '精选'
}, {
  key: 'new',
  label: '新品'
}, {
  key: 'special',
  label: '特惠'
}, {
  key: 'digital',
  label: '数码'
}, {
  key: 'fashion',
  label: '服饰'
}];
var tabToSlotName = {
  recommend: '热门推荐',
  new: '新品上架',
  special: '特惠',
  digital: '数码',
  fashion: '服饰'
};

/**
 * 规范化推荐商品字段（兼容 camelCase / PascalCase / snake_case）
 */
function normalizeRecommendProduct(item) {
  var _ref5, _ref6, _ref7, _item$id, _ref8, _ref9, _ref0, _item$name, _ref1, _ref10, _ref11, _item$price, _ref12, _ref13, _ref14, _item$originalPrice, _ref15, _ref16, _ref17, _item$images, _ref18, _ref19, _ref20, _item$image, _ref21, _ref22, _ref23, _item$sales, _ref24, _ref25, _item$tags;
  if (!item) return null;
  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, item), {}, {
    id: (_ref5 = (_ref6 = (_ref7 = (_item$id = item.id) !== null && _item$id !== void 0 ? _item$id : item.ID) !== null && _ref7 !== void 0 ? _ref7 : item.productId) !== null && _ref6 !== void 0 ? _ref6 : item.ProductId) !== null && _ref5 !== void 0 ? _ref5 : '',
    name: (_ref8 = (_ref9 = (_ref0 = (_item$name = item.name) !== null && _item$name !== void 0 ? _item$name : item.Name) !== null && _ref0 !== void 0 ? _ref0 : item.productName) !== null && _ref9 !== void 0 ? _ref9 : item.ProductName) !== null && _ref8 !== void 0 ? _ref8 : '',
    price: (_ref1 = (_ref10 = (_ref11 = (_item$price = item.price) !== null && _item$price !== void 0 ? _item$price : item.Price) !== null && _ref11 !== void 0 ? _ref11 : item.salePrice) !== null && _ref10 !== void 0 ? _ref10 : item.SalePrice) !== null && _ref1 !== void 0 ? _ref1 : 0,
    originalPrice: (_ref12 = (_ref13 = (_ref14 = (_item$originalPrice = item.originalPrice) !== null && _item$originalPrice !== void 0 ? _item$originalPrice : item.OriginalPrice) !== null && _ref14 !== void 0 ? _ref14 : item.marketPrice) !== null && _ref13 !== void 0 ? _ref13 : item.MarketPrice) !== null && _ref12 !== void 0 ? _ref12 : 0,
    images: (_ref15 = (_ref16 = (_ref17 = (_item$images = item.images) !== null && _item$images !== void 0 ? _item$images : item.Images) !== null && _ref17 !== void 0 ? _ref17 : item.imageList) !== null && _ref16 !== void 0 ? _ref16 : item.ImageList) !== null && _ref15 !== void 0 ? _ref15 : [],
    image: (_ref18 = (_ref19 = (_ref20 = (_item$image = item.image) !== null && _item$image !== void 0 ? _item$image : item.Image) !== null && _ref20 !== void 0 ? _ref20 : item.cover) !== null && _ref19 !== void 0 ? _ref19 : item.Cover) !== null && _ref18 !== void 0 ? _ref18 : '',
    sales: (_ref21 = (_ref22 = (_ref23 = (_item$sales = item.sales) !== null && _item$sales !== void 0 ? _item$sales : item.Sales) !== null && _ref23 !== void 0 ? _ref23 : item.soldCount) !== null && _ref22 !== void 0 ? _ref22 : item.SoldCount) !== null && _ref21 !== void 0 ? _ref21 : 0,
    tags: (_ref24 = (_ref25 = (_item$tags = item.tags) !== null && _item$tags !== void 0 ? _item$tags : item.Tags) !== null && _ref25 !== void 0 ? _ref25 : item.tagList) !== null && _ref24 !== void 0 ? _ref24 : []
  });
}
function extractRecommendProducts(data, tabKey) {
  var _slots$;
  if (!data) return [];
  var slots = Array.isArray(data) ? data : (data === null || data === void 0 ? void 0 : data.list) || (data === null || data === void 0 ? void 0 : data.data) || (data === null || data === void 0 ? void 0 : data.slots) || [];
  if (slots.length === 0) return [];

  // 推荐位结构：每项包含 name + products
  if ((_slots$ = slots[0]) !== null && _slots$ !== void 0 && _slots$.products && Array.isArray(slots[0].products)) {
    var targetName = tabToSlotName[tabKey];
    var rawProducts = [];
    if (targetName) {
      var matchedSlot = slots.find(function (s) {
        return s.name && s.name === targetName || s.Name && s.Name === targetName || s.slotName && s.slotName === targetName || s.title && s.title === targetName || s.key && s.key === tabKey || s.type && s.type === tabKey;
      });
      if (matchedSlot !== null && matchedSlot !== void 0 && matchedSlot.products) {
        rawProducts = matchedSlot.products;
      }
    }
    // 找不到对应 slot 时，返回第一个推荐位的商品兜底
    if (!rawProducts.length) {
      var _slots$2;
      rawProducts = ((_slots$2 = slots[0]) === null || _slots$2 === void 0 ? void 0 : _slots$2.products) || [];
    }
    return rawProducts.map(normalizeRecommendProduct).filter(Boolean);
  }

  // 如果 slots 本身就是商品列表，也做字段规范化
  return slots.map(normalizeRecommendProduct).filter(Boolean);
}
function extractAllRecommendSlots(data) {
  if (!data) return [];
  return Array.isArray(data) ? data : (data === null || data === void 0 ? void 0 : data.list) || (data === null || data === void 0 ? void 0 : data.data) || (data === null || data === void 0 ? void 0 : data.slots) || [];
}

/**
 * 推荐位商品仅返回 productId（thin reference 契约），
 * 需批量调用 /product/detail 补全商品详情后合并回推荐位。
 */
function enrichRecommendSlots(_x) {
  return _enrichRecommendSlots.apply(this, arguments);
}
function _enrichRecommendSlots() {
  _enrichRecommendSlots = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee3(slots) {
    var productIdsToFetch, slotProductIndexMap, detailResults, detailMap, enrichedSlots;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (!(!slots || slots.length === 0)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, slots);
        case 1:
          // 收集所有需要补全的 productId（跳过已有完整信息的商品）
          productIdsToFetch = [];
          slotProductIndexMap = [];
          slots.forEach(function (slot, sIdx) {
            if (!slot.products || !Array.isArray(slot.products)) return;
            slot.products.forEach(function (p, pIdx) {
              var _ref60, _ref61, _p$productId;
              var pid = (_ref60 = (_ref61 = (_p$productId = p.productId) !== null && _p$productId !== void 0 ? _p$productId : p.ProductId) !== null && _ref61 !== void 0 ? _ref61 : p.product_id) !== null && _ref60 !== void 0 ? _ref60 : p.ID;
              // 已有 name 和 images 的商品无需再查
              if (pid && (!p.name || !p.images && !p.image)) {
                productIdsToFetch.push(pid);
                slotProductIndexMap.push({
                  slotIdx: sIdx,
                  productIdx: pIdx,
                  productId: pid
                });
              }
            });
          });
          if (!(productIdsToFetch.length === 0)) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, slots);
        case 2:
          _context3.n = 3;
          return Promise.all((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_14__["default"])(new Set(productIdsToFetch)).map(function (pid) {
            return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.productApi.detail, {
              id: pid
            }, {}, true).then(function (res) {
              return {
                pid: pid,
                data: (res === null || res === void 0 ? void 0 : res.data) || null
              };
            }).catch(function () {
              return {
                pid: pid,
                data: null
              };
            });
          }));
        case 3:
          detailResults = _context3.v;
          // 构建 productId -> 商品详情 映射
          detailMap = new Map();
          detailResults.forEach(function (_ref62) {
            var pid = _ref62.pid,
              data = _ref62.data;
            if (data) detailMap.set(pid, data);
          });

          // 将详情合并回 slots（保留原始 productId 字段）
          enrichedSlots = slots.map(function (slot) {
            return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, slot), {}, {
              products: (slot.products || []).map(function (p) {
                var _ref63, _ref64, _p$productId2, _detail$id, _detail$name, _detail$price, _ref65, _detail$originalPrice, _ref66, _detail$image, _detail$images, _detail$sales;
                var pid = (_ref63 = (_ref64 = (_p$productId2 = p.productId) !== null && _p$productId2 !== void 0 ? _p$productId2 : p.ProductId) !== null && _ref64 !== void 0 ? _ref64 : p.product_id) !== null && _ref63 !== void 0 ? _ref63 : p.ID;
                var detail = detailMap.get(pid);
                if (!detail) return normalizeRecommendProduct(p);
                return normalizeRecommendProduct((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({}, p), detail), {}, {
                  id: (_detail$id = detail.id) !== null && _detail$id !== void 0 ? _detail$id : pid,
                  name: (_detail$name = detail.name) !== null && _detail$name !== void 0 ? _detail$name : '',
                  price: (_detail$price = detail.price) !== null && _detail$price !== void 0 ? _detail$price : 0,
                  originalPrice: (_ref65 = (_detail$originalPrice = detail.originalPrice) !== null && _detail$originalPrice !== void 0 ? _detail$originalPrice : detail.marketPrice) !== null && _ref65 !== void 0 ? _ref65 : 0,
                  images: detail.images || [],
                  image: (_ref66 = (_detail$image = detail.image) !== null && _detail$image !== void 0 ? _detail$image : (_detail$images = detail.images) === null || _detail$images === void 0 ? void 0 : _detail$images[0]) !== null && _ref66 !== void 0 ? _ref66 : '',
                  sales: (_detail$sales = detail.sales) !== null && _detail$sales !== void 0 ? _detail$sales : 0
                }));
              })
            });
          });
          return _context3.a(2, enrichedSlots);
      }
    }, _callee3);
  }));
  return _enrichRecommendSlots.apply(this, arguments);
}
var HomePage = function HomePage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('recommend'),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      hours: '00',
      minutes: '00',
      seconds: '00'
    }),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState3, 2),
    countdown = _useState4[0],
    setCountdown = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState5, 2),
    banners = _useState6[0],
    setBanners = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState7, 2),
    categories = _useState8[0],
    setCategories = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      products: [],
      endTime: ''
    }),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState9, 2),
    seckillActivity = _useState0[0],
    setSeckillActivity = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState1, 2),
    hotBrands = _useState10[0],
    setHotBrands = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState11, 2),
    recommendedProducts = _useState12[0],
    setRecommendedProducts = _useState12[1];
  // 推荐位原始数据缓存（新接口返回推荐位+商品结构，切换tab时无需重复请求）
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState14 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState13, 2),
    recommendSlotsCache = _useState14[0],
    setRecommendSlotsCache = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState16 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_useState15, 2),
    loading = _useState16[0],
    setLoading = _useState16[1];
  var timerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var goToSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/home/search/index'
    });
  }, []);
  var goToProductDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId)
    });
  }, []);
  var goToSeckill = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/home/seckill/index'
    });
  }, []);

  // 秒杀商品点击：携带活动ID与秒杀标识进入详情页
  var goToSeckillProductDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    var activityId = seckillActivity.id || '';
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId, "&seckill=1").concat(activityId ? "&activityId=".concat(activityId) : '')
    });
  }, [seckillActivity.id]);
  var goToCategory = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (categoryId) {
    if (categoryId) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync('targetCategoryId', categoryId);
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().removeStorageSync('targetCategoryId');
    }
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
      url: '/pages/category/index'
    });
  }, []);
  var goToBrands = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: '/pages/home/brands/index'
    });
  }, []);
  var goToBrandDetail = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (brandId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/brand-detail/index?id=".concat(brandId)
    });
  }, []);

  // 加载首页数据
  var loadData = /*#__PURE__*/function () {
    var _ref26 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee() {
      var _yield$Promise$all, _yield$Promise$all2, bannerRes, categoryRes, seckillRes, brandRes, recommendRes, _bannerRes$data, _bannerRes$data2, _bannerRes$data3, rawBanners, normalized, _categoryRes$data, _categoryRes$data2, rawData, catData, seckillData, _brandRes$data, _brandRes$data2, _rawData, _normalized, _enrichedSlots$, rawSlots, enrichedSlots, productData, _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setLoading(true);
            _context.p = 1;
            _context.n = 2;
            return Promise.all([(0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.homeApi.banners).catch(function () {
              return null;
            }), (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.categoryApi.categoryTree).catch(function () {
              return null;
            }), (0,_api_seckill__WEBPACK_IMPORTED_MODULE_4__.fetchSeckillActivities)({
              status: 'active'
            }).catch(function () {
              return null;
            }), (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.brandApi.brandTree).catch(function () {
              return null;
            }), (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.homeApi.recommendations).catch(function () {
              return null;
            })]);
          case 2:
            _yield$Promise$all = _context.v;
            _yield$Promise$all2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_15__["default"])(_yield$Promise$all, 5);
            bannerRes = _yield$Promise$all2[0];
            categoryRes = _yield$Promise$all2[1];
            seckillRes = _yield$Promise$all2[2];
            brandRes = _yield$Promise$all2[3];
            recommendRes = _yield$Promise$all2[4];
            if (bannerRes !== null && bannerRes !== void 0 && bannerRes.data) {
              rawBanners = Array.isArray(bannerRes.data) ? bannerRes.data : ((_bannerRes$data = bannerRes.data) === null || _bannerRes$data === void 0 ? void 0 : _bannerRes$data.list) || ((_bannerRes$data2 = bannerRes.data) === null || _bannerRes$data2 === void 0 ? void 0 : _bannerRes$data2.data) || ((_bannerRes$data3 = bannerRes.data) === null || _bannerRes$data3 === void 0 ? void 0 : _bannerRes$data3.banners) || [];
              normalized = rawBanners.map(function (item) {
                var _ref27, _ref28, _item$id2, _ref29, _ref30, _ref31, _ref32, _ref33, _item$image2, _ref34, _ref35, _item$type, _ref36, _ref37, _ref38, _item$targetId;
                return {
                  id: (_ref27 = (_ref28 = (_item$id2 = item.id) !== null && _item$id2 !== void 0 ? _item$id2 : item.ID) !== null && _ref28 !== void 0 ? _ref28 : item.bannerId) !== null && _ref27 !== void 0 ? _ref27 : String(Math.random()),
                  image: (_ref29 = (_ref30 = (_ref31 = (_ref32 = (_ref33 = (_item$image2 = item.image) !== null && _item$image2 !== void 0 ? _item$image2 : item.Image) !== null && _ref33 !== void 0 ? _ref33 : item.imageUrl) !== null && _ref32 !== void 0 ? _ref32 : item.ImageUrl) !== null && _ref31 !== void 0 ? _ref31 : item.pic) !== null && _ref30 !== void 0 ? _ref30 : item.Pic) !== null && _ref29 !== void 0 ? _ref29 : '',
                  type: (_ref34 = (_ref35 = (_item$type = item.type) !== null && _item$type !== void 0 ? _item$type : item.Type) !== null && _ref35 !== void 0 ? _ref35 : item.linkType) !== null && _ref34 !== void 0 ? _ref34 : '',
                  targetId: (_ref36 = (_ref37 = (_ref38 = (_item$targetId = item.targetId) !== null && _item$targetId !== void 0 ? _item$targetId : item.TargetId) !== null && _ref38 !== void 0 ? _ref38 : item.productId) !== null && _ref37 !== void 0 ? _ref37 : item.linkId) !== null && _ref36 !== void 0 ? _ref36 : ''
                };
              });
              setBanners(normalized);
            }
            if (categoryRes !== null && categoryRes !== void 0 && categoryRes.data) {
              rawData = Array.isArray(categoryRes.data) ? categoryRes.data : ((_categoryRes$data = categoryRes.data) === null || _categoryRes$data === void 0 ? void 0 : _categoryRes$data.list) || ((_categoryRes$data2 = categoryRes.data) === null || _categoryRes$data2 === void 0 ? void 0 : _categoryRes$data2.data) || [];
              catData = rawData.map(function (item) {
                var _ref39, _ref40, _item$id3, _ref41, _ref42, _item$name2, _ref43, _ref44, _ref45, _item$icon;
                return {
                  id: (_ref39 = (_ref40 = (_item$id3 = item.id) !== null && _item$id3 !== void 0 ? _item$id3 : item.ID) !== null && _ref40 !== void 0 ? _ref40 : item.categoryId) !== null && _ref39 !== void 0 ? _ref39 : '',
                  name: (_ref41 = (_ref42 = (_item$name2 = item.name) !== null && _item$name2 !== void 0 ? _item$name2 : item.Name) !== null && _ref42 !== void 0 ? _ref42 : item.categoryName) !== null && _ref41 !== void 0 ? _ref41 : '',
                  icon: (_ref43 = (_ref44 = (_ref45 = (_item$icon = item.icon) !== null && _item$icon !== void 0 ? _item$icon : item.Icon) !== null && _ref45 !== void 0 ? _ref45 : item.image) !== null && _ref44 !== void 0 ? _ref44 : item.Image) !== null && _ref43 !== void 0 ? _ref43 : ''
                };
              });
              setCategories(catData.slice(0, 8));
            }
            if (seckillRes !== null && seckillRes !== void 0 && seckillRes.data && Array.isArray(seckillRes.data) && seckillRes.data.length > 0) {
              // 接口返回有效活动，取第一个展示
              seckillData = seckillRes.data[0];
              setSeckillActivity({
                id: seckillData.id || '',
                products: seckillData.products || [],
                endTime: seckillData.endTime || new Date(Date.now() + 3600000).toISOString()
              });
            } else {
              // 接口无活动数据，使用本地 mock 兜底，保证首页秒杀板块始终展示
              setSeckillActivity({
                id: _data_common_home__WEBPACK_IMPORTED_MODULE_5__.seckillActivity.id || '',
                products: _data_common_home__WEBPACK_IMPORTED_MODULE_5__.seckillActivity.products || [],
                endTime: _data_common_home__WEBPACK_IMPORTED_MODULE_5__.seckillActivity.endTime || new Date(Date.now() + 3600000).toISOString()
              });
            }
            if (brandRes !== null && brandRes !== void 0 && brandRes.data) {
              // 品牌树返回数据规范化：兼容多字段命名，过滤占位符 logo
              _rawData = Array.isArray(brandRes.data) ? brandRes.data : ((_brandRes$data = brandRes.data) === null || _brandRes$data === void 0 ? void 0 : _brandRes$data.list) || ((_brandRes$data2 = brandRes.data) === null || _brandRes$data2 === void 0 ? void 0 : _brandRes$data2.data) || [];
              _normalized = _rawData.map(function (item) {
                var _ref46, _ref47, _ref48, _ref49, _ref50, _item$id4, _ref51, _ref52, _ref53, _item$name3, _ref54, _ref55, _ref56, _ref57, _ref58, _item$logo;
                var id = (_ref46 = (_ref47 = (_ref48 = (_ref49 = (_ref50 = (_item$id4 = item.id) !== null && _item$id4 !== void 0 ? _item$id4 : item.ID) !== null && _ref50 !== void 0 ? _ref50 : item.brandId) !== null && _ref49 !== void 0 ? _ref49 : item.BrandId) !== null && _ref48 !== void 0 ? _ref48 : item.code) !== null && _ref47 !== void 0 ? _ref47 : item.Code) !== null && _ref46 !== void 0 ? _ref46 : '';
                var name = (_ref51 = (_ref52 = (_ref53 = (_item$name3 = item.name) !== null && _item$name3 !== void 0 ? _item$name3 : item.Name) !== null && _ref53 !== void 0 ? _ref53 : item.brandName) !== null && _ref52 !== void 0 ? _ref52 : item.BrandName) !== null && _ref51 !== void 0 ? _ref51 : '';
                var logo = (_ref54 = (_ref55 = (_ref56 = (_ref57 = (_ref58 = (_item$logo = item.logo) !== null && _item$logo !== void 0 ? _item$logo : item.Logo) !== null && _ref58 !== void 0 ? _ref58 : item.icon) !== null && _ref57 !== void 0 ? _ref57 : item.Icon) !== null && _ref56 !== void 0 ? _ref56 : item.image) !== null && _ref55 !== void 0 ? _ref55 : item.Image) !== null && _ref54 !== void 0 ? _ref54 : '';
                return {
                  id: String(id),
                  name: name,
                  logo: (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.getImageUrl)(logo)
                };
              }).filter(function (b) {
                return b.id && b.name;
              });
              setHotBrands(_normalized.slice(0, 10));
            }
            if (!(recommendRes !== null && recommendRes !== void 0 && recommendRes.data)) {
              _context.n = 4;
              break;
            }
            // 推荐位接口返回 thin reference（仅 productId），需批量补全商品详情
            rawSlots = extractAllRecommendSlots(recommendRes.data);
            _context.n = 3;
            return enrichRecommendSlots(rawSlots);
          case 3:
            enrichedSlots = _context.v;
            // 缓存补全后的推荐位数据，后续 tab 切换可直接使用
            if (enrichedSlots.length > 0 && (_enrichedSlots$ = enrichedSlots[0]) !== null && _enrichedSlots$ !== void 0 && _enrichedSlots$.products) {
              setRecommendSlotsCache(enrichedSlots);
            }
            productData = extractRecommendProducts(enrichedSlots, 'recommend');
            setRecommendedProducts((0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.normalizeProductListImages)(productData));
          case 4:
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            console.error('Failed to load home data:', _t);
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '加载失败，下拉刷新',
              icon: 'none'
            });
          case 6:
            _context.p = 6;
            setLoading(false);
            return _context.f(6);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[1, 5, 6, 7]]);
    }));
    return function loadData() {
      return _ref26.apply(this, arguments);
    };
  }();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadData();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var loadRecommendProducts = /*#__PURE__*/function () {
      var _ref59 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_12__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().m(function _callee2() {
        var productData, res, _productData, _t2;
        return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_13__["default"])().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              if (!(recommendSlotsCache && recommendSlotsCache.length > 0)) {
                _context2.n = 1;
                break;
              }
              productData = extractRecommendProducts(recommendSlotsCache, activeTab);
              setRecommendedProducts((0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.normalizeProductListImages)(productData));
              return _context2.a(2);
            case 1:
              if (!(activeTab === 'recommend')) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              _context2.n = 3;
              return (0,_api_common__WEBPACK_IMPORTED_MODULE_2__.apiGet)(_api_home__WEBPACK_IMPORTED_MODULE_3__.homeApi.recommendations, {
                type: activeTab
              });
            case 3:
              res = _context2.v;
              if (res !== null && res !== void 0 && res.data) {
                _productData = extractRecommendProducts(res.data, activeTab);
                setRecommendedProducts((0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.normalizeProductListImages)(_productData));
              }
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              console.error('Failed to load recommendations:', _t2);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 4]]);
      }));
      return function loadRecommendProducts() {
        return _ref59.apply(this, arguments);
      };
    }();
    loadRecommendProducts();
  }, [activeTab, recommendSlotsCache]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!seckillActivity.endTime) return;
    var endTime = new Date(seckillActivity.endTime).getTime();
    var calculateCountdown = function calculateCountdown() {
      var now = Date.now();
      var diff = endTime - now;
      if (diff > 0) {
        var hours = Math.floor(diff / (1000 * 60 * 60));
        var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
        var seconds = Math.floor(diff % (1000 * 60) / 1000);
        setCountdown({
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    };
    calculateCountdown();
    timerRef.current = setInterval(calculateCountdown, 1000);
    return function () {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [seckillActivity.endTime]);
  var displayCategories = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return categories.slice(0, 8);
  }, [categories]);
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].homePage,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        style: {
          padding: '200rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          children: "\u52A0\u8F7D\u4E2D..."
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].homePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].header,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].searchBox,
        onClick: goToSearch,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].searchText,
          children: "\u641C\u7D22\u5546\u54C1/\u5E97\u94FA"
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.ScrollView, {
      scrollY: true,
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].content,
      enhanced: true,
      showScrollbar: false,
      children: [banners.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].banner,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Swiper, {
          autoplay: banners.length > 1,
          interval: 3000,
          circular: banners.length > 1,
          indicatorColor: "rgba(255,255,255,0.5)",
          indicatorActiveColor: "#ffffff",
          children: banners.map(function (banner) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.SwiperItem, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_11__["default"])({
                src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.getImageUrl)(banner.image || banner.imageUrl),
                mode: "aspectFill"
              }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_6__.lazyImgProps)()), {}, {
                onClick: function onClick() {
                  if (banner.type === 'seckill') {
                    goToSeckill();
                  } else if (banner.type === 'product') {
                    goToProductDetail(banner.targetId || '');
                  }
                }
              }))
            }, banner.id);
          })
        })
      }), displayCategories.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].categoryNavWrap,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.ScrollView, {
          scrollX: true,
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].categoryNav,
          showScrollbar: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].categoryNavInner,
            children: displayCategories.map(function (category) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(CategoryNavItem, {
                category: category,
                onClick: goToCategory
              }, category.id);
            })
          })
        })
      }), hotBrands.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandsSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandsHeader,
          onClick: goToBrands,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandsTitleWrap,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandsTitle,
              children: "\u54C1\u724C\u9986"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandsSubtitle,
              children: "\u7CBE\u9009\u54C1\u724C"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandsMore,
            children: "\u66F4\u591A \u203A"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.ScrollView, {
          scrollX: true,
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].brandsList,
          showScrollbar: false,
          children: hotBrands.map(function (brand) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(BrandCard, {
              brand: brand,
              onClick: goToBrandDetail
            }, brand.id);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].activitySection,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillArea,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillHeader,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillTitle,
                children: "\u9650\u65F6\u79D2\u6740"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillSubtitle,
                children: "\u7206\u6B3E\u9650\u65F6\u62A2"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillHeaderRight,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].countdown,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  children: "\u8DDD\u7ED3\u675F"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].countdownItem,
                  children: countdown.hours
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  children: ":"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].countdownItem,
                  children: countdown.minutes
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  children: ":"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].countdownItem,
                  children: countdown.seconds
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillArrow,
                onClick: goToSeckill,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].arrowIcon,
                  children: "\u203A"
                })
              })]
            })]
          }), seckillActivity.products.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.ScrollView, {
            scrollX: true,
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillProducts,
            showScrollbar: false,
            children: seckillActivity.products.map(function (product) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(SeckillProductCard, {
                product: product,
                onClick: goToSeckillProductDetail
              }, product.id || product.productId);
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillEmpty,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
              className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].seckillEmptyText,
              children: "\u6682\u65E0\u79D2\u6740\u5546\u54C1"
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendLine
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendTitle,
            children: "\u7CBE\u9009\u63A8\u8350"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendLine
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendTabs,
          children: recommendTabs.map(function (tab) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
              className: "".concat(_styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendTab, " ").concat(activeTab === tab.key ? _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendTabActive : ''),
              onClick: function onClick() {
                return setActiveTab(tab.key);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].recommendTabText,
                children: tab.label
              })
            }, tab.key);
          })
        }), recommendedProducts.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_8__["default"].productGrid,
          children: recommendedProducts.map(function (product) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(ProductCard, {
              product: product,
              onClick: goToProductDetail
            }, product.id);
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.View, {
          style: {
            padding: '60rpx',
            textAlign: 'center',
            color: '#999'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_10__.Text, {
            children: "\u8BE5\u5206\u7C7B\u6682\u65E0\u5546\u54C1"
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(HomePage));

/***/ }),

/***/ "./src/pages/home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/home/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx");


var config = {"navigationBarTitleText":"乐享购","enablePullDownRefresh":true,"backgroundTextStyle":"dark"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/home.module.scss":
/*!******************************************!*\
  !*** ./src/styles/home/home.module.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"homePage":"home-module__homePage___gpLL9","header":"home-module__header___hFd8x","searchBox":"home-module__searchBox___tBwm_","searchIcon":"home-module__searchIcon___DtY81","searchText":"home-module__searchText___ShVt0","content":"home-module__content___qfPqY","banner":"home-module__banner___W3u6h","swiper-pagination-bullet":"home-module__swiper-pagination-bullet___AoOKz","swiper-pagination-bullet-active":"home-module__swiper-pagination-bullet-active___Kadu6","categoryNavWrap":"home-module__categoryNavWrap___oGT3B","categoryNav":"home-module__categoryNav___TdagT","categoryNavInner":"home-module__categoryNavInner___L9meQ","categoryItem":"home-module__categoryItem___zQ8_l","categoryIcon":"home-module__categoryIcon___k7xtB","categoryIconImg":"home-module__categoryIconImg___ADAxe","categoryName":"home-module__categoryName___GEBF1","brandsSection":"home-module__brandsSection___Grurl","brandsHeader":"home-module__brandsHeader___dxzwX","brandsTitleWrap":"home-module__brandsTitleWrap___WaPix","brandsTitle":"home-module__brandsTitle___IEVjk","brandsSubtitle":"home-module__brandsSubtitle___xxQ6p","brandsMore":"home-module__brandsMore___yw3oA","brandsList":"home-module__brandsList___AXIDA","brandItem":"home-module__brandItem___syJmF","brandIconWrap":"home-module__brandIconWrap___yl1dx","brandIconImg":"home-module__brandIconImg___FADvF","brandIconSvg":"home-module__brandIconSvg___d96jw","brandName":"home-module__brandName___O0qI2","activitySection":"home-module__activitySection___IQXb7","sectionHeader":"home-module__sectionHeader___oa072","sectionTitle":"home-module__sectionTitle___gKIyo","moreBtn":"home-module__moreBtn___K82WN","seckillArea":"home-module__seckillArea___ju4h7","seckillHeader":"home-module__seckillHeader___dmfWl","seckillTitle":"home-module__seckillTitle___wpEbE","seckillSubtitle":"home-module__seckillSubtitle____WK4I","seckillHeaderRight":"home-module__seckillHeaderRight___lpT1T","countdown":"home-module__countdown___PAWFw","countdownItem":"home-module__countdownItem___pdC59","seckillArrow":"home-module__seckillArrow___ioSEF","arrowIcon":"home-module__arrowIcon___JLbCT","seckillProducts":"home-module__seckillProducts___jUo6K","seckillProduct":"home-module__seckillProduct___NuSZ9","productImage":"home-module__productImage___Fy4mD","seckillPriceArea":"home-module__seckillPriceArea___mAeSm","seckillPrice":"home-module__seckillPrice___bykOz","originalPrice":"home-module__originalPrice___liqTH","seckillBtn":"home-module__seckillBtn___VFtGp","seckillEmpty":"home-module__seckillEmpty___hlaZz","seckillEmptyText":"home-module__seckillEmptyText___FBixm","recommendSection":"home-module__recommendSection___iVE2E","recommendHeader":"home-module__recommendHeader___Lqvnh","recommendLine":"home-module__recommendLine___gPiLo","recommendTitle":"home-module__recommendTitle___HZCoN","recommendTabs":"home-module__recommendTabs___uCz1H","recommendTab":"home-module__recommendTab___xHvWY","recommendTabText":"home-module__recommendTabText___vqO55","recommendTabActive":"home-module__recommendTabActive___Noz3_","productGrid":"home-module__productGrid___vabQw","productCard":"home-module__productCard___eqvIf","productInfo":"home-module__productInfo___xYtl8","productName":"home-module__productName___PqOUU","productTags":"home-module__productTags___aFFOA","tag":"home-module__tag___JDC0z","productPrice":"home-module__productPrice___O2MUC","priceSymbol":"home-module__priceSymbol___Orfad","currentPrice":"home-module__currentPrice___Kk_mK","salesInfo":"home-module__salesInfo___dMMqr"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map