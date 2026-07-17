import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { products } from '@/data/product/products';
import styles from '@/styles/home/search-inner.module.scss';

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.keyword) {
      const decodedKeyword = decodeURIComponent(params.keyword);
      setKeyword(decodedKeyword);
      setInputValue(decodedKeyword);
      performSearch(decodedKeyword);
    }
  }, []);

  const performSearch = useCallback((searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      setSearchResults([]);
      return;
    }
    
    const allProducts = products;
    const results = allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const categoryMatch = product.categoryName.toLowerCase().includes(searchKeyword.toLowerCase());
      const brandMatch = product.brandName.toLowerCase().includes(searchKeyword.toLowerCase());
      return nameMatch || categoryMatch || brandMatch;
    });
    
    setSearchResults(results);
  }, []);

  const handleSearch = useCallback(() => {
    if (!inputValue.trim()) {
      Taro.showToast({ title: '请输入搜索关键词', icon: 'none' });
      return;
    }
    setKeyword(inputValue);
    performSearch(inputValue);
  }, [inputValue, performSearch]);

  const handleInput = useCallback((e: any) => {
    setInputValue(e.detail.value);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
    setSearchResults([]);
  }, []);

  const goToProductDetail = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  }, []);

  const goBack = useCallback(() => {
    Taro.navigateBack();
  }, []);

  return (
    <View className={styles.searchPage}>
      <View className={styles.searchHeader}>
        <View className={styles.backBtn} onClick={goBack}>
          <Text className={styles.backIcon}>‹</Text>
        </View>
        <View className={styles.searchInputWrap}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchInput}
            value={inputValue}
            onInput={handleInput}
            placeholder="搜索商品/店铺"
            confirmType="search"
            onConfirm={handleSearch}
          />
          {inputValue && (
            <View className={styles.clearBtn} onClick={handleClear}>
              <Text className={styles.clearIcon}>×</Text>
            </View>
          )}
        </View>
        <View className={styles.searchBtn} onClick={handleSearch}>
          <Text className={styles.searchBtnText}>搜索</Text>
        </View>
      </View>

      <ScrollView scrollY className={styles.scrollView}>
        {searchResults.length > 0 ? (
          <View className={styles.resultsContainer}>
            <View className={styles.resultsHeader}>
              <Text className={styles.resultsCount}>找到 {searchResults.length} 件商品</Text>
            </View>
            
            <View className={styles.productList}>
              {searchResults.map((product) => (
                <View 
                  key={product.id} 
                  className={styles.productCard}
                  onClick={() => goToProductDetail(product.id)}
                >
                  <Image 
                    src={product.images[0]} 
                    className={styles.productImage} 
                    mode="aspectFill" 
                    lazyLoad
                  />
                  <View className={styles.productInfo}>
                    <Text className={styles.productName}>{product.name}</Text>
                    <View className={styles.productTags}>
                      {product.tags.slice(0, 2).map((tag: string) => (
                        <Text key={tag} className={styles.tag}>{tag}</Text>
                      ))}
                    </View>
                    <View className={styles.productPrice}>
                      <Text className={styles.currentPrice}>{product.price}</Text>
                      <Text className={styles.originalPrice}>{product.originalPrice}</Text>
                    </View>
                    <Text className={styles.salesInfo}>已售 {product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万` : product.sales} 件</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : keyword ? (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🔍</Text>
            <Text className={styles.emptyText}>未找到相关商品</Text>
            <Text className={styles.emptyHint}>试试其他关键词吧</Text>
          </View>
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🔍</Text>
            <Text className={styles.emptyText}>请输入关键词搜索</Text>
            <Text className={styles.emptyHint}>搜索商品名称、分类或品牌</Text>
          </View>
        )}
        
        <View className={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default SearchPage;