// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
// 小程序端不受 CORS 限制，直接使用完整后端地址
import { apiGet, apiPost, apiPut, apiDelete, toNumericId, normalizeNumericFields } from '@/api/common';

const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

// ==================== URL 常量 ====================
export const cartApi = {
    list: `${API_BASE_URL}/cart`,
    add: `${API_BASE_URL}/cart`,
    update: `${API_BASE_URL}/cart/:id`,
    delete: `${API_BASE_URL}/cart/:id`,
    batchDelete: `${API_BASE_URL}/cart/batch-delete`,
};

export const orderApi = {
    submit: `${API_BASE_URL}/orders`,
    list: `${API_BASE_URL}/orders`,
    detail: `${API_BASE_URL}/orders/:id`,
    cancel: `${API_BASE_URL}/orders/:id/cancel`,
    pay: `${API_BASE_URL}/orders/:id/pay`,
    paymentStatus: `${API_BASE_URL}/orders/:id/payment`,
    confirm: `${API_BASE_URL}/orders/:id/confirm`,
    confirmPickup: `${API_BASE_URL}/orders/:id/pickup`,
    refund: `${API_BASE_URL}/orders/:id/refund`,
    review: `${API_BASE_URL}/orders/:id/review`,
    reviewList: `${API_BASE_URL}/orders/:id/reviews`,
};

export const paymentApi = {
    callback: `${API_BASE_URL}/payment/callback`,
};

export const refundApi = {
    reasonList: `${API_BASE_URL}/refund-reasons`,
    list: `${API_BASE_URL}/refunds`,
    apply: `${API_BASE_URL}/refunds`,
    detail: `${API_BASE_URL}/refunds/:id`,
};

export const addressApi = {
    list: `${API_BASE_URL}/address`,
    default: `${API_BASE_URL}/address/default`,
    detail: `${API_BASE_URL}/address/:id`,
    create: `${API_BASE_URL}/address`,
    update: `${API_BASE_URL}/address/:id`,
    delete: `${API_BASE_URL}/address/:id`,
};

// ==================== 数据转换 ====================

/**
 * 转换购物车项：兼容后端可能返回的 snake_case / PascalCase / camelCase 字段名
 */
function isEmptyValue(value: any): boolean {
    return value === undefined || value === null || value === '' || value === 0 || value === '0';
}

function normalizeEmptyId(value: any): string {
    if (isEmptyValue(value)) return '';
    return String(value);
}

function pickFirstValidId(...candidates: any[]): string {
    for (const value of candidates) {
        if (!isEmptyValue(value)) {
            return String(value);
        }
    }
    return '';
}

/**
 * 兜底提取商品信息：兼容后端把商品字段平铺在退款记录上，或嵌套在 product/sku/goods/orderItem 等结构里
 */
function extractFallbackProduct(raw: any): any {
    if (!raw || typeof raw !== 'object') return null;
    const product = raw.product ?? raw.Product ?? raw.goods ?? raw.Goods ?? raw.item ?? raw.Item
        ?? raw.orderItem ?? raw.OrderItem ?? raw.refundItem ?? raw.RefundItem ?? {};
    const sku = raw.sku ?? raw.Sku ?? product.sku ?? product.Sku ?? {};

    const productName =
        raw.productName ?? raw.product_name ?? raw.ProductName ?? raw.name ?? raw.Name
        ?? raw.title ?? raw.Title ?? raw.goodsName ?? raw.goods_name ?? raw.GoodsName
        ?? product.name ?? product.Name ?? product.productName ?? product.title ?? product.Title
        ?? product.goodsName ?? '';

    let skuName =
        raw.skuName ?? raw.sku_name ?? raw.SkuName ?? raw.specName ?? raw.spec_name ?? raw.SpecName
        ?? raw.specs ?? sku.name ?? sku.skuName ?? sku.specName ?? sku.specs ?? '';
    if (!skuName && (raw.specValues || sku.specValues)) {
        const sv = raw.specValues || sku.specValues;
        if (typeof sv === 'object') {
            skuName = Object.values(sv).join('/') || '';
        }
    }

    let image =
        raw.productImage ?? raw.product_image ?? raw.ProductImage ?? raw.image ?? raw.Image
        ?? raw.pic ?? raw.Pic ?? product.image ?? product.Image ?? product.pic ?? product.Pic ?? '';
    if (!image) {
        const arr = product.images ?? product.Images ?? product.imageList ?? product.ImageList
            ?? sku.images ?? sku.Images;
        if (Array.isArray(arr) && arr.length > 0) {
            image = arr[0];
        }
    }
    if (typeof image === 'string') {
        if (image.startsWith('[')) {
            try {
                const parsed = JSON.parse(image);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    image = String(parsed[0]).replace(/^`|`$/g, '');
                }
            } catch { /* ignore */ }
        } else {
            image = image.replace(/^`|`$/g, '');
        }
    }

    const price = Number(
        raw.price ?? raw.Price ?? raw.refundPrice ?? raw.refund_price ?? raw.RefundPrice
        ?? raw.amount ?? raw.Amount ?? sku.price ?? sku.Price ?? product.price ?? product.Price ?? 0
    );
    const quantity = Number(
        raw.quantity ?? raw.Quantity ?? raw.count ?? raw.Count ?? raw.num ?? raw.Num
        ?? sku.quantity ?? product.quantity ?? 1
    );

    if (!productName && !image) return null;
    return { productName, skuName, image, price, quantity };
}

