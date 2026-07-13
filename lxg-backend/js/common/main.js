let currentTheme = localStorage.getItem('lxg_theme') || 'light';

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('lxg_theme', currentTheme);
    applyTheme();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

function setPageTitle(title) {
    document.title = title + ' - 乐享购后台管理系统';
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info'}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-in');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('fade-in');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}



function getSkeletonHtml(type, count = 1) {
    const skeletons = {
        card: `
            <div style="background:#fff;border-radius:12px;padding:16px;animation:skeleton 1.5s infinite;">
                <div style="display:flex;gap:12px;">
                    <div style="width:80px;height:80px;background:#e2e8f0;border-radius:8px;"></div>
                    <div style="flex:1;">
                        <div style="height:16px;background:#e2e8f0;border-radius:4px;margin-bottom:8px;width:60%;"></div>
                        <div style="height:12px;background:#e2e8f0;border-radius:4px;margin-bottom:8px;width:40%;"></div>
                        <div style="height:12px;background:#e2e8f0;border-radius:4px;width:30%;"></div>
                    </div>
                </div>
            </div>
        `,
        table: `
            <div style="background:#fff;border-radius:12px;overflow:hidden;">
                ${Array(count).fill(0).map(() => `
                    <div style="display:flex;padding:12px;border-bottom:1px solid #f1f5f9;animation:skeleton 1.5s infinite;">
                        <div style="width:40px;height:40px;background:#e2e8f0;border-radius:4px;margin-right:12px;"></div>
                        <div style="flex:1;">
                            <div style="height:14px;background:#e2e8f0;border-radius:4px;margin-bottom:6px;width:50%;"></div>
                            <div style="height:12px;background:#e2e8f0;border-radius:4px;width:30%;"></div>
                        </div>
                        <div style="width:100px;">
                            <div style="height:14px;background:#e2e8f0;border-radius:4px;width:60%;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `,
        stats: `
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
                ${Array(4).fill(0).map(() => `
                    <div style="background:#fff;border-radius:12px;padding:20px;text-align:center;animation:skeleton 1.5s infinite;">
                        <div style="width:48px;height:48px;background:#e2e8f0;border-radius:12px;margin:0 auto 12px;"></div>
                        <div style="height:24px;background:#e2e8f0;border-radius:4px;margin-bottom:8px;width:40%;margin:0 auto 8px;"></div>
                        <div style="height:14px;background:#e2e8f0;border-radius:4px;width:25%;margin:0 auto;"></div>
                    </div>
                `).join('')}
            </div>
        `
    };
    
    return skeletons[type] || '';
}

function saveFormDraft(formId, data) {
    const drafts = JSON.parse(localStorage.getItem('lxg_form_drafts') || '{}');
    drafts[formId] = { data, timestamp: Date.now() };
    localStorage.setItem('lxg_form_drafts', JSON.stringify(drafts));
}

function getFormDraft(formId) {
    const drafts = JSON.parse(localStorage.getItem('lxg_form_drafts') || '{}');
    const draft = drafts[formId];
    if (!draft) return null;
    
    if (Date.now() - draft.timestamp > 7 * 24 * 60 * 60 * 1000) {
        delete drafts[formId];
        localStorage.setItem('lxg_form_drafts', JSON.stringify(drafts));
        return null;
    }
    
    return draft.data;
}

function clearFormDraft(formId) {
    const drafts = JSON.parse(localStorage.getItem('lxg_form_drafts') || '{}');
    delete drafts[formId];
    localStorage.setItem('lxg_form_drafts', JSON.stringify(drafts));
}

function disableButton(btn, text = '处理中...') {
    if (!btn) return;
    btn.disabled = true;
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    btn.style.opacity = '0.7';
}

function enableButton(btn) {
    if (!btn) return;
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
    btn.style.opacity = '1';
}

applyTheme();

function renderSidebar() {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = '';
    MENU_GROUPS.forEach(g => {
        let hasVisibleMenu = false;
        for (let i = g.start; i < g.end && i < MENUS.length; i++) {
            if (hasPermission(MENUS[i].id)) {
                hasVisibleMenu = true;
                break;
            }
        }
        if (!hasVisibleMenu) return;
        const label = document.createElement('div');
        label.className = 'menu-label';
        label.textContent = g.label;
        nav.appendChild(label);
        for (let i = g.start; i < g.end && i < MENUS.length; i++) {
            const menu = MENUS[i];
            if (!hasPermission(menu.id)) continue;
            const item = document.createElement('div');
            item.className = 'menu-item';
            item.dataset.id = menu.id;
            item.innerHTML = `<i class="${menu.icon}"></i><span>${menu.label}</span>`;
            item.onclick = () => switchPage(menu.id);
            nav.appendChild(item);
        }
    });
}

