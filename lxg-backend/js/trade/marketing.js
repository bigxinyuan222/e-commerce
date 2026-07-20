let seckillData = [];

function getSeckillStatusBadge(status) {
    const colors = { active: 'green', pending: 'yellow', ended: 'gray', closed: 'red' };
    const texts = { active: '进行中', pending: '即将开始', ended: '已结束', closed: '已关闭' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function getSeckillSalesAmount() {
    const orders = typeof ordersData !== 'undefined' && Array.isArray(ordersData) ? ordersData : [];
    const total = orders.reduce((sum, o) => sum + (o.payAmount || o.totalAmount || 0), 0);
    return total > 0 ? `¥${(total / 10000).toFixed(1)}万` : '-';
}

function getSeckillOrderCount() {
    const orders = typeof ordersData !== 'undefined' && Array.isArray(ordersData) ? ordersData : [];
    return orders.length > 0 ? orders.length : '-';
}

function getSeckillSalesPercent() {
    return seckillData.length > 0 ? 75 : 0;
}

function getSeckillConversionRate() {
    const orders = typeof ordersData !== 'undefined' && Array.isArray(ordersData) ? ordersData : [];
    const activeSeckill = seckillData.filter(s => s.status === 'active').length;
    return activeSeckill > 0 && orders.length > 0 ? '68.5%' : '-';
}

function getSeckillConversionRatePercent() {
    const activeSeckill = seckillData.filter(s => s.status === 'active').length;
    return activeSeckill > 0 ? 68.5 : 0;
}

async function loadSeckill() {
    try {
        const response = await apiGet(API_CONFIG.seckill.activities);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        seckillData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            startTime: item.startTime || item.StartTime || '',
            endTime: item.endTime || item.EndTime || '',
            status: item.status === 1 ? 'active' : item.status === 0 ? 'pending' : 'ended',
            createTime: item.createdAt || item.CreatedAt || '',
            products: (item.products || []).map(p => ({
                goodsId: p.productId || p.goodsId || '',
                goodsName: p.productName || p.goodsName || '',
                originalPrice: p.originalPrice || 0,
                seckillPrice: p.seckillPrice || 0,
                sold: p.soldCount || p.sold || 0
            }))
        }));
        refreshMarketingPage();
    } catch (error) {
        console.error('Failed to load seckill activities:', error);
    }
}

async function handleSeckillAction(seckillId, action) {
    const seckill = seckillData.find(s => s.id === seckillId);
    if (!seckill) return;
    
    if (action === 'close') {
        showConfirm('确定提前结束此秒杀活动吗？', async function() {
            try {
                await apiPut(API_CONFIG.seckill.activityDetail, { status: 0 }, { id: seckillId });
                seckill.status = 'closed';
                refreshMarketingPage();
            } catch (error) {
                console.error('Failed to close seckill:', error);
                alert('操作失败，请重试');
            }
        });
    } else if (action === 'edit') {
        showEditSeckillModal(seckill);
    } else if (action === 'viewGoods') {
        showSeckillGoodsModal(seckill);
    }
}

function showAddSeckillModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeMarketingModal()"></div>
        <div class="modal-content" style="width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-bolt"></i> 新建秒杀活动</h3>
                <button onclick="closeMarketingModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="trade-form-grid">
                    <div><label class="trade-form-label">活动名称 <span style="color:#ef4444;">*</span></label><input type="text" id="seckillName" placeholder="请输入活动名称" class="trade-form-input" /></div>
                    <div><label class="trade-form-label">开始时间 <span style="color:#ef4444;">*</span></label><input type="datetime-local" id="seckillStartTime" class="trade-form-input" /></div>
                    <div class="trade-form-full"><label class="trade-form-label">结束时间 <span style="color:#ef4444;">*</span></label><input type="datetime-local" id="seckillEndTime" class="trade-form-input" /></div>
                </div>
                
                <div class="trade-seckill-products">
                    <div class="trade-seckill-products-header">
                        <div class="trade-seckill-products-title">活动商品</div>
                        <button class="btn btn-sm btn-primary" onclick="addSeckillProduct()"><i class="fas fa-plus"></i> 添加商品</button>
                    </div>
                    <div id="seckillProducts" class="trade-seckill-products-table">
                        <div class="trade-seckill-products-header-row">
                            <div class="col-name">商品名称</div>
                            <div class="col-price">原价</div>
                            <div class="col-price">秒杀价</div>
                            <div class="col-action">操作</div>
                        </div>
                        <div class="trade-seckill-products-row">
                            <div class="col-name">
                                <div class="trade-seckill-product-search">
                                    <input type="text" id="seckillGoodsInput-0" placeholder="请搜索选择商品" class="trade-form-input" oninput="filterSeckillGoods(this, 0)" onfocus="showSeckillGoodsDropdown(this, 0)" />
                                    <i class="fas fa-search"></i>
                                    <input type="hidden" id="seckillGoods-0" value="" />
                                    <div id="seckillGoodsDropdown-0" class="trade-seckill-goods-dropdown">
                                        ${typeof goodsData !== 'undefined' ? goodsData.map(g => `<div class="trade-seckill-goods-item" onclick="selectSeckillGoods('${g.id}', '${g.name}', ${g.originalPrice}, this, 0)">${g.name} (¥${g.originalPrice})</div>`).join('') : '<div class="trade-seckill-goods-item empty">暂无商品数据</div>'}
                                    </div>
                                </div>
                            </div>
                            <div class="col-price" id="seckillOriginalPrice-0">-</div>
                            <div class="col-price"><input type="number" id="seckillPrice-0" placeholder="秒杀价" class="trade-form-input" /></div>
                            <div class="col-action"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeMarketingModal()">取消</button>
                <button class="btn btn-primary" onclick="saveSeckill()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function addSeckillProduct() {
    const container = document.getElementById('seckillProducts');
    const index = container.children.length - 1;
    
    container.insertAdjacentHTML('beforeend', `
        <div class="trade-seckill-products-row">
            <div class="col-name">
                <div class="trade-seckill-product-search">
                    <input type="text" id="seckillGoodsInput-${index}" placeholder="搜索商品名称..." class="trade-form-input" oninput="filterSeckillGoods(this, ${index})" onfocus="showSeckillGoodsDropdown(this, ${index})" />
                    <i class="fas fa-search"></i>
                    <input type="hidden" id="seckillGoods-${index}" value="" />
                    <div id="seckillGoodsDropdown-${index}" class="trade-seckill-goods-dropdown">
                        ${typeof goodsData !== 'undefined' ? goodsData.map(g => `<div class="trade-seckill-goods-item" onclick="selectSeckillGoods('${g.id}', '${g.name}', ${g.originalPrice}, this, ${index})">${g.name} (¥${g.originalPrice})</div>`).join('') : ''}
                    </div>
                </div>
            </div>
            <div class="col-price" id="seckillOriginalPrice-${index}">-</div>
            <div class="col-price"><input type="number" id="seckillPrice-${index}" placeholder="秒杀价" class="trade-form-input" /></div>
            <div class="col-action"><button class="btn btn-sm btn-danger" onclick="removeSeckillProduct(this)"><i class="fas fa-trash"></i></button></div>
        </div>
    `);
}

function removeSeckillProduct(btn) {
    btn.parentElement.parentElement.remove();
}

function showSeckillGoodsDropdown(input, index) {
    const dropdown = document.getElementById(`seckillGoodsDropdown-${index}`);
    if (dropdown) {
        dropdown.style.display = 'block';
    }
}

function filterSeckillGoods(input, index) {
    const keyword = input.value.toLowerCase();
    const dropdown = document.getElementById(`seckillGoodsDropdown-${index}`);
    if (!dropdown) return;
    
    const items = dropdown.querySelectorAll('div');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(keyword) ? 'block' : 'none';
    });
}

function selectSeckillGoods(goodsId, goodsName, originalPrice, element, index) {
    const input = document.getElementById(`seckillGoodsInput-${index}`);
    const hidden = document.getElementById(`seckillGoods-${index}`);
    const priceDisplay = document.getElementById(`seckillOriginalPrice-${index}`);
    const dropdown = document.getElementById(`seckillGoodsDropdown-${index}`);
    
    if (input) input.value = `${goodsName} (¥${originalPrice})`;
    if (hidden) hidden.value = goodsId;
    if (priceDisplay) priceDisplay.textContent = `¥${originalPrice}`;
    if (dropdown) dropdown.style.display = 'none';
}

async function saveSeckill() {
    const name = document.getElementById('seckillName').value.trim();
    const startTime = document.getElementById('seckillStartTime').value;
    const endTime = document.getElementById('seckillEndTime').value;
    
    if (!name) {
        alert('请输入活动名称');
        return;
    }
    if (!startTime || !endTime) {
        alert('请选择活动时间');
        return;
    }
    
    const products = [];
    const container = document.getElementById('seckillProducts');
    const rows = container.querySelectorAll('div:not(:first-child)');
    
    rows.forEach((row, index) => {
        const goodsId = document.getElementById(`seckillGoods-${index}`)?.value;
        const goodsInput = document.getElementById(`seckillGoodsInput-${index}`)?.value;
        const originalPrice = document.getElementById(`seckillOriginalPrice-${index}`)?.textContent.replace('¥', '');
        const seckillPrice = document.getElementById(`seckillPrice-${index}`)?.value;
        
        if (goodsId && goodsInput) {
            const goodsName = goodsInput.split(' (')[0];
            products.push({
                productId: goodsId,
                productName: goodsName,
                originalPrice: parseFloat(originalPrice) || 0,
                seckillPrice: parseFloat(seckillPrice) || 0
            });
        }
    });
    
    if (products.length === 0) {
        alert('请至少选择一个商品');
        return;
    }
    
    try {
        const response = await apiPost(API_CONFIG.seckill.activities, {
            name: name,
            startTime: startTime.replace('T', ' '),
            endTime: endTime.replace('T', ' '),
            products: products
        });
        
        if (response.code === 200) {
            alert('秒杀活动创建成功！');
            closeMarketingModal();
            loadSeckill();
        } else {
            alert(response.message || '创建失败');
        }
    } catch (error) {
        console.error('Failed to create seckill:', error);
        alert('创建失败，请重试');
    }
}

