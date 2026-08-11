import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8081'
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const requests = []
const uploadedImageUrl = 'https://blog-ydx.oss-cn-beijing.aliyuncs.com/enjoymall/images/1785498095164932346_9a586dc4f0d4d30d128c5c2cf11f2c50.png'

await page.route('**/api/**', async route => {
  const request = route.request()
  const url = new URL(request.url())
  let body = null
  try { body = request.postDataJSON?.() ?? null } catch {}
  requests.push({ method: request.method(), path: url.pathname, query: Object.fromEntries(url.searchParams), body, headers: request.headers(), postData: request.postData() })
  let data = []
  if (request.method() === 'POST' && url.pathname === '/api/v1/user/upload') {
    data = { url: uploadedImageUrl }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/banners') {
    data = { ID: 72, ...request.postDataJSON() }
  } else if (request.method() === 'POST' && url.pathname === '/api/v1/admin/recommendations') {
    data = { ID: 81, name: request.postDataJSON().name, status: request.postDataJSON().status, CreatedAt: '2026-07-31T17:00:00+08:00' }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/recommendations/81/products') {
    data = [{ ID: 91, recommendationId: 81, productId: 901 }]
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/product/list') {
    data = { list: [{ ID: 901, name: '已选商品', price: 100, image: '' }, { ID: 902, name: '可选商品', price: 200, image: '' }] }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/banners') {
    data = { list: [{ ID: 71, imageUrl: 'https://img.example.com/banner.jpg', linkUrl: '/pages/activity/seckill', linkType: 2, sort: 1, status: 1, CreatedAt: '2026-07-31T10:00:00+08:00' }], total: 1, page: 1, pageSize: 20 }
  } else if (request.method() === 'GET' && url.pathname === '/api/v1/admin/banners/71') {
    data = { ID: 71, imageUrl: 'https://img.example.com/banner-detail.jpg', linkUrl: '/pages/product/detail?id=901', linkType: 1, sort: 2, status: 1, CreatedAt: '2026-07-31T10:00:00+08:00' }
  }
  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => localStorage.setItem('lexiangou_admin_user', JSON.stringify({ name: '管理员', role: 'super_admin', token: 'homepage-test-token' })))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="homepage"]').click()
  await page.getByRole('button', { name: /新增推荐/ }).waitFor()
  const banners = requests.find(item => item.method === 'GET' && item.path === '/api/v1/admin/banners')
  if (JSON.stringify(banners?.query) !== JSON.stringify({ page: '1', pageSize: '20', status: '1' })) throw new Error(`banner list query mismatch: ${JSON.stringify(banners)}`)
  await page.getByRole('button', { name: /新增轮播图/ }).click()
  await page.locator('#bannerTitle').fill('首页活动轮播图')
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/user/upload' && response.request().method() === 'POST'),
    page.locator('#bannerImageFile').setInputFiles({ name: 'banner.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('banner-image') }),
  ])
  await page.locator('#bannerLinkType').selectOption('category')
  await page.locator('#bannerLink').fill('https://xxx.com/activity')
  await page.locator('#bannerSort').fill('5')
  await page.locator('#bannerStatus').selectOption('active')
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/banners' && response.request().method() === 'POST'),
    page.locator('.modal-content .modal-footer .btn-primary').click(),
  ])
  const createBanner = requests.find(item => item.method === 'POST' && item.path === '/api/v1/admin/banners')
  if (JSON.stringify(createBanner?.body) !== JSON.stringify({ imageUrl: uploadedImageUrl, linkUrl: 'https://xxx.com/activity', linkType: 3, sort: 5, status: 1 })) throw new Error(`banner create request mismatch: ${JSON.stringify(createBanner)}`)
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/banners/71'),
    page.locator('[data-banner-edit-id="71"]').click(),
  ])
  await page.locator('#bannerImage').waitFor({ state: 'attached' })
  if (await page.locator('#bannerImage').inputValue() !== 'https://img.example.com/banner-detail.jpg') throw new Error('banner detail response was not rendered')
  if (await page.locator('#bannerLinkType').inputValue() !== 'goods') throw new Error('banner detail link type was not mapped')
  await page.locator('.modal-content .modal-close').click()
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/banners/71'),
    page.locator('[data-banner-edit-id="71"]').click(),
  ])
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/user/upload' && response.request().method() === 'POST'),
    page.locator('#bannerImageFile').setInputFiles({ name: 'banner.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('banner-image') }),
  ])
  if (await page.locator('#bannerImage').inputValue() !== uploadedImageUrl) throw new Error('uploaded image URL was not filled into the banner form')
  if (await page.locator('#bannerImagePreview').getAttribute('src') !== uploadedImageUrl) throw new Error('uploaded image URL was not used by the preview')
  if (!await page.locator('#bannerImagePreview').isVisible()) throw new Error('uploaded image preview was not rendered')
  const upload = requests.find(item => item.method === 'POST' && item.path === '/api/v1/user/upload')
  if (!upload?.headers['content-type']?.startsWith('multipart/form-data; boundary=')) throw new Error(`upload content type mismatch: ${upload?.headers['content-type']}`)
  if (upload?.headers.authorization !== 'Bearer homepage-test-token') throw new Error('upload authorization header mismatch')
  if (!upload?.postData?.includes('name="file"') || !upload.postData.includes('filename="banner.jpg"')) throw new Error('upload multipart file field mismatch')
  await page.locator('#bannerLinkType').selectOption('none')
  await page.locator('#bannerLink').fill('')
  await page.locator('#bannerSort').fill('1')
  await page.locator('#bannerStatus').selectOption('active')
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/banners/71' && response.request().method() === 'PUT'),
    page.locator('.modal-content .modal-footer .btn-primary').click(),
  ])
  const updateBanner = requests.find(item => item.method === 'PUT' && item.path === '/api/v1/admin/banners/71')
  if (JSON.stringify(updateBanner?.body) !== JSON.stringify({ imageUrl: uploadedImageUrl, linkUrl: '', linkType: 0, sort: 1, status: 1 })) throw new Error(`banner update request mismatch: ${JSON.stringify(updateBanner)}`)
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/banners/71/toggle' && response.request().method() === 'PUT'),
    page.locator('[data-banner-toggle-id="71"]').click(),
  ])
  const toggleBanner = requests.find(item => item.method === 'PUT' && item.path === '/api/v1/admin/banners/71/toggle')
  if (toggleBanner?.body !== null) throw new Error(`banner toggle should not send a body: ${JSON.stringify(toggleBanner)}`)
  page.once('dialog', dialog => dialog.accept())
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/banners/71' && response.request().method() === 'DELETE'),
    page.locator('[data-banner-delete-id="71"]').click(),
  ])
  const deleteBanner = requests.find(item => item.method === 'DELETE' && item.path === '/api/v1/admin/banners/71')
  if (deleteBanner?.body !== null) throw new Error(`banner delete should not send a body: ${JSON.stringify(deleteBanner)}`)
  await page.getByRole('button', { name: /新增推荐/ }).click()
  await page.locator('#recommendName').fill('热门推荐')
  await page.locator('#recommendStatus').selectOption('active')
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/recommendations' && response.request().method() === 'POST'),
    page.locator('.modal-content .modal-footer .btn-primary').click(),
  ])
  await page.getByText('热门推荐', { exact: true }).first().waitFor()

  const create = requests.find(item => item.method === 'POST' && item.path === '/api/v1/admin/recommendations')
  if (JSON.stringify(create?.body) !== JSON.stringify({ name: '热门推荐', status: 1 })) throw new Error(`recommendation create request mismatch: ${JSON.stringify(create)}`)
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/recommendations/81' && response.request().method() === 'PUT'),
    page.getByRole('button', { name: /禁用/ }).click(),
  ])
  const update = requests.find(item => item.method === 'PUT' && item.path === '/api/v1/admin/recommendations/81')
  if (JSON.stringify(update?.body) !== JSON.stringify({ name: '热门推荐', status: 0 })) throw new Error(`recommendation update request mismatch: ${JSON.stringify(update)}`)
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/recommendations/81/products' && response.request().method() === 'GET'),
    page.getByRole('button', { name: /编辑商品/ }).click(),
  ])
  await page.locator('.modal-content').waitFor()
  if (!requests.some(item => item.method === 'GET' && item.path === '/api/v1/admin/recommendations/81/products')) throw new Error('recommendation products endpoint mismatch')
  await page.locator('#recommendProductSearch').fill('可选商品')
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/product/list' && new URL(response.url()).searchParams.get('key_word') === '可选商品'),
    page.locator('.product-search-bar').press('Enter'),
  ])
  const productSearch = requests.find(item => item.method === 'GET' && item.path === '/api/v1/admin/product/list' && item.query.key_word === '可选商品')
  if (JSON.stringify(productSearch?.query) !== JSON.stringify({ page: '1', size: '20', key_word: '可选商品' })) throw new Error(`product search query mismatch: ${JSON.stringify(productSearch)}`)
  await Promise.all([
    page.waitForResponse(response => new URL(response.url()).pathname === '/api/v1/admin/recommendations/81/products' && response.request().method() === 'POST'),
    page.locator('.modal-content [data-add-product-id="902"]').click(),
  ])
  const addProduct = requests.find(item => item.method === 'POST' && item.path === '/api/v1/admin/recommendations/81/products')
  if (JSON.stringify(addProduct?.body) !== JSON.stringify({ productId: 902 })) throw new Error(`recommendation product request mismatch: ${JSON.stringify(addProduct)}`)
  const list = requests.find(item => item.method === 'GET' && item.path === '/api/v1/admin/recommendations')
  if (JSON.stringify(list?.query) !== JSON.stringify({ page: '1', pageSize: '20', status: '1' })) throw new Error(`recommendation list query mismatch: ${JSON.stringify(list)}`)
  process.stdout.write(`${JSON.stringify({ createdRecommendationRendered: true, create, update }, null, 2)}\n`)
} finally {
  await browser.close()
}
