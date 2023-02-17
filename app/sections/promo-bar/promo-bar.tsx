import clsx from 'clsx'
import { forwardRef, Ref, useEffect, useState } from 'react'
import Announcement from './components/announcements'
import RightMenu from './components/right-menu'
import styles from './styles.module.css'
import { HeaderProps } from './types'

// TODO: LIVE DATA INTEGRATION
const mockData = [
  {
    title: {
      value: '02.07.23 -  $400 Off Haven TT',
    },
    content: {
      value: '⚡️FLASH SALE⚡️ Get $400 OFF on Haven TT with code PADDLETOGETHER ',
    },
    link: {
      value: 'https://www.orukayak.com/collections/haven-tt',
    },
    font_color: {
      value: '#ffffff',
    },
    background_color: {
      value: '#163358',
    },
    start_date: {
      value: '2023-02-07T14:00:00Z',
    },
    end_date: {
      value: '2023-03-18T07:59:00Z',
    },
    countdown: {
      value: '2023-03-18T07:59:00Z',
    },
  },
  {
    title: {
      value: '02.07.23 - Lake/Lake+ Pre-Orders',
    },
    content: {
      value: 'FREE Paddle with any Lake or Lake+ Orange Edition Pre-Orders! 🙌',
    },
    link: {
      value: 'https://www.orukayak.com/collections/lake-lake-orange-edition',
    },
    font_color: {
      value: '#ffffff',
    },
    background_color: {
      value: '#f47721',
    },
    start_date: {
      value: '2023-02-07T14:00:00Z',
    },
    end_date: {
      value: '2023-03-18T07:59:00Z',
    },
    countdown: {
      value: '2023-03-18T07:59:00Z',
    },
  },
]

const cycleDuration = 3000
// TODO: TO IMPLEMENT DATA DRIVEN BACKGROUND COLOR
const defaultBackgroundColor = '#163358'

const PromoBar = ({ ...props }: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [backgroundColor, setbackgroundColor] = useState(defaultBackgroundColor)

  useEffect(() => {
    const cycle = setInterval(() => {
      if (currentIndex + 1 >= mockData.length) {
        clearInterval(cycle)
        setCurrentIndex(0)
      } else {
        clearInterval(cycle)
        setCurrentIndex(currentIndex + 1)
      }
      setbackgroundColor(mockData[currentIndex + 1]?.background_color?.value)
    }, cycleDuration)
  }, [currentIndex])

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
      style={{ backgroundColor }}
      ref={ref}
      {...props}
    >
      {mockData?.map((announcement, idx) => {
        const isActive = idx === currentIndex

        return (
          <Announcement
            key={`announcement-key-${idx + 1}`}
            announcement={announcement}
            index={idx}
            isActive={isActive}
          />
        )
      })}
      <RightMenu />
    </div>
  )
}

export default forwardRef(PromoBar)
