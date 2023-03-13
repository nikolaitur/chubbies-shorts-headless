import { NostoRecommendedProductsQuery } from '~/graphql/generated'

export type NostoSessionVariables = {
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

export type NostoSession = {
  data?: {
    newSession: string
  }
  type?: string
  message?: string
}

export type NostoPageKey =
  | 'forCartPage'
  | 'forCategoryPage'
  | 'forFrontPage'
  | 'forOtherPage'
  | 'forProductPage'
  | 'forSearchPage'

export type NostoUpdateSession = {
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
  primary: { productId?: string; title: string; id: string }[]
}

export type NostoRecommendedProduct = NonNullable<NostoRecommendedProductsQuery['nodes'][number]>
