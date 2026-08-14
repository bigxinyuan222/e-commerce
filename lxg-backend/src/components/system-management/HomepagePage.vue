<!--
  @file HomepagePage.vue
  @description 首页管理页面组件
  @module 系统管理模块
  @key-features 轮播图/Banner管理（增删改查、排序、上下架）、推荐位管理（增删改查、启用/禁用）、推荐商品管理（搜索、添加、移除）
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

/** ID类型，可能为数字或字符串 */
type Id = string | number
/** 轮播图状态：active（已发布）/ draft（草稿） */
type BannerStatus = 'active' | 'draft'
/** 链接类型：none（无跳转）/ goods（商品）/ activity（活动）/ category（分类）/ external（外部链接） */
type LinkType = 'none' | 'goods' | 'activity' | 'category' | 'external'

/** 轮播图数据结构 */
interface Banner { id: Id; image: string; linkType: LinkType; link: string; sort: number; status: BannerStatus }
/** 商品数据结构 */
interface Product { id: Id; name: string; price: number; image: string; category: string; status: number }
/** 推荐位数据结构 */
interface Recommendation { id: Id; name: string; status: 'active' | 'inactive'; goods: Id[]; createTime: string }

const props = defineProps<{ token?: string }>()

// ===== 响应式状态 =====
const banners = ref<Banner[]>([])                    // 轮播图列表
const recommendations = ref<Recommendation[]>([])   // 推荐位列表
const products = ref<Product[]>([])                  // 商品搜索结果列表
const loading = ref(true)                           // 页面整体加载状态
const error = ref('')                               // 错误信息
const bannerOpen = ref(false)                       // 轮播图编辑弹窗是否打开
const bannerSubmitting = ref(false)                  // 轮播图保存提交中
const uploading = ref(false)                        // 图片上传中状态
const bannerForm = reactive({ id: '' as Id | '', title: '', image: '', linkType: 'none' as LinkType, link: '', sort: 1, status: 'active' as BannerStatus }) // 轮播图编辑表单
const recommendOpen = ref(false)                    // 推荐位新增弹窗是否打开
const recommendSubmitting = ref(false)              // 推荐位保存提交中
const recommendForm = reactive({ name: '', status: 'active' as 'active' | 'inactive' }) // 推荐位表单
const editingRecommendation = ref<Recommendation | null>(null) // 当前编辑商品的推荐位
const productsLoading = ref(false)                  // 商品列表加载中
const productSearch = ref('')                       // 商品搜索关键词
const productActionId = ref<Id | null>(null)        // 正在操作的商品ID（防止重复操作）

// ===== 计算属性 =====
/** 已发布的轮播图数量 */
const activeBanners = computed(() => banners.value.filter(item => item.status === 'active').length)
/** 启用状态的推荐位数量 */
const activeRecommendations = computed(() => recommendations.value.filter(item => item.status === 'active').length)

/** 构建带认证信息的请求头，可选设置JSON Content-Type */
function headers(json = false) { const result = new Headers(); if (json) result.set('Content-Type', 'application/json'); if (props.token) result.set('Authorization', `Bearer ${props.token}`); return result }

/** 统一请求封装，处理响应码和错误，返回data字段 */
async function requestJson(url: string, options: RequestInit = {}) { const response = await fetch(url, { credentials: 'include', ...options }); const payload = await response.json().catch(() => null); if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload?.message || `请求失败 (${response.status})`); return payload?.data ?? payload }

/** 从接口返回数据中提取列表，兼容多种字段名 */
function listFrom(data: any) { return Array.isArray(data) ? data : data?.list ?? data?.items ?? data?.records ?? [] }

/** 显示Toast通知消息 */
function notify(text: string, type: 'success' | 'error' = 'success') { window.showToast?.(text, type) }

/** 格式化日期时间为中文格式字符串 */
function formatTime(value: unknown) { if (!value) return '-'; const date = new Date(String(value)); if (Number.isNaN(date.getTime())) return String(value); return date.toLocaleString('zh-CN', { hour12: false }) }

/** 将链接类型字段归一化为标准LinkType */
function linkType(value: unknown): LinkType { if (typeof value === 'string' && ['none', 'goods', 'activity', 'category', 'external'].includes(value)) return value as LinkType; return ({ 0: 'none', 1: 'goods', 2: 'activity', 3: 'category', 4: 'external' } as Record<number, LinkType>)[Number(value)] || 'none' }

