import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const requests = []
let auditRequest = null
let hideRequest = null
let replyRequest = null
let deleteReplyRequest = null
const summaryAuditRequests = []
let editSummaryRequest = null

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  requests.push(`${request.method()} ${url.pathname}${url.search}`)
  let data = {}
  if (url.pathname === '/api/v1/admin/review/list') {
    data = { list: [{ id: 91, product: { id: 205, name: '评价接口联调商品' }, user: { id: 8, nickname: '评价用户', phone: '13800000008' }, rating: 5, content: '评价列表接口返回成功', status: 0, created_at: '2026-08-01T12:00:00+08:00' }] }
  } else if (url.pathname === '/api/v1/admin/review/detail') {
    data = { id: 91, product: { id: 205, name: '评价接口联调商品' }, user: { id: 8, nickname: '评价用户', phone: '13800000008' }, rating: 5, content: '评价详情接口返回成功', status: 0, created_at: '2026-08-01T12:00:00+08:00', replies: [{ id: 501, user_name: '回复用户', content: '待删除用户回复', created_at: '2026-08-02T08:00:00+08:00' }] }
  } else if (url.pathname === '/api/v1/admin/review/audit') {
    auditRequest = { method: request.method(), headers: request.headers(), body: request.postDataJSON() }
  } else if (url.pathname === '/api/v1/admin/review/hide') {
    hideRequest = { method: request.method(), headers: request.headers(), body: request.postDataJSON() }
  } else if (url.pathname === '/api/v1/admin/review/reply') {
    replyRequest = { method: request.method(), headers: request.headers(), body: request.postDataJSON() }
  } else if (url.pathname === '/api/v1/admin/delete/reply') {
    deleteReplyRequest = { method: request.method(), headers: request.headers(), body: request.postDataJSON() }
  } else if (url.pathname === '/api/v1/admin/audit/summary') {
    summaryAuditRequests.push({ method: request.method(), headers: request.headers(), body: request.postDataJSON() })
  } else if (url.pathname === '/api/v1/admin/edit/review') {
    editSummaryRequest = { method: request.method(), headers: request.headers(), body: request.postDataJSON() }
  } else if (url.pathname === '/api/v1/admin/review/ailist') {
    data = { list: [
      { id: 701, product: { id: 205, name: 'AI摘要联调商品' }, summary_content: 'AI摘要列表接口返回成功', review_count: 18, state: 0, created_at: '2026-08-03T08:00:00+08:00' },
      { id: 702, product: { id: 206, name: '待删除摘要商品' }, summary_content: '待删除AI摘要', review_count: 9, state: 0, created_at: '2026-08-03T09:00:00+08:00' },
    ] }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '超级管理员', role: 'super_admin', token: 'review-list-test' })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="reviews"]').click()
  await page.getByText('评价接口联调商品', { exact: false }).first().waitFor()
  await page.getByText('评价列表接口返回成功', { exact: false }).first().waitFor()
  await page.getByText('AI摘要列表接口返回成功', { exact: false }).waitFor()
  const listRequest = requests.find(item => item.startsWith('GET /api/v1/admin/review/list'))
  if (!listRequest) throw new Error('评价列表请求错误: 未发出请求')
  const listUrl = new URL(`http://test${listRequest.slice(4)}`)
  const expectedParams = { page: '1', size: '10', keyword: '', review_type: '', status: '', start_date: '', end_date: '' }
  for (const [key, expected] of Object.entries(expectedParams)) {
    if (listUrl.searchParams.get(key) !== expected) throw new Error(`评价列表参数错误: ${key}=${listUrl.searchParams.get(key)}`)
  }
  const summaryRequest = requests.find(item => item.startsWith('GET /api/v1/admin/review/ailist'))
  if (!summaryRequest) throw new Error('AI摘要列表请求错误: 未发出请求')
  const summaryUrl = new URL(`http://test${summaryRequest.slice(4)}`)
  if (summaryUrl.searchParams.get('page') !== '1' || summaryUrl.searchParams.get('size') !== '10') throw new Error(`AI摘要列表参数错误: ${summaryUrl.search}`)
  if (summaryUrl.searchParams.has('state')) throw new Error('未筛选状态时不应发送 state 参数')
  await page.evaluate(() => window.handleSummaryAction?.('701', 'approve'))
  page.once('dialog', dialog => dialog.accept('编辑后的 AI 摘要内容'))
  await Promise.all([
    page.waitForRequest(request => new URL(request.url()).pathname === '/api/v1/admin/edit/review'),
    page.evaluate(() => window.editSummary?.('701')),
  ])
  await page.getByText('编辑后的 AI 摘要内容', { exact: false }).waitFor()
  if (editSummaryRequest?.method !== 'POST') throw new Error(`编辑摘要方法错误: ${editSummaryRequest?.method || '未发出请求'}`)
  if (JSON.stringify(editSummaryRequest.body) !== JSON.stringify({ id: 701, content: '编辑后的 AI 摘要内容' })) throw new Error(`编辑摘要参数错误: ${JSON.stringify(editSummaryRequest?.body)}`)
  if (editSummaryRequest.headers.authorization !== 'Bearer review-list-test') throw new Error('编辑摘要请求未携带 Authorization')
  if (!editSummaryRequest.headers['content-type']?.startsWith('application/json')) throw new Error('编辑摘要请求 Content-Type 错误')
  if (!requests.includes('POST /api/v1/admin/edit/review')) throw new Error('编辑摘要接口路径错误')
  if (requests.some(item => item.includes('/review-summaries/701'))) throw new Error('仍在请求旧编辑摘要接口')
  await page.evaluate(() => window.handleSummaryAction?.('702', 'reject'))
  await Promise.all([
    page.waitForRequest(request => new URL(request.url()).pathname === '/api/v1/admin/audit/summary' && request.postDataJSON()?.action === 1),
    page.evaluate(() => window.confirmCallback?.(true)),
  ])
  await page.evaluate(() => window.closeConfirm?.())
  if (summaryAuditRequests.length !== 2) throw new Error(`摘要审核请求次数错误: ${summaryAuditRequests.length}`)
  if (summaryAuditRequests.some(item => item.method !== 'POST')) throw new Error('摘要审核请求方法错误')
  if (JSON.stringify(summaryAuditRequests[0].body) !== JSON.stringify({ id: 701, action: 0 })) throw new Error(`摘要通过参数错误: ${JSON.stringify(summaryAuditRequests[0]?.body)}`)
  if (JSON.stringify(summaryAuditRequests[1].body) !== JSON.stringify({ id: 702, action: 1 })) throw new Error(`摘要删除参数错误: ${JSON.stringify(summaryAuditRequests[1]?.body)}`)
  if (summaryAuditRequests.some(item => item.headers.authorization !== 'Bearer review-list-test')) throw new Error('摘要审核请求未携带 Authorization')
  if (summaryAuditRequests.some(item => !item.headers['content-type']?.startsWith('application/json'))) throw new Error('摘要审核请求 Content-Type 错误')
  if (requests.some(item => item.includes('/review-summaries/701/audit'))) throw new Error('仍在请求旧摘要审核接口')
  await page.getByRole('button', { name: '详情' }).first().click()
  await page.getByText('评价详情接口返回成功', { exact: false }).last().waitFor()
  const detailRequest = requests.find(item => item.startsWith('GET /api/v1/admin/review/detail'))
  if (detailRequest !== 'GET /api/v1/admin/review/detail?id=91') throw new Error(`评价详情请求错误: ${detailRequest || '未发出请求'}`)
  await page.evaluate(() => window.deleteUserReply?.('91', '501'))
  await Promise.all([
    page.waitForRequest(request => new URL(request.url()).pathname === '/api/v1/admin/delete/reply'),
    page.evaluate(() => window.confirmCallback?.(true)),
  ])
  await page.waitForFunction(() => !document.querySelector('.modal-content'))
  if (deleteReplyRequest?.method !== 'POST') throw new Error(`删除用户回复方法错误: ${deleteReplyRequest?.method || '未发出请求'}`)
  if (JSON.stringify(deleteReplyRequest.body) !== JSON.stringify({ id: 501 })) throw new Error(`删除用户回复参数错误: ${JSON.stringify(deleteReplyRequest?.body)}`)
  if (deleteReplyRequest.headers.authorization !== 'Bearer review-list-test') throw new Error('删除用户回复请求未携带 Authorization')
  if (!deleteReplyRequest.headers['content-type']?.startsWith('application/json')) throw new Error('删除用户回复请求 Content-Type 错误')
  if (!requests.includes('POST /api/v1/admin/delete/reply')) throw new Error('删除用户回复接口路径错误')
  await page.getByRole('button', { name: '详情' }).first().click()
  await page.getByText('评价详情接口返回成功', { exact: false }).last().waitFor()
  await page.getByRole('button', { name: '添加回复' }).click()
  await page.locator('textarea[id^="replyContent-"]').fill('管理员接口联调回复')
  await Promise.all([
    page.waitForRequest(request => new URL(request.url()).pathname === '/api/v1/admin/review/reply'),
    page.getByRole('button', { name: '发送' }).click(),
  ])
  if (replyRequest?.method !== 'POST') throw new Error(`管理员回复方法错误: ${replyRequest?.method || '未发出请求'}`)
  if (JSON.stringify(replyRequest.body) !== JSON.stringify({ id: 91, content: '管理员接口联调回复' })) throw new Error(`管理员回复参数错误: ${JSON.stringify(replyRequest?.body)}`)
  if (replyRequest.headers.authorization !== 'Bearer review-list-test') throw new Error('管理员回复请求未携带 Authorization')
  if (!replyRequest.headers['content-type']?.startsWith('application/json')) throw new Error('管理员回复请求 Content-Type 错误')
  if (!requests.includes('POST /api/v1/admin/review/reply')) throw new Error('管理员回复接口路径错误')
  await page.getByRole('button', { name: '详情' }).first().click()
  await page.getByText('评价详情接口返回成功', { exact: false }).last().waitFor()
  await page.evaluate(() => window.handleReviewAction?.('91', 'approve'))
  await page.waitForFunction(() => document.body.textContent?.includes('显示'))
  if (auditRequest?.method !== 'POST') throw new Error(`评价审核方法错误: ${auditRequest?.method || '未发出请求'}`)
  if (JSON.stringify(auditRequest.body) !== JSON.stringify({ id: 91, status: 1 })) throw new Error(`评价审核参数错误: ${JSON.stringify(auditRequest?.body)}`)
  if (auditRequest.headers.authorization !== 'Bearer review-list-test') throw new Error('评价审核请求未携带 Authorization')
  if (!auditRequest.headers['content-type']?.startsWith('application/json')) throw new Error('评价审核请求 Content-Type 错误')
  if (!requests.includes('POST /api/v1/admin/review/audit')) throw new Error('评价审核接口路径错误')
  if (requests.some(item => item.includes('/reviews/91/audit'))) throw new Error('仍在请求旧评价审核接口')
  if (requests.some(item => item.includes('/reviews/91/reply'))) throw new Error('仍在请求旧管理员回复接口')
  await page.evaluate(() => window.closeReviewModal?.())
  await Promise.all([
    page.waitForRequest(request => new URL(request.url()).pathname === '/api/v1/admin/review/hide'),
    page.locator('#panel-reviews button:has(i.fa-eye-slash)').first().click(),
  ])
  if (hideRequest?.method !== 'POST') throw new Error(`隐藏评价方法错误: ${hideRequest?.method || '未发出请求'}`)
  if (JSON.stringify(hideRequest.body) !== JSON.stringify({ id: 91 })) throw new Error(`隐藏评价参数错误: ${JSON.stringify(hideRequest?.body)}`)
  if (hideRequest.headers.authorization !== 'Bearer review-list-test') throw new Error('隐藏评价请求未携带 Authorization')
  if (!hideRequest.headers['content-type']?.startsWith('application/json')) throw new Error('隐藏评价请求 Content-Type 错误')
  if (!requests.includes('POST /api/v1/admin/review/hide')) throw new Error('隐藏评价接口路径错误')
  if (requests.some(item => item.startsWith('GET /api/v1/reviews'))) throw new Error('仍在请求旧评价列表接口')
  if (requests.some(item => item.startsWith('GET /api/v1/review-summaries'))) throw new Error('仍在请求旧 AI 摘要列表接口')
  console.log('评价列表、详情、审核、隐藏、管理员回复、删除用户回复、AI 摘要列表、审核及编辑接口验证通过')
} finally {
  await browser.close()
}
