import Taro from '@tarojs/taro';

/**
 * 将 ID 字段统一转换为数字类型
 * 后端 Go 通常使用 uint64，要求 JSON 中的 ID 必须是数字而非字符串
 */
export function toNumericId(value: string | number | undefined | null): number {
    if (value === undefined || value === null || value === '') return 0;
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
}

/**
 * 批量转换 body 中指定字段为数字类型
 */
export function normalizeNumericFields(body: Record<string, any>, fields: string[]): Record<string, any> {
    const result: Record<string, any> = { ...body };
    for (const field of fields) {
        if (field in result && result[field] !== undefined && result[field] !== null) {
            result[field] = toNumericId(result[field]);
        }
    }
    return result;
}

function getAuthToken(): string {
    try {
        const user = JSON.parse(Taro.getStorageSync('lxg_user') || '{}');
        return user.token || '';
    } catch {
        return '';
    }
}

function replaceUrlParams(url: string, params: Record<string, string | number>): string {
    let result = url;
    Object.keys(params).forEach(key => {
        result = result.replace(`:${key}`, String(params[key]));
    });
    return result;
}

// 判断是否为认证相关错误
function isAuthError(message: string, statusCode?: number, code?: number): boolean {
    // 排除"解析失败"类错误：token解析失败是 token 格式/解析问题，不是认证失效
    // 误判会导致清除登录态、弹窗跳转登录页，干扰微信登录等需要临时 token 的流程
    if (message && /解析失败|parse\s*fail/i.test(message)) return false;

    const authErrorKeywords = [
        '缺少认证信息',
        '未登录',
        '登录已失效',
        'token expired',
        'token is expired',
        'token过期',
        'token失效',
        'token无效',
        '未授权',
        'unauthorized',
        'Unauthorized',
        '请先登录',
        '认证失败',
    ];
    if (statusCode === 401 || statusCode === 403) return true;
    if (code === 401 || code === 403) return true;
    return authErrorKeywords.some(keyword => message.includes(keyword));
}

// 处理认证错误
function handleAuthError(message: string): void {
    // 检查当前是否有 token（区分"从未登录"和"登录失效"）
    const hasToken = !!getAuthToken();

    if (hasToken) {
        // 有 token 但认证失败 = token 过期，清理登录态
        try {
            Taro.removeStorageSync('lxg_user');
            Taro.removeStorageSync('userInfo');
        } catch { /* ignore */ }
    }

    // 提示用户并跳转登录页（如果当前不在登录页）
    const currentPages = Taro.getCurrentPages();
    const currentRoute = currentPages[currentPages.length - 1]?.route || '';
    const isLoginPage = currentRoute.includes('/pages/user/login/index') || currentRoute === 'pages/user/login/index';

    if (isLoginPage) {
        // 已在登录页，不跳转，避免循环或白屏
        return;
    }

    Taro.showModal({
        title: hasToken ? '登录已失效' : '请先登录',
        content: hasToken ? (message || '请重新登录') : '此操作需要登录账号',
        showCancel: false,
        confirmText: '去登录',
        success: () => {
            Taro.navigateTo({ url: '/pages/user/login/index' });
        }
    });
}

async function apiRequest(url: string, options: {
    method?: string;
    data?: any;
    headers?: Record<string, string>;
    silent?: boolean;
} = {}): Promise<any> {
    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    
    const token = getAuthToken();
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
        console.log('[API Request]', {
            url,
            method: options.method || 'GET',
            data: options.data,
            headers: { ...defaultHeaders, ...(options.headers || {}) }
        });
        const response = await Taro.request({
            url: url,
            method: (options.method || 'GET') as any,
            data: options.data,
            header: {
                ...defaultHeaders,
                ...(options.headers || {})
            },
            timeout: 10000,
        });
        console.log('[API Response]', { url, statusCode: response.statusCode, data: response.data });

        if (response.statusCode === 401) {
            handleAuthError('登录已失效，请重新登录');
            throw new Error('登录已失效，请重新登录');
        }

        // 接受 2xx 系列成功状态码：200 OK、201 Created、202 Accepted、204 No Content
        if (response.statusCode < 200 || response.statusCode >= 300) {
            // 读取后端返回的 message 字段，方便定位错误
            const backendMsg = (response.data as any)?.message || (response.data as any)?.msg;
            const respPreview = typeof response.data === 'object' ? JSON.stringify(response.data).substring(0, 200) : String(response.data).substring(0, 200);
            const errMsg = backendMsg || `[${url}] HTTP error! status: ${response.statusCode}, response: ${respPreview}`;
            console.error('[API Error]', { url, statusCode: response.statusCode, data: response.data });
            const err = new Error(errMsg);
            (err as any).statusCode = response.statusCode;
            (err as any).response = response.data;

            // 如果是认证相关错误，处理登录失效
            if (isAuthError(err.message, response.statusCode)) {
                handleAuthError(err.message);
            }

            throw err;
        }

        // 部分接口 HTTP 200 但业务 code 不为 200（如注册时手机号已存在）
        const respData = response.data as any;
        if (respData && typeof respData.code === 'number' && respData.code !== 200) {
            const backendMsg = respData.message || respData.msg || '请求失败';
            const err = new Error(backendMsg);
            (err as any).code = respData.code;
            (err as any).response = respData;

            // 如果是认证相关错误，处理登录失效
            if (isAuthError(err.message, undefined, respData.code)) {
                handleAuthError(err.message);
            }

            throw err;
        }

        return response.data;
    } catch (error) {
        // 处理 Taro.request 本身抛出的错误（如网络错误、CORS 错误等）
        if (error instanceof Error) {
            // 如果错误消息包含认证相关关键词，也处理登录失效
            if (isAuthError(error.message)) {
                handleAuthError(error.message);
            }
        }
        if (!options.silent) {
            console.error('API Request Error:', error);
        }
        throw error;
    }
}

