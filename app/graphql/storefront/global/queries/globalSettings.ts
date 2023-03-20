import {
  MEDIA_IMAGE_FRAGMENT,
  METAOBJECT_FIELDS_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from '../../global/fragments'

export const GLOBAL_SETTINGS_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  ${METAOBJECT_FIELDS_FRAGMENT}

  query GlobalSettingsQuery($handle: String!) {
    globalSettings: metaobject(
      handle: { handle: $handle, type: "global_site_settings" }
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
      shippingEstimates: field(key: "shipping_estimate_configuration") {
        reference {
          ... on Metaobject {
            ...shippingEstimatesContent
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
      cartTitle: field(key: "cart_title") {
        value
      }
      cartKeepShoppingText: field(key: "cart_keep_shopping_text") {
        value
      }
      cartKeepShoppingLink: field(key: "cart_keep_shopping_link") {
        value
      }
      cartEmptyCartEmoji: field(key: "cart_empty_cart_emoji") {
        value
      }
      cartEmptyMessage: field(key: "cart_empty_message") {
        value
      }
      cartEmptyButtonText: field(key: "cart_empty_button_text") {
        value
      }
      cartEmptyButtonCtaLink: field(key: "cart_empty_button_cta_link") {
        value
      }
      outOfStockMessaging: field(key: "out_of_stock_messaging") {
        reference {
          ... on Metaobject {
            ...MetaobjectFieldsFragment
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
  fragment shippingEstimatesContent on Metaobject {
    id
    internal_name: field(key: "internal_name") {
      value
    }
    delivery_estimate_days: field(key: "delivery_estimate_days") {
      value
    }
    holiday_dates: field(key: "holiday_dates") {
      value
    }
    saturday_delivery: field(key: "saturday_delivery") {
      value
    }
    saturday_shipping: field(key: "saturday_shipping") {
      value
    }
    section_content: field(key: "section_content") {
      value
    }
    cutoff_time: field(key: "cutoff_time") {
      value
    }
  }
`
