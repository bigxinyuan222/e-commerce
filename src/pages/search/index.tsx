import React, { useState } from 'react';
import { View, Text, Input, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { searchProducts, hotSearchKeywords } from '@/data/home';
import styles from './index.module.scss';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      Taro.showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }
    const results = searchProducts(searchValue);
    setSearchResults(results);
    setShowResults(true);
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResults([]);
    setShowResults(false);
  };

  const goToProductDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/product-detail/index?id=${productId}` });
  };

  const handleKeywordSearch = (keyword: string) => {
    setSearchValue(keyword);
    const results = searchProducts(keyword);
    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <View className={styles.searchPage}>
      {/* 搜索框 */}
      <View className={styles.searchBar}>
        <View className={styles.searchInput}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.input}
            type="text"
            placeholder="搜索商品"
            value={searchValue}
            onInput={(e) => setSearchValue(e.detail.value)}
            onConfirm={handleSearch}
          />
          {searchValue && (
            <Text className={styles.clearBtn} onClick={handleClear}>×</Text>
          )}
        </View>
        <Text className={styles.cancelBtn} onClick={() => Taro.navigateBack()}>取消</Text>
      </View>

      {!showResults ? (
        <View className={styles.searchContent}>
          {/* 热门搜索 */}
          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>热门搜索</Text>
            </View>
            <View className={styles.hotKeywords}>
              {hotSearchKeywords.map((keyword, index) => (
                <View 
                  key={index}
                  className={`${styles.keywordItem} ${index < 3 ? styles.topKeyword : ''}`}
                  onClick={() => handleKeywordSearch(keyword)}
                >
                  {keyword}
                </View>
              ))}
            </View>
          </View>

          {/* 搜索历史 */}
          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>搜索历史</Text>
              <Text className={styles.clearHistory}>清空</Text>
            </View>
            <View className={styles.historyList}>
              <View className={styles.historyItem}>iPhone</View>
              <View className={styles.historyItem}>华为手机</View>
              <View className={styles.historyItem}>蓝牙耳机</View>
            </View>
          </View>
        </View>
      ) : (
        <View className={styles.resultsList}>
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <View 
                key={product.id} 
                className={styles.resultItem}
                onClick={() => goToProductDetail(product.id)}
              >
                <Image src={product.images[0]} className={styles.resultImage} mode="aspectFill" />
                <View className={styles.resultInfo}>
                  <Text className={styles.resultName}>{product.name}</Text>
                  <Text className={styles.resultPrice}>{product.price}</Text>
                </View>
              </View>
            ))
          ) : (
            <View className={styles.noResults}>
              <Text>未找到相关商品</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchPage;
