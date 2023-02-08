import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import styles from './styles.module.css'
import { ContainerProps } from './types'

const Container = ({ children, className, ...props }: ContainerProps, ref: Ref<HTMLDivElement>) => (
  <div className={clsx(styles.container, className)} ref={ref} {...props}>
    {children}
  </div>
)

export default forwardRef(Container)
