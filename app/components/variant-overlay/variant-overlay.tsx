import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { checkIfTouchDevice } from '~/helpers'
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

  // extracted the logic for showing and hiding overlay for reusability
  // stateless logic for smoother transition
  useEffect(() => {
    const hoverController = hoverControllerRef?.current
    const clickController = clickControllerRef?.current
    const variantOverlay = variantOverlayRef.current
    const isTouchDevice = checkIfTouchDevice()

    if (!variantOverlay) return

    const showOverlay = () => {
      variantOverlay.classList.add(styles.isShown)
    }

    const hideOverlay = () => {
      variantOverlay.classList.remove(styles.isShown)
    }

    const toggleOverlay = () => {
      variantOverlay.classList.toggle(styles.isShown)
    }

    if (!isTouchDevice) {
      hoverController?.addEventListener('mouseenter', showOverlay)
      hoverController?.addEventListener('mouseleave', hideOverlay)
    }
    clickController?.addEventListener('click', toggleOverlay)

    return () => {
      if (!isTouchDevice) {
        hoverController?.removeEventListener('mouseenter', showOverlay)
        hoverController?.removeEventListener('mouseleave', hideOverlay)
      }

      clickController?.removeEventListener('click', toggleOverlay)
    }
  }, [])

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
