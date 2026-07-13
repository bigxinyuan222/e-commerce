let goodsData = [
    { id: 'goods-001', name: '无线蓝牙耳机 Pro', category: '手机数码', subCategory: '耳机', brand: '华为', originalPrice: 299, status: 'on_shelf', createTime: '2026-06-01', skuCount: 4, image: '', views: 12580, addCartCount: 3250, orderCount: 1860 },
    { id: 'goods-002', name: '智能手表 S8', category: '手机数码', subCategory: '智能手表', brand: '苹果', originalPrice: 1299, status: 'on_shelf', createTime: '2026-05-20', skuCount: 6, image: '', views: 8920, addCartCount: 1820, orderCount: 654 },
    { id: 'goods-003', name: '便携移动电源 20000mAh', category: '手机数码', subCategory: '手机', brand: '小米', originalPrice: 159, status: 'on_shelf', createTime: '2026-06-20', skuCount: 3, image: '', views: 5680, addCartCount: 1250, orderCount: 890 },
    { id: 'goods-004', name: '智能台灯 Pro', category: '家用电器', subCategory: '生活电器', brand: '美的', originalPrice: 199, status: 'off_shelf', createTime: '2026-04-15', skuCount: 2, image: '', views: 3250, addCartCount: 680, orderCount: 420 },
    { id: 'goods-005', name: '运动蓝牙耳机', category: '运动户外', subCategory: '运动装备', brand: '索尼', originalPrice: 399, status: 'on_shelf', createTime: '2026-03-28', skuCount: 4, image: '', views: 4520, addCartCount: 980, orderCount: 560 },
    { id: 'goods-006', name: '美妆护肤套装', category: '美妆护肤', subCategory: '护肤', brand: '欧莱雅', originalPrice: 288, status: 'on_shelf', createTime: '2026-05-10', skuCount: 2, image: '', views: 6890, addCartCount: 1560, orderCount: 780 },
    { id: 'goods-007', name: '纯棉T恤', category: '服装服饰', subCategory: '男装', brand: '优衣库', originalPrice: 99, status: 'on_shelf', createTime: '2026-06-10', skuCount: 8, image: '', views: 15200, addCartCount: 4580, orderCount: 2340 },
    { id: 'goods-008', name: '真无线降噪耳机', category: '手机数码', subCategory: '耳机', brand: '三星', originalPrice: 499, status: 'on_shelf', createTime: '2026-04-20', skuCount: 3, image: '', views: 7250, addCartCount: 1680, orderCount: 890 }
];

let categoriesData = [
    { id: 'cat-001', name: '手机数码', goodsCount: 4, children: [{ id: 'sub-001', name: '手机', goodsCount: 2 }, { id: 'sub-002', name: '耳机', goodsCount: 2 }, { id: 'sub-003', name: '智能手表', goodsCount: 1 }] },
    { id: 'cat-002', name: '家用电器', goodsCount: 1, children: [{ id: 'sub-004', name: '厨房电器', goodsCount: 0 }, { id: 'sub-005', name: '生活电器', goodsCount: 1 }, { id: 'sub-006', name: '个人护理', goodsCount: 0 }] },
    { id: 'cat-003', name: '服装服饰', goodsCount: 1, children: [{ id: 'sub-007', name: '男装', goodsCount: 1 }, { id: 'sub-008', name: '女装', goodsCount: 0 }, { id: 'sub-009', name: '童装', goodsCount: 0 }] },
    { id: 'cat-004', name: '运动户外', goodsCount: 1, children: [{ id: 'sub-010', name: '运动装备', goodsCount: 1 }, { id: 'sub-011', name: '户外用品', goodsCount: 0 }] },
    { id: 'cat-005', name: '美妆护肤', goodsCount: 1, children: [{ id: 'sub-012', name: '护肤', goodsCount: 1 }, { id: 'sub-013', name: '彩妆', goodsCount: 0 }, { id: 'sub-014', name: '香水', goodsCount: 0 }] }
];

let brandsData = [
    { id: 'brand-001', name: '华为', logo: '', goodsCount: 1 },
    { id: 'brand-002', name: '苹果', logo: '', goodsCount: 1 },
    { id: 'brand-003', name: '小米', logo: '', goodsCount: 1 },
    { id: 'brand-004', name: '索尼', logo: '', goodsCount: 1 },
    { id: 'brand-005', name: '三星', logo: '', goodsCount: 1 },
    { id: 'brand-006', name: 'OPPO', logo: '', goodsCount: 0 },
    { id: 'brand-007', name: 'vivo', logo: '', goodsCount: 0 },
    { id: 'brand-008', name: '美的', logo: '', goodsCount: 1 },
    { id: 'brand-009', name: '欧莱雅', logo: '', goodsCount: 1 },
    { id: 'brand-010', name: '优衣库', logo: '', goodsCount: 1 }
];

let specsData = [
    { id: 'spec-001', name: '颜色', values: ['黑', '白', '红', '蓝', '绿', '粉'] },
    { id: 'spec-002', name: '尺码', values: ['S', 'M', 'L', 'XL', 'XXL'] },
    { id: 'spec-003', name: '存储容量', values: ['64GB', '128GB', '256GB', '512GB'] },
    { id: 'spec-004', name: '材质', values: ['纯棉', '涤纶', '羊毛', '真皮'] }
];

let currentGoodsStatusFilter = 'all';
let currentGoodsCategoryFilter = 'all';
let currentGoodsSubCategoryFilter = 'all';
let currentGoodsSearchKeyword = '';

function setGoodsFilter(type, value) {
    if (type === 'status') {
        currentGoodsStatusFilter = value;
    } else if (type === 'category') {
        currentGoodsCategoryFilter = value;
        currentGoodsSubCategoryFilter = 'all';
    } else if (type === 'subcategory') {
        currentGoodsSubCategoryFilter = value;
    } else if (type === 'keyword') {
        currentGoodsSearchKeyword = value;
    }
    refreshGoodsPage();
}
let tempGoodsData = {
    name: '',
    brand: '',
    category: '',
    originalPrice: 0,
    description: '',
    status: 'off_shelf',
    specs: [],
    skus: []
};

