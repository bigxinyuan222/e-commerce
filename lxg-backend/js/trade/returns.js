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
let currentReturnPage = 1;
let returnPageSize = 5;

let returnReasonsData = [
    { id: 'quality', name: '质量问题', type: 'quality', color: '#dc2626', bgColor: '#fee2e2', sort: 1, status: 'active' },
    { id: 'wrong_item', name: '发错货', type: 'wrong_item', color: '#e65100', bgColor: '#fff3e0', sort: 2, status: 'active' },
    { id: 'no_need', name: '不想要了', type: 'no_need', color: '#7b1fa2', bgColor: '#f3e5f5', sort: 3, status: 'active' },
    { id: 'damaged', name: '商品损坏', type: 'damaged', color: '#c62828', bgColor: '#ffebee', sort: 4, status: 'active' },
    { id: 'other', name: '其他', type: 'other', color: '#64748b', bgColor: '#e2e8f0', sort: 5, status: 'active' }
];

let returnReasonTab = null;

let useMockData = true;

async function fetchReturnsData() {
    if (useMockData) {
        return returnsData;
    }
    
    try {
        const params = {
            page: currentReturnPage,
            pageSize: returnPageSize,
            status: currentReturnStatusFilter === 'all' ? '' : currentReturnStatusFilter,
            storeName: currentReturnStoreFilter === 'all' ? '' : currentReturnStoreFilter,
            keyword: currentReturnSearchKeyword,
            storeId: currentUser.storeId || ''
        };
        const result = await apiGet(API_CONFIG.returns.list, params);
        return result.data || [];
    } catch (error) {
        console.error('获取退款列表失败:', error);
        return returnsData;
    }
}

async function fetchReturnReasons() {
    if (useMockData) {
        return returnReasonsData;
    }
    
    try {
        const result = await apiGet(API_CONFIG.returns.reasonList);
        return result.data || [];
    } catch (error) {
        console.error('获取退货原因失败:', error);
        return returnReasonsData;
    }
}

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
        currentReturnPage = 1;
        refreshReturnsPage();
    }
}

function switchReturnStatus(status) {
    currentReturnStatusFilter = status;
    currentReturnPage = 1;
    refreshReturnsPage();
}

function switchReturnStore(store) {
    currentReturnStoreFilter = store;
    currentReturnPage = 1;
    refreshReturnsPage();
}

