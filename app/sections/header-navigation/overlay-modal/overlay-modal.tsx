import { CSSProperties, ReactNode } from 'react'
import { CloseIcon, ChevronLeftIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'

import styles from './styles.module.css'

const OverlayModal = ({
  index = 1,
  isOpened,
  title,
  onClose,
  onBack,
  hasBackOption = false,
  children,
}: {
  index?: number
  isOpened: boolean
  title?: string
  onClose: () => void
  onBack?: () => void
  hasBackOption?: boolean
  children: ReactNode
}) => (
  <div
    className={clsx(styles.nav, { [styles.navVisible]: isOpened })}
    style={{ '--index': index } as CSSProperties}
  >
    <div className={styles.header}>
      <button className={styles.icon} onClick={hasBackOption ? onBack : onClose}>
        {hasBackOption ? <ChevronLeftIcon /> : <CloseIcon />}
      </button>
      <h6>{title?.split(' | #')[0]}</h6>
      <button className={clsx(styles.icon, { [styles.hidden]: !hasBackOption })} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
    {children}
  </div>
)

export default OverlayModal
