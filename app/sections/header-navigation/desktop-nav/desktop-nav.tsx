import { Link } from '@remix-run/react'
import clsx from 'clsx'
import { useMemo, useRef, useState } from 'react'

import Backdrop from '~/components/backdrop'
import DesktopMegaLink from '~/sections/header-navigation/desktop-mega-link'

import { DesktopNavProps } from './types'

import styles from './styles.module.css'

const DesktopNav = ({ menu, navImages }: DesktopNavProps) => {
  const [hoveredMenuTitle, setHoveredMenuTitle] = useState<string | null>(null)
  const navigation = useRef<HTMLDivElement>(null)

  const megaMenuTop = useMemo(() => {
    const element = navigation.current
    return (element?.offsetTop || 0) + (element?.offsetHeight || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.current, hoveredMenuTitle])

  return (
    <>
      <div className={styles.container} ref={navigation}>
        {menu?.items?.map(item => {
          const { title, url, items } = item
          const visualTitle = title?.split(' | #')[0]
          const visualClassName = title?.split(' | #')[1]
          const hasSubmenu = !!items?.length

          return hasSubmenu ? (
            <DesktopMegaLink
              navImages={navImages}
              isHovered={hoveredMenuTitle === title}
              handleHover={setHoveredMenuTitle}
              item={item}
              megaMenuTop={megaMenuTop}
            />
          ) : (
            <Link
              to={url || ''}
              key={item.title}
              className={clsx(styles.link, styles[visualClassName])}
            >
              {visualTitle}
            </Link>
          )
        })}
      </div>
      <Backdrop isShown={!!hoveredMenuTitle} top={megaMenuTop} />
    </>
  )
}

export default DesktopNav
