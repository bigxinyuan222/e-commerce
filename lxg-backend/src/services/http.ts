/**
 * @description HTTP 请求封装模块 - 统一的 API 请求与错误处理
 * @module services/http
 * @keyFeatures
 *   - 封装 POST 请求方法
 *   - 统一解析后端响应信封格式（code/message/data）
 *   - 自定义 ApiError 错误类，携带 HTTP 状态码和业务错误码
 */

/** 后端统一响应信封格式 */
interface ApiEnvelope<T> {
  code?: number       // 业务状态码（0 或 200 表示成功）
  message?: string    // 业务提示信息
  data?: T            // 业务数据
}

/**
 * 自定义 API 错误类
 * 用于区分网络层错误与业务层错误，携带额外的状态码信息
 */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,   // HTTP 状态码
    readonly code?: number,    // 业务错误码（可选）
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * 发送 POST 请求并解析响应
 * @param url 请求地址
 * @param body 请求体数据
 * @returns 解析后的业务数据（payload.data）
 * @throws ApiError 当 HTTP 状态码异常、业务 code 非 0/200、或响应格式不正确时抛出
 */
export async function post<TResponse, TBody>(url: string, body: TBody): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',    // 携带 Cookie，用于会话认证
    body: JSON.stringify(body),
  })

  const payload = await response.json().catch(() => null) as ApiEnvelope<TResponse> | null
  // HTTP 状态码异常
  if (!response.ok) {
    throw new ApiError(payload?.message || `请求失败 (${response.status})`, response.status, payload?.code)
  }
  // 业务状态码异常（非 0 且非 200）
  if (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200) {
    throw new ApiError(payload.message || '请求失败', response.status, payload.code)
  }
  // 响应格式不正确（缺少 data 字段）
  if (!payload || payload.data === undefined) {
    throw new ApiError('接口返回格式不正确', response.status, payload?.code)
  }
  return payload.data
}
