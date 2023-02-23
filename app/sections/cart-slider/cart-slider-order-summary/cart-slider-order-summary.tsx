import ButtonCheckout from '@solo-brands/ui-library.ui.atomic.button-checkout'
import OrderSummaryItem from '@solo-brands/ui-library.ui.shared.order-summary-item'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import GiftCouponCode from '../gift-coupon-code'
import styles from './styles.module.css'

export type CartSliderOrderSummaryProps = HTMLAttributes<HTMLDivElement>

const CartSliderOrderSummary = (
  { ...props }: CartSliderOrderSummaryProps,
  ref: Ref<HTMLDivElement>,
) => {
  // TO-DO: Destructure logic here

  return (
    <div className={styles.orderSummary} ref={ref} {...props}>
      <p className={styles.title}>Order Summary</p>
      <OrderSummaryItem title="Subtotal" price={{ amount: '1395.0', currencyCode: 'USD' }} />
      {/* TO-DO: Update OrderSummaryItem to have "description" text for "FREE SHIPPING" */}
      <OrderSummaryItem
        title="Shipping"
        variant="message-positive"
        price={{ amount: '0', currencyCode: 'USD' }}
      />
      <OrderSummaryItem
        title="Discount"
        variant="discount"
        price={{ amount: '100', currencyCode: 'USD' }}
      />
      {/* TO-DO: Update OrderSummaryItem for coupon codes with close icon*/}
      <OrderSummaryItem
        title="Gift/Coupon Code"
        variant="discount"
        price={{ amount: '100', currencyCode: 'USD' }}
      />
      <div className={styles.divider} />
      <OrderSummaryItem
        title="Total"
        variant="total"
        compareAtPrice={{ amount: '2000.0', currencyCode: 'USD' }}
        discount={{ amount: '500.0', currencyCode: 'USD' }}
        message="Order now and save $10!"
        price={{ amount: '1395.0', currencyCode: 'USD' }}
      />
      <ButtonCheckout withIcon size="sm" className={styles.button}>
        CHECKOUT
      </ButtonCheckout>
      <GiftCouponCode />
    </div>
  )
}

export default forwardRef(CartSliderOrderSummary)
