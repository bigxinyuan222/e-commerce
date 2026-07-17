let stockData = [
    { id: 'SKU-001', goodsName: '无线蓝牙耳机 Pro', spec: '黑色', stock: 840, threshold: 50, status: 'normal' },
    { id: 'SKU-002', goodsName: '无线蓝牙耳机 Pro', spec: '白色', stock: 400, threshold: 50, status: 'normal' },
    { id: 'SKU-003', goodsName: '无线蓝牙耳机 Pro', spec: '红色', stock: 0, threshold: 50, status: 'warning' },
    { id: 'SKU-004', goodsName: '无线蓝牙耳机 Pro', spec: '蓝色', stock: 230, threshold: 50, status: 'normal' },
    { id: 'SKU-005', goodsName: '智能手表 S8', spec: '银色', stock: 32, threshold: 50, status: 'warning' },
    { id: 'SKU-006', goodsName: '智能手表 S8', spec: '黑色', stock: 156, threshold: 50, status: 'normal' },
    { id: 'SKU-007', goodsName: '便携移动电源', spec: '白色', stock: 18, threshold: 30, status: 'warning' },
    { id: 'SKU-008', goodsName: '便携移动电源', spec: '黑色', stock: 450, threshold: 30, status: 'normal' },
    { id: 'SKU-009', goodsName: '智能台灯 Pro', spec: '白色', stock: 280, threshold: 10, status: 'normal' },
    { id: 'SKU-010', goodsName: '智能台灯 Pro', spec: '黑色', stock: 60, threshold: 10, status: 'normal' }
];

let stockLogData = [
    { id: 'log-001', skuId: 'SKU-001', skuName: '无线蓝牙耳机 Pro 黑', type: 'in', typeText: '采购入库', quantity: 200, beforeStock: 640, afterStock: 840, orderId: null, operator: '张运营', createTime: '2026-06-25 14:32' },
    { id: 'log-002', skuId: 'SKU-005', skuName: '智能手表 S8 银', type: 'out', typeText: '销售出库', quantity: -15, beforeStock: 47, afterStock: 32, orderId: 'ORD-20260625-002', operator: '李店员', createTime: '2026-06-25 11:20' },
    { id: 'log-003', skuId: 'SKU-003', skuName: '无线蓝牙耳机 Pro 红', type: 'out', typeText: '销售出库', quantity: -2, beforeStock: 2, afterStock: 0, orderId: 'ORD-20260625-001', operator: '王店员', createTime: '2026-06-25 09:15' },
    { id: 'log-004', skuId: 'SKU-007', skuName: '便携移动电源 白', type: 'loss', typeText: '损耗', quantity: -5, beforeStock: 23, afterStock: 18, orderId: null, operator: '张运营', createTime: '2026-06-24 16:45' },
    { id: 'log-005', skuId: 'SKU-009', skuName: '智能台灯 Pro 白', type: 'in', typeText: '采购入库', quantity: 100, beforeStock: 180, afterStock: 280, orderId: null, operator: '张运营', createTime: '2026-06-24 10:30' },
    { id: 'log-006', skuId: 'SKU-008', skuName: '便携移动电源 黑', type: 'adjust', typeText: '盘盈', quantity: 20, beforeStock: 430, afterStock: 450, orderId: null, operator: '李店员', createTime: '2026-06-23 15:20' }
];

let currentStockSearchKeyword = '';
let currentStockWarehouseFilter = '总仓';
let currentStockLogTimeFilter = '';
let currentStockLogSkuFilter = '';

function getStatusBadge(status) {
    if (status === 'warning') return '<span class="status-badge red"><span class="dot"></span> 预警</span>';
    return '<span class="status-badge green"><span class="dot"></span> 正常</span>';
}

