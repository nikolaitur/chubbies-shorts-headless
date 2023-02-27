import { USER_ERROR_FRAGMENT } from '../fragments'

export const REMOVE_LINE_ITEMS_MUTATION = /* gql */ `#graphql
${USER_ERROR_FRAGMENT}
  mutation CartLinesRemoveMutation($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode, $country: CountryCode)
  @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      errors: userErrors {
        ...UserErrorFragment
      }
    }
  }
`
