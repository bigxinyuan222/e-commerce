import Taro from '@tarojs/taro';
import { fetchOrderPaymentStatus } from '@/api/cart';

/**
 * 微信支付工具模块
 *
 * 支持两端：
 *  - 小程序（WEAPP）：调用 Taro.requestPayment 拉起微信支付（JSAPI）
 *  - H5：
 *    - 微信内置浏览器：通过 WeixinJSBridge.invoke('getBrandWCPayRequest') 拉起支付
 *    - 普通浏览器：通过 mweb_url 跳转微信 H5 支付
 *
 * 后端 POST /api/v1/orders/:id/pay 返回的支付参数（标准微信 JSAPI 6 字段）：
 *   { timeStamp, nonceStr, package, signType, paySign, [prepayId] }
 * H5 支付可能额外返回：{ mwebUrl }
 */

// 微信支付参数（后端返回）
export interface WechatPayParams {
    timeStamp: string;
    nonceStr: string;
    package: string;            // 通常为 "prepay_id=xxx"
    signType: string;          // 'MD5' | 'HMAC-SHA256'
    paySign: string;
    prepayId?: string;
    // H5 支付专用
    mwebUrl?: string;
    // 业务附加字段
    orderNo?: string;
    amount?: number;
    transactionId?: string;
}

// 从后端 payOrder 响应中规范化支付参数（兼容多种字段命名）
export function normalizePayParams(raw: any): WechatPayParams | null {
    if (!raw || typeof raw !== 'object') return null;

    const data = raw.data ?? raw;

    // 兼容 PascalCase / snake_case / camelCase
    const timeStamp = data.timeStamp ?? data.time_stamp ?? data.TimeStamp ?? data.timestamp ?? '';
    const nonceStr = data.nonceStr ?? data.nonce_str ?? data.NonceStr ?? data.noncestr ?? '';
    const pkg = data.package ?? data.Package ?? data.packageStr ?? data.package_str ?? '';
    const signType = data.signType ?? data.sign_type ?? data.SignType ?? 'MD5';
    const paySign = data.paySign ?? data.pay_sign ?? data.PaySign ?? data.signature ?? '';

    // H5 支付跳转链接
    const mwebUrl = data.mwebUrl ?? data.mweb_url ?? data.MwebUrl ?? data.h5_url ?? data.h5Url ?? '';

    const params: WechatPayParams = {
        timeStamp: String(timeStamp),
        nonceStr: String(nonceStr),
        package: String(pkg),
        signType: String(signType),
        paySign: String(paySign),
        mwebUrl: mwebUrl ? String(mwebUrl) : undefined,
        prepayId: data.prepayId ?? data.prepay_id ?? data.PrepayId ?? '',
        orderNo: data.orderNo ?? data.order_no ?? data.OrderNo ?? '',
        amount: Number(data.amount ?? data.Amount ?? 0),
        transactionId: data.transactionId ?? data.transaction_id ?? '',
    };

    // 至少要有 JSAPI 支付的核心 5 字段，或 H5 的 mwebUrl
    const hasJsapiFields = params.timeStamp && params.nonceStr && params.package && params.paySign;
    if (!hasJsapiFields && !params.mwebUrl) {
        console.error('[微信支付] 后端返回的支付参数不完整:', data);
        return null;
    }

    return params;
}

// 判断当前 H5 是否运行在微信浏览器中
function isInWechatBrowser(): boolean {
    if (process.env.TARO_ENV !== 'h5') return false;
    const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
    return /micromessenger/i.test(ua);
}

/**
 * 小程序端：调用 Taro.requestPayment 拉起微信支付
 */
function requestPaymentInWeapp(params: WechatPayParams): Promise<void> {
    return new Promise((resolve, reject) => {
        Taro.requestPayment({
            timeStamp: params.timeStamp,
            nonceStr: params.nonceStr,
            package: params.package,
            signType: params.signType as any,
            paySign: params.paySign,
            success: () => resolve(),
            fail: (err: any) => {
                // 用户取消支付：errMsg = "requestPayment:fail user cancel"
                const errMsg = err?.errMsg || err?.message || '';
                if (/user\s*cancel/i.test(errMsg) || errMsg.includes('cancel')) {
                    reject(new Error('取消支付'));
                } else {
                    console.error('[微信支付] requestPayment 失败:', err);
                    reject(new Error(errMsg || '微信支付失败'));
                }
            },
        } as any);
    });
}

/**
 * H5 微信浏览器内：通过 WeixinJSBridge 拉起 JSAPI 支付
 */
