import { HTMLAttributes } from 'react'

export type OutOfStockModalProps = HTMLAttributes<HTMLDivElement> & {
  onClose: () => void
}
