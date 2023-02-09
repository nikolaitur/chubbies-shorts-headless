import { useLoaderData } from '@remix-run/react'
import type { Product as ProductType } from '@shopify/hydrogen/storefront-api-types'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { PdpQuery } from '~/graphql/generated'
import { PDP_QUERY } from '~/graphql/storefront/products/queries'
import ProductBox from '~/sections/product-box'

const ProductPage = () => {
  const { product } = useLoaderData<typeof loader>()

  return (
    <>
      <ProductBox product={product as PdpQuery['product']} />
    </>
  )
}

export default ProductPage

export async function loader({ params, context: { storefront } }: LoaderArgs) {
  const { handle } = params
  const { product } = await storefront.query<{
    product: ProductType
  }>(PDP_QUERY, {
    variables: {
      handle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheShort(),
  })

  if (!product) {
    throw json({ message: 'Product does not exist' }, { status: 404, statusText: 'Not Found' })
  }

  return { product }
}
