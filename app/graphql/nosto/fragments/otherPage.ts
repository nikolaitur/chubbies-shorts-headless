export const NOSTO_OTHER_PAGE_FRAGMENT = /* gql */ `#graphql
  fragment NostoOtherPageFragment on PageRequestEntity {
    forOtherPage(params: { isPreview: $isPreview }) {
      ...NostoRecommendationsFragment
    }
  }
`
