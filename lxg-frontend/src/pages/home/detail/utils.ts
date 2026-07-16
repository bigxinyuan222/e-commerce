// ============================================
// 商品详情页 - 工具函数
// ============================================

import { Product, SKU } from './types';

// 检查SKU是否匹配选中的规格
export function isSkuMatchSpecs(sku: SKU, selectedSpecs: { [key: string]: string }): boolean {
  const specsKeys = Object.keys(selectedSpecs);
  if (specsKeys.length === 0) return false;
  
  return specsKeys.every(key => sku.specs[key] === selectedSpecs[key]);
}

// 根据规格找到匹配的SKU
export function findMatchingSku(skus: SKU[], selectedSpecs: { [key: string]: string }): SKU | null {
  return skus.find(sku => isSkuMatchSpecs(sku, selectedSpecs)) || null;
}

// 获取所有规格选项
export function getAllSpecOptions(skus: SKU[]): { [key: string]: string[] } {
  const specOptions: { [key: string]: string[] } = {};
  
  skus.forEach(sku => {
    Object.entries(sku.specs).forEach(([key, value]) => {
      if (!specOptions[key]) {
        specOptions[key] = [];
      }
      if (!specOptions[key].includes(value)) {
        specOptions[key].push(value);
      }
    });
  });
  
  return specOptions;
}

// 检查规格选项是否可用（是否有库存）
export function isSpecOptionAvailable(
  skus: SKU[],
  specKey: string,
  specValue: string,
  selectedSpecs: { [key: string]: string }
): boolean {
  const tempSpecs = { ...selectedSpecs, [specKey]: specValue };
  const matchingSku = findMatchingSku(skus, tempSpecs);
  return matchingSku ? matchingSku.stock > 0 : false;
}

// 生成分享文本
export function generateShareText(product: Product): string {
  return `【乐享购】${product.name}，仅需¥${product.price}，快来抢购吧！`;
}

// 生成商品描述摘要
export function generateDescriptionSummary(description: string, maxLength: number = 100): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
}

// 计算商品评分星级
export function calculateStarRating(score: number): number {
  return Math.round(score / 20); // 将100分制转换为5星制
}

// 格式化销量显示
export function formatSalesCount(sales: number): string {
  if (sales >= 10000) {
    return `${(sales / 10000).toFixed(1)}万`;
  }
  return `${sales}`;
}