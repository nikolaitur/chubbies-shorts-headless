export const COLLECTION_QUERY = /* gql */ `#graphql

  query CollectionQuery($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        src 
        altText
        width
        height
      }
    }
  }
`
