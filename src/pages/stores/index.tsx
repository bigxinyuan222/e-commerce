import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { stores } from '@/data/stores';
import styles from './index.module.scss';

const StoresPage: React.FC = () => {
  const handleCallStore = (phone: string) => {
    Taro.makePhoneCall({ phoneNumber: phone });
  };

  const handleNavigateStore = (store: any) => {
    Taro.openLocation({
      latitude: store.lat,
      longitude: store.lng,
      name: store.name,
      address: store.address
    });
  };

  return (
    <View className={styles.storesPage}>
      {stores.map((store) => (
        <View key={store.id} className={styles.storeCard}>
          <View className={styles.storeHeader}>
            <View>
              <Text className={styles.storeName}>{store.name}</Text>
              <Text className={styles.storeDistance}>距离 {store.distance}km</Text>
            </View>
          </View>
          <Text className={styles.storeAddress}>{store.address}</Text>
          <Text className={styles.storeHours}>营业时间: {store.hours}</Text>
          <View className={styles.storeServices}>
            {store.service.map((s) => (
              <Text key={s} className={styles.serviceTag}>{s}</Text>
            ))}
          </View>
          <View className={styles.storeActions}>
            <View 
              className={styles.actionItem}
              onClick={() => handleNavigateStore(store)}
            >
              <Text className={styles.icon}>📍</Text>
              <Text>导航</Text>
            </View>
            <View 
              className={styles.actionItem}
              onClick={() => handleCallStore(store.phone)}
            >
              <Text className={styles.icon}>📞</Text>
              <Text>致电</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default StoresPage;
