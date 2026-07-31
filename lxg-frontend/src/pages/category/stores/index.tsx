import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { categoryApi } from '@/api/home';
import { Store, normalizeStoreList } from '@/data/common/stores';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import { useAppContext } from '@/store/AppContext';
import styles from '@/styles/category/stores.module.scss';

const StoresPage: React.FC = () => {
  const { currentStore, setCurrentStore } = useAppContext();
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string>('');

  // 加载门店列表
  const loadStores = useCallback(async (reset: boolean = false) => {
    const currentPage = reset ? 1 : page;
    if (reset) {
      setPage(1);
      setHasMore(true);
      setError('');
    } else {
      if (loadingMore || !hasMore) return;
      setLoadingMore(true);
    }

    try {
      const res = await apiGet(categoryApi.stores, {
        page: currentPage,
        size: 20
      });

      const newStores = normalizeStoreList(res);
      const totalCount = (res as any)?.data?.total || (res as any)?.total || newStores.length;

      if (reset) {
        setStoreList(newStores);
      } else {
        setStoreList(prev => [...prev, ...newStores]);
      }

      // 判断是否还有更多
      const currentLen = reset ? newStores.length : storeList.length + newStores.length;
      setHasMore(newStores.length >= 20 && currentLen < totalCount);

      if (!reset && newStores.length > 0) {
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Failed to load stores:', error);
      const msg = (error as any)?.message || '加载门店失败';
      setError(msg);
      if (reset) {
        Taro.showToast({ title: msg, icon: 'none' });
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore, storeList.length]);

  useEffect(() => {
    loadStores(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 下拉刷新
  const handlePullDownRefresh = async () => {
    await loadStores(true);
    Taro.stopPullDownRefresh();
  };

  // 触底加载更多
  const onReachBottom = () => {
    if (hasMore && !loadingMore && !loading) {
      loadStores(false);
    }
  };

  // 注册触底事件
  useEffect(() => {
    Taro.useReachBottom(() => {
      onReachBottom();
    });
    Taro.usePullDownRefresh(() => {
      handlePullDownRefresh();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loadingMore, loading, page, storeList.length]);

  const handleCallStore = (phone: string) => {
    if (!phone) {
      Taro.showToast({ title: '暂无联系电话', icon: 'none' });
      return;
    }
    Taro.makePhoneCall({ phoneNumber: phone });
  };

  const handleSelectStore = (store: Store) => {
    setCurrentStore(store);
    Taro.showToast({ title: `已选择${store.name}`, icon: 'success' });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  const handleViewDetail = (store: Store) => {
    Taro.navigateTo({
      url: `/pages/category/store-detail/index?id=${store.id}`
    });
  };

  // 加载中
  if (loading && storeList.length === 0) {
    return (
      <View className={styles.storesPage}>
        <View className={styles.loading}>
          <Text className={styles.loadingText}>加载中...</Text>
        </View>
      </View>
    );
  }

  // 加载失败且无数据
  if (error && storeList.length === 0) {
    return (
      <View className={styles.storesPage}>
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>加载失败</Text>
          <Text className={styles.emptyDesc}>{error}</Text>
          <View className={styles.retryBtn} onClick={() => loadStores(true)}>
            重新加载
          </View>
        </View>
      </View>
    );
  }

  // 空数据
  if (storeList.length === 0) {
    return (
      <View className={styles.storesPage}>
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>暂无门店</Text>
          <Text className={styles.emptyDesc}>附近暂无门店信息</Text>
          <View className={styles.retryBtn} onClick={() => loadStores(true)}>
            刷新
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.storesPage}>
      {storeList.map((store) => {
        const isSelected = currentStore?.id === store.id;
        return (
          <View key={store.id} className={`${styles.storeCard} ${isSelected ? styles.selected : ''}`}>
            <View className={styles.storeHeader}>
              <View className={styles.storeTitle}>
                {store.image ? (
                  <Image
                    src={getImageUrl(store.image)}
                    className={styles.storeImage}
                    mode="aspectFill"
                    {...lazyImgProps()}
                  />
                ) : null}
                <Text className={styles.storeName}>{store.name}</Text>
              </View>
              {isSelected && (
                <Text className={styles.selectedTag}>✓ 已选择</Text>
              )}
            </View>

            {store.address && (
              <Text className={styles.storeAddress}>📍 {store.address}</Text>
            )}
            {store.phone && (
              <Text className={styles.storePhone} onClick={() => handleCallStore(store.phone)}>
                📞 {store.phone}
              </Text>
            )}
            {store.hours && (
              <Text className={styles.storeHours}>营业时间: {store.hours}</Text>
            )}

            {store.service && store.service.length > 0 && (
              <View className={styles.serviceTags}>
                {store.service.map((tag, idx) => (
                  <Text key={idx} className={styles.serviceTag}>{tag}</Text>
                ))}
              </View>
            )}

            <View className={styles.btnRow}>
              <View className={styles.detailBtn} onClick={() => handleViewDetail(store)}>
                查看详情
              </View>
              <View
                className={`${styles.selectBtn} ${isSelected ? styles.selectBtnDisabled : ''}`}
                onClick={() => handleSelectStore(store)}
              >
                {isSelected ? '已选择' : '选择此门店'}
              </View>
            </View>
          </View>
        );
      })}

      {loadingMore && (
        <View className={styles.loadMore}>
          <Text className={styles.loadMoreText}>加载中...</Text>
        </View>
      )}
      {!hasMore && storeList.length > 0 && (
        <View className={styles.loadMore}>
          <Text className={styles.loadMoreText}>没有更多门店了</Text>
        </View>
      )}
    </View>
  );
};

export default StoresPage;
