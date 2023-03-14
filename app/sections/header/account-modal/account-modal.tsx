import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon/dist/button-icon'
import Button from '@solo-brands/ui-library.ui.atomic.button/dist/button'
import { ChevronRightIcon, CloseIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { useRef } from 'react'
import Link from '~/components/link'
import { useOverlayController } from '~/hooks'
import styles from './styles.module.css'
import { AccountModalProps } from './types'

const AccountModal = ({
  className,
  hoverControllerRef,
  toggleControllerRef,
  ...props
}: AccountModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isLoggedIn = true

  useOverlayController({
    className: styles.isShown,
    overlayRef: modalRef,
    hoverControllerRef,
    toggleControllerRef,
    closeControllerRef: closeButtonRef,
  })

  return (
    <div className={styles.accountModal} ref={modalRef} {...props}>
      <div className={styles.header}>
        <ButtonIcon variant="minimal" size="sm" icon={<CloseIcon />} ref={closeButtonRef} />
      </div>
      {isLoggedIn && (
        <div className={clsx(styles.block, styles.rewardDetails)}>
          <div className={styles.rewardDetailsHeader}>
            <p className={styles.welcomeTitle}>Sup, Dina!</p>
            <p>How is our weekend expert doing? 🤘</p>
          </div>

          <div className={styles.rewardPointsDetails}>
            <p className={styles.rewardPointsTitle}>Reward Points Balance</p>
            <p className={styles.rewardPoints}>100</p>
            <Button className={styles.redeemButton}>Redeem for $25.00</Button>
          </div>

          <div className={styles.rewardDetailsFooter}>
            <p>Only 100 points left to get your next reward!</p>
            <div className={styles.rewardDetailsLinksWrapper}>
              <Link to="/" className={styles.linkText}>
                View recommendations
              </Link>
              <span> | </span>
              <Link to="/" className={styles.linkText}>
                Shop hot deals
              </Link>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <>
          <div className={styles.block}>
            <p className={styles.welcomeTitle}>Welcome to Chubbies</p>
            <p className={styles.welcomeText}>
              Sign in to enjoy a personalized experience and collect redeemable points 🔥
            </p>
            <div className={styles.buttonGroup}>
              <Button size="xs">Sign In</Button>
              <Button variant="tertiary" size="xs">
                Sign Up
              </Button>
            </div>
          </div>

          <div className={styles.block}>
            <p className={styles.rewardsTitle}>Chubbies Rewards Program</p>
            <p className={styles.rewardsText}>
              Shop. Earn points. Get discounts. It&apos;s that easy.
            </p>
            <Link to="/" className={styles.linkText}>
              Learn more
            </Link>
          </div>
        </>
      )}

      {isLoggedIn && (
        <Link to="/account/orders" className={clsx(styles.block, styles.withArrow)}>
          <div>
            <p className={styles.blockTitle}>My Orders</p>
            <p>View & track your orders</p>
          </div>
          <ChevronRightIcon />
        </Link>
      )}

      <Link to="/account/wishlist" className={clsx(styles.block, styles.withArrow)}>
        <div>
          <p className={styles.blockTitle}>Wishlist</p>
          <p>View wishlist items</p>
        </div>
        <ChevronRightIcon />
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/account/address" className={clsx(styles.block, styles.withArrow)}>
            <div>
              <p className={styles.blockTitle}>Address Book</p>
              <p>Save and manage your favourite addresses</p>
            </div>
            <ChevronRightIcon />
          </Link>

          <Link to="/account/settings" className={clsx(styles.block, styles.withArrow)}>
            <div>
              <p className={styles.blockTitle}>Account Settings</p>
              <p>Contact info, email address and password</p>
            </div>
            <ChevronRightIcon />
          </Link>
        </>
      )}

      <Link to="/refer-a-friend" className={styles.block}>
        <p className={styles.blockTitle}>Refer a Friend</p>
        <p>
          Tell your friends about Chubbies and <span className={styles.greenText}>get $15!</span>
        </p>
      </Link>

      {isLoggedIn && (
        <div className={styles.block}>
          <button className={styles.signoutButton}>Sign out</button>
        </div>
      )}
    </div>
  )
}

export default AccountModal
