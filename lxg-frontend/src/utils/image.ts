/**
 * 图片URL处理工具
 * 处理后端返回的图片URL，过滤掉无效的占位符域名
 */

// 默认占位图
const DEFAULT_PLACEHOLDER = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?placeholder';

// 需要过滤的占位符域名
const PLACEHOLDER_DOMAINS = [
  'example.com',
  'example.cn',
  'placeholder.com',
  'img.example.com',
  'test.com',
  'demo.com'
];

/**
 * 检查URL是否是有效的图片URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:')) return true;
  if (url.startsWith('/')) return true;
  
  // 检查是否包含占位符域名
  const lowerUrl = url.toLowerCase();
  return !PLACEHOLDER_DOMAINS.some(domain => lowerUrl.includes(domain));
}

/**
 * 获取有效的图片URL，过滤占位符
 */
export function getImageUrl(url: string | null | undefined): string {
  if (!url) return DEFAULT_PLACEHOLDER;
  if (isValidImageUrl(url)) return url;
  return DEFAULT_PLACEHOLDER;
}

/**
 * 批量处理图片URL数组
 */
export function getImageUrls(urls: string[] | null | undefined): string[] {
  if (!urls || !Array.isArray(urls)) return [];
  return urls.map(url => getImageUrl(url));
}

/**
 * 规范化商品图片数据
 * 处理后端返回的商品图片，确保所有图片都是有效的URL
 */
export function normalizeProductImages(product: any): any {
  if (!product) return product;
  
  const normalized = { ...product };
  
  // 处理images数组
  if (normalized.images && Array.isArray(normalized.images)) {
    normalized.images = normalized.images.map((url: string) => getImageUrl(url));
  }
  
  // 处理单图字段
  if (normalized.image) {
    normalized.image = getImageUrl(normalized.image);
  }
  
  // 处理SKU图片
  if (normalized.skus && Array.isArray(normalized.skus)) {
    normalized.skus = normalized.skus.map((sku: any) => ({
      ...sku,
      image: sku.image ? getImageUrl(sku.image) : ''
    }));
  }
  
  return normalized;
}

/**
 * 批量规范化商品列表的图片
 */
export function normalizeProductListImages(products: any[] | null | undefined): any[] {
  if (!products || !Array.isArray(products)) return [];
  return products.map(product => normalizeProductImages(product));
}

/**
 * 根据平台返回不同的图片懒加载属性
 * H5端使用原生loading='lazy'，小程序端使用lazyLoad
 */
export function lazyImgProps(): Record<string, any> {
  if (process.env.TARO_ENV === 'h5') {
    return { loading: 'lazy' };
  }
  return { lazyLoad: true };
}
