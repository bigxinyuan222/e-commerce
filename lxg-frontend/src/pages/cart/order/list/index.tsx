import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { fetchOrderList, fetchRefundList, cancelOrder, payOrder, confirmOrder, paymentCallback, fetchOrderPaymentStatus } from '@/api/cart';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/cart/order-list.module.scss';

const statusCodeMap: { [key: number]: string } = {
  0: 'pending_payment',
  1: 'pending_delivery',
  2: 'pending_pickup',
  3: 'completed',
  4: 'cancelled',
  5: 'refunding',
  6: 'refund_rejected',
  7: 'refunded',
};

const statusCodeReverseMap: { [key: string]: number } = {
  'pending_payment': 0,
  'pending_delivery': 1,
  'pending_pickup': 2,
  'completed': 3,
  'cancelled': 4,
  'refunding': 5,
  'refund_rejected': 6,
  'refunded': 7,
};

const statusMap: { [key: string]: string } = {
  'pending_payment': '待支付',
  'pending_delivery': '待发货',
  'paid': '已支付',
  'pending_pickup': '待自提',
  'completed': '已完成',
  'pending_review': '待评价',
  'reviewed': '已评价',
  'cancelled': '已取消',
  'refunding': '退款中',
  'refund_rejected': '商家已拒绝',
  'refunded': '已退款',
};

const statusColorMap: { [key: string]: string } = {
  'pending_payment': '#e2231a',
  'pending_delivery': '#1890ff',
  'paid': '#1890ff',
  'pending_pickup': '#ff6600',
  'completed': '#52c41a',
  'pending_review': '#ff6b35',
  'reviewed': '#52c41a',
  'cancelled': '#999',
  'refunding': '#faad14',
  'refund_rejected': '#ff4d4f',
  'refunded': '#52c41a',
};



function transformOrderItem(item: any): any {
  return {
    id: item.id || item.ID || '',
    productId: item.productId || item.ProductID || '',
    productName: item.productName || item.ProductName || '',
    skuId: item.skuId || item.SkuID || '',
    skuName: item.skuName || item.SkuName || '',
    price: item.price != null ? item.price : (item.Price || 0),
    quantity: item.quantity != null ? item.quantity : (item.Quantity || 0),
    image: getImageUrl(item.image || item.Image || ''),
  };
}

function transformRefund(refund: any): any {
  const items = (refund.items || []).map((item: any) => ({
    ...transformOrderItem(item),
    image: getImageUrl(item.image || item.Image || ''),
  }));

  return {
    id: refund.id || '',
    orderId: refund.orderId || '',
    orderNo: refund.refundNo || refund.orderNo || '',
    status: refund.status || 'unknown',
    statusText: refund.statusText || '',
    createTime: refund.applyTime || '',
    payAmount: refund.amount || refund.payAmount || 0,
    totalAmount: refund.amount || 0,
    items,
    isRefundRecord: true,
  };
}

function transformOrder(order: any): any {
  const rawStatus = order.status ?? order.Status;
  const isNumericStatus = typeof rawStatus === 'number';
  const status = isNumericStatus ? (statusCodeMap[rawStatus as number] || 'unknown') : (rawStatus || 'unknown');

  const items = (order.items || order.Items || []).map(transformOrderItem);

  const store = order.store || order.Store
    ? {
        name: order.store?.name || order.Store?.Name || '',
        address: order.store?.address || order.Store?.Address || '',
      }
    : undefined;

  return {
    id: order.id || order.ID || order.orderNo || order.OrderNo || '',
    orderNo: order.orderNo || order.OrderNo || '',
    status,
    statusText: order.statusText || order.StatusText || statusMap[status] || '',
    createTime: order.createTime || order.CreateTime || '',
    totalAmount: order.totalAmount ?? order.TotalAmount ?? 0,
    freightAmount: order.freightAmount ?? order.FreightAmount ?? 0,
    couponAmount: order.couponAmount ?? order.CouponAmount ?? 0,
    payAmount: order.payAmount ?? order.PayAmount ?? 0,
    items,
    store,
    address: order.address || order.Address || {},
    paymentMethod: order.paymentMethod || order.PaymentMethod || '',
    payTime: order.payTime || order.PayTime || '',
    deliverTime: order.deliverTime || order.DeliverTime || '',
    completeTime: order.completeTime || order.CompleteTime || '',
    cancelTime: order.cancelTime || order.CancelTime || '',
    cancelReason: order.cancelReason || order.CancelReason || '',
  };
}

