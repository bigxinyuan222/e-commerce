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
  description?: string;
  businessHours?: string;
  status?: string;
}

// 兼容后端多种字段命名（snake_case / camelCase / PascalCase）
// 将后端返回的原始门店对象统一转换为前端 Store 结构
export function normalizeStore(raw: any): Store {
  if (!raw || typeof raw !== 'object') {
    return null as any;
  }

  const pickStr = (...keys: string[]): string => {
    for (const k of keys) {
      const v = raw[k];
      if (v !== undefined && v !== null && v !== '') return String(v);
    }
    return '';
  };

  const pickNum = (...keys: string[]): number => {
    for (const k of keys) {
      const v = raw[k];
      if (v !== undefined && v !== null && v !== '') {
        const n = Number(v);
        if (!isNaN(n)) return n;
      }
    }
    return 0;
  };

  const pickArr = (...keys: string[]): string[] => {
    for (const k of keys) {
      const v = raw[k];
      if (Array.isArray(v)) return v.map((x: any) => String(x));
      if (typeof v === 'string' && v) {
        // 兼容后端以逗号分隔的字符串
        return v.split(/[,，|]/).map((s: string) => s.trim()).filter(Boolean);
      }
    }
    return [];
  };

  const id = pickStr('id', 'ID', 'storeId', 'store_id', 'shopId', 'shop_id');
  const name = pickStr('name', 'Name', 'storeName', 'store_name', 'shopName', 'shop_name', 'title');
  const address = pickStr('address', 'Address', 'storeAddress', 'store_address', 'addr', 'location');
  const phone = pickStr('phone', 'Phone', 'tel', 'telephone', 'mobile', 'contactPhone', 'contact_phone', 'contact');
  const hours = pickStr('hours', 'Hours', 'businessHours', 'business_hours', 'openHours', 'open_hours', 'workTime', 'work_time', '营业时间');
  const image = pickStr('image', 'Image', 'logo', 'avatar', 'cover', 'coverImage', 'cover_image', 'pic', 'picture', 'img');
  const description = pickStr('description', 'desc', 'intro', 'remark', 'Description', 'Description', 'introduction');
  const status = pickStr('status', 'Status', 'storeStatus', 'store_status', 'state');

  const distance = pickNum('distance', 'Distance', 'dist');
  const lat = pickNum('lat', 'latitude', 'Latitude', 'Lat');
  const lng = pickNum('lng', 'lon', 'lng', 'longitude', 'Longitude', 'Lng', 'Lon');

  const service = pickArr('service', 'services', 'Service', 'Services', 'serviceList', 'service_list', 'tags', 'features', 'supportServices');

  return {
    id: id || `store-${Date.now()}`,
    name: name || '未知门店',
    address,
    phone,
    hours,
    distance,
    lat,
    lng,
    service,
    image,
    description,
    businessHours: hours,
    status
  };
}

// 批量归一化门店列表，兼容后端返回的多种包裹结构
export function normalizeStoreList(res: any): Store[] {
  if (!res) return [];
  let list: any[] = [];
  if (Array.isArray(res)) {
    list = res;
  } else if (Array.isArray(res.data)) {
    list = res.data;
  } else if (res.data && Array.isArray(res.data.list)) {
    list = res.data.list;
  } else if (res.data && Array.isArray(res.data.items)) {
    list = res.data.items;
  } else if (res.data && Array.isArray(res.data.stores)) {
    list = res.data.stores;
  } else if (Array.isArray(res.list)) {
    list = res.list;
  } else if (Array.isArray(res.items)) {
    list = res.items;
  } else if (Array.isArray(res.stores)) {
    list = res.stores;
  }
  return list.map(normalizeStore).filter(Boolean);
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
