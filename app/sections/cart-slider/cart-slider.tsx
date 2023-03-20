import { useMatches } from '@remix-run/react'
import clsx from 'clsx'
import { forwardRef, HTMLAttributes, Ref, useEffect } from 'react'
import Backdrop from '~/components/backdrop'
import { useCartActions, useCartState } from '~/components/cart-context/cart-context'
import { FRAME_ROUTE_ID } from '~/constants'
import { CartBlocksAboveCartItemsSettings } from '~/global-types'
import { dataLayerViewCart } from '~/utils/dataLayer'
import CartBlocksAboveCartItems from './cart-blocks-above-cart-items'
import CartLineItems from './cart-line-items'
import CartSliderEmptyMessage from './cart-slider-empty-message'
import CartSliderHeader from './cart-slider-header'
import CartSliderOrderSummary from './cart-slider-order-summary'
import CartSliderStickyCheckout from './cart-slider-sticky-checkout'
import PaymentInformation from './payment-information'
import styles from './styles.module.css'

export type CartSliderProps = HTMLAttributes<HTMLDivElement> & {
  cartBlocksAboveCartItems: CartBlocksAboveCartItemsSettings
}

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

const CartSlider = (
  { cartBlocksAboveCartItems, ...props }: CartSliderProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()
  const [root, ...matches] = useMatches()

  const frameMatch = matches.find(match => match.id === FRAME_ROUTE_ID)?.data ?? {}

  const { cartSettings } = frameMatch || {}
  const {
    cartTitle,
    cartKeepShoppingText,
    cartKeepShoppingLink,
    cartEmptyCartEmoji,
    cartEmptyMessage,
    cartEmptyButtonText,
    cartEmptyButtonCtaLink,
  } = cartSettings || {}

  const cart = root.data.cart ?? {}
  const { lines, totalQuantity } = cart
  const hasCartLines = Boolean(totalQuantity)

  const flattenedCartBlocksAboveCartItems = cartBlocksAboveCartItems?.references?.nodes
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
        <CartSliderHeader onCartClose={() => setIsCartOpen(false)} title={cartTitle?.value} />
        <div className={styles.itemContainer}>
          {hasCartLines ? (
            <>
              <CartBlocksAboveCartItems
                cartBlocksAboveCartItems={flattenedCartBlocksAboveCartItems}
              />
              <CartLineItems
                lines={lines}
                totalQuantity={totalQuantity}
                textData={{ link: cartKeepShoppingLink?.value, text: cartKeepShoppingText?.value }}
              />
              <CartSliderOrderSummary cart={cart} />
              <PaymentInformation />
            </>
          ) : (
            <CartSliderEmptyMessage
              textData={{
                emoji: cartEmptyCartEmoji?.value,
                message: cartEmptyMessage?.value,
                text: cartEmptyButtonText?.value,
                link: cartEmptyButtonCtaLink?.value,
              }}
            />
          )}
        </div>
        <CartSliderStickyCheckout cart={cart} />
      </div>
      <Backdrop isShown={isCartOpen} onClick={() => setIsCartOpen(false)} />
    </div>
  )
}

export default forwardRef(CartSlider)