export function transformCartItem(raw: any): Record<string, any> {
    const id = pickFirstValidId(
        raw.id, raw.Id, raw.ID,
        raw.cartId, raw.cart_id, raw.CartId, raw.Cart_id,
        raw.cartItemId, raw.cart_item_id, raw.CartItemId, raw.CartItemID, raw.cartItemID,
        raw.cid, raw.Cid, raw.CID,
        raw.itemId, raw.item_id, raw.ItemId, raw.ItemID,
        raw.shoppingCartId, raw.shopping_cart_id, raw.ShoppingCartId,
        raw.shoppingCartItemId, raw.shopping_cart_item_id, raw.ShoppingCartItemId
    );
    if (!id) {
        console.warn('[transformCartItem] 无法提取有效购物车ID，原始数据:', JSON.stringify(raw));
    }

    // 兼容后端返回的嵌套商品/SKU结构：
    // 1. { product: {...}, sku: {...}, quantity: 1 }
    // 2. { sku: { product: {...}, ... }, quantity: 1 }
    const rawSku = raw.sku ?? raw.Sku ?? raw.skuInfo ?? raw.SkuInfo ?? {};
    const product = raw.product ?? raw.Product ?? raw.goods ?? raw.Goods ?? raw.item ?? raw.Item
        ?? rawSku.product ?? rawSku.Product ?? rawSku.goods ?? rawSku.Goods ?? {};

    // 处理 specValues：后端返回对象 {"颜色":"红色"}，需要转为字符串
    let skuName = raw.skuName ?? raw.sku_name ?? raw.SkuName ?? raw.specName ??
        rawSku.name ?? rawSku.skuName ?? rawSku.sku_name ?? rawSku.SkuName ?? rawSku.specName ?? rawSku.title ?? rawSku.Title ?? '';
    if (!skuName && raw.specValues && typeof raw.specValues === 'object') {
        skuName = Object.values(raw.specValues).join('/') || '';
    }
    if (!skuName && rawSku.specValues && typeof rawSku.specValues === 'object') {
        skuName = Object.values(rawSku.specValues).join('/') || '';
    }
    if (!skuName && rawSku.specs && typeof rawSku.specs === 'object') {
        skuName = Object.values(rawSku.specs).join('/') || '';
    }
    if (!skuName && product.specs && typeof product.specs === 'object') {
        skuName = Object.values(product.specs).join('/') || '';
    }

    // 处理 image：后端可能返回 JSON 字符串 '["url"]' 或普通字符串，URL 前后可能带反引号
    const imageCandidates = [
        raw.image, raw.imageUrl, raw.image_url, raw.Image, raw.pic,
        raw.mainImage, raw.main_image, raw.MainImage,
        raw.cover, raw.Cover, raw.thumbnail, raw.Thumbnail,
        raw.productImage, raw.product_image, raw.ProductImage,
        rawSku.image, rawSku.Image, rawSku.pic, rawSku.skuImage, rawSku.SkuImage,
        rawSku.mainImage, rawSku.main_image, rawSku.MainImage,
        rawSku.cover, rawSku.Cover, rawSku.thumbnail, rawSku.Thumbnail,
        rawSku.product?.images?.[0], rawSku.product?.Images?.[0],
        rawSku.product?.mainImage, rawSku.product?.MainImage,
        rawSku.product?.image, rawSku.product?.Image,
        product.image, product.Image, product.pic,
        product.images?.[0], product.Images?.[0],
        product.mainImage, product.MainImage, product.main_image,
        product.imageUrl, product.image_url, product.ImageUrl,
        product.cover, product.Cover,
        product.thumbnail, product.Thumbnail,
    ];
    let image = '';
    for (const candidate of imageCandidates) {
        if (candidate !== undefined && candidate !== null && candidate !== '') {
            image = candidate;
            break;
        }
    }
    if (typeof image === 'string') {
        if (image.startsWith('[')) {
            try {
                const parsed = JSON.parse(image);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    image = String(parsed[0]).replace(/^`|`$/g, '');
                }
            } catch { /* ignore */ }
        } else {
            image = image.replace(/^`|`$/g, '');
        }
    }

    const productName = raw.productName ?? raw.product_name ?? raw.ProductName ?? raw.name ?? raw.title ??
        product.name ?? product.Name ?? product.title ?? product.Title ?? product.productName ?? product.product_name ?? '';
    const price = Number(
        raw.price ?? raw.Price ?? raw.salePrice ?? raw.sale_price ?? raw.discountPrice ?? raw.amount ??
        rawSku.price ?? rawSku.Price ?? rawSku.salePrice ?? rawSku.sale_price ?? rawSku.discountPrice ??
        product.price ?? product.Price ?? product.salePrice ?? product.sale_price ?? 0
    );

    // 当转换后关键信息缺失时打印完整原始数据，便于排查后端字段问题
    // 注意：image 为空不算关键信息缺失（后端可能返回空 image，由 getImageUrl 补占位图）
    if (!productName || (price === 0 && !raw.price && !raw.Price && !raw.amount)) {
        console.warn('[transformCartItem] 商品关键信息缺失，原始数据:', JSON.stringify(raw));
    }

    return {
        id,
        productId: pickFirstValidId(
            raw.productId, raw.product_id, raw.ProductId, raw.pid, raw.productID,
            product.id, product.Id, product.ID,
            rawSku.productId, rawSku.product?.id, rawSku.product?.ID
        ),
        productName,
        skuId: pickFirstValidId(raw.skuId, raw.sku_id, raw.SkuId, raw.skuID, rawSku.id, rawSku.Id, rawSku.ID),
        skuName,
        price,
        quantity: Number(raw.quantity ?? raw.Quantity ?? raw.count ?? raw.num ?? 1),
        stock: Number(raw.stock ?? raw.Stock ?? raw.maxQuantity ?? rawSku.stock ?? rawSku.Stock ?? product.stock ?? product.Stock ?? 999),
        image,
        selected: raw.selected ?? raw.Selected ?? true,
        isSeckill: raw.isSeckill ?? raw.is_seckill ?? raw.IsSeckill ?? product.isSeckill ?? product.is_seckill ?? false,
        seckillPrice: raw.seckillPrice ?? raw.seckill_price ?? raw.SeckillPrice ?? rawSku.seckillPrice ?? rawSku.seckill_price ?? product.seckillPrice ?? null,
        originalPrice: raw.originalPrice ?? raw.original_price ?? raw.OriginalPrice ?? raw.marketPrice ?? rawSku.originalPrice ?? product.originalPrice ?? null,
        storeId: raw.storeId ?? raw.store_id ?? raw.StoreId ?? product.storeId ?? product.store_id ?? null,
        storeName: raw.storeName ?? raw.store_name ?? raw.StoreName ?? product.storeName ?? product.store_name ?? '',
        checked: raw.checked ?? raw.Checked ?? null,
        skuCode: raw.skuCode ?? raw.sku_code ?? raw.SkuCode ?? rawSku.skuCode ?? rawSku.sku_code ?? rawSku.SkuCode ?? '',
        productCode: raw.productCode ?? raw.product_code ?? raw.ProductCode ?? product.productCode ?? product.product_code ?? '',
        createTime: raw.createTime ?? raw.create_time ?? raw.CreateTime ?? raw.CreatedAt ?? '',
        updateTime: raw.updateTime ?? raw.update_time ?? raw.UpdateTime ?? raw.UpdatedAt ?? '',
    };
}

