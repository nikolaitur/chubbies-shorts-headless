import { useMatches } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import { retrieveRecsForPlacement } from '~/helpers'
import CollectionGrid from '~/sections/collection-grid'

const CollectionPage = () => {
  //Demonstration of retrieving Nosto recommendations for a given placement
  const matches = useMatches()
  const nosto = matches[0]?.data?.nosto
  const bestSellers = retrieveRecsForPlacement('best-sellers', nosto)

  return (
    <>
      {/* Temporarily add <ClientOnly> */}
      {/* TODO - Investigate issue with CollectionGrid breaking pdp styles */}
      <ClientOnly>{() => <CollectionGrid />}</ClientOnly>
    </>
  )
}

export default CollectionPage
