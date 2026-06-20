import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

const GroupBuyDetailPage: React.FC = () => {
  const joinGroup = () => {
    Taro.showToast({ title: '参与拼团', icon: 'success' });
  };

  return (
    <View className={styles.groupBuyDetailPage}>
      <View className={styles.productSection}>
        <Image src="https://picsum.photos/id/1/300/300" className={styles.productImage} mode="aspectFill" />
        <View className={styles.productInfo}>
          <Text className={styles.productName}>iPhone 15 Pro Max 256GB 钛金属设计</Text>
          <View className={styles.priceInfo}>
            <Text className={styles.groupPrice}>¥8999</Text>
            <Text className={styles.originalPrice}>单买价¥9999</Text>
          </View>
        </View>
      </View>

      <View className={styles.groupInfo}>
        <Text className={styles.sectionTitle}>拼团信息</Text>
        <View className={styles.groupStatus}>
          <Text>2/3 人团</Text>
          <Text>剩余 23:45:30</Text>
        </View>
        <View className={styles.groupMembers}>
          <View className={styles.member}>
            <Text className={styles.avatar}>👤</Text>
            <Text className={styles.memberName}>团长-张***</Text>
          </View>
          <View className={styles.member}>
            <Text className={styles.avatar}>👤</Text>
            <Text className={styles.memberName}>李***</Text>
          </View>
          <View className={styles.member}>
            <Text className={styles.avatar}>?</Text>
            <Text className={styles.memberName}>待邀请</Text>
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.shareBtn}>分享邀请</View>
        <View className={styles.joinBtn} onClick={joinGroup}>参与拼团</View>
      </View>
    </View>
  );
};

export default GroupBuyDetailPage;
