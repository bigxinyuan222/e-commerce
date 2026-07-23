// 当前主题（从本地存储读取，默认为亮色主题）
let currentTheme = localStorage.getItem('lxg_theme') || 'light';

// 切换主题（亮色/暗色）
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('lxg_theme', currentTheme);
    applyTheme();
}

// 应用主题设置
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// 设置页面标题
function setPageTitle(title) {
    document.title = title + ' - 乐享购后台管理系统';
}

// 显示轻提示（成功/错误/信息）
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    // 根据类型选择图标
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info'}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    
    // 淡入动画
    setTimeout(() => {
        toast.classList.add('fade-in');
    }, 10);
    
    // 3秒后淡出并移除
    setTimeout(() => {
        toast.classList.remove('fade-in');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}



// 获取骨架屏HTML（用于数据加载时的占位显示）
function getSkeletonHtml(type, count = 1) {
    const skeletons = {
        card: `  // 卡片型骨架屏
            <div class="skeleton-card">
                <div class="skeleton-row">
                    <div class="skeleton-avatar"></div>
                    <div class="skeleton-text-area">
                        <div class="skeleton-text short"></div>
                        <div class="skeleton-text medium"></div>
                        <div class="skeleton-text small"></div>
                    </div>
                </div>
            </div>
        `,
        table: `  // 表格型骨架屏
            <div class="skeleton-table">
                ${Array(count).fill(0).map(() => `
                    <div class="skeleton-table-row">
                        <div class="skeleton-table-avatar"></div>
                        <div class="skeleton-table-text-area">
                            <div class="skeleton-table-text name"></div>
                            <div class="skeleton-table-text desc"></div>
                        </div>
                        <div class="skeleton-table-status">
                            <div class="skeleton-text"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `,
        stats: `  // 统计卡片型骨架屏
            <div class="skeleton-stats">
                ${Array(4).fill(0).map(() => `
                    <div class="skeleton-stat-card">
                        <div class="skeleton-stat-icon"></div>
                        <div class="skeleton-stat-value"></div>
                        <div class="skeleton-stat-label"></div>
                    </div>
                `).join('')}
            </div>
        `
    };
    
    return skeletons[type] || '';
}

// 保存表单草稿到本地存储
function saveFormDraft(formId, data) {
    const drafts = JSON.parse(localStorage.getItem('lxg_form_drafts') || '{}');
    drafts[formId] = { data, timestamp: Date.now() };
    localStorage.setItem('lxg_form_drafts', JSON.stringify(drafts));
}

// 获取表单草稿（有效期7天）
function getFormDraft(formId) {
    const drafts = JSON.parse(localStorage.getItem('lxg_form_drafts') || '{}');
    const draft = drafts[formId];
    if (!draft) return null;
    
    // 超过7天的草稿自动清除
    if (Date.now() - draft.timestamp > 7 * 24 * 60 * 60 * 1000) {
        delete drafts[formId];
        localStorage.setItem('lxg_form_drafts', JSON.stringify(drafts));
        return null;
    }
    
    return draft.data;
}

// 清除指定表单的草稿
function clearFormDraft(formId) {
    const drafts = JSON.parse(localStorage.getItem('lxg_form_drafts') || '{}');
    delete drafts[formId];
    localStorage.setItem('lxg_form_drafts', JSON.stringify(drafts));
}

// 禁用按钮并显示加载状态
function disableButton(btn, text = '处理中...') {
    if (!btn) return;
    btn.disabled = true;
    btn.dataset.originalText = btn.innerHTML;  // 保存原始文本
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    btn.style.opacity = '0.7';
}

// 启用按钮并恢复原始状态
function enableButton(btn) {
    if (!btn) return;
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || btn.innerHTML;  // 恢复原始文本
    btn.style.opacity = '1';
}

// 页面加载时应用主题
applyTheme();

// 渲染侧边栏导航菜单
function renderSidebar() {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = '';
    
    // 遍历菜单分组
    MENU_GROUPS.forEach(g => {
        let hasVisibleMenu = false;
        // 检查该分组是否有可见菜单
        for (let i = g.start; i < g.end && i < MENUS.length; i++) {
            if (hasPermission(MENUS[i].id)) {
                hasVisibleMenu = true;
                break;
            }
        }
        if (!hasVisibleMenu) return;  // 无可见菜单则跳过该分组
        
        // 创建分组标签
        const label = document.createElement('div');
        label.className = 'menu-label';
        label.textContent = g.label;
        nav.appendChild(label);
        
        // 创建菜单项
        for (let i = g.start; i < g.end && i < MENUS.length; i++) {
            const menu = MENUS[i];
            if (!hasPermission(menu.id)) continue;  // 无权限则跳过
            
            const item = document.createElement('div');
            item.className = 'menu-item';
            item.dataset.id = menu.id;
            item.innerHTML = `<i class="${menu.icon}"></i><span>${menu.label}</span>`;
            item.onclick = () => switchPage(menu.id);  // 点击切换页面
            nav.appendChild(item);
        }
    });
}

// 渲染所有页面面板
function renderAllPages() {
    const container = document.getElementById('contentArea');
    container.innerHTML = '';
    
    // 为每个有权限的菜单创建页面面板
    MENUS.forEach(menu => {
        if (!hasPermission(menu.id)) return;  // 无权限则跳过
        
        const panel = document.createElement('div');
        panel.className = 'page-panel';
        panel.id = 'panel-' + menu.id;
        panel.innerHTML = buildPage(menu.id);  // 构建页面内容
        container.appendChild(panel);
    });
    
    // 默认显示第一个有权限的页面
    const firstMenu = MENUS.find(m => hasPermission(m.id));
    if (firstMenu) {
        document.getElementById('panel-' + firstMenu.id).classList.add('active');
        document.querySelector('.sidebar-nav .menu-item').classList.add('active');
        document.getElementById('pageTitle').textContent = firstMenu.label;
    }
}

// 根据页面ID构建对应页面内容
function buildPage(id) {
    if (!hasPermission(id)) {
        return '<div class="no-permission"><i class="fas fa-lock"></i><p>您没有权限访问此页面</p></div>';
    }
    try {
        // 根据页面ID调用对应的页面渲染函数
        switch (id) {
            case 'stats': return statsPage();              // 数据统计页面
            case 'goods': return goodsPage();              // 商品管理页面
            case 'stock': return stockPage();              // 库存管理页面
            case 'stores': return storesPage();            // 门店总览页面
            case 'homepage': return homepagePage();        // 首页管理页面
            case 'orders': return ordersPage();            // 订单管理页面
            case 'returns': return returnsPage();          // 退货退款页面
            case 'reviews': return reviewsPage();          // 评价管理页面
            case 'coupons': return couponsPage();          // 优惠券管理页面
            case 'marketing': return marketingPage();      // 营销活动页面
            case 'service': return servicePage();          // 客服消息页面
            case 'users': return usersPage();              // 用户管理页面
            case 'payment': return paymentPage();          // 支付管理页面
            case 'notification': return notificationPage();// 系统通知页面
            case 'admin': return adminPage();              // 管理员管理页面
            case 'settings': return settingsPage();        // 系统设置页面
            default: return '<div class="page-loading"><i class="fas fa-file"></i><p>页面建设中</p></div>';
        }
    } catch (error) {
        console.error(`Error rendering page ${id}:`, error);
        return `<div class="page-error"><i class="fas fa-exclamation-triangle"></i><p>页面加载失败</p><p class="error-detail">${id}</p></div>`;
    }
}

// 切换页面
function switchPage(id) {
    if (!hasPermission(id)) return;  // 无权限则不切换
    
    // 更新侧边栏选中状态
    document.querySelectorAll('.sidebar-nav .menu-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === id);
    });
    
    // 更新页面标题
    const menu = MENUS.find(m => m.id === id);
    if (menu) document.getElementById('pageTitle').textContent = menu.label;
    
    // 切换页面面板显示
    document.querySelectorAll('.page-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('panel-' + id);
    if (panel) panel.classList.add('active');
    
    // 滚动到页面顶部
    document.querySelector('.content').scrollTop = 0;
}

// 切换用户角色
function switchRole(roleKey) {
    const role = ROLES[roleKey];
    if (!role) return;
    
    // 更新当前用户角色信息
    currentUser.role = roleKey;
    currentUser.name = role.name;
    currentUser.storeId = null;
    currentUser.storeName = null;
    
    // 重新渲染用户信息、侧边栏和页面
    updateUserProfile();
    renderSidebar();
    renderAllPages();
}

// 更新用户信息显示
function updateUserProfile() {
    const nameEl = document.getElementById('adminName');
    const roleEl = document.getElementById('adminRole');
    const avatarEl = document.querySelector('.admin-profile .avatar');
    
    if (nameEl) nameEl.textContent = currentUser.name;
    if (roleEl) roleEl.textContent = ROLES[currentUser.role].name;
    if (avatarEl) avatarEl.textContent = currentUser.name.charAt(0);  // 头像显示首字
}

// 获取页面容器元素
const loginContainer = document.getElementById('loginContainer');
const mainContainer = document.getElementById('mainContainer');

// 渲染登录页面
if (loginContainer) {
    loginContainer.innerHTML = loginPage();
}

// 判断是否已有登录状态
if (savedUser && savedUser.token) {
    // 已登录：显示主界面
    if (loginContainer) loginContainer.style.display = 'none';
    if (mainContainer) mainContainer.style.display = 'flex';
    if (document.body) document.body.classList.add('show-main');
    
    // 渲染界面组件
    renderSidebar();
    renderAllPages();
    updateUserProfile();
    
    // 延迟加载各模块数据
    setTimeout(() => {
        if (typeof loadStores === 'function') loadStores();
        if (typeof loadUsers === 'function') loadUsers();
        if (typeof loadOrders === 'function') loadOrders();
        if (typeof loadCoupons === 'function') loadCoupons();
        if (typeof loadStock === 'function') loadStock();
        if (typeof loadSeckill === 'function') loadSeckill();
        if (typeof loadReviews === 'function') loadReviews();
        if (typeof loadReturns === 'function') loadReturns();
        if (typeof loadLogs === 'function') loadLogs();
        if (typeof loadChats === 'function') loadChats();
        if (typeof loadBanners === 'function') loadBanners();
        if (typeof loadRecommendations === 'function') loadRecommendations();
        if (typeof loadHomepageGoods === 'function') loadHomepageGoods();
        if (typeof loadPayments === 'function') loadPayments();
        if (typeof loadRefunds === 'function') loadRefunds();
        if (typeof loadNotifications === 'function') loadNotifications();
        if (typeof loadTemplates === 'function') loadTemplates();
        if (typeof loadGoods === 'function') loadGoods();
        if (typeof loadCategories === 'function') loadCategories();
        if (typeof loadBrands === 'function') loadBrands();
        if (typeof loadSpecs === 'function') loadSpecs();
        if (typeof loadAdmins === 'function') loadAdmins();
        if (typeof loadRoles === 'function') loadRoles();
        if (typeof loadAdminStores === 'function') loadAdminStores();
    }, 500);
} else {
    // 未登录：显示登录页面
    if (loginContainer) loginContainer.style.display = 'block';
    if (mainContainer) mainContainer.style.display = 'none';
}