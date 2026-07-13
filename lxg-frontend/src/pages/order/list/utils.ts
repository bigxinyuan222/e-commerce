// ============================================
// 订单列表页 - 工具函数
// ============================================

import { Order, OrderStatus } from './types';

// 格式化订单状态文本
export function formatOrderStatus(status: OrderStatus): string {
  const statusMap: { [key: string]: string } = {
    'pending_payment': '待支付',
    'pending_pickup': '待自提',
    'completed': '已完成',
    'cancelled': '已取消',
    'refunding': '退款中',
  };
  return statusMap[status] || '未知状态';
}

// 格式化订单价格
export function formatOrderPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

// 格式化订单时间
export function formatOrderTime(time: string): string {
  if (!time) return '';
  const date = new Date(time);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

// 获取订单状态颜色
export function getOrderStatusColor(status: OrderStatus): string {
  const colorMap: { [key: string]: string } = {
    'pending_payment': '#e2231a',
    'pending_pickup': '#ff6600',
    'completed': '#52c41a',
    'cancelled': '#999',
    'refunding': '#faad14',
  };
  return colorMap[status] || '#333';
}

// 检查订单是否可取消
export function canCancelOrder(order: Order): boolean {
  return order.status === 'pending_payment';
}

// 检查订单是否可支付
export function canPayOrder(order: Order): boolean {
  return order.status === 'pending_payment';
}

// 检查订单是否可确认自提
export function canConfirmPickup(order: Order): boolean {
  return order.status === 'pending_pickup';
}

// 检查订单是否可申请退款
export function canApplyRefund(order: Order): boolean {
  return order.status === 'completed';
}

// 计算订单商品总数
export function calculateOrderProductCount(order: Order): number {
  return order.products.reduce((sum, p) => sum + p.quantity, 0);
}