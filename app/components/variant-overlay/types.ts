import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { HTMLAttributes, RefObject } from 'react'
import { SizeOption } from '~/global-types'

export type VariantOverlayProps = HTMLAttributes<HTMLDivElement> & {
  hoverControllerRef?: RefObject<HTMLElement>
  toggleControllerRef?: RefObject<HTMLElement>
  sizeOptions: SizeOption[] | null
  size?: 'md' | 'sm' | 'xs'
  variant?: 'primary' | 'secondary'
  defaultVariant: ProductVariant
  selectedVariant: ProductVariant
  selectedSize: string | null
  onSelectSize?: (size: string) => void
}
