// ============================================
// 分类页 - 工具函数
// ============================================

import { Category } from './types';

// 获取分类图标
export function getCategoryIcon(categoryId: string): string {
  // 返回分类对应的图标
  const iconMap: { [key: string]: string } = {
    '1': '📱',
    '2': '👕',
    '3': '🍎',
    '4': '👶',
    '5': '🏠',
  };
  return iconMap[categoryId] || '📦';
}

// 检查分类是否有子分类
export function hasSubCategories(category: Category): boolean {
  return category.children && category.children.length > 0;
}

// 获取分类层级路径
export function getCategoryPath(categoryId: string, categories: Category[]): string {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category.name;
    }
    if (category.children) {
      for (const child of category.children) {
        if (child.id === categoryId) {
          return `${category.name} > ${child.name}`;
        }
      }
    }
  }
  return '';
}

// 格式化商品数量
export function formatProductCount(count: number): string {
  if (count >= 100) {
    return `${count}件`;
  }
  return `${count}件`;
}