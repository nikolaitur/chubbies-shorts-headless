import { Link } from '@remix-run/react'
import clsx from 'clsx'
import styles from './styles.module.css'
import { NavItemProps } from './types'

const AccountsTabNavItem = ({ title, url, isActive }: NavItemProps) => (
  <li className={clsx(styles.item, { [styles.isActive]: isActive })}>
    <Link to={url} className={styles.link}>
      {title}
    </Link>
  </li>
)

export default AccountsTabNavItem
