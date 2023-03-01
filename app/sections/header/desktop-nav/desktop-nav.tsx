import { Link } from '@remix-run/react'
import clsx from 'clsx'

import DesktopMegaLink from '~/sections/header/desktop-mega-link'

import { DesktopNavProps } from './types'

import styles from './styles.module.css'

const DesktopNav = ({
  menu,
  navImages,
  hoveredMenuTitle,
  setHoveredMenuTitle,
}: DesktopNavProps) => (
  <div className={styles.container}>
    {menu?.items?.map(item => {
      const { title, url = '', items } = item
      const visualTitle = title?.split(' | #')[0]
      const visualClassName = title?.split(' | #')[1]
      const hasSubmenu = !!items?.length

      return hasSubmenu ? (
        <DesktopMegaLink
          navImages={navImages}
          isHovered={hoveredMenuTitle === title}
          handleHover={setHoveredMenuTitle}
          item={item}
        />
      ) : (
        <Link to={url} key={item.title} className={clsx(styles.link, styles[visualClassName])}>
          {visualTitle}
        </Link>
      )
    })}
  </div>
)

export default DesktopNav
