import Taro from '@tarojs/taro';

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

async function apiRequest(url: string, options: {
    method?: string;
    data?: any;
    headers?: Record<string, string>;
} = {}): Promise<any> {
    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
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
            Taro.removeStorageSync('lxg_user');
            Taro.navigateTo({ url: '/pages/user/login/index' });
            throw new Error('登录已失效，请重新登录');
        }

        if (response.statusCode !== 200) {
            // 读取后端返回的 message 字段，方便定位错误
            const backendMsg = (response.data as any)?.message || (response.data as any)?.msg;
            const err = new Error(backendMsg || `HTTP error! status: ${response.statusCode}`);
            (err as any).statusCode = response.statusCode;
            (err as any).response = response.data;
            throw err;
        }

        // 部分接口 HTTP 200 但业务 code 不为 200（如注册时手机号已存在）
        const respData = response.data as any;
        if (respData && typeof respData.code === 'number' && respData.code !== 200) {
            const backendMsg = respData.message || respData.msg || '请求失败';
            const err = new Error(backendMsg);
            (err as any).code = respData.code;
            (err as any).response = respData;
            throw err;
        }

        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

export async function apiGet(url: string, params: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    const searchParams = new URLSearchParams(params);
    const fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');
    return apiRequest(fullUrl, { method: 'GET' });
}

export async function apiPost(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}, queryParams: Record<string, any> = {}, useFormUrlEncoded: boolean = false): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    const searchParams = new URLSearchParams(queryParams);
    const fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');
    
    const headers: Record<string, string> = {};
    let requestData: any = data;
    
    if (useFormUrlEncoded) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        requestData = new URLSearchParams(data as any).toString();
    }
    
    return apiRequest(fullUrl, {
        method: 'POST',
        data: requestData,
        headers
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

export { getAuthToken };
