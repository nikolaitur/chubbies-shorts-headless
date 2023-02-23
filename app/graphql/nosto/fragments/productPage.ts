export const NOSTO_PRODUCT_PAGE_FRAGMENT = /* gql */ `#graphql
  fragment NostoProductPageFragment on PageRequestEntity {
    forProductPage(params: { isPreview: $isPreview }, product: $productID) {
      ...NostoRecommendationsFragment
    }
  }
`
