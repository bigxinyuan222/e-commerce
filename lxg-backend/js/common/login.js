// 渲染登录页面HTML结构
function loginPage() {
    return `
        <div class="login-page">
            <div class="login-left">
                <div class="login-logo-area">
                    <div class="login-logo">
                        <div class="login-logo-icon"><i class="fas fa-shopping-bag"></i></div>
                        <div class="login-brand"><h2>乐享购</h2><p>智慧零售 · 乐享生活</p></div>
                    </div>
                </div>
                <div class="login-features">
                    <h1>一站式零售管理解决方案</h1>
                    <p>支持多门店管理、智能库存预警、AI客服自动回复，助力您的零售业务高效运营。</p>
                    <div class="login-feature-grid">
                        <div class="login-feature-card">
                            <div class="login-feature-icon"><i class="fas fa-chart-pie"></i></div>
                            <div class="login-feature-title">数据可视化</div>
                            <div class="login-feature-desc">实时业务数据报表</div>
                        </div>
                        <div class="login-feature-card">
                            <div class="login-feature-icon"><i class="fas fa-robot"></i></div>
                            <div class="login-feature-title">AI智能助手</div>
                            <div class="login-feature-desc">智能客服自动回复</div>
                        </div>
                        <div class="login-feature-card">
                            <div class="login-feature-icon"><i class="fas fa-shield-alt"></i></div>
                            <div class="login-feature-title">多级权限</div>
                            <div class="login-feature-desc">精细的角色权限管理</div>
                        </div>
                        <div class="login-feature-card">
                            <div class="login-feature-icon"><i class="fas fa-mobile-alt"></i></div>
                            <div class="login-feature-title">多端适配</div>
                            <div class="login-feature-desc">支持PC与移动端管理</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="login-right">
                <div class="login-form-card">
                    <div class="login-form-header">
                        <div class="login-form-icon"><i class="fas fa-shopping-bag"></i></div>
                        <h2>欢迎登录</h2>
                        <p>请输入您的管理员账号</p>
                    </div>
                    <form id="loginForm" onsubmit="handleLogin(event)">
                        <div class="login-form-group">
                            <label>账号</label>
                            <div class="login-form-input-wrap">
                                <i class="fas fa-user"></i>
                                <input type="text" id="username" class="login-form-input" placeholder="请输入管理员账号" required />
                            </div>
                        </div>
                        <div class="login-form-group">
                            <label>密码</label>
                            <div class="login-form-input-wrap">
                                <i class="fas fa-lock"></i>
                                <input type="password" id="password" class="login-form-input" placeholder="请输入密码" required />
                            </div>
                        </div>
                        <button type="submit" class="login-form-btn">
                            <span><i class="fas fa-sign-in-alt"></i> 登 录</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// 处理登录请求
async function handleLogin(event) {
    event.preventDefault();  // 阻止表单默认提交
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    try {
        // 调用登录API
        const userData = await apiPost(API_CONFIG.auth.login, {
            username: username,
            password: password
        });
        
        if (userData) {
            // 提取管理员信息（兼容不同API返回格式）
            const adminData = userData.admin_info || userData.admin || userData;
            const token = userData.token || adminData.token || '';
            let role = 'super_admin';
            
            // 从token中解析用户角色
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    role = payload.role || 'super_admin';
                } catch (e) {
                    role = 'super_admin';  // 解析失败默认超级管理员
                }
            }
            
            // 更新当前用户信息
            currentUser.role = role;
            currentUser.name = adminData.name || adminData.username || '管理员';
            currentUser.storeId = adminData.storeId || adminData.store_id ? String(adminData.storeId || adminData.store_id) : null;
            currentUser.storeName = adminData.storeName || adminData.store_name || null;
            currentUser.token = token;
            
            // 保存用户信息到本地存储
            saveUserToStorage(currentUser);
            
            // 切换到主界面
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'flex';
            document.body.classList.add('show-main');
            
            // 渲染侧边栏、页面和用户信息
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
            }, 500);
        } else {
            showToast('登录失败，请重试', 'error');
        }
    } catch (error) {
        console.error('Login failed:', error);
        showToast('登录失败，请检查网络连接或账号密码', 'error');
    }
}

// 切换管理员菜单显示/隐藏
function toggleAdminMenu() {
    const dropdown = document.getElementById('adminDropdown');
    const arrow = document.getElementById('adminArrow');
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
        document.addEventListener('click', closeAdminMenuOutside);
    } else {
        dropdown.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
        document.removeEventListener('click', closeAdminMenuOutside);
    }
}

// 切换待办菜单显示/隐藏
function toggleTodoMenu() {
    const dropdown = document.getElementById('todoDropdown');
    if (dropdown.style.display === 'none') {
        renderTodoMenu();
        dropdown.style.display = 'block';
        document.addEventListener('click', closeTodoMenuOutside);
    } else {
        dropdown.style.display = 'none';
        document.removeEventListener('click', closeTodoMenuOutside);
    }
}

// 点击待办菜单外部关闭菜单
function closeTodoMenuOutside(e) {
    const dropdown = document.getElementById('todoDropdown');
    const todoBtn = document.getElementById('todoBtn');
    if (dropdown && todoBtn && !dropdown.contains(e.target) && !todoBtn.contains(e.target)) {
        dropdown.style.display = 'none';
        document.removeEventListener('click', closeTodoMenuOutside);
    }
}

// 渲染待办事项菜单
function renderTodoMenu() {
    const todos = getTodoItems();
    const countEl = document.getElementById('todoCount');
    const bodyEl = document.getElementById('todoDropdownBody');
    const dotEl = document.getElementById('todoDot');
    
    // 更新待办数量和红点显示
    if (countEl) countEl.textContent = todos.length;
    if (dotEl) dotEl.style.display = todos.length > 0 ? 'block' : 'none';
    
    // 渲染待办列表或空状态
    if (bodyEl) {
        if (todos.length > 0) {
            bodyEl.innerHTML = todos.map(todo => `
                <div class="todo-item" onclick="handleTodoClick('${todo.action}')">
                    <div class="priority-dot ${todo.priority}"></div>
                    <i class="fas ${todo.icon}"></i>
                    <span class="todo-label">${todo.label}</span>
                    <i class="fas fa-chevron-right todo-arrow"></i>
                </div>
            `).join('');
        } else {
            bodyEl.innerHTML = `
                <div style="text-align:center;padding:30px;color:#94a3b8;">
                    <i class="fas fa-check-circle" style="font-size:32px;margin-bottom:8px;"></i>
                    <div style="font-size:13px;">暂无待办事项</div>
                </div>
            `;
        }
    }
}

// 点击管理员菜单外部关闭菜单
function closeAdminMenuOutside(e) {
    const dropdown = document.getElementById('adminDropdown');
    const profile = document.getElementById('adminProfile');
    if (dropdown && profile && !dropdown.contains(e.target) && !profile.contains(e.target)) {
        dropdown.style.display = 'none';
        document.getElementById('adminArrow').style.transform = 'rotate(0deg)';
        document.removeEventListener('click', closeAdminMenuOutside);
    }
}

// 显示管理员个人信息弹窗
function showAdminInfo() {
    const dropdown = document.getElementById('adminDropdown');
    const arrow = document.getElementById('adminArrow');
    // 先关闭管理员菜单
    dropdown.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    document.removeEventListener('click', closeAdminMenuOutside);
    
    // 门店信息（如果有）
    const storeInfo = currentUser.storeName ? `<div class="admin-info-store"><div class="admin-info-detail">所属门店</div><div class="admin-info-value">${currentUser.storeName}</div></div>` : '';
    
    // 渲染个人信息弹窗
    const modalContent = `
        <div class="modal-overlay" onclick="closeAdminInfoModal()"></div>
        <div class="modal-content admin-info-modal">
            <div class="modal-header">
                <h3><i class="fas fa-user-circle"></i> 个人信息</h3>
                <button onclick="closeAdminInfoModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="admin-info-body">
                <div class="admin-info-avatar-area">
                    <div class="admin-info-avatar">${currentUser.name.charAt(0)}</div>
                    <div class="admin-info-name">${currentUser.name}</div>
                    <div class="admin-info-role">${currentUser.role === 'super_admin' ? '超级管理员' : currentUser.role === 'store_admin' ? '门店管理员' : currentUser.role === 'goods_operator' ? '商品运营' : currentUser.role === 'order_service' ? '订单客服' : currentUser.role}</div>
                </div>
                <div>
                    <div class="admin-info-detail">用户名</div>
                    <div class="admin-info-value">${currentUser.name}</div>
                </div>
                <div style="margin-top:12px;">
                    <div class="admin-info-detail">手机号</div>
                    <div class="admin-info-value">138****8888</div>
                </div>
                <div style="margin-top:12px;">
                    <div class="admin-info-detail">姓名</div>
                    <div class="admin-info-value">${currentUser.name}</div>
                </div>
                ${storeInfo}
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeAdminInfoModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

// 关闭管理员信息弹窗
function closeAdminInfoModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

// 处理登出操作
function handleLogout() {
    // 清除本地存储中的用户信息
    clearUserFromStorage();
    
    // 重置当前用户为默认状态
    currentUser = {
        name: '超级管理员',
        role: 'super_admin',
        storeId: null,
        storeName: null
    };
    
    // 切换回登录页面
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('loginForm').reset();
    document.body.classList.remove('show-main');
}