"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/evaluations/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/evaluations/index!./src/pages/home/evaluations/index.tsx":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/evaluations/index!./src/pages/home/evaluations/index.tsx ***!
  \**************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/home */ "./src/api/home/index.ts");
/* harmony import */ var _utils_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/image */ "./src/utils/image.ts");
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/utils/time */ "./src/utils/time.ts");
/* harmony import */ var _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/styles/home/evaluations.module.scss */ "./src/styles/home/evaluations.module.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");













var ProductEvaluationsPage = function ProductEvaluationsPage() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
    productId = _useState2[0],
    setProductId = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState3, 2),
    evaluations = _useState4[0],
    setEvaluations = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState5, 2),
    stats = _useState6[0],
    setStats = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState7, 2),
    aiSummary = _useState8[0],
    setAiSummary = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all'),
    _useState0 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState9, 2),
    currentFilter = _useState0[0],
    setCurrentFilter = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('newest'),
    _useState10 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState1, 2),
    sortType = _useState10[0],
    setSortType = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState12 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState11, 2),
    loading = _useState12[0],
    setLoading = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState14 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState13, 2),
    page = _useState14[0],
    setPage = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState16 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState15, 2),
    hasMore = _useState16[0],
    setHasMore = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState18 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState17, 2),
    loadingMore = _useState18[0],
    setLoadingMore = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState20 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState19, 2),
    showCommentModal = _useState20[0],
    setShowCommentModal = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState22 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState21, 2),
    currentEvaluation = _useState22[0],
    setCurrentEvaluation = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState24 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState23, 2),
    commentInput = _useState24[0],
    setCommentInput = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState26 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState25, 2),
    submittingReply = _useState26[0],
    setSubmittingReply = _useState26[1];
  var pageSize = 10;

  // 加载评价列表
  var loadReviews = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee(pId, filter) {
      var pageNum,
        append,
        res,
        list,
        _args = arguments,
        _t;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            pageNum = _args.length > 2 && _args[2] !== undefined ? _args[2] : 1;
            append = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;
            if (pId) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (append) {
              setLoadingMore(true);
            } else {
              setLoading(true);
            }
            _context.p = 2;
            _context.n = 3;
            return (0,_api_home__WEBPACK_IMPORTED_MODULE_2__.fetchReviewList)({
              productId: pId,
              page: pageNum,
              size: pageSize,
              type: filter
            });
          case 3:
            res = _context.v;
            list = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : [];
            if (append) {
              setEvaluations(function (prev) {
                return [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(prev), (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(list));
              });
            } else {
              setEvaluations(list);
            }
            setHasMore(list.length >= pageSize);
            setPage(pageNum);
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('[评价列表] 加载失败:', (_t === null || _t === void 0 ? void 0 : _t.message) || _t);
            if (!append) setEvaluations([]);
          case 5:
            _context.p = 5;
            setLoading(false);
            setLoadingMore(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 5, 6]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), []);

  // 加载评价统计
  var loadStats = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref2 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee2(pId) {
      var res, _t2;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (pId) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return (0,_api_home__WEBPACK_IMPORTED_MODULE_2__.fetchReviewStats)(pId);
          case 2:
            res = _context2.v;
            if (res !== null && res !== void 0 && res.data) {
              setStats(res.data);
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            console.error('[评价统计] 加载失败:', (_t2 === null || _t2 === void 0 ? void 0 : _t2.message) || _t2);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }(), []);

  // 加载AI评价摘要（即使 content 为空也保留，由 UI 显示占位框架）
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState28 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState27, 2),
    aiLoading = _useState28[0],
    setAiLoading = _useState28[1];
  var loadAiSummary = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref3 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee3(pId) {
      var res, _t3;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (pId) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            setAiLoading(true);
            _context3.p = 2;
            _context3.n = 3;
            return (0,_api_home__WEBPACK_IMPORTED_MODULE_2__.fetchReviewAiSummary)(pId);
          case 3:
            res = _context3.v;
            if (res !== null && res !== void 0 && res.data) {
              setAiSummary(res.data);
            }
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            console.error('[AI评价摘要] 加载失败:', (_t3 === null || _t3 === void 0 ? void 0 : _t3.message) || _t3);
          case 5:
            _context3.p = 5;
            setAiLoading(false);
            return _context3.f(5);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 4, 5, 6]]);
    }));
    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }(), []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _Taro$getCurrentInsta;
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setNavigationBarTitle({
      title: '商品评价'
    });
    var id = ((_Taro$getCurrentInsta = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getCurrentInstance()) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.router) === null || _Taro$getCurrentInsta === void 0 || (_Taro$getCurrentInsta = _Taro$getCurrentInsta.params) === null || _Taro$getCurrentInsta === void 0 ? void 0 : _Taro$getCurrentInsta.id) || '';
    if (!id) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '缺少商品ID',
        icon: 'none'
      });
      setLoading(false);
      return;
    }
    setProductId(id);
    // 并行加载评价列表、统计、AI摘要
    loadReviews(id, 'all', 1, false);
    loadStats(id);
    loadAiSummary(id);
  }, []);

  // 筛选切换
  var handleFilterChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (filter) {
    setCurrentFilter(filter);
    if (productId) {
      loadReviews(productId, filter, 1, false);
    }
  }, [productId, loadReviews]);

  // 加载更多
  var handleLoadMore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (loadingMore || !hasMore || !productId) return;
    loadReviews(productId, currentFilter, page + 1, true);
  }, [loadingMore, hasMore, productId, page, currentFilter, loadReviews]);

  // 排序
  var sortedEvaluations = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () {
    var sorted = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(evaluations);
    if (sortType === 'newest') {
      return sorted.sort(function (a, b) {
        var ta = new Date(String(a.createdAt || a.createTime || '').replace(/-/g, '/')).getTime() || 0;
        var tb = new Date(String(b.createdAt || b.createTime || '').replace(/-/g, '/')).getTime() || 0;
        return tb - ta;
      });
    }
    return sorted.sort(function (a, b) {
      return (b.likeCount || 0) - (a.likeCount || 0);
    });
  }, [evaluations, sortType]);

  // 点赞
  var handleLike = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref4 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee4(evalId) {
      var _t4;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (evalId) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            // 乐观更新
            setEvaluations(function (prev) {
              return prev.map(function (item) {
                if (item.id === evalId) {
                  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, item), {}, {
                    isLike: !item.isLike,
                    likeCount: item.isLike ? (item.likeCount || 0) - 1 : (item.likeCount || 0) + 1
                  });
                }
                return item;
              });
            });
            _context4.p = 2;
            _context4.n = 3;
            return (0,_api_home__WEBPACK_IMPORTED_MODULE_2__.likeReview)(evalId);
          case 3:
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t4 = _context4.v;
            console.error('Failed to like review:', _t4);
            // 回滚
            setEvaluations(function (prev) {
              return prev.map(function (item) {
                if (item.id === evalId) {
                  return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, item), {}, {
                    isLike: !item.isLike,
                    likeCount: item.isLike ? (item.likeCount || 0) - 1 : (item.likeCount || 0) + 1
                  });
                }
                return item;
              });
            });
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
              title: '点赞失败',
              icon: 'none'
            });
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 4]]);
    }));
    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }(), []);

  // 打开评论弹窗 - 加载回复列表
  var openCommentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref5 = (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee5(evaluation) {
      var res, replies, _t5;
      return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            setCurrentEvaluation((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, evaluation), {}, {
              comments: [],
              loadingReplies: true
            }));
            setShowCommentModal(true);
            _context5.p = 1;
            _context5.n = 2;
            return (0,_api_home__WEBPACK_IMPORTED_MODULE_2__.fetchReviewReplies)({
              reviewId: evaluation.id,
              page: 1,
              size: 50
            });
          case 2:
            res = _context5.v;
            replies = Array.isArray(res === null || res === void 0 ? void 0 : res.data) ? res.data : [];
            setCurrentEvaluation(function (prev) {
              return prev ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
                comments: replies,
                loadingReplies: false
              }) : prev;
            });
            _context5.n = 4;
            break;
          case 3:
            _context5.p = 3;
            _t5 = _context5.v;
            console.error('Failed to load review replies:', _t5);
            setCurrentEvaluation(function (prev) {
              return prev ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
                comments: [],
                loadingReplies: false
              }) : prev;
            });
          case 4:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 3]]);
    }));
    return function (_x6) {
      return _ref5.apply(this, arguments);
    };
  }(), []);
  var closeCommentModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  }, []);

  // 提交回复
  var handleSubmitReply = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_7__["default"])(/*#__PURE__*/(0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().m(function _callee6() {
    var newComment, _t6;
    return (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_8__["default"])().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          if (commentInput.trim()) {
            _context6.n = 1;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '请输入评论内容',
            icon: 'none'
          });
          return _context6.a(2);
        case 1:
          if (currentEvaluation !== null && currentEvaluation !== void 0 && currentEvaluation.id) {
            _context6.n = 2;
            break;
          }
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '评价信息异常',
            icon: 'none'
          });
          return _context6.a(2);
        case 2:
          if (!submittingReply) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2);
        case 3:
          setSubmittingReply(true);
          _context6.p = 4;
          _context6.n = 5;
          return (0,_api_home__WEBPACK_IMPORTED_MODULE_2__.replyToReview)({
            reviewId: currentEvaluation.id,
            content: commentInput.trim()
          });
        case 5:
          newComment = {
            id: "comment-".concat(Date.now()),
            reviewId: currentEvaluation.id,
            userId: 'user-current',
            userName: '我',
            userAvatar: '',
            content: commentInput.trim(),
            createdAt: new Date().toLocaleString(),
            likeCount: 0,
            isLike: false
          };
          setCurrentEvaluation(function (prev) {
            return prev ? (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({}, prev), {}, {
              comments: [].concat((0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_9__["default"])(prev.comments || []), [newComment])
            }) : prev;
          });
          setCommentInput('');
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: '评论成功',
            icon: 'success'
          });
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t6 = _context6.v;
          console.error('Failed to send reply:', _t6);
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
            title: (_t6 === null || _t6 === void 0 ? void 0 : _t6.message) || '评论失败',
            icon: 'none'
          });
        case 7:
          _context6.p = 7;
          setSubmittingReply(false);
          return _context6.f(7);
        case 8:
          return _context6.a(2);
      }
    }, _callee6, null, [[4, 6, 7, 8]]);
  })), [commentInput, currentEvaluation, submittingReply]);

  // 渲染评分分布
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
    className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evaluationPage,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      style: {
        position: 'relative',
        margin: '20rpx',
        padding: '32rpx 28rpx 28rpx',
        borderRadius: '24rpx',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1f3a 0%, #2d1b69 45%, #4a2c7a 100%)',
        boxShadow: '0 8rpx 28rpx rgba(74, 44, 122, 0.35)',
        color: '#fff'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        style: {
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24rpx'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            width: '64rpx',
            height: '64rpx',
            borderRadius: '999rpx',
            background: 'linear-gradient(135deg, #a88bff 0%, #6c5ce7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16rpx',
            boxShadow: '0 4rpx 12rpx rgba(168, 139, 255, 0.5)'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              fontSize: '36rpx',
              lineHeight: 1
            },
            children: "\uD83E\uDD16"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          style: {
            flex: 1,
            fontSize: '34rpx',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '1rpx'
          },
          children: "AI\u667A\u80FD\u603B\u8BC4"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          style: {
            fontSize: '20rpx',
            color: '#c8b6ff',
            background: 'rgba(168, 139, 255, 0.15)',
            border: '1rpx solid rgba(168, 139, 255, 0.3)',
            padding: '4rpx 14rpx',
            borderRadius: '999rpx',
            marginLeft: '12rpx'
          },
          children: "AI"
        }), aiSummary && aiSummary.averageRating > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginLeft: '12rpx'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              fontSize: '44rpx',
              fontWeight: '700',
              color: '#ffd700',
              lineHeight: 1
            },
            children: [Math.round(aiSummary.averageRating * 20), "%"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              fontSize: '20rpx',
              color: 'rgba(255,255,255,0.65)',
              marginTop: '6rpx'
            },
            children: "\u7EFC\u5408\u8BC4\u5206"
          })]
        })]
      }), (aiLoading || aiSummary && !aiSummary.overall) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        style: {
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '28rpx 24rpx',
          marginBottom: '20rpx',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '16rpx',
          borderLeft: '4rpx solid rgba(168,139,255,0.5)'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            display: 'flex',
            marginRight: '16rpx'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              width: '12rpx',
              height: '12rpx',
              borderRadius: '999rpx',
              background: '#a88bff',
              marginRight: '8rpx',
              opacity: 0.4
            },
            children: " "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              width: '12rpx',
              height: '12rpx',
              borderRadius: '999rpx',
              background: '#a88bff',
              marginRight: '8rpx',
              opacity: 0.7
            },
            children: " "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              width: '12rpx',
              height: '12rpx',
              borderRadius: '999rpx',
              background: '#a88bff',
              opacity: 1
            },
            children: " "
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            flex: 1
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              fontSize: '30rpx',
              color: 'rgba(255,255,255,0.75)'
            },
            children: "AI \u6B63\u5728\u5206\u6790\u8BE5\u5546\u54C1\u7684\u8BC4\u4EF7..."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              display: 'block',
              fontSize: '22rpx',
              color: 'rgba(255,255,255,0.45)',
              marginTop: '6rpx'
            },
            children: aiLoading ? '基于真实用户评价智能生成' : '评价数据积累后将自动生成总评'
          })]
        })]
      }), !aiLoading && aiSummary && aiSummary.overall && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          style: {
            position: 'relative',
            zIndex: 1,
            display: 'block',
            fontSize: '30rpx',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.7,
            marginBottom: '24rpx',
            padding: '20rpx 24rpx',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '16rpx',
            borderLeft: '4rpx solid #a88bff'
          },
          children: aiSummary.overall
        }), aiSummary.strengths && aiSummary.strengths.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            position: 'relative',
            zIndex: 1,
            marginBottom: '16rpx'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              fontSize: '28rpx',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '12rpx',
              fontWeight: '500'
            },
            children: "\uD83D\uDC4D \u597D\u8BC4\u4EAE\u70B9"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            style: {
              display: 'flex',
              flexWrap: 'wrap'
            },
            children: aiSummary.strengths.map(function (tag, idx) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                style: {
                  fontSize: '28rpx',
                  color: '#b9f5d4',
                  background: 'rgba(72, 209, 104, 0.18)',
                  border: '1rpx solid rgba(72, 209, 104, 0.35)',
                  padding: '8rpx 20rpx',
                  borderRadius: '999rpx',
                  marginRight: '12rpx',
                  marginBottom: '12rpx'
                },
                children: tag
              }, idx);
            })
          })]
        }), aiSummary.weaknesses && aiSummary.weaknesses.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            position: 'relative',
            zIndex: 1
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              fontSize: '28rpx',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '12rpx',
              fontWeight: '500'
            },
            children: "\uD83D\uDC4E \u5F85\u6539\u8FDB"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            style: {
              display: 'flex',
              flexWrap: 'wrap'
            },
            children: aiSummary.weaknesses.map(function (tag, idx) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                style: {
                  fontSize: '28rpx',
                  color: '#ffd3a0',
                  background: 'rgba(255, 159, 67, 0.18)',
                  border: '1rpx solid rgba(255, 159, 67, 0.35)',
                  padding: '8rpx 20rpx',
                  borderRadius: '999rpx',
                  marginRight: '12rpx',
                  marginBottom: '12rpx'
                },
                children: tag
              }, idx);
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].filterSection,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.ScrollView, {
        scrollX: true,
        className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].filterTabs,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "".concat(_styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].filterTab, " ").concat(currentFilter === 'all' ? _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
          onClick: function onClick() {
            return handleFilterChange('all');
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            children: ["\u5168\u90E8 ", (stats === null || stats === void 0 ? void 0 : stats.total) || '']
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "".concat(_styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].filterTab, " ").concat(currentFilter === 'good' ? _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
          onClick: function onClick() {
            return handleFilterChange('good');
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            children: ["\u597D\u8BC4 ", (stats === null || stats === void 0 ? void 0 : stats.goodCount) || '']
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: "".concat(_styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].filterTab, " ").concat(currentFilter === 'bad' ? _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].active : ''),
          onClick: function onClick() {
            return handleFilterChange('bad');
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            children: ["\u5DEE\u8BC4 ", (stats === null || stats === void 0 ? void 0 : stats.badCount) || '']
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.ScrollView, {
      scrollY: true,
      className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evaluationList,
      onScrollToLower: handleLoadMore,
      style: {
        height: 'calc(100vh - 400rpx)'
      },
      children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        style: {
          padding: '100rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          style: {
            color: '#999'
          },
          children: "\u52A0\u8F7D\u4E2D..."
        })
      }) : sortedEvaluations.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        style: {
          padding: '100rpx',
          textAlign: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
          style: {
            color: '#999'
          },
          children: "\u6682\u65E0\u8BC4\u4EF7\uFF0C\u5FEB\u6765\u53D1\u8868\u7B2C\u4E00\u6761\u8BC4\u4EF7\u5427~"
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [sortedEvaluations.map(function (evalItem, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evaluationItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evalHeader,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({
                src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(evalItem.userAvatar),
                className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].userAvatar,
                mode: "aspectFill"
              }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].userInfo,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].userNameRow,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                    className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].userName,
                    children: evalItem.userName || '匿名用户'
                  }), index === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                    className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].userTag,
                    children: "PLUS"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].purchaseInfo,
                  children: evalItem.specs || evalItem.skuName || ''
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evalTime,
                children: (0,_utils_time__WEBPACK_IMPORTED_MODULE_12__.formatDateTime)(evalItem.createdAt || evalItem.createTime || '')
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].ratingRow,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].ratingLabel,
                children: "\u597D\u8BC4"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evalContent,
              children: evalItem.content && evalItem.content.length > 200 ? evalItem.content.slice(0, 200) + '...' : evalItem.content
            }), evalItem.images && evalItem.images.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].imageGrid,
              children: evalItem.images.map(function (img, idx) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({
                  src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(img),
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evalImage,
                  mode: "aspectFill"
                }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.lazyImgProps)()), idx);
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
              className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].evalActions,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: "".concat(_styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].actionItem, " ").concat(evalItem.isLike ? _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].liked : ''),
                onClick: function onClick() {
                  return handleLike(evalItem.id);
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].actionIcon,
                  children: evalItem.isLike ? '❤️' : '👍'
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].actionText,
                  children: evalItem.likeCount || 0
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].actionItem,
                onClick: function onClick() {
                  return openCommentModal(evalItem);
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].actionIcon,
                  children: "\uD83D\uDCAC"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].actionText,
                  children: evalItem.replyCount || evalItem.comments && evalItem.comments.length || 0
                })]
              })]
            })]
          }, evalItem.id || index);
        }), loadingMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            padding: '30rpx',
            textAlign: 'center'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              color: '#999',
              fontSize: '24rpx'
            },
            children: "\u52A0\u8F7D\u66F4\u591A..."
          })
        }), !hasMore && sortedEvaluations.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          style: {
            padding: '30rpx',
            textAlign: 'center'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            style: {
              color: '#999',
              fontSize: '24rpx'
            },
            children: "\u6CA1\u6709\u66F4\u591A\u8BC4\u4EF7\u4E86"
          })
        })]
      })
    }), showCommentModal && currentEvaluation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
      className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentModal,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].modalMask,
        onClick: closeCommentModal
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
        className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentModalContent,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentModalHeader,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentModalTitle,
            children: "\u5168\u90E8\u8BA8\u8BBA"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentModalClose,
            onClick: closeCommentModal,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              children: "\xD7"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.ScrollView, {
          scrollY: true,
          className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentModalBody,
          children: currentEvaluation.loadingReplies ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyComment,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              children: "\u52A0\u8F7D\u4E2D..."
            })
          }) : !currentEvaluation.comments || currentEvaluation.comments.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].emptyComment,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              children: "\u6682\u65E0\u8BC4\u8BBA\uFF0C\u5FEB\u6765\u53D1\u8868\u7B2C\u4E00\u6761\u8BC4\u8BBA\u5427~"
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentList,
            children: (currentEvaluation.comments || []).map(function (comment) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentItem,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Image, (0,D_ceshi_lxg_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_10__["default"])({
                  src: (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.getImageUrl)(comment.userAvatar),
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentAvatar,
                  mode: "aspectFill"
                }, (0,_utils_image__WEBPACK_IMPORTED_MODULE_3__.lazyImgProps)())), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                  className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentContent,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
                    className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentHeader,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                      className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentUserName,
                      children: comment.userName || '匿名用户'
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                      className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentTime,
                      children: (0,_utils_time__WEBPACK_IMPORTED_MODULE_12__.formatDateTime)(comment.createdAt || comment.createTime || '')
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
                    className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentText,
                    children: comment.content
                  })]
                })]
              }, comment.id);
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
          className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentModalFooter,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Input, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentInput,
            placeholder: "\u5199\u4E0B\u4F60\u7684\u8BC4\u8BBA...",
            value: commentInput,
            onInput: function onInput(e) {
              return setCommentInput(e.detail.value);
            },
            onConfirm: handleSubmitReply
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.View, {
            className: _styles_home_evaluations_module_scss__WEBPACK_IMPORTED_MODULE_4__["default"].commentSendBtn,
            onClick: handleSubmitReply,
            style: submittingReply ? {
              opacity: 0.6
            } : {},
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_11__.Text, {
              children: submittingReply ? '发送中' : '发送'
            })
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (ProductEvaluationsPage);

