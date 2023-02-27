import { ReactNode } from 'react'

export type CartContextState = {
  isCartOpen: boolean
}

export type CartContextActions = {
  setIsCartOpen: (payload: boolean) => void
}

export type CartContextReducerActionType = 'SET_IS_CART_OPEN'

export type CartContextReducerAction = { payload: any; type: CartContextReducerActionType }

export type CartContextProviderProps = {
  children: ReactNode
}
