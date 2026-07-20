let notificationTab = 'send';
let notificationData = [];
let templateData = [];

let currentNotifSearchKeyword = '';
let currentNotifTypeFilter = 'all';
let currentNotifStatusFilter = 'all';
let currentNotifPage = 1;
let notifPageSize = 5;

let selectedUsers = [];
let currentTemplate = null;

async function loadNotifications() {
    try {
        const params = {
            type: currentNotifTypeFilter === 'all' ? '' : currentNotifTypeFilter,
            status: currentNotifStatusFilter === 'all' ? '' : currentNotifStatusFilter,
            keyword: currentNotifSearchKeyword,
            page: currentNotifPage,
            pageSize: notifPageSize
        };
        const response = await apiGet(API_CONFIG.notifications.list, params);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        notificationData = dataList.map(item => ({
            id: item.ID || item.id,
            title: item.title || '',
            type: item.type || 'system',
            scope: item.scope || '',
            totalCount: item.totalCount || 0,
            deliveredCount: item.deliveredCount || 0,
            status: item.status || 'sent',
            time: item.createdAt || item.time || ''
        }));
        refreshNotificationPage();
    } catch (error) {
        console.error('Failed to load notifications:', error);
    }
}

async function loadTemplates() {
    try {
        const response = await apiGet(API_CONFIG.notifications.templates);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        templateData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            type: item.type || 'system',
            category: item.category || '自定义',
            title: item.title || '',
            content: item.content || '',
            trigger: item.trigger || '手动触发'
        }));
        if (templateData.length > 0) {
            currentTemplate = templateData[0];
        } else {
            currentTemplate = null;
        }
        refreshNotificationPage();
    } catch (error) {
        console.error('Failed to load templates:', error);
    }
}

