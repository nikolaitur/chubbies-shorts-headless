import { ReactNode } from 'react'
import { ColorOption } from '~/global-types'
import { ColorVariantsGroupTypeProps } from '../types'

type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type ColorVariantsCarouselProps = {
  colorOptions: ColorOption[]
  size?: Size
  variant?: 'inline' | 'slider'
  type?: ColorVariantsGroupTypeProps
}

export type ColorVariantsCarouselInnerProps = {
  colorOptions: ColorOption[]
  size?: Size
  type?: ColorVariantsGroupTypeProps
}

export type LinkWrapperProps = {
  shouldWrap: boolean
  children: ReactNode
  handle?: string
  colorOptions: ColorOption[]
}
