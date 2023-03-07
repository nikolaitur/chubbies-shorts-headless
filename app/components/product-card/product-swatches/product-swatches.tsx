import { Inseam } from '~/global-types'
import {
  getColorOptions,
  getColorOptionsByGroup,
  getInseamOptions,
  getSizeOptions,
} from '~/helpers'
import styles from './styles.module.css'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'

const ProductSwatches = ({ productGroups, product }) => {
  const productGroupId = product?.productGroup?.value
  const productGroup = productGroups.find(productGroup => productGroup.id === productGroupId)

  const { inseam_length, color } = product
  const productsFromProductGroup = productGroup?.products.nodes
  const parsedInseam: Inseam | null = JSON.parse(inseam_length?.value ?? 'null')
  const colorId = color?.value
  const inseamOptions = getInseamOptions(parsedInseam, colorId, productsFromProductGroup) ?? []
  const colorOptions = getColorOptions(colorId, parsedInseam, productsFromProductGroup) ?? []

  const selectedInseam = inseamOptions[0]

  return (
    <div>
      <div className={styles.colorVariants}>
        {colorOptions.map(({ name, handle, selected, image }) => {
          return <SwatchSelector key={handle} image={image} selected={selected} />
        })}
      </div>
      <div className={styles.inseamVariants}>
        {inseamOptions?.map(({ value, selected, handle }) => {
          return <VariantSelector selected={selected} key={handle} option={`${value}'`} />
        })}
      </div>
    </div>
  )
}

export default ProductSwatches
