// 商品数据缓存
let goodsData = [];
// 分类数据缓存
let categoriesData = [];
// 品牌数据缓存
let brandsData = [];
// 规格数据缓存
let specsData = [];

// 当前商品筛选条件
let currentGoodsStatusFilter = 'all';      // 状态筛选：all/on_shelf/off_shelf
let currentGoodsCategoryFilter = 'all';    // 分类筛选
let currentGoodsSubCategoryFilter = 'all'; // 子分类筛选
let currentGoodsSearchKeyword = '';        // 搜索关键词

// 加载商品列表数据
async function loadGoods() {
    try {
        // 构建请求参数（空值不传）
        const params = {
            status: currentGoodsStatusFilter === 'all' ? '' : currentGoodsStatusFilter,
            category: currentGoodsCategoryFilter === 'all' ? '' : currentGoodsCategoryFilter,
            subCategory: currentGoodsSubCategoryFilter === 'all' ? '' : currentGoodsSubCategoryFilter,
            keyword: currentGoodsSearchKeyword
        };
        const response = await apiGet(API_CONFIG.goods.list, params);
        // 兼容两种返回格式：{list: []} 或 []
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        // 标准化数据格式
        goodsData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            category: item.category || '',
            subCategory: item.subCategory || '',
            brand: item.brand || '',
            originalPrice: item.originalPrice || 0,
            status: item.status === 1 ? 'on_shelf' : 'off_shelf',
            createTime: item.createdAt || item.createTime || '',
            skuCount: item.skuCount || 0,
            image: item.image || '',
            views: item.views || 0,
            addCartCount: item.addCartCount || 0,
            orderCount: item.orderCount || 0
        }));
        refreshGoodsPage();  // 刷新页面展示
    } catch (error) {
        console.error('Failed to load goods:', error);
    }
}

// 加载商品分类数据
async function loadCategories() {
    try {
        const response = await apiGet(API_CONFIG.goods.categories);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        // 标准化分类数据（支持二级分类）
        categoriesData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            goodsCount: item.goodsCount || 0,
            children: (item.children || []).map(child => ({
                id: child.ID || child.id,
                name: child.name || '',
                goodsCount: child.goodsCount || 0
            }))
        }));
        refreshGoodsPage();
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

// 加载品牌数据
async function loadBrands() {
    try {
        const response = await apiGet(API_CONFIG.goods.brands);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        brandsData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            logo: item.logo || '',
            goodsCount: item.goodsCount || 0
        }));
        refreshGoodsPage();
    } catch (error) {
        console.error('Failed to load brands:', error);
    }
}

// 加载商品规格数据
async function loadSpecs() {
    try {
        const response = await apiGet(API_CONFIG.goods.specs);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        specsData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            values: item.values || []
        }));
        refreshGoodsPage();
    } catch (error) {
        console.error('Failed to load specs:', error);
    }
}

// 设置商品筛选条件
function setGoodsFilter(type, value) {
    if (type === 'status') {
        currentGoodsStatusFilter = value;
    } else if (type === 'category') {
        currentGoodsCategoryFilter = value;
        currentGoodsSubCategoryFilter = 'all';  // 切换分类时重置子分类
    } else if (type === 'subcategory') {
        currentGoodsSubCategoryFilter = value;
    } else if (type === 'keyword') {
        currentGoodsSearchKeyword = value;
    }
    refreshGoodsPage();
}

// 新增/编辑商品的临时数据缓存（用于表单草稿）
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

