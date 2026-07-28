import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const refundQueries = []
const refundDetailPaths = []
const auditRequests = []
const refundReasonPaths = []
const refundReasonMutations = []

await page.route('**/api/**', async (route) => {
  const url = new URL(route.request().url())
  let data = {}
  if (url.pathname === '/api/v1/admin/refunds') {
    refundQueries.push(Object.fromEntries(url.searchParams))
    data = {
      list: [
        { id: 1, refund_no: 'RF-001', order_no: 'ORD-001', product_name: '测试商品一', refund_amount: 100, user_name: '张三', phone: '13800000001', store_id: 5, store_name: '测试门店', reason: '质量问题', reason_type: 'quality', status: 0, created_at: '2026-07-28 09:00:00' },
        { id: 2, refund_no: 'RF-002', order_no: 'ORD-002', product_name: '测试商品二', refund_amount: 200, user_name: '李四', phone: '13800000002', store_id: 5, store_name: '测试门店', reason: '发错货', reason_type: 'wrong_item', status: 1, created_at: '2026-07-28 10:00:00' },
        { id: 3, refund_no: 'RF-003', order_no: 'ORD-003', product_name: '测试商品三', refund_amount: 300, user_name: '王五', phone: '13800000003', store_id: 5, store_name: '测试门店', reason: '不想要了', reason_type: 'no_need', status: 2, created_at: '2026-07-28 11:00:00' },
        { id: 4, refund_no: 'RF-004', order_no: 'ORD-004', product_name: '测试商品四', refund_amount: 400, user_name: '赵六', phone: '13800000004', store_id: 5, store_name: '测试门店', reason: '商品损坏', reason_type: 'damaged', status: 3, created_at: '2026-07-28 12:00:00' },
      ],
      total: 45,
      page: Number(url.searchParams.get('page')),
      pageSize: Number(url.searchParams.get('pageSize')),
    }
  } else if (/^\/api\/v1\/admin\/refunds\/\d+\/audit$/.test(url.pathname)) {
    auditRequests.push({ path: url.pathname, method: route.request().method(), body: route.request().postDataJSON() })
  } else if (url.pathname === '/api/v1/admin/refunds/1') {
    refundDetailPaths.push(url.pathname)
    data = {
      id: 1, refund_no: 'RF-001', order_no: 'ORD-001', product_name: '详情商品名称',
      spec_values: { '颜色': '黑色' }, price: 199, refund_amount: 100,
      user_name: '张三', phone: '13800000001', store_id: 5, store_name: '测试门店',
      reason: '质量问题详情', reason_type: 'quality', status: 0, created_at: '2026-07-28 09:00:00',
    }
  } else if (url.pathname === '/api/v1/admin/refund-reasons') {
    refundReasonPaths.push(url.pathname)
    if (route.request().method() !== 'GET') refundReasonMutations.push({ path: url.pathname, method: route.request().method(), body: route.request().postDataJSON() })
    data = {
      list: [
        { id: 1, content: '质量问题', type: 'quality', color: '#dc2626', bg_color: '#fee2e2', sort: 1, status: 1 },
        { id: 2, content: '商品损坏', type: 'damaged', color: '#ea580c', bg_color: '#ffedd5', sort: 2, enabled: true },
        { id: 3, content: '不再需要', type: 'no_need', sort: 3, status: 0 },
      ],
    }
  } else if (/^\/api\/v1\/admin\/refund-reasons\/\d+$/.test(url.pathname)) {
    refundReasonMutations.push({ path: url.pathname, method: route.request().method(), body: route.request().postData() ? route.request().postDataJSON() : null })
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => {
    localStorage.setItem('lexiangou_admin_user', JSON.stringify({
      name: '门店测试', role: 'store_staff', storeId: 5, token: 'smoke-test-token',
    }))
  })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="returns"]').click()
  const table = page.locator('#panel-returns table').first()
  await table.locator('tbody tr').first().waitFor()
  const rows = await table.locator('tbody tr').allTextContents()
  for (const status of ['待审核', '已通过', '已拒绝', '已完成']) {
    if (!rows.some(row => row.includes(status))) throw new Error(`缺少退款状态: ${status}; rows=${JSON.stringify(rows)}`)
  }
  const statsText = await page.locator('#panel-returns .return-stats').textContent()
  for (const label of ['待审核', '已通过', '已拒绝', '退款金额']) {
    if (!statsText?.includes(label)) throw new Error(`缺少退款统计项: ${label}; stats=${statsText}`)
  }
  if (!statsText?.includes('1,000.00')) throw new Error(`退款金额统计错误: ${statsText}`)
  const sidebarText = await page.locator('#panel-returns .returns-sidebar').textContent()
  for (const label of ['退款原因分布', '处理时效', '退款统计', '质量问题', '25%', '今日已处理 3 笔', '审核通过率', '50%']) {
    if (!sidebarText?.includes(label)) throw new Error(`右侧统计缺少内容: ${label}; sidebar=${sidebarText}`)
  }
  const reasonCard = page.locator('#panel-returns .card').filter({ hasText: '退款原因配置' })
  const reasonCardText = await reasonCard.textContent()
  if (!reasonCardText?.includes('2 个') || !reasonCardText.includes('质量问题') || !reasonCardText.includes('商品损坏')) {
    throw new Error(`退款原因渲染错误: ${reasonCardText}`)
  }

  await reasonCard.getByRole('button', { name: '管理原因' }).click()
  await page.getByRole('button', { name: '新增原因' }).click()
  await page.getByLabel('原因名称').fill('七天无理由')
  await page.getByLabel('排序').fill('7')
  await page.getByLabel('显示颜色').fill('#2563eb')
  await Promise.all([
    page.waitForResponse(response => response.url().endsWith('/admin/refund-reasons') && response.request().method() === 'POST'),
    page.getByRole('button', { name: '保存', exact: true }).click(),
  ])
  await page.getByRole('button', { name: '编辑', exact: true }).first().click()
  await page.getByLabel('显示颜色').fill('#16a34a')
  await Promise.all([
    page.waitForResponse(response => /\/admin\/refund-reasons\/1$/.test(response.url()) && response.request().method() === 'PUT'),
    page.getByRole('button', { name: '保存', exact: true }).click(),
  ])
  page.once('dialog', dialog => dialog.accept())
  await Promise.all([
    page.waitForResponse(response => /\/admin\/refund-reasons\/1$/.test(response.url()) && response.request().method() === 'DELETE'),
    page.getByRole('button', { name: '删除', exact: true }).first().click(),
  ])
  await page.locator('.modal-close').click()

  const detailResponse = page.waitForResponse(response => response.url().includes('/admin/refunds/1'))
  await table.locator('tbody tr').first().getByRole('button', { name: '详情' }).click()
  await detailResponse
  await page.locator('.modal-content').filter({ hasText: '详情商品名称' }).waitFor()
  if (!await page.locator('.modal-content').textContent().then(text => text.includes('质量问题详情'))) throw new Error('退款详情未使用接口返回内容')
  await page.locator('.modal-close').click()

  const statusResponse = page.waitForResponse(response => response.url().includes('/admin/refunds') && response.url().includes('status=2'))
  await page.locator('#panel-returns select').first().selectOption('2')
  await statusResponse

  await page.locator('#returnSearchInput').fill('ORD-003')
  const searchResponse = page.waitForResponse(response => response.url().includes('/admin/refunds') && response.url().includes('keyword=ORD-003'))
  await page.locator('#returnSearchInput').press('Enter')
  await searchResponse

  const pageResponse = page.waitForResponse(response => response.url().includes('/admin/refunds') && response.url().includes('page=2'))
  await page.locator('#panel-returns .card-footer button').filter({ has: page.locator('.fa-angle-right') }).click()
  await pageResponse

  const expectedInitial = { page: '1', pageSize: '20', keyword: '', status: '', store_id: '5' }
  if (JSON.stringify(refundQueries[0]) !== JSON.stringify(expectedInitial)) throw new Error(`首屏参数错误: ${JSON.stringify(refundQueries[0])}`)
  if (refundQueries[1]?.status !== '2' || refundQueries[1]?.page !== '1') throw new Error(`状态参数错误: ${JSON.stringify(refundQueries[1])}`)
  if (refundQueries[2]?.keyword !== 'ORD-003' || refundQueries[2]?.status !== '2') throw new Error(`搜索参数错误: ${JSON.stringify(refundQueries[2])}`)
  if (refundQueries[3]?.page !== '2' || refundQueries[3]?.store_id !== '5') throw new Error(`分页参数错误: ${JSON.stringify(refundQueries[3])}`)

  const approveResponse = page.waitForResponse(response => response.url().includes('/admin/refunds/1/audit'))
  const approveReload = page.waitForResponse(response => response.url().includes('/admin/refunds?'))
  await table.locator('tbody tr').first().getByRole('button', { name: '通过' }).click()
  await approveResponse
  await approveReload

  page.once('dialog', dialog => dialog.accept('资料不符合退款要求'))
  const rejectResponse = page.waitForResponse(response => response.url().includes('/admin/refunds/1/audit'))
  const rejectReload = page.waitForResponse(response => response.url().includes('/admin/refunds?'))
  await table.locator('tbody tr').first().getByRole('button', { name: '拒绝' }).click()
  await rejectResponse
  await rejectReload

  const expectedApprove = { path: '/api/v1/admin/refunds/1/audit', method: 'PUT', body: { approved: true, remark: '同意退款' } }
  const expectedReject = { path: '/api/v1/admin/refunds/1/audit', method: 'PUT', body: { approved: false, remark: '资料不符合退款要求' } }
  if (JSON.stringify(auditRequests[0]) !== JSON.stringify(expectedApprove)) throw new Error(`审核通过参数错误: ${JSON.stringify(auditRequests[0])}`)
  if (JSON.stringify(auditRequests[1]) !== JSON.stringify(expectedReject)) throw new Error(`审核拒绝参数错误: ${JSON.stringify(auditRequests[1])}`)

  if (refundDetailPaths[0] !== '/api/v1/admin/refunds/1') throw new Error(`详情路径错误: ${JSON.stringify(refundDetailPaths)}`)
  if (refundReasonPaths[0] !== '/api/v1/admin/refund-reasons') throw new Error(`退款原因路径错误: ${JSON.stringify(refundReasonPaths)}`)
  const expectedReasonMutations = [
    { path: '/api/v1/admin/refund-reasons', method: 'POST', body: { content: '七天无理由', sort: 7 } },
    { path: '/api/v1/admin/refund-reasons/1', method: 'PUT', body: { content: '质量问题', sort: 1, status: 1 } },
    { path: '/api/v1/admin/refund-reasons/1', method: 'DELETE', body: null },
  ]
  if (JSON.stringify(refundReasonMutations) !== JSON.stringify(expectedReasonMutations)) throw new Error(`退款原因写操作错误: ${JSON.stringify(refundReasonMutations)}`)
  process.stdout.write(`${JSON.stringify({ refundQueries, refundDetailPaths, refundReasonPaths, refundReasonMutations, auditRequests, rowCount: rows.length }, null, 2)}\n`)
} finally {
  await browser.close()
}
