// ============================================
// 分类页 - 数据获取
// ============================================

import { Category, Product } from './types';

// 从全局数据导入
import { categories } from '@/data/common/home';
import { products } from '@/data/product/products';

// 获取分类列表
export function getCategoryList(): Category[] {
  return categories as unknown as Category[];
}

// 获取分类下的商品
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId) as unknown as Product[];
}

// 获取子分类下的商品
export function getProductsBySubCategory(subCategoryId: string): Product[] {
  // 这里可以根据实际需求扩展
  return products.filter(p => p.categoryId === subCategoryId) as unknown as Product[];
}

// 搜索商品
export function searchProducts(keyword: string): Product[] {
  const lowerKeyword = keyword.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerKeyword) ||
    p.categoryName.toLowerCase().includes(lowerKeyword)
  ) as unknown as Product[];
}

// 获取分类名称
export function getCategoryName(categoryId: string): string {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : '';
}