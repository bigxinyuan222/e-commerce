// ============================================
// 商品详情页 - 类型定义
// ============================================

// 商品数据类型
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

// SKU规格类型
export interface SKU {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  specs: { [key: string]: string };
}

// 商品评价类型
export interface Evaluation {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  images: string[];
  createTime: string;
  isPositive: boolean;
  reply?: string;
}

// 评价统计类型
export interface EvaluationStats {
  total: number;
  positive: number;
  negative: number;
  withImages: number;
  averageRating: number;
}

// 页面状态类型
export interface PageState {
  product: Product | null;
  selectedSku: SKU | null;
  selectedSpecs: { [key: string]: string };
  quantity: number;
  showSkuPicker: boolean;
  showShareMenu: boolean;
  loading: boolean;
}