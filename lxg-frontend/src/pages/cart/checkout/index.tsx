import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiGet } from '@/api/common';
import { submitOrder, addToCartAPI, batchDeleteCartItem, fetchCartList } from '@/api/cart';
import { fetchMyCoupons } from '@/api/user';
import { getImageUrl, lazyImgProps } from '@/utils/image';
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

interface OrderItem {
  productId: string;
  productName: string;
  skuId: string;
  skuName: string;
  price: number;
  quantity: number;
  image: string;
}

interface Coupon {
  id: string;
  name: string;
  type: 'cash' | 'discount';
  value: number;
  minAmount: number;
  status: string;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, currentStore, setCartItems, userInfo } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [remark, setRemark] = useState('');
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);
  const [loadingData, setLoadingData] = useState(true);

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

    const loadInitialData = async () => {
      setLoadingData(true);
      try {
        const [couponRes, addressRes] = await Promise.all([
          fetchMyCoupons().catch(() => null),
          apiGet('/api/v1/address/default').catch(() => null),
        ]);

        if (couponRes?.data) {
          const couponList = Array.isArray(couponRes.data) ? couponRes.data : couponRes.data?.list || [];
          const availableCouponsList = couponList.filter((c: Coupon) => c.status === 'available');
          setCoupons(availableCouponsList);
          if (availableCouponsList.length > 0) {
            setSelectedCouponId(availableCouponsList[0].id);
          }
        }

        if (addressRes?.data) {
          setAddress(addressRes.data);
        }
      } catch (error) {
        console.error('Failed to load checkout data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    loadInitialData();
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

  const selectedCoupon = coupons.find(c => c.id === selectedCouponId) || null;

  const hasSpecialItem = selectedItems.some(item => item.isSeckill);

  const goodsAmount = Number((selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)).toFixed(2));
  const freightAmount = 0;
  const couponAmount = hasSpecialItem ? 0 : (selectedCoupon ? selectedCoupon.value : 0);
  const finalAmount = Number((goodsAmount + freightAmount - couponAmount).toFixed(2));

  const handleSubmitOrder = async () => {
    if (loadingData) {
      Taro.showToast({ title: '数据加载中，请稍候', icon: 'none' });
      return;
    }

    // 步骤1: 检查登录状态
    if (!userInfo.isLoggedIn) {
      Taro.showModal({
        title: '请先登录',
        content: '提交订单需要登录账号',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            Taro.navigateTo({ url: '/pages/user/login/index' });
          }
        }
      });
      return;
    }

    // 步骤2: 前端校验 - 空列表拦截
    const currentSelectedItems = getCheckoutItems();
    if (currentSelectedItems.length === 0) {
      Taro.showToast({ title: '请选择要结算的商品', icon: 'none' });
      return;
    }

    Taro.showLoading({ title: '提交中...' });

    try {
      // 步骤3: 区分购物车结算和立即购买场景
      const isBuyNow = currentSelectedItems.some(item => item.id?.toString().startsWith('buyNow-'));

      let realCartIds: number[] = [];

      if (isBuyNow) {
        // buyNow 场景：先添加到购物车，再获取真实后端ID
        for (const item of currentSelectedItems) {
          if (item.id?.toString().startsWith('buyNow-')) {
            const addRes = await addToCartAPI({
              productId: item.productId,
              skuId: item.skuId || item.productId,
              quantity: item.quantity,
            });
            if (addRes?.code === 200 || addRes?.message === 'created' || addRes?.message === 'success') {
              // 从后端获取最新购物车列表，匹配商品
              const listRes = await fetchCartList();
              if (listRes?.data && Array.isArray(listRes.data)) {
                const matchedItem = listRes.data.find(
                  (cartItem: any) =>
                    cartItem.productId?.toString() === item.productId?.toString() &&
                    cartItem.skuId?.toString() === (item.skuId || item.productId)?.toString() &&
                    cartItem.quantity === item.quantity
                );
                if (matchedItem) {
                  realCartIds.push(Number(matchedItem.id));
                }
              }
            }
          }
        }
      } else {
        // 步骤4: 购物车结算场景 - 同步刷新获取真实后端ID
        // 重新拉取最新购物车数据，防止本地缓存旧数据
        const latestCartRes = await fetchCartList();

        if (!latestCartRes?.data || !Array.isArray(latestCartRes.data) || latestCartRes.data.length === 0) {
          // 后端购物车为空，说明商品已被删除/失效
          Taro.hideLoading();
          Taro.showModal({
            title: '购物车已更新',
            content: '您的购物车可能已被其他设备修改，请刷新后重试',
            showCancel: false,
            success: () => {
              setCartItems([]);
              Taro.navigateBack();
            }
          });
          return;
        }

        // 用 productId + skuId + quantity 匹配真实后端购物车 ID
        const invalidItems: string[] = [];
        for (const item of currentSelectedItems) {
          const matchedBackendItem = latestCartRes.data.find(
            (cartItem: any) =>
              cartItem.productId?.toString() === item.productId?.toString() &&
              cartItem.skuId?.toString() === item.skuId?.toString() &&
              Number(cartItem.quantity) === Number(item.quantity)
          );
          if (matchedBackendItem && matchedBackendItem.id) {
            realCartIds.push(Number(matchedBackendItem.id));
          } else {
            // 本地购物车项在后端不存在，说明已失效
            invalidItems.push(`${item.productName || item.productId}`);
          }
        }
        // 汇总打印一次警告，避免批量失效时刷屏
        if (invalidItems.length > 0) {
          console.warn(`[checkout] 检测到 ${invalidItems.length} 个失效商品:`, invalidItems.join('、'));
        }

        // 如果有匹配不到的商品，提示用户
        if (realCartIds.length === 0) {
          Taro.hideLoading();
          Taro.showModal({
            title: '商品已失效',
            content: '部分商品可能已下架或库存不足，已为您刷新购物车',
            showCancel: false,
            success: () => {
              // 用最新的后端数据更新本地购物车
              setCartItems(latestCartRes.data.map((item: any) => ({
                id: item.id,
                productId: item.productId,
                productName: item.productName,
                skuId: item.skuId,
                skuName: item.skuName,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                selected: true,
                stock: item.stock,
              })));
              Taro.navigateBack();
            }
          });
          return;
        } else if (invalidItems.length > 0) {
          // 部分商品失效，提示用户后继续提交有效商品
          Taro.showToast({
            title: `${invalidItems.length} 件商品已失效，已自动移出`,
            icon: 'none',
            duration: 2000,
          });
        }
      }

      if (realCartIds.length === 0) {
        throw new Error('购物车项不能为空');
      }

      // 步骤5: 提交订单
      const storeId = currentStore?.id || 0;
      const userCouponId = selectedCouponId || null;

      const submitData = {
        cartIds: realCartIds,
        storeId: Number(storeId),
        userCouponId: userCouponId ? Number(userCouponId) : null,
        remark
      };

      console.log('[SubmitOrder] Payload:', JSON.stringify(submitData));

      const res = await submitOrder(submitData);

      Taro.hideLoading();

      if (res?.data) {
        // 清理已结算的购物车项
        if (!isBuyNow) {
          const remainingItems = cartItems.filter(item => !realCartIds.includes(Number(item.id)));
          setCartItems(remainingItems);
          batchDeleteCartItem(realCartIds).catch(() => null);
        }

        // 步骤6: 提交成功跳转
        Taro.showModal({
          title: '订单提交成功',
          content: `订单号：${res.data.orderNo || res.data.orderId || ''}\n请前往订单页面支付`,
          showCancel: false,
          success: () => {
            Taro.navigateTo({ url: '/pages/cart/order/list/index?status=pending_payment' });
          }
        });
      }
    } catch (error: any) {
      Taro.hideLoading();
      console.error('Submit order failed:', error);

      // 步骤7: 异常兜底 - 检测购物车项失效错误
      const errorMsg = error?.message || '';
      if (errorMsg.includes('未找到匹配的购物车项') || errorMsg.includes('购物车项不能为空')) {
        Taro.showModal({
          title: '商品已失效',
          content: '部分商品可能已下架或库存不足，购物车已为您刷新',
          showCancel: false,
          success: async () => {
            // 刷新购物车列表
            try {
              const refreshed = await fetchCartList();
              if (refreshed?.data && Array.isArray(refreshed.data)) {
                setCartItems(refreshed.data.map((item: any) => ({
                  id: item.id,
                  productId: item.productId,
                  productName: item.productName,
                  skuId: item.skuId,
                  skuName: item.skuName,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                  selected: true,
                  stock: item.stock,
                })));
              } else {
                setCartItems([]);
              }
            } catch {
              setCartItems([]);
            }
            Taro.navigateBack();
          }
        });
      } else {
        Taro.showToast({
          title: errorMsg || '提交失败，请重试',
          icon: 'none'
        });
      }
    }
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
              <Image src={getImageUrl(item.image)} className={styles.goodsImage} mode="aspectFill" {...lazyImgProps()} />
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
          <Text className={styles.amountValue}>¥{goodsAmount.toFixed(2)}</Text>
        </View>
        {couponAmount > 0 && (
          <View className={styles.amountRow}>
            <Text className={styles.amountLabel}>优惠券</Text>
            <Text className={styles.amountValue}>-¥{couponAmount.toFixed(2)}</Text>
          </View>
        )}
        <View className={`${styles.amountRow} ${styles.highlight}`}>
          <Text className={styles.amountLabel}>应付总额</Text>
          <Text className={styles.amountValue}>¥{finalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* 底部提交栏 */}
      <View className={styles.bottomBar}>
        <View className={styles.totalAmount}>
          <Text className={styles.amountLabel}>合计:</Text>
          <Text className={styles.amountValue}>¥{finalAmount.toFixed(2)}</Text>
        </View>
        <View className={styles.submitBtn} onClick={handleSubmitOrder}>
          提交订单
        </View>
      </View>
    </View>
  );
};

export default CheckoutPage;
