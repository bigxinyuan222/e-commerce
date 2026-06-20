import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { userInfo as defaultUserInfo } from '@/data/user';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const { userInfo } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查登录状态
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

  // 跳转到登录页
  const goToLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' });
  };

  // 跳转到个人信息页
  const goToProfile = () => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/profile/index' });
  };

  // 跳转到订单列表
  const goToOrderList = (status?: string) => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: `/pages/order-list/index?status=${status || 'all'}` });
  };

  // 跳转到优惠券中心
  const goToCouponCenter = () => {
    Taro.navigateTo({ url: '/pages/coupon-center/index' });
  };

  // 跳转到我的优惠券
  const goToMyCoupons = () => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/my-coupons/index' });
  };

  // 跳转到门店列表
  const goToStores = () => {
    Taro.navigateTo({ url: '/pages/stores/index' });
  };

  // 跳转到我的收藏
  const goToFavorites = () => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/favorites/index' });
  };

  // 跳转到客服消息
  const goToCustomerService = () => {
    if (!isLoggedIn) {
      goToLogin();
      return;
    }
    Taro.navigateTo({ url: '/pages/customer-service/index' });
  };

  return (
    <View className={styles.minePage}>
      <ScrollView scrollY>
        {/* 用户信息区域 */}
        <View className={styles.userInfoSection}>
          <View className={styles.userInfoCard}>
            <View className={styles.avatar} onClick={goToProfile}>
              {isLoggedIn && userInfo.avatar ? (
                <Image src={userInfo.avatar} mode="aspectFill" />
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
            <View className={styles.editBtn} onClick={goToProfile}>
              编辑
            </View>
          </View>
        </View>

        {/* 会员卡区域 */}
        <View className={styles.memberCard} onClick={isLoggedIn ? undefined : goToLogin}>
          <View className={styles.memberHeader}>
            <Text className={styles.memberTitle}>商城会员</Text>
            <Text className={styles.memberLevel}>
              {isLoggedIn ? 'VIP会员' : '未开通'}
            </Text>
          </View>
          <Text className={styles.memberBenefits}>
            {isLoggedIn 
              ? '专属客服 · 专属折扣 · 积分加速 · 生日礼包'
              : '开通即享专属优惠和更多权益'}
          </Text>
          <View className={styles.memberAction}>
            {isLoggedIn ? '查看会员权益' : '立即开通'}
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
            <View className={styles.orderStatusItem} onClick={() => goToOrderList('pending_payment')}>
              <View className={styles.statusIcon}>
                💰
              </View>
              <Text className={styles.statusLabel}>待支付</Text>
            </View>
            <View className={styles.orderStatusItem} onClick={() => goToOrderList('paid')}>
              <View className={styles.statusIcon}>📦</View>
              <Text className={styles.statusLabel}>待自提</Text>
            </View>
            <View className={styles.orderStatusItem} onClick={() => goToOrderList('completed')}>
              <View className={styles.statusIcon}>✅</View>
              <Text className={styles.statusLabel}>已完成</Text>
            </View>
            <View className={styles.orderStatusItem} onClick={() => goToOrderList('refunding')}>
              <View className={styles.statusIcon}>💳</View>
              <Text className={styles.statusLabel}>退款/售后</Text>
            </View>
          </View>
        </View>

        {/* 功能列表 */}
        <View className={styles.functionSection}>
          <View className={styles.functionItem} onClick={goToCouponCenter}>
            <Text className={styles.functionIcon}>🎫</Text>
            <View className={styles.functionInfo}>
              <Text className={styles.functionName}>领券中心</Text>
              <Text className={styles.functionDesc}>领取专属优惠券</Text>
            </View>
            <Text className={styles.functionArrow}>›</Text>
          </View>
          <View className={styles.functionItem} onClick={goToMyCoupons}>
            <Text className={styles.functionIcon}>💰</Text>
            <View className={styles.functionInfo}>
              <Text className={styles.functionName}>我的优惠券</Text>
              <Text className={styles.functionDesc}>查看已领取的优惠券</Text>
            </View>
            <Text className={styles.functionArrow}>›</Text>
          </View>
          <View className={styles.functionItem} onClick={goToStores}>
            <Text className={styles.functionIcon}>🏪</Text>
            <View className={styles.functionInfo}>
              <Text className={styles.functionName}>门店自提</Text>
              <Text className={styles.functionDesc}>查看附近门店</Text>
            </View>
            <Text className={styles.functionArrow}>›</Text>
          </View>
          <View className={styles.functionItem} onClick={goToFavorites}>
            <Text className={styles.functionIcon}>❤️</Text>
            <View className={styles.functionInfo}>
              <Text className={styles.functionName}>我的收藏</Text>
              <Text className={styles.functionDesc}>查看收藏的商品</Text>
            </View>
            <Text className={styles.functionArrow}>›</Text>
          </View>
          <View className={styles.functionItem} onClick={goToCustomerService}>
            <Text className={styles.functionIcon}>💬</Text>
            <View className={styles.functionInfo}>
              <Text className={styles.functionName}>客服消息</Text>
              <Text className={styles.functionDesc}>在线咨询客服</Text>
            </View>
            <Text className={styles.functionArrow}>›</Text>
          </View>
        </View>

        <View className={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default MinePage;
