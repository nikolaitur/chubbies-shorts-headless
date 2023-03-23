import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector/dist/variant-selector'
import { UNIT_MEASUREMENT_SYMBOL } from '~/constants'
import styles from './styles.module.css'
import { InseamVariantSelectorProps } from './types'

const InseamVariantSelector = ({
  size,
  inseamOption,
  onSelectInseam,
  ...props
}: InseamVariantSelectorProps) => {
  const { exists, value, selected, unit } = inseamOption

  return (
    <VariantSelector
      size={size}
      className={styles.variantSelector}
      option={`${value}${UNIT_MEASUREMENT_SYMBOL[unit ?? '']}`}
      selected={selected}
      unavailableAlt={!exists}
      onClick={() => onSelectInseam && onSelectInseam(value)}
      {...props}
    />
  )
}

export default InseamVariantSelector
