export const NOSTO_SEARCH_PAGE_FRAGMENT = /* gql */ `#graphql
  fragment NostoSearchPageFragment on PageRequestEntity {
    forSearchPage(params: { isPreview: $isPreview }, term: $searchTerm) {
      ...NostoRecommendationsFragment
    }
  }
`
