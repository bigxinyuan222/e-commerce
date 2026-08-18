import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { fetchOrderList, fetchRefundList, fetchOrderReviews, cancelOrder, payOrder, confirmOrder } from '@/api/cart';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import { executeWechatPayment } from '@/utils/wechatPay';
import styles from './index.module.scss';

// 后端订单状态码：0=待支付 2=待发货 3=待自提 4=已完成 5=已取消
const statusCodeMap: { [key: number]: string } = {
  0: 'pending_payment',
  2: 'pending_delivery',
  3: 'pending_pickup',
  4: 'completed',
  5: 'cancelled',
};

const statusCodeReverseMap: { [key: string]: number } = {
  'pending_payment': 0,
  'pending_delivery': 2,
  'pending_pickup': 3,
  'completed': 4,
  'cancelled': 5,
};

const statusMap: { [key: string]: string } = {
  'pending_payment': '待支付',
  'pending_delivery': '待发货',
  'pending_pickup': '待自提',
  'completed': '已完成',
  'cancelled': '已取消',
};

const statusColorMap: { [key: string]: string } = {
  'pending_payment': '#e2231a',
  'pending_delivery': '#1890ff',
  'pending_pickup': '#ff6600',
  'completed': '#52c41a',
  'cancelled': '#999',
};



function pickFirstValid(...candidates: any[]): string {
  for (const value of candidates) {
    if (value !== undefined && value !== null && value !== '' && value !== 0 && value !== '0') {
      return String(value);
    }
  }
  return '';
}

function transformOrderItem(item: any): any {
  // 处理 specValues：后端返回对象 {"颜色":"红色"}
  let skuName = item.skuName || item.SkuName || '';
  if (!skuName && item.specValues && typeof item.specValues === 'object') {
    skuName = Object.values(item.specValues).join('/') || '';
  }

  // 处理 image：后端可能返回 JSON 字符串 '["url"]'
  let image = item.image || item.Image || '';
  if (typeof image === 'string' && image.startsWith('[')) {
    try {
      const parsed = JSON.parse(image);
      if (Array.isArray(parsed) && parsed.length > 0) {
        image = parsed[0].replace(/^`|`$/g, '');
      }
    } catch { /* ignore */ }
  }

  return {
    id: pickFirstValid(item.id, item.ID, item.productId, item.ProductID),
    productId: pickFirstValid(item.productId, item.ProductID),
    productName: item.productName || item.ProductName || '',
    skuId: pickFirstValid(item.skuId, item.SkuID),
    skuName,
    price: item.price != null ? item.price : (item.Price || 0),
    quantity: item.quantity != null ? item.quantity : (item.Quantity || 0),
    image: getImageUrl(image),
  };
}

// 退款记录专用的状态文本映射（0=待审核 1=已通过 2=已拒绝 3=已完成）
const refundStatusTextMap: { [key: string]: string } = {
  'pending': '待审核',
  'approved': '已通过',
  'rejected': '已拒绝',
  'completed': '已完成',
};

