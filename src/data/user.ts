// ============================================
// 用户与地址数据
// ============================================

export const userInfo = {
  id: 'user-1',
  nickname: '商城用户',
  avatar: 'https://picsum.photos/id/64/200/200',
  phone: '138****8888'
};

export const addresses = [
  {
    id: 'addr-1',
    name: '张三',
    phone: '13812345678',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区A1栋501室',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: '李四',
    phone: '13987654321',
    province: '广东省',
    city: '广州市',
    district: '天河区',
    detail: '珠江新城花城大道88号',
    isDefault: false
  },
  {
    id: 'addr-3',
    name: '王五',
    phone: '13765432109',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '建国路89号国贸中心',
    isDefault: false
  }
];

// 收货地址相关类型
export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

// 获取默认地址
export function getDefaultAddress(): Address | undefined {
  return addresses.find(addr => addr.isDefault);
}

// 根据ID获取地址
export function getAddressById(id: string): Address | undefined {
  return addresses.find(addr => addr.id === id);
}

// 格式化地址为字符串
export function formatAddress(address: Address): string {
  return `${address.province}${address.city}${address.district}${address.detail}`;
}
