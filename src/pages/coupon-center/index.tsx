import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { availableCoupons, Coupon } from '@/data/coupons';
import styles from './index.module.scss';

const CouponCenterPage: React.FC = () => {
  const [coupons] = useState<Coupon[]>(availableCoupons);
  const [receivedCoupons, setReceivedCoupons] = useState<string[]>([]);

  const handleReceiveCoupon = (couponId: string) => {
    if (receivedCoupons.includes(couponId)) {
      Taro.showToast({ title: '已领取过该券', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '领取中...' });
    setTimeout(() => {
      Taro.hideLoading();
      setReceivedCoupons([...receivedCoupons, couponId]);
      Taro.showToast({ title: '领取成功', icon: 'success' });
    }, 1000);
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  return (
    <View className={styles.couponCenterPage}>
      <ScrollView scrollY className={styles.couponList}>
        {coupons.map((coupon) => (
          <View 
            key={coupon.id} 
            className={`${styles.couponCard} ${styles[coupon.type]}`}
          >
            <View className={styles.couponContent}>
              <View className={styles.couponLeft}>
                <Text className={`${styles.couponValue} ${coupon.type === 'discount' ? styles.discount : ''}`}>
                  {coupon.type === 'cash' ? coupon.value : coupon.value}
                </Text>
                <Text className={styles.couponCondition}>
                  {coupon.minAmount > 0 ? `满${coupon.minAmount}可用` : '无门槛'}
                </Text>
              </View>
              <View className={styles.couponRight}>
                <Text className={styles.couponName}>{coupon.name}</Text>
                <Text className={styles.couponScope}>{coupon.scopeText}</Text>
                <Text className={styles.couponTime}>
                  {formatTime(coupon.startTime)} - {formatTime(coupon.endTime)}
                </Text>
              </View>
            </View>
            <View className={styles.couponAction}>
              <Text 
                className={`${styles.receiveBtn} ${receivedCoupons.includes(coupon.id) ? styles.received : ''}`}
                onClick={() => handleReceiveCoupon(coupon.id)}
              >
                {receivedCoupons.includes(coupon.id) ? '已领取' : '立即领取'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CouponCenterPage;
