let bannerData = [];
let recommendData = [];
let homepageGoodsData = [];

async function loadHomepageGoods() {
    try {
        const response = await apiGet(API_CONFIG.goods.list);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        homepageGoodsData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            price: item.originalPrice || item.price || 0,
            image: item.image || 'https://via.placeholder.com/100x100'
        }));
    } catch (error) {
        console.error('Failed to load goods for homepage:', error);
        homepageGoodsData = [];
    }
}

async function loadBanners() {
    try {
        const response = await apiGet(API_CONFIG.homepage.banners);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        bannerData = dataList.map(item => ({
            id: item.ID || item.id,
            image: item.image || '',
            title: item.title || '',
            linkType: item.linkType || 'none',
            link: item.link || '',
            sort: item.sort || 0,
            status: item.status === 1 ? 'active' : item.status === 0 ? 'draft' : 'pending',
            createTime: item.createdAt || item.createTime || ''
        }));
        bannerData.sort((a, b) => (a.sort || 0) - (b.sort || 0));
        refreshHomepagePage();
    } catch (error) {
        console.error('Failed to load banners:', error);
    }
}

async function loadRecommendations() {
    try {
        const response = await apiGet(API_CONFIG.homepage.recommendations);
        const dataList = response && response.list ? response.list : (Array.isArray(response) ? response : []);
        recommendData = dataList.map(item => ({
            id: item.ID || item.id,
            name: item.name || '',
            status: item.status === 1 ? 'active' : 'inactive',
            goods: (item.products || item.goods || []).map(g => g.productId || g.goodsId || g.id || ''),
            createTime: item.createdAt || item.createTime || ''
        }));
        refreshHomepagePage();
    } catch (error) {
        console.error('Failed to load recommendations:', error);
    }
}

function getStatusBadge(status) {
    const colors = { active: 'green', draft: 'gray', pending: 'yellow', inactive: 'gray' };
    const texts = { active: '已发布', draft: '草稿', pending: '待审核', inactive: '已下架' };
    const color = colors[status] || 'gray';
    return `<span class="status-badge ${color}"><span class="dot"></span> ${texts[status] || status}</span>`;
}

function getLinkTypeText(type) {
    const texts = { none: '无跳转', goods: '商品详情', activity: '活动页', category: '分类页', external: '外部链接' };
    return texts[type] || type;
}

async function handleBannerAction(bannerId, action) {
    const index = bannerData.findIndex(b => b.id === bannerId);
    if (index === -1) return;
    
    if (action === 'up') {
        if (index === 0) {
            alert('已经是第一个了');
            return;
        }
        const temp = bannerData[index];
        bannerData[index] = bannerData[index - 1];
        bannerData[index - 1] = temp;
        bannerData[index].sort = index + 1;
        bannerData[index - 1].sort = index;
        refreshHomepagePage();
    } else if (action === 'down') {
        if (index === bannerData.length - 1) {
            alert('已经是最后一个了');
            return;
        }
        const temp = bannerData[index];
        bannerData[index] = bannerData[index + 1];
        bannerData[index + 1] = temp;
        bannerData[index].sort = index + 1;
        bannerData[index + 1].sort = index + 2;
        refreshHomepagePage();
    } else if (action === 'publish') {
        try {
            await apiPut(API_CONFIG.homepage.toggleBanner, { status: 1 }, { id: bannerId });
            bannerData[index].status = 'active';
            alert('轮播图已发布！');
            refreshHomepagePage();
        } catch (error) {
            console.error('Failed to publish banner:', error);
            alert('操作失败，请重试');
        }
    } else if (action === 'unpublish') {
        try {
            await apiPut(API_CONFIG.homepage.toggleBanner, { status: 0 }, { id: bannerId });
            bannerData[index].status = 'draft';
            alert('轮播图已下架！');
            refreshHomepagePage();
        } catch (error) {
            console.error('Failed to unpublish banner:', error);
            alert('操作失败，请重试');
        }
    } else if (action === 'delete') {
        showConfirm('确定删除此轮播图吗？', async function() {
            try {
                await apiDelete(API_CONFIG.homepage.deleteBanner, {}, { id: bannerId });
                bannerData.splice(index, 1);
                bannerData.forEach((b, i) => b.sort = i + 1);
                alert('轮播图已删除！');
            } catch (error) {
                console.error('Failed to delete banner:', error);
                alert('操作失败，请重试');
            }
            refreshHomepagePage();
        });
    } else {
        refreshHomepagePage();
    }
}

