import { MEDIA_IMAGE_FRAGMENT, METAOBJECT_FIELDS_FRAGMENT } from '../fragments'

export const MESSAGING_CAMPAIGNS_QUERY = /* gql */ `#graphql
  ${MEDIA_IMAGE_FRAGMENT}
  ${METAOBJECT_FIELDS_FRAGMENT}

  query MessagingCampaignsQuery {
    messagingCampaigns: metaobjects(type: "messaging_campaign", first: 20) {
      nodes {
        ...MetaobjectFieldsFragment
      }
    }
  }
`
