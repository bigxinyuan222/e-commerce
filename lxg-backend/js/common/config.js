const MENUS = [
    { label: '数据统计', icon: 'fas fa-chart-pie', id: 'stats' },
    { label: '商品管理', icon: 'fas fa-box', id: 'goods' },
    { label: '库存管理', icon: 'fas fa-warehouse', id: 'stock' },
    { label: '评价管理', icon: 'fas fa-star', id: 'reviews' },
    { label: '优惠券管理', icon: 'fas fa-ticket-alt', id: 'coupons' },
    { label: '营销活动', icon: 'fas fa-bullhorn', id: 'marketing' },
    { label: '订单管理', icon: 'fas fa-shopping-bag', id: 'orders' },
    { label: '客服消息', icon: 'fas fa-headset', id: 'service' },
    { label: '门店总览', icon: 'fas fa-store-alt', id: 'stores' },
    { label: '退货退款', icon: 'fas fa-undo-alt', id: 'returns' },
    { label: '用户管理', icon: 'fas fa-users', id: 'users' },
    { label: '管理员管理', icon: 'fas fa-user-shield', id: 'admin' },
    { label: '首页管理', icon: 'fas fa-home', id: 'homepage' },
    { label: '系统通知', icon: 'fas fa-bullhorn', id: 'notification' },
    { label: '支付管理', icon: 'fas fa-credit-card', id: 'payment' },
    { label: '系统设置', icon: 'fas fa-cog', id: 'settings' }
];

const MENU_GROUPS = [
    { label: '商品运营', start: 0, end: 6 },
    { label: '订单客服', start: 6, end: 8 },
    { label: '门店管理', start: 8, end: 10 },
    { label: '系统管理', start: 10, end: 16 }
];

const ROLES = {
    super_admin: { name: '超级管理员', menus: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing', 'orders', 'service', 'stores', 'returns', 'users', 'admin', 'homepage', 'payment', 'notification', 'settings'] },
    goods_op: { name: '商品运营', menus: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing'] },
    order_cs: { name: '订单客服', menus: ['orders', 'service'] },
    store_staff: { name: '门店店员', menus: ['stores', 'returns'] }
};

const SYSTEM_MENUS = ['users', 'admin', 'homepage', 'payment', 'notification', 'settings'];



function loadUserFromStorage() {
    const saved = localStorage.getItem('lexiangou_admin_user');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return null;
        }
    }
    return null;
}

function saveUserToStorage(user) {
    localStorage.setItem('lexiangou_admin_user', JSON.stringify(user));
}

function clearUserFromStorage() {
    localStorage.removeItem('lexiangou_admin_user');
}

const savedUser = loadUserFromStorage();
let currentUser = savedUser || {
    name: '超级管理员',
    role: 'super_admin',
    storeId: null,
    storeName: null
};

function hasPermission(menuId) {
    const role = ROLES[currentUser.role];
    return role && role.menus.includes(menuId);
}

function showConfirm(message, onConfirm, onCancel) {
    const modalContent = `
        <div class="modal-overlay" onclick="closeConfirm()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-exclamation-circle"></i> 确认操作</h3>
                <button onclick="closeConfirm()" class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeConfirm()">取消</button>
                <button class="btn btn-primary" onclick="confirmCallback(true);closeConfirm();"><i class="fas fa-check"></i> 确认</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    window.confirmCallback = function(result) {
        if (result && onConfirm) {
            onConfirm();
        }
        window.confirmCallback = null;
    };
}

function closeConfirm() {
    const overlay = document.querySelector('.modal-overlay');
    const content = document.querySelector('.modal-content');
    if (overlay) overlay.remove();
    if (content) content.remove();
    if (window.confirmCallback) {
        window.confirmCallback(false);
    }
    window.confirmCallback = null;
}