async function handleRecommendAction(recId, action) {
    const rec = recommendData.find(r => r.id === recId);
    if (!rec) return;
    
    if (action === 'toggle') {
        try {
            const newStatus = rec.status === 'active' ? 0 : 1;
            await apiPut(API_CONFIG.homepage.editRecommendation, { status: newStatus }, { id: recId });
            rec.status = rec.status === 'active' ? 'inactive' : 'active';
            alert(`${rec.name}已${rec.status === 'active' ? '启用' : '禁用'}！`);
        } catch (error) {
            console.error('Failed to toggle recommendation:', error);
            alert('操作失败，请重试');
        }
        refreshHomepagePage();
    } else if (action === 'delete') {
        showConfirm(`确定删除推荐位 ${rec.name} 吗？`, async function() {
            try {
                await apiDelete(API_CONFIG.homepage.deleteRecommendation, {}, { id: recId });
                recommendData = recommendData.filter(r => r.id !== recId);
                alert('推荐位已删除！');
            } catch (error) {
                console.error('Failed to delete recommendation:', error);
                alert('操作失败，请重试');
            }
            refreshHomepagePage();
        });
    }
    
    refreshHomepagePage();
}

function showEditBannerModal(bannerId) {
    const banner = bannerData.find(b => b.id === bannerId);
    if (!banner) return;
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeHomepageModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑 Banner</h3>
                <button onclick="closeHomepageModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div style="grid-column:span 2;">
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">标题 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="bannerTitle" value="${banner.title}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div style="grid-column:span 2;">
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">图片地址</label>
                        <input type="text" id="bannerImage" value="${banner.image}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">链接类型</label>
                        <select id="bannerLinkType" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'">
                            <option value="none" ${banner.linkType === 'none' ? 'selected' : ''}>无跳转</option>
                            <option value="goods" ${banner.linkType === 'goods' ? 'selected' : ''}>商品详情</option>
                            <option value="activity" ${banner.linkType === 'activity' ? 'selected' : ''}>活动页</option>
                            <option value="category" ${banner.linkType === 'category' ? 'selected' : ''}>分类页</option>
                            <option value="external" ${banner.linkType === 'external' ? 'selected' : ''}>外部链接</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">链接地址</label>
                        <input type="text" id="bannerLink" value="${banner.link}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">排序权重</label>
                        <input type="number" id="bannerSort" value="${banner.sort}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">状态</label>
                        <select id="bannerStatus" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'">
                            <option value="draft" ${banner.status === 'draft' ? 'selected' : ''}>草稿</option>
                            <option value="active" ${banner.status === 'active' ? 'selected' : ''}>已发布</option>
                            <option value="pending" ${banner.status === 'pending' ? 'selected' : ''}>待审核</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeHomepageModal()">取消</button>
                <button class="btn btn-primary" onclick="saveBanner('${banner.id}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function showAddBannerModal() {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeHomepageModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:640px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增 Banner</h3>
                <button onclick="closeHomepageModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <div style="grid-column:span 2;">
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">标题 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="bannerTitle" placeholder="请输入轮播图标题" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div style="grid-column:span 2;">
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">图片地址</label>
                        <input type="text" id="bannerImage" placeholder="请输入图片URL" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">链接类型</label>
                        <select id="bannerLinkType" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'">
                            <option value="none">无跳转</option>
                            <option value="goods">商品详情</option>
                            <option value="activity">活动页</option>
                            <option value="category">分类页</option>
                            <option value="external">外部链接</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">链接地址</label>
                        <input type="text" id="bannerLink" placeholder="请输入链接地址" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">排序权重</label>
                        <input type="number" id="bannerSort" value="${bannerData.length + 1}" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">初始状态</label>
                        <select id="bannerStatus" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'">
                            <option value="draft">草稿</option>
                            <option value="active">已发布</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeHomepageModal()">取消</button>
                <button class="btn btn-primary" onclick="saveBanner()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

async function saveBanner(bannerId = null) {
    const title = document.getElementById('bannerTitle').value.trim();
    const image = document.getElementById('bannerImage').value.trim();
    const linkType = document.getElementById('bannerLinkType').value;
    const link = document.getElementById('bannerLink').value.trim();
    const sort = parseInt(document.getElementById('bannerSort').value) || bannerData.length + 1;
    const status = document.getElementById('bannerStatus').value;
    
    if (!title) {
        alert('请输入标题');
        return;
    }
    
    const data = {
        title: title,
        image: image,
        linkType: linkType,
        link: link,
        sort: sort,
        status: status === 'active' ? 1 : 0
    };
    
    try {
        if (bannerId) {
            await apiPut(API_CONFIG.homepage.editBanner, data, { id: bannerId });
            const banner = bannerData.find(b => b.id === bannerId);
            if (banner) {
                banner.title = title;
                banner.image = image;
                banner.linkType = linkType;
                banner.link = link;
                banner.sort = sort;
                banner.status = status;
            }
            alert('轮播图已更新！');
        } else {
            const response = await apiPost(API_CONFIG.homepage.addBanner, data);
            if (response && response.data) {
                bannerData.push({
                    id: response.data.ID || response.data.id,
                    image: image,
                    title: title,
                    linkType: linkType,
                    link: link,
                    sort: sort,
                    status: status,
                    createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
                });
            }
            alert('轮播图创建成功！');
        }
        
        bannerData.sort((a, b) => a.sort - b.sort);
        bannerData.forEach((b, i) => b.sort = i + 1);
        
        closeHomepageModal();
        refreshHomepagePage();
    } catch (error) {
        console.error('Failed to save banner:', error);
        alert('保存失败，请重试');
    }
}

function closeHomepageModal() {
    document.querySelectorAll('.modal-overlay, .modal-content').forEach(el => el.remove());
}

function showEditRecommendModal(recId) {
    const rec = recommendData.find(r => r.id === recId);
    if (!rec) return;
    
    const selectedGoods = homepageGoodsData.filter(g => rec.goods.includes(g.id));
    const availableGoods = homepageGoodsData.filter(g => !rec.goods.includes(g.id));
    
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeHomepageModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:700px;">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> 编辑推荐位 - ${rec.name}</h3>
                <button onclick="closeHomepageModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="margin-bottom:16px;">
                    <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">已选商品</div>
                    <div id="selectedGoodsList" style="display:flex;flex-wrap:wrap;gap:8px;">
                        ${selectedGoods.length > 0 ? selectedGoods.map(g => `
                            <div style="padding:8px 12px;border:1px solid #4f6ef7;border-radius:6px;background:#eef1ff;display:flex;align-items:center;gap:8px;">
                                <img src="${g.image}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;" />
                                <div>
                                    <div style="font-size:12px;font-weight:500;color:#1e293b;">${g.name}</div>
                                    <div style="font-size:11px;color:#4f6ef7;">¥${g.price}</div>
                                </div>
                                <button onclick="removeRecommendGood('${recId}', '${g.id}')" style="background:none;border:none;color:#ef4444;cursor:pointer;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `).join('') : '<div style="padding:16px;text-align:center;color:#94a3b8;font-size:13px;">暂无已选商品</div>'}
                    </div>
                </div>
                <div>
                    <div style="font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px;">可选商品</div>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
                        ${availableGoods.map(g => `
                            <div style="padding:8px;border:1px solid #e2e8f0;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;transition:0.2s;" 
                                 onmouseover="this.style.borderColor='#4f6ef7'" 
                                 onmouseout="this.style.borderColor='#e2e8f0'"
                                 onclick="addRecommendGood('${recId}', '${g.id}')">
                                <img src="${g.image}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;" />
                                <div>
                                    <div style="font-size:12px;color:#1e293b;">${g.name}</div>
                                    <div style="font-size:11px;color:#ef4444;">¥${g.price}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeHomepageModal()">取消</button>
                <button class="btn btn-primary" onclick="saveRecommendGoods('${recId}')"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function addRecommendGood(recId, goodsId) {
    const rec = recommendData.find(r => r.id === recId);
    if (rec && !rec.goods.includes(goodsId)) {
        rec.goods.push(goodsId);
        closeHomepageModal();
        showEditRecommendModal(recId);
    }
}

function removeRecommendGood(recId, goodsId) {
    const rec = recommendData.find(r => r.id === recId);
    if (rec) {
        rec.goods = rec.goods.filter(g => g !== goodsId);
        closeHomepageModal();
        showEditRecommendModal(recId);
    }
}

function saveRecommendGoods(recId) {
    const rec = recommendData.find(r => r.id === recId);
    if (rec) {
        alert(`推荐位 ${rec.name} 商品已更新！`);
        closeHomepageModal();
        refreshHomepagePage();
    }
}

function showAddRecommendModal() {
    const modalContent = `
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;" onclick="closeHomepageModal()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;max-height:80vh;overflow:hidden;z-index:1001;width:500px;">
            <div class="modal-header">
                <h3><i class="fas fa-plus"></i> 新增推荐位</h3>
                <button onclick="closeHomepageModal()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="max-height:60vh;overflow-y:auto;">
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">推荐位名称 <span style="color:#ef4444;">*</span></label>
                        <input type="text" id="recommendName" placeholder="请输入推荐位名称，如：首页-精选" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'" />
                    </div>
                    <div>
                        <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">初始状态</label>
                        <select id="recommendStatus" style="width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;outline:none;" onfocus="this.style.borderColor='#4f6ef7'">
                            <option value="active">启用</option>
                            <option value="inactive">禁用</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeHomepageModal()">取消</button>
                <button class="btn btn-primary" onclick="saveRecommend()"><i class="fas fa-save"></i> 保存</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

function saveRecommend() {
    const name = document.getElementById('recommendName').value.trim();
    const status = document.getElementById('recommendStatus').value;
    
    if (!name) {
        alert('请输入推荐位名称');
        return;
    }
    
    const exists = recommendData.find(r => r.name === name);
    if (exists) {
        alert('该推荐位名称已存在');
        return;
    }
    
    recommendData.push({
        id: 'rec-' + Date.now(),
        name: name,
        status: status,
        goods: [],
        createTime: new Date().toISOString().substring(0, 10)
    });
    
    alert('推荐位创建成功！');
    closeHomepageModal();
    refreshHomepagePage();
}

function refreshHomepagePage() {
    const panel = document.getElementById('panel-homepage');
    if (panel) panel.innerHTML = homepagePage();
}

function homepagePage() {
    const activeBanners = bannerData.filter(b => b.status === 'active').length;
    const draftBanners = bannerData.filter(b => b.status === 'draft').length;
    const activeRecommends = recommendData.filter(r => r.status === 'active').length;
    
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
        


        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px;">
            <div class="stat-card"><div class="label"><i class="fas fa-images"></i> 轮播图总数</div><div class="value" style="font-size:22px;">${bannerData.length}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-check-circle"></i> 已发布</div><div class="value" style="font-size:22px;color:#22c55e;">${activeBanners}</div></div>
            <div class="stat-card"><div class="label"><i class="fas fa-star"></i> 启用推荐位</div><div class="value" style="font-size:22px;color:#4f6ef7;">${activeRecommends}</div></div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:12px;">
            <div class="card">
                <div class="card-header">
                    <span class="card-title"><i class="fas fa-images"></i> 轮播图 / Banner</span>
                    <button class="btn btn-primary btn-sm" onclick="showAddBannerModal()"><i class="fas fa-plus"></i> 新增轮播图</button>
                </div>
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>排序</th><th>图片</th><th>标题</th><th>链接类型</th><th>链接地址</th><th>状态</th><th>操作</th></tr></thead>
                        <tbody>
                            ${bannerData.map(banner => `
                                <tr>
                                    <td style="font-weight:600;color:#64748b;">${banner.sort}</td>
                                    <td><img src="${banner.image}" alt="${banner.title}" style="width:80px;height:40px;border-radius:4px;object-fit:cover;" /></td>
                                    <td>${banner.title}</td>
                                    <td><span class="tag">${getLinkTypeText(banner.linkType)}</span></td>
                                    <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${banner.link || '-'}</td>
                                    <td>${getStatusBadge(banner.status)}</td>
                                    <td>
                                        <div style="display:flex;gap:4px;">
                                            <button class="btn btn-sm btn-outline" onclick="handleBannerAction('${banner.id}', 'up')" title="上移"><i class="fas fa-arrow-up"></i></button>
                                            <button class="btn btn-sm btn-outline" onclick="handleBannerAction('${banner.id}', 'down')" title="下移"><i class="fas fa-arrow-down"></i></button>
                                            <button class="btn btn-sm btn-outline" onclick="showEditBannerModal('${banner.id}')" title="编辑"><i class="fas fa-edit"></i></button>
                                            ${banner.status === 'active' ? `
                                            <button class="btn btn-sm btn-danger" onclick="handleBannerAction('${banner.id}', 'unpublish')" title="下架"><i class="fas fa-times"></i></button>
                                            ` : `
                                            <button class="btn btn-sm btn-success" onclick="handleBannerAction('${banner.id}', 'publish')" title="发布"><i class="fas fa-check"></i></button>
                                            `}
                                            <button class="btn btn-sm btn-danger" onclick="handleBannerAction('${banner.id}', 'delete')" title="删除"><i class="fas fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table></div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-cog"></i> Banner 设置</span></div>
                <div class="card-body">
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <div>
                            <label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">自动轮播间隔</label>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <input type="number" value="5" style="width:60px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" />
                                <span style="font-size:13px;">秒</span>
                            </div>
                        </div>
                        <div>
                            <label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;">
                                <input type="checkbox" checked /> 启用自动轮播
                            </label>
                        </div>
                        <div>
                            <label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;">
                                <input type="checkbox" checked /> 启用指示器
                            </label>
                        </div>
                        <div>
                            <label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;">
                                <input type="checkbox" /> 启用左右切换按钮
                            </label>
                        </div>
                        <button class="btn btn-sm btn-primary" style="margin-top:4px;">保存设置</button>
                    </div>
                </div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;">
            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-thumbtack"></i> 推荐位管理</span><button class="btn btn-primary btn-sm" onclick="showAddRecommendModal()"><i class="fas fa-plus"></i> 新增推荐</button></div>
                <div class="card-body no-pad">
                    <div class="table-wrap"><table>
                        <thead><tr><th>推荐位</th><th>商品数量</th><th>状态</th><th>创建时间</th><th>操作</th></tr></thead>
                        <tbody>
                            ${recommendData.map(rec => `
                                <tr>
                                    <td>${rec.name}</td>
                                    <td>${rec.goods.length} 件</td>
                                    <td>${getStatusBadge(rec.status)}</td>
                                    <td>${rec.createTime}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline" onclick="showEditRecommendModal('${rec.id}')"><i class="fas fa-edit"></i> 编辑商品</button>
                                        ${rec.status === 'active' ? `
                                        <button class="btn btn-sm btn-danger" onclick="handleRecommendAction('${rec.id}', 'toggle')"><i class="fas fa-times"></i> 禁用</button>
                                        ` : `
                                        <button class="btn btn-sm btn-success" onclick="handleRecommendAction('${rec.id}', 'toggle')"><i class="fas fa-check"></i> 启用</button>
                                        `}
                                        <button class="btn btn-sm btn-danger" onclick="handleRecommendAction('${rec.id}', 'delete')"><i class="fas fa-trash"></i> 删除</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table></div>
                </div>
            </div>

            <div class="card">
                <div class="card-header"><span class="card-title"><i class="fas fa-list"></i> 推荐位列表</span></div>
                <div class="card-body">
                    <div style="display:flex;flex-direction:column;gap:8px;">
                        ${recommendData.map(rec => `
                            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;background:${rec.status === 'active' ? '#f8fafc' : '#f1f5f9'};">
                                <span style="font-size:13px;">${rec.name}</span>
                                <span class="status-badge ${rec.status === 'active' ? 'green' : 'gray'}" style="font-size:11px;"><span class="dot"></span> ${rec.status === 'active' ? '启用' : '禁用'}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}