function filterStock() {
    let filtered = stockData;
    if (currentStockSearchKeyword) {
        const keyword = currentStockSearchKeyword.toLowerCase();
        filtered = filtered.filter(s => 
            s.id.toLowerCase().includes(keyword) || 
            s.goodsName.toLowerCase().includes(keyword) ||
            s.spec.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchStock() {
    const input = document.getElementById('stockSearchInput');
    if (input) {
        currentStockSearchKeyword = input.value.trim();
        refreshStockPage();
    }
}

function switchStockWarehouse(warehouse) {
    currentStockWarehouseFilter = warehouse;
    refreshStockPage();
}

function filterStockLog() {
    let filtered = stockLogData;
    if (currentStockLogTimeFilter) {
        filtered = filtered.filter(l => l.createTime.includes(currentStockLogTimeFilter));
    }
    if (currentStockLogSkuFilter) {
        const keyword = currentStockLogSkuFilter.toLowerCase();
        filtered = filtered.filter(l => 
            l.skuId.toLowerCase().includes(keyword) || 
            l.skuName.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function setStockLogFilter(type, value) {
    if (type === 'time') {
        currentStockLogTimeFilter = value;
    } else if (type === 'sku') {
        currentStockLogSkuFilter = value;
    }
    refreshStockPage();
}

function getTypeBadge(type) {
    const colors = { in: 'green', out: 'yellow', loss: 'red', adjust: 'blue' };
    const texts = { in: '采购入库', out: '销售出库', loss: '损耗', adjust: '盘盈/盘亏' };
    const color = colors[type] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[type] || type}</span>`;
}

function getWarningList() {
    return stockData.filter(s => s.stock <= s.threshold);
}

function handleStockAdjust(skuId, type, quantity, reason) {
    const sku = stockData.find(s => s.id === skuId);
    if (!sku) return;
    
    const beforeStock = sku.stock;
    let newStock = beforeStock + quantity;
    
    if (newStock < 0) {
        alert('调整后库存不能为负数！');
        return;
    }
    
    sku.stock = newStock;
    sku.status = newStock <= sku.threshold ? 'warning' : 'normal';
    
    const typeText = { in: '采购入库', out: '销售出库', loss: '损耗', adjust: quantity > 0 ? '盘盈' : '盘亏' }[type];
    
    stockLogData.unshift({
        id: 'log-' + Date.now(),
        skuId: sku.id,
        skuName: `${sku.goodsName} ${sku.spec}`,
        type: type,
        typeText: typeText,
        quantity: quantity,
        beforeStock: beforeStock,
        afterStock: newStock,
        orderId: type === 'out' ? null : null,
        operator: currentUser.name,
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });
    
    alert(`库存调整成功！\n调整前：${beforeStock}件\n调整后：${newStock}件`);
    refreshStockPage();
}

function showStockAdjustModal() {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeStockModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:560px;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 手动调整库存</h3>
                <button onclick="closeStockModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom:16px;">
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">调整类型</label>
                    <div style="display:flex;gap:12px;">
                        <label style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;text-align:center;transition:0.2s;" onclick="selectStockType(this, 'in')">
                            <input type="radio" name="stockType" value="in" checked style="display:none;" />
                            <div style="font-weight:600;color:#22c55e;">采购入库</div>
                            <div style="font-size:12px;color:#94a3b8;margin-top:2px;">增加库存</div>
                        </label>
                        <label style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;text-align:center;transition:0.2s;" onclick="selectStockType(this, 'loss')">
                            <input type="radio" name="stockType" value="loss" style="display:none;" />
                            <div style="font-weight:600;color:#ef4444;">损耗</div>
                            <div style="font-size:12px;color:#94a3b8;margin-top:2px;">减少库存</div>
                        </label>
                        <label style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;text-align:center;transition:0.2s;" onclick="selectStockType(this, 'adjust')">
                            <input type="radio" name="stockType" value="adjust" style="display:none;" />
                            <div style="font-weight:600;color:#4f6ef7;">盘盈/盘亏</div>
                            <div style="font-size:12px;color:#94a3b8;margin-top:2px;">盘点调整</div>
                        </label>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">选择SKU</label>
                    <input type="text" id="skuSearchInput" placeholder="搜索SKU编码或商品名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" oninput="searchSku()" />
                    <div id="skuSearchResult" style="margin-top:8px;max-height:150px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:6px;display:none;"></div>
                    <div id="selectedSkuInfo" style="margin-top:8px;padding:10px;background:#f8fafc;border-radius:6px;display:none;">
                        <div style="font-weight:600;" id="selectedSkuName"></div>
                        <div style="font-size:12px;color:#94a3b8;" id="selectedSkuStock"></div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">调整数量</label>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(-10)"><i class="fas fa-minus"></i></button>
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(-1)"><i class="fas fa-minus"></i></button>
                        <input type="number" id="stockQuantity" value="10" style="flex:1;padding:8px;text-align:center;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;font-weight:600;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(1)"><i class="fas fa-plus"></i></button>
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(10)"><i class="fas fa-plus"></i></button>
                    </div>
                    <div style="font-size:12px;color:#f59e0b;margin-top:4px;">正数代表增加库存，负数代表减少库存</div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">调整原因</label>
                    <textarea id="stockReason" rows="2" placeholder="请填写调整原因..." style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeStockModal()">取消</button>
                <button class="btn btn-primary" onclick="submitStockAdjust()"><i class="fas fa-save"></i> 确认调整</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

let selectedSku = null;

function selectStockType(el, type) {
    document.querySelectorAll('[name="stockType"]').forEach(input => input.checked = false);
    el.querySelector('input').checked = true;
    document.querySelectorAll('[name="stockType"]').forEach(input => {
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

function searchSku() {
    const keyword = document.getElementById('skuSearchInput').value.trim();
    const result = document.getElementById('skuSearchResult');
    const info = document.getElementById('selectedSkuInfo');
    
    if (!keyword) {
        result.style.display = 'none';
        return;
    }
    
    const filtered = stockData.filter(s => 
        s.id.toLowerCase().includes(keyword.toLowerCase()) || 
        s.goodsName.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (filtered.length > 0) {
        result.style.display = 'block';
        result.innerHTML = filtered.map(sku => `
            <div style="padding:10px 12px;cursor:pointer;border-bottom:1px solid #f1f4f9;transition:0.15s;" onclick="selectSku('${sku.id}', '${sku.goodsName}', '${sku.spec}', ${sku.stock})" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'">
                <div style="font-weight:500;">${sku.id} - ${sku.goodsName}</div>
                <div style="font-size:12px;color:#94a3b8;">规格: ${sku.spec} · 当前库存: ${sku.stock}</div>
            </div>
        `).join('');
    } else {
        result.style.display = 'none';
    }
}

function selectSku(id, name, spec, stock) {
    selectedSku = { id, name, spec, stock };
    document.getElementById('skuSearchInput').value = `${id} - ${name}`;
    document.getElementById('skuSearchResult').style.display = 'none';
    document.getElementById('selectedSkuInfo').style.display = 'block';
    document.getElementById('selectedSkuName').textContent = `${name} - ${spec}`;
    document.getElementById('selectedSkuStock').textContent = `当前库存: ${stock}件`;
}

function adjustQuantity(delta) {
    const input = document.getElementById('stockQuantity');
    const current = parseInt(input.value) || 0;
    input.value = Math.max(1, current + delta);
}

function submitStockAdjust() {
    if (!selectedSku) {
        alert('请选择要调整的SKU');
        return;
    }
    
    const type = document.querySelector('[name="stockType"]:checked').value;
    const quantity = parseInt(document.getElementById('stockQuantity').value) || 0;
    const reason = document.getElementById('stockReason').value.trim();
    
    if (quantity <= 0) {
        alert('调整数量必须大于0');
        return;
    }
    
    if (!reason) {
        alert('请填写调整原因');
        return;
    }
    
    let actualQuantity = quantity;
    if (type === 'loss') {
        actualQuantity = -quantity;
    }
    
    handleStockAdjust(selectedSku.id, type, actualQuantity, reason);
}

function closeStockModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
    selectedSku = null;
}

function refreshStockPage() {
    const panel = document.getElementById('panel-stock');
    if (panel) panel.innerHTML = stockPage();
}

function stockPage() {
    const warningList = getWarningList();
    
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
            <div style="display:flex;align-items:center;gap:12px;">
                <span style="font-weight:600;color:#1e293b;">总仓</span>
            </div>
            <button class="btn btn-primary" onclick="showStockAdjustModal()"><i class="fas fa-plus"></i> 库存调整</button>
        </div>
        
        <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);">
            <div class="stat-card"><div class="label"><i class="fas fa-boxes"></i> 当前总库存</div><div class="value" style="font-size:22px;">${stockData.reduce((sum, s) => sum + s.stock, 0).toLocaleString()}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-exclamation-triangle"></i> 低于阈值预警</div><div class="value" style="font-size:22px;color:#ef4444;">${warningList.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-arrow-down"></i> 今日入库</div><div class="value" style="font-size:22px;">${stockLogData.filter(l => l.type === 'in' && l.createTime.includes('2026-06-25')).reduce((sum, l) => sum + l.quantity, 0)}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-arrow-up"></i> 今日出库</div><div class="value" style="font-size:22px;">${Math.abs(stockLogData.filter(l => l.type === 'out' && l.createTime.includes('2026-06-25')).reduce((sum, l) => sum + l.quantity, 0))}</div></div>
        </div>
        
        ${warningList.length > 0 ? `
        <div class="card" style="border-color:#ef4444;border-left:4px solid #ef4444;">
            <div class="card-header"><span class="card-title"><i class="fas fa-exclamation-triangle"></i> 低库存预警</span><span class="status-badge red"><span class="dot"></span> 预警阈值 ≤ 50</span></div>
            <div class="card-body">
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">
                    ${warningList.map(sku => `
                        <div style="border:1px solid #fee2e2;border-radius:8px;padding:12px;background:#fef2f2;">
                            <div style="font-weight:600;color:#dc2626;">${sku.id} · ${sku.goodsName}</div>
                            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">规格: ${sku.spec}</div>
                            <div style="display:flex;justify-content:space-between;margin-top:8px;">
                                <span style="font-size:13px;">当前库存</span>
                                <span style="font-weight:700;color:#ef4444;">${sku.stock}件</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span style="font-size:13px;">预警阈值</span>
                                <span style="font-weight:600;">${sku.threshold}件</span>
                            </div>
                            <button class="btn btn-sm btn-primary" style="margin-top:8px;width:100%;" onclick="showStockAdjustModal()">补货</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        ` : ''}
        
        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-list"></i> 库存查询 · 按 SKU</span>
                <div style="display:flex;align-items:center;gap:8px;">
                    <input id="stockSearchInput" placeholder="按 SKU 查询" value="${currentStockSearchKeyword}" onkeypress="if(event.key==='Enter') searchStock()" style="padding:4px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;width:150px;" />
                    <button class="btn btn-sm btn-primary" onclick="searchStock()"><i class="fas fa-search"></i> 查询</button>
                    <span class="status-badge red"><span class="dot"></span> 预警阈值 ≤ 50</span>
                </div>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th>SKU</th><th>商品</th><th>规格</th><th>当前库存</th><th>预警阈值</th><th>状态</th><th>操作</th></tr></thead>
                    <tbody>
                        ${filterStock().map(sku => `
                            <tr>
                                <td>${sku.id}</td>
                                <td>${sku.goodsName}</td>
                                <td>${sku.spec}</td>
                                <td>${sku.stock}</td>
                                <td>${sku.threshold}</td>
                                <td>${getStatusBadge(sku.status)}</td>
                                <td><button class="btn btn-sm btn-outline" onclick="showStockAdjustModal()">调整</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-history"></i> 出入库记录</span>
                <div style="display:flex;align-items:center;gap:8px;">
                    <input id="stockLogSkuInput" placeholder="按 SKU 筛选" value="${currentStockLogSkuFilter}" onkeypress="if(event.key==='Enter') setStockLogFilter('sku', this.value)" style="padding:4px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;width:120px;" />
                    <input type="date" id="stockLogDateInput" value="${currentStockLogTimeFilter}" onchange="setStockLogFilter('time', this.value)" style="padding:4px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;" />
                    <button class="btn btn-sm btn-primary" onclick="setStockLogFilter('sku', document.getElementById('stockLogSkuInput').value) && setStockLogFilter('time', document.getElementById('stockLogDateInput').value)"><i class="fas fa-search"></i> 筛选</button>
                    <button class="btn btn-sm btn-outline" onclick="currentStockLogTimeFilter='';currentStockLogSkuFilter='';refreshStockPage()">重置</button>
                </div>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th>时间</th><th>SKU</th><th>类型</th><th>变动数量</th><th>变动前库存</th><th>变动后库存</th><th>关联订单</th><th>操作人</th></tr></thead>
                    <tbody>
                        ${filterStockLog().map(log => `
                            <tr>
                                <td>${log.createTime}</td>
                                <td>${log.skuName}</td>
                                <td>${getTypeBadge(log.type)}</td>
                                <td style="font-weight:600;color:${log.quantity > 0 ? '#22c55e' : '#ef4444'};">${log.quantity > 0 ? '+' : ''}${log.quantity}</td>
                                <td>${log.beforeStock}</td>
                                <td>${log.afterStock}</td>
                                <td>${log.orderId || '-'}</td>
                                <td>${log.operator}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>
    `;
}