/// <reference types="vite/client" />

interface AdminUser {
  name: string
  role: string
  storeId: string | null
  storeName: string | null
  token: string
}

interface Window {
  apiPost: (url: string, data?: unknown, pathParams?: Record<string, string>) => Promise<unknown>
  API_CONFIG: { auth: { login: string } }
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  switchPage: (id: string) => void
  [key: string]: unknown
}
