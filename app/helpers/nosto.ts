import type { Params } from '@remix-run/router'
import type { Storefront } from '@shopify/hydrogen'
import type { Product } from '@shopify/hydrogen/storefront-api-types'
import { encode } from 'base-64'
import { CREATE_SESSION_MUTATION, UPDATE_SESSION_MUTATION } from '~/graphql/nosto/mutations'
import { batchArray, parseCookie } from './general'
import { getProductDataWithIds, getProductIdWithHandle } from './shopify'

export const getNostoSessionID = async (request: Request, apiToken: string) => {
  let nostoSessionID = parseCookie(request, 'nostoSession')
  if (!nostoSessionID) {
    const response = await createNostoSession(request, apiToken)
    //TODO: handle errors
    const { data, type, message }: NostoSession = await response.json()
    if (data?.newSession) {
      const { newSession } = data
      nostoSessionID = newSession
    }
  }
  return nostoSessionID
}

export const createNostoCookie = (sessionID: string): [string, string] => {
  return ['Set-Cookie', `nostoSession=${sessionID}; Max-Age=1800`]
}

export const getProductDataForRecs = async (
  storefront: Storefront,
  placements?: NostoPlacement[],
) => {
  const productIds: string[] = []
  placements?.forEach(placement => {
    const { primary } = placement
    primary.forEach(product => {
      const { productId } = product
      const shopifyId = `gid://shopify/Product/${productId}`
      if (!productIds.includes(shopifyId)) {
        productIds.push(shopifyId)
      }
    })
  })
  //The storefront API only allows 250 IDs per call
  const idBatches = batchArray(productIds, 100)
  const storefrontCalls = idBatches.map(batch => getProductDataWithIds(batch, storefront))
  const enrichedBatches = await Promise.all(storefrontCalls)
  const allProductData = enrichedBatches.reduce<Product[]>((acc, { nodes }) => {
    const nonNullNodes = nodes.filter(node => node)
    return [...acc, ...nonNullNodes]
  }, [])
  return enrichNostoRecommendations(allProductData, placements)
}

export const retrieveRecsForPlacement = (divId: string, placements?: NostoPlacement[]) => {
  const placement = placements?.find(placement => placement.divId === divId)
  return placement?.primary
}

export const generateNostoEventPayload = async (
  storefront: Storefront,
  request: Request,
  params: Params,
): Promise<NostoSessionVariables> => {
  const { pathname, searchParams } = new URL(request.url)
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
    productID = await getProductIdWithHandle(productHandle, storefront)
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
  const res = await fetch('https://api.nosto.com/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${encode(`:${apiToken}`)}`,
    },
    body: JSON.stringify({
      query: UPDATE_SESSION_MUTATION,
      variables: { ...requestVariables, CID: nostoSessionID },
    }),
  })
  const { data }: NostoUpdateSession = await res.json()
  //There's gotta be a better way to do this :)
  const {
    forCartPage = [],
    forCategoryPage = [],
    forFrontPage = [],
    forOtherPage = [],
    forProductPage = [],
    forSearchPage = [],
  } = data?.updateSession?.pages || {}
  const nonEmptyReccomendations =
    forCategoryPage || forFrontPage || forOtherPage || forProductPage || forSearchPage
  return [...forCartPage, ...nonEmptyReccomendations]
}

//Private functions

const createNostoSession = (request: Request, apiToken: string) => {
  return fetch('https://api.nosto.com/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${encode(`:${apiToken}`)}`,
    },
    body: JSON.stringify({
      query: CREATE_SESSION_MUTATION,
      variables: {
        referer: request.referrer,
      },
    }),
  })
}

const enrichNostoRecommendations = (allProductData: Product[], placements?: NostoPlacement[]) => {
  return placements?.map(placement => {
    const { primary } = placement
    const enrichedPrimary = primary.map(product => {
      const { productId } = product
      const shopifyId = `gid://shopify/Product/${productId}`
      const productData = allProductData.find(({ id }) => id === shopifyId)
      return {
        ...product,
        ...productData,
      }
    })
    return {
      ...placement,
      primary: enrichedPrimary,
    }
  })
}

//Types
type NostoSessionVariables = {
  productPage: boolean
  categoryPage: boolean
  searchPage: boolean
  otherPage: boolean
  homePage: boolean
  cartPage: boolean
  searchTerm: string
  isPreview: boolean
  productID: string
  cartValue: number
  categoryName: string
  event: {
    type: string
    target: string
  }
}

type NostoSession = {
  data?: {
    newSession: string
  }
  type?: string
  message?: string
}

type NostoPageKey =
  | 'forCartPage'
  | 'forCategoryPage'
  | 'forFrontPage'
  | 'forOtherPage'
  | 'forProductPage'
  | 'forSearchPage'

type NostoUpdateSession = {
  data?: {
    updateSession: {
      pages: {
        [key in NostoPageKey]: NostoPlacement[]
      }
    }
  }
  type?: string
  message?: string
}

export type NostoPlacement = {
  divId: string
  resultId: string
  primary: [{ productId?: string; title: string; id: string }]
}
