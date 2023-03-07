import { Link } from '@remix-run/react'
import { Image } from '@shopify/hydrogen'
import clsx from 'clsx'
import Container from '~/components/container'
import Section from '~/components/section'
import styles from './styles.module.css'
import type { MediaBannerProps } from './types'

const MediaBanner = ({ mediaItems }: MediaBannerProps) => {
  const mediaGridClasses = []
  const mediaItemClasses: string[] = []
  const mediaCount = mediaItems.length

  if (mediaCount === 2) {
    mediaGridClasses.push(styles.twoItems)
    mediaItemClasses.push(styles.rect)
  } else if (mediaCount === 3) {
    mediaGridClasses.push(styles.threeItems)
    mediaItemClasses.push(styles.rect)
  } else if (mediaCount === 4) {
    mediaGridClasses.push(styles.fourItems)
    mediaItemClasses.push(styles.square)
  } else {
    mediaGridClasses.push(styles.hidden)
    mediaItemClasses.push(styles.square)
  }

  return (
    <Section className={styles.section}>
      <Container>
        <div className={clsx(styles.mediaGrid, mediaGridClasses)}>
          {mediaItems.map(({ image, heading, linkText, linkUrl }, index) => (
            <div key={index} className={clsx(styles.mediaItem, mediaItemClasses)}>
              <div className={styles.imageWrapper}>
                {image && (
                  <Image
                    className={styles.mediaBannerImage}
                    key={index}
                    data={{ url: image, altText: heading }}
                  />
                )}
              </div>
              <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                  {heading && <h2 className={styles.heading}>{heading}</h2>}
                  {linkText && linkUrl && (
                    <Link to={linkText} className={styles.link}>
                      {linkText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default MediaBanner
