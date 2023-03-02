import { SearchSpringProduct, SearchspringResponse } from '~/global-types/searchspring'
import type { ProductCards } from '~/graphql/generated'

//Possibily only needed during development
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
}

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
  const matchingProduct = productSet.find(comparisonProduct => {
    return (
      comparisonProduct.ss_swatch === product.ss_swatch &&
      comparisonProduct.ss_product_group === product.ss_product_group
    )
  })
  return matchingProduct !== undefined
}
