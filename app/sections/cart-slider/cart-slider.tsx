import { useMatches } from '@remix-run/react'
import clsx from 'clsx'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import Backdrop from '~/components/backdrop'
import { useCartActions, useCartState } from '~/components/cart-context/cart-context'
import { GlobalSettings } from '~/graphql/generated'
import CartBlocksAboveCartItems from './cart-blocks-above-cart-items'
import CartLineItems from './cart-line-items'
import CartSliderEmptyMessage from './cart-slider-empty-message'
import CartSliderHeader from './cart-slider-header'
import CartSliderOrderSummary from './cart-slider-order-summary'
import CartSliderStickyCheckout from './cart-slider-sticky-checkout'
import PaymentInformation from './payment-information'
import styles from './styles.module.css'

export type CartSliderProps = HTMLAttributes<HTMLDivElement> & {
  cartBlocksAboveCartItems: NonNullable<
    GlobalSettings['globalSettings']
  >['cartBlocksAboveCartItems']
}

const CartSlider = (
  { cartBlocksAboveCartItems, ...props }: CartSliderProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()
  const [root] = useMatches()

  const cart = root.data.cart ?? {}

  const { lines, totalQuantity } = cart
  const hasCartLines = Boolean(totalQuantity)

  const flattenedCartBlocksAboveCartItems = cartBlocksAboveCartItems?.references?.nodes

  return (
    <div className={styles.cartSlider} ref={ref} {...props}>
      <div className={clsx(styles.container, { [styles.isCartOpen]: isCartOpen })}>
        <CartSliderHeader onCartClose={() => setIsCartOpen(false)} />
        <div className={styles.itemContainer}>
          {hasCartLines ? (
            <>
              <CartBlocksAboveCartItems
                cartBlocksAboveCartItems={flattenedCartBlocksAboveCartItems}
              />
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
