import { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { ProductCardFragment, ProductGroupFragment } from '~/graphql/generated'

export type ProductSwatchesProps = HTMLAttributes<HTMLElement> & {
  productGroups: Array<ProductGroupFragment>
  product: ProductCardFragment
  onSwatchUpdate: Dispatch<SetStateAction<ProductCardFragment>>
}
