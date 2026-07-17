import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { categories } from '@/data/common/home';
import { products } from '@/data/product/products';
import styles from './index.module.scss';

// 子分类项组件
const SubCategoryItem = React.memo(({ 
  subCategory, 
  onClick 
}: { 
  subCategory: any; 
  onClick: (id: string) => void;
}) => (
  <View 
    key={subCategory.id} 
    className={styles.subCategoryItem}
    onClick={() => onClick(subCategory.id)}
  >
    <View className={styles.subCategoryIcon}>
      <Image src={subCategory.icon} mode="aspectFill" lazyLoad />
    </View>
    <Text className={styles.subCategoryName}>{subCategory.name}</Text>
  </View>
));

// 推荐商品组件
const RecommendProduct = React.memo(({ 
  product, 
  onClick 
}: { 
  product: any; 
  onClick: (id: string) => void;
}) => (
  <View 
    key={product.id} 
    className={styles.recommendProduct}
    onClick={() => onClick(product.id)}
  >
    <Image 
      src={product.images[0]} 
      className={styles.productImage} 
      mode="aspectFill" 
      lazyLoad
    />
    <View className={styles.productInfo}>
      <Text className={styles.productName}>{product.name}</Text>
      <View className={styles.productPrice}>
        <Text className={styles.price}>{product.price}</Text>
        <Text className={styles.originalPrice}>{product.originalPrice}</Text>
      </View>
    </View>
  </View>
));

const CategoryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  // 使用 useCallback 缓存事件处理函数
  const goToProductDetail = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/product/detail/index?id=${productId}` });
  }, []);

  // 使用 useCallback 缓存分类点击处理
  const handleCategoryClick = useCallback((index: number) => {
    setActiveCategory(index);
  }, []);

  // 使用 useCallback 缓存子分类点击处理
  const handleSubCategoryClick = useCallback((subCategoryId: string) => {
    const categoryIndex = categories.findIndex(c => 
      c.children?.some(sc => sc.id === subCategoryId)
    );
    if (categoryIndex !== -1) {
      setActiveCategory(categoryIndex);
    }
  }, []);

  // 使用 useMemo 缓存当前分类
  const currentCategory = useMemo(() => categories[activeCategory], [activeCategory]);

  // 使用 useMemo 缓存当前分类的商品
  const categoryProducts = useMemo(() => {
    return products.filter(p => p.categoryId === currentCategory?.id).slice(0, 4);
  }, [currentCategory]);

  useEffect(() => {
    const params = Taro.getCurrentInstance()?.router?.params;
    if (params?.id) {
      const categoryIndex = categories.findIndex(c => c.id === params.id);
      if (categoryIndex !== -1 && categoryIndex !== activeCategory) {
        setActiveCategory(categoryIndex);
      }
    }
  }, []);

  return (
    <View className={styles.categoryPage}>
      {/* 左侧分类导航 */}
      <ScrollView scrollY className={styles.categoryNav}>
        {categories.map((category, index) => (
          <View
            key={category.id}
            className={`${styles.categoryItem} ${index === activeCategory ? styles.active : ''}`}
            onClick={() => handleCategoryClick(index)}
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
              <SubCategoryItem
                key={subCategory.id}
                subCategory={subCategory}
                onClick={handleSubCategoryClick}
              />
            ))}
          </View>
        )}

        {/* 热销推荐 */}
        <View className={styles.hotTag}>
          <Text className={styles.hotTitle}>热销推荐</Text>
        </View>

        <View className={styles.recommendSection}>
          <View className={styles.recommendGrid}>
            {categoryProducts.map((product) => (
              <RecommendProduct
                key={product.id}
                product={product}
                onClick={goToProductDetail}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(CategoryPage);