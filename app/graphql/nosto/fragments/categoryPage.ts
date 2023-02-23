export const NOSTO_CATEGORY_PAGE_FRAGMENT = /* gql */ `#graphql
  fragment NostoCategoryPageFragment on PageRequestEntity {
    forCategoryPage(params: { isPreview: $isPreview }, category: $categoryName) {
      ...NostoRecommendationsFragment
    }
  }
`
