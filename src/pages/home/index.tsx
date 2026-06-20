import React, { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { banners, categories, seckillActivity, groupBuyActivities } from '@/data/home';
import { getRecommendedProducts } from '@/data/products';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const [recommendedProducts] = useState(getRecommendedProducts());
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });

  // 计算秒杀倒计时
  useEffect(() => {
    const calculateCountdown = () => {
      const endTime = new Date(seckillActivity.endTime).getTime();
      const now = new Date().getTime();
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
  }, []);

  // 跳转到搜索页
  const goToSearch = () => {
    Taro.navigateTo({ url: '/pages/search/index' });
  };

  // 跳转到商品详情
  const goToProductDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/product-detail/index?id=${productId}` });
  };

  // 跳转到秒杀活动
  const goToSeckill = () => {
    Taro.navigateTo({ url: '/pages/seckill/index' });
  };

  // 跳转到拼团活动
  const goToGroupBuy = () => {
    Taro.navigateTo({ url: '/pages/group-buy/index' });
  };

  // 跳转到分类页
  const goToCategory = (categoryId?: string) => {
    if (categoryId) {
      // 使用 reLaunch 确保页面重新加载，读取URL参数
      Taro.reLaunch({ url: `/pages/category/index?id=${categoryId}` });
    } else {
      Taro.switchTab({ url: '/pages/category/index' });
    }
  };

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
      >
        {/* 轮播图 */}
        <View className={styles.banner}>
          <Swiper
            autoplay
            interval={3000}
            circular
          >
            {banners.map((banner) => (
              <SwiperItem key={banner.id}>
                <Image 
                  src={banner.image} 
                  mode="aspectFill"
                  onClick={() => {
                    if (banner.type === 'seckill') {
                      goToSeckill();
                    } else if (banner.type === 'groupbuy') {
                      goToGroupBuy();
                    } else if (banner.type === 'product') {
                      goToProductDetail(banner.targetId || '');
                    }
                  }}
                />
              </SwiperItem>
            ))}
          </Swiper>
        </View>

        {/* 分类导航 */}
        <View className={styles.categoryNav}>
          {categories.slice(0, 8).map((category) => (
            <View 
              key={category.id} 
              className={styles.categoryItem}
              onClick={() => goToCategory(category.id)}
            >
              <View className={styles.categoryIcon}>
                <Image src={category.icon} mode="aspectFill" />
              </View>
              <Text className={styles.categoryName}>{category.name}</Text>
            </View>
          ))}
        </View>

        {/* 秒杀活动 */}
        <View className={styles.activitySection}>
          <View className={styles.seckillArea}>
            <View className={styles.seckillHeader}>
              <View>
                <Text className={styles.seckillTitle}>限时秒杀</Text>
                <Text className={styles.seckillSubtitle}>爆款限时抢</Text>
              </View>
              <View className={styles.countdown}>
                <Text>距结束</Text>
                <Text className={styles.countdownItem}>{countdown.hours}</Text>
                <Text>:</Text>
                <Text className={styles.countdownItem}>{countdown.minutes}</Text>
                <Text>:</Text>
                <Text className={styles.countdownItem}>{countdown.seconds}</Text>
              </View>
            </View>
            <View className={styles.seckillProducts}>
              {seckillActivity.products.map((product) => (
                <View 
                  key={product.id} 
                  className={styles.seckillProduct}
                  onClick={() => goToProductDetail(product.productId)}
                >
                  <View className={styles.productImage} style={{ backgroundImage: `url(${product.image})` }} />
                  <View className={styles.seckillPrice}>{product.seckillPrice}</View>
                  <View className={styles.originalPrice}>{product.originalPrice}</View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 拼团活动 */}
        <View className={styles.activitySection}>
          <View className={styles.groupBuyArea}>
            <View className={styles.groupBuyHeader}>
              <View>
                <Text className={styles.groupBuyTitle}>拼团</Text>
                <Text className={styles.groupBuySubtitle}>邀请好友一起买</Text>
              </View>
              <View className={styles.remainCount}>
                还差 {groupBuyActivities[0]?.remainCount || 0} 人成团
              </View>
            </View>
            <View className={styles.groupBuyProducts}>
              {groupBuyActivities.map((product) => (
                <View 
                  key={product.id} 
                  className={styles.groupBuyProduct}
                  onClick={() => goToProductDetail(product.productId)}
                >
                  <View className={styles.productImage} style={{ backgroundImage: `url(${product.image})` }} />
                  <View className={styles.groupBuyPrice}>
                    {product.groupPrice}
                    <Text className={styles.groupTag}>拼团</Text>
                  </View>
                  <View className={styles.originalPrice}>{product.originalPrice}</View>
                </View>
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

          <View className={styles.productGrid}>
            {recommendedProducts.map((product) => (
              <View 
                key={product.id} 
                className={styles.productCard}
                onClick={() => goToProductDetail(product.id)}
              >
                <Image src={product.images[0]} className={styles.productImage} mode="aspectFill" />
                <View className={styles.productInfo}>
                  <Text className={styles.productName}>{product.name}</Text>
                  <View className={styles.productTags}>
                    {product.tags.slice(0, 1).map((tag) => (
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
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
