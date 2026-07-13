let couponsData = [
    { id: 'coupon-001', name: '新用户专享', type: 'discount', value: 20, threshold: 100, totalQuantity: 1000, receivedQuantity: 840, usedQuantity: 620, status: 'active', validType: 'fixed', startDate: '2026-07-01', endDate: '2026-08-31', rangeType: 'category', applicableItems: ['手机数码'], perUserLimit: 3, createTime: '2026-06-25' },
    { id: 'coupon-002', name: '数码品类券', type: 'discount', value: 12, threshold: 200, totalQuantity: 500, receivedQuantity: 320, usedQuantity: 240, status: 'active', validType: 'fixed', startDate: '2026-06-20', endDate: '2026-07-20', rangeType: 'category', applicableItems: ['手机数码'], perUserLimit: 2, createTime: '2026-06-18' },
    { id: 'coupon-003', name: '耳机专属券', type: 'voucher', value: 30, threshold: 0, totalQuantity: 200, receivedQuantity: 180, usedQuantity: 175, status: 'expired', validType: 'fixed', startDate: '2026-06-15', endDate: '2026-07-15', rangeType: 'goods', applicableItems: ['goods-001', 'goods-005'], perUserLimit: 1, createTime: '2026-06-12' },
    { id: 'coupon-004', name: '满减大促券', type: 'discount', value: 80, threshold: 500, totalQuantity: 300, receivedQuantity: 156, usedQuantity: 98, status: 'active', validType: 'fixed', startDate: '2026-06-25', endDate: '2026-07-10', rangeType: 'category', applicableItems: ['家用电器'], perUserLimit: 1, createTime: '2026-06-24' },
    { id: 'coupon-005', name: '会员专享券', type: 'voucher', value: 50, threshold: 300, totalQuantity: 200, receivedQuantity: 0, usedQuantity: 0, status: 'pending', validType: 'fixed', startDate: '2026-06-28', endDate: '2026-07-28', rangeType: 'category', applicableItems: ['服装服饰'], perUserLimit: 1, createTime: '2026-06-26' },
    { id: 'coupon-006', name: '家电品类券', type: 'discount', value: 10, threshold: 500, totalQuantity: 100, receivedQuantity: 85, usedQuantity: 72, status: 'expired', validType: 'fixed', startDate: '2026-06-01', endDate: '2026-06-30', rangeType: 'category', applicableItems: ['家用电器'], perUserLimit: 1, createTime: '2026-05-30' }
];

let couponReceivedData = [
    { id: 'recv-001', couponId: 'coupon-001', couponName: '新用户专享', userId: 'user-001', userName: '王*明', phone: '138****8888', receiveTime: '2026-06-25 10:30', status: 'used', orderId: 'ORD-20260625-001', useTime: '2026-06-25 14:30' },
    { id: 'recv-002', couponId: 'coupon-001', couponName: '新用户专享', userId: 'user-002', userName: '李*华', phone: '139****6666', receiveTime: '2026-06-25 11:20', status: 'unused', orderId: null, useTime: null },
    { id: 'recv-003', couponId: 'coupon-002', couponName: '数码品类券', userId: 'user-003', userName: '张*婷', phone: '137****9999', receiveTime: '2026-06-24 14:45', status: 'used', orderId: 'ORD-20260624-015', useTime: '2026-06-24 16:40' },
    { id: 'recv-004', couponId: 'coupon-004', couponName: '满减大促券', userId: 'user-004', userName: '陈*伟', phone: '136****5555', receiveTime: '2026-06-25 09:15', status: 'unused', orderId: null, useTime: null },
    { id: 'recv-005', couponId: 'coupon-003', couponName: '耳机专属券', userId: 'user-005', userName: '刘*芳', phone: '135****7777', receiveTime: '2026-06-20 16:30', status: 'expired', orderId: null, useTime: null },
    { id: 'recv-006', couponId: 'coupon-001', couponName: '新用户专享', userId: 'user-006', userName: '赵*阳', phone: '138****1111', receiveTime: '2026-06-23 10:00', status: 'used', orderId: 'ORD-20260624-012', useTime: '2026-06-24 14:20' },
    { id: 'recv-007', couponId: 'coupon-002', couponName: '数码品类券', userId: 'user-007', userName: '孙*怡', phone: '139****2222', receiveTime: '2026-06-24 08:30', status: 'unused', orderId: null, useTime: null },
    { id: 'recv-008', couponId: 'coupon-004', couponName: '满减大促券', userId: 'user-008', userName: '周*杰', phone: '137****3333', receiveTime: '2026-06-25 12:00', status: 'unused', orderId: null, useTime: null }
];

