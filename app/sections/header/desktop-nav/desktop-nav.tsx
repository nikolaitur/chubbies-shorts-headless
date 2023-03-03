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
      const { title } = item

      return (
        <DesktopMegaLink
          key={title}
          navImages={navImages}
          isHovered={hoveredMenuTitle === title}
          handleHover={setHoveredMenuTitle}
          item={item}
        />
      )
    })}
  </div>
)

export default DesktopNav
