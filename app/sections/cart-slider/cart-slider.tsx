import clsx from 'clsx'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import Backdrop from '~/components/backdrop'
import CartSliderEmptyMessage from './cart-slider-empty-message'
import CartSliderHeader from './cart-slider-header'
import CartSliderOrderSummary from './cart-slider-order-summary'
import CartSliderStickyCheckout from './cart-slider-sticky-checkout'
import GiftWithPurchase from './gift-with-purchase'
import PaymentInformation from './payment-information'
import styles from './styles.module.css'

export type CartSliderProps = HTMLAttributes<HTMLDivElement> & {
  isCartOpen?: boolean
}

const CartSlider = (
  { isCartOpen = false, ...props }: CartSliderProps,
  ref: Ref<HTMLDivElement>,
) => {
  // TO-DO: Cart state logic
  const onClose = () => {}

  // TO-DO: Line item edit logic
  const onEditClose = () => {}

  return (
    <div className={styles.cartSlider} ref={ref} {...props}>
      <div className={clsx(styles.container, { [styles.isCartOpen]: isCartOpen })}>
        <CartSliderHeader onCartClose={onClose} onEditClose={onEditClose} />
        <div className={styles.itemContainer}>
          <GiftWithPurchase />
          <CartSliderEmptyMessage />
          {/* TO-DO: Implement <CartItems> here */}
          <div className={styles.items}>
            items
            <br />
            items
            <br />
            items
            <br />
          </div>
          <CartSliderOrderSummary />
          <PaymentInformation />
        </div>
        <CartSliderStickyCheckout />
      </div>
      <Backdrop isShown={false} onClick={onClose} />
    </div>
  )
}

export default forwardRef(CartSlider)
