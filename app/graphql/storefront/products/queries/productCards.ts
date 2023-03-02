export const PRODUCT_CARDS_QUERY = /* gql */ `#graphql
  query ProductCards ($productIds:[ID!]!) {
    nodes(ids:$productIds){
      ...on Product {
        id
        product_group:metafield(namespace:"custom",key:"product_group") {
          value
        }
        inseam_length:metafield(namespace:"custom",key:"inseam_length") {
          value
        }
        swatch:metafield(namespace:"custom",key:"swatch") {
          value
        }
      }
    }
  }
`
