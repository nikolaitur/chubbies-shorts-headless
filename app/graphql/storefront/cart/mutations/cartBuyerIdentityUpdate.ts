export const UPDATE_CART_BUYER_COUNTRY = /* gql */ `#graphql
  mutation CartBuyerIdentityUpdateMutation(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        buyerIdentity {
          email
          phone
          countryCode
        }
      }
      errors: userErrors {
        message
        field
        code
      }
    }
  }
`
