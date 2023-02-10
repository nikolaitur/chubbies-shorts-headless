import { MetaobjectFieldV2 } from '~/global-types'
import { InfoBlockFragment } from '~/graphql/generated'

export type ProductAccordionProps = {
  fields: InfoBlockFragment['fields']
}

export type ProductAccordionFlattenedFields = {
  body_text: MetaobjectFieldV2
  display_title: MetaobjectFieldV2
}
