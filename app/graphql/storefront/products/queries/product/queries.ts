import { MEDIA_IMAGE_FRAGMENT } from '~/graphql/storefront/global/fragments'
import {
  COLOR_FRAGMENT,
  COLOR_GROUP_METAFIELD_FRAGMENT,
  COLOR_METAFIELD_FRAGMENT,
  INFO_BLOCK_FIELD_REFERENCE_FRAGMENT,
  INFO_BLOCK_FRAGMENT,
  INSEAM_METAFIELD_FRAGMENT,
  PDP_MEDIA_FRAGMENT,
  PDP_PRODUCT_VARIANTS_FRAGMENT,
  PRODUCT_GROUP_FRAGMENT,
  PRODUCT_GROUP_VARIANTS_FRAGMENT,
} from './fragments'

export const PDP_PRODUCT_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}
  ${PDP_MEDIA_FRAGMENT}
  ${PDP_PRODUCT_VARIANTS_FRAGMENT}
  ${INFO_BLOCK_FIELD_REFERENCE_FRAGMENT}
  ${INFO_BLOCK_FRAGMENT}
  ${COLOR_FRAGMENT}
  ${COLOR_METAFIELD_FRAGMENT}
  ${COLOR_GROUP_METAFIELD_FRAGMENT}
  ${INSEAM_METAFIELD_FRAGMENT}

  query PpdProductQuery(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      handle
      media(first: 20) {
        nodes {
          ...PdpMediaFragment
        }
      }
      variants(first: 10) {
        nodes {
          ...PdpProductVariantsFragment
        }
      }
      productGroup: metafield(namespace: "custom", key: "product_group") {
        value
      }
      infoBlocks: metafield(namespace: "custom", key: "product_info_blocks") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              ...InfoBlockFragment
            }
          }
        }
      }
      inseam: metafield(namespace: "custom", key: "inseam_length") {
        value
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...PdpProductVariantsFragment
      }
      options {
        name
        values
      }
      ...ColorMetafieldFragment
      ...ColorGroupMetafieldFragment
      ...InseamMetafieldFragment
    }
  }
`

export const PDP_PRODUCT_GROUP_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}
  ${PRODUCT_GROUP_VARIANTS_FRAGMENT}
  ${COLOR_FRAGMENT}
  ${COLOR_METAFIELD_FRAGMENT}
  ${COLOR_GROUP_METAFIELD_FRAGMENT}
  ${INSEAM_METAFIELD_FRAGMENT}
  ${PRODUCT_GROUP_FRAGMENT}

  query PpdProductGroupQuery(
    $productGroupId: ID!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(id:$productGroupId) {
      ...ProductGroupFragment
    }
  }
`
