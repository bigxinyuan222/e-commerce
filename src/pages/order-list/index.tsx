import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getOrdersByStatus, cancelOrder, payOrder, confirmPickup, applyRefund } from '@/data/orders';
import styles from './index.module.scss';

const OrderListPage: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState('all');
  const [orderList, setOrderList] = useState<any[]>([]);

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'pending_payment', label: '待支付' },
    { key: 'paid', label: '已支付' },
    { key: 'pending_pickup', label: '待自提' },
    { key: 'completed', label: '已完成' },
  ];

  useEffect(() => {
    // 只在组件首次加载时从URL参数获取状态，后续切换由用户点击控制
    if (orderList.length === 0 || (orderList.length > 0 && !Taro.getCurrentInstance().router?.params?.status)) {
      const { status } = Taro.getCurrentInstance().router?.params || {};
      if (status) {
        setCurrentStatus(status);
      }
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [currentStatus]);

  const loadOrders = () => {
    const filteredOrders = getOrdersByStatus(currentStatus);
    setOrderList(filteredOrders);
  };

  const handleTabChange = (status: string) => {
    setCurrentStatus(status);
  };

  const goShopping = () => {
    Taro.switchTab({ url: '/pages/home/index' });
  };

  const goToOrderDetail = (orderId: string) => {
    Taro.navigateTo({ url: `/pages/order-detail/index?id=${orderId}` });
  };

  const handleCancelOrder = (orderId: string) => {
    Taro.showModal({
      title: '确认取消',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          const success = cancelOrder(orderId);
          if (success) {
            Taro.showToast({ title: '订单已取消', icon: 'success' });
            loadOrders();
          } else {
            Taro.showToast({ title: '取消失败', icon: 'none' });
          }
        }
      }
    });
  };

  const handlePayOrder = (orderId: string) => {
    Taro.showLoading({ title: '支付中...' });
    setTimeout(() => {
      Taro.hideLoading();
      const success = payOrder(orderId);
      if (success) {
        Taro.showToast({ title: '支付成功', icon: 'success' });
        loadOrders();
      } else {
        Taro.showToast({ title: '支付失败', icon: 'none' });
      }
    }, 1500);
  };

  const handleConfirmPickup = (orderId: string) => {
    Taro.showModal({
      title: '确认自提',
      content: '确认已到门店取货？',
      success: (res) => {
        if (res.confirm) {
          const success = confirmPickup(orderId);
          if (success) {
            Taro.showToast({ title: '已完成取货', icon: 'success' });
            loadOrders();
          } else {
            Taro.showToast({ title: '操作失败', icon: 'none' });
          }
        }
      }
    });
  };

  const handleRefund = (orderId: string) => {
    Taro.showActionSheet({
      itemList: ['商品质量问题', '拍错/多拍', '不想要了', '其他'],
      success: (res) => {
        const reasons = ['商品质量问题', '拍错/多拍', '不想要了', '其他'];
        const selectedReason = reasons[res.tapIndex];
        
        Taro.showModal({
          title: '确认退款',
          content: `确定要申请退款吗？\n退款原因：${selectedReason}`,
          success: (modalRes) => {
            if (modalRes.confirm) {
              const success = applyRefund(orderId, selectedReason);
              if (success) {
                Taro.showToast({ title: '退款申请已提交', icon: 'success' });
                loadOrders();
              } else {
                Taro.showToast({ title: '操作失败', icon: 'none' });
              }
            }
          }
        });
      }
    });
  };

  return (
    <View className={styles.orderListPage}>
      {/* 状态标签栏 */}
      <ScrollView scrollX className={styles.statusTabs}>
        {tabs.map((tab) => (
          <View
            key={tab.key}
            className={`${styles.tabItem} ${currentStatus === tab.key ? styles.active : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            <Text>{tab.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 订单列表 */}
      {orderList.length > 0 ? (
        <ScrollView scrollY className={styles.orderList}>
          {orderList.map((order) => (
            <View key={order.id} className={styles.orderCard}>
              <View className={styles.orderHeader}>
                <Text className={styles.orderNo}>订单号: {order.orderNo}</Text>
                <Text className={`${styles.orderStatus} ${styles[order.status]}`}>
                  {order.statusText}
                </Text>
              </View>

              <View className={styles.orderItems}>
                {order.items.map((item: any) => (
                  <View 
                    key={item.id} 
                    className={styles.orderItem}
                    onClick={() => goToOrderDetail(order.id)}
                  >
                    <Image src={item.image} className={styles.itemImage} mode="aspectFill" />
                    <View className={styles.itemInfo}>
                      <Text className={styles.itemName}>{item.productName}</Text>
                      <Text className={styles.itemSpecs}>{item.skuName}</Text>
                      <View className={styles.itemBottom}>
                        <Text className={styles.itemPrice}>{item.price}</Text>
                        <Text className={styles.itemQuantity}>×{item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View className={styles.orderFooter}>
                <View className={styles.totalAmount}>
                  共{order.items.length}件商品
                  <Text className={styles.amount}>合计: {order.payAmount}</Text>
                </View>
                <View className={styles.orderActions}>
                  {order.status === 'pending_payment' && (
                    <>
                      <View 
                        className={styles.actionBtn}
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        取消订单
                      </View>
                      <View 
                        className={`${styles.actionBtn} ${styles.primary}`}
                        onClick={() => handlePayOrder(order.id)}
                      >
                        立即支付
                      </View>
                    </>
                  )}
                  {order.status === 'paid' && (
                    <View 
                      className={`${styles.actionBtn} ${styles.primary}`}
                      onClick={() => handleConfirmPickup(order.id)}
                    >
                      确认自提
                    </View>
                  )}
                  {order.status === 'pending_pickup' && (
                    <View 
                      className={`${styles.actionBtn} ${styles.primary}`}
                      onClick={() => handleConfirmPickup(order.id)}
                    >
                      确认取货
                    </View>
                  )}
                  {order.status === 'completed' && (
                    <>
                      <View 
                        className={`${styles.actionBtn} ${styles.primary}`}
                        onClick={() => Taro.navigateTo({ url: `/pages/refund-apply/index?orderId=${order.id}` })}
                      >
                        申请退款
                      </View>
                      <View 
                        className={styles.actionBtn}
                        onClick={() => goToOrderDetail(order.id)}
                      >
                        查看详情
                      </View>
                    </>
                  )}
                  {order.status === 'cancelled' && (
                    <View 
                      className={styles.actionBtn}
                      onClick={() => goToOrderDetail(order.id)}
                    >
                      查看详情
                    </View>
                  )}
                  {order.status === 'refunding' && (
                    <View 
                      className={styles.actionBtn}
                      onClick={() => goToOrderDetail(order.id)}
                    >
                      退款中
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className={styles.emptyState}>
          <View className={styles.emptyIcon}>📦</View>
          <Text className={styles.emptyText}>暂无相关订单</Text>
          <View className={styles.goShoppingBtn} onClick={goShopping}>
            去逛逛
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderListPage;
