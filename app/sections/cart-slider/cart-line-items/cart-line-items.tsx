import { Cart } from '@shopify/hydrogen/storefront-api-types'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import { useCartActions } from '~/components/cart-context/cart-context'
import CartLineItem from '../cart-line-item/cart-line-item'
import styles from './styles.module.css'

export type CartLineItemsProps = HTMLAttributes<HTMLElement> & {
  lines?: Cart['lines']
  totalQuantity?: number
}

const CartLineItems = (
  { lines, totalQuantity = 0, ...props }: CartLineItemsProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { setIsCartOpen } = useCartActions()

  const { edges } = lines ?? {}

  return (
    <div className={styles.cartLineItems} ref={ref} {...props}>
      <div className={styles.lineItemsHeader}>
        <div className={styles.count}>
          Items <span>({totalQuantity})</span>
        </div>
        <button onClick={() => setIsCartOpen(false)} className={styles.link}>
          Keep Shopping
        </button>
      </div>
      <div className={styles.itemList}>
        {edges?.map(({ node }) => (
          <CartLineItem key={node.id} line={node} />
        ))}
      </div>
    </div>
  )
}

export default forwardRef(CartLineItems)
