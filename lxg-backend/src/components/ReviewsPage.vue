<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Id = string | number
type ReviewStatus = 'approved' | 'pending' | 'rejected' | 'hidden'
type SummaryStatus = 'approved' | 'pending'

interface ReplyItem { id: Id; userName: string; content: string; time: string; likes: number }
interface AdminReply { id?: Id; content: string; time: string }
interface ReviewItem {
  id: Id; productId: Id | ''; goodsName: string; userName: string; phone: string; rating: number; content: string
  images: string[]; likes: number; status: ReviewStatus; createTime: string
  reply: AdminReply | null; replies: ReplyItem[]
}
interface SummaryItem { id: Id; productId: Id | ''; goodsName: string; content: string; review_count: number; status: SummaryStatus; createTime: string }

const props = defineProps<{ token?: string }>()
const reviews = ref<ReviewItem[]>([])
const summaries = ref<SummaryItem[]>([])
const loadingReviews = ref(false)
const loadingSummaries = ref(false)
const keyword = ref('')
const statusFilter = ref<'all' | ReviewStatus>('all')
const ratingFilter = ref<'all' | 'good' | 'bad'>('all')
const selectedReview = ref<ReviewItem | null>(null)
const detailLoading = ref(false)
const replyEditing = ref(false)
const replyContent = ref('')
const editingSummary = ref<SummaryItem | null>(null)
const summaryContent = ref('')
const generatingSummaryIds = ref<Set<string>>(new Set())

function headers(json = false) {
  const value = new Headers()
  if (json) value.set('Content-Type', 'application/json')
  if (props.token) value.set('Authorization', `Bearer ${props.token}`)
  return value
}

async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
    throw new Error(payload?.message || `请求失败 (${response.status})`)
  }
  return payload?.data ?? payload
}

function listFrom(value: any): any[] {
  return Array.isArray(value) ? value : value?.list ?? value?.items ?? value?.records ?? value?.reviews ?? value?.ai_list ?? value?.summaries ?? []
}
function notify(text: string, type: 'success' | 'error' = 'success') { ;(window as any).showToast?.(text, type) }
function statusKey(value: unknown): ReviewStatus {
  return ({ '0': 'pending', '1': 'approved', '2': 'rejected', '3': 'hidden', '待审核': 'pending', '显示': 'approved', '已拒绝': 'rejected', '隐藏': 'hidden', pending: 'pending', approved: 'approved', rejected: 'rejected', hidden: 'hidden' } as Record<string, ReviewStatus>)[String(value)] || 'hidden'
}
function reviewView(item: any): ReviewItem {
  const typeRating = { '好评': 5, '中评': 3, '差评': 1 }[String(item.review_type)]
  const rawReplies = item.replies ?? item.user_replies ?? item.reply_list ?? []
  const rawAdminReply = item.admin_reply ?? item.adminReply ?? (item.reply && !Array.isArray(item.reply) ? item.reply : null)
  return {
    id: item.ID ?? item.id,
    productId: item.product_id ?? item.productId ?? item.goods_id ?? item.goodsId ?? item.product?.ID ?? item.product?.id ?? '',
    goodsName: String(item.product_name ?? item.productName ?? item.goodsName ?? item.product?.name ?? ''),
    userName: String(item.user_nickname ?? item.userName ?? item.user?.nickname ?? ''),
    phone: String(item.user_phone ?? item.phone ?? item.user?.phone ?? ''),
    rating: typeRating ?? (Number(item.rating ?? item.score) || 0),
    content: String(item.content ?? ''), images: Array.isArray(item.images) ? item.images : [],
    likes: Number(item.likes) || 0, status: statusKey(item.status),
    createTime: String(item.created_at ?? item.createTime ?? item.CreatedAt ?? ''),
    reply: rawAdminReply ? { id: rawAdminReply.ID ?? rawAdminReply.id, content: String(rawAdminReply.content ?? rawAdminReply.reply_content ?? rawAdminReply), time: String(rawAdminReply.time ?? rawAdminReply.created_at ?? '') } : null,
    replies: listFrom(rawReplies).map((reply: any) => ({ id: reply.ID ?? reply.id, userName: String(reply.user_name ?? reply.userName ?? reply.user?.nickname ?? ''), content: String(reply.content ?? ''), time: String(reply.time ?? reply.created_at ?? ''), likes: Number(reply.likes) || 0 })),
  }
}
function summaryView(item: any): SummaryItem {
  const state = Number(item.status_id ?? item.state ?? item.status)
  return { id: item.ID ?? item.id, productId: item.product_id ?? item.productId ?? item.goods_id ?? item.goodsId ?? item.product?.ID ?? item.product?.id ?? '', goodsName: String(item.productName ?? item.product_name ?? item.goodsName ?? item.product?.name ?? ''), content: String(item.summary ?? item.summary_content ?? item.content ?? ''), review_count: Number(item.review_count ?? item.reviewCount) || 0, status: state === 1 ? 'approved' : 'pending', createTime: String(item.generated_at ?? item.created_at ?? '') }
}
function summaryIsNewer(candidate: SummaryItem, current: SummaryItem) {
  const candidateTime = Date.parse(candidate.createTime)
  const currentTime = Date.parse(current.createTime)
  if (Number.isFinite(candidateTime) && Number.isFinite(currentTime) && candidateTime !== currentTime) return candidateTime > currentTime
  const candidateId = Number(candidate.id)
  const currentId = Number(current.id)
  return Number.isFinite(candidateId) && Number.isFinite(currentId) ? candidateId > currentId : true
}
function mergeSummaries(rows: SummaryItem[]) {
  const result: SummaryItem[] = []
  const positions = new Map<string, number>()
  rows.forEach(item => {
    const key = item.productId !== '' ? `product:${item.productId}` : `summary:${item.id}`
    const position = positions.get(key)
    if (position === undefined) {
      positions.set(key, result.length)
      result.push(item)
    } else if (summaryIsNewer(item, result[position])) {
      result[position] = item
    }
  })
  return result
}

