<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

interface ProductApiRow {
  id?: number | string
  ID?: number | string
  name?: string
  image?: string
  first_category_name?: string
  second_category_name?: string
  brand_name?: string
  original_price?: number | string
  sku_count?: number
  status?: number
  created_at?: string
  CreatedAt?: string
}

interface Product {
  id: number | string
  name: string
  image: string
  firstCategory: string
  secondCategory: string
  brand: string
  originalPrice: number | string
  skuCount: number
  status: number
  createdAt: string
}

interface CategoryItem {
  id: number | string
  name: string
  productCount: number
  children: CategoryItem[]
}

interface BrandItem {
  id: number | string
  name: string
  productCount: number
  logo: string
}

interface SpecificationItem {
  id: number | string
  name: string
  values: string[]
}

interface ProductDetailSku {
  id: number | string
  sku_code: string
  spec_values: Record<string, string>
  price: string
  stock: number
}

interface ProductDetail {
  id: number | string
  name: string
  status: number
  first_category_name: string
  second_category_name: string
  brand_name: string
  original_price: string
  sku_count: number
  views: number
  completed_order_count: number
  conversion_rate: string
  skus: ProductDetailSku[]
}

interface CreateSku {
  specValues: Record<string, string>
  skuCode: string
  price: string
  stock: number
  image: string
}

type ResourceKind = 'category' | 'subcategory' | 'brand' | 'specification'
type ResourceName = 'categories' | 'brands' | 'specifications'

const props = defineProps<{ token?: string }>()
const products = ref<Product[]>([])
const loading = ref(false)
const error = ref('')
const keyword = ref('')
const categoryId = ref<number | string | ''>('')
const subcategory = ref<number | string | ''>('')
const status = ref<number | ''>('')
const page = ref(1)
const size = ref(10)
const total = ref(0)
const selectedIds = ref<Array<number | string>>([])
const batchLoading = ref(false)
const batchError = ref('')
const deletingId = ref<number | string | null>(null)
const detailOpen = ref(false)
const detailLoading = ref(false)
const detailError = ref('')
const detailData = ref<ProductDetail | null>(null)
const detailTotalStock = computed(() => detailData.value?.skus.reduce((sum, sku) => sum + (Number(sku.stock) || 0), 0) ?? 0)
const detailPriceRange = computed(() => {
  const prices = detailData.value?.skus.map(sku => Number(sku.price)).filter(Number.isFinite) ?? []
  if (!prices.length) return `¥${detailData.value?.original_price ?? '0.00'}`
  const min = Math.min(...prices); const max = Math.max(...prices)
  return min === max ? `¥${min.toFixed(2)}` : `¥${min.toFixed(2)} - ¥${max.toFixed(2)}`
})
const allVisibleSelected = computed(() => products.value.length > 0 && products.value.every(({ id }) => selectedIds.value.includes(id)))
const categories = ref<CategoryItem[]>([])
const brands = ref<BrandItem[]>([])
const specifications = ref<SpecificationItem[]>([])
const categoryProductCounts = ref<Record<string, number>>({})
const subcategoryProductCounts = ref<Record<string, number>>({})
const brandProductCounts = ref<Record<string, number>>({})
const selectedSearchCategory = computed(() => categories.value.find(item => String(item.id) === String(categoryId.value)))
const searchSubcategories = computed(() => selectedSearchCategory.value?.children ?? [])
const resourceLoading = reactive<Record<ResourceName, boolean>>({ categories: false, brands: false, specifications: false })
const resourceErrors = reactive<Record<ResourceName, string>>({ categories: '', brands: '', specifications: '' })
const expandedCategories = ref<Array<number | string>>([])
const editorOpen = ref(false)
const editorKind = ref<ResourceKind>('category')
const editorId = ref<number | string | null>(null)
const editorLoading = ref(false)
const editorError = ref('')
const editorForm = reactive({ name: '', parentId: '' as number | string, valuesText: '', newValuesText: '', logo: '' })
const createOpen = ref(false)
const createStep = ref(1)
const createLoading = ref(false)
const imageUploading = ref(false)
const brandLogoUploading = ref(false)
const createImages = ref<string[]>([])
const createError = ref('')
const createForm = reactive({
  name: '',
  description: '',
  brandId: '' as number | '',
  firstCategoryName: '',
  categoryId: '' as number | '',
  originalPrice: '' as number | '',
  status: 0,
  selectedSpecs: {} as Record<string, string[]>,
  skus: [] as CreateSku[],
})

const editorTitle = computed(() => {
  const names: Record<ResourceKind, string> = { category: '分类', subcategory: '子分类', brand: '品牌', specification: '规格' }
  return `${editorId.value === null ? '新增' : '编辑'}${names[editorKind.value]}`
})
const selectedCreateCategory = computed(() => categories.value.find(item => String(item.id) === String(createForm.firstCategoryName)))
const createSpecs = computed(() => specifications.value
  .map(spec => ({ id: Number(spec.id), name: spec.name, values: createForm.selectedSpecs[spec.name] || [] }))
  .filter(spec => spec.values.length > 0))

function normalizeProduct(row: ProductApiRow): Product {
  return {
    id: row.id ?? row.ID ?? '-',
    name: row.name || '-',
    image: row.image || '',
    firstCategory: row.first_category_name || '-',
    secondCategory: row.second_category_name || '-',
    brand: row.brand_name || '-',
    originalPrice: row.original_price ?? 0,
    skuCount: row.sku_count ?? 0,
    status: Number(row.status ?? 0),
    createdAt: row.created_at || row.CreatedAt || '-',
  }
}

function conversionPercent(value: unknown) {
  const text = String(value ?? '').trim()
  if (!text) return '0%'
  if (text.endsWith('%')) return text
  const ratio = Number(text)
  if (!Number.isFinite(ratio)) return '0%'
  const percent = ratio * 100
  return `${percent.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')}%`
}

function resourceCount(item: { name: string; productCount: number }, kind: 'category' | 'subcategory' | 'brand') {
  const values = kind === 'category' ? categoryProductCounts.value : kind === 'subcategory' ? subcategoryProductCounts.value : brandProductCounts.value
  return Object.prototype.hasOwnProperty.call(values, item.name) ? values[item.name] : item.productCount
}