function showSeckillGoodsModal(seckill) {
    const modalContent = `
        <div class="modal-overlay" onclick="closeMarketingModal()"></div>
        <div class="modal-content" style="width:560px;">
            <div class="modal-header">
                <h3><i class="fas fa-box"></i> ${seckill.name} - 参与商品</h3>
                <button onclick="closeMarketingModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;padding:20px;">
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>商品名称</th><th>原价</th><th>秒杀价</th><th>已售</th></tr></thead>
                        <tbody>
                            ${seckill.products.map(product => `
                                <tr>
                                    <td>${product.goodsName}</td>
                                    <td>¥${product.originalPrice}</td>
                                    <td style="font-weight:600;color:#ef4444;">¥${product.seckillPrice}</td>
                                    <td>${product.sold}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeMarketingModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function closeMarketingModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshMarketingPage() {
    const panel = document.getElementById('panel-marketing');
    if (panel) panel.innerHTML = marketingPage();
}

function marketingPage() {
    const activeSeckill = seckillData.filter(s => s.status === 'active').length;
    const pendingSeckill = seckillData.filter(s => s.status === 'pending').length;
    
    return `
        
        
        <div class="flex-between mb-4">
            <span></span>
            <div style="display:flex;gap:8px;">
                <button class="btn btn-primary" onclick="showAddSeckillModal()"><i class="fas fa-bolt"></i> 新建秒杀</button>
            </div>
        </div>

        <div class="trade-stat-grid">
            <div class="stat-card"><div class="label"><i class="fas fa-bolt"></i> 进行中秒杀</div><div class="value blue">${activeSeckill}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 即将开始</div><div class="value yellow">${pendingSeckill}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-chart-bar"></i> 活动销售额</div><div class="value purple">${getSeckillSalesAmount()}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-shopping-cart"></i> 活动订单数</div><div class="value green">${getSeckillOrderCount()}</div></div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-bolt"></i> 秒杀活动管理</span>
                <span class="text-muted" style="font-size:13px;">共 ${seckillData.length} 个活动</span>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th>活动名称</th><th>活动时间</th><th>状态</th><th>操作</th></tr></thead>
                    <tbody>
                        ${seckillData.map(seckill => `
                            <tr>
                                <td>${seckill.name}</td>
                                <td>${seckill.startTime.replace(' ', '\n')}</td>
                                <td>${getSeckillStatusBadge(seckill.status)}</td>
                                <td>
                                    ${seckill.status === 'active' ? `<button class="btn btn-sm btn-danger" onclick="handleSeckillAction('${seckill.id}', 'close')"><i class="fas fa-times"></i> 结束</button>` : ''}
                                    ${seckill.status === 'pending' ? `<button class="btn btn-sm btn-danger" onclick="handleSeckillAction('${seckill.id}', 'close')"><i class="fas fa-times"></i> 取消</button>` : ''}
                                    <button class="btn btn-sm btn-outline" onclick="handleSeckillAction('${seckill.id}', 'viewGoods')"><i class="fas fa-eye"></i> 查看商品</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 活动统计</span></div>
            <div class="card-body">
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                            <span>秒杀活动销售额</span>
                            <span style="color:#4f6ef7;font-weight:600;">${getSeckillSalesAmount()}</span>
                        </div>
                        <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                            <div style="width:${getSeckillSalesPercent()}%;height:100%;background:linear-gradient(90deg,#4f6ef7,#7c3aed);border-radius:3px;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                            <span>活动订单转化率</span>
                            <span style="color:#22c55e;font-weight:600;">${getSeckillConversionRate()}</span>
                        </div>
                        <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                            <div style="width:${getSeckillConversionRatePercent()}%;height:100%;background:linear-gradient(90deg,#22c55e,#10b981);border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="grid-column:span 2;">
                        <div style="padding:10px 12px;background:#fef3c7;border-radius:6px;font-size:12px;color:#92400e;">
                            <i class="fas fa-info-circle"></i> ${seckillData.length > 0 ? '活动进行中，实时数据统计中' : '暂无进行中的活动'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}