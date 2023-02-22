import { HTMLAttributes } from 'react'

export type SizeVariantsGroupProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
}
