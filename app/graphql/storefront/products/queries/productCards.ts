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
