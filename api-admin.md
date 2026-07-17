# 乐享购接口文档 - 后台（管理端）

> 后台接口服务于 Web 管理端
> 基础路径：`/api/admin/v1`
> 认证方式：JWT Bearer Token（Header: `Authorization: Bearer <token>`）

---

## 公共规范

### 统一响应格式

```json
{ "code": 0, "message": "success", "data": {} }
```

### 分页

请求参数 `page`（默认1）、`page_size`（默认20，最大50），响应含 `list, total, page, page_size`。

### 权限说明

| 角色 | 可访问模块 |
|------|-----------|
| 超级管理员 | 全部 |
| 商品运营 | 数据统计、商品、库存、评价、优惠券、营销活动 |
| 订单客服 | 订单、客服消息 |
| 门店店员 | 门店总览、本门店订单、本门店退款 |

---

## 一、管理员认证

### 1.1 管理员登录

- **路径**：`POST /auth/login`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |

**响应**：

```json
{ "data": { "token": "jwt_token", "admin": { "id": 1, "username": "admin", "name": "超级管理员", "role": { "id": 1, "name": "超级管理员" } } } }
```

### 1.2 获取当前管理员信息

- **路径**：`GET /auth/info`
- **认证**：是

**响应**：同登录中的 `admin` 对象，额外含 `phone, status, store{id,name}`

### 1.3 退出登录

- **路径**：`POST /auth/logout`
- **认证**：是

---

## 二、数据统计

### 2.1 销售统计看板

- **路径**：`GET /stats/dashboard`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| period | string | 否 | today/yesterday/7d/30d/custom，默认 today |
| start_date | string | 否 | 自定义开始日期 |
| end_date | string | 否 | 自定义结束日期 |

**响应**：

```json
{
  "data": {
    "sales_amount": "58990.00", "order_count": 25, "avg_order_amount": "2359.60",
    "new_user_count": 12,
    "trend": [{ "date": "2026-07-01", "amount": "8990.00" }],
    "top_products": [{ "id": 1, "name": "华为Mate60", "sales": 50, "amount": "299950.00" }]
  }
}
```

### 2.2 商品分析

- **路径**：`GET /stats/products`
- **认证**：是
- **权限**：超级管理员、商品运营

**响应**：

```json
{
  "data": {
    "total_products": 200, "on_sale": 150, "off_sale": 50,
    "low_stock_skus": [{ "sku_id": 10, "product_name": "华为Mate60", "spec_values": { "颜色": "黑色" }, "stock": 3 }]
  }
}
```

---

## 三、商品管理

### 3.1 商品列表

