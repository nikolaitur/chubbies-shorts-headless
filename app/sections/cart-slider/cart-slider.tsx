import { useMatches } from '@remix-run/react'
import clsx from 'clsx'
import { forwardRef, HTMLAttributes, Ref, useEffect } from 'react'
import Backdrop from '~/components/backdrop'
import { useCartActions, useCartState } from '~/components/cart-context/cart-context'
import { FRAME_ROUTE_ID } from '~/constants'
import { CartBlocksAboveCartItemsSettings } from '~/global-types'
import { GlobalSettingsQuery } from '~/graphql/generated'
import { dataLayerViewCart } from '~/utils/dataLayer'
import CartBlocksAboveCartItems from './cart-blocks-above-cart-items'
import CartLineItems from './cart-line-items'
import CartShippingTiers from './cart-shipping-tiers'
import CartSliderEmptyMessage from './cart-slider-empty-message'
import CartSliderHeader from './cart-slider-header'
import CartSliderOrderSummary from './cart-slider-order-summary'
import CartSliderStickyCheckout from './cart-slider-sticky-checkout'
import PaymentInformation from './payment-information'
import styles from './styles.module.css'
import { generateCartAnalytics } from '~/helpers'
export type CartSliderProps = HTMLAttributes<HTMLDivElement> & {
  shippingTiers: NonNullable<GlobalSettingsQuery['globalSettings']>['shippingTiers']
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
  { cartBlocksAboveCartItems, shippingTiers, ...props }: CartSliderProps,
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
  const flattenedShipingTiers = shippingTiers?.references?.nodes

  useEffect(() => {
    if (isCartOpen && lines?.edges)
      dataLayerViewCart({ ecommerce: generateCartAnalytics(lines?.edges) })
  }, [lines?.edges, isCartOpen])

  return (
    <div className={styles.cartSlider} ref={ref} {...props}>
      <div className={clsx(styles.container, { [styles.isCartOpen]: isCartOpen })}>
        <CartSliderHeader onCartClose={() => setIsCartOpen(false)} title={cartTitle?.value} />
        <div className={styles.itemContainer}>
          <CartShippingTiers shippingTiers={flattenedShipingTiers} />
          <CartBlocksAboveCartItems cartBlocksAboveCartItems={flattenedCartBlocksAboveCartItems} />
          {hasCartLines ? (
            <>
              <CartLineItems lines={lines} totalQuantity={totalQuantity} />
              <CartSliderOrderSummary cart={cart} />
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
          <PaymentInformation />
        </div>
        <CartSliderStickyCheckout cart={cart} />
      </div>
      <Backdrop isShown={isCartOpen} onClick={() => setIsCartOpen(false)} />
    </div>
  )
}

export default forwardRef(CartSlider)
