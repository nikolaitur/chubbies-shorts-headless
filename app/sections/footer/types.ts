import { HTMLAttributes } from 'react'
import { MenuFragment } from '~/graphql/generated'

export type FooterProps = HTMLAttributes<HTMLElement> & {
  menu?: MenuFragment | null
  legalLinks?: MenuFragment | null
}
