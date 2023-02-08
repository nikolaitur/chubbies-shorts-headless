import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import styles from './styles.module.css'
import { SectionProps } from './types'

const Section = ({ children, className, ...props }: SectionProps, ref: Ref<HTMLElement>) => (
  <section className={clsx(styles.section, className)} ref={ref} {...props}>
    {children}
  </section>
)

export default forwardRef(Section)
