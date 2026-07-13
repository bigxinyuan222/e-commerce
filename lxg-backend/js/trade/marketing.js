let seckillData = [
    { id: 'seckill-001', name: '618限时秒杀', startTime: '2026-06-18 10:00', endTime: '2026-06-18 22:00', status: 'active', createTime: '2026-06-15', products: [{ goodsId: 'goods-001', goodsName: '无线蓝牙耳机 Pro', originalPrice: 299, seckillPrice: 199, sold: 380 }] },
    { id: 'seckill-002', name: '夏日清凉秒杀', startTime: '2026-06-25 10:00', endTime: '2026-06-25 22:00', status: 'active', createTime: '2026-06-23', products: [{ goodsId: 'goods-003', goodsName: '便携移动电源', originalPrice: 159, seckillPrice: 99, sold: 125 }] },
    { id: 'seckill-003', name: '数码狂欢夜', startTime: '2026-06-30 20:00', endTime: '2026-06-30 24:00', status: 'pending', createTime: '2026-06-28', products: [{ goodsId: 'goods-002', goodsName: '智能手表 S8', originalPrice: 1299, seckillPrice: 999, sold: 0 }] },
    { id: 'seckill-004', name: '会员专享秒杀', startTime: '2026-06-26 10:00', endTime: '2026-06-26 12:00', status: 'pending', createTime: '2026-06-24', products: [{ goodsId: 'goods-004', goodsName: '智能台灯 Pro', originalPrice: 199, seckillPrice: 149, sold: 0 }] }
];

function getSeckillStatusBadge(status) {
    const colors = { active: 'green', pending: 'yellow', ended: 'gray', closed: 'red' };
    const texts = { active: '进行中', pending: '即将开始', ended: '已结束', closed: '已关闭' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function handleSeckillAction(seckillId, action) {
    const seckill = seckillData.find(s => s.id === seckillId);
    if (!seckill) return;
    
    if (action === 'close') {
        showConfirm('确定提前结束此秒杀活动吗？', function() {
            seckill.status = 'closed';
            refreshMarketingPage();
        });
    } else if (action === 'edit') {
        showEditSeckillModal(seckill);
    } else if (action === 'viewGoods') {
        showSeckillGoodsModal(seckill);
    }
}

function showAddSeckillModal() {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeMarketingModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-bolt"></i> 新建秒杀活动</h3>
                <button onclick="closeMarketingModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">活动名称 <span style="color:#ef4444;">*</span></label><input type="text" id="seckillName" placeholder="请输入活动名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">开始时间 <span style="color:#ef4444;">*</span></label><input type="datetime-local" id="seckillStartTime" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">结束时间 <span style="color:#ef4444;">*</span></label><input type="datetime-local" id="seckillEndTime" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                </div>
                
                <div style="margin-top:16px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <div style="font-weight:600;font-size:14px;">活动商品</div>
                        <button class="btn btn-sm btn-primary" onclick="addSeckillProduct()"><i class="fas fa-plus"></i> 添加商品</button>
                    </div>
                    <div id="seckillProducts" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                        <div style="display:flex;padding:10px 12px;background:#fafbfc;font-size:12px;font-weight:600;color:#64748b;">
                            <div style="flex:2;">商品名称</div>
                            <div style="width:100px;text-align:right;">原价</div>
                            <div style="width:100px;text-align:right;">秒杀价</div>
                            <div style="width:60px;">操作</div>
                        </div>
                        <div style="display:flex;padding:10px 12px;border-bottom:1px solid #f1f4f9;align-items:center;">
                            <div style="flex:2;">
                                <div style="position:relative;">
                                    <input type="text" id="seckillGoodsInput-0" value="无线蓝牙耳机 Pro (¥299)" style="width:100%;padding:6px 30px 6px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;outline:none;" oninput="filterSeckillGoods(this, 0)" onfocus="showSeckillGoodsDropdown(this, 0)" />
                                    <i class="fas fa-search" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:12px;"></i>
                                    <input type="hidden" id="seckillGoods-0" value="goods-001" />
                                    <div id="seckillGoodsDropdown-0" class="seckill-goods-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #e2e8f0;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.1);z-index:100;max-height:200px;overflow-y:auto;">
                                        ${typeof goodsData !== 'undefined' ? goodsData.map(g => `<div style="padding:6px 10px;cursor:pointer;font-size:12px;color:#334155;" onmouseover="this.style.background='#f8fafc'" onclick="selectSeckillGoods('${g.id}', '${g.name}', ${g.originalPrice}, this, 0)">${g.name} (¥${g.originalPrice})</div>`).join('') : ''}
                                    </div>
                                </div>
                            </div>
                            <div style="width:100px;text-align:right;font-weight:600;" id="seckillOriginalPrice-0">¥299</div>
                            <div style="width:100px;"><input type="number" id="seckillPrice-0" value="199" style="width:100%;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;text-align:right;" /></div>
                            <div style="width:60px;"></div>
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
        <div style="display:flex;padding:10px 12px;border-bottom:1px solid #f1f4f9;align-items:center;">
            <div style="flex:2;">
                <div style="position:relative;">
                    <input type="text" id="seckillGoodsInput-${index}" placeholder="搜索商品名称..." style="width:100%;padding:6px 30px 6px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;outline:none;" oninput="filterSeckillGoods(this, ${index})" onfocus="showSeckillGoodsDropdown(this, ${index})" />
                    <i class="fas fa-search" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:12px;"></i>
                    <input type="hidden" id="seckillGoods-${index}" value="" />
                    <div id="seckillGoodsDropdown-${index}" class="seckill-goods-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid #e2e8f0;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.1);z-index:100;max-height:200px;overflow-y:auto;">
                        ${typeof goodsData !== 'undefined' ? goodsData.map(g => `<div style="padding:6px 10px;cursor:pointer;font-size:12px;color:#334155;" onmouseover="this.style.background='#f8fafc'" onclick="selectSeckillGoods('${g.id}', '${g.name}', ${g.originalPrice}, this, ${index})">${g.name} (¥${g.originalPrice})</div>`).join('') : ''}
                    </div>
                </div>
            </div>
            <div style="width:100px;text-align:right;font-weight:600;" id="seckillOriginalPrice-${index}">-</div>
            <div style="width:100px;"><input type="number" id="seckillPrice-${index}" value="199" style="width:100%;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;text-align:right;" /></div>
            <div style="width:60px;"><button class="btn btn-sm btn-danger" onclick="removeSeckillProduct(this)"><i class="fas fa-trash"></i></button></div>
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

function saveSeckill() {
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
                goodsId: goodsId,
                goodsName: goodsName,
                originalPrice: parseFloat(originalPrice) || 0,
                seckillPrice: parseFloat(seckillPrice) || 0,
                sold: 0
            });
        }
    });
    
    if (products.length === 0) {
        alert('请至少选择一个商品');
        return;
    }
    
    seckillData.unshift({
        id: 'seckill-' + Date.now(),
        name: name,
        startTime: startTime.replace('T', ' '),
        endTime: endTime.replace('T', ' '),
        status: 'pending',
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
        products: products
    });
    
    alert('秒杀活动创建成功！');
    closeMarketingModal();
    refreshMarketingPage();
}

