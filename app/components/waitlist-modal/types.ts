import { HTMLAttributes } from 'react'

export type WaitlistModalProps = HTMLAttributes<HTMLDivElement> & {
  onClose: () => void
}
