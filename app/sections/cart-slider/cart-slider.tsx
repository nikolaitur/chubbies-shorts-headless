import { useMatches } from '@remix-run/react'
import clsx from 'clsx'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import Backdrop from '~/components/backdrop'
import { useCartActions, useCartState } from '~/components/cart-context/cart-context'
import CartLineItems from './cart-line-items'
import CartSliderEmptyMessage from './cart-slider-empty-message'
import CartSliderHeader from './cart-slider-header'
import CartSliderOrderSummary from './cart-slider-order-summary'
import CartSliderStickyCheckout from './cart-slider-sticky-checkout'
import GiftWithPurchase from './gift-with-purchase'
import PaymentInformation from './payment-information'
import styles from './styles.module.css'

export type CartSliderProps = HTMLAttributes<HTMLDivElement>

const CartSlider = ({ ...props }: CartSliderProps, ref: Ref<HTMLDivElement>) => {
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()
  const [root] = useMatches()

  const cart = root.data.cart ?? {}

  const { lines, totalQuantity } = cart
  const hasCartLines = Boolean(totalQuantity)

  return (
    <div className={styles.cartSlider} ref={ref} {...props}>
      <div className={clsx(styles.container, { [styles.isCartOpen]: isCartOpen })}>
        <CartSliderHeader onCartClose={() => setIsCartOpen(false)} />
        <div className={styles.itemContainer}>
          {hasCartLines ? (
            <>
              <GiftWithPurchase />
              <CartLineItems lines={lines} totalQuantity={totalQuantity} />
              <CartSliderOrderSummary cart={cart} />
              <PaymentInformation />
            </>
          ) : (
            <CartSliderEmptyMessage />
          )}
        </div>
        <CartSliderStickyCheckout cart={cart} />
      </div>
      <Backdrop isShown={isCartOpen} onClick={() => setIsCartOpen(false)} />
    </div>
  )
}

export default forwardRef(CartSlider)
