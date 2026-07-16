import React, { useState } from 'react';
import { View, Text, Input, Image, Radio } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from '@/styles/cart/order-return.module.scss';

const ReturnApplyPage: React.FC = () => {
  const [reason, setReason] = useState('');
  const [refundType, setRefundType] = useState('退货退款');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!reason) {
      Taro.showToast({ title: '请选择退款原因', icon: 'none' });
      return;
    }
    Taro.showLoading({ title: '提交中...' });
    setTimeout(() => {
      Taro.hideLoading();
      Taro.showToast({ title: '提交成功', icon: 'success' });
      setTimeout(() => Taro.navigateBack(), 1500);
    }, 1500);
  };

  return (
    <View className={styles.returnApplyPage}>
      <View className={styles.goodsSection}>
        <Image src="https://picsum.photos/id/1/200/200" className={styles.goodsImage} mode="aspectFill" />
        <View className={styles.goodsInfo}>
          <Text className={styles.goodsName}>iPhone 15 Pro Max 256GB</Text>
          <Text className={styles.goodsPrice}>¥9999</Text>
        </View>
      </View>

      <View className={styles.formSection}>
        <Text className={styles.label}>退款类型</Text>
        <View className={styles.radioGroup}>
          <View className={styles.radioItem} onClick={() => setRefundType('退货退款')}>
            <Radio checked={refundType === '退货退款'} color="#e2231a" />
            <Text>退货退款</Text>
          </View>
          <View className={styles.radioItem} onClick={() => setRefundType('仅退款')}>
            <Radio checked={refundType === '仅退款'} color="#e2231a" />
            <Text>仅退款</Text>
          </View>
        </View>
      </View>

      <View className={styles.formSection}>
        <Text className={styles.label}>退款原因</Text>
        <View className={styles.reasonList}>
          {['不想要了', '商品损坏', '与描述不符', '买错了', '其他'].map((item) => (
            <View 
              key={item} 
              className={`${styles.reasonItem} ${reason === item ? styles.active : ''}`}
              onClick={() => setReason(item)}
            >
              {item}
            </View>
          ))}
        </View>
      </View>

      <View className={styles.formSection}>
        <Text className={styles.label}>退款说明</Text>
        <Input 
          className={styles.textarea} 
          type="text" 
          placeholder="请输入退款说明（选填）"
          value={description}
          onInput={(e) => setDescription(e.detail.value)}
        />
      </View>

      <View className={styles.submitBtn} onClick={handleSubmit}>提交申请</View>
    </View>
  );
};

export default ReturnApplyPage;
