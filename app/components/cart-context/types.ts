import { ReactNode } from 'react'

export type CartContextState = {
  isCartOpen: boolean
  freeShippingText: string
}

export type CartContextActions = {
  setIsCartOpen: (payload: boolean) => void
  setFreeShippingText: (payload: string) => void
}

export type CartContextReducerActionType = 'SET_IS_CART_OPEN' | 'SET_FREE_SHIPPING_TEXT'

export type CartContextReducerAction = { payload: any; type: CartContextReducerActionType }

export type CartContextProviderProps = {
  children: ReactNode
}
