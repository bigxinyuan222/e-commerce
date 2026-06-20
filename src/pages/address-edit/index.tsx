import React, { useState } from 'react';
import { View, Text, Input, Switch } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getAddressById } from '@/data/user';
import styles from './index.module.scss';

const AddressEditPage: React.FC = () => {
  const { id } = Taro.getCurrentInstance().router?.params || {};
  const existingAddress = id ? getAddressById(id) : undefined;

  const [name, setName] = useState(existingAddress?.name || '');
  const [phone, setPhone] = useState(existingAddress?.phone || '');
  const [province, setProvince] = useState(existingAddress?.province || '');
  const [city, setCity] = useState(existingAddress?.city || '');
  const [district, setDistrict] = useState(existingAddress?.district || '');
  const [detail, setDetail] = useState(existingAddress?.detail || '');
  const [isDefault, setIsDefault] = useState(existingAddress?.isDefault || false);

  const handleSave = () => {
    if (!name || !phone || !detail) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '保存中...' });
    setTimeout(() => {
      Taro.hideLoading();
      Taro.showToast({ title: '保存成功', icon: 'success' });
      setTimeout(() => Taro.navigateBack(), 1500);
    }, 1500);
  };

  return (
    <View className={styles.addressEditPage}>
      <View className={styles.formSection}>
        <View className={styles.formItem}>
          <Text className={styles.label}>收货人</Text>
          <Input 
            className={styles.input} 
            placeholder="请输入收货人姓名"
            value={name}
            onInput={(e) => setName(e.detail.value)}
          />
        </View>
        <View className={styles.formItem}>
          <Text className={styles.label}>手机号</Text>
          <Input 
            className={styles.input} 
            type="number"
            maxlength={11}
            placeholder="请输入手机号"
            value={phone}
            onInput={(e) => setPhone(e.detail.value)}
          />
        </View>
        <View className={styles.formItem}>
          <Text className={styles.label}>省份</Text>
          <Input 
            className={styles.input} 
            placeholder="请输入省份"
            value={province}
            onInput={(e) => setProvince(e.detail.value)}
          />
        </View>
        <View className={styles.formItem}>
          <Text className={styles.label}>城市</Text>
          <Input 
            className={styles.input} 
            placeholder="请输入城市"
            value={city}
            onInput={(e) => setCity(e.detail.value)}
          />
        </View>
        <View className={styles.formItem}>
          <Text className={styles.label}>区县</Text>
          <Input 
            className={styles.input} 
            placeholder="请输入区县"
            value={district}
            onInput={(e) => setDistrict(e.detail.value)}
          />
        </View>
        <View className={styles.formItem}>
          <Text className={styles.label}>详细地址</Text>
          <Input 
            className={styles.input} 
            placeholder="请输入详细地址"
            value={detail}
            onInput={(e) => setDetail(e.detail.value)}
          />
        </View>
        <View className={styles.formItem}>
          <Text className={styles.label}>设为默认</Text>
          <Switch color="#e2231a" checked={isDefault} onChange={(e) => setIsDefault(e.detail.value)} />
        </View>
      </View>

      <View className={styles.saveBtn} onClick={handleSave}>保存</View>
    </View>
  );
};

export default AddressEditPage;
