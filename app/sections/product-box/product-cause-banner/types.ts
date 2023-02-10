import { HTMLAttributes } from 'react'
import { MetaobjectFieldV2 } from '~/global-types'
import { InfoBlockFragment } from '~/graphql/generated'

export type ProductCauseBannerProps = HTMLAttributes<HTMLDivElement> & {
  fields: InfoBlockFragment['fields']
}

export type ProductCauseBannerFlattenedFields = {
  background_image: MetaobjectFieldV2
  background_opacity: MetaobjectFieldV2
  body_text: MetaobjectFieldV2
  cause_logo: MetaobjectFieldV2
  cta_link: MetaobjectFieldV2
  cta_text: MetaobjectFieldV2
}
