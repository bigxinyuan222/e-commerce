import React, { useState, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { hotSearchKeywords } from '@/data/common/home';
import { products } from '@/data/product/products';
import styles from '@/styles/home/search.module.scss';

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchValue.trim()) {
      const lowerKeyword = searchValue.toLowerCase();
      const suggestions = products
        .filter(p => p.name.toLowerCase().includes(lowerKeyword))
        .map(p => {
          const index = p.name.toLowerCase().indexOf(lowerKeyword);
          return p.name.substring(0, index) + searchValue + p.name.substring(index + lowerKeyword.length);
        })
        .slice(0, 10);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchValue]);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      Taro.showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }
    Taro.navigateTo({ 
      url: `/pages/home/search-results/index?keyword=${encodeURIComponent(searchValue)}` 
    });
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeywordSearch = (keyword: string) => {
    Taro.navigateTo({ 
      url: `/pages/home/search-results/index?keyword=${encodeURIComponent(keyword)}` 
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    Taro.navigateTo({ 
      url: `/pages/home/search-results/index?keyword=${encodeURIComponent(suggestion)}` 
    });
  };

  const goBack = () => {
    Taro.navigateBack();
  };

  return (
    <View className={styles.searchPage}>
      <View className={styles.searchBar}>
        <View className={styles.backBtn} onClick={goBack}>
          <Text className={styles.backIcon}>‹</Text>
        </View>
        <View className={styles.searchInput}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.input}
            type="text"
            placeholder="搜索商品"
            value={searchValue}
            onInput={(e) => setSearchValue(e.detail.value)}
            onConfirm={handleSearch}
            focus
          />
          {searchValue && (
            <Text className={styles.clearBtn} onClick={handleClear}>×</Text>
          )}
        </View>
        <Text className={styles.searchBtn} onClick={handleSearch}>搜索</Text>
      </View>

      {showSuggestions && (
        <View className={styles.suggestionsList}>
          {searchSuggestions.length > 0 ? (
            searchSuggestions.map((suggestion, index) => (
              <View 
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Text className={styles.suggestionIcon}>🔍</Text>
                <Text className={styles.suggestionText}>{suggestion}</Text>
              </View>
            ))
          ) : (
            <View className={styles.noSuggestions}>
              <Text className={styles.suggestionIcon}>🔍</Text>
              <Text className={styles.suggestionText}>暂无相关搜索建议</Text>
            </View>
          )}
        </View>
      )}

      {!showSuggestions && (
        <View className={styles.searchContent}>
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

          <View className={styles.section}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>搜索历史</Text>
              <Text className={styles.clearHistory}>清空</Text>
            </View>
            <View className={styles.historyList}>
              <View className={styles.historyItem} onClick={() => handleKeywordSearch('iPhone')}>iPhone</View>
              <View className={styles.historyItem} onClick={() => handleKeywordSearch('华为手机')}>华为手机</View>
              <View className={styles.historyItem} onClick={() => handleKeywordSearch('蓝牙耳机')}>蓝牙耳机</View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchPage;