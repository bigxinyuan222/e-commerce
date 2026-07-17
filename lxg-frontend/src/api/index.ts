const API_BASE_URL = '/api/v1';

const API_CONFIG = {
    auth: {
        register: `${API_BASE_URL}/auth/register`,
        login: `${API_BASE_URL}/auth/login`,
        wechatLogin: `${API_BASE_URL}/auth/wechat-login`,
        setPassword: `${API_BASE_URL}/auth/set-password`
    },
    user: {
        profile: `${API_BASE_URL}/user/profile`
    },
    home: {
        banners: `${API_BASE_URL}/home/banners`,
        recommendations: `${API_BASE_URL}/home/recommendations`,
        seckillActivities: `${API_BASE_URL}/home/seckill-activities`
    },
    categories: {
        list: `${API_BASE_URL}/categories`,
        products: `${API_BASE_URL}/categories/:id/products`
    },
    brands: {
        list: `${API_BASE_URL}/brands`,
        products: `${API_BASE_URL}/brands/:id/products`
    },
    products: {
        detail: `${API_BASE_URL}/products/:id`,
        search: `${API_BASE_URL}/products/search`
    },
    reviews: {
        list: `${API_BASE_URL}/products/:id/reviews`,
        stats: `${API_BASE_URL}/products/:id/reviews/stats`,
        summary: `${API_BASE_URL}/products/:id/reviews/summary`,
        submit: `${API_BASE_URL}/reviews`,
        replies: `${API_BASE_URL}/reviews/:id/replies`,
        reply: `${API_BASE_URL}/reviews/:id/replies`,
        like: `${API_BASE_URL}/reviews/like`
    },
    cart: {
        list: `${API_BASE_URL}/cart`,
        add: `${API_BASE_URL}/cart`,
        update: `${API_BASE_URL}/cart/:id`,
        delete: `${API_BASE_URL}/cart/:id`,
        batchDelete: `${API_BASE_URL}/cart/batch-delete`
    },
    orders: {
        submit: `${API_BASE_URL}/orders`,
        list: `${API_BASE_URL}/orders`,
        detail: `${API_BASE_URL}/orders/:id`,
        cancel: `${API_BASE_URL}/orders/:id/cancel`,
        confirm: `${API_BASE_URL}/orders/:id/confirm`
    },
    refunds: {
        reasonList: `${API_BASE_URL}/refund-reasons`,
        apply: `${API_BASE_URL}/refunds`,
        detail: `${API_BASE_URL}/refunds/:id`
    },
    coupons: {
        available: `${API_BASE_URL}/coupons/available`,
        mine: `${API_BASE_URL}/coupons/mine`,
        claim: `${API_BASE_URL}/coupons/:id/claim`
    },
    seckill: {
        activities: `${API_BASE_URL}/seckill/activities`,
        activityProducts: `${API_BASE_URL}/seckill/activities/:id/products`,
        productDetail: `${API_BASE_URL}/seckill/activities/:id/products/:product_id`
    },
    stores: {
        list: `${API_BASE_URL}/stores`
    },
    service: {
        conversation: `${API_BASE_URL}/conversations`,
        conversations: `${API_BASE_URL}/conversations`,
        messages: `${API_BASE_URL}/conversations/:id/messages`,
        sendMessage: `${API_BASE_URL}/conversations/:id/messages`
    },
    notifications: {
        list: `${API_BASE_URL}/notifications`,
        unreadCount: `${API_BASE_URL}/notifications/unread-count`,
        read: `${API_BASE_URL}/notifications/:id/read`,
        readAll: `${API_BASE_URL}/notifications/read-all`
    }
};

function getAuthToken(): string {
    const user = JSON.parse(localStorage.getItem('lxg_user') || '{}');
    return user.token || '';
}

function replaceUrlParams(url: string, params: Record<string, string | number>): string {
    let result = url;
    Object.keys(params).forEach(key => {
        result = result.replace(`:${key}`, String(params[key]));
    });
    return result;
}

async function apiRequest(url: string, options: RequestInit = {}): Promise<any> {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        credentials: 'include'
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };

    try {
        const response = await fetch(url, mergedOptions);
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('lxg_user');
                location.href = '/pages/user/login/index';
                throw new Error('登录已失效，请重新登录');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
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

export async function apiPost(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export async function apiPut(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export async function apiDelete(url: string, data: Record<string, any> = {}, pathParams: Record<string, string | number> = {}): Promise<any> {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'DELETE',
        body: JSON.stringify(data)
    });
}

export { API_CONFIG, getAuthToken };