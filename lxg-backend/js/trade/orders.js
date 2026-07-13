let ordersData = [
    { id: 'ORD-20260625-001', userId: 'user-001', userName: '王*明', phone: '138****8888', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 599, payAmount: 599, status: 'pending_payment', statusText: '待支付', orderType: 'normal', createTime: '2026-06-25 14:30', payTime: null, deliveryTime: null, pickupTime: null, items: [{ name: '无线蓝牙耳机 Pro', spec: '黑色', price: 299, quantity: 2, image: '' }] },
    { id: 'ORD-20260625-003', userId: 'user-003', userName: '张*婷', phone: '137****9999', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 159, payAmount: 159, status: 'pending_delivery', statusText: '待发货', orderType: 'normal', createTime: '2026-06-25 11:45', payTime: '2026-06-25 11:50', deliveryTime: null, pickupTime: null, items: [{ name: '便携移动电源 20000mAh', spec: '白色', price: 159, quantity: 1, image: '' }] },
    { id: 'ORD-20260625-004', userId: 'user-004', userName: '陈*伟', phone: '136****5555', storeId: 'store-003', storeName: '广州天河店', totalAmount: 199, payAmount: 199, status: 'pending_pickup', statusText: '待自提', orderType: 'normal', createTime: '2026-06-25 10:20', payTime: '2026-06-25 10:25', deliveryTime: '2026-06-25 11:00', pickupTime: null, items: [{ name: '智能台灯 Pro', spec: '白色', price: 199, quantity: 1, image: '' }] },
    { id: 'ORD-20260624-015', userId: 'user-005', userName: '刘*芳', phone: '135****7777', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 299, payAmount: 299, status: 'completed', statusText: '已完成', orderType: 'normal', createTime: '2026-06-24 16:40', payTime: '2026-06-24 16:45', deliveryTime: '2026-06-24 17:30', pickupTime: '2026-06-24 18:00', items: [{ name: '无线蓝牙耳机 Pro', spec: '黑色', price: 299, quantity: 1, image: '' }] },
    { id: 'ORD-20260624-012', userId: 'user-006', userName: '赵*阳', phone: '138****1111', storeId: 'store-002', storeName: '上海浦东店', totalAmount: 598, payAmount: 598, status: 'pending_review', statusText: '评价', orderType: 'normal', createTime: '2026-06-24 14:20', payTime: '2026-06-24 14:25', deliveryTime: '2026-06-24 15:00', pickupTime: '2026-06-24 15:30', items: [{ name: '无线蓝牙耳机 Pro', spec: '白色', price: 299, quantity: 2, image: '' }] },
    { id: 'ORD-20260623-008', userId: 'user-007', userName: '孙*怡', phone: '139****2222', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 159, payAmount: 159, status: 'cancelled', statusText: '已取消', orderType: 'normal', createTime: '2026-06-23 09:10', payTime: null, deliveryTime: null, pickupTime: null, items: [{ name: '便携移动电源', spec: '黑色', price: 159, quantity: 1, image: '' }] },
    { id: 'ORD-20260625-005', userId: 'user-008', userName: '周*杰', phone: '137****3333', storeId: 'store-004', storeName: '深圳南山店', totalAmount: 99, payAmount: 99, status: 'pending_delivery', statusText: '待发货', orderType: 'seckill', createTime: '2026-06-25 09:00', payTime: '2026-06-25 09:05', deliveryTime: null, pickupTime: null, items: [{ name: '便携移动电源', spec: '蓝色', price: 99, quantity: 1, image: '' }] },
    { id: 'ORD-20260624-020', userId: 'user-010', userName: '郑*爽', phone: '135****5555', storeId: 'store-003', storeName: '广州天河店', totalAmount: 399, payAmount: 399, status: 'completed', statusText: '已完成', orderType: 'normal', createTime: '2026-06-24 10:30', payTime: '2026-06-24 10:35', deliveryTime: '2026-06-24 11:30', pickupTime: '2026-06-24 12:00', items: [{ name: '运动蓝牙耳机', spec: '黑色', price: 399, quantity: 1, image: '' }] },
    { id: 'ORD-20260622-018', userId: 'user-011', userName: '冯*婷', phone: '134****8888', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 899, payAmount: 899, status: 'completed', orderType: 'normal', createTime: '2026-06-22 15:00', payTime: '2026-06-22 15:05', deliveryTime: '2026-06-22 16:00', pickupTime: '2026-06-22 16:30', items: [{ name: '智能手表 S8', spec: '黑色', price: 899, quantity: 1, image: '' }] },
    { id: 'ORD-20260621-015', userId: 'user-012', userName: '许*强', phone: '133****9999', storeId: 'store-002', storeName: '上海浦东店', totalAmount: 159, payAmount: 159, status: 'completed', orderType: 'normal', createTime: '2026-06-21 11:30', payTime: '2026-06-21 11:35', deliveryTime: '2026-06-21 12:00', pickupTime: '2026-06-21 12:30', items: [{ name: '便携移动电源', spec: '白色', price: 159, quantity: 1, image: '' }] },
    { id: 'ORD-20260620-012', userId: 'user-013', userName: '杨*敏', phone: '132****1111', storeId: 'store-003', storeName: '广州天河店', totalAmount: 598, payAmount: 598, status: 'completed', orderType: 'normal', createTime: '2026-06-20 14:20', payTime: '2026-06-20 14:25', deliveryTime: '2026-06-20 15:00', pickupTime: '2026-06-20 15:30', items: [{ name: '无线蓝牙耳机 Pro', spec: '黑色', price: 299, quantity: 2, image: '' }] },
    { id: 'ORD-20260619-010', userId: 'user-014', userName: '马*丽', phone: '131****2222', storeId: 'store-004', storeName: '深圳南山店', totalAmount: 399, payAmount: 399, status: 'completed', orderType: 'normal', createTime: '2026-06-19 16:40', payTime: '2026-06-19 16:45', deliveryTime: '2026-06-19 17:30', pickupTime: '2026-06-19 18:00', items: [{ name: '运动蓝牙耳机', spec: '蓝色', price: 399, quantity: 1, image: '' }] },
    { id: 'ORD-20260618-008', userId: 'user-015', userName: '朱*伟', phone: '130****3333', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 199, payAmount: 199, status: 'completed', orderType: 'normal', createTime: '2026-06-18 09:30', payTime: '2026-06-18 09:35', deliveryTime: '2026-06-18 10:00', pickupTime: '2026-06-18 10:30', items: [{ name: '智能台灯 Pro', spec: '黑色', price: 199, quantity: 1, image: '' }] },
    { id: 'ORD-20260617-006', userId: 'user-016', userName: '胡*杰', phone: '129****4444', storeId: 'store-002', storeName: '上海浦东店', totalAmount: 799, payAmount: 799, status: 'completed', orderType: 'normal', createTime: '2026-06-17 13:00', payTime: '2026-06-17 13:05', deliveryTime: '2026-06-17 14:00', pickupTime: '2026-06-17 14:30', items: [{ name: '真无线降噪耳机', spec: '白色', price: 799, quantity: 1, image: '' }] },
    { id: 'ORD-20260616-005', userId: 'user-017', userName: '林*芳', phone: '128****5555', storeId: 'store-003', storeName: '广州天河店', totalAmount: 299, payAmount: 299, status: 'completed', orderType: 'normal', createTime: '2026-06-16 11:00', payTime: '2026-06-16 11:05', deliveryTime: '2026-06-16 12:00', pickupTime: '2026-06-16 12:30', items: [{ name: '无线蓝牙耳机 Pro', spec: '红色', price: 299, quantity: 1, image: '' }] },
    { id: 'ORD-20260615-004', userId: 'user-018', userName: '何*平', phone: '127****6666', storeId: 'store-004', storeName: '深圳南山店', totalAmount: 499, payAmount: 499, status: 'completed', orderType: 'normal', createTime: '2026-06-15 15:30', payTime: '2026-06-15 15:35', deliveryTime: '2026-06-15 16:30', pickupTime: '2026-06-15 17:00', items: [{ name: '机械键盘', spec: '青轴', price: 499, quantity: 1, image: '' }] },
    { id: 'ORD-20260614-003', userId: 'user-019', userName: '罗*燕', phone: '126****7777', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 1299, payAmount: 1299, status: 'completed', orderType: 'normal', createTime: '2026-06-14 10:00', payTime: '2026-06-14 10:05', deliveryTime: '2026-06-14 11:00', pickupTime: '2026-06-14 11:30', items: [{ name: '智能手表 S8', spec: '银色', price: 1299, quantity: 1, image: '' }] },
    { id: 'ORD-20260613-002', userId: 'user-020', userName: '郭*涛', phone: '125****8888', storeId: 'store-002', storeName: '上海浦东店', totalAmount: 99, payAmount: 99, status: 'completed', orderType: 'seckill', createTime: '2026-06-13 09:00', payTime: '2026-06-13 09:05', deliveryTime: '2026-06-13 10:00', pickupTime: '2026-06-13 10:30', items: [{ name: '便携移动电源', spec: '黑色', price: 99, quantity: 1, image: '' }] },
    { id: 'ORD-20260612-001', userId: 'user-021', userName: '梁*华', phone: '124****9999', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 598, payAmount: 598, status: 'completed', orderType: 'normal', createTime: '2026-06-12 14:00', payTime: '2026-06-12 14:05', deliveryTime: '2026-06-12 15:00', pickupTime: '2026-06-12 15:30', items: [{ name: '无线蓝牙耳机 Pro', spec: '白色', price: 299, quantity: 2, image: '' }] },
    { id: 'ORD-20260611-008', userId: 'user-022', userName: '宋*静', phone: '123****0000', storeId: 'store-003', storeName: '广州天河店', totalAmount: 399, payAmount: 399, status: 'completed', orderType: 'normal', createTime: '2026-06-11 16:00', payTime: '2026-06-11 16:05', deliveryTime: '2026-06-11 17:00', pickupTime: '2026-06-11 17:30', items: [{ name: '运动蓝牙耳机', spec: '黑色', price: 399, quantity: 1, image: '' }] },
    { id: 'ORD-20260610-006', userId: 'user-023', userName: '黄*伟', phone: '122****1111', storeId: 'store-004', storeName: '深圳南山店', totalAmount: 199, payAmount: 199, status: 'completed', orderType: 'normal', createTime: '2026-06-10 11:00', payTime: '2026-06-10 11:05', deliveryTime: '2026-06-10 12:00', pickupTime: '2026-06-10 12:30', items: [{ name: '智能台灯 Pro', spec: '白色', price: 199, quantity: 1, image: '' }] },
    { id: 'ORD-20260609-005', userId: 'user-024', userName: '唐*芳', phone: '121****2222', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 799, payAmount: 799, status: 'completed', orderType: 'normal', createTime: '2026-06-09 13:30', payTime: '2026-06-09 13:35', deliveryTime: '2026-06-09 14:30', pickupTime: '2026-06-09 15:00', items: [{ name: '真无线降噪耳机', spec: '黑色', price: 799, quantity: 1, image: '' }] },
    { id: 'ORD-20260608-004', userId: 'user-025', userName: '韩*杰', phone: '120****3333', storeId: 'store-002', storeName: '上海浦东店', totalAmount: 159, payAmount: 159, status: 'completed', orderType: 'normal', createTime: '2026-06-08 10:00', payTime: '2026-06-08 10:05', deliveryTime: '2026-06-08 11:00', pickupTime: '2026-06-08 11:30', items: [{ name: '便携移动电源', spec: '蓝色', price: 159, quantity: 1, image: '' }] },
    { id: 'ORD-20260607-003', userId: 'user-026', userName: '曹*敏', phone: '119****4444', storeId: 'store-003', storeName: '广州天河店', totalAmount: 899, payAmount: 899, status: 'completed', orderType: 'normal', createTime: '2026-06-07 15:00', payTime: '2026-06-07 15:05', deliveryTime: '2026-06-07 16:00', pickupTime: '2026-06-07 16:30', items: [{ name: '智能手表 S8', spec: '黑色', price: 899, quantity: 1, image: '' }] },
    { id: 'ORD-20260606-002', userId: 'user-027', userName: '谢*强', phone: '118****5555', storeId: 'store-004', storeName: '深圳南山店', totalAmount: 499, payAmount: 499, status: 'completed', orderType: 'normal', createTime: '2026-06-06 14:00', payTime: '2026-06-06 14:05', deliveryTime: '2026-06-06 15:00', pickupTime: '2026-06-06 15:30', items: [{ name: '机械键盘', spec: '红轴', price: 499, quantity: 1, image: '' }] },
    { id: 'ORD-20260605-001', userId: 'user-028', userName: '邓*丽', phone: '117****6666', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 599, payAmount: 599, status: 'completed', orderType: 'normal', createTime: '2026-06-05 12:00', payTime: '2026-06-05 12:05', deliveryTime: '2026-06-05 13:00', pickupTime: '2026-06-05 13:30', items: [{ name: '无线蓝牙耳机 Pro', spec: '黑色', price: 299, quantity: 2, image: '' }] },
    { id: 'ORD-20260604-005', userId: 'user-029', userName: '许*平', phone: '116****7777', storeId: 'store-002', storeName: '上海浦东店', totalAmount: 299, payAmount: 299, status: 'completed', orderType: 'normal', createTime: '2026-06-04 16:00', payTime: '2026-06-04 16:05', deliveryTime: '2026-06-04 17:00', pickupTime: '2026-06-04 17:30', items: [{ name: '无线蓝牙耳机 Pro', spec: '白色', price: 299, quantity: 1, image: '' }] },
    { id: 'ORD-20260603-003', userId: 'user-030', userName: '傅*燕', phone: '115****8888', storeId: 'store-001', storeName: '北京朝阳店', totalAmount: 399, payAmount: 399, status: 'completed', orderType: 'normal', createTime: '2026-06-03 10:30', payTime: '2026-06-03 10:35', deliveryTime: '2026-06-03 11:30', pickupTime: '2026-06-03 12:00', items: [{ name: '运动蓝牙耳机', spec: '蓝色', price: 399, quantity: 1, image: '' }] }
];