function requestPaymentInWeixinH5(params: WechatPayParams): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof (window as any).WeixinJSBridge === 'undefined') {
            reject(new Error('微信支付环境未就绪，请在微信中打开'));
            return;
        }

        const onBridgeReady = () => {
            (window as any).WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
                    timeStamp: params.timeStamp,
                    nonceStr: params.nonceStr,
                    package: params.package,
                    signType: params.signType,
                    paySign: params.paySign,
                },
                (res: any) => {
                    const errMsg = res?.err_msg || '';
                    if (errMsg.includes('get_brand_wcpay_request:ok')) {
                        resolve();
                    } else if (errMsg.includes('cancel')) {
                        reject(new Error('取消支付'));
                    } else {
                        console.error('[微信支付] H5 JSAPI 支付失败:', res);
                        reject(new Error('微信支付失败'));
                    }
                }
            );
        };

        if ((window as any).WeixinJSBridge) {
            onBridgeReady();
        } else {
            // 监听 WeixinJSBridgeReady 事件
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            // 超时保护
            setTimeout(() => reject(new Error('微信支付环境初始化超时')), 5000);
        }
    });
}

/**
 * H5 普通浏览器：跳转微信 H5 支付（mweb_url）
 * 支付完成后微信会跳回 redirect_url
 */
function requestPaymentInNormalH5(params: WechatPayParams): Promise<void> {
    if (!params.mwebUrl) {
        return Promise.reject(new Error('当前环境不支持微信支付，请在微信中打开'));
    }
    // 拼接 redirect_url（支付完成后跳回当前页）
    const redirectUrl = encodeURIComponent(window.location.href);
    const finalUrl = params.mwebUrl + (params.mwebUrl.includes('?') ? '&' : '?') + `redirect_url=${redirectUrl}`;
    // 跳转到微信支付页
    window.location.href = finalUrl;
    // 跳转后此 Promise 不会 resolve，支付结果由页面再次加载时的轮询确认
    return new Promise(() => { /* 永不 resolve，页面会跳转 */ });
}

/**
 * 发起微信支付（自动适配环境）
 *
 * @param params 从后端获取的支付参数
 * @returns Promise，resolve 表示支付成功，reject 表示取消或失败
 */
export async function requestWechatPayment(params: WechatPayParams): Promise<void> {
    const env = process.env.TARO_ENV;

    if (env === 'weapp' || env === 'alipay' || env === 'tt' || env === 'qq' || env === 'swan') {
        // 小程序端：统一走 Taro.requestPayment
        return requestPaymentInWeapp(params);
    }

    if (env === 'h5') {
        if (isInWechatBrowser()) {
            // 微信浏览器内：JSAPI 支付
            return requestPaymentInWeixinH5(params);
        }
        // 普通浏览器：H5 支付跳转
        return requestPaymentInNormalH5(params);
    }

    // RN 等其他端暂不支持
    throw new Error('当前环境暂不支持微信支付');
}

/**
 * 轮询订单支付状态
 *
 * 微信支付回调有延迟，支付成功后立即查询可能状态未更新，
 * 因此需要轮询几次确认最终状态。
 *
 * @param orderId 订单ID
 * @param options.maxAttempts 最大轮询次数，默认 5 次
 * @param options.interval 轮询间隔毫秒，默认 1500ms
 * @returns 规范化后的支付状态，isPaid 为 true 表示支付成功
 */
export async function pollPaymentStatus(
    orderId: string | number,
    options: { maxAttempts?: number; interval?: number } = {}
): Promise<any> {
    const maxAttempts = options.maxAttempts ?? 5;
    const interval = options.interval ?? 1500;

    let lastStatus: any = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const res = await fetchOrderPaymentStatus(orderId);
            lastStatus = res?.data;
            if (lastStatus?.isPaid) {
                return lastStatus;
            }
        } catch (err) {
            console.warn(`[微信支付] 第 ${attempt} 次查询支付状态失败:`, err);
        }

        if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }

    // 轮询结束仍未确认，返回最后一次状态
    console.warn(`[微信支付] 轮询 ${maxAttempts} 次后仍未确认支付成功，最后状态:`, lastStatus);
    return lastStatus;
}

/**
 * 完整的微信支付流程封装
 *
 * 流程：
 * 1. 调用 payOrder 获取支付参数
 * 2. 拉起微信支付（requestPayment）
 * 3. 支付成功后轮询确认支付状态
 *
 * @param payRes payOrder 的返回值（已 await）
 * @param orderId 订单ID（用于轮询）
 * @param options 轮询选项
 * @returns 支付状态，isPaid 为 true 表示支付成功
 */
export async function executeWechatPayment(
    payRes: any,
    orderId: string | number,
    options: { maxAttempts?: number; interval?: number } = {}
): Promise<any> {
    // 1. 规范化支付参数
    const payParams = normalizePayParams(payRes);
    if (!payParams) {
        throw new Error('获取支付参数失败，请重试');
    }

    console.log('[微信支付] 支付参数:', {
        hasTimeStamp: !!payParams.timeStamp,
        hasNonceStr: !!payParams.nonceStr,
        hasPackage: !!payParams.package,
        signType: payParams.signType,
        hasPaySign: !!payParams.paySign,
        hasMwebUrl: !!payParams.mwebUrl,
    });

    // 2. 拉起微信支付
    await requestWechatPayment(payParams);

    // 3. 轮询确认支付状态（回调有延迟）
    const status = await pollPaymentStatus(orderId, options);
    return status;
}
