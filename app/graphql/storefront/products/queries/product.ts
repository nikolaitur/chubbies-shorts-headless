import { MEDIA_IMAGE_FRAGMENT } from '~/graphql/storefront/global-fragments'

export const PDP_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}

  fragment PdpMediaFragment on Media {
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
      ...MediaImageFragment
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

  fragment ProductGroupVariantsFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
  }

  fragment PdpProductVariantsFragment on ProductVariant {
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

  fragment InfoBlockFieldReferenceFragment on MetafieldReference {
    ... on MediaImage {
      ...MediaImageFragment
    }

    ... on Metaobject {
      type
      fields {
        key
        value
        reference {
          ... on MediaImage {
            ...MediaImageFragment
          }
        }
      }
    }
  }

  fragment InfoBlockFragment on Metaobject {
    type
    fields {
      key
      value
      reference {
        ...InfoBlockFieldReferenceFragment
      }
      references(first: 20) {
        nodes {
          ...InfoBlockFieldReferenceFragment
        }
      }
    }
  }

  fragment ColorMetafieldFragment on Product {
    color: metafield(namespace: "custom", key: "swatch") {
      reference {
        ... on Metaobject {
          ...ColorFragment
        }
      }
    }
  }

  fragment ColorGroupMetafieldFragment on Product {
    colorGroup: metafield(namespace: "custom", key: "swatch_group") {
      reference {
        ... on Metaobject {
          name: field(key: "storefront_name") {
            value
          }
        }
      }
    }
  }

  fragment ColorFragment on Metaobject {
    type
    fields {
      key
      value
      reference {
        ... on MediaImage {
          ...MediaImageFragment
        }

        ... on Metaobject {
          fields {
            key
            value
          }
        }
      }
    }
  }

  fragment InseamMetafieldFragment on Product {
    inseam: metafield(namespace: "custom", key: "inseam_length") {
      value
    }
  }

  fragment ProductGroupFragment on Collection {
    products(first: 100) {
      nodes {
        handle
        id
        variants(first: 10) {
          nodes {
            ...ProductGroupVariantsFragment
          }
        }
        ...ColorMetafieldFragment
        ...ColorGroupMetafieldFragment
        ...InseamMetafieldFragment
      }
    }
  }

  query PdpQuery(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      handle
      media(first: 50) {
        nodes {
          ...PdpMediaFragment
        }
      }
      variants(first: 10) {
        nodes {
          ...PdpProductVariantsFragment
        }
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
      productGroup: metafield(namespace: "custom", key: "product_group") {
        value
        reference {
          ...ProductGroupFragment
        }
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
