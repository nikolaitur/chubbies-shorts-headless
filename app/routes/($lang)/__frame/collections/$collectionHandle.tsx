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
import CollectionGrid, { CollectionGridProps } from '~/sections/collection-grid'
import { COLLECTION_QUERY } from '~/graphql/storefront/collections/queries'

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
  const { results }: SearchspringResponse = await fetchSearchspringResults({
    searchParams,
    collectionHandle,
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
  })
}

const CollectionPage = () => {
  const { products, collection } = useLoaderData<typeof loader>()
  /* 
    ProductGroups here is a promise, so we need to wrap it in a Suspense component.
    This allows us to begin rendering the collection page while the productGroups query is still in flight.
    That way, user can see available product cards while the swatches are still loading.
    <ProductCard>
      <Suspense fallback={<></>}>
        <Await resolve={productGroups}>
          { && (productGroups => <ProductCardSwatches productGroups={productGroups} />)}
        </Await>
      </Suspense>
    </ProductCard>
  */

  return (
    <>
      {/* Temporarily add <ClientOnly> */}
      {/* TODO - Investigate issue with CollectionGrid breaking pdp styles */}
      <ClientOnly>
        {() => <CollectionGrid collection={collection} products={products} />}
      </ClientOnly>
    </>
  )
}

export default CollectionPage
