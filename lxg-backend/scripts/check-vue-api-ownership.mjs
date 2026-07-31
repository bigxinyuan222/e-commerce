import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const index = readFileSync(resolve(root, 'index.html'), 'utf8')
const api = readFileSync(resolve(root, 'js/common/api.js'), 'utf8')

const forbiddenScripts = [
  '/js/core/stock.js',
  '/js/system/service.js',
  '/js/system/users.js',
  '/js/system/notification.js',
  '/js/trade/orders.js',
  '/js/trade/returns.js',
  '/js/core/stores.js',
  '/js/system/admin.js',
  '/js/system/payment.js',
]

const loadedForbidden = forbiddenScripts.filter(script => index.includes(script))
if (loadedForbidden.length) throw new Error(`Vue 已接管模块仍加载旧脚本: ${loadedForbidden.join(', ')}`)

const requiredSections = ['auth', 'returns', 'notifications', 'orders', 'users', 'stats', 'inventory', 'categories', 'brands', 'specifications', 'service', 'stores', 'admin', 'payments']
for (const section of requiredSections) {
  if (!api.includes(`'${section}'`)) throw new Error(`旧 API 层未禁用 Vue 接口段: ${section}`)
}

process.stdout.write(`${JSON.stringify({ forbiddenScriptsLoaded: [], disabledLegacyApiSections: requiredSections }, null, 2)}\n`)
