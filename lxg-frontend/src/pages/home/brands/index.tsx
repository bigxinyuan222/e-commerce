import { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { apiGet } from '@/api/common';
import { brandApi } from '@/api/home';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import styles from '@/styles/home/brands.module.scss';

/**
 * 规范化品牌数据
 * 兼容后端 snake_case / PascalCase / camelCase 字段
 * 兼容 id/brandId/code/brandCode 作为 ID
 * 兼容 children/child/subBrands/subs 作为子品牌
 * 兼容 productsCount/count/num/productNum/product_num/total 作为商品数
 */
function normalizeBrand(item: any): any {
  if (!item) return null;
  const id = item.id ?? item.ID ?? item.brandId ?? item.BrandId ?? item.code ?? item.Code ?? item.brandCode ?? item.BrandCode ?? '';
  const name = item.name ?? item.Name ?? item.brandName ?? item.BrandName ?? '';
  const logo = item.logo ?? item.Logo ?? item.icon ?? item.Icon ?? item.image ?? item.Image ?? '';
  const description = item.description ?? item.Description ?? item.desc ?? item.Desc ?? item.intro ?? item.Intro ?? '';
  const productsCount = item.productsCount ?? item.ProductsCount ?? item.count ?? item.Count ?? item.num ?? item.Num ?? item.productNum ?? item.product_num ?? item.total ?? item.Total ?? 0;
  const isHot = item.isHot ?? item.IsHot ?? item.hot ?? item.Hot ?? false;

  // 子品牌递归处理
  const rawChildren = item.children || item.child || item.subBrands || item.subs || item.list || item.items || [];
  const children = rawChildren.map(normalizeBrand).filter(Boolean);

  return {
    id: String(id),
    name,
    logo,
    description,
    productsCount: Number(productsCount) || 0,
    isHot: !!isHot,
    children,
  };
}

/**
 * 扁平化品牌树，提取所有叶子节点和父节点为一维数组
 * 用于「全部品牌」展示
 */
function flattenBrands(tree: any[]): any[] {
  const result: any[] = [];
  const walk = (nodes: any[]) => {
    if (!Array.isArray(nodes)) return;
    nodes.forEach(node => {
      if (!node) return;
      result.push(node);
      if (node.children && node.children.length > 0) {
        walk(node.children);
      }
    });
  };
  walk(tree);
  return result;
}

const BrandsPage = function() {
  const [activeTab, setActiveTab] = useState('hot');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [brandTree, setBrandTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载品牌树
  const loadBrandTree = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGet(brandApi.brandTree);
      if (res?.data) {
        const rawData = Array.isArray(res.data) ? res.data : res.data?.list || res.data?.data || [];
        const normalized = rawData.map(normalizeBrand).filter(Boolean);

        // 品牌树接口不返回 productsCount，通过商品接口并行获取每个品牌的商品数
        const counts = await Promise.all(
          normalized.map(async (brand: any) => {
            try {
              const r = await apiGet(brandApi.brandProducts, { id: brand.id, page: 1, size: 1 });
              const total = r?.data?.total ?? r?.total ?? r?.data?.Total ?? 0;
              return { id: brand.id, count: total };
            } catch {
              return { id: brand.id, count: 0 };
            }
          })
        );
        const countMap = new Map(counts.map(c => [c.id, c.count]));
        const withCounts = normalized.map((b: any) => ({
          ...b,
          productsCount: countMap.get(b.id) || b.productsCount || 0,
        }));

        setBrandTree(withCounts);
      }
    } catch (error) {
      console.error('Failed to load brand tree:', error);
      Taro.showToast({ title: '加载品牌失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrandTree();
  }, [loadBrandTree]);

  // 扁平化所有品牌用于展示和搜索
  const allBrands = flattenBrands(brandTree);

  // 当前展示的品牌列表
  let displayBrands: any[];
  if (searchKeyword) {
    const lowerKw = searchKeyword.toLowerCase();
    displayBrands = allBrands.filter(function(brand) {
      return (brand.name || '').toLowerCase().indexOf(lowerKw) > -1 ||
             (brand.description || '').toLowerCase().indexOf(lowerKw) > -1;
    });
  } else {
    displayBrands = activeTab === 'hot' ? allBrands.filter(b => b.isHot) : allBrands;
  }
  // 热门标签为空时回退到全部
  if (!searchKeyword && activeTab === 'hot' && displayBrands.length === 0 && allBrands.length > 0) {
    displayBrands = allBrands;
  }

  const goToBrandDetail = function(brandId: string) {
    if (!brandId) return;
    Taro.navigateTo({ url: '/pages/home/brand-detail/index?id=' + brandId });
  };

  if (loading) {
    return (
      <View className={styles.brandsPage}>
        <View style={{ padding: '200rpx', textAlign: 'center' }}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.brandsPage}>
      <View className={styles.searchBar}>
        <View className={styles.searchInputWrap}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchInput}
            placeholder="搜索品牌"
            value={searchKeyword}
            onInput={(e: any) => setSearchKeyword(e.detail.value)}
          />
          {searchKeyword && (
            <Text className={styles.clearIcon} onClick={function() { setSearchKeyword(''); }}>✕</Text>
          )}
        </View>
      </View>

      <View className={styles.tabs}>
        <Text
          className={activeTab === 'hot' ? styles.tab + ' ' + styles.active : styles.tab}
          onClick={function() { setActiveTab('hot'); }}
        >
          热门品牌
        </Text>
        <Text
          className={activeTab === 'all' ? styles.tab + ' ' + styles.active : styles.tab}
          onClick={function() { setActiveTab('all'); }}
        >
          全部品牌
        </Text>
      </View>

      <ScrollView scrollY className={styles.brandList}>
        <View className={styles.brandGrid}>
          {displayBrands.map(function(brand) {
            return (
              <View
                key={brand.id}
                className={styles.brandItem}
                onClick={function() { goToBrandDetail(brand.id); }}
              >
                <View className={styles.brandLogoWrap}>
                  <Image
                    src={getImageUrl(brand.logo)}
                    className={styles.brandLogo}
                    mode="aspectFill"
                    {...lazyImgProps()}
                  />
                  {brand.isHot && (
                    <View className={styles.hotTag}>
                      <Text className={styles.hotTagText}>HOT</Text>
                    </View>
                  )}
                </View>
                <Text className={styles.brandName}>{brand.name}</Text>
                <Text className={styles.brandProductCount}>{brand.productsCount}款商品</Text>
              </View>
            );
          })}
        </View>

        {displayBrands.length === 0 && (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🔍</Text>
            <Text className={styles.emptyText}>未找到相关品牌</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BrandsPage;
