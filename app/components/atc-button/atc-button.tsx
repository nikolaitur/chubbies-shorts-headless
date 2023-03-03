import { useFetcher, useSearchParams } from '@remix-run/react'
import ButtonAddToCart from '@solo-brands/ui-library.ui.atomic.button-add-to-cart'
import { useEffect, useRef, useState } from 'react'
import { SIZE_OPTION_NAME } from '~/constants'
import { CartAction } from '~/global-types'
import { getDisplayPrices } from '~/helpers'
import { useCartActions, useCartState } from '../cart-context/cart-context'
import OutOfStockModal from '../out-of-stock-modal'
import WaitlistModal from '../waitlist-modal'
import styles from './styles.module.css'
import { ATCButtonProps } from './types'

const ATCButton = ({ defaultVariant, selectedVariant, additionalLines = [] }: ATCButtonProps) => {
  const [isOOSModalShown, setIsOOSModalShown] = useState(false)
  const [isWaitlistModalShown, setIsWaitlistModalShown] = useState(false)
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()
  const fetcher = useFetcher()
  const [searchParams] = useSearchParams()
  const isATCActive = useRef(false)

  const { price, compareAtPrice } = getDisplayPrices(defaultVariant, selectedVariant)
  const isAdding = fetcher.state === 'loading' || fetcher.state === 'submitting'
  const hasSelectedVariant = Boolean(selectedVariant)
  const hasSelectedSize = Boolean(searchParams.get(SIZE_OPTION_NAME))
  const isOutOfStock = hasSelectedVariant && !selectedVariant?.availableForSale
  const isNotYetReleased = hasSelectedSize && !hasSelectedVariant
  const shouldAddToCart = !isOutOfStock && !isNotYetReleased

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
    if (!hasSelectedSize) return 'Select Size'
    if (isNotYetReleased) return 'Notify Me When Released'
    if (isOutOfStock) return 'Notify Me When Restocked'

    return 'Add To Cart'
  })()

  const handleClick = () => {
    if (isOutOfStock) {
      setIsOOSModalShown(true)
    } else if (isNotYetReleased) {
      setIsWaitlistModalShown(true)
    } else {
      isATCActive.current = true
    }
  }

  return (
    <>
      <fetcher.Form action="/api/cart" method="post">
        <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />
        {/* TODO: input for analytics data & locale */}
        <ButtonAddToCart
          type={shouldAddToCart ? 'submit' : 'button'}
          className={styles.atcButton}
          price={price}
          compareAtPrice={compareAtPrice}
          disabled={!hasSelectedSize}
          isLoading={isAdding}
          isOutOfStock={isOutOfStock || isNotYetReleased}
          onClick={handleClick}
        >
          {displayText}
        </ButtonAddToCart>
      </fetcher.Form>
      {isOOSModalShown && <OutOfStockModal onClose={() => setIsOOSModalShown(false)} />}
      {isWaitlistModalShown && <WaitlistModal onClose={() => setIsWaitlistModalShown(false)} />}
    </>
  )
}

export default ATCButton
