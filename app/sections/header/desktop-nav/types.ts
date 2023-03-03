import { Dispatch, HTMLAttributes, SetStateAction } from 'react'

import { MenuFragment, NavCollectionFragment } from '~/graphql/generated'

export type DesktopNavProps = HTMLAttributes<HTMLElement> & {
  menu?: MenuFragment | null
  hoveredMenuTitle: string | null
  setHoveredMenuTitle: Dispatch<SetStateAction<string | null>>
  navImages?: (NavCollectionFragment | null)[] | null
}
