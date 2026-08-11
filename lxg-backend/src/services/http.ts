interface ApiEnvelope<T> {
  code?: number
  message?: string
  data?: T
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function post<TResponse, TBody>(url: string, body: TBody): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })

  const payload = await response.json().catch(() => null) as ApiEnvelope<TResponse> | null
  if (!response.ok) {
    throw new ApiError(payload?.message || `请求失败 (${response.status})`, response.status, payload?.code)
  }
  if (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200) {
    throw new ApiError(payload.message || '请求失败', response.status, payload.code)
  }
  if (!payload || payload.data === undefined) {
    throw new ApiError('接口返回格式不正确', response.status, payload?.code)
  }
  return payload.data
}
