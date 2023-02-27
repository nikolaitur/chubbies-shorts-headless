import { MEDIA_IMAGE_FRAGMENT } from '../../global/fragments'

export const COLLECTION_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}

  query CollectionQuery($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      sections: metafield(namespace: "custom", key: "sections") {
        data: references(first: 100) {
          nodes {
            ... on Metaobject {
              type
              id
              fields {
                key
                value
                type
                reference {
                  ... on MediaImage {
                    ...MediaImageFragment
                  }
                }
              }
            }
          }
        }
      }
      collectionBanners: metafield(namespace: "collection", key: "collection_cards") {
        data: references(first: 5) {
          collectionCards: nodes {
            ... on Metaobject {
              id
              title: field(key: "title") {
                value
              }
              cta: field(key: "link") {
                value
              }
              media: field(key: "image") {
                reference {
                  ... on MediaImage {
                    ...MediaImageFragment
                  }
                }
              }
            }
          }
        }
      }
      filterGroup: metafield(namespace: "collection", key: "filter_group") {
        data: references(first: 5) {
          filterGroup: nodes {
            ... on Metaobject {
              id
              title: field(key: "title") {
                value
              }
              filters: field(key: "filters") {
                data: references(first: 20) {
                  nodes {
                    ... on Collection {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }
      products(first: 250, sortKey: BEST_SELLING, reverse: true) {
        nodes {
          id
          title
          handle
          media: images(first: 1) {
            nodes {
              src
              alt: altText
            }
          }
          productCardTitle: metafield(namespace: "product", key: "product_card_display_name") {
            value
          }
          displayTags: metafield(namespace: "product", key: "display_tags") {
            data: references(first: 5) {
              tags: nodes {
                ... on Metaobject {
                  id
                  tagMessage: field(key: "display_tag_message") {
                    value
                  }
                  textHexColor: field(key: "display_tag_color") {
                    value
                  }
                  bgHexColor: field(key: "background_color") {
                    value
                  }
                }
              }
            }
          }
          hoverMedia: metafield(namespace: "product", key: "collection_hover_media") {
            reference {
              ... on MediaImage {
                ...MediaImageFragment
              }
            }
          }
          variants(first: 10) {
            nodes {
              ... on ProductVariant {
                id
                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                collectionThumbnail: metafield(namespace: "variant", key: "collection_thumbnail") {
                  reference {
                    ... on MediaImage {
                      ...MediaImageFragment
                    }
                  }
                }
                variantColor: metafield(namespace: "variant", key: "variant_color") {
                  data: reference {
                    ... on Metaobject {
                      id
                      name: field(key: "name") {
                        value
                      }
                      hex: field(key: "hex") {
                        value
                      }
                      secondColorHex: field(key: "second_color_hex") {
                        value
                      }
                      dividerColorHex: field(key: "divider_color_hex") {
                        value
                      }
                    }
                  }
                }
                thumbnail: image {
                  src: originalSrc
                  alt: altText
                }
              }
            }
          }
        }
      }
    }
  }
`
