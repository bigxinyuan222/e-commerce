// 订单数据缓存
let ordersData = [];

// 订单筛选条件
let currentOrderStatusFilter = 'all';    // 状态筛选
let currentStoreFilter = 'all';          // 门店筛选
let currentOrderSearchKeyword = '';      // 搜索关键词

// 获取门店选项HTML（用于筛选下拉框）
function getStoreOptions() {
    const stores = typeof storesData !== 'undefined' && Array.isArray(storesData) ? storesData : [];
    return stores.map(store => `
        <option value="${store.name}" ${currentStoreFilter === store.name ? 'selected' : ''}>${store.name}</option>
    `).join('');
}

// 获取订单状态标签HTML
function getStatusBadge(status) {
    const colors = {
        pending_payment: 'yellow',
        pending_delivery: 'blue',
        pending_pickup: 'blue',
        completed: 'green',
        pending_review: 'orange',
        reviewed: 'gray',
        cancelled: 'gray'
    };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${getStatusText(status)}</span>`;
}

// 获取订单状态中文文本
function getStatusText(status) {
    const texts = {
        pending_payment: '待支付',
        pending_delivery: '待发货',
        pending_pickup: '待自提',
        completed: '已完成',
        pending_review: '评价',
        reviewed: '已评价',
        cancelled: '已取消'
    };
    return texts[status] || status;
}

// 加载订单列表（支持分页自动拼接）
async function loadOrders() {
    try {
        const pageSize = 50;
        const baseParams = {
            pageSize: pageSize,
            keyword: currentOrderSearchKeyword,
            status: currentOrderStatusFilter === 'all' ? '' : getStatusCode(currentOrderStatusFilter),
            store_id: currentUser.role === 'store_staff' ? currentUser.storeId : ''  // 门店用户只看自己门店订单
        };
        
        let dataList = [];
        let currentPage = 1;
        let totalCount = 0;
        
        // 循环分页获取所有数据
        while (true) {
            const params = { ...baseParams, page: currentPage };
            const response = await apiGet(API_CONFIG.orders.list, params);
            
            // 兼容多种返回格式
            let pageList = [];
            if (Array.isArray(response)) {
                pageList = response;
            } else if (response && response.list) {
                pageList = response.list;
                totalCount = response.total || totalCount;
            } else if (response && response.data && Array.isArray(response.data)) {
                pageList = response.data;
            }
            
            if (pageList.length === 0) break;
            dataList = dataList.concat(pageList);
            
            // 停止条件：达到总数或当前页数据不足一页
            if (totalCount > 0 && dataList.length >= totalCount) break;
            if (pageList.length < pageSize) break;
            
            currentPage++;
            if (currentPage > 100) break;  // 最多100页，防止无限循环
        }
        
        ordersData = dataList.map(item => {
            const statusStr = getStatusString(item.status);
            return {
                id: item.ID || item.id,
                orderNo: item.orderNo || '',
                userId: item.userId || '',
                userName: (item.user && item.user.nickname) || item.userName || '',
                phone: (item.user && item.user.phone) || item.phone || '',
                storeId: item.storeId || '',
                storeName: (item.store && item.store.name) || item.storeName || '',
                totalAmount: item.totalAmount || item.amount || 0,
                discountAmount: item.discountAmount || 0,
                payAmount: item.payAmount || item.amount || 0,
                status: statusStr,
                statusText: getStatusText(statusStr),
                orderType: item.orderType || item.type || 'normal',
                createTime: formatDateTime(item.CreatedAt || item.createdAt || ''),
                payTime: formatDateTime(item.paidAt || item.payTime || ''),
                deliveryTime: formatDateTime(item.shippedAt || item.deliveryTime || ''),
                pickupTime: formatDateTime(item.confirmedAt || item.pickupTime || ''),
                remark: item.remark || '',
                items: (item.items || item.orderItems || []).map(i => ({
                    name: i.productName || i.name || '',
                    spec: formatSpecValues(i.specValues || i.spec || {}),
                    price: i.price || 0,
                    quantity: i.quantity || 1,
                    image: i.image || '',
                    amount: i.amount || 0
                }))
            };
        });
        await fetchOrderStats();
        refreshOrdersPage();
    } catch (error) {
        console.error('Failed to load orders:', error);
        showToast('加载订单失败，请重试', 'error');
    }
}

function getStatusCode(statusStr) {
    const codes = {
        pending_payment: 0,
        pending_delivery: 1,
        pending_pickup: 2,
        completed: 3,
        pending_review: 4,
        reviewed: 5,
        cancelled: 6
    };
    return codes[statusStr] !== undefined ? codes[statusStr] : '';
}

function getStatusString(statusCode) {
    const strs = {
        0: 'pending_payment',
        1: 'pending_delivery',
        2: 'pending_pickup',
        3: 'completed',
        4: 'pending_review',
        5: 'reviewed',
        6: 'cancelled'
    };
    return strs[statusCode] !== undefined ? strs[statusCode] : 'cancelled';
}

function formatDateTime(dateStr) {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    } catch {
        return dateStr.replace('T', ' ').substring(0, 19);
    }
}

function formatSpecValues(specValues) {
    if (!specValues || typeof specValues !== 'object') return '';
    return Object.entries(specValues)
        .map(([key, value]) => `${key}: ${value}`)
        .join(' / ');
}

function filterOrders() {
    let filtered = ordersData;
    if (currentUser.role === 'store_staff' && currentUser.storeId) {
        filtered = filtered.filter(o => o.storeId === currentUser.storeId);
    }
    if (currentStoreFilter !== 'all') {
        filtered = filtered.filter(o => o.storeName === currentStoreFilter);
    }
    if (currentOrderStatusFilter !== 'all') {
        filtered = filtered.filter(o => o.status === currentOrderStatusFilter);
    }
    if (currentOrderSearchKeyword) {
        const keyword = currentOrderSearchKeyword.toLowerCase();
        filtered = filtered.filter(o => 
            String(o.id).toLowerCase().includes(keyword) || 
            (o.orderNo && o.orderNo.toLowerCase().includes(keyword)) ||
            o.userName.toLowerCase().includes(keyword) ||
            o.phone.toLowerCase().includes(keyword) ||
            o.items.some(i => i.name.toLowerCase().includes(keyword))
        );
    }
    return filtered;
}

function searchOrders() {
    const input = document.getElementById('orderSearchInput');
    if (input) {
        currentOrderSearchKeyword = input.value.trim();
        refreshOrdersPage();
    }
}

let orderStatsData = {};

async function fetchOrderStats() {
    try {
        const params = {
            store_id: currentUser.role === 'store_staff' ? currentUser.storeId : ''
        };
        const response = await apiGet(API_CONFIG.orders.stats, params);
        if (response) {
            orderStatsData = response;
        }
    } catch (error) {
        console.error('Failed to fetch order stats:', error);
    }
}

function getOrderStats() {
    if (orderStatsData && Object.keys(orderStatsData).length > 0) {
        return {
            pending_payment: orderStatsData.pending_payment || 0,
            pending_delivery: orderStatsData.pending_delivery || 0,
            pending_pickup: orderStatsData.pending_pickup || 0,
            completed: orderStatsData.completed || 0,
            pending_review: orderStatsData.pending_review || 0,
            cancelled: orderStatsData.cancelled || 0,
            total: orderStatsData.total || 0
        };
    }
    
    const orders = currentUser.role === 'store_staff' && currentUser.storeId 
        ? ordersData.filter(o => o.storeId === currentUser.storeId) 
        : ordersData;
    return {
        pending_payment: orders.filter(o => o.status === 'pending_payment').length,
        pending_delivery: orders.filter(o => o.status === 'pending_delivery').length,
        pending_pickup: orders.filter(o => o.status === 'pending_pickup').length,
        completed: orders.filter(o => o.status === 'completed').length,
        pending_review: orders.filter(o => o.status === 'pending_review').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        total: orders.length
    };
}

async function handleOrderAction(orderId, action) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    if (action === 'cancel' && order.status === 'pending_payment') {
        showConfirm(`确定取消订单 ${orderId} 吗？`, async function() {
            try {
                await apiPut(API_CONFIG.orders.cancel, {}, { id: orderId });
                showToast('取消成功', 'success');
                await loadOrders();
            } catch (error) {
                console.error('Failed to cancel order:', error);
                showToast('操作失败，请重试', 'error');
            }
        });
    } else if (action === 'delivery' && order.status === 'pending_delivery') {
        showConfirm(`确定发货订单 ${orderId} 吗？`, async function() {
            try {
                await apiPut(API_CONFIG.orders.ship, {}, { id: orderId });
                showToast('发货成功，请通知用户到店自提', 'success');
                await loadOrders();
            } catch (error) {
                console.error('Failed to ship order:', error);
                showToast('操作失败，请重试', 'error');
            }
        });
    } else if (action === 'pickup' && order.status === 'pending_pickup') {
        showConfirm(`确定核销订单 ${orderId} 吗？`, async function() {
            try {
                await apiPut(API_CONFIG.orders.confirm, {}, { id: orderId });
                showToast('核销成功', 'success');
                await loadOrders();
            } catch (error) {
                console.error('Failed to pickup order:', error);
                showToast('操作失败，请重试', 'error');
            }
        });
    } else {
        refreshOrdersPage();
    }
}

async function showOrderDetail(orderId) {
    try {
        const response = await apiGet(API_CONFIG.orders.detail, {}, { id: orderId });
        if (!response) return;
        
        const item = response;
        const statusStr = getStatusString(item.status);
        
        const order = {
            id: item.ID || item.id,
            orderNo: item.orderNo || '',
            userName: (item.user && item.user.nickname) || '',
            phone: (item.user && item.user.phone) || '',
            storeName: (item.store && item.store.name) || '',
            totalAmount: item.totalAmount || item.amount || 0,
            payAmount: item.payAmount || item.amount || 0,
            status: statusStr,
            remark: item.remark || '',
            createTime: formatDateTime(item.CreatedAt || item.createdAt || ''),
            payTime: formatDateTime(item.paidAt || item.payTime || ''),
            deliveryTime: formatDateTime(item.shippedAt || item.deliveryTime || ''),
            pickupTime: formatDateTime(item.confirmedAt || item.pickupTime || ''),
            items: (item.items || item.orderItems || []).map(i => ({
                name: i.productName || i.name || '',
                spec: formatSpecValues(i.specValues || i.spec || {}),
                price: i.price || 0,
                quantity: i.quantity || 1,
                image: i.image || '',
                amount: i.amount || 0
            }))
        };
        
        const modalContent = `
            <div class="modal-overlay" onclick="closeOrderDetail()"></div>
            <div class="modal-content" style="width:720px;">
                <div class="modal-header">
                    <h3><i class="fas fa-shopping-bag"></i> 订单详情</h3>
                    <button onclick="closeOrderDetail()" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                    <div class="trade-order-detail-grid">
                        <div class="trade-order-detail-card"><div class="label">订单号</div><div class="value">${order.orderNo || order.id}</div></div>
                        <div class="trade-order-detail-card"><div class="label">订单状态</div><div>${getStatusBadge(order.status)}</div></div>
                        <div class="trade-order-detail-card"><div class="label">用户</div><div>${order.userName} · ${order.phone}</div></div>
                        <div class="trade-order-detail-card"><div class="label">门店</div><div>${order.storeName}</div></div>
                        ${order.remark ? `<div class="trade-order-detail-card"><div class="label">备注</div><div class="value">${order.remark}</div></div>` : ''}
                    </div>
                    
                    <div class="trade-order-items-section">
                        <div class="trade-order-section-title">商品明细</div>
                        <div class="trade-order-items-list">
                            ${order.items.map(item => `
                                <div class="trade-order-item">
                                    <span class="trade-order-item-image"></span>
                                    <div class="trade-order-item-info">
                                        <div class="name">${item.name}</div>
                                        <div class="spec">${item.spec} x ${item.quantity}</div>
                                    </div>
                                    <div class="trade-order-item-price">¥${item.price * item.quantity}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="trade-order-amount-section">
                        <div class="trade-order-section-title">金额信息</div>
                        <div class="trade-order-amount-card">
                            <div class="trade-order-amount-row"><span>商品总价</span><span>¥${order.totalAmount}</span></div>
                            <div class="trade-order-amount-row"><span>运费</span><span>¥0</span></div>
                            <div class="trade-order-amount-row"><span>优惠</span><span class="discount">¥${order.totalAmount - order.payAmount}</span></div>
                            <div class="trade-order-amount-row total"><span>实付金额</span><span>¥${order.payAmount}</span></div>
                        </div>
                    </div>
                    
                    <div class="trade-order-timeline-section">
                        <div class="trade-order-section-title">时间节点</div>
                        <div class="trade-order-timeline">
                            <div class="trade-order-timeline-item"><div class="dot blue"></div><div class="label">下单时间</div><div class="value">${order.createTime}</div></div>
                            ${order.payTime ? `<div class="trade-order-timeline-item"><div class="dot green"></div><div class="label">支付时间</div><div class="value">${order.payTime}</div></div>` : ''}
                            ${order.deliveryTime ? `<div class="trade-order-timeline-item"><div class="dot blue-light"></div><div class="label">发货时间</div><div class="value">${order.deliveryTime}</div></div>` : ''}
                            ${order.pickupTime ? `<div class="trade-order-timeline-item"><div class="dot gray"></div><div class="label">自提时间</div><div class="value">${order.pickupTime}</div></div>` : ''}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    ${order.status === 'pending_delivery' ? `<button class="btn btn-success" onclick="handleOrderAction('${order.id}', 'delivery')"><i class="fas fa-truck"></i> 发货</button>` : ''}
                    ${order.status === 'pending_pickup' ? `<button class="btn btn-success" onclick="handleOrderAction('${order.id}', 'pickup')"><i class="fas fa-check-circle"></i> 核销自提</button>` : ''}
                    ${order.status === 'pending_payment' ? `<button class="btn btn-danger" onclick="handleOrderAction('${order.id}', 'cancel')"><i class="fas fa-times"></i> 取消订单</button>` : ''}
                    <button class="btn btn-outline" onclick="closeOrderDetail()">关闭</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    } catch (error) {
        console.error('Failed to load order detail:', error);
        showToast('加载订单详情失败，请重试', 'error');
    }
}

function closeOrderDetail() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshOrdersPage() {
    const panel = document.getElementById('panel-orders');
    if (panel) panel.innerHTML = ordersPage();
}

function switchOrderStatus(status) {
    currentOrderStatusFilter = status;
    refreshOrdersPage();
}

function switchOrderStore(store) {
    currentStoreFilter = store;
    refreshOrdersPage();
}

function filterOrdersByStore(storeId) {
    if (!storeId) return;
    const store = Array.isArray(storesData) ? storesData.find(s => s && s.id === storeId) : null;
    if (store) {
        currentStoreFilter = store.name;
        refreshOrdersPage();
    }
}

function ordersPage() {
    const stats = getOrderStats();
    const orders = filterOrders();
    const isStoreStaff = currentUser.role === 'store_staff';
    
    return `
        <div class="flex-between mb-4">
            <div class="search-bar">
                <input id="orderSearchInput" placeholder="订单号 / 用户手机号" onkeypress="if(event.key==='Enter') searchOrders()" />
                <select onchange="switchOrderStatus(this.value)">
                    <option value="all" ${currentOrderStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="pending_payment" ${currentOrderStatusFilter === 'pending_payment' ? 'selected' : ''}>待支付</option>
                    <option value="pending_delivery" ${currentOrderStatusFilter === 'pending_delivery' ? 'selected' : ''}>待发货</option>
                    <option value="pending_pickup" ${currentOrderStatusFilter === 'pending_pickup' ? 'selected' : ''}>待自提</option>
                    <option value="completed" ${currentOrderStatusFilter === 'completed' ? 'selected' : ''}>已完成</option>
                    <option value="pending_review" ${currentOrderStatusFilter === 'pending_review' ? 'selected' : ''}>评价</option>
                    <option value="cancelled" ${currentOrderStatusFilter === 'cancelled' ? 'selected' : ''}>已取消</option>
                </select>
                ${!isStoreStaff ? `
                <select onchange="switchOrderStore(this.value)">
                    <option value="all" ${currentStoreFilter === 'all' ? 'selected' : ''}>全部门店</option>
                    ${getStoreOptions()}
                </select>` : ''}
                <button class="btn btn-primary" onclick="searchOrders()"><i class="fas fa-search"></i> 搜索</button>
            </div>
        </div>

        <div class="trade-stat-grid" style="grid-template-columns:repeat(${isStoreStaff ? 4 : 6},1fr);">
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待支付</div><div class="value yellow">${stats.pending_payment}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-truck"></i> 待发货</div><div class="value blue">${stats.pending_delivery}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-map-marker-alt"></i> 待自提</div><div class="value purple">${stats.pending_pickup}</div></div>
            ${!isStoreStaff ? `
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已完成</div><div class="value green">${stats.completed}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-star"></i> 待评价</div><div class="value orange">${stats.pending_review}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-times-circle"></i> 已取消</div><div class="value gray">${stats.cancelled}</div></div>
            ` : ''}
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-list"></i> 订单列表</span>
                <span class="text-muted" style="font-size:13px;">共 ${orders.length} 笔订单</span>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th>订单号</th><th>用户</th><th>商品</th><th>金额</th><th>门店</th><th>类型</th><th>状态</th><th>下单时间</th><th>操作</th></tr></thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>${order.orderNo || order.id}</td>
                                <td><div><span>${order.userName}</span><div style="font-size:12px;color:#94a3b8;">${order.phone}</div></div></td>
                                <td><div>${Array.isArray(order.items) ? order.items.map(i => i.name).join('、') : ''}</div></td>
                                <td><div style="font-weight:600;">¥${(order.payAmount || 0).toLocaleString()}</div></td>
                                <td>${order.storeName}</td>
                                <td><span class="${order.orderType === 'seckill' ? 'tag trade-tag-seckill' : 'tag'}">${order.orderType === 'seckill' ? '秒杀' : '普通'}</span></td>
                                <td>${getStatusBadge(order.status)}</td>
                                <td>${order.createTime}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline" onclick="showOrderDetail('${order.id}')"><i class="fas fa-eye"></i> 详情</button>
                                    ${order.status === 'pending_delivery' ? `<button class="btn btn-sm btn-success" onclick="handleOrderAction('${order.id}', 'delivery')"><i class="fas fa-truck"></i> 发货</button>` : ''}
                                    ${order.status === 'pending_pickup' ? `<button class="btn btn-sm btn-success" onclick="handleOrderAction('${order.id}', 'pickup')"><i class="fas fa-check"></i> 核销</button>` : ''}
                                    ${order.status === 'pending_payment' ? `<button class="btn btn-sm btn-danger" onclick="handleOrderAction('${order.id}', 'cancel')"><i class="fas fa-times"></i> 取消</button>` : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-route"></i> 订单状态流转</span></div>
            <div class="card-body">
                <div style="display:flex;align-items:center;justify-content:center;gap:24px;padding:20px 0;">
                    <div style="text-align:center;">
                        <div style="width:40px;height:40px;background:#fef3c7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"><span style="font-size:14px;color:#d97706;">1</span></div>
                        <div style="font-size:12px;color:#64748b;">待支付</div>
                    </div>
                    <div style="width:60px;height:2px;background:#cbd5e1;"></div>
                    <div style="text-align:center;">
                        <div style="width:40px;height:40px;background:#dbeafe;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"><span style="font-size:14px;color:#1d4ed8;">2</span></div>
                        <div style="font-size:12px;color:#64748b;">待发货</div>
                    </div>
                    <div style="width:60px;height:2px;background:#cbd5e1;"></div>
                    <div style="text-align:center;">
                        <div style="width:40px;height:40px;background:#dbeafe;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"><span style="font-size:14px;color:#1d4ed8;">3</span></div>
                        <div style="font-size:12px;color:#64748b;">待自提</div>
                    </div>
                    <div style="width:60px;height:2px;background:#cbd5e1;"></div>
                    <div style="text-align:center;">
                        <div style="width:40px;height:40px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"><span style="font-size:14px;color:#16a34a;">4</span></div>
                        <div style="font-size:12px;color:#64748b;">已完成</div>
                    </div>
                    <div style="width:60px;height:2px;background:#cbd5e1;"></div>
                    <div style="text-align:center;">
                        <div style="width:40px;height:40px;background:#fff7ed;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;"><span style="font-size:14px;color:#ea580c;">5</span></div>
                        <div style="font-size:12px;color:#64748b;">评价</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}