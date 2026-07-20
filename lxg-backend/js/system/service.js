let chatData = [];
let currentChatId = '';
let filterStatus = 'all';
let currentChatSearchKeyword = '';

async function loadChats() {
    try {
        const params = {
            status: filterStatus === 'all' ? '' : filterStatus,
            keyword: currentChatSearchKeyword
        };
        const response = await apiGet(API_CONFIG.service.conversations, params);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        chatData = dataList.map(item => ({
            id: item.ID || item.id,
            userId: item.userId || '',
            userName: item.userName || '',
            phone: item.phone || '',
            avatar: (item.userName || '').charAt(0) || '用',
            status: item.status === 0 ? 'pending' : item.status === 1 ? 'active' : 'closed',
            lastMessage: item.lastMessage || '',
            lastTime: item.updatedAt || item.lastTime || '',
            unread: item.unreadCount || 0,
            messages: []
        }));
        if (chatData.length > 0 && !currentChatId) {
            currentChatId = chatData[0].id;
            await loadChatMessages(currentChatId);
        }
        refreshServicePage();
    } catch (error) {
        console.error('Failed to load conversations:', error);
    }
}

async function loadChatMessages(chatId) {
    try {
        const response = await apiGet(API_CONFIG.service.messages, {}, { id: chatId });
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        const chat = chatData.find(c => c.id === chatId);
        if (chat) {
            chat.messages = dataList.map(item => ({
                id: item.ID || item.id,
                from: item.from === 'admin' ? 'other' : 'me',
                content: item.content || '',
                time: item.createdAt || item.time || '',
                isAI: item.isAI || false
            }));
        }
    } catch (error) {
        console.error('Failed to load messages:', error);
    }
}

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

async function handleChatAction(chatId, action) {
    const chat = chatData.find(c => c.id === chatId);
    if (!chat) return;
    
    if (action === 'accept') {
        try {
            await apiPut(API_CONFIG.service.accept, {}, { id: chatId });
            chat.status = 'active';
            chat.unread = 0;
            alert('已接入会话！');
        } catch (error) {
            console.error('Failed to accept conversation:', error);
            alert('操作失败，请重试');
        }
    } else if (action === 'close') {
        showConfirm('确定关闭此会话吗？', async function() {
            try {
                await apiPut(API_CONFIG.service.close, {}, { id: chatId });
                chat.status = 'closed';
                alert('会话已关闭！');
            } catch (error) {
                console.error('Failed to close conversation:', error);
                alert('操作失败，请重试');
            }
            refreshServicePage();
        });
    } else if (action === 'transfer') {
        const target = prompt('请输入转接的客服账号：');
        if (target) {
            try {
                await apiPut(API_CONFIG.service.transfer, { targetAdmin: target }, { id: chatId });
                alert(`已转接给 ${target}`);
            } catch (error) {
                console.error('Failed to transfer conversation:', error);
                alert('操作失败，请重试');
            }
        }
    }
    
    refreshServicePage();
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const content = input.value.trim();
    if (!content) return;
    
    const chat = chatData.find(c => c.id === currentChatId);
    if (!chat) return;
    
    try {
        await apiPost(API_CONFIG.service.sendMessage, { content }, { id: currentChatId });
        
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
    } catch (error) {
        console.error('Failed to send message:', error);
        alert('发送失败，请重试');
    }
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

async function selectChat(chatId) {
    currentChatId = chatId;
    const chat = chatData.find(c => c.id === chatId);
    if (chat) {
        chat.unread = 0;
        if (chat.status === 'pending') {
            chat.status = 'active';
        }
        await loadChatMessages(chatId);
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

        <div class="system-stat-grid">
            <div class="system-stat-card"><div class="label"><i class="fas fa-clock"></i> 待接入</div><div class="value yellow">${pendingCount}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-comments"></i> 进行中</div><div class="value blue">${activeCount}</div></div>
            <div class="system-stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已关闭</div><div class="value green">${closedCount}</div></div>
        </div>

        <div class="card" style="flex:1;">
            <div class="card-body no-pad system-chat-layout">
                <div class="system-chat-sidebar">
                    <div class="system-chat-sidebar-header">
                        <span class="title"><i class="fas fa-comments"></i> 会话列表</span>
                        <span class="count">共 ${chats.length} 条</span>
                    </div>
                    <div class="system-chat-sidebar-body">
                        ${chats.map(chat => `
                            <div class="system-chat-item ${currentChatId === chat.id ? 'active' : ''}" onclick="selectChat('${chat.id}')">
                                <div class="system-chat-item-header">
                                    <div class="system-chat-item-avatar">${chat.avatar}</div>
                                    <div class="system-chat-item-info">
                                        <div class="name">${chat.userName}</div>
                                        <div class="phone">${chat.phone}</div>
                                    </div>
                                    ${chat.unread > 0 ? `<div class="system-chat-item-unread">${chat.unread}</div>` : ''}
                                </div>
                                <div class="system-chat-item-footer">
                                    <div class="message">${chat.lastMessage}</div>
                                    <span class="time">${chat.lastTime}</span>
                                </div>
                                <div style="margin-top:4px;">
                                    ${getStatusBadge(chat.status)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="system-chat-main">
                    ${currentChat ? `
                        <div class="system-chat-main-header">
                            <div class="system-chat-main-header-info">
                                <div class="system-chat-main-header-avatar">${currentChat.avatar}</div>
                                <div class="system-chat-main-header-details">
                                    <div class="name">${currentChat.userName}</div>
                                    <div class="info">${currentChat.phone} · ${getStatusBadge(currentChat.status)}</div>
                                </div>
                            </div>
                            <div class="system-chat-main-header-actions">
                                ${currentChat.status === 'pending' ? `<button class="btn btn-sm btn-primary" onclick="handleChatAction('${currentChat.id}', 'accept')"><i class="fas fa-phone"></i> 接入</button>` : ''}
                                ${currentChat.status === 'active' ? `<button class="btn btn-sm btn-danger" onclick="handleChatAction('${currentChat.id}', 'close')"><i class="fas fa-times"></i> 关闭</button>` : ''}
                            </div>
                        </div>
                        
                        <div class="system-chat-messages">
                            ${currentChat.messages.map(msg => `
                                <div class="system-chat-message ${msg.from === 'other' ? 'other' : 'me'}">
                                    <div class="system-chat-message-bubble">
                                        <div>${msg.content}</div>
                                        <div class="system-chat-message-time">
                                            ${msg.time}
                                            ${msg.isAI ? `<span class="system-chat-message-ai">AI助手</span>` : ''}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="system-chat-input-area">
                            <button class="btn btn-outline btn-sm"><i class="fas fa-image"></i></button>
                            <input type="text" id="chatInput" placeholder="输入消息，按回车发送……" class="system-chat-input" onkeydown="if(event.keyCode===13) sendMessage()" />
                            <button class="btn btn-primary" onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    ` : `
                        <div class="system-chat-empty">
                            <div><i class="fas fa-comments"></i></div>
                            <div class="system-chat-empty-text">请选择一个会话开始聊天</div>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}