function renderAllPages() {
    const container = document.getElementById('contentArea');
    container.innerHTML = '';
    MENUS.forEach(menu => {
        if (!hasPermission(menu.id)) return;
        const panel = document.createElement('div');
        panel.className = 'page-panel';
        panel.id = 'panel-' + menu.id;
        panel.innerHTML = buildPage(menu.id);
        container.appendChild(panel);
    });
    const firstMenu = MENUS.find(m => hasPermission(m.id));
    if (firstMenu) {
        document.getElementById('panel-' + firstMenu.id).classList.add('active');
        document.querySelector('.sidebar-nav .menu-item').classList.add('active');
        document.getElementById('pageTitle').textContent = firstMenu.label;
    }
}

function buildPage(id) {
    if (!hasPermission(id)) {
        return '<div style="text-align:center;padding:60px 20px;color:#94a3b8;"><i class="fas fa-lock" style="font-size:36px;opacity:0.3;"></i><p style="margin-top:12px;">您没有权限访问此页面</p></div>';
    }
    try {
        switch (id) {
            case 'stats': return statsPage();
            case 'goods': return goodsPage();
            case 'stock': return stockPage();
            case 'stores': return storesPage();
            case 'homepage': return homepagePage();
            case 'orders': return ordersPage();
            case 'returns': return returnsPage();
            case 'reviews': return reviewsPage();
            case 'coupons': return couponsPage();
            case 'marketing': return marketingPage();
            case 'service': return servicePage();
            case 'users': return usersPage();
            case 'payment': return paymentPage();
            case 'notification': return notificationPage();
            case 'admin': return adminPage();
            case 'settings': return settingsPage();
            default: return '<div style="text-align:center;padding:60px 20px;color:#94a3b8;"><i class="fas fa-file" style="font-size:36px;opacity:0.3;"></i><p style="margin-top:12px;">页面建设中</p></div>';
        }
    } catch (error) {
        console.error(`Error rendering page ${id}:`, error);
        return `<div style="text-align:center;padding:60px 20px;color:#94a3b8;"><i class="fas fa-exclamation-triangle" style="font-size:36px;opacity:0.3;"></i><p style="margin-top:12px;">页面加载失败</p><p style="font-size:13px;margin-top:8px;color:#ef4444;">${id}</p></div>`;
    }
}

function switchPage(id) {
    if (!hasPermission(id)) return;
    document.querySelectorAll('.sidebar-nav .menu-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === id);
    });
    const menu = MENUS.find(m => m.id === id);
    if (menu) document.getElementById('pageTitle').textContent = menu.label;
    document.querySelectorAll('.page-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('panel-' + id);
    if (panel) panel.classList.add('active');
    document.querySelector('.content').scrollTop = 0;
}

function switchRole(roleKey) {
    const role = ROLES[roleKey];
    if (!role) return;
    currentUser.role = roleKey;
    currentUser.name = role.name;
    if (roleKey === 'store_staff') {
        currentUser.storeId = 'store-001';
        currentUser.storeName = '北京朝阳店';
    } else {
        currentUser.storeId = null;
        currentUser.storeName = null;
    }
    updateUserProfile();
    renderSidebar();
    renderAllPages();
}

function updateUserProfile() {
    const nameEl = document.getElementById('adminName');
    const roleEl = document.getElementById('adminRole');
    const avatarEl = document.querySelector('.admin-profile .avatar');
    if (nameEl) nameEl.textContent = currentUser.name;
    if (roleEl) roleEl.textContent = ROLES[currentUser.role].name;
    if (avatarEl) avatarEl.textContent = currentUser.name.charAt(0);
}

const loginContainer = document.getElementById('loginContainer');
const mainContainer = document.getElementById('mainContainer');
if (loginContainer) {
    loginContainer.innerHTML = loginPage();
}

if (savedUser) {
    if (loginContainer) loginContainer.style.display = 'none';
    if (mainContainer) mainContainer.style.display = 'flex';
    if (document.body) document.body.classList.add('show-main');
    renderSidebar();
    renderAllPages();
    updateUserProfile();
} else {
    if (loginContainer) loginContainer.style.display = 'block';
    if (mainContainer) mainContainer.style.display = 'none';
}