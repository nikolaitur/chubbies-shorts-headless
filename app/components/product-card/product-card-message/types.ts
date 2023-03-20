import { HTMLAttributes } from 'react'

export type ProductCardMessageProps = HTMLAttributes<HTMLDivElement> & {
  tags: string[] | undefined | null
}
