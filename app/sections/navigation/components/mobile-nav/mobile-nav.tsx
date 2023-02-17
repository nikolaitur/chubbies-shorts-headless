import {
  BurgerMenuIcon,
  ChubbiesAccountIcon,
  ChubbiesBagIcon,
  MagnifyingIcon,
} from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { forwardRef, Ref, useState } from 'react'
import { Logo } from '../../logos'
import SearchBar from '../search-bar'
import styles from './styles.module.css'
import { MobileNavProps } from './types'

const MobileNav = ({ ...props }: MobileNavProps, ref: Ref<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={clsx(styles.wrapper)} ref={ref} {...props}>
      <div className={styles.left}>
        <BurgerMenuIcon />
        <MagnifyingIcon onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className={styles.center}>
        <Logo />
      </div>
      <div className={styles.right}>
        <ChubbiesAccountIcon />
        <ChubbiesBagIcon />
      </div>
      {isOpen && (
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      )}
    </div>
  )
}

export default forwardRef(MobileNav)
