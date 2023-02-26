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
import { useRef, useState } from 'react'

import Logo from '~/components/logo'
import DesktopNav from '~/sections/header-navigation/desktop-nav'
import MobileNav from '~/sections/header-navigation/mobile-nav'
import SearchBar from '~/sections/header-navigation/search-bar'

import { HeaderNavigationProps } from './types'

import styles from './styles.module.css'
import CartModal from '~/sections/header/cart-modal/cart-modal'

const HeaderNavigation = ({ menu, navImages }: HeaderNavigationProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [showCartModal, setShowCartModal] = useState<boolean>(false)

  return (
    <div className={styles.content}>
      <Container fullWidth={true}>
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
          <DesktopNav menu={menu} navImages={navImages} />
          {/*Desktop Large Search*/}
          <div className={styles.searchDesktop}>
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
          {/*Right action icons block*/}
          <div className={styles.positionBlock}>
            {/*TODO: Should be done in account functionality*/}
            <ChubbiesAccountIcon />
            {/*TODO: Should be done in cart functionality*/}
            <button
              className={styles.cartIcon}
              onMouseEnter={() => setShowCartModal(true)}
              onMouseLeave={() => setShowCartModal(false)}
            >
              <ChubbiesBagIcon />
              <CartModal isShown={showCartModal} />
            </button>
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
  )
}
export default HeaderNavigation
