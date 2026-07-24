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
  storeId?: string | number
  store_id?: string | number
  storeName?: string
  store_name?: string
}

interface LoginResponse {
  token: string
  admin_info?: AdminInfo
  admin?: AdminInfo
}

function roleFromToken(token: string): string {
  try {
    const encoded = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return (JSON.parse(atob(encoded)) as { role?: string }).role || 'super_admin'
  } catch {
    return 'super_admin'
  }
}

export async function loginAdmin(username: string, password: string): Promise<AdminUser> {
  const result = await post<LoginResponse, LoginRequest>('/api/v1/admin/login', { username, password })
  const admin = result.admin_info || result.admin
  if (!result.token || !admin) throw new Error('登录响应缺少管理员信息')

  return {
    name: admin.name || admin.username || '管理员',
    role: roleFromToken(result.token),
    storeId: admin.storeId || admin.store_id ? String(admin.storeId || admin.store_id) : null,
    storeName: admin.storeName || admin.store_name || null,
    token: result.token,
  }
}
