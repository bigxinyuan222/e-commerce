// ============================================
// 电商平台类型定义
// ============================================

// 用户信息
export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
}

// 收货地址
export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

// 商品分类
export interface Category {
  id: string;
  name: string;
  icon: string;
  children?: Category[];
}

// 商品
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  sales: number;
  stock: number;
  skus: SKU[];
  evaluateCount: number;
  evaluateScore: number;
  tags: string[];
}

// SKU规格
export interface SKU {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  specs: { [key: string]: string };
}

// 购物车商品
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  skuId: string;
  skuName: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
  stock: number;
}

// 订单
export interface Order {
  id: string;
  orderNo: string;
  status: OrderStatus;
  statusText: string;
  createTime: string;
  totalAmount: number;
  freightAmount: number;
  couponAmount: number;
  payAmount: number;
  items: OrderItem[];
  address: Address;
  store?: Store;
  paymentMethod: 'wechat' | 'alipay';
  payTime?: string;
  deliverTime?: string;
  completeTime?: string;
  cancelTime?: string;
  cancelReason?: string;
}

// 订单商品项
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

// 订单状态
export type OrderStatus = 'pending_payment' | 'paid' | 'pending_pickup' | 'completed' | 'cancelled' | 'refunding' | 'refunded';

// 优惠券
export interface Coupon {
  id: string;
  name: string;
  type: 'cash' | 'discount';
  value: number;
  minAmount: number;
  totalCount: number;
  remainCount: number;
  startTime: string;
  endTime: string;
  scope: 'all' | 'category' | 'product';
  scopeIds: string[];
  status: 'available' | 'used' | 'expired';
  receiveTime?: string;
  useTime?: string;
  orderId?: string;
}

// 门店
export interface Store {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  businessHours: string;
  status: 'open' | 'closed';
  distance?: number;
}

// 评价
export interface Evaluation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  productId: string;
  orderId: string;
  rating: number;
  content: string;
  images: string[];
  createTime: string;
  reply?: string;
  replyTime?: string;
}

// 客服消息
export interface ChatMessage {
  id: string;
  type: 'text' | 'image' | 'order' | 'product';
  content: string;
  sender: 'user' | 'service';
  createTime: string;
  status: 'sending' | 'sent' | 'read';
  extra?: {
    orderId?: string;
    productId?: string;
    productName?: string;
    productImage?: string;
  };
}

// 营销活动
export interface SeckillActivity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  products: SeckillProduct[];
  status: 'pending' | 'active' | 'ended';
}

export interface SeckillProduct {
  id: string;
  productId: string;
  productName: string;
  image: string;
  originalPrice: number;
  seckillPrice: number;
  stock: number;
  soldCount: number;
  limitCount: number;
}

export interface GroupBuyActivity {
  id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  originalPrice: number;
  groupPrice: number;
  groupSize: number;
  joinedCount: number;
  remainCount: number;
  endTime: string;
  status: 'ongoing' | 'ended' | 'success';
}

export interface GroupBuy {
  id: string;
  activityId: string;
  productId: string;
  groupSize: number;
  joinedUsers: GroupBuyUser[];
  status: 'ongoing' | 'success' | 'failed';
  endTime: string;
}

export interface GroupBuyUser {
  id: string;
  nickname: string;
  avatar: string;
  joinTime: string;
  isLeader: boolean;
}

// 退货退款
export interface ReturnApply {
  id: string;
  orderId: string;
  orderNo: string;
  items: ReturnItem[];
  reason: string;
  description: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createTime: string;
  processTime?: string;
  completeTime?: string;
}

export interface ReturnItem {
  productId: string;
  productName: string;
  skuId: string;
  skuName: string;
  image: string;
  quantity: number;
  price: number;
  returnAmount: number;
}

// 轮播图
export interface Banner {
  id: string;
  image: string;
  type: 'product' | 'category' | 'url' | 'seckill' | 'groupbuy';
  targetId?: string;
  url?: string;
}

// 搜索历史
export interface SearchHistory {
  keywords: string[];
}
