import { CartLineInput, ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { ButtonAddToCartProps } from '@solo-brands/ui-library.ui.atomic.button-add-to-cart'

export type ATCButtonProps = Pick<ButtonAddToCartProps, 'size' | 'withPrice'> & {
  variant?: 'default' | 'product-card'
  selectedSize: string | null
  defaultVariant: ProductVariant
  selectedVariant: ProductVariant | null
  additionalLines?: CartLineInput[]
}
