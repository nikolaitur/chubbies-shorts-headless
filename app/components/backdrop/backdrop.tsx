import { forwardRef, Ref } from 'react'
import clsx from 'clsx'

import { BackdropProps } from '~/components/backdrop/types'

import styles from './styles.module.css'

const Backdrop = (
  { isShown = false, top = 0, ...props }: BackdropProps,
  ref: Ref<HTMLDivElement>,
) => {
  return (
    <div
      style={{ top: `${top}px` }}
      className={clsx(styles.backdrop, { [styles.isShown]: isShown })}
      ref={ref}
      {...props}
    />
  )
}

export default forwardRef(Backdrop)
