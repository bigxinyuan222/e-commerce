// 客服会话数据缓存
let chatData = [];
// 当前选中的会话ID
let currentChatId = '';
// 会话状态筛选
let filterStatus = 'all';
// 会话搜索关键词
let currentChatSearchKeyword = '';
let pendingChatCount = null;
let currentChatPage = 1;
const chatPageSize = 20;
let chatTotal = 0;
let chatSocket = null;
let chatSocketState = 'disconnected';
let chatSocketReconnectTimer = null;
let chatSocketReconnectAttempts = 0;
let chatSocketManuallyClosed = false;

function getChatSocketUrl() {
    const configuredUrl = window.LXG_CHAT_WS_URL || `${location.protocol === 'https:' ? 'wss' : 'ws'}://192.168.10.7:8089/api/v1/admin/chat/ws`;
    const user = JSON.parse(localStorage.getItem('lexiangou_admin_user') || '{}');
    if (!user.token) return configuredUrl;
    const separator = configuredUrl.includes('?') ? '&' : '?';
    return `${configuredUrl}${separator}token=${encodeURIComponent(user.token)}`;
}

function connectChatWebSocket() {
    if (chatSocket && (chatSocket.readyState === WebSocket.OPEN || chatSocket.readyState === WebSocket.CONNECTING)) return;
    clearTimeout(chatSocketReconnectTimer);
    chatSocketManuallyClosed = false;
    chatSocketState = 'connecting';
    refreshServicePage();

    try {
        chatSocket = new WebSocket(getChatSocketUrl());
    } catch (error) {
        console.error('Unable to create chat WebSocket:', error);
        scheduleChatSocketReconnect();
        return;
    }

    chatSocket.addEventListener('open', () => {
        chatSocketState = 'connected';
        chatSocketReconnectAttempts = 0;
        refreshServicePage();
    });
    chatSocket.addEventListener('message', event => handleChatSocketMessage(event.data));
    chatSocket.addEventListener('error', error => console.error('Chat WebSocket error:', error));
    chatSocket.addEventListener('close', () => {
        chatSocket = null;
        chatSocketState = 'disconnected';
        refreshServicePage();
        if (!chatSocketManuallyClosed) scheduleChatSocketReconnect();
    });
}

function scheduleChatSocketReconnect() {
    clearTimeout(chatSocketReconnectTimer);
    const delay = Math.min(30000, 1000 * (2 ** chatSocketReconnectAttempts));
    chatSocketReconnectAttempts += 1;
    chatSocketReconnectTimer = setTimeout(connectChatWebSocket, delay);
}

function handleChatSocketMessage(rawMessage) {
    let payload;
    try {
        payload = typeof rawMessage === 'string' ? JSON.parse(rawMessage) : rawMessage;
    } catch (error) {
        console.warn('Ignored invalid chat WebSocket message:', rawMessage, error);
        return;
    }
    if (payload?.type !== 'chat') return;
    const data = payload.data || {};
    const conversationId = data.conversationId ?? data.conversation_id;
    const chat = chatData.find(item => String(item.id) === String(conversationId));
    if (!chat || !data.content) return;

    const messageId = data.id ?? data.messageId ?? `ws-${Date.now()}`;
    if (chat.messages.some(message => String(message.id) === String(messageId))) return;
    const presentation = getChatMessagePresentation(data);
    chat.messages.push({ id: messageId, ...presentation, content: data.content, time: data.createdAt ?? data.created_at ?? new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) });
    chat.lastMessage = data.content;
    chat.lastTime = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    if (String(currentChatId) !== String(chat.id)) chat.unread += 1;
    refreshServicePage();
    loadPendingChatCount();
}

function getChatMessagePresentation(message = {}) {
    const sender = message.from ?? message.senderType ?? message.sender_type;
    const normalizedSender = String(sender ?? '').toLowerCase();
    const isAI = Number(sender) === 3 || normalizedSender === 'ai' || Number(message.replySource ?? message.reply_source) === 1 || message.isAI === true;
    const isStaff = Number(sender) === 2 || ['admin', 'service', 'staff', 'agent'].includes(normalizedSender);

    return {
        // In the admin console, customer messages are left; staff and AI replies are right.
        from: isStaff || isAI ? 'me' : 'other',
        isAI
    };
}

