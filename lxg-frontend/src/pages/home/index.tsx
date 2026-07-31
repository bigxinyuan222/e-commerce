import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { homeApi, categoryApi, brandApi } from '@/api/home';
import { getImageUrl, normalizeProductListImages, lazyImgProps } from '@/utils/image';
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
        <Text className={styles.currentPrice}>¥{product.price}</Text>
        {product.originalPrice && <Text className={styles.originalPrice}>¥{product.originalPrice}</Text>}
      </View>
      <Text className={styles.salesInfo}>已售 {product.sales || 0} 件</Text>
    </View>
  </View>
));

const BrandCard = React.memo(({ brand, onClick }: { brand: any; onClick: (id: string) => void }) => (
  <View 
    key={brand.id} 
    className={styles.brandItem}
    onClick={() => onClick(brand.id)}
  >
    <Image 
      src={getImageUrl(brand.logo || brand.image)} 
      className={styles.brandLogo} 
      mode="aspectFill" 
      {...lazyImgProps()}
    />
    <Text className={styles.brandName}>{brand.name}</Text>
  </View>
));

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
      <View className={styles.seckillPrice}>¥{product.seckillPrice || product.price}</View>
      {product.originalPrice && <View className={styles.originalPrice}>¥{product.originalPrice}</View>}
    </View>
    <View className={styles.seckillBtn}>抢</View>
  </View>
));

const CategoryNavItem = React.memo(({ category, onClick }: { category: any; onClick: (id?: string) => void }) => (
  <View 
    className={styles.categoryItem}
    onClick={() => onClick(category.id)}
  >
    <View className={styles.categoryIcon}>
      <Image src={getImageUrl(category.icon)} mode="aspectFill" {...lazyImgProps()} />
    </View>
    <Text className={styles.categoryName}>{category.name}</Text>
  </View>
));

const BannerItem = React.memo(({ banner, onSeckill, onProduct }: { 
  banner: any; 
  onSeckill: () => void;
  onProduct: (id: string) => void;
}) => (
  <SwiperItem key={banner.id}>
    <Image 
      src={getImageUrl(banner.image || banner.imageUrl)} 
      mode="aspectFill"
      {...lazyImgProps()}
      onClick={() => {
        if (banner.type === 'seckill') {
          onSeckill();
        } else if (banner.type === 'product') {
          onProduct(banner.targetId || '');
        }
      }}
    />
  </SwiperItem>
));

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

function extractRecommendProducts(data: any, tabKey: string): any[] {
  if (!data) return [];
  const slots = Array.isArray(data) ? data : data?.list || data?.data || [];
  if (slots.length === 0) return [];

  // 如果数组元素有 products 字段，说明是推荐位结构
  if (slots[0]?.products && Array.isArray(slots[0].products)) {
    const targetName = tabToSlotName[tabKey];
    const matchedSlot = targetName
      ? slots.find((s: any) => s.name === targetName || s.Name === targetName)
      : null;
    return matchedSlot?.products || slots[0]?.products || [];
  }

  // 否则直接当作商品数组
  return slots;
}

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommend');
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [banners, setBanners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [seckillActivity, setSeckillActivity] = useState<any>({ products: [], endTime: '' });
  const [hotBrands, setHotBrands] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
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

  const goToCategory = useCallback((categoryId?: string) => {
    if (categoryId) {
      Taro.navigateTo({ url: `/pages/category/index?id=${categoryId}` });
    } else {
      Taro.switchTab({ url: '/pages/category/index' });
    }
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
          apiGet(homeApi.activities).catch(() => null),
          apiGet(brandApi.brandTree).catch(() => null),
          apiGet(homeApi.recommendations, { type: 'recommend' }).catch(() => null),
        ]);

        if (bannerRes?.data) {
          setBanners(Array.isArray(bannerRes.data) ? bannerRes.data : []);
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

        if (seckillRes?.data) {
          const seckillData = seckillRes.data;
          setSeckillActivity({
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
          const productData = extractRecommendProducts(recommendRes.data, 'recommend');
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
  }, [activeTab]);

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
              autoplay
              interval={3000}
              circular
              indicatorColor="rgba(255,255,255,0.5)"
              indicatorActiveColor="#ffffff"
            >
              {banners.map((banner) => (
                <BannerItem 
                  key={banner.id}
                  banner={banner}
                  onSeckill={goToSeckill}
                  onProduct={goToProductDetail}
                />
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
                    onClick={goToProductDetail}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {recommendedProducts.length > 0 && (
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

            <View className={styles.productGrid}>
              {recommendedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onClick={goToProductDetail}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(HomePage);
