import { ROUTE_IDS } from '~/constants'
import { LoaderData } from '~/global-types'
import { useTypedRouteLoaderData } from '~/hooks'

const YotpoIdentification = () => {
  const { customer } = useTypedRouteLoaderData<LoaderData['root']>(ROUTE_IDS.ROOT) ?? {}
  const { email, id } = customer ?? {}

  const idNumberIndex = id?.lastIndexOf('/')
  const idNumber = idNumberIndex && id?.substring(idNumberIndex + 1)

  return (
    <div
      id="swell-customer-identification"
      data-authenticated="true"
      data-email={email || ''}
      data-id={idNumber || ''}
      style={{ display: 'none' }}
    />
  )
}

export default YotpoIdentification
