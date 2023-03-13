import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { Context, createContext, useContext, useReducer } from 'react'
import { SIZE_OPTION_NAME } from '~/constants'
import { PdpProductVariantsFragment } from '~/graphql/generated'
import { getSizeOptions } from '~/helpers'
import {
  ProductContextActions,
  ProductContextState,
  ProductProviderProps,
  ProductReducerAction,
  ProductReducerActionType,
} from './types'

const ProductState = createContext<ProductContextState | null>(null) as Context<ProductContextState>
const ProductActions = createContext<ProductContextActions | null>(
  null,
) as Context<ProductContextActions>

const initialState = {
  selectedSize: null,
  selectedVariant: null,
}

const reducer = (state: typeof initialState, action: ProductReducerAction) => {
  const { payload, type } = action

  switch (type) {
    case 'SET_SELECTED_SIZE':
      return { ...state, selectedSize: payload }

    case 'SET_SELECTED_VARIANT':
      return { ...state, selectedVariant: payload }

    case 'SET_STATE':
      return { ...state, ...payload }

    default:
      return state
  }
}

const ProductProvider = ({ product, children }: ProductProviderProps) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState)

  const { variants, options } = product
  const sizeOptions = getSizeOptions(variants.nodes as ProductVariant[], options)

  const onSelectSize = (size: string) => {
    const currentVariant = variants.nodes?.find(variant => {
      const { selectedOptions } = variant ?? {}

      return selectedOptions.some(({ name, value }) => name === SIZE_OPTION_NAME && value === size)
    })

    setState({ selectedSize: size, selectedVariant: currentVariant ?? null })
  }

  const setSelectedSize = (payload: string) => {
    dispatch({ type: ProductReducerActionType.SET_SELECTED_SIZE, payload })
  }

  const setSelectedVariant = (payload: PdpProductVariantsFragment) => {
    dispatch({ type: ProductReducerActionType.SET_SELECTED_VARIANT, payload })
  }

  const setState = (payload: Partial<ProductContextState>) => {
    dispatch({ type: ProductReducerActionType.SET_STATE, payload })
  }

  const state: ProductContextState = {
    ...reducerState,
    product,
    sizeOptions,
  }

  const actions = {
    setSelectedSize,
    setSelectedVariant,
    setState,
    onSelectSize,
  }

  return (
    <ProductState.Provider value={state}>
      <ProductActions.Provider value={actions}>{children}</ProductActions.Provider>
    </ProductState.Provider>
  )
}

export default ProductProvider

export const useProductState = () => useContext(ProductState)
export const useProductActions = () => useContext(ProductActions)
