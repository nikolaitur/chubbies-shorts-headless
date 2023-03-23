import ProductBoxColorVariantsGroup from '../product-box-color-variants-group'
import ProductBoxInseamVariantsGroup from '../product-box-inseam-variants-group'
import ProductBoxSizeVariantsGroup from '../product-box-size-variants-group'
import styles from './styles.module.css'

const ProductVariants = () => {
  return (
    <div className={styles.wrapper}>
      <ProductBoxInseamVariantsGroup />
      <ProductBoxColorVariantsGroup />
      <ProductBoxSizeVariantsGroup />
    </div>
  )
}

export default ProductVariants
