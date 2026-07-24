// 系统菜单配置列表
const MENUS = [
    { label: '数据统计', icon: 'fas fa-chart-pie', id: 'stats' },           // 数据统计页面
    { label: '商品管理', icon: 'fas fa-box', id: 'goods' },                  // 商品管理页面
    { label: '库存管理', icon: 'fas fa-warehouse', id: 'stock' },            // 库存管理页面
    { label: '评价管理', icon: 'fas fa-star', id: 'reviews' },               // 评价管理页面
    { label: '优惠券管理', icon: 'fas fa-ticket-alt', id: 'coupons' },       // 优惠券管理页面
    { label: '营销活动', icon: 'fas fa-bullhorn', id: 'marketing' },         // 营销活动页面
    { label: '订单管理', icon: 'fas fa-shopping-bag', id: 'orders' },         // 订单管理页面
    { label: '客服消息', icon: 'fas fa-headset', id: 'service' },             // 客服消息页面
    { label: '门店总览', icon: 'fas fa-store-alt', id: 'stores' },            // 门店总览页面
    { label: '退货退款', icon: 'fas fa-undo-alt', id: 'returns' },            // 退货退款页面
    { label: '用户管理', icon: 'fas fa-users', id: 'users' },                 // 用户管理页面
    { label: '管理员管理', icon: 'fas fa-user-shield', id: 'admin' },         // 管理员管理页面
    { label: '首页管理', icon: 'fas fa-home', id: 'homepage' },               // 首页管理页面
    { label: '系统通知', icon: 'fas fa-bullhorn', id: 'notification' },       // 系统通知页面
    { label: '支付管理', icon: 'fas fa-credit-card', id: 'payment' },         // 支付管理页面
    { label: '系统设置', icon: 'fas fa-cog', id: 'settings' }                 // 系统设置页面
];

// 菜单分组配置（按业务模块划分）
const MENU_GROUPS = [
    { label: '商品运营', start: 0, end: 6 },    // 商品相关菜单组
    { label: '订单客服', start: 6, end: 8 },    // 订单和客服菜单组
    { label: '门店管理', start: 8, end: 10 },   // 门店管理菜单组
    { label: '系统管理', start: 10, end: 16 }   // 系统管理菜单组
];

// 角色权限配置
const ROLES = {
    super_admin: { name: '超级管理员', menus: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing', 'orders', 'service', 'stores', 'returns', 'users', 'admin', 'homepage', 'payment', 'notification', 'settings'] },
    admin: { name: '超级管理员', menus: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing', 'orders', 'service', 'stores', 'returns', 'users', 'admin', 'homepage', 'payment', 'notification', 'settings'] },
    user: { name: '普通用户', menus: ['stats', 'orders', 'service'] },           // 仅查看统计、订单和客服
    goods_op: { name: '商品运营', menus: ['stats', 'goods', 'stock', 'reviews', 'coupons', 'marketing'] }, // 商品相关权限
    order_cs: { name: '订单客服', menus: ['orders', 'service'] },                // 仅订单和客服权限
    store_staff: { name: '门店店员', menus: ['stores', 'returns'] }              // 仅门店和退货权限
};

// 系统级菜单（需特殊权限）
const SYSTEM_MENUS = ['users', 'admin', 'homepage', 'payment', 'notification', 'settings'];



// 从本地存储加载用户信息
function loadUserFromStorage() {
    const saved = localStorage.getItem('lexiangou_admin_user');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return null;  // 解析失败返回null
        }
    }
    return null;
}

// 保存用户信息到本地存储
function saveUserToStorage(user) {
    localStorage.setItem('lexiangou_admin_user', JSON.stringify(user));
}

// 清除本地存储中的用户信息
function clearUserFromStorage() {
    localStorage.removeItem('lexiangou_admin_user');
}

// 加载已保存的用户信息
const savedUser = loadUserFromStorage();
// 当前登录用户对象（默认超级管理员）
let currentUser = savedUser || {
    name: '超级管理员',
    role: 'super_admin',
    storeId: null,
    storeName: null,
    token: ''
};

// 检查用户是否有权限访问指定菜单
function hasPermission(menuId) {
    const role = ROLES[currentUser.role];
    return role && role.menus.includes(menuId);
}

// 显示确认对话框
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
    
    // 注册确认回调函数
    window.confirmCallback = function(result) {
        if (result && onConfirm) {
            onConfirm();
        }
        window.confirmCallback = null;
    };
}

// 关闭确认对话框
function closeConfirm() {
    const overlay = document.querySelector('.modal-overlay');
    const content = document.querySelector('.modal-content');
    if (overlay) overlay.remove();
    if (content) content.remove();
    // 触发取消回调
    if (window.confirmCallback) {
        window.confirmCallback(false);
    }
    window.confirmCallback = null;
}