/**
 * 转换订单列表项
 */
// 后端订单状态码：0=待支付 2=待发货 3=待自提 4=已完成 5=已取消
const orderStatusCodeMap: Record<number, string> = {
    0: 'pending_payment',
    2: 'pending_delivery',
    3: 'pending_pickup',
    4: 'completed',
    5: 'cancelled',
};

export function transformOrderItem(raw: any): Record<string, any> {
    const rawStatus = raw.status ?? raw.Status ?? raw.orderStatus ?? '';
    const status = typeof rawStatus === 'number'
        ? (orderStatusCodeMap[rawStatus] ?? String(rawStatus))
        : rawStatus;

    return {
        id: pickFirstValidId(raw.id, raw.Id, raw.ID, raw.orderId, raw.order_id),
        orderNo: pickFirstValidId(raw.orderNo, raw.order_no, raw.OrderNo, raw.OrderNO),
        status,
        totalAmount: Number(raw.totalAmount ?? raw.total_amount ?? raw.TotalAmount ?? 0),
        payAmount: Number(raw.payAmount ?? raw.pay_amount ?? raw.PayAmount ?? 0),
        freightAmount: Number(raw.freightAmount ?? raw.freight_amount ?? raw.FreightAmount ?? 0),
        couponAmount: Number(raw.couponAmount ?? raw.coupon_amount ?? raw.CouponAmount ?? raw.discountAmount ?? raw.discount_amount ?? 0),
        itemCount: Number(raw.itemCount ?? raw.item_count ?? raw.ItemCount ?? (Array.isArray(raw.items) ? raw.items.length : 0)),
        createdAt: raw.createdAt ?? raw.created_at ?? raw.createTime ?? raw.CreateTime ?? raw.CreatedAt ?? '',
        payAt: raw.payAt ?? raw.pay_at ?? raw.PayAt ?? raw.paidAt ?? raw.PaidAt ?? '',
        items: Array.isArray(raw.items) ? raw.items.map(transformCartItem) : [],
        address: raw.address ?? raw.Address ?? null,
        storeName: raw.storeName ?? raw.store_name ?? raw.StoreName ?? raw.store?.name ?? '',
        store: raw.store ?? raw.Store ?? null,
        remark: raw.remark ?? raw.Remark ?? '',
        isReviewed: raw.isReviewed ?? raw.is_reviewed ?? raw.IsReviewed ?? raw.reviewed ?? raw.Reviewed ?? false,
    };
}

// ==================== 购物车 API 方法 ====================

/**
 * 获取购物车列表
 * GET /api/v1/cart
 */
export async function fetchCartList(params: { page?: number; size?: number } = {}) {
    const res = await apiGet(cartApi.list, params);
    const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? []);
    // 临时调试
    if (list.length > 0) {
        console.log('[fetchCartList] 后端原始第一条:', JSON.stringify(list[0], null, 2));
    }
    return {
        ...res,
        data: list.map(transformCartItem),
    };
}

