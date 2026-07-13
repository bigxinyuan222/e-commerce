// ============================================
// 首页 - 工具函数
// ============================================

import { SeckillProduct, Brand } from './types';

export function formatSeckillPrice(price: number): string {
  return `¥${price.toFixed(0)}`;
}

export function formatBrandProductCount(count: number): string {
  if (count >= 100) {
    return `${count}+件商品`;
  }
  return `${count}件商品`;
}

export function isSeckillActive(startTime: string, endTime: string): boolean {
  const now = Date.now();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return now >= start && now <= end;
}

export function isSeckillComing(startTime: string): boolean {
  const now = Date.now();
  const start = new Date(startTime).getTime();
  const diff = start - now;
  return diff > 0 && diff <= 30 * 60 * 1000;
}

export function formatCountdown(hours: number, minutes: number, seconds: number): string {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function getCategoryJumpParams(categoryId: string): { category: string } {
  return { category: categoryId };
}