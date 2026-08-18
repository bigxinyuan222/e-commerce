<!--
  文件名称：StoresPage.vue
  所属模块：门店管理模块（store-management）
  功能说明：门店总览页面，展示全平台门店列表，支持搜索/状态筛选、新增/编辑/删除/启停门店，
           并展示门店销售排行榜（按订单数排名）。
  接口说明：API 基础路径 /api/v1/admin/stores（含 toggle 启停和 CRUD 操作）
-->
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
type Id = string | number
// 门店数据结构
interface Store { id: Id; name: string; address: string; phone: string; businessHours: string; status: number; orderCount: number; clerkCount: number }
const props = defineProps<{ token?: string }>()
const rows = ref<Store[]>([])        // 门店列表数据
const loading = ref(false)            // 列表加载状态
const error = ref('')                 // 列表加载错误信息
const keyword = ref('')               // 搜索关键词（门店名称/地址/电话）
const status = ref('')                // 状态筛选值（''=全部 '1'=营业中 '0'=已停用）
const editing = ref<Store | null>(null) // 当前编辑的门店（null表示关闭弹窗）
const saving = ref(false)              // 保存中状态
const form = reactive({ name: '', address: '', phone: '', businessHours: '' }) // 门店编辑表单数据

// 本地筛选后的门店列表（按状态+关键词过滤）
const filtered = computed(() => rows.value.filter(x => (!status.value || String(x.status) === status.value) && (!keyword.value || `${x.name}${x.address}${x.phone}`.toLowerCase().includes(keyword.value.toLowerCase()))))
// 门店销售排行（取营业中门店按订单数降序前6名）
const ranking = computed(() => rows.value
  .filter(store => store.status === 1)
  .slice()
  .sort((left, right) => right.orderCount - left.orderCount)
  .slice(0, 6))
