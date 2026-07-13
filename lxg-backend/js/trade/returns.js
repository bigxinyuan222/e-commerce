let returnsData = [
    { id: 'RET-20260625-001', orderId: 'ORD-20260624-008', goodsName: '无线蓝牙耳机 Pro', spec: '黑色', price: 299, refundAmount: 299, userId: 'user-001', userName: '王*明', phone: '138****8888', storeId: 'store-001', storeName: '北京朝阳店', reason: '质量问题', reasonType: 'quality', images: [], status: 'pending', statusText: '待审核', auditOpinion: null, createTime: '2026-06-25 14:30', auditTime: null, refundTime: null },
    { id: 'RET-20260625-002', orderId: 'ORD-20260624-005', goodsName: '便携移动电源', spec: '白色', price: 159, refundAmount: 159, userId: 'user-002', userName: '刘*欣', phone: '139****6666', storeId: 'store-002', storeName: '上海浦东店', reason: '发错货', reasonType: 'wrong_item', images: [], status: 'approved', statusText: '已通过', auditOpinion: '同意退款，请用户寄回商品', createTime: '2026-06-25 11:20', auditTime: '2026-06-25 12:00', refundTime: null },
    { id: 'RET-20260624-003', orderId: 'ORD-20260623-012', goodsName: '智能手表 S8', spec: '银色', price: 1299, refundAmount: 1299, userId: 'user-003', userName: '陈*宇', phone: '137****9999', storeId: 'store-003', storeName: '广州天河店', reason: '不想要了', reasonType: 'no_need', images: [], status: 'refunded', statusText: '已完成', auditOpinion: '同意退款', createTime: '2026-06-24 16:45', auditTime: '2026-06-24 17:30', refundTime: '2026-06-24 18:00' },
    { id: 'RET-20260624-004', orderId: 'ORD-20260623-008', goodsName: '智能台灯 Pro', spec: '白色', price: 199, refundAmount: 199, userId: 'user-004', userName: '张*婷', phone: '136****5555', storeId: 'store-001', storeName: '北京朝阳店', reason: '质量问题', reasonType: 'quality', images: [], status: 'pending', statusText: '待审核', auditOpinion: null, createTime: '2026-06-24 14:10', auditTime: null, refundTime: null },
    { id: 'RET-20260623-005', orderId: 'ORD-20260622-015', goodsName: '无线蓝牙耳机 Pro', spec: '黑色', price: 299, refundAmount: 299, userId: 'user-005', userName: '李*华', phone: '135****7777', storeId: 'store-001', storeName: '北京朝阳店', reason: '不想要了', reasonType: 'no_need', images: [], status: 'rejected', statusText: '已拒绝', auditOpinion: '商品已发货，暂不支持退货', createTime: '2026-06-23 09:30', auditTime: '2026-06-23 10:00', refundTime: null },
    { id: 'RET-20260623-006', orderId: 'ORD-20260622-009', goodsName: '便携移动电源', spec: '黑色', price: 159, refundAmount: 159, userId: 'user-006', userName: '赵*阳', phone: '138****8888', storeId: 'store-004', storeName: '深圳南山店', reason: '发错货', reasonType: 'wrong_item', images: [], status: 'refunded', statusText: '已完成', auditOpinion: '同意退款', createTime: '2026-06-23 08:45', auditTime: '2026-06-23 09:15', refundTime: '2026-06-23 10:00' },
    { id: 'RET-20260625-007', orderId: 'ORD-20260625-003', goodsName: '便携移动电源', spec: '白色', price: 159, refundAmount: 159, userId: 'user-007', userName: '孙*怡', phone: '139****2222', storeId: 'store-001', storeName: '北京朝阳店', reason: '商品损坏', reasonType: 'damaged', images: [], status: 'pending', statusText: '待审核', auditOpinion: null, createTime: '2026-06-25 16:00', auditTime: null, refundTime: null },
    { id: 'RET-20260625-008', orderId: 'ORD-20260625-005', goodsName: '便携移动电源', spec: '蓝色', price: 99, refundAmount: 99, userId: 'user-008', userName: '周*杰', phone: '137****3333', storeId: 'store-004', storeName: '深圳南山店', reason: '不想要了', reasonType: 'no_need', images: [], status: 'approved', statusText: '已通过', auditOpinion: '同意退款', createTime: '2026-06-25 10:00', auditTime: '2026-06-25 11:00', refundTime: null }
];

