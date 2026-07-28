// 支付记录数据缓存
let paymentData = [];
// 退款记录数据缓存
let refundData = [];

// 支付筛选条件
let currentPaymentStatusFilter = 'all';
let currentPaymentStartDate = '';
let currentPaymentEndDate = '';
let currentPaymentPage = 1;
let currentPaymentPageSize = 10;
let paymentTotal = 0;
let paymentLoading = false;
let paymentError = '';
let currentRefundStatusFilter = 'all';
let currentRefundStartDate = '';
let currentRefundEndDate = '';
let currentRefundPage = 1;
let currentRefundPageSize = 10;
let refundTotal = 0;
let refundLoading = false;
let refundError = '';

function escapePaymentText(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

function normalizePaymentStatus(status) {
    if (status === 0 || status === '0' || status === 'pending' || status === 'unpaid') return 'pending';
    if (status === 1 || status === '1' || status === 'paid' || status === 'success') return 'success';
    if (status === 2 || status === '2' || status === 'refunded') return 'refunded';
    if (status === 'failed') return 'failed';
    return 'pending';
}

function normalizePaymentMethod(method) {
    if (method === 1 || method === '1' || method === 'wechat' || method === 'weixin') return '微信支付';
    if (method === 2 || method === '2' || method === 'alipay') return '支付宝';
    return String(method || '-');
}

function normalizeRefundStatus(status) {
    if (status === 0 || status === '0' || status === 'pending' || status === 'processing') return 'pending';
    if (status === 1 || status === '1' || status === 'refunded' || status === 'success') return 'refunded';
    if (status === 2 || status === '2' || status === 'failed') return 'failed';
    return 'pending';
}

// 加载支付记录列表
async function loadPayments() {
    paymentLoading = true;
    paymentError = '';
    refreshPaymentPage();
    try {
        const params = {
            page: currentPaymentPage,
            pageSize: currentPaymentPageSize,
            status: currentPaymentStatusFilter === 'all' ? '' : Number(currentPaymentStatusFilter),
            start_date: currentPaymentStartDate,
            end_date: currentPaymentEndDate
        };
        const response = await apiGet(API_CONFIG.payments.list, params);
        const dataList = Array.isArray(response)
            ? response
            : response?.list ?? response?.items ?? response?.records ?? response?.payments ?? [];
        paymentData = dataList.map(item => ({
            id: String(item.payment_no ?? item.paymentNo ?? item.transaction_id ?? item.transactionId ?? item.ID ?? item.id ?? ''),
            orderId: String(item.order_no ?? item.orderNo ?? item.order_id ?? item.orderId ?? ''),
            amount: Number(item.amount ?? item.pay_amount ?? item.payAmount) || 0,
            method: normalizePaymentMethod(item.payment_method ?? item.paymentMethod ?? item.method),
            channel: item.channel ?? item.payment_channel ?? item.paymentChannel ?? '',
            status: normalizePaymentStatus(item.status),
            time: item.paid_at ?? item.paidAt ?? item.created_at ?? item.createdAt ?? item.time ?? ''
        }));
        paymentTotal = Number(response?.total ?? response?.total_count ?? response?.count) || paymentData.length;
        currentPaymentPage = Number(response?.page ?? response?.current_page) || currentPaymentPage;
        currentPaymentPageSize = Number(response?.pageSize ?? response?.page_size ?? response?.size) || currentPaymentPageSize;
    } catch (error) {
        paymentData = [];
        paymentTotal = 0;
        paymentError = error.message || '支付记录加载失败';
        console.error('Failed to load payments:', error);
    } finally {
        paymentLoading = false;
        refreshPaymentPage();
    }
}

// 加载退款记录列表
async function loadRefunds() {
    refundLoading = true;
    refundError = '';
    refreshPaymentPage();
    try {
        const response = await apiGet(API_CONFIG.payments.refundList, {
            page: currentRefundPage,
            pageSize: currentRefundPageSize,
            status: currentRefundStatusFilter === 'all' ? '' : Number(currentRefundStatusFilter),
            start_date: currentRefundStartDate,
            end_date: currentRefundEndDate
        });
        const dataList = Array.isArray(response)
            ? response
            : response?.list ?? response?.items ?? response?.records ?? response?.refunds ?? [];
        refundData = dataList.map(item => ({
            id: String(item.refund_no ?? item.refundNo ?? item.ID ?? item.id ?? ''),
            txnId: String(item.payment_no ?? item.paymentNo ?? item.transaction_id ?? item.transactionId ?? item.txnId ?? ''),
            orderId: String(item.order_no ?? item.orderNo ?? item.order_id ?? item.orderId ?? ''),
            amount: Number(item.amount ?? item.refund_amount ?? item.refundAmount) || 0,
            reason: String(item.reason ?? item.refund_reason ?? item.refundReason ?? ''),
            status: normalizeRefundStatus(item.status),
            time: item.refunded_at ?? item.refundedAt ?? item.created_at ?? item.createdAt ?? item.time ?? ''
        }));
        refundTotal = Number(response?.total ?? response?.total_count ?? response?.count) || refundData.length;
        currentRefundPage = Number(response?.page ?? response?.current_page) || currentRefundPage;
        currentRefundPageSize = Number(response?.pageSize ?? response?.page_size ?? response?.size) || currentRefundPageSize;
    } catch (error) {
        refundData = [];
        refundTotal = 0;
        refundError = error.message || '退款记录加载失败';
        console.error('Failed to load refunds:', error);
    } finally {
        refundLoading = false;
        refreshPaymentPage();
    }
}

async function searchRefunds() {
    currentRefundStatusFilter = document.getElementById('refundStatusFilter')?.value ?? 'all';
    currentRefundStartDate = document.getElementById('refundStartDate')?.value ?? '';
    currentRefundEndDate = document.getElementById('refundEndDate')?.value ?? '';
    if (currentRefundStartDate && currentRefundEndDate && currentRefundStartDate > currentRefundEndDate) {
        showToast('退款开始日期不能晚于结束日期', 'error');
        return;
    }
    currentRefundPage = 1;
    await loadRefunds();
}

async function changeRefundPage(page) {
    const totalPages = Math.max(1, Math.ceil(refundTotal / currentRefundPageSize));
    const nextPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
    if (nextPage === currentRefundPage || refundLoading) return;
    currentRefundPage = nextPage;
    await loadRefunds();
}

function getRefundStatusBadge(status) {
    const colors = { pending: 'yellow', refunded: 'green', failed: 'red' };
    const texts = { pending: '待退款', refunded: '已退款', failed: '失败' };
    return `<span class="status-badge ${colors[status] || 'gray'}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 获取支付状态标签HTML
function getPaymentStatusBadge(status) {
    const colors = { success: 'green', failed: 'red', refunded: 'red', pending: 'yellow' };
    const texts = { success: '已支付', failed: '失败', refunded: '已退款', pending: '待支付' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 根据筛选条件过滤支付记录
function filterPayments() {
    return paymentData;
}

async function searchPayments() {
    currentPaymentStatusFilter = document.getElementById('paymentStatusFilter')?.value ?? 'all';
    currentPaymentStartDate = document.getElementById('paymentStartDate')?.value ?? '';
    currentPaymentEndDate = document.getElementById('paymentEndDate')?.value ?? '';
    if (currentPaymentStartDate && currentPaymentEndDate && currentPaymentStartDate > currentPaymentEndDate) {
        showToast('开始日期不能晚于结束日期', 'error');
        return;
    }
    currentPaymentPage = 1;
    await loadPayments();
}

async function changePaymentPage(page) {
    const totalPages = Math.max(1, Math.ceil(paymentTotal / currentPaymentPageSize));
    const nextPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
    if (nextPage === currentPaymentPage || paymentLoading) return;
    currentPaymentPage = nextPage;
    await loadPayments();
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
        showToast('请输入有效的退款金额', 'error');
        return;
    }
    
    if (amount > payment.amount) {
        showToast('退款金额不能超过支付金额', 'error');
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
            status: 'pending',
            time: new Date().toISOString().replace('T', ' ').substring(0, 19)
        });
    
        showToast('退款申请已提交！', 'success');
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
                    <div class="system-payment-detail-item"><span class="label">退款状态</span><span>${getRefundStatusBadge(refund.status)}</span></div>
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
    const totalPaymentPages = Math.max(1, Math.ceil(paymentTotal / currentPaymentPageSize));
    const totalRefundPages = Math.max(1, Math.ceil(refundTotal / currentRefundPageSize));
    const successRate = payments.length ? Math.round((successCount / payments.length) * 100) : 0;
    
    return `
        <div class="flex-between mb-4">
            <div class="search-bar">
                <select id="paymentStatusFilter">
                    <option value="all" ${currentPaymentStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="0" ${currentPaymentStatusFilter === '0' ? 'selected' : ''}>待支付</option>
                    <option value="1" ${currentPaymentStatusFilter === '1' ? 'selected' : ''}>已支付</option>
                    <option value="2" ${currentPaymentStatusFilter === '2' ? 'selected' : ''}>已退款</option>
                </select>
                <input type="date" id="paymentStartDate" value="${currentPaymentStartDate}" aria-label="开始日期" />
                <span class="text-muted">至</span>
                <input type="date" id="paymentEndDate" value="${currentPaymentEndDate}" aria-label="结束日期" />
                <button class="btn btn-primary" onclick="searchPayments()"><i class="fas fa-filter"></i> 筛选</button>
            </div>
            <button class="btn btn-outline"><i class="fas fa-download"></i> 导出记录</button>
        </div>
        
        <div class="system-stat-grid">
            <div class="system-stat-card"><div class="label"><i class="fas fa-credit-card"></i> 总支付笔数</div><div class="value">${paymentTotal.toLocaleString()}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-undo"></i> 总退款笔数</div><div class="value yellow">${refundTotal.toLocaleString()}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-check-circle"></i> 支付成功率</div><div class="value green">${successRate}%</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-yen-sign"></i> 总支付金额</div><div class="value blue">¥${(totalAmount / 10000).toFixed(1)}万</div></div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:12px;">
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-list"></i> 支付记录</span><span class="text-muted" style="font-size:13px;">共 ${paymentTotal.toLocaleString()} 笔交易</span></div>
                <div class="card-body no-pad">
                    ${paymentError ? `<div class="payment-error"><i class="fas fa-exclamation-circle"></i> ${escapePaymentText(paymentError)}</div>` : ''}
                    <div class="table-wrap"><table><thead><tr><th>交易号</th><th>订单号</th><th>金额</th><th>支付方式</th><th>支付渠道</th><th>状态</th><th>时间</th><th>操作</th></tr></thead><tbody>
                    ${paymentLoading ? `<tr><td colspan="8"><div class="payment-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载支付记录...</div></td></tr>` : filteredPayments.length === 0 ? `<tr><td colspan="8"><div class="payment-table-state"><i class="fas fa-inbox"></i> 暂无支付记录</div></td></tr>` : filteredPayments.map(payment => `
                        <tr>
                            <td>${escapePaymentText(payment.id)}</td>
                            <td>${escapePaymentText(payment.orderId)}</td>
                            <td><div style="font-weight:600;">¥${payment.amount}</div></td>
                            <td>${payment.method === '微信支付' ? `<span class="tag primary">微信支付</span>` : payment.method === '支付宝' ? `<span class="tag" style="background:#22c55e;color:#fff;">支付宝</span>` : `<span class="tag">${escapePaymentText(payment.method)}</span>`}</td>
                            <td>${escapePaymentText(payment.channel || '-')}</td>
                            <td>${getPaymentStatusBadge(payment.status)}</td>
                            <td>${payment.time}</td>
                            <td>
                                <button class="btn btn-sm btn-outline" onclick="showPaymentDetail('${payment.id}')">详情</button>
                                ${payment.status === 'success' ? `<button class="btn btn-sm btn-danger" onclick="showRefundModal('${payment.id}')">申请退款</button>` : ''}
                            </td>
                        </tr>
                    `).join('')}
                    </tbody></table></div>
                    <div class="payment-pagination">
                        <span>第 ${currentPaymentPage} / ${totalPaymentPages} 页</span>
                        <div>
                            <button class="btn btn-sm btn-outline" onclick="changePaymentPage(${currentPaymentPage - 1})" ${currentPaymentPage <= 1 || paymentLoading ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> 上一页</button>
                            <button class="btn btn-sm btn-outline" onclick="changePaymentPage(${currentPaymentPage + 1})" ${currentPaymentPage >= totalPaymentPages || paymentLoading ? 'disabled' : ''}>下一页 <i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
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
            <div class="card-header payment-refund-header">
                <span class="card-title"><i class="fas fa-undo-alt"></i> 退款记录</span>
                <div class="payment-refund-filters">
                    <select id="refundStatusFilter" class="form-inline-input">
                        <option value="all" ${currentRefundStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                        <option value="0" ${currentRefundStatusFilter === '0' ? 'selected' : ''}>待退款</option>
                        <option value="1" ${currentRefundStatusFilter === '1' ? 'selected' : ''}>已退款</option>
                        <option value="2" ${currentRefundStatusFilter === '2' ? 'selected' : ''}>失败</option>
                    </select>
                    <input type="date" id="refundStartDate" value="${currentRefundStartDate}" class="form-inline-input" aria-label="退款开始日期" />
                    <span class="text-muted">至</span>
                    <input type="date" id="refundEndDate" value="${currentRefundEndDate}" class="form-inline-input" aria-label="退款结束日期" />
                    <button class="btn btn-sm btn-primary" onclick="searchRefunds()"><i class="fas fa-filter"></i> 筛选</button>
                    <span class="text-muted">共 ${refundTotal.toLocaleString()} 笔</span>
                </div>
            </div>
            <div class="card-body no-pad">
                ${refundError ? `<div class="payment-error"><i class="fas fa-exclamation-circle"></i> ${escapePaymentText(refundError)}</div>` : ''}
                <div class="table-wrap"><table><thead><tr><th>退款单号</th><th>原交易号</th><th>原订单号</th><th>退款金额</th><th>退款原因</th><th>状态</th><th>时间</th><th>操作</th></tr></thead><tbody>
                ${refundLoading ? `<tr><td colspan="8"><div class="payment-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载退款记录...</div></td></tr>` : refundData.length === 0 ? `<tr><td colspan="8"><div class="payment-table-state"><i class="fas fa-inbox"></i> 暂无退款记录</div></td></tr>` : refundData.map(refund => `
                    <tr>
                        <td>${escapePaymentText(refund.id)}</td>
                        <td>${escapePaymentText(refund.txnId)}</td>
                        <td>${escapePaymentText(refund.orderId)}</td>
                        <td><div style="font-weight:600;color:#ef4444;">¥${refund.amount}</div></td>
                        <td><span class="tag">${escapePaymentText(refund.reason || '-')}</span></td>
                        <td>${getRefundStatusBadge(refund.status)}</td>
                        <td>${escapePaymentText(refund.time)}</td>
                        <td>
                            <button class="btn btn-sm btn-outline" onclick="showRefundDetail('${refund.id}')">${refund.status === 'refunded' ? '详情' : '查看进度'}</button>
                        </td>
                    </tr>
                `).join('')}
                </tbody></table></div>
                <div class="payment-pagination">
                    <span>第 ${currentRefundPage} / ${totalRefundPages} 页</span>
                    <div>
                        <button class="btn btn-sm btn-outline" onclick="changeRefundPage(${currentRefundPage - 1})" ${currentRefundPage <= 1 || refundLoading ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> 上一页</button>
                        <button class="btn btn-sm btn-outline" onclick="changeRefundPage(${currentRefundPage + 1})" ${currentRefundPage >= totalRefundPages || refundLoading ? 'disabled' : ''}>下一页 <i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
