// 搜索历史记录
let searchHistory = [];
// 收藏的搜索关键词
let searchFavorites = [];

// 从本地存储加载搜索设置
function loadSearchSettings() {
    const savedHistory = localStorage.getItem('search_history');
    const savedFavorites = localStorage.getItem('search_favorites');
    
    if (savedHistory) {
        try {
            searchHistory = JSON.parse(savedHistory);
        } catch (e) {
            searchHistory = [];  // 解析失败清空
        }
    }
    
    if (savedFavorites) {
        try {
            searchFavorites = JSON.parse(savedFavorites);
        } catch (e) {
            searchFavorites = [];  // 解析失败清空
        }
    }
}

// 保存搜索设置到本地存储
function saveSearchSettings() {
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
    localStorage.setItem('search_favorites', JSON.stringify(searchFavorites));
}

// 添加搜索历史（去重，最多保存10条）
function addSearchHistory(query) {
    searchHistory = searchHistory.filter(q => q !== query);  // 去重
    searchHistory.unshift(query);  // 插入到开头
    if (searchHistory.length > 10) {
        searchHistory.pop();  // 超过10条删除最早的
    }
    saveSearchSettings();
}

// 切换搜索关键词收藏状态
function toggleSearchFavorite(query) {
    const index = searchFavorites.indexOf(query);
    if (index > -1) {
        searchFavorites.splice(index, 1);  // 取消收藏
    } else {
        searchFavorites.push(query);  // 添加收藏
    }
    saveSearchSettings();
}

// 构建搜索索引（从各模块数据中提取可搜索字段）
function buildSearchIndex() {
    const index = { goods: [], orders: [], users: [], stores: [], coupons: [], reviews: [] };
    
    // 商品数据索引
    if (typeof goodsData !== 'undefined') {
        goodsData.forEach(g => {
            index.goods.push({ id: g.id, name: g.name, type: 'goods', category: g.category, brand: g.brand });
        });
    }
    
    // 订单数据索引
    if (typeof ordersData !== 'undefined') {
        ordersData.forEach(o => {
            index.orders.push({ id: o.id, name: o.userName, type: 'orders', phone: o.phone, status: o.status });
        });
    }
    
    // 用户数据索引
    if (typeof usersData !== 'undefined') {
        usersData.forEach(u => {
            index.users.push({ id: u.id, name: u.userName, type: 'users', phone: u.phone });
        });
    }
    
    // 门店数据索引
    if (typeof storesData !== 'undefined') {
        storesData.forEach(s => {
            index.stores.push({ id: s.id, name: s.name, type: 'stores', address: s.address });
        });
    }
    
    // 优惠券数据索引
    if (typeof couponsData !== 'undefined') {
        couponsData.forEach(c => {
            index.coupons.push({ id: c.id, name: c.name, type: 'coupons' });
        });
    }
    
    // 评价数据索引
    if (typeof reviewsData !== 'undefined') {
        reviewsData.forEach(r => {
            index.reviews.push({ id: r.id, name: r.goodsName, type: 'reviews', userName: r.userName });
        });
    }
    
    return index;
}

// 在所有模块中搜索（支持名称、手机号、ID、分类、品牌等字段）
function searchAll(query) {
    const index = buildSearchIndex();
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    // 遍历各类型数据进行匹配
    Object.keys(index).forEach(type => {
        const matched = index[type].filter(item => {
            return item.name.toLowerCase().includes(lowerQuery) ||
                   (item.phone && item.phone.includes(query)) ||  // 手机号不转小写
                   item.id.toLowerCase().includes(lowerQuery) ||
                   (item.category && item.category.toLowerCase().includes(lowerQuery)) ||
                   (item.brand && item.brand.toLowerCase().includes(lowerQuery)) ||
                   (item.userName && item.userName.toLowerCase().includes(lowerQuery));
        });
        if (matched.length > 0) {
            results.push({ type: type, items: matched.slice(0, 10) });  // 每种类型最多返回10条
        }
    });
    
    return results;
}

// 获取搜索类型的中文标签
function getTypeLabel(type) {
    const labels = {
        goods: '商品',
        orders: '订单',
        users: '用户',
        stores: '门店',
        coupons: '优惠券',
        reviews: '评价'
    };
    return labels[type] || type;
}

