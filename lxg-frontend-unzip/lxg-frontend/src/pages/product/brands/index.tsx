import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { brands, getHotBrands } from '@/data/product/brands';
import styles from './index.module.scss';

const BrandsPage = function() {
  const [activeTab, setActiveTab] = useState('hot');
  const [searchKeyword, setSearchKeyword] = useState('');

  var displayBrands;
  if (searchKeyword) {
    displayBrands = brands.filter(function(brand) {
      return brand.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 ||
             brand.description.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1;
    });
  } else {
    displayBrands = activeTab === 'hot' ? getHotBrands() : brands;
  }

  const goToBrandDetail = function(brandId) {
    Taro.navigateTo({ url: '/pages/brand-detail/index?id=' + brandId });
  };

  return (
    <View className={styles.brandsPage}>
      <View className={styles.searchBar}>
        <View className={styles.searchInputWrap}>
          <Text className={styles.searchIcon}>🔍</Text>
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="搜索品牌"
            value={searchKeyword}
            onChange={function(e) { setSearchKeyword(e.target.value); }}
          />
          {searchKeyword && (
            <Text className={styles.clearIcon} onClick={function() { setSearchKeyword(''); }}>✕</Text>
          )}
        </View>
      </View>

      <View className={styles.tabs}>
        <Text 
          className={activeTab === 'hot' ? styles.tab + ' ' + styles.active : styles.tab}
          onClick={function() { setActiveTab('hot'); }}
        >
          热门品牌
        </Text>
        <Text 
          className={activeTab === 'all' ? styles.tab + ' ' + styles.active : styles.tab}
          onClick={function() { setActiveTab('all'); }}
        >
          全部品牌
        </Text>
      </View>

      <ScrollView scrollY className={styles.brandList}>
        <View className={styles.brandGrid}>
          {displayBrands.map(function(brand) {
            return (
              <View 
                key={brand.id} 
                className={styles.brandItem}
                onClick={function() { goToBrandDetail(brand.id); }}
              >
                <View className={styles.brandLogoWrap}>
                  <Image 
                    src={brand.logo} 
                    className={styles.brandLogo} 
                    mode="aspectFill" 
                  />
                  {brand.isHot && (
                    <View className={styles.hotTag}>
                      <Text className={styles.hotTagText}>HOT</Text>
                    </View>
                  )}
                </View>
                <Text className={styles.brandName}>{brand.name}</Text>
                <Text className={styles.brandProductCount}>{brand.productsCount}款商品</Text>
              </View>
            );
          })}
        </View>

        {displayBrands.length === 0 && (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🔍</Text>
            <Text className={styles.emptyText}>未找到相关品牌</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BrandsPage;