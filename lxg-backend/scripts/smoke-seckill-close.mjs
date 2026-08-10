import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
let closeRequest
let closed = false

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  let data = {}
  if (request.method() === 'GET' && url.pathname === '/api/v1/admin/seckill/activities') {
    data = { activities: [{ ID: 6, name: '进行中活动', startTime: '2026-08-02 10:00', endTime: '2026-08-02 12:00', status: closed ? 3 : 1, products: [] }] }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/seckill/activities/close') {
    closeRequest = { method: request.method(), path: url.pathname, body: request.postDataJSON() }
    closed = true
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({
    name: '超级管理员', role: 'super_admin', token: 'seckill-close-test',
  })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="marketing"]').click()
  await page.locator('[data-close-activity-id="6"]').click()
  await page.locator('.modal-content').getByRole('button', { name: /确认/ }).click()
  await page.getByText('秒杀活动已关闭', { exact: false }).waitFor()
  await page.locator('#panel-marketing .status-badge.red').getByText('管理员关闭', { exact: true }).waitFor()

  const expected = { activity_id: 6 }
  if (!closeRequest) throw new Error('未发出关闭活动请求')
  if (closeRequest.method !== 'POST' || closeRequest.path !== '/api/v1/admin/seckill/activities/close') {
    throw new Error(`请求地址错误: ${closeRequest.method} ${closeRequest.path}`)
  }
  if (JSON.stringify(closeRequest.body) !== JSON.stringify(expected)) {
    throw new Error(`请求体错误: ${JSON.stringify(closeRequest.body)}`)
  }
  console.log('秒杀活动关闭接口验证通过')
} finally {
  await browser.close()
}
