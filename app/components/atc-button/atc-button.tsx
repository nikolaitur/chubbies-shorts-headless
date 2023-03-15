import { useFetcher, useMatches } from '@remix-run/react'
import ButtonAddToCart from '@solo-brands/ui-library.ui.atomic.button-add-to-cart'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { CartAction } from '~/global-types'
import { getDisplayPrices } from '~/helpers'
import { dataLayerATC } from '~/utils/dataLayer'
import { useCartActions, useCartState } from '../cart-context/cart-context'
import OutOfStockModal from '../out-of-stock-modal'
import SplashElement from '../splash-element'
import WaitlistModal from '../waitlist-modal'
import styles from './styles.module.css'
import { ATCButtonProps } from './types'

const ATCButton = ({
  varaint = 'default',
  defaultVariant,
  selectedSize,
  selectedVariant,
  additionalLines = [],
  ...props
}: ATCButtonProps) => {
  const [isOOSModalShown, setIsOOSModalShown] = useState(false)
  const [isWaitlistModalShown, setIsWaitlistModalShown] = useState(false)
  const [shouldTriggerSplash, setShouldTriggerSplash] = useState(false)

  const isATCActive = useRef(false)
  const atcButtonRef = useRef<HTMLButtonElement>(null)
  const [root, locale, frame] = useMatches()

  const fetcher = useFetcher()

  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()

  const selectedLocale = root?.data?.selectedLocale
  const { price, compareAtPrice } = getDisplayPrices(defaultVariant, selectedVariant)

  const isAdding = fetcher.state === 'loading' || fetcher.state === 'submitting'
  const hasSelectedVariant = Boolean(selectedVariant)
  const hasSelectedSize = Boolean(selectedSize)
  const isOutOfStock = hasSelectedVariant && !selectedVariant?.availableForSale
  const isNotYetReleased = hasSelectedSize && !hasSelectedVariant
  const shouldNotAddToCart = isOutOfStock || isNotYetReleased || !hasSelectedVariant || isAdding

  useEffect(() => {
    if (isCartOpen || isAdding || !isATCActive.current) return

    setIsCartOpen(true)
    isATCActive.current = false
  }, [isCartOpen, isATCActive, isAdding, setIsCartOpen])

  const lines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant?.id,
          quantity: 1,
        },
        ...additionalLines,
      ]
    : [...additionalLines]

  const displayText = (() => {
    if (varaint === 'product-card') {
      if (!hasSelectedSize || isNotYetReleased || isOutOfStock) return 'Select Size'

      return 'Add To Cart'
    } else {
      if (!hasSelectedSize) return 'Select Size'
      if (isNotYetReleased) return 'Notify Me When Released'
      if (isOutOfStock) return 'Notify Me When Restocked'

      return 'Add To Cart'
    }
  })()

  const handleClick = () => {
    if (isOutOfStock) {
      setIsOOSModalShown(true)
    } else if (isNotYetReleased) {
      setIsWaitlistModalShown(true)
    } else {
      if (hasSelectedSize) {
        isATCActive.current = true
        setShouldTriggerSplash(true)

        dataLayerATC({ ecommerce: frame?.data?.analytics })

        setTimeout(() => {
          setShouldTriggerSplash(false)
        }, 1200)
      } else {
        // trigger invalid animation for atc button
        // since this can be achieve without state, I didn't use state here to reduce rerendering
        const atcButton = atcButtonRef.current
        atcButton?.classList.add(styles.invalid)

        setTimeout(() => {
          atcButton?.classList.remove(styles.invalid)
        }, 1100)
      }
    }
  }

  return (
    <>
      <fetcher.Form action="/api/cart" method="post">
        <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />
        <input type="hidden" name="countryCode" value={selectedLocale.country} />
        {/* TODO: input for analytics data */}

        <ButtonAddToCart
          type={!shouldNotAddToCart ? 'submit' : 'button'}
          className={clsx(styles.atcButton, {
            [styles.success]: isAdding,
          })}
          displayText={displayText}
          price={price}
          compareAtPrice={compareAtPrice}
          isLoading={isAdding}
          isOutOfStock={isOutOfStock || isNotYetReleased}
          onClick={handleClick}
          appendElement={<SplashElement shouldTrigger={shouldTriggerSplash} />}
          ref={atcButtonRef}
          {...props}
        />
      </fetcher.Form>
      {isOOSModalShown && <OutOfStockModal onClose={() => setIsOOSModalShown(false)} />}
      {isWaitlistModalShown && <WaitlistModal onClose={() => setIsWaitlistModalShown(false)} />}
    </>
  )
}

export default ATCButton
