// 退货退款数据缓存
let returnsData = [];

// 获取门店选项HTML（用于退货筛选下拉框）
function getReturnStoreOptions() {
    const stores = typeof storesData !== 'undefined' && Array.isArray(storesData) ? storesData : [];
    return stores.map(store => `
        <option value="${store.name}" ${currentReturnStoreFilter === store.name ? 'selected' : ''}>${store.name}</option>
    `).join('');
}

// 获取退货状态标签HTML
function getStatusBadge(status) {
    const colors = { pending: 'yellow', approved: 'blue', rejected: 'red', refunded: 'green' };
    const texts = { pending: '待审核', approved: '已通过', rejected: '已拒绝', refunded: '已完成' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 获取退货原因标签HTML
function getReasonBadge(reasonType) {
    const classes = {
        quality: 'tag trade-reason-tag-quality',
        wrong_item: 'tag trade-reason-tag-wrong',
        no_need: 'tag trade-reason-tag-noneed',
        damaged: 'tag trade-reason-tag-damaged',
        other: 'tag'
    };
    const texts = { quality: '质量问题', wrong_item: '发错货', no_need: '不想要了', damaged: '商品损坏', other: '其他' };
    return `<span class="${classes[reasonType] || 'tag'}">${texts[reasonType] || texts.other}</span>`;
}

// 退货筛选条件
let currentReturnSearchKeyword = '';
let currentReturnStatusFilter = 'all';
let currentReturnStoreFilter = 'all';
let currentReturnPage = 1;
let returnPageSize = 5;

// 退货原因配置数据
let returnReasonsData = [];

// 当前退货原因标签页
let returnReasonTab = null;

// 加载退货退款列表
async function loadReturns() {
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
        const dataList = result && result.list ? result.list : (Array.isArray(result) ? result : []);
        // 标准化退货数据格式
        returnsData = dataList.map(item => ({
            id: item.ID || item.id,
            orderId: item.orderId || '',
            goodsName: item.productName || item.goodsName || '',
            spec: item.spec || '',
            price: item.price || 0,
            refundAmount: item.refundAmount || 0,
            userId: item.userId || '',
            userName: item.userName || '',
            phone: item.phone || '',
            storeId: item.storeId || '',
            storeName: item.storeName || '',
            reason: item.reason || '',
            reasonType: item.reasonType || 'other',
            images: item.images || [],
            status: item.status === 0 ? 'pending' : item.status === 1 ? 'approved' : item.status === 2 ? 'rejected' : 'refunded',
            statusText: item.status === 0 ? '待审核' : item.status === 1 ? '已通过' : item.status === 2 ? '已拒绝' : '已完成',
            auditOpinion: item.auditRemark || item.auditOpinion || '',
            createTime: item.createdAt || item.CreatedAt || '',
            auditTime: item.auditTime || '',
            refundTime: item.refundTime || ''
        }));
        refreshReturnsPage();
    } catch (error) {
        console.error('获取退款列表失败:', error);
    }
}

// 加载退货原因配置列表
async function loadReturnReasons() {
    try {
        const result = await apiGet(API_CONFIG.returns.reasonList);
        if (result && result.data) {
            returnReasonsData = result.data.map(item => ({
                id: item.ID || item.id,
                name: item.content || item.name || '',
                type: item.type || '',
                color: item.color || '#64748b',
                bgColor: item.bgColor || '#e2e8f0',
                sort: item.sort || 0,
                status: item.status === 1 ? 'active' : 'inactive'
            }));
        } else {
            returnReasonsData = [];
        }
        refreshReturnsPage();
    } catch (error) {
        console.error('获取退货原因失败:', error);
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
        try {
            await apiPut(API_CONFIG.returns.approve, { status: 1 }, { id: returnId });
            ret.status = 'approved';
            ret.statusText = '已通过';
            ret.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
            showToast('审核通过！请通知用户寄回商品，门店收货确认后财务将执行打款。', 'success');
            refreshReturnsPage();
        } catch (error) {
            console.error('审核通过失败:', error);
            showToast('操作失败，请重试', 'error');
        }
    } else if (action === 'reject') {
        const opinion = prompt('请输入拒绝原因：');
        if (!opinion) return;
        
        try {
            await apiPut(API_CONFIG.returns.reject, { status: 2, audit_remark: opinion }, { id: returnId });
            ret.status = 'rejected';
            ret.statusText = '已拒绝';
            ret.auditOpinion = opinion;
            ret.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
            showToast('审核已拒绝，系统将通知用户。', 'success');
            refreshReturnsPage();
        } catch (error) {
            console.error('审核拒绝失败:', error);
            showToast('操作失败，请重试', 'error');
        }
    } else if (action === 'refund') {
        showConfirm('确定执行退款吗？此操作不可撤销。', async function() {
            try {
                await apiPut(API_CONFIG.returns.confirmRefund, {}, { id: returnId });
                ret.status = 'refunded';
                ret.statusText = '已完成';
                ret.refundTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
                showToast('退款已执行！', 'success');
                refreshReturnsPage();
            } catch (error) {
                console.error('执行退款失败:', error);
                showToast('操作失败，请重试', 'error');
            }
        });
    }
}

function showReturnDetail(returnId) {
    const ret = returnsData.find(r => r.id === returnId);
    if (!ret) return;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeReturnModal()"></div>
        <div class="modal-content" style="width:800px;">
            <div class="modal-header">
                <h3><i class="fas fa-undo"></i> 退款详情 · ${ret.id}</h3>
                <button onclick="closeReturnModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="trade-return-detail-grid">
                    <div class="trade-return-detail-card"><div class="label">退款单号</div><div class="value">${ret.id}</div></div>
                    <div class="trade-return-detail-card"><div class="label">关联订单</div><div class="value">${ret.orderId}</div></div>
                    <div class="trade-return-detail-card"><div class="label">退款状态</div><div>${getStatusBadge(ret.status)}</div></div>
                    <div class="trade-return-detail-card"><div class="label">门店</div><div>${ret.storeName}</div></div>
                </div>
                
                <div class="trade-return-user-section">
                    <div class="trade-return-section-title">用户信息</div>
                    <div class="trade-return-user-card">
                        <div class="trade-return-user-avatar">${ret.userName.charAt(0)}</div>
                        <div class="trade-return-user-info">
                            <div class="name">${ret.userName}</div>
                            <div class="phone">${ret.phone}</div>
                        </div>
                    </div>
                </div>
                
                <div class="trade-return-goods-section">
                    <div class="trade-return-section-title">商品信息</div>
                    <div class="trade-return-goods-card">
                        <span class="trade-return-goods-image"></span>
                        <div class="trade-return-goods-info">
                            <div class="name">${ret.goodsName}</div>
                            <div class="spec">规格：${ret.spec}</div>
                        </div>
                        <div class="trade-return-goods-price">¥${ret.price}</div>
                    </div>
                </div>
                
                <div class="trade-return-reason-section">
                    <div class="trade-return-section-title">退款原因</div>
                    <div class="trade-return-reason-card">
                        <div class="trade-return-reason-header">
                            ${getReasonBadge(ret.reasonType)}
                            <span>${ret.reason}</span>
                        </div>
                        <div class="trade-return-refund-amount">退款金额：<span>¥${ret.refundAmount}</span></div>
                        ${ret.images && ret.images.length > 0 ? `
                        <div class="trade-return-images">
                            <div class="trade-return-images-label">凭证图片</div>
                            <div class="trade-return-images-list">
                                ${ret.images.map((img, i) => `<div class="trade-return-image-item" onclick="previewImage(${i})"></div>`).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                </div>
                
                ${ret.auditOpinion ? `
                <div class="trade-return-audit-section">
                    <div class="trade-return-section-title">审核意见</div>
                    <div class="trade-return-audit-card">
                        <div class="trade-return-audit-header">
                            <div class="trade-return-audit-avatar">管</div>
                            <div class="trade-return-audit-info">
                                <div class="name">管理员</div>
                                <div class="time">${ret.auditTime || '-'}</div>
                            </div>
                        </div>
                        <div class="trade-return-audit-content">${ret.auditOpinion}</div>
                    </div>
                </div>` : ''}
                
                <div class="trade-return-timeline-section">
                    <div class="trade-return-section-title">时间节点</div>
                    <div class="trade-return-timeline">
                        <div class="trade-return-timeline-item"><div class="dot blue"></div><div class="label">申请时间</div><div class="value">${ret.createTime}</div></div>
                        ${ret.auditTime ? `<div class="trade-return-timeline-item"><div class="dot blue-light"></div><div class="label">审核时间</div><div class="value">${ret.auditTime}</div></div>` : ''}
                        ${ret.refundTime ? `<div class="trade-return-timeline-item"><div class="dot green"></div><div class="label">退款时间</div><div class="value">${ret.refundTime}</div></div>` : ''}
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
        <div class="modal-overlay" onclick="closeReturnModal()"></div>
        <div class="modal-content" style="width:800px;">
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
                    ${getReturnStoreOptions()}
                </select>` : ''}
                <button class="btn btn-primary" onclick="searchReturns()"><i class="fas fa-search"></i> 搜索</button>
            </div>
            <button class="btn btn-outline" onclick="showRefundRecordsModal()"><i class="fas fa-history"></i> 退款记录</button>
        </div>

        <div class="trade-stat-grid" style="grid-template-columns:repeat(${isStoreStaff ? 3 : 4},1fr);">
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待审核</div><div class="value yellow">${stats.pending}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已通过</div><div class="value blue">${stats.approved}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-times-circle"></i> 已拒绝</div><div class="value red">${stats.rejected}</div></div>
            ${!isStoreStaff ? `
            <div class="stat-card"><div class="label"><i class="fas fa-percentage"></i> 退款金额</div><div class="value purple">¥${stats.totalAmount}</div></div>
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
                                <div style="font-size:28px;font-weight:600;color:#4f6ef7;">-</div>
                            </div>
                            <div style="padding:10px 12px;background:#e8f5e9;border-radius:6px;font-size:12px;color:#2e7d32;">
                                <i class="fas fa-check-circle"></i> 今日已处理 ${stats.processed} 笔退款申请
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
        showToast('请输入原因名称', 'error');
        return;
    }
    
    try {
        const response = await apiPost(API_CONFIG.returns.reasonAdd, { content: name, sort });
        if (response.code === 200) {
            loadReturnReasons();
            showToast('添加成功', 'success');
            closeReturnReasonConfig();
        } else {
            showToast(response.message || '添加失败', 'error');
        }
    } catch (error) {
        console.error('添加退货原因失败:', error);
        showToast('添加失败，请重试', 'error');
    }
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
        showToast('请输入原因名称', 'error');
        return;
    }
    
    try {
        const response = await apiPut(API_CONFIG.returns.reasonEdit, { content: name, sort }, { id: reasonId });
        if (response.code === 200) {
            loadReturnReasons();
            showToast('修改成功', 'success');
            closeReturnReasonConfig();
        } else {
            showToast(response.message || '修改失败', 'error');
        }
    } catch (error) {
        console.error('编辑退货原因失败:', error);
        showToast('修改失败，请重试', 'error');
    }
}

async function toggleReturnReason(reasonId) {
    const reason = returnReasonsData.find(r => r.id === reasonId);
    if (reason) {
        try {
            await apiDelete(API_CONFIG.returns.reasonDelete, {}, { id: reasonId });
            loadReturnReasons();
        } catch (error) {
            console.error('删除退货原因失败:', error);
            showToast('操作失败，请重试', 'error');
        }
    }
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}