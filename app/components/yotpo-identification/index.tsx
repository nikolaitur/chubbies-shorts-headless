import { useMatches } from 'react-router'
import { RootLoaderData } from '~/global-types'

const YotpoIdentification = () => {
  const [root] = useMatches()
  const { customer } = (root.data as RootLoaderData) ?? {}
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
