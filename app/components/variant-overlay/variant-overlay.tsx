import clsx from 'clsx'
import { useRef } from 'react'
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
  clickControllerRef,
  onSelectSize,
}: VariantOverlayProps) => {
  const variantOverlayRef = useRef<HTMLDivElement>(null)
  const isComponentSizeXS = size === 'xs'

  useOverlayController({
    className: styles.isShown,
    overlayRef: variantOverlayRef,
    hoverControllerRef,
    toggleControllerRef: clickControllerRef,
  })

  return (
    <div
      className={clsx(styles.wrapper, styles[variant], styles[size], {
        [styles.hasSelectedSize]: Boolean(selectedSize),
      })}
      ref={variantOverlayRef}
    >
      {sizeOptions && (
        <SizeVariantsGroup
          variant="product-card"
          sizeOptions={sizeOptions}
          selectedSize={selectedSize}
          size={isComponentSizeXS ? 'sm' : 'md'}
          onSelectSize={onSelectSize}
        />
      )}
      <ATCButton
        size="sm"
        varaint="product-card"
        selectedSize={selectedSize}
        defaultVariant={defaultVariant}
        selectedVariant={selectedVariant}
        withPrice={!isComponentSizeXS}
      />
    </div>
  )
}

export default VariantOverlay