const OrderProductItem = React.memo(({ product, onClick }: { product: any; onClick: () => void }) => (
  <View className={styles.orderProduct} onClick={onClick}>
    <Image
      src={product.image}
      className={styles.productImage}
      mode="aspectFill"
      {...lazyImgProps()}
    />
    <View className={styles.productInfo}>
      <Text className={styles.productName}>{product.productName}</Text>
      <Text className={styles.productSpecs}>{product.skuName}</Text>
      <View className={styles.productBottom}>
        <Text className={styles.productPrice}>¥{product.price}</Text>
        <Text className={styles.productQuantity}>x{product.quantity}</Text>
      </View>
    </View>
  </View>
));

const OrderActionButton = React.memo(({
  text,
  type,
  onClick
}: {
  text: string;
  type: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}) => (
  <View className={`${styles.actionBtn} ${styles[type]}`} onClick={onClick}>
    {text}
  </View>
));

const OrderCard = React.memo(({
  order,
  onDetail,
  onCancel,
  onPay,
  onConfirmDelivery,
  onConfirmPickup,
  onRefund,
  onReview
}: {
  order: any;
  onDetail: (id: string) => void;
  onCancel: (id: string) => void;
  onPay: (id: string) => void;
  onConfirmDelivery: (id: string) => void;
  onConfirmPickup: (id: string) => void;
  onRefund: (id: string) => void;
  onReview: (id: string) => void;
}) => {
  const canCancel = order.status === 'pending_payment' || order.status === 'pending_delivery' || order.status === 'pending_pickup';
  const canPay = order.status === 'pending_payment';
  const canConfirmDelivery = order.status === 'pending_delivery';
  const canConfirmPickup = order.status === 'pending_pickup';
  const canRefund = order.status === 'completed' || order.status === 'pending_review';
  const canReview = order.status === 'completed' || order.status === 'pending_review';
  const isRefundOrder = order.status === 'refunding' || order.status === 'refund_rejected' || order.status === 'refunded';

  const refundStatusMap = {
    'refunding': '退款中',
    'refund_rejected': '商家已拒绝',
    'refunded': '已退款',
  };

  const refundStatusColorMap = {
    'refunding': '#faad14',
    'refund_rejected': '#ff4d4f',
    'refunded': '#52c41a',
  };

  return (
    <View className={styles.orderCard}>
      <View className={styles.orderHeader}>
        <Text className={styles.orderId}>{isRefundOrder ? '退货编号' : '订单编号'}: {order.orderNo}</Text>
        <Text className={styles.orderStatus} style={{ color: isRefundOrder ? refundStatusColorMap[order.status] : (statusColorMap[order.status] || '#999') }}>
          {isRefundOrder ? (refundStatusMap[order.status] || order.statusText) : (statusMap[order.status] || order.statusText)}
        </Text>
      </View>

      {order.store && (
        <View className={styles.storeInfo}>
          <Text className={styles.storeName}>{order.store.name || '无门店信息'}</Text>
          <Text className={styles.storeAddress}>{order.store.address || ''}</Text>
        </View>
      )}

      <View className={styles.orderProducts}>
        {(order.items || []).map((product: any, index: number) => (
          <OrderProductItem
            key={`${order.id}-${product.productId}-${index}`}
            product={product}
            onClick={() => order.isRefundRecord ? undefined : onDetail(order.id)}
          />
        ))}
      </View>

      <View className={styles.orderFooter}>
        <View className={styles.orderTotal}>
          <Text className={styles.totalLabel}>合计:</Text>
          <Text className={styles.totalValue}>¥{order.payAmount}</Text>
        </View>
        <View className={styles.orderActions}>
          {canCancel && (
            <OrderActionButton
              text="取消订单"
              type="danger"
              onClick={() => onCancel(order.id)}
            />
          )}
          {canPay && (
            <OrderActionButton
              text="立即支付"
              type="primary"
              onClick={() => onPay(order.id)}
            />
          )}
          {canConfirmDelivery && (
            <OrderActionButton
              text="确认发货"
              type="primary"
              onClick={() => onConfirmDelivery(order.id)}
            />
          )}
          {canConfirmPickup && (
            <OrderActionButton
              text="确认自提"
              type="primary"
              onClick={() => onConfirmPickup(order.id)}
            />
          )}
          {canRefund && (
            <OrderActionButton
              text="申请退款"
              type="secondary"
              onClick={() => onRefund(order.id)}
            />
          )}
          {canReview && (
            <OrderActionButton
              text="待评价"
              type="primary"
              onClick={() => onReview(order.id)}
            />
          )}
        </View>
      </View>
    </View>
  );
});

