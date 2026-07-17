// 门店数据
export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  distance: number;
  lat: number;
  lng: number;
  service: string[];
  image: string;
}

// 所有门店
export const stores: Store[] = [
  {
    id: 'store-1',
    name: '深圳南山科技园店',
    address: '广东省深圳市南山区科技园南区A2栋1楼',
    phone: '0755-12345678',
    hours: '09:00-22:00',
    distance: 1.2,
    lat: 22.5431,
    lng: 113.9472,
    service: ['自提', '售后', '维修'],
    image: ''
  },
  {
    id: 'store-2',
    name: '深圳福田CBD店',
    address: '广东省深圳市福田区华强北街道100号',
    phone: '0755-87654321',
    hours: '10:00-21:00',
    distance: 3.5,
    lat: 22.5412,
    lng: 114.0565,
    service: ['自提', '体验'],
    image: ''
  },
  {
    id: 'store-3',
    name: '深圳龙华店',
    address: '广东省深圳市龙华区龙华街道88号',
    phone: '0755-23456789',
    hours: '09:30-21:30',
    distance: 8.2,
    lat: 22.6529,
    lng: 114.0575,
    service: ['自提', '售后'],
    image: ''
  }
];

// 根据ID获取门店
export const getStoreById = (id: string): Store | undefined => {
  return stores.find(store => store.id === id);
};

// 获取最近的门店
export const getNearbyStores = (lat?: number, lng?: number): Store[] => {
  if (!lat || !lng) {
    return stores;
  }
  return stores.sort((a, b) => {
    const distA = Math.sqrt(Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2));
    const distB = Math.sqrt(Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2));
    return distA - distB;
  });
};
