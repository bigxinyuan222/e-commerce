// ============================================
// 秒杀模块 API
// 端点：
//   GET  /api/v1/seckill/activities            活动列表
//   GET  /api/v1/seckill/activities/products     指定商品活动
//   POST /api/v1/seckill/purchases              购买秒杀商品
//   GET  /api/v1/seckill/purchases              获取购买秒杀商品的结果
// ============================================

import { apiGet, apiPost, toNumericId } from '@/api/common';

// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
// 小程序端不受 CORS 限制，直接使用完整后端地址
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

// ==================== URL 常量 ====================
export const seckillApi = {
    // 秒杀活动列表 GET
    activities: `${API_BASE_URL}/seckill/activities`,
    // 指定商品活动 GET（query: productId / activityId）
    activityProducts: `${API_BASE_URL}/seckill/activities/products`,
    // 购买秒杀商品 POST / 获取购买结果 GET（共用同一路径）
    purchases: `${API_BASE_URL}/seckill/purchases`,
};

// ==================== 数据转换 ====================

/**
 * 秒杀商品数据规范化：兼容 snake_case / PascalCase / camelCase 字段名
 */
export function normalizeSeckillProduct(raw: any): Record<string, any> {
    if (!raw || typeof raw !== 'object') {
        return {
            id: '', productId: '', productName: '', image: '',
            originalPrice: 0, seckillPrice: 0, stock: 0,
            soldCount: 0, soldPercent: 0, limitCount: 1,
            skuId: '', seckillSkuPriceId: '', activityId: '', raw: null,
        };
    }
    // 处理图片：兼容单个 image 字段和 images 数组
    let image = raw.image ?? raw.Image ?? raw.imageUrl ?? raw.image_url ?? raw.ImageUrl ?? raw.pic ?? raw.Pic ?? '';
    if (!image && Array.isArray(raw.images) && raw.images.length > 0) {
        image = raw.images[0];
    }
    if (!image && Array.isArray(raw.Images) && raw.Images.length > 0) {
        image = raw.Images[0];
    }

    // 兼容 SKU 数组结构：从 skus[0] 读取价格和库存
    const firstSku = Array.isArray(raw.skus) && raw.skus.length > 0 ? raw.skus[0] : null;

    // 判断当前对象是否是活动内商品（活动内商品的 price 通常表示原价，不能作为秒杀价兜底）
    const isActivityProduct = !!(raw.activityId ?? raw.activity_id ?? raw.ActivityId ?? raw.activity);

    // 提取秒杀价：优先使用明确的秒杀价字段
    let seckillPrice = Number(raw.seckillPrice ?? raw.seckill_price ?? raw.SeckillPrice
        ?? raw.seckill_price_cents ?? raw.price_seckill
        ?? raw.activityPrice ?? raw.activity_price ?? raw.ActivityPrice
        ?? raw.flashSalePrice ?? raw.flash_sale_price ?? raw.FlashSalePrice
        ?? (firstSku ? (firstSku.seckill_price ?? firstSku.seckillPrice ?? firstSku.SeckillPrice
            ?? firstSku.activityPrice ?? firstSku.activity_price ?? '') : ''));

    // 如果明确的秒杀价字段为空，再考虑 price 字段：
    // - 单个商品对象（非活动内）的 price 一般就是秒杀价
    // - 活动内商品的 price 通常表示原价，不应用作秒杀价
    if (!seckillPrice && !isActivityProduct) {
        seckillPrice = Number(raw.price ?? raw.Price ?? raw.salePrice ?? raw.sale_price
            ?? raw.currentPrice ?? raw.current_price
            ?? raw.discountPrice ?? raw.discount_price
            ?? (firstSku ? (firstSku.price ?? firstSku.Price ?? '') : ''));
    }

    // 原价提取：不要把秒杀价字段当作原价
    let originalPrice = Number(raw.originalPrice ?? raw.original_price ?? raw.OriginalPrice
        ?? raw.marketPrice ?? raw.market_price ?? raw.MarketPrice
        ?? raw.original_price_cents ?? raw.price_original
        ?? (firstSku ? (firstSku.original_price ?? firstSku.originalPrice ?? '') : ''));

    // 活动内商品：如果 originalPrice 仍为空，price 字段一般表示原价，可作为兜底
    if (!originalPrice && isActivityProduct) {
        originalPrice = Number(raw.price ?? raw.Price
            ?? (firstSku ? (firstSku.price ?? firstSku.Price ?? '') : 0));
    }

    const stock = Number(raw.stock ?? raw.Stock ?? raw.totalStock ?? raw.total_stock ?? raw.TotalStock
        ?? raw.inventory ?? raw.Inventory
        ?? raw.availableStock ?? raw.available_stock
        ?? raw.remainingStock ?? raw.remaining_stock ?? raw.RemainingStock
        ?? raw.seckillStock ?? raw.seckill_stock
        ?? (firstSku ? (firstSku.remaining_stock ?? firstSku.stock ?? firstSku.remainingStock ?? 0) : 0));

    const soldCount = Number(raw.soldCount ?? raw.sold_count ?? raw.SoldCount ?? raw.sold ?? raw.Sold
        ?? raw.sales ?? raw.salesVolume ?? raw.sales_volume
        ?? 0);

    // 已售百分比（后端没返回时本地计算）
    const soldPercent = raw.soldPercent ?? raw.sold_percent ?? raw.SoldPercent
        ?? (stock > 0 ? Math.round((soldCount / (stock + soldCount)) * 100) : 0);

    return {
        id: raw.id ?? raw.Id ?? raw.ID ?? raw.productId ?? raw.product_id ?? raw.ProductId ?? '',
        productId: raw.productId ?? raw.product_id ?? raw.ProductId ?? raw.ProductID ?? raw.pid ?? raw.Pid ?? raw.id ?? '',
        productName: raw.productName ?? raw.product_name ?? raw.ProductName ?? raw.name ?? raw.Name ?? raw.title ?? raw.Title ?? '',
        image,
        originalPrice,
        seckillPrice,
        stock,
        soldCount,
        soldPercent,
        limitCount: Number(raw.limitCount ?? raw.limit_count ?? raw.LimitCount ?? raw.buyLimit ?? raw.buy_limit ?? raw.BuyLimit ?? 1),
        skuId: raw.skuId ?? raw.sku_id ?? raw.SkuId ?? raw.skuID
            ?? (firstSku ? (firstSku.sku_id ?? firstSku.skuId ?? firstSku.id ?? '') : ''),
        seckillSkuPriceId: raw.seckillSkuPriceId ?? raw.seckill_sku_price_id ?? raw.SeckillSKUPriceID
            ?? raw.SeckillSkuPriceId ?? raw.seckillSkuPriceID
            ?? (firstSku ? (firstSku.seckill_sku_price_id ?? firstSku.seckillSkuPriceId ?? firstSku.SeckillSKUPriceID ?? '') : ''),
        activityId: raw.activityId ?? raw.activity_id ?? raw.ActivityId ?? raw.ActivityID ?? '',
        // 附加原始数据，供页面需要时使用
        raw,
    };
}

