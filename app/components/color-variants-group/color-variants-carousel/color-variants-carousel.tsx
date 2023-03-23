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
import {
  ColorVariantsCarouselInnerProps,
  ColorVariantsCarouselProps,
  LinkWrapperProps,
} from './types'

export const LinkWrapper = ({ shouldWrap, children, handle, colorOptions }: LinkWrapperProps) => {
  const { state, search } = useLocation()

  return shouldWrap ? (
    <Link
      className={styles.link}
      prefetch="render"
      to={{
        pathname: `/products/${handle}`,
        search,
      }}
      state={generateColorState(state, colorOptions)}
      replace
      preventScrollReset
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  )
}

const ColorVariantsCarousel = ({
  colorOptions,
  size = 'md',
  variant = 'inline',
  type,
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
    <ColorVariantsCarouselInner colorOptions={colorOptions} size={size} type={type} />
  </Carousel>
)

const ColorVariantsCarouselInner = ({
  colorOptions,
  size,
  type,
}: ColorVariantsCarouselInnerProps) => {
  const { carouselRef, currentIndex, currentSlidesPerView, slidesLength } = useCarouselState()

  const remainingSlidesCount = slidesLength - (currentSlidesPerView + currentIndex)
  const hasRemainingSlides = remainingSlidesCount > 0
  const isVariantProductBox = type === 'product-box'

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
            <LinkWrapper
              shouldWrap={isVariantProductBox}
              handle={handle}
              colorOptions={colorOptions}
            >
              <ColorVariantSelector size={size} colorOption={option} />
            </LinkWrapper>
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
