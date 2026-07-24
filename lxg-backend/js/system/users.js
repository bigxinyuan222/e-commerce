let usersData = [];
let currentUserSearchKeyword = '';
let currentUserStatusFilter = 'all';

function getStatusBadge(status) {
    const colors = { active: 'green', frozen: 'yellow', deleted: 'gray' };
    const texts = { active: '正常', frozen: '已冻结', deleted: '已注销' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function filterUsers() {
    let filtered = usersData;
    if (currentUserStatusFilter !== 'all') {
        filtered = filtered.filter(u => u.status === currentUserStatusFilter);
    }
    if (currentUserSearchKeyword) {
        const keyword = currentUserSearchKeyword.toLowerCase();
        filtered = filtered.filter(u => 
            u.userName.toLowerCase().includes(keyword) || 
            u.phone.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchUsers() {
    const input = document.getElementById('userSearchInput');
    if (input) {
        currentUserSearchKeyword = input.value.trim();
        refreshUsersPage();
    }
}

function switchUserStatus(status) {
    currentUserStatusFilter = status;
    refreshUsersPage();
}

function getGenderText(gender) {
    const texts = { male: '男', female: '女', other: '其他' };
    return texts[gender] || gender;
}

async function loadUsers() {
    try {
        const response = await apiGet(API_CONFIG.users.list);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        usersData = dataList.map(user => ({
            id: user.ID || user.id,
            userName: user.userName || user.name || '',
            phone: user.phone || '',
            avatar: (user.userName || user.name || '用').charAt(0),
            gender: user.gender || 'male',
            status: user.status === 1 ? 'active' : user.status === 0 ? 'frozen' : 'deleted',
            registerTime: user.CreatedAt || user.createdAt || '',
            lastLogin: user.lastLogin || '',
            totalOrders: user.totalOrders || 0,
            totalAmount: user.totalAmount || 0,
            reviewCount: user.reviewCount || 0,
            couponCount: user.couponCount || 0
        }));
        refreshUsersPage();
    } catch (error) {
        console.error('Failed to load users:', error);
    }
}

async function handleUserAction(userId, action) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    if (action === 'freeze') {
        showConfirm(`确定要冻结用户 ${user.userName} 吗？冻结后用户无法登录和下单。`, async function() {
            try {
                const response = await apiPut(API_CONFIG.users.toggle, { status: 0 }, { id: userId });
                if (response.code === 200) {
                    user.status = 'frozen';
                    showToast(`用户 ${user.userName} 已冻结！`, 'success');
                    refreshUsersPage();
                } else {
                    showToast(response.message || '操作失败', 'error');
                }
            } catch (error) {
                console.error('Failed to freeze user:', error);
                showToast('操作失败，请重试', 'error');
            }
        });
    } else if (action === 'unfreeze') {
        showConfirm(`确定要解冻用户 ${user.userName} 吗？`, async function() {
            try {
                const response = await apiPut(API_CONFIG.users.toggle, { status: 1 }, { id: userId });
                if (response.code === 200) {
                    user.status = 'active';
                    showToast(`用户 ${user.userName} 已解冻！`, 'success');
                    refreshUsersPage();
                } else {
                    showToast(response.message || '操作失败', 'error');
                }
            } catch (error) {
                console.error('Failed to unfreeze user:', error);
                showToast('操作失败，请重试', 'error');
            }
        });
    }
}

function showUserDetail(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeUserModal()"></div>
        <div class="modal-content wide">
            <div class="modal-header">
                <h3><i class="fas fa-user"></i> 用户详情 · ${user.userName}</h3>
                <button onclick="closeUserModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body scrollable">
                <div class="system-user-detail-header">
                    <div class="system-user-detail-avatar">${user.avatar}</div>
                    <div class="system-user-detail-info">
                        <div class="name">${user.userName}</div>
                        <div class="phone">${user.phone}</div>
                        <div class="meta">
                            <span class="gender">${getGenderText(user.gender)}</span>
                            ${getStatusBadge(user.status)}
                        </div>
                    </div>
                </div>
                
                <div class="system-user-detail-grid">
                    <div class="system-user-detail-card"><div class="label">用户ID</div><div class="value">${user.id}</div></div>
                    <div class="system-user-detail-card"><div class="label">注册时间</div><div class="value">${user.registerTime}</div></div>
                    <div class="system-user-detail-card"><div class="label">最后登录</div><div class="value">${user.lastLogin || '-'}</div></div>
                    <div class="system-user-detail-card"><div class="label">账户状态</div><div>${getStatusBadge(user.status)}</div></div>
                </div>
                
                <div class="system-user-stats-section">
                    <div class="system-user-stats-title">消费统计</div>
                    <div class="system-user-stats-grid">
                        <div class="system-user-stat-card"><div class="value blue">${user.totalOrders}</div><div class="label">订单数量</div></div>
                        <div class="system-user-stat-card"><div class="value red">¥${user.totalAmount}</div><div class="label">累计消费</div></div>
                        <div class="system-user-stat-card"><div class="value green">${user.reviewCount}</div><div class="label">评价数量</div></div>
                        <div class="system-user-stat-card"><div class="value yellow">${user.couponCount}</div><div class="label">持有优惠券</div></div>
                    </div>
                </div>
                
            </div>
            <div class="modal-footer">
                ${user.status === 'active' ? `
                <button class="btn btn-danger" onclick="handleUserAction('${user.id}', 'freeze')"><i class="fas fa-lock"></i> 冻结账号</button>
                ` : `
                <button class="btn btn-success" onclick="handleUserAction('${user.id}', 'unfreeze')"><i class="fas fa-unlock"></i> 解冻账号</button>
                `}
                <button class="btn btn-outline" onclick="closeUserModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function closeUserModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshUsersPage() {
    const panel = document.getElementById('panel-users');
    if (panel) panel.innerHTML = usersPage();
}

function usersPage() {
    const totalCount = usersData.length;
    const activeCount = usersData.filter(u => u.status === 'active').length;
    const frozenCount = usersData.filter(u => u.status === 'frozen').length;
    const deletedCount = usersData.filter(u => u.status === 'deleted').length;
    const totalOrders = usersData.reduce((sum, u) => sum + u.totalOrders, 0);
    const totalAmount = usersData.reduce((sum, u) => sum + u.totalAmount, 0);
    const filteredUsers = filterUsers();
    
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
            <div class="search-bar">
                <input id="userSearchInput" placeholder="昵称 / 手机号" onkeypress="if(event.key==='Enter') searchUsers()" />
                <select onchange="switchUserStatus(this.value)">
                    <option value="all" ${currentUserStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="active" ${currentUserStatusFilter === 'active' ? 'selected' : ''}>正常</option>
                    <option value="frozen" ${currentUserStatusFilter === 'frozen' ? 'selected' : ''}>已冻结</option>
                </select>
                <button class="btn btn-primary" onclick="searchUsers()"><i class="fas fa-search"></i> 搜索</button>
            </div>
        </div>

        <div class="system-stats-row">
            <div class="stat-card"><div class="label"><i class="fas fa-users"></i> 总用户数</div><div class="value">${totalCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 正常用户</div><div class="value green">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-lock"></i> 已冻结</div><div class="value yellow">${frozenCount}</div></div>
        </div>

        <div class="system-layout-main">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fas fa-users"></i> 用户列表</span>
                    <span class="system-text-muted">共 ${filteredUsers.length} 位用户 · 累计订单 ${totalOrders} 笔 · 累计消费 ¥${totalAmount}</span>
                </div>
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>用户</th><th>手机号</th><th>性别</th><th>注册时间</th><th>最近登录</th><th>订单数</th><th>消费金额</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>
                            ${filteredUsers.map(user => `
                                <tr>
                                    <td><div class="flex-center"><span class="system-user-avatar-sm">${user.avatar}</span> ${user.userName}</div></td>
                                    <td>${user.phone}</td>
                                    <td>${getGenderText(user.gender)}</td>
                                    <td>${user.registerTime}</td>
                                    <td>${user.lastLogin}</td>
                                    <td>${user.totalOrders}</td>
                                    <td><span class="system-amount">¥${user.totalAmount}</span></td>
                                    <td>${getStatusBadge(user.status)}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline" onclick="showUserDetail('${user.id}')"><i class="fas fa-eye"></i> 详情</button>
                                        ${user.status === 'active' ? `
                                        <button class="btn btn-sm btn-danger" onclick="handleUserAction('${user.id}', 'freeze')"><i class="fas fa-lock"></i> 冻结</button>
                                        ` : `
                                        <button class="btn btn-sm btn-success" onclick="handleUserAction('${user.id}', 'unfreeze')"><i class="fas fa-unlock"></i> 解冻</button>
                                        `}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table></div>
                </div>
            </div>

            <div class="system-card-stack">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 用户增长趋势</span></div>
                    <div class="card-body">
                        <div class="system-bar-chart">
                            <div class="system-bar-item"><div class="bar blue" style="height:50px;"></div><span class="label">周一</span></div>
                            <div class="system-bar-item"><div class="bar purple" style="height:70px;"></div><span class="label">周二</span></div>
                            <div class="system-bar-item"><div class="bar blue" style="height:45px;"></div><span class="label">周三</span></div>
                            <div class="system-bar-item"><div class="bar purple" style="height:85px;"></div><span class="label">周四</span></div>
                            <div class="system-bar-item"><div class="bar blue" style="height:95px;"></div><span class="label">周五</span></div>
                            <div class="system-bar-item"><div class="bar purple" style="height:110px;"></div><span class="label">周六</span></div>
                            <div class="system-bar-item"><div class="bar blue" style="height:65px;"></div><span class="label">周日</span></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-filter"></i> 快速筛选</span></div>
                    <div class="card-body">
                        <div class="system-filter-buttons">
                            <button class="btn btn-sm btn-outline"><i class="fas fa-clock"></i> 今日注册</button>
                            <button class="btn btn-sm btn-outline"><i class="fas fa-user"></i> 本月活跃用户</button>
                            <button class="btn btn-sm btn-outline"><i class="fas fa-shopping-cart"></i> 有订单用户</button>
                            <button class="btn btn-sm btn-outline"><i class="fas fa-star"></i> 有评价用户</button>
                            <button class="btn btn-sm btn-outline"><i class="fas fa-lock"></i> 已冻结用户</button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 用户统计</span></div>
                    <div class="card-body">
                        <div class="system-stats-info">
                            <div class="system-stats-info-row">
                                <span>本周新增用户</span>
                                <span class="value">128</span>
                            </div>
                            <div class="system-stats-info-row">
                                <span>本月新增用户</span>
                                <span class="value">456</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}