import { useLoaderData } from '@remix-run/react'
import { LoaderArgs } from '@shopify/remix-oxygen'
import CollectionGrid from '~/sections/collection-grid'
import { COLLECTION_QUERY } from '~/graphql/storefront/collections/queries'
import { CollectionProps } from '~/sections/collection-grid/types'
// Collection loader
export async function loader({ params, context: { storefront } }: LoaderArgs) {
  const { handle } = params
  const collectionQuery = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
    },
    cache: storefront.CacheShort(),
  })

  return collectionQuery
}

const CollectionsPage = () => {
  const collection = useLoaderData<typeof loader>() as CollectionProps

  return <CollectionGrid collection={collection} />
}

export default CollectionsPage
