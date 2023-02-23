import { Storefront } from '@shopify/hydrogen'
import { MetaobjectField, Product } from '@shopify/hydrogen/storefront-api-types'
import { PRODUCT_FROM_IDS_QUERY } from '~/graphql/storefront/products/queries/productsFromIds'

export const flattenMetaobjectFields = (fields: MetaobjectField[]) =>
  fields.reduce((flattenedFields, { key, ...field }) => {
    return {
      ...flattenedFields,
      [key]: {
        ...field,
      },
    }
  }, {})

export const getProductIdWithHandle = async (handle: string, storefront: Storefront) => {
  const { product } = await storefront.query<{ product: Product }>(
    `query Product($handle: String!) {
      product(handle: $handle) {
        id
      }
    }`,
    {
      variables: {
        handle,
      },
    },
  )
  return product?.id?.split('/')[4]
}

export const getProductDataWithIds = async (ids: string[], storefront: Storefront) => {
  const res = await storefront.query<{ nodes: Product[] }>(PRODUCT_FROM_IDS_QUERY, {
    variables: {
      ids,
    },
    cache: storefront.CacheNone(),
  })
  return res
}
