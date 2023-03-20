import { HTMLAttributes } from 'react'
import { CartBlocksAboveCartItemsSettings, ImageData } from '~/global-types'
import { CollectionNavImages, MenuFragment } from '~/graphql/generated'

export type HeaderNavigationProps = HTMLAttributes<HTMLElement> & {
  menu?: MenuFragment | null
  navImages?: CollectionNavImages['nodes']
  brandLogo?: ImageData
  cartBlocksAboveCartItems: CartBlocksAboveCartItemsSettings
}
