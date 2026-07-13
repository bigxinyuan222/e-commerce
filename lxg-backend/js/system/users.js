let usersData = [
    { id: 'user-001', userName: '王小明', phone: '138****1234', avatar: '王', gender: '男', status: 'active', registerTime: '2026-06-01 10:30', lastLogin: '2026-06-25 14:20', totalOrders: 12, totalAmount: 3520, reviewCount: 8, couponCount: 5 },
    { id: 'user-002', userName: '李佳琦', phone: '139****5678', avatar: '李', gender: '女', status: 'active', registerTime: '2026-05-20 16:45', lastLogin: '2026-06-24 11:10', totalOrders: 8, totalAmount: 2180, reviewCount: 5, couponCount: 3 },
    { id: 'user-003', userName: '张雪迎', phone: '137****9012', avatar: '张', gender: '女', status: 'frozen', registerTime: '2026-05-10 09:15', lastLogin: '2026-06-20 18:30', totalOrders: 5, totalAmount: 890, reviewCount: 2, couponCount: 1 },
    { id: 'user-004', userName: '刘亦菲', phone: '136****3456', avatar: '刘', gender: '女', status: 'active', registerTime: '2026-04-15 14:00', lastLogin: '2026-06-25 10:00', totalOrders: 15, totalAmount: 4290, reviewCount: 12, couponCount: 8 },
    { id: 'user-005', userName: '陈伟霆', phone: '135****7890', avatar: '陈', gender: '男', status: 'active', registerTime: '2026-03-20 11:30', lastLogin: '2026-06-24 08:45', totalOrders: 20, totalAmount: 6580, reviewCount: 15, couponCount: 10 },
    { id: 'user-006', userName: '赵丽颖', phone: '134****2345', avatar: '赵', gender: '女', status: 'active', registerTime: '2026-02-10 15:20', lastLogin: '2026-06-25 12:00', totalOrders: 18, totalAmount: 5120, reviewCount: 10, couponCount: 6 },
    { id: 'user-007', userName: '周杰', phone: '138****3333', avatar: '周', gender: '男', status: 'active', registerTime: '2026-06-15 08:00', lastLogin: '2026-06-25 09:30', totalOrders: 3, totalAmount: 459, reviewCount: 1, couponCount: 2 },
    { id: 'user-008', userName: '吴凡', phone: '136****4444', avatar: '吴', gender: '男', status: 'frozen', registerTime: '2026-05-25 13:00', lastLogin: '2026-06-18 17:00', totalOrders: 6, totalAmount: 1298, reviewCount: 4, couponCount: 3 }
];

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

function handleUserAction(userId, action) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    if (action === 'freeze') {
        showConfirm(`确定要冻结用户 ${user.userName} 吗？冻结后用户无法登录和下单。`, function() {
            user.status = 'frozen';
            alert(`用户 ${user.userName} 已冻结！`);
            refreshUsersPage();
        });
    } else if (action === 'unfreeze') {
        showConfirm(`确定要解冻用户 ${user.userName} 吗？`, function() {
            user.status = 'active';
            alert(`用户 ${user.userName} 已解冻！`);
            refreshUsersPage();
        });
    }
}