// 获取商品状态标签HTML
function getStatusBadge(status) {
    const colors = { on_shelf: 'green', off_shelf: 'gray' };
    const texts = { on_shelf: '上架', off_shelf: '下架' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 根据当前筛选条件过滤商品列表
function filterGoods() {
    let filtered = goodsData;
    // 状态筛选
    if (currentGoodsStatusFilter !== 'all') {
        filtered = filtered.filter(g => g.status === currentGoodsStatusFilter);
    }
    // 分类筛选
    if (currentGoodsCategoryFilter !== 'all') {
        filtered = filtered.filter(g => g.category === currentGoodsCategoryFilter);
    }
    // 子分类筛选
    if (currentGoodsSubCategoryFilter !== 'all') {
        filtered = filtered.filter(g => g.subCategory === currentGoodsSubCategoryFilter);
    }
    // 关键词搜索（支持商品名、ID、分类、品牌）
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

// 执行商品搜索（从搜索框获取关键词）
function searchGoods() {
    const input = document.getElementById('goodsSearchInput');
    if (input) {
        currentGoodsSearchKeyword = input.value.trim();
        refreshGoodsPage();
    }
}

// 处理商品操作（上架/下架/删除）
function handleGoodsAction(goodsId, action) {
    const goods = goodsData.find(g => g.id === goodsId);
    if (!goods) return;
    
    if (action === 'toggle_shelf') {
        // 切换上下架状态
        goods.status = goods.status === 'on_shelf' ? 'off_shelf' : 'on_shelf';
        refreshGoodsPage();
    } else if (action === 'delete') {
        // 删除商品（需确认）
        showConfirm(`确定删除商品 ${goods.name} 吗？`, function() {
            goodsData = goodsData.filter(g => g.id !== goodsId);
            refreshGoodsPage();
        });
    }
}

// 全选/取消全选商品列表
function toggleSelectAllGoods(checked) {
    document.querySelectorAll('.goods-checkbox').forEach(cb => cb.checked = checked);
}

// 批量上下架商品
function batchShelfGoods(status) {
    const checked = document.querySelectorAll('.goods-checkbox:checked');
    if (checked.length === 0) {
        showToast('请先选择要操作的商品', 'error');
        return;
    }
    const ids = Array.from(checked).map(cb => cb.value);
    // 更新选中商品的状态
    ids.forEach(id => {
        const goods = goodsData.find(g => g.id === id);
        if (goods) {
            goods.status = status;
        }
    });
    showToast(`已${status === 'off_shelf' ? '下架' : '上架'} ${ids.length} 件商品`, 'success');
    refreshGoodsPage();
}

// 批量删除商品（需确认）
function batchDeleteGoods() {
    const checked = document.querySelectorAll('.goods-checkbox:checked');
    if (checked.length === 0) {
        showToast('请先选择要操作的商品', 'error');
        return;
    }
    const ids = Array.from(checked).map(cb => cb.value);
    showConfirm(`确定删除选中的 ${checked.length} 件商品吗？此操作不可恢复。`, function() {
        goodsData = goodsData.filter(g => !ids.includes(g.id));
        showToast(`已删除 ${ids.length} 件商品`, 'success');
        refreshGoodsPage();
    });
}

// 显示商品详情弹窗
function showGoodsDetail(goodsId) {
    const goods = goodsData.find(g => g.id === goodsId);
    if (!goods) return;
    
    // 计算转化率（订单数/浏览量）
    const conversionRate = goods.views > 0 ? ((goods.orderCount / goods.views) * 100).toFixed(2) : '0.00';
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-md">
            <div class="modal-header">
                <h3><i class="fas fa-box"></i> 商品详情</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body modal-body-scroll">
                <div class="detail-grid">
                    <div class="detail-card">
                        <div class="detail-label">商品名称</div>
                        <div class="detail-value">${goods.name}</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">商品状态</div>
                        <div>${getStatusBadge(goods.status)}</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">分类</div>
                        <div class="detail-value">${goods.category}</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">品牌</div>
                        <div class="detail-value">${goods.brand}</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">原价</div>
                        <div class="detail-value price">¥${goods.originalPrice}</div>
                    </div>
                    <div class="detail-card">
                        <div class="detail-label">SKU数量</div>
                        <div class="detail-value">${goods.skuCount}</div>
                    </div>
                </div>
                
                <div class="data-analysis-section">
                    <div class="data-analysis-title">数据分析</div>
                    <div class="data-analysis-grid">
                        <div class="data-analysis-card">
                            <div class="value views">${goods.views.toLocaleString()}</div>
                            <div class="label">浏览量</div>
                        </div>
                        <div class="data-analysis-card">
                            <div class="value orders">${goods.orderCount.toLocaleString()}</div>
                            <div class="label">成交订单</div>
                        </div>
                        <div class="data-analysis-card">
                            <div class="value rate">${conversionRate}%</div>
                            <div class="label">转化率</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="data-analysis-title">SKU列表</div>
                    <div class="table-box">
                        <div class="table-box-header">
                            <div class="table-box-col flex">SKU编码</div>
                            <div class="table-box-col flex">规格</div>
                            <div class="table-box-col right">售价</div>
                            <div class="table-box-col right">库存</div>
                        </div>
                        ${[1,2,3,4].map(i => `
                            <div class="table-box-row">
                                <div class="table-box-col flex">SKU-${String(goods.id.split('-')[1]).padStart(3,'0')}-${String(i).padStart(2,'0')}</div>
                                <div class="table-box-col flex">${['黑色','白色','红色','蓝色'][i-1]}</div>
                                <div class="table-box-col right bold">¥${goods.originalPrice}</div>
                                <div class="table-box-col right">${[840,400,0,230][i-1]}</div>
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
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-lg">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增商品</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body modal-body-scroll">
                <div class="step-indicator">
                    <div class="step-indicator-inner">
                        <div class="step-item ${goodsAddStep === 1 ? 'active' : ''}" onclick="setGoodsStep(1)">
                            <div class="step-circle">1</div>
                            <div class="step-label">基础信息</div>
                        </div>
                        <div class="step-divider ${goodsAddStep > 1 ? 'active' : ''}"></div>
                        <div class="step-item ${goodsAddStep === 2 ? 'active' : ''}" onclick="setGoodsStep(2)">
                            <div class="step-circle">2</div>
                            <div class="step-label">规格设置</div>
                        </div>
                        <div class="step-divider ${goodsAddStep > 2 ? 'active' : ''}"></div>
                        <div class="step-item ${goodsAddStep === 3 ? 'active' : ''}" onclick="setGoodsStep(3)">
                            <div class="step-circle">3</div>
                            <div class="step-label">SKU配置</div>
                        </div>
                    </div>
                </div>
                
                <div id="goodsAddForm">
                    ${goodsAddStep === 1 ? `
                        <div class="form-grid">
                            <div><label class="form-label">商品名称 <span class="form-required">*</span></label><input type="text" placeholder="请输入商品名称" class="form-input" /></div>
                            <div><label class="form-label">品牌</label><select class="form-select"><option>请选择品牌</option><option>华为</option><option>苹果</option><option>小米</option><option>索尼</option><option>三星</option><option>美的</option></select></div>
                            <div><label class="form-label">分类 <span class="form-required">*</span></label><select class="form-select"><option>请选择分类</option><option>手机数码</option><option>家用电器</option><option>服装服饰</option><option>运动户外</option><option>美妆护肤</option></select></div>
                            <div><label class="form-label">原价 <span class="form-required">*</span></label><input type="number" placeholder="请输入原价" class="form-input" /></div>
                            <div class="form-grid-full"><label class="form-label">商品描述</label><textarea rows="3" placeholder="请输入商品描述" class="form-textarea"></textarea></div>
                            <div><label class="form-label">主图</label><div class="form-upload-area"><i class="fas fa-upload"></i><div class="upload-text">点击上传主图</div></div></div>
                            <div><label class="form-label">轮播图</label><div class="form-upload-area"><i class="fas fa-images"></i><div class="upload-text">点击上传轮播图</div></div></div>
                            <div class="form-grid-full"><label class="form-label">初始状态</label><div class="form-radio-group"><label class="form-radio-label"><input type="radio" name="initialStatus" checked />下架（默认）</label><label class="form-radio-label"><input type="radio" name="initialStatus" />上架</label></div></div>
                        </div>
                    ` : goodsAddStep === 2 ? `
                        <div>
                            <div class="flex-between mb-3">
                                <div class="section-title">规格列表</div>
                                <button class="btn btn-sm btn-primary" onclick="addGoodsSpec()"><i class="fas fa-plus"></i> 添加规格</button>
                            </div>
                            <div id="specList" class="flex-col gap-3">
                                ${tempGoodsData.specs.length > 0 ? tempGoodsData.specs.map((spec, i) => {
                                    const specDef = specsData.find(s => s.name === spec.name);
                                    return `
                                    <div class="flex gap-3 items-start">
                                        <select class="form-select flex-1" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}" ${s.name === spec.name ? 'selected' : ''}>${s.name}</option>`).join('')}
                                        </select>
                                        <div class="flex-2">
                                            ${specDef ? specDef.values.map(v => `<label class="form-checkbox-label"><input type="checkbox" value="${v}" ${spec.values.includes(v) ? 'checked' : ''} />${v}</label>`).join('') : '<div class="text-muted">请选择规格</div>'}
                                        </div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}).join('') : `
                                    <div class="flex gap-3 items-start">
                                        <select class="form-select flex-1" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                                        </select>
                                        <div class="flex-2"><div class="text-muted">请选择规格</div></div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}
                            </div>
                            <div class="info-box">
                                <i class="fas fa-info-circle"></i>
                                系统将自动计算规格组合的笛卡尔积，用于下一步SKU配置
                            </div>
                        </div>
                    ` : `
                        <div>
                            <div class="section-title">SKU配置</div>
                            <div class="table-box">
                                <div class="table-box-header">
                                    <div class="table-box-col flex">规格组合</div>
                                    <div class="table-box-col right sku-price-col">售价</div>
                                    <div class="table-box-col right sku-stock-col">库存</div>
                                </div>
                                <div id="skuList">
                                    ${tempGoodsData.skus.length > 0 ? tempGoodsData.skus.map((sku, i) => `
                                        <div class="table-box-row">
                                            <div class="table-box-col flex">${sku.spec}</div>
                                            <div class="table-box-col right sku-price-col"><input type="number" value="${sku.price}" class="sku-input" /></div>
                                            <div class="table-box-col right sku-stock-col"><input type="number" value="${sku.stock}" class="sku-input" /></div>
                                        </div>
                                    `).join('') : `
                                        <div class="empty-info">
                                            <i class="fas fa-info-circle"></i>
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
        const inputs = document.querySelectorAll('#goodsAddForm input[type="text"], #goodsAddForm input[type="number"]');
        const nameInput = inputs[0];
        const priceInput = inputs[1];
        const selects = document.querySelectorAll('#goodsAddForm select');
        const brandInput = selects[0];
        const categoryInput = selects[1];
        const descInput = document.querySelector('#goodsAddForm textarea');
        const statusInputs = document.querySelectorAll('input[name="initialStatus"]');
        
        tempGoodsData.name = nameInput?.value || '';
        tempGoodsData.originalPrice = priceInput?.value ? parseInt(priceInput.value) : 0;
        tempGoodsData.brand = brandInput?.value === '请选择品牌' ? '' : brandInput?.value || '';
        tempGoodsData.category = categoryInput?.value === '请选择分类' ? '' : categoryInput?.value || '';
        tempGoodsData.description = descInput?.value || '';
        tempGoodsData.status = Array.from(statusInputs).find(i => i.checked)?.nextElementSibling?.textContent?.includes('上架') ? 'on_shelf' : 'off_shelf';
        
        if (!tempGoodsData.name) {
            showToast('请输入商品名称', 'error');
            return;
        }
        if (!tempGoodsData.category) {
            showToast('请选择商品分类', 'error');
            return;
        }
        if (!tempGoodsData.originalPrice || isNaN(tempGoodsData.originalPrice)) {
            showToast('请输入正确的原价', 'error');
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
            <div class="flex gap-3 items-start">
                <select class="form-select flex-1" onchange="updateSpecValues(this)">
                    <option value="">请选择规格</option>
                    ${specsData.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                </select>
                <div class="flex-2"><div class="text-muted">请选择规格</div></div>
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
            valueDiv.innerHTML = spec.values.map(v => `<label class="form-checkbox-label"><input type="checkbox" value="${v}" />${v}</label>`).join('');
        } else {
            valueDiv.innerHTML = '<div class="text-muted">请选择规格</div>';
        }
    } else if (valueDiv) {
        valueDiv.innerHTML = '<div class="text-muted">请选择规格</div>';
    }
}

function removeGoodsSpec(btn) {
    btn.parentElement.remove();
}

function saveGoods() {
    const name = tempGoodsData.name;
    const brand = tempGoodsData.brand;
    const category = tempGoodsData.category;
    const description = tempGoodsData.description;
    const status = tempGoodsData.status;
    
    const skuRows = document.querySelectorAll('#goodsAddForm #skuList > div');
    let price = tempGoodsData.originalPrice || 0;
    if (skuRows.length > 0) {
        const firstPriceInput = skuRows[0].querySelector('input[type="number"]');
        if (firstPriceInput && firstPriceInput.value) {
            price = parseInt(firstPriceInput.value);
        }
    }
    
    if (!name) {
        showToast('请输入商品名称', 'error');
        return;
    }
    if (!category) {
        showToast('请选择商品分类', 'error');
        return;
    }
    if (!price || isNaN(price)) {
        showToast('请输入正确的原价', 'error');
        return;
    }
    
    const specs = tempGoodsData.specs || [];
    
    const skus = [];
    if (skuRows.length > 0) {
        skuRows.forEach((row, index) => {
            const inputs = row.querySelectorAll('input[type="number"]');
            const specDiv = row.querySelector('div:first-child');
            const specText = specDiv?.textContent || (tempGoodsData.skus[index]?.spec || '');
            const skuPrice = parseInt(inputs[0]?.value) || price;
            const skuStock = parseInt(inputs[1]?.value) || 100;
            skus.push({ 
                code: `SKU-${String(Date.now()).slice(-6)}-${String(index + 1).padStart(2, '0')}`, 
                spec: specText, 
                price: skuPrice, 
                stock: skuStock 
            });
        });
    } else {
        skus.push({ 
            code: `SKU-${String(Date.now()).slice(-6)}-01`, 
            spec: '默认规格', 
            price: price, 
            stock: 100 
        });
    }
    
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
    
    showToast('商品保存成功！', 'success');
    closeGoodsDetail();
    refreshGoodsPage();
}

function showEditGoodsModal(goodsId) {
    const goods = goodsData.find(g => g.id === goodsId);
    if (!goods) return;
    
    closeGoodsDetail();
    goodsAddStep = 1;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-lg">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑商品</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body modal-body-scroll">
                <div class="step-indicator">
                    <div class="step-indicator-inner">
                        <div class="step-item ${goodsAddStep === 1 ? 'active' : ''}" onclick="setGoodsStep(1)">
                            <div class="step-circle">1</div>
                            <div class="step-label">基础信息</div>
                        </div>
                        <div class="step-divider ${goodsAddStep > 1 ? 'active' : ''}"></div>
                        <div class="step-item ${goodsAddStep === 2 ? 'active' : ''}" onclick="setGoodsStep(2)">
                            <div class="step-circle">2</div>
                            <div class="step-label">规格设置</div>
                        </div>
                        <div class="step-divider ${goodsAddStep > 2 ? 'active' : ''}"></div>
                        <div class="step-item ${goodsAddStep === 3 ? 'active' : ''}" onclick="setGoodsStep(3)">
                            <div class="step-circle">3</div>
                            <div class="step-label">SKU配置</div>
                        </div>
                    </div>
                </div>
                
                <div id="goodsAddForm">
                    ${goodsAddStep === 1 ? `
                        <div class="form-grid">
                            <div><label class="form-label">商品名称 <span class="form-required">*</span></label><input type="text" id="editGoodsName" value="${goods.name}" placeholder="请输入商品名称" class="form-input" /></div>
                            <div><label class="form-label">品牌</label>
                                <select id="editGoodsBrand" class="form-select">
                                    <option>请选择品牌</option>
                                    ${brandsData.map(b => `<option value="${b.name}" ${b.name === goods.brand ? 'selected' : ''}>${b.name}</option>`).join('')}
                                </select>
                            </div>
                            <div><label class="form-label">分类 <span class="form-required">*</span></label>
                                <select id="editGoodsCategory" class="form-select">
                                    <option>请选择分类</option>
                                    ${categoriesData.map(c => `<option value="${c.name}" ${c.name === goods.category ? 'selected' : ''}>${c.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-grid-full"><label class="form-label">商品描述</label><textarea id="editGoodsDesc" rows="3" placeholder="请输入商品描述" class="form-textarea"></textarea></div>
                            <div><label class="form-label">主图</label><div class="form-upload-area"><i class="fas fa-image"></i><div class="upload-text">已有图片</div></div></div>
                            <div><label class="form-label">轮播图</label><div class="form-upload-area"><i class="fas fa-images"></i><div class="upload-text">已有图片</div></div></div>
                            <div class="form-grid-full"><label class="form-label">商品状态</label><div class="form-radio-group">
                                <label class="form-radio-label"><input type="radio" name="editGoodsStatus" value="on_shelf" ${goods.status === 'on_shelf' ? 'checked' : ''} />上架</label>
                                <label class="form-radio-label"><input type="radio" name="editGoodsStatus" value="off_shelf" ${goods.status === 'off_shelf' ? 'checked' : ''} />下架</label>
                            </div></div>
                        </div>
                    ` : goodsAddStep === 2 ? `
                        <div>
                            <div class="flex-between mb-3">
                                <div class="section-title">规格列表</div>
                                <button class="btn btn-sm btn-primary" onclick="addGoodsSpec()"><i class="fas fa-plus"></i> 添加规格</button>
                            </div>
                            <div id="specList" class="flex-col gap-3">
                                ${tempGoodsData.specs.length > 0 ? tempGoodsData.specs.map((spec, i) => {
                                    const specDef = specsData.find(s => s.name === spec.name);
                                    return `
                                    <div class="flex gap-3 items-start">
                                        <select class="form-select flex-1" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}" ${s.name === spec.name ? 'selected' : ''}>${s.name}</option>`).join('')}
                                        </select>
                                        <div class="flex-2">
                                            ${specDef ? specDef.values.map(v => `<label class="form-checkbox-label"><input type="checkbox" value="${v}" ${spec.values.includes(v) ? 'checked' : ''} />${v}</label>`).join('') : '<div class="text-muted">请选择规格</div>'}
                                        </div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}).join('') : `
                                    <div class="flex gap-3 items-start">
                                        <select class="form-select flex-1" onchange="updateSpecValues(this)">
                                            <option value="">请选择规格</option>
                                            ${specsData.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                                        </select>
                                        <div class="flex-2"><div class="text-muted">请选择规格</div></div>
                                        <button class="btn btn-sm btn-outline" onclick="removeGoodsSpec(this)"><i class="fas fa-times"></i></button>
                                    </div>
                                `}
                            </div>
                            <div class="info-box">
                                <i class="fas fa-info-circle"></i>
                                系统将自动计算规格组合的笛卡尔积，用于下一步SKU配置
                            </div>
                        </div>
                    ` : `
                        <div>
                            <div class="section-title mb-2">SKU配置</div>
                            <div class="table-box">
                                <div class="table-box-header">
                                    <div class="table-box-col flex">SKU编码</div>
                                    <div class="table-box-col flex">规格组合</div>
                                    <div class="table-box-col right sku-price-col">售价</div>
                                    <div class="table-box-col right sku-stock-col">库存</div>
                                </div>
                                ${(goods.skus && goods.skus.length > 0) ? goods.skus.map((sku, i) => `
                                    <div class="table-box-row">
                                        <div class="table-box-col flex"><input type="text" value="${sku.code}" class="sku-input" /></div>
                                        <div class="table-box-col flex text-muted">${sku.spec}</div>
                                        <div class="table-box-col right sku-price-col"><input type="number" value="${sku.price || goods.originalPrice}" class="sku-input" /></div>
                                        <div class="table-box-col right sku-stock-col"><input type="number" value="${sku.stock || 100}" class="sku-input" /></div>
                                    </div>
                                `).join('') : `
                                    <div class="empty-info">
                                        <i class="fas fa-info-circle"></i>
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
        showToast('请输入商品名称', 'error');
        return;
    }
    if (!category) {
        showToast('请选择商品分类', 'error');
        return;
    }
    if (!price || isNaN(price)) {
        showToast('请输入正确的原价', 'error');
        return;
    }
    
    goods.name = name;
    goods.brand = brand || '';
    goods.category = category;
    goods.originalPrice = parseInt(price);
    goods.status = status || goods.status;
    
    showToast('商品修改成功！', 'success');
    closeGoodsDetail();
    refreshGoodsPage();
}

function showAddCategoryModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增分类</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="flex-col gap-3">
                    <div>
                        <label class="form-label">分类名称 <span class="form-required">*</span></label>
                        <input type="text" id="newCategoryName" placeholder="请输入分类名称，如：手机数码" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">分类图标</label>
                        <div class="flex" class="gap-2">
                            ${['fa-box', 'fa-mobile-alt', 'fa-home', 'fa-shirt', 'fa-heart', 'fa-gamepad', 'fa-glass-water', 'fa-book'].map(icon => `
                                <div class="icon-option ${icon === 'fa-box' ? 'selected' : ''}" onclick="selectCategoryIcon('${icon}', this)">
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
        showToast('请输入分类名称', 'error');
        return;
    }
    
    const exists = categoriesData.find(c => c.name === name);
    if (exists) {
        showToast('该分类名称已存在', 'error');
        return;
    }
    
    categoriesData.push({
        id: 'cat-' + String(categoriesData.length + 1).padStart(3, '0'),
        name: name,
        goodsCount: 0,
        children: []
    });
    
    showToast('分类添加成功！', 'success');
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
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增子分类</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="flex-col gap-3">
                    <div>
                        <label class="form-label">子类名称 <span class="form-required">*</span></label>
                        <input type="text" id="newSubCategoryName" placeholder="请输入子类名称" class="form-input" />
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
        showToast('请输入子类名称', 'error');
        return;
    }
    
    const parent = categoriesData.find(c => c.id === parentId);
    if (!parent) return;
    
    const exists = parent.children.find(c => c.name === name);
    if (exists) {
        showToast('该子类名称已存在', 'error');
        return;
    }
    
    const subId = 'sub-' + String(Date.now()).slice(-3);
    parent.children.push({
        id: subId,
        name: name,
        goodsCount: 0
    });
    
    showToast('子分类添加成功！', 'success');
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
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增品牌</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="flex-col gap-3">
                    <div>
                        <label class="form-label">品牌名称 <span class="form-required">*</span></label>
                        <input type="text" id="newBrandName" placeholder="请输入品牌名称，如：华为" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">品牌Logo</label>
                        <div class="form-upload-area" onclick="document.getElementById('brandLogoInput').click()">
                            <i class="fas fa-upload"></i>
                            <div class="upload-text">点击上传Logo</div>
                            <div class="text-muted-sm">支持 JPG、PNG 格式，建议尺寸 100x100</div>
                        </div>
                        <input type="file" id="brandLogoInput" accept="image/*" class="hidden" />
                    </div>
                    <div>
                        <label class="form-label">品牌简介</label>
                        <textarea id="newBrandDesc" rows="3" placeholder="请输入品牌简介" class="form-textarea"></textarea>
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
        showToast('请输入品牌名称', 'error');
        return;
    }
    
    const exists = brandsData.find(b => b.name === name);
    if (exists) {
        showToast('该品牌名称已存在', 'error');
        return;
    }
    
    brandsData.push({
        id: 'brand-' + String(brandsData.length + 1).padStart(3, '0'),
        name: name,
        logo: '',
        goodsCount: 0
    });
    
    showToast('品牌添加成功！', 'success');
    closeGoodsDetail();
    refreshGoodsPage();
}

function showAddSpecModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-md">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新建规格</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="flex-col gap-3">
                    <div>
                        <label class="form-label">规格名称 <span class="form-required">*</span></label>
                        <input type="text" id="newSpecName" placeholder="请输入规格名称，如：颜色" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">规格值 <span class="form-required">*</span></label>
                        <input type="text" id="newSpecValues" placeholder="请输入规格值，多个值用英文逗号分隔，如：红,蓝,白,黑" class="form-input" />
                        <div class="text-muted-sm">提示：输入完成后会自动解析并展示</div>
                    </div>
                    <div id="specValuesPreview" class="hidden">
                        <label class="form-label">规格值预览</label>
                        <div id="specValuesTags" class="flex flex-wrap gap-2"></div>
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
                preview.classList.remove('hidden');
                tags.innerHTML = values.map(v => `<span class="tag primary">${v}</span>`).join('');
            } else {
                preview.classList.add('hidden');
            }
        };
    }
}