// 获取搜索类型的图标类名
function getTypeIcon(type) {
    const icons = {
        goods: 'fas fa-box',
        orders: 'fas fa-shopping-bag',
        users: 'fas fa-user',
        stores: 'fas fa-store',
        coupons: 'fas fa-ticket-alt',
        reviews: 'fas fa-star'
    };
    return icons[type] || 'fas fa-search';
}

// 获取搜索类型的颜色值
function getTypeColor(type) {
    const colors = {
        goods: '#4f6ef7',
        orders: '#f59e0b',
        users: '#22c55e',
        stores: '#ec4899',
        coupons: '#8b5cf6',
        reviews: '#f97316'
    };
    return colors[type] || '#64748b';
}

// 获取搜索类型的样式类名
function getTypeClass(type) {
    const classes = {
        goods: 'type-color-goods type-bg-goods',
        orders: 'type-color-orders type-bg-orders',
        users: 'type-color-users type-bg-users',
        stores: 'type-color-stores type-bg-stores',
        coupons: 'type-color-coupons type-bg-coupons',
        reviews: 'type-color-reviews type-bg-reviews'
    };
    return classes[type] || '';
}

// 获取搜索类型的图标样式类名
function getTypeIconClass(type) {
    const classes = {
        goods: 'type-color-goods',
        orders: 'type-color-orders',
        users: 'type-color-users',
        stores: 'type-color-stores',
        coupons: 'type-color-coupons',
        reviews: 'type-color-reviews'
    };
    return classes[type] || '';
}

