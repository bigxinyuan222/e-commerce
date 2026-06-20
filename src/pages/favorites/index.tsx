import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { products } from '@/data/products';
import styles from './index.module.scss';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '我的收藏' });
    
    const savedFavorites = Taro.getStorageSync('favorites') || [];
    setFavorites(savedFavorites);
    
    const filteredProducts = products.filter(p => savedFavorites.includes(p.id));
    setFavoriteProducts(filteredProducts);
  }, []);

  const handleRemove = (productId: string) => {
    Taro.showModal({
      title: '取消收藏',
      content: '确定要取消收藏这件商品吗？',
      success: (res) => {
        if (res.confirm) {
          const newFavorites = favorites.filter(id => id !== productId);
          setFavorites(newFavorites);
          Taro.setStorageSync('favorites', newFavorites);
          setFavoriteProducts(favoriteProducts.filter(p => p.id !== productId));
          Taro.showToast({ title: '已取消收藏', icon: 'none' });
        }
      }
    });
  };

  const goToDetail = (productId: string) => {
    Taro.navigateTo({ url: `/pages/product-detail/index?id=${productId}` });
  };

  return (
    <View className={styles.favoritesPage}>
      {favoriteProducts.length > 0 ? (
        <ScrollView scrollY>
          <View className={styles.productList}>
            {favoriteProducts.map((product) => (
              <View 
                key={product.id} 
                className={styles.productItem}
                onClick={() => goToDetail(product.id)}
              >
                <Image 
                  src={product.images[0]} 
                  className={styles.productImage} 
                  mode="aspectFill" 
                />
                <View className={styles.productInfo}>
                  <Text className={styles.productName}>{product.name}</Text>
                  <Text className={styles.productDesc}>{product.desc}</Text>
                  <View className={styles.productBottom}>
                    <Text className={styles.productPrice}>
                      ¥{product.price}
                    </Text>
                    <View className={styles.removeBtn} onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product.id);
                    }}>
                      <Text>取消收藏</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View className={styles.bottomSpace} />
        </ScrollView>
      ) : (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>❤️</Text>
          <Text className={styles.emptyTitle}>暂无收藏商品</Text>
          <Text className={styles.emptyDesc}>去看看心仪的商品吧</Text>
          <View className={styles.goShoppingBtn} onClick={() => Taro.switchTab({ url: '/pages/home/index' })}>
            去逛逛
          </View>
        </View>
      )}
    </View>
  );
};

export default FavoritesPage;