function transformRefund(refund: any): any {
  const items = (refund.items || []).map((item: any) => ({
    ...transformOrderItem(item),
    image: getImageUrl(item.image || item.Image || ''),
  }));

  const status = refund.status || 'pending';
  const statusText = refundStatusTextMap[status] || refund.statusText || '待处理';

  return {
    id: refund.id || '',
    orderId: refund.orderId || '',
    orderNo: refund.refundNo || refund.orderNo || '',
    status,
    statusText,
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

  // store 可能是嵌套对象
  const rawStore = order.store || order.Store;
  const store = rawStore ? {
    name: rawStore.name || rawStore.Name || '',
    address: rawStore.address || rawStore.Address || '',
    phone: rawStore.phone || rawStore.Phone || '',
    businessHours: rawStore.businessHours || rawStore.BusinessHours || rawStore.hours || '',
  } : undefined;

  return {
      id: pickFirstValid(order.id, order.ID, order.orderId, order.order_id, order.OrderId, order.OrderID),
      orderNo: pickFirstValid(order.orderNo, order.order_no, order.OrderNo, order.OrderNO),
      status,
      statusText: order.statusText || order.StatusText || statusMap[status] || '',
      createTime: order.createTime || order.CreateTime || order.CreatedAt || '',
      totalAmount: order.totalAmount ?? order.TotalAmount ?? 0,
      freightAmount: order.freightAmount ?? order.FreightAmount ?? 0,
      couponAmount: order.couponAmount ?? order.CouponAmount ?? order.discountAmount ?? 0,
      payAmount: order.payAmount ?? order.PayAmount ?? 0,
      items,
      store,
      address: order.address || order.Address || {},
      paymentMethod: order.paymentMethod || order.PaymentMethod || '',
      payTime: order.payTime || order.PayTime || order.paidAt || order.PaidAt || '',
      deliverTime: order.deliverTime || order.DeliverTime || order.shippedAt || order.ShippedAt || '',
      completeTime: order.completeTime || order.CompleteTime || order.confirmedAt || order.ConfirmedAt || '',
      cancelTime: order.cancelTime || order.CancelTime || order.cancelledAt || order.CancelledAt || '',
      cancelReason: order.cancelReason || order.CancelReason || '',
      isReviewed: order.isReviewed ?? order.is_reviewed ?? order.IsReviewed ?? order.reviewed ?? order.Reviewed ?? false,
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
  onConfirmPickup,
  onRefund,
  onReview,
}: {
  order: any;
  onDetail: (id: string) => void;
  onCancel: (id: string) => void;
  onPay: (id: string) => void;
  onConfirmPickup: (id: string) => void;
  onRefund: (id: string) => void;
  onReview: (id: string) => void;
}) => {
  const isRefundOrder = !!order.isRefundRecord;
  // 退款记录不显示订单操作按钮（取消、支付、确认发货/自提、评价等）
  const canCancel = !isRefundOrder && order.status === 'pending_payment';
  const canPay = !isRefundOrder && order.status === 'pending_payment';
  const canConfirmPickup = !isRefundOrder && order.status === 'pending_pickup';
  const canRefund = !isRefundOrder && (order.status === 'pending_delivery' || order.status === 'completed');
  const canReview = !isRefundOrder && order.status === 'completed';

  const refundStatusMap = {
    'pending': '待审核',
    'approved': '已通过',
    'rejected': '已拒绝',
    'completed': '已完成',
  };

  const refundStatusColorMap = {
    'pending': '#faad14',
    'approved': '#52c41a',
    'rejected': '#ff4d4f',
    'completed': '#52c41a',
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
              text={order.isReviewed ? '已评价' : '待评价'}
              type={order.isReviewed ? 'secondary' : 'primary'}
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
  const [activeTab, setActiveTab] = useState(() => {
    // 初始 tab 直接从 URL/路由参数读取，避免先以 'all' 加载再切换造成竞态
    const params = Taro.getCurrentInstance()?.router?.params || {};
    let status = params.status;
    if (process.env.TARO_ENV === 'h5' && !status && typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      status = searchParams.get('status') || undefined;
    }
    const validStatuses = ['all', 'pending_payment', 'pending_delivery', 'pending_pickup', 'completed', 'cancelled'];
    return status && validStatuses.includes(status) ? status : 'all';
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // 记录最新请求的 tab，用于丢弃过期响应
  const latestStatusRef = useRef(activeTab);

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'pending_payment', label: '待支付' },
    { key: 'pending_delivery', label: '待发货' },
    { key: 'pending_pickup', label: '待自提' },
    { key: 'completed', label: '已完成' },
    { key: 'cancelled', label: '已取消' },
  ];

  useEffect(() => {
    latestStatusRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    let status = params.status;
    if (process.env.TARO_ENV === 'h5' && !status && typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      status = searchParams.get('status') || undefined;
    }
    const validStatuses = ['all', 'pending_payment', 'pending_delivery', 'pending_pickup', 'completed', 'cancelled'];
    if (status && validStatuses.includes(status) && status !== activeTab) {
      setActiveTab(status);
    }
  }, []);

  // 退款有效状态白名单：0=待审核 1=已通过 2=已拒绝 3=已完成
  const validRefundStatuses = ['pending', 'approved', 'rejected', 'completed'];
  // 订单退款相关状态：这些状态的订单不应出现在普通订单列表中
  // 注意：这里必须是“订单”的退款态，不能用退款记录的状态键
  // （退款记录的 'completed' 表示退款已完成，与订单的 'completed' 同名不同义，
  //  若误纳入会把所有已完成订单全部过滤掉）
  const refundRelatedStatuses: string[] = [];

  const loadOrders = useCallback(async (status?: string) => {
    setLoading(true);
    try {
      if (status === 'refunding') {
        const res = await fetchRefundList({ page: 1, size: 50 });
        // 如果用户已切换 tab，丢弃过期响应
        if (status !== latestStatusRef.current) return;
        const list = Array.isArray(res?.data) ? res.data : [];
        // 过滤掉非退款状态的记录，确保退款/售后里只有真正的退款商品
        const refundRecords = list
          .map(transformRefund)
          .filter((r: any) => validRefundStatuses.includes(r.status));
        setOrders(refundRecords);
        return;
      }

      const params: Record<string, any> = { page: 1, size: 50 };
      if (status && status !== 'all') {
        const statusCode = statusCodeReverseMap[status];
        if (statusCode !== undefined) {
          params.status = statusCode;
        }
      }
      const res = await fetchOrderList(params);
      // 如果用户已切换 tab，丢弃过期响应
      if (status !== latestStatusRef.current) return;
      const list = Array.isArray(res?.data) ? res.data : [];
      // 过滤掉退款相关状态的订单，确保普通订单列表不混入退款订单
      let transformed = list
        .map(transformOrder)
        .filter((o: any) => !refundRelatedStatuses.includes(o.status));

      // 加载退款记录：全部 tab 需要把退款记录同步展示；其他 tab 则过滤掉已存在退款记录的订单
      let refundRecords: any[] = [];
      try {
        const refundRes = await fetchRefundList({ page: 1, size: 100 });
        if (status !== latestStatusRef.current) return;
        const refundList = Array.isArray(refundRes?.data) ? refundRes.data : [];
        if (status === 'all') {
          refundRecords = refundList
            .map(transformRefund)
            .filter((r: any) => validRefundStatuses.includes(r.status));
        }
        const refundOrderIds = new Set<string>();
        refundList.forEach((r: any) => {
          if (r.orderId) refundOrderIds.add(String(r.orderId));
          if (r.orderNo) refundOrderIds.add(String(r.orderNo));
        });
        if (status !== 'all') {
          transformed = transformed.filter((o: any) =>
            !refundOrderIds.has(String(o.id)) && !refundOrderIds.has(String(o.orderNo))
          );
        }
      } catch (err) {
        console.error('加载退款记录失败:', err);
      }

      // 后端未返回 isReviewed 时，兜底查询已完成订单的评价记录
      const ordersNeedCheckReview = transformed.filter((o: any) =>
        o.status === 'completed' && !o.isReviewed
      );
      if (ordersNeedCheckReview.length > 0) {
        const reviewResults = await Promise.allSettled(
          ordersNeedCheckReview.map((o: any) => fetchOrderReviews(o.id))
        );
        reviewResults.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value?.data?.length > 0) {
            const orderId = ordersNeedCheckReview[index].id;
            const orderIndex = transformed.findIndex((o: any) => o.id === orderId);
            if (orderIndex >= 0) {
              transformed[orderIndex].isReviewed = true;
            }
          }
        });
      }

      if (status === 'cancelled') {
        setOrders(transformed.filter((o: any) => o.status === 'cancelled'));
      } else if (status && status !== 'all') {
        // 前端二次过滤，确保只显示对应状态的订单
        setOrders(transformed.filter((o: any) => o.status === status));
      } else if (status === 'all') {
        // 全部 tab 把退款记录同步合并进来，按申请/创建时间倒序排列
        const merged = [...transformed, ...refundRecords].sort((a: any, b: any) => {
          const timeA = new Date(a.createTime || a.applyTime || 0).getTime();
          const timeB = new Date(b.createTime || b.applyTime || 0).getTime();
          return timeB - timeA;
        });
        setOrders(merged);
      } else {
        setOrders(transformed);
      }
    } catch (error) {
      if (status !== latestStatusRef.current) return;
      console.error('加载订单列表失败:', error);
      setOrders([]);
      Taro.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      if (status === latestStatusRef.current) {
        setLoading(false);
      }
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
    if (!orderId) {
      Taro.showToast({ title: '订单ID异常，请刷新页面', icon: 'none' });
      return;
    }
    Taro.showLoading({ title: '发起支付...', mask: true });
    try {
      // 1. 调用后端支付接口，获取微信支付参数
      const payRes = await payOrder(orderId, { paymentMethod: 'wechat' });

      // 2. 拉起微信支付（小程序 requestPayment / H5 JSAPI 或 H5 支付）
      //    支付成功后内部会轮询确认支付状态
      Taro.showLoading({ title: '请确认支付...', mask: true });
      const payStatus = await executeWechatPayment(payRes, orderId);

      Taro.hideLoading();
      if (payStatus?.isPaid) {
        Taro.showToast({ title: '支付成功', icon: 'success' });
      } else {
        Taro.showToast({ title: payStatus?.message || '支付状态确认中，请稍后查看', icon: 'none' });
      }
      loadOrders(activeTab);
    } catch (error: any) {
      Taro.hideLoading();
      const errMsg = error?.message || '';
      if (errMsg.includes('取消支付')) {
        Taro.showToast({ title: '已取消支付', icon: 'none' });
      } else {
        Taro.showToast({ title: errMsg || '支付失败', icon: 'none' });
      }
    }
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