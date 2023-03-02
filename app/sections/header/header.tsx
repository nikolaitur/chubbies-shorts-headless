import { Link } from '@remix-run/react'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import Container from '@solo-brands/ui-library.ui.atomic.container'
import {
  BurgerMenuIcon,
  ChubbiesAccountIcon,
  ChubbiesBagIcon,
  MagnifyingIcon,
} from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import Logo from '~/components/logo'
import DesktopNav from '~/sections/header/desktop-nav'
import MobileNav from '~/sections/header/mobile-nav'
import SearchBar from '~/sections/header/search-bar'
import Backdrop from '~/components/backdrop/backdrop'
import { useCartActions, useCartState } from '~/components/cart-context/cart-context'
import CartModal from '~/sections/header/cart-modal/cart-modal'

import { MIN_ANNOUNCEMENT_HEIGHT } from '~/constants'
import { HeaderNavigationProps } from './types'

import styles from './styles.module.css'

const Header = ({ menu, navImages }: HeaderNavigationProps) => {
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [hoveredMenuTitle, setHoveredMenuTitle] = useState<string | null>(null)
  const [announcementHeight, setAnnouncementHeight] = useState<number>(MIN_ANNOUNCEMENT_HEIGHT)

  useEffect(() => {
    const handleSetHeight = () => {
      const announcement = document.querySelector('.announcement-bar') as HTMLDivElement

      const height = announcement?.offsetHeight || 0

      if (height > MIN_ANNOUNCEMENT_HEIGHT && height !== announcementHeight) {
        setAnnouncementHeight(height)
      }
    }

    setTimeout(() => handleSetHeight(), 1000)

    window.addEventListener('resize', handleSetHeight)

    return () => window.removeEventListener('resize', handleSetHeight)
  }, [announcementHeight])

  return (
    <>
      <div style={{ top: `${announcementHeight}px` }} className={styles.content}>
        <Container fullWidth={true} className={styles.container}>
          <div className={styles.mobileNav}>
            {/*Left (mobile icons group)*/}
            <div className={styles.positionBlock}>
              <ButtonIcon
                className={clsx(styles.icon, styles.mobileNavIcon)}
                onClick={() => setIsNavOpen(true)}
                variant="minimal"
                size="xl"
                icon={<BurgerMenuIcon />}
              />
              <ButtonIcon
                className={clsx(styles.icon, { [styles.hidden]: isSearchOpen }, styles.searchIcon)}
                onClick={() => setIsSearchOpen(true)}
                variant="minimal"
                size="xl"
                icon={<MagnifyingIcon />}
              />
            </div>
            {/*LOGO*/}
            <Link to="/" className={styles.logoLink}>
              <Logo className={styles.logo} />
            </Link>
            {/*Desktop Navigation*/}
            <DesktopNav
              hoveredMenuTitle={hoveredMenuTitle}
              setHoveredMenuTitle={setHoveredMenuTitle}
              menu={menu}
              navImages={navImages}
            />
            {/*Desktop Large Search*/}
            <div className={styles.searchDesktop}>
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
            {/*Right action icons block*/}
            <div className={styles.positionBlock}>
              {/*TODO: Should be done in account functionality*/}
              <ChubbiesAccountIcon />
              {/*TODO: Should be done in cart functionality*/}
              <div className={styles.cartIcon}>
                <button onClick={() => setIsCartOpen(!isCartOpen)}>
                  <ChubbiesBagIcon />
                </button>
                <CartModal />
              </div>
            </div>
          </div>
          {/*Mobile Next line search bar*/}
          {isSearchOpen && (
            <div className={styles.searchMobile}>
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          )}
          {/*Mobile Burger Navigation*/}
          <MobileNav
            navImages={navImages}
            menu={menu}
            isNavOpen={isNavOpen}
            closeNav={() => setIsNavOpen(false)}
          />
        </Container>
      </div>
      <Backdrop isShown={!!hoveredMenuTitle} />
    </>
  )
}
export default Header
