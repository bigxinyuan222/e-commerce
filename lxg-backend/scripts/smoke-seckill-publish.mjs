import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
let publishRequest
let published = false

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  let data = {}
  if (request.method() === 'GET' && url.pathname === '/api/v1/admin/seckill/activities') {
    data = { activities: [{ ID: 6, name: '待发布活动', startTime: '2026-08-02 10:00', endTime: '2026-08-02 12:00', status: published ? 1 : 0, products: [] }] }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/seckill/activities/publish') {
    publishRequest = { method: request.method(), path: url.pathname, body: request.postDataJSON() }
    published = true
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({
    name: '超级管理员', role: 'super_admin', token: 'seckill-publish-test',
  })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="marketing"]').click()
  await page.locator('[data-publish-activity-id="6"]').click()
  await page.getByText('秒杀活动发布成功！', { exact: false }).waitFor()
  await page.locator('#panel-marketing .status-badge.green').getByText('正在进行', { exact: true }).waitFor()

  const expected = { activity_id: 6 }
  if (!publishRequest) throw new Error('未发出发布活动请求')
  if (publishRequest.method !== 'POST' || publishRequest.path !== '/api/v1/admin/seckill/activities/publish') {
    throw new Error(`请求地址错误: ${publishRequest.method} ${publishRequest.path}`)
  }
  if (JSON.stringify(publishRequest.body) !== JSON.stringify(expected)) {
    throw new Error(`请求体错误: ${JSON.stringify(publishRequest.body)}`)
  }
  console.log('秒杀活动发布接口验证通过')
} finally {
  await browser.close()
}
