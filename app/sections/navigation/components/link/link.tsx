import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import styles from './styles.module.css'
import { LinkProps } from './types'

const Link = ({ title, isMegaMenu }: LinkProps, ref: Ref<HTMLLIElement>) => {
  // TODO: LOGIC FOR NAV DROPDOWN
  return (
    <li className={clsx(styles.wrapper)} ref={ref}>
      {title}
    </li>
  )
}

export default forwardRef(Link)
