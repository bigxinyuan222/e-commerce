import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
let createRequest

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  if (request.method() === 'GET' && url.pathname === '/api/v1/admin/seckill/activities/home') {
    await route.fulfill({ json: { code: 200, message: 'success', data: { salesAmount: 12860.5, orderCount: 37 } } })
    return
  }
  if (request.method() === 'POST' && url.pathname === '/api/v1/admin/seckill/activities') {
    createRequest = {
      method: request.method(),
      path: url.pathname,
      body: request.postDataJSON(),
    }
    await route.fulfill({ json: { code: 200, message: 'success', data: { id: 31 } } })
    return
  }
  await route.fulfill({ json: { code: 200, message: 'success', data: { activities: [] } } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({
    name: '超级管理员', role: 'super_admin', token: 'seckill-create-test',
  })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="marketing"]').click()
  await page.getByText('¥12,860.50', { exact: true }).first().waitFor()
  await page.getByText('37', { exact: true }).first().waitFor()
  await page.getByRole('button', { name: /新建秒杀/ }).click()
  await page.locator('#seckillName').fill('接口联调活动')
  await page.locator('#seckillStartTime').fill('2026-08-02T10:00')
  await page.locator('#seckillEndTime').fill('2026-08-02T12:00')
  await page.locator('.modal-content').getByRole('button', { name: /保存/ }).click()
  await page.waitForFunction(() => !document.querySelector('.modal-content'))

  const expected = {
    name: '接口联调活动',
    start_time: '2026-08-02T10:00:00+08:00',
    end_time: '2026-08-02T12:00:00+08:00',
  }
  if (!createRequest) throw new Error('未发出创建活动请求')
  if (createRequest.method !== 'POST' || createRequest.path !== '/api/v1/admin/seckill/activities') {
    throw new Error(`请求地址错误: ${createRequest.method} ${createRequest.path}`)
  }
  if (JSON.stringify(createRequest.body) !== JSON.stringify(expected)) {
    throw new Error(`请求体错误: ${JSON.stringify(createRequest.body)}`)
  }
  console.log('秒杀活动创建接口验证通过')
} finally {
  await browser.close()
}