function getStatusBadge(status) {
    const colors = { on_shelf: 'green', off_shelf: 'gray' };
    const texts = { on_shelf: '上架', off_shelf: '下架' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function filterGoods() {
    let filtered = goodsData;
    if (currentGoodsStatusFilter !== 'all') {
        filtered = filtered.filter(g => g.status === currentGoodsStatusFilter);
    }
    if (currentGoodsCategoryFilter !== 'all') {
        filtered = filtered.filter(g => g.category === currentGoodsCategoryFilter);
    }
    if (currentGoodsSubCategoryFilter !== 'all') {
        filtered = filtered.filter(g => g.subCategory === currentGoodsSubCategoryFilter);
    }
    if (currentGoodsSearchKeyword) {
        const keyword = currentGoodsSearchKeyword.toLowerCase();
        filtered = filtered.filter(g => 
            g.name.toLowerCase().includes(keyword) || 
            g.id.toLowerCase().includes(keyword) ||
            g.category.toLowerCase().includes(keyword) ||
            g.brand.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchGoods() {
    const input = document.getElementById('goodsSearchInput');
    if (input) {
        currentGoodsSearchKeyword = input.value.trim();
        refreshGoodsPage();
    }
}

function handleGoodsAction(goodsId, action) {
    const goods = goodsData.find(g => g.id === goodsId);
    if (!goods) return;
    
    if (action === 'toggle_shelf') {
        goods.status = goods.status === 'on_shelf' ? 'off_shelf' : 'on_shelf';
        refreshGoodsPage();
    } else if (action === 'delete') {
        showConfirm(`确定删除商品 ${goods.name} 吗？`, function() {
            goodsData = goodsData.filter(g => g.id !== goodsId);
            refreshGoodsPage();
        });
    }
}

function toggleSelectAllGoods(checked) {
    document.querySelectorAll('.goods-checkbox').forEach(cb => cb.checked = checked);
}

function batchShelfGoods(status) {
    const checked = document.querySelectorAll('.goods-checkbox:checked');
    if (checked.length === 0) {
        alert('请先选择要操作的商品');
        return;
    }
    const ids = Array.from(checked).map(cb => cb.value);
    ids.forEach(id => {
        const goods = goodsData.find(g => g.id === id);
        if (goods) {
            goods.status = status;
        }
    });
    alert(`已${status === 'off_shelf' ? '下架' : '上架'} ${ids.length} 件商品`);
    refreshGoodsPage();
}

function batchDeleteGoods() {
    const checked = document.querySelectorAll('.goods-checkbox:checked');
    if (checked.length === 0) {
        alert('请先选择要操作的商品');
        return;
    }
    const ids = Array.from(checked).map(cb => cb.value);
    showConfirm(`确定删除选中的 ${checked.length} 件商品吗？此操作不可恢复。`, function() {
        goodsData = goodsData.filter(g => !ids.includes(g.id));
        alert(`已删除 ${ids.length} 件商品`);
        refreshGoodsPage();
    });
}

function showGoodsDetail(goodsId) {
    const goods = goodsData.find(g => g.id === goodsId);
    if (!goods) return;
    
    const conversionRate = goods.views > 0 ? ((goods.orderCount / goods.views) * 100).toFixed(2) : '0.00';
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeGoodsDetail()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:720px;">
            <div class="modal-header">
                <h3><i class="fas fa-box"></i> 商品详情</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">商品名称</div>
                        <div style="font-weight:600;">${goods.name}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">商品状态</div>
                        <div>${getStatusBadge(goods.status)}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">分类</div>
                        <div>${goods.category}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">品牌</div>
                        <div>${goods.brand}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">原价</div>
                        <div style="font-weight:600;color:#4f6ef7;">¥${goods.originalPrice}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">SKU数量</div>
                        <div>${goods.skuCount}</div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">数据分析</div>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                        <div style="background:#f8fafc;border-radius:8px;padding:12px;text-align:center;">
                            <div style="font-size:20px;font-weight:700;color:#4f6ef7;">${goods.views.toLocaleString()}</div>
                            <div style="font-size:12px;color:#94a3b8;">浏览量</div>
                        </div>
                        <div style="background:#f8fafc;border-radius:8px;padding:12px;text-align:center;">
                            <div style="font-size:20px;font-weight:700;color:#f59e0b;">${goods.orderCount.toLocaleString()}</div>
                            <div style="font-size:12px;color:#94a3b8;">成交订单</div>
                        </div>
                        <div style="background:#f8fafc;border-radius:8px;padding:12px;text-align:center;">
                            <div style="font-size:20px;font-weight:700;color:#8b5cf6;">${conversionRate}%</div>
                            <div style="font-size:12px;color:#94a3b8;">转化率</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="font-weight:600;font-size:14px;margin-bottom:8px;">SKU列表</div>
                    <div style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                        <div style="display:flex;padding:10px 12px;background:#fafbfc;font-size:12px;font-weight:600;color:#64748b;">
                            <div style="flex:1;">SKU编码</div>
                            <div style="flex:1;">规格</div>
                            <div style="width:80px;text-align:right;">售价</div>
                            <div style="width:80px;text-align:right;">库存</div>
                        </div>
                        ${[1,2,3,4].map(i => `
                            <div style="display:flex;padding:10px 12px;border-bottom:1px solid #f1f4f9;">
                                <div style="flex:1;font-size:13px;">SKU-${String(goods.id.split('-')[1]).padStart(3,'0')}-${String(i).padStart(2,'0')}</div>
                                <div style="flex:1;font-size:13px;">${['黑色','白色','红色','蓝色'][i-1]}</div>
                                <div style="width:80px;text-align:right;font-weight:600;">¥${goods.originalPrice}</div>
                                <div style="width:80px;text-align:right;">${[840,400,0,230][i-1]}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="handleGoodsAction('${goods.id}', 'toggle_shelf')"><i class="fas fa-${goods.status === 'on_shelf' ? 'arrow-down' : 'arrow-up'}"></i> ${goods.status === 'on_shelf' ? '下架' : '上架'}</button>
                <button class="btn btn-outline"><i class="fas fa-edit"></i> 编辑</button>
                <button class="btn btn-outline" onclick="closeGoodsDetail()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function closeGoodsDetail() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshGoodsPage() {
    const panel = document.getElementById('panel-goods');
    if (panel) panel.innerHTML = goodsPage();
}

function switchGoodsStatus(status) {
    currentGoodsStatusFilter = status;
    refreshGoodsPage();
}

function switchGoodsCategory(category) {
    currentGoodsCategoryFilter = category;
    refreshGoodsPage();
}

let goodsAddStep = 1;

function showAddGoodsModal() {
    closeGoodsDetail();
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增商品</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:flex;justify-content:center;margin-bottom:16px;">
                    <div style="display:flex;align-items:center;gap:24px;">
                        <div style="text-align:center;cursor:pointer;" onclick="setGoodsStep(1)">
                            <div style="width:36px;height:36px;background:${goodsAddStep === 1 ? '#4f6ef7' : '#e2e8f0'};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;border:2px solid ${goodsAddStep === 1 ? '#4f6ef7' : '#cbd5e1'};"><span style="font-size:14px;color:${goodsAddStep === 1 ? '#fff' : '#64748b'};">1</span></div>
                            <div style="font-size:12px;color:${goodsAddStep === 1 ? '#4f6ef7' : '#64748b'};font-weight:${goodsAddStep === 1 ? '600' : '400'};margin-top:4px;">基础信息</div>
                        </div>
                        <div style="width:60px;height:2px;background:${goodsAddStep > 1 ? '#4f6ef7' : '#e2e8f0'};"></div>
                        <div style="text-align:center;cursor:pointer;" onclick="setGoodsStep(2)">
                            <div style="width:36px;height:36px;background:${goodsAddStep === 2 ? '#4f6ef7' : '#e2e8f0'};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;border:2px solid ${goodsAddStep === 2 ? '#4f6ef7' : '#cbd5e1'};"><span style="font-size:14px;color:${goodsAddStep === 2 ? '#fff' : '#64748b'};">2</span></div>
                            <div style="font-size:12px;color:${goodsAddStep === 2 ? '#4f6ef7' : '#64748b'};font-weight:${goodsAddStep === 2 ? '600' : '400'};margin-top:4px;">规格设置</div>
                        </div>
                        <div style="width:60px;height:2px;background:${goodsAddStep > 2 ? '#4f6ef7' : '#e2e8f0'};"></div>
                        <div style="text-align:center;cursor:pointer;" onclick="setGoodsStep(3)">
                            <div style="width:36px;height:36px;background:${goodsAddStep === 3 ? '#4f6ef7' : '#e2e8f0'};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;border:2px solid ${goodsAddStep === 3 ? '#4f6ef7' : '#cbd5e1'};"><span style="font-size:14px;color:${goodsAddStep === 3 ? '#fff' : '#64748b'};">3</span></div>
                            <div style="font-size:12px;color:${goodsAddStep === 3 ? '#4f6ef7' : '#64748b'};font-weight:${goodsAddStep === 3 ? '600' : '400'};margin-top:4px;">SKU配置</div>
                        </div>
                    </div>
                </div>
                
                <div id="goodsAddForm">
                    ${goodsAddStep === 1 ? `
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">商品名称 <span style="color:#ef4444;">*</span></label><input type="text" placeholder="请输入商品名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">品牌</label><select style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;"><option>请选择品牌</option><option>华为</option><option>苹果</option><option>小米</option><option>索尼</option><option>三星</option><option>美的</option></select></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">分类 <span style="color:#ef4444;">*</span></label><select style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;"><option>请选择分类</option><option>手机数码</option><option>家用电器</option><option>服装服饰</option><option>运动户外</option><option>美妆护肤</option></select></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">原价 <span style="color:#ef4444;">*</span></label><input type="number" placeholder="请输入原价" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                            <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">商品描述</label><textarea rows="3" placeholder="请输入商品描述" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'"></textarea></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">主图</label><div style="border:1px dashed #e2e8f0;border-radius:8px;padding:24px;text-align:center;"><i class="fas fa-upload" style="color:#94a3b8;font-size:24px;"></i><div style="font-size:13px;color:#94a3b8;margin-top:8px;">点击上传主图</div></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">轮播图</label><div style="border:1px dashed #e2e8f0;border-radius:8px;padding:24px;text-align:center;"><i class="fas fa-images" style="color:#94a3b8;font-size:24px;"></i><div style="font-size:13px;color:#94a3b8;margin-top:8px;">点击上传轮播图</div></div></div>
                            <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">初始状态</label><div style="display:flex;gap:16px;"><label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="initialStatus" checked style="accent-color:#4f6ef7;" />下架（默认）</label><label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="initialStatus" style="accent-color:#4f6ef7;" />上架</label></div></div>
                        </div>
                    ` : goodsAddStep === 2 ? `
                        <div>
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                                <div style="font-weight:600;font-size:14px;">规格列表</div>
                                <button class="btn btn-sm btn-primary" onclick="addGoodsSpec()"><i class="fas fa-plus"></i> 添加规格</button>
                            </div>
                            <div id="specList" style="display:flex;flex-direction:column;gap:12px;">
                                ${tempGoodsData.specs.length > 0 ? tempGoodsData.specs.map((spec, i) => {
                                    const specDef = specsData.find(s => s.name === spec.name);
                                    return `
                                    <div style="display:flex;gap:12px;align-items:flex-start;">
                                        <select style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}" ${s.name === spec.name ? 'selected' : ''}>${s.name}</option>`).join('')}
                                        </select>
                                        <div style="flex:2;">
                                            ${specDef ? specDef.values.map(v => `<label style="display:flex;align-items:center;gap:6px;font-size:13px;margin-bottom:4px;"><input type="checkbox" value="${v}" ${spec.values.includes(v) ? 'checked' : ''} style="accent-color:#4f6ef7;" />${v}</label>`).join('') : '<div style="color:#94a3b8;font-size:12px;">请选择规格</div>'}
                                        </div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}).join('') : `
                                    <div style="display:flex;gap:12px;align-items:flex-start;">
                                        <select style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                                        </select>
                                        <div style="flex:2;"><div style="color:#94a3b8;font-size:12px;">请选择规格</div></div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}
                            </div>
                            <div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;color:#64748b;">
                                <i class="fas fa-info-circle" style="color:#4f6ef7;margin-right:6px;"></i>
                                系统将自动计算规格组合的笛卡尔积，用于下一步SKU配置
                            </div>
                        </div>
                    ` : `
                        <div>
                            <div style="font-weight:600;font-size:14px;margin-bottom:8px;">SKU配置</div>
                            <div style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                                <div style="display:flex;padding:10px 12px;background:#fafbfc;font-size:12px;font-weight:600;color:#64748b;">
                                    <div style="flex:1;">规格组合</div>
                                    <div style="width:100px;text-align:right;">售价</div>
                                    <div style="width:80px;text-align:right;">库存</div>
                                </div>
                                <div id="skuList">
                                    ${tempGoodsData.skus.length > 0 ? tempGoodsData.skus.map((sku, i) => `
                                        <div style="display:flex;padding:10px 12px;border-bottom:1px solid #f1f4f9;align-items:center;">
                                            <div style="flex:1;font-size:12px;color:#334155;">${sku.spec}</div>
                                            <div style="width:100px;"><input type="number" value="${sku.price}" style="width:100%;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;text-align:right;" /></div>
                                            <div style="width:80px;"><input type="number" value="${sku.stock}" style="width:100%;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;text-align:right;" /></div>
                                        </div>
                                    `).join('') : `
                                        <div style="padding:30px;text-align:center;color:#94a3b8;">
                                            <i class="fas fa-info-circle" style="font-size:24px;margin-bottom:8px;"></i>
                                            <div>请先在规格设置中添加规格</div>
                                        </div>
                                    `}
                                </div>
                            </div>
                        </div>
                    `}
                </div>
            </div>
            <div class="modal-footer">
                ${goodsAddStep > 1 ? `<button class="btn btn-outline" onclick="prevGoodsStep()"><i class="fas fa-arrow-left"></i> 上一步</button>` : ''}
                ${goodsAddStep < 3 ? `<button class="btn btn-primary" onclick="nextGoodsStep()"><i class="fas fa-arrow-right"></i> 下一步</button>` : `<button class="btn btn-primary" onclick="saveGoods()"><i class="fas fa-save"></i> 保存商品</button>`}
            </div>
        </div>
    `;
    
    const container = document.body;
    if (container) {
        container.insertAdjacentHTML('beforeend', modalContent);
    }
}

function nextGoodsStep() {
    if (goodsAddStep === 1) {
        const nameInput = document.querySelector('#goodsAddForm input[type="text"]');
        const selects = document.querySelectorAll('#goodsAddForm select');
        const brandInput = selects[0];
        const categoryInput = selects[1];
        const priceInput = document.querySelector('#goodsAddForm input[type="number"]');
        const descInput = document.querySelector('#goodsAddForm textarea');
        const statusInputs = document.querySelectorAll('input[name="initialStatus"]');
        
        tempGoodsData.name = nameInput?.value || '';
        tempGoodsData.brand = brandInput?.value === '请选择品牌' ? '' : brandInput?.value || '';
        tempGoodsData.category = categoryInput?.value === '请选择分类' ? '' : categoryInput?.value || '';
        tempGoodsData.originalPrice = parseInt(priceInput?.value) || 0;
        tempGoodsData.description = descInput?.value || '';
        tempGoodsData.status = Array.from(statusInputs).find(i => i.checked)?.nextElementSibling?.textContent?.includes('上架') ? 'on_shelf' : 'off_shelf';
        
        if (!tempGoodsData.name) {
            alert('请输入商品名称');
            return;
        }
        if (!tempGoodsData.category) {
            alert('请选择商品分类');
            return;
        }
        if (!tempGoodsData.originalPrice || tempGoodsData.originalPrice <= 0) {
            alert('请输入正确的原价');
            return;
        }
    } else if (goodsAddStep === 2) {
        tempGoodsData.specs = readSpecsFromForm();
        generateSKUsFromSpecs();
    }
    
    goodsAddStep++;
    showAddGoodsModal();
}

function readSpecsFromForm() {
    const specRows = document.querySelectorAll('#specList > div');
    const specsMap = {};
    
    specRows.forEach(row => {
        const selects = row.querySelectorAll('select');
        const checkboxes = row.querySelectorAll('input[type="checkbox"]');
        if (selects.length >= 1) {
            const specId = selects[0].value;
            const selectedValues = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
            if (specId) {
                const specDef = specsData.find(s => s.id === specId);
                const specName = specDef?.name || '';
                
                if (specsMap[specName]) {
                    specsMap[specName].values = [...new Set([...specsMap[specName].values, ...selectedValues])];
                } else {
                    specsMap[specName] = { name: specName, values: selectedValues };
                }
            }
        }
    });
    
    return Object.values(specsMap);
}

function setGoodsStep(step) {
    if (step === 1 && goodsAddStep === 2) {
        tempGoodsData.specs = readSpecsFromForm();
    } else if (step === 3 && goodsAddStep === 2) {
        tempGoodsData.specs = readSpecsFromForm();
        generateSKUsFromSpecs();
    }
    
    goodsAddStep = step;
    showAddGoodsModal();
}

function prevGoodsStep() {
    if (goodsAddStep === 2) {
        tempGoodsData.specs = readSpecsFromForm();
    }
    
    goodsAddStep--;
    showAddGoodsModal();
}

function generateSKUsFromSpecs() {
    const specs = tempGoodsData.specs;
    if (specs.length === 0) {
        tempGoodsData.skus = [{
            spec: '默认规格',
            price: tempGoodsData.originalPrice,
            stock: 100
        }];
        return;
    }
    
    const valueArrays = specs.map(s => s.values);
    const combinations = valueArrays.reduce((acc, curr) => {
        const result = [];
        for (const a of acc) {
            for (const c of curr) {
                result.push([...a, c]);
            }
        }
        return result;
    }, [[]]);
    
    const skus = combinations.map((combo, index) => {
        const specText = specs.map((s, i) => `${s.name}: ${combo[i]}`).join(', ');
        return {
            spec: specText,
            price: tempGoodsData.originalPrice,
            stock: 100
        };
    });
    
    tempGoodsData.skus = skus;
}

function addGoodsSpec() {
    const specList = document.getElementById('specList');
    if (specList) {
        specList.insertAdjacentHTML('beforeend', `
            <div style="display:flex;gap:12px;align-items:flex-start;">
                <select style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onchange="updateSpecValues(this)">
                    <option value="">请选择规格</option>
                    ${specsData.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
                <div style="flex:2;"><div style="color:#94a3b8;font-size:12px;">请选择规格</div></div>
                <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
            </div>
        `);
    }
}

function updateSpecValues(select) {
    const specId = select.value;
    const valueDiv = select.parentElement.querySelector('div');
    if (specId && valueDiv) {
        const spec = specsData.find(s => s.id === specId);
        if (spec) {
            valueDiv.innerHTML = spec.values.map(v => `<label style="display:flex;align-items:center;gap:6px;font-size:13px;margin-bottom:4px;"><input type="checkbox" value="${v}" style="accent-color:#4f6ef7;" />${v}</label>`).join('');
        } else {
            valueDiv.innerHTML = '<div style="color:#94a3b8;font-size:12px;">请选择规格</div>';
        }
    } else if (valueDiv) {
        valueDiv.innerHTML = '<div style="color:#94a3b8;font-size:12px;">请选择规格</div>';
    }
}

function removeGoodsSpec(btn) {
    btn.parentElement.remove();
}

function saveGoods() {
    const name = document.querySelector('#goodsAddForm input[type="text"]')?.value;
    const brand = document.querySelector('#goodsAddForm select')?.value;
    const category = document.querySelectorAll('#goodsAddForm select')[1]?.value;
    const price = document.querySelector('#goodsAddForm input[type="number"]')?.value;
    const status = document.querySelector('input[name="initialStatus"]:checked')?.value === '上架' ? 'on_shelf' : 'off_shelf';
    
    if (!name) {
        alert('请输入商品名称');
        return;
    }
    if (!category) {
        alert('请选择商品分类');
        return;
    }
    if (!price || isNaN(price)) {
        alert('请输入正确的原价');
        return;
    }
    
    const specs = [];
    const specRows = document.querySelectorAll('#goodsAddForm #specList > div');
    specRows.forEach(row => {
        const selects = row.querySelectorAll('select');
        if (selects.length >= 2) {
            const specId = selects[0].value;
            const selectedOptions = Array.from(selects[1].selectedOptions).map(opt => opt.value);
            if (specId && selectedOptions.length > 0) {
                const specDef = specsData.find(s => s.id === specId);
                specs.push({ name: specDef?.name || '', values: selectedOptions });
            }
        }
    });
    
    const skus = [];
    const skuRows = document.querySelectorAll('#goodsAddForm #skuList > div');
    skuRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const code = inputs[0]?.value || '';
        const specText = row.querySelector('div:nth-child(2)')?.textContent || '';
        const skuPrice = parseInt(inputs[1]?.value) || parseInt(price);
        const skuStock = parseInt(inputs[2]?.value) || 100;
        if (code && specText) {
            skus.push({ code, spec: specText, price: skuPrice, stock: skuStock });
        }
    });
    
    const newGoods = {
        id: 'goods-' + String(goodsData.length + 1).padStart(3, '0'),
        name: name,
        category: category,
        brand: brand || '',
        originalPrice: parseInt(price),
        status: status,
        createTime: new Date().toISOString().split('T')[0],
        skuCount: skus.length || 1,
        image: '',
        views: 0,
        addCartCount: 0,
        orderCount: 0,
        specs: specs,
        skus: skus
    };
    
    goodsData.push(newGoods);
    
    alert('商品保存成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function showEditGoodsModal(goodsId) {
    const goods = goodsData.find(g => g.id === goodsId);
    if (!goods) return;
    
    closeGoodsDetail();
    goodsAddStep = 1;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑商品</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:flex;justify-content:center;margin-bottom:16px;">
                    <div style="display:flex;align-items:center;gap:24px;">
                        <div style="text-align:center;cursor:pointer;" onclick="setGoodsStep(1)">
                            <div style="width:36px;height:36px;background:${goodsAddStep === 1 ? '#4f6ef7' : '#e2e8f0'};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;border:2px solid ${goodsAddStep === 1 ? '#4f6ef7' : '#cbd5e1'};"><span style="font-size:14px;color:${goodsAddStep === 1 ? '#fff' : '#64748b'};">1</span></div>
                            <div style="font-size:12px;color:${goodsAddStep === 1 ? '#4f6ef7' : '#64748b'};font-weight:${goodsAddStep === 1 ? '600' : '400'};margin-top:4px;">基础信息</div>
                        </div>
                        <div style="width:60px;height:2px;background:${goodsAddStep > 1 ? '#4f6ef7' : '#e2e8f0'};"></div>
                        <div style="text-align:center;cursor:pointer;" onclick="setGoodsStep(2)">
                            <div style="width:36px;height:36px;background:${goodsAddStep === 2 ? '#4f6ef7' : '#e2e8f0'};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;border:2px solid ${goodsAddStep === 2 ? '#4f6ef7' : '#cbd5e1'};"><span style="font-size:14px;color:${goodsAddStep === 2 ? '#fff' : '#64748b'};">2</span></div>
                            <div style="font-size:12px;color:${goodsAddStep === 2 ? '#4f6ef7' : '#64748b'};font-weight:${goodsAddStep === 2 ? '600' : '400'};margin-top:4px;">规格设置</div>
                        </div>
                        <div style="width:60px;height:2px;background:${goodsAddStep > 2 ? '#4f6ef7' : '#e2e8f0'};"></div>
                        <div style="text-align:center;cursor:pointer;" onclick="setGoodsStep(3)">
                            <div style="width:36px;height:36px;background:${goodsAddStep === 3 ? '#4f6ef7' : '#e2e8f0'};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 4px;border:2px solid ${goodsAddStep === 3 ? '#4f6ef7' : '#cbd5e1'};"><span style="font-size:14px;color:${goodsAddStep === 3 ? '#fff' : '#64748b'};">3</span></div>
                            <div style="font-size:12px;color:${goodsAddStep === 3 ? '#4f6ef7' : '#64748b'};font-weight:${goodsAddStep === 3 ? '600' : '400'};margin-top:4px;">SKU配置</div>
                        </div>
                    </div>
                </div>
                
                <div id="goodsAddForm">
                    ${goodsAddStep === 1 ? `
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">商品名称 <span style="color:#ef4444;">*</span></label><input type="text" id="editGoodsName" value="${goods.name}" placeholder="请输入商品名称" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">品牌</label>
                                <select id="editGoodsBrand" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;">
                                    <option>请选择品牌</option>
                                    ${brandsData.map(b => `<option value="${b.name}" ${b.name === goods.brand ? 'selected' : ''}>${b.name}</option>`).join('')}
                                </select>
                            </div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">分类 <span style="color:#ef4444;">*</span></label>
                                <select id="editGoodsCategory" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;">
                                    <option>请选择分类</option>
                                    ${categoriesData.map(c => `<option value="${c.name}" ${c.name === goods.category ? 'selected' : ''}>${c.name}</option>`).join('')}
                                </select>
                            </div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">原价 <span style="color:#ef4444;">*</span></label><input type="number" id="editGoodsPrice" value="${goods.originalPrice}" placeholder="请输入原价" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                            <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">商品描述</label><textarea id="editGoodsDesc" rows="3" placeholder="请输入商品描述" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'"></textarea></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">主图</label><div style="border:1px dashed #e2e8f0;border-radius:8px;padding:24px;text-align:center;"><i class="fas fa-image" style="color:#4f6ef7;font-size:24px;"></i><div style="font-size:13px;color:#64748b;margin-top:8px;">已有图片</div></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">轮播图</label><div style="border:1px dashed #e2e8f0;border-radius:8px;padding:24px;text-align:center;"><i class="fas fa-images" style="color:#4f6ef7;font-size:24px;"></i><div style="font-size:13px;color:#64748b;margin-top:8px;">已有图片</div></div></div>
                            <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">商品状态</label><div style="display:flex;gap:16px;">
                                <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="editGoodsStatus" value="on_shelf" ${goods.status === 'on_shelf' ? 'checked' : ''} style="accent-color:#4f6ef7;" />上架</label>
                                <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="editGoodsStatus" value="off_shelf" ${goods.status === 'off_shelf' ? 'checked' : ''} style="accent-color:#4f6ef7;" />下架</label>
                            </div></div>
                        </div>
                    ` : goodsAddStep === 2 ? `
                        <div>
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                                <div style="font-weight:600;font-size:14px;">规格列表</div>
                                <button class="btn btn-sm btn-primary" onclick="addGoodsSpec()"><i class="fas fa-plus"></i> 添加规格</button>
                            </div>
                            <div id="specList" style="display:flex;flex-direction:column;gap:12px;">
                                ${tempGoodsData.specs.length > 0 ? tempGoodsData.specs.map((spec, i) => {
                                    const specDef = specsData.find(s => s.name === spec.name);
                                    return `
                                    <div style="display:flex;gap:12px;align-items:flex-start;">
                                        <select style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}" ${s.name === spec.name ? 'selected' : ''}>${s.name}</option>`).join('')}
                                        </select>
                                        <div style="flex:2;">
                                            ${specDef ? specDef.values.map(v => `<label style="display:flex;align-items:center;gap:6px;font-size:13px;margin-bottom:4px;"><input type="checkbox" value="${v}" ${spec.values.includes(v) ? 'checked' : ''} style="accent-color:#4f6ef7;" />${v}</label>`).join('') : '<div style="color:#94a3b8;font-size:12px;">请选择规格</div>'}
                                        </div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}).join('') : `
                                    <div style="display:flex;gap:12px;align-items:flex-start;">
                                        <select style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                                        </select>
                                        <div style="flex:2;"><div style="color:#94a3b8;font-size:12px;">请选择规格</div></div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}
                            </div>
                            <div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;color:#64748b;">
                                <i class="fas fa-info-circle" style="color:#4f6ef7;margin-right:6px;"></i>
                                系统将自动计算规格组合的笛卡尔积，用于下一步SKU配置
                            </div>
                        </div>
                    ` : `
                        <div>
                            <div style="font-weight:600;font-size:14px;margin-bottom:8px;">SKU配置</div>
                            <div style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                                <div style="display:flex;padding:10px 12px;background:#fafbfc;font-size:12px;font-weight:600;color:#64748b;">
                                    <div style="flex:1;">SKU编码</div>
                                    <div style="flex:1;">规格组合</div>
                                    <div style="width:100px;text-align:right;">售价</div>
                                    <div style="width:80px;text-align:right;">库存</div>
                                </div>
                                ${(goods.skus && goods.skus.length > 0) ? goods.skus.map((sku, i) => `
                                    <div style="display:flex;padding:10px 12px;border-bottom:1px solid #f1f4f9;align-items:center;">
                                        <div style="flex:1;"><input type="text" value="${sku.code}" style="width:100%;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;" /></div>
                                        <div style="flex:1;font-size:12px;color:#334155;">${sku.spec}</div>
                                        <div style="width:100px;"><input type="number" value="${sku.price || goods.originalPrice}" style="width:100%;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;text-align:right;" /></div>
                                        <div style="width:80px;"><input type="number" value="${sku.stock || 100}" style="width:100%;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;font-size:12px;text-align:right;" /></div>
                                    </div>
                                `).join('') : `
                                    <div style="padding:30px;text-align:center;color:#94a3b8;">
                                        <i class="fas fa-info-circle" style="font-size:24px;margin-bottom:8px;"></i>
                                        <div>请先在规格设置中添加规格</div>
                                    </div>
                                `}
                            </div>
                        </div>
                    `}
                </div>
            </div>
            <div class="modal-footer">
                ${goodsAddStep > 1 ? `<button class="btn btn-outline" onclick="prevGoodsStep()"><i class="fas fa-arrow-left"></i> 上一步</button>` : ''}
                ${goodsAddStep < 3 ? `<button class="btn btn-primary" onclick="nextGoodsStep()"><i class="fas fa-arrow-right"></i> 下一步</button>` : `<button class="btn btn-primary" onclick="saveEditGoods('${goods.id}')"><i class="fas fa-save"></i> 保存修改</button>`}
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveEditGoods(goodsId) {
    const goods = goodsData.find(g => g.id === goodsId);
    if (!goods) return;
    
    const name = document.getElementById('editGoodsName')?.value;
    const brand = document.getElementById('editGoodsBrand')?.value;
    const category = document.getElementById('editGoodsCategory')?.value;
    const price = document.getElementById('editGoodsPrice')?.value;
    const status = document.querySelector('input[name="editGoodsStatus"]:checked')?.value;
    
    if (!name) {
        alert('请输入商品名称');
        return;
    }
    if (!category) {
        alert('请选择商品分类');
        return;
    }
    if (!price || isNaN(price)) {
        alert('请输入正确的原价');
        return;
    }
    
    goods.name = name;
    goods.brand = brand || '';
    goods.category = category;
    goods.originalPrice = parseInt(price);
    goods.status = status || goods.status;
    
    alert('商品修改成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function showAddCategoryModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增分类</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:20px;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">分类名称 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="newCategoryName" placeholder="请输入分类名称，如：手机数码" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">分类图标</label>
                        <div style="display:flex;gap:8px;">
                            ${['fa-box', 'fa-mobile-alt', 'fa-home', 'fa-shirt', 'fa-heart', 'fa-gamepad', 'fa-glass-water', 'fa-book'].map(icon => `
                                <div class="icon-option ${icon === 'fa-box' ? 'selected' : ''}" onclick="selectCategoryIcon('${icon}', this)" style="width:48px;height:48px;background:#f8fafc;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:20px;color:#64748b;transition:all 0.2s;" onmouseover="this.style.background='#e2e8f0'">
                                    <i class="fas ${icon}"></i>
                                </div>
                            `).join('')}
                        </div>
                        <input type="hidden" id="newCategoryIcon" value="fa-box" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeGoodsDetail()">取消</button>
                <button class="btn btn-primary" onclick="saveCategory()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

let selectedCategoryIcon = 'fa-box';

function selectCategoryIcon(icon, el) {
    selectedCategoryIcon = icon;
    document.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('newCategoryIcon').value = icon;
}

function saveCategory() {
    const name = document.getElementById('newCategoryName')?.value?.trim();
    
    if (!name) {
        alert('请输入分类名称');
        return;
    }
    
    const exists = categoriesData.find(c => c.name === name);
    if (exists) {
        alert('该分类名称已存在');
        return;
    }
    
    categoriesData.push({
        id: 'cat-' + String(categoriesData.length + 1).padStart(3, '0'),
        name: name,
        goodsCount: 0,
        children: []
    });
    
    alert('分类添加成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

let draggedCategoryId = null;
let expandedCategories = new Set();

function toggleCategoryExpand(catId) {
    if (expandedCategories.has(catId)) {
        expandedCategories.delete(catId);
    } else {
        expandedCategories.add(catId);
    }
    refreshGoodsPage();
}

function handleCategoryDragStart(e, catId) {
    draggedCategoryId = catId;
    e.dataTransfer.effectAllowed = 'move';
}

function handleCategoryDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleCategoryDrop(e, targetCatId) {
    e.preventDefault();
    if (!draggedCategoryId || draggedCategoryId === targetCatId) {
        draggedCategoryId = null;
        return;
    }
    
    const draggedIndex = categoriesData.findIndex(c => c.id === draggedCategoryId);
    const targetIndex = categoriesData.findIndex(c => c.id === targetCatId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
        const draggedItem = categoriesData.splice(draggedIndex, 1)[0];
        categoriesData.splice(targetIndex, 0, draggedItem);
    }
    
    draggedCategoryId = null;
    refreshGoodsPage();
}

function showAddSubCategoryModal(parentId) {
    const parent = categoriesData.find(c => c.id === parentId);
    if (!parent) return;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增子分类</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:20px;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">子类名称 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="newSubCategoryName" placeholder="请输入子类名称" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeGoodsDetail()">取消</button>
                <button class="btn btn-primary" onclick="saveSubCategory('${parentId}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveSubCategory(parentId) {
    const name = document.getElementById('newSubCategoryName')?.value?.trim();
    if (!name) {
        alert('请输入子类名称');
        return;
    }
    
    const parent = categoriesData.find(c => c.id === parentId);
    if (!parent) return;
    
    const exists = parent.children.find(c => c.name === name);
    if (exists) {
        alert('该子类名称已存在');
        return;
    }
    
    const subId = 'sub-' + String(Date.now()).slice(-3);
    parent.children.push({
        id: subId,
        name: name,
        goodsCount: 0
    });
    
    alert('子分类添加成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function deleteSubCategory(parentId, subId) {
    const parent = categoriesData.find(c => c.id === parentId);
    if (!parent) return;
    
    showConfirm('确定删除该子分类吗？', function() {
        parent.children = parent.children.filter(c => c.id !== subId);
        refreshGoodsPage();
    });
}

function showAddBrandModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增品牌</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:20px;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">品牌名称 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="newBrandName" placeholder="请输入品牌名称，如：华为" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">品牌Logo</label>
                        <div style="border:2px dashed #e2e8f0;border-radius:8px;padding:32px;text-align:center;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='#cbd5e1'" onclick="document.getElementById('brandLogoInput').click()">
                            <i class="fas fa-upload" style="color:#94a3b8;font-size:28px;"></i>
                            <div style="font-size:13px;color:#64748b;margin-top:8px;">点击上传Logo</div>
                            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">支持 JPG、PNG 格式，建议尺寸 100x100</div>
                        </div>
                        <input type="file" id="brandLogoInput" accept="image/*" style="display:none;" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">品牌简介</label>
                        <textarea id="newBrandDesc" rows="3" placeholder="请输入品牌简介" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeGoodsDetail()">取消</button>
                <button class="btn btn-primary" onclick="saveBrand()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveBrand() {
    const name = document.getElementById('newBrandName')?.value?.trim();
    
    if (!name) {
        alert('请输入品牌名称');
        return;
    }
    
    const exists = brandsData.find(b => b.name === name);
    if (exists) {
        alert('该品牌名称已存在');
        return;
    }
    
    brandsData.push({
        id: 'brand-' + String(brandsData.length + 1).padStart(3, '0'),
        name: name,
        logo: '',
        goodsCount: 0
    });
    
    alert('品牌添加成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function showAddSpecModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:520px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新建规格</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:20px;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">规格名称 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="newSpecName" placeholder="请输入规格名称，如：颜色" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">规格值 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="newSpecValues" placeholder="请输入规格值，多个值用英文逗号分隔，如：红,蓝,白,黑" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">提示：输入完成后会自动解析并展示</div>
                    </div>
                    <div id="specValuesPreview" style="display:none;">
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">规格值预览</label>
                        <div id="specValuesTags" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeGoodsDetail()">取消</button>
                <button class="btn btn-primary" onclick="saveSpec()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    const valuesInput = document.getElementById('newSpecValues');
    if (valuesInput) {
        valuesInput.oninput = function() {
            const values = this.value.split(',').map(v => v.trim()).filter(v => v);
            const preview = document.getElementById('specValuesPreview');
            const tags = document.getElementById('specValuesTags');
            
            if (values.length > 0) {
                preview.style.display = 'block';
                tags.innerHTML = values.map(v => `<span class="tag primary" style="padding:6px 12px;">${v}</span>`).join('');
            } else {
                preview.style.display = 'none';
            }
        };
    }
}

function saveSpec() {
    const name = document.getElementById('newSpecName')?.value?.trim();
    const valuesInput = document.getElementById('newSpecValues')?.value?.trim();
    
    if (!name) {
        alert('请输入规格名称');
        return;
    }
    if (!valuesInput) {
        alert('请输入规格值');
        return;
    }
    
    const values = valuesInput.split(',').map(v => v.trim()).filter(v => v);
    if (values.length === 0) {
        alert('请输入有效的规格值');
        return;
    }
    
    const exists = specsData.find(s => s.name === name);
    if (exists) {
        alert('该规格名称已存在');
        return;
    }
    
    specsData.push({
        id: 'spec-' + String(specsData.length + 1).padStart(3, '0'),
        name: name,
        values: values
    });
    
    alert('规格添加成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function deleteCategory(catId) {
    const cat = categoriesData.find(c => c.id === catId);
    if (!cat) return;
    
    if (cat.goodsCount > 0) {
        alert(`该分类下还有 ${cat.goodsCount} 件商品，无法删除！`);
        return;
    }
    
    showConfirm(`确定删除分类 "${cat.name}" 吗？`, function() {
        categoriesData = categoriesData.filter(c => c.id !== catId);
        refreshGoodsPage();
    });
}

function findCategory(catId) {
    for (const cat of categoriesData) {
        if (cat.id === catId) {
            return { cat: cat, parent: null };
        }
        if (cat.children) {
            const sub = cat.children.find(c => c.id === catId);
            if (sub) {
                return { cat: sub, parent: cat };
            }
        }
    }
    return null;
}

function showEditCategoryModal(catId) {
    const result = findCategory(catId);
    if (!result) return;
    
    const cat = result.cat;
    closeGoodsDetail();
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑分类</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:20px;">
                <div>
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">分类名称 <span style="color:#ef4444;">*</span></label>
                    <input type="text" id="editCatName" value="${cat.name}" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeGoodsDetail()">取消</button>
                <button class="btn btn-primary" onclick="saveEditCategory('${catId}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveEditCategory(catId) {
    const result = findCategory(catId);
    if (!result) return;
    
    const cat = result.cat;
    const parent = result.parent;
    
    const name = document.getElementById('editCatName')?.value?.trim();
    if (!name) {
        alert('请输入分类名称');
        return;
    }
    
    if (parent) {
        const exists = parent.children.find(c => c.id !== catId && c.name === name);
        if (exists) {
            alert('该子分类名称已存在');
            return;
        }
    } else {
        const exists = categoriesData.find(c => c.id !== catId && c.name === name);
        if (exists) {
            alert('该分类名称已存在');
            return;
        }
    }
    
    const oldName = cat.name;
    cat.name = name;
    
    goodsData.forEach(g => {
        if (parent) {
            if (g.subCategory === oldName) {
                g.subCategory = name;
            }
        } else {
            if (g.category === oldName) {
                g.category = name;
            }
        }
    });
    
    alert('分类修改成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function deleteBrand(brandId) {
    const brand = brandsData.find(b => b.id === brandId);
    if (!brand) return;
    
    if (brand.goodsCount > 0) {
        alert(`该品牌下还有 ${brand.goodsCount} 件商品，无法删除！`);
        return;
    }
    
    showConfirm(`确定删除品牌 "${brand.name}" 吗？`, function() {
        brandsData = brandsData.filter(b => b.id !== brandId);
        refreshGoodsPage();
    });
}

function showEditBrandModal(brandId) {
    const brand = brandsData.find(b => b.id === brandId);
    if (!brand) return;
    
    closeGoodsDetail();
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:480px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑品牌</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:20px;">
                <div>
                    <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">品牌名称 <span style="color:#ef4444;">*</span></label>
                    <input type="text" id="editBrandName" value="${brand.name}" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeGoodsDetail()">取消</button>
                <button class="btn btn-primary" onclick="saveEditBrand('${brandId}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveEditBrand(brandId) {
    const brand = brandsData.find(b => b.id === brandId);
    if (!brand) return;
    
    const name = document.getElementById('editBrandName')?.value?.trim();
    if (!name) {
        alert('请输入品牌名称');
        return;
    }
    
    const exists = brandsData.find(b => b.id !== brandId && b.name === name);
    if (exists) {
        alert('该品牌名称已存在');
        return;
    }
    
    const oldName = brand.name;
    brand.name = name;
    
    goodsData.forEach(g => {
        if (g.brand === oldName) {
            g.brand = name;
        }
    });
    
    alert('品牌修改成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function deleteSpec(specId) {
    const spec = specsData.find(s => s.id === specId);
    if (!spec) return;
    
    showConfirm(`确定删除规格 "${spec.name}" 吗？`, function() {
        specsData = specsData.filter(s => s.id !== specId);
        refreshGoodsPage();
    });
}

function showEditSpecModal(specId) {
    const spec = specsData.find(s => s.id === specId);
    if (!spec) return;
    
    closeGoodsDetail();
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:520px;background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:1001;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑规格</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:20px;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">规格名称 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="editSpecName" value="${spec.name}" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">规格值 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="editSpecValues" value="${spec.values.join(',')}" placeholder="多个值用英文逗号分隔" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeGoodsDetail()">取消</button>
                <button class="btn btn-primary" onclick="saveEditSpec('${specId}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveEditSpec(specId) {
    const spec = specsData.find(s => s.id === specId);
    if (!spec) return;
    
    const name = document.getElementById('editSpecName')?.value?.trim();
    const valuesInput = document.getElementById('editSpecValues')?.value?.trim();
    
    if (!name) {
        alert('请输入规格名称');
        return;
    }
    if (!valuesInput) {
        alert('请输入规格值');
        return;
    }
    
    const values = valuesInput.split(',').map(v => v.trim()).filter(v => v);
    if (values.length === 0) {
        alert('请输入有效的规格值');
        return;
    }
    
    const exists = specsData.find(s => s.id !== specId && s.name === name);
    if (exists) {
        alert('该规格名称已存在');
        return;
    }
    
    spec.name = name;
    spec.values = values;
    
    alert('规格修改成功！');
    closeGoodsDetail();
    refreshGoodsPage();
}

function goodsPage() {
    const goods = filterGoods();
    
    return `
        <div class="flex-between mb-4">
            <div class="search-bar">
                <input id="goodsSearchInput" placeholder="搜索商品名称 / SKU" value="${currentGoodsSearchKeyword}" onkeypress="if(event.key==='Enter') setGoodsFilter('keyword', this.value)" />
                <select onchange="setGoodsFilter('category', this.value)">
                    <option value="all" ${currentGoodsCategoryFilter === 'all' ? 'selected' : ''}>全部分类</option>
                    ${categoriesData.map(c => `<option value="${c.name}" ${currentGoodsCategoryFilter === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
                </select>
                <select onchange="setGoodsFilter('subcategory', this.value)">
                    <option value="all" ${currentGoodsSubCategoryFilter === 'all' ? 'selected' : ''}>全部子分类</option>
                    ${(() => {
                        const selectedCategory = categoriesData.find(c => c.name === currentGoodsCategoryFilter);
                        if (selectedCategory && selectedCategory.children) {
                            return selectedCategory.children.map(sub => `<option value="${sub.name}" ${currentGoodsSubCategoryFilter === sub.name ? 'selected' : ''}>${sub.name}</option>`).join('');
                        }
                        return '';
                    })()}
                </select>
                <select onchange="setGoodsFilter('status', this.value)">
                    <option value="all" ${currentGoodsStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="on_shelf" ${currentGoodsStatusFilter === 'on_shelf' ? 'selected' : ''}>上架</option>
                    <option value="off_shelf" ${currentGoodsStatusFilter === 'off_shelf' ? 'selected' : ''}>下架</option>
                </select>
                <button class="btn btn-primary" onclick="setGoodsFilter('keyword', document.getElementById('goodsSearchInput').value)"><i class="fas fa-search"></i> 搜索</button>
            </div>
            <button class="btn btn-primary" onclick="showAddGoodsModal()"><i class="fas fa-plus"></i> 新增商品</button>
        </div>

        <div class="card">
            <div class="card-header">
                <div style="display:flex;align-items:center;gap:16px;">
                    <span class="card-title"><i class="fas fa-list"></i> 商品列表</span>
                    <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
                        <input type="checkbox" onchange="toggleSelectAllGoods(this.checked)" /> 全选
                    </label>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <div class="batch-actions" style="display:flex;gap:8px;">
                        <button class="btn btn-sm btn-outline" onclick="batchShelfGoods('off_shelf')"><i class="fas fa-arrow-down"></i> 批量下架</button>
                        <button class="btn btn-sm btn-outline" onclick="batchShelfGoods('on_shelf')"><i class="fas fa-arrow-up"></i> 批量上架</button>
                        <button class="btn btn-sm btn-danger" onclick="batchDeleteGoods()"><i class="fas fa-trash"></i> 批量删除</button>
                    </div>
                    <span class="text-muted" style="font-size:13px;">共 ${goods.length} 件商品</span>
                </div>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th><input type="checkbox" onchange="toggleSelectAllGoods(this.checked)" /></th><th>商品</th><th>分类</th><th>品牌</th><th>原价</th><th>SKU数量</th><th>状态</th><th>创建时间</th><th>操作</th></tr></thead>
                    <tbody>
                        ${goods.map(item => `
                            <tr>
                                <td><input type="checkbox" class="goods-checkbox" value="${item.id}" /></td>
                                <td><div class="flex-center"><span style="width:40px;height:40px;background:#e2e8f0;border-radius:6px;display:inline-block;"></span> ${item.name}</div></td>
                                <td>${item.category}${item.subCategory ? `<span style="margin-left:6px;color:#94a3b8;font-size:12px;">/ ${item.subCategory}</span>` : ''}</td>
                                <td>${item.brand}</td>
                                <td>¥${item.originalPrice}</td>
                                <td>${item.skuCount}</td>
                                <td>${getStatusBadge(item.status)}</td>
                                <td>${item.createTime}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline" onclick="showGoodsDetail('${item.id}')"><i class="fas fa-eye"></i> 查看</button>
                                    <button class="btn btn-sm btn-outline" onclick="showEditGoodsModal('${item.id}')"><i class="fas fa-edit"></i> 编辑</button>
                                    <button class="btn btn-sm btn-outline" onclick="handleGoodsAction('${item.id}', 'toggle_shelf')"><i class="fas fa-${item.status === 'on_shelf' ? 'arrow-down' : 'arrow-up'}"></i> ${item.status === 'on_shelf' ? '下架' : '上架'}</button>
                                    <button class="btn btn-sm btn-danger" onclick="handleGoodsAction('${item.id}', 'delete')"><i class="fas fa-trash"></i> 删除</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>

        <div class="row-stretch">
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-sitemap"></i> 商品分类管理</span><button class="btn btn-sm btn-primary" onclick="showAddCategoryModal()"><i class="fas fa-plus"></i> 新增分类</button></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:4px;">
                            ${categoriesData.map(c => `
                                <div class="category-item" draggable="true" ondragstart="handleCategoryDragStart(event, '${c.id}')" ondragover="handleCategoryDragOver(event)" ondrop="handleCategoryDrop(event, '${c.id}')" style="display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:8px;transition:all 0.2s;cursor:move;border:1px solid transparent;" onmouseover="this.style.background='#f8fafc';this.style.borderColor='#e2e8f0'" onmouseout="this.style.background='transparent';this.style.borderColor='transparent'">
                                    <i class="fas fa-grip-vertical" style="color:#94a3b8;font-size:14px;"></i>
                                    <i class="fas fa-chevron-${expandedCategories.has(c.id) ? 'down' : 'right'}" style="color:#94a3b8;font-size:12px;cursor:pointer;" onclick="toggleCategoryExpand('${c.id}')"></i>
                                    <span class="tag primary" style="font-weight:600;">${c.name}</span>
                                    <span style="font-size:12px;color:#64748b;">(${c.goodsCount}件)</span>
                                    <div style="margin-left:auto;display:flex;gap:4px;">
                                        <button class="btn btn-xs btn-primary" onclick="showAddSubCategoryModal('${c.id}')" title="添加子分类"><i class="fas fa-plus"></i></button>
                                        <button class="btn btn-xs btn-outline" onclick="showEditCategoryModal('${c.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-xs btn-danger" onclick="deleteCategory('${c.id}')"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                ${expandedCategories.has(c.id) && c.children.length > 0 ? `
                                    <div style="padding-left:40px;display:flex;flex-direction:column;gap:4px;">
                                        ${c.children.map(sub => `
                                            <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;transition:all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                                                <span class="tag" style="background:#e0e7ff;color:#6366f1;font-weight:400;">${sub.name}</span>
                                                <span style="font-size:12px;color:#94a3b8;">(${sub.goodsCount}件)</span>
                                                <div style="margin-left:auto;display:flex;gap:4px;">
                                                    <button class="btn btn-xs btn-outline" onclick="showEditCategoryModal('${sub.id}')"><i class="fas fa-edit"></i></button>
                                                    <button class="btn btn-xs btn-danger" onclick="deleteSubCategory('${c.id}', '${sub.id}')"><i class="fas fa-trash"></i></button>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-trademark"></i> 商品品牌管理</span><button class="btn btn-sm btn-primary" onclick="showAddBrandModal()"><i class="fas fa-plus"></i> 新增品牌</button></div>
                    <div class="card-body">
                        <div style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${brandsData.map(b => `
                                <div class="brand-item" style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:#f8fafc;border-radius:6px;transition:all 0.2s;" onmouseover="this.style.background='#e2e8f0'">
                                    <span class="tag ${b.goodsCount > 0 ? 'primary' : ''}">${b.name}</span>
                                    <span style="font-size:12px;color:#64748b;">(${b.goodsCount}件)</span>
                                    <div style="display:flex;gap:4px;margin-left:4px;">
                                        <button class="btn btn-xs btn-outline" onclick="showEditBrandModal('${b.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-xs btn-danger" onclick="deleteBrand('${b.id}')"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-cog"></i> 规格管理</span><button class="btn btn-sm btn-primary" onclick="showAddSpecModal()"><i class="fas fa-plus"></i> 新建规格</button></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:8px;">
                            ${specsData.map(s => `
                                <div class="spec-item" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;transition:all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                                    <span class="tag">${s.name}</span>
                                    <span style="font-size:12px;color:#64748b;"> - ${s.values.join('、')}</span>
                                    <div style="margin-left:auto;display:flex;gap:4px;">
                                        <button class="btn btn-xs btn-outline" onclick="showEditSpecModal('${s.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-xs btn-danger" onclick="deleteSpec('${s.id}')"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}