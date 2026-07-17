let chatData = [
    { id: 'chat-001', userId: 'user-001', userName: '王小明', phone: '138****8888', avatar: '王', status: 'pending', lastMessage: '你好，我想咨询一下订单配送', lastTime: '10:32', unread: 2, messages: [{ id: 'm1', from: 'other', content: '您好，很高兴为您服务！', time: '10:30', isAI: false }, { id: 'm2', from: 'me', content: '你好，我想咨询一下订单配送', time: '10:32', isAI: false }, { id: 'm3', from: 'other', content: '请问您的订单号是多少？', time: '10:33', isAI: false }, { id: 'm4', from: 'me', content: 'ORD-20260624-001', time: '10:35', isAI: false }] },
    { id: 'chat-002', userId: 'user-002', userName: '李佳琦', phone: '139****5678', avatar: '李', status: 'active', lastMessage: '什么时候可以自提？', lastTime: '09:15', unread: 0, messages: [{ id: 'm1', from: 'me', content: '什么时候可以自提？', time: '09:15', isAI: false }, { id: 'm2', from: 'other', content: '您的订单已发货，请今天下午到店自提', time: '09:20', isAI: false }] },
    { id: 'chat-003', userId: 'user-003', userName: '张雪迎', phone: '137****9012', avatar: '张', status: 'pending', lastMessage: '我要退货，怎么操作？', lastTime: '08:45', unread: 1, messages: [{ id: 'm1', from: 'me', content: '我要退货，怎么操作？', time: '08:45', isAI: false }] },
    { id: 'chat-004', userId: 'user-004', userName: '刘亦菲', phone: '136****3456', avatar: '刘', status: 'closed', lastMessage: '好的，谢谢！', lastTime: '昨天', unread: 0, messages: [{ id: 'm1', from: 'me', content: '订单什么时候发货？', time: '昨天 16:00', isAI: false }, { id: 'm2', from: 'other', content: '您的订单已发货，请耐心等待', time: '昨天 16:30', isAI: false }, { id: 'm3', from: 'me', content: '好的，谢谢！', time: '昨天 16:35', isAI: false }] },
    { id: 'chat-005', userId: 'user-005', userName: '陈伟霆', phone: '135****7890', avatar: '陈', status: 'active', lastMessage: '什么时候发货？', lastTime: '10:00', unread: 0, messages: [{ id: 'm1', from: 'me', content: '什么时候发货？', time: '10:00', isAI: false }, { id: 'm2', from: 'other', content: '您的订单已发货，请尽快到店自提', time: '10:05', isAI: true }] },
    { id: 'chat-006', userId: 'user-006', userName: '赵丽颖', phone: '134****2345', avatar: '赵', status: 'pending', lastMessage: '优惠券怎么用？', lastTime: '09:30', unread: 3, messages: [{ id: 'm1', from: 'me', content: '优惠券怎么用？', time: '09:30', isAI: false }] }
];

let currentChatId = 'chat-001';
let filterStatus = 'all';
let currentChatSearchKeyword = '';