function getStatusBadge(status) {
    const colors = { pending: 'yellow', approved: 'blue', rejected: 'red', refunded: 'green' };
    const texts = { pending: '待审核', approved: '已通过', rejected: '已拒绝', refunded: '已完成' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function getReasonBadge(reasonType) {
    const styles = {
        quality: 'background:#fee2e2;color:#dc2626;',
        wrong_item: 'background:#fff3e0;color:#e65100;',
        no_need: 'background:#f3e5f5;color:#7b1fa2;',
        damaged: 'background:#ffebee;color:#c62828;',
        other: 'background:#e2e8f0;color:#64748b;'
    };
    const texts = { quality: '质量问题', wrong_item: '发错货', no_need: '不想要了', damaged: '商品损坏', other: '其他' };
    const style = styles[reasonType] || styles.other;
    return `<span class="tag" style="${style}">${texts[reasonType] || texts.other}</span>`;
}

let currentReturnSearchKeyword = '';
let currentReturnStatusFilter = 'all';
let currentReturnStoreFilter = 'all';

function getReturnStats() {
    const returns = currentUser.storeId ? returnsData.filter(r => r.storeId === currentUser.storeId) : returnsData;
    return {
        pending: returns.filter(r => r.status === 'pending').length,
        approved: returns.filter(r => r.status === 'approved').length,
        rejected: returns.filter(r => r.status === 'rejected').length,
        refunded: returns.filter(r => r.status === 'refunded').length,
        total: returns.length,
        totalAmount: returns.reduce((sum, r) => sum + r.refundAmount, 0)
    };
}

function filterReturns() {
    let filtered = returnsData;
    if (currentUser.storeId) {
        filtered = filtered.filter(r => r.storeId === currentUser.storeId);
    }
    if (currentReturnStatusFilter !== 'all') {
        filtered = filtered.filter(r => r.status === currentReturnStatusFilter);
    }
    if (currentReturnStoreFilter !== 'all') {
        filtered = filtered.filter(r => r.storeName === currentReturnStoreFilter);
    }
    if (currentReturnSearchKeyword) {
        const keyword = currentReturnSearchKeyword.toLowerCase();
        filtered = filtered.filter(r => 
            r.id.toLowerCase().includes(keyword) || 
            r.orderId.toLowerCase().includes(keyword) ||
            r.userName.toLowerCase().includes(keyword) ||
            r.phone.toLowerCase().includes(keyword) ||
            r.goodsName.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchReturns() {
    const input = document.getElementById('returnSearchInput');
    if (input) {
        currentReturnSearchKeyword = input.value.trim();
        refreshReturnsPage();
    }
}

function switchReturnStatus(status) {
    currentReturnStatusFilter = status;
    refreshReturnsPage();
}

function switchReturnStore(store) {
    currentReturnStoreFilter = store;
    refreshReturnsPage();
}

function handleReturnAction(returnId, action) {
    const ret = returnsData.find(r => r.id === returnId);
    if (!ret) return;
    
    if (action === 'approve') {
        ret.status = 'approved';
        ret.statusText = '已通过';
        ret.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        alert('审核通过！请通知用户寄回商品，门店收货确认后财务将执行打款。');
    } else if (action === 'reject') {
        const opinion = prompt('请输入拒绝原因：');
        if (!opinion) return;
        ret.status = 'rejected';
        ret.statusText = '已拒绝';
        ret.auditOpinion = opinion;
        ret.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        alert('审核已拒绝，系统将通知用户。');
    } else if (action === 'refund') {
        showConfirm('确定执行退款吗？此操作不可撤销。', function() {
            ret.status = 'refunded';
            ret.statusText = '已完成';
            ret.refundTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
            alert('退款已执行！');
            refreshReturnsPage();
        });
    }
}

function showReturnDetail(returnId) {
    const ret = returnsData.find(r => r.id === returnId);
    if (!ret) return;
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeReturnModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:800px;">
            <div class="modal-header">
                <h3><i class="fas fa-undo"></i> 退款详情 · ${ret.id}</h3>
                <button onclick="closeReturnModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">退款单号</div>
                        <div style="font-weight:600;">${ret.id}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">关联订单</div>
                        <div style="font-weight:600;">${ret.orderId}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">退款状态</div>
                        <div>${getStatusBadge(ret.status)}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">门店</div>
                        <div>${ret.storeName}</div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">用户信息</div>
                    <div style="background:#f8fafc;border-radius:8px;padding:16px;">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="width:48px;height:48px;background:#4f6ef7;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:18px;">${ret.userName.charAt(0)}</div>
                            <div>
                                <div style="font-weight:600;font-size:14px;">${ret.userName}</div>
                                <div style="font-size:13px;color:#64748b;">${ret.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">商品信息</div>
                    <div style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                        <div style="display:flex;padding:12px;border-bottom:1px solid #f1f4f9;">
                            <span style="width:60px;height:60px;background:#e2e8f0;border-radius:6px;display:inline-block;margin-right:12px;"></span>
                            <div style="flex:1;">
                                <div style="font-weight:500;">${ret.goodsName}</div>
                                <div style="font-size:12px;color:#94a3b8;">规格：${ret.spec}</div>
                            </div>
                            <div style="font-weight:600;color:#ef4444;">¥${ret.price}</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">退款原因</div>
                    <div style="background:#f8fafc;border-radius:8px;padding:16px;">
                        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                            ${getReasonBadge(ret.reasonType)}
                            <span style="font-weight:600;">${ret.reason}</span>
                        </div>
                        <div style="font-size:13px;color:#64748b;">退款金额：<span style="font-weight:600;color:#ef4444;">¥${ret.refundAmount}</span></div>
                        ${ret.images && ret.images.length > 0 ? `
                        <div style="margin-top:12px;">
                            <div style="font-size:12px;color:#64748b;margin-bottom:8px;">凭证图片</div>
                            <div style="display:flex;gap:8px;">
                                ${ret.images.map((img, i) => `<div style="width:80px;height:80px;background:#e2e8f0;border-radius:6px;cursor:pointer;" onclick="previewImage(${i})"></div>`).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                </div>
                
                ${ret.auditOpinion ? `
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">审核意见</div>
                    <div style="background:#f8fafc;border-radius:8px;padding:16px;">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                            <div style="width:32px;height:32px;background:#22c55e;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:12px;">管</div>
                            <div>
                                <div style="font-weight:600;font-size:13px;">管理员</div>
                                <div style="font-size:12px;color:#94a3b8;">${ret.auditTime || '-'}</div>
                            </div>
                        </div>
                        <div style="font-size:13px;line-height:1.6;padding-left:40px;">${ret.auditOpinion}</div>
                    </div>
                </div>` : ''}
                
                <div>
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">时间节点</div>
                    <div style="padding-left:20px;border-left:2px solid #e2e8f0;">
                        <div style="position:relative;margin-bottom:12px;">
                            <div style="width:10px;height:10px;background:#4f6ef7;border-radius:50%;position:absolute;left:-25px;top:4px;"></div>
                            <div style="font-size:13px;">申请时间</div>
                            <div style="font-size:12px;color:#94a3b8;">${ret.createTime}</div>
                        </div>
                        ${ret.auditTime ? `
                        <div style="position:relative;margin-bottom:12px;">
                            <div style="width:10px;height:10px;background:#3b82f6;border-radius:50%;position:absolute;left:-25px;top:4px;"></div>
                            <div style="font-size:13px;">审核时间</div>
                            <div style="font-size:12px;color:#94a3b8;">${ret.auditTime}</div>
                        </div>` : ''}
                        ${ret.refundTime ? `
                        <div style="position:relative;">
                            <div style="width:10px;height:10px;background:#22c55e;border-radius:50%;position:absolute;left:-25px;top:4px;"></div>
                            <div style="font-size:13px;">退款时间</div>
                            <div style="font-size:12px;color:#94a3b8;">${ret.refundTime}</div>
                        </div>` : ''}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${ret.status === 'pending' ? `
                <button class="btn btn-success" onclick="handleReturnAction('${ret.id}', 'approve')"><i class="fas fa-check"></i> 通过</button>
                <button class="btn btn-danger" onclick="handleReturnAction('${ret.id}', 'reject')"><i class="fas fa-times"></i> 拒绝</button>
                ` : ''}
                ${ret.status === 'approved' ? `
                <button class="btn btn-success" onclick="handleReturnAction('${ret.id}', 'refund')"><i class="fas fa-money-check-alt"></i> 执行退款</button>
                ` : ''}
                <button class="btn btn-outline" onclick="closeReturnModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function showRefundRecordsModal() {
    const refundedRecords = returnsData.filter(r => r.status === 'refunded');
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeReturnModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:800px;">
            <div class="modal-header">
                <h3><i class="fas fa-history"></i> 退款记录查询</h3>
                <button onclick="closeReturnModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>退款单号</th><th>订单号</th><th>用户</th><th>退款金额</th><th>门店</th><th>退款时间</th><th>状态</th></tr></thead>
                        <tbody>
                            ${refundedRecords.length > 0 ? refundedRecords.map(record => `
                                <tr>
                                    <td>${record.id}</td>
                                    <td>${record.orderId}</td>
                                    <td><div><span>${record.userName}</span><div style="font-size:12px;color:#94a3b8;">${record.phone}</div></div></td>
                                    <td style="font-weight:600;color:#ef4444;">¥${record.refundAmount}</td>
                                    <td>${record.storeName}</td>
                                    <td>${record.refundTime}</td>
                                    <td>${getStatusBadge(record.status)}</td>
                                </tr>
                            `).join('') : `<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:20px;">暂无退款记录</td></tr>`}
                        </tbody>
                    </table></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeReturnModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function closeReturnModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshReturnsPage() {
    const panel = document.getElementById('panel-returns');
    if (panel) panel.innerHTML = returnsPage();
}

function returnsPage() {
    const stats = getReturnStats();
    const isStoreStaff = currentUser.role === 'store_staff';
    const filteredReturns = filterReturns();
    const totalReturns = filteredReturns.length;
    
    const qualityCount = filteredReturns.filter(r => r.reasonType === 'quality').length;
    const wrongItemCount = filteredReturns.filter(r => r.reasonType === 'wrong_item').length;
    const noNeedCount = filteredReturns.filter(r => r.reasonType === 'no_need').length;
    const damagedCount = filteredReturns.filter(r => r.reasonType === 'damaged').length;
    
    const qualityPct = totalReturns > 0 ? Math.round((qualityCount / totalReturns) * 100) : 0;
    const wrongItemPct = totalReturns > 0 ? Math.round((wrongItemCount / totalReturns) * 100) : 0;
    const noNeedPct = totalReturns > 0 ? Math.round((noNeedCount / totalReturns) * 100) : 0;
    const damagedPct = totalReturns > 0 ? Math.round((damagedCount / totalReturns) * 100) : 0;
    
    const auditPassRate = (stats.approved + stats.rejected) > 0 ? Math.round((stats.approved / (stats.approved + stats.rejected)) * 100) : 0;
    
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
            <div class="search-bar">
                <input id="returnSearchInput" placeholder="订单号 / 用户手机号" onkeypress="if(event.key==='Enter') searchReturns()" />
                <select onchange="switchReturnStatus(this.value)">
                    <option value="all" ${currentReturnStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="pending" ${currentReturnStatusFilter === 'pending' ? 'selected' : ''}>待审核</option>
                    <option value="approved" ${currentReturnStatusFilter === 'approved' ? 'selected' : ''}>已通过</option>
                    <option value="rejected" ${currentReturnStatusFilter === 'rejected' ? 'selected' : ''}>已拒绝</option>
                    <option value="refunded" ${currentReturnStatusFilter === 'refunded' ? 'selected' : ''}>已完成</option>
                </select>
                ${!isStoreStaff ? `<select onchange="switchReturnStore(this.value)">
                    <option value="all" ${currentReturnStoreFilter === 'all' ? 'selected' : ''}>全部门店</option>
                    <option value="北京朝阳店" ${currentReturnStoreFilter === '北京朝阳店' ? 'selected' : ''}>北京朝阳店</option>
                    <option value="上海浦东店" ${currentReturnStoreFilter === '上海浦东店' ? 'selected' : ''}>上海浦东店</option>
                    <option value="广州天河店" ${currentReturnStoreFilter === '广州天河店' ? 'selected' : ''}>广州天河店</option>
                    <option value="深圳南山店" ${currentReturnStoreFilter === '深圳南山店' ? 'selected' : ''}>深圳南山店</option>
                </select>` : ''}
                <button class="btn btn-primary" onclick="searchReturns()"><i class="fas fa-search"></i> 搜索</button>
            </div>
            <button class="btn btn-outline" onclick="showRefundRecordsModal()"><i class="fas fa-history"></i> 退款记录</button>
        </div>

        <div class="stats-grid" style="grid-template-columns:repeat(${isStoreStaff ? 3 : 4},1fr);">
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待审核</div><div class="value" style="font-size:22px;color:#f59e0b;">${stats.pending}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已通过</div><div class="value" style="font-size:22px;color:#3b82f6;">${stats.approved}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-times-circle"></i> 已拒绝</div><div class="value" style="font-size:22px;color:#ef4444;">${stats.rejected}</div></div>
            ${!isStoreStaff ? `
            <div class="stat-card"><div class="label"><i class="fas fa-percentage"></i> 退款金额</div><div class="value" style="font-size:22px;color:#8b5cf6;">¥${stats.totalAmount}</div></div>
            ` : ''}
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-undo"></i> 退款申请列表</span><span class="text-muted" style="font-size:13px;">共 ${filteredReturns.length} 笔退款申请</span></div>
                <div class="card-body no-pad"><div class="table-wrap"><table>
                    <thead><tr><th>退款单号</th><th>关联订单</th><th>商品</th><th>用户</th><th>退款金额</th><th>原因</th><th>门店</th><th>状态</th><th>申请时间</th><th>操作</th></tr></thead>
                    <tbody>
                        ${filteredReturns.map(ret => `
                            <tr>
                                <td>${ret.id}</td>
                                <td>${ret.orderId}</td>
                                <td>${ret.goodsName}</td>
                                <td><div><span>${ret.userName}</span><div style="font-size:11px;color:#94a3b8;">${ret.phone}</div></div></td>
                                <td><div style="font-weight:600;color:#ef4444;">¥${ret.refundAmount}</div></td>
                                <td>${getReasonBadge(ret.reasonType)}</td>
                                <td>${ret.storeName}</td>
                                <td>${getStatusBadge(ret.status)}</td>
                                <td>${ret.createTime}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline" onclick="showReturnDetail('${ret.id}')"><i class="fas fa-eye"></i> 详情</button>
                                    ${ret.status === 'pending' ? `
                                    <button class="btn btn-sm btn-success" onclick="handleReturnAction('${ret.id}', 'approve')"><i class="fas fa-check"></i> 通过</button>
                                    <button class="btn btn-sm btn-danger" onclick="handleReturnAction('${ret.id}', 'reject')"><i class="fas fa-times"></i> 拒绝</button>
                                    ` : ''}
                                    ${ret.status === 'approved' ? `
                                    <button class="btn btn-sm btn-success" onclick="handleReturnAction('${ret.id}', 'refund')"><i class="fas fa-money-check-alt"></i> 退款</button>
                                    ` : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div></div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 退款原因分布</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:10px;">
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span>质量问题</span>
                                    <span style="font-weight:600;">${qualityPct}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${qualityPct}%;height:100%;background:#ef4444;border-radius:3px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span>发错货</span>
                                    <span style="font-weight:600;">${wrongItemPct}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${wrongItemPct}%;height:100%;background:#f59e0b;border-radius:3px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span>不想要了</span>
                                    <span style="font-weight:600;">${noNeedPct}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${noNeedPct}%;height:100%;background:#8b5cf6;border-radius:3px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span>商品损坏</span>
                                    <span style="font-weight:600;">${damagedPct}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${damagedPct}%;height:100%;background:#dc2626;border-radius:3px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 处理时效</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div>
                                <div style="font-size:13px;color:#64748b;margin-bottom:4px;">平均处理时间</div>
                                <div style="font-size:28px;font-weight:600;color:#4f6ef7;">2.5小时</div>
                            </div>
                            <div style="padding:10px 12px;background:#e8f5e9;border-radius:6px;font-size:12px;color:#2e7d32;">
                                <i class="fas fa-check-circle"></i> 今日已处理 8 笔退款申请
                            </div>
                            <div style="padding:10px 12px;background:#fff3e0;border-radius:6px;font-size:12px;color:#e65100;">
                                <i class="fas fa-clock"></i> 有 ${stats.pending} 笔申请待审核
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 退款统计</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span>本周退款金额</span>
                                <span style="font-weight:600;color:#ef4444;">¥${Math.round(stats.totalAmount * 0.4)}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>本月退款金额</span>
                                <span style="font-weight:600;color:#ef4444;">¥${stats.totalAmount}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>退款率</span>
                                <span style="font-weight:600;color:#f59e0b;">3.2%</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>审核通过率</span>
                                <span style="font-weight:600;color:#22c55e;">${auditPassRate}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}