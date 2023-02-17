import Carousel, {
  CarouselSlide,
  useCarouselState,
} from '@solo-brands/ui-library.ui.atomic.carousel'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import clsx from 'clsx'
import { useEffect } from 'react'
import styles from './styles.module.css'
import { ColorVariantsCarouselInnerProps, ColorVariantsCarouselProps } from './types'

const ColorVariantsCarousel = ({
  colors,
  size = 'md',
  variant = 'inline',
}: ColorVariantsCarouselProps) => (
  <Carousel
    className={clsx(styles.carousel, styles[variant])}
    slidesLength={colors.length}
    options={{
      gap: 6,
      navigation: {
        enabled: variant !== 'inline',
      },
    }}
  >
    <ColorVariantsCarouselInner colors={colors} size={size} />
  </Carousel>
)

const ColorVariantsCarouselInner = ({ colors, size }: ColorVariantsCarouselInnerProps) => {
  const { carouselRef, currentIndex, currentSlidesPerView, slidesLength } = useCarouselState()
  const remainingSlidesCount = slidesLength - (currentSlidesPerView + currentIndex)
  const hasRemainingSlides = remainingSlidesCount > 0

  useEffect(() => {
    const carousel = carouselRef?.current
    const carouselNextButton = carousel?.querySelector('.carousel-next-button')

    hasRemainingSlides
      ? carouselNextButton?.classList.add(styles.withRemainingCount)
      : carouselNextButton?.classList.remove(styles.withRemainingCount)
  }, [remainingSlidesCount, carouselRef, hasRemainingSlides])

  return (
    <>
      {colors.map((color, index) => (
        <CarouselSlide key={index} index={index}>
          {/* @ts-expect-error - TODO: Update SwatchSelector types */}
          <SwatchSelector className={styles.swatchSelector} size={size} colors={[color.hex]} />
        </CarouselSlide>
      ))}
      {hasRemainingSlides && (
        <span className={styles.remainingSlidesCount}>+{remainingSlidesCount}</span>
      )}
    </>
  )
}

export default ColorVariantsCarousel
