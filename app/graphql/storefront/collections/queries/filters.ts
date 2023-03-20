import { MEDIA_IMAGE_FRAGMENT } from '../../global/fragments'
import { COLOR_FRAGMENT } from '../../products/queries'

export const COLORS_FROM_IDS_QUERY = /* gql */ `#graphql
    ${COLOR_FRAGMENT}
    ${MEDIA_IMAGE_FRAGMENT}

    query ColorFromIdsQuery($ids: [ID!]!) {
        nodes(ids: $ids) {
            ... ColorFragment
        }
    }
`
