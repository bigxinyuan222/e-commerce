let searchHistory = [];
let searchFavorites = [];

function loadSearchSettings() {
    const savedHistory = localStorage.getItem('search_history');
    const savedFavorites = localStorage.getItem('search_favorites');
    if (savedHistory) {
        try {
            searchHistory = JSON.parse(savedHistory);
        } catch (e) {
            searchHistory = [];
        }
    }
    if (savedFavorites) {
        try {
            searchFavorites = JSON.parse(savedFavorites);
        } catch (e) {
            searchFavorites = [];
        }
    }
}

function saveSearchSettings() {
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
    localStorage.setItem('search_favorites', JSON.stringify(searchFavorites));
}

function addSearchHistory(query) {
    searchHistory = searchHistory.filter(q => q !== query);
    searchHistory.unshift(query);
    if (searchHistory.length > 10) {
        searchHistory.pop();
    }
    saveSearchSettings();
}

function toggleSearchFavorite(query) {
    const index = searchFavorites.indexOf(query);
    if (index > -1) {
        searchFavorites.splice(index, 1);
    } else {
        searchFavorites.push(query);
    }
    saveSearchSettings();
}

function buildSearchIndex() {
    const index = { goods: [], orders: [], users: [], stores: [], coupons: [], reviews: [] };
    
    if (typeof goodsData !== 'undefined') {
        goodsData.forEach(g => {
            index.goods.push({ id: g.id, name: g.name, type: 'goods', category: g.category, brand: g.brand });
        });
    }
    
    if (typeof ordersData !== 'undefined') {
        ordersData.forEach(o => {
            index.orders.push({ id: o.id, name: o.userName, type: 'orders', phone: o.phone, status: o.status });
        });
    }
    
    if (typeof usersData !== 'undefined') {
        usersData.forEach(u => {
            index.users.push({ id: u.id, name: u.userName, type: 'users', phone: u.phone });
        });
    }
    
    if (typeof storesData !== 'undefined') {
        storesData.forEach(s => {
            index.stores.push({ id: s.id, name: s.name, type: 'stores', address: s.address });
        });
    }
    
    if (typeof couponsData !== 'undefined') {
        couponsData.forEach(c => {
            index.coupons.push({ id: c.id, name: c.name, type: 'coupons' });
        });
    }
    
    if (typeof reviewsData !== 'undefined') {
        reviewsData.forEach(r => {
            index.reviews.push({ id: r.id, name: r.goodsName, type: 'reviews', userName: r.userName });
        });
    }
    
    return index;
}

function searchAll(query) {
    const index = buildSearchIndex();
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    Object.keys(index).forEach(type => {
        const matched = index[type].filter(item => {
            return item.name.toLowerCase().includes(lowerQuery) ||
                   (item.phone && item.phone.includes(query)) ||
                   item.id.toLowerCase().includes(lowerQuery) ||
                   (item.category && item.category.toLowerCase().includes(lowerQuery)) ||
                   (item.brand && item.brand.toLowerCase().includes(lowerQuery)) ||
                   (item.userName && item.userName.toLowerCase().includes(lowerQuery));
        });
        if (matched.length > 0) {
            results.push({ type: type, items: matched.slice(0, 10) });
        }
    });
    
    return results;
}

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

