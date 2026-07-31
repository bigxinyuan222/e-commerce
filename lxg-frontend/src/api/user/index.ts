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
    wechatLogin: `${API_BASE_URL}/auth/wechat-login`,
    setPassword: `${API_BASE_URL}/auth/setpassword`// 微信登录后设置密码
};

export const userApi = {
    profile: `${API_BASE_URL}/user/profile`,         // GET 获取用户信息 / PUT 修改用户信息
    updateProfile: `${API_BASE_URL}/user/profile`     // PUT 修改用户信息（显式别名）
};

export const couponApi = {
    available: `${API_BASE_URL}/coupons/available`,   // GET 可领取优惠券列表
    mine: `${API_BASE_URL}/coupons/mine`,             // GET 我的优惠券列表
    claim: `${API_BASE_URL}/coupons/:id/claim`        // POST 领取优惠券
};

// ==================== 优惠券数据规范化 ====================

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

    // 类型字段标准化：兼容中文与英文
    const rawType = raw.type ?? raw.Type ?? raw.couponType ?? raw.coupon_type ?? raw.CouponType ?? 'cash';
    let normalizedType: 'cash' | 'discount' = 'cash';
    if (typeof rawType === 'string') {
        if (rawType === 'discount' || rawType === '折扣' || rawType === 'discountRate') {
            normalizedType = 'discount';
        } else {
            normalizedType = 'cash';
        }
    }

    // 状态字段标准化：兼容中英文与多种命名
    const rawStatus = raw.status ?? raw.Status ?? raw.state ?? raw.State ?? raw.couponStatus ?? 'available';
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

    return {
        id: raw.id ?? raw.Id ?? raw.couponId ?? raw.coupon_id ?? raw.CouponId ?? raw.ID ?? '',
        name: raw.name ?? raw.Name ?? raw.couponName ?? raw.coupon_name ?? raw.CouponName ?? raw.title ?? raw.Title ?? '',
        type: normalizedType,
        value: Number(raw.value ?? raw.Value ?? raw.amount ?? raw.Amount ?? raw.denomination ?? raw.faceValue ?? raw.face_value ?? raw.discount ?? 0),
        minAmount: Number(raw.minAmount ?? raw.min_amount ?? raw.MinAmount ?? raw.minConsume ?? raw.min_consume ?? raw.threshold ?? raw.fullAmount ?? raw.full_amount ?? 0),
        scope: raw.scope ?? raw.Scope ?? raw.useScope ?? raw.use_scope ?? raw.applicableScope ?? 'all',
        scopeText: raw.scopeText ?? raw.scope_text ?? raw.ScopeText ?? raw.applicableText ?? raw.description ?? raw.desc ?? raw.Description ?? raw.Desc ?? '全场通用',
        categoryId: raw.categoryId ?? raw.category_id ?? raw.CategoryId ?? raw.categoryCode ?? null,
        productId: raw.productId ?? raw.product_id ?? raw.ProductId ?? raw.productCode ?? null,
        startTime: raw.startTime ?? raw.start_time ?? raw.StartTime ?? raw.beginTime ?? raw.begin_time ?? raw.validFrom ?? raw.valid_from ?? '',
        endTime: raw.endTime ?? raw.end_time ?? raw.EndTime ?? raw.expireTime ?? raw.expire_time ?? raw.validUntil ?? raw.valid_until ?? '',
        totalCount: Number(raw.totalCount ?? raw.total_count ?? raw.TotalCount ?? raw.total ?? raw.Total ?? raw.totalNum ?? raw.total_num ?? 0),
        remainCount: Number(raw.remainCount ?? raw.remain_count ?? raw.RemainCount ?? raw.remaining ?? raw.left ?? raw.leftCount ?? raw.left_count ?? 0),
        status: normalizedStatus,
        // 原始字段保留，方便扩展
        _raw: raw,
    };
}

// ==================== 优惠券 API 方法 ====================

/**
 * 获取可领取优惠券列表
 * GET /api/v1/coupons/available
 */
export async function fetchAvailableCoupons(params: { page?: number; size?: number } = {}) {
    const res = await apiGet(couponApi.available, params);
    const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? res?.data?.coupons ?? []);
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
    const list = Array.isArray(res?.data) ? res.data : (res?.data?.list ?? res?.data?.items ?? res?.data?.coupons ?? []);
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