/**
 * 秒杀活动数据规范化：兼容 snake_case / PascalCase / camelCase 字段名
 */
export function normalizeSeckillActivity(raw: any): Record<string, any> {
    if (!raw || typeof raw !== 'object') {
        return { id: '', name: '限时秒杀', status: 'active', startTime: '', endTime: '', products: [] };
    }
    const products = Array.isArray(raw.products) ? raw.products
        : (Array.isArray(raw.Products) ? raw.Products
            : (Array.isArray(raw.items) ? raw.items
                : (Array.isArray(raw.productList) ? raw.productList : [])));
    return {
        id: raw.id ?? raw.Id ?? raw.ID ?? raw.activityId ?? raw.activity_id ?? raw.ActivityId ?? raw.ActivityID ?? '',
        name: raw.name ?? raw.Name ?? raw.title ?? raw.Title ?? raw.activityName ?? raw.activity_name ?? raw.ActivityName ?? '限时秒杀',
        status: raw.status ?? raw.Status ?? raw.activityStatus ?? raw.activity_status ?? 'active',
        startTime: raw.startTime ?? raw.start_time ?? raw.StartTime ?? raw.beginTime ?? raw.begin_time ?? '',
        endTime: raw.endTime ?? raw.end_time ?? raw.EndTime ?? raw.finishTime ?? raw.finish_time ?? '',
        products: products.map(normalizeSeckillProduct),
    };
}

/**
 * 秒杀购买结果数据规范化：兼容 snake_case / PascalCase / camelCase 字段名
 * 兼容后端返回中文状态文本（如"秒杀成功"）
 */
