import { HTMLAttributes } from 'react'

export type NavItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  url: string
  isActive?: boolean
}
