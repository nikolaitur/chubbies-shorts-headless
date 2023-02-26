export const MainFrameMenusQuery = /* gql */ `
query MainFrameMenus(
  $promoBarMenuHandle:String!,
  $footerMenuHandle:String!,
  $legalLinksMenuHandle:String!
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
}
fragment MenuFragment on Menu {
  items {
  	id
  	title
    url
  	items {
      id
      title
      url
  	}
  }
}
`
