export const GLOBAL_SETTINGS_QUERY = /* gql */ `#graphql
query GlobalSettings($globalSettingsHandle:String!) {
  globalSettings:metaobject(handle:{handle:$globalSettingsHandle,type:"global_site_settings"}) {
    promoBarAnnouncements:field(key:"header_announcements"){
      references (first: 5) {
        nodes {
          ...AnnouncementContent
        }
      }
    }
    promoBarMenuHandle:field(key:"announcement_menu_handle") {
      value
    }
    footerMenuHandle:field(key:"footer_menu_handle") {
      value
    }
    legalLinksMenuHandle:field(key:"legal_links_menu_handle") {
      value
    }
  }
}
fragment AnnouncementContent on Metaobject {
	id
  title:field(key: "title") {
      value
  }
  content:field(key: "content") {
      value
  }
  link:field(key: "link") {
      value
  }
  font_color:field(key: "font_color") {
      value
  }
  background_color:field(key: "background_color") {
      value
  }
  start_date:field(key: "start_date") {
      value
  }
  end_date:field(key: "end_date") {
      value
  }
  countdown:field(key: "countdown") {
      value
  }
}
`
