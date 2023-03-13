import { PDP_PRODUCT_VARIANTS_FRAGMENT } from './pdp'

export const NOSTO_RECOMMENDED_PRODUCTS_QUERY = /* gql */ `#graphql
  ${PDP_PRODUCT_VARIANTS_FRAGMENT}

  query NostoRecommendedProductsQuery($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        variants(first: 10) {
          nodes {
            ...PdpProductVariantsFragment
          }
        }
        displayName: metafield(namespace: "custom", key: "display_name") {
          value
        }
        productGroup: metafield(namespace: "custom", key: "product_group") {
          value
          reference {
            ... on Collection {
              title
              description
              productTitle: metafield(namespace: "custom", key: "product_title") {
                value
              }
            }
          }
        }
        featuredImage {
          altText
          height
          width
          url
        }
        options {
          name
          values
        }
      }
    }
  }
`