async function loadProductResourceCounts() {
  const rows: Product[] = []
  const pageSize = 100
  try {
    for (let current = 1; current <= 1000; current++) {
      const payload = await requestJson(`/api/v1/admin/product/list?page=${current}&size=${pageSize}`, { headers: authHeaders() })
      const pageRows = extractList(payload).map(normalizeProduct)
      rows.push(...pageRows)
      const data = payload?.data ?? payload
      const totalCount = Number(data?.total ?? data?.total_count ?? data?.count)
      if (!pageRows.length || pageRows.length < pageSize || (Number.isFinite(totalCount) && totalCount >= 0 && rows.length >= totalCount)) break
    }
    const first: Record<string, number> = {}; const second: Record<string, number> = {}; const brand: Record<string, number> = {}
    rows.forEach((product) => {
      if (product.firstCategory && product.firstCategory !== '-') first[product.firstCategory] = (first[product.firstCategory] || 0) + 1
      if (product.secondCategory && product.secondCategory !== '-') second[product.secondCategory] = (second[product.secondCategory] || 0) + 1
      if (product.brand && product.brand !== '-') brand[product.brand] = (brand[product.brand] || 0) + 1
    })
    categoryProductCounts.value = first; subcategoryProductCounts.value = second; brandProductCounts.value = brand
  } catch (cause) {
    console.warn('Unable to aggregate product resource counts', cause)
  }
}

function notify(message: string, type: 'success' | 'error' = 'success') {
  const toast = (window as unknown as { showToast?: (text: string, kind: string) => void }).showToast
  if (toast) toast(message, type)
}

function authHeaders(json = false) {
  const headers = new Headers()
  if (json) headers.set('Content-Type', 'application/json')
  if (props.token) headers.set('Authorization', `Bearer ${props.token}`)
  return headers
}

function extractList(payload: any): any[] {
  const data = payload?.data ?? payload
  if (Array.isArray(data)) return data
  return data?.list || data?.items || data?.rows || []
}

async function requestJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, { credentials: 'include', ...options })
  const payload = await response.json().catch(() => null)
  if (!response.ok || (payload?.code !== undefined && payload.code !== 0 && payload.code !== 200)) {
    const requestError = new Error(payload?.message || `请求失败 (${response.status})`) as Error & { status?: number }
    requestError.status = response.status
    throw requestError
  }
  return payload
}

const resourceStorageKeys: Record<ResourceName, string> = {
  categories: 'lxg-admin-product-categories-draft',
  brands: 'lxg-admin-product-brands-draft',
  specifications: 'lxg-admin-product-specifications-draft',
}

function readDraft<T>(resource: ResourceName): T[] | null {
  const raw = localStorage.getItem(resourceStorageKeys[resource])
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function saveDraft(resource: ResourceName) {
  const values = { categories: categories.value, brands: brands.value, specifications: specifications.value }[resource]
  localStorage.setItem(resourceStorageKeys[resource], JSON.stringify(values))
}

function localId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function seedResourcesFromProducts() {
  if (!localStorage.getItem(resourceStorageKeys.categories) && !categories.value.length && products.value.length) {
    const categoryMap = new Map<string, CategoryItem>()
    products.value.forEach((product) => {
      if (!product.firstCategory || product.firstCategory === '-') return
      if (!categoryMap.has(product.firstCategory)) categoryMap.set(product.firstCategory, { id: localId('category'), name: product.firstCategory, productCount: 0, children: [] })
      const category = categoryMap.get(product.firstCategory)!
      category.productCount += 1
      if (product.secondCategory && product.secondCategory !== '-') {
        let child = category.children.find(item => item.name === product.secondCategory)
        if (!child) {
          child = { id: localId('subcategory'), name: product.secondCategory, productCount: 0, children: [] }
          category.children.push(child)
        }
        child.productCount += 1
      }
    })
    categories.value = [...categoryMap.values()]
    saveDraft('categories')
  }
  if (!localStorage.getItem(resourceStorageKeys.brands) && !brands.value.length && products.value.length) {
    const brandMap = new Map<string, BrandItem>()
    products.value.forEach((product) => {
      if (!product.brand || product.brand === '-') return
      const item = brandMap.get(product.brand) || { id: localId('brand'), name: product.brand, productCount: 0, logo: '' }
      item.productCount += 1
      brandMap.set(product.brand, item)
    })
    brands.value = [...brandMap.values()]
    saveDraft('brands')
  }
}

async function loadProducts() {
  loading.value = true
  error.value = ''
  const params = new URLSearchParams({ page: String(page.value), size: String(size.value) })
  if (keyword.value.trim()) params.set('key_word', keyword.value.trim())
  if (categoryId.value !== '') params.set('category_id', String(categoryId.value))
  if (subcategory.value !== '') params.set('subcategory', String(subcategory.value))
  if (status.value !== '') params.set('status', String(status.value))
  try {
    const payload = await requestJson(`/api/v1/admin/product/list?${params}`, { headers: authHeaders() })
    const data = payload?.data ?? payload
    products.value = extractList(payload).map(normalizeProduct)
    selectedIds.value = selectedIds.value.filter(id => products.value.some(product => product.id === id))
    total.value = Number(data?.total ?? data?.total_count ?? products.value.length)
    seedResourcesFromProducts()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '商品列表加载失败'
  } finally {
    loading.value = false
  }
}

async function loadCategories() {
  resourceLoading.categories = true
  resourceErrors.categories = ''
  try {
    const payload = await requestJson('/api/v1/get/categorytree', { headers: authHeaders() })
    const data = payload?.data ?? payload
    const normalizeCategory = (item: any): CategoryItem => ({
      id: item.id ?? item.ID,
      name: item.name || '-',
      productCount: item.product_count || item.productCount || 0,
      children: Array.isArray(item.children)
        ? item.children.map((child: any) => normalizeCategory(child))
        : [],
    })
    categories.value = Array.isArray(data) ? data.map(normalizeCategory) : []
  } catch (cause) {
    categories.value = []
    resourceErrors.categories = cause instanceof Error ? cause.message : '分类列表加载失败'
  } finally {
    resourceLoading.categories = false
  }
}

async function loadBrands() {
  resourceLoading.brands = true
  resourceErrors.brands = ''
  try {
    const payload = await requestJson('/api/v1/get/brandtree', { headers: authHeaders() })
    const data = payload?.data ?? payload
    brands.value = Array.isArray(data) ? data.map((row: any) => ({
      id: row.id ?? row.ID,
      name: row.name || '-',
      productCount: row.product_count || row.productCount || 0,
      logo: row.logo || '',
    })) : []
  } catch (cause) {
    brands.value = []
    resourceErrors.brands = cause instanceof Error ? cause.message : '品牌列表加载失败'
  } finally {
    resourceLoading.brands = false
  }
}

async function loadSpecifications() {
  resourceLoading.specifications = true
  resourceErrors.specifications = ''
  try {
    const payload = await requestJson('/api/v1/admin/specification/list', { headers: authHeaders() })
    specifications.value = extractList(payload).map((row: any) => ({
      id: row.id ?? row.ID,
      name: row.name || '-',
      values: Array.isArray(row.values)
        ? row.values.map((item: any) => typeof item === 'string' ? item : item.value).filter(Boolean)
        : typeof row.values === 'string'
          ? row.values.split(/[,，、\n]/).map((v: string) => v.trim()).filter(Boolean)
          : [],
    }))
    const availableNames = new Set(specifications.value.map(spec => spec.name))
    Object.keys(createForm.selectedSpecs).forEach((name) => {
      const spec = specifications.value.find(item => item.name === name)
      if (!availableNames.has(name) || !spec) delete createForm.selectedSpecs[name]
      else createForm.selectedSpecs[name] = createForm.selectedSpecs[name].filter(value => spec.values.includes(value))
    })
  } catch (cause) {
    specifications.value = []
    resourceErrors.specifications = cause instanceof Error ? cause.message : '规格列表加载失败'
  } finally {
    resourceLoading.specifications = false
  }
}

function loadResources() {
  void loadCategories()
  void loadBrands()
  void loadSpecifications()
  void loadProductResourceCounts()
}

function toggleAll(checked: boolean) {
  selectedIds.value = checked ? products.value.map(({ id }) => id) : []
}

function toggleProduct(id: number | string, checked: boolean) {
  selectedIds.value = checked ? [...new Set([...selectedIds.value, id])] : selectedIds.value.filter(selectedId => selectedId !== id)
}

async function batchAction(action: 'on_sale' | 'off_sale' | 'delete') {
  if (!selectedIds.value.length) return notify('请先选择要操作的商品', 'error')
  const labels = { on_sale: '上架', off_sale: '下架', delete: '删除' }
  if (action === 'delete' && !window.confirm(`确定删除选中的 ${selectedIds.value.length} 件商品吗？此操作不可恢复。`)) return
  batchLoading.value = true
  batchError.value = ''
  try {
    if (action === 'delete') {
      await requestJson('/api/v1/admin/batch/product', {
        method: 'POST', headers: authHeaders(true), body: JSON.stringify({ ids: selectedIds.value.map(Number), action: 2 }),
      })
    } else {
      for (const id of selectedIds.value) {
        await requestJson('/api/v1/admin/enable/product', {
          method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(id) })
        })
      }
    }
    notify(`已${labels[action]} ${selectedIds.value.length} 件商品`)
    selectedIds.value = []
    await loadProducts()
    await loadProductResourceCounts()
  } catch (cause) {
    batchError.value = cause instanceof Error ? cause.message : `批量${labels[action]}失败`
    notify(batchError.value, 'error')
  } finally {
    batchLoading.value = false
  }
}

