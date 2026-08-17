import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const listQueries = []
const detailPaths = []
const actions = []

const rows = [
  { id: 1, order_no: 'ORD-001', user_name: '张三', phone: '13800000001', store_id: 5, store_name: '测试门店', pay_amount: 99, status: 0, order_type: 'normal', created_at: '2026-07-28 09:00:00', items: [{ product_name: '测试商品一', price: 99, quantity: 1 }] },
  { id: 2, order_no: 'ORD-002', user_name: '李四', phone: '13800000002', store_id: 5, store_name: '测试门店', pay_amount: 199, status: 2, order_type: 'seckill', created_at: '2026-07-28 10:00:00', items: [{ product_name: '测试商品二', price: 199, quantity: 1 }] },
  { id: 3, order_no: 'ORD-003', user_name: '王五', phone: '13800000003', store_id: 5, store_name: '测试门店', pay_amount: 299, status: 3, order_type: 'normal', created_at: '2026-07-28 11:00:00', items: [{ product_name: '测试商品三', price: 299, quantity: 1 }] },
  { id: 4, order_no: 'ORD-004', user_name: '赵六', phone: '13800000004', store_id: 5, store_name: '测试门店', pay_amount: 399, status: 4, order_type: 'normal', created_at: '2026-07-28 12:00:00', items: [{ product_name: '测试商品四', price: 399, quantity: 1 }] },
]

await page.route('**/api/**', async route => {
  const request = route.request(); const url = new URL(request.url()); let data = {}
  if (url.pathname === '/api/v1/admin/orders') {
    listQueries.push(Object.fromEntries(url.searchParams))
    data = { list: rows, total: 45, page: Number(url.searchParams.get('page')), pageSize: Number(url.searchParams.get('pageSize')) }
  } else if (url.pathname === '/api/v1/admin/orders/stats') {
    data = { pending_payment: 1, pending_delivery: 1, pending_pickup: 1, completed: 1, pending_review: 2, cancelled: 3, total: 9 }
  } else if (url.pathname === '/api/v1/admin/orders/1' && request.method() === 'GET') {
    detailPaths.push(url.pathname)
    data = { ...rows[0], total_amount: 109, discount_amount: 10, remark: '尽快处理', paid_at: '2026-07-28 09:05:00', items: [{ product_name: '详情商品', spec_values: { 颜色: '黑色' }, price: 99, quantity: 1 }] }
  } else if (/^\/api\/v1\/admin\/orders\/\d+\/(cancel|ship)$/.test(url.pathname)) {
    actions.push({ path: url.pathname, method: request.method(), body: request.postDataJSON() })
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '超级管理员', role: 'super_admin', storeId: null, token: 'smoke-token' })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="orders"]').click()
  const panel = page.locator('#panel-orders')
  const table = panel.locator('table')
  await table.locator('tbody tr').first().waitFor()
  const text = await panel.textContent()
  for (const expected of ['ORD-001', '测试商品二', '待支付', '待发货', '待自提', '已完成', '共 45 笔订单']) if (!text?.includes(expected)) throw new Error(`订单页面缺少: ${expected}`)
  const cards = await panel.locator('.order-stats').textContent()
  for (const expected of ['待支付1', '待发货1', '待自提1', '已完成1', '待评价2', '已取消3']) if (!cards?.replace(/\s/g, '').includes(expected)) throw new Error(`订单统计错误: ${expected}; ${cards}`)

  await panel.locator('#orderSearchInput').fill('ORD-003')
  await Promise.all([page.waitForResponse(response => response.url().includes('keyword=ORD-003')), panel.locator('#orderSearchInput').press('Enter')])
  await Promise.all([page.waitForResponse(response => response.url().includes('status=2')), panel.locator('select').first().selectOption('2')])
  await Promise.all([page.waitForResponse(response => response.url().includes('page=2')), panel.locator('.order-pagination button').last().click()])

  await Promise.all([page.waitForResponse(response => response.url().endsWith('/admin/orders/1')), table.getByRole('button', { name: '详情' }).first().click()])
  const modal = page.locator('.modal-content').filter({ hasText: '详情商品' })
  await modal.waitFor()
  if (!(await modal.textContent())?.includes('颜色: 黑色')) throw new Error('订单详情规格未渲染')
  await modal.locator('.modal-close').click()
  if (await panel.getByRole('button', { name: /核销/ }).count()) throw new Error('待自提订单仍显示管理员核销操作')

  for (const [button, path] of [['取消', '/api/v1/admin/orders/1/cancel'], ['发货', '/api/v1/admin/orders/2/ship']]) {
    page.once('dialog', dialog => dialog.accept())
    await Promise.all([
      page.waitForResponse(response => response.url().endsWith(path)),
      page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/orders' && response.request().method() === 'GET'),
      table.getByRole('button', { name: button, exact: true }).click(),
    ])
  }
  const expectedInitial = { page: '1', pageSize: '20', keyword: '', status: '', store_id: '' }
  const orderPageQueries = listQueries.filter(query => query.pageSize === '20')
  if (JSON.stringify(orderPageQueries[0]) !== JSON.stringify(expectedInitial)) throw new Error(`订单初始参数错误: ${JSON.stringify(orderPageQueries[0])}`)
  if (orderPageQueries[1]?.keyword !== 'ORD-003' || orderPageQueries[2]?.status !== '2' || orderPageQueries[3]?.page !== '2') throw new Error(`订单筛选分页错误: ${JSON.stringify(orderPageQueries.slice(1, 4))}`)
  const expectedActions = [
    { path: '/api/v1/admin/orders/1/cancel', method: 'PUT', body: {} },
    { path: '/api/v1/admin/orders/2/ship', method: 'PUT', body: {} },
  ]
  if (JSON.stringify(actions) !== JSON.stringify(expectedActions)) throw new Error(`订单操作请求错误: ${JSON.stringify(actions)}`)
  if (detailPaths[0] !== '/api/v1/admin/orders/1') throw new Error(`订单详情路径错误: ${JSON.stringify(detailPaths)}`)
  process.stdout.write(`${JSON.stringify({ listQueries, detailPaths, actions, rowCount: rows.length }, null, 2)}\n`)
} finally { await browser.close() }
