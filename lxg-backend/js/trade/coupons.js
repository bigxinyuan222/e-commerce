// 优惠券数据缓存
let couponsData = [];
// 优惠券领取记录数据缓存
let couponReceivedData = [];

// 加载优惠券列表
async function loadCoupons() {
    try {
        const response = await apiGet(API_CONFIG.coupons.list);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        couponsData = dataList.map(coupon => ({
            id: coupon.ID || coupon.id,
            name: coupon.name || '',
            type: coupon.type || 'discount',              // 类型：discount(满减)/voucher(代金券)/discount_rate(折扣)
            value: coupon.value || 0,                     // 优惠金额/折扣率
            threshold: coupon.threshold || 0,             // 使用门槛
            totalQuantity: coupon.totalQuantity || 0,     // 总数量
            receivedQuantity: coupon.receivedQuantity || 0, // 已领取数量
            usedQuantity: coupon.usedQuantity || 0,       // 已使用数量
            status: coupon.status === 1 ? 'active' : coupon.status === 0 ? 'expired' : 'pending',
            validType: coupon.validType || 'fixed',        // 有效期类型
            startDate: coupon.startDate || '',
            endDate: coupon.endDate || '',
            rangeType: coupon.rangeType || 'goods',       // 使用范围
            applicableItems: coupon.applicableItems || [], // 适用商品
            perUserLimit: coupon.perUserLimit || 1,       // 每人限领数量
            createTime: coupon.CreatedAt || coupon.createdAt || ''
        }));
        refreshCouponsPage();
    } catch (error) {
        console.error('Failed to load coupons:', error);
    }
}

