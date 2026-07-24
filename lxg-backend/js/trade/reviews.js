// 评价数据缓存
let reviewsData = [];
// AI总结数据缓存
let aiSummaryData = [];

// 评价筛选条件
let currentReviewSearchKeyword = '';
let currentReviewStatusFilter = 'all';
let currentReviewRatingFilter = 'all';

// 获取评价状态标签HTML
function getStatusBadge(status) {
    const colors = { approved: 'green', pending: 'yellow', hidden: 'gray' };
    const texts = { approved: '显示', pending: '待审核', hidden: '隐藏' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 获取AI总结状态标签HTML
function getSummaryStatusBadge(status) {
    const colors = { approved: 'green', pending: 'yellow', rejected: 'red' };
    const texts = { approved: '已发布', pending: '待审核', rejected: '已拒绝' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

// 根据评分获取评价等级标签
function getRatingText(rating) {
    if (rating >= 4) {
        return `<span class="status-badge green"><span class="dot"></span> 好评</span>`;
    } else if (rating >= 3) {
        return `<span class="status-badge yellow"><span class="dot"></span> 中评</span>`;
    } else {
        return `<span class="status-badge red"><span class="dot"></span> 差评</span>`;
    }
}

// 生成星级HTML
function getRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += `<i class="fas fa-star" style="color:#fbbf24;"></i>`;
        } else {
            stars += `<i class="far fa-star" style="color:#e2e8f0;"></i>`;
        }
    }
    return stars;
}

// 加载评价列表
async function loadReviews() {
    try {
        const response = await apiGet(API_CONFIG.reviews.list);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        reviewsData = dataList.map(item => ({
            id: item.ID || item.id,
            goodsId: item.productId || item.goodsId || '',
            goodsName: item.productName || item.goodsName || '',
            userId: item.userId || '',
            userName: item.userName || item.name || '',
            phone: item.phone || '',
            rating: item.rating || 0,
            content: item.content || '',
            images: item.images || [],
            likes: item.likes || item.likeCount || 0,
            status: item.status === 1 ? 'approved' : item.status === 0 ? 'pending' : 'hidden',
            createTime: item.createdAt || item.CreatedAt || '',
            reply: item.adminReply ? {
                content: item.adminReply.content || '',
                time: item.adminReply.time || item.adminReply.createdAt || ''
            } : null,
            replies: (item.replies || []).map(r => ({
                id: r.id || '',
                userName: r.userName || '',
                content: r.content || '',
                time: r.createdAt || r.time || '',
                likes: r.likes || 0
            }))
        }));
        refreshReviewsPage();
    } catch (error) {
        console.error('Failed to load reviews:', error);
    }
}

// 加载AI评价总结列表
async function loadSummaries() {
    try {
        const response = await apiGet(API_CONFIG.reviews.summaries);
        if (response && response.data) {
            aiSummaryData = response.data.map(item => ({
                id: item.ID || item.id,
                goodsId: item.productId || item.goodsId || '',
                goodsName: item.productName || item.goodsName || '',
                content: item.summary || item.content || '',
                reviewCount: item.reviewCount || 0,
                status: item.status === 1 ? 'approved' : item.status === 0 ? 'pending' : 'rejected',
                createTime: item.createdAt || item.CreatedAt || '',
                updateTime: item.updatedAt || item.updateTime || ''
            }));
        } else {
            aiSummaryData = [];
        }
        refreshReviewsPage();
    } catch (error) {
        console.error('Failed to load summaries:', error);
    }
}

function filterReviews() {
    let filtered = reviewsData;
    if (currentReviewStatusFilter !== 'all') {
        filtered = filtered.filter(r => r.status === currentReviewStatusFilter);
    }
    if (currentReviewRatingFilter !== 'all') {
        if (currentReviewRatingFilter === 'good') {
            filtered = filtered.filter(r => r.rating >= 4);
        } else if (currentReviewRatingFilter === 'bad') {
            filtered = filtered.filter(r => r.rating < 3);
        }
    }
    if (currentReviewSearchKeyword) {
        const keyword = currentReviewSearchKeyword.toLowerCase();
        filtered = filtered.filter(r => 
            r.goodsName.toLowerCase().includes(keyword) || 
            r.userName.toLowerCase().includes(keyword) ||
            r.content.toLowerCase().includes(keyword)
        );
    }
    return filtered;
}

function searchReviews() {
    const input = document.getElementById('reviewSearchInput');
    if (input) {
        currentReviewSearchKeyword = input.value.trim();
        refreshReviewsPage();
    }
}

function switchReviewStatus(status) {
    currentReviewStatusFilter = status;
    refreshReviewsPage();
}

function switchReviewRating(rating) {
    currentReviewRatingFilter = rating;
    refreshReviewsPage();
}

async function handleReviewAction(reviewId, action) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    try {
        if (action === 'approve') {
            await apiPut(API_CONFIG.reviews.audit, { status: 1 }, { id: reviewId });
            review.status = 'approved';
        } else if (action === 'reject') {
            await apiPut(API_CONFIG.reviews.audit, { status: 2 }, { id: reviewId });
            review.status = 'hidden';
        } else if (action === 'toggle') {
            const newStatus = review.status === 'approved' ? 2 : 1;
            await apiPut(API_CONFIG.reviews.audit, { status: newStatus }, { id: reviewId });
            review.status = review.status === 'approved' ? 'hidden' : 'approved';
        }
        refreshReviewsPage();
    } catch (error) {
        console.error('Failed to handle review action:', error);
        showToast('操作失败，请重试', 'error');
    }
}

