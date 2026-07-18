// ============================================
// 购物车页面 - 数据获取
// ============================================

import { CartItem, CartState } from './types';

// 获取购物车数据（从localStorage）
export function getCartItems(): CartItem[] {
  const storedCart = localStorage.getItem('cartItems');
  if (storedCart) {
    return JSON.parse(storedCart) as CartItem[];
  }
  return [];
}

// 保存购物车数据
export function saveCartItems(items: CartItem[]): void {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

// 计算购物车总价
export function calculateCartTotal(items: CartItem[]): CartState {
  const selectedItems = items.filter(item => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const selectedPrice = totalPrice;
  
  return {
    items,
    totalPrice,
    totalCount,
    selectedCount,
    selectedPrice,
  };
}

// 添加商品到购物车
export function addToCart(item: CartItem): CartItem[] {
  const items = getCartItems();
  const existingItem = items.find(i => i.productId === item.productId && i.skuId === item.skuId);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    items.push(item);
  }
  
  saveCartItems(items);
  return items;
}

// 从购物车删除商品
export function removeFromCart(itemId: string): CartItem[] {
  const items = getCartItems();
  const newItems = items.filter(item => item.id !== itemId);
  saveCartItems(newItems);
  return newItems;
}

// 更新购物车商品数量
export function updateCartItemQuantity(itemId: string, quantity: number): CartItem[] {
  const items = getCartItems();
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCartItems(items);
  return items;
}

// 更新购物车商品选中状态
export function updateCartItemSelected(itemId: string, selected: boolean): CartItem[] {
  const items = getCartItems();
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.selected = selected;
  }
  saveCartItems(items);
  return items;
}