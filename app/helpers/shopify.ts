import { Storefront } from '@shopify/hydrogen'
import { MetaobjectField, Product } from '@shopify/storefront-kit-react/storefront-api-types'
import { SearchSpringFacet } from '~/global-types/searchspring'
import { ColorFragment } from '~/graphql/generated'
import { COLORS_FROM_IDS_QUERY } from '~/graphql/storefront/collections/queries'
import { flattenMetaobjectFields } from './metaobject'

export const getProductIdByHandle = async (handle: string, storefront: Storefront) => {
  const { product } = await storefront.query<{ product: Product }>(
    `query Product($handle: String!) {
      product(handle: $handle) {
        id
      }
    }`,
    {
      variables: {
        handle,
      },
    },
  )
  return product?.id?.split('/')[4]
}

export const retrieveColorValues = async (
  storefront: Storefront,
  colorFacet: SearchSpringFacet,
) => {
  const colorIds = colorFacet?.values?.map(color => color.value)
  if (colorIds) {
    const colorValues = await storefront.query<{ nodes: ColorFragment[] }>(COLORS_FROM_IDS_QUERY, {
      variables: {
        ids: colorIds,
      },
      cache: storefront.CacheNone(),
    })

    const getColorFields = (id: any) => {
      return colorValues?.nodes?.find(cv => cv.id === id)?.fields as MetaobjectField[]
    }

    colorFacet.values =
      colorFacet?.values?.map(color => {
        color.value = flattenMetaobjectFields(getColorFields(color.value))
        return color
      }) ?? null
  }
  return colorFacet
}
