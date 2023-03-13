import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import styles from './styles.module.css'
import { ColorVariantSelectorProps } from './types'

const ColorVariantSelector = ({ colorOption, size }: ColorVariantSelectorProps) => {
  const { image, selected, exists } = colorOption

  /*
  This is for feature that colors will also be struck-through if it is out of stock based on selected size
  This will be re-enabled post-launch

  const [searchParams] = useSearchParams()
  const selectedSize = searchParams.get(SIZE_OPTION_NAME)
  const isAvailableForSaleBySelectedSize = (() => {
    if (!selectedSize) return true
    return sizeOptions?.find(option => option.name === selectedSize)?.availableForSale
  })()
  const isColorExistsBySelectedSize = colorSizeDetailsBySelectedSize?.exists ?? true
  */

  return (
    <SwatchSelector
      className={styles.swatchSelector}
      size={size}
      image={image}
      selected={selected}
      disabled={!exists}
    />
  )
}

export default ColorVariantSelector
