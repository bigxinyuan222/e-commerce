let adminData = [
    { id: 'admin-001', username: '超级管理员', realName: '张三', phone: '138****0000', role: 'super_admin', storeId: null, storeName: null, status: 'active', createTime: '2026-06-01 00:00', lastLogin: '2026-06-25 14:20' },
    { id: 'admin-002', username: '商品运营', realName: '李四', phone: '138****1111', role: 'goods_op', storeId: null, storeName: null, status: 'active', createTime: '2026-06-10 10:00', lastLogin: '2026-06-24 11:10' },
    { id: 'admin-003', username: '订单客服', realName: '王五', phone: '138****2222', role: 'order_cs', storeId: null, storeName: null, status: 'inactive', createTime: '2026-06-12 14:00', lastLogin: '2026-06-23 08:30' },
    { id: 'admin-004', username: '北京朝阳店店员', realName: '赵六', phone: '138****3333', role: 'store_staff', storeId: 'store-001', storeName: '北京朝阳店', status: 'active', createTime: '2026-06-15 09:00', lastLogin: '2026-06-25 10:00' },
    { id: 'admin-005', username: '上海浦东店店员', realName: '孙七', phone: '138****4444', role: 'store_staff', storeId: 'store-002', storeName: '上海浦东店', status: 'active', createTime: '2026-06-18 11:00', lastLogin: '2026-06-24 16:00' },
    { id: 'admin-006', username: '广州天河店店员', realName: '周八', phone: '138****5555', role: 'store_staff', storeId: 'store-003', storeName: '广州天河店', status: 'inactive', createTime: '2026-06-20 14:00', lastLogin: '2026-06-22 09:00' }
];

const storesList = [
    { id: 'store-001', name: '北京朝阳店' },
    { id: 'store-002', name: '上海浦东店' },
    { id: 'store-003', name: '广州天河店' },
    { id: 'store-004', name: '深圳南山店' }
];

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

let roleData = [
    { id: 'super_admin', name: '超级管理员', permissions: permissionModules.map(p => p.id), description: '全部功能，含系统管理模块' },
    { id: 'goods_op', name: '商品运营', permissions: ['stats', 'goods', 'stock', 'review', 'coupon', 'marketing'], description: '商品上下架、库存调整、评价审核、活动配置' },
    { id: 'order_cs', name: '订单客服', permissions: ['order', 'refund', 'message'], description: '处理订单、回复用户咨询' },
    { id: 'store_staff', name: '门店店员', permissions: ['store'], description: '查看本店订单、处理本店退货、核销自提、编辑本店信息' }
];

let currentAdminSearchKeyword = '';
let currentAdminRoleFilter = 'all';
let currentAdminStatusFilter = 'all';

