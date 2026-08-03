import coffeeIcon from '@/icons/category/coffee.svg';
import phoneIcon from '@/icons/category/phone.svg';
import smartphoneIcon from '@/icons/category/smartphone.svg';
import accessoryIcon from '@/icons/category/accessory.svg';
import runningshoeIcon from '@/icons/category/runningshoe.svg';
import nutsnackIcon from '@/icons/category/nutsnack.svg';
import sneakerIcon from '@/icons/category/sneaker.svg';
import foodIcon from '@/icons/category/food.svg';

const categoryIconMap: { keywords: string[]; icon: string }[] = [
  { keywords: ['奶茶', '咖啡', '茶', 'coffee', 'drink'], icon: coffeeIcon },
  { keywords: ['智能手机', 'smartphone'], icon: smartphoneIcon },
  { keywords: ['手机配件', '配件', 'accessory'], icon: accessoryIcon },
  { keywords: ['手机', '数码', '电子', 'phone', 'digital', 'mobile'], icon: phoneIcon },
  { keywords: ['跑步鞋', '跑鞋', 'runningshoe', 'running'], icon: runningshoeIcon },
  { keywords: ['坚果', '零食', 'nut', 'snack', 'nutsnack'], icon: nutsnackIcon },
  { keywords: ['运动', '鞋', '服', 'sport', 'sneaker', 'shoe', '跑步'], icon: sneakerIcon },
  { keywords: ['食品', '生鲜', '超市', 'food', 'fresh', 'grocery'], icon: foodIcon },
];

export function getCategoryIcon(categoryName: string, fallbackIcon?: string): string {
  if (!categoryName) return fallbackIcon || '';

  const nameLower = categoryName.toLowerCase();
  const matched = categoryIconMap.find(item =>
    item.keywords.some(kw => nameLower.includes(kw.toLowerCase()))
  );

  return matched ? matched.icon : (fallbackIcon || phoneIcon);
}