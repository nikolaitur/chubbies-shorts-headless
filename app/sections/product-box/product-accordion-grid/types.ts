import { MetaobjectFieldV2 } from '~/global-types'
import { InfoBlockFragment } from '~/graphql/generated'

export type ProductAccordionGridProps = {
  fields: InfoBlockFragment['fields']
}

export type ProductAccordionGridFlattenedFields = {
  title?: MetaobjectFieldV2
  cards?: MetaobjectFieldV2
  closed_on_page_load?: MetaobjectFieldV2
}

export type CardFlattenedFields = {
  image?: MetaobjectFieldV2
  text?: MetaobjectFieldV2
}