async function loadPendingChatCount() {
    try {
        const response = await apiGet(API_CONFIG.service.pendingCount);
        pendingChatCount = Number(response?.count ?? 0);
        refreshServicePage();
    } catch (error) {
        pendingChatCount = null;
        console.error('Failed to load pending conversation count:', error);
    }
}

// 加载客服会话列表
async function loadChats() {
    connectChatWebSocket();
    await loadPendingChatCount();
    try {
        const params = {
            page: currentChatPage,
            pageSize: chatPageSize,
            status: filterStatus === 'all' ? '' : ({ pending: 0, active: 1, closed: 2 }[filterStatus] ?? '')
        };
        const response = await apiGet(API_CONFIG.service.conversations, params);
        const dataList = response && response.list ? response.list : (response?.items ?? response?.records ?? (Array.isArray(response) ? response : []));
        chatTotal = Number(response?.total ?? response?.total_count ?? response?.count ?? dataList.length);
        chatData = dataList.map(item => ({
            id: item.ID || item.id,
            userId: item.user_id ?? item.userId ?? item.user?.id ?? '',
            userName: item.user_name ?? item.userName ?? item.user?.nickname ?? item.user?.name ?? '',
            phone: item.phone ?? item.user?.phone ?? '',
            avatar: (item.user_name ?? item.userName ?? item.user?.nickname ?? item.user?.name ?? '').charAt(0) || '用',
            status: item.status === 0 ? 'pending' : item.status === 1 ? 'active' : 'closed',
            lastMessage: item.last_message ?? item.lastMessage ?? '',
            lastTime: item.updated_at ?? item.updatedAt ?? item.last_time ?? item.lastTime ?? '',
            unread: Number(item.unread_count ?? item.unreadCount) || 0,
            messages: []
        }));
        // 默认选中第一个会话并加载消息
        if (chatData.length > 0 && !currentChatId) {
            currentChatId = chatData[0].id;
            await loadChatMessages(currentChatId);
        }
        refreshServicePage();
    } catch (error) {
        console.error('Failed to load conversations:', error);
    }
}

// 加载会话消息
async function loadChatMessages(chatId) {
    try {
        const response = await apiGet(API_CONFIG.service.messages, {
            page: 1,
            pageSize: 20
        }, { id: chatId });
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        const chat = chatData.find(c => String(c.id) === String(chatId));
        if (chat) {
            chat.messages = [...dataList].reverse().map(item => ({
                id: item.ID || item.id,
                ...getChatMessagePresentation(item),
                content: item.content || '',
                time: item.createdAt || item.created_at || item.time || ''
            }));
        }
    } catch (error) {
        console.error('Failed to load messages:', error);
    }
}

