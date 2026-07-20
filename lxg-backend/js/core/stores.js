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
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeStoreModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:560px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增门店</h3>
                <button onclick="closeStoreModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">门店名称 <span style="color:#ef4444;">*</span></label><input type="text" id="storeName" placeholder="请输入门店名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">联系电话 <span style="color:#ef4444;">*</span></label><input type="text" id="storePhone" placeholder="请输入联系电话" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">门店地址 <span style="color:#ef4444;">*</span></label><input type="text" id="storeAddress" placeholder="请输入门店地址" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">营业时间</label><div style="display:flex;gap:8px;"><input type="time" id="storeStartHour" value="09:00" style="flex:1;padding:8px;border:1px solid #e2e8f0;border-radius:6px;" /><span style="color:#94a3b8;">~</span><input type="time" id="storeEndHour" value="21:00" style="flex:1;padding:8px;border:1px solid #e2e8f0;border-radius:6px;" /></div></div>
                    <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">门店公告</label><textarea rows="3" id="storeNotice" placeholder="请输入门店公告（选填）" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'"></textarea></div>
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
        <div class="modal-overlay" onclick="closeStoreDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:900px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:90vh;overflow:hidden;z-index:1001;">
            <div class="modal-header">
                <div>
                    <h3 style="font-size:18px;font-weight:700;color:#1e293b;margin:0;">${store.name}</h3>
                    <p style="font-size:13px;color:#64748b;margin:4px 0 0;">${store.address}</p>
                </div>
                <div style="display:flex;gap:8px;">
                    ${getStatusBadge(store.status)}
                    <button onclick="closeStoreDetail()" class="modal-close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="modal-body" style="overflow-y:auto;max-height:calc(90vh - 120px);">
                <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:16px;">
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-shopping-cart"></i> 今日订单</div>
                        <div class="value" style="font-size:24px;color:#4f6ef7;">${stats.todayOrderCount}</div>
                        <div style="font-size:12px;color:#94a3b8;">笔订单</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-yen-sign"></i> 今日销售额</div>
                        <div class="value" style="font-size:24px;color:#22c55e;">¥${stats.todaySales.toLocaleString()}</div>
                        <div style="font-size:12px;color:#94a3b8;">元</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-truck"></i> 待发货</div>
                        <div class="value" style="font-size:24px;color:#3b82f6;">${stats.pendingDelivery}</div>
                        <div style="font-size:12px;color:#94a3b8;">笔订单</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-map-marker-alt"></i> 待自提</div>
                        <div class="value" style="font-size:24px;color:#f59e0b;">${stats.pendingPickup}</div>
                        <div style="font-size:12px;color:#94a3b8;">笔订单</div>
                    </div>
                    <div class="stat-card">
                        <div class="label"><i class="fas fa-undo"></i> 待退款</div>
                        <div class="value" style="font-size:24px;color:#ef4444;">${stats.pendingRefunds}</div>
                        <div style="font-size:12px;color:#94a3b8;">笔申请</div>
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
                                <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
                                    <div style="display:flex;justify-content:space-between;">
                                        <span style="color:#64748b;">门店ID</span>
                                        <span style="font-family:monospace;">${store.id}</span>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;">
                                        <span style="color:#64748b;">联系电话</span>
                                        <span>${store.phone}</span>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;">
                                        <span style="color:#64748b;">营业时间</span>
                                        <span>${store.businessHours}</span>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;">
                                        <span style="color:#64748b;">累计订单</span>
                                        <span>${store.orderCount} 笔</span>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;">
                                        <span style="color:#64748b;">累计销售额</span>
                                        <span style="font-weight:600;color:#4f6ef7;">¥${stats.totalSales.toLocaleString()}</span>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;">
                                        <span style="color:#64748b;">创建时间</span>
                                        <span>${store.createTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 订单状态分布</span></div>
                            <div class="card-body">
                                <div style="display:flex;flex-direction:column;gap:10px;">
                                    <div>
                                        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                            <span>待发货</span>
                                            <span style="font-weight:600;">${stats.pendingDelivery}</span>
                                        </div>
                                        <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                                            <div style="width:${stats.totalOrders > 0 ? (stats.pendingDelivery / stats.totalOrders) * 100 : 0}%;height:100%;background:#3b82f6;border-radius:4px;"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                            <span>待自提</span>
                                            <span style="font-weight:600;">${stats.pendingPickup}</span>
                                        </div>
                                        <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                                            <div style="width:${stats.totalOrders > 0 ? (stats.pendingPickup / stats.totalOrders) * 100 : 0}%;height:100%;background:#f59e0b;border-radius:4px;"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                            <span>已完成</span>
                                            <span style="font-weight:600;">${stats.completedOrders}</span>
                                        </div>
                                        <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                                            <div style="width:${stats.totalOrders > 0 ? (stats.completedOrders / stats.totalOrders) * 100 : 0}%;height:100%;background:#22c55e;border-radius:4px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 待办提醒</span></div>
                            <div class="card-body">
                                ${stats.pendingDelivery > 0 ? `
                                <div style="padding:10px 12px;background:#dbeafe;border-radius:6px;font-size:12px;color:#1e40af;margin-bottom:8px;">
                                    <i class="fas fa-truck"></i> 有 ${stats.pendingDelivery} 笔订单待发货
                                </div>` : ''}
                                ${stats.pendingPickup > 0 ? `
                                <div style="padding:10px 12px;background:#fef3c7;border-radius:6px;font-size:12px;color:#b45309;margin-bottom:8px;">
                                    <i class="fas fa-map-marker-alt"></i> 有 ${stats.pendingPickup} 笔订单待自提
                                </div>` : ''}
                                ${stats.pendingRefunds > 0 ? `
                                <div style="padding:10px 12px;background:#fee2e2;border-radius:6px;font-size:12px;color:#b91c1c;">
                                    <i class="fas fa-undo"></i> 有 ${stats.pendingRefunds} 笔退款待审核
                                </div>` : ''}
                                ${stats.pendingDelivery === 0 && stats.pendingPickup === 0 && stats.pendingRefunds === 0 ? `
                                <div style="padding:10px 12px;background:#e8f5e9;border-radius:6px;font-size:12px;color:#166534;text-align:center;">
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
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeStoreModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:560px;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑门店</h3>
                <button onclick="closeStoreModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">门店名称 <span style="color:#ef4444;">*</span></label><input type="text" id="storeName" value="${store.name}" placeholder="请输入门店名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">联系电话 <span style="color:#ef4444;">*</span></label><input type="text" id="storePhone" value="${store.phone}" placeholder="请输入联系电话" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">门店地址 <span style="color:#ef4444;">*</span></label><input type="text" id="storeAddress" value="${store.address}" placeholder="请输入门店地址" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">营业时间</label><div style="display:flex;gap:8px;"><input type="time" id="storeStartHour" value="${startHour || '09:00'}" style="flex:1;padding:8px;border:1px solid #e2e8f0;border-radius:6px;" /><span style="color:#94a3b8;">~</span><input type="time" id="storeEndHour" value="${endHour || '21:00'}" style="flex:1;padding:8px;border:1px solid #e2e8f0;border-radius:6px;" /></div></div>
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
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;">
                <div style="width:64px;height:64px;border:4px solid #e2e8f0;border-top-color:#4f6ef7;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:20px;"></div>
                <div style="font-size:14px;color:#94a3b8;">正在加载门店数据...</div>
            </div>
        `;
    }
    
    if (storesData.length === 0) {
        return `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;">
                <div style="width:64px;height:64px;border:2px solid #e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                    <i class="fas fa-store" style="font-size:24px;color:#94a3b8;"></i>
                </div>
                <div style="font-size:14px;color:#94a3b8;margin-bottom:16px;">暂无门店数据</div>
                <button class="btn btn-primary" onclick="showAddStoreModal()"><i class="fas fa-plus"></i> 新增门店</button>
            </div>
        `;
    }
    
    if (isStoreStaff && currentUser.storeId) {
        const stats = getStoreStats(currentUser.storeId);
        const store = storesData.find(s => s.id === currentUser.storeId);
        
        return `
            <style>
                .modal-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center; }
                .modal-content { background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden; }
                .modal-header { padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between; }
                .modal-header h3 { margin:0;font-size:16px;font-weight:600; }
                .modal-close { background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;padding:4px; }
                .modal-body { padding:16px 20px; }
                .modal-footer { padding:12px 20px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px; }
            </style>
            
            <div style="border:1px solid #4f6ef7;border-radius:8px;padding:24px;background:#f8faff;margin-bottom:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <div>
                        <h2 style="font-size:24px;font-weight:700;color:#4f6ef7;margin:0;">${store?.name || '我的门店'}</h2>
                        <p style="font-size:13px;color:#64748b;margin:4px 0 0;">${store?.address || '-'}</p>
                    </div>
                    <div style="display:flex;gap:12px;">
                        <span>${getStatusBadge(store?.status || 'active')}</span>
                        <span class="tag" style="background:#e2e8f0;color:#64748b;">${store?.businessHours || '-'}</span>
                    </div>
                </div>
                
                <div style="display:flex;gap:16px;">
                    <button class="btn btn-primary" onclick="switchPage('orders')"><i class="fas fa-shopping-bag"></i> 门店订单</button>
                    <button class="btn btn-outline" onclick="switchPage('returns')"><i class="fas fa-undo"></i> 退款管理</button>
                    <button class="btn btn-outline"><i class="fas fa-qrcode"></i> 自提核销</button>
                    <button class="btn btn-outline"><i class="fas fa-edit"></i> 编辑门店信息</button>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:12px;">
                <div class="stat-card">
                    <div class="label"><i class="fas fa-shopping-cart"></i> 今日订单</div>
                    <div class="value" style="font-size:28px;color:#4f6ef7;">${stats.todayOrderCount}</div>
                    <div style="font-size:12px;color:#94a3b8;">笔订单</div>
                </div>
                <div class="stat-card">
                    <div class="label"><i class="fas fa-yen-sign"></i> 今日销售额</div>
                    <div class="value" style="font-size:28px;color:#22c55e;">¥${stats.todaySales}</div>
                    <div style="font-size:12px;color:#94a3b8;">元</div>
                </div>
                <div class="stat-card">
                    <div class="label"><i class="fas fa-truck"></i> 待发货</div>
                    <div class="value" style="font-size:28px;color:#3b82f6;">${stats.pendingDelivery}</div>
                    <div style="font-size:12px;color:#94a3b8;">笔订单</div>
                </div>
                <div class="stat-card">
                    <div class="label"><i class="fas fa-map-marker-alt"></i> 待自提</div>
                    <div class="value" style="font-size:28px;color:#f59e0b;">${stats.pendingPickup}</div>
                    <div style="font-size:12px;color:#94a3b8;">笔订单</div>
                </div>
                <div class="stat-card">
                    <div class="label"><i class="fas fa-undo"></i> 待处理退款</div>
                    <div class="value" style="font-size:28px;color:#ef4444;">${stats.pendingRefunds}</div>
                    <div style="font-size:12px;color:#94a3b8;">笔申请</div>
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
                                    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                        <span>待发货</span>
                                        <span style="font-weight:600;">${stats.pendingDelivery}</span>
                                    </div>
                                    <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                                        <div style="width:${stats.totalOrders > 0 ? (stats.pendingDelivery / stats.totalOrders) * 100 : 0}%;height:100%;background:#3b82f6;border-radius:4px;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                        <span>待自提</span>
                                        <span style="font-weight:600;">${stats.pendingPickup}</span>
                                    </div>
                                    <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                                        <div style="width:${stats.totalOrders > 0 ? (stats.pendingPickup / stats.totalOrders) * 100 : 0}%;height:100%;background:#f59e0b;border-radius:4px;"></div>
                                    </div>
                                </div>
                                <div>
                                    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                        <span>已完成</span>
                                        <span style="font-weight:600;">${(Array.isArray(ordersData) ? ordersData.filter(o => o && o.storeId === currentUser.storeId && o.status === 'completed') : []).length}</span>
                                    </div>
                                    <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                                        <div style="width:${stats.totalOrders > 0 ? ((Array.isArray(ordersData) ? ordersData.filter(o => o && o.storeId === currentUser.storeId && o.status === 'completed') : []).length / stats.totalOrders) * 100 : 0}%;height:100%;background:#22c55e;border-radius:4px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 门店信息</span></div>
                        <div class="card-body">
                            <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
                                <div style="display:flex;justify-content:space-between;">
                                    <span style="color:#64748b;">门店电话</span>
                                    <span>${store?.phone || '-'}</span>
                                </div>
                                <div style="display:flex;justify-content:space-between;">
                                <span style="color:#64748b;">营业时间</span>
                                <span>${store?.businessHours || '-'}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#64748b;">累计订单</span>
                                <span>${store?.orderCount || 0} 笔</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 今日提醒</span></div>
                        <div class="card-body">
                            ${stats.pendingDelivery > 0 ? `
                            <div style="padding:10px 12px;background:#dbeafe;border-radius:6px;font-size:12px;color:#1e40af;margin-bottom:8px;">
                                <i class="fas fa-truck"></i> 有 ${stats.pendingDelivery} 笔订单待发货
                            </div>` : ''}
                            ${stats.pendingPickup > 0 ? `
                            <div style="padding:10px 12px;background:#fef3c7;border-radius:6px;font-size:12px;color:#b45309;margin-bottom:8px;">
                                <i class="fas fa-map-marker-alt"></i> 有 ${stats.pendingPickup} 笔订单待自提
                            </div>` : ''}
                            ${stats.pendingRefunds > 0 ? `
                            <div style="padding:10px 12px;background:#fee2e2;border-radius:6px;font-size:12px;color:#b91c1c;">
                                <i class="fas fa-undo"></i> 有 ${stats.pendingRefunds} 笔退款待审核
                            </div>` : ''}
                            ${stats.pendingDelivery === 0 && stats.pendingPickup === 0 && stats.pendingRefunds === 0 ? `
                            <div style="padding:10px 12px;background:#e8f5e9;border-radius:6px;font-size:12px;color:#166534;text-align:center;">
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
        <style>
            .modal-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center; }
            .modal-content { background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden; }
            .modal-header { padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between; }
            .modal-header h3 { margin:0;font-size:16px;font-weight:600; }
            .modal-close { background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;padding:4px; }
            .modal-body { padding:16px 20px; }
            .modal-footer { padding:12px 20px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px; }
        </style>
        
        <div class="flex-between mb-4">
            <span></span>
            <button class="btn btn-primary" onclick="showAddStoreModal()"><i class="fas fa-plus"></i> 新增门店</button>
        </div>

        <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px;">
            <div class="stat-card"><div class="label"><i class="fas fa-store"></i> 总门店</div><div class="value" style="font-size:22px;">${storesData.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 营业中</div><div class="value" style="font-size:22px;color:#22c55e;">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-times-circle"></i> 已停用</div><div class="value" style="font-size:22px;color:#ef4444;">${disabledCount}</div></div>
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
                        <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;${index === 0 ? 'border-color:#4f6ef7;background:#f8fafc;' : ''}">
                            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                                <span style="width:24px;height:24px;background:${index === 0 ? '#4f6ef7' : index === 1 ? '#667eea' : index === 2 ? '#7c3aed' : '#e2e8f0'};color:${index < 3 ? '#fff' : '#94a3b8'};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;">${index + 1}</span>
                                <span style="font-weight:600;">${store.name}</span>
                            </div>
                            <div style="font-size:20px;font-weight:700;color:#4f6ef7;">${store.orderCount}</div>
                            <div style="font-size:12px;color:#94a3b8;">累计订单</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}