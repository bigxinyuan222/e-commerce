function loginPage() {
    return `
        <div style="min-height:100vh;display:flex;">
            <div style="flex:1;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;flex-direction:column;padding:80px;position:relative;overflow:hidden;">
                <div style="position:sticky;top:0;z-index:10;padding-bottom:32px;">
                    <div style="display:flex;align-items:center;margin-bottom:32px;">
                        <div style="width:56px;height:56px;background:rgba(255,255,255,0.2);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-right:16px;">
                            <i class="fas fa-shopping-bag" style="color:#fff;font-size:24px;"></i>
                        </div>
                        <div>
                            <h2 style="font-size:28px;font-weight:700;color:#fff;margin:0;">乐享购</h2>
                            <p style="color:rgba(255,255,255,0.8);font-size:14px;">智慧零售 · 乐享生活</p>
                        </div>
                    </div>
                </div>
                <div style="max-width:520px;overflow-y:auto;flex:1;">
                    <h1 style="font-size:48px;font-weight:700;color:#fff;margin-bottom:16px;line-height:1.2;">一站式零售管理解决方案</h1>
                    <p style="font-size:16px;color:rgba(255,255,255,0.9);line-height:1.8;margin-bottom:48px;">支持多门店管理、智能库存预警、AI客服自动回复，助力您的零售业务高效运营。</p>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
                        <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:24px;">
                            <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
                                <i class="fas fa-chart-pie" style="color:#fff;font-size:18px;"></i>
                            </div>
                            <div style="font-size:16px;font-weight:600;color:#fff;margin-bottom:4px;">数据可视化</div>
                            <div style="font-size:13px;color:rgba(255,255,255,0.8);">实时业务数据报表</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:24px;">
                            <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
                                <i class="fas fa-robot" style="color:#fff;font-size:18px;"></i>
                            </div>
                            <div style="font-size:16px;font-weight:600;color:#fff;margin-bottom:4px;">AI智能助手</div>
                            <div style="font-size:13px;color:rgba(255,255,255,0.8);">智能客服自动回复</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:24px;">
                            <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
                                <i class="fas fa-shield-alt" style="color:#fff;font-size:18px;"></i>
                            </div>
                            <div style="font-size:16px;font-weight:600;color:#fff;margin-bottom:4px;">多级权限</div>
                            <div style="font-size:13px;color:rgba(255,255,255,0.8);">精细的角色权限管理</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.15);border-radius:12px;padding:24px;">
                            <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
                                <i class="fas fa-mobile-alt" style="color:#fff;font-size:18px;"></i>
                            </div>
                            <div style="font-size:16px;font-weight:600;color:#fff;margin-bottom:4px;">多端适配</div>
                            <div style="font-size:13px;color:rgba(255,255,255,0.8);">支持PC与移动端管理</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="flex:1;background:#f8fafc;display:flex;align-items:center;justify-content:center;padding:40px;">
                <div style="background:#fff;border-radius:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.1);width:100%;max-width:520px;padding:56px;">
                    <div style="text-align:center;margin-bottom:48px;">
                        <div style="width:72px;height:72px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                            <i class="fas fa-shopping-bag" style="color:#fff;font-size:32px;"></i>
                        </div>
                        <h2 style="font-size:28px;font-weight:700;color:#1e293b;margin:0;">欢迎登录</h2>
                        <p style="color:#64748b;font-size:15px;margin:8px 0 0;">请输入您的管理员账号</p>
                    </div>
                    <form id="loginForm" onsubmit="handleLogin(event)">
                        <div style="margin-bottom:28px;">
                            <label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:10px;">账号</label>
                            <div style="position:relative;">
                                <i class="fas fa-user" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:16px;"></i>
                                <input type="text" id="username" placeholder="请输入管理员账号" required style="width:100%;padding:16px 16px 16px 48px;border:1px solid #e2e8f0;border-radius:12px;font-size:15px;transition:border-color 0.2s,box-shadow 0.2s;" onfocus="this.style.borderColor='#667eea';this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.1)';" onblur="this.style.borderColor='#e2e8f0';this.style.boxShadow='none';" />
                            </div>
                        </div>
                        <div style="margin-bottom:36px;">
                            <label style="display:block;font-size:14px;font-weight:600;color:#334155;margin-bottom:10px;">密码</label>
                            <div style="position:relative;">
                                <i class="fas fa-lock" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:16px;"></i>
                                <input type="password" id="password" placeholder="请输入密码" required style="width:100%;padding:16px 16px 16px 48px;border:1px solid #e2e8f0;border-radius:12px;font-size:15px;transition:border-color 0.2s,box-shadow 0.2s;" onfocus="this.style.borderColor='#667eea';this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.1)';" onblur="this.style.borderColor='#e2e8f0';this.style.boxShadow='none';" />
                            </div>
                        </div>
                        <button type="submit" style="width:100%;padding:18px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 30px rgba(102,126,234,0.4)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none';">
                            <span style="display:flex;align-items:center;justify-content:center;gap:8px;">
                                <i class="fas fa-sign-in-alt" style="font-size:15px;"></i> 登 录
                            </span>
                        </button>
                    </form>
                    <div style="margin-top:40px;padding:24px;background:#f8fafc;border-radius:14px;">
                        <div style="font-size:14px;font-weight:600;color:#334155;margin-bottom:16px;"><i class="fas fa-info-circle" style="color:#667eea;margin-right:8px;"></i> 测试账号</div>
                        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                            <div style="background:#fff;padding:16px;border-radius:10px;border:1px solid #e2e8f0;">
                                <div style="font-size:13px;font-weight:500;color:#667eea;margin-bottom:6px;">超级管理员</div>
                                <div style="font-size:12px;color:#94a3b8;">admin / admin123</div>
                            </div>
                            <div style="background:#fff;padding:16px;border-radius:10px;border:1px solid #e2e8f0;">
                                <div style="font-size:13px;font-weight:500;color:#667eea;margin-bottom:6px;">商品运营</div>
                                <div style="font-size:12px;color:#94a3b8;">goods_op / goods123</div>
                            </div>
                            <div style="background:#fff;padding:16px;border-radius:10px;border:1px solid #e2e8f0;">
                                <div style="font-size:13px;font-weight:500;color:#667eea;margin-bottom:6px;">订单客服</div>
                                <div style="font-size:12px;color:#94a3b8;">order_cs / order123</div>
                            </div>
                            <div style="background:#fff;padding:16px;border-radius:10px;border:1px solid #e2e8f0;">
                                <div style="font-size:13px;font-weight:500;color:#667eea;margin-bottom:6px;">门店店员</div>
                                <div style="font-size:12px;color:#94a3b8;">store_staff / store123</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const account = ACCOUNTS.find(a => a.username === username && a.password === password);
    
    if (!account) {
        alert('账号或密码错误，请重试！');
        return;
    }
    
    currentUser.role = account.role;
    currentUser.name = account.name;
    currentUser.storeId = account.storeId || null;
    currentUser.storeName = account.storeName || null;
    
    saveUserToStorage(currentUser);
    
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'flex';
    document.body.classList.add('show-main');
    
    renderSidebar();
    renderAllPages();
    updateUserProfile();
}

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

function closeTodoMenuOutside(e) {
    const dropdown = document.getElementById('todoDropdown');
    const todoBtn = document.getElementById('todoBtn');
    if (dropdown && todoBtn && !dropdown.contains(e.target) && !todoBtn.contains(e.target)) {
        dropdown.style.display = 'none';
        document.removeEventListener('click', closeTodoMenuOutside);
    }
}

function renderTodoMenu() {
    const todos = getTodoItems();
    const countEl = document.getElementById('todoCount');
    const bodyEl = document.getElementById('todoDropdownBody');
    const dotEl = document.getElementById('todoDot');
    
    if (countEl) countEl.textContent = todos.length;
    if (dotEl) dotEl.style.display = todos.length > 0 ? 'block' : 'none';
    
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

function closeAdminMenuOutside(e) {
    const dropdown = document.getElementById('adminDropdown');
    const profile = document.getElementById('adminProfile');
    if (dropdown && profile && !dropdown.contains(e.target) && !profile.contains(e.target)) {
        dropdown.style.display = 'none';
        document.getElementById('adminArrow').style.transform = 'rotate(0deg)';
        document.removeEventListener('click', closeAdminMenuOutside);
    }
}

function showAdminInfo() {
    const dropdown = document.getElementById('adminDropdown');
    const arrow = document.getElementById('adminArrow');
    dropdown.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    document.removeEventListener('click', closeAdminMenuOutside);
    
    const storeInfo = currentUser.storeName ? `<div style="margin-top:8px;padding-top:12px;border-top:1px solid #e2e8f0;"><div style="font-size:13px;color:#64748b;margin-bottom:4px;">所属门店</div><div style="font-weight:600;">${currentUser.storeName}</div></div>` : '';
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeAdminInfoModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:400px;">
            <div class="modal-header">
                <h3><i class="fas fa-user-circle"></i> 个人信息</h3>
                <button onclick="closeAdminInfoModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:24px;">
                <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:24px;">
                    <div style="width:80px;height:80px;background:#4f6ef7;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:28px;">${currentUser.name.charAt(0)}</div>
                    <div style="font-weight:600;font-size:18px;margin-top:12px;">${currentUser.name}</div>
                    <div style="font-size:13px;color:#94a3b8;">${currentUser.role === 'super_admin' ? '超级管理员' : currentUser.role === 'store_admin' ? '门店管理员' : currentUser.role === 'goods_operator' ? '商品运营' : currentUser.role === 'order_service' ? '订单客服' : currentUser.role}</div>
                </div>
                <div>
                    <div style="font-size:13px;color:#64748b;margin-bottom:4px;">用户名</div>
                    <div style="font-weight:600;padding:12px;background:#f8fafc;border-radius:8px;">${currentUser.name}</div>
                </div>
                <div style="margin-top:12px;">
                    <div style="font-size:13px;color:#64748b;margin-bottom:4px;">手机号</div>
                    <div style="font-weight:600;padding:12px;background:#f8fafc;border-radius:8px;">138****8888</div>
                </div>
                <div style="margin-top:12px;">
                    <div style="font-size:13px;color:#64748b;margin-bottom:4px;">姓名</div>
                    <div style="font-weight:600;padding:12px;background:#f8fafc;border-radius:8px;">${currentUser.name}</div>
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

function closeAdminInfoModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function handleLogout() {
    clearUserFromStorage();
    
    currentUser = {
        name: '超级管理员',
        role: 'super_admin',
        storeId: null,
        storeName: null
    };
    
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('loginForm').reset();
    document.body.classList.remove('show-main');
}