async function toggleProductStatus(product: Product) {
  const newStatus = product.status === 1 ? 0 : 1
  const label = newStatus === 1 ? '上架' : '下架'
  if (!window.confirm(`确定${label}商品“${product.name}”吗？`)) return
  deletingId.value = product.id
  error.value = ''
  try {
    await requestJson('/api/v1/admin/enable/product', {
      method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(product.id) })
    })
    notify(`商品“${product.name}”已${label}`)
    await loadProducts()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : `${label}商品失败`
    notify(error.value, 'error')
  } finally {
    deletingId.value = null
  }
}

async function deleteProduct(product: Product) {
  if (!window.confirm(`确定删除商品“${product.name}”吗？此操作不可恢复。`)) return
  deletingId.value = product.id
  error.value = ''
  try {
    await requestJson('/api/v1/admin/delete/product', { method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(product.id) }) })
    selectedIds.value = selectedIds.value.filter(id => id !== product.id)
    notify(`商品“${product.name}”已删除`)
    await loadProducts()
    await loadProductResourceCounts()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : '删除商品失败'
    notify(error.value, 'error')
  } finally {
    deletingId.value = null
  }
}

async function viewProductDetail(product: Product) {
  detailLoading.value = true
  detailError.value = ''
  try {
    const payload = await requestJson(`/api/v1/admin/product/detail?id=${product.id}`, { headers: authHeaders() })
    detailData.value = payload?.data ?? payload
    detailOpen.value = true
  } catch (cause) {
    detailError.value = cause instanceof Error ? cause.message : '获取商品详情失败'
    notify(detailError.value, 'error')
  } finally {
    detailLoading.value = false
  }
}

function closeProductDetail() {
  detailOpen.value = false
  detailData.value = null
  detailError.value = ''
}

function toggleCategory(id: number | string) {
  expandedCategories.value = expandedCategories.value.includes(id)
    ? expandedCategories.value.filter(item => item !== id)
    : [...expandedCategories.value, id]
}

function openEditor(kind: ResourceKind, item?: CategoryItem | BrandItem | SpecificationItem, parentId: number | string = '') {
  editorKind.value = kind
  editorId.value = item?.id ?? null
  editorForm.name = item?.name || ''
  editorForm.parentId = parentId
  editorForm.valuesText = kind === 'specification' && item ? (item as SpecificationItem).values.join('、') : ''
  editorForm.newValuesText = ''
  editorForm.logo = kind === 'brand' && item ? (item as BrandItem).logo : ''
  editorError.value = ''
  editorOpen.value = true
}

function closeEditor() {
  if (editorLoading.value) return
  editorOpen.value = false
}

async function saveResource() {
  const name = editorForm.name.trim()
  if (!name) return
  editorLoading.value = true
  editorError.value = ''
  try {
    if (editorKind.value === 'category' || editorKind.value === 'subcategory') {
      if (editorId.value !== null) {
        await requestJson('/api/v1/admin/update/category', {
          method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(editorId.value), name })
        })
      } else {
        const parentId = editorKind.value === 'category' ? 0 : Number(editorForm.parentId)
        await requestJson('/api/v1/admin/create/category', {
          method: 'POST', headers: authHeaders(true), body: JSON.stringify({ name, parent_id: parentId })
        })
      }
      await loadCategories()
    } else if (editorKind.value === 'brand') {
      if (editorId.value !== null) {
        const updateBody: Record<string, number | string> = { id: Number(editorId.value), name }
        if (editorForm.logo.trim()) updateBody.logo = editorForm.logo.trim()
        await requestJson('/api/v1/admin/update/brand', {
          method: 'POST', headers: authHeaders(true), body: JSON.stringify(updateBody)
        })
      } else {
        const createBody: Record<string, string> = { name }
        if (editorForm.logo.trim()) createBody.logo = editorForm.logo.trim()
        await requestJson('/api/v1/admin/create/brand', {
          method: 'POST', headers: authHeaders(true), body: JSON.stringify(createBody)
        })
      }
      await loadBrands()
    } else {
      const newValues = editorForm.newValuesText.split(/[、,，\n]/).map(value => value.trim()).filter(Boolean)
      if (editorId.value !== null) {
        const existingValues = editorForm.valuesText.split(/[、,，\n]/).map(value => value.trim()).filter(Boolean)
        const allValues = [...new Set([...existingValues, ...newValues])]
        await requestJson('/api/v1/admin/update/specification', {
          method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(editorId.value), value: allValues.join('， ') })
        })
      } else {
        await requestJson('/api/v1/admin/add/specification', {
          method: 'POST', headers: authHeaders(true), body: JSON.stringify({ name, value: newValues.join(', ') })
        })
      }
      await loadSpecifications()
    }
    notify(`${editorTitle.value}成功`)
    editorOpen.value = false
  } catch (cause) {
    editorError.value = cause instanceof Error ? cause.message : `${editorTitle.value}失败`
  } finally {
    editorLoading.value = false
  }
}

