export const BREAKPOINTS = {
  MD: '(min-width:768px)',
  LG: '(min-width:1024px)',
  XL: '(min-width:1281px)',
  XXL: '(min-width:1441px)',
  XXXL: '(min-width:1681px)',
}

export const STOREFRONT_NAME_KEY = 'storefront_name'
export const PRODUCT_ROUTE_ID = 'routes/($lang)/__frame/products/$productHandle'
export const COLLECTION_ROUTE_ID = 'routes/($lang)/__frame/collections/$collectionHandle'
export const UNIT_MEASUREMENT_SYMBOL: { [key: string]: string } = {
  INCHES: '"',
}

export const MIN_ANNOUNCEMENT_HEIGHT = 44

export const ROUTE_IDS = {
  ROOT: 'root',
  FRAME: 'routes/($lang)/__frame',
  PRODUCT: 'routes/($lang)/__frame/products/$productHandle',
  COLLECTION: 'routes/($lang)/__frame/collections/$collectionHandle',
}
