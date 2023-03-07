import Counter from '@solo-brands/ui-library.ui.atomic.counter'
import clsx from 'clsx'
import { CSSProperties, forwardRef, Ref, useEffect, useRef, useState } from 'react'
import { ClientOnly } from 'remix-utils'

import Link from '~/components/link'
import { AnnouncementProps } from './types'

import styles from './styles.module.css'

const Announcements = (
  { announcement, index, isActive = false, ...props }: AnnouncementProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { title, content, link, end_date, font_color, countdown } = announcement
  const contentRef = useRef<HTMLDivElement>(null)
  const [largeContentPadding, setLargeContentPadding] = useState<number>(0)

  const counterProps = {
    endDate: countdown?.value ?? '',
    backgroundColor: 'transparent',
    fontColor: 'inherit',
    withIcon: true,
  }

  useEffect(() => {
    const handleSetHeight = () => {
      const contentWidth = contentRef?.current?.getBoundingClientRect()?.width || 0
      const bodyWidth = document?.body?.getBoundingClientRect()?.width || 0
      const rightPanelWidth =
        document?.querySelector('.right-announcement-menu')?.getBoundingClientRect()?.width || 0

      if (bodyWidth - contentWidth < rightPanelWidth * 2) {
        setLargeContentPadding(rightPanelWidth)
      } else {
        setLargeContentPadding(0)
      }
    }

    const resizeObserver = new ResizeObserver(handleSetHeight)

    resizeObserver.observe(document.body)

    return () => resizeObserver.unobserve(document.body)
  }, [])

  return (
    <ClientOnly>
      {() => (
        <div
          className={clsx(styles.announcement, 'announcement-content', {
            [styles.isActive]: isActive,
            [styles.isLink]: link !== null,
            [styles.withPadding]: !!largeContentPadding,
          })}
          style={
            {
              '--color': font_color?.value,
              '--rightPosition': `${largeContentPadding || 0}px`,
            } as CSSProperties
          }
          ref={ref}
          {...props}
        >
          <div className={styles.content} ref={contentRef}>
            {link?.value ? (
              <Link to={link?.value} title={title?.value ?? undefined} target="_blank">
                {content?.value}
              </Link>
            ) : (
              <span>{content?.value}</span>
            )}
            {end_date?.value && <Counter {...counterProps} />}
          </div>
        </div>
      )}
    </ClientOnly>
  )
}

export default forwardRef(Announcements)
