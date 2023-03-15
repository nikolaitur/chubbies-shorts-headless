import { HTMLAttributes, RefObject } from 'react'

export type ResetPasswordModalProps = HTMLAttributes<HTMLDivElement> & {
  openControllerRef: RefObject<HTMLElement>
}
