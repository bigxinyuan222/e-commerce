import { chromium } from 'playwright-core'

const baseUrl = process.env.LXG_TEST_URL || 'http://127.0.0.1:8082'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const inventoryQueries = []
const inventoryAdjustments = []
const inventoryLogRequests = []

await page.route('**/api/**', async (route) => {
  const requestUrl = new URL(route.request().url())
  const path = requestUrl.pathname
  if (path === '/api/v1/admin/search/inventory') inventoryQueries.push(Object.fromEntries(requestUrl.searchParams))
  if (path === '/api/v1/admin/update/inventory') inventoryAdjustments.push(route.request().postDataJSON())
  if (path === '/api/v1/admin/log/inventory') inventoryLogRequests.push(path)
  const data = path === '/api/v1/admin/home'
    ? {
        total_stock: 29392,
        today_inbound: 12138,
        today_outbound: 0,
        warning_sku_count: 2,
        warning_sku_list: [
          {
            sku_code: 'NK-PG40-WH-41',
            product_name: 'Nike Air Zoom Pegasus 40',
            spec_values: { '尺码': '41码', '颜色': '白色' },
            stock: 45,
            warning_value: 50,
            status: '预警',
          },
          {
            sku_code: '8EYD-OAXZ-GEUA-OZXW',
            product_name: '啊嘎嘎发放的事故发生的',
            spec_values: { '颜色': '白色' },
            stock: 1,
            warning_value: 50,
            status: '预警',
          },
        ],
      }
    : path === '/api/v1/admin/search/inventory'
      ? requestUrl.searchParams.get('keyword') === 'NK-PG40-WH-41'
        ? {
            list: [{ sku_id: 310, sku_code: 'NK-PG40-WH-41', product_name: 'Nike Air Zoom Pegasus 40', spec_values: { '尺码': '41码', '颜色': '白色' }, stock: 45, warning_value: 50, status: '预警' }],
            total: 1, page: 1, size: 10,
          }
        : {
          list: [
            { sku_id: 101, sku_code: 'SKU-001', product_name: '测试商品一', spec_values: { '颜色': '黑色' }, stock: 80, warning_value: 50, status: '正常' },
            { sku_id: 102, sku_code: 'SKU-002', product_name: '测试商品二', spec_values: { '尺码': 'L' }, stock: 12, warning_value: 20, status: '预警' },
          ],
          total: 12,
          page: Number(requestUrl.searchParams.get('page')),
          size: Number(requestUrl.searchParams.get('size')),
        }
    : path === '/api/v1/admin/log/inventory'
      ? {
          list: [
            {
              id: 1, sku_id: 101, sku_code: 'SKU-001', product_name: '测试商品一',
              spec_values: { '颜色': '黑色' }, type: 2, quantity: 10,
              before_stock: 70, after_stock: 80, reason: '采购补货',
              operator_name: '库存管理员', created_at: '2026-07-28 10:00:00',
            },
            {
              id: 2, sku_id: 102, sku_code: 'SKU-002', product_name: '测试商品二',
              spec_values: { '尺码': 'L' }, type: 3, quantity: -2,
              before_stock: 14, after_stock: 12, reason: '商品损耗',
              operator_name: '库存管理员', created_at: '2026-07-28 11:00:00',
            },
          ],
        }
      : {}

  await route.fulfill({ json: { code: 200, message: 'success', data } })
})

try {
  await page.addInitScript(() => {
    localStorage.setItem('lexiangou_admin_user', JSON.stringify({
      name: '库存测试', role: 'super_admin', token: 'smoke-test-token',
    }))
  })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.locator('#sidebarNav .menu-item[data-id="stock"]').click()
  await page.locator('.warning-item').first().waitFor()

  const values = await page.locator('#panel-stock .stat-card .value').allTextContents()
  const warningItems = await page.locator('#panel-stock .warning-item').allTextContents()
  const inventoryRows = await page.locator('#panel-stock table').first().locator('tbody tr').count()
  const inventoryLogRows = await page.locator('#panel-stock table').nth(1).locator('tbody tr').allTextContents()

  await page.locator('#stockSearchInput').fill('Nike')
  const searchResponse = page.waitForResponse(response => response.url().includes('/admin/search/inventory') && response.url().includes('keyword=Nike'))
  await page.locator('#stockSearchInput').press('Enter')
  await searchResponse
  const pageResponse = page.waitForResponse(response => response.url().includes('/admin/search/inventory') && response.url().includes('page=2'))
  await page.locator('.stock-pagination-actions button').last().click()
  await pageResponse
  await page.waitForFunction(() => document.querySelector('.stock-pagination')?.textContent?.includes('第 2 / 2 页'))

  await page.locator('.warning-item').first().getByRole('button', { name: '补货' }).click()
  await page.locator('#selectedSkuStock').waitFor()
  const matchedSkuText = await page.locator('#selectedSkuStock').textContent()
  if (!matchedSkuText?.includes('SKU ID: 310')) throw new Error(`预警 SKU 未匹配到数字 ID: ${matchedSkuText}`)
  await page.locator('.modal-close').click()

  await page.locator('#panel-stock table').first().locator('tbody tr').first().getByRole('button', { name: '调整' }).click()
  const directSkuText = await page.locator('#selectedSkuStock').textContent()
  if (!directSkuText?.includes('SKU ID: 101')) throw new Error(`点击商品后未直接填充 SKU: ${directSkuText}`)
  if (await page.locator('#skuSearchInput').count()) throw new Error('库存调整弹窗仍包含 SKU 搜索框')
  await page.locator('.type-radio-option').filter({ has: page.locator('[name="stockType"][value="3"]') }).click()
  await page.locator('#stockQuantity').fill('5')
  await page.locator('#stockReason').fill('盘点发现商品损耗')
  const adjustmentResponse = page.waitForResponse(response => response.url().includes('/admin/update/inventory'))
  await page.locator('#stockAdjustSubmit').click()
  await adjustmentResponse
  await page.locator('.modal-content').waitFor({ state: 'detached' })

  const result = { values, warningItemCount: warningItems.length, inventoryRows, inventoryLogRows, inventoryQueries, inventoryAdjustments, inventoryLogRequests, warningItems }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)

  if (values.join('|') !== '29,392|2|12,138|0' || warningItems.length !== 2 || inventoryRows !== 2) {
    throw new Error('库存汇总或低库存预警渲染结果不符合预期')
  }
  if (inventoryLogRows.length !== 2 || !inventoryLogRows[0].includes('采购入库') || !inventoryLogRows[1].includes('损耗')) {
    throw new Error(`库存日志渲染结果不符合预期: ${JSON.stringify(inventoryLogRows)}`)
  }
  if (JSON.stringify(inventoryQueries[0]) !== JSON.stringify({ page: '1', size: '10', keyword: '' })) {
    throw new Error(`库存查询参数不符合预期: ${JSON.stringify(inventoryQueries[0])}`)
  }
  if (inventoryQueries[1]?.page !== '1' || inventoryQueries[1]?.keyword !== 'Nike' || inventoryQueries[2]?.page !== '2') {
    throw new Error(`库存搜索或分页参数不符合预期: ${JSON.stringify(inventoryQueries)}`)
  }
  const expectedAdjustment = { sku_id: 101, type: 3, quantity: -5, reason: '盘点发现商品损耗' }
  if (JSON.stringify(inventoryAdjustments[0]) !== JSON.stringify(expectedAdjustment)) {
    throw new Error(`库存调整参数不符合预期: ${JSON.stringify(inventoryAdjustments[0])}`)
  }
} finally {
  await browser.close()
}