const EmptyOrder = React.memo(({ onGoShopping }: { onGoShopping: () => void }) => (
  <View className={styles.emptyOrder}>
    <View className={styles.emptyIcon}>
      <Text>📦</Text>
    </View>
    <Text className={styles.emptyText}>暂无订单</Text>
    <View className={styles.goShoppingBtn} onClick={onGoShopping}>
      去购物
    </View>
  </View>
));

const OrderListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'pending_payment', label: '待支付' },
    { key: 'pending_delivery', label: '待发货' },
    { key: 'pending_pickup', label: '待自提' },
    { key: 'completed', label: '已完成' },
    { key: 'pending_review', label: '评价' },
    { key: 'reviewed', label: '已取消' },
  ];

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.status) {
      setActiveTab(params.status);
    }
  }, []);

  const loadOrders = useCallback(async (status?: string) => {
    setLoading(true);
    try {
      if (status === 'refunding') {
        const res = await fetchRefundList({ page: 1, size: 50 });
        const list = Array.isArray(res?.data) ? res.data : [];
        setOrders(list.map(transformRefund));
        return;
      }

      const params: Record<string, any> = { page: 1, size: 50 };
      if (status && status !== 'all' && status !== 'pending_review' && status !== 'reviewed') {
        const statusCode = statusCodeReverseMap[status];
        if (statusCode !== undefined) {
          params.status = statusCode;
        }
      }
      const res = await fetchOrderList(params);
      const list = Array.isArray(res?.data) ? res.data : [];
      const transformed = list.map(transformOrder);

      if (status === 'pending_review') {
        setOrders(transformed.filter((o: any) => o.status === 'completed' || o.status === 'pending_review'));
      } else if (status === 'reviewed') {
        setOrders(transformed.filter((o: any) => o.status === 'reviewed' || o.status === 'cancelled'));
      } else {
        setOrders(transformed);
      }
    } catch (error) {
      console.error('加载订单列表失败:', error);
      setOrders([]);
      Taro.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders(activeTab);
  }, [activeTab, loadOrders]);

  // 监听评价成功事件，自动刷新订单列表
  useEffect(() => {
    const handler = () => {
      loadOrders(activeTab);
    };
    Taro.eventCenter.on('orderReviewSuccess', handler);
    return () => {
      Taro.eventCenter.off('orderReviewSuccess', handler);
    };
  }, [loadOrders, activeTab]);

  const handleTabChange = useCallback((status: string) => {
    setActiveTab(status);
  }, []);

  const goShopping = useCallback(() => {
    Taro.switchTab({ url: '/pages/home/index' });
  }, []);

  const goToOrderDetail = useCallback((orderId: string) => {
    Taro.navigateTo({ url: `/pages/cart/order/detail/index?id=${orderId}` });
  }, []);

  const handleCancelOrder = useCallback((orderId: string) => {
    Taro.showModal({
      title: '确认取消',
      content: '确定要取消该订单吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await cancelOrder(orderId);
            Taro.showToast({ title: '订单已取消', icon: 'success' });
            loadOrders(activeTab);
          } catch (error: any) {
            Taro.showToast({ title: error?.message || '取消失败', icon: 'none' });
          }
        }
      }
    });
  }, [loadOrders, activeTab]);

  const handlePayOrder = useCallback(async (orderId: string) => {
    const orderInfo = orders.find((o) => o.id === orderId);
    Taro.showLoading({ title: '支付处理中...', mask: true });
    try {
      // 1. 发起支付
      const payRes = await payOrder(orderId, { paymentMethod: 'wechat' });
      const payData = payRes?.data || payRes;
      const orderNo = payData?.orderNo ?? orderInfo?.orderNo ?? '';
      const transactionId = payData?.transactionId ?? payData?.prepayId ?? payData?.prepay_id ?? '';
      const amount = payData?.amount ?? orderInfo?.payAmount ?? 0;

      // 2. 支付回调（模拟微信异步通知）
      await paymentCallback({
        orderId,
        orderNo,
        transactionId,
        paymentMethod: 'wechat',
        amount,
      });

      // 3. 查询订单支付状态，确认是否支付成功
      const statusRes = await fetchOrderPaymentStatus(orderId);
      const payStatus = statusRes?.data;
      Taro.hideLoading();
      if (payStatus?.isPaid) {
        Taro.showToast({ title: '支付成功', icon: 'success' });
      } else {
        Taro.showToast({ title: payStatus?.message || '支付状态未确认，请稍后查看', icon: 'none' });
      }
      loadOrders(activeTab);
    } catch (error: any) {
      Taro.hideLoading();
      Taro.showToast({ title: error?.message || '支付失败', icon: 'none' });
    }
  }, [loadOrders, activeTab, orders]);

  const handleConfirmDelivery = useCallback((orderId: string) => {
    Taro.showModal({
      title: '确认发货',
      content: '确定已发货吗？发货后订单将变为待自提状态',
      success: async (res) => {
        if (res.confirm) {
          try {
            await confirmOrder(orderId);
            Taro.showToast({ title: '已确认发货', icon: 'success' });
            loadOrders(activeTab);
          } catch (error: any) {
            Taro.showToast({ title: error?.message || '操作失败', icon: 'none' });
          }
        }
      }
    });
  }, [loadOrders, activeTab]);

  const handleConfirmPickup = useCallback((orderId: string) => {
    Taro.showModal({
      title: '确认自提',
      content: '确定已收到商品吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await confirmOrder(orderId);
            Taro.showToast({ title: '已确认收货', icon: 'success' });
            loadOrders(activeTab);
          } catch (error: any) {
            Taro.showToast({ title: error?.message || '操作失败', icon: 'none' });
          }
        }
      }
    });
  }, [loadOrders, activeTab]);

  const handleApplyRefund = useCallback((orderId: string) => {
    Taro.navigateTo({ url: `/pages/cart/order/refund/index?id=${orderId}` });
  }, []);

  const handleReviewOrder = useCallback((orderId: string) => {
    Taro.navigateTo({ url: `/pages/cart/order/review/index?id=${orderId}` });
  }, []);

  const activeTabIndex = useMemo(() => {
    return tabs.findIndex(tab => tab.key === activeTab);
  }, [activeTab, tabs]);

  return (
    <View className={styles.orderListPage}>
      {activeTab !== 'refunding' && (
        <ScrollView
          scrollX
          className={styles.tabBar}
          showScrollbar={false}
        >
          <View className={styles.tabList}>
            {tabs.map((tab, index) => (
              <View
                key={tab.key}
                className={`${styles.tabItem} ${activeTabIndex === index ? styles.active : ''}`}
                onClick={() => handleTabChange(tab.key)}
              >
                <Text className={styles.tabText}>{tab.label}</Text>
                {activeTabIndex === index && (
                  <View className={styles.tabIndicator} />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      {activeTab === 'refunding' && (
        <View className={styles.refundHeader}>
          <Text className={styles.refundTitle}>退款/售后</Text>
        </View>
      )}

      {loading ? (
        <View className={styles.loading}>
          <Text>加载中...</Text>
        </View>
      ) : orders.length > 0 ? (
        <ScrollView
          scrollY
          className={styles.orderList}
          enhanced
          showScrollbar={false}
        >
          {orders.map((order, index) => (
            <OrderCard
              key={order.id || `order-${index}`}
              order={order}
              onDetail={goToOrderDetail}
              onCancel={handleCancelOrder}
              onPay={handlePayOrder}
              onConfirmDelivery={handleConfirmDelivery}
              onConfirmPickup={handleConfirmPickup}
              onRefund={handleApplyRefund}
              onReview={handleReviewOrder}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyOrder onGoShopping={goShopping} />
      )}
    </View>
  );
};

export default React.memo(OrderListPage);