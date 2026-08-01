/**
 * 图片URL处理工具
 * 处理后端返回的图片URL，过滤掉无效的占位符域名
 */

// 默认占位图
const DEFAULT_PLACEHOLDER = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?placeholder';

// 需要过滤的占位符域名（精确匹配主机名）
// 注意：后端使用 img.example.com 作为图片服务器，不可过滤
const PLACEHOLDER_DOMAINS = [
  'placeholder.com',
  'test.com',
  'demo.com'
];

/**
 * 从 URL 中提取主机名
 */
function extractHostname(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

/**
 * 检查URL是否是有效的图片URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:')) return true;
  if (url.startsWith('/')) return true;

  // 精确匹配主机名，避免 img.example.com 被 example.com 误过滤
  const hostname = extractHostname(url);
  if (!hostname) return true; // 无法解析的 URL 默认放行
  return !PLACEHOLDER_DOMAINS.some(domain => hostname === domain || hostname.endsWith('.' + domain));
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

/**
 * 品牌ID → 本地SVG图标映射
 * 后端返回的 img.example.com 域名无法解析，因此用本地图标替代
 */
const BRAND_ICON_MAP: Record<string, string> = {
  '30': 'huawei',
  '31': 'xiaomi',
  '32': 'apple',
  '33': 'nike',
  '34': 'squirrel',
  '35': 'rice',
};

/**
 * 品牌名 → 本地SVG图标映射（兜底）
 */
const BRAND_NAME_ICON_MAP: Record<string, string> = {
  '华为': 'huawei',
  '小米': 'xiaomi',
  '苹果': 'apple',
  'nike': 'nike',
  'Nike': 'nike',
  'NIKE': 'nike',
  '三只松鼠': 'squirrel',
  '大米': 'rice',
};

// 动态引入品牌 SVG
const BRAND_SVG_MODULES: Record<string, any> = {
  huawei: require('@/icons/brands/huawei.svg'),
  xiaomi: require('@/icons/brands/xiaomi.svg'),
  apple: require('@/icons/brands/apple.svg'),
  nike: require('@/icons/brands/nike.svg'),
  squirrel: require('@/icons/brands/squirrel.svg'),
  rice: require('@/icons/brands/rice.svg'),
};

/**
 * 检查品牌 logo 是否为有效的网络图片（非 example.com 占位符）
 */
export function isValidBrandLogo(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('data:')) return true;
  const hostname = extractHostname(url);
  if (!hostname) return false;
  // 过滤掉 example.com 系列占位域名
  const isPlaceholder = hostname === 'example.com'
    || hostname.endsWith('.example.com')
    || hostname === 'example.cn'
    || hostname.endsWith('.example.cn')
    || hostname === 'placeholder.com'
    || hostname.endsWith('.placeholder.com');
  return !isPlaceholder;
}

/**
 * 根据品牌数据获取品牌图标
 * 优先使用 API 返回的有效 logo，其次使用本地 SVG 映射，最后用默认品牌图标
 */
export function getBrandIcon(brand: { id?: string | number; name?: string; logo?: string; image?: string }): string {
  if (!brand) return BRAND_SVG_MODULES.huawei;

  const logo = brand.logo || brand.image;
  if (isValidBrandLogo(logo)) {
    return logo as string;
  }

  const id = brand.id !== undefined ? String(brand.id) : '';
  const name = brand.name || '';

  // 优先 ID 匹配
  const iconKeyById = id ? BRAND_ICON_MAP[id] : null;
  if (iconKeyById && BRAND_SVG_MODULES[iconKeyById]) {
    return BRAND_SVG_MODULES[iconKeyById];
  }

  // 兜底名称匹配
  const iconKeyByName = name ? BRAND_NAME_ICON_MAP[name] : null;
  if (iconKeyByName && BRAND_SVG_MODULES[iconKeyByName]) {
    return BRAND_SVG_MODULES[iconKeyByName];
  }

  // 最终兜底：默认商店图标
  return require('@/icons/brand-store.svg');
}
