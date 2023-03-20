import { useLoaderData } from '@remix-run/react'
import { defer, LoaderArgs } from '@shopify/remix-oxygen'
import { ClientOnly } from 'remix-utils'
import { SearchSpringFacet, SearchspringResponse } from '~/global-types/searchspring'
import { ProductCardQuery } from '~/graphql/generated'
import { PRODUCT_CARDS_QUERY } from '~/graphql/storefront/products/queries/productCards'
import { fetchProductGroupData, retrieveColorValues } from '~/helpers'
import {
  extractProductIds,
  fetchSearchspringResults,
  gatherUniqueProductGroupIds,
  removeRedundantProducts,
} from '~/helpers/searchspring'
import SearchResultGrid from '~/sections/search-result-grid'

export async function loader({ request, context: { storefront } }: LoaderArgs) {
  const url = new URL(request.url)
  const { searchParams } = url
  const { results, facets }: SearchspringResponse = await fetchSearchspringResults({
    searchParams,
  })

  const colorFacet = facets?.find(facet => facet.field === 'ss_swatch') as SearchSpringFacet
  // Facet Filters
  const newColorFacet = await retrieveColorValues(storefront, colorFacet)
  const newFacets = facets?.map(facet => {
    if (facet.field === 'ss_swatch') return newColorFacet
    return facet
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
    facets: newFacets,
  })
}

const SearchPage = () => {
  const { products } = useLoaderData<typeof loader>()
  /* @ts-expect-error gotta fix dis */
  return <ClientOnly>{() => <SearchResultGrid products={products} />}</ClientOnly>
}

export default SearchPage
