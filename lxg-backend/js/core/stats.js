let currentStatsRange = '7d';

function getRoleSpecificStats() {
    const role = currentUser ? currentUser.role : 'super_admin';
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    let stats = {
        orders: (typeof ordersData !== 'undefined' && Array.isArray(ordersData)) ? ordersData : [],
        returns: (typeof returnsData !== 'undefined' && Array.isArray(returnsData)) ? returnsData : [],
        reviews: (typeof reviewsData !== 'undefined' && Array.isArray(reviewsData)) ? reviewsData : [],
        stock: (typeof stockData !== 'undefined' && Array.isArray(stockData)) ? stockData : [],
        users: (typeof usersData !== 'undefined' && Array.isArray(usersData)) ? usersData : [],
        coupons: (typeof couponsData !== 'undefined' && Array.isArray(couponsData)) ? couponsData : []
    };
    
    if (currentUser && currentUser.storeId) {
        stats.orders = stats.orders.filter(o => o.storeId === currentUser.storeId);
        stats.returns = stats.returns.filter(r => r.storeId === currentUser.storeId);
    }
    
    const todayOrders = stats.orders.filter(o => o.createTime.startsWith(todayStr));
    const paidOrders = stats.orders.filter(o => o.status !== 'pending_payment');
    
    return {
        orders: stats.orders,
        todayOrderCount: todayOrders.length,
        todaySales: todayOrders.reduce((sum, o) => sum + (o.payAmount || o.totalAmount), 0),
        pendingPayment: stats.orders.filter(o => o.status === 'pending_payment').length,
        pendingDelivery: stats.orders.filter(o => o.status === 'pending_delivery').length,
        pendingPickup: stats.orders.filter(o => o.status === 'pending_pickup').length,
        pendingRefunds: stats.returns.filter(r => r.status === 'pending').length,
        pendingReviews: stats.reviews.filter(r => r.status === 'pending').length,
        lowStock: stats.stock.filter(s => s.stock <= s.threshold).length,
        newUsers: stats.users.filter(u => u.registerTime.startsWith(todayStr)).length,
        avgOrderValue: paidOrders.length > 0 ? Math.round(paidOrders.reduce((sum, o) => sum + (o.payAmount || o.totalAmount), 0) / paidOrders.length) : 0,
        totalOrders: stats.orders.length,
        totalSales: paidOrders.reduce((sum, o) => sum + (o.payAmount || o.totalAmount), 0),
        role: role
    };
}

function getTodoItems() {
    const stats = getRoleSpecificStats();
    const todos = [];
    
    if (stats.pendingDelivery > 0 && hasPermission('orders')) {
        todos.push({
            id: 'delivery',
            label: `待发货订单 ${stats.pendingDelivery} 单`,
            priority: 'high',
            icon: 'fas fa-truck',
            action: 'orders'
        });
    }
    
    if (stats.pendingPickup > 0 && hasPermission('orders')) {
        todos.push({
            id: 'pickup',
            label: `待自提订单 ${stats.pendingPickup} 单`,
            priority: 'high',
            icon: 'fas fa-map-marker-alt',
            action: 'orders'
        });
    }
    
    if (stats.pendingRefunds > 0 && hasPermission('returns')) {
        todos.push({
            id: 'refunds',
            label: `待审核退款 ${stats.pendingRefunds} 笔`,
            priority: 'high',
            icon: 'fas fa-undo-alt',
            action: 'returns'
        });
    }
    
    if (stats.lowStock > 0 && hasPermission('stock')) {
        todos.push({
            id: 'stock',
            label: `库存预警 ${stats.lowStock} 个SKU`,
            priority: 'medium',
            icon: 'fas fa-exclamation-triangle',
            action: 'stock'
        });
    }
    
    if (stats.pendingReviews > 0 && hasPermission('reviews')) {
        todos.push({
            id: 'reviews',
            label: `待审核评价 ${stats.pendingReviews} 条`,
            priority: 'medium',
            icon: 'fas fa-star',
            action: 'reviews'
        });
    }
    
    if (stats.pendingPayment > 0 && hasPermission('orders')) {
        todos.push({
            id: 'payment',
            label: `待支付订单 ${stats.pendingPayment} 单`,
            priority: 'low',
            icon: 'fas fa-credit-card',
            action: 'orders'
        });
    }
    
    return todos.slice(0, 6);
}

