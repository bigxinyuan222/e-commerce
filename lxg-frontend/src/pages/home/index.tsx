import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { homeApi, categoryApi, brandApi, productApi } from '@/api/home';
import { fetchSeckillActivities } from '@/api/seckill';
import { getImageUrl, normalizeProductListImages, lazyImgProps, getBrandIcon } from '@/utils/image';
import { getCategoryIcon } from '@/utils/categoryIcons';
import styles from '@/styles/home/home.module.scss';

const ProductCard = React.memo(({ product, onClick }: { product: any; onClick: (id: string) => void }) => (
  <View 
    className={styles.productCard}
    onClick={() => onClick(product.id)}
  >
    <Image 
      src={getImageUrl(product.images?.[0] || product.image)} 
      className={styles.productImage} 
      mode="aspectFill" 
      {...lazyImgProps()}
    />
    <View className={styles.productInfo}>
      <Text className={styles.productName}>{product.name}</Text>
      <View className={styles.productTags}>
        {product.tags?.slice(0, 1).map((tag: string) => (
          <Text key={tag} className={styles.tag}>{tag}</Text>
        ))}
      </View>
      <View className={styles.productPrice}>
        {product.price > 0 && <Text className={styles.currentPrice}>{product.price}</Text>}
        {product.originalPrice > 0 && product.originalPrice !== product.price && (
          <Text className={styles.originalPrice}>{product.originalPrice}</Text>
        )}
      </View>
      <Text className={styles.salesInfo}>已售 {product.sales || 0} 件</Text>
    </View>
  </View>
));

const BrandCard = React.memo(({ brand, onClick }: { brand: any; onClick: (id: string) => void }) => {
  const iconSrc = getBrandIcon(brand);
  return (
    <View
      key={brand.id}
      className={styles.brandItem}
      onClick={() => onClick(brand.id)}
    >
      <View className={styles.brandIconWrap}>
        <Image
          src={iconSrc}
          className={styles.brandIconImg}
          mode="aspectFit"
        />
      </View>
      <Text className={styles.brandName}>{brand.name}</Text>
    </View>
  );
});

const SeckillProductCard = React.memo(({ product, onClick }: { product: any; onClick: (id: string) => void }) => (
  <View 
    className={styles.seckillProduct}
    onClick={() => onClick(product.productId || product.id)}
  >
    <Image 
      src={getImageUrl(product.image || product.images?.[0])}
      className={styles.productImage}
      mode="aspectFill"
      {...lazyImgProps()}
    />
    <View className={styles.seckillPriceArea}>
      {(product.seckillPrice || product.price) > 0 && (
        <View className={styles.seckillPrice}>{product.seckillPrice || product.price}</View>
      )}
      {product.originalPrice > 0 && product.originalPrice !== (product.seckillPrice || product.price) && (
        <View className={styles.originalPrice}>{product.originalPrice}</View>
      )}
    </View>
    <View className={styles.seckillBtn}>抢</View>
  </View>
));

const CategoryNavItem = React.memo(({ category, onClick }: { category: any; onClick: (id?: string) => void }) => {
  const iconSrc = getCategoryIcon(category.name, category.icon);
  return (
    <View 
      className={styles.categoryItem}
      onClick={() => onClick(category.id)}
    >
      <View className={styles.categoryIcon}>
        <Image src={iconSrc} mode="aspectFit" className={styles.categoryIconImg} />
      </View>
      <Text className={styles.categoryName}>{category.name}</Text>
    </View>
  );
});



const recommendTabs = [
  { key: 'recommend', label: '精选' },
  { key: 'new', label: '新品' },
  { key: 'special', label: '特惠' },
  { key: 'digital', label: '数码' },
  { key: 'fashion', label: '服饰' },
];

const tabToSlotName: Record<string, string> = {
  recommend: '热门推荐',
  new: '新品上架',
  special: '特惠',
  digital: '数码',
  fashion: '服饰',
};