/** 将后端原始轮播图数据映射为标准Banner结构 */
function bannerView(row: any): Banner { return { id: row.ID ?? row.id, image: String(row.imageUrl ?? row.image_url ?? row.image ?? ''), linkType: linkType(row.linkType ?? row.link_type), link: String(row.linkUrl ?? row.link_url ?? row.link ?? ''), sort: Number(row.sort) || 0, status: Number(row.status) === 1 ? 'active' : 'draft' } }

/** 将后端原始推荐位数据映射为标准Recommendation结构 */
function recommendationView(row: any): Recommendation { return { id: row.ID ?? row.id, name: String(row.name ?? ''), status: Number(row.status) === 1 ? 'active' : 'inactive', goods: listFrom(row.products ?? row.goods).map((item: any) => item.productId ?? item.product_id ?? item.goodsId ?? item.id).filter(Boolean), createTime: formatTime(row.CreatedAt ?? row.createdAt ?? row.createTime) } }

/**
 * 加载轮播图列表
 * @api GET /api/v1/admin/banners - 获取轮播图列表，按sort排序
 */
async function loadBanners() { const data = await requestJson('/api/v1/admin/banners?page=1&pageSize=20&status=1', { headers: headers() }); banners.value = listFrom(data).map(bannerView).sort((a: Banner, b: Banner) => a.sort - b.sort) }

/**
 * 加载推荐位列表
 * @api GET /api/v1/admin/recommendations - 获取推荐位列表
 */
async function loadRecommendations() { const data = await requestJson('/api/v1/admin/recommendations?page=1&pageSize=20&status=1', { headers: headers() }); recommendations.value = listFrom(data).map(recommendationView) }

/** 将后端原始商品数据映射为标准Product结构 */
function productView(row: any): Product { return { id: row.ID ?? row.id, name: String(row.name ?? row.productName ?? row.product_name ?? ''), price: Number(row.originalPrice ?? row.original_price ?? row.price) || 0, image: String(row.image ?? row.images?.[0] ?? ''), category: [row.firstCategoryName ?? row.first_category_name, row.secondCategoryName ?? row.second_category_name ?? row.categoryName ?? row.category_name].filter(Boolean).join(' / ') || '-', status: Number(row.status ?? 0) } }

/**
 * 加载商品列表（按关键词搜索）
 * @api GET /api/v1/admin/product/list - 搜索商品列表
 */
async function loadProducts() { productsLoading.value = true; try { const params = new URLSearchParams({ page: '1', size: '20' }); const keyword = productSearch.value.trim(); if (keyword) params.set('key_word', keyword); const data = await requestJson(`/api/v1/admin/product/list?${params}`, { headers: headers() }); products.value = listFrom(data).map(productView) } catch (cause) { products.value = []; notify(cause instanceof Error ? cause.message : '商品搜索失败', 'error') } finally { productsLoading.value = false } }

/** 加载页面数据（并行加载轮播图和推荐位） */
async function loadPage() { loading.value = true; error.value = ''; try { await Promise.all([loadBanners(), loadRecommendations()]) } catch (cause) { error.value = cause instanceof Error ? cause.message : '首页管理数据加载失败' } finally { loading.value = false } }

/**
 * 打开轮播图编辑弹窗
 * @param item - 传入轮播图则编辑，不传则新增
 * @description 编辑时加载轮播图详情
 */
function openBanner(item?: Banner) { Object.assign(bannerForm, item ? { id: item.id, title: '', image: item.image, linkType: item.linkType, link: item.link, sort: item.sort, status: item.status } : { id: '', title: '', image: '', linkType: 'none', link: '', sort: banners.value.length + 1, status: 'active' }); bannerOpen.value = true; if (item) void loadBannerDetail(item.id) }

/**
 * 加载轮播图详情
 * @api GET /api/v1/admin/banners/{id} - 获取单个轮播图详情
 */
async function loadBannerDetail(id: Id) { try { const data = await requestJson(`/api/v1/admin/banners/${id}`, { headers: headers() }); const item = bannerView(data); Object.assign(bannerForm, { id: item.id, image: item.image, linkType: item.linkType, link: item.link, sort: item.sort, status: item.status }) } catch (cause) { notify(cause instanceof Error ? cause.message : '轮播图详情加载失败', 'error'); bannerOpen.value = false } }

