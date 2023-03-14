import { ChubbiesAccountIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import { useRef } from 'react'
import AccountModal from '../account-modal'
import styles from './styles.module.css'
import { AccountButtonProps } from './types'

const AccountButton = (props: AccountButtonProps) => {
  const hoverControllerRef = useRef<HTMLDivElement>(null)
  const toggleControllerRef = useRef<HTMLButtonElement>(null)

  return (
    <div className={styles.accountButtonWrapper} ref={hoverControllerRef}>
      <button className={styles.accountButton} ref={toggleControllerRef} {...props}>
        <ChubbiesAccountIcon />
      </button>
      <AccountModal
        className={styles.accountModal}
        hoverControllerRef={hoverControllerRef}
        toggleControllerRef={toggleControllerRef}
      />
    </div>
  )
}

export default AccountButton
