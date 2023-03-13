import { useSearchParams } from '@remix-run/react'
import { useMatches } from 'react-router'
import SizeVariantsGroup from '~/components/size-variants-group'
import { PRODUCT_ROUTE_ID, SIZE_OPTION_NAME } from '~/constants'
import { PdpRouteData } from '~/global-types'
import { ProductBoxSizeVariantsGroupProps } from './types'

const ProductBoxSizeVariantsGroup = ({
  size = 'xl',
  ...props
}: ProductBoxSizeVariantsGroupProps) => {
  const matches = useMatches()
  const [searchParams] = useSearchParams()
  const { data } = (matches.find(match => match.id === PRODUCT_ROUTE_ID) ?? {}) as PdpRouteData
  const { sizeOptions } = data.product ?? {}
  const selectedSize = searchParams.get(SIZE_OPTION_NAME)

  if (!sizeOptions) return null

  return (
    <SizeVariantsGroup
      sizeOptions={sizeOptions}
      selectedSize={selectedSize}
      variant="product-box"
      {...props}
    />
  )
}

export default ProductBoxSizeVariantsGroup