/**
 * 上传轮播图图片
 * @api POST /api/v1/user/upload - 上传图片文件
 * @description 通过FormData上传图片，成功后设置bannerForm.image
 */
async function uploadBanner(event: Event) { const input = event.target as HTMLInputElement; const file = input.files?.[0]; input.value = ''; if (!file) return; uploading.value = true; try { const form = new FormData(); form.append('file', file); const data = await requestJson('/api/v1/user/upload', { method: 'POST', headers: headers(), body: form }); const url = typeof data === 'string' ? data : data?.url ?? data?.imageUrl ?? data?.image_url; if (!url) throw new Error('上传成功但未返回图片地址'); bannerForm.image = String(url); notify('图片上传成功') } catch (cause) { notify(cause instanceof Error ? cause.message : '图片上传失败', 'error') } finally { uploading.value = false } }

/**
 * 保存轮播图（新增或更新）
 * @api POST /api/v1/admin/banners - 新增轮播图
 * @api PUT /api/v1/admin/banners/{id} - 更新轮播图
 */
async function saveBanner() { if (!bannerForm.image) return notify('请先选择并上传轮播图片', 'error'); bannerSubmitting.value = true; const body = { imageUrl: bannerForm.image, linkUrl: bannerForm.link.trim(), linkType: ({ none: 0, goods: 1, activity: 2, category: 3, external: 4 } as Record<LinkType, number>)[bannerForm.linkType], sort: Number(bannerForm.sort) || 1, status: bannerForm.status === 'active' ? 1 : 0 }; try { if (bannerForm.id !== '') await requestJson(`/api/v1/admin/banners/${bannerForm.id}`, { method: 'PUT', headers: headers(true), body: JSON.stringify(body) }); else await requestJson('/api/v1/admin/banners', { method: 'POST', headers: headers(true), body: JSON.stringify(body) }); bannerOpen.value = false; notify(bannerForm.id !== '' ? '轮播图已更新' : '轮播图创建成功'); await loadBanners() } catch (cause) { notify(cause instanceof Error ? cause.message : '轮播图保存失败', 'error') } finally { bannerSubmitting.value = false } }

/** 调整轮播图排序（上移/下移），更新所有排序号 */
function moveBanner(index: number, offset: number) { const target = index + offset; if (target < 0 || target >= banners.value.length) return; const next = [...banners.value]; [next[index], next[target]] = [next[target], next[index]]; next.forEach((item, position) => { item.sort = position + 1 }); banners.value = next }

/**
 * 切换轮播图发布/下架状态
 * @api PUT /api/v1/admin/banners/{id}/toggle - 切换轮播图状态
 */
async function toggleBanner(item: Banner) { try { await requestJson(`/api/v1/admin/banners/${item.id}/toggle`, { method: 'PUT', headers: headers() }); item.status = item.status === 'active' ? 'draft' : 'active'; notify(item.status === 'active' ? '轮播图已发布' : '轮播图已下架') } catch (cause) { notify(cause instanceof Error ? cause.message : '操作失败', 'error') } }

/**
 * 删除轮播图（二次确认后执行）
 * @api DELETE /api/v1/admin/banners/{id} - 删除轮播图
 */
async function deleteBanner(item: Banner) { if (!window.confirm('确定删除此轮播图吗？')) return; try { await requestJson(`/api/v1/admin/banners/${item.id}`, { method: 'DELETE', headers: headers() }); banners.value = banners.value.filter(row => String(row.id) !== String(item.id)); notify('轮播图已删除') } catch (cause) { notify(cause instanceof Error ? cause.message : '删除失败', 'error') } }

/** 打开新增推荐位弹窗 */
function openRecommendation() { Object.assign(recommendForm, { name: '', status: 'active' }); recommendOpen.value = true }

/**
 * 保存新增推荐位
 * @api POST /api/v1/admin/recommendations - 创建推荐位
 * @description 校验名称非空且不重复后提交
 */
