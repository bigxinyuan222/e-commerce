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

// ==================== 数据转换 ====================

/**
 * 转换购物车项：兼容后端可能返回的 snake_case / PascalCase / camelCase 字段名
 */
export function transformCartItem(raw: any): Record<string, any> {
    return {
        id: raw.id ?? raw.Id ?? raw.cartId ?? raw.cart_id ?? raw.ID ?? '',
        productId: raw.productId ?? raw.product_id ?? raw.ProductId ?? raw.pid ?? '',
        productName: raw.productName ?? raw.product_name ?? raw.ProductName ?? raw.name ?? '',
        skuId: raw.skuId ?? raw.sku_id ?? raw.SkuId ?? raw.skuID ?? '',
        skuName: raw.skuName ?? raw.sku_name ?? raw.SkuName ?? raw.specName ?? '',
        price: Number(raw.price ?? raw.Price ?? raw.salePrice ?? raw.sale_price ?? raw.discountPrice ?? 0),
        quantity: Number(raw.quantity ?? raw.Quantity ?? raw.count ?? raw.num ?? 1),
        stock: Number(raw.stock ?? raw.Stock ?? raw.maxQuantity ?? 999),
        image: raw.image ?? raw.imageUrl ?? raw.image_url ?? raw.Image ?? raw.pic ?? '',
        selected: raw.selected ?? raw.Selected ?? true,
        isSeckill: raw.isSeckill ?? raw.is_seckill ?? raw.IsSeckill ?? false,
        seckillPrice: raw.seckillPrice ?? raw.seckill_price ?? raw.SeckillPrice ?? null,
        originalPrice: raw.originalPrice ?? raw.original_price ?? raw.OriginalPrice ?? raw.marketPrice ?? null,
        storeId: raw.storeId ?? raw.store_id ?? raw.StoreId ?? null,
        storeName: raw.storeName ?? raw.store_name ?? raw.StoreName ?? '',
        checked: raw.checked ?? raw.Checked ?? null,
        skuCode: raw.skuCode ?? raw.sku_code ?? raw.SkuCode ?? '',
        productCode: raw.productCode ?? raw.product_code ?? raw.ProductCode ?? '',
        createTime: raw.createTime ?? raw.create_time ?? raw.CreateTime ?? '',
        updateTime: raw.updateTime ?? raw.update_time ?? raw.UpdateTime ?? '',
    };
}

/**
 * 转换订单列表项
 */
