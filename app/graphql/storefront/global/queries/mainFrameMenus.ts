export const MainFrameMenusQuery = /* gql */ `#graphql
query MainFrameMenus(
  $promoBarMenuHandle:String!,
  $footerMenuHandle:String!,
  $legalLinksMenuHandle:String!,
  $headerNavMenuHandle:String!
){
	promoBarMenu:menu(handle:$promoBarMenuHandle) {
    ...MenuFragment
  }
  footerMenu:menu(handle:$footerMenuHandle) {
    ...MenuFragment
  }
  legalLinksMenu:menu(handle:$legalLinksMenuHandle) {
    ...MenuFragment
  }
  headerNavMenu:menu(handle:$headerNavMenuHandle) {
    ...MenuFragment
  }
}
fragment MenuFragment on Menu {
  items {
		...MenuItemFragment
  }
}
fragment MenuItemFragment on MenuItem {
  title
  id
  title
  url
  resourceId
  items {
    title
    id
    title
    url
    resourceId
    items {
      title
      id
      title
      url
      resourceId
    }
  }
}
`
