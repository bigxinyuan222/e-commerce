// ============================================
// 轮播图数据
// ============================================

export const banners = [
  {
    id: '1',
    image: 'https://picsum.photos/id/292/750/400',
    type: 'seckill',
    targetId: 'seckill-1'
  },
  {
    id: '2',
    image: 'https://picsum.photos/id/326/750/400',
    type: 'groupbuy',
    targetId: 'groupbuy-1'
  },
  {
    id: '3',
    image: 'https://picsum.photos/id/431/750/400',
    type: 'product',
    targetId: 'product-1'
  },
  {
    id: '4',
    image: 'https://picsum.photos/id/580/750/400',
    type: 'category',
    targetId: 'category-1'
  },
  {
    id: '5',
    image: 'https://picsum.photos/id/625/750/400',
    type: 'url',
    url: '/pages/seckill/index'
  }
];

// 分类数据
export const categories = [
  {
    id: '1',
    name: '手机数码',
    icon: 'https://picsum.photos/id/1/100/100',
    children: [
      { id: '1-1', name: '手机', icon: '' },
      { id: '1-2', name: '平板', icon: '' },
      { id: '1-3', name: '耳机', icon: '' },
      { id: '1-4', name: '充电宝', icon: '' }
    ]
  },
  {
    id: '2',
    name: '电脑办公',
    icon: 'https://picsum.photos/id/2/100/100',
    children: [
      { id: '2-1', name: '笔记本', icon: '' },
      { id: '2-2', name: '台式机', icon: '' },
      { id: '2-3', name: '打印机', icon: '' },
      { id: '2-4', name: '键鼠', icon: '' }
    ]
  },
  {
    id: '3',
    name: '服饰鞋包',
    icon: 'https://picsum.photos/id/103/100/100',
    children: [
      { id: '3-1', name: '男装', icon: '' },
      { id: '3-2', name: '女装', icon: '' },
      { id: '3-3', name: '鞋', icon: '' },
      { id: '3-4', name: '箱包', icon: '' }
    ]
  },
  {
    id: '4',
    name: '家用电器',
    icon: 'https://picsum.photos/id/225/100/100',
    children: [
      { id: '4-1', name: '冰箱', icon: '' },
      { id: '4-2', name: '洗衣机', icon: '' },
      { id: '4-3', name: '空调', icon: '' },
      { id: '4-4', name: '厨房电器', icon: '' }
    ]
  },
  {
    id: '5',
    name: '食品生鲜',
    icon: 'https://picsum.photos/id/312/100/100',
    children: [
      { id: '5-1', name: '水果', icon: '' },
      { id: '5-2', name: '肉类', icon: '' },
      { id: '5-3', name: '零食', icon: '' },
      { id: '5-4', name: '饮料', icon: '' }
    ]
  },
  {
    id: '6',
    name: '美妆护肤',
    icon: 'https://picsum.photos/id/250/100/100',
    children: [
      { id: '6-1', name: '护肤', icon: '' },
      { id: '6-2', name: '彩妆', icon: '' },
      { id: '6-3', name: '香水', icon: '' },
      { id: '6-4', name: '个护', icon: '' }
    ]
  },
  {
    id: '7',
    name: '母婴用品',
    icon: 'https://picsum.photos/id/64/100/100',
    children: [
      { id: '7-1', name: '奶粉', icon: '' },
      { id: '7-2', name: '纸尿裤', icon: '' },
      { id: '7-3', name: '童装', icon: '' },
      { id: '7-4', name: '玩具', icon: '' }
    ]
  },
  {
    id: '8',
    name: '家居家纺',
    icon: 'https://picsum.photos/id/582/100/100',
    children: [
      { id: '8-1', name: '家具', icon: '' },
      { id: '8-2', name: '家纺', icon: '' },
      { id: '8-3', name: '厨具', icon: '' },
      { id: '8-4', name: '收纳', icon: '' }
    ]
  }
];

