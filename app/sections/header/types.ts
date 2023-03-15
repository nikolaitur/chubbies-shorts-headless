import { HTMLAttributes } from 'react'
import { GlobalSettings, Image, MenuFragment, NavCollectionFragment } from '~/graphql/generated'

export type HeaderNavigationProps = HTMLAttributes<HTMLElement> & {
  menu?: MenuFragment | null
  navImages?: NavCollectionFragment[] | null
  brandLogo?: Image | null
  cartBlocksAboveCartItems: NonNullable<
    GlobalSettings['globalSettings']
  >['cartBlocksAboveCartItems']
}