function getStatusBadge(status) {
    const colors = { active: 'green', inactive: 'gray' };
    const texts = { active: '启用', inactive: '停用' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function getRoleBadge(role) {
    const styles = {
        super_admin: 'background:#eef1ff;color:#4f6ef7;',
        goods_op: 'background:#e8f5e9;color:#2e7d32;',
        order_cs: 'background:#e3f2fd;color:#1565c0;',
        store_staff: 'background:#fff3e0;color:#e65100;'
    };
    const roleInfo = roleData.find(r => r.id === role);
    const text = roleInfo ? roleInfo.name : role;
    return `<span class="tag" style="${styles[role] || 'background:#f1f5f9;color:#64748b;'}">${text}</span>`;
}

function filterAdmins() {
    let filtered = adminData;
    if (currentAdminRoleFilter !== 'all') {
        filtered = filtered.filter(a => a.role === currentAdminRoleFilter);
    }
    if (currentAdminStatusFilter !== 'all') {
        filtered = filtered.filter(a => a.status === currentAdminStatusFilter);
    }
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

function searchAdmins() {
    const input = document.getElementById('adminSearchInput');
    if (input) {
        currentAdminSearchKeyword = input.value.trim();
        refreshAdminPage();
    }
}

function switchAdminRole(role) {
    currentAdminRoleFilter = role;
    refreshAdminPage();
}

function switchAdminStatus(status) {
    currentAdminStatusFilter = status;
    refreshAdminPage();
}

function handleAdminAction(adminId, action) {
    const admin = adminData.find(a => a.id === adminId);
    if (!admin) return;
    
    if (admin.role === 'super_admin') {
        alert('超级管理员不可操作！');
        return;
    }
    
    if (action === 'toggle') {
        showConfirm(`确定要${admin.status === 'active' ? '停用' : '启用'}管理员 ${admin.name} 吗？`, function() {
            admin.status = admin.status === 'active' ? 'inactive' : 'active';
            alert(`管理员 ${admin.name} 已${admin.status === 'active' ? '启用' : '停用'}！`);
            refreshAdminPage();
        });
    } else if (action === 'edit') {
        showEditAdminModal(admin);
    } else if (action === 'delete') {
        showConfirm(`确定要删除管理员 ${admin.name} 吗？此操作不可撤销！`, function() {
            adminData = adminData.filter(a => a.id !== adminId);
            alert('管理员已删除！');
            refreshAdminPage();
        });
    }
    
    refreshAdminPage();
}

function showAddAdminModal() {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeAdminModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增管理员</h3>
                <button onclick="closeAdminModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">手机号 <span style="color:#ef4444;">*</span></label><input type="text" id="adminPhone" placeholder="请输入手机号" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">登录密码 <span style="color:#ef4444;">*</span></label><input type="password" id="adminPassword" placeholder="请输入密码" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">用户名 <span style="color:#ef4444;">*</span></label><input type="text" id="adminUsername" placeholder="请输入用户名" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">真实姓名 <span style="color:#ef4444;">*</span></label><input type="text" id="adminRealName" placeholder="请输入真实姓名" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">角色 <span style="color:#ef4444;">*</span></label>
                        <select id="adminRole" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" onchange="toggleStoreSelect()">
                            <option value="goods_op">商品运营</option>
                            <option value="order_cs">订单客服</option>
                            <option value="store_staff">门店店员</option>
                        </select>
                    </div>
                    <div id="adminStoreContainer">
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">所属门店</label>
                        <select id="adminStore" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'">
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
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeAdminModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑管理员 · ${admin.name}</h3>
                <button onclick="closeAdminModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">手机号</label><input type="text" id="adminPhone" value="${admin.phone}" readonly style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;background:#f1f5f9;" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">用户名</label><input type="text" id="adminUsername" value="${admin.username}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">真实姓名 <span style="color:#ef4444;">*</span></label><input type="text" id="adminRealName" value="${admin.realName}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">重置密码</label><input type="password" id="adminPassword" placeholder="不填则不修改" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" /></div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">角色</label>
                        <select id="adminRole" disabled style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;background:#f1f5f9;">
                            <option value="goods_op" ${admin.role === 'goods_op' ? 'selected' : ''}>商品运营</option>
                            <option value="order_cs" ${admin.role === 'order_cs' ? 'selected' : ''}>订单客服</option>
                            <option value="store_staff" ${admin.role === 'store_staff' ? 'selected' : ''}>门店店员</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">所属门店</label>
                        <select id="adminStore" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'">
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

function toggleStoreSelect() {
    const role = document.getElementById('adminRole').value;
    const container = document.getElementById('adminStoreContainer');
    if (container) {
        container.style.display = 'block';
    }
}

function saveAdmin(adminId = null) {
    const phone = document.getElementById('adminPhone').value.trim();
    const username = document.getElementById('adminUsername').value.trim();
    const realName = document.getElementById('adminRealName').value.trim();
    const password = document.getElementById('adminPassword').value;
    const role = document.getElementById('adminRole').value;
    const storeId = document.getElementById('adminStore') ? document.getElementById('adminStore').value : null;
    const store = storesList.find(s => s.id === storeId);
    
    if (!phone) {
        alert('请输入手机号');
        return;
    }
    
    if (!username) {
        alert('请输入用户名');
        return;
    }
    
    if (!realName) {
        alert('请输入真实姓名');
        return;
    }
    
    if (!adminId && !password) {
        alert('请输入密码');
        return;
    }
    
    const exists = adminData.find(a => a.phone === phone && a.id !== adminId);
    if (exists) {
        alert('该手机号已被使用');
        return;
    }
    
    if (adminId) {
        const admin = adminData.find(a => a.id === adminId);
        if (admin) {
            admin.username = username;
            admin.realName = realName;
            if (password) admin.password = password;
            if (store) {
                admin.storeId = storeId;
                admin.storeName = store.name;
            } else {
                admin.storeId = null;
                admin.storeName = null;
            }
            alert('管理员信息已更新！');
        }
    } else {
        adminData.unshift({
            id: 'admin-' + Date.now(),
            username: username,
            realName: realName,
            phone: phone,
            password: password,
            role: role,
            storeId: storeId,
            storeName: store ? store.name : null,
            status: 'active',
            createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
            lastLogin: null
        });
        alert('管理员创建成功！');
    }
    
    closeAdminModal();
    refreshAdminPage();
}

function closeAdminModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function showAddRoleModal() {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeAdminModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:600px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增角色</h3>
                <button onclick="closeAdminModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">角色名称 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="roleName" placeholder="请输入角色名称，如：财务专员" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">角色描述</label>
                        <textarea id="roleDesc" placeholder="请输入角色描述" rows="3" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:none;" onfocus="this.style.borderColor='#4f6ef7'"></textarea>
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:8px;">权限模块 <span style="color:#ef4444;">*</span></label>
                        <div style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${permissionModules.map(p => `
                                <label style="display:flex;align-items:center;gap:4px;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='#4f6ef7'" onmouseout="this.style.borderColor='#e2e8f0'">
                                    <input type="checkbox" name="rolePermission" value="${p.id}" />
                                    <span style="font-size:13px;">${p.name}</span>
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
        alert('请输入角色名称');
        return;
    }
    
    if (permissions.length === 0) {
        alert('请至少选择一个权限模块');
        return;
    }
    
    const exists = roleData.find(r => r.name === name);
    if (exists) {
        alert('该角色名称已存在');
        return;
    }
    
    const roleId = 'role_' + Date.now();
    roleData.push({
        id: roleId,
        name: name,
        permissions: permissions,
        description: desc || '暂无描述'
    });
    
    alert('角色创建成功！');
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
    const staffCount = adminData.filter(a => a.role === 'store_staff').length;
    
    const filteredAdmins = filterAdmins();
    const subAdmins = filteredAdmins.filter(a => a.role !== 'super_admin');
    
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
                <input id="adminSearchInput" placeholder="用户名 / 手机号 / 姓名" onkeypress="if(event.key==='Enter') searchAdmins()" />
                <select onchange="switchAdminRole(this.value)">
                    <option value="all" ${currentAdminRoleFilter === 'all' ? 'selected' : ''}>全部角色</option>
                    <option value="goods_op" ${currentAdminRoleFilter === 'goods_op' ? 'selected' : ''}>商品运营</option>
                    <option value="order_cs" ${currentAdminRoleFilter === 'order_cs' ? 'selected' : ''}>订单客服</option>
                    <option value="store_staff" ${currentAdminRoleFilter === 'store_staff' ? 'selected' : ''}>门店店员</option>
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

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:12px;">
            <div class="stat-card"><div class="label"><i class="fas fa-user-shield"></i> 总管理员</div><div class="value" style="font-size:22px;">${adminData.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已启用</div><div class="value" style="font-size:22px;color:#22c55e;">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-lock"></i> 已停用</div><div class="value" style="font-size:22px;color:#f59e0b;">${inactiveCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-store-alt"></i> 门店店员</div><div class="value" style="font-size:22px;color:#f97316;">${staffCount}</div></div>
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
                        <div style="border:1px solid ${role.id === 'super_admin' ? '#eef1ff' : '#e2e8f0'};border-radius:8px;padding:16px;background:${role.id === 'super_admin' ? '#f8faff' : 'transparent'};">
                            <div style="font-weight:600;color:${role.id === 'super_admin' ? '#4f6ef7' : '#1e293b'};margin-bottom:8px;">${role.name}</div>
                            <div style="font-size:13px;color:#64748b;">权限范围：${role.description}</div>
                            <div style="margin-top:8px;">
                                ${role.permissions.map(pid => {
                                    const module = permissionModules.find(m => m.id === pid);
                                    return `<span class="tag ${role.id === 'super_admin' ? 'primary' : ''}">${module ? module.name : pid}</span>`;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}