export function normalizeSeckillPurchase(raw: any): Record<string, any> {
    if (!raw || typeof raw !== 'object') raw = {};
    const rawStatus = raw.status ?? raw.Status ?? raw.purchaseStatus ?? raw.purchase_status ?? raw.result ?? raw.Result;
    let status = rawStatus;
    let statusCode: number | null = null;
    if (typeof rawStatus === 'number') {
        statusCode = rawStatus;
        // 0:处理中 1:成功 2:失败 3:已取消
        const numericMap: { [key: number]: string } = {
            0: 'processing',
            1: 'success',
            2: 'failed',
            3: 'cancelled',
        };
        status = numericMap[rawStatus] ?? 'processing';
    }
    // 兼容后端返回中文状态文本，映射回标准英文状态
    const chineseStatusMap: { [key: string]: string } = {
        '秒杀成功': 'success',
        '秒杀失败': 'failed',
        '处理中': 'processing',
        '等待中': 'processing',
        '排队中': 'processing',
        '已取消': 'cancelled',
        '售罄': 'out_of_stock',
        '已售罄': 'out_of_stock',
    };
    if (typeof status === 'string' && chineseStatusMap[status]) {
        status = chineseStatusMap[status];
    }
    const statusTextMap: { [key: string]: string } = {
        'processing': '处理中',
        'pending': '处理中',
        'success': '成功',
        'succeeded': '成功',
        'paid': '成功',
        'failed': '失败',
        'cancelled': '已取消',
        'canceled': '已取消',
        'out_of_stock': '售罄',
        'out-of-stock': '售罄',
        'sold_out': '售罄',
    };
    return {
        id: raw.id ?? raw.Id ?? raw.ID ?? raw.purchaseId ?? raw.purchase_id ?? raw.PurchaseId ?? raw.orderId ?? raw.order_id ?? '',
        purchaseId: raw.purchaseId ?? raw.purchase_id ?? raw.PurchaseId ?? raw.id ?? raw.Id ?? '',
        // orderId 只从真正的 orderId 字段提取（数据库主键 ID，用于 payOrder / fetchOrderDetail 路径参数）
        orderId: raw.orderId ?? raw.order_id ?? raw.OrderId ?? raw.OrderID ?? '',
        // orderNo 是订单编号（如 202608131520094434），不能用作路径参数 {id}
        orderNo: raw.orderNo ?? raw.order_no ?? raw.OrderNo ?? raw.OrderNO ?? '',
        activityId: raw.activityId ?? raw.activity_id ?? raw.ActivityId ?? raw.ActivityID ?? '',
        productId: raw.productId ?? raw.product_id ?? raw.ProductId ?? raw.ProductID ?? '',
        skuId: raw.skuId ?? raw.sku_id ?? raw.SkuId ?? '',
        quantity: Number(raw.quantity ?? raw.Quantity ?? raw.count ?? raw.Count ?? raw.num ?? 1),
        seckillPrice: Number(raw.seckillPrice ?? raw.seckill_price ?? raw.SeckillPrice ?? raw.price ?? raw.Price ?? 0),
        totalAmount: Number(raw.totalAmount ?? raw.total_amount ?? raw.TotalAmount ?? raw.amount ?? raw.Amount ?? raw.payAmount ?? raw.pay_amount ?? 0),
        status,
        statusCode,
        statusText: raw.statusText ?? raw.status_text ?? raw.StatusText ?? statusTextMap[status as string] ?? status ?? '',
        message: raw.message ?? raw.Message ?? raw.msg ?? raw.Msg ?? raw.remark ?? raw.Remark ?? '',
        createdAt: raw.createdAt ?? raw.created_at ?? raw.CreatedAt ?? raw.createTime ?? raw.create_time ?? raw.CreateTime ?? '',
        paidAt: raw.paidAt ?? raw.paid_at ?? raw.PaidAt ?? raw.payTime ?? raw.pay_time ?? raw.PayTime ?? '',
    };
}

// ==================== API 方法 ====================

/**
 * 获取秒杀活动列表
 * GET /api/v1/seckill/activities
 * @param params 可选：status / page / size（page/size 默认 1/20）
 */
