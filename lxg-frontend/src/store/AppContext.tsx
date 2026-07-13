// ============================================
// 全局状态管理（使用React Context）
// ============================================

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import Taro from '@tarojs/taro';
import { Store } from '@/data/common/stores';

// 用户信息类型
interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  accountName: string;
  gender: string;
  birthday: string;
  registerDate: string;
  email: string;
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
  isSeckill?: boolean;
}

// 初始化用户信息
const defaultUserInfo: UserInfo = {
  id: '',
  nickname: '',
  avatar: '',
  phone: '',
  accountName: '',
  gender: '保密',
  birthday: '请填写您的生日',
  registerDate: '',
  email: '',
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
  currentStore: Store | null;
  setCurrentStore: (store: Store) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider组件
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo>(defaultUserInfo);
  const [cartItems, setCartItemsState] = useState<CartItem[]>(defaultCart);
  const [currentStore, setCurrentStoreState] = useState<Store | null>(null);

  // 从本地存储加载数据
  useEffect(() => {
    try {
      const savedUserInfo = Taro.getStorageSync('userInfo');
      if (savedUserInfo) {
        setUserInfoState(savedUserInfo);
      }

      const savedCart = Taro.getStorageSync('cartItems');
      if (savedCart) {
        setCartItemsState(savedCart);
      }

      const savedStore = Taro.getStorageSync('currentStore');
      if (savedStore) {
        setCurrentStoreState(savedStore);
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    }
  }, []);

  // 保存用户信息到本地存储
  const setUserInfo = useCallback((user: UserInfo) => {
    setUserInfoState(user);
    try {
      Taro.setStorageSync('userInfo', user);
    } catch (error) {
      console.error('Failed to save userInfo:', error);
    }
  }, []);

  // 保存购物车到本地存储
  const setCartItems = useCallback((items: CartItem[]) => {
    setCartItemsState(items);
    try {
      Taro.setStorageSync('cartItems', items);
    } catch (error) {
      console.error('Failed to save cartItems:', error);
    }
  }, []);

  // 添加到购物车
  const addToCart = useCallback((item: Omit<CartItem, 'id' | 'selected'>) => {
    setCartItemsState((prevItems) => {
      const existingItem = prevItems.find(
        cartItem => cartItem.productId === item.productId && cartItem.skuId === item.skuId
      );

      let updatedItems: CartItem[];
      if (existingItem) {
        // 如果已存在，增加数量
        updatedItems = prevItems.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // 如果不存在，添加新项
        const newItem: CartItem = {
          ...item,
          id: `cart-${Date.now()}`,
          selected: true
        };
        updatedItems = [...prevItems, newItem];
      }

      // 保存到本地存储
      try {
        Taro.setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }

      return updatedItems;
    });

    Taro.showToast({ title: '已加入购物车', icon: 'success' });
  }, []);

  // 从购物车移除
  const removeFromCart = useCallback((id: string) => {
    setCartItemsState((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      try {
        Taro.setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, []);

  // 更新购物车数量
  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItemsState((prevItems) => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      try {
        Taro.setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, [removeFromCart]);

  // 切换购物车项选中状态
  const toggleCartItem = useCallback((id: string) => {
    setCartItemsState((prevItems) => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );
      try {
        Taro.setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, []);

  // 全选/取消全选
  const selectAllCartItems = useCallback((selected: boolean) => {
    setCartItemsState((prevItems) => {
      const updatedItems = prevItems.map(item => ({ ...item, selected }));
      try {
        Taro.setStorageSync('cartItems', updatedItems);
      } catch (error) {
        console.error('Failed to save cartItems:', error);
      }
      return updatedItems;
    });
  }, []);

  // 清空购物车
  const clearCart = useCallback(() => {
    setCartItemsState([]);
    try {
      Taro.setStorageSync('cartItems', []);
    } catch (error) {
      console.error('Failed to clear cartItems:', error);
    }
  }, []);

  // 使用 useMemo 缓存购物车总计计算结果
  const cartTotal = useMemo(() => {
    const selectedItems = cartItems.filter(item => item.selected);
    const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    return { totalAmount, totalCount, selectedCount };
  }, [cartItems]);

  // 使用 useCallback 缓存 getCartTotal 函数
  const getCartTotal = useCallback(() => {
    return cartTotal;
  }, [cartTotal]);

  // 设置当前门店
  const setCurrentStore = useCallback((store: Store) => {
    setCurrentStoreState(store);
    try {
      Taro.setStorageSync('currentStore', store);
    } catch (error) {
      console.error('Failed to save currentStore:', error);
    }
  }, []);

  // 使用 useMemo 缓存 context value，避免每次渲染都创建新对象
  const contextValue = useMemo(() => ({
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
    getCartTotal,
    currentStore,
    setCurrentStore
  }), [
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
    getCartTotal,
    currentStore,
    setCurrentStore
  ]);

  return (
    <AppContext.Provider value={contextValue}>
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