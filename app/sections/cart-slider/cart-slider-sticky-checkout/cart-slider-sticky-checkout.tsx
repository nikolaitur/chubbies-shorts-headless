import { Cart } from '@shopify/hydrogen/storefront-api-types'
import ButtonCheckout from '@solo-brands/ui-library.ui.atomic.button-checkout'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import { useCartState } from '~/components/cart-context/cart-context'
import Link from '~/components/link'
import styles from './styles.module.css'

export type CartSliderStickyCheckoutProps = HTMLAttributes<HTMLDivElement> & {
  cart: Cart | null
}

const CartSliderStickyCheckout = (
  { cart, ...props }: CartSliderStickyCheckoutProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { cost, checkoutUrl, totalQuantity } = cart ?? {}
  const { totalAmount } = cost ?? {}
  const { freeShippingText } = useCartState()

  const hasQuantity = Boolean(totalQuantity)

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
          {freeShippingText && hasQuantity && <p className={styles.message}>{freeShippingText}</p>}
        </div>
      </div>
      <Link to={checkoutUrl || ''} className={styles.button}>
        <ButtonCheckout
          variant="primary"
          size="sm"
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