async function saveRecommendation() { if (!recommendForm.name.trim()) return notify('请输入推荐位名称', 'error'); if (recommendations.value.some(item => item.name === recommendForm.name.trim())) return notify('该推荐位名称已存在', 'error'); recommendSubmitting.value = true; try { const data = await requestJson('/api/v1/admin/recommendations', { method: 'POST', headers: headers(true), body: JSON.stringify({ name: recommendForm.name.trim(), status: recommendForm.status === 'active' ? 1 : 0 }) }); recommendations.value.push(recommendationView(data)); recommendOpen.value = false; notify('推荐位创建成功') } catch (cause) { notify(cause instanceof Error ? cause.message : '推荐位创建失败', 'error') } finally { recommendSubmitting.value = false } }

/**
 * 切换推荐位启用/禁用状态
 * @api PUT /api/v1/admin/recommendations/{id} - 更新推荐位状态
 */
async function toggleRecommendation(item: Recommendation) { const next = item.status === 'active' ? 'inactive' : 'active'; try { await requestJson(`/api/v1/admin/recommendations/${item.id}`, { method: 'PUT', headers: headers(true), body: JSON.stringify({ name: item.name, status: next === 'active' ? 1 : 0 }) }); item.status = next; notify(`推荐位已${next === 'active' ? '启用' : '禁用'}`) } catch (cause) { notify(cause instanceof Error ? cause.message : '操作失败', 'error') } }

/**
 * 删除推荐位（二次确认后执行）
 * @api DELETE /api/v1/admin/recommendations/{id} - 删除推荐位
 */
async function deleteRecommendation(item: Recommendation) { if (!window.confirm(`确定删除推荐位 ${item.name} 吗？`)) return; try { await requestJson(`/api/v1/admin/recommendations/${item.id}`, { method: 'DELETE', headers: headers() }); recommendations.value = recommendations.value.filter(row => String(row.id) !== String(item.id)); notify('推荐位已删除') } catch (cause) { notify(cause instanceof Error ? cause.message : '删除失败', 'error') } }

/**
 * 打开推荐位商品编辑弹窗，加载已关联商品和可搜索商品
 * @api GET /api/v1/admin/recommendations/{id}/products - 获取推荐位已关联商品
 */
async function editProducts(item: Recommendation) { editingRecommendation.value = item; productSearch.value = ''; productsLoading.value = true; try { const data = await requestJson(`/api/v1/admin/recommendations/${item.id}/products`, { headers: headers() }); item.goods = listFrom(data).map((row: any) => row.productId ?? row.product_id ?? row.ID ?? row.id).filter(Boolean); await loadProducts() } catch (cause) { editingRecommendation.value = null; notify(cause instanceof Error ? cause.message : '推荐商品加载失败', 'error') } finally { productsLoading.value = false } }

/**
 * 添加商品到推荐位
 * @api POST /api/v1/admin/recommendations/{id}/products - 添加推荐商品
 */
async function addProduct(item: Product) { const rec = editingRecommendation.value; if (!rec || productActionId.value !== null) return; productActionId.value = item.id; try { await requestJson(`/api/v1/admin/recommendations/${rec.id}/products`, { method: 'POST', headers: headers(true), body: JSON.stringify({ productId: Number(item.id) || item.id }) }); rec.goods.push(item.id); notify('商品已添加到推荐位') } catch (cause) { notify(cause instanceof Error ? cause.message : '添加商品失败', 'error') } finally { productActionId.value = null } }

/**
 * 从推荐位移除商品
 * @api DELETE /api/v1/admin/recommendations/{id}/products/{productId} - 移除推荐商品
 */
async function removeProduct(item: Product) { const rec = editingRecommendation.value; if (!rec || productActionId.value !== null) return; productActionId.value = item.id; try { await requestJson(`/api/v1/admin/recommendations/${rec.id}/products/${item.id}`, { method: 'DELETE', headers: headers() }); rec.goods = rec.goods.filter(id => String(id) !== String(item.id)); notify('推荐商品已移除') } catch (cause) { notify(cause instanceof Error ? cause.message : '移除商品失败', 'error') } finally { productActionId.value = null } }

/** 将链接类型转换为中文显示文本 */
function linkText(type: LinkType) { return ({ none: '无跳转', goods: '商品详情', activity: '活动页', category: '分类页', external: '外部链接' } as Record<LinkType, string>)[type] }

// ===== 生命周期：组件挂载时加载页面数据 =====
onMounted(loadPage)
</script>

