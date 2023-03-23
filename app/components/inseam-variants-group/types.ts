import { HTMLAttributes, ReactNode } from 'react'
import { ImageData, InseamOption } from '~/global-types'

export type InseamVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  inseamOptions: InseamOption[] | null | undefined
  inseamImage?: ImageData
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'default' | 'product-box'
  onSelectInseam?: (inseamValue: number) => void
}

export type LinkWrapperProps = {
  shouldWrap: boolean
  children: ReactNode
  handle?: string
}
