import { Storefront } from '@shopify/hydrogen'
import { GlobalSettingsQuery, GlobalSettingsQueryVariables } from '~/graphql/generated'
import { GLOBAL_SETTINGS_QUERY } from '~/graphql/storefront/global/queries/globalSettings'

export const fetchGlobalSettings = async (
  storefront: Storefront,
  variables: GlobalSettingsQueryVariables,
  cache?: ReturnType<Storefront['CacheCustom']>,
) => {
  const { globalSettings } = await storefront.query<GlobalSettingsQuery>(GLOBAL_SETTINGS_QUERY, {
    variables,
    cache,
  })

  return globalSettings
}
