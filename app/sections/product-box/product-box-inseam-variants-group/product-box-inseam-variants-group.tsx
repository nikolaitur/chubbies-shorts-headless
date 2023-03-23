import InseamVariantsGroup from '~/components/inseam-variants-group'
import { ROUTE_IDS } from '~/constants'
import { ImageData, LoaderData } from '~/global-types'
import { useTypedRouteLoaderData } from '~/hooks'
import { ProductBoxInseamVariantsGroupProps } from './types'

const ProductBoxInseamVariantsGroup = ({
  size = 'xl',
  ...props
}: ProductBoxInseamVariantsGroupProps) => {
  const { product } = useTypedRouteLoaderData<LoaderData['product']>(ROUTE_IDS.PRODUCT) ?? {}
  const { inseamOptions, inseamImage } = product ?? {}
  const flattenedImage = inseamImage?.reference?.mediaImage?.reference?.image

  return (
    <InseamVariantsGroup
      variant="product-box"
      inseamOptions={inseamOptions}
      inseamImage={flattenedImage as ImageData}
      {...props}
    />
  )
}

export default ProductBoxInseamVariantsGroup
