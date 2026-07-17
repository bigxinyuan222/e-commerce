// ============================================
// 购物车页面 - 工具函数
// ============================================

import { CartItem } from './types';

// 格式化价格显示
export function formatCartPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

// 格式化商品数量
export function formatCartQuantity(quantity: number): string {
  return `${quantity}件`;
}

// 检查购物车是否为空
export function isCartEmpty(items: CartItem[]): boolean {
  return items.length === 0;
}

// 检查是否有选中的商品
export function hasSelectedItems(items: CartItem[]): boolean {
  return items.some(item => item.selected);
}

// 检查是否全部选中
export function isAllSelected(items: CartItem[]): boolean {
  return items.length > 0 && items.every(item => item.selected);
}

// 生成购物车商品ID
export function generateCartItemId(productId: string, skuId?: string): string {
  return skuId ? `${productId}_${skuId}` : productId;
}

// 计算商品小计
export function calculateItemTotal(price: number, quantity: number): number {
  return price * quantity;
}

// 格式化结算按钮文本
export function formatCheckoutButtonText(selectedCount: number, selectedPrice: number): string {
  if (selectedCount === 0) {
    return '结算(0)';
  }
  return `结算(${selectedCount}) ¥${selectedPrice.toFixed(2)}`;
}