"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_common_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/data/common/home */ "./src/data/common/home.ts");
/* harmony import */ var _data_product_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/product/products */ "./src/data/product/products.ts");
/* harmony import */ var _data_product_brands__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/data/product/brands */ "./src/data/product/brands.ts");
/* harmony import */ var _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/styles/home/home.module.scss */ "./src/styles/home/home.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");









// 商品卡片组件 - 使用 memo 避免不必要渲染

var ProductCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref) {
  var product = _ref.product,
    _onClick = _ref.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productCard,
    onClick: function onClick() {
      return _onClick(product.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
      src: product.images[0],
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productImage,
      mode: "aspectFill",
      lazyLoad: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productInfo,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productName,
        children: product.name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productTags,
        children: product.tags.slice(0, 1).map(function (tag) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].tag,
            children: tag
          }, tag);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productPrice,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].currentPrice,
          children: product.price
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].originalPrice,
          children: product.originalPrice
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].salesInfo,
        children: ["\u5DF2\u552E ", product.sales, " \u4EF6"]
      })]
    })]
  });
});

// 品牌卡片组件
var BrandCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref2) {
  var brand = _ref2.brand,
    _onClick2 = _ref2.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandItem,
    onClick: function onClick() {
      return _onClick2(brand.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
      src: brand.logo,
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandLogo,
      mode: "aspectFill",
      lazyLoad: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandName,
      children: brand.name
    })]
  }, brand.id);
});

// 秒杀商品组件
var SeckillProductCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref3) {
  var product = _ref3.product,
    _onClick3 = _ref3.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillProduct,
    onClick: function onClick() {
      return _onClick3(product.productId);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productImage,
      style: {
        backgroundImage: "url(".concat(product.image, ")")
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillPriceArea,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillPrice,
        children: product.seckillPrice
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].originalPrice,
        children: product.originalPrice
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillBtn,
      children: "\u62A2"
    })]
  });
});

// 分类导航组件
var CategoryNavItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref4) {
  var category = _ref4.category,
    _onClick4 = _ref4.onClick;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].categoryItem,
    onClick: function onClick() {
      return _onClick4(category.id);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].categoryIcon,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
        src: category.icon,
        mode: "aspectFill",
        lazyLoad: true
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].categoryName,
      children: category.name
    })]
  });
});