/**
 * 添加商品到购物车
 * POST /api/v1/cart
 */
export async function addToCartAPI(payload: {
    productId: string | number;
    skuId: string | number;
    quantity: number;
    storeId?: string | number;
    remark?: string;
}) {
    const body: Record<string, any> = {
        productId: toNumericId(payload.productId),
        skuId: toNumericId(payload.skuId),
        quantity: payload.quantity,
    };
    if (payload.storeId !== undefined && payload.storeId !== null) body.storeId = toNumericId(payload.storeId);
    if (payload.remark) body.remark = payload.remark;

    const res = await apiPost(cartApi.add, body, {}, {}, false);
    return res;
}

/**
 * 修改购物车项数量
 * PUT /api/v1/cart/{id}
 */
export async function updateCartItem(id: string | number, payload: {
    quantity?: number;
    selected?: boolean;
}) {
    const numericId = toNumericId(id);
    if (!numericId) {
        console.error('[updateCartItem] 无效的购物车ID:', id, '类型:', typeof id);
        throw new Error('无效的购物车ID');
    }
    const body: Record<string, any> = {};
    if (payload.quantity !== undefined) body.quantity = payload.quantity;
    if (payload.selected !== undefined) body.selected = payload.selected;

    const res = await apiPut(cartApi.update, body, { id: numericId });
    return res;
}

/**
 * 删除单个购物车项
 * DELETE /api/v1/cart/{id}
 */
export async function deleteCartItem(id: string | number) {
    const numericId = toNumericId(id);
    if (!numericId) {
        console.error('[deleteCartItem] 无效的购物车ID:', id, '类型:', typeof id);
        throw new Error('无效的购物车ID');
    }
    const res = await apiDelete(cartApi.delete, {}, { id: numericId });
    return res;
}

/**
 * 批量删除购物车项
 * POST /api/v1/cart/batch-delete
 */
export async function batchDeleteCartItem(ids: Array<string | number>) {
    const numericIds = ids.map(toNumericId).filter(Boolean);
    if (numericIds.length === 0) {
        throw new Error('无效的购物车ID');
    }
    const res = await apiPost(cartApi.batchDelete, { ids: numericIds }, {}, {}, false);
    return res;
}

// ==================== 订单 API 方法 ====================

/**
 * 提交订单
 * POST /api/v1/orders
 * 后端契约: { cartIds: uint64[], storeId: uint64, userCouponId: uint64|null, remark: string }
 */
export async function submitOrder(payload: Record<string, any>) {
    // 根据后端 Go 结构体构建请求
    // cartIds: 购物车ID列表（从购物车结算时传递）
    // storeId: 自提门店ID
    // userCouponId: 用户优惠券ID（可选）
    // remark: 订单备注

    const requestBody: Record<string, any> = {};

    // 处理购物车 ID 列表
    if (Array.isArray(payload.cartIds)) {
        requestBody.cartIds = payload.cartIds.map((id: any) => toNumericId(id));
    } else if (Array.isArray(payload.items)) {
        // 如果传递的是商品列表而非购物车 ID，从中提取 ID
        requestBody.cartIds = payload.items
            .filter((item: any) => item.id)
            .map((item: any) => toNumericId(item.id));
    } else {
        requestBody.cartIds = [];
    }

    // 处理门店 ID
    requestBody.storeId = toNumericId(payload.storeId);

    // 处理优惠券 ID（可选）
    if (payload.userCouponId !== undefined && payload.userCouponId !== null && payload.userCouponId !== 0) {
        requestBody.userCouponId = toNumericId(payload.userCouponId);
    } else {
        requestBody.userCouponId = null;
    }

    // 处理备注
    requestBody.remark = payload.remark || '';

    console.log('[SubmitOrder API] Sending payload:', JSON.stringify(requestBody));

    const res = await apiPost(orderApi.submit, requestBody, {}, {}, false);
    return res;
}

/**
 * 获取订单列表
 * GET /api/v1/orders
 */
export async function fetchOrderList(params: { status?: string; page?: number; size?: number } = {}) {
    const res = await apiGet(orderApi.list, params);
    const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? []);
    return {
        ...res,
        data: list.map(transformOrderItem),
    };
}

/**
 * 获取订单详情
 * GET /api/v1/orders/{id}
 */
export async function fetchOrderDetail(id: string | number) {
    const res = await apiGet(orderApi.detail, {}, { id });
    if (res?.data) {
        return {
            ...res,
            data: transformOrderItem(res.data),
        };
    }
    return res;
}

/**
 * 取消订单
 * PUT /api/v1/orders/{id}/cancel
 */
export async function cancelOrder(id: string | number) {
    const res = await apiPut(orderApi.cancel, {}, { id });
    return res;
}

/**
 * 发起支付
 * POST /api/v1/orders/{id}/pay
 * payload 支持：paymentMethod(wechat/alipay) 等参数
 */
export async function payOrder(id: string | number, payload?: { paymentMethod?: string; [key: string]: any }) {
    const res = await apiPost(orderApi.pay, payload || {}, { id }, {}, false);
    return res;
}

