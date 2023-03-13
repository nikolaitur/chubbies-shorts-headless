import { HTMLAttributes } from 'react'
import { MetaobjectFieldV2 } from '~/global-types'
import { InfoBlockFragment } from '~/graphql/generated'

export type ProductBoxNostoProps = HTMLAttributes<HTMLDivElement> & {
  fields: InfoBlockFragment['fields']
}

export type ProductBoxNostoFlattenedFields = {
  nosto_placement_id?: MetaobjectFieldV2
  section_title?: MetaobjectFieldV2
}
