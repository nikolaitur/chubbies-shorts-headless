import { LINES_CART_FRAGMENT, USER_ERROR_FRAGMENT } from '../fragments'

export const LINES_UPDATE_MUTATION = /* gql */ `#graphql
  ${LINES_CART_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
  mutation (
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartLinesFragment
      }
      errors: userErrors {
        ...ErrorFragment
      }
    }
  }
`
