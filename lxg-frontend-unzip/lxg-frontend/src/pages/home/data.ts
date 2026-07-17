// ============================================
// 首页 - 数据获取
// ============================================

import { Banner, Category, SeckillActivity, Brand } from './types';

import { banners, categories, seckillActivity } from '@/data/common/home';
import { getRecommendedProducts } from '@/data/product/products';
import { getHotBrands } from '@/data/product/brands';

export function getBanners(): Banner[] {
  return banners as Banner[];
}

export function getCategories(): Category[] {
  return categories as Category[];
}

export function getSeckillActivity(): SeckillActivity | null {
  return seckillActivity as SeckillActivity;
}

export function getHotBrandsList(): Brand[] {
  return getHotBrands() as Brand[];
}

export function getRecommendedProductsList(limit: number = 10) {
  return getRecommendedProducts(limit);
}

export function calculateSeckillRemainingTime(endTime: string): { hours: number; minutes: number; seconds: number } {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

export function calculateSeckillProgress(sold: number, stock: number): number {
  if (stock <= 0) return 0;
  return Math.round((sold / stock) * 100);
}