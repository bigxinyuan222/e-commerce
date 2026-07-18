import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getBrandById } from '@/data/product/brands';
import { products } from '@/data/product/products';
import styles from './index.module.scss';

const BrandDetailPage = function() {
  const [brand, setBrand] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);

  useEffect(function() {
    var params = Taro.getCurrentInstance()?.router?.params;
    if (params?.id) {
      var foundBrand = getBrandById(params.id);
      setBrand(foundBrand);
      var filteredProducts = products.filter(function(p) {
        return p.brandId === params.id;
      });
      setBrandProducts(filteredProducts);
    }
  }, []);

  const goToProductDetail = function(productId) {
    Taro.navigateTo({ url: '/pages/product-detail/index?id=' + productId });
  };

  if (!brand) {
    return (
      <View className={styles.loading}>
        <Text className={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView scrollY className={styles.brandDetailPage}>
      <View className={styles.brandHeader}>
        <Image src={brand.logo} className={styles.brandLogo} mode="aspectFill" />
        <View className={styles.brandInfo}>
          <Text className={styles.brandName}>{brand.name}</Text>
          <Text className={styles.brandDesc}>{brand.description}</Text>
          <View className={styles.brandStats}>
            <Text className={styles.statItem}>
              <Text className={styles.statNum}>{brand.productsCount}</Text>
              <Text className={styles.statLabel}>款商品</Text>
            </Text>
            <View className={styles.statDivider} />
            <Text className={styles.statItem}>
              <Text className={styles.statNum}>10万+</Text>
              <Text className={styles.statLabel}>粉丝</Text>
            </Text>
          </View>
        </View>
        {brand.isHot && (
          <View className={styles.hotBadge}>
            <Text className={styles.hotBadgeText}>热门品牌</Text>
          </View>
        )}
      </View>

      <View className={styles.productSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>品牌商品</Text>
          <Text className={styles.sectionMore}>查看全部 ›</Text>
        </View>
        <View className={styles.productGrid}>
          {brandProducts.map(function(product) {
            return (
              <View 
                key={product.id} 
                className={styles.productItem}
                onClick={function() { goToProductDetail(product.id); }}
              >
                <Image 
                  src={product.images[0]} 
                  className={styles.productImage} 
                  mode="aspectFill" 
                />
                <View className={styles.productInfo}>
                  <Text className={styles.productName}>{product.name}</Text>
                  <View className={styles.productPriceWrap}>
                    <Text className={styles.productPrice}>¥{product.price}</Text>
                    {product.originalPrice > product.price && (
                      <Text className={styles.productOriginalPrice}>¥{product.originalPrice}</Text>
                    )}
                  </View>
                  <Text className={styles.productSales}>已售 {product.sales}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {brandProducts.length === 0 && (
          <View className={styles.emptyProducts}>
            <Text className={styles.emptyText}>暂无商品</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default BrandDetailPage;