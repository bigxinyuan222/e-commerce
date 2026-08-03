// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

import { apiGet, apiPost, toNumericId } from '@/api/common';

export const homeApi = {
    banners: `${API_BASE_URL}/homepage/banners`,
    recommendations: `${API_BASE_URL}/homepage/recommendations`,
    seckillActivities: `${API_BASE_URL}/home/seckill-activities`,
    activities: `${API_BASE_URL}/seckill/activities`,
    activityProducts: `${API_BASE_URL}/seckill/activities/:id/products`,
    productDetail: `${API_BASE_URL}/seckill/activities/:id/products/:product_id`
};

export const categoryApi = {
    list: `${API_BASE_URL}/categories`,
    products: `${API_BASE_URL}/categories/:id/products`,
    stores: `${API_BASE_URL}/stores`,
    storeDetail: `${API_BASE_URL}/stores/:id`,
    categoryTree: `${API_BASE_URL}/get/categorytree`,
    categoryOne: `${API_BASE_URL}/get/category/one`,
    categorySecond: `${API_BASE_URL}/get/category/second`
};

export const brandApi = {
    list: `${API_BASE_URL}/brands`,
    products: `${API_BASE_URL}/brands/:id/products`,
    // 获取品牌树
    brandTree: `${API_BASE_URL}/get/brandtree`,
    // 获取指定品牌下的商品（分页）
    brandProducts: `${API_BASE_URL}/get/brand/product`
};

export const productApi = {
    detail: `${API_BASE_URL}/product/detail`,
    search: `${API_BASE_URL}/product/search`
};

export const reviewApi = {
    // 商品评论列表 GET /api/v1/review/list
    list: `${API_BASE_URL}/review/list`,
    // 获取商品评价统计 GET /api/v1/review/state
    stats: `${API_BASE_URL}/review/state`,
    // 获取商品AI评价摘要 GET /api/v1/review/ai
    ai: `${API_BASE_URL}/review/ai`,
    // 回复别人的评论 POST /api/v1/review/reply
    reply: `${API_BASE_URL}/review/reply`,
    // 获取指定评价的回复评价列表 GET /api/v1/review/reply/list
    replyList: `${API_BASE_URL}/review/reply/list`,
    // 点赞/取消点赞一个评价 POST /api/v1/review/like
    like: `${API_BASE_URL}/review/like`,
    // 旧字段保留兼容（商品详情页历史引用），指向新的 list
    summary: `${API_BASE_URL}/review/ai`,
};

// ==================== 评价数据规范化 ====================

/**
 * 规范化商品评价数据：兼容 snake_case / PascalCase / camelCase
 */
export function normalizeProductReview(raw: any): Record<string, any> {
    return {
        id: raw.id ?? raw.Id ?? raw.reviewId ?? raw.review_id ?? raw.ID ?? '',
        productId: raw.productId ?? raw.product_id ?? raw.ProductId ?? raw.ProductID ?? '',
        productName: raw.productName ?? raw.product_name ?? raw.ProductName ?? raw.name ?? '',
        skuId: raw.skuId ?? raw.sku_id ?? raw.SkuId ?? '',
        skuName: raw.skuName ?? raw.sku_name ?? raw.SkuName ?? raw.specs ?? raw.spec ?? '',
        rating: Number(raw.rating ?? raw.Rating ?? raw.score ?? raw.Score ?? 5),
        ratingType: raw.ratingType ?? raw.rating_type ?? raw.RatingType
            ?? (Number(raw.rating ?? raw.Rating ?? 5) >= 4 ? 'good' : (Number(raw.rating ?? raw.Rating ?? 5) <= 2 ? 'bad' : 'neutral')),
        content: raw.content ?? raw.Content ?? raw.reviewContent ?? raw.review_content ?? raw.comment ?? raw.Comment ?? '',
        images: Array.isArray(raw.images) ? raw.images
            : (Array.isArray(raw.Images) ? raw.Images
                : (Array.isArray(raw.pics) ? raw.pics
                    : (Array.isArray(raw.imageList) ? raw.imageList : []))),
        anonymous: raw.anonymous ?? raw.Anonymous ?? raw.isAnonymous ?? raw.is_anonymous ?? raw.isAnonymity ?? false,
        createdAt: raw.createdAt ?? raw.created_at ?? raw.CreateTime ?? raw.createTime ?? raw.CreateAt ?? '',
        userId: raw.userId ?? raw.user_id ?? raw.UserId ?? raw.userID ?? '',
        userName: raw.userName ?? raw.user_name ?? raw.UserName ?? raw.nickname ?? raw.NickName ?? raw.nickName ?? '',
        userAvatar: raw.userAvatar ?? raw.user_avatar ?? raw.UserAvatar ?? raw.avatar ?? raw.Avatar ?? raw.headImg ?? raw.head_img ?? '',
        specs: raw.specs ?? raw.spec ?? raw.skuName ?? raw.sku_name ?? raw.SkuName ?? '',
        likeCount: Number(raw.likeCount ?? raw.like_count ?? raw.LikeCount ?? raw.likes ?? raw.Likes ?? raw.likesCount ?? 0),
        isLike: raw.isLike ?? raw.is_like ?? raw.IsLike ?? raw.liked ?? raw.Liked ?? false,
        replyCount: Number(raw.replyCount ?? raw.reply_count ?? raw.ReplyCount ?? raw.commentCount ?? raw.comment_count ?? 0),
        status: raw.status ?? raw.Status ?? 'show',
    };
}

