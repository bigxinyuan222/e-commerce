// ============================================
// 分类页 - 类型定义
// ============================================

// 分类类型
export interface Category {
  id: string;
  name: string;
  icon: string;
  children?: Category[];
}

// 商品类型
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  sales: number;
  categoryId: string;
  categoryName: string;
}

// 页面状态类型
export interface PageState {
  categories: Category[];
  selectedCategoryId: string;
  selectedSubCategoryId: string | null;
  products: Product[];
  loading: boolean;
}