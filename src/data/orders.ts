// ============================================
// 订单数据
// ============================================

export interface OrderData {
  id: string;
  orderNo: string;
  status: string;
  statusText: string;
  createTime: string;
  totalAmount: number;
  freightAmount: number;
  couponAmount: number;
  payAmount: number;
  items: OrderItem[];
  address: {
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    detail: string;
  };
  store?: {
    name: string;
    phone: string;
    address: string;
    businessHours: string;
  };
  paymentMethod: string;
  payTime?: string;
  deliverTime?: string;
  completeTime?: string;
  cancelTime?: string;
  cancelReason?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  skuId: string;
  skuName: string;
  price: number;
  quantity: number;
  image: string;
}

// 默认订单数据
const defaultOrders: OrderData[] = [
  {
    id: 'order-1',
    orderNo: 'JD2024011500001',
    status: 'paid',
    statusText: '已支付',
    createTime: '2024-01-15 10:30:00',
    totalAmount: 10198,
    freightAmount: 0,
    couponAmount: 0,
    payAmount: 10198,
    items: [
      {
        id: 'item-1',
        productId: 'product-1',
        productName: 'iPhone 15 Pro Max 256GB 钛金属设计',
        skuId: 'sku-1-1',
        skuName: '钛金属原色 256GB',
        price: 9999,
        quantity: 1,
        image: 'https://picsum.photos/id/1/200/200'
      },
      {
        id: 'item-2',
        productId: 'product-3',
        productName: 'AirPods Pro (第二代)',
        skuId: 'sku-3-1',
        skuName: '配MagSafe充电盒',
        price: 1899,
        quantity: 1,
        image: 'https://picsum.photos/id/3/200/200'
      }
    ],
    address: {
      name: '张三',
      phone: '13812345678',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南区A1栋501室'
    },
    store: {
      name: '深圳南山科技园店',
      phone: '0755-12345678',
      address: '广东省深圳市南山区科技园南区A2栋1楼',
      businessHours: '09:00-22:00'
    },
    paymentMethod: 'wechat',
    payTime: '2024-01-15 10:35:00'
  },
  {
    id: 'order-2',
    orderNo: 'JD2024011400002',
    status: 'pending_payment',
    statusText: '待支付',
    createTime: '2024-01-14 15:20:00',
    totalAmount: 6999,
    freightAmount: 0,
    couponAmount: 100,
    payAmount: 6899,
    items: [
      {
        id: 'item-3',
        productId: 'product-2',
        productName: '华为 Mate 60 Pro 12GB+512GB',
        skuId: 'sku-2-1',
        skuName: '雅川青 12GB+512GB',
        price: 6999,
        quantity: 1,
        image: 'https://picsum.photos/id/2/200/200'
      }
    ],
    address: {
      name: '张三',
      phone: '13812345678',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南区A1栋501室'
    },
    paymentMethod: 'alipay'
  },
  {
    id: 'order-3',
    orderNo: 'JD2024011300003',
    status: 'completed',
    statusText: '已完成',
    createTime: '2024-01-13 09:00:00',
    totalAmount: 399,
    freightAmount: 0,
    couponAmount: 0,
    payAmount: 399,
    items: [
      {
        id: 'item-4',
        productId: 'product-4',
        productName: '小米手环8 Pro 曜石黑',
        skuId: 'sku-4-1',
        skuName: '曜石黑',
        price: 399,
        quantity: 1,
        image: 'https://picsum.photos/id/8/200/200'
      }
    ],
    address: {
      name: '张三',
      phone: '13812345678',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南区A1栋501室'
    },
    store: {
      name: '深圳南山科技园店',
      phone: '0755-12345678',
      address: '广东省深圳市南山区科技园南区A2栋1楼',
      businessHours: '09:00-22:00'
    },
    paymentMethod: 'wechat',
    payTime: '2024-01-13 09:05:00',
    deliverTime: '2024-01-14 10:00:00',
    completeTime: '2024-01-15 18:30:00'
  },
  {
    id: 'order-4',
    orderNo: 'JD2024011200004',
    status: 'cancelled',
    statusText: '已取消',
    createTime: '2024-01-12 11:30:00',
    totalAmount: 1899,
    freightAmount: 0,
    couponAmount: 0,
    payAmount: 1899,
    items: [
      {
        id: 'item-5',
        productId: 'product-3',
        productName: 'AirPods Pro (第二代)',
        skuId: 'sku-3-1',
        skuName: '配MagSafe充电盒',
        price: 1899,
        quantity: 1,
        image: 'https://picsum.photos/id/3/200/200'
      }
    ],
    address: {
      name: '张三',
      phone: '13812345678',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南区A1栋501室'
    },
    paymentMethod: 'wechat',
    cancelTime: '2024-01-12 12:00:00',
    cancelReason: '用户主动取消'
  }
];

// 从本地存储获取订单数据，没有则使用默认数据
function getOrders(): OrderData[] {
  try {
    const stored = localStorage.getItem('orders');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load orders from localStorage:', e);
  }
  // 首次加载，将默认数据保存到本地存储
  saveOrders(defaultOrders);
  return defaultOrders;
}

// 保存订单数据到本地存储
function saveOrders(orders: OrderData[]): void {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to localStorage:', e);
  }
}

// 订单数据（从本地存储加载）
export const orders: OrderData[] = getOrders();

// 根据状态获取订单
export function getOrdersByStatus(status?: string): OrderData[] {
  const currentOrders = getOrders();
  if (!status || status === 'all') {
    return currentOrders;
  }
  return currentOrders.filter(order => order.status === status);
}

// 根据ID获取订单
export function getOrderById(id: string): OrderData | undefined {
  const currentOrders = getOrders();
  return currentOrders.find(order => order.id === id);
}

// 取消订单
export function cancelOrder(orderId: string, reason?: string): boolean {
  const currentOrders = getOrders();
  const orderIndex = currentOrders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) {
    return false;
  }
  
  currentOrders[orderIndex] = {
    ...currentOrders[orderIndex],
    status: 'cancelled',
    statusText: '已取消',
    cancelTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    cancelReason: reason || '用户主动取消'
  };
  
  saveOrders(currentOrders);
  return true;
}

// 支付订单
export function payOrder(orderId: string): boolean {
  const currentOrders = getOrders();
  const orderIndex = currentOrders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) {
    return false;
  }
  
  currentOrders[orderIndex] = {
    ...currentOrders[orderIndex],
    status: 'paid',
    statusText: '已支付',
    payTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  
  saveOrders(currentOrders);
  return true;
}

// 确认自提
export function confirmPickup(orderId: string): boolean {
  const currentOrders = getOrders();
  const orderIndex = currentOrders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) {
    return false;
  }
  
  currentOrders[orderIndex] = {
    ...currentOrders[orderIndex],
    status: 'completed',
    statusText: '已完成',
    completeTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  
  saveOrders(currentOrders);
  return true;
}

// 申请退款
export function applyRefund(orderId: string, reason: string): boolean {
  const currentOrders = getOrders();
  const orderIndex = currentOrders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) {
    return false;
  }
  
  currentOrders[orderIndex] = {
    ...currentOrders[orderIndex],
    status: 'refunding',
    statusText: '退款中',
    refundReason: reason,
    refundApplyTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  
  saveOrders(currentOrders);
  return true;
}
