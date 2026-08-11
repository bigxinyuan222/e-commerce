import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

await page.route('**/api/**', async route => {
  const url = new URL(route.request().url())
  let data = {}
  if (url.pathname === '/api/v1/admin/orders') {
    data = { list: [
      { id: 1, status: 0, total_amount: 9000, pay_amount: 0, store: { id: 1, name: '测试门店' }, items: [] },
      { id: 2, status: 1, total_amount: 100, pay_amount: 100, store: { id: 1, name: '测试门店' }, items: [] },
      { id: 3, status: 2, total_amount: 200, pay_amount: 200, store: { id: 1, name: '测试门店' }, items: [] },
      { id: 4, status: 3, total_amount: 300, pay_amount: 300, store: { id: 1, name: '测试门店' }, items: [] },
      { id: 5, status: 4, total_amount: 400, pay_amount: 400, store: { id: 1, name: '测试门店' }, items: [] },
      { id: 6, status: 5, total_amount: 9900, pay_amount: 9900, store: { id: 1, name: '测试门店' }, items: [] },
    ], total: 6 }
  } else if (url.pathname === '/api/v1/admin/home') {
    data = { warning_sku_list: [] }
  } else if (url.pathname === '/api/v1/admin/refunds' || url.pathname === '/api/v1/get/users') {
    data = { list: [] }
  } else if (url.pathname === '/api/v1/admin/review/list') {
    data = { list: [] }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '超级管理员', role: 'super_admin', token: 'stats-order-test' })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  const distribution = page.locator('#panel-stats').getByText('订单状态分布', { exact: true }).locator('..').locator('..')
  for (const label of ['待付款', '拼团中', '待发货', '待自提', '已完成', '已取消']) {
    const row = distribution.getByText(label, { exact: true }).locator('..')
    if (!((await row.textContent()) || '').includes('1')) throw new Error(`${label}状态统计错误: ${await row.textContent()}`)
  }
  const salesCard = page.locator('#panel-stats .stats-grid .stat-card').filter({ hasText: '销售额' }).first()
  const salesText = (await salesCard.textContent()) || ''
  if (!salesText.includes('¥0.1万')) throw new Error(`销售额包含待支付或已取消订单: ${salesText}`)
  console.log('数据统计订单状态与销售额验证通过')
} finally {
  await browser.close()
}