/**
 * 规范化评价回复数据：兼容 snake_case / PascalCase / camelCase
 */
export function normalizeReviewReply(raw: any): Record<string, any> {
    return {
        id: raw.id ?? raw.Id ?? raw.replyId ?? raw.reply_id ?? raw.commentId ?? raw.comment_id ?? raw.ID ?? '',
        reviewId: raw.reviewId ?? raw.review_id ?? raw.ReviewId ?? raw.evaluationId ?? raw.evaluation_id ?? '',
        parentId: raw.parentId ?? raw.parent_id ?? raw.ParentId ?? raw.pid ?? raw.Pid ?? '',
        userId: raw.userId ?? raw.user_id ?? raw.UserId ?? raw.userID ?? '',
        userName: raw.userName ?? raw.user_name ?? raw.UserName ?? raw.nickname ?? raw.NickName ?? raw.nickName ?? '',
        userAvatar: raw.userAvatar ?? raw.user_avatar ?? raw.UserAvatar ?? raw.avatar ?? raw.Avatar ?? '',
        content: raw.content ?? raw.Content ?? raw.replyContent ?? raw.reply_content ?? raw.comment ?? raw.Comment ?? '',
        likeCount: Number(raw.likeCount ?? raw.like_count ?? raw.LikeCount ?? 0),
        isLike: raw.isLike ?? raw.is_like ?? raw.IsLike ?? false,
        createdAt: raw.createdAt ?? raw.created_at ?? raw.CreateTime ?? raw.createTime ?? raw.replyTime ?? raw.reply_time ?? '',
    };
}

/**
 * 规范化评价统计数据：兼容 snake_case / PascalCase / camelCase
 */
export function normalizeReviewStats(raw: any): Record<string, any> {
    const data = raw?.data ?? raw?.result ?? raw;
    const total = Number(data?.total ?? data?.Total ?? data?.totalCount ?? data?.total_count ?? data?.count ?? 0);
    const goodCount = Number(data?.goodCount ?? data?.good_count ?? data?.GoodCount ?? data?.positive ?? data?.Positive ?? 0);
    const neutralCount = Number(data?.neutralCount ?? data?.neutral_count ?? data?.NeutralCount ?? data?.middle ?? data?.Middle ?? 0);
    const badCount = Number(data?.badCount ?? data?.bad_count ?? data?.BadCount ?? data?.negative ?? data?.Negative ?? 0);
    const imageCount = Number(data?.imageCount ?? data?.image_count ?? data?.ImageCount ?? data?.hasImage ?? data?.has_image ?? 0);
    const averageRating = Number(data?.averageRating ?? data?.average_rating ?? data?.AverageRating ?? data?.avgScore ?? data?.avg_score ?? data?.score ?? 0);
    const goodRate = data?.goodRate ?? data?.good_rate ?? data?.GoodRate
        ?? (total > 0 ? Math.round((goodCount / total) * 100) : 100);

    // 评分分布
    const distribution = data?.distribution ?? data?.Distribution ?? {};
    const dist: Record<number, number> = {};
    [5, 4, 3, 2, 1].forEach(star => {
        dist[star] = Number(distribution[star] ?? distribution[String(star)] ?? distribution[`star${star}`] ?? 0);
    });

    return {
        total,
        goodCount,
        neutralCount,
        badCount,
        imageCount,
        averageRating,
        goodRate,
        distribution: dist,
    };
}

// ==================== 评价 API 方法 ====================

/**
 * 获取商品评论列表
 * GET /api/v1/review/list
 */
