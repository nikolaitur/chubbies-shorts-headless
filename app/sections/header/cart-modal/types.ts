import { HTMLAttributes } from 'react'
import { GlobalSettings } from '~/graphql/generated'

export type CartModalProps = HTMLAttributes<HTMLDivElement> & {
  isShown?: boolean
  cartBlocksAboveCartItems: NonNullable<
    GlobalSettings['globalSettings']
  >['cartBlocksAboveCartItems']
}