- **路径**：`GET /products`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 搜索（商品名/SKU编码） |
| status | int | 否 | 0=下架 1=上架 |
| category_id | int | 否 | 分类ID |
| brand_id | int | 否 | 品牌ID |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, name, images[0], category{name}, brand{name}, status, sku_count, created_at`

### 3.2 商品详情

- **路径**：`GET /products/:id`
- **认证**：是

**响应**：完整商品信息 + specs + skus + review_summary

### 3.3 创建商品

- **路径**：`POST /products`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 商品名称 |
| description | string | 否 | 商品描述 |
| brand_id | int | 是 | 品牌ID |
| category_id | int | 是 | 分类ID（二级分类） |
| images | string[] | 是 | 轮播图URL数组 |
| status | int | 否 | 0=下架 1=上架，默认0 |
| specs | array | 是 | 规格数组，见下方结构 |
| skus | array | 是 | SKU数组，见下方结构 |

**specs 结构**：

```json
[
  { "name": "颜色", "values": ["黑色", "白色"] },
  { "name": "存储", "values": ["128G", "256G"] }
]
```

**skus 结构**：

```json
[
  { "spec_values": { "颜色": "黑色", "存储": "128G" }, "price": "5999.00", "stock": 100, "sku_code": "HW-M60-BK-128", "image": "" }
]
```

### 3.4 编辑商品

- **路径**：`PUT /products/:id`
- **认证**：是
- **权限**：超级管理员、商品运营
- **参数**：同创建商品

### 3.5 上下架切换

- **路径**：`PUT /products/:id/toggle`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 是 | 0=下架 1=上架 |

### 3.6 删除商品

- **路径**：`DELETE /products/:id`
- **认证**：是
- **说明**：软删除商品 + 关联 SKU

### 3.7 批量操作

- **路径**：`POST /products/batch`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| action | string | 是 | on_sale/off_sale/delete |
| ids | int[] | 是 | 商品ID数组 |

---

## 四、分类管理

### 4.1 分类列表（树形）

- **路径**：`GET /categories`
- **认证**：是

**响应**：两级树形结构，每项含 `id, name, parent_id, sort, status, children[]`

### 4.2 创建分类

- **路径**：`POST /categories`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 分类名称 |
| parent_id | int | 否 | 父级ID，0=一级分类 |
| sort | int | 否 | 排序值，默认0 |

### 4.3 编辑分类

- **路径**：`PUT /categories/:id`
- **认证**：是
- **参数**：同创建

### 4.4 启用/禁用分类

- **路径**：`PUT /categories/:id/toggle`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 是 | 0=禁用 1=启用 |

### 4.5 删除分类

- **路径**：`DELETE /categories/:id`
- **认证**：是
- **说明**：有子分类或关联商品时不可删除

### 4.6 批量更新排序

- **路径**：`PUT /categories/sort`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| items | array | 是 | `[{"id": 3, "sort": 0}, {"id": 1, "sort": 1}]` |

---

## 五、品牌管理

### 5.1 品牌列表

- **路径**：`GET /brands`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 搜索品牌名 |
| status | int | 否 | 0=禁用 1=启用 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

### 5.2 创建品牌

- **路径**：`POST /brands`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 品牌名称 |
| logo | string | 否 | Logo URL |

### 5.3 编辑品牌

- **路径**：`PUT /brands/:id`
- **认证**：是

### 5.4 启用/禁用品牌

- **路径**：`PUT /brands/:id/toggle`
- **认证**：是

### 5.5 删除品牌

- **路径**：`DELETE /brands/:id`
- **认证**：是
- **说明**：有关联商品时不可删除

---

## 六、规格管理

### 6.1 规格列表

- **路径**：`GET /specifications`
- **认证**：是

**响应**：列表，每项含 `id, name, sort, status, values[{id, value, sort}]`

### 6.2 创建规格

- **路径**：`POST /specifications`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 规格名（如"颜色"） |
| sort | int | 否 | 排序 |
| values | array | 否 | `[{"value": "红色", "sort": 0}]` |

### 6.3 编辑规格

- **路径**：`PUT /specifications/:id`
- **认证**：是

### 6.4 删除规格

- **路径**：`DELETE /specifications/:id`
- **认证**：是

### 6.5 创建规格值

- **路径**：`POST /specifications/:id/values`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| value | string | 是 | 规格值 |
| sort | int | 否 | 排序 |

### 6.6 编辑规格值

- **路径**：`PUT /specifications/values/:id`
- **认证**：是

### 6.7 删除规格值

- **路径**：`DELETE /specifications/values/:id`
- **认证**：是

---

## 七、评价管理

### 7.1 评价列表

- **路径**：`GET /reviews`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 商品名/SKU编码 |
| review_type | int | 否 | 1=好评 2=差评 |
| status | int | 否 | 0=待审核 1=显示 2=已拒绝 |
| start_date | string | 否 | 开始日期 |
| end_date | string | 否 | 结束日期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, user{nickname,avatar}, product{name}, review_type, content, images, like_count, reply_count, status, created_at`

### 7.2 评价详情

- **路径**：`GET /reviews/:id`
- **认证**：是

**响应**：完整评价 + admin_reply + replies[] + like_users[]

### 7.3 审核评价

- **路径**：`PUT /reviews/:id/audit`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 是 | 1=通过(显示) 2=拒绝 |

### 7.4 隐藏评价

- **路径**：`PUT /reviews/:id/hide`
- **认证**：是
- **说明**：将已显示(status=1)的评价设为待审核(status=0)

### 7.5 管理员回复评价

- **路径**：`PUT /reviews/:id/reply`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| admin_reply | string | 是 | 回复内容（一条评价只能回复一次） |

### 7.6 删除用户回复

- **路径**：`DELETE /reviews/replies/:id`
- **认证**：是
- **说明**：软删除 review_reply

### 7.7 AI摘要列表

