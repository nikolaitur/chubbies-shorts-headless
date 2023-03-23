import Carousel, {
  CarouselSlide,
  useCarouselState,
} from '@solo-brands/ui-library.ui.atomic.carousel'
import clsx from 'clsx'
import { useEffect } from 'react'
import ColorVariantSelector from '~/components/color-variant-selector'
import styles from './styles.module.css'
import { ColorVariantsCarouselInnerProps, ColorVariantsCarouselProps } from './types'

const ColorVariantsCarousel = ({
  colorOptions,
  size = 'md',
  variant = 'inline',
  onChangeColorOption,
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
    <ColorVariantsCarouselInner
      colorOptions={colorOptions}
      size={size}
      onChangeColorOption={onChangeColorOption}
    />
  </Carousel>
)

const ColorVariantsCarouselInner = ({
  colorOptions,
  size,
  onChangeColorOption,
}: ColorVariantsCarouselInnerProps) => {
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
      {colorOptions.map((colorOption, index) => {
        const { handle, color, ...option } = colorOption
        return (
          <CarouselSlide key={`${handle}-${index}`} index={index}>
            <ColorVariantSelector
              size={size}
              colorOption={option}
              onProductCardClick={() => onChangeColorOption(colorOption)}
            />
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
