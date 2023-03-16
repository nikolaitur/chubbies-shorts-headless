import { Cart } from '@shopify/hydrogen/storefront-api-types'
import ButtonCheckout from '@solo-brands/ui-library.ui.atomic.button-checkout'
import OrderSummaryItem from '@solo-brands/ui-library.ui.shared.order-summary-item'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import Link from '~/components/link'
import { getCartCompareAtPrice, getCartLineAttributes, getComputedAmount } from '~/helpers'
import GiftCouponCode from '../gift-coupon-code'
import styles from './styles.module.css'

export type CartSliderOrderSummaryProps = HTMLAttributes<HTMLDivElement> & {
  cart: Cart | null
}

const CartSliderOrderSummary = (
  { cart, ...props }: CartSliderOrderSummaryProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { cost, checkoutUrl, totalQuantity, lines } = cart ?? {}
  const { subtotalAmount, totalAmount } = cost ?? {}

  const hasQuantity = Boolean(totalQuantity)

  const filteredLines = lines?.edges?.filter(
    edge => !getCartLineAttributes(edge?.node?.attributes)?.isGwpProduct,
  )

  const totalCompareAtPrice = filteredLines ? getCartCompareAtPrice(filteredLines) : '0'

  const compareAtPrice =
    parseFloat(totalCompareAtPrice) > 0
      ? {
          amount: totalCompareAtPrice,
          currencyCode: totalAmount?.currencyCode ?? 'USD',
        }
      : undefined

  const totalDiscountPrice = getComputedAmount(
    totalCompareAtPrice,
    totalAmount?.amount ?? 0,
    'subtract',
  )

  const totalDiscount =
    parseFloat(totalDiscountPrice) > 0
      ? {
          amount: totalDiscountPrice,
          currencyCode: totalAmount?.currencyCode ?? 'USD',
        }
      : undefined

  return (
    <div className={styles.orderSummary} ref={ref} {...props}>
      <p className={styles.title}>Order Summary</p>
      <OrderSummaryItem
        brand="chubbies"
        title="Subtotal"
        price={{ amount: subtotalAmount?.amount || '0', currencyCode: 'USD' }}
      />
      {/* TO-DO: Update OrderSummaryItem to have "description" text for "FREE SHIPPING" */}
      <OrderSummaryItem
        brand="chubbies"
        title="Shipping"
        description="Calculated at next step"
        variant="message-positive"
        price={{ amount: '0', currencyCode: 'USD' }}
      />
      {/* {totalDiscount && (
        <OrderSummaryItem
          brand="chubbies"
          title="Discount"
          variant="discount"
          price={totalDiscount}
        />
      )} */}
      {/* TO-DO: Update OrderSummaryItem for coupon codes with close icon*/}
      {/* <OrderSummaryItem
        brand="chubbies"
        title="Gift/Coupon Code"
        variant="discount"
        price={{ amount: '100', currencyCode: 'USD' }}
      /> */}
      <div className={styles.divider} />
      <OrderSummaryItem
        brand="chubbies"
        title="Total"
        variant="total"
        compareAtPrice={compareAtPrice}
        discount={totalDiscount}
        price={totalAmount ?? { amount: '0', currencyCode: 'USD' }}
      />
      <Link to={checkoutUrl || ''} className={styles.button}>
        <ButtonCheckout
          variant="primary"
          size="sm"
          className={styles.button}
          disabled={!hasQuantity}
          withIcon
        >
          Checkout
        </ButtonCheckout>
      </Link>
      <GiftCouponCode />
    </div>
  )
}

export default forwardRef(CartSliderOrderSummary)
