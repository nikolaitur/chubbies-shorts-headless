export const NOSTO_CART_PAGE_FRAGMENT = /* gql */ `#graphql
  fragment NostoCartPageFragment on PageRequestEntity {
    forCartPage(params: { isPreview: $isPreview }, value: $cartValue) {
      ...NostoRecommendationsFragment
    }
  }
`
