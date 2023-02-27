import { CART_LINES_FRAGMENT, USER_ERROR_FRAGMENT } from '../fragments'

export const CREATE_CART_MUTATION = /* gql */ `#graphql
  ${CART_LINES_FRAGMENT}
  ${USER_ERROR_FRAGMENT}

  mutation CartCreateMutation($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      cart {
        ...CartLinesFragment
      }
      errors: userErrors {
        ...UserErrorFragment
      }
    }
  }

`
