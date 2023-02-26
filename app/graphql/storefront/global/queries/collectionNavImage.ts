export const COLLECTION_NAV_IMAGES = /* gql */ `#graphql
  query CollectionNavImages(
    $ids: [ID!]!
    ) {
    nodes(ids: $ids) {
      ...NavCollectionFragment
    }
  }
  fragment NavCollectionFragment on Collection  {
    id
    navigation_image:metafield(key: "navigation_image", namespace: "custom") {
      reference {
        ... on MediaImage {
          id
          image {
              altText
              height
              id
              originalSrc
              url
              width
          }
        }
      }
    }
  }
  `