- **路径**：`GET /review-summaries`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 否 | 0=待审核 1=已发布 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, product{id,name}, content, generated_at, status`

### 7.8 审核摘要

- **路径**：`PUT /review-summaries/:id/audit`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 是 | 1=发布 2=拒绝(删除并重新生成) |

### 7.9 编辑摘要

- **路径**：`PUT /review-summaries/:id`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 修改后的摘要内容 |

### 7.10 手动生成摘要

- **路径**：`POST /review-summaries/generate`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| product_id | int | 是 | 商品ID |

---

## 八、库存管理

### 8.1 出入库记录列表

- **路径**：`GET /inventory-logs`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | SKU编码/商品名 |
| type | int | 否 | 1=销售出库 2=采购入库 3=损耗 4=盘盈 5=盘亏 |
| start_date | string | 否 | 开始日期 |
| end_date | string | 否 | 结束日期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, sku{sku_code, product{name}}, type, quantity, before_stock, after_stock, operator_name, reason, created_at`

### 8.2 手动调整库存

- **路径**：`POST /inventory/adjust`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| sku_id | int | 是 | SKU ID |
| type | int | 是 | 2=采购入库 3=损耗 4=盘盈 5=盘亏 |
| quantity | int | 是 | 变动数量（正=入库，负=出库） |
| reason | string | 是 | 变动原因 |

---

## 九、秒杀活动管理

### 9.1 活动列表

- **路径**：`GET /seckill/activities`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 否 | 0/1/2/3 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

### 9.2 活动详情

- **路径**：`GET /seckill/activities/:id`
- **认证**：是

**响应**：活动信息 + items[]（含 product 基本信息 + sku_prices[]）

### 9.3 创建活动

- **路径**：`POST /seckill/activities`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 活动名称 |
| start_time | string | 是 | 开始时间 |
| end_time | string | 是 | 结束时间 |

### 9.4 编辑活动

- **路径**：`PUT /seckill/activities/:id`
- **认证**：是
- **说明**：进行中的活动不可编辑

### 9.5 关闭活动

- **路径**：`PUT /seckill/activities/:id/close`
- **认证**：是
- **说明**：提前结束活动，status=3

### 9.6 删除活动

- **路径**：`DELETE /seckill/activities/:id`
- **认证**：是
- **说明**：软删除，仅未开始/已关闭可删

### 9.7 添加秒杀商品

- **路径**：`POST /seckill/activities/:id/products`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| product_id | int | 是 | 商品ID |
| sku_prices | array | 是 | `[{"sku_id": 1, "seckill_price": "4999.00", "stock_limit": 50}]` |

### 9.8 移除秒杀商品

- **路径**：`DELETE /seckill/activities/:id/products/:product_id`
- **认证**：是

### 9.9 查看商品SKU秒杀价

- **路径**：`GET /seckill/activities/:id/products/:product_id/skus`
- **认证**：是

**响应**：

```json
{
  "data": [
    { "id": 1, "sku_id": 1, "spec_values": { "颜色": "黑色" }, "seckill_price": "4999.00", "stock_limit": 50, "sold_count": 10, "original_price": "5999.00" }
  ]
}
```

### 9.10 更新SKU秒杀价

- **路径**：`PUT /seckill/sku-prices/:id`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| seckill_price | string | 否 | 秒杀价 |
| stock_limit | int | 否 | 库存限制 |

---

## 十、订单管理

### 10.1 订单列表

