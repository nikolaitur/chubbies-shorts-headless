import { Link } from '@remix-run/react'
import { CaretRightIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'

import styles from './styles.module.css'
import { MobileMenuTypes } from './types'

const MobileMenu = ({ item, onOpen }: MobileMenuTypes) => {
  const { title, url } = item || {}
  const visualTitle = item?.title?.split(' | #')[0]
  const visualClassName = item?.title ? item?.title?.split(' | #')[1] : ''
  const hasSubmenu = !!item?.items?.length

  if (hasSubmenu) {
    return (
      <button
        className={clsx(
          styles.menuItem,
          { [styles.menuItemWithSubmenu]: hasSubmenu },
          { [styles.featured]: title === 'Featured' },
          styles[visualClassName],
        )}
        onClick={onOpen}
      >
        <span>{visualTitle}</span>
        <CaretRightIcon />
      </button>
    )
  } else {
    return (
      <Link className={clsx(styles.menuItem, styles[visualClassName])} to={url || ''}>
        {visualTitle}
      </Link>
    )
  }
}

export default MobileMenu