/**
 * 支付回调（模拟微信异步通知）
 * POST /api/v1/payment/callback
 * payload 支持：orderId、orderNo、transactionId、paymentMethod、amount 等
 */
export async function paymentCallback(payload: {
    orderId: string | number;
    orderNo?: string;
    transactionId?: string;
    paymentMethod?: string;
    amount?: number;
    [key: string]: any;
}) {
    const body: Record<string, any> = {
        orderId: payload.orderId,
    };
    if (payload.orderNo !== undefined) body.orderNo = payload.orderNo;
    if (payload.transactionId !== undefined) body.transactionId = payload.transactionId;
    if (payload.paymentMethod !== undefined) body.paymentMethod = payload.paymentMethod;
    if (payload.amount !== undefined) body.amount = payload.amount;

    const res = await apiPost(paymentApi.callback, body, {}, {}, false);
    return res;
}

/**
 * 规范化订单支付状态：兼容 snake_case / PascalCase / camelCase 字段名
 */
export function normalizePaymentStatus(raw: any): Record<string, any> {
    const status = raw.status ?? raw.Status ?? raw.payStatus ?? raw.pay_status ?? raw.paymentStatus ?? '';
    const isPaid = status === 'paid' || status === 'success' || status === 'SUCCESS'
        || status === 1 || status === '1'
        || raw.isPaid === true || raw.IsPaid === true || raw.is_paid === true;
    return {
        orderId: raw.orderId ?? raw.order_id ?? raw.OrderId ?? raw.OrderID ?? '',
        orderNo: raw.orderNo ?? raw.order_no ?? raw.OrderNo ?? '',
        status,
        isPaid,
        paymentMethod: raw.paymentMethod ?? raw.payment_method ?? raw.PaymentMethod ?? raw.payType ?? raw.pay_type ?? '',
        transactionId: raw.transactionId ?? raw.transaction_id ?? raw.TransactionId ?? raw.TransactionID ?? '',
        amount: Number(raw.amount ?? raw.Amount ?? raw.payAmount ?? raw.pay_amount ?? raw.PayAmount ?? 0),
        paidAt: raw.paidAt ?? raw.paid_at ?? raw.PaidAt ?? raw.payTime ?? raw.pay_time ?? raw.PayTime ?? '',
        message: raw.message ?? raw.Message ?? raw.msg ?? '',
    };
}

/**
 * 查询订单支付状态
 * GET /api/v1/orders/{id}/payment
 */
export async function fetchOrderPaymentStatus(id: string | number) {
    const res = await apiGet(orderApi.paymentStatus, {}, { id });
    if (res?.data) {
        return {
            ...res,
            data: normalizePaymentStatus(res.data),
        };
    }
    return res;
}

/**
 * 确认取货/确认收货（待自提→已完成）
 * PUT /api/v1/orders/{id}/confirm
 */
export async function confirmOrder(id: string | number) {
    const res = await apiPut(orderApi.confirm, {}, { id });
    return res;
}

/**
 * 确认发货/备货完成（待发货→待自提）
 * POST /api/v1/orders/{id}/pickup
 */
export async function confirmPickupOrder(id: string | number) {
    const res = await apiPost(orderApi.confirmPickup, {}, { id }, {}, false);
    return res;
}

/**
 * 申请退款
 * POST /api/v1/orders/{id}/refund
 */
export async function refundOrder(id: string | number, payload?: { reason?: string; amount?: number }) {
    const res = await apiPost(orderApi.refund, payload || {}, { id }, {}, false);
    return res;
}

// ==================== 订单评价 API ====================

/**
 * 评价数据规范化：兼容 snake_case / PascalCase / camelCase
 */
export function normalizeReview(raw: any): Record<string, any> {
    return {
        id: raw.id ?? raw.Id ?? raw.reviewId ?? raw.review_id ?? raw.ID ?? '',
        orderId: raw.orderId ?? raw.order_id ?? raw.OrderId ?? raw.OrderID ?? '',
        productId: raw.productId ?? raw.product_id ?? raw.ProductId ?? raw.ProductID ?? '',
        productName: raw.productName ?? raw.product_name ?? raw.ProductName ?? raw.name ?? '',
        skuId: raw.skuId ?? raw.sku_id ?? raw.SkuId ?? raw.SkuID ?? '',
        skuName: raw.skuName ?? raw.sku_name ?? raw.SkuName ?? raw.specName ?? '',
        rating: Number(raw.rating ?? raw.Rating ?? raw.score ?? raw.Score ?? 5),
        ratingType: raw.ratingType ?? raw.rating_type ?? raw.RatingType ?? (raw.rating >= 4 ? 'good' : (raw.rating <= 2 ? 'bad' : 'neutral')),
        content: raw.content ?? raw.Content ?? raw.reviewContent ?? raw.review_content ?? raw.comment ?? raw.Comment ?? '',
        images: Array.isArray(raw.images) ? raw.images
            : (Array.isArray(raw.Images) ? raw.Images
                : (Array.isArray(raw.pics) ? raw.pics
                    : (Array.isArray(raw.imageList) ? raw.imageList : []))),
        anonymous: raw.anonymous ?? raw.Anonymous ?? raw.isAnonymous ?? raw.is_anonymous ?? false,
        createdAt: raw.createdAt ?? raw.created_at ?? raw.CreateTime ?? raw.createTime ?? '',
        userId: raw.userId ?? raw.user_id ?? raw.UserId ?? '',
        userName: raw.userName ?? raw.user_name ?? raw.UserName ?? raw.nickname ?? raw.NickName ?? '',
        userAvatar: raw.userAvatar ?? raw.user_avatar ?? raw.UserAvatar ?? raw.avatar ?? raw.Avatar ?? '',
        reply: raw.reply ?? raw.Reply ?? raw.replyContent ?? raw.reply_content ?? '',
        replyAt: raw.replyAt ?? raw.reply_at ?? raw.ReplyAt ?? '',
    };
}

