# 乐享购数据库设计 - 第三阶段：逻辑表结构设计

> 共 39 张表 | 字符集 utf8mb4 + utf8mb4_unicode_ci | 命名 snake_case

---

## 公共字段

所有表统一包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `BIGINT UNSIGNED AUTO_INCREMENT` | 主键 |
| `created_at` | `DATETIME` | 创建时间（Gorm 自动管理） |
| `updated_at` | `DATETIME` | 更新时间（Gorm 自动管理） |

需要软删除的表额外加 `deleted_at DATETIME DEFAULT NULL`，下文中已标注。

---

## 一、用户模块

### 1. user（用户）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | 主键 |
| phone | VARCHAR(20) | UNIQUE, NOT NULL | 手机号 |
| password | VARCHAR(255) | NOT NULL | 密码(bcrypt加密) |
| nickname | VARCHAR(50) | DEFAULT '' | 昵称 |
| avatar | VARCHAR(500) | DEFAULT '' | 头像URL |
| gender | TINYINT | DEFAULT 2 | 0=男 1=女 2=保密 |
| birthday | DATE | NULL | 生日 |
| openid | VARCHAR(100) | DEFAULT '' | 微信OpenID |
| status | TINYINT | DEFAULT 1 | 1=正常 2=禁用 |
| last_login_at | DATETIME | NULL | 最后登录时间 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | 软删除 |

---

## 二、商品模块

### 2. product（商品）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(200) | NOT NULL | 商品名称 |
| description | TEXT | | 商品描述(可AI生成) |
| brand_id | BIGINT UNSIGNED | NOT NULL | 品牌ID |
| category_id | BIGINT UNSIGNED | NOT NULL | 分类ID(二级分类) |
| status | TINYINT | DEFAULT 0 | 0=下架 1=上架 |
| images | JSON | | 轮播图URL数组 |
| sales | INT UNSIGNED | DEFAULT 0 | 总销量 |
| views | INT UNSIGNED | DEFAULT 0 | 浏览量 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 3. category（商品分类）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(50) | NOT NULL | 分类名称 |
| parent_id | BIGINT UNSIGNED | DEFAULT 0 | 父级ID，0=一级分类 |
| sort | INT | DEFAULT 0 | 排序值(越小越前) |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 4. brand（商品品牌）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(100) | NOT NULL | 品牌名称 |
| logo | VARCHAR(500) | DEFAULT '' | 品牌Logo URL |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 5. specification（规格）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(50) | NOT NULL | 规格名(如颜色/尺码) |
| sort | INT | DEFAULT 0 | 排序 |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 6. specification_value（规格值）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| specification_id | BIGINT UNSIGNED | NOT NULL | 所属规格 |
| value | VARCHAR(100) | NOT NULL | 规格值(如红色/XL) |
| sort | INT | DEFAULT 0 | 排序 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 7. product_spec（商品规格关联）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| product_id | BIGINT UNSIGNED | NOT NULL | 商品ID |
| specification_value_id | BIGINT UNSIGNED | NOT NULL | 规格值ID |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 8. sku（SKU）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| product_id | BIGINT UNSIGNED | NOT NULL | 所属商品 |
| spec_values | JSON | NOT NULL | 规格组合 {"颜色":"黑色","存储":"128G"} |
| price | DECIMAL(10,2) | NOT NULL | 价格 |
| stock | INT UNSIGNED | DEFAULT 0 | 库存 |
| sold | INT UNSIGNED | DEFAULT 0 | 已售数量 |
| sku_code | VARCHAR(100) | UNIQUE | SKU编码 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 9. product_review（商品评价）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| user_id | BIGINT UNSIGNED | NOT NULL | 评价用户 |
| product_id | BIGINT UNSIGNED | NOT NULL | 评价商品 |
| order_id | BIGINT UNSIGNED | NOT NULL | 关联订单 |
| review_type | TINYINT | NOT NULL | 1=好评 2=差评 |
| content | TEXT | | 评价内容 |
| images | JSON | | 晒图URL数组 |
| like_count | INT UNSIGNED | DEFAULT 0 | 点赞数 |
| status | TINYINT | DEFAULT 1 | 0=隐藏 1=显示 |
| admin_reply | TEXT | | 管理员回复 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 10. review_reply（评价回复）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| review_id | BIGINT UNSIGNED | NOT NULL | 评价ID |
| user_id | BIGINT UNSIGNED | NOT NULL | 回复用户ID |
| content | TEXT | NOT NULL | 回复内容 |
| like_count | INT UNSIGNED | DEFAULT 0 | 点赞数 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 11. review_summary（评价AI摘要）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| product_id | BIGINT UNSIGNED | NOT NULL | 商品ID |
| content | VARCHAR(500) | NOT NULL | 摘要内容 |
| generated_at | DATETIME | NOT NULL | 生成时间 |
| status | TINYINT | DEFAULT 0 | 0=待审核 1=已发布 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 三、门店模块

