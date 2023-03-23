import { HTMLAttributes } from 'react'
import { ColorOption, ColorOptionsByGroup } from '~/global-types'

export type ColorVariantsGroupTypeProps = 'product-box' | 'default'

export type ColorVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  colorOptionsByGroup: ColorOptionsByGroup | null | undefined
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'inline' | 'slider' | 'expandable'
  type?: ColorVariantsGroupTypeProps
}

export type ColorGroupProps = Omit<ColorVariantsGroupProps, 'colorOptionsByGroup'> & {
  groupName: string
  colorOptions: ColorOption[]
  type?: ColorVariantsGroupTypeProps
}
