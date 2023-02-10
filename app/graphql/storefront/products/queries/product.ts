import { MEDIA_IMAGE_FRAGMENT } from '~/graphql/global-fragments'

export const PDP_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}

  fragment InfoBlockFieldReference on MetafieldReference {
    ... on MediaImage {
      ...MediaImage
    }

    ... on Metaobject {
      type
      fields {
        key
        value
        reference {
          ... on MediaImage {
            ...MediaImage
          }
        }
      }
    }
  }

  fragment InfoBlock on Metaobject {
    type
    fields {
      key
      value
      reference {
        ...InfoBlockFieldReference
      }
      references(first: 20) {
        nodes {
          ...InfoBlockFieldReference
        }
      }
    }
  }

  query PDP(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language){
    product(handle: $handle) {
      infoBlocks: metafield(namespace: "custom", key: "product_info_blocks") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              ...InfoBlock
            }
          }
        }
      }
    }
  }
`
