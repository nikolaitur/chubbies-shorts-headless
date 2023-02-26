import { forwardRef, HTMLAttributes, Ref } from 'react'

import styles from './styles.module.css'

const Header = ({ children, ...props }: HTMLAttributes<HTMLElement>, ref: Ref<HTMLDivElement>) => (
  <div className={styles.section} {...props} ref={ref}>
    {children}
  </div>
)

export default forwardRef(Header)
