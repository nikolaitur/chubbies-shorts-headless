import { useLoaderData } from '@remix-run/react'
import { defer, LoaderArgs } from '@shopify/remix-oxygen'
import { ClientOnly } from 'remix-utils'
import mockSearchspringResponse from '~/data/search-spring/collection/proposed'
import { SearchspringResponse } from '~/global-types/searchspring'
import { ProductCards } from '~/graphql/generated'
import { PRODUCT_CARDS_QUERY } from '~/graphql/storefront/products/queries/productCards'
import { fetchProductGroupData } from '~/helpers'
import {
  extractProductIds,
  gatherUniqueProductGroupIds,
  removeRedundantProducts,
} from '~/helpers/searchspring'
import CollectionGrid from '~/sections/collection-grid'

export async function loader({ params, context: { storefront } }: LoaderArgs) {
  /*
  Fetch the collection products from searchspring
  We need some changes to the Searchspring index based on our new product data structure
  
  TODO: Replace with a Searchspring API call when Chubbies index is updated
  TODO: Investigate caching results from Searchspring
  TODO: Consume query params to control filtering and sorting
  */
  const { results }: SearchspringResponse = mockSearchspringResponse
  //Any product that appears after the first occurance of a product with the same ProductGroup and Swatch is removed.
  const filteredResults = removeRedundantProducts(results)
  //Extract IDs for each unique product group that appears in the Searchspring result set
  const productGroupIds = gatherUniqueProductGroupIds(filteredResults)
  //Extract IDs for each product that appears in the Searchspring result set
  const productIds = extractProductIds(filteredResults)
  //Fetch the product data necessary to render product cards
  //TODO: Deal with pagination to only fetch what is rendered
  const products = storefront.query<ProductCards>(PRODUCT_CARDS_QUERY, {
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
  })
}

const CollectionPage = () => {
  const { products, productGroups } = useLoaderData<typeof loader>()
  /* 
    ProductGroups here is a promise, so we need to wrap it in a Suspense component.
    This allows us to begin rendering the collection page while the productGroups query is still in flight.
    That way, user can see available product cards while the swatches are still loading.
    <ProductCard>
      <Suspense fallback={<></>}>
        <Await resolve={productGroups}>
          {productGroups => <ProductCardSwatches productGroups={productGroups} />
        </Await>
      </Suspense>
    </ProductCard>
  */
  return (
    <>
      {/* Temporarily add <ClientOnly> */}
      {/* TODO - Investigate issue with CollectionGrid breaking pdp styles */}
      <ClientOnly>{() => <CollectionGrid />}</ClientOnly>
    </>
  )
}

export default CollectionPage