<template>
  <!-- 首页管理主容器 -->
  <div class="homepage-page">
    <!-- 错误提示 -->
    <div v-if="error" class="homepage-error">
      <i class="fas fa-exclamation-circle"></i> {{ error }}
      <button class="btn btn-sm btn-outline" @click="loadPage">重试</button>
    </div>
    <!-- 统计卡片栏：轮播图总数、已发布、启用推荐位 -->
    <div class="homepage-stats">
      <div class="stat-card">
        <div class="label"><i class="fas fa-images"></i> 轮播图总数</div>
        <div class="value">{{ banners.length }}</div>
      </div>
      <div class="stat-card">
        <div class="label"><i class="fas fa-check-circle"></i> 已发布</div>
        <div class="value green">{{ activeBanners }}</div>
      </div>
      <div class="stat-card">
        <div class="label"><i class="fas fa-star"></i> 启用推荐位</div>
        <div class="value blue">{{ activeRecommendations }}</div>
      </div>
    </div>
    <!-- 轮播图管理卡片 -->
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="fas fa-images"></i> 轮播图 / Banner</span>
        <button class="btn btn-primary btn-sm" @click="openBanner()"><i class="fas fa-plus"></i> 新增轮播图</button>
      </div>
      <div class="card-body no-pad">
        <!-- 轮播图列表表格 -->
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>排序</th>
                <th>图片</th>
                <th>链接类型</th>
                <th>链接地址</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading"><td colspan="6" class="empty">正在加载...</td></tr>
              <tr v-else-if="!banners.length"><td colspan="6" class="empty">暂无轮播图</td></tr>
              <tr v-for="(item,index) in banners" v-else :key="item.id">
                <td>{{ item.sort }}</td>
                <td><img :src="item.image" class="banner-thumb" alt="轮播图"></td>
                <td><span class="tag">{{ linkText(item.linkType) }}</span></td>
                <td class="link-cell">{{ item.link || '-' }}</td>
                <td><span class="status-badge" :class="item.status==='active'?'green':'gray'"><span class="dot"></span>{{ item.status==='active'?'已发布':'草稿' }}</span></td>
                <td>
                  <div class="row-actions">
                    <button class="btn btn-sm btn-outline" title="上移" :disabled="index===0" @click="moveBanner(index,-1)"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-sm btn-outline" title="下移" :disabled="index===banners.length-1" @click="moveBanner(index,1)"><i class="fas fa-arrow-down"></i></button>
                    <button class="btn btn-sm btn-outline" title="编辑" :data-banner-edit-id="item.id" @click="openBanner(item)"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm" :class="item.status==='active'?'btn-danger':'btn-success'" :data-banner-toggle-id="item.id" @click="toggleBanner(item)">{{ item.status==='active'?'下架':'发布' }}</button>
                    <button class="btn btn-sm btn-danger" title="删除" :data-banner-delete-id="item.id" @click="deleteBanner(item)"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 推荐位管理布局：左侧推荐位列表 + 右侧推荐位摘要 -->
    <div class="homepage-recommend-layout">
      <!-- 推荐位管理卡片 -->
      <div class="card">
        <div class="card-header">
          <span class="card-title"><i class="fas fa-thumbtack"></i> 推荐位管理</span>
          <button class="btn btn-primary btn-sm" @click="openRecommendation"><i class="fas fa-plus"></i> 新增推荐</button>
        </div>
        <div class="card-body no-pad">
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>推荐位</th>
                  <th>商品数量</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!recommendations.length"><td colspan="5" class="empty">暂无推荐位</td></tr>
                <tr v-for="item in recommendations" v-else :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.goods.length }} 件</td>
                  <td><span class="status-badge" :class="item.status==='active'?'green':'gray'"><span class="dot"></span>{{ item.status==='active'?'启用':'禁用' }}</span></td>
                  <td>{{ item.createTime }}</td>
                  <td>
                    <div class="row-actions">
                      <button class="btn btn-sm btn-outline" @click="editProducts(item)"><i class="fas fa-edit"></i> 编辑商品</button>
                      <button class="btn btn-sm" :class="item.status==='active'?'btn-danger':'btn-success'" @click="toggleRecommendation(item)">{{ item.status==='active'?'禁用':'启用' }}</button>
                      <button class="btn btn-sm btn-danger" @click="deleteRecommendation(item)"><i class="fas fa-trash"></i> 删除</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- 推荐位摘要列表卡片 -->
      <div class="card">
        <div class="card-header">
          <span class="card-title"><i class="fas fa-list"></i> 推荐位列表</span>
        </div>
        <div class="card-body recommend-summary">
          <div v-if="!recommendations.length" class="empty">暂无推荐位</div>
          <div v-for="item in recommendations" v-else :key="item.id">
            <span>{{ item.name }}</span>
            <span class="status-badge" :class="item.status==='active'?'green':'gray'"><span class="dot"></span>{{ item.status==='active'?'启用':'禁用' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 轮播图新增/编辑弹窗 -->
  <template v-if="bannerOpen">
    <div class="modal-overlay" @click="bannerOpen=false"></div>
    <div class="modal-content homepage-modal">
      <div class="modal-header">
        <h3>{{ bannerForm.id!==''?'编辑':'新增' }}轮播图</h3>
        <button class="modal-close" @click="bannerOpen=false"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body form-stack">
        <label>
          标题
          <input id="bannerTitle" v-model="bannerForm.title" class="form-control">
        </label>
        <label>
          轮播图片
          <input id="bannerImageFile" type="file" accept="image/*" class="form-control" @change="uploadBanner">
          <input id="bannerImage" :value="bannerForm.image" type="hidden">
        </label>
        <div v-if="uploading" class="muted"><i class="fas fa-spinner fa-spin"></i> 上传中...</div>
        <img v-if="bannerForm.image" id="bannerImagePreview" :src="bannerForm.image" class="banner-preview" alt="预览">
        <div class="form-grid">
          <label>
            链接类型
            <select id="bannerLinkType" v-model="bannerForm.linkType" class="form-control">
              <option value="none">无跳转</option>
              <option value="goods">商品详情</option>
              <option value="activity">活动页</option>
              <option value="category">分类页</option>
              <option value="external">外部链接</option>
            </select>
          </label>
          <label>
            链接地址
            <input id="bannerLink" v-model="bannerForm.link" class="form-control">
          </label>
          <label>
            排序权重
            <input id="bannerSort" v-model.number="bannerForm.sort" type="number" class="form-control">
          </label>
          <label>
            状态
            <select id="bannerStatus" v-model="bannerForm.status" class="form-control">
              <option value="draft">草稿</option>
              <option value="active">已发布</option>
            </select>
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="bannerOpen=false">取消</button>
        <button class="btn btn-primary" :disabled="bannerSubmitting||uploading" @click="saveBanner"><i class="fas fa-save"></i> 保存</button>
      </div>
    </div>
  </template>
  <!-- 推荐位新增弹窗 -->
  <template v-if="recommendOpen">
    <div class="modal-overlay" @click="recommendOpen=false"></div>
    <div class="modal-content recommend-modal">
      <div class="modal-header">
        <h3>新增推荐位</h3>
        <button class="modal-close" @click="recommendOpen=false"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body form-stack">
        <label>
          推荐位名称
          <input id="recommendName" v-model="recommendForm.name" class="form-control">
        </label>
        <label>
          初始状态
          <select id="recommendStatus" v-model="recommendForm.status" class="form-control">
            <option value="active">启用</option>
            <option value="inactive">禁用</option>
          </select>
        </label>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="recommendOpen=false">取消</button>
        <button class="btn btn-primary" :disabled="recommendSubmitting" @click="saveRecommendation">保存</button>
      </div>
    </div>
  </template>
  <!-- 推荐位商品编辑弹窗（搜索/添加/移除商品） -->
  <template v-if="editingRecommendation">
    <div class="modal-overlay" @click="editingRecommendation=null"></div>
    <div class="modal-content products-modal">
      <div class="modal-header">
        <h3>添加商品到推荐位 - {{ editingRecommendation.name }}</h3>
        <button class="modal-close" @click="editingRecommendation=null"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">
        <form class="product-search-bar" @submit.prevent="loadProducts">
          <input id="recommendProductSearch" v-model="productSearch" class="form-control" placeholder="输入商品名称搜索">
          <button class="btn btn-primary" type="submit" :disabled="productsLoading"><i :class="productsLoading?'fas fa-spinner fa-spin':'fas fa-search'"></i> 搜索</button>
        </form>
        <div class="product-search-tip">搜索并选择商品，无需填写商品 ID</div>
        <div class="recommend-product-table table-wrap">
          <table>
            <thead>
              <tr>
                <th>商品</th>
                <th>分类</th>
                <th>价格</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="productsLoading"><td colspan="5" class="empty"><i class="fas fa-spinner fa-spin"></i> 正在加载商品...</td></tr>
              <tr v-for="item in products" v-else :key="item.id">
                <td>
                  <div class="recommend-product-name">
                    <img v-if="item.image" :src="item.image" alt="">
                    <span>{{ item.name }}</span>
                  </div>
                </td>
                <td>{{ item.category }}</td>
                <td class="product-price">¥{{ item.price.toFixed(2) }}</td>
                <td><span class="status-badge" :class="item.status===1?'green':'gray'"><span class="dot"></span>{{ item.status===1?'上架':'下架' }}</span></td>
                <td>
                  <button v-if="editingRecommendation.goods.some(id=>String(id)===String(item.id))" class="btn btn-sm btn-danger" :disabled="productActionId!==null" @click="removeProduct(item)"><i :class="productActionId===item.id?'fas fa-spinner fa-spin':'fas fa-times'"></i> 移除</button>
                  <button v-else class="btn btn-sm btn-primary" :data-add-product-id="item.id" :disabled="productActionId!==null" @click="addProduct(item)"><i :class="productActionId===item.id?'fas fa-spinner fa-spin':'fas fa-plus'"></i> 选择</button>
                </td>
              </tr>
              <tr v-if="!productsLoading&&!products.length"><td colspan="5" class="empty">未找到匹配商品</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <span class="selected-count">已添加 {{ editingRecommendation.goods.length }} 件商品</span>
        <button class="btn btn-primary" @click="editingRecommendation=null">完成</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
/* 页面布局、错误提示、统计卡片、表格基础样式 */
.homepage-page{display:flex;flex-direction:column;gap:12px}.homepage-error{padding:10px 12px;border:1px solid #fecaca;border-radius:7px;background:#fef2f2;color:#b91c1c}.homepage-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.homepage-stats .value{font-size:22px}.green{color:#22c55e}.blue{color:#4f6ef7}.banner-thumb{width:80px;height:40px;object-fit:cover;border-radius:4px}.link-cell{max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.row-actions{display:flex;gap:4px;flex-wrap:wrap}.empty{text-align:center;padding:24px;color:#94a3b8}
/* 推荐位布局、摘要卡片样式 */
.homepage-recommend-layout{display:grid;grid-template-columns:minmax(0,2fr) minmax(240px,1fr);gap:12px}.recommend-summary{display:flex;flex-direction:column;gap:8px}.recommend-summary>div{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;background:#f8fafc}
/* 弹窗样式：轮播图弹窗、推荐位弹窗、商品弹窗 */
.homepage-modal{width:min(640px,calc(100vw - 32px))}.recommend-modal{width:min(500px,calc(100vw - 32px))}.products-modal{width:min(860px,calc(100vw - 32px))}.form-stack{display:flex;flex-direction:column;gap:12px;max-height:65vh;overflow:auto}.form-stack label{display:flex;flex-direction:column;gap:5px;color:#64748b;font-size:13px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.form-control{width:100%;padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;background:#fff;color:#1e293b}.banner-preview{width:100%;height:180px;object-fit:cover;border-radius:7px}.muted{color:#64748b;font-size:12px}
/* 推荐位商品搜索和表格样式 */
.product-search-bar{display:flex;gap:8px}.product-search-bar .form-control{flex:1}.product-search-tip{margin:8px 0 14px;color:#64748b;font-size:12px}.recommend-product-table{max-height:52vh;overflow:auto}.recommend-product-table table{min-width:680px}.recommend-product-name{display:flex;align-items:center;gap:9px;min-width:180px}.recommend-product-name img{width:40px;height:40px;border-radius:6px;object-fit:cover}.product-price{color:#ef4444;font-weight:600}.products-modal .modal-footer{justify-content:space-between}.selected-count{color:#64748b;font-size:13px}
/* 暗色主题适配 */
[data-theme='dark'] .recommend-summary>div,[data-theme='dark'] .form-control{background:#111827;color:#e5e7eb;border-color:#334155}
/* 响应式布局 */
@media(max-width:850px){.homepage-recommend-layout{grid-template-columns:1fr}}@media(max-width:600px){.homepage-stats,.form-grid{grid-template-columns:1fr}.product-search-bar{align-items:stretch;flex-direction:column}}
</style>
