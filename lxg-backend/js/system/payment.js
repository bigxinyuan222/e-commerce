let paymentData = [];
let refundData = [];

let currentPaymentSearchKeyword = '';
let currentPaymentMethodFilter = 'all';
let currentPaymentStatusFilter = 'all';

async function loadPayments() {
    try {
        const params = {
            method: currentPaymentMethodFilter === 'all' ? '' : currentPaymentMethodFilter,
            status: currentPaymentStatusFilter === 'all' ? '' : currentPaymentStatusFilter,
            keyword: currentPaymentSearchKeyword
        };
        const response = await apiGet(API_CONFIG.payments.list, params);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        paymentData = dataList.map(item => ({
            id: item.ID || item.id,
            orderId: item.orderId || '',
            amount: item.amount || 0,
            method: item.method === 'wechat' ? '微信支付' : item.method === 'alipay' ? '支付宝' : item.method || '',
            channel: item.channel || '',
            status: item.status === 'success' ? 'success' : item.status === 'refunded' ? 'refunded' : item.status === 'failed' ? 'failed' : 'processing',
            time: item.createdAt || item.time || ''
        }));
        refreshPaymentPage();
    } catch (error) {
        console.error('Failed to load payments:', error);
    }
}

async function loadRefunds() {
    try {
        const response = await apiGet(API_CONFIG.payments.refundList);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        refundData = dataList.map(item => ({
            id: item.ID || item.id,
            txnId: item.txnId || '',
            orderId: item.orderId || '',
            amount: item.amount || 0,
            reason: item.reason || '',
            status: item.status === 'refunded' ? 'refunded' : 'processing',
            time: item.createdAt || item.time || ''
        }));
        refreshPaymentPage();
    } catch (error) {
        console.error('Failed to load refunds:', error);
    }
}

