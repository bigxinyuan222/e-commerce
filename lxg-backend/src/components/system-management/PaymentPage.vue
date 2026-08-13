<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
interface Payment {id:string;orderId:string;amount:number;method:string;transactionId:string;status:string;time:string} interface Refund{id:string;txnId:string;orderId:string;amount:number;reason:string;status:string;time:string}
const props=defineProps<{token?:string}>();const payments=ref<Payment[]>([]),refunds=ref<Refund[]>([]),paymentTotal=ref(0),refundTotal=ref(0),loading=ref(false),error=ref('');const pf=reactive({page:1,status:'',start:'',end:''}),rf=reactive({page:1,status:'',start:'',end:''});const size=10;const pp=computed(()=>Math.max(1,Math.ceil(paymentTotal.value/size))),rp=computed(()=>Math.max(1,Math.ceil(refundTotal.value/size)))
function headers(){const h=new Headers();if(props.token)h.set('Authorization',`Bearer ${props.token}`);return h}async function request(url:string){const r=await fetch(url,{headers:headers(),credentials:'include'});const p=await r.json().catch(()=>null);if(!r.ok||(p?.code!==undefined&&![0,200].includes(p.code)))throw new Error(p?.message||`请求失败 (${r.status})`);return p?.data??p}function list(d:any,k:string){return Array.isArray(d)?d:d?.list??d?.items??d?.records??d?.[k]??[]}function ps(x:any){const v=x.status;return [1,'1','paid','success'].includes(v)?'success':[2,'2','refunded'].includes(v)?'refunded':v==='failed'?'failed':'pending'}function rs(x:any){const v=x.status;return [1,'1','refunded','success'].includes(v)?'refunded':[2,'2','failed'].includes(v)?'failed':'pending'}
async function loadPayments(){const q=new URLSearchParams({page:String(pf.page),pageSize:String(size),status:pf.status,start_date:pf.start,end_date:pf.end});const d=await request(`/api/v1/admin/payments?${q}`);payments.value=list(d,'payments').map((x:any)=>({id:String(x.payment_no??x.paymentNo??x.ID??x.id??''),orderId:String(x.order_no??x.orderNo??x.order_id??''),amount:Number(x.amount??x.pay_amount??0),method:'微信支付',transactionId:String(x.transactionId??x.transaction_id??x.TransactionID??''),status:ps(x),time:fmt(x.UpdatedAt??x.paid_at??x.created_at??x.createdAt)}));paymentTotal.value=Number(d?.total??d?.count)||payments.value.length}async function loadRefunds(){const q=new URLSearchParams({page:String(rf.page),pageSize:String(size),status:rf.status,start_date:rf.start,end_date:rf.end});const d=await request(`/api/v1/admin/refund-payments?${q}`);refunds.value=list(d,'refunds').map((x:any)=>({id:String(x.refund_no??x.refundNo??x.ID??x.id??''),txnId:String(x.payment_no??x.paymentNo??''),orderId:String(x.order_no??x.orderNo??''),amount:Number(x.refundAmount??x.refund_amount??x.amount??0),reason:x.refund_reason??x.reason??'-',status:rs(x),time:fmt(x.UpdatedAt??x.refunded_at??x.created_at??x.createdAt)}));refundTotal.value=Number(d?.total??d?.count)||refunds.value.length}async function load(){loading.value=true;error.value='';try{await Promise.all([loadPayments(),loadRefunds()])}catch(e){error.value=e instanceof Error?e.message:'支付数据加载失败'}finally{loading.value=false}}function valid(x:{start:string,end:string}){if(x.start&&x.end&&x.start>x.end){(window as any).showToast?.('开始日期不能晚于结束日期','error');return false}return true}async function search(type:'p'|'r'){const f=type==='p'?pf:rf;if(!valid(f))return;f.page=1;type==='p'?await loadPayments():await loadRefunds()}async function page(type:'p'|'r',n:number){const f=type==='p'?pf:rf;f.page=n;type==='p'?await loadPayments():await loadRefunds()}function text(s:string){return({pending:'待处理',success:'已支付',refunded:'已退款',failed:'失败'} as any)[s]??s}function fmt(v:any){if(!v)return'-';const d=new Date(String(v));if(Number.isNaN(d.getTime()))return String(v);const p=(n:number)=>String(n).padStart(2,'0');return`${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`}onMounted(load)
</script>
<template>
  <div v-if="error" class="page-error">{{ error }}</div>
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-list"></i> 支付记录</span>
      <span>共 {{ paymentTotal }} 笔交易</span>
    </div>
    <div class="card-body no-pad">
      <div class="search-bar payment-filters">
        <select v-model="pf.status">
          <option value="">全部状态</option>
          <option value="0">待支付</option>
          <option value="1">已支付</option>
          <option value="2">已退款</option>
        </select>
        <input v-model="pf.start" type="date">
        <span>至</span>
        <input v-model="pf.end" type="date">
        <button class="btn btn-primary" @click="search('p')">筛选</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>交易号</th>
              <th>订单号</th>
              <th>金额</th>
              <th>支付方式</th>
              <th>交易号</th>
              <th>状态</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading"><td colspan="7">正在加载...</td></tr>
            <tr v-else-if="!payments.length"><td colspan="7">暂无支付记录</td></tr>
            <tr v-for="x in payments" :key="x.id">
              <td>{{x.id}}</td>
              <td>{{x.orderId}}</td>
              <td><b>¥{{x.amount}}</b></td>
              <td>{{x.method}}</td>
              <td>{{x.transactionId}}</td>
              <td><span class="status-badge" :class="x.status==='success'?'green':x.status==='pending'?'yellow':'red'"><span class="dot"></span>{{text(x.status)}}</span></td>
              <td>{{x.time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="stock-pagination payment-pagination">
        <span>第 {{pf.page}} / {{pp}} 页</span>
        <div>
          <button class="btn btn-sm btn-outline" :disabled="pf.page<=1" @click="page('p',pf.page-1)">上一页</button>
          <button class="btn btn-sm btn-outline" :disabled="pf.page>=pp" @click="page('p',pf.page+1)">下一页</button>
        </div>
      </div>
    </div>
  </div>
  <div class="card mt-4">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-undo"></i> 退款记录</span>
      <span>共 {{refundTotal}} 笔</span>
    </div>
    <div class="card-body no-pad">
      <div class="search-bar payment-refund-filters">
        <select v-model="rf.status">
          <option value="">全部状态</option>
          <option value="0">待退款</option>
          <option value="1">已退款</option>
          <option value="2">失败</option>
        </select>
        <input v-model="rf.start" type="date">
        <span>至</span>
        <input v-model="rf.end" type="date">
        <button class="btn btn-primary" @click="search('r')">筛选</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>退款单号</th>
              <th>原订单号</th>
              <th>退款金额</th>
              <th>退款原因</th>
              <th>状态</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!refunds.length"><td colspan="6">暂无退款记录</td></tr>
            <tr v-for="x in refunds" :key="x.id">
              <td>{{x.id}}</td>
              <td>{{x.orderId}}</td>
              <td><b>¥{{x.amount}}</b></td>
              <td>{{x.reason}}</td>
              <td><span class="status-badge" :class="x.status==='refunded'?'green':x.status==='pending'?'yellow':'red'"><span class="dot"></span>{{text(x.status)}}</span></td>
              <td>{{x.time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="stock-pagination payment-pagination">
        <span>第 {{rf.page}} / {{rp}} 页</span>
        <div>
          <button class="btn btn-sm btn-outline" :disabled="rf.page<=1" @click="page('r',rf.page-1)">上一页</button>
          <button class="btn btn-sm btn-outline" :disabled="rf.page>=rp" @click="page('r',rf.page+1)">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>
