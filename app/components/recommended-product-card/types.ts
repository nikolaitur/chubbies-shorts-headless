import { HTMLAttributes } from 'react'
import { NostoRecommendedProduct } from '~/global-types'
import { NostoRecommendedProductsProps } from '../nosto-recommended-products'

export type RecommendedProductCardProps = HTMLAttributes<HTMLDivElement> & {
  product: NostoRecommendedProduct
  size?: NostoRecommendedProductsProps['size']
}