async function deleteResource(resource: ResourceName, item: CategoryItem | BrandItem | SpecificationItem) {
  const labels: Record<ResourceName, string> = { categories: '分类', brands: '品牌', specifications: '规格' }
  if (!window.confirm(`确定删除${labels[resource]}“${item.name}”吗？`)) return
  try {
    if (resource === 'categories') {
      await requestJson('/api/v1/admin/delete/category', {
        method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(item.id) })
      })
      await loadCategories()
    } else if (resource === 'brands') {
      await requestJson('/api/v1/admin/delete/brand', {
        method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(item.id) })
      })
      await loadBrands()
    } else {
      await requestJson('/api/v1/admin/delete/specification', {
        method: 'POST', headers: authHeaders(true), body: JSON.stringify({ id: Number(item.id) })
      })
      await loadSpecifications()
    }
    notify(`${labels[resource]}“${item.name}”已删除`)
  } catch (cause) {
    notify(cause instanceof Error ? cause.message : `删除${labels[resource]}失败`, 'error')
  }
}

function resetCreateForm() {
  Object.assign(createForm, {
    name: '', description: '', brandId: '', firstCategoryName: '', categoryId: '',
    originalPrice: '', status: 0, selectedSpecs: {}, skus: [],
  })
  createImages.value = []
  specifications.value.forEach((spec) => { createForm.selectedSpecs[spec.name] = [] })
  createStep.value = 1
  createError.value = ''
}

function openCreateProduct() {
  resetCreateForm()
  createOpen.value = true
  if (!categories.value.length && !resourceLoading.categories) void loadCategories()
  if (!brands.value.length && !resourceLoading.brands) void loadBrands()
}

function closeCreateProduct() {
  if (createLoading.value || imageUploading.value) return
  createOpen.value = false
}

function uploadImageUrl(payload: any): string {
  const data = payload?.data ?? payload
  if (typeof data === 'string') return data
  return data?.url || data?.imageUrl || data?.image_url || data?.fileUrl || data?.file_url || data?.path || ''
}

async function uploadProductImages(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  if (!files.length) return
  if (files.some(file => !file.type.startsWith('image/'))) {
    createError.value = '请选择图片文件'
    return
  }

  imageUploading.value = true
  createError.value = ''
  try {
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      const payload = await requestJson('/api/v1/user/upload', {
        method: 'POST', headers: authHeaders(), body: formData,
      })
      const url = uploadImageUrl(payload)
      if (!url) throw new Error('上传成功，但接口未返回图片地址')
      createImages.value.push(url)
    }
    notify('商品图片上传成功')
  } catch (cause) {
    createError.value = cause instanceof Error ? cause.message : '商品图片上传失败'
    notify(createError.value, 'error')
  } finally {
    imageUploading.value = false
  }
}

function removeProductImage(index: number) {
  createImages.value.splice(index, 1)
}

async function uploadBrandLogo(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (!file.type.startsWith('image/')) {
    editorError.value = '请选择图片文件'
    return
  }
  brandLogoUploading.value = true
  editorError.value = ''
  try {
    const formData = new FormData()
    formData.append('file', file)
    const payload = await requestJson('/api/v1/user/upload', {
      method: 'POST', headers: authHeaders(), body: formData,
    })
    const url = uploadImageUrl(payload)
    if (!url) throw new Error('上传成功，但接口未返回图片地址')
    editorForm.logo = url
    notify('品牌Logo上传成功')
  } catch (cause) {
    editorError.value = cause instanceof Error ? cause.message : '品牌Logo上传失败'
    notify(editorError.value, 'error')
  } finally {
    brandLogoUploading.value = false
  }
}

function selectCreateCategory() {
  createForm.categoryId = ''
}

function generateCreateSkus() {
  const entries = createSpecs.value
  let combinations: Array<Record<string, string>> = [{}]
  entries.forEach((spec) => {
    combinations = combinations.flatMap(current => spec.values.map(value => ({ ...current, [spec.name]: value })))
  })
  createForm.skus = combinations.map((specValues, index) => ({
    specValues,
    skuCode: `SKU-${Date.now()}-${String(index + 1).padStart(2, '0')}`,
    price: String(createForm.originalPrice || 0),
    stock: 0,
    image: '',
  }))
}

function nextCreateStep() {
  createError.value = ''
  if (createStep.value === 1) {
    if (!createForm.name.trim()) return void (createError.value = '请输入商品名称')
    if (!createForm.brandId) return void (createError.value = '请选择商品品牌')
    if (!createForm.firstCategoryName) return void (createError.value = '请选择一级分类')
    if (!createForm.categoryId) return void (createError.value = '请选择二级分类')
    if (!createForm.originalPrice || Number(createForm.originalPrice) <= 0) return void (createError.value = '请输入正确的商品原价')
  }
  if (createStep.value === 2) generateCreateSkus()
  createStep.value += 1
}

function previousCreateStep() {
  createError.value = ''
  createStep.value = Math.max(1, createStep.value - 1)
}

async function createProduct() {
  if (!createForm.skus.length) generateCreateSkus()
  if (createForm.skus.some(sku => Number(sku.price) <= 0 || Number(sku.stock) < 0)) {
    createError.value = '请完整填写 SKU 售价和库存'
    return
  }
  const categoryIdValue = Number(createForm.categoryId) || 0
  const brandIdValue = Number(createForm.brandId) || 0
  const specs = createSpecs.value.map(spec => ({ id: spec.id, name: spec.name, values: spec.values }))
  const skus = createForm.skus.map(sku => ({
    spec_values: Object.entries(sku.specValues).map(([key, value]) => ({ key, value })),
    price: Number(sku.price),
    stock: Number(sku.stock),
    image: sku.image.trim(),
  }))
  const body = {
    name: createForm.name.trim(),
    description: createForm.description.trim(),
    brand_id: brandIdValue,
    category_id: categoryIdValue,
    original_price: Number(createForm.originalPrice) || 0,
    status: Number(createForm.status),
    images: [...createImages.value],
    specs,
    skus,
  }
  createLoading.value = true
  createError.value = ''
  try {
    await requestJson('/api/v1/admin/add/product', {
      method: 'POST', headers: authHeaders(true), body: JSON.stringify(body),
    })
    notify(`商品“${createForm.name.trim()}”创建成功`)
    createOpen.value = false
    page.value = 1
    await loadProducts()
    await loadProductResourceCounts()
  } catch (cause) {
    createError.value = cause instanceof Error ? cause.message : '新增商品失败'
    notify(createError.value, 'error')
  } finally {
    createLoading.value = false
  }
}

