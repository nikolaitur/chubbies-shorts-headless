import { Link } from '@remix-run/react'
import { Cart } from '@shopify/hydrogen/storefront-api-types'
import ButtonCheckout from '@solo-brands/ui-library.ui.atomic.button-checkout'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import { getCartCompareAtPrice, getComputedAmount } from '~/helpers'
import styles from './styles.module.css'

export type CartSliderStickyCheckoutProps = HTMLAttributes<HTMLDivElement> & {
  cart: Cart | null
}

const CartSliderStickyCheckout = (
  { cart, ...props }: CartSliderStickyCheckoutProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { cost, checkoutUrl, totalQuantity, lines } = cart ?? {}
  const { totalAmount } = cost ?? {}

  const hasQuantity = Boolean(totalQuantity)

  const totalCompareAtPrice = lines ? getCartCompareAtPrice(lines) : '0'

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
    <div className={styles.checkout} ref={ref} {...props}>
      <div className={styles.details}>
        <p className={styles.title}>
          My Cart <span>({totalQuantity})</span>
        </p>
        <div className={styles.priceContainer}>
          <Price
            amount={totalAmount?.amount ?? '0'}
            currencyCode={totalAmount?.currencyCode ?? 'USD'}
          />
          <p className={styles.message}>+ free 1-day shipping</p>
        </div>
      </div>
      <Link to={checkoutUrl || ''} className={styles.button}>
        <ButtonCheckout
          variant="primary"
          size="md"
          className={styles.button}
          disabled={!hasQuantity}
          withIcon
        >
          CHECKOUT
        </ButtonCheckout>
      </Link>
    </div>
  )
}

export default forwardRef(CartSliderStickyCheckout)
