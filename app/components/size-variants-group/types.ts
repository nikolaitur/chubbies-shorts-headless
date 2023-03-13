import { HTMLAttributes } from 'react'
import { SizeOption } from '~/global-types'

export type SizeVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  selectedSize?: string | null
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  sizeOptions: SizeOption[]
  variant?: 'product-card' | 'product-box'
  onSelectSize?: (size: string) => void
}
