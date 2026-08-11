import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: Number(process.env.LXG_VIEWPORT_WIDTH) || 1440, height: Number(process.env.LXG_VIEWPORT_HEIGHT) || 900 } })
const listQueries = []
const toggleQueries = []
let enabled = 1

await page.route('**/api/**', async (route) => {
  const url = new URL(route.request().url())
  if (url.pathname === '/api/v1/get/users') {
    listQueries.push(Object.fromEntries(url.searchParams))
    return route.fulfill({ json: {
      code: 200,
      message: 'success',
      data: {
        list: [{ id: 100, username: '测试用户', phone: '13800000000', gender: 0, status: enabled, created_at: '2026-07-30 10:00:00' }],
        total: 11,
        page: Number(url.searchParams.get('page')),
      },
    } })
  }
  if (url.pathname === '/api/v1/enable/user') {
    toggleQueries.push({ method: route.request().method(), query: Object.fromEntries(url.searchParams) })
    enabled = enabled ? 0 : 1
    return route.fulfill({ json: { code: 200, message: 'success', data: {} } })
  }
  return route.fulfill({ json: { code: 200, message: 'success', data: [] } })
})

try {
  await page.addInitScript(() => {
    localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '用户测试', role: 'super_admin', token: 'smoke-test-token' }))
  })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="users"]').click()
  const row = page.locator('#panel-users tbody tr').first()
  await row.getByText('测试用户').waitFor()
  await row.getByText('男', { exact: true }).waitFor()

  if (process.env.LXG_SCREENSHOT) await page.screenshot({ path: process.env.LXG_SCREENSHOT, fullPage: true })
  const nextResponse = page.waitForResponse(response => response.url().includes('/api/v1/get/users?page=2'))
  await page.locator('#panel-users .stock-pagination-actions button').last().click()
  await nextResponse

  await row.locator('button').last().click()
  const toggleResponse = page.waitForResponse(response => response.url().includes('/api/v1/enable/user?id=100'))
  const reloadResponse = page.waitForResponse(response => response.url().includes('/api/v1/get/users?page=2'))
  await page.locator('.modal-content .modal-footer .btn-primary').click()
  await toggleResponse
  await reloadResponse

  const userPageQueries = listQueries.filter(query => query.size === '10')
  if (JSON.stringify(userPageQueries[0]) !== JSON.stringify({ page: '1', size: '10' })) {
    throw new Error(`用户列表参数不符合预期: ${JSON.stringify(listQueries[0])}`)
  }
  if (JSON.stringify(userPageQueries[1]) !== JSON.stringify({ page: '2', size: '10' })) {
    throw new Error(`用户分页参数不符合预期: ${JSON.stringify(listQueries[1])}`)
  }
  if (JSON.stringify(toggleQueries[0]) !== JSON.stringify({ method: 'POST', query: { id: '100' } })) {
    throw new Error(`用户启禁用参数不符合预期: ${JSON.stringify(toggleQueries[0])}`)
  }
  process.stdout.write(`${JSON.stringify({ listQueries, toggleQueries }, null, 2)}\n`)
} finally {
  await browser.close()
}
