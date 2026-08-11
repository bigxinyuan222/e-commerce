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
        const stored = Taro.getStorageSync('lxg_user');
        if (!stored) return '';
        const parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
        return parsed?.token ?? parsed?.Token ?? parsed?.accessToken ?? '';
    } catch (error) {
        console.error('[getAuthToken] 读取登录态失败:', error);
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

// 将 HTTP 状态码转换为用户友好的提示（不暴露 URL、技术细节）
function friendlyHttpError(statusCode: number): string {
    switch (statusCode) {
        case 400: return '请求参数有误';
        case 401: return '登录已失效，请重新登录';
        case 403: return '暂无权限执行此操作';
        case 404: return '接口暂未实现或已移除';
        case 405: return '请求方式不支持';
        case 408: return '请求超时，请稍后重试';
        case 409: return '操作冲突，请刷新后重试';
        case 413: return '提交数据过大';
        case 429: return '操作过于频繁，请稍后再试';
        case 500: return '服务异常，请稍后重试';
        case 501: return '服务暂未实现';
        case 502: return '服务网关异常';
        case 503: return '服务暂时不可用，请稍后重试';
        case 504: return '网关超时，请稍后重试';
        default: return statusCode >= 500 ? '服务异常，请稍后重试' : '请求失败，请稍后重试';
    }
}

// 美化网络层错误（Taro.request 抛出的 request:fail xxx）
function friendlyNetworkError(message: string, url?: string): string {
    if (!message) return '网络异常，请稍后重试';
    const lower = message.toLowerCase();
    if (lower.includes('timeout') || lower.includes('请求超时')) return '请求超时，请检查网络后重试';
    if (lower.includes('abort')) return '请求已取消';
    if (lower.includes('invalid url') || lower.includes('600009')) return '请求地址异常';
    if (lower.includes('not in domain list') || lower.includes('url not in domain')) return '请在后台配置合法域名';
    if (lower.includes('network') || lower.includes('网络')) return '网络异常，请检查网络连接';
    if (lower.includes('fail')) return '网络请求失败，请稍后重试';
    return message;
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

// 登录弹窗全局去重标志，避免同一页面多个接口并发时重复弹窗
let isLoginModalShowing = false;

// 处理认证错误
function handleAuthError(message: string): void {
    // 如果当前已有登录弹窗显示中，直接忽略，避免重复弹窗
    if (isLoginModalShowing) return;

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

    isLoginModalShowing = true;
    Taro.showModal({
        title: hasToken ? '登录已失效' : '请先登录',
        content: hasToken ? (message || '请重新登录') : '此操作需要登录账号',
        showCancel: false,
        confirmText: '去登录',
        success: () => {
            Taro.navigateTo({ url: '/pages/user/login/index' });
        },
        complete: () => {
            isLoginModalShowing = false;
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
            // 控制台输出完整调试信息（含 URL、状态码、响应内容）
            console.error('[API Error]', { url, statusCode: response.statusCode, data: response.data });
            // 抛给用户的错误信息：优先用后端 message，否则用友好提示（不暴露 URL 等技术细节）
            const errMsg = backendMsg || friendlyHttpError(response.statusCode);
            const err = new Error(errMsg);
            (err as any).statusCode = response.statusCode;
            (err as any).response = response.data;
            (err as any).rawUrl = url;

            // 如果是认证相关错误，处理登录失效
            // 注意：silent=true 时（如商品详情页静默拉取 AI 评价摘要）不弹窗跳转登录页，
            // 否则未登录用户浏览商品时会被 AI 接口的 401 弹窗打断
            if (isAuthError(err.message, response.statusCode) && !options.silent) {
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
            // silent=true 时（如商品 AI 评价摘要等可选数据）不弹窗跳转登录页
            if (isAuthError(err.message, undefined, respData.code) && !options.silent) {
                handleAuthError(err.message);
            }

            throw err;
        }

        return response.data;
    } catch (error) {
        // 处理 Taro.request 本身抛出的错误（如网络错误、CORS 错误等）
        const rawErrMsg = (error as any)?.errMsg || (error as any)?.message || String(error);
        const errno = (error as any)?.errno;
        if (!options.silent) {
            console.error('[API Network Error]', { url, rawErrMsg, errno, error });
        }
        if (error instanceof Error) {
            // 如果错误消息包含认证相关关键词，也处理登录失效
            // silent=true 时不弹窗（与上面业务/HTTP 错误处理保持一致）
            if (isAuthError(error.message) && !options.silent) {
                handleAuthError(error.message);
            }
            // 美化网络层错误信息（如 request:fail timeout、request:fail invalid url 等）
            error.message = friendlyNetworkError(error.message, url);
        }
        throw error;
    }
}

export async function apiGet(url: string, params: Record<string, any> = {}, pathParams: Record<string, string | number> = {}, silent: boolean = false): Promise<any> {
    if (!url) {
        const err = new Error(`[apiGet] 请求地址缺失，请检查调用方是否传入了未定义的 API URL`);
        console.error(err);
        console.error('[apiGet] 调用栈:', new Error().stack);
        throw err;
    }
    const resolvedUrl = replaceUrlParams(url, pathParams);
    const searchParams = new URLSearchParams(params);
    const fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');
    return apiRequest(fullUrl, { method: 'GET', silent });
}

export async function apiPost(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}, queryParams: Record<string, string | number> = {}, useFormUrlEncoded: boolean = true, silent: boolean = false, customHeaders: Record<string, string> = {}): Promise<any> {
    if (!url) {
        const err = new Error(`[apiPost] 请求地址缺失，请检查调用方是否传入了未定义的 API URL`);
        console.error(err);
        console.error('[apiPost] 调用栈:', new Error().stack);
        throw err;
    }
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
        // 直接传对象，让 Taro.request 根据 Content-Type 自动序列化
        // 手动 JSON.stringify 在小程序端可能被 Taro 二次处理导致格式异常
        requestData = data;
    }

    return apiRequest(fullUrl, {
        method: 'POST',
        data: requestData,
        headers,
        silent
    });
}

export async function apiPut(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    if (!url) {
        const err = new Error(`[apiPut] 请求地址缺失，请检查调用方是否传入了未定义的 API URL`);
        console.error(err);
        throw err;
    }
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'PUT',
        data: data
    });
}

