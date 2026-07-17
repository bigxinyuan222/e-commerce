export interface Comment {
  id: string;
  evaluationId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createTime: string;
  likeCount: number;
  isLike: boolean;
}

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
  comments: Comment[];
}

const generateDefaultEvaluations = (productId: string): Evaluation[] => {
  const avatars = ['https://picsum.photos/id/237/100/100', 'https://picsum.photos/id/1/100/100', 'https://picsum.photos/id/2/100/100', 'https://picsum.photos/id/3/100/100'];
  const contents = [
    '商品收到了，非常满意！质量很好，物流也快，推荐购买！',
    '买过好几次了，品质一直很稳定，值得信赖。',
    '性价比很高，比实体店便宜很多，质量一样好。',
    '包装精美，送人很有面子。',
    '使用体验很好，超出预期！',
    '客服态度很好，有问必答。',
    '发货速度快，第二天就到了。',
    '质量很好，和描述的一样。',
  ];

  return [
    {
      id: `eval-${productId}-1`,
      productId,
      userId: 'user-default-1',
      userName: '张***',
      userAvatar: avatars[0],
      rating: 5,
      content: contents[Math.floor(Math.random() * contents.length)],
      images: [],
      isAnonymity: false,
      createTime: '2024-01-15 10:30:00',
      status: 'show',
      likeCount: Math.floor(Math.random() * 100) + 10,
      isLike: false,
      specs: '默认规格',
      comments: [
        {
          id: `comment-${productId}-1-1`,
          evaluationId: `eval-${productId}-1`,
          userId: 'user-default-4',
          userName: '8***5',
          userAvatar: 'https://picsum.photos/id/4/100/100',
          content: '轮子是自己配的吗?',
          createTime: '2024-01-15 11:20:00',
          likeCount: 3,
          isLike: false
        }
      ]
    },
    {
      id: `eval-${productId}-2`,
      productId,
      userId: 'user-default-2',
      userName: '李***',
      userAvatar: avatars[1],
      rating: 5,
      content: contents[Math.floor(Math.random() * contents.length)],
      images: [],
      isAnonymity: false,
      createTime: '2024-01-14 15:20:00',
      status: 'show',
      likeCount: Math.floor(Math.random() * 80) + 5,
      isLike: false,
      specs: '默认规格',
      comments: []
    },
    {
      id: `eval-${productId}-3`,
      productId,
      userId: 'user-default-3',
      userName: '王***',
      userAvatar: avatars[2],
      rating: 4,
      content: '整体不错，就是物流稍慢了一点。',
      images: [],
      isAnonymity: false,
      createTime: '2024-01-13 09:15:00',
      status: 'show',
      likeCount: Math.floor(Math.random() * 50) + 3,
      isLike: false,
      specs: '默认规格',
      comments: []
    }
  ];
};

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
        specs: '颜色: 钛金属原色; 版本: 256GB',
        comments: [
          {
            id: 'comment-001-1',
            evaluationId: 'eval-001',
            userId: 'user-005',
            userName: '8***5',
            userAvatar: 'https://picsum.photos/id/4/100/100',
            content: '轮子是自己配的吗?',
            createTime: '2024-01-15 11:20:00',
            likeCount: 3,
            isLike: false
          }
        ]
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
        specs: '颜色: 钛金属蓝; 版本: 512GB',
        comments: []
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
        specs: '颜色: 钛金属原色; 版本: 512GB',
        comments: []
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
        specs: '颜色: 钛金属蓝; 版本: 256GB',
        comments: []
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
        specs: '颜色: 雅川青; 内存: 12GB+512GB',
        comments: []
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
        specs: '容量: 230ml',
        comments: []
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
        specs: '容量: 230ml',
        comments: []
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
        specs: '容量: 230ml',
        comments: []
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
        specs: '容量: 230ml',
        comments: []
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
        specs: '容量: 230ml',
        comments: []
      }
    ]
  };

  return evaluations[productId] || generateDefaultEvaluations(productId);
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

// AI评价总结
export const getAiSummary = (productId: string) => {
  const evaluations = getEvaluationsByProduct(productId);
  const total = evaluations.length;
  const sum = evaluations.reduce((acc, e) => acc + e.rating, 0);
  const averageRating = Number((sum / total).toFixed(1));

  const positiveWords = ['好', '棒', '满意', '流畅', '清晰', '推荐', '喜欢', '性价比', '稳定', '快', '细腻', '光泽', '好用', '信赖', '精美', '超出预期'];
  const negativeWords = ['贵', '差', '一般', '不太好', '问题', '慢', '容易', '倒多', '稍慢'];

  const allContent = evaluations.map(e => e.content).join(' ');
  
  const positiveCount = positiveWords.reduce((acc, word) => {
    const regex = new RegExp(word, 'gi');
    return acc + (allContent.match(regex)?.length || 0);
  }, 0);

  const negativeCount = negativeWords.reduce((acc, word) => {
    const regex = new RegExp(word, 'gi');
    return acc + (allContent.match(regex)?.length || 0);
  }, 0);

  const productSummaries: Record<string, {
    overall: string;
    strengths: string[];
    weaknesses: string[];
    tags: string[];
  }> = {
    'product-1': {
      overall: '整体评价优秀，用户满意度高。手机性能强劲，拍照效果出色，屏幕显示细腻。',
      strengths: ['屏幕显示清晰细腻', '运行流畅', '拍照效果出色', '物流速度快', '性价比高'],
      weaknesses: ['价格偏贵'],
      tags: ['性能强', '拍照好', '屏幕棒']
    },
    'product-2': {
      overall: '用户评价良好，支持国产，系统流畅，拍照效果受到好评。',
      strengths: ['系统流畅', '拍照效果棒', '支持国产'],
      weaknesses: [],
      tags: ['国货之光', '系统稳']
    },
    'product-6': {
      overall: '用户评价非常好，产品效果明显，回购率高。虽然价格稍贵，但一分钱一分货。',
      strengths: ['效果明显', '皮肤细腻有光泽', '皮肤稳定', '回购率高'],
      weaknesses: ['价格偏贵', '瓶口设计不太好'],
      tags: ['效果好', '回购多']
    }
  };

  const defaultSummary = {
    overall: `综合${total}条评价，用户整体评价${averageRating >= 4.5 ? '非常好' : averageRating >= 4 ? '良好' : averageRating >= 3 ? '一般' : '较差'}，平均评分${averageRating}分。`,
    strengths: positiveCount > 0 ? ['用户反馈正面评价较多', '质量可靠', '物流速度快'] : [],
    weaknesses: negativeCount > 0 ? ['存在一些负面反馈'] : [],
    tags: ['质量好', '口碑佳']
  };

  return {
    averageRating,
    totalCount: total,
    ...(productSummaries[productId] || defaultSummary)
  };
};
