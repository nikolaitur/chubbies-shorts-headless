import { useMatches } from '@remix-run/react'
import { retrieveRecsForPlacement } from '~/helpers/nosto'

const CollectionPage = () => {
  //Demonstration of retrieving Nosto recommendations for a given placement
  const matches = useMatches()
  const nosto = matches[0]?.data?.nosto
  const bestSellers = retrieveRecsForPlacement('best-sellers', nosto)

  return (
    <>
      <h1>Collection Page</h1>
    </>
  )
}

export default CollectionPage