export async function fetchSeckillActivities(params: { status?: string; page?: number; size?: number } = {}) {
    const query: Record<string, any> = {
        page: params.page ?? 1,
        size: params.size ?? 20,
    };
    if (params.status !== undefined) query.status = params.status;

    const res = await apiGet(seckillApi.activities, query);
    // 兼容返回结构：可能是单个活动对象、活动数组、或 {list/records}
    let list: any[] = [];
    if (Array.isArray(res?.data)) {
        list = res.data;
    } else if (res?.data && typeof res.data === 'object') {
        // 单个活动对象（含 products）
        if (res.data.products || res.data.Products || res.data.items) {
            list = [res.data];
        } else {
            list = res.data.list ?? res.data.items ?? res.data.records ?? res.data.activities ?? [];
            if (!Array.isArray(list)) list = [];
        }
    }
    return {
        ...res,
        data: list.map(normalizeSeckillActivity),
    };
}

/**
 * 获取指定商品的秒杀活动
 * GET /api/v1/seckill/activities/products
 * @param params productId 商品ID（可选），activityId 活动ID（可选）
 * 至少需要一个参数
 */
export async function fetchProductSeckillActivity(params: {
    productId?: string | number;
    activityId?: string | number;
}) {
    const query: Record<string, any> = {};
    // 兼容 camelCase 和 snake_case 参数名
    if (params.productId !== undefined && params.productId !== '' && params.productId !== null) {
        query.productId = params.productId;
        query.product_id = params.productId;
    }
    if (params.activityId !== undefined && params.activityId !== '' && params.activityId !== null) {
        query.activityId = params.activityId;
        query.activity_id = params.activityId;
    }

    const res = await apiGet(seckillApi.activityProducts, query);
    if (res?.data) {
        // 返回可能是单个商品活动对象或数组
        const data = res.data;
        if (Array.isArray(data)) {
            return { ...res, data: data.map(normalizeSeckillProduct) };
        }
        // 单个对象：可能直接是商品活动，或包含 activity/products 嵌套
        if (data.products || data.Products) {
            return { ...res, data: normalizeSeckillActivity(data) };
        }
        return { ...res, data: normalizeSeckillProduct(data) };
    }
    return res;
}

/**
 * 生成秒杀请求唯一标识 request_no（前端随机字符串）
 * 用于幂等性控制：同一 request_no 只能秒杀成功一次，避免重复扣减库存
 */
export function generateSeckillRequestNo(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    return `sk_${timestamp}_${random}`;
}

/**
 * 购买秒杀商品
 * POST /api/v1/seckill/purchases
 * 参数使用 snake_case：activity_id / seckill_sku_price_id / store_id / request_no / quantity
 * 后端使用 JSON 绑定（useFormUrlEncoded: false），数字字段为 uint64
 *
 * 返回值说明：
 *   - accepted: false 表示同步处理完成（data 中直接包含结果）
 *   - accepted: true  表示后端返回 202 "等待秒杀结果"，需调用 fetchSeckillPurchaseResult 查询结果
 */
export async function createSeckillPurchase(payload: {
    activityId: string | number;
    seckillSkuPriceId: string | number;
    storeId: string | number;
    requestNo: string;
    quantity: number;
}) {
    const body: Record<string, any> = {
        activity_id: toNumericId(payload.activityId),
        seckill_sku_price_id: toNumericId(payload.seckillSkuPriceId),
        store_id: toNumericId(payload.storeId),
        request_no: payload.requestNo,
        quantity: payload.quantity,
    };

    console.log('[秒杀购买] 请求体:', JSON.stringify(body));

    try {
        const res = await apiPost(seckillApi.purchases, body, {}, {}, false, true);
        // HTTP 200 + 业务 code 200：同步处理完成
        if (res?.data) {
            return { ...res, data: normalizeSeckillPurchase(res.data), accepted: false };
        }
        return { ...res, accepted: false };
    } catch (error: any) {
        const code = error?.code;
        const statusCode = error?.statusCode;
        const errMsg = String(error?.message || '');
        const respData = error?.response;

        // 202 状态码（HTTP 202 或业务 code 202）：表示"等待秒杀结果"，需轮询查询
        if (code === 202 || statusCode === 202) {
            console.log('[秒杀购买] 返回202，等待秒杀结果，request_no:', payload.requestNo);
            return {
                code: 202,
                message: '等待秒杀结果',
                data: respData?.data ? normalizeSeckillPurchase(respData.data) : {},
                accepted: true,
            };
        }

        // 后端秒杀成功时可能用非200 code + message="秒杀成功"返回，被 apiRequest 当作错误抛出
        // 此处识别"成功"语义，转为同步成功返回（accepted: false），直接进入支付流程
        if (errMsg.includes('成功') || /succe/i.test(errMsg)) {
            const rawData = (respData && typeof respData === 'object') ? (respData.data ?? respData) : {};
            const normalized = normalizeSeckillPurchase({
                ...rawData,
                status: rawData.status ?? 'success',
                message: errMsg,
            });
            console.log('[秒杀购买] 识别到同步成功响应（被当作错误抛出），已转为成功返回:', normalized);
            return {
                code: 200,
                message: errMsg,
                data: normalized,
                accepted: false,
            };
        }

        throw error;
    }
}

