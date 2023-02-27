import { CART_LINES_FRAGMENT, USER_ERROR_FRAGMENT } from '../fragments'

export const ADD_LINES_MUTATION = /* gql */ `#graphql
  ${CART_LINES_FRAGMENT}
  ${USER_ERROR_FRAGMENT}

  mutation CartLinesAddMutation(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartLinesFragment
      }
      errors: userErrors {
        ...UserErrorFragment
      }
    }
  }
  
`
