import { Image } from '@shopify/hydrogen'
import {
  BurgerMenuIcon,
  ChubbiesAccountIcon,
  ChubbiesBagIcon,
} from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import { ClientOnly } from 'remix-utils'
import MenuLinks from '../menu-links'
import SearchBar from '../search-bar'
import styles from './styles.module.css'
import { DesktopNavProps } from './types'

const DesktopNav = ({ ...props }: DesktopNavProps, ref: Ref<HTMLDivElement>) => (
  <ClientOnly>
    {() => (
      <div className={clsx(styles.wrapper)} ref={ref} {...props}>
        <div className={styles.burgerMenu}>
          <BurgerMenuIcon size="xs" />
        </div>
        <div>
          <Image data={{ altText: 'Logo', url: `${window.location.href}images/logo.png` }} />
        </div>
        <MenuLinks className={styles.navigation} />
        <div className={styles.rightMenuWrapper}>
          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>
          <div className={styles.rightMenu}>
            <ChubbiesAccountIcon />
            <ChubbiesBagIcon />
          </div>
        </div>
      </div>
    )}
  </ClientOnly>
)

export default forwardRef(DesktopNav)
