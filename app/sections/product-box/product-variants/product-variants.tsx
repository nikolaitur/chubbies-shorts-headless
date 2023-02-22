import ColorVariantGroup from '../color-variants-group'
import InseamVariantsGroup from '../inseam-variants-group'
import SizeVariantsGroup from '../size-variants-group'
import styles from './styles.module.css'

const ProductVariants = () => {
  return (
    <div className={styles.wrapper}>
      <InseamVariantsGroup />
      <ColorVariantGroup />
      <SizeVariantsGroup />
    </div>
  )
}

export default ProductVariants
