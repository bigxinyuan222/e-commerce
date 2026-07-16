import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { searchProducts, products } from '@/data/product/products';
import styles from '@/styles/home/search-results.module.scss';

type SortType = 'default' | 'sales' | 'price-asc' | 'price-desc';

interface FilterState {
  minPrice: string;
  maxPrice: string;
  brands: string[];
  colorCategories: string[];
}

const SearchResultsPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sortType, setSortType] = useState<SortType>('default');
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<FilterState>({
    minPrice: '',
    maxPrice: '',
    brands: [],
    colorCategories: []
  });

  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(p => brandSet.add(p.brandName));
    return Array.from(brandSet);
  }, []);

  const colorCategories = useMemo(() => {
    const colors = ['黑色', '白色', '银色', '金色', '蓝色', '红色', '绿色', '紫色'];
    return colors;
  }, []);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params || {};
    if (params.keyword) {
      const decodedKeyword = decodeURIComponent(params.keyword);
      setKeyword(decodedKeyword);
      setInputValue(decodedKeyword);
      performSearch(decodedKeyword);
    }
  }, []);

  useEffect(() => {
    if (keyword) {
      performSearch(keyword);
    }
  }, [sortType, filter]);

  const performSearch = (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      setSearchResults([]);
      return;
    }
    let results = searchProducts(searchKeyword);

    if (filter.minPrice) {
      results = results.filter(p => p.price >= Number(filter.minPrice));
    }
    if (filter.maxPrice) {
      results = results.filter(p => p.price <= Number(filter.maxPrice));
    }
    if (filter.brands.length > 0) {
      results = results.filter(p => filter.brands.includes(p.brandName));
    }

    switch (sortType) {
      case 'sales':
        results.sort((a, b) => b.sales - a.sales);
        break;
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setSearchResults(results);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      Taro.showToast({ title: '请输入搜索关键词', icon: 'none' });
      return;
    }
    setKeyword(inputValue);
    performSearch(inputValue);
  };

  const handleInput = (e: any) => {
    setInputValue(e.detail.value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchResults([]);
  };

  const goToProductDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  };

  const goBack = () => {
    Taro.navigateBack();
  };

  const toggleBrand = (brand: string) => {
    setFilter(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const toggleColor = (color: string) => {
    setFilter(prev => ({
      ...prev,
      colorCategories: prev.colorCategories.includes(color)
        ? prev.colorCategories.filter(c => c !== color)
        : [...prev.colorCategories, color]
    }));
  };

  const resetFilter = () => {
    setFilter({
      minPrice: '',
      maxPrice: '',
      brands: [],
      colorCategories: []
    });
  };

  const applyFilter = () => {
    setShowFilter(false);
  };

  return (
    <View className={styles.resultsPage}>
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
            placeholder="搜索商品"
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

      <View className={styles.sortBar}>
        <ScrollView scrollX className={styles.sortScroll} showScrollbar={false}>
          <View className={styles.sortItems}>
            <Text 
              className={`${styles.sortItem} ${sortType === 'default' ? styles.active : ''}`}
              onClick={() => setSortType('default')}
            >
              综合
            </Text>
            <Text 
              className={`${styles.sortItem} ${sortType === 'sales' ? styles.active : ''}`}
              onClick={() => setSortType('sales')}
            >
              销量
            </Text>
            <Text 
              className={`${styles.sortItem} ${sortType === 'price-asc' || sortType === 'price-desc' ? styles.active : ''}`}
              onClick={() => setSortType(sortType === 'price-asc' ? 'price-desc' : 'price-asc')}
            >
              价格 {sortType === 'price-asc' ? '↑' : sortType === 'price-desc' ? '↓' : ''}
            </Text>
            <Text 
              className={`${styles.sortItem} ${showFilter ? styles.active : ''}`}
              onClick={() => setShowFilter(!showFilter)}
            >
              筛选
            </Text>
          </View>
        </ScrollView>
      </View>

      {showFilter && (
        <View className={styles.filterPanel}>
          <View className={styles.filterHeader}>
            <Text className={styles.filterTitle}>筛选条件</Text>
            <Text className={styles.filterReset} onClick={resetFilter}>重置</Text>
          </View>
          
          <ScrollView scrollY className={styles.filterScroll}>
            <View className={styles.filterSection}>
              <Text className={styles.filterSectionTitle}>价格区间</Text>
              <View className={styles.priceRange}>
                <Input 
                  className={styles.priceInput}
                  placeholder="最低价"
                  type="number"
                  value={filter.minPrice}
                  onInput={(e: any) => setFilter(prev => ({ ...prev, minPrice: e.detail.value }))}
                />
                <Text className={styles.priceSeparator}>~</Text>
                <Input 
                  className={styles.priceInput}
                  placeholder="最高价"
                  type="number"
                  value={filter.maxPrice}
                  onInput={(e: any) => setFilter(prev => ({ ...prev, maxPrice: e.detail.value }))}
                />
              </View>
            </View>

            <View className={styles.filterSection}>
              <Text className={styles.filterSectionTitle}>品牌</Text>
              <View className={styles.filterOptions}>
                {brands.map((brand) => (
                  <View 
                    key={brand}
                    className={`${styles.filterOption} ${filter.brands.includes(brand) ? styles.selected : ''}`}
                    onClick={() => toggleBrand(brand)}
                  >
                    {brand}
                  </View>
                ))}
              </View>
            </View>

            <View className={styles.filterSection}>
              <Text className={styles.filterSectionTitle}>颜色分类</Text>
              <View className={styles.filterOptions}>
                {colorCategories.map((color) => (
                  <View 
                    key={color}
                    className={`${styles.filterOption} ${filter.colorCategories.includes(color) ? styles.selected : ''}`}
                    onClick={() => toggleColor(color)}
                  >
                    {color}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className={styles.filterFooter}>
            <View className={styles.filterApply} onClick={applyFilter}>
              <Text>确定</Text>
            </View>
          </View>
        </View>
      )}

      <ScrollView scrollY className={styles.scrollView}>
        {searchResults.length > 0 ? (
          <View className={styles.resultsContainer}>
            <View className={styles.resultsHeader}>
              <Text className={styles.resultsCount}>搜索 "{keyword}" 找到 {searchResults.length} 件商品</Text>
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
          </View>
        )}
        
        <View className={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

export default SearchResultsPage;