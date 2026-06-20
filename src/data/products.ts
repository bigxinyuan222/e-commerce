// ============================================
// 商品数据
// ============================================

export interface ProductData {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  categoryId: string;
  categoryName: string;
  brandId: string;
  brandName: string;
  sales: number;
  stock: number;
  skus: SKU[];
  evaluateCount: number;
  evaluateScore: number;
  tags: string[];
}

export interface SKU {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  specs: { [key: string]: string };
}

export const products: ProductData[] = [
  {
    id: 'product-1',
    name: 'iPhone 15 Pro Max 256GB 钛金属设计',
    price: 9999,
    originalPrice: 9999,
    images: [
      'https://picsum.photos/id/1/750/750',
      'https://picsum.photos/id/2/750/750',
      'https://picsum.photos/id/3/750/750',
      'https://picsum.photos/id/4/750/750'
    ],
    description: 'iPhone 15 Pro Max 采用钛金属设计，配备A17 Pro芯片，性能大幅提升。6.7英寸超视网膜XDR显示屏，支持ProMotion自适应刷新率。4800万像素主摄，支持5倍光学变焦。全新操作按钮，支持自定义功能。',
    categoryId: '1',
    categoryName: '手机数码',
    brandId: 'brand-apple',
    brandName: 'Apple',
    sales: 15680,
    stock: 289,
    skus: [
      { id: 'sku-1-1', name: '钛金属原色 256GB', price: 9999, stock: 100, image: 'https://picsum.photos/id/1/300/300', specs: { '颜色': '钛金属原色', '容量': '256GB' } },
      { id: 'sku-1-2', name: '钛金属原色 512GB', price: 11999, stock: 80, image: 'https://picsum.photos/id/1/300/300', specs: { '颜色': '钛金属原色', '容量': '512GB' } },
      { id: 'sku-1-3', name: '钛金属蓝 256GB', price: 9999, stock: 60, image: 'https://picsum.photos/id/2/300/300', specs: { '颜色': '钛金属蓝', '容量': '256GB' } },
      { id: 'sku-1-4', name: '钛金属蓝 512GB', price: 11999, stock: 49, image: 'https://picsum.photos/id/2/300/300', specs: { '颜色': '钛金属蓝', '容量': '512GB' } }
    ],
    evaluateCount: 23456,
    evaluateScore: 4.9,
    tags: ['正品保证', '急速发货']
  },
  {
    id: 'product-2',
    name: '华为 Mate 60 Pro 12GB+512GB 雅川青',
    price: 6999,
    originalPrice: 6999,
    images: [
      'https://picsum.photos/id/2/750/750',
      'https://picsum.photos/id/6/750/750',
      'https://picsum.photos/id/8/750/750',
      'https://picsum.photos/id/9/750/750'
    ],
    description: '华为Mate 60 Pro采用Mate系列经典设计语言，搭载麒麟9000S芯片，支持卫星通话。第二代昆仑玻璃，10倍耐摔抗跌。XMAGE全焦段超清影像，超光变主摄。5000mAh大电池，支持88W超级快充。',
    categoryId: '1',
    categoryName: '手机数码',
    brandId: 'brand-huawei',
    brandName: '华为',
    sales: 12890,
    stock: 456,
    skus: [
      { id: 'sku-2-1', name: '雅川青 12GB+512GB', price: 6999, stock: 150, image: 'https://picsum.photos/id/2/300/300', specs: { '颜色': '雅川青', '内存': '12GB+512GB' } },
      { id: 'sku-2-2', name: '白沙银 12GB+512GB', price: 6999, stock: 120, image: 'https://picsum.photos/id/6/300/300', specs: { '颜色': '白沙银', '内存': '12GB+512GB' } },
      { id: 'sku-2-3', name: '南糯紫 12GB+512GB', price: 6999, stock: 100, image: 'https://picsum.photos/id/8/300/300', specs: { '颜色': '南糯紫', '内存': '12GB+512GB' } },
      { id: 'sku-2-4', name: '雅丹黑 12GB+512GB', price: 6999, stock: 86, image: 'https://picsum.photos/id/9/300/300', specs: { '颜色': '雅丹黑', '内存': '12GB+512GB' } }
    ],
    evaluateCount: 18923,
    evaluateScore: 4.8,
    tags: ['国产旗舰', '卫星通话']
  },
  {
    id: 'product-3',
    name: 'AirPods Pro (第二代) 配MagSafe充电盒',
    price: 1899,
    originalPrice: 1999,
    images: [
      'https://picsum.photos/id/3/750/750',
      'https://picsum.photos/id/160/750/750',
      'https://picsum.photos/id/201/750/750',
      'https://picsum.photos/id/119/750/750'
    ],
    description: 'AirPods Pro全新升级，搭载Apple H2芯片，带来更沉浸的空间音频体验。自适应降噪功能大幅提升，通透模式更自然。MagSafe充电盒支持精确查找功能，续航可达30小时。',
    categoryId: '1',
    categoryName: '手机数码',
    brandId: 'brand-apple',
    brandName: 'Apple',
    sales: 34567,
    stock: 892,
    skus: [
      { id: 'sku-3-1', name: '配MagSafe充电盒', price: 1899, stock: 892, image: 'https://picsum.photos/id/3/300/300', specs: { '充电盒': 'MagSafe' } }
    ],
    evaluateCount: 45678,
    evaluateScore: 4.9,
    tags: ['主动降噪', '空间音频']
  },
  {
    id: 'product-4',
    name: '小米手环8 Pro 曜石黑',
    price: 399,
    originalPrice: 399,
    images: [
      'https://picsum.photos/id/8/750/750',
      'https://picsum.photos/id/119/750/750',
      'https://picsum.photos/id/160/750/750',
      'https://picsum.photos/id/201/750/750'
    ],
    description: '小米手环8 Pro配备1.74英寸AMOLED大屏，显示面积提升73%。支持150+运动模式，配备独立GPS。全新健康引擎，全天候心率、血氧、睡眠监测。续航长达14天，磁吸充电。',
    categoryId: '1',
    categoryName: '手机数码',
    brandId: 'brand-xiaomi',
    brandName: '小米',
    sales: 8901,
    stock: 1234,
    skus: [
      { id: 'sku-4-1', name: '曜石黑', price: 399, stock: 800, image: 'https://picsum.photos/id/8/300/300', specs: { '颜色': '曜石黑' } },
      { id: 'sku-4-2', name: '银河灰', price: 399, stock: 434, image: 'https://picsum.photos/id/119/300/300', specs: { '颜色': '银河灰' } }
    ],
    evaluateCount: 12345,
    evaluateScore: 4.7,
    tags: ['大屏手环', '长续航']
  },
  {
    id: 'product-5',
    name: '戴森吹风机 HD15 紫红色',
    price: 2999,
    originalPrice: 3299,
    images: [
      'https://picsum.photos/id/119/750/750',
      'https://picsum.photos/id/220/750/750',
      'https://picsum.photos/id/225/750/750',
      'https://picsum.photos/id/230/750/750'
    ],
    description: '戴森Supersonic吹风机 HD15，第九代数码马达，转速可达110000转/分。智能温控技术，每秒40余次监测风温，保护头发自然光泽。多种风嘴配件，满足不同造型需求。',
    categoryId: '6',
    categoryName: '美妆护肤',
    brandId: 'brand-dyson',
    brandName: '戴森',
    sales: 4567,
    stock: 234,
    skus: [
      { id: 'sku-5-1', name: '紫红色', price: 2999, stock: 234, image: 'https://picsum.photos/id/119/300/300', specs: { '颜色': '紫红色' } }
    ],
    evaluateCount: 7890,
    evaluateScore: 4.9,
    tags: ['顶级品质', '快速干发']
  },
  {
    id: 'product-6',
    name: 'SK-II神仙水精华液 230ml',
    price: 1540,
    originalPrice: 1790,
    images: [
      'https://picsum.photos/id/220/750/750',
      'https://picsum.photos/id/225/750/750',
      'https://picsum.photos/id/230/750/750',
      'https://picsum.photos/id/250/750/750'
    ],
    description: 'SK-II护肤精华露，蕴含超过90%PITERA™成分。改善肌肤自然生理机能，令肌肤晶莹剔透。适合各种肤质，每天早晚使用，打造透亮肌肤。',
    categoryId: '6',
    categoryName: '美妆护肤',
    brandId: 'brand-skii',
    brandName: 'SK-II',
    sales: 7890,
    stock: 567,
    skus: [
      { id: 'sku-6-1', name: '230ml', price: 1540, stock: 567, image: 'https://picsum.photos/id/220/300/300', specs: { '容量': '230ml' } }
    ],
    evaluateCount: 12345,
    evaluateScore: 4.8,
    tags: ['明星单品', '护肤精华']
  },
  {
    id: 'product-7',
    name: '飞利浦电动牙刷 HX9911/57',
    price: 1299,
    originalPrice: 1599,
    images: [
      'https://picsum.photos/id/225/750/750',
      'https://picsum.photos/id/230/750/750',
      'https://picsum.photos/id/250/750/750',
      'https://picsum.photos/id/580/750/750'
    ],
    description: '飞利浦Sonicare 9900系列电动牙刷，Glow Pro高级系列。SenseIQ智能感应技术，实时感知刷牙力度。APP个性化指导，帮助改善口腔健康。续航长达14天。',
    categoryId: '6',
    categoryName: '美妆护肤',
    brandId: 'brand-philips',
    brandName: '飞利浦',
    sales: 3456,
    stock: 345,
    skus: [
      { id: 'sku-7-1', name: '静谧银', price: 1299, stock: 345, image: 'https://picsum.photos/id/225/300/300', specs: { '颜色': '静谧银' } }
    ],
    evaluateCount: 5678,
    evaluateScore: 4.7,
    tags: ['智能感应', 'APP控制']
  },
  {
    id: 'product-8',
    name: 'MacBook Pro 14英寸 M3 Pro芯片',
    price: 16999,
    originalPrice: 16999,
    images: [
      'https://picsum.photos/id/3/750/750',
      'https://picsum.photos/id/6/750/750',
      'https://picsum.photos/id/8/750/750',
      'https://picsum.photos/id/9/750/750'
    ],
    description: 'MacBook Pro 14英寸搭载M3 Pro芯片，18GB统一内存。Liquid视网膜XDR显示屏，1000尼特持续亮度。续航长达17小时，配备MagSafe 3充电端口。三个雷雳4端口，满足各种连接需求。',
    categoryId: '2',
    categoryName: '电脑办公',
    brandId: 'brand-apple',
    brandName: 'Apple',
    sales: 5678,
    stock: 123,
    skus: [
      { id: 'sku-8-1', name: '深空黑 18GB+512GB', price: 16999, stock: 80, image: 'https://picsum.photos/id/3/300/300', specs: { '颜色': '深空黑', '内存': '18GB+512GB' } },
      { id: 'sku-8-2', name: '银色 18GB+512GB', price: 16999, stock: 43, image: 'https://picsum.photos/id/6/300/300', specs: { '颜色': '银色', '内存': '18GB+512GB' } }
    ],
    evaluateCount: 8901,
    evaluateScore: 4.9,
    tags: ['M3 Pro', 'Liquid XDR']
  },
  {
    id: 'product-9',
    name: '戴森V15 Detect无绳吸尘器',
    price: 5499,
    originalPrice: 5999,
    images: [
      'https://picsum.photos/id/230/750/750',
      'https://picsum.photos/id/580/750/750',
      'https://picsum.photos/id/582/750/750',
      'https://picsum.photos/id/598/750/750'
    ],
    description: '戴森V15 Detect Complete智能无绳吸尘器。激光探测技术，让微尘无所遁形。LCD实时显示屏，智能显示灰尘数据。60分钟超长续航，全新防缠绕螺旋形吸头。',
    categoryId: '4',
    categoryName: '家用电器',
    brandId: 'brand-dyson',
    brandName: '戴森',
    sales: 2345,
    stock: 189,
    skus: [
      { id: 'sku-9-1', name: '镍蓝色', price: 5499, stock: 189, image: 'https://picsum.photos/id/230/300/300', specs: { '颜色': '镍蓝色' } }
    ],
    evaluateCount: 3456,
    evaluateScore: 4.8,
    tags: ['激光探测', '智能显示']
  },
  {
    id: 'product-10',
    name: '海尔冰箱 变频风冷无霜对开门',
    price: 3999,
    originalPrice: 4599,
    images: [
      'https://picsum.photos/id/582/750/750',
      'https://picsum.photos/id/598/750/750',
      'https://picsum.photos/id/787/750/750',
      'https://picsum.photos/id/1082/750/750'
    ],
    description: '海尔BCD-535WGHSSEDS9对开门冰箱，535升大容量。变频压缩机，节能静音。风冷无霜技术，食材更新鲜。干湿分储设计，果蔬干货分区存放。',
    categoryId: '4',
    categoryName: '家用电器',
    brandId: 'brand-haier',
    brandName: '海尔',
    sales: 4567,
    stock: 234,
    skus: [
      { id: 'sku-10-1', name: '星蕴银', price: 3999, stock: 234, image: 'https://picsum.photos/id/582/300/300', specs: { '颜色': '星蕴银' } }
    ],
    evaluateCount: 6789,
    evaluateScore: 4.7,
    tags: ['大容量', '变频节能']
  },
  {
    id: 'product-11',
    name: 'Nike Air Force 1 男子休闲板鞋',
    price: 799,
    originalPrice: 899,
    images: [
      'https://picsum.photos/id/100/750/750',
      'https://picsum.photos/id/101/750/750',
      'https://picsum.photos/id/102/750/750',
      'https://picsum.photos/id/103/750/750'
    ],
    description: 'Nike Air Force 1经典款休闲板鞋，采用优质皮革打造。内置Air气垫，提供出色缓震效果。简约百搭设计，适合日常穿搭。',
    categoryId: '3',
    categoryName: '服饰鞋包',
    brandId: 'brand-nike',
    brandName: 'Nike',
    sales: 12345,
    stock: 567,
    skus: [
      { id: 'sku-11-1', name: '白色 42码', price: 799, stock: 150, image: 'https://picsum.photos/id/100/300/300', specs: { '颜色': '白色', '尺码': '42' } },
      { id: 'sku-11-2', name: '黑色 43码', price: 799, stock: 180, image: 'https://picsum.photos/id/101/300/300', specs: { '颜色': '黑色', '尺码': '43' } },
      { id: 'sku-11-3', name: '白色 44码', price: 799, stock: 120, image: 'https://picsum.photos/id/100/300/300', specs: { '颜色': '白色', '尺码': '44' } },
      { id: 'sku-11-4', name: '黑色 42码', price: 799, stock: 117, image: 'https://picsum.photos/id/101/300/300', specs: { '颜色': '黑色', '尺码': '42' } }
    ],
    evaluateCount: 8901,
    evaluateScore: 4.7,
    tags: ['经典款', '百搭']
  },
  {
    id: 'product-12',
    name: 'adidas 女子运动休闲外套',
    price: 499,
    originalPrice: 599,
    images: [
      'https://picsum.photos/id/104/750/750',
      'https://picsum.photos/id/105/750/750',
      'https://picsum.photos/id/106/750/750',
      'https://picsum.photos/id/107/750/750'
    ],
    description: 'adidas女子运动休闲外套，轻盈透气面料。修身剪裁设计，展现女性曲线。经典三条纹设计，时尚百搭。适合运动休闲穿着。',
    categoryId: '3',
    categoryName: '服饰鞋包',
    brandId: 'brand-adidas',
    brandName: 'adidas',
    sales: 6789,
    stock: 345,
    skus: [
      { id: 'sku-12-1', name: '黑色 S码', price: 499, stock: 120, image: 'https://picsum.photos/id/104/300/300', specs: { '颜色': '黑色', '尺码': 'S' } },
      { id: 'sku-12-2', name: '白色 M码', price: 499, stock: 110, image: 'https://picsum.photos/id/105/300/300', specs: { '颜色': '白色', '尺码': 'M' } },
      { id: 'sku-12-3', name: '粉色 L码', price: 499, stock: 115, image: 'https://picsum.photos/id/106/300/300', specs: { '颜色': '粉色', '尺码': 'L' } }
    ],
    evaluateCount: 4567,
    evaluateScore: 4.6,
    tags: ['运动休闲', '修身']
  },
  {
    id: 'product-13',
    name: '新秀丽 双肩背包 商务电脑包',
    price: 599,
    originalPrice: 799,
    images: [
      'https://picsum.photos/id/108/750/750',
      'https://picsum.photos/id/109/750/750',
      'https://picsum.photos/id/110/750/750',
      'https://picsum.photos/id/111/750/750'
    ],
    description: 'Samsonite新秀丽商务双肩背包，15.6英寸电脑隔层。多口袋设计，收纳方便。舒适透气背带，减轻肩部压力。适合商务出差使用。',
    categoryId: '3',
    categoryName: '服饰鞋包',
    brandId: 'brand-samsonite',
    brandName: '新秀丽',
    sales: 3456,
    stock: 234,
    skus: [
      { id: 'sku-13-1', name: '黑色', price: 599, stock: 234, image: 'https://picsum.photos/id/108/300/300', specs: { '颜色': '黑色' } }
    ],
    evaluateCount: 2345,
    evaluateScore: 4.8,
    tags: ['商务', '大容量']
  },
  {
    id: 'product-14',
    name: '进口智利车厘子 2斤装',
    price: 128,
    originalPrice: 168,
    images: [
      'https://picsum.photos/id/292/750/750',
      'https://picsum.photos/id/302/750/750',
      'https://picsum.photos/id/312/750/750',
      'https://picsum.photos/id/324/750/750'
    ],
    description: '精选智利进口车厘子，JJ级大果，果径28mm以上。果肉饱满，口感脆甜。冷链运输，新鲜直达。送礼自用皆宜。',
    categoryId: '5',
    categoryName: '食品生鲜',
    brandId: 'brand-fresh',
    brandName: '生鲜优选',
    sales: 8901,
    stock: 456,
    skus: [
      { id: 'sku-14-1', name: '2斤装', price: 128, stock: 456, image: 'https://picsum.photos/id/292/300/300', specs: { '规格': '2斤装' } }
    ],
    evaluateCount: 5678,
    evaluateScore: 4.9,
    tags: ['进口', '新鲜直达']
  },
  {
    id: 'product-15',
    name: '澳洲谷饲原切牛排套餐 1kg',
    price: 199,
    originalPrice: 269,
    images: [
      'https://picsum.photos/id/429/750/750',
      'https://picsum.photos/id/431/750/750',
      'https://picsum.photos/id/458/750/750',
      'https://picsum.photos/id/488/750/750'
    ],
    description: '澳洲进口谷饲牛肉，原切西冷牛排，纹理清晰。肉质鲜嫩多汁，煎烤皆宜。1kg家庭装，包含4-5片牛排。',
    categoryId: '5',
    categoryName: '食品生鲜',
    brandId: 'brand-meat',
    brandName: '肉管家',
    sales: 5678,
    stock: 234,
    skus: [
      { id: 'sku-15-1', name: '1kg装', price: 199, stock: 234, image: 'https://picsum.photos/id/429/300/300', specs: { '规格': '1kg装' } }
    ],
    evaluateCount: 3456,
    evaluateScore: 4.8,
    tags: ['原切', '谷饲']
  },
  {
    id: 'product-16',
    name: '三只松鼠坚果大礼包 1.5kg',
    price: 89,
    originalPrice: 119,
    images: [
      'https://picsum.photos/id/326/750/750',
      'https://picsum.photos/id/342/750/750',
      'https://picsum.photos/id/365/750/750',
      'https://picsum.photos/id/380/750/750'
    ],
    description: '三只松鼠坚果礼盒，精选6种坚果，1.5kg大容量。每日坚果，营养健康。独立小包装，方便分享。',
    categoryId: '5',
    categoryName: '食品生鲜',
    brandId: 'brand-squirrel',
    brandName: '三只松鼠',
    sales: 15678,
    stock: 890,
    skus: [
      { id: 'sku-16-1', name: '1.5kg礼盒装', price: 89, stock: 890, image: 'https://picsum.photos/id/326/300/300', specs: { '规格': '1.5kg礼盒装' } }
    ],
    evaluateCount: 9876,
    evaluateScore: 4.7,
    tags: ['坚果礼盒', '送礼佳品']
  },
  {
    id: 'product-17',
    name: '帮宝适婴儿纸尿裤 XL码 60片',
    price: 109,
    originalPrice: 149,
    images: [
      'https://picsum.photos/id/64/750/750',
      'https://picsum.photos/id/65/750/750',
      'https://picsum.photos/id/66/750/750',
      'https://picsum.photos/id/67/750/750'
    ],
    description: '帮宝适超薄干爽纸尿裤，XL码适合12-17kg宝宝。3层锁水系统，整夜干爽。柔软亲肤材质，呵护宝宝娇嫩肌肤。',
    categoryId: '7',
    categoryName: '母婴用品',
    brandId: 'brand-pampers',
    brandName: '帮宝适',
    sales: 23456,
    stock: 1234,
    skus: [
      { id: 'sku-17-1', name: 'XL码 60片', price: 109, stock: 400, image: 'https://picsum.photos/id/64/300/300', specs: { '尺码': 'XL码', '数量': '60片' } },
      { id: 'sku-17-2', name: 'L码 72片', price: 99, stock: 420, image: 'https://picsum.photos/id/65/300/300', specs: { '尺码': 'L码', '数量': '72片' } },
      { id: 'sku-17-3', name: 'M码 80片', price: 89, stock: 414, image: 'https://picsum.photos/id/66/300/300', specs: { '尺码': 'M码', '数量': '80片' } }
    ],
    evaluateCount: 15678,
    evaluateScore: 4.8,
    tags: ['婴儿用品', '超薄干爽']
  },
  {
    id: 'product-18',
    name: '美赞臣蓝臻婴幼儿奶粉 3段 900g',
    price: 349,
    originalPrice: 399,
    images: [
      'https://picsum.photos/id/68/750/750',
      'https://picsum.photos/id/69/750/750',
      'https://picsum.photos/id/70/750/750',
      'https://picsum.photos/id/71/750/750'
    ],
    description: '美赞臣蓝臻3段奶粉，适合12-36个月宝宝。含乳铁蛋白，增强抵抗力。DHA+ARA，促进大脑发育。原装进口品质保证。',
    categoryId: '7',
    categoryName: '母婴用品',
    brandId: 'brand-meadjohnson',
    brandName: '美赞臣',
    sales: 8901,
    stock: 567,
    skus: [
      { id: 'sku-18-1', name: '3段 900g', price: 349, stock: 567, image: 'https://picsum.photos/id/68/300/300', specs: { '段数': '3段', '容量': '900g' } }
    ],
    evaluateCount: 6789,
    evaluateScore: 4.9,
    tags: ['进口奶粉', '乳铁蛋白']
  },
  {
    id: 'product-19',
    name: '乐高积木城市系列 儿童拼装玩具',
    price: 199,
    originalPrice: 249,
    images: [
      'https://picsum.photos/id/72/750/750',
      'https://picsum.photos/id/73/750/750',
      'https://picsum.photos/id/74/750/750',
      'https://picsum.photos/id/75/750/750'
    ],
    description: 'LEGO乐高城市系列拼装玩具，适合6-12岁儿童。培养动手能力和想象力。安全环保材质，拼插稳固不易脱落。',
    categoryId: '7',
    categoryName: '母婴用品',
    brandId: 'brand-lego',
    brandName: '乐高',
    sales: 4567,
    stock: 345,
    skus: [
      { id: 'sku-19-1', name: '城市警察局', price: 199, stock: 345, image: 'https://picsum.photos/id/72/300/300', specs: { '款式': '城市警察局' } }
    ],
    evaluateCount: 2345,
    evaluateScore: 4.8,
    tags: ['益智玩具', '动手能力']
  },
  {
    id: 'product-20',
    name: '水星家纺 纯棉四件套 简约风格',
    price: 399,
    originalPrice: 599,
    images: [
      'https://picsum.photos/id/582/750/750',
      'https://picsum.photos/id/584/750/750',
      'https://picsum.photos/id/586/750/750',
      'https://picsum.photos/id/588/750/750'
    ],
    description: '水星家纺纯棉四件套，100%全棉面料，柔软亲肤。简约北欧风格，百搭各种装修。AB面设计，四季可用。',
    categoryId: '8',
    categoryName: '家居家纺',
    brandId: 'brand-mercury',
    brandName: '水星家纺',
    sales: 6789,
    stock: 456,
    skus: [
      { id: 'sku-20-1', name: '1.5m床 灰色', price: 399, stock: 150, image: 'https://picsum.photos/id/582/300/300', specs: { '尺寸': '1.5m床', '颜色': '灰色' } },
      { id: 'sku-20-2', name: '1.8m床 蓝色', price: 449, stock: 160, image: 'https://picsum.photos/id/584/300/300', specs: { '尺寸': '1.8m床', '颜色': '蓝色' } },
      { id: 'sku-20-3', name: '1.5m床 米色', price: 399, stock: 146, image: 'https://picsum.photos/id/586/300/300', specs: { '尺寸': '1.5m床', '颜色': '米色' } }
    ],
    evaluateCount: 4567,
    evaluateScore: 4.7,
    tags: ['纯棉', '简约']
  },
  {
    id: 'product-21',
    name: '苏泊尔不粘锅套装 炒锅+汤锅',
    price: 299,
    originalPrice: 459,
    images: [
      'https://picsum.photos/id/598/750/750',
      'https://picsum.photos/id/600/750/750',
      'https://picsum.photos/id/602/750/750',
      'https://picsum.photos/id/604/750/750'
    ],
    description: '苏泊尔不粘锅套装，32cm炒锅+22cm汤锅。不粘涂层，少油健康。加厚锅底，均匀导热。适合家用烹饪。',
    categoryId: '8',
    categoryName: '家居家纺',
    brandId: 'brand-supor',
    brandName: '苏泊尔',
    sales: 5678,
    stock: 345,
    skus: [
      { id: 'sku-21-1', name: '炒锅+汤锅套装', price: 299, stock: 345, image: 'https://picsum.photos/id/598/300/300', specs: { '规格': '32cm炒锅+22cm汤锅' } }
    ],
    evaluateCount: 3456,
    evaluateScore: 4.6,
    tags: ['不粘锅', '套装']
  },
  {
    id: 'product-22',
    name: '宜家书架 简约落地置物架',
    price: 199,
    originalPrice: 299,
    images: [
      'https://picsum.photos/id/787/750/750',
      'https://picsum.photos/id/789/750/750',
      'https://picsum.photos/id/791/750/750',
      'https://picsum.photos/id/793/750/750'
    ],
    description: '宜家简约书架，多层置物设计。优质板材，稳固耐用。简约白色设计，百搭各种家居风格。适合书房客厅使用。',
    categoryId: '8',
    categoryName: '家居家纺',
    brandId: 'brand-ikea',
    brandName: '宜家',
    sales: 4567,
    stock: 234,
    skus: [
      { id: 'sku-22-1', name: '白色 五层', price: 199, stock: 234, image: 'https://picsum.photos/id/787/300/300', specs: { '颜色': '白色', '层数': '五层' } }
    ],
    evaluateCount: 2345,
    evaluateScore: 4.5,
    tags: ['简约', '收纳']
  }
];

// 获取商品详情
export function getProductById(id: string): ProductData | undefined {
  return products.find(p => p.id === id);
}

// 根据分类获取商品
export function getProductsByCategory(categoryId: string): ProductData[] {
  return products.filter(p => p.categoryId === categoryId);
}

// 搜索商品
export function searchProducts(keyword: string): ProductData[] {
  const lowerKeyword = keyword.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerKeyword) ||
    p.description.toLowerCase().includes(lowerKeyword) ||
    p.brandName.toLowerCase().includes(lowerKeyword)
  );
}

// 推荐商品
export function getRecommendedProducts(): ProductData[] {
  return products.slice(0, 6);
}
