import { Link } from '@remix-run/react'
import { CurrencyCode } from '@shopify/hydrogen/storefront-api-types'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonCheckout from '@solo-brands/ui-library.ui.atomic.button-checkout'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import { ClientOnly } from 'remix-utils'
import GiftWithPurchase from '~/sections/cart-slider/gift-with-purchase'
import styles from './styles.module.css'
import { CartModalProps } from './types'

const CartModal = ({ isShown = false, ...props }: CartModalProps, ref: Ref<HTMLDivElement>) => (
  <ClientOnly>
    {() => (
      <div
        className={clsx(styles.cartModal, { [styles.showCartModal]: isShown })}
        {...props}
        ref={ref}
      >
        <div className={styles.details}>
          <div className={styles.heading}>
            <p className={styles.title}>
              My Cart <span className={styles.count}>(4)</span>
            </p>
            <Price amount="805.0" currencyCode={'USD' as CurrencyCode} bold />
          </div>
          <div className={styles.shipping}>
            Only <span className={styles.amount}>$10.50</span> left to get free shipping
          </div>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} variant="neutral" size="xs">
              View Cart
            </Button>
            <ButtonCheckout withIcon size="xs" className={styles.button}>
              Checkout
            </ButtonCheckout>
          </div>
        </div>
        <div className={styles.rewards}>
          <div className={styles.message}>Collect 65 rewards points with your order 🤑</div>
          <div className={styles.cta}>
            <Link to="/" className={styles.link}>
              Sign In
            </Link>{' '}
            or{' '}
            <Link to="/" className={styles.link}>
              Sign Up
            </Link>{' '}
            before checking out
          </div>
        </div>
        <div className={styles.gwp}>
          <GiftWithPurchase />
        </div>
      </div>
    )}
  </ClientOnly>
)

export default forwardRef(CartModal)