/**
 * 提交订单评价
 * POST /api/v1/orders/{id}/review
 * payload 支持：rating(1-5)、content(评价内容)、images(图片URL数组)、anonymous(是否匿名)、items(多商品评价)
 */
export async function submitOrderReview(
    id: string | number,
    payload: {
        rating?: number;
        ratingType?: 'good' | 'bad' | 'neutral';
        content?: string;
        images?: string[];
        anonymous?: boolean;
        items?: Array<{
            productId: string | number;
            skuId?: string | number;
            rating?: number;
            content?: string;
            images?: string[];
        }>;
    }
) {
    const body: Record<string, any> = {};
    if (payload.rating !== undefined) body.rating = payload.rating;
    if (payload.ratingType !== undefined) body.ratingType = payload.ratingType;
    if (payload.content !== undefined) body.content = payload.content;
    if (Array.isArray(payload.images)) body.images = payload.images;
    if (payload.anonymous !== undefined) body.anonymous = payload.anonymous;
    if (Array.isArray(payload.items)) {
        body.items = payload.items.map(item => ({
            productId: toNumericId(item.productId),
            skuId: toNumericId(item.skuId),
            rating: item.rating,
            content: item.content,
            images: Array.isArray(item.images) ? item.images : [],
        }));
    }

    const res = await apiPost(orderApi.review, body, { id: toNumericId(id) }, {}, false);
    return res;
}

/**
 * 获取订单评价列表
 * GET /api/v1/orders/{id}/reviews
 * 注意：该接口在后端未实现时返回 404，此处静默处理为空评价列表，
 *      避免订单列表页兜底查询评价时在控制台刷屏报错。
 */
export async function fetchOrderReviews(id: string | number) {
    try {
        // silent=true：接口未实现时不打印网络错误日志、不触发登录弹窗
        const res = await apiGet(orderApi.reviewList, {}, { id }, true);
        const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? []);
        return {
            ...res,
            data: list.map(normalizeReview),
        };
    } catch (err: any) {
        // 404 = 接口未实现；其他静默失败也视为无评价，不抛错打断订单列表加载
        return { code: 200, data: [] };
    }
}

// ==================== 退款 API ====================

/**
 * 退货原因数据规范化：兼容 snake_case / PascalCase / camelCase
 */
export function normalizeRefundReason(raw: any): Record<string, any> {
    return {
        id: raw.id ?? raw.Id ?? raw.reasonId ?? raw.reason_id ?? raw.ID ?? raw.code ?? '',
        name: raw.name ?? raw.Name ?? raw.reasonName ?? raw.reason_name ?? raw.title ?? raw.Title ?? raw.label ?? raw.Label ?? raw.content ?? raw.Content ?? '',
        sort: Number(raw.sort ?? raw.Sort ?? raw.order ?? raw.Order ?? raw.seq ?? raw.Seq ?? 0),
        enabled: raw.enabled ?? raw.Enabled ?? raw.status ?? raw.Status ?? raw.active ?? raw.Active ?? true,
        description: raw.description ?? raw.Description ?? raw.desc ?? raw.Desc ?? raw.remark ?? raw.Remark ?? '',
    };
}

/**
 * 退款数据规范化：兼容 snake_case / PascalCase / camelCase
 */
