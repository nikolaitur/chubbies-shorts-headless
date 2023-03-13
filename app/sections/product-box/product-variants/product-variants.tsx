import ColorVariantGroup from '../color-variants-group'
import InseamVariantsGroup from '../inseam-variants-group'
import ProductBoxSizeVariantsGroup from '../product-box-size-variants-group'
import styles from './styles.module.css'

const ProductVariants = () => {
  return (
    <div className={styles.wrapper}>
      <InseamVariantsGroup />
      <ColorVariantGroup className={styles.desktopColorVariants} variant="expandable" />
      <ColorVariantGroup className={styles.mobileColorVariants} />
      <ProductBoxSizeVariantsGroup />
    </div>
  )
}

export default ProductVariants
