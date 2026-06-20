import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

const OrderDetailPage: React.FC = () => {
  const order = {
    orderNo: 'JD2024011500001',
    status: 'paid',
    statusText: '已支付',
    createTime: '2024-01-15 10:30:00',
    payTime: '2024-01-15 10:35:00',
    items: [
      { id: '1', productName: 'iPhone 15 Pro Max 256GB', skuName: '钛金属原色', price: 9999, quantity: 1, image: 'https://picsum.photos/id/1/200/200' }
    ],
    store: { name: '深圳南山科技园店', address: '广东省深圳市南山区科技园南区A2栋1楼', phone: '0755-12345678', hours: '09:00-22:00' },
    totalAmount: 9999,
    payAmount: 9999
  };

  const goToProductDetail = () => {
    Taro.navigateTo({ url: '/pages/product-detail/index?id=product-1' });
  };

  const callStore = () => {
    Taro.makePhoneCall({ phoneNumber: '0755-12345678' });
  };

  return (
    <View className={styles.orderDetailPage}>
      <ScrollView scrollY style={{ height: 'calc(100vh - 120rpx)' }}>
        <View className={styles.statusSection}>
          <Text className={styles.statusIcon}>✅</Text>
          <Text className={styles.statusText}>{order.statusText}</Text>
        </View>

        <View className={styles.storeSection}>
          <View className={styles.storeInfo}>
            <Text className={styles.storeName}>🏪 {order.store.name}</Text>
            <Text className={styles.storeAddress}>{order.store.address}</Text>
            <Text className={styles.storeHours}>营业时间: {order.store.hours}</Text>
          </View>
          <View className={styles.storeAction} onClick={callStore}>📞</View>
        </View>

        <View className={styles.goodsSection}>
          <View className={styles.goodsItem} onClick={goToProductDetail}>
            <Image src={order.items[0].image} className={styles.goodsImage} mode="aspectFill" />
            <View className={styles.goodsInfo}>
              <Text className={styles.goodsName}>{order.items[0].productName}</Text>
              <Text className={styles.goodsSpecs}>{order.items[0].skuName}</Text>
              <View className={styles.goodsBottom}>
                <Text className={styles.goodsPrice}>¥{order.items[0].price}</Text>
                <Text className={styles.goodsQuantity}>×{order.items[0].quantity}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className={styles.orderInfo}>
          <Text className={styles.infoTitle}>订单信息</Text>
          <View className={styles.infoRow}><Text className={styles.infoLabel}>订单编号</Text><Text className={styles.infoValue}>{order.orderNo}</Text></View>
          <View className={styles.infoRow}><Text className={styles.infoLabel}>下单时间</Text><Text className={styles.infoValue}>{order.createTime}</Text></View>
          <View className={styles.infoRow}><Text className={styles.infoLabel}>支付时间</Text><Text className={styles.infoValue}>{order.payTime}</Text></View>
        </View>

        <View className={styles.amountSection}>
          <View className={styles.amountRow}><Text className={styles.amountLabel}>商品金额</Text><Text className={styles.amountValue}>¥{order.totalAmount}</Text></View>
          <View className={styles.amountRow}><Text className={styles.amountLabel}>运费</Text><Text className={styles.amountValue}>¥0</Text></View>
          <View className={`${styles.amountRow} ${styles.highlight}`}><Text className={styles.amountLabel}>应付总额</Text><Text className={styles.amountValue}>¥{order.payAmount}</Text></View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.actionBtn}>联系客服</View>
        <View className={`${styles.actionBtn} ${styles.primary}`}>确认取货</View>
      </View>
    </View>
  );
};

export default OrderDetailPage;
