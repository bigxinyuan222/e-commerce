import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { getStoreById } from '@/data/common/stores';
import { myCoupons } from '@/data/common/coupons';
import { createOrder, OrderItem } from '@/data/order/orders';
import styles from '@/styles/cart/checkout.module.scss';

interface BuyNowItem {
  productId: string;
  productName: string;
  skuName: string;
  price: number;
  quantity: number;
  image: string;
  isSeckill?: boolean;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, currentStore, setCurrentStore, setCartItems } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [selectedCoupon] = useState(myCoupons[0]);
  const [remark, setRemark] = useState('');
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);

  const handleSwitchStore = useCallback(() => {
    Taro.navigateTo({ url: '/pages/category/stores/index' });
  }, []);

  useEffect(() => {
    const { buyNow } = Taro.getCurrentInstance().router?.params || {};
    if (buyNow) {
      try {
        const item = JSON.parse(decodeURIComponent(buyNow as string));
        setBuyNowItem(item);
      } catch (e) {
        console.error('Failed to parse buyNow data:', e);
      }
    }
  }, []);

  // 获取结算商品列表
  const getCheckoutItems = () => {
    if (buyNowItem) {
      return [{ ...buyNowItem, id: `buyNow-${buyNowItem.productId}`, isSeckill: buyNowItem.isSeckill }];
    }
    return cartItems.filter(item => item.selected);
  };

  const selectedItems = getCheckoutItems();
  getCartTotal();

  // 检测是否包含秒杀商品（不支持优惠券）
  const hasSpecialItem = selectedItems.some(item => item.isSeckill);

  // 计算订单金额（秒杀商品不支持优惠券）
  const goodsAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freightAmount = 0;
  const couponAmount = hasSpecialItem ? 0 : (selectedCoupon ? selectedCoupon.value : 0);
  const finalAmount = goodsAmount + freightAmount - couponAmount;

  // 提交订单
  const handleSubmitOrder = () => {
    Taro.showLoading({ title: '提交中...' });

    setTimeout(() => {
      Taro.hideLoading();
      
      // 构建订单商品项
      const orderItems: OrderItem[] = selectedItems.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        productId: item.productId,
        productName: item.productName,
        skuId: `sku-${item.productId}-${index}`,
        skuName: item.skuName,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      // 构建门店信息
      const storeInfo = currentStore ? {
        name: currentStore.name,
        phone: currentStore.phone,
        address: currentStore.address,
        businessHours: currentStore.hours
      } : undefined;

      // 创建待支付订单
      createOrder({
        items: orderItems,
        totalAmount: goodsAmount,
        freightAmount: 0,
        couponAmount: couponAmount,
        payAmount: finalAmount,
        store: storeInfo,
        paymentMethod: paymentMethod === 'wechat' ? 'wechat' : 'alipay'
      });
      
      // 如果是购物车模式，删除已购买的商品
      if (!buyNowItem) {
        const selectedIds = selectedItems.map(item => item.id);
        const remainingItems = cartItems.filter(item => !selectedIds.includes(item.id));
        setCartItems(remainingItems);
      }
      
      Taro.showModal({
        title: '订单提交成功',
        content: '订单已提交，请前往订单页面支付',
        showCancel: false,
        success: () => {
          Taro.navigateTo({ url: '/pages/order/list/index?status=pending_payment' });
        }
      });
    }, 1500);
  };

  // 选择优惠券
  const selectCoupon = () => {
    Taro.navigateTo({ url: '/pages/user/coupons/index?selectable=true' });
  };

  if (selectedItems.length === 0) {
    return (
      <View className={styles.checkoutPage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text style={{ fontSize: '32rpx', color: '#999' }}>购物车为空</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.checkoutPage}>
      {/* 自提门店 */}
      <View className={styles.storeSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>🏪</Text>
            自提门店
          </Text>
          <Text className={styles.changeBtn} onClick={handleSwitchStore}>切换门店</Text>
        </View>
        <View className={styles.storeInfo}>
          <View className={styles.storeAvatar}>🏪</View>
          <View className={styles.storeDetails}>
            <Text className={styles.storeName}>{currentStore?.name || '深圳南山科技园店'}</Text>
            <Text className={styles.storeAddress}>{currentStore?.address || '广东省深圳市南山区科技园南区A2栋1楼'}</Text>
            <Text className={styles.storeHours}>营业时间: {currentStore?.hours || '09:00-22:00'}</Text>
          </View>
          <Text className={styles.storeArrow}>›</Text>
        </View>
      </View>

      {/* 商品列表 */}
      <View className={styles.goodsSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>商品清单</Text>
        </View>
        <View className={styles.goodsList}>
          {selectedItems.map((item) => (
            <View key={item.id} className={styles.goodsItem}>
              <Image src={item.image} className={styles.goodsImage} mode="aspectFill" />
              <View className={styles.goodsInfo}>
                <Text className={styles.goodsName}>{item.productName}</Text>
                <Text className={styles.goodsSpecs}>{item.skuName}</Text>
                <View className={styles.goodsBottom}>
                  <Text className={styles.goodsPrice}>¥{item.price}</Text>
                  <Text className={styles.goodsQuantity}>×{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 优惠券 */}
      <View className={styles.couponSection} onClick={!hasSpecialItem ? selectCoupon : undefined}>
        <View className={styles.couponRow}>
          <Text className={styles.couponLabel}>
            <Text className={styles.icon}>🎫</Text>
            优惠券
          </Text>
          <View className={styles.couponInfo}>
            {hasSpecialItem ? (
              <>
                <Text className={styles.couponValue} style={{ color: '#ff6b6b' }}>秒杀商品不支持</Text>
              </>
            ) : selectedCoupon ? (
              <>
                <Text className={styles.couponValue}>-¥{selectedCoupon.value}</Text>
                <Text className={styles.arrow}>›</Text>
              </>
            ) : (
              <>
                <Text className={styles.couponValue} style={{ color: '#999' }}>暂无可用</Text>
                <Text className={styles.arrow}>›</Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* 支付方式 */}
      <View className={styles.paymentSection}>
        <Text className={styles.sectionTitle}>支付方式</Text>
        <View className={styles.paymentList}>
          <View 
            className={styles.paymentItem}
            onClick={() => setPaymentMethod('wechat')}
          >
            <Text className={styles.paymentIcon}>💳</Text>
            <View className={styles.paymentInfo}>
              <Text className={styles.paymentName}>微信支付</Text>
              <Text className={styles.paymentDesc}>推荐</Text>
            </View>
            <View className={`${styles.paymentRadio} ${paymentMethod === 'wechat' ? styles.selected : ''}`} />
          </View>
          <View 
            className={styles.paymentItem}
            onClick={() => setPaymentMethod('alipay')}
          >
            <Text className={styles.paymentIcon}>💰</Text>
            <View className={styles.paymentInfo}>
              <Text className={styles.paymentName}>支付宝</Text>
              <Text className={styles.paymentDesc}>支付优惠</Text>
            </View>
            <View className={`${styles.paymentRadio} ${paymentMethod === 'alipay' ? styles.selected : ''}`} />
          </View>
        </View>
      </View>

      {/* 订单备注 */}
      <View className={styles.remarkSection}>
        <Text className={styles.remarkHeader}>订单备注</Text>
        <Input
          className={styles.remarkInput}
          type="text"
          placeholder="选填，可备注您的特殊需求"
          value={remark}
          onInput={(e) => setRemark(e.detail.value)}
        />
      </View>

      {/* 订单金额明细 */}
      <View className={styles.amountSection}>
        <View className={styles.amountRow}>
          <Text className={styles.amountLabel}>商品金额</Text>
          <Text className={styles.amountValue}>¥{goodsAmount}</Text>
        </View>
        {couponAmount > 0 && (
          <View className={styles.amountRow}>
            <Text className={styles.amountLabel}>优惠券</Text>
            <Text className={styles.amountValue}>-¥{couponAmount}</Text>
          </View>
        )}
        <View className={`${styles.amountRow} ${styles.highlight}`}>
          <Text className={styles.amountLabel}>应付总额</Text>
          <Text className={styles.amountValue}>¥{finalAmount}</Text>
        </View>
      </View>

      {/* 底部提交栏 */}
      <View className={styles.bottomBar}>
        <View className={styles.totalAmount}>
          <Text className={styles.amountLabel}>合计:</Text>
          <Text className={styles.amountValue}>¥{finalAmount}</Text>
        </View>
        <View className={styles.submitBtn} onClick={handleSubmitOrder}>
          提交订单
        </View>
      </View>
    </View>
  );
};

export default CheckoutPage;
