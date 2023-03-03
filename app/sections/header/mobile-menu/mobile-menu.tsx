import { CaretRightIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'

import InternalLink from '~/components/internal-link'

import { MobileMenuTypes } from './types'

import styles from './styles.module.css'

const MobileMenu = ({ item, onOpen }: MobileMenuTypes) => {
  const { title, url } = item || {}
  const visualTitle = item?.title?.split(' | #')[0]
  const hasSubmenu = !!item?.items?.length

  if (hasSubmenu) {
    return (
      <button
        className={clsx(
          styles.menuItem,
          { [styles.menuItemWithSubmenu]: hasSubmenu },
          { [styles.featured]: title === 'Featured' },
        )}
        onClick={onOpen}
      >
        <span>{visualTitle}</span>
        <CaretRightIcon />
      </button>
    )
  } else {
    return (
      <InternalLink className={styles.menuItem} to={url}>
        {visualTitle}
      </InternalLink>
    )
  }
}

export default MobileMenu
