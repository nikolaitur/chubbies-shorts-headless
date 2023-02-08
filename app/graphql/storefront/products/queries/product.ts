export const PDP_QUERY = /* gql */ `#graphql
  fragment InfoBlock on Metaobject {
    type
    fields {
      key
      value
      reference {
        ... on MediaImage {
          image {
            url
            width
            height
            altText
          }
        }
      }
    }
  }

  query PDP($handle: String!) {
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
