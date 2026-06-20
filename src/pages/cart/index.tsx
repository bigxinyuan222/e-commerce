import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import styles from './index.module.scss';

const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    toggleCartItem,
    selectAllCartItems,
    getCartTotal
  } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);
  const { totalAmount, selectedCount } = getCartTotal();
  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  // 去购物
  const goShopping = () => {
    Taro.switchTab({ url: '/pages/home/index' });
  };

  // 去结算
  const goCheckout = () => {
    if (selectedCount === 0) {
      Taro.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }
    Taro.navigateTo({ url: '/pages/checkout/index' });
  };

  // 删除商品
  const handleDelete = (id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          removeFromCart(id);
          Taro.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  };

  // 减少数量
  const decreaseQuantity = (id: string, quantity: number) => {
    if (quantity > 1) {
      updateCartQuantity(id, quantity - 1);
    }
  };

  // 增加数量
  const increaseQuantity = (id: string, quantity: number, stock: number) => {
    if (quantity < stock) {
      updateCartQuantity(id, quantity + 1);
    } else {
      Taro.showToast({ title: '库存不足', icon: 'none' });
    }
  };

  return (
    <View className={styles.cartPage}>
      {/* 购物车头部 */}
      <View className={styles.cartHeader}>
        <Text className={styles.cartTitle}>购物车</Text>
        <Text 
          className={styles.editBtn}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? '完成' : '编辑'}
        </Text>
      </View>

      {/* 购物车列表 */}
      {cartItems.length > 0 ? (
        <ScrollView scrollY className={styles.cartList}>
          {cartItems.map((item) => (
            <View key={item.id} className={styles.cartItem}>
              {/* 选择按钮 */}
              <View 
                className={`${styles.selectBtn} ${item.selected ? styles.selected : ''}`}
                onClick={() => toggleCartItem(item.id)}
              />

              {/* 商品图片 */}
              <Image 
                src={item.image} 
                className={styles.itemImage}
                mode="aspectFill"
                onClick={() => Taro.navigateTo({ url: `/pages/product-detail/index?id=${item.productId}` })}
              />

              {/* 商品信息 */}
              <View className={styles.itemInfo}>
                <Text className={styles.itemName}>{item.productName}</Text>
                <Text className={styles.itemSpecs}>{item.skuName}</Text>
                <View className={styles.itemBottom}>
                  <Text className={styles.itemPrice}>{item.price}</Text>
                  <View className={styles.quantityControl}>
                    <View 
                      className={`${styles.quantityBtn} ${item.quantity <= 1 ? styles.disabled : ''}`}
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                    >
                      -
                    </View>
                    <Text className={styles.quantityNum}>{item.quantity}</Text>
                    <View 
                      className={styles.quantityBtn}
                      onClick={() => increaseQuantity(item.id, item.quantity, item.stock)}
                    >
                      +
                    </View>
                  </View>
                </View>
              </View>

              {/* 删除按钮 */}
              {isEditing && (
                <View 
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(item.id)}
                >
                  ×
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className={styles.emptyCart}>
          <View className={styles.emptyIcon}>
            <Text>🛒</Text>
          </View>
          <Text className={styles.emptyText}>购物车是空的</Text>
          <View className={styles.goShoppingBtn} onClick={goShopping}>
            去逛逛
          </View>
        </View>
      )}

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <View className={styles.bottomBar}>
          {/* 全选 */}
          <View className={styles.selectAll} onClick={() => selectAllCartItems(!allSelected)}>
            <View className={`${styles.selectAllBtn} ${allSelected ? styles.selected : ''}`} />
            <Text className={styles.selectAllText}>全选</Text>
          </View>

          {/* 合计信息 */}
          <View className={styles.totalInfo}>
            <View className={styles.totalAmount}>
              <Text className={styles.amountLabel}>合计:</Text>
              <Text className={styles.amountValue}>{totalAmount}</Text>
            </View>
            <View 
              className={`${styles.checkoutBtn} ${selectedCount === 0 ? styles.disabled : ''}`}
              onClick={goCheckout}
            >
              结算({selectedCount})
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartPage;