// 获取优惠券状态标签HTML
function getStatusBadge(status) {
    const colors = { active: 'green', pending: 'yellow', expired: 'gray' };
    const texts = { active: '发放中', pending: '待发放', expired: '已过期' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 优惠券筛选条件
let currentCouponSearchKeyword = '';
let currentCouponStatusFilter = 'all';
let currentCouponTypeFilter = 'all';
let currentCouponPage = 1;
let couponPageSize = 5;

// 获取优惠券类型标签HTML
function getTypeBadge(type) {
    const classes = { discount: 'tag primary', voucher: 'tag trade-tag-voucher', discount_rate: 'tag' };
    const texts = { discount: '满减', voucher: '代金券', discount_rate: '折扣' };
    return `<span class="${classes[type] || 'tag'}">${texts[type] || type}</span>`;
}

// 根据筛选条件过滤优惠券列表
function filterCoupons() {
    let filtered = couponsData;
    if (currentCouponStatusFilter !== 'all') {
        filtered = filtered.filter(c => c.status === currentCouponStatusFilter);
    }
    if (currentCouponTypeFilter !== 'all') {
        filtered = filtered.filter(c => c.type === currentCouponTypeFilter);
    }
    if (currentCouponSearchKeyword) {
        const keyword = currentCouponSearchKeyword.toLowerCase();
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(keyword) || 
            c.id.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

// 执行优惠券搜索
function searchCoupons() {
    const input = document.getElementById('couponSearchInput');
    if (input) {
        currentCouponSearchKeyword = input.value.trim();
        currentCouponPage = 1;
        refreshCouponsPage();
    }
}

// 切换优惠券状态筛选
function switchCouponStatus(status) {
    currentCouponStatusFilter = status;
    currentCouponPage = 1;
    refreshCouponsPage();
}

function switchCouponType(type) {
    currentCouponTypeFilter = type;
    currentCouponPage = 1;
    refreshCouponsPage();
}

function setCouponPage(page) {
    currentCouponPage = page;
    refreshCouponsPage();
}

function getReceiveStatusBadge(status) {
    const colors = { unused: 'blue', used: 'green', expired: 'gray' };
    const texts = { unused: '未使用', used: '已使用', expired: '已过期' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

async function handleCouponAction(couponId, action) {
    const coupon = couponsData.find(c => c.id === couponId);
    if (!coupon) return;
    
    try {
        if (action === 'toggle') {
            const newStatus = coupon.status === 'active' ? 0 : 1;
            const response = await apiPut(API_CONFIG.coupons.toggle, { status: newStatus }, { id: couponId });
            if (response.code === 200) {
                coupon.status = coupon.status === 'active' ? 'expired' : 'active';
            }
        } else if (action === 'start') {
            const response = await apiPut(API_CONFIG.coupons.toggle, { status: 1 }, { id: couponId });
            if (response.code === 200) {
                coupon.status = 'active';
            }
        }
    } catch (error) {
        console.error('Failed to update coupon status:', error);
    }
    
    refreshCouponsPage();
}

function showAddCouponModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeCouponModal()"></div>
        <div class="modal-content wide">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新建优惠券</h3>
                <button onclick="closeCouponModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body scrollable">
                <div class="trade-form-grid">
                    <div><label class="trade-form-label">优惠券名称 <span class="trade-form-required">*</span></label><input type="text" id="couponName" placeholder="请输入优惠券名称" class="trade-form-input" /></div>
                    <div>
                        <label class="trade-form-label">优惠券类型 <span class="trade-form-required">*</span></label>
                        <div class="trade-form-radio-group">
                            <label class="trade-form-radio-option" onclick="selectCouponType(this, 'discount')">
                                <input type="radio" name="couponType" value="discount" checked />
                                <div class="trade-form-radio-label">满减</div>
                            </label>
                            <label class="trade-form-radio-option" onclick="selectCouponType(this, 'voucher')">
                                <input type="radio" name="couponType" value="voucher" />
                                <div class="trade-form-radio-label">代金券</div>
                            </label>
                        </div>
                    </div>
                    <div><label class="trade-form-label">面值 <span style="color:#ef4444;">*</span></label><div class="trade-form-price-group"><span>¥</span><input type="number" id="couponValue" value="20" class="trade-form-price-input" /></div></div>
                    <div><label class="trade-form-label">使用门槛</label><div class="trade-form-price-group"><span>¥</span><input type="number" id="couponThreshold" value="100" class="trade-form-price-input" /></div></div>
                    <div>
                        <label class="trade-form-label">适用范围</label>
                        <select id="couponRange" class="trade-form-input" onchange="toggleRangeSelection()">
                            <option value="goods">指定商品</option>
                        </select>
                    </div>
                    <div><label class="trade-form-label">每人限领</label><div class="trade-form-number-group"><input type="number" id="couponPerUserLimit" value="3" class="trade-form-number-input" /><span>张</span></div></div>
                    <div>
                        <label class="trade-form-label">有效期类型</label>
                        <div class="trade-form-radio-group">
                            <label class="trade-form-radio-option active" onclick="selectValidType(this, 'fixed')">
                                <input type="radio" name="validType" value="fixed" checked />
                                <div class="trade-form-radio-label">固定日期</div>
                            </label>
                        </div>
                    </div>
                    <div><label class="trade-form-label">总发放量</label><div class="trade-form-price-group"><input type="number" id="couponTotalQuantity" value="1000" class="trade-form-input" /><span style="color:#94a3b8;">(0为不限)</span></div></div>
                </div>
                
                <div class="trade-form-date-range" id="fixedDateRange">
                    <label class="trade-form-label">有效期</label>
                    <div class="trade-form-date-group">
                        <input type="date" id="couponStartDate" value="2026-07-01" class="trade-form-input" />
                        <span class="trade-form-date-separator">~</span>
                        <input type="date" id="couponEndDate" value="2026-08-31" class="trade-form-input" />
                    </div>
                </div>
                
                <div class="trade-form-date-range" id="daysRange" style="display:none;">
                    <label class="trade-form-label">领取后有效天数</label>
                    <div class="trade-form-number-group"><input type="number" id="couponValidDays" value="7" class="trade-form-number-input" /><span>天</span></div>
                </div>
                
                <div class="trade-range-selection" id="rangeSelection">
                    <label class="trade-form-label" id="rangeSelectionLabel">指定商品</label>
                    <div class="trade-form-search-group">
                        <input type="text" id="goodsSearchInput" placeholder="搜索商品名称" class="trade-form-input" onkeyup="searchGoodsForCoupon()" />
                        <button class="btn btn-sm btn-primary" onclick="searchGoodsForCoupon()"><i class="fas fa-search"></i> 搜索</button>
                    </div>
                    <div id="goodsList" class="trade-goods-list">
                        ${goodsData.slice(0, 6).map(goods => `
                            <label class="trade-goods-list-item" onchange="toggleGoodsSelection(this)">
                                <input type="checkbox" value="${goods.name}" />
                                <span>${goods.name}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div id="selectedGoods" class="trade-selected-goods"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeCouponModal()">取消</button>
                <button class="btn btn-primary" onclick="saveCoupon()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function selectCouponType(el, type) {
    document.querySelectorAll('[name="couponType"]').forEach(input => input.checked = false);
    el.querySelector('input').checked = true;
    document.querySelectorAll('[name="couponType"]').forEach(input => {
        const label = input.parentElement;
        if (input.checked) {
            label.style.borderColor = '#4f6ef7';
            label.style.background = '#f8fafc';
        } else {
            label.style.borderColor = '#e2e8f0';
            label.style.background = '#fff';
        }
    });
}

function selectValidType(el, type) {
    document.querySelectorAll('[name="validType"]').forEach(input => input.checked = false);
    el.querySelector('input').checked = true;
    document.querySelectorAll('[name="validType"]').forEach(input => {
        const label = input.parentElement;
        if (input.checked) {
            label.style.borderColor = '#4f6ef7';
            label.style.background = '#f8fafc';
        } else {
            label.style.borderColor = '#e2e8f0';
            label.style.background = '#fff';
        }
    });
    
    document.getElementById('fixedDateRange').style.display = type === 'fixed' ? 'block' : 'none';
    document.getElementById('daysRange').style.display = type === 'days' ? 'block' : 'none';
}

function toggleRangeSelection() {
    const range = document.getElementById('couponRange').value;
    const selection = document.getElementById('rangeSelection');
    const label = document.getElementById('rangeSelectionLabel');
    
    selection.style.display = 'block';
    label.textContent = range === 'category' ? '指定分类' : '指定商品';
}

function toggleRangeItem(el) {
    el.classList.toggle('primary');
}

function searchGoodsForCoupon() {
    const keyword = document.getElementById('goodsSearchInput').value.trim().toLowerCase();
    const goodsList = document.getElementById('goodsList');
    
    const filteredGoods = goodsData.filter(g => g.name.toLowerCase().includes(keyword));
    
    goodsList.innerHTML = filteredGoods.slice(0, 10).map(goods => `
        <label class="trade-goods-list-item" onchange="toggleGoodsSelection(this)">
            <input type="checkbox" value="${goods.name}" />
            <span>${goods.name}</span>
        </label>
    `).join('');
}

function toggleGoodsSelection(checkbox) {
    const selectedGoodsDiv = document.getElementById('selectedGoods');
    const checkboxInput = checkbox.querySelector('input') || checkbox;
    const goodsName = checkboxInput.value;
    
    if (checkboxInput.checked) {
        const tag = document.createElement('span');
        tag.className = 'tag primary trade-selected-goods-tag';
        tag.textContent = goodsName;
        tag.onclick = function() {
            checkboxInput.checked = false;
            tag.remove();
        };
        selectedGoodsDiv.appendChild(tag);
    } else {
        const tags = selectedGoodsDiv.querySelectorAll('.tag');
        tags.forEach(tag => {
            if (tag.textContent === goodsName) {
                tag.remove();
            }
        });
    }
}

async function saveCoupon() {
    const name = document.getElementById('couponName').value.trim();
    const type = document.querySelector('[name="couponType"]:checked').value;
    const value = parseInt(document.getElementById('couponValue').value) || 0;
    const threshold = parseInt(document.getElementById('couponThreshold').value) || 0;
    const rangeType = document.getElementById('couponRange').value;
    const selectedGoods = Array.from(document.querySelectorAll('#goodsList input[type="checkbox"]:checked')).map(cb => cb.value);
    const perUserLimit = parseInt(document.getElementById('couponPerUserLimit').value) || 1;
    const validType = document.querySelector('[name="validType"]:checked').value;
    const totalQuantity = parseInt(document.getElementById('couponTotalQuantity').value) || 0;
    
    if (!name) {
        showToast('请输入优惠券名称', 'error');
        return;
    }
    
    if (value <= 0) {
        showToast('请输入有效面值', 'error');
        return;
    }
    
    if (type === 'discount' && value >= threshold) {
        showToast('满减券的面值不能超过门槛', 'error');
        return;
    }
    
    try {
        const response = await apiPost(API_CONFIG.coupons.add, {
            name: name,
            type: type,
            value: value,
            threshold: threshold,
            rangeType: rangeType,
            applicableItems: selectedGoods,
            perUserLimit: perUserLimit,
            validType: validType,
            totalQuantity: totalQuantity,
            startDate: validType === 'fixed' ? document.getElementById('couponStartDate').value : '',
            endDate: validType === 'fixed' ? document.getElementById('couponEndDate').value : '',
            status: 0
        });
        
        if (response.code === 200 || response.code === 201) {
            showToast('优惠券创建成功！', 'success');
            closeCouponModal();
            await loadCoupons();
        } else {
            showToast(response.message || '创建失败', 'error');
        }
    } catch (error) {
        console.error('Failed to create coupon:', error);
        showToast('创建优惠券失败，请重试', 'error');
    }
}

function showReceivedList(couponId) {
    const coupon = couponsData.find(c => c.id === couponId);
    if (!coupon) return;
    
    const receivedList = couponReceivedData.filter(r => r.couponId === couponId);
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeCouponModal()"></div>
        <div class="modal-content" style="width:720px;">
            <div class="modal-header">
                <h3><i class="fas fa-users"></i> ${coupon.name} · 领取记录</h3>
                <button onclick="closeCouponModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>用户</th><th>领取时间</th><th>使用状态</th><th>关联订单</th><th>操作</th></tr></thead>
                        <tbody>
                            ${receivedList.length > 0 ? receivedList.map(item => `
                                <tr>
                                    <td><div><span>${item.userName}</span><div style="font-size:12px;color:#94a3b8;">${item.phone}</div></div></td>
                                    <td>${item.receiveTime}</td>
                                    <td>${getReceiveStatusBadge(item.status)}</td>
                                    <td>${item.orderId || '-'}</td>
                                    <td>${item.status === 'unused' ? `<button class="btn btn-sm btn-danger" onclick="cancelReceivedCoupon('${item.id}')"><i class="fas fa-ban"></i> 作废</button>` : ''}</td>
                                </tr>
                            `).join('') : `<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:20px;">暂无领取记录</td></tr>`}
                        </tbody>
                    </table></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeCouponModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function cancelReceivedCoupon(receiveId) {
    showConfirm('确定作废此优惠券吗？', function() {
        const item = couponReceivedData.find(r => r.id === receiveId);
        if (item) {
            item.status = 'expired';
            showToast('优惠券已作废！', 'success');
        }
        closeCouponModal();
        refreshCouponsPage();
    });
}

function closeCouponModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshCouponsPage() {
    const panel = document.getElementById('panel-coupons');
    if (panel) panel.innerHTML = couponsPage();
}

function couponsPage() {
    const activeCount = couponsData.filter(c => c.status === 'active').length;
    const expiredCount = couponsData.filter(c => c.status === 'expired').length;
    const totalReceived = couponsData.reduce((sum, c) => sum + c.receivedQuantity, 0);
    const usageRate = totalReceived > 0 ? Math.round((couponsData.reduce((sum, c) => sum + c.usedQuantity, 0) / totalReceived) * 100) : 0;
    const filteredCoupons = filterCoupons();
    const totalCoupons = filteredCoupons.length;
    const totalPages = Math.ceil(totalCoupons / couponPageSize);
    const startIndex = (currentCouponPage - 1) * couponPageSize;
    const pageCoupons = filteredCoupons.slice(startIndex, startIndex + couponPageSize);
    
    return `
        
        
        <div class="flex-between mb-4">
            <div class="search-bar">
                <input id="couponSearchInput" placeholder="优惠券名称" onkeypress="if(event.key==='Enter') searchCoupons()" />
                <select onchange="switchCouponStatus(this.value)">
                    <option value="all" ${currentCouponStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="active" ${currentCouponStatusFilter === 'active' ? 'selected' : ''}>发放中</option>
                    <option value="pending" ${currentCouponStatusFilter === 'pending' ? 'selected' : ''}>待发放</option>
                    <option value="expired" ${currentCouponStatusFilter === 'expired' ? 'selected' : ''}>已过期</option>
                </select>
                <select onchange="switchCouponType(this.value)">
                    <option value="all" ${currentCouponTypeFilter === 'all' ? 'selected' : ''}>全部类型</option>
                    <option value="discount" ${currentCouponTypeFilter === 'discount' ? 'selected' : ''}>满减</option>
                    <option value="voucher" ${currentCouponTypeFilter === 'voucher' ? 'selected' : ''}>代金券</option>
                    <option value="discount_rate" ${currentCouponTypeFilter === 'discount_rate' ? 'selected' : ''}>折扣</option>
                </select>
                <button class="btn btn-primary" onclick="searchCoupons()"><i class="fas fa-search"></i> 搜索</button>
            </div>
            <button class="btn btn-primary" onclick="showAddCouponModal()"><i class="fas fa-plus"></i> 新建优惠券</button>
        </div>

        <div class="trade-stat-grid">
            <div class="stat-card"><div class="label"><i class="fas fa-ticket-alt"></i> 总优惠券</div><div class="value">${couponsData.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 发放中</div><div class="value green">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 已过期</div><div class="value gray">${expiredCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-percentage"></i> 使用率</div><div class="value blue">${usageRate}%</div></div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-ticket-alt"></i> 优惠券列表</span></div>
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>名称</th><th>类型</th><th>优惠</th><th>门槛</th><th>有效期</th><th>适用范围</th><th>发放数量</th><th>已使用</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>
                            ${pageCoupons.map(coupon => `
                                <tr>
                                    <td>${coupon.name}</td>
                                    <td>${getTypeBadge(coupon.type)}</td>
                                    <td style="font-weight:600;color:#ef4444;">${coupon.type === 'discount' ? `满${coupon.threshold}减${coupon.value}` : `¥${coupon.value}`}</td>
                                    <td>${coupon.threshold > 0 ? `¥${coupon.threshold}` : '无门槛'}</td>
                                    <td>${coupon.validType === 'fixed' ? `${coupon.startDate} ~ ${coupon.endDate}` : `领取后${coupon.endDate}天`}</td>
                                    <td><span class="tag">${coupon.rangeType === 'all' ? '全部商品' : coupon.rangeType === 'category' ? '指定分类' : '指定商品'}</span></td>
                                    <td>${coupon.totalQuantity > 0 ? `${coupon.receivedQuantity}/${coupon.totalQuantity}` : `已领${coupon.receivedQuantity}`}</td>
                                    <td>${coupon.usedQuantity}</td>
                                    <td>${getStatusBadge(coupon.status)}</td>
                                    <td>
                                        ${coupon.status === 'pending' ? `<button class="btn btn-sm btn-outline"><i class="fas fa-edit"></i> 编辑</button>` : ''}
                                        ${coupon.status === 'active' ? `
                                        <button class="btn btn-sm btn-danger" onclick="handleCouponAction('${coupon.id}', 'toggle')"><i class="fas fa-times"></i> 停用</button>
                                        ` : coupon.status === 'pending' ? `
                                        <button class="btn btn-sm btn-success" onclick="handleCouponAction('${coupon.id}', 'start')"><i class="fas fa-play"></i> 开始发放</button>
                                        ` : `
                                        <button class="btn btn-sm btn-success" onclick="handleCouponAction('${coupon.id}', 'toggle')"><i class="fas fa-play"></i> 重新启用</button>
                                        `}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table></div>
                </div>
                ${totalPages > 1 ? `
                <div class="card-footer">
                    <div style="display:flex;align-items:center;justify-content:center;gap:6px;">
                        <button onclick="setCouponPage(1)" ${currentCouponPage === 1 ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentCouponPage === 1 ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-double-left"></i>
                        </button>
                        <button onclick="setCouponPage(${currentCouponPage - 1})" ${currentCouponPage === 1 ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentCouponPage === 1 ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-left"></i>
                        </button>
                        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                            <button onclick="setCouponPage(${p})" style="width:32px;height:32px;border-radius:50%;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;transition:all 0.2s;${p === currentCouponPage ? 'background:#4f6ef7;' : 'background:#fff;border:1px solid #e2e8f0;color:#64748b;'};" onmouseover="${p !== currentCouponPage ? 'this.style.borderColor=\'#4f6ef7\';this.style.color=\'#4f6ef7\'' : ''}" onmouseout="${p !== currentCouponPage ? 'this.style.borderColor=\'#e2e8f0\';this.style.color=\'#64748b\'' : ''}">${p}</button>
                        `).join('')}
                        <button onclick="setCouponPage(${currentCouponPage + 1})" ${currentCouponPage === totalPages ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentCouponPage === totalPages ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-right"></i>
                        </button>
                        <button onclick="setCouponPage(${totalPages})" ${currentCouponPage === totalPages ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentCouponPage === totalPages ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                            <i class="fas fa-angle-double-right"></i>
                        </button>
                    </div>
                    <span style="font-size:13px;color:#64748b;">共 ${totalCoupons} 条记录，第 ${currentCouponPage}/${totalPages} 页</span>
                </div>` : ''}
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 优惠券类型分布</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:10px;">
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span><i class="fas fa-percentage" style="color:#4f6ef7;"></i> 满减券</span>
                                    <span style="font-weight:600;">${Math.round((couponsData.filter(c => c.type === 'discount').length / couponsData.length) * 100)}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${(couponsData.filter(c => c.type === 'discount').length / couponsData.length) * 100}%;height:100%;background:#4f6ef7;border-radius:3px;"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                    <span><i class="fas fa-ticket-alt" style="color:#c62828;"></i> 代金券</span>
                                    <span style="font-weight:600;">${Math.round((couponsData.filter(c => c.type === 'voucher').length / couponsData.length) * 100)}%</span>
                                </div>
                                <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                                    <div style="width:${(couponsData.filter(c => c.type === 'voucher').length / couponsData.length) * 100}%;height:100%;background:#ef4444;border-radius:3px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 发放统计</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span>已发放总量</span>
                                <span style="font-weight:600;color:#4f6ef7;">${totalReceived}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>已使用数量</span>
                                <span style="font-weight:600;color:#22c55e;">${couponsData.reduce((sum, c) => sum + c.usedQuantity, 0)}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>未使用数量</span>
                                <span style="font-weight:600;color:#3b82f6;">${totalReceived - couponsData.reduce((sum, c) => sum + c.usedQuantity, 0)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}