### 12. store（门店）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(100) | NOT NULL | 门店名称 |
| address | VARCHAR(300) | NOT NULL | 门店地址 |
| phone | VARCHAR(20) | DEFAULT '' | 联系电话 |
| business_hours | VARCHAR(100) | DEFAULT '' | 营业时间(如09:00-21:00) |
| announcement | VARCHAR(500) | DEFAULT '' | 门店公告 |
| status | TINYINT | DEFAULT 1 | 0=停用 1=营业 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

---

## 四、购物车模块

### 13. cart（购物车）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| sku_id | BIGINT UNSIGNED | NOT NULL | SKU ID |
| quantity | INT UNSIGNED | DEFAULT 1 | 数量 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 五、订单模块

### 14. order（订单）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| order_no | VARCHAR(32) | UNIQUE, NOT NULL | 订单编号 |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| store_id | BIGINT UNSIGNED | NOT NULL | 自提门店ID |
| total_amount | DECIMAL(10,2) | NOT NULL | 商品总金额 |
| discount_amount | DECIMAL(10,2) | DEFAULT 0.00 | 优惠金额 |
| pay_amount | DECIMAL(10,2) | NOT NULL | 实付金额 |
| status | TINYINT | DEFAULT 0 | 0=待支付 1=拼团中 2=待发货 3=待自提 4=已完成 5=已取消 |
| user_coupon_id | BIGINT UNSIGNED | NULL | 使用的优惠券ID |
| paid_at | DATETIME | NULL | 支付时间 |
| shipped_at | DATETIME | NULL | 门店发货时间（店员操作） |
| confirmed_at | DATETIME | NULL | 用户确认自提时间 |
| cancelled_at | DATETIME | NULL | 取消时间 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 15. order_item（订单明细）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| order_id | BIGINT UNSIGNED | NOT NULL | 订单ID |
| sku_id | BIGINT UNSIGNED | NOT NULL | SKU ID |
| product_name | VARCHAR(200) | NOT NULL | 商品名称(快照) |
| spec_values | JSON | | 规格(快照) |
| price | DECIMAL(10,2) | NOT NULL | 单价(快照) |
| image | VARCHAR(500) | DEFAULT '' | 商品图片(快照) |
| quantity | INT UNSIGNED | NOT NULL | 购买数量 |
| amount | DECIMAL(10,2) | NOT NULL | 小计金额 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 六、退货退款模块