/**
 * 规范化推荐商品字段（兼容 camelCase / PascalCase / snake_case）
 */
function normalizeRecommendProduct(item: any): any {
  if (!item) return null;
  return {
    ...item,
    id: item.id ?? item.ID ?? item.productId ?? item.ProductId ?? '',
    name: item.name ?? item.Name ?? item.productName ?? item.ProductName ?? '',
    price: item.price ?? item.Price ?? item.salePrice ?? item.SalePrice ?? 0,
    originalPrice: item.originalPrice ?? item.OriginalPrice ?? item.marketPrice ?? item.MarketPrice ?? 0,
    images: item.images ?? item.Images ?? item.imageList ?? item.ImageList ?? [],
    image: item.image ?? item.Image ?? item.cover ?? item.Cover ?? '',
    sales: item.sales ?? item.Sales ?? item.soldCount ?? item.SoldCount ?? 0,
    tags: item.tags ?? item.Tags ?? item.tagList ?? [],
  };
}

function extractRecommendProducts(data: any, tabKey: string): any[] {
  if (!data) return [];
  const slots = Array.isArray(data) ? data : data?.list || data?.data || data?.slots || [];
  if (slots.length === 0) return [];

  // 推荐位结构：每项包含 name + products
  if (slots[0]?.products && Array.isArray(slots[0].products)) {
    const targetName = tabToSlotName[tabKey];
    let rawProducts: any[] = [];
    if (targetName) {
      const matchedSlot = slots.find((s: any) =>
        (s.name && s.name === targetName) ||
        (s.Name && s.Name === targetName) ||
        (s.slotName && s.slotName === targetName) ||
        (s.title && s.title === targetName) ||
        (s.key && s.key === tabKey) ||
        (s.type && s.type === tabKey)
      );
      if (matchedSlot?.products) {
        rawProducts = matchedSlot.products;
      }
    }
    // 找不到对应 slot 时，返回第一个推荐位的商品兜底
    if (!rawProducts.length) {
      rawProducts = slots[0]?.products || [];
    }
    return rawProducts.map(normalizeRecommendProduct).filter(Boolean);
  }

  // 如果 slots 本身就是商品列表，也做字段规范化
  return slots.map(normalizeRecommendProduct).filter(Boolean);
}

function extractAllRecommendSlots(data: any): any[] {
  if (!data) return [];
  return Array.isArray(data) ? data : data?.list || data?.data || data?.slots || [];
}

/**
 * 推荐位商品仅返回 productId（thin reference 契约），
 * 需批量调用 /product/detail 补全商品详情后合并回推荐位。
 */