function search() {
  page.value = 1
  void loadProducts()
}

watch([page, size], () => void loadProducts())
watch(categoryId, () => {
  if (!searchSubcategories.value.some(item => String(item.id) === String(subcategory.value))) subcategory.value = ''
})
onMounted(() => {
  ;(window as unknown as { openProductCreate?: () => void }).openProductCreate = openCreateProduct
  void loadProducts()
  loadResources()
})
onUnmounted(() => {
  delete (window as unknown as { openProductCreate?: () => void }).openProductCreate
})
</script>

<template>
  <div class="product-page">
    <div class="product-toolbar">
      <div>
        <h1>商品管理</h1>
        <p>管理商品信息、分类和上下架状态</p>
      </div>
      <div class="product-toolbar-controls">
        <div class="product-filters">
          <input v-model="keyword" placeholder="搜索商品名称" @keyup.enter="search" />
          <select v-model="categoryId">
            <option value="">全部一级分类</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}（ID: {{ category.id }}）</option>
          </select>
          <select v-model="subcategory" :disabled="!categoryId">
            <option value="">{{ categoryId ? '全部二级分类' : '请先选择一级分类' }}</option>
            <option v-for="child in searchSubcategories" :key="child.id" :value="child.id">{{ child.name }}（ID: {{ child.id }}）</option>
          </select>
          <select v-model="status" @change="search">
            <option value="">全部状态</option>
            <option :value="1">上架</option>
            <option :value="0">下架</option>
          </select>
          <button class="btn btn-primary" @click="search"><i class="fas fa-search"></i> 查询</button>
        </div>
        <button class="btn btn-primary product-create-button" @click="openCreateProduct"><i class="fas fa-plus"></i> 新增商品</button>
      </div>
    </div>
    <div v-if="error" class="product-error">
      {{ error }}
      <button class="btn btn-sm btn-outline" @click="loadProducts">重试</button>
    </div>
    <div class="product-batch-bar">
      <label class="product-select-all">
        <input type="checkbox" :checked="allVisibleSelected" :disabled="!products.length || batchLoading" @change="toggleAll(($event.target as HTMLInputElement).checked)" />
        全选当前页
      </label>
      <span class="product-selected-count">已选择 {{ selectedIds.length }} 件</span>
      <div class="product-batch-actions">
        <button class="btn btn-sm btn-outline" :disabled="!selectedIds.length || batchLoading" @click="batchAction('on_sale')"><i class="fas fa-arrow-up"></i> 批量上架</button>
        <button class="btn btn-sm btn-outline" :disabled="!selectedIds.length || batchLoading" @click="batchAction('off_sale')"><i class="fas fa-arrow-down"></i> 批量下架</button>
        <button class="btn btn-sm btn-danger" :disabled="!selectedIds.length || batchLoading" @click="batchAction('delete')"><i class="fas fa-trash"></i> 批量删除</button>
      </div>
    </div>
    <div v-if="batchError" class="product-error">{{ batchError }}</div>
    <div class="card product-card">
      <div v-if="loading" class="product-state">正在加载商品...</div>
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="product-check-col"><input type="checkbox" :checked="allVisibleSelected" :disabled="!products.length || batchLoading" aria-label="全选当前页" @change="toggleAll(($event.target as HTMLInputElement).checked)" /></th>
              <th>编号</th>
              <th>商品</th>
              <th>一级分类</th>
              <th>二级分类</th>
              <th>品牌</th>
              <th>原价</th>
              <th>SKU</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" :class="{ 'is-selected': selectedIds.includes(product.id) }">
              <td class="product-check-col"><input type="checkbox" :checked="selectedIds.includes(product.id)" :aria-label="`选择商品 ${product.name}`" @change="toggleProduct(product.id, ($event.target as HTMLInputElement).checked)" /></td>
              <td>{{ product.id }}</td>
              <td>
                <div class="product-name">
                  <img v-if="product.image" :src="product.image" alt="" />
                  <span v-else class="product-image-empty"><i class="fas fa-image"></i></span>
                  <span :title="product.name">{{ product.name }}</span>
                </div>
              </td>
              <td>{{ product.firstCategory }}</td>
              <td>{{ product.secondCategory }}</td>
              <td>{{ product.brand }}</td>
              <td>¥{{ product.originalPrice }}</td>
              <td>{{ product.skuCount }}</td>
              <td>
                <button class="btn btn-sm" :class="product.status === 1 ? 'btn-danger' : 'btn-success'" :disabled="deletingId === product.id" @click="toggleProductStatus(product)">
                  <i :class="deletingId === product.id ? 'fas fa-spinner fa-spin' : product.status === 1 ? 'fas fa-arrow-down' : 'fas fa-arrow-up'"></i>
                  <span>{{ deletingId === product.id ? '处理中' : product.status === 1 ? '下架' : '上架' }}</span>
                </button>
              </td>
              <td>{{ product.createdAt }}</td>
              <td>
                <button class="btn btn-sm btn-outline" :title="`查看 ${product.name}`" @click="viewProductDetail(product)"><i class="fas fa-eye"></i><span>查看</span></button>
                <button class="btn btn-sm btn-danger product-delete-btn" :disabled="deletingId === product.id" :title="`删除 ${product.name}`" @click="deleteProduct(product)">
                  <i :class="deletingId === product.id ? 'fas fa-spinner fa-spin' : 'fas fa-trash'"></i>
                  <span>{{ deletingId === product.id ? '删除中' : '删除' }}</span>
                </button>
              </td>
            </tr>
            <tr v-if="!products.length"><td colspan="11" class="product-state">暂无商品数据</td></tr>
          </tbody>
        </table>
      </div>
      <div class="product-pagination">
        <span>共 {{ total }} 条</span>
        <button class="btn btn-sm btn-outline" :disabled="page <= 1" @click="page--">上一页</button>
        <span>第 {{ page }} 页</span>
        <button class="btn btn-sm btn-outline" :disabled="page * size >= total" @click="page++">下一页</button>
      </div>
    </div>

    <section class="product-resource-grid" aria-label="商品基础数据管理">
      <article class="card product-resource-card">
        <header>
          <h2><i class="fas fa-sitemap"></i> 商品分类管理</h2>
          <button class="btn btn-sm btn-primary" @click="openEditor('category')"><i class="fas fa-plus"></i> 新增分类</button>
        </header>
        <div v-if="resourceLoading.categories" class="resource-state">正在加载分类...</div>
        <div v-else-if="resourceErrors.categories" class="resource-state is-error">
          {{ resourceErrors.categories }}
          <button class="icon-btn" title="重新加载" @click="loadCategories"><i class="fas fa-redo"></i></button>
        </div>
        <div v-else-if="!categories.length" class="resource-state">暂无分类</div>
        <div v-else class="category-list">
          <div v-for="category in categories" :key="category.id" class="category-group">
            <div class="category-row">
              <button class="category-toggle" :title="expandedCategories.includes(category.id) ? '收起子分类' : '展开子分类'" @click="toggleCategory(category.id)">
                <i class="fas fa-grip-vertical"></i>
                <i :class="expandedCategories.includes(category.id) ? 'fas fa-chevron-down' : 'fas fa-chevron-right'"></i>
              </button>
              <span class="resource-tag">{{ category.name }}</span>
              <span class="resource-count">({{ resourceCount(category, 'category') }}件)</span>
              <div class="resource-actions">
                <button class="icon-btn primary" title="新增子分类" @click="openEditor('subcategory', undefined, category.id)"><i class="fas fa-plus"></i></button>
                <button class="icon-btn" title="编辑分类" @click="openEditor('category', category)"><i class="fas fa-edit"></i></button>
                <button class="icon-btn danger" title="删除分类" @click="deleteResource('categories', category)"><i class="fas fa-trash"></i></button>
              </div>
            </div>
            <div v-if="expandedCategories.includes(category.id)" class="subcategory-list">
              <div v-for="child in category.children" :key="child.id" class="subcategory-row">
                <span>{{ child.name }}</span>
                <span class="resource-count">({{ resourceCount(child, 'subcategory') }}件)</span>
                <div class="resource-actions">
                  <button class="icon-btn" title="编辑子分类" @click="openEditor('subcategory', child, category.id)"><i class="fas fa-edit"></i></button>
                  <button class="icon-btn danger" title="删除子分类" @click="deleteResource('categories', child)"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <div v-if="!category.children.length" class="subcategory-empty">暂无子分类</div>
            </div>
          </div>
        </div>
      </article>

      <article class="card product-resource-card">
        <header>
          <h2><i class="fas fa-copyright"></i> 商品品牌管理</h2>
          <button class="btn btn-sm btn-primary" @click="openEditor('brand')"><i class="fas fa-plus"></i> 新增品牌</button>
        </header>
        <div v-if="resourceLoading.brands" class="resource-state">正在加载品牌...</div>
        <div v-else-if="resourceErrors.brands" class="resource-state is-error">
          {{ resourceErrors.brands }}
          <button class="icon-btn" title="重新加载" @click="loadBrands"><i class="fas fa-redo"></i></button>
        </div>
        <div v-else-if="!brands.length" class="resource-state">暂无品牌</div>
        <div v-else class="brand-grid">
          <div v-for="brand in brands" :key="brand.id" class="brand-item">
            <span class="resource-tag">{{ brand.name }}</span>
            <span class="resource-count">({{ resourceCount(brand, 'brand') }}件)</span>
            <div class="resource-actions">
              <button class="icon-btn" title="编辑品牌" @click="openEditor('brand', brand)"><i class="fas fa-edit"></i></button>
              <button class="icon-btn danger" title="删除品牌" @click="deleteResource('brands', brand)"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </article>

      <article class="card product-resource-card">
        <header>
          <h2><i class="fas fa-cog"></i> 规格管理</h2>
          <button class="btn btn-sm btn-primary" @click="openEditor('specification')"><i class="fas fa-plus"></i> 新增规格</button>
        </header>
        <div v-if="resourceLoading.specifications" class="resource-state">正在加载规格...</div>
        <div v-else-if="resourceErrors.specifications" class="resource-state is-error">
          {{ resourceErrors.specifications }}
          <button class="icon-btn" title="重新加载" @click="loadSpecifications"><i class="fas fa-redo"></i></button>
        </div>
        <div v-else-if="!specifications.length" class="resource-state">暂无规格</div>
        <div v-else class="spec-list">
          <div v-for="spec in specifications" :key="spec.id" class="spec-row">
            <span class="resource-tag neutral">{{ spec.name }}</span>
            <span class="spec-values">- {{ spec.values.join('、') || '暂无规格值' }}</span>
            <div class="resource-actions">
              <button class="icon-btn" title="编辑规格" @click="openEditor('specification', spec)"><i class="fas fa-edit"></i></button>
              <button class="icon-btn danger" title="删除规格" @click="deleteResource('specifications', spec)"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </article>
    </section>

    <div v-if="createOpen" class="modal-overlay" @click.self="closeCreateProduct">
      <div class="modal-content product-create-modal">
        <div class="modal-header">
          <h3><i class="fas fa-plus"></i> 新增商品</h3>
          <button class="modal-close" title="关闭" @click="closeCreateProduct"><i class="fas fa-times"></i></button>
        </div>
        <div class="product-create-steps" aria-label="新增商品步骤">
          <div v-for="(label, index) in ['基础信息', '规格设置', 'SKU 配置']" :key="label" class="product-create-step" :class="{ active: createStep === index + 1, done: createStep > index + 1 }">
            <span>{{ index + 1 }}</span>
            <strong>{{ label }}</strong>
          </div>
        </div>
        <form class="product-create-form" @submit.prevent="createProduct">
          <div v-if="createStep === 1" class="product-create-grid">
            <label>
              <span>商品名称 <b>*</b></span>
              <input v-model="createForm.name" required maxlength="150" placeholder="请输入商品名称" />
            </label>
            <label>
              <span>品牌 <b>*</b></span>
              <select v-model.number="createForm.brandId" required :disabled="resourceLoading.brands">
                <option value="">{{ resourceLoading.brands ? '品牌加载中...' : '请选择品牌' }}</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
              </select>
            </label>
            <label>
              <span>一级分类 <b>*</b></span>
              <select v-model="createForm.firstCategoryName" required :disabled="resourceLoading.categories" @change="selectCreateCategory">
                <option value="">{{ resourceLoading.categories ? '分类加载中...' : '请选择一级分类' }}</option>
                <option v-for="category in categories" :key="category.id" :value="String(category.id)">{{ category.name }}</option>
              </select>
            </label>
            <label>
              <span>二级分类 <b>*</b></span>
              <select v-model.number="createForm.categoryId" required :disabled="!selectedCreateCategory">
                <option value="">请选择二级分类</option>
                <option v-for="child in selectedCreateCategory?.children || []" :key="child.id" :value="child.id">{{ child.name }}</option>
              </select>
            </label>
            <label>
              <span>商品原价 <b>*</b></span>
              <input v-model.number="createForm.originalPrice" type="number" min="0.01" step="0.01" required placeholder="0.00" />
            </label>
            <label>
              <span>初始状态 <b>*</b></span>
              <select v-model.number="createForm.status" required>
                <option :value="0">下架</option>
                <option :value="1">上架</option>
              </select>
            </label>
            <div class="full product-image-upload">
              <span>商品图片</span>
              <label class="product-image-picker" :class="{ disabled: imageUploading }">
                <input type="file" accept="image/*" multiple :disabled="imageUploading" @change="uploadProductImages" />
                <i :class="imageUploading ? 'fas fa-spinner fa-spin' : 'fas fa-cloud-upload-alt'"></i>
                <strong>{{ imageUploading ? '图片上传中...' : '选择图片上传' }}</strong>
                <small>支持一次选择多张图片</small>
              </label>
              <div v-if="createImages.length" class="product-image-previews">
                <div v-for="(url, index) in createImages" :key="`${url}-${index}`" class="product-image-preview">
                  <img :src="url" :alt="`商品图片 ${index + 1}`" />
                  <button type="button" title="移除图片" :disabled="imageUploading" @click="removeProductImage(index)"><i class="fas fa-times"></i></button>
                </div>
              </div>
            </div>
            <label class="full">
              <span>商品描述</span>
              <textarea v-model="createForm.description" rows="4" maxlength="2000" placeholder="请输入商品描述"></textarea>
            </label>
          </div>
          <div v-else-if="createStep === 2" class="product-spec-selector">
            <div v-if="!specifications.length" class="resource-state">暂无可用规格，可直接进入下一步创建默认 SKU</div>
            <section v-for="spec in specifications" :key="spec.id" class="product-spec-option">
              <h4>{{ spec.name }}</h4>
              <div>
                <label v-for="(value, index) in spec.values" :key="`${spec.id}-${index}`">
                  <input v-model="createForm.selectedSpecs[spec.name]" type="checkbox" :value="value" /> <span>{{ value }}</span>
                </label>
              </div>
            </section>
          </div>
          <div v-else class="product-sku-editor">
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>规格组合</th>
                    <th>售价</th>
                    <th>库存</th>
                    <th>图片 URL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sku, index) in createForm.skus" :key="index">
                    <td>
                      <span v-if="Object.keys(sku.specValues).length" class="sku-spec-text">{{ Object.entries(sku.specValues).map(([name, value]) => `${name}: ${value}`).join(' / ') }}</span>
                      <span v-else class="sku-spec-text">默认规格</span>
                    </td>
                    <td><input v-model="sku.price" type="number" min="0.01" step="0.01" required /></td>
                    <td><input v-model.number="sku.stock" type="number" min="0" step="1" required /></td>
                    <td><input v-model="sku.image" placeholder="可选" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="createError" class="product-error product-create-error">{{ createError }}</div>
          <div class="product-create-actions">
            <button v-if="createStep > 1" type="button" class="btn btn-outline" :disabled="createLoading || imageUploading" @click="previousCreateStep"><i class="fas fa-arrow-left"></i> 上一步</button>
            <button type="button" class="btn btn-outline" :disabled="createLoading || imageUploading" @click="closeCreateProduct">取消</button>
            <button v-if="createStep < 3" type="button" class="btn btn-primary" :disabled="imageUploading" @click="nextCreateStep">下一步 <i class="fas fa-arrow-right"></i></button>
            <button v-else type="submit" class="btn btn-primary" :disabled="createLoading || imageUploading"><i :class="createLoading ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i> {{ createLoading ? '创建中...' : '创建商品' }}</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="editorOpen" class="modal-overlay" @click.self="closeEditor">
      <div class="modal-content product-resource-modal">
        <div class="modal-header">
          <h3>{{ editorTitle }}</h3>
          <button class="modal-close" title="关闭" @click="closeEditor"><i class="fas fa-times"></i></button>
        </div>
        <form class="resource-editor-form" @submit.prevent="saveResource">
          <label>
            <span>{{ editorKind === 'specification' ? '规格名称' : editorKind === 'brand' ? '品牌名称' : '分类名称' }}</span>
            <input v-model="editorForm.name" required maxlength="100" :placeholder="`请输入${editorKind === 'specification' ? '规格' : editorKind === 'brand' ? '品牌' : '分类'}名称`" />
          </label>
          <label v-if="editorKind === 'brand'">
            <span>品牌 Logo（可选）</span>
            <input v-model="editorForm.logo" placeholder="请输入品牌Logo图片URL" />
            <label class="brand-logo-upload" :class="{ disabled: brandLogoUploading }">
              <input type="file" accept="image/*" :disabled="brandLogoUploading" @change="uploadBrandLogo" />
              <i :class="brandLogoUploading ? 'fas fa-spinner fa-spin' : 'fas fa-cloud-upload-alt'"></i>
              <span>{{ brandLogoUploading ? '上传中...' : '上传图片' }}</span>
            </label>
            <img v-if="editorForm.logo" :src="editorForm.logo" class="brand-logo-preview" alt="品牌Logo" />
          </label>
          <label v-if="editorKind === 'specification'">
            <span>已有规格值（只读）</span>
            <div v-if="editorId !== null && editorForm.valuesText" class="spec-existing-values">{{ editorForm.valuesText }}</div>
            <div v-else class="spec-existing-values">暂无规格值</div>
          </label>
          <label v-if="editorKind === 'specification'">
            <span>新增规格值</span>
            <textarea v-model="editorForm.newValuesText" rows="2" placeholder="输入要新增的规格值，使用逗号或顿号分隔"></textarea>
            <small>新值将追加到已有规格值中</small>
          </label>
          <div v-if="editorError" class="product-error">{{ editorError }}</div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" :disabled="editorLoading" @click="closeEditor">取消</button>
            <button type="submit" class="btn btn-primary" :disabled="editorLoading || !editorForm.name.trim()"><i :class="editorLoading ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i> {{ editorLoading ? '保存中...' : '保存' }}</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="detailOpen" class="modal-overlay" @click.self="closeProductDetail">
      <div class="modal-content product-detail-modal">
        <div class="modal-header product-detail-header">
          <div>
            <h3><i class="fas fa-box-open"></i> 商品详情</h3>
            <small v-if="detailData">商品 ID：{{ detailData.id }}</small>
          </div>
          <button class="modal-close" title="关闭" @click="closeProductDetail"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body product-detail-body">
          <div v-if="detailLoading" class="product-state product-detail-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>正在加载商品详情...</span>
          </div>
          <div v-else-if="detailError" class="product-error">{{ detailError }}</div>
          <div v-else-if="detailData" class="product-detail-content">
            <section class="product-detail-summary">
              <div class="product-detail-icon"><i class="fas fa-box"></i></div>
              <div class="product-detail-main">
                <div class="product-detail-name-row">
                  <h4>{{ detailData.name }}</h4>
                  <span class="status-badge" :class="detailData.status === 1 ? 'green' : 'gray'"><span class="dot"></span>{{ detailData.status === 1 ? '已上架' : '已下架' }}</span>
                </div>
                <div class="product-detail-meta">
                  <span><i class="fas fa-layer-group"></i> {{ detailData.first_category_name || '未分类' }} / {{ detailData.second_category_name || '未分类' }}</span>
                  <span><i class="fas fa-copyright"></i> {{ detailData.brand_name || '无品牌' }}</span>
                </div>
              </div>
              <div class="product-detail-price">
                <small>SKU 售价区间</small>
                <strong>{{ detailPriceRange }}</strong>
                <span>原价 ¥{{ detailData.original_price }}</span>
              </div>
            </section>
            <div class="product-detail-metrics">
              <div><span><i class="fas fa-barcode"></i> SKU 数量</span><strong>{{ detailData.sku_count }}</strong></div>
              <div><span><i class="fas fa-boxes"></i> 总库存</span><strong :class="{ danger: detailTotalStock <= 0 }">{{ detailTotalStock.toLocaleString() }}</strong></div>
              <div><span><i class="fas fa-eye"></i> 浏览量</span><strong>{{ detailData.views.toLocaleString() }}</strong></div>
              <div><span><i class="fas fa-shopping-bag"></i> 成交订单</span><strong>{{ detailData.completed_order_count.toLocaleString() }}</strong></div>
              <div><span><i class="fas fa-chart-line"></i> 转化率</span><strong class="conversion">{{ conversionPercent(detailData.conversion_rate) }}</strong></div>
            </div>
            <div class="product-detail-section">
              <div class="product-detail-section-title">
                <span><i class="fas fa-list"></i> SKU 明细</span>
                <small>共 {{ detailData.skus.length }} 条</small>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>SKU编码</th>
                      <th>规格组合</th>
                      <th>售价</th>
                      <th>库存</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="!detailData.skus.length"><td colspan="4" class="product-detail-empty">暂无 SKU 数据</td></tr>
                    <tr v-for="sku in detailData.skus" :key="sku.id">
                      <td><code>{{ sku.sku_code }}</code></td>
                      <td><div class="product-detail-specs"><span v-for="([key,value]) in Object.entries(sku.spec_values)" :key="key">{{ key }}：{{ value }}</span></div></td>
                      <td class="sku-price">¥{{ Number(sku.price).toFixed(2) }}</td>
                      <td><span class="sku-stock" :class="Number(sku.stock) <= 0 ? 'out' : Number(sku.stock) <= 10 ? 'low' : 'normal'">{{ sku.stock }} 件</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="closeProductDetail">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-modal{width:min(980px,calc(100vw - 32px));max-height:min(860px,calc(100vh - 32px));overflow:hidden}.product-detail-header>div{display:flex;flex-direction:column;gap:3px}.product-detail-header h3{margin:0}.product-detail-header small{color:#94a3b8}.product-detail-body{overflow:auto}.product-detail-loading{min-height:300px;display:flex;align-items:center;justify-content:center;gap:10px;color:#64748b}.product-detail-summary{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:16px;padding:20px;border:1px solid #e2e8f0;border-radius:10px;background:linear-gradient(135deg,#f8fafc,#fff)}.product-detail-icon{display:grid;place-items:center;width:58px;height:58px;border-radius:12px;background:#e9edff;color:#4f6ef7;font-size:24px}.product-detail-main{min-width:0}.product-detail-name-row{display:flex;align-items:center;gap:10px}.product-detail-name-row h4{margin:0;overflow:hidden;text-overflow:ellipsis;font-size:20px;color:#0f172a}.product-detail-meta{display:flex;flex-wrap:wrap;gap:14px;margin-top:9px;color:#64748b;font-size:12px}.product-detail-meta i{margin-right:4px;color:#94a3b8}.product-detail-price{text-align:right;display:flex;flex-direction:column;gap:3px}.product-detail-price small,.product-detail-price span{color:#94a3b8;font-size:11px}.product-detail-price strong{color:#ef4444;font-size:20px;white-space:nowrap}.product-detail-metrics{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:14px 0}.product-detail-metrics>div{padding:14px;border:1px solid #e2e8f0;border-radius:8px;background:#fff;display:flex;flex-direction:column;gap:8px}.product-detail-metrics span{color:#64748b;font-size:12px}.product-detail-metrics span i{margin-right:4px;color:#4f6ef7}.product-detail-metrics strong{color:#1e293b;font-size:19px}.product-detail-metrics strong.conversion{color:#16a34a}.product-detail-metrics strong.danger{color:#ef4444}.product-detail-section{border:1px solid #e2e8f0;border-radius:9px;overflow:hidden}.product-detail-section-title{display:flex;justify-content:space-between;align-items:center;padding:13px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-weight:600;color:#334155}.product-detail-section-title small{font-weight:400;color:#94a3b8}.product-detail-modal table{min-width:680px}.product-detail-modal code{padding:3px 6px;border-radius:4px;background:#f1f5f9;color:#475569}.product-detail-specs{display:flex;flex-wrap:wrap;gap:5px}.product-detail-specs span{padding:3px 7px;border-radius:4px;background:#eef2ff;color:#4f46e5;font-size:11px}.sku-price{font-weight:600;color:#ef4444}.sku-stock{display:inline-block;padding:3px 8px;border-radius:999px;font-size:12px}.sku-stock.normal{background:#dcfce7;color:#15803d}.sku-stock.low{background:#fef3c7;color:#b45309}.sku-stock.out{background:#fee2e2;color:#b91c1c}.product-detail-empty{text-align:center!important;padding:36px!important;color:#94a3b8}@media(max-width:800px){.product-detail-summary{grid-template-columns:auto minmax(0,1fr)}.product-detail-price{grid-column:1/-1;text-align:left;padding-top:12px;border-top:1px solid #e2e8f0}.product-detail-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.product-detail-summary{grid-template-columns:1fr}.product-detail-icon{display:none}.product-detail-name-row{align-items:flex-start;flex-direction:column}.product-detail-metrics{grid-template-columns:1fr 1fr}}[data-theme='dark'] .product-detail-summary,[data-theme='dark'] .product-detail-metrics>div{background:#111827;border-color:#334155}[data-theme='dark'] .product-detail-name-row h4,[data-theme='dark'] .product-detail-metrics strong{color:#e5e7eb}[data-theme='dark'] .product-detail-section{border-color:#334155}[data-theme='dark'] .product-detail-section-title{background:#1e293b;border-color:#334155;color:#e5e7eb}[data-theme='dark'] .product-detail-modal code{background:#1e293b;color:#cbd5e1}
.brand-logo-upload{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;
border:1px solid #d1d5db;border-radius:5px;cursor:pointer;font-size:12px;color:#475569;margin-top:5px;
transition:border-color .15s,background .15s}
.brand-logo-upload:hover{border-color:#4f6ef7;color:#4f6ef7;background:#f0f4ff}
.brand-logo-upload.disabled{opacity:.6;cursor:not-allowed}
.brand-logo-upload input[type=file]{display:none}
.brand-logo-preview{width:48px;height:48px;object-fit:cover;border-radius:6px;border:1px solid #e2e8f0;margin-top:5px;vertical-align:middle}
</style>
