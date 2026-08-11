// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
// 小程序端不受 CORS 限制，直接使用完整后端地址
import { apiGet, apiPost } from '@/api/common';

const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

export const authApi = {
    register: `${API_BASE_URL}/auth/register`,// 注册接口
    registerSendCode: `${API_BASE_URL}/auth/registerofsendcode`,// 发送验证码
    login: `${API_BASE_URL}/auth/login`,// 登录接口
    wechatLogin: `${API_BASE_URL}/auth/weixinlogin`,// 微信登录接口
    wechatPhone: `${API_BASE_URL}/auth/weixinphone`,// 获取微信手机号接口
    setPassword: `${API_BASE_URL}/auth/setpassword`,// 设置密码（微信登录绑定手机号后）
    // 重置密码 1：发送验证码 POST /api/v1/auth/resetpassword/sendcode，JSON { phone }
    resetPasswordSendCode: `${API_BASE_URL}/auth/resetpassword/sendcode`,
    // 重置密码 2：校验验证码并设置新密码 POST /api/v1/auth/resetpassword/reset，JSON { phone, code, password }
    resetPassword: `${API_BASE_URL}/auth/resetpassword/reset`
};

export const userApi = {
    profile: `${API_BASE_URL}/user/profile`,         // GET 获取用户信息 / POST 修改用户信息
    updateProfile: `${API_BASE_URL}/user/profile`,    // POST 修改用户信息（显式别名）
    upload: `${API_BASE_URL}/user/upload`            // POST 上传图片（multipart/form-data）
};

export const couponApi = {
    available: `${API_BASE_URL}/coupons/available`,   // GET 可领取优惠券列表
    mine: `${API_BASE_URL}/coupons/mine`,             // GET 我的优惠券列表
    claim: `${API_BASE_URL}/coupons/:id/claim`        // POST 领取优惠券
};

// ==================== 优惠券数据规范化 ====================

/**
 * 安全的数值转换：处理后端可能返回的字符串、null、带单位等情况
 */
function toNumber(val: any): number {
    if (val === null || val === undefined || val === '') return 0;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
        // 移除可能的货币符号、逗号、空格等
        const cleaned = val.replace(/[^\d.\-]/g, '');
        const num = parseFloat(cleaned);
        return isNaN(num) ? 0 : num;
    }
    return 0;
}

/**
 * 规范化优惠券数据：兼容 snake_case / PascalCase / camelCase 字段名
 * 兼容字段：
 *  - id: id / ID / couponId / coupon_id / CouponId
 *  - name: name / Name / couponName / coupon_name / CouponName / title / Title
 *  - type: type / Type / couponType / coupon_type / CouponType (cash|discount|满减|折扣)
 *  - value: value / Value / amount / Amount / denomination / faceValue / face_value
 *  - minAmount: minAmount / min_amount / MinAmount / minConsume / min_consume / threshold
 *  - scope: scope / Scope / useScope / use_scope / applicableScope
 *  - scopeText: scopeText / scope_text / ScopeText / applicableText / description / desc
 *  - categoryId: categoryId / category_id / CategoryId
 *  - productId: productId / product_id / ProductId
 *  - startTime: startTime / start_time / StartTime / beginTime / begin_time / validFrom
 *  - endTime: endTime / end_time / EndTime / expireTime / expire_time / validUntil
 *  - totalCount: totalCount / total_count / TotalCount / total / Total / totalNum
 *  - remainCount: remainCount / remain_count / RemainCount / remaining / left / leftCount
 *  - status: status / Status / state / State / couponStatus (available|used|expired|unclaimed)
 */
