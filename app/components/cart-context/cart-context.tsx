import { Context, createContext, useContext, useReducer } from 'react'
import {
  CartContextActions,
  CartContextProviderProps,
  CartContextReducerAction,
  CartContextState,
} from './types'

const CartState = createContext<CartContextState | null>(null) as Context<CartContextState>
const CartActions = createContext<CartContextActions | null>(null) as Context<CartContextActions>

const initialState = {
  isCartOpen: false,
}

const reducer = (state: typeof initialState, action: CartContextReducerAction) => {
  const { payload, type } = action

  switch (type) {
    case 'SET_IS_CART_OPEN':
      return { ...state, isCartOpen: payload }

    default:
      return state
  }
}

export const CartProvider = ({ children }: CartContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setIsCartOpen = (payload: boolean) => {
    dispatch({ type: 'SET_IS_CART_OPEN', payload })
  }

  const actions = {
    setIsCartOpen,
  }

  return (
    <CartState.Provider value={state}>
      <CartActions.Provider value={actions}>{children}</CartActions.Provider>
    </CartState.Provider>
  )
}

export const useCartState = () => useContext(CartState)
export const useCartActions = () => useContext(CartActions)
