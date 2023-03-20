import { MEDIA_IMAGE_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '../../global/fragments'
import {
  COLOR_FRAGMENT,
  COLOR_METAFIELD_FRAGMENT,
  INSEAM_METAFIELD_FRAGMENT,
  PRODUCT_GROUP_VARIANTS_FRAGMENT,
} from './pdp'

export const PRODUCT_CARDS_QUERY = /* gql */ `#graphql
  ${INSEAM_METAFIELD_FRAGMENT}
  ${COLOR_METAFIELD_FRAGMENT}
  ${COLOR_FRAGMENT}
  ${MEDIA_IMAGE_FRAGMENT}
  ${PRODUCT_GROUP_VARIANTS_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  
  query ProductCardQuery ($productIds:[ID!]!) {
    nodes(ids:$productIds){
      ...ProductCardFragment
    }
  }
`
