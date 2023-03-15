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
    inseam_length:metafield(namespace: "custom",key: "inseam_length") {
      value
    }
    color:metafield(namespace: "custom",key: "swatch") {
      value
    }
    display_name:metafield(namespace: "custom",key: "display_name") {
      value
    }
    variants(first:7) {
      nodes {
        id
        price {
          currencyCode
          amount
        }
        compareAtPrice {
          currencyCode
          amount
        }
        selectedOptions{
          name
          value
        }
      }
    }
    featuredImage {
      id
      width
      height
      url
      altText
    }
  }
`
