import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { stores } from '@/data/common/stores';
import styles from './index.module.scss';

const StoresPage: React.FC = () => {
  const { currentStore, setCurrentStore } = useAppContext();

  const handleCallStore = (phone: string) => {
    Taro.makePhoneCall({ phoneNumber: phone });
  };

  const handleSelectStore = (store: typeof stores[0]) => {
    setCurrentStore(store);
    Taro.showToast({ title: `已选择${store.name}`, icon: 'success' });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  return (
    <View className={styles.storesPage}>
      {stores.map((store) => {
        const isSelected = currentStore?.id === store.id;
        return (
          <View key={store.id} className={`${styles.storeCard} ${isSelected ? styles.selected : ''}`}>
            <View className={styles.storeHeader}>
              <Text className={styles.storeName}>{store.name}</Text>
              {isSelected && (
                <Text className={styles.selectedTag}>✓ 已选择</Text>
              )}
            </View>
            <Text className={styles.storeAddress}>{store.address}</Text>
            <Text className={styles.storePhone} onClick={() => handleCallStore(store.phone)}>
              📞 {store.phone}
            </Text>
            <Text className={styles.storeHours}>营业时间: {store.hours}</Text>
            <View className={styles.selectBtn} onClick={() => handleSelectStore(store)}>
              {isSelected ? '已选择' : '选择此门店'}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default StoresPage;
