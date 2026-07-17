let operationLogData = [
    { id: 'log-001', operator: 'admin', module: 'goods', content: '上架商品：无线蓝牙耳机 Pro', ip: '192.168.1.100', type: 'add', time: '2026-06-24 14:20' },
    { id: 'log-002', operator: 'goods_op', module: 'stock', content: '调整库存 SKU-001 +200', ip: '192.168.1.101', type: 'edit', time: '2026-06-24 11:10' },
    { id: 'log-003', operator: 'admin', module: 'order', content: '取消订单 ORD-20260623-005', ip: '192.168.1.100', type: 'delete', time: '2026-06-24 09:30' },
    { id: 'log-004', operator: 'service_op', module: 'service', content: '回复用户咨询 #1234', ip: '192.168.1.102', type: 'edit', time: '2026-06-24 08:45' },
    { id: 'log-005', operator: 'admin', module: 'system', content: '更新网站配置', ip: '192.168.1.100', type: 'edit', time: '2026-06-23 16:30' },
    { id: 'log-006', operator: 'marketing_op', module: 'marketing', content: '创建优惠券活动', ip: '192.168.1.103', type: 'add', time: '2026-06-23 14:00' },
    { id: 'log-007', operator: 'admin', module: 'goods', content: '编辑商品：iPhone 15 Pro', ip: '192.168.1.100', type: 'edit', time: '2026-06-23 10:20' },
    { id: 'log-008', operator: 'order_op', module: 'order', content: '确认订单发货 ORD-20260622-008', ip: '192.168.1.104', type: 'edit', time: '2026-06-23 09:15' },
    { id: 'log-009', operator: 'admin', module: 'user', content: '新增管理员：goods_op', ip: '192.168.1.100', type: 'add', time: '2026-06-22 17:00' },
    { id: 'log-010', operator: 'marketing_op', module: 'marketing', content: '创建秒杀活动', ip: '192.168.1.103', type: 'add', time: '2026-06-22 15:30' },
    { id: 'log-011', operator: 'admin', module: 'system', content: '系统备份', ip: '192.168.1.100', type: 'edit', time: '2026-06-22 12:00' },
    { id: 'log-012', operator: 'service_op', module: 'service', content: '关闭用户工单 #1228', ip: '192.168.1.102', type: 'edit', time: '2026-06-21 16:45' },
    { id: 'log-013', operator: 'admin', module: 'goods', content: '下架商品：旧款耳机', ip: '192.168.1.100', type: 'delete', time: '2026-06-21 14:20' },
    { id: 'log-014', operator: 'stock_op', module: 'stock', content: '入库商品 SKU-002 +500', ip: '192.168.1.105', type: 'add', time: '2026-06-21 11:00' },
    { id: 'log-015', operator: 'admin', module: 'order', content: '处理退款申请 REF-20260620-003', ip: '192.168.1.100', type: 'edit', time: '2026-06-20 15:30' },
    { id: 'log-016', operator: 'marketing_op', module: 'marketing', content: '编辑优惠券活动', ip: '192.168.1.103', type: 'edit', time: '2026-06-20 10:00' },
    { id: 'log-017', operator: 'admin', module: 'user', content: '重置用户密码', ip: '192.168.1.100', type: 'edit', time: '2026-06-19 16:20' },
    { id: 'log-018', operator: 'service_op', module: 'service', content: '创建用户工单 #1200', ip: '192.168.1.102', type: 'add', time: '2026-06-19 09:45' },
    { id: 'log-019', operator: 'admin', module: 'system', content: '更新支付配置', ip: '192.168.1.100', type: 'edit', time: '2026-06-18 14:30' },
    { id: 'log-020', operator: 'goods_op', module: 'goods', content: '批量导入商品', ip: '192.168.1.101', type: 'add', time: '2026-06-18 11:00' }
];

const logModuleLabels = {
    goods: '商品管理',
    stock: '库存管理',
    order: '订单管理',
    service: '客服管理',
    system: '系统设置',
    marketing: '营销活动',
    user: '用户管理'
};

const logTypeLabels = {
    add: '新增',
    edit: '修改',
    delete: '删除',
    query: '查询'
};

const logTypeStyles = {
    add: 'background:#dbeafe;color:#1d4ed8;',
    edit: 'background:#fef3c7;color:#d97706;',
    delete: 'background:#fee2e2;color:#dc2626;',
    query: 'background:#e0e7ff;color:#6366f1;'
};

let currentLogModuleFilter = 'all';
let currentLogOperatorFilter = '';
let currentLogStartDate = '';
let currentLogEndDate = '';
let currentLogPage = 1;
let logPageSize = 10;

function filterLogs() {
    let filtered = [...operationLogData];
    if (currentLogModuleFilter !== 'all') {
        filtered = filtered.filter(l => l.module === currentLogModuleFilter);
    }
    if (currentLogOperatorFilter) {
        filtered = filtered.filter(l => l.operator.toLowerCase().includes(currentLogOperatorFilter.toLowerCase()));
    }
    if (currentLogStartDate) {
        filtered = filtered.filter(l => l.time >= currentLogStartDate);
    }
    if (currentLogEndDate) {
        filtered = filtered.filter(l => l.time <= currentLogEndDate + ' 23:59:59');
    }
    return filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
}

function searchLogs() {
    currentLogOperatorFilter = document.getElementById('logOperatorInput').value.trim();
    currentLogModuleFilter = document.getElementById('logModuleSelect').value;
    currentLogStartDate = document.getElementById('logStartDate').value;
    currentLogEndDate = document.getElementById('logEndDate').value;
    currentLogPage = 1;
    refreshSettingsPage();
}

