import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const paymentQueries = []
const refundQueries = []

await page.route('**/api/**', async (route) => {
  const url = new URL(route.request().url())
  let data = {}
  if (url.pathname === '/api/v1/admin/payments') {
    paymentQueries.push(Object.fromEntries(url.searchParams))
    data = {
      list: [
        { payment_no: 'PAY-001', order_no: 'ORD-001', amount: 299, payment_method: 'wechat', channel: '微信商户平台', status: 0, created_at: '2026-07-28 09:00:00' },
        { payment_no: 'PAY-002', order_no: 'ORD-002', amount: 599, payment_method: 'alipay', channel: '支付宝开放平台', status: 1, paid_at: '2026-07-28 10:00:00' },
        { payment_no: 'PAY-003', order_no: 'ORD-003', amount: 899, payment_method: 'wechat', channel: '微信商户平台', status: 2, paid_at: '2026-07-28 11:00:00' },
      ],
      total: 13,
      page: Number(url.searchParams.get('page')),
      pageSize: Number(url.searchParams.get('pageSize')),
    }
  } else if (url.pathname === '/api/v1/admin/refund-payments') {
    refundQueries.push(Object.fromEntries(url.searchParams))
    data = {
      list: [
        { refund_no: 'REF-001', payment_no: 'PAY-001', order_no: 'ORD-001', refund_amount: 299, refund_reason: '商品缺货', status: 0, created_at: '2026-07-28 12:00:00' },
        { refund_no: 'REF-002', payment_no: 'PAY-002', order_no: 'ORD-002', refund_amount: 599, refund_reason: '用户取消', status: 1, refunded_at: '2026-07-28 13:00:00' },
        { refund_no: 'REF-003', payment_no: 'PAY-003', order_no: 'ORD-003', refund_amount: 899, refund_reason: '渠道异常', status: 2, created_at: '2026-07-28 14:00:00' },
      ],
      total: 13,
      page: Number(url.searchParams.get('page')),
      pageSize: Number(url.searchParams.get('pageSize')),
    }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => {
    localStorage.setItem('lexiangou_admin_user', JSON.stringify({
      name: '支付测试', role: 'super_admin', token: 'smoke-test-token',
    }))
  })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="payment"]').click()
  await page.locator('#panel-payment table').first().locator('tbody tr').first().waitFor()
  await page.locator('#panel-payment table').nth(1).locator('tbody tr').first().waitFor()

  const rows = await page.locator('#panel-payment table').first().locator('tbody tr').allTextContents()
  if (rows.length !== 3 || !rows[0].includes('待支付') || !rows[1].includes('已支付') || !rows[2].includes('已退款')) {
    throw new Error(`支付状态渲染不符合预期: ${JSON.stringify(rows)}`)
  }
  const refundRows = await page.locator('#panel-payment table').nth(1).locator('tbody tr').allTextContents()
  if (refundRows.length !== 3 || !refundRows[0].includes('待退款') || !refundRows[1].includes('已退款') || !refundRows[2].includes('失败')) {
    throw new Error(`退款状态渲染不符合预期: ${JSON.stringify(refundRows)}`)
  }

  await page.locator('#paymentStatusFilter').selectOption('1')
  await page.locator('#paymentStartDate').fill('2026-07-01')
  await page.locator('#paymentEndDate').fill('2026-07-28')
  const filterResponse = page.waitForResponse(response => response.url().includes('/admin/payments') && response.url().includes('status=1'))
  await page.locator('#panel-payment .search-bar').getByRole('button', { name: '筛选' }).click()
  await filterResponse

  const pageResponse = page.waitForResponse(response => response.url().includes('/admin/payments') && response.url().includes('page=2'))
  await page.locator('.payment-pagination').first().locator('button').last().click()
  await pageResponse

  await page.locator('#refundStatusFilter').selectOption('2')
  await page.locator('#refundStartDate').fill('2026-07-10')
  await page.locator('#refundEndDate').fill('2026-07-28')
  const refundFilterResponse = page.waitForResponse(response => response.url().includes('/admin/refund-payments') && response.url().includes('status=2'))
  await page.locator('.payment-refund-filters').getByRole('button', { name: '筛选' }).click()
  await refundFilterResponse

  const refundPageResponse = page.waitForResponse(response => response.url().includes('/admin/refund-payments') && response.url().includes('page=2'))
  await page.locator('.payment-pagination').nth(1).locator('button').last().click()
  await refundPageResponse

  const expectedInitial = { page: '1', pageSize: '10', status: '', start_date: '', end_date: '' }
  const expectedFilter = { page: '1', pageSize: '10', status: '1', start_date: '2026-07-01', end_date: '2026-07-28' }
  if (JSON.stringify(paymentQueries[0]) !== JSON.stringify(expectedInitial)) throw new Error(`首屏参数错误: ${JSON.stringify(paymentQueries[0])}`)
  if (JSON.stringify(paymentQueries[1]) !== JSON.stringify(expectedFilter)) throw new Error(`筛选参数错误: ${JSON.stringify(paymentQueries[1])}`)
  if (paymentQueries[2]?.page !== '2' || paymentQueries[2]?.status !== '1') throw new Error(`分页参数错误: ${JSON.stringify(paymentQueries[2])}`)

  const expectedRefundInitial = { page: '1', pageSize: '10', status: '', start_date: '', end_date: '' }
  const expectedRefundFilter = { page: '1', pageSize: '10', status: '2', start_date: '2026-07-10', end_date: '2026-07-28' }
  if (JSON.stringify(refundQueries[0]) !== JSON.stringify(expectedRefundInitial)) throw new Error(`退款首屏参数错误: ${JSON.stringify(refundQueries[0])}`)
  if (JSON.stringify(refundQueries[1]) !== JSON.stringify(expectedRefundFilter)) throw new Error(`退款筛选参数错误: ${JSON.stringify(refundQueries[1])}`)
  if (refundQueries[2]?.page !== '2' || refundQueries[2]?.status !== '2') throw new Error(`退款分页参数错误: ${JSON.stringify(refundQueries[2])}`)

  process.stdout.write(`${JSON.stringify({ paymentQueries, refundQueries, paymentRowCount: rows.length, refundRowCount: refundRows.length }, null, 2)}\n`)
} finally {
  await browser.close()
}
