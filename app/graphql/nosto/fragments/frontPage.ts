export const NOSTO_FRONT_PAGE_FRAGMENT = /* gql */ `#graphql
  fragment NostoFrontPageFragment on PageRequestEntity {
    forFrontPage(params: { isPreview: $isPreview }) {
      ...NostoRecommendationsFragment
    }
  }
`
