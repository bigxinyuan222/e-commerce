import type { AdminUser } from '../legacy/pages'
import { post } from './http'

interface LoginRequest {
  username: string
  password: string
}

interface AdminInfo {
  id: number
  username: string
  name?: string
  roleId?: string | number
  role_id?: string | number
  role?: { id?: string | number; ID?: string | number; name?: string } | string | number
  storeId?: string | number
  store_id?: string | number
  storeName?: string
  store_name?: string
  phone?: string
  status?: string | number
  store?: { id?: string | number; ID?: string | number; name?: string }
}

interface LoginResponse {
  token: string
  roleId?: string | number
  role_id?: string | number
  admin_info?: AdminInfo
  admin?: AdminInfo
}

const roleIdMap: Record<string, string> = {
  '1': 'super_admin',
  '2': 'order_cs',
  '3': 'goods_op',
  '4': 'store_staff',
}

function roleFromToken(token: string): string | null {
  try {
    const encoded = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return (JSON.parse(atob(encoded)) as { role?: string }).role || null
  } catch {
    return null
  }
}

function resolveRole(admin: AdminInfo, token: string, response?: LoginResponse): string {
  const nestedRole = admin.role && typeof admin.role === 'object' ? (admin.role.id ?? admin.role.ID) : admin.role
  const roleId = admin.roleId ?? admin.role_id ?? nestedRole ?? response?.roleId ?? response?.role_id
  if (roleId !== undefined && roleId !== null && roleIdMap[String(roleId)]) return roleIdMap[String(roleId)]
  const tokenRole = roleFromToken(token)
  if (tokenRole && ['super_admin', 'admin', 'user', 'goods_op', 'order_cs', 'store_staff'].includes(tokenRole)) {
    return tokenRole === 'admin' ? 'super_admin' : tokenRole
  }
  throw new Error('登录响应缺少有效角色信息')
}

function toAdminUser(admin: AdminInfo, token: string, response?: LoginResponse): AdminUser {
  const nestedRoleName = admin.role && typeof admin.role === 'object' ? admin.role.name : undefined
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

export async function loginAdmin(username: string, password: string): Promise<AdminUser> {
  const result = await post<LoginResponse, LoginRequest>('/api/v1/admin/login', { username, password })
  const admin = result.admin_info || result.admin
  if (!result.token || !admin) throw new Error('登录响应缺少管理员信息')

  return toAdminUser(admin, result.token, result)
}

export async function fetchCurrentAdmin(token: string): Promise<AdminUser> {
  const response = await fetch('/api/v1/admin/auth/info', {
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include',
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && ![0, 200].includes(payload.code))) {
    throw new Error(payload?.message || `获取管理员信息失败 (${response.status})`)
  }
  const data = payload?.data ?? payload
  const admin = data?.admin_info || data?.admin || data
  if (!admin || typeof admin !== 'object') throw new Error('管理员信息响应格式不正确')
  return toAdminUser(admin as AdminInfo, token, data as LoginResponse)
}
