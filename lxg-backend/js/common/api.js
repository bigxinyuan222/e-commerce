const API_BASE_URL = '/api/admin/v1';

const API_CONFIG = {
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        logout: `${API_BASE_URL}/auth/logout`,
        info: `${API_BASE_URL}/auth/info`
    },
    returns: {
        list: `${API_BASE_URL}/refunds`,
        detail: `${API_BASE_URL}/refunds/:id`,
        approve: `${API_BASE_URL}/refunds/:id/audit`,
        reject: `${API_BASE_URL}/refunds/:id/audit`,
        confirmRefund: `${API_BASE_URL}/refunds/:id/confirm-refund`,
        reasonList: `${API_BASE_URL}/refund-reasons`,
        reasonAdd: `${API_BASE_URL}/refund-reasons`,
        reasonEdit: `${API_BASE_URL}/refund-reasons/:id`,
        reasonDelete: `${API_BASE_URL}/refund-reasons/:id`
    },
    coupons: {
        list: `${API_BASE_URL}/coupons`,
        detail: `${API_BASE_URL}/coupons/:id`,
        add: `${API_BASE_URL}/coupons`,
        edit: `${API_BASE_URL}/coupons/:id`,
        toggle: `${API_BASE_URL}/coupons/:id/toggle`,
        records: `${API_BASE_URL}/coupons/:id/records`
    },
    notification: {
        list: `${API_BASE_URL}/notifications`,
        detail: `${API_BASE_URL}/notifications/:id`,
        add: `${API_BASE_URL}/notifications`,
        delete: `${API_BASE_URL}/notifications/:id`
    },
    orders: {
        list: `${API_BASE_URL}/orders`,
        detail: `${API_BASE_URL}/orders/:id`,
        cancel: `${API_BASE_URL}/orders/:id/cancel`,
        ship: `${API_BASE_URL}/orders/:id/ship`
    },
    goods: {
        list: `${API_BASE_URL}/products`,
        detail: `${API_BASE_URL}/products/:id`,
        add: `${API_BASE_URL}/products`,
        edit: `${API_BASE_URL}/products/:id`,
        delete: `${API_BASE_URL}/products/:id`,
        toggle: `${API_BASE_URL}/products/:id/toggle`,
        batch: `${API_BASE_URL}/products/batch`
    },
    users: {
        list: `${API_BASE_URL}/users`,
        detail: `${API_BASE_URL}/users/:id`,
        toggle: `${API_BASE_URL}/users/:id/toggle`
    },
    stats: {
        dashboard: `${API_BASE_URL}/stats/dashboard`,
        products: `${API_BASE_URL}/stats/products`
    },
    reviews: {
        list: `${API_BASE_URL}/reviews`,
        detail: `${API_BASE_URL}/reviews/:id`,
        audit: `${API_BASE_URL}/reviews/:id/audit`,
        reply: `${API_BASE_URL}/reviews/:id/reply`,
        summaries: `${API_BASE_URL}/review-summaries`,
        auditSummary: `${API_BASE_URL}/review-summaries/:id/audit`,
        editSummary: `${API_BASE_URL}/review-summaries/:id`,
        generateSummary: `${API_BASE_URL}/review-summaries/generate`
    },
    stores: {
        list: `${API_BASE_URL}/stores`,
        detail: `${API_BASE_URL}/stores/:id`,
        add: `${API_BASE_URL}/stores`,
        edit: `${API_BASE_URL}/stores/:id`,
        toggle: `${API_BASE_URL}/stores/:id/toggle`,
        delete: `${API_BASE_URL}/stores/:id`,
        dashboard: `${API_BASE_URL}/stores/dashboard`
    },
    admin: {
        list: `${API_BASE_URL}/admins`,
        detail: `${API_BASE_URL}/admins/:id`,
        add: `${API_BASE_URL}/admins`,
        edit: `${API_BASE_URL}/admins/:id`,
        toggle: `${API_BASE_URL}/admins/:id/toggle`,
        resetPassword: `${API_BASE_URL}/admins/:id/reset-password`,
        delete: `${API_BASE_URL}/admins/:id`,
        roles: `${API_BASE_URL}/roles`
    },
    settings: {
        configs: `${API_BASE_URL}/system-configs`,
        updateConfig: `${API_BASE_URL}/system-configs/:id`,
        logs: `${API_BASE_URL}/operation-logs`
    },
    inventory: {
        logs: `${API_BASE_URL}/inventory-logs`,
        adjust: `${API_BASE_URL}/inventory/adjust`
    },
    seckill: {
        activities: `${API_BASE_URL}/seckill/activities`,
        activityDetail: `${API_BASE_URL}/seckill/activities/:id`,
        addProduct: `${API_BASE_URL}/seckill/activities/:id/products`,
        removeProduct: `${API_BASE_URL}/seckill/activities/:id/products/:product_id`,
        skuPrices: `${API_BASE_URL}/seckill/activities/:id/products/:product_id/skus`,
        updateSkuPrice: `${API_BASE_URL}/seckill/sku-prices/:id`
    },
    categories: {
        list: `${API_BASE_URL}/categories`,
        add: `${API_BASE_URL}/categories`,
        edit: `${API_BASE_URL}/categories/:id`,
        toggle: `${API_BASE_URL}/categories/:id/toggle`,
        delete: `${API_BASE_URL}/categories/:id`,
        sort: `${API_BASE_URL}/categories/sort`
    },
    brands: {
        list: `${API_BASE_URL}/brands`,
        add: `${API_BASE_URL}/brands`,
        edit: `${API_BASE_URL}/brands/:id`,
        toggle: `${API_BASE_URL}/brands/:id/toggle`,
        delete: `${API_BASE_URL}/brands/:id`
    },
    specifications: {
        list: `${API_BASE_URL}/specifications`,
        add: `${API_BASE_URL}/specifications`,
        edit: `${API_BASE_URL}/specifications/:id`,
        delete: `${API_BASE_URL}/specifications/:id`,
        addValue: `${API_BASE_URL}/specifications/:id/values`,
        editValue: `${API_BASE_URL}/specifications/values/:id`,
        deleteValue: `${API_BASE_URL}/specifications/values/:id`
    },
    payments: {
        list: `${API_BASE_URL}/payments`,
        refundList: `${API_BASE_URL}/refund-payments`
    },
    service: {
        conversations: `${API_BASE_URL}/conversations`,
        accept: `${API_BASE_URL}/conversations/:id/accept`,
        close: `${API_BASE_URL}/conversations/:id/close`,
        transfer: `${API_BASE_URL}/conversations/:id/transfer`,
        messages: `${API_BASE_URL}/conversations/:id/messages`,
        sendMessage: `${API_BASE_URL}/conversations/:id/messages`
    },
    homepage: {
        banners: `${API_BASE_URL}/banners`,
        addBanner: `${API_BASE_URL}/banners`,
        editBanner: `${API_BASE_URL}/banners/:id`,
        deleteBanner: `${API_BASE_URL}/banners/:id`,
        toggleBanner: `${API_BASE_URL}/banners/:id/toggle`,
        recommendations: `${API_BASE_URL}/recommendations`,
        addRecommendation: `${API_BASE_URL}/recommendations`,
        editRecommendation: `${API_BASE_URL}/recommendations/:id`,
        deleteRecommendation: `${API_BASE_URL}/recommendations/:id`,
        addRecommendProduct: `${API_BASE_URL}/recommendations/:id/products`,
        removeRecommendProduct: `${API_BASE_URL}/recommendations/:id/products/:product_id`,
        sortRecommendProducts: `${API_BASE_URL}/recommendations/:id/products/sort`
    }
};

function getAuthToken() {
    const user = JSON.parse(localStorage.getItem('lexiangou_admin_user') || '{}');
    return user.token || '';
}

function replaceUrlParams(url, params) {
    let result = url;
    Object.keys(params).forEach(key => {
        result = result.replace(`:${key}`, params[key]);
    });
    return result;
}

async function apiRequest(url, options = {}) {
    const defaultOptions = {
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
                localStorage.removeItem('lexiangou_admin_user');
                window.location.href = '/login.html';
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

async function apiGet(url, params = {}, pathParams = {}) {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    const searchParams = new URLSearchParams(params);
    const fullUrl = resolvedUrl + (searchParams.toString() ? '?' + searchParams.toString() : '');
    return apiRequest(fullUrl, { method: 'GET' });
}

async function apiPost(url, data = {}, pathParams = {}) {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

async function apiPut(url, data = {}, pathParams = {}) {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

async function apiDelete(url, data = {}, pathParams = {}) {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    return apiRequest(resolvedUrl, {
        method: 'DELETE',
        body: JSON.stringify(data)
    });
}