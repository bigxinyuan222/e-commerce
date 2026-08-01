import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { brandApi } from '@/api/home';
import { getImageUrl, normalizeProductListImages, lazyImgProps, getBrandIcon } from '@/utils/image';
import styles from '@/styles/home/brand-detail.module.scss';

const PAGE_SIZE = 10;

/**
 * 规范化品牌数据（与 brands 列表页保持一致）
 */
function normalizeBrand(item: any): any {
  if (!item) return null;
  const id = item.id ?? item.ID ?? item.brandId ?? item.BrandId ?? item.code ?? item.Code ?? item.brandCode ?? item.BrandCode ?? '';
  const name = item.name ?? item.Name ?? item.brandName ?? item.BrandName ?? '';
  const logo = item.logo ?? item.Logo ?? item.icon ?? item.Icon ?? item.image ?? item.Image ?? '';
  const description = item.description ?? item.Description ?? item.desc ?? item.Desc ?? item.intro ?? item.Intro ?? '';
  const productsCount = item.productsCount ?? item.ProductsCount ?? item.count ?? item.Count ?? item.num ?? item.Num ?? item.productNum ?? item.product_num ?? item.total ?? item.Total ?? 0;
  const isHot = item.isHot ?? item.IsHot ?? item.hot ?? item.Hot ?? false;
  const rawChildren = item.children || item.child || item.subBrands || item.subs || item.list || item.items || [];
  const children = rawChildren.map(normalizeBrand).filter(Boolean);
  return {
    id: String(id),
    name,
    logo,
    description,
    productsCount: Number(productsCount) || 0,
    isHot: !!isHot,
    children,
  };
}

/**
 * 在品牌树中递归查找指定品牌
 */
function findBrandInTree(tree: any[], brandId: string): any | null {
  if (!Array.isArray(tree) || !brandId) return null;
  for (const node of tree) {
    if (!node) continue;
    if (node.id === brandId) return node;
    if (node.children && node.children.length > 0) {
      const found = findBrandInTree(node.children, brandId);
      if (found) return found;
    }
  }
  return null;
}

/**
 * 规范化商品数据（兼容多字段命名）
 */
function normalizeProduct(item: any): any {
  if (!item) return null;
  return {
    id: item.id ?? item.ID ?? item.productId ?? item.ProductId ?? '',
    name: item.name ?? item.Name ?? item.productName ?? item.ProductName ?? '',
    price: item.price ?? item.Price ?? item.salePrice ?? item.SalePrice ?? 0,
    originalPrice: item.originalPrice ?? item.OriginalPrice ?? item.marketPrice ?? item.MarketPrice ?? 0,
    images: item.images ?? item.Images ?? item.imageList ?? [],
    image: item.image ?? item.Image ?? item.cover ?? item.Cover ?? '',
    sales: item.sales ?? item.Sales ?? item.soldCount ?? item.SoldCount ?? 0,
  };
}

