import { MetaobjectFieldV2 } from '~/global-types'
import { InfoBlockFragment } from '~/graphql/generated'

export type ProductAccordionGridProps = {
  fields: InfoBlockFragment['fields']
}

export type ProductAccordionGridFlattenedFields = {
  title: MetaobjectFieldV2
  cards: MetaobjectFieldV2
}

export type CardFlattenedFields = {
  image: MetaobjectFieldV2
  text: MetaobjectFieldV2
}
