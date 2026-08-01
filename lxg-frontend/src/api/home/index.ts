// H5 端使用相对路径，通过 devServer proxy 转发，避免跨域
const BACKEND_HOST = 'http://192.168.10.7:8089';
const API_BASE_URL = process.env.TARO_ENV === 'h5'
  ? '/api/v1'
  : `${BACKEND_HOST}/api/v1`;

export const homeApi = {
    banners: `${API_BASE_URL}/homepage/banners`,
    recommendations: `${API_BASE_URL}/homepage/recommendations`,
    seckillActivities: `${API_BASE_URL}/home/seckill-activities`,
    activities: `${API_BASE_URL}/seckill/activities`,
    activityProducts: `${API_BASE_URL}/seckill/activities/:id/products`,
    productDetail: `${API_BASE_URL}/seckill/activities/:id/products/:product_id`
};

export const categoryApi = {
    list: `${API_BASE_URL}/categories`,
    products: `${API_BASE_URL}/categories/:id/products`,
    stores: `${API_BASE_URL}/stores`,
    storeDetail: `${API_BASE_URL}/stores/:id`,
    categoryTree: `${API_BASE_URL}/get/categorytree`,
    categoryOne: `${API_BASE_URL}/get/category/one`,
    categorySecond: `${API_BASE_URL}/get/category/second`
};

export const brandApi = {
    list: `${API_BASE_URL}/brands`,
    products: `${API_BASE_URL}/brands/:id/products`,
    // 获取品牌树
    brandTree: `${API_BASE_URL}/get/brandtree`,
    // 获取指定品牌下的商品（分页）
    brandProducts: `${API_BASE_URL}/get/brand/product`
};

export const productApi = {
    detail: `${API_BASE_URL}/product/detail`,
    search: `${API_BASE_URL}/product/search`
};

export const reviewApi = {
    list: `${API_BASE_URL}/products/:id/reviews`,
    stats: `${API_BASE_URL}/products/:id/reviews/stats`,
    summary: `${API_BASE_URL}/products/:id/reviews/summary`,
    submit: `${API_BASE_URL}/reviews`,
    replies: `${API_BASE_URL}/reviews/:id/replies`,
    reply: `${API_BASE_URL}/reviews/:id/replies`,
    like: `${API_BASE_URL}/reviews/like`
};