export async function apiGet(url: string, params: Record<string, any> = {}, pathParams: Record<string, string | number> = {}, silent: boolean = false): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    const searchParams = new URLSearchParams(params);
    const fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');
    return apiRequest(fullUrl, { method: 'GET', silent });
}

export async function apiPost(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}, queryParams: Record<string, string | number> = {}, useFormUrlEncoded: boolean = true, silent: boolean = false, customHeaders: Record<string, string> = {}): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    // URLSearchParams 构造函数要求值为 string，将 number 转换为 string
    const stringQueryParams: Record<string, string> = {};
    Object.keys(queryParams).forEach(key => {
        stringQueryParams[key] = String(queryParams[key]);
    });
    const searchParams = new URLSearchParams(stringQueryParams);
    const fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');

    const headers: Record<string, string> = { ...customHeaders };
    let requestData: any = data;

    if (useFormUrlEncoded) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        requestData = new URLSearchParams(data as any).toString();
    } else {
        headers['Content-Type'] = 'application/json';
        // 显式序列化为 JSON 字符串，避免某些 Taro/微信版本自动序列化行为不一致
        requestData = JSON.stringify(data);
    }

    return apiRequest(fullUrl, {
        method: 'POST',
        data: requestData,
        headers,
        silent
    });
}

export async function apiPut(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'PUT',
        data: data
    });
}

export async function apiDelete(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'DELETE',
        data: data
    });
}

// ==================== 文件上传 ====================

/**
 * 从上传接口响应中提取图片URL，兼容多种字段命名
 */
function extractUploadUrl(respData: any): string {
    if (!respData) return '';
    // 兼容 { data: {...} } / { data: "url" } / 顶层直接含 url 等多种结构
    const container = respData.data ?? respData.result ?? respData;
    if (typeof container === 'string') return container;
    if (!container || typeof container !== 'object') return '';

    const candidates = [
        container.url, container.URL, container.Url,
        container.imageUrl, container.image_url, container.ImageUrl,
        container.avatarUrl, container.avatar_url, container.AvatarUrl,
        container.filePath, container.file_url, container.FileUrl, container.fileUrl,
        container.path, container.Path,
        container.link, container.Link,
        container.src, container.Src,
    ];
    for (const v of candidates) {
        if (typeof v === 'string' && v) return v;
    }
    // 兜底：递归查找第一个以 http 开头的字符串值
    for (const k of Object.keys(container)) {
        const v = container[k];
        if (typeof v === 'string' && /^https?:\/\//i.test(v)) return v;
    }
    return '';
}

/**
 * 上传图片
 * 使用 Taro.uploadFile（multipart/form-data），Taro.request 不支持文件流
 *
 * @param url      上传接口地址，通常传 userApi.upload
 * @param filePath chooseImage 返回的临时文件路径
 * @param name     后端接收文件的表单字段名，默认 "file"
 * @param formData 额外的表单字段
 * @returns 上传后的图片URL字符串；失败抛出 Error
 */
export async function uploadImage(
    url: string,
    filePath: string,
    name: string = 'file',
    formData: Record<string, any> = {}
): Promise<string> {
    const token = getAuthToken();
    const header: Record<string, string> = {};
    if (token) header['Authorization'] = `Bearer ${token}`;

    console.log('[Upload Request]', { url, filePath, name, formData });
    const res = await Taro.uploadFile({
        url,
        filePath,
        name,
        formData,
        header,
        timeout: 30000,
    });
    console.log('[Upload Response]', { statusCode: res.statusCode, data: res.data });

    if (res.statusCode === 401) {
        Taro.removeStorageSync('lxg_user');
        Taro.navigateTo({ url: '/pages/user/login/index' });
        throw new Error('登录已失效，请重新登录');
    }

    if (res.statusCode !== 200) {
        let backendMsg = '';
        try {
            const parsed = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            backendMsg = parsed?.message || parsed?.msg || '';
        } catch { /* ignore */ }
        throw new Error(backendMsg || `上传失败，HTTP状态: ${res.statusCode}`);
    }

    // 解析响应体（uploadFile 的 data 是字符串）
    let respData: any;
    try {
        respData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    } catch {
        // 非JSON：可能直接就是URL文本
        if (typeof res.data === 'string' && /^https?:\/\//i.test(res.data.trim())) {
            return res.data.trim();
        }
        throw new Error('上传响应格式无法识别');
    }

    // 业务 code 校验
    if (respData && typeof respData.code === 'number' && respData.code !== 200) {
        throw new Error(respData.message || respData.msg || '上传失败');
    }

    const imgUrl = extractUploadUrl(respData);
    if (!imgUrl) {
        console.warn('[Upload] 未能从响应中提取到图片URL，原始响应:', respData);
        throw new Error('上传成功但未获取到图片地址');
    }
    return imgUrl;
}

export { getAuthToken };
