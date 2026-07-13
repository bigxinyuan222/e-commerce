// ============================================
// 购物车页面 - 类型定义
// ============================================

// 购物车商品类型
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selected: boolean;
  skuId?: string;
  skuName?: string;
  isSeckill?: boolean;
}

// 购物车状态类型
export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
  selectedCount: number;
  selectedPrice: number;
}

// 页面状态类型
export interface PageState {
  cartItems: CartItem[];
  isEditing: boolean;
  loading: boolean;
}