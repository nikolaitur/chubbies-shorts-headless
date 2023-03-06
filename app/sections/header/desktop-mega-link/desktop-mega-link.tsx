import { Image } from '@shopify/storefront-kit-react'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { MenuItemFragment, NavCollectionFragment } from '~/graphql/generated'

import Link from '~/components/link'

import styles from './styles.module.css'

const DesktopMegaLink = ({
  item,
  handleHover,
  isHovered,
  navImages,
}: {
  item: MenuItemFragment
  handleHover: Dispatch<SetStateAction<string | null>>
  isHovered: boolean
  navImages?: (NavCollectionFragment | null)[] | null
}) => {
  const { title, items, url } = item
  const visualTitle = title?.split(' | #')[0]
  const visualClassName = title?.split(' | #')[1]

  return items?.length ? (
    <div
      key={title}
      className={clsx(styles.navItem, styles.link, styles[visualClassName], {
        [styles.featured]: title === 'Featured',
      })}
      onMouseLeave={() => handleHover(null)}
    >
      <h6 onMouseEnter={() => handleHover(title)}>{visualTitle}</h6>
      <div className={clsx(styles.megaMenu, { [styles.megaMenuVisible]: isHovered })}>
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
              <Link to={subItem.url} className={clsx(styles.subItemTitle, styles.subItemLink)}>
                {subItem.title}
              </Link>
              <div className={styles.megaList}>
                {subItem.items.map(link => {
                  return (
                    <Link className={styles.subItemLink} key={link.title} to={link.url}>
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
  ) : (
    <Link to={url} className={clsx(styles.navItem, styles.simpleLink, styles[visualClassName])}>
      {visualTitle}
    </Link>
  )
}

export default DesktopMegaLink
