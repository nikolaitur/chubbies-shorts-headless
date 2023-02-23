import { CurrencyCode } from '@shopify/hydrogen/storefront-api-types'
import ButtonCheckout from '@solo-brands/ui-library.ui.atomic.button-checkout'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import styles from './styles.module.css'

export type CartSliderStickyCheckoutProps = HTMLAttributes<HTMLDivElement>

const CartSliderStickyCheckout = (
  { ...props }: CartSliderStickyCheckoutProps,
  ref: Ref<HTMLDivElement>,
) => {
  // TO-DO: Restructure logic here

  return (
    <div className={styles.checkout} ref={ref} {...props}>
      <div className={styles.details}>
        <p className={styles.title}>
          My Cart <span>(4)</span>
        </p>
        <div className={styles.priceContainer}>
          <Price amount="845.0" currencyCode={'USD' as CurrencyCode} />
          <p className={styles.message}>+ free 1-day shipping</p>
        </div>
      </div>
      <ButtonCheckout withIcon size="sm" className={styles.button}>
        CHECKOUT
      </ButtonCheckout>
    </div>
  )
}

export default forwardRef(CartSliderStickyCheckout)
