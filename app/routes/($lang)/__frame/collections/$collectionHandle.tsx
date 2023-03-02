import { useLoaderData } from '@remix-run/react'
import { LoaderArgs } from '@shopify/remix-oxygen'
import { CollectionQuery } from '~/graphql/generated'
import { COLLECTION_QUERY } from '~/graphql/storefront/collections/queries'
import CollectionGrid from '~/sections/collection-grid'
// Collection loader
export async function loader({ params, context: { storefront } }: LoaderArgs) {
  const { collectionHandle } = params
  const collectionQuery = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle: collectionHandle,
    },
    cache: storefront.CacheShort(),
  })

  return collectionQuery
}

const CollectionsPage = () => {
  const collection = useLoaderData<typeof loader>() as CollectionQuery['collection']

  return <CollectionGrid collection={collection} />
}

export default CollectionsPage
