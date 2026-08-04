import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { productApi } from '@/api/home';
import styles from '@/styles/home/search.module.scss';

// 热搜关键词：后续可接入 /homepage/hot-keywords 等接口
const hotSearchKeywords: string[] = [];

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 输入联想建议：调用搜索接口前 10 条结果的商品名称
  useEffect(() => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    const trimmed = searchValue.trim();
    if (!trimmed) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    searchTimerRef.current = setTimeout(async () => {
      try {
        const res = await apiGet(productApi.search, {
          key_word: trimmed,
          page: 1,
          size: 10,
        });
        const list = Array.isArray(res?.data) ? res.data : res?.data?.list || [];
        const suggestions = list
          .map((p: any) => p.name || p.Name || p.productName || p.ProductName || '')
          .filter(Boolean)
          .slice(0, 10);
        setSearchSuggestions(suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('搜索建议失败:', error);
        setSearchSuggestions([]);
      }
    }, 300);

    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
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
              {/* 搜索历史后续可从本地存储读取并渲染 */}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchPage;