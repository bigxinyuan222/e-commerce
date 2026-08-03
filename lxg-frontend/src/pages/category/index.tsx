import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { categoryApi } from '@/api/home';
import { getImageUrl, normalizeProductListImages, lazyImgProps } from '@/utils/image';
import { getCategoryIcon } from '@/utils/categoryIcons';
import styles from '@/styles/category/category.module.scss';

function normalizeCategory(item: any): any {
  if (!item) return null;
  return {
    id: item.id ?? item.ID ?? item.categoryId ?? item.CategoryId ?? item.Id ?? '',
    name: item.name ?? item.Name ?? item.categoryName ?? item.CategoryName ?? '',
    icon: item.icon ?? item.Icon ?? item.image ?? item.Image ?? '',
    children: (item.children || item.child || item.subCategories || item.subs || item.list || item.items || []).map(normalizeCategory),
  };
}

function normalizeProduct(item: any): any {
  if (!item) return null;
  return {
    id: item.id ?? item.ID ?? item.productId ?? item.ProductId ?? '',
    name: item.name ?? item.Name ?? item.productName ?? item.ProductName ?? '',
    price: item.price ?? item.Price ?? item.salePrice ?? item.SalePrice ?? 0,
    originalPrice: item.originalPrice ?? item.OriginalPrice ?? item.marketPrice ?? item.MarketPrice ?? 0,
    images: item.images ?? item.Images ?? item.imageList ?? [],
    image: item.image ?? item.Image ?? item.cover ?? item.Cover ?? '',
    sales: item.sales ?? item.Sales ?? item.soldCount ?? item.SoldCount ?? 0,
  };
}