/** 构建请求头，携带 JWT Token，可选设置 JSON Content-Type */
function headers(json = false) { const h = new Headers(); if (props.token) h.set('Authorization', `Bearer ${props.token}`); if (json) h.set('Content-Type','application/json'); return h }
/** 统一请求封装，自动解析 code/data 结构并抛出业务错误 */
async function request(url:string, options:RequestInit={}) { const r=await fetch(url,{credentials:'include',...options}); const p=await r.json().catch(()=>null); if(!r.ok || (p?.code!==undefined && ![0,200].includes(p.code))) throw new Error(p?.message||`请求失败 (${r.status})`); return p?.data??p }
/** 将后端门店行数据归一化为前端 Store 结构（兼容蛇形/驼峰命名） */
function normalize(x:any):Store { return { id:x.ID??x.id, name:x.name??'', address:x.address??'', phone:x.phone??'', businessHours:x.businessHours??x.business_hours??'', status:Number(x.status??1), orderCount:Number(x.orderCount??x.order_count??0), clerkCount:Number(x.clerkCount??x.clerk_count??0) } }
/** 轻量级提示（通过全局 showToast 方法） */
function toast(text:string,type='success'){ (window as any).showToast?.(text,type) }
/** 加载门店列表（API: GET /api/v1/admin/stores） */
async function load(){ loading.value=true; error.value=''; try { const d=await request('/api/v1/admin/stores',{headers:headers()}); const list=Array.isArray(d)?d:d?.list??d?.items??d?.records??d?.stores??[]; rows.value=list.map(normalize) } catch(e){ error.value=e instanceof Error?e.message:'门店列表加载失败' } finally { loading.value=false } }
/** 打开新增/编辑弹窗：传入门店则为编辑，否则为新增 */
function open(row?:Store){ editing.value=row??({id:'',name:'',address:'',phone:'',businessHours:'',status:1,orderCount:0,clerkCount:0}); Object.assign(form,row??{name:'',address:'',phone:'',businessHours:''}) }
/** 保存门店（API: POST 新增 / PUT 更新 /api/v1/admin/stores） */
async function save(){ if(!form.name.trim()||!form.address.trim()) return toast('请填写门店名称和地址','error'); saving.value=true; try { const id=editing.value?.id; await request(id?`/api/v1/admin/stores/${id}`:'/api/v1/admin/stores',{method:id?'PUT':'POST',headers:headers(true),body:JSON.stringify(form)}); editing.value=null; toast('门店保存成功'); await load() } catch(e){ toast(e instanceof Error?e.message:'保存失败','error') } finally { saving.value=false } }
/** 切换门店启用/停用状态（API: PUT /api/v1/admin/stores/:id/toggle） */
async function toggle(row:Store){ try { await request(`/api/v1/admin/stores/${row.id}/toggle`,{method:'PUT',headers:headers(true),body:JSON.stringify({status:row.status===1?0:1})}); toast('门店状态已更新'); await load() } catch(e){ toast(e instanceof Error?e.message:'操作失败','error') } }
/** 删除门店（API: DELETE /api/v1/admin/stores/:id） */
async function remove(row:Store){ if(!confirm(`确定删除门店“${row.name}”吗？`)) return; try { await request(`/api/v1/admin/stores/${row.id}`,{method:'DELETE',headers:headers()}); toast('门店已删除'); await load() } catch(e){ toast(e instanceof Error?e.message:'删除失败','error') } }
// 组件挂载时加载门店列表
onMounted(load)
</script>
<template>
  <!-- 搜索工具栏：关键词搜索 + 状态筛选 + 新增门店按钮 -->
  <div class="flex-between mb-4">
    <div class="search-bar">
      <input v-model="keyword" placeholder="门店名称 / 地址 / 电话">
      <select v-model="status"><option value="">全部状态</option><option value="1">营业中</option><option value="0">已停用</option></select>
    </div>
    <button class="btn btn-primary" @click="open()"><i class="fas fa-plus"></i> 新增门店</button>
  </div>
  <!-- 门店统计卡片 -->
  <div class="system-stats-row">
    <div class="stat-card">
      <div class="label">门店总数</div>
      <div class="value">{{ rows.length }}</div>
    </div>
    <div class="stat-card">
      <div class="label">营业中</div>
      <div class="value green">{{ rows.filter(x=>x.status===1).length }}</div>
    </div>
    <div class="stat-card">
      <div class="label">已停用</div>
      <div class="value yellow">{{ rows.filter(x=>x.status!==1).length }}</div>
    </div>
  </div>
  <!-- 门店列表卡片 -->
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-store-alt"></i> 门店列表</span>
    </div>
    <div class="card-body no-pad">
      <!-- 错误提示 -->
      <div v-if="error" class="page-error">{{ error }}</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>门店</th>
              <th>地址</th>
              <th>电话</th>
              <th>营业时间</th>
              <th>订单数</th>
              <th>店员数</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <!-- 加载中 -->
            <tr v-if="loading">
              <td colspan="8">正在加载...</td>
            </tr>
            <!-- 空数据 -->
            <tr v-else-if="!filtered.length">
              <td colspan="8">暂无门店数据</td>
            </tr>
            <!-- 门店数据行 -->
            <tr v-for="row in filtered" :key="row.id">
              <td>{{ row.name }}</td>
              <td>{{ row.address }}</td>
              <td>{{ row.phone }}</td>
              <td>{{ row.businessHours||'-' }}</td>
              <td>{{ row.orderCount }}</td>
              <td>{{ row.clerkCount }}</td>
              <td><span class="status-badge" :class="row.status===1?'green':'red'"><span class="dot"></span>{{ row.status===1?'营业中':'已停用' }}</span></td>
              <!-- 操作按钮：编辑/启停/删除 -->
              <td>
                <button class="btn btn-sm btn-outline" @click="open(row)">编辑</button>
                <button class="btn btn-sm" :class="row.status===1?'btn-danger':'btn-success'" @click="toggle(row)">{{ row.status===1?'停用':'启用' }}</button>
                <button class="btn btn-sm btn-danger" @click="remove(row)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- 门店销售排行卡片 -->
  <div class="card store-ranking">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-chart-bar"></i> 门店销售排行</span>
    </div>
    <div class="card-body">
      <!-- 排行加载中 -->
      <div v-if="loading" class="ranking-state"><i class="fas fa-spinner fa-spin"></i> 正在统计...</div>
      <!-- 排行空数据 -->
      <div v-else-if="!ranking.length" class="ranking-state"><i class="fas fa-inbox"></i> 暂无营业门店订单数据</div>
      <!-- 排行卡片网格 -->
      <div v-else class="ranking-grid">
        <!-- 单个排行卡片 -->
        <div v-for="(store, index) in ranking" :key="store.id" class="rank-card" :class="{ top: index === 0 }">
          <div class="rank-header">
            <span class="rank-badge" :class="index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'other'">{{ index + 1 }}</span>
            <span class="rank-name">{{ store.name }}</span>
          </div>
          <div class="rank-value">{{ store.orderCount }}</div>
          <div class="rank-label">累计订单</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增/编辑门店弹窗 -->
  <template v-if="editing">
    <div class="modal-overlay" @click="editing=null"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ editing.id?'编辑门店':'新增门店' }}</h3>
        <button class="modal-close" @click="editing=null">×</button>
      </div>
      <div class="modal-body">
        <!-- 门店信息表单 -->
        <div class="system-form-grid">
          <label>门店名称<input v-model="form.name" class="system-form-input"></label>
          <label>联系电话<input v-model="form.phone" class="system-form-input"></label>
          <label>门店地址<input v-model="form.address" class="system-form-input"></label>
          <label>营业时间<input v-model="form.businessHours" class="system-form-input" placeholder="09:00-21:00"></label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" @click="editing=null">取消</button>
        <button class="btn btn-primary" :disabled="saving" @click="save">保存</button>
      </div>
    </div>
  </template>
</template>
<style scoped>
/* 门店排行榜区域 */
.store-ranking{margin-top:16px} /* 排行卡片网格：3列布局 */
.ranking-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px} /* 排行空状态 */
.ranking-state{padding:28px;text-align:center;color:#94a3b8} /* 排行门店名称（溢出省略） */
.rank-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} /* 响应式：中等屏幕2列 */
@media(max-width:900px){.ranking-grid{grid-template-columns:repeat(2,minmax(0,1fr))}} /* 响应式：小屏幕1列 */
@media(max-width:560px){.ranking-grid{grid-template-columns:1fr}}
</style>