### 16. refund（退货退款申请）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| refund_no | VARCHAR(32) | UNIQUE, NOT NULL | 退款单号 |
| order_id | BIGINT UNSIGNED | NOT NULL, UNIQUE | 订单ID（一个订单只能有一个退款单） |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| store_id | BIGINT UNSIGNED | NOT NULL | 处理门店ID |
| refund_reason_id | BIGINT UNSIGNED | NOT NULL | 退货原因ID |
| description | VARCHAR(500) | DEFAULT '' | 退货说明 |
| images | JSON | | 凭证图片URL数组 |
| total_amount | DECIMAL(10,2) | NOT NULL | 退款金额（等于订单实付金额） |
| status | TINYINT | DEFAULT 0 | 0=待审核 1=已通过 2=已拒绝 3=已完成 |
| admin_id | BIGINT UNSIGNED | NULL | 审核管理员ID |
| audit_remark | VARCHAR(500) | NULL | 审核备注 |
| audited_at | DATETIME | NULL | 审核时间 |
| refund_payment_id | BIGINT UNSIGNED | NULL | 退款支付ID |
| refunded_at | DATETIME | NULL | 退款到账时间 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 17. refund_reason（退货原因）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| content | VARCHAR(200) | NOT NULL | 原因内容 |
| sort | INT | DEFAULT 0 | 排序 |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

---

## 七、优惠券模块

### 18. coupon（优惠券）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(100) | NOT NULL | 优惠券名称 |
| type | TINYINT | NOT NULL | 1=指定商品 2=指定分类 |
| face_value | DECIMAL(10,2) | NOT NULL | 面值(减多少) |
| threshold_amount | DECIMAL(10,2) | DEFAULT 0.00 | 门槛金额(0=无门槛) |
| start_time | DATETIME | NOT NULL | 有效期开始 |
| end_time | DATETIME | NOT NULL | 有效期结束 |
| total_count | INT UNSIGNED | NOT NULL | 总发放数量 |
| claimed_count | INT UNSIGNED | DEFAULT 0 | 已领取数量 |
| per_person_limit | INT UNSIGNED | DEFAULT 1 | 每人限领数量 |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 19. coupon_scope（优惠券适用范围）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| coupon_id | BIGINT UNSIGNED | NOT NULL | 优惠券ID |
| scope_type | TINYINT | NOT NULL | 1=商品 2=分类 |
| target_id | BIGINT UNSIGNED | NOT NULL | 商品ID或分类ID |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 20. user_coupon（用户优惠券）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| coupon_id | BIGINT UNSIGNED | NOT NULL | 优惠券ID |
| status | TINYINT | DEFAULT 0 | 0=未使用 1=已使用 2=已过期 |
| used_at | DATETIME | NULL | 使用时间 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 八、营销活动模块

### 21. seckill_activity（秒杀活动）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(100) | NOT NULL | 活动名称 |
| start_time | DATETIME | NOT NULL | 开始时间 |
| end_time | DATETIME | NOT NULL | 结束时间 |
| status | TINYINT | DEFAULT 0 | 0=未开始 1=进行中 2=已结束 3=已关闭 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 22. seckill_item（秒杀商品）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| activity_id | BIGINT UNSIGNED | NOT NULL | 活动ID |
| product_id | BIGINT UNSIGNED | NOT NULL | 商品ID |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 23. seckill_sku_price（SKU秒杀价）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| item_id | BIGINT UNSIGNED | NOT NULL | 活动商品ID |
| sku_id | BIGINT UNSIGNED | NOT NULL | SKU ID |
| seckill_price | DECIMAL(10,2) | NOT NULL | 该SKU的秒杀价 |
| stock_limit | INT UNSIGNED | DEFAULT 0 | 库存限制(0=不限制，用sku.stock) |
| sold_count | INT UNSIGNED | DEFAULT 0 | 已售数量 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 24. group_buy_activity（拼团活动）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(100) | NOT NULL | 活动名称 |
| start_time | DATETIME | NOT NULL | 活动开始时间 |
| end_time | DATETIME | NOT NULL | 活动结束时间 |
| validity_hours | INT UNSIGNED | NOT NULL | 团的有效期(小时) |
| status | TINYINT | DEFAULT 0 | 0=未开始 1=进行中 2=已结束 3=已关闭 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 25. group_buy_item（拼团商品）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| activity_id | BIGINT UNSIGNED | NOT NULL | 活动ID |
| product_id | BIGINT UNSIGNED | NOT NULL | 商品ID |
| group_price | DECIMAL(10,2) | NOT NULL | 该商品的拼团价 |
| target_count | TINYINT | NOT NULL | 成团人数(2-5) |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 26. group_buy_record（拼团记录）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| item_id | BIGINT UNSIGNED | NOT NULL | 活动商品ID |
| leader_user_id | BIGINT UNSIGNED | NOT NULL | 团长用户ID |
| sku_id | BIGINT UNSIGNED | NOT NULL | SKU ID(所有团员必须同一种SKU) |
| current_count | TINYINT | DEFAULT 1 | 当前参团人数 |
| status | TINYINT | DEFAULT 0 | 0=拼团中 1=已成团 2=已失败 |
| expire_at | DATETIME | NOT NULL | 过期时间 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 27. group_buy_member（拼团参与）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| record_id | BIGINT UNSIGNED | NOT NULL | 拼团记录ID |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| order_id | BIGINT UNSIGNED | NOT NULL | 订单ID(参团即支付) |
| role | TINYINT | DEFAULT 0 | 0=团员 1=团长 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 九、支付模块

