import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { myCoupons, Coupon } from '@/data/common/coupons';
import styles from '@/styles/user/coupons.module.scss';

const MyCouponsPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('available');
  const [coupons, setCoupons] = useState<Coupon[]>(myCoupons);

  const availableCoupons = coupons.filter(c => c.status === 'available');
  const usedCoupons = coupons.filter(c => c.status === 'used');
  const expiredCoupons = coupons.filter(c => c.status === 'expired');

  const currentCoupons = currentTab === 'available' ? availableCoupons 
    : currentTab === 'used' ? usedCoupons 
    : expiredCoupons;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return styles.available;
      case 'used': return styles.used;
      case 'expired': return styles.expired;
      default: return '';
    }
  };

  const formatDate = (dateStr: string) => {
    return dateStr;
  };

  const handleUseCoupon = (coupon: Coupon) => {
    if (coupon.scope === 'product' && coupon.productId) {
      Taro.navigateTo({ url: `/pages/home/detail/index?id=${coupon.productId}` });
    } else if (coupon.scope === 'category' && coupon.categoryId) {
      Taro.navigateTo({ url: `/pages/home/search-results/index?keyword=${coupon.scopeText}` });
    } else {
      Taro.navigateTo({ url: '/pages/home/index' });
    }
  };

  return (
    <View className={styles.myCouponsPage}>
      <View className={styles.tabs}>
        <View 
          className={`${styles.tab} ${currentTab === 'available' ? styles.active : ''}`}
          onClick={() => setCurrentTab('available')}
        >
          <Text>可用({availableCoupons.length})</Text>
        </View>
        <View 
          className={`${styles.tab} ${currentTab === 'used' ? styles.active : ''}`}
          onClick={() => setCurrentTab('used')}
        >
          <Text>已使用({usedCoupons.length})</Text>
        </View>
        <View 
          className={`${styles.tab} ${currentTab === 'expired' ? styles.active : ''}`}
          onClick={() => setCurrentTab('expired')}
        >
          <Text>已过期({expiredCoupons.length})</Text>
        </View>
      </View>

      <ScrollView scrollY className={styles.couponList}>
        {currentCoupons.length > 0 ? (
          currentCoupons.map((coupon) => (
            <View key={coupon.id} className={`${styles.couponCard} ${getStatusColor(coupon.status)}`}>
              <View className={styles.couponContent}>
                <View className={styles.couponLeft}>
                  <Text className={styles.couponValue}>
                    {coupon.type === 'cash' ? `¥${coupon.value}` : `${coupon.value}折`}
                  </Text>
                  <Text className={styles.couponCondition}>
                    {coupon.minAmount > 0 ? `满${coupon.minAmount}可用` : '无门槛'}
                  </Text>
                </View>
                <View className={styles.couponRight}>
                  <Text className={styles.couponName}>{coupon.name}</Text>
                  <Text className={styles.couponScope}>{coupon.scopeText}</Text>
                  <Text className={styles.couponTime}>
                    {formatDate(coupon.startTime)} - {formatDate(coupon.endTime)}
                  </Text>
                </View>
                {coupon.status === 'available' && (
                  <View className={styles.couponUseBtn} onClick={() => handleUseCoupon(coupon)}>
                    <Text>去使用</Text>
                  </View>
                )}
              </View>
            </View>
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyText}>暂无优惠券</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyCouponsPage;
