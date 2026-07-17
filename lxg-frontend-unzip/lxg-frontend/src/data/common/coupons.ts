// 优惠券数据
export interface Coupon {
  id: string;
  name: string;
  type: 'cash' | 'discount';
  value: number;
  minAmount: number;
  scope: 'all' | 'category' | 'product';
  scopeText: string;
  categoryId?: string;
  productId?: string;
  startTime: string;
  endTime: string;
  totalCount: number;
  remainCount: number;
  status: 'available' | 'used' | 'expired';
}

// 我的优惠券
export const myCoupons: Coupon[] = [
  {
    id: 'my-coupon-001',
    name: '新人专享券',
    type: 'cash',
    value: 20,
    minAmount: 100,
    scope: 'all',
    scopeText: '全场通用',
    startTime: '2024-01-01',
    endTime: '2024-12-31',
    totalCount: 1,
    remainCount: 1,
    status: 'available'
  },
  {
    id: 'my-coupon-002',
    name: '手机专享券',
    type: 'cash',
    value: 50,
    minAmount: 500,
    scope: 'category',
    scopeText: '仅限手机品类',
    startTime: '2024-01-01',
    endTime: '2024-06-30',
    totalCount: 1,
    remainCount: 1,
    status: 'available'
  }
];

// 可领取优惠券
export const availableCoupons: Coupon[] = [
  {
    id: 'coupon-001',
    name: '新人专享券',
    type: 'cash',
    value: 20,
    minAmount: 100,
    scope: 'all',
    scopeText: '全场通用',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 10000,
    remainCount: 5678,
    status: 'available'
  },
  {
    id: 'coupon-002',
    name: '数码品类满300减50',
    type: 'cash',
    value: 50,
    minAmount: 300,
    scope: 'category',
    scopeText: '仅限数码品类',
    categoryId: 'digital',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 5000,
    remainCount: 2345,
    status: 'available'
  },
  {
    id: 'coupon-003',
    name: '美妆护肤满200减30',
    type: 'cash',
    value: 30,
    minAmount: 200,
    scope: 'category',
    scopeText: '仅限美妆护肤',
    categoryId: 'beauty',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 3000,
    remainCount: 1234,
    status: 'available'
  },
  {
    id: 'coupon-004',
    name: '服饰鞋包满199减25',
    type: 'cash',
    value: 25,
    minAmount: 199,
    scope: 'category',
    scopeText: '仅限服饰鞋包',
    categoryId: 'clothing',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 4000,
    remainCount: 3120,
    status: 'available'
  },
  {
    id: 'coupon-005',
    name: '优惠12无门槛',
    type: 'cash',
    value: 12,
    minAmount: 0,
    scope: 'product',
    scopeText: '仅限此商品',
    productId: 'product-1',
    startTime: '2024-06-01',
    endTime: '2024-12-31',
    totalCount: 1000,
    remainCount: 456,
    status: 'available'
  },
  {
    id: 'coupon-005b',
    name: '优惠8无门槛',
    type: 'cash',
    value: 8,
    minAmount: 0,
    scope: 'product',
    scopeText: '仅限此商品',
    productId: 'product-1',
    startTime: '2024-06-01',
    endTime: '2024-12-31',
    totalCount: 1000,
    remainCount: 321,
    status: 'available'
  },
  {
    id: 'coupon-006',
    name: '优惠15无门槛',
    type: 'cash',
    value: 15,
    minAmount: 0,
    scope: 'product',
    scopeText: '仅限此商品',
    productId: 'product-2',
    startTime: '2024-06-01',
    endTime: '2024-12-31',
    totalCount: 2000,
    remainCount: 890,
    status: 'available'
  },
  {
    id: 'coupon-006b',
    name: '优惠5无门槛',
    type: 'cash',
    value: 5,
    minAmount: 0,
    scope: 'product',
    scopeText: '仅限此商品',
    productId: 'product-2',
    startTime: '2024-06-01',
    endTime: '2024-12-31',
    totalCount: 2000,
    remainCount: 654,
    status: 'available'
  },
  {
    id: 'coupon-007',
    name: '优惠10无门槛',
    type: 'cash',
    value: 10,
    minAmount: 0,
    scope: 'product',
    scopeText: '仅限此商品',
    productId: 'product-3',
    startTime: '2024-06-01',
    endTime: '2024-12-31',
    totalCount: 1500,
    remainCount: 678,
    status: 'available'
  },
  {
    id: 'coupon-007b',
    name: '优惠6无门槛',
    type: 'cash',
    value: 6,
    minAmount: 0,
    scope: 'product',
    scopeText: '仅限此商品',
    productId: 'product-3',
    startTime: '2024-06-01',
    endTime: '2024-12-31',
    totalCount: 1500,
    remainCount: 234,
    status: 'available'
  },
  {
    id: 'coupon-008',
    name: '家居用品满100减15',
    type: 'cash',
    value: 15,
    minAmount: 100,
    scope: 'category',
    scopeText: '仅限家居用品',
    categoryId: 'home',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 5000,
    remainCount: 4321,
    status: 'available'
  }
];

// 获取我的可用优惠券
export const getMyAvailableCoupons = (): Coupon[] => {
  return myCoupons.filter(c => c.status === 'available');
};
