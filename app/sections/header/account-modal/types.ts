import { HTMLAttributes, RefObject } from 'react'

export type AccountModalProps = HTMLAttributes<HTMLDivElement> & {
  hoverControllerRef: RefObject<HTMLElement>
  toggleControllerRef: RefObject<HTMLElement>
}
