export * from './metaobject-field'

export const MEDIA_IMAGE_FRAGMENT = /* gql */ `#graphql
  fragment MediaImageFragment on MediaImage {
    image {
      url
      width
      height
      altText
    }
  }
`
export const PRODUCT_CARD_FRAGMENT = /* gql */ `#graphql
  fragment ProductCardFragment on Product {
    id
    title
    handle
    productGroup: metafield(namespace: "custom", key: "product_group") {
      value
      reference {
        ... on Collection {
          title
          description
        }
      }
    }
    display_name:metafield(namespace: "custom",key: "display_name") {
      value
    }
    tags
    variants(first:7) {
      nodes {
        ...ProductGroupVariantsFragment
      }
    }
    images(first: 2) {
      nodes {
        ... on Image {
          url
          altText
          width
          height
        }
      }
    }
    ...InseamMetafieldFragment
    ...ColorMetafieldFragment
  }
`