- **路径**：`GET /orders`
- **认证**：是
- **权限**：超级管理员、订单客服、门店店员（门店店员仅看本门店）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 订单号/用户手机号 |
| status | int | 否 | 0/2/3/4/5 |
| store_id | int | 否 | 门店ID |
| start_date | string | 否 | 开始日期 |
| end_date | string | 否 | 结束日期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, order_no, user{nickname,phone}, items[0]{product_name,image}, total_amount, pay_amount, store{name}, status, created_at`

### 10.2 订单详情

- **路径**：`GET /orders/:id`
- **认证**：是

**响应**：完整订单信息，含所有 items[]、store 详情、优惠券信息、所有时间戳、操作日志

### 10.3 取消订单

- **路径**：`PUT /orders/:id/cancel`
- **认证**：是
- **说明**：仅待支付（status=0）可取消

### 10.4 订单发货

- **路径**：`PUT /orders/:id/ship`
- **认证**：是
- **权限**：门店店员、订单客服、超级管理员
- **说明**：仅待发货（status=2）可发货，status 改为 3（待自提），记录 shipped_at

---

## 十一、退款管理

### 11.1 退款列表

- **路径**：`GET /refunds`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 订单号/用户手机号 |
| status | int | 否 | 0/1/2/3 |
| store_id | int | 否 | 门店ID |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

### 11.2 退款详情

- **路径**：`GET /refunds/:id`
- **认证**：是

**响应**：退款信息 + 订单信息 + 退款原因 + 凭证图片

### 11.3 审核退款

- **路径**：`PUT /refunds/:id/audit`
- **认证**：是
- **权限**：超级管理员、订单客服

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 是 | 1=通过 2=拒绝 |
| audit_remark | string | 否 | 审核备注 |

### 11.4 确认退款到账

- **路径**：`PUT /refunds/:id/confirm-refund`
- **认证**：是
- **说明**：审核通过后，门店确认收到退货，财务打款后调用此接口

**响应**：创建 refund_payment 记录，refund.status 改为 3（已完成）

### 11.5 退货原因列表

- **路径**：`GET /refund-reasons`
- **认证**：是

### 11.6 创建退货原因

- **路径**：`POST /refund-reasons`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 原因内容 |
| sort | int | 否 | 排序 |

### 11.7 编辑退货原因

- **路径**：`PUT /refund-reasons/:id`
- **认证**：是

### 11.8 删除退货原因

- **路径**：`DELETE /refund-reasons/:id`
- **认证**：是

---

## 十二、优惠券管理

### 12.1 优惠券列表

- **路径**：`GET /coupons`
- **认证**：是
- **权限**：超级管理员、商品运营

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 券名称 |
| coupon_type | int | 否 | 1=满减券 2=抵扣券 |
| status | int | 否 | 0=禁用 1=启用 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, name, coupon_type, face_value, threshold_amount, start_time, end_time, total_count, claimed_count, status`

### 12.2 优惠券详情

- **路径**：`GET /coupons/:id`
- **认证**：是

**响应**：优惠券信息 + scope[]（适用范围列表）

### 12.3 创建优惠券

- **路径**：`POST /coupons`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 券名称 |
| coupon_type | int | 是 | 1=满减券 2=抵扣券 |
| type | int | 是 | 1=指定商品 2=指定分类 |
| face_value | string | 是 | 面值 |
| threshold_amount | string | 否 | 门槛金额，默认 0.00 |
| start_time | string | 是 | 有效期开始 |
| end_time | string | 是 | 有效期结束 |
| total_count | int | 是 | 总发放数量 |
| per_person_limit | int | 否 | 每人限领，默认1 |
| scope | array | 是 | `[{"scope_type": 1, "target_id": 100}]` |

### 12.4 编辑优惠券

- **路径**：`PUT /coupons/:id`
- **认证**：是
- **说明**：已有用户领取的券不可修改面值和门槛

### 12.5 启用/禁用优惠券

- **路径**：`PUT /coupons/:id/toggle`
- **认证**：是

### 12.6 用户领取记录

- **路径**：`GET /coupons/:id/records`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 用户手机号/昵称 |
| status | int | 否 | 0=未使用 1=已使用 2=已过期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每条含 `user{nickname,phone}, status, created_at, used_at, order_no`

---

## 十三、支付记录

### 13.1 支付记录列表

- **路径**：`GET /payments`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 订单号 |
| status | int | 否 | 0=待支付 1=已支付 2=已退款 |
| start_date | string | 否 | 开始日期 |
| end_date | string | 否 | 结束日期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

### 13.2 退款记录列表

- **路径**：`GET /refund-payments`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 否 | 0=待退款 1=已退款 2=失败 |
| start_date | string | 否 | 开始日期 |
| end_date | string | 否 | 结束日期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

---

## 十四、客服消息

### 14.1 会话列表

- **路径**：`GET /conversations`
- **认证**：是
- **权限**：超级管理员、订单客服

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 否 | 0=待接入 1=进行中 2=已关闭 |
| keyword | string | 否 | 用户昵称/手机号 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，按 updated_at 倒序，每项含 `id, user{nickname,avatar,phone}, admin{name}, status, last_message, unread_count, updated_at`

### 14.2 接入会话

- **路径**：`PUT /conversations/:id/accept`
- **认证**：是
- **说明**：待接入→进行中，绑定当前管理员为客服

