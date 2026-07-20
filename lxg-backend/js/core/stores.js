let storesData = [];
let storesLoaded = false;

async function loadStores() {
    try {
        const response = await apiGet(API_CONFIG.stores.list);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        storesData = dataList.map(store => ({
            id: store.ID || store.id,
            name: store.name,
            address: store.address,
            phone: store.phone,
            businessHours: store.businessHours,
            status: store.status === 1 ? 'active' : 'disabled',
            createTime: store.CreatedAt || store.createdAt || '',
            orderCount: store.orderCount || 0,
            clerkCount: store.clerkCount || 0
        }));
    } catch (error) {
        console.error('Failed to load stores:', error);
    } finally {
        storesLoaded = true;
        refreshStoresPage();
    }
}

function getStatusBadge(status) {
    const colors = { active: 'green', disabled: 'red' };
    const texts = { active: '营业中', disabled: '已停用' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

async function handleStoreAction(storeId, action) {
    const store = storesData.find(s => s.id === storeId);
    if (!store) return;
    
    if (action === 'toggle') {
        try {
            const newStatus = store.status === 'active' ? 0 : 1;
            const response = await apiPut(API_CONFIG.stores.toggle, { status: newStatus }, { id: storeId });
            
            if (response.code === 200) {
                store.status = store.status === 'active' ? 'disabled' : 'active';
                refreshStoresPage();
            } else {
                alert(response.message || '操作失败');
            }
        } catch (error) {
            console.error('Failed to toggle store status:', error);
            alert('操作失败，请重试');
        }
    }
    
    refreshStoresPage();
}

function showAddStoreModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeStoreModal()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增门店</h3>
                <button onclick="closeStoreModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body modal-body-scroll">
                <div class="form-grid">
                    <div><label class="form-label">门店名称 <span class="form-required">*</span></label><input type="text" id="storeName" placeholder="请输入门店名称" class="form-input" /></div>
                    <div><label class="form-label">联系电话 <span class="form-required">*</span></label><input type="text" id="storePhone" placeholder="请输入联系电话" class="form-input" /></div>
                    <div class="form-grid-full"><label class="form-label">门店地址 <span class="form-required">*</span></label><input type="text" id="storeAddress" placeholder="请输入门店地址" class="form-input" /></div>
                    <div><label class="form-label">营业时间</label><div style="display:flex;gap:8px;"><input type="time" id="storeStartHour" value="09:00" class="form-input" /><span class="text-muted">~</span><input type="time" id="storeEndHour" value="21:00" class="form-input" /></div></div>
                    <div class="form-grid-full"><label class="form-label">门店公告</label><textarea rows="3" id="storeNotice" placeholder="请输入门店公告（选填）" class="form-textarea"></textarea></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeStoreModal()">取消</button>
                <button class="btn btn-primary" onclick="saveStore()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

async function saveStore() {
    const name = document.getElementById('storeName').value.trim();
    const phone = document.getElementById('storePhone').value.trim();
    const address = document.getElementById('storeAddress').value.trim();
    const businessHours = `${document.getElementById('storeStartHour').value}-${document.getElementById('storeEndHour').value}`;
    const announcement = document.getElementById('storeNotice').value.trim();
    
    if (!name || !phone || !address) {
        alert('请填写必填字段');
        return;
    }
    
    try {
        const response = await apiPost(API_CONFIG.stores.add, {
            name: name,
            address: address,
            phone: phone,
            businessHours: businessHours,
            announcement: announcement,
            status: 1
        });
        
        if (response.code === 200 || response.code === 201) {
            alert('门店创建成功！');
            closeStoreModal();
            await loadStores();
        } else {
            alert(response.message || '创建失败');
        }
    } catch (error) {
        console.error('Failed to create store:', error);
        alert('创建门店失败，请重试');
    }
}

function closeStoreModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshStoresPage() {
    const panel = document.getElementById('panel-stores');
    if (panel) panel.innerHTML = storesPage();
}

function getStoreStats(storeId) {
    const orders = Array.isArray(ordersData) ? ordersData : [];
    const returns = Array.isArray(returnsData) ? returnsData : [];
    
    const storeOrders = storeId ? orders.filter(o => o && o.storeId === storeId) : [];
    const storeReturns = storeId ? returns.filter(r => r && r.storeId === storeId) : [];
    
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = storeOrders.filter(o => o.createTime && o.createTime.startsWith(today));
    
    return {
        todayOrderCount: todayOrders.length,
        todaySales: todayOrders.reduce((sum, o) => sum + (Number(o.payAmount) || Number(o.totalAmount) || 0), 0),
        pendingDelivery: storeOrders.filter(o => o.status === 'pending_delivery').length,
        pendingPickup: storeOrders.filter(o => o.status === 'pending_pickup').length,
        pendingRefunds: storeReturns.filter(r => r.status === 'pending').length,
        totalOrders: storeOrders.length,
        completedOrders: storeOrders.filter(o => o.status === 'completed').length,
        totalSales: storeOrders.reduce((sum, o) => sum + (Number(o.payAmount) || Number(o.totalAmount) || 0), 0)
    };
}

function showStoreDetail(storeId) {
    const store = storesData.find(s => s.id === storeId);
    if (!store) return;
    
    const stats = getStoreStats(storeId);
    const storeOrders = Array.isArray(ordersData) ? ordersData.filter(o => o && o.storeId === storeId) : [];
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeStoreDetail()"></div>
        <div class="modal-content modal-width-xl">
            <div class="modal-header">
                <div>
                    <h3 class="store-header-title">${store.name}</h3>
                    <p class="store-header-address">${store.address}</p>
                </div>
                <div class="store-header-actions">
                    ${getStatusBadge(store.status)}
                    <button onclick="closeStoreDetail()" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="modal-body modal-body-scroll">
                <div class="stats-row">
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-shopping-cart"></i> 今日订单</div>
                        <div class="value" style="font-size:24px;color:#4f6ef7;">${stats.todayOrderCount}</div>
                        <div class="sub">笔订单</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-yen-sign"></i> 今日销售额</div>
                        <div class="value" style="font-size:24px;color:#22c55e;">¥${stats.todaySales.toLocaleString()}</div>
                        <div class="sub">元</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-truck"></i> 待发货</div>
                        <div class="value" style="font-size:24px;color:#3b82f6;">${stats.pendingDelivery}</div>
                        <div class="sub">笔订单</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-map-marker-alt"></i> 待自提</div>
                        <div class="value" style="font-size:24px;color:#f59e0b;">${stats.pendingPickup}</div>
                        <div class="sub">笔订单</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-undo"></i> 待退款</div>
                        <div class="value" style="font-size:24px;color:#ef4444;">${stats.pendingRefunds}</div>
                        <div class="sub">笔申请</div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;">
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title"><i class="fas fa-list"></i> 门店订单列表</span>
                            <span class="text-muted" style="font-size:13px;">共 ${storeOrders.length} 笔订单</span>
                        </div>
                        <div class="card-body no-pad">
                            <div class="table-wrap"><table>
                                <thead><tr><th>订单号</th><th>用户</th><th>商品</th><th>金额</th><th>状态</th><th>下单时间</th><th>操作</th></tr></thead>
                                <tbody>
                                    ${storeOrders.slice(0, 15).map(order => `
                                        <tr>
                                            <td>${order.id}</td>
                                            <td><div><span>${order.userName}</span><div style="font-size:12px;color:#94a3b8;">${order.phone}</div></div></td>
                                            <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Array.isArray(order.items) ? order.items.map(i => i.name).join('、') : ''}</td>
                                            <td><div style="font-weight:600;">¥${((order.payAmount || order.totalAmount) || 0).toLocaleString()}</div></td>
                                            <td>${getStatusBadge(order.status)}</td>
                                            <td>${order.createTime}</td>
                                            <td>
                                                <button class="btn btn-sm btn-outline" onclick="showOrderDetail('${order.id}');closeStoreDetail();"><i class="fas fa-eye"></i> 详情</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                    ${storeOrders.length === 0 ? `
                                        <tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;"><i class="fas fa-inbox"></i> 暂无订单</td></tr>
                                    ` : ''}
                                </tbody>
                            </table></div>
                        </div>
                    </div>

                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 门店信息</span></div>
                            <div class="card-body">
                                <div class="detail-info-list">
                                    <div class="detail-info-row">
                                        <span class="label">门店ID</span>
                                        <span class="value" style="font-family:monospace;">${store.id}</span>
                                    </div>
                                    <div class="detail-info-row">
                                        <span class="label">联系电话</span>
                                        <span class="value">${store.phone}</span>
                                    </div>
                                    <div class="detail-info-row">
                                        <span class="label">营业时间</span>
                                        <span class="value">${store.businessHours}</span>
                                    </div>
                                    <div class="detail-info-row">
                                        <span class="label">累计订单</span>
                                        <span class="value">${store.orderCount} 笔</span>
                                    </div>
                                    <div class="detail-info-row">
                                        <span class="label">累计销售额</span>
                                        <span class="value price">¥${stats.totalSales.toLocaleString()}</span>
                                    </div>
                                    <div class="detail-info-row">
                                        <span class="label">创建时间</span>
                                        <span class="value">${store.createTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 订单状态分布</span></div>
                            <div class="card-body">
                                <div style="display:flex;flex-direction:column;gap:10px;">
                                    <div>
                                        <div class="progress-label-row">
                                            <span class="label">待发货</span>
                                            <span class="value">${stats.pendingDelivery}</span>
                                        </div>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar blue" style="width:${stats.totalOrders > 0 ? (stats.pendingDelivery / stats.totalOrders) * 100 : 0}%;"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="progress-label-row">
                                            <span class="label">待自提</span>
                                            <span class="value">${stats.pendingPickup}</span>
                                        </div>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar yellow" style="width:${stats.totalOrders > 0 ? (stats.pendingPickup / stats.totalOrders) * 100 : 0}%;"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="progress-label-row">
                                            <span class="label">已完成</span>
                                            <span class="value">${stats.completedOrders}</span>
                                        </div>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar green" style="width:${stats.totalOrders > 0 ? (stats.completedOrders / stats.totalOrders) * 100 : 0}%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 待办提醒</span></div>
                            <div class="card-body">
                                ${stats.pendingDelivery > 0 ? `
                                <div class="alert-box info">
                                    <i class="fas fa-truck"></i> 有 ${stats.pendingDelivery} 笔订单待发货
                                </div>` : ''}
                                ${stats.pendingPickup > 0 ? `
                                <div class="alert-box warning">
                                    <i class="fas fa-map-marker-alt"></i> 有 ${stats.pendingPickup} 笔订单待自提
                                </div>` : ''}
                                ${stats.pendingRefunds > 0 ? `
                                <div class="alert-box error">
                                    <i class="fas fa-undo"></i> 有 ${stats.pendingRefunds} 笔退款待审核
                                </div>` : ''}
                                ${stats.pendingDelivery === 0 && stats.pendingPickup === 0 && stats.pendingRefunds === 0 ? `
                                <div class="alert-box success">
                                    <i class="fas fa-check-circle"></i> 暂无待处理事项
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeStoreDetail()">关闭</button>
                <button class="btn btn-primary" onclick="switchPage('orders');closeStoreDetail();"><i class="fas fa-shopping-bag"></i> 查看全部门店订单</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function closeStoreDetail() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function showEditStoreModal(storeId) {
    const store = storesData.find(s => s.id === storeId);
    if (!store) return;
    
    const [startHour, endHour] = store.businessHours.split('-');
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeStoreModal()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑门店</h3>
                <button onclick="closeStoreModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body modal-body-scroll">
                <div class="form-grid">
                    <div><label class="form-label">门店名称 <span class="form-required">*</span></label><input type="text" id="storeName" value="${store.name}" placeholder="请输入门店名称" class="form-input" /></div>
                    <div><label class="form-label">联系电话 <span class="form-required">*</span></label><input type="text" id="storePhone" value="${store.phone}" placeholder="请输入联系电话" class="form-input" /></div>
                    <div class="form-grid-full"><label class="form-label">门店地址 <span class="form-required">*</span></label><input type="text" id="storeAddress" value="${store.address}" placeholder="请输入门店地址" class="form-input" /></div>
                    <div><label class="form-label">营业时间</label><div style="display:flex;gap:8px;"><input type="time" id="storeStartHour" value="${startHour || '09:00'}" class="form-input" /><span class="text-muted">~</span><input type="time" id="storeEndHour" value="${endHour || '21:00'}" class="form-input" /></div></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeStoreModal()">取消</button>
                <button class="btn btn-primary" onclick="saveEditStore('${store.id}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

async function saveEditStore(storeId) {
    const store = storesData.find(s => s.id === storeId);
    if (!store) return;
    
    const name = document.getElementById('storeName').value.trim();
    const phone = document.getElementById('storePhone').value.trim();
    const address = document.getElementById('storeAddress').value.trim();
    const businessHours = `${document.getElementById('storeStartHour').value}-${document.getElementById('storeEndHour').value}`;
    
    if (!name || !phone || !address) {
        alert('请填写必填字段');
        return;
    }
    
    try {
        const response = await apiPut(API_CONFIG.stores.edit, {
            name: name,
            phone: phone,
            address: address,
            businessHours: businessHours
        }, { id: storeId });
        
        if (response.code === 200) {
            store.name = name;
            store.phone = phone;
            store.address = address;
            store.businessHours = businessHours;
            
            alert('门店信息更新成功！');
            closeStoreModal();
            refreshStoresPage();
        } else {
            alert(response.message || '更新失败');
        }
    } catch (error) {
        console.error('Failed to update store:', error);
        alert('更新门店失败，请重试');
    }
}

function storesPage() {
    const isSuperAdmin = currentUser.role === 'super_admin';
    const isStoreStaff = currentUser.role === 'store_staff';
    
    if (!storesLoaded) {
        return `
            <div class="skeleton-loading">
                <div class="skeleton-spinner"></div>
                <div class="skeleton-text">正在加载门店数据...</div>
            </div>
        `;
    }
    
    if (storesData.length === 0) {
        return `
            <div class="empty-state-box">
                <div class="empty-state-icon">
                    <i class="fas fa-store"></i>
                </div>
                <div class="empty-state-text">暂无门店数据</div>
                <button class="btn btn-primary" onclick="showAddStoreModal()"><i class="fas fa-plus"></i> 新增门店</button>
            </div>
        `;
    }
    
    if (isStoreStaff && currentUser.storeId) {
        const stats = getStoreStats(currentUser.storeId);
        const store = storesData.find(s => s.id === currentUser.storeId);
        
        return `
            <div class="store-header-card">
                <div class="store-header-top">
                    <div>
                        <h2 class="store-header-title">${store?.name || '我的门店'}</h2>
                        <p class="store-header-address">${store?.address || '-'}</p>
                    </div>
                    <div class="store-header-actions">
                        ${getStatusBadge(store?.status || 'active')}
                        <span class="tag">${store?.businessHours || '-'}</span>
                    </div>
                </div>
                
                <div style="display:flex;gap:16px;">
                    <button class="btn btn-primary" onclick="switchPage('orders')"><i class="fas fa-shopping-bag"></i> 门店订单</button>
                    <button class="btn btn-outline" onclick="switchPage('returns')"><i class="fas fa-undo"></i> 退款管理</button>
                    <button class="btn btn-outline"><i class="fas fa-qrcode"></i> 自提核销</button>
                    <button class="btn btn-outline"><i class="fas fa-edit"></i> 编辑门店信息</button>
                </div>
            </div>

            <div class="stats-row">
                <div class="stat-card stat-card-large">
                    <div class="label"><i class="fas fa-shopping-cart"></i> 今日订单</div>
                    <div class="value" style="font-size:28px;color:#4f6ef7;">${stats.todayOrderCount}</div>
                    <div class="sub">笔订单</div>
                </div>
                <div class="stat-card stat-card-large">
                    <div class="label"><i class="fas fa-yen-sign"></i> 今日销售额</div>
                    <div class="value" style="font-size:28px;color:#22c55e;">¥${stats.todaySales}</div>
                    <div class="sub">元</div>
                </div>
                <div class="stat-card stat-card-large">
                    <div class="label"><i class="fas fa-truck"></i> 待发货</div>
                    <div class="value" style="font-size:28px;color:#3b82f6;">${stats.pendingDelivery}</div>
                    <div class="sub">笔订单</div>
                </div>
                <div class="stat-card stat-card-large">
                    <div class="label"><i class="fas fa-map-marker-alt"></i> 待自提</div>
                    <div class="value" style="font-size:28px;color:#f59e0b;">${stats.pendingPickup}</div>
                    <div class="sub">笔订单</div>
                </div>
                <div class="stat-card stat-card-large">
                    <div class="label"><i class="fas fa-undo"></i> 待处理退款</div>
                    <div class="value" style="font-size:28px;color:#ef4444;">${stats.pendingRefunds}</div>
                    <div class="sub">笔申请</div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
                <div class="card">
                    <div class="card-header">
                        <span class="card-title"><i class="fas fa-list"></i> 门店订单列表</span>
                        <span class="text-muted" style="font-size:13px;">近30天共 ${stats.totalOrders} 笔订单</span>
                    </div>
                    <div class="card-body no-pad">
                        <div class="table-wrap"><table>
                            <thead><tr><th>订单号</th><th>用户</th><th>商品</th><th>金额</th><th>状态</th><th>下单时间</th><th>操作</th></tr></thead>
                            <tbody>
                                ${(Array.isArray(ordersData) ? ordersData.filter(o => o && o.storeId === currentUser.storeId) : []).slice(0, 10).map(order => `
                                    <tr>
                                        <td>${order.id}</td>
                                        <td><div><span>${order.userName}</span><div style="font-size:12px;color:#94a3b8;">${order.phone}</div></div></td>
                                        <td>${order.items.map(i => i.name).join('、')}</td>
                                        <td><div style="font-weight:600;">¥${order.payAmount}</div></td>
                                        <td>${getStatusBadge(order.status)}</td>
                                        <td>${order.createTime}</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline" onclick="showOrderDetail('${order.id}')"><i class="fas fa-eye"></i> 详情</button>
                                            ${order.status === 'pending_delivery' ? `<button class="btn btn-sm btn-success" onclick="handleOrderAction('${order.id}', 'delivery')"><i class="fas fa-truck"></i> 发货</button>` : ''}
                                            ${order.status === 'pending_pickup' ? `<button class="btn btn-sm btn-success" onclick="handleOrderAction('${order.id}', 'pickup')"><i class="fas fa-check"></i> 核销</button>` : ''}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table></div>
                    </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 订单状态分布</span></div>
                            <div class="card-body">
                                <div style="display:flex;flex-direction:column;gap:10px;">
                                    <div>
                                        <div class="progress-label-row">
                                            <span class="label">待发货</span>
                                            <span class="value">${stats.pendingDelivery}</span>
                                        </div>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar blue" style="width:${stats.totalOrders > 0 ? (stats.pendingDelivery / stats.totalOrders) * 100 : 0}%;"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="progress-label-row">
                                            <span class="label">待自提</span>
                                            <span class="value">${stats.pendingPickup}</span>
                                        </div>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar yellow" style="width:${stats.totalOrders > 0 ? (stats.pendingPickup / stats.totalOrders) * 100 : 0}%;"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="progress-label-row">
                                            <span class="label">已完成</span>
                                            <span class="value">${(Array.isArray(ordersData) ? ordersData.filter(o => o && o.storeId === currentUser.storeId && o.status === 'completed') : []).length}</span>
                                        </div>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar green" style="width:${stats.totalOrders > 0 ? ((Array.isArray(ordersData) ? ordersData.filter(o => o && o.storeId === currentUser.storeId && o.status === 'completed') : []).length / stats.totalOrders) * 100 : 0}%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 门店信息</span></div>
                            <div class="card-body">
                                <div class="detail-info-list">
                                    <div class="detail-info-row">
                                        <span class="label">门店电话</span>
                                        <span class="value">${store?.phone || '-'}</span>
                                    </div>
                                    <div class="detail-info-row">
                                        <span class="label">营业时间</span>
                                        <span class="value">${store?.businessHours || '-'}</span>
                                    </div>
                                    <div class="detail-info-row">
                                        <span class="label">累计订单</span>
                                        <span class="value">${store?.orderCount || 0} 笔</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 今日提醒</span></div>
                            <div class="card-body">
                                ${stats.pendingDelivery > 0 ? `
                                <div class="alert-box info">
                                    <i class="fas fa-truck"></i> 有 ${stats.pendingDelivery} 笔订单待发货
                                </div>` : ''}
                                ${stats.pendingPickup > 0 ? `
                                <div class="alert-box warning">
                                    <i class="fas fa-map-marker-alt"></i> 有 ${stats.pendingPickup} 笔订单待自提
                                </div>` : ''}
                                ${stats.pendingRefunds > 0 ? `
                                <div class="alert-box error">
                                    <i class="fas fa-undo"></i> 有 ${stats.pendingRefunds} 笔退款待审核
                                </div>` : ''}
                                ${stats.pendingDelivery === 0 && stats.pendingPickup === 0 && stats.pendingRefunds === 0 ? `
                                <div class="alert-box success">
                                    <i class="fas fa-check-circle"></i> 今日暂无待处理事项
                            </div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const activeCount = storesData.filter(s => s.status === 'active').length;
    const disabledCount = storesData.filter(s => s.status === 'disabled').length;
    
    return `
        <div class="flex-between mb-4">
            <span></span>
            <button class="btn btn-primary" onclick="showAddStoreModal()"><i class="fas fa-plus"></i> 新增门店</button>
        </div>

        <div class="stats-grid stats-row-3">
            <div class="stat-card"><div class="label"><i class="fas fa-store"></i> 总门店</div><div class="value">${storesData.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 营业中</div><div class="value" style="color:#22c55e;">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-times-circle"></i> 已停用</div><div class="value" style="color:#ef4444;">${disabledCount}</div></div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-building"></i> 门店列表</span>
                <span class="text-muted" style="font-size:13px;">共 ${storesData.length} 家门店</span>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th>门店名称</th><th>地址</th><th>电话</th><th>营业时间</th><th>累计订单</th><th>状态</th><th>操作</th></tr></thead>
                    <tbody>
                        ${storesData.map(store => `
                            <tr>
                                <td><span style="font-weight:600;">${store.name}</span></td>
                                <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${store.address}</td>
                                <td>${store.phone}</td>
                                <td>${store.businessHours}</td>
                                <td>${store.orderCount}</td>
                                <td>${getStatusBadge(store.status)}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline" onclick="showStoreDetail('${store.id}')"><i class="fas fa-eye"></i> 查看</button>
                                    <button class="btn btn-sm btn-outline" onclick="showEditStoreModal('${store.id}')"><i class="fas fa-edit"></i> 编辑</button>
                                    <button class="btn btn-sm btn-outline" onclick="switchPage('orders');setTimeout(() => { if(window.filterOrdersByStore) filterOrdersByStore('${store.id}'); }, 200);"><i class="fas fa-shopping-bag"></i> 门店订单</button>
                                    ${store.status === 'active' ? `
                                    <button class="btn btn-sm btn-danger" onclick="handleStoreAction('${store.id}', 'toggle')"><i class="fas fa-times"></i> 停用</button>
                                    ` : `
                                    <button class="btn btn-sm btn-success" onclick="handleStoreAction('${store.id}', 'toggle')"><i class="fas fa-play"></i> 启用</button>
                                    `}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 门店销售排行</span></div>
            <div class="card-body">
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
                    ${storesData.filter(s => s.status === 'active').sort((a, b) => b.orderCount - a.orderCount).slice(0, 6).map((store, index) => `
                        <div class="rank-card ${index === 0 ? 'top' : ''}">
                            <div class="rank-header">
                                <span class="rank-badge ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'other'}">${index + 1}</span>
                                <span class="rank-name">${store.name}</span>
                            </div>
                            <div class="rank-value">${store.orderCount}</div>
                            <div class="rank-label">累计订单</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}