export const brands = [
  { id: 'brand-apple', name: 'Apple', logo: 'https://picsum.photos/id/10/200/200', description: '苹果公司', categoryIds: ['1'], productsCount: 3, isHot: true },
  { id: 'brand-huawei', name: '华为', logo: 'https://picsum.photos/id/11/200/200', description: '华为技术有限公司', categoryIds: ['1', '2'], productsCount: 2, isHot: true },
  { id: 'brand-samsung', name: 'Samsung', logo: 'https://picsum.photos/id/12/200/200', description: '三星电子', categoryIds: ['1', '2'], productsCount: 2, isHot: true },
  { id: 'brand-nike', name: 'Nike', logo: 'https://picsum.photos/id/13/200/200', description: '耐克', categoryIds: ['3'], productsCount: 2 },
  { id: 'brand-adidas', name: 'Adidas', logo: 'https://picsum.photos/id/14/200/200', description: '阿迪达斯', categoryIds: ['3'], productsCount: 1 },
  { id: 'brand-sk2', name: 'SK-II', logo: 'https://picsum.photos/id/15/200/200', description: 'SK-II', categoryIds: ['4'], productsCount: 2, isHot: true },
  { id: 'brand-olay', name: 'Olay', logo: 'https://picsum.photos/id/16/200/200', description: '玉兰油', categoryIds: ['4'], productsCount: 1 },
  { id: 'brand-midea', name: '美的', logo: 'https://picsum.photos/id/17/200/200', description: '美的集团', categoryIds: ['2'], productsCount: 2 },
  { id: 'brand-haier', name: '海尔', logo: 'https://picsum.photos/id/18/200/200', description: '海尔集团', categoryIds: ['2'], productsCount: 1 },
  { id: 'brand-anchor', name: '安佳', logo: 'https://picsum.photos/id/19/200/200', description: '安佳', categoryIds: ['5'], productsCount: 2 },
  { id: 'brand-abbott', name: '雅培', logo: 'https://picsum.photos/id/20/200/200', description: '雅培', categoryIds: ['6'], productsCount: 2, isHot: true },
  { id: 'brand-pampers', name: '帮宝适', logo: 'https://picsum.photos/id/21/200/200', description: '帮宝适', categoryIds: ['6'], productsCount: 2 },
  { id: 'brand-huawei-home', name: '华为智选', logo: 'https://picsum.photos/id/22/200/200', description: '华为智选', categoryIds: ['7'], productsCount: 2 },
  { id: 'brand-lovo', name: 'LOVO乐蜗', logo: 'https://picsum.photos/id/23/200/200', description: 'LOVO乐蜗', categoryIds: ['7'], productsCount: 2 },
  { id: 'brand-dyson', name: '戴森', logo: 'https://picsum.photos/id/24/200/200', description: '戴森', categoryIds: ['2', '7'], productsCount: 2, isHot: true },
  { id: 'brand-lego', name: '乐高', logo: 'https://picsum.photos/id/25/200/200', description: '乐高', categoryIds: ['6'], productsCount: 1 }
];

export function getHotBrands() {
  var result = [];
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].isHot) {
      result.push(brands[i]);
    }
  }
  return result;
}

export function getBrandsByCategory(categoryId) {
  var result = [];
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].categoryIds.indexOf(categoryId) > -1) {
      result.push(brands[i]);
    }
  }
  return result;
}

export function getBrandById(id) {
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].id === id) {
      return brands[i];
    }
  }
  return undefined;
}

export function searchBrands(keyword) {
  var lowerKeyword = keyword.toLowerCase();
  var result = [];
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].name.toLowerCase().indexOf(lowerKeyword) > -1 ||
        brands[i].description.toLowerCase().indexOf(lowerKeyword) > -1) {
      result.push(brands[i]);
    }
  }
  return result;
}