<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
type Id = string | number
interface Store { id: Id; name: string; address: string; phone: string; businessHours: string; status: number; orderCount: number; clerkCount: number }
const props = defineProps<{ token?: string }>()
const rows = ref<Store[]>([]), loading = ref(false), error = ref(''), keyword = ref(''), status = ref('')
const editing = ref<Store | null>(null), saving = ref(false)
const form = reactive({ name: '', address: '', phone: '', businessHours: '' })
const filtered = computed(() => rows.value.filter(x => (!status.value || String(x.status) === status.value) && (!keyword.value || `${x.name}${x.address}${x.phone}`.toLowerCase().includes(keyword.value.toLowerCase()))))
const ranking = computed(() => rows.value
  .filter(store => store.status === 1)
  .slice()
  .sort((left, right) => right.orderCount - left.orderCount)
  .slice(0, 6))
function headers(json = false) { const h = new Headers(); if (props.token) h.set('Authorization', `Bearer ${props.token}`); if (json) h.set('Content-Type','application/json'); return h }
async function request(url:string, options:RequestInit={}) { const r=await fetch(url,{credentials:'include',...options}); const p=await r.json().catch(()=>null); if(!r.ok || (p?.code!==undefined && ![0,200].includes(p.code))) throw new Error(p?.message||`请求失败 (${r.status})`); return p?.data??p }
function normalize(x:any):Store { return { id:x.ID??x.id, name:x.name??'', address:x.address??'', phone:x.phone??'', businessHours:x.businessHours??x.business_hours??'', status:Number(x.status??1), orderCount:Number(x.orderCount??x.order_count??0), clerkCount:Number(x.clerkCount??x.clerk_count??0) } }
function toast(text:string,type='success'){ (window as any).showToast?.(text,type) }
async function load(){ loading.value=true; error.value=''; try { const d=await request('/api/v1/admin/stores',{headers:headers()}); const list=Array.isArray(d)?d:d?.list??d?.items??d?.records??d?.stores??[]; rows.value=list.map(normalize) } catch(e){ error.value=e instanceof Error?e.message:'门店列表加载失败' } finally { loading.value=false } }
function open(row?:Store){ editing.value=row??({id:'',name:'',address:'',phone:'',businessHours:'',status:1,orderCount:0,clerkCount:0}); Object.assign(form,row??{name:'',address:'',phone:'',businessHours:''}) }
async function save(){ if(!form.name.trim()||!form.address.trim()) return toast('请填写门店名称和地址','error'); saving.value=true; try { const id=editing.value?.id; await request(id?`/api/v1/admin/stores/${id}`:'/api/v1/admin/stores',{method:id?'PUT':'POST',headers:headers(true),body:JSON.stringify(form)}); editing.value=null; toast('门店保存成功'); await load() } catch(e){ toast(e instanceof Error?e.message:'保存失败','error') } finally { saving.value=false } }
async function toggle(row:Store){ try { await request(`/api/v1/admin/stores/${row.id}/toggle`,{method:'PUT',headers:headers(true),body:JSON.stringify({status:row.status===1?0:1})}); toast('门店状态已更新'); await load() } catch(e){ toast(e instanceof Error?e.message:'操作失败','error') } }
async function remove(row:Store){ if(!confirm(`确定删除门店“${row.name}”吗？`)) return; try { await request(`/api/v1/admin/stores/${row.id}`,{method:'DELETE',headers:headers()}); toast('门店已删除'); await load() } catch(e){ toast(e instanceof Error?e.message:'删除失败','error') } }
onMounted(load)
</script>
<template>
  <div class="flex-between mb-4"><div class="search-bar"><input v-model="keyword" placeholder="门店名称 / 地址 / 电话"><select v-model="status"><option value="">全部状态</option><option value="1">营业中</option><option value="0">已停用</option></select></div><button class="btn btn-primary" @click="open()"><i class="fas fa-plus"></i> 新增门店</button></div>
  <div class="system-stats-row"><div class="stat-card"><div class="label">门店总数</div><div class="value">{{ rows.length }}</div></div><div class="stat-card"><div class="label">营业中</div><div class="value green">{{ rows.filter(x=>x.status===1).length }}</div></div><div class="stat-card"><div class="label">已停用</div><div class="value yellow">{{ rows.filter(x=>x.status!==1).length }}</div></div></div>
  <div class="card"><div class="card-header"><span class="card-title"><i class="fas fa-store-alt"></i> 门店列表</span></div><div class="card-body no-pad"><div v-if="error" class="page-error">{{ error }}</div><div class="table-wrap"><table><thead><tr><th>门店</th><th>地址</th><th>电话</th><th>营业时间</th><th>订单数</th><th>店员数</th><th>状态</th><th>操作</th></tr></thead><tbody><tr v-if="loading"><td colspan="8">正在加载...</td></tr><tr v-else-if="!filtered.length"><td colspan="8">暂无门店数据</td></tr><tr v-for="row in filtered" :key="row.id"><td>{{ row.name }}</td><td>{{ row.address }}</td><td>{{ row.phone }}</td><td>{{ row.businessHours||'-' }}</td><td>{{ row.orderCount }}</td><td>{{ row.clerkCount }}</td><td><span class="status-badge" :class="row.status===1?'green':'red'"><span class="dot"></span>{{ row.status===1?'营业中':'已停用' }}</span></td><td><button class="btn btn-sm btn-outline" @click="open(row)">编辑</button> <button class="btn btn-sm" :class="row.status===1?'btn-danger':'btn-success'" @click="toggle(row)">{{ row.status===1?'停用':'启用' }}</button> <button class="btn btn-sm btn-danger" @click="remove(row)">删除</button></td></tr></tbody></table></div></div></div>
  <div class="card store-ranking">
    <div class="card-header"><span class="card-title"><i class="fas fa-chart-bar"></i> 门店销售排行</span></div>
    <div class="card-body">
      <div v-if="loading" class="ranking-state"><i class="fas fa-spinner fa-spin"></i> 正在统计...</div>
      <div v-else-if="!ranking.length" class="ranking-state"><i class="fas fa-inbox"></i> 暂无营业门店订单数据</div>
      <div v-else class="ranking-grid">
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
  <template v-if="editing"><div class="modal-overlay" @click="editing=null"></div><div class="modal-content"><div class="modal-header"><h3>{{ editing.id?'编辑门店':'新增门店' }}</h3><button class="modal-close" @click="editing=null">×</button></div><div class="modal-body"><div class="system-form-grid"><label>门店名称<input v-model="form.name" class="system-form-input"></label><label>联系电话<input v-model="form.phone" class="system-form-input"></label><label>门店地址<input v-model="form.address" class="system-form-input"></label><label>营业时间<input v-model="form.businessHours" class="system-form-input" placeholder="09:00-21:00"></label></div></div><div class="modal-footer"><button class="btn btn-outline" @click="editing=null">取消</button><button class="btn btn-primary" :disabled="saving" @click="save">保存</button></div></div></template>
</template>
<style scoped>
.store-ranking{margin-top:16px}.ranking-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.ranking-state{padding:28px;text-align:center;color:#94a3b8}.rank-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media(max-width:900px){.ranking-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.ranking-grid{grid-template-columns:1fr}}
</style>
