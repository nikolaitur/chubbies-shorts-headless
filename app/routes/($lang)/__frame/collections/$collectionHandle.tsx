import { useMatches } from '@remix-run/react'
import { retrieveRecsForPlacement } from '~/helpers'

const CollectionPage = () => {
  //Demonstration of retrieving Nosto recommendations for a given placement
  const matches = useMatches()
  const nosto = matches[0]?.data?.nosto
  const bestSellers = retrieveRecsForPlacement('best-sellers', nosto)

  return (
    <>
      {/* Temporarily remove CollectionGrid */}
      {/* TODO - Investigate issue with CollectionGrid breaking pdp styles */}
      {/* <CollectionGrid /> */}
    </>
  )
}

export default CollectionPage