const stats = computed(() => ({
  good: reviews.value.filter(item => item.rating >= 4).length,
  bad: reviews.value.filter(item => item.rating < 3).length,
  pending: reviews.value.filter(item => item.status === 'pending').length,
  rejected: reviews.value.filter(item => item.status === 'rejected').length,
  hidden: reviews.value.filter(item => item.status === 'hidden').length,
}))
const filteredReviews = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  return reviews.value.filter(item => (statusFilter.value === 'all' || item.status === statusFilter.value)
    && (ratingFilter.value === 'all' || (ratingFilter.value === 'good' ? item.rating >= 4 : item.rating < 3))
    && (!value || item.goodsName.toLowerCase().includes(value) || item.userName.toLowerCase().includes(value) || item.content.toLowerCase().includes(value)))
})
async function loadReviews() {
  loadingReviews.value = true
  try {
    const params = new URLSearchParams({ page: '1', size: '10', keyword: keyword.value.trim(), review_type: ratingFilter.value === 'good' ? '好评' : ratingFilter.value === 'bad' ? '差评' : '', status: statusFilter.value === 'pending' ? '待审核' : statusFilter.value === 'approved' ? '显示' : statusFilter.value === 'rejected' ? '已拒绝' : statusFilter.value === 'hidden' ? '隐藏' : '', start_date: '', end_date: '' })
    const data = await requestJson(`/api/v1/admin/review/list?${params}`, { headers: headers() })
    reviews.value = listFrom(data).map(reviewView)
  } catch (cause) { reviews.value = []; notify(cause instanceof Error ? cause.message : '评价列表加载失败', 'error') }
  finally { loadingReviews.value = false }
}
async function loadSummaries() {
  loadingSummaries.value = true
  try { const data = await requestJson('/api/v1/admin/review/ailist?page=1&size=10', { headers: headers() }); summaries.value = mergeSummaries(listFrom(data).map(summaryView)) }
  catch (cause) { summaries.value = []; notify(cause instanceof Error ? cause.message : 'AI 评价摘要加载失败', 'error') }
  finally { loadingSummaries.value = false }
}
async function openDetail(item: ReviewItem) {
  selectedReview.value = item; detailLoading.value = true; replyEditing.value = false
  try {
    const data = await requestJson(`/api/v1/admin/review/detail?id=${encodeURIComponent(String(item.id))}`, { headers: headers() })
    const detail = reviewView({ ...item, ...(data?.review ?? data?.detail ?? data) })
    const index = reviews.value.findIndex(row => String(row.id) === String(item.id))
    if (index >= 0) reviews.value[index] = detail
    selectedReview.value = detail
  } catch (cause) { selectedReview.value = null; notify(cause instanceof Error ? cause.message : '评价详情加载失败', 'error') }
  finally { detailLoading.value = false }
}
async function reviewAction(item: ReviewItem, action: 'approve' | 'reject' | 'toggle') {
  try {
    if (action === 'approve' || action === 'reject') {
      await requestJson('/api/v1/admin/review/audit', { method: 'POST', headers: headers(true), body: JSON.stringify({ id: Number(item.id), status: action === 'approve' ? 1 : 2 }) })
      item.status = action === 'approve' ? 'approved' : 'rejected'
    } else {
      await requestJson('/api/v1/admin/review/hide', { method: 'POST', headers: headers(true), body: JSON.stringify({ id: Number(item.id) }) })
      item.status = item.status === 'approved' ? 'hidden' : 'approved'
    }
    notify('评价状态已更新')
  } catch (cause) { notify(cause instanceof Error ? cause.message : '评价操作失败', 'error') }
}
function startReply() {
  if (!selectedReview.value || selectedReview.value.status !== 'approved') {
    notify('只有已通过并处于显示状态的评价才能回复', 'error')
    return
  }
  replyContent.value = selectedReview.value.reply?.content ?? ''
  replyEditing.value = true
}
async function saveReply() {
  if (!selectedReview.value || selectedReview.value.status !== 'approved') return notify('只有显示状态的评价才能回复', 'error')
  if (!replyContent.value.trim()) return notify('请输入回复内容', 'error')
  try {
    await requestJson('/api/v1/admin/review/reply', { method: 'POST', headers: headers(true), body: JSON.stringify({ id: Number(selectedReview.value.id), content: replyContent.value.trim() }) })
    selectedReview.value.reply = { content: replyContent.value.trim(), time: new Date().toLocaleString() }
    replyEditing.value = false; notify('回复已保存')
  } catch (cause) { notify(cause instanceof Error ? cause.message : '回复保存失败', 'error') }
}
async function deleteUserReply(reply: ReplyItem) {
  if (!selectedReview.value || !window.confirm('确定删除此用户回复吗？')) return
  try {
    await requestJson('/api/v1/admin/delete/reply', { method: 'POST', headers: headers(true), body: JSON.stringify({ id: Number(reply.id) }) })
    selectedReview.value.replies = selectedReview.value.replies.filter(item => String(item.id) !== String(reply.id)); notify('用户回复已删除')
  } catch (cause) { notify(cause instanceof Error ? cause.message : '删除用户回复失败', 'error') }
}
async function summaryAction(item: SummaryItem, action: 'approve' | 'reject') {
  if (action === 'reject' && !window.confirm('确定删除此 AI 摘要吗？')) return
  try {
    await requestJson('/api/v1/admin/audit/summary', { method: 'POST', headers: headers(true), body: JSON.stringify({ id: Number(item.id), action: action === 'approve' ? 0 : 1 }) })
    if (action === 'approve') item.status = 'approved'; else summaries.value = summaries.value.filter(row => String(row.id) !== String(item.id))
    notify(action === 'approve' ? 'AI 评价摘要已发布' : 'AI 评价摘要已删除')
  } catch (cause) { notify(cause instanceof Error ? cause.message : '摘要操作失败', 'error') }
}
function openSummaryEditor(item: SummaryItem) { editingSummary.value = item; summaryContent.value = item.content }
async function saveSummary() {
  if (!editingSummary.value || !summaryContent.value.trim()) return notify('摘要内容不能为空', 'error')
  try {
    await requestJson('/api/v1/admin/edit/review', { method: 'POST', headers: headers(true), body: JSON.stringify({ id: Number(editingSummary.value.id), content: summaryContent.value.trim() }) })
    editingSummary.value.content = summaryContent.value.trim(); editingSummary.value = null; notify('AI 评价摘要已更新')
  } catch (cause) { notify(cause instanceof Error ? cause.message : '摘要编辑失败', 'error') }
}
async function generateSummary(targetProductId?: Id) {
  const productId = Number(targetProductId)
  if (!Number.isInteger(productId) || productId <= 0) return notify('请选择需要生成摘要的商品', 'error')
  const productKey = String(productId)
  if (generatingSummaryIds.value.has(productKey)) return
  generatingSummaryIds.value = new Set(generatingSummaryIds.value).add(productKey)
  try {
    const data = await requestJson('/api/v1/admin/review/generate-summary', {
      method: 'POST', headers: headers(true), body: JSON.stringify({ product_id: productId }),
    })
    notify('AI 评价摘要生成成功')
    const raw = data?.summary ?? data?.item ?? data?.record ?? data
    if (raw && typeof raw === 'object' && !Array.isArray(raw) && (raw.summary !== undefined || raw.summary_content !== undefined || raw.content !== undefined)) {
      const next = summaryView({ ...raw, product_id: raw.product_id ?? raw.productId ?? productId })
      const index = summaries.value.findIndex(item => String(item.productId) === String(productId))
      if (index >= 0) summaries.value[index] = next; else summaries.value.push(next)
    } else {
      await loadSummaries()
    }
  } catch (cause) { notify(cause instanceof Error ? cause.message : 'AI 评价摘要生成失败', 'error') }
  finally {
    const next = new Set(generatingSummaryIds.value)
    next.delete(productKey)
    generatingSummaryIds.value = next
  }
}
function isGeneratingSummary(productId: Id | '') {
  return productId !== '' && generatingSummaryIds.value.has(String(productId))
}
function statusText(value: ReviewStatus) { return { approved: '显示', pending: '待审核', rejected: '已拒绝', hidden: '隐藏' }[value] }
function ratingText(value: number) { return value >= 4 ? '好评' : value >= 3 ? '中评' : '差评' }

