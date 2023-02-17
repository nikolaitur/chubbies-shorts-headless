import { HTMLAttributes } from 'react'

export type LinkProps = HTMLAttributes<HTMLLIElement> & {
  title: string
  isMegaMenu: boolean
}
