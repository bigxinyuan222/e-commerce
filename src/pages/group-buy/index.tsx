import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

const GroupBuyPage: React.FC = () => {
  const groupBuyList = [
    {
      id: 'group-1',
      productName: 'iPhone 15 Pro Max 256GB',
      productImage: 'https://picsum.photos/id/1/300/300',
      originalPrice: 9999,
      groupPrice: 8999,
      groupNum: 3,
      currentNum: 2,
      duration: '23:45:30'
    },
    {
      id: 'group-2',
      productName: 'AirPods Pro (第二代)',
      productImage: 'https://picsum.photos/id/3/300/300',
      originalPrice: 1899,
      groupPrice: 1599,
      groupNum: 5,
      currentNum: 3,
      duration: '12:30:00'
    }
  ];

  const goToGroupBuyDetail = (groupId: string) => {
    Taro.navigateTo({ url: `/pages/group-buy-detail/index?id=${groupId}` });
  };

  return (
    <View className={styles.groupBuyPage}>
      <View className={styles.banner}>
        <Text className={styles.bannerTitle}>多人拼团</Text>
        <Text className={styles.bannerSubtitle}>邀请好友一起省</Text>
      </View>

      <ScrollView scrollY className={styles.groupList}>
        {groupBuyList.map((item) => (
          <View key={item.id} className={styles.groupCard} onClick={() => goToGroupBuyDetail(item.id)}>
            <Image src={item.productImage} className={styles.productImage} mode="aspectFill" />
            <View className={styles.productInfo}>
              <Text className={styles.productName}>{item.productName}</Text>
              <View className={styles.priceRow}>
                <View className={styles.groupPrice}>
                  <Text className={styles.priceSymbol}>¥</Text>
                  <Text className={styles.priceValue}>{item.groupPrice}</Text>
                  <Text className={styles.groupTag}>拼团价</Text>
                </View>
                <Text className={styles.originalPrice}>单买价¥{item.originalPrice}</Text>
              </View>
              <View className={styles.groupProgress}>
                <View className={styles.progressInfo}>
                  <Text className={styles.progressText}>
                    {item.currentNum}/{item.groupNum}人团
                  </Text>
                  <Text className={styles.duration}>剩余 {item.duration}</Text>
                </View>
                <View className={styles.progressBar}>
                  <View 
                    className={styles.progressFill} 
                    style={{ width: `${(item.currentNum / item.groupNum) * 100}%` }} 
                  />
                </View>
              </View>
              <View className={styles.groupActions}>
                <View className={styles.joinBtn}>去拼团</View>
                <View className={styles.avatarList}>
                  <Text className={styles.avatar}>👤</Text>
                  <Text className={styles.avatar}>👤</Text>
                  <Text className={styles.needNum}>还差{item.groupNum - item.currentNum}人</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default GroupBuyPage;
