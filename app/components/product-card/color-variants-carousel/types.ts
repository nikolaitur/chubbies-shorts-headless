import { ColorOption } from '~/global-types'

type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type ColorVariantsCarouselProps = {
  colorOptions: ColorOption[]
  size?: Size
  variant?: 'inline' | 'slider'
  onChangeColorOption?: any
}

export type ColorVariantsCarouselInnerProps = {
  colorOptions: ColorOption[]
  size?: Size
  onChangeColorOption?: any
}