function handleStatCardClick(action) {
    if (action === 'stock') {
        switchPage('stock');
    } else if (action === 'reviews') {
        switchPage('reviews');
    } else if (action === 'orders') {
        switchPage('orders');
    }
}

function generateChartData(range) {
    const days = range === '7d' ? 7 : 30;
    const now = new Date();
    const data = [];
    const labels = [];
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        if (range === '7d') {
            labels.push(['日', '一', '二', '三', '四', '五', '六'][date.getDay()]);
        } else {
            labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        }
        
        const dateStr = date.toISOString().split('T')[0];
        const stats = getRoleSpecificStats();
        const dayOrders = stats.orders.filter(o => o.createTime && o.createTime.startsWith(dateStr));
        const daySales = dayOrders.reduce((sum, o) => sum + (Number(o.payAmount) || Number(o.totalAmount) || 0), 0);
        
        data.push(daySales);
    }
    
    const maxVal = Math.max(...data, 1);
    const bars = data.map(v => Math.round((v / maxVal) * 160) || 10);
    
    return { labels, bars, data };
}

function getQuickActions() {
    const actions = [];
    
    if (hasPermission('goods')) {
        actions.push({
            id: 'addGoods',
            label: '新增商品',
            icon: 'fas fa-box',
            color: '#4f6ef7',
            action: 'goods',
            subAction: 'add'
        });
    }
    
    if (hasPermission('orders')) {
        actions.push({
            id: 'batchDelivery',
            label: '批量发货',
            icon: 'fas fa-truck',
            color: '#22c55e',
            action: 'orders',
            subAction: 'delivery'
        });
    }
    
    if (hasPermission('returns')) {
        actions.push({
            id: 'reviewRefunds',
            label: '退款审核',
            icon: 'fas fa-undo-alt',
            color: '#f59e0b',
            action: 'returns',
            subAction: 'review'
        });
    }
    
    if (hasPermission('marketing')) {
        actions.push({
            id: 'createSeckill',
            label: '创建秒杀',
            icon: 'fas fa-bolt',
            color: '#ef4444',
            action: 'marketing',
            subAction: 'seckill'
        });
    }
    
    if (hasPermission('coupons')) {
        actions.push({
            id: 'createCoupon',
            label: '创建优惠券',
            icon: 'fas fa-ticket-alt',
            color: '#8b5cf6',
            action: 'coupons',
            subAction: 'add'
        });
    }
    
    if (hasPermission('stock')) {
        actions.push({
            id: 'adjustStock',
            label: '库存调整',
            icon: 'fas fa-warehouse',
            color: '#ec4899',
            action: 'stock',
            subAction: 'adjust'
        });
    }
    
    return actions;
}