async function handleSummaryAction(summaryId, action) {
    const summary = aiSummaryData.find(s => s.id === summaryId);
    if (!summary) return;
    
    try {
        if (action === 'approve') {
            await apiPut(API_CONFIG.reviews.auditSummary, { status: 1 }, { id: summaryId });
            summary.status = 'approved';
            summary.updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
            showToast('AI评价摘要已发布！', 'success');
        } else if (action === 'reject') {
            showConfirm('确定拒绝此摘要并重新生成吗？', async function() {
                await apiPut(API_CONFIG.reviews.auditSummary, { status: 2 }, { id: summaryId });
                summary.status = 'rejected';
                refreshReviewsPage();
            });
        }
        refreshReviewsPage();
    } catch (error) {
        console.error('Failed to handle summary action:', error);
        showToast('操作失败，请重试', 'error');
    }
}

function showReviewDetail(reviewId) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeReviewModal()"></div>
        <div class="modal-content" style="width:900px;">
            <div class="modal-header">
                <h3><i class="fas fa-star"></i> 评价详情</h3>
                <button onclick="closeReviewModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div class="trade-review-detail-grid">
                    <div class="trade-review-original">
                        <div class="trade-review-section-title">评价原文</div>
                        <div class="trade-review-original-card">
                            <div class="trade-review-user-header">
                                <div class="trade-review-user-avatar">${review.userName.charAt(0)}</div>
                                <div class="trade-review-user-info">
                                    <div class="name">${review.userName}</div>
                                    <div class="phone">${review.phone}</div>
                                </div>
                            </div>
                            <div class="trade-review-rating">${getRatingStars(review.rating)}</div>
                            <div class="trade-review-content">${review.content}</div>
                            <div class="trade-review-meta">
                                <div class="trade-review-likes"><i class="fas fa-thumbs-up"></i> ${review.likes}</div>
                                <div class="trade-review-time">${review.createTime}</div>
                            </div>
                            ${review.images && review.images.length > 0 ? `
                            <div class="trade-review-images">
                                <div class="trade-review-images-label">晒图</div>
                                <div class="trade-review-images-list">
                                    ${review.images.map((img, i) => `<div class="trade-review-image-item" onclick="previewImage(${i})"></div>`).join('')}
                                </div>
                            </div>` : ''}
                        </div>
                    </div>
                    
                    <div class="trade-review-admin-reply">
                        <div class="trade-review-section-title">管理员回复</div>
                        <div class="trade-review-admin-reply-card">
                            ${review.reply ? `
                            <div class="trade-review-admin-reply-content">
                                <div class="trade-review-admin-reply-header">
                                    <div class="trade-review-admin-avatar">管</div>
                                    <div class="trade-review-admin-info">
                                        <div class="name">管理员</div>
                                        <div class="time">${review.reply.time}</div>
                                    </div>
                                </div>
                                <div class="trade-review-admin-reply-text">${review.reply.content}</div>
                            </div>
                            <div class="trade-review-admin-reply-actions">
                                <button class="btn btn-sm btn-outline" onclick="editReply('${review.id}')"><i class="fas fa-edit"></i> 编辑</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteReply('${review.id}')"><i class="fas fa-trash"></i> 删除</button>
                            </div>
                            ` : `
                            <div class="trade-review-empty-state">
                                <i class="fas fa-comment"></i>
                                <div>暂无管理员回复</div>
                                <button class="btn btn-sm btn-primary" onclick="showReplyInput('${review.id}')"><i class="fas fa-plus"></i> 添加回复</button>
                            </div>
                            `}
                        </div>
                        <div id="replyInputArea-${review.id}" class="trade-review-reply-input" style="display:none;">
                            <textarea id="replyContent-${review.id}" rows="3" placeholder="请输入回复内容..." class="trade-review-reply-textarea"></textarea>
                            <div class="trade-review-reply-actions">
                                <button class="btn btn-sm btn-outline" onclick="hideReplyInput('${review.id}')">取消</button>
                                <button class="btn btn-sm btn-primary" onclick="submitReply('${review.id}')"><i class="fas fa-send"></i> 发送</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="trade-review-user-replies">
                        <div class="trade-review-section-title">用户回复</div>
                        <div class="trade-review-user-replies-card">
                            ${review.replies && review.replies.length > 0 ? `
                            <div class="trade-review-user-replies-list">
                                ${review.replies.map(reply => `
                                    <div class="trade-review-user-reply">
                                        <div class="trade-review-user-reply-header">
                                            <div class="trade-review-user-reply-avatar">${reply.userName.charAt(0)}</div>
                                            <div class="trade-review-user-reply-info">
                                                <div class="name">${reply.userName}</div>
                                                <div class="time">${reply.time}</div>
                                            </div>
                                        </div>
                                        <div class="trade-review-user-reply-content">${reply.content}</div>
                                        <div class="trade-review-user-reply-meta">
                                            <div class="trade-review-user-reply-likes"><i class="fas fa-thumbs-up"></i> ${reply.likes}</div>
                                            <button class="btn btn-sm btn-danger" onclick="deleteUserReply('${review.id}', '${reply.id}')"><i class="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            ` : `
                            <div class="trade-review-empty-state">
                                <i class="fas fa-comments"></i>
                                <div>暂无用户回复</div>
                            </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${review.status === 'pending' ? `
                <button class="btn btn-success" onclick="handleReviewAction('${review.id}', 'approve')"><i class="fas fa-check"></i> 通过</button>
                <button class="btn btn-danger" onclick="handleReviewAction('${review.id}', 'reject')"><i class="fas fa-times"></i> 拒绝</button>
                ` : `
                <button class="btn btn-outline" onclick="handleReviewAction('${review.id}', 'toggle')"><i class="fas fa-${review.status === 'approved' ? 'eye-slash' : 'eye'}"></i> ${review.status === 'approved' ? '隐藏' : '显示'}</button>
                `}
                <button class="btn btn-outline" onclick="closeReviewModal()">关闭</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function showReplyInput(reviewId) {
    document.getElementById(`replyInputArea-${reviewId}`).style.display = 'block';
}

function hideReplyInput(reviewId) {
    document.getElementById(`replyInputArea-${reviewId}`).style.display = 'none';
}

async function submitReply(reviewId) {
    const content = document.getElementById(`replyContent-${reviewId}`).value.trim();
    if (!content) {
        showToast('请输入回复内容', 'error');
        return;
    }
    
    try {
        const response = await apiPut(API_CONFIG.reviews.reply, { content: content }, { id: reviewId });
        if (response.code === 200) {
            const review = reviewsData.find(r => r.id === reviewId);
            if (review) {
                review.reply = {
                    content: content,
                    time: new Date().toISOString().replace('T', ' ').substring(0, 19)
                };
            }
            showToast('回复成功！', 'success');
            closeReviewModal();
            refreshReviewsPage();
        } else {
            showToast(response.message || '回复失败', 'error');
        }
    } catch (error) {
        console.error('Failed to submit reply:', error);
        showToast('回复失败，请重试', 'error');
    }
}

function editReply(reviewId) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review || !review.reply) return;
    
    const content = prompt('请输入新的回复内容:', review.reply.content);
    if (content !== null) {
        review.reply.content = content;
        review.reply.time = new Date().toISOString().replace('T', ' ').substring(0, 19);
        showToast('回复已更新！', 'success');
        closeReviewModal();
        refreshReviewsPage();
    }
}

