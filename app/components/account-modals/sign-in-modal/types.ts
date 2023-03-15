import { HTMLAttributes, RefObject } from 'react'

export type SignInModalProps = HTMLAttributes<HTMLDivElement> & {
  openControllerRef: RefObject<HTMLElement>
}
