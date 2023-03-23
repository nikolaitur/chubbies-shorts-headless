import ColorVariantsGroup from '~/components/color-variants-group'
import { ROUTE_IDS } from '~/constants'
import { LoaderData } from '~/global-types'
import { useTypedRouteLoaderData } from '~/hooks'
import styles from './styles.module.css'
import { ProductBoxColorVariantsGroupProps } from './types'

const ProductBoxColorVariantsGroup = ({ ...props }: ProductBoxColorVariantsGroupProps) => {
  const { product } = useTypedRouteLoaderData<LoaderData['product']>(ROUTE_IDS.PRODUCT) ?? {}
  const { colorOptionsByGroup } = product ?? {}

  return (
    <>
      <ColorVariantsGroup
        type="product-box"
        className={styles.desktopColorVariants}
        colorOptionsByGroup={colorOptionsByGroup}
        variant="expandable"
      />
      <ColorVariantsGroup
        type="product-box"
        className={styles.mobileColorVariants}
        colorOptionsByGroup={colorOptionsByGroup}
      />
    </>
  )
}

export default ProductBoxColorVariantsGroup
