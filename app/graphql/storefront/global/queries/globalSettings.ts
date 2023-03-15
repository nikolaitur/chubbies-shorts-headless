import { MEDIA_IMAGE_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '../../global/fragments'

export const GLOBAL_SETTINGS_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}

  query GlobalSettings($globalSettingsHandle: String!) {
    globalSettings: metaobject(
      handle: { handle: $globalSettingsHandle, type: "global_site_settings" }
    ) {
      promoBarAnnouncements: field(key: "header_announcements") {
        references(first: 5) {
          nodes {
            ...AnnouncementContent
          }
        }
      }
      promoBarMenuHandle: field(key: "announcement_menu_handle") {
        value
      }
      footerMenuHandle: field(key: "footer_menu_handle") {
        value
      }
      legalLinksMenuHandle: field(key: "legal_links_menu_handle") {
        value
      }
      headerNavMenuHandle: field(key: "header_nav_menu_handle") {
        value
      }
      brandLogo: field(key: "brand_logo") {
        reference {
          ... on MediaImage {
            ...MediaImageFragment
          }
        }
      }
      cartBlocksAboveCartItems: field(key: "cart_blocks_above_cart_items") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              id
              type
              fields {
                key
                value
                references(first: 10) {
                  nodes {
                    ... on Metaobject {
                      id
                      fields {
                        key
                        value
                        reference {
                          ... on Product {
                            ...ProductCardFragment
                          }
                          ... on MediaImage {
                            ...MediaImageFragment
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  fragment AnnouncementContent on Metaobject {
    id
    title: field(key: "title") {
      value
    }
    content: field(key: "content") {
      value
    }
    link: field(key: "link") {
      value
    }
    font_color: field(key: "font_color") {
      value
    }
    background_color: field(key: "background_color") {
      value
    }
    start_date: field(key: "start_date") {
      value
    }
    end_date: field(key: "end_date") {
      value
    }
    countdown: field(key: "countdown") {
      value
    }
  }
`
