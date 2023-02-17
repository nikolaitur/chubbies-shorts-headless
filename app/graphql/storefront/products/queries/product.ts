import { MEDIA_IMAGE_FRAGMENT } from '~/graphql/global-fragments'

export const PDP_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}

  fragment PdpMedia on Media {
    ... on Model3d {
      mediaContentType
      alt
      previewImage {
        altText
        url
      }
      sources {
        url
      }
      __typename
    }
    ... on MediaImage {
      mediaContentType
      ...MediaImage
      __typename
    }
    ... on Video {
      mediaContentType
      previewImage {
        url
      }
      sources {
        mimeType
        url
      }
      __typename
    }
    ... on ExternalVideo {
      mediaContentType
      embedUrl
      host
      __typename
    }
  }

  fragment PdpProductVariants on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    product {
      title
      handle
    }
  }

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

  query PDP($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      media(first: 50) {
        nodes {
          ...PdpMedia
        }
      }

      variants(first: 10) {
        nodes {
          ...PdpProductVariants
        }
      }

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
