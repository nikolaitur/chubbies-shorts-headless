import { HTMLAttributes } from 'react'
import { MenuFragment, NavCollectionFragment } from '~/graphql/generated'

export type HeaderNavigationProps = HTMLAttributes<HTMLElement> & {
  menu?: MenuFragment | null
  navImages?: NavCollectionFragment[] | null
}