let currentOrderStatusFilter = 'all';
let currentStoreFilter = 'all';
let currentOrderSearchKeyword = '';

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

function handleOrderAction(orderId, action) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    if (action === 'cancel' && order.status === 'pending_payment') {
        showConfirm(`确定取消订单 ${orderId} 吗？`, function() {
            order.status = 'cancelled';
            order.statusText = '已取消';
            refreshOrdersPage();
        });
    } else if (action === 'delivery' && order.status === 'pending_delivery') {
        showConfirm(`确定发货订单 ${orderId} 吗？`, function() {
            order.status = 'pending_pickup';
            order.statusText = '待自提';
            order.deliveryTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
            alert('发货成功，请通知用户到店自提');
            refreshOrdersPage();
        });
    } else if (action === 'pickup' && order.status === 'pending_pickup') {
        showConfirm(`确定核销订单 ${orderId} 吗？`, function() {
            order.status = 'completed';
            order.statusText = '已完成';
            order.pickupTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
            alert('核销成功');
            refreshOrdersPage();
        });
    } else {
        refreshOrdersPage();
    }
}

function showOrderDetail(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeOrderDetail()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:720px;">
            <div class="modal-header">
                <h3><i class="fas fa-shopping-bag"></i> 订单详情</h3>
                <button onclick="closeOrderDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">订单号</div>
                        <div style="font-weight:600;">${order.id}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">订单状态</div>
                        <div>${getStatusBadge(order.status)}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">用户</div>
                        <div>${order.userName} · ${order.phone}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">门店</div>
                        <div>${order.storeName}</div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">商品明细</div>
                    <div style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                        ${order.items.map(item => `
                            <div style="display:flex;align-items:center;padding:12px;border-bottom:1px solid #f1f4f9;">
                                <span style="width:50px;height:50px;background:#e2e8f0;border-radius:6px;display:inline-block;margin-right:12px;"></span>
                                <div style="flex:1;">
                                    <div style="font-weight:500;">${item.name}</div>
                                    <div style="font-size:12px;color:#94a3b8;">${item.spec} x ${item.quantity}</div>
                                </div>
                                <div style="font-weight:600;">¥${item.price * item.quantity}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">金额信息</div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                            <span style="color:#64748b;">商品总价</span>
                            <span>¥${order.totalAmount}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                            <span style="color:#64748b;">运费</span>
                            <span>¥0</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                            <span style="color:#64748b;">优惠</span>
                            <span style="color:#ef4444;">¥${order.totalAmount - order.payAmount}</span>
                        </div>
                        <div style="border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between;">
                            <span style="font-weight:600;">实付金额</span>
                            <span style="font-weight:700;font-size:16px;color:#4f6ef7;">¥${order.payAmount}</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">时间节点</div>
                    <div style="padding-left:20px;border-left:2px solid #e2e8f0;">
                        <div style="position:relative;margin-bottom:12px;">
                            <div style="width:10px;height:10px;background:#4f6ef7;border-radius:50%;position:absolute;left:-25px;top:4px;"></div>
                            <div style="font-size:13px;">下单时间</div>
                            <div style="font-size:12px;color:#94a3b8;">${order.createTime}</div>
                        </div>
                        ${order.payTime ? `
                        <div style="position:relative;margin-bottom:12px;">
                            <div style="width:10px;height:10px;background:#22c55e;border-radius:50%;position:absolute;left:-25px;top:4px;"></div>
                            <div style="font-size:13px;">支付时间</div>
                            <div style="font-size:12px;color:#94a3b8;">${order.payTime}</div>
                        </div>` : ''}
                        ${order.deliveryTime ? `
                        <div style="position:relative;margin-bottom:12px;">
                            <div style="width:10px;height:10px;background:#3b82f6;border-radius:50%;position:absolute;left:-25px;top:4px;"></div>
                            <div style="font-size:13px;">发货时间</div>
                            <div style="font-size:12px;color:#94a3b8;">${order.deliveryTime}</div>
                        </div>` : ''}
                        ${order.pickupTime ? `
                        <div style="position:relative;">
                            <div style="width:10px;height:10px;background:#94a3b8;border-radius:50%;position:absolute;left:-25px;top:4px;"></div>
                            <div style="font-size:13px;">自提时间</div>
                            <div style="font-size:12px;color:#94a3b8;">${order.pickupTime}</div>
                        </div>` : ''}
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
        <style>
            .modal-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center; }
            .modal-content { background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden; }
            .modal-header { padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between; }
            .modal-header h3 { margin:0;font-size:16px;font-weight:600; }
            .modal-close { background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;padding:4px; }
            .modal-body { padding:16px 20px; }
            .modal-footer { padding:12px 20px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px; }
            .status-badge.orange { background:#fff7ed;color:#ea580c; }
            .status-badge.orange .dot { background:#fb923c; }
        </style>
        
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
                    <option value="北京朝阳店" ${currentStoreFilter === '北京朝阳店' ? 'selected' : ''}>北京朝阳店</option>
                    <option value="上海浦东店" ${currentStoreFilter === '上海浦东店' ? 'selected' : ''}>上海浦东店</option>
                    <option value="广州天河店" ${currentStoreFilter === '广州天河店' ? 'selected' : ''}>广州天河店</option>
                    <option value="深圳南山店" ${currentStoreFilter === '深圳南山店' ? 'selected' : ''}>深圳南山店</option>
                </select>` : ''}
                <button class="btn btn-primary" onclick="searchOrders()"><i class="fas fa-search"></i> 搜索</button>
            </div>
        </div>

        <div class="stats-grid" style="grid-template-columns:repeat(${isStoreStaff ? 4 : 6},1fr);">
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待支付</div><div class="value" style="font-size:22px;color:#f59e0b;">${stats.pending_payment}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-truck"></i> 待发货</div><div class="value" style="font-size:22px;color:#3b82f6;">${stats.pending_delivery}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-map-marker-alt"></i> 待自提</div><div class="value" style="font-size:22px;color:#8b5cf6;">${stats.pending_pickup}</div></div>
            ${!isStoreStaff ? `
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已完成</div><div class="value" style="font-size:22px;color:#22c55e;">${stats.completed}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-star"></i> 待评价</div><div class="value" style="font-size:22px;color:#f97316;">${stats.pending_review}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-times-circle"></i> 已取消</div><div class="value" style="font-size:22px;color:#64748b;">${stats.cancelled}</div></div>
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
                                <td><span class="tag ${order.orderType === 'seckill' ? '' : ''}" style="${order.orderType === 'seckill' ? 'background:#fee2e2;color:#dc2626;' : ''}">${order.orderType === 'seckill' ? '秒杀' : '普通'}</span></td>
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