### 28. payment（支付记录）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| order_id | BIGINT UNSIGNED | UNIQUE, NOT NULL | 订单ID |
| order_no | VARCHAR(32) | NOT NULL | 订单号(冗余) |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| amount | DECIMAL(10,2) | NOT NULL | 支付金额 |
| transaction_id | VARCHAR(64) | DEFAULT '' | 微信支付流水号 |
| status | TINYINT | DEFAULT 0 | 0=待支付 1=已支付 2=已退款 |
| paid_at | DATETIME | NULL | 支付时间 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 29. refund_payment（退款记录）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| payment_id | BIGINT UNSIGNED | NOT NULL | 原支付记录ID |
| refund_amount | DECIMAL(10,2) | NOT NULL | 退款金额 |
| refund_no | VARCHAR(64) | DEFAULT '' | 退款单号 |
| reason | VARCHAR(200) | DEFAULT '' | 退款原因 |
| status | TINYINT | DEFAULT 0 | 0=待退款 1=已退款 2=失败 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 十、客服消息模块

### 30. conversation（客服会话）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| admin_id | BIGINT UNSIGNED | NULL | 接入客服ID(NULL=待接入) |
| status | TINYINT | DEFAULT 0 | 0=待接入 1=进行中 2=已关闭 |
| last_message | VARCHAR(500) | DEFAULT '' | 最后消息摘要 |
| unread_count | INT UNSIGNED | DEFAULT 0 | 未读消息数 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 31. chat_message（客服消息）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| conversation_id | BIGINT UNSIGNED | NOT NULL | 会话ID |
| sender_id | BIGINT UNSIGNED | NOT NULL | 发送方ID |
| sender_type | TINYINT | NOT NULL | 1=用户 2=管理员 3=AI |
| content | TEXT | NOT NULL | 消息内容 |
| message_type | TINYINT | DEFAULT 3 | 1=订单 2=商品 3=其他 |
| reply_source | TINYINT | DEFAULT 0 | 0=人工 1=AI |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 十一、消息通知模块

### 32. notification（通知）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| title | VARCHAR(200) | NOT NULL | 通知标题 |
| content | TEXT | NOT NULL | 通知内容 |
| type | TINYINT | NOT NULL | 1=订单 2=活动 3=系统 |
| target_scope | TINYINT | DEFAULT 1 | 1=全部用户 2=指定用户 |
| target_ids | JSON | | 指定用户ID数组(scope=2时用) |
| send_type | TINYINT | DEFAULT 1 | 1=立即发送 2=定时发送 |
| send_at | DATETIME | NULL | 定时发送时间 |
| receiver_count | INT UNSIGNED | DEFAULT 0 | 接收人数 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 33. user_notification（用户通知）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| notification_id | BIGINT UNSIGNED | NOT NULL | 通知ID |
| user_id | BIGINT UNSIGNED | NOT NULL | 用户ID |
| is_read | TINYINT | DEFAULT 0 | 0=未读 1=已读 |
| read_at | DATETIME | NULL | 已读时间 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 34. notification_template（通知模板）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(100) | NOT NULL | 模板名称 |
| type | TINYINT | NOT NULL | 1=订单 2=活动 3=系统 |
| title_template | VARCHAR(200) | NOT NULL | 标题模板 |
| content_template | TEXT | NOT NULL | 内容模板 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

