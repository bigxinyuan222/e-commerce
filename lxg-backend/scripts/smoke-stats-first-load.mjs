import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const username = process.env.LXG_TEST_USERNAME
const password = process.env.LXG_TEST_PASSWORD
if (!username || !password) throw new Error('LXG_TEST_USERNAME and LXG_TEST_PASSWORD are required')

const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const requests = []
page.on('request', request => {
  const url = new URL(request.url())
  if (url.pathname.startsWith('/api/')) requests.push(`${request.method()} ${url.pathname}${url.search}`)
})

try {
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.getByLabel('账号').fill(username)
  await page.getByLabel('密码').fill(password)
  await page.locator('#loginForm button[type="submit"]').click()
  await page.locator('#panel-stats .stats-grid').waitFor({ timeout: 15_000 })
  await page.waitForTimeout(1_000)

  const values = await page.locator('#panel-stats .stats-grid .value').allTextContents()
  if (!requests.some(item => item.includes('/api/v1/admin/orders?'))) throw new Error('stats page did not request orders on first load')
  if (!requests.some(item => item.includes('/api/v1/get/users?'))) throw new Error('stats page did not request users on first load')
  if (!requests.some(item => item.includes('/api/v1/admin/home'))) throw new Error('stats page did not request inventory summary on first load')
  if (values.every(value => !/[1-9]/.test(value))) throw new Error(`all first-load stats are zero: ${JSON.stringify(values)}`)

  process.stdout.write(`${JSON.stringify({ firstLoadRendered: true, values, requests }, null, 2)}\n`)
} finally {
  await browser.close()
}