export function normalizeRefund(raw: any): Record<string, any> {
    const rawStatus = raw.status ?? raw.Status ?? raw.refundStatus ?? raw.refund_status;
    const statusTextMap: { [key: string]: string } = {
        'pending': '待审核',
        'approved': '已通过',
        'rejected': '已拒绝',
        'completed': '已完成',
    };
    const typeTextMap: { [key: string]: string } = {
        'refund_only': '仅退款',
        'return_refund': '退货退款',
        'only_refund': '仅退款',
        'return_and_refund': '退货退款',
    };

    let status = rawStatus;
    let statusCode: number | null = null;
    if (typeof rawStatus === 'number') {
        statusCode = rawStatus;
        const numericMap: { [key: number]: string } = {
            0: 'pending',
            1: 'approved',
            2: 'rejected',
            3: 'completed',
        };
        status = numericMap[rawStatus] || 'pending';
    }

    const rawType = raw.type ?? raw.Type ?? raw.refundType ?? raw.refund_type ?? raw.applyType ?? raw.apply_type;
    let type = rawType;
    if (typeof rawType === 'number') {
        const typeNumericMap: { [key: number]: string } = {
            1: 'refund_only',
            2: 'return_refund',
        };
        type = typeNumericMap[rawType] || 'refund_only';
    }

    const itemKeys = [
        'items', 'Items', 'refundItems', 'RefundItems', 'goodsList', 'GoodsList',
        'orderItems', 'OrderItems', 'products', 'Products', 'goods', 'Goods',
        'list', 'List', 'records', 'Records', 'data', 'Data',
    ];
    const rawItems = itemKeys.map(k => raw[k]).find(Array.isArray) || [];
    let items = rawItems.map(transformCartItem).map((item, index) => {
        // 如果 transformCartItem 没有解析出商品关键信息，尝试从原始元素兜底提取
        if ((item.productName || item.image) && item.quantity) return item;
        const fallback = extractFallbackProduct(rawItems[index]);
        return fallback ? { id: item.id || '', ...fallback } : item;
    });

    // 兜底：后端未返回商品项时，从退款记录自身的商品字段构建一条商品信息
    if (!items || items.length === 0) {
        const fallback = extractFallbackProduct(raw);
        if (fallback) {
            items = [fallback];
        }
    }

    return {
        id: raw.id ?? raw.Id ?? raw.refundId ?? raw.refund_id ?? raw.ID ?? '',
        refundNo: raw.refundNo ?? raw.refund_no ?? raw.RefundNo ?? raw.RefundNO ?? raw.sn ?? raw.SN ?? raw.code ?? raw.Code ?? '',
        orderId: raw.orderId ?? raw.order_id ?? raw.OrderId ?? raw.OrderID ?? raw.orderNo ?? raw.order_no ?? raw.OrderNo ?? '',
        orderNo: raw.orderNo ?? raw.order_no ?? raw.OrderNo ?? raw.OrderNO ?? '',
        userId: raw.userId ?? raw.user_id ?? raw.UserId ?? raw.UserID ?? '',
        type,
        typeText: typeTextMap[type as string] ?? raw.typeText ?? raw.type_text ?? raw.TypeText ?? (type === 'return_refund' ? '退货退款' : '仅退款'),
        status,
        statusCode,
        statusText: raw.statusText ?? raw.status_text ?? raw.StatusText ?? statusTextMap[status as string] ?? status ?? '',
        reason: raw.reason ?? raw.Reason ?? raw.refundReason ?? raw.refund_reason ?? '',
        reasonId: raw.reasonId ?? raw.reason_id ?? raw.ReasonId ?? raw.ReasonID ?? '',
        amount: Number(raw.amount ?? raw.Amount ?? raw.refundAmount ?? raw.refund_amount ?? raw.totalAmount ?? raw.total_amount ?? raw.TotalAmount ?? 0),
        payAmount: Number(raw.payAmount ?? raw.pay_amount ?? raw.PayAmount ?? raw.orderAmount ?? raw.order_amount ?? raw.OrderAmount ?? 0),
        freightAmount: Number(raw.freightAmount ?? raw.freight_amount ?? raw.FreightAmount ?? 0),
        couponAmount: Number(raw.couponAmount ?? raw.coupon_amount ?? raw.CouponAmount ?? 0),
        quantity: Number(raw.quantity ?? raw.Quantity ?? raw.count ?? raw.Count ?? raw.num ?? raw.Num ?? 0),
        description: raw.description ?? raw.Description ?? raw.remark ?? raw.Remark ?? raw.desc ?? raw.Desc ?? '',
        images: Array.isArray(raw.images) ? raw.images
            : (Array.isArray(raw.Images) ? raw.Images
                : (Array.isArray(raw.pics) ? raw.pics
                    : (Array.isArray(raw.vouchers) ? raw.vouchers
                        : (Array.isArray(raw.imageList) ? raw.imageList : [])))),
        items,
        applyTime: raw.applyTime ?? raw.apply_time ?? raw.ApplyTime ?? raw.createTime ?? raw.create_time ?? raw.CreateTime ?? raw.createdAt ?? raw.created_at ?? raw.CreatedAt ?? '',
        auditTime: raw.auditTime ?? raw.audit_time ?? raw.AuditTime ?? raw.reviewTime ?? raw.review_time ?? raw.ReviewTime ?? '',
        auditRemark: raw.auditRemark ?? raw.audit_remark ?? raw.AuditRemark ?? raw.rejectReason ?? raw.reject_reason ?? raw.RejectReason ?? '',
        refundTime: raw.refundTime ?? raw.refund_time ?? raw.RefundTime ?? raw.completeTime ?? raw.complete_time ?? raw.CompleteTime ?? '',
        trackingNo: raw.trackingNo ?? raw.tracking_no ?? raw.TrackingNo ?? raw.expressNo ?? raw.express_no ?? raw.ExpressNo ?? raw.logisticsNo ?? raw.logistics_no ?? raw.LogisticsNo ?? '',
        trackingCompany: raw.trackingCompany ?? raw.tracking_company ?? raw.TrackingCompany ?? raw.expressCompany ?? raw.express_company ?? raw.ExpressCompany ?? raw.logisticsCompany ?? raw.logistics_company ?? raw.LogisticsCompany ?? '',
        receiverName: raw.receiverName ?? raw.receiver_name ?? raw.ReceiverName ?? raw.consignee ?? raw.Consignee ?? '',
        receiverPhone: raw.receiverPhone ?? raw.receiver_phone ?? raw.ReceiverPhone ?? raw.mobile ?? raw.Mobile ?? raw.phone ?? raw.Phone ?? '',
        receiverAddress: raw.receiverAddress ?? raw.receiver_address ?? raw.ReceiverAddress ?? raw.address ?? raw.Address ?? '',
    };
}

