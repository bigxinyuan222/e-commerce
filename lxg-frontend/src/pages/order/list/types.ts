// ============================================
// 订单列表页 - 类型定义
// ============================================

// 订单状态类型
export type OrderStatus = 'pending_payment' | 'pending_pickup' | 'completed' | 'cancelled' | 'refunding';

// 订单商品类型
export interface OrderProduct {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  skuId?: string;
  skuName?: string;
}

// 订单类型
export interface Order {
  id: string;
  status: OrderStatus;
  products: OrderProduct[];
  totalPrice: number;
  createTime: string;
  payTime?: string;
  pickupTime?: string;
  completeTime?: string;
  cancelTime?: string;
  storeId: string;
  storeName: string;
  storeAddress: string;
  pickupCode?: string;
}

// 页面状态类型
export interface PageState {
  orders: Order[];
  currentTab: OrderStatus | 'all';
  loading: boolean;
}