// 获取会话状态标签HTML
function getStatusBadge(status) {
    const colors = { pending: 'yellow', active: 'green', closed: 'gray' };
    const texts = { pending: '待接入', active: '进行中', closed: '已关闭' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}" style="font-size:11px;"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 根据筛选条件过滤会话列表
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

// 执行会话搜索
function searchChats() {
    const input = document.getElementById('chatSearchInput');
    if (input) {
        currentChatSearchKeyword = input.value.trim();
        refreshServicePage();
    }
}

// 处理会话操作（接入/关闭）
async function handleChatAction(chatId, action) {
    const chat = chatData.find(c => String(c.id) === String(chatId));
    if (!chat) return;
    
    if (action === 'accept') {
        try {
            await apiPut(API_CONFIG.service.accept, {}, { id: chatId });
            chat.status = 'active';
            chat.unread = 0;
            if (filterStatus === 'pending') currentChatId = '';
            await loadChats();
            showToast('已接入会话！', 'success');
        } catch (error) {
            console.error('Failed to accept conversation:', error);
            showToast('操作失败，请重试', 'error');
        }
    } else if (action === 'close') {
        showConfirm('确定关闭此会话吗？', async function() {
            try {
                await apiPut(API_CONFIG.service.close, {}, { id: chatId });
                chat.status = 'closed';
                showToast('会话已关闭！', 'success');
            } catch (error) {
                console.error('Failed to close conversation:', error);
                showToast('操作失败，请重试', 'error');
            }
            refreshServicePage();
        });
    } else if (action === 'transfer') {
        const target = prompt('请输入转接的客服账号：');
        if (target) {
            try {
                await apiPut(API_CONFIG.service.transfer, { targetAdmin: target }, { id: chatId });
                showToast(`已转接给 ${target}`, 'success');
            } catch (error) {
                console.error('Failed to transfer conversation:', error);
                showToast('操作失败，请重试', 'error');
            }
        }
    }
    
    refreshServicePage();
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const content = input.value.trim();
    if (!content) return;
    
    const chat = chatData.find(c => String(c.id) === String(currentChatId));
    if (!chat) return;
    
    try {
        let sentViaSocket = false;
        if (chatSocket?.readyState === WebSocket.OPEN) {
            try {
                chatSocket.send(JSON.stringify({ type: 'chat', data: { conversationId: Number(currentChatId) || currentChatId, content, messageType: 1 } }));
                sentViaSocket = true;
            } catch (socketError) {
                console.warn('Chat WebSocket send failed, falling back to HTTP:', socketError);
            }
        }
        if (!sentViaSocket) {
            await apiPost(API_CONFIG.service.sendMessage, { content, message_type: 1 }, { id: currentChatId });
            connectChatWebSocket();
        }
        
        chat.messages.push({
            id: 'm' + Date.now(),
            from: 'me',
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
        showToast('发送失败，请重试', 'error');
    }
}

function triggerAIReply() {
    const chat = chatData.find(c => String(c.id) === String(currentChatId));
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
    
    showToast('AI助手正在生成回复...', 'success');
}

async function selectChat(chatId) {
    currentChatId = chatId;
    const chat = chatData.find(c => String(c.id) === String(chatId));
    if (chat) {
        chat.unread = 0;
        await loadChatMessages(chatId);
    }
    refreshServicePage();
}

async function switchChatFilter(status) {
    filterStatus = status;
    currentChatPage = 1;
    currentChatId = '';
    await loadChats();
}

async function changeChatPage(page) {
    const totalPages = Math.max(1, Math.ceil(chatTotal / chatPageSize));
    const nextPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
    if (nextPage === currentChatPage) return;
    currentChatPage = nextPage;
    currentChatId = '';
    await loadChats();
}

function refreshServicePage() {
    const panel = document.getElementById('panel-service');
    if (panel) panel.innerHTML = servicePage();
}

function servicePage() {
    const chats = filterChats();
    const currentChat = chatData.find(c => String(c.id) === String(currentChatId)) || chats[0];
    const pendingCount = pendingChatCount ?? chatData.filter(c => c.status === 'pending').length;
    const activeCount = chatData.filter(c => c.status === 'active').length;
    const closedCount = chatData.filter(c => c.status === 'closed').length;
    const totalPages = Math.max(1, Math.ceil(chatTotal / chatPageSize));
    
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
            <button class="btn btn-outline btn-sm" onclick="connectChatWebSocket()" title="点击重新连接">
                <i class="fas fa-circle" style="font-size:8px;color:${chatSocketState === 'connected' ? '#16a34a' : chatSocketState === 'connecting' ? '#f59e0b' : '#94a3b8'};"></i>
                ${chatSocketState === 'connected' ? '实时连接' : chatSocketState === 'connecting' ? '连接中' : '重新连接'}
            </button>
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
                        <span class="count">共 ${chatTotal} 条</span>
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
                    ${totalPages > 1 ? `<div style="display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-top:1px solid #e2e8f0;"><button class="icon-btn" ${currentChatPage <= 1 ? 'disabled' : ''} onclick="changeChatPage(${currentChatPage - 1})"><i class="fas fa-angle-left"></i></button><span style="font-size:12px;color:#64748b;">${currentChatPage} / ${totalPages}</span><button class="icon-btn" ${currentChatPage >= totalPages ? 'disabled' : ''} onclick="changeChatPage(${currentChatPage + 1})"><i class="fas fa-angle-right"></i></button></div>` : ''}
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