function showUserDetail(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeUserModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-user"></i> 用户详情 · ${user.userName}</h3>
                <button onclick="closeUserModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:20px;background:#f8fafc;border-radius:12px;">
                    <div style="width:80px;height:80px;background:#4f6ef7;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:28px;">${user.avatar}</div>
                    <div>
                        <div style="font-size:20px;font-weight:600;color:#1e293b;">${user.userName}</div>
                        <div style="font-size:14px;color:#64748b;margin-top:4px;">${user.phone}</div>
                        <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
                            <span style="font-size:13px;color:#64748b;">${getGenderText(user.gender)}</span>
                            ${getStatusBadge(user.status)}
                        </div>
                    </div>
                </div>
                
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">用户ID</div>
                        <div style="font-weight:600;font-size:13px;">${user.id}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">注册时间</div>
                        <div style="font-weight:600;font-size:13px;">${user.registerTime}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">最后登录</div>
                        <div style="font-weight:600;font-size:13px;">${user.lastLogin || '-'}</div>
                    </div>
                    <div style="background:#f8fafc;border-radius:8px;padding:12px;">
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">账户状态</div>
                        <div>${getStatusBadge(user.status)}</div>
                    </div>
                </div>
                
                <div style="margin-bottom:16px;">
                    <div style="font-weight:600;font-size:14px;margin-bottom:12px;">消费统计</div>
                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
                        <div style="background:#f8fafc;border-radius:8px;padding:16px;text-align:center;">
                            <div style="font-size:24px;font-weight:700;color:#4f6ef7;">${user.totalOrders}</div>
                            <div style="font-size:12px;color:#64748b;margin-top:4px;">订单数量</div>
                        </div>
                        <div style="background:#f8fafc;border-radius:8px;padding:16px;text-align:center;">
                            <div style="font-size:24px;font-weight:700;color:#ef4444;">¥${user.totalAmount}</div>
                            <div style="font-size:12px;color:#64748b;margin-top:4px;">累计消费</div>
                        </div>
                        <div style="background:#f8fafc;border-radius:8px;padding:16px;text-align:center;">
                            <div style="font-size:24px;font-weight:700;color:#22c55e;">${user.reviewCount}</div>
                            <div style="font-size:12px;color:#64748b;margin-top:4px;">评价数量</div>
                        </div>
                        <div style="background:#f8fafc;border-radius:8px;padding:16px;text-align:center;">
                            <div style="font-size:24px;font-weight:700;color:#f59e0b;">${user.couponCount}</div>
                            <div style="font-size:12px;color:#64748b;margin-top:4px;">持有优惠券</div>
                        </div>
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

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px;">
            <div class="stat-card"><div class="label"><i class="fas fa-users"></i> 总用户数</div><div class="value" style="font-size:22px;">${totalCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 正常用户</div><div class="value" style="font-size:22px;color:#22c55e;">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-lock"></i> 已冻结</div><div class="value" style="font-size:22px;color:#f59e0b;">${frozenCount}</div></div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fas fa-users"></i> 用户列表</span>
                    <span class="text-muted" style="font-size:13px;">共 ${filteredUsers.length} 位用户 · 累计订单 ${totalOrders} 笔 · 累计消费 ¥${totalAmount}</span>
                </div>
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>用户</th><th>手机号</th><th>性别</th><th>注册时间</th><th>最近登录</th><th>订单数</th><th>消费金额</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>
                            ${filteredUsers.map(user => `
                                <tr>
                                    <td><div class="flex-center"><span style="width:28px;height:28px;border-radius:50%;background:#4f6ef7;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:12px;">${user.avatar}</span> ${user.userName}</div></td>
                                    <td>${user.phone}</td>
                                    <td>${getGenderText(user.gender)}</td>
                                    <td>${user.registerTime}</td>
                                    <td>${user.lastLogin}</td>
                                    <td>${user.totalOrders}</td>
                                    <td><span style="font-weight:600;">¥${user.totalAmount}</span></td>
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

            <div style="display:flex;flex-direction:column;gap:12px;">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 用户增长趋势</span></div>
                    <div class="card-body">
                        <div style="display:flex;align-items:flex-end;justify-content:space-between;height:120px;padding:0 8px;">
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:50px;background:#4f6ef7;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周一</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:70px;background:#7c3aed;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周二</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:45px;background:#4f6ef7;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周三</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:85px;background:#7c3aed;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周四</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:95px;background:#4f6ef7;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周五</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:110px;background:#7c3aed;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周六</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:65px;background:#4f6ef7;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周日</span></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-filter"></i> 快速筛选</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:8px;">
                            <button class="btn btn-sm btn-outline" style="width:100%;"><i class="fas fa-clock"></i> 今日注册</button>
                            <button class="btn btn-sm btn-outline" style="width:100%;"><i class="fas fa-user"></i> 本月活跃用户</button>
                            <button class="btn btn-sm btn-outline" style="width:100%;"><i class="fas fa-shopping-cart"></i> 有订单用户</button>
                            <button class="btn btn-sm btn-outline" style="width:100%;"><i class="fas fa-star"></i> 有评价用户</button>
                            <button class="btn btn-sm btn-outline" style="width:100%;"><i class="fas fa-lock"></i> 已冻结用户</button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-info-circle"></i> 用户统计</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span>本周新增用户</span>
                                <span style="font-weight:600;color:#4f6ef7;">128</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>本月新增用户</span>
                                <span style="font-weight:600;color:#4f6ef7;">456</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}