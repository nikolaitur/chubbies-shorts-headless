import { Observable, of, shareReplay, switchMap, tap } from 'rxjs'
import type { RestApiParams } from './RestApi'
import { RestApi } from './RestApi'

export interface WishlistApiParams extends RestApiParams {
  shop: string
  sessionId?: string
  customerId?: string
  trackingSource?: string
}

export class WishlistApi extends RestApi {
  productMetafields = false

  constructor(params: WishlistApiParams) {
    super(params)

    this.headers = {
      'content-type': 'application/json',
      'x-appmate-api': '2023-01',
    }

    if (params.shop) {
      this.headers['x-appmate-shp'] = params.shop
    }

    if (params.sessionId) {
      this.headers['x-appmate-sid'] = params.sessionId
    }

    if (params.customerId) {
      this.headers['x-appmate-cid'] = params.customerId.toString()
    }

    if (params.trackingSource) {
      this.headers['x-appmate-src'] = params.trackingSource
    }
  }

  public get hasSession() {
    return !!this.headers['x-appmate-sid'] || !!this.headers['x-appmate-cid']
  }

  setSessionId(sessionId: string) {
    this.headers['x-appmate-sid'] = sessionId
  }

  public loadWishlist({ wishlistId }: LoadWishlistParams) {
    if (!this.hasSession) {
      return of({
        wishlist: {
          id: 'mine',
          isMine: true,
          numItems: 0,
          items: [],
        } as ApiWishlist,
      })
    }
    return this.get<{ wishlist: ApiWishlist }>({
      path: `/wishlists/${wishlistId}`,
    })
  }

  private _pendingSessionId?: Observable<{
    sessionId?: string
  }>

  public addItem({
    productId,
    variantId,
  }: {
    productId: number | string
    variantId?: number | string
  }): Observable<{
    wishlistItem: ApiWishlistItem
    sessionId?: string
  }> {
    if (typeof productId === 'string') {
      productId = parseInt(productId)
    }
    if (typeof variantId === 'string') {
      variantId = parseInt(variantId)
    }

    if (!this.hasSession && this._pendingSessionId) {
      return this._pendingSessionId.pipe(
        switchMap(() => {
          return this.addItem({
            productId,
            variantId,
          })
        }),
      )
    }

    const request = this.post<{
      wishlistItem: ApiWishlistItem
      sessionId?: string
    }>({
      path: `/wishlists/mine/items`,
      body: {
        productId,
        variantId,
      },
    }).pipe(
      tap(result => {
        if (result.sessionId) {
          this.setSessionId(result.sessionId)
          this._pendingSessionId = undefined
        }
      }),
      shareReplay(),
    )

    if (!this.hasSession) {
      this._pendingSessionId = request
    }

    return request
  }

  public updateItem({
    wishlistItemId,
    changes,
  }: {
    wishlistItemId: string
    changes: {
      variantId: number
    }
  }) {
    return this.put<{ wishlistItem: ApiWishlistItem }>({
      path: `/wishlists/mine/items`,
      body: {
        changes: {
          ...changes,
          wishlistItemId,
        },
      },
    }).pipe(shareReplay())
  }

  public removeItem({ wishlistItemId }: { wishlistItemId: string }) {
    return this.delete<{ wishlistItem: ApiWishlistItem }>({
      path: `/wishlists/mine/items`,
      body: {
        wishlistItemId,
      },
    }).pipe(shareReplay())
  }

  public clearWishlist() {
    return this.delete<void>({
      path: `/wishlists/mine`,
    }).pipe(shareReplay())
  }
}

export interface LoadWishlistParams {
  wishlistId: string
}

export interface ApiWishlist {
  id: string
  publicId?: string
  isMine: boolean
  numItems: number
  items: ApiWishlistItemRef[]
  customerId?: string
  sessionId?: string
}

export interface ApiWishlistItemRef {
  id: string
  productId: number
  variantId?: number
}

export interface ApiWishlistItem {
  id: string
  hidden: boolean
  product: {
    id: number
    handle: string
  }
  selectedVariantId?: number
}
