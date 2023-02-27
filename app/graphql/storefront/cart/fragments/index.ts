export const USER_ERROR_FRAGMENT = /* gql */ `#graphql
  fragment UserErrorFragment on CartUserError {
    message
    field
    code
  }
`

export const CART_LINES_FRAGMENT = /* gql */ `#graphql
  fragment CartLinesFragment on Cart {
    id
    totalQuantity
  }
`
