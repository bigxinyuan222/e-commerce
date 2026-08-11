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
  'demo.com',
  'example.com',
  'example.cn',
  'xxx.com',
  'xxx.cn',
  'xxx.yyy',
  'xxx',
  'yyy',
  'demo.example.com',
  'test.example.com',
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
 * 规范化单个 SKU 数据
 * 兼容 snake_case、camelCase、PascalCase 字段命名
 */
function normalizeSku(sku: any): any {
  if (!sku) return sku;
  const result: any = { ...sku };

  // 规格字段兼容：spec_values / SpecValues / specValue / specs / Specs / spec
  const specs = sku.specs ?? sku.spec_values ?? sku.SpecValues ?? sku.specValue ?? sku.SpecValue ?? sku.Specs ?? sku.spec ?? {};
  result.specs = specs;

  // ID 兼容：id / ID / skuId / SkuId / sku_id
  result.id = String(sku.id ?? sku.ID ?? sku.skuId ?? sku.SkuId ?? sku.sku_id ?? '');

  // 价格兼容：price / Price / skuPrice / SkuPrice
  result.price = Number(sku.price ?? sku.Price ?? sku.skuPrice ?? sku.SkuPrice ?? 0);

  // 库存兼容：stock / Stock / skuStock / SkuStock / inventory / Inventory
  result.stock = Number(sku.stock ?? sku.Stock ?? sku.skuStock ?? sku.SkuStock ?? sku.inventory ?? sku.Inventory ?? 0);

  // 图片兼容：image / Image / skuImage / SkuImage / sku_image
  result.image = sku.image ? getImageUrl(sku.image)
    : sku.Image ? getImageUrl(sku.Image)
    : sku.skuImage ? getImageUrl(sku.skuImage)
    : sku.SkuImage ? getImageUrl(sku.SkuImage)
    : sku.sku_image ? getImageUrl(sku.sku_image)
    : '';

  // SKU 名称兼容：name / Name / skuName / SkuName / sku_name / title / Title
  let name = sku.name ?? sku.Name ?? sku.skuName ?? sku.SkuName ?? sku.sku_name ?? sku.title ?? sku.Title ?? '';
  // 如果没有 name，从规格值拼接（格式：颜色 值 存储容量 值）
  if (!name && result.specs && typeof result.specs === 'object') {
    name = Object.entries(result.specs)
      .map(([, v]) => v)
      .filter(Boolean)
      .join(' ');
  }
  // 再兜底用 skuCode
  if (!name) {
    name = sku.skuCode ?? sku.SkuCode ?? sku.sku_code ?? '';
  }
  result.name = name;

  return result;
}

/**
 * 规范化商品图片数据
 * 处理后端返回的商品图片，确保所有图片都是有效的URL
 * 同时规范化 SKU 字段（spec_values → specs，补全 name 等）
 * 以及品牌、分类、价格、库存等字段命名兼容
 */
