import { HTMLAttributes } from 'react'
import { CartBlocksAboveCartItemsSettings } from '~/global-types'

export type CartModalProps = HTMLAttributes<HTMLDivElement> & {
  isShown?: boolean
  cartBlocksAboveCartItems: CartBlocksAboveCartItemsSettings
}