function getStatusBadge(status) {
    const colors = { pending: 'yellow', active: 'green', closed: 'gray' };
    const texts = { pending: '待接入', active: '进行中', closed: '已关闭' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}" style="font-size:11px;"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function filterChats() {
    let filtered = chatData;
    if (filterStatus !== 'all') {
        filtered = filtered.filter(c => c.status === filterStatus);
    }
    if (currentChatSearchKeyword) {
        const keyword = currentChatSearchKeyword.toLowerCase();
        filtered = filtered.filter(c => 
            c.userName.toLowerCase().includes(keyword) || 
            c.phone.toLowerCase().includes(keyword) ||
            c.lastMessage.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchChats() {
    const input = document.getElementById('chatSearchInput');
    if (input) {
        currentChatSearchKeyword = input.value.trim();
        refreshServicePage();
    }
}

function handleChatAction(chatId, action) {
    const chat = chatData.find(c => c.id === chatId);
    if (!chat) return;
    
    if (action === 'accept') {
        chat.status = 'active';
        chat.unread = 0;
        alert('已接入会话！');
    } else if (action === 'close') {
        showConfirm('确定关闭此会话吗？', function() {
            chat.status = 'closed';
            alert('会话已关闭！');
            refreshServicePage();
        });
    } else if (action === 'transfer') {
        const target = prompt('请输入转接的客服账号：');
        if (target) {
            alert(`已转接给 ${target}`);
        }
    }
    
    refreshServicePage();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const content = input.value.trim();
    if (!content) return;
    
    const chat = chatData.find(c => c.id === currentChatId);
    if (!chat) return;
    
    chat.messages.push({
        id: 'm' + Date.now(),
        from: 'other',
        content: content,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isAI: false
    });
    
    chat.lastMessage = content;
    chat.lastTime = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    input.value = '';
    refreshServicePage();
}

function triggerAIReply() {
    const chat = chatData.find(c => c.id === currentChatId);
    if (!chat) return;
    
    const aiResponses = [
        '您好！很高兴为您服务。请问有什么可以帮您？',
        '感谢您的咨询，如有其他问题随时联系我们！',
        '您的问题我们已记录，稍后会有专人联系您。',
        '抱歉给您带来不便，我们会尽快处理您的问题。',
        '根据您的问题，建议您查看订单详情页获取更多信息。',
        '好的，我们已经收到您的反馈，会尽快处理。'
    ];
    
    const randomReply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    
    setTimeout(() => {
        chat.messages.push({
            id: 'm' + Date.now(),
            from: 'other',
            content: randomReply,
            time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
            isAI: true
        });
        
        chat.lastMessage = randomReply;
        chat.lastTime = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        
        refreshServicePage();
    }, 1500);
    
    alert('AI助手正在生成回复...');
}

function selectChat(chatId) {
    currentChatId = chatId;
    const chat = chatData.find(c => c.id === chatId);
    if (chat) {
        chat.unread = 0;
        if (chat.status === 'pending') {
            chat.status = 'active';
        }
    }
    refreshServicePage();
}

function switchChatFilter(status) {
    filterStatus = status;
    refreshServicePage();
}

function refreshServicePage() {
    const panel = document.getElementById('panel-service');
    if (panel) panel.innerHTML = servicePage();
}

function servicePage() {
    const chats = filterChats();
    const currentChat = chatData.find(c => c.id === currentChatId) || chats[0];
    const pendingCount = chatData.filter(c => c.status === 'pending').length;
    const activeCount = chatData.filter(c => c.status === 'active').length;
    const closedCount = chatData.filter(c => c.status === 'closed').length;
    
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
                <input id="chatSearchInput" placeholder="搜索用户昵称 / 手机号" onkeypress="if(event.key==='Enter') searchChats()" />
                <select onchange="switchChatFilter(this.value)">
                    <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>全部状态</option>
                    <option value="pending" ${filterStatus === 'pending' ? 'selected' : ''}>待接入</option>
                    <option value="active" ${filterStatus === 'active' ? 'selected' : ''}>进行中</option>
                    <option value="closed" ${filterStatus === 'closed' ? 'selected' : ''}>已关闭</option>
                </select>
                <button class="btn btn-primary" onclick="searchChats()"><i class="fas fa-search"></i> 搜索</button>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px;">
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待接入</div><div class="value" style="font-size:22px;color:#f59e0b;">${pendingCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-comments"></i> 进行中</div><div class="value" style="font-size:22px;color:#3b82f6;">${activeCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已关闭</div><div class="value" style="font-size:22px;color:#22c55e;">${closedCount}</div></div>
        </div>

        <div class="card" style="flex:1;">
            <div class="card-body no-pad" style="display:flex;height:calc(100vh - 300px);">
                <div style="width:320px;border-right:1px solid #e2e8f0;display:flex;flex-direction:column;">
                    <div style="padding:12px 16px;border-bottom:1px solid #e2e8f0;background:#f8fafc;font-weight:600;font-size:14px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;">
                            <span><i class="fas fa-comments"></i> 会话列表</span>
                            <span style="font-size:12px;font-weight:400;color:#64748b;">共 ${chats.length} 条</span>
                        </div>
                    </div>
                    <div style="flex:1;overflow-y:auto;">
                        ${chats.map(chat => `
                            <div style="padding:12px 16px;cursor:pointer;border-bottom:1px solid #f1f4f9;transition:0.15s;${currentChatId === chat.id ? 'background:#eef1ff;' : ''}" onclick="selectChat('${chat.id}')" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='${currentChatId === chat.id ? '#eef1ff' : 'transparent'}'">
                                <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                                    <div style="width:36px;height:36px;background:${currentChatId === chat.id ? '#4f6ef7' : '#e2e8f0'};color:${currentChatId === chat.id ? '#fff' : '#64748b'};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px;">${chat.avatar}</div>
                                    <div style="flex:1;min-width:0;">
                                        <div style="font-weight:500;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${chat.userName}</div>
                                        <div style="font-size:11px;color:#94a3b8;">${chat.phone}</div>
                                    </div>
                                    <div style="text-align:right;">
                                        ${chat.unread > 0 ? `<span style="background:#ef4444;color:#fff;font-size:10px;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${chat.unread}</span>` : ''}
                                    </div>
                                </div>
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <div style="flex:1;font-size:12px;color:#64748b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${chat.lastMessage}</div>
                                    <span style="font-size:11px;color:#94a3b8;">${chat.lastTime}</span>
                                </div>
                                <div style="margin-top:4px;">
                                    ${getStatusBadge(chat.status)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="flex:1;display:flex;flex-direction:column;">
                    ${currentChat ? `
                        <div style="padding:12px 16px;border-bottom:1px solid #e2e8f0;background:#f8fafc;display:flex;align-items:center;justify-content:space-between;">
                            <div style="display:flex;align-items:center;gap:12px;">
                                <div style="width:40px;height:40px;background:#4f6ef7;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;">${currentChat.avatar}</div>
                                <div>
                                    <div style="font-weight:600;font-size:14px;">${currentChat.userName}</div>
                                    <div style="font-size:12px;color:#64748b;">${currentChat.phone} · ${getStatusBadge(currentChat.status)}</div>
                                </div>
                            </div>
                            <div style="display:flex;gap:8px;">
                                ${currentChat.status === 'pending' ? `<button class="btn btn-sm btn-primary" onclick="handleChatAction('${currentChat.id}', 'accept')"><i class="fas fa-phone"></i> 接入</button>` : ''}
                                ${currentChat.status === 'active' ? `<button class="btn btn-sm btn-danger" onclick="handleChatAction('${currentChat.id}', 'close')"><i class="fas fa-times"></i> 关闭</button>` : ''}
                            </div>
                        </div>
                        
                        <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;">
                            ${currentChat.messages.map(msg => `
                                <div style="display:flex;${msg.from === 'other' ? 'justify-content:flex-start;' : 'justify-content:flex-end;'}">
                                    <div style="max-width:70%;padding:10px 14px;border-radius:12px;${msg.from === 'other' ? 'background:#eef1ff;color:#1e293b;border-top-left-radius:4px;' : 'background:#4f6ef7;color:#fff;border-top-right-radius:4px;'}">
                                        <div style="font-size:13px;line-height:1.5;">${msg.content}</div>
                                        <div style="font-size:10px;margin-top:4px;color:${msg.from === 'other' ? '#64748b' : '#a5b4fc'};display:flex;align-items:center;gap:4px;">
                                            ${msg.time}
                                            ${msg.isAI ? `<span style="background:#f59e0b;color:#fff;padding:1px 4px;border-radius:4px;font-size:9px;">AI助手</span>` : ''}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="padding:12px 16px;border-top:1px solid #e2e8f0;display:flex;gap:10px;align-items:center;">
                            <button class="btn btn-outline btn-sm"><i class="fas fa-image"></i></button>
                            <input type="text" id="chatInput" placeholder="输入消息，按回车发送……" style="flex:1;padding:8px 12px;border:1px solid #e2e8f0;border-radius:20px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" onkeydown="if(event.keyCode===13) sendMessage()" />
                            <button class="btn btn-primary" onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    ` : `
                        <div style="flex:1;display:flex;align-items:center;justify-content:center;color:#94a3b8;">
                            <div style="text-align:center;">
                                <div style="font-size:48px;margin-bottom:12px;"><i class="fas fa-comments"></i></div>
                                <div style="font-size:14px;">请选择一个会话开始聊天</div>
                            </div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}