export function normalizeProductImages(product: any): any {
  if (!product) return product;
  
  const normalized = { ...product };
  
  // ====== 图片字段处理 ======
  // 处理images数组
  if (normalized.images && Array.isArray(normalized.images)) {
    normalized.images = normalized.images.map((url: string) => getImageUrl(url));
  }
  // 兼容 Images / imageList / ImageList / images_list
  else if (normalized.Images && Array.isArray(normalized.Images)) {
    normalized.images = normalized.Images.map((url: string) => getImageUrl(url));
  } else if (normalized.imageList && Array.isArray(normalized.imageList)) {
    normalized.images = normalized.imageList.map((url: string) => getImageUrl(url));
  } else if (normalized.ImageList && Array.isArray(normalized.ImageList)) {
    normalized.images = normalized.ImageList.map((url: string) => getImageUrl(url));
  } else if (normalized.images_list && Array.isArray(normalized.images_list)) {
    normalized.images = normalized.images_list.map((url: string) => getImageUrl(url));
  }
  
  // 处理单图字段
  if (normalized.image) {
    normalized.image = getImageUrl(normalized.image);
  } else if (normalized.Image) {
    normalized.image = getImageUrl(normalized.Image);
  }

  // ====== 品牌字段处理 ======
  // brandId：brand_id / BrandId / brand.ID / brand.id / brandId
  normalized.brandId = String(
    normalized.brandId ?? normalized.BrandId
    ?? normalized.brand_id ?? normalized.brand_id
    ?? normalized.brand?.ID ?? normalized.brand?.id ?? ''
  );
  // brandName：brand_name / BrandName / brand.name / brand.Name / brandName
  normalized.brandName = normalized.brandName ?? normalized.BrandName
    ?? normalized.brand_name ?? normalized.brand?.name ?? normalized.brand?.Name ?? '';

  // ====== 分类字段处理 ======
  // categoryId：category_id / CategoryId / category.ID / category.id / categoryId
  normalized.categoryId = String(
    normalized.categoryId ?? normalized.CategoryId
    ?? normalized.category_id ?? normalized.category_id
    ?? normalized.category?.ID ?? normalized.category?.id ?? ''
  );
  // categoryName：category_name / CategoryName / category.name / category.Name / categoryName
  normalized.categoryName = normalized.categoryName ?? normalized.CategoryName
    ?? normalized.category_name ?? normalized.category?.name ?? normalized.category?.Name ?? '';

  // ====== 价格字段处理 ======
  normalized.price = Number(
    normalized.price ?? normalized.Price
    ?? normalized.salePrice ?? normalized.SalePrice ?? normalized.sale_price
    ?? 0
  );
  // originalPrice：original_price / OriginalPrice / marketPrice / MarketPrice / market_price
  if (normalized.originalPrice === undefined || normalized.originalPrice === null) {
    normalized.originalPrice = Number(
      normalized.originalPrice ?? normalized.OriginalPrice
      ?? normalized.original_price ?? normalized.original_price
      ?? normalized.marketPrice ?? normalized.MarketPrice ?? normalized.market_price
      ?? normalized.price ?? 0
    );
  }

  // ====== 库存 & 销量 ======
  normalized.stock = Number(
    normalized.stock ?? normalized.Stock
    ?? normalized.totalStock ?? normalized.TotalStock ?? normalized.total_stock
    ?? normalized.inventory ?? normalized.Inventory ?? 0
  );
  normalized.sales = Number(
    normalized.sales ?? normalized.Sales
    ?? normalized.soldCount ?? normalized.SoldCount ?? normalized.sold_count
    ?? normalized.sold ?? normalized.Sold ?? 0
  );

  // ====== SKU 处理 ======
  const skuList = normalized.skus ?? normalized.Skus ?? normalized.SKUs ?? normalized.skuList ?? normalized.SkuList ?? normalized.sku_list;
  if (skuList && Array.isArray(skuList)) {
    normalized.skus = skuList.map((sku: any) => normalizeSku(sku));
  }
  // 确保即使后端没返回 skus，也有一个空数组避免渲染报错
  if (!normalized.skus || !Array.isArray(normalized.skus)) {
    normalized.skus = [];
  }

  // ====== 商品详情描述字段处理 ======
  // 兼容后端多种详情字段命名（HTML 富文本）
  normalized.description = normalized.description ?? normalized.Description
    ?? normalized.detail ?? normalized.Detail
    ?? normalized.details ?? normalized.Details
    ?? normalized.content ?? normalized.Content
    ?? normalized.introduce ?? normalized.Introduce
    ?? normalized.introduction ?? normalized.Introduction
    ?? normalized.productDescription ?? normalized.ProductDescription
    ?? normalized.product_description ?? normalized.product_desc
    ?? normalized.desc ?? normalized.Desc
    ?? normalized.body ?? normalized.Body
    ?? normalized.richText ?? normalized.RichText
    ?? normalized.rich_text ?? normalized.html ?? normalized.Html
    ?? '';

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
    || hostname.endsWith('.placeholder.com')
    || hostname === 'xxx.com'
    || hostname.endsWith('.xxx.com')
    || hostname === 'xxx.cn'
    || hostname.endsWith('.xxx.cn')
    || hostname === 'xxx.yyy'
    || hostname.endsWith('.xxx.yyy')
    || hostname === 'test.com'
    || hostname.endsWith('.test.com')
    || hostname === 'demo.com'
    || hostname.endsWith('.demo.com');
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
