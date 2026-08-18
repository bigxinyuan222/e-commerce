<!--
  @file SettingsPage.vue
  @description 系统设置页面组件
  @module 系统管理模块
  @key-features 系统配置管理（增删改查、批量保存）、订单/库存独立配置卡片、操作日志查看与筛选
-->
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import BusinessConfigPage from "./BusinessConfigPage.vue";

/** 系统配置数据结构 */
type Config = {
  id: string | number;
  configKey: string;
  configValue: string;
  description: string;
};

/** 操作日志数据结构 */
type Log = {
  id: string | number;
  operator: string;
  module: string;
  content: string;
  ip: string;
  type: string;
  time: string;
};

const props = defineProps<{ token?: string }>();

/** 独立配置项的key集合（这些配置在专用卡片中维护，不在通用列表中显示） */
const standaloneConfigKeys = new Set([
  "order_auto_cancel_minutes",
  "order_auto_complete_days",
  "order_after_sale_days",
  "inventory_warning_value",
  "inventory_warning_enabled",
]);

// ===== 响应式状态 =====
const configs = ref<Config[]>([]),         // 系统配置列表
  logs = ref<Log[]>([]),                  // 操作日志列表
  keyword = ref(""),                       // 配置搜索关键词
  logKeyword = ref(""),                    // 日志搜索关键词
  loading = ref(false),                    // 加载状态
  modal = ref(false),                      // 编辑弹窗是否打开
  editing = ref<Config | null>(null);      // 当前编辑的配置项
const form = ref({ configKey: "", configValue: "", description: "" }); // 配置编辑表单
const logPage = ref(1);                    // 日志当前页码
const LOG_PAGE_SIZE = 10;                 // 日志每页条数
const logTotalPages = computed(() =>
  Math.max(1, Math.ceil(logs.value.length / LOG_PAGE_SIZE))
);
const pagedLogs = computed(() =>
  logs.value.slice(
    (logPage.value - 1) * LOG_PAGE_SIZE,
    logPage.value * LOG_PAGE_SIZE
  )
);

/** 构建带认证信息的请求头，可选设置JSON Content-Type */
function headers(json = false) {
  const h = new Headers();
  if (props.token) h.set("Authorization", "Bearer " + props.token);
  if (json) h.set("Content-Type", "application/json");
  return h;
}

/** 统一请求封装，处理响应码和错误 */
async function request(url: string, o: RequestInit = {}) {
  const r = await fetch(url, { credentials: "include", ...o });
  const p = await r.json().catch(() => null);
  if (!r.ok || (p?.code !== undefined && ![0, 200].includes(p.code)))
    throw new Error(p?.message || "请求失败");
  return p?.data ?? p;
}

/** 从接口返回数据中提取列表，兼容多种字段名 */
function arr(d: any) {
  return Array.isArray(d)
    ? d
    : (d?.list ?? d?.items ?? d?.records ?? d?.configs ?? []);
}

