import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiGet } from '@/api/common';
import { productApi, fetchReviewList, fetchReviewStats, fetchReviewAiSummary, likeReview, replyToReview, fetchReviewReplies } from '@/api/home';
import { addToCartAPI } from '@/api/cart';
import { fetchProductSeckillActivity, createSeckillPurchase, pollSeckillPurchaseResult } from '@/api/seckill';
import { getImageUrl, normalizeProductImages, lazyImgProps } from '@/utils/image';
import styles from '@/styles/home/detail.module.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  sales: number;
  stock: number;
  skus: Array<{
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    specs: { [key: string]: string };
  }>;
  evaluateCount: number;
  evaluateScore: number;
  tags: string[];
}

const EvaluationItem = React.memo(({ 
  evaluation, 
  onLike, 
  onComment 
}: { 
  evaluation: any; 
  onLike: (id: string) => void;
  onComment: (evaluation: any) => void;
}) => (
  <View key={evaluation.id} className={styles.evaluateItem}>
    <View className={styles.evaluateHeader}>
      <Image 
        src={getImageUrl(evaluation.userAvatar)} 
        className={styles.userAvatar} 
        mode="aspectFill" 
        {...lazyImgProps()}
      />
      <View className={styles.userInfo}>
        <Text className={styles.userName}>{evaluation.userName}</Text>
        <Text className={styles.evaluateTime}>{evaluation.createdAt || evaluation.createTime}</Text>
      </View>
    </View>
    <Text className={styles.evaluateContent}>{evaluation.content}</Text>
    {evaluation.images && evaluation.images.length > 0 && (
      <View className={styles.evaluateImages}>
        {evaluation.images.map((img: string, idx: number) => (
          <Image key={idx} src={getImageUrl(img)} mode="aspectFill" {...lazyImgProps()} />
        ))}
      </View>
    )}
    <View className={styles.evaluateActions}>
      <View 
        className={`${styles.actionItem} ${evaluation.isLike ? styles.liked : ''}`}
        onClick={() => onLike(evaluation.id)}
      >
        <Text className={styles.actionIcon}>{evaluation.isLike ? '❤️' : '👍'}</Text>
        <Text className={styles.actionText}>{evaluation.likeCount}</Text>
      </View>
      <View className={styles.actionItem} onClick={() => onComment(evaluation)}>
        <Text className={styles.actionIcon}>💬</Text>
        <Text className={styles.actionText}>评论</Text>
      </View>
    </View>
  </View>
));

const SkuOptionGroup = React.memo(({ 
  specName, 
  product, 
  specSelections, 
  availableValues,
  onSelect 
}: { 
  specName: string; 
  product: Product;
  specSelections: { [key: string]: string };
  availableValues: string[];
  onSelect: (specName: string, specValue: string) => void;
}) => (
  <View key={specName} className={styles.optionGroup}>
    <Text className={styles.optionLabel}>{specName}</Text>
    <View className={styles.optionValues}>
      {Array.from(new Set(product.skus.map(sku => sku.specs[specName]))).map((specValue: string) => {
        const isAvailable = availableValues.includes(specValue);
        const isSelected = specSelections[specName] === specValue;
        return (
          <View
            key={specValue}
            className={`${styles.optionValue} ${isSelected ? styles.active : ''} ${!isAvailable ? styles.disabled : ''}`}
            onClick={() => isAvailable && onSelect(specName, specValue)}
          >
            {specValue}
          </View>
        );
      })}
    </View>
  </View>
));

