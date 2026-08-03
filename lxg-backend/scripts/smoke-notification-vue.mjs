import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const requests = []

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  requests.push({ method: request.method(), path: url.pathname, query: Object.fromEntries(url.searchParams), body: request.postDataJSON?.() ?? null })
  let data = {}
  if (request.method() === 'GET' && url.pathname === '/api/v1/admin/notifications') {
    data = { list: [{ id: 11, title: '订单发货提醒', content: '您的订单已发货', type: 1, target_scope: 1, total_count: 100, delivered_count: 98, status: 1, created_at: '2026-07-31 10:00:00' }], total: 1 }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/notifications/11') {
    data = { ID: 11, title: '订单发货提醒（详情）', content: '详情接口返回的完整通知内容', type: 1, targetScope: 1, receiverCount: 100, status: 1, CreatedAt: '2026-07-31T10:00:00+08:00' }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/notification-templates') {
    data = { list: [{ id: 21, name: '发货模板', type: 1, title_template: '订单已发货', content_template: '您的订单已经发出' }] }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/get/users') {
    data = { users: [{ ID: 31, UserName: '测试用户', Phone: '13800000000' }], total: 1 }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/notification-templates') {
    data = { id: 22 }
  } else if (request.method() === 'PUT' && url.pathname === '/api/v1/admin/notification-templates/21') {
    data = { id: 21 }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/notifications') {
    data = { id: 12 }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '管理员', role: 'super_admin', storeId: null, token: 'notification-test-token' })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="payment"]').click()
  await page.locator('#panel-payment').waitFor()
  await page.locator('#sidebarNav .menu-item[data-id="notification"]').click()
  await page.locator('#panel-notification').waitFor()
  const initialNotificationListRequest = requests.find(item => item.method === 'GET' && item.path === '/api/v1/admin/notifications')
  if (JSON.stringify(initialNotificationListRequest?.query) !== JSON.stringify({ page: '1', page_size: '20' })) {
    throw new Error(`notification list query mismatch: ${JSON.stringify(initialNotificationListRequest)}`)
  }
  if (await page.locator('#panel-payment').count()) throw new Error('切换页面后支付面板仍残留')
  if (await page.locator('.page-panel').count() !== 1) throw new Error(`页面容器数量错误: ${await page.locator('.page-panel').count()}`)
  if (requests.some(item => item.method === 'GET' && item.path === '/api/v1/notifications')) throw new Error('通知页面仍请求非管理端通知列表接口')
  await page.getByRole('button', { name: /通知记录/ }).click()
  await page.getByText('订单发货提醒', { exact: true }).waitFor()
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/notifications/11'),
    page.getByRole('button', { name: '详情', exact: true }).click(),
  ])
  await page.getByText('订单发货提醒（详情）', { exact: true }).waitFor()
  await page.getByText('详情接口返回的完整通知内容', { exact: true }).waitFor()
  await page.locator('.notification-modal .modal-close').click()
  page.once('dialog', dialog => dialog.accept())
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/notifications/11' && response.request().method() === 'DELETE'),
    page.locator('#panel-notification .icon-btn.danger').click(),
  ])
  if (!requests.some(item => item.method === 'DELETE' && item.path === '/api/v1/admin/notifications/11')) throw new Error('notification delete endpoint mismatch')
  await page.getByRole('button', { name: /通知模板管理/ }).click()
  await page.getByText('发货模板', { exact: true }).waitFor()
  const templateListRequest = requests.find(item => item.method === 'GET' && item.path === '/api/v1/admin/notification-templates')
  if (JSON.stringify(templateListRequest?.query) !== JSON.stringify({ page: '1', page_size: '20' })) throw new Error(`模板列表参数错误: ${JSON.stringify(templateListRequest)}`)
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/api/v1/admin/notification-templates') && new URL(response.url()).searchParams.get('type') === '2'),
    page.locator('.template-tools select').selectOption('2'),
  ])
  const typedTemplateRequest = requests.find(item => item.method === 'GET' && item.path === '/api/v1/admin/notification-templates' && item.query.type === '2')
  if (JSON.stringify(typedTemplateRequest?.query) !== JSON.stringify({ page: '1', page_size: '20', type: '2' })) throw new Error(`模板类型筛选参数错误: ${JSON.stringify(typedTemplateRequest)}`)
  await page.getByText('发货模板', { exact: true }).click()
  const templateEditor = page.locator('.template-layout > .card').last()
  await templateEditor.locator('input').nth(0).fill('订单发货通知-已编辑')
  await templateEditor.locator('select').selectOption('1')
  await templateEditor.locator('input').nth(1).fill('订单发货通知')
  await templateEditor.locator('textarea').fill('您的订单 {{order_no}} 已发货，请前往门店自提！')
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/api/v1/admin/notification-templates/21') && response.request().method() === 'PUT'),
    templateEditor.getByRole('button', { name: /保存模板/ }).click(),
  ])
  const updateTemplateRequest = requests.find(item => item.method === 'PUT' && item.path === '/api/v1/admin/notification-templates/21')
  const expectedUpdateBody = { name: '订单发货通知-已编辑', type: 1, titleTemplate: '订单发货通知', contentTemplate: '您的订单 {{order_no}} 已发货，请前往门店自提！' }
  if (JSON.stringify(updateTemplateRequest?.body) !== JSON.stringify(expectedUpdateBody)) throw new Error(`编辑模板请求错误: ${JSON.stringify(updateTemplateRequest)}`)
  page.once('dialog', dialog => dialog.accept())
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/notification-templates/21' && response.request().method() === 'DELETE'),
    templateEditor.getByRole('button', { name: /删除/ }).click(),
  ])
  if (!requests.some(item => item.method === 'DELETE' && item.path === '/api/v1/admin/notification-templates/21')) throw new Error('notification template delete endpoint mismatch')
  await page.getByRole('button', { name: /新建/ }).click()
  await templateEditor.locator('input').nth(0).fill('订单发货通知')
  await templateEditor.locator('select').selectOption('1')
  await templateEditor.locator('input').nth(1).fill('订单发货通知')
  await templateEditor.locator('textarea').fill('您的订单 {{order_no}} 已发货，请前往门店自提')
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/api/v1/admin/notification-templates') && response.request().method() === 'POST'),
    templateEditor.getByRole('button', { name: /保存模板/ }).click(),
  ])
  const createTemplateRequest = requests.find(item => item.method === 'POST' && item.path === '/api/v1/admin/notification-templates')
  const expectedTemplateBody = { name: '订单发货通知', type: 1, titleTemplate: '订单发货通知', contentTemplate: '您的订单 {{order_no}} 已发货，请前往门店自提' }
  if (JSON.stringify(createTemplateRequest?.body) !== JSON.stringify(expectedTemplateBody)) throw new Error(`创建模板请求错误: ${JSON.stringify(createTemplateRequest)}`)
  await page.getByRole('button', { name: /发送通知/ }).click()
  await page.getByLabel('指定用户').check()
  await page.getByPlaceholder('搜索用户（用户名/手机号）').fill('13800000000')
  await page.getByPlaceholder('请输入通知标题').fill('系统消息测试')
  await page.getByPlaceholder('请输入通知内容').fill('Vue 通知模块接口测试')
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/api/v1/admin/notifications') && response.request().method() === 'POST'),
    page.getByRole('button', { name: /发送通知/ }).last().click(),
  ])

  const create = requests.find(item => item.method === 'POST' && item.path === '/api/v1/admin/notifications')
  if (!create) throw new Error('未发送创建通知请求')
  if (JSON.stringify(create.body) !== JSON.stringify({ title: '系统消息测试', content: 'Vue 通知模块接口测试', type: 1, targetScope: 2, targetIds: [31], sendType: 1 })) throw new Error(`通知请求体错误: ${JSON.stringify(create.body)}`)
  if (requests.some(item => item.path === '/api/v1/users')) throw new Error('前端仍调用不存在的用户搜索接口')
  if (!requests.some(item => item.method === 'GET' && item.path === '/api/v1/get/users' && item.query.page === '1' && item.query.size === '10')) throw new Error('未按后端支持的分页参数加载用户目录')
  if (requests.some(item => item.path === '/api/v1/get/users' && item.query.size === '1000')) throw new Error('仍在使用不受支持的超大分页参数')
  const legacyLoaded = await page.evaluate(() => performance.getEntriesByType('resource').some(entry => entry.name.includes('/js/system/notification.js')))
  if (legacyLoaded) throw new Error('旧 notification.js 仍被页面加载')
  process.stdout.write(`${JSON.stringify({ vuePageRendered: true, legacyLoaded, requests }, null, 2)}\n`)
} finally {
  await browser.close()
}
