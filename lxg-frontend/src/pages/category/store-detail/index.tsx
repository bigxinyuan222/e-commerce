import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { categoryApi } from '@/api/home';
import { Store, normalizeStore } from '@/data/common/stores';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import { useAppContext } from '@/store/AppContext';
import styles from '@/styles/category/store-detail.module.scss';

const StoreDetailPage: React.FC = () => {
  const { currentStore, setCurrentStore } = useAppContext();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadStoreDetail = useCallback(async () => {
    const params = Taro.getCurrentInstance()?.router?.params;
    const storeId = params?.id;

    if (!storeId) {
      setError('缺少门店ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await apiGet(categoryApi.storeDetail, {}, { id: storeId });

      // 兼容后端多种返回结构：直接对象 / { data: {...} } / { data: { store: {...} } }
      let raw: any = null;
      if (res && typeof res === 'object') {
        if ((res as any).id || (res as any).ID || (res as any).storeId) {
          raw = res;
        } else if ((res as any).data) {
          const d = (res as any).data;
          if (d.id || d.ID || d.storeId) {
            raw = d;
          } else if (d.store) {
            raw = d.store;
          } else if (d.info) {
            raw = d.info;
          }
        }
      }

      if (!raw) {
        setError('未找到门店信息');
        setLoading(false);
        return;
      }

      const normalized = normalizeStore(raw);
      setStore(normalized);
    } catch (err) {
      console.error('Failed to load store detail:', err);
      const msg = (err as any)?.message || '加载门店详情失败';
      setError(msg);
      Taro.showToast({ title: msg, icon: 'none' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoreDetail();
  }, [loadStoreDetail]);

  const handleCallStore = () => {
    if (!store?.phone) {
      Taro.showToast({ title: '暂无联系电话', icon: 'none' });
      return;
    }
    Taro.makePhoneCall({ phoneNumber: store.phone });
  };

  const handleOpenMap = () => {
    if (!store || !store.lat || !store.lng) {
      Taro.showToast({ title: '暂无位置信息', icon: 'none' });
      return;
    }
    // 使用微信内置地图查看位置
    Taro.openLocation({
      latitude: store.lat,
      longitude: store.lng,
      name: store.name,
      address: store.address,
      scale: 18
    }).catch(() => {
      Taro.showToast({ title: '打开地图失败', icon: 'none' });
    });
  };

  const handleCopyAddress = () => {
    if (!store?.address) return;
    Taro.setClipboardData({ data: store.address }).then(() => {
      Taro.showToast({ title: '地址已复制', icon: 'success' });
    });
  };

  const handleSelectStore = () => {
    if (!store) return;
    setCurrentStore(store);
    Taro.showToast({ title: `已选择${store.name}`, icon: 'success' });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  // 加载中
  if (loading) {
    return (
      <View className={styles.storeDetailPage}>
        <View className={styles.loading}>
          <Text className={styles.loadingText}>加载中...</Text>
        </View>
      </View>
    );
  }

  // 加载失败
  if (error || !store) {
    return (
      <View className={styles.storeDetailPage}>
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>加载失败</Text>
          <Text className={styles.emptyDesc}>{error || '未找到门店信息'}</Text>
          <View className={styles.retryBtn} onClick={loadStoreDetail}>
            重新加载
          </View>
        </View>
      </View>
    );
  }

  const isSelected = currentStore?.id === store.id;

  return (
    <ScrollView scrollY className={styles.storeDetailPage}>
      {/* 头部信息 */}
      <View className={styles.header}>
        {store.image && (
          <Image
            src={getImageUrl(store.image)}
            className={styles.storeImage}
            mode="aspectFill"
            {...lazyImgProps()}
          />
        )}
        <View className={styles.headerInfo}>
          <Text className={styles.storeName}>{store.name}</Text>
          {store.status && (
            <Text className={styles.storeStatus}>营业中</Text>
          )}
          {store.service && store.service.length > 0 && (
            <View className={styles.serviceTags}>
              {store.service.map((tag, idx) => (
                <Text key={idx} className={styles.serviceTag}>{tag}</Text>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 基础信息 */}
      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text className={styles.sectionTitleText}>基础信息</Text>
        </View>
        <View className={styles.infoCard}>
          {store.address && (
            <View className={styles.infoItem} onClick={handleCopyAddress}>
              <Text className={styles.infoLabel}>地址</Text>
              <View className={styles.infoValue}>
                <Text className={styles.infoText}>{store.address}</Text>
                <Text className={styles.infoAction}>复制</Text>
              </View>
            </View>
          )}
          {store.phone && (
            <View className={styles.infoItem} onClick={handleCallStore}>
              <Text className={styles.infoLabel}>电话</Text>
              <View className={styles.infoValue}>
                <Text className={styles.infoText}>{store.phone}</Text>
                <Text className={styles.infoAction}>拨打</Text>
              </View>
            </View>
          )}
          {store.hours && (
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>营业时间</Text>
              <View className={styles.infoValue}>
                <Text className={styles.infoText}>{store.hours}</Text>
              </View>
            </View>
          )}
          {store.distance > 0 && (
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>距离</Text>
              <View className={styles.infoValue}>
                <Text className={styles.infoText}>
                  {store.distance < 1 ? `${(store.distance * 1000).toFixed(0)}米` : `${store.distance.toFixed(1)}公里`}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* 门店简介 */}
      {store.description && (
        <View className={styles.section}>
          <View className={styles.sectionTitle}>
            <Text className={styles.sectionTitleText}>门店简介</Text>
          </View>
          <View className={styles.descCard}>
            <Text className={styles.descText}>{store.description}</Text>
          </View>
        </View>
      )}

      {/* 地图入口 */}
      {store.lat && store.lng && (
        <View className={styles.section}>
          <View className={styles.mapCard} onClick={handleOpenMap}>
            <View className={styles.mapPlaceholder}>
              <Text className={styles.mapIcon}>🗺️</Text>
              <Text className={styles.mapText}>点击查看地图位置</Text>
            </View>
          </View>
        </View>
      )}

      {/* 底部操作 */}
      <View className={styles.footer}>
        <View className={styles.callBtn} onClick={handleCallStore}>
          电话咨询
        </View>
        <View
          className={`${styles.selectBtn} ${isSelected ? styles.selectBtnDisabled : ''}`}
          onClick={handleSelectStore}
        >
          {isSelected ? '已选择门店' : '选择此门店'}
        </View>
      </View>
    </ScrollView>
  );
};

export default StoreDetailPage;
