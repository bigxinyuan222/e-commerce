import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { fetchSeckillActivities, fetchProductSeckillActivity } from '@/api/seckill';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/home/seckill.module.scss';

interface ActivityItem {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: string;
  products: any[];
}

// 兜底：当接口未返回数据时，返回空活动框架
function buildFallbackActivities(): ActivityItem[] {
  const now = new Date();
  const endTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace('T', ' ').slice(0, 19);
  return [{
    id: 'seckill-fallback',
    name: '限时秒杀',
    startTime: fmt(now),
    endTime: fmt(endTime),
    status: 'active',
    products: [],
  }];
}

const SeckillPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 加载指定活动的商品
  const loadActivityProducts = useCallback(async (activityId: string) => {
    try {
      const res = await fetchProductSeckillActivity({ activityId });
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        const products = res.data;
        setActivities(prev => {
          const next = [...prev];
          const idx = next.findIndex(a => String(a.id) === String(activityId));
          if (idx >= 0) {
            next[idx] = { ...next[idx], products };
          }
          return next;
        });
      }
    } catch (error) {
      console.error('Failed to load activity products:', error);
    }
  }, []);

  // 加载秒杀活动列表
  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchSeckillActivities({ status: 'active' });
      const list = Array.isArray(res?.data) ? res.data : [];
      if (list.length > 0) {
        setActivities(list as ActivityItem[]);
        // 为所有活动并行加载商品数据
        list.forEach((activity: ActivityItem) => {
          if (activity.id) {
            loadActivityProducts(String(activity.id));
          }
        });
      } else {
        // 接口返回空，使用兜底数据
        setActivities(buildFallbackActivities());
      }
    } catch (error) {
      console.error('Failed to load seckill activities:', error);
      // 接口异常，使用兜底数据，保证页面可用
      setActivities(buildFallbackActivities());
    } finally {
      setLoading(false);
    }
  }, [loadActivityProducts]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // 当前活动
  const currentActivity = activities[activeActivityIndex] || activities[0];

  // 健壮解析各种时间格式（ISO 8601、YYYY-MM-DD HH:mm:ss、YYYY/MM/DD HH:mm:ss 等）
  const parseTime = (timeStr: string): number => {
    if (!timeStr) return NaN;
    let t = new Date(timeStr).getTime();
    if (!isNaN(t)) return t;
    t = new Date(timeStr.replace(/-/g, '/')).getTime();
    if (!isNaN(t)) return t;
    t = new Date(timeStr.replace(/\//g, '-')).getTime();
    return t;
  };

  // 倒计时：基于当前活动 endTime
  const updateCountdown = useCallback(() => {
    if (!currentActivity?.endTime) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const now = new Date().getTime();
    const endTime = parseTime(currentActivity.endTime);
    const diff = endTime - now;

    if (diff <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  }, [currentActivity]);

  useEffect(() => {
    if (!currentActivity) return;
    updateCountdown();
    timerRef.current = setInterval(updateCountdown, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [updateCountdown, currentActivity]);

  const goToProductDetail = (product: any) => {
    const productId = product.productId || product.id;
    const activityId = currentActivity?.id || '';
    Taro.navigateTo({
      url: `/pages/home/detail/index?id=${productId}&seckill=1&activityId=${activityId}`
    });
  };

  // 倒计时展示文本
  const countdownText = (() => {
    const { days, hours, minutes, seconds } = timeLeft;
    if (days > 0) {
      return `距结束 ${days}天 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `距结束 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  })();

  if (loading) {
    return (
      <View className={styles.seckillPage}>
        <View style={{ padding: '100rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.seckillPage}>
      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.headerBanner}>
          <View className={styles.bannerLeft}>
            <Text className={styles.bannerTitle}>限时秒杀</Text>
            <Text className={styles.bannerSubtitle}>{currentActivity?.name || '全场特惠 限时抢购'}</Text>
            <Text className={styles.bannerSubtitle}>{countdownText}</Text>
          </View>
        </View>

        {/* 活动场次切换（多于一场时展示） */}
        {activities.length > 1 && (
          <View className={styles.categoryBar}>
            <ScrollView scrollX className={styles.categoryScroll} showScrollbar={false}>
              <View className={styles.categoryList}>
                {activities.map((activity, idx) => (
                  <Text
                    key={activity.id || idx}
                    className={`${styles.categoryItem} ${activeActivityIndex === idx ? styles.activeCategory : ''}`}
                    onClick={() => setActiveActivityIndex(idx)}
                  >
                    {activity.name}
                  </Text>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        <View className={styles.productList}>
          {(currentActivity?.products || []).map((product: any, idx: number) => {
            const soldPercent = product.soldPercent ?? 0;
            const productId = product.productId || product.id;
            return (
              <View
                key={product.id || productId || idx}
                className={styles.productCard}
                onClick={() => goToProductDetail(product)}
              >
                <Image
                  src={getImageUrl(product.image)}
                  className={styles.productImage}
                  mode="aspectFill"
                  {...lazyImgProps()}
                />
                <View className={styles.productInfo}>
                  <Text className={styles.productName}>{product.productName || product.name}</Text>
                  <View className={styles.productTags}>
                    <Text className={styles.productTag}>限时秒杀</Text>
                  </View>
                  <View className={styles.priceRow}>
                    <View className={styles.seckillPrice}>
                      <Text className={styles.priceSymbol}>¥</Text>
                      <Text className={styles.priceNum}>{product.seckillPrice}</Text>
                    </View>
                    {product.originalPrice > 0 && product.originalPrice !== product.seckillPrice && (
                      <Text className={styles.originalPrice}>¥{product.originalPrice}</Text>
                    )}
                  </View>
                  <View className={styles.progressArea}>
                    <View className={styles.progressBar}>
                      <View className={styles.progressFill} style={{ width: `${soldPercent}%` }} />
                    </View>
                    <Text className={styles.progressText}>已抢{soldPercent}%</Text>
                  </View>
                </View>
                <View className={styles.seckillBtn}>
                  <Text>抢</Text>
                </View>
              </View>
            );
          })}
        </View>

        {(!currentActivity?.products || currentActivity.products.length === 0) && (
          <View style={{ padding: '80rpx', textAlign: 'center' }}>
            <Text>暂无秒杀商品</Text>
          </View>
        )}

        <View className={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default SeckillPage;
