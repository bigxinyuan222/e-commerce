let reviewsData = [
    { id: 'review-001', goodsId: 'goods-001', goodsName: '无线蓝牙耳机 Pro', userId: 'user-001', userName: '赵*阳', phone: '138****8888', rating: 5, content: '音质非常好，降噪效果很棒！物流也很快，非常满意的一次购物。', images: [], likes: 28, status: 'approved', createTime: '2026-06-24 14:30', reply: null, replies: [{ id: 'r-001', userName: '王*明', content: '确实不错，我也买了一个', time: '2026-06-24 15:00', likes: 5 }] },
    { id: 'review-002', goodsId: 'goods-002', goodsName: '智能手表 S8', userId: 'user-002', userName: '孙*怡', phone: '139****6666', rating: 4, content: '功能丰富，续航还可以提升。整体体验不错，推荐购买。', images: [], likes: 15, status: 'pending', createTime: '2026-06-24 11:20', reply: null, replies: [] },
    { id: 'review-003', goodsId: 'goods-003', goodsName: '便携移动电源', userId: 'user-003', userName: '张*婷', phone: '137****9999', rating: 5, content: '容量大，充电速度快，携带方便。性价比很高！', images: [], likes: 42, status: 'approved', createTime: '2026-06-23 16:45', reply: { content: '感谢您的好评！', time: '2026-06-23 17:00' }, replies: [{ id: 'r-002', userName: '李*华', content: '请问支持快充吗？', time: '2026-06-23 18:00', likes: 2 }, { id: 'r-003', userName: '张*婷', content: '支持的，最高支持20W快充', time: '2026-06-23 18:30', likes: 8 }] },
    { id: 'review-004', goodsId: 'goods-004', goodsName: '智能台灯 Pro', userId: 'user-004', userName: '刘*芳', phone: '135****7777', rating: 3, content: '灯光效果不错，但底座有点不稳，希望改进。', images: [], likes: 8, status: 'pending', createTime: '2026-06-23 14:10', reply: null, replies: [] },
    { id: 'review-005', goodsId: 'goods-001', goodsName: '无线蓝牙耳机 Pro', userId: 'user-005', userName: '陈*伟', phone: '136****5555', rating: 5, content: '第二次购买了，送给朋友的，质量很好，包装精美。', images: [], likes: 35, status: 'approved', createTime: '2026-06-22 09:30', reply: { content: '感谢您的支持！', time: '2026-06-22 10:00' }, replies: [] },
    { id: 'review-006', goodsId: 'goods-002', goodsName: '智能手表 S8', userId: 'user-006', userName: '周*杰', phone: '137****3333', rating: 2, content: '续航太差了，一天都撑不到，不推荐购买！', images: [], likes: 5, status: 'approved', createTime: '2026-06-21 16:45', reply: { content: '抱歉给您带来不好的体验，我们会持续优化产品。', time: '2026-06-21 17:00' }, replies: [] },
    { id: 'review-007', goodsId: 'goods-005', goodsName: '运动蓝牙耳机', userId: 'user-007', userName: '吴*凡', phone: '136****4444', rating: 5, content: '跑步时戴着很稳，音质也不错，值得购买！', images: [], likes: 22, status: 'approved', createTime: '2026-06-20 10:20', reply: null, replies: [{ id: 'r-004', userName: '郑*爽', content: '防水吗？', time: '2026-06-20 11:00', likes: 3 }] },
    { id: 'review-008', goodsId: 'goods-006', goodsName: '美妆护肤套装', userId: 'user-008', userName: '郑*爽', phone: '135****5555', rating: 4, content: '包装精美，使用效果不错，就是价格有点贵。', images: [], likes: 18, status: 'pending', createTime: '2026-06-19 09:30', reply: null, replies: [] }
];

let aiSummaryData = [
    { id: 'summary-001', goodsId: 'goods-001', goodsName: '无线蓝牙耳机 Pro', content: '用户普遍认为产品性价比高，音质和外观设计获得好评，部分用户建议优化续航和软件体验。', reviewCount: 326, status: 'approved', createTime: '2026-06-24 10:00', updateTime: '2026-06-24 10:00' },
    { id: 'summary-002', goodsId: 'goods-002', goodsName: '智能手表 S8', content: '功能丰富、屏幕显示效果好，是用户的主要好评点；续航能力和价格是主要关注点，部分用户希望价格更亲民。', reviewCount: 185, status: 'pending', createTime: '2026-06-24 09:00', updateTime: '2026-06-24 09:00' },
    { id: 'summary-003', goodsId: 'goods-003', goodsName: '便携移动电源', content: '容量大、充电速度快是主要优势，用户反馈整体满意，推荐购买。', reviewCount: 245, status: 'approved', createTime: '2026-06-23 16:00', updateTime: '2026-06-23 16:00' },
    { id: 'summary-004', goodsId: 'goods-004', goodsName: '智能台灯 Pro', content: '灯光效果出色，但底座稳定性有待提升。', reviewCount: 89, status: 'pending', createTime: '2026-06-23 14:00', updateTime: '2026-06-23 14:00' }
];

