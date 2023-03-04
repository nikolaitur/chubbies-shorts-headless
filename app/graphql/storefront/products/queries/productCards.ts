export const PRODUCT_CARDS_QUERY = /* gql */ `#graphql
  query ProductCardQuery ($productIds:[ID!]!) {
    nodes(ids:$productIds){
      ...ProductCardFragment
    }
  }
  fragment ProductCardFragment on Product {
    id
    title
    handle
    product_group:metafield(namespace:"custom",key:"product_group") {
      value
    }
    inseam_length:metafield(namespace:"custom",key:"inseam_length") {
      value
    }
    swatch:metafield(namespace:"custom",key:"swatch") {
      value
    }
    display_name:metafield(namespace:"custom",key:"display_name") {
      value
    }
    variants(first:7){
      nodes {
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
