import React, { useState } from 'react';
import { View, Text, Image, Switch } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import styles from '@/styles/user/profile.module.scss';

const ProfilePage: React.FC = () => {
  const { userInfo, setUserInfo } = useAppContext();
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const handleMenuItemClick = (title: string) => {
    switch (title) {
      case '个人信息':
        Taro.navigateTo({ url: '/pages/personal-info/index' });
        break;
      case '消息通知':
        setNotificationEnabled(!notificationEnabled);
        Taro.showToast({ 
          title: notificationEnabled ? '已关闭消息通知' : '已开启消息通知', 
          icon: 'none' 
        });
        break;
      case '隐私设置':
        Taro.showToast({ title: '隐私设置', icon: 'none' });
        break;
      case '帮助与反馈':
        Taro.showToast({ title: '帮助与反馈', icon: 'none' });
        break;
      case '关于我们':
        Taro.showModal({
          title: '关于乐享购',
          content: '乐享购 v1.0.0\n\n致力于为用户提供优质的购物体验',
          showCancel: false
        });
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
          setUserInfo({ ...userInfo!, isLoggedIn: false });
          Taro.removeStorageSync('userInfo');
          Taro.showToast({ title: '已退出登录', icon: 'success' });
        }
      }
    });
  };

  return (
    <View className={styles.profilePage}>
      <View className={styles.profileHeader}>
        <View className={styles.avatarSection}>
          <Image src={userInfo?.avatar || 'https://picsum.photos/id/64/200/200'} className={styles.avatar} mode="aspectFill" />
          <Text className={styles.nickname}>{userInfo?.nickname || '乐享购用户'}</Text>
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

      <View className={styles.menuSection}>
        <View className={styles.menuSectionTitle}>设置</View>
        <View className={styles.menuItem} onClick={() => handleMenuItemClick('消息通知')}>
          <Text className={styles.menuIcon}>🔔</Text>
          <Text className={styles.menuTitle}>消息通知</Text>
          <Switch color="#e2231a" checked={notificationEnabled} onChange={setNotificationEnabled} />
        </View>
        <View className={styles.menuItem} onClick={() => handleMenuItemClick('隐私设置')}>
          <Text className={styles.menuIcon}>🔒</Text>
          <Text className={styles.menuTitle}>隐私设置</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={() => handleMenuItemClick('帮助与反馈')}>
          <Text className={styles.menuIcon}>❓</Text>
          <Text className={styles.menuTitle}>帮助与反馈</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={() => handleMenuItemClick('关于我们')}>
          <Text className={styles.menuIcon}>📋</Text>
          <Text className={styles.menuTitle}>关于我们</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>

      <View className={styles.logoutBtn} onClick={logout}>退出登录</View>
    </View>
  );
};

export default ProfilePage;
