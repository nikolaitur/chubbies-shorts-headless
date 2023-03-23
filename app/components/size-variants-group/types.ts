import { HTMLAttributes, ReactNode } from 'react'
import { SizeOption } from '~/global-types'

export type SizeVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  selectedSize?: string | null
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  sizeOptions: SizeOption[]
  variant?: 'default' | 'product-box'
  onSelectSize?: (size: string) => void
}

export type LinkWrapperProps = {
  shouldWrap: boolean
  children: ReactNode
  optionName: string
}