const BrandDetailPage: React.FC = () => {
  const [brand, setBrand] = useState<any | null>(null);
  const [brandProducts, setBrandProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const brandIdRef = useRef<string>('');

  const goToProductDetail = useCallback((productId: string) => {
    if (!productId) return;
    Taro.navigateTo({ url: '/pages/home/detail/index?id=' + productId });
  }, []);

  // 获取品牌信息（通过品牌树查找）
  const loadBrandInfo = useCallback(async (brandId: string) => {
    try {
      const res = await apiGet(brandApi.brandTree);
      if (res?.data) {
        const rawData = Array.isArray(res.data) ? res.data : res.data?.list || res.data?.data || [];
        const normalized = rawData.map(normalizeBrand).filter(Boolean);
        const found = findBrandInTree(normalized, brandId);
        setBrand(found || { id: brandId, name: '品牌详情', logo: '', description: '', productsCount: 0, isHot: false, children: [] });
      } else {
        setBrand({ id: brandId, name: '品牌详情', logo: '', description: '', productsCount: 0, isHot: false, children: [] });
      }
    } catch (error) {
      console.error('Failed to load brand info:', error);
      setBrand({ id: brandId, name: '品牌详情', logo: '', description: '', productsCount: 0, isHot: false, children: [] });
    }
  }, []);

  // 分页加载品牌商品
  const loadProducts = useCallback(async (brandId: string, reset: boolean = true) => {
    if (!brandId) return;
    brandIdRef.current = brandId;

    if (reset) {
      setPage(1);
      setBrandProducts([]);
      setHasMore(true);
    }

    try {
      setLoadingMore(!reset);
      // 后端验证小写 id 参数（虽报错提示 "Id是必填项"），与 category 接口规则一致
      const currentPage = reset ? 1 : page;
      const res = await apiGet(brandApi.brandProducts, { id: brandId, page: currentPage, size: PAGE_SIZE });

      if (res?.data) {
        const rawData = Array.isArray(res.data) ? res.data : res.data?.list || res.data?.data || [];
        const normalized = rawData.map(normalizeProduct).filter(Boolean);
        const finalProducts = normalizeProductListImages(normalized);

        if (reset) {
          setBrandProducts(finalProducts);
        } else {
          setBrandProducts(prev => [...prev, ...finalProducts]);
        }

        const total = res.data?.total ?? res.total ?? res.data?.Total ?? 0;
        const loadedCount = reset ? finalProducts.length : brandProducts.length + finalProducts.length;
        setHasMore(finalProducts.length >= PAGE_SIZE && (total === 0 || loadedCount < total));
        setPage(currentPage + 1);

        // 用商品接口的 total 回填品牌商品数（品牌树接口不返回 productsCount）
        if (reset && total > 0) {
          setBrand(prev => {
            if (!prev) return prev;
            if (prev.productsCount > 0) return prev;
            return { ...prev, productsCount: total };
          });
        }
      }
    } catch (error) {
      console.error('Failed to load brand products:', error);
      if (reset) {
        setBrandProducts([]);
      }
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  }, [page, brandProducts.length]);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params;
    const brandId = params?.id || '';
    if (brandId) {
      setLoading(true);
      loadBrandInfo(brandId);
      loadProducts(brandId, true);
    } else {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    if (brandIdRef.current) {
      loadProducts(brandIdRef.current, false);
    }
  }, [loadingMore, hasMore, loadProducts]);

  if (loading && !brand) {
    return (
      <View className={styles.loading}>
        <Text className={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (!brand) {
    return (
      <View className={styles.loading}>
        <Text className={styles.loadingText}>品牌不存在</Text>
      </View>
    );
  }

  return (
    <ScrollView
      scrollY
      className={styles.brandDetailPage}
      onScrollToLower={loadMore}
      lowerThreshold={100}
    >
      <View className={styles.brandHeader}>
        <View className={styles.brandIconWrap}>
          <Image
            src={getBrandIcon(brand)}
            className={styles.brandIconImg}
            mode="aspectFit"
          />
        </View>
        <View className={styles.brandInfo}>
          <Text className={styles.brandName}>{brand.name}</Text>
          {brand.description ? (
            <Text className={styles.brandDesc}>{brand.description}</Text>
          ) : null}
          <View className={styles.brandStats}>
            <Text className={styles.statItem}>
              <Text className={styles.statNum}>{brand.productsCount}</Text>
              <Text className={styles.statLabel}>款商品</Text>
            </Text>
            <View className={styles.statDivider} />
            <Text className={styles.statItem}>
              <Text className={styles.statNum}>10万+</Text>
              <Text className={styles.statLabel}>粉丝</Text>
            </Text>
          </View>
        </View>
        {brand.isHot && (
          <View className={styles.hotBadge}>
            <Text className={styles.hotBadgeText}>热门品牌</Text>
          </View>
        )}
      </View>

      <View className={styles.productSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>品牌商品</Text>
          <Text className={styles.sectionMore}>
            {loadingMore ? '加载中...' : (hasMore ? '查看全部 ›' : '没有更多了')}
          </Text>
        </View>
        <View className={styles.productGrid}>
          {brandProducts.map((product) => (
            <View
              key={product.id}
              className={styles.productItem}
              onClick={() => goToProductDetail(product.id)}
            >
              <Image
                src={getImageUrl(product.images?.[0] || product.image)}
                className={styles.productImage}
                mode="aspectFill"
                {...lazyImgProps()}
              />
              <View className={styles.productInfo}>
                <Text className={styles.productName}>{product.name}</Text>
                <View className={styles.productPriceWrap}>
                  <Text className={styles.productPrice}>¥{product.price}</Text>
                  {product.originalPrice > product.price && (
                    <Text className={styles.productOriginalPrice}>¥{product.originalPrice}</Text>
                  )}
                </View>
                <Text className={styles.productSales}>已售 {product.sales}</Text>
              </View>
            </View>
          ))}
        </View>

        {brandProducts.length === 0 && !loadingMore && (
          <View className={styles.emptyProducts}>
            <Text className={styles.emptyText}>暂无商品</Text>
          </View>
        )}

        {loadingMore && brandProducts.length > 0 && (
          <View className={styles.emptyProducts}>
            <Text className={styles.emptyText}>加载中...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BrandDetailPage;
