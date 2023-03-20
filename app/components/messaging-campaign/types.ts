import { MessageCardProps } from '@solo-brands/ui-library.ui.atomic.message-card'
import { ProductTagProps } from '@solo-brands/ui-library.ui.atomic.product-tag'
import { HTMLAttributes } from 'react'
import { MetaobjectFieldsFragment } from '~/graphql/generated'

export type MessagingCampaignTypes =
  | 'product-page'
  | 'product-tag'
  | 'product-card'
  | 'cart-line'
  | 'checkout'

export type MessagingCampaignProps = HTMLAttributes<HTMLDivElement> & {
  type: MessagingCampaignTypes
  campaign: MetaobjectFieldsFragment
  messageCardVariant?: MessageCardProps['variant']
  productTagVariant?: ProductTagProps['variant']
}
