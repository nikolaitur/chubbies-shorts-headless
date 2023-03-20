import * as IconList from '@solo-brands/ui-library.ui.atomic.icon'
import MessageCard from '@solo-brands/ui-library.ui.atomic.message-card'
import ProductTag from '@solo-brands/ui-library.ui.atomic.product-tag'
import { CSSProperties } from 'react'
import { ColorSchemeKeys, IconKeys, MessagingCampaignKeys } from '~/global-types'
import { MetaobjectFieldsFragment } from '~/graphql/generated'
import {
  flattenMetaobjectFieldsV2,
  getMessagingCampaignColors,
  getMessagingCampaignContent,
} from '~/helpers'
import { MessagingCampaignProps } from '.'
import styles from './styles.module.css'

const MessagingCampaign = ({
  type,
  campaign,
  messageCardVariant,
  productTagVariant,
}: MessagingCampaignProps) => {
  const flattenedCampaignFields = flattenMetaobjectFieldsV2<
    MetaobjectFieldsFragment['fields'],
    MessagingCampaignKeys
  >(campaign.fields)

  const flattenedColorSchemeFields =
    flattenMetaobjectFieldsV2<MetaobjectFieldsFragment['fields'], ColorSchemeKeys>(
      flattenedCampaignFields?.color_scheme?.reference?.fields,
    ) ?? {}

  const { title, subtitle } = getMessagingCampaignContent(flattenedCampaignFields, type) ?? {}
  const { textColor, backgroundColor } =
    getMessagingCampaignColors(flattenedColorSchemeFields, type) ?? {}

  if (!title) return null

  switch (type) {
    case 'product-tag':
      return (
        <ProductTag
          className={styles.productTag}
          variant={productTagVariant}
          tag={title}
          // TODO: update ProductTag from UI Library to receive textColor and bgColor props
          // temporary code
          style={
            {
              '--text-color': textColor,
              '--background-color': backgroundColor,
            } as CSSProperties
          }
        />
      )

    default: {
      const { icon } =
        flattenMetaobjectFieldsV2<MetaobjectFieldsFragment['fields'], IconKeys>(
          flattenedCampaignFields?.icon?.reference?.fields,
        ) ?? {}

      const IconComponent = (() => {
        const iconName = icon?.value
        if (!iconName) return null

        // @ts-expect-error - No typings for this module
        return IconList[iconName] ?? null
      })()

      const shouldRenderIcon = Boolean(IconComponent) && type !== 'product-card'

      return (
        <MessageCard
          title={title}
          icon={shouldRenderIcon && <IconComponent />}
          className={styles.messageCard}
          // @ts-expect-error - TODO: update types from UI Library
          subtitle={subtitle}
          minimal={type === 'product-card'}
          variant={messageCardVariant}
          // TODO: update MessageCard from UI Library to receive textColor and bgColor props
          // temporary code
          style={
            {
              '--text-color': textColor,
              '--background-color': backgroundColor,
            } as CSSProperties
          }
        />
      )
    }
  }
}

export default MessagingCampaign
