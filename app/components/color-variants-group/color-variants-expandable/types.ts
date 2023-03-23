import { ColorOption } from '~/global-types'
import { ColorVariantsGroupTypeProps } from '../types'

export type ColorVariantsExpandableProps = {
  colorOptions: ColorOption[]
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  type?: ColorVariantsGroupTypeProps
}
