import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { fetchCartList, updateCartItem, deleteCartItem, transformCartItem } from '@/api/cart';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/cart/cart.module.scss';

// 购物车商品项组件
const CartItemComponent = React.memo(({ 
  item, 
  isEditing, 
  onSelect, 
  onDecrease, 
  onIncrease, 
  onDelete,
  onProductClick 
}: { 
  item: any; 
  isEditing: boolean;
  onSelect: (id: string) => void;
  onDecrease: (id: string, quantity: number) => void;
  onIncrease: (id: string, quantity: number, stock: number) => void;
  onDelete: (id: string) => void;
  onProductClick: (productId: string) => void;
}) => (
  <View key={item.id} className={styles.cartItem}>
    {/* 选择按钮 */}
    <View 
      className={`${styles.selectBtn} ${item.selected ? styles.selected : ''}`}
      onClick={() => onSelect(item.id)}
    />

    {/* 商品图片 */}
    <Image 
      src={getImageUrl(item.image)} 
      className={styles.itemImage}
      mode="aspectFill"
      {...lazyImgProps()}
      onClick={() => onProductClick(item.productId)}
    />

    {/* 商品信息 */}
    <View className={styles.itemInfo}>
      <Text className={styles.itemName}>{item.productName}</Text>
      <Text className={styles.itemSpecs}>{item.skuName}</Text>
      <View className={styles.itemBottom}>
        <View className={styles.priceWrap}>
          <Text className={styles.itemPrice}>{item.seckillPrice ?? item.price}</Text>
          {item.isSeckill && (
            <Text className={styles.seckillTag}>秒杀价</Text>
          )}
        </View>
        <View className={styles.quantityControl}>
          <View 
            className={`${styles.quantityBtn} ${item.quantity <= 1 ? styles.disabled : ''}`}
            onClick={() => onDecrease(item.id, item.quantity)}
          >
            -
          </View>
          <Text className={styles.quantityNum}>{item.quantity}</Text>
          <View 
            className={styles.quantityBtn}
            onClick={() => onIncrease(item.id, item.quantity, item.stock)}
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
        onClick={() => onDelete(item.id)}
      >
        ×
      </View>
    )}
  </View>
));



const CartPage: React.FC = () => {
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartQuantity,
    toggleCartItem,
    selectAllCartItems,
    getCartTotal
  } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchCartList();
      if (res?.data) {
        const list = Array.isArray(res.data) ? res.data : [];
        const normalized = list.map((item: any) => {
          const transformed = transformCartItem(item);
          return {
            ...transformed,
            selected: transformed.selected ?? true,
            image: getImageUrl(transformed.image),
          };
        });
        setCartItems(normalized);
      }
    } catch (error) {
      console.error('加载购物车失败:', error);
    } finally {
      setLoading(false);
    }
  }, [setCartItems]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const cartTotal = useMemo(() => getCartTotal(), [getCartTotal, cartItems]);
  const { totalAmount, selectedCount } = cartTotal;
  
  const allSelected = useMemo(() => {
    return cartItems.length > 0 && cartItems.every(item => item.selected);
  }, [cartItems]);

  const goCheckout = useCallback(() => {
    if (selectedCount === 0) {
      Taro.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }
    Taro.navigateTo({ url: '/pages/cart/checkout/index' });
  }, [selectedCount]);

  const handleDelete = useCallback((id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除该商品吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await deleteCartItem(id);
            removeFromCart(id);
            Taro.showToast({ title: '已删除', icon: 'success' });
          } catch (error: any) {
            Taro.showToast({ title: error?.message || '删除失败', icon: 'none' });
          }
        }
      }
    });
  }, [removeFromCart]);

  const decreaseQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    try {
      await updateCartItem(id, { quantity: newQuantity });
      updateCartQuantity(id, newQuantity);
    } catch (error: any) {
      Taro.showToast({ title: error?.message || '更新失败', icon: 'none' });
    }
  }, [updateCartQuantity]);

  const increaseQuantity = useCallback(async (id: string, quantity: number, stock: number) => {
    if (quantity >= stock) {
      Taro.showToast({ title: '库存不足', icon: 'none' });
      return;
    }
    const newQuantity = quantity + 1;
    try {
      await updateCartItem(id, { quantity: newQuantity });
      updateCartQuantity(id, newQuantity);
    } catch (error: any) {
      Taro.showToast({ title: error?.message || '更新失败', icon: 'none' });
    }
  }, [updateCartQuantity]);

  const handleSelectAll = useCallback(() => {
    selectAllCartItems(!allSelected);
  }, [selectAllCartItems, allSelected]);

  const handleProductClick = useCallback((productId: string) => {
    Taro.navigateTo({ url: `/pages/home/detail/index?id=${productId}` });
  }, []);

  const handleToggleItem = useCallback((id: string) => {
    toggleCartItem(id);
  }, [toggleCartItem]);

  return (
    <View className={styles.cartPage}>
      {loading ? (
        <View className={styles.emptyState}>
          <Text className={styles.emptyText}>加载中...</Text>
        </View>
      ) : (
        <>
          <View className={styles.cartHeader}>
            <Text className={styles.cartTitle}>购物车</Text>
            <Text 
              className={styles.editBtn}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '完成' : '编辑'}
            </Text>
          </View>

          {cartItems.length === 0 ? (
            <View className={styles.emptyState}>
              <Text className={styles.emptyText}>购物车是空的</Text>
            </View>
          ) : (
            <>
              <ScrollView 
                scrollY 
                className={styles.cartList}
                enhanced
                showScrollbar={false}
              >
                {cartItems.map((item) => (
                  <CartItemComponent 
                    key={item.id}
                    item={item}
                    isEditing={isEditing}
                    onSelect={handleToggleItem}
                    onDecrease={decreaseQuantity}
                    onIncrease={increaseQuantity}
                    onDelete={handleDelete}
                    onProductClick={handleProductClick}
                  />
                ))}
              </ScrollView>

              <View className={styles.bottomBar}>
                <View className={styles.selectAll} onClick={handleSelectAll}>
                  <View className={`${styles.selectAllBtn} ${allSelected ? styles.selected : ''}`} />
                  <Text className={styles.selectAllText}>全选</Text>
                </View>

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
            </>
          )}
        </>
      )}
    </View>
  );
};

export default React.memo(CartPage);
