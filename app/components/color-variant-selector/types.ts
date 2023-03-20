import { SwatchSelectorProps } from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import { MouseEventHandler } from 'react'
import { ColorOption } from '~/global-types'

export type ColorVariantSelectorProps = {
  colorOption: Omit<ColorOption, 'handle'>
  size: SwatchSelectorProps['size']
  onClick?: MouseEventHandler<HTMLButtonElement>
}