function getPaymentStatusBadge(status) {
    const colors = { success: 'green', failed: 'red', refunded: 'red', processing: 'yellow' };
    const texts = { success: '成功', failed: '失败', refunded: '已退款', processing: '处理中' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function filterPayments() {
    let filtered = paymentData;
    if (currentPaymentMethodFilter !== 'all') {
        filtered = filtered.filter(p => p.method === currentPaymentMethodFilter);
    }
    if (currentPaymentStatusFilter !== 'all') {
        filtered = filtered.filter(p => p.status === currentPaymentStatusFilter);
    }
    if (currentPaymentSearchKeyword) {
        const keyword = currentPaymentSearchKeyword.toLowerCase();
        filtered = filtered.filter(p => 
            p.id.toLowerCase().includes(keyword) || 
            p.orderId.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchPayments() {
    const input = document.getElementById('paymentSearchInput');
    if (input) {
        currentPaymentSearchKeyword = input.value.trim();
        refreshPaymentPage();
    }
}

function switchPaymentMethod(method) {
    currentPaymentMethodFilter = method;
    refreshPaymentPage();
}

function switchPaymentStatus(status) {
    currentPaymentStatusFilter = status;
    refreshPaymentPage();
}

function refreshPaymentPage() {
    const panel = document.getElementById('panel-payment');
    if (panel) panel.innerHTML = paymentPage();
}

function showPaymentDetail(txnId) {
    const payment = paymentData.find(p => p.id === txnId);
    if (!payment) return;
    
    const refund = refundData.find(r => r.txnId === txnId);
    
    const modalContent = `
        <div class="modal-overlay" onclick="closePaymentModal()"></div>
        <div class="modal-content" style="width:500px;">
            <div class="modal-header">
                <h3><i class="fas fa-info-circle"></i> 交易详情</h3>
                <button onclick="closePaymentModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="system-payment-detail-grid">
                    <div class="system-payment-detail-item"><span class="label">交易号</span><span class="value">${payment.id}</span></div>
                    <div class="system-payment-detail-item"><span class="label">订单号</span><span class="value">${payment.orderId}</span></div>
                    <div class="system-payment-detail-item"><span class="label">支付金额</span><span class="value primary">¥${payment.amount}</span></div>
                    <div class="system-payment-detail-item"><span class="label">支付方式</span><span class="value">${payment.method}</span></div>
                    <div class="system-payment-detail-item"><span class="label">支付渠道</span><span class="value">${payment.channel}</span></div>
                    <div class="system-payment-detail-item"><span class="label">交易状态</span><span>${getPaymentStatusBadge(payment.status)}</span></div>
                    <div class="system-payment-detail-item"><span class="label">支付时间</span><span class="value">${payment.time}</span></div>
                    ${refund ? `
                        <div class="system-payment-refund-section">
                            <div class="refund-title">退款信息</div>
                            <div class="system-payment-refund-item"><span class="label">退款单号</span><span class="value">${refund.id}</span></div>
                            <div class="system-payment-refund-item"><span class="label">退款金额</span><span class="value bold">¥${refund.amount}</span></div>
                            <div class="system-payment-refund-item"><span class="label">退款原因</span><span class="value">${refund.reason}</span></div>
                            <div class="system-payment-refund-item"><span class="label">退款时间</span><span class="value">${refund.time}</span></div>
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closePaymentModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function showRefundModal(txnId) {
    const payment = paymentData.find(p => p.id === txnId);
    if (!payment) return;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closePaymentModal()"></div>
        <div class="modal-content" style="width:450px;">
            <div class="modal-header">
                <h3><i class="fas fa-undo"></i> 申请退款</h3>
                <button onclick="closePaymentModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div class="system-payment-refund-section">
                        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                            <span style="font-size:13px;color:#991b1b;">交易号</span>
                            <span style="font-size:12px;">${payment.id}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;">
                            <span style="font-size:13px;color:#991b1b;">退款金额</span>
                            <span style="font-size:18px;font-weight:600;color:#ef4444;">¥${payment.amount}</span>
                        </div>
                    </div>
                    <div>
                        <label class="system-form-label">退款金额</label>
                        <input type="number" id="refundAmount" value="${payment.amount}" min="0" max="${payment.amount}" class="system-form-input" />
                    </div>
                    <div>
                        <label class="system-form-label">退款原因 <span class="system-form-required">*</span></label>
                        <select id="refundReason" class="system-form-select">
                            <option value="质量问题">质量问题</option>
                            <option value="发错货">发错货</option>
                            <option value="不想要了">不想要了</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                    <div>
                        <label class="system-form-label">备注说明</label>
                        <textarea id="refundRemark" placeholder="请输入备注说明（选填）" rows="3" class="system-form-textarea"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closePaymentModal()">取消</button>
                <button class="btn btn-danger" onclick="applyRefund('${payment.id}')"><i class="fas fa-save"></i> 提交申请</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function applyRefund(txnId) {
    const payment = paymentData.find(p => p.id === txnId);
    if (!payment) return;
    
    const amount = parseFloat(document.getElementById('refundAmount').value);
    const reason = document.getElementById('refundReason').value;
    
    if (!amount || amount <= 0) {
        alert('请输入有效的退款金额');
        return;
    }
    
    if (amount > payment.amount) {
        alert('退款金额不能超过支付金额');
        return;
    }
    
    showConfirm(`确定申请退款 ¥${amount} 吗？`, function() {
        const refundId = 'REF-' + Date.now();
        refundData.unshift({
            id: refundId,
            txnId: txnId,
            orderId: payment.orderId,
            amount: amount,
            reason: reason,
            status: 'processing',
            time: new Date().toISOString().replace('T', ' ').substring(0, 19)
        });
    
        alert('退款申请已提交！');
        closePaymentModal();
        refreshPaymentPage();
    });
}

function showRefundDetail(refundId) {
    const refund = refundData.find(r => r.id === refundId);
    if (!refund) return;
    
    const payment = paymentData.find(p => p.id === refund.txnId);
    
    const modalContent = `
        <div class="modal-overlay" onclick="closePaymentModal()"></div>
        <div class="modal-content" style="width:500px;">
            <div class="modal-header">
                <h3><i class="fas fa-undo-alt"></i> 退款详情</h3>
                <button onclick="closePaymentModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="system-payment-detail-grid">
                    <div class="system-payment-detail-item" style="background:#fef2f2;"><span class="label" style="color:#991b1b;">退款单号</span><span class="value">${refund.id}</span></div>
                    <div class="system-payment-detail-item"><span class="label">原交易号</span><span class="value">${refund.txnId}</span></div>
                    <div class="system-payment-detail-item"><span class="label">原订单号</span><span class="value">${refund.orderId}</span></div>
                    <div class="system-payment-detail-item"><span class="label">退款金额</span><span class="value red">¥${refund.amount}</span></div>
                    <div class="system-payment-detail-item"><span class="label">退款原因</span><span class="value">${refund.reason}</span></div>
                    <div class="system-payment-detail-item"><span class="label">退款状态</span><span>${refund.status === 'refunded' ? '<span class="status-badge green"><span class="dot"></span> 已退款</span>' : '<span class="status-badge blue"><span class="dot"></span> 退款中</span>'}</span></div>
                    <div class="system-payment-detail-item"><span class="label">申请时间</span><span class="value">${refund.time}</span></div>
                    ${payment ? `
                        <div class="system-payment-refund-section">
                            <div style="font-weight:600;margin-bottom:8px;color:#4f6ef7;">关联交易信息</div>
                            <div style="display:flex;justify-content:space-between;padding:8px;background:#eef1ff;border-radius:6px;">
                                <span style="font-size:13px;color:#4f6ef7;">支付方式</span>
                                <span style="font-size:13px;">${payment.method}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;padding:8px;background:#eef1ff;border-radius:6px;">
                                <span style="font-size:13px;color:#4f6ef7;">原支付金额</span>
                                <span style="font-size:13px;font-weight:600;">¥${payment.amount}</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closePaymentModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function closePaymentModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function paymentPage() {
    const payments = Array.isArray(paymentData) ? paymentData : [];
    const filteredPayments = filterPayments();
    const successCount = payments.filter(p => p && p.status === 'success').length;
    const refundCount = payments.filter(p => p && p.status === 'refunded').length;
    const totalAmount = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    
    return `
        <div class="flex-between mb-4">
            <div class="search-bar">
                <input id="paymentSearchInput" placeholder="订单号 / 交易号" onkeypress="if(event.key==='Enter') searchPayments()" />
                <select onchange="switchPaymentMethod(this.value)">
                    <option value="all" ${currentPaymentMethodFilter === 'all' ? 'selected' : ''}>全部支付方式</option>
                    <option value="微信支付" ${currentPaymentMethodFilter === '微信支付' ? 'selected' : ''}>微信支付</option>
                    <option value="支付宝" ${currentPaymentMethodFilter === '支付宝' ? 'selected' : ''}>支付宝</option>
                </select>
                <select onchange="switchPaymentStatus(this.value)">
                    <option value="all" ${currentPaymentStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="success" ${currentPaymentStatusFilter === 'success' ? 'selected' : ''}>成功</option>
                    <option value="failed" ${currentPaymentStatusFilter === 'failed' ? 'selected' : ''}>失败</option>
                    <option value="refunded" ${currentPaymentStatusFilter === 'refunded' ? 'selected' : ''}>已退款</option>
                </select>
                <button class="btn btn-primary" onclick="searchPayments()"><i class="fas fa-search"></i> 搜索</button>
            </div>
            <button class="btn btn-outline"><i class="fas fa-download"></i> 导出记录</button>
        </div>
        
        <div class="system-stat-grid">
            <div class="system-stat-card"><div class="label"><i class="fas fa-credit-card"></i> 总支付笔数</div><div class="value">${paymentData.length}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-undo"></i> 总退款笔数</div><div class="value yellow">${refundData.length}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-check-circle"></i> 支付成功率</div><div class="value green">${Math.round((successCount / paymentData.length) * 100)}%</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-yen-sign"></i> 总支付金额</div><div class="value blue">¥${(totalAmount / 10000).toFixed(1)}万</div></div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:12px;">
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-list"></i> 支付记录</span><span class="text-muted" style="font-size:13px;">共 ${filteredPayments.length} 笔交易</span></div>
                <div class="card-body no-pad"><div class="table-wrap"><table><thead><tr><th>交易号</th><th>订单号</th><th>金额</th><th>支付方式</th><th>支付渠道</th><th>状态</th><th>时间</th><th>操作</th></tr></thead><tbody>
                    ${filteredPayments.map(payment => `
                        <tr>
                            <td>${payment.id}</td>
                            <td>${payment.orderId}</td>
                            <td><div style="font-weight:600;">¥${payment.amount}</div></td>
                            <td>${payment.method === '微信支付' ? `<span class="tag primary">微信支付</span>` : `<span class="tag" style="background:#22c55e;color:#fff;">支付宝</span>`}</td>
                            <td>${payment.channel}</td>
                            <td>${getPaymentStatusBadge(payment.status)}</td>
                            <td>${payment.time}</td>
                            <td>
                                <button class="btn btn-sm btn-outline" onclick="showPaymentDetail('${payment.id}')">详情</button>
                                ${payment.status === 'success' ? `<button class="btn btn-sm btn-danger" onclick="showRefundModal('${payment.id}')">申请退款</button>` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody></table></div></div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 支付方式分布</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:10px;">
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span><i class="fab fa-weixin" style="color:#07c160;"></i> 微信支付</span>
                                    <span style="font-weight:600;">${Math.round((paymentData.filter(p => p.method === '微信支付').length / paymentData.length) * 100)}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${(paymentData.filter(p => p.method === '微信支付').length / paymentData.length) * 100}%;height:100%;background:#07c160;border-radius:3px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span><i class="fab fa-alipay" style="color:#1677ff;"></i> 支付宝</span>
                                    <span style="font-weight:600;">${Math.round((paymentData.filter(p => p.method === '支付宝').length / paymentData.length) * 100)}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${(paymentData.filter(p => p.method === '支付宝').length / paymentData.length) * 100}%;height:100%;background:#1677ff;border-radius:3px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 今日统计</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span>今日支付笔数</span>
                                <span style="font-weight:600;color:#4f6ef7;">${paymentData.filter(p => p.time.includes('2026-06-24')).length}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>今日支付金额</span>
                                <span style="font-weight:600;color:#4f6ef7;">¥${paymentData.filter(p => p.time.includes('2026-06-24')).reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>今日退款笔数</span>
                                <span style="font-weight:600;color:#ef4444;">${refundData.filter(r => r.time.includes('2026-06-24')).length}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>今日退款金额</span>
                                <span style="font-weight:600;color:#ef4444;">¥${refundData.filter(r => r.time.includes('2026-06-24')).reduce((sum, r) => sum + r.amount, 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-undo-alt"></i> 退款记录</span><span class="text-muted" style="font-size:13px;">共 ${refundData.length} 笔退款</span></div>
            <div class="card-body no-pad"><div class="table-wrap"><table><thead><tr><th>退款单号</th><th>原交易号</th><th>原订单号</th><th>退款金额</th><th>退款原因</th><th>状态</th><th>时间</th><th>操作</th></tr></thead><tbody>
                ${refundData.map(refund => `
                    <tr>
                        <td>${refund.id}</td>
                        <td>${refund.txnId}</td>
                        <td>${refund.orderId}</td>
                        <td><div style="font-weight:600;color:#ef4444;">¥${refund.amount}</div></td>
                        <td><span class="tag">${refund.reason}</span></td>
                        <td>${refund.status === 'refunded' ? '<span class="status-badge green"><span class="dot"></span> 已退款</span>' : '<span class="status-badge blue"><span class="dot"></span> 退款中</span>'}</td>
                        <td>${refund.time}</td>
                        <td>
                            <button class="btn btn-sm btn-outline" onclick="showRefundDetail('${refund.id}')">${refund.status === 'refunded' ? '详情' : '查看进度'}</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody></table></div></div>
        </div>
    `;
}
