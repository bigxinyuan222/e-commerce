// ============================================
// 商品详情页 - 数据获取
// ============================================

import { Product, Evaluation, EvaluationStats } from './types';

// 从全局数据导入
import { products } from '@/data/product/products';
import { getEvaluationsByProduct, getEvaluationStats } from '@/data/product/evaluations';

// 获取商品详情
export function getProductDetail(productId: string): Product | null {
  return products.find(p => p.id === productId) || null;
}

// 获取商品评价列表
export function getProductEvaluations(productId: string, filter?: 'all' | 'positive' | 'negative' | 'withImages'): Evaluation[] {
  const evaluations = getEvaluationsByProduct(productId) as unknown as Evaluation[];
  if (filter === 'positive') return evaluations.filter(e => e.rating >= 4);
  if (filter === 'negative') return evaluations.filter(e => e.rating <= 2);
  if (filter === 'withImages') return evaluations.filter(e => e.images && e.images.length > 0);
  return evaluations;
}

// 获取评价统计
export function getProductEvaluationStats(productId: string): EvaluationStats {
  return getEvaluationStats(productId) as unknown as EvaluationStats;
}

// 获取相关推荐商品
export function getRelatedProducts(productId: string, limit: number = 6): Product[] {
  const currentProduct = getProductDetail(productId);
  if (!currentProduct) return [];
  
  return products
    .filter(p => p.id !== productId && p.categoryId === currentProduct.categoryId)
    .slice(0, limit);
}

// 格式化价格
export function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

// 计算折扣
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round((1 - currentPrice / originalPrice) * 100);
}