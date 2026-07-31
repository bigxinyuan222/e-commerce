let stockData = [];
let stockLogData = [];

async function loadStock() {
    try {
        const response = await apiGet(API_CONFIG.inventory.logs);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        stockLogData = dataList.map(log => ({
            id: log.ID || log.id,
            skuId: log.skuId || '',
            skuName: log.skuName || '',
            type: log.type || 'adjust',
            typeText: log.typeText || '调整',
            quantity: log.quantity || 0,
            beforeStock: log.beforeStock || 0,
            afterStock: log.afterStock || 0,
            orderId: log.orderId || null,
            operator: log.operator || '',
            createTime: log.CreatedAt || log.createdAt || ''
        }));
        refreshStockPage();
    } catch (error) {
        console.error('Failed to load stock logs:', error);
    }
}

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
        showToast('调整后库存不能为负数！', 'error');
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
    
    showToast(`库存调整成功！调整前：${beforeStock}件，调整后：${newStock}件`, 'success');
    refreshStockPage();
}

function showStockAdjustModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeStockModal()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 手动调整库存</h3>
                <button onclick="closeStockModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom:16px;">
                    <label class="form-label">调整类型</label>
                    <div class="type-radio-group">
                        <label class="type-radio-option selected" onclick="selectStockType(this, 'in')">
                            <input type="radio" name="stockType" value="in" checked />
                            <div class="option-title" style="color:#22c55e;">采购入库</div>
                            <div class="option-desc">增加库存</div>
                        </label>
                        <label class="type-radio-option" onclick="selectStockType(this, 'loss')">
                            <input type="radio" name="stockType" value="loss" />
                            <div class="option-title" style="color:#ef4444;">损耗</div>
                            <div class="option-desc">减少库存</div>
                        </label>
                        <label class="type-radio-option" onclick="selectStockType(this, 'adjust')">
                            <input type="radio" name="stockType" value="adjust" />
                            <div class="option-title" style="color:#4f6ef7;">盘盈/盘亏</div>
                            <div class="option-desc">盘点调整</div>
                        </label>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label class="form-label">选择SKU</label>
                    <input type="text" id="skuSearchInput" placeholder="搜索SKU编码或商品名称" class="form-input" oninput="searchSku()" />
                    <div id="skuSearchResult" class="sku-search-result"></div>
                    <div id="selectedSkuInfo" class="selected-sku-info">
                        <div class="sku-name" id="selectedSkuName"></div>
                        <div class="sku-stock" id="selectedSkuStock"></div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label class="form-label">调整数量</label>
                    <div class="quantity-adjust-group">
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(-10)"><i class="fas fa-minus"></i></button>
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(-1)"><i class="fas fa-minus"></i></button>
                        <input type="number" id="stockQuantity" value="10" class="quantity-input" />
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(1)"><i class="fas fa-plus"></i></button>
                        <button class="btn btn-outline btn-sm" onclick="adjustQuantity(10)"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="quantity-hint">正数代表增加库存，负数代表减少库存</div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label class="form-label">调整原因</label>
                    <textarea id="stockReason" rows="2" placeholder="请填写调整原因..." class="form-textarea"></textarea>
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
            label.classList.add('selected');
        } else {
            label.classList.remove('selected');
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
            <div class="sku-search-item" onclick="selectSku('${sku.id}', '${sku.goodsName}', '${sku.spec}', ${sku.stock})">
                <div class="item-name">${sku.id} - ${sku.goodsName}</div>
                <div class="item-detail">规格: ${sku.spec} · 当前库存: ${sku.stock}</div>
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
        showToast('请选择要调整的SKU', 'error');
        return;
    }
    
    const type = document.querySelector('[name="stockType"]:checked').value;
    const quantity = parseInt(document.getElementById('stockQuantity').value) || 0;
    const reason = document.getElementById('stockReason').value.trim();
    
    if (quantity <= 0) {
        showToast('调整数量必须大于0', 'error');
        return;
    }
    
    if (!reason) {
        showToast('请填写调整原因', 'error');
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
        <div class="flex-between mb-4">
            <div class="stock-page-header">
                <span class="stock-warehouse-label">总仓</span>
            </div>
            <button class="btn btn-primary" onclick="showStockAdjustModal()"><i class="fas fa-plus"></i> 库存调整</button>
        </div>
        
        <div class="stats-grid stats-row-4">
            <div class="stat-card"><div class="label"><i class="fas fa-boxes"></i> 当前总库存</div><div class="value">${stockData.reduce((sum, s) => sum + s.stock, 0).toLocaleString()}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-exclamation-triangle"></i> 低于阈值预警</div><div class="value" style="color:#ef4444;">${warningList.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-arrow-down"></i> 今日入库</div><div class="value">${stockLogData.filter(l => l.type === 'in' && l.createTime.includes('2026-06-25')).reduce((sum, l) => sum + l.quantity, 0)}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-arrow-up"></i> 今日出库</div><div class="value">${Math.abs(stockLogData.filter(l => l.type === 'out' && l.createTime.includes('2026-06-25')).reduce((sum, l) => sum + l.quantity, 0))}</div></div>
        </div>
        
        ${warningList.length > 0 ? `
        <div class="card warning-card">
            <div class="card-header"><span class="card-title"><i class="fas fa-exclamation-triangle"></i> 低库存预警</span><span class="status-badge red"><span class="dot"></span> 预警阈值 ≤ 50</span></div>
            <div class="card-body">
                <div class="grid-auto-fill">
                    ${warningList.map(sku => `
                        <div class="warning-item">
                            <div class="item-header">${sku.id} · ${sku.goodsName}</div>
                            <div class="item-spec">规格: ${sku.spec}</div>
                            <div class="item-stats">
                                <span>当前库存</span>
                                <span class="stat-value">${sku.stock}件</span>
                            </div>
                            <div class="item-stats">
                                <span>预警阈值</span>
                                <span class="stat-threshold">${sku.threshold}件</span>
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
                    <input id="stockSearchInput" placeholder="按 SKU 查询" value="${currentStockSearchKeyword}" onkeypress="if(event.key==='Enter') searchStock()" class="form-inline-input" />
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
                    <input id="stockLogSkuInput" placeholder="按 SKU 筛选" value="${currentStockLogSkuFilter}" onkeypress="if(event.key==='Enter') setStockLogFilter('sku', this.value)" class="form-inline-input" style="width:120px;" />
                    <input type="date" id="stockLogDateInput" value="${currentStockLogTimeFilter}" onchange="setStockLogFilter('time', this.value)" class="form-inline-input" style="width:auto;" />
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