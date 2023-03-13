import { HTMLAttributes } from 'react'

export type ProductBoxSizeVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
}
