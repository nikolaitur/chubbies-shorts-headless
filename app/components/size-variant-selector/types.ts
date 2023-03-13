import { VariantSelectorProps } from '@solo-brands/ui-library.ui.atomic.variant-selector'
import { HTMLAttributes } from 'react'
import { SizeOption } from '~/global-types'

export type SizeVariantSelectorProps = HTMLAttributes<HTMLButtonElement> & {
  size: VariantSelectorProps['size']
  selectedSize?: string | null
  sizeOption: SizeOption
  onSelectSize?: (size: string) => void
}
