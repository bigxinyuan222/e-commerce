import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { getProductById } from '@/data/product/products';
import { getEvaluationsByProduct, getEvaluationStats, getAiSummary } from '@/data/product/evaluations';
import { availableCoupons, Coupon } from '@/data/common/coupons';

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
        src={evaluation.userAvatar} 
        className={styles.userAvatar} 
        mode="aspectFill" 
        lazyLoad
      />
      <View className={styles.userInfo}>
        <Text className={styles.userName}>{evaluation.userName}</Text>
        <Text className={styles.evaluateTime}>{evaluation.createTime}</Text>
      </View>
    </View>
    <Text className={styles.evaluateContent}>{evaluation.content}</Text>
    {evaluation.images.length > 0 && (
      <View className={styles.evaluateImages}>
        {evaluation.images.map((img: string, idx: number) => (
          <Image key={idx} src={img} mode="aspectFill" lazyLoad />
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

// SKU选项组件
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
      {Array.from(new Set(product.skus.map(sku => sku.specs[specName]))).map((specValue) => {
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
  const [, setEvalStats] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [isSeckill, setIsSeckill] = useState(false);
  const [seckillCountdown, setSeckillCountdown] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [commentInput, setCommentInput] = useState('');
  const [productCoupons, setProductCoupons] = useState<Coupon[]>([]);

  // 使用 useMemo 缓存折扣计算
  

  // 使用 useCallback 缓存事件处理函数
  const onBannerChange = useCallback((e: any) => {
    setCurrentImage(e.detail.current);
  }, []);

  // 获取可选的规格值
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

  // 选择规格
  const selectSpec = useCallback((specName: string, specValue: string) => {
    const newSelections = { ...specSelections, [specName]: specValue };
    setSpecSelections(newSelections);
    
    const matchedSku = product?.skus.find(sku => {
      return Object.entries(newSelections).every(([key, value]) => sku.specs[key] === value);
    });
    
    if (matchedSku) {
      setSelectedSku(matchedSku);
    }
  }, [product, specSelections]);

  // 减少数量
  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  // 增加数量
  const increaseQuantity = useCallback(() => {
    if (selectedSku && quantity < selectedSku.stock) {
      setQuantity(quantity + 1);
    } else {
      Taro.showToast({ title: '库存不足', icon: 'none' });
    }
  }, [selectedSku, quantity]);

  // 添加到购物车
  const handleAddToCart = useCallback(() => {
    if (!product || !selectedSku) return;
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

  // 立即购买
  const handleBuyNow = useCallback(() => {
    if (!product || !selectedSku) return;
    setShowSkuModal(false);
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
  }, [product, selectedSku, quantity, isSeckill]);

  // 打开SKU弹窗
  const openSkuModal = useCallback((type: 'cart' | 'buy') => {
    setSkuModalType(type);
    setShowSkuModal(true);
  }, []);

  // 返回首页
  const goHome = useCallback(() => {
    Taro.switchTab({ url: '/pages/home/index' });
  }, []);

  // 跳转到购物车
  const goToCart = useCallback(() => {
    Taro.switchTab({ url: '/pages/cart/index' });
  }, []);

  // 跳转到评价页面
  const goToEvaluations = useCallback(() => {
    Taro.navigateTo({ url: `/pages/home/evaluations/index?id=${product?.id}` });
  }, [product]);

  // 拨打电话
  const callStore = useCallback(() => {
    if (currentStore) {
      Taro.makePhoneCall({ phoneNumber: currentStore.phone });
    }
  }, [currentStore]);

  // 切换门店
  const handleSwitchStore = useCallback(() => {
    Taro.navigateTo({ url: '/pages/category/stores/index' });
  }, []);

  // 跳转到客服页面
  const goToCustomerService = useCallback(() => {
    Taro.switchTab({ url: '/pages/message/index' });
  }, []);

  // 分享商品
  const handleShare = useCallback(() => {
    try {
      const shareLink = `https://lexiangou.com/product/${product?.id}`;
      Taro.setClipboardData({
        data: shareLink,
        success: () => {
          Taro.showToast({
            title: '链接已复制',
            icon: 'success'
          });
        },
        fail: () => {
          Taro.showToast({
            title: '复制失败',
            icon: 'none'
          });
        }
      });
    } catch (error) {
      Taro.showToast({
        title: '复制失败',
        icon: 'none'
      });
    }
  }, [product]);

  // 评价点赞
  const handleEvaluationLike = useCallback((evalId: string) => {
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
  }, []);

  // 打开评论弹窗
  const openCommentModal = useCallback((evaluation: any) => {
    setCurrentEvaluation(evaluation);
    setShowCommentModal(true);
  }, []);

  // 关闭评论弹窗
  const closeCommentModal = useCallback(() => {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  }, []);

  // 发送评论
  const sendComment = useCallback(() => {
    if (!commentInput.trim()) {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      evaluationId: currentEvaluation.id,
      userId: 'user-current',
      userName: '我',
      userAvatar: 'https://picsum.photos/id/99/100/100',
      content: commentInput.trim(),
      createTime: new Date().toLocaleString(),
      likeCount: 0,
      isLike: false
    };

    setEvaluations(prev => {
      return prev.map(evalItem => {
        if (evalItem.id === currentEvaluation.id) {
          return {
            ...evalItem,
            comments: [...evalItem.comments, newComment]
          };
        }
        return evalItem;
      });
    });

    setCurrentEvaluation(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));

    setCommentInput('');
    Taro.showToast({ title: '评论成功', icon: 'success' });
  }, [commentInput, currentEvaluation]);

  // 评论点赞
  const handleCommentLike = useCallback((commentId: string) => {
    setEvaluations(prev => {
      return prev.map(evalItem => {
        if (evalItem.id === currentEvaluation.id) {
          return {
            ...evalItem,
            comments: evalItem.comments.map((comment: any) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  isLike: !comment.isLike,
                  likeCount: comment.isLike ? comment.likeCount - 1 : comment.likeCount + 1
                };
              }
              return comment;
            })
          };
        }
        return evalItem;
      });
    });

    setCurrentEvaluation(prev => ({
      ...prev,
      comments: prev.comments.map((comment: any) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLike: !comment.isLike,
            likeCount: comment.isLike ? comment.likeCount - 1 : comment.likeCount + 1
          };
        }
        return comment;
      })
    }));
  }, [currentEvaluation]);

  useEffect(() => {
    const { id, seckill } = Taro.getCurrentInstance().router?.params || {};
    setIsSeckill(seckill === '1');
    if (id) {
      const productData = getProductById(id);
      if (productData) {
        setProduct(productData as Product);
        setSelectedSku(productData.skus[0]);
        
        const initialSelections: { [key: string]: string } = {};
        Object.keys(productData.skus[0].specs).forEach(key => {
          initialSelections[key] = productData.skus[0].specs[key];
        });
        setSpecSelections(initialSelections);
        
        const evalList = getEvaluationsByProduct(id);
        setEvaluations(evalList.slice(0, 2));
        
        const stats = getEvaluationStats(id);
        setEvalStats(stats);
        
        const summary = getAiSummary(id);
        setAiSummary(summary);
        
        const categoryMap: { [key: string]: string } = {
          '1': 'digital',
          '2': 'digital',
          '3': 'clothing',
          '4': 'home',
          '5': 'food',
          '6': 'beauty',
          '7': 'baby',
          '8': 'home'
        };
        const coupons = availableCoupons.filter(c => {
          if (c.scope === 'product') return c.productId === id;
          if (c.scope === 'category') return c.categoryId === categoryMap[productData.categoryId];
          if (c.scope === 'all') return true;
          return false;
        });
        setProductCoupons(coupons.slice(0, 4));
      }
    }
  }, []);

  useEffect(() => {
    if (!isSeckill) return;
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const endTime = new Date('2026-07-31 23:59:59').getTime();
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
  }, [isSeckill]);

  if (!product) {
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
        {/* 商品轮播图 */}
        <View className={styles.productBanner}>
          <Swiper
            autoplay
            interval={3000}
            circular
            onChange={onBannerChange}
          >
            {product.images.map((image, index) => (
              <SwiperItem key={index}>
                <Image src={image} mode="aspectFill" lazyLoad />
              </SwiperItem>
            ))}
          </Swiper>
          <Text className={styles.bannerIndicator}>
            {currentImage + 1}/{product.images.length}
          </Text>
        </View>

        {/* 价格信息 */}
        <View className={styles.priceSection}>
          <View className={styles.priceRow}>
            <Text className={styles.currentPrice}>{selectedSku?.price || product.price}</Text>
            <Text className={styles.originalPrice}>{product.originalPrice}</Text>
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
          <View className={styles.activityTags}>
            {product.tags.map((tag) => (
              <Text key={tag} className={styles.tag}>{tag}</Text>
            ))}
          </View>
          {!isSeckill && productCoupons.length > 0 && (
            <View className={styles.couponTags}>
              {productCoupons.map((coupon) => (
                <View key={coupon.id} className={styles.couponTag}>
                  <Text className={styles.couponTagValue}>¥{coupon.value}</Text>
                  <Text className={styles.couponTagDesc}>
                    {coupon.minAmount > 0 ? `满${coupon.minAmount}减${coupon.value}` : `${coupon.scopeText}`}
                  </Text>
                  <Text className={styles.couponTagBtn}>领</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 商品名称和基础信息 */}
        <View className={styles.infoSection}>
          <Text className={styles.productName}>{product.name}</Text>
          <View className={styles.productTags}>
            <Text className={styles.tag}>{product.brandName}</Text>
            <Text className={styles.tag}>{product.categoryName}</Text>
          </View>
        </View>

        {/* 门店信息 */}
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
          <View 
            style={{ textAlign: 'center', marginTop: '20rpx' }}
            onClick={handleSwitchStore}
          >
            <Text style={{ color: '#e2231a', fontSize: '24rpx' }}>查看更多门店 &gt;</Text>
          </View>
        </View>

        {/* 商品评价 */}
        {evaluations.length > 0 && (
          <View className={styles.evaluateSection}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>商品评价</Text>
              <Text className={styles.viewAll} onClick={goToEvaluations}>查看全部</Text>
            </View>
            
            {aiSummary && (
              <View className={styles.aiSummarySection}>
                <View className={styles.aiSummaryHeader}>
                  <View className={styles.aiIcon}>🤖</View>
                  <Text className={styles.aiSummaryTitle}>AI评价总结</Text>
                  <View className={styles.aiScore}>
                    <Text className={styles.scoreValue}>{Math.round(aiSummary.averageRating * 20)}%</Text>
                    <Text className={styles.scoreLabel}>综合评分</Text>
                  </View>
                </View>
                <Text className={styles.aiOverall}>{aiSummary.overall}</Text>
                {aiSummary.strengths.length > 0 && (
                  <View className={styles.aiStrengths}>
                    <Text className={styles.aiLabel}>👍 好评亮点</Text>
                    <View className={styles.aiTags}>
                      {aiSummary.strengths.map((tag: string, idx: number) => (
                        <Text key={idx} className={styles.aiTag}>{tag}</Text>
                      ))}
                    </View>
                  </View>
                )}
                {aiSummary.weaknesses.length > 0 && (
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
          </View>
        )}

        {/* 商品详情 */}
        <View className={styles.detailSection}>
          <Text className={styles.sectionTitle}>商品详情</Text>
          <View className={styles.detailContent}>
            <Text>{product.description}</Text>
          </View>
        </View>

        <View style={{ height: '40rpx' }} />
      </ScrollView>

      {/* 底部操作栏 */}
      <View className={styles.bottomBar}>
        <View className={styles.actionIcons}>
          <View className={styles.actionItem} onClick={goHome}>
            <Text className={styles.icon}>🏠</Text>
            <Text>首页</Text>
          </View>
          <View className={styles.actionItem} onClick={handleShare}>
            <Text className={styles.icon}>📤</Text>
            <Text>分享</Text>
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
          <View className={styles.buyNowBtn} onClick={() => openSkuModal('buy')}>
            <Text className={styles.buyBtnText}>立即购买</Text>
            {isSeckill && seckillCountdown && (
              <Text className={styles.btnCountdown}>{seckillCountdown}</Text>
            )}
          </View>
        </View>
      </View>

      {/* SKU选择弹窗 */}
      {showSkuModal && (
        <View className={styles.skuModal}>
          <View className={styles.modalMask} onClick={() => setShowSkuModal(false)} />
          <View className={styles.modalContent}>
            <View className={styles.modalHeader}>
              <Image 
                src={selectedSku?.image || product.images[0]} 
                className={styles.selectedImage}
                mode="aspectFill"
                lazyLoad
              />
              <View className={styles.selectedInfo}>
                <Text className={styles.selectedPrice}>{selectedSku?.price || product.price}</Text>
                <Text className={styles.selectedStock}>库存: {selectedSku?.stock || 0} 件</Text>
                <Text className={styles.selectedName}>{selectedSku?.name || '请选择规格'}</Text>
              </View>
              <View className={styles.closeBtn} onClick={() => setShowSkuModal(false)}>×</View>
            </View>
            
            <View className={styles.modalBody}>
              {product.skus[0] && Object.keys(product.skus[0].specs).map((specName) => (
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
              {currentEvaluation.comments.length === 0 ? (
                <View className={styles.emptyComment}>
                  <Text>暂无评论，快来发表第一条评论吧~</Text>
                </View>
              ) : (
                <View className={styles.commentList}>
                  {currentEvaluation.comments.map((comment: any) => (
                    <View key={comment.id} className={styles.commentItem}>
                      <Image 
                        src={comment.userAvatar} 
                        className={styles.commentAvatar} 
                        mode="aspectFill" 
                      />
                      <View className={styles.commentContent}>
                        <View className={styles.commentHeader}>
                          <Text className={styles.commentUserName}>{comment.userName}</Text>
                          <Text className={styles.commentTime}>{comment.createTime}</Text>
                        </View>
                        <Text className={styles.commentText}>{comment.content}</Text>
                      </View>
                      <View 
                        className={`${styles.commentLike} ${comment.isLike ? styles.liked : ''}`}
                        onClick={() => handleCommentLike(comment.id)}
                      >
                        <Text>{comment.isLike ? '❤️' : '👍'}</Text>
                        <Text className={styles.commentLikeCount}>{comment.likeCount}</Text>
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