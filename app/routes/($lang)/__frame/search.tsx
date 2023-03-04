import { useLoaderData } from '@remix-run/react'
import { defer, LoaderArgs } from '@shopify/remix-oxygen'
import { ClientOnly } from 'remix-utils'
import { SearchspringResponse } from '~/global-types/searchspring'
import { ProductCardQuery } from '~/graphql/generated'
import { PRODUCT_CARDS_QUERY } from '~/graphql/storefront/products/queries/productCards'
import { fetchProductGroupData } from '~/helpers'
import {
  extractProductIds,
  fetchSearchspringResults,
  gatherUniqueProductGroupIds,
  removeRedundantProducts,
} from '~/helpers/searchspring'
import CollectionGrid from '~/sections/collection-grid'

export async function loader({ request, context: { storefront } }: LoaderArgs) {
  const url = new URL(request.url)
  const { searchParams } = url
  const { results }: SearchspringResponse = await fetchSearchspringResults({
    searchParams,
  })
  const filteredResults = removeRedundantProducts(results)
  const productGroupIds = gatherUniqueProductGroupIds(filteredResults)
  const productIds = extractProductIds(filteredResults)
  const products = storefront.query<ProductCardQuery>(PRODUCT_CARDS_QUERY, {
    variables: {
      productIds,
    },
  })
  const productGroups = Promise.all(
    productGroupIds.map(productGroupId => fetchProductGroupData(storefront, { productGroupId })),
  )
  return defer({
    products: await products,
    productGroups,
  })
}

const SearchPage = () => {
  const { products, productGroups } = useLoaderData<typeof loader>()
  /* @ts-expect-error gotta fix dis */
  return <ClientOnly>{() => <CollectionGrid products={products.nodes} />}</ClientOnly>
}

export default SearchPage
