import { chromium } from 'playwright-core'

const username = process.env.LXG_TEST_USERNAME
const password = process.env.LXG_TEST_PASSWORD

if (!username || !password) {
  throw new Error('LXG_TEST_USERNAME and LXG_TEST_PASSWORD are required')
}

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
const apiResponses = []

page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`page: ${error.message}`))
page.on('response', (response) => {
  if (response.url().includes('/api/')) apiResponses.push(`${response.status()} ${response.request().method()} ${new URL(response.url()).pathname}`)
})

try {
  await page.goto('http://127.0.0.1:8081', { waitUntil: 'networkidle' })
  await page.getByLabel('账号').fill(username)
  await page.getByLabel('密码').fill(password)
  await page.locator('#loginForm button[type="submit"]').click()
  await page.locator('#mainContainer').waitFor({ state: 'visible', timeout: 15_000 })

  for (const menu of ['门店总览', '管理员管理']) {
    const pageId = menu === '门店总览' ? 'stores' : 'admin'
    await page.locator(`#sidebarNav .menu-item[data-id="${pageId}"]`).click()
    await page.waitForTimeout(1_000)
    const active = await page.locator('.page-panel.active').getAttribute('id')
    if (!active) throw new Error(`${menu} did not activate a page panel`)
  }

  const result = {
    signedInAs: await page.locator('#adminName').textContent(),
    visibleMenuCount: await page.locator('#sidebarNav .menu-item').count(),
    activePanel: await page.locator('.page-panel.active').getAttribute('id'),
    apiResponses,
    errors,
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
  if (errors.length) process.exitCode = 1
} catch (error) {
  process.stderr.write(`${JSON.stringify({ apiResponses, errors }, null, 2)}\n`)
  throw error
} finally {
  await browser.close()
}
