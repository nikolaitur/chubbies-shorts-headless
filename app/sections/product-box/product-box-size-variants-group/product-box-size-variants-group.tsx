import { useSearchParams } from '@remix-run/react'
import SizeVariantsGroup from '~/components/size-variants-group'
import { ROUTE_IDS, SIZE_OPTION_NAME } from '~/constants'
import { LoaderData } from '~/global-types'
import { useTypedRouteLoaderData } from '~/hooks'
import { ProductBoxSizeVariantsGroupProps } from './types'

const ProductBoxSizeVariantsGroup = ({
  size = 'xl',
  ...props
}: ProductBoxSizeVariantsGroupProps) => {
  const [searchParams] = useSearchParams()
  const { product } = useTypedRouteLoaderData<LoaderData['product']>(ROUTE_IDS.PRODUCT) ?? {}
  const { sizeOptions } = product ?? {}
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
