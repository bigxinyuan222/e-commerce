// ============================================
// 首页 - 类型定义
// ============================================

// 轮播图类型
export interface Banner {
  id: string;
  image: string;
  title: string;
  link: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  icon: string;
  children?: Category[];
}

// 秒杀活动类型
export interface SeckillActivity {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  products: SeckillProduct[];
}

// 秒杀商品类型
export interface SeckillProduct {
  id: string;
  productId: string;
  name: string;
  image: string;
  originalPrice: number;
  seckillPrice: number;
  stock: number;
  sold: number;
}

// 品牌类型
export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  categoryId: string;
  categoryName: string;
  productCount: number;
  isHot: boolean;
}

// 页面状态类型
export interface PageState {
  banners: Banner[];
  categories: Category[];
  seckillActivity: SeckillActivity | null;
  hotBrands: Brand[];
  loading: boolean;
}