// 优惠券数据
export interface Coupon {
  id: string;
  name: string;
  type: 'cash' | 'discount';
  value: number;
  minAmount: number;
  scope: 'all' | 'category' | 'product';
  scopeText: string;
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
    name: '满减券',
    type: 'cash',
    value: 50,
    minAmount: 300,
    scope: 'all',
    scopeText: '全场通用',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 5000,
    remainCount: 2345,
    status: 'available'
  },
  {
    id: 'coupon-003',
    name: '95折券',
    type: 'discount',
    value: 95,
    minAmount: 200,
    scope: 'category',
    scopeText: '仅限电脑数码',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 3000,
    remainCount: 1234,
    status: 'available'
  },
  {
    id: 'coupon-004',
    name: '手机专享券',
    type: 'cash',
    value: 100,
    minAmount: 1000,
    scope: 'product',
    scopeText: '仅限指定手机',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 2000,
    remainCount: 890,
    status: 'available'
  },
  {
    id: 'coupon-005',
    name: '家电清洗券',
    type: 'cash',
    value: 30,
    minAmount: 150,
    scope: 'category',
    scopeText: '仅限家电品类',
    startTime: '2024-06-01',
    endTime: '2024-06-30',
    totalCount: 1000,
    remainCount: 456,
    status: 'available'
  }
];

// 获取我的可用优惠券
export const getMyAvailableCoupons = (): Coupon[] => {
  return myCoupons.filter(c => c.status === 'available');
};
