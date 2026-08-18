import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const addProductRequests = []
let inProductRequest
let productDetailRequestCount = 0

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  let data = {}
  if (request.method() === 'GET' && url.pathname === '/api/v1/admin/seckill/activities') {
    data = { activities: [{ ID: 6, name: '待发布活动', startTime: '2026-08-02 10:00', endTime: '2026-08-02 12:00', status: 0, products: [] }, { ID: 7, name: '超时活动', startTime: '2026-08-01 10:00', endTime: '2026-08-01 12:00', status: 4, products: [] }, { ID: 8, name: '已发布活动', startTime: '2026-08-03 10:00', endTime: '2026-08-03 12:00', status: 1, products: [] }] }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/product/list') {
    data = { list: [{ ID: 205, name: '联调商品', original_price: 19.9 }] }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/seckill/activities/activity/inproduct') {
    inProductRequest = { method: request.method(), path: url.pathname, search: url.search, body: request.postData() }
    data = { activity_id: 8, products: [{ product_id: 205, product_name: '已发布活动商品', skus: [{ sku_id: 350, spec_values: { 规格: '标准' }, normal_price: 19.9, seckill_price: 9.9, stock_limit: 500, remaining_stock: 500, normal_stock: 800 }] }] }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/product/detail') {
    productDetailRequestCount += 1
    data = { skus: [{ id: 350, sku_code: 'SKU-350', spec_values: { 规格: '标准' }, price: 19.9, stock: 500 }] }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/seckill/activities/products') {
    addProductRequests.push({ method: request.method(), path: url.pathname, body: request.postDataJSON() })
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({
    name: '超级管理员', role: 'super_admin', token: 'seckill-product-test',
  })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="marketing"]').click()
  await page.locator('#panel-marketing .status-badge.red').getByText('超时', { exact: true }).waitFor()
  await page.getByRole('button', { name: /添加商品/ }).click()
  await page.locator('#seckillProductSelect').selectOption('205')
  await page.locator('.seckill-sku-row').waitFor()
  await page.locator('.seckill-sku-price').fill('9.9')
  await page.locator('.seckill-sku-stock').fill('500')
  await page.locator('#seckillProductSubmit').click()
  await page.waitForFunction(() => !document.querySelector('.modal-content'))

  const expected = { activity_id: 6, product_id: 205, skus: [{ sku_id: 350, seckill_price: 9.9, stock_limit: 500 }] }
  const addProductRequest = addProductRequests[0]
  if (!addProductRequest) throw new Error('未发出添加秒杀商品请求')
  if (addProductRequest.method !== 'POST' || addProductRequest.path !== '/api/v1/admin/seckill/activities/products') {
    throw new Error(`请求地址错误: ${addProductRequest.method} ${addProductRequest.path}`)
  }
  if (JSON.stringify(addProductRequest.body) !== JSON.stringify(expected)) {
    throw new Error(`请求体错误: ${JSON.stringify(addProductRequest.body)}`)
  }
  await page.getByRole('button', { name: /添加\/编辑商品/ }).click()
  if (!inProductRequest || inProductRequest.method !== 'GET' || inProductRequest.search !== '?id=8') {
    throw new Error(`发布后商品列表请求错误: ${JSON.stringify(inProductRequest)}`)
  }
  await page.locator('#seckillProductSelect').selectOption('205')
  await page.locator('.seckill-sku-row').waitFor()
  if (productDetailRequestCount !== 1) throw new Error('发布后选择商品不应再次请求商品详情接口')
  if (await page.locator('.seckill-sku-stock').inputValue() !== '800') throw new Error('发布后可增加库存未使用 normal_stock 默认值')
  await page.locator('.seckill-sku-stock').fill('20')
  await page.locator('#seckillProductSubmit').click()
  await page.waitForFunction(() => !document.querySelector('.modal-content'))
  const publishedAddRequest = addProductRequests[1]
  const publishedExpected = { activity_id: 8, product_id: 205, skus: [{ sku_id: 350, seckill_price: 9.9, stock_limit: 20 }] }
  if (JSON.stringify(publishedAddRequest?.body) !== JSON.stringify(publishedExpected)) throw new Error(`发布后库存增量请求体错误: ${JSON.stringify(publishedAddRequest?.body)}`)
  console.log('秒杀活动发布前新增/修改、发布后新增及库存增量接口验证通过')
} finally {
  await browser.close()
}