function openSearchPanel() {
    if (document.getElementById('searchPanel')) {
        return;
    }
    
    loadSearchSettings();
    
    const panel = `
        <div id="searchPanel" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:15vh;">
            <div style="background:#fff;border-radius:16px;box-shadow:0 50px 100px -25px rgba(0,0,0,0.3);width:100%;max-width:720px;overflow:hidden;">
                <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <i class="fas fa-search" style="color:#64748b;font-size:20px;"></i>
                        <input id="searchInput" type="text" placeholder="搜索订单号、商品名称、手机号..." style="flex:1;border:none;font-size:18px;outline:none;color:#1e293b;" autofocus />
                        <div style="display:flex;gap:8px;">
                            <button style="padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;color:#64748b;cursor:pointer;" onclick="closeSearchPanel()">取消</button>
                        </div>
                    </div>
                    <div style="display:flex;gap:16px;margin-top:8px;font-size:12px;color:#94a3b8;">
                        <span><i class="fas fa-keyboard"></i> Enter 选择</span>
                        <span><i class="fas fa-arrow-up-down"></i> 上下导航</span>
                        <span><i class="fas fa-star"></i> Ctrl+S 收藏</span>
                    </div>
                </div>
                
                <div id="searchContent" style="max-height:50vh;overflow-y:auto;">
                    ${renderSearchDefault()}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', panel);
    
    document.getElementById('searchInput').addEventListener('input', handleSearchInput);
    document.getElementById('searchInput').addEventListener('keydown', handleSearchKeydown);
    document.getElementById('searchPanel').addEventListener('click', (e) => {
        if (e.target.id === 'searchPanel') closeSearchPanel();
    });
}

function handleSearchInput(e) {
    const query = e.target.value.trim();
    const content = document.getElementById('searchContent');
    if (!query) {
        content.innerHTML = renderSearchDefault();
        return;
    }
    
    const results = searchAll(query);
    content.innerHTML = renderSearchResults(results, query);
}

function handleSearchKeydown(e) {
    if (e.key === 'Escape') {
        closeSearchPanel();
    } else if (e.key === 'Enter') {
        const firstResult = document.querySelector('.search-result-item');
        if (firstResult) {
            firstResult.click();
        }
    }
}

function renderSearchDefault() {
    return `
        <div style="padding:16px;">
            ${searchFavorites.length > 0 ? `
            <div style="margin-bottom:16px;">
                <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:8px;">收藏的搜索</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                    ${searchFavorites.map(q => `
                        <button class="search-tag" onclick="doSearch('${q}')">${q}</button>
                    `).join('')}
                </div>
            </div>` : ''}
            
            ${searchHistory.length > 0 ? `
            <div style="margin-bottom:16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <div style="font-size:12px;font-weight:600;color:#94a3b8;">搜索历史</div>
                    <button style="font-size:12px;color:#4f6ef7;cursor:pointer;" onclick="clearSearchHistory()">清空</button>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                    ${searchHistory.map(q => `
                        <button class="search-tag" onclick="doSearch('${q}')">${q}</button>
                    `).join('')}
                </div>
            </div>` : ''}
            
            <div>
                <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:8px;">快捷搜索</div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
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

function renderSearchResults(results, query) {
    if (results.length === 0) {
        return `
            <div style="padding:40px;text-align:center;">
                <i class="fas fa-search" style="font-size:48px;color:#e2e8f0;margin-bottom:12px;"></i>
                <div style="font-size:14px;color:#64748b;">未找到相关结果</div>
                <div style="font-size:12px;color:#94a3b8;margin-top:4px;">试试其他关键词</div>
            </div>
        `;
    }
    
    return results.map(group => `
        <div style="padding:12px 20px;border-bottom:1px solid #f1f4f9;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <i class="${getTypeIcon(group.type)}" style="color:${getTypeColor(group.type)};"></i>
                <span style="font-size:13px;font-weight:600;color:#334155;">${getTypeLabel(group.type)}</span>
                <span style="font-size:12px;color:#94a3b8;">(${group.items.length}条)</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
                ${group.items.map(item => `
                    <div class="search-result-item" style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:8px;cursor:pointer;transition:background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'" onclick="handleSearchResultClick('${group.type}', '${item.id}', '${query}')">
                        <div style="width:36px;height:36px;background:${getTypeColor(group.type)}15;border-radius:8px;display:flex;align-items:center;justify-content:center;">
                            <i class="${getTypeIcon(group.type)}" style="color:${getTypeColor(group.type)};"></i>
                        </div>
                        <div style="flex:1;min-width:0;">
                            <div style="font-size:13px;font-weight:500;color:#1e293b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${highlightText(item.name, query)}</div>
                            <div style="font-size:12px;color:#94a3b8;">${item.id}</div>
                        </div>
                        <div style="font-size:12px;color:#64748b;">${getTypeLabel(group.type)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span style="background:#fef3c7;color:#d97706;">$1</span>');
}

function handleSearchResultClick(type, id, query) {
    addSearchHistory(query);
    
    switch (type) {
        case 'goods':
            switchPage('goods');
            setTimeout(() => {
                const input = document.querySelector('#panel-goods input[placeholder*="搜索"]');
                if (input) input.value = query;
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

function doSearch(query) {
    const input = document.getElementById('searchInput');
    if (input) {
        input.value = query;
        handleSearchInput({ target: { value: query } });
    }
}

function clearSearchHistory() {
    searchHistory = [];
    saveSearchSettings();
    document.getElementById('searchContent').innerHTML = renderSearchDefault();
}

function closeSearchPanel() {
    const panel = document.getElementById('searchPanel');
    if (panel) panel.remove();
}

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchPanel();
    }
});

loadSearchSettings();