import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
let addProductRequest

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  let data = {}
  if (request.method() === 'GET' && url.pathname === '/api/v1/admin/seckill/activities') {
    data = { activities: [{ ID: 6, name: '待发布活动', startTime: '2026-08-02 10:00', endTime: '2026-08-02 12:00', status: 0, products: [] }] }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/product/list') {
    data = { list: [{ ID: 205, name: '联调商品', original_price: 19.9 }] }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/product/detail') {
    data = { skus: [{ id: 350, sku_code: 'SKU-350', spec_values: { 规格: '标准' }, price: 19.9, stock: 500 }] }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/seckill/activities/products') {
    addProductRequest = { method: request.method(), path: url.pathname, body: request.postDataJSON() }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({
    name: '超级管理员', role: 'super_admin', token: 'seckill-product-test',
  })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="marketing"]').click()
  await page.getByRole('button', { name: /添加商品/ }).click()
  await page.locator('#seckillProductSelect').selectOption('205')
  await page.locator('.seckill-sku-row').waitFor()
  await page.locator('.seckill-sku-price').fill('9.9')
  await page.locator('.seckill-sku-stock').fill('500')
  await page.locator('#seckillProductSubmit').click()
  await page.waitForFunction(() => !document.querySelector('.modal-content'))

  const expected = { activity_id: 6, product_id: 205, skus: [{ sku_id: 350, seckill_price: 9.9, stock_limit: 500 }] }
  if (!addProductRequest) throw new Error('未发出添加秒杀商品请求')
  if (addProductRequest.method !== 'POST' || addProductRequest.path !== '/api/v1/admin/seckill/activities/products') {
    throw new Error(`请求地址错误: ${addProductRequest.method} ${addProductRequest.path}`)
  }
  if (JSON.stringify(addProductRequest.body) !== JSON.stringify(expected)) {
    throw new Error(`请求体错误: ${JSON.stringify(addProductRequest.body)}`)
  }
  console.log('秒杀活动添加商品接口验证通过')
} finally {
  await browser.close()
}
