import clsx from 'clsx'
import { useOverlayController } from '~/hooks'
import ATCButton from '../atc-button'
import SizeVariantsGroup from '../size-variants-group'
import styles from './styles.module.css'
import { VariantOverlayProps } from './types'

const VariantOverlay = ({
  sizeOptions,
  defaultVariant,
  selectedVariant,
  selectedSize,
  size = 'md',
  variant = 'primary',
  hoverControllerRef,
  toggleControllerRef,
  onSelectSize,
}: VariantOverlayProps) => {
  const isComponentSizeXS = size === 'xs'

  const { isShown } = useOverlayController({
    hoverControllerRef,
    toggleControllerRef,
  })

  return (
    <div
      className={clsx(styles.wrapper, styles[variant], styles[size], {
        [styles.hasSelectedSize]: Boolean(selectedSize),
        [styles.isShown]: isShown,
      })}
    >
      {sizeOptions && (
        <SizeVariantsGroup
          sizeOptions={sizeOptions}
          selectedSize={selectedSize}
          size={isComponentSizeXS ? 'sm' : 'md'}
          onSelectSize={onSelectSize}
        />
      )}
      <ATCButton
        size="sm"
        variant="product-card"
        selectedSize={selectedSize}
        defaultVariant={defaultVariant}
        selectedVariant={selectedVariant}
        withPrice={!isComponentSizeXS}
      />
    </div>
  )
}

export default VariantOverlay
