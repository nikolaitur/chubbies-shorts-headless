import { PRODUCT_MINI_CARD_FRAGMENT } from '../fragments/productMiniCardFragment'

export const PRODUCT_FROM_IDS_QUERY = /* gql */ `#graphql
  ${PRODUCT_MINI_CARD_FRAGMENT}

  query GetProductsWithIds($ids: [ID!]!){
    nodes(ids:$ids) {
      ... ProductMiniCardFragment
    }
  }
`
