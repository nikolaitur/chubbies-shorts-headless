import { HTMLAttributes } from 'react'

export type BackdropProps = HTMLAttributes<HTMLDivElement> & {
  isShown: boolean
}
