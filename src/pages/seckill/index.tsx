import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { seckillProducts } from '@/data/home';
import styles from './index.module.scss';

const SeckillPage: React.FC = () => {
  const [timeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  const goToProductDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/product-detail/index?id=${productId}` });
  };

  return (
    <View className={styles.seckillPage}>
      {/* 秒杀时间横幅 */}
      <View className={styles.banner}>
        <View className={styles.bannerLeft}>
          <Text className={styles.bannerTitle}>限时秒杀</Text>
          <View className={styles.countdown}>
            <Text className={styles.countdownLabel}>距结束</Text>
            <View className={styles.countdownTime}>
              <Text className={styles.timeNum}>{String(timeLeft.hours).padStart(2, '0')}</Text>
              <Text className={styles.timeSeparator}>:</Text>
              <Text className={styles.timeNum}>{String(timeLeft.minutes).padStart(2, '0')}</Text>
              <Text className={styles.timeSeparator}>:</Text>
              <Text className={styles.timeNum}>{String(timeLeft.seconds).padStart(2, '0')}</Text>
            </View>
          </View>
        </View>
        <View className={styles.bannerRight}>
          <Text className={styles.moreText}>更多秒杀</Text>
          <Text className={styles.arrow}>›</Text>
        </View>
      </View>

      {/* 秒杀商品列表 */}
      <ScrollView scrollX className={styles.productScroll}>
        <View className={styles.productList}>
          {seckillProducts.map((product) => (
            <View 
              key={product.id} 
              className={styles.productCard}
              onClick={() => goToProductDetail(product.id)}
            >
              <Image src={product.image} className={styles.productImage} mode="aspectFill" />
              <View className={styles.productInfo}>
                <Text className={styles.seckillPrice}>
                  <Text className={styles.priceSymbol}>¥</Text>
                  {product.seckillPrice}
                </Text>
                <Text className={styles.originalPrice}>¥{product.originalPrice}</Text>
              </View>
              <View className={styles.progressBar}>
                <View className={styles.progressFill} style={{ width: `${product.soldPercent}%` }} />
              </View>
              <Text className={styles.soldText}>已抢{product.soldPercent}%</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 品类秒杀 */}
      <View className={styles.categorySection}>
        <View className={styles.categoryHeader}>
          <Text className={styles.categoryTitle}>手机数码</Text>
          <View className={styles.moreLink}>
            <Text>查看更多</Text>
            <Text>›</Text>
          </View>
        </View>
        <View className={styles.categoryList}>
          {seckillProducts.slice(0, 3).map((product) => (
            <View 
              key={product.id} 
              className={styles.categoryItem}
              onClick={() => goToProductDetail(product.id)}
            >
              <Image src={product.image} className={styles.categoryImage} mode="aspectFill" />
              <Text className={styles.categoryPrice}>¥{product.seckillPrice}</Text>
              <Text className={styles.categoryOriginalPrice}>¥{product.originalPrice}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SeckillPage;