async function searchUsers() {
    const keyword = document.getElementById('userSearchInput').value.trim();
    const container = document.getElementById('userSearchResults');
    
    if (!keyword) {
        container.innerHTML = '';
        return;
    }
    
    try {
        const response = await apiGet(API_CONFIG.users.list, { keyword: keyword, page: 1, pageSize: 10 });
        if (response && response.data) {
            const users = response.data.map(item => ({
                id: item.ID || item.id,
                username: item.username || '',
                phone: item.phone ? item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '',
                realName: item.realName || item.username || ''
            }));
            
            if (users.length === 0) {
                container.innerHTML = '<div class="system-empty-message">未找到匹配的用户</div>';
                return;
            }
            
            container.innerHTML = users.map(user => {
                const isSelected = selectedUsers.some(s => s.id === user.id);
                return `
                    <div class="system-user-search-result" onclick="toggleSelectUser('${user.id}', '${user.username}', '${user.phone}')">
                        <div class="user-info">
                            <div class="user-name">${user.username}</div>
                            <div class="user-phone">${user.phone}</div>
                        </div>
                        <div class="user-status ${isSelected ? 'selected' : ''}">
                            <i class="fas ${isSelected ? 'fa-check-circle' : 'fa-circle'}"></i>
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Failed to search users:', error);
        container.innerHTML = '<div class="system-empty-message">搜索失败，请重试</div>';
    }
}

function toggleSelectUser(userId, username, phone) {
    const index = selectedUsers.findIndex(u => u.id === userId);
    if (index === -1) {
        selectedUsers.push({ id: userId, username, phone });
    } else {
        selectedUsers.splice(index, 1);
    }
    renderSelectedUsers();
    searchUsers();
}

function renderSelectedUsers() {
    const container = document.getElementById('selectedUsers');
    if (selectedUsers.length === 0) {
        container.innerHTML = '<span class="system-tag" style="color:#94a3b8;">请搜索并选择用户</span>';
        return;
    }
    container.innerHTML = selectedUsers.map(user => `
        <span class="system-tag primary" style="cursor:pointer;">${user.username} (${user.phone}) <i class="fas fa-times" style="margin-left:4px;font-size:10px;" onclick="toggleSelectUser('${user.id}', '${user.username}', '${user.phone}')"></i></span>
    `).join('');
}

function switchReceiveScope() {
    const radios = document.getElementsByName('receiveScope');
    const container = document.getElementById('specifiedUserContainer');
    for (const radio of radios) {
        if (radio.checked && radio.nextSibling.textContent.trim() === '指定用户') {
            container.style.display = 'block';
            selectedUsers = [];
            renderSelectedUsers();
            return;
        }
    }
    container.style.display = 'none';
}

function toggleTimePicker() {
    const radios = document.getElementsByName('sendType');
    const container = document.getElementById('timePickerContainer');
    for (const radio of radios) {
        if (radio.checked && radio.nextSibling.textContent.trim() === '定时发送') {
            container.style.display = 'flex';
            const now = new Date();
            now.setMinutes(now.getMinutes() + 5);
            document.getElementById('sendTime').value = now.toISOString().slice(0, 16);
            return;
        }
    }
    container.style.display = 'none';
}

function sendNotification() {
    const titleInput = document.querySelector('input[placeholder="请输入通知标题"]');
    const contentInput = document.querySelector('textarea[placeholder="请输入通知内容"]');
    const title = titleInput ? titleInput.value.trim() : '';
    const content = contentInput ? contentInput.value.trim() : '';
    
    if (!title) {
        alert('请输入通知标题');
        return;
    }
    
    if (!content) {
        alert('请输入通知内容');
        return;
    }
    
    const radios = document.getElementsByName('receiveScope');
    let scope = '全部用户';
    for (const radio of radios) {
        if (radio.checked) {
            scope = radio.nextSibling.textContent.trim();
            break;
        }
    }
    
    if (scope === '指定用户' && selectedUsers.length === 0) {
        alert('请选择接收通知的用户');
        return;
    }
    
    alert('通知发送成功！');
    refreshNotificationPage();
}

function saveDraft() {
    const titleInput = document.querySelector('input[placeholder="请输入通知标题"]');
    const contentInput = document.querySelector('textarea[placeholder="请输入通知内容"]');
    const title = titleInput ? titleInput.value.trim() : '';
    const content = contentInput ? contentInput.value.trim() : '';
    
    if (!title) {
        alert('请输入通知标题');
        return;
    }
    
    alert('通知草稿已保存！');
}

function previewNotification() {
    const titleInput = document.querySelector('input[placeholder="请输入通知标题"]');
    const contentInput = document.querySelector('textarea[placeholder="请输入通知内容"]');
    const title = titleInput ? titleInput.value.trim() : '';
    const content = contentInput ? contentInput.value.trim() : '';
    
    if (!title) {
        alert('请输入通知标题');
        return;
    }
    
    const modalContent = `
        <div class="modal-overlay" onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())"></div>
        <div class="modal-content" style="width:500px;">
            <div class="modal-header">
                <h3><i class="fas fa-eye"></i> 预览通知</h3>
                <button onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom:16px;">
                    <div style="font-size:16px;font-weight:600;color:#1e293b;margin-bottom:8px;">${title}</div>
                    <div style="font-size:14px;color:#64748b;line-height:1.6;">${content || '暂无内容'}</div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="sendNotification();document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())"><i class="fas fa-paper-plane"></i> 发送</button>
                <button class="btn btn-outline" onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function filterNotifications() {
    let filtered = notificationData;
    if (currentNotifTypeFilter !== 'all') {
        filtered = filtered.filter(n => n.type === currentNotifTypeFilter);
    }
    if (currentNotifStatusFilter !== 'all') {
        filtered = filtered.filter(n => n.status === currentNotifStatusFilter);
    }
    if (currentNotifSearchKeyword) {
        const keyword = currentNotifSearchKeyword.toLowerCase();
        filtered = filtered.filter(n => 
            n.title.toLowerCase().includes(keyword) || 
            n.id.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchNotifications() {
    const input = document.getElementById('notifSearchInput');
    if (input) {
        currentNotifSearchKeyword = input.value.trim();
        currentNotifPage = 1;
        refreshNotificationPage();
    }
}

function switchNotifType(type) {
    currentNotifTypeFilter = type;
    currentNotifPage = 1;
    refreshNotificationPage();
}

function switchNotifStatus(status) {
    currentNotifStatusFilter = status;
    currentNotifPage = 1;
    refreshNotificationPage();
}

function setNotifPage(page) {
    currentNotifPage = page;
    refreshNotificationPage();
}

function refreshNotificationPage() {
    const panel = document.getElementById('panel-notification');
    if (panel) panel.innerHTML = notificationPage();
}

function notificationPage() {
    return `
        <div style="margin-bottom:16px;border-bottom:1px solid #e2e8f0;display:flex;gap:0;">
            <div class="system-notif-tab ${notificationTab==='send'?'active':''}" onclick="switchNotifTab('send')">
                <i class="fas fa-paper-plane"></i>发送通知
            </div>
            <div class="system-notif-tab ${notificationTab==='record'?'active':''}" onclick="switchNotifTab('record')">
                <i class="fas fa-history"></i>通知记录
            </div>
            <div class="system-notif-tab ${notificationTab==='template'?'active':''}" onclick="switchNotifTab('template')">
                <i class="fas fa-file-alt"></i>通知模板管理
            </div>
        </div>
        ${notificationTab === 'send' ? sendNotificationPage() : ''}
        ${notificationTab === 'record' ? notificationRecordPage() : ''}
        ${notificationTab === 'template' ? notificationTemplatePage() : ''}
    `;
}

function switchNotifTab(tab) {
    notificationTab = tab;
    const panel = document.getElementById('panel-notification');
    if (panel) panel.innerHTML = notificationPage();
}

function sendNotificationPage() {
    return `
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-edit"></i> 编辑通知</span></div>
                <div class="card-body">
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">通知类型</div>
                        <div style="display:flex;gap:10px;">
                            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="notifType" checked style="accent-color:#4f6ef7;" />订单通知</label>
                            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="notifType" style="accent-color:#4f6ef7;" />活动通知</label>
                            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="notifType" style="accent-color:#4f6ef7;" />系统维护</label>
                        </div>
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">通知标题</div>
                        <input type="text" placeholder="请输入通知标题" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" onblur="this.style.borderColor='#e2e8f0'" />
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">通知内容</div>
                        <textarea placeholder="请输入通知内容" rows="6" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'" onblur="this.style.borderColor='#e2e8f0'"></textarea>
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">接收范围</div>
                        <div style="display:flex;gap:10px;margin-bottom:10px;">
                            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="receiveScope" checked style="accent-color:#4f6ef7;" onchange="switchReceiveScope()" />全部用户</label>
                            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="receiveScope" style="accent-color:#4f6ef7;" onchange="switchReceiveScope()" />指定用户</label>
                        </div>
                        <div id="specifiedUserContainer" style="display:none;">
                            <div style="display:flex;gap:8px;margin-bottom:10px;">
                                <input type="text" id="userSearchInput" placeholder="搜索用户（用户名/手机号）" style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" onblur="this.style.borderColor='#e2e8f0'" onkeypress="if(event.key==='Enter') searchUsers()" />
                                <button class="btn btn-sm btn-primary" onclick="searchUsers()"><i class="fas fa-search"></i> 搜索</button>
                            </div>
                            <div id="userSearchResults" style="max-height:200px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:10px;"></div>
                            <div id="selectedUsers" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">发送方式</div>
                        <div style="display:flex;gap:10px;">
                            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="sendType" checked style="accent-color:#4f6ef7;" onchange="toggleTimePicker()" />立即发送</label>
                            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="sendType" style="accent-color:#4f6ef7;" onchange="toggleTimePicker()" />定时发送</label>
                        </div>
                        <div id="timePickerContainer" style="margin-top:8px;display:flex;gap:10px;align-items:center;display:none;">
                            <input type="datetime-local" id="sendTime" style="padding:6px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" />
                        </div>
                    </div>
                    <div style="display:flex;gap:10px;">
                        <button class="btn btn-primary" onclick="sendNotification()"><i class="fas fa-paper-plane"></i> 发送通知</button>
                        <button class="btn btn-outline" onclick="saveDraft()"><i class="fas fa-save"></i> 保存草稿</button>
                        <button class="btn btn-outline" onclick="previewNotification()"><i class="fas fa-eye"></i> 预览</button>
                    </div>
                </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-chart-pie"></i> 今日发送统计</span></div>
                    <div class="card-body">
                        <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span>今日发送量</span>
                                <span style="font-weight:600;color:#4f6ef7;">28</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>送达人数</span>
                                <span style="font-weight:600;color:#22c55e;">12,580</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>送达率</span>
                                <span style="font-weight:600;color:#22c55e;">99.2%</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span>点击量</span>
                                <span style="font-weight:600;color:#f59e0b;">3,420</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function notificationRecordPage() {
    const filteredNotifications = filterNotifications();
    const totalNotifications = filteredNotifications.length;
    const totalPages = Math.ceil(totalNotifications / notifPageSize);
    const startIndex = (currentNotifPage - 1) * notifPageSize;
    const pageNotifications = filteredNotifications.slice(startIndex, startIndex + notifPageSize);
    
    const getTypeBadge = (type) => {
        const classes = {
            order: 'system-tag blue',
            activity: 'system-tag primary',
            system: 'system-tag yellow'
        };
        const texts = { order: '订单通知', activity: '活动通知', system: '系统维护' };
        return `<span class="${classes[type] || 'system-tag'}">${texts[type]}</span>`;
    };
    
    const getStatusBadge = (status) => {
        const colors = { sent: 'green', sending: 'blue', cancelled: 'gray' };
        const texts = { sent: '已送达', sending: '发送中', cancelled: '已撤销' };
        const color = colors[status] || 'gray';
        return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
    };
    
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-title"><i class="fas fa-list"></i> 通知记录</span>
                <div class="search-bar">
                    <input id="notifSearchInput" placeholder="搜索标题" onkeypress="if(event.key==='Enter') searchNotifications()" />
                    <select onchange="switchNotifType(this.value)">
                        <option value="all" ${currentNotifTypeFilter === 'all' ? 'selected' : ''}>全部类型</option>
                        <option value="order" ${currentNotifTypeFilter === 'order' ? 'selected' : ''}>订单通知</option>
                        <option value="activity" ${currentNotifTypeFilter === 'activity' ? 'selected' : ''}>活动通知</option>
                        <option value="system" ${currentNotifTypeFilter === 'system' ? 'selected' : ''}>系统维护</option>
                    </select>
                    <select onchange="switchNotifStatus(this.value)">
                        <option value="all" ${currentNotifStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                        <option value="sent" ${currentNotifStatusFilter === 'sent' ? 'selected' : ''}>已送达</option>
                        <option value="sending" ${currentNotifStatusFilter === 'sending' ? 'selected' : ''}>发送中</option>
                        <option value="cancelled" ${currentNotifStatusFilter === 'cancelled' ? 'selected' : ''}>已撤销</option>
                    </select>
                    <button class="btn btn-primary" onclick="searchNotifications()"><i class="fas fa-search"></i> 搜索</button>
                </div>
            </div>
            <div class="card-body no-pad">
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>通知ID</th>
                                <th>标题</th>
                                <th>类型</th>
                                <th>接收范围</th>
                                <th>接收人数</th>
                                <th>送达人数</th>
                                <th>送达状态</th>
                                <th>发送时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pageNotifications.map(n => `
                                <tr>
                                    <td>${n.id}</td>
                                    <td>${n.title}</td>
                                    <td>${getTypeBadge(n.type)}</td>
                                    <td>${n.scope}</td>
                                    <td>${typeof n.totalCount === 'number' ? n.totalCount.toLocaleString() : n.totalCount}</td>
                                    <td>${typeof n.deliveredCount === 'number' ? n.deliveredCount.toLocaleString() : n.deliveredCount}</td>
                                    <td>${getStatusBadge(n.status)}</td>
                                    <td>${n.time}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline" onclick="showNotificationDetail('${n.id}')">详情</button>
                                        ${n.status === 'sending' ? `<button class="btn btn-sm btn-danger" onclick="cancelNotification('${n.id}')">撤销</button>` : `<button class="btn btn-sm btn-outline" onclick="showNotificationData('${n.id}')">数据</button>`}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            ${totalPages > 1 ? `
            <div class="card-footer">
                <div style="display:flex;align-items:center;justify-content:center;gap:6px;">
                    <button onclick="setNotifPage(1)" ${currentNotifPage === 1 ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentNotifPage === 1 ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                        <i class="fas fa-angle-double-left"></i>
                    </button>
                    <button onclick="setNotifPage(${currentNotifPage - 1})" ${currentNotifPage === 1 ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentNotifPage === 1 ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                        <i class="fas fa-angle-left"></i>
                    </button>
                    ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                        <button onclick="setNotifPage(${p})" style="width:32px;height:32px;border-radius:50%;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;transition:all 0.2s;${p === currentNotifPage ? 'background:#4f6ef7;' : 'background:#fff;border:1px solid #e2e8f0;color:#64748b;'};" onmouseover="${p !== currentNotifPage ? 'this.style.borderColor=\'#4f6ef7\';this.style.color=\'#4f6ef7\'' : ''}" onmouseout="${p !== currentNotifPage ? 'this.style.borderColor=\'#e2e8f0\';this.style.color=\'#64748b\'' : ''}">${p}</button>
                    `).join('')}
                    <button onclick="setNotifPage(${currentNotifPage + 1})" ${currentNotifPage === totalPages ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentNotifPage === totalPages ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                        <i class="fas fa-angle-right"></i>
                    </button>
                    <button onclick="setNotifPage(${totalPages})" ${currentNotifPage === totalPages ? 'disabled' : ''} style="width:32px;height:32px;border-radius:50%;border:none;background:#fff;border:1px solid #e2e8f0;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all 0.2s;${currentNotifPage === totalPages ? 'opacity:0.5;cursor:not-allowed;' : ''}" onmouseover="if(!this.disabled) this.style.borderColor='#4f6ef7';this.style.color='#4f6ef7'" onmouseout="if(!this.disabled) this.style.borderColor='#e2e8f0';this.style.color='#64748b'">
                        <i class="fas fa-angle-double-right"></i>
                    </button>
                </div>
                <span style="font-size:13px;color:#64748b;">共 ${totalNotifications} 条记录，第 ${currentNotifPage}/${totalPages} 页</span>
            </div>` : ''}
        </div>
    `;
}

function showNotificationDetail(notifId) {
    const n = notificationData.find(item => item.id === notifId);
    if (!n) return;
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:550px;">
            <div class="modal-header">
                <h3><i class="fas fa-file-alt"></i> 通知详情</h3>
                <button onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div>
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">通知ID</div>
                        <div style="font-size:13px;color:#1e293b;">${n.id}</div>
                    </div>
                    <div>
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">发送时间</div>
                        <div style="font-size:13px;color:#1e293b;">${n.time}</div>
                    </div>
                    <div>
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">类型</div>
                        <div>${{ order: '订单通知', activity: '活动通知', system: '系统维护' }[n.type]}</div>
                    </div>
                    <div>
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">状态</div>
                        <div>${{ sent: '已送达', sending: '发送中', cancelled: '已撤销' }[n.status]}</div>
                    </div>
                    <div>
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">接收范围</div>
                        <div style="font-size:13px;color:#1e293b;">${n.scope}</div>
                    </div>
                    <div>
                        <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">接收人数</div>
                        <div style="font-size:13px;color:#1e293b;">${n.totalCount.toLocaleString()}</div>
                    </div>
                </div>
                <div style="margin-top:16px;">
                    <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">通知标题</div>
                    <div style="font-size:14px;font-weight:500;color:#1e293b;">${n.title}</div>
                </div>
                <div style="margin-top:16px;">
                    <div style="font-size:12px;color:#94a3b8;margin-bottom:4px;">通知内容</div>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px;font-size:13px;color:#64748b;line-height:1.6;">暂无内容</div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function showNotificationData(notifId) {
    const n = notificationData.find(item => item.id === notifId);
    if (!n) return;
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:500px;">
            <div class="modal-header">
                <h3><i class="fas fa-chart-bar"></i> 发送数据统计</h3>
                <button onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div style="display:flex;justify-content:space-around;margin-bottom:24px;">
                    <div style="text-align:center;">
                        <div style="font-size:24px;font-weight:600;color:#4f6ef7;">${n.totalCount.toLocaleString()}</div>
                        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">接收人数</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:24px;font-weight:600;color:#22c55e;">${typeof n.deliveredCount === 'number' ? n.deliveredCount.toLocaleString() : n.deliveredCount}</div>
                        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">送达人数</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:24px;font-weight:600;color:#f59e0b;">${n.totalCount > 0 ? Math.round((n.deliveredCount / n.totalCount) * 100) : 0}%</div>
                        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">送达率</div>
                    </div>
                </div>
                <div style="background:#f8fafc;border-radius:6px;padding:16px;">
                    <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:12px;">渠道统计</div>
                    <div style="display:flex;flex-direction:column;gap:8px;">
                        <div style="display:flex;justify-content:space-between;">
                            <span style="font-size:12px;color:#64748b;">站内消息</span>
                            <span style="font-size:12px;color:#1e293b;font-weight:500;">100%</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;">
                            <span style="font-size:12px;color:#64748b;">推送通知</span>
                            <span style="font-size:12px;color:#1e293b;font-weight:500;">0%</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;">
                            <span style="font-size:12px;color:#64748b;">短信通知</span>
                            <span style="font-size:12px;color:#1e293b;font-weight:500;">0%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove())">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function cancelNotification(notifId) {
    if (confirm('确定要撤销这条通知吗？')) {
        const n = notificationData.find(item => item.id === notifId);
        if (n) {
            n.status = 'cancelled';
            n.deliveredCount = notificationData.find(item => item.id === notifId).totalCount;
            refreshNotificationPage();
        }
    }
}

function notificationTemplatePage() {
    const typeLabels = { order: '订单通知', activity: '活动通知', system: '系统维护' };
    const typeColors = { order: 'background:#dbeafe;color:#1d4ed8;', activity: '', system: 'background:#fef3c7;color:#d97706;' };
    
    return `
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:12px;">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fas fa-folder"></i> 模板列表</span>
                    <button class="btn btn-sm btn-primary" onclick="createNewTemplate()"><i class="fas fa-plus"></i> 新建</button>
                </div>
                <div class="card-body no-pad" style="max-height:500px;overflow-y:auto;">
                    ${templateData.map(tpl => `
                        <div style="padding:12px 16px;cursor:pointer;border-bottom:1px solid #f1f4f9;border-left:3px solid transparent;transition:0.15s;" 
                             onmouseover="this.style.background='#f8fafc'" 
                             onmouseout="this.style.background='transparent'"
                             onclick="selectTemplate('${tpl.id}')"
                             ${currentTemplate.id === tpl.id ? 'style="padding:12px 16px;cursor:pointer;background:#eef1ff;border-left:3px solid #4f6ef7;border-bottom:1px solid #f1f4f9;"' : ''}>
                            <div style="font-weight:600;font-size:13px;margin-bottom:4px;${currentTemplate.id === tpl.id ? 'color:#4f6ef7;' : 'color:#1e293b;'}">${tpl.name}</div>
                            <div style="font-size:12px;color:#94a3b8;">${typeLabels[tpl.type]} · ${tpl.category}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fas fa-edit"></i> 模板详情 - ${currentTemplate.name}</span>
                    <div style="display:flex;gap:8px;">
                        <button class="btn btn-sm btn-outline" onclick="copyTemplate()"><i class="fas fa-copy"></i> 复制</button>
                        <button class="btn btn-sm btn-primary" onclick="useTemplate()"><i class="fas fa-paper-plane"></i> 使用此模板</button>
                    </div>
                </div>
                <div class="card-body">
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">模板名称</div>
                        <input type="text" id="tplName" value="${currentTemplate.name}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;background:${currentTemplate.category === '系统预设' ? '#f8fafc' : '#fff'}" ${currentTemplate.category === '系统预设' ? 'readonly' : ''} />
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">通知类型</div>
                        <div style="display:flex;gap:10px;">
                            <span class="tag" style="${typeColors[currentTemplate.type] || ''}">${typeLabels[currentTemplate.type]}</span>
                            <span class="tag">${currentTemplate.category}</span>
                        </div>
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">通知标题</div>
                        <input type="text" id="tplTitle" value="${currentTemplate.title}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" onblur="this.style.borderColor='#e2e8f0'" />
                        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">可用变量：{orderNo} 订单号、{amount} 金额、{goodsName} 商品名称、{activityName} 活动名称</div>
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">通知内容</div>
                        <textarea id="tplContent" rows="6" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;resize:vertical;" onfocus="this.style.borderColor='#4f6ef7'" onblur="this.style.borderColor='#e2e8f0'">${currentTemplate.content}</textarea>
                    </div>
                    <div style="margin-bottom:16px;">
                        <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">触发条件</div>
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px;font-size:13px;color:#64748b;">
                            <p><i class="fas fa-bolt" style="color:#f59e0b;margin-right:6px;"></i>${currentTemplate.trigger}</p>
                        </div>
                    </div>
                    <div style="display:flex;gap:10px;">
                        <button class="btn btn-primary" onclick="saveTemplate()"><i class="fas fa-save"></i> 保存修改</button>
                        <button class="btn btn-outline" onclick="resetTemplate()"><i class="fas fa-undo"></i> 重置</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function selectTemplate(tplId) {
    const tpl = templateData.find(item => item.id === tplId);
    if (tpl) {
        currentTemplate = tpl;
        refreshNotificationPage();
    }
}

function createNewTemplate() {
    const newId = 'tpl-' + String(templateData.length + 1).padStart(3, '0');
    const newTemplate = {
        id: newId,
        name: '新模板',
        type: 'activity',
        category: '自定义',
        title: '新通知模板',
        content: '请输入通知内容',
        trigger: '手动触发'
    };
    templateData.push(newTemplate);
    currentTemplate = newTemplate;
    refreshNotificationPage();
}

function copyTemplate() {
    const newId = 'tpl-' + String(templateData.length + 1).padStart(3, '0');
    const newTemplate = {
        ...currentTemplate,
        id: newId,
        name: currentTemplate.name + ' (副本)',
        category: '自定义'
    };
    templateData.push(newTemplate);
    currentTemplate = newTemplate;
    refreshNotificationPage();
}

function useTemplate() {
    notificationTab = 'send';
    refreshNotificationPage();
    setTimeout(() => {
        const titleInput = document.querySelector('input[placeholder="请输入通知标题"]');
        const contentInput = document.querySelector('textarea[placeholder="请输入通知内容"]');
        if (titleInput) titleInput.value = currentTemplate.title;
        if (contentInput) contentInput.value = currentTemplate.content;
    }, 100);
}

function saveTemplate() {
    if (currentTemplate.category === '系统预设') {
        alert('系统预设模板不可修改');
        return;
    }
    
    const name = document.getElementById('tplName').value.trim();
    const title = document.getElementById('tplTitle').value.trim();
    const content = document.getElementById('tplContent').value.trim();
    
    if (!name) {
        alert('请输入模板名称');
        return;
    }
    
    if (!title) {
        alert('请输入通知标题');
        return;
    }
    
    const tpl = templateData.find(item => item.id === currentTemplate.id);
    if (tpl) {
        tpl.name = name;
        tpl.title = title;
        tpl.content = content;
        currentTemplate = tpl;
        alert('模板保存成功！');
        refreshNotificationPage();
    }
}

function resetTemplate() {
    const tpl = templateData.find(item => item.id === currentTemplate.id);
    if (tpl) {
        document.getElementById('tplName').value = tpl.name;
        document.getElementById('tplTitle').value = tpl.title;
        document.getElementById('tplContent').value = tpl.content;
    }
}
