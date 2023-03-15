import { HTMLAttributes, RefObject } from 'react'

export type SignUpModalProps = HTMLAttributes<HTMLDivElement> & {
  openControllerRef: RefObject<HTMLElement>
}