/** 格式化日期时间为 YYYY-MM-DD HH:mm:ss */
function formatTime(value: any) {
  if (!value) return "-";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * 加载系统配置列表
 * @api GET /api/v1/admin/system/configs - 获取系统配置，支持关键词搜索
 * @description 过滤掉独立配置项（在专用卡片中维护）
 */
async function loadConfigs() {
  loading.value = true;
  try {
    const q = keyword.value
      ? "?keyword=" + encodeURIComponent(keyword.value)
      : "";
    const d = await request("/api/v1/admin/system/configs" + q, {
      headers: headers(),
    });
    configs.value = arr(d)
      .map((x: any) => ({
        id: x.ID ?? x.id,
        configKey: String(x.configKey ?? x.config_key ?? ""),
        configValue: String(x.configValue ?? x.config_value ?? ""),
        description: String(x.description ?? ""),
      }))
      .filter((config: Config) => !standaloneConfigKeys.has(config.configKey));
  } finally {
    loading.value = false;
  }
}
/**
 * 加载操作日志
 * @api GET /api/v1/admin/system/operation-logs - 获取操作日志，支持按操作人筛选
 */
async function loadLogs() {
  loading.value = true;
  logPage.value = 1;
  try {
    const q = logKeyword.value
      ? "?operator=" + encodeURIComponent(logKeyword.value)
      : "";
    const d = await request("/api/v1/admin/system/operation-logs" + q, {
      headers: headers(),
    });
    logs.value = arr(d).map((x: any) => ({
      id: x.ID ?? x.id,
      operator: x.operatorName ?? x.operator_name ?? x.operator ?? "",
      module: x.module ?? "",
      content: x.content ?? x.action ?? "",
      ip: x.ip ?? "",
      type: x.type ?? x.targetType ?? "",
      time: formatTime(x.UpdatedAt ?? x.updated_at ?? x.CreatedAt ?? x.created_at ?? x.time),
    }));
  } catch {
    logs.value = [];
  }
}

/** 日志翻页操作 */
function changeLogPage(next: number) {
  if (next < 1 || next > logTotalPages.value || next === logPage.value) return;
  logPage.value = next;
}

/** 显示Toast通知消息 */
function notify(t: string, k = "success") {
  (window as any).showToast?.(t, k);
}

/**
 * 打开配置编辑弹窗
 * @param c - 传入配置则编辑，不传则新增
 */
function open(c?: Config) {
  editing.value = c ?? {
    id: "",
    configKey: "",
    configValue: "",
    description: "",
  };
  form.value = {
    configKey: c?.configKey ?? "",
    configValue: c?.configValue ?? "",
    description: c?.description ?? "",
  };
  modal.value = true;
}

/**
 * 保存配置（新增或更新）
 * @api POST /api/v1/admin/system/configs - 新增配置
 * @api PUT /api/v1/admin/system/configs - 批量更新配置
 */
async function save() {
  try {
    if (!form.value.configKey || !form.value.configValue)
      throw new Error("配置键和值不能为空");
    if (standaloneConfigKeys.has(form.value.configKey.trim()))
      throw new Error("该配置请在上方独立配置卡中维护");
    await request("/api/v1/admin/system/configs", {
      method: editing.value?.id ? "PUT" : "POST",
      headers: headers(true),
      body: JSON.stringify(
        editing.value?.id ? { configs: [form.value] } : form.value,
      ),
    });
    modal.value = false;
    notify("保存成功");
    await loadConfigs();
  } catch (e) {
    notify(e instanceof Error ? e.message : "保存失败", "error");
  }
}

/** 构建批量保存的配置payload */
function allConfigPayload() {
  return configs.value
    .map(({ configKey, configValue, description }) => ({
      configKey: configKey.trim(),
      configValue: String(configValue),
      description: description || "",
    }))
    .filter((x) => x.configKey);
}

/**
 * 批量保存所有配置
 * @api PUT /api/v1/admin/system/configs - 批量更新配置
 */
async function saveAll() {
  try {
    await request("/api/v1/admin/system/configs", {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify({ configs: allConfigPayload() }),
    });
    notify("批量更新成功");
    await loadConfigs();
  } catch (e) {
    notify(e instanceof Error ? e.message : "更新失败", "error");
  }
}

/**
 * 删除配置（二次确认后执行）
 * @api DELETE /api/v1/admin/system/configs/{key} - 删除指定配置
 */
async function remove(c: Config) {
  if (!confirm("确定删除配置“" + c.configKey + "”吗？")) return;
  try {
    await request(
      "/api/v1/admin/system/configs/" + encodeURIComponent(c.configKey),
      { method: "DELETE", headers: headers() },
    );
    notify("删除成功");
    await loadConfigs();
  } catch (e) {
    notify(e instanceof Error ? e.message : "删除失败", "error");
  }
}

// ===== 生命周期：组件挂载时加载配置和日志 =====
onMounted(() => {
  loadConfigs();
  loadLogs();
});
</script>
<template>
  <!-- 商业配置卡片区域：订单配置 + 库存配置 -->
  <div class="settings-business-configs">
    <BusinessConfigPage :token="token" kind="order" @saved="loadConfigs" />
    <BusinessConfigPage :token="token" kind="stock" @saved="loadConfigs" />
  </div>

  <!-- 工具栏：批量保存 + 新增配置 -->
  <div class="settings-toolbar">
    <span></span>
    <div>
      <button class="btn btn-outline" @click="saveAll">
        <i class="fas fa-save"></i> 批量保存
      </button>
      <button class="btn btn-primary" @click="open()">
        <i class="fas fa-plus"></i> 新增配置
      </button>
    </div>
  </div>
  <!-- 系统配置列表卡片 -->
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-sliders-h"></i> 系统配置</span>
      <!-- 配置搜索栏 -->
      <div class="settings-search">
        <input
          v-model="keyword"
          placeholder="按 configKey 模糊搜索"
          @keyup.enter="loadConfigs"
        />
        <button class="btn btn-sm btn-primary" @click="loadConfigs">
          搜索
        </button>
      </div>
    </div>
    <div class="card-body no-pad">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>配置键</th>
              <th>配置值</th>
              <th>说明</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="4">正在加载...</td>
            </tr>
            <tr v-else-if="!configs.length">
              <td colspan="4">暂无系统配置</td>
            </tr>
            <tr v-for="c in configs" v-else :key="c.id || c.configKey">
              <td><input v-model="c.configKey" class="system-form-input" /></td>
              <td><span class="system-config-value">{{ c.configValue }}</span></td>
              <td><span class="system-config-description">{{ c.description || '-' }}</span></td>
              <td>
                <button class="btn btn-sm btn-outline" @click="open(c)">
                  查看
                </button>
                <button class="btn btn-sm btn-danger" @click="remove(c)">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- 操作日志卡片 -->
  <div class="card settings-logs">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-file-alt"></i> 操作日志</span>
      <div class="settings-search">
        <input v-model="logKeyword" placeholder="操作人" />
        <button
          class="btn btn-sm btn-primary"
          @click="loadLogs"
        >
          筛选
        </button>
      </div>
    </div>
    <div class="card-body no-pad">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>操作人</th>
              <th>模块</th>
              <th>内容</th>
              <th>IP</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!logs.length">
              <td colspan="5">暂无日志记录</td>
            </tr>
            <tr v-for="log in pagedLogs" v-else :key="log.id">
              <td>{{ log.operator }}</td>
              <td>{{ log.module }}</td>
              <td>{{ log.content }}</td>
              <td>{{ log.ip }}</td>
              <td>{{ log.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="logs.length" class="card-footer log-pagination">
      <span class="log-page-info">共 {{ logs.length }} 条</span>
      <div class="log-page-nav">
        <button class="icon-btn" :disabled="logPage === 1" @click="changeLogPage(logPage - 1)"><i class="fas fa-angle-left"></i></button>
        <span>{{ logPage }} / {{ logTotalPages }}</span>
        <button class="icon-btn" :disabled="logPage === logTotalPages" @click="changeLogPage(logPage + 1)"><i class="fas fa-angle-right"></i></button>
      </div>
    </div>
  </div>
  <!-- 配置新增/编辑弹窗 -->
  <div v-if="modal" class="modal-overlay" @click="modal = false"></div>
  <div v-if="modal" class="modal-content settings-modal">
    <div class="modal-header">
      <h3>{{ editing?.id ? "编辑配置" : "新增系统配置" }}</h3>
      <button class="modal-close" @click="modal = false">×</button>
    </div>
    <div class="modal-body">
      <label>
        配置键
        <input
          v-model="form.configKey"
          class="system-form-input"
          :disabled="!!editing?.id" />
      </label>
      <label>
        配置值
        <input
          v-model="form.configValue"
          class="system-form-input" />
      </label>
      <label>
        说明
        <textarea
          v-model="form.description"
          class="system-form-textarea"
        ></textarea>
      </label>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" @click="modal = false">取消</button>
      <button class="btn btn-primary" @click="save">保存</button>
    </div>
  </div>
</template>

<style scoped>
/* 商业配置卡片区域布局：两列网格 */
.settings-business-configs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}
.settings-business-configs :deep(.business-config-card) {
  max-width: none;
  margin: 0;
}
/* 响应式：980px以下改为单列 */
@media (max-width: 980px) {
  .settings-business-configs { grid-template-columns: 1fr; }
}

/* 操作日志分页样式 */
.log-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
}
.log-page-info {
  font-size: 13px;
  color: #64748b;
}
.log-page-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #475569;
}

/* 图标按钮样式（分页翻页按钮） */
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s;
}
.icon-btn:hover:not(:disabled) {
  border-color: #4f6ef7;
  color: #4f6ef7;
}
.icon-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
/* 暗色主题适配 */
:global([data-theme="dark"]) .icon-btn {
  background: #1e293b;
  border-color: #334155;
  color: #cbd5e1;
}
</style>
