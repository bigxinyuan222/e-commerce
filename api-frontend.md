# 乐享购接口文档 - 前台（C端）

> 前台接口服务于微信小程序 + H5，两端共享同一套 API
> 基础路径：`/api/v1`
> 认证方式：JWT Bearer Token（Header: `Authorization: Bearer <token>`）

---

## 公共规范

### 统一响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

- `code = 0` 成功，非 0 为错误码
- 所有金额字段返回字符串，精确到分（如 `"99.00"`）
- 时间格式：`"2026-01-01 12:00:00"`

### 分页参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码，默认 1 |
| page_size | int | 否 | 每页条数，默认 20，最大 50 |

### 分页响应

```json
{
  "list": [],
  "total": 100,
  "page": 1,
  "page_size": 20
}
```

---

## 一、认证模块

### 1.1 手机号注册

- **路径**：`POST /auth/register`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| password | string | 是 | 密码（6-20位） |
| code | string | 是 | 短信验证码 |

**响应**：

```json
{ "data": { "token": "jwt_token", "user": { "id": 1, "phone": "138****1234", "nickname": "", "avatar": "" } } }
```

### 1.2 手机号登录

- **路径**：`POST /auth/login`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| password | string | 是 | 密码 |

**响应**：同注册

### 1.3 微信一键登录

- **路径**：`POST /auth/wechat-login`
- **认证**：否
- **说明**：小程序端获取 code 后调用，服务端换取 openid 并自动注册/登录

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 微信授权 code |

**响应**：

```json
{ "data": { "token": "jwt_token", "need_password": true, "user": { "id": 1, "phone": "", "nickname": "", "avatar": "" } } }
```

> `need_password = true` 表示首次微信登录，需调用设置密码接口

### 1.4 设置密码（微信登录后）

- **路径**：`POST /auth/set-password`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| password | string | 是 | 密码（6-20位） |

---

## 二、用户模块

### 2.1 获取个人信息

- **路径**：`GET /user/profile`
- **认证**：是

**响应**：

```json
{ "data": { "id": 1, "phone": "13812341234", "nickname": "小明", "avatar": "https://...", "gender": 0, "birthday": "2000-01-01" } }
```

### 2.2 修改个人信息

- **路径**：`PUT /user/profile`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| nickname | string | 否 | 昵称 |
| avatar | string | 否 | 头像URL |
| gender | int | 否 | 0=男 1=女 2=保密 |
| birthday | string | 否 | 生日 YYYY-MM-DD |

---

## 三、首页模块

### 3.1 获取轮播图

- **路径**：`GET /home/banners`
- **认证**：否

**响应**：

```json
{ "data": [{ "id": 1, "image_url": "https://...", "link_url": "", "link_type": 0 }] }
```

### 3.2 获取推荐位及商品

- **路径**：`GET /home/recommendations`
- **认证**：否

**响应**：

```json
{
  "data": [
    {
      "id": 1, "name": "热门推荐",
      "products": [
        { "id": 10, "name": "商品A", "price": "99.00", "image": "https://...", "product_id": 100 }
      ]
    }
  ]
}
```

### 3.3 获取正在进行的秒杀活动

- **路径**：`GET /home/seckill-activities`
- **认证**：否

**响应**：

```json
{
  "data": [
    { "id": 1, "name": "限时秒杀", "start_time": "2026-07-01 10:00:00", "end_time": "2026-07-01 12:00:00", "product_count": 5 }
  ]
}
```

---

## 四、分类模块

### 4.1 获取分类树

- **路径**：`GET /categories`
- **认证**：否
- **说明**：返回两级分类结构

**响应**：

```json
{
  "data": [
    { "id": 1, "name": "手机数码", "children": [{ "id": 11, "name": "手机" }, { "id": 12, "name": "平板" }] }
  ]
}
```

### 4.2 分类下商品列表

- **路径**：`GET /categories/:id/products`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |
| sort | string | 否 | 排序：default/sales_asc/price_asc/price_desc |

**响应**：分页列表，每项含 `id, name, price(最低价), image, sales`

---

## 五、品牌模块

### 5.1 获取品牌列表

