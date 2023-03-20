import { MEDIA_IMAGE_FRAGMENT } from '../../global/fragments'
import {
  COLOR_FRAGMENT,
  COLOR_GROUP_METAFIELD_FRAGMENT,
  COLOR_METAFIELD_FRAGMENT,
  INSEAM_METAFIELD_FRAGMENT,
  PRODUCT_GROUP_FRAGMENT,
  PRODUCT_GROUP_VARIANTS_FRAGMENT,
} from './pdp/fragments'

export const PRODUCT_GROUPS_QUERY = /* gql */ `#graphql
${COLOR_FRAGMENT}
${COLOR_METAFIELD_FRAGMENT}

${INSEAM_METAFIELD_FRAGMENT}
${PRODUCT_GROUP_FRAGMENT}
${PRODUCT_GROUP_VARIANTS_FRAGMENT}
${MEDIA_IMAGE_FRAGMENT}

  query ProductGroups($productGroupIds:[ID!]!) {
    nodes(ids:$productGroupIds) {
      ...ProductGroupFragment
    }
  }
`