async function handleReturnAction(returnId, action) {
    const ret = returnsData.find(r => r.id === returnId);
    if (!ret) return;
    
    if (action === 'approve') {
        if (!useMockData) {
            try {
                await apiPut(API_CONFIG.returns.approve, { status: 1 }, { id: returnId });
            } catch (error) {
                console.error('审核通过失败:', error);
                return;
            }
        }
        ret.status = 'approved';
        ret.statusText = '已通过';
        ret.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        alert('审核通过！请通知用户寄回商品，门店收货确认后财务将执行打款。');
        refreshReturnsPage();
    } else if (action === 'reject') {
        const opinion = prompt('请输入拒绝原因：');
        if (!opinion) return;
        
        if (!useMockData) {
            try {
                await apiPut(API_CONFIG.returns.reject, { status: 2, audit_remark: opinion }, { id: returnId });
            } catch (error) {
                console.error('审核拒绝失败:', error);
                return;
            }
        }
        ret.status = 'rejected';
        ret.statusText = '已拒绝';
        ret.auditOpinion = opinion;
        ret.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        alert('审核已拒绝，系统将通知用户。');
        refreshReturnsPage();
    } else if (action === 'refund') {
        showConfirm('确定执行退款吗？此操作不可撤销。', async function() {
            if (!useMockData) {
                try {
                    await apiPut(API_CONFIG.returns.confirmRefund, {}, { id: returnId });
                } catch (error) {
                    console.error('执行退款失败:', error);
                    return;
                }
            }
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

function setReturnPage(page) {
    currentReturnPage = page;
    refreshReturnsPage();
}

function returnsPage() {
    const stats = getReturnStats();
    const isStoreStaff = currentUser.role === 'store_staff';
    const filteredReturns = filterReturns();
    const totalReturns = filteredReturns.length;
    const totalPages = Math.ceil(totalReturns / returnPageSize);
    const startIndex = (currentReturnPage - 1) * returnPageSize;
    const pageReturns = filteredReturns.slice(startIndex, startIndex + returnPageSize);
    
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
                        ${pageReturns.map(ret => `
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
                ${totalPages > 1 ? `
                <div class="card-footer">
                    <div style="display:flex;align-items:center;justify-content:center;gap:6px;">
                        <button onclick="setReturnPage(1)" ${currentReturnPage === 1 ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentReturnPage === 1 ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-double-left"></i>
                        </button>
                        <button onclick="setReturnPage(${currentReturnPage - 1})" ${currentReturnPage === 1 ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentReturnPage === 1 ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-left"></i>
                        </button>
                        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                            <button onclick="setReturnPage(${p})" style="width:32px;height:32px;border-radius:50%;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;transition:all 0.2s;${p === currentReturnPage ? 'background:#4f6ef7;' : 'background:#fff;border:1px solid #e2e8f0;color:#64748b;'};" onmouseover="${p !== currentReturnPage ? 'this.style.borderColor=\'#4f6ef7\';this.style.color=\'#4f6ef7\'' : ''}" onmouseout="${p !== currentReturnPage ? 'this.style.borderColor=\'#e2e8f0\';this.style.color=\'#64748b\'' : ''}">${p}</button>
                        `).join('')}
                        <button onclick="setReturnPage(${currentReturnPage + 1})" ${currentReturnPage === totalPages ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentReturnPage === totalPages ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-right"></i>
                        </button>
                        <button onclick="setReturnPage(${totalPages})" ${currentReturnPage === totalPages ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentReturnPage === totalPages ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-double-right"></i>
                        </button>
                    </div>
                    <span style="font-size:13px;color:#64748b;">共 ${totalReturns} 条记录，第 ${currentReturnPage}/${totalPages} 页</span>
                </div>` : ''}
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

                <div class="card" onclick="showReturnReasonConfig()" style="cursor:pointer;">
                    <div class="card-header">
                        <span class="card-title"><i class="fas fa-cog"></i> 退货原因配置</span>
                        <i class="fas fa-arrow-right" style="color:#4f6ef7;font-size:14px;"></i>
                    </div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:6px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <span style="font-size:13px;color:#64748b;">当前可用原因</span>
                                <span style="font-size:14px;font-weight:600;color:#4f6ef7;">${returnReasonsData.filter(r => r.status === 'active').length} 个</span>
                            </div>
                            <div style="display:flex;flex-wrap:gap:4px;">
                                ${returnReasonsData.filter(r => r.status === 'active').slice(0, 4).map(r => `<span style="display:inline-block;padding:3px 8px;border-radius:4px;font-size:12px;color:${r.color};background:${r.bgColor};margin-right:4px;">${r.name}</span>`).join('')}
                                ${returnReasonsData.filter(r => r.status === 'active').length > 4 ? `<span style="font-size:12px;color:#94a3b8;">+${returnReasonsData.filter(r => r.status === 'active').length - 4}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${showReturnReasonConfigModal()}
    `;
}

function showReturnReasonConfig() {
    returnReasonTab = 'list';
    refreshReturnsPage();
}

function switchReturnReasonTab(tab) {
    returnReasonTab = tab;
    refreshReturnsPage();
}

function closeReturnReasonConfig() {
    returnReasonTab = null;
    refreshReturnsPage();
}

function showReturnReasonConfigModal() {
    if (!returnReasonTab) return '';
    
    const activeReasons = returnReasonsData.filter(r => r.status === 'active');
    
    if (returnReasonTab === 'add') {
        return `
            <div class="modal-overlay" onclick="closeReturnReasonConfig()">
                <div class="modal-content" style="width:500px;" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3><i class="fas fa-plus"></i> 新增退货原因</h3>
                        <button class="modal-close" onclick="closeReturnReasonConfig()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">原因名称 <span style="color:#ef4444;">*</span></label><input type="text" id="newReasonName" placeholder="请输入原因名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">显示颜色</label><input type="color" id="newReasonColor" value="#64748b" style="width:100%;height:40px;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">排序</label><input type="number" id="newReasonSort" value="${returnReasonsData.length + 1}" min="1" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" /></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" onclick="closeReturnReasonConfig()">取消</button>
                        <button class="btn btn-primary" onclick="addReturnReason()">确认添加</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (returnReasonTab.startsWith('edit_')) {
        const reasonId = returnReasonTab.replace('edit_', '');
        const reason = returnReasonsData.find(r => r.id === reasonId);
        if (!reason) return '';
        
        return `
            <div class="modal-overlay" onclick="closeReturnReasonConfig()">
                <div class="modal-content" style="width:500px;" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3><i class="fas fa-edit"></i> 编辑退货原因</h3>
                        <button class="modal-close" onclick="closeReturnReasonConfig()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">原因名称 <span style="color:#ef4444;">*</span></label><input type="text" id="editReasonName" value="${reason.name}" placeholder="请输入原因名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">显示颜色</label><input type="color" id="editReasonColor" value="${reason.color}" style="width:100%;height:40px;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">排序</label><input type="number" id="editReasonSort" value="${reason.sort}" min="1" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">状态</label><div style="display:flex;gap:16px;"><label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="editReasonStatus" ${reason.status === 'active' ? 'checked' : ''} />启用</label><label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="editReasonStatus" ${reason.status === 'inactive' ? 'checked' : ''} />禁用</label></div></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline" onclick="closeReturnReasonConfig()">取消</button>
                        <button class="btn btn-primary" onclick="editReturnReason('${reason.id}')">保存修改</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="modal-overlay" onclick="closeReturnReasonConfig()">
            <div class="modal-content" style="width:700px;" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3><i class="fas fa-cog"></i> 退货原因配置</h3>
                    <button class="modal-close" onclick="closeReturnReasonConfig()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <span style="font-size:13px;color:#64748b;">当前可用 ${activeReasons.length} 个退货原因</span>
                        <button class="btn btn-sm btn-primary" onclick="switchReturnReasonTab('add')"><i class="fas fa-plus"></i> 新增原因</button>
                    </div>
                    <div class="table-wrap"><table>
                        <thead><tr><th>排序</th><th>原因名称</th><th>显示颜色</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>
                            ${returnReasonsData.sort((a, b) => a.sort - b.sort).map(r => `
                                <tr>
                                    <td>${r.sort}</td>
                                    <td>${r.name}</td>
                                    <td><span style="display:inline-block;width:24px;height:24px;border-radius:4px;background:${r.color};vertical-align:middle;"></span></td>
                                    <td>${r.status === 'active' ? '<span class="tag" style="color:#22c55e;background:#dcfce7;">启用</span>' : '<span class="tag" style="color:#94a3b8;background:#f1f5f9;">禁用</span>'}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline" onclick="switchReturnReasonTab('edit_${r.id}')"><i class="fas fa-edit"></i> 编辑</button>
                                        <button class="btn btn-sm ${r.status === 'active' ? 'btn-warning' : 'btn-success'}" onclick="toggleReturnReason('${r.id}')">${r.status === 'active' ? '<i class="fas fa-ban"></i> 禁用' : '<i class="fas fa-check"></i> 启用'}</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table></div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="closeReturnReasonConfig()">关闭</button>
                </div>
            </div>
        </div>
    `;
}

async function addReturnReason() {
    const nameInput = document.getElementById('newReasonName');
    const colorInput = document.getElementById('newReasonColor');
    const sortInput = document.getElementById('newReasonSort');
    
    const name = nameInput?.value.trim();
    const color = colorInput?.value || '#64748b';
    const sort = parseInt(sortInput?.value) || returnReasonsData.length + 1;
    
    if (!name) {
        alert('请输入原因名称');
        return;
    }
    
    const bgColor = hexToRgba(color, 0.1);
    
    if (!useMockData) {
        try {
            await apiPost(API_CONFIG.returns.reasonAdd, { content: name, sort });
        } catch (error) {
            console.error('添加退货原因失败:', error);
            return;
        }
    }
    
    returnReasonsData.push({
        id: `reason_${Date.now()}`,
        name,
        type: `reason_${Date.now()}`,
        color,
        bgColor,
        sort,
        status: 'active'
    });
    
    alert('添加成功');
    closeReturnReasonConfig();
}

async function editReturnReason(reasonId) {
    const nameInput = document.getElementById('editReasonName');
    const colorInput = document.getElementById('editReasonColor');
    const sortInput = document.getElementById('editReasonSort');
    const statusInputs = document.querySelectorAll('input[name="editReasonStatus"]');
    
    const name = nameInput?.value.trim();
    const color = colorInput?.value || '#64748b';
    const sort = parseInt(sortInput?.value) || 1;
    const status = Array.from(statusInputs).find(i => i.checked) ? 'active' : 'inactive';
    
    if (!name) {
        alert('请输入原因名称');
        return;
    }
    
    if (!useMockData) {
        try {
            await apiPut(API_CONFIG.returns.reasonEdit, { content: name, sort }, { id: reasonId });
        } catch (error) {
            console.error('编辑退货原因失败:', error);
            return;
        }
    }
    
    const reason = returnReasonsData.find(r => r.id === reasonId);
    if (reason) {
        reason.name = name;
        reason.color = color;
        reason.bgColor = hexToRgba(color, 0.1);
        reason.sort = sort;
        reason.status = status;
        alert('修改成功');
    }
    
    closeReturnReasonConfig();
}

async function toggleReturnReason(reasonId) {
    const reason = returnReasonsData.find(r => r.id === reasonId);
    if (reason) {
        const newStatus = reason.status === 'active' ? 'inactive' : 'active';
        
        if (!useMockData) {
            try {
                await apiDelete(API_CONFIG.returns.reasonDelete, {}, { id: reasonId });
            } catch (error) {
                console.error('删除退货原因失败:', error);
                return;
            }
        }
        
        reason.status = newStatus;
        refreshReturnsPage();
    }
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}