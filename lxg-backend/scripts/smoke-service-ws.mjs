import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const outbound = []
let socketUrl = ''
let serverSocket
const pendingCountPaths = []
const conversationQueries = []
const messageQueries = []
const closeRequests = []
const sendRequests = []
const acceptRequests = []

await page.routeWebSocket('**/api/v1/admin/chat/ws?**', ws => {
  socketUrl = ws.url()
  serverSocket = ws
  ws.onMessage(message => outbound.push(JSON.parse(String(message))))
})

await page.route('**/api/**', async route => {
  const url = new URL(route.request().url())
  let data = {}
  if (url.pathname === '/api/v1/admin/chat/conversations') {
    conversationQueries.push(Object.fromEntries(url.searchParams))
    data = { list: [{ conversation_id: 5, userNickname: '会话昵称用户', user_name: '旧用户名', phone: '13800000000', status: 1, last_message: '您好', updated_at: '10:00', unread_count: 0 }], total: 45 }
  } else if (url.pathname === '/api/v1/admin/chat/conversations/pending-count') {
    pendingCountPaths.push(url.pathname)
    data = { count: 7 }
  } else if (url.pathname === '/api/v1/admin/chat/conversations/5/messages' && route.request().method() === 'GET') {
    messageQueries.push(Object.fromEntries(url.searchParams))
    data = { list: [
      { id: 3, sender_type: 3, content: 'AI历史回复', reply_source: 1, created_at: '10:00' },
      { id: 2, sender_type: 2, content: '客服历史回复', created_at: '09:59' },
      { id: 1, sender_type: 1, content: '用户历史消息', created_at: '09:58' },
    ] }
  } else if (url.pathname === '/api/v1/admin/chat/conversations/5/close') {
    closeRequests.push({ method: route.request().method(), path: url.pathname })
  } else if (url.pathname === '/api/v1/admin/chat/conversations/5/accept') {
    acceptRequests.push({ method: route.request().method(), path: url.pathname })
  } else if (url.pathname === '/api/v1/admin/chat/conversations/5/messages' && route.request().method() === 'POST') {
    sendRequests.push({ method: route.request().method(), body: route.request().postDataJSON() })
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '客服', role: 'order_cs', storeId: null, token: 'ws-test-token' })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="service"]').click()
  await page.getByText('实时连接', { exact: true }).waitFor()
  if (await page.getByText('会话昵称用户', { exact: true }).count() < 2) throw new Error('userNickname 未在会话列表和聊天头部渲染')
  const pendingCard = page.locator('.system-stat-card').filter({ hasText: '待接入' })
  if (!(await pendingCard.textContent())?.includes('7')) throw new Error(`待接入数量渲染错误: ${await pendingCard.textContent()}`)
  if (pendingCountPaths[0] !== '/api/v1/admin/chat/conversations/pending-count') throw new Error(`待接入接口路径错误: ${JSON.stringify(pendingCountPaths)}`)
  if (!socketUrl.startsWith('ws://127.0.0.1:8081/api/v1/admin/chat/ws?')) throw new Error(`WebSocket 地址错误: ${socketUrl}`)
  if (!socketUrl.includes('token=ws-test-token')) throw new Error(`WebSocket 缺少 token: ${socketUrl}`)
  const expectedInitialQuery = { page: '1', pageSize: '20' }
  if (JSON.stringify(conversationQueries[0]) !== JSON.stringify(expectedInitialQuery)) throw new Error(`会话列表初始参数错误: ${JSON.stringify(conversationQueries[0])}`)
  const expectedMessageQuery = { page: '1', pageSize: '20' }
  if (JSON.stringify(messageQueries[0]) !== JSON.stringify(expectedMessageQuery)) throw new Error(`历史消息参数错误: ${JSON.stringify(messageQueries[0])}`)
  const userMessageClass = await page.getByText('用户历史消息', { exact: true }).locator('../..').getAttribute('class')
  const staffMessageClass = await page.getByText('客服历史回复', { exact: true }).locator('../..').getAttribute('class')
  const aiMessage = page.getByText('AI历史回复', { exact: true }).locator('../..')
  if (!userMessageClass?.includes('other')) throw new Error(`用户消息未显示在左侧: ${userMessageClass}`)
  if (!staffMessageClass?.includes('me')) throw new Error(`客服消息未显示在右侧: ${staffMessageClass}`)
  if (!(await aiMessage.getAttribute('class'))?.includes('me') || !(await aiMessage.getByText('AI助手', { exact: true }).count())) throw new Error('AI 消息显示错误')
  const renderedHistory = await page.locator('.system-chat-message-bubble > .message-content').allTextContents()
  const expectedHistory = ['用户历史消息', '客服历史回复', 'AI历史回复']
  if (JSON.stringify(renderedHistory.slice(0, 3)) !== JSON.stringify(expectedHistory)) throw new Error(`历史消息顺序错误: ${JSON.stringify(renderedHistory)}`)

  await Promise.all([
    page.waitForResponse(response => response.url().includes('/admin/chat/conversations?') && response.url().includes('page=1')),
    page.locator('#panel-service select').selectOption('pending'),
  ])
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/admin/chat/conversations?') && response.url().includes('page=2')),
    page.locator('.system-chat-sidebar .fa-angle-right').locator('..').click(),
  ])
  if (conversationQueries[1]?.page !== '1' || 'status' in conversationQueries[1]) throw new Error(`会话状态筛选不应向后端传递 status: ${JSON.stringify(conversationQueries[1])}`)
  if (conversationQueries[2]?.page !== '2' || 'status' in conversationQueries[2]) throw new Error(`会话分页参数错误: ${JSON.stringify(conversationQueries[2])}`)

  await page.locator('#chatInput').fill('用户您好，请问有什么问题')
  await page.locator('#chatInput').press('Enter')
  await page.waitForFunction(() => document.querySelector('.system-chat-messages')?.textContent?.includes('用户您好，请问有什么问题'))
  if (!(await page.locator('.system-chat-messages').getByText('用户您好，请问有什么问题', { exact: true }).locator('../..').getAttribute('class'))?.includes('me')) throw new Error('客服实时消息未显示在右侧')
  const expected = { type: 'chat', data: { conversationId: 5, content: '用户您好，请问有什么问题', messageType: 1 } }
  if (JSON.stringify(outbound[0]) !== JSON.stringify(expected)) throw new Error(`WebSocket 出站消息错误: ${JSON.stringify(outbound)}`)

  serverSocket.send(JSON.stringify({ type: 'chat', data: { id: 99, conversationId: 5, content: '我想咨询退款进度', messageType: 1, from: 'user' } }))
  await page.locator('.system-chat-messages').getByText('我想咨询退款进度', { exact: true }).waitFor()
  if (!(await page.locator('.system-chat-messages').getByText('我想咨询退款进度', { exact: true }).locator('../..').getAttribute('class'))?.includes('other')) throw new Error('用户实时消息未显示在左侧')
  serverSocket.close()
  await page.waitForTimeout(100)
  await page.locator('#chatInput').fill('WebSocket断开后发送')
  await page.locator('#chatInput').press('Enter')
  await page.getByText('客服实时连接未建立，请等待连接成功后再发送', { exact: true }).waitFor()
  if (sendRequests.length) throw new Error(`WebSocket 断开后不应调用不存在的 HTTP 发送接口: ${JSON.stringify(sendRequests)}`)
  await page.locator('#panel-service button').filter({ hasText: '关闭' }).click()
  await Promise.all([
    page.waitForResponse(response => response.url().includes('/api/v1/admin/chat/conversations/5/close')),
    page.locator('.modal-footer button').filter({ hasText: '确认' }).click(),
  ])
  const expectedCloseRequest = { method: 'PUT', path: '/api/v1/admin/chat/conversations/5/close' }
  if (JSON.stringify(closeRequests[0]) !== JSON.stringify(expectedCloseRequest)) throw new Error(`关闭会话请求错误: ${JSON.stringify(closeRequests[0])}`)
  process.stdout.write(`${JSON.stringify({ socketUrl, pendingCountPaths, conversationQueries, messageQueries, closeRequests, sendRequests, acceptRequests, outbound, inboundRendered: true }, null, 2)}\n`)
} finally { await browser.close() }
