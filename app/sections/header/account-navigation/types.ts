import { HTMLAttributes, RefObject } from 'react'

export type AccountNavigationProps = HTMLAttributes<HTMLDivElement> & {
  hoverControllerRef: RefObject<HTMLElement>
  toggleControllerRef: RefObject<HTMLElement>
}
