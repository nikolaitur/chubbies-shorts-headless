import { forwardRef, Ref } from 'react'
import clsx from 'clsx'

import { BackdropProps } from '~/components/backdrop/types'

import styles from './styles.module.css'

const Backdrop = (
  { isShown = false, className, ...props }: BackdropProps,
  ref: Ref<HTMLDivElement>,
) => {
  return (
    <div
      className={clsx(styles.backdrop, className, { [styles.isShown]: isShown })}
      ref={ref}
      {...props}
    />
  )
}

export default forwardRef(Backdrop)