function deleteReply(reviewId) {
    showConfirm('确定删除管理员回复吗？', function() {
        const review = reviewsData.find(r => r.id === reviewId);
        if (review) {
            review.reply = null;
            showToast('回复已删除！', 'success');
            closeReviewModal();
            refreshReviewsPage();
        }
    });
}

function deleteUserReply(reviewId, replyId) {
    showConfirm('确定删除此用户回复吗？', function() {
        const review = reviewsData.find(r => r.id === reviewId);
        if (review && review.replies) {
            const reply = review.replies.find(r => r.id === replyId);
            if (reply) {
                reply.content = '该回复已被删除';
                showToast('回复已处理！', 'success');
                closeReviewModal();
                refreshReviewsPage();
            }
        }
    });
}

function closeReviewModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function refreshReviewsPage() {
    const panel = document.getElementById('panel-reviews');
    if (panel) panel.innerHTML = reviewsPage();
}

function reviewsPage() {
    const approvedCount = reviewsData.filter(r => r.status === 'approved').length;
    const pendingCount = reviewsData.filter(r => r.status === 'pending').length;
    const hiddenCount = reviewsData.filter(r => r.status === 'hidden').length;
    const goodCount = reviewsData.filter(r => r.rating >= 4).length;
    const badCount = reviewsData.filter(r => r.rating < 3).length;
    const filteredReviews = filterReviews();
    
    return `
        
        
        <div class="trade-stat-grid">
            <div class="stat-card"><div class="label"><i class="fas fa-thumbs-up"></i> 好评</div><div class="value green">${goodCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-thumbs-down"></i> 差评</div><div class="value red">${badCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待审核</div><div class="value yellow">${pendingCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-trash"></i> 已隐藏</div><div class="value gray">${hiddenCount}</div></div>
        </div>

        <div class="search-bar" style="margin:12px 0;">
            <input id="reviewSearchInput" placeholder="商品名称 / 用户" onkeypress="if(event.key==='Enter') searchReviews()" />
            <select onchange="switchReviewStatus(this.value)">
                <option value="all" ${currentReviewStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                <option value="pending" ${currentReviewStatusFilter === 'pending' ? 'selected' : ''}>待审核</option>
                <option value="approved" ${currentReviewStatusFilter === 'approved' ? 'selected' : ''}>显示</option>
                <option value="hidden" ${currentReviewStatusFilter === 'hidden' ? 'selected' : ''}>隐藏</option>
            </select>
            <select onchange="switchReviewRating(this.value)">
                <option value="all" ${currentReviewRatingFilter === 'all' ? 'selected' : ''}>全部评价</option>
                <option value="good" ${currentReviewRatingFilter === 'good' ? 'selected' : ''}>好评</option>
                <option value="bad" ${currentReviewRatingFilter === 'bad' ? 'selected' : ''}>差评</option>
            </select>
            <button class="btn btn-primary" onclick="searchReviews()"><i class="fas fa-search"></i> 搜索</button>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
            <div>
                <div class="card">
                    <div class="card-header">
                        <span class="card-title"><i class="fas fa-star"></i> 评价列表</span>
                        <span class="text-muted" style="font-size:13px;">共 ${filteredReviews.length} 条评价</span>
                    </div>
                    <div class="card-body no-pad">
                        <div class="table-wrap"><table>
                            <thead><tr><th>商品</th><th>用户</th><th>评价</th><th>评价内容</th><th>时间</th><th>状态</th><th>操作</th></tr></thead>
                            <tbody>
                                ${filteredReviews.map(review => `
                                    <tr>
                                        <td><div style="display:flex;align-items:center;gap:8px;"><span style="width:28px;height:28px;background:#e2e8f0;border-radius:4px;display:inline-block;"></span>${review.goodsName}</div></td>
                                        <td><div><span>${review.userName}</span><div style="font-size:11px;color:#94a3b8;">${review.phone}</div></div></td>
                                        <td>${getRatingText(review.rating)}</td>
                                        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${review.content}</td>
                                        <td>${review.createTime}</td>
                                        <td>${getStatusBadge(review.status)}</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline" onclick="showReviewDetail('${review.id}')"><i class="fas fa-eye"></i> 详情</button>
                                            ${review.status === 'pending' ? `
                                            <button class="btn btn-sm btn-success" onclick="handleReviewAction('${review.id}', 'approve')"><i class="fas fa-check"></i> 通过</button>
                                            <button class="btn btn-sm btn-danger" onclick="handleReviewAction('${review.id}', 'reject')"><i class="fas fa-times"></i> 拒绝</button>
                                            ` : `
                                            <button class="btn btn-sm btn-outline" onclick="handleReviewAction('${review.id}', 'toggle')"><i class="fas fa-${review.status === 'approved' ? 'eye-slash' : 'eye'}"></i></button>
                                            `}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <span class="card-title"><i class="fas fa-robot"></i> AI 评价摘要审核</span>
                        <span class="text-muted" style="font-size:13px;">系统自动生成评价摘要，需审核后发布</span>
                    </div>
                    <div class="card-body no-pad">
                        <div class="table-wrap"><table>
                            <thead><tr><th>商品</th><th>摘要内容</th><th>基于评价数</th><th>状态</th><th>生成时间</th><th>操作</th></tr></thead>
                            <tbody>
                                ${aiSummaryData.map(summary => `
                                    <tr>
                                        <td>${summary.goodsName}</td>
                                        <td style="max-width:250px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${summary.content}</td>
                                        <td>${summary.reviewCount}条</td>
                                        <td>${getSummaryStatusBadge(summary.status)}</td>
                                        <td>${summary.createTime}</td>
                                        <td>
                                            ${summary.status === 'pending' ? `
                                            <button class="btn btn-sm btn-success" onclick="handleSummaryAction('${summary.id}', 'approve')"><i class="fas fa-check"></i> 通过</button>
                                            <button class="btn btn-sm btn-danger" onclick="handleSummaryAction('${summary.id}', 'reject')"><i class="fas fa-times"></i> 拒绝</button>
                                            <button class="btn btn-sm btn-outline"><i class="fas fa-edit"></i> 编辑</button>
                                            ` : summary.status === 'approved' ? `
                                            <button class="btn btn-sm btn-outline"><i class="fas fa-edit"></i> 编辑</button>
                                            <button class="btn btn-sm btn-outline"><i class="fas fa-sync-alt"></i> 重新生成</button>
                                            ` : `
                                            <button class="btn btn-sm btn-success" onclick="handleSummaryAction('${summary.id}', 'approve')"><i class="fas fa-check"></i> 通过</button>
                                            <button class="btn btn-sm btn-outline"><i class="fas fa-sync-alt"></i> 重新生成</button>
                                            `}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table></div>
                    </div>
                </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:12px;">
                <div class="card">
                    <div class="card-header"><span class="card-title"><i class="fas fa-calendar"></i> 近7天评价趋势</span></div>
                    <div class="card-body">
                        <div style="display:flex;align-items:flex-end;justify-content:space-between;height:120px;padding:0 8px;">
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:60px;background:#667eea;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周一</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:45px;background:#764ba2;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周二</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:80px;background:#667eea;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周三</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:55px;background:#764ba2;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周四</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:95px;background:#667eea;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周五</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:110px;background:#764ba2;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周六</span></div>
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:28px;"><div style="width:18px;height:75px;background:#667eea;border-radius:4px;"></div><span style="font-size:10px;color:#94a3b8;">周日</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}