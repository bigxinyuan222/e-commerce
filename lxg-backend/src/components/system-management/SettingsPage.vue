<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import BusinessConfigPage from "./BusinessConfigPage.vue";
type Config = {
  id: string | number;
  configKey: string;
  configValue: string;
  description: string;
};
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
const standaloneConfigKeys = new Set([
  "order_auto_cancel_minutes",
  "order_auto_complete_days",
  "order_after_sale_days",
  "inventory_warning_value",
  "inventory_warning_enabled",
]);
const configs = ref<Config[]>([]),
  logs = ref<Log[]>([]),
  keyword = ref(""),
  logKeyword = ref(""),
  loading = ref(false),
  modal = ref(false),
  editing = ref<Config | null>(null);
const form = ref({ configKey: "", configValue: "", description: "" });
const logPage = ref(1);
const LOG_PAGE_SIZE = 10;
const logTotalPages = computed(() =>
  Math.max(1, Math.ceil(logs.value.length / LOG_PAGE_SIZE))
);
const pagedLogs = computed(() =>
  logs.value.slice(
    (logPage.value - 1) * LOG_PAGE_SIZE,
    logPage.value * LOG_PAGE_SIZE
  )
);
function headers(json = false) {
  const h = new Headers();
  if (props.token) h.set("Authorization", "Bearer " + props.token);
  if (json) h.set("Content-Type", "application/json");
  return h;
}
async function request(url: string, o: RequestInit = {}) {
  const r = await fetch(url, { credentials: "include", ...o });
  const p = await r.json().catch(() => null);
  if (!r.ok || (p?.code !== undefined && ![0, 200].includes(p.code)))
    throw new Error(p?.message || "请求失败");
  return p?.data ?? p;
}
function arr(d: any) {
  return Array.isArray(d)
    ? d
    : (d?.list ?? d?.items ?? d?.records ?? d?.configs ?? []);
}
function formatTime(value: any) {
  if (!value) return "-";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
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
function changeLogPage(next: number) {
  if (next < 1 || next > logTotalPages.value || next === logPage.value) return;
  logPage.value = next;
}
function notify(t: string, k = "success") {
  (window as any).showToast?.(t, k);
}
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
function allConfigPayload() {
  return configs.value
    .map(({ configKey, configValue, description }) => ({
      configKey: configKey.trim(),
      configValue: String(configValue),
      description: description || "",
    }))
    .filter((x) => x.configKey);
}
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
onMounted(() => {
  loadConfigs();
  loadLogs();
});
</script>
<template>
  <div class="settings-business-configs">
    <BusinessConfigPage :token="token" kind="order" @saved="loadConfigs" />
    <BusinessConfigPage :token="token" kind="stock" @saved="loadConfigs" />
  </div>
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
  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-sliders-h"></i> 系统配置</span>
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
@media (max-width: 980px) {
  .settings-business-configs { grid-template-columns: 1fr; }
}
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
:global([data-theme="dark"]) .icon-btn {
  background: #1e293b;
  border-color: #334155;
  color: #cbd5e1;
}
</style>
