import { useFetcher, useRouteLoaderData } from '@remix-run/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { lastValueFrom, map } from 'rxjs'
import { LoaderData } from '~/global-types'
import { ApiWishlist, LoadWishlistParams, WishlistApi } from './WishlistApi'

export interface WishlistClientParams {
  shopDomain: string
  customerId?: string
  sessionId?: string
  apiHost?: string
  cache?: Cache
  waitUntil: (promise: Promise<unknown>) => void
}

export class WishlistClient {
  private api: {
    wishlist: WishlistApi
  }

  addWishlistItem = (params: Parameters<typeof this.api.wishlist.addItem>[0]) =>
    lastValueFrom(this.api.wishlist.addItem(params))

  removeWishlistItem = (params: Parameters<typeof this.api.wishlist.removeItem>[0]) =>
    lastValueFrom(this.api.wishlist.removeItem(params))

  updateWishlistItem = (params: Parameters<typeof this.api.wishlist.updateItem>[0]) =>
    lastValueFrom(this.api.wishlist.updateItem(params))

  clearWishlist: typeof this.api.wishlist.clearWishlist = () => this.api.wishlist.clearWishlist()

  loadWishlist = (params: LoadWishlistParams) =>
    lastValueFrom(this.api.wishlist.loadWishlist(params))

  loadProductState = (params: LoadWishlistParams & WishlistItemSearch) => {
    return lastValueFrom(
      this.api.wishlist.loadWishlist(params).pipe(
        map(({ wishlist }) => {
          return {
            productState: getProductState(wishlist, {
              productId: params.productId,
              variantId: params.variantId,
            }),
          }
        }),
      ),
    )
  }

  constructor({
    shopDomain,
    customerId,
    sessionId,
    apiHost = 'https://api.appmate.io/v2',
    cache,
    waitUntil,
  }: WishlistClientParams) {
    this.api = {
      wishlist: new WishlistApi({
        host: apiHost,
        shop: shopDomain,
        customerId,
        sessionId,
        cache,
        waitUntil,
        // trackingSource: this.theme.getPageType(),
      }),
    }
  }
}

export function createWishlistClient(params: WishlistClientParams) {
  return {
    wishlist: new WishlistClient(params),
  }
}

export function parseLegacyId(id: string) {
  return parseInt(id.split('/').pop() ?? '')
}

export interface RouteDataOptions {
  id?: string
  key?: string
}

export interface WishlistItemSearch {
  productId: string
  variantId?: string
}

export interface WishlistProductState {
  productId: number
  inWishlist: boolean
  variantId?: number
  wishlistItemId?: string
}

export function getProductState(
  wishlist: ApiWishlist,
  search: WishlistItemSearch,
): WishlistProductState {
  const productId = parseLegacyId(search.productId)
  const variantId = search.variantId ? parseLegacyId(search.variantId) : undefined

  const wishlistItem = wishlist.items.find(
    item => item.productId === productId && (!search.variantId || item.variantId === variantId),
  )

  return {
    wishlistItemId: wishlistItem?.id,
    productId: wishlistItem?.productId ?? productId,
    variantId: wishlistItem?.variantId ?? variantId,
    inWishlist: !!wishlistItem,
  }
}

export function useWishlistApi() {
  const { state, submit } = useFetcher()

  return useMemo(
    () => ({
      state,
      removeWishlistItem: ({ wishlistItemId }: { wishlistItemId: string }) =>
        submit({ wishlistItemId }, { method: 'delete', action: '/wishlists/mine' }),
      addWishlistItem: ({ productId, variantId }: { productId: string; variantId?: string }) =>
        submit(
          {
            productId: parseLegacyId(productId).toString(),
            variantId: variantId ? parseLegacyId(variantId).toString() : '',
          },
          { method: 'post', action: '/wishlists/mine' },
        ),
    }),
    [state, submit],
  )
}

export function useProductState(
  wishlist: Promise<ApiWishlist> | undefined,
  { productId, variantId }: WishlistItemSearch,
) {
  const [productState, setProductState] = useState<WishlistProductState>()
  const productStatePromise = useMemo(
    () => wishlist?.then(wishlist => getProductState(wishlist, { productId, variantId })),
    [wishlist, productId, variantId],
  )

  useEffect(() => {
    let subscribed = true
    if (!productStatePromise) {
      return
    }
    productStatePromise.then(productState => {
      if (subscribed) {
        setProductState(productState)
      }
    })
    return () => {
      subscribed = false
    }
  }, [productStatePromise])

  return productState
}

export function useWishlistProduct({ productId, variantId }: WishlistItemSearch) {
  const { wishlist } = useRouteLoaderData('root') as LoaderData['root']
  const wishlistApi = useWishlistApi()
  const [state, setState] = useState({
    loading: true,
    submitting: true,
    inWishlist: false,
    wishlistItemId: '',
  })

  useEffect(() => {
    setState(state => ({ ...state, submitting: wishlistApi.state !== 'idle' }))
  }, [wishlistApi.state])

  const productStatePromise = useMemo(
    () => wishlist?.then(wishlist => getProductState(wishlist, { productId, variantId })),
    [wishlist, productId, variantId],
  )

  useEffect(() => {
    let subscribed = true

    if (!productStatePromise) {
      return
    }

    setState(state => ({
      ...state,
      loading: true,
    }))

    productStatePromise.then(productState => {
      if (subscribed) {
        setState(state => ({
          ...state,
          loading: false,
          inWishlist: productState.inWishlist,
          wishlistItemId: productState.wishlistItemId ?? '',
        }))
      }
    })

    return () => {
      subscribed = false
    }
  }, [productStatePromise])

  const addProduct = useCallback(() => {
    setState(state => ({
      ...state,
      submitting: true,
      inWishlist: true,
    }))

    wishlistApi.addWishlistItem({
      productId,
      variantId,
    })
  }, [productId, variantId, wishlistApi])

  const removeProduct = useCallback(() => {
    setState(state => ({
      ...state,
      submitting: true,
      inWishlist: false,
    }))

    wishlistApi.removeWishlistItem({ wishlistItemId: state.wishlistItemId })
  }, [state, wishlistApi])

  const toggleProduct = useCallback(() => {
    if (state.loading || state.submitting) return

    if (state.inWishlist) {
      removeProduct()
    } else {
      addProduct()
    }
  }, [state, addProduct, removeProduct])

  return useMemo(
    () => ({
      ...state,
      addProduct,
      removeProduct,
      toggleProduct,
    }),
    [state, addProduct, removeProduct, toggleProduct],
  )
}

export function useWishlistSize() {
  // const wishlist = useWishlisRouteData()
  const { wishlist } = useRouteLoaderData('root') as LoaderData['root']
  const [state, setState] = useState({
    loading: true,
    size: 0,
  })

  const wishlistSizePromise = useMemo(
    () => wishlist?.then(wishlist => wishlist.numItems),
    [wishlist],
  )

  useEffect(() => {
    let subscribed = true

    if (!wishlistSizePromise) return

    setState(state => ({
      ...state,
      loading: true,
    }))

    wishlistSizePromise.then(size => {
      if (subscribed) {
        setState(state => ({
          ...state,
          loading: false,
          size,
        }))
      }
    })

    return () => {
      subscribed = false
    }
  }, [wishlistSizePromise])

  return state
}
