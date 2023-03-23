import { VariantSelectorProps } from '@solo-brands/ui-library.ui.atomic.variant-selector'
import { HTMLAttributes } from 'react'
import { InseamOption } from '~/global-types'

export type InseamVariantSelectorProps = HTMLAttributes<HTMLButtonElement> & {
  size: VariantSelectorProps['size']
  inseamOption: InseamOption
  onSelectInseam?: (inseamValue: number) => void
}
