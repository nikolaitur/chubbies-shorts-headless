import { ImageData } from '~/global-types'
import { Maybe } from '~/graphql/generated'

export type AccordionPanelContentProps = {
  icon?: ImageData
  image?: ImageData
  text?: Maybe<string>
}