function showSeckillGoodsModal(seckill) {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeMarketingModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:560px;">
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
            <span></span>
            <div style="display:flex;gap:8px;">
                <button class="btn btn-primary" onclick="showAddSeckillModal()"><i class="fas fa-bolt"></i> 新建秒杀</button>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:12px;">
            <div class="stat-card"><div class="label"><i class="fas fa-bolt"></i> 进行中秒杀</div><div class="value" style="font-size:22px;color:#3b82f6;">${activeSeckill}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 即将开始</div><div class="value" style="font-size:22px;color:#f59e0b;">${pendingSeckill}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-chart-bar"></i> 活动销售额</div><div class="value" style="font-size:22px;color:#8b5cf6;">¥86.4万</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-shopping-cart"></i> 活动订单数</div><div class="value" style="font-size:22px;color:#22c55e;">1256</div></div>
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
                            <span style="color:#4f6ef7;font-weight:600;">¥86.4万</span>
                        </div>
                        <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                            <div style="width:75%;height:100%;background:linear-gradient(90deg,#4f6ef7,#7c3aed);border-radius:3px;"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                            <span>活动订单转化率</span>
                            <span style="color:#22c55e;font-weight:600;">68.5%</span>
                        </div>
                        <div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                            <div style="width:68.5%;height:100%;background:linear-gradient(90deg,#22c55e,#10b981);border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="grid-column:span 2;">
                        <div style="padding:10px 12px;background:#fef3c7;border-radius:6px;font-size:12px;color:#92400e;">
                            <i class="fas fa-info-circle"></i> 活动期间订单量较平日增长 156%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}