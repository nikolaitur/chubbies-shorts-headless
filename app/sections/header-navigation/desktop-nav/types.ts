import { HTMLAttributes } from 'react'
import { MenuFragment, NavCollectionFragment } from '~/graphql/generated'

export type DesktopNavProps = HTMLAttributes<HTMLElement> & {
  menu?: MenuFragment | null
  navImages?: (NavCollectionFragment | null | undefined)[] | null | undefined
}
