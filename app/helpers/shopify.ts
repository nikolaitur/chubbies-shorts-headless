import { Storefront } from '@shopify/hydrogen'
import { MetaobjectField, Product } from '@shopify/storefront-kit-react/storefront-api-types'

export const flattenMetaobjectFields = (fields: MetaobjectField[]) =>
  fields.reduce((flattenedFields, { key, ...field }) => {
    return {
      ...flattenedFields,
      [key]: {
        ...field,
      },
    }
  }, {})

export const getProductIdByHandle = async (handle: string, storefront: Storefront) => {
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
