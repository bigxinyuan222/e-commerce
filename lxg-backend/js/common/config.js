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

const ACCOUNTS = [
    { username: 'admin', password: 'admin123', name: '超级管理员', role: 'super_admin' },
    { username: 'goods_op', password: 'goods123', name: '商品运营', role: 'goods_op' },
    { username: 'order_cs', password: 'order123', name: '订单客服', role: 'order_cs' },
    { username: 'store_staff', password: 'store123', name: '门店店员', role: 'store_staff', storeId: 'store-001', storeName: '北京朝阳店' }
];

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
        <div class="modal-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:2000;display:flex;align-items:center;justify-content:center;" onclick="closeConfirm()"></div>
        <div class="modal-content" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:12px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);display:flex;flex-direction:column;z-index:2001;width:420px;overflow:hidden;">
            <div class="modal-header" style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
                <h3 style="font-size:16px;font-weight:600;color:#1e293b;margin:0;"><i class="fas fa-exclamation-circle" style="color:#f59e0b;margin-right:8px;"></i> 确认操作</h3>
                <button onclick="closeConfirm()" class="modal-close" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;padding:4px;"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="padding:24px;">
                <p style="font-size:14px;color:#475569;line-height:1.6;margin:0;">${message}</p>
            </div>
            <div class="modal-footer" style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:10px;">
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