export function normalizeCoupon(raw: any): Record<string, any> {
    if (!raw || typeof raw !== 'object') return {};

    // 如果数据被嵌套在 coupon/data/info/item 等字段中，先展开
    let data = raw;
    const nestedKeys = ['coupon', 'couponInfo', 'coupon_info', 'data', 'info', 'item', 'detail'];
    for (const k of nestedKeys) {
        if (raw[k] && typeof raw[k] === 'object' && !Array.isArray(raw[k])) {
            // coupon 类嵌套对象即使只有1个字段也合并（后端常将门槛字段嵌套在 coupon 内）
            // 其他通用嵌套键要求至少2个字段以避免误合并
            const isCouponKey = k === 'coupon' || k === 'couponInfo' || k === 'coupon_info';
            const minKeys = isCouponKey ? 1 : 2;
            if (Object.keys(raw[k]).length >= minKeys) {
                data = { ...raw, ...raw[k] };
                break;
            }
        }
    }

    // 类型字段标准化：兼容中文与英文
    const rawType = data.type ?? data.Type ?? data.couponType ?? data.coupon_type ?? data.CouponType ?? 'cash';
    let normalizedType: 'cash' | 'discount' = 'cash';
    if (typeof rawType === 'string') {
        if (rawType === 'discount' || rawType === '折扣' || rawType === 'discountRate') {
            normalizedType = 'discount';
        } else {
            normalizedType = 'cash';
        }
    }

    // 状态字段标准化：兼容中英文与多种命名
    const rawStatus = data.status ?? data.Status ?? data.state ?? data.State ?? data.couponStatus ?? 'available';
    let normalizedStatus: 'available' | 'used' | 'expired' | 'unclaimed' = 'available';
    if (typeof rawStatus === 'string') {
        const s = rawStatus.toLowerCase();
        if (s === 'expired' || s === '已过期' || s === '2') {
            normalizedStatus = 'expired';
        } else if (s === 'used' || s === '已使用' || s === '1') {
            normalizedStatus = 'used';
        } else if (s === 'unclaimed' || s === '未领取' || s === 'not_claimed' || s === '3') {
            normalizedStatus = 'unclaimed';
        } else {
            normalizedStatus = 'available';
        }
    } else if (typeof rawStatus === 'number') {
        // 后端可能返回数字状态：0=可用 1=已使用 2=已过期 3=未领取
        normalizedStatus = rawStatus === 1 ? 'used'
            : rawStatus === 2 ? 'expired'
            : rawStatus === 3 ? 'unclaimed'
            : 'available';
    }

    // 优惠券面额：兼容各种后端命名
    const couponValue = data.value ?? data.Value
        ?? data.couponValue ?? data.coupon_value
        ?? data.amount ?? data.Amount
        ?? data.reduceAmount ?? data.reduce_amount
        ?? data.discountAmount ?? data.discount_amount
        ?? data.discountValue ?? data.discount_value
        ?? data.parValue ?? data.par_value
        ?? data.offAmount ?? data.off_amount
        ?? data.minusAmount ?? data.minus_amount
        ?? data.denomination ?? data.faceValue ?? data.face_value
        ?? data.price ?? data.Price
        ?? data.reducedAmount ?? data.reduced_amount
        ?? data.cashAmount ?? data.cash_amount
        ?? data.couponAmount ?? data.coupon_amount
        ?? data.promotionAmount ?? data.promotion_amount
        ?? data.discountRate ?? data.discount_rate
        ?? data.discount ?? 0;

    // 使用门槛金额
    const couponMinAmount = data.minAmount ?? data.min_amount ?? data.MinAmount
        ?? data.conditionAmount ?? data.condition_amount
        ?? data.minOrderAmount ?? data.min_order_amount
        ?? data.thresholdAmount ?? data.threshold_amount
        ?? data.consumeAmount ?? data.consume_amount
        ?? data.minConsume ?? data.min_consume
        ?? data.threshold
        ?? data.fullAmount ?? data.full_amount
        ?? data.needAmount ?? data.need_amount
        ?? data.consumeThreshold ?? data.consume_threshold
        ?? data.orderMinAmount ?? data.order_min_amount
        ?? 0;

    // 优惠券名称
    const couponName = data.name ?? data.Name
        ?? data.couponName ?? data.coupon_name
        ?? data.CouponName
        ?? data.couponTitle ?? data.coupon_title
        ?? data.title ?? data.Title
        ?? data.subject ?? data.Subject
        ?? data.couponTitle ?? data.coupon_title
        ?? data.promotionName ?? data.promotion_name
        ?? data.activityName ?? data.activity_name
        ?? data.couponDesc ?? data.coupon_desc
        ?? '';

    // 适用范围文字描述
    const couponScopeText = data.scopeText ?? data.scope_text
        ?? data.ScopeText
        ?? data.applicableText ?? data.applicable_text
        ?? data.description ?? data.desc ?? data.Description ?? data.Desc
        ?? data.useDesc ?? data.use_desc
        ?? data.conditionDesc ?? data.condition_desc
        ?? data.scopeDesc ?? data.scope_desc
        ?? data.useRange ?? data.use_range
        ?? data.applicableRange ?? data.applicable_range
        ?? data.rangeDesc ?? data.range_desc
        ?? data.useNotice ?? data.use_notice
        ?? '全场通用';

    // 开始时间
    const couponStartTime = data.startTime ?? data.start_time
        ?? data.StartTime
        ?? data.beginTime ?? data.begin_time
        ?? data.validFrom ?? data.valid_from
        ?? data.startDate ?? data.start_date
        ?? data.validStart ?? data.valid_start
        ?? data.beginDate ?? data.begin_date
        ?? '';

    // 结束时间
    const couponEndTime = data.endTime ?? data.end_time
        ?? data.EndTime
        ?? data.expireTime ?? data.expire_time
        ?? data.validUntil ?? data.valid_until
        ?? data.endDate ?? data.end_date
        ?? data.validEnd ?? data.valid_end
        ?? data.finishDate ?? data.finish_date
        ?? '';

    // 适用范围类型
    const couponScope = data.scope ?? data.Scope
        ?? data.useScope ?? data.use_scope
        ?? data.applicableScope ?? data.applicable_scope
        ?? data.range ?? data.Range
        ?? 'all';

    // 库存/总数
    const couponTotalCount = data.totalCount ?? data.total_count
        ?? data.TotalCount
        ?? data.total ?? data.Total
        ?? data.totalNum ?? data.total_num
        ?? data.count ?? data.Count
        ?? data.stock ?? data.Stock
        ?? 0;

    // 剩余数量
    const couponRemainCount = data.remainCount ?? data.remain_count
        ?? data.RemainCount
        ?? data.remaining ?? data.Remaining
        ?? data.left ?? data.leftCount ?? data.left_count
        ?? data.stockLeft ?? data.stock_left
        ?? 0;

    const result = {
        id: data.id ?? data.Id ?? data.couponId ?? data.coupon_id ?? data.CouponId ?? data.ID ?? '',
        name: couponName,
        type: normalizedType,
        value: toNumber(couponValue),
        minAmount: toNumber(couponMinAmount),
        scope: couponScope,
        scopeText: couponScopeText,
        categoryId: data.categoryId ?? data.category_id ?? data.CategoryId ?? data.categoryCode ?? null,
        productId: data.productId ?? data.product_id ?? data.ProductId ?? data.productCode ?? null,
        startTime: couponStartTime,
        endTime: couponEndTime,
        totalCount: toNumber(couponTotalCount),
        remainCount: toNumber(couponRemainCount),
        status: normalizedStatus,
        _raw: data,
    };

    // 调试日志：方便排查后端字段名
    if (process.env.NODE_ENV !== 'production') {
        const missingFields: string[] = [];
        if (!result.value) missingFields.push(`value(rawValue=${couponValue})`);
        // 0 是合法值（无门槛券），用 toNumber 统一比较以兼容字符串 "0.00"
        if (!result.minAmount && toNumber(couponMinAmount) !== 0) missingFields.push(`minAmount(raw=${couponMinAmount})`);
        if (!result.name) missingFields.push('name');
        if (missingFields.length > 0) {
            console.warn('[normalizeCoupon] 字段可能未正确匹配:', missingFields.join(', '), '原始数据:', data);
        }
    }

    return result;
}