const ProductDetailPage: React.FC = () => {
  const { addToCart, currentStore } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSku, setSelectedSku] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSkuModal, setShowSkuModal] = useState(false);
  const [skuModalType, setSkuModalType] = useState<'cart' | 'buy'>('cart');
  const [specSelections, setSpecSelections] = useState<{ [key: string]: string }>({});
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [evalStats, setEvalStats] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [isSeckill, setIsSeckill] = useState(false);
  const [seckillCountdown, setSeckillCountdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState('');
  // 秒杀活动信息
  const [seckillActivityId, setSeckillActivityId] = useState('');
  const [seckillInfo, setSeckillInfo] = useState<any>(null);
  const [purchasing, setPurchasing] = useState(false);

  const onBannerChange = useCallback((e: any) => {
    setCurrentImage(e.detail.current);
  }, []);

  const getAvailableSpecValues = useCallback((specName: string) => {
    if (!product) return [];
    const availableValues: string[] = [];
    
    product.skus.forEach(sku => {
      const otherSpecsMatch = Object.entries(specSelections).every(([key, value]) => {
        if (key === specName) return true;
        return sku.specs[key] === value;
      });
      
      if (otherSpecsMatch) {
        availableValues.push(sku.specs[specName]);
      }
    });
    
    return [...new Set(availableValues)];
  }, [product, specSelections]);

  const selectSpec = useCallback((specName: string, specValue: string) => {
    // 构建新选择：设置当前规格，保留其他兼容的规格
    const newSelections: { [key: string]: string } = { [specName]: specValue };

    Object.entries(specSelections).forEach(([key, value]) => {
      if (key === specName) return;
      // 检查该规格值与新选择是否至少有一个匹配的 SKU
      const hasAnyMatch = product?.skus.some(sku =>
        sku.specs[key] === value && sku.specs[specName] === specValue
      );
      if (hasAnyMatch) {
        newSelections[key] = value;
      }
    });

    // 查找是否有完全匹配的 SKU
    const matchedSku = product?.skus.find(sku =>
      Object.entries(newSelections).every(([key, value]) => sku.specs[key] === value)
    );

    setSpecSelections(newSelections);
    setSelectedSku(matchedSku || null);
  }, [product, specSelections]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const increaseQuantity = useCallback(() => {
    if (!selectedSku) {
      Taro.showToast({ title: '请先选择规格', icon: 'none' });
      return;
    }
    if (quantity < selectedSku.stock) {
      setQuantity(quantity + 1);
    } else {
      Taro.showToast({ title: '库存不足', icon: 'none' });
    }
  }, [selectedSku, quantity]);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;
    if (!selectedSku) {
      Taro.showToast({ title: '请选择完整规格', icon: 'none' });
      return;
    }
    try {
      await addToCartAPI({
        productId: product.id,
        skuId: selectedSku.id,
        quantity: quantity,
      });
    } catch (error) {
      console.error('添加到购物车API失败:', error);
    }
    addToCart({
      productId: product.id,
      productName: product.name,
      skuId: selectedSku.id,
      skuName: selectedSku.name,
      price: selectedSku.price,
      quantity: quantity,
      image: selectedSku.image || product.images[0],
      stock: selectedSku.stock,
      isSeckill
    });
    setShowSkuModal(false);
  }, [addToCart, product, selectedSku, quantity, isSeckill]);

  // 秒杀购买流程：创建秒杀订单 -> 轮询购买结果
  const handleSeckillPurchase = useCallback(async () => {
    if (!product) return;
    if (purchasing) return;
    setPurchasing(true);
    Taro.showLoading({ title: '抢购中...', mask: true });
    try {
      const purchaseRes = await createSeckillPurchase({
        activityId: seckillActivityId,
        productId: product.id,
        skuId: selectedSku?.id,
        quantity: quantity,
      });
      const purchaseId = purchaseRes?.data?.purchaseId || purchaseRes?.data?.id || purchaseRes?.data?.orderId || '';
      if (!purchaseId) {
        // 未返回 purchaseId：后端可能为同步处理，直接展示返回结果
        const status = purchaseRes?.data?.status;
        const statusText = purchaseRes?.data?.statusText;
        Taro.hideLoading();
        if (status === 'success' || status === 'succeeded' || status === 'paid') {
          Taro.showToast({ title: '抢购成功', icon: 'success' });
        } else {
          Taro.showToast({ title: statusText || purchaseRes?.data?.message || '抢购结果未知', icon: 'none' });
        }
        return;
      }

      // 轮询购买结果
      const result = await pollSeckillPurchaseResult(purchaseId, { interval: 1500, timeout: 15000 });
      Taro.hideLoading();
      const status = String(result.status ?? '');
      if (status === 'success' || status === 'succeeded' || status === 'paid') {
        Taro.showModal({
          title: '抢购成功',
          content: `订单号：${result.orderId || purchaseId}`,
          showCancel: true,
          confirmText: '去支付',
          cancelText: '继续逛',
          success: (res) => {
            if (res.confirm && result.orderId) {
              Taro.navigateTo({ url: `/pages/cart/order/detail/index?id=${result.orderId}` });
            }
          }
        });
      } else if (status === 'out_of_stock' || status === 'out-of-stock' || status === 'sold_out') {
        Taro.showToast({ title: '手慢了，商品已售罄', icon: 'none' });
      } else {
        Taro.showToast({ title: result.statusText || result.message || '抢购失败', icon: 'none' });
      }
    } catch (error: any) {
      Taro.hideLoading();
      console.error('Seckill purchase failed:', error);
      Taro.showToast({ title: error?.message || '抢购失败，请重试', icon: 'none' });
    } finally {
      setPurchasing(false);
    }
  }, [product, selectedSku, quantity, seckillActivityId, purchasing]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    if (!selectedSku) {
      Taro.showToast({ title: '请选择完整规格', icon: 'none' });
      return;
    }
    setShowSkuModal(false);
    // 秒杀商品走秒杀购买流程
    if (isSeckill) {
      handleSeckillPurchase();
      return;
    }
    setTimeout(() => {
      const buyNowData = JSON.stringify({
        productId: product.id,
        productName: product.name,
        skuId: selectedSku.id,
        skuName: selectedSku.name,
        price: selectedSku.price,
        quantity: quantity,
        image: selectedSku.image || product.images[0],
        stock: selectedSku.stock,
        isSeckill
      });
      Taro.navigateTo({
        url: `/pages/cart/checkout/index?buyNow=${encodeURIComponent(buyNowData)}`
      });
    }, 300);
  }, [product, selectedSku, quantity, isSeckill, handleSeckillPurchase]);

  const openSkuModal = useCallback((type: 'cart' | 'buy') => {
    setSkuModalType(type);
    setShowSkuModal(true);
  }, []);

  const goHome = useCallback(() => {
    Taro.switchTab({ url: '/pages/home/index' });
  }, []);

  const goToCart = useCallback(() => {
    Taro.switchTab({ url: '/pages/cart/index' });
  }, []);

  const goToEvaluations = useCallback(() => {
    Taro.navigateTo({ url: `/pages/home/evaluations/index?id=${product?.id}` });
  }, [product]);

  const callStore = useCallback(() => {
    if (currentStore) {
      Taro.makePhoneCall({ phoneNumber: currentStore.phone });
    }
  }, [currentStore]);

  const handleSwitchStore = useCallback(() => {
    Taro.navigateTo({ url: '/pages/category/stores/index' });
  }, []);

  const goToCustomerService = useCallback(() => {
    Taro.switchTab({ url: '/pages/message/index' });
  }, []);

  const handleShare = useCallback(() => {
    try {
      const shareLink = `https://lexiangou.com/product/${product?.id}`;
      Taro.setClipboardData({
        data: shareLink,
        success: () => {
          Taro.showToast({ title: '链接已复制', icon: 'success' });
        },
        fail: () => {
          Taro.showToast({ title: '复制失败', icon: 'none' });
        }
      });
    } catch (error) {
      Taro.showToast({ title: '复制失败', icon: 'none' });
    }
  }, [product]);

  const handleEvaluationLike = useCallback(async (evalId: string) => {
    try {
      await likeReview(evalId);
      setEvaluations(prev => {
        return prev.map(evalItem => {
          if (evalItem.id === evalId) {
            return {
              ...evalItem,
              isLike: !evalItem.isLike,
              likeCount: evalItem.isLike ? evalItem.likeCount - 1 : evalItem.likeCount + 1
            };
          }
          return evalItem;
        });
      });
    } catch (error) {
      console.error('Failed to like review:', error);
    }
  }, []);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [commentInput, setCommentInput] = useState('');

  const openCommentModal = useCallback(async (evaluation: any) => {
    setCurrentEvaluation({ ...evaluation, comments: [], loadingReplies: true });
    setShowCommentModal(true);
    // 加载该评价的回复列表
    try {
      const res = await fetchReviewReplies({ reviewId: evaluation.id, page: 1, size: 50 });
      const replies = Array.isArray(res?.data) ? res.data : [];
      setCurrentEvaluation(prev => prev ? { ...prev, comments: replies, loadingReplies: false } : prev);
    } catch (error) {
      console.error('Failed to load review replies:', error);
      setCurrentEvaluation(prev => prev ? { ...prev, comments: [], loadingReplies: false } : prev);
    }
  }, []);

  const closeCommentModal = useCallback(() => {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  }, []);

  const sendComment = useCallback(async () => {
    if (!commentInput.trim()) {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }
    if (!currentEvaluation?.id) {
      Taro.showToast({ title: '评价信息异常', icon: 'none' });
      return;
    }

    try {
      await replyToReview({
        reviewId: currentEvaluation.id,
        content: commentInput.trim(),
      });

      const newComment = {
        id: `comment-${Date.now()}`,
        reviewId: currentEvaluation.id,
        userId: 'user-current',
        userName: '我',
        userAvatar: '',
        content: commentInput.trim(),
        createTime: new Date().toLocaleString(),
        likeCount: 0,
        isLike: false
      };

      setCurrentEvaluation(prev => prev ? {
        ...prev,
        comments: [...(prev.comments || []), newComment]
      } : prev);

      setCommentInput('');
      Taro.showToast({ title: '评论成功', icon: 'success' });
    } catch (error) {
      console.error('Failed to send comment:', error);
      Taro.showToast({ title: '评论失败', icon: 'none' });
    }
  }, [commentInput, currentEvaluation]);

  useEffect(() => {
    const { id, seckill, activityId } = Taro.getCurrentInstance().router?.params || {};
    const isSeckillPage = seckill === '1';
    setIsSeckill(isSeckillPage);
    if (activityId) setSeckillActivityId(activityId);

    if (!id) {
      Taro.showToast({ title: '商品不存在', icon: 'none' });
      setTimeout(() => Taro.navigateBack(), 1000);
      return;
    }

    setProductId(id);

    const loadProduct = async () => {
      setLoading(true);
      try {
        // 并行加载：商品详情、评价列表、评价统计、AI评价摘要
        const requestList: Promise<any>[] = [
          apiGet(productApi.detail, { id }).catch((err: any) => {
            console.error('[商品详情] 加载失败:', err?.message || err);
            return null;
          }),
          // 商品评论列表 GET /api/v1/review/list
          fetchReviewList({ productId: id, page: 1, size: 2 }).catch((err: any) => {
            console.error('[商品评价] 加载失败:', err?.message || err);
            return null;
          }),
          // 评价统计 GET /api/v1/review/state
          fetchReviewStats(id).catch((err: any) => {
            console.error('[评价统计] 加载失败:', err?.message || err);
            return null;
          }),
          // AI评价摘要 GET /api/v1/review/ai
          fetchReviewAiSummary(id).catch((err: any) => {
            console.error('[AI评价摘要] 加载失败:', err?.message || err);
            return null;
          }),
        ];

        // 秒杀商品：额外获取指定商品秒杀活动信息
        if (isSeckillPage) {
          requestList.push(
            fetchProductSeckillActivity({ productId: id, activityId: activityId || undefined }).catch(() => null)
          );
        }

        const [productRes, reviewRes, statsRes, aiRes, seckillRes] = await Promise.all(requestList);

        if (productRes?.data) {
          const productData = normalizeProductImages(productRes.data);
          setProduct(productData);

          if (productData.skus && productData.skus.length > 0) {
            // 只预填第一个规格维度，其他维度留空
            // 避免全预填导致的规格联动锁定问题
            const firstSpecKey = productData.skus[0].specs
              ? Object.keys(productData.skus[0].specs)[0]
              : '';
            const initialSelections: { [key: string]: string } = {};
            if (firstSpecKey) {
              initialSelections[firstSpecKey] = productData.skus[0].specs[firstSpecKey];
            }
            setSpecSelections(initialSelections);

            // 如果只有一个规格维度，直接匹配完整 SKU
            if (Object.keys(initialSelections).length === Object.keys(productData.skus[0].specs || {}).length) {
              setSelectedSku(productData.skus[0]);
            } else {
              setSelectedSku(null);
            }
          }
        }

        // 解析评价列表（fetchReviewList 已做规范化）
        if (reviewRes?.data && Array.isArray(reviewRes.data)) {
          const reviewList = reviewRes.data;
          if (reviewList.length > 0) {
            console.log('[商品评价] 加载成功，共', reviewList.length, '条评价');
            setEvaluations(reviewList.slice(0, 2));
          } else {
            console.warn('[商品评价] 接口返回但数据为空');
          }
        }

        // 解析评价统计（fetchReviewStats 已做规范化）
        if (statsRes?.data) {
          console.log('[评价统计] 加载成功:', statsRes.data);
          setEvalStats(statsRes.data);
        }

        // 解析 AI 评价摘要（fetchReviewAiSummary 已做规范化）
        if (aiRes?.data && (aiRes.data.overall || aiRes.data.strengths?.length || aiRes.data.weaknesses?.length)) {
          console.log('[AI评价摘要] 加载成功:', aiRes.data);
          setAiSummary(aiRes.data);
        }

        // 处理秒杀活动信息
        if (seckillRes?.data) {
          let data = seckillRes.data;
          // 如果返回的是数组，取第一个元素
          if (Array.isArray(data) && data.length > 0) {
            data = data[0];
          }
          if (data && typeof data === 'object') {
            // fetchProductSeckillActivity 可能返回活动对象（含 products）或单个商品活动
            if (data.products || data.endTime) {
              setSeckillInfo(data);
              if (data.id) setSeckillActivityId(String(data.id));
            } else if (data.seckillPrice !== undefined || data.seckill_price !== undefined) {
              setSeckillInfo(data);
              if (data.activityId) setSeckillActivityId(String(data.activityId));
            }
          }
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        Taro.showToast({ title: '加载失败', icon: 'none' });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, []);

  useEffect(() => {
    if (!isSeckill) return;

    const updateCountdown = () => {
      // 优先使用秒杀活动返回的 endTime，兜底默认 12 小时后
      const endTimeStr = seckillInfo?.endTime
        || seckillInfo?.end_time
        || new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      const now = new Date().getTime();
      const endTime = new Date(String(endTimeStr).replace(/-/g, '/')).getTime();
      const diff = endTime - now;

      if (diff <= 0) {
        setSeckillCountdown('已结束');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setSeckillCountdown(`${days}天${hours}时${minutes}分`);
      } else {
        setSeckillCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [isSeckill, seckillInfo]);

  if (loading || !product) {
    return (
      <View className={styles.productDetailPage}>
        <View style={{ padding: '100rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.productDetailPage}>
      <ScrollView scrollY style={{ height: 'calc(100vh - 120rpx)' }}>
        <View className={styles.bannerWrap}>
          <View className={styles.shareBtn} onClick={handleShare}>
            <Text className={styles.shareIcon}>↗</Text>
          </View>
          <View className={styles.productBanner}>
            {(product.images && product.images.length > 0) ? (
              <Swiper
                autoplay={product.images.length > 1}
                interval={3000}
                circular={product.images.length > 1}
                onChange={onBannerChange}
              >
                {product.images.map((image, index) => (
                  <SwiperItem key={index}>
                    <Image src={getImageUrl(image)} mode="aspectFill" {...lazyImgProps()} />
                  </SwiperItem>
                ))}
              </Swiper>
            ) : (
              <Image src={getImageUrl('')} mode="aspectFill" className={styles.productBannerFallback} />
            )}
            <Text className={styles.bannerIndicator}>
              {currentImage + 1}/{product.images.length || 1}
            </Text>
          </View>
        </View>

        <View className={styles.priceSection}>
          <View className={styles.priceRow}>
            <Text className={styles.currentPrice}>¥{selectedSku?.price || product.price}</Text>
            {product.originalPrice && <Text className={styles.originalPrice}>¥{product.originalPrice}</Text>}
            {isSeckill && (
              <View className={styles.seckillBadge}>
                <Text className={styles.seckillBadgeText}>限时秒杀</Text>
                <Text className={styles.seckillBadgeTime}>{seckillCountdown}</Text>
              </View>
            )}
          </View>
          <View className={styles.salesRow}>
            <Text className={styles.salesValue}>{product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万` : product.sales}</Text>
            <Text className={styles.salesLabel}>已售</Text>
          </View>
          {product.tags && product.tags.length > 0 && (
            <View className={styles.activityTags}>
              {product.tags.map((tag: string) => (
                <Text key={tag} className={styles.tag}>{tag}</Text>
              ))}
            </View>
          )}
        </View>

        <View className={styles.infoSection}>
          <Text className={styles.productName}>{product.name}</Text>
          <View className={styles.productTags}>
            <Text className={styles.tag}>{product.brandName}</Text>
            <Text className={styles.tag}>{product.categoryName}</Text>
          </View>
        </View>

        <View className={styles.storeSection}>
          <View className={styles.storeHeader}>
            <Text className={styles.sectionTitle}>门店自提</Text>
            <Text className={styles.switchStoreBtn} onClick={handleSwitchStore}>切换门店 &gt;</Text>
          </View>
          <View className={styles.storeInfo}>
            <View className={styles.storeAvatar}>🏪</View>
            <View className={styles.storeDetails}>
              <Text className={styles.storeName}>{currentStore?.name || '深圳南山科技园店'}</Text>
              <Text className={styles.storeAddress}>{currentStore?.address || '广东省深圳市南山区科技园南区A2栋1楼'}</Text>
              <Text className={styles.storeHours}>营业时间: {currentStore?.hours || '09:00-22:00'}</Text>
            </View>
            <View className={styles.storeAction} onClick={callStore}>
              <Text className={styles.phoneIcon}>📞</Text>
              拨打电话
            </View>
          </View>
        </View>

        <View className={styles.evaluateSection}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>商品评价</Text>
              <Text className={styles.viewAll} onClick={goToEvaluations}>查看全部</Text>
            </View>

            {/* 评价统计栏：评分、好评率、评价总数 */}
            {evalStats && (
              <View className={styles.statsBar}>
                <View className={styles.statsScore}>
                  <Text className={styles.statsScoreVal}>{Number(evalStats.averageRating || 0).toFixed(1)}</Text>
                  <View className={styles.statsStars}>
                    {[5, 4, 3, 2, 1].map(star => (
                      <Text key={star} className={star <= Math.round(Number(evalStats.averageRating || 0)) ? styles.statsStarActive : styles.statsStarInactive}>★</Text>
                    ))}
                  </View>
                  <Text className={styles.statsGoodRate}>好评率 {evalStats.goodRate || 100}%</Text>
                </View>
                <View className={styles.statsCounts}>
                  <Text className={styles.statsCountItem}>
                    <Text className={styles.statsCountNum}>{evalStats.total || 0}</Text>
                    <Text className={styles.statsCountLabel}>条评价</Text>
                  </Text>
                </View>
              </View>
            )}
            
            {aiSummary && (
              <View className={styles.aiSummarySection}>
                <View className={styles.aiSummaryHeader}>
                  <View className={styles.aiIcon}>🤖</View>
                  <Text className={styles.aiSummaryTitle}>AI评价总结</Text>
                  <View className={styles.aiScore}>
                    <Text className={styles.scoreValue}>{Math.round((aiSummary.averageRating || 0) * 20)}%</Text>
                    <Text className={styles.scoreLabel}>综合评分</Text>
                  </View>
                </View>
                {aiSummary.overall && <Text className={styles.aiOverall}>{aiSummary.overall}</Text>}
                {aiSummary.strengths && aiSummary.strengths.length > 0 && (
                  <View className={styles.aiStrengths}>
                    <Text className={styles.aiLabel}>👍 好评亮点</Text>
                    <View className={styles.aiTags}>
                      {aiSummary.strengths.map((tag: string, idx: number) => (
                        <Text key={idx} className={styles.aiTag}>{tag}</Text>
                      ))}
                    </View>
                  </View>
                )}
                {aiSummary.weaknesses && aiSummary.weaknesses.length > 0 && (
                  <View className={styles.aiWeaknesses}>
                    <Text className={styles.aiLabel}>👎 待改进</Text>
                    <View className={styles.aiTags}>
                      {aiSummary.weaknesses.map((tag: string, idx: number) => (
                        <Text key={idx} className={`${styles.aiTag} ${styles.weakTag}`}>{tag}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {evaluations.length > 0 ? (
              <View className={styles.evaluateList}>
                {evaluations.map((evaluation) => (
                  <EvaluationItem 
                    key={evaluation.id} 
                    evaluation={evaluation}
                    onLike={handleEvaluationLike}
                    onComment={openCommentModal}
                  />
                ))}
              </View>
            ) : (
              <View className={styles.noEval}>
                <Text className={styles.noEvalIcon}>📝</Text>
                <Text className={styles.noEvalText}>暂无评价，期待您的首次评价</Text>
              </View>
            )}
          </View>

        <View className={styles.detailSection}>
          <Text className={styles.sectionTitle}>商品详情</Text>
          <View className={styles.detailContent}>
            <Text>{product.description}</Text>
          </View>
        </View>

        <View style={{ height: '40rpx' }} />
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.actionIcons}>
          <View className={styles.actionItem} onClick={goHome}>
            <Text className={styles.icon}>🏠</Text>
            <Text>首页</Text>
          </View>
          <View className={styles.actionItem} onClick={goToCustomerService}>
            <Text className={styles.icon}>💬</Text>
            <Text>客服</Text>
          </View>
          <View className={styles.actionItem} onClick={goToCart}>
            <Text className={styles.icon}>🛒</Text>
            <Text>购物车</Text>
          </View>
        </View>
        <View className={styles.actionButtons}>
          <View className={styles.addCartBtn} onClick={() => openSkuModal('cart')}>
            加入购物车
          </View>
          <View
            className={`${styles.buyNowBtn} ${purchasing ? styles.disabled : ''}`}
            onClick={() => !purchasing && openSkuModal('buy')}
          >
            <Text className={styles.buyBtnText}>{purchasing ? '抢购中...' : (isSeckill ? '立即抢购' : '立即购买')}</Text>
            {isSeckill && seckillCountdown && (
              <Text className={styles.btnCountdown}>{seckillCountdown}</Text>
            )}
          </View>
        </View>
      </View>

      {showSkuModal && (
        <View className={styles.skuModal}>
          <View className={styles.modalMask} onClick={() => setShowSkuModal(false)} />
          <View className={styles.modalContent}>
            <View className={styles.modalHeader}>
              <Image 
                src={getImageUrl(selectedSku?.image || product.images[0])}
                className={styles.selectedImage}
                mode="aspectFill"
                {...lazyImgProps()}
              />
              <View className={styles.selectedInfo}>
                <Text className={styles.selectedPrice}>¥{selectedSku?.price || product.price}</Text>
                <Text className={styles.selectedStock}>库存: {selectedSku?.stock || 0} 件</Text>
                <Text className={styles.selectedName}>{selectedSku?.name || '请选择规格'}</Text>
              </View>
              <View className={styles.closeBtn} onClick={() => setShowSkuModal(false)}>×</View>
            </View>
            
            <View className={styles.modalBody}>
              {product.skus[0] && product.skus[0].specs && Object.keys(product.skus[0].specs).map((specName) => (
                <SkuOptionGroup
                  key={specName}
                  specName={specName}
                  product={product}
                  specSelections={specSelections}
                  availableValues={getAvailableSpecValues(specName)}
                  onSelect={selectSpec}
                />
              ))}
              
              <View className={styles.quantityRow}>
                <Text className={styles.quantityLabel}>购买数量</Text>
                <View className={styles.quantityControl}>
                  <View 
                    className={`${styles.quantityBtn} ${quantity <= 1 ? styles.disabled : ''}`}
                    onClick={decreaseQuantity}
                  >
                    -
                  </View>
                  <Text className={styles.quantityNum}>{quantity}</Text>
                  <View className={styles.quantityBtn} onClick={increaseQuantity}>+</View>
                </View>
              </View>
            </View>
            
            <View className={styles.modalFooter}>
              <View className={styles.confirmBtn} onClick={skuModalType === 'cart' ? handleAddToCart : handleBuyNow}>
                确定{skuModalType === 'cart' ? '加入购物车' : '立即购买'}
              </View>
            </View>
          </View>
        </View>
      )}

      {showCommentModal && currentEvaluation && (
        <View className={styles.commentModal}>
          <View className={styles.modalMask} onClick={closeCommentModal} />
          <View className={styles.commentModalContent}>
            <View className={styles.commentModalHeader}>
              <Text className={styles.commentModalTitle}>全部讨论</Text>
              <View className={styles.commentModalClose} onClick={closeCommentModal}>
                <Text>×</Text>
              </View>
            </View>
            <ScrollView scrollY className={styles.commentModalBody}>
              {!currentEvaluation.comments || currentEvaluation.comments.length === 0 ? (
                <View className={styles.emptyComment}>
                  <Text>暂无评论，快来发表第一条评论吧~</Text>
                </View>
              ) : (
                <View className={styles.commentList}>
                  {currentEvaluation.comments.map((comment: any) => (
                    <View key={comment.id} className={styles.commentItem}>
                      <Image 
                        src={getImageUrl(comment.userAvatar)}
                        className={styles.commentAvatar} 
                        mode="aspectFill" 
                        {...lazyImgProps()}
                      />
                      <View className={styles.commentContent}>
                        <View className={styles.commentHeader}>
                          <Text className={styles.commentUserName}>{comment.userName}</Text>
                          <Text className={styles.commentTime}>{comment.createdAt || comment.createTime}</Text>
                        </View>
                        <Text className={styles.commentText}>{comment.content}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
            <View className={styles.commentModalFooter}>
              <Input 
                className={styles.commentInput}
                placeholder="说说你的想法~"
                value={commentInput}
                onInput={(e: any) => setCommentInput(e.detail.value)}
                onConfirm={sendComment}
              />
              <View className={styles.commentSendBtn} onClick={sendComment}>
                <Text>提问</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default React.memo(ProductDetailPage);
