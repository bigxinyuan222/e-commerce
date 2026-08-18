import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView, Input, RichText } from '@tarojs/components';
import Taro, { useDidHide } from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import { apiGet } from '@/api/common';
import { productApi, fetchReviewList, fetchReviewStats, fetchReviewAiSummary, likeReview, replyToReview, fetchReviewReplies } from '@/api/home';
import { addToCartAPI, payOrder, fetchOrderList } from '@/api/cart';
import { fetchProductSeckillActivity, fetchSeckillActivities, createSeckillPurchase, pollSeckillPurchaseResult, generateSeckillRequestNo } from '@/api/seckill';
import { executeWechatPayment } from '@/utils/wechatPay';
import { getImageUrl, normalizeProductImages, lazyImgProps } from '@/utils/image';
import { formatDateTime } from '@/utils/time';
import { getAllSpecOptions } from './utils';
import useChatStore from '@/store/useChatStore';
import styles from '@/styles/home/detail.module.scss';

/**
 * 反转义 HTML 实体（如 &lt;p&gt; → <p>）
 * 后端部分商品的 description 被转义存储，需要反转义后才能正确渲染
 */
function decodeHtmlEntities(input: string): string {
  if (!input || typeof input !== 'string') return input || '';
  const map: Record<string, string> = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&#160;': ' ',
    '&ensp;': ' ',
    '&emsp;': ' ',
    '&#60;': '<',
    '&#62;': '>',
    '&#38;': '&',
  };
  return input.replace(/&(?:lt|gt|amp|quot|#39|nbsp|#160|ensp|emsp|#60|#62|#38);/g, match => map[match] || match);
}

interface Product {
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
  skus: Array<{
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    specs: { [key: string]: string };
  }>;
  evaluateCount: number;
  evaluateScore: number;
  tags: string[];
}

const EvaluationItem = React.memo(({ 
  evaluation, 
  onLike, 
  onComment 
}: { 
  evaluation: any; 
  onLike: (id: string) => void;
  onComment: (evaluation: any) => void;
}) => (
  <View key={evaluation.id} className={styles.evaluateItem}>
    <View className={styles.evaluateHeader}>
      <Image 
        src={getImageUrl(evaluation.userAvatar)} 
        className={styles.userAvatar} 
        mode="aspectFill" 
        {...lazyImgProps()}
      />
      <View className={styles.userInfo}>
        <Text className={styles.userName}>{evaluation.userName}</Text>
        <Text className={styles.evaluateTime}>{formatDateTime(evaluation.createdAt || evaluation.createTime)}</Text>
      </View>
    </View>
    <View className={styles.evaluateRating}>
      <Text className={styles.evalRatingLabel}>好评</Text>
    </View>
    <Text className={styles.evaluateContent}>{evaluation.content}</Text>
    {evaluation.images && evaluation.images.length > 0 && (
      <View className={styles.evaluateImages}>
        {evaluation.images.map((img: string, idx: number) => (
          <Image key={idx} src={getImageUrl(img)} mode="aspectFill" {...lazyImgProps()} />
        ))}
      </View>
    )}
    <View className={styles.evaluateActions}>
      <View 
        className={`${styles.actionItem} ${evaluation.isLike ? styles.liked : ''}`}
        onClick={() => onLike(evaluation.id)}
      >
        <Text className={styles.actionIcon}>{evaluation.isLike ? '❤️' : '👍'}</Text>
        <Text className={styles.actionText}>{evaluation.likeCount}</Text>
      </View>
      <View className={styles.actionItem} onClick={() => onComment(evaluation)}>
        <Text className={styles.actionIcon}>💬</Text>
        <Text className={styles.actionText}>评论</Text>
      </View>
    </View>
  </View>
));

const SkuOptionGroup = React.memo(({ 
  specName, 
  product, 
  specSelections, 
  availableValues,
  onSelect 
}: { 
  specName: string; 
  product: Product;
  specSelections: { [key: string]: string };
  availableValues: string[];
  onSelect: (specName: string, specValue: string) => void;
}) => (
  <View key={specName} className={styles.optionGroup}>
    <Text className={styles.optionLabel}>{specName}</Text>
    <View className={styles.optionValues}>
      {Array.from(new Set(product.skus.map(sku => sku.specs?.[specName]).filter((v): v is string => typeof v === 'string'))).map((specValue: string) => {
        const isAvailable = availableValues.includes(specValue);
        const isSelected = specSelections[specName] === specValue;
        return (
          <View
            key={specValue}
            className={`${styles.optionValue} ${isSelected ? styles.active : ''} ${!isAvailable ? styles.disabled : ''}`}
            onClick={() => isAvailable && onSelect(specName, specValue)}
          >
            {specValue}
          </View>
        );
      })}
    </View>
  </View>
));

const ProductDetailPage: React.FC = () => {
  const { addToCart, currentStore } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSku, setSelectedSku] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSkuModal, setShowSkuModal] = useState(false);
  const [skuModalType, setSkuModalType] = useState<'cart' | 'buy'>('cart');
  const [specSelections, setSpecSelections] = useState<{ [key: string]: string }>({});
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [evalStats, setEvalStats] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [isSeckill, setIsSeckill] = useState(false);
  const [seckillCountdown, setSeckillCountdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState('');
  // 秒杀活动信息
  const [seckillActivityId, setSeckillActivityId] = useState('');
  const [seckillInfo, setSeckillInfo] = useState<any>(null);
  const [purchasing, setPurchasing] = useState(false);
  // 路由参数缓存（在 useEffect 中读取，避免 useMemo 渲染阶段调用 Taro.getCurrentInstance 导致小程序白屏）
  const [routerParams, setRouterParams] = useState<Record<string, string>>({});
  // 秒杀倒计时定时器引用（useDidHide 时需清除，避免微信框架 __subPageFrameEndTime__ 报错）
  const seckillTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 健壮解析各种时间格式（ISO 8601、YYYY-MM-DD HH:mm:ss、时间戳等）
  const parseTime = useCallback((timeStr: string | number | undefined): number => {
    if (timeStr === undefined || timeStr === null || timeStr === '') return NaN;
    if (typeof timeStr === 'number') return timeStr;
    let t = new Date(timeStr).getTime();
    if (!isNaN(t)) return t;
    t = new Date(String(timeStr).replace(/-/g, '/')).getTime();
    if (!isNaN(t)) return t;
    t = new Date(String(timeStr).replace(/\//g, '-')).getTime();
    if (!isNaN(t)) return t;
    // 尝试解析纯数字时间戳（秒级转毫秒级）
    const numeric = Number(timeStr);
    if (!isNaN(numeric) && String(timeStr).trim() !== '') {
      return numeric < 1e12 ? numeric * 1000 : numeric;
    }
    return NaN;
  }, []);

  // 当前秒杀价：优先使用列表页传入的价格，保证和列表一致；否则从 seckillInfo 提取
  const seckillPrice = useMemo(() => {
    if (!isSeckill) return null;

    // 优先使用列表页传入的秒杀价（URL 参数），避免详情页重新请求后价格不一致
    const urlSeckillPrice = routerParams.seckillPrice;
    if (urlSeckillPrice !== undefined && urlSeckillPrice !== null && urlSeckillPrice !== '') {
      const num = Number(urlSeckillPrice);
      if (!isNaN(num) && num >= 0) {
        return num;
      }
    }

    if (!seckillInfo) return null;
    const pid = product?.id;

    // 辅助：从任意对象中提取秒杀价（兼容多种字段命名和结构）
    const extractSeckillPrice = (target: any): number | null => {
      if (!target || typeof target !== 'object') return null;
      const candidates = [
        target.seckillPrice, target.seckill_price, target.SeckillPrice,
        target.price_seckill, target.seckill_price_cents,
        target.activityPrice, target.activity_price, target.ActivityPrice,
        target.flashSalePrice, target.flash_sale_price, target.FlashSalePrice,
        target.raw?.seckillPrice, target.raw?.seckill_price, target.raw?.price,
        target.raw?.seckill_price_cents, target.raw?.price_seckill,
      ];
      for (const v of candidates) {
        if (v !== undefined && v !== null && v !== '') {
          const num = Number(v);
          if (!isNaN(num) && num > 0) return num;
        }
      }
      return null;
    };

    // 1. 优先从活动对象的 products 中匹配当前商品
    if (Array.isArray(seckillInfo.products) && pid) {
      const matched = seckillInfo.products.find((p: any) =>
        String(p.productId || p.id) === String(pid)
      );
      if (matched) {
        const price = extractSeckillPrice(matched);
        if (price !== null) {
          console.log('[秒杀价格] 从活动 products 匹配到:', price);
          return price;
        }
      }
    }

    // 2. 从 seckillInfo 本身提取
    const infoPrice = extractSeckillPrice(seckillInfo);
    if (infoPrice !== null) {
      console.log('[秒杀价格] 从 seckillInfo 提取到:', infoPrice);
      return infoPrice;
    }

    // 3. 兜底：从选中的 SKU 中提取秒杀价
    if (selectedSku) {
      const skuPrice = extractSeckillPrice(selectedSku);
      if (skuPrice !== null) {
        console.log('[秒杀价格] 从 SKU 提取到:', skuPrice);
        return skuPrice;
      }
    }

    console.log('[秒杀价格] 未提取到秒杀价，seckillInfo:', seckillInfo);
    return null;
  }, [isSeckill, seckillInfo, product?.id, selectedSku, routerParams]);

  // 当前秒杀原价：优先使用列表页传入的原价，否则使用商品原价
  const seckillOriginalPrice = useMemo(() => {
    if (!isSeckill) return null;
    if (routerParams.originalPrice !== undefined && routerParams.originalPrice !== null && routerParams.originalPrice !== '') {
      const num = Number(routerParams.originalPrice);
      if (!isNaN(num) && num > 0) return num;
    }
    return product?.price || null;
  }, [isSeckill, product?.price, routerParams]);

  // 当前秒杀活动结束时间：优先使用列表页传入的时间，保证和列表一致
  const seckillEndTime = useMemo(() => {
    if (!isSeckill) return null;

    // 优先使用列表页传入的活动结束时间（URL 参数）
    if (routerParams.activityEndTime) return String(routerParams.activityEndTime);

    if (!seckillInfo) return null;
    if (seckillInfo.endTime) return String(seckillInfo.endTime);
    if (seckillInfo.end_time) return String(seckillInfo.end_time);
    const raw = seckillInfo.raw;
    if (raw) {
      if (raw.endTime) return String(raw.endTime);
      if (raw.end_time) return String(raw.end_time);
      if (raw.activity?.endTime) return String(raw.activity.endTime);
      if (raw.activity?.end_time) return String(raw.activity.end_time);
      if (raw.activity_end_time) return String(raw.activity_end_time);
      if (raw.activityEndTime) return String(raw.activityEndTime);
    }
    return null;
  }, [isSeckill, seckillInfo, routerParams]);

  const onBannerChange = useCallback((e: any) => {
    setCurrentImage(e.detail.current);
  }, []);

  const getAvailableSpecValues = useCallback((specName: string) => {
    if (!product) return [];
    const availableValues: string[] = [];

    product.skus.forEach(sku => {
      if (!sku.specs) return;
      const otherSpecsMatch = Object.entries(specSelections).every(([key, value]) => {
        if (key === specName) return true;
        return sku.specs?.[key] === value;
      });

      if (otherSpecsMatch && typeof sku.specs[specName] === 'string') {
        availableValues.push(sku.specs[specName]);
      }
    });

    return [...new Set(availableValues)];
  }, [product, specSelections]);

  const selectSpec = useCallback((specName: string, specValue: string) => {
    // 构建新选择：设置当前规格，保留其他兼容的规格
    const newSelections: { [key: string]: string } = { [specName]: specValue };

    Object.entries(specSelections).forEach(([key, value]) => {
      if (key === specName) return;
      // 检查该规格值与新选择是否至少有一个匹配的 SKU
      const hasAnyMatch = product?.skus.some(sku =>
        sku.specs && sku.specs[key] === value && sku.specs[specName] === specValue
      );
      if (hasAnyMatch) {
        newSelections[key] = value;
      }
    });

    // 查找是否有完全匹配的 SKU
    const matchedSku = product?.skus.find(sku =>
      sku.specs && Object.entries(newSelections).every(([key, value]) => sku.specs?.[key] === value)
    );

    setSpecSelections(newSelections);
    setSelectedSku(matchedSku || null);
  }, [product, specSelections]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const increaseQuantity = useCallback(() => {
    if (!selectedSku) {
      Taro.showToast({ title: '请先选择规格', icon: 'none' });
      return;
    }
    if (quantity < selectedSku.stock) {
      setQuantity(quantity + 1);
    } else {
      Taro.showToast({ title: '库存不足', icon: 'none' });
    }
  }, [selectedSku, quantity]);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;
    if (!selectedSku) {
      Taro.showToast({ title: '请选择完整规格', icon: 'none' });
      return;
    }
    try {
      await addToCartAPI({
        productId: product.id,
        skuId: selectedSku.id,
        quantity: quantity,
      });
    } catch (error) {
      console.error('添加到购物车API失败:', error);
    }
    addToCart({
      productId: product.id,
      productName: product.name,
      skuId: selectedSku.id,
      skuName: selectedSku.name,
      price: selectedSku.price,
      quantity: quantity,
      image: selectedSku.image || product.images[0],
      stock: selectedSku.stock,
      isSeckill
    });
    setShowSkuModal(false);
  }, [addToCart, product, selectedSku, quantity, isSeckill]);

  // 秒杀购买流程：
  // 1. 生成 request_no -> 调用 createSeckillPurchase 创建秒杀订单
  // 2. 如果返回 202（等待秒杀结果）-> 轮询 fetchSeckillPurchaseResult 查询结果
  // 3. 秒杀成功后 -> 直接调用 payOrder + executeWechatPayment 进行支付
  const handleSeckillPurchase = useCallback(async () => {
    if (!product) return;
    if (purchasing) return;
    if (!seckillActivityId) {
      Taro.showToast({ title: '活动信息加载中，请稍后再试', icon: 'none' });
      return;
    }

    // 从秒杀活动信息中提取 SeckillSKUPriceID
    // 优先使用列表页传入的秒杀规格ID，避免详情页匹配错误
    let seckillSkuPriceId = routerParams.seckillSkuPriceId || '';

    if (!seckillSkuPriceId && seckillInfo) {
      if (Array.isArray(seckillInfo.products) && seckillInfo.products.length > 0) {
        const matched = seckillInfo.products.find((p: any) => {
          const matchProductId = String(p.productId || p.id) === String(product.id);
          const matchSkuId = selectedSku?.id ? String(p.skuId) === String(selectedSku.id) : false;
          return matchProductId || matchSkuId;
        });
        seckillSkuPriceId = matched?.seckillSkuPriceId || '';
      } else {
        seckillSkuPriceId = seckillInfo.seckillSkuPriceId || '';
      }
    }
    // 兜底：从原始秒杀数据或 SKU 中提取
    if (!seckillSkuPriceId) {
      const rawSeckill = seckillInfo?.raw || seckillInfo;
      seckillSkuPriceId = rawSeckill?.seckill_sku_price_id
        || rawSeckill?.SeckillSKUPriceID
        || rawSeckill?.seckillSkuPriceId
        || (selectedSku as any)?.seckill_sku_price_id
        || (selectedSku as any)?.SeckillSKUPriceID
        || (selectedSku as any)?.seckillSkuPriceId
        || '';
    }

    console.log('[秒杀购买] 商品:', product.name, 'productId:', product.id, 'selectedSku:', selectedSku?.id, 'seckillSkuPriceId:', seckillSkuPriceId);
    if (!seckillSkuPriceId) {
      Taro.showToast({ title: '秒杀规格信息缺失，请刷新重试', icon: 'none' });
      return;
    }

    setPurchasing(true);
    Taro.showLoading({ title: '抢购中...', mask: true });

    // 前端生成唯一 request_no，用于秒杀幂等控制和结果查询
    const requestNo = generateSeckillRequestNo();

    try {
      // 步骤1：创建秒杀购买
      const purchaseRes = await createSeckillPurchase({
        activityId: seckillActivityId,
        seckillSkuPriceId,
        storeId: (currentStore?.id as any) || 1,
        requestNo,
        quantity: quantity,
      });

      let result: any = purchaseRes?.data ?? {};
      const accepted = purchaseRes?.accepted === true;

      // 步骤2：如果返回 202（等待秒杀结果），轮询查询结果
      if (accepted) {
        Taro.showLoading({ title: '查询秒杀结果...', mask: true });
        result = await pollSeckillPurchaseResult(requestNo, { interval: 1500, timeout: 15000 });
      }

      const status = String(result.status ?? '');
      const orderNo = result.orderNo || '';
      const orderId = result.orderId || '';

      // 秒杀失败/售罄/取消等非成功状态
      if (status !== 'success' && status !== 'succeeded' && status !== 'paid') {
        Taro.hideLoading();
        if (status === 'out_of_stock' || status === 'out-of-stock' || status === 'sold_out') {
          Taro.showToast({ title: '手慢了，商品已售罄', icon: 'none' });
        } else {
          Taro.showToast({ title: result.statusText || result.message || '抢购失败', icon: 'none' });
        }
        return;
      }

      // 步骤3：秒杀成功，查找真正的订单ID后发起支付
      // 后端秒杀接口可能只返回 orderNo（订单编号，如202608131520094434）而非数据库订单ID
      // payOrder / fetchOrderDetail 的路径参数 {id} 需要数据库ID，需通过订单列表匹配 orderNo 获取
      Taro.showLoading({ title: '正在准备支付...', mask: true });
      let realOrderId = orderId;
      if (!realOrderId && orderNo) {
        try {
          const orderListRes = await fetchOrderList({ status: 'pending_payment', page: 1, size: 20 });
          const orders = Array.isArray(orderListRes?.data) ? orderListRes.data : [];
          const matched = orders.find((o: any) => o.orderNo === orderNo);
          if (matched?.id) {
            realOrderId = String(matched.id);
            console.log('[秒杀支付] 通过 orderNo 匹配到订单ID:', realOrderId);
          }
        } catch (e) {
          console.warn('[秒杀支付] 查询订单列表失败:', e);
        }
      }

      if (!realOrderId) {
        Taro.hideLoading();
        Taro.showToast({ title: '抢购成功，请到订单中支付', icon: 'none' });
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/cart/order/list/index' });
        }, 1500);
        return;
      }

      // 防护：微信支付最小金额为 1 分钱，0 元订单无法发起微信支付
      // 如果秒杀价为 0 或无法获取，跳过支付，直接跳转订单详情
      if (!seckillPrice || seckillPrice <= 0) {
        Taro.hideLoading();
        console.warn('[秒杀支付] 秒杀价格为 0 或未获取到，跳过微信支付。请检查后端秒杀订单金额是否正确写入。');
        Taro.showToast({ title: '抢购成功，请到订单中查看', icon: 'none' });
        setTimeout(() => {
          Taro.redirectTo({ url: `/pages/cart/order/detail/index?id=${realOrderId}` });
        }, 1500);
        return;
      }

      Taro.showLoading({ title: '发起支付...', mask: true });
      try {
        const payRes = await payOrder(realOrderId, { paymentMethod: 'wechat' });
        await executeWechatPayment(payRes, realOrderId);
        Taro.hideLoading();
        Taro.showToast({ title: '支付成功', icon: 'success' });
        // 支付成功后跳转到订单详情
        setTimeout(() => {
          Taro.redirectTo({ url: `/pages/cart/order/detail/index?id=${realOrderId}` });
        }, 1500);
      } catch (payError: any) {
        Taro.hideLoading();
        const payErrMsg = payError?.message || '';
        if (payErrMsg.includes('取消支付')) {
          Taro.showToast({ title: '已取消支付，可到订单中重新支付', icon: 'none' });
        } else {
          console.error('秒杀支付失败:', payError);
          Taro.showToast({ title: payErrMsg || '支付失败，可到订单中重新支付', icon: 'none' });
        }
        // 支付失败/取消都跳转到订单详情，方便用户重新支付
        setTimeout(() => {
          Taro.redirectTo({ url: `/pages/cart/order/detail/index?id=${realOrderId}` });
        }, 1500);
      }
    } catch (error: any) {
      Taro.hideLoading();
      console.error('Seckill purchase failed:', error);
      Taro.showToast({ title: error?.message || '抢购失败，请重试', icon: 'none' });
    } finally {
      setPurchasing(false);
    }
  }, [product, selectedSku, quantity, seckillActivityId, seckillInfo, currentStore, purchasing, routerParams]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    if (!selectedSku) {
      Taro.showToast({ title: '请选择完整规格', icon: 'none' });
      return;
    }
    setShowSkuModal(false);
    // 秒杀商品走秒杀购买流程
    if (isSeckill) {
      handleSeckillPurchase();
      return;
    }
    setTimeout(() => {
      const buyNowData = JSON.stringify({
        productId: product.id,
        productName: product.name,
        skuId: selectedSku.id,
        skuName: selectedSku.name,
        price: selectedSku.price,
        quantity: quantity,
        image: selectedSku.image || product.images[0],
        stock: selectedSku.stock,
        isSeckill
      });
      Taro.navigateTo({
        url: `/pages/cart/checkout/index?buyNow=${encodeURIComponent(buyNowData)}`
      });
    }, 300);
  }, [product, selectedSku, quantity, isSeckill, handleSeckillPurchase]);

  const openSkuModal = useCallback((type: 'cart' | 'buy') => {
    setSkuModalType(type);
    setShowSkuModal(true);
  }, []);

  const goHome = useCallback(() => {
    Taro.switchTab({ url: '/pages/home/index' });
  }, []);

  const goToCart = useCallback(() => {
    Taro.switchTab({ url: '/pages/cart/index' });
  }, []);

  const goToEvaluations = useCallback(() => {
    Taro.navigateTo({ url: `/pages/home/evaluations/index?id=${product?.id}` });
  }, [product]);

  const callStore = useCallback(() => {
    if (currentStore) {
      Taro.makePhoneCall({ phoneNumber: currentStore.phone });
    }
  }, [currentStore]);

  const handleSwitchStore = useCallback(() => {
    Taro.navigateTo({ url: '/pages/category/stores/index' });
  }, []);

  const goToCustomerService = useCallback(async () => {
    try {
      Taro.showLoading({ title: '正在连接客服...', mask: true });
      // 先创建/复用客服会话，获取 conversationId 后再跳转
      const { createConversation } = useChatStore.getState();
      const conv = await createConversation({ title: '乐享购官方客服' });
      const convId = conv?.id || '';
      Taro.hideLoading();
      if (convId) {
        Taro.navigateTo({ url: `/pages/message/customer-service/index?id=${encodeURIComponent(convId)}` });
      } else {
        // 创建失败，跳转到客服页由其自动创建
        Taro.navigateTo({ url: '/pages/message/customer-service/index' });
      }
    } catch (e) {
      Taro.hideLoading();
      console.error('[客服] 创建会话失败:', e);
      Taro.navigateTo({ url: '/pages/message/customer-service/index' });
    }
  }, []);

  const handleShare = useCallback(() => {
    try {
      const shareLink = `https://lexiangou.com/product/${product?.id}`;
      Taro.setClipboardData({
        data: shareLink,
        success: () => {
          Taro.showToast({ title: '链接已复制', icon: 'success' });
        },
        fail: () => {
          Taro.showToast({ title: '复制失败', icon: 'none' });
        }
      });
    } catch (error) {
      Taro.showToast({ title: '复制失败', icon: 'none' });
    }
  }, [product]);

  const handleEvaluationLike = useCallback(async (evalId: string) => {
    try {
      await likeReview(evalId);
      setEvaluations(prev => {
        return prev.map(evalItem => {
          if (evalItem.id === evalId) {
            return {
              ...evalItem,
              isLike: !evalItem.isLike,
              likeCount: evalItem.isLike ? evalItem.likeCount - 1 : evalItem.likeCount + 1
            };
          }
          return evalItem;
        });
      });
    } catch (error) {
      console.error('Failed to like review:', error);
    }
  }, []);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [commentInput, setCommentInput] = useState('');

  const openCommentModal = useCallback(async (evaluation: any) => {
    setCurrentEvaluation({ ...evaluation, comments: [], loadingReplies: true });
    setShowCommentModal(true);
    // 加载该评价的回复列表
    try {
      const res = await fetchReviewReplies({ reviewId: evaluation.id, page: 1, size: 50 });
      const replies = Array.isArray(res?.data) ? res.data : [];
      setCurrentEvaluation(prev => prev ? { ...prev, comments: replies, loadingReplies: false } : prev);
    } catch (error) {
      console.error('Failed to load review replies:', error);
      setCurrentEvaluation(prev => prev ? { ...prev, comments: [], loadingReplies: false } : prev);
    }
  }, []);

  const closeCommentModal = useCallback(() => {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  }, []);

  const sendComment = useCallback(async () => {
    if (!commentInput.trim()) {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }
    if (!currentEvaluation?.id) {
      Taro.showToast({ title: '评价信息异常', icon: 'none' });
      return;
    }

    try {
      await replyToReview({
        reviewId: currentEvaluation.id,
        content: commentInput.trim(),
      });

      const newComment = {
        id: `comment-${Date.now()}`,
        reviewId: currentEvaluation.id,
        userId: 'user-current',
        userName: '我',
        userAvatar: '',
        content: commentInput.trim(),
        createTime: new Date().toLocaleString(),
        likeCount: 0,
        isLike: false
      };

      setCurrentEvaluation(prev => prev ? {
        ...prev,
        comments: [...(prev.comments || []), newComment]
      } : prev);

      setCommentInput('');
      Taro.showToast({ title: '评论成功', icon: 'success' });
    } catch (error) {
      console.error('Failed to send comment:', error);
      Taro.showToast({ title: '评论失败', icon: 'none' });
    }
  }, [commentInput, currentEvaluation]);

  useEffect(() => {
    const routerData = Taro.getCurrentInstance().router?.params || {};
    // 缓存路由参数，供 useMemo 使用（避免渲染阶段直接调用 getCurrentInstance 导致小程序白屏）
    setRouterParams(routerData as Record<string, string>);

    const { id, seckill, activityId } = routerData;
    const isSeckillPage = seckill === '1';
    setIsSeckill(isSeckillPage);
    if (activityId) setSeckillActivityId(activityId);

    if (!id) {
      Taro.showToast({ title: '商品不存在', icon: 'none' });
      setTimeout(() => Taro.navigateBack(), 1000);
      return;
    }

    setProductId(id);

    const loadProduct = async () => {
      setLoading(true);
      try {
        // 并行加载：商品详情、评价列表、评价统计、AI评价摘要
        const requestList: Promise<any>[] = [
          apiGet(productApi.detail, { id }).catch((err: any) => {
            console.error('[商品详情] 加载失败:', err?.message || err);
            return null;
          }),
          // 商品评论列表 GET /api/v1/review/list
          fetchReviewList({ productId: id, page: 1, size: 2 }).catch((err: any) => {
            console.error('[商品评价] 加载失败:', err?.message || err);
            return null;
          }),
          // 评价统计 GET /api/v1/review/state
          fetchReviewStats(id).catch((err: any) => {
            console.error('[评价统计] 加载失败:', err?.message || err);
            return null;
          }),
          // AI评价摘要 GET /api/v1/review/ai
          fetchReviewAiSummary(id).catch((err: any) => {
            console.error('[AI评价摘要] 加载失败:', err?.message || err);
            return null;
          }),
        ];

        // 秒杀商品：额外获取指定商品秒杀活动信息
        if (isSeckillPage) {
          requestList.push(
            fetchProductSeckillActivity({ productId: id, activityId: activityId || undefined }).catch(() => null)
          );
        }

        const [productRes, reviewRes, statsRes, aiRes, seckillRes] = await Promise.all(requestList);

        if (productRes?.data) {
          const rawData = productRes.data;
          const productData = normalizeProductImages(rawData);
          console.log('[商品详情] 原始字段:', {
            description: rawData.description,
            Description: rawData.Description,
            detail: rawData.detail,
            Detail: rawData.Detail,
            content: rawData.content,
            Content: rawData.Content,
            introduce: rawData.introduce,
            introduction: rawData.introduction,
            productDescription: rawData.productDescription,
            desc: rawData.desc,
            body: rawData.body,
            html: rawData.html,
            normalizedDescription: productData.description,
          });
          setProduct(productData);

          if (productData.skus && productData.skus.length > 0) {
            // 从所有 SKU 中合并规格维度，避免只读第一个 SKU 导致维度缺失
            const allSpecOptions = getAllSpecOptions(productData.skus);
            const allSpecKeys = Object.keys(allSpecOptions);

            // 只预填第一个规格维度，其他维度留空
            // 避免全预填导致的规格联动锁定问题
            const firstSpecKey = allSpecKeys[0] || '';
            const initialSelections: { [key: string]: string } = {};
            if (firstSpecKey && allSpecOptions[firstSpecKey].length > 0) {
              initialSelections[firstSpecKey] = allSpecOptions[firstSpecKey][0];
            }
            setSpecSelections(initialSelections);

            // 如果只有一个规格维度，直接匹配完整 SKU
            const matchedSku = productData.skus.find(sku =>
              Object.entries(initialSelections).every(([key, value]) => sku.specs?.[key] === value)
            );
            setSelectedSku(matchedSku || null);
          }
        }

        // 解析评价列表（fetchReviewList 已做规范化）
        if (reviewRes?.data && Array.isArray(reviewRes.data)) {
          const reviewList = reviewRes.data;
          if (reviewList.length > 0) {
            console.log('[商品评价] 加载成功，共', reviewList.length, '条评价');
            setEvaluations(reviewList.slice(0, 2));
          } else {
            console.warn('[商品评价] 接口返回但数据为空');
          }
        }

        // 解析评价统计（fetchReviewStats 已做规范化）
        if (statsRes?.data) {
          console.log('[评价统计] 加载成功:', statsRes.data);
          setEvalStats(statsRes.data);
        }

        // 解析 AI 评价摘要（fetchReviewAiSummary 已做规范化）
        // 即使 content 为空也保留 aiSummary，由 UI 显示"AI分析中"占位框架
        if (aiRes?.data) {
          setAiSummary(aiRes.data);
        }
        setAiLoading(false);

        // 处理秒杀活动信息
        let currentSeckillInfo: any = null;
        if (seckillRes?.data) {
          let data = seckillRes.data;
          // 如果返回的是数组，取第一个元素
          if (Array.isArray(data) && data.length > 0) {
            data = data[0];
          }
          if (data && typeof data === 'object') {
            // fetchProductSeckillActivity 可能返回活动对象（含 products）或单个商品活动
            if (data.products || data.endTime) {
              currentSeckillInfo = data;
              setSeckillInfo(data);
              if (data.id) setSeckillActivityId(String(data.id));
            } else if (data.seckillPrice !== undefined || data.seckill_price !== undefined) {
              currentSeckillInfo = data;
              setSeckillInfo(data);
              if (data.activityId) setSeckillActivityId(String(data.activityId));
            }
          }
        }

        // 补充活动时间和价格：从活动列表获取更权威的数据（与列表页保持一致）
        if (isSeckillPage && activityId && currentSeckillInfo) {
          try {
            const activitiesRes = await fetchSeckillActivities({ status: 'active' });
            const activities = Array.isArray(activitiesRes?.data) ? activitiesRes.data : [];
            const matchedActivity = activities.find((a: any) => String(a.id) === String(activityId));
            if (matchedActivity) {
              const merged: any = { ...currentSeckillInfo };
              // 补充活动时间
              if (matchedActivity.endTime) {
                merged.endTime = matchedActivity.endTime;
                merged.startTime = matchedActivity.startTime;
              }
              // 补充/覆盖秒杀价格：从活动列表的商品中匹配当前商品，确保和列表页价格一致
              const pid = productRes?.data?.id ?? productRes?.data?.productId ?? productRes?.data?.product_id ?? id;
              if (pid && Array.isArray(matchedActivity.products)) {
                const matchedProduct = matchedActivity.products.find((p: any) =>
                  String(p.productId || p.id) === String(pid)
                );
                if (matchedProduct?.seckillPrice !== undefined && matchedProduct?.seckillPrice !== null) {
                  // 如果是活动对象，覆盖 products 中的价格
                  if (Array.isArray(merged.products)) {
                    merged.products = merged.products.map((p: any) =>
                      String(p.productId || p.id) === String(pid)
                        ? { ...p, seckillPrice: matchedProduct.seckillPrice, originalPrice: matchedProduct.originalPrice }
                        : p
                    );
                  }
                  // 如果是单个商品对象，直接覆盖 seckillPrice
                  merged.seckillPrice = matchedProduct.seckillPrice;
                  merged.originalPrice = matchedProduct.originalPrice;
                  console.log('[秒杀详情] 从活动列表补充秒杀价格:', matchedProduct.seckillPrice);
                }
              }
              currentSeckillInfo = merged;
              setSeckillInfo(merged);
            }
          } catch (e) {
            console.error('[秒杀详情] 补充活动信息失败:', e);
          }
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        Taro.showToast({ title: '加载失败', icon: 'none' });
      } finally {
        setLoading(false);
        setAiLoading(false);
      }
    };

    loadProduct();
  }, []);

  useEffect(() => {
    if (!isSeckill) return;

    const updateCountdown = () => {
      if (!seckillEndTime) {
        setSeckillCountdown('');
        return;
      }
      const now = new Date().getTime();
      const endTime = parseTime(seckillEndTime);

      if (isNaN(endTime)) {
        setSeckillCountdown('');
        return;
      }

      const diff = endTime - now;

      if (diff <= 0) {
        setSeckillCountdown('已结束');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setSeckillCountdown(`${days}天 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      } else {
        setSeckillCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    };

    updateCountdown();
    seckillTimerRef.current = setInterval(updateCountdown, 1000);
    return () => {
      if (seckillTimerRef.current) {
        clearInterval(seckillTimerRef.current);
        seckillTimerRef.current = null;
      }
    };
  }, [isSeckill, seckillEndTime]);

  // 页面隐藏时立即清除定时器，避免微信框架内部页面帧已销毁导致 __subPageFrameEndTime__ 报错
  useDidHide(() => {
    if (seckillTimerRef.current) {
      clearInterval(seckillTimerRef.current);
      seckillTimerRef.current = null;
    }
  });

  if (loading || !product) {
    return (
      <View className={styles.productDetailPage}>
        <View style={{ padding: '100rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.productDetailPage}>
      <ScrollView scrollY style={{ height: 'calc(100vh - 120rpx)', paddingBottom: '260rpx', boxSizing: 'border-box' }}>
        <View className={styles.bannerWrap}>
          <View className={styles.shareBtn} onClick={handleShare}>
            <Text className={styles.shareIcon}>↗</Text>
          </View>
          <View className={styles.productBanner}>
            {(product.images && product.images.length > 0) ? (
              <Swiper
                autoplay={product.images.length > 1}
                interval={3000}
                circular={product.images.length > 1}
                onChange={onBannerChange}
              >
                {product.images.map((image, index) => (
                  <SwiperItem key={index}>
                    <Image src={getImageUrl(image)} mode="aspectFill" {...lazyImgProps()} />
                  </SwiperItem>
                ))}
              </Swiper>
            ) : (
              <Image src={getImageUrl('')} mode="aspectFill" className={styles.productBannerFallback} />
            )}
            <Text className={styles.bannerIndicator}>
              {currentImage + 1}/{product.images.length || 1}
            </Text>
          </View>
        </View>

        <View className={styles.priceSection}>
          <View className={styles.priceRow}>
            <Text className={styles.currentPrice}>
              ¥{isSeckill && seckillPrice !== null ? seckillPrice : (selectedSku?.price || product.price)}
            </Text>
            {isSeckill && seckillPrice !== null && seckillOriginalPrice !== null && seckillOriginalPrice !== seckillPrice && (
              <Text className={styles.originalPrice}>¥{seckillOriginalPrice}</Text>
            )}
            {!isSeckill && product.originalPrice && (
              <Text className={styles.originalPrice}>¥{product.originalPrice}</Text>
            )}
            {isSeckill && (
              <View className={styles.seckillBadge}>
                <Text className={styles.seckillBadgeText}>限时秒杀</Text>
                {seckillCountdown && <Text className={styles.seckillBadgeTime}>{seckillCountdown}</Text>}
              </View>
            )}
          </View>
          <View className={styles.salesRow}>
            <Text className={styles.salesValue}>{product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万` : product.sales}</Text>
            <Text className={styles.salesLabel}>已售</Text>
          </View>
          {product.tags && product.tags.length > 0 && (
            <View className={styles.activityTags}>
              {product.tags.map((tag: string) => (
                <Text key={tag} className={styles.tag}>{tag}</Text>
              ))}
            </View>
          )}
        </View>

        <View className={styles.infoSection}>
          <Text className={styles.productName}>{product.name}</Text>
          <View className={styles.productTags}>
            <Text className={styles.tag}>{product.brandName}</Text>
            <Text className={styles.tag}>{product.categoryName}</Text>
          </View>
        </View>

        <View className={styles.storeSection}>
          <View className={styles.storeHeader}>
            <Text className={styles.sectionTitle}>门店自提</Text>
            <Text className={styles.switchStoreBtn} onClick={handleSwitchStore}>切换门店 &gt;</Text>
          </View>
          <View className={styles.storeInfo}>
            <View className={styles.storeAvatar}>🏪</View>
            <View className={styles.storeDetails}>
              <Text className={styles.storeName}>{currentStore?.name || '请选择门店'}</Text>
              <Text className={styles.storeAddress}>{currentStore?.address || ''}</Text>
              <Text className={styles.storeHours}>营业时间: {currentStore?.hours || ''}</Text>
            </View>
            <View className={styles.storeAction} onClick={callStore}>
              <Text className={styles.phoneIcon}>📞</Text>
              拨打电话
            </View>
          </View>
        </View>

        <View className={styles.evaluateSection}>
            <View className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>商品评价</Text>
              <Text className={styles.viewAll} onClick={goToEvaluations}>查看全部</Text>
            </View>

            {/* 评价统计栏：评分、好评率、评价总数 */}
            {evalStats && (
              <View className={styles.statsBar}>
                <View className={styles.statsScore}>
                  <Text className={styles.statsGoodRate}>好评率 {evalStats.goodRate || 100}%</Text>
                </View>
                <View className={styles.statsCounts}>
                  <Text className={styles.statsCountItem}>
                    <Text className={styles.statsCountNum}>{evalStats.total || 0}</Text>
                    <Text className={styles.statsCountLabel}>条评价</Text>
                  </Text>
                </View>
              </View>
            )}
            
            {/* AI智能总评卡片：始终显示框架，加载中/无内容时展示占位 */}
            <View className={styles.aiSummarySection}>
              <View className={styles.aiSummaryHeader}>
                <View className={styles.aiIconWrap}>
                  <Text className={styles.aiIcon}>🤖</Text>
                </View>
                <Text className={styles.aiSummaryTitle}>AI智能总评</Text>
                <Text className={styles.aiBadge}>AI</Text>
                {aiSummary && aiSummary.averageRating > 0 && (
                  <View className={styles.aiScore}>
                    <Text className={styles.scoreValue}>{Math.round(aiSummary.averageRating * 20)}%</Text>
                    <Text className={styles.scoreLabel}>综合评分</Text>
                  </View>
                )}
              </View>

              {/* 加载中 */}
              {aiLoading && (
                <View className={styles.aiAnalyzing}>
                  <View className={styles.aiDots}>
                    <View className={styles.dot} />
                    <View className={styles.dot} />
                    <View className={styles.dot} />
                  </View>
                  <View className={styles.aiAnalyzingText}>
                    AI 正在分析该商品的评价...
                    <Text className={styles.aiAnalyzingSub}>基于真实用户评价智能生成</Text>
                  </View>
                </View>
              )}

              {/* 加载完成但无内容 */}
              {!aiLoading && aiSummary && !aiSummary.overall && (
                <View className={styles.aiAnalyzing}>
                  <View className={styles.aiDots}>
                    <View className={styles.dot} />
                    <View className={styles.dot} />
                    <View className={styles.dot} />
                  </View>
                  <View className={styles.aiAnalyzingText}>
                    AI 正在分析该商品的评价...
                    <Text className={styles.aiAnalyzingSub}>评价数据积累后将自动生成总评</Text>
                  </View>
                </View>
              )}

              {/* 有 AI 总评内容 */}
              {!aiLoading && aiSummary && aiSummary.overall && (
                <>
                  <Text className={styles.aiOverall}>{aiSummary.overall}</Text>
                  {aiSummary.strengths && aiSummary.strengths.length > 0 && (
                    <View className={styles.aiStrengths}>
                      <Text className={styles.aiLabel}>👍 好评亮点</Text>
                      <View className={styles.aiTags}>
                        {aiSummary.strengths.map((tag: string, idx: number) => (
                          <Text key={idx} className={styles.aiTag}>{tag}</Text>
                        ))}
                      </View>
                    </View>
                  )}
                  {aiSummary.weaknesses && aiSummary.weaknesses.length > 0 && (
                    <View className={styles.aiWeaknesses}>
                      <Text className={styles.aiLabel}>👎 待改进</Text>
                      <View className={styles.aiTags}>
                        {aiSummary.weaknesses.map((tag: string, idx: number) => (
                          <Text key={idx} className={`${styles.aiTag} ${styles.weakTag}`}>{tag}</Text>
                        ))}
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>

            {evaluations.length > 0 ? (
              <View className={styles.evaluateList}>
                {evaluations.map((evaluation) => (
                  <EvaluationItem 
                    key={evaluation.id} 
                    evaluation={evaluation}
                    onLike={handleEvaluationLike}
                    onComment={openCommentModal}
                  />
                ))}
              </View>
            ) : (
              <View className={styles.noEval}>
                <Text className={styles.noEvalIcon}>📝</Text>
                <Text className={styles.noEvalText}>暂无评价，期待您的首次评价</Text>
              </View>
            )}
          </View>

        <View className={styles.detailSection}>
          <Text className={styles.sectionTitle}>商品详情</Text>
          <View className={styles.detailContent}>
            {product.description ? (
              process.env.TARO_ENV === 'h5' ? (
                <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(product.description) }} />
              ) : (
                <RichText nodes={decodeHtmlEntities(product.description)} />
              )
            ) : (
              <Text className={styles.noDetailText}>暂无商品详情</Text>
            )}
          </View>
        </View>

        <View style={{ height: '40rpx' }} />
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.actionIcons} style={{ width: isSeckill ? '150rpx' : '220rpx' }}>
          <View className={styles.actionItem} onClick={goHome}>
            <Text className={styles.icon}>🏠</Text>
            <Text>首页</Text>
          </View>
          <View className={styles.actionItem} onClick={goToCustomerService}>
            <Text className={styles.icon}>💬</Text>
            <Text>客服</Text>
          </View>
          {!isSeckill && (
            <View className={styles.actionItem} onClick={goToCart}>
              <Text className={styles.icon}>🛒</Text>
              <Text>购物车</Text>
            </View>
          )}
        </View>
        <View className={styles.actionButtons}>
          {!isSeckill && (
            <View className={styles.addCartBtn} onClick={() => openSkuModal('cart')}>
              加入购物车
            </View>
          )}
          <View
            className={`${styles.buyNowBtn} ${purchasing ? styles.disabled : ''} ${isSeckill ? styles.seckillBuyBtn : ''}`}
            onClick={() => !purchasing && openSkuModal('buy')}
          >
            <Text className={styles.buyBtnText}>{purchasing ? '抢购中...' : (isSeckill ? '立即抢购' : '立即购买')}</Text>
            {isSeckill && seckillCountdown && (
              <Text className={styles.btnCountdown}>{seckillCountdown}</Text>
            )}
          </View>
        </View>
      </View>

      {showSkuModal && (
        <View className={styles.skuModal}>
          <View className={styles.modalMask} onClick={() => setShowSkuModal(false)} />
          <View className={styles.modalContent}>
            <View className={styles.modalHeader}>
              <Image 
                src={getImageUrl(selectedSku?.image || product.images[0])}
                className={styles.selectedImage}
                mode="aspectFill"
                {...lazyImgProps()}
              />
              <View className={styles.selectedInfo}>
                <View className={styles.selectedPriceRow}>
                  <Text className={styles.selectedPrice}>
                    ¥{isSeckill && seckillPrice !== null ? seckillPrice : (selectedSku?.price || product.price)}
                  </Text>
                  {isSeckill && seckillPrice !== null && seckillOriginalPrice !== null && seckillOriginalPrice !== seckillPrice && (
                    <Text className={styles.selectedOriginalPrice}>¥{seckillOriginalPrice}</Text>
                  )}
                </View>
                <Text className={styles.selectedStock}>库存: {selectedSku?.stock || 0} 件</Text>
                <Text className={styles.selectedName}>{selectedSku?.name || '请选择规格'}</Text>
              </View>
              <View className={styles.closeBtn} onClick={() => setShowSkuModal(false)}>×</View>
            </View>
            
            <View className={styles.modalBody}>
              {product.skus.length > 0 && Object.keys(getAllSpecOptions(product.skus)).map((specName) => (
                <SkuOptionGroup
                  key={specName}
                  specName={specName}
                  product={product}
                  specSelections={specSelections}
                  availableValues={getAvailableSpecValues(specName)}
                  onSelect={selectSpec}
                />
              ))}
              
              <View className={styles.quantityRow}>
                <Text className={styles.quantityLabel}>购买数量</Text>
                <View className={styles.quantityControl}>
                  <View 
                    className={`${styles.quantityBtn} ${quantity <= 1 ? styles.disabled : ''}`}
                    onClick={decreaseQuantity}
                  >
                    -
                  </View>
                  <Text className={styles.quantityNum}>{quantity}</Text>
                  <View className={styles.quantityBtn} onClick={increaseQuantity}>+</View>
                </View>
              </View>
            </View>
            
            <View className={styles.modalFooter}>
              <View
                className={`${styles.confirmBtn} ${isSeckill ? styles.seckillConfirmBtn : ''}`}
                onClick={isSeckill ? handleBuyNow : (skuModalType === 'cart' ? handleAddToCart : handleBuyNow)}
              >
                确定{isSeckill ? '立即抢购' : (skuModalType === 'cart' ? '加入购物车' : '立即购买')}
              </View>
            </View>
          </View>
        </View>
      )}

      {showCommentModal && currentEvaluation && (
        <View className={styles.commentModal}>
          <View className={styles.modalMask} onClick={closeCommentModal} />
          <View className={styles.commentModalContent}>
            <View className={styles.commentModalHeader}>
              <Text className={styles.commentModalTitle}>全部讨论</Text>
              <View className={styles.commentModalClose} onClick={closeCommentModal}>
                <Text>×</Text>
              </View>
            </View>
            <ScrollView scrollY className={styles.commentModalBody}>
              {!currentEvaluation.comments || currentEvaluation.comments.length === 0 ? (
                <View className={styles.emptyComment}>
                  <Text>暂无评论，快来发表第一条评论吧~</Text>
                </View>
              ) : (
                <View className={styles.commentList}>
                  {currentEvaluation.comments.map((comment: any) => (
                    <View key={comment.id} className={styles.commentItem}>
                      <Image 
                        src={getImageUrl(comment.userAvatar)}
                        className={styles.commentAvatar} 
                        mode="aspectFill" 
                        {...lazyImgProps()}
                      />
                      <View className={styles.commentContent}>
                        <View className={styles.commentHeader}>
                          <Text className={styles.commentUserName}>{comment.userName}</Text>
                          <Text className={styles.commentTime}>{formatDateTime(comment.createdAt || comment.createTime)}</Text>
                        </View>
                        <Text className={styles.commentText}>{comment.content}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
            <View className={styles.commentModalFooter}>
              <Input 
                className={styles.commentInput}
                placeholder="说说你的想法~"
                value={commentInput}
                onInput={(e: any) => setCommentInput(e.detail.value)}
                onConfirm={sendComment}
              />
              <View className={styles.commentSendBtn} onClick={sendComment}>
                <Text>提问</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default React.memo(ProductDetailPage);
