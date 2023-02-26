import clsx from 'clsx'
import { forwardRef, Ref, useEffect, useMemo, useState } from 'react'

import Announcement from './components/announcements'
import RightMenu from './components/right-menu'

import { PromoBarProps } from './types'

import styles from './styles.module.css'

const PromoBar = (
  { announcements = [], menuLinks, ...props }: PromoBarProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null)

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
    const announcementSection = document.querySelector('.announcement-bar') as HTMLDivElement
    const currentAnnouncementText = document.querySelector(
      `.announcement-text-${currentIndex}`,
    ) as HTMLDivElement
    const currentAnnouncementCountdown = document.querySelector(
      `.announcement-countdown-${currentIndex}`,
    ) as HTMLDivElement
    const minHeight = 53
    const offset = 20
    const maxHeight =
      currentAnnouncementText?.offsetHeight + currentAnnouncementCountdown?.offsetHeight ||
      currentAnnouncementText?.offsetHeight

    const adjustedHeight = Math.round(maxHeight - minHeight)

    if (maxHeight >= 48) {
      announcementSection.style.height = `${adjustedHeight + minHeight + offset}px`
    } else {
      announcementSection.style.height = `${minHeight}px`
    }
  }, [currentIndex])

  return (
    <div
      className={clsx(styles.section, `announcement-bar`)}
      // @ts-expect-error Default styles handled by SCSS, but backgroundColor can be null here
      style={{ backgroundColor }}
      ref={ref}
      {...props}
    >
      {validAnnouncements?.map((announcement, idx) => (
        <Announcement
          key={`announcement-key-${idx + 1}`}
          announcement={announcement}
          index={idx}
          isActive={idx === currentIndex}
        />
      ))}
      <RightMenu data={menuLinks} />
    </div>
  )
}

export default forwardRef(PromoBar)
