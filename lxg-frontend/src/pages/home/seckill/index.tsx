import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { seckillProducts } from '@/data/common/home';
import styles from '@/styles/home/seckill.module.scss';

const SeckillPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [activeCategory, setActiveCategory] = useState('推荐');

  const categories = ['推荐', '品质家电', '数码', '酒水', '学生专享', '电脑办公'];

  const getBeijingTime = useCallback(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 8 * 60 * 60 * 1000);
  }, []);

  const updateCountdown = useCallback(() => {
    const now = getBeijingTime().getTime();
    const endTime = new Date('2026-07-31 23:59:59').getTime();
    const diff = endTime - now;

    if (diff <= 0) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ hours, minutes, seconds });
  }, [getBeijingTime]);

  useEffect(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [updateCountdown]);

  const goToProductDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}&seckill=1` });
  };

  const filteredProducts = activeCategory === '推荐' 
    ? seckillProducts 
    : seckillProducts.filter(p => p.category === activeCategory);

  return (
    <View className={styles.seckillPage}>
      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.headerBanner}>
          <View className={styles.bannerLeft}>
            <Text className={styles.bannerTitle}>限时秒杀</Text>
            <Text className={styles.bannerSubtitle}>全场特惠 限时抢购</Text>
          </View>
        </View>

        <View className={styles.categoryBar}>
          <ScrollView scrollX className={styles.categoryScroll} showScrollbar={false}>
            <View className={styles.categoryList}>
              {categories.map((category) => (
                <Text 
                  key={category}
                  className={`${styles.categoryItem} ${activeCategory === category ? styles.activeCategory : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Text>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className={styles.productList}>
          {filteredProducts.map((product) => (
            <View 
              key={product.id} 
              className={styles.productCard}
              onClick={() => goToProductDetail(product.productId)}
            >
              <Image src={product.image} className={styles.productImage} mode="aspectFill" />
              <View className={styles.productInfo}>
                <Text className={styles.productName}>{product.productName}</Text>
                <View className={styles.productTags}>
                  {product.tags.map((tag, idx) => (
                    <Text key={idx} className={styles.productTag}>{tag}</Text>
                  ))}
                </View>
                <View className={styles.priceRow}>
                  <View className={styles.seckillPrice}>
                    <Text className={styles.priceSymbol}>¥</Text>
                    <Text className={styles.priceNum}>{product.seckillPrice}</Text>
                  </View>
                  <Text className={styles.originalPrice}>¥{product.originalPrice}</Text>
                </View>
                <View className={styles.progressArea}>
                  <View className={styles.progressBar}>
                    <View className={styles.progressFill} style={{ width: `${product.soldPercent}%` }} />
                  </View>
                  <Text className={styles.progressText}>已抢{product.soldPercent}%</Text>
                </View>
              </View>
              <View className={styles.seckillBtn}>
                <Text>抢</Text>
              </View>
            </View>
          ))}
        </View>

        <View className={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default SeckillPage;