import { useLoaderData, useMatches } from '@remix-run/react'
import { defer, LoaderArgs } from '@shopify/remix-oxygen'
import { useEffect } from 'react'
import { ClientOnly } from 'remix-utils'
import { COLOR_FILTER_KEY } from '~/constants'
import { SearchSpringFacet, SearchspringResponse } from '~/global-types/searchspring'
import { ProductCardQuery } from '~/graphql/generated'
import { COLLECTION_QUERY } from '~/graphql/storefront/collections/queries'
import { PRODUCT_CARDS_QUERY } from '~/graphql/storefront/products/queries/productCards'
import { fetchProductGroupData, retrieveColorValues, generatePlpAnalytics } from '~/helpers'
import {
  extractProductIds,
  fetchSearchspringResults,
  gatherUniqueProductGroupIds,
  removeRedundantProducts,
} from '~/helpers/searchspring'
// @ts-expect-error - TODO for Dylan: fix the type error
import CollectionGrid, { CollectionGridProps } from '~/sections/collection-grid'
import { dataLayerViewItemList } from '~/utils/dataLayer'

// Collection loader
export async function loader({ params, request, context: { storefront } }: LoaderArgs) {
  // Fetch Collection Data from storefront
  const collectionQuery = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle: params.collectionHandle,
    },
    storefrontApiVersion: 'unstable',
    cache: storefront.CacheShort(),
  })
  /*
  Fetch the collection products from searchspring
  We need some changes to the Searchspring index based on our new product data structure
  TODO: Investigate caching results from Searchspring
  TODO: Add Searchspring cookie creation
  TODO: Pass buyer IP to HTTP_X_FORWARDED_FOR header
  */
  const url = new URL(request.url)
  const { searchParams } = url
  const { collectionHandle } = params
  const { results, facets, sorting }: SearchspringResponse = await fetchSearchspringResults({
    searchParams,
    collectionHandle,
  })
  const colorFacet = facets?.find(facet => facet.field === COLOR_FILTER_KEY) as SearchSpringFacet
  // Facet Filters
  const newColorFacet = await retrieveColorValues(storefront, colorFacet)
  const newFacets = facets?.map(facet => {
    if (facet.field === COLOR_FILTER_KEY) return newColorFacet
    return facet
  })

  //Any product that appears after the first occurance of a product with the same ProductGroup and Swatch is removed.
  //Remove null ProductGroup
  const filteredResults = removeRedundantProducts(results)
  //Extract IDs for each unique product group that appears in the Searchspring result set
  const productGroupIds = gatherUniqueProductGroupIds(filteredResults)
  //Extract IDs for each product that appears in the Searchspring result set
  const productIds = extractProductIds(filteredResults)
  //Fetch the product data necessary to render product cards
  //TODO: Deal with pagination to only fetch what is rendered
  const products = storefront.query<ProductCardQuery>(PRODUCT_CARDS_QUERY, {
    variables: {
      productIds,
    },
  })

  const collection = collectionQuery as CollectionGridProps['collection']

  //Fetch the info on all product groups that appear in the Searchspring result set.
  //Because this is an expensive query, we only want to call it once per product group.
  //In order to improve our cache hit rate we will share the same query across our collection, search and product pages.
  //This should allow a user to traverse between a collection and product page without having to refetch the product group data.
  const productGroups = Promise.all(
    productGroupIds.map(productGroupId => fetchProductGroupData(storefront, { productGroupId })),
  )

  //Await the products query, collection page rendering will be blocked until this is resolved
  //Return a promise to the client for the productGroups query
  return defer({
    products: await products,
    productGroups,
    collection: collectionQuery as CollectionGridProps['collection'],
    facets: newFacets,
    sorting,
    analytics: generatePlpAnalytics(await products, collection),
  })
}

const CollectionPage = () => {
  const { products, collection } = useLoaderData<typeof loader>()
  const [root, locale, frame] = useMatches()

  useEffect(() => {
    dataLayerViewItemList({ ecommerce: frame?.data?.analytics })
  }, [frame?.data?.analytics])

  return (
    <>
      {/* Temporarily add <ClientOnly> */}
      {/* TODO - Investigate issue with CollectionGrid breaking pdp styles */}
      <ClientOnly>
        {/* @ts-expect-error - TODO for Dylan: fix the type error */}
        {() => <CollectionGrid collection={collection} products={products} />}
      </ClientOnly>
    </>
  )
}

export default CollectionPage
