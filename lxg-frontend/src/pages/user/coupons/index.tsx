import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Coupon } from '@/data/common/coupons';
import { fetchMyCoupons, fetchAvailableCoupons, claimCoupon } from '@/api/user';
import styles from '@/styles/user/coupons.module.scss';

type PageMode = 'mine' | 'available';
type MineTab = 'available' | 'used' | 'expired';

const MyCouponsPage: React.FC = () => {
  const { mode: modeParam, selectable } = Taro.getCurrentInstance().router?.params || {};
  const initialMode: PageMode = modeParam === 'available' ? 'available' : 'mine';
  const [mode, setMode] = useState<PageMode>(initialMode);
  const [currentTab, setCurrentTab] = useState<MineTab>('available');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  // 加载我的优惠券列表
  const loadMyCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchMyCoupons();
      const list = (res?.data || []) as Coupon[];
      setCoupons(list);
    } catch (err) {
      console.error('加载我的优惠券失败:', err);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 加载可领取优惠券列表
  const loadAvailableCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAvailableCoupons();
      const list = (res?.data || []) as Coupon[];
      setAvailableCoupons(list);
    } catch (err) {
      console.error('加载可领取优惠券失败:', err);
      setAvailableCoupons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mode === 'mine') {
      loadMyCoupons();
    } else {
      loadAvailableCoupons();
    }
  }, [mode, loadMyCoupons, loadAvailableCoupons]);

  // 领取优惠券
  const handleClaim = async (coupon: Coupon) => {
    if (!coupon.id || claimingId) return;
    setClaimingId(coupon.id);
    try {
      await claimCoupon(coupon.id);
      Taro.showToast({ title: '领取成功', icon: 'success' });
      // 领取后刷新可领取列表
      await loadAvailableCoupons();
    } catch (err: any) {
      Taro.showToast({ title: err?.message || '领取失败', icon: 'none' });
    } finally {
      setClaimingId(null);
    }
  };

  const availableList = coupons.filter(c => c.status === 'available');
  const usedList = coupons.filter(c => c.status === 'used');
  const expiredList = coupons.filter(c => c.status === 'expired');

  const currentList = currentTab === 'available' ? availableList
    : currentTab === 'used' ? usedList
    : expiredList;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return styles.available;
      case 'used': return styles.used;
      case 'expired': return styles.expired;
      default: return '';
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.length > 10 ? dateStr.substring(0, 10) : dateStr;
  };

  const handleUseCoupon = (coupon: Coupon) => {
    if (coupon.scope === 'product' && coupon.productId) {
      Taro.navigateTo({ url: `/pages/home/detail/index?id=${coupon.productId}` });
    } else if (coupon.scope === 'category' && coupon.categoryId) {
      Taro.navigateTo({ url: `/pages/home/search-results/index?keyword=${encodeURIComponent(coupon.scopeText)}` });
    } else {
      Taro.navigateTo({ url: '/pages/home/index' });
    }
  };

  const switchMode = (m: PageMode) => {
    if (m === mode) return;
    setMode(m);
  };

  return (
    <View className={styles.myCouponsPage}>
      {/* 顶部模式切换：我的优惠券 / 领券中心 */}
      <View className={styles.modeTabs}>
        <View
          className={`${styles.modeTab} ${mode === 'mine' ? styles.modeActive : ''}`}
          onClick={() => switchMode('mine')}
        >
          <Text>我的优惠券</Text>
        </View>
        <View
          className={`${styles.modeTab} ${mode === 'available' ? styles.modeActive : ''}`}
          onClick={() => switchMode('available')}
        >
          <Text>领券中心</Text>
        </View>
      </View>

      {mode === 'mine' ? (
        <>
          <View className={styles.tabs}>
            <View
              className={`${styles.tab} ${currentTab === 'available' ? styles.active : ''}`}
              onClick={() => setCurrentTab('available')}
            >
              <Text>可用({availableList.length})</Text>
            </View>
            <View
              className={`${styles.tab} ${currentTab === 'used' ? styles.active : ''}`}
              onClick={() => setCurrentTab('used')}
            >
              <Text>已使用({usedList.length})</Text>
            </View>
            <View
              className={`${styles.tab} ${currentTab === 'expired' ? styles.active : ''}`}
              onClick={() => setCurrentTab('expired')}
            >
              <Text>已过期({expiredList.length})</Text>
            </View>
          </View>

          <ScrollView scrollY className={styles.couponList}>
            {loading ? (
              <View className={styles.emptyState}>
                <Text className={styles.emptyText}>加载中...</Text>
              </View>
            ) : currentList.length > 0 ? (
              currentList.map((coupon) => (
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
                        <Text>{selectable ? '选择' : '去使用'}</Text>
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
        </>
      ) : (
        <ScrollView scrollY className={styles.couponList}>
          {loading ? (
            <View className={styles.emptyState}>
              <Text className={styles.emptyText}>加载中...</Text>
            </View>
          ) : availableCoupons.length > 0 ? (
            availableCoupons.map((coupon) => {
              const claimed = coupons.some(c => c.id === coupon.id);
              const soldOut = coupon.totalCount > 0 && coupon.remainCount <= 0;
              const disabled = claimed || soldOut || claimingId === coupon.id;
              return (
                <View key={coupon.id} className={`${styles.couponCard} ${styles.available}`}>
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
                      {coupon.totalCount > 0 && (
                        <Text className={styles.couponCount}>
                          剩余 {coupon.remainCount}/{coupon.totalCount}
                        </Text>
                      )}
                    </View>
                    <View
                      className={`${styles.couponUseBtn} ${disabled ? styles.couponBtnDisabled : ''}`}
                      onClick={() => {
                        if (!disabled) handleClaim(coupon);
                      }}
                    >
                      <Text>
                        {claimingId === coupon.id ? '领取中'
                          : claimed ? '已领取'
                          : soldOut ? '已抢光'
                          : '立即领取'}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View className={styles.emptyState}>
              <Text className={styles.emptyText}>暂无可领取的优惠券</Text>
              <View className={styles.refreshBtn} onClick={loadAvailableCoupons}>
                <Text>点击刷新</Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default MyCouponsPage;