---

## 十二、首页管理模块

### 35. banner（轮播图）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| image_url | VARCHAR(500) | NOT NULL | 图片URL |
| link_url | VARCHAR(500) | DEFAULT '' | 跳转链接 |
| link_type | TINYINT | DEFAULT 0 | 0=无跳转 1=商品 2=活动 3=外部链接 |
| sort | INT | DEFAULT 0 | 排序值 |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 36. recommendation（推荐位）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(100) | NOT NULL | 推荐位名称 |
| sort | INT | DEFAULT 0 | 排序值 |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 37. recommendation_product（推荐位商品）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| recommendation_id | BIGINT UNSIGNED | NOT NULL | 推荐位ID |
| product_id | BIGINT UNSIGNED | NOT NULL | 商品ID |
| sort | INT | DEFAULT 0 | 排序值 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 十三、管理员与角色模块

### 38. admin（管理员）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| username | VARCHAR(50) | UNIQUE, NOT NULL | 用户名 |
| password | VARCHAR(255) | NOT NULL | 密码(bcrypt加密) |
| phone | VARCHAR(20) | DEFAULT '' | 手机号 |
| name | VARCHAR(50) | DEFAULT '' | 姓名 |
| status | TINYINT | DEFAULT 1 | 0=禁用 1=启用 |
| role_id | BIGINT UNSIGNED | NOT NULL | 角色ID |
| store_id | BIGINT UNSIGNED | NULL | 所属门店ID(仅门店店员) |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |
| deleted_at | DATETIME | NULL | |

### 39. role（角色）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| name | VARCHAR(50) | NOT NULL | 角色名称 |
| description | VARCHAR(200) | DEFAULT '' | 角色描述 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 十四、库存管理模块

### 40. inventory_log（出入库记录）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| sku_id | BIGINT UNSIGNED | NOT NULL | SKU ID |
| type | TINYINT | NOT NULL | 1=销售出库 2=采购入库 3=损耗 4=盘盈 5=盘亏 |
| quantity | INT | NOT NULL | 变动数量(正=入库 负=出库) |
| before_stock | INT UNSIGNED | NOT NULL | 变动前库存 |
| after_stock | INT UNSIGNED | NOT NULL | 变动后库存 |
| operator_id | BIGINT UNSIGNED | NOT NULL | 操作人ID |
| reason | VARCHAR(200) | DEFAULT '' | 变动原因 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

---

## 十五、系统设置模块

### 41. system_config（系统配置）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| config_key | VARCHAR(100) | UNIQUE, NOT NULL | 配置键 |
| config_value | VARCHAR(500) | NOT NULL | 配置值 |
| description | VARCHAR(200) | DEFAULT '' | 描述 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

### 42. operation_log（操作日志）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT UNSIGNED | PK | |
| operator_id | BIGINT UNSIGNED | NOT NULL | 操作人ID |
| operator_name | VARCHAR(50) | NOT NULL | 操作人姓名(冗余) |
| module | VARCHAR(50) | NOT NULL | 操作模块 |
| content | VARCHAR(500) | NOT NULL | 操作内容 |
| ip | VARCHAR(50) | DEFAULT '' | IP地址 |
| created_at | DATETIME | | |
| updated_at | DATETIME | | |

## 总结

- **总表数**：42张（含软删除）
