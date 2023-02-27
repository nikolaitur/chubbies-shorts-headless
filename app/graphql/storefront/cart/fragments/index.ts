export const USER_ERROR_FRAGMENT = `#graphql
  fragment ErrorFragment on CartUserError {
    message
    field
    code
  }
`

export const LINES_CART_FRAGMENT = `#graphql
  fragment CartLinesFragment on Cart {
    id
    totalQuantity
  }
`
