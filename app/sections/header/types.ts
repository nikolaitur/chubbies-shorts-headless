import { HTMLAttributes } from 'react'
import { Image, MenuFragment, NavCollectionFragment } from '~/graphql/generated'

export type HeaderNavigationProps = HTMLAttributes<HTMLElement> & {
  menu?: MenuFragment | null
  navImages?: NavCollectionFragment[] | null
  brandLogo?: Image | null
}