// 打开搜索面板
function openSearchPanel() {
    if (document.getElementById('searchPanel')) {
        return;  // 已打开则不再创建
    }
    
    loadSearchSettings();  // 加载搜索历史和收藏
    
    // 构建搜索面板HTML
    const panel = `
        <div id="searchPanel" class="search-panel">
            <div class="search-panel-content">
                <div class="search-panel-header">
                    <div class="search-panel-input-row">
                        <i class="fas fa-search"></i>
                        <input id="searchInput" class="search-panel-input" type="text" placeholder="搜索订单号、商品名称、手机号..." autofocus />
                        <div class="search-panel-actions">
                            <button class="search-panel-cancel" onclick="closeSearchPanel()">取消</button>
                        </div>
                    </div>
                    <div class="search-panel-hints">
                        <span><i class="fas fa-keyboard"></i> Enter 选择</span>
                        <span><i class="fas fa-arrow-up-down"></i> 上下导航</span>
                        <span><i class="fas fa-star"></i> Ctrl+S 收藏</span>
                    </div>
                </div>
                
                <div id="searchContent" class="search-panel-body">
                    ${renderSearchDefault()}  // 默认显示收藏和历史
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', panel);
    
    // 绑定事件
    document.getElementById('searchInput').addEventListener('input', handleSearchInput);
    document.getElementById('searchInput').addEventListener('keydown', handleSearchKeydown);
    document.getElementById('searchPanel').addEventListener('click', (e) => {
        if (e.target.id === 'searchPanel') closeSearchPanel();  // 点击遮罩关闭
    });
}

// 处理搜索输入
function handleSearchInput(e) {
    const query = e.target.value.trim();
    const content = document.getElementById('searchContent');
    
    if (!query) {
        content.innerHTML = renderSearchDefault();  // 空输入显示默认页面
        return;
    }
    
    // 执行搜索并渲染结果
    const results = searchAll(query);
    content.innerHTML = renderSearchResults(results, query);
}

// 处理搜索面板键盘事件
function handleSearchKeydown(e) {
    if (e.key === 'Escape') {
        closeSearchPanel();  // ESC关闭面板
    } else if (e.key === 'Enter') {
        const firstResult = document.querySelector('.search-result-item');
        if (firstResult) {
            firstResult.click();  // Enter选择第一个结果
        }
    }
}

// 渲染搜索面板默认页面（收藏、历史、快捷搜索）
function renderSearchDefault() {
    return `
        <div class="search-section">
            ${searchFavorites.length > 0 ? `
            <div>
                <div class="search-section-title">收藏的搜索</div>
                <div class="search-tags">
                    ${searchFavorites.map(q => `
                        <button class="search-tag" onclick="doSearch('${q}')">${q}</button>
                    `).join('')}
                </div>
            </div>` : ''}
            
            ${searchHistory.length > 0 ? `
            <div class="search-section">
                <div class="search-section-header">
                    <div class="search-section-title">搜索历史</div>
                    <button class="search-section-clear" onclick="clearSearchHistory()">清空</button>
                </div>
                <div class="search-tags">
                    ${searchHistory.map(q => `
                        <button class="search-tag" onclick="doSearch('${q}')">${q}</button>
                    `).join('')}
                </div>
            </div>` : ''}
            
            <div>
                <div class="search-section-title">快捷搜索</div>
                <div class="search-quick-grid">
                    <button class="quick-search-btn" onclick="doSearch('待发货')"><i class="fas fa-truck"></i> 待发货订单</button>
                    <button class="quick-search-btn" onclick="doSearch('退款')"><i class="fas fa-undo"></i> 退款申请</button>
                    <button class="quick-search-btn" onclick="doSearch('库存预警')"><i class="fas fa-exclamation-triangle"></i> 库存预警</button>
                    <button class="quick-search-btn" onclick="doSearch('新用户')"><i class="fas fa-user-plus"></i> 新注册用户</button>
                    <button class="quick-search-btn" onclick="doSearch('优惠券')"><i class="fas fa-ticket-alt"></i> 未使用优惠券</button>
                    <button class="quick-search-btn" onclick="doSearch('待评价')"><i class="fas fa-star"></i> 待审核评价</button>
                </div>
            </div>
        </div>
    `;
}

// 渲染搜索结果页面
function renderSearchResults(results, query) {
    if (results.length === 0) {
        return `
            <div class="search-empty">
                <i class="fas fa-search"></i>
                <div class="search-empty-title">未找到相关结果</div>
                <div class="search-empty-desc">试试其他关键词</div>
            </div>
        `;
    }
    
    // 按类型分组渲染结果
    return results.map(group => `
        <div class="search-result-group">
            <div class="search-result-group-header">
                <i class="${getTypeIcon(group.type)} ${getTypeIconClass(group.type)}"></i>
                <span class="search-result-group-label">${getTypeLabel(group.type)}</span>
                <span class="search-result-group-count">(${group.items.length}条)</span>
            </div>
            <div class="search-result-list">
                ${group.items.map(item => `
                    <div class="search-result-item" onclick="handleSearchResultClick('${group.type}', '${item.id}', '${query}')">
                        <div class="search-result-item-icon ${getTypeClass(group.type)}">
                            <i class="${getTypeIcon(group.type)}"></i>
                        </div>
                        <div class="search-result-item-info">
                            <div class="search-result-item-name">${highlightText(item.name, query)}</div>
                            <div class="search-result-item-id">${item.id}</div>
                        </div>
                        <div class="search-result-item-type">${getTypeLabel(group.type)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 高亮搜索关键词
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// 处理搜索结果点击（跳转到对应页面）
function handleSearchResultClick(type, id, query) {
    addSearchHistory(query);  // 添加到搜索历史
    
    // 根据类型跳转到对应页面
    switch (type) {
        case 'goods':
            switchPage('goods');
            setTimeout(() => {
                const input = document.querySelector('#panel-goods input[placeholder*="搜索"]');
                if (input) input.value = query;  // 在商品页面自动填入搜索词
            }, 100);
            break;
        case 'orders':
            switchPage('orders');
            break;
        case 'users':
            switchPage('users');
            break;
        case 'stores':
            switchPage('stores');
            break;
        case 'coupons':
            switchPage('coupons');
            break;
        case 'reviews':
            switchPage('reviews');
            break;
    }
    
    closeSearchPanel();
}

// 执行搜索（设置输入框值并触发搜索）
function doSearch(query) {
    const input = document.getElementById('searchInput');
    if (input) {
        input.value = query;
        handleSearchInput({ target: { value: query } });
    }
}

// 清空搜索历史
function clearSearchHistory() {
    searchHistory = [];
    saveSearchSettings();
    document.getElementById('searchContent').innerHTML = renderSearchDefault();
}

// 关闭搜索面板
function closeSearchPanel() {
    const panel = document.getElementById('searchPanel');
    if (panel) panel.remove();
}

// 全局快捷键：Ctrl+K 打开搜索面板
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchPanel();
    }
});

// 页面加载时加载搜索设置
loadSearchSettings();