import { ChevronRightIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import Link from '~/components/link'
import styles from './styles.module.css'
import { AccountLinkProps } from './types'

const AccountLink = ({
  to,
  title,
  subtitle,
  className,
  withArrow = true,
  ...props
}: AccountLinkProps) => {
  return (
    <Link to={to} className={clsx(styles.link, { [styles.withArrow]: withArrow })} {...props}>
      <div className={styles.titleBlock}>
        <div className={styles.titleWrapper}>{title}</div>
        {subtitle && <div className={styles.subtitleWrapper}>{subtitle}</div>}
      </div>
      {withArrow && <ChevronRightIcon />}
    </Link>
  )
}

export default AccountLink