function statsPage() {
    const stats = getRoleSpecificStats();
    const todos = getTodoItems();
    const chartData = generateChartData(currentStatsRange);
    
    const roleTitle = {
        super_admin: '超级管理员工作台',
        goods_op: '商品运营工作台',
        order_cs: '订单客服工作台',
        store_staff: '门店店员工作台'
    }[stats.role] || '数据统计';
    
    const roleCards = {
        super_admin: [
            { label: '订单量', value: stats.totalOrders.toLocaleString(), sub: '今日 ' + stats.todayOrderCount, icon: 'fa-shopping-cart', color: '#4f6ef7' },
            { label: '销售额', value: '¥' + (stats.totalSales / 10000).toFixed(1) + '万', sub: '今日 ¥' + stats.todaySales.toLocaleString(), icon: 'fa-yen-sign', color: '#22c55e' },
            { label: '客单价', value: '¥' + stats.avgOrderValue, sub: '较昨日 ↑ 2.1%', icon: 'fa-user-tag', color: '#f59e0b' },
            { label: '新增用户', value: stats.newUsers, sub: '本月累计 1,208', icon: 'fa-user-plus', color: '#ec4899' },
            { label: '库存预警', value: stats.lowStock, sub: '低于阈值', icon: 'fa-exclamation-triangle', color: '#ef4444', highlight: stats.lowStock > 0, action: 'stock' },
            { label: '待审核评价', value: stats.pendingReviews, sub: '需处理', icon: 'fa-star', color: '#f59e0b', highlight: stats.pendingReviews > 0, action: 'reviews' }
        ],
        goods_op: [
            { label: '商品总数', value: (typeof goodsData !== 'undefined' ? goodsData.length : 0).toLocaleString(), sub: '上架中 45', icon: 'fa-box', color: '#4f6ef7' },
            { label: '库存预警', value: stats.lowStock, sub: '低于阈值', icon: 'fa-exclamation-triangle', color: '#ef4444', highlight: stats.lowStock > 0, action: 'stock' },
            { label: '待审核评价', value: stats.pendingReviews, sub: '需处理', icon: 'fa-star', color: '#f59e0b', highlight: stats.pendingReviews > 0, action: 'reviews' },
            { label: '今日销售额', value: '¥' + stats.todaySales.toLocaleString(), sub: '较昨日 ↑ 4.8%', icon: 'fa-chart-line', color: '#22c55e' },
            { label: '转化率', value: '4.2%', sub: '较上周 ↑ 0.5%', icon: 'fa-percentage', color: '#8b5cf6' },
            { label: '好评率', value: '96%', sub: '较上周 ↑ 1.2%', icon: 'fa-thumbs-up', color: '#22c55e' }
        ],
        order_cs: [
            { label: '待自提', value: stats.pendingPickup, sub: '待确认', icon: 'fa-map-marker-alt', color: '#4f6ef7', action: 'orders' },
            { label: '今日订单', value: stats.todayOrderCount, sub: '较昨日 ↑ 1.6%', icon: 'fa-shopping-bag', color: '#22c55e' },
            { label: '客服消息', value: '5', sub: '未回复', icon: 'fa-headset', color: '#8b5cf6' },
            { label: '退款完成', value: '12', sub: '今日', icon: 'fa-check-circle', color: '#22c55e' },
            { label: '库存预警', value: stats.lowStock, sub: '低于阈值', icon: 'fa-exclamation-triangle', color: '#ef4444', highlight: stats.lowStock > 0, action: 'stock' },
            { label: '待审核评价', value: stats.pendingReviews, sub: '需处理', icon: 'fa-star', color: '#f59e0b', highlight: stats.pendingReviews > 0, action: 'reviews' }
        ],
        store_staff: [
            { label: '今日订单', value: stats.todayOrderCount, sub: '较昨日 ↑ 1.6%', icon: 'fa-shopping-bag', color: '#4f6ef7' },
            { label: '今日销售额', value: '¥' + stats.todaySales.toLocaleString(), sub: '目标完成 78%', icon: 'fa-yen-sign', color: '#22c55e' },
            { label: '待自提', value: stats.pendingPickup, sub: '待确认', icon: 'fa-map-marker-alt', color: '#f59e0b', highlight: stats.pendingPickup > 0, action: 'orders' },
            { label: '库存预警', value: stats.lowStock, sub: '低于阈值', icon: 'fa-exclamation-triangle', color: '#ef4444', highlight: stats.lowStock > 0, action: 'stock' },
            { label: '退款完成', value: '12', sub: '今日', icon: 'fa-check-circle', color: '#22c55e' },
            { label: '新增用户', value: stats.newUsers, sub: '本月累计 156', icon: 'fa-user-plus', color: '#ec4899' }
        ]
    }[stats.role] || roleCards.super_admin;
    
    return `
        <div style="margin-bottom:20px;">
            <h1 style="font-size:24px;font-weight:700;color:#1e293b;margin-bottom:4px;">${roleTitle}</h1>
            <div style="font-size:14px;color:#64748b;">${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })} · 欢迎回来，${currentUser.name}</div>
        </div>

        <div class="stats-grid" style="grid-template-columns:repeat(6,1fr);gap:12px;margin-bottom:20px;">
            ${roleCards.map(card => `
                <div class="stat-card" style="${card.highlight ? 'border-color:' + card.color + ';border-width:2px;' : ''}${card.action ? 'cursor:pointer;' : ''}" ${card.action ? `onclick="handleStatCardClick('${card.action}')"` : ''}>
                    <div class="label"><i class="fas ${card.icon}" style="color:${card.color};"></i> ${card.label}</div>
                    <div class="value" style="${card.highlight ? 'color:' + card.color + ';' : ''}">${card.value}</div>
                    <div class="sub">${card.sub}</div>
                </div>
            `).join('')}
        </div>

        <div class="row-stretch">
            <div class="col-stretch" style="flex:2;">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title"><i class="fas fa-chart-bar"></i> 交易概览 · ${currentStatsRange === '7d' ? '近7日' : '近30日'}趋势</span>
                        <div style="display:flex;gap:8px;">
                            <button class="btn btn-sm ${currentStatsRange === '7d' ? 'btn-primary' : 'btn-outline'}" onclick="refreshStats('7d')">近7天</button>
                            <button class="btn btn-sm ${currentStatsRange === '30d' ? 'btn-primary' : 'btn-outline'}" onclick="refreshStats('30d')">近30天</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-placeholder">
                            ${chartData.bars.map((h,i) => {
                                const val = chartData.data[i];
                                const displayVal = val >= 10000 ? (val / 10000).toFixed(1) + '万' : val > 0 ? '¥' + val.toLocaleString() : '-';
                                return `<div class="bar-group"><div class="bar-value">${displayVal}</div><div class="bar" style="height:${h}px;"></div><div class="bar-label">${chartData.labels[i]}</div></div>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-stretch">
            <div class="col-stretch" style="flex:2;">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-crown"></i> 商品排行 · 销量TOP10</span></div>
                    <div class="card-body no-pad">
                        <div class="table-wrap"><table>
                            <thead><tr><th>#</th><th>商品</th><th>分类</th><th>销量</th><th>销售额</th><th>好评率</th><th>库存</th><th>转化率</th></tr></thead>
                            <tbody>
                                <tr><td>1</td><td>无线蓝牙耳机 Pro</td><td>手机数码</td><td>1,240</td><td>¥37.2万</td><td>98%</td><td>2,350</td><td>4.2%</td></tr>
                                <tr><td>2</td><td>智能手表 S8</td><td>手机数码</td><td>876</td><td>¥26.3万</td><td>95%</td><td>1,890</td><td>3.8%</td></tr>
                                <tr><td>3</td><td>便携移动电源 20000mAh</td><td>手机数码</td><td>654</td><td>¥15.7万</td><td>97%</td><td>3,200</td><td>5.1%</td></tr>
                                <tr><td>4</td><td>真无线降噪耳机</td><td>手机数码</td><td>432</td><td>¥12.9万</td><td>96%</td><td>1,560</td><td>3.5%</td></tr>
                                <tr><td>5</td><td>智能台灯 Pro</td><td>家用电器</td><td>386</td><td>¥7.7万</td><td>94%</td><td>2,100</td><td>4.8%</td></tr>
                                <tr><td>6</td><td>运动蓝牙耳机</td><td>运动户外</td><td>320</td><td>¥6.4万</td><td>93%</td><td>1,450</td><td>3.2%</td></tr>
                                <tr><td>7</td><td>美妆护肤套装</td><td>美妆护肤</td><td>285</td><td>¥8.5万</td><td>97%</td><td>980</td><td>5.5%</td></tr>
                                <tr><td>8</td><td>纯棉T恤</td><td>服装服饰</td><td>268</td><td>¥5.4万</td><td>95%</td><td>4,200</td><td>6.1%</td></tr>
                                <tr><td>9</td><td>机械键盘</td><td>电脑办公</td><td>245</td><td>¥7.3万</td><td>96%</td><td>890</td><td>4.0%</td></tr>
                                <tr><td>10</td><td>无线鼠标</td><td>电脑办公</td><td>218</td><td>¥4.4万</td><td>94%</td><td>2,650</td><td>5.3%</td></tr>
                            </tbody>
                        </table></div>
                    </div>
                </div>
            </div>

            <div class="col-stretch">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-store"></i> 门店销售排行</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:8px;">
                            <div style="display:flex;align-items:center;gap:8px;"><span style="width:24px;height:24px;background:#4f6ef7;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">1</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;">北京朝阳店</div><div style="font-size:12px;color:#94a3b8;">¥28.5万</div></div><div style="font-weight:700;font-size:15px;color:#4f6ef7;">28.5%</div></div>
                            <div style="display:flex;align-items:center;gap:8px;"><span style="width:24px;height:24px;background:#667eea;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">2</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;">上海浦东店</div><div style="font-size:12px;color:#94a3b8;">¥22.3万</div></div><div style="font-weight:700;font-size:15px;color:#667eea;">22.3%</div></div>
                            <div style="display:flex;align-items:center;gap:8px;"><span style="width:24px;height:24px;background:#7c3aed;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">3</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;">广州天河店</div><div style="font-size:12px;color:#94a3b8;">¥18.6万</div></div><div style="font-weight:700;font-size:15px;color:#7c3aed;">18.6%</div></div>
                            <div style="display:flex;align-items:center;gap:8px;"><span style="width:24px;height:24px;background:#8b5cf6;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">4</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;">深圳南山店</div><div style="font-size:12px;color:#94a3b8;">¥17.0万</div></div><div style="font-weight:700;font-size:15px;color:#8b5cf6;">17.0%</div></div>
                            <div style="display:flex;align-items:center;gap:8px;"><span style="width:24px;height:24px;background:#a78bfa;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">5</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;">成都天府店</div><div style="font-size:12px;color:#94a3b8;">¥8.2万</div></div><div style="font-weight:700;font-size:15px;color:#a78bfa;">8.2%</div></div>
                            <div style="display:flex;align-items:center;gap:8px;"><span style="width:24px;height:24px;background:#c4b5fd;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">6</span><div style="flex:1;"><div style="font-weight:600;font-size:13px;">杭州西湖店</div><div style="font-size:12px;color:#94a3b8;">¥5.4万</div></div><div style="font-weight:700;font-size:15px;color:#c4b5fd;">5.4%</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-trending-up"></i> 订单状态分布</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:10px;">
                            <div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;"><span>待付款</span><span style="font-weight:600;">${stats.pendingPayment}</span></div><div style="height:14px;background:#e2e8f0;border-radius:7px;overflow:hidden;"><div style="width:${stats.totalOrders > 0 ? (stats.pendingPayment / stats.totalOrders * 100) : 0}%;height:100%;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:7px;"></div></div></div>
                            <div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;"><span>待发货</span><span style="font-weight:600;">${stats.pendingDelivery}</span></div><div style="height:14px;background:#e2e8f0;border-radius:7px;overflow:hidden;"><div style="width:${stats.totalOrders > 0 ? (stats.pendingDelivery / stats.totalOrders * 100) : 0}%;height:100%;background:linear-gradient(90deg,#4f6ef7,#667eea);border-radius:7px;"></div></div></div>
                            <div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;"><span>待自提</span><span style="font-weight:600;">${stats.pendingPickup}</span></div><div style="height:14px;background:#e2e8f0;border-radius:7px;overflow:hidden;"><div style="width:${stats.totalOrders > 0 ? (stats.pendingPickup / stats.totalOrders * 100) : 0}%;height:100%;background:linear-gradient(90deg,#22c55e,#4ade80);border-radius:7px;"></div></div></div>
                            <div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;"><span>已完成</span><span style="font-weight:600;">${stats.orders.filter(o => o.status === 'completed').length}</span></div><div style="height:14px;background:#e2e8f0;border-radius:7px;overflow:hidden;"><div style="width:${stats.totalOrders > 0 ? (stats.orders.filter(o => o.status === 'completed').length / stats.totalOrders * 100) : 0}%;height:100%;background:linear-gradient(90deg,#94a3b8,#cbd5e1);border-radius:7px;"></div></div></div>
                        </div>
                        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #f1f4f9;">
                            <div style="display:flex;justify-content:space-between;font-size:13px;">
                                <span style="color:#94a3b8;">总订单量</span>
                                <span style="font-weight:700;font-size:18px;">${stats.totalOrders}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleTodoClick(action) {
    switchPage(action);
}

function handleQuickAction(action, subAction) {
    switchPage(action);
    setTimeout(() => {
        if (action === 'goods' && subAction === 'add') {
            try { 
                showAddGoodsModal();
            } catch(e) { 
                console.error('showAddGoodsModal error:', e);
                createAddGoodsModal();
            }
        } else if (action === 'coupons' && subAction === 'add') {
            try { showAddCouponModal(); } catch(e) {}
        } else if (action === 'stock' && subAction === 'adjust') {
            try { showStockAdjustModal(); } catch(e) {}
        } else if (action === 'marketing' && subAction === 'seckill') {
            try { showAddSeckillModal(); } catch(e) {}
        }
    }, 300);
}

function createAddGoodsModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;">
            <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
                <h3 style="font-size:16px;font-weight:600;color:#1e293b;margin:0;"><i class="fas fa-plus"></i> 新增商品</h3>
                <button onclick="closeGoodsDetail()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;padding:4px;" onmouseover="this.style.color='#64748b'"><i class="fas fa-times"></i></button>
            </div>
            <div style="padding:20px;overflow-y:auto;max-height:60vh;">
                <div style="display:flex;justify-content:center;margin-bottom:16px;">
                    <div style="display:flex;align-items:center;gap:24px;">
                        <div style="text-align:center;">
                            <div style="width:36px;height:36px;background:#4f6ef7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;"><span style="font-size:14px;color:#fff;">1</span></div>
                            <div style="font-size:12px;color:#4f6ef7;">基础信息</div>
                        </div>
                        <div style="width:60px;height:2px;background:#e2e8f0;"></div>
                        <div style="text-align:center;">
                            <div style="width:36px;height:36px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;"><span style="font-size:14px;color:#94a3b8;">2</span></div>
                            <div style="font-size:12px;color:#94a3b8;">规格设置</div>
                        </div>
                        <div style="width:60px;height:2px;background:#e2e8f0;"></div>
                        <div style="text-align:center;">
                            <div style="width:36px;height:36px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;"><span style="font-size:14px;color:#94a3b8;">3</span></div>
                            <div style="font-size:12px;color:#94a3b8;">SKU配置</div>
                        </div>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">商品名称 <span style="color:#ef4444;">*</span></label><input type="text" placeholder="请输入商品名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">品牌</label><select style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;"><option>请选择品牌</option><option>华为</option><option>苹果</option><option>小米</option><option>索尼</option><option>三星</option><option>美的</option></select></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">分类 <span style="color:#ef4444;">*</span></label><select style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;"><option>请选择分类</option><option>手机数码</option><option>家用电器</option><option>服装服饰</option><option>运动户外</option><option>美妆护肤</option></select></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">原价 <span style="color:#ef4444;">*</span></label><input type="number" placeholder="请输入原价" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">商品描述</label><textarea rows="3" placeholder="请输入商品描述" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'"></textarea></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">主图</label><div style="border:1px dashed #e2e8f0;border-radius:8px;padding:24px;text-align:center;"><i class="fas fa-upload" style="color:#94a3b8;font-size:24px;"></i><div style="font-size:13px;color:#94a3b8;margin-top:8px;">点击上传主图</div></div></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">轮播图</label><div style="border:1px dashed #e2e8f0;border-radius:8px;padding:24px;text-align:center;"><i class="fas fa-images" style="color:#94a3b8;font-size:24px;"></i><div style="font-size:13px;color:#94a3b8;margin-top:8px;">点击上传轮播图</div></div></div>
                    <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">初始状态</label><div style="display:flex;gap:16px;"><label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="initialStatus" checked style="accent-color:#4f6ef7;" />下架（默认）</label><label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="initialStatus" style="accent-color:#4f6ef7;" />上架</label></div></div>
                </div>
            </div>
            <div style="padding:16px 20px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:10px;">
                <button style="padding:8px 16px;border:1px solid #e2e8f0;border-radius:6px;background:#fff;color:#64748b;cursor:pointer;font-size:13px;" onclick="closeGoodsDetail()">取消</button>
                <button style="padding:8px 16px;border:none;border-radius:6px;background:#4f6ef7;color:#fff;cursor:pointer;font-size:13px;" onclick="closeGoodsDetail();alert('商品保存成功！');refreshGoodsPage();"><i class="fas fa-arrow-right"></i> 下一步</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function refreshStats(range) {
    currentStatsRange = range;
    renderAllPages();
    switchPage('stats');
}