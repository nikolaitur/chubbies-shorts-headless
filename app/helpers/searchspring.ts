import { Collection } from '@shopify/hydrogen/storefront-api-types'
import { COLOR_FILTER_KEY } from '~/constants'
import { SearchSpringProduct, SearchspringResponse } from '~/global-types/searchspring'
import { decodeBtoa } from './general'

/*
Possibily only needed during development
export const generateSearchspringFormat = (productCards: ProductCards) => {
  const { nodes } = productCards
  return nodes?.map(product => {
    const { id, product_group, inseam_length, swatch } = product || {}
    const transformedInseam = inseam_length?.value ? JSON.parse(inseam_length?.value).value : null
    const isolatedId = id ? id.split('/')[4] : null
    return {
      uid: isolatedId,
      ss_product_group: product_group?.value,
      ss_swatch: swatch?.value,
      ss_inseam_length: transformedInseam,
      ss_product_id: id,
    }
  })
}*/

//This function reduces to results returned by Searchspring.
//Any product that appears after the first occurance of a product with the same ProductGroup and Swatch is removed.
export const removeRedundantProducts = (results: SearchspringResponse['results']) => {
  return results.reduce((acc, curr) => {
    if (!productSetContainsMatch(acc, curr)) acc.push(curr)
    return acc
  }, [] as SearchspringResponse['results'])
}

export const gatherUniqueProductGroupIds = (results: SearchspringResponse['results']) => {
  return results.reduce((acc, curr) => {
    const { ss_product_group } = curr
    if (ss_product_group && !acc.includes(ss_product_group)) acc.push(ss_product_group)
    return acc
  }, [] as string[])
}

export const extractProductIds = (results: SearchspringResponse['results']) => {
  return results.map(product => `gid://shopify/Product/${product.uid}`)
}

const productSetContainsMatch = (
  productSet: SearchspringResponse['results'],
  product: SearchSpringProduct,
) => {
  if (!product.ss_product_group) return false
  const matchingProduct = productSet.find(comparisonProduct => {
    return (
      comparisonProduct.ss_swatch === product.ss_swatch &&
      comparisonProduct.ss_product_group === product.ss_product_group
    )
  })
  return matchingProduct !== undefined
}

export const fetchSearchspringResults = async ({
  collectionHandle,
  searchParams,
}: SSResultsInput): Promise<SearchspringResponse> => {
  const swatch_key = `filter.${COLOR_FILTER_KEY}`
  const urlBase = 'https://38z3gf.a.searchspring.io/api/search/search.json'
  searchParams.append('resultsPerPage', '40')
  searchParams.append('page', '1')
  searchParams.append('resultsFormat', 'native')
  searchParams.append('siteId', '38z3gf')
  if (collectionHandle) searchParams.append('bgfilter.collection_handle', collectionHandle)
  if (searchParams.has(swatch_key)) {
    const newEntries = searchParams.getAll(swatch_key).map(entry => decodeBtoa(entry))
    searchParams.delete(swatch_key)
    newEntries.map(entry => searchParams.append(swatch_key, entry))
  }
  const requestUrl = `${urlBase}?${searchParams}`
  const res = await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

type SSResultsInput = {
  collectionHandle?: Collection['handle']
  searchParams: URLSearchParams
}

/*
type SearchspringParams =
  | { 'sort.ga_unique_purchases': 'desc' }
  | { 'sort.title': 'asc' | 'desc' }
  | { 'sort.ss_days_since_published': 'asc' }
  | { 'sort.ss_price': 'asc' | 'desc' }
  | { 'filter.variant_size': string }
  | { 'filter.ss_swatch': string }
  | { 'filter.ss_price.min': string }
  | { 'filter.ss_price.max': string }
  | { q: string }
  | { 'bgfilter.collection_handle': string }
  | { resultsPerPage: number }
  | { page: number }
  | { resultsFormat: 'native' }
*/
