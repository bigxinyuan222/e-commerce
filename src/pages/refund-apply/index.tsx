import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getOrderById, applyRefund } from '@/data/orders';
import styles from './index.module.scss';

const RefundApplyPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    { value: 'quality', label: '商品质量问题' },
    { value: 'wrong_order', label: '拍错/多拍' },
    { value: 'no_want', label: '不想要了' },
    { value: 'other', label: '其他' }
  ];

  useEffect(() => {
    const { orderId } = Taro.getCurrentInstance().router?.params || {};
    if (orderId) {
      const foundOrder = getOrderById(orderId as string);
      if (foundOrder) {
        setOrder(foundOrder);
        setRefundAmount(foundOrder.payAmount.toString());
      } else {
        Taro.showToast({ title: '订单不存在', icon: 'none' });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1500);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (!selectedReason) {
      Taro.showToast({ title: '请选择退款原因', icon: 'none' });
      return;
    }

    const amount = parseFloat(refundAmount);
    if (!amount || amount <= 0) {
      Taro.showToast({ title: '请输入正确的退款金额', icon: 'none' });
      return;
    }

    if (amount > order.payAmount) {
      Taro.showToast({ title: '退款金额不能超过订单金额', icon: 'none' });
      return;
    }

    setIsSubmitting(true);

    const reasonLabel = reasons.find(r => r.value === selectedReason)?.label || selectedReason;
    
    setTimeout(() => {
      const success = applyRefund(order.id, reasonLabel);
      setIsSubmitting(false);
      
      if (success) {
        Taro.showToast({ title: '退款申请已提交', icon: 'success' });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1500);
      } else {
        Taro.showToast({ title: '提交失败', icon: 'none' });
      }
    }, 1000);
  };

  if (!order) {
    return (
      <View className={styles.loading}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.refundPage}>
      <ScrollView scrollY>
        {/* 订单信息 */}
        <View className={styles.orderSection}>
          <View className={styles.sectionTitle}>
            <Text className={styles.titleText}>订单信息</Text>
          </View>
          <View className={styles.orderCard}>
            <View className={styles.orderHeader}>
              <Text className={styles.orderNo}>订单号: {order.orderNo}</Text>
              <Text className={styles.orderStatus}>{order.statusText}</Text>
            </View>
            <View className={styles.orderItems}>
              {order.items.map((item: any) => (
                <View key={item.id} className={styles.orderItem}>
                  <Image src={item.image} className={styles.itemImage} mode="aspectFill" />
                  <View className={styles.itemInfo}>
                    <Text className={styles.itemName}>{item.productName}</Text>
                    <Text className={styles.itemSpecs}>{item.skuName}</Text>
                    <View className={styles.itemBottom}>
                      <Text className={styles.itemPrice}>¥{item.price}</Text>
                      <Text className={styles.itemQuantity}>×{item.quantity}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View className={styles.orderTotal}>
              <Text className={styles.totalLabel}>订单金额</Text>
              <Text className={styles.totalAmount}>¥{order.payAmount}</Text>
            </View>
          </View>
        </View>

        {/* 退款信息 */}
        <View className={styles.refundSection}>
          <View className={styles.sectionTitle}>
            <Text className={styles.titleText}>退款信息</Text>
          </View>

          {/* 退款金额 */}
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>退款金额</Text>
            <View className={styles.amountInputWrap}>
              <Text className={styles.amountPrefix}>¥</Text>
              <input
                type="number"
                className={styles.amountInput}
                value={refundAmount}
                onChange={(e: any) => setRefundAmount(e.target.value)}
                placeholder="请输入退款金额"
              />
            </View>
          </View>

          {/* 退款原因 */}
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>退款原因</Text>
            <View className={styles.reasonList}>
              {reasons.map((reason) => (
                <View
                  key={reason.value}
                  className={`${styles.reasonItem} ${selectedReason === reason.value ? styles.selected : ''}`}
                  onClick={() => setSelectedReason(reason.value)}
                >
                  <View className={styles.reasonRadio}>
                    {selectedReason === reason.value && (
                      <View className={styles.radioInner} />
                    )}
                  </View>
                  <Text className={styles.reasonLabel}>{reason.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 备注 */}
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>备注（选填）</Text>
            <textarea
              className={styles.remarkInput}
              value={remark}
              onChange={(e: any) => setRemark(e.target.value)}
              placeholder="请输入其他说明（选填）"
              maxLength={200}
            />
          </View>
        </View>

        {/* 温馨提示 */}
        <View className={styles.tipsSection}>
          <Text className={styles.tipsTitle}>温馨提示</Text>
          <Text className={styles.tipsContent}>
            1. 请确保已与商家沟通确认退款事宜
          </Text>
          <Text className={styles.tipsContent}>
            2. 退款将在商家处理后原路返回
          </Text>
          <Text className={styles.tipsContent}>
            3. 如有问题请联系客服
          </Text>
        </View>

        <View className={styles.bottomSpace} />
      </ScrollView>

      {/* 底部提交按钮 */}
      <View className={styles.bottomBar}>
        <View className={styles.submitBtn} onClick={handleSubmit} disabled={isSubmitting}>
          <Text className={styles.submitText}>{isSubmitting ? '提交中...' : '提交退款申请'}</Text>
        </View>
      </View>
    </View>
  );
};

export default RefundApplyPage;
