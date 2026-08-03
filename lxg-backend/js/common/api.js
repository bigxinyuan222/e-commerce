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
        list: `${API_BASE_URL}/admin/refunds`,                     // 管理端退货退款列表
        detail: `${API_BASE_URL}/admin/refunds/:id`,               // 获取管理端退款详情
        approve: `${API_BASE_URL}/admin/refunds/:id/audit`,        // 审核通过退款
        reject: `${API_BASE_URL}/admin/refunds/:id/audit`,         // 拒绝退款
        confirmRefund: `${API_BASE_URL}/refunds/:id/confirm-refund`, // 确认退款（打款）
        reasonList: `${API_BASE_URL}/admin/refund-reasons`,        // 获取管理端退款原因列表
        reasonAdd: `${API_BASE_URL}/admin/refund-reasons`,         // 添加退款原因
        reasonEdit: `${API_BASE_URL}/admin/refund-reasons/:id`,    // 编辑退款原因
        reasonDelete: `${API_BASE_URL}/admin/refund-reasons/:id`   // 删除退款原因
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
    // 用户模块
    users: {
        list: `${API_BASE_URL}/get/users`,            // 分页获取用户列表
        detail: `${API_BASE_URL}/users/:id`,          // 获取用户详情
        toggle: `${API_BASE_URL}/enable/user`         // 启用/禁用用户
    },
    // 统计模块
    stats: {
        dashboard: `${API_BASE_URL}/stats/dashboard`,  // 首页仪表盘统计
        products: `${API_BASE_URL}/stats/products`     // 商品统计数据
    },
    // 评价模块
    reviews: {
        list: `${API_BASE_URL}/admin/review/list`,                 // 获取管理端评价列表
        detail: `${API_BASE_URL}/admin/review/detail`,             // 获取管理端评价详情
        audit: `${API_BASE_URL}/admin/review/audit`,               // 审核评价
        hide: `${API_BASE_URL}/admin/review/hide`,                 // 隐藏评价
        reply: `${API_BASE_URL}/admin/review/reply`,               // 管理员回复评价
        deleteReply: `${API_BASE_URL}/admin/delete/reply`,         // 删除用户回复
        summaries: `${API_BASE_URL}/admin/review/ailist`,          // 获取 AI 摘要列表
        auditSummary: `${API_BASE_URL}/admin/audit/summary`,        // 审核 AI 摘要
        editSummary: `${API_BASE_URL}/admin/edit/review`,          // 编辑 AI 摘要
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
        configs: `${API_BASE_URL}/admin/system/configs`,    // 获取/新增系统配置
        addConfig: `${API_BASE_URL}/admin/system/configs`,  // 新增系统配置
        detailConfig: `${API_BASE_URL}/admin/system/configs/:key`, // 获取单项配置
        updateConfig: `${API_BASE_URL}/admin/system/configs`,  // 批量更新系统配置
        deleteConfig: `${API_BASE_URL}/admin/system/configs/:key`, // 删除配置
        logs: `${API_BASE_URL}/admin/system/operation-logs` // 获取操作日志
    },
    // 库存模块
    inventory: {
        dashboard: `${API_BASE_URL}/admin/home`, // 获取总仓汇总及低库存预警
        search: `${API_BASE_URL}/admin/search/inventory`, // 分页查询库存 SKU
        update: `${API_BASE_URL}/admin/update/inventory`, // 调整指定 SKU 库存
        logs: `${API_BASE_URL}/admin/log/inventory`, // 获取库存变动日志
        adjust: `${API_BASE_URL}/inventory/adjust` // 库存调整
    },
    // 秒杀模块
    seckill: {
        activities: `${API_BASE_URL}/admin/seckill/activities`,                          // 获取秒杀活动列表
        publish: `${API_BASE_URL}/admin/seckill/activities/publish`,                    // 发布秒杀活动
        close: `${API_BASE_URL}/admin/seckill/activities/close`,                        // 关闭秒杀活动
        activityDetail: `${API_BASE_URL}/admin/seckill/activities/:id`,                   // 获取秒杀活动详情
        addProduct: `${API_BASE_URL}/admin/seckill/activities/products`,                 // 添加秒杀商品
        removeProduct: `${API_BASE_URL}/admin/seckill/activities/:id/products/:product_id`, // 移除秒杀商品
        skuPrices: `${API_BASE_URL}/admin/seckill/activities/:id/products/:product_id/skus`, // 获取SKU价格
        updateSkuPrice: `${API_BASE_URL}/admin/seckill/sku-prices/:id`                    // 更新SKU价格
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
        list: `${API_BASE_URL}/admin/payments`,    // 管理端支付记录列表
        refundList: `${API_BASE_URL}/admin/refund-payments` // 管理端退款支付记录
    },
    // 客服模块
    service: {
        pendingCount: `${API_BASE_URL}/admin/chat/conversations/pending-count`, // 待接入会话数量
        conversations: `${API_BASE_URL}/admin/chat/conversations`, // 获取管理端会话列表
        accept: `${API_BASE_URL}/admin/chat/conversations/:id/accept`, // 接入会话
        close: `${API_BASE_URL}/admin/chat/conversations/:id/close`, // 管理员关闭会话
        transfer: `${API_BASE_URL}/conversations/:id/transfer`,  // 转接会话
        messages: `${API_BASE_URL}/admin/chat/conversations/:id/messages`,  // 获取管理员端会话历史消息
        sendMessage: `${API_BASE_URL}/admin/chat/conversations/:id/messages` // 管理员发送消息
    },
    // 首页模块
    homepage: {
        uploadImage: `${API_BASE_URL}/user/upload`,                                 // 上传轮播图图片
        banners: `${API_BASE_URL}/admin/banners`,                                // 获取轮播图列表
        bannerDetail: `${API_BASE_URL}/admin/banners/:id`,                       // 获取轮播图详情
        addBanner: `${API_BASE_URL}/admin/banners`,                              // 添加轮播图
        editBanner: `${API_BASE_URL}/admin/banners/:id`,                         // 编辑轮播图
        deleteBanner: `${API_BASE_URL}/admin/banners/:id`,                       // 删除轮播图
        toggleBanner: `${API_BASE_URL}/admin/banners/:id/toggle`,                // 启用/停用轮播图
        recommendations: `${API_BASE_URL}/admin/recommendations`,                // 获取推荐位列表
        addRecommendation: `${API_BASE_URL}/admin/recommendations`,             // 添加推荐位
        editRecommendation: `${API_BASE_URL}/admin/recommendations/:id`,         // 编辑推荐位
        deleteRecommendation: `${API_BASE_URL}/admin/recommendations/:id`,       // 删除推荐位
        recommendProducts: `${API_BASE_URL}/admin/recommendations/:id/products`, // 获取推荐位商品
        addRecommendProduct: `${API_BASE_URL}/admin/recommendations/:id/products`, // 添加推荐商品
        removeRecommendProduct: `${API_BASE_URL}/admin/recommendations/:id/products/:product_id`, // 移除推荐商品
        sortRecommendProducts: `${API_BASE_URL}/admin/recommendations/:id/products/sort` // 推荐商品排序
    },
    goods: {
        list: `${API_BASE_URL}/admin/product/list?page=1&pageSize=100`
    }
};

// These modules are owned by Vue components. Keep their legacy definitions above
// only as migration history, but make them unavailable to executable plain JS so
// stale code cannot issue duplicate or non-admin requests.
const VUE_OWNED_API_SECTIONS = [
    'auth',
    'returns',
    'notifications',
    'orders',
    'users',
    'stats',
    'inventory',
    'categories',
    'brands',
    'specifications',
    'service',
    'stores',
    'admin',
    'payments',
    'seckill'
    ,'settings'
];

VUE_OWNED_API_SECTIONS.forEach(section => {
    delete API_CONFIG[section];
});

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

    // Let the browser generate the multipart boundary for file uploads.
    if (mergedOptions.body instanceof FormData) {
        delete mergedOptions.headers['Content-Type'];
    }

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

async function apiUpload(url, file, fieldName = 'file') {
    const formData = new FormData();
    formData.append(fieldName, file);
    return apiRequest(url, {
        method: 'POST',
        body: formData
    });
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