export async function fetchReviewList(params: {
    productId?: string | number;
    page?: number;
    size?: number;
    type?: 'all' | 'good' | 'neutral' | 'bad' | 'image';
    ratingType?: string;
} = {}) {
    const query: Record<string, any> = {};
    if (params.productId !== undefined && params.productId !== null && params.productId !== '') {
        // 后端要求参数名为 id（与 product/detail 接口一致）
        query.id = toNumericId(params.productId);
    }
    if (params.page !== undefined) query.page = params.page;
    if (params.size !== undefined) query.size = params.size;
    if (params.type !== undefined) query.type = params.type;
    if (params.ratingType !== undefined) query.ratingType = params.ratingType;

    const res = await apiGet(reviewApi.list, query, {}, false);
    const list = Array.isArray(res?.data) ? res.data
        : (res?.data?.list ?? res?.data?.items ?? res?.data?.records ?? res?.data?.reviews ?? []);
    return {
        ...res,
        data: list.map(normalizeProductReview),
    };
}

/**
 * 获取商品评价统计
 * GET /api/v1/review/state
 */
export async function fetchReviewStats(productId: string | number) {
    // 后端要求参数名为 id（与 product/detail 接口一致）
    const query: Record<string, any> = { id: toNumericId(productId) };
    const res = await apiGet(reviewApi.stats, query, {}, false);
    return {
        ...res,
        data: normalizeReviewStats(res),
    };
}

/**
 * 获取商品AI评价摘要
 * GET /api/v1/review/ai
 */
export async function fetchReviewAiSummary(productId: string | number) {
    // 后端要求参数名为 id（与 product/detail 接口一致）
    const query: Record<string, any> = { id: toNumericId(productId) };
    const res = await apiGet(reviewApi.ai, query, {}, false);
    const data = res?.data ?? res;
    return {
        ...res,
        data: {
            averageRating: Number(data?.averageRating ?? data?.average_rating ?? data?.AverageRating ?? data?.score ?? 0),
            totalCount: Number(data?.totalCount ?? data?.total_count ?? data?.TotalCount ?? data?.total ?? 0),
            overall: data?.overall ?? data?.Overall ?? data?.summary ?? data?.Summary ?? data?.summary_text ?? data?.aiSummary ?? data?.ai_summary ?? '',
            strengths: Array.isArray(data?.strengths) ? data.strengths
                : (Array.isArray(data?.Strengths) ? data.Strengths
                    : (Array.isArray(data?.pros) ? data.pros : [])),
            weaknesses: Array.isArray(data?.weaknesses) ? data.weaknesses
                : (Array.isArray(data?.Weaknesses) ? data.Weaknesses
                    : (Array.isArray(data?.cons) ? data.cons : [])),
            tags: Array.isArray(data?.tags) ? data.tags
                : (Array.isArray(data?.Tags) ? data.Tags : []),
        },
    };
}

/**
 * 回复别人的评论
 * POST /api/v1/review/reply
 */
export async function replyToReview(payload: {
    reviewId: string | number;
    content: string;
    parentId?: string | number;
}) {
    const body: Record<string, any> = {
        // 后端要求参数名为 id（与其他评价接口一致）
        id: toNumericId(payload.reviewId),
        content: payload.content,
    };
    if (payload.parentId !== undefined && payload.parentId !== null && payload.parentId !== '') {
        body.parentId = toNumericId(payload.parentId);
    }
    const res = await apiPost(reviewApi.reply, body, {}, {}, false);
    return res;
}

/**
 * 获取指定评价的回复评价列表
 * GET /api/v1/review/reply/list
 */
export async function fetchReviewReplies(params: {
    reviewId: string | number;
    page?: number;
    size?: number;
} = {}) {
    // 后端要求参数名为 id（与其他评价接口一致）
    const query: Record<string, any> = { id: toNumericId(params.reviewId) };
    if (params.page !== undefined) query.page = params.page;
    if (params.size !== undefined) query.size = params.size;

    const res = await apiGet(reviewApi.replyList, query, {}, false);
    const list = Array.isArray(res?.data) ? res.data
        : (res?.data?.list ?? res?.data?.items ?? res?.data?.records ?? res?.data?.replies ?? []);
    return {
        ...res,
        data: list.map(normalizeReviewReply),
    };
}

/**
 * 点赞/取消点赞一个评价
 * POST /api/v1/review/like
 * 后端要求参数名为 review_id（snake_case），且必须使用 JSON 格式
 */
export async function likeReview(reviewId: string | number) {
    const body: Record<string, any> = { review_id: toNumericId(reviewId) };
    // use JSON format (useFormUrlEncoded = false)
    const res = await apiPost(reviewApi.like, body, {}, {}, false, false);
    return res;
}