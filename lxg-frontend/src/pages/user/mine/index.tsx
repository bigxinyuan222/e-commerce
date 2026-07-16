import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { userInfo as defaultUserInfo } from '@/data/user/user';
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
  const { userInfo } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    Taro.navigateTo({ url: `/pages/order/list/index?status=${status || 'all'}` });
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

  const goToPersonalInfo = useCallback(() => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/user/personal-info/index' });
  }, [isLoggedIn, goToLogin]);

  return (
    <View className={styles.minePage}>
      <ScrollView scrollY>
        {/* 用户信息区域 */}
        <View className={styles.userInfoSection}>
          <View className={styles.userInfoCard}>
            <View className={styles.avatar} onClick={goToProfile}>
              {isLoggedIn && userInfo.avatar ? (
                <Image src={userInfo.avatar} mode="aspectFill" lazyLoad />
              ) : (
                <Text className={styles.avatarPlaceholder}>👤</Text>
              )}
            </View>
            <View className={styles.userDetails}>
              {isLoggedIn ? (
                <>
                  <Text className={styles.nickname}>{userInfo.nickname || defaultUserInfo.nickname}</Text>
                  <Text className={styles.userPhone}>{userInfo.phone || defaultUserInfo.phone}</Text>
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
              onClick={() => goToOrderList('refunding')} 
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
          <FunctionItem 
            icon="⚙️" 
            name="设置" 
            desc="编辑个人信息" 
            onClick={goToPersonalInfo} 
          />
        </View>

        <View className={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default React.memo(MinePage);