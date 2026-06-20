import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { addresses, Address } from '@/data/user';
import styles from './index.module.scss';

const AddressListPage: React.FC = () => {
  const addressList: Address[] = addresses;

  const editAddress = (id: string) => {
    Taro.navigateTo({ url: `/pages/address-edit/index?id=${id}` });
  };

  const addAddress = () => {
    Taro.navigateTo({ url: '/pages/address-edit/index' });
  };

  const deleteAddress = () => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除该地址吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  };

  return (
    <View className={styles.addressListPage}>
      {addressList.map((address) => (
        <View key={address.id} className={styles.addressCard}>
          <View className={styles.addressInfo}>
            <View className={styles.nameRow}>
              <Text className={styles.name}>{address.name}</Text>
              {address.isDefault && <Text className={styles.defaultTag}>默认</Text>}
            </View>
            <Text className={styles.phone}>{address.phone}</Text>
            <Text className={styles.address}>
              {address.province}{address.city}{address.district}{address.detail}
            </Text>
          </View>
          <View className={styles.actions}>
            <Text className={styles.editBtn} onClick={() => editAddress(address.id)}>编辑</Text>
            <Text className={styles.deleteBtn} onClick={() => deleteAddress()}>删除</Text>
          </View>
        </View>
      ))}

      <View className={styles.addBtn} onClick={addAddress}>
        <Text>+ 添加新地址</Text>
      </View>
    </View>
  );
};

export default AddressListPage;
