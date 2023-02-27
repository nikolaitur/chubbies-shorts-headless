import { CartLineInput, ProductVariant } from '@shopify/hydrogen/storefront-api-types'

export type ATCButtonProps = {
  defaultVariant: ProductVariant
  selectedVariant?: ProductVariant | null
  additionalLines?: CartLineInput[]
}