// 轮播图组件
var BannerItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(function (_ref5) {
  var banner = _ref5.banner,
    onSeckill = _ref5.onSeckill,
    onProduct = _ref5.onProduct;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.SwiperItem, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Image, {
      src: banner.image,
      mode: "aspectFill",
      lazyLoad: true,
      onClick: function onClick() {
        if (banner.type === 'seckill') {
          onSeckill();
        } else if (banner.type === 'product') {
          onProduct(banner.targetId || '');
        }
      }
    })
  }, banner.id);
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
var HomePage = function HomePage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('recommend'),
    _useState2 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      hours: '00',
      minutes: '00',
      seconds: '00'
    }),
    _useState4 = (0,D_e_commerce_ecommerce_ecommerce_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_8__["default"])(_useState3, 2),
    countdown = _useState4[0],
    setCountdown = _useState4[1];
  var hotBrands = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,_data_product_brands__WEBPACK_IMPORTED_MODULE_4__.getHotBrands)();
  }, []);
  var recommendedProducts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (activeTab === 'recommend') {
      return (0,_data_product_products__WEBPACK_IMPORTED_MODULE_3__.getRecommendedProducts)();
    }
    return (0,_data_product_products__WEBPACK_IMPORTED_MODULE_3__.getProductsByRecommendType)(activeTab);
  }, [activeTab]);

  // 使用 useCallback 缓存事件处理函数
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
  var goToSeckillProduct = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (productId) {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
      url: "/pages/home/detail/index?id=".concat(productId, "&seckill=1")
    });
  }, []);
  var goToCategory = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (categoryId) {
    if (categoryId) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: "/pages/category/index?id=".concat(categoryId)
      });
    } else {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().switchTab({
        url: '/pages/category/index'
      });
    }
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

  // 计算秒杀倒计时 - 使用 useMemo 缓存 endTime
  var endTime = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new Date(_data_common_home__WEBPACK_IMPORTED_MODULE_2__.seckillActivity.endTime).getTime();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
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
      }
    };
    calculateCountdown();
    var timer = setInterval(calculateCountdown, 1000);
    return function () {
      return clearInterval(timer);
    };
  }, [endTime]);

  // 缓存分类数据，只取前8个
  var displayCategories = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return _data_common_home__WEBPACK_IMPORTED_MODULE_2__.categories.slice(0, 8);
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
    className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].homePage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].header,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchBox,
        onClick: goToSearch,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].searchText,
          children: "\u641C\u7D22\u5546\u54C1/\u5E97\u94FA"
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.ScrollView, {
      scrollY: true,
      className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].content,
      enhanced: true,
      showScrollbar: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].banner,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Swiper, {
          autoplay: true,
          interval: 3000,
          circular: true,
          indicatorColor: "rgba(255,255,255,0.5)",
          indicatorActiveColor: "#ffffff",
          children: _data_common_home__WEBPACK_IMPORTED_MODULE_2__.banners.map(function (banner) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BannerItem, {
              banner: banner,
              onSeckill: goToSeckill,
              onProduct: goToProductDetail
            }, banner.id);
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].categoryNav,
        children: displayCategories.map(function (category) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(CategoryNavItem, {
            category: category,
            onClick: goToCategory
          }, category.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsHeader,
          onClick: goToBrands,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsTitleWrap,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsTitle,
              children: "\u54C1\u724C\u9986"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
              className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsSubtitle,
              children: "\u7CBE\u9009\u54C1\u724C"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsMore,
            children: "\u66F4\u591A \u203A"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.ScrollView, {
          scrollX: true,
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].brandsList,
          showScrollbar: false,
          children: hotBrands.map(function (brand) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(BrandCard, {
              brand: brand,
              onClick: goToBrandDetail
            }, brand.id);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].activitySection,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillArea,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillHeader,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillTitle,
                children: "\u9650\u65F6\u79D2\u6740"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillSubtitle,
                children: "\u7206\u6B3E\u9650\u65F6\u62A2"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillHeaderRight,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].countdown,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  children: "\u8DDD\u7ED3\u675F"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].countdownItem,
                  children: countdown.hours
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  children: ":"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].countdownItem,
                  children: countdown.minutes
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  children: ":"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].countdownItem,
                  children: countdown.seconds
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillArrow,
                onClick: goToSeckill,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                  className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].arrowIcon,
                  children: "\u203A"
                })
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].seckillProducts,
            children: _data_common_home__WEBPACK_IMPORTED_MODULE_2__.seckillActivity.products.map(function (product) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(SeckillProductCard, {
                product: product,
                onClick: goToSeckillProduct
              }, product.id);
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
        className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendSection,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendLine
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendTitle,
            children: "\u7CBE\u9009\u63A8\u8350"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
            className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendLine
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendTabs,
          children: recommendTabs.map(function (tab) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
              className: "".concat(_styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendTab, " ").concat(activeTab === tab.key ? _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendTabActive : ''),
              onClick: function onClick() {
                return setActiveTab(tab.key);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].recommendTabText,
                children: tab.label
              })
            }, tab.key);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__.View, {
          className: _styles_home_home_module_scss__WEBPACK_IMPORTED_MODULE_5__["default"].productGrid,
          children: recommendedProducts.map(function (product) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ProductCard, {
              product: product,
              onClick: goToProductDetail
            }, product.id);
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
/* harmony default export */ __webpack_exports__["default"] = ({"homePage":"home-module__homePage___gpLL9","header":"home-module__header___hFd8x","searchBox":"home-module__searchBox___tBwm_","searchIcon":"home-module__searchIcon___DtY81","searchText":"home-module__searchText___ShVt0","content":"home-module__content___qfPqY","banner":"home-module__banner___W3u6h","categoryNav":"home-module__categoryNav___TdagT","categoryItem":"home-module__categoryItem___zQ8_l","categoryIcon":"home-module__categoryIcon___k7xtB","categoryName":"home-module__categoryName___GEBF1","brandsSection":"home-module__brandsSection___Grurl","brandsHeader":"home-module__brandsHeader___dxzwX","brandsTitleWrap":"home-module__brandsTitleWrap___WaPix","brandsTitle":"home-module__brandsTitle___IEVjk","brandsSubtitle":"home-module__brandsSubtitle___xxQ6p","brandsMore":"home-module__brandsMore___yw3oA","brandsList":"home-module__brandsList___AXIDA","brandItem":"home-module__brandItem___syJmF","brandLogo":"home-module__brandLogo____zVHU","brandName":"home-module__brandName___O0qI2","activitySection":"home-module__activitySection___IQXb7","sectionHeader":"home-module__sectionHeader___oa072","sectionTitle":"home-module__sectionTitle___gKIyo","moreBtn":"home-module__moreBtn___K82WN","seckillArea":"home-module__seckillArea___ju4h7","seckillHeader":"home-module__seckillHeader___dmfWl","seckillTitle":"home-module__seckillTitle___wpEbE","seckillSubtitle":"home-module__seckillSubtitle____WK4I","seckillHeaderRight":"home-module__seckillHeaderRight___lpT1T","countdown":"home-module__countdown___PAWFw","countdownItem":"home-module__countdownItem___pdC59","seckillArrow":"home-module__seckillArrow___ioSEF","arrowIcon":"home-module__arrowIcon___JLbCT","seckillProducts":"home-module__seckillProducts___jUo6K","seckillProduct":"home-module__seckillProduct___NuSZ9","productImage":"home-module__productImage___Fy4mD","seckillPriceArea":"home-module__seckillPriceArea___mAeSm","seckillPrice":"home-module__seckillPrice___bykOz","originalPrice":"home-module__originalPrice___liqTH","seckillBtn":"home-module__seckillBtn___VFtGp","recommendSection":"home-module__recommendSection___iVE2E","recommendHeader":"home-module__recommendHeader___Lqvnh","recommendLine":"home-module__recommendLine___gPiLo","recommendTitle":"home-module__recommendTitle___HZCoN","recommendTabs":"home-module__recommendTabs___uCz1H","recommendTab":"home-module__recommendTab___xHvWY","recommendTabText":"home-module__recommendTabText___vqO55","recommendTabActive":"home-module__recommendTabActive___Noz3_","productGrid":"home-module__productGrid___vabQw","productCard":"home-module__productCard___eqvIf","productInfo":"home-module__productInfo___xYtl8","productName":"home-module__productName___PqOUU","productTags":"home-module__productTags___aFFOA","tag":"home-module__tag___JDC0z","productPrice":"home-module__productPrice___O2MUC","currentPrice":"home-module__currentPrice___Kk_mK","salesInfo":"home-module__salesInfo___dMMqr"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map