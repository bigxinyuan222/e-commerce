import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiGet } from '@/api/common';
import { userApi } from '@/api/user';
import { normalizeUserProfile } from '@/api/user/normalize';
import { getImageUrl } from '@/utils/image';
import styles from '@/styles/user/profile.module.scss';

const ProfilePage: React.FC = () => {
  const { userInfo, setUserInfo } = useAppContext();

  // 进入页面时刷新用户信息
  useEffect(() => {
    if (!userInfo?.isLoggedIn) return;
    const fetchProfile = async () => {
      try {
        const res = await apiGet(userApi.profile);
        const normalized = normalizeUserProfile(res);
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
        console.error('获取用户信息失败:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleMenuItemClick = (title: string) => {
    switch (title) {
      case '个人信息':
        Taro.navigateTo({ url: '/pages/user/personal-info/index' });
        break;
      default:
        break;
    }
  };

  const logout = () => {
    Taro.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息（含 token 的 lxg_user 必须清除，否则未真正退出）
          Taro.removeStorageSync('lxg_user');
          Taro.removeStorageSync('userInfo');
          setUserInfo({ ...userInfo!, isLoggedIn: false });
          Taro.showToast({ title: '已退出登录', icon: 'success' });
          setTimeout(() => {
            Taro.switchTab({ url: '/pages/home/index' });
          }, 1000);
        }
      }
    });
  };

  return (
    <View className={styles.profilePage}>
      <View className={styles.profileHeader}>
        <View className={styles.avatarSection}>
          <Image src={getImageUrl(userInfo?.avatar)} className={styles.avatar} mode="aspectFill" />
          <Text className={styles.nickname}>{userInfo?.nickname || ''}</Text>
        </View>
      </View>

      <View className={styles.menuSection}>
        <View className={styles.menuSectionTitle}>账户与安全</View>
        <View className={styles.menuItem} onClick={() => handleMenuItemClick('个人信息')}>
          <Text className={styles.menuIcon}>👤</Text>
          <Text className={styles.menuTitle}>个人信息</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>

      <View className={styles.logoutBtn} onClick={logout}>退出登录</View>
    </View>
  );
};

export default ProfilePage;