let currentReviewSearchKeyword = '';
let currentReviewStatusFilter = 'all';
let currentReviewRatingFilter = 'all';

function getStatusBadge(status) {
    const colors = { approved: 'green', pending: 'yellow', hidden: 'gray' };
    const texts = { approved: '显示', pending: '待审核', hidden: '隐藏' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function getSummaryStatusBadge(status) {
    const colors = { approved: 'green', pending: 'yellow', rejected: 'red' };
    const texts = { approved: '已发布', pending: '待审核', rejected: '已拒绝' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function getRatingText(rating) {
    if (rating >= 4) {
        return `<span class="status-badge green"><span class="dot"></span> 好评</span>`;
    } else if (rating >= 3) {
        return `<span class="status-badge yellow"><span class="dot"></span> 中评</span>`;
    } else {
        return `<span class="status-badge red"><span class="dot"></span> 差评</span>`;
    }
}

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

function handleReviewAction(reviewId, action) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    if (action === 'approve') {
        review.status = 'approved';
    } else if (action === 'reject') {
        review.status = 'hidden';
    } else if (action === 'toggle') {
        review.status = review.status === 'approved' ? 'hidden' : 'approved';
    }
    
    refreshReviewsPage();
}

function handleSummaryAction(summaryId, action) {
    const summary = aiSummaryData.find(s => s.id === summaryId);
    if (!summary) return;
    
    if (action === 'approve') {
        summary.status = 'approved';
        summary.updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        alert('AI评价摘要已发布！');
    } else if (action === 'reject') {
        showConfirm('确定拒绝此摘要并重新生成吗？', function() {
            summary.status = 'rejected';
            summary.content = 'AI重新生成中...';
            setTimeout(() => {
                summary.content = '用户反馈产品质量优秀，性价比高，物流速度快，整体购物体验良好。';
                summary.status = 'pending';
                summary.updateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
                alert('AI评价摘要已重新生成！');
                refreshReviewsPage();
            }, 1000);
        });
    }
}

function showReviewDetail(reviewId) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeReviewModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:900px;">
            <div class="modal-header">
                <h3><i class="fas fa-star"></i> 评价详情</h3>
                <button onclick="closeReviewModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
                    <div style="grid-column:span 1;">
                        <div style="font-weight:600;font-size:14px;margin-bottom:12px;">评价原文</div>
                        <div style="background:#f8fafc;border-radius:8px;padding:16px;">
                            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                                <div style="width:40px;height:40px;background:#4f6ef7;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;">${review.userName.charAt(0)}</div>
                                <div>
                                    <div style="font-weight:600;">${review.userName}</div>
                                    <div style="font-size:12px;color:#94a3b8;">${review.phone}</div>
                                </div>
                            </div>
                            <div style="margin-bottom:8px;">${getRatingStars(review.rating)}</div>
                            <div style="font-size:13px;line-height:1.6;">${review.content}</div>
                            <div style="margin-top:12px;display:flex;align-items:center;gap:16px;">
                                <div style="display:flex;align-items:center;gap:4px;">
                                    <i class="fas fa-thumbs-up" style="color:#94a3b8;"></i>
                                    <span style="font-size:12px;">${review.likes}</span>
                                </div>
                                <div style="font-size:12px;color:#94a3b8;">${review.createTime}</div>
                            </div>
                            ${review.images && review.images.length > 0 ? `
                            <div style="margin-top:12px;">
                                <div style="font-size:12px;color:#64748b;margin-bottom:8px;">晒图</div>
                                <div style="display:flex;gap:8px;">
                                    ${review.images.map((img, i) => `<div style="width:80px;height:80px;background:#e2e8f0;border-radius:6px;cursor:pointer;" onclick="previewImage(${i})"></div>`).join('')}
                                </div>
                            </div>` : ''}
                        </div>
                    </div>
                    
                    <div style="grid-column:span 1;">
                        <div style="font-weight:600;font-size:14px;margin-bottom:12px;">管理员回复</div>
                        <div style="background:#f8fafc;border-radius:8px;padding:16px;">
                            ${review.reply ? `
                            <div style="margin-bottom:12px;">
                                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                                    <div style="width:32px;height:32px;background:#22c55e;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:12px;">管</div>
                                    <div>
                                        <div style="font-weight:600;font-size:13px;">管理员</div>
                                        <div style="font-size:12px;color:#94a3b8;">${review.reply.time}</div>
                                    </div>
                                </div>
                                <div style="font-size:13px;line-height:1.6;padding-left:40px;">${review.reply.content}</div>
                            </div>
                            <div style="padding-left:40px;display:flex;gap:8px;">
                                <button class="btn btn-sm btn-outline" onclick="editReply('${review.id}')"><i class="fas fa-edit"></i> 编辑</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteReply('${review.id}')"><i class="fas fa-trash"></i> 删除</button>
                            </div>
                            ` : `
                            <div style="text-align:center;padding:20px;">
                                <div style="font-size:32px;color:#cbd5e1;margin-bottom:8px;"><i class="fas fa-comment"></i></div>
                                <div style="font-size:13px;color:#94a3b8;margin-bottom:12px;">暂无管理员回复</div>
                                <button class="btn btn-sm btn-primary" onclick="showReplyInput('${review.id}')"><i class="fas fa-plus"></i> 添加回复</button>
                            </div>
                            `}
                        </div>
                        <div id="replyInputArea-${review.id}" style="display:none;margin-top:12px;">
                            <textarea id="replyContent-${review.id}" rows="3" placeholder="请输入回复内容..." style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'"></textarea>
                            <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
                                <button class="btn btn-sm btn-outline" onclick="hideReplyInput('${review.id}')">取消</button>
                                <button class="btn btn-sm btn-primary" onclick="submitReply('${review.id}')"><i class="fas fa-send"></i> 发送</button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="grid-column:span 1;">
                        <div style="font-weight:600;font-size:14px;margin-bottom:12px;">用户回复</div>
                        <div style="background:#f8fafc;border-radius:8px;padding:16px;max-height:300px;overflow-y:auto;">
                            ${review.replies && review.replies.length > 0 ? `
                            <div style="display:flex;flex-direction:column;gap:12px;">
                                ${review.replies.map(reply => `
                                    <div>
                                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                                            <div style="width:28px;height:28px;background:#8b5cf6;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:11px;">${reply.userName.charAt(0)}</div>
                                            <div>
                                                <div style="font-weight:600;font-size:13px;">${reply.userName}</div>
                                                <div style="font-size:12px;color:#94a3b8;">${reply.time}</div>
                                            </div>
                                        </div>
                                        <div style="font-size:13px;padding-left:36px;line-height:1.5;">${reply.content}</div>
                                        <div style="padding-left:36px;display:flex;align-items:center;gap:8px;margin-top:4px;">
                                            <div style="display:flex;align-items:center;gap:2px;font-size:12px;color:#94a3b8;">
                                                <i class="fas fa-thumbs-up"></i> ${reply.likes}
                                            </div>
                                            <button class="btn btn-sm btn-danger" onclick="deleteUserReply('${review.id}', '${reply.id}')" style="font-size:11px;padding:2px 6px;"><i class="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            ` : `
                            <div style="text-align:center;padding:20px;">
                                <div style="font-size:32px;color:#cbd5e1;margin-bottom:8px;"><i class="fas fa-comments"></i></div>
                                <div style="font-size:13px;color:#94a3b8;">暂无用户回复</div>
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

function submitReply(reviewId) {
    const content = document.getElementById(`replyContent-${reviewId}`).value.trim();
    if (!content) {
        alert('请输入回复内容');
        return;
    }
    
    const review = reviewsData.find(r => r.id === reviewId);
    if (review) {
        review.reply = {
            content: content,
            time: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        alert('回复成功！');
        closeReviewModal();
        refreshReviewsPage();
    }
}

function editReply(reviewId) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review || !review.reply) return;
    
    const content = prompt('请输入新的回复内容:', review.reply.content);
    if (content !== null) {
        review.reply.content = content;
        review.reply.time = new Date().toISOString().replace('T', ' ').substring(0, 19);
        alert('回复已更新！');
        closeReviewModal();
        refreshReviewsPage();
    }
}

function deleteReply(reviewId) {
    showConfirm('确定删除管理员回复吗？', function() {
        const review = reviewsData.find(r => r.id === reviewId);
        if (review) {
            review.reply = null;
            alert('回复已删除！');
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
                alert('回复已处理！');
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
        <style>
            .modal-overlay { position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center; }
            .modal-content { background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden; }
            .modal-header { padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between; }
            .modal-header h3 { margin:0;font-size:16px;font-weight:600; }
            .modal-close { background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;padding:4px; }
            .modal-body { padding:16px 20px; }
            .modal-footer { padding:12px 20px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:8px; }
        </style>
        
        <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);">
            <div class="stat-card"><div class="label"><i class="fas fa-thumbs-up"></i> 好评</div><div class="value" style="font-size:22px;color:#22c55e;">${goodCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-thumbs-down"></i> 差评</div><div class="value" style="font-size:22px;color:#ef4444;">${badCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待审核</div><div class="value" style="font-size:22px;color:#f59e0b;">${pendingCount}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-trash"></i> 已隐藏</div><div class="value" style="font-size:22px;color:#64748b;">${hiddenCount}</div></div>
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