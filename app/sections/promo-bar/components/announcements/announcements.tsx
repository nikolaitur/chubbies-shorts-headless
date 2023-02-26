import { Link } from '@remix-run/react'
import Counter from '@solo-brands/ui-library.ui.atomic.counter'
import clsx from 'clsx'
import { CSSProperties, forwardRef, Ref } from 'react'
import { ClientOnly } from 'remix-utils'
import { AnnouncementProps } from './types'

import styles from './styles.module.css'

const Announcements = (
  { announcement, index, isActive = false, ...props }: AnnouncementProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { title, content, link, end_date, font_color, countdown } = announcement

  const counterProps = {
    endDate: countdown?.value ?? '',
    backgroundColor: 'transparent',
    fontColor: 'inherit',
    withIcon: true,
  }

  return (
    <ClientOnly>
      {() => (
        <div
          className={clsx(styles.announcement, `announcement-content-${index}`, {
            [styles.isActive]: isActive,
            [styles.isLink]: link !== null,
          })}
          style={{ '--color': font_color?.value } as CSSProperties}
          ref={ref}
          {...props}
        >
          {link?.value ? (
            <Link to={link?.value} title={title?.value ?? undefined} target="_blank">
              {content?.value}
            </Link>
          ) : (
            <span>{content?.value}</span>
          )}
          {end_date?.value && <Counter {...counterProps} />}
        </div>
      )}
    </ClientOnly>
  )
}

export default forwardRef(Announcements)
