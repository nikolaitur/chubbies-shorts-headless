import { LinkProps } from '@remix-run/react'
import { ReactNode } from 'react'

export type AccountLinkProps = LinkProps & {
  withArrow?: boolean
  title: ReactNode | string
  subtitle: ReactNode | string
}
