import { Link } from '@remix-run/react'
import Counter from '@solo-brands/ui-library.ui.atomic.counter'
import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import { ClientOnly } from 'remix-utils'
import styles from './styles.module.css'
import { AnnouncementProps } from './types'

const Announcements = (
  { announcement, index, isActive = false, ...props }: AnnouncementProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { title, content, link, end_date, background_color, font_color, countdown } = announcement

  const counterProps = {
    endDate: end_date?.value,
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
          ref={ref}
          {...props}
        >
          {link?.value ? (
            <>
              <Link to={link?.value} title={title?.value ?? undefined} target="_blank">
                {content?.value}
              </Link>
              {!!end_date?.value ? <Counter {...counterProps} /> : null}
            </>
          ) : (
            <>
              <span>{content?.value}</span>
              {!!end_date?.value ? <Counter {...counterProps} /> : null}
            </>
          )}
        </div>
      )}
    </ClientOnly>
  )
}

export default forwardRef(Announcements)
