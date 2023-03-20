import { Storefront } from '@shopify/hydrogen'
import { Product } from '@shopify/storefront-kit-react/storefront-api-types'

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
