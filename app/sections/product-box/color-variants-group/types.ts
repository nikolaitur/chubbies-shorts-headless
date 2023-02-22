import { HTMLAttributes } from 'react'
import { ColorOption } from '~/global-types'

export type ColorVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'inline' | 'slider' | 'expandable'
}

export type ColorGroupProps = ColorVariantsGroupProps & {
  groupName: string
  colorOptions: ColorOption[]
  selectedColorName: string
}
