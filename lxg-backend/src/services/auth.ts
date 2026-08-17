/**
 * @description 认证服务模块 - 管理员登录与信息获取
 * @module services/auth
 * @keyFeatures
 *   - 管理员登录（用户名 + 密码）
 *   - 获取当前管理员信息
 *   - JWT Token 角色解析
 *   - 多格式后端响应兼容处理
 */
import type { AdminUser } from '../legacy/pages'
import { post } from './http'

/** 登录请求参数 */
interface LoginRequest {
  username: string
  password: string
}

/**
 * 管理员原始信息（后端返回格式）
 * 兼容驼峰/下划线两种字段命名风格
 */
interface AdminInfo {
  id: number
  username: string
  name?: string
  // 角色相关字段，兼容多种后端返回结构
  roleId?: string | number
  role_id?: string | number
  role?: { id?: string | number; ID?: string | number; name?: string } | string | number
  // 门店相关字段，兼容驼峰/下划线命名
  storeId?: string | number
  store_id?: string | number
  storeName?: string
  store_name?: string
  phone?: string
  status?: string | number
  // 嵌套的门店对象
  store?: { id?: string | number; ID?: string | number; name?: string }
}

/** 登录响应数据结构 */
interface LoginResponse {
  token: string
  roleId?: string | number
  role_id?: string | number
  admin_info?: AdminInfo   // 管理员信息（部分接口使用此字段名）
  admin?: AdminInfo        // 管理员信息（部分接口使用此字段名）
}

/** 角色ID到角色标识的映射表，用于将后端数字角色ID转换为前端角色标识 */
const roleIdMap: Record<string, string> = {
  '1': 'super_admin',
  '2': 'order_cs',
  '3': 'goods_op',
  '4': 'store_staff',
}

/**
 * 从 JWT Token 的 payload 中解析角色信息
 * @param token JWT Token 字符串
 * @returns 角色标识字符串，解析失败返回 null
 */
function roleFromToken(token: string): string | null {
  try {
    // 提取 JWT 第二段（payload），并将 Base64URL 转为标准 Base64
    const encoded = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return (JSON.parse(atob(encoded)) as { role?: string }).role || null
  } catch {
    return null
  }
}

/**
 * 综合多种来源解析用户角色
 * 优先级：admin 对象中的 roleId > 嵌套 role.id > 响应体顶层 roleId > JWT Token 中的 role
 * @param admin 管理员原始信息
 * @param token JWT Token
 * @param response 完整的登录响应
 * @returns 角色标识字符串
 * @throws 当无法从任何来源确定有效角色时抛出异常
 */
function resolveRole(admin: AdminInfo, token: string, response?: LoginResponse): string {
  // 提取嵌套的 role 对象中的 id 字段
  const nestedRole = admin.role && typeof admin.role === 'object' ? (admin.role.id ?? admin.role.ID) : admin.role
  // 按优先级取 roleId
  const roleId = admin.roleId ?? admin.role_id ?? nestedRole ?? response?.roleId ?? response?.role_id
  // 优先通过 roleIdMap 映射
  if (roleId !== undefined && roleId !== null && roleIdMap[String(roleId)]) return roleIdMap[String(roleId)]
  // 回退到从 JWT Token 解析角色
  const tokenRole = roleFromToken(token)
  if (tokenRole && ['super_admin', 'admin', 'user', 'goods_op', 'order_cs', 'store_staff'].includes(tokenRole)) {
    // 'admin' 统一映射为 'super_admin'
    return tokenRole === 'admin' ? 'super_admin' : tokenRole
  }
  throw new Error('登录响应缺少有效角色信息')
}

/**
 * 将后端返回的管理员原始信息转换为前端统一的 AdminUser 结构
 * @param admin 管理员原始信息
 * @param token JWT Token
 * @param response 完整的登录响应（用于角色解析）
 * @returns 标准化的 AdminUser 对象
 */
function toAdminUser(admin: AdminInfo, token: string, response?: LoginResponse): AdminUser {
  // 提取嵌套 role 对象中的 name 字段
  const nestedRoleName = admin.role && typeof admin.role === 'object' ? admin.role.name : undefined
  // 兼容多种门店ID字段格式
  const storeId = admin.storeId ?? admin.store_id ?? admin.store?.id ?? admin.store?.ID
  return {
    id: admin.id,
    username: admin.username,
    name: admin.name || admin.username || '管理员',
    role: resolveRole(admin, token, response),
    roleName: nestedRoleName,
    phone: admin.phone,
    status: admin.status,
    storeId: storeId !== undefined && storeId !== null ? String(storeId) : null,
    storeName: admin.storeName || admin.store_name || admin.store?.name || null,
    token,
  }
}

/**
 * 管理员登录
 * @param username 用户名
 * @param password 密码
 * @returns 标准化的 AdminUser 对象（含 token）
 * 调用 POST /api/v1/admin/login 接口
 */
export async function loginAdmin(username: string, password: string): Promise<AdminUser> {
  const result = await post<LoginResponse, LoginRequest>('/api/v1/admin/login', { username, password })
  // 兼容 admin_info / admin 两种响应字段名
  const admin = result.admin_info || result.admin
  if (!result.token || !admin) throw new Error('登录响应缺少管理员信息')

  return toAdminUser(admin, result.token, result)
}

/**
 * 获取当前登录管理员的最新信息
 * @param token JWT Token，用于 Bearer 认证
 * @returns 标准化的 AdminUser 对象
 * 调用 GET /api/v1/admin/auth/info 接口
 */
export async function fetchCurrentAdmin(token: string): Promise<AdminUser> {
  const response = await fetch('/api/v1/admin/auth/info', {
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include',
  })
  const payload = await response.json().catch(() => null)
  // 校验响应状态：HTTP 状态码不OK 或业务 code 非 0/200 均视为失败
  if (!response.ok || (payload?.code !== undefined && ![0, 200].includes(payload.code))) {
    throw new Error(payload?.message || `获取管理员信息失败 (${response.status})`)
  }
  // 兼容 { data: {...} } 和直接返回 {...} 两种响应结构
  const data = payload?.data ?? payload
  const admin = data?.admin_info || data?.admin || data
  if (!admin || typeof admin !== 'object') throw new Error('管理员信息响应格式不正确')
  return toAdminUser(admin as AdminInfo, token, data as LoginResponse)
}
