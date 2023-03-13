import type { Params } from '@remix-run/router'
import type { Storefront } from '@shopify/hydrogen'
import { encode } from 'base-64'
import {
  NostoPageKey,
  NostoPlacement,
  NostoRecommendedProduct,
  NostoSession,
  NostoSessionVariables,
  NostoUpdateSession,
} from '~/global-types'
import { CREATE_SESSION_MUTATION, UPDATE_SESSION_MUTATION } from '~/graphql/nosto/mutations'
import { NOSTO_RECOMMENDED_PRODUCTS_QUERY } from '~/graphql/storefront/products/queries'
import { batchArray, parseCookie } from './general'
import { getProductIdByHandle } from './shopify'

export const getNostoSessionID = async (request: Request, apiToken: string) => {
  const nostoSessionID = parseCookie(request, 'nostoSession')

  if (!nostoSessionID) {
    try {
      const response = await createNostoSession(request, apiToken)
      const { data }: NostoSession = await response.json()
      if (data?.newSession) {
        const { newSession } = data

        return newSession
      }
    } catch (err) {
      console.error('Create new nosto session failed', err)
    }
  }
  return nostoSessionID
}

export const createNostoCookie = (sessionID: string): [string, string] => {
  return ['Set-Cookie', `nostoSession=${sessionID}; Max-Age=1800`]
}

export const getProductIdsFromPlacements = (placements?: NostoPlacement[] | null) => {
  if (!placements) return null

  return placements.reduce((ids: string[], placement) => {
    const { primary } = placement
    const uniqueIdsFromPrimary = primary.reduce((primaryIds: string[], primary) => {
      if (!primary.productId) return primaryIds

      const storefrontId = `gid://shopify/Product/${primary.productId}`

      if (ids.includes(storefrontId)) return primaryIds

      return [...primaryIds, storefrontId]
    }, [])

    return [...ids, ...uniqueIdsFromPrimary]
  }, [])
}

export const fetchNostoRecommendedProducts = async (ids: string[], storefront: Storefront) => {
  const res = await storefront.query<{ nodes: NostoRecommendedProduct[] }>(
    NOSTO_RECOMMENDED_PRODUCTS_QUERY,
    {
      variables: {
        ids,
      },
      cache: storefront.CacheNone(),
    },
  )
  return res
}

export const getEnrichedNostoPlacements = async (
  storefront: Storefront,
  placements?: NostoPlacement[] | null,
) => {
  const productIds = getProductIdsFromPlacements(placements)

  if (!productIds) return null
  //The storefront API only allows 250 IDs per call
  const idBatches = batchArray(productIds, 100)
  const storefrontCalls = idBatches.map(batch => fetchNostoRecommendedProducts(batch, storefront))
  const enrichedBatches = await Promise.all(storefrontCalls)
  const allProductData = enrichedBatches.reduce(
    (products: NostoRecommendedProduct[], { nodes }) => {
      const nonNullNodes = nodes.filter(node => node)

      return [...products, ...nonNullNodes]
    },
    [],
  )
  return enrichNostoPlacements(allProductData, placements)
}

export const generateNostoEventPayload = async (
  storefront: Storefront,
  url: string,
  params: Params,
): Promise<NostoSessionVariables> => {
  const { pathname, searchParams } = new URL(url)
  const { productHandle, collectionHandle } = params
  const productPage = !!productHandle
  const categoryPage = !!collectionHandle && !productHandle
  const searchPage = pathname === '/search'
  const homePage = pathname === '/' || pathname === ''
  const otherPage = !productPage && !categoryPage && !searchPage && !homePage

  //Required to have a value even if not used
  let productID = ''
  let categoryName = ''
  let eventType = 'VIEWED_PAGE'
  let target = pathname
  let searchTerm = ''

  if (productPage) {
    //TODO: fetch product ID from handle
    productID = await getProductIdByHandle(productHandle, storefront)
    eventType = 'VIEWED_PRODUCT'
    target = productID
  }
  if (categoryPage) {
    eventType = 'VIEWED_CATEGORY'
    target = collectionHandle
    categoryName = collectionHandle
  }
  if (searchPage) {
    eventType = 'SEARCHED_FOR'
    searchTerm = searchParams.get('q') || ''
  }

  return {
    productPage,
    categoryPage,
    searchPage,
    otherPage,
    homePage,
    cartPage: false, //TODO: contact Nosto to understand this prop
    searchTerm,
    isPreview: true, //TODO: remove when live
    productID,
    categoryName,
    cartValue: 0, //TODO: get cart value
    event: {
      type: eventType,
      target,
    },
  }
}

export const updateNostoSession = async (
  requestVariables: NostoSessionVariables,
  apiToken: string,
  nostoSessionID: string,
) => {
  try {
    const res = await fetch('https://api.nosto.com/v1/graphql', {
      method: 'POST',
      headers: generateNostoRequestHeaders(apiToken),
      body: JSON.stringify({
        query: UPDATE_SESSION_MUTATION,
        variables: { ...requestVariables, CID: nostoSessionID },
      }),
    })
    const { data }: NostoUpdateSession = await res.json()
    const pages = data?.updateSession.pages

    if (!pages) return null

    const pageKeys = Object.keys(pages)
    const placements = pageKeys.reduce((recommendations: NostoPlacement[], key) => {
      const dataByKey = pages[key as NostoPageKey]

      return [...recommendations, ...dataByKey]
    }, [])

    return placements
  } catch (err) {
    console.error('Nosto Update Session Failed', err)

    return null
  }
}

//Private functions

const generateNostoRequestHeaders = (apiToken: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Basic ${encode(`:${apiToken}`)}`,
})

const createNostoSession = (request: Request, apiToken: string) => {
  return fetch('https://api.nosto.com/v1/graphql', {
    method: 'POST',
    headers: generateNostoRequestHeaders(apiToken),
    body: JSON.stringify({
      query: CREATE_SESSION_MUTATION,
      variables: {
        referer: request.referrer,
      },
    }),
  })
}

const enrichNostoPlacements = (
  nostoProducts: NostoRecommendedProduct[],
  placements?: NostoPlacement[] | null,
) => {
  return placements?.map(placement => {
    const { primary } = placement
    const enrichedPrimary = primary.reduce((products: NostoRecommendedProduct[], primary) => {
      const { productId } = primary

      if (!productId) return products

      const storefrontId = `gid://shopify/Product/${productId}`
      const productData = nostoProducts.find(({ id }) => id === storefrontId)

      if (!productData) return products

      return [...products, productData]
    }, [])
    return {
      ...placement,
      primary: enrichedPrimary,
    }
  })
}
