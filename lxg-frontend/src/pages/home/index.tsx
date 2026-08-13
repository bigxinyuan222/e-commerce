import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import Taro, { useDidHide } from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { homeApi, categoryApi, brandApi } from '@/api/home';
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
        <Text className={styles.priceSymbol}>¥</Text>
        <Text className={styles.currentPrice}>{product.price}</Text>
        {product.originalPrice > 0 && product.originalPrice !== product.price && (
          <Text className={styles.originalPrice}>¥{product.originalPrice}</Text>
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

const SeckillProductCard = React.memo(({ product, onClick }: { product: any; onClick: (id: string) => void }) => {
  const soldPercent = Math.min(
    Math.max(Number(product.soldPercent ?? product.sold_percent ?? 0), 0),
    100
  );
  const soldText = soldPercent > 0 ? `已抢${soldPercent}%` : '热卖中';
  return (
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
      <Text className={styles.seckillName}>{product.productName || product.name || '秒杀商品'}</Text>
      <View className={styles.seckillPriceArea}>
        {(product.seckillPrice || product.price) > 0 && (
          <View className={styles.seckillPrice}>¥{product.seckillPrice || product.price}</View>
        )}
        {product.originalPrice > 0 && product.originalPrice !== (product.seckillPrice || product.price) && (
          <View className={styles.originalPrice}>¥{product.originalPrice}</View>
        )}
      </View>
      <View className={styles.seckillProgress}>
        <View className={styles.seckillProgressBar} style={{ width: `${soldPercent}%` }} />
      </View>
      <Text className={styles.seckillProgressText}>{soldText}</Text>
      <View className={styles.seckillBtn}>马上抢</View>
    </View>
  );
});

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



/**
 * 规范化推荐商品字段（兼容 camelCase / PascalCase / snake_case）
 * 新接口 /product/recommend 已返回完整商品数据，无需再调用 /product/detail 补全
 */
function normalizeRecommendProduct(item: any): any {
  if (!item) return null;
  const id = item.id ?? item.ID ?? item.productId ?? item.ProductId ?? '';
  return {
    ...item,
    id: id !== '' ? String(id) : '',
    name: item.name ?? item.Name ?? item.productName ?? item.ProductName ?? '',
    price: item.price ?? item.Price ?? item.salePrice ?? item.SalePrice ?? 0,
    originalPrice: item.originalPrice ?? item.OriginalPrice ?? item.marketPrice ?? item.MarketPrice ?? 0,
    images: item.images ?? item.Images ?? item.imageList ?? item.ImageList ?? [],
    image: item.image ?? item.Image ?? item.cover ?? item.Cover ?? '',
    sales: item.sales ?? item.Sales ?? item.soldCount ?? item.SoldCount ?? 0,
    tags: item.tags ?? item.Tags ?? item.tagList ?? [],
  };
}

/**
 * 规范化推荐位结构:统一字段命名,products 做字段兼容
 */
function normalizeRecommendSlot(slot: any): any {
  if (!slot) return null;
  const id = slot.id ?? slot.ID ?? slot.slotId ?? '';
  const name = slot.name ?? slot.Name ?? slot.slotName ?? slot.title ?? '';
  const rawProducts = Array.isArray(slot.products) ? slot.products
    : (Array.isArray(slot.Products) ? slot.Products
      : (Array.isArray(slot.items) ? slot.items : []));
  return {
    ...slot,
    id: id !== '' ? id : name,  // 兜底用 name 作为 key
    name,
    products: rawProducts.map(normalizeRecommendProduct).filter(Boolean),
  };
}

function extractAllRecommendSlots(data: any): any[] {
  if (!data) return [];
  const slots = Array.isArray(data) ? data : data?.list || data?.data || data?.slots || [];
  return slots.map(normalizeRecommendSlot).filter((s: any) => s && s.name);
}

const HomePage: React.FC = () => {
  // 当前选中的推荐位 id（动态 tab，初始为 null，加载后默认选中第一个推荐位）
  const [activeSlotId, setActiveSlotId] = useState<string | number | null>(null);
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [seckillActivity, setSeckillActivity] = useState<any>({ products: [], endTime: '' });
  const [hotBrands, setHotBrands] = useState<any[]>([]);
  // 所有推荐位数据（一次请求获取，切换 tab 直接从缓存取商品）
  const [recommendSlots, setRecommendSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 动态推荐位 tab 列表（由接口返回的推荐位生成）
  const recommendTabs = useMemo(() => {
    return recommendSlots.map(slot => ({
      key: slot.id,
      label: slot.name,
    }));
  }, [recommendSlots]);

  // 当前推荐位的商品（由 activeSlotId 从推荐位缓存计算得出，无需重复请求）
  const recommendedProducts = useMemo(() => {
    if (recommendSlots.length === 0 || activeSlotId === null) return [];
    const slot = recommendSlots.find(s => s.id === activeSlotId);
    if (!slot) return [];
    return normalizeProductListImages(slot.products || []);
  }, [recommendSlots, activeSlotId]);

  const goToSearch = useCallback(() => {
    Taro.navigateTo({ url: '/pages/home/search/index' });
  }, []);

  const goToProductDetail = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  }, []);

  const goToSeckill = useCallback(() => {
    Taro.navigateTo({ url: '/pages/home/seckill/index' });
  }, []);

  // 秒杀商品点击：有真实活动则携带秒杀标识，兜底推荐商品走普通详情
  const goToSeckillProductDetail = useCallback((productId: string) => {
    const activityId = seckillActivity.id || '';
    if (activityId) {
      Taro.navigateTo({
        url: `/pages/home/detail/index?id=${productId}&seckill=1&activityId=${activityId}`
      });
    } else {
      goToProductDetail(productId);
    }
  }, [seckillActivity.id, goToProductDetail]);

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
      setError(null);
      try {
        const [bannerRes, categoryRes, seckillRes, brandRes, recommendRes] = await Promise.all([
          apiGet(homeApi.banners).catch(() => null),
          apiGet(categoryApi.categoryTree).catch(() => null),
          fetchSeckillActivities({ status: 'active' }).catch(() => null),
          apiGet(brandApi.brandTree).catch(() => null),
          apiGet(homeApi.recommend).catch(() => null),
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

        // 构造秒杀兜底商品：从推荐商品取前 3 个
        const makeFallbackProducts = () => {
          const fallbackSlots = recommendRes?.data ? extractAllRecommendSlots(recommendRes.data) : [];
          return fallbackSlots
            .flatMap((slot: any) => slot?.products || [])
            .filter(Boolean)
            .slice(0, 3)
            .map((item: any) => ({
              ...item,
              productId: item.id || item.productId,
              seckillPrice: item.price ?? item.seckillPrice ?? 0,
              originalPrice: item.originalPrice ?? item.marketPrice ?? 0,
              image: item.image || (item.images?.[0]),
            }));
        };

        if (seckillRes?.data && Array.isArray(seckillRes.data) && seckillRes.data.length > 0) {
          // 接口返回有效活动，取第一个展示；若活动本身没有商品，则用推荐商品兜底
          const seckillData = seckillRes.data[0];
          const realProducts = seckillData.products || [];
          setSeckillActivity({
            id: seckillData.id || '',
            products: realProducts.length > 0 ? realProducts : makeFallbackProducts(),
            endTime: seckillData.endTime || new Date(Date.now() + 3600000).toISOString()
          });
        } else {
          // 接口无活动数据，直接用推荐商品兜底
          setSeckillActivity({
            id: '',
            products: makeFallbackProducts(),
            endTime: ''
          });
        }

        if (brandRes?.data) {
          // 品牌树返回数据规范化：兼容多字段命名，过滤占位符 logo
          const rawData = Array.isArray(brandRes.data) ? brandRes.data : brandRes.data?.list || brandRes.data?.data || [];
          const normalized = rawData.map((item: any) => {
            const id = item.id ?? item.ID ?? item.brandId ?? item.BrandId ?? item.code ?? item.Code ?? '';
            const name = item.name ?? item.Name ?? item.brandName ?? item.BrandName ?? '';
            const logo = item.logo ?? item.Logo ?? item.icon ?? item.Icon ?? item.image ?? item.Image ?? '';
            // 保留原始 logo，交由 getBrandIcon 判断占位符域名并回退到本地 SVG 图标
            // 若先用 getImageUrl 处理，占位符域名会被替换成无效的默认占位图 URL，导致本地 SVG 兜底失效
            return { id: String(id), name, logo };
          }).filter((b: any) => b.id && b.name);
          setHotBrands(normalized.slice(0, 10));
        }

        if (recommendRes?.data) {
          // 新接口 /product/recommend 一次返回所有推荐位及完整商品数据，无需再补全详情
          const slots = extractAllRecommendSlots(recommendRes.data);
          setRecommendSlots(slots);
          // 默认选中第一个推荐位
          if (slots.length > 0) {
            setActiveSlotId(slots[0].id);
          }
        }
      } catch (err: any) {
        console.error('Failed to load home data:', err);
        const msg = err?.message || '加载失败，请下拉刷新重试';
        setError(msg);
        Taro.showToast({ title: msg, icon: 'none' });
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadData();
  }, []);

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
        timerRef.current = null;
      }
    };
  }, [seckillActivity.endTime]);

  // 页面隐藏时立即清除定时器，避免微信框架内部页面帧已销毁导致 __subPageFrameEndTime__ 报错
  useDidHide(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  });

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
                    mode="scaleToFill"
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
            {displayCategories.length > 5 ? (
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
            ) : (
              <View className={styles.categoryNavFill}>
                <View className={styles.categoryNavInner}>
                  {displayCategories.map((category) => (
                    <CategoryNavItem
                      key={category.id}
                      category={category}
                      onClick={goToCategory}
                    />
                  ))}
                </View>
              </View>
            )}
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
            <View className={styles.brandsList}>
              {hotBrands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  onClick={goToBrandDetail}
                />
              ))}
            </View>
          </View>
        )}

        <View className={styles.activitySection}>
          <View className={styles.seckillArea}>
            <View className={styles.seckillHeader}>
              <View>
                <Text className={styles.seckillTitle}>限时秒杀</Text>
                <Text className={styles.seckillSubtitle}>爆款限时抢</Text>
              </View>
              <View className={styles.seckillHeaderRight}>
                {seckillActivity.id ? (
                  <View className={styles.countdown}>
                    <Text>距结束</Text>
                    <Text className={styles.countdownItem}>{countdown.hours}</Text>
                    <Text>:</Text>
                    <Text className={styles.countdownItem}>{countdown.minutes}</Text>
                    <Text>:</Text>
                    <Text className={styles.countdownItem}>{countdown.seconds}</Text>
                  </View>
                ) : (
                  <Text className={styles.seckillTag}>精选好物</Text>
                )}
                <View className={styles.seckillArrow} onClick={goToSeckill}>
                  <Text className={styles.arrowIcon}>›</Text>
                </View>
              </View>
            </View>
            {seckillActivity.products.length > 0 && (
              <ScrollView scrollX className={styles.seckillProducts} showScrollbar={false}>
                {seckillActivity.products.map((product) => (
                  <SeckillProductCard
                    key={product.id || product.productId}
                    product={product}
                    onClick={goToSeckillProductDetail}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </View>

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
                  className={`${styles.recommendTab} ${activeSlotId === tab.key ? styles.recommendTabActive : ''}`}
                  onClick={() => setActiveSlotId(tab.key)}
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
                <Text>该推荐位暂无商品</Text>
              </View>
            )}
          </View>

        {!banners.length && !displayCategories.length && !hotBrands.length && !seckillActivity.products.length && !recommendedProducts.length && !loading && (
          <View style={{ padding: '200rpx 40rpx', textAlign: 'center' }}>
            <Text style={{ color: '#999', fontSize: '28rpx', lineHeight: '1.6' }}>
              {error || '首页内容为空，请下拉刷新重试'}
            </Text>
            <View
              style={{
                marginTop: '32rpx',
                display: 'inline-block',
                padding: '16rpx 48rpx',
                background: 'linear-gradient(135deg, #e2231a 0%, #ff7d00 100%)',
                borderRadius: '40rpx',
              }}
              onClick={loadData}
            >
              <Text style={{ color: '#fff', fontSize: '28rpx' }}>重新加载</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(HomePage);