/**
 * 获取秒杀购买结果
 * GET /api/v1/seckill/purchases
 * @param params.requestNo 创建秒杀购买时前端生成的 request_no（用于关联查询结果）
 *
 * 注意：后端在秒杀成功时可能返回非200业务code或非2xx HTTP状态码，
 * 但 message 为"秒杀成功"。apiRequest 会把它当作错误抛出，
 * 此处需捕获并识别这种"成功的错误"，转为正常成功返回。
 */
export async function fetchSeckillPurchaseResult(params: {
    requestNo: string;
}) {
    const query: Record<string, any> = {
        request_no: params.requestNo,
    };

    try {
        const res = await apiGet(seckillApi.purchases, query, {}, true);
        if (res?.data) {
            const data = res.data;
            if (Array.isArray(data)) {
                return { ...res, data: data.map(normalizeSeckillPurchase) };
            }
            return { ...res, data: normalizeSeckillPurchase(data) };
        }
        return res;
    } catch (error: any) {
        const errMsg = String(error?.message || '');
        const respData = error?.response;

        // 后端秒杀成功时可能用非200 code + message="秒杀成功"返回，被 apiRequest 当作错误抛出
        // 此处识别"成功"语义，转为正常成功返回，避免轮询中断
        if (errMsg.includes('成功') || /succe/i.test(errMsg)) {
            const rawData = (respData && typeof respData === 'object') ? (respData.data ?? respData) : {};
            const normalized = normalizeSeckillPurchase({
                ...rawData,
                status: rawData.status ?? 'success',
                message: errMsg,
            });
            console.log('[秒杀结果] 识别到成功响应（被当作错误抛出），已转为成功返回:', normalized);
            return {
                code: 200,
                message: errMsg,
                data: normalized,
            };
        }

        // 其他错误（如"秒杀请求不存在"、"秒杀失败"等）正常抛出
        throw error;
    }
}

/**
 * 轮询获取秒杀购买结果（秒杀通常为异步扣减库存）
 * @param requestNo 秒杀请求唯一标识（前端生成的 request_no）
 * @param options.interval 轮询间隔(ms)，默认 1500
 * @param options.timeout  超时时间(ms)，默认 15000
 * @returns 最终购买结果（status 为 success/failed 等终态时返回）
 */
export async function pollSeckillPurchaseResult(
    requestNo: string,
    options: { interval?: number; timeout?: number } = {}
): Promise<Record<string, any>> {
    const interval = options.interval ?? 1500;
    const timeout = options.timeout ?? 15000;
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
        const poll = async () => {
            if (Date.now() - startTime > timeout) {
                reject(new Error('秒杀结果查询超时，请稍后在订单中查看'));
                return;
            }
            try {
                const res = await fetchSeckillPurchaseResult({ requestNo });
                const result = res?.data ?? {};
                const status = String(result.status ?? '');
                // 终态：成功 / 失败 / 取消 / 售罄
                const isTerminal = ['success', 'succeeded', 'paid', 'failed', 'cancelled', 'canceled', 'out_of_stock', 'out-of-stock', 'sold_out'].includes(status);
                if (isTerminal) {
                    resolve(result);
                } else {
                    setTimeout(poll, interval);
                }
            } catch (error: any) {
                const errMsg = String(error?.message || '');
                // "秒杀请求不存在"可能是竞态条件（GET比POST处理更快到达后端），重试而非直接失败
                if (errMsg.includes('不存在') || errMsg.includes('not found') || /not\s*exist/i.test(errMsg)) {
                    console.warn('[秒杀轮询] 请求暂未找到，稍后重试:', errMsg);
                    setTimeout(poll, interval);
                } else {
                    reject(error);
                }
            }
        };
        poll();
    });
}
