import { Link } from '@remix-run/react'
import { Image } from '@shopify/hydrogen'
import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@solo-brands/ui-library.ui.atomic.accordion'
import clsx from 'clsx'

import { MenuItemFragment, NavCollectionFragment } from '~/graphql/generated'

import styles from './styles.module.css'

const MobileAccordionMenu = ({
  item,
  navImages,
}: {
  item?: MenuItemFragment | null
  navImages?: (NavCollectionFragment | null | undefined)[] | null | undefined
}) => {
  if (!item) return null

  const hasSubmenu = !!item.items?.length

  if (hasSubmenu) {
    return (
      <div className={styles.accordion}>
        <Accordion allowMultiple={true}>
          {item?.items?.map(accordionItem => {
            const media = navImages?.find(image => image?.id === accordionItem.resourceId)
              ?.navigation_image?.reference?.image

            return (
              <AccordionItem className={styles.accordionItem} key={accordionItem.title}>
                <AccordionButton
                  className={clsx(styles.accordionButton, { [styles.titleWithMedia]: media?.url })}
                >
                  <div className={styles.accordionTitle}>
                    {media?.url && (
                      <Image
                        data={{ altText: media?.altText, url: media.url }}
                        className={styles.media}
                        width="100"
                        height="100"
                        draggable="false"
                      />
                    )}
                    {accordionItem.title}
                  </div>
                </AccordionButton>
                <AccordionPanel>
                  <div className={styles.accordionContent}>
                    {accordionItem?.items?.map(({ url, title }) => {
                      return url ? (
                        <Link className={styles.menuItem} to={url}>
                          {title}
                        </Link>
                      ) : (
                        <div className={styles.menuItem}>{title}</div>
                      )
                    })}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    )
  } else {
    return null
  }
}

export default MobileAccordionMenu