function saveSpec() {
    const name = document.getElementById('newSpecName')?.value?.trim();
    const valuesInput = document.getElementById('newSpecValues')?.value?.trim();
    
    if (!name) {
        showToast('请输入规格名称', 'error');
        return;
    }
    if (!valuesInput) {
        showToast('请输入规格值', 'error');
        return;
    }
    
    const values = valuesInput.split(',').map(v => v.trim()).filter(v => v);
    if (values.length === 0) {
        showToast('请输入有效的规格值', 'error');
        return;
    }
    
    const exists = specsData.find(s => s.name === name);
    if (exists) {
        showToast('该规格名称已存在', 'error');
        return;
    }
    
    specsData.push({
        id: 'spec-' + String(specsData.length + 1).padStart(3, '0'),
        name: name,
        values: values
    });
    
    showToast('规格添加成功！', 'success');
    closeGoodsDetail();
    refreshGoodsPage();
}

function deleteCategory(catId) {
    const cat = categoriesData.find(c => c.id === catId);
    if (!cat) return;
    
    if (cat.goodsCount > 0) {
        showToast(`该分类下还有 ${cat.goodsCount} 件商品，无法删除！`, 'error');
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
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑分类</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div>
                    <label class="form-label">分类名称 <span class="form-required">*</span></label>
                    <input type="text" id="editCatName" value="${cat.name}" class="form-input" />
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
        showToast('请输入分类名称', 'error');
        return;
    }
    
    if (parent) {
        const exists = parent.children.find(c => c.id !== catId && c.name === name);
        if (exists) {
            showToast('该子分类名称已存在', 'error');
            return;
        }
    } else {
        const exists = categoriesData.find(c => c.id !== catId && c.name === name);
        if (exists) {
            showToast('该分类名称已存在', 'error');
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
    
    showToast('分类修改成功！', 'success');
    closeGoodsDetail();
    refreshGoodsPage();
}

function deleteBrand(brandId) {
    const brand = brandsData.find(b => b.id === brandId);
    if (!brand) return;
    
    if (brand.goodsCount > 0) {
        showToast(`该品牌下还有 ${brand.goodsCount} 件商品，无法删除！`, 'error');
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
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-sm">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑品牌</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div>
                    <label class="form-label">品牌名称 <span class="form-required">*</span></label>
                    <input type="text" id="editBrandName" value="${brand.name}" class="form-input" />
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
        showToast('请输入品牌名称', 'error');
        return;
    }
    
    const exists = brandsData.find(b => b.id !== brandId && b.name === name);
    if (exists) {
        showToast('该品牌名称已存在', 'error');
        return;
    }
    
    const oldName = brand.name;
    brand.name = name;
    
    goodsData.forEach(g => {
        if (g.brand === oldName) {
            g.brand = name;
        }
    });
    
    showToast('品牌修改成功！', 'success');
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
        <div class="modal-overlay" onclick="closeGoodsDetail()"></div>
        <div class="modal-content modal-width-md">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑规格</h3>
                <button onclick="closeGoodsDetail()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="flex-col gap-3">
                    <div>
                        <label class="form-label">规格名称 <span class="form-required">*</span></label>
                        <input type="text" id="editSpecName" value="${spec.name}" class="form-input" />
                    </div>
                    <div>
                        <label class="form-label">规格值 <span class="form-required">*</span></label>
                        <input type="text" id="editSpecValues" value="${spec.values.join(',')}" placeholder="多个值用英文逗号分隔" class="form-input" />
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
        showToast('请输入规格名称', 'error');
        return;
    }
    if (!valuesInput) {
        showToast('请输入规格值', 'error');
        return;
    }
    
    const values = valuesInput.split(',').map(v => v.trim()).filter(v => v);
    if (values.length === 0) {
        showToast('请输入有效的规格值', 'error');
        return;
    }
    
    const exists = specsData.find(s => s.id !== specId && s.name === name);
    if (exists) {
        showToast('该规格名称已存在', 'error');
        return;
    }
    
    spec.name = name;
    spec.values = values;
    
    showToast('规格修改成功！', 'success');
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
                <div class="flex items-center gap-4">
                    <span class="card-title"><i class="fas fa-list"></i> 商品列表</span>
                    <label class="form-checkbox-label">
                        <input type="checkbox" onchange="toggleSelectAllGoods(this.checked)" /> 全选
                    </label>
                </div>
                <div class="flex items-center gap-3">
                    <div class="batch-actions flex gap-2">
                        <button class="btn btn-sm btn-outline" onclick="batchShelfGoods('off_shelf')"><i class="fas fa-arrow-down"></i> 批量下架</button>
                        <button class="btn btn-sm btn-outline" onclick="batchShelfGoods('on_shelf')"><i class="fas fa-arrow-up"></i> 批量上架</button>
                        <button class="btn btn-sm btn-danger" onclick="batchDeleteGoods()"><i class="fas fa-trash"></i> 批量删除</button>
                    </div>
                    <span class="text-muted">共 ${goods.length} 件商品</span>
                </div>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th><input type="checkbox" onchange="toggleSelectAllGoods(this.checked)" /></th><th>商品</th><th>分类</th><th>品牌</th><th>原价</th><th>SKU数量</th><th>状态</th><th>创建时间</th><th>操作</th></tr></thead>
                    <tbody>
                        ${goods.map(item => `
                            <tr>
                                <td><input type="checkbox" class="goods-checkbox" value="${item.id}" /></td>
                                <td><div class="flex-center"><span class="placeholder-img"></span> ${item.name}</div></td>
                                <td>${item.category}${item.subCategory ? `<span class="text-muted" class="ml-1">/ ${item.subCategory}</span>` : ''}</td>
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
                <div class="card flex-1">
                    <div class="card-header"><span class="card-title"><i class="fas fa-sitemap"></i> 商品分类管理</span><button class="btn btn-sm btn-primary" onclick="showAddCategoryModal()"><i class="fas fa-plus"></i> 新增分类</button></div>
                    <div class="card-body">
                        <div class="flex-col gap-1">
                            ${categoriesData.map(c => `
                                <div class="category-item" draggable="true" ondragstart="handleCategoryDragStart(event, '${c.id}')" ondragover="handleCategoryDragOver(event)" ondrop="handleCategoryDrop(event, '${c.id}')">
                                    <i class="fas fa-grip-vertical grip-icon"></i>
                                    <i class="fas fa-chevron-${expandedCategories.has(c.id) ? 'down' : 'right'} chevron-icon" onclick="toggleCategoryExpand('${c.id}')"></i>
                                    <span class="tag primary">${c.name}</span>
                                    <span class="item-count">(${c.goodsCount}件)</span>
                                    <div class="ml-auto flex gap-2">
                                        <button class="btn btn-xs btn-primary" onclick="showAddSubCategoryModal('${c.id}')" title="添加子分类"><i class="fas fa-plus"></i></button>
                                        <button class="btn btn-xs btn-outline" onclick="showEditCategoryModal('${c.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-xs btn-danger" onclick="deleteCategory('${c.id}')"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                                ${expandedCategories.has(c.id) && c.children.length > 0 ? `
                                    <div class="category-sub-list">
                                        ${c.children.map(sub => `
                                            <div class="category-sub-item">
                                                <span class="tag primary">${sub.name}</span>
                                                <span class="text-muted">(${sub.goodsCount}件)</span>
                                                <div class="ml-auto flex gap-2">
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
                <div class="card flex-1">
                    <div class="card-header"><span class="card-title"><i class="fas fa-trademark"></i> 商品品牌管理</span><button class="btn btn-sm btn-primary" onclick="showAddBrandModal()"><i class="fas fa-plus"></i> 新增品牌</button></div>
                    <div class="card-body">
                        <div class="flex flex-wrap gap-2">
                            ${brandsData.map(b => `
                                <div class="brand-item">
                                    <span class="tag ${b.goodsCount > 0 ? 'primary' : ''}">${b.name}</span>
                                    <span class="item-count">(${b.goodsCount}件)</span>
                                    <div class="flex gap-2 ml-05">
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
                <div class="card flex-1">
                    <div class="card-header"><span class="card-title"><i class="fas fa-cog"></i> 规格管理</span><button class="btn btn-sm btn-primary" onclick="showAddSpecModal()"><i class="fas fa-plus"></i> 新建规格</button></div>
                    <div class="card-body">
                        <div class="flex-col" class="gap-2">
                            ${specsData.map(s => `
                                <div class="spec-item">
                                    <span class="tag">${s.name}</span>
                                    <span class="text-muted"> - ${s.values.join('、')}</span>
                                    <div class="ml-auto flex gap-2">
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