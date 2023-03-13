import {
  NOSTO_CART_PAGE_FRAGMENT,
  NOSTO_CATEGORY_PAGE_FRAGMENT,
  NOSTO_FRONT_PAGE_FRAGMENT,
  NOSTO_OTHER_PAGE_FRAGMENT,
  NOSTO_PRODUCT_PAGE_FRAGMENT,
  NOSTO_RECOMMENDATIONS_FRAGMENT,
  NOSTO_SEARCH_PAGE_FRAGMENT,
} from '~/graphql/nosto/fragments'

export const UPDATE_SESSION_MUTATION = /* gql */ `#graphql
  ${NOSTO_PRODUCT_PAGE_FRAGMENT}
  ${NOSTO_FRONT_PAGE_FRAGMENT}
  ${NOSTO_CATEGORY_PAGE_FRAGMENT}
  ${NOSTO_SEARCH_PAGE_FRAGMENT}
  ${NOSTO_CART_PAGE_FRAGMENT}
  ${NOSTO_RECOMMENDATIONS_FRAGMENT}
  ${NOSTO_OTHER_PAGE_FRAGMENT}

  mutation UpdateSessionMutation(
    $productPage: Boolean!
    $homePage: Boolean!
    $categoryPage: Boolean!
    $otherPage: Boolean!
    $searchPage: Boolean!
    # $cartPage: Boolean! - unused variable causing query error
    $isPreview: Boolean!
    $CID: String!
    $productID: String!
    $categoryName: String!
    $cartValue: Float!
    $event: InputEvent!
    $searchTerm: String!
  ) {
    updateSession(by: BY_CID, id: $CID, params: { event: $event }) {
      pages {
        ...NostoCartPageFragment
        ...NostoProductPageFragment @include(if: $productPage)
        ...NostoFrontPageFragment @include(if: $homePage)
        ...NostoCategoryPageFragment @include(if: $categoryPage)
        ...NostoSearchPageFragment @include(if: $searchPage)
        ...NostoOtherPageFragment @include(if: $otherPage)
      }
    }
  }
`
