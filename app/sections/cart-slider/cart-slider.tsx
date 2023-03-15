import { useMatches } from '@remix-run/react'
import clsx from 'clsx'
import { forwardRef, HTMLAttributes, Ref, useEffect } from 'react'
import Backdrop from '~/components/backdrop'
import { useCartActions, useCartState } from '~/components/cart-context/cart-context'
import { dataLayerViewCart } from '~/utils/dataLayer'
import CartLineItems from './cart-line-items'
import CartSliderEmptyMessage from './cart-slider-empty-message'
import CartSliderHeader from './cart-slider-header'
import CartSliderOrderSummary from './cart-slider-order-summary'
import CartSliderStickyCheckout from './cart-slider-sticky-checkout'
import GiftWithPurchase from './gift-with-purchase'
import PaymentInformation from './payment-information'
import styles from './styles.module.css'

export type CartSliderProps = HTMLAttributes<HTMLDivElement>

interface CartLineItem {
  node: {
    merchandise: {
      id: string
      sku: string
      product: {
        title: string
      }
      price: {
        amount: string
      }
    }
    quantity: number
  }
}

const CartSlider = ({ ...props }: CartSliderProps, ref: Ref<HTMLDivElement>) => {
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()
  const [root] = useMatches()

  const cart = root.data.cart ?? {}
  const { lines, totalQuantity } = cart
  const hasCartLines = Boolean(totalQuantity)

  useEffect(() => {
    const ecommerce = {
      ecommerce: {
        items: lines?.edges?.map((item: CartLineItem, index: number) => {
          return {
            index: index + 1,
            price: parseFloat(item?.node?.merchandise?.price?.amount),
            quantity: item?.node?.quantity,
            item_id: item?.node?.merchandise.sku,
            item_name: item?.node?.merchandise?.product?.title,
            item_brand: 'Chubbies',
            item_variant: item?.node?.merchandise.id,
          }
        }),
        currency: 'USD',
        view_cart_type: 'Cart Preview',
      },
    }

    dataLayerViewCart({ ecommerce })
  }, [lines?.edges])

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
