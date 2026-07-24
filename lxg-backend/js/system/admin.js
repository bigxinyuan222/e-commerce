// 管理员数据缓存
let adminData = [];
// 门店列表缓存（用于选择门店）
let storesList = [];
// 角色数据缓存
let roleData = [];

// 权限模块定义（用于角色权限配置）
const permissionModules = [
    { id: 'stats', name: '数据统计' },
    { id: 'goods', name: '商品管理' },
    { id: 'stock', name: '库存管理' },
    { id: 'store', name: '门店管理' },
    { id: 'homepage', name: '首页管理' },
    { id: 'order', name: '订单管理' },
    { id: 'refund', name: '退货退款' },
    { id: 'review', name: '评价管理' },
    { id: 'coupon', name: '优惠券管理' },
    { id: 'marketing', name: '营销活动' },
    { id: 'message', name: '客服消息' },
    { id: 'user', name: '用户管理' },
    { id: 'payment', name: '支付管理' },
    { id: 'admin', name: '管理员管理' },
    { id: 'system', name: '系统设置' }
];

// 管理员筛选条件
let currentAdminSearchKeyword = '';    // 搜索关键词
let currentAdminRoleFilter = 'all';    // 角色筛选
let currentAdminStatusFilter = 'all';  // 状态筛选

// 加载管理员列表
async function loadAdmins() {
    try {
        const params = {
            page: 1,
            size: 100
        };
        const response = await apiGet(API_CONFIG.admin.list, params);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        // 标准化管理员数据（手机号脱敏处理）
        adminData = dataList.map(item => ({
            id: item.ID || item.id,
            username: item.username || '',
            realName: item.name || '',
            phone: item.phone ? item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '',  // 手机号脱敏
            role: item.role && (item.role.id || item.role.ID) ? (item.role.id || item.role.ID) : (item.role || ''),
            roleName: item.role && item.role.name ? item.role.name : '',
            storeId: item.store && item.store.id ? item.store.id : null,
            storeName: item.store && item.store.name ? item.store.name : null,
            status: item.status === 1 ? 'active' : 'inactive',
            createTime: item.created_at || item.createdAt || item.createTime || '',
            lastLogin: item.last_login || item.lastLogin || ''
        }));
        // The current backend embeds roles in the admin list and does not expose GET /roles.
        if (!roleData.length) {
            const rolesById = new Map();
            dataList.forEach(item => {
                if (!item.role) return;
                const id = item.role.id || item.role.ID;
                if (id) rolesById.set(id, {
                    id,
                    name: item.role.name || '',
                    permissions: item.role.permissions || [],
                    description: item.role.description || ''
                });
            });
            roleData = Array.from(rolesById.values());
        }
        refreshAdminPage();
    } catch (error) {
        console.error('Failed to load admins:', error);
        showToast('加载管理员列表失败', 'error');
    }
}

// 加载门店列表（用于管理员分配门店）
async function loadAdminStores() {
    try {
        const response = await apiGet(API_CONFIG.stores.list);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        storesList = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || ''
        }));
        refreshAdminPage();
    } catch (error) {
        console.error('Failed to load stores:', error);
    }
}

// 加载角色列表（用于管理员分配角色）
async function loadRoles() {
    try {
        const response = await apiGet(API_CONFIG.admin.roles);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        roleData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            permissions: item.permissions || [],
            description: item.description || ''
        }));
        refreshAdminPage();
    } catch (error) {
        console.error('Failed to load roles:', error);
    }
}

