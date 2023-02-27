export const DISCOUNT_CODES_UPDATE = /* gql */ `#graphql
  mutation CartDiscountCodesUpdateMutation(
    $cartId: ID!
    $discountCodes: [String!]
    $country: CountryCode = ZZ
  ) @inContext(country: $country) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        id
        discountCodes {
          code
        }
      }
      errors: userErrors {
        field
        message
      }
    }
  }
`
