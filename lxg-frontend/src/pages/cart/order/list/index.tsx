import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getOrdersByStatus, cancelOrder, payOrder, confirmDelivery, confirmPickup, applyRefund, updateRefundStatus } from '@/data/order/orders';
import styles from '@/styles/cart/order-list.module.scss';

// 订单状态映射
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
};

// 订单状态颜色映射
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

// 订单商品项组件
const OrderProductItem = React.memo(({ product, onClick }: { product: any; onClick: () => void }) => (
  <View className={styles.orderProduct} onClick={onClick}>
    <Image 
      src={product.image} 
      className={styles.productImage} 
      mode="aspectFill"
      lazyLoad
    />
    <View className={styles.productInfo}>
      <Text className={styles.productName}>{product.productName}</Text>
      <Text className={styles.productSpecs}>{product.skuName}</Text>
      <View className={styles.productBottom}>
        <Text className={styles.productPrice}>{product.price}</Text>
        <Text className={styles.productQuantity}>x{product.quantity}</Text>
      </View>
    </View>
  </View>
));

// 订单操作按钮组件
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

// 订单卡片组件
const OrderCard = React.memo(({ 
  order, 
  onDetail, 
  onCancel, 
  onPay, 
  onConfirmDelivery,
  onConfirmPickup, 
  onRefund,
  onReview,
  onRefundStatusChange
}: { 
  order: any; 
  onDetail: (id: string) => void;
  onCancel: (id: string) => void;
  onPay: (id: string) => void;
  onConfirmDelivery: (id: string) => void;
  onConfirmPickup: (id: string) => void;
  onRefund: (id: string) => void;
  onReview: (id: string) => void;
  onRefundStatusChange: (orderId: string, status: string) => void;
}) => {
  // 判断订单是否可取消
  const canCancel = order.status === 'pending_payment';
  // 判断订单是否可支付
  const canPay = order.status === 'pending_payment';
  // 判断订单是否可确认发货
  const canConfirmDelivery = order.status === 'pending_delivery';
  // 判断订单是否可确认自提
  const canConfirmPickup = order.status === 'pending_pickup';
  // 判断订单是否可退款（待发货、待自提和已完成都可退款）
  const canRefund = order.status === 'pending_delivery' || order.status === 'pending_pickup' || order.status === 'completed' || order.status === 'pending_review';
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
    <View className={styles.orderCard} key={order.id}>
      {/* 订单头部 */}
      <View className={styles.orderHeader}>
        <Text className={styles.orderId}>{isRefundOrder ? '退货编号' : '订单编号'}: {order.orderNo}</Text>
        <Text className={styles.orderStatus} style={{ color: isRefundOrder ? refundStatusColorMap[order.status] : (statusColorMap[order.status] || '#999') }}>
          {isRefundOrder ? (refundStatusMap[order.status] || order.statusText) : (statusMap[order.status] || order.statusText)}
        </Text>
      </View>

      {/* 门店信息 */}
      <View className={styles.storeInfo}>
        <Text className={styles.storeName}>{order.store?.name || '无门店信息'}</Text>
        <Text className={styles.storeAddress}>{order.store?.address || ''}</Text>
      </View>

      {/* 商品列表 */}
      <View className={styles.orderProducts}>
        {(order.items || []).map((product: any, index: number) => (
          <OrderProductItem 
            key={`${order.id}-${product.productId}-${index}`}
            product={product}
            onClick={() => onDetail(order.id)}
          />
        ))}
      </View>

      {/* 订单底部 */}
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
              text="评价晒单" 
              type="primary" 
              onClick={() => onReview(order.id)} 
            />
          )}
        </View>
      </View>

      {/* 退款状态操作按钮 */}
      {isRefundOrder && (
        <View className={styles.refundStatusActions}>
          <View 
            className={`${styles.refundStatusBtn} ${order.status === 'refunding' ? styles.active : ''}`}
            onClick={() => onRefundStatusChange(order.id, 'refunding')}
          >
            <Text>退款中</Text>
          </View>
          <View 
            className={`${styles.refundStatusBtn} ${order.status === 'refund_rejected' ? styles.active : ''}`}
            onClick={() => onRefundStatusChange(order.id, 'refund_rejected')}
          >
            <Text>商家已拒绝</Text>
          </View>
          <View 
            className={`${styles.refundStatusBtn} ${order.status === 'refunded' ? styles.active : ''}`}
            onClick={() => onRefundStatusChange(order.id, 'refunded')}
          >
            <Text>已退款</Text>
          </View>
        </View>
      )}
    </View>
  );
});

