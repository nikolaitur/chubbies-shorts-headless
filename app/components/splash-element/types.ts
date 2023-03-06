import { HTMLAttributes } from 'react'

export type SplashElementProps = HTMLAttributes<HTMLDivElement> & {
  shouldTrigger: boolean
}
