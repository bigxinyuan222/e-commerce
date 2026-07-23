const API_BASE_URL = '/api/v1';

const API_CONFIG = {
    // 认证模块
    auth: {
        login: `${API_BASE_URL}/admin/login`,      // 管理员登录
        logout: `${API_BASE_URL}/auth/logout`,     // 登出
        info: `${API_BASE_URL}/auth/info`          // 获取当前用户信息
    },
    // 退款模块
    returns: {
        list: `${API_BASE_URL}/refunds`,                           // 获取退款列表
        detail: `${API_BASE_URL}/refunds/:id`,                     // 获取退款详情
        approve: `${API_BASE_URL}/refunds/:id/audit`,              // 审核通过退款
        reject: `${API_BASE_URL}/refunds/:id/audit`,               // 拒绝退款
        confirmRefund: `${API_BASE_URL}/refunds/:id/confirm-refund`, // 确认退款（打款）
        reasonList: `${API_BASE_URL}/refund-reasons`,              // 获取退款原因列表
        reasonAdd: `${API_BASE_URL}/refund-reasons`,               // 添加退款原因
        reasonEdit: `${API_BASE_URL}/refund-reasons/:id`,          // 编辑退款原因
        reasonDelete: `${API_BASE_URL}/refund-reasons/:id`         // 删除退款原因
    },
    // 优惠券模块
    coupons: {
        list: `${API_BASE_URL}/coupons`,                     // 获取优惠券列表
        detail: `${API_BASE_URL}/coupons/:id`,               // 获取优惠券详情
        add: `${API_BASE_URL}/coupons`,                      // 新增优惠券
        edit: `${API_BASE_URL}/coupons/:id`,                 // 编辑优惠券
        toggle: `${API_BASE_URL}/coupons/:id/toggle`,        // 启用/停用优惠券
        records: `${API_BASE_URL}/coupons/:id/records`       // 获取优惠券领取记录
    },
    // 通知模块
    notifications: {
        list: `${API_BASE_URL}/notifications`,                      // 获取通知列表
        detail: `${API_BASE_URL}/notifications/:id`,               // 获取通知详情
        add: `${API_BASE_URL}/notifications`,                      // 发送通知
        delete: `${API_BASE_URL}/notifications/:id`,               // 删除通知
        templates: `${API_BASE_URL}/notification-templates`,       // 获取通知模板列表
        addTemplate: `${API_BASE_URL}/notification-templates`,     // 添加通知模板
        editTemplate: `${API_BASE_URL}/notification-templates/:id`, // 编辑通知模板
        deleteTemplate: `${API_BASE_URL}/notification-templates/:id` // 删除通知模板
    },
    // 订单模块（管理员端）
    orders: {
        list: `${API_BASE_URL}/admin/orders`,              // 获取订单列表
        detail: `${API_BASE_URL}/admin/orders/:id`,        // 获取订单详情
        stats: `${API_BASE_URL}/admin/orders/stats`,       // 订单统计数据
        cancel: `${API_BASE_URL}/admin/orders/:id/cancel`, // 取消订单
        ship: `${API_BASE_URL}/admin/orders/:id/ship`,     // 发货操作
        confirm: `${API_BASE_URL}/admin/orders/:id/confirm` // 确认收货/核销
    },
    // 商品模块
    goods: {
        list: `${API_BASE_URL}/products`,                // 获取商品列表
        detail: `${API_BASE_URL}/products/:id`,          // 获取商品详情
        add: `${API_BASE_URL}/products`,                 // 新增商品
        edit: `${API_BASE_URL}/products/:id`,            // 编辑商品
        delete: `${API_BASE_URL}/products/:id`,          // 删除商品
        toggle: `${API_BASE_URL}/products/:id/toggle`,   // 上架/下架商品
        batch: `${API_BASE_URL}/products/batch`          // 批量操作
    },
    // 用户模块
    users: {
        list: `${API_BASE_URL}/users`,                // 获取用户列表
        detail: `${API_BASE_URL}/users/:id`,          // 获取用户详情
        toggle: `${API_BASE_URL}/users/:id/toggle`    // 启用/停用用户
    },
    // 统计模块
    stats: {
        dashboard: `${API_BASE_URL}/stats/dashboard`,  // 首页仪表盘统计
        products: `${API_BASE_URL}/stats/products`     // 商品统计数据
    },
    // 评价模块
    reviews: {
        list: `${API_BASE_URL}/reviews`,                           // 获取评价列表
        detail: `${API_BASE_URL}/reviews/:id`,                     // 获取评价详情
        audit: `${API_BASE_URL}/reviews/:id/audit`,                // 审核评价
        reply: `${API_BASE_URL}/reviews/:id/reply`,                // 回复评价
        summaries: `${API_BASE_URL}/review-summaries`,             // 获取评价汇总列表
        auditSummary: `${API_BASE_URL}/review-summaries/:id/audit`, // 审核评价汇总
        editSummary: `${API_BASE_URL}/review-summaries/:id`,       // 编辑评价汇总
        generateSummary: `${API_BASE_URL}/review-summaries/generate` // 生成评价汇总
    },
    // 门店模块
    stores: {
        list: `${API_BASE_URL}/admin/stores`,                 // 获取门店列表
        detail: `${API_BASE_URL}/admin/stores/:id`,           // 获取门店详情
        add: `${API_BASE_URL}/admin/stores`,                  // 新增门店
        edit: `${API_BASE_URL}/admin/stores/:id`,             // 编辑门店
        toggle: `${API_BASE_URL}/admin/stores/:id/toggle`,    // 启用/停用门店
        delete: `${API_BASE_URL}/admin/stores/:id`,           // 删除门店
        dashboard: `${API_BASE_URL}/admin/stores/dashboard`   // 门店统计仪表盘
    },
    // 管理员模块
    admin: {
        list: `${API_BASE_URL}/admin/list`,                      // 获取管理员列表
        detail: `${API_BASE_URL}/admins/:id`,                    // 获取管理员详情
        add: `${API_BASE_URL}/create/admin`,                     // 新增管理员
        edit: `${API_BASE_URL}/admins/:id`,                      // 编辑管理员
        toggle: `${API_BASE_URL}/enable/admin`,                  // 启用/停用管理员
        resetPassword: `${API_BASE_URL}/admins/:id/reset-password`, // 重置密码
        delete: `${API_BASE_URL}/delete/admin`,                  // 删除管理员
        roles: `${API_BASE_URL}/roles`                           // 获取角色列表
    },
    // 系统设置模块
    settings: {
        configs: `${API_BASE_URL}/system-configs`,          // 获取系统配置
        updateConfig: `${API_BASE_URL}/system-configs/:id`,  // 更新系统配置
        logs: `${API_BASE_URL}/operation-logs`               // 获取操作日志
    },
    // 库存模块
    inventory: {
        logs: `${API_BASE_URL}/inventory-logs`,   // 获取库存变动日志
        adjust: `${API_BASE_URL}/inventory/adjust` // 库存调整
    },
    // 秒杀模块
    seckill: {
        activities: `${API_BASE_URL}/seckill/activities`,                          // 获取秒杀活动列表
        activityDetail: `${API_BASE_URL}/seckill/activities/:id`,                   // 获取秒杀活动详情
        addProduct: `${API_BASE_URL}/seckill/activities/:id/products`,              // 添加秒杀商品
        removeProduct: `${API_BASE_URL}/seckill/activities/:id/products/:product_id`, // 移除秒杀商品
        skuPrices: `${API_BASE_URL}/seckill/activities/:id/products/:product_id/skus`, // 获取SKU价格
        updateSkuPrice: `${API_BASE_URL}/seckill/sku-prices/:id`                    // 更新SKU价格
    },
    // 商品分类模块
    categories: {
        list: `${API_BASE_URL}/categories`,                // 获取分类列表
        add: `${API_BASE_URL}/categories`,                 // 新增分类
        edit: `${API_BASE_URL}/categories/:id`,            // 编辑分类
        toggle: `${API_BASE_URL}/categories/:id/toggle`,   // 启用/停用分类
        delete: `${API_BASE_URL}/categories/:id`,          // 删除分类
        sort: `${API_BASE_URL}/categories/sort`            // 分类排序
    },
    // 品牌模块
    brands: {
        list: `${API_BASE_URL}/brands`,                // 获取品牌列表
        add: `${API_BASE_URL}/brands`,                 // 新增品牌
        edit: `${API_BASE_URL}/brands/:id`,            // 编辑品牌
        toggle: `${API_BASE_URL}/brands/:id/toggle`,   // 启用/停用品牌
        delete: `${API_BASE_URL}/brands/:id`           // 删除品牌
    },
    // 规格模块
    specifications: {
        list: `${API_BASE_URL}/specifications`,                  // 获取规格列表
        add: `${API_BASE_URL}/specifications`,                   // 新增规格
        edit: `${API_BASE_URL}/specifications/:id`,              // 编辑规格
        delete: `${API_BASE_URL}/specifications/:id`,            // 删除规格
        addValue: `${API_BASE_URL}/specifications/:id/values`,   // 添加规格值
        editValue: `${API_BASE_URL}/specifications/values/:id`,  // 编辑规格值
        deleteValue: `${API_BASE_URL}/specifications/values/:id` // 删除规格值
    },
    // 支付模块
    payments: {
        list: `${API_BASE_URL}/payments`,          // 获取支付记录列表
        refundList: `${API_BASE_URL}/refund-payments` // 获取退款支付记录
    },
    // 客服模块
    service: {
        conversations: `${API_BASE_URL}/conversations`,          // 获取会话列表
        accept: `${API_BASE_URL}/conversations/:id/accept`,      // 接会话
        close: `${API_BASE_URL}/conversations/:id/close`,        // 关闭会话
        transfer: `${API_BASE_URL}/conversations/:id/transfer`,  // 转接会话
        messages: `${API_BASE_URL}/conversations/:id/messages`,  // 获取会话消息
        sendMessage: `${API_BASE_URL}/conversations/:id/messages` // 发送消息
    },
    // 首页模块
    homepage: {
        banners: `${API_BASE_URL}/banners`,                                      // 获取轮播图列表
        addBanner: `${API_BASE_URL}/banners`,                                    // 添加轮播图
        editBanner: `${API_BASE_URL}/banners/:id`,                               // 编辑轮播图
        deleteBanner: `${API_BASE_URL}/banners/:id`,                             // 删除轮播图
        toggleBanner: `${API_BASE_URL}/banners/:id/toggle`,                      // 启用/停用轮播图
        recommendations: `${API_BASE_URL}/recommendations`,                      // 获取推荐位列表
        addRecommendation: `${API_BASE_URL}/recommendations`,                   // 添加推荐位
        editRecommendation: `${API_BASE_URL}/recommendations/:id`,              // 编辑推荐位
        deleteRecommendation: `${API_BASE_URL}/recommendations/:id`,            // 删除推荐位
        addRecommendProduct: `${API_BASE_URL}/recommendations/:id/products`,    // 添加推荐商品
        removeRecommendProduct: `${API_BASE_URL}/recommendations/:id/products/:product_id`, // 移除推荐商品
        sortRecommendProducts: `${API_BASE_URL}/recommendations/:id/products/sort` // 推荐商品排序
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
    const token = getAuthToken();
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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

        if (data.code !== undefined && data.code !== 0 && data.code !== 200) {
            console.log('API response error:', data);
            const errorData = data.data || {};
            const detailMsg = errorData.message || errorData.detail || '';
            const fullMsg = detailMsg ? `${data.message}：${detailMsg}` : data.message;
            throw new Error(fullMsg || 'API request failed');
        }

        return data.data !== undefined ? data.data : data;
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

async function apiPostWithQuery(url, queryParams = {}, pathParams = {}) {
    const resolvedUrl = replaceUrlParams(url, pathParams);
    const queryParts = [];
    for (const key in queryParams) {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`);
        }
    }
    const queryString = queryParts.join('&');
    const fullUrl = resolvedUrl + (queryString ? '?' + queryString : '');

    const token = getAuthToken();
    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include'
    });

    const responseData = await response.json();

    if (responseData.code !== undefined && responseData.code !== 0 && responseData.code !== 200) {
        throw new Error(responseData.message || '请求失败');
    }
    return responseData.data !== undefined ? responseData.data : responseData;
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
    const options = { method: 'DELETE' };
    if (Object.keys(data).length > 0) {
        options.body = JSON.stringify(data);
    }
    return apiRequest(resolvedUrl, options);
}