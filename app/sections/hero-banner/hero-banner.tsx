import { Image } from '@shopify/hydrogen'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Container from '~/components/container'
import Section from '~/components/section'
import styles from './styles.module.css'
import type { HeroBannerProps } from './types'

const HeroBanner = ({
  bgImg,
  plxImg,
  contentPosition,
  effectSetting,
  heading,
  description,
  buttonText = 'Shop Now',
}: HeroBannerProps) => {
  const [scale, setScale] = useState(1)
  const [imgTop, setImgTop] = useState(0)
  const heroBannerRef = useRef<HTMLDivElement>(null)
  const parallaxClasses = []

  if (effectSetting === 'imgFixed') {
    parallaxClasses.push(styles.imgFixed)
  } else if (effectSetting === 'bgFixed') {
    parallaxClasses.push(styles.bgFixed)
  } else {
    parallaxClasses.push(styles.parallaxScale)
  }

  const parallaxScale = () => {
    const { current } = heroBannerRef
    if (current) {
      const objectTop = current?.getBoundingClientRect()?.top ?? 0
      const topLevel = current?.clientHeight ?? 0
      const percent = 1.5 - (objectTop / topLevel) * 0.5
      if (percent > 1 && percent < 2) {
        setScale(percent)
      }
    }
  }

  useEffect(() => {
    if (effectSetting === 'scale') {
      document.addEventListener('scroll', parallaxScale)
      parallaxScale()
    }
  }, [effectSetting])

  return (
    <Section className={styles.section}>
      <Container>
        <div
          ref={heroBannerRef}
          className={clsx(styles.banner, parallaxClasses)}
          style={
            {
              '--scroll-scale': scale,
              '--parallax-top': `${imgTop}px`,
              '--fixed-image-url': `url(${plxImg})`,
              '--content-position': contentPosition || 'center',
            } as React.CSSProperties
          }
        >
          {bgImg ? <Image className={styles.backgroundImage} data={{ url: bgImg }} /> : null}

          {effectSetting === 'scale' && (
            <div className={styles.parallaxWrapper}>
              {plxImg ? <Image className={styles.parallaxImage} data={{ url: plxImg }} /> : null}
            </div>
          )}
          <div className={styles.contentWrapper}>
            <div className={styles.textContent}>
              <h1 className={styles.heading}>{heading}</h1>
              <div className={styles.description}>{description}</div>
            </div>
            <Button className={styles.button} variant="primary">
              {buttonText}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default HeroBanner
