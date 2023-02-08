import { HTMLAttributes } from 'react'
import { InfoBlockFragment, MediaImage } from '~/graphql/generated'

export type ProductCauseBannerProps = HTMLAttributes<HTMLDivElement> & {
  fields: InfoBlockFragment['fields']
}

type Field = {
  value: string
  reference?: MediaImage
}

export type ProductCauseBannerFlattenedFields = {
  background_image: Field
  background_opacity: Field
  body_text: Field
  cause_logo: Field
  cta_link: Field
  cta_text: Field
}
