import Carousel, { CarouselSlide } from '@solo-brands/ui-library.ui.atomic.carousel'
import { ROUTE_IDS } from '~/constants'
import { LoaderData, NostoRecommendedProduct } from '~/global-types'
import { useTypedRouteLoaderData } from '~/hooks'
import RecommendedProductCard from '../recommended-product-card'
import { NostoRecommendedProductsProps } from './types'

const NostoRecommendedProducts = ({
  nostoId,
  options,
  size,
  variant = 'slider',
  ...props
}: NostoRecommendedProductsProps) => {
  const { nostoPlacements } = useTypedRouteLoaderData<LoaderData['root']>(ROUTE_IDS.ROOT) ?? {}
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