function getStatusBadge(status) {
    const colors = { active: 'green', pending: 'yellow', expired: 'gray' };
    const texts = { active: '发放中', pending: '待发放', expired: '已过期' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

let currentCouponSearchKeyword = '';
let currentCouponStatusFilter = 'all';
let currentCouponTypeFilter = 'all';

function getTypeBadge(type) {
    const colors = { discount: 'primary', voucher: '', discount_rate: '' };
    const texts = { discount: '满减', voucher: '代金券', discount_rate: '折扣' };
    const colorClass = colors[type] || '';
    const bgStyle = type === 'voucher' ? 'background:#fce4ec;color:#c62828;' : '';
    return `<span class="tag ${colorClass}" style="${bgStyle}">${texts[type] || type}</span>`;
}

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

function searchCoupons() {
    const input = document.getElementById('couponSearchInput');
    if (input) {
        currentCouponSearchKeyword = input.value.trim();
        refreshCouponsPage();
    }
}

function switchCouponStatus(status) {
    currentCouponStatusFilter = status;
    refreshCouponsPage();
}

function switchCouponType(type) {
    currentCouponTypeFilter = type;
    refreshCouponsPage();
}

function getReceiveStatusBadge(status) {
    const colors = { unused: 'blue', used: 'green', expired: 'gray' };
    const texts = { unused: '未使用', used: '已使用', expired: '已过期' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function handleCouponAction(couponId, action) {
    const coupon = couponsData.find(c => c.id === couponId);
    if (!coupon) return;
    
    if (action === 'toggle') {
        coupon.status = coupon.status === 'active' ? 'expired' : 'active';
    } else if (action === 'start') {
        coupon.status = 'active';
    }
    
    refreshCouponsPage();
}

function showAddCouponModal() {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeCouponModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新建优惠券</h3>
                <button onclick="closeCouponModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">优惠券名称 <span style="color:#ef4444;">*</span></label><input type="text" id="couponName" placeholder="请输入优惠券名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">优惠券类型 <span style="color:#ef4444;">*</span></label>
                        <div style="display:flex;gap:8px;">
                            <label style="flex:1;padding:8px;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;text-align:center;" onclick="selectCouponType(this, 'discount')">
                                <input type="radio" name="couponType" value="discount" checked style="display:none;" />
                                <div style="font-weight:600;color:#4f6ef7;">满减</div>
                            </label>
                            <label style="flex:1;padding:8px;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;text-align:center;" onclick="selectCouponType(this, 'voucher')">
                                <input type="radio" name="couponType" value="voucher" style="display:none;" />
                                <div style="font-weight:600;color:#c62828;">代金券</div>
                            </label>
                        </div>
                    </div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">面值 <span style="color:#ef4444;">*</span></label><div style="display:flex;align-items:center;"><span style="font-size:16px;color:#64748b;margin-right:4px;">¥</span><input type="number" id="couponValue" value="20" style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;font-weight:600;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">使用门槛</label><div style="display:flex;align-items:center;"><span style="font-size:16px;color:#64748b;margin-right:4px;">¥</span><input type="number" id="couponThreshold" value="100" style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;font-weight:600;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div></div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">适用范围</label>
                        <select id="couponRange" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onchange="toggleRangeSelection()">
                            <option value="goods">指定商品</option>
                        </select>
                    </div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">每人限领</label><div style="display:flex;align-items:center;"><input type="number" id="couponPerUserLimit" value="3" style="width:60px;padding:8px;border:1px solid #e2e8f0;border-radius:6px;text-align:center;" /><span style="font-size:13px;margin-left:8px;">张</span></div></div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">有效期类型</label>
                        <div style="display:flex;gap:8px;">
                            <label style="flex:1;padding:8px;border:1px solid #4f6ef7;border-radius:6px;cursor:pointer;text-align:center;background:#f8fafc;">
                                <input type="radio" name="validType" value="fixed" checked style="display:none;" />
                                <div style="font-weight:600;">固定日期</div>
                            </label>
                        </div>
                    </div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">总发放量</label><div style="display:flex;align-items:center;"><input type="number" id="couponTotalQuantity" value="1000" style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /><span style="font-size:13px;margin-left:8px;color:#94a3b8;">(0为不限)</span></div></div>
                </div>
                
                <div style="margin-top:12px;" id="fixedDateRange">
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">有效期</label>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <input type="date" id="couponStartDate" value="2026-07-01" style="padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" />
                        <span style="color:#94a3b8;">~</span>
                        <input type="date" id="couponEndDate" value="2026-08-31" style="padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" />
                    </div>
                </div>
                
                <div style="margin-top:12px;display:none;" id="daysRange">
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">领取后有效天数</label>
                    <div style="display:flex;align-items:center;"><input type="number" id="couponValidDays" value="7" style="width:80px;padding:8px;border:1px solid #e2e8f0;border-radius:6px;text-align:center;" /><span style="font-size:13px;margin-left:8px;">天</span></div>
                </div>
                
                <div style="margin-top:12px;display:block;" id="rangeSelection">
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;" id="rangeSelectionLabel">指定商品</label>
                    <div style="display:flex;gap:8px;margin-bottom:8px;">
                        <input type="text" id="goodsSearchInput" placeholder="搜索商品名称" style="flex:1;padding:6px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;" onkeyup="searchGoodsForCoupon()" />
                        <button class="btn btn-sm btn-primary" onclick="searchGoodsForCoupon()"><i class="fas fa-search"></i> 搜索</button>
                    </div>
                    <div id="goodsList" style="max-height:200px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:4px;padding:8px;">
                        ${goodsData.slice(0, 6).map(goods => `
                            <label style="display:flex;align-items:center;gap:8px;padding:6px;cursor:pointer;border-radius:4px;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                                <input type="checkbox" value="${goods.name}" onchange="toggleGoodsSelection(this)" />
                                <span style="font-size:13px;">${goods.name}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div id="selectedGoods" style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px;"></div>
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
        <label style="display:flex;align-items:center;gap:8px;padding:6px;cursor:pointer;border-radius:4px;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
            <input type="checkbox" value="${goods.name}" onchange="toggleGoodsSelection(this)" />
            <span style="font-size:13px;">${goods.name}</span>
        </label>
    `).join('');
}

function toggleGoodsSelection(checkbox) {
    const selectedGoodsDiv = document.getElementById('selectedGoods');
    const goodsName = checkbox.value;
    
    if (checkbox.checked) {
        const tag = document.createElement('span');
        tag.className = 'tag primary';
        tag.textContent = goodsName;
        tag.style.cursor = 'pointer';
        tag.onclick = function() {
            checkbox.checked = false;
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

function saveCoupon() {
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
        alert('请输入优惠券名称');
        return;
    }
    
    if (value <= 0) {
        alert('请输入有效面值');
        return;
    }
    
    if (type === 'discount' && value >= threshold) {
        alert('满减券的面值不能超过门槛');
        return;
    }
    
    couponsData.unshift({
        id: 'coupon-' + Date.now(),
        name: name,
        type: type,
        value: value,
        threshold: threshold,
        totalQuantity: totalQuantity,
        receivedQuantity: 0,
        usedQuantity: 0,
        status: 'pending',
        validType: validType,
        startDate: validType === 'fixed' ? document.getElementById('couponStartDate').value : '2026-06-28',
        endDate: validType === 'fixed' ? document.getElementById('couponEndDate').value : document.getElementById('couponValidDays').value,
        rangeType: rangeType,
        applicableItems: selectedGoods,
        perUserLimit: perUserLimit,
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });
    
    alert('优惠券创建成功！');
    closeCouponModal();
    refreshCouponsPage();
}

function showReceivedList(couponId) {
    const coupon = couponsData.find(c => c.id === couponId);
    if (!coupon) return;
    
    const receivedList = couponReceivedData.filter(r => r.couponId === couponId);
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeCouponModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:720px;">
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
            alert('优惠券已作废！');
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

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:12px;">
            <div class="stat-card"><div class="label"><i class="fas fa-ticket-alt"></i> 总优惠券</div><div class="value" style="font-size:22px;">${couponsData.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 发放中</div><div class="value" style="font-size:22px;color:#22c55e;">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 已过期</div><div class="value" style="font-size:22px;color:#94a3b8;">${expiredCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-percentage"></i> 使用率</div><div class="value" style="font-size:22px;color:#4f6ef7;">${usageRate}%</div></div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-ticket-alt"></i> 优惠券列表</span></div>
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>名称</th><th>类型</th><th>优惠</th><th>门槛</th><th>有效期</th><th>适用范围</th><th>发放数量</th><th>已使用</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>
                            ${filteredCoupons.map(coupon => `
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