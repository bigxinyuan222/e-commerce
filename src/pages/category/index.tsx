import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { categories } from '@/data/home';
import { products } from '@/data/products';
import styles from './index.module.scss';

const CategoryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  // 页面加载时读取URL参数，跳转到对应分类
  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params;
    if (params?.id) {
      const categoryIndex = categories.findIndex(c => c.id === params.id);
      if (categoryIndex !== -1) {
        setActiveCategory(categoryIndex);
      }
    }
  }, []);

  const currentCategory = categories[activeCategory];

  // 获取当前分类的商品
  const getCategoryProducts = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId).slice(0, 4);
  };

  // 跳转到商品详情
  const goToProductDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/product-detail/index?id=${productId}` });
  };

  return (
    <View className={styles.categoryPage}>
      {/* 左侧分类导航 */}
      <ScrollView scrollY className={styles.categoryNav}>
        {categories.map((category, index) => (
          <View
            key={category.id}
            className={`${styles.categoryItem} ${index === activeCategory ? styles.active : ''}`}
            onClick={() => setActiveCategory(index)}
          >
            <Text>{category.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 右侧子分类内容 */}
      <ScrollView scrollY className={styles.subCategoryContent}>
        {/* 子分类 */}
        {currentCategory?.children && (
          <View className={styles.subCategoryGrid}>
            {currentCategory.children.map((subCategory) => (
              <View 
                key={subCategory.id} 
                className={styles.subCategoryItem}
                onClick={() => setActiveCategory(categories.findIndex(c => 
                  c.children?.some(sc => sc.id === subCategory.id)
                ))}
              >
                <View className={styles.subCategoryIcon}>
                  <Image src={subCategory.icon} mode="aspectFill" />
                </View>
                <Text className={styles.subCategoryName}>{subCategory.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 热销推荐 */}
        <View className={styles.hotTag}>
          <Text className={styles.hotTitle}>热销推荐</Text>
        </View>

        <View className={styles.recommendSection}>
          <View className={styles.recommendGrid}>
            {getCategoryProducts(currentCategory?.id || '1').map((product) => (
              <View 
                key={product.id} 
                className={styles.recommendProduct}
                onClick={() => goToProductDetail(product.id)}
              >
                <Image src={product.images[0]} className={styles.productImage} mode="aspectFill" />
                <View className={styles.productInfo}>
                  <Text className={styles.productName}>{product.name}</Text>
                  <View className={styles.productPrice}>
                    <Text className={styles.price}>{product.price}</Text>
                    <Text className={styles.originalPrice}>{product.originalPrice}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryPage;