- **路径**：`GET /brands`
- **认证**：否

**响应**：

```json
{ "data": [{ "id": 1, "name": "华为", "logo": "https://..." }] }
```

### 5.2 品牌详情及商品

- **路径**：`GET /brands/:id/products`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页商品列表

---

## 六、商品模块

### 6.1 商品详情

- **路径**：`GET /products/:id`
- **认证**：否
- **说明**：返回商品完整信息 + 规格 + SKU列表，同时 `views` 自增

**响应**：

```json
{
  "data": {
    "id": 1, "name": "华为Mate60", "description": "...",
    "images": ["https://...", "https://..."],
    "brand": { "id": 1, "name": "华为" },
    "category": { "id": 11, "name": "手机" },
    "sales": 1200, "views": 5600,
    "specs": [
      { "id": 1, "name": "颜色", "values": [{ "id": 1, "value": "黑色" }, { "id": 2, "value": "白色" }] },
      { "id": 2, "name": "存储", "values": [{ "id": 3, "value": "128G" }, { "id": 4, "value": "256G" }] }
    ],
    "skus": [
      { "id": 1, "spec_values": { "颜色": "黑色", "存储": "128G" }, "price": "5999.00", "stock": 50, "image": "", "sku_code": "HW-M60-BK-128" }
    ]
  }
}
```

### 6.2 商品搜索

