// 评价数据
export interface Evaluation {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  images: string[];
  isAnonymity: boolean;
  createTime: string;
  status: 'show' | 'hidden';
  likeCount: number;
  isLike: boolean;
  specs: string;
}

// 获取商品评价
export const getEvaluationsByProduct = (productId: string): Evaluation[] => {
  const evaluations: Record<string, Evaluation[]> = {
    'product-1': [
      {
        id: 'eval-001',
        productId: 'product-1',
        userId: 'user-001',
        userName: '张***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '手机收到了，非常满意！屏幕显示清晰，运行流畅，拍照效果也很棒。物流很快，第二天就到了，好评！',
        images: [
          'https://picsum.photos/id/1/400/400',
          'https://picsum.photos/id/2/400/400',
        ],
        isAnonymity: false,
        createTime: '2024-01-15 10:30:00',
        status: 'show',
        likeCount: 128,
        isLike: false,
        specs: '颜色: 钛金属原色; 版本: 256GB'
      },
      {
        id: 'eval-002',
        productId: 'product-1',
        userId: 'user-002',
        userName: '李***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '性价比很高，推荐购买！',
        images: [],
        isAnonymity: false,
        createTime: '2024-01-14 15:20:00',
        status: 'show',
        likeCount: 56,
        isLike: false,
        specs: '颜色: 钛金属蓝; 版本: 512GB'
      },
      {
        id: 'eval-003',
        productId: 'product-1',
        userId: 'user-003',
        userName: '王***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '入手这款手机之后，真的彻底被圈粉了！首先夸夸它的屏幕，显示效果非常细腻，色彩鲜艳。性能也很强劲，玩游戏非常流畅。拍照效果也很棒，特别是夜景模式，拍出来的照片很清晰。强烈推荐！',
        images: [
          'https://picsum.photos/id/3/400/400',
          'https://picsum.photos/id/4/400/400',
          'https://picsum.photos/id/6/400/400'
        ],
        isAnonymity: false,
        createTime: '2024-01-13 09:15:00',
        status: 'show',
        likeCount: 234,
        isLike: false,
        specs: '颜色: 钛金属原色; 版本: 512GB'
      },
      {
        id: 'eval-004',
        productId: 'product-1',
        userId: 'user-004',
        userName: '赵***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 4,
        content: '手机整体不错，就是价格有点贵。',
        images: [],
        isAnonymity: false,
        createTime: '2024-01-12 14:45:00',
        status: 'show',
        likeCount: 12,
        isLike: false,
        specs: '颜色: 钛金属蓝; 版本: 256GB'
      }
    ],
    'product-2': [
      {
        id: 'eval-005',
        productId: 'product-2',
        userId: 'user-005',
        userName: '陈***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '支持国产！华为手机越来越好了，系统流畅，拍照效果很棒。',
        images: ['https://picsum.photos/id/6/400/400'],
        isAnonymity: false,
        createTime: '2024-01-11 11:30:00',
        status: 'show',
        likeCount: 89,
        isLike: false,
        specs: '颜色: 雅川青; 内存: 12GB+512GB'
      }
    ],
    'product-6': [
      {
        id: 'eval-006',
        productId: 'product-6',
        userId: 'user-006',
        userName: '刘***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '神仙水名不虚传，用了一个月皮肤明显变好了，细腻有光泽。',
        images: ['https://picsum.photos/id/220/400/400'],
        isAnonymity: false,
        createTime: '2024-01-10 16:20:00',
        status: 'show',
        likeCount: 156,
        isLike: false,
        specs: '容量: 230ml'
      },
      {
        id: 'eval-007',
        productId: 'product-6',
        userId: 'user-007',
        userName: '孙***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '一直在用这款神仙水，效果真的很好，皮肤越来越稳定了。',
        images: ['https://picsum.photos/id/221/400/400', 'https://picsum.photos/id/222/400/400'],
        isAnonymity: false,
        createTime: '2024-01-09 14:30:00',
        status: 'show',
        likeCount: 89,
        isLike: false,
        specs: '容量: 230ml'
      },
      {
        id: 'eval-008',
        productId: 'product-6',
        userId: 'user-008',
        userName: '周***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '价格虽然贵了点，但是一分钱一分货，用了之后皮肤状态改善很多。',
        images: [],
        isAnonymity: false,
        createTime: '2024-01-08 11:15:00',
        status: 'show',
        likeCount: 67,
        isLike: false,
        specs: '容量: 230ml'
      },
      {
        id: 'eval-009',
        productId: 'product-6',
        userId: 'user-009',
        userName: '吴***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 4,
        content: '效果还可以，就是瓶口设计不太好，容易倒多了。',
        images: [],
        isAnonymity: false,
        createTime: '2024-01-07 16:45:00',
        status: 'show',
        likeCount: 34,
        isLike: false,
        specs: '容量: 230ml'
      },
      {
        id: 'eval-010',
        productId: 'product-6',
        userId: 'user-010',
        userName: '郑***',
        userAvatar: 'https://picsum.photos/id/237/100/100',
        rating: 5,
        content: '回购无数瓶了，真的离不开它！',
        images: ['https://picsum.photos/id/223/400/400'],
        isAnonymity: false,
        createTime: '2024-01-06 09:20:00',
        status: 'show',
        likeCount: 123,
        isLike: false,
        specs: '容量: 230ml'
      }
    ]
  };

  return evaluations[productId] || [];
};

// 获取评价统计
export const getEvaluationStats = (productId: string) => {
  const evaluations = getEvaluationsByProduct(productId);
  if (evaluations.length === 0) {
    return {
      total: 0,
      averageRating: 5.0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    };
  }

  const total = evaluations.length;
  const sum = evaluations.reduce((acc, e) => acc + e.rating, 0);
  const averageRating = Number((sum / total).toFixed(1));

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  evaluations.forEach(e => {
    distribution[e.rating as keyof typeof distribution]++;
  });

  return {
    total,
    averageRating,
    distribution
  };
};