// 获取管理员状态标签HTML
function getStatusBadge(status) {
    const colors = { active: 'green', inactive: 'gray' };
    const texts = { active: '启用', inactive: '停用' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 获取角色标签HTML
function getRoleBadge(role) {
    const classes = {
        1: 'system-tag primary',
        2: 'system-tag green',
        3: 'system-tag blue',
        4: 'system-tag orange'
    };
    const roleInfo = roleData.find(r => r.id == role);
    const text = roleInfo ? roleInfo.name : role;
    return `<span class="${classes[role] || 'system-tag'}">${text}</span>`;
}

// 根据筛选条件过滤管理员列表
function filterAdmins() {
    let filtered = adminData;
    // 角色筛选
    if (currentAdminRoleFilter !== 'all') {
        filtered = filtered.filter(a => a.role === currentAdminRoleFilter);
    }
    // 状态筛选
    if (currentAdminStatusFilter !== 'all') {
        filtered = filtered.filter(a => a.status === currentAdminStatusFilter);
    }
    // 关键词搜索（用户名、姓名、手机号）
    if (currentAdminSearchKeyword) {
        const keyword = currentAdminSearchKeyword.toLowerCase();
        filtered = filtered.filter(a => 
            a.username.toLowerCase().includes(keyword) || 
            a.realName.toLowerCase().includes(keyword) ||
            a.phone.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

// 执行管理员搜索
function searchAdmins() {
    const input = document.getElementById('adminSearchInput');
    if (input) {
        currentAdminSearchKeyword = input.value.trim();
        refreshAdminPage();
    }
}

// 切换角色筛选
function switchAdminRole(role) {
    currentAdminRoleFilter = role;
    refreshAdminPage();
}

// 切换状态筛选
function switchAdminStatus(status) {
    currentAdminStatusFilter = status;
    refreshAdminPage();
}

// 处理管理员操作（启用/停用/编辑/删除）
async function handleAdminAction(adminId, action) {
    console.log('handleAdminAction called:', adminId, action);
    console.log('adminData:', adminData);
    
    const admin = adminData.find(a => String(a.id) === String(adminId));
    console.log('Found admin:', admin);
    
    if (!admin) {
        showToast('未找到管理员', 'error');
        return;
    }
    
    // 超级管理员不可操作
    if (admin.role == 1) {
        showToast('超级管理员不可操作！', 'error');
        return;
    }
    
    if (action === 'toggle') {
        showConfirm(`确定要${admin.status === 'active' ? '停用' : '启用'}管理员 ${admin.realName} 吗？`, async function() {
            try {
                await apiPostWithQuery(API_CONFIG.admin.toggle, { id: adminId });
                admin.status = admin.status === 'active' ? 'inactive' : 'active';
                showToast(`管理员 ${admin.realName} 已${admin.status === 'active' ? '启用' : '停用'}！`, 'success');
                refreshAdminPage();
            } catch (error) {
                showToast('操作失败', 'error');
            }
        });
    } else if (action === 'edit') {
        showEditAdminModal(admin);
    } else if (action === 'delete') {
        showConfirm(`确定要删除管理员 ${admin.realName} 吗？此操作不可撤销！`, async function() {
            try {
                await apiPostWithQuery(API_CONFIG.admin.delete, { id: adminId });
                adminData = adminData.filter(a => String(a.id) !== String(adminId));
                showToast('管理员已删除！', 'success');
                refreshAdminPage();
            } catch (error) {
                showToast('删除失败', 'error');
            }
        });
    }
}

function showAddAdminModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeAdminModal()"></div>
        <div class="modal-content" style="width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增管理员</h3>
                <button onclick="closeAdminModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="system-form-grid">
                    <div><label class="system-form-label">手机号 <span class="system-form-required">*</span></label><input type="text" id="adminPhone" placeholder="请输入手机号" class="system-form-input" /></div>
                    <div><label class="system-form-label">登录密码 <span class="system-form-required">*</span></label><input type="password" id="adminPassword" placeholder="请输入密码" class="system-form-input" /></div>
                    <div><label class="system-form-label">用户名 <span class="system-form-required">*</span></label><input type="text" id="adminUsername" placeholder="请输入用户名" class="system-form-input" /></div>
                    <div><label class="system-form-label">真实姓名 <span class="system-form-required">*</span></label><input type="text" id="adminRealName" placeholder="请输入真实姓名" class="system-form-input" /></div>
                    <div>
                        <label class="system-form-label">角色 <span class="system-form-required">*</span></label>
                        <select id="adminRoleSelect" class="system-form-select">
                            <option value="2">客服管理员</option>
                            <option value="3">运营管理员</option>
                            <option value="4">门店管理员</option>
                        </select>
                    </div>
                    <div id="adminStoreContainer">
                        <label class="system-form-label">所属门店</label>
                        <select id="adminStore" class="system-form-select">
                            <option value="">请选择门店</option>
                            ${storesList.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeAdminModal()">取消</button>
                <button class="btn btn-primary" onclick="saveAdmin()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function showEditAdminModal(admin) {
    const modalContent = `
        <div class="modal-overlay" onclick="closeAdminModal()"></div>
        <div class="modal-content" style="width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑管理员 · ${admin.realName}</h3>
                <button onclick="closeAdminModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="system-form-grid">
                    <div><label class="system-form-label">手机号</label><input type="text" id="adminPhone" value="${admin.phone}" readonly class="system-form-input readonly" /></div>
                    <div><label class="system-form-label">用户名</label><input type="text" id="adminUsername" value="${admin.username}" class="system-form-input" /></div>
                    <div><label class="system-form-label">真实姓名 <span class="system-form-required">*</span></label><input type="text" id="adminRealName" value="${admin.realName}" class="system-form-input" /></div>
                    <div><label class="system-form-label">重置密码</label><input type="password" id="adminPassword" placeholder="不填则不修改" class="system-form-input" /></div>
                    <div>
                        <label class="system-form-label">角色</label>
                        <select id="adminRoleSelect" disabled class="system-form-select disabled">
                            <option value="2" ${admin.role == 2 ? 'selected' : ''}>客服管理员</option>
                            <option value="3" ${admin.role == 3 ? 'selected' : ''}>运营管理员</option>
                            <option value="4" ${admin.role == 4 ? 'selected' : ''}>门店管理员</option>
                        </select>
                    </div>
                    <div>
                        <label class="system-form-label">所属门店</label>
                        <select id="adminStore" class="system-form-select">
                            <option value="">请选择门店</option>
                            ${storesList.map(s => `<option value="${s.id}" ${admin.storeId === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeAdminModal()">取消</button>
                <button class="btn btn-primary" onclick="saveAdmin('${admin.id}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

async function saveAdmin(adminId = null) {
    const phone = document.getElementById('adminPhone').value.trim();
    const username = document.getElementById('adminUsername').value.trim();
    const realName = document.getElementById('adminRealName').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const role = document.getElementById('adminRoleSelect').value;
    const storeSelect = document.getElementById('adminStore');
    const storeId = storeSelect ? storeSelect.value : null;
    const store = storesList.find(s => String(s.id) === String(storeId));
    
    if (!phone) {
        showToast('请输入手机号', 'error');
        return;
    }
    
    if (!username) {
        showToast('请输入用户名', 'error');
        return;
    }
    
    if (!realName) {
        showToast('请输入真实姓名', 'error');
        return;
    }
    
    if (!adminId && !password) {
        showToast('请输入密码', 'error');
        return;
    }
    
    const exists = adminData.find(a => a.phone === phone && String(a.id) !== String(adminId));
    if (exists) {
        showToast('该手机号已被使用', 'error');
        return;
    }
    
    try {
        if (adminId) {
            const data = {
                username,
                name: realName,
                phone,
                store_id: storeId ? parseInt(storeId) : null
            };
            if (password) data.password = password;
            await apiPut(API_CONFIG.admin.edit, data, { id: adminId });
            
            const admin = adminData.find(a => String(a.id) === String(adminId));
            if (admin) {
                admin.username = username;
                admin.realName = realName;
                if (store) {
                    admin.storeId = storeId;
                    admin.storeName = store.name;
                } else {
                    admin.storeId = null;
                    admin.storeName = null;
                }
            }
            showToast('管理员信息已更新！', 'success');
        } else {
            const params = {
                username,
                password,
                name: realName,
                phone,
                role_id: parseInt(role)
            };
            const roleId = parseInt(role);
            if (roleId === 4 && storeId && storeId !== '0') {
                params.store_id = parseInt(storeId);
            }
            const result = await apiPostWithQuery(API_CONFIG.admin.add, params);
            
            adminData.unshift({
                id: result.id || 'admin-' + Date.now(),
                username: username,
                realName: realName,
                phone: phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
                role: role,
                storeId: storeId,
                storeName: store ? store.name : null,
                status: 'active',
                createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
                lastLogin: null
            });
            showToast('管理员创建成功！', 'success');
        }
        
        closeAdminModal();
        refreshAdminPage();
    } catch (error) {
        console.error('操作失败:', error);
        showToast(error.message || '操作失败', 'error');
    }
}

function closeAdminModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function showAddRoleModal() {
    const modalContent = `
        <div class="modal-overlay" onclick="closeAdminModal()"></div>
        <div class="modal-content" style="width:600px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增角色</h3>
                <button onclick="closeAdminModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label class="system-form-label">角色名称 <span class="system-form-required">*</span></label>
                        <input type="text" id="roleName" placeholder="请输入角色名称，如：财务专员" class="system-form-input" />
                    </div>
                    <div>
                        <label class="system-form-label">角色描述</label>
                        <textarea id="roleDesc" placeholder="请输入角色描述" rows="3" class="system-form-textarea"></textarea>
                    </div>
                    <div>
                        <label class="system-form-label">权限模块 <span class="system-form-required">*</span></label>
                        <div style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${permissionModules.map(p => `
                                <label class="system-form-checkbox-label">
                                    <input type="checkbox" name="rolePermission" value="${p.id}" />
                                    <span>${p.name}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeAdminModal()">取消</button>
                <button class="btn btn-primary" onclick="saveRole()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveRole() {
    const name = document.getElementById('roleName').value.trim();
    const desc = document.getElementById('roleDesc').value.trim();
    const checkboxes = document.querySelectorAll('input[name="rolePermission"]:checked');
    const permissions = Array.from(checkboxes).map(cb => cb.value);
    
    if (!name) {
        showToast('请输入角色名称', 'error');
        return;
    }
    
    if (permissions.length === 0) {
        showToast('请至少选择一个权限模块', 'error');
        return;
    }
    
    const exists = roleData.find(r => r.name === name);
    if (exists) {
        showToast('该角色名称已存在', 'error');
        return;
    }
    
    const roleId = 'role_' + Date.now();
    roleData.push({
        id: roleId,
        name: name,
        permissions: permissions,
        description: desc || '暂无描述'
    });
    
    showToast('角色创建成功！', 'success');
    closeAdminModal();
    refreshAdminPage();
}

function refreshAdminPage() {
    const panel = document.getElementById('panel-admin');
    if (panel) panel.innerHTML = adminPage();
}

function adminPage() {
    const activeCount = adminData.filter(a => a.status === 'active').length;
    const inactiveCount = adminData.filter(a => a.status === 'inactive').length;
    const staffCount = adminData.filter(a => a.role == 4).length;
    
    const filteredAdmins = filterAdmins();
    const subAdmins = filteredAdmins.filter(a => a.role != 1);
    
    return `
        <div class="flex-between mb-4">
            <div class="search-bar">
                <input id="adminSearchInput" placeholder="用户名 / 手机号 / 姓名" onkeypress="if(event.key==='Enter') searchAdmins()" />
                <select onchange="switchAdminRole(this.value)">
                    <option value="all" ${currentAdminRoleFilter === 'all' ? 'selected' : ''}>全部角色</option>
                    <option value="2" ${currentAdminRoleFilter == 2 ? 'selected' : ''}>客服管理员</option>
                    <option value="3" ${currentAdminRoleFilter == 3 ? 'selected' : ''}>运营管理员</option>
                    <option value="4" ${currentAdminRoleFilter == 4 ? 'selected' : ''}>门店管理员</option>
                </select>
                <select onchange="switchAdminStatus(this.value)">
                    <option value="all" ${currentAdminStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="active" ${currentAdminStatusFilter === 'active' ? 'selected' : ''}>启用</option>
                    <option value="inactive" ${currentAdminStatusFilter === 'inactive' ? 'selected' : ''}>停用</option>
                </select>
                <button class="btn btn-primary" onclick="searchAdmins()"><i class="fas fa-search"></i> 搜索</button>
            </div>
            <button class="btn btn-primary" onclick="showAddAdminModal()"><i class="fas fa-plus"></i> 新增管理员</button>
        </div>

        <div class="system-stat-grid">
            <div class="system-stat-card"><div class="label"><i class="fas fa-user-shield"></i> 总管理员</div><div class="value">${adminData.length}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已启用</div><div class="value green">${activeCount}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-lock"></i> 已停用</div><div class="value yellow">${inactiveCount}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-store-alt"></i> 门店管理员</div><div class="value orange">${staffCount}</div></div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-user-shield"></i> 管理员列表</span><span class="text-muted" style="font-size:13px;">共 ${subAdmins.length} 位子管理员</span></div>
            <div class="card-body no-pad">
                <div class="table-wrap"><table>
                    <thead><tr><th>用户名</th><th>真实姓名</th><th>手机号</th><th>角色</th><th>所属门店</th><th>状态</th><th>创建时间</th><th>最后登录</th><th>操作</th></tr></thead>
                    <tbody>
                        ${subAdmins.map(admin => `
                            <tr>
                                <td>${admin.username}</td>
                                <td>${admin.realName}</td>
                                <td>${admin.phone}</td>
                                <td>${getRoleBadge(admin.role)}</td>
                                <td>${admin.storeName || '-'}</td>
                                <td>${getStatusBadge(admin.status)}</td>
                                <td>${admin.createTime}</td>
                                <td>${admin.lastLogin || '-'}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline" onclick="handleAdminAction('${admin.id}', 'edit')"><i class="fas fa-edit"></i> 编辑</button>
                                    ${admin.status === 'active' ? `
                                    <button class="btn btn-sm btn-danger" onclick="handleAdminAction('${admin.id}', 'toggle')"><i class="fas fa-times"></i> 停用</button>
                                    ` : `
                                    <button class="btn btn-sm btn-success" onclick="handleAdminAction('${admin.id}', 'toggle')"><i class="fas fa-check"></i> 启用</button>
                                    `}
                                    <button class="btn btn-sm btn-danger" onclick="handleAdminAction('${admin.id}', 'delete')"><i class="fas fa-trash"></i> 删除</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table></div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-lock"></i> 角色权限管理</span><button class="btn btn-sm btn-primary" onclick="showAddRoleModal()"><i class="fas fa-plus"></i> 新增角色</button></div>
            <div class="card-body">
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
                    ${roleData.map(role => `
                        <div class="system-role-card ${role.id === 'super_admin' ? 'super-admin' : ''}">
                            <div class="role-name">${role.name}</div>
                            <div class="role-desc">权限范围：${role.description}</div>
                            <div style="margin-top:8px;">
                                ${role.permissions.map(pid => {
                                    const module = permissionModules.find(m => m.id === pid);
                                    return `<span class="system-tag ${role.id === 'super_admin' ? 'primary' : ''}">${module ? module.name : pid}</span>`;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