onMounted(() => Promise.all([loadReviews(), loadSummaries()]))
</script>

<template>
  <div class="reviews-page">
    <div class="review-stats">
      <div class="stat-card"><div class="label"><i class="fas fa-thumbs-up"></i> 好评</div><div class="value green">{{ stats.good }}</div></div>
      <div class="stat-card"><div class="label"><i class="fas fa-thumbs-down"></i> 差评</div><div class="value red">{{ stats.bad }}</div></div>
      <div class="stat-card"><div class="label"><i class="fas fa-clock"></i> 待审核</div><div class="value yellow">{{ stats.pending }}</div></div>
      <div class="stat-card"><div class="label"><i class="fas fa-ban"></i> 已拒绝</div><div class="value red">{{ stats.rejected }}</div></div>
      <div class="stat-card"><div class="label"><i class="fas fa-trash"></i> 已隐藏</div><div class="value gray">{{ stats.hidden }}</div></div>
    </div>
    <div class="search-bar review-search"><input v-model="keyword" placeholder="商品名称 / 用户" @keydown.enter="loadReviews"><select v-model="statusFilter" @change="loadReviews"><option value="all">全部状态</option><option value="pending">待审核</option><option value="approved">显示</option><option value="rejected">已拒绝</option><option value="hidden">隐藏</option></select><select v-model="ratingFilter" @change="loadReviews"><option value="all">全部评价</option><option value="good">好评</option><option value="bad">差评</option></select><button class="btn btn-primary" @click="loadReviews"><i class="fas fa-search"></i> 搜索</button></div>

    <div class="card"><div class="card-header"><span class="card-title"><i class="fas fa-star"></i> 评价列表</span><span class="text-muted">共 {{ filteredReviews.length }} 条评价</span></div><div class="card-body no-pad"><div class="table-wrap"><table><thead><tr><th>商品</th><th>用户</th><th>评价</th><th>评价内容</th><th>时间</th><th>状态</th><th>操作</th></tr></thead><tbody><tr v-if="loadingReviews"><td colspan="7" class="empty"><i class="fas fa-spinner fa-spin"></i></td></tr><tr v-else-if="!filteredReviews.length"><td colspan="7" class="empty">暂无评价</td></tr><tr v-for="item in filteredReviews" v-else :key="item.id"><td><div class="goods-cell"><span class="goods-thumb"></span>{{ item.goodsName }}</div></td><td>{{ item.userName }}<small>{{ item.phone }}</small></td><td><span class="status-badge" :class="item.rating >= 4 ? 'green' : item.rating >= 3 ? 'yellow' : 'red'"><span class="dot"></span>{{ ratingText(item.rating) }}</span></td><td class="ellipsis">{{ item.content }}</td><td>{{ item.createTime }}</td><td><span class="status-badge" :class="item.status === 'approved' ? 'green' : item.status === 'pending' ? 'yellow' : item.status === 'rejected' ? 'red' : 'gray'"><span class="dot"></span>{{ statusText(item.status) }}</span></td><td><div class="row-actions"><button class="btn btn-sm btn-outline" @click="openDetail(item)"><i class="fas fa-eye"></i> 详情</button><template v-if="item.status === 'pending'"><button class="btn btn-sm btn-success" @click="reviewAction(item,'approve')"><i class="fas fa-check"></i> 通过</button><button class="btn btn-sm btn-danger" @click="reviewAction(item,'reject')"><i class="fas fa-times"></i> 拒绝</button></template><button v-else class="btn btn-sm btn-outline" @click="reviewAction(item,'toggle')">{{ item.status === 'approved' ? '隐藏' : '显示' }}</button></div></td></tr></tbody></table></div></div></div>

    <div class="card"><div class="card-header"><span class="card-title"><i class="fas fa-robot"></i> AI 评价摘要审核</span><span class="text-muted">系统自动生成评价摘要，需审核后发布</span></div><div class="card-body no-pad"><div class="table-wrap"><table><thead><tr><th>商品</th><th>摘要内容</th><th>基于评价数</th><th>状态</th><th>生成时间</th><th>操作</th></tr></thead><tbody><tr v-if="loadingSummaries"><td colspan="6" class="empty"><i class="fas fa-spinner fa-spin"></i></td></tr><tr v-else-if="!summaries.length"><td colspan="6" class="empty">暂无 AI 评价摘要</td></tr><tr v-for="item in summaries" v-else :key="item.id"><td>{{ item.goodsName }}</td><td class="ellipsis summary-cell">{{ item.content }}</td><td>{{ item.review_count }}条</td><td><span class="status-badge" :class="item.status === 'approved' ? 'green' : 'yellow'"><span class="dot"></span>{{ item.status === 'approved' ? '已发布' : '待审核' }}</span></td><td>{{ item.createTime }}</td><td><div class="row-actions"><template v-if="item.status === 'pending'"><button class="btn btn-sm btn-success" @click="summaryAction(item,'approve')"><i class="fas fa-check"></i> 通过</button><button class="btn btn-sm btn-danger" @click="summaryAction(item,'reject')"><i class="fas fa-trash"></i> 删除</button></template><button class="btn btn-sm btn-outline" @click="openSummaryEditor(item)"><i class="fas fa-edit"></i> 编辑</button><button class="btn btn-sm btn-outline" :disabled="isGeneratingSummary(item.productId) || !item.productId" @click="generateSummary(item.productId)"><i class="fas" :class="isGeneratingSummary(item.productId) ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'"></i> {{ isGeneratingSummary(item.productId) ? '生成中...' : '重新生成' }}</button></div></td></tr></tbody></table></div></div></div>
  </div>

  <template v-if="selectedReview"><div class="modal-overlay" @click="selectedReview=null"></div><div class="modal-content review-modal"><div class="modal-header"><h3><i class="fas fa-star"></i> 评价详情</h3><button class="modal-close" @click="selectedReview=null"><i class="fas fa-times"></i></button></div><div class="modal-body"><div v-if="detailLoading" class="empty"><i class="fas fa-spinner fa-spin"></i></div><div v-else class="detail-grid"><section><h4>评价原文</h4><div class="detail-card"><div class="review-user"><span>{{ selectedReview.userName.charAt(0) }}</span><div><strong>{{ selectedReview.userName }}</strong><small>{{ selectedReview.phone }}</small></div></div><div class="stars"><i v-for="index in 5" :key="index" :class="index <= selectedReview.rating ? 'fas fa-star' : 'far fa-star'"></i></div><p>{{ selectedReview.content }}</p><small><i class="fas fa-thumbs-up"></i> {{ selectedReview.likes }} · {{ selectedReview.createTime }}</small></div></section><section><h4>管理员回复</h4><div class="detail-card"><template v-if="replyEditing"><textarea v-model="replyContent" class="form-control" rows="4"></textarea><div class="row-actions"><button class="btn btn-sm btn-primary" @click="saveReply">保存</button><button class="btn btn-sm btn-outline" @click="replyEditing=false">取消</button></div></template><template v-else-if="selectedReview.reply"><p>{{ selectedReview.reply.content }}</p><small>{{ selectedReview.reply.time }}</small><button class="btn btn-sm btn-outline" @click="startReply"><i class="fas fa-edit"></i> 编辑</button></template><div v-else class="empty"><p>暂无管理员回复</p><button class="btn btn-sm btn-primary" @click="startReply"><i class="fas fa-plus"></i> 添加回复</button></div></div></section><section class="user-replies"><h4>用户回复</h4><div class="detail-card"><div v-if="!selectedReview.replies.length" class="empty">暂无用户回复</div><div v-for="reply in selectedReview.replies" v-else :key="reply.id" class="user-reply"><div><strong>{{ reply.userName }}</strong><small>{{ reply.time }}</small><p>{{ reply.content }}</p></div><button class="icon-btn danger" @click="deleteUserReply(reply)"><i class="fas fa-trash"></i></button></div></div></section></div></div><div class="modal-footer"><template v-if="selectedReview.status === 'pending'"><button class="btn btn-success" @click="reviewAction(selectedReview,'approve')">通过</button><button class="btn btn-danger" @click="reviewAction(selectedReview,'reject')">拒绝</button></template><button v-else class="btn btn-outline" @click="reviewAction(selectedReview,'toggle')">{{ selectedReview.status === 'approved' ? '隐藏' : '显示' }}</button><button class="btn btn-outline" @click="selectedReview=null">关闭</button></div></div></template>
  <template v-if="editingSummary"><div class="modal-overlay" @click="editingSummary=null"></div><div class="modal-content summary-modal"><div class="modal-header"><h3>编辑 AI 评价摘要</h3><button class="modal-close" @click="editingSummary=null"><i class="fas fa-times"></i></button></div><div class="modal-body"><textarea v-model="summaryContent" class="form-control" rows="7"></textarea></div><div class="modal-footer"><button class="btn btn-primary" @click="saveSummary">保存</button><button class="btn btn-outline" @click="editingSummary=null">取消</button></div></div></template>
