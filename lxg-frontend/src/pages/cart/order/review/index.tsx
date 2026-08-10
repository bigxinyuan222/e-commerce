import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { fetchOrderDetail, fetchOrderReviews, submitOrderReview } from '@/api/cart';
import { uploadImage } from '@/api/common';
import { userApi } from '@/api/user';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/cart/order-review.module.scss';

// 评价类型对应的评分
const ratingScoreMap: { [key: string]: number } = {
  good: 5,
  neutral: 3,
  bad: 1,
};

const ratingLabelMap: { [key: string]: string } = {
  good: '好评',
  neutral: '中评',
  bad: '差评',
};

const OrderReviewPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState<'good' | 'neutral' | 'bad'>('good');
  const [reviewContent, setReviewContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.id) {
      loadOrderDetail(params.id);
    } else {
      setLoading(false);
      Taro.showToast({ title: '缺少订单ID', icon: 'none' });
    }
  }, []);

  // 加载订单详情
  const loadOrderDetail = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await fetchOrderDetail(orderId);
      if (res?.data) {
        // 规范化订单数据
        const raw = res.data;
        const items = Array.isArray(raw.items) ? raw.items.map((it: any) => ({
          id: it.id ?? it.Id ?? '',
          productId: it.productId ?? it.product_id ?? it.ProductId ?? '',
          productName: it.productName ?? it.product_name ?? it.ProductName ?? it.name ?? '',
          skuId: it.skuId ?? it.sku_id ?? it.SkuId ?? '',
          skuName: it.skuName ?? it.sku_name ?? it.SkuName ?? it.specName ?? '',
          price: Number(it.price ?? it.Price ?? 0),
          quantity: Number(it.quantity ?? it.Quantity ?? 1),
          image: getImageUrl(it.image ?? it.imageUrl ?? it.image_url ?? it.Image ?? ''),
        })) : [];
        setOrder({
          id: raw.id ?? raw.Id ?? '',
          orderNo: raw.orderNo ?? raw.order_no ?? raw.OrderNo ?? '',
          items,
          store: raw.store ?? raw.Store ?? { name: '官方自营' },
        });

        // 查询是否已有评价（该接口后端可能未实现，404时静默忽略）
        try {
          const reviewRes = await fetchOrderReviews(orderId);
          const reviewList = Array.isArray(reviewRes?.data)
            ? reviewRes.data
            : (Array.isArray(reviewRes?.data?.list) ? reviewRes.data.list : []);
          if (reviewList.length > 0) {
            setIsReviewed(true);
            setReviews(reviewList);
          }
        } catch (reviewError: any) {
          console.warn('[订单评价] 获取历史评价失败（接口可能未实现）:', reviewError?.message || reviewError);
          // 接口 404 不影响用户继续提交新评价
        }
      } else {
        Taro.showToast({ title: '订单不存在', icon: 'none' });
      }
    } catch (error: any) {
      console.error('加载订单详情失败:', error);
      Taro.showToast({ title: error?.message || '加载订单失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (type: 'good' | 'neutral' | 'bad') => {
    setRating(type);
  };

  // 选择图片
  const handleChooseImage = () => {
    if (images.length >= 6) {
      Taro.showToast({ title: '最多上传6张图片', icon: 'none' });
      return;
    }
    Taro.chooseImage({
      count: 6 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImages(prev => [...prev, ...res.tempFilePaths]);
      },
      fail: (err) => {
        console.log('取消选择图片或选择失败:', err);
      },
    });
  };

  // 删除图片
  const handleDeleteImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // 预览图片
  const handlePreviewImage = (current: string) => {
    Taro.previewImage({
      current,
      urls: images,
    });
  };

  // 提交评价
  const handleReviewSubmit = async () => {
    if (reviewContent.trim().length === 0) {
      Taro.showToast({ title: '请输入评价内容', icon: 'none' });
      return;
    }
    if (!order?.id) {
      Taro.showToast({ title: '订单信息异常', icon: 'none' });
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    Taro.showLoading({ title: '提交中...', mask: true });

    try {
      // 先将本地临时图片上传到服务器，拿到URL列表
      let uploadedImages: string[] = [];
      if (images.length > 0) {
        Taro.showLoading({ title: `上传图片 0/${images.length}`, mask: true });
        uploadedImages = [];
        for (let i = 0; i < images.length; i++) {
          Taro.showLoading({ title: `上传图片 ${i + 1}/${images.length}`, mask: true });
          const url = await uploadImage(userApi.upload, images[i], 'file', { type: 'review' });
          uploadedImages.push(url);
        }
        Taro.showLoading({ title: '提交中...', mask: true });
      }

      // 构造评价载荷：后端要求 Items 为必填字段，始终发送每商品评价
      const payload: any = {
        rating: ratingScoreMap[rating],
        ratingType: rating,
        content: reviewContent.trim(),
        images: uploadedImages,
        anonymous,
        items: (order.items || []).map((it: any) => ({
          productId: it.productId,
          skuId: it.skuId,
          rating: ratingScoreMap[rating],
          content: reviewContent.trim(),
          images: uploadedImages,
        })),
      };

      await submitOrderReview(order.id, payload);
      Taro.hideLoading();
      Taro.showToast({ title: '评价成功', icon: 'success' });

      // 通过事件中心通知订单列表页刷新
      Taro.eventCenter.trigger('orderReviewSuccess', order.id);

      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    } catch (error: any) {
      Taro.hideLoading();
      console.error('提交评价失败:', error);
      Taro.showToast({
        title: error?.message || '评价提交失败，请稍后重试',
        icon: 'none',
        duration: 2500,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBuyAgain = () => {
    if (order?.items?.[0]?.productId) {
      Taro.navigateTo({
        url: `/pages/home/detail/index?id=${order.items[0].productId}`
      });
    }
  };

  const handleRefund = () => {
    if (order?.id) {
      Taro.navigateTo({ url: `/pages/cart/order/refund/index?id=${order.id}` });
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

  const ratingLabel = ratingLabelMap[rating];

  return (
    <View className={styles.reviewPage}>
      <View className={styles.navBar}>
        <View className={styles.navContent}>
          <Text className={styles.navBack} onClick={() => Taro.navigateBack()}>‹</Text>
          <Text className={styles.navTitle}>{isReviewed ? '我的评价' : '评价晒单'}</Text>
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
          <View key={item.id || item.productId} className={styles.productSection}>
            <View className={styles.productItem}>
              <Image
                src={item.image}
                className={styles.productImage}
                mode="aspectFill"
                {...lazyImgProps()}
              />
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
              className={`${styles.ratingBtn} ${styles.goodBtn} ${(isReviewed ? reviews[0]?.ratingType === 'good' : rating === 'good') ? styles.active : ''}`}
              onClick={() => !isReviewed && handleRatingClick('good')}
            >
              <Text className={styles.ratingEmoji}>😊</Text>
              <Text className={styles.ratingText}>好评</Text>
            </View>
            <View
              className={`${styles.ratingBtn} ${styles.badBtn} ${(isReviewed ? reviews[0]?.ratingType === 'bad' : rating === 'bad') ? styles.active : ''}`}
              onClick={() => !isReviewed && handleRatingClick('bad')}
            >
              <Text className={styles.ratingEmoji}>😢</Text>
              <Text className={styles.ratingText}>差评</Text>
            </View>
          </View>
          <Text className={styles.ratingDesc}>
            {isReviewed ? ratingLabelMap[reviews[0]?.ratingType] || '好评' : ratingLabel}
          </Text>
        </View>

        <View className={styles.contentSection}>
          <Text className={styles.contentLabel}>评价内容</Text>
          {isReviewed ? (
            <Text className={styles.contentInput} style={{ minHeight: '120rpx', color: '#333' }}>
              {reviews[0]?.content || '无评价内容'}
            </Text>
          ) : (
            <Textarea
              className={styles.contentInput}
              value={reviewContent}
              onInput={(e: any) => setReviewContent(e.detail.value)}
              placeholder="请输入您对商品的评价..."
              maxlength={500}
            />
          )}
          <View className={styles.contentFooter}>
            <Text className={styles.contentHint}>
              {isReviewed ? reviews[0]?.content?.length || 0 : reviewContent.length}/500
            </Text>
            {!isReviewed && (
              <View
                className={`${styles.anonymousToggle} ${anonymous ? styles.anonymousActive : ''}`}
                onClick={() => setAnonymous(!anonymous)}
              >
                <Text className={styles.anonymousText}>{anonymous ? '☑' : '☐'} 匿名评价</Text>
              </View>
            )}
          </View>
        </View>

        <View className={styles.imageSection}>
          <Text className={styles.imageLabel}>
            {isReviewed ? '晒单图片' : '晒单图片（可选，最多6张）'}
          </Text>
          <View className={styles.imageGrid}>
            {(isReviewed ? reviews[0]?.images || [] : images).map((img: string, idx: number) => (
              <View key={idx} className={styles.imageItemWrap} style={{ position: 'relative' }}>
                <Image
                  src={img}
                  className={styles.imageItem}
                  mode="aspectFill"
                  onClick={() => handlePreviewImage(img)}
                />
                {!isReviewed && (
                  <View
                    style={{
                      position: 'absolute',
                      top: '-10rpx',
                      right: '-10rpx',
                      width: '40rpx',
                      height: '40rpx',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      fontSize: '28rpx',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                    onClick={() => handleDeleteImage(idx)}
                  >
                    ×
                  </View>
                )}
              </View>
            ))}
            {!isReviewed && images.length < 6 && (
              <View className={`${styles.imageItem} ${styles.imageUpload}`} onClick={handleChooseImage}>
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
        {isReviewed ? (
          <View className={`${styles.actionBtn} ${styles.actionBtnPrimary}`} onClick={() => Taro.navigateBack()}>
            返回
          </View>
        ) : (
          <>
            <View className={styles.actionBtn} onClick={handleRefund}>
              退款/售后
            </View>
            <View
              className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
              onClick={handleReviewSubmit}
              style={submitting ? { opacity: 0.6 } : {}}
            >
              {submitting ? '提交中...' : '评价晒单'}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default OrderReviewPage;