### 14.3 关闭会话

- **路径**：`PUT /conversations/:id/close`
- **认证**：是

### 14.4 转接会话

- **路径**：`PUT /conversations/:id/transfer`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| admin_id | int | 是 | 接收客服的管理员ID |

### 14.5 获取聊天记录

- **路径**：`GET /conversations/:id/messages`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cursor | int | 否 | 上一页最后一条消息ID |
| limit | int | 否 | 条数，默认20 |

### 14.6 发送消息

- **路径**：`POST /conversations/:id/messages`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 消息内容 |
| message_type | int | 否 | 1=文本 2=图片，默认1 |

---

## 十五、消息通知管理

### 15.1 通知列表

- **路径**：`GET /notifications`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | int | 否 | 1=订单 2=活动 3=系统 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

### 15.2 创建通知

- **路径**：`POST /notifications`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 标题 |
| content | string | 是 | 内容 |
| type | int | 是 | 1=订单 2=活动 3=系统 |
| target_scope | int | 是 | 1=全部用户 2=指定用户 |
| target_ids | int[] | 否 | scope=2时必填，用户ID数组 |
| send_type | int | 是 | 1=立即发送 2=定时发送 |
| send_at | string | 否 | send_type=2时必填，定时发送时间 |

### 15.3 通知详情

- **路径**：`GET /notifications/:id`
- **认证**：是

### 15.4 删除通知

- **路径**：`DELETE /notifications/:id`
- **认证**：是

### 15.5 通知模板列表

- **路径**：`GET /notification-templates`
- **认证**：是

### 15.6 创建通知模板

- **路径**：`POST /notification-templates`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 模板名称 |
| type | int | 是 | 1=订单 2=活动 3=系统 |
| title_template | string | 是 | 标题模板 |
| content_template | string | 是 | 内容模板 |

### 15.7 编辑通知模板

- **路径**：`PUT /notification-templates/:id`
- **认证**：是

### 15.8 删除通知模板

- **路径**：`DELETE /notification-templates/:id`
- **认证**：是

---

## 十六、首页管理

### 16.1 轮播图列表

- **路径**：`GET /banners`
- **认证**：是

**响应**：列表，按 sort 升序，每项含 `id, image_url, link_url, link_type, sort, status`

### 16.2 创建轮播图

- **路径**：`POST /banners`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| image_url | string | 是 | 图片URL |
| link_url | string | 否 | 跳转链接 |
| link_type | int | 否 | 0=无跳转 1=商品 2=活动 3=外部链接 |
| sort | int | 否 | 排序值 |

### 16.3 编辑轮播图

- **路径**：`PUT /banners/:id`
- **认证**：是

### 16.4 删除轮播图

- **路径**：`DELETE /banners/:id`
- **认证**：是

### 16.5 启用/禁用轮播图

- **路径**：`PUT /banners/:id/toggle`
- **认证**：是

### 16.6 推荐位列表

- **路径**：`GET /recommendations`
- **认证**：是

**响应**：列表，每项含 `id, name, sort, status, products[{id, name, image, price, sort}]`

### 16.7 创建推荐位

- **路径**：`POST /recommendations`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 推荐位名称 |
| sort | int | 否 | 排序值 |

### 16.8 编辑推荐位

- **路径**：`PUT /recommendations/:id`
- **认证**：是

### 16.9 删除推荐位

- **路径**：`DELETE /recommendations/:id`
- **认证**：是

### 16.10 推荐位添加商品

- **路径**：`POST /recommendations/:id/products`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| product_id | int | 是 | 商品ID |
| sort | int | 否 | 排序值 |

### 16.11 推荐位移除商品

- **路径**：`DELETE /recommendations/:id/products/:product_id`
- **认证**：是

### 16.12 推荐位商品排序

- **路径**：`PUT /recommendations/:id/products/sort`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| items | array | 是 | `[{"product_id": 1, "sort": 0}, ...]` |

---

## 十七、门店管理

### 17.1 门店列表

- **路径**：`GET /stores`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 门店名/地址 |
| status | int | 否 | 0=停用 1=营业 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

### 17.2 门店详情

- **路径**：`GET /stores/:id`
- **认证**：是

### 17.3 创建门店

