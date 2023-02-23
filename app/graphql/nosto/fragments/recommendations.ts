export const NOSTO_RECOMMENDATIONS_FRAGMENT = /* gql */ `#graphql
  fragment NostoRecommendationsFragment on RecommenderResult {
    divId
    resultId
    primary {
      productId
    }
  }
`
