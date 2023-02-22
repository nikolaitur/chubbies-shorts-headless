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
