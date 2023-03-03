import { HTMLAttributes } from 'react'

export type NotifyModalProps = HTMLAttributes<HTMLDivElement> & {
  action: string
  heading: string
  text: string
  submitButtonText: string
  onClose: () => void
}
