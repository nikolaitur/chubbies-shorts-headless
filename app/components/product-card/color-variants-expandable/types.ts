import { ColorOption } from '~/global-types'

export type ColorVariantsExpandableProps = {
  colorOptions: ColorOption[] // type not yet known
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
}
