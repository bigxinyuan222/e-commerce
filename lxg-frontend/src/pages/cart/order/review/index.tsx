import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getOrderById, updateOrderStatus } from '@/data/order/orders';
import styles from './index.module.scss';

const OrderReviewPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<'good' | 'bad'>('good');
  const [reviewContent, setReviewContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.id) {
      const orderData = getOrderById(params.id);
      if (orderData) {
        setOrder(orderData);
      } else {
        Taro.showToast({ title: '订单不存在', icon: 'none' });
      }
    }
    setLoading(false);
  }, []);

  const handleRatingClick = (type: 'good' | 'bad') => {
    setRating(type);
  };

  const handleReviewSubmit = () => {
    if (reviewContent.length === 0) {
      Taro.showToast({ title: '请输入评价内容', icon: 'none' });
      return;
    }
    
    if (order?.id) {
      updateOrderStatus(order.id, 'reviewed');
      Taro.showToast({ title: '评价成功', icon: 'success' });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    }
  };

  const handleBuyAgain = () => {
    if (order?.items?.[0]?.productId) {
      Taro.navigateTo({ 
        url: `/pages/product/detail/index?id=${order.items[0].productId}` 
      });
    }
  };

  const handleRefund = () => {
    if (order?.id) {
      Taro.navigateTo({ url: `/pages/order/refund/index?id=${order.id}` });
    }
  };

  if (loading) {
    return (
      <View className={styles.reviewPage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  if (!order) {
    return (
      <View className={styles.reviewPage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text style={{ fontSize: '32rpx', color: '#999' }}>订单不存在</Text>
        </View>
      </View>
    );
  }

  const ratingLabel = rating === 'good' ? '好评' : '差评';

  return (
    <View className={styles.reviewPage}>
      <View className={styles.navBar}>
        <View className={styles.navContent}>
          <Text className={styles.navBack} onClick={() => Taro.navigateBack()}>‹</Text>
          <Text className={styles.navTitle}>评价晒单</Text>
          <Text style={{ width: '60rpx' }}></Text>
        </View>
      </View>

      <ScrollView scrollY className={styles.scrollView}>
        <View className={styles.storeSection}>
          <View className={styles.storeInfo}>
            <Text className={styles.storeName}>🏪 {order.store?.name || '官方自营'}</Text>
            <Text className={styles.storeStatus}>完成</Text>
          </View>
          <View className={styles.storeTags}>
            <Text className={styles.storeTag}>支持7天无理由退货</Text>
            <Text className={styles.storeTag}>7天价保</Text>
          </View>
        </View>

        {(order.items || []).map((item: any) => (
          <View key={item.id} className={styles.productSection}>
            <View className={styles.productItem}>
              <Image src={item.image} className={styles.productImage} mode="aspectFill" />
              <View className={styles.productInfo}>
                <Text className={styles.productName}>{item.productName}</Text>
                <Text className={styles.productSpec}>{item.skuName}</Text>
                <View className={styles.productBottom}>
                  <Text className={styles.productPrice}>¥{item.price}</Text>
                  <Text className={styles.productQuantity}>×{item.quantity}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View className={styles.ratingSection}>
          <Text className={styles.ratingLabel}>商品评价</Text>
          <View className={styles.ratingButtons}>
            <View 
              className={`${styles.ratingBtn} ${styles.goodBtn} ${rating === 'good' ? styles.active : ''}`}
              onClick={() => handleRatingClick('good')}
            >
              <Text className={styles.ratingEmoji}>😊</Text>
              <Text className={styles.ratingText}>好评</Text>
            </View>
            <View 
              className={`${styles.ratingBtn} ${styles.badBtn} ${rating === 'bad' ? styles.active : ''}`}
              onClick={() => handleRatingClick('bad')}
            >
              <Text className={styles.ratingEmoji}>😢</Text>
              <Text className={styles.ratingText}>差评</Text>
            </View>
          </View>
          <Text className={styles.ratingDesc}>{ratingLabel}</Text>
        </View>

        <View className={styles.contentSection}>
          <Text className={styles.contentLabel}>评价内容</Text>
          <textarea 
            className={styles.contentInput}
            value={reviewContent}
            onChange={(e: any) => setReviewContent(e.detail.value)}
            placeholder="请输入您对商品的评价..."
            maxlength={500}
          />
          <Text className={styles.contentHint}>{reviewContent.length}/500</Text>
        </View>

        <View className={styles.imageSection}>
          <Text className={styles.imageLabel}>晒单图片（可选）</Text>
          <View className={styles.imageGrid}>
            {images.map((img, idx) => (
              <Image key={idx} src={img} className={styles.imageItem} mode="aspectFill" />
            ))}
            {images.length < 6 && (
              <View className={`${styles.imageItem} ${styles.imageUpload}`} onClick={() => {
                Taro.showToast({ title: '图片上传功能开发中', icon: 'none' });
              }}>
                <Text>+</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.actionBtn} onClick={handleBuyAgain}>
          再次购买
        </View>
        <View className={styles.actionBtn} onClick={handleRefund}>
          退款/售后
        </View>
        <View className={`${styles.actionBtn} ${styles.actionBtnPrimary}`} onClick={handleReviewSubmit}>
          评价晒单
        </View>
      </View>
    </View>
  );
};

export default OrderReviewPage;