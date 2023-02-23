export const FOOTER_QUERY = /* gql */ `#graphql
    query FooterMenuContent(
        $footerMenuHandle: String!
        $footerLegalLinksHandle: String!) {
            footerMenu: menu(handle: $footerMenuHandle) {
                items {
                    ...FooterMenuItem
                }
            }
            footerLegalLinks: menu(handle: $footerLegalLinksHandle) {
                items {
                    ...FooterLegalLinksItem
                }
            }
        }
        fragment FooterMenuItem on MenuItem {
            id
            title
            items {
                id
                title
                url
            }
        }
        fragment FooterLegalLinksItem on MenuItem {
            id
            title
            url
        }
`