export async function apiDelete(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    if (!url) {
        const err = new Error(`[apiDelete] 请求地址缺失，请检查调用方是否传入了未定义的 API URL`);
        console.error(err);
        throw err;
    }
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
 * 上传前对图片进行压缩处理
 * 小程序端：先用 getFileInfo 获取大小，超过阈值则调用 compressImage 压缩
 * H5 端：chooseImage 已通过 sizeType:['compressed'] 处理，此处跳过
 *
 * @param filePath 原始临时文件路径
 * @param maxSize  触发压缩的大小阈值（字节），默认 2MB
 * @returns 压缩后的文件路径（无需压缩时返回原路径）
 */
async function compressIfNeeded(filePath: string, maxSize: number = 1024 * 1024): Promise<string> {
    // H5 端 getFileInfo/compressImage 支持有限，直接返回原路径
    if (process.env.TARO_ENV === 'h5') return filePath;
    try {
        const info: any = await Taro.getFileInfo({ filePath });
        const fileSize: number = info?.size ?? 0;
        console.log('[Upload] 原始文件大小:', fileSize, 'bytes');
        if (fileSize <= maxSize) return filePath;
        const compressed = await Taro.compressImage({ src: filePath, quality: 50 });
        console.log('[Upload] 压缩后路径:', compressed.tempFilePath);
        return compressed.tempFilePath;
    } catch (e) {
        console.warn('[Upload] 获取文件信息或压缩失败，使用原文件:', e);
        return filePath;
    }
}

/**
 * 从文件路径中提取扩展名，兜底返回 .jpg
 */
function getFileExtension(filePath: string): string {
    const match = filePath.match(/\.(\w+)(?:\?|$)/);
    const ext = match ? match[1].toLowerCase() : '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext)) {
        return ext === 'jpeg' ? '.jpg' : `.${ext}`;
    }
    // 压缩后的临时文件通常没有扩展名，compressImage 输出为 JPEG
    return '.jpg';
}

/**
 * 确保文件路径有图片扩展名
 * 微信小程序 chooseImage/compressImage 返回的临时文件路径可能无扩展名（如 wxfile://tmp_xxx），
 * 后端从文件名提取扩展名校验格式时会报"图片格式或大小不正确"。
 * 通过 FileSystemManager.copyFile 复制到带扩展名的路径解决。
 */
async function ensureFileExtension(filePath: string): Promise<string> {
    // 已有图片扩展名则直接返回
    if (/\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filePath)) return filePath;

    // #ifdef WEAPP
    try {
        const ext = getFileExtension(filePath);
        const userDataPath = (Taro as any).env?.USER_DATA_PATH;
        if (!userDataPath) return filePath;
        const newPath = `${userDataPath}/upload_${Date.now()}${ext}`;
        const fs = Taro.getFileSystemManager();
        await new Promise<void>((resolve, reject) => {
            fs.copyFile({
                srcPath: filePath,
                destPath: newPath,
                success: () => resolve(),
                fail: reject
            });
        });
        console.log('[Upload] 文件已复制到带扩展名的路径:', newPath);
        return newPath;
    } catch (e) {
        console.warn('[Upload] 复制文件失败，使用原路径:', e);
        return filePath;
    }
    // #endif

    // #ifndef WEAPP
    return filePath;
    // #endif
}

/**
 * 上传图片
 * 使用 Taro.uploadFile（multipart/form-data），Taro.request 不支持文件流
 * 上传前会自动检查文件大小，超过 2MB 时压缩以避免后端"图片格式或大小不正确"错误
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

    // 上传前压缩，避免文件过大被后端拒绝
    let uploadPath = await compressIfNeeded(filePath);
    // 确保文件路径有图片扩展名，避免后端无法识别格式（微信小程序临时文件常无扩展名）
    uploadPath = await ensureFileExtension(uploadPath);

    // 显式指定 fileName，确保后端能从 Content-Disposition 中识别文件扩展名
    // 微信小程序临时文件路径常无扩展名（如 wxfile://tmp_xxx），导致后端校验格式失败
    const fileName = `upload${getFileExtension(filePath)}`;

    console.log('[Upload Request]', { url, filePath: uploadPath, fileName, name, formData });
    const res = await Taro.uploadFile({
        url,
        filePath: uploadPath,
        name,
        fileName,
        formData,
        header,
        timeout: 30000,
    } as any);
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

    // 业务 code 校验（兼容 code/Code/errcode/errno 等字段名）
    const bizCode = respData?.code ?? respData?.Code ?? respData?.errcode ?? respData?.errno;
    if (typeof bizCode === 'number' && bizCode !== 200 && bizCode !== 0) {
        console.error('[Upload] 后端业务错误，完整响应:', respData);
        throw new Error(respData.message || respData.msg || respData.Message || respData.errMsg || '上传失败');
    }

    const imgUrl = extractUploadUrl(respData);
    if (!imgUrl) {
        console.warn('[Upload] 未能从响应中提取到图片URL，原始响应:', respData);
        throw new Error('上传成功但未获取到图片地址');
    }
    return imgUrl;
}

export { getAuthToken };