/***/ }),

/***/ "./src/pages/home/evaluations/index.tsx":
/*!**********************************************!*\
  !*** ./src/pages/home/evaluations/index.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_evaluations_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/evaluations/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/evaluations/index!./src/pages/home/evaluations/index.tsx");


var config = {};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_1__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_evaluations_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"], 'pages/home/evaluations/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_evaluations_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_evaluations_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_evaluations_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_evaluations_index_index_tsx__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/styles/home/evaluations.module.scss":
/*!*************************************************!*\
  !*** ./src/styles/home/evaluations.module.scss ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"evaluationPage":"evaluations-module__evaluationPage___Apb7L","statsSection":"evaluations-module__statsSection___J7eF8","scoreArea":"evaluations-module__scoreArea___U6lq9","scoreValue":"evaluations-module__scoreValue___JOnBs","scoreLabel":"evaluations-module__scoreLabel___fjrIz","stars":"evaluations-module__stars___FTNLP","starActive":"evaluations-module__starActive___WH9aO","starInactive":"evaluations-module__starInactive___i9sbc","distribution":"evaluations-module__distribution___U13eI","distItem":"evaluations-module__distItem___tYKuL","distLabel":"evaluations-module__distLabel___rimIw","distBarWrap":"evaluations-module__distBarWrap___SIDKx","distBar":"evaluations-module__distBar____Hjta","distPercent":"evaluations-module__distPercent___p0qCA","goodRate":"evaluations-module__goodRate___lWc_U","goodRateLabel":"evaluations-module__goodRateLabel___T00wE","goodRateValue":"evaluations-module__goodRateValue___kyOch","filterSection":"evaluations-module__filterSection___KoZRC","filterTabs":"evaluations-module__filterTabs___zsjLZ","filterTab":"evaluations-module__filterTab___xNhgq","active":"evaluations-module__active___Q8IzT","filterCount":"evaluations-module__filterCount___qf3oX","tagSection":"evaluations-module__tagSection___rktz2","tagList":"evaluations-module__tagList___f7JQz","tagItem":"evaluations-module__tagItem___h4C5o","tagCount":"evaluations-module__tagCount___be6fx","tagMore":"evaluations-module__tagMore___D5kRx","moreArrow":"evaluations-module__moreArrow___lq2VO","sortSection":"evaluations-module__sortSection___uxqGC","sortLabel":"evaluations-module__sortLabel___sBdqe","sortOptions":"evaluations-module__sortOptions___VQLDa","sortOption":"evaluations-module__sortOption___hMMmA","sortDivider":"evaluations-module__sortDivider___F4AlO","sortArrow":"evaluations-module__sortArrow___DG_Am","evaluationList":"evaluations-module__evaluationList___oGrDC","evaluationItem":"evaluations-module__evaluationItem___vCdDZ","evalHeader":"evaluations-module__evalHeader___HqlOq","userAvatar":"evaluations-module__userAvatar___VpvJy","userInfo":"evaluations-module__userInfo___Zj0k_","userNameRow":"evaluations-module__userNameRow___ROLAD","userName":"evaluations-module__userName___FXRNP","userTag":"evaluations-module__userTag___Xt6id","purchaseInfo":"evaluations-module__purchaseInfo___S3cOw","evalTime":"evaluations-module__evalTime___NDIpe","ratingRow":"evaluations-module__ratingRow___uujA1","ratingLabel":"evaluations-module__ratingLabel___VSe6K","ratingStars":"evaluations-module__ratingStars___oWAtv","evalContent":"evaluations-module__evalContent___aflqu","expandBtn":"evaluations-module__expandBtn___FU62x","imageGrid":"evaluations-module__imageGrid___KpUJW","evalImage":"evaluations-module__evalImage___UeGg3","evalActions":"evaluations-module__evalActions___DHmWl","actionItem":"evaluations-module__actionItem___zMe1B","liked":"evaluations-module__liked___btMat","actionIcon":"evaluations-module__actionIcon___U3ZXO","actionText":"evaluations-module__actionText___ZmPiC","commentList":"evaluations-module__commentList___k6kI_","commentItem":"evaluations-module__commentItem___dd70I","commentAvatar":"evaluations-module__commentAvatar___PcnBN","commentContent":"evaluations-module__commentContent___oDZjw","commentHeader":"evaluations-module__commentHeader___YDrBE","commentUserName":"evaluations-module__commentUserName___Zcoyt","commentTime":"evaluations-module__commentTime___EwQpc","commentText":"evaluations-module__commentText___WaHjP","commentLike":"evaluations-module__commentLike___eMILE","commentLikeCount":"evaluations-module__commentLikeCount___TG145","commentModal":"evaluations-module__commentModal___P4yON","modalMask":"evaluations-module__modalMask___PXfSA","commentModalContent":"evaluations-module__commentModalContent___ffq0s","commentModalHeader":"evaluations-module__commentModalHeader___Bfr06","commentModalTitle":"evaluations-module__commentModalTitle____LDhj","commentModalClose":"evaluations-module__commentModalClose___JCgQs","commentModalBody":"evaluations-module__commentModalBody___NVeBt","emptyComment":"evaluations-module__emptyComment___jPtxB","commentModalFooter":"evaluations-module__commentModalFooter___POwLW","commentInput":"evaluations-module__commentInput___xCjR_","commentSendBtn":"evaluations-module__commentSendBtn___qmiEb"});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/home/evaluations/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map