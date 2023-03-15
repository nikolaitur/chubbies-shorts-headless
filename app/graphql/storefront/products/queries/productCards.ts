import { PRODUCT_CARD_FRAGMENT } from '../../global/fragments'

export const PRODUCT_CARDS_QUERY = /* gql */ `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  
  query ProductCardQuery ($productIds:[ID!]!) {
    nodes(ids:$productIds){
      ...ProductCardFragment
    }
  }
`
