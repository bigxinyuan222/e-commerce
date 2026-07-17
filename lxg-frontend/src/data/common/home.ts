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
    type: 'product',
    targetId: 'product-2'
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

// 秒杀活动 - 动态生成未来的结束时间（当前时间 + 12小时）
const now = new Date();
const endTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
const endTimeStr = endTime.toISOString().replace('T', ' ').slice(0, 19);

export const seckillActivity = {
  id: 'seckill-1',
  name: '限时秒杀',
  startTime: now.toISOString().replace('T', ' ').slice(0, 19),
  endTime: endTimeStr,
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
export const seckillProducts = [
  ...seckillActivity.products.map(p => ({
    ...p,
    id: p.productId,
    soldPercent: Math.round((p.soldCount / p.stock) * 100),
    tags: ['限时秒杀'],
    category: '数码'
  })),
  {
    id: 'product-5',
    productId: 'product-5',
    productName: '抽纸纸巾5层加厚420张',
    image: 'https://picsum.photos/id/24/300/300',
    originalPrice: 2.9,
    seckillPrice: 1.5,
    stock: 1000,
    soldCount: 390,
    soldPercent: 39,
    tags: ['限时秒杀', '7天价保'],
    category: '生活用品'
  },
  {
    id: 'product-6',
    productId: 'product-6',
    productName: '一次性保鲜膜100只',
    image: 'https://picsum.photos/id/28/300/300',
    originalPrice: 3,
    seckillPrice: 2.48,
    soldCount: 440,
    soldPercent: 44,
    tags: ['限时秒杀'],
    category: '生活用品'
  },
  {
    id: 'product-7',
    productId: 'product-7',
    productName: '金纺薰衣草柔顺剂400g',
    image: 'https://picsum.photos/id/42/300/300',
    originalPrice: 2.5,
    seckillPrice: 2.1,
    soldCount: 400,
    soldPercent: 40,
    tags: ['限时秒杀'],
    category: '洗护'
  },
  {
    id: 'product-8',
    productId: 'product-8',
    productName: '壁挂抽取式保鲜膜套',
    image: 'https://picsum.photos/id/48/300/300',
    originalPrice: 5.9,
    seckillPrice: 4.48,
    soldCount: 470,
    soldPercent: 47,
    tags: ['限时秒杀'],
    category: '生活用品'
  },
  {
    id: 'product-9',
    productId: 'product-9',
    productName: '厨邦蒸鱼豉油420ml',
    image: 'https://picsum.photos/id/292/300/300',
    originalPrice: 8.9,
    seckillPrice: 6.9,
    soldCount: 350,
    soldPercent: 35,
    tags: ['限时秒杀'],
    category: '食品'
  },
  {
    id: 'product-10',
    productId: 'product-10',
    productName: '云南白药牙膏180g',
    image: 'https://picsum.photos/id/225/300/300',
    originalPrice: 29.9,
    seckillPrice: 19.9,
    soldCount: 620,
    soldPercent: 62,
    tags: ['限时秒杀'],
    category: '个护'
  },
  {
    id: 'product-11',
    productId: 'product-11',
    productName: '维达湿巾10片装',
    image: 'https://picsum.photos/id/312/300/300',
    originalPrice: 5.9,
    seckillPrice: 3.9,
    soldCount: 580,
    soldPercent: 58,
    tags: ['限时秒杀'],
    category: '生活用品'
  },
  {
    id: 'product-12',
    productId: 'product-12',
    productName: '可口可乐330ml*6罐',
    image: 'https://picsum.photos/id/431/300/300',
    originalPrice: 12.9,
    seckillPrice: 9.9,
    soldCount: 710,
    soldPercent: 71,
    tags: ['限时秒杀'],
    category: '饮料'
  }
];