// ==================== 优惠券 API 方法 ====================

/**
 * 从后端响应中提取优惠券列表，兼容多种数据结构
 */
function extractCouponList(res: any): any[] {
    if (!res) return [];
    const d = res.data ?? res;

    // 可能的列表路径
    const candidates = [
        d,                        // res.data 直接是数组
        d.list,                   // res.data.list
        d.items,                  // res.data.items
        d.coupons,                // res.data.coupons
        d.data,                   // res.data.data
        d.data?.list,             // res.data.data.list
        d.data?.items,            // res.data.data.items
        d.data?.coupons,          // res.data.data.coupons
        d.result,                 // res.data.result
        d.records,                // res.data.records
        d.rows,                   // res.data.rows
        d.list?.data,             // res.data.list.data (分页嵌套)
        d.items?.data,            // res.data.items.data
    ];

    for (const c of candidates) {
        if (Array.isArray(c) && c.length > 0) {
            return c;
        }
    }

    // 兜底：遍历 d 的所有值，找到第一个数组
    if (d && typeof d === 'object') {
        for (const key of Object.keys(d)) {
            if (Array.isArray(d[key]) && d[key].length > 0) {
                return d[key];
            }
        }
    }

    console.warn('[coupon] 未能提取到优惠券列表，原始响应:', res);
    return [];
}

/**
 * 获取可领取优惠券列表
 * GET /api/v1/coupons/available
 */
export async function fetchAvailableCoupons(params: { page?: number; size?: number } = {}) {
    const res = await apiGet(couponApi.available, params);
    const list = extractCouponList(res);
    return {
        ...res,
        data: list.map(normalizeCoupon),
    };
}

/**
 * 获取我的优惠券列表
 * GET /api/v1/coupons/mine
 * @param params.status 可选状态过滤：available|used|expired
 */
export async function fetchMyCoupons(params: { status?: string; page?: number; size?: number } = {}) {
    const res = await apiGet(couponApi.mine, params);
    const list = extractCouponList(res);
    return {
        ...res,
        data: list.map(normalizeCoupon),
    };
}

/**
 * 领取优惠券
 * POST /api/v1/coupons/{id}/claim
 */
export async function claimCoupon(id: string | number) {
    const res = await apiPost(couponApi.claim, {}, { id });
    return res;
}