/**
 * 获取退货原因模版列表
 * GET /api/v1/refund-reasons
 */
export async function fetchRefundReasons(params: { page?: number; size?: number; enabled?: boolean } = {}) {
    const query: Record<string, any> = {};
    if (params.page !== undefined) query.page = params.page;
    if (params.size !== undefined) query.size = params.size;
    if (params.enabled !== undefined) query.enabled = params.enabled;

    const res = await apiGet(refundApi.reasonList, query);
    const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? res?.data?.records ?? []);
    return {
        ...res,
        data: list.map(normalizeRefundReason),
    };
}

/**
 * 获取退款列表
 * GET /api/v1/refunds
 */
export async function fetchRefundList(params: {
    status?: string | number;
    type?: string | number;
    orderId?: string | number;
    page?: number;
    size?: number;
} = {}) {
    const query: Record<string, any> = {};
    if (params.status !== undefined) query.status = params.status;
    if (params.type !== undefined) query.type = params.type;
    if (params.orderId !== undefined) query.orderId = params.orderId;
    if (params.page !== undefined) query.page = params.page;
    if (params.size !== undefined) query.size = params.size;

    const res = await apiGet(refundApi.list, query);
    const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? res?.data?.records ?? []);
    return {
        ...res,
        data: list.map(normalizeRefund),
    };
}

/**
 * 申请退款
 * POST /api/v1/refunds
 * payload 支持：
 *   - orderId: 订单ID (必填)
 *   - type: 退款类型 refund_only/return_refund 或 1/2 (必填)
 *   - reasonId: 退款原因ID
 *   - reason: 退款原因说明
 *   - amount: 退款金额 (必填)
 *   - description: 退款说明
 *   - images: 凭证图片URL数组
 *   - items: 退款商品项 [{productId, skuId, quantity, price}]
 *   - trackingNo: 退货物流单号
 *   - trackingCompany: 退货物流公司
 */
export async function applyRefund(payload: {
    orderId: string | number;
    type?: string | number;
    reasonId?: string | number;
    reason?: string;
    amount?: number;
    description?: string;
    images?: string[];
    items?: Array<{
        productId: string | number;
        skuId?: string | number;
        quantity?: number;
        price?: number;
    }>;
    trackingNo?: string;
    trackingCompany?: string;
}) {
    const body: Record<string, any> = {
        // 后端 Go 结构体要求：orderId uint64（必填）
        orderId: toNumericId(payload.orderId),
    };
    // 退款原因ID：后端字段名为 refundReasonId（uint64，必填）
    if (payload.reasonId !== undefined && payload.reasonId !== null) {
        body.refundReasonId = toNumericId(payload.reasonId);
    }
    if (payload.description !== undefined) body.description = payload.description;
    if (Array.isArray(payload.images)) body.images = payload.images;

    const res = await apiPost(refundApi.apply, body, {}, {}, false);
    return res;
}

/**
 * 获取退款详情
 * GET /api/v1/refunds/{id}
 */
export async function fetchRefundDetail(id: string | number) {
    const res = await apiGet(refundApi.detail, {}, { id });
    if (res?.data) {
        return {
            ...res,
            data: normalizeRefund(res.data),
        };
    }
    return res;
}

// ==================== 收货地址 ====================

/**
 * 规范化收货地址字段（兼容 snake_case / PascalCase / camelCase）
 */
export function normalizeAddress(raw: any): Record<string, any> {
    if (!raw || typeof raw !== 'object') return {};
    return {
        id: raw.id ?? raw.ID ?? raw.addressId ?? raw.address_id ?? '',
        consignee: raw.consignee ?? raw.Consignee ?? raw.name ?? raw.receiver ?? raw.receiverName ?? raw.receiver_name ?? '',
        phone: raw.phone ?? raw.Phone ?? raw.mobile ?? raw.tel ?? raw.phoneNumber ?? raw.phone_number ?? '',
        province: raw.province ?? raw.Province ?? raw.provinceName ?? raw.province_name ?? '',
        city: raw.city ?? raw.City ?? raw.cityName ?? raw.city_name ?? '',
        district: raw.district ?? raw.District ?? raw.area ?? raw.Area ?? raw.districtName ?? raw.district_name ?? '',
        detail: raw.detail ?? raw.Detail ?? raw.address ?? raw.Address ?? raw.addressDetail ?? raw.address_detail ?? '',
        isDefault: raw.isDefault ?? raw.is_default ?? raw.IsDefault ?? raw.default ?? raw.Default ?? false,
    };
}

/**
 * 获取默认收货地址
 */
export async function fetchDefaultAddress() {
    const res = await apiGet(addressApi.default);
    if (res?.data) {
        return {
            ...res,
            data: normalizeAddress(res.data),
        };
    }
    return res;
}

/**
 * 获取收货地址列表
 */
export async function fetchAddressList() {
    const res = await apiGet(addressApi.list);
    if (res?.data && Array.isArray(res.data)) {
        return {
            ...res,
            data: res.data.map(normalizeAddress),
        };
    }
    return res;
}
