import { HTMLAttributes } from 'react'
import { ProductCardFragment, ProductGroupFragment } from '~/graphql/generated'

export type ProductCardProps = HTMLAttributes<HTMLElement> & {
  product: ProductCardFragment
  productGroups: Array<ProductGroupFragment>
}
