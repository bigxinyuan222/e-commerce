import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getOrderById, applyRefund } from '@/data/order/orders';
import styles from '@/styles/cart/order-refund.module.scss';

const RefundApplyPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const reasons = [
    { value: 'quality', label: '商品质量问题' },
    { value: 'wrong_order', label: '拍错/多拍' },
    { value: 'no_want', label: '不想要了' },
    { value: 'other', label: '其他' }
  ];

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    const orderId = params.id || params.orderId;
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

  const handleReasonSelect = () => {
    const reasonLabels = reasons.map(r => r.label);
    Taro.showActionSheet({
      itemList: reasonLabels,
      success: (res) => {
        setSelectedReason(reasons[res.tapIndex].value);
      }
    });
  };

  const handleImageSelect = () => {
    Taro.showActionSheet({
      itemList: ['拍照', '选照片'],
      success: (res) => {
        if (res.tapIndex === 0) {
          Taro.chooseImage({
            count: 9 - images.length,
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success: (result) => {
              setImages([...images, ...result.tempFilePaths]);
            }
          });
        } else if (res.tapIndex === 1) {
          Taro.chooseImage({
            count: 9 - images.length,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: (result) => {
              setImages([...images, ...result.tempFilePaths]);
            }
          });
        }
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const maxRemarkLength = 170;

  if (!order) {
    return (
      <View className={styles.refundPage}>
        <View className={styles.loading}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  const selectedReasonLabel = reasons.find(r => r.value === selectedReason)?.label || '点击选择申请原因';

  return (
    <View className={styles.refundPage}>
      <ScrollView scrollY style={{ height: 'calc(100vh - 120rpx)' }}>
        <View className={styles.goodsSection}>
          {order.items.map((item: any) => (
            <View key={item.id} className={styles.goodsItem}>
              <Image src={item.image} className={styles.goodsImage} mode="aspectFill" />
              <View className={styles.goodsInfo}>
                <Text className={styles.goodsName}>{item.productName}</Text>
                <Text className={styles.goodsSpecs}>×{item.quantity}，{item.skuName}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className={styles.formSection}>
          <View className={styles.formItem}>
            <Text className={styles.formLabel}>申请类型</Text>
            <View className={styles.formRight}>
              <Text className={styles.formValue}>我要退货退款</Text>
              <Text className={styles.formArrow}>›</Text>
            </View>
          </View>

          <View className={styles.formItem} onClick={handleReasonSelect}>
            <Text className={styles.formLabel}>申请原因</Text>
            <View className={styles.formRight}>
              <Text className={`${styles.formValue} ${selectedReason ? '' : styles.placeholder}`}>
                {selectedReasonLabel}
              </Text>
              <Text className={styles.formArrow}>›</Text>
            </View>
          </View>

          <View className={styles.formItem}>
            <Text className={styles.formLabel}>申请金额</Text>
            <View className={styles.formRight}>
              <Text className={styles.amountValue}>¥{parseFloat(refundAmount).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View className={styles.remarkSection}>
          <View className={styles.remarkHeader}>
            <Text className={styles.remarkLabel}>申请说明</Text>
            <Text className={styles.remarkCount}>您还可以输入{maxRemarkLength - remark.length}字</Text>
          </View>
          <View className={styles.remarkInputWrapper}>
            <Textarea
              className={styles.remarkInput}
              value={remark}
              onInput={(e: any) => {
                if (e.detail.value.length <= maxRemarkLength) {
                  setRemark(e.detail.value);
                }
              }}
              placeholder="请您详细填写申请说明"
              maxlength={maxRemarkLength}
            />
            <View className={styles.remarkImageUpload} onClick={handleImageSelect}>
              <Text className={styles.remarkImageIcon}>📷</Text>
            </View>
          </View>
          {images.length > 0 && (
            <View className={styles.remarkImageList}>
              {images.map((image, index) => (
                <View key={index} className={styles.remarkImageItem}>
                  <Image src={image} className={styles.remarkImagePreview} mode="aspectFill" />
                  <View className={styles.remarkImageRemove} onClick={() => handleRemoveImage(index)}>
                    <Text>×</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <View className={styles.bottomSpace} />
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnDisabled : ''}`} onClick={handleSubmit}>
          <Text className={styles.submitText}>{isSubmitting ? '提交中...' : '提交退款申请'}</Text>
        </View>
      </View>
    </View>
  );
};

export default RefundApplyPage;