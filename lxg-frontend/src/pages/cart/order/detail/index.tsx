import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { fetchOrderDetail, cancelOrder, confirmOrder, payOrder } from '@/api/cart';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import { formatDateTime } from '@/utils/time';
import { executeWechatPayment } from '@/utils/wechatPay';
import styles from '@/styles/cart/order-detail.module.scss';

const OrderDetailPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.id) {
      loadOrderDetail(params.id as string);
    } else {
      setLoading(false);
      Taro.showToast({ title: '订单ID不存在', icon: 'none' });
    }
  }, []);

  const loadOrderDetail = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await fetchOrderDetail(orderId);
      if (res?.data) {
        setOrder(res.data);
      } else {
        Taro.showToast({ title: '订单不存在', icon: 'none' });
      }
    } catch (error: any) {
      console.error('加载订单详情失败:', error);
      Taro.showToast({ title: error?.message || '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  const goToProductDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  };

  const callStore = () => {
    if (order?.store?.phone) {
      Taro.makePhoneCall({ phoneNumber: order.store.phone });
    }
  };

  const handlePay = async () => {
    if (!order?.id) return;
    Taro.showLoading({ title: '发起支付...', mask: true });
    try {
      // 1. 调用后端支付接口，获取微信支付参数
      const payRes = await payOrder(order.id, { paymentMethod: 'wechat' });

      // 2. 拉起微信支付（小程序 requestPayment / H5 JSAPI 或 H5 支付）
      //    支付成功后内部会轮询确认支付状态
      Taro.showLoading({ title: '请确认支付...', mask: true });
      const payStatus = await executeWechatPayment(payRes, order.id);

      Taro.hideLoading();
      if (payStatus?.isPaid) {
        Taro.showToast({ title: '支付成功', icon: 'success' });
        loadOrderDetail(order.id);
      } else {
        // 用户已完成支付但回调延迟，提示用户稍后查看
        Taro.showToast({ title: payStatus?.message || '支付状态确认中，请稍后查看', icon: 'none' });
        loadOrderDetail(order.id);
      }
    } catch (error: any) {
      Taro.hideLoading();
      const errMsg = error?.message || '';
      if (errMsg.includes('取消支付')) {
        Taro.showToast({ title: '已取消支付', icon: 'none' });
      } else {
        Taro.showToast({ title: errMsg || '支付失败', icon: 'none' });
      }
    }
  };

  const handleConfirmPickup = () => {
    if (order?.id) {
      Taro.showModal({
        title: '确认自提',
        content: '确定已收到商品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              await confirmOrder(order.id);
              Taro.showToast({ title: '已确认收货', icon: 'success' });
              loadOrderDetail(order.id);
            } catch (error: any) {
              Taro.showToast({ title: error?.message || '操作失败', icon: 'none' });
            }
          }
        }
      });
    }
  };

  const handleCancel = () => {
    if (order?.id) {
      Taro.showModal({
        title: '确认取消',
        content: '确定要取消该订单吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              await cancelOrder(order.id);
              Taro.showToast({ title: '订单已取消', icon: 'success' });
              loadOrderDetail(order.id);
            } catch (error: any) {
              Taro.showToast({ title: error?.message || '取消失败', icon: 'none' });
            }
          }
        }
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
      <View className={styles.orderDetailPage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  if (!order) {
    return (
      <View className={styles.orderDetailPage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text style={{ fontSize: '32rpx', color: '#999' }}>订单不存在</Text>
        </View>
      </View>
    );
  }

  const isPendingPayment = order.status === 'pending_payment';
  const isPendingDelivery = order.status === 'pending_delivery';
  const isPendingPickup = order.status === 'pending_pickup';
  const isCompleted = order.status === 'completed';
  const isCancelled = order.status === 'cancelled';
  const isRefunding = order.status === 'refunding';
  const isRefundRejected = order.status === 'refund_rejected';
  const isRefunded = order.status === 'refunded';

  const getStatusIcon = () => {
    if (isPendingPayment) return '⏳';
    if (isPendingDelivery) return '🚚';
    if (isPendingPickup) return '📦';
    if (isCompleted) return '✅';
    if (isCancelled) return '❌';
    if (isRefunding) return '🔄';
    if (isRefundRejected) return '❌';
    if (isRefunded) return '💰';
    return '📄';
  };

  const getStatusBgColor = () => {
    if (isPendingPayment) return '#e2231a';
    if (isPendingDelivery) return '#1890ff';
    if (isPendingPickup) return '#ff6600';
    if (isCompleted) return '#52c41a';
    if (isCancelled) return '#999';
    if (isRefunding) return '#faad14';
    if (isRefundRejected) return '#ff4d4f';
    if (isRefunded) return '#52c41a';
    return '#1890ff';
  };

  return (
    <View className={styles.orderDetailPage}>
      <ScrollView scrollY style={{ height: 'calc(100vh - 120rpx)', paddingBottom: '260rpx', boxSizing: 'border-box' }}>
        <View className={styles.statusSection} style={{ backgroundColor: getStatusBgColor() }}>
          <Text className={styles.statusIcon}>{getStatusIcon()}</Text>
          <Text className={styles.statusText}>{order.statusText}</Text>
        </View>

        {order.store && (
          <View className={styles.storeSection}>
            <View className={styles.storeInfo}>
              <Text className={styles.storeName}>🏪 {order.store.name}</Text>
              <Text className={styles.storeAddress}>{order.store.address}</Text>
              <Text className={styles.storeHours}>营业时间: {order.store.businessHours || order.store.hours}</Text>
            </View>
            <View className={styles.storeAction} onClick={callStore}>📞</View>
          </View>
        )}

        <View className={styles.goodsSection}>
          {(order.items || []).map((item: any) => (
            <View key={item.id} className={styles.goodsItem} onClick={() => goToProductDetail(item.productId)}>
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

        <View className={styles.orderInfo}>
          <Text className={styles.infoTitle}>订单信息</Text>
          <View className={styles.infoRow}><Text className={styles.infoLabel}>订单编号</Text><Text className={styles.infoValue}>{order.orderNo}</Text></View>
          <View className={styles.infoRow}><Text className={styles.infoLabel}>下单时间</Text><Text className={styles.infoValue}>{formatDateTime(order.createTime)}</Text></View>
          {!isPendingPayment && order.payTime && (
            <View className={styles.infoRow}><Text className={styles.infoLabel}>支付时间</Text><Text className={styles.infoValue}>{formatDateTime(order.payTime)}</Text></View>
          )}
          {isCancelled && order.cancelTime && (
            <View className={styles.infoRow}><Text className={styles.infoLabel}>取消时间</Text><Text className={styles.infoValue}>{formatDateTime(order.cancelTime)}</Text></View>
          )}
        </View>

        <View className={styles.amountSection}>
          <View className={styles.amountRow}><Text className={styles.amountLabel}>商品金额</Text><Text className={styles.amountValue}>¥{order.totalAmount}</Text></View>
          {order.couponAmount > 0 && (
            <View className={styles.amountRow}><Text className={styles.amountLabel}>优惠券</Text><Text className={styles.amountValue}>-¥{order.couponAmount}</Text></View>
          )}
          <View className={`${styles.amountRow} ${styles.highlight}`}><Text className={styles.amountLabel}>应付总额</Text><Text className={styles.amountValue}>¥{order.payAmount}</Text></View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.actionBtn} onClick={() => Taro.switchTab({ url: '/pages/message/index' })}>联系客服</View>
        {isPendingPayment && (
          <>
            <View className={styles.actionBtn} onClick={handleCancel}>取消订单</View>
            <View className={`${styles.actionBtn} ${styles.primary}`} onClick={handlePay}>立即支付</View>
          </>
        )}
        {isPendingDelivery && (
          <View className={styles.actionBtn} onClick={handleCancel}>取消订单</View>
        )}
        {isPendingPickup && (
          <>
            <View className={styles.actionBtn} onClick={handleRefund}>申请退款</View>
            <View className={`${styles.actionBtn} ${styles.primary}`} onClick={handleConfirmPickup}>确认取货</View>
          </>
        )}
        {isCompleted && (
          <View className={`${styles.actionBtn} ${styles.primary}`} onClick={handleRefund}>申请退款</View>
        )}
      </View>
    </View>
  );
};

export default OrderDetailPage;