- **路径**：`GET /products/search`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 是 | 搜索关键词（匹配商品名） |
| category_id | int | 否 | 分类ID |
| brand_id | int | 否 | 品牌ID |
| min_price | string | 否 | 最低价格 |
| max_price | string | 否 | 最高价格 |
| sort | string | 否 | default/sales_asc/price_asc/price_desc |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, name, price(最低价), image, sales`

---

## 七、评价模块

### 7.1 商品评价列表

- **路径**：`GET /products/:id/reviews`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| review_type | int | 否 | 1=好评 2=差评，不传=全部 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表

```json
{
  "list": [
    {
      "id": 1, "review_type": 1, "content": "非常好用",
      "images": ["https://..."], "like_count": 10,
      "admin_reply": "感谢好评",
      "reply_count": 3,
      "user": { "id": 1, "nickname": "小明", "avatar": "https://..." },
      "created_at": "2026-07-01 12:00:00"
    }
  ],
  "total": 50, "page": 1, "page_size": 20
}
```

### 7.2 商品评价统计

- **路径**：`GET /products/:id/reviews/stats`
- **认证**：否

**响应**：

```json
{ "data": { "total": 100, "good_count": 80, "bad_count": 20, "good_rate": "80%" } }
```

### 7.3 商品AI评价摘要

- **路径**：`GET /products/:id/reviews/summary`
- **认证**：否

**响应**：

```json
{ "data": { "content": "用户普遍反馈...", "generated_at": "2026-07-01 00:00:00" } }
```

> 无摘要时 `data` 为 `null`

### 7.4 提交评价

- **路径**：`POST /reviews`
- **认证**：是
- **说明**：订单完成后可评价，同一订单只能评价一次

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| order_id | int | 是 | 订单ID |
| product_id | int | 是 | 商品ID |
| review_type | int | 是 | 1=好评 2=差评 |
| content | string | 否 | 评价内容 |
| images | string[] | 否 | 晒图URL数组，最多9张 |

### 7.5 评价回复列表

- **路径**：`GET /reviews/:id/replies`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每条含 `id, content, like_count, user{id,nickname,avatar}, created_at`

### 7.6 回复评价

- **路径**：`POST /reviews/:id/replies`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 回复内容 |

### 7.7 点赞/取消点赞

- **路径**：`POST /reviews/like`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| review_id | int | 否 | 评价ID（与reply_id二选一） |
| reply_id | int | 否 | 回复ID（与review_id二选一） |

**响应**：

```json
{ "data": { "liked": true, "like_count": 11 } }
```

> 重复点赞则取消，返回 `liked: false`

---

## 八、购物车模块

### 8.1 购物车列表

- **路径**：`GET /cart`
- **认证**：是

**响应**：

```json
{
  "data": [
    {
      "id": 1, "sku_id": 10, "quantity": 2,
      "sku": { "price": "5999.00", "stock": 50, "spec_values": { "颜色": "黑色" }, "image": "" },
      "product": { "id": 1, "name": "华为Mate60", "image": "https://...", "status": 1 }
    }
  ]
}
```

### 8.2 添加购物车

- **路径**：`POST /cart`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| sku_id | int | 是 | SKU ID |
| quantity | int | 否 | 数量，默认1 |

> 同一 SKU 重复添加则累加数量

### 8.3 修改购物车数量

- **路径**：`PUT /cart/:id`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| quantity | int | 是 | 新数量（≥1） |

### 8.4 删除购物车项

- **路径**：`DELETE /cart/:id`
- **认证**：是

### 8.5 批量删除

- **路径**：`POST /cart/batch-delete`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | int[] | 是 | 购物车项ID数组 |

---

## 九、订单模块

### 9.1 提交订单（结算）

- **路径**：`POST /orders`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cart_ids | int[] | 是 | 购物车项ID数组 |
| store_id | int | 是 | 自提门店ID |
| user_coupon_id | int | 否 | 使用的优惠券ID |
| remark | string | 否 | 订单备注 |

**响应**：

```json
{
  "data": {
    "order_id": 1, "order_no": "20260701120000001",
    "total_amount": "11998.00", "discount_amount": "20.00", "pay_amount": "11978.00",
    "payment_params": { "appId": "...", "timeStamp": "...", "nonceStr": "...", "package": "...", "signType": "RSA" }
  }
}
```

> `payment_params` 为微信小程序调起支付所需参数

### 9.2 订单列表

- **路径**：`GET /orders`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 否 | 0/2/3/4/5，不传=全部 |
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表

```json
{
  "list": [
    {
      "id": 1, "order_no": "20260701120000001", "status": 2,
      "total_amount": "11998.00", "pay_amount": "11978.00",
      "items": [
        { "product_name": "华为Mate60", "spec_values": { "颜色": "黑色" }, "price": "5999.00", "image": "https://...", "quantity": 2 }
      ],
      "store": { "id": 1, "name": "旗舰店" },
      "created_at": "2026-07-01 12:00:00"
    }
  ]
}
```

### 9.3 订单详情

- **路径**：`GET /orders/:id`
- **认证**：是

**响应**：完整订单信息，含 `store{id,name,address,phone,business_hours}`、`remark`、所有时间戳、优惠券信息

### 9.4 取消订单

- **路径**：`PUT /orders/:id/cancel`
- **认证**：是
- **说明**：仅待支付（status=0）可取消

### 9.5 确认自提

- **路径**：`PUT /orders/:id/confirm`
- **认证**：是
- **说明**：仅待自提（status=3）可确认，确认后 status=4（已完成）

---

## 十、退货退款模块

### 10.1 获取退货原因列表

- **路径**：`GET /refund-reasons`
- **认证**：是

**响应**：

```json
{ "data": [{ "id": 1, "content": "商品质量问题" }, { "id": 2, "content": "与描述不符" }] }
```

### 10.2 申请退款

- **路径**：`POST /refunds`
- **认证**：是
- **说明**：整单退款，一个订单只能申请一次。仅已完成（status=4）订单可申请

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| order_id | int | 是 | 订单ID |
| refund_reason_id | int | 是 | 退货原因ID |
| description | string | 否 | 退货说明 |
| images | string[] | 否 | 凭证图片URL数组 |

**响应**：

```json
{ "data": { "id": 1, "refund_no": "RF20260701001", "total_amount": "11978.00" } }
```

### 10.3 退款详情

- **路径**：`GET /refunds/:id`
- **认证**：是

**响应**：

```json
{
  "data": {
    "id": 1, "refund_no": "RF20260701001", "status": 0,
    "total_amount": "11978.00",
    "reason": "商品质量问题", "description": "屏幕有划痕",
    "images": ["https://..."],
    "order": { "order_no": "20260701120000001" },
    "created_at": "2026-07-01 12:00:00",
    "audited_at": null, "audit_remark": null, "refunded_at": null
  }
}
```

---

## 十一、优惠券模块

### 11.1 可领取优惠券列表

- **路径**：`GET /coupons/available`
- **认证**：是
- **说明**：展示启用中、有效期内、剩余数量>0 的优惠券

**响应**：

```json
{
  "data": [
    {
      "id": 1, "name": "满100减20", "coupon_type": 1,
      "face_value": "20.00", "threshold_amount": "100.00",
      "start_time": "2026-07-01 00:00:00", "end_time": "2026-07-31 23:59:59",
      "remaining": 500, "per_person_limit": 1,
      "claimed": false
    }
  ]
}
```

> `claimed` 表示当前用户是否已领取（达到限领次数则为 true）

### 11.2 我的优惠券列表

- **路径**：`GET /coupons/mine`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 否 | 0=未使用 1=已使用 2=已过期，不传=全部 |

**响应**：列表，每项含 `coupon{name,coupon_type,face_value,threshold_amount,end_time}` + `user_coupon{status,used_at}`

### 11.3 领取优惠券

- **路径**：`POST /coupons/:id/claim`
- **认证**：是

---

## 十二、秒杀模块

### 12.1 秒杀活动列表

- **路径**：`GET /seckill/activities`
- **认证**：否

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | int | 否 | 0/1/2，不传=全部 |

**响应**：列表，每项含 `id, name, start_time, end_time, status, product_count`

### 12.2 秒杀活动商品列表

- **路径**：`GET /seckill/activities/:id/products`
- **认证**：否

**响应**：

```json
{
  "data": [
    {
      "product_id": 1, "name": "华为Mate60", "image": "https://...",
      "original_price": "5999.00", "seckill_price": "4999.00"
    }
  ]
}
```

> `seckill_price` 为该商品所有 SKU 中的最低秒杀价

### 12.3 秒杀商品详情（含SKU秒杀价）

- **路径**：`GET /seckill/activities/:id/products/:product_id`
- **认证**：否

**响应**：商品详情 + SKU列表（含 `seckill_price, stock_limit, sold_count`）

---

## 十三、门店模块

### 13.1 门店列表

- **路径**：`GET /stores`
- **认证**：否
- **说明**：仅返回营业中的门店

**响应**：

```json
{
  "data": [
    { "id": 1, "name": "旗舰店", "address": "xxx路xx号", "phone": "010-12345678", "business_hours": "09:00-21:00", "announcement": "" }
  ]
}
```

---

## 十四、客服模块

### 14.1 获取/创建会话

- **路径**：`POST /conversations`
- **认证**：是
- **说明**：如已有进行中/待接入会话则直接返回，否则创建新会话

**响应**：

```json
{ "data": { "id": 1, "status": 0 } }
```

### 14.2 会话列表

- **路径**：`GET /conversations`
- **认证**：是

**响应**：列表，每项含 `id, status, last_message, unread_count, updated_at`

### 14.3 获取聊天记录

- **路径**：`GET /conversations/:id/messages`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cursor | int | 否 | 上一页最后一条消息ID，首次不传 |
| limit | int | 否 | 条数，默认20 |

**响应**：

```json
{
  "data": {
    "messages": [
      { "id": 1, "sender_type": 1, "content": "你好", "message_type": 1, "reply_source": 0, "created_at": "2026-07-01 12:00:00" }
    ],
    "has_more": false
  }
}
```

### 14.4 发送消息

- **路径**：`POST /conversations/:id/messages`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 消息内容 |
| message_type | int | 否 | 1=文本 2=图片，默认1 |

---

## 十五、消息通知模块

### 15.1 通知列表

- **路径**：`GET /notifications`
- **认证**：是

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码 |
| page_size | int | 否 | 每页条数 |

**响应**：分页列表，每项含 `id, title, content, type, is_read, read_at, created_at`

### 15.2 未读消息数

- **路径**：`GET /notifications/unread-count`
- **认证**：是

**响应**：

```json
{ "data": { "count": 5 } }
```

### 15.3 标记已读

- **路径**：`PUT /notifications/:id/read`
- **认证**：是

### 15.4 全部已读

- **路径**：`PUT /notifications/read-all`
- **认证**：是
