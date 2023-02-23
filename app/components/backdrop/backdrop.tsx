import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import styles from './styles.module.css'
import { BackdropProps } from './types'

const Backdrop = ({ isShown = false, ...props }: BackdropProps, ref: Ref<HTMLDivElement>) => {
  return (
    <div className={clsx(styles.backdrop, { [styles.isShown]: isShown })} ref={ref} {...props} />
  )
}

export default forwardRef(Backdrop)
