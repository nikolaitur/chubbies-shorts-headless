import { Image } from '@shopify/hydrogen'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import Container from '@solo-brands/ui-library.ui.atomic.container'
import {
  BurgerMenuIcon,
  ChubbiesBagIcon,
  MagnifyingIcon,
} from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { CSSProperties, useEffect, useState } from 'react'

import Backdrop from '~/components/backdrop/backdrop'
import { useCartActions, useCartState } from '~/components/cart-context/cart-context'
import Link from '~/components/link'
import WishlistLink from '~/components/wishlist-link'
import CartModal from '~/sections/header/cart-modal/cart-modal'
import DesktopNav from '~/sections/header/desktop-nav'
import MobileNav from '~/sections/header/mobile-nav'
import SearchBar from '~/sections/header/search-bar'

import { MIN_ANNOUNCEMENT_HEIGHT } from '~/constants'
import { HeaderNavigationProps } from './types'

import { useMatches } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import AccountButton from './account-button'
import NavIndicator from './nav-indicator/nav-indicator'
import styles from './styles.module.css'

const Header = ({
  cartBlocksAboveCartItems,
  menu,
  navImages,
  brandLogo,
}: HeaderNavigationProps) => {
  const { isCartOpen } = useCartState()
  const { setIsCartOpen } = useCartActions()

  const [root] = useMatches()

  const cart = root.data.cart ?? {}

  const { totalQuantity } = cart

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [hoveredMenuTitle, setHoveredMenuTitle] = useState<string | null>(null)
  const [announcementHeight, setAnnouncementHeight] = useState<number>(MIN_ANNOUNCEMENT_HEIGHT)
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false)

  useEffect(() => {
    const announcement = document.querySelector('.announcement-bar') as HTMLDivElement

    const handleSetHeight = () => {
      const height = announcement?.offsetHeight || 0

      if (height > MIN_ANNOUNCEMENT_HEIGHT && height !== announcementHeight) {
        setAnnouncementHeight(height)
      }
    }

    const resizeObserver = new ResizeObserver(handleSetHeight)

    resizeObserver.observe(announcement)

    return () => resizeObserver.unobserve(announcement)
  }, [announcementHeight])

  useEffect(() => {
    let scrollPosition = 0

    const handleScrollDirection = () => {
      const bodyTop = document.body?.getBoundingClientRect()?.top

      if (bodyTop === 0 || scrollPosition === 0) {
        setIsScrollingDown(false)
        setIsSearchOpen(false)
      } else if (bodyTop < scrollPosition) {
        setIsScrollingDown(true)
        setIsSearchOpen(false)
      }

      scrollPosition = bodyTop
    }

    window.addEventListener('scroll', handleScrollDirection)

    return () => window.removeEventListener('scroll', handleScrollDirection)
  }, [isSearchOpen])

  return (
    <ClientOnly>
      {() => (
        <>
          <div
            style={{ '--top': `${announcementHeight}px` } as CSSProperties}
            className={styles.content}
          >
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
                    className={clsx(
                      styles.icon,
                      { [styles.hidden]: !isScrollingDown || isSearchOpen },
                      styles.searchIcon,
                    )}
                    onClick={() => setIsSearchOpen(true)}
                    variant="minimal"
                    size="xl"
                    icon={<MagnifyingIcon />}
                  />
                </div>
                {/*LOGO*/}
                {brandLogo?.url && (
                  <Link to="/" className={styles.logoLink}>
                    <Image data={brandLogo} className={styles.logo} draggable="false" />
                  </Link>
                )}
                {/*Desktop Navigation*/}
                <DesktopNav
                  hoveredMenuTitle={hoveredMenuTitle}
                  setHoveredMenuTitle={setHoveredMenuTitle}
                  menu={menu}
                  navImages={navImages}
                />
                {/*Desktop Large Search*/}
                <div className={styles.searchDesktop}>
                  <SearchBar />
                </div>
                {/*Right action icons block*/}
                <div className={styles.positionBlock}>
                  {/*TODO: Should be done in account functionality*/}
                  <AccountButton />
                  <WishlistLink />
                  {/*TODO: Should be done in cart functionality*/}
                  <div className={styles.cartIcon}>
                    <button onClick={() => setIsCartOpen(!isCartOpen)}>
                      <ChubbiesBagIcon />
                    </button>
                    <CartModal cartBlocksAboveCartItems={cartBlocksAboveCartItems} />
                    <NavIndicator count={totalQuantity} />
                  </div>
                </div>
              </div>
              {/*Mobile Next line search bar*/}
              {(!isScrollingDown || isSearchOpen) && (
                <div className={styles.searchMobile}>
                  <SearchBar />
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
          <Backdrop className={styles.backdrop} isShown={!!hoveredMenuTitle} />
        </>
      )}
    </ClientOnly>
  )
}
export default Header