</template>

<style scoped>
.reviews-page{display:flex;flex-direction:column;gap:12px;min-width:0}.review-stats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.review-search{margin:0}.text-muted{font-size:13px;color:#94a3b8}.goods-cell,.row-actions,.review-user{display:flex;align-items:center;gap:8px}.goods-thumb{width:28px;height:28px;flex:0 0 28px;background:#e2e8f0;border-radius:4px}td small,.review-user small{display:block;color:#94a3b8;font-size:11px}.ellipsis{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.summary-cell{max-width:320px}.row-actions{flex-wrap:wrap}.empty{text-align:center;padding:24px;color:#94a3b8}.review-modal{width:min(900px,calc(100vw - 32px))}.summary-modal{width:min(600px,calc(100vw - 32px))}.modal-body{max-height:65vh;overflow:auto}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.detail-grid h4{margin:0 0 8px}.detail-card{padding:16px;border:1px solid #e2e8f0;border-radius:8px}.review-user>span{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#4f6ef7;color:#fff}.stars{color:#fbbf24;margin:14px 0}.detail-card p{white-space:pre-wrap;line-height:1.6}.user-replies{grid-column:1/-1}.user-reply{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9}.form-control{width:100%;padding:9px 12px;border:1px solid #e2e8f0;border-radius:6px;resize:vertical}.danger{color:#ef4444}@media(max-width:1200px){.review-stats{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:768px){.review-stats,.detail-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.review-search{flex-wrap:wrap}.user-replies{grid-column:1/-1}}@media(max-width:520px){.review-stats,.detail-grid{grid-template-columns:1fr}.user-replies{grid-column:auto}}[data-theme='dark'] .detail-card,[data-theme='dark'] .form-control{background:#111827;border-color:#334155;color:#e5e7eb}
</style>
