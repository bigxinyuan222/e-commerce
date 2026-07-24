// 操作日志数据缓存
let operationLogData = [];

// 日志模块名称映射
const logModuleLabels = {
    goods: '商品管理',
    stock: '库存管理',
    order: '订单管理',
    service: '客服管理',
    system: '系统设置',
    marketing: '营销活动',
    user: '用户管理'
};

// 日志操作类型名称映射
const logTypeLabels = {
    add: '新增',
    edit: '修改',
    delete: '删除',
    query: '查询'
};

// 日志操作类型样式映射
const logTypeStyles = {
    add: 'system-tag blue',
    edit: 'system-tag yellow',
    delete: 'system-tag red',
    query: 'system-tag primary'
};

// 日志筛选条件
let currentLogModuleFilter = 'all';
let currentLogOperatorFilter = '';
let currentLogStartDate = '';
let currentLogEndDate = '';
let currentLogPage = 1;
let logPageSize = 10;

// 加载操作日志列表
async function loadLogs() {
    try {
        const params = {
            module: currentLogModuleFilter === 'all' ? '' : currentLogModuleFilter,
            operator: currentLogOperatorFilter,
            startDate: currentLogStartDate,
            endDate: currentLogEndDate,
            page: currentLogPage,
            pageSize: logPageSize
        };
        const response = await apiGet(API_CONFIG.settings.logs, params);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        operationLogData = dataList.map(item => ({
            id: item.ID || item.id,
            operator: item.operator || '',
            module: item.module || '',
            content: item.content || '',
            ip: item.ip || '',
            type: item.type || '',
            time: item.createdAt || item.time || ''
        }));
        refreshSettingsPage();
    } catch (error) {
        console.error('Failed to load operation logs:', error);
    }
}

// 根据筛选条件过滤日志列表
function filterLogs() {
    let filtered = [...operationLogData];
    // 模块筛选
    if (currentLogModuleFilter !== 'all') {
        filtered = filtered.filter(l => l.module === currentLogModuleFilter);
    }
    // 操作人筛选
    if (currentLogOperatorFilter) {
        filtered = filtered.filter(l => l.operator.toLowerCase().includes(currentLogOperatorFilter.toLowerCase()));
    }
    // 开始日期筛选
    if (currentLogStartDate) {
        filtered = filtered.filter(l => l.time >= currentLogStartDate);
    }
    // 结束日期筛选
    if (currentLogEndDate) {
        filtered = filtered.filter(l => l.time <= currentLogEndDate + ' 23:59:59');
    }
    // 按时间倒序排列
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
                        <div class="system-settings-row">
                            <div><label class="system-settings-label">网站名称</label><input type="text" value="乐享购" class="system-settings-input" /></div>
                            <div><label class="system-settings-label">联系方式</label><input type="text" value="400-888-8888" class="system-settings-input" /></div>
                            <div><label class="system-settings-label">网站Logo</label><div class="system-settings-upload"><i class="fas fa-upload"></i><div class="upload-text">点击上传Logo</div></div></div>
                            <div><label class="system-settings-label">备案号</label><input type="text" value="京ICP备12345678号" class="system-settings-input" /></div>
                            <div class="system-settings-row-full"><label class="system-settings-label">网站描述</label><textarea rows="3" placeholder="请输入网站描述..." class="system-settings-textarea">乐享购 - 让购物更快乐</textarea></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-robot"></i> AI 配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div class="system-settings-row">
                            <div><label class="system-settings-label">Coze API Key</label><input type="password" placeholder="请输入扣子Coze API Key" class="system-settings-input" /></div>
                            <div><label class="system-settings-label">AI自动回复超时</label><div class="system-settings-number-group"><input type="number" value="5" class="system-settings-number-input small" /><span>分钟</span><label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;"><input type="checkbox" checked /> 开启自动回复</label></div></div>
                        </div>
                        <div class="system-settings-help"><i class="fas fa-info-circle"></i> AI配置用于客服自动回复、商品描述生成、评价摘要生成三个智能体功能</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-stretch">
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 订单超时配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div class="system-settings-row">
                            <div><label class="system-settings-label">待支付订单自动取消时间</label><div class="system-settings-number-group"><input type="number" value="30" class="system-settings-number-input" /><span>分钟</span></div></div>
                            <div><label class="system-settings-label">确认收货自动完成时间</label><div class="system-settings-number-group"><input type="number" value="15" class="system-settings-number-input" /><span>天</span></div></div>
                            <div><label class="system-settings-label">售后申请有效期</label><div class="system-settings-number-group"><input type="number" value="7" class="system-settings-number-input" /><span>天</span></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-exclamation-triangle"></i> 库存预警配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div class="system-settings-row">
                            <div><label class="system-settings-label">库存预警阈值</label><div class="system-settings-number-group"><input type="number" value="10" class="system-settings-number-input" /><span>件</span></div></div>
                            <div class="system-settings-row-full"><label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;"><input type="checkbox" checked /> 启用库存预警通知</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-file-alt"></i> 操作日志</span>
                <div class="system-settings-search-bar">
                    <select id="logModuleSelect">
                        <option value="all" ${currentLogModuleFilter === 'all' ? 'selected' : ''}>全部模块</option>
                        ${Object.entries(logModuleLabels).map(([key, label]) => `<option value="${key}" ${currentLogModuleFilter === key ? 'selected' : ''}>${label}</option>`).join('')}
                    </select>
                    <input id="logOperatorInput" placeholder="操作人" value="${currentLogOperatorFilter}" />
                    <input type="date" id="logStartDate" value="${currentLogStartDate}" />
                    <span class="separator">~</span>
                    <input type="date" id="logEndDate" value="${currentLogEndDate}" />
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
                            <td><span class="${logTypeStyles[log.type] || 'system-tag'}">${logTypeLabels[log.type] || log.type}</span></td>
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