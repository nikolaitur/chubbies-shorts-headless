import { MetaobjectField, Product } from '@shopify/storefront-kit-react/storefront-api-types'
import { AppLoadContext } from '@shopify/remix-oxygen'

import { FOOTER_QUERY } from '~/graphql/storefront/frame/queries/footer'
import { FooterData } from '~/global-types'
import { FOOTER_LEGAL_HANDLE, FOOTER_MENU_HANDLE } from '~/constants'
import { Storefront } from '@shopify/hydrogen'
import { PRODUCT_FROM_IDS_QUERY } from '~/graphql/storefront/products/queries/productsFromIds'

export const flattenMetaobjectFields = (fields: MetaobjectField[]) =>
  fields.reduce((flattenedFields, { key, ...field }) => {
    return {
      ...flattenedFields,
      [key]: {
        ...field,
      },
    }
  }, {})

export const getProductIdWithHandle = async (handle: string, storefront: Storefront) => {
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

export const getProductDataWithIds = async (ids: string[], storefront: Storefront) => {
  const res = await storefront.query<{ nodes: Product[] }>(PRODUCT_FROM_IDS_QUERY, {
    variables: {
      ids,
    },
    cache: storefront.CacheNone(),
  })
  return res
}

export async function getFooterData({ storefront }: AppLoadContext) {
  const data = await storefront.query<FooterData>(FOOTER_QUERY, {
    variables: {
      footerMenuHandle: FOOTER_MENU_HANDLE,
      footerLegalLinksHandle: FOOTER_LEGAL_HANDLE,
    },
  })

  return {
    footerMenu: data?.footerMenu,
    footerLegalLinks: data?.footerLegalLinks,
  }
}