function setLogPage(page) {
    currentLogPage = page;
    refreshSettingsPage();
}

function refreshSettingsPage() {
    const panel = document.getElementById('panel-settings');
    if (panel) panel.innerHTML = settingsPage();
}

function settingsPage() {
    const filteredLogs = filterLogs();
    const totalLogs = filteredLogs.length;
    const totalPages = Math.ceil(totalLogs / logPageSize);
    const startIndex = (currentLogPage - 1) * logPageSize;
    const pageLogs = filteredLogs.slice(startIndex, startIndex + logPageSize);
    
    return `
        <div class="row-stretch">
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-globe"></i> 基础配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">网站名称</label><input type="text" value="乐享购" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">联系方式</label><input type="text" value="400-888-8888" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">网站Logo</label><div style="border:1px dashed #e2e8f0;border-radius:6px;padding:20px;text-align:center;"><i class="fas fa-upload" style="color:#94a3b8;"></i><div style="font-size:12px;color:#94a3b8;margin-top:4px;">点击上传Logo</div></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">备案号</label><input type="text" value="京ICP备12345678号" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">网站描述</label><textarea rows="3" placeholder="请输入网站描述..." style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;">乐享购 - 让购物更快乐</textarea></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-robot"></i> AI 配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">Coze API Key</label><input type="password" placeholder="请输入扣子Coze API Key" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">AI自动回复超时</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="5" style="width:60px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>分钟</span><label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;"><input type="checkbox" checked /> 开启自动回复</label></div></div>
                        </div>
                        <div style="margin-top:12px;padding:10px 14px;background:#fef3c7;border-radius:6px;font-size:12px;color:#92400e;"><i class="fas fa-info-circle"></i> AI配置用于客服自动回复、商品描述生成、评价摘要生成三个智能体功能</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-stretch">
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 订单超时配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">待支付订单自动取消时间</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="30" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>分钟</span></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">确认收货自动完成时间</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="15" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>天</span></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">售后申请有效期</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="7" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>天</span></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-exclamation-triangle"></i> 库存预警配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">库存预警阈值</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="10" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>件</span></div></div>
                            <div style="grid-column:span 2;"><label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;"><input type="checkbox" checked /> 启用库存预警通知</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-file-alt"></i> 操作日志</span>
                <div class="search-bar">
                    <select id="logModuleSelect" style="padding:6px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;">
                        <option value="all" ${currentLogModuleFilter === 'all' ? 'selected' : ''}>全部模块</option>
                        ${Object.entries(logModuleLabels).map(([key, label]) => `<option value="${key}" ${currentLogModuleFilter === key ? 'selected' : ''}>${label}</option>`).join('')}
                    </select>
                    <input id="logOperatorInput" placeholder="操作人" value="${currentLogOperatorFilter}" style="padding:6px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;" />
                    <input type="date" id="logStartDate" value="${currentLogStartDate}" style="padding:6px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;" />
                    <span style="color:#94a3b8;">~</span>
                    <input type="date" id="logEndDate" value="${currentLogEndDate}" style="padding:6px 10px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;" />
                    <button class="btn btn-sm btn-primary" onclick="searchLogs()"><i class="fas fa-search"></i> 筛选</button>
                </div>
            </div>
            <div class="card-body no-pad"><div class="table-wrap"><table>
                <thead><tr><th>操作人</th><th>操作模块</th><th>操作内容</th><th>IP地址</th><th>操作类型</th><th>时间</th></tr></thead>
                <tbody>
                    ${pageLogs.length > 0 ? pageLogs.map(log => `
                        <tr>
                            <td>${log.operator}</td>
                            <td>${logModuleLabels[log.module] || log.module}</td>
                            <td>${log.content}</td>
                            <td>${log.ip}</td>
                            <td><span class="tag" style="${logTypeStyles[log.type] || ''}">${logTypeLabels[log.type] || log.type}</span></td>
                            <td>${log.time}</td>
                        </tr>
                    `).join('') : `<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:20px;">暂无日志记录</td></tr>`}
                </tbody>
            </table></div></div>
            ${totalPages > 1 ? `
            <div class="card-footer">
                <div class="pagination">
                    <button class="btn btn-sm btn-outline" onclick="setLogPage(1)" ${currentLogPage === 1 ? 'disabled' : ''}><i class="fas fa-angle-double-left"></i></button>
                    <button class="btn btn-sm btn-outline" onclick="setLogPage(${currentLogPage - 1})" ${currentLogPage === 1 ? 'disabled' : ''}><i class="fas fa-angle-left"></i></button>
                    ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                        <button class="btn btn-sm ${p === currentLogPage ? 'btn-primary' : 'btn-outline'}" onclick="setLogPage(${p})">${p}</button>
                    `).join('')}
                    <button class="btn btn-sm btn-outline" onclick="setLogPage(${currentLogPage + 1})" ${currentLogPage === totalPages ? 'disabled' : ''}><i class="fas fa-angle-right"></i></button>
                    <button class="btn btn-sm btn-outline" onclick="setLogPage(${totalPages})" ${currentLogPage === totalPages ? 'disabled' : ''}><i class="fas fa-angle-double-right"></i></button>
                </div>
                <span style="font-size:13px;color:#64748b;">共 ${totalLogs} 条记录，第 ${currentLogPage}/${totalPages} 页</span>
            </div>` : ''}
        </div>
    `;
}