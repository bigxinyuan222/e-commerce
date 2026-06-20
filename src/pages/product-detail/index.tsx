import React, { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { getProductById } from '@/data/products';
import { getEvaluationsByProduct, getEvaluationStats } from '@/data/evaluations';
import styles from './index.module.scss';

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

const ProductDetailPage: React.FC = () => {
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSku, setSelectedSku] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSkuModal, setShowSkuModal] = useState(false);
  const [skuModalType, setSkuModalType] = useState<'cart' | 'buy'>('cart');
  const [specSelections, setSpecSelections] = useState<{ [key: string]: string }>({});
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [evalStats, setEvalStats] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const { id } = Taro.getCurrentInstance().router?.params || {};
    if (id) {
      const productData = getProductById(id);
      if (productData) {
        setProduct(productData as Product);
        setSelectedSku(productData.skus[0]);
        
        // 初始化规格选择
        const initialSelections: { [key: string]: string } = {};
        Object.keys(productData.skus[0].specs).forEach(key => {
          initialSelections[key] = productData.skus[0].specs[key];
        });
        setSpecSelections(initialSelections);
        
        // 获取评价
        const evalList = getEvaluationsByProduct(id);
        setEvaluations(evalList.slice(0, 2));
        
        const stats = getEvaluationStats(id);
        setEvalStats(stats);
      }
    }
  }, []);

  // 轮播图切换
  const onBannerChange = (e: any) => {
    setCurrentImage(e.detail.current);
  };

  // 添加到购物车
  const handleAddToCart = () => {
    if (!product || !selectedSku) return;
    addToCart({
      productId: product.id,
      productName: product.name,
      skuId: selectedSku.id,
      skuName: selectedSku.name,
      price: selectedSku.price,
      quantity: quantity,
      image: selectedSku.image || product.images[0],
      stock: selectedSku.stock
    });
    setShowSkuModal(false);
  };

  // 立即购买
  const handleBuyNow = () => {
    if (!product || !selectedSku) return;
    // 直接跳转到结算页，携带商品信息
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
        stock: selectedSku.stock
      });
      Taro.navigateTo({ 
        url: `/pages/checkout/index?buyNow=${encodeURIComponent(buyNowData)}` 
      });
    }, 300);
  };

  // 选择规格
  const selectSpec = (specName: string, specValue: string) => {
    const newSelections = { ...specSelections, [specName]: specValue };
    setSpecSelections(newSelections);
    
    // 查找匹配的SKU
    const matchedSku = product?.skus.find(sku => {
      return Object.entries(newSelections).every(([key, value]) => sku.specs[key] === value);
    });
    
    if (matchedSku) {
      setSelectedSku(matchedSku);
    }
  };

  // 获取可选的规格值
  const getAvailableSpecValues = (specName: string) => {
    if (!product) return [];
    const availableValues: string[] = [];
    
    product.skus.forEach(sku => {
      // 检查其他规格是否已选择
      const otherSpecsMatch = Object.entries(specSelections).every(([key, value]) => {
        if (key === specName) return true;
        return sku.specs[key] === value;
      });
      
      if (otherSpecsMatch) {
        availableValues.push(sku.specs[specName]);
      }
    });
    
    return [...new Set(availableValues)];
  };

  // 减少数量
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 增加数量
  const increaseQuantity = () => {
    if (selectedSku && quantity < selectedSku.stock) {
      setQuantity(quantity + 1);
    } else {
      Taro.showToast({ title: '库存不足', icon: 'none' });
    }
  };

  // 打开SKU弹窗
  const openSkuModal = (type: 'cart' | 'buy') => {
    setSkuModalType(type);
    setShowSkuModal(true);
  };

  // 返回首页
  const goHome = () => {
    Taro.switchTab({ url: '/pages/home/index' });
  };

  // 跳转到购物车
  const goToCart = () => {
    Taro.switchTab({ url: '/pages/cart/index' });
  };

  // 收藏/取消收藏
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Taro.showToast({ 
      title: isFavorite ? '已取消收藏' : '收藏成功', 
      icon: 'none' 
    });
  };

  // 跳转到评价页面
  const goToEvaluations = () => {
    Taro.navigateTo({ url: `/pages/product-evaluations/index?id=${product?.id}` });
  };

  // 拨打电话
  const callStore = () => {
    Taro.makePhoneCall({
      phoneNumber: '0755-12345678'
    });
  };

  // 查看门店
  const viewStores = () => {
    Taro.navigateTo({ url: '/pages/stores/index' });
  };

  // 分享商品
  const handleShare = () => {
    Taro.showActionSheet({
      itemList: ['复制链接', '生成海报', '分享给好友'],
      success: (res) => {
        const tapIndex = res.tapIndex;
        if (tapIndex === 0) {
          // 复制链接
          const shareLink = `https://mall.com/product/${product?.id}`;
          Taro.setClipboardData({
            data: shareLink,
            success: () => {
              Taro.showToast({
                title: '链接已复制',
                icon: 'success'
              });
            }
          });
        } else if (tapIndex === 1) {
          // 生成海报
          Taro.showToast({
            title: '海报生成功能开发中',
            icon: 'none'
          });
        } else if (tapIndex === 2) {
          // 分享给好友（小程序环境）
          if (process.env.TARO_ENV === 'weapp') {
            Taro.showShareMenu({
              withShareTicket: true,
              menus: ['shareAppMessage', 'shareTimeline']
            });
          } else {
            Taro.showToast({
              title: '请在微信小程序中使用此功能',
              icon: 'none'
            });
          }
        }
      }
    });
  };

  if (!product) {
    return (
      <View className={styles.productDetailPage}>
        <View style={{ padding: '100rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  const discount = Math.round((product.price / product.originalPrice) * 100) / 10;

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
                <Image src={image} mode="aspectFill" />
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
            <Text className={styles.discount}>{discount}折</Text>
          </View>
          <View className={styles.activityTags}>
            {product.tags.map((tag) => (
              <Text key={tag} className={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>

        {/* 商品名称和基础信息 */}
        <View className={styles.infoSection}>
          <Text className={styles.productName}>{product.name}</Text>
          <View className={styles.productTags}>
            <Text className={styles.tag}>{product.brandName}</Text>
            <Text className={styles.tag}>{product.categoryName}</Text>
          </View>
          <View className={styles.baseInfo}>
            <View className={styles.infoItem}>
              <Text className={styles.infoValue}>{product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万` : product.sales}</Text>
              <Text className={styles.infoLabel}>已售</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoValue}>{product.stock}</Text>
              <Text className={styles.infoLabel}>剩余库存</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoValue}>{evalStats?.total || 0}</Text>
              <Text className={styles.infoLabel}>累计评价</Text>
            </View>
          </View>
        </View>

        {/* SKU选择 */}
        <View className={styles.skuSection} onClick={() => openSkuModal('cart')}>
          <Text className={styles.sectionTitle}>选择</Text>
          <View className={styles.selectedSku}>
            <Image 
              src={selectedSku?.image || product.images[0]} 
              className={styles.skuImage}
              mode="aspectFill"
            />
            <View className={styles.skuInfo}>
              <Text className={styles.skuPrice}>{selectedSku?.price || product.price}</Text>
              <Text className={styles.skuStock}>库存: {selectedSku?.stock || 0} 件</Text>
              <Text className={styles.skuName}>{selectedSku?.name || '默认规格'}</Text>
            </View>
            <Text className={styles.selectBtn}>请选择</Text>
          </View>
        </View>

        {/* 门店信息 */}
        <View className={styles.storeSection}>
          <Text className={styles.sectionTitle}>门店自提</Text>
          <View className={styles.storeInfo}>
            <View className={styles.storeAvatar}>🏪</View>
            <View className={styles.storeDetails}>
              <Text className={styles.storeName}>深圳南山科技园店</Text>
              <Text className={styles.storeAddress}>广东省深圳市南山区科技园南区A2栋1楼</Text>
              <Text className={styles.storeHours}>营业时间: 09:00-22:00</Text>
            </View>
            <View className={styles.storeAction} onClick={callStore}>
              <Text className={styles.phoneIcon}>📞</Text>
              拨打电话
            </View>
          </View>
          <View 
            style={{ textAlign: 'center', marginTop: '20rpx' }}
            onClick={viewStores}
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
            <View className={styles.evaluateStats}>
              <Text className={styles.score}>{evalStats?.averageRating || 0}</Text>
              <Text className={styles.scoreLabel}>分</Text>
            </View>
            <View className={styles.evaluateList}>
              {evaluations.map((evaluation) => (
                <View key={evaluation.id} className={styles.evaluateItem}>
                  <View className={styles.evaluateHeader}>
                    <Image src={evaluation.userAvatar} className={styles.userAvatar} mode="aspectFill" />
                    <View className={styles.userInfo}>
                      <Text className={styles.userName}>{evaluation.userName}</Text>
                      <Text className={styles.evaluateTime}>{evaluation.createTime}</Text>
                    </View>
                    <Text className={styles.rating}>{'★'.repeat(evaluation.rating)}</Text>
                  </View>
                  <Text className={styles.evaluateContent}>{evaluation.content}</Text>
                  {evaluation.images.length > 0 && (
                    <View className={styles.evaluateImages}>
                      {evaluation.images.map((img: string, idx: number) => (
                        <Image key={idx} src={img} mode="aspectFill" />
                      ))}
                    </View>
                  )}
                </View>
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
          <View className={styles.actionItem} onClick={handleFavorite}>
            <Text className={styles.icon}>{isFavorite ? '❤️' : '⭐'}</Text>
            <Text>收藏</Text>
          </View>
          <View className={styles.actionItem} onClick={handleShare}>
            <Text className={styles.icon}>📤</Text>
            <Text>分享</Text>
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
            立即购买
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
              />
              <View className={styles.selectedInfo}>
                <Text className={styles.selectedPrice}>{selectedSku?.price || product.price}</Text>
                <Text className={styles.selectedStock}>库存: {selectedSku?.stock || 0} 件</Text>
                <Text className={styles.selectedName}>{selectedSku?.name || '请选择规格'}</Text>
              </View>
              <View className={styles.closeBtn} onClick={() => setShowSkuModal(false)}>×</View>
            </View>
            
            <View className={styles.modalBody}>
              {/* 规格选择 */}
              {product.skus[0] && Object.keys(product.skus[0].specs).map((specName) => (
                <View key={specName} className={styles.optionGroup}>
                  <Text className={styles.optionLabel}>{specName}</Text>
                  <View className={styles.optionValues}>
                    {Array.from(new Set(product.skus.map(sku => sku.specs[specName]))).map((specValue) => {
                      const isAvailable = getAvailableSpecValues(specName).includes(specValue);
                      const isSelected = specSelections[specName] === specValue;
                      return (
                        <View
                          key={specValue}
                          className={`${styles.optionValue} ${isSelected ? styles.active : ''} ${!isAvailable ? styles.disabled : ''}`}
                          onClick={() => isAvailable && selectSpec(specName, specValue)}
                        >
                          {specValue}
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
              
              {/* 数量选择 */}
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
    </View>
  );
};

export default ProductDetailPage;
