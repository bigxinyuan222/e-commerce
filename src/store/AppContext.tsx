// ============================================
// 全局状态管理（使用React Context）
// ============================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import Taro from '@tarojs/taro';

// 用户信息类型
interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  isLoggedIn: boolean;
}

// 购物车项类型
interface CartItem {
  id: string;
  productId: string;
  productName: string;
  skuId: string;
  skuName: string;
  price: number;
  quantity: number;
  image: string;
  selected: boolean;
  stock: number;
}

// 初始化用户信息
const defaultUserInfo: UserInfo = {
  id: '',
  nickname: '',
  avatar: '',
  phone: '',
  isLoggedIn: false
};

// 初始化购物车
const defaultCart: CartItem[] = [];

// 创建Context
interface AppContextType {
  userInfo: UserInfo;
  setUserInfo: (user: UserInfo) => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addToCart: (item: Omit<CartItem, 'id' | 'selected'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  toggleCartItem: (id: string) => void;
  selectAllCartItems: (selected: boolean) => void;
  clearCart: () => void;
  getCartTotal: () => { totalAmount: number; totalCount: number; selectedCount: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider组件
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo>(defaultUserInfo);
  const [cartItems, setCartItemsState] = useState<CartItem[]>(defaultCart);

  // 从本地存储加载数据
  useEffect(() => {
    const savedUserInfo = Taro.getStorageSync('userInfo');
    if (savedUserInfo) {
      setUserInfoState(savedUserInfo);
    }

    const savedCart = Taro.getStorageSync('cartItems');
    if (savedCart) {
      setCartItemsState(savedCart);
    }
  }, []);

  // 保存用户信息到本地存储
  const setUserInfo = (user: UserInfo) => {
    setUserInfoState(user);
    Taro.setStorageSync('userInfo', user);
  };

  // 保存购物车到本地存储
  const setCartItems = (items: CartItem[]) => {
    setCartItemsState(items);
    Taro.setStorageSync('cartItems', items);
  };

  // 添加到购物车
  const addToCart = (item: Omit<CartItem, 'id' | 'selected'>) => {
    const existingItem = cartItems.find(
      cartItem => cartItem.productId === item.productId && cartItem.skuId === item.skuId
    );

    if (existingItem) {
      // 如果已存在，增加数量
      const updatedItems = cartItems.map(cartItem =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      setCartItems(updatedItems);
    } else {
      // 如果不存在，添加新项
      const newItem: CartItem = {
        ...item,
        id: `cart-${Date.now()}`,
        selected: true
      };
      setCartItems([...cartItems, newItem]);
    }

    Taro.showToast({ title: '已加入购物车', icon: 'success' });
  };

  // 从购物车移除
  const removeFromCart = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  // 更新购物车数量
  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  // 切换购物车项选中状态
  const toggleCartItem = (id: string) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedItems);
  };

  // 全选/取消全选
  const selectAllCartItems = (selected: boolean) => {
    const updatedItems = cartItems.map(item => ({ ...item, selected }));
    setCartItems(updatedItems);
  };

  // 清空购物车
  const clearCart = () => {
    setCartItems([]);
  };

  // 计算购物车总计
  const getCartTotal = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    return { totalAmount, totalCount, selectedCount };
  };

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleCartItem,
        selectAllCartItems,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 使用Context的Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default AppContext;
