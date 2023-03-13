import { ReactNode } from 'react'
import { NostoRecommendedProduct, SizeOption } from '~/global-types'
import { PdpProductVariantsFragment } from '~/graphql/generated'

export type ProductContextState = {
  selectedSize: string | null
  selectedVariant: PdpProductVariantsFragment | null
  product: NostoRecommendedProduct // temporary type, should be a generic one
  sizeOptions: SizeOption[] | null
}

export type ProductContextActions = {
  setSelectedSize: (payload: string) => void
  setSelectedVariant: (payload: PdpProductVariantsFragment) => void
  setState: (payload: Partial<ProductContextState>) => void
  onSelectSize: (size: string) => void
}

export enum ProductReducerActionType {
  SET_SELECTED_SIZE = 'SET_SELECTED_SIZE',
  SET_SELECTED_VARIANT = 'SET_SELECTED_VARIANT',
  SET_STATE = 'SET_STATE',
}

export type ProductReducerAction = {
  type: keyof typeof ProductReducerActionType
  payload: any
}

export type ProductProviderProps = {
  children: ReactNode
  product: NostoRecommendedProduct // temporary type, should be a generic one
}
