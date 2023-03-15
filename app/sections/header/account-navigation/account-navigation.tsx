import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon/dist/button-icon'
import Button from '@solo-brands/ui-library.ui.atomic.button/dist/button'
import { CloseIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { useRef } from 'react'
import { useMatches } from 'react-router'
import { useFetcher } from 'react-router-dom'
import { SignInModal, SignUpModal } from '~/components/account-modals'
import Link from '~/components/link'
import { RootLoaderData } from '~/global-types'
import { useOverlayController } from '~/hooks'
import AccountLink from '../account-link'
import links from './mock-data'
import styles from './styles.module.css'
import { AccountNavigationProps } from './types'

const AccountNavigation = ({
  className,
  hoverControllerRef,
  toggleControllerRef,
  ...props
}: AccountNavigationProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const signInButtonRef = useRef<HTMLButtonElement>(null)
  const signUpButtonRef = useRef<HTMLButtonElement>(null)

  const [root] = useMatches()
  const fetcher = useFetcher()
  const { isAuthenticated, customer } = (root.data as RootLoaderData) ?? {}
  const { firstName, email } = customer ?? {}

  const { isShown } = useOverlayController({
    hoverControllerRef,
    toggleControllerRef,
    closeControllerRef: closeButtonRef,
  })

  return (
    <div className={clsx(styles.accountNavigation, { [styles.isShown]: isShown })} {...props}>
      <div className={styles.header}>
        <ButtonIcon variant="minimal" size="sm" icon={<CloseIcon />} ref={closeButtonRef} />
      </div>
      {isAuthenticated && (
        <div className={clsx(styles.block, styles.rewardDetails)}>
          <div className={styles.rewardDetailsHeader}>
            <p className={styles.welcomeTitle}>Sup, {firstName ?? email}!</p>
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

      {!isAuthenticated && (
        <>
          <div className={styles.block}>
            <p className={styles.welcomeTitle}>Welcome to Chubbies</p>
            <p className={styles.welcomeText}>
              Sign in to enjoy a personalized experience and collect redeemable points 🔥
            </p>
            <div className={styles.buttonGroup}>
              <Button size="xs" ref={signInButtonRef}>
                Sign In
              </Button>
              <Button variant="tertiary" size="xs" ref={signUpButtonRef}>
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

      {links.map(({ type, ...link }, index) => {
        if (type === 'private' && !isAuthenticated) return null
        return <AccountLink key={index} {...link} />
      })}

      {isAuthenticated && (
        <div className={styles.block}>
          <fetcher.Form action="/api/account/logout" method="post">
            <button type="submit" className={styles.signoutButton}>
              Sign out
            </button>
          </fetcher.Form>
        </div>
      )}

      {!isAuthenticated && (
        <>
          <SignInModal openControllerRef={signInButtonRef} />
          <SignUpModal openControllerRef={signUpButtonRef} />
        </>
      )}
    </div>
  )
}

export default AccountNavigation
