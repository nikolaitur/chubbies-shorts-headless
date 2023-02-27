import { CART_LINES_FRAGMENT, USER_ERROR_FRAGMENT } from '../fragments'

export const LINES_UPDATE_MUTATION = /* gql */ `#graphql
  ${CART_LINES_FRAGMENT}
  ${USER_ERROR_FRAGMENT}
  mutation CartLinesUpdateMutation(
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
        ...UserErrorFragment
      }
    }
  }
`
