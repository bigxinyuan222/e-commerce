import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const requests = []

await page.route('**/api/**', async route => {
  const url = new URL(route.request().url())
  requests.push(`${route.request().method()} ${url.pathname}${url.search}`)
  let data = {}
  if (url.pathname === '/api/v1/admin/stores') {
    data = { list: [
      { ID: 7, name: '中心门店', address: '人民路 8 号', phone: '13800000007', businessHours: '09:00-21:00', status: 1, orderCount: 36, clerkCount: 4 },
      { ID: 8, name: '朝阳门店', address: '朝阳路 6 号', phone: '13800000008', businessHours: '09:00-21:00', status: 1, orderCount: 1258, clerkCount: 6 },
      { ID: 9, name: '停用门店', address: '旧街 1 号', phone: '13800000009', businessHours: '09:00-18:00', status: 0, orderCount: 9999, clerkCount: 0 },
    ] }
  } else if (url.pathname === '/api/v1/admin/list') {
    data = { list: [{ ID: 3, username: 'store_admin', name: '门店管理员', phone: '13800000003', role: { id: 2, name: '门店管理员' }, store: { id: 7, name: '中心门店' }, status: 1, created_at: '2026-07-31 09:00:00' }] }
  } else if (url.pathname === '/api/v1/roles') {
    await route.fulfill({ status: 404, json: { code: 404, message: 'page not found' } })
    return
  } else if (url.pathname === '/api/v1/admin/payments') {
    data = { list: [{ payment_no: 'PAY-001', order_no: 'ORD-001', amount: 299, payment_method: 'wechat', channel: '微信商户平台', status: 1, paid_at: '2026-07-31 10:00:00' }], total: 1 }
  } else if (url.pathname === '/api/v1/admin/refund-payments') {
    data = { list: [{ refund_no: 'REF-001', payment_no: 'PAY-001', order_no: 'ORD-001', refund_amount: 99, refund_reason: '缺货', status: 1, refunded_at: '2026-07-31 11:00:00' }], total: 1 }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({
    name: '超级管理员', role: 'super_admin', token: 'vue-migration-test',
  })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })

  for (const [id, expected] of [['stores', '中心门店'], ['admin', '门店管理员'], ['payment', 'PAY-001']]) {
    await page.locator(`#sidebarNav .menu-item[data-id="${id}"]`).click()
    await page.locator(`#panel-${id} table`).first().getByText(expected, { exact: false }).first().waitFor()
    if (id === 'stores') {
      await page.locator('#panel-stores .ranking-grid .rank-card').first().getByText('朝阳门店', { exact: true }).waitFor()
      if (await page.locator('#panel-stores .ranking-grid').getByText('停用门店', { exact: true }).count()) {
        throw new Error('停用门店不应进入销售排行')
      }
    }
  }
  await page.locator('#panel-payment').getByText('微信支付', { exact: true }).waitFor()
  await page.locator('#panel-payment table').nth(1).locator('.status-badge').getByText('已退款', { exact: true }).waitFor()

  const legacyScripts = await page.locator('script[src]').evaluateAll(nodes => nodes.map(node => node.getAttribute('src')).filter(src =>
    src?.includes('/js/core/stores.js') || src?.includes('/js/system/admin.js') || src?.includes('/js/system/payment.js')
  ))
  if (legacyScripts.length) throw new Error(`仍加载旧模块脚本: ${legacyScripts.join(', ')}`)

  process.stdout.write(`${JSON.stringify({ rendered: ['stores', 'admin', 'payment'], requests, legacyScripts }, null, 2)}\n`)
} finally {
  await browser.close()
}
