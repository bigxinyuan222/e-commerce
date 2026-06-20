import React from 'react';
import { View, Text, Image, Switch } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import styles from './index.module.scss';

const ProfilePage: React.FC = () => {
  const { userInfo, setUserInfo } = useAppContext();

  const menuItems = [
    { icon: '👤', title: '头像', hasArrow: true },
    { icon: '📛', title: '昵称', value: userInfo?.nickname || '商城用户', hasArrow: true },
    { icon: '📱', title: '手机号', value: userInfo?.phone || '138****8888', hasArrow: true },
  ];

  const settingsItems = [
    { icon: '🔔', title: '消息通知', hasSwitch: true },
    { icon: '🔒', title: '隐私设置', hasArrow: true },
    { icon: '⚙️', title: '通用设置', hasArrow: true },
    { icon: '❓', title: '帮助与反馈', hasArrow: true },
    { icon: '📋', title: '关于我们', hasArrow: true },
  ];

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
          <Text className={styles.nickname}>{userInfo?.nickname || '商城用户'}</Text>
        </View>
      </View>

      <View className={styles.menuSection}>
        {menuItems.map((item, index) => (
          <View key={index} className={styles.menuItem}>
            <Text className={styles.menuIcon}>{item.icon}</Text>
            <Text className={styles.menuTitle}>{item.title}</Text>
            {item.value && <Text className={styles.menuValue}>{item.value}</Text>}
            {item.hasArrow && <Text className={styles.menuArrow}>›</Text>}
          </View>
        ))}
      </View>

      <View className={styles.menuSection}>
        {settingsItems.map((item, index) => (
          <View key={index} className={styles.menuItem}>
            <Text className={styles.menuIcon}>{item.icon}</Text>
            <Text className={styles.menuTitle}>{item.title}</Text>
            {item.hasSwitch && <Switch color="#e2231a" />}
            {item.hasArrow && <Text className={styles.menuArrow}>›</Text>}
          </View>
        ))}
      </View>

      <View className={styles.logoutBtn} onClick={logout}>退出登录</View>
    </View>
  );
};

export default ProfilePage;