const SubCategoryItem = React.memo(({ 
  subCategory, 
  onClick 
}: { 
  subCategory: any; 
  onClick: (id: string) => void;
}) => {
  const iconSrc = getCategoryIcon(subCategory.name, subCategory.icon);
  return (
    <View 
      key={subCategory.id} 
      className={styles.subCategoryItem}
      onClick={() => onClick(subCategory.id)}
    >
      <View className={styles.subCategoryIcon}>
        <Image 
          src={iconSrc.startsWith('data:') || iconSrc.includes('.svg') ? iconSrc : getImageUrl(iconSrc)} 
          mode="aspectFill" 
          {...lazyImgProps()} 
        />
      </View>
      <Text className={styles.subCategoryName}>{subCategory.name}</Text>
    </View>
  );
});

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
      src={getImageUrl(product.images?.[0] || product.image)} 
      className={styles.productImage} 
      mode="aspectFill" 
      {...lazyImgProps()}
    />
    <View className={styles.productInfo}>
      <Text className={styles.productName}>{product.name}</Text>
      <View className={styles.productPrice}>
        <Text className={styles.priceSymbol}>¥</Text>
        <Text className={styles.price}>{product.price}</Text>
      </View>
    </View>
  </View>
));

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const activeSubCatIdRef = useRef<string>('');
  const initialCategoryIdRef = useRef<string>('');

  const goToProductDetail = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  }, []);

  const loadCategoryTree = async (targetCategoryId?: string) => {
    try {
      const res = await apiGet(categoryApi.categoryTree);
      if (res?.data) {
        const rawData = Array.isArray(res.data) ? res.data : res.data?.list || res.data?.data || [];
        const normalized = rawData.map(normalizeCategory).filter(Boolean);
        setCategories(normalized);
        
        if (normalized.length > 0) {
          let targetIndex = 0;
          if (targetCategoryId) {
            const idx = normalized.findIndex((c: any) => c.id === targetCategoryId);
            if (idx !== -1) {
              targetIndex = idx;
            }
          }
          setActiveCategory(targetIndex);
          loadSubCategories(normalized[targetIndex].id);
        }
      }
    } catch (error) {
      console.error('Failed to load category tree:', error);
      Taro.showToast({ title: '加载分类失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  const loadSubCategories = async (categoryId: string) => {
    if (!categoryId) return;
    
    try {
      const res = await apiGet(categoryApi.categoryOne, { id: categoryId });
      if (res?.data) {
        const rawData = Array.isArray(res.data) ? res.data : res.data?.list || res.data?.data || [];
        const normalized = rawData.map(normalizeCategory).filter(Boolean);
        setSubCategories(normalized);
        
        if (normalized.length > 0) {
          loadProducts(normalized[0].id);
        } else {
          setCategoryProducts([]);
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Failed to load sub categories:', error);
      setSubCategories([]);
      setCategoryProducts([]);
    }
  };

  const loadProducts = async (subCategoryId: string, reset: boolean = true) => {
    if (!subCategoryId) return;
    
    activeSubCatIdRef.current = subCategoryId;
    
    if (reset) {
      setPage(1);
      setCategoryProducts([]);
      setHasMore(true);
    }
    
    try {
      setLoadingMore(!reset);
      const currentPage = reset ? 1 : page;
      const res = await apiGet(categoryApi.categorySecond, { id: subCategoryId, page: currentPage, size: 10 });
      
      if (res?.data) {
        const rawData = Array.isArray(res.data) ? res.data : res.data?.list || res.data?.data || [];
        const normalized = rawData.map(normalizeProduct).filter(Boolean);
        const finalProducts = normalizeProductListImages(normalized);
        
        if (reset) {
          setCategoryProducts(finalProducts);
        } else {
          setCategoryProducts(prev => [...prev, ...finalProducts]);
        }
        
        const total = res.data?.total ?? res.total ?? res.data?.Total ?? 0;
        const loadedCount = reset ? finalProducts.length : categoryProducts.length + finalProducts.length;
        setHasMore(finalProducts.length >= 10 && loadedCount < total);
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      if (reset) {
        setCategoryProducts([]);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCategoryClick = useCallback((index: number) => {
    setActiveCategory(index);
    Taro.removeStorageSync('targetCategoryId');
    initialCategoryIdRef.current = '';
    if (categories[index]) {
      setCategoryProducts([]);
      loadSubCategories(categories[index].id);
    }
  }, [categories]);

  const handleSubCategoryClick = useCallback((subCategoryId: string) => {
    loadProducts(subCategoryId, true);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    const currentCat = categories[activeCategory];
    if (currentCat && subCategories.length > 0) {
      loadProducts(subCategories[0]?.id, false);
    }
  }, [loadingMore, hasMore, categories, activeCategory, subCategories, page]);

  useEffect(() => {
    const targetCategoryId = Taro.getStorageSync('targetCategoryId') || '';
    initialCategoryIdRef.current = targetCategoryId;
    loadCategoryTree(targetCategoryId);
  }, []);

  useDidShow(() => {
    const targetCategoryId = Taro.getStorageSync('targetCategoryId') || '';
    if (targetCategoryId && targetCategoryId !== initialCategoryIdRef.current) {
      initialCategoryIdRef.current = targetCategoryId;
      loadCategoryTree(targetCategoryId);
    }
  });

  if (loading) {
    return (
      <View className={styles.categoryPage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.categoryPage}>
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

      <ScrollView 
        scrollY 
        className={styles.subCategoryContent}
        onScrollToLower={loadMore}
      >
        {subCategories.length > 0 && (
          <View className={styles.subCategoryGrid}>
            {subCategories.map((subCategory: any) => (
              <SubCategoryItem
                key={subCategory.id}
                subCategory={subCategory}
                onClick={handleSubCategoryClick}
              />
            ))}
          </View>
        )}

        {categoryProducts.length > 0 && (
          <>
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
              
              {loadingMore && (
                <View style={{ textAlign: 'center', padding: '20rpx' }}>
                  <Text>加载中...</Text>
                </View>
              )}
              
              {!hasMore && categoryProducts.length > 0 && (
                <View style={{ textAlign: 'center', padding: '20rpx' }}>
                  <Text>已经到底了</Text>
                </View>
              )}
            </View>
          </>
        )}
        
        {categoryProducts.length === 0 && subCategories.length === 0 && (
          <View style={{ padding: '100rpx', textAlign: 'center', color: '#999' }}>
            <Text>暂无商品</Text>
          </View>
        )}

        {categoryProducts.length === 0 && subCategories.length > 0 && (
          <View style={{ padding: '100rpx', textAlign: 'center', color: '#999' }}>
            <Text>请选择二级分类查看商品</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(CategoryPage);