import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { fetchRefundList } from '@/api/cart';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/cart/order-list.module.scss';

const refundStatusTextMap: { [key: string]: string } = {
  'pending': '待审核',
  'approved': '已通过',
  'rejected': '已拒绝',
  'completed': '已完成',
};

const refundStatusColorMap: { [key: string]: string } = {
  'pending': '#faad14',
  'approved': '#52c41a',
  'rejected': '#ff4d4f',
  'completed': '#52c41a',
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
  let skuName = item.skuName || item.SkuName || '';
  if (!skuName && item.specValues && typeof item.specValues === 'object') {
    skuName = Object.values(item.specValues).join('/') || '';
  }

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

function transformRefund(refund: any): any {
  const items = (refund.items || []).map((item: any) => ({
    ...transformOrderItem(item),
    image: getImageUrl(item.image || item.Image || ''),
  }));

  const status = refund.status || 'pending';

  return {
    id: refund.id || '',
    orderId: refund.orderId || '',
    orderNo: refund.refundNo || refund.orderNo || '',
    status,
    statusText: refundStatusTextMap[status] || refund.statusText || '待处理',
    createTime: refund.applyTime || '',
    payAmount: refund.amount || refund.payAmount || 0,
    totalAmount: refund.amount || 0,
    items,
  };
}

const RefundProductItem = React.memo(({ product }: { product: any }) => (
  <View className={styles.orderProduct}>
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

const RefundCard = React.memo(({ record }: { record: any }) => (
  <View className={styles.orderCard}>
    <View className={styles.orderHeader}>
      <Text className={styles.orderId}>退货编号: {record.orderNo}</Text>
      <Text
        className={styles.orderStatus}
        style={{ color: refundStatusColorMap[record.status] || '#999' }}
      >
        {record.statusText}
      </Text>
    </View>

    <View className={styles.orderProducts}>
      {(record.items || []).map((product: any, index: number) => (
        <RefundProductItem
          key={`${record.id}-${product.productId}-${index}`}
          product={product}
        />
      ))}
    </View>

    <View className={styles.orderFooter}>
      <View className={styles.orderTotal}>
        <Text className={styles.totalLabel}>合计:</Text>
        <Text className={styles.totalValue}>¥{record.payAmount}</Text>
      </View>
    </View>
  </View>
));

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待审核' },
  { key: 'approved', label: '已通过' },
  { key: 'rejected', label: '已拒绝' },
  { key: 'completed', label: '已完成' },
];

const validRefundStatuses = ['pending', 'approved', 'rejected', 'completed'];

const RefundListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchRefundList({ page: 1, size: 100 });
      const list = Array.isArray(res?.data) ? res.data : [];
      const refundRecords = list
        .map(transformRefund)
        .filter((r: any) => validRefundStatuses.includes(r.status));
      setRecords(refundRecords);
    } catch (error: any) {
      console.error('加载退款/售后列表失败:', error);
      Taro.showToast({ title: error?.message || '加载失败', icon: 'none' });
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const filteredRecords = useMemo(() => {
    if (activeTab === 'all') return records;
    return records.filter((r) => r.status === activeTab);
  }, [records, activeTab]);

  const activeTabIndex = useMemo(() => {
    return tabs.findIndex((tab) => tab.key === activeTab);
  }, [activeTab]);

  const goShopping = useCallback(() => {
    Taro.switchTab({ url: '/pages/home/index' });
  }, []);

  return (
    <View className={styles.orderListPage}>
      <View className={styles.refundHeader}>
        <Text className={styles.refundTitle}>退款/售后</Text>
      </View>

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
              onClick={() => setActiveTab(tab.key)}
            >
              <Text className={styles.tabText}>{tab.label}</Text>
              {activeTabIndex === index && (
                <View className={styles.tabIndicator} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {loading ? (
        <View className={styles.loading}>
          <Text>加载中...</Text>
        </View>
      ) : filteredRecords.length > 0 ? (
        <ScrollView
          scrollY
          className={styles.orderList}
          enhanced
          showScrollbar={false}
        >
          {filteredRecords.map((record, index) => (
            <RefundCard
              key={record.id || `refund-${index}`}
              record={record}
            />
          ))}
        </ScrollView>
      ) : (
        <View className={styles.emptyOrder}>
          <View className={styles.emptyIcon}>
            <Text>📦</Text>
          </View>
          <Text className={styles.emptyText}>暂无退款/售后记录</Text>
          <View className={styles.goShoppingBtn} onClick={goShopping}>
            去购物
          </View>
        </View>
      )}
    </View>
  );
};

export default React.memo(RefundListPage);