async function enrichRecommendSlots(slots: any[]): Promise<any[]> {
  if (!slots || slots.length === 0) return slots;

  // 收集所有需要补全的 productId（跳过已有完整信息的商品）
  const productIdsToFetch: number[] = [];
  const slotProductIndexMap: { slotIdx: number; productIdx: number; productId: number }[] = [];

  slots.forEach((slot: any, sIdx: number) => {
    if (!slot.products || !Array.isArray(slot.products)) return;
    slot.products.forEach((p: any, pIdx: number) => {
      const pid = p.productId ?? p.ProductId ?? p.product_id ?? p.ID;
      // 已有 name 和 images 的商品无需再查
      if (pid && (!p.name || (!p.images && !p.image))) {
        productIdsToFetch.push(pid);
        slotProductIndexMap.push({ slotIdx: sIdx, productIdx: pIdx, productId: pid });
      }
    });
  });

  if (productIdsToFetch.length === 0) return slots;

  // 批量请求商品详情（并发，单个失败不影响其他）
  const detailResults = await Promise.all(
    [...new Set(productIdsToFetch)].map(pid =>
      apiGet(productApi.detail, { id: pid })
        .then(res => ({ pid, data: res?.data || null }))
        .catch(() => ({ pid, data: null }))
    )
  );

  // 构建 productId -> 商品详情 映射
  const detailMap = new Map<number, any>();
  detailResults.forEach(({ pid, data }) => {
    if (data) detailMap.set(pid, data);
  });

  // 将详情合并回 slots（保留原始 productId 字段）
  const enrichedSlots = slots.map((slot: any) => ({
    ...slot,
    products: (slot.products || []).map((p: any) => {
      const pid = p.productId ?? p.ProductId ?? p.product_id ?? p.ID;
      const detail = detailMap.get(pid);
      if (!detail) return normalizeRecommendProduct(p);
      return normalizeRecommendProduct({
        ...p,
        ...detail,
        id: detail.id ?? pid,
        name: detail.name ?? '',
        price: detail.price ?? 0,
        originalPrice: detail.originalPrice ?? detail.marketPrice ?? 0,
        images: detail.images || [],
        image: detail.image ?? detail.images?.[0] ?? '',
        sales: detail.sales ?? 0,
      });
    }),
  }));

  return enrichedSlots;
}

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommend');
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [seckillActivity, setSeckillActivity] = useState<any>({ products: [], endTime: '' });
  const [hotBrands, setHotBrands] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  // 推荐位原始数据缓存（新接口返回推荐位+商品结构，切换tab时无需重复请求）
  const [recommendSlotsCache, setRecommendSlotsCache] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSearch = useCallback(() => {
    Taro.navigateTo({ url: '/pages/home/search/index' });
  }, []);

  const goToProductDetail = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  }, []);

  const goToSeckill = useCallback(() => {
    Taro.navigateTo({ url: '/pages/home/seckill/index' });
  }, []);

  // 秒杀商品点击：携带活动ID与秒杀标识进入详情页
  const goToSeckillProductDetail = useCallback((productId: string) => {
    const activityId = seckillActivity.id || '';
    Taro.navigateTo({
      url: `/pages/home/detail/index?id=${productId}&seckill=1${activityId ? `&activityId=${activityId}` : ''}`
    });
  }, [seckillActivity.id]);

  const goToCategory = useCallback((categoryId?: string) => {
    if (categoryId) {
      Taro.setStorageSync('targetCategoryId', categoryId);
    } else {
      Taro.removeStorageSync('targetCategoryId');
    }
    Taro.switchTab({ url: '/pages/category/index' });
  }, []);

  const goToBrands = useCallback(() => {
    Taro.navigateTo({ url: '/pages/home/brands/index' });
  }, []);

  const goToBrandDetail = useCallback((brandId: string) => {
    Taro.navigateTo({ url: `/pages/home/brand-detail/index?id=${brandId}` });
  }, []);

  // 加载首页数据
  const loadData = async () => {
      setLoading(true);
      try {
        const [bannerRes, categoryRes, seckillRes, brandRes, recommendRes] = await Promise.all([
          apiGet(homeApi.banners).catch(() => null),
          apiGet(categoryApi.categoryTree).catch(() => null),
          fetchSeckillActivities({ status: 'active' }).catch(() => null),
          apiGet(brandApi.brandTree).catch(() => null),
          apiGet(homeApi.recommendations).catch(() => null),
        ]);

        if (bannerRes?.data) {
          const rawBanners = Array.isArray(bannerRes.data)
            ? bannerRes.data
            : bannerRes.data?.list || bannerRes.data?.data || bannerRes.data?.banners || [];
          const normalized = rawBanners.map((item: any) => ({
            id: item.id ?? item.ID ?? item.bannerId ?? String(Math.random()),
            image: item.image ?? item.Image ?? item.imageUrl ?? item.ImageUrl ?? item.pic ?? item.Pic ?? '',
            type: item.type ?? item.Type ?? item.linkType ?? '',
            targetId: item.targetId ?? item.TargetId ?? item.productId ?? item.linkId ?? '',
          }));
          setBanners(normalized);
        }

        if (categoryRes?.data) {
          const rawData = Array.isArray(categoryRes.data) ? categoryRes.data : categoryRes.data?.list || categoryRes.data?.data || [];
          const catData = rawData.map((item: any) => ({
            id: item.id ?? item.ID ?? item.categoryId ?? '',
            name: item.name ?? item.Name ?? item.categoryName ?? '',
            icon: item.icon ?? item.Icon ?? item.image ?? item.Image ?? '',
          }));
          setCategories(catData.slice(0, 8));
        }

        if (seckillRes?.data && Array.isArray(seckillRes.data) && seckillRes.data.length > 0) {
          // 首页取第一个活动展示
          const seckillData = seckillRes.data[0];
          setSeckillActivity({
            id: seckillData.id || '',
            products: seckillData.products || [],
            endTime: seckillData.endTime || new Date(Date.now() + 3600000).toISOString()
          });
        }

        if (brandRes?.data) {
          // 品牌树返回数据规范化：兼容多字段命名，过滤占位符 logo
          const rawData = Array.isArray(brandRes.data) ? brandRes.data : brandRes.data?.list || brandRes.data?.data || [];
          const normalized = rawData.map((item: any) => {
            const id = item.id ?? item.ID ?? item.brandId ?? item.BrandId ?? item.code ?? item.Code ?? '';
            const name = item.name ?? item.Name ?? item.brandName ?? item.BrandName ?? '';
            const logo = item.logo ?? item.Logo ?? item.icon ?? item.Icon ?? item.image ?? item.Image ?? '';
            return { id: String(id), name, logo: getImageUrl(logo) };
          }).filter((b: any) => b.id && b.name);
          setHotBrands(normalized.slice(0, 10));
        }

        if (recommendRes?.data) {
          // 推荐位接口返回 thin reference（仅 productId），需批量补全商品详情
          const rawSlots = extractAllRecommendSlots(recommendRes.data);
          const enrichedSlots = await enrichRecommendSlots(rawSlots);
          // 缓存补全后的推荐位数据，后续 tab 切换可直接使用
          if (enrichedSlots.length > 0 && enrichedSlots[0]?.products) {
            setRecommendSlotsCache(enrichedSlots);
          }
          const productData = extractRecommendProducts(enrichedSlots, 'recommend');
          setRecommendedProducts(normalizeProductListImages(productData));
        }
      } catch (error) {
        console.error('Failed to load home data:', error);
        Taro.showToast({ title: '加载失败，下拉刷新', icon: 'none' });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const loadRecommendProducts = async () => {
      try {
        // 优先使用缓存的推荐位数据（新 /homepage/recommendations 接口一次返回所有推荐位）
        if (recommendSlotsCache && recommendSlotsCache.length > 0) {
          const productData = extractRecommendProducts(recommendSlotsCache, activeTab);
          setRecommendedProducts(normalizeProductListImages(productData));
          return;
        }
        // 首次加载默认 tab 时，loadData 已经在处理推荐数据，无需重复请求
        if (activeTab === 'recommend') return;
        // 非默认 tab 且缓存未命中时，兜底请求单 tab 数据
        const res = await apiGet(homeApi.recommendations, { type: activeTab });
        if (res?.data) {
          const productData = extractRecommendProducts(res.data, activeTab);
          setRecommendedProducts(normalizeProductListImages(productData));
        }
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      }
    };

    loadRecommendProducts();
  }, [activeTab, recommendSlotsCache]);

  useEffect(() => {
    if (!seckillActivity.endTime) return;
    
    const endTime = new Date(seckillActivity.endTime).getTime();
    
    const calculateCountdown = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    calculateCountdown();
    timerRef.current = setInterval(calculateCountdown, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [seckillActivity.endTime]);

  const displayCategories = useMemo(() => categories.slice(0, 8), [categories]);

  if (loading) {
    return (
      <View className={styles.homePage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.homePage}>
      <View className={styles.header}>
        <View className={styles.searchBox} onClick={goToSearch}>
          <Text className={styles.searchText}>搜索商品/店铺</Text>
        </View>
      </View>

      <ScrollView 
        scrollY 
        className={styles.content}
        enhanced
        showScrollbar={false}
      >
        {banners.length > 0 && (
          <View className={styles.banner}>
            <Swiper
              autoplay={banners.length > 1}
              interval={3000}
              circular={banners.length > 1}
              indicatorColor="rgba(255,255,255,0.5)"
              indicatorActiveColor="#ffffff"
            >
              {banners.map((banner) => (
                <SwiperItem key={banner.id}>
                  <Image
                    src={getImageUrl(banner.image || banner.imageUrl)}
                    mode="aspectFill"
                    {...lazyImgProps()}
                    onClick={() => {
                      if (banner.type === 'seckill') {
                        goToSeckill();
                      } else if (banner.type === 'product') {
                        goToProductDetail(banner.targetId || '');
                      }
                    }}
                  />
                </SwiperItem>
              ))}
            </Swiper>
          </View>
        )}

        {displayCategories.length > 0 && (
          <View className={styles.categoryNavWrap}>
            <ScrollView scrollX className={styles.categoryNav} showScrollbar={false}>
              <View className={styles.categoryNavInner}>
                {displayCategories.map((category) => (
                  <CategoryNavItem 
                    key={category.id} 
                    category={category}
                    onClick={goToCategory}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {hotBrands.length > 0 && (
          <View className={styles.brandsSection}>
            <View className={styles.brandsHeader} onClick={goToBrands}>
              <View className={styles.brandsTitleWrap}>
                <Text className={styles.brandsTitle}>品牌馆</Text>
                <Text className={styles.brandsSubtitle}>精选品牌</Text>
              </View>
              <Text className={styles.brandsMore}>更多 ›</Text>
            </View>
            <ScrollView scrollX className={styles.brandsList} showScrollbar={false}>
              {hotBrands.map((brand) => (
                <BrandCard 
                  key={brand.id}
                  brand={brand}
                  onClick={goToBrandDetail}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {seckillActivity.products.length > 0 && (
          <View className={styles.activitySection}>
            <View className={styles.seckillArea}>
              <View className={styles.seckillHeader}>
                <View>
                  <Text className={styles.seckillTitle}>限时秒杀</Text>
                  <Text className={styles.seckillSubtitle}>爆款限时抢</Text>
                </View>
                <View className={styles.seckillHeaderRight}>
                  <View className={styles.countdown}>
                    <Text>距结束</Text>
                    <Text className={styles.countdownItem}>{countdown.hours}</Text>
                    <Text>:</Text>
                    <Text className={styles.countdownItem}>{countdown.minutes}</Text>
                    <Text>:</Text>
                    <Text className={styles.countdownItem}>{countdown.seconds}</Text>
                  </View>
                  <View className={styles.seckillArrow} onClick={goToSeckill}>
                    <Text className={styles.arrowIcon}>›</Text>
                  </View>
                </View>
              </View>
              <ScrollView scrollX className={styles.seckillProducts} showScrollbar={false}>
                {seckillActivity.products.map((product) => (
                  <SeckillProductCard
                    key={product.id || product.productId}
                    product={product}
                    onClick={goToSeckillProductDetail}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        <View className={styles.recommendSection}>
            <View className={styles.recommendHeader}>
              <View className={styles.recommendLine} />
              <Text className={styles.recommendTitle}>精选推荐</Text>
              <View className={styles.recommendLine} />
            </View>

            <View className={styles.recommendTabs}>
              {recommendTabs.map((tab) => (
                <View
                  key={tab.key}
                  className={`${styles.recommendTab} ${activeTab === tab.key ? styles.recommendTabActive : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <Text className={styles.recommendTabText}>{tab.label}</Text>
                </View>
              ))}
            </View>

            {recommendedProducts.length > 0 ? (
              <View className={styles.productGrid}>
                {recommendedProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onClick={goToProductDetail}
                  />
                ))}
              </View>
            ) : (
              <View style={{ padding: '60rpx', textAlign: 'center', color: '#999' }}>
                <Text>该分类暂无商品</Text>
              </View>
            )}
          </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(HomePage);
