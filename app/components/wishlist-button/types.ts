import { ButtonIconProps } from '@solo-brands/ui-library.ui.atomic.button-icon'

export type WishlistButtonProps = Omit<ButtonIconProps, 'icon'> & {
  productId?: string
  variantId?: string
}