// 秒杀活动
export const seckillActivity = {
  id: 'seckill-1',
  name: '限时秒杀',
  startTime: '2024-01-15 10:00:00',
  endTime: '2024-01-15 22:00:00',
  status: 'active' as const,
  products: [
    {
      id: 'sk-1',
      productId: 'product-1',
      productName: 'iPhone 15 Pro Max 256GB',
      image: 'https://picsum.photos/id/1/300/300',
      originalPrice: 9999,
      seckillPrice: 7999,
      stock: 50,
      soldCount: 23,
      limitCount: 1
    },
    {
      id: 'sk-2',
      productId: 'product-2',
      productName: '华为 Mate 60 Pro',
      image: 'https://picsum.photos/id/2/300/300',
      originalPrice: 6999,
      seckillPrice: 5499,
      stock: 100,
      soldCount: 67,
      limitCount: 2
    },
    {
      id: 'sk-3',
      productId: 'product-3',
      productName: 'AirPods Pro 2代',
      image: 'https://picsum.photos/id/3/300/300',
      originalPrice: 1899,
      seckillPrice: 1399,
      stock: 200,
      soldCount: 156,
      limitCount: 3
    },
    {
      id: 'sk-4',
      productId: 'product-4',
      productName: '小米手环 8 Pro',
      image: 'https://picsum.photos/id/8/300/300',
      originalPrice: 399,
      seckillPrice: 299,
      stock: 500,
      soldCount: 234,
      limitCount: 5
    }
  ]
};

// 拼团活动
export const groupBuyActivities = [
  {
    id: 'gb-1',
    productId: 'product-5',
    productName: '戴森吹风机 HD15',
    image: 'https://picsum.photos/id/119/300/300',
    price: 2999,
    originalPrice: 3299,
    groupPrice: 2699,
    groupSize: 3,
    joinedCount: 2,
    remainCount: 1,
    endTime: '2024-01-16 18:00:00',
    status: 'ongoing' as const
  },
  {
    id: 'gb-2',
    productId: 'product-6',
    productName: 'SK-II神仙水 230ml',
    image: 'https://picsum.photos/id/220/300/300',
    price: 1540,
    originalPrice: 1790,
    groupPrice: 1299,
    groupSize: 5,
    joinedCount: 3,
    remainCount: 2,
    endTime: '2024-01-16 20:00:00',
    status: 'ongoing' as const
  },
  {
    id: 'gb-3',
    productId: 'product-7',
    productName: '飞利浦电动牙刷 HX9911',
    image: 'https://picsum.photos/id/225/300/300',
    price: 1299,
    originalPrice: 1599,
    groupPrice: 999,
    groupSize: 4,
    joinedCount: 1,
    remainCount: 3,
    endTime: '2024-01-17 12:00:00',
    status: 'ongoing' as const
  }
];

// 热门搜索关键词
export const hotSearchKeywords = [
  'iPhone 15',
  '华为手机',
  '蓝牙耳机',
  '笔记本电脑',
  '智能手表',
  '充电宝',
  '空调',
  '洗衣机'
];

// 搜索商品
export const searchProducts = (keyword: string) => {
  const allProducts = [
    {
      id: 'product-1',
      name: 'iPhone 15 Pro Max 256GB 钛金属设计',
      price: 9999,
      images: ['https://picsum.photos/id/1/750/750']
    },
    {
      id: 'product-2',
      name: '华为 Mate 60 Pro 12GB+512GB',
      price: 6999,
      images: ['https://picsum.photos/id/2/750/750']
    },
    {
      id: 'product-3',
      name: 'AirPods Pro (第二代)',
      price: 1899,
      images: ['https://picsum.photos/id/3/750/750']
    },
    {
      id: 'product-4',
      name: '小米手环8 Pro',
      price: 399,
      images: ['https://picsum.photos/id/8/750/750']
    }
  ];

  return allProducts.filter(product => 
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

// 秒杀商品列表（用于秒杀页面）
export const seckillProducts = seckillActivity.products.map(p => ({
  ...p,
  id: p.productId,
  soldPercent: Math.round((p.soldCount / p.stock) * 100)
}));
