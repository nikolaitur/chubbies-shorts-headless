import { CarouselProps } from '@solo-brands/ui-library.ui.atomic.carousel'
import { HTMLAttributes } from 'react'

export type NostoRecommendedProductsProps = HTMLAttributes<HTMLDivElement> &
  Pick<CarouselProps, 'options'> & {
    nostoId: string
    variant?: 'slider' | 'inline'
    size?: 'lg' | 'md' | 'sm' | 'xs'
  }
