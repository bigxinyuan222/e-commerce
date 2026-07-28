// 库存数据缓存
let stockData = [];
// 库存日志数据缓存
let stockLogData = [];
let stockInventoryData = [];
let stockSummary = {
    totalStock: 0,
    todayInbound: 0,
    todayOutbound: 0,
    warningSkuCount: 0
};
let stockDashboardError = '';
let stockInventoryError = '';
let stockLogError = '';
let stockInventoryLoading = false;
let currentStockPage = 1;
let currentStockPageSize = 10;
let stockInventoryTotal = 0;

function formatStockSpec(specValues) {
    if (!specValues || typeof specValues !== 'object') return '-';
    const values = Object.entries(specValues)
        .filter(([, value]) => value !== null && value !== undefined && value !== '')
        .map(([name, value]) => `${name}: ${value}`);
    return values.length ? values.join(' / ') : '-';
}

function escapeStockText(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

function mapWarningSku(sku) {
    const stock = Number(sku.stock) || 0;
    const threshold = Number(sku.warning_value) || 0;
    return {
        skuId: Number(sku.sku_id ?? sku.skuId ?? sku.ID ?? sku.id ?? sku.sku?.id) || null,
        id: String(sku.sku_code || ''),
        goodsName: String(sku.product_name || ''),
        spec: formatStockSpec(sku.spec_values),
        stock,
        threshold,
        status: 'warning',
        statusText: String(sku.status || '预警')
    };
}

function mapInventorySku(sku) {
    const stock = Number(sku.stock ?? sku.current_stock) || 0;
    const threshold = Number(sku.warning_value ?? sku.warningValue ?? sku.threshold) || 0;
    return {
        skuId: Number(sku.sku_id ?? sku.skuId ?? sku.ID ?? sku.id ?? sku.sku?.id) || null,
        id: String(sku.sku_code ?? sku.skuCode ?? sku.code ?? sku.id ?? ''),
        goodsName: String(sku.product_name ?? sku.productName ?? sku.goods_name ?? sku.goodsName ?? ''),
        spec: formatStockSpec(sku.spec_values ?? sku.specValues),
        stock,
        threshold,
        status: String(sku.status || '').includes('预警') || stock <= threshold ? 'warning' : 'normal'
    };
}

async function loadStockInventory() {
    stockInventoryLoading = true;
    stockInventoryError = '';
    refreshStockPage();
    try {
        const response = await apiGet(API_CONFIG.inventory.search, {
            page: currentStockPage,
            size: currentStockPageSize,
            keyword: currentStockSearchKeyword
        });
        const dataList = Array.isArray(response)
            ? response
            : response?.list ?? response?.items ?? response?.records ?? response?.inventory_list ?? [];
        stockInventoryData = Array.isArray(dataList) ? dataList.map(mapInventorySku) : [];
        stockInventoryTotal = Number(response?.total ?? response?.total_count ?? response?.count) || stockInventoryData.length;
        currentStockPage = Number(response?.page ?? response?.current_page) || currentStockPage;
        currentStockPageSize = Number(response?.size ?? response?.page_size) || currentStockPageSize;
    } catch (error) {
        stockInventoryData = [];
        stockInventoryTotal = 0;
        stockInventoryError = error.message || '库存列表加载失败';
        console.error('Failed to load inventory list:', error);
    } finally {
        stockInventoryLoading = false;
        refreshStockPage();
    }
}

// 加载库存汇总与日志；任一接口失败时仍保留另一部分可用数据。
async function loadStock() {
    stockDashboardError = '';
    const dashboardRequest = apiGet(API_CONFIG.inventory.dashboard).then(response => {
        const warningList = Array.isArray(response?.warning_sku_list) ? response.warning_sku_list : [];
        stockData = warningList.map(mapWarningSku);
        stockSummary = {
            totalStock: Number(response?.total_stock) || 0,
            todayInbound: Number(response?.today_inbound) || 0,
            todayOutbound: Number(response?.today_outbound) || 0,
            warningSkuCount: Number(response?.warning_sku_count) || warningList.length
        };
    }).catch(error => {
        stockDashboardError = error.message || '库存概览加载失败';
        console.error('Failed to load stock dashboard:', error);
    });

    stockLogError = '';
    const logsRequest = apiGet(API_CONFIG.inventory.logs).then(response => {
        const dataList = Array.isArray(response)
            ? response
            : response?.list ?? response?.items ?? response?.records ?? response?.logs ?? [];
        const typeMap = {
            1: { key: 'out', text: '销售出库' },
            2: { key: 'in', text: '采购入库' },
            3: { key: 'loss', text: '损耗' },
            4: { key: 'surplus', text: '盘盈' },
            5: { key: 'deficit', text: '盘亏' }
        };
        stockLogData = dataList.map(log => ({
            id: log.ID ?? log.id,
            skuId: String(log.sku_code ?? log.skuCode ?? log.sku_id ?? log.skuId ?? ''),
            skuName: String(log.product_name ?? log.productName ?? log.sku_name ?? log.skuName ?? ''),
            spec: formatStockSpec(log.spec_values ?? log.specValues),
            type: typeMap[log.type]?.key ?? log.type ?? 'adjust',
            typeText: log.type_text ?? log.typeText ?? typeMap[log.type]?.text ?? '调整',
            quantity: Number(log.quantity) || 0,
            beforeStock: Number(log.before_stock ?? log.beforeStock) || 0,
            afterStock: Number(log.after_stock ?? log.afterStock) || 0,
            orderId: log.order_id ?? log.orderId ?? null,
            operator: String(log.operator_name ?? log.operatorName ?? log.operator ?? ''),
            reason: String(log.reason ?? ''),
            createTime: log.created_at ?? log.CreatedAt ?? log.createdAt ?? ''
        }));
    }).catch(error => {
        stockLogError = error.message || '库存日志加载失败';
        console.error('Failed to load stock logs:', error);
    });

    const inventoryRequest = loadStockInventory();
    await Promise.allSettled([dashboardRequest, logsRequest, inventoryRequest]);
    refreshStockPage();
}

// 库存筛选条件
let currentStockSearchKeyword = '';        // 库存搜索关键词
let currentStockWarehouseFilter = '总仓';   // 仓库筛选
let currentStockLogTimeFilter = '';         // 日志时间筛选
let currentStockLogSkuFilter = '';          // 日志SKU筛选

// 获取库存状态标签HTML（预警/正常）
function getStatusBadge(status) {
    if (status === 'warning') return '<span class="status-badge red"><span class="dot"></span> 预警</span>';
    return '<span class="status-badge green"><span class="dot"></span> 正常</span>';
}

// 根据当前条件筛选库存列表
function filterStock() {
    return stockInventoryData;
}

// 执行库存搜索（从搜索框获取关键词）
async function searchStock() {
    const input = document.getElementById('stockSearchInput');
    if (input) {
        currentStockSearchKeyword = input.value.trim();
        currentStockPage = 1;
        await loadStockInventory();
    }
}

async function changeStockPage(page) {
    const totalPages = Math.max(1, Math.ceil(stockInventoryTotal / currentStockPageSize));
    const nextPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
    if (nextPage === currentStockPage || stockInventoryLoading) return;
    currentStockPage = nextPage;
    await loadStockInventory();
}

// 切换仓库筛选
function switchStockWarehouse(warehouse) {
    currentStockWarehouseFilter = warehouse;
    refreshStockPage();
}

// 根据当前条件筛选库存日志
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

// 设置库存日志筛选条件
function setStockLogFilter(type, value) {
    if (type === 'time') {
        currentStockLogTimeFilter = value;
    } else if (type === 'sku') {
        currentStockLogSkuFilter = value;
    }
    refreshStockPage();
}

// 获取库存操作类型标签HTML
function getTypeBadge(type) {
    const colors = { in: 'green', out: 'yellow', loss: 'red', surplus: 'green', deficit: 'red', adjust: 'blue' };
    const texts = { in: '采购入库', out: '销售出库', loss: '损耗', surplus: '盘盈', deficit: '盘亏', adjust: '调整' };
    const color = colors[type] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[type] || type}</span>`;
}

// 获取库存预警列表（库存低于阈值）
function getWarningList() {
    return stockData.filter(s => s.stock <= s.threshold);
}

async function handleStockAdjust(payload) {
    await apiPost(API_CONFIG.inventory.update, payload);
    closeStockModal();
    await loadStock();
    showToast('库存调整成功，数据已刷新', 'success');
}

function showStockAdjustModal(sku) {
    selectedSku = sku;
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
                    <div class="type-radio-group stock-type-grid">
                        <label class="type-radio-option selected" onclick="selectStockType(this, 2)">
                            <input type="radio" name="stockType" value="2" checked />
                            <div class="option-title success-color">采购入库</div>
                            <div class="option-desc">类型 2 · 增加</div>
                        </label>
                        <label class="type-radio-option" onclick="selectStockType(this, 1)">
                            <input type="radio" name="stockType" value="1" />
                            <div class="option-title warn-color">销售出库</div>
                            <div class="option-desc">类型 1 · 减少</div>
                        </label>
                        <label class="type-radio-option" onclick="selectStockType(this, 3)">
                            <input type="radio" name="stockType" value="3" />
                            <div class="option-title warn-color">损耗</div>
                            <div class="option-desc">类型 3 · 减少</div>
                        </label>
                        <label class="type-radio-option" onclick="selectStockType(this, 4)">
                            <input type="radio" name="stockType" value="4" />
                            <div class="option-title success-color">盘盈</div>
                            <div class="option-desc">类型 4 · 增加</div>
                        </label>
                        <label class="type-radio-option" onclick="selectStockType(this, 5)">
                            <input type="radio" name="stockType" value="5" />
                            <div class="option-title warn-color">盘亏</div>
                            <div class="option-desc">类型 5 · 减少</div>
                        </label>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label class="form-label">调整商品</label>
                    <div id="selectedSkuInfo" class="selected-sku-info stock-selected-sku" style="display:block;">
                        <div class="sku-name" id="selectedSkuName">${escapeStockText(sku.goodsName)} - ${escapeStockText(sku.spec)}</div>
                        <div class="sku-code">${escapeStockText(sku.id)}</div>
                        <div class="sku-stock" id="selectedSkuStock">SKU ID: ${sku.skuId} · 当前库存: ${sku.stock}件</div>
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
                    <div class="quantity-hint">填写正整数，系统会根据调整类型自动设置增减方向</div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <label class="form-label">调整原因</label>
                    <textarea id="stockReason" rows="2" placeholder="请填写调整原因..." class="form-textarea"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeStockModal()">取消</button>
                <button id="stockAdjustSubmit" class="btn btn-primary" onclick="submitStockAdjust()"><i class="fas fa-save"></i> 确认调整</button>
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

async function resolveStockSku(skuCode) {
    const cachedSku = stockInventoryData.find(item => item.id === skuCode && item.skuId);
    if (cachedSku) return cachedSku;

    const response = await apiGet(API_CONFIG.inventory.search, { page: 1, size: 10, keyword: skuCode });
    const dataList = Array.isArray(response)
        ? response
        : response?.list ?? response?.items ?? response?.records ?? response?.inventory_list ?? [];
    const matches = Array.isArray(dataList) ? dataList.map(mapInventorySku) : [];
    const exactMatch = matches.find(item => item.id === skuCode) ?? matches[0];
    if (exactMatch) {
        stockInventoryData = [exactMatch, ...stockInventoryData.filter(item => item.id !== exactMatch.id)];
        return exactMatch;
    }
    return stockData.find(item => item.id === skuCode) ?? null;
}

function adjustQuantity(delta) {
    const input = document.getElementById('stockQuantity');
    const current = parseInt(input.value) || 0;
    input.value = Math.max(1, current + delta);
}

async function submitStockAdjust() {
    if (!selectedSku) {
        showToast('请选择要调整的SKU', 'error');
        return;
    }
    
    if (!Number.isInteger(selectedSku.skuId) || selectedSku.skuId <= 0) {
        showToast('当前 SKU 缺少有效的数字 ID，请从库存列表中选择后重试', 'error');
        return;
    }

    const type = Number(document.querySelector('[name="stockType"]:checked').value);
    const quantity = Math.abs(parseInt(document.getElementById('stockQuantity').value) || 0);
    const reason = document.getElementById('stockReason').value.trim();
    
    if (quantity <= 0) {
        showToast('调整数量必须大于0', 'error');
        return;
    }
    
    if (!reason) {
        showToast('请填写调整原因', 'error');
        return;
    }
    
    const decreaseTypes = [1, 3, 5];
    const actualQuantity = decreaseTypes.includes(type) ? -quantity : quantity;
    if (selectedSku.stock + actualQuantity < 0) {
        showToast('调整后库存不能为负数', 'error');
        return;
    }

    const submitButton = document.getElementById('stockAdjustSubmit');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中';
    }
    try {
        await handleStockAdjust({
            sku_id: selectedSku.skuId,
            type,
            quantity: actualQuantity,
            reason
        });
    } catch (error) {
        console.error('Failed to adjust inventory:', error);
        showToast(error.message || '库存调整失败', 'error');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-save"></i> 确认调整';
        }
    }
}

function closeStockModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
    selectedSku = null;
}

async function showStockReplenish(encodedSkuId) {
    const skuId = decodeURIComponent(encodedSkuId);
    try {
        const sku = await resolveStockSku(skuId);
        if (!sku || !sku.skuId) {
            showToast('未找到该商品对应的有效 SKU', 'error');
            return;
        }
        showStockAdjustModal(sku);
    } catch (error) {
        showToast(error.message || 'SKU 信息加载失败', 'error');
    }
}

function refreshStockPage() {
    const panel = document.getElementById('panel-stock');
    if (panel) panel.innerHTML = stockPage();
}

function stockPage() {
    const warningList = getWarningList();
    const totalStockPages = Math.max(1, Math.ceil(stockInventoryTotal / currentStockPageSize));
    
    return `
        <div class="flex-between mb-4">
            <div class="stock-page-header">
                <span class="stock-warehouse-label">总仓</span>
            </div>
        </div>
        
        <div class="stats-grid stats-row-4">
            <div class="stat-card"><div class="label"><i class="fas fa-boxes"></i> 当前总库存</div><div class="value">${stockSummary.totalStock.toLocaleString()}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-exclamation-triangle"></i> 低于阈值预警</div><div class="value" style="color:#ef4444;">${stockSummary.warningSkuCount.toLocaleString()}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-arrow-down"></i> 今日入库</div><div class="value">${stockSummary.todayInbound.toLocaleString()}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-arrow-up"></i> 今日出库</div><div class="value">${stockSummary.todayOutbound.toLocaleString()}</div></div>
        </div>

        ${stockDashboardError ? `<div class="stock-dashboard-error"><i class="fas fa-exclamation-circle"></i> ${escapeStockText(stockDashboardError)}</div>` : ''}
        
        <div class="card warning-card">
            <div class="card-header"><span class="card-title"><i class="fas fa-exclamation-triangle"></i> 低库存预警</span><span class="status-badge red"><span class="dot"></span> 低于预警阈值</span></div>
            <div class="card-body">
                ${warningList.length > 0 ? `<div class="grid-auto-fill">
                    ${warningList.map(sku => `
                        <div class="warning-item">
                            <div class="item-header">${escapeStockText(sku.id)} · ${escapeStockText(sku.goodsName)}</div>
                            <div class="item-spec">规格: ${escapeStockText(sku.spec)}</div>
                            <div class="item-stats">
                                <span>当前库存</span>
                                <span class="stat-value">${sku.stock}件</span>
                            </div>
                            <div class="item-stats">
                                <span>预警阈值</span>
                                <span class="stat-threshold">${sku.threshold}件</span>
                            </div>
                            <button class="btn btn-sm btn-primary warning-replenish-btn" onclick="showStockReplenish('${encodeURIComponent(sku.id)}')"><i class="fas fa-plus"></i> 补货</button>
                        </div>
                    `).join('')}
                </div>` : `<div class="stock-warning-empty"><i class="fas fa-check-circle"></i><span>暂无低库存预警</span></div>`}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-list"></i> 库存查询 · 按 SKU</span>
                <div style="display:flex;align-items:center;gap:8px;">
                    <input id="stockSearchInput" placeholder="输入 SKU 或商品名称" value="${escapeStockText(currentStockSearchKeyword)}" onkeypress="if(event.key==='Enter') searchStock()" class="form-inline-input stock-search-input" />
                    <button class="btn btn-sm btn-primary" onclick="searchStock()"><i class="fas fa-search"></i> 查询</button>
                    <span class="stock-list-total">共 ${stockInventoryTotal.toLocaleString()} 条</span>
                </div>
            </div>
            <div class="card-body no-pad">
                ${stockInventoryError ? `<div class="stock-list-error"><i class="fas fa-exclamation-circle"></i> ${escapeStockText(stockInventoryError)}</div>` : ''}
                <div class="table-wrap"><table>
                    <thead><tr><th>SKU</th><th>商品</th><th>规格</th><th>当前库存</th><th>预警阈值</th><th>状态</th><th>操作</th></tr></thead>
                    <tbody>
                        ${stockInventoryLoading ? `<tr><td colspan="7"><div class="stock-table-state"><i class="fas fa-spinner fa-spin"></i> 正在加载库存...</div></td></tr>` : filterStock().length === 0 ? `<tr><td colspan="7"><div class="stock-table-state"><i class="fas fa-inbox"></i> 暂无库存数据</div></td></tr>` : filterStock().map(sku => `
                            <tr>
                                <td>${escapeStockText(sku.id)}</td>
                                <td>${escapeStockText(sku.goodsName)}</td>
                                <td>${escapeStockText(sku.spec)}</td>
                                <td>${sku.stock}</td>
                                <td>${sku.threshold}</td>
                                <td>${getStatusBadge(sku.status)}</td>
                                <td><button class="btn btn-sm btn-outline" onclick="showStockReplenish('${encodeURIComponent(sku.id)}')">调整</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
                <div class="stock-pagination">
                    <span>第 ${currentStockPage} / ${totalStockPages} 页</span>
                    <div class="stock-pagination-actions">
                        <button class="btn btn-sm btn-outline" onclick="changeStockPage(${currentStockPage - 1})" ${currentStockPage <= 1 || stockInventoryLoading ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> 上一页</button>
                        <button class="btn btn-sm btn-outline" onclick="changeStockPage(${currentStockPage + 1})" ${currentStockPage >= totalStockPages || stockInventoryLoading ? 'disabled' : ''}>下一页 <i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
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
                ${stockLogError ? `<div class="stock-list-error"><i class="fas fa-exclamation-circle"></i> ${escapeStockText(stockLogError)}</div>` : ''}
                <div class="table-wrap"><table>
                    <thead><tr><th>时间</th><th>SKU / 商品</th><th>类型</th><th>变动数量</th><th>变动前库存</th><th>变动后库存</th><th>原因</th><th>关联订单</th><th>操作人</th></tr></thead>
                    <tbody>
                        ${filterStockLog().length === 0 ? `<tr><td colspan="9"><div class="stock-table-state"><i class="fas fa-inbox"></i> 暂无出入库记录</div></td></tr>` : filterStockLog().map(log => `
                            <tr>
                                <td>${escapeStockText(log.createTime)}</td>
                                <td><div>${escapeStockText(log.skuId)} · ${escapeStockText(log.skuName)}</div><div class="stock-log-spec">${escapeStockText(log.spec)}</div></td>
                                <td>${getTypeBadge(log.type)}</td>
                                <td style="font-weight:600;color:${log.quantity > 0 ? '#22c55e' : '#ef4444'};">${log.quantity > 0 ? '+' : ''}${log.quantity}</td>
                                <td>${log.beforeStock}</td>
                                <td>${log.afterStock}</td>
                                <td>${escapeStockText(log.reason || '-')}</td>
                                <td>${escapeStockText(log.orderId || '-')}</td>
                                <td>${escapeStockText(log.operator || '-')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>
    `;
}
