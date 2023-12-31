import { SwatchSelectorProps } from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import { ColorOption } from '~/global-types'

export type ColorVariantSelectorProps = {
  colorOption: Omit<ColorOption, 'handle'>
  size: SwatchSelectorProps['size']
  onSelectColor?: (color: string) => void
  // temporary prop, should migrate to onSelectColor
  onProductCardClick?: () => void
}
