export const PDP_MEDIA_FRAGMENT = /* gql */ `#graphql
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
`

export const PDP_PRODUCT_VARIANTS_FRAGMENT = /* gql */ `#graphql
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
`

export const INFO_BLOCK_FIELD_REFERENCE_FRAGMENT = /* gql */ `#graphql
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
`

export const INFO_BLOCK_FRAGMENT = /* gql */ `#graphql
  fragment InfoBlockFragment on Metaobject {
    type
    fields {
      key
      value
      reference {
        ...InfoBlockFieldReferenceFragment
      }
      references(first: 10) {
        nodes {
          ...InfoBlockFieldReferenceFragment
        }
      }
    }
  }
`

export const COLOR_FRAGMENT = /* gql */ `#graphql
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
`

export const COLOR_METAFIELD_FRAGMENT = /* gql */ `#graphql
  fragment ColorMetafieldFragment on Product {
    color: metafield(namespace: "custom", key: "swatch") {
      reference {
        ... on Metaobject {
          ...ColorFragment
        }
      }
    }
  }
`

export const COLOR_GROUP_METAFIELD_FRAGMENT = /* gql */ `#graphql
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
`

export const INSEAM_METAFIELD_FRAGMENT = /* gql */ `#graphql
  fragment InseamMetafieldFragment on Product {
    inseam: metafield(namespace: "custom", key: "inseam_length") {
      value
    }
  }
`

export const PRODUCT_GROUP_VARIANTS_FRAGMENT = /* gql */ `#graphql
  fragment ProductGroupVariantsFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
  }
`

export const PRODUCT_GROUP_FRAGMENT = /* gql */ `#graphql
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
`
