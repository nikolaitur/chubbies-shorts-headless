import { HTMLAttributes } from 'react'
import { MenuItemFragment } from '~/graphql/generated'

export type MobileMenuTypes = HTMLAttributes<HTMLElement> & {
  item?: MenuItemFragment | null
  onOpen: () => void
}
