import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { banners, categories, seckillActivity } from '@/data/common/home';
import { getRecommendedProducts, getProductsByRecommendType } from '@/data/product/products';
import { getHotBrands } from '@/data/product/brands';
import styles from '@/styles/home/home.module.scss';

// 商品卡片组件 - 使用 memo 避免不必要渲染
const ProductCard = React.memo(({ product, onClick }: { product: any; onClick: (id: string) => void }) => (
  <View 
    className={styles.productCard}
    onClick={() => onClick(product.id)}
  >
    <Image 
      src={product.images[0]} 
      className={styles.productImage} 
      mode="aspectFill" 
      lazyLoad
    />
    <View className={styles.productInfo}>
      <Text className={styles.productName}>{product.name}</Text>
      <View className={styles.productTags}>
        {product.tags.slice(0, 1).map((tag: string) => (
          <Text key={tag} className={styles.tag}>{tag}</Text>
        ))}
      </View>
      <View className={styles.productPrice}>
        <Text className={styles.currentPrice}>{product.price}</Text>
        <Text className={styles.originalPrice}>{product.originalPrice}</Text>
      </View>
      <Text className={styles.salesInfo}>已售 {product.sales} 件</Text>
    </View>
  </View>
));

// 品牌卡片组件
const BrandCard = React.memo(({ brand, onClick }: { brand: any; onClick: (id: string) => void }) => (
  <View 
    key={brand.id} 
    className={styles.brandItem}
    onClick={() => onClick(brand.id)}
  >
    <Image 
      src={brand.logo} 
      className={styles.brandLogo} 
      mode="aspectFill" 
      lazyLoad
    />
    <Text className={styles.brandName}>{brand.name}</Text>
  </View>
));

// 秒杀商品组件
const SeckillProductCard = React.memo(({ product, onClick }: { product: any; onClick: (id: string) => void }) => (
  <View 
    className={styles.seckillProduct}
    onClick={() => onClick(product.productId)}
  >
    <View className={styles.productImage} style={{ backgroundImage: `url(${product.image})` }} />
    <View className={styles.seckillPriceArea}>
      <View className={styles.seckillPrice}>{product.seckillPrice}</View>
      <View className={styles.originalPrice}>{product.originalPrice}</View>
    </View>
    <View className={styles.seckillBtn}>抢</View>
  </View>
));

// 分类导航组件
const CategoryNavItem = React.memo(({ category, onClick }: { category: any; onClick: (id?: string) => void }) => (
  <View 
    className={styles.categoryItem}
    onClick={() => onClick(category.id)}
  >
    <View className={styles.categoryIcon}>
      <Image src={category.icon} mode="aspectFill" lazyLoad />
    </View>
    <Text className={styles.categoryName}>{category.name}</Text>
  </View>
));

// 轮播图组件
const BannerItem = React.memo(({ banner, onSeckill, onProduct }: { 
  banner: any; 
  onSeckill: () => void;
  onProduct: (id: string) => void;
}) => (
  <SwiperItem key={banner.id}>
    <Image 
      src={banner.image} 
      mode="aspectFill"
      lazyLoad
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

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommend');
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const hotBrands = useMemo(() => getHotBrands(), []);
  
  const recommendedProducts = useMemo(() => {
    if (activeTab === 'recommend') {
      return getRecommendedProducts();
    }
    return getProductsByRecommendType(activeTab);
  }, [activeTab]);

  // 使用 useCallback 缓存事件处理函数
  const goToSearch = useCallback(() => {
    Taro.navigateTo({ url: '/pages/home/search/index' });
  }, []);

  const goToProductDetail = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  }, []);

  const goToSeckill = useCallback(() => {
    Taro.navigateTo({ url: '/pages/home/seckill/index' });
  }, []);

  const goToSeckillProduct = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}&seckill=1` });
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

  // 计算秒杀倒计时 - 使用 useMemo 缓存 endTime
  const endTime = useMemo(() => new Date(seckillActivity.endTime).getTime(), []);

  useEffect(() => {
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
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // 缓存分类数据，只取前8个
  const displayCategories = useMemo(() => categories.slice(0, 8), []);

  return (
    <View className={styles.homePage}>
      {/* 顶部搜索区域 */}
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
        {/* 轮播图 */}
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

        {/* 分类导航 */}
        <View className={styles.categoryNav}>
          {displayCategories.map((category) => (
            <CategoryNavItem 
              key={category.id} 
              category={category}
              onClick={goToCategory}
            />
          ))}
        </View>

        {/* 品牌馆入口 */}
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

        {/* 秒杀活动 */}
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
            <View className={styles.seckillProducts}>
              {seckillActivity.products.map((product) => (
                <SeckillProductCard 
                  key={product.id}
                  product={product}
                  onClick={goToSeckillProduct}
                />
              ))}
            </View>
          </View>
        </View>

        {/* 推荐商品 */}
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
      </ScrollView>
    </View>
  );
};

export default React.memo(HomePage);