- **路径**：`POST /stores`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 门店名称 |
| address | string | 是 | 门店地址 |
| phone | string | 否 | 联系电话 |
| business_hours | string | 否 | 营业时间 |
| announcement | string | 否 | 门店公告 |

### 17.4 编辑门店

- **路径**：`PUT /stores/:id`
- **认证**：是

### 17.5 启用/停用门店

- **路径**：`PUT /stores/:id/toggle`
- **认证**：是

### 17.6 删除门店

- **路径**：`DELETE /stores/:id`
- **认证**：是
- **说明**：有关联订单时不可删除

### 17.7 门店总览（门店店员）

- **路径**：`GET /stores/dashboard`
- **认证**：是
- **权限**：门店店员
- **说明**：自动根据 admin.store_id 返回本门店数据

**响应**：

```json
{
  "data": {
    "store": { "id": 1, "name": "旗舰店" },
    "today_orders": 15, "today_sales": "8990.00",
    "pending_ship": 3, "pending_pickup": 5, "pending_refund": 2
  }
}
```

---

## 十八、用户管理

### 18.1 用户列表

- **路径**：`GET /users`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 否 | 手机号/昵称 |
| status | int | 否 | 1=正常 2=禁用 |
| start_date | string | 否 | 注册开始日期 |
| end_date | string | 否 | 注册结束日期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, nickname, avatar, phone, gender, status, created_at, last_login_at`

### 18.2 用户详情

- **路径**：`GET /users/:id`
- **认证**：是

**响应**：

```json
{
  "data": {
    "id": 1, "phone": "13812341234", "nickname": "小明", "avatar": "https://...",
    "gender": 0, "birthday": "2000-01-01", "openid": "oXXXX", "status": 1,
    "total_spent": "25990.00", "order_count": 12, "review_count": 5, "coupon_count": 3,
    "created_at": "2026-01-01 12:00:00", "last_login_at": "2026-07-01 08:00:00"
  }
}
```

### 18.3 启用/禁用用户

- **路径**：`PUT /users/:id/toggle`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 是 | 1=正常 2=禁用 |

---

## 十九、管理员管理

### 19.1 管理员列表

- **路径**：`GET /admins`
- **认证**：是
- **权限**：仅超级管理员

**响应**：列表（不含超级管理员自己），每项含 `id, username, name, phone, role{id,name}, store{id,name}, status, created_at`

### 19.2 创建管理员

- **路径**：`POST /admins`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 用户名（唯一） |
| password | string | 是 | 密码 |
| name | string | 否 | 姓名 |
| phone | string | 否 | 手机号 |
| role_id | int | 是 | 角色ID |
| store_id | int | 否 | 门店ID（role_id=4门店店员时必填） |

### 19.3 编辑管理员

- **路径**：`PUT /admins/:id`
- **认证**：是

### 19.4 启用/禁用管理员

- **路径**：`PUT /admins/:id/toggle`
- **认证**：是

### 19.5 重置密码

- **路径**：`PUT /admins/:id/reset-password`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| password | string | 是 | 新密码 |

### 19.6 删除管理员

- **路径**：`DELETE /admins/:id`
- **认证**：是
- **说明**：软删除，超级管理员不可删除

### 19.7 角色列表

- **路径**：`GET /roles`
- **认证**：是

**响应**：

```json
{ "data": [{ "id": 1, "name": "超级管理员", "description": "..." }, { "id": 2, "name": "商品运营" }, { "id": 3, "name": "订单客服" }, { "id": 4, "name": "门店店员" }] }
```

---

## 二十、系统设置

### 20.1 系统配置列表

- **路径**：`GET /system-configs`
- **认证**：是
- **权限**：超级管理员

**响应**：

```json
{ "data": [{ "id": 1, "config_key": "ai_reply_delay_minutes", "config_value": "10", "description": "AI兜底回复延迟(分钟)" }] }
```

### 20.2 更新配置

- **路径**：`PUT /system-configs/:id`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| config_value | string | 是 | 配置值 |

### 20.3 操作日志列表

- **路径**：`GET /operation-logs`
- **认证**：是
- **权限**：超级管理员

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| module | string | 否 | 操作模块 |
| operator_id | int | 否 | 操作人ID |
| start_date | string | 否 | 开始日期 |
| end_date | string | 否 | 结束日期 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, operator_name, module, content, target_type, target_id, ip, created_at`
