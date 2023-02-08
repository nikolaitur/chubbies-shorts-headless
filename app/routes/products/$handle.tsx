import { useLoaderData } from '@remix-run/react'
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

export async function loader({ params: { handle }, context: { storefront } }: LoaderArgs) {
  const { product } = await storefront.query<PdpQuery>(PDP_QUERY, {
    variables: {
      handle,
    },
    cache: storefront.CacheShort(),
  })

  if (!product) {
    throw json({ message: 'Product does not exist' }, { status: 404, statusText: 'Not Found' })
  }

  return { product }
}
