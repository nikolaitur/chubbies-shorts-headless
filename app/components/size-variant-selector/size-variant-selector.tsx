import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector/dist/variant-selector'
import { getSizeTextDisplay } from '~/helpers'
import styles from './styles.module.css'
import { SizeVariantSelectorProps } from './types'

const SizeVariantSelector = ({
  size,
  selectedSize,
  sizeOption,
  onSelectSize,
  ...props
}: SizeVariantSelectorProps) => {
  const { name, exists, availableForSale } = sizeOption

  return (
    <VariantSelector
      className={styles.variantSelector}
      option={getSizeTextDisplay(name)}
      size={size}
      selected={selectedSize === name}
      disabled={exists && !availableForSale}
      unavailableAlt={!exists}
      onClick={() => onSelectSize && onSelectSize(name)}
      {...props}
    />
  )
}

export default SizeVariantSelector
