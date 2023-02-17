import { HTMLAttributes } from 'react'

export type ColorVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'inline' | 'slider' | 'expandable'
}
