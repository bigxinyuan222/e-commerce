// ============================================
// 订单列表页 - 数据获取
// ============================================

import { Order, OrderStatus } from './types';

// 从全局数据导入
import { getOrdersByStatus, cancelOrder, payOrder, confirmPickup, applyRefund } from '@/data/order/orders';

// 获取订单列表
export function getOrders(status: OrderStatus | 'all'): Order[] {
  if (status === 'all') {
    // 获取所有订单
    const allOrders = [
      ...getOrdersByStatus('pending_payment'),
      ...getOrdersByStatus('pending_pickup'),
      ...getOrdersByStatus('completed'),
      ...getOrdersByStatus('cancelled'),
      ...getOrdersByStatus('refunding'),
    ];
    return allOrders as Order[];
  }
  return getOrdersByStatus(status) as Order[];
}

// 取消订单
export function cancelOrderById(orderId: string): boolean {
  return cancelOrder(orderId);
}

// 支付订单
export function payOrderById(orderId: string): boolean {
  return payOrder(orderId);
}

// 确认自提
export function confirmPickupById(orderId: string): boolean {
  return confirmPickup(orderId);
}

// 申请退款
export function applyRefundById(orderId: string): boolean {
  return applyRefund(orderId);
}

// 获取订单详情
export function getOrderDetail(orderId: string): Order | null {
  const allOrders = getOrders('all');
  return allOrders.find(o => o.id === orderId) || null;
}