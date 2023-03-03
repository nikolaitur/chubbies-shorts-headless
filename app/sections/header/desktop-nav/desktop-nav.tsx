import clsx from 'clsx'

import DesktopMegaLink from '~/sections/header/desktop-mega-link'
import InternalLink from '~/components/internal-link'

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
        <InternalLink
          to={url}
          key={item.title}
          className={clsx(styles.link, styles[visualClassName])}
        >
          {visualTitle}
        </InternalLink>
      )
    })}
  </div>
)

export default DesktopNav
