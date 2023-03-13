import { useMatches } from '@remix-run/react'
import Carousel, { CarouselSlide } from '@solo-brands/ui-library.ui.atomic.carousel'
import { NostoRecommendedProduct, RootLoaderData } from '~/global-types'
import RecommendedProductCard from '../recommended-product-card'
import { NostoRecommendedProductsProps } from './types'

const NostoRecommendedProducts = ({
  nostoId,
  options,
  size,
  variant = 'slider',
  ...props
}: NostoRecommendedProductsProps) => {
  const [root] = useMatches()
  const { nostoPlacements }: RootLoaderData = root.data
  const currentPlacement = nostoPlacements?.find(placement => placement.divId === nostoId)
  const recommendedProducts = (currentPlacement?.primary as NostoRecommendedProduct[]) ?? null

  if (!recommendedProducts) return null

  return (
    <Carousel
      slidesLength={recommendedProducts.length}
      options={{
        ...options,
        gap: 8,
        navigation: {
          enabled: variant !== 'inline',
        },
        navigationSlides: false,
        pagination: {
          enabled: variant !== 'inline',
          variant: 'dotted',
        },
      }}
      {...props}
    >
      {recommendedProducts.map((product, index) => (
        <CarouselSlide index={index} key={product.id}>
          <RecommendedProductCard size={size} product={product} />
        </CarouselSlide>
      ))}
    </Carousel>
  )
}

export default NostoRecommendedProducts
