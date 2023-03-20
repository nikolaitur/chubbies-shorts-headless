import { Storefront } from '@shopify/hydrogen'
import { MessagingCampaignTypes } from '~/components/messaging-campaign'
import { ROUTE_IDS } from '~/constants'
import {
  ColorSchemeKeys,
  FlattenMetaobjectFields,
  LoaderData,
  MessagingCampaignKeys,
} from '~/global-types'
import { MessagingCampaignsQuery, MetaobjectFieldsFragment } from '~/graphql/generated'
import { MESSAGING_CAMPAIGNS_QUERY } from '~/graphql/storefront/global/queries/messagingCampaigns'
import { useTypedRouteLoaderData } from '~/hooks'
import { flattenMetaobjectFieldsV2 } from './metaobject'

export const fetchAllMessagingCampaigns = async (storefront: Storefront) => {
  const { messagingCampaigns } = await storefront.query<MessagingCampaignsQuery>(
    MESSAGING_CAMPAIGNS_QUERY,
  )

  return messagingCampaigns
}

export const getMessagingCampaignColors = (
  colorScheme:
    | FlattenMetaobjectFields<MetaobjectFieldsFragment['fields'], ColorSchemeKeys>
    | undefined
    | null,
  type: MessagingCampaignTypes,
) => {
  if (!colorScheme) return null

  switch (type) {
    case 'product-page':
      return {
        textColor: colorScheme?.product_page_message_color?.value,
        backgroundColor: colorScheme?.product_page_message_background_color?.value,
      }

    case 'product-tag':
      return {
        textColor: colorScheme?.product_card_tag_text_color?.value,
        backgroundColor: colorScheme?.product_card_tag_background_color?.value,
      }

    case 'product-card':
      return {
        textColor: colorScheme?.product_card_message_text_color?.value,
        backgroundColor: colorScheme?.product_card_message_background_color?.value,
      }

    case 'cart-line':
      return {
        textColor: colorScheme?.cart_line_message_text_color?.value,
        backgroundColor: colorScheme?.cart_line_message_background_color?.value,
      }

    default:
      return null
  }
}

export const getMessagingCampaignContent = (
  fields:
    | FlattenMetaobjectFields<MetaobjectFieldsFragment['fields'], MessagingCampaignKeys>
    | undefined
    | null,
  type: MessagingCampaignTypes,
) => {
  if (!fields) return null

  switch (type) {
    case 'product-page':
      return {
        title: fields?.product_page_message_title?.value,
        subtitle: fields?.product_page_message_subtitle?.value,
      }

    case 'product-tag':
      return {
        title: fields?.product_card_tag_text?.value,
        subtitle: null,
      }

    case 'product-card':
      return {
        title: fields?.product_card_message?.value,
        subtitle: null,
      }

    case 'cart-line':
      return {
        title: fields?.cart_line_message?.value,
        subtitle: null,
      }

    case 'checkout':
      return {
        title: fields?.checkout_message_title?.value,
        subtitle: fields?.checkout_message_body?.value,
      }
  }
}

export const useMessagingCampaigns = (tags: string[] | null | undefined) => {
  const { messagingCampaigns } = useTypedRouteLoaderData<LoaderData['root']>(ROUTE_IDS.ROOT) ?? {}

  if (!messagingCampaigns || !tags || tags.length < 1) return []

  const campaignsToDisplay = messagingCampaigns?.filter(campaign => {
    const { triggering_tag } =
      flattenMetaobjectFieldsV2<MetaobjectFieldsFragment['fields'], MessagingCampaignKeys>(
        campaign.fields,
      ) ?? {}

    const triggeringTag = triggering_tag?.value

    if (!triggeringTag) return false

    return tags.includes(triggeringTag)
  })

  return campaignsToDisplay
}
