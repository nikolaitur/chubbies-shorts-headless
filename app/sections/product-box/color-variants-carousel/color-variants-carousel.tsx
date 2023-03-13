import { useLocation } from '@remix-run/react'
import Carousel, {
  CarouselSlide,
  useCarouselState,
} from '@solo-brands/ui-library.ui.atomic.carousel'
import clsx from 'clsx'
import { useEffect } from 'react'
import ColorVariantSelector from '~/components/color-variant-selector'
import Link from '~/components/link'
import { generateColorState } from '~/helpers'
import styles from './styles.module.css'
import { ColorVariantsCarouselInnerProps, ColorVariantsCarouselProps } from './types'

const ColorVariantsCarousel = ({
  colorOptions,
  size = 'md',
  variant = 'inline',
}: ColorVariantsCarouselProps) => (
  <Carousel
    className={clsx(styles.carousel, styles[variant])}
    slidesLength={colorOptions.length}
    options={{
      gap: 6,
      navigation: {
        enabled: variant !== 'inline',
      },
      navigationSlides: false,
    }}
  >
    <ColorVariantsCarouselInner colorOptions={colorOptions} size={size} />
  </Carousel>
)

const ColorVariantsCarouselInner = ({ colorOptions, size }: ColorVariantsCarouselInnerProps) => {
  const { carouselRef, currentIndex, currentSlidesPerView, slidesLength } = useCarouselState()
  const location = useLocation()

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
      {colorOptions.map(({ handle, color, ...option }, index) => {
        return (
          <CarouselSlide key={`${handle}-${index}`} index={index}>
            <Link
              className={styles.link}
              prefetch="render"
              to={{
                pathname: `/products/${handle}`,
                search: location.search,
              }}
              state={generateColorState(location.state, colorOptions)}
              replace
              preventScrollReset
            >
              <ColorVariantSelector size={size} colorOption={option} />
            </Link>
          </CarouselSlide>
        )
      })}
      {hasRemainingSlides && (
        <span className={styles.remainingSlidesCount}>+{remainingSlidesCount}</span>
      )}
    </>
  )
}

export default ColorVariantsCarousel
