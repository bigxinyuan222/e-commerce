let ordersData = [];

let currentOrderStatusFilter = 'all';
let currentStoreFilter = 'all';
let currentOrderSearchKeyword = '';

function getStoreOptions() {
    const stores = typeof storesData !== 'undefined' && Array.isArray(storesData) ? storesData : [];
    return stores.map(store => `
        <option value="${store.name}" ${currentStoreFilter === store.name ? 'selected' : ''}>${store.name}</option>
    `).join('');
}

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

async function loadOrders() {
    try {
        const params = {
            status: currentOrderStatusFilter === 'all' ? '' : currentOrderStatusFilter,
            storeName: currentStoreFilter === 'all' ? '' : currentStoreFilter,
            keyword: currentOrderSearchKeyword,
            storeId: currentUser.storeId || ''
        };
        const response = await apiGet(API_CONFIG.orders.list, params);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        ordersData = dataList.map(item => ({
            id: item.ID || item.id,
            userId: item.userId || '',
            userName: item.userName || '',
            phone: item.phone || '',
            storeId: item.storeId || '',
            storeName: item.storeName || '',
            totalAmount: item.totalAmount || item.amount || 0,
            payAmount: item.payAmount || item.amount || 0,
            status: item.status === 0 ? 'pending_payment' : item.status === 1 ? 'pending_delivery' : item.status === 2 ? 'pending_pickup' : item.status === 3 ? 'completed' : item.status === 4 ? 'pending_review' : 'cancelled',
            statusText: getStatusText(item.status === 0 ? 'pending_payment' : item.status === 1 ? 'pending_delivery' : item.status === 2 ? 'pending_pickup' : item.status === 3 ? 'completed' : item.status === 4 ? 'pending_review' : 'cancelled'),
            orderType: item.orderType || item.type || 'normal',
            createTime: item.createdAt || item.CreatedAt || '',
            payTime: item.payTime || '',
            deliveryTime: item.deliveryTime || '',
            pickupTime: item.pickupTime || '',
            items: (item.items || item.orderItems || []).map(i => ({
                name: i.productName || i.name || '',
                spec: i.spec || '',
                price: i.price || 0,
                quantity: i.quantity || 1,
                image: i.image || ''
            }))
        }));
        refreshOrdersPage();
    } catch (error) {
        console.error('Failed to load orders:', error);
    }
}

function filterOrders() {
    let filtered = ordersData;
    if (currentUser.storeId) {
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
            o.id.toLowerCase().includes(keyword) || 
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

function getOrderStats() {
    const orders = currentUser.storeId ? ordersData.filter(o => o.storeId === currentUser.storeId) : ordersData;
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
                order.status = 'cancelled';
                order.statusText = '已取消';
                refreshOrdersPage();
            } catch (error) {
                console.error('Failed to cancel order:', error);
                alert('操作失败，请重试');
            }
        });
    } else if (action === 'delivery' && order.status === 'pending_delivery') {
        showConfirm(`确定发货订单 ${orderId} 吗？`, async function() {
            try {
                await apiPut(API_CONFIG.orders.ship, {}, { id: orderId });
                order.status = 'pending_pickup';
                order.statusText = '待自提';
                order.deliveryTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
                alert('发货成功，请通知用户到店自提');
                refreshOrdersPage();
            } catch (error) {
                console.error('Failed to ship order:', error);
                alert('操作失败，请重试');
            }
        });
    } else if (action === 'pickup' && order.status === 'pending_pickup') {
        showConfirm(`确定核销订单 ${orderId} 吗？`, async function() {
            try {
                await apiPut(API_CONFIG.orders.detail, { status: 3 }, { id: orderId });
                order.status = 'completed';
                order.statusText = '已完成';
                order.pickupTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
                alert('核销成功');
                refreshOrdersPage();
            } catch (error) {
                console.error('Failed to pickup order:', error);
                alert('操作失败，请重试');
            }
        });
    } else {
        refreshOrdersPage();
    }
}

function showOrderDetail(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeOrderDetail()"></div>
        <div class="modal-content" style="width:720px;">
            <div class="modal-header">
                <h3><i class="fas fa-shopping-bag"></i> 订单详情</h3>
                <button onclick="closeOrderDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="trade-order-detail-grid">
                    <div class="trade-order-detail-card"><div class="label">订单号</div><div class="value">${order.id}</div></div>
                    <div class="trade-order-detail-card"><div class="label">订单状态</div><div>${getStatusBadge(order.status)}</div></div>
                    <div class="trade-order-detail-card"><div class="label">用户</div><div>${order.userName} · ${order.phone}</div></div>
                    <div class="trade-order-detail-card"><div class="label">门店</div><div>${order.storeName}</div></div>
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
                                <td>${order.id}</td>
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