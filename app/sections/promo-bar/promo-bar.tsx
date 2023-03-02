import clsx from 'clsx'
import { CSSProperties, forwardRef, Ref, useEffect, useMemo, useState } from 'react'

import Announcement from './components/announcements'
import RightMenu from './components/right-menu'

import { PromoBarProps } from './types'
import { MIN_ANNOUNCEMENT_HEIGHT } from '~/constants'

import styles from './styles.module.css'

const PromoBar = (
  { announcements = [], menuLinks, ...props }: PromoBarProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null)
  const [announcementHeight, setAnnouncementHeight] = useState<number>(MIN_ANNOUNCEMENT_HEIGHT)

  const validAnnouncements = useMemo(() => {
    return announcements?.filter(({ end_date, start_date }) => {
      const currentTime = Date.now()
      const startTime = start_date?.value ? new Date(start_date.value).getTime() : null
      const endTime = end_date?.value ? new Date(end_date.value).getTime() : null

      if (endTime && startTime) {
        return true
      } else if (endTime && !startTime) {
        return endTime > currentTime
      } else if (!endTime && startTime) {
        return currentTime > startTime
      }
    })
  }, [announcements])

  useEffect(() => {
    const cycle = setInterval(() => {
      if (currentIndex + 1 >= validAnnouncements.length) {
        clearInterval(cycle)
        setCurrentIndex(0)
      } else {
        clearInterval(cycle)
        setCurrentIndex(currentIndex + 1)
      }
      const nextAnnouncementBackground =
        validAnnouncements[currentIndex + 1]?.background_color?.value
      if (nextAnnouncementBackground) setBackgroundColor(nextAnnouncementBackground)
    }, 3000)
  }, [validAnnouncements, currentIndex])

  useEffect(() => {
    const handleSetHeight = () => {
      const announcements = document.querySelectorAll(
        '.announcement-content',
      ) as NodeListOf<HTMLDivElement>

      const height = [] as number[]

      announcements.forEach(announcement => {
        const announcementHeight = announcement?.offsetHeight

        height.push(announcementHeight)
      })

      const maxHeight = Math.max(...height)

      if (maxHeight > MIN_ANNOUNCEMENT_HEIGHT && maxHeight !== announcementHeight) {
        setAnnouncementHeight(maxHeight)
      }
    }

    setTimeout(() => handleSetHeight(), 1000)

    window.addEventListener('resize', handleSetHeight)

    return () => window.removeEventListener('resize', handleSetHeight)
  }, [announcementHeight])

  return (
    <div
      className={clsx(styles.section, 'announcement-bar')}
      style={{ backgroundColor, height: `${announcementHeight}px` } as CSSProperties}
      ref={ref}
      {...props}
    >
      <div className={styles.container}>
        {validAnnouncements?.map((announcement, idx) => (
          <Announcement
            key={`announcement-key-${idx + 1}`}
            announcement={announcement}
            index={idx}
            isActive={idx === currentIndex}
          />
        ))}
      </div>
      <RightMenu data={menuLinks} />
    </div>
  )
}

export default forwardRef(PromoBar)
