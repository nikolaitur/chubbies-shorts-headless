import { useFetcher } from '@remix-run/react'
import ButtonAddToCart from '@solo-brands/ui-library.ui.atomic.button-add-to-cart'
import Spinner from '@solo-brands/ui-library.ui.atomic.spinner'
import { useEffect, useRef } from 'react'
import { CartAction } from '~/global-types'
import { getDisplayPrices } from '~/helpers'
import { useCartActions, useCartState } from '../cart-context/cart-context'
import styles from './styles.module.css'
import { ATCButtonProps } from './types'

const ATCButton = ({ defaultVariant, selectedVariant, additionalLines = [] }: ATCButtonProps) => {
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()
  const fetcher = useFetcher()
  const isATCActive = useRef(false)
  const isAdding = fetcher.state === 'loading' || fetcher.state === 'submitting'
  const { price, compareAtPrice } = getDisplayPrices(defaultVariant, selectedVariant)

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

  return (
    <fetcher.Form action="/api/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {/* TODO: input for analytics data & locale */}
      <ButtonAddToCart
        className={styles.atcButton}
        price={price}
        compareAtPrice={compareAtPrice}
        disabled={Boolean(!selectedVariant) || isAdding}
        onClick={() => (isATCActive.current = true)}
      >
        {/* Temporary loading state, it should be done inside UI Library */}
        {isAdding && (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
        {selectedVariant ? 'Add To Cart' : 'Select Size'}
      </ButtonAddToCart>
    </fetcher.Form>
  )
}

export default ATCButton
