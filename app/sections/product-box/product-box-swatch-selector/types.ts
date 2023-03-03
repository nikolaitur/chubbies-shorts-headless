import { SwatchSelectorProps } from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import { ColorOption } from '~/global-types'

export type ProductBoxSwatchSelectorProps = {
  colorOption: Omit<ColorOption, 'handle'>
  size: SwatchSelectorProps['size']
}
