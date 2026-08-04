// 评价数据缓存
let reviewsData = [];
// AI总结数据缓存
let aiSummaryData = [];

// 评价筛选条件
let currentReviewSearchKeyword = '';
let currentReviewStatusFilter = 'all';
let currentReviewRatingFilter = 'all';
let currentReviewPage = 1;
const reviewPageSize = 10;
let currentSummaryState = '';
let currentSummaryPage = 1;
const summaryPageSize = 10;

function reviewListQuery() {
    return {
        page: currentReviewPage,
        size: reviewPageSize,
        keyword: currentReviewSearchKeyword,
        // 后端review_type: "好评"、"差评"
        review_type: currentReviewRatingFilter === 'good' ? '好评' : currentReviewRatingFilter === 'bad' ? '差评' : '',
        // 后端status: "待审核"、"显示"、"已拒绝"、"隐藏"
        status: currentReviewStatusFilter === 'pending' ? '待审核' : currentReviewStatusFilter === 'approved' ? '显示' : currentReviewStatusFilter === 'rejected' ? '已拒绝' : currentReviewStatusFilter === 'hidden' ? '隐藏' : '',
        start_date: '',
        end_date: ''
    };
}

// 获取评价状态标签HTML
function getStatusBadge(status) {
    const colors = { approved: 'green', pending: 'yellow', rejected: 'red', hidden: 'gray' };
    const texts = { approved: '显示', pending: '待审核', rejected: '已拒绝', hidden: '隐藏' };
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

function normalizeReview(item) {
    // 后端status是中文字符串："待审核"、"显示"、"已拒绝"、"隐藏"
    let status;
    switch (item.status) {
        case '待审核': status = 'pending'; break;
        case '显示': status = 'approved'; break;
        case '已拒绝': status = 'rejected'; break;
        case '隐藏': status = 'hidden'; break;
        default: status = 'hidden';
    }
    
    // review_type是中文："好评"、"中评"、"差评"
    let rating = 0;
    switch (item.review_type) {
        case '好评': rating = 5; break;
        case '中评': rating = 3; break;
        case '差评': rating = 1; break;
        default: rating = Number(item.rating || item.score || 0);
    }
    
    return {
        id: item.id,
        goodsId: item.product_id || '',
        goodsName: item.product_name || '',
        userId: item.user_id || '',
        userName: item.user_nickname || '',
        phone: item.user_phone || '',
        rating: rating,
        content: item.content || '',
        images: item.images || [],
        likes: item.likes || 0,
        status: status,
        createTime: item.created_at || '',
        reply: null,
        replies: []
    };
}

// 加载评价列表
async function loadReviews() {
    try {
        const response = await apiGet(API_CONFIG.reviews.list, reviewListQuery());
        const dataList = Array.isArray(response)
            ? response
            : response?.list ?? response?.items ?? response?.records ?? response?.reviews ?? [];
        reviewsData = dataList.map(normalizeReview);
        refreshReviewsPage();
    } catch (error) {
        console.error('Failed to load reviews:', error);
    }
}

// 加载AI评价总结列表
async function loadSummaries() {
    try {
        const params = { page: currentSummaryPage, size: summaryPageSize };
        if (currentSummaryState !== '') params.state = currentSummaryState;
        const response = await apiGet(API_CONFIG.reviews.summaries, params);
        const dataList = Array.isArray(response)
            ? response
            : response?.list ?? response?.items ?? response?.records ?? response?.ai_list ?? response?.summaries ?? [];
        if (dataList.length) {
            aiSummaryData = dataList.map(item => {
                const rawStatus = item.state ?? item.status;
                let status;
                switch (rawStatus) {
                    case '待审核': case 0: status = 'pending'; break;
                    case '已发布': case 1: status = 'approved'; break;
                    case '已拒绝': case 2: status = 'rejected'; break;
                    default: status = 'pending';
                }
                return {
                    id: item.ID || item.id,
                    goodsId: item.productId || item.product_id || item.goodsId || item.product?.id || '',
                    goodsName: item.productName || item.product_name || item.goodsName || item.product?.name || '',
                    content: item.summary || item.summary_content || item.content || '',
                    reviewCount: item.reviewCount || item.review_count || 0,
                    status: status,
                    createTime: item.createdAt || item.created_at || item.CreatedAt || '',
                    updateTime: item.updatedAt || item.updated_at || item.updateTime || ''
                };
            });
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
        currentReviewPage = 1;
        loadReviews();
    }
}

function switchReviewStatus(status) {
    currentReviewStatusFilter = status;
    currentReviewPage = 1;
    loadReviews();
}

function switchReviewRating(rating) {
    currentReviewRatingFilter = rating;
    currentReviewPage = 1;
    loadReviews();
}

async function handleReviewAction(reviewId, action) {
    const review = reviewsData.find(r => String(r.id) === String(reviewId));
    if (!review) return;
    
    try {
        if (action === 'approve') {
            await apiPost(API_CONFIG.reviews.audit, { id: Number(reviewId), status: '显示' });
            review.status = 'approved';
        } else if (action === 'reject') {
            await apiPost(API_CONFIG.reviews.audit, { id: Number(reviewId), status: '已拒绝' });
            review.status = 'rejected';
        } else if (action === 'toggle') {
            if (review.status === 'approved') {
                await apiPost(API_CONFIG.reviews.hide, { id: Number(reviewId) });
                review.status = 'hidden';
            } else if (review.status === 'hidden' || review.status === 'rejected') {
                await apiPost(API_CONFIG.reviews.hide, { id: Number(reviewId) });
                review.status = 'approved';
            } else if (review.status === 'pending') {
                await apiPost(API_CONFIG.reviews.audit, { id: Number(reviewId), status: '显示' });
                review.status = 'approved';
            }
        }
        refreshReviewsPage();
        updateReviewModal(review);
    } catch (error) {
        console.error('Failed to handle review action:', error);
        showToast('操作失败，请重试', 'error');
    }
}

function updateReviewModal(review) {
    const footer = document.getElementById(`review-modal-footer-${review.id}`);
    if (!footer) return;
    const badgeHtml = getStatusBadge(review.status);
    const h3 = document.querySelector('.modal-header h3');
    if (h3) {
        h3.innerHTML = `<i class="fas fa-star"></i> 评价详情 ${badgeHtml}`;
    }
    const footerHtml = review.status === 'pending'
        ? `<button class="btn btn-success" onclick="handleReviewAction('${review.id}', 'approve')"><i class="fas fa-check"></i> 通过</button>
           <button class="btn btn-danger" onclick="handleReviewAction('${review.id}', 'reject')"><i class="fas fa-times"></i> 拒绝</button>`
        : `<button class="btn btn-outline" onclick="handleReviewAction('${review.id}', 'toggle')"><i class="fas fa-${review.status === 'approved' ? 'eye-slash' : 'eye'}"></i> ${review.status === 'approved' ? '隐藏' : '显示'}</button>`;
    footer.innerHTML = footerHtml + `<button class="btn btn-outline" onclick="closeReviewModal()">关闭</button>`;
}

async function handleSummaryAction(summaryId, action) {
    const summary = aiSummaryData.find(s => String(s.id) === String(summaryId));
    if (!summary) return;
    
    try {
        if (action === 'approve') {
            await apiPost(API_CONFIG.reviews.auditSummary, { id: Number(summaryId), action: 0 });
            summary.status = 'approved';
            summary.updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
            showToast('AI评价摘要已发布！', 'success');
            refreshReviewsPage();
        } else if (action === 'reject') {
            showConfirm('确定删除此 AI 摘要吗？', async function() {
                try {
                    await apiPost(API_CONFIG.reviews.auditSummary, { id: Number(summaryId), action: 1 });
                    aiSummaryData = aiSummaryData.filter(item => String(item.id) !== String(summaryId));
                    showToast('AI评价摘要已删除！', 'success');
                    refreshReviewsPage();
                } catch (error) {
                    console.error('Failed to delete summary:', error);
                    showToast(error instanceof Error ? error.message : '删除 AI 摘要失败，请重试', 'error');
                }
            });
        }
    } catch (error) {
        console.error('Failed to handle summary action:', error);
        showToast('操作失败，请重试', 'error');
    }
}

async function showReviewDetail(reviewId) {
    let review = reviewsData.find(r => String(r.id) === String(reviewId));
    if (!review) return;

    try {
        const response = await apiGet(API_CONFIG.reviews.detail, { id: Number(reviewId) });
        const detail = response?.review ?? response?.detail ?? response;
        if (detail && typeof detail === 'object') {
            review = normalizeReview({ ...review, ...detail });
            const index = reviewsData.findIndex(r => String(r.id) === String(reviewId));
            if (index >= 0) reviewsData[index] = review;
        }
    } catch (error) {
        console.error('Failed to load review detail:', error);
        showToast(error instanceof Error ? error.message : '评价详情加载失败，请重试', 'error');
        return;
    }
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeReviewModal()"></div>
        <div class="modal-content" style="width:900px;">
            <div class="modal-header">
                <h3><i class="fas fa-star"></i> 评价详情 ${getStatusBadge(review.status)}</h3>
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
            <div class="modal-footer" id="review-modal-footer-${review.id}">
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
        await apiPost(API_CONFIG.reviews.reply, { id: Number(reviewId), content });
        const review = reviewsData.find(r => String(r.id) === String(reviewId));
        if (review) {
            review.reply = {
                content: content,
                time: new Date().toISOString().replace('T', ' ').substring(0, 19)
            };
        }
        showToast('回复成功！', 'success');
        closeReviewModal();
        refreshReviewsPage();
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
    showConfirm('确定删除此用户回复吗？', async function() {
        try {
            await apiPost(API_CONFIG.reviews.deleteReply, { id: Number(replyId) });
            const review = reviewsData.find(r => String(r.id) === String(reviewId));
            if (review && review.replies) {
                review.replies = review.replies.filter(r => String(r.id) !== String(replyId));
            }
            showToast('用户回复已删除！', 'success');
            closeReviewModal();
            refreshReviewsPage();
        } catch (error) {
            console.error('Failed to delete user reply:', error);
            showToast(error instanceof Error ? error.message : '删除用户回复失败，请重试', 'error');
        }
    });
}

async function editSummary(summaryId) {
    const summary = aiSummaryData.find(item => String(item.id) === String(summaryId));
    if (!summary) return;

    const content = prompt('请输入编辑后的 AI 摘要内容', summary.content);
    if (content === null) return;
    const normalizedContent = content.trim();
    if (!normalizedContent) {
        showToast('摘要内容不能为空', 'error');
        return;
    }

    try {
        await apiPost(API_CONFIG.reviews.editSummary, { id: Number(summaryId), content: normalizedContent });
        summary.content = normalizedContent;
        summary.updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        showToast('AI评价摘要已更新！', 'success');
        refreshReviewsPage();
    } catch (error) {
        console.error('Failed to edit summary:', error);
        showToast(error instanceof Error ? error.message : '编辑 AI 摘要失败，请重试', 'error');
    }
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
    const rejectedCount = reviewsData.filter(r => r.status === 'rejected').length;
    const hiddenCount = reviewsData.filter(r => r.status === 'hidden').length;
    const goodCount = reviewsData.filter(r => r.rating >= 4).length;
    const badCount = reviewsData.filter(r => r.rating < 3).length;
    const filteredReviews = filterReviews();
    
    return `
        
        
        <div class="trade-stat-grid">
            <div class="stat-card"><div class="label"><i class="fas fa-thumbs-up"></i> 好评</div><div class="value green">${goodCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-thumbs-down"></i> 差评</div><div class="value red">${badCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待审核</div><div class="value yellow">${pendingCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-ban"></i> 已拒绝</div><div class="value red">${rejectedCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-trash"></i> 已隐藏</div><div class="value gray">${hiddenCount}</div></div>
        </div>

        <div class="search-bar" style="margin:12px 0;">
            <input id="reviewSearchInput" placeholder="商品名称 / 用户" onkeypress="if(event.key==='Enter') searchReviews()" />
            <select onchange="switchReviewStatus(this.value)">
                <option value="all" ${currentReviewStatusFilter === 'all' ? 'selected' : ''}>全部状态</option>
                <option value="pending" ${currentReviewStatusFilter === 'pending' ? 'selected' : ''}>待审核</option>
                <option value="approved" ${currentReviewStatusFilter === 'approved' ? 'selected' : ''}>显示</option>
                <option value="rejected" ${currentReviewStatusFilter === 'rejected' ? 'selected' : ''}>已拒绝</option>
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
                                            <button class="btn btn-sm btn-outline" onclick="handleReviewAction('${review.id}', 'toggle')"><i class="fas fa-${review.status === 'approved' ? 'eye-slash' : 'eye'}"></i> ${review.status === 'approved' ? '隐藏' : '显示'}</button>
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
                                            <button class="btn btn-sm btn-danger" onclick="handleSummaryAction('${summary.id}', 'reject')"><i class="fas fa-trash"></i> 删除</button>
                                            <button class="btn btn-sm btn-outline" onclick="editSummary('${summary.id}')"><i class="fas fa-edit"></i> 编辑</button>
                                            ` : summary.status === 'approved' ? `
                                            <button class="btn btn-sm btn-outline" onclick="editSummary('${summary.id}')"><i class="fas fa-edit"></i> 编辑</button>
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
