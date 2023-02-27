import { Link } from '@remix-run/react'
import { Image } from '@shopify/storefront-kit-react'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { MenuItemFragment, NavCollectionFragment } from '~/graphql/generated'

import styles from './styles.module.css'

const DesktopMegaLink = ({
  item,
  handleHover,
  megaMenuTop = 72,
  isHovered,
  navImages,
}: {
  item: MenuItemFragment
  handleHover: Dispatch<SetStateAction<string | null>>
  megaMenuTop?: number
  isHovered: boolean
  navImages?: (NavCollectionFragment | null | undefined)[] | null | undefined
}) => {
  const { title, items } = item
  const visualTitle = title?.split(' | #')[0]
  const visualClassName = title?.split(' | #')[1]

  return (
    <div
      key={title}
      className={clsx(styles.navItem, styles[visualClassName], {
        [styles.featured]: title === 'Featured',
      })}
      onMouseLeave={() => handleHover(null)}
    >
      <h6 onMouseEnter={() => handleHover(title)}>{visualTitle}</h6>
      <div
        style={{ top: `${megaMenuTop}px` }}
        className={clsx(styles.megaMenu, { [styles.megaMenuVisible]: isHovered })}
      >
        {items?.map(subItem => {
          const media = navImages?.find(image => image?.id === subItem.resourceId)?.navigation_image
            ?.reference?.image

          return (
            <div key={subItem.title} className={styles.megaItem}>
              {media?.url && (
                <Image
                  data={{ altText: media?.altText, url: media.url }}
                  className={styles.media}
                  width="285"
                  height="285"
                  draggable="false"
                />
              )}
              <Link
                to={subItem.url || ''}
                className={clsx(styles.subItemTitle, styles.subItemLink)}
              >
                {subItem.title}
              </Link>
              <div className={styles.megaList}>
                {subItem.items.map(link => {
                  return (
                    <Link className={styles.subItemLink} key={link.title} to={link.url || ''}>
                      {link.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DesktopMegaLink