// 空订单组件
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
  const [currentStatus, setCurrentStatus] = useState('all');
  const [orderList, setOrderList] = useState<any[]>([]);
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

  // 初始化时读取URL参数
  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.status) {
      setCurrentStatus(params.status);
    }
  }, []);

  // 加载订单列表
  const loadOrders = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredOrders = getOrdersByStatus(currentStatus);
      setOrderList(filteredOrders);
      setLoading(false);
    }, 100);
  }, [currentStatus]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // 使用 useCallback 缓存事件处理函数
  const handleTabChange = useCallback((status: string) => {
    setCurrentStatus(status);
  }, []);

  const goShopping = useCallback(() => {
    Taro.switchTab({ url: '/pages/home/index' });
  }, []);

  const goToOrderDetail = useCallback((orderId: string) => {
    Taro.navigateTo({ url: `/pages/order/detail/index?id=${orderId}` });
  }, []);

  const handleCancelOrder = useCallback((orderId: string) => {
    Taro.showModal({
      title: '确认取消',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          cancelOrder(orderId);
          loadOrders();
          Taro.showToast({ title: '订单已取消', icon: 'success' });
        }
      }
    });
  }, [loadOrders]);

  const handlePayOrder = useCallback((orderId: string) => {
    payOrder(orderId);
    loadOrders();
    Taro.showToast({ title: '支付成功', icon: 'success' });
  }, [loadOrders]);

  const handleConfirmDelivery = useCallback((orderId: string) => {
    Taro.showModal({
      title: '确认发货',
      content: '确定已发货吗？发货后订单将变为待自提状态',
      success: (res) => {
        if (res.confirm) {
          confirmDelivery(orderId);
          loadOrders();
          Taro.showToast({ title: '已确认发货', icon: 'success' });
        }
      }
    });
  }, [loadOrders]);

  const handleConfirmPickup = useCallback((orderId: string) => {
    Taro.showModal({
      title: '确认自提',
      content: '确定已收到商品吗？',
      success: (res) => {
        if (res.confirm) {
          confirmPickup(orderId);
          loadOrders();
          Taro.showToast({ title: '已确认收货', icon: 'success' });
        }
      }
    });
  }, [loadOrders]);

  const handleApplyRefund = useCallback((orderId: string) => {
    Taro.navigateTo({ url: `/pages/order/refund/index?id=${orderId}` });
  }, []);

  const handleReviewOrder = useCallback((orderId: string) => {
    Taro.navigateTo({ url: `/pages/order/review/index?id=${orderId}` });
  }, []);

  const handleRefundStatusChange = useCallback((orderId: string, status: string) => {
    updateRefundStatus(orderId, status);
    loadOrders();
    const statusTextMap: { [key: string]: string } = {
      'refunding': '退款中',
      'refund_rejected': '商家已拒绝',
      'refunded': '已退款',
    };
    Taro.showToast({ title: `状态已更新为${statusTextMap[status]}`, icon: 'success' });
  }, [loadOrders]);

  // 使用 useMemo 缓存当前选中的标签索引
  const activeTabIndex = useMemo(() => {
    return tabs.findIndex(tab => tab.key === currentStatus);
  }, [currentStatus, tabs]);

  return (
    <View className={styles.orderListPage}>
      {/* 标签导航（退款/售后页面不显示标签） */}
      {currentStatus !== 'refunding' && (
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
      {/* 退款/售后页面标题 */}
      {currentStatus === 'refunding' && (
        <View className={styles.refundHeader}>
          <Text className={styles.refundTitle}>退款/售后</Text>
        </View>
      )}

      {/* 订单列表 */}
      {loading ? (
        <View className={styles.loading}>
          <Text>加载中...</Text>
        </View>
      ) : orderList.length > 0 ? (
        <ScrollView 
          scrollY 
          className={styles.orderList}
          enhanced
          showScrollbar={false}
        >
          {orderList.map((order) => (
            <OrderCard 
              key={order.id}
              order={order}
              onDetail={goToOrderDetail}
              onCancel={handleCancelOrder}
              onPay={handlePayOrder}
              onConfirmDelivery={handleConfirmDelivery}
              onConfirmPickup={handleConfirmPickup}
              onRefund={handleApplyRefund}
              onReview={handleReviewOrder}
              onRefundStatusChange={handleRefundStatusChange}
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