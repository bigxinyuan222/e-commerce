import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiGet } from '@/api/common';
import { userApi } from '@/api/user';
import { normalizeUserProfile } from '@/api/user/normalize';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/user/mine.module.scss';

// 订单状态项组件
const OrderStatusItem = React.memo(({ icon, label, onClick }: { 
  icon: string; 
  label: string; 
  onClick: () => void;
}) => (
  <View className={styles.orderStatusItem} onClick={onClick}>
    <View className={styles.statusIcon}>
      {icon}
    </View>
    <Text className={styles.statusLabel}>{label}</Text>
  </View>
));

// 功能列表项组件
const FunctionItem = React.memo(({ icon, name, desc, onClick }: { 
  icon: string; 
  name: string; 
  desc: string;
  onClick: () => void;
}) => (
  <View className={styles.functionItem} onClick={onClick}>
    <Text className={styles.functionIcon}>{icon}</Text>
    <View className={styles.functionInfo}>
      <Text className={styles.functionName}>{name}</Text>
      <Text className={styles.functionDesc}>{desc}</Text>
    </View>
    <Text className={styles.functionArrow}>›</Text>
  </View>
));

const MinePage: React.FC = () => {
  const { userInfo, setUserInfo } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkLogin = () => {
      const savedUserInfo = Taro.getStorageSync('userInfo');
      if (savedUserInfo && savedUserInfo.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkLogin();
  }, [userInfo]);

  useEffect(() => {
    if (!isLoggedIn) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    const loadProfile = async () => {
      try {
        const res = await apiGet(userApi.profile);
        if (cancelled) return;
        const normalized = normalizeUserProfile(res);
        setProfile(normalized);
        // 同步到全局状态
        setUserInfo({
          id: normalized.id || userInfo.id,
          nickname: normalized.nickname || userInfo.nickname,
          avatar: normalized.avatar || userInfo.avatar,
          phone: normalized.phone || userInfo.phone,
          accountName: normalized.accountName || userInfo.accountName,
          gender: normalized.gender || userInfo.gender,
          birthday: normalized.birthday || userInfo.birthday,
          registerDate: normalized.registerDate || userInfo.registerDate,
          email: normalized.email || userInfo.email,
          isLoggedIn: true
        });
      } catch (err) {
        console.error('加载用户信息失败:', err);
      }
    };
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  // 使用 useCallback 缓存事件处理函数
  const goToLogin = useCallback(() => {
    Taro.navigateTo({ url: '/pages/user/login/index' });
  }, []);

  const goToProfile = useCallback(() => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/user/profile/index' });
  }, [isLoggedIn, goToLogin]);

  const goToOrderList = useCallback((status?: string) => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: `/pages/cart/order/list/index?status=${status || 'all'}` });
  }, [isLoggedIn, goToLogin]);

  const goToRefundList = useCallback(() => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/cart/order/refund-list/index' });
  }, [isLoggedIn, goToLogin]);

  const goToMyCoupons = useCallback(() => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/user/coupons/index' });
  }, [isLoggedIn, goToLogin]);

  const goToStores = useCallback(() => {
    Taro.navigateTo({ url: '/pages/category/stores/index' });
  }, []);

  return (
    <View className={styles.minePage}>
      <ScrollView scrollY>
        {/* 用户信息区域 */}
        <View className={styles.userInfoSection}>
          <View className={styles.userInfoCard}>
            <View className={styles.avatar} onClick={goToProfile}>
              {isLoggedIn && (profile?.avatar || userInfo.avatar) ? (
                <Image
                  src={getImageUrl(profile?.avatar || userInfo.avatar)}
                  mode="aspectFill"
                  className={styles.avatarImg}
                  {...lazyImgProps()}
                />
              ) : (
                <Text className={styles.avatarPlaceholder}>👤</Text>
              )}
            </View>
            <View className={styles.userDetails}>
              {isLoggedIn ? (
                <>
                  <Text className={styles.nickname}>{profile?.nickname || userInfo.nickname}</Text>
                  <Text className={styles.userPhone}>{profile?.phone || userInfo.phone}</Text>
                </>
              ) : (
                <>
                  <Text className={styles.nickname} onClick={goToLogin}>点击登录</Text>
                  <Text className={styles.userPhone}>登录后享受更多权益</Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* 订单区域 */}
        <View className={styles.orderSection}>
          <View className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>我的订单</Text>
            <Text className={styles.viewAll} onClick={() => goToOrderList()}>
              查看全部
            </Text>
          </View>
          <View className={styles.orderStatusList}>
            <OrderStatusItem 
              icon="💰" 
              label="待支付" 
              onClick={() => goToOrderList('pending_payment')} 
            />
            <OrderStatusItem 
              icon="🚚" 
              label="待发货" 
              onClick={() => goToOrderList('pending_delivery')} 
            />
            <OrderStatusItem 
              icon="📦" 
              label="待自提" 
              onClick={() => goToOrderList('pending_pickup')} 
            />
            <OrderStatusItem 
              icon="✅" 
              label="已完成" 
              onClick={() => goToOrderList('completed')} 
            />
            <OrderStatusItem 
              icon="💳" 
              label="退款/售后" 
              onClick={() => goToRefundList()} 
            />
          </View>
        </View>

        {/* 功能列表 */}
        <View className={styles.functionSection}>
          <FunctionItem 
            icon="💰" 
            name="我的优惠券" 
            desc="查看已领取的优惠券" 
            onClick={goToMyCoupons} 
          />
          <FunctionItem 
            icon="🏪" 
            name="门店自提" 
            desc="查看附近门店" 
            onClick={goToStores} 
          />
        </View>

        <View className={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default React.memo(MinePage);