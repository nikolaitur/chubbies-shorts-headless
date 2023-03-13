import { HTMLAttributes, ReactNode } from 'react'

export type PortalProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}
