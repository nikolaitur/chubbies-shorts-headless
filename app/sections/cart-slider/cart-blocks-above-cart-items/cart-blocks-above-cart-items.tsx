import { Metaobject, MetaobjectField } from '@shopify/hydrogen/storefront-api-types'
import { HTMLAttributes } from 'react'
import { CartBlocksAboveCartItemsSettings } from '~/global-types'
import GiftWithPurchase from '../gift-with-purchase'

export type CartBlocksAboveCartItems = HTMLAttributes<HTMLDivElement> & {
  cartBlocksAboveCartItems?: NonNullable<
    NonNullable<CartBlocksAboveCartItemsSettings>['references']
  >['nodes']
}

export type CartSliderBlockProps = HTMLAttributes<HTMLDivElement> & {
  type: string
  fields: MetaobjectField[]
}

const CartSliderBlock = ({ type, fields }: CartSliderBlockProps) => {
  switch (type) {
    case 'gift_with_purchase':
      return <GiftWithPurchase fields={fields} />

    default:
      return null
  }
}

const CartBlocksAboveCartItems = ({
  cartBlocksAboveCartItems,
  ...props
}: CartBlocksAboveCartItems) => {
  return (
    <div {...props}>
      {cartBlocksAboveCartItems?.map((block, index) => (
        <CartSliderBlock key={`${block.type}-${index}`} {...(block as Metaobject)} />
      ))}
    </div>
  )
}

export default CartBlocksAboveCartItems