export function transformOrderItem(raw: any): Record<string, any> {
    return {
        id: raw.id ?? raw.Id ?? raw.orderId ?? raw.order_id ?? '',
        orderNo: raw.orderNo ?? raw.order_no ?? raw.OrderNo ?? raw.OrderNO ?? '',
        status: raw.status ?? raw.Status ?? raw.orderStatus ?? '',
        totalAmount: Number(raw.totalAmount ?? raw.total_amount ?? raw.TotalAmount ?? 0),
        payAmount: Number(raw.payAmount ?? raw.pay_amount ?? raw.PayAmount ?? 0),
        freightAmount: Number(raw.freightAmount ?? raw.freight_amount ?? raw.FreightAmount ?? 0),
        couponAmount: Number(raw.couponAmount ?? raw.coupon_amount ?? raw.CouponAmount ?? 0),
        itemCount: Number(raw.itemCount ?? raw.item_count ?? raw.ItemCount ?? 0),
        createdAt: raw.createdAt ?? raw.created_at ?? raw.createTime ?? raw.CreatedAt ?? '',
        payAt: raw.payAt ?? raw.pay_at ?? raw.PayAt ?? '',
        items: Array.isArray(raw.items) ? raw.items.map(transformCartItem) : [],
        address: raw.address ?? raw.Address ?? null,
        storeName: raw.storeName ?? raw.store_name ?? raw.StoreName ?? '',
        remark: raw.remark ?? raw.Remark ?? '',
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
    const body: Record<string, any> = {};
    if (payload.quantity !== undefined) body.quantity = payload.quantity;
    if (payload.selected !== undefined) body.selected = payload.selected;

    const res = await apiPut(cartApi.update, body, { id });
    return res;
}

/**
 * 删除单个购物车项
 * DELETE /api/v1/cart/{id}
 */
export async function deleteCartItem(id: string | number) {
    const res = await apiDelete(cartApi.delete, {}, { id });
    return res;
}

/**
 * 批量删除购物车项
 * POST /api/v1/cart/batch-delete
 */
export async function batchDeleteCartItem(ids: Array<string | number>) {
    const res = await apiPost(cartApi.batchDelete, { ids });
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
    const res = await apiPost(orderApi.pay, payload || {}, { id });
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

    const res = await apiPost(paymentApi.callback, body);
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
 * 确认自提/确认收货
 * PUT /api/v1/orders/{id}/confirm
 */
export async function confirmOrder(id: string | number) {
    const res = await apiPut(orderApi.confirm, {}, { id });
    return res;
}

/**
 * 确认自提
 * POST /api/v1/orders/{id}/pickup
 */
export async function confirmPickupOrder(id: string | number) {
    const res = await apiPost(orderApi.confirmPickup, {}, { id });
    return res;
}

/**
 * 申请退款
 * POST /api/v1/orders/{id}/refund
 */
export async function refundOrder(id: string | number, payload?: { reason?: string; amount?: number }) {
    const res = await apiPost(orderApi.refund, payload || {}, { id });
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
    if (Array.isArray(payload.items)) body.items = payload.items;

    const res = await apiPost(orderApi.review, body, { id });
    return res;
}

/**
 * 获取订单评价列表
 * GET /api/v1/orders/{id}/reviews
 */
export async function fetchOrderReviews(id: string | number) {
    const res = await apiGet(orderApi.reviewList, {}, { id });
    const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? []);
    return {
        ...res,
        data: list.map(normalizeReview),
    };
}

// ==================== 退款 API ====================

/**
 * 退货原因数据规范化：兼容 snake_case / PascalCase / camelCase
 */
export function normalizeRefundReason(raw: any): Record<string, any> {
    return {
        id: raw.id ?? raw.Id ?? raw.reasonId ?? raw.reason_id ?? raw.ID ?? raw.code ?? '',
        name: raw.name ?? raw.Name ?? raw.reasonName ?? raw.reason_name ?? raw.title ?? raw.Title ?? raw.label ?? raw.Label ?? '',
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
        'pending': '待处理',
        'processing': '处理中',
        'approved': '已同意',
        'rejected': '已拒绝',
        'refunding': '退款中',
        'refund_rejected': '商家已拒绝',
        'refunded': '已退款',
        'cancelled': '已取消',
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
            1: 'processing',
            2: 'approved',
            3: 'rejected',
            4: 'cancelled',
            5: 'refunding',
            6: 'refund_rejected',
            7: 'refunded',
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

    const items = Array.isArray(raw.items) ? raw.items.map(transformCartItem)
        : (Array.isArray(raw.Items) ? raw.Items.map(transformCartItem)
            : (Array.isArray(raw.refundItems) ? raw.refundItems.map(transformCartItem)
                : (Array.isArray(raw.goodsList) ? raw.goodsList.map(transformCartItem) : [])));

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
    amount: number;
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
        orderId: payload.orderId,
        amount: payload.amount,
    };
    if (payload.type !== undefined) body.type = payload.type;
    if (payload.reasonId !== undefined && payload.reasonId !== null) body.reasonId = payload.reasonId;
    if (payload.reason !== undefined) body.reason = payload.reason;
    if (payload.description !== undefined) body.description = payload.description;
    if (Array.isArray(payload.images)) body.images = payload.images;
    if (Array.isArray(payload.items)) body.items = payload.items;
    if (payload.trackingNo !== undefined) body.trackingNo = payload.trackingNo;
    if (payload.trackingCompany !== undefined) body.trackingCompany = payload.trackingCompany;

    const res = await apiPost(refundApi.apply, body);
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
