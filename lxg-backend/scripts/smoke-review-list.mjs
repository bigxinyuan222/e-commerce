import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const requests = []

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  requests.push(`${request.method()} ${url.pathname}${url.search}`)
  let data = {}
  if (url.pathname === '/api/v1/admin/review/list') {
    data = { list: [{ id: 91, product: { id: 205, name: '评价接口联调商品' }, user: { id: 8, nickname: '评价用户', phone: '13800000008' }, rating: 5, content: '评价列表接口返回成功', status: 1, created_at: '2026-08-01T12:00:00+08:00' }] }
  } else if (url.pathname === '/api/v1/review-summaries') {
    data = { data: [] }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '超级管理员', role: 'super_admin', token: 'review-list-test' })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="reviews"]').click()
  await page.getByText('评价接口联调商品', { exact: false }).first().waitFor()
  await page.getByText('评价列表接口返回成功', { exact: false }).first().waitFor()
  const listRequest = requests.find(item => item.startsWith('GET /api/v1/admin/review/list'))
  if (listRequest !== 'GET /api/v1/admin/review/list') throw new Error(`评价列表请求错误: ${listRequest || '未发出请求'}`)
  if (requests.some(item => item.startsWith('GET /api/v1/reviews'))) throw new Error('仍在请求旧评价列表接口')
  console.log('评价列表接口验证通过')
} finally {
  await browser.close()
}
