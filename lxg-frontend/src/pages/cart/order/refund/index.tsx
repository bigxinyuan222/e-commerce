import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { fetchOrderDetail, fetchRefundReasons, applyRefund as applyRefundAPI } from '@/api/cart';
import { uploadImage } from '@/api/common';
import { userApi } from '@/api/user';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/cart/order-refund.module.scss';

const RefundApplyPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [reasons, setReasons] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedReasonId, setSelectedReasonId] = useState<string>('');
  const [selectedReasonText, setSelectedReasonText] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    const orderId = params.id || params.orderId;
    if (orderId) {
      loadPageData(orderId as string);
    } else {
      setLoading(false);
      Taro.showToast({ title: '订单ID不存在', icon: 'none' });
    }
  }, []);

  const loadPageData = async (orderId: string) => {
    setLoading(true);
    try {
      const [orderRes, reasonsRes] = await Promise.all([
        fetchOrderDetail(orderId),
        fetchRefundReasons({ enabled: true }),
      ]);

      if (orderRes?.data) {
        setOrder(orderRes.data);
        setRefundAmount(String(orderRes.data.payAmount ?? orderRes.data.totalAmount ?? ''));
      } else {
        Taro.showToast({ title: '订单不存在', icon: 'none' });
      }

      if (Array.isArray(reasonsRes?.data) && reasonsRes.data.length > 0) {
        const reasonList = reasonsRes.data.map((r: any) => ({
          id: String(r.id ?? r.code ?? r.name ?? ''),
          name: r.name ?? r.label ?? r.title ?? '',
        })).filter((r: any) => r.name);
        setReasons(reasonList);
      } else {
        setReasons([
          { id: 'quality', name: '商品质量问题' },
          { id: 'wrong_order', name: '拍错/多拍' },
          { id: 'no_want', name: '不想要了' },
          { id: 'other', name: '其他' },
        ]);
      }
    } catch (error: any) {
      console.error('加载页面数据失败:', error);
      Taro.showToast({ title: error?.message || '加载失败', icon: 'none' });
      setReasons([
        { id: 'quality', name: '商品质量问题' },
        { id: 'wrong_order', name: '拍错/多拍' },
        { id: 'no_want', name: '不想要了' },
        { id: 'other', name: '其他' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedReasonId && !selectedReasonText) {
      Taro.showToast({ title: '请选择退款原因', icon: 'none' });
      return;
    }

    const amount = parseFloat(refundAmount);
    if (!amount || amount <= 0) {
      Taro.showToast({ title: '请输入正确的退款金额', icon: 'none' });
      return;
    }

    if (order?.payAmount && amount > order.payAmount) {
      Taro.showToast({ title: '退款金额不能超过订单金额', icon: 'none' });
      return;
    }

    setIsSubmitting(true);
    try {
      // 先将本地临时图片上传到服务器，拿到URL列表
      let uploadedImages: string[] = [];
      if (images.length > 0) {
        Taro.showLoading({ title: `上传图片 0/${images.length}`, mask: true });
        uploadedImages = [];
        for (let i = 0; i < images.length; i++) {
          Taro.showLoading({ title: `上传图片 ${i + 1}/${images.length}`, mask: true });
          const url = await uploadImage(userApi.upload, images[i], 'file', { type: 'refund' });
          uploadedImages.push(url);
        }
        Taro.hideLoading();
      }

      const reasonText = selectedReasonText || reasons.find(r => r.id === selectedReasonId)?.name || '';
      await applyRefundAPI({
        orderId: order.id,
        type: 'return_refund',
        reasonId: selectedReasonId,
        reason: reasonText,
        amount: amount,
        description: remark,
        images: uploadedImages,
      });
      Taro.showToast({ title: '退款申请已提交', icon: 'success' });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    } catch (error: any) {
      Taro.hideLoading();
      console.error('提交退款申请失败:', error);
      Taro.showToast({ title: error?.message || '提交失败', icon: 'none' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReasonSelect = () => {
    const reasonLabels = reasons.map(r => r.name);
    Taro.showActionSheet({
      itemList: reasonLabels,
      success: (res) => {
        const selected = reasons[res.tapIndex];
        if (selected) {
          setSelectedReasonId(selected.id);
          setSelectedReasonText(selected.name);
        }
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

  if (loading) {
    return (
      <View className={styles.refundPage}>
        <View className={styles.loading}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  if (!order) {
    return (
      <View className={styles.refundPage}>
        <View className={styles.loading}>
          <Text>订单不存在</Text>
        </View>
      </View>
    );
  }

  const displayReason = selectedReasonText || '点击选择申请原因';

  return (
    <View className={styles.refundPage}>
      <ScrollView scrollY style={{ height: 'calc(100vh - 120rpx)' }}>
        <View className={styles.goodsSection}>
          {(order.items || []).map((item: any) => (
            <View key={item.id} className={styles.goodsItem}>
              <Image src={getImageUrl(item.image)} className={styles.goodsImage} mode="aspectFill" {...lazyImgProps()} />
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
              <Text className={`${styles.formValue} ${selectedReasonId || selectedReasonText ? '' : styles.placeholder}`}>
                {displayReason}
              </Text>
              <Text className={styles.formArrow}>›</Text>
            </View>
          </View>

          <View className={styles.formItem}>
            <Text className={styles.formLabel}>申请金额</Text>
            <View className={styles.formRight}>
              <Text className={styles.amountValue}>¥{parseFloat(refundAmount || '0').